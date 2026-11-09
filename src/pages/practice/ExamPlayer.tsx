import React, { useState, useEffect } from 'react';
import {
  Clock,
  Flag,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileCheck,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, Exam, UserExamResult, GradeLevel, SubjectMeta } from '../../types';
import { SmartBackButton } from '../../components/common/SmartBackButton';
import { studentAccountService } from '../../services/studentAccountService';

interface ExamPlayerProps {
  exam: Exam | null;
  questions: Question[];
  grade: GradeLevel;
  subject: SubjectMeta;
  onFinishExam: (result: UserExamResult) => void;
  onExit: () => void;
}

export const ExamPlayer: React.FC<ExamPlayerProps> = ({
  exam,
  questions,
  grade,
  subject,
  onFinishExam,
  onExit
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [essayAnswers, setEssayAnswers] = useState<Record<number, string>>({});
  const [activeSection, setActiveSection] = useState<'trac_nghiem' | 'tu_luan'>('trac_nghiem');
  const [flaggedIndices, setFlaggedIndices] = useState<Set<number>>(new Set());
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(
    exam ? exam.durationMinutes * 60 : 15 * 60
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);

  const essayQuestions = exam?.essayQuestions || [];
  const hasEssays = essayQuestions.length > 0;

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeftSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeftSeconds]);

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const toggleFlagCurrent = () => {
    setFlaggedIndices(prev => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
      }
      return next;
    });
  };

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;

  const handleSubmitExam = () => {
    setShowConfirmModal(false);
    setIsSubmitted(true);

    // Calculate score
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 10 * 10) / 10 : 0;
    const timeSpent = (exam ? exam.durationMinutes * 60 : 15 * 60) - timeLeftSeconds;

    const result: UserExamResult = {
      id: 'res-' + Date.now(),
      examId: exam ? exam.id : 'custom-exam',
      examTitle: exam ? exam.title : `Luyện tập trắc nghiệm ${subject.name} Lớp ${grade}`,
      subjectId: subject.id,
      grade,
      studentName: studentAccountService.getCurrentStudent()?.fullName || 'Học sinh',
      score,
      totalQuestions,
      correctCount,
      timeSpentSeconds: Math.max(1, timeSpent),
      userAnswers,
      completedAt: new Date().toISOString()
    };

    if (score >= 8) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }

    onFinishExam(result);
  };

  // If already submitted, show results review
  if (isSubmitted) {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswerIndex) correctCount++;
    });
    const finalScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 10 * 10) / 10 : 0;

    return (
      <div className="space-y-6 pb-12 animate-fadeIn">
        {/* Navigation Back */}
        <div className="flex items-center justify-between">
          <SmartBackButton
            onClick={onExit}
            label="Quay lại danh sách đề thi"
            contextHint={`${subject.name} - Khối ${grade}`}
          />
        </div>

        {/* Score Card Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-blue-50/60 to-indigo-50/50 border border-blue-200 shadow-sm text-center relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-3 py-1 rounded-full">
              Kết quả bài thi trắc nghiệm
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B4D]">
              {exam ? exam.title : `Bài luyện tập ${subject.name} - Lớp ${grade}`}
            </h2>

            <div className="flex items-center justify-center gap-6 my-4">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-[#2684FF]">
                  {finalScore}
                  <span className="text-lg text-slate-400 font-normal"> / 10</span>
                </div>
                <div className="text-xs font-bold text-slate-500 mt-1">Điểm số đạt được</div>
              </div>

              <div className="h-12 w-px bg-slate-200" />

              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600">
                  {correctCount} / {totalQuestions}
                </div>
                <div className="text-xs font-bold text-slate-500 mt-1">Câu trả lời đúng</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#64748B]">
              {finalScore >= 8.5
                ? 'Xuất sắc! Em nắm rất vững kiến thức và kỹ năng của bài học.'
                : finalScore >= 6.5
                ? 'Khá tốt! Em hãy xem lại lời giải chi tiết bên dưới để đạt điểm tối đa ở lần sau nhé.'
                : 'Cần cố gắng thêm! Hãy xem kỹ lời giải thích và học lại kiến thức trọng tâm.'}
            </p>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={onExit}
                className="px-5 py-2.5 rounded-xl bg-[#2684FF] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-sm cursor-pointer transition-colors"
              >
                Quay lại phòng luyện tập
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#172B4D] flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              Chi tiết bài làm & Lời giải chuẩn mực sư phạm
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Đáp án được kiểm duyệt bởi Tổ Chuyên Môn
            </span>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const studentAnswer = userAnswers[idx];
              const isCorrect = studentAnswer === q.correctAnswerIndex;
              const hasAnswered = studentAnswer !== undefined;

              return (
                <div
                  key={q.id || idx}
                  className={`p-5 sm:p-6 rounded-2xl bg-white border-2 shadow-xs space-y-4 ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50/10'
                      : 'border-red-200 bg-red-50/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 text-xs font-extrabold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-[#64748B]">
                        {q.chapter}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isCorrect ? '✓ Đúng' : hasAnswered ? '✗ Chưa chính xác' : '○ Bỏ trống'}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-[#172B4D] leading-snug">
                    {q.content}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctAnswerIndex;
                      const isOptionSelected = optIdx === studentAnswer;

                      let optClass = 'border-slate-200 bg-white text-slate-700';
                      if (isOptionCorrect) {
                        optClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                      } else if (isOptionSelected && !isOptionCorrect) {
                        optClass = 'border-red-400 bg-red-50 text-red-800 line-through';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${optClass}`}
                        >
                          <span className="font-bold shrink-0">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pedagogical Explanation */}
                  <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs sm:text-sm text-slate-800">
                    <strong className="text-blue-900 font-bold flex items-center gap-1 mb-1">
                      <HelpCircle className="w-4 h-4 text-blue-600 inline" />
                      Giải thích chi tiết:
                    </strong>
                    <p className="leading-relaxed text-slate-700">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Essay Review Section */}
            {hasEssays && (
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-base font-extrabold text-[#172B4D] flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-indigo-600" />
                    Phần II: Câu hỏi Tự luận & Hướng dẫn chấm chi tiết
                  </h3>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                    Thang điểm tự luận: 5.0 điểm
                  </span>
                </div>

                <div className="space-y-4">
                  {essayQuestions.map((eq, eIdx) => {
                    const studentEssay = essayAnswers[eIdx];
                    return (
                      <div
                        key={eq.id || eIdx}
                        className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-indigo-100 shadow-xs space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-xs">
                            Câu Tự Luận {eIdx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-500">
                            Thang điểm: {eq.maxScore} điểm
                          </span>
                        </div>

                        <div className="text-sm sm:text-base font-bold text-[#172B4D] whitespace-pre-line leading-relaxed">
                          {eq.question}
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <div className="text-xs font-bold text-slate-500">Bài làm của học sinh:</div>
                          <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line">
                            {studentEssay ? studentEssay : '(Học sinh chưa nhập câu trả lời)'}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs sm:text-sm text-slate-800 space-y-1.5">
                          <strong className="text-indigo-900 font-bold flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-indigo-600 inline" />
                            Đáp án tham khảo & Biểu điểm chuẩn CV 7991:
                          </strong>
                          <div className="leading-relaxed text-slate-700 whitespace-pre-line font-mono text-[13px] bg-white/70 p-3 rounded-lg border border-indigo-100">
                            {eq.guide}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz View
  return (
    <div className="space-y-6 pb-12">
      {/* Top Bar: Exam Title, Timer, Actions */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <SmartBackButton
            onClick={() => {
              if (answeredCount > 0) {
                setShowExitConfirmModal(true);
              } else {
                onExit();
              }
            }}
            label="Quay lại"
            contextHint="Danh sách đề"
          />
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#172B4D] leading-tight">
              {exam ? exam.title : `Luyện tập ${subject.name} - Lớp ${grade}`}
            </h2>
            <div className="text-xs text-[#64748B] flex items-center gap-2 mt-0.5">
              <span>Môn: {subject.name}</span>
              <span>•</span>
              <span>Khối {grade}</span>
              <span>•</span>
              <span>Đã làm: <strong className="text-blue-600">{answeredCount}/{totalQuestions}</strong> câu</span>
            </div>
          </div>
        </div>

        {/* Timer & Submit Button */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-mono text-sm font-bold">
            <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-2 rounded-xl bg-[#2684FF] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-sm cursor-pointer transition-colors"
          >
            Nộp bài
          </button>
        </div>
      </div>

      {/* Tabs for Section I & Section II if exam has essay questions */}
      {hasEssays && (
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
          <button
            onClick={() => setActiveSection('trac_nghiem')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'trac_nghiem'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Phần I: Trắc nghiệm ({totalQuestions} câu)
          </button>
          <button
            onClick={() => setActiveSection('tu_luan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'tu_luan'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Phần II: Tự luận ({essayQuestions.length} câu)
          </button>
        </div>
      )}

      {/* Main Grid: Question Content + Question Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Question Box */}
        <div className="lg:col-span-8 space-y-4">
          {activeSection === 'tu_luan' && hasEssays ? (
            /* Essay Questions Section */
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-sm">
                    Phần II: Tự luận
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    ({essayQuestions.length} câu - Thang điểm 5.0)
                  </span>
                </div>
                <button
                  onClick={() => setActiveSection('trac_nghiem')}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  ← Quay lại làm trắc nghiệm
                </button>
              </div>

              <div className="space-y-6">
                {essayQuestions.map((eq, eIdx) => (
                  <div key={eq.id || eIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-indigo-700">
                        Câu Tự Luận {eIdx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {eq.maxScore} điểm
                      </span>
                    </div>

                    <div className="text-sm sm:text-base font-bold text-[#172B4D] whitespace-pre-line leading-relaxed">
                      {eq.question}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                        Bài làm của em:
                      </label>
                      <textarea
                        value={essayAnswers[eIdx] || ''}
                        onChange={(e) => setEssayAnswers(prev => ({ ...prev, [eIdx]: e.target.value }))}
                        placeholder="Em hãy nhập câu trả lời hoặc các bước giải chi tiết vào đây..."
                        rows={4}
                        className="w-full p-3.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-y leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Multiple Choice Questions Section */
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-blue-600 text-white font-black text-sm">
                    Câu {currentIndex + 1}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    / {totalQuestions} câu
                  </span>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md font-medium border border-blue-100">
                    {currentQuestion?.chapter}
                  </span>
                </div>

                {/* Flag Toggle */}
                <button
                  onClick={toggleFlagCurrent}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    flaggedIndices.has(currentIndex)
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  {flaggedIndices.has(currentIndex) ? 'Đã đánh dấu xem lại' : 'Đánh dấu câu này'}
                </button>
              </div>

              {/* Question Body */}
              <div className="text-base sm:text-lg font-bold text-[#172B4D] leading-relaxed">
                {currentQuestion?.content}
              </div>

              {/* Options List */}
              <div className="space-y-3 pt-2">
                {currentQuestion?.options.map((opt, optIndex) => {
                  const isSelected = userAnswers[currentIndex] === optIndex;
                  const letter = String.fromCharCode(65 + optIndex);

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleSelectOption(optIndex)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-150 flex items-start gap-3.5 cursor-pointer ${
                        isSelected
                          ? 'border-[#2684FF] bg-blue-50/70 ring-2 ring-blue-500/10 shadow-xs'
                          : 'border-[#E2EAF5] bg-white hover:border-blue-200 hover:bg-slate-50/60'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#2684FF] text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {letter}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-[#172B4D] leading-relaxed pt-0.5">
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    currentIndex === 0
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Câu trước
                </button>

                <button
                  onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                  disabled={currentIndex === totalQuestions - 1}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    currentIndex === totalQuestions - 1
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-white bg-[#2684FF] hover:bg-blue-600'
                  }`}
                >
                  Câu tiếp theo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Question Palette Grid */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-[#172B4D]">
              Danh sách câu hỏi (Palette)
            </h3>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[11px] text-[#64748B] flex-wrap">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-[#2684FF]" /> Đã chọn
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-amber-400" /> Cần xem lại
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-slate-100 border border-slate-300" /> Chưa làm
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-5 gap-2 pt-2">
              {questions.map((_, idx) => {
                const isCurrent = idx === currentIndex && activeSection === 'trac_nghiem';
                const isAnswered = userAnswers[idx] !== undefined;
                const isFlagged = flaggedIndices.has(idx);

                let bgClass = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
                if (isAnswered) {
                  bgClass = 'bg-[#2684FF] text-white border-blue-600';
                }
                if (isFlagged) {
                  bgClass = 'bg-amber-400 text-amber-950 border-amber-500 font-black';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveSection('trac_nghiem');
                      setCurrentIndex(idx);
                    }}
                    className={`relative h-10 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center ${bgClass} ${
                      isCurrent ? 'ring-2 ring-blue-600 ring-offset-2' : ''
                    }`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Essay Palette if exists */}
            {hasEssays && (
              <div className="pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-500 mb-2">Phần tự luận:</div>
                <div className="grid grid-cols-2 gap-2">
                  {essayQuestions.map((_, eIdx) => {
                    const isDone = (essayAnswers[eIdx] || '').trim().length > 0;
                    return (
                      <button
                        key={eIdx}
                        onClick={() => setActiveSection('tu_luan')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          activeSection === 'tu_luan'
                            ? 'ring-2 ring-indigo-500'
                            : ''
                        } ${
                          isDone
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        TL {eIdx + 1} {isDone ? '✓' : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Submit CTA */}
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Hoàn thành & Nộp bài
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-amber-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-bold text-[#172B4D]">
                Thoát bài luyện tập?
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Em đã làm <strong className="text-blue-600">{answeredCount}/{totalQuestions}</strong> câu hỏi. Nếu quay lại danh sách đề bây giờ, kết quả làm bài hiện tại sẽ không được lưu.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowExitConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={() => {
                  setShowExitConfirmModal(false);
                  onExit();
                }}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Thoát và quay lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-blue-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-[#172B4D]">
                Xác nhận nộp bài thi?
              </h3>
              <p className="text-xs text-[#64748B]">
                Em đã trả lời <strong className="text-blue-600">{answeredCount}/{totalQuestions}</strong> câu hỏi.
                {unansweredCount > 0 && (
                  <span className="text-amber-700 block mt-1">
                    Còn {unansweredCount} câu chưa chọn đáp án!
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2 rounded-xl bg-[#2684FF] hover:bg-blue-600 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Đồng ý nộp bài
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

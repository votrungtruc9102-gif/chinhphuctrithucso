import React, { useState, useMemo } from 'react';
import {
  CheckSquare,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  Play,
  RotateCcw,
  Award,
  Zap,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  X,
  BookOpen,
  HelpCircle,
  Sliders
} from 'lucide-react';
import { GradeLevel, SubjectMeta, Exam, Question, UserExamResult, ExamMatrixAndSpec7991 } from '../../types';
import { ExamPlayer } from './ExamPlayer';
import { SmartBackButton } from '../../components/common/SmartBackButton';
import { balanceAndShuffleQuestionOptions, createExam7991, generateExamMatrix7991 } from '../../services/examMatrixService';
import { MASTER_CURRICULUM_SPECS } from '../../data/curriculumMaster';

interface PracticePageProps {
  grade: GradeLevel;
  subject: SubjectMeta;
  exams: Exam[];
  questions: Question[];
  onOpenDrawer: () => void;
  examResults: UserExamResult[];
  onSaveResult: (result: UserExamResult) => void;
  onBackToHome?: () => void;
}

export const PracticePage: React.FC<PracticePageProps> = ({
  grade,
  subject,
  exams,
  questions,
  onOpenDrawer,
  examResults,
  onSaveResult,
  onBackToHome
}) => {
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [customQuestions, setCustomQuestions] = useState<Question[] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [customCount, setCustomCount] = useState<number>(10);
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [viewingMatrixExam, setViewingMatrixExam] = useState<{ exam: Exam; matrix: ExamMatrixAndSpec7991 } | null>(null);
  const [scopeWarning, setScopeWarning] = useState<string | null>(null);

  // Available questions for this grade & subject
  const availableQuestions = useMemo(() => {
    return questions.filter(
      q => q.grade === grade && q.subjectId === subject.id
    );
  }, [questions, grade, subject.id]);

  // Available chapters from curriculumMaster specs or fallback from questions
  const availableChapters = useMemo(() => {
    const specKey = `${subject.id}_${grade}`;
    const spec = MASTER_CURRICULUM_SPECS[specKey];
    if (spec && spec.chapters && spec.chapters.length > 0) {
      return spec.chapters.map(c => c.name);
    }
    const unique = Array.from(new Set(availableQuestions.map(q => q.chapter).filter(Boolean)));
    return unique;
  }, [subject.id, grade, availableQuestions]);

  // Questions filtered by scope
  const scopedQuestions = useMemo(() => {
    if (selectedChapter === 'all') return availableQuestions;
    return availableQuestions.filter(q => q.chapter === selectedChapter);
  }, [availableQuestions, selectedChapter]);

  // Available predefined exams for this grade & subject
  const subjectExams = useMemo(() => {
    return exams.filter(
      e => e.grade === grade && e.subjectId === subject.id
    );
  }, [exams, grade, subject.id]);

  const filteredExams = useMemo(() => {
    return subjectExams.filter(e => {
      if (filterType === 'all') return true;
      return e.examType === filterType;
    });
  }, [subjectExams, filterType]);

  // Recent results for this subject and grade
  const recentResults = useMemo(() => {
    return examResults.filter(
      r => r.grade === grade && r.subjectId === subject.id
    );
  }, [examResults, grade, subject.id]);

  const startPredefinedExam = (exam: Exam) => {
    // Resolve questions strictly preserving questionIds order
    const questionMap = new Map(questions.map(q => [q.id, q]));
    const matched = exam.questionIds.map(id => questionMap.get(id)).filter(Boolean) as Question[];
    // If some questionIds not in DB, fallback to available questions
    const finalQuestions = matched.length > 0 ? matched : availableQuestions.slice(0, 10);
    // Balance and shuffle options
    const balanced = balanceAndShuffleQuestionOptions(finalQuestions);

    setActiveExam(exam);
    setCustomQuestions(balanced);
    setIsPlaying(true);
  };

  const handleOpenMatrixModal = (exam: Exam) => {
    let matrix = exam.matrix;
    if (!matrix) {
      const matched = questions.filter(q => exam.questionIds.includes(q.id));
      const pool = matched.length > 0 ? matched : availableQuestions.slice(0, 10);
      matrix = generateExamMatrix7991(
        subject.id,
        grade,
        exam.semester || 1,
        pool,
        exam.durationMinutes || 45,
        `Ma trận & Bản đặc tả: ${exam.title}`
      );
    }
    setViewingMatrixExam({ exam, matrix });
  };

  const startQuickPractice = () => {
    if (availableQuestions.length === 0) return;

    // Sinh ngẫu nhiên mã đề: 101, 102, 103, 104
    const randomCodeNum = 101 + Math.floor(Math.random() * 4);
    const examCode = `Mã đề ${randomCodeNum}`;

    const res = createExam7991({
      subjectId: subject.id,
      grade,
      semester: 1,
      chapterScope: selectedChapter,
      examType: customCount <= 5 ? '15_phut' : customCount <= 10 ? 'giua_ky' : 'luyen_tap',
      questionCount: customCount,
      pool: questions,
      examCode
    });

    if (!res.success || !res.exam || res.questions.length !== customCount) {
      setScopeWarning(
        res.message ||
        `Phạm vi kiến thức này hiện chưa đủ ${customCount} câu hỏi hợp lệ theo quy định Công văn 7991. Vui lòng chọn số lượng câu hỏi phù hợp hoặc chọn "Toàn bộ chương trình".`
      );
      return;
    }

    setActiveExam(res.exam);
    setCustomQuestions(res.questions);
    setIsPlaying(true);
  };

  if (isPlaying && customQuestions) {
    return (
      <ExamPlayer
        exam={activeExam}
        questions={customQuestions}
        grade={grade}
        subject={subject}
        onFinishExam={(res) => {
          onSaveResult(res);
        }}
        onExit={() => {
          setIsPlaying(false);
          setActiveExam(null);
          setCustomQuestions(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          {onBackToHome && (
            <div>
              <SmartBackButton
                onClick={onBackToHome}
                label="Quay lại"
                contextHint="Trang chủ"
              />
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                Phòng Kiểm Tra & Đánh Giá
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Chuẩn Công văn 7991/BGDĐT-GDTrH
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">• Thang điểm 10</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D] tracking-tight">
              Bài kiểm tra trắc nghiệm: {subject.name} — Khối {grade}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
              Hệ thống khảo sát và tạo đề tự động theo Ma trận & Bản đặc tả chuẩn GDPT 2018. Phân bổ cân đối theo 4 mức độ nhận thức: Biết (40%), Hiểu (30%), Vận dụng (20%), Vận dụng cao (10%).
            </p>
          </div>
        </div>

        <button
          onClick={onOpenDrawer}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 hover:border-blue-400 font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer shrink-0 self-start md:self-auto"
        >
          <Layers className="w-4 h-4 text-[#2684FF]" />
          <span>Đổi môn hoặc khối khác</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Custom Test Generator Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              Tạo đề tự động chuẩn Công văn 7991/BGDĐT-GDTrH
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Tạo đề ngẫu nhiên theo Chương & Đơn vị kiến thức
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Ngân hàng hiện có <strong className="text-white underline">{availableQuestions.length} câu hỏi</strong> môn {subject.name} Lớp {grade}. Đề thi tự động phân bổ 4 mức độ nhận thức, sinh mã đề độc lập và chấm điểm tức thời kèm lời giải sư phạm chi tiết.
            </p>

            {/* Scope Selection */}
            {availableChapters.length > 0 && (
              <div className="pt-2 flex items-center gap-2">
                <span className="text-xs font-bold text-blue-100 flex items-center gap-1 shrink-0">
                  <Sliders className="w-3.5 h-3.5" /> Phạm vi:
                </span>
                <select
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                  className="bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-medium rounded-xl px-3 py-1.5 outline-none cursor-pointer max-w-xs transition-colors"
                >
                  <option value="all" className="text-slate-900">
                    Toàn bộ chương trình ({availableQuestions.length} câu)
                  </option>
                  {availableChapters.map((ch, idx) => {
                    const cnt = availableQuestions.filter(q => q.chapter === ch).length;
                    return (
                      <option key={idx} value={ch} className="text-slate-900">
                        {ch} ({cnt} câu)
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex items-center justify-center gap-1.5 bg-white/10 p-1.5 rounded-2xl border border-white/20 backdrop-blur-xs">
              {[5, 10, 15, 20].map(cnt => (
                <button
                  key={cnt}
                  onClick={() => setCustomCount(cnt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    customCount === cnt
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {cnt} câu
                </button>
              ))}
            </div>

            <button
              onClick={startQuickPractice}
              disabled={availableQuestions.length === 0}
              className={`px-6 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer ${
                availableQuestions.length > 0
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-900 shadow-amber-400/20'
                  : 'bg-white/30 text-white cursor-not-allowed'
              }`}
            >
              <Play className="w-4 h-4 fill-slate-900" />
              Bắt đầu làm bài
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Predefined Exam List + Student History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Predefined Exams */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-extrabold text-[#172B4D] flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-blue-600" />
              Đề kiểm tra chính thức & Đề định kỳ (Kèm Ma trận CV 7991)
            </h3>

            {/* Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: '15_phut', label: '15 phút' },
                { id: 'giua_ky', label: 'Giữa kỳ' },
                { id: 'cuoi_ky', label: 'Cuối kỳ' },
                { id: 'luyen_tap', label: 'Luyện tập' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    filterType === f.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredExams.map(exam => {
                const questionCount = exam.questionIds.length;
                return (
                  <div
                    key={exam.id}
                    className="p-5 rounded-2xl bg-white border border-[#E2EAF5] hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-2 font-bold gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                            {exam.examType === '15_phut'
                              ? '15 Phút'
                              : exam.examType === 'giua_ky'
                              ? 'Giữa Học Kỳ'
                              : exam.examType === 'cuoi_ky'
                              ? 'Cuối Học Kỳ'
                              : 'Đề Luyện Tập'}
                          </span>
                          {exam.examCode && (
                            <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {exam.examCode}
                            </span>
                          )}
                        </div>

                        <span className="flex items-center gap-1 text-slate-500 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-blue-500" />
                          {exam.durationMinutes} phút
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#172B4D] leading-snug">
                        {exam.title}
                      </h4>

                      <p className="text-xs text-[#64748B] line-clamp-2 mt-2 leading-relaxed">
                        {exam.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenMatrixModal(exam)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                        title="Xem Ma trận & Bản đặc tả đề theo Công văn 7991"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-500" />
                        Ma trận 7991
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-500 font-medium">
                          {exam.essayQuestions && exam.essayQuestions.length > 0
                            ? `${questionCount} câu TN + ${exam.essayQuestions.length} TL`
                            : `${questionCount} câu`}
                        </span>
                        <button
                          onClick={() => startPredefinedExam(exam)}
                          className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-[#2684FF] text-blue-700 hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          Vào thi <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-white border border-[#E2EAF5] text-slate-500 space-y-3">
              <AlertCircle className="w-8 h-8 mx-auto text-amber-500" />
              <p className="text-sm font-medium">
                Chưa có đề thi mẫu trong danh mục này. Em hãy sử dụng nút "Tạo đề tự động" ở trên để làm đề thi chuẩn CV 7991 nhé!
              </p>
            </div>
          )}
        </div>

        {/* Right: Student's Recent Exam Attempts */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[#172B4D] flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Lịch sử làm bài gần đây
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                {recentResults.length} lần làm
              </span>
            </div>

            {recentResults.length > 0 ? (
              <div className="space-y-3">
                {recentResults.slice(0, 5).map(res => (
                  <div
                    key={res.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-2">
                      <h5 className="text-xs font-bold text-[#172B4D] truncate">
                        {res.examTitle}
                      </h5>
                      <span className="text-[10px] text-slate-500">
                        {new Date(res.completedAt).toLocaleDateString('vi-VN')} • Đúng {res.correctCount}/{res.totalQuestions} câu
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <div
                        className={`text-sm font-black ${
                          res.score >= 8
                            ? 'text-emerald-600'
                            : res.score >= 5
                            ? 'text-blue-600'
                            : 'text-amber-600'
                        }`}
                      >
                        {res.score.toFixed(1)} <span className="text-[10px] font-normal text-slate-400">đ</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center rounded-2xl bg-slate-50 text-slate-500 text-xs">
                Em chưa làm bài kiểm tra nào cho môn {subject.name} Lớp {grade}. Hãy thử sức ngay bây giờ nhé!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: XEM MA TRẬN & BẢN ĐẶC TẢ THEO CÔNG VĂN 7991/BGDĐT-GDTrH */}
      {viewingMatrixExam && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-blue-200 font-bold">
                    Căn cứ Công văn 7991/BGDĐT-GDTrH & Thông tư 22/2021/TT-BGDĐT
                  </div>
                  <h3 className="text-base sm:text-lg font-black leading-tight">
                    Ma trận & Bản đặc tả đề kiểm tra {subject.name} — Khối {grade}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setViewingMatrixExam(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
              {/* Meta specs bar */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <div className="text-slate-400 font-semibold">Tên đề thi:</div>
                  <div className="font-bold text-slate-800 truncate">{viewingMatrixExam.exam.title}</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold">Thời gian làm bài:</div>
                  <div className="font-bold text-blue-600">{viewingMatrixExam.matrix.durationMinutes} phút</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold">Tổng số câu hỏi:</div>
                  <div className="font-bold text-indigo-600">{viewingMatrixExam.matrix.totalQuestions} câu trắc nghiệm</div>
                </div>
                <div>
                  <div className="text-slate-400 font-semibold">Tỉ lệ 4 mức độ:</div>
                  <div className="font-bold text-emerald-600">
                    {viewingMatrixExam.matrix.knowingRatio}% - {viewingMatrixExam.matrix.understandingRatio}% - {viewingMatrixExam.matrix.applyingRatio}% - {viewingMatrixExam.matrix.highApplyingRatio}%
                  </div>
                </div>
              </div>

              {/* PHẦN 1: MA TRẬN ĐỀ KIỂM TRA */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-extrabold text-blue-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    I. Ma trận đề kiểm tra trắc nghiệm (Chuẩn CV 7991)
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">Thang điểm 10</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5 text-center w-10">TT</th>
                        <th className="p-2.5 min-w-[140px]">Chủ đề / Mạch kiến thức</th>
                        <th className="p-2.5 min-w-[140px]">Đơn vị kiến thức</th>
                        <th className="p-2 text-center bg-blue-50 text-blue-900">Nhận biết</th>
                        <th className="p-2 text-center bg-indigo-50 text-indigo-900">Thông hiểu</th>
                        <th className="p-2 text-center bg-amber-50 text-amber-900">Vận dụng</th>
                        <th className="p-2 text-center bg-rose-50 text-rose-900">VD cao</th>
                        <th className="p-2 text-center font-black">Tổng số câu</th>
                        <th className="p-2 text-center font-black">Điểm số</th>
                        <th className="p-2 text-center font-black">Tỉ lệ %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {viewingMatrixExam.matrix.matrixRows.map((row, idx) => (
                        <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-2.5 text-center font-bold text-slate-400">{idx + 1}</td>
                          <td className="p-2.5 font-bold text-slate-800">{row.topic}</td>
                          <td className="p-2.5 text-slate-600">{row.contentUnit}</td>
                          <td className="p-2 text-center font-semibold text-blue-700 bg-blue-50/50">{row.knowingCount}</td>
                          <td className="p-2 text-center font-semibold text-indigo-700 bg-indigo-50/50">{row.understandingCount}</td>
                          <td className="p-2 text-center font-semibold text-amber-700 bg-amber-50/50">{row.applyingCount}</td>
                          <td className="p-2 text-center font-semibold text-rose-700 bg-rose-50/50">{row.highApplyingCount}</td>
                          <td className="p-2 text-center font-bold text-slate-900">{row.totalQuestions}</td>
                          <td className="p-2 text-center font-bold text-emerald-700">{row.totalPoints.toFixed(1)} đ</td>
                          <td className="p-2 text-center font-bold text-slate-600">{row.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-100/90 font-black border-t-2 border-slate-300 text-slate-900">
                      <tr>
                        <td colSpan={3} className="p-3 text-center uppercase tracking-wide">
                          Tổng cộng toàn đề
                        </td>
                        <td className="p-2 text-center text-blue-700">
                          {viewingMatrixExam.matrix.matrixRows.reduce((a, b) => a + b.knowingCount, 0)} câu
                        </td>
                        <td className="p-2 text-center text-indigo-700">
                          {viewingMatrixExam.matrix.matrixRows.reduce((a, b) => a + b.understandingCount, 0)} câu
                        </td>
                        <td className="p-2 text-center text-amber-700">
                          {viewingMatrixExam.matrix.matrixRows.reduce((a, b) => a + b.applyingCount, 0)} câu
                        </td>
                        <td className="p-2 text-center text-rose-700">
                          {viewingMatrixExam.matrix.matrixRows.reduce((a, b) => a + b.highApplyingCount, 0)} câu
                        </td>
                        <td className="p-2 text-center text-blue-900 font-black">
                          {viewingMatrixExam.matrix.totalQuestions} câu
                        </td>
                        <td className="p-2 text-center text-emerald-800 font-black">
                          10.0 đ
                        </td>
                        <td className="p-2 text-center text-slate-900 font-black">
                          100%
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* PHẦN 2: BẢN ĐẶC TẢ ĐỀ KIỂM TRA */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-extrabold text-blue-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    II. Bản đặc tả đề kiểm tra (Yêu cầu cần đạt chuẩn GDPT 2018)
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">{viewingMatrixExam.matrix.specifications.length} mục đặc tả</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5 text-center w-10">TT</th>
                        <th className="p-2.5 min-w-[130px]">Chủ đề</th>
                        <th className="p-2.5 min-w-[130px]">Đơn vị kiến thức</th>
                        <th className="p-2.5 w-28">Mức độ nhận thức</th>
                        <th className="p-2.5 min-w-[200px]">Yêu cầu cần đạt (chuẩn CT GDPT 2018)</th>
                        <th className="p-2.5 min-w-[140px]">Dạng thức câu hỏi</th>
                        <th className="p-2 text-center w-16">Số câu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {viewingMatrixExam.matrix.specifications.map((spec, idx) => {
                        const levelBadge =
                          spec.level === 'nhan_biet'
                            ? { label: 'Nhận biết', bg: 'bg-blue-100 text-blue-800' }
                            : spec.level === 'thong_hieu'
                            ? { label: 'Thông hiểu', bg: 'bg-indigo-100 text-indigo-800' }
                            : spec.level === 'van_dung'
                            ? { label: 'Vận dụng', bg: 'bg-amber-100 text-amber-800' }
                            : { label: 'Vận dụng cao', bg: 'bg-rose-100 text-rose-800' };

                        return (
                          <tr key={spec.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-2.5 text-center font-bold text-slate-400">{idx + 1}</td>
                            <td className="p-2.5 font-bold text-slate-800">{spec.topic}</td>
                            <td className="p-2.5 text-slate-600">{spec.contentUnit}</td>
                            <td className="p-2.5">
                              <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${levelBadge.bg}`}>
                                {levelBadge.label}
                              </span>
                            </td>
                            <td className="p-2.5 text-slate-700 leading-relaxed">{spec.competencyRequired}</td>
                            <td className="p-2.5 text-slate-500">{spec.questionType}</td>
                            <td className="p-2 text-center font-black text-blue-700">{spec.questionCount}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500 font-medium">
                Tổ Chuyên Môn THCS Mỹ Hòa kiểm duyệt
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewingMatrixExam(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    const examToStart = viewingMatrixExam.exam;
                    setViewingMatrixExam(null);
                    startPredefinedExam(examToStart);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#2684FF] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Bắt đầu làm bài thi này
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CẢNH BÁO THIẾU DỮ LIỆU CÂU HỎI THEO QUY ĐỊNH */}
      {scopeWarning && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#172B4D]">Thông báo dữ liệu câu hỏi</h4>
                <p className="text-xs text-slate-500 font-medium">Quy chuẩn Công văn 7991 & Số lượng câu</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed bg-amber-50/80 p-4 rounded-2xl border border-amber-200/60 font-medium">
              {scopeWarning}
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setScopeWarning(null)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm cursor-pointer transition-colors"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

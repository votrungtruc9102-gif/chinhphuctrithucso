import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Timer,
  Heart,
  Award,
  ChevronRight,
  Flame,
  Volume2,
  VolumeX,
  Dumbbell,
  Users,
  Settings,
  Plus,
  Trash2,
  Save,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  EXERCISE_MOVEMENTS,
  ExerciseQuestion,
  ExerciseMovement,
  AnatomicalGroup
} from '../../data/exerciseGameData';
import { arenaStorageService } from '../../services/arenaStorageService';
import { gameAudio } from '../../utils/gameAudio';
import { HumanoidExerciseAvatar, AvatarGender } from './HumanoidExerciseAvatar';
import { shuffleSingleQuestionOptions, generateBalancedTargetSlots } from '../../utils/gameQuestionHelper';

function prepareShuffledExerciseQuestions(questions: ExerciseQuestion[]): ExerciseQuestion[] {
  if (!questions || questions.length === 0) return [];
  const mcIndices: number[] = [];
  questions.forEach((q, idx) => {
    if (!q.questionType || q.questionType === 'multiple_choice') {
      mcIndices.push(idx);
    }
  });

  const slots = generateBalancedTargetSlots(mcIndices.length);
  const shuffledList = [...questions];

  // Shuffle order of questions
  for (let i = shuffledList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
  }

  // Shuffle options of each multiple_choice question
  let slotIdx = 0;
  return shuffledList.map(q => {
    if (!q.questionType || q.questionType === 'multiple_choice') {
      const assignedSlot = slots[slotIdx++] ?? Math.floor(Math.random() * 4);
      return shuffleSingleQuestionOptions(q, assignedSlot);
    }
    return q;
  });
}

interface ExerciseGameModalProps {
  onClose: () => void;
  onAddScore: (points: number) => void;
  currentUser?: {
    id: string;
    name: string;
    role?: string;
    classId?: string;
  };
}

export const ExerciseGameModal: React.FC<ExerciseGameModalProps> = ({
  onClose,
  onAddScore,
  currentUser
}) => {
  const [allQuestions, setAllQuestions] = useState<ExerciseQuestion[]>(() =>
    prepareShuffledExerciseQuestions(arenaStorageService.getExerciseQuestions())
  );
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [gender, setGender] = useState<AvatarGender>('male');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameState, setGameState] = useState<
    'intro' | 'exercising' | 'answering' | 'completed' | 'teacher_admin'
  >('intro');

  // Exercise tracking
  const [completedReps, setCompletedReps] = useState(0);
  const [exerciseTimer, setExerciseTimer] = useState(30);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [shortAnswerInput, setShortAnswerInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [isMuted, setIsMuted] = useState(() => gameAudio.getMuted());

  // Teacher admin draft
  const [adminQuestions, setAdminQuestions] = useState<ExerciseQuestion[]>([]);
  const [adminNotice, setAdminNotice] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter questions based on class
  const filteredQuestions = allQuestions.filter(q => {
    if (selectedClass === 'all') return true;
    return q.targetClass === selectedClass || (!q.targetClass && String(q.grade) === selectedClass.charAt(0));
  });

  const activeQuestions = filteredQuestions.length > 0 ? filteredQuestions : allQuestions;
  const currentQ = activeQuestions[currentIndex % activeQuestions.length];

  // Resolve movement
  const movement: ExerciseMovement =
    EXERCISE_MOVEMENTS.find(m => m.id === currentQ.movementId) || EXERCISE_MOVEMENTS[0];

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Start movement round
  const handleStartExercise = () => {
    setGameState('exercising');
    setCompletedReps(0);
    setExerciseTimer(currentQ.timeLimitSec || 45);
    setIsAnswered(false);
    setSelectedOption(null);
    setShortAnswerInput('');

    gameAudio.playClick();

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setExerciseTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setGameState('answering');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Student completes a repetition
  const handleCountRep = () => {
    const next = completedReps + 1;
    setCompletedReps(next);
    gameAudio.playClick();

    if (next >= currentQ.reps) {
      if (timerRef.current) clearInterval(timerRef.current);
      gameAudio.playCorrect();
      setGameState('answering');
    }
  };

  // Helper normalize string for answer comparison
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]/g, '');
  };

  // Handle multiple-choice answer
  const handleAnswerOption = (optIndex: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(optIndex);

    if (optIndex === currentQ.correctAnswer) {
      gameAudio.playCorrect();
      const points = 25;
      setTotalScore(prev => prev + points);
      onAddScore(points);
      try {
        confetti({ particleCount: 60, spread: 50 });
      } catch {}
    } else {
      gameAudio.playIncorrect();
    }
  };

  // Handle short answer submission
  const handleAnswerSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAnswered || !shortAnswerInput.trim()) return;
    setIsAnswered(true);

    const normInput = normalizeText(shortAnswerInput);
    const correctOpt = currentQ.options[currentQ.correctAnswer] || '';
    const normCorrect = normalizeText(correctOpt);

    const isMatch =
      normInput === normCorrect ||
      normCorrect.includes(normInput) ||
      (currentQ.acceptableAnswers &&
        currentQ.acceptableAnswers.some(ans => normalizeText(ans) === normInput));

    if (isMatch) {
      gameAudio.playCorrect();
      const points = 30; // Bonus for writing short answer
      setTotalScore(prev => prev + points);
      onAddScore(points);
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {}
    } else {
      gameAudio.playIncorrect();
    }
  };

  // Next Round
  const handleNextRound = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setGameState('intro');
      setCompletedReps(0);
      setIsAnswered(false);
      setSelectedOption(null);
      setShortAnswerInput('');
    } else {
      setGameState('completed');
      gameAudio.playVictory();
      try {
        confetti({ particleCount: 100, spread: 70 });
      } catch {}
    }
  };

  // Restart with fresh shuffled questions & options
  const handleRestart = () => {
    setAllQuestions(prepareShuffledExerciseQuestions(arenaStorageService.getExerciseQuestions()));
    setCurrentIndex(0);
    setTotalScore(0);
    setCompletedReps(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setShortAnswerInput('');
    setGameState('intro');
  };

  // Open Teacher Admin
  const handleOpenAdmin = () => {
    setAdminQuestions(JSON.parse(JSON.stringify(allQuestions)));
    setGameState('teacher_admin');
  };

  // Save Teacher Changes
  const handleSaveAdmin = () => {
    arenaStorageService.saveExerciseQuestions(adminQuestions);
    setAllQuestions(prepareShuffledExerciseQuestions(adminQuestions));
    setAdminNotice('Đã lưu dữ liệu bài tập và câu hỏi thành công!');
    setTimeout(() => setAdminNotice(null), 3000);
    setGameState('intro');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border-2 border-emerald-500/40 text-white shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-lg">
              🏃‍♂️
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-white flex items-center gap-2">
                <span>Thể Dục Trí Tuệ – 8 Nhóm Khớp Vận Động</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Vòng {currentIndex + 1} / {activeQuestions.length} · Điểm rèn luyện: +{totalScore}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Teacher admin trigger */}
            <button
              onClick={handleOpenAdmin}
              title="Quản lý câu hỏi dành cho Giáo viên"
              className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Giáo viên</span>
            </button>

            <button
              onClick={() => {
                const next = !isMuted;
                setIsMuted(next);
                gameAudio.setMuted(next);
              }}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Toolbar: Class Selector & Avatar Gender */}
        {gameState !== 'teacher_admin' && (
          <div className="px-4 py-2.5 bg-slate-950/70 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
            {/* Class tabs: 6A5, 7A5, 8A5, 9A5 */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Lớp học:
              </span>
              {[
                { id: 'all', label: 'Tất cả' },
                { id: '6A5', label: 'Lớp 6A5' },
                { id: '7A5', label: 'Lớp 7A5' },
                { id: '8A5', label: 'Lớp 8A5' },
                { id: '9A5', label: 'Lớp 9A5' }
              ].map(cls => (
                <button
                  key={cls.id}
                  onClick={() => {
                    setSelectedClass(cls.id);
                    setCurrentIndex(0);
                    setGameState('intro');
                  }}
                  className={`px-2.5 py-1 rounded-xl font-bold cursor-pointer transition-all ${
                    selectedClass === cls.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {cls.label}
                </button>
              ))}
            </div>

            {/* Avatar Gender Toggle */}
            <div className="flex items-center gap-1.5 text-xs bg-slate-900 p-1 rounded-2xl border border-slate-800">
              <span className="text-[11px] font-medium text-slate-400 pl-1">Nhân vật:</span>
              <button
                onClick={() => setGender('male')}
                className={`px-2.5 py-0.5 rounded-xl font-bold transition-colors cursor-pointer ${
                  gender === 'male'
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                👦 Nam sinh
              </button>
              <button
                onClick={() => setGender('female')}
                className={`px-2.5 py-0.5 rounded-xl font-bold transition-colors cursor-pointer ${
                  gender === 'female'
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                👧 Nữ sinh
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-slate-200">
          {/* STEP 1: INTRO TO EXERCISE & ANATOMICAL GROUP */}
          {gameState === 'intro' && (
            <div className="space-y-5 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                {/* Left: Interactive Articulated Avatar Preview */}
                <div className="p-3 bg-slate-950/60 rounded-3xl border border-slate-800/80">
                  <HumanoidExerciseAvatar
                    gender={gender}
                    movementGroup={movement.group}
                    movementName={movement.name}
                    isExercising={false}
                    currentReps={0}
                    targetReps={currentQ.reps}
                  />
                </div>

                {/* Right: Movement Instructions & Benefits */}
                <div className="space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
                      <span>{movement.icon}</span>
                      <span>{movement.groupName}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      {movement.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-emerald-300/90 font-medium mt-1">
                      Mục tiêu rèn luyện: Hoàn thành {currentQ.reps} nhịp vận động trong {currentQ.timeLimitSec}s
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Tác dụng giải mỏi sinh học:</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{movement.benefit}</p>
                    <p className="text-slate-400 text-[11px] leading-relaxed pt-1 border-t border-slate-800/80">
                      {movement.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-1 text-xs text-slate-300">
                    <div className="font-bold text-slate-200 text-[11px] uppercase tracking-wider mb-1">
                      Các bước thực hiện chuẩn:
                    </div>
                    {movement.guideSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleStartExercise}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 cursor-pointer transition-all"
                  >
                    <Play className="w-5 h-5 fill-slate-950" />
                    <span>Bắt đầu vận động ({currentQ.reps} lần)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EXERCISING WITH LIVE ARTICULATED SKELETON */}
          {gameState === 'exercising' && (
            <div className="space-y-4 py-1">
              {/* Header Timer Bar */}
              <div className="flex items-center justify-between bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <Timer className="w-4 h-4 text-emerald-400" />
                  <span>Thời gian vận động còn lại:</span>
                </div>
                <span
                  className={`font-mono text-base font-black ${
                    exerciseTimer <= 10 ? 'text-red-400 animate-pulse' : 'text-emerald-400'
                  }`}
                >
                  {exerciseTimer} giây
                </span>
              </div>

              {/* Central Humanoid Model Performing Motion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="p-3 bg-slate-950/70 rounded-3xl border border-emerald-500/30 shadow-lg">
                  <HumanoidExerciseAvatar
                    gender={gender}
                    movementGroup={movement.group}
                    movementName={movement.name}
                    isExercising={true}
                    currentReps={completedReps}
                    targetReps={currentQ.reps}
                  />
                </div>

                <div className="space-y-4 text-center md:text-left">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                      {movement.groupName}
                    </span>
                    <h3 className="text-lg font-black text-white mt-0.5">{movement.name}</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {movement.description}
                    </p>
                  </div>

                  {/* Repetition Visual Gauge */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-300">Tiến độ nhịp tập:</span>
                      <span className="text-emerald-400 font-black text-lg">
                        {completedReps} / {currentQ.reps} lần
                      </span>
                    </div>

                    <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full"
                        style={{
                          width: `${Math.min(100, (completedReps / currentQ.reps) * 100)}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Manual / Beat Rep Count Trigger */}
                  <div className="space-y-2">
                    <button
                      onClick={handleCountRep}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-95 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Dumbbell className="w-5 h-5" />
                      <span>Đã tập +1 lần (Nhấn vào đây)</span>
                    </button>
                    <p className="text-[11px] text-slate-400 text-center">
                      Mỗi khi bạn thực hiện xong 1 nhịp vận động, hãy bấm nút để ghi nhận tiến độ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ANSWERING CURRICULUM QUESTION */}
          {gameState === 'answering' && (
            <div className="space-y-5 py-2">
              <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    Hoàn thành bài tập {movement.groupName}! Cơ thể đã sẵn sàng tiếp thu tri thức.
                  </span>
                </div>
                <span className="text-xs font-bold text-amber-300">
                  Khối {currentQ.grade} · {currentQ.targetClass || 'Chung'}
                </span>
              </div>

              {/* Question Box */}
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                    Môn: {currentQ.subject}
                  </span>
                  <span className="text-xs text-slate-400">
                    {currentQ.questionType === 'short_answer'
                      ? 'Dạng câu hỏi: Điền từ ngắn'
                      : 'Dạng câu hỏi: Trắc nghiệm 4 lựa chọn'}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  {currentQ.question}
                </h3>

                {/* Multiple choice options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentQ.options.map((opt, idx) => {
                    let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (isAnswered) {
                      if (idx === currentQ.correctAnswer) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                      } else if (idx === selectedOption) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                      } else {
                        btnStyle = 'bg-slate-950/60 border-slate-900 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAnswerOption(idx)}
                        className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="pt-0.5">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Short answer input option */}
                {!isAnswered && (
                  <form onSubmit={handleAnswerSubmit} className="pt-3 flex gap-2">
                    <input
                      type="text"
                      placeholder="Hoặc gõ nhanh câu trả lời vào đây..."
                      value={shortAnswerInput}
                      onChange={e => setShortAnswerInput(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      disabled={!shortAnswerInput.trim()}
                      className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      Trả lời
                    </button>
                  </form>
                )}

                {/* Explanation feedback */}
                {isAnswered && (
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-2 mt-3 animate-fade-in">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Giải thích kiến thức THCS:</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>

                    <button
                      onClick={handleNextRound}
                      className="mt-3 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer shadow-md ml-auto"
                    >
                      <span>Tiếp tục vòng sau</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: COMPLETED SUMMARY */}
          {gameState === 'completed' && (
            <div className="text-center space-y-5 py-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-emerald-400 text-slate-950 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/20">
                🏆
              </div>

              <div>
                <h2 className="text-2xl font-black text-white">Xuất Sắc Hoàn Thành!</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Bạn đã hoàn thành trọn vẹn chuỗi bài tập Thể Dục Trí Tuệ của .
                </p>
              </div>

              <div className="max-w-xs mx-auto p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/40 text-center space-y-1">
                <span className="text-xs text-slate-400">Tổng điểm rèn luyện thu được:</span>
                <div className="text-3xl font-black text-emerald-400">+{totalScore} RP</div>
                <div className="text-[11px] text-emerald-300/80">
                  Đã đồng bộ vào hồ sơ chiến binh học tập!
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Tập lại từ đầu</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg shadow-emerald-500/30"
                >
                  Xác nhận & Đóng
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: TEACHER MANAGEMENT VIEW */}
          {gameState === 'teacher_admin' && (
            <div className="space-y-4 py-1">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-black text-amber-300 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-amber-400" />
                    <span>Bảng Quản Lý Bài Tập Thể Dục & Câu Hỏi Dành Cho Giáo Viên</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Tùy chỉnh số lần lặp, thời gian, câu hỏi cho các lớp 6A5, 7A5, 8A5, 9A5
                  </p>
                </div>
                <button
                  onClick={() => setGameState('intro')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                >
                  Quay lại
                </button>
              </div>

              {adminNotice && (
                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{adminNotice}</span>
                </div>
              )}

              {/* Questions List for Editing */}
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {adminQuestions.map((q, qIdx) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-400">
                        #{qIdx + 1} · Lớp {q.targetClass || `Khối ${q.grade}`} · Môn {q.subject}
                      </span>
                      <div className="flex items-center gap-2">
                        <select
                          value={q.targetClass || 'all'}
                          onChange={e => {
                            const val = e.target.value as any;
                            setAdminQuestions(prev =>
                              prev.map((item, idx) =>
                                idx === qIdx ? { ...item, targetClass: val } : item
                              )
                            );
                          }}
                          className="px-2 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                        >
                          <option value="6A5">Lớp 6A5</option>
                          <option value="7A5">Lớp 7A5</option>
                          <option value="8A5">Lớp 8A5</option>
                          <option value="9A5">Lớp 9A5</option>
                          <option value="all">Tất cả</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400">Nội dung câu hỏi:</label>
                      <input
                        type="text"
                        value={q.question}
                        onChange={e => {
                          const val = e.target.value;
                          setAdminQuestions(prev =>
                            prev.map((item, idx) =>
                              idx === qIdx ? { ...item, question: val } : item
                            )
                          );
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400">Số lần tập (Reps):</label>
                        <input
                          type="number"
                          min="2"
                          max="30"
                          value={q.reps}
                          onChange={e => {
                            const val = Number(e.target.value) || 5;
                            setAdminQuestions(prev =>
                              prev.map((item, idx) =>
                                idx === qIdx ? { ...item, reps: val } : item
                              )
                            );
                          }}
                          className="w-full px-2 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-0.5"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400">Thời gian (giây):</label>
                        <input
                          type="number"
                          min="15"
                          max="120"
                          value={q.timeLimitSec}
                          onChange={e => {
                            const val = Number(e.target.value) || 45;
                            setAdminQuestions(prev =>
                              prev.map((item, idx) =>
                                idx === qIdx ? { ...item, timeLimitSec: val } : item
                              )
                            );
                          }}
                          className="w-full px-2 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-0.5"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400">Động tác gán:</label>
                        <select
                          value={q.movementId}
                          onChange={e => {
                            const val = e.target.value;
                            setAdminQuestions(prev =>
                              prev.map((item, idx) =>
                                idx === qIdx ? { ...item, movementId: val } : item
                              )
                            );
                          }}
                          className="w-full px-2 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-0.5"
                        >
                          {EXERCISE_MOVEMENTS.map(m => (
                            <option key={m.id} value={m.id}>
                              {m.icon} {m.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400">Đáp án đúng (0-3):</label>
                        <input
                          type="number"
                          min="0"
                          max="3"
                          value={q.correctAnswer}
                          onChange={e => {
                            const val = Number(e.target.value) || 0;
                            setAdminQuestions(prev =>
                              prev.map((item, idx) =>
                                idx === qIdx ? { ...item, correctAnswer: val } : item
                              )
                            );
                          }}
                          className="w-full px-2 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-0.5"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <button
                  onClick={() => {
                    const newQ: ExerciseQuestion = {
                      id: `ex_custom_${Date.now()}`,
                      question: 'Câu hỏi rèn luyện kiến thức mới...',
                      grade: 6,
                      targetClass: '6A5',
                      subject: 'Tổng hợp',
                      options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
                      correctAnswer: 0,
                      explanation: 'Giải thích chi tiết kiến thức...',
                      movementId: 'neck_flexion',
                      reps: 6,
                      timeLimitSec: 45
                    };
                    setAdminQuestions(prev => [newQ, ...prev]);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Thêm câu hỏi mới</span>
                </button>

                <button
                  onClick={handleSaveAdmin}
                  className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/30"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu tất cả thay đổi</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

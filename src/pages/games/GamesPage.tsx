import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Sparkles,
  Trophy,
  RotateCw,
  Zap,
  Layers,
  HelpCircle,
  CheckCircle,
  XCircle,
  Timer,
  Play,
  RotateCcw,
  Star,
  Brain,
  Dumbbell,
  Eye,
  Swords,
  ChevronRight,
  Flame,
  Award,
  Users,
  Search,
  UserCheck,
  User,
  UserPlus,
  LogIn,
  X,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GradeLevel, SubjectMeta, Question, UserAccount } from '../../types';
import { MATCHING_GAME_PAIRS, WORD_GUESS_LIST, TermPair, WordGuess } from '../../data/mockData';
import { ArenaHubSection } from '../../components/games/ArenaHubSection';
import { BossCampaignSection } from '../../components/games/BossCampaignSection';
import { ExerciseGameModal } from '../../components/games/ExerciseGameModal';
import { ImagePuzzleModal } from '../../components/games/ImagePuzzleModal';
import { BossRaidModal } from '../../components/games/BossRaidModal';
import { PvPBattleModal } from '../../components/games/PvPBattleModal';
import { PvPArenaMasterModal } from '../../components/games/PvPArenaMasterModal';
import { LeaderboardModal } from '../../components/games/LeaderboardModal';
import { ProfileEditModal } from '../../components/games/ProfileEditModal';
import { MysteryDecodeModal } from '../../components/games/MysteryDecodeModal';
import { IQChallengeModal } from '../../components/games/IQChallengeModal';
import { KnowledgeRaceModal } from '../../components/games/KnowledgeRaceModal';
import { SubjectPracticeGameModal } from '../../components/games/SubjectPracticeGameModal';
import { realtimeService, StudentPresenceData, PvPRoomState } from '../../services/realtimeService';
import { StudentRegisterModal } from '../../components/auth/StudentRegisterModal';
import { studentAccountService, RegisteredStudent } from '../../services/studentAccountService';
import { SmartBackButton } from '../../components/common/SmartBackButton';

interface GamesPageProps {
  grade: GradeLevel;
  subject: SubjectMeta;
  questions: Question[];
  onOpenDrawer: () => void;
  onAddScore: (points: number, txId?: string, gameType?: string, details?: string) => void;
  onBackToHome?: () => void;
  currentUser?: UserAccount | null;
  isTeacher?: boolean;
}

type MainTab = 'hub_games' | 'arena_zone' | 'boss_campaign' | 'arena_legend';
type GameMode = 'hub' | 'wheel' | 'matching' | 'speed' | 'word_guess' | 'flash_tilt';

export const GamesPage: React.FC<GamesPageProps> = ({
  grade,
  subject,
  questions,
  onOpenDrawer,
  onAddScore,
  onBackToHome,
  currentUser,
  isTeacher = false
}) => {
  // Top-level tab: Trò chơi học tập vs 50 Đấu trường trí tuệ
  const [mainTab, setMainTab] = useState<MainTab>('hub_games');
  const [activeGame, setActiveGame] = useState<GameMode>('hub');

  // Modals state
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [isImagePuzzleModalOpen, setIsImagePuzzleModalOpen] = useState(false);
  const [isBossRaidOpen, setIsBossRaidOpen] = useState(false);
  const [selectedBossId, setSelectedBossId] = useState<string>('boss_6_1');
  const [isPvPModalOpen, setIsPvPModalOpen] = useState(false);
  const [isPvPArenaMasterOpen, setIsPvPArenaMasterOpen] = useState(false);
  const [pvpPreSelectedOpponent, setPvpPreSelectedOpponent] = useState<StudentPresenceData | null>(null);
  const [pvpRoomState, setPvPRoomState] = useState<PvPRoomState | null>(null);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isMysteryModalOpen, setIsMysteryModalOpen] = useState(false);
  const [isIQModalOpen, setIsIQModalOpen] = useState(false);
  const [isRaceModalOpen, setIsRaceModalOpen] = useState(false);
  const [isSubjectPracticeOpen, setIsSubjectPracticeOpen] = useState(false);

  // Registered Student Account State (Real Accounts, No Password)
  const [activeRegisteredStudent, setActiveRegisteredStudent] = useState<RegisteredStudent | null>(() =>
    studentAccountService.getActiveStudent()
  );
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerModalInitialMode, setRegisterModalInitialMode] = useState<'register' | 'login' | 'recover'>('register');
  const [welcomeBannerDismissed, setWelcomeBannerDismissed] = useState(false);

  // Realtime Presence state
  const [onlineStudents, setOnlineStudents] = useState<StudentPresenceData[]>([]);
  const [challengeNotice, setChallengeNotice] = useState<string>('');

  // Auto-restore student session from server on mount
  useEffect(() => {
    studentAccountService.autoRestoreSession().then(stu => {
      if (stu) setActiveRegisteredStudent(stu);
    });

    const unsubStudent = studentAccountService.subscribe(stu => {
      setActiveRegisteredStudent(stu);
    });

    return () => unsubStudent();
  }, []);

  // Effective User (Prioritizes persistent registered student account, fallback to currentUser)
  const effectiveUser: UserAccount | null = activeRegisteredStudent
    ? {
        uid: activeRegisteredStudent.uid,
        username: activeRegisteredStudent.accountCode.toLowerCase(),
        passwordHash: 'no_password_student',
        displayName: activeRegisteredStudent.displayName,
        className: activeRegisteredStudent.className,
        grade: activeRegisteredStudent.grade as GradeLevel,
        role: 'student' as const,
        isActive: true,
        createdAt: activeRegisteredStudent.createdAt,
        updatedAt: activeRegisteredStudent.lastActive
      }
    : currentUser || null;

  const handleScoreAdd = (points: number, gameType?: string, details?: string) => {
    const txId = `tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const effectiveGameName =
      gameType === 'boss_raid' ? 'Hành trình tri thức (50 Thử thách)'
      : gameType === 'arena_50' ? 'Đỉnh cao trí tuệ (50 Đại thử thách)'
      : gameType === 'pvp_1v1' ? 'Đấu trí học đường (PVP 1v1)'
      : gameType === 'exercise' ? 'Thể dục trí tuệ'
      : gameType === 'image_puzzle' ? 'Giải đố hình ảnh'
      : gameType === 'iq_challenge' ? 'Thử thách IQ'
      : gameType === 'knowledge_race' ? 'Đường đua tri thức'
      : gameType === 'subject_practice' ? 'Thử tài kiến thức'
      : gameType || 'Trò chơi học tập';

    const effectiveDetails = details || `Hoàn thành hoạt động và nhận +${points} điểm`;
    onAddScore(points, txId, effectiveGameName, effectiveDetails);

    if (activeRegisteredStudent) {
      studentAccountService.updateProgress({
        rpChange: points,
        pointsChange: points,
        expChange: points * 2,
        gameType: effectiveGameName,
        details: effectiveDetails
      });
    }
  };

  // Filter questions for current grade & subject
  const availableQuestions = questions.filter(
    q => q.grade === grade && q.subjectId === subject.id
  );

  // Listen to realtime presence and PvP room events
  useEffect(() => {
    // Initial fetch of active students
    fetch('/api/presence')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOnlineStudents(data);
      })
      .catch(() => {});

    const unsubPresence = realtimeService.on('presence:list', (list: StudentPresenceData[]) => {
      setOnlineStudents(list);
    });

    const unsubMatchStart = realtimeService.on('pvp:match_started', (data: { roomId: string; room: PvPRoomState }) => {
      setPvPRoomState(data.room);
      setIsPvPModalOpen(true);
    });

    const unsubRoomUpdate = realtimeService.on('pvp:room_update', (room: PvPRoomState) => {
      setPvPRoomState(room);
    });

    const unsubCountdown = realtimeService.on('pvp:countdown_started', (data: { seconds: number; room: PvPRoomState }) => {
      setPvPRoomState(data.room);
    });

    const unsubRound = realtimeService.on('pvp:round_started', (room: PvPRoomState) => {
      setPvPRoomState(room);
    });

    const unsubDeclined = realtimeService.on('pvp:declined', (data: { message: string }) => {
      alert(data.message || 'Đối thủ đã từ chối lời thách đấu.');
    });

    return () => {
      unsubPresence();
      unsubMatchStart();
      unsubRoomUpdate();
      unsubCountdown();
      unsubRound();
      unsubDeclined();
    };
  }, []);

  const handleChallengeStudent = (target: StudentPresenceData) => {
    setPvpPreSelectedOpponent(target);
    setIsPvPArenaMasterOpen(true);

    if (currentUser && target.uid !== currentUser.uid && currentUser.role !== 'teacher') {
      realtimeService.sendPvPInvite(target.uid, {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        className: currentUser.className || '6A1',
        grade: currentUser.grade || 6,
        avatarSeed: currentUser.avatarSeed,
        avatarEmoji: '🧑‍🎓'
      });
      setChallengeNotice(`Đã gửi lời mời thách đấu tới ${target.displayName} (${target.className}).`);
      setTimeout(() => setChallengeNotice(''), 5000);
    }
  };

  // ----------------------------------------------------
  // 1. LUCKY WHEEL (VÒNG QUAY MAY MẮN)
  // ----------------------------------------------------
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelQuestion, setWheelQuestion] = useState<Question | null>(null);
  const [selectedWheelOption, setSelectedWheelOption] = useState<number | null>(null);
  const [wheelResultMsg, setWheelResultMsg] = useState<string>('');

  const spinWheel = () => {
    if (isSpinning || availableQuestions.length === 0) return;
    setIsSpinning(true);
    setWheelQuestion(null);
    setSelectedWheelOption(null);
    setWheelResultMsg('');

    const randomDeg = 1440 + Math.floor(Math.random() * 360);
    setWheelRotation(prev => prev + randomDeg);

    setTimeout(() => {
      setIsSpinning(false);
      const randomQ = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      setWheelQuestion(randomQ);
    }, 2800);
  };

  const handleWheelAnswer = (optIndex: number) => {
    if (!wheelQuestion || selectedWheelOption !== null) return;
    setSelectedWheelOption(optIndex);

    if (optIndex === wheelQuestion.correctAnswerIndex) {
      setWheelResultMsg('🎉 Chính xác! Bạn nhận được +20 điểm thưởng!');
      onAddScore(20);
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {}
    } else {
      setWheelResultMsg('Chưa đúng rồi! ' + wheelQuestion.explanation);
    }
  };

  // ----------------------------------------------------
  // 2. MATCHING PAIRS (GHÉP CẶP CÂU HỎI VÀ ĐÁP ÁN)
  // ----------------------------------------------------
  const [matchingCards, setMatchingCards] = useState<{ id: string; text: string; pairId: string; type: 'term' | 'def' }[]>([]);
  const [selectedMatchFirst, setSelectedMatchFirst] = useState<{ id: string; pairId: string } | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<Set<string>>(new Set());
  const [matchingScore, setMatchingScore] = useState(0);

  const initMatchingGame = () => {
    const rawPairs = MATCHING_GAME_PAIRS.slice(0, 4);
    const cards: { id: string; text: string; pairId: string; type: 'term' | 'def' }[] = [];
    rawPairs.forEach(p => {
      cards.push({ id: `${p.id}-term`, text: p.term, pairId: p.id, type: 'term' });
      cards.push({ id: `${p.id}-def`, text: p.definition, pairId: p.id, type: 'def' });
    });
    cards.sort(() => Math.random() - 0.5);
    setMatchingCards(cards);
    setMatchedPairIds(new Set());
    setSelectedMatchFirst(null);
    setMatchingScore(0);
  };

  const handleCardClick = (card: { id: string; pairId: string }) => {
    if (matchedPairIds.has(card.pairId)) return;
    if (!selectedMatchFirst) {
      setSelectedMatchFirst(card);
    } else {
      if (selectedMatchFirst.id === card.id) {
        setSelectedMatchFirst(null);
        return;
      }
      if (selectedMatchFirst.pairId === card.pairId) {
        const next = new Set(matchedPairIds);
        next.add(card.pairId);
        setMatchedPairIds(next);
        setSelectedMatchFirst(null);
        setMatchingScore(prev => prev + 15);
        onAddScore(15);
        if (next.size === matchingCards.length / 2) {
          try {
            confetti({ particleCount: 100, spread: 80 });
          } catch {}
        }
      } else {
        setTimeout(() => setSelectedMatchFirst(null), 600);
      }
    }
  };

  // ----------------------------------------------------
  // 3. SPEED CHALLENGE (THỬ THÁCH TỐC ĐỘ 60 GIÂY)
  // ----------------------------------------------------
  const [speedQuestions, setSpeedQuestions] = useState<Question[]>([]);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [speedTimeLeft, setSpeedTimeLeft] = useState(60);
  const [isSpeedRunning, setIsSpeedRunning] = useState(false);
  const [speedScore, setSpeedScore] = useState(0);
  const [speedGameOver, setSpeedGameOver] = useState(false);

  const startSpeedGame = () => {
    if (availableQuestions.length === 0) return;
    const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
    setSpeedQuestions(shuffled);
    setSpeedIndex(0);
    setSpeedTimeLeft(60);
    setSpeedScore(0);
    setIsSpeedRunning(true);
    setSpeedGameOver(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSpeedRunning && speedTimeLeft > 0) {
      timer = setInterval(() => setSpeedTimeLeft(prev => prev - 1), 1000);
    } else if (speedTimeLeft === 0 && isSpeedRunning) {
      setIsSpeedRunning(false);
      setSpeedGameOver(true);
      try {
        confetti({ particleCount: 80, spread: 70 });
      } catch {}
    }
    return () => clearInterval(timer);
  }, [isSpeedRunning, speedTimeLeft]);

  const handleSpeedAnswer = (optIndex: number) => {
    if (!isSpeedRunning || speedIndex >= speedQuestions.length) return;
    const currentQ = speedQuestions[speedIndex];
    if (optIndex === currentQ.correctAnswerIndex) {
      setSpeedScore(prev => prev + 10);
      onAddScore(10);
    }
    if (speedIndex < speedQuestions.length - 1) {
      setSpeedIndex(prev => prev + 1);
    } else {
      setIsSpeedRunning(false);
      setSpeedGameOver(true);
    }
  };

  // ----------------------------------------------------
  // 4. WORD GUESS (ĐOÁN TỪ KHÓA)
  // ----------------------------------------------------
  const [wordIdx, setWordIdx] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wordWrongCount, setWordWrongCount] = useState(0);

  const currentWordItem = WORD_GUESS_LIST[wordIdx % WORD_GUESS_LIST.length];
  const targetWord = currentWordItem.word.toUpperCase();

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.has(letter)) return;
    const next = new Set(guessedLetters);
    next.add(letter);
    setGuessedLetters(next);
    if (!targetWord.includes(letter)) {
      setWordWrongCount(prev => prev + 1);
    } else {
      const allFound = targetWord.split('').every(ch => next.has(ch) || ch === ' ');
      if (allFound) {
        onAddScore(25);
        try {
          confetti({ particleCount: 80, spread: 70 });
        } catch {}
      }
    }
  };

  const nextWord = () => {
    setWordIdx(prev => prev + 1);
    setGuessedLetters(new Set());
    setWordWrongCount(0);
  };

  // ----------------------------------------------------
  // 5. NGHIÊNG ĐẦU / FLASH TILT
  // ----------------------------------------------------
  const [flashIdx, setFlashIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashKnownCount, setFlashKnownCount] = useState(0);

  const currentFlash = availableQuestions[flashIdx % (availableQuestions.length || 1)];

  return (
    <div className="space-y-6 pb-12">
      {/* ============================================================== */}
      {/* TOP NAVIGATION HEADER & VIEW SWITCHER (BỐ CỤC CÂN ĐỐI)         */}
      {/* ============================================================== */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
        {/* HÀNG 1: NHẬN DIỆN HỆ THỐNG VÀ THAO TÁC NHANH */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5 flex-wrap">
            {onBackToHome && (
              <SmartBackButton
                onClick={onBackToHome}
                label="Quay lại"
                contextHint="Trang chủ"
                size="sm"
              />
            )}
            <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
              Chinh Phục Tri Thức Số
            </span>

            <button
              onClick={onOpenDrawer}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs transition-colors cursor-pointer"
              title="Bấm để đổi môn học hoặc khối lớp khác"
            >
              <Layers className="w-3.5 h-3.5 text-[#2684FF]" />
              <span>Lớp {grade} · {subject.shortName}</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {/* Registered Student Badge or Register/Login Buttons */}
            {activeRegisteredStudent ? (
              <div className="flex items-center gap-2 px-3 py-1 rounded-2xl bg-blue-50/90 border border-blue-200 text-xs font-bold text-slate-800 shadow-2xs">
                <span className="text-lg">{activeRegisteredStudent.avatarEmoji || '🧑‍🎓'}</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-blue-900 truncate max-w-[130px]">{activeRegisteredStudent.displayName}</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold">{activeRegisteredStudent.className}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <span className="text-amber-600 font-bold">{activeRegisteredStudent.accountCode}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">{activeRegisteredStudent.rp} RP</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setRegisterModalInitialMode('login');
                    setIsRegisterModalOpen(true);
                  }}
                  className="ml-1 text-[10px] text-blue-600 hover:text-blue-800 underline font-semibold cursor-pointer"
                  title="Chuyển sang tài khoản học sinh khác"
                >
                  Đổi
                </button>
              </div>
            ) : currentUser ? (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
                <span>🧑‍🎓</span>
                <span className="truncate max-w-[120px]">{currentUser.displayName}</span>
                <span className="text-amber-500 font-mono">({currentUser.className})</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setRegisterModalInitialMode('login');
                    setIsRegisterModalOpen(true);
                  }}
                  className="h-10 inline-flex items-center gap-1.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-xs transition-all shadow-xs cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-blue-600" />
                  <span>Đăng nhập</span>
                </button>

                <button
                  onClick={() => {
                    setRegisterModalInitialMode('register');
                    setIsRegisterModalOpen(true);
                  }}
                  className="h-10 inline-flex items-center gap-1.5 px-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-black text-xs transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Đăng ký tài khoản học sinh</span>
                  <span className="sm:hidden">Đăng ký</span>
                </button>
              </div>
            )}

            <button
              onClick={() => setIsLeaderboardOpen(true)}
              className="h-10 inline-flex items-center gap-2 px-3.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-300 text-amber-800 font-bold text-xs transition-all shadow-xs cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Bảng Xếp Hạng</span>
            </button>

            {currentUser && currentUser.role !== 'teacher' && (
              <button
                onClick={() => setIsProfileEditOpen(true)}
                className="h-10 inline-flex items-center gap-2 px-3.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold text-xs transition-all shadow-xs cursor-pointer"
              >
                <User className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline">Hồ Sơ</span>
              </button>
            )}
          </div>
        </div>

        {/* HÀNG 2: TIÊU ĐỀ KHU VỰC VÀ PHỤ ĐỀ (BỐ CỤC NGANG CÂN ĐỐI, KHÔNG NGẮT DÒNG BẤT THƯỜNG) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#172B4D] tracking-tight flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-lg shadow-md shrink-0">
                🎮
              </span>
              <span>THẾ GIỚI TRÒ CHƠI TRI THỨC</span>
            </h1>
            <p className="text-xs sm:text-sm text-purple-700 font-bold mt-1 leading-relaxed italic">
              "Khám phá thử thách – Phát huy trí tuệ – Chinh phục đỉnh cao."
            </p>
          </div>

          <div className="text-xs text-slate-500 font-semibold self-start sm:self-center">
            Môn học: <strong className="text-blue-600">{subject.name}</strong> · Khối {grade}
          </div>
        </div>

        {/* Callout Banner if no registered student yet */}
        {!activeRegisteredStudent && !welcomeBannerDismissed && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner shrink-0">
                ⚡
              </div>
              <div>
                <div className="font-black text-xs sm:text-sm flex items-center gap-2 flex-wrap">
                  <span>Gia nhập Hệ sinh thái Trò chơi Tri thức!</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                    Không Cần Mật Khẩu
                  </span>
                </div>
                <p className="text-[11px] text-blue-100 mt-0.5 leading-relaxed">
                  Nhập Họ tên & Lớp học để cấp Mã tài khoản duy nhất, tích lũy điểm RP vĩnh viễn và tham gia Đấu Trí Học Đường 1v1!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setRegisterModalInitialMode('register');
                  setIsRegisterModalOpen(true);
                }}
                className="py-2 px-4 rounded-xl bg-white hover:bg-slate-100 text-blue-900 font-black text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                Đăng Ký Ngay (5s)
              </button>
              <button
                onClick={() => setWelcomeBannerDismissed(true)}
                className="p-1.5 text-white/70 hover:text-white cursor-pointer"
                title="Bỏ qua"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* HÀNG 3: CÁC NÚT ĐIỀU HƯỚNG CHÍNH ĐỒNG BỘ CHIỀU CAO (FLEXBOX / GRID TỰ THÍCH ỨNG) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-2">
          {/* Nút 1: Trò chơi học tập */}
          <button
            onClick={() => {
              setMainTab('hub_games');
              setActiveGame('hub');
            }}
            className={`h-11 px-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 border ${
              mainTab === 'hub_games'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Gamepad2 className="w-4 h-4 shrink-0" />
            <span className="truncate">Trò chơi học tập (5 trò)</span>
          </button>

          {/* Nút 2: Đấu Trường Trí Tuệ */}
          <button
            onClick={() => {
              setMainTab('arena_zone');
              setActiveGame('hub');
            }}
            className={`h-11 px-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 border ${
              mainTab === 'arena_zone'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Trophy className="w-4 h-4 shrink-0 text-amber-400" />
            <span className="truncate">Đấu Trường Trí Tuệ</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
          </button>

          {/* Nút 3: Đỉnh Cao Trí Tuệ */}
          <button
            onClick={() => {
              setMainTab('boss_campaign');
              setActiveGame('hub');
            }}
            className={`h-11 px-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 border ${
              mainTab === 'boss_campaign'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 shadow-md shadow-purple-500/20'
                : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="truncate">Đỉnh Cao Trí Tuệ</span>
          </button>

          {/* Nút 4: Đấu Trí Học Đường */}
          <button
            onClick={() => setIsPvPArenaMasterOpen(true)}
            className="h-11 px-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white border border-indigo-400/50 shadow-md shadow-indigo-500/20"
          >
            <Users className="w-4 h-4 text-sky-200 shrink-0" />
            <span className="truncate">Đấu Trí Học Đường</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 text-white font-mono">1v1</span>
          </button>
        </div>
      </div>

      {/* Challenge Notice Popup Toast */}
      {challengeNotice && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 border border-indigo-400 text-white text-xs font-bold flex items-center gap-2.5 shadow-xl animate-fadeIn">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{challengeNotice}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 4: REALTIME ONLINE STUDENTS & PVP CHALLENGE STRIP      */}
      {/* ============================================================== */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-50/90 via-white to-indigo-50/90 border-2 border-blue-200/80 text-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center border border-indigo-200">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>Đấu Trí Học Đường – 100% Học Sinh Thật Đối Kháng</span>
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  {onlineStudents.length} học sinh online
                </span>
              </h3>
              <p className="text-[11px] text-slate-600">
                Khẩu hiệu: <em>"Kết nối bạn bè – Cùng nhau tỏa sáng."</em> Thể thức thi đấu trực tuyến Best of 5 (5 lượt trận x 5 câu hỏi). Tuyệt đối không bot giả lập. Chọn bạn học đang online và bấm "Thách đấu"!
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-600 font-semibold">
            Tài khoản hiện tại:{' '}
            <strong className="text-indigo-700">
              {currentUser ? currentUser.displayName : 'Khách vãng lai (Chưa đăng nhập)'}
            </strong>
          </div>
        </div>

        {/* Online Students Carousel */}
        {onlineStudents.length === 0 ? (
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-500 italic">
            Chưa có học sinh nào khác đăng nhập vào hệ thống. Khi học sinh đăng nhập ở bất kỳ trang nào, danh sách sẽ tự động xuất hiện tại đây.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
            {onlineStudents.map(student => {
              const isMe = currentUser?.uid === student.uid;
              return (
                <div
                  key={student.uid}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                    isMe
                      ? 'bg-indigo-50/80 border-indigo-300'
                      : 'bg-white border-slate-200 hover:border-indigo-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-lg flex items-center justify-center shrink-0 border border-slate-200">
                      {student.avatarEmoji || '🧑‍🎓'}
                    </div>
                    <div className="truncate">
                      <div className="font-extrabold text-xs text-slate-900 truncate flex items-center gap-1">
                        <span>{student.displayName}</span>
                        {isMe && <span className="text-[10px] text-indigo-600 font-bold">(Bạn)</span>}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span className="text-amber-700 font-bold">{student.className}</span>
                        <span>•</span>
                        <span className="font-mono text-emerald-600 font-bold">{student.rp} RP</span>
                        {student.winStreak > 0 && (
                          <span className="flex items-center gap-0.5 text-rose-600 font-mono font-bold">
                            <Flame className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
                            {student.winStreak}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {!isMe && currentUser && currentUser.role !== 'teacher' && (
                    <button
                      onClick={() => handleChallengeStudent(student)}
                      className="ml-2 py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] shadow-xs transition-all cursor-pointer shrink-0"
                    >
                      Thách đấu
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* TRANG 2: CÁC TRÒ CHƠI HỌC TẬP VUI VẺ (DANH MỤC 5 TRÒ CHƠI)    */}
      {/* ============================================================== */}
      {mainTab === 'hub_games' && activeGame === 'hub' && (
        <div className="space-y-6">
          {/* BANNER NỔI BẬT DẪN SANG ĐẤU TRƯỜNG TRÍ TUỆ */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border-2 border-blue-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 text-white flex items-center justify-center text-3xl shadow-md shrink-0">
                🏆
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5 flex-wrap">
                  <span>ĐẤU TRƯỜNG TRÍ TUỆ (Hành Trình Tri Thức, Đỉnh Cao Trí Tuệ & Đấu Trí Học Đường)</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-black tracking-wider uppercase">
                    Không Gian Mới
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Khu vực game hóa học tập hiện đại: Khám phá 50 chặng Hành Trình Tri Thức, chinh phục 50 thử thách Đỉnh Cao Trí Tuệ và so tài Đấu Trí Học Đường 1v1 cùng bạn bè.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setMainTab('arena_zone');
                setActiveGame('hub');
              }}
              className="w-full md:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2.5 shrink-0 cursor-pointer"
            >
              <span>Vào Đấu Trường Trí Tuệ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* TIÊU ĐỀ KHU VỰC 5 TRÒ CHƠI HỌC TẬP */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#172B4D] flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-lg">
                  🎮
                </span>
                <span>DANH MỤC 5 TRÒ CHƠI HỌC TẬP</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                Rèn luyện kiến thức, tư duy logic, vận động thể chất và giải đố thông minh.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200 self-start sm:self-center">
              Khối 6, 7, 8, 9 · Tự động chấm điểm
            </span>
          </div>

          {/* GRID 5 TRÒ CHƠI HỌC TẬP */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. GIẢI MÃ BÍ ẨN */}
            <div
              onClick={() => setIsMysteryModalOpen(true)}
              className="group p-5 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-white border-2 border-emerald-300 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                    🔍
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                    Mật Mã Học Thuật
                  </span>
                </div>
                <h3 className="text-base font-black text-[#172B4D] group-hover:text-emerald-700 transition-colors">
                  1. Giải mã bí ẩn
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Giải các mật thư Caesar, tìm từ khóa khoa học ẩn giấu và giải mã dãy số nhị phân chuẩn kiến thức Tin học THCS.
                </p>
                <div className="mt-3 text-[10px] font-bold text-slate-500">Khối 6, 7, 8, 9</div>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs font-black text-emerald-700">
                <span>+100đ / mật thư</span>
                <span className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white group-hover:bg-emerald-700 transition-colors shadow-xs">
                  Giải mã →
                </span>
              </div>
            </div>

            {/* 2. THỬ THÁCH IQ */}
            <div
              onClick={() => setIsIQModalOpen(true)}
              className="group p-5 rounded-3xl bg-gradient-to-br from-purple-500/15 via-indigo-500/10 to-white border-2 border-purple-300 hover:border-purple-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                    🧠
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 uppercase">
                    Tư Duy Logic
                  </span>
                </div>
                <h3 className="text-base font-black text-[#172B4D] group-hover:text-purple-700 transition-colors">
                  2. Thử thách IQ
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Bài toán tư duy logic, tìm quy luật dãy số Fibonacci và câu đố không gian hình học đa chiều phát triển trí tuệ.
                </p>
                <div className="mt-3 text-[10px] font-bold text-slate-500">Khối 6, 7, 8, 9</div>
              </div>
              <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between text-xs font-black text-purple-700">
                <span>+120đ / câu</span>
                <span className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white group-hover:bg-purple-700 transition-colors shadow-xs">
                  Thử sức →
                </span>
              </div>
            </div>

            {/* 3. ĐƯỜNG ĐUA TRI THỨC */}
            <div
              onClick={() => setIsRaceModalOpen(true)}
              className="group p-5 rounded-3xl bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-white border-2 border-orange-300 hover:border-orange-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                    🏎️
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 uppercase">
                    Tốc Độ Trí Tuệ
                  </span>
                </div>
                <h3 className="text-base font-black text-[#172B4D] group-hover:text-orange-700 transition-colors">
                  3. Đường đua tri thức
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Trả lời nhanh các câu hỏi trắc nghiệm liên môn để bứt phá tốc độ, kích hoạt Turbo và cán đích sớm nhất trên đường đua.
                </p>
                <div className="mt-3 text-[10px] font-bold text-slate-500">Khối 6, 7, 8, 9</div>
              </div>
              <div className="mt-4 pt-3 border-t border-orange-100 flex items-center justify-between text-xs font-black text-orange-700">
                <span>5 chặng đua</span>
                <span className="px-3.5 py-1.5 rounded-xl bg-orange-600 text-white group-hover:bg-orange-700 transition-colors shadow-xs">
                  Bứt tốc →
                </span>
              </div>
            </div>

            {/* 4. THỬ TÀI KIẾN THỨC (6 MÔN HỌC) */}
            <div
              onClick={() => setIsSubjectPracticeOpen(true)}
              className="group p-5 rounded-3xl bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-white border-2 border-blue-300 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-500 text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                    🎯
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                    Tổng Hợp 6 Môn
                  </span>
                </div>
                <h3 className="text-base font-black text-[#172B4D] group-hover:text-blue-700 transition-colors">
                  4. Thử tài kiến thức
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Đấu trường tổng hợp 6 môn học THCS: Toán, Văn, Tiếng Anh, KHTN, Sử - Địa và Tin học theo chuẩn GDPT 2018.
                </p>
                <div className="mt-3 text-[10px] font-bold text-slate-500">Khối 6, 7, 8, 9</div>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-xs font-black text-blue-700">
                <span>6 Chặng môn</span>
                <span className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white group-hover:bg-blue-700 transition-colors shadow-xs">
                  Thử tài →
                </span>
              </div>
            </div>

            {/* 5. THỂ DỤC TRÍ TUỆ */}
            <div
              onClick={() => setIsExerciseModalOpen(true)}
              className="group p-5 rounded-3xl bg-gradient-to-br from-teal-500/15 via-emerald-500/10 to-white border-2 border-teal-300 hover:border-teal-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                    🏃‍♂️
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200 uppercase">
                    Vận Động Thể Chất
                  </span>
                </div>
                <h3 className="text-base font-black text-[#172B4D] group-hover:text-teal-700 transition-colors">
                  5. Thể dục trí tuệ
                </h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                  Kết hợp câu hỏi kiến thức với hoạt động thể chất có nhân vật hoạt hình: Squat, vươn vai, hít sâu thư giãn mắt và não bộ.
                </p>
                <div className="mt-3 text-[10px] font-bold text-slate-500">Khối 6, 7, 8, 9</div>
              </div>
              <div className="mt-4 pt-3 border-t border-teal-100 flex items-center justify-between text-xs font-black text-teal-700">
                <span>Rèn luyện thể lực</span>
                <span className="px-3.5 py-1.5 rounded-xl bg-teal-600 text-white group-hover:bg-teal-700 transition-colors shadow-xs">
                  Tập luyện →
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TRANG 1: ĐẤU TRƯỜNG TRÍ TUỆ (KHU VỰC THI ĐẤU & ĐỐI KHÁNG)      */}
      {/* ============================================================== */}
      {mainTab === 'arena_zone' && (
        <div className="space-y-6 animate-fadeIn">
          {/* HEADER TRANG ĐẤU TRƯỜNG TRÍ TUỆ */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-sky-50/90 border-2 border-blue-200/80 shadow-xs space-y-5 text-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-blue-200/60">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 text-white flex items-center justify-center text-3xl shadow-md shrink-0 font-black">
                  🎓
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Đấu Trường Trí Tuệ
                    </h1>
                    <span className="text-[11px] px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-200">
                      3 Chế Độ Giáo Dục Hiện Đại
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1 italic">
                    "Chinh phục thử thách – Khẳng định bản lĩnh – Vững bước tương lai."
                  </p>
                </div>
              </div>

              {/* NÚT QUAY LẠI TRÒ CHƠI HỌC TẬP */}
              <button
                onClick={() => {
                  setMainTab('hub_games');
                  setActiveGame('hub');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer self-start md:self-center"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại trò chơi học tập</span>
              </button>
            </div>

            {/* KHUNG THỐNG KÊ NGƯỜI CHƠI (PHONG CÁCH SÁNG GIÁO DỤC) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {/* Thống kê 1: Bảng Xếp Hạng */}
              <div
                onClick={() => setIsLeaderboardOpen(true)}
                className="p-3.5 rounded-2xl bg-white border border-amber-200/80 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-bold">Bảng Xếp Hạng</span>
                  <Trophy className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-sm sm:text-base font-black text-amber-700 flex items-center gap-1.5">
                  <span>Toàn Trường</span>
                  <span className="text-[10px] text-amber-600 group-hover:translate-x-0.5 transition-transform">↗</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Top vinh danh học sinh</div>
              </div>

              {/* Thống kê 2: Số Trận Thắng */}
              <div className="p-3.5 rounded-2xl bg-white border border-emerald-200/80 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-bold">Số Trận Thắng</span>
                  <Award className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-lg sm:text-xl font-mono font-black text-emerald-700">
                  {activeRegisteredStudent?.wins ?? 0} <span className="text-xs font-sans text-emerald-600">trận</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Tỷ lệ thắng: {
                    ((activeRegisteredStudent?.wins ?? 0) + (activeRegisteredStudent?.losses ?? 0)) > 0
                      ? Math.round(((activeRegisteredStudent?.wins ?? 0) / ((activeRegisteredStudent?.wins ?? 0) + (activeRegisteredStudent?.losses ?? 0))) * 100)
                      : 0
                  }%
                </div>
              </div>

              {/* Thống kê 3: Số Trận Đấu */}
              <div className="p-3.5 rounded-2xl bg-white border border-blue-200/80 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-bold">Tổng Số Trận</span>
                  <Swords className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-lg sm:text-xl font-mono font-black text-blue-700">
                  {((activeRegisteredStudent?.wins ?? 0) + (activeRegisteredStudent?.losses ?? 0))} <span className="text-xs font-sans text-blue-600">lượt</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Thử thách & giao lưu</div>
              </div>

              {/* Thống kê 4: Điểm RP */}
              <div className="p-3.5 rounded-2xl bg-white border border-purple-200/80 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-bold">Điểm RP</span>
                  <Sparkles className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-lg sm:text-xl font-mono font-black text-purple-700">
                  {activeRegisteredStudent?.rp ?? ((currentUser as any)?.score ?? 0)} <span className="text-xs font-sans text-purple-600">RP</span>
                </div>
                <div className="text-[10px] text-purple-600 truncate mt-0.5 font-bold">
                  {activeRegisteredStudent?.unlockedTitles?.[0] || 'Chiến Binh Tri Thức'}
                </div>
              </div>
            </div>
          </div>

          {/* DANH SÁCH 3 CHẾ ĐỘ TRÒ CHƠI DẠNG THẺ SÁNG THANH LỊCH */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* THẺ 1: HÀNH TRÌNH TRI THỨC */}
            <div
              onClick={() => {
                setMainTab('arena_legend');
                setActiveGame('hub');
              }}
              className="group p-6 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-amber-50/60 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden text-slate-800 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 to-amber-400 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-105 transition-transform font-black">
                    🧭
                  </div>
                  <span className="text-[11px] font-black px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                    50 Chặng Khám Phá
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                  1. Hành Trình Tri Thức
                </h3>
                <p className="text-xs text-blue-800 font-bold italic mt-1">
                  "Mỗi thử thách là một bước tiến đến thành công."
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Bản đồ hành trình gồm 50 chặng thử thách tri thức phân theo khối lớp và môn học. Học sinh hoàn thành thử thách trước để mở khóa thử thách tiếp theo, trả lời đúng tích lũy điểm tri thức, thanh tiến độ và bảng thành tích cá nhân.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="text-blue-700 font-bold">Khối 6, 7, 8, 9</span>
                  <span>•</span>
                  <span>Bản đồ 50 chặng</span>
                  <span>•</span>
                  <span>Mở khóa tuần tự</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-blue-800">
                <span>50 Chặng tri thức</span>
                <span className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white group-hover:shadow-md transition-all font-bold">
                  Bắt Đầu Hành Trình →
                </span>
              </div>
            </div>

            {/* THẺ 2: ĐỈNH CAO TRÍ TUỆ */}
            <div
              onClick={() => {
                setMainTab('boss_campaign');
                setActiveGame('hub');
              }}
              className="group p-6 rounded-3xl bg-gradient-to-br from-purple-50/80 via-white to-cyan-50/60 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden text-slate-800 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-500 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-105 transition-transform font-black">
                    💎
                  </div>
                  <span className="text-[11px] font-black px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 uppercase">
                    50 Thử Thách Nâng Cao
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                  2. Đỉnh Cao Trí Tuệ
                </h3>
                <p className="text-xs text-purple-800 font-bold italic mt-1">
                  "Vượt giới hạn bản thân – Chinh phục đỉnh cao kiến thức."
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  50 thử thách nâng cao với câu hỏi tư duy logic, vận dụng và kiến thức liên môn phân chia nhiều giai đoạn. Chinh phục từng cột mốc để mở khóa thử thách tiếp theo, nhận huy hiệu vàng, danh hiệu và điểm thưởng cao cấp.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="text-purple-700 font-bold">Tư duy & Liên môn</span>
                  <span>•</span>
                  <span>Nhiều giai đoạn</span>
                  <span>•</span>
                  <span>Huy hiệu vàng</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-purple-800">
                <span>4 Khối lớp</span>
                <span className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white group-hover:shadow-md transition-all font-bold">
                  Chinh Phục Đỉnh Cao →
                </span>
              </div>
            </div>

            {/* THẺ 3: ĐẤU TRÍ HỌC ĐƯỜNG */}
            <div
              onClick={() => {
                setPvpPreSelectedOpponent(null);
                setIsPvPArenaMasterOpen(true);
              }}
              className="group p-6 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/60 border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden text-slate-800 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-105 transition-transform font-black">
                    ⚡
                  </div>
                  <span className="text-[11px] font-black px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 uppercase">
                    100% Học Sinh Thật
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-700 transition-colors">
                  3. Đấu Trí Học Đường
                </h3>
                <p className="text-xs text-indigo-800 font-bold italic mt-1">
                  "Kết nối bạn bè – Cùng nhau tỏa sáng."
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Thi đấu trực tuyến 1v1 giữa hai học sinh thật với cùng bộ câu hỏi, tính giờ và điểm số trực quan. Khuyến khích tinh thần học hỏi, giao lưu lành mạnh, lưu lịch sử thi đấu và vinh danh trên bảng xếp hạng nhà trường.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="text-indigo-700 font-bold">Ghép cặp 1v1</span>
                  <span>•</span>
                  <span>Thời gian thực</span>
                  <span>•</span>
                  <span>Bảng xếp hạng</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-indigo-800">
                <span>Giao lưu học tập</span>
                <span className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white group-hover:shadow-md transition-all font-bold">
                  Tham Gia Đấu Trí →
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW: ĐỈNH CAO TRÍ TUỆ (50 THỬ THÁCH NÂNG CAO)                 */}
      {/* ============================================================== */}
      {mainTab === 'boss_campaign' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <button
              onClick={() => setMainTab('arena_zone')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Đấu Trường Trí Tuệ</span>
            </button>
            <span className="text-xs font-black text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200">
              Đỉnh Cao Trí Tuệ · 50 Thử Thách Nâng Cao
            </span>
          </div>
          <BossCampaignSection
            currentUser={effectiveUser}
            onAddScore={(pts) => handleScoreAdd(pts, 'boss_raid')}
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW: HÀNH TRÌNH TRI THỨC (50 CHẶNG KHÁM PHÁ)                  */}
      {/* ============================================================== */}
      {mainTab === 'arena_legend' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <button
              onClick={() => setMainTab('arena_zone')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Đấu Trường Trí Tuệ</span>
            </button>
            <span className="text-xs font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
              Hành Trình Tri Thức · 50 Chặng Thử Thách
            </span>
          </div>
          <ArenaHubSection
            currentUser={effectiveUser}
            onAddScore={(pts) => handleScoreAdd(pts, 'arena_50')}
            isTeacher={isTeacher}
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* MODALS HOOKUP                                                  */}
      {/* ============================================================== */}

      {/* Student Register & No-Password Account Login Modal */}
      <StudentRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        initialMode={registerModalInitialMode}
        onSuccess={(student) => {
          setActiveRegisteredStudent(student);
        }}
      />

      {/* Master PvP 1vs1 Arena Modal with 50 Champions & 5 Mythical Arenas */}
      {isPvPArenaMasterOpen && (
        <PvPArenaMasterModal
          currentUser={effectiveUser as any}
          questions={availableQuestions.length > 0 ? availableQuestions : questions}
          onClose={() => {
            setIsPvPArenaMasterOpen(false);
            setPvpPreSelectedOpponent(null);
          }}
          onAddScore={(pts) => handleScoreAdd(pts, 'pvp_1v1')}
          preSelectedOpponent={pvpPreSelectedOpponent}
        />
      )}

      {/* Săn Boss Tri Thức Modal */}
      {isBossRaidOpen && effectiveUser && (
        <BossRaidModal
          initialBossId={selectedBossId}
          currentUser={effectiveUser as any}
          onClose={() => setIsBossRaidOpen(false)}
        />
      )}

      {/* PvP Best of 5 Battle Modal */}
      {isPvPModalOpen && pvpRoomState && effectiveUser && (
        <PvPBattleModal
          roomState={pvpRoomState}
          currentUser={effectiveUser as any}
          onClose={() => {
            setIsPvPModalOpen(false);
            setPvPRoomState(null);
          }}
        />
      )}

      {/* Leaderboard Modal */}
      {isLeaderboardOpen && (
        <LeaderboardModal onClose={() => setIsLeaderboardOpen(false)} />
      )}

      {/* Student Profile Edit Modal */}
      {isProfileEditOpen && effectiveUser && (
        <ProfileEditModal
          currentUser={effectiveUser as any}
          onClose={() => setIsProfileEditOpen(false)}
          onProfileUpdated={(updated) => {
            // Updated user
          }}
        />
      )}

      {/* Mystery Decode Modal */}
      {isMysteryModalOpen && (
        <MysteryDecodeModal
          onClose={() => setIsMysteryModalOpen(false)}
          onAddScore={(pts, txId, gType, dtl) => handleScoreAdd(pts, gType || 'mystery_decode', dtl)}
        />
      )}

      {/* IQ Challenge Modal */}
      {isIQModalOpen && (
        <IQChallengeModal
          onClose={() => setIsIQModalOpen(false)}
          onAddScore={(pts, txId, gType, dtl) => handleScoreAdd(pts, gType || 'iq_challenge', dtl)}
        />
      )}

      {/* Knowledge Race Modal */}
      {isRaceModalOpen && (
        <KnowledgeRaceModal
          onClose={() => setIsRaceModalOpen(false)}
          onAddScore={(pts, txId, gType, dtl) => handleScoreAdd(pts, gType || 'knowledge_race', dtl)}
        />
      )}

      {/* Subject Practice Modal (Thử tài kiến thức 6 môn THCS) */}
      {isSubjectPracticeOpen && (
        <SubjectPracticeGameModal
          onClose={() => setIsSubjectPracticeOpen(false)}
          onAddScore={(pts, txId, gType, dtl) => handleScoreAdd(pts, gType || 'subject_practice', dtl)}
          currentUser={effectiveUser ? {
            id: effectiveUser.uid,
            name: effectiveUser.displayName,
            className: (effectiveUser as any).className,
            grade: (effectiveUser as any).grade || grade
          } : null}
          grade={grade}
        />
      )}

      {/* Exercise Modal (Thể Dục Trí Tuệ) */}
      {isExerciseModalOpen && (
        <ExerciseGameModal
          onClose={() => setIsExerciseModalOpen(false)}
          onAddScore={(pts) => handleScoreAdd(pts, 'exercise')}
          currentUser={effectiveUser ? {
            id: effectiveUser.uid,
            name: effectiveUser.displayName,
            role: (effectiveUser as any).role,
            classId: (effectiveUser as any).className || (effectiveUser as any).classId
          } : undefined}
        />
      )}

      {/* Image Puzzle Modal (Giải Đố Hình Ảnh) */}
      {isImagePuzzleModalOpen && (
        <ImagePuzzleModal
          onClose={() => setIsImagePuzzleModalOpen(false)}
          onAddScore={(pts) => handleScoreAdd(pts, 'image_puzzle')}
          currentUser={effectiveUser ? {
            id: effectiveUser.uid,
            name: effectiveUser.displayName,
            role: (effectiveUser as any).role,
            classId: (effectiveUser as any).className || (effectiveUser as any).classId
          } : undefined}
        />
      )}
    </div>
  );
};

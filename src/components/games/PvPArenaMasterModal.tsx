import React, { useState, useEffect } from 'react';
import {
  X,
  Swords,
  Shield,
  Sparkles,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trophy,
  ArrowRight,
  Flame,
  Zap,
  Users,
  Search,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Send,
  UserCheck,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PLAYABLE_CHARACTERS, PlayableCharacter } from '../../data/characterList';
import { Question, UserAccount } from '../../types';
import { realtimeService, StudentPresenceData, PvPRoomState } from '../../services/realtimeService';
import { studentAccountService, RegisteredStudent } from '../../services/studentAccountService';
import { selectAndShuffleGameQuestions } from '../../utils/gameQuestionHelper';

// 5 Vietnamese Mythical Arenas
export interface MythicalArena {
  id: string;
  name: string;
  subtitle: string;
  lore: string;
  bgGradient: string;
  themeColor: string;
  bgImage?: string;
  emblem: string;
}

export const VIETNAMESE_MYTHICAL_ARENAS: MythicalArena[] = [
  {
    id: 'arena_son_tinh',
    name: 'Đấu trường Sơn Tinh – Thủy Tinh',
    subtitle: 'Tản Viên Sơn Thần Ngăn Sóng Dữ',
    lore: 'Bối cảnh đỉnh núi Ba Vì Tản Viên hùng vĩ giữa cuồng phong, nước cuộn sấm sét. Đấu trường thể hiện ý chí quật cường của cha ông chế ngự thiên tai.',
    bgGradient: 'from-amber-950 via-slate-900 to-blue-950',
    themeColor: '#F59E0B',
    emblem: '⛰️'
  },
  {
    id: 'arena_co_loa',
    name: 'Thành Cổ Loa huyền bí',
    subtitle: 'Nỏ Thần Kim Quy Linh Ứng',
    lore: 'Thành ốc ngàn năm với vòng hào uốn lượn, nơi linh khí Thần Kim Quy và nỏ thần vô địch bảo vệ bờ cõi nước Âu Lạc cổ kính.',
    bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
    themeColor: '#10B981',
    emblem: '🏹'
  },
  {
    id: 'arena_thanh_giong',
    name: 'Rừng thiêng Thánh Gióng',
    subtitle: 'Phù Đổng Thiên Vương Xuất Trận',
    lore: 'Rừng tre ngà bạt ngàn Phù Đổng, nơi ngọn lửa hào khí ngút trời và vó ngựa sắt đạp tan giặc xâm lăng gìn giữ giang sơn.',
    bgGradient: 'from-amber-950 via-yellow-950 to-slate-900',
    themeColor: '#EAB308',
    emblem: '🎋'
  },
  {
    id: 'arena_long_vuong',
    name: 'Cung điện Long Vương',
    subtitle: 'Thủy Cung Rồng Tiên Lạc Việt',
    lore: 'Thủy cung tráng lệ nơi biển cả phương Nam, rồng thần thời Lý uốn lượn giữa san hô ngọc bích và dòng nước tri thức trường tồn.',
    bgGradient: 'from-cyan-950 via-slate-900 to-blue-950',
    themeColor: '#06B6D4',
    emblem: '🌊'
  },
  {
    id: 'arena_lac_hong',
    name: 'Hào Khí Lạc Long Quân – Âu Cơ',
    subtitle: 'Đất Nước Trăm Con Cội Nguồn',
    lore: 'Không gian linh thiêng núi non và biển cả Bách Việt, khởi nguồn giống nòi rồng tiên với ngàn năm văn hiến và học vấn sáng ngời.',
    bgGradient: 'from-rose-950 via-indigo-950 to-slate-950',
    themeColor: '#F43F5E',
    emblem: '🦅'
  }
];

// 5 Categories of Vietnamese Literature & Folklore Champions
export type CharacterCategory = 'all' | 'history' | 'legend' | 'fairytale' | 'folklore' | 'mythical';

export const CHARACTER_CATEGORIES: { id: CharacterCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'Tất cả (50 Tướng)', icon: '🌟' },
  { id: 'history', label: 'Anh hùng lịch sử', icon: '⚔️' },
  { id: 'legend', label: 'Nhân vật truyền thuyết', icon: '⚡' },
  { id: 'fairytale', label: 'Nhân vật cổ tích', icon: '🪷' },
  { id: 'folklore', label: 'Văn học dân gian', icon: '📜' },
  { id: 'mythical', label: 'Linh thú & Thần thoại', icon: '🐉' }
];

export const getCharacterCategory = (char: PlayableCharacter): CharacterCategory => {
  const n = char.name.toLowerCase();
  if (
    n.includes('trần hưng đạo') ||
    n.includes('quang trung') ||
    n.includes('lê lợi') ||
    n.includes('hai bà trưng') ||
    n.includes('ngô quyền') ||
    n.includes('võ thị sáu') ||
    n.includes('lý thường kiệt') ||
    n.includes('trần quốc toản') ||
    n.includes('bà triệu') ||
    n.includes('nguyễn trãi') ||
    n.includes('nguyễn huệ') ||
    n.includes('đinh bộ lĩnh') ||
    n.includes('phùng hưng')
  ) {
    return 'history';
  }
  if (
    n.includes('lạc long quân') ||
    n.includes('âu cơ') ||
    n.includes('thánh gióng') ||
    n.includes('sơn tinh') ||
    n.includes('thủy tinh') ||
    n.includes('an dương vương') ||
    n.includes('hùng vương') ||
    n.includes('mỵ châu') ||
    n.includes('trọng thủy')
  ) {
    return 'legend';
  }
  if (
    n.includes('thạch sanh') ||
    n.includes('cô tấm') ||
    n.includes('tấm cám') ||
    n.includes('chử đồng tử') ||
    n.includes('mai an tiêm') ||
    n.includes('chú cuội') ||
    n.includes('thánh chèm') ||
    n.includes('sọ dừa')
  ) {
    return 'fairytale';
  }
  if (
    n.includes('trạng') ||
    n.includes('dế mèn') ||
    n.includes('thầy đồ') ||
    n.includes('lão hạc') ||
    n.includes('văn học') ||
    n.includes('thi hào') ||
    n.includes('nguyễn du') ||
    n.includes('hồ xuân hương') ||
    n.includes('thơ')
  ) {
    return 'folklore';
  }
  return 'mythical';
};

interface PvPArenaMasterModalProps {
  currentUser?: UserAccount | null;
  questions: Question[];
  onClose: () => void;
  onAddScore: (points: number) => void;
  preSelectedOpponent?: StudentPresenceData | null;
}

type PvPScreen = 'lobby' | 'char_select' | 'battle' | 'result';

export const PvPArenaMasterModal: React.FC<PvPArenaMasterModalProps> = ({
  currentUser,
  questions,
  onClose,
  onAddScore,
  preSelectedOpponent
}) => {
  // Real registered student identity
  const [activeStudent, setActiveStudent] = useState<RegisteredStudent | null>(() =>
    studentAccountService.getCurrentStudent()
  );
  const [playerName, setPlayerName] = useState(() => {
    const reg = studentAccountService.getCurrentStudent();
    if (reg) return reg.fullName;
    return currentUser?.displayName || 'Học Sinh';
  });
  const [playerClass, setPlayerClass] = useState(() => {
    const reg = studentAccountService.getCurrentStudent();
    if (reg) return reg.className;
    return currentUser?.className || '6A5';
  });
  const [isGuestConfirmed, setIsGuestConfirmed] = useState(Boolean(currentUser || studentAccountService.getCurrentStudent()));

  useEffect(() => {
    const unsub = studentAccountService.subscribe(st => {
      setActiveStudent(st);
      if (st) {
        setPlayerName(st.fullName);
        setPlayerClass(st.className);
        setIsGuestConfirmed(true);
      }
    });
    return unsub;
  }, []);

  // Navigation flow
  const [screen, setScreen] = useState<PvPScreen>('lobby');
  const [lobbyTab, setLobbyTab] = useState<'create' | 'join' | 'online' | 'practice'>('create');
  const [roomCode, setRoomCode] = useState(() => `PVP-MH-${Math.floor(1000 + Math.random() * 9000)}`);
  const [joinInputCode, setJoinInputCode] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [onlineList, setOnlineList] = useState<StudentPresenceData[]>([]);

  // Selected Arena
  const [selectedArena, setSelectedArena] = useState<MythicalArena>(VIETNAMESE_MYTHICAL_ARENAS[0]);

  // Selected Characters
  const [selectedCategory, setSelectedCategory] = useState<CharacterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [player1Char, setPlayer1Char] = useState<PlayableCharacter>(PLAYABLE_CHARACTERS[0]); // Ta
  const [player2Char, setPlayer2Char] = useState<PlayableCharacter>(PLAYABLE_CHARACTERS[2]); // Đối thủ
  const [isPlayer1Ready, setIsPlayer1Ready] = useState(false);
  const [isPlayer2Ready, setIsPlayer2Ready] = useState(false);

  // Opponent Identity
  const [opponentName, setOpponentName] = useState<string>(
    preSelectedOpponent?.displayName || 'Đối thủ Tri thức'
  );
  const [opponentClass, setOpponentClass] = useState<string>(
    preSelectedOpponent?.className || ''
  );
  const [isRealtimeMatch, setIsRealtimeMatch] = useState(Boolean(preSelectedOpponent));

  // Battle State
  const [countdown, setCountdown] = useState<number>(5);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [p1Hp, setP1Hp] = useState<number>(1000);
  const [p2Hp, setP2Hp] = useState<number>(1000);
  const [p1Score, setP1Score] = useState<number>(0);
  const [p2Score, setP2Score] = useState<number>(0);
  const [timer, setTimer] = useState<number>(15);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [actionEffect, setActionEffect] = useState<{ side: 'p1' | 'p2' | null; text: string }>({ side: null, text: '' });

  // Filter 5 questions for Best of 5
  const [matchQuestions, setMatchQuestions] = useState<Question[]>([]);

  // Load active online students from API
  useEffect(() => {
    fetch('/api/presence')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOnlineList(data);
      })
      .catch(() => {});
  }, []);

  // Prepare questions on mount
  useEffect(() => {
    const list: Question[] = questions.length >= 5 ? questions : [
      {
        id: 'pvp_q1',
        grade: 6,
        semester: 1,
        chapter: 'Chương 1',
        difficulty: 'thong_hieu',
        subjectId: 'toan',
        content: 'Số nguyên tố chẵn duy nhất trong tập hợp các số tự nhiên là số nào?',
        options: ['Số 0', 'Số 2', 'Số 4', 'Số 6'],
        correctAnswerIndex: 1,
        explanation: 'Số 2 là số nguyên tố chẵn duy nhất và là số nguyên tố nhỏ nhất.'
      },
      {
        id: 'pvp_q2',
        grade: 6,
        semester: 1,
        chapter: 'Chương 1',
        difficulty: 'thong_hieu',
        subjectId: 'van',
        content: 'Truyền thuyết "Thánh Gióng" ngợi ca truyền thống và phẩm chất cao đẹp nào của nhân dân ta?',
        options: ['Lòng yêu nước, tinh thần quật cường chống giặc ngoại xâm', 'Sự cần cù lao động', 'Tài năng ca hát', 'Tính hiếu thảo'],
        correctAnswerIndex: 0,
        explanation: 'Hình tượng Thánh Gióng là biểu tượng rực rỡ của lòng yêu nước và sức mạnh bảo vệ giang sơn.'
      },
      {
        id: 'pvp_q3',
        grade: 6,
        semester: 1,
        chapter: 'Chương 1',
        difficulty: 'thong_hieu',
        subjectId: 'khtn',
        content: 'Đơn vị cơ bản cấu tạo nên mọi cơ thể sinh vật sống là gì?',
        options: ['Tế bào', 'Mô', 'Cơ quan', 'Hệ cơ quan'],
        correctAnswerIndex: 0,
        explanation: 'Tế bào là đơn vị cấu trúc và chức năng cơ bản của mọi sinh vật.'
      },
      {
        id: 'pvp_q4',
        grade: 6,
        semester: 1,
        chapter: 'Chương 1',
        difficulty: 'thong_hieu',
        subjectId: 'lich-su-dia-ly',
        content: 'Kinh đô đầu tiên của nhà nước Văn Lang trong lịch sử Việt Nam đặt tại đâu?',
        options: ['Phong Châu (Phú Thọ)', 'Cổ Loa (Hà Nội)', 'Hoa Lư (Ninh Bình)', 'Thăng Long (Hà Nội)'],
        correctAnswerIndex: 0,
        explanation: 'Nhà nước Văn Lang đóng đô tại Phong Châu (nay thuộc tỉnh Phú Thọ).'
      },
      {
        id: 'pvp_q5',
        grade: 6,
        semester: 1,
        chapter: 'Chương 1',
        difficulty: 'thong_hieu',
        subjectId: 'tin-hoc',
        content: 'Thiết bị nào sau đây là thiết bị vào (Input) của máy tính bảng hoặc máy tính?',
        options: ['Bàn phím và chuột', 'Màn hình', 'Máy in', 'Loa âm thanh'],
        correctAnswerIndex: 0,
        explanation: 'Bàn phím và chuột là thiết bị nhập dữ liệu (Input) vào máy tính.'
      }
    ];

    const { questions: shuffled } = selectAndShuffleGameQuestions(list, 5);
    setMatchQuestions(shuffled);
  }, [questions]);

  // Handle Copy Room Code
  const handleCopyCode = () => {
    navigator.clipboard?.writeText(roomCode);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Start character selection with opponent
  const handleStartCharSelect = (oppName: string, oppCls: string, isRealtime: boolean) => {
    setOpponentName(oppName);
    setOpponentClass(oppCls);
    setIsRealtimeMatch(isRealtime);
    setIsPlayer1Ready(false);
    setIsPlayer2Ready(false);
    setScreen('char_select');
  };

  // When both players are ready, countdown 5 seconds to battle
  const handlePlayerReadyToggle = () => {
    const nextReady = !isPlayer1Ready;
    setIsPlayer1Ready(nextReady);

    if (nextReady) {
      // Simulate opponent confirming after short delay if practice or bot
      setTimeout(() => {
        setIsPlayer2Ready(true);
      }, 700);
    } else {
      setIsPlayer2Ready(false);
    }
  };

  // Trigger battle countdown when both ready
  const handleTriggerBattleStart = () => {
    setIsCountingDown(true);
    setCountdown(5);

    const timerInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setIsCountingDown(false);
          // Launch Battle Screen
          setP1Hp(1000);
          setP2Hp(1000);
          setP1Score(0);
          setP2Score(0);
          setCurrentRound(1);
          setTimer(15);
          setHasAnswered(false);
          setSelectedAnswer(null);
          setCombatLog([
            `⚔️ Trận chiến bắt đầu tại ${selectedArena.name}!`,
            `💥 ${player1Char.name} đối đầu ${player2Char.name} trong thể thức Best of 5!`
          ]);
          setScreen('battle');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // In-game question timer
  useEffect(() => {
    if (screen !== 'battle' || hasAnswered) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAnswerSubmit(-1); // Time out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [screen, currentRound, hasAnswered]);

  // Handle Question Answer
  const currentQ = matchQuestions[currentRound - 1];

  const handleAnswerSubmit = (idx: number) => {
    if (hasAnswered || !currentQ) return;
    setHasAnswered(true);
    setSelectedAnswer(idx);

    const isCorrect = idx === currentQ.correctAnswerIndex;
    const damageP1 = isCorrect ? 250 : 0;
    // Opponent logic: if practice, 65% correct
    const oppCorrect = Math.random() < 0.65;
    const damageP2 = oppCorrect ? 200 : 0;

    if (isCorrect) {
      setP1Score(prev => prev + 1);
      setP2Hp(prev => Math.max(0, prev - damageP1));
      setActionEffect({ side: 'p1', text: `⚡ ${player1Char.specialSkill}! Gây -${damageP1} HP!` });
      setCombatLog(prev => [
        `🎯 Bạn trả lời CHÍNH XÁC! ${player1Char.name} kích hoạt [${player1Char.specialSkill}], gây ${damageP1} sát thương lên đối thủ!`,
        ...prev
      ]);
      try {
        confetti({ particleCount: 50, spread: 50 });
      } catch {}
    } else {
      setActionEffect({ side: 'p2', text: `Trượt chiêu! Bị phản đòn!` });
      setCombatLog(prev => [
        `❌ Bạn trả lời ${idx === -1 ? 'HẾT GIỜ' : 'CHƯA ĐÚNG'}! Mất cơ hội tấn công.`,
        ...prev
      ]);
    }

    // Opponent action
    setTimeout(() => {
      if (oppCorrect) {
        setP2Score(prev => prev + 1);
        setP1Hp(prev => Math.max(0, prev - damageP2));
        setCombatLog(prev => [
          `🛡️ ${opponentName} trả lời đúng! ${player2Char.name} dùng [${player2Char.specialSkill}], gây ${damageP2} sát thương!`,
          ...prev
        ]);
      } else {
        setCombatLog(prev => [
          `💨 ${opponentName} trả lời sai! Không gây sát thương.`,
          ...prev
        ]);
      }
    }, 500);
  };

  const handleNextRound = () => {
    if (currentRound >= 5 || p1Hp <= 0 || p2Hp <= 0) {
      // End game
      setScreen('result');
      const isWin = p1Score > p2Score || p2Hp <= 0;
      const earnedRP = isWin ? 150 : 50;
      const earnedEXP = isWin ? 200 : 80;
      onAddScore(earnedRP);
      if (isWin) {
        try {
          confetti({ particleCount: 120, spread: 90 });
        } catch {}
      }

      // Sync persistent progress to real student database
      studentAccountService.updateProgress({
        rpChange: earnedRP,
        expChange: earnedEXP,
        isWin: isWin,
        isLoss: !isWin,
        gameType: 'pvp_1v1'
      }).catch(err => {
        console.error('Error syncing PvP progress:', err);
      });
    } else {
      setCurrentRound(prev => prev + 1);
      setTimer(15);
      setHasAnswered(false);
      setSelectedAnswer(null);
      setActionEffect({ side: null, text: '' });
    }
  };

  // Filtered Characters
  const filteredCharacters = PLAYABLE_CHARACTERS.filter(char => {
    const matchCat = selectedCategory === 'all' || getCharacterCategory(char) === selectedCategory;
    const matchSearch =
      char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.specialSkill.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-slate-900 border-2 border-indigo-500/40 text-white shadow-2xl overflow-hidden my-auto flex flex-col max-h-[96vh] animate-scaleUp">
        {/* ============================================================== */}
        {/* HEADER BAR                                                     */}
        {/* ============================================================== */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-950 via-slate-900 to-rose-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-xl">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Đấu Trí Học Đường · Thi đấu trực tuyến 1v1
                </span>
                <span className="text-xs text-amber-300 font-semibold italic hidden sm:inline">
                  "Kết nối bạn bè – Cùng nhau tỏa sáng."
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2 mt-0.5">
                <span>Đấu Trí Học Đường – {selectedArena.name}</span>
                <span className="text-xs text-amber-400 font-bold hidden md:inline">({selectedArena.subtitle})</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {screen !== 'lobby' && (
              <button
                onClick={() => setScreen('lobby')}
                className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Chọn lại phòng</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SCREEN 1: LOBBY & MATCHMAKING                                  */}
        {/* ============================================================== */}
        {screen === 'lobby' && (
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
            {/* Quick Warrior Registration without separate password */}
            <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-amber-200 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <strong className="text-white text-sm">
                    {activeStudent ? 'Chiến Binh Đã Xác Thực (Lưu Vĩnh Viễn)' : 'Đăng Ký Tài Khoản Học Sinh (Không Mật Khẩu)'}
                  </strong>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                    {activeStudent ? activeStudent.accountCode : 'Tài khoản thật'}
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {activeStudent
                    ? `Chào mừng ${activeStudent.displayName || activeStudent.fullName || 'Học sinh'} · Lớp ${activeStudent.className} · Điểm RP: ${(activeStudent.ratingPoints ?? activeStudent.rp ?? 1000).toLocaleString('vi-VN')} · Thắng: ${activeStudent.wins} trận.`
                    : 'Nhập họ tên và lớp (6A5, 7A5, 8A5, 9A5) để tạo tài khoản thật, không cần mật khẩu, bảo lưu vĩnh viễn thành tích thi đấu toàn trường:'}
                </p>
              </div>

              {activeStudent ? (
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-2xl bg-slate-950 border border-amber-500/40 text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                    <span>👑</span>
                    <span>{activeStudent.displayName || activeStudent.fullName} ({activeStudent.className})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      studentAccountService.clearActiveSession();
                      setActiveStudent(null);
                    }}
                    className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Đổi tài khoản
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
                  <input
                    type="text"
                    value={playerName || ''}
                    onChange={e => setPlayerName(e.target.value)}
                    placeholder="Họ tên học sinh..."
                    className="px-3.5 py-2 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400 w-44"
                  />

                  {/* Class Quick Selection Pills: 6A5, 7A5, 8A5, 9A5 */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
                    {['6A5', '7A5', '8A5', '9A5'].map(cls => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setPlayerClass(cls)}
                        className={`px-2 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                          playerClass === cls
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {cls}
                      </button>
                    ))}
                    <input
                      type="text"
                      value={playerClass}
                      onChange={e => setPlayerClass(e.target.value.toUpperCase())}
                      placeholder="Lớp..."
                      className="w-14 px-1.5 py-0.5 rounded-xl bg-slate-900 border border-slate-700 text-[11px] text-white text-center font-bold"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={async () => {
                      const name = (playerName || '').trim();
                      if (!name) {
                        alert('Vui lòng nhập họ và tên học sinh!');
                        return;
                      }
                      try {
                        const registered = await studentAccountService.registerStudent(name, playerClass.trim());
                        if (registered.account) {
                          setActiveStudent(registered.account);
                        }
                        setIsGuestConfirmed(true);
                      } catch {
                        setIsGuestConfirmed(true);
                      }
                    }}
                    className="py-2 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs cursor-pointer hover:from-amber-400 hover:to-yellow-300 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
                  >
                    Tạo & Vào Đấu
                  </button>
                </div>
              )}
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => setLobbyTab('create')}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  lobbyTab === 'create'
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>1. Tạo phòng đấu</span>
              </button>
              <button
                onClick={() => setLobbyTab('join')}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  lobbyTab === 'join'
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>2. Vào bằng mã</span>
              </button>
              <button
                onClick={() => setLobbyTab('online')}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  lobbyTab === 'online'
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>3. Online toàn trường</span>
              </button>
              <button
                onClick={() => setLobbyTab('practice')}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  lobbyTab === 'practice'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>4. Đấu tập tức thì</span>
              </button>
            </div>

            {/* TAB CONTENT 1: CREATE ROOM */}
            {lobbyTab === 'create' && (
              <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 text-center space-y-4 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto text-3xl">
                  🏰
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Khởi Tạo Phòng Đấu 1vs1 Mới</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Gửi mã phòng này cho bạn bè học cùng lớp để họ vào phòng cùng bạn chọn tướng đối đầu:
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Mã phòng của bạn:</div>
                  <div className="text-3xl font-black text-amber-400 font-mono tracking-widest">{roomCode}</div>
                  <div className="pt-2">
                    <button
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      {copyFeedback ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copyFeedback ? 'Đã sao chép!' : 'Sao chép mã phòng'}</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleStartCharSelect('Bạn cùng lớp (Chờ kết nối)', '6A1', false)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-black text-sm shadow-xl shadow-rose-500/25 transition-all cursor-pointer"
                >
                  BƯỚC VÀO MÀN HÌNH CHỌN TƯỚNG →
                </button>
              </div>
            )}

            {/* TAB CONTENT 2: JOIN BY CODE */}
            {lobbyTab === 'join' && (
              <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 text-center space-y-4 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto text-3xl">
                  🔑
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Tham Gia Phòng Bằng Mã</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Nhập mã phòng 1vs1 do bạn bè chia sẻ để tham gia trận so tài trí tuệ:
                  </p>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={joinInputCode}
                    onChange={e => setJoinInputCode(e.target.value.toUpperCase())}
                    placeholder="VÍ DỤ: PVP-MH-9921"
                    className="w-full py-3 px-4 rounded-2xl bg-slate-900 border border-slate-700 text-center font-mono font-black text-lg text-white placeholder-slate-600 focus:outline-hidden focus:border-cyan-400 uppercase"
                  />
                </div>

                <button
                  onClick={() => {
                    if (!joinInputCode.trim()) {
                      alert('Vui lòng nhập mã phòng hợp lệ!');
                      return;
                    }
                    handleStartCharSelect(`Chủ phòng (${joinInputCode})`, '6A1', false);
                  }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm shadow-xl shadow-cyan-500/25 transition-all cursor-pointer"
                >
                  VÀO PHÒNG CHIẾN ĐẤU NGAY →
                </button>
              </div>
            )}

            {/* TAB CONTENT 3: ONLINE STUDENTS */}
            {lobbyTab === 'online' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Học sinh online toàn website ({onlineList.length}):</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Bấm "Thách đấu" để so tài trực tiếp</span>
                </div>

                {onlineList.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800 text-center text-xs text-slate-400 space-y-3">
                    <p>Hiện chưa có học sinh nào khác đăng nhập song song.</p>
                    <button
                      onClick={() => setLobbyTab('practice')}
                      className="py-2 px-4 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-colors"
                    >
                      Chuyển sang Đấu tập tức thì với Đối Thủ Tinh Anh →
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {onlineList.map(st => (
                      <div
                        key={st.uid}
                        className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-all"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-lg shrink-0">
                            {st.avatarEmoji || '🧑‍🎓'}
                          </div>
                          <div className="truncate">
                            <div className="font-extrabold text-xs text-white truncate">{st.displayName}</div>
                            <div className="text-[10px] text-amber-400 font-semibold">{st.className} · {st.rp} RP</div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleStartCharSelect(st.displayName, st.className, true)}
                          className="py-1.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-[11px] transition-colors cursor-pointer shrink-0 ml-2"
                        >
                          Thách đấu
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 4: INSTANT PRACTICE */}
            {lobbyTab === 'practice' && (
              <div className="p-6 rounded-3xl bg-slate-950/80 border border-emerald-500/30 text-center space-y-4 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-3xl">
                  ⚡
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Đấu Tập & Thao Diễn 1vs1 Tức Thì</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Trải nghiệm trực tiếp toàn bộ cơ chế chiến đấu 50 Tướng và 5 bối cảnh văn học kỳ ảo mà không cần chờ bạn cùng lớp online!
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-emerald-400 font-bold">5 Lượt Đấu</div>
                    <div className="text-[10px] text-slate-400">Best of 5</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-amber-400 font-bold">1.000 HP</div>
                    <div className="text-[10px] text-slate-400">Sát thương thật</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-indigo-400 font-bold">+150 EXP</div>
                    <div className="text-[10px] text-slate-400">Cộng hồ sơ</div>
                  </div>
                </div>

                <button
                  onClick={() => handleStartCharSelect('Học Sinh Tinh Anh (Thao Diễn)', playerClass, false)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm shadow-xl shadow-emerald-500/25 transition-all cursor-pointer"
                >
                  BẮT ĐẦU ĐẤU TẬP NGAY LẬP TỨC →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* SCREEN 2: 50 TƯỚNG & 5 CHIẾN TRƯỜNG KỲ ẢO CHỌN LỰA           */}
        {/* ============================================================== */}
        {screen === 'char_select' && (
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
            {/* Top Versus Banner (TA vs ĐỐI THỦ) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bên Trái: NGƯỜI CHƠI 1 - TA */}
              <div className={`p-4 sm:p-5 rounded-3xl border-2 transition-all ${
                isPlayer1Ready
                  ? 'bg-emerald-950/40 border-emerald-500/80 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950/80 border-indigo-500/40'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    NGƯỜI CHƠI 1 (BẠN)
                  </span>
                  {isPlayer1Ready ? (
                    <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> ĐÃ XÁC NHẬN TƯỚNG
                    </span>
                  ) : (
                    <span className="text-xs text-amber-400 font-bold animate-pulse">
                      Đang chọn 1 trong 50 tướng...
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl ${player1Char.iconBg} text-white text-3xl flex items-center justify-center shadow-xl border border-white/20 shrink-0`}>
                    {player1Char.avatar}
                  </div>
                  <div className="truncate flex-1">
                    <div className="text-xs text-amber-400 font-bold">{playerName} · Lớp {playerClass}</div>
                    <h3 className="text-lg font-black text-white truncate">{player1Char.name}</h3>
                    <p className="text-[11px] text-slate-300 truncate">{player1Char.title} · {player1Char.classType}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400">Chiêu thức:</span>{' '}
                    <strong className="text-amber-300">{player1Char.specialSkill}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Máu khởi đầu:</span>{' '}
                    <strong className="text-emerald-400">1.000 HP</strong>
                  </div>
                </div>

                <div className="mt-3">
                  <button
                    onClick={handlePlayerReadyToggle}
                    className={`w-full py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                      isPlayer1Ready
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                    }`}
                  >
                    {isPlayer1Ready ? 'HỦY XÁC NHẬN ĐỂ CHỌN LẠI' : 'XÁC NHẬN TƯỚNG NÀY!'}
                  </button>
                </div>
              </div>

              {/* Bên Phải: NGƯỜI CHƠI 2 - ĐỐI THỦ */}
              <div className={`p-4 sm:p-5 rounded-3xl border-2 transition-all ${
                isPlayer2Ready
                  ? 'bg-emerald-950/40 border-emerald-500/80 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950/80 border-rose-500/40'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    NGƯỜI CHƠI 2 (ĐỐI THỦ)
                  </span>
                  {isPlayer2Ready ? (
                    <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> ĐỐI THỦ ĐÃ SẴN SÀNG
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      Đối thủ đang cân nhắc tướng...
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl ${player2Char.iconBg} text-white text-3xl flex items-center justify-center shadow-xl border border-white/20 shrink-0`}>
                    {player2Char.avatar}
                  </div>
                  <div className="truncate flex-1">
                    <div className="text-xs text-rose-400 font-bold">{opponentName} · Lớp {opponentClass}</div>
                    <h3 className="text-lg font-black text-white truncate">{player2Char.name}</h3>
                    <p className="text-[11px] text-slate-300 truncate">{player2Char.title} · {player2Char.classType}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400">Chiêu thức:</span>{' '}
                    <strong className="text-amber-300">{player2Char.specialSkill}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Máu khởi đầu:</span>{' '}
                    <strong className="text-emerald-400">1.000 HP</strong>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 text-center text-xs text-slate-400 font-semibold border border-slate-800">
                    {isPlayer2Ready ? '✓ Đối thủ đã đồng ý và sẵn sàng chiến đấu' : 'Đối thủ tự chọn 1 trong 50 tướng huyền thoại'}
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Overlay when Both Ready */}
            {isCountingDown && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-900/60 via-amber-900/60 to-rose-900/60 border border-amber-500 text-center animate-pulse">
                <div className="text-xs uppercase font-black text-amber-300 tracking-widest">
                  HAI ĐỐI THỦ ĐÃ XÁC NHẬN! TRẬN ĐẤU BẮT ĐẦU SAU:
                </div>
                <div className="text-5xl font-black text-white font-mono mt-1">{countdown}</div>
              </div>
            )}

            {/* Ready to Launch Action */}
            {isPlayer1Ready && isPlayer2Ready && !isCountingDown && (
              <div className="text-center">
                <button
                  onClick={handleTriggerBattleStart}
                  className="py-4 px-10 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-black text-base shadow-2xl shadow-rose-500/30 transition-all cursor-pointer scale-100 hover:scale-105 active:scale-95"
                >
                  ⚔️ BẮT ĐẦU TRẬN ĐẤU BEST OF 5 NGAY!
                </button>
              </div>
            )}

            {/* 5 Vietnamese Mythical Arenas Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5 text-amber-400 uppercase">
                  <Sparkles className="w-4 h-4" /> Chọn chiến trường kỳ ảo Việt Nam (5 Bối Cảnh):
                </span>
                <span className="text-slate-400">Bối cảnh: <strong className="text-white">{selectedArena.name}</strong></span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
                {VIETNAMESE_MYTHICAL_ARENAS.map(ar => {
                  const isSel = ar.id === selectedArena.id;
                  return (
                    <button
                      key={ar.id}
                      onClick={() => setSelectedArena(ar)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                        isSel
                          ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/20 scale-[1.02]'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xl mb-1">{ar.emblem}</div>
                      <div className="text-xs font-black text-white truncate">{ar.name.split('–')[0]}</div>
                      <div className="text-[10px] text-amber-400/90 truncate">{ar.subtitle}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 50 Playable Characters Selector */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <span className="text-rose-400 uppercase">Bộ sưu tập 50 Tướng Huyền Thoại:</span>
                  <span className="text-slate-500">({filteredCharacters.length} tướng phù hợp)</span>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo tên tướng hoặc kỹ năng..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-400"
                  />
                </div>
              </div>

              {/* 5 Categories Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {CHARACTER_CATEGORIES.map(cat => {
                  const isCatSel = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                        isCatSel
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 50 Characters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 max-h-64 overflow-y-auto p-2 rounded-2xl bg-slate-950/90 border border-slate-800">
                {filteredCharacters.map(char => {
                  const isChosen = player1Char.id === char.id;
                  return (
                    <button
                      key={char.id}
                      onClick={() => {
                        if (!isPlayer1Ready) {
                          setPlayer1Char(char);
                        }
                      }}
                      className={`p-2 rounded-2xl flex flex-col items-center gap-1 transition-all cursor-pointer border text-center ${
                        isChosen
                          ? 'bg-indigo-600/30 border-indigo-400 shadow-md shadow-indigo-500/30 scale-105'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl ${char.iconBg} text-white flex items-center justify-center text-xl shadow`}>
                        {char.avatar}
                      </div>
                      <span className="text-[11px] font-black text-white truncate w-full">
                        {char.name}
                      </span>
                      <span className="text-[9px] text-slate-400 truncate w-full">
                        {char.classType}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SCREEN 3: IN-GAME BATTLE (BEST OF 5 ROUNDS)                     */}
        {/* ============================================================== */}
        {screen === 'battle' && currentQ && (
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
            {/* Top HP & Scoreboard Header */}
            <div className="p-4 rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-xl space-y-3">
              <div className="grid grid-cols-3 items-center">
                {/* P1 TA */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${player1Char.iconBg} text-white flex items-center justify-center text-2xl shadow-lg border border-white/20 shrink-0`}>
                    {player1Char.avatar}
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-amber-400 truncate">{playerName} (Bạn)</div>
                    <div className="text-xs font-black text-white">{player1Char.name}</div>
                    <div className="text-xs font-mono font-black text-emerald-400">{p1Hp} / 1.000 HP</div>
                  </div>
                </div>

                {/* VS Center & Timer */}
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-black uppercase">
                    Vòng {currentRound} / 5 · Best of 5
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-rose-400 font-mono text-xl font-black">
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>{timer}s</span>
                  </div>
                </div>

                {/* P2 ĐỐI THỦ */}
                <div className="flex items-center justify-end gap-3 text-right">
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-rose-400 truncate">{opponentName}</div>
                    <div className="text-xs font-black text-white">{player2Char.name}</div>
                    <div className="text-xs font-mono font-black text-rose-400">{p2Hp} / 1.000 HP</div>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${player2Char.iconBg} text-white flex items-center justify-center text-2xl shadow-lg border border-white/20 shrink-0`}>
                    {player2Char.avatar}
                  </div>
                </div>
              </div>

              {/* Dual HP Bars */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Máu của bạn</span>
                    <span className="font-mono text-emerald-400 font-bold">{Math.round((p1Hp / 1000) * 100)}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                      style={{ width: `${Math.max(0, (p1Hp / 1000) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1 text-right">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono text-rose-400 font-bold">{Math.round((p2Hp / 1000) * 100)}%</span>
                    <span>Máu đối thủ</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-500 ml-auto"
                      style={{ width: `${Math.max(0, (p2Hp / 1000) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action skill banner if triggered */}
            {actionEffect.text && (
              <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-900/60 to-indigo-900/60 border border-rose-500/50 text-center text-xs font-black text-amber-300 animate-bounce">
                {actionEffect.text}
              </div>
            )}

            {/* Question Arena Box */}
            <div className="p-5 sm:p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                  Câu hỏi #{currentRound} · Môn {currentQ.subjectId.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400">Điểm số: Bạn ({p1Score}) - Đối thủ ({p2Score})</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQ.content}
              </h3>

              {/* 4 Answer Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isSel = selectedAnswer === idx;
                  const isCorrect = idx === currentQ.correctAnswerIndex;

                  let style = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';
                  if (hasAnswered) {
                    if (isCorrect) {
                      style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/20';
                    } else if (isSel) {
                      style = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    } else {
                      style = 'bg-slate-900/50 border-slate-800/40 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnswered}
                      onClick={() => handleAnswerSubmit(idx)}
                      className={`p-4 rounded-2xl text-left border-2 font-medium text-sm transition-all cursor-pointer flex items-start gap-3 ${style}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Continue */}
              {hasAnswered && (
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">Giải thích đáp án:</span>
                    <button
                      onClick={handleNextRound}
                      className="py-1.5 px-5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                    >
                      <span>{currentRound >= 5 || p1Hp <= 0 || p2Hp <= 0 ? 'Xem kết quả trận đấu' : 'Vòng tiếp theo'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Live Combat Log */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-500">Nhật ký chiến trường:</div>
              <div className="max-h-20 overflow-y-auto space-y-1 text-xs text-slate-300">
                {combatLog.slice(0, 4).map((log, i) => (
                  <div key={i} className="truncate">{log}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SCREEN 4: VICTORY & SUMMARY                                    */}
        {/* ============================================================== */}
        {screen === 'result' && (
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-center space-y-6 max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/30 text-4xl">
              {p1Score > p2Score ? '🏆' : p1Score === p2Score ? '🤝' : '🛡️'}
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {p1Score > p2Score
                  ? 'CHIẾN THẮNG HUY HOÀNG!'
                  : p1Score === p2Score
                  ? 'TRẬN ĐẤU BẤT PHÂN THẮNG BẠI!'
                  : 'NỖ LỰC ĐÁNG KHEN NGỢI!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
                Tổng kết 5 lượt trận đối kháng trí tuệ tại {selectedArena.name}.
              </p>
            </div>

            {/* Scoreboard Result Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-2xl border ${
                p1Score >= p2Score ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-950 border-slate-800'
              }`}>
                <div className="text-2xl mb-1">{player1Char.avatar}</div>
                <div className="text-xs font-bold text-slate-400">{playerName}</div>
                <div className="text-2xl font-black text-white font-mono mt-1">{p1Score} / 5 câu</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-0.5">{p1Hp} HP còn lại</div>
              </div>

              <div className={`p-4 rounded-2xl border ${
                p2Score > p1Score ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-950 border-slate-800'
              }`}>
                <div className="text-2xl mb-1">{player2Char.avatar}</div>
                <div className="text-xs font-bold text-slate-400">{opponentName}</div>
                <div className="text-2xl font-black text-white font-mono mt-1">{p2Score} / 5 câu</div>
                <div className="text-[11px] text-rose-400 font-mono mt-0.5">{p2Hp} HP còn lại</div>
              </div>
            </div>

            {/* Rewards Card */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-left space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Thành tích được lưu vào hồ sơ:
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Flame className="w-4 h-4" />
                  {p1Score > p2Score ? '+30 RP' : p1Score === p2Score ? '+15 RP' : '+5 RP'}
                </span>
                <span className="flex items-center gap-1 text-indigo-400">
                  <Zap className="w-4 h-4" />
                  {p1Score > p2Score ? '+150 EXP' : '+60 EXP'}
                </span>
                <span className="text-slate-400">Xếp hạng toàn trường</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setScreen('char_select');
                  setIsPlayer1Ready(false);
                  setIsPlayer2Ready(false);
                }}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all cursor-pointer border border-slate-700"
              >
                Tái Đấu Ván Mới
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-all cursor-pointer shadow-lg shadow-indigo-500/25"
              >
                Về Thế Giới Trò Chơi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

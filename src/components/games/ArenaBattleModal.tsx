import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Swords,
  Heart,
  Shield,
  Sparkles,
  Zap,
  Timer,
  Trophy,
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ArenaStage, ArenaQuestion } from '../../data/arenaData';
import { arenaStorageService } from '../../services/arenaStorageService';
import { gameAudio } from '../../utils/gameAudio';
import { shuffleSingleQuestionOptions, generateBalancedTargetSlots } from '../../utils/gameQuestionHelper';

function prepareShuffledArenaQuestions(questions: ArenaQuestion[]): ArenaQuestion[] {
  if (!questions || questions.length === 0) return [];
  const slots = generateBalancedTargetSlots(questions.length);
  const shuffled = [...questions];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.map((q, idx) => {
    const assignedSlot = slots[idx] ?? Math.floor(Math.random() * 4);
    return shuffleSingleQuestionOptions(q, assignedSlot);
  });
}

interface ArenaBattleModalProps {
  stage: ArenaStage;
  userId?: string;
  onClose: () => void;
  onVictory: (nextStageId: number) => void;
}

export const ArenaBattleModal: React.FC<ArenaBattleModalProps> = ({
  stage,
  userId,
  onClose,
  onVictory
}) => {
  // Boss HP & Player State
  const [bossHp, setBossHp] = useState(stage.maxHp);
  const [playerHp, setPlayerHp] = useState(100);
  const [battleQuestions, setBattleQuestions] = useState<ArenaQuestion[]>(() =>
    prepareShuffledArenaQuestions(stage.questions)
  );
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [battleLog, setBattleLog] = useState<string>('Trận chiến bắt đầu! Hãy vận dụng trí tuệ để hạ gục đại địch.');
  const [battleStatus, setBattleStatus] = useState<'fighting' | 'victory' | 'defeat'>('fighting');
  const [floatingDamage, setFloatingDamage] = useState<{ text: string; isCrit: boolean } | null>(null);
  const [isBossHurt, setIsBossHurt] = useState(false);
  const [isPlayerHurt, setIsPlayerHurt] = useState(false);

  // Audio state
  const [isMuted, setIsMuted] = useState(() => gameAudio.getMuted());

  // Question Timer (30s)
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQ: ArenaQuestion = battleQuestions[currentQIndex % battleQuestions.length] || {
    id: 'fallback',
    question: 'Đang tải câu hỏi...',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 0,
    explanation: '',
    damage: 1000
  };

  // Toggle Mute
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    gameAudio.setMuted(next);
  };

  // Reset timer on question change
  useEffect(() => {
    if (battleStatus !== 'fighting') return;
    setTimeLeft(30);
    setIsAnswered(false);
    setSelectedOption(null);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQIndex, battleStatus]);

  // Handle timeout as wrong answer
  const handleTimeOut = () => {
    if (isAnswered || battleStatus !== 'fighting') return;
    setIsAnswered(true);
    setIsPlayerHurt(true);
    setTimeout(() => setIsPlayerHurt(false), 500);

    gameAudio.playIncorrect();
    const damageToPlayer = 35;
    const nextPlayerHp = Math.max(0, playerHp - damageToPlayer);
    setPlayerHp(nextPlayerHp);
    setBattleLog(`Hết giờ! ${stage.bossName} tung chiêu phản kích, bạn mất ${damageToPlayer} HP!`);

    if (nextPlayerHp <= 0) {
      setBattleStatus('defeat');
    }
  };

  // Handle answer option selection
  const handleSelectAnswer = (index: number) => {
    if (isAnswered || battleStatus !== 'fighting') return;
    setIsAnswered(true);
    setSelectedOption(index);

    if (timerRef.current) clearInterval(timerRef.current);

    const isCorrect = index === currentQ.correctIndex;

    if (isCorrect) {
      // Calculate Damage
      const isCrit = timeLeft > 18;
      const baseDmg = currentQ.damage || Math.ceil(stage.maxHp / stage.questions.length);
      const totalDmg = isCrit ? Math.floor(baseDmg * 1.3) : baseDmg;

      // Audio & Visual Effects
      if (isCrit) {
        gameAudio.playMagic();
      } else {
        gameAudio.playStrike();
      }

      setIsBossHurt(true);
      setTimeout(() => setIsBossHurt(false), 600);
      setFloatingDamage({
        text: `-${totalDmg.toLocaleString('vi-VN')} HP ${isCrit ? '🔥 BẠO KÍCH!' : '⚔️'}`,
        isCrit
      });
      setTimeout(() => setFloatingDamage(null), 1200);

      const nextBossHp = Math.max(0, bossHp - totalDmg);
      setBossHp(nextBossHp);
      setBattleLog(`Chính xác! Bạn tung đòn trí tuệ gây ${totalDmg.toLocaleString('vi-VN')} sát thương lên ${stage.bossName}!`);

      // Check Victory
      if (nextBossHp <= 0) {
        handleVictoryTrigger();
      }
    } else {
      // Wrong answer
      gameAudio.playIncorrect();
      setIsPlayerHurt(true);
      setTimeout(() => setIsPlayerHurt(false), 500);

      const damageToPlayer = 35;
      const nextPlayerHp = Math.max(0, playerHp - damageToPlayer);
      setPlayerHp(nextPlayerHp);
      setBattleLog(`Sai rồi! ${stage.bossName} phản đòn bằng kỹ năng "${stage.skills[0] || 'Phản Kích'}", bạn mất ${damageToPlayer} HP!`);

      if (nextPlayerHp <= 0) {
        setBattleStatus('defeat');
      }
    }
  };

  // Victory Handler
  const handleVictoryTrigger = () => {
    setBattleStatus('victory');
    gameAudio.playVictory();

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}

    const result = arenaStorageService.recordStageVictory(stage, userId);
    setBattleLog(`🎉 CHIẾN THẮNG HUYỀN THOẠI! Đã mở khóa đấu trường #${result.nextUnlocked}!`);
  };

  // Next Question
  const handleNextQuestion = () => {
    if (bossHp <= 0) {
      handleVictoryTrigger();
      return;
    }
    setCurrentQIndex(prev => prev + 1);
  };

  // Restart Battle with reshuffled questions and randomized options
  const handleRetryBattle = () => {
    setBattleQuestions(prepareShuffledArenaQuestions(stage.questions));
    setBossHp(stage.maxHp);
    setPlayerHp(100);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setBattleStatus('fighting');
    setBattleLog(`Bắt đầu lại khiêu chiến với ${stage.bossName}!`);
  };

  const bossHpPercent = Math.max(0, Math.min(100, Math.round((bossHp / stage.maxHp) * 100)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity"
        onClick={battleStatus === 'fighting' ? undefined : onClose}
      />

      {/* Main Battle Container */}
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border-2 border-slate-700 text-white shadow-2xl overflow-hidden z-10 flex flex-col my-auto max-h-[96vh]">
        {/* Top Header Bar */}
        <div className="p-3.5 sm:p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black text-xs shrink-0">
              #{stage.id}
            </span>
            <div className="min-w-0">
              <h3 className="font-black text-sm sm:text-base text-white truncate flex items-center gap-2">
                <span>{stage.arenaName}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 hidden sm:inline">
                  {stage.regionName}
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Rút lui khỏi đấu trường"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* BATTLE STAGE: BOSS HP BAR & CHARACTER COMBAT DISPLAY           */}
        {/* ============================================================== */}
        <div className={`p-4 sm:p-6 bg-gradient-to-b ${stage.theme.bgGradient} border-b border-slate-800 relative overflow-hidden shrink-0`}>
          {/* Subtle oriental glow */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* BOSS HEALTH BAR (CAPPED AT 150.000 HP PER SECTION IV) */}
          <div className="max-w-2xl mx-auto space-y-2 relative z-10 mb-4 sm:mb-6">
            <div className="flex items-center justify-between text-xs sm:text-sm font-black flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{stage.avatarStyle.symbol}</span>
                <span className="text-white font-extrabold">{stage.bossName}</span>
                <span className="text-[11px] font-medium text-amber-300">({stage.title})</span>
              </div>
              <div className="font-mono text-xs sm:text-sm text-rose-400 flex items-center gap-1.5">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                <span className="font-bold text-white">
                  {bossHp.toLocaleString('vi-VN')}
                </span>
                <span className="text-slate-400">/ {stage.maxHp.toLocaleString('vi-VN')} HP</span>
                <span className="font-bold text-amber-400 ml-1">({bossHpPercent}%)</span>
              </div>
            </div>

            {/* Health Bar Track */}
            <div className="w-full h-4 sm:h-5 rounded-full bg-slate-950 p-1 border-2 border-slate-700/80 shadow-inner relative overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 relative ${
                  bossHpPercent > 50
                    ? 'bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500'
                    : bossHpPercent > 20
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                    : 'bg-gradient-to-r from-red-600 to-rose-600 animate-pulse'
                }`}
                style={{ width: `${bossHpPercent}%` }}
              >
                {/* Light reflection stripe */}
                <div className="absolute inset-0 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>

          {/* CHARACTER ARENA DISPLAY */}
          <div className="max-w-2xl mx-auto grid grid-cols-12 gap-3 items-center relative z-10">
            {/* Player Avatar */}
            <div className={`col-span-4 sm:col-span-4 p-3 rounded-2xl bg-slate-900/80 border border-slate-700 transition-transform ${isPlayerHurt ? 'animate-shake border-red-500' : ''}`}>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md">
                  MH
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-extrabold text-white truncate">Học Sinh THCS</div>
                  <div className="text-[10px] text-blue-400 font-semibold flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>Lớp {stage.regionId + 5}</span>
                  </div>
                </div>
              </div>
              {/* Player HP */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-300">
                  <span>Giáp Trí Tuệ:</span>
                  <span className="text-blue-300">{playerHp} / 100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${playerHp}%` }}
                  />
                </div>
              </div>
            </div>

            {/* VS Badge & Floating Damage */}
            <div className="col-span-4 sm:col-span-4 text-center relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-red-600 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center shadow-lg border-2 border-white/40">
                VS
              </div>
              {floatingDamage && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap animate-bounce font-black text-sm sm:text-base text-amber-300 drop-shadow-md z-20">
                  {floatingDamage.text}
                </div>
              )}
            </div>

            {/* Boss Avatar */}
            <div className={`col-span-4 sm:col-span-4 p-3 rounded-2xl bg-slate-900/80 border ${stage.theme.border} transition-transform ${isBossHurt ? 'animate-shake scale-95 border-amber-400' : ''}`}>
              <div className="flex items-center gap-2.5 mb-2">
                <div className={`w-10 h-10 rounded-xl ${stage.theme.iconBg} text-white flex items-center justify-center text-xl shadow-md`}>
                  {stage.avatarStyle.symbol}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-extrabold text-white truncate">{stage.bossName}</div>
                  <div className="text-[10px] text-amber-400 font-semibold truncate">{stage.avatarStyle.badge}</div>
                </div>
              </div>
              {/* Skill Pill */}
              <div className="text-[10px] font-bold text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded truncate">
                ⚡ {stage.skills[0] || 'Phép Thuật'}
              </div>
            </div>
          </div>
        </div>

        {/* Battle Log Bar */}
        <div className="px-4 py-2 bg-slate-950/90 border-b border-slate-800 text-center text-xs font-medium text-slate-300 flex items-center justify-center gap-2 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">{battleLog}</span>
        </div>

        {/* ============================================================== */}
        {/* GAMEPLAY CONTENT: QUESTION OR RESULT SCREENS                   */}
        {/* ============================================================== */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col justify-center">
          {battleStatus === 'fighting' && (
            <div className="max-w-2xl mx-auto w-full space-y-4">
              {/* Question Header & Timer */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 pb-2 border-b border-slate-800">
                <span className="text-amber-400 uppercase tracking-wider">
                  Câu hỏi trí tuệ #{currentQIndex + 1}
                </span>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
                  timeLeft <= 10 ? 'bg-red-950 text-red-400 border border-red-700 animate-pulse' : 'bg-slate-800 text-slate-300'
                }`}>
                  <Timer className="w-3.5 h-3.5" />
                  <span>{timeLeft}s</span>
                </div>
              </div>

              {/* Question Content */}
              <div className="text-sm sm:text-base font-extrabold text-white leading-snug p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                {currentQ.question}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentQ.options.map((opt, oIdx) => {
                  let btnStyle = 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 hover:border-amber-400 text-slate-200';

                  if (isAnswered) {
                    if (oIdx === currentQ.correctIndex) {
                      btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50';
                    } else if (selectedOption === oIdx) {
                      btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-200';
                    } else {
                      btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelectAnswer(oIdx)}
                      className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 flex items-center justify-center font-black text-xs shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next button when answered */}
              {isAnswered && (
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                  <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex-1">
                    <strong className="text-emerald-400">Giải thích: </strong>
                    {currentQ.explanation}
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md shrink-0 cursor-pointer"
                  >
                    <span>{bossHp <= 0 ? 'Tổng kết chiến thắng' : 'Câu hỏi kế tiếp'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* VICTORY SCREEN                                                 */}
          {/* ============================================================== */}
          {battleStatus === 'victory' && (
            <div className="max-w-md mx-auto text-center space-y-5 animate-scaleUp py-4">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center text-4xl shadow-2xl shadow-amber-500/40 animate-bounce">
                👑
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Chiến Thắng Vang Dội
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Đã Vượt Qua Đấu Trường #{stage.id}!
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
                  Bạn đã xuất sắc đánh bại <strong className="text-amber-400">{stage.bossName}</strong> ({stage.title}) bằng tri thức vững vàng.
                </p>
              </div>

              {/* Reward Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-orange-950/40 border border-amber-600/40 space-y-2 text-left">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Trophy className="w-4 h-4" />
                  <span>Phần thưởng đã mở khóa:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Kinh nghiệm:</span>
                    <span className="font-extrabold text-amber-400">+{stage.rewardExp} EXP</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Huy hiệu:</span>
                    <span className="font-extrabold text-emerald-300 truncate block">{stage.rewardBadge}</span>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Danh hiệu mới:</span>
                  <span className="font-extrabold text-purple-300">{stage.rewardTitle}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onVictory(stage.id < 50 ? stage.id + 1 : stage.id)}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 cursor-pointer"
                >
                  <span>{stage.id < 50 ? `Sang Đấu Trường #${stage.id + 1}` : 'Hoàn Thành Tất Cả 50 Đấu Trường!'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm cursor-pointer"
                >
                  Về Bản Đồ Đấu Trường
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* DEFEAT SCREEN                                                  */}
          {/* ============================================================== */}
          {battleStatus === 'defeat' && (
            <div className="max-w-md mx-auto text-center space-y-4 animate-scaleUp py-4">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center text-3xl">
                ⚔️
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-widest text-rose-400">
                  Thất Bại Trong Thử Thách
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Chưa Thể Vượt Qua {stage.bossName}!
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                  Đấu trường tiếp theo vẫn bị khóa theo quy tắc tuần tự. Hãy ôn tập lại kiến thức và thử thách lại ngay nhé!
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRetryBattle}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Khiêu chiến lại ngay</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm cursor-pointer"
                >
                  Rút lui về sảnh
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

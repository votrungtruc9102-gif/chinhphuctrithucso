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
  Check,
  UserCheck
} from 'lucide-react';
import { PvPRoomState, realtimeService } from '../../services/realtimeService';
import { PLAYABLE_CHARACTERS } from '../../data/characterList';
import { ARENA_STAGES } from '../../data/arenaData';
import { UserAccount } from '../../types';

interface PvPBattleModalProps {
  roomState: PvPRoomState;
  currentUser: UserAccount;
  onClose: () => void;
}

export const PvPBattleModal: React.FC<PvPBattleModalProps> = ({
  roomState,
  currentUser,
  onClose
}) => {
  const [selectedCharId, setSelectedCharId] = useState<string>(
    currentUser.uid === roomState.challenger.uid
      ? roomState.challenger.characterId
      : roomState.opponent.characterId
  );
  const [selectedArenaId, setSelectedArenaId] = useState<number>(
    currentUser.uid === roomState.challenger.uid
      ? roomState.challenger.arenaId
      : roomState.opponent.arenaId
  );

  // Question & countdown timer states
  const [questionTimer, setQuestionTimer] = useState<number>(15);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState<boolean>(false);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(5);

  const isChallenger = currentUser.uid === roomState.challenger.uid;
  const myPlayer = isChallenger ? roomState.challenger : roomState.opponent;
  const opponentPlayer = isChallenger ? roomState.opponent : roomState.challenger;

  // Listen for countdown
  useEffect(() => {
    if (roomState.status === 'countdown') {
      setCountdownSeconds(5);
      const timer = setInterval(() => {
        setCountdownSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [roomState.status]);

  // Question timer for live match
  useEffect(() => {
    if (roomState.status !== 'in_progress') return;
    setQuestionTimer(15);
    setSelectedAnswerIndex(null);
    setHasSubmittedAnswer(false);

    const timer = setInterval(() => {
      setQuestionTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // If player didn't answer in time, auto-submit wrong
          if (!hasSubmittedAnswer) {
            handleSubmitAnswer(-1);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [roomState.status, roomState.currentRound, roomState.currentQuestionIndex]);

  const handleConfirmIdentity = () => {
    realtimeService.confirmIdentity(roomState.id, currentUser.uid);
  };

  const handleSelectCharacter = (charId: string) => {
    setSelectedCharId(charId);
    realtimeService.selectCharacter(roomState.id, currentUser.uid, charId);
  };

  const handleSelectArena = (arenaId: number) => {
    setSelectedArenaId(arenaId);
    realtimeService.selectArena(roomState.id, currentUser.uid, arenaId);
  };

  const handleToggleReady = () => {
    realtimeService.setReady(roomState.id, currentUser.uid, !myPlayer.isReady);
  };

  const handleSubmitAnswer = (answerIdx: number) => {
    if (hasSubmittedAnswer) return;
    setSelectedAnswerIndex(answerIdx);
    setHasSubmittedAnswer(true);

    realtimeService.submitPvPAnswer(
      roomState.id,
      currentUser.uid,
      roomState.currentRound - 1,
      roomState.currentQuestionIndex,
      answerIdx
    );
  };

  const handleNextStep = () => {
    realtimeService.nextPvPStep(roomState.id);
  };

  const currentQ =
    roomState.questionsByRound[roomState.currentRound - 1]?.[roomState.currentQuestionIndex];

  const myChar = PLAYABLE_CHARACTERS.find(c => c.id === myPlayer.characterId) || PLAYABLE_CHARACTERS[0];
  const oppChar = PLAYABLE_CHARACTERS.find(c => c.id === opponentPlayer.characterId) || PLAYABLE_CHARACTERS[1];
  const activeArena = ARENA_STAGES.find(a => a.id === roomState.activeArenaId) || ARENA_STAGES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border-2 border-indigo-500/40 text-white shadow-2xl overflow-hidden my-auto flex flex-col max-h-[95vh] animate-scaleUp">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-950 via-slate-900 to-rose-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center shadow-lg">
              <Swords className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Best of 5 · So Tài Trí Tuệ
                </span>
                <span className="text-xs text-slate-400">
                  Mã phòng: <code className="text-amber-400 font-mono">{roomState.id.slice(0, 10)}</code>
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2 mt-0.5">
                <span>{roomState.arenaName}</span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Stages */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* STAGE 1: IDENTITY CHECK */}
          {roomState.status === 'identity_check' && (
            <div className="text-center space-y-6 py-6 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto shadow-xl">
                <UserCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Xác Minh Danh Tính Học Sinh</h3>
                <p className="text-sm text-slate-300 mt-2">
                  Để đảm bảo công bằng 100% người thật đối đầu người thật, cả 2 bên cần xác nhận tài khoản học sinh trước khi bắt đầu.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase">Học sinh 1</div>
                  <div className="font-extrabold text-white text-base">{roomState.challenger.displayName}</div>
                  <div className="text-xs text-amber-400">{roomState.challenger.className} · Khối {roomState.challenger.grade}</div>
                  <div className="pt-2">
                    {roomState.challenger.confirmedIdentity ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Đã xác nhận
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 italic">Đang chờ xác nhận...</span>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase">Học sinh 2</div>
                  <div className="font-extrabold text-white text-base">{roomState.opponent.displayName}</div>
                  <div className="text-xs text-amber-400">{roomState.opponent.className} · Khối {roomState.opponent.grade}</div>
                  <div className="pt-2">
                    {roomState.opponent.confirmedIdentity ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Đã xác nhận
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 italic">Đang chờ xác nhận...</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                {!myPlayer.confirmedIdentity ? (
                  <button
                    onClick={handleConfirmIdentity}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-black text-sm shadow-xl shadow-indigo-500/25 transition-all cursor-pointer"
                  >
                    Xác Nhận Danh Tính Học Sinh
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                    ✓ Bạn đã xác nhận thành công. Chờ đối thủ xác nhận để bước vào chọn nhân vật...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STAGE 2: CHARACTER & ARENA SELECT */}
          {roomState.status === 'character_arena_select' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-black text-white">Chọn Nhân Vật & Đấu Trường Ưa Thích</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Chọn 1 trong 50 nhân vật đại diện và đấu trường của bạn. Nếu chọn khác đấu trường, hệ thống sẽ tự động chỉ định đấu trường trung lập.
                </p>
              </div>

              {/* Character selection carousel/grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Sparkles className="w-4 h-4" /> Chọn nhân vật (50 nhân vật đại diện):
                  </span>
                  <span>Đã chọn: <strong className="text-white">{myChar.name}</strong></span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-48 overflow-y-auto p-2 rounded-2xl bg-slate-950/80 border border-slate-800">
                  {PLAYABLE_CHARACTERS.map(c => {
                    const isSelected = selectedCharId === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => handleSelectCharacter(c.id)}
                        className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-indigo-600/30 border-indigo-400 shadow-md shadow-indigo-500/30 scale-105'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg ${c.iconBg} text-white flex items-center justify-center text-lg shadow`}>
                          {c.avatar}
                        </div>
                        <span className="text-[10px] font-bold text-slate-200 truncate w-full text-center">
                          {c.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Arena Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5 text-rose-400">
                    <Swords className="w-4 h-4" /> Chọn đấu trường ưu thích (50 đấu trường):
                  </span>
                  <span>Đã chọn: <strong className="text-white">Đấu trường #{selectedArenaId}</strong></span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 max-h-40 overflow-y-auto p-2 rounded-2xl bg-slate-950/80 border border-slate-800">
                  {ARENA_STAGES.slice(0, 25).map(st => {
                    const isSelected = selectedArenaId === st.id;
                    return (
                      <button
                        key={st.id}
                        onClick={() => handleSelectArena(st.id)}
                        className={`p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-rose-600/30 border-rose-400 shadow-md shadow-rose-500/30'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-[10px] font-extrabold uppercase text-amber-400">#{st.id} · Cấp {st.level}</div>
                        <div className="text-xs font-bold text-white truncate">{st.arenaName.split(':')[1] || st.arenaName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STAGE 3: LOBBY & READINESS */}
          {(roomState.status === 'lobby' || roomState.status === 'countdown') && (
            <div className="space-y-6">
              {/* Countdown overlay when starting */}
              {roomState.status === 'countdown' && (
                <div className="text-center py-4 bg-gradient-to-r from-rose-900/40 via-amber-900/40 to-rose-900/40 border border-amber-500/40 rounded-2xl animate-pulse">
                  <div className="text-xs uppercase font-extrabold text-amber-400 tracking-widest">Trận đấu bắt đầu sau</div>
                  <div className="text-6xl font-black text-white font-mono mt-1">{countdownSeconds}</div>
                </div>
              )}

              {/* Opponent Versus Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Challenger Card */}
                <div className={`p-5 rounded-3xl border-2 transition-all ${
                  roomState.challenger.isReady
                    ? 'bg-emerald-950/30 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950/80 border-slate-800'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white text-3xl flex items-center justify-center shadow-lg border border-white/20">
                      {PLAYABLE_CHARACTERS.find(c => c.id === roomState.challenger.characterId)?.avatar || '🐉'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                          {roomState.challenger.className} · Khối {roomState.challenger.grade}
                        </span>
                        {roomState.challenger.isReady && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            SẴN SÀNG
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-black text-white mt-0.5">{roomState.challenger.displayName}</h4>
                      <p className="text-xs text-indigo-300 font-semibold">
                        Nhân vật: {PLAYABLE_CHARACTERS.find(c => c.id === roomState.challenger.characterId)?.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Opponent Card */}
                <div className={`p-5 rounded-3xl border-2 transition-all ${
                  roomState.opponent.isReady
                    ? 'bg-emerald-950/30 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950/80 border-slate-800'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white text-3xl flex items-center justify-center shadow-lg border border-white/20">
                      {PLAYABLE_CHARACTERS.find(c => c.id === roomState.opponent.characterId)?.avatar || '⚡'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                          {roomState.opponent.className} · Khối {roomState.opponent.grade}
                        </span>
                        {roomState.opponent.isReady && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            SẴN SÀNG
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-black text-white mt-0.5">{roomState.opponent.displayName}</h4>
                      <p className="text-xs text-rose-300 font-semibold">
                        Nhân vật: {PLAYABLE_CHARACTERS.find(c => c.id === roomState.opponent.characterId)?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ready Button */}
              {roomState.status === 'lobby' && (
                <div className="text-center pt-2">
                  <button
                    onClick={handleToggleReady}
                    className={`py-4 px-10 rounded-2xl font-black text-base shadow-xl transition-all cursor-pointer ${
                      myPlayer.isReady
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/30 scale-100 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {myPlayer.isReady ? 'HỦY SẴN SÀNG' : 'TÔI ĐÃ SẴN SÀNG CHIẾN ĐẤU!'}
                  </button>
                  <p className="text-xs text-slate-400 mt-2">
                    Cả hai bên cùng bấm "Sẵn sàng" để bắt đầu đếm ngược 5 giây.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STAGE 4: IN PROGRESS BATTLE (BEST OF 5 ROUNDS) */}
          {roomState.status === 'in_progress' && currentQ && (
            <div className="space-y-6">
              {/* Match Header Bar */}
              <div className="grid grid-cols-3 items-center p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                {/* My Score */}
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{myChar.avatar}</div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 truncate max-w-[120px]">{myPlayer.displayName}</div>
                    <div className="text-2xl font-black text-emerald-400 font-mono">{myPlayer.score} pts</div>
                  </div>
                </div>

                {/* Round & Timer */}
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Lượt {roomState.currentRound} / 5 · Câu {roomState.currentQuestionIndex + 1} / 5
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-rose-400 font-mono text-lg font-black">
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>{questionTimer}s</span>
                  </div>
                </div>

                {/* Opponent Score */}
                <div className="flex items-center justify-end gap-3 text-right">
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 truncate max-w-[120px]">{opponentPlayer.displayName}</div>
                    <div className="text-2xl font-black text-rose-400 font-mono">{opponentPlayer.score} pts</div>
                  </div>
                  <div className="text-2xl">{oppChar.avatar}</div>
                </div>
              </div>

              {/* Question Box */}
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Câu hỏi #{roomState.currentQuestionIndex + 1}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                  {currentQ.question}
                </h3>

                {/* Answer Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedAnswerIndex === idx;
                    const isCorrect = idx === currentQ.correctIndex;

                    let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';
                    if (hasSubmittedAnswer) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/20';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                      } else {
                        btnStyle = 'bg-slate-900/50 border-slate-800/50 text-slate-500';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={hasSubmittedAnswer}
                        onClick={() => handleSubmitAnswer(idx)}
                        className={`p-4 rounded-2xl text-left border-2 font-medium text-sm transition-all cursor-pointer flex items-start gap-3 ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1 leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation feedback after answering */}
                {hasSubmittedAnswer && (
                  <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300">Giải thích chi tiết:</span>
                      <button
                        onClick={handleNextStep}
                        className="py-1.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Tiếp tục</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STAGE 5: FINISHED MATCH SUMMARY */}
          {roomState.status === 'finished' && (
            <div className="text-center space-y-6 py-6 max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/30">
                <Trophy className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {roomState.isDraw
                    ? 'TRẬN ĐẤU BẤT PHÂN THẮNG BẠI!'
                    : roomState.winnerUid === currentUser.uid
                    ? 'CHIẾN THẮNG HUY HOÀNG!'
                    : 'NỖ LỰC ĐÁNG KHEN NGỢI!'}
                </h3>
                <p className="text-sm text-slate-300 mt-2">
                  Tổng kết 5 lượt trận đấu trí cam go tại {roomState.arenaName}.
                </p>
              </div>

              {/* Scoreboard result */}
              <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-2xl border ${
                    roomState.winnerUid === roomState.challenger.uid ? 'bg-emerald-950/30 border-emerald-500' : 'bg-slate-900 border-slate-800'
                  }`}>
                    <div className="text-xs font-bold text-slate-400">{roomState.challenger.displayName}</div>
                    <div className="text-3xl font-black text-white font-mono mt-1">{roomState.challenger.score} pts</div>
                  </div>
                  <div className={`p-4 rounded-2xl border ${
                    roomState.winnerUid === roomState.opponent.uid ? 'bg-emerald-950/30 border-emerald-500' : 'bg-slate-900 border-slate-800'
                  }`}>
                    <div className="text-xs font-bold text-slate-400">{roomState.opponent.displayName}</div>
                    <div className="text-3xl font-black text-white font-mono mt-1">{roomState.opponent.score} pts</div>
                  </div>
                </div>

                {/* Rewards earned */}
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-left space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4" /> Phần thưởng ghi nhận vào hồ sơ:
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-200">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Flame className="w-3.5 h-3.5" />
                      {roomState.isDraw ? '+10 RP' : roomState.winnerUid === currentUser.uid ? '+25 RP' : '-10 RP'}
                    </span>
                    <span className="flex items-center gap-1 text-indigo-400">
                      <Zap className="w-3.5 h-3.5" />
                      {roomState.isDraw ? '+60 EXP' : roomState.winnerUid === currentUser.uid ? '+120 EXP' : '+40 EXP'}
                    </span>
                    <span className="text-slate-400">
                      Cập nhật trực tiếp vào Bảng Xếp Hạng toàn trường.
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={onClose}
                  className="w-full py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all cursor-pointer border border-slate-700"
                >
                  Quay Lại Thế Giới Trò Chơi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

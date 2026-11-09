import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Heart,
  Sparkles,
  Award,
  Users,
  Swords,
  Flame,
  Zap,
  Clock,
  ArrowRight,
  AlertTriangle,
  Trophy,
  CheckCircle2
} from 'lucide-react';
import { BOSS_DEFINITIONS, BossDefinition, BossQuestion } from '../../data/bossData';
import { BossRoomState, realtimeService } from '../../services/realtimeService';
import { studentAccountService } from '../../services/studentAccountService';
import { UserAccount } from '../../types';
import { shuffleSingleQuestionOptions, generateBalancedTargetSlots } from '../../utils/gameQuestionHelper';

function prepareShuffledBossQuestions(questions: BossQuestion[]): BossQuestion[] {
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

interface BossRaidModalProps {
  initialBossId?: string;
  currentUser: UserAccount;
  onClose: () => void;
}

export const BossRaidModal: React.FC<BossRaidModalProps> = ({
  initialBossId,
  currentUser,
  onClose
}) => {
  const [selectedGrade, setSelectedGrade] = useState<6 | 7 | 8 | 9>(6);
  const [selectedBoss, setSelectedBoss] = useState<BossDefinition>(() => {
    if (initialBossId) {
      const found = BOSS_DEFINITIONS.find(b => b.id === initialBossId);
      if (found) return found;
    }
    return BOSS_DEFINITIONS[0];
  });

  const [bossQuestions, setBossQuestions] = useState<BossQuestion[]>(() =>
    prepareShuffledBossQuestions(selectedBoss.questions)
  );

  const [isInRaid, setIsInRaid] = useState(false);
  const [roomState, setRoomState] = useState<BossRoomState | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timer, setTimer] = useState(20);

  // Sync shuffled questions when boss changes
  useEffect(() => {
    setBossQuestions(prepareShuffledBossQuestions(selectedBoss.questions));
    setCurrentQIndex(0);
  }, [selectedBoss.id]);

  // Listen for realtime Boss room updates
  useEffect(() => {
    const unsub = realtimeService.on('boss:room_update', (data: BossRoomState) => {
      if (data.bossId === selectedBoss.id) {
        setRoomState(data);
        if (data.isDefeated) {
          studentAccountService.updateProgress({
            rpChange: 250,
            expChange: 350,
            bossDefeatedId: selectedBoss.id,
            gameType: 'boss_raid'
          }).catch(() => {});
        }
      }
    });
    return () => unsub();
  }, [selectedBoss.id]);

  // Question timer
  useEffect(() => {
    if (!isInRaid || (roomState && roomState.isDefeated)) return;
    setTimer(20);
    setSelectedAnswer(null);
    setHasAnswered(false);

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!hasAnswered) {
            handleAnswer(-1);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isInRaid, currentQIndex, roomState?.isDefeated]);

  const handleStartRaid = () => {
    setIsInRaid(true);
    realtimeService.joinBossRoom(selectedBoss.id, {
      uid: currentUser.uid,
      displayName: currentUser.displayName,
      className: currentUser.className || '6A1',
      grade: currentUser.grade || 6,
      avatarEmoji: '🧑‍🎓'
    });
  };

  const handleAnswer = (answerIdx: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(answerIdx);
    setHasAnswered(true);

    const q = bossQuestions[currentQIndex % bossQuestions.length] || {
      id: 'fallback',
      question: 'Đang tải câu hỏi...',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 0,
      damage: 1000,
      subject: '',
      explanation: ''
    };
    const isCorrect = answerIdx === q.correctIndex;
    const damage = isCorrect ? q.damage : 0;

    realtimeService.attackBoss(selectedBoss.id, currentUser.uid, damage, isCorrect);
  };

  const handleNextQuestion = () => {
    setCurrentQIndex(prev => prev + 1);
  };

  const currentHp = roomState ? roomState.currentHp : selectedBoss.maxHp;
  const maxHp = selectedBoss.maxHp;
  const hpPercent = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));

  const filteredBosses = BOSS_DEFINITIONS.filter(b => b.grade === selectedGrade);
  const currentQ = bossQuestions[currentQIndex % bossQuestions.length] || {
    id: 'fallback',
    question: 'Đang tải câu hỏi...',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 0,
    damage: 1000,
    subject: '',
    explanation: ''
  };

  // Phase computation
  let phaseText = 'Giai đoạn 1: Toàn Sức Mạnh';
  let phaseColor = 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
  if (hpPercent <= 25) {
    phaseText = 'Giai đoạn 3: TUYỆT DIỆT (Nguy cấp!)';
    phaseColor = 'text-rose-400 bg-rose-500/20 border-rose-500/30 animate-pulse';
  } else if (hpPercent <= 60) {
    phaseText = 'Giai đoạn 2: CUỒNG NỘ';
    phaseColor = 'text-amber-400 bg-amber-500/20 border-amber-500/30';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-slate-900 border-2 border-indigo-500/40 text-white shadow-2xl overflow-hidden my-auto flex flex-col max-h-[95vh] animate-scaleUp">
        {/* Top Header */}
        <div className={`p-4 sm:p-5 bg-gradient-to-r ${selectedBoss.appearance.bgGradient} border-b border-slate-800 flex items-center justify-between shrink-0`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-700 text-3xl flex items-center justify-center shadow-lg">
              {selectedBoss.appearance.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-950/70 text-amber-400 border border-slate-700">
                  Boss #{selectedBoss.order} · Khối {selectedBoss.grade}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Cấp {selectedBoss.level}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                {selectedBoss.name} — <span className="text-amber-300 text-sm font-semibold">{selectedBoss.title}</span>
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

        {/* Boss HP Bar always visible */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 space-y-1.5 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-cyan-400">
                <Heart className="w-4 h-4 fill-cyan-500 text-cyan-500" />
                <span>Sinh Lực Thử Thách:</span>
              </span>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${phaseColor}`}>
                {phaseText}
              </span>
            </div>
            <span className="font-mono text-white text-sm">
              {currentHp.toLocaleString('vi-VN')} / {maxHp.toLocaleString('vi-VN')} HP ({Math.round(hpPercent)}%)
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${hpPercent}%` }}
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {!isInRaid ? (
            /* PRE-RAID BOSS OVERVIEW & SELECTOR */
            <div className="space-y-6">
              {/* Grade Tabs */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Chọn khối lớp (50 Thử Thách Nâng Cao):
                </div>
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800">
                  {([6, 7, 8, 9] as const).map(gr => (
                    <button
                      key={gr}
                      onClick={() => {
                        setSelectedGrade(gr);
                        const firstInGrade = BOSS_DEFINITIONS.find(b => b.grade === gr);
                        if (firstInGrade) setSelectedBoss(firstInGrade);
                      }}
                      className={`py-1.5 px-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        selectedGrade === gr
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Khối {gr} ({gr === 6 || gr === 7 ? '12 Boss' : '13 Boss'})
                    </button>
                  ))}
                </div>
              </div>

              {/* Boss Selector Carousel (Up to 13 bosses per grade) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2 max-h-56 overflow-y-auto p-1">
                {filteredBosses.map(b => {
                  const isSelected = selectedBoss.id === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBoss(b)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                        isSelected
                          ? 'bg-indigo-600/30 border-indigo-400 shadow-lg shadow-indigo-500/20 scale-105'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-2xl">{b.appearance.avatar}</div>
                      <div className="text-[10px] font-extrabold text-amber-400 uppercase">Boss #{b.order}</div>
                      <div className="text-xs font-bold text-white truncate">{b.name}</div>
                      <div className="text-[10px] text-slate-400">{b.maxHp.toLocaleString('vi-VN')} HP</div>
                    </button>
                  );
                })}
              </div>

              {/* Boss Lore & Detail Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Truyền thuyết & Bối cảnh
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{selectedBoss.lore}</p>
                  <div className="pt-2 text-xs">
                    <span className="text-slate-400">Đấu trường:</span>{' '}
                    <span className="font-bold text-white">{selectedBoss.arena}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Swords className="w-3.5 h-3.5" /> Tuyệt kỹ & Điểm yếu
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {selectedBoss.skills.map((sk, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <strong className="text-white">{sk.name}:</strong> {sk.description}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 text-xs">
                    <span className="text-slate-400">Điểm yếu khắc chế:</span>{' '}
                    <span className="font-bold text-amber-300">{selectedBoss.weakness}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> Phần thưởng hạ gục
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Kinh nghiệm (EXP):</span>
                      <strong className="text-indigo-400">+{selectedBoss.rewards.exp} EXP</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Điểm Rank (RP):</span>
                      <strong className="text-emerald-400">+{selectedBoss.rewards.rp} RP</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Huy hiệu:</span>
                      <strong className="text-amber-400">{selectedBoss.rewards.badge}</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Danh hiệu:</span>
                      <strong className="text-purple-400">{selectedBoss.rewards.title}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Raid Button */}
              <div className="text-center pt-2">
                <button
                  onClick={handleStartRaid}
                  className="py-4 px-10 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-black text-base shadow-2xl shadow-rose-500/30 transition-all cursor-pointer scale-100 hover:scale-105 active:scale-95"
                >
                  TẬP HỢP TỔ ĐỘI & TẤN CÔNG ĐẠI BOSS
                </button>
                <p className="text-xs text-slate-300 mt-2 font-medium">
                  Tổ đội tối thiểu 3 người chơi thật (tối đa 10 người), 100% không dùng bot ảo, cùng hiệp lực giải đề để tiêu diệt Boss trong thời gian thực.
                </p>
              </div>
            </div>
          ) : roomState && roomState.isDefeated ? (
            /* VICTORY SCREEN */
            <div className="text-center space-y-6 py-8 max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
                <Trophy className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white">ĐẠI THẮNG ĐẠI BOSS!</h3>
                <p className="text-sm text-slate-300 mt-2">
                  Tổ đội học sinh đã xuất sắc đánh bại <strong className="text-amber-400">{selectedBoss.name}</strong>!
                </p>
              </div>

              {/* Team Contribution Table */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase text-left">
                  Đóng góp sát thương tổ đội:
                </div>
                <div className="space-y-2">
                  {roomState.members.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-900 text-xs">
                      <div className="flex items-center gap-2">
                        <span>{m.avatarEmoji}</span>
                        <span className="font-bold text-white">{m.displayName} ({m.className})</span>
                      </div>
                      <div className="font-mono text-emerald-400 font-bold">
                        {m.damageDealt.toLocaleString('vi-VN')} dmg ({m.correctAnswers} câu đúng)
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setIsInRaid(false);
                  setRoomState(null);
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm transition-all cursor-pointer"
              >
                Nhận Thưởng & Quay Lại Săn Boss
              </button>
            </div>
          ) : (
            /* ACTIVE RAID COMBAT INTERFACE */
            <div className="space-y-6">
              {/* Team Roster Bar */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5 text-indigo-400">
                    <Users className="w-4 h-4" /> Tổ đội săn Boss ({roomState?.members.length || 1}/10 thành viên):
                  </span>
                  <span className="flex items-center gap-1 text-rose-400 font-mono">
                    <Clock className="w-3.5 h-3.5" /> Thời gian: {timer}s
                  </span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {(roomState?.members || []).map((m, idx) => (
                    <div key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 shrink-0">
                      <span>{m.avatarEmoji}</span>
                      <div className="text-[11px]">
                        <div className="font-bold text-white">{m.displayName}</div>
                        <div className="text-[10px] text-emerald-400 font-mono">{m.damageDealt.toLocaleString('vi-VN')} dmg</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question & Attack Card */}
              {currentQ && (
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-amber-400 uppercase tracking-wider">
                      Câu hỏi công phá #{currentQIndex + 1} · {currentQ.subject}
                    </span>
                    <span className="text-rose-400 font-bold">
                      Sát thương tiềm năng: +{currentQ.damage.toLocaleString('vi-VN')} dmg
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-relaxed">
                    {currentQ.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = selectedAnswer === idx;
                      const isCorrect = idx === currentQ.correctIndex;

                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';
                      if (hasAnswered) {
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
                          disabled={hasAnswered}
                          onClick={() => handleAnswer(idx)}
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

                  {hasAnswered && (
                    <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300">
                          {selectedAnswer === currentQ.correctIndex
                            ? '✓ CHÍNH XÁC! Bạn đã trả lời xuất sắc và tích lũy thêm điểm tri thức!'
                            : '✗ Chưa chính xác! Thử thách nâng cao đòi hỏi tư duy sâu sắc hơn.'}
                        </span>
                        <button
                          onClick={handleNextQuestion}
                          className="py-1.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Câu tiếp theo</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {currentQ.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

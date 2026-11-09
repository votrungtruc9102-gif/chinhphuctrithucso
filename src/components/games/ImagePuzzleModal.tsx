import React, { useState } from 'react';
import {
  X,
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Award,
  ChevronRight,
  RotateCcw,
  Volume2,
  VolumeX,
  Eye,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Settings,
  Plus,
  Trash2,
  Save,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ImagePuzzle } from '../../data/imagePuzzleData';
import { arenaStorageService } from '../../services/arenaStorageService';
import { gameAudio } from '../../utils/gameAudio';
import { shuffleSingleQuestionOptions, generateBalancedTargetSlots } from '../../utils/gameQuestionHelper';

function prepareShuffledImagePuzzles(puzzles: ImagePuzzle[]): ImagePuzzle[] {
  if (!puzzles || puzzles.length === 0) return [];
  const slots = generateBalancedTargetSlots(puzzles.length);
  const shuffled = [...puzzles];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.map((p, idx) => {
    const assignedSlot = slots[idx] ?? Math.floor(Math.random() * 4);
    return shuffleSingleQuestionOptions(p, assignedSlot);
  });
}

interface ImagePuzzleModalProps {
  onClose: () => void;
  onAddScore: (points: number) => void;
  currentUser?: {
    id: string;
    name: string;
    role?: string;
    classId?: string;
  };
}

export const ImagePuzzleModal: React.FC<ImagePuzzleModalProps> = ({
  onClose,
  onAddScore,
  currentUser
}) => {
  const [allPuzzles, setAllPuzzles] = useState<ImagePuzzle[]>(() =>
    prepareShuffledImagePuzzles(arenaStorageService.getImagePuzzles())
  );
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [isMuted, setIsMuted] = useState(() => gameAudio.getMuted());
  const [isFinished, setIsFinished] = useState(false);

  // Fullscreen Zoom Viewer State
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Teacher Admin State
  const [isTeacherAdmin, setIsTeacherAdmin] = useState(false);
  const [adminPuzzles, setAdminPuzzles] = useState<ImagePuzzle[]>([]);
  const [adminNotice, setAdminNotice] = useState<string | null>(null);

  // Filter puzzles based on class
  const filteredPuzzles = allPuzzles.filter(p => {
    if (selectedClass === 'all') return true;
    return p.targetClass === selectedClass || (!p.targetClass && String(p.grade) === selectedClass.charAt(0));
  });

  const activePuzzles = filteredPuzzles.length > 0 ? filteredPuzzles : allPuzzles;
  const currentPuzzle = activePuzzles[currentIndex % activePuzzles.length];

  // Helper string normalization: lowercases, removes diacritics and special characters
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]/g, '');
  };

  // Reveal a hint
  const handleRevealHint = () => {
    if (revealedHints < currentPuzzle.hints.length) {
      setRevealedHints(prev => prev + 1);
      gameAudio.playClick();
    }
  };

  // Handle option click answer
  const handleAnswerOption = (index: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(index);

    if (index === currentPuzzle.correctAnswer) {
      gameAudio.playCorrect();
      const earned = Math.max(10, currentPuzzle.points - revealedHints * 5);
      setTotalScore(prev => prev + earned);
      onAddScore(earned);

      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {}
    } else {
      gameAudio.playIncorrect();
    }
  };

  // Handle typed answer submission
  const handleAnswerSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isAnswered || !typedAnswer.trim()) return;
    setIsAnswered(true);

    const normInput = normalizeText(typedAnswer);
    const correctOpt = currentPuzzle.options[currentPuzzle.correctAnswer] || '';
    const normCorrect = normalizeText(correctOpt);

    const isMatch =
      normInput === normCorrect ||
      normCorrect.includes(normInput) ||
      (currentPuzzle.synonyms &&
        currentPuzzle.synonyms.some(s => {
          const normSyn = normalizeText(s);
          return normInput === normSyn || normSyn.includes(normInput) || normInput.includes(normSyn);
        }));

    if (isMatch) {
      setSelectedOption(currentPuzzle.correctAnswer);
      gameAudio.playCorrect();
      // Bonus +5 points for typing direct answer
      const earned = Math.max(15, currentPuzzle.points - revealedHints * 5 + 5);
      setTotalScore(prev => prev + earned);
      onAddScore(earned);

      try {
        confetti({ particleCount: 80, spread: 65 });
      } catch {}
    } else {
      setSelectedOption(-1);
      gameAudio.playIncorrect();
    }
  };

  // Next Puzzle
  const handleNext = () => {
    if (currentIndex < activePuzzles.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setRevealedHints(0);
      setIsAnswered(false);
      setSelectedOption(null);
      setTypedAnswer('');
    } else {
      setIsFinished(true);
      gameAudio.playVictory();
      try {
        confetti({ particleCount: 100, spread: 80 });
      } catch {}
    }
  };

  // Restart with fresh randomized puzzles & options
  const handleRestart = () => {
    setAllPuzzles(prepareShuffledImagePuzzles(arenaStorageService.getImagePuzzles()));
    setCurrentIndex(0);
    setRevealedHints(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setTypedAnswer('');
    setTotalScore(0);
    setIsFinished(false);
  };

  // Teacher Admin Actions
  const handleOpenTeacherAdmin = () => {
    setAdminPuzzles(JSON.parse(JSON.stringify(allPuzzles)));
    setIsTeacherAdmin(true);
  };

  const handleSaveTeacherAdmin = () => {
    arenaStorageService.saveImagePuzzles(adminPuzzles);
    setAllPuzzles(prepareShuffledImagePuzzles(adminPuzzles));
    setAdminNotice('Đã lưu kho câu đố hình ảnh thành công!');
    setTimeout(() => setAdminNotice(null), 3000);
    setIsTeacherAdmin(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md" onClick={onClose} />

      {/* Main Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border-2 border-amber-500/40 text-white shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-xl shadow-lg font-black">
              🔍
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-white flex items-center gap-2">
                <span>Giải Đố Hình Ảnh Tri Thức</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Quan Sát & Khám Phá
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Câu đố {currentIndex + 1} / {activePuzzles.length} · Điểm tích lũy: +{totalScore}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Teacher button */}
            <button
              onClick={handleOpenTeacherAdmin}
              title="Quản lý câu đố dành cho Giáo viên"
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
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Class Filter Bar */}
        {!isTeacherAdmin && (
          <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Khối lớp:
            </span>
            {[
              { id: 'all', label: 'Tất cả khối' },
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
                  setRevealedHints(0);
                  setIsAnswered(false);
                  setSelectedOption(null);
                  setTypedAnswer('');
                }}
                className={`px-3 py-1 rounded-xl font-bold cursor-pointer transition-all ${
                  selectedClass === cls.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {cls.label}
              </button>
            ))}
          </div>
        )}

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-slate-200">
          {/* TEACHER ADMIN PANEL */}
          {isTeacherAdmin ? (
            <div className="space-y-4 py-1">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-black text-amber-300 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-amber-400" />
                    <span>Quản Lý Ngân Hàng Câu Đố Hình Ảnh (Giáo Viên )</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Cập nhật link ảnh, 3 tầng gợi ý và từ khóa đồng nghĩa cho lớp 6A5, 7A5, 8A5, 9A5
                  </p>
                </div>
                <button
                  onClick={() => setIsTeacherAdmin(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                >
                  Quay lại trò chơi
                </button>
              </div>

              {adminNotice && (
                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{adminNotice}</span>
                </div>
              )}

              {/* Puzzle Edit List */}
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {adminPuzzles.map((puz, pIdx) => (
                  <div
                    key={puz.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-400">
                        #{pIdx + 1} · {puz.title}
                      </span>
                      <select
                        value={puz.targetClass || 'all'}
                        onChange={e => {
                          const val = e.target.value as any;
                          setAdminPuzzles(prev =>
                            prev.map((item, idx) =>
                              idx === pIdx ? { ...item, targetClass: val } : item
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400">Tiêu đề câu đố:</label>
                        <input
                          type="text"
                          value={puz.title}
                          onChange={e => {
                            const val = e.target.value;
                            setAdminPuzzles(prev =>
                              prev.map((item, idx) =>
                                idx === pIdx ? { ...item, title: val } : item
                              )
                            );
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-0.5"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400">URL hình ảnh:</label>
                        <input
                          type="text"
                          value={puz.imageUrl}
                          onChange={e => {
                            const val = e.target.value;
                            setAdminPuzzles(prev =>
                              prev.map((item, idx) =>
                                idx === pIdx ? { ...item, imageUrl: val } : item
                              )
                            );
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-0.5"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400">Nội dung câu hỏi:</label>
                      <input
                        type="text"
                        value={puz.question}
                        onChange={e => {
                          const val = e.target.value;
                          setAdminPuzzles(prev =>
                            prev.map((item, idx) =>
                              idx === pIdx ? { ...item, question: val } : item
                            )
                          );
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white mt-0.5"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-amber-300 font-bold">3 Tầng gợi ý:</label>
                      <input
                        type="text"
                        placeholder="Gợi ý 1: Tổng quát"
                        value={puz.hints[0] || ''}
                        onChange={e => {
                          const val = e.target.value;
                          setAdminPuzzles(prev =>
                            prev.map((item, idx) =>
                              idx === pIdx
                                ? { ...item, hints: [val, item.hints[1], item.hints[2]] }
                                : item
                            )
                          );
                        }}
                        className="w-full px-2 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Gợi ý 2: Đặc điểm"
                        value={puz.hints[1] || ''}
                        onChange={e => {
                          const val = e.target.value;
                          setAdminPuzzles(prev =>
                            prev.map((item, idx) =>
                              idx === pIdx
                                ? { ...item, hints: [item.hints[0], val, item.hints[2]] }
                                : item
                            )
                          );
                        }}
                        className="w-full px-2 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Gợi ý 3: Quyết định"
                        value={puz.hints[2] || ''}
                        onChange={e => {
                          const val = e.target.value;
                          setAdminPuzzles(prev =>
                            prev.map((item, idx) =>
                              idx === pIdx
                                ? { ...item, hints: [item.hints[0], item.hints[1], val] }
                                : item
                            )
                          );
                        }}
                        className="w-full px-2 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <button
                  onClick={() => {
                    const newP: ImagePuzzle = {
                      id: `puz_custom_${Date.now()}`,
                      title: 'Câu đố hình ảnh mới',
                      imageUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80',
                      imageAlt: 'Hình ảnh minh họa',
                      grade: 6,
                      targetClass: '6A5',
                      subject: 'Tổng hợp',
                      question: 'Quan sát bức ảnh và cho biết đây là hiện vật gì?',
                      options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
                      correctAnswer: 0,
                      hints: ['Gợi ý 1: Tổng quát', 'Gợi ý 2: Đặc điểm', 'Gợi ý 3: Quyết định'],
                      synonyms: ['dap an a', 'dapan a'],
                      points: 30,
                      explanation: 'Giải thích chi tiết về hiện vật...'
                    };
                    setAdminPuzzles(prev => [newP, ...prev]);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Thêm câu đố</span>
                </button>

                <button
                  onClick={handleSaveTeacherAdmin}
                  className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/30"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu tất cả thay đổi</span>
                </button>
              </div>
            </div>
          ) : isFinished ? (
            /* FINISHED SUMMARY SCREEN */
            <div className="text-center space-y-5 py-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/20">
                ⭐
              </div>

              <div>
                <h2 className="text-2xl font-black text-white">Xuất Sắc Giải Đố!</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Khả năng quan sát và đối chiếu tri thức thực tiễn của bạn rất tuyệt vời.
                </p>
              </div>

              <div className="max-w-xs mx-auto p-4 rounded-2xl bg-slate-950/80 border border-amber-500/40 text-center space-y-1">
                <span className="text-xs text-slate-400">Tổng điểm tích lũy:</span>
                <div className="text-3xl font-black text-amber-400">+{totalScore} RP</div>
                <div className="text-[11px] text-amber-300/80">
                  Đã đồng bộ vào thành tích chiến binh !
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Chơi lại từ đầu</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg shadow-amber-500/30"
                >
                  Đóng trò chơi
                </button>
              </div>
            </div>
          ) : (
            /* PUZZLE SOLVING SCREEN */
            <div className="space-y-4">
              {/* Image Box with Fullscreen Zoom Trigger */}
              <div className="relative group rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-950 aspect-video max-h-72 w-full mx-auto shadow-xl">
                <img
                  src={currentPuzzle.imageUrl}
                  alt={currentPuzzle.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700 text-amber-300 text-[11px] font-bold">
                    {currentPuzzle.subject}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-indigo-950/80 backdrop-blur-md border border-indigo-500/40 text-indigo-300 text-[10px] font-bold">
                    Khối {currentPuzzle.grade} {currentPuzzle.targetClass ? `· ${currentPuzzle.targetClass}` : ''}
                  </span>
                </div>

                {/* Fullscreen Zoom Button */}
                <button
                  onClick={() => {
                    setZoomLevel(1);
                    setIsZoomOpen(true);
                  }}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-slate-700 backdrop-blur-md text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-lg transition-transform active:scale-95"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Phóng to quan sát</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-amber-400 uppercase tracking-wider">
                    {currentPuzzle.title}
                  </span>
                  <span className="text-slate-400 font-medium">
                    Giá trị: <span className="text-emerald-400 font-bold">+{currentPuzzle.points} RP</span>
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  {currentPuzzle.question}
                </h3>
              </div>

              {/* 3 Hint Tiers Accordion */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>3 Tầng Gợi Ý Tiến Trình ({revealedHints}/3)</span>
                  </div>

                  {revealedHints < currentPuzzle.hints.length && !isAnswered && (
                    <button
                      onClick={handleRevealHint}
                      className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-[11px] font-bold text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Mở Gợi ý {revealedHints + 1} (-5 RP)</span>
                    </button>
                  )}
                </div>

                {/* Hints Revealed List */}
                {revealedHints > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {currentPuzzle.hints.slice(0, revealedHints).map((hint, hIdx) => (
                      <div
                        key={hIdx}
                        className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 leading-relaxed animate-fade-in"
                      >
                        {hint}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 4 Multiple Choice Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentPuzzle.options.map((opt, idx) => {
                  let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (isAnswered) {
                    if (idx === currentPuzzle.correctAnswer) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                    } else {
                      btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleAnswerOption(idx)}
                      className={`p-3 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="pt-0.5">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Direct Typing Input Box (Alternative Mode) */}
              {!isAnswered && (
                <form onSubmit={handleAnswerSubmit} className="pt-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập tên đối tượng / hiện vật (không cần dấu)..."
                    value={typedAnswer}
                    onChange={e => setTypedAnswer(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    disabled={!typedAnswer.trim()}
                    className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Đoán</span>
                  </button>
                </form>
              )}

              {/* Explanation & Next Trigger */}
              {isAnswered && (
                <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2 animate-fade-in">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Tri thức giải mã:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentPuzzle.explanation}
                  </p>

                  <button
                    onClick={handleNext}
                    className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer shadow-md ml-auto"
                  >
                    <span>Câu đố tiếp theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FULLSCREEN ZOOM LIGHTBOX MODAL */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 animate-fade-in">
          {/* Top Control Bar */}
          <div className="w-full max-w-5xl flex items-center justify-between pb-3 border-b border-slate-800 text-white">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="font-black text-sm text-white">{currentPuzzle.title}</h4>
                <p className="text-[11px] text-slate-400">{currentPuzzle.imageAlt}</p>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.2))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                title="Thu nhỏ"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="px-2.5 py-1 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
                title="Kích thước gốc"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                title="Phóng to"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="p-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/50 text-white cursor-pointer ml-2"
                title="Đóng kính lúp"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Central Zoomed Image Area */}
          <div className="flex-1 w-full max-w-5xl flex items-center justify-center overflow-auto p-4">
            <img
              src={currentPuzzle.imageUrl}
              alt={currentPuzzle.imageAlt}
              style={{
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.2s ease-out'
              }}
              className="max-h-[75vh] max-w-full rounded-2xl shadow-2xl object-contain border border-slate-800 select-none cursor-grab active:cursor-grabbing"
            />
          </div>

          {/* Bottom Caption */}
          <div className="w-full max-w-2xl py-2 px-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center text-xs text-slate-300">
            Kéo thả hoặc dùng các nút phóng to để quan sát từng chi tiết nhỏ phục vụ trả lời câu đố.
          </div>
        </div>
      )}
    </div>
  );
};

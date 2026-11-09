import React, { useState } from 'react';
import { X, Brain, Sparkles, Check, ArrowRight, Zap, Trophy, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { selectAndShuffleGameQuestions } from '../../utils/gameQuestionHelper';

interface IQChallengeModalProps {
  onClose: () => void;
  onAddScore?: (points: number, txId?: string, gameType?: string, details?: string) => void;
}

interface IQQuestionItem {
  id: string;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const IQ_QUESTIONS_BANK: IQQuestionItem[] = [
  {
    id: 'iq_1',
    title: 'Quy Luật Dãy Số Fibonacci Mở Rộng',
    question: 'Tìm số tiếp theo trong dãy số sau: 2, 3, 5, 8, 13, 21, ?',
    options: ['34', '28', '32', '35'],
    correctIndex: 0,
    explanation: 'Đây là dãy Fibonacci: Mỗi số bằng tổng 2 số liền trước nó (13 + 21 = 34).'
  },
  {
    id: 'iq_2',
    title: 'Tư Duy Logic Hình Học',
    question: 'Một hình lập phương có tất cả bao nhiêu cạnh và bao nhiêu đỉnh?',
    options: ['12 cạnh và 8 đỉnh', '8 cạnh và 12 đỉnh', '6 cạnh và 8 đỉnh', '10 cạnh và 6 đỉnh'],
    correctIndex: 0,
    explanation: 'Hình lập phương có 6 mặt bằng nhau, 12 cạnh và 8 đỉnh.'
  },
  {
    id: 'iq_3',
    title: 'Quy Luật Biến Đổi Ký Hiệu',
    question: 'Nếu 1 = 5, 2 = 25, 3 = 125, 4 = 625 thì 5 = ?',
    options: ['1', '3125', '2500', '15625'],
    correctIndex: 0,
    explanation: 'Dựa vào tiền đề ban đầu đã khẳng định: "1 = 5", do đó theo tính chất bắc cầu: 5 = 1!'
  },
  {
    id: 'iq_4',
    title: 'Tư Duy Tốc Độ & Thời Gian',
    question: 'Nếu 5 con mèo bắt được 5 con chuột trong 5 phút, thì cần bao nhiêu con mèo để bắt được 100 con chuột trong 100 phút?',
    options: ['5 con mèo', '100 con mèo', '20 con mèo', '50 con mèo'],
    correctIndex: 0,
    explanation: '5 con mèo bắt 5 chuột trong 5 phút => Trung bình 5 con mèo bắt 1 chuột/phút. Trong 100 phút, 5 con mèo đó bắt được đúng 100 con chuột.'
  },
  {
    id: 'iq_5',
    title: 'Quy Luật Bậc Lũy Thừa',
    question: 'Số tiếp theo trong dãy số: 1, 8, 27, 64, 125, ? là số nào?',
    options: ['216', '196', '256', '343'],
    correctIndex: 0,
    explanation: 'Dãy số lập phương: 1^3 = 1, 2^3 = 8, 3^3 = 27, 4^3 = 64, 5^3 = 125, 6^3 = 216.'
  },
  {
    id: 'iq_6',
    title: 'Quan Hệ Tuổi Tác & Logic Gia Đình',
    question: 'Một người đàn ông chỉ vào bức ảnh và nói: "Tôi không có anh chị em nào, nhưng cha của người đàn ông này là con trai của cha tôi." Người trong ảnh là ai?',
    options: ['Con trai của người đàn ông', 'Chính người đàn ông', 'Cha của người đàn ông', 'Cháu trai của người đàn ông'],
    correctIndex: 0,
    explanation: '"Con trai của cha tôi" khi không có anh chị em chính là bản thân tôi. Vậy cha người trong ảnh là tôi => người trong ảnh là con trai tôi.'
  },
  {
    id: 'iq_7',
    title: 'Quy Luật Cắt Bánh Sinh Nhật',
    question: 'Bằng 3 nhát cắt thẳng hoàn toàn, số phần bánh tối đa có thể chia được từ một chiếc bánh hình tròn là bao nhiêu?',
    options: ['7 phần', '6 phần', '8 phần', '9 phần'],
    correctIndex: 0,
    explanation: 'Số phần tối đa với n nhát cắt 2D là (n^2 + n + 2)/2. Với n = 3: (9 + 3 + 2)/2 = 7 phần.'
  },
  {
    id: 'iq_8',
    title: 'Suy Luận Logic Cân Đĩa',
    question: 'Có 9 viên bi bề ngoài giống hệt nhau, trong đó có 1 viên nhẹ hơn các viên còn lại. Dùng cân đĩa thăng bằng, cần tối thiểu bao nhiêu lần cân để chắc chắn tìm ra viên bi nhẹ?',
    options: ['2 lần cân', '3 lần cân', '4 lần cân', '1 lần cân'],
    correctIndex: 0,
    explanation: 'Chia làm 3 nhóm (3-3-3). Lần 1: Cân 2 nhóm 3 viên. Lần 2: Lấy nhóm chứa viên nhẹ chia 1-1-1 rồi cân 2 viên. Chỉ cần đúng 2 lần cân.'
  },
  {
    id: 'iq_9',
    title: 'Chuỗi Ký Tự Thứ Tự',
    question: 'Chữ cái tiếp theo trong chuỗi sau là gì: M, H, B, B, T, ? (Gợi ý: Các ngón trên một bàn tay)',
    options: ['U (Út)', 'N (Ngón)', 'G (Giữa)', 'C (Cái)'],
    correctIndex: 0,
    explanation: 'Các ngón tay: Cái, Trỏ, Giữa, Áp út, Út. Hoặc các thứ: Hai, Ba, Bốn, Năm, Sáu, Bảy, CN.'
  },
  {
    id: 'iq_10',
    title: 'Tư Duy Bánh Răng Truyền Động',
    question: 'Ba bánh răng A, B, C ăn khớp nối tiếp nhau (A nối B, B nối C). Nếu bánh răng A quay theo chiều kim đồng hồ thì bánh răng C quay theo chiều nào?',
    options: ['Cùng chiều kim đồng hồ', 'Ngược chiều kim đồng hồ', 'Đứng yên không quay', 'Lắc qua lại'],
    correctIndex: 0,
    explanation: 'A quay thuận => B quay ngược => C quay thuận chiều kim đồng hồ.'
  },
  {
    id: 'iq_11',
    title: 'Đố Mẹo Tư Duy Trực Quan',
    question: 'Bác nông dân có 17 con cừu. Tất cả trừ 9 con bị chạy mất vào rừng. Hỏi bác nông dân còn lại bao nhiêu con cừu?',
    options: ['9 con cừu', '8 con cừu', '17 con cừu', '0 con cừu'],
    correctIndex: 0,
    explanation: 'Câu nói rõ: "Tất cả trừ 9 con bị chạy mất", nghĩa là giữ lại được đúng 9 con cừu.'
  },
  {
    id: 'iq_12',
    title: 'Quy Luật Đồng Hồ Kim',
    question: 'Trong một ngày đêm (24 giờ), kim giờ và kim phút của đồng hồ trùng nhau chính xác bao nhiêu lần?',
    options: ['22 lần', '24 lần', '23 lần', '12 lần'],
    correctIndex: 0,
    explanation: 'Trong 12 giờ, hai kim trùng nhau 11 lần (ở giờ thứ 11 và 12 gộp lại tại vị trí 12h). Do đó trong 24 giờ trùng nhau đúng 22 lần.'
  }
];

export const IQChallengeModal: React.FC<IQChallengeModalProps> = ({ onClose, onAddScore }) => {
  const [recentlyUsedIds, setRecentlyUsedIds] = useState<Set<string | number>>(() => new Set());
  const [questions, setQuestions] = useState<IQQuestionItem[]>(() => {
    const res = selectAndShuffleGameQuestions(IQ_QUESTIONS_BANK, 4);
    return res.questions;
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const safeIdx = Math.min(currentIdx, questions.length - 1);
  const q = questions[safeIdx] || questions[0];

  const handleSelect = (idx: number) => {
    if (isAnswered || isFinished) return;
    setSelectedIdx(idx);
    setIsAnswered(true);
    if (idx === q.correctIndex) {
      setScore(prev => prev + 120);
      try {
        confetti({ particleCount: 50, spread: 50 });
      } catch {}
      if (onAddScore) {
        const txId = `tx_iq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        onAddScore(120, txId, 'Thử thách IQ', `Trả lời chính xác câu hỏi tư duy logic: "${q.title}"`);
      }
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      try {
        confetti({ particleCount: 100, spread: 70 });
      } catch {}
    }
  };

  const handleRestart = () => {
    const { questions: newQ, usedIds } = selectAndShuffleGameQuestions(IQ_QUESTIONS_BANK, 4, recentlyUsedIds);
    setRecentlyUsedIds(usedIds);
    setQuestions(newQ);
    setCurrentIdx(0);
    setScore(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border-2 border-indigo-500/40 text-white shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] animate-scaleUp">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg text-2xl">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Thử Thách IQ · Tư Duy Đỉnh Cao
                </span>
                <span className="text-xs text-amber-400 font-bold font-mono">Điểm: {score} pts</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                {isFinished
                  ? '🎉 Hoàn Thành Xuất Sắc Lượt Thử Thách!'
                  : `Câu ${currentIdx + 1} / ${questions.length}: ${q.title}`}
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

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {isFinished ? (
            <div className="p-6 rounded-3xl bg-slate-950 border border-purple-500/30 text-center space-y-5 animate-scaleUp">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto text-3xl shadow-xl">
                🏆
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">Trí Tuệ Sáng Ngời!</h3>
                <p className="text-sm text-slate-300">
                  Bạn đã xuất sắc vượt qua cả 4 câu đố logic đỉnh cao với tổng điểm đạt được là:
                </p>
                <div className="text-3xl font-black text-amber-400 font-mono">
                  {score} IQ Points
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Chơi lại lượt mới</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white leading-relaxed">
                {q.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {q.options.map((opt, i) => {
                  const isSelected = selectedIdx === i;
                  const isCorrect = i === q.correctIndex;

                  let style = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';
                  if (isAnswered) {
                    if (isCorrect) {
                      style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                    } else if (isSelected) {
                      style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    } else {
                      style = 'bg-slate-900/50 border-slate-800/50 text-slate-600';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={isAnswered}
                      onClick={() => handleSelect(i)}
                      className={`p-4 rounded-2xl text-left border-2 font-medium text-sm transition-all cursor-pointer flex items-center gap-3 ${style}`}
                    >
                      <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 font-bold">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">
                      {selectedIdx === q.correctIndex ? '✓ Đúng chuẩn! +120 IQ Point!' : '✗ Chưa đúng! Xem giải thích bên dưới:'}
                    </span>
                    <button
                      onClick={handleNext}
                      className="py-1 px-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{currentIdx < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { X, Flag, Zap, ArrowRight, Trophy, Flame, RotateCcw } from 'lucide-react';
import { selectAndShuffleGameQuestions } from '../../utils/gameQuestionHelper';

interface KnowledgeRaceModalProps {
  onClose: () => void;
  onAddScore?: (points: number, txId?: string, gameType?: string, details?: string) => void;
}

interface RaceQuestionItem {
  id: string;
  question: string;
  options: string[];
  correct: number;
  hint: string;
}

// Ngân hàng câu hỏi liên môn đa dạng dành cho Đường Đua Tri Thức
const RACE_QUESTIONS_BANK: RaceQuestionItem[] = [
  {
    id: 'race_q1',
    question: 'Ai là người chỉ huy tổ xung kích cắm ngọn cờ chiến thắng trên nóc hầm Đờ Cát trong chiến dịch Điện Biên Phủ năm 1954?',
    options: ['Tạ Quốc Luật', 'La Văn Cầu', 'Cù Chính Lan', 'Phan Đình Giót'],
    correct: 0,
    hint: 'Đại đội trưởng Tạ Quốc Luật dẫn đầu tổ xung kích bắt sống tướng Đờ Cát.'
  },
  {
    id: 'race_q2',
    question: 'Công thức hóa học của muối ăn thông thường hàng ngày là gì?',
    options: ['NaCl', 'KCl', 'CaCl2', 'MgCl2'],
    correct: 0,
    hint: 'Natri Clorua (NaCl).'
  },
  {
    id: 'race_q3',
    question: 'Bộ phận nào trong máy tính được ví như "bộ não" điều khiển mọi hoạt động xử lý dữ liệu?',
    options: ['CPU (Central Processing Unit)', 'RAM', 'Ổ cứng SSD', 'Bộ nguồn PSU'],
    correct: 0,
    hint: 'CPU thực hiện các phép toán và chỉ lệnh điều hành toàn bộ hệ thống.'
  },
  {
    id: 'race_q4',
    question: 'Số nguyên tố nhỏ nhất trong tập hợp các số tự nhiên là số nào?',
    options: ['Số 2', 'Số 1', 'Số 3', 'Số 0'],
    correct: 0,
    hint: 'Số 2 là số nguyên tố chẵn duy nhất và là số nguyên tố nhỏ nhất.'
  },
  {
    id: 'race_q5',
    question: 'Tỉnh nào nằm ở cực Nam của dải đất hình chữ S Việt Nam?',
    options: ['Cà Mau', 'Bạc Liêu', 'Kiên Giang', 'An Giang'],
    correct: 0,
    hint: 'Mũi Cà Mau, nơi cuối trời Tổ quốc.'
  },
  {
    id: 'race_q6',
    question: 'Trong hệ Mặt Trời, hành tinh nào nằm gần Mặt Trời nhất?',
    options: ['Sao Thủy (Mercury)', 'Sao Kim (Venus)', 'Trái Đất (Earth)', 'Sao Hỏa (Mars)'],
    correct: 0,
    hint: 'Sao Thủy là hành tinh đầu tiên tính từ Mặt Trời.'
  },
  {
    id: 'race_q7',
    question: 'Tác phẩm văn học dân gian nào kể về nguồn gốc giống nòi con Rồng cháu Tiên của dân tộc Việt Nam?',
    options: ['Con Rồng cháu Tiên', 'Bánh chưng bánh giầy', 'Thánh Gióng', 'Sơn Tinh Thủy Tinh'],
    correct: 0,
    hint: 'Truyền thuyết Lạc Long Quân và Âu Cơ sinh ra bọc trăm trứng.'
  },
  {
    id: 'race_q8',
    question: 'Khí nào chiếm tỉ lệ thể tích lớn nhất (khoảng 78%) trong không khí bao quanh Trái Đất?',
    options: ['Khí Nitrogen (Nitơ)', 'Khí Oxygen (Oxi)', 'Khí Carbon dioxide (Cacbonic)', 'Hơi nước'],
    correct: 0,
    hint: 'Khí Nitơ chiếm gần 4/5 thể tích khí quyển.'
  },
  {
    id: 'race_q9',
    question: 'Trong tin học, 1 Byte (B) bằng bao nhiêu bit (b)?',
    options: ['8 bit', '10 bit', '16 bit', '1024 bit'],
    correct: 0,
    hint: '1 Byte tiêu chuẩn gồm đúng 8 bit nhị phân 0 hoặc 1.'
  },
  {
    id: 'race_q10',
    question: 'Tổng ba góc trong của một tam giác bất kỳ trong hình học phẳng luôn bằng bao nhiêu độ?',
    options: ['180 độ', '90 độ', '360 độ', '270 độ'],
    correct: 0,
    hint: 'Định lý tổng ba góc trong một tam giác luôn bằng 180°.'
  },
  {
    id: 'race_q11',
    question: 'Ai là tác giả của Quốc ca nước Cộng hòa Xã hội Chủ nghĩa Việt Nam (bài hát Tiến quân ca)?',
    options: ['Nhạc sĩ Văn Cao', 'Nhạc sĩ Lưu Hữu Phước', 'Nhạc sĩ Phong Nhã', 'Nhạc sĩ Trịnh Công Sơn'],
    correct: 0,
    hint: 'Nhạc sĩ Văn Cao sáng tác Tiến quân ca vào năm 1944.'
  },
  {
    id: 'race_q12',
    question: 'Ngọn núi nào được mệnh danh là "nóc nhà Đông Dương" với độ cao 3.143 mét?',
    options: ['Đỉnh Fansipan', 'Đỉnh Mẫu Sơn', 'Đỉnh Bạch Mộc Lương Tử', 'Đỉnh Tây Côn Lĩnh'],
    correct: 0,
    hint: 'Fansipan nằm trên dãy Hoàng Liên Sơn, tỉnh Lào Cai.'
  },
  {
    id: 'race_q13',
    question: 'Quá trình quang hợp của cây xanh chủ yếu hấp thụ khí gì và giải phóng khí gì ra môi trường?',
    options: ['Hấp thụ CO2 và thải ra O2', 'Hấp thụ O2 và thải ra CO2', 'Hấp thụ N2 và thải ra O2', 'Hấp thụ CO2 và thải ra N2'],
    correct: 0,
    hint: 'Quang hợp hấp thụ khí Carbonic (CO2) và tạo ra khí Oxi (O2) dưới ánh sáng mặt trời.'
  },
  {
    id: 'race_q14',
    question: 'Dòng sông nào dài nhất thế giới chảy qua khu vực Đông Bắc châu Phi?',
    options: ['Sông Nin (Nile)', 'Sông Amazon', 'Sông Dương Tử (Trường Giang)', 'Sông Mississippi'],
    correct: 0,
    hint: 'Sông Nin dài khoảng 6.650 km gắn liền với nền văn minh Ai Cập cổ đại.'
  },
  {
    id: 'race_q15',
    question: 'Chiến thắng Bạch Đằng năm 938 do vị anh hùng dân tộc nào lãnh đạo đã chấm dứt hơn 1000 năm Bắc thuộc?',
    options: ['Ngô Quyền', 'Lê Hoàn', 'Trần Hưng Đạo', 'Đinh Bộ Lĩnh'],
    correct: 0,
    hint: 'Ngô Quyền dùng kế cắm cọc gỗ bịt sắt trên sông Bạch Đằng đánh tan quân Nam Hán.'
  },
  {
    id: 'race_q16',
    question: 'Đơn vị đo độ dài chuẩn trong hệ thống đo lường quốc tế (SI) là gì?',
    options: ['Mét (m)', 'Centimét (cm)', 'Milimét (mm)', 'Kilômét (km)'],
    correct: 0,
    hint: 'Ký hiệu là m (mét).'
  },
  {
    id: 'race_q17',
    question: 'Thiết bị nào sau đây là thiết bị vào (Input) của máy tính?',
    options: ['Bàn phím và chuột', 'Màn hình máy tính', 'Máy in laser', 'Loa âm thanh'],
    correct: 0,
    hint: 'Bàn phím và chuột dùng để nhập dữ liệu và chỉ lệnh vào máy tính.'
  },
  {
    id: 'race_q18',
    question: 'Trong câu văn "Mặt trời đội biển nhô màu mới", tác giả sử dụng biện pháp tu từ gì?',
    options: ['Nhân hóa', 'So sánh', 'Nói quá', 'Hoán dụ'],
    correct: 0,
    hint: 'Hành động "đội biển" gán cho mặt trời là phép nhân hóa sinh động.'
  },
  {
    id: 'race_q19',
    question: 'Tam giác đều là tam giác có đặc điểm nào sau đây?',
    options: ['Ba cạnh bằng nhau và ba góc bằng 60 độ', 'Có một góc vuông', 'Có hai cạnh bằng nhau', 'Ba cạnh có độ dài khác nhau'],
    correct: 0,
    hint: 'Tam giác đều có 3 cạnh bằng nhau và 3 góc bằng nhau = 60°.'
  },
  {
    id: 'race_q20',
    question: 'Bộ phận nào của cơ thể người làm nhiệm vụ bơm và lưu thông máu đi khắp cơ thể?',
    options: ['Trái tim', 'Lá phổi', 'Dạ dày', 'Bộ não'],
    correct: 0,
    hint: 'Tim co bóp nhịp nhàng như chiếc máy bơm sinh học kỳ diệu.'
  },
  {
    id: 'race_q21',
    question: 'Văn Miếu - Quốc Tử Giám, trường đại học đầu tiên của Việt Nam, được xây dựng dưới triều đại nào?',
    options: ['Triều Lý', 'Triều Trần', 'Triều Lê sơ', 'Triều Nguyễn'],
    correct: 0,
    hint: 'Văn Miếu xây năm 1070, Quốc Tử Giám xây năm 1076 dưới thời vua Lý Thánh Tông và Lý Nhân Tông.'
  },
  {
    id: 'race_q22',
    question: 'Đơn vị tiền tệ chính thức của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam là gì?',
    options: ['Đồng (VND)', 'Đô la (USD)', 'Nhân dân tệ (CNY)', 'Yên (JPY)'],
    correct: 0,
    hint: 'Đồng Việt Nam (ký hiệu: ₫ hoặc VND).'
  },
  {
    id: 'race_q23',
    question: 'Trong phần mềm bảng tính Excel, hàm nào dùng để tính trung bình cộng của một dải số?',
    options: ['AVERAGE', 'SUM', 'COUNT', 'MAX'],
    correct: 0,
    hint: 'Hàm AVERAGE(number1, number2, ...).'
  },
  {
    id: 'race_q24',
    question: 'Môn thể thao nào được mệnh danh là "Môn thể thao vua" trên toàn thế giới?',
    options: ['Bóng đá', 'Bóng rổ', 'Cầu lông', 'Bơi lội'],
    correct: 0,
    hint: 'Môn bóng đá thu hút hàng tỉ người theo dõi trên khắp hành tinh.'
  },
  {
    id: 'race_q25',
    question: 'Động vật nào sau đây thuộc lớp bò sát?',
    options: ['Cá sấu', 'Cá heo', 'Chim cánh cụt', 'Ếch đồng'],
    correct: 0,
    hint: 'Cá sấu là động vật biến nhiệt thuộc lớp bò sát.'
  }
];

export const KnowledgeRaceModal: React.FC<KnowledgeRaceModalProps> = ({ onClose, onAddScore }) => {
  const [sessionQuestions, setSessionQuestions] = useState<RaceQuestionItem[]>([]);
  const [position, setPosition] = useState(0); // 0 to 5
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [speedScore, setSpeedScore] = useState(0);

  // Lưu các câu hỏi đã xuất hiện ở lượt trước để tránh lặp lại
  const usedQuestionIdsRef = useRef<Set<string | number>>(new Set());

  // Khởi tạo vòng đua mới với 5 câu hỏi ngẫu nhiên và đáp án được xáo trộn cân bằng
  const initRaceRound = () => {
    const { questions, usedIds } = selectAndShuffleGameQuestions(
      RACE_QUESTIONS_BANK,
      5,
      usedQuestionIdsRef.current
    );
    usedQuestionIdsRef.current = usedIds;
    setSessionQuestions(questions);
    setPosition(0);
    setSelectedIdx(null);
    setHasAnswered(false);
  };

  useEffect(() => {
    initRaceRound();
  }, []);

  const totalSteps = sessionQuestions.length || 5;
  const safePos = Math.min(position, Math.max(0, totalSteps - 1));
  const currentQ = sessionQuestions[safePos] || RACE_QUESTIONS_BANK[0];
  const isFinished = position >= totalSteps;

  const handleSelect = (idx: number) => {
    if (hasAnswered) return;
    setSelectedIdx(idx);
    setHasAnswered(true);

    if (idx === currentQ.correct) {
      setSpeedScore(prev => prev + 150);
      if (onAddScore) {
        const txId = `tx_race_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        onAddScore(150, txId, 'Đường đua tri thức', `Bứt tốc thành công câu hỏi #${position + 1}`);
      }
    }
  };

  const handleNext = () => {
    setPosition(prev => prev + 1);
    setSelectedIdx(null);
    setHasAnswered(false);
  };

  const handleRestart = () => {
    initRaceRound();
    setSpeedScore(0);
  };

  const pct = Math.min(100, Math.round((position / totalSteps) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border-2 border-indigo-500/40 text-white shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] animate-scaleUp">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-orange-950 via-slate-900 to-amber-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg text-2xl">
              🏎️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  Đường Đua Tri Thức · Tăng Tốc
                </span>
                <span className="text-xs text-amber-400 font-bold font-mono">Điểm tốc độ: {speedScore}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                Chặng Đua Về Đích (Chặng {Math.min(position + 1, totalSteps)}/{totalSteps})
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

        {/* Track visualization */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 space-y-2 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="flex items-center gap-1.5 text-orange-400">
              <Zap className="w-4 h-4" /> Vị trí trên đường đua:
            </span>
            <span className="font-mono text-white">{pct}% Hoàn thành</span>
          </div>
          <div className="relative w-full h-4 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Question & Racing Action */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {!isFinished ? (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Thử thách bứt tốc #{position + 1}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Đáp án ngẫu nhiên A, B, C, D
                </span>
              </div>
              <h3 className="text-lg font-bold text-white leading-relaxed">
                {currentQ.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedIdx === i;
                  const isCorrect = i === currentQ.correct;

                  let style = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';
                  if (hasAnswered) {
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
                      disabled={hasAnswered}
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

              {hasAnswered && (
                <div className="p-4 rounded-2xl bg-orange-950/40 border border-orange-500/30 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-bold text-amber-300">
                      {selectedIdx === currentQ.correct ? '✓ Tăng tốc thành công! +150 điểm!' : '✗ Giảm tốc độ! Xem thông tin bổ trợ bên dưới:'}
                    </span>
                    <button
                      onClick={handleNext}
                      className="py-1 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Tiến về phía trước</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentQ.hint}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 space-y-4 max-w-md mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center mx-auto shadow-2xl">
                <Trophy className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white">CÁN ĐÍCH XUẤT SẮC!</h3>
              <p className="text-xs text-slate-300">
                Bạn đã hoàn thành đường đua tri thức với tổng điểm: <strong className="text-amber-400 font-mono text-base">+{speedScore} điểm</strong>!
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Chơi lại lượt mới</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  Quay lại
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

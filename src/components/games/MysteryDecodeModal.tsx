import React, { useState } from 'react';
import { X, Key, Search, Sparkles, Check, ArrowRight, Trophy, RefreshCw } from 'lucide-react';

interface MysteryDecodeModalProps {
  onClose: () => void;
  onAddScore?: (points: number, txId?: string, gameType?: string, details?: string) => void;
}

const MYSTERIES = [
  {
    id: 1,
    type: 'Mật Thư Caesar',
    title: 'Mật Mã Cổ Xưa Khối 6',
    clue: 'Dịch chuyển mỗi chữ cái lùi lại 3 vị trí trong bảng chữ cái tiếng Anh:',
    cipher: 'LQWHUQHW',
    hint: 'Mạng máy tính toàn cầu kết nối thế giới (I-N-T-E-R-N-E-T)',
    answer: 'INTERNET',
    explanation: 'LQWHUQHW qua phép dịch chuyển ngược Caesar 3 bước chính là INTERNET.'
  },
  {
    id: 2,
    type: 'Tìm Từ Khóa',
    title: 'Ẩn Số Khoa Học Tự Nhiên',
    clue: 'Chất khí không màu, không mùi, chiếm khoảng 21% thể tích không khí và duy trì sự sống của sinh vật:',
    cipher: 'O _ Y G _ N',
    hint: 'Nguyên tố hóa học có ký hiệu là O',
    answer: 'OXYGEN',
    explanation: 'Oxygen (Oxi) là khí tối quan trọng cho quá trình hô hấp và đốt cháy.'
  },
  {
    id: 3,
    type: 'Giải Mã Nhị Phân',
    title: 'Mật Mã Nhị Phân 8-Bit Tin Học',
    clue: 'Mã nhị phân 01000001 trong bảng mã ASCII tương ứng với chữ cái nào?',
    cipher: '01000001 (Base 2) = 65 (Base 10)',
    hint: 'Chữ cái đầu tiên trong bảng chữ cái',
    answer: 'A',
    explanation: 'Số 65 trong bảng mã ASCII tiêu chuẩn đại diện cho chữ cái A in hoa.'
  }
];

export const MysteryDecodeModal: React.FC<MysteryDecodeModalProps> = ({ onClose, onAddScore }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [isResolved, setIsResolved] = useState(false);
  const [score, setScore] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const mystery = MYSTERIES[currentIndex];

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanInput = inputVal.trim().toUpperCase();
    if (cleanInput === mystery.answer.toUpperCase()) {
      setIsResolved(true);
      setScore(prev => prev + 100);
      if (onAddScore) {
        const txId = `tx_mystery_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        onAddScore(100, txId, 'Giải mã bí ẩn', `Giải mã thành công mật thư: "${mystery.title}"`);
      }
    } else {
      setErrorMsg('Mật mã chưa chính xác! Hãy đọc kỹ gợi ý và thử lại.');
    }
  };

  const handleNext = () => {
    if (currentIndex < MYSTERIES.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInputVal('');
      setIsResolved(false);
      setErrorMsg('');
    } else {
      // Completed all
      setIsResolved(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border-2 border-indigo-500/40 text-white shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] animate-scaleUp">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg text-2xl">
              🔍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Giải Mã Bí Ẩn · Mật Thư Tri Thức
                </span>
                <span className="text-xs text-amber-400 font-bold font-mono">Điểm: {score} pts</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                {mystery.title} ({currentIndex + 1}/{MYSTERIES.length})
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

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase">
              <Key className="w-3.5 h-3.5" /> {mystery.type}
            </div>
            <p className="text-sm text-slate-300 font-medium">{mystery.clue}</p>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 text-center">
              <div className="text-xs text-slate-500 font-semibold mb-1">Chuỗi mật mã cần giải:</div>
              <div className="text-2xl font-black text-amber-400 font-mono tracking-widest">{mystery.cipher}</div>
            </div>

            <p className="text-xs text-slate-400 italic">
              💡 Gợi ý tư duy: {mystery.hint}
            </p>
          </div>

          <form onSubmit={handleCheck} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Nhập đáp án giải mã:
              </label>
              <input
                type="text"
                disabled={isResolved}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                placeholder="Nhập từ khóa đã giải mã..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-base text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono uppercase font-bold"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold">
                {errorMsg}
              </div>
            )}

            {!isResolved ? (
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                Xác Nhận Giải Mã
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Check className="w-5 h-5" /> CHÍNH XÁC! Bạn nhận được +100 điểm thưởng!
                </div>
                <p className="text-xs text-slate-300">{mystery.explanation}</p>
                {currentIndex < MYSTERIES.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Mật thư tiếp theo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="text-center pt-2">
                    <div className="text-amber-400 font-black text-base">CHÚC MỪNG BẠN ĐÃ PHÁ ĐẢO TOÀN BỘ MẬT THƯ!</div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Hoàn thành
                    </button>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

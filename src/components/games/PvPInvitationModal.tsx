import React, { useState, useEffect } from 'react';
import { Swords, Check, X, ShieldAlert, Sparkles, Clock } from 'lucide-react';
import { PvPInviteData } from '../../services/realtimeService';

interface PvPInvitationModalProps {
  invite: PvPInviteData | null;
  onAccept: (invite: PvPInviteData) => void;
  onDecline: (invite: PvPInviteData) => void;
}

export const PvPInvitationModal: React.FC<PvPInvitationModalProps> = ({
  invite,
  onAccept,
  onDecline
}) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!invite) return;
    setTimeLeft(30);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onDecline(invite);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [invite]);

  if (!invite) return null;

  const pct = (timeLeft / 30) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950 border-2 border-indigo-500/50 shadow-2xl p-6 text-white overflow-hidden animate-scaleUp">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-xl shadow-rose-500/30 animate-bounce">
            <Swords className="w-8 h-8" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thách Đấu PVP 1V1</span>
            </div>
            <h3 className="text-xl font-black text-white">
              Bạn Nhận Được Lời Thách Đấu!
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Học sinh <strong className="text-amber-400 font-extrabold">{invite.challenger.displayName}</strong> ({invite.challenger.className} · Khối {invite.challenger.grade}) muốn so tài kiến thức Best of 5 với bạn.
            </p>
          </div>

          {/* Time Remaining Bar */}
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1 text-amber-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Thời gian phản hồi</span>
              </span>
              <span className="font-mono text-white text-sm">{timeLeft}s</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-1000 rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 text-left">
              Lời mời sẽ tự động hủy nếu không phản hồi trong 30 giây.
            </p>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => onDecline(invite)}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
            >
              <X className="w-4 h-4" />
              <span>Từ chối</span>
            </button>
            <button
              onClick={() => onAccept(invite)}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer scale-100 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Check className="w-4 h-4" />
              <span>Chấp nhận</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

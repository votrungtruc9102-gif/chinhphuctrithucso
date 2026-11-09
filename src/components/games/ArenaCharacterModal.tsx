import React from 'react';
import { X, Shield, Sparkles, BookOpen, Award, Zap, Heart, Swords, ChevronRight, Lock } from 'lucide-react';
import { ArenaStage } from '../../data/arenaData';

interface ArenaCharacterModalProps {
  stage: ArenaStage | null;
  isUnlocked: boolean;
  onClose: () => void;
  onStartBattle: (stage: ArenaStage) => void;
}

export const ArenaCharacterModal: React.FC<ArenaCharacterModalProps> = ({
  stage,
  isUnlocked,
  onClose,
  onStartBattle
}) => {
  if (!stage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border-2 border-slate-700/80 text-white shadow-2xl overflow-hidden z-10 animate-scaleUp my-auto max-h-[92vh] flex flex-col">
        {/* Header Banner */}
        <div className={`p-5 sm:p-6 bg-gradient-to-r ${stage.theme.bgGradient} border-b border-slate-800 flex items-start justify-between relative overflow-hidden shrink-0`}>
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${stage.theme.iconBg} text-white flex items-center justify-center text-3xl sm:text-4xl shadow-xl border-2 border-white/20 shrink-0`}>
              {stage.avatarStyle.symbol}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-700 text-amber-400">
                  Đấu trường #{stage.id} · {stage.regionName}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Cấp {stage.level} · {stage.difficulty}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {stage.bossName}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-amber-300 flex items-center gap-1.5 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{stage.title}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0 z-10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {/* Health Bar Display */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="flex items-center gap-1.5 text-rose-400">
                <Heart className="w-4 h-4 fill-rose-500" />
                <span>Sinh Lực Đại Địch:</span>
              </span>
              <span className="font-mono text-white text-xs sm:text-sm">
                {stage.maxHp.toLocaleString('vi-VN')} / 150.000 HP (100%)
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500"
                style={{ width: `${Math.min(100, (stage.maxHp / 150000) * 100)}%` }}
              />
            </div>
          </div>

          {/* Nguồn gốc văn học & truyền thuyết */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Nguồn gốc văn học & truyền thuyết</span>
            </h4>
            <p className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200">
              {stage.origin}
            </p>
          </div>

          {/* Tiểu sử tóm tắt & Bối cảnh */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Tiểu sử tóm tắt
              </h4>
              <p className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-slate-300 text-xs leading-relaxed h-[110px] overflow-y-auto">
                {stage.biography}
              </p>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Bối cảnh xuất hiện & Tính cách
              </h4>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800 text-slate-300 text-xs space-y-1.5 h-[110px] overflow-y-auto">
                <p><strong className="text-amber-300">Bối cảnh:</strong> {stage.context}</p>
                <p><strong className="text-emerald-300">Tính cách:</strong> {stage.personality}</p>
              </div>
            </div>
          </div>

          {/* Bộ kỹ năng giả tưởng */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Bộ kỹ năng giả tưởng đại nhân vật</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {stage.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/50 text-xs font-semibold text-purple-200 flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded-md bg-purple-800 text-purple-200 flex items-center justify-center font-bold text-[10px] shrink-0">
                    {sIdx + 1}
                  </span>
                  <span className="truncate">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phần thưởng khi chiến thắng */}
          <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-800/40 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Phần thưởng vượt ải:</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="text-amber-400 font-bold">+{stage.rewardExp} EXP</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-300 font-bold">{stage.rewardBadge}</span>
              <span className="text-slate-500">•</span>
              <span className="text-purple-300 font-bold">{stage.rewardTitle}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            Đóng hồ sơ
          </button>

          {isUnlocked ? (
            <button
              onClick={() => {
                onClose();
                onStartBattle(stage);
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Swords className="w-4 h-4" />
              <span>Vào khiêu chiến ngay</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 bg-rose-950/50 border border-rose-900/50 px-4 py-2.5 rounded-xl">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Cần vượt qua đấu trường #{stage.id - 1} để mở khóa!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

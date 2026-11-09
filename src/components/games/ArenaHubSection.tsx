import React, { useState } from 'react';
import {
  Swords,
  Lock,
  CheckCircle2,
  Trophy,
  Sparkles,
  Heart,
  Shield,
  BookOpen,
  Settings,
  Volume2,
  VolumeX,
  ChevronRight,
  Flame,
  Award,
  Layers,
  Info
} from 'lucide-react';
import {
  WORLD_REGIONS,
  WorldRegion,
  ArenaStage
} from '../../data/arenaData';
import { arenaStorageService, UserArenaProgress } from '../../services/arenaStorageService';
import { ArenaBattleModal } from './ArenaBattleModal';
import { ArenaCharacterModal } from './ArenaCharacterModal';
import { ArenaTeacherModal } from './ArenaTeacherModal';
import { gameAudio } from '../../utils/gameAudio';

interface ArenaHubSectionProps {
  userId?: string;
  currentUser?: any;
  isTeacher?: boolean;
  onAddScore: (points: number) => void;
}

export const ArenaHubSection: React.FC<ArenaHubSectionProps> = ({
  userId,
  currentUser,
  isTeacher = false,
  onAddScore
}) => {
  const effectiveUserId = userId || currentUser?.uid;
  const [stages, setStages] = useState<ArenaStage[]>(() => arenaStorageService.getStages());
  const [selectedRegionId, setSelectedRegionId] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [userProgress, setUserProgress] = useState<UserArenaProgress>(() =>
    arenaStorageService.getUserProgress(effectiveUserId)
  );

  // Modals state
  const [activeBattleStage, setActiveBattleStage] = useState<ArenaStage | null>(null);
  const [selectedCharacterStage, setSelectedCharacterStage] = useState<ArenaStage | null>(null);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(() => gameAudio.getMuted());

  // Refresh stages after teacher edits
  const handleRefreshStages = () => {
    setStages(arenaStorageService.getStages());
    setUserProgress(arenaStorageService.getUserProgress(userId));
  };

  // Check stage unlock status
  const isStageUnlocked = (stageId: number) => {
    if (stageId === 1) return true;
    return stageId <= userProgress.maxUnlockedStage;
  };

  const isStageCompleted = (stageId: number) => {
    return userProgress.completedStageIds.includes(stageId);
  };

  // Handle click on stage card
  const handleStageClick = (stage: ArenaStage) => {
    if (isStageUnlocked(stage.id)) {
      setActiveBattleStage(stage);
    } else {
      gameAudio.playIncorrect();
      setLockedNotice(`Bạn cần vượt qua chặng #${stage.id - 1} để mở khóa thử thách tiếp theo!`);
      setTimeout(() => setLockedNotice(null), 3500);
    }
  };

  // Handle victory callback
  const handleVictory = (nextStageId: number) => {
    const updated = arenaStorageService.getUserProgress(userId);
    setUserProgress(updated);
    onAddScore(50);

    const nextStage = stages.find(s => s.id === nextStageId);
    if (nextStage && nextStageId <= 50) {
      setActiveBattleStage(nextStage);
      // Auto select region if crossed border
      if (nextStage.regionId !== selectedRegionId) {
        setSelectedRegionId(nextStage.regionId);
      }
    } else {
      setActiveBattleStage(null);
    }
  };

  // Current selected region & stages in that region
  const currentRegion = WORLD_REGIONS.find(r => r.id === selectedRegionId) || WORLD_REGIONS[0];
  const regionStages = stages.filter(s => s.regionId === selectedRegionId);

  // Overall completion percent across 50 stages
  const totalCompleted = userProgress.completedStageIds.length;
  const progressPercent = Math.min(100, Math.round((totalCompleted / 50) * 100));

  return (
    <div className="space-y-6">
      {/* ============================================================== */}
      {/* 1. HERO BANNER: ĐẤU TRƯỜNG TRÍ TUỆ – HUYỀN THOẠI VIỆT NAM       */}
      {/* ============================================================== */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-amber-500/40 shadow-2xl p-6 sm:p-8 text-white">
        {/* Mystical oriental background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-black tracking-wider uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Hành Trình Khám Phá & Thư Viện Tri Thức</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Hành Trình Tri Thức <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-amber-300 to-yellow-400">
                50 CHẶNG KHÁM PHÁ VĂN HÓA & KHOA HỌC
              </span>
            </h1>

            <p className="text-sm font-bold text-amber-300 italic">
              "Mỗi thử thách là một bước tiến đến thành công."
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Bản đồ học tập gồm 50 chặng thử thách tri thức trải dài 5 Vùng văn hóa & khoa học. Hoàn thành thử thách trước để mở khóa thử thách tiếp theo, trả lời đúng tích lũy điểm tri thức và ghi danh trên bảng vàng.
            </p>
          </div>

          {/* Quick stats & Teacher Action */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            {/* Progression Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 min-w-[220px] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Tiến trình mở khóa:</span>
                </span>
                <span className="text-amber-400 font-extrabold">{totalCompleted} / 50 ải</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                <span>EXP: <strong className="text-white">{userProgress.totalExp}</strong></span>
                <span>Ải hiện tại: <strong className="text-emerald-400">#{userProgress.maxUnlockedStage}</strong></span>
              </div>
            </div>

            {/* Audio Toggle & Teacher Config button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const next = !isMuted;
                  setIsMuted(next);
                  gameAudio.setMuted(next);
                }}
                className="flex-1 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                <span>{isMuted ? 'Âm thanh: Tắt' : 'Âm thanh: Bật'}</span>
              </button>

              {isTeacher && (
                <button
                  onClick={() => setIsTeacherModalOpen(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                  title="Quản trị 50 đấu trường, HP tối đa 150.000 và câu hỏi văn học"
                >
                  <Settings className="w-4 h-4" />
                  <span>Quản trị GV</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Locked Stage Alert Toast */}
      {lockedNotice && (
        <div className="p-3.5 rounded-2xl bg-rose-950/90 border border-rose-500 text-rose-200 text-xs sm:text-sm font-bold flex items-center gap-3 shadow-lg animate-bounce">
          <Lock className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{lockedNotice}</span>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. REGION SELECTOR (5 VÙNG THẾ GIỚI - MỖI VÙNG 10 ĐẤU TRƯỜNG)   */}
      {/* ============================================================== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
          <span className="uppercase tracking-wider">5 Vùng Thế Giới Huyền Bí (10 Ải / Vùng)</span>
          <span className="text-blue-600 font-semibold">Chọn vùng để khám phá</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {WORLD_REGIONS.map((region) => {
            const isSelected = region.id === selectedRegionId;
            const regionStages = stages.filter(s => s.regionId === region.id);
            const regionCompleted = regionStages.filter(s => userProgress.completedStageIds.includes(s.id)).length;
            const isRegionAccessible = userProgress.maxUnlockedStage >= region.stageRange[0];

            return (
              <button
                key={region.id}
                onClick={() => {
                  setSelectedRegionId(region.id);
                  gameAudio.playClick();
                }}
                className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400 text-white shadow-xl shadow-amber-500/10 ring-2 ring-amber-400/30'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{region.icon}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                      Ải {region.stageRange[0]}–{region.stageRange[1]}
                    </span>
                  </div>
                  <h4 className={`text-xs font-black leading-tight ${isSelected ? 'text-white' : 'text-[#172B4D]'}`}>
                    Vùng {region.id}: {region.name}
                  </h4>
                  <p className={`text-[11px] mt-1 line-clamp-2 leading-relaxed ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                    {region.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold">
                  <span className={isSelected ? 'text-amber-400' : 'text-slate-500'}>
                    Hoàn thành: {regionCompleted}/10
                  </span>
                  {isRegionAccessible ? (
                    <span className="text-emerald-500">Đang mở →</span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Khóa
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. CURRENT REGION LORE BANNER                                  */}
      {/* ============================================================== */}
      <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${currentRegion.bgGradient} border ${currentRegion.cardBorder} text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">{currentRegion.icon}</span>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
              VÙNG {currentRegion.id}: {currentRegion.name}
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900/60 border border-slate-700 text-amber-400 font-bold">
              Đấu trường #{currentRegion.stageRange[0]} đến #{currentRegion.stageRange[1]}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            {currentRegion.description}
          </p>
        </div>

        <div className="text-xs font-bold text-amber-300 bg-slate-950/60 px-3.5 py-2 rounded-xl border border-slate-800 shrink-0 self-start sm:self-auto">
          Quy tắc: Chiến thắng đấu trường trước để mở khóa đấu trường kế tiếp
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. ARENA STAGES GRID (10 ARENAS PER REGION, 50 TOTAL)           */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {regionStages.map((stage) => {
          const unlocked = isStageUnlocked(stage.id);
          const completed = isStageCompleted(stage.id);
          const isNextTarget = stage.id === userProgress.maxUnlockedStage && !completed;

          return (
            <div
              key={stage.id}
              className={`rounded-3xl border-2 transition-all flex flex-col justify-between overflow-hidden relative ${
                completed
                  ? 'bg-slate-900/95 border-emerald-500/50 shadow-md hover:border-emerald-400'
                  : isNextTarget
                  ? 'bg-slate-900 border-amber-400 shadow-xl shadow-amber-500/20 ring-2 ring-amber-400/40 animate-pulse-subtle'
                  : unlocked
                  ? 'bg-slate-900/90 border-slate-700 hover:border-slate-500'
                  : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}
            >
              {/* Card Header & Avatar */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                    #{stage.id}
                  </span>

                  {/* Status Badges */}
                  {completed ? (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Đã thắng</span>
                    </span>
                  ) : isNextTarget ? (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1 animate-pulse">
                      <Sparkles className="w-3 h-3" />
                      <span>Đang mở</span>
                    </span>
                  ) : unlocked ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40">
                      Đã mở
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Chưa mở</span>
                    </span>
                  )}
                </div>

                {/* Boss Avatar & Info */}
                <div className="text-center space-y-1.5 py-1">
                  <div className={`w-14 h-14 mx-auto rounded-2xl ${stage.theme.iconBg} text-white flex items-center justify-center text-2xl shadow-md border-2 border-white/20 transition-transform hover:scale-110`}>
                    {stage.avatarStyle.symbol}
                  </div>
                  <h4 className="text-sm font-black text-white truncate px-1">
                    {stage.bossName}
                  </h4>
                  <p className="text-[11px] font-semibold text-amber-400 truncate px-1">
                    {stage.title}
                  </p>
                </div>

                {/* Health Bar (Capped at 150.000 HP per Section IV) */}
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-rose-400 flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-rose-500" />
                      <span>Máu đại địch:</span>
                    </span>
                    <span className="font-mono text-white text-[11px]">
                      {stage.maxHp.toLocaleString('vi-VN')} HP
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400"
                      style={{ width: `${Math.min(100, (stage.maxHp / 150000) * 100)}%` }}
                    />
                  </div>
                  <div className="text-[9px] text-slate-400 text-right">
                    Độ khó: <span className="font-bold text-amber-300">{stage.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setSelectedCharacterStage(stage)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer text-center"
                  title="Xem hồ sơ & nguồn gốc văn học"
                >
                  Hồ sơ
                </button>

                <button
                  onClick={() => handleStageClick(stage)}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
                    unlocked
                      ? isNextTarget
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 shadow-md'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-800/80 text-slate-500 hover:text-slate-400'
                  }`}
                >
                  {unlocked ? (
                    <>
                      <Swords className="w-3.5 h-3.5" />
                      <span>{completed ? 'Đấu lại' : 'Khiêu chiến'}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3" />
                      <span>Khóa</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* MODALS: BATTLE ARENA, CHARACTER PROFILE & TEACHER CONFIG        */}
      {/* ============================================================== */}
      {activeBattleStage && (
        <ArenaBattleModal
          stage={activeBattleStage}
          userId={userId}
          onClose={() => setActiveBattleStage(null)}
          onVictory={handleVictory}
        />
      )}

      {selectedCharacterStage && (
        <ArenaCharacterModal
          stage={selectedCharacterStage}
          isUnlocked={isStageUnlocked(selectedCharacterStage.id)}
          onClose={() => setSelectedCharacterStage(null)}
          onStartBattle={(st) => {
            setSelectedCharacterStage(null);
            setActiveBattleStage(st);
          }}
        />
      )}

      {isTeacherModalOpen && (
        <ArenaTeacherModal
          onClose={() => setIsTeacherModalOpen(false)}
          onRefreshStages={handleRefreshStages}
        />
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Swords,
  Shield,
  Heart,
  Sparkles,
  Trophy,
  Flame,
  Award,
  Users,
  ChevronRight,
  Lock,
  CheckCircle2,
  Play,
  Share2,
  Plus,
  Compass,
  ArrowRight,
  Zap,
  Info,
  X,
  Volume2
} from 'lucide-react';
import { BOSS_DEFINITIONS, BossDefinition } from '../../data/bossData';
import { UserAccount } from '../../types';
import { BossRaidModal } from './BossRaidModal';
import bossRaidFantasyImg from '../../assets/images/boss_raid_fantasy_1793628756141.jpg';

interface BossCampaignSectionProps {
  currentUser?: UserAccount | null;
  onAddScore: (points: number) => void;
  onOpenDrawer?: () => void;
}

export const BossCampaignSection: React.FC<BossCampaignSectionProps> = ({
  currentUser,
  onAddScore
}) => {
  const [selectedGrade, setSelectedGrade] = useState<6 | 7 | 8 | 9>(6);
  const [selectedBoss, setSelectedBoss] = useState<BossDefinition>(BOSS_DEFINITIONS[0]);
  const [defeatedBossIds, setDefeatedBossIds] = useState<Set<string>>(new Set(['boss_6_1', 'boss_6_2']));

  // Raid modal & Room creation modals
  const [isRaidActive, setIsRaidActive] = useState(false);
  const [activeRaidBossId, setActiveRaidBossId] = useState<string>('boss_6_1');
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [isJoinRoomOpen, setIsJoinRoomOpen] = useState(false);
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [createdRoomCode, setCreatedRoomCode] = useState('');

  // Load persistent defeated bosses from backend if available
  useEffect(() => {
    fetch('/api/bosses/status')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') {
          const defeated = new Set<string>();
          Object.keys(data).forEach(id => {
            if (data[id].defeatedCount > 0) {
              defeated.add(id);
            }
          });
          if (defeated.size > 0) {
            setDefeatedBossIds(defeated);
          }
        }
      })
      .catch(() => {});
  }, []);

  const gradeBosses = BOSS_DEFINITIONS.filter(b => b.grade === selectedGrade);
  const totalBossesCount = BOSS_DEFINITIONS.length; // 50
  const defeatedCount = defeatedBossIds.size;
  const progressPct = Math.round((defeatedCount / totalBossesCount) * 100);

  // Find next boss to challenge
  const nextBoss = BOSS_DEFINITIONS.find(b => !defeatedBossIds.has(b.id)) || BOSS_DEFINITIONS[0];

  const handleStartSoloOrParty = (boss: BossDefinition) => {
    setActiveRaidBossId(boss.id);
    setIsRaidActive(true);
  };

  const handleCreateRoom = () => {
    const code = `BOSS-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setCreatedRoomCode(code);
    setIsCreateRoomOpen(true);
  };

  const handleJoinRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCodeInput.trim()) return;
    setIsJoinRoomOpen(false);
    setActiveRaidBossId(selectedBoss.id);
    setIsRaidActive(true);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn text-white">
      {/* ============================================================== */}
      {/* 1. TOP HERO BANNER: ĐẤU BOSS – CHINH PHỤC 50 ĐẠI BOSS          */}
      {/* ============================================================== */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-2 border-indigo-500/40 shadow-2xl overflow-hidden">
        {/* Fantasy 3D Glow Orbs and Background Art */}
        <img
          src={bossRaidFantasyImg}
          alt="50 Thử Thách Nâng Cao Fantasy 3D"
          className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-indigo-950/80 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-cyan-500/20 border border-purple-400/40 text-purple-200 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                Hệ Thống 50 Thử Thách Nâng Cao Toàn Trường
              </span>
              <span className="text-xs text-slate-300 font-semibold">• 4 Kỷ Nguyên Khối Lớp</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Đỉnh Cao Trí Tuệ
            </h1>

            <p className="text-sm sm:text-base text-amber-300 font-bold italic">
              "Vượt giới hạn bản thân – Chinh phục đỉnh cao kiến thức."
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              Hành trình học thuật cao cấp liên môn: Khối 6 (12 thử thách), Khối 7 (12 thử thách), Khối 8 (13 thử thách), Khối 9 (13 thử thách). Tích hợp câu hỏi tư duy logic, vận dụng cao và kiến thức liên môn phong phú. Hệ thống điểm số, huy hiệu vàng, danh hiệu và tinh thể tri thức.
            </p>
          </div>

          {/* Action Buttons: TẠO NHÓM & THAM GIA NHÓM */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleCreateRoom}
              className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-black text-sm shadow-xl shadow-purple-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer scale-100 hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>TẠO NHÓM CHINH PHỤC</span>
            </button>

            <button
              onClick={() => setIsJoinRoomOpen(true)}
              className="py-3.5 px-6 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white border-2 border-cyan-500/50 hover:border-cyan-400 font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>THAM GIA NHÓM</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar Strip */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
          <div className="sm:col-span-2 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Tiến trình chinh phục:</span>
              </span>
              <span className="font-mono text-amber-400 text-sm">
                {defeatedCount} / {totalBossesCount} Thử Thách Nâng Cao ({progressPct}%)
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-500 transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
            <div className="text-2xl">{nextBoss.appearance.avatar}</div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Thử thách tiếp theo</div>
              <div className="text-xs font-extrabold text-white truncate max-w-[140px]">{nextBoss.name}</div>
              <div className="text-[10px] text-amber-400 font-mono">#{nextBoss.order} · Khối {nextBoss.grade}</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center text-lg shadow">
              👑
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Đỉnh cao tối thượng #50</div>
              <div className="text-xs font-extrabold text-cyan-300 truncate max-w-[140px]">Thần Chủ 100.000 HP</div>
              <div className="text-[10px] text-emerald-400 font-bold">+25.000 EXP · +1000 RP</div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. REGION TABS (4 KHỐI LỚP - 50 THỬ THÁCH NÂNG CAO)            */}
      {/* ============================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { grade: 6 as const, count: 12, range: '1 - 12', title: 'Khởi đầu huyền thoại', color: 'border-emerald-500 text-emerald-400 bg-emerald-950/30' },
          { grade: 7 as const, count: 12, range: '13 - 24', title: 'Thử thách nâng cao', color: 'border-cyan-500 text-cyan-400 bg-cyan-950/30' },
          { grade: 8 as const, count: 13, range: '25 - 37', title: 'Đại chiến huyền thoại', color: 'border-indigo-500 text-indigo-400 bg-indigo-950/30' },
          { grade: 9 as const, count: 13, range: '38 - 50', title: 'Thần chiến tối thượng', color: 'border-rose-500 text-rose-400 bg-rose-950/30' }
        ].map(reg => {
          const isSelected = selectedGrade === reg.grade;
          return (
            <button
              key={reg.grade}
              onClick={() => {
                setSelectedGrade(reg.grade);
                const firstInGrade = BOSS_DEFINITIONS.find(b => b.grade === reg.grade);
                if (firstInGrade) setSelectedBoss(firstInGrade);
              }}
              className={`p-4 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? `${reg.color} shadow-xl scale-[1.02]`
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider">Khối {reg.grade}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800">
                  {reg.count} Thử thách
                </span>
              </div>
              <div className="mt-2 font-bold text-white text-sm">{reg.title}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Thử thách #{reg.range}</div>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* 3. FANTASY 3D JOURNEY MAP & CHALLENGE DOSSIER                   */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Journey Road Map (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-950/90 border-2 border-indigo-500/30 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-black text-white">
                Bản Đồ Hành Trình Khối {selectedGrade} ({gradeBosses.length} Thử Thách Nâng Cao)
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Chạm vào từng ải để xem chi tiết
            </span>
          </div>

          {/* Winding Adventure Road Nodes */}
          <div className="relative py-4 px-2 space-y-3 max-h-[580px] overflow-y-auto pr-3">
            {gradeBosses.map((boss, idx) => {
              const isSelected = selectedBoss.id === boss.id;
              const isDefeated = defeatedBossIds.has(boss.id);
              const isFinalBoss = boss.order === 50;

              return (
                <div
                  key={boss.id}
                  onClick={() => setSelectedBoss(boss)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-900/60 via-slate-900 to-purple-900/60 border-amber-400 shadow-xl shadow-amber-500/20 scale-[1.01]'
                      : isDefeated
                      ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    {/* Node Milestone Avatar */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg border ${
                      isFinalBoss
                        ? 'bg-gradient-to-tr from-rose-600 to-amber-500 border-amber-300 animate-pulse'
                        : isSelected
                        ? 'bg-indigo-600 border-amber-400'
                        : 'bg-slate-800 border-slate-700'
                    }`}>
                      {boss.appearance.avatar}
                    </div>

                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-950 text-amber-400 border border-slate-800">
                          Ải #{boss.order}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          Cấp {boss.level}
                        </span>
                        {isDefeated && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            <CheckCircle2 className="w-3 h-3" /> ĐÃ CHINH PHỤC
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-black text-white mt-0.5 truncate">
                        {boss.name}
                      </h4>
                      <div className="text-[11px] text-slate-400 truncate">
                        {boss.title}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono text-xs font-black text-cyan-300">
                      {boss.maxHp.toLocaleString('vi-VN')} HP
                    </div>
                    <div className="text-[10px] text-amber-400 font-bold">
                      +{boss.rewards.exp} EXP
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Boss Dossier & Battle Trigger (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950/90 border-2 border-amber-500/40 shadow-2xl space-y-5">
          {/* Boss Header Display */}
          <div className={`p-5 rounded-3xl bg-gradient-to-r ${selectedBoss.appearance.bgGradient} border border-slate-700 relative overflow-hidden`}>
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-slate-950/80 text-4xl flex items-center justify-center shadow-xl border border-white/20 shrink-0">
                {selectedBoss.appearance.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-400 border border-slate-800">
                    Thử Thách Nâng Cao #{selectedBoss.order} · Khối {selectedBoss.grade}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    Cấp {selectedBoss.level}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mt-1">
                  {selectedBoss.name}
                </h3>
                <p className="text-xs text-amber-300 font-semibold mt-0.5">
                  {selectedBoss.title}
                </p>
              </div>
            </div>
          </div>

          {/* Health Bar (<= 100.000 HP) */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Heart className="w-4 h-4 fill-cyan-500 text-cyan-500" />
                <span>Sinh Lực Thử Thách:</span>
              </span>
              <span className="font-mono text-white text-sm">
                {selectedBoss.maxHp.toLocaleString('vi-VN')} / 100.000 HP
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500"
                style={{ width: `${Math.min(100, (selectedBoss.maxHp / 100000) * 100)}%` }}
              />
            </div>
          </div>

          {/* Lore & Weakness */}
          <div className="space-y-2 text-xs">
            <div className="text-slate-400 uppercase font-bold flex items-center gap-1 text-[10px]">
              <Info className="w-3.5 h-3.5 text-amber-400" /> Truyền thuyết & Cốt truyện:
            </div>
            <p className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 leading-relaxed">
              {selectedBoss.lore}
            </p>
          </div>

          {/* 3 Combat Phases */}
          <div className="space-y-2 text-xs">
            <div className="text-slate-400 uppercase font-bold text-[10px]">
              3 Giai đoạn chiến đấu:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center">
                <div className="text-[10px] font-bold text-emerald-400">Giai đoạn 1</div>
                <div className="text-[11px] font-black text-white mt-0.5">Toàn Sức</div>
                <div className="text-[9px] text-slate-400">&gt;60% HP</div>
              </div>
              <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-center">
                <div className="text-[10px] font-bold text-amber-400">Giai đoạn 2</div>
                <div className="text-[11px] font-black text-white mt-0.5">Cuồng Nộ</div>
                <div className="text-[9px] text-slate-400">25% - 60%</div>
              </div>
              <div className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/30 text-center animate-pulse">
                <div className="text-[10px] font-bold text-rose-400">Giai đoạn 3</div>
                <div className="text-[11px] font-black text-white mt-0.5">Tuyệt Diệt</div>
                <div className="text-[9px] text-slate-400">&lt;25% HP</div>
              </div>
            </div>
          </div>

          {/* Rewards Card */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <div className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Phần thưởng tiêu diệt:
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-200">
              <div className="flex items-center gap-1.5">
                <span className="text-indigo-400 font-bold font-mono">+{selectedBoss.rewards.exp} EXP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold font-mono">+{selectedBoss.rewards.rp} RP</span>
              </div>
              <div className="col-span-2 text-[11px] text-slate-400 truncate">
                Danh hiệu: <strong className="text-purple-300">{selectedBoss.rewards.title}</strong>
              </div>
            </div>
          </div>

          {/* Battle Trigger Button */}
          <div className="pt-2">
            <button
              onClick={() => handleStartSoloOrParty(selectedBoss)}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-black text-sm shadow-xl shadow-rose-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer scale-100 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Swords className="w-5 h-5" />
              <span>TẬP HỢP TỔ ĐỘI & ĐÁNH BOSS #{selectedBoss.order}</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Hỗ trợ tổ đội 3–10 học sinh cùng trả lời câu hỏi và gây sát thương đồng bộ.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. MODALS: CREATE ROOM & JOIN ROOM                             */}
      {/* ============================================================== */}
      {isCreateRoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border-2 border-amber-500/50 p-6 text-white shadow-2xl space-y-5 animate-scaleUp">
            <button
              onClick={() => setIsCreateRoomOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto text-2xl">
                🏰
              </div>
              <h3 className="text-xl font-black text-white">Khởi Tạo Phòng Săn Boss</h3>
              <p className="text-xs text-slate-300">
                Chia sẻ mã phòng này cho các bạn học sinh trong lớp để cùng tham gia tổ đội 3–10 người!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Mã phòng đánh Boss:</div>
              <div className="text-3xl font-black text-amber-400 font-mono tracking-widest">{createdRoomCode}</div>
              <div className="text-[11px] text-slate-400 pt-1">
                Mục tiêu: <strong className="text-white">{selectedBoss.name} (#{selectedBoss.order})</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(createdRoomCode);
                  alert(`Đã sao chép mã phòng: ${createdRoomCode}`);
                }}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" /> Sao chép mã
              </button>
              <button
                onClick={() => {
                  setIsCreateRoomOpen(false);
                  handleStartSoloOrParty(selectedBoss);
                }}
                className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-lg shadow-amber-500/30 flex items-center justify-center gap-1.5"
              >
                <Play className="w-4 h-4 fill-slate-950" /> Vào phòng ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {isJoinRoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <form onSubmit={handleJoinRoomSubmit} className="relative w-full max-w-md rounded-3xl bg-slate-900 border-2 border-cyan-500/50 p-6 text-white shadow-2xl space-y-5 animate-scaleUp">
            <button
              type="button"
              onClick={() => setIsJoinRoomOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto text-2xl">
                ⚔️
              </div>
              <h3 className="text-xl font-black text-white">Tham Gia Phòng Săn Boss</h3>
              <p className="text-xs text-slate-300">
                Nhập mã phòng do bạn bè hoặc đội trưởng cung cấp để bước vào trận đánh tổ đội:
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Mã phòng (Ví dụ: BOSS-7A):</label>
              <input
                type="text"
                required
                autoFocus
                value={roomCodeInput}
                onChange={e => setRoomCodeInput(e.target.value.toUpperCase())}
                placeholder="NHẬP MÃ PHÒNG..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-center text-lg font-black font-mono tracking-widest text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 uppercase"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm shadow-xl shadow-cyan-500/30 transition-all cursor-pointer"
            >
              Vào Chiến Đấu Cùng Tổ Đội
            </button>
          </form>
        </div>
      )}

      {/* Realtime Raid Combat Modal */}
      {isRaidActive && currentUser && (
        <BossRaidModal
          initialBossId={activeRaidBossId}
          currentUser={currentUser}
          onClose={() => setIsRaidActive(false)}
        />
      )}
    </div>
  );
};

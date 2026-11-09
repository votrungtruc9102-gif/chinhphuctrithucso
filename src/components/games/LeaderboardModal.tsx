import React, { useState, useEffect } from 'react';
import {
  X,
  Trophy,
  Medal,
  Flame,
  Search,
  Filter,
  Sparkles,
  Shield,
  Zap,
  TrendingUp,
  User
} from 'lucide-react';
import { PLAYABLE_CHARACTERS } from '../../data/characterList';

interface LeaderboardUser {
  uid: string;
  displayName: string;
  username: string;
  className: string;
  grade: number;
  avatarEmoji?: string;
  favoriteCharacterId?: string;
  title?: string;
  rp: number;
  exp: number;
  wins: number;
  losses: number;
  winStreak: number;
  winRate: number;
}

interface LeaderboardData {
  allTime: LeaderboardUser[];
  monthly: LeaderboardUser[];
  weekly: LeaderboardUser[];
}

interface LeaderboardModalProps {
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'allTime'>('allTime');
  const [data, setData] = useState<LeaderboardData>({ allTime: [], monthly: [], weekly: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load leaderboard:', err);
        setIsLoading(false);
      });
  }, []);

  const currentList = data[activeTab] || [];

  const filteredList = currentList.filter(item => {
    const matchesSearch =
      item.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === 'ALL' || item.className === selectedClass;
    return matchesSearch && matchesClass;
  });

  const availableClasses = Array.from(
    new Set(currentList.map(u => u.className).filter(Boolean))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border-2 border-indigo-500/40 text-white shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] animate-scaleUp">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-lg font-black text-2xl">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Bảng Vinh Danh
                </span>
                <span className="text-xs text-slate-400">Dữ liệu thời gian thực</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                Bảng Xếp Hạng Đấu Trường Trí Tuệ
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

        {/* Filter bar & Tabs */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('weekly')}
              className={`flex-1 sm:flex-none py-1.5 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === 'weekly'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tuần này
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`flex-1 sm:flex-none py-1.5 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === 'monthly'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tháng này
            </button>
            <button
              onClick={() => setActiveTab('allTime')}
              className={`flex-1 sm:flex-none py-1.5 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                activeTab === 'allTime'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Toàn trường
            </button>
          </div>

          {/* Search & Class Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tên học sinh..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="ALL">Tất cả lớp</option>
              {availableClasses.map(cl => (
                <option key={cl} value={cl}>Lớp {cl}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Table */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="py-16 text-center text-slate-500 text-sm">
              Đang tải bảng xếp hạng thực tế từ máy chủ...
            </div>
          ) : filteredList.length === 0 ? (
            <div className="py-16 text-center max-w-md mx-auto space-y-3">
              <div className="text-4xl">🛡️</div>
              <h4 className="text-base font-bold text-white">Chưa có kết quả thi đấu phù hợp</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hãy tham gia Đấu Trí Học Đường, Hành Trình Tri Thức hoặc Đỉnh Cao Trí Tuệ để ghi danh thành tích và tích lũy điểm Rank (RP) trên bảng vàng nhà trường!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Hạng</th>
                    <th className="py-3 px-3">Học sinh</th>
                    <th className="py-3 px-3">Lớp</th>
                    <th className="py-3 px-3">Nhân vật</th>
                    <th className="py-3 px-3">Danh hiệu</th>
                    <th className="py-3 px-3 text-center">Tỷ lệ thắng</th>
                    <th className="py-3 px-3 text-center">Chuỗi</th>
                    <th className="py-3 px-3 text-right">Điểm RP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredList.map((item, index) => {
                    const rank = index + 1;
                    const charObj = PLAYABLE_CHARACTERS.find(c => c.id === item.favoriteCharacterId) || PLAYABLE_CHARACTERS[0];

                    let rankBadge = (
                      <span className="font-mono text-slate-400 font-bold">#{rank}</span>
                    );
                    if (rank === 1) {
                      rankBadge = (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-black border border-amber-500/40">
                          🥇 #1
                        </span>
                      );
                    } else if (rank === 2) {
                      rankBadge = (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-300/20 text-slate-200 font-black border border-slate-300/40">
                          🥈 #2
                        </span>
                      );
                    } else if (rank === 3) {
                      rankBadge = (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-700/20 text-amber-400 font-black border border-amber-700/40">
                          🥉 #3
                        </span>
                      );
                    }

                    return (
                      <tr key={item.uid} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3 whitespace-nowrap">{rankBadge}</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-base shrink-0 border border-slate-700">
                              {item.avatarEmoji || '🧑‍🎓'}
                            </div>
                            <div>
                              <div className="font-bold text-white">{item.displayName}</div>
                              <div className="text-[10px] text-slate-500 font-mono">@{item.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-bold text-[11px]">
                            {item.className}
                          </span>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span>{charObj.avatar}</span>
                            <span className="text-slate-300">{charObj.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="text-amber-300/90 font-semibold">{item.title || 'Tân Thủ Khám Phá'}</span>
                        </td>
                        <td className="py-3 px-3 text-center whitespace-nowrap">
                          <span className="font-bold text-emerald-400">{item.winRate}%</span>{' '}
                          <span className="text-slate-500 text-[10px]">({item.wins}T - {item.losses}B)</span>
                        </td>
                        <td className="py-3 px-3 text-center whitespace-nowrap">
                          {item.winStreak > 0 ? (
                            <span className="inline-flex items-center gap-1 text-rose-400 font-bold font-mono">
                              <Flame className="w-3.5 h-3.5 fill-rose-500" />
                              {item.winStreak}
                            </span>
                          ) : (
                            <span className="text-slate-500 font-mono">-</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          <span className="font-mono font-black text-amber-400 text-sm">
                            {item.rp.toLocaleString('vi-VN')} RP
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

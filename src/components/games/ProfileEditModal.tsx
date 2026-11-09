import React, { useState } from 'react';
import {
  X,
  User,
  Sparkles,
  ShieldCheck,
  Award,
  Check,
  AlertCircle,
  Save,
  Lock
} from 'lucide-react';
import { UserAccount } from '../../types';
import { PLAYABLE_CHARACTERS, STUDENT_TITLES, AVATAR_SEEDS } from '../../data/characterList';

interface ProfileEditModalProps {
  currentUser: UserAccount;
  onClose: () => void;
  onProfileUpdated: (updatedUser: UserAccount) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  currentUser,
  onClose,
  onProfileUpdated
}) => {
  const [displayName, setDisplayName] = useState(currentUser.displayName || '');
  const [username, setUsername] = useState(currentUser.username || '');
  const [selectedAvatarEmoji, setSelectedAvatarEmoji] = useState('🧑‍🎓');
  const [selectedCharacterId, setSelectedCharacterId] = useState('char_1');
  const [selectedTitle, setSelectedTitle] = useState('Tân Thủ Khám Phá');

  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const trimmedName = displayName.trim();
    const trimmedUser = username.trim();

    if (!trimmedName) {
      setErrorMsg('Tên hiển thị không được để trống.');
      return;
    }

    if (!trimmedUser) {
      setErrorMsg('Tên đăng nhập không được để trống.');
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: currentUser.uid,
          displayName: trimmedName,
          username: trimmedUser,
          avatarEmoji: selectedAvatarEmoji,
          favoriteCharacterId: selectedCharacterId,
          title: selectedTitle
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Cập nhật hồ sơ thất bại.');
      }

      setSuccessMsg('Hồ sơ học sinh đã được cập nhật thành công!');
      const updatedAccount: UserAccount = {
        ...currentUser,
        displayName: trimmedName,
        username: trimmedUser
      };
      onProfileUpdated(updatedAccount);

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Có lỗi xảy ra khi lưu thay đổi.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border-2 border-indigo-500/40 text-white shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] animate-scaleUp">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg text-2xl">
              {selectedAvatarEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Hồ Sơ Học Sinh
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                Chỉnh Sửa Hồ Sơ Cá Nhân
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

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Avatar Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Chọn ảnh đại diện (Avatar):</span>
            </label>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
              {AVATAR_SEEDS.map(av => {
                const isSelected = selectedAvatarEmoji === av.emoji;
                return (
                  <button
                    type="button"
                    key={av.id}
                    onClick={() => setSelectedAvatarEmoji(av.emoji)}
                    className={`h-11 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-indigo-600/40 border-indigo-400 shadow-md scale-105'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {av.emoji}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name & Username Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Tên hiển thị <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Nhập họ và tên hiển thị..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Tên đăng nhập (Username) <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Ví dụ: hocsinh.minhquan"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* Favorite Character */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Nhân vật đại diện ưa thích (1 trong 50 nhân vật):</span>
            </label>
            <select
              value={selectedCharacterId}
              onChange={e => setSelectedCharacterId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {PLAYABLE_CHARACTERS.map(c => (
                <option key={c.id} value={c.id}>
                  {c.avatar} {c.name} — {c.title} ({c.classType})
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Danh hiệu vinh danh:</span>
            </label>
            <select
              value={selectedTitle}
              onChange={e => setSelectedTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {STUDENT_TITLES.map((t, idx) => (
                <option key={idx} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Protected Stats Notice (Section 5 Security) */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
            <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200">Bảo mật chỉ số thành tích:</strong> Điểm Rank (RP), Điểm kinh nghiệm (EXP), Chuỗi thắng và Tỷ lệ thắng được tính toán và bảo vệ tự động từ các trận đấu thật trên máy chủ, không thể can thiệp thủ công.
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-xs font-black shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Edit3,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Heart,
  BookOpen,
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers
} from 'lucide-react';
import { ArenaStage, ArenaDifficulty } from '../../data/arenaData';
import { arenaStorageService } from '../../services/arenaStorageService';

interface ArenaTeacherModalProps {
  onClose: () => void;
  onRefreshStages: () => void;
}

export const ArenaTeacherModal: React.FC<ArenaTeacherModalProps> = ({
  onClose,
  onRefreshStages
}) => {
  const [stages, setStages] = useState<ArenaStage[]>(() => arenaStorageService.getStages());
  const [selectedStageId, setSelectedStageId] = useState<number>(1);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const selectedStage = stages.find(s => s.id === selectedStageId) || stages[0];

  // Handle stage field change with 150.000 HP limit validation
  const handleFieldChange = (field: keyof ArenaStage, value: unknown) => {
    setStages(prev =>
      prev.map(st => {
        if (st.id === selectedStageId) {
          if (field === 'maxHp') {
            const num = Math.min(150000, Math.max(1000, Number(value) || 1000));
            return { ...st, maxHp: num };
          }
          return { ...st, [field]: value };
        }
        return st;
      })
    );
  };

  // Handle question edit
  const handleQuestionChange = (qIndex: number, field: string, value: unknown) => {
    setStages(prev =>
      prev.map(st => {
        if (st.id === selectedStageId) {
          const updatedQ = [...st.questions];
          updatedQ[qIndex] = {
            ...updatedQ[qIndex],
            [field]: value
          };
          return { ...st, questions: updatedQ };
        }
        return st;
      })
    );
  };

  // Save all changes
  const handleSave = () => {
    arenaStorageService.saveStages(stages);
    onRefreshStages();
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  // Reset to default
  const handleResetDefaults = () => {
    if (window.confirm('Khôi phục toàn bộ thông số 50 đấu trường về mặc định của hệ thống?')) {
      localStorage.removeItem('thcs_arena_custom_stages_v1');
      const def = arenaStorageService.getStages();
      setStages(def);
      onRefreshStages();
      setIsSavedNotice(true);
      setTimeout(() => setIsSavedNotice(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border-2 border-amber-500/50 text-white shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-xl shadow-lg font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-white flex items-center gap-2">
                <span>Quản Trị Đấu Trường Trí Tuệ (Dành Cho Giáo Viên)</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  50 Đấu Trường
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Hiệu chỉnh HP (tối đa 150.000 HP), thông tin nhân vật và ngân hàng câu hỏi văn học
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Lưu thay đổi</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Success Notice */}
        {isSavedNotice && (
          <div className="bg-emerald-950 border-b border-emerald-800 px-4 py-2.5 text-xs font-bold text-emerald-300 flex items-center justify-center gap-2 animate-fadeIn shrink-0">
            <CheckCircle2 className="w-4 h-4" />
            <span>Đã lưu thành công dữ liệu vào hệ thống!</span>
          </div>
        )}

        {/* Main Body */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
          {/* Stage Selector Sidebar */}
          <div className="md:col-span-4 border-r border-slate-800 overflow-y-auto p-3 space-y-1 bg-slate-950/60 max-h-[300px] md:max-h-none">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center justify-between">
              <span>Chọn đấu trường (1–50)</span>
              <span className="text-amber-400 font-bold">{stages.length} ải</span>
            </div>
            {stages.map(st => {
              const isSelected = st.id === selectedStageId;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStageId(st.id)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-300 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-[10px] font-mono flex items-center justify-center shrink-0">
                      {st.id}
                    </span>
                    <span className="truncate">{st.bossName}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                    {st.maxHp.toLocaleString('vi-VN')} HP
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stage Edit Panel */}
          <div className="md:col-span-8 p-4 sm:p-6 overflow-y-auto space-y-5">
            {/* Stage Title and Region info */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Đang chỉnh sửa: Đấu trường #{selectedStage.id}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  Vùng thế giới: {selectedStage.regionName}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Tên nhân vật / Boss</label>
                  <input
                    type="text"
                    value={selectedStage.bossName}
                    onChange={(e) => handleFieldChange('bossName', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:border-amber-400 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Danh hiệu</label>
                  <input
                    type="text"
                    value={selectedStage.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:border-amber-400 outline-hidden"
                  />
                </div>
              </div>

              {/* HP Setting (Strictly Capped at 150.000 HP per Section IV) */}
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-rose-300">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-rose-500" />
                    <span>Lượng Máu Tối Đa (Max 150.000 HP):</span>
                  </span>
                  <span className="font-mono text-white text-sm font-extrabold">
                    {selectedStage.maxHp.toLocaleString('vi-VN')} HP
                  </span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={150000}
                  step={1000}
                  value={selectedStage.maxHp}
                  onChange={(e) => handleFieldChange('maxHp', Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>5.000 HP</span>
                  <span>75.000 HP</span>
                  <span className="text-amber-400 font-bold">150.000 HP (Giới hạn tối đa)</span>
                </div>
              </div>

              {/* Difficulty & Rewards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Độ khó</label>
                  <select
                    value={selectedStage.difficulty}
                    onChange={(e) => handleFieldChange('difficulty', e.target.value as ArenaDifficulty)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold outline-hidden"
                  >
                    <option value="Dễ">Dễ</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Khó">Khó</option>
                    <option value="Rất khó">Rất khó</option>
                    <option value="Huyền thoại">Huyền thoại</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Thưởng EXP</label>
                  <input
                    type="number"
                    value={selectedStage.rewardExp}
                    onChange={(e) => handleFieldChange('rewardExp', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Tên huy hiệu thưởng</label>
                  <input
                    type="text"
                    value={selectedStage.rewardBadge}
                    onChange={(e) => handleFieldChange('rewardBadge', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold outline-hidden"
                  />
                </div>
              </div>

              {/* Origin & Biography */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Nguồn gốc văn học / tác phẩm</label>
                  <input
                    type="text"
                    value={selectedStage.origin}
                    onChange={(e) => handleFieldChange('origin', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Tiểu sử tóm tắt</label>
                  <textarea
                    rows={2}
                    value={selectedStage.biography}
                    onChange={(e) => handleFieldChange('biography', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs outline-hidden resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Questions Management */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Câu hỏi văn học của đấu trường ({selectedStage.questions.length} câu)</span>
                </h4>
              </div>

              <div className="space-y-3">
                {selectedStage.questions.map((q, qIdx) => (
                  <div key={q.id || qIdx} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-amber-300">Câu hỏi #{qIdx + 1}:</span>
                      <span className="text-[10px] text-slate-400">Sát thương: {q.damage?.toLocaleString('vi-VN')} HP</span>
                    </div>
                    <textarea
                      rows={2}
                      value={q.question}
                      onChange={(e) => handleQuestionChange(qIdx, 'question', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs outline-hidden resize-none"
                    />

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx} className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            name={`correct_${selectedStage.id}_${qIdx}`}
                            checked={q.correctIndex === oIdx}
                            onChange={() => handleQuestionChange(qIdx, 'correctIndex', oIdx)}
                            className="accent-emerald-500 cursor-pointer"
                            title="Chọn làm đáp án đúng"
                          />
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => {
                              const newOpts = [...q.options];
                              newOpts[oIdx] = e.target.value;
                              handleQuestionChange(qIdx, 'options', newOpts);
                            }}
                            className={`flex-1 px-2.5 py-1 rounded-lg bg-slate-900 border text-xs outline-hidden ${
                              q.correctIndex === oIdx ? 'border-emerald-500 text-emerald-200' : 'border-slate-800 text-slate-300'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <button
            onClick={handleResetDefaults}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục mặc định</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
            >
              Đóng
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Cấu Hình</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  X,
  UserPlus,
  LogIn,
  Search,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Award,
  KeyRound,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  GraduationCap,
  Flame,
  ArrowRight,
  Trash2,
  Archive,
  RotateCcw,
  CheckSquare,
  Square
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { studentAccountService, RegisteredStudent } from '../../services/studentAccountService';
import { gameAudio } from '../../utils/gameAudio';

interface StudentRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (student: RegisteredStudent) => void;
  initialMode?: 'register' | 'login' | 'recover' | 'archive';
}

export const StudentRegisterModal: React.FC<StudentRegisterModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'register'
}) => {
  const [activeTab, setActiveTab] = useState<'register' | 'login' | 'recover' | 'archive'>(initialMode);

  // Registration Form State
  const [fullName, setFullName] = useState('');
  const [grade, setGrade] = useState<number>(6);
  const [className, setClassName] = useState('Khối 6');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Success Screen State
  const [createdStudent, setCreatedStudent] = useState<RegisteredStudent | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Login / Select Existing Student State
  const [studentList, setStudentList] = useState<RegisteredStudent[]>([]);
  const [archivedList, setArchivedList] = useState<RegisteredStudent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<number | 'all'>('all');
  const [isLoadingList, setIsLoadingList] = useState(false);

  // Multi-selection state for management & soft-delete
  const [selectedUids, setSelectedUids] = useState<Set<string>>(new Set());
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  // Recovery State
  const [recoverCodeInput, setRecoverCodeInput] = useState('');
  const [recoveryError, setRecoveryError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialMode);
      setFormError(null);
      setRecoveryError(null);
      setCreatedStudent(null);
      setSelectedUids(new Set());
      loadExistingStudents();
      loadArchivedStudents();
    }
  }, [isOpen, initialMode]);

  const loadExistingStudents = async () => {
    setIsLoadingList(true);
    try {
      const { students } = await studentAccountService.getStudentList();
      setStudentList(students);
    } catch {}
    setIsLoadingList(false);
  };

  const loadArchivedStudents = async () => {
    try {
      const archived = await studentAccountService.getArchivedStudentList();
      setArchivedList(archived);
    } catch {}
  };

  if (!isOpen) return null;

  // Handle Register (Only Full Name + Grade 6/7/8/9)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmed = fullName.trim();
    if (!trimmed || trimmed.length < 2) {
      setFormError('Vui lòng nhập đầy đủ họ và tên học sinh (tối thiểu 2 ký tự).');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await studentAccountService.registerStudent(trimmed, className, grade);
      if (res.success && res.account) {
        setCreatedStudent(res.account);
        gameAudio.playVictory();
        try {
          confetti({ particleCount: 90, spread: 70 });
        } catch {}
        loadExistingStudents();
      } else {
        setFormError(res.error || 'Đăng ký không thành công.');
        gameAudio.playIncorrect();
      }
    } catch (err: any) {
      setFormError(err.message || 'Mất kết nối máy chủ.');
      gameAudio.playIncorrect();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Complete and enter game hub after registration
  const handleFinishRegister = () => {
    if (createdStudent) {
      onSuccess(createdStudent);
      onClose();
    }
  };

  // Quick select an existing student to login without password
  const handleSelectStudent = async (student: RegisteredStudent) => {
    const res = await studentAccountService.loginStudent(student.uid);
    if (res.success && res.account) {
      gameAudio.playCorrect();
      onSuccess(res.account);
      onClose();
    }
  };

  // Multi-select toggle
  const toggleSelectStudent = (uid: string) => {
    const updated = new Set(selectedUids);
    if (updated.has(uid)) {
      updated.delete(uid);
    } else {
      updated.add(uid);
    }
    setSelectedUids(updated);
  };

  const handleSelectAll = (filteredItems: RegisteredStudent[]) => {
    const all = new Set(filteredItems.map(s => s.uid));
    setSelectedUids(all);
  };

  const handleDeselectAll = () => {
    setSelectedUids(new Set());
  };

  // Soft delete (archive) selected accounts
  const handleConfirmSoftDelete = async () => {
    if (selectedUids.size === 0) return;
    setIsSubmitting(true);
    try {
      const uidsArray = Array.from(selectedUids);
      const res = await studentAccountService.archiveStudents(uidsArray);
      if (res.success) {
        setSelectedUids(new Set());
        setShowConfirmDeleteModal(false);
        await loadExistingStudents();
        await loadArchivedStudents();
        gameAudio.playCorrect();
      } else {
        alert(res.error || 'Không thể lưu trữ tài khoản.');
      }
    } catch (err: any) {
      alert(err.message || 'Lỗi kết nối máy chủ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Restore archived account
  const handleRestoreAccount = async (student: RegisteredStudent) => {
    setIsSubmitting(true);
    try {
      const res = await studentAccountService.restoreStudent(student.uid);
      if (res.success && res.account) {
        gameAudio.playVictory();
        await loadExistingStudents();
        await loadArchivedStudents();
      } else {
        alert(res.error || 'Không thể khôi phục tài khoản.');
      }
    } catch (err: any) {
      alert(err.message || 'Lỗi khi khôi phục tài khoản.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Recovery Submit
  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError(null);

    const code = recoverCodeInput.trim().toUpperCase();
    if (!code) {
      setRecoveryError('Vui lòng nhập mã tài khoản hoặc mã khôi phục.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await studentAccountService.recoverStudent(code);
      if (res.success && res.account) {
        gameAudio.playCorrect();
        onSuccess(res.account);
        onClose();
      } else {
        setRecoveryError(res.error || 'Mã tài khoản hoặc mã khôi phục không tìm thấy.');
        gameAudio.playIncorrect();
      }
    } catch (err: any) {
      setRecoveryError(err.message || 'Mất kết nối máy chủ.');
      gameAudio.playIncorrect();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter existing active students
  const filteredStudents = studentList.filter(s => {
    if (gradeFilter !== 'all' && s.grade !== gradeFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.displayName.toLowerCase().includes(q) ||
      s.className.toLowerCase().includes(q) ||
      s.accountCode.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md" onClick={onClose} />

      {/* Main Container */}
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border-2 border-blue-500/50 text-white shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]">
        {/* Header with Blue Theme */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center text-xl shadow-lg font-black">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-white flex items-center gap-2">
                <span>Tài Khoản Học Sinh</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  Lưu Vĩnh Viễn
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Không cần mật khẩu · Dùng xuyên suốt tất cả trò chơi học tập
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector (When not on success screen) */}
        {!createdStudent && (
          <div className="p-2 bg-slate-950/70 border-b border-slate-800/80 grid grid-cols-4 gap-1 text-[11px] font-bold shrink-0">
            <button
              onClick={() => setActiveTab('register')}
              className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">1. Tạo mới</span>
            </button>

            <button
              onClick={() => setActiveTab('login')}
              className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">2. Chọn tài khoản</span>
            </button>

            <button
              onClick={() => setActiveTab('recover')}
              className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'recover'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">3. Khôi phục</span>
            </button>

            <button
              onClick={() => setActiveTab('archive')}
              className={`py-2 px-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer relative ${
                activeTab === 'archive'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Archive className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">4. Đã lưu trữ</span>
              {archivedList.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-purple-500 text-[9px] font-black flex items-center justify-center text-white shrink-0">
                  {archivedList.length}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-slate-200 space-y-4">
          {/* ============================================================== */}
          {/* TAB 1: REGISTRATION SUCCESS SCREEN                             */}
          {/* ============================================================== */}
          {createdStudent ? (
            <div className="text-center space-y-5 py-2 animate-fade-in">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/25">
                🎉
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
                  Đăng Ký Thành Công!
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1 leading-snug">
                  Chào mừng {createdStudent.displayName} – {createdStudent.className} đến với thế giới trò chơi tri thức!
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Tài khoản của bạn đã được ghi vào cơ sở dữ liệu chính thức và lưu trữ vĩnh viễn.
                </p>
              </div>

              {/* Unique Account Code Card */}
              <div className="p-5 rounded-3xl bg-slate-950 border-2 border-cyan-500/50 shadow-xl space-y-3 max-w-md mx-auto text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Mã tài khoản duy nhất của bạn:
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    Chính Thức
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-amber-400 tracking-wider">
                    {createdStudent.accountCode}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(createdStudent.accountCode);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2500);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-1 text-[11px] text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Mã này dùng để nhận diện và đăng nhập lại trên thiết bị khác.</span>
                  </div>
                  {createdStudent.recoveryCode && (
                    <div className="text-[11px] text-slate-400">
                      Mã khôi phục bảo mật: <strong className="text-white font-mono">{createdStudent.recoveryCode}</strong> (ghi lại khi cần giáo viên hỗ trợ).
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleFinishRegister}
                className="w-full max-w-md py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 transition-all mx-auto active:scale-95"
              >
                <span>Bắt Đầu Chinh Phục Trò Chơi Ngay →</span>
              </button>
            </div>
          ) : activeTab === 'register' ? (
            /* ============================================================== */
            /* TAB 2: REGISTER FORM (ONLY NAME & GRADE - NO PASSWORD!)        */
            /* ============================================================== */
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Đăng ký nhanh trong 5 giây:</strong> Chỉ cần nhập <strong>Họ tên</strong> và chọn <strong>Khối lớp</strong>. Không yêu cầu mật khẩu hay thông tin phức tạp.
                </span>
              </div>

              {formError && (
                <div className="p-3 rounded-2xl bg-rose-950/80 border border-rose-500 text-rose-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-300">
                  Họ và tên học sinh: <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Nhập họ và tên của bạn..."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>

              {/* 2. Grade Selection (Strictly 4 buttons: Khối 6, Khối 7, Khối 8, Khối 9) */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-300">
                  Khối lớp: <span className="text-rose-400">*</span>
                </label>

                <div className="grid grid-cols-4 gap-2">
                  {[6, 7, 8, 9].map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => {
                        setGrade(g);
                        setClassName(`Khối ${g}`);
                      }}
                      className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer border ${
                        grade === g
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-400 shadow-md scale-[1.02]'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      Khối {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-teal-300 disabled:opacity-50 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>{isSubmitting ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center pt-1">
                Tài khoản sẽ được kích hoạt ngay và tự động lưu trên máy chủ để tham gia Đấu Trí Học Đường, Hành Trình Tri Thức, Đỉnh Cao Trí Tuệ và toàn bộ trò chơi học tập.
              </p>
            </form>
          ) : activeTab === 'login' ? (
            /* ============================================================== */
            /* TAB 3: LOGIN / SELECT FROM EXISTING REAL STUDENTS              */
            /* ============================================================== */
            <div className="space-y-4">
              <div className="text-xs text-slate-300 flex items-center justify-between">
                <span>Chọn tài khoản để đăng nhập hoặc quản lý:</span>
                {filteredStudents.length > 0 && (
                  <div className="flex items-center gap-2">
                    {selectedUids.size > 0 ? (
                      <button
                        type="button"
                        onClick={handleDeselectAll}
                        className="text-[11px] font-bold text-slate-400 hover:text-slate-200 underline cursor-pointer"
                      >
                        Bỏ chọn ({selectedUids.size})
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSelectAll(filteredStudents)}
                        className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                      >
                        Chọn tất cả
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Search bar & Grade filter */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo họ tên, lớp hoặc mã (MH-...)"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
                  />
                </div>

                <select
                  value={gradeFilter}
                  onChange={e => setGradeFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                >
                  <option value="all">Tất cả khối</option>
                  <option value={6}>Khối 6</option>
                  <option value={7}>Khối 7</option>
                  <option value={8}>Khối 8</option>
                  <option value={9}>Khối 9</option>
                </select>
              </div>

              {/* Multi-selection Toolbar */}
              {selectedUids.size > 0 && (
                <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-500/50 flex items-center justify-between text-xs animate-fadeIn">
                  <div className="flex items-center gap-2 text-rose-300 font-bold">
                    <Trash2 className="w-4 h-4" />
                    <span>Đã chọn {selectedUids.size} tài khoản</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmDeleteModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-md cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <span>Lưu trữ / Xóa đã chọn</span>
                  </button>
                </div>
              )}

              {/* Student Cards List */}
              <div className="space-y-2 max-h-[44vh] overflow-y-auto pr-1">
                {isLoadingList ? (
                  <div className="p-8 text-center text-xs text-slate-500 italic">
                    Đang tải danh sách học sinh từ máy chủ...
                  </div>
                ) : filteredStudents.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-950/60 rounded-2xl border border-slate-800">
                    <p className="font-bold">Chưa có tài khoản học sinh nào.</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Hãy chuyển sang tab "1. Tạo mới" để đăng ký tài khoản thật của bạn!
                    </p>
                  </div>
                ) : (
                  filteredStudents.map(student => {
                    const isSelected = selectedUids.has(student.uid);
                    return (
                      <div
                        key={student.uid}
                        className={`p-3 rounded-2xl bg-slate-950 border transition-all flex items-center justify-between group ${
                          isSelected
                            ? 'border-rose-500/80 bg-rose-950/20'
                            : 'border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Selection Checkbox */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSelectStudent(student.uid);
                            }}
                            className="p-1 text-slate-400 hover:text-white cursor-pointer shrink-0"
                            title="Chọn để quản lý / xóa"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-rose-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-600" />
                            )}
                          </button>

                          <div
                            onClick={() => handleSelectStudent(student)}
                            className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
                          >
                            <div className="w-10 h-10 rounded-xl bg-slate-800 text-xl flex items-center justify-center border border-slate-700 group-hover:scale-105 transition-transform shrink-0">
                              {student.avatarEmoji || '🧑‍🎓'}
                            </div>
                            <div className="min-w-0">
                              <div className="font-black text-sm text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                                <span className="truncate">{student.displayName}</span>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500/20 text-cyan-300 border border-blue-500/30 shrink-0">
                                  {student.className}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                <span className="font-mono text-amber-400 font-bold">{student.accountCode}</span>
                                <span>•</span>
                                <span className="text-emerald-400 font-bold">{student.rp || 1200} RP</span>
                                {student.wins > 0 && (
                                  <>
                                    <span>•</span>
                                    <span className="text-rose-400 font-bold">{student.wins} Thắng</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSelectStudent(student)}
                          className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2 px-2.5 py-1.5 rounded-xl hover:bg-cyan-500/10 cursor-pointer"
                        >
                          <span>Đăng nhập</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : activeTab === 'archive' ? (
            /* ============================================================== */
            /* TAB 4: ARCHIVED ACCOUNTS & RESTORATION                         */
            /* ============================================================== */
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200">
                <div className="font-bold text-purple-300 flex items-center gap-1.5 mb-1">
                  <Archive className="w-4 h-4" />
                  <span>Khu vực Lưu Trữ An Toàn</span>
                </div>
                Các tài khoản đã xóa được bảo lưu nguyên vẹn 100% tài nguyên (Điểm RP, EXP, nhân vật đã mở khóa, tiến trình Boss) và có thể khôi phục lại bất kỳ lúc nào với <strong>Mã tài khoản gốc</strong>.
              </div>

              <div className="space-y-2 max-h-[46vh] overflow-y-auto pr-1">
                {archivedList.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-950/60 rounded-2xl border border-slate-800">
                    <p className="font-bold">Hiện không có tài khoản nào trong kho lưu trữ.</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Khi xóa tài khoản tại tab "2. Chọn tài khoản", dữ liệu sẽ được lưu tại đây.
                    </p>
                  </div>
                ) : (
                  archivedList.map(st => (
                    <div
                      key={st.uid}
                      className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 text-xl flex items-center justify-center border border-slate-700 shrink-0">
                          {st.avatarEmoji || '🧑‍🎓'}
                        </div>
                        <div className="min-w-0">
                          <div className="font-black text-sm text-slate-200 flex items-center gap-2">
                            <span className="truncate">{st.displayName}</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
                              {st.className}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-amber-400 font-bold">{st.accountCode}</span>
                            <span>•</span>
                            <span className="text-emerald-400">{st.rp || 1200} RP</span>
                            <span>•</span>
                            <span>{st.exp || 100} EXP</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRestoreAccount(st)}
                        disabled={isSubmitting}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ml-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Khôi phục</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            /* ============================================================== */
            /* TAB 5: RECOVER WITH ACCOUNT CODE / RECOVERY CODE               */
            /* ============================================================== */
            <form onSubmit={handleRecover} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                Nhập <strong>Mã tài khoản (MH-...)</strong> hoặc <strong>Mã khôi phục 6 số</strong> đã được cấp để lấy lại phiên đăng nhập trên thiết bị mới:
              </div>

              {recoveryError && (
                <div className="p-3 rounded-2xl bg-rose-950/80 border border-rose-500 text-rose-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{recoveryError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-300">
                  Mã tài khoản hoặc Mã khôi phục:
                </label>
                <input
                  type="text"
                  required
                  value={recoverCodeInput}
                  onChange={e => setRecoverCodeInput(e.target.value.toUpperCase())}
                  placeholder="Ví dụ: MH-6-9284 hoặc 839201"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-center font-mono font-black text-lg text-amber-400 placeholder-slate-600 focus:outline-none focus:border-amber-400 uppercase"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !recoverCodeInput.trim()}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 disabled:opacity-50 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <KeyRound className="w-5 h-5" />
                <span>{isSubmitting ? 'Đang khôi phục...' : 'Khôi Phục Quyền Truy Cập'}</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                Nếu bạn bị quên mã tài khoản, vui lòng liên hệ giáo viên bộ môn hoặc xem tại Bảng quản lý học sinh của giáo viên.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* CONFIRMATION MODAL: SOFT DELETE / ARCHIVE ACCOUNTS */}
      {showConfirmDeleteModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border-2 border-rose-500/80 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-white">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto text-2xl">
              <Archive className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="text-lg font-black text-rose-300">
                Xác nhận lưu trữ an toàn?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bạn có chắc chắn muốn lưu trữ <strong className="text-white">{selectedUids.size} tài khoản</strong> đã chọn?
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Bảo lưu 100% dữ liệu:</span>
              </div>
              <p>
                Toàn bộ điểm RP, cấp độ EXP, số trận thắng, nhân vật đã mở khóa và kỷ lục Boss được lưu trữ an toàn và có thể khôi phục bất cứ lúc nào trong mục <strong>"Tài khoản đã lưu trữ"</strong>.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmDeleteModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmSoftDelete}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-md cursor-pointer transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Xác nhận lưu trữ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

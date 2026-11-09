import React, { useState } from 'react';
import {
  GraduationCap,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  ShieldCheck,
  UserPlus,
  KeyRound,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { authService } from '../../services/authService';
import { studentAccountService, RegisteredStudent } from '../../services/studentAccountService';
import { UserAccount } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  // Role tab: Student or Teacher
  const [roleTab, setRoleTab] = useState<'student' | 'teacher'>('student');

  // Student mode: login with account code vs instant register
  const [studentMode, setStudentMode] = useState<'login' | 'register'>('login');
  const [accountCode, setAccountCode] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentGrade, setStudentGrade] = useState<number>(6);

  // Teacher credentials
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  if (!isOpen) return null;

  // Handle Student Login with Account Code
  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const code = accountCode.trim().toUpperCase();

    if (!code) {
      setErrorMessage('Vui lòng nhập Mã tài khoản học sinh của bạn (Ví dụ: MH-6A1-9409).');
      return;
    }

    setIsLoading(true);
    try {
      const res = await studentAccountService.loginStudent(code);
      setIsLoading(false);
      if (res.success && res.account) {
        const user = authService.setStudentSession(res.account);
        onLoginSuccess(user);
        onClose();
      } else {
        setErrorMessage(res.error || 'Không tìm thấy tài khoản với mã đã nhập. Vui lòng kiểm tra lại.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Mất kết nối máy chủ. Vui lòng thử lại.');
    }
  };

  // Handle Instant Student Registration (No password needed)
  const handleStudentRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const name = studentName.trim();

    if (!name) {
      setErrorMessage('Vui lòng nhập họ và tên của bạn.');
      return;
    }

    setIsLoading(true);
    try {
      const className = `Khối ${studentGrade}`;
      const res = await studentAccountService.registerStudent(name, className, studentGrade);
      setIsLoading(false);
      if (res.success && res.account) {
        setSuccessNotice(`Đăng ký thành công! Mã tài khoản của em: ${res.account.accountCode}`);
        const user = authService.setStudentSession(res.account);
        setTimeout(() => {
          onLoginSuccess(user);
          onClose();
        }, 1200);
      } else {
        setErrorMessage(res.error || 'Đăng ký tài khoản thất bại.');
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Mất kết nối máy chủ. Vui lòng thử lại.');
    }
  };

  // Handle Teacher Login with Username & Password
  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(r => setTimeout(r, 300));
      const user = await authService.login(username, password);
      // Clear student session if logging in as teacher
      studentAccountService.logout();
      setIsLoading(false);
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-100 my-auto animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Đóng cửa sổ đăng nhập"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title & Branding */}
        <div className="text-center space-y-2 mb-5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#2684FF] to-[#22C7E8] text-white flex items-center justify-center shadow-lg shadow-blue-500/25 mx-auto">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#172B4D] tracking-tight">
              Đăng nhập hệ thống
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5 font-medium">
              Chinh Phục Tri Thức Số • Năm học 2026–2027
            </p>
          </div>
        </div>

        {/* Role Switcher Tab (Học sinh vs Giáo viên) */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => {
              setRoleTab('student');
              setErrorMessage('');
            }}
            className={`py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              roleTab === 'student'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Dành cho Học sinh</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setRoleTab('teacher');
              setErrorMessage('');
            }}
            className={`py-2 px-3 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              roleTab === 'teacher'
                ? 'bg-white text-amber-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cán bộ & Giáo viên</span>
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Success Notice Box */}
        {successNotice && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-bold">{successNotice}</span>
          </div>
        )}

        {/* TAB 1: STUDENT LOGIN / REGISTER */}
        {roleTab === 'student' && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4 text-xs border-b border-slate-100 pb-2">
              <button
                type="button"
                onClick={() => {
                  setStudentMode('login');
                  setErrorMessage('');
                }}
                className={`font-bold pb-1 cursor-pointer transition-colors ${
                  studentMode === 'login'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Nhập Mã tài khoản
              </button>
              <button
                type="button"
                onClick={() => {
                  setStudentMode('register');
                  setErrorMessage('');
                }}
                className={`font-bold pb-1 cursor-pointer transition-colors ${
                  studentMode === 'register'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Đăng ký nhanh (5s)
              </button>
            </div>

            {studentMode === 'login' ? (
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#172B4D] mb-1.5 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                    Mã tài khoản học sinh
                  </label>
                  <input
                    type="text"
                    value={accountCode}
                    onChange={e => {
                      setAccountCode(e.target.value.toUpperCase());
                      setErrorMessage('');
                    }}
                    placeholder="Ví dụ: MH-6A1-9409 hoặc STU_..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2684FF] focus:ring-2 focus:ring-blue-500/20 text-sm font-mono font-bold text-[#172B4D] uppercase transition-colors"
                    disabled={isLoading}
                    autoFocus
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Nhập mã duy nhất được cấp khi đăng ký để khôi phục chính xác điểm tích lũy.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-[#2684FF] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading ? 'Đang kiểm tra tài khoản...' : 'Đăng nhập vào hệ thống'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleStudentRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#172B4D] mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    Họ và tên học sinh
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={e => {
                      setStudentName(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Nhập họ và tên của bạn..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2684FF] focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-[#172B4D] transition-colors"
                    disabled={isLoading}
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172B4D] mb-1.5">
                    Chọn khối lớp:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[6, 7, 8, 9].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setStudentGrade(g)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          studentGrade === g
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Khối {g}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer pt-2.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản & Đăng nhập ngay'}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: TEACHER LOGIN (USERNAME & PASSWORD) */}
        {roleTab === 'teacher' && (
          <form onSubmit={handleTeacherSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-600" />
                Tên đăng nhập Giáo viên
              </label>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={e => {
                  setUsername(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="teacher hoặc giaovien.tin..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-medium text-[#172B4D] transition-colors"
                disabled={isLoading}
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="Nhập mật khẩu..."
                  className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-medium text-[#172B4D] transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isLoading ? 'Đang xác thực...' : 'Đăng nhập Giáo viên'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

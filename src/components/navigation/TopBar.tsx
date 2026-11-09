import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Menu,
  GraduationCap,
  School,
  ChevronDown,
  LogIn,
  LogOut,
  Calendar,
  BookOpen,
  ArrowRight,
  X,
  Briefcase,
  Flame,
  Check
} from 'lucide-react';
import { GradeLevel, SubjectMeta, UserAccount, Lesson, SchoolAnnouncement } from '../../types';
import { SmartBackButton } from '../common/SmartBackButton';
import { SUBJECTS } from '../../data/mockData';

interface TopBarProps {
  onToggleMobileSidebar: () => void;
  grade: GradeLevel;
  subject: SubjectMeta;
  onOpenDrawer: () => void;
  onSelectGrade?: (grade: GradeLevel) => void;
  onSelectSubject?: (subject: SubjectMeta) => void;
  currentUser?: UserAccount | null;
  studentPoints?: number;
  onOpenLogin?: () => void;
  onLogout?: () => void;
  onOpenTeacherMode?: () => void;
  announcements: SchoolAnnouncement[];
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
  onGoBack?: () => void;
  canGoBack?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  onToggleMobileSidebar,
  grade,
  subject,
  onOpenDrawer,
  onSelectGrade,
  onSelectSubject,
  currentUser,
  studentPoints,
  onOpenLogin,
  onLogout,
  onOpenTeacherMode,
  announcements,
  lessons,
  onSelectLesson,
  onGoBack,
  canGoBack
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const gradeRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);

  const isTeacher = currentUser?.role === 'teacher';

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (gradeRef.current && !gradeRef.current.contains(e.target as Node)) {
        setIsGradeOpen(false);
      }
      if (subjectRef.current && !subjectRef.current.contains(e.target as Node)) {
        setIsSubjectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter lessons based on search query
  const filteredLessons = searchQuery.trim()
    ? lessons.filter(
        (l) =>
          l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.summary.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2EAF5] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-3.5 lg:gap-4">
          
          {/* Mobile Sidebar Toggle & Mobile Brand */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <button
              onClick={onToggleMobileSidebar}
              className="p-2 rounded-xl text-slate-600 hover:text-[#2684FF] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Mở menu điều hướng"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                MH
              </div>
              <span className="font-extrabold text-xs text-[#172B4D] hidden xs:inline">
                Chinh Phục Tri Thức Số
              </span>
            </div>
          </div>

          {/* Central Area: Thanh tìm kiếm & Nút Chọn lớp/môn */}
          <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
            {/* TopBar Smart Back Button */}
            {canGoBack && onGoBack && (
              <SmartBackButton
                onClick={onGoBack}
                label="Quay lại"
                size="sm"
                className="shrink-0 inline-flex"
              />
            )}
            
            {/* 1. THANH TÌM KIẾM BÀI HỌC, MÔN HỌC, CHỦ ĐỀ */}
            <div ref={searchRef} className="relative flex-1 min-w-[130px] max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Tìm bài học, môn học, chủ đề..."
                  className="w-full pl-9 pr-7 py-2 rounded-2xl bg-slate-100/90 hover:bg-slate-100 border border-transparent focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm text-[#172B4D] placeholder-slate-400 transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label="Xóa nội dung tìm kiếm"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Instant Search Results Dropdown */}
              {isSearchOpen && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fadeIn text-xs">
                  <div className="p-2.5 bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold flex items-center justify-between text-[11px]">
                    <span>Kết quả tìm kiếm cho "{searchQuery}"</span>
                    <span>{filteredLessons.length} bài học</span>
                  </div>
                  {filteredLessons.length > 0 ? (
                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                      {filteredLessons.map((les) => (
                        <div
                          key={les.id}
                          onClick={() => {
                            onSelectLesson(les);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="p-3 hover:bg-blue-50/60 cursor-pointer transition-colors flex items-start gap-3"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                            <BookOpen className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] text-blue-600 font-bold">
                              {les.chapter} · Khối {les.grade}
                            </div>
                            <div className="font-bold text-slate-800 truncate">
                              {les.title}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate">
                              {les.summary}
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 self-center" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-400 text-xs">
                      Không tìm thấy bài học phù hợp với từ khóa này.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. HAI NÚT TRƯỢT ĐỒNG BỘ: CHỌN KHỐI LỚP VÀ CHỌN MÔN HỌC */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* Nút trượt 1: CHỌN KHỐI (Khối 6, 7, 8, 9) */}
              <div ref={gradeRef} className="relative">
                <button
                  onClick={() => {
                    setIsGradeOpen(!isGradeOpen);
                    setIsSubjectOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-2xl bg-blue-50/90 hover:bg-blue-100 border border-blue-200/90 text-blue-700 font-extrabold text-xs transition-all cursor-pointer shadow-2xs"
                  title="Chọn khối lớp (Khối 6, 7, 8, 9)"
                >
                  <School className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
                  <span className="font-extrabold text-[#172B4D] whitespace-nowrap">
                    Khối {grade}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-blue-600 transition-transform duration-200 ${isGradeOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu Khối */}
                {isGradeOpen && (
                  <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-scaleUp py-1">
                    <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      Chọn khối lớp
                    </div>
                    {([6, 7, 8, 9] as GradeLevel[]).map((g) => {
                      const isSelected = g === grade;
                      return (
                        <button
                          key={g}
                          onClick={() => {
                            onSelectGrade?.(g);
                            setIsGradeOpen(false);
                          }}
                          className={`w-full px-3.5 py-2 text-left text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 text-blue-700 font-black'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-blue-600 ring-2 ring-blue-200' : 'bg-slate-300'}`} />
                            <span>Khối {g}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Nút trượt 2: CHỌN MÔN HỌC (11 môn GDPT 2018) */}
              <div ref={subjectRef} className="relative">
                <button
                  onClick={() => {
                    setIsSubjectOpen(!isSubjectOpen);
                    setIsGradeOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-2xl bg-indigo-50/90 hover:bg-indigo-100 border border-indigo-200/90 text-indigo-700 font-extrabold text-xs transition-all cursor-pointer shadow-2xs"
                  title="Chọn môn học THCS"
                >
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 shrink-0" />
                  <span className="font-extrabold text-[#172B4D] truncate max-w-[105px] sm:max-w-[135px] md:max-w-[170px]">
                    {subject.name}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-indigo-600 transition-transform duration-200 ${isSubjectOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu Môn học */}
                {isSubjectOpen && (
                  <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 w-60 sm:w-64 max-h-80 overflow-y-auto bg-white rounded-2xl shadow-xl border border-slate-100 z-50 animate-scaleUp py-1">
                    <div className="px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                      <span>Môn học GDPT 2018</span>
                      <span className="text-blue-600 font-bold">Khối {grade}</span>
                    </div>
                    {SUBJECTS.map((s) => {
                      const isSelected = s.id === subject.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => {
                            onSelectSubject?.(s);
                            setIsSubjectOpen(false);
                          }}
                          className={`w-full px-3.5 py-2 text-left text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-50 text-indigo-700 font-black'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                            <span className="truncate">{s.name}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 ml-1.5" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Right Group: 3. GIAO DIỆN CHỨC NĂNG ĐĂNG NHẬP / TÀI KHOẢN & 4. CHUÔNG THÔNG BÁO */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Student Points Badge on TopBar (Điểm tích lũy theo tài khoản học sinh) */}
            {currentUser && !isTeacher && (
              <div
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-2xs shrink-0"
                title={`Điểm tích lũy cá nhân: ${studentPoints ?? 0} điểm`}
              >
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 fill-orange-400 shrink-0" />
                <span className="font-mono font-black text-xs sm:text-sm text-orange-600">
                  {studentPoints ?? 0}
                </span>
                <span className="text-[10px] text-amber-800 font-bold hidden xs:inline">
                  điểm
                </span>
              </div>
            )}

            {/* GIAO DIỆN CHỨC NĂNG ĐĂNG NHẬP / TÀI KHOẢN */}
            <div ref={profileRef} className="relative shrink-0">
              {currentUser ? (
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:px-3 sm:py-2 rounded-2xl bg-slate-100/90 hover:bg-slate-200/90 transition-colors cursor-pointer border border-slate-200/60"
                  title="Thông tin tài khoản"
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0 ${
                      isTeacher ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                  >
                    {isTeacher ? 'GV' : 'HS'}
                  </div>
                  <div className="text-left hidden lg:block leading-tight">
                    <div className="font-bold text-xs text-[#172B4D] truncate max-w-[105px]">
                      {currentUser.displayName.replace(/THCS Mỹ Hòa\s*[-–•]?\s*/gi, '').trim()}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {isTeacher ? 'Cán bộ/GV' : `Học sinh Lớp ${currentUser.className || currentUser.grade || grade}`}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block shrink-0" />
                </button>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-2xl bg-[#2684FF] hover:bg-blue-600 text-white font-bold text-xs shadow-xs cursor-pointer transition-colors shrink-0"
                  title="Đăng nhập tài khoản"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Đăng nhập</span>
                </button>
              )}

              {/* Profile Dropdown Menu */}
              {isProfileOpen && currentUser && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn text-xs">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-extrabold text-[#172B4D] truncate">
                      {currentUser.displayName.replace(/THCS Mỹ Hòa\s*[-–•]?\s*/gi, '').trim()}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">Mã: {currentUser.username.toUpperCase()}</p>
                    {!isTeacher && (
                      <div className="mt-1.5 mb-1 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-orange-600 font-bold text-xs">
                        <Flame className="w-3.5 h-3.5 fill-orange-400" />
                        <span>Điểm tích lũy: <strong className="font-mono text-sm">{studentPoints ?? 0}</strong> điểm</span>
                      </div>
                    )}
                    <span
                      className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isTeacher ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {isTeacher ? 'Tài khoản Giáo viên' : `Học sinh Lớp ${currentUser.className || currentUser.grade || grade}`}
                    </span>
                  </div>
                  {isTeacher && (
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onOpenTeacherMode?.();
                      }}
                      className="w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-50 font-bold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      Mở Bàn làm việc GV
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onLogout?.();
                    }}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 font-bold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>

            {/* CHUÔNG THÔNG BÁO (Bên phải cụm đăng nhập) */}
            <div ref={notifRef} className="relative shrink-0">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 sm:p-2.5 rounded-2xl text-slate-600 hover:text-[#2684FF] hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200/60"
                aria-label="Thông báo nhà trường"
                title="Thông báo nhà trường"
              >
                <Bell className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
              </button>

              {/* Announcements Dropdown */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-fadeIn">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                      <Bell className="w-4 h-4" />
                      Thông báo
                    </div>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                      {announcements.length} mới
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 text-xs">
                    {announcements.map((item) => (
                      <div key={item.id} className="p-3.5 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                          <span className="flex items-center gap-1 font-semibold text-blue-600">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </span>
                          {item.priority && (
                            <span className="px-1.5 py-0.2 rounded-full bg-red-100 text-red-600 font-bold text-[9px]">
                              Ưu tiên
                            </span>
                          )}
                        </div>
                        <h5 className="font-bold text-[#172B4D] leading-snug">
                          {item.title}
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {item.content}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2.5 bg-slate-50 text-center border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                    Hệ thống thông báo học vụ năm học 2026–2027
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  GraduationCap,
  Layers,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Search,
  Check,
  ShieldCheck,
  Compass,
  Laptop,
  Calculator,
  Languages,
  Atom,
  Wrench,
  HeartHandshake,
  Palette,
  Activity,
  Music,
  Landmark,
  Link2,
  Edit3,
  X
} from 'lucide-react';
import { GradeLevel, SubjectId, Textbook, UserAccount } from '../../types';
import { SUBJECTS } from '../../data/mockData';
import { TextbookReaderModal } from '../../components/textbooks/TextbookReaderModal';
import { TextbookUrlModal } from '../../components/teacher/TextbookUrlModal';
import { SmartBackButton } from '../../components/common/SmartBackButton';

interface StudentTextbooksPageProps {
  textbooks: Textbook[];
  currentGrade: GradeLevel;
  currentSubjectId: SubjectId;
  onApplySubjectGrade: (grade: GradeLevel, subjectId: SubjectId) => void;
  currentUser: UserAccount | null;
  onAddTextbook: (b: Textbook) => Promise<any> | void;
  onUpdateTextbook: (b: Textbook) => Promise<any> | void;
  onOpenDrawer?: () => void;
  onBackToHome?: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Calculator,
  Languages,
  Atom,
  Compass,
  HeartHandshake,
  Laptop,
  Wrench,
  Music,
  Palette,
  Activity,
  Sparkles,
  Landmark
};

export const StudentTextbooksPage: React.FC<StudentTextbooksPageProps> = ({
  textbooks,
  currentGrade,
  currentSubjectId,
  onApplySubjectGrade,
  currentUser,
  onAddTextbook,
  onUpdateTextbook,
  onBackToHome
}) => {
  // Step navigation: 'grade' (Step 1) | 'subject' (Step 2) | 'books' (Step 3)
  const [currentStep, setCurrentStep] = useState<'grade' | 'subject' | 'books'>('grade');

  // Synchronized grade and subject selection with App and TopBar
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(currentGrade);
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(null);

  // Dropdown open state for Grade selector in header
  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);
  const gradeDropdownRef = useRef<HTMLDivElement>(null);
  const secondaryDropdownRef = useRef<HTMLDivElement>(null);

  const [readingBook, setReadingBook] = useState<Textbook | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Teacher URL Manager Modal state
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [editingUrlBook, setEditingUrlBook] = useState<Textbook | null>(null);

  const isTeacher = currentUser?.role === 'teacher';

  // Sync if parent currentGrade changes
  useEffect(() => {
    setSelectedGrade(currentGrade);
  }, [currentGrade]);

  // Click outside listener for grade dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedPrimary = gradeDropdownRef.current && gradeDropdownRef.current.contains(target);
      const clickedSecondary = secondaryDropdownRef.current && secondaryDropdownRef.current.contains(target);
      if (!clickedPrimary && !clickedSecondary) {
        setIsGradeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Selected subject metadata object
  const selectedSubjectObj = SUBJECTS.find((s) => s.id === selectedSubjectId);

  // Grade metadata descriptions
  const gradeInfo: Record<GradeLevel, { title: string; subtitle: string; badge: string; color: string; bgGradient: string }> = {
    6: {
      title: 'Khối 6',
      subtitle: 'Sách giáo khoa lớp 6 chuẩn Bộ GD&ĐT – GDPT 2018',
      badge: 'Chương trình GDPT 2018',
      color: 'from-blue-600 to-cyan-500',
      bgGradient: 'from-blue-500/10 via-cyan-500/5 to-transparent'
    },
    7: {
      title: 'Khối 7',
      subtitle: 'Sách giáo khoa lớp 7 chuẩn Bộ GD&ĐT – GDPT 2018',
      badge: 'Chương trình GDPT 2018',
      color: 'from-indigo-600 to-blue-500',
      bgGradient: 'from-indigo-500/10 via-blue-500/5 to-transparent'
    },
    8: {
      title: 'Khối 8',
      subtitle: 'Sách giáo khoa lớp 8 chuẩn Bộ GD&ĐT – GDPT 2018',
      badge: 'Chương trình GDPT 2018',
      color: 'from-purple-600 to-indigo-500',
      bgGradient: 'from-purple-500/10 via-indigo-500/5 to-transparent'
    },
    9: {
      title: 'Khối 9',
      subtitle: 'Sách giáo khoa lớp 9 chuẩn Bộ GD&ĐT & Ôn thi tuyển sinh vào 10',
      badge: 'Chương trình GDPT 2018',
      color: 'from-sky-600 to-blue-700',
      bgGradient: 'from-sky-500/10 via-blue-700/5 to-transparent'
    }
  };

  // Helper: Count textbooks for a specific subject and grade (including grade: 'all')
  const getSubjectBooksCount = (subjectId: SubjectId, grade: GradeLevel) => {
    return textbooks.filter((t) => {
      if (t.status !== 'published') return false;
      if (t.bookSet === 'Cánh Diều' || t.id.includes('canhdieu')) return false;
      const matchesGrade = t.grade === grade || (t.grade as any) === 'all';
      return matchesGrade && t.subjectId === subjectId;
    }).length;
  };

  // Helper: Count all textbooks for a grade (including grade: 'all')
  const getBookCountForGrade = (grade: GradeLevel) => {
    return textbooks.filter((t) => {
      if (t.status !== 'published') return false;
      if (t.bookSet === 'Cánh Diều' || t.id.includes('canhdieu')) return false;
      return t.grade === grade || (t.grade as any) === 'all';
    }).length;
  };

  // Filtered published books for the selected grade and subject
  const matchingBooks = textbooks.filter((book) => {
    if (book.status !== 'published') return false;
    // Exclude Cánh Diều per project guidelines
    if (book.bookSet === 'Cánh Diều' || book.id.includes('canhdieu')) return false;

    // Must match either specific grade OR marked for 'all' grades
    const matchesGrade = book.grade === selectedGrade || (book.grade as any) === 'all';
    if (!matchesGrade) return false;

    // Must match selected subject
    if (selectedSubjectId !== null && book.subjectId !== selectedSubjectId) return false;

    // Search strictly by book title per Part III.3 & V
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      return book.title.toLowerCase().includes(q);
    }
    return true;
  });

  // Action handlers
  const handleSelectGrade = (newGrade: GradeLevel) => {
    setSelectedGrade(newGrade);
    setIsGradeDropdownOpen(false);
    setSelectedSubjectId(null);
    setSearchTerm('');
    // BẮT BUỘC ĐỒNG BỘ: Cập nhật ngay Khối lớp lên App và TopBar
    onApplySubjectGrade(newGrade, currentSubjectId);
    setCurrentStep('subject');
  };

  const handleSelectSubject = (sId: SubjectId) => {
    setSelectedSubjectId(sId);
    setSearchTerm('');
    // BẮT BUỘC ĐỒNG BỘ: Cập nhật ngay Khối lớp & Môn học lên App và TopBar
    onApplySubjectGrade(selectedGrade, sId);
    setCurrentStep('books');
  };

  const handleChangeSubject = () => {
    setSelectedSubjectId(null);
    setSearchTerm('');
    setCurrentStep('subject');
  };

  const handleBackToSelectGrade = () => {
    setSelectedSubjectId(null);
    setSearchTerm('');
    setCurrentStep('grade');
  };

  const handleStepBack = () => {
    if (readingBook) {
      setReadingBook(null);
      return;
    }
    if (currentStep === 'books') {
      setCurrentStep('subject');
      return;
    }
    if (currentStep === 'subject') {
      setCurrentStep('grade');
      return;
    }
    if (currentStep === 'grade') {
      if (onBackToHome) {
        onBackToHome();
      }
    }
  };

  // Open URL Modal for teacher quick update
  const handleOpenUrlManager = (book?: Textbook) => {
    setEditingUrlBook(book || null);
    setIsUrlModalOpen(true);
  };

  const handleSaveBookUrl = async (book: Textbook, isUpdate: boolean) => {
    if (isUpdate) {
      await onUpdateTextbook(book);
    } else {
      await onAddTextbook(book);
    }
    setIsUrlModalOpen(false);
  };

  // Split SUBJECTS into two clear pedagogical groups: Môn học and Hoạt động giáo dục
  const academicSubjects = SUBJECTS.filter((s) => s.category !== 'hoat_dong_giao_duc');
  const educationalActivities = SUBJECTS.filter((s) => s.category === 'hoat_dong_giao_duc');

  return (
    <div className="space-y-6 pb-16 animate-fadeIn max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-900/10">
        <div className="relative z-10 max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white border border-white/20">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Thư viện sách giáo khoa điện tử</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            Sách Giáo Khoa Cấp THCS
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 font-normal leading-relaxed">
            Tra cứu và đọc sách giáo khoa điện tử chính thức các khối 6, 7, 8, 9 theo Chương trình GDPT 2018.
          </p>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <BookOpen className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* TEACHER TOOLBAR: HIỂN THỊ KHI ĐĂNG NHẬP VỚI VAI TRÒ GIÁO VIÊN */}
      {isTeacher && (
        <div className="bg-gradient-to-r from-amber-500/15 via-blue-500/10 to-indigo-500/15 border-2 border-amber-400/40 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500 text-white shadow-2xs">
                  Chức năng Giáo viên
                </span>
                <span className="text-xs font-extrabold text-slate-800">
                  {currentUser?.displayName ? currentUser.displayName.replace(/THCS Mỹ Hòa\s*[-–•]?\s*/gi, '').trim() : 'Giáo viên bộ môn'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Cập nhật nhanh đường link SGK cho Khối {selectedGrade}{' '}
                {selectedSubjectObj ? `• Môn ${selectedSubjectObj.name}` : ''} (hoặc áp dụng cho tất cả các khối).
              </p>
            </div>
          </div>

          <button
            onClick={() => handleOpenUrlManager()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-xs shadow-md shadow-amber-600/20 transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto hover:scale-[1.02]"
            title="Mở giao diện nhập và cập nhật đường link SGK"
          >
            <Link2 className="w-4 h-4" />
            <span>QUẢN LÝ LINK SÁCH GIÁO KHOA</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          CONTROL & BREADCRUMB BAR (TÍCH HỢP NÚT QUAY LẠI THÔNG MINH ĐA CẤP)
          - Nút Quay lại dùng chung thông minh: Quay lại đúng cấp trước đó
          - Breadcrumb điều hướng đa cấp: Sách giáo khoa > Khối X > Môn Y
          - Dropdown chọn Khối 6, 7, 8, 9 bo góc, đồng bộ tức thì
          ========================================================================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Nút Quay lại thông minh & Breadcrumbs navigation */}
        <div className="flex items-center gap-3 flex-wrap text-xs sm:text-sm">
          {/* Nút Quay lại thông minh: Điều hướng từng bước theo yêu cầu Phần 2 Trường hợp 1 */}
          <SmartBackButton
            onClick={handleStepBack}
            label="Quay lại"
            contextHint={
              currentStep === 'books'
                ? `Môn học Khối ${selectedGrade}`
                : currentStep === 'subject'
                ? 'Chọn khối lớp'
                : 'Trang chủ'
            }
          />

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <button
            onClick={handleBackToSelectGrade}
            className={`inline-flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
              currentStep === 'grade' ? 'text-blue-600 font-extrabold' : 'text-slate-500 hover:text-blue-600'
            }`}
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Sách giáo khoa</span>
          </button>

          {currentStep !== 'grade' && (
            <>
              <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              <button
                onClick={handleChangeSubject}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-800 font-extrabold border border-blue-200 transition-all cursor-pointer shadow-2xs group"
                title="Nhấn để đổi môn học của khối này"
              >
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Khối {selectedGrade}</span>
              </button>
            </>
          )}

          {currentStep === 'books' && selectedSubjectObj && (
            <>
              <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-100 text-indigo-900 font-extrabold border border-indigo-200">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>{selectedSubjectObj.name}</span>
              </span>
            </>
          )}
        </div>

        {/* Right: Dropdown Chọn Khối Lớp & Nút chuyển bước */}
        <div className="flex items-center gap-2.5 flex-wrap">
          
          {/* DROPDOWN CHỌN KHỐI LỚP (Khối 6, 7, 8, 9) */}
          <div ref={gradeDropdownRef} className="relative">
            <button
              onClick={() => setIsGradeDropdownOpen(!isGradeDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-2 border-blue-400 text-blue-800 font-black text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
              aria-label="Chọn khối lớp"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                {selectedGrade}
              </div>
              <span>Khối {selectedGrade}</span>
              <ChevronDown className={`w-4 h-4 text-blue-700 transition-transform duration-200 ${isGradeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isGradeDropdownOpen && (
              <div className="absolute right-0 sm:right-auto sm:left-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl border border-slate-200 p-2.5 z-40 animate-fadeIn space-y-1 text-xs">
                <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                  <span>CHỌN KHỐI LỚP THCS</span>
                  <span className="text-[10px] text-blue-600 font-bold">GDPT 2018</span>
                </div>

                {([6, 7, 8, 9] as GradeLevel[]).map((g) => {
                  const isCurrent = selectedGrade === g;
                  const count = getBookCountForGrade(g);
                  return (
                    <button
                      key={g}
                      onClick={() => handleSelectGrade(g)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer text-left ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-black scale-[1.01]'
                          : 'hover:bg-blue-50/70 text-slate-700 font-bold'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${
                            isCurrent ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {g}
                        </div>
                        <div>
                          <div className="font-extrabold text-xs">Khối {g}</div>
                          <div className={`text-[10px] ${isCurrent ? 'text-blue-100' : 'text-slate-400'}`}>
                            {gradeInfo[g].badge}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isCurrent ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {count} sách
                        </span>
                        {isCurrent && <Check className="w-4 h-4 text-white stroke-[3] ml-0.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action buttons based on current step */}
          {currentStep === 'books' && (
            <button
              onClick={handleChangeSubject}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đổi môn học</span>
            </button>
          )}

          {currentStep !== 'grade' && (
            <button
              onClick={handleBackToSelectGrade}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
              title="Quay lại chọn khối lớp khác"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Đổi khối lớp</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          BƯỚC 1: CHỌN KHỐI LỚP CỦA BẠN (MỤC III.1 TRONG YÊU CẦU)
          Gồm bốn lựa chọn: Khối 6, Khối 7, Khối 8, Khối 9
          ========================================================================= */}
      {currentStep === 'grade' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 animate-fadeIn">
          <div className="text-center max-w-2xl mx-auto space-y-2 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider border border-blue-200">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>BƯỚC 1: CHỌN KHỐI LỚP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#172B4D] tracking-tight uppercase">
              CHỌN KHỐI LỚP CỦA BẠN
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Vui lòng chọn khối lớp đang theo học để xem đầy đủ danh mục sách giáo khoa điện tử chính thức.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
            {([6, 7, 8, 9] as GradeLevel[]).map((g) => {
              const info = gradeInfo[g];
              const count = getBookCountForGrade(g);
              const isSelected = selectedGrade === g;

              return (
                <div
                  key={g}
                  onClick={() => handleSelectGrade(g)}
                  className={`p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-1.5 relative overflow-hidden bg-gradient-to-br ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-500/30 bg-blue-50/50'
                      : 'border-slate-200/90 hover:border-blue-400 bg-white'
                  }`}
                >
                  {/* Decorative background circle */}
                  <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-blue-500/5 group-hover:scale-150 transition-transform pointer-events-none" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-md bg-gradient-to-tr ${info.color} group-hover:scale-105 transition-transform`}
                      >
                        {g}
                      </div>

                      <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {count} đầu sách
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-[#172B4D] group-hover:text-blue-600 transition-colors">
                        Khối {g}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {info.subtitle}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{info.badge}</span>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-black text-blue-600 group-hover:text-blue-700">
                    <span>Chọn Khối {g}</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          BƯỚC 2: CHỌN MÔN HỌC (MỤC III.2 TRONG YÊU CẦU)
          Danh sách môn học phụ thuộc vào khối lớp đã chọn
          ========================================================================= */}
      {currentStep === 'subject' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-8 animate-fadeIn">
          
          {/* Header of Step 2 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider border border-blue-200 mb-2">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>BƯỚC 2: CHỌN MÔN HỌC</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#172B4D] tracking-tight uppercase flex items-center gap-2">
                <span>CHỌN MÔN HỌC</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Danh sách môn học Khối {selectedGrade} – Nhấn vào môn học để mở sách giáo khoa tương ứng.
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <button
                onClick={handleBackToSelectGrade}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
                title="Quay lại chọn khối khác"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Đổi khối lớp</span>
              </button>

              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-2xl border border-blue-200">
                <span className="text-xs font-black text-blue-700">
                  Khối {selectedGrade} ({getBookCountForGrade(selectedGrade)} sách)
                </span>
              </div>
            </div>
          </div>

          {/* NHÓM 1: CÁC MÔN HỌC THCS (11 MÔN) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-black text-[#172B4D] uppercase flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>1. CÁC MÔN HỌC THCS (11 MÔN)</span>
              </h3>
              <span className="text-[11px] font-bold text-slate-400">
                Khối {selectedGrade}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {academicSubjects.map((sub) => {
                const booksCount = getSubjectBooksCount(sub.id, selectedGrade);
                const hasBooks = booksCount > 0;
                const IconComp = ICON_MAP[sub.icon] || BookOpen;

                return (
                  <div
                    key={sub.id}
                    onClick={() => handleSelectSubject(sub.id)}
                    className={`p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-lg hover:-translate-y-1 bg-slate-50/40 hover:bg-white ${
                      hasBooks
                        ? 'border-slate-200 hover:border-blue-500'
                        : 'border-slate-200/60 opacity-85 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md bg-gradient-to-tr ${sub.bgGradient} group-hover:scale-105 transition-transform`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                            hasBooks
                              ? 'bg-blue-100 text-blue-700 border border-blue-200'
                              : 'bg-slate-200 text-slate-500 font-semibold'
                          }`}
                        >
                          {hasBooks ? `${booksCount} cuốn SGK` : '0 sách · Đang cập nhật'}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-black text-sm sm:text-base text-[#172B4D] group-hover:text-blue-600 transition-colors leading-snug">
                          {sub.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {sub.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-blue-600 group-hover:text-blue-700">
                      <span>Xem sách giáo khoa</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NHÓM 2: HOẠT ĐỘNG GIÁO DỤC & NỘI DUNG GIÁO DỤC ĐỊA PHƯƠNG TỈNH VĨNH LONG */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-black text-[#172B4D] uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>2. HOẠT ĐỘNG GIÁO DỤC & NỘI DUNG ĐỊA PHƯƠNG (VĨNH LONG)</span>
              </h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Đặc thù Vĩnh Long
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {educationalActivities.map((sub) => {
                const booksCount = getSubjectBooksCount(sub.id, selectedGrade);
                const hasBooks = booksCount > 0;
                const IconComp = ICON_MAP[sub.icon] || Sparkles;

                return (
                  <div
                    key={sub.id}
                    onClick={() => handleSelectSubject(sub.id)}
                    className="p-5 rounded-3xl border-2 border-emerald-200/80 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md bg-gradient-to-tr ${sub.bgGradient} group-hover:scale-105 transition-transform`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                            hasBooks
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-200 text-slate-500 font-semibold'
                          }`}
                        >
                          {hasBooks ? `${booksCount} tài liệu chính thức` : '0 tài liệu'}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-sm sm:text-base text-[#172B4D] group-hover:text-emerald-700 transition-colors leading-snug">
                            {sub.name}
                          </h4>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-600 text-white shadow-2xs">
                            Khối {selectedGrade}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed font-medium">
                          {sub.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-emerald-100 flex items-center justify-between text-xs font-black text-emerald-700 group-hover:text-emerald-800">
                      <span>Xem sách & tài liệu giáo dục</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          BƯỚC 3: HIỂN THỊ DANH SÁCH SÁCH GIÁO KHOA THEO KHỐI VÀ MÔN (MỤC III.3)
          ========================================================================= */}
      {currentStep === 'books' && selectedSubjectId !== null && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Subject Header & Search Bar */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md bg-gradient-to-tr ${
                  selectedSubjectObj?.bgGradient || 'from-blue-600 to-indigo-600'
                }`}
              >
                {selectedSubjectObj ? (
                  React.createElement(ICON_MAP[selectedSubjectObj.icon] || BookOpen, { className: 'w-6 h-6' })
                ) : (
                  <BookOpen className="w-6 h-6" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-800 border border-blue-200">
                    Khối {selectedGrade}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Môn học: <strong className="text-slate-800">{selectedSubjectObj?.name}</strong>
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-[#172B4D] mt-0.5">
                  Danh Mục Sách Giáo Khoa & Tài Liệu
                </h2>
              </div>
            </div>

            {/* Search Input & Action Buttons */}
            <div className="flex items-center gap-2 max-w-md w-full md:w-auto">
              {/* Strictly placeholder: "Tìm tên sách" per Section III.3 & V */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm tên sách"
                  className="w-full pl-9 pr-7 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Nút Giáo viên Cập nhật link SGK */}
              {isTeacher && (
                <button
                  onClick={() => handleOpenUrlManager()}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  title="Cập nhật link sách cho môn này"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cập nhật link</span>
                </button>
              )}

              <button
                onClick={handleChangeSubject}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0 cursor-pointer"
                title="Quay lại danh sách môn học"
              >
                Đổi môn
              </button>
            </div>
          </div>

          {/* Book Cards Grid - Tuân thủ nghiêm ngặt điều kiện đúng khối và môn */}
          {matchingBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingBooks.map((book) => {
                const isAllGrades = (book.grade as any) === 'all';
                return (
                  <div
                    key={book.id}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div>
                      {/* Ảnh bìa sách */}
                      <div className="relative h-48 bg-gradient-to-tr from-slate-800 via-blue-900 to-indigo-900 p-4 flex flex-col justify-between overflow-hidden">
                        {book.coverUrl ? (
                          <>
                            <img
                              src={book.coverUrl}
                              alt={book.title}
                              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-75"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                          </>
                        ) : null}

                        {/* Badges: Khối lớp & Chính thức */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-600 text-white shadow-sm">
                            {isAllGrades ? 'Dùng chung Khối 6–9' : `Khối ${book.grade}`}
                          </span>
                          
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-600/90 text-white shadow-sm backdrop-blur-xs flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Chính thức</span>
                          </span>
                        </div>

                        {/* Tên môn học & Tên sách trên bìa */}
                        <div className="relative z-10 text-white space-y-1">
                          <span className="text-[11px] text-blue-200 font-bold flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            {book.subjectName || selectedSubjectObj?.name}
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-white leading-tight line-clamp-2">
                            {book.title}
                          </h3>
                        </div>
                      </div>

                      {/* Thông tin mô tả sách */}
                      <div className="p-5 space-y-3">
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {book.description ||
                            `Sách giáo khoa điện tử ${book.title} chuẩn chương trình Giáo dục phổ thông 2018 dành cho học sinh khối ${book.grade}.`}
                        </p>

                        <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100 flex items-center justify-between">
                          <span>Ngày cập nhật:</span>
                          <span className="text-slate-600 font-semibold">
                            {new Date(book.updatedAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Nút Thao Tác: MỞ SÁCH + Nút sửa link dành riêng cho giáo viên */}
                    <div className="p-5 pt-0 space-y-2">
                      <button
                        onClick={() => setReadingBook(book)}
                        className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-all cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>MỞ SÁCH</span>
                      </button>

                      {isTeacher && (
                        <button
                          onClick={() => handleOpenUrlManager(book)}
                          className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          title="Chỉnh sửa đường link URL cho sách này"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                          <span>Sửa đường link URL</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Thông báo đúng câu chữ yêu cầu tại Mục III.3 */
            <div className="bg-white rounded-3xl p-10 sm:p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto space-y-4 animate-fadeIn my-6">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-[#172B4D] leading-snug">
                  Hiện chưa có sách giáo khoa cho khối lớp và môn học này. Vui lòng quay lại sau.
                </h3>
                <p className="text-xs text-slate-500">
                  Khối {selectedGrade} • Môn {selectedSubjectObj?.name}
                </p>
              </div>

              {isTeacher && (
                <div className="pt-2">
                  <button
                    onClick={() => handleOpenUrlManager()}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <Link2 className="w-4 h-4" />
                    <span>Cập nhật đường link cho môn này ngay</span>
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleChangeSubject}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Chọn môn học khác
                </button>
                <button
                  onClick={handleBackToSelectGrade}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Đổi khối lớp
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reader Modal */}
      <TextbookReaderModal
        book={readingBook}
        isOpen={readingBook !== null}
        onClose={() => setReadingBook(null)}
      />

      {/* Teacher URL Management Modal */}
      {isTeacher && (
        <TextbookUrlModal
          isOpen={isUrlModalOpen}
          onClose={() => setIsUrlModalOpen(false)}
          textbooks={textbooks}
          onSaveBook={handleSaveBookUrl}
          currentUser={currentUser}
          initialGrade={selectedGrade}
          initialSubjectId={selectedSubjectId || 'tin-hoc'}
          initialBook={editingUrlBook}
          onPreviewBook={(book) => {
            setIsUrlModalOpen(false);
            setReadingBook(book);
          }}
        />
      )}
    </div>
  );
};

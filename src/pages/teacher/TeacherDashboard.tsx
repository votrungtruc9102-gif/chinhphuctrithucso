import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  Film,
  FilePlus,
  ClipboardList,
  CheckSquare,
  Award,
  BarChart2,
  UserCheck,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  Download,
  FileText,
  Layers,
  ArrowRight,
  Eye,
  Calendar,
  Clock,
  Sparkles,
  X,
  FileCheck2,
  Link2,
  Users,
  Key,
  RefreshCw,
  Copy,
  Check,
  Archive,
  RotateCcw,
  Square
} from 'lucide-react';
import { studentAccountService, RegisteredStudent } from '../../services/studentAccountService';
import {
  GradeLevel,
  SubjectId,
  SubjectMeta,
  Question,
  Exam,
  Lesson,
  DifficultyLevel,
  LessonMedia,
  TeacherDocument,
  Assignment,
  AssignmentSubmission,
  UserAccount,
  Textbook
} from '../../types';
import { SUBJECTS } from '../../data/mockData';
import { LessonMediaManager } from '../../components/teacher/LessonMediaManager';
import { DocumentManager } from '../../components/teacher/DocumentManager';
import { AssignmentCreator } from '../../components/teacher/AssignmentCreator';
import { SubmissionsGradingManager } from '../../components/teacher/SubmissionsGradingManager';
import { LessonManager } from '../../components/teacher/LessonManager';
import { TextbookManager } from '../../components/teacher/TextbookManager';
import { SmartBackButton } from '../../components/common/SmartBackButton';

interface TeacherDashboardProps {
  questions: Question[];
  onAddQuestion: (q: Question) => void;
  onUpdateQuestion: (q: Question) => void;
  onDeleteQuestion: (id: string) => void;
  exams: Exam[];
  onAddExam: (e: Exam) => void;
  lessons: Lesson[];
  onAddLesson: (l: Lesson) => void;
  onUpdateLesson?: (l: Lesson) => void;
  onDeleteLesson?: (id: string) => void;
  documents: TeacherDocument[];
  onAddDocument: (d: TeacherDocument) => void;
  onUpdateDocument?: (d: TeacherDocument) => void;
  onDeleteDocument: (id: string) => void;
  mediaList: LessonMedia[];
  onAddMedia: (m: LessonMedia) => void;
  onUpdateMedia: (m: LessonMedia) => void;
  onDeleteMedia: (id: string) => void;
  assignments: Assignment[];
  onAddAssignment: (a: Assignment) => void;
  onUpdateAssignment: (a: Assignment) => void;
  onDeleteAssignment: (id: string) => void;
  submissions: AssignmentSubmission[];
  onGradeSubmission: (
    submissionId: string,
    score: number,
    feedback: string,
    gradedBy: string,
    questionScores?: Record<string, number>
  ) => void;
  textbooks: Textbook[];
  onAddTextbook: (b: Textbook) => Promise<any> | void;
  onUpdateTextbook: (b: Textbook) => Promise<any> | void;
  onDeleteTextbook: (id: string) => Promise<any> | void;
  onToggleTextbookStatus: (id: string) => Promise<any> | void;
  onLogout: () => void;
  currentGrade: GradeLevel;
  currentSubject: SubjectMeta;
  currentUser?: UserAccount | null;
  onSyncAll?: () => void;
  onBackToHome?: () => void;
}

// 12+ Modules per Phần II & IV
export type TeacherTab =
  | 'overview'       // 1. Tổng quan
  | 'students'       // Quản lý tài khoản học sinh (Không mật khẩu)
  | 'textbooks'      // Quản lý sách giáo khoa (SGK)
  | 'documents'      // 2. Quản lý sách và tài liệu
  | 'media'          // 3. Kho học liệu
  | 'lessons'        // 4. Quản lý bài học
  | 'create_assignment' // 5. Tạo bài tập
  | 'exams'          // 6. Quản lý đề kiểm tra
  | 'assign_tasks'   // 7. Giao bài cho học sinh
  | 'submissions'    // 8. Bài làm của học sinh
  | 'grading'        // 9. Chấm điểm và nhận xét
  | 'statistics'     // 10. Thống kê kết quả
  | 'profile'        // 11. Hồ sơ cá nhân
  | 'logout';        // 12. Đăng xuất

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  questions,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  exams,
  onAddExam,
  lessons,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
  documents,
  onAddDocument,
  onUpdateDocument,
  onDeleteDocument,
  mediaList,
  onAddMedia,
  onUpdateMedia,
  onDeleteMedia,
  assignments,
  onAddAssignment,
  onUpdateAssignment,
  onDeleteAssignment,
  submissions,
  onGradeSubmission,
  textbooks = [],
  onAddTextbook,
  onUpdateTextbook,
  onDeleteTextbook,
  onToggleTextbookStatus,
  onLogout,
  currentGrade,
  currentSubject,
  currentUser,
  onSyncAll,
  onBackToHome
}) => {
  const [activeTab, setActiveTab] = useState<TeacherTab>('overview');
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  // -----------------------------------------------------------------
  // REGISTERED STUDENTS STATE (Quản lý tài khoản học sinh không cần mật khẩu)
  // -----------------------------------------------------------------
  const [registeredStudents, setRegisteredStudents] = useState<RegisteredStudent[]>([]);
  const [archivedStudents, setArchivedStudents] = useState<RegisteredStudent[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [studentSearch, setStudentSearch] = useState('');
  const [studentGradeFilter, setStudentGradeFilter] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedStudentUids, setSelectedStudentUids] = useState<Set<string>>(new Set());
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [showArchivedSection, setShowArchivedSection] = useState(false);

  const loadRegisteredStudents = async () => {
    setIsLoadingStudents(true);
    try {
      const res = await fetch('/api/students/list?includeRecovery=true&forTeacher=true');
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.students || []);
      setRegisteredStudents(list);

      const resArchived = await fetch('/api/students/list?includeRecovery=true&forTeacher=true&showArchived=true');
      const dataArchived = await resArchived.json();
      setArchivedStudents(Array.isArray(dataArchived) ? dataArchived : (dataArchived.students || []));
    } catch (err) {
      console.error('Failed to load registered students:', err);
    } finally {
      setIsLoadingStudents(false);
    }
  };

  const handleTeacherArchive = async () => {
    if (selectedStudentUids.size === 0) return;
    try {
      const uids = Array.from(selectedStudentUids);
      const res = await studentAccountService.archiveStudents(uids);
      if (res.success) {
        setSelectedStudentUids(new Set());
        setIsConfirmDeleteOpen(false);
        await loadRegisteredStudents();
        alert(res.message || 'Đã lưu trữ an toàn các tài khoản học sinh đã chọn!');
      } else {
        alert(res.error || 'Lỗi khi lưu trữ tài khoản.');
      }
    } catch (err: any) {
      alert(err.message || 'Mất kết nối máy chủ.');
    }
  };

  const handleTeacherRestore = async (student: RegisteredStudent) => {
    try {
      const res = await studentAccountService.restoreStudent(student.uid);
      if (res.success) {
        await loadRegisteredStudents();
        alert(res.message || `Đã khôi phục thành công tài khoản của ${student.displayName}!`);
      } else {
        alert(res.error || 'Lỗi khi khôi phục tài khoản.');
      }
    } catch (err: any) {
      alert(err.message || 'Mất kết nối máy chủ.');
    }
  };

  useEffect(() => {
    loadRegisteredStudents();
  }, []);

  // -----------------------------------------------------------------
  // QUESTION BANK STATE (For Question Manager in Exam tab)
  // -----------------------------------------------------------------
  const [qSearch, setQSearch] = useState('');
  const [qGradeFilter, setQGradeFilter] = useState<string>('all');
  const [qSubjectFilter, setQSubjectFilter] = useState<string>('all');
  const [qDiffFilter, setQDiffFilter] = useState<string>('all');
  const [showAddQModal, setShowAddQModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const [newQGrade, setNewQGrade] = useState<GradeLevel>(currentGrade);
  const [newQSubject, setNewQSubject] = useState<SubjectId>(currentSubject.id);
  const [newQChapter, setNewQChapter] = useState('Chủ đề 1: Máy tính và cộng đồng');
  const [newQDiff, setNewQDiff] = useState<DifficultyLevel>('thong_hieu');
  const [newQContent, setNewQContent] = useState('');
  const [newQOptions, setNewQOptions] = useState<string[]>(['', '', '', '']);
  const [newQCorrectIdx, setNewQCorrectIdx] = useState<number>(0);
  const [newQExplanation, setNewQExplanation] = useState('');

  // -----------------------------------------------------------------
  // EXAM BUILDER STATE
  // -----------------------------------------------------------------
  const [bGrade, setBGrade] = useState<GradeLevel>(currentGrade);
  const [bSubject, setBSubject] = useState<SubjectId>(currentSubject.id);
  const [bTitle, setBTitle] = useState('Đề kiểm tra định kỳ học kỳ I');
  const [bDuration, setBDuration] = useState<number>(45);
  const [bExamType, setBExamType] = useState<'15_phut' | 'giua_ky' | 'cuoi_ky' | 'luyen_tap'>('giua_ky');
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set());

  // Filtered questions
  const filteredQuestions = questions.filter((q) => {
    if (qGradeFilter !== 'all' && q.grade.toString() !== qGradeFilter) return false;
    if (qSubjectFilter !== 'all' && q.subjectId !== qSubjectFilter) return false;
    if (qDiffFilter !== 'all' && q.difficulty !== qDiffFilter) return false;
    if (qSearch.trim()) {
      const term = qSearch.toLowerCase();
      if (!q.content.toLowerCase().includes(term) && !q.chapter.toLowerCase().includes(term)) {
        return false;
      }
    }
    return true;
  });

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQContent.trim() || newQOptions.some((opt) => !opt.trim())) {
      alert('Vui lòng điền đầy đủ nội dung câu hỏi và 4 phương án trả lời!');
      return;
    }

    if (editingQuestion) {
      const updated: Question = {
        ...editingQuestion,
        grade: newQGrade,
        subjectId: newQSubject,
        chapter: newQChapter,
        difficulty: newQDiff,
        content: newQContent.trim(),
        options: newQOptions.map((o) => o.trim()),
        correctAnswerIndex: newQCorrectIdx,
        explanation: newQExplanation.trim() || 'Đáp án theo hướng dẫn chấm của giáo viên.'
      };
      onUpdateQuestion(updated);
      setEditingQuestion(null);
    } else {
      const newQ: Question = {
        id: 'q-' + Date.now(),
        grade: newQGrade,
        subjectId: newQSubject,
        semester: 1,
        chapter: newQChapter,
        difficulty: newQDiff,
        content: newQContent.trim(),
        options: newQOptions.map((o) => o.trim()),
        correctAnswerIndex: newQCorrectIdx,
        explanation: newQExplanation.trim() || 'Đáp án theo hướng dẫn chấm của giáo viên.',
        author: currentUser?.displayName || 'Giáo viên bộ môn',
        createdDate: new Date().toISOString().split('T')[0]
      };
      onAddQuestion(newQ);
    }

    setShowAddQModal(false);
    setNewQContent('');
    setNewQOptions(['', '', '', '']);
    setNewQExplanation('');
  };

  const handleSaveExam = () => {
    if (selectedQuestionIds.size === 0) {
      alert('Vui lòng chọn ít nhất 1 câu hỏi cho đề kiểm tra!');
      return;
    }
    const newExam: Exam = {
      id: 'exam-' + Date.now(),
      title: bTitle,
      subjectId: bSubject,
      grade: bGrade,
      semester: 1,
      durationMinutes: bDuration,
      examType: bExamType,
      questionIds: Array.from(selectedQuestionIds),
      description: `Đề kiểm tra ${bDuration} phút được biên soạn bởi Tổ Chuyên Môn.`,
      isOfficial: true
    };
    onAddExam(newExam);
    alert('Đã tạo và lưu đề kiểm tra thành công vào hệ thống!');
    setSelectedQuestionIds(new Set());
  };

  // Menu items definitions
  const menuItems = [
    { id: 'overview' as TeacherTab, label: '1. Tổng quan', icon: LayoutDashboard },
    { id: 'students' as TeacherTab, label: 'QUẢN LÝ TÀI KHOẢN HỌC SINH', icon: Users, badge: registeredStudents.length },
    { id: 'textbooks' as TeacherTab, label: 'QUẢN LÝ LINK SÁCH GIÁO KHOA', icon: Link2, badge: textbooks.length },
    { id: 'documents' as TeacherTab, label: '2. Quản lý sách và tài liệu', icon: FolderOpen, badge: documents.length },
    { id: 'media' as TeacherTab, label: '3. Kho học liệu (Video & Ảnh)', icon: Film, badge: mediaList.length },
    { id: 'lessons' as TeacherTab, label: '4. Quản lý bài học', icon: BookOpen, badge: lessons.length },
    { id: 'create_assignment' as TeacherTab, label: '5. Tạo bài tập', icon: FilePlus },
    { id: 'exams' as TeacherTab, label: '6. Quản lý đề kiểm tra', icon: FileCheck2, badge: exams.length },
    { id: 'assign_tasks' as TeacherTab, label: '7. Giao bài cho học sinh', icon: ClipboardList, badge: assignments.length },
    { id: 'submissions' as TeacherTab, label: '8. Bài làm của học sinh', icon: CheckSquare, badge: submissions.length },
    { id: 'grading' as TeacherTab, label: '9. Chấm điểm và nhận xét', icon: Award },
    { id: 'statistics' as TeacherTab, label: '10. Thống kê kết quả', icon: BarChart2 },
    { id: 'profile' as TeacherTab, label: '11. Hồ sơ cá nhân', icon: UserCheck },
    { id: 'logout' as TeacherTab, label: '12. Đăng xuất', icon: LogOut }
  ];

  const handleMenuClick = (id: TeacherTab) => {
    if (id === 'logout') {
      if (window.confirm('Thầy/Cô có chắc chắn muốn đăng xuất khỏi Bàn làm việc Giáo viên?')) {
        onLogout();
      }
      return;
    }
    setActiveTab(id);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* ===================================================================== */}
      {/* 1. TOP HEADER BANNER */}
      {/* ===================================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#2684FF] text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <SmartBackButton
                onClick={() => {
                  if (activeTab !== 'overview') {
                    setActiveTab('overview');
                  } else if (onBackToHome) {
                    onBackToHome();
                  }
                }}
                label="Quay lại"
                contextHint={activeTab === 'overview' ? 'Trang chủ' : 'Tổng quan'}
                theme="tech-dark"
                size="sm"
              />
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <span>Chế độ Cán bộ & Giáo viên</span>
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              TRUNG TÂM QUẢN LÝ GIÁO VIÊN
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Năm học 2026–2027 • Quản lý toàn diện học liệu số, tạo bài tập, giao bài và chấm điểm tự luận.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('textbooks')}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 cursor-pointer transition-all flex items-center gap-1.5 hover:scale-[1.02]"
            title="Mở giao diện quản lý và cập nhật link sách giáo khoa"
          >
            <Link2 className="w-4 h-4" />
            QUẢN LÝ LINK SÁCH GIÁO KHOA
          </button>
          <button
            onClick={() => setActiveTab('create_assignment')}
            className="px-4 py-2.5 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs shadow-sm cursor-pointer transition-all flex items-center gap-1.5"
          >
            <FilePlus className="w-4 h-4" />
            + Tạo bài tập mới
          </button>
          <button
            onClick={() => {
              if (window.confirm('Thầy/Cô có chắc chắn muốn đăng xuất?')) {
                onLogout();
              }
            }}
            className="px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-red-500/80 text-white font-bold text-xs cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. HORIZONTAL SCROLL NAVIGATION MENU */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-3xl p-3 border border-[#E2EAF5] shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#2684FF] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.2 rounded-full font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODULE 1: TỔNG QUAN */}
      {/* ===================================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div
              onClick={() => setActiveTab('students')}
              className="bg-white p-4 rounded-3xl border border-indigo-200 bg-indigo-50/20 shadow-2xs space-y-1 cursor-pointer hover:border-indigo-400 transition-colors"
            >
              <span className="text-xs text-indigo-700 font-bold">Tài khoản học sinh</span>
              <div className="text-2xl font-black text-indigo-600">{registeredStudents.length}</div>
              <span className="text-[11px] text-indigo-500 font-semibold">Không cần mật khẩu</span>
            </div>

            <div
              onClick={() => setActiveTab('textbooks')}
              className="bg-white p-4 rounded-3xl border border-blue-200 bg-blue-50/20 shadow-2xs space-y-1 cursor-pointer hover:border-blue-400 transition-colors"
            >
              <span className="text-xs text-blue-700 font-bold">Sách giáo khoa (SGK)</span>
              <div className="text-2xl font-black text-blue-600">{textbooks.length}</div>
              <span className="text-[11px] text-blue-500 font-semibold">Khối 6–9 GDPT 2018</span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-[#E2EAF5] shadow-2xs space-y-1">
              <span className="text-xs text-slate-500 font-bold">Tài liệu & Giáo án</span>
              <div className="text-2xl font-black text-[#172B4D]">{documents.length}</div>
              <span className="text-[11px] text-slate-600 font-semibold">PDF, Word, PPT</span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-[#E2EAF5] shadow-2xs space-y-1">
              <span className="text-xs text-slate-500 font-bold">Bài tập đang mở</span>
              <div className="text-2xl font-black text-indigo-600">{assignments.length}</div>
              <span className="text-[11px] text-indigo-500 font-semibold">Khối 6–9</span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-amber-200 bg-amber-50/20 shadow-2xs space-y-1">
              <span className="text-xs text-amber-800 font-bold">Bài nộp chờ chấm</span>
              <div className="text-2xl font-black text-amber-600">
                {submissions.filter((s) => s.status === 'submitted').length}
              </div>
              <span className="text-[11px] text-amber-700 font-semibold">Cần đánh giá</span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-[#E2EAF5] shadow-2xs space-y-1">
              <span className="text-xs text-slate-500 font-bold">Ngân hàng câu hỏi</span>
              <div className="text-2xl font-black text-emerald-600">{questions.length}</div>
              <span className="text-[11px] text-emerald-600 font-semibold">Đa mức độ</span>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              onClick={() => setActiveTab('textbooks')}
              className="p-6 rounded-3xl bg-white border-2 border-amber-200 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer space-y-2 group bg-amber-50/10"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Link2 className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-[#172B4D] group-hover:text-amber-700 transition-colors">
                Quản lý link Sách giáo khoa
              </h4>
              <p className="text-xs text-slate-500">
                Cập nhật đường link URL sách giáo khoa trực tiếp theo khối và môn học, lưu trữ toàn bộ URL nguyên vẹn.
              </p>
            </div>

            <div
              onClick={() => setActiveTab('documents')}
              className="p-6 rounded-3xl bg-white border border-[#E2EAF5] hover:border-blue-400 hover:shadow-md transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <FolderOpen className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-[#172B4D] group-hover:text-blue-600 transition-colors">
                Quản lý Sách & Tài liệu
              </h4>
              <p className="text-xs text-slate-500">
                Tải lên tệp giáo án, slide bài giảng, tóm tắt nội dung và tạo câu hỏi tự động.
              </p>
            </div>

            <div
              onClick={() => setActiveTab('create_assignment')}
              className="p-6 rounded-3xl bg-white border border-[#E2EAF5] hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <FilePlus className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-[#172B4D] group-hover:text-indigo-600 transition-colors">
                Biên soạn Bài tập mới
              </h4>
              <p className="text-xs text-slate-500">
                Tạo đề trắc nghiệm, đúng/sai, điền từ, tự luận và bài tập thực hành theo khối lớp.
              </p>
            </div>

            <div
              onClick={() => setActiveTab('submissions')}
              className="p-6 rounded-3xl bg-white border border-[#E2EAF5] hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-[#172B4D] group-hover:text-emerald-600 transition-colors">
                Bài làm của học sinh
              </h4>
              <p className="text-xs text-slate-500">
                Xem danh sách nộp bài, chấm điểm bài tự luận và gửi nhận xét tới học sinh.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE CONTEXTUAL BACK BAR */}
      {activeTab !== 'overview' && (
        <div className="flex items-center justify-between p-3.5 px-4 bg-white rounded-2xl border border-[#E2EAF5] shadow-xs">
          <SmartBackButton
            onClick={() => setActiveTab('overview')}
            label="Quay lại Tổng quan giáo viên"
            contextHint="Dashboard"
            size="sm"
          />
          <div className="text-xs text-slate-500 font-semibold hidden sm:flex items-center gap-1.5">
            <span>Đang làm việc:</span>
            <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
              {menuItems.find(m => m.id === activeTab)?.label || activeTab}
            </span>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODULE: QUẢN LÝ SÁCH GIÁO KHOA (Per Phần IV) */}
      {/* ===================================================================== */}
      {activeTab === 'textbooks' && (
        <TextbookManager
          textbooks={textbooks}
          onAddTextbook={onAddTextbook}
          onUpdateTextbook={onUpdateTextbook}
          onDeleteTextbook={onDeleteTextbook}
          onToggleStatus={onToggleTextbookStatus}
          currentUser={currentUser || null}
        />
      )}

      {/* ===================================================================== */}
      {/* MODULE 2: QUẢN LÝ TÀI LIỆU (Per Phần III) */}
      {/* ===================================================================== */}
      {activeTab === 'documents' && (
        <DocumentManager
          documents={documents}
          onAddDocument={onAddDocument}
          onUpdateDocument={onUpdateDocument}
          onDeleteDocument={onDeleteDocument}
          currentGrade={currentGrade}
          currentSubject={currentSubject}
          lessons={lessons}
          onDeleteLesson={onDeleteLesson}
          isTeacher={currentUser?.role === 'teacher'}
          onUseQuestionsInAssignment={(qs, topic) => {
            setActiveTab('create_assignment');
          }}
          onSyncAll={onSyncAll}
        />
      )}

      {/* ===================================================================== */}
      {/* MODULE 3: KHO HỌC LIỆU (VIDEOS & HÌNH ẢNH) */}
      {/* ===================================================================== */}
      {activeTab === 'media' && (
        <LessonMediaManager
          lessons={lessons}
          mediaList={mediaList}
          onAddMedia={onAddMedia}
          onUpdateMedia={onUpdateMedia}
          onDeleteMedia={onDeleteMedia}
          currentGrade={currentGrade}
          currentSubject={currentSubject}
        />
      )}

      {/* ===================================================================== */}
      {/* MODULE 4: QUẢN LÝ BÀI HỌC (17 BÀI TIN HỌC 6 VÀ CÁC MÔN) */}
      {/* ===================================================================== */}
      {activeTab === 'lessons' && (
        <LessonManager
          lessons={lessons}
          documents={documents}
          onAddLesson={onAddLesson}
          onUpdateLesson={onUpdateLesson || onAddLesson}
          onDeleteLesson={onDeleteLesson || (() => {})}
          currentGrade={currentGrade}
          currentSubject={currentSubject}
          onSyncAll={onSyncAll}
        />
      )}

      {/* ===================================================================== */}
      {/* MODULE 5: TẠO BÀI TẬP (Per Phần IV) */}
      {/* ===================================================================== */}
      {activeTab === 'create_assignment' && (
        <AssignmentCreator
          currentGrade={currentGrade}
          currentSubject={currentSubject}
          documents={documents}
          initialAssignment={editingAssignment}
          onSaveAssignment={(newAsg) => {
            if (editingAssignment) {
              onUpdateAssignment(newAsg);
              setEditingAssignment(null);
            } else {
              onAddAssignment(newAsg);
            }
            setActiveTab('assign_tasks');
          }}
          onCancel={() => {
            setEditingAssignment(null);
            setActiveTab('assign_tasks');
          }}
        />
      )}

      {/* ===================================================================== */}
      {/* MODULE 6: QUẢN LÝ ĐỀ KIỂM TRA & NGÂN HÀNG CÂU HỎI */}
      {/* ===================================================================== */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-[#172B4D]">
                Ngân hàng đề thi & Quản lý câu hỏi ({questions.length} câu • {exams.length} đề)
              </h3>
              <p className="text-xs text-slate-500">
                Soạn câu hỏi trắc nghiệm, tạo đề thi định kỳ 15 phút, giữa kỳ và cuối kỳ.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingQuestion(null);
                  setNewQContent('');
                  setNewQOptions(['', '', '', '']);
                  setNewQExplanation('');
                  setShowAddQModal(true);
                }}
                className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                Thêm câu hỏi trắc nghiệm
              </button>
            </div>
          </div>

          {/* Questions list */}
          <div className="space-y-3">
            {filteredQuestions.slice(0, 10).map((q, idx) => (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 shadow-2xs space-y-2 text-xs"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                      Lớp {q.grade} • {q.chapter}
                    </span>
                    <span className="text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-md">
                      {q.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingQuestion(q);
                        setNewQGrade(q.grade);
                        setNewQSubject(q.subjectId);
                        setNewQChapter(q.chapter);
                        setNewQDiff(q.difficulty);
                        setNewQContent(q.content);
                        setNewQOptions([...q.options]);
                        setNewQCorrectIdx(q.correctAnswerIndex);
                        setNewQExplanation(q.explanation);
                        setShowAddQModal(true);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteQuestion(q.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="font-bold text-slate-800 text-sm leading-snug">{q.content}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-600">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`p-2 rounded-xl border flex items-center gap-2 ${
                        oIdx === q.correctAnswerIndex
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <span className="w-5 h-5 rounded bg-white flex items-center justify-center font-bold text-[10px] shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="truncate">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODULE 7: GIAO BÀI CHO HỌC SINH (ASSIGNMENTS LIST) */}
      {/* ===================================================================== */}
      {activeTab === 'assign_tasks' && (
        <div className="bg-white rounded-3xl p-6 border border-[#E2EAF5] shadow-xs space-y-5 text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-[#172B4D]">
                Danh sách bài tập đã giao ({assignments.length} bài)
              </h3>
              <p className="text-xs text-slate-500">
                Quản lý các bài tập đang mở, chỉnh sửa hạn nộp hoặc tạo bài tập mới.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingAssignment(null);
                setActiveTab('create_assignment');
              }}
              className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Tạo bài tập mới
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {assignments.map((asg) => (
              <div key={asg.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">
                      Khối {asg.grade} • {asg.chapter}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        asg.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {asg.status === 'published' ? 'Đã giao' : 'Bản nháp'}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800">{asg.title}</h4>
                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span>Hạn nộp: {new Date(asg.dueDate).toLocaleDateString('vi-VN')}</span>
                    <span>•</span>
                    <span>{asg.questions.length} câu hỏi</span>
                    <span>•</span>
                    <span>Điểm tối đa: {asg.maxPoints}đ</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setEditingAssignment(asg);
                      setActiveTab('create_assignment');
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold cursor-pointer"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Thầy/Cô có chắc chắn muốn xóa bài tập "${asg.title}"?`)) {
                        onDeleteAssignment(asg.id);
                      }
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    title="Xóa bài tập"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODULE 8 & 9: BÀI LÀM CỦA HỌC SINH & CHẤM ĐIỂM (Per Phần VI) */}
      {/* ===================================================================== */}
      {(activeTab === 'submissions' || activeTab === 'grading') && (
        <SubmissionsGradingManager
          assignments={assignments}
          submissions={submissions}
          onGradeSubmission={onGradeSubmission}
          currentGrade={currentGrade}
          currentSubject={currentSubject}
        />
      )}

      {/* ===================================================================== */}
      {/* MODULE 10: THỐNG KÊ KẾT QUẢ */}
      {/* ===================================================================== */}
      {activeTab === 'statistics' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAF5] shadow-xs space-y-6 text-xs">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-extrabold text-[#172B4D]">
              Báo cáo & Thống kê Chất lượng Học tập
            </h3>
            <p className="text-xs text-slate-500">
              Tổng hợp điểm thi, tỷ lệ hoàn thành bài tập các khối 6, 7, 8, 9.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
              <span className="font-bold text-blue-900">Tỷ lệ nộp bài đúng hạn</span>
              <div className="text-2xl font-black text-blue-700">92.4%</div>
              <p className="text-[11px] text-blue-600">Đạt chỉ tiêu kế hoạch năm học</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-900">Điểm trung bình toàn trường</span>
              <div className="text-2xl font-black text-emerald-700">8.2 / 10</div>
              <p className="text-[11px] text-emerald-600">Khối 6 đạt kết quả cao nhất</p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1">
              <span className="font-bold text-purple-900">Học sinh tích cực tham gia</span>
              <div className="text-2xl font-black text-purple-700">324 / 340</div>
              <p className="text-[11px] text-purple-600">Tương tác trực tuyến thường xuyên</p>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODULE: QUẢN LÝ TÀI KHOẢN HỌC SINH (KHÔNG CẦN MẬT KHẨU) */}
      {/* ===================================================================== */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          {/* Top Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white border border-indigo-400/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 flex items-center justify-center shrink-0 text-2xl shadow-inner">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Dữ liệu thực tế · Lưu vĩnh viễn trên máy chủ</span>
                </div>
                <h3 className="text-xl font-black">QUẢN LÝ TÀI KHOẢN HỌC SINH</h3>
                <p className="text-xs text-indigo-200 mt-0.5">
                  Quy trình đăng ký tinh gọn: Chỉ cần Họ tên + Lớp (không mật khẩu). Giáo viên có toàn quyền xem mã tài khoản, mã khôi phục và thành tích học sinh.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={loadRegisteredStudents}
                disabled={isLoadingStudents}
                className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingStudents ? 'animate-spin' : ''}`} />
                <span>Làm mới</span>
              </button>
            </div>
          </div>

          {/* Tab Switcher: Hoạt động vs Đã lưu trữ */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
              <button
                onClick={() => setShowArchivedSection(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  !showArchivedSection
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Tài khoản đang hoạt động ({registeredStudents.length})</span>
              </button>

              <button
                onClick={() => setShowArchivedSection(true)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  showArchivedSection
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-purple-700 hover:bg-purple-50'
                }`}
              >
                <Archive className="w-4 h-4" />
                <span>Tài khoản đã lưu trữ ({archivedStudents.length})</span>
              </button>
            </div>

            {!showArchivedSection && registeredStudents.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (selectedStudentUids.size === registeredStudents.length) {
                      setSelectedStudentUids(new Set());
                    } else {
                      setSelectedStudentUids(new Set(registeredStudents.map(s => s.uid)));
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  {selectedStudentUids.size === registeredStudents.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                </button>

                {selectedStudentUids.size > 0 && (
                  <button
                    onClick={() => setIsConfirmDeleteOpen(true)}
                    className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Lưu trữ / Xóa đã chọn ({selectedStudentUids.size})</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quick Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-3xl bg-white border border-indigo-200 bg-indigo-50/20 space-y-1">
              <span className="text-xs text-indigo-700 font-bold">Tổng tài khoản</span>
              <div className="text-2xl font-black text-indigo-600">{registeredStudents.length}</div>
              <span className="text-[11px] text-indigo-500 font-semibold">Đã đăng ký thật</span>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-blue-200 bg-blue-50/20 space-y-1">
              <span className="text-xs text-blue-700 font-bold">Khối 6</span>
              <div className="text-2xl font-black text-blue-600">
                {registeredStudents.filter(s => s.grade === 6).length}
              </div>
              <span className="text-[11px] text-blue-500 font-semibold">Học sinh</span>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-teal-200 bg-teal-50/20 space-y-1">
              <span className="text-xs text-teal-700 font-bold">Khối 7</span>
              <div className="text-2xl font-black text-teal-600">
                {registeredStudents.filter(s => s.grade === 7).length}
              </div>
              <span className="text-[11px] text-teal-500 font-semibold">Học sinh</span>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-amber-200 bg-amber-50/20 space-y-1">
              <span className="text-xs text-amber-700 font-bold">Khối 8</span>
              <div className="text-2xl font-black text-amber-600">
                {registeredStudents.filter(s => s.grade === 8).length}
              </div>
              <span className="text-[11px] text-amber-500 font-semibold">Học sinh</span>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-rose-200 bg-rose-50/20 space-y-1">
              <span className="text-xs text-rose-700 font-bold">Khối 9</span>
              <div className="text-2xl font-black text-rose-600">
                {registeredStudents.filter(s => s.grade === 9).length}
              </div>
              <span className="text-[11px] text-rose-500 font-semibold">Học sinh</span>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-emerald-200 bg-emerald-50/20 space-y-1">
              <span className="text-xs text-emerald-700 font-bold">Tổng trận thắng</span>
              <div className="text-2xl font-black text-emerald-600">
                {registeredStudents.reduce((acc, s) => acc + (s.wins || 0), 0)}
              </div>
              <span className="text-[11px] text-emerald-500 font-semibold">Đấu trường & Boss</span>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="p-4 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  placeholder="Tìm theo họ tên, lớp, mã TK..."
                  className="w-full pl-9 pr-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:bg-white"
                />
              </div>

              {studentSearch && (
                <button
                  onClick={() => setStudentSearch('')}
                  className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                >
                  Xóa tìm
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <span className="text-xs text-slate-500 font-bold shrink-0">Lọc theo khối:</span>
              {[
                { id: 'all', label: 'Tất cả' },
                { id: '6', label: 'Khối 6' },
                { id: '7', label: 'Khối 7' },
                { id: '8', label: 'Khối 8' },
                { id: '9', label: 'Khối 9' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setStudentGradeFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    studentGradeFilter === tab.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {!showArchivedSection ? (
            /* Student Table: ACTIVE ACCOUNTS */
            <div className="bg-white rounded-3xl border border-[#E2EAF5] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-black">
                      <th className="py-3 px-3 w-10 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedStudentUids.size === registeredStudents.length) {
                              setSelectedStudentUids(new Set());
                            } else {
                              setSelectedStudentUids(new Set(registeredStudents.map(s => s.uid)));
                            }
                          }}
                          className="cursor-pointer"
                          title="Chọn tất cả"
                        >
                          {registeredStudents.length > 0 && selectedStudentUids.size === registeredStudents.length ? (
                            <CheckSquare className="w-4 h-4 text-indigo-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      </th>
                      <th className="py-3 px-2 w-10 text-center">STT</th>
                      <th className="py-3 px-4">HỌ VÀ TÊN HỌC SINH</th>
                      <th className="py-3 px-3 text-center">LỚP</th>
                      <th className="py-3 px-4">MÃ TÀI KHOẢN (DUY NHẤT)</th>
                      <th className="py-3 px-4">MÃ KHÔI PHỤC (6 SỐ)</th>
                      <th className="py-3 px-4 text-center">ĐIỂM RP / EXP</th>
                      <th className="py-3 px-4 text-center">THÀNH TÍCH (W/L/BOSS)</th>
                      <th className="py-3 px-4">NGÀY ĐĂNG KÝ</th>
                      <th className="py-3 px-4 text-center">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {registeredStudents
                      .filter(s => {
                        if (studentGradeFilter !== 'all' && s.grade.toString() !== studentGradeFilter) return false;
                        if (studentSearch.trim()) {
                          const term = studentSearch.toLowerCase();
                          const sName = (s.fullName || s.displayName || '').toLowerCase();
                          return (
                            sName.includes(term) ||
                            s.className.toLowerCase().includes(term) ||
                            s.accountCode.toLowerCase().includes(term)
                          );
                        }
                        return true;
                      })
                      .map((st, idx) => {
                        const totalGames = (st.wins || 0) + (st.losses || 0);
                        const winRate = totalGames > 0 ? Math.round(((st.wins || 0) / totalGames) * 100) : 0;
                        const studentName = st.fullName || st.displayName || 'Học sinh';
                        const isSelected = selectedStudentUids.has(st.uid);
                        return (
                          <tr
                            key={st.accountCode}
                            className={`transition-colors ${isSelected ? 'bg-indigo-50/60' : 'hover:bg-slate-50/80'}`}
                          >
                            <td className="py-3.5 px-3 text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  const next = new Set(selectedStudentUids);
                                  if (next.has(st.uid)) next.delete(st.uid);
                                  else next.add(st.uid);
                                  setSelectedStudentUids(next);
                                }}
                                className="cursor-pointer"
                              >
                                {isSelected ? (
                                  <CheckSquare className="w-4 h-4 text-indigo-600" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-300 hover:text-slate-500" />
                                )}
                              </button>
                            </td>
                            <td className="py-3.5 px-2 text-center font-bold text-slate-400">
                              {idx + 1}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                                  {studentName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-extrabold text-slate-800 text-sm">
                                    {studentName}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-mono">
                                    ID: {st.uid.slice(0, 10)}...
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-3 text-center">
                              <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-extrabold text-xs">
                                {st.className}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 rounded-xl bg-slate-900 text-amber-300 font-mono font-black text-xs tracking-wider border border-slate-800">
                                  {st.accountCode}
                                </span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard?.writeText(st.accountCode);
                                    setCopiedCode(st.accountCode);
                                    setTimeout(() => setCopiedCode(null), 2000);
                                  }}
                                  title="Sao chép mã tài khoản"
                                  className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 cursor-pointer"
                                >
                                  {copiedCode === st.accountCode ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-700 font-mono font-extrabold text-xs tracking-wider border border-amber-200">
                                  🔑 {st.recoveryCode || 'Chưa cấp'}
                                </span>
                                {st.recoveryCode && (
                                  <button
                                    onClick={() => {
                                      navigator.clipboard?.writeText(st.recoveryCode || '');
                                      setCopiedCode(st.recoveryCode || '');
                                      setTimeout(() => setCopiedCode(null), 2000);
                                    }}
                                    title="Sao chép mã khôi phục"
                                    className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 cursor-pointer"
                                  >
                                    {copiedCode === st.recoveryCode ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <div className="font-black text-amber-600">
                                {(st.ratingPoints || 1000).toLocaleString('vi-VN')} RP
                              </div>
                              <div className="text-[10px] text-slate-400">
                                Lv.{st.level || 1} ({st.exp || 0} EXP)
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <div className="font-extrabold text-emerald-600">
                                {st.wins || 0}W - {st.losses || 0}L ({winRate}%)
                              </div>
                              <div className="text-[10px] text-rose-600 font-semibold">
                                Boss hạ: {(st.bossesDefeated || []).length} / 50
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                              {st.registeredAt ? new Date(st.registeredAt).toLocaleDateString('vi-VN') : 'Mới'}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => {
                                    const info = `THÔNG TIN TÀI KHOẢN HỌC SINH:\n• Họ và tên: ${studentName}\n• Lớp: ${st.className}\n• Mã tài khoản: ${st.accountCode}\n• Mã khôi phục: ${st.recoveryCode || 'Chưa cấp'}\n(Dùng để đăng nhập hoặc khôi phục tài khoản trên website)`;
                                    navigator.clipboard?.writeText(info);
                                    alert(`Đã sao chép toàn bộ thông tin đăng nhập của học sinh ${studentName} (${st.className})! Thầy/Cô có thể gửi trực tiếp cho học sinh.`);
                                  }}
                                  className="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors cursor-pointer"
                                >
                                  Gửi thông tin
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedStudentUids(new Set([st.uid]));
                                    setIsConfirmDeleteOpen(true);
                                  }}
                                  className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                  title="Lưu trữ tài khoản"
                                >
                                  <Archive className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>

                {registeredStudents.length === 0 && (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
                      👥
                    </div>
                    <h4 className="font-bold text-slate-700">Chưa có tài khoản học sinh nào đăng ký</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Học sinh có thể tự đăng ký tài khoản nhanh chóng tại trang Trò chơi học tập bằng Họ tên và Lớp, không cần mật khẩu.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Student Table: ARCHIVED ACCOUNTS */
            <div className="space-y-4">
              <div className="p-4 rounded-3xl bg-purple-50 border border-purple-200 text-purple-900 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Archive className="w-5 h-5 text-purple-600 shrink-0" />
                  <span>
                    Các tài khoản trong danh sách này được bảo lưu nguyên vẹn toàn bộ điểm RP, EXP, cấp độ và kỷ lục. Thầy/Cô có thể <strong>Khôi phục tài khoản</strong> bất cứ lúc nào với mã tài khoản gốc.
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#E2EAF5] shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-black">
                      <th className="py-3 px-4 w-12 text-center">STT</th>
                      <th className="py-3 px-4">HỌ VÀ TÊN</th>
                      <th className="py-3 px-3 text-center">LỚP</th>
                      <th className="py-3 px-4">MÃ TÀI KHOẢN GỐC</th>
                      <th className="py-3 px-4 text-center">ĐIỂM RP / EXP</th>
                      <th className="py-3 px-4">NGÀY LƯU TRỮ</th>
                      <th className="py-3 px-4 text-center">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {archivedStudents.map((st, idx) => (
                      <tr key={st.uid} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                          {idx + 1}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-800">
                          {st.fullName || st.displayName}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                            {st.className}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-indigo-700">
                          {st.accountCode}
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-amber-600">
                          {st.rp || 1200} RP · {st.exp || 100} EXP
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                          {st.archivedAt ? new Date(st.archivedAt).toLocaleDateString('vi-VN') : 'Đã lưu trữ'}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleTeacherRestore(st)}
                            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 mx-auto cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Khôi phục tài khoản</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {archivedStudents.length === 0 && (
                  <div className="text-center py-12 space-y-2 text-slate-400 text-xs">
                    <p className="font-bold">Hiện không có tài khoản nào trong kho lưu trữ.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CONFIRMATION MODAL: TEACHER SOFT DELETE */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl">
              <Archive className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="font-extrabold text-base text-slate-900">
                Xác nhận lưu trữ an toàn?
              </h4>
              <p className="text-xs text-slate-500">
                Thầy/Cô có chắc chắn muốn lưu trữ <strong className="text-slate-800">{selectedStudentUids.size} tài khoản</strong> đã chọn?
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bảo lưu 100% dữ liệu tài khoản</span>
              </div>
              <p>
                Toàn bộ điểm RP, EXP, nhân vật đã mở khóa và kỷ lục Boss được bảo lưu an toàn. Thầy/Cô có thể khôi phục lại bất kỳ lúc nào tại mục <strong>"Tài khoản đã lưu trữ"</strong>.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleTeacherArchive}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xác nhận lưu trữ</span>
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ===================================================================== */}
      {/* MODULE 11: HỒ SƠ CÁ NHÂN GIÁO VIÊN */}
      {/* ===================================================================== */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAF5] shadow-xs max-w-xl mx-auto space-y-5 text-xs">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-md">
              GV
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#172B4D]">
                {(currentUser?.displayName || 'Cô Trần Thị Mai (Tổ trưởng Tin học)').replace(/THCS Mỹ Hòa\s*[-–•]?\s*/gi, '').trim()}
              </h3>
              <p className="text-slate-500">
                Tài khoản: <strong>{currentUser?.username || 'teacher'}</strong>
              </p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                Quyền hạn: Cán bộ & Giáo viên
              </span>
            </div>
          </div>

          <div className="space-y-2 text-slate-600">
            <div><strong>Bộ môn phụ trách:</strong> Tin học & Toán học THCS</div>
            <div><strong>Năm học:</strong> 2026–2027 (Chương trình GDPT 2018)</div>
            <div><strong>Quy tắc xác thực:</strong> Mật khẩu SHA-256 mã hóa an toàn trên hệ thống.</div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: ADD QUESTION */}
      {/* ===================================================================== */}
      {showAddQModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 my-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-[#172B4D]">
                {editingQuestion ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới vào ngân hàng'}
              </h3>
              <button
                onClick={() => setShowAddQModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Khối:</label>
                  <select
                    value={newQGrade}
                    onChange={(e) => setNewQGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value={6}>Lớp 6</option>
                    <option value={7}>Lớp 7</option>
                    <option value={8}>Lớp 8</option>
                    <option value={9}>Lớp 9</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Môn:</label>
                  <select
                    value={newQSubject}
                    onChange={(e) => setNewQSubject(e.target.value as SubjectId)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mức độ:</label>
                  <select
                    value={newQDiff}
                    onChange={(e) => setNewQDiff(e.target.value as DifficultyLevel)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="nhan_biet">Nhận biết</option>
                    <option value="thong_hieu">Thông hiểu</option>
                    <option value="van_dung">Vận dụng</option>
                    <option value="van_dung_cao">Vận dụng cao</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nội dung câu hỏi:</label>
                <textarea
                  rows={3}
                  value={newQContent}
                  onChange={(e) => setNewQContent(e.target.value)}
                  required
                  placeholder="Nhập nội dung câu hỏi..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-slate-700">4 Phương án:</label>
                {newQOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="q_correct"
                      checked={newQCorrectIdx === idx}
                      onChange={() => setNewQCorrectIdx(idx)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="w-4 font-bold text-slate-500">
                      {String.fromCharCode(65 + idx)}:
                    </span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const next = [...newQOptions];
                        next[idx] = e.target.value;
                        setNewQOptions(next);
                      }}
                      required
                      placeholder={`Phương án ${String.fromCharCode(65 + idx)}...`}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lời giải thích:</label>
                <textarea
                  rows={2}
                  value={newQExplanation}
                  onChange={(e) => setNewQExplanation(e.target.value)}
                  placeholder="Giải thích lý do..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddQModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  {editingQuestion ? 'Cập nhật' : 'Lưu câu hỏi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import { GradeLevel, SubjectId, Question, Exam, UserExamResult, Lesson, StudentProfile, LessonMedia, Assignment, AssignmentSubmission, Textbook, TextbookStatus, GameRewardRecord } from '../types';
import { INITIAL_QUESTIONS, INITIAL_EXAMS, INITIAL_LESSONS, INITIAL_DOCUMENTS, TeacherDocument } from '../data/mockData';
import { isFormulaicQuestion } from '../data/curriculumQuestionsLoader';
import { INITIAL_LESSON_MEDIA } from '../data/mockMedia';
import { INITIAL_ASSIGNMENTS, INITIAL_SUBMISSIONS } from '../data/mockAssignments';
import { INITIAL_TEXTBOOKS } from '../data/mockTextbooks';
import { textbookFirebaseService } from './textbookFirebaseService';

const KEYS = {
  GRADE: 'myhoa_current_grade',
  SUBJECT: 'myhoa_current_subject',
  QUESTIONS: 'myhoa_questions_v1', // Legacy key (auto-purged to prevent QuotaExceededError)
  QUESTIONS_CUSTOM: 'myhoa_custom_questions_v2', // Custom questions added by teachers (<20KB)
  QUESTION_OVERRIDES: 'myhoa_question_overrides_v2', // Teacher customizations & overrides (<20KB)
  QUESTIONS_DELETED: 'myhoa_deleted_questions_v2', // IDs of deleted canonical questions (<5KB)
  EXAMS: 'myhoa_exams_v1',
  LESSONS: 'myhoa_lessons_v1', // Legacy key (auto-purged to prevent QuotaExceededError)
  LESSONS_CUSTOM: 'myhoa_custom_lessons_v2', // Custom lessons created by teachers (<10KB)
  LESSON_OVERRIDES: 'myhoa_lesson_overrides_v2', // Teacher customizations & attachments (<10KB)
  LESSONS_DELETED: 'myhoa_deleted_lessons_v2', // IDs of deleted canonical lessons (<2KB)
  MEDIA: 'myhoa_lesson_media_v1',
  RESULTS: 'myhoa_exam_results_v1',
  DOCUMENTS: 'myhoa_documents_v1',
  STUDENT_PROFILE: 'myhoa_student_profile_v1',
  ASSIGNMENTS: 'myhoa_assignments_v1',
  SUBMISSIONS: 'myhoa_assignment_submissions_v1',
  TEXTBOOKS: 'myhoa_textbooks_v1',
  REWARDS: 'myhoa_game_rewards_v1'
};

export function classifyDocumentFromFileNameOrTitle(fileName: string, title: string = ''): {
  subjectId: SubjectId;
  grade: GradeLevel;
  topic: string;
  bookSeries: string;
} {
  const text = `${fileName} ${title}`.toLowerCase();

  // Detect grade
  let grade: GradeLevel = 6;
  if (/(\b|_)(lớp|lop|khối|khoi|k)?9(\b|_|\.)/i.test(text) || text.includes('lop 9') || text.includes('lớp 9') || text.includes('lop_9') || text.includes('k9') || text.includes('g9')) {
    grade = 9;
  } else if (/(\b|_)(lớp|lop|khối|khoi|k)?8(\b|_|\.)/i.test(text) || text.includes('lop 8') || text.includes('lớp 8') || text.includes('lop_8') || text.includes('k8') || text.includes('g8')) {
    grade = 8;
  } else if (/(\b|_)(lớp|lop|khối|khoi|k)?7(\b|_|\.)/i.test(text) || text.includes('lop 7') || text.includes('lớp 7') || text.includes('lop_7') || text.includes('k7') || text.includes('g7')) {
    grade = 7;
  } else if (/(\b|_)(lớp|lop|khối|khoi|k)?6(\b|_|\.)/i.test(text) || text.includes('lop 6') || text.includes('lớp 6') || text.includes('lop_6') || text.includes('k6') || text.includes('g6')) {
    grade = 6;
  }

  // Detect subject
  let subjectId: SubjectId = 'tin-hoc';
  let topic = 'Chủ đề: Sách giáo khoa chuẩn GDPT 2018';
  let bookSeries = 'Sách giáo khoa hiện hành';

  if (text.includes('dia_phuong') || text.includes('địa phương') || text.includes('dia phuong') || text.includes('gddp') || text.includes('vinh_long') || text.includes('vĩnh long') || text.includes('vinh long')) {
    subjectId = 'giao-duc-dia-phuong';
    bookSeries = 'Tài liệu GDĐP tỉnh Vĩnh Long';
    topic = 'Tài liệu Giáo dục địa phương tỉnh Vĩnh Long';
  } else if (text.includes('tin_hoc') || text.includes('tin hoc') || text.includes('tin học') || text.includes('tinhoc') || text.includes('informatics')) {
    subjectId = 'tin-hoc';
    topic = 'Chủ đề: Máy tính và cộng đồng - Thuật toán';
  } else if (text.includes('toan') || text.includes('toán') || text.includes('math')) {
    subjectId = 'toan';
    topic = 'Chương: Số và Đại số - Hình học';
  } else if (text.includes('ngu_van') || text.includes('ngữ văn') || text.includes('ngu van') || text.includes('van hoc') || text.includes('văn')) {
    subjectId = 'van';
    topic = 'Chủ đề: Khám phá văn học và Đọc hiểu';
  } else if (text.includes('tieng_anh') || text.includes('tiếng anh') || text.includes('tieng anh') || text.includes('english') || text.includes('global success')) {
    subjectId = 'tieng-anh';
    bookSeries = 'Global Success';
    topic = 'Unit: Getting Started & Skills';
  } else if (text.includes('khtn') || text.includes('khoa học tự nhiên') || text.includes('khoa hoc tu nhien') || text.includes('vat li') || text.includes('hoa hoc') || text.includes('sinh hoc')) {
    subjectId = 'khtn';
    topic = 'Chủ đề: Khoa học tự nhiên và Đời sống';
  } else if (text.includes('lich_su') || text.includes('lịch sử') || text.includes('dia_li') || text.includes('địa lí') || text.includes('địa lý') || text.includes('lsdl')) {
    subjectId = 'lich-su-dia-ly';
    topic = 'Chủ đề: Lịch sử và Địa lí Việt Nam & Thế giới';
  } else if (text.includes('gdcd') || text.includes('công dân') || text.includes('cong dan')) {
    subjectId = 'gdcd';
    topic = 'Chủ đề: Đạo đức và Giáo dục pháp luật';
  } else if (text.includes('cong_nghe') || text.includes('công nghệ') || text.includes('technology')) {
    subjectId = 'cong-nghe';
    topic = 'Chủ đề: Công nghệ và Đời sống';
  } else if (text.includes('am_nhac') || text.includes('âm nhạc') || text.includes('am nhac') || text.includes('music')) {
    subjectId = 'am-nhac';
    topic = 'Chủ đề: Giai điệu học đường và Nhạc lý';
  } else if (text.includes('mi_thuat') || text.includes('mĩ thuật') || text.includes('mỹ thuật') || text.includes('mi thuat') || text.includes('art')) {
    subjectId = 'mi-thuat';
    topic = 'Chủ đề: Ngôn ngữ thị giác và Sáng tạo mĩ thuật';
  } else if (text.includes('the_chat') || text.includes('thể chất') || text.includes('gdtc') || text.includes('thể dục')) {
    subjectId = 'giao-duc-the-chat';
    topic = 'Chủ đề: Đội hình đội ngũ và Rèn luyện thể lực';
  } else if (text.includes('trai_nghiem') || text.includes('trải nghiệm') || text.includes('hdtn') || text.includes('hướng nghiệp')) {
    subjectId = 'hoat-dong-trai-nghiem';
    topic = 'Chủ đề: Hoạt động trải nghiệm, hướng nghiệp';
  }

  return { subjectId, grade, topic, bookSeries };
}

export interface DuplicateAuditEntry {
  grade: GradeLevel;
  subjectId: SubjectId;
  chapter: string;
  title: string;
  duplicatesCount: number;
  keptId: string;
  keptKeyPoints: number;
  keptExercises: number;
  deletedId: string;
  deletedKeyPoints: number;
  deletedExercises: number;
  reason: string;
}

let lastDeduplicationAudit: DuplicateAuditEntry[] = [];

export function normalizeTitle(t: string): string {
  return (t || '')
    .toLowerCase()
    .replace(/[–—\-:\.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractLessonNum(t: string): string {
  const norm = normalizeTitle(t);
  const m = norm.match(/^(?:bài|unit|chủ đề)\s*(\d+[a-z]?)/i);
  return m ? m[1] : '';
}

export function cleanTitleText(t: string): string {
  const norm = normalizeTitle(t);
  return norm.replace(/^(?:bài|unit|chủ đề)\s*\d+[a-z]?\s*/i, '').trim();
}

export function calculateLessonScore(l: Lesson, isCanonical: boolean): number {
  let score = 0;
  // 1. Số ý trọng tâm (ưu tiên chuẩn 5 ý trọng tâm)
  const kp = l.keyPoints?.length || 0;
  score += kp * 20;
  if (kp >= 5) score += 30;

  // 2. Số câu hỏi ôn tập (ưu tiên đầy đủ >= 8 câu)
  const ex = l.sampleExercises?.length || 0;
  score += ex * 15;
  if (ex >= 8) score += 40;

  // 3. Chiều sâu nội dung lý thuyết & ví dụ
  score += Math.min(Math.floor((l.contentMarkdown?.length || 0) / 50), 100);

  // 4. Mục tiêu bài học
  score += (l.learningObjectives?.length || 0) * 10;

  // 5. Nguồn dữ liệu chuẩn canonical
  if (isCanonical) score += 50;

  // 6. Trạng thái nội dung hoàn chỉnh
  if (l.isContentComplete) score += 20;
  if (l.isPublished && l.reviewStatus === 'da_xac_nhan') score += 10;

  return score;
}

export function isDuplicatePair(l1: Lesson, l2: Lesson): boolean {
  if (l1.id === l2.id) return true;
  if (l1.subjectId !== l2.subjectId || l1.grade !== l2.grade) return false;

  const norm1 = normalizeTitle(l1.title);
  const norm2 = normalizeTitle(l2.title);
  if (norm1 === norm2) return true;

  const num1 = extractLessonNum(l1.title);
  const num2 = extractLessonNum(l2.title);
  const clean1 = cleanTitleText(l1.title);
  const clean2 = cleanTitleText(l2.title);

  // Cùng số thứ tự bài và cùng tên nội dung bài học
  if (num1 && num2 && num1 === num2 && clean1 === clean2) return true;

  // Cùng tên nội dung bài học trong cùng một chủ đề/chương
  if (clean1 && clean2 && clean1 === clean2) {
    const ch1 = normalizeTitle(l1.chapter);
    const ch2 = normalizeTitle(l2.chapter);
    if (!ch1 || !ch2 || ch1 === ch2 || ch1.includes(ch2) || ch2.includes(ch1)) {
      return true;
    }
  }

  // Cùng số thứ tự bài trong cùng một chủ đề/chương
  if (num1 && num2 && num1 === num2) {
    const ch1 = normalizeTitle(l1.chapter);
    const ch2 = normalizeTitle(l2.chapter);
    if (ch1 && ch2 && ch1 === ch2) {
      return true;
    }
  }

  return false;
}

export function deduplicateAndUpgradeLessons(
  rawList: Lesson[],
  initialLessons: Lesson[]
): { cleaned: Lesson[]; auditLog: DuplicateAuditEntry[]; modified: boolean } {
  const auditLog: DuplicateAuditEntry[] = [];
  let modified = false;

  const canonicalIdMap = new Map<string, Lesson>();
  const canonicalKeyMap = new Map<string, Lesson>();
  initialLessons.forEach(l => {
    canonicalIdMap.set(l.id, l);
    canonicalKeyMap.set(`${l.subjectId}___${l.grade}___${normalizeTitle(l.title)}`, l);
  });

  // Step 1: Normalize and upgrade each individual lesson against canonical standard
  const normalized = rawList.map(l => {
    let canon = canonicalIdMap.get(l.id);
    if (!canon) {
      const key = `${l.subjectId}___${l.grade}___${normalizeTitle(l.title)}`;
      canon = canonicalKeyMap.get(key);
    }

    if (canon) {
      const hasGenericOutdatedExercises =
        !l.sampleExercises ||
        l.sampleExercises.length !== 4 ||
        l.sampleExercises.some(ex =>
          ex.question.includes('Phím tắt thông dụng') ||
          ex.question.includes('phá dấu ngoặc') ||
          ex.question.includes('số dư luôn phải nhỏ hơn') ||
          ex.question.includes('Trước khi sửa chữa hoặc thay thế một thiết bị điện') ||
          ex.question.includes('Trước khi bắt đầu buổi tập luyện thể dục') ||
          ex.question.includes('mảnh đất hình chữ nhật trong khuôn viên') ||
          ex.question.includes('nguyên vật liệu xây dựng hoặc tiết kiệm chi phí năng lượng') ||
          ex.question.includes('Khởi động phần mềm') ||
          ex.question.includes('Thiết lập thông số') ||
          ex.question.includes('chương trình thực hành kỹ năng nâng cao') ||
          ex.question.includes('Căn cứ bài học:') ||
          ex.solution?.includes('Căn cứ bài học:')
        );

      const isOutdated =
        !l.isPublished ||
        l.reviewStatus !== 'da_xac_nhan' ||
        !l.learningObjectives ||
        l.learningObjectives.length === 0 ||
        hasGenericOutdatedExercises ||
        !l.keyPoints ||
        l.keyPoints.length < (canon.keyPoints?.length || 5) ||
        (l.contentMarkdown?.length || 0) < (canon.contentMarkdown?.length || 0) ||
        l.contentMarkdown?.includes('Khái niệm cốt lõi: Bài học trang bị');

      if (isOutdated) {
        modified = true;
        return {
          ...canon,
          attachments: l.attachments || canon.attachments
        };
      }
    }

    // Sanitize any remaining old series names
    if (l.bookSeries && (l.bookSeries.includes('Kết nối') || l.bookSeries.includes('cuộc sống'))) {
      l.bookSeries = 'Sách giáo khoa hiện hành';
      modified = true;
    }

    return l;
  });

  // Step 2: Cluster lessons into duplicate groups
  const clusters: Lesson[][] = [];
  for (const item of normalized) {
    let foundCluster = clusters.find(c => c.some(existing => isDuplicatePair(existing, item)));
    if (!foundCluster) {
      foundCluster = [];
      clusters.push(foundCluster);
    }
    foundCluster.push(item);
  }

  // Step 3: Pick the single highest-quality winner for each cluster
  const dedupedList: Lesson[] = [];
  for (const cluster of clusters) {
    if (cluster.length === 1) {
      dedupedList.push(cluster[0]);
    } else {
      modified = true;
      // Sort cluster by quality score descending
      cluster.sort((a, b) => {
        const isCanonA = canonicalIdMap.has(a.id);
        const isCanonB = canonicalIdMap.has(b.id);
        return calculateLessonScore(b, isCanonB) - calculateLessonScore(a, isCanonA);
      });

      const winner = cluster[0];
      const losers = cluster.slice(1);

      // Merge user attachments safely from losers into winner
      const mergedAttachments = [...(winner.attachments || [])];
      for (const loser of losers) {
        if (loser.attachments) {
          for (const att of loser.attachments) {
            if (!mergedAttachments.some(a => a.name === att.name)) {
              mergedAttachments.push(att);
            }
          }
        }
      }
      winner.attachments = mergedAttachments;
      dedupedList.push(winner);

      // Record detailed audit entries
      for (const loser of losers) {
        auditLog.push({
          grade: winner.grade,
          subjectId: winner.subjectId,
          chapter: winner.chapter || 'Chủ đề chung',
          title: winner.title,
          duplicatesCount: cluster.length,
          keptId: winner.id,
          keptKeyPoints: winner.keyPoints?.length || 0,
          keptExercises: winner.sampleExercises?.length || 0,
          deletedId: loser.id,
          deletedKeyPoints: loser.keyPoints?.length || 0,
          deletedExercises: loser.sampleExercises?.length || 0,
          reason: `Giữ lại bản chuẩn (${winner.keyPoints?.length || 5} ý trọng tâm, ${winner.sampleExercises?.length || 8} bài tập), xóa bản trùng lặp kém hơn (${loser.keyPoints?.length || 3} ý trọng tâm).`
        });
      }
    }
  }

  // Step 4: Ensure all canonical lessons are present without creating duplicates
  for (const canon of initialLessons) {
    const alreadyExists = dedupedList.some(existing => isDuplicatePair(existing, canon));
    if (!alreadyExists) {
      dedupedList.push(canon);
      modified = true;
    }
  }

  return { cleaned: dedupedList, auditLog, modified };
}

export const storageService = {
  getSelectedGrade(): GradeLevel {
    try {
      const val = localStorage.getItem(KEYS.GRADE);
      if (val) {
        const num = parseInt(val, 10);
        if ([6, 7, 8, 9].includes(num)) return num as GradeLevel;
      }
    } catch {
      // ignore
    }
    return 6;
  },

  setSelectedGrade(grade: GradeLevel): void {
    try {
      localStorage.setItem(KEYS.GRADE, grade.toString());
    } catch {
      // ignore
    }
  },

  getSelectedSubject(): SubjectId {
    try {
      const val = localStorage.getItem(KEYS.SUBJECT);
      if (val) return val as SubjectId;
    } catch {
      // ignore
    }
    return 'tin-hoc';
  },

  setSelectedSubject(subjectId: SubjectId): void {
    try {
      localStorage.setItem(KEYS.SUBJECT, subjectId);
    } catch {
      // ignore
    }
  },

  // Questions Delta Storage Methods (<20KB total instead of 4.8MB)
  getCustomQuestions(): Question[] {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(KEYS.QUESTIONS_CUSTOM);
        if (stored) return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return [];
  },

  saveCustomQuestions(custom: Question[]): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(KEYS.QUESTIONS_CUSTOM, JSON.stringify(custom));
    } catch (e) {
      console.warn('Unable to persist custom questions to storage:', e);
    }
  },

  getQuestionOverrides(): Record<string, Partial<Question>> {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(KEYS.QUESTION_OVERRIDES);
        if (stored) return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return {};
  },

  saveQuestionOverrides(overrides: Record<string, Partial<Question>>): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(KEYS.QUESTION_OVERRIDES, JSON.stringify(overrides));
    } catch (e) {
      console.warn('Unable to persist question overrides to storage:', e);
    }
  },

  getDeletedQuestionIds(): string[] {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(KEYS.QUESTIONS_DELETED);
        if (stored) return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return [];
  },

  saveDeletedQuestionIds(ids: string[]): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(KEYS.QUESTIONS_DELETED, JSON.stringify(ids));
    } catch (e) {
      console.warn('Unable to persist deleted question ids to storage:', e);
    }
  },

  // Questions: Lightweight Delta Model to completely prevent QuotaExceededError
  getQuestions(): Question[] {
    // 1. Proactively purge legacy oversized storage key (4.8MB) to free browser quota
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const legacyStored = localStorage.getItem(KEYS.QUESTIONS);
        if (legacyStored) {
          try {
            const legacyList: Question[] = JSON.parse(legacyStored);
            const canonIds = new Set(INITIAL_QUESTIONS.map(q => q.id));
            const customFromLegacy = legacyList.filter(q => !canonIds.has(q.id));
            if (customFromLegacy.length > 0) {
              const currentCustom = this.getCustomQuestions();
              const existingIds = new Set(currentCustom.map(c => c.id));
              const merged = [...currentCustom];
              customFromLegacy.forEach(c => {
                if (!existingIds.has(c.id)) merged.push(c);
              });
              this.saveCustomQuestions(merged);
            }
          } catch {
            // ignore
          }
          localStorage.removeItem(KEYS.QUESTIONS);
        }
      }
    } catch {
      // ignore
    }

    // 2. Load canonical base questions + apply delta overrides & custom questions
    try {
      const deletedSet = new Set(this.getDeletedQuestionIds());
      const overrides = this.getQuestionOverrides();
      const customQuestions = this.getCustomQuestions().filter(q => !deletedSet.has(q.id));

      const baseQuestions = INITIAL_QUESTIONS.filter(q => !deletedSet.has(q.id)).map(q => {
        const override = overrides[q.id];
        if (override) {
          return {
            ...q,
            ...override
          };
        }
        return q;
      });

      return [...customQuestions, ...baseQuestions];
    } catch (e) {
      console.error('Error loading questions from delta storage:', e);
      return INITIAL_QUESTIONS;
    }
  },

  saveQuestions(questions: Question[]): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
    // Always clear legacy oversized key to protect browser storage quota
    try {
      localStorage.removeItem(KEYS.QUESTIONS);
    } catch {}

    try {
      const canonMap = new Map(INITIAL_QUESTIONS.map(q => [q.id, q]));
      const currentIds = new Set(questions.map(q => q.id));

      // 1. Custom questions (not in canonical bank)
      const customQuestions = questions.filter(q => !canonMap.has(q.id));
      this.saveCustomQuestions(customQuestions);

      // 2. Deleted canonical questions (in canonical bank but omitted in incoming list)
      const deletedIds: string[] = [];
      INITIAL_QUESTIONS.forEach(q => {
        if (!currentIds.has(q.id)) {
          deletedIds.push(q.id);
        }
      });
      this.saveDeletedQuestionIds(deletedIds);

      // 3. Overridden canonical questions
      const overrides: Record<string, Partial<Question>> = {};
      questions.forEach(q => {
        const canon = canonMap.get(q.id);
        if (canon) {
          if (
            q.content !== canon.content ||
            q.correctAnswerIndex !== canon.correctAnswerIndex ||
            q.explanation !== canon.explanation ||
            JSON.stringify(q.options) !== JSON.stringify(canon.options) ||
            q.chapter !== canon.chapter ||
            q.difficulty !== canon.difficulty
          ) {
            overrides[q.id] = q;
          }
        }
      });
      this.saveQuestionOverrides(overrides);
    } catch (e) {
      console.warn('Error saving questions to delta storage:', e);
    }
  },

  addQuestion(newQuestion: Question): void {
    const custom = this.getCustomQuestions();
    const idx = custom.findIndex(q => q.id === newQuestion.id);
    if (idx !== -1) {
      custom[idx] = newQuestion;
    } else {
      custom.unshift(newQuestion);
    }
    this.saveCustomQuestions(custom);

    // Un-delete if previously deleted
    const deleted = this.getDeletedQuestionIds().filter(id => id !== newQuestion.id);
    this.saveDeletedQuestionIds(deleted);
  },

  updateQuestion(updated: Question): void {
    const custom = this.getCustomQuestions();
    const customIdx = custom.findIndex(q => q.id === updated.id);
    if (customIdx !== -1) {
      custom[customIdx] = updated;
      this.saveCustomQuestions(custom);
      return;
    }

    // Otherwise it's an override on canonical question
    const overrides = this.getQuestionOverrides();
    overrides[updated.id] = updated;
    this.saveQuestionOverrides(overrides);
  },

  deleteQuestion(id: string): void {
    const custom = this.getCustomQuestions();
    const filteredCustom = custom.filter(q => q.id !== id);
    if (filteredCustom.length !== custom.length) {
      this.saveCustomQuestions(filteredCustom);
    }

    const canonMap = new Map(INITIAL_QUESTIONS.map(q => [q.id, q]));
    if (canonMap.has(id)) {
      const deleted = new Set(this.getDeletedQuestionIds());
      deleted.add(id);
      this.saveDeletedQuestionIds(Array.from(deleted));

      const overrides = this.getQuestionOverrides();
      if (overrides[id]) {
        delete overrides[id];
        this.saveQuestionOverrides(overrides);
      }
    }
  },

  // Exams
  getExams(): Exam[] {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(KEYS.EXAMS);
        if (stored) {
          const list: Exam[] = JSON.parse(stored);
          const initialExamMap = new Map(INITIAL_EXAMS.map(e => [e.id, e]));

          // Cập nhật các đề canonical bằng bản chuẩn mới nhất
          const updatedList = list.map(item => {
            const canonical = initialExamMap.get(item.id);
            if (canonical) {
              // Nếu đề lưu trong localStorage có ít câu hơn chuẩn hoặc thiếu tự luận, ưu tiên bản canonical chuẩn
              if (
                item.questionIds.length < canonical.questionIds.length ||
                (canonical.essayQuestions && (!item.essayQuestions || item.essayQuestions.length === 0))
              ) {
                return canonical;
              }
            }
            return item;
          });

          // Bổ sung các đề còn thiếu từ INITIAL_EXAMS
          const existingIds = new Set(updatedList.map(e => e.id));
          const missing = INITIAL_EXAMS.filter(e => !existingIds.has(e.id));
          
          if (missing.length > 0 || updatedList.length !== list.length) {
            const merged = [...updatedList, ...missing];
            this.saveExams(merged);
            return merged;
          }
          return updatedList;
        }
      }
    } catch {
      // ignore
    }
    this.saveExams(INITIAL_EXAMS);
    return INITIAL_EXAMS;
  },

  saveExams(exams: Exam[]): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(KEYS.EXAMS, JSON.stringify(exams));
    } catch (e) {
      console.error('Error saving exams:', e);
    }
  },

  addExam(newExam: Exam): void {
    const list = this.getExams();
    list.unshift(newExam);
    this.saveExams(list);
  },

  // Lessons Storage (Lightweight Delta Model: only stores teacher edits, custom lessons, and deleted IDs)
  getCustomLessons(): Lesson[] {
    try {
      const stored = localStorage.getItem(KEYS.LESSONS_CUSTOM);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  },

  saveCustomLessons(custom: Lesson[]): void {
    try {
      localStorage.setItem(KEYS.LESSONS_CUSTOM, JSON.stringify(custom));
    } catch (e) {
      console.warn('Unable to persist custom lessons to storage:', e);
    }
  },

  getLessonOverrides(): Record<string, Partial<Lesson>> {
    try {
      const stored = localStorage.getItem(KEYS.LESSON_OVERRIDES);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return {};
  },

  saveLessonOverrides(overrides: Record<string, Partial<Lesson>>): void {
    try {
      localStorage.setItem(KEYS.LESSON_OVERRIDES, JSON.stringify(overrides));
    } catch (e) {
      console.warn('Unable to persist lesson overrides to storage:', e);
    }
  },

  getDeletedLessonIds(): string[] {
    try {
      const stored = localStorage.getItem(KEYS.LESSONS_DELETED);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  },

  saveDeletedLessonIds(ids: string[]): void {
    try {
      localStorage.setItem(KEYS.LESSONS_DELETED, JSON.stringify(ids));
    } catch (e) {
      console.warn('Unable to persist deleted lesson ids to storage:', e);
    }
  },

  // Lessons Deduplication & Retrieval using lightweight delta model
  getLessons(): Lesson[] {
    // 1. Proactively purge legacy oversized storage key (5.3MB) to free browser quota
    try {
      const legacyStored = localStorage.getItem(KEYS.LESSONS);
      if (legacyStored) {
        try {
          const legacyList: Lesson[] = JSON.parse(legacyStored);
          const canonIds = new Set(INITIAL_LESSONS.map(l => l.id));
          const customFromLegacy = legacyList.filter(l => !canonIds.has(l.id));
          if (customFromLegacy.length > 0) {
            const currentCustom = this.getCustomLessons();
            const existingIds = new Set(currentCustom.map(c => c.id));
            const merged = [...currentCustom];
            customFromLegacy.forEach(c => {
              if (!existingIds.has(c.id)) merged.push(c);
            });
            this.saveCustomLessons(merged);
          }
        } catch {
          // ignore
        }
        localStorage.removeItem(KEYS.LESSONS);
      }
    } catch {
      // ignore
    }

    try {
      const deletedSet = new Set(this.getDeletedLessonIds());
      const overrides = this.getLessonOverrides();
      const customLessons = this.getCustomLessons().filter(l => !deletedSet.has(l.id));

      const baseLessons = INITIAL_LESSONS.filter(l => !deletedSet.has(l.id)).map(l => {
        const override = overrides[l.id];
        if (override) {
          const hasOutdatedEx = override.sampleExercises && (
            override.sampleExercises.length !== 4 ||
            override.sampleExercises.some(ex =>
              ex.question.includes('Khởi động phần mềm') ||
              ex.question.includes('Thiết lập thông số') ||
              ex.question.includes('chương trình thực hành kỹ năng nâng cao') ||
              ex.question.includes('Căn cứ bài học:')
            )
          );
          return {
            ...l,
            ...override,
            sampleExercises: (hasOutdatedEx || !override.sampleExercises) ? l.sampleExercises : override.sampleExercises,
            attachments: override.attachments || l.attachments
          };
        }
        return l;
      });

      const activeCanonicals = INITIAL_LESSONS.filter(l => !deletedSet.has(l.id));
      const combined = [...customLessons, ...baseLessons];
      const { cleaned, auditLog } = deduplicateAndUpgradeLessons(combined, activeCanonicals);
      if (auditLog.length > 0) {
        lastDeduplicationAudit = auditLog;
      }
      return cleaned;
    } catch (e) {
      console.error('Error loading lessons from delta storage:', e);
      return INITIAL_LESSONS;
    }
  },

  saveLessons(lessons: Lesson[]): void {
    // Always clear legacy oversized key
    try {
      localStorage.removeItem(KEYS.LESSONS);
    } catch {
      // ignore
    }

    try {
      const canonicalMap = new Map(INITIAL_LESSONS.map(l => [l.id, l]));
      const presentCanonicals = lessons.filter(l => canonicalMap.has(l.id));
      const { cleaned, auditLog } = deduplicateAndUpgradeLessons(lessons, presentCanonicals);
      if (auditLog.length > 0) {
        lastDeduplicationAudit = auditLog;
      }
      const customLessons: Lesson[] = [];
      const overrides: Record<string, Partial<Lesson>> = {};
      const presentIds = new Set<string>();

      for (const l of cleaned) {
        presentIds.add(l.id);
        const canon = canonicalMap.get(l.id);
        if (!canon) {
          customLessons.push(l);
        } else {
          // Check for modifications or attachments difference
          const hasAttDiff = JSON.stringify(l.attachments || []) !== JSON.stringify(canon.attachments || []);
          const hasDiff =
            l.title !== canon.title ||
            l.contentMarkdown !== canon.contentMarkdown ||
            l.isPublished !== canon.isPublished ||
            hasAttDiff;

          if (hasDiff) {
            overrides[l.id] = {
              title: l.title !== canon.title ? l.title : undefined,
              contentMarkdown: l.contentMarkdown !== canon.contentMarkdown ? l.contentMarkdown : undefined,
              attachments: l.attachments,
              isPublished: l.isPublished,
              keyPoints: l.keyPoints !== canon.keyPoints ? l.keyPoints : undefined,
              sampleExercises: l.sampleExercises !== canon.sampleExercises ? l.sampleExercises : undefined
            };
          }
        }
      }

      const deletedIds: string[] = [];
      for (const canon of INITIAL_LESSONS) {
        if (!presentIds.has(canon.id)) {
          deletedIds.push(canon.id);
        }
      }

      this.saveCustomLessons(customLessons);
      this.saveLessonOverrides(overrides);
      this.saveDeletedLessonIds(deletedIds);
    } catch (e) {
      console.error('Error saving lessons delta to storage:', e);
    }
  },

  addLesson(newLesson: Lesson): void {
    const list = this.getLessons();
    const existingIndex = list.findIndex(l => isDuplicatePair(l, newLesson));
    if (existingIndex !== -1) {
      // Update existing record rather than creating a duplicate
      list[existingIndex] = {
        ...newLesson,
        id: list[existingIndex].id,
        attachments: [
          ...(list[existingIndex].attachments || []),
          ...(newLesson.attachments || [])
        ]
      };
      this.saveLessons(list);
    } else {
      list.unshift(newLesson);
      this.saveLessons(list);
    }
  },

  updateLesson(updated: Lesson): void {
    const list = this.getLessons();
    const idx = list.findIndex(l => l.id === updated.id);
    if (idx !== -1) {
      list[idx] = updated;
      this.saveLessons(list);
    }
  },

  deleteLesson(id: string): void {
    const list = this.getLessons();
    const filtered = list.filter(l => l.id !== id);
    this.saveLessons(filtered);
  },

  syncAllLessonsFromMaster(): { addedCount: number; totalCount: number; duplicatesRemoved: number } {
    try {
      localStorage.removeItem(KEYS.LESSON_OVERRIDES);
      localStorage.removeItem(KEYS.LESSONS_DELETED);
      localStorage.removeItem(KEYS.LESSONS);
    } catch {
      // ignore
    }
    const current = this.getLessons();
    return {
      addedCount: 0,
      totalCount: current.length,
      duplicatesRemoved: 0
    };
  },

  getDeduplicationAudit(): {
    checkedGrades: number[];
    checkedSubjects: string[];
    totalCheckedTopics: number;
    duplicatesFound: number;
    duplicatesResolved: number;
    keptLessonsCount: number;
    deletedLessonsCount: number;
    auditEntries: DuplicateAuditEntry[];
  } {
    const current = this.getLessons();
    const { cleaned, auditLog } = deduplicateAndUpgradeLessons(current, INITIAL_LESSONS);
    
    // Calculate distinct topics
    const topicsSet = new Set<string>();
    cleaned.forEach(l => {
      topicsSet.add(`${l.grade}_${l.subjectId}_${l.chapter || 'Chủ đề chung'}`);
    });

    return {
      checkedGrades: [6, 7, 8, 9],
      checkedSubjects: [
        'toan', 'van', 'tieng-anh', 'khtn', 'tin-hoc', 'lich-su-dia-ly',
        'gdcd', 'cong-nghe', 'am-nhac', 'mi-thuat', 'giao-duc-the-chat',
        'hoat-dong-trai-nghiem', 'giao-duc-dia-phuong'
      ],
      totalCheckedTopics: topicsSet.size,
      duplicatesFound: auditLog.length,
      duplicatesResolved: auditLog.length,
      keptLessonsCount: cleaned.length,
      deletedLessonsCount: auditLog.length,
      auditEntries: auditLog.length > 0 ? auditLog : lastDeduplicationAudit
    };
  },

  // Lesson Media (Videos & Images)
  getMedia(lessonId?: string): LessonMedia[] {
    try {
      const stored = localStorage.getItem(KEYS.MEDIA);
      let list: LessonMedia[] = [];
      if (stored) {
        list = JSON.parse(stored);
        const existingIds = new Set(list.map(m => m.id));
        const missing = INITIAL_LESSON_MEDIA.filter(m => !existingIds.has(m.id));
        if (missing.length > 0) {
          list = [...list, ...missing];
          this.saveMedia(list);
        }
      } else {
        this.saveMedia(INITIAL_LESSON_MEDIA);
        list = INITIAL_LESSON_MEDIA;
      }
      if (lessonId) {
        return list.filter(m => m.lessonId === lessonId).sort((a, b) => a.sortOrder - b.sortOrder);
      }
      return list.sort((a, b) => a.sortOrder - b.sortOrder);
    } catch {
      return INITIAL_LESSON_MEDIA;
    }
  },

  saveMedia(mediaList: LessonMedia[]): void {
    try {
      localStorage.setItem(KEYS.MEDIA, JSON.stringify(mediaList));
    } catch (e) {
      console.error('Error saving media to localStorage:', e);
    }
  },

  addMedia(item: LessonMedia): void {
    const list = this.getMedia();
    list.push(item);
    this.saveMedia(list);
  },

  updateMedia(item: LessonMedia): void {
    const list = this.getMedia();
    const idx = list.findIndex(m => m.id === item.id);
    if (idx !== -1) {
      list[idx] = item;
      this.saveMedia(list);
    }
  },

  deleteMedia(id: string): void {
    const list = this.getMedia();
    const filtered = list.filter(m => m.id !== id);
    this.saveMedia(filtered);
  },

  // Exam Results
  getExamResults(accountIdentifier?: string): UserExamResult[] {
    try {
      const stored = localStorage.getItem(KEYS.RESULTS);
      if (stored) {
        const list: UserExamResult[] = JSON.parse(stored);
        if (accountIdentifier) {
          return list.filter(r => r.studentUid === accountIdentifier || r.accountCode === accountIdentifier || r.studentName === accountIdentifier);
        }
        return list;
      }
    } catch {
      // ignore
    }
    return [];
  },

  saveExamResult(result: UserExamResult, accountIdentifier?: string): void {
    const list = this.getExamResults();
    list.unshift(result);
    try {
      localStorage.setItem(KEYS.RESULTS, JSON.stringify(list));
      this.updateStudentStatsWithResult(result, accountIdentifier || result.studentUid || result.accountCode);
    } catch (e) {
      console.error('Error saving exam result:', e);
    }
  },

  // Documents
  getDocuments(): TeacherDocument[] {
    try {
      const stored = localStorage.getItem(KEYS.DOCUMENTS);
      if (stored) {
        const list: TeacherDocument[] = JSON.parse(stored);
        const initMap = new Map(INITIAL_DOCUMENTS.map(d => [d.id, d]));
        let modified = false;

        // 1. Repair and standardize existing documents
        const normalized = list.map(d => {
          const init = initMap.get(d.id);
          if (init) {
            // Keep official fields pristine (published, status, correct subject, grade)
            if (
              d.status !== 'da_xac_nhan' ||
              d.readingStatus !== 'da_doc' ||
              d.processingStatus !== 'da_xuat_ban' ||
              !d.isPublished ||
              d.subjectId !== init.subjectId ||
              d.grade !== init.grade
            ) {
              modified = true;
              return { ...init, description: d.description || init.description };
            }
            return d;
          }

          // Auto-classify custom uploaded files if subject/grade might be unlinked
          const classified = classifyDocumentFromFileNameOrTitle(d.fileName, d.title);
          if (d.subjectId === 'tin-hoc' && d.grade === 6 && (classified.subjectId !== 'tin-hoc' || classified.grade !== 6)) {
            // Was likely uploaded under default settings
            modified = true;
            const updated: TeacherDocument = {
              ...d,
              subjectId: classified.subjectId,
              grade: classified.grade,
              bookSeries: d.bookSeries || classified.bookSeries,
              topic: d.topic || classified.topic,
              status: 'da_xac_nhan',
              readingStatus: 'da_doc',
              processingStatus: 'da_xuat_ban',
              isPublished: true
            };
            return updated;
          }

          return d;
        });

        // 2. Merge missing official documents
        const existingIds = new Set(normalized.map(d => d.id));
        const missing = INITIAL_DOCUMENTS.filter(d => !existingIds.has(d.id));
        if (missing.length > 0) {
          modified = true;
          const merged = [...normalized, ...missing];
          this.saveDocuments(merged);
          return merged;
        }

        if (modified) {
          this.saveDocuments(normalized);
        }
        return normalized;
      }
    } catch {
      // ignore
    }
    this.saveDocuments(INITIAL_DOCUMENTS);
    return INITIAL_DOCUMENTS;
  },

  syncAllTextbooksAndLessons(): { documentsCount: number; lessonsCount: number } {
    try {
      this.saveDocuments(INITIAL_DOCUMENTS);
      this.saveLessons(INITIAL_LESSONS);
      return {
        documentsCount: INITIAL_DOCUMENTS.length,
        lessonsCount: INITIAL_LESSONS.length
      };
    } catch (e) {
      console.error('Error synchronizing textbooks and lessons:', e);
      return { documentsCount: 0, lessonsCount: 0 };
    }
  },

  saveDocuments(docs: TeacherDocument[]): void {
    try {
      localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(docs));
    } catch (e) {
      console.error('Error saving documents:', e);
    }
  },

  addDocument(doc: TeacherDocument): void {
    const list = this.getDocuments();
    list.unshift(doc);
    this.saveDocuments(list);
  },

  deleteDocument(id: string): void {
    const list = this.getDocuments();
    const filtered = list.filter(d => d.id !== id);
    this.saveDocuments(filtered);
  },

  updateDocument(doc: TeacherDocument): void {
    const list = this.getDocuments();
    const idx = list.findIndex(d => d.id === doc.id);
    if (idx !== -1) {
      list[idx] = doc;
      this.saveDocuments(list);
    }
  },

  // Student Profile - Scoped per Account ID
  getStudentProfile(accountId?: string): StudentProfile {
    let resolvedId = accountId;
    if (!resolvedId && typeof window !== 'undefined') {
      resolvedId = localStorage.getItem('thcs_registered_account_code') || undefined;
    }

    if (resolvedId) {
      try {
        const stored = localStorage.getItem(`myhoa_student_profile_${resolvedId}`);
        if (stored) {
          const parsed: StudentProfile = JSON.parse(stored);
          const cachedPts = localStorage.getItem(`student_points_${resolvedId}`) || localStorage.getItem(`student_points_code_${resolvedId}`);
          if (cachedPts !== null) {
            parsed.totalPoints = Number(cachedPts);
          }
          return parsed;
        }
      } catch {}

      // Check registered student info in storage
      let stuName = '';
      let stuClass = '';
      let stuGrade: any = 6;
      let initialPoints = 0;
      if (typeof window !== 'undefined') {
        const rawStudent = localStorage.getItem('thcs_registered_student_v1');
        if (rawStudent) {
          try {
            const parsedStudent = JSON.parse(rawStudent);
            if (parsedStudent.accountCode === resolvedId || parsedStudent.uid === resolvedId) {
              stuName = parsedStudent.displayName || parsedStudent.fullName || '';
              stuClass = parsedStudent.className || '';
              stuGrade = parsedStudent.grade || 6;
              const cachedPts = localStorage.getItem(`student_points_${parsedStudent.uid}`) || localStorage.getItem(`student_points_code_${parsedStudent.accountCode}`);
              initialPoints = cachedPts !== null ? Number(cachedPts) : (parsedStudent.totalPoints ?? 0);
            }
          } catch {}
        }
      }

      const newAccountProfile: StudentProfile = {
        name: stuName,
        grade: stuGrade,
        className: stuClass,
        avatarSeed: resolvedId,
        streakDays: 1,
        totalPoints: initialPoints,
        completedTestsCount: 0,
        averageScore: 0,
        badges: []
      };
      this.saveStudentProfile(newAccountProfile, resolvedId);
      return newAccountProfile;
    }

    // Default clean unauthenticated profile: exactly 0 points, no mock names
    return {
      name: '',
      grade: 6,
      className: '',
      avatarSeed: 'guest',
      streakDays: 0,
      totalPoints: 0,
      completedTestsCount: 0,
      averageScore: 0,
      badges: []
    };
  },

  saveStudentProfile(profile: StudentProfile, accountId?: string): void {
    let resolvedId = accountId;
    if (!resolvedId && typeof window !== 'undefined') {
      resolvedId = localStorage.getItem('thcs_registered_account_code') || undefined;
    }
    try {
      if (resolvedId) {
        localStorage.setItem(`myhoa_student_profile_${resolvedId}`, JSON.stringify(profile));
        localStorage.setItem(`student_points_${resolvedId}`, String(profile.totalPoints));
        localStorage.setItem(`student_points_code_${resolvedId}`, String(profile.totalPoints));
      }
      localStorage.setItem(KEYS.STUDENT_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving student profile:', e);
    }
  },

  updateStudentStatsWithResult(result: UserExamResult, accountId?: string): void {
    let resolvedId = accountId || result.studentUid || result.accountCode;
    if (!resolvedId && typeof window !== 'undefined') {
      resolvedId = localStorage.getItem('thcs_registered_account_code') || undefined;
    }
    const profile = this.getStudentProfile(resolvedId);
    const allResults = this.getExamResults();
    const studentResults = resolvedId ? allResults.filter(r => r.studentUid === resolvedId || r.accountCode === resolvedId) : allResults;
    const totalCount = studentResults.length;
    const totalScore = studentResults.reduce((acc, curr) => acc + curr.score, 0);
    const avg = totalCount > 0 ? Math.round((totalScore / totalCount) * 10) / 10 : result.score;
    
    const pointsGained = Math.round(result.score * 10);
    profile.totalPoints += pointsGained;
    profile.completedTestsCount = totalCount;
    profile.averageScore = avg;

    if (result.score === 10 && !profile.badges.includes('Điểm 10 Xuất sắc')) {
      profile.badges.push('Điểm 10 Xuất sắc');
    }
    if (profile.completedTestsCount >= 5 && !profile.badges.includes('Chiến thần Luyện đề')) {
      profile.badges.push('Chiến thần Luyện đề');
    }

    this.saveStudentProfile(profile, resolvedId);
  },

  // Game Rewards History & Sync (Scoped strictly per Account ID)
  getGameRewardHistory(accountId?: string): GameRewardRecord[] {
    let resolvedId = accountId;
    if (!resolvedId && typeof window !== 'undefined') {
      resolvedId = localStorage.getItem('thcs_registered_account_code') || undefined;
    }
    try {
      const storageKey = resolvedId ? `myhoa_game_rewards_${resolvedId}` : KEYS.REWARDS;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return [];
  },

  addGameRewardRecord(record: GameRewardRecord, accountId?: string): boolean {
    let resolvedId = accountId || record.accountId;
    if (!resolvedId && typeof window !== 'undefined') {
      resolvedId = localStorage.getItem('thcs_registered_account_code') || 'guest';
    }
    if (!resolvedId) resolvedId = 'guest';
    try {
      const current = this.getGameRewardHistory(resolvedId);
      // Anti-duplicate protection: check transaction code
      if (current.some(r => r.id === record.id)) {
        return false;
      }
      current.unshift(record);
      // Keep max 100 recent transactions
      if (current.length > 100) current.pop();

      const storageKey = resolvedId ? `myhoa_game_rewards_${resolvedId}` : KEYS.REWARDS;
      localStorage.setItem(storageKey, JSON.stringify(current));

      // Also persist to server in background
      if (typeof window !== 'undefined') {
        fetch('/api/students/reward-transaction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...record, accountId: resolvedId })
        }).catch(() => {});
      }

      return true;
    } catch {
      return false;
    }
  },

  // Account-specific Grade & Subject Selection Preferences
  getSelectedGradeForAccount(accountId?: string): GradeLevel {
    let resolvedId = accountId;
    if (!resolvedId && typeof window !== 'undefined') {
      resolvedId = localStorage.getItem('thcs_registered_account_code') || undefined;
    }
    if (resolvedId && typeof window !== 'undefined') {
      const val = localStorage.getItem(`myhoa_pref_grade_${resolvedId}`);
      if (val) {
        const n = parseInt(val, 10);
        if ([6, 7, 8, 9].includes(n)) return n as GradeLevel;
      }
    }
    return this.getSelectedGrade();
  },

  setSelectedGradeForAccount(grade: GradeLevel, accountId?: string): void {
    let resolvedId = accountId;
    if (!resolvedId && typeof window !== 'undefined') {
      resolvedId = localStorage.getItem('thcs_registered_account_code') || undefined;
    }
    if (resolvedId && typeof window !== 'undefined') {
      localStorage.setItem(`myhoa_pref_grade_${resolvedId}`, String(grade));
    }
    this.setSelectedGrade(grade);
  },

  getSelectedSubjectForAccount(accountId?: string): SubjectId {
    let resolvedId = accountId;
    if (!resolvedId && typeof window !== 'undefined') {
      resolvedId = localStorage.getItem('thcs_registered_account_code') || undefined;
    }
    if (resolvedId && typeof window !== 'undefined') {
      const val = localStorage.getItem(`myhoa_pref_subject_${resolvedId}`);
      if (val) return val as SubjectId;
    }
    return this.getSelectedSubject();
  },

  setSelectedSubjectForAccount(subjectId: SubjectId, accountId?: string): void {
    let resolvedId = accountId;
    if (!resolvedId && typeof window !== 'undefined') {
      resolvedId = localStorage.getItem('thcs_registered_account_code') || undefined;
    }
    if (resolvedId && typeof window !== 'undefined') {
      localStorage.setItem(`myhoa_pref_subject_${resolvedId}`, subjectId);
    }
    this.setSelectedSubject(subjectId);
  },

  // Assignments
  getAssignments(): Assignment[] {
    try {
      const stored = localStorage.getItem(KEYS.ASSIGNMENTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    this.saveAssignments(INITIAL_ASSIGNMENTS);
    return INITIAL_ASSIGNMENTS;
  },

  saveAssignments(assignments: Assignment[]): void {
    try {
      localStorage.setItem(KEYS.ASSIGNMENTS, JSON.stringify(assignments));
    } catch (e) {
      console.error('Error saving assignments:', e);
    }
  },

  addAssignment(assignment: Assignment): void {
    const list = this.getAssignments();
    list.unshift(assignment);
    this.saveAssignments(list);
  },

  updateAssignment(assignment: Assignment): void {
    const list = this.getAssignments();
    const idx = list.findIndex(a => a.id === assignment.id);
    if (idx !== -1) {
      list[idx] = assignment;
      this.saveAssignments(list);
    }
  },

  deleteAssignment(id: string): void {
    const list = this.getAssignments();
    const filtered = list.filter(a => a.id !== id);
    this.saveAssignments(filtered);
  },

  // Submissions
  getSubmissions(): AssignmentSubmission[] {
    try {
      const stored = localStorage.getItem(KEYS.SUBMISSIONS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    this.saveSubmissions(INITIAL_SUBMISSIONS);
    return INITIAL_SUBMISSIONS;
  },

  saveSubmissions(submissions: AssignmentSubmission[]): void {
    try {
      localStorage.setItem(KEYS.SUBMISSIONS, JSON.stringify(submissions));
    } catch (e) {
      console.error('Error saving submissions:', e);
    }
  },

  addSubmission(submission: AssignmentSubmission): void {
    const list = this.getSubmissions();
    const existingIdx = list.findIndex(
      s => s.assignmentId === submission.assignmentId && s.studentUid === submission.studentUid
    );
    if (existingIdx !== -1) {
      list[existingIdx] = submission;
    } else {
      list.unshift(submission);
    }
    this.saveSubmissions(list);
  },

  updateSubmission(submission: AssignmentSubmission): void {
    const list = this.getSubmissions();
    const idx = list.findIndex(s => s.id === submission.id);
    if (idx !== -1) {
      list[idx] = submission;
      this.saveSubmissions(list);
    }
  },

  gradeSubmission(
    submissionId: string,
    score: number,
    feedback: string,
    gradedBy: string,
    questionScores?: Record<string, number>
  ): void {
    const list = this.getSubmissions();
    const idx = list.findIndex(s => s.id === submissionId);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        score,
        status: 'graded',
        teacherFeedback: feedback,
        gradedBy,
        gradedAt: new Date().toISOString(),
        ...(questionScores ? { questionScores } : {})
      };
      this.saveSubmissions(list);
    }
  },

  // =========================================================================
  // SÁCH GIÁO KHOA (TEXTBOOKS) - LƯU TRỮ VĨNH VIỄN TRÊN FIREBASE FIRESTORE
  // BẢO TOÀN NGUYÊN VẸN 100% URL, KHÔNG TỰ ĐỘNG GHI ĐÈ BẰNG DỮ LIỆU MẶC ĐỊNH
  // =========================================================================
  getTextbooks(): Textbook[] {
    try {
      const stored = localStorage.getItem(KEYS.TEXTBOOKS);
      if (stored) {
        const list: Textbook[] = JSON.parse(stored);
        if (Array.isArray(list) && list.length > 0) {
          return list.filter((t) => t.bookSet !== 'Cánh Diều' && !t.id.includes('canhdieu'));
        }
      }
    } catch (e) {
      console.warn('[Storage] Cannot read textbooks from localStorage:', e);
    }
    // Only return initial books if local storage is completely uninitialized
    return INITIAL_TEXTBOOKS;
  },

  saveTextbooks(textbooks: Textbook[]): void {
    try {
      // Giữ nguyên 100% các chuỗi URL không cắt ngắn
      localStorage.setItem(KEYS.TEXTBOOKS, JSON.stringify(textbooks));
    } catch (e) {
      console.error('[Storage] Error saving textbooks to localStorage:', e);
    }
  },

  /**
   * Tải toàn bộ danh sách SGK từ Firebase Firestore (nguồn chính thức vĩnh viễn).
   * Tuyệt đối không lấy dữ liệu mặc định trong mã nguồn để ghi đè dữ liệu đã lưu.
   */
  async loadTextbooksFromFirestoreOrServer(): Promise<Textbook[]> {
    try {
      // 1. Thử lấy từ Firebase Firestore
      const firestoreBooks = await textbookFirebaseService.getAll();
      if (firestoreBooks && firestoreBooks.length > 0) {
        this.saveTextbooks(firestoreBooks);
        // Đồng bộ bản sao lưu sang server Express
        fetch('/api/textbooks/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ textbooks: firestoreBooks })
        }).catch(() => {});
        return firestoreBooks;
      }
    } catch (firebaseErr) {
      console.warn('[Storage] Firestore connection error, falling back to server API:', firebaseErr);
    }

    // 2. Dự phòng: Thử lấy từ Server REST API
    try {
      const res = await fetch('/api/textbooks');
      if (res.ok) {
        const serverData: Textbook[] = await res.json();
        if (Array.isArray(serverData) && serverData.length > 0) {
          const sanitized = serverData.filter((t) => t.bookSet !== 'Cánh Diều' && !t.id.includes('canhdieu'));
          this.saveTextbooks(sanitized);
          return sanitized;
        }
      }
    } catch (serverErr) {
      console.warn('[Storage] Server API fallback error:', serverErr);
    }

    // 3. Dự phòng cuối: Đọc từ localStorage
    return this.getTextbooks();
  },

  /**
   * Lưu hoặc cập nhật Sách giáo khoa vĩnh viễn vào Firebase Firestore.
   * Chờ Firestore xác nhận ghi thành công trước khi trả về.
   * Bảo toàn 100% URL bao gồm token, query parameters, page, viewer.
   */
  async saveOrUpdateTextbook(book: Textbook): Promise<Textbook> {
    const rawUrl = book.bookUrl.trim();
    if (!rawUrl) {
      throw new Error('Đường link URL sách giáo khoa không được để trống.');
    }

    const cleanBook: Textbook = {
      ...book,
      title: book.title.trim(),
      // BẢO TOÀN NGUYÊN VẸN 100% URL GIÁO VIÊN NHẬP
      bookUrl: rawUrl,
      updatedAt: new Date().toISOString()
    };

    // 1. Ghi trực tiếp vào Firebase Firestore và chờ xác nhận
    const confirmedBook = await textbookFirebaseService.save(cleanBook);

    // 2. Cập nhật vào danh sách cục bộ (local cache)
    const list = this.getTextbooks();
    const targetId = confirmedBook.id;
    const existingIdx = list.findIndex(
      (t) =>
        t.id === targetId ||
        (t.grade === confirmedBook.grade &&
          t.subjectId === confirmedBook.subjectId &&
          t.title.trim().toLowerCase() === confirmedBook.title.trim().toLowerCase())
    );

    if (existingIdx !== -1) {
      list[existingIdx] = confirmedBook;
    } else {
      list.unshift(confirmedBook);
    }
    this.saveTextbooks(list);

    // 3. Đồng bộ sang server Express API
    fetch('/api/textbooks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(confirmedBook)
    }).catch((err) => {
      console.warn('[Storage] Backend sync notice:', err);
    });

    return confirmedBook;
  },

  /**
   * Đồng bộ wrappers tương thích
   */
  addTextbook(newTextbook: Textbook): void {
    this.saveOrUpdateTextbook(newTextbook).catch((err) => {
      console.error('[Storage] Background addTextbook error:', err);
    });
  },

  updateTextbook(updated: Textbook): void {
    this.saveOrUpdateTextbook(updated).catch((err) => {
      console.error('[Storage] Background updateTextbook error:', err);
    });
  },

  /**
   * Xóa sách khỏi Firebase Firestore và đồng bộ
   */
  async deleteTextbook(id: string): Promise<void> {
    // 1. Xóa trên Firestore
    await textbookFirebaseService.delete(id);

    // 2. Cập nhật cache cục bộ
    const list = this.getTextbooks();
    const filtered = list.filter((t) => t.id !== id);
    this.saveTextbooks(filtered);

    // 3. Đồng bộ xóa trên server
    fetch(`/api/textbooks/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    }).catch(() => {});
  },

  /**
   * Thay đổi trạng thái hiển thị (Công khai / Ẩn) trên Firebase Firestore
   */
  async toggleTextbookStatus(id: string): Promise<TextbookStatus> {
    const list = this.getTextbooks();
    const idx = list.findIndex((t) => t.id === id);
    if (idx === -1) {
      throw new Error('Không tìm thấy sách giáo khoa.');
    }

    const current = list[idx];
    const newStatus: TextbookStatus = current.status === 'published' ? 'hidden' : 'published';

    // 1. Cập nhật trên Firestore
    await textbookFirebaseService.updateStatus(id, newStatus);

    // 2. Cập nhật cache cục bộ
    list[idx] = {
      ...current,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    this.saveTextbooks(list);

    // 3. Đồng bộ trạng thái trên server
    fetch(`/api/textbooks/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).catch(() => {});

    return newStatus;
  },

  async syncTextbooksWithServer(): Promise<Textbook[]> {
    return this.loadTextbooksFromFirestoreOrServer();
  },

  resetAllData(): void {
    localStorage.removeItem(KEYS.QUESTIONS);
    localStorage.removeItem(KEYS.QUESTIONS_CUSTOM);
    localStorage.removeItem(KEYS.QUESTION_OVERRIDES);
    localStorage.removeItem(KEYS.QUESTIONS_DELETED);
    localStorage.removeItem(KEYS.EXAMS);
    localStorage.removeItem(KEYS.LESSONS);
    localStorage.removeItem(KEYS.LESSONS_CUSTOM);
    localStorage.removeItem(KEYS.LESSON_OVERRIDES);
    localStorage.removeItem(KEYS.LESSONS_DELETED);
    localStorage.removeItem(KEYS.MEDIA);
    localStorage.removeItem(KEYS.RESULTS);
    localStorage.removeItem(KEYS.DOCUMENTS);
    localStorage.removeItem(KEYS.STUDENT_PROFILE);
    localStorage.removeItem(KEYS.ASSIGNMENTS);
    localStorage.removeItem(KEYS.SUBMISSIONS);
    localStorage.removeItem(KEYS.TEXTBOOKS);
    this.saveExams(INITIAL_EXAMS);
    this.saveLessons(INITIAL_LESSONS);
    this.saveMedia(INITIAL_LESSON_MEDIA);
    this.saveDocuments(INITIAL_DOCUMENTS);
    this.saveAssignments(INITIAL_ASSIGNMENTS);
    this.saveSubmissions(INITIAL_SUBMISSIONS);
    this.saveTextbooks(INITIAL_TEXTBOOKS);
  }
};

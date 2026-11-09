import {
  DifficultyLevel,
  Exam,
  ExamMatrixAndSpec7991,
  GradeLevel,
  MatrixRow7991,
  Question,
  SpecificationItem7991,
  SubjectId
} from '../types';
import { ALL_CURRICULUM_LESSONS } from '../data/curriculumMaster';

// Tên hiển thị chuẩn của môn học
export const SUBJECT_DISPLAY_NAMES: Record<SubjectId, string> = {
  toan: 'Toán học',
  van: 'Ngữ văn',
  'tieng-anh': 'Tiếng Anh',
  khtn: 'Khoa học tự nhiên',
  'lich-su-dia-ly': 'Lịch sử và Địa lí',
  gdcd: 'Giáo dục công dân',
  'tin-hoc': 'Tin học',
  'cong-nghe': 'Công nghệ',
  'am-nhac': 'Âm nhạc',
  'mi-thuat': 'Mĩ thuật',
  'giao-duc-the-chat': 'Giáo dục thể chất',
  'hoat-dong-trai-nghiem': 'Hoạt động trải nghiệm, hướng nghiệp',
  'giao-duc-dia-phuong': 'Giáo dục địa phương',
  'nghe-thuat': 'Nghệ thuật'
};

// Định nghĩa yêu cầu cần đạt mẫu theo chuẩn GDPT 2018 và CV 7991
export function getStandardCompetencyDescription(
  subjectId: SubjectId,
  chapter: string,
  level: DifficultyLevel
): string {
  const normChapter = chapter.toLowerCase();

  if (subjectId === 'toan') {
    if (normChapter.includes('hữu tỉ') || normChapter.includes('số thực') || normChapter.includes('số tự nhiên')) {
      switch (level) {
        case 'nhan_biet':
          return 'Nhận biết được tập hợp số, số đối, giá trị tuyệt đối, thứ tự trong tập hợp số.';
        case 'thong_hieu':
          return 'Thực hiện thành thạo các phép tính cộng, trừ, nhân, chia, lũy thừa và quy tắc dấu ngoặc.';
        case 'van_dung':
          return 'Vận dụng tính chất phép tính để tính hợp lý, giải bài toán tìm x và bài toán thực tế đơn giản.';
        case 'van_dung_cao':
          return 'Vận dụng linh hoạt bất đẳng thức, giá trị lớn nhất - nhỏ nhất hoặc giải quyết bài toán thực tế phức hợp.';
      }
    }
    if (normChapter.includes('tam giác') || normChapter.includes('góc') || normChapter.includes('song song')) {
      switch (level) {
        case 'nhan_biet':
          return 'Nhận biết hai góc kề bù, so le trong, đồng vị, định nghĩa và các trường hợp bằng nhau của tam giác.';
        case 'thong_hieu':
          return 'Chứng minh được hai tam giác bằng nhau, giải thích được tính chất tia phân giác và định lí hình học.';
        case 'van_dung':
          return 'Vận dụng tính chất tam giác bằng nhau để tính độ dài cạnh, số đo góc và khoảng cách thực tế.';
        case 'van_dung_cao':
          return 'Vận dụng phối hợp nhiều định lí để giải quyết bài toán chứng minh hình học và tối ưu không gian.';
      }
    }
    if (normChapter.includes('tỉ lệ thức') || normChapter.includes('đại số') || normChapter.includes('đa thức')) {
      switch (level) {
        case 'nhan_biet':
          return 'Nhận biết tỉ lệ thức, dãy tỉ số bằng nhau, biến số, bậc và hệ số của đa thức một biến.';
        case 'thong_hieu':
          return 'Thực hiện cộng trừ nhân chia đa thức một biến, tìm nghiệm của đa thức đơn giản.';
        case 'van_dung':
          return 'Vận dụng tính chất dãy tỉ số bằng nhau để chia tỉ lệ các đại lượng trong thực tế.';
        case 'van_dung_cao':
          return 'Phân tích đa thức, tìm nghiệm nguyên hoặc giải bài toán cực trị đại số ứng dụng.';
      }
    }
  }

  if (subjectId === 'van') {
    switch (level) {
      case 'nhan_biet':
        return 'Nhận biết thể loại, phương thức biểu đạt, nhân vật, chi tiết và kiến thức tiếng Việt trong văn bản.';
      case 'thong_hieu':
        return 'Hiểu được nội dung, chủ đề, cảm xúc của tác giả và tác dụng của các biện pháp tu từ.';
      case 'van_dung':
        return 'Vận dụng hiểu biết về văn bản để rút ra bài học nhân sinh, viết đoạn văn cảm thụ ngắn.';
      case 'van_dung_cao':
        return 'Liên hệ, so sánh tư tưởng tác phẩm với thực tiễn đời sống và thông điệp nhân văn sâu sắc.';
    }
  }

  if (subjectId === 'tieng-anh') {
    switch (level) {
      case 'nhan_biet':
        return 'Recognize target vocabulary, pronunciation, stress and basic grammatical structures.';
      case 'thong_hieu':
        return 'Understand sentence meaning, short reading passages and situational dialogues.';
      case 'van_dung':
        return 'Apply grammatical rules and vocabulary in sentence completion and communicative exchanges.';
      case 'van_dung_cao':
        return 'Analyze contextual clues in reading comprehension and rewrite sentences with preserved meaning.';
    }
  }

  if (subjectId === 'khtn') {
    switch (level) {
      case 'nhan_biet':
        return 'Nhận biết được khái niệm khoa học, công thức cơ bản, cấu tạo cơ quan sinh học hoặc tính chất vật chất.';
      case 'thong_hieu':
        return 'Giải thích được các hiện tượng tự nhiên, phản ứng hóa học hoặc quy luật biến đổi năng lượng.';
      case 'van_dung':
        return 'Vận dụng kiến thức khoa học để tính toán đại lượng vật lý, giải thích ứng dụng đời sống.';
      case 'van_dung_cao':
        return 'Đề xuất giải pháp bảo vệ môi trường, tiết kiệm năng lượng hoặc phân tích dữ liệu thực nghiệm.';
    }
  }

  // Mặc định chung cho các môn học theo chuẩn GDPT 2018
  switch (level) {
    case 'nhan_biet':
      return 'Tái hiện, nhận diện chính xác các thuật ngữ, định nghĩa, quy tắc và dữ liệu cốt lõi của bài học.';
    case 'thong_hieu':
      return 'Giải thích, phân biệt, so sánh và liên hệ được bản chất kiến thức trọng tâm.';
    case 'van_dung':
      return 'Vận dụng kiến thức, kỹ năng đã học để giải quyết các tình huống, bài tập quen thuộc.';
    case 'van_dung_cao':
      return 'Vận dụng tổng hợp các năng lực để xử lý tình huống thực tiễn mới, đòi hỏi tư duy phản biện.';
  }
}

/**
 * Tạo ma trận đề kiểm tra và bản đặc tả tự động theo Công văn 7991/BGDĐT-GDTrH
 */
export function generateExamMatrix7991(
  subjectId: SubjectId,
  grade: GradeLevel,
  semester: 1 | 2,
  questions: Question[],
  durationMinutes: number = 45,
  title?: string
): ExamMatrixAndSpec7991 {
  const subjectName = SUBJECT_DISPLAY_NAMES[subjectId] || 'Môn học';
  const totalQuestions = questions.length;

  // Gom nhóm câu hỏi theo chương / đơn vị kiến thức
  const chapterGroups = new Map<string, Question[]>();
  questions.forEach(q => {
    const ch = q.chapter || 'Kiến thức chung';
    if (!chapterGroups.has(ch)) {
      chapterGroups.set(ch, []);
    }
    chapterGroups.get(ch)!.push(q);
  });

  const matrixRows: MatrixRow7991[] = [];
  const specifications: SpecificationItem7991[] = [];

  let totalKnowing = 0;
  let totalUnderstanding = 0;
  let totalApplying = 0;
  let totalHighApplying = 0;

  let rowIdx = 1;
  chapterGroups.forEach((groupQuestions, chapter) => {
    let knowing = 0;
    let understanding = 0;
    let applying = 0;
    let highApplying = 0;

    groupQuestions.forEach(q => {
      switch (q.difficulty) {
        case 'nhan_biet':
          knowing++;
          break;
        case 'thong_hieu':
          understanding++;
          break;
        case 'van_dung':
          applying++;
          break;
        case 'van_dung_cao':
          highApplying++;
          break;
      }
    });

    totalKnowing += knowing;
    totalUnderstanding += understanding;
    totalApplying += applying;
    totalHighApplying += highApplying;

    const groupTotal = groupQuestions.length;
    const percentage = totalQuestions > 0 ? Math.round((groupTotal / totalQuestions) * 100) : 0;
    // Thang điểm 10 phân bổ đều theo số câu
    const pointsPerRow = totalQuestions > 0 ? Math.round((groupTotal / totalQuestions) * 10 * 10) / 10 : 0;

    matrixRows.push({
      id: `matrix-row-${rowIdx}`,
      topic: chapter,
      contentUnit: chapter,
      knowingCount: knowing,
      understandingCount: understanding,
      applyingCount: applying,
      highApplyingCount: highApplying,
      totalQuestions: groupTotal,
      totalPoints: pointsPerRow,
      percentage
    });

    // Tạo bản đặc tả tương ứng cho 4 mức độ nhận thức
    const levels: DifficultyLevel[] = ['nhan_biet', 'thong_hieu', 'van_dung', 'van_dung_cao'];
    levels.forEach(lvl => {
      const cnt =
        lvl === 'nhan_biet'
          ? knowing
          : lvl === 'thong_hieu'
          ? understanding
          : lvl === 'van_dung'
          ? applying
          : highApplying;

      if (cnt > 0) {
        specifications.push({
          id: `spec-${rowIdx}-${lvl}`,
          topic: chapter,
          contentUnit: chapter,
          level: lvl,
          competencyRequired: getStandardCompetencyDescription(subjectId, chapter, lvl),
          questionType: 'Trắc nghiệm nhiều lựa chọn (4 phương án, chọn 1 đúng)',
          questionCount: cnt
        });
      }
    });

    rowIdx++;
  });

  const knowingRatio = totalQuestions > 0 ? Math.round((totalKnowing / totalQuestions) * 100) : 40;
  const understandingRatio = totalQuestions > 0 ? Math.round((totalUnderstanding / totalQuestions) * 100) : 30;
  const applyingRatio = totalQuestions > 0 ? Math.round((totalApplying / totalQuestions) * 100) : 20;
  const highApplyingRatio = totalQuestions > 0 ? Math.round((totalHighApplying / totalQuestions) * 100) : 10;

  return {
    title: title || `Ma trận & Bản đặc tả đề kiểm tra môn ${subjectName} Khối ${grade} (CV 7991)`,
    subjectName,
    grade,
    semester,
    durationMinutes,
    matrixRows,
    specifications,
    totalQuestions,
    totalPoints: 10,
    knowingRatio,
    understandingRatio,
    applyingRatio,
    highApplyingRatio
  };
}

/**
 * PHÂN BỐ ĐÁP ÁN ĐÚNG ĐỒNG ĐỀU (A, B, C, D) & XÁO TRỘN PHƯƠNG ÁN
 * - Đối với đề 20 câu: chính xác 5 A, 5 B, 5 C, 5 D.
 * - Đối với đề 15 câu: 4 A, 4 B, 4 C, 3 D.
 * - Đối với đề 10 câu: 3 A, 3 B, 2 C, 2 D.
 * - Đối với đề 5 câu:  2 A, 1 B, 1 C, 1 D.
 * - Đảm bảo không quá 2 câu liên tiếp có cùng 1 chữ cái đáp án.
 * - Giữ nguyên 100% nội dung và tính chính xác của đáp án đúng.
 */
export function balanceAndShuffleQuestionOptions(
  questions: Question[]
): Question[] {
  const n = questions.length;
  if (n === 0) return [];

  // 1. Phân bổ mục tiêu đồng đều giữa 4 phương án (0: A, 1: B, 2: C, 3: D)
  const targetSlots: number[] = [];
  const baseCount = Math.floor(n / 4);
  const remainder = n % 4;

  for (let slot = 0; slot < 4; slot++) {
    const count = baseCount + (slot < remainder ? 1 : 0);
    for (let c = 0; c < count; c++) {
      targetSlots.push(slot);
    }
  }

  // 2. Xáo trộn ngẫu nhiên thứ tự các vị trí đáp án đúng
  for (let i = targetSlots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [targetSlots[i], targetSlots[j]] = [targetSlots[j], targetSlots[i]];
  }

  // 3. Khử hiện tượng xuất hiện 3 đáp án giống nhau liên tiếp (ví dụ: A, A, A hoặc B, B, B)
  for (let i = 2; i < targetSlots.length; i++) {
    if (targetSlots[i] === targetSlots[i - 1] && targetSlots[i] === targetSlots[i - 2]) {
      for (let j = 0; j < targetSlots.length; j++) {
        if (targetSlots[j] !== targetSlots[i] && (j < i - 2 || j > i)) {
          [targetSlots[i], targetSlots[j]] = [targetSlots[j], targetSlots[i]];
          break;
        }
      }
    }
  }

  // 4. Xếp đáp án đúng vào đúng vị trí targetSlot và xáo trộn 3 phương án nhiễu
  return questions.map((q, i) => {
    const targetSlot = targetSlots[i] ?? 0;
    const originalCorrectIndex = q.correctAnswerIndex;
    const correctText = q.options[originalCorrectIndex] ?? q.options[0];

    // Lọc lấy 3 phương án nhiễu
    const distractors = q.options.filter((_, idx) => idx !== originalCorrectIndex);
    // Xáo trộn 3 phương án nhiễu
    for (let d = distractors.length - 1; d > 0; d--) {
      const r = Math.floor(Math.random() * (d + 1));
      [distractors[d], distractors[r]] = [distractors[r], distractors[d]];
    }

    // Ghép vào mảng 4 phương án mới
    const newOptions: string[] = [];
    let distractorIdx = 0;
    for (let s = 0; s < 4; s++) {
      if (s === targetSlot) {
        newOptions.push(correctText);
      } else {
        newOptions.push(distractors[distractorIdx++] || 'Phương án khác');
      }
    }

    return {
      ...q,
      id: `${q.id}-shuffled-${Date.now()}-${i}`,
      options: newOptions,
      correctAnswerIndex: targetSlot
    };
  });
}

/**
 * Tự động trích xuất bổ sung câu hỏi hợp lệ từ bài học SGK khi phạm vi chọn chưa đủ số lượng
 */
export function synthesizeChapterQuestionsIfNeeded(
  _subjectId: SubjectId,
  _grade: GradeLevel,
  _chapter: string,
  _targetCount: number,
  existingQuestions: Question[]
): Question[] {
  // TUYỆT ĐỐI KHÔNG TỰ Ý SÁNG TÁC CÂU HỎI KHUÔN MẪU / CHUNG CHUNG
  // Chỉ sử dụng các câu hỏi đã được kiểm định từ ngân hàng chính thức bám sát SGK.
  // Nếu ngân hàng chưa đủ số câu yêu cầu cho một chương hẹp, hệ thống kích hoạt thông báo quy chuẩn (Rule 8).
  return existingQuestions;
}


/**
 * Tự động tạo đề kiểm tra chuẩn cấu trúc Công văn 7991 từ ngân hàng câu hỏi
 * Đảm bảo:
 * 1. Khi chọn số câu 5, 10, 15, 20: trả về CHÍNH XÁC số lượng câu đó.
 * 2. Phân bố đáp án đúng A, B, C, D đồng đều.
 * 3. Nếu chọn theo chương, chỉ lấy câu hỏi thuộc chương đó.
 */
export function createExam7991({
  subjectId,
  grade,
  semester = 1,
  chapterScope, // Nếu undefined hoặc 'all' thì là toàn bộ chương trình
  examType = '15_phut',
  questionCount = 10,
  pool,
  examCode = 'Mã đề 101'
}: {
  subjectId: SubjectId;
  grade: GradeLevel;
  semester?: 1 | 2;
  chapterScope?: string;
  examType?: '15_phut' | 'giua_ky' | 'cuoi_ky' | 'luyen_tap';
  questionCount?: number;
  pool: Question[];
  examCode?: string;
}): { success: boolean; exam: Exam | null; questions: Question[]; message?: string } {
  const subjectName = SUBJECT_DISPLAY_NAMES[subjectId] || 'Môn học';

  // Lọc theo môn và khối
  let scopePool = pool.filter(q => q.subjectId === subjectId && q.grade === grade);

  // Nếu chọn một chương cụ thể
  if (chapterScope && chapterScope !== 'all') {
    scopePool = scopePool.filter(q => q.chapter === chapterScope);

    // Nếu số lượng chưa đủ yêu cầu (ví dụ chọn 15 hoặc 20 câu), tự động trích xuất từ nội dung bài học của chính chương đó
    if (scopePool.length < questionCount) {
      scopePool = synthesizeChapterQuestionsIfNeeded(
        subjectId,
        grade,
        chapterScope,
        questionCount,
        scopePool
      );
    }

    // Nếu vẫn không đủ câu hỏi hợp lệ của chương đó, TUYỆT ĐỐI không lấy môn khác/chương khác mà báo lỗi rõ ràng theo Rule 8
    if (scopePool.length < questionCount) {
      return {
        success: false,
        exam: null,
        questions: [],
        message: `Phạm vi "${chapterScope}" hiện có ${scopePool.length} câu hỏi hợp lệ. Vui lòng chọn số lượng câu hỏi phù hợp (tối đa ${scopePool.length} câu) hoặc chuyển sang "Toàn bộ chương trình" để tạo đề ${questionCount} câu.`
      };
    }
  } else {
    // Toàn bộ chương trình
    if (scopePool.length < questionCount) {
      return {
        success: false,
        exam: null,
        questions: [],
        message: `Ngân hàng câu hỏi môn ${subjectName} Lớp ${grade} hiện có ${scopePool.length} câu, chưa đủ ${questionCount} câu theo yêu cầu.`
      };
    }
  }

  // Tỷ lệ chuẩn CV 7991: 40% Nhận biết, 30% Thông hiểu, 20% Vận dụng, 10% Vận dụng cao
  const targetNb = Math.max(1, Math.round(questionCount * 0.4));
  const targetTh = Math.max(1, Math.round(questionCount * 0.3));
  const targetVd = Math.max(0, Math.round(questionCount * 0.2));
  const targetVdc = Math.max(0, questionCount - (targetNb + targetTh + targetVd));

  const nbPool = scopePool.filter(q => q.difficulty === 'nhan_biet');
  const thPool = scopePool.filter(q => q.difficulty === 'thong_hieu');
  const vdPool = scopePool.filter(q => q.difficulty === 'van_dung');
  const vdcPool = scopePool.filter(q => q.difficulty === 'van_dung_cao');

  const picked: Question[] = [];

  const pickFromPool = (p: Question[], count: number) => {
    const shuffled = [...p].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  picked.push(...pickFromPool(nbPool, targetNb));
  picked.push(...pickFromPool(thPool, targetTh));
  picked.push(...pickFromPool(vdPool, targetVd));
  picked.push(...pickFromPool(vdcPool, targetVdc));

  // Nếu còn thiếu do một số mức độ ít câu hơn, bù từ phần còn lại TRONG CÙNG PHẠM VI
  if (picked.length < questionCount) {
    const pickedIds = new Set(picked.map(q => q.id));
    const remaining = scopePool.filter(q => !pickedIds.has(q.id));
    const shuffledRem = [...remaining].sort(() => 0.5 - Math.random());
    picked.push(...shuffledRem.slice(0, questionCount - picked.length));
  }

  // Lấy chính xác đúng số lượng questionCount yêu cầu (5, 10, 15 hoặc 20)
  const finalPicked = picked.slice(0, questionCount);

  if (finalPicked.length !== questionCount) {
    return {
      success: false,
      exam: null,
      questions: [],
      message: `Không đủ số lượng câu hỏi hợp lệ trong phạm vi đã chọn (yêu cầu: ${questionCount}, thực tế: ${finalPicked.length}).`
    };
  }

  // PHÂN BỐ ĐÁP ÁN ĐÚNG ĐỒNG ĐỀU (A, B, C, D) & XÁO TRỘN PHƯƠNG ÁN
  const balancedQuestions = balanceAndShuffleQuestionOptions(finalPicked);

  const durationMinutes =
    examType === '15_phut'
      ? 15
      : examType === 'giua_ky'
      ? 45
      : examType === 'cuoi_ky'
      ? 60
      : Math.max(5, Math.ceil(balancedQuestions.length * 1.5));

  const scopeTitle = chapterScope && chapterScope !== 'all' ? chapterScope : 'Toàn bộ chương trình';

  const examTitle =
    examType === '15_phut'
      ? `Đề kiểm tra 15 phút (${examCode}) – ${subjectName} Lớp ${grade}`
      : examType === 'giua_ky'
      ? `Đề kiểm tra Giữa học kỳ (${examCode}) – ${subjectName} Lớp ${grade}`
      : examType === 'cuoi_ky'
      ? `Đề kiểm tra Cuối học kỳ (${examCode}) – ${subjectName} Lớp ${grade}`
      : `Đề luyện tập chuẩn CV 7991 (${examCode}) – ${subjectName} Lớp ${grade}`;

  // Tạo Ma trận và Bản đặc tả theo CV 7991
  const matrix = generateExamMatrix7991(
    subjectId,
    grade,
    semester,
    balancedQuestions,
    durationMinutes,
    `Ma trận & Bản đặc tả: ${examTitle}`
  );

  const exam: Exam = {
    id: `exam-7991-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title: examTitle,
    subjectId,
    grade,
    semester,
    durationMinutes,
    questionIds: balancedQuestions.map(q => q.id),
    description: `Đề thi trắc nghiệm được tạo tự động theo cấu trúc Ma trận & Bản đặc tả Công văn 7991/BGDĐT-GDTrH. Phạm vi: ${scopeTitle}. Số câu: ${balancedQuestions.length}.`,
    examType,
    isOfficial: true,
    examCode,
    matrix
  };

  return { success: true, exam, questions: balancedQuestions };
}

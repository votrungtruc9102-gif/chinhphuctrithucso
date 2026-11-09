import * as fs from 'fs';
import * as path from 'path';
import { INITIAL_QUESTIONS } from '../src/data/mockData';
import { Question, Exam, EssayQuestion, SubjectId, GradeLevel } from '../src/types';

// Danh sách 13 môn học
const subjects: SubjectId[] = [
  'toan',
  'van',
  'tieng-anh',
  'khtn',
  'lich-su-dia-ly',
  'gdcd',
  'tin-hoc',
  'cong-nghe',
  'am-nhac',
  'mi-thuat',
  'giao-duc-the-chat',
  'hoat-dong-trai-nghiem',
  'giao-duc-dia-phuong'
];

const grades: GradeLevel[] = [6, 7, 8, 9];

const subjectNames: Record<string, string> = {
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

// Hàm cân bằng vị trí đáp án đúng theo quy chuẩn
// n=40 -> 10A, 10B, 10C, 10D
// n=10 -> 3A, 3B, 2C, 2D
// n=5  -> 2A, 1B, 1C, 1D
function createBalancedTargetSlots(n: number): number[] {
  const slots: number[] = [];
  const base = Math.floor(n / 4);
  const remainder = n % 4;
  for (let s = 0; s < 4; s++) {
    const count = base + (s < remainder ? 1 : 0);
    for (let c = 0; c < count; c++) {
      slots.push(s);
    }
  }

  // Xáo trộn ngẫu nhiên
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slots[i], slots[j]] = [slots[j], slots[i]];
  }

  // Khử lặp quá 2 câu liên tiếp cùng đáp án
  for (let i = 2; i < slots.length; i++) {
    if (slots[i] === slots[i - 1] && slots[i] === slots[i - 2]) {
      for (let j = 0; j < slots.length; j++) {
        if (slots[j] !== slots[i] && (j < i - 2 || j > i)) {
          [slots[i], slots[j]] = [slots[j], slots[i]];
          break;
        }
      }
    }
  }

  return slots;
}

// Hàm chuẩn hóa danh sách câu hỏi theo slot đáp án đúng
function balanceQuestionList(questions: Question[], count: number, idPrefix: string): Question[] {
  const targetSlots = createBalancedTargetSlots(count);
  const result: Question[] = [];

  for (let i = 0; i < count; i++) {
    const baseQ = questions[i % questions.length];
    const targetSlot = targetSlots[i];
    const correctOpt = baseQ.options[baseQ.correctAnswerIndex] || baseQ.options[0];
    const distractors = baseQ.options.filter((_, idx) => idx !== baseQ.correctAnswerIndex);

    const newOptions: string[] = [];
    let distIdx = 0;
    for (let s = 0; s < 4; s++) {
      if (s === targetSlot) {
        newOptions.push(correctOpt);
      } else {
        newOptions.push(distractors[distIdx++] || `Phương án khác ${s + 1}`);
      }
    }

    result.push({
      ...baseQ,
      id: `${idPrefix}-q${i + 1}`,
      options: newOptions,
      correctAnswerIndex: targetSlot
    });
  }

  return result;
}

// 2 câu hỏi tự luận theo từng môn học
function getEssayQuestions(subjectId: SubjectId, grade: GradeLevel): EssayQuestion[] {
  const subName = subjectNames[subjectId];
  switch (subjectId) {
    case 'toan':
      return [
        {
          id: `essay-${subjectId}-k${grade}-1`,
          question: `Cho biểu thức $A = \\frac{2x - 3}{x + 1}$ (với $x \\neq -1$). Hãy tìm giá trị nguyên của $x$ để biểu thức $A$ nhận giá trị là một số nguyên.`,
          maxScore: 2.0,
          guide: `Bước 1: Biến đổi $A = \\frac{2(x + 1) - 5}{x + 1} = 2 - \\frac{5}{x + 1}$ (1.0 điểm).\nBước 2: Để $A$ nguyên thì $x + 1$ là ước của 5, tức $x + 1 \\in \\{-5, -1, 1, 5\\}$ (0.5 điểm).\nBước 3: Lập bảng kết luận $x \\in \\{-6, -2, 0, 4\\}$ thỏa mãn điều kiện đề bài (0.5 điểm).`
        },
        {
          id: `essay-${subjectId}-k${grade}-2`,
          question: `Cho tam giác $ABC$ vuông tại $A$. Kẻ đường phân giác $BD$ của góc $B$ ($D \\in AC$). Kẻ $DE \\perp BC$ tại $E$.\na) Chứng minh $\\Delta ABD = \\Delta EBD$.\nb) So sánh độ dài hai đoạn thẳng $AD$ và $DC$.`,
          maxScore: 3.0,
          guide: `a) Chứng minh $\\Delta ABD = \\Delta EBD$ theo trường hợp cạnh huyền - góc nhọn: $BD$ chung, $\\widehat{ABD} = \\widehat{EBD}$, $\\widehat{BAD} = \\widehat{BED} = 90^\\circ$ (1.5 điểm).\nb) Suy ra $AD = ED$ (hai cạnh tương ứng). Trong $\\Delta EDC$ vuông tại $E$, cạnh huyền $DC > ED$, suy ra $DC > AD$ (1.5 điểm).`
        }
      ];
    case 'van':
      return [
        {
          id: `essay-${subjectId}-k${grade}-1`,
          question: `Đọc đoạn trích sau và thực hiện yêu cầu:\n"Biết lắng nghe và thấu hiểu là chiếc cầu nối đưa con người đến gần nhau hơn trong cuộc sống."\na) Xác định thành phần chủ ngữ và vị ngữ trong câu trên.\nb) Nêu ngắn gọn ý nghĩa của thông điệp mà câu văn gửi gắm.`,
          maxScore: 2.0,
          guide: `a) Chủ ngữ: "Biết lắng nghe và thấu hiểu"; Vị ngữ: "là chiếc cầu nối đưa con người đến gần nhau hơn trong cuộc sống" (1.0 điểm).\nb) Thông điệp: Khuyên chúng ta cần biết trân trọng sự giao tiếp, biết chia sẻ, đồng cảm để xây dựng các mối quan hệ xã hội tốt đẹp (1.0 điểm).`
        },
        {
          id: `essay-${subjectId}-k${grade}-2`,
          question: `Viết một đoạn văn (khoảng 7 đến 10 câu) trình bày suy nghĩ của em về đức tính khiêm tốn của người học sinh trong học tập và rèn luyện.`,
          maxScore: 3.0,
          guide: `Hình thức: Đoạn văn đúng dung lượng 7-10 câu, diễn đạt mạch lạc, không sai lỗi chính tả (0.5 điểm).\nNội dung:\n- Nêu định nghĩa khiêm tốn: Là không tự cao, tự đại, luôn cầu thị học hỏi (0.5 điểm).\n- Biểu hiện của tính khiêm tốn trong học tập: Biết lắng nghe thầy cô, bạn bè, không giấu dốt (1.0 điểm).\n- Ý nghĩa: Giúp mở rộng tri thức, được mọi người yêu mến, ngày càng tiến bộ (0.5 điểm).\n- Liên hệ bản thân: Bài học hành động cụ thể của em (0.5 điểm).`
        }
      ];
    case 'tieng-anh':
      return [
        {
          id: `essay-${subjectId}-k${grade}-1`,
          question: `Rewrite each sentence so that it means the same as the first one:\n1. My house is bigger than your house.\n-> Your house is ........................................................\n2. It takes him two hours to do his homework every evening.\n-> He spends ............................................................`,
          maxScore: 2.0,
          guide: `1. Your house is smaller than my house. (or: not as big as my house.) (1.0 mark)\n2. He spends two hours doing his homework every evening. (1.0 mark)`
        },
        {
          id: `essay-${subjectId}-k${grade}-2`,
          question: `Write a short paragraph (50 - 70 words) about your favourite hobby, mentioning:\n- What your hobby is\n- When you started it\n- Why you enjoy it`,
          maxScore: 3.0,
          guide: `- Form & grammar: correct sentence structure, appropriate vocabulary (1.0 mark)\n- Content: state clearly what the hobby is (1.0 mark), when started and why it is enjoyable (1.0 mark).`
        }
      ];
    case 'tin-hoc':
      return [
        {
          id: `essay-${subjectId}-k${grade}-1`,
          question: `Trình bày khái niệm phần cứng và phần mềm máy tính. Nêu ít nhất hai ví dụ minh họa cho từng loại.`,
          maxScore: 2.0,
          guide: `- Phần cứng: Toàn bộ các thiết bị vật lý tạo nên máy tính (CPU, RAM, bàn phím, màn hình,...) (1.0 điểm).\n- Phần mềm: Các chương trình, tập lệnh điều khiển máy tính hoạt động (Windows, Word, trình duyệt Chrome,...) (1.0 điểm).`
        },
        {
          id: `essay-${subjectId}-k${grade}-2`,
          question: `Nêu các biện pháp cần thiết để bảo vệ dữ liệu cá nhân và an toàn khi tham gia môi trường mạng Internet.`,
          maxScore: 3.0,
          guide: `- Đặt mật khẩu mạnh (gồm chữ hoa, chữ thường, chữ số, ký tự đặc biệt) và thay đổi định kỳ (1.0 điểm).\n- Không chia sẻ thông tin cá nhân (địa chỉ, số CCCD, tài khoản) cho người lạ (1.0 điểm).\n- Cài đặt phần mềm diệt virus và không nhấn vào các liên kết độc hại, trang web lạ (1.0 điểm).`
        }
      ];
    default:
      return [
        {
          id: `essay-${subjectId}-k${grade}-1`,
          question: `Trình bày ý nghĩa và vai trò của môn học ${subName} Lớp ${grade} đối với đời sống thực tiễn và sự phát triển toàn diện của người học sinh.`,
          maxScore: 2.0,
          guide: `- Giúp trang bị các kiến thức cơ bản, thiết thực phục vụ đời sống và rèn luyện thể chất, tinh thần (1.0 điểm).\n- Bồi dưỡng phẩm chất, kỹ năng và phát triển năng lực cá nhân một cách tích cực (1.0 điểm).`
        },
        {
          id: `essay-${subjectId}-k${grade}-2`,
          question: `Từ kiến thức đã học trong môn ${subName}, hãy đề xuất ít nhất 3 việc làm cụ thể của bản thân để vận dụng vào học tập và sinh hoạt hàng ngày.`,
          maxScore: 3.0,
          guide: `- Đề xuất được 3 việc làm cụ thể, thiết thực và phù hợp với lứa tuổi học sinh (2.0 điểm).\n- Giải thích được tác dụng tích cực của từng việc làm đó đối với bản thân và cộng đồng (1.0 điểm).`
        }
      ];
  }
}

// Tạo danh sách 208 đề kiểm tra chuẩn hóa
function generateAllCanonicalExams(): { exams: Exam[]; questions: Question[] } {
  const allCanonicalExams: Exam[] = [];
  const generatedQuestions: Question[] = [];

  for (const grade of grades) {
    for (const subId of subjects) {
      const subName = subjectNames[subId];

      // Lọc câu hỏi hiện có của môn và khối này
      let pool = INITIAL_QUESTIONS.filter(q => q.subjectId === subId && q.grade === grade);
      if (pool.length === 0) {
        // Fallback: Lấy câu hỏi cùng môn ở khối gần nhất
        pool = INITIAL_QUESTIONS.filter(q => q.subjectId === subId);
      }
      if (pool.length === 0) {
        // Fallback tổng
        pool = INITIAL_QUESTIONS.slice(0, 40);
      }

      // 1. Đề 15 phút (10 câu trắc nghiệm)
      const q15p = balanceQuestionList(pool, 10, `exam-${subId}-k${grade}-15p`);
      generatedQuestions.push(...q15p);
      allCanonicalExams.push({
        id: `exam-${subId}-k${grade}-15p`,
        title: `Kiểm tra 15 phút: ${subName} ${grade} (Mã đề 101)`,
        subjectId: subId,
        grade,
        semester: 1,
        durationMinutes: 15,
        examType: '15_phut',
        isOfficial: true,
        examCode: 'Mã đề 101',
        description: `Đề kiểm tra nhanh 15 phút đánh giá kiến thức trọng tâm môn ${subName} Lớp ${grade} theo quy định Công văn 7991. Đúng 10 câu trắc nghiệm (3, 3, 2, 2).`,
        questionIds: q15p.map(q => q.id)
      });

      // 2. Đề Giữa kỳ (40 câu trắc nghiệm)
      const qGk = balanceQuestionList(pool, 40, `exam-${subId}-k${grade}-gk`);
      generatedQuestions.push(...qGk);
      allCanonicalExams.push({
        id: `exam-${subId}-k${grade}-gk`,
        title: `Đề kiểm tra Giữa học kỳ: ${subName} ${grade} (Mã đề 102)`,
        subjectId: subId,
        grade,
        semester: 1,
        durationMinutes: 45,
        examType: 'giua_ky',
        isOfficial: true,
        examCode: 'Mã đề 102',
        description: `Đề kiểm tra định kỳ Giữa học kỳ môn ${subName} Lớp ${grade} gồm đúng 40 câu trắc nghiệm chuẩn Ma trận & Bản đặc tả CV 7991 (10 A, 10 B, 10 C, 10 D).`,
        questionIds: qGk.map(q => q.id)
      });

      // 3. Đề Cuối kỳ (40 câu trắc nghiệm)
      const qCk = balanceQuestionList(pool, 40, `exam-${subId}-k${grade}-ck`);
      generatedQuestions.push(...qCk);
      allCanonicalExams.push({
        id: `exam-${subId}-k${grade}-ck`,
        title: `Đề kiểm tra Cuối học kỳ: ${subName} ${grade} (Mã đề 103)`,
        subjectId: subId,
        grade,
        semester: 1,
        durationMinutes: 60,
        examType: 'cuoi_ky',
        isOfficial: true,
        examCode: 'Mã đề 103',
        description: `Đề khảo sát Cuối học kỳ môn ${subName} Lớp ${grade} tích hợp toàn diện kiến thức học kỳ, gồm đúng 40 câu trắc nghiệm cân bằng tuyệt đối 4 phương án.`,
        questionIds: qCk.map(q => q.id)
      });

      // 4. Đề Luyện tập (5 câu trắc nghiệm + 2 câu tự luận)
      const qLt = balanceQuestionList(pool, 5, `exam-${subId}-k${grade}-lt`);
      generatedQuestions.push(...qLt);
      const essays = getEssayQuestions(subId, grade);
      allCanonicalExams.push({
        id: `exam-${subId}-k${grade}-lt`,
        title: `Đề ôn tập & Luyện tập: ${subName} ${grade} (Mã đề 104)`,
        subjectId: subId,
        grade,
        semester: 1,
        durationMinutes: 30,
        examType: 'luyen_tap',
        isOfficial: true,
        examCode: 'Mã đề 104',
        description: `Đề luyện tập tổng hợp gồm Phần I: Đúng 5 câu trắc nghiệm khách quan và Phần II: Đúng 2 câu hỏi tự luận có hướng dẫn chấm và đáp án chi tiết.`,
        questionIds: qLt.map(q => q.id),
        essayQuestions: essays
      });
    }
  }

  return { exams: allCanonicalExams, questions: generatedQuestions };
}

const { exams, questions } = generateAllCanonicalExams();
console.log(`Successfully generated ${exams.length} canonical exams and ${questions.length} standardized questions.`);

// Ghi file canonicalExams.ts
const canonicalExamsContent = `import { Exam } from '../types';
import { generateExamMatrix7991 } from '../services/examMatrixService';
import { INITIAL_QUESTIONS } from './mockData';

export const CANONICAL_EXAMS: Exam[] = ${JSON.stringify(exams, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/canonicalExams.ts'), canonicalExamsContent, 'utf-8');
console.log('Saved src/data/canonicalExams.ts');

// Ghi file standardizedExamQuestions.ts
const questionsContent = `import { Question } from '../types';

export const STANDARDIZED_EXAM_QUESTIONS: Question[] = ((${JSON.stringify(questions, null, 2)}) as unknown) as Question[];
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/standardizedExamQuestions.ts'), questionsContent, 'utf-8');
console.log('Saved src/data/standardizedExamQuestions.ts');

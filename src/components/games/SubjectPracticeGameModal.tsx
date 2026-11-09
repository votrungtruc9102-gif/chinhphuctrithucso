import React, { useState, useEffect, useRef, Component, ErrorInfo, ReactNode } from 'react';
import {
  X,
  BookOpen,
  Calculator,
  Languages,
  Atom,
  Compass,
  Laptop,
  Check,
  ArrowRight,
  Trophy,
  Flame,
  Clock,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Eye,
  AlertTriangle,
  Award,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GradeLevel } from '../../types';
import { selectAndShuffleGameQuestions, generateBalancedTargetSlots, shuffleSingleQuestionOptions } from '../../utils/gameQuestionHelper';

interface SubjectPracticeGameModalProps {
  onClose: () => void;
  onAddScore?: (points: number, txId?: string, gameType?: string, details?: string) => void;
  currentUser?: {
    id: string;
    name: string;
    className?: string;
    grade?: number;
  } | null;
  grade?: GradeLevel;
}

interface QuestionItem {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface SubjectStage {
  id: string;
  subjectName: string;
  shortName: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeColor: string;
  borderTheme: string;
  gradientTheme: string;
  questions: QuestionItem[];
}

// Ngân hàng câu hỏi phong phú 6 môn học THCS theo GDPT 2018
const SUBJECT_QUESTIONS_BANK: Record<string, QuestionItem[]> = {
  toan: [
    {
      id: 'toan_1',
      question: 'Tập hợp các số tự nhiên khác 0 được ký hiệu chuẩn là gì trong chương trình Toán THCS?',
      options: ['Tập hợp N*', 'Tập hợp N', 'Tập hợp Z', 'Tập hợp Q'],
      correct: 0,
      explanation: 'Ký hiệu N* (hoặc N\\{0}) đại diện cho tập hợp các số tự nhiên khác 0: {1, 2, 3, 4, ...}.'
    },
    {
      id: 'toan_2',
      question: 'Số nào sau đây là số nguyên tố chẵn duy nhất trong tập hợp các số nguyên?',
      options: ['Số 2', 'Số 0', 'Số 4', 'Số 1'],
      correct: 0,
      explanation: 'Số 2 là số nguyên tố chẵn duy nhất và là số nguyên tố nhỏ nhất.'
    },
    {
      id: 'toan_3',
      question: 'Ước chung lớn nhất của hai số 18 và 24 là bao nhiêu?',
      options: ['6', '3', '12', '2'],
      correct: 0,
      explanation: '18 = 2 * 3^2; 24 = 2^3 * 3 => ƯCLN(18, 24) = 2 * 3 = 6.'
    },
    {
      id: 'toan_4',
      question: 'Số đối của số hữu tỉ -3/5 là số nào?',
      options: ['3/5', '-5/3', '5/3', '-3/5'],
      correct: 0,
      explanation: 'Hai số đối nhau có tổng bằng 0, số đối của -3/5 là 3/5.'
    },
    {
      id: 'toan_5',
      question: 'Tổng ba góc trong một tam giác bất kỳ luôn luôn bằng bao nhiêu độ?',
      options: ['180°', '360°', '90°', '270°'],
      correct: 0,
      explanation: 'Theo định lý tổng các góc trong tam giác, tổng ba góc của tam giác luôn bằng 180°.'
    },
    {
      id: 'toan_6',
      question: 'Căn bậc hai số học của 81 là số nào sau đây?',
      options: ['9', '-9', '81', '3'],
      correct: 0,
      explanation: 'Căn bậc hai số học của 81 là 9 vì 9 >= 0 và 9^2 = 81.'
    }
  ],
  van: [
    {
      id: 'van_1',
      question: 'Truyền thuyết nào ngợi ca tinh thần chống giặc ngoại xâm của dân tộc ta thời kỳ Hùng Vương thứ 6?',
      options: ['Thánh Gióng', 'Sơn Tinh Thủy Tinh', 'Bánh chưng bánh giầy', 'Sự tích Hồ Gươm'],
      correct: 0,
      explanation: 'Thánh Gióng là biểu tượng bất hủ của lòng yêu nước và ý chí quật cường chống giặc ngoại xâm của dân tộc Việt Nam.'
    },
    {
      id: 'van_2',
      question: 'Biện pháp tu từ nào được sử dụng trong câu thơ: "Bác đã đi rồi sao Bác ơi! Mùa thu đang đẹp nắng xanh trời"?',
      options: ['Nói giảm nói tránh ("đi rồi")', 'Ẩn dụ chuyển đổi cảm giác', 'So sánh ngang bằng', 'Điệp từ điệp ngữ'],
      correct: 0,
      explanation: 'Cụm từ "đi rồi" là phép nói giảm nói tránh biểu thị sự từ trần nhằm giảm nhẹ nỗi đau xót, mất mát to lớn.'
    },
    {
      id: 'van_3',
      question: 'Bài thơ "Nam quốc sơn hà" khẳng định chủ quyền độc lập của nước Đại Việt gắn liền với phòng tuyến nào?',
      options: ['Sông Như Nguyệt (Sông Cầu)', 'Sông Bạch Đằng', 'Sông Hồng', 'Ải Chi Lăng'],
      correct: 0,
      explanation: 'Bài thơ thần vang lên trên phòng tuyến sông Như Nguyệt trong cuộc kháng chiến chống Tống năm 1077.'
    },
    {
      id: 'van_4',
      question: 'Văn bản "Dế Mèn phiêu lưu ký" là kiệt tác văn học thiếu nhi của nhà văn Việt Nam nào?',
      options: ['Tô Hoài', 'Nguyễn Nhật Ánh', 'Trần Đăng Khoa', 'Vũ Tú Nam'],
      correct: 0,
      explanation: 'Nhà văn Tô Hoài sáng tác "Dế Mèn phiêu lưu ký" xuất bản lần đầu năm 1941.'
    },
    {
      id: 'van_5',
      question: 'Trong truyện cổ tích Tấm Cám, chim vàng anh là hóa thân đầu tiên của nhân vật nào?',
      options: ['Cô Tấm', 'Mẹ Cám', 'Cám', 'Bà lão bán nước'],
      correct: 0,
      explanation: 'Sau khi bị hãm hại ở cây cau, Tấm liên tục hóa thân thành chim vàng anh, hai cây xoan đào, khung cửi và quả thị.'
    },
    {
      id: 'van_6',
      question: 'Từ ngữ nào sau đây là từ mượn gốc Hán trong tiếng Việt?',
      options: ['Sơn hà', 'Nhà cửa', 'Xe cộ', 'Cây cỏ'],
      correct: 0,
      explanation: '"Sơn hà" (núi sông) là từ Hán - Việt biểu thị đất nước, lãnh thổ thiêng liêng.'
    }
  ],
  'tieng-anh': [
    {
      id: 'eng_1',
      question: 'Choose the correct form of the verb: "My teacher ______ to school by bus every weekday."',
      options: ['goes', 'go', 'going', 'is go'],
      correct: 0,
      explanation: 'Thì hiện tại đơn với chủ ngữ ngôi thứ ba số ít "My teacher", động từ "go" thêm "es" thành "goes".'
    },
    {
      id: 'eng_2',
      question: 'Which word has the underlined part pronounced differently from the others?',
      options: ['cooks (/s/)', 'plays (/z/)', 'reads (/z/)', 'cleans (/z/)'],
      correct: 0,
      explanation: 'Đuôi -s sau phụ âm vô thanh /k/ phát âm là /s/ (cooks), còn lại phát âm là /z/.'
    },
    {
      id: 'eng_3',
      question: 'Look at the sign: "No littering here". What does it mean?',
      options: ['You must not throw rubbish here', 'You should park your car here', 'You can eat and drink here', 'You need to be quiet here'],
      correct: 0,
      explanation: '"No littering" nghĩa là cấm xả rác bừa bãi tại khu vực này.'
    },
    {
      id: 'eng_4',
      question: 'Choose the best response: "Thank you very much for your great help!" - "______"',
      options: ['You are welcome!', 'Yes, I am.', 'No problem, I am busy.', 'Never mind me.'],
      correct: 0,
      explanation: '"You are welcome!" là câu đối đáp lịch sự chuẩn mực khi người khác nói lời cảm ơn.'
    },
    {
      id: 'eng_5',
      question: 'What is the opposite meaning of the adjective "ancient"?',
      options: ['Modern', 'Old', 'Historic', 'Traditional'],
      correct: 0,
      explanation: '"Ancient" (cổ kính, cổ xưa) trái nghĩa với "modern" (hiện đại, tân tiến).'
    },
    {
      id: 'eng_6',
      question: 'Choose the correct preposition: "Ha Long Bay is famous ______ its magnificent limestone islands."',
      options: ['for', 'with', 'about', 'in'],
      correct: 0,
      explanation: 'Cụm tính từ đi với giới từ cố định: "be famous for something" (nổi tiếng về cái gì).'
    }
  ],
  khtn: [
    {
      id: 'khtn_1',
      question: 'Đơn vị cơ bản cấu tạo nên mọi cơ thể sinh vật sống theo sinh học lớp 6 là gì?',
      options: ['Tế bào (Cell)', 'Mô liên kết', 'Cơ quan', 'Hệ cơ quan'],
      correct: 0,
      explanation: 'Tế bào là đơn vị cơ bản cấu trúc và chức năng cấu tạo nên mọi cơ thể sinh vật sống.'
    },
    {
      id: 'khtn_2',
      question: 'Khí nào chiếm thể tích lớn nhất (khoảng 78%) trong thành phần của không khí quyển Trái Đất?',
      options: ['Khí Nitrogen (N2)', 'Khí Oxygen (O2)', 'Khí Carbon dioxide (CO2)', 'Hơi nước và các khí khác'],
      correct: 0,
      explanation: 'Khí Nitrogen chiếm khoảng 78% thể tích không khí, kế tiếp là Oxygen chiếm khoảng 21%.'
    },
    {
      id: 'khtn_3',
      question: 'Quá trình quang hợp ở cây xanh chủ yếu diễn ra tại bào quan nào trong tế bào lá cây?',
      options: ['Lục lạp (Chloroplast)', 'Nhân tế bào', 'Ti thể', 'Không bào'],
      correct: 0,
      explanation: 'Lục lạp chứa chất diệp lục hấp thụ năng lượng ánh sáng Mặt Trời để thực hiện quang hợp.'
    },
    {
      id: 'khtn_4',
      question: 'Nước đá tan chảy thành nước lỏng là ví dụ của hiện tượng nào?',
      options: ['Hiện tượng vật lý', 'Hiện tượng hóa học', 'Hiện tượng sinh học', 'Phản ứng hạt nhân'],
      correct: 0,
      explanation: 'Nước đá nóng chảy chỉ biến đổi về trạng thái (từ rắn sang lỏng), không tạo thành chất mới nên là hiện tượng vật lý.'
    },
    {
      id: 'khtn_5',
      question: 'Kim loại nào sau đây ở trạng thái lỏng trong điều kiện nhiệt độ phòng thông thường?',
      options: ['Thủy ngân (Hg)', 'Sắt (Fe)', 'Nhôm (Al)', 'Đồng (Cu)'],
      correct: 0,
      explanation: 'Thủy ngân (Mercury - Hg) là kim loại duy nhất ở thể lỏng ở nhiệt độ phòng.'
    },
    {
      id: 'khtn_6',
      question: 'Trọng lượng của một vật có khối lượng 5 kg trên bề mặt Trái Đất xấp xỉ bằng bao nhiêu Newton?',
      options: ['50 N', '5 N', '0.5 N', '500 N'],
      correct: 0,
      explanation: 'Trọng lượng P = 10 * m = 10 * 5 = 50 N.'
    }
  ],
  'lich-su-dia-ly': [
    {
      id: 'lsdl_1',
      question: 'Kinh đô đầu tiên của nhà nước Văn Lang thời các vua Hùng nằm ở địa danh nào ngày nay?',
      options: ['Phong Châu (Phú Thọ)', 'Cổ Loa (Đông Anh, Hà Nội)', 'Hoa Lư (Ninh Bình)', 'Thăng Long (Hà Nội)'],
      correct: 0,
      explanation: 'Kinh đô đầu tiên của nước Văn Lang đặt tại Phong Châu (nay thuộc tỉnh Phú Thọ).'
    },
    {
      id: 'lsdl_2',
      question: 'Đường Xích đạo là vĩ tuyến số bao nhiêu trên quả Địa cầu?',
      options: ['Vĩ tuyến 0°', 'Vĩ tuyến 23°27\' Bắc', 'Vĩ tuyến 66°33\' Nam', 'Vĩ tuyến 90°'],
      correct: 0,
      explanation: 'Xích đạo là vĩ tuyến gốc có số độ 0°, chia Trái Đất thành hai nửa Bán cầu Bắc và Bán cầu Nam.'
    },
    {
      id: 'lsdl_3',
      question: 'Chiến thắng Bạch Đằng năm 938 do danh tướng nào lãnh đạo chấm dứt hơn 1000 năm Bắc thuộc?',
      options: ['Ngô Quyền', 'Lý Thường Kiệt', 'Trần Hưng Đạo', 'Lê Hoàn'],
      correct: 0,
      explanation: 'Ngô Quyền lãnh đạo nhân dân cắm cọc nhọn trên sông Bạch Đằng, đánh tan quân Nam Hán mở ra kỷ nguyên độc lập lâu dài.'
    },
    {
      id: 'lsdl_4',
      question: 'Châu lục nào có diện tích tự nhiên lớn nhất và dân số đông nhất trên thế giới?',
      options: ['Châu Á', 'Châu Phi', 'Châu Mỹ', 'Châu Âu'],
      correct: 0,
      explanation: 'Châu Á là châu lục rộng lớn nhất (khoảng 44,5 triệu km²) và đông dân nhất hành tinh.'
    },
    {
      id: 'lsdl_5',
      question: 'Nước Đại Cồ Việt dưới triều vua Đinh Tiên Hoàng đóng đô tại địa danh nào?',
      options: ['Hoa Lư (Ninh Bình)', 'Cổ Loa (Hà Nội)', 'Mê Linh (Hà Nội)', 'Đại La (Hà Nội)'],
      correct: 0,
      explanation: 'Năm 968 sau khi dẹp loạn 12 sứ quân, Đinh Bộ Lĩnh lên ngôi Hoàng đế và đóng đô ở Hoa Lư.'
    },
    {
      id: 'lsdl_6',
      question: 'Việt Nam nằm trong khu vực khí hậu nào sau đây?',
      options: ['Nhiệt đới gió mùa', 'Ôn đới lục địa', 'Hàn đới cực', 'Hoang mạc xích đạo'],
      correct: 0,
      explanation: 'Vị trí địa lí nằm trọn trong vành đai nội chí tuyến Bắc bán cầu tạo cho Việt Nam khí hậu nhiệt đới gió mùa ẩm.'
    }
  ],
  'tin-hoc': [
    {
      id: 'tin_1',
      question: 'Thiết bị nào sau đây là thiết bị ra (Output Device) tiêu biểu của máy tính?',
      options: ['Màn hình (Monitor)', 'Bàn phím (Keyboard)', 'Chuột máy tính (Mouse)', 'Microphone'],
      correct: 0,
      explanation: 'Màn hình là thiết bị ra dùng để trực quan hóa dữ liệu và hiển thị kết quả cho người sử dụng.'
    },
    {
      id: 'tin_2',
      question: 'Đâu là một mật khẩu mạnh và an toàn nhất để bảo vệ tài khoản số của học sinh?',
      options: ['HocSinh@2026!TriThuc', '12345678', 'password', 'nguyenvana'],
      correct: 0,
      explanation: 'Mật khẩu mạnh cần tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt.'
    },
    {
      id: 'tin_3',
      question: 'Một Megabyte (MB) quy đổi chuẩn bằng bao nhiêu Kilobyte (KB)?',
      options: ['1024 KB', '1000 KB', '512 KB', '2048 KB'],
      correct: 0,
      explanation: 'Theo hệ số cơ số 2 trong tin học, 1 MB = 1024 KB.'
    },
    {
      id: 'tin_4',
      question: 'Trong phần mềm bảng tính Excel, công thức nào tính trung bình cộng của các ô từ A1 đến A5?',
      options: ['=AVERAGE(A1:A5)', '=SUM(A1:A5)', '=MAX(A1:A5)', '=COUNT(A1:A5)'],
      correct: 0,
      explanation: 'Hàm AVERAGE dùng để tính giá trị trung bình cộng của các số hoặc vùng ô dữ liệu.'
    },
    {
      id: 'tin_5',
      question: 'Trong ngôn ngữ lập trình Scratch, khối lệnh có hình lục giác đại diện cho thành phần nào?',
      options: ['Khối điều kiện logic (Boolean)', 'Khối hành động chuyển động', 'Khối biến số âm thanh', 'Khối sự kiện khởi đầu'],
      correct: 0,
      explanation: 'Khối lệnh lục giác trong Scratch trả về giá trị Đúng (True) hoặc Sai (False) dùng trong câu lệnh điều kiện if.'
    },
    {
      id: 'tin_6',
      question: 'Hành động nào sau đây là văn minh và tuân thủ bản quyền số trên không gian mạng?',
      options: ['Ghi rõ nguồn tác giả và xin phép khi trích dẫn tài liệu', 'Tải phim lậu rồi chia sẻ kiếm tiền', 'Tự ý đăng ảnh của bạn bè khi chưa được đồng ý', 'Sao chép nguyên văn bài viết của người khác nhận là của mình'],
      correct: 0,
      explanation: 'Tôn trọng quyền tác giả và trích dẫn nguồn gốc là quy tắc đạo đức số căn bản trong văn hóa số.'
    }
  ]
};

// Cấu hình 6 chặng môn học
const STAGE_TEMPLATES = [
  {
    id: 'toan',
    subjectName: 'Toán học',
    shortName: 'Toán',
    icon: Calculator,
    badgeColor: 'text-amber-300 bg-amber-500/20 border-amber-500/30',
    borderTheme: 'border-amber-500/40',
    gradientTheme: 'from-amber-600/30 to-orange-600/20'
  },
  {
    id: 'van',
    subjectName: 'Ngữ văn',
    shortName: 'Văn',
    icon: BookOpen,
    badgeColor: 'text-purple-300 bg-purple-500/20 border-purple-500/30',
    borderTheme: 'border-purple-500/40',
    gradientTheme: 'from-purple-600/30 to-indigo-600/20'
  },
  {
    id: 'tieng-anh',
    subjectName: 'Tiếng Anh',
    shortName: 'Anh',
    icon: Languages,
    badgeColor: 'text-cyan-300 bg-cyan-500/20 border-cyan-500/30',
    borderTheme: 'border-cyan-500/40',
    gradientTheme: 'from-cyan-600/30 to-blue-600/20'
  },
  {
    id: 'khtn',
    subjectName: 'Khoa học tự nhiên',
    shortName: 'KHTN',
    icon: Atom,
    badgeColor: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30',
    borderTheme: 'border-emerald-500/40',
    gradientTheme: 'from-emerald-600/30 to-teal-600/20'
  },
  {
    id: 'lich-su-dia-ly',
    subjectName: 'Lịch sử và Địa lí',
    shortName: 'Sử - Địa',
    icon: Compass,
    badgeColor: 'text-pink-300 bg-pink-500/20 border-pink-500/30',
    borderTheme: 'border-pink-500/40',
    gradientTheme: 'from-pink-600/30 to-rose-600/20'
  },
  {
    id: 'tin-hoc',
    subjectName: 'Tin học',
    shortName: 'Tin học',
    icon: Laptop,
    badgeColor: 'text-blue-300 bg-blue-500/20 border-blue-500/30',
    borderTheme: 'border-blue-500/40',
    gradientTheme: 'from-blue-600/30 to-indigo-600/20'
  }
];

// Hàm sinh 6 chặng môn học với câu hỏi ngẫu nhiên và đáp án xáo trộn cân bằng tuyệt đối
export function generateShuffledStages(recentlyUsedIds: Set<string | number> = new Set()): {
  stages: SubjectStage[];
  usedIds: Set<string | number>;
} {
  // 12 câu hỏi cho 6 chặng (mỗi chặng 2 câu): 3 A, 3 B, 3 C, 3 D
  const balancedSlots = generateBalancedTargetSlots(12);
  const newUsedIds = new Set<string | number>();
  let slotPointer = 0;

  const stages: SubjectStage[] = STAGE_TEMPLATES.map(tmpl => {
    const pool = SUBJECT_QUESTIONS_BANK[tmpl.id] || [];
    const selected = selectAndShuffleGameQuestions(pool, 2, recentlyUsedIds);
    selected.usedIds.forEach(id => newUsedIds.add(id));

    const finalQuestions: QuestionItem[] = selected.questions.map(q => {
      const assignedSlot = balancedSlots[slotPointer++] ?? Math.floor(Math.random() * 4);
      return shuffleSingleQuestionOptions(q, assignedSlot);
    });

    return {
      ...tmpl,
      questions: finalQuestions
    };
  });

  return { stages, usedIds: newUsedIds };
}

// Fallback initial stages
const INITIAL_SHUFFLE = generateShuffledStages();
const SIX_SUBJECT_STAGES: SubjectStage[] = INITIAL_SHUFFLE.stages;

interface AnswerRecord {
  stageIndex: number;
  stageName: string;
  questionIndex: number;
  questionText: string;
  options: string[];
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
  explanation: string;
}

// Error Boundary specifically protecting game modal from any white-screen crash
interface ErrorBoundaryProps {
  children: ReactNode;
  onReset: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class GameModalErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[SubjectPracticeGame] Caught crash:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border-2 border-rose-500/40 text-white shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-3xl">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-rose-300">Đã khôi phục trò chơi an toàn</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Trò chơi đã phát hiện lỗi truy cập dữ liệu và tự động kích hoạt lá chắn bảo vệ, bảo toàn toàn bộ ứng dụng không bị sập.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                this.props.onReset();
              }}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow-lg transition-all"
            >
              Tiếp tục thử thách
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const SubjectPracticeGameModal: React.FC<SubjectPracticeGameModalProps> = (props) => {
  return (
    <GameModalErrorBoundary onReset={props.onClose}>
      <SubjectPracticeGameModalInner {...props} />
    </GameModalErrorBoundary>
  );
};

const SubjectPracticeGameModalInner: React.FC<SubjectPracticeGameModalProps> = ({
  onClose,
  onAddScore,
  currentUser,
  grade = 6
}) => {
  // Dynamic shuffled stages with options randomized and balanced
  const [recentlyUsedIds, setRecentlyUsedIds] = useState<Set<string | number>>(() => new Set());
  const [stages, setStages] = useState<SubjectStage[]>(() => {
    const initial = generateShuffledStages();
    return initial.stages;
  });

  // Safe state management
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [answerHistory, setAnswerHistory] = useState<AnswerRecord[]>([]);

  // Timer tracking
  const [startTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Anti-double submission transaction ID
  const hasCreditedRewardRef = useRef<boolean>(false);

  useEffect(() => {
    if (isGameFinished) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isGameFinished, startTime]);

  // Safe stage access: Clamp between 0 and stages.length - 1, NEVER allow out-of-bounds
  const safeStageIdx = Math.max(0, Math.min(currentStageIdx, stages.length - 1));
  const currentStage = stages[safeStageIdx] || stages[0];
  const questionsInStage = currentStage.questions || [];

  // Safe question access
  const safeQuestionIdx = Math.max(0, Math.min(currentQuestionIdx, questionsInStage.length - 1));
  const currentQ = questionsInStage[safeQuestionIdx] || {
    id: 'fallback',
    question: 'Đang tải dữ liệu câu hỏi...',
    options: ['A', 'B', 'C', 'D'],
    correct: 0,
    explanation: 'Dữ liệu đang được đồng bộ.'
  };

  const StageIcon = currentStage.icon;
  const isLastQuestionOfStage = safeQuestionIdx >= questionsInStage.length - 1;
  const isFinalStage = safeStageIdx >= stages.length - 1; // Stage 6 (Tin học)

  // Handle student answering
  const handleSelectOption = (idx: number) => {
    if (hasAnswered || isTransitioning || isGameFinished) return;

    setSelectedIdx(idx);
    setHasAnswered(true);

    const isCorrect = idx === currentQ.correct;
    const pointsAwarded = isCorrect ? 50 : 0;

    if (isCorrect) {
      setScore(prev => prev + pointsAwarded);
    }

    // Record history
    const record: AnswerRecord = {
      stageIndex: safeStageIdx,
      stageName: currentStage.subjectName,
      questionIndex: safeQuestionIdx,
      questionText: currentQ.question,
      options: currentQ.options,
      selectedOption: idx,
      correctOption: currentQ.correct,
      isCorrect,
      explanation: currentQ.explanation
    };

    setAnswerHistory(prev => [...prev, record]);
  };

  // Safe transition to next question or next stage
  const handleProceed = () => {
    if (!hasAnswered || isTransitioning) return;
    setIsTransitioning(true);

    if (!isLastQuestionOfStage) {
      // Advance to next question within the same subject stage
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedIdx(null);
      setHasAnswered(false);
      setIsTransitioning(false);
      return;
    }

    // Finished questions in current stage
    if (isFinalStage) {
      // REACHED STAGE 6 (Tin học) COMPLETION!
      // CRITICAL: DO NOT increment stage index to 7!
      // Trigger Final Summary Screen smoothly
      triggerFinishGame();
      setIsTransitioning(false);
      return;
    }

    // Move to NEXT SUBJECT STAGE
    // Reset question index to 0 (Câu 1) per prompt requirement
    const nextStageIdx = safeStageIdx + 1;
    if (nextStageIdx < stages.length) {
      setCurrentStageIdx(nextStageIdx);
      setCurrentQuestionIdx(0); // Reset to question 1
      setSelectedIdx(null);
      setHasAnswered(false);
    } else {
      triggerFinishGame();
    }

    setIsTransitioning(false);
  };

  // Trigger Completion & Celebration
  const triggerFinishGame = () => {
    setIsGameFinished(true);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.4 }
        });
      }, 350);
    } catch {}

    // Synchronize reward points with student Account ID strictly once
    if (!hasCreditedRewardRef.current && onAddScore && score > 0) {
      hasCreditedRewardRef.current = true;
      const txId = `tx_subject_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      onAddScore(score, txId, 'Thử tài kiến thức', `Hoàn thành xuất sắc 6 chặng tổng hợp THCS (+${score} điểm)`);
    }
  };

  // Reset & Replay: Re-shuffle new questions and re-randomize options
  const handleRestart = () => {
    const { stages: newStages, usedIds } = generateShuffledStages(recentlyUsedIds);
    setRecentlyUsedIds(usedIds);
    setStages(newStages);
    setCurrentStageIdx(0);
    setCurrentQuestionIdx(0);
    setScore(0);
    setSelectedIdx(null);
    setHasAnswered(false);
    setIsGameFinished(false);
    setIsReviewOpen(false);
    setIsTransitioning(false);
    setAnswerHistory([]);
    setElapsedSeconds(0);
    hasCreditedRewardRef.current = false;
  };

  // KPI Calculations
  const totalQuestions = answerHistory.length || (stages.length * 2);
  const correctCount = answerHistory.filter(h => h.isCorrect).length;
  const wrongCount = answerHistory.length - correctCount;
  const accuracyPercent = answerHistory.length > 0
    ? Math.round((correctCount / answerHistory.length) * 100)
    : 0;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m > 0 ? `${m} phút ` : ''}${s} giây`;
  };

  const studentDisplayName = currentUser?.name || 'Chiến Binh Tri Thức';
  const studentGradeDisplay = currentUser?.grade || grade;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border-2 border-indigo-500/40 text-white shadow-2xl overflow-hidden my-auto flex flex-col max-h-[94vh] animate-scaleUp">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg text-2xl shrink-0">
              🎯
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Thử Tài Kiến Thức • 6 Môn THCS
                </span>
                <span className="text-xs text-amber-400 font-bold font-mono flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  {score} điểm
                </span>
                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formatTime(elapsedSeconds)}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white truncate mt-0.5">
                {!isGameFinished
                  ? `Chặng ${safeStageIdx + 1} / 6: ${currentStage.subjectName}`
                  : '🎉 Tổng Kết Chiến Binh Tri Thức'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
            aria-label="Đóng trò chơi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Stages Progress Stepper Indicator */}
        {!isGameFinished && (
          <div className="px-4 sm:px-6 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between gap-1 overflow-x-auto shrink-0">
            {stages.map((stg, idx) => {
              const StgIcon = stg.icon;
              const isPast = idx < safeStageIdx;
              const isCurrent = idx === safeStageIdx;

              return (
                <div
                  key={stg.id}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 border border-blue-400/40 scale-105'
                      : isPast
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-900/60 text-slate-500 border border-slate-800'
                  }`}
                  title={`Chặng ${idx + 1}: ${stg.subjectName}`}
                >
                  {isPast ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <StgIcon className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden md:inline">{idx + 1}. {stg.shortName}</span>
                  <span className="md:hidden">{idx + 1}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Body Content */}
        <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
          {!isGameFinished ? (
            /* ACTIVE QUESTION VIEW */
            <div className={`p-5 sm:p-6 rounded-3xl bg-slate-950 border ${currentStage.borderTheme} space-y-5 shadow-inner`}>
              
              {/* Question Stage Header */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${currentStage.badgeColor}`}>
                  <StageIcon className="w-3.5 h-3.5" />
                  <span>Môn: {currentStage.subjectName}</span>
                </span>
                
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  Câu hỏi {safeQuestionIdx + 1} / {questionsInStage.length}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-xl font-bold text-white leading-relaxed">
                {currentQ.question}
              </h3>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedIdx === i;
                  const isCorrect = i === currentQ.correct;

                  let style = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850';
                  if (hasAnswered) {
                    if (isCorrect) {
                      style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/30 ring-1 ring-emerald-500/50';
                    } else if (isSelected) {
                      style = 'bg-rose-950/70 border-rose-500 text-rose-200 shadow-md shadow-rose-900/30';
                    } else {
                      style = 'bg-slate-900/40 border-slate-800/40 text-slate-600 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={hasAnswered || isTransitioning}
                      onClick={() => handleSelectOption(i)}
                      className={`p-3.5 sm:p-4 rounded-2xl text-left border-2 font-medium text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-3 ${style}`}
                    >
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                        hasAnswered && isCorrect
                          ? 'bg-emerald-500 text-white'
                          : hasAnswered && isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 font-bold">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Proceed Control (CRITICAL: stage 6 replaces button with HOÀN THÀNH THỬ THÁCH) */}
              {hasAnswered && (
                <div className="p-4 sm:p-5 rounded-2xl bg-blue-950/40 border border-blue-500/30 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className={`text-xs sm:text-sm font-black flex items-center gap-1.5 ${
                      selectedIdx === currentQ.correct ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {selectedIdx === currentQ.correct ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Chính xác tuyệt đối! +50 điểm!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span>Chưa chính xác! Cố gắng câu sau nhé.</span>
                        </>
                      )}
                    </span>

                    {/* Button text change per requirement */}
                    <button
                      disabled={isTransitioning}
                      onClick={handleProceed}
                      className={`py-2 px-5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 shadow-lg ${
                        isFinalStage && isLastQuestionOfStage
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black animate-pulse'
                          : isLastQuestionOfStage
                          ? 'bg-blue-600 hover:bg-blue-500 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      {isFinalStage && isLastQuestionOfStage ? (
                        <>
                          <Trophy className="w-4 h-4 text-slate-950 fill-slate-950" />
                          <span>HOÀN THÀNH THỬ THÁCH</span>
                        </>
                      ) : isLastQuestionOfStage ? (
                        <>
                          <span>MÔN TIẾP THEO</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span>CÂU TIẾP THEO</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-blue-500/20">
                    💡 <strong>Giải thích sư phạm:</strong> {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* COMPREHENSIVE SUMMARY SCREEN (MÀN HÌNH TỔNG KẾT) */
            <div className="space-y-6 animate-scaleUp">
              
              {/* Celebration Hero Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900/60 via-indigo-900/40 to-slate-900 border-2 border-indigo-500/40 text-center space-y-3 relative overflow-hidden shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/30 text-3xl">
                  <Trophy className="w-10 h-10 fill-slate-950" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                    Chiến Thắng Hoàn Mỹ 6 Môn THCS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    🎉 CHÚC MỪNG CHIẾN BINH TRI THỨC!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Học sinh: <strong className="text-white font-extrabold">{studentDisplayName}</strong> {currentUser?.className ? `(${currentUser.className})` : ''} • <span className="text-blue-400 font-bold">Khối {studentGradeDisplay}</span>
                  </p>
                </div>
              </div>

              {/* 6 Completed Subjects Badge Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-400" />
                  6 Môn Học Đã Hoàn Thành Xuất Sắc
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  {stages.map((stg, i) => {
                    const StgIcon = stg.icon;
                    const stageAnswers = answerHistory.filter(h => h.stageIndex === i);
                    const stageCorrect = stageAnswers.filter(h => h.isCorrect).length;

                    return (
                      <div
                        key={stg.id}
                        className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1"
                      >
                        <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 text-blue-400 flex items-center justify-center mx-auto text-sm">
                          <StgIcon className="w-4 h-4" />
                        </div>
                        <div className="font-black text-xs text-white truncate">{stg.shortName}</div>
                        <div className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-0.5">
                          <Check className="w-3 h-3" />
                          <span>{stageCorrect}/{stageAnswers.length || 2} đúng</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* KPI Results Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Tổng câu hỏi</span>
                  <div className="text-2xl font-black text-white">{totalQuestions}</div>
                  <span className="text-[10px] text-slate-500">6 môn tích hợp</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-emerald-400">Số câu đúng</span>
                  <div className="text-2xl font-black text-emerald-400">{correctCount}</div>
                  <span className="text-[10px] text-emerald-500/80">+{score} điểm thưởng</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-rose-500/30 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-rose-400">Số câu sai</span>
                  <div className="text-2xl font-black text-rose-400">{wrongCount}</div>
                  <span className="text-[10px] text-rose-500/80">Cần ôn tập thêm</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-400">Tổng điểm đạt được</span>
                  <div className="text-2xl font-black text-amber-400">{score}</div>
                  <span className="text-[10px] text-amber-500/80">Tích lũy vào tài khoản</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/30 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-blue-400">Tỷ lệ chính xác</span>
                  <div className="text-2xl font-black text-blue-400">{accuracyPercent}%</div>
                  <span className="text-[10px] text-blue-500/80">Hiệu suất làm bài</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-purple-400">Thời gian làm bài</span>
                  <div className="text-xl sm:text-2xl font-black text-purple-400 truncate">
                    {formatTime(elapsedSeconds)}
                  </div>
                  <span className="text-[10px] text-purple-500/80">Thực tế</span>
                </div>
              </div>

              {/* Review Question Drawer Accordion */}
              {isReviewOpen && (
                <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-400" />
                      Chi Tiết Đáp Án & Lời Giải 6 Môn
                    </h4>
                    <span className="text-[11px] text-slate-400">Chuẩn GDPT 2018</span>
                  </div>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {answerHistory.map((ans, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                          ans.isCorrect
                            ? 'bg-emerald-950/20 border-emerald-500/40'
                            : 'bg-rose-950/20 border-rose-500/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-black text-white">
                            Câu {idx + 1} ({ans.stageName}): {ans.questionText}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] shrink-0 ${
                            ans.isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {ans.isCorrect ? '✓ Đúng' : '✗ Sai'}
                          </span>
                        </div>
                        <div className="text-slate-300">
                          Bạn chọn: <strong className={ans.isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                            {ans.options[ans.selectedOption] || 'Chưa chọn'}
                          </strong>
                          {!ans.isCorrect && (
                            <span className="ml-2 text-slate-400">
                              (Đáp án đúng: <strong className="text-emerald-400">{ans.options[ans.correctOption]}</strong>)
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 italic">
                          💡 {ans.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3 Required Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  onClick={() => setIsReviewOpen(!isReviewOpen)}
                  className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-750 text-white font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 border border-slate-700 shadow-md"
                >
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>{isReviewOpen ? 'ĐÓNG XEM LẠI' : 'XEM LẠI KẾT QUẢ'}</span>
                </button>

                <button
                  onClick={handleRestart}
                  className="py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>CHƠI LẠI TỪ ĐẦU</span>
                </button>

                <button
                  onClick={onClose}
                  className="py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <Trophy className="w-4 h-4" />
                  <span>QUAY VỀ TRÒ CHƠI HỌC TẬP</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

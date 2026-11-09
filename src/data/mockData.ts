import { SubjectMeta, Question, Lesson, SchoolAnnouncement, Exam, SubjectId, GradeLevel, TeacherDocument } from '../types';
import { OFFICIAL_TEXTBOOK_DOCUMENTS } from './textbookData';
import { ALL_CURRICULUM_LESSONS, MASTER_CURRICULUM_SPECS, getCurriculumSpec, getCompletenessForSubjectGrade } from './curriculumMaster';
import { MASTER_QUESTION_BANK } from './masterQuestionBank';
import { CANONICAL_EXAMS } from './canonicalExams';
import { CURRICULUM_PARSED_QUESTIONS } from './curriculumQuestionsLoader';
import { STANDARDIZED_EXAM_QUESTIONS } from './standardizedExamQuestions';
export { ALL_CURRICULUM_LESSONS, MASTER_CURRICULUM_SPECS, getCurriculumSpec, getCompletenessForSubjectGrade };

export const SUBJECTS: SubjectMeta[] = [
  {
    id: 'van',
    name: 'Ngữ văn',
    shortName: 'Văn',
    icon: 'BookOpen',
    color: '#8B5CF6',
    bgGradient: 'from-purple-500 to-indigo-600',
    description: 'Đọc hiểu văn bản, tiếng Việt, rèn luyện kỹ năng viết và cảm thụ văn học.',
    category: 'mon_hoc'
  },
  {
    id: 'toan',
    name: 'Toán học',
    shortName: 'Toán',
    icon: 'Calculator',
    color: '#FFB020',
    bgGradient: 'from-amber-500 to-orange-600',
    description: 'Số học, Đại số, Hình học và Thống kê xác suất theo chương trình GDPT 2018.',
    category: 'mon_hoc'
  },
  {
    id: 'tieng-anh',
    name: 'Tiếng Anh',
    shortName: 'Anh',
    icon: 'Languages',
    color: '#22C7E8',
    bgGradient: 'from-cyan-500 to-blue-600',
    description: 'Phát triển 4 kỹ năng Nghe - Nói - Đọc - Viết, ngữ pháp và từ vựng THCS.',
    category: 'mon_hoc'
  },
  {
    id: 'khtn',
    name: 'Khoa học tự nhiên',
    shortName: 'KHTN',
    icon: 'Atom',
    color: '#22C55E',
    bgGradient: 'from-emerald-500 to-teal-600',
    description: 'Tích hợp Vật lý, Hóa học và Sinh học khám phá thế giới tự nhiên kỳ thú.',
    category: 'mon_hoc'
  },
  {
    id: 'lich-su-dia-ly',
    name: 'Lịch sử và Địa lí',
    shortName: 'Sử - Địa',
    icon: 'Compass',
    color: '#EC4899',
    bgGradient: 'from-pink-500 to-rose-600',
    description: 'Tiến trình lịch sử dân tộc, thế giới và đặc điểm địa lí tự nhiên, kinh tế - xã hội.',
    category: 'mon_hoc'
  },
  {
    id: 'gdcd',
    name: 'Giáo dục công dân',
    shortName: 'GDCD',
    icon: 'HeartHandshake',
    color: '#14B8A6',
    bgGradient: 'from-teal-500 to-emerald-600',
    description: 'Giáo dục đạo đức, kỹ năng sống, quyền và nghĩa vụ công dân Việt Nam.',
    category: 'mon_hoc'
  },
  {
    id: 'tin-hoc',
    name: 'Tin học',
    shortName: 'Tin',
    icon: 'Laptop',
    color: '#2684FF',
    bgGradient: 'from-blue-500 to-indigo-600',
    description: 'Khoa học máy tính, lập trình Scratch/Python, ứng dụng tin học và đạo đức số.',
    category: 'mon_hoc'
  },
  {
    id: 'cong-nghe',
    name: 'Công nghệ',
    shortName: 'Công nghệ',
    icon: 'Wrench',
    color: '#F97316',
    bgGradient: 'from-orange-500 to-amber-600',
    description: 'Công nghệ đời sống, kỹ thuật điện, nông nghiệp công nghệ cao và thiết kế kỹ thuật.',
    category: 'mon_hoc'
  },
  {
    id: 'am-nhac',
    name: 'Âm nhạc',
    shortName: 'Âm nhạc',
    icon: 'Music',
    color: '#A855F7',
    bgGradient: 'from-violet-500 to-purple-600',
    description: 'Hát, nhạc cụ, đọc nhạc, lí thuyết âm nhạc và thưởng thức âm nhạc.',
    category: 'mon_hoc'
  },
  {
    id: 'mi-thuat',
    name: 'Mĩ thuật',
    shortName: 'Mĩ thuật',
    icon: 'Palette',
    color: '#E11D48',
    bgGradient: 'from-rose-500 to-pink-600',
    description: 'Hội họa, đồ họa, điêu khắc, mĩ thuật ứng dụng và thiết kế sáng tạo.',
    category: 'mon_hoc'
  },
  {
    id: 'giao-duc-the-chat',
    name: 'Giáo dục thể chất',
    shortName: 'Thể chất',
    icon: 'Activity',
    color: '#06B6D4',
    bgGradient: 'from-cyan-500 to-blue-600',
    description: 'Rèn luyện thể lực, vận động cơ bản, các môn bóng rổ, cầu lông, điền kinh và lối sống khỏe mạnh.',
    category: 'mon_hoc'
  },
  {
    id: 'hoat-dong-trai-nghiem',
    name: 'Hoạt động trải nghiệm, hướng nghiệp',
    shortName: 'HĐTN-HN',
    icon: 'Sparkles',
    color: '#F59E0B',
    bgGradient: 'from-amber-500 to-orange-600',
    description: 'Rèn luyện bản thân, xây dựng tình bạn, phát triển kỹ năng xã hội và định hướng nghề nghiệp.',
    category: 'hoat_dong_giao_duc'
  },
  {
    id: 'giao-duc-dia-phuong',
    name: 'Giáo dục địa phương',
    shortName: 'GDĐP',
    icon: 'Landmark',
    color: '#059669',
    bgGradient: 'from-emerald-600 to-teal-700',
    description: 'Lịch sử, địa lí, văn hóa truyền thống, danh lam thắng cảnh và kinh tế - xã hội tỉnh Vĩnh Long.',
    category: 'hoat_dong_giao_duc'
  }
];

export const INITIAL_ANNOUNCEMENTS: SchoolAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Phát động phong trào "Tuần lễ Học tập số và Lập trình sáng tạo 2026–2027"',
    category: 'hoat_dong',
    date: '2026-10-25',
    priority: true,
    author: 'Ban Giám Hiệu Trường THCS Mỹ Hòa',
    content: 'Chào mừng năm học 2026–2027, nhà trường phát động tuần lễ thi đua giải đố Tin học & Toán học trực tuyến trên hệ thống trường. Học sinh đạt điểm xuất sắc sẽ được tuyên dương tại lễ chào cờ đầu tuần.'
  },
  {
    id: 'ann-2',
    title: 'Kế hoạch kiểm tra định kỳ học kỳ I môn Tin học và Khoa học tự nhiên',
    category: 'lich_thi',
    date: '2026-10-20',
    priority: false,
    author: 'Tổ Chuyên môn Tin học & KHTN',
    content: 'Các em học sinh các khối 6, 7, 8, 9 lưu ý tham gia làm các bài ôn tập trực tuyến trên cổng học tập trường trước ngày 15/11/2026 để chuẩn bị tốt cho đợt kiểm tra giữa kỳ.'
  },
  {
    id: 'ann-3',
    title: 'Tuyên dương 10 bạn học sinh xuất sắc hoàn thành xuất sắc thử thách Trí tuệ Mỹ Hòa',
    category: 'khen_thuong',
    date: '2026-10-18',
    priority: false,
    author: 'Đoàn Đội Trường THCS Mỹ Hòa',
    content: 'Chúc mừng các em học sinh lớp 6A1, 7A3, 8A2, 9A1 đã dẫn đầu bảng xếp hạng luyện thi tuần vừa qua với tỷ lệ trả lời đúng trên 95%!'
  }
];

export const OFFICIAL_TOPICS = [
  'Chủ đề 1: Máy tính và cộng đồng',
  'Chủ đề 2: Mạng máy tính và Internet',
  'Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
  'Chủ đề 4: Ứng dụng tin học',
  'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính'
] as const;

export type OfficialTopic = typeof OFFICIAL_TOPICS[number];

export const INITIAL_LESSONS: Lesson[] = ALL_CURRICULUM_LESSONS;

const LEGACY_QUESTIONS: Question[] = [
  // Tin học 6
  {
    id: 'tin6-q1',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    difficulty: 'nhan_biet',
    content: 'Thiết bị nào sau đây là thiết bị vào (Input) của máy tính?',
    options: ['Màn hình', 'Bàn phím (Keyboard)', 'Loa máy tính', 'Máy in laser'],
    correctAnswerIndex: 1,
    explanation: 'Bàn phím giúp người dùng nhập văn bản, ký tự và câu lệnh vào máy tính nên là thiết bị vào. Màn hình, loa và máy in là thiết bị ra.',
    tags: ['phần cứng', 'thiết bị vào ra'],
    createdDate: '2026-10-01',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  {
    id: 'tin6-q2',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    difficulty: 'thong_hieu',
    content: 'Khi em nhìn thấy biển báo cấm rẽ trái trên đường giao thông, điều gì sau đây chính là thông tin mà em tiếp nhận được?',
    options: [
      'Màu sơn đỏ và vạch kẻ trắng trên biển báo',
      'Tấm kim loại hình tròn cắm ở góc phố',
      'Biết được rằng phương tiện không được phép rẽ vào con đường phía bên trái',
      'Độ cao của cột sắt cắm biển báo'
    ],
    correctAnswerIndex: 2,
    explanation: 'Hình vẽ và màu sắc là dữ liệu (vật mang tin là biển báo kim loại). Sự hiểu biết "không được phép rẽ trái" nảy sinh trong tâm trí chính là thông tin.',
    tags: ['thông tin', 'dữ liệu'],
    createdDate: '2026-10-02',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  {
    id: 'tin6-q3',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    difficulty: 'nhan_biet',
    content: 'Bộ phận nào được coi là "bộ não" thực hiện tính toán và điều khiển hoạt động của máy tính?',
    options: ['Bộ xử lý trung tâm (CPU)', 'Ổ cứng SSD', 'Thanh nhớ RAM', 'Bộ nguồn điện'],
    correctAnswerIndex: 0,
    explanation: 'CPU (Central Processing Unit) là bộ xử lý trung tâm, có vai trò điều khiển và xử lý toàn bộ dữ liệu của máy tính.',
    tags: ['CPU', 'phần cứng'],
    createdDate: '2026-10-03',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  {
    id: 'tin6-q4',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    difficulty: 'van_dung',
    content: 'Bạn Minh muốn gửi một bức ảnh chụp kỷ yếu lớp 6A trường THCS Mỹ Hòa cho bạn Nam đang ở xa. Minh nên sử dụng dịch vụ Internet nào là phù hợp và nhanh chóng nhất?',
    options: [
      'Gửi thư qua bưu điện truyền thống',
      'Gửi qua thư điện tử (Email) hoặc ứng dụng nhắn tin học đường',
      'Lưu vào đĩa mềm rồi cất giữ',
      'Đợi đến khi gặp mặt trực tiếp mới cho xem'
    ],
    correctAnswerIndex: 1,
    explanation: 'Thư điện tử hoặc ứng dụng nhắn tin qua mạng Internet cho phép gửi dữ liệu hình ảnh kỹ thuật số gần như tức thì với khoảng cách xa.',
    tags: ['Internet', 'trao đổi thông tin'],
    createdDate: '2026-10-04',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  {
    id: 'tin6-q5',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 2: Mạng máy tính và Internet',
    difficulty: 'nhan_biet',
    content: 'Mạng máy tính là gì?',
    options: [
      'Nhiều máy tính để cùng một phòng học',
      'Tập hợp các máy tính được kết nối với nhau để truyền thông tin và chia sẻ tài nguyên',
      'Một chiếc máy tính cấu hình cực mạnh',
      'Màn hình kết nối với cây máy tính'
    ],
    correctAnswerIndex: 1,
    explanation: 'Mạng máy tính gồm các máy tính và thiết bị được kết nối với nhau thông qua dây cáp hoặc sóng vô tuyến để trao đổi dữ liệu và chia sẻ tài nguyên (như máy in, tệp tin).',
    tags: ['mạng máy tính'],
    createdDate: '2026-10-05',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  {
    id: 'tin6-q6',
    subjectId: 'tin-hoc',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    difficulty: 'thong_hieu',
    content: 'Đâu là một ví dụ về từ khóa tìm kiếm hiệu quả khi em muốn tìm "Đề cương ôn tập Tin học 6 học kỳ 1 trường THCS Mỹ Hòa"?',
    options: [
      '"ơi google tìm cho em bài tin học lớp 6 với nha"',
      '"Đề cương Tin học 6 học kỳ 1 THCS Mỹ Hòa"',
      '"Bài tập trường"',
      '"Tìm kiếm thông tin"'
    ],
    correctAnswerIndex: 1,
    explanation: 'Từ khóa tìm kiếm nên ngắn gọn, chứa các danh từ chính, lớp học, học kỳ và tên trường để công cụ tìm kiếm lọc kết quả chính xác nhất.',
    tags: ['tìm kiếm', 'từ khóa'],
    createdDate: '2026-10-06',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  // Tin học 7
  {
    id: 'tin7-q1',
    subjectId: 'tin-hoc',
    grade: 7,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    difficulty: 'nhan_biet',
    content: 'Thiết bị nào sau đây vừa là thiết bị vào vừa là thiết bị ra?',
    options: ['Màn hình cảm ứng (Touchscreen)', 'Bàn phím cơ', 'Chuột quang', 'Tai nghe chụp tai'],
    correctAnswerIndex: 0,
    explanation: 'Màn hình cảm ứng nhận thao tác chạm của ngón tay (vào) và đồng thời hiển thị hình ảnh phản hồi (ra).',
    tags: ['thiết bị vào ra'],
    createdDate: '2026-10-07',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  {
    id: 'tin7-q2',
    subjectId: 'tin-hoc',
    grade: 7,
    semester: 1,
    chapter: 'Chủ đề 4: Ứng dụng tin học',
    difficulty: 'thong_hieu',
    content: 'Trong phần mềm bảng tính điện tử (như Excel/Google Sheets), công thức nào sau đây dùng để tính tổng các ô từ A1 đến A5?',
    options: ['=SUM(A1:A5)', '=AVERAGE(A1:A5)', '=COUNT(A1:A5)', '=MAX(A1:A5)'],
    correctAnswerIndex: 0,
    explanation: 'Hàm SUM(A1:A5) dùng để tính tổng các giá trị số trong dải ô từ A1 đến A5.',
    tags: ['bảng tính', 'hàm SUM'],
    createdDate: '2026-10-08',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  // Tin học 8
  {
    id: 'tin8-q1',
    subjectId: 'tin-hoc',
    grade: 8,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    difficulty: 'nhan_biet',
    content: 'Máy tính điện tử thế hệ thứ nhất sử dụng linh kiện điện tử cơ bản nào?',
    options: ['Đèn điện tử chân không', 'Bóng bán dẫn', 'Mạch tích hợp (IC)', 'Bộ vi xử lý siêu lớn'],
    correctAnswerIndex: 0,
    explanation: 'Thế hệ thứ nhất (những năm 1940-1950) dùng đèn điện tử chân không, kích thước rất to lớn và tiêu thụ nhiều điện năng.',
    tags: ['lịch sử máy tính'],
    createdDate: '2026-10-09',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  {
    id: 'tin8-q2',
    subjectId: 'tin-hoc',
    grade: 8,
    semester: 1,
    chapter: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
    difficulty: 'thong_hieu',
    content: 'Trong thuật toán tìm kiếm tuần tự (Sequential Search), trường hợp nào thuật toán sẽ dừng lại ngay ở bước đầu tiên?',
    options: [
      'Phần tử cần tìm nằm ở vị trí đầu tiên của danh sách',
      'Phần tử cần tìm nằm ở vị trí cuối cùng',
      'Danh sách không chứa phần tử cần tìm',
      'Danh sách đã được sắp xếp giảm dần'
    ],
    correctAnswerIndex: 0,
    explanation: 'Tìm kiếm tuần tự duyệt từ phần tử đầu tiên, do đó nếu phần tử đầu tiên trùng với giá trị cần tìm thì thuật toán lập tức tìm thấy và kết thúc.',
    tags: ['thuật toán', 'tìm kiếm tuần tự'],
    createdDate: '2026-10-10',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  // Tin học 9
  {
    id: 'tin9-q1',
    subjectId: 'tin-hoc',
    grade: 9,
    semester: 1,
    chapter: 'Chủ đề 4: Ứng dụng tin học',
    difficulty: 'nhan_biet',
    content: 'Trí tuệ nhân tạo (AI - Artificial Intelligence) thường được ứng dụng trong lĩnh vực nào sau đây?',
    options: [
      'Nhận diện khuôn mặt và trợ lý ảo thông minh',
      'Làm dây điện kim loại truyền thống',
      'Đốt than sưởi ấm thủ công',
      'Đóng đinh vào bảng gỗ'
    ],
    correctAnswerIndex: 0,
    explanation: 'Nhận diện khuôn mặt, xe tự hành, trợ lý ảo và dịch thuật ngôn ngữ tự động là những ứng dụng tiêu biểu của AI hiện đại.',
    tags: ['AI', 'công nghệ mới'],
    createdDate: '2026-10-11',
    author: 'Tổ Tin học THCS Mỹ Hòa'
  },
  // Toán học 6
  {
    id: 'toan6-q1',
    subjectId: 'toan',
    grade: 6,
    semester: 1,
    chapter: 'Chương 1: Số tự nhiên',
    difficulty: 'nhan_biet',
    content: 'Tập hợp các chữ số của số tự nhiên 2026 là:',
    options: ['{2; 0; 2; 6}', '{0; 2; 6}', '{2; 0; 6; 2}', '{2026}'],
    correctAnswerIndex: 1,
    explanation: 'Trong tập hợp, mỗi phần tử chỉ được liệt kê một lần. Số 2026 gồm các chữ số 0, 2, 6 nên tập hợp là {0; 2; 6}.',
    tags: ['tập hợp', 'số tự nhiên'],
    createdDate: '2026-10-12',
    author: 'Tổ Toán THCS Mỹ Hòa'
  },
  {
    id: 'toan6-q2',
    subjectId: 'toan',
    grade: 6,
    semester: 1,
    chapter: 'Chương 1: Số tự nhiên',
    difficulty: 'thong_hieu',
    content: 'Số nào sau đây chia hết cho cả 2; 3; 5 và 9?',
    options: ['120', '180', '135', '250'],
    correctAnswerIndex: 1,
    explanation: 'Số chia hết cho 2 và 5 phải có tận cùng bằng 0 (120, 180, 250). Số chia hết cho 9 phải có tổng các chữ số chia hết cho 9: 1 + 8 + 0 = 9 (chia hết cho 9 và 3). Vậy là số 180.',
    tags: ['dấu hiệu chia hết'],
    createdDate: '2026-10-13',
    author: 'Tổ Toán THCS Mỹ Hòa'
  },
  // Tiếng Anh 6
  {
    id: 'eng6-q1',
    subjectId: 'tieng-anh',
    grade: 6,
    semester: 1,
    chapter: 'Unit 1: My New School',
    difficulty: 'nhan_biet',
    content: 'Lan and Mai ______ to My Hoa Secondary School by bicycle every day.',
    options: ['go', 'goes', 'going', 'is going'],
    correctAnswerIndex: 0,
    explanation: 'Chủ ngữ "Lan and Mai" là ngôi thứ 3 số nhiều, thì hiện tại đơn với thói quen hàng ngày (every day) dùng động từ nguyên mẫu: "go".',
    tags: ['grammar', 'present simple'],
    createdDate: '2026-10-14',
    author: 'Tổ Ngoại ngữ THCS Mỹ Hòa'
  },
  // KHTN 6
  {
    id: 'khtn6-q1',
    subjectId: 'khtn',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Mở đầu về KHTN',
    difficulty: 'nhan_biet',
    content: 'Dụng cụ nào sau đây dùng để đo nhiệt độ trong phòng thí nghiệm khoa học tự nhiên?',
    options: ['Cân đồng hồ', 'Nhiệt kế', 'Lực kế', 'Thước dây'],
    correctAnswerIndex: 1,
    explanation: 'Nhiệt kế là dụng cụ chuyên dụng để đo nhiệt độ.',
    tags: ['dụng cụ đo', 'nhiệt độ'],
    createdDate: '2026-10-15',
    author: 'Tổ KHTN THCS Mỹ Hòa'
  }
];


const COMBINED_RAW_QUESTIONS: Question[] = [
  ...LEGACY_QUESTIONS,
  ...MASTER_QUESTION_BANK,
  ...CURRICULUM_PARSED_QUESTIONS,
  ...STANDARDIZED_EXAM_QUESTIONS
];

const deduplicatedMap = new Map<string, Question>();
COMBINED_RAW_QUESTIONS.forEach(q => {
  if (!deduplicatedMap.has(q.id)) {
    deduplicatedMap.set(q.id, q);
  }
});

export const INITIAL_QUESTIONS: Question[] = Array.from(deduplicatedMap.values());

export const INITIAL_EXAMS: Exam[] = CANONICAL_EXAMS;

export type { TeacherDocument };

export const INITIAL_DOCUMENTS: TeacherDocument[] = [
  ...OFFICIAL_TEXTBOOK_DOCUMENTS,
  {
    id: 'doc-1',
    title: 'Giáo án Tin học 6 - Bài 1: Thông tin và thu nhận thông tin (Kế hoạch bài dạy)',
    fileName: 'KHBD_Tin6_Bai1_THCS_My_Hoa.docx',
    fileType: 'docx',
    fileSize: '450 KB',
    subjectId: 'tin-hoc',
    grade: 6,
    topic: 'Chủ đề 1: Máy tính và cộng đồng',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Nguyễn Văn An (Tổ Tin học)',
    uploadedAt: '2026-10-15',
    status: 'da_xac_nhan',
    description: 'Kế hoạch bài dạy chi tiết phát triển năng lực tin học theo công văn hướng dẫn.',
    source: 'Tổ Chuyên môn Tin học THCS Mỹ Hòa',
    linkedLessonId: 'tin6-b1'
  },
  {
    id: 'doc-2',
    title: 'Ngân hàng câu hỏi trắc nghiệm Tin học 6 - Học kỳ 1 (Chuẩn cấu trúc JSON)',
    fileName: 'Ngan_hang_Trac_nghiem_Tin6_HK1.json',
    fileType: 'json',
    fileSize: '85 KB',
    subjectId: 'tin-hoc',
    grade: 6,
    topic: 'Toàn bộ HK1',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Trần Thị Mai (Trưởng bộ môn Tin)',
    uploadedAt: '2026-10-18',
    status: 'da_xac_nhan',
    description: 'Bộ 50 câu hỏi trắc nghiệm 4 mức độ nhận thức phục vụ xây dựng đề kiểm tra.',
    source: 'Ngân hàng đề Sở GD&ĐT'
  },
  {
    id: 'doc-3',
    title: 'Bài trình chiếu PowerPoint: Thiết bị vào - ra máy tính',
    fileName: 'Bai_giang_Thiet_bi_vao_ra.pptx',
    fileType: 'pptx',
    fileSize: '4.2 MB',
    subjectId: 'tin-hoc',
    grade: 7,
    topic: 'Chủ đề 1: Máy tính và cộng đồng',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Hoàng (Tổ Tin học)',
    uploadedAt: '2026-10-22',
    status: 'da_xu_ly',
    description: 'Slide trình chiếu minh họa trực quan các thiết bị ngoại vi và cổng kết nối.',
    source: 'Tự biên soạn'
  }
];

export interface TermPair {
  id: string;
  term: string;
  definition: string;
  subjectId: SubjectId;
  grade: GradeLevel;
}

export const MATCHING_GAME_PAIRS: TermPair[] = [
  { id: 'p1', term: 'CPU', definition: 'Bộ não xử lý trung tâm điều khiển hoạt động của máy tính', subjectId: 'tin-hoc', grade: 6 },
  { id: 'p2', term: 'Bàn phím', definition: 'Thiết bị vào giúp người dùng nhập văn bản và câu lệnh', subjectId: 'tin-hoc', grade: 6 },
  { id: 'p3', term: 'Màn hình', definition: 'Thiết bị ra hiển thị kết quả xử lý của máy tính', subjectId: 'tin-hoc', grade: 6 },
  { id: 'p4', term: 'Vật mang tin', definition: 'Phương tiện lưu giữ và truyền đạt dữ liệu như sổ tay, thẻ nhớ', subjectId: 'tin-hoc', grade: 6 },
  { id: 'p5', term: 'RAM', definition: 'Bộ nhớ tạm thời bị mất dữ liệu khi tắt máy tính', subjectId: 'tin-hoc', grade: 6 },
  { id: 'p6', term: 'Mạng máy tính', definition: 'Các máy tính kết nối để truyền thông tin và chia sẻ tài nguyên', subjectId: 'tin-hoc', grade: 6 }
];

export interface WordGuess {
  word: string;
  hint: string;
  subjectId: SubjectId;
  grade: GradeLevel;
}

export const WORD_GUESS_LIST: WordGuess[] = [
  { word: 'INTERNET', hint: 'Mạng máy tính toàn cầu kết nối hàng triệu thiết bị trên khắp thế giới.', subjectId: 'tin-hoc', grade: 6 },
  { word: 'DATABASE', hint: 'Cơ sở dữ liệu được lưu trữ có tổ chức để dễ dàng truy xuất.', subjectId: 'tin-hoc', grade: 7 },
  { word: 'ALGORITHM', hint: 'Dãy các chỉ dẫn từng bước rõ ràng để giải quyết một bài toán.', subjectId: 'tin-hoc', grade: 8 },
  { word: 'HARDWARE', hint: 'Phần cứng vật lý của máy tính mà em có thể chạm vào được.', subjectId: 'tin-hoc', grade: 6 },
  { word: 'SOFTWARE', hint: 'Phần mềm và các chương trình chỉ thị cho máy tính hoạt động.', subjectId: 'tin-hoc', grade: 6 }
];

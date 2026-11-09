import { Lesson, TeacherDocument } from '../types';

// ============================================================================
// BẢNG DANH MỤC TOÀN BỘ 64 FILE SÁCH GIÁO KHOA CHUẨN ĐÃ ĐƯỢC TẢI LÊN & ĐỒNG BỘ
// 13 MÔN HỌC CHÍNH THỨC x 4 KHỐI LỚP (6, 7, 8, 9) - THCS MỸ HÒA
// BỘ SÁCH: KẾT NỐI TRI THỨC VỚI CUỘC SỐNG & TÀI LIỆU GDĐP VĨNH LONG
// ============================================================================

export const OFFICIAL_TEXTBOOK_DOCUMENTS: TeacherDocument[] = [
  // --- 1. MÔN TOÁN HỌC ---
  {
    id: 'sgk-toan-6-t1',
    title: 'Sách giáo khoa Toán 6 - Tập 1 (GDPT 2018)',
    fileName: 'SGK_Toan_6_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '28.4 MB',
    subjectId: 'toan',
    grade: 6,
    topic: 'Chương 1: Tập hợp số tự nhiên & Chương 2: Tính chia hết',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Quang Đạt (Tổ Toán - Tin)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 6,
    successLessons: 6,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Sách giáo khoa Toán 6 tập 1. Đầy đủ lý thuyết số tự nhiên, ước và bội, hình học trực quan.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-toan-6-t2',
    title: 'Sách giáo khoa Toán 6 - Tập 2 (GDPT 2018)',
    fileName: 'SGK_Toan_6_Tap_2_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '27.2 MB',
    subjectId: 'toan',
    grade: 6,
    topic: 'Chương 4: Phân số & Chương 5: Số thập phân',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Quang Đạt (Tổ Toán - Tin)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Phân số, số thập phân và các phép tính, hình học phẳng và đo lường trực quan.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-toan-7-t1',
    title: 'Sách giáo khoa Toán 7 - Tập 1',
    fileName: 'SGK_Toan_7_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '31.2 MB',
    subjectId: 'toan',
    grade: 7,
    topic: 'Chương 1: Số hữu tỉ & Chương 2: Số thực',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Đỗ Thị Hồng (Tổ Toán)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Số hữu tỉ và các phép tính, biểu diễn số hữu tỉ trên trục số, số vô tỉ và căn bậc hai số học.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-toan-7-t2',
    title: 'Sách giáo khoa Toán 7 - Tập 2',
    fileName: 'SGK_Toan_7_Tap_2_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '28.5 MB',
    subjectId: 'toan',
    grade: 7,
    topic: 'Chương 6: Tỉ lệ thức và dãy tỉ số bằng nhau & Chương 7: Biểu thức đại số',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Đỗ Thị Hồng (Tổ Toán)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Đại lượng tỉ lệ thuận, tỉ lệ nghịch, đơn thức và đa thức một biến, tam giác bằng nhau.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-toan-8-t1',
    title: 'Sách giáo khoa Toán 8 - Tập 1',
    fileName: 'SGK_Toan_8_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '29.8 MB',
    subjectId: 'toan',
    grade: 8,
    topic: 'Chương 1: Đa thức & Chương 2: Hằng đẳng thức đáng nhớ',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Quang Đạt (Tổ Toán)',
    uploadedAt: '2026-10-15',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Đơn thức, đa thức nhiều biến, 7 hằng đẳng thức đáng nhớ và phương pháp phân tích đa thức thành nhân tử.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-toan-8-t2',
    title: 'Sách giáo khoa Toán 8 - Tập 2',
    fileName: 'SGK_Toan_8_Tap_2_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '29.1 MB',
    subjectId: 'toan',
    grade: 8,
    topic: 'Chương 6: Phân thức đại số & Chương 7: Phương trình bậc nhất một ẩn',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Quang Đạt (Tổ Toán)',
    uploadedAt: '2026-10-15',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Phân thức đại số, phương trình bậc nhất một ẩn, hàm số bậc nhất và tam giác đồng dạng.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-toan-9-t1',
    title: 'Sách giáo khoa Toán 9 - Tập 1',
    fileName: 'SGK_Toan_9_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '34.5 MB',
    subjectId: 'toan',
    grade: 9,
    topic: 'Chương 1: Phương trình và hệ phương trình & Chương 2: Căn thức',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Nguyễn Văn Hưng (Tổ Toán)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Hệ phương trình bậc nhất hai ẩn, căn bậc hai, căn bậc ba và hệ thức lượng trong tam giác vuông.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-toan-9-t2',
    title: 'Sách giáo khoa Toán 9 - Tập 2',
    fileName: 'SGK_Toan_9_Tap_2_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '30.4 MB',
    subjectId: 'toan',
    grade: 9,
    topic: 'Chương 6: Hàm số y=ax^2 và Phương trình bậc hai & Chương 7: Đường tròn',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Nguyễn Văn Hưng (Tổ Toán)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Công thức nghiệm phương trình bậc hai, hệ thức Vi-ét, góc với đường tròn, tứ giác nội tiếp và hình học không gian.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- 2. MÔN NGỮ VĂN ---
  {
    id: 'sgk-van-6-t1',
    title: 'Sách giáo khoa Ngữ văn 6 - Tập 1',
    fileName: 'SGK_Ngu_van_6_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '32.1 MB',
    subjectId: 'van',
    grade: 6,
    topic: 'Bài 1: Tôi và các bạn & Bài 2: Gõ cửa trái tim',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Phạm Thị Thu Hà (Tổ Ngữ văn)',
    uploadedAt: '2026-10-10',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Truyện đồng thoại (Dế Mèn phiêu lưu kí), thơ trữ tình, các biện pháp tu từ so sánh, nhân hóa.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-van-6-t2',
    title: 'Sách giáo khoa Ngữ văn 6 - Tập 2',
    fileName: 'SGK_Ngu_van_6_Tap_2_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '31.0 MB',
    subjectId: 'van',
    grade: 6,
    topic: 'Bài 6: Chuyện kể về những người anh hùng & Bài 7: Thế giới cổ tích',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Phạm Thị Thu Hà (Tổ Ngữ văn)',
    uploadedAt: '2026-10-10',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Truyền thuyết Thánh Gióng, truyện cổ tích Thạch Sanh, Sọ Dừa và văn bản nghị luận.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-van-7-t1',
    title: 'Sách giáo khoa Ngữ văn 7 - Tập 1',
    fileName: 'SGK_Ngu_van_7_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '33.8 MB',
    subjectId: 'van',
    grade: 7,
    topic: 'Bài 1: Bầu trời tuổi thơ & Bài 2: Khúc nhạc tâm hồn',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Trần Ngọc Mai (Tổ Ngữ văn)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Truyện ngắn hiện đại, thơ bốn chữ, năm chữ, từ ngữ địa phương và phó từ.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-van-7-t2',
    title: 'Sách giáo khoa Ngữ văn 7 - Tập 2',
    fileName: 'SGK_Ngu_van_7_Tap_2_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '32.1 MB',
    subjectId: 'van',
    grade: 7,
    topic: 'Bài 6: Bài học cuộc sống & Bài 7: Trí tuệ dân gian',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Trần Ngọc Mai (Tổ Ngữ văn)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Truyện ngụ ngôn, tục ngữ và ca dao, văn bản thông tin và nghị luận chứng minh.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-van-8-t1',
    title: 'Sách giáo khoa Ngữ văn 8 - Tập 1',
    fileName: 'SGK_Ngu_van_8_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '35.4 MB',
    subjectId: 'van',
    grade: 8,
    topic: 'Bài 1: Câu chuyện của lịch sử & Bài 2: Vẻ đẹp cổ điển',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Phạm Thị Thu Hà (Tổ Ngữ văn)',
    uploadedAt: '2026-10-13',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Tiểu thuyết lịch sử, thơ Đường luật, nghệ thuật đảo ngữ, nói giảm nói tránh.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-van-8-t2',
    title: 'Sách giáo khoa Ngữ văn 8 - Tập 2',
    fileName: 'SGK_Ngu_van_8_Tap_2_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '33.5 MB',
    subjectId: 'van',
    grade: 8,
    topic: 'Bài 6: Chân dung cuộc sống & Bài 7: Tin yêu và ước vọng',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Phạm Thị Thu Hà (Tổ Ngữ văn)',
    uploadedAt: '2026-10-13',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Truyện cười, hài kịch, văn bản thông tin thuyết minh và nghị luận xã hội.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-van-9-t1',
    title: 'Sách giáo khoa Ngữ văn 9 - Tập 1',
    fileName: 'SGK_Ngu_van_9_Tap_1_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '36.8 MB',
    subjectId: 'van',
    grade: 9,
    topic: 'Bài 1: Trái tim người lính & Bài 2: Khát vọng hoà bình',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Hoàng Văn Hải (Tổ Ngữ văn)',
    uploadedAt: '2026-10-15',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Thơ hiện đại Việt Nam về người lính, truyện ngắn hiện thực và các phép liên kết câu, liên kết đoạn văn.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-van-9-t2',
    title: 'Sách giáo khoa Ngữ văn 9 - Tập 2',
    fileName: 'SGK_Ngu_van_9_Tap_2_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '34.0 MB',
    subjectId: 'van',
    grade: 9,
    topic: 'Bài 6: Vẻ đẹp tâm hồn & Bài 7: Hồn thiêng đất nước',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Hoàng Văn Hải (Tổ Ngữ văn)',
    uploadedAt: '2026-10-15',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Văn học trung đại Việt Nam, Truyện Kiều (Nguyễn Du), bi kịch, hài kịch và nghị luận văn học ôn thi vào lớp 10.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- 3. MÔN TIẾNG ANH (GLOBAL SUCCESS) ---
  {
    id: 'sgk-tienganh-6-t1',
    title: 'Tiếng Anh 6 Global Success - Student Book 1',
    fileName: 'SGK_Tieng_Anh_6_Global_Success_Tap_1.pdf',
    fileType: 'pdf',
    fileSize: '35.0 MB',
    subjectId: 'tieng-anh',
    grade: 6,
    topic: 'Unit 1: My New School & Unit 2: My House',
    bookSeries: 'Global Success',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Hoàng Mai Lan (Tổ Ngoại ngữ)',
    uploadedAt: '2026-10-11',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 6,
    successLessons: 6,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Từ vựng trường lớp, đồ dùng học tập, thì hiện tại đơn, hiện tại tiếp diễn và phát âm /ɑː/ và /ʌ/.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-tienganh-6-t2',
    title: 'Tiếng Anh 6 Global Success - Student Book 2',
    fileName: 'SGK_Tieng_Anh_6_Global_Success_Tap_2.pdf',
    fileType: 'pdf',
    fileSize: '32.8 MB',
    subjectId: 'tieng-anh',
    grade: 6,
    topic: 'Unit 7: Television & Unit 8: Sports and Games',
    bookSeries: 'Global Success',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Hoàng Mai Lan (Tổ Ngoại ngữ)',
    uploadedAt: '2026-10-11',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Chương trình truyền hình, thể thao, thì quá khứ đơn, câu mệnh lệnh và các thành phố nổi tiếng trên thế giới.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-tienganh-7-t1',
    title: 'Tiếng Anh 7 Global Success - Student Book 1',
    fileName: 'SGK_Tieng_Anh_7_Global_Success_Tap_1.pdf',
    fileType: 'pdf',
    fileSize: '36.2 MB',
    subjectId: 'tieng-anh',
    grade: 7,
    topic: 'Unit 1: Hobbies & Unit 2: Healthy Living',
    bookSeries: 'Global Success',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Bùi Thanh Hằng (Tổ Ngoại ngữ)',
    uploadedAt: '2026-10-13',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Sở thích cá nhân, lối sống lành mạnh, câu đơn và từ nối, âm /ə/ và /ɜː/.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-tienganh-7-t2',
    title: 'Tiếng Anh 7 Global Success - Student Book 2',
    fileName: 'SGK_Tieng_Anh_7_Global_Success_Tap_2.pdf',
    fileType: 'pdf',
    fileSize: '33.2 MB',
    subjectId: 'tieng-anh',
    grade: 7,
    topic: 'Unit 7: Traffic & Unit 8: Films',
    bookSeries: 'Global Success',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Bùi Thanh Hằng (Tổ Ngoại ngữ)',
    uploadedAt: '2026-10-13',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Giao thông, biển báo an toàn, thể loại phim ảnh, tính từ tận cùng -ed và -ing, liên từ mặc dù Although/However.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-tienganh-8-t1',
    title: 'Tiếng Anh 8 Global Success - Student Book 1',
    fileName: 'SGK_Tieng_Anh_8_Global_Success_Tap_1.pdf',
    fileType: 'pdf',
    fileSize: '38.0 MB',
    subjectId: 'tieng-anh',
    grade: 8,
    topic: 'Unit 1: Leisure Time & Unit 2: Life in the Countryside',
    bookSeries: 'Global Success',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Hoàng Mai Lan (Tổ Ngoại ngữ)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Hoạt động giải trí, cuộc sống nông thôn, cấu trúc so sánh hơn của trạng từ và các dân tộc thiểu số Việt Nam.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-tienganh-8-t2',
    title: 'Tiếng Anh 8 Global Success - Student Book 2',
    fileName: 'SGK_Tieng_Anh_8_Global_Success_Tap_2.pdf',
    fileType: 'pdf',
    fileSize: '34.5 MB',
    subjectId: 'tieng-anh',
    grade: 8,
    topic: 'Unit 7: Environmental Protection & Unit 8: Shopping',
    bookSeries: 'Global Success',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Hoàng Mai Lan (Tổ Ngoại ngữ)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Bảo vệ môi trường, câu điều kiện loại 1, mua sắm trực tuyến, các thì diễn tả tương lai và thiên tai.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-tienganh-9-t1',
    title: 'Tiếng Anh 9 Global Success - Student Book 1',
    fileName: 'SGK_Tieng_Anh_9_Global_Success_Tap_1.pdf',
    fileType: 'pdf',
    fileSize: '39.5 MB',
    subjectId: 'tieng-anh',
    grade: 9,
    topic: 'Unit 1: Local Community & Unit 2: City Life',
    bookSeries: 'Global Success',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Vũ Tuấn Anh (Tổ Ngoại ngữ)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Cộng đồng địa phương, cụm động từ (Phrasal Verbs), cuộc sống đô thị, so sánh kép và các vấn đề tuổi vị thành niên.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-tienganh-9-t2',
    title: 'Tiếng Anh 9 Global Success - Student Book 2',
    fileName: 'SGK_Tieng_Anh_9_Global_Success_Tap_2.pdf',
    fileType: 'pdf',
    fileSize: '35.0 MB',
    subjectId: 'tieng-anh',
    grade: 9,
    topic: 'Unit 7: Natural Wonders & Unit 8: Tourism',
    bookSeries: 'Global Success',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Vũ Tuấn Anh (Tổ Ngoại ngữ)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Kỳ quan thiên nhiên thế giới, du lịch sinh thái, câu bị động, mệnh đề quan hệ và kỹ năng làm bài thi tuyển sinh vào lớp 10.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- 4. MÔN KHOA HỌC TỰ NHIÊN ---
  {
    id: 'sgk-khtn-6',
    title: 'Sách giáo khoa Khoa học tự nhiên 6',
    fileName: 'SGK_KHTN_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '42.0 MB',
    subjectId: 'khtn',
    grade: 6,
    topic: 'Chương 1: Mở đầu KHTN & Chương 2: Chất quanh ta & Tế bào',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Trần Minh Đức (Tổ KHTN)',
    uploadedAt: '2026-10-11',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 6,
    successLessons: 6,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Quy định an toàn phòng thực hành, đo lường độ dài khối lượng, cấu tạo tế bào và đa dạng sinh học.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-khtn-7',
    title: 'Sách giáo khoa Khoa học tự nhiên 7',
    fileName: 'SGK_KHTN_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '44.5 MB',
    subjectId: 'khtn',
    grade: 7,
    topic: 'Chương 1: Nguyên tử - Nguyên tố hóa học & Tốc độ chuyển động',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Lê Thị Kim Chi (Tổ KHTN)',
    uploadedAt: '2026-10-13',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Bảng tuần hoàn các nguyên tố hóa học, liên kết hóa học, công thức tốc độ v = s/t và âm thanh.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-khtn-8',
    title: 'Sách giáo khoa Khoa học tự nhiên 8',
    fileName: 'SGK_KHTN_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '46.0 MB',
    subjectId: 'khtn',
    grade: 8,
    topic: 'Chương 1: Phản ứng hoá học & Định luật bảo toàn khối lượng',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Trần Minh Đức (Tổ KHTN)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Mol và tỉ khối của chất khí, nồng độ dung dịch, acid, base, áp suất chất lỏng và khí quyển.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-khtn-9',
    title: 'Sách giáo khoa Khoa học tự nhiên 9',
    fileName: 'SGK_KHTN_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '48.2 MB',
    subjectId: 'khtn',
    grade: 9,
    topic: 'Chương 1: Động năng và Thế năng & Di truyền Menđen',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Lê Thị Kim Chi (Tổ KHTN)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 3,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Năng lượng cơ học, quang học (khúc xạ, thấu kính), hợp chất hữu cơ (hydrocarbon) và quy luật di truyền học.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- 5. MÔN LỊCH SỬ VÀ ĐỊA LÍ ---
  {
    id: 'sgk-lsdl-6',
    title: 'Sách giáo khoa Lịch sử và Địa lí 6',
    fileName: 'SGK_Lich_su_va_Dia_li_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '32.4 MB',
    subjectId: 'lich-su-dia-ly',
    grade: 6,
    topic: 'Phần Lịch sử: Nguồn gốc loài người & Phần Địa lí: Trái Đất',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Nguyễn Thị Thủy (Tổ Sử - Địa)',
    uploadedAt: '2026-10-11',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Quá trình tiến hóa từ vượn thành người, xã hội nguyên thủy, hình dạng và chuyển động của Trái Đất.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-lsdl-7',
    title: 'Sách giáo khoa Lịch sử và Địa lí 7',
    fileName: 'SGK_Lich_su_va_Dia_li_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '34.0 MB',
    subjectId: 'lich-su-dia-ly',
    grade: 7,
    topic: 'Lịch sử Tây Âu thời trung đại & Địa lí Châu Âu',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Nguyễn Thị Thủy (Tổ Sử - Địa)',
    uploadedAt: '2026-10-13',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Sự hình thành chế độ phong kiến Tây Âu, các cuộc phát kiến địa lí lớn và đặc điểm tự nhiên châu Âu.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-lsdl-8',
    title: 'Sách giáo khoa Lịch sử và Địa lí 8',
    fileName: 'SGK_Lich_su_va_Dia_li_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '35.8 MB',
    subjectId: 'lich-su-dia-ly',
    grade: 8,
    topic: 'Cách mạng tư sản thời cận đại & Địa hình khoáng sản Việt Nam',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Văn Thành (Tổ Sử - Địa)',
    uploadedAt: '2026-10-15',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Cách mạng tư sản Anh, Pháp; vị trí địa lí, phạm vi lãnh thổ và địa hình đồi núi khoáng sản Việt Nam.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-lsdl-9',
    title: 'Sách giáo khoa Lịch sử và Địa lí 9',
    fileName: 'SGK_Lich_su_va_Dia_li_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '37.1 MB',
    subjectId: 'lich-su-dia-ly',
    grade: 9,
    topic: 'Thế giới từ năm 1945 đến nay & Địa lí dân cư, kinh tế Việt Nam',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Văn Thành (Tổ Sử - Địa)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Trật tự thế giới hai cực Ianta, phong trào giải phóng dân tộc, dân số và cơ cấu các ngành kinh tế Việt Nam.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- 6. MÔN GIÁO DỤC CÔNG DÂN ---
  {
    id: 'sgk-gdcd-6',
    title: 'Sách giáo khoa Giáo dục công dân 6',
    fileName: 'SGK_GDCD_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '22.0 MB',
    subjectId: 'gdcd',
    grade: 6,
    topic: 'Bài 1: Tự hào về truyền thống gia đình & Bài 2: Yêu thương con người',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Nguyễn Thị Cẩm Tú (Tổ Xã hội)',
    uploadedAt: '2026-10-10',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Truyền thống dòng họ quê hương, lòng nhân ái, tính siêng năng kiên trì và quyền trẻ em.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-gdcd-7',
    title: 'Sách giáo khoa Giáo dục công dân 7',
    fileName: 'SGK_GDCD_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '23.5 MB',
    subjectId: 'gdcd',
    grade: 7,
    topic: 'Bài 1: Tự hào về truyền thống quê hương & Bảo tồn di sản văn hóa',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Nguyễn Thị Cẩm Tú (Tổ Xã hội)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Bảo tồn di sản văn hóa vật thể và phi vật thể, quan tâm cảm thông, học tập tự giác và phòng chống tệ nạn xã hội.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-gdcd-8',
    title: 'Sách giáo khoa Giáo dục công dân 8',
    fileName: 'SGK_GDCD_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '24.8 MB',
    subjectId: 'gdcd',
    grade: 8,
    topic: 'Bài 1: Tự hào về truyền thống dân tộc & Tuân thủ pháp luật',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Nguyễn Thị Cẩm Tú (Tổ Xã hội)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Tôn trọng sự đa dạng văn hóa các dân tộc, lập kế hoạch chi tiêu, phòng ngừa bạo lực học đường và tai nạn vũ khí.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-gdcd-9',
    title: 'Sách giáo khoa Giáo dục công dân 9',
    fileName: 'SGK_GDCD_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '25.6 MB',
    subjectId: 'gdcd',
    grade: 9,
    topic: 'Bài 1: Sống có lý tưởng & Nghĩa vụ công dân đối với Tổ quốc',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Nguyễn Thị Cẩm Tú (Tổ Xã hội)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Lý tưởng sống của thanh niên, quyền tự do kinh doanh và nghĩa vụ đóng thuế, quyền và nghĩa vụ lao động của công dân.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- 7. MÔN TIN HỌC ---
  {
    id: 'sgk-tinhoc-6',
    title: 'Sách giáo khoa Tin học 6 (GDPT 2018)',
    fileName: 'SGK_Tin_hoc_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '26.5 MB',
    subjectId: 'tin-hoc',
    grade: 6,
    topic: 'Trọn bộ 6 Chủ đề: Máy tính, Mạng Internet, Soạn thảo văn bản, Thuật toán',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Quang Đạt (Tổ Toán - Tin)',
    uploadedAt: '2026-10-10',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 6,
    recognizedLessons: 17,
    successLessons: 17,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Sách giáo khoa Tin học 6 bản chuẩn, trích xuất 17 bài học chính khóa bao gồm thông tin, mạng máy tính, internet, an toàn thông tin, sơ đồ tư duy và thuật toán.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-tinhoc-7',
    title: 'Sách giáo khoa Tin học 7',
    fileName: 'SGK_Tin_hoc_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '27.8 MB',
    subjectId: 'tin-hoc',
    grade: 7,
    topic: 'Chủ đề: Thiết bị vào ra, Mạng xã hội & Phần mềm Bảng tính Excel',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Quang Đạt (Tổ Toán - Tin)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 4,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Các thiết bị vào ra của máy tính, văn hóa ứng xử trên mạng xã hội, các hàm tính toán cơ bản SUM, AVERAGE, MIN, MAX trong bảng tính.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-tinhoc-8',
    title: 'Sách giáo khoa Tin học 8',
    fileName: 'SGK_Tin_hoc_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '28.4 MB',
    subjectId: 'tin-hoc',
    grade: 8,
    topic: 'Chủ đề: Lịch sử máy tính & Lập trình thuật toán Scratch / Python',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Quang Đạt (Tổ Toán - Tin)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 4,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Lịch sử phát triển các thế hệ máy tính, xử lý thông tin số, biểu diễn thuật toán tuần tự, rẽ nhánh, lặp qua ngôn ngữ lập trình trực quan.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-tinhoc-9',
    title: 'Sách giáo khoa Tin học 9',
    fileName: 'SGK_Tin_hoc_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '29.2 MB',
    subjectId: 'tin-hoc',
    grade: 9,
    topic: 'Chủ đề: Dịch vụ đám mây, Cơ sở dữ liệu & Định hướng nghề CNTT',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Lê Quang Đạt (Tổ Toán - Tin)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 4,
    recognizedLessons: 5,
    successLessons: 5,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Điện toán đám mây, lưu trữ trực tuyến, mô hình mạng LAN/WAN, an toàn dữ liệu số và định hướng nghề nghiệp thời đại số.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- 8. MÔN CÔNG NGHỆ ---
  {
    id: 'sgk-congnghe-6',
    title: 'Sách giáo khoa Công nghệ 6',
    fileName: 'SGK_Cong_nghe_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '24.5 MB',
    subjectId: 'cong-nghe',
    grade: 6,
    topic: 'Chương 1: Nhà ở & Chương 2: Bảo quản và chế biến thực phẩm',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Đặng Thùy Trang (Tổ Công nghệ)',
    uploadedAt: '2026-10-10',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Vai trò của nhà ở, ngôi nhà thông minh (Smart Home), sử dụng năng lượng tiết kiệm và nguyên tắc ăn uống hợp lý.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-congnghe-7',
    title: 'Sách giáo khoa Công nghệ 7',
    fileName: 'SGK_Cong_nghe_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '25.8 MB',
    subjectId: 'cong-nghe',
    grade: 7,
    topic: 'Chương 1: Trồng trọt & Chương 2: Lâm nghiệp - Thủy sản',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Đặng Thùy Trang (Tổ Công nghệ)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Kỹ thuật gieo trồng cây nông nghiệp công nghệ cao, quản lý đất trồng, chăn nuôi gia súc gia cầm an toàn sinh học.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-congnghe-8',
    title: 'Sách giáo khoa Công nghệ 8',
    fileName: 'SGK_Cong_nghe_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '27.0 MB',
    subjectId: 'cong-nghe',
    grade: 8,
    topic: 'Chương 1: Vẽ kĩ thuật & Chương 2: Cơ khí và Điện gia dụng',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Bùi Văn Nam (Tổ Công nghệ)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Bản vẽ chi tiết, hình chiếu vuông góc, gia công nguội cơ khí, an toàn điện và cấu tạo đồ dùng điện gia đình.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-congnghe-9',
    title: 'Sách giáo khoa Công nghệ 9',
    fileName: 'SGK_Cong_nghe_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '28.3 MB',
    subjectId: 'cong-nghe',
    grade: 9,
    topic: 'Mô-đun: Lắp đặt mạng điện trong nhà & Thiết kế mạch điện',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Bùi Văn Nam (Tổ Công nghệ)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Sơ đồ nguyên lý và sơ đồ lắp đặt mạch điện chiếu sáng, công tơ điện, cầu dao, aptomat và an toàn điện sinh hoạt.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- 9. MÔN ÂM NHẠC ---
  {
    id: 'sgk-amnhac-6',
    title: 'Sách giáo khoa Âm nhạc 6',
    fileName: 'SGK_Am_nhac_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '18.5 MB',
    subjectId: 'am-nhac',
    grade: 6,
    topic: 'Chủ đề 1: Tuổi học trò & Nhạc lý cơ bản, Đọc nhạc',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Trần Quang Vinh (Tổ Nghệ thuật)',
    uploadedAt: '2026-10-10',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Hát bài hát tuổi học trò, các nốt nhạc trên khuông khóa Son, tiết tấu và nhạc cụ gõ đệm thanh phách, tambourine.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-amnhac-7',
    title: 'Sách giáo khoa Âm nhạc 7',
    fileName: 'SGK_Am_nhac_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '19.2 MB',
    subjectId: 'am-nhac',
    grade: 7,
    topic: 'Chủ đề: Giai điệu mùa thu & Nhạc cụ gõ, sáo Recorder',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Trần Quang Vinh (Tổ Nghệ thuật)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Hát hợp xướng, trường độ nốt đen chấm dôi, kỹ thuật bấm ngón sáo recorder và thưởng thức âm nhạc dân ca Việt Nam.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-amnhac-8',
    title: 'Sách giáo khoa Âm nhạc 8',
    fileName: 'SGK_Am_nhac_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '19.8 MB',
    subjectId: 'am-nhac',
    grade: 8,
    topic: 'Chủ đề: Dân ca ba miền & Nhạc cổ điển châu Âu',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Trần Quang Vinh (Tổ Nghệ thuật)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Các điệu Lý Nam Bộ, Hò sông Mã, cuộc đời và sự nghiệp thiên tài âm nhạc W.A. Mozart, Ludwig van Beethoven.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-amnhac-9',
    title: 'Sách giáo khoa Âm nhạc 9',
    fileName: 'SGK_Am_nhac_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '20.4 MB',
    subjectId: 'am-nhac',
    grade: 9,
    topic: 'Chủ đề: Âm nhạc hiện đại thế giới & Nhạc cụ kèn phím Kèn Melodica',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Trần Quang Vinh (Tổ Nghệ thuật)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Hát bè hòa âm phức điệu, nhạc giao hưởng, nhạc kịch thế giới và biểu diễn tốp ca sân khấu học đường.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- 10. MÔN MĨ THUẬT ---
  {
    id: 'sgk-mithuat-6',
    title: 'Sách giáo khoa Mĩ thuật 6',
    fileName: 'SGK_Mi_thuat_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '22.5 MB',
    subjectId: 'mi-thuat',
    grade: 6,
    topic: 'Chủ đề: Các yếu tố tạo hình (Chấm, nét, hình, mảng, màu sắc)',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Lưu Mỹ Linh (Tổ Nghệ thuật)',
    uploadedAt: '2026-10-10',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Ngôn ngữ tạo hình cơ bản, vẽ tranh tĩnh vật, màu nóng - màu lạnh và trang trí bìa sách, nhãn vở.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-mithuat-7',
    title: 'Sách giáo khoa Mĩ thuật 7',
    fileName: 'SGK_Mi_thuat_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '23.1 MB',
    subjectId: 'mi-thuat',
    grade: 7,
    topic: 'Chủ đề: Nghệ thuật thời Lý - Trần & Tạo dáng sản phẩm',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Lưu Mỹ Linh (Tổ Nghệ thuật)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Họa tiết rồng thời Lý, gốm hoa nâu thời Trần, thiết kế logo huy hiệu và tạo dáng sản phẩm gia dụng từ vật liệu tái chế.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-mithuat-8',
    title: 'Sách giáo khoa Mĩ thuật 8',
    fileName: 'SGK_Mi_thuat_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '23.8 MB',
    subjectId: 'mi-thuat',
    grade: 8,
    topic: 'Chủ đề: Điêu khắc tượng phù điêu & Thiết kế thời trang',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Lưu Mỹ Linh (Tổ Nghệ thuật)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Nặn tượng khối tròn, phù điêu đắp nổi bằng đất sét, thiết kế bộ sưu tập thời trang học sinh và vẽ phối cảnh không gian 3D.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-mithuat-9',
    title: 'Sách giáo khoa Mĩ thuật 9',
    fileName: 'SGK_Mi_thuat_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '24.2 MB',
    subjectId: 'mi-thuat',
    grade: 9,
    topic: 'Chủ đề: Mĩ thuật hiện đại thế giới & Thiết kế đồ họa truyền thông',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Lưu Mỹ Linh (Tổ Nghệ thuật)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Trường phái Ấn tượng, Lập thể, Trừu tượng (Van Gogh, Picasso), thiết kế poster cổ động và bao bì sản phẩm thương mại.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- 11. MÔN GIÁO DỤC THỂ CHẤT ---
  {
    id: 'sgk-thechat-6',
    title: 'Sách giáo khoa Giáo dục thể chất 6',
    fileName: 'SGK_GD_The_chat_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '19.4 MB',
    subjectId: 'giao-duc-the-chat',
    grade: 6,
    topic: 'Chủ đề: Đội hình đội ngũ & Bài tập thể dục phát triển chung',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Nguyễn Trọng Nhân (Tổ Thể chất)',
    uploadedAt: '2026-10-10',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Các tư thế đứng nghiêm, nghỉ, quay phải, quay trái, biến đổi đội hình và bài thể dục liên hoàn 8 động tác.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-thechat-7',
    title: 'Sách giáo khoa Giáo dục thể chất 7',
    fileName: 'SGK_GD_The_chat_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '20.1 MB',
    subjectId: 'giao-duc-the-chat',
    grade: 7,
    topic: 'Chủ đề: Chạy cự ly ngắn 60m & Kỹ thuật tâng bóng',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Nguyễn Trọng Nhân (Tổ Thể chất)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Kỹ thuật xuất phát thấp, chạy lao, chạy giữa quãng, về đích cự ly 60m và kỹ thuật khống chế bóng cơ bản.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-thechat-8',
    title: 'Sách giáo khoa Giáo dục thể chất 8',
    fileName: 'SGK_GD_The_chat_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '21.0 MB',
    subjectId: 'giao-duc-the-chat',
    grade: 8,
    topic: 'Chủ đề: Nhảy xa kiểu ngồi & Kỹ thuật môn Cầu lông',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Phan Hoàng Anh (Tổ Thể chất)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Giai đoạn chạy đà, giậm nhảy, bay trên không, tiếp đất nhảy xa và kỹ thuật đánh cầu cao sâu thuận tay.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-thechat-9',
    title: 'Sách giáo khoa Giáo dục thể chất 9',
    fileName: 'SGK_GD_The_chat_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '21.8 MB',
    subjectId: 'giao-duc-the-chat',
    grade: 9,
    topic: 'Chủ đề: Kỹ thuật bóng rổ & Chạy bền cự ly trung bình 800m - 1500m',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Phan Hoàng Anh (Tổ Thể chất)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Kỹ thuật ném rổ một tay trên vai, dẫn bóng luồn cọc, phân phối sức trên đường chạy 800m - 1500m.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- 12. MÔN HOẠT ĐỘNG TRẢI NGHIỆM, HƯỚNG NGHIỆP ---
  {
    id: 'sgk-hdtn-6',
    title: 'Hoạt động trải nghiệm, hướng nghiệp 6',
    fileName: 'SGK_HDTN_6_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '24.2 MB',
    subjectId: 'hoat-dong-trai-nghiem',
    grade: 6,
    topic: 'Chủ đề 1: Khám phá trường THCS & Chủ đề 2: Xây dựng nếp sống',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Trần Kim Yến (Tổng Phụ trách Đội)',
    uploadedAt: '2026-10-10',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Thích ứng môi trường học tập cấp THCS, rèn luyện thói quen tự giác, quản lý thời gian và thiết lập tình bạn đẹp.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-hdtn-7',
    title: 'Hoạt động trải nghiệm, hướng nghiệp 7',
    fileName: 'SGK_HDTN_7_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '25.0 MB',
    subjectId: 'hoat-dong-trai-nghiem',
    grade: 7,
    topic: 'Chủ đề 1: Phát triển mối quan hệ hòa đồng & Chủ đề 2: Tự chủ tài chính',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Cô Trần Kim Yến (Tổng Phụ trách Đội)',
    uploadedAt: '2026-10-12',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Kỹ năng giải quyết bất đồng trong nhóm, ứng xử văn minh trên không gian mạng và quản lý chi tiêu cá nhân hợp lý.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-hdtn-8',
    title: 'Hoạt động trải nghiệm, hướng nghiệp 8',
    fileName: 'SGK_HDTN_8_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '26.1 MB',
    subjectId: 'hoat-dong-trai-nghiem',
    grade: 8,
    topic: 'Chủ đề 1: Khám phá nghề truyền thống & Chủ đề 2: Tình nguyện vì cộng đồng',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Võ Quốc Tuấn (Phó Hiệu trưởng)',
    uploadedAt: '2026-10-14',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Khảo sát các làng nghề thủ công địa phương, xây dựng kế hoạch dự án tình nguyện môi trường và an sinh xã hội.',
    source: 'NXB Giáo dục Việt Nam'
  },
  {
    id: 'sgk-hdtn-9',
    title: 'Hoạt động trải nghiệm, hướng nghiệp 9',
    fileName: 'SGK_HDTN_9_KNTT.pdf',
    fileType: 'pdf',
    fileSize: '27.5 MB',
    subjectId: 'hoat-dong-trai-nghiem',
    grade: 9,
    topic: 'Chủ đề 1: Định hướng con đường sau THCS & Chủ đề 2: Kỹ năng thích ứng',
    bookSeries: 'Sách giáo khoa hiện hành',
    academicYear: '2026-2027',
    uploadedBy: 'Thầy Võ Quốc Tuấn (Phó Hiệu trưởng)',
    uploadedAt: '2026-10-16',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Phân tích năng lực bản thân, tìm hiểu hệ thống trường THPT, giáo dục nghề nghiệp và chuẩn bị tâm lý cho kỳ thi tuyển sinh vào lớp 10.',
    source: 'NXB Giáo dục Việt Nam'
  },

  // --- 13. TÀI LIỆU GIÁO DỤC ĐỊA PHƯƠNG TỈNH VĨNH LONG ---
  {
    id: 'sgk-gddp-6',
    title: 'Tài liệu Giáo dục địa phương tỉnh Vĩnh Long - Lớp 6',
    fileName: 'Tai_lieu_Giao_duc_dia_phuong_Vinh_Long_Lop_6.pdf',
    fileType: 'pdf',
    fileSize: '21.5 MB',
    subjectId: 'giao-duc-dia-phuong',
    grade: 6,
    topic: 'Chủ đề 1: Vị trí địa lí Vĩnh Long & Truyền thống văn hóa dân gian',
    bookSeries: 'Tài liệu GDĐP tỉnh Vĩnh Long',
    academicYear: '2026-2027',
    uploadedBy: 'Ban biên soạn GDĐP tỉnh Vĩnh Long',
    uploadedAt: '2026-10-11',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Đặc điểm tự nhiên, sông ngòi Tiền Giang - Hậu Giang, truyện dân gian Vĩnh Long và di tích Văn Thánh Miếu.',
    source: 'Sở GD&ĐT tỉnh Vĩnh Long'
  },
  {
    id: 'sgk-gddp-7',
    title: 'Tài liệu Giáo dục địa phương tỉnh Vĩnh Long - Lớp 7',
    fileName: 'Tai_lieu_Giao_duc_dia_phuong_Vinh_Long_Lop_7.pdf',
    fileType: 'pdf',
    fileSize: '22.8 MB',
    subjectId: 'giao-duc-dia-phuong',
    grade: 7,
    topic: 'Chủ đề 1: Danh nhân văn hóa Vĩnh Long & Làng nghề gốm đỏ Mang Thít',
    bookSeries: 'Tài liệu GDĐP tỉnh Vĩnh Long',
    academicYear: '2026-2027',
    uploadedBy: 'Ban biên soạn GDĐP tỉnh Vĩnh Long',
    uploadedAt: '2026-10-13',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Tìm hiểu danh nhân Phan Thanh Giản, Nhà thơ Nguyễn Thông, làng nghề vương quốc gốm đỏ Mang Thít và ẩm thực bánh tét ba nhân.',
    source: 'Sở GD&ĐT tỉnh Vĩnh Long'
  },
  {
    id: 'sgk-gddp-8',
    title: 'Tài liệu Giáo dục địa phương tỉnh Vĩnh Long - Lớp 8',
    fileName: 'Tai_lieu_Giao_duc_dia_phuong_Vinh_Long_Lop_8.pdf',
    fileType: 'pdf',
    fileSize: '24.0 MB',
    subjectId: 'giao-duc-dia-phuong',
    grade: 8,
    topic: 'Chủ đề 1: Lịch sử vùng đất Vĩnh Long thời kỳ kháng chiến & Nông nghiệp đặc sản',
    bookSeries: 'Tài liệu GDĐP tỉnh Vĩnh Long',
    academicYear: '2026-2027',
    uploadedBy: 'Ban biên soạn GDĐP tỉnh Vĩnh Long',
    uploadedAt: '2026-10-15',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Phong trào khởi nghĩa Nam Kỳ tại Vĩnh Long, di tích lịch sử căn cứ Cái Ngang, vùng chuyên canh bưởi Năm Roi Bình Minh, cam sành Tam Bình.',
    source: 'Sở GD&ĐT tỉnh Vĩnh Long'
  },
  {
    id: 'sgk-gddp-9',
    title: 'Tài liệu Giáo dục địa phương tỉnh Vĩnh Long - Lớp 9',
    fileName: 'Tai_lieu_Giao_duc_dia_phuong_Vinh_Long_Lop_9.pdf',
    fileType: 'pdf',
    fileSize: '25.3 MB',
    subjectId: 'giao-duc-dia-phuong',
    grade: 9,
    topic: 'Chủ đề 1: Cuộc đời sự nghiệp cố Thủ tướng Võ Văn Kiệt & Đô thị hóa TX Bình Minh, TP Vĩnh Long',
    bookSeries: 'Tài liệu GDĐP tỉnh Vĩnh Long',
    academicYear: '2026-2027',
    uploadedBy: 'Ban biên soạn GDĐP tỉnh Vĩnh Long',
    uploadedAt: '2026-10-17',
    status: 'da_xac_nhan',
    readingStatus: 'da_doc',
    processingStatus: 'da_xuat_ban',
    recognizedChapters: 2,
    recognizedLessons: 4,
    successLessons: 4,
    needsReviewLessons: 0,
    isPublished: true,
    description: 'Tấm gương cách mạng kiệt xuất bác Hai Văn (Võ Văn Kiệt), Giáo sư Viện sĩ Trần Đại Nghĩa; quy hoạch phát triển kinh tế hạ tầng cầu Mỹ Thuận 2 và công nghiệp số Vĩnh Long.',
    source: 'Sở GD&ĐT tỉnh Vĩnh Long'
  }
];

// ============================================================================
// HỆ THỐNG BÀI HỌC CHUẨN TRÍCH XUẤT TỪ SÁCH GIÁO KHOA CHO TẤT CẢ CÁC MÔN VÀ KHỐI LỚP
// (Bảo toàn 17 bài Tin học 6 trong INITIAL_LESSONS, bổ sung bài chuẩn cho toàn bộ môn/khối)
// ============================================================================

export const OFFICIAL_TEXTBOOK_LESSONS: Lesson[] = [
  // ==========================================================================
  // 1. MÔN TOÁN HỌC (LỚP 6, 7, 8, 9)
  // ==========================================================================
  // --- TOÁN 6 ---
  {
    id: 'toan6-b2',
    title: 'Bài 2: Các phép tính với số tự nhiên',
    subjectId: 'toan',
    grade: 6,
    semester: 1,
    chapter: 'Chương 1: Số tự nhiên',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Toán 6 Tập 1',
    pageReference: 'Trang 11 - 15',
    orderIndex: 2,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nắm vững tính chất giao hoán, kết hợp, phân phối của phép cộng và phép nhân.',
      'Thực hiện thành thạo phép chia hết và phép chia có dư trong tập hợp số tự nhiên.',
      'Vận dụng tính toán nhanh và giải quyết các bài toán thực tiễn.'
    ],
    summary: 'Rèn luyện kỹ năng thực hiện các phép tính cộng, trừ, nhân, chia số tự nhiên và tính toán hợp lý bằng tính chất giao hoán, kết hợp.',
    keyPoints: [
      'Phép cộng và phép nhân có tính chất giao hoán: a + b = b + a; a . b = b . a.',
      'Tính chất kết hợp: (a + b) + c = a + (b + c); (a . b) . c = a . (b . c).',
      'Tính chất phân phối của phép nhân đối với phép cộng: a . (b + c) = a . b + a . c.',
      'Trong phép chia có dư: Số bị chia = (Số chia . Thương) + Số dư (0 < Số dư < Số chia).'
    ],
    contentMarkdown: `### 1. Phép cộng và phép nhân số tự nhiên
* **Tính chất giao hoán**: Khi đổi chỗ các số hạng trong một tổng (hoặc các thừa số trong một tích), tổng (hoặc tích) không thay đổi.
* **Tính chất kết hợp**: Muốn cộng một tổng hai số với số thứ ba, ta có thể cộng số thứ nhất với tổng của số thứ hai và số thứ ba.
* **Tính chất phân phối**: $a \\cdot (b + c) = a \\cdot b + a \\cdot c$.
* **Ví dụ tính nhanh**:
  $$47 \\cdot 36 + 47 \\cdot 64 = 47 \\cdot (36 + 64) = 47 \\cdot 100 = 4700$$

### 2. Phép trừ và phép chia hết
* Với hai số tự nhiên $a$ và $b$, nếu $a \\ge b$ thì luôn có duy nhất số tự nhiên $c$ sao cho $b + c = a$. Ký hiệu: $a - b = c$.
* Nếu có số tự nhiên $q$ sao cho $a = b \\cdot q$ thì ta nói $a$ chia hết cho $b$. Ký hiệu: $a : b = q$.

### 3. Phép chia có dư
* Cho hai số tự nhiên $a$ và $b$ ($b \\ne 0$). Luôn tìm được hai số tự nhiên $q$ và $r$ duy nhất sao cho:
  $$a = b \\cdot q + r \\quad (0 \\le r < b)$$
* Nếu $r = 0$, ta có phép chia hết. Nếu $r > 0$, ta có phép chia có dư với số dư $r$ luôn nhỏ hơn số chia $b$.`,
    sampleExercises: [
      {
        question: 'Tính một cách hợp lí: A = 125 . 1972 . 8?',
        solution: 'Áp dụng tính chất giao hoán và kết hợp: A = (125 . 8) . 1972 = 1000 . 1972 = 1 972 000.'
      },
      {
        question: 'Một lớp học có 43 học sinh cần đi tham quan bằng xe ô tô 7 chỗ. Hỏi cần ít nhất bao nhiêu xe để chở hết học sinh?',
        solution: 'Ta có phép chia: 43 : 7 = 6 (dư 1). Vì còn dư 1 học sinh nên cần thêm 1 xe nữa. Vậy số xe ít nhất là 6 + 1 = 7 xe.'
      }
    ]
  },
  {
    id: 'toan6-b3',
    title: 'Bài 3: Lũy thừa với số mũ tự nhiên',
    subjectId: 'toan',
    grade: 6,
    semester: 1,
    chapter: 'Chương 1: Số tự nhiên',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Toán 6 Tập 1',
    pageReference: 'Trang 16 - 19',
    orderIndex: 3,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Hiểu khái niệm lũy thừa bậc n của a, cơ số và số mũ.',
      'Thành thạo quy tắc nhân, chia hai lũy thừa cùng cơ số.',
      'Viết các số tự nhiên dưới dạng tổng các lũy thừa của 10.'
    ],
    summary: 'Lũy thừa bậc n của số tự nhiên a là tích của n thừa số bằng nhau, mỗi thừa số bằng a. Quy tắc nhân và chia hai lũy thừa cùng cơ số.',
    keyPoints: [
      'Lũy thừa: a^n = a . a . ... . a (n thừa số a, n thuộc N*). a gọi là cơ số, n gọi là số mũ.',
      'Nhân hai lũy thừa cùng cơ số: a^m . a^n = a^(m+n).',
      'Chia hai lũy thừa cùng cơ số: a^m : a^n = a^(m-n) (với a khác 0, m >= n). Quy ước: a^0 = 1 (a khác 0).'
    ],
    contentMarkdown: `### 1. Khái niệm lũy thừa
Lũy thừa bậc $n$ của $a$ (ký hiệu $a^n$) là tích của $n$ thừa số bằng nhau, mỗi thừa số bằng $a$:
$$a^n = \\underbrace{a \\cdot a \\cdot \\dots \\cdot a}_{n \\text{ thừa số } a} \\quad (n \\in \\mathbb{N}^*)$$
* $a$ được gọi là **cơ số**.
* $n$ được gọi là **số mũ**.
* **Đặc biệt**: $a^2$ còn gọi là $a$ bình phương; $a^3$ còn gọi là $a$ lập phương.

### 2. Nhân hai lũy thừa cùng cơ số
Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và cộng các số mũ:
$$a^m \\cdot a^n = a^{m+n}$$

### 3. Chia hai lũy thừa cùng cơ số
Khi chia hai lũy thừa cùng cơ số (khác 0), ta giữ nguyên cơ số và lấy số mũ của số bị chia trừ đi số mũ của số chia:
$$a^m : a^n = a^{m-n} \\quad (a \\ne 0; m \\ge n)$$
* **Quy ước**: $a^0 = 1$ với mọi $a \\ne 0$.`,
    sampleExercises: [
      {
        question: 'Viết kết quả phép tính dưới dạng một lũy thừa: a) 3^4 . 3^5; b) 5^8 : 5^3?',
        solution: 'a) 3^4 . 3^5 = 3^(4+5) = 3^9. b) 5^8 : 5^3 = 5^(8-3) = 5^5.'
      }
    ]
  },
  {
    id: 'toan6-b4',
    title: 'Bài 4: Phân số và các phép tính với phân số',
    subjectId: 'toan',
    grade: 6,
    semester: 2,
    chapter: 'Chương 4: Phân số',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Toán 6 Tập 2',
    pageReference: 'Trang 5 - 15',
    orderIndex: 4,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nắm vững khái niệm phân số mở rộng với tử và mẫu là các số nguyên.',
      'Biết cách rút gọn phân số và quy đồng mẫu số nhiều phân số.',
      'Cộng, trừ, nhân, chia thành thạo hai phân số.'
    ],
    summary: 'Mở rộng khái niệm phân số, phân số bằng nhau, tính chất cơ bản của phân số và 4 phép toán với phân số.',
    keyPoints: [
      'Phân số a/b với a, b thuộc Z, b khác 0. a là tử số, b là mẫu số.',
      'Hai phân số a/b = c/d khi và chỉ khi a.d = b.c.',
      'Quy đồng mẫu số và cộng hai phân số cùng mẫu: a/m + b/m = (a+b)/m.'
    ],
    contentMarkdown: `### 1. Mở rộng khái niệm phân số
* Phân số có dạng $a/b$, trong đó $a, b \\in \\mathbb{Z}$ và $b \\ne 0$.
* Hai phân số $\\frac{a}{b}$ và $\\frac{c}{d}$ bằng nhau nếu $a \\cdot d = b \\cdot c$.

### 2. Các phép toán với phân số
* **Phép cộng**: $\\frac{a}{m} + \\frac{b}{m} = \\frac{a+b}{m}$.
* **Phép nhân**: $\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$.
* **Phép chia**: $\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}$ ($c \\ne 0$).`,
    sampleExercises: [
      {
        question: 'Tính: A = 2/3 + 3/4?',
        solution: 'Quy đồng mẫu chung là 12: A = 8/12 + 9/12 = 17/12.'
      }
    ]
  },

  // --- TOÁN 7 ---
  {
    id: 'toan7-b1',
    title: 'Bài 1: Tập hợp các số hữu tỉ và các phép tính',
    subjectId: 'toan',
    grade: 7,
    semester: 1,
    chapter: 'Chương 1: Số hữu tỉ',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Toán 7 Tập 1',
    pageReference: 'Trang 6 - 12',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết số hữu tỉ là số viết được dưới dạng phân số a/b (a, b thuộc Z, b khác 0). Ký hiệu tập hợp: Q.',
      'Biểu diễn thành thạo số hữu tỉ trên trục số và so sánh hai số hữu tỉ.',
      'Thực hiện thành thạo các phép tính cộng, trừ, nhân, chia số hữu tỉ.'
    ],
    summary: 'Làm quen với tập hợp số hữu tỉ Q, biểu diễn số hữu tỉ trên trục số và các quy tắc tính toán phân số mở rộng.',
    keyPoints: [
      'Số hữu tỉ là số viết được dưới dạng phân số a/b với a, b thuộc Z, b khác 0.',
      'Tập hợp các số hữu tỉ được ký hiệu là Q. Ta có N con Z con Q.',
      'Quy tắc chuyển vế: Khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta phải đổi dấu số hạng đó: x + a = b => x = b - a.'
    ],
    contentMarkdown: `### 1. Khái niệm số hữu tỉ
* Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}, b \\ne 0$.
* Tập hợp các số hữu tỉ được kí hiệu là $\\mathbb{Q}$.
* Ví dụ: Các số $3; -0,5; 0; 2 \\frac{1}{3}$ đều là các số hữu tỉ vì:
  $$3 = \\frac{3}{1}; \\quad -0,5 = \\frac{-1}{2}; \\quad 2 \\frac{1}{3} = \\frac{7}{3}$$

### 2. Các phép tính trong tập hợp số hữu tỉ
* Vì mỗi số hữu tỉ đều viết được dưới dạng phân số nên các phép tính cộng, trừ, nhân, chia số hữu tỉ được thực hiện tương tự như đối với phân số.
* **Quy tắc dấu ngoặc và chuyển vế**:
  $$x + y = z \\implies x = z - y$$`,
    sampleExercises: [
      {
        question: 'Tính giá trị biểu thức: B = (-2/3) + 3/4 - (-1/6)?',
        solution: 'Mẫu số chung là 12: B = -8/12 + 9/12 + 2/12 = (-8 + 9 + 2)/12 = 3/12 = 1/4.'
      }
    ]
  },
  {
    id: 'toan7-b2',
    title: 'Bài 2: Tỉ lệ thức và dãy tỉ số bằng nhau',
    subjectId: 'toan',
    grade: 7,
    semester: 2,
    chapter: 'Chương 6: Tỉ lệ thức',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Toán 7 Tập 2',
    pageReference: 'Trang 6 - 11',
    orderIndex: 2,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nắm vững định nghĩa và tính chất cơ bản của tỉ lệ thức a/b = c/d.',
      'Vận dụng thành thạo tính chất của dãy tỉ số bằng nhau để giải bài toán chia phần tỉ lệ.'
    ],
    summary: 'Tỉ lệ thức là đẳng thức của hai tỉ số. Tính chất tích ngoại tỉ bằng tích trung tỉ và tính chất dãy tỉ số bằng nhau.',
    keyPoints: [
      'a/b = c/d <=> a.d = b.c.',
      'Dãy tỉ số bằng nhau: a/b = c/d = (a+c)/(b+d) = (a-c)/(b-d).'
    ],
    contentMarkdown: `### 1. Tỉ lệ thức
* Tỉ lệ thức là đẳng thức của hai tỉ số: $\\frac{a}{b} = \\frac{c}{d}$ (hoặc $a:b = c:d$).
* **Tính chất**: Nếu $\\frac{a}{b} = \\frac{c}{d}$ thì $a \\cdot d = b \\cdot c$.

### 2. Tính chất của dãy tỉ số bằng nhau
$$\\frac{a}{b} = \\frac{c}{d} = \\frac{e}{f} = \\frac{a + c + e}{b + d + f} = \\frac{a - c + e}{b - d + f}$$`,
    sampleExercises: [
      {
        question: 'Tìm x và y biết x/3 = y/5 và x + y = 32?',
        solution: 'Áp dụng tính chất dãy tỉ số bằng nhau: x/3 = y/5 = (x+y)/(3+5) = 32/8 = 4. Suy ra x = 12, y = 20.'
      }
    ]
  },

  // --- TOÁN 8 ---
  {
    id: 'toan8-b1',
    title: 'Bài 1: Đơn thức và Đa thức nhiều biến',
    subjectId: 'toan',
    grade: 8,
    semester: 1,
    chapter: 'Chương 1: Đa thức',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Toán 8 Tập 1',
    pageReference: 'Trang 5 - 12',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết đơn thức, đa thức nhiều biến, phần hệ số và phần biến.',
      'Thu gọn đơn thức, xác định bậc của đơn thức và đa thức.',
      'Cộng và trừ các đơn thức đồng dạng.'
    ],
    summary: 'Khái niệm biểu thức đại số, đơn thức thu gọn, đa thức và các phép toán cộng trừ nhân đa thức nhiều biến.',
    keyPoints: [
      'Đơn thức là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến.',
      'Bậc của đơn thức có hệ số khác 0 là tổng số mũ của tất cả các biến có trong đơn thức đó.',
      'Đơn thức đồng dạng là hai đơn thức có hệ số khác 0 và có cùng phần biến.'
    ],
    contentMarkdown: `### 1. Đơn thức nhiều biến
* **Đơn thức** là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến.
* Ví dụ: $2xy^2; \\quad -\\frac{1}{3}x^3y; \\quad 5$ là các đơn thức.
* **Đơn thức thu gọn** là đơn thức chỉ gồm tích của một số với các biến, mà mỗi biến đã được nâng lên lũy thừa với số mũ nguyên dương.

### 2. Đa thức nhiều biến
* **Đa thức** là một tổng của những đơn thức. Mỗi đơn thức trong tổng gọi là một hạng tử của đa thức đó.
* **Bậc của đa thức** là bậc của hạng tử có bậc cao nhất trong dạng thu gọn của đa thức đó.`,
    sampleExercises: [
      {
        question: 'Thu gọn đa thức: P = 3x^2y - 2xy + 5x^2y + 4xy - 7?',
        solution: 'P = (3x^2y + 5x^2y) + (-2xy + 4xy) - 7 = 8x^2y + 2xy - 7.'
      }
    ]
  },
  {
    id: 'toan8-b2',
    title: 'Bài 2: Các hằng đẳng thức đáng nhớ',
    subjectId: 'toan',
    grade: 8,
    semester: 1,
    chapter: 'Chương 2: Hằng đẳng thức',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Toán 8 Tập 1',
    pageReference: 'Trang 18 - 25',
    orderIndex: 2,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Ghi nhớ và vận dụng thành thạo 7 hằng đẳng thức đáng nhớ.',
      'Phân tích đa thức thành nhân tử bằng hằng đẳng thức.'
    ],
    summary: 'Bình phương một tổng, bình phương một hiệu, hiệu hai bình phương và lập phương.',
    keyPoints: [
      '(A + B)^2 = A^2 + 2AB + B^2',
      '(A - B)^2 = A^2 - 2AB + B^2',
      'A^2 - B^2 = (A - B)(A + B)'
    ],
    contentMarkdown: `### 7 Hằng đẳng thức đáng nhớ
1. $(A + B)^2 = A^2 + 2AB + B^2$
2. $(A - B)^2 = A^2 - 2AB + B^2$
3. $A^2 - B^2 = (A - B)(A + B)$
4. $(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$
5. $(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3$
6. $A^3 + B^3 = (A + B)(A^2 - AB + B^2)$
7. $A^3 - B^3 = (A - B)(A^2 + AB + B^2)`,
    sampleExercises: [
      {
        question: 'Khai triển: (2x + 3)^2?',
        solution: '(2x + 3)^2 = 4x^2 + 12x + 9.'
      }
    ]
  },

  // --- TOÁN 9 ---
  {
    id: 'toan9-b1',
    title: 'Bài 1: Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn',
    subjectId: 'toan',
    grade: 9,
    semester: 1,
    chapter: 'Chương 1: Phương trình và hệ phương trình',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Toán 9 Tập 1',
    pageReference: 'Trang 5 - 14',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Hiểu khái niệm phương trình bậc nhất hai ẩn ax + by = c (a khác 0 hoặc b khác 0).',
      'Hiểu nghiệm và biểu diễn hình học tập nghiệm của phương trình bậc nhất hai ẩn.',
      'Giải hệ hai phương trình bậc nhất hai ẩn bằng phương pháp thế và phương pháp cộng đại số.'
    ],
    summary: 'Nghiên cứu hệ hai phương trình bậc nhất hai ẩn, quy tắc thế, quy tắc cộng đại số và ứng dụng giải bài toán bằng cách lập hệ phương trình.',
    keyPoints: [
      'Phương trình bậc nhất hai ẩn có dạng ax + by = c với a^2 + b^2 khác 0.',
      'Hệ phương trình bậc nhất hai ẩn gồm hai phương trình cùng chứa hai ẩn x và y.',
      'Phương pháp thế: Rút một ẩn từ một phương trình rồi thế vào phương trình còn lại.',
      'Phương pháp cộng đại số: Nhân các hệ số thích hợp để đưa về hai hệ số bằng nhau hoặc đối nhau rồi cộng hoặc trừ.'
    ],
    contentMarkdown: `### 1. Phương trình bậc nhất hai ẩn
* Phương trình bậc nhất hai ẩn $x$ và $y$ là hệ thức dạng:
  $$ax + by = c$$
  trong đó $a, b, c$ là các số đã biết ($a \\ne 0$ hoặc $b \\ne 0$).
* Trong mặt phẳng toạ độ $Oxy$, tập nghiệm của phương trình $ax + by = c$ được biểu diễn bởi đường thẳng $ax + by = c$.

### 2. Các phương pháp giải hệ phương trình
* **Phương pháp thế**:
  1. Từ một phương trình của hệ, biểu diễn một ẩn qua ẩn kia.
  2. Thế vào phương trình thứ hai để được phương trình bậc nhất một ẩn.
  3. Giải phương trình một ẩn rồi suy ra nghiệm còn lại.
* **Phương pháp cộng đại số**:
  1. Nhân hai vế mỗi phương trình với hệ số thích hợp (nếu cần) sao cho các hệ số của một ẩn bằng nhau hoặc đối nhau.
  2. Cộng hoặc trừ từng vế hai phương trình để triệt tiêu ẩn đó.`,
    sampleExercises: [
      {
        question: 'Giải hệ phương trình: { 2x + y = 5; x - y = 1 }?',
        solution: 'Cộng từng vế: 3x = 6 => x = 2. Thay x = 2 vào x - y = 1 ta được 2 - y = 1 => y = 1. Hệ có nghiệm duy nhất (2; 1).'
      }
    ]
  },
  {
    id: 'toan9-b2',
    title: 'Bài 2: Phương trình bậc hai một ẩn và Hệ thức Vi-ét',
    subjectId: 'toan',
    grade: 9,
    semester: 2,
    chapter: 'Chương 6: Hàm số và Phương trình bậc hai',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Toán 9 Tập 2',
    pageReference: 'Trang 10 - 20',
    orderIndex: 2,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nắm vững công thức nghiệm và công thức nghiệm thu gọn của phương trình ax^2 + bx + c = 0 (a khác 0).',
      'Vận dụng định lý Vi-ét tính tổng và tích các nghiệm: S = x1 + x2 = -b/a, P = x1.x2 = c/a.'
    ],
    summary: 'Công thức nghiệm tổng quát bằng biệt thức Delta và hệ thức Vi-ét kinh điển ứng dụng trong đề thi vào 10.',
    keyPoints: [
      'Delta = b^2 - 4ac. Nếu Delta > 0, phương trình có 2 nghiệm phân biệt; Delta = 0: nghiệm kép; Delta < 0: vô nghiệm.',
      'Định lý Vi-ét: x1 + x2 = -b/a; x1 . x2 = c/a.'
    ],
    contentMarkdown: `### Công thức nghiệm phương trình bậc hai
Phương trình $ax^2 + bx + c = 0$ ($a \\ne 0$):
$$\\Delta = b^2 - 4ac$$
* Nếu $\\Delta > 0$: phương trình có hai nghiệm phân biệt $x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$.
* Nếu $\\Delta = 0$: phương trình có nghiệm kép $x_1 = x_2 = -\\frac{b}{2a}$.
* Nếu $\\Delta < 0$: phương trình vô nghiệm.`,
    sampleExercises: [
      {
        question: 'Giải phương trình: x^2 - 5x + 6 = 0?',
        solution: 'Delta = (-5)^2 - 4.1.6 = 25 - 24 = 1 > 0. Nghiệm x1 = (5 + 1)/2 = 3; x2 = (5 - 1)/2 = 2.'
      }
    ]
  },

  // ==========================================================================
  // 2. MÔN NGỮ VĂN (LỚP 6, 7, 8, 9)
  // ==========================================================================
  // --- VĂN 6 ---
  {
    id: 'van6-b1',
    title: 'Bài 1: Khám phá truyện đồng thoại - Bài học đường đời đầu tiên (Trích Dế Mèn phiêu lưu kí)',
    subjectId: 'van',
    grade: 6,
    semester: 1,
    chapter: 'Bài 1: Tôi và các bạn',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Ngữ văn 6 Tập 1',
    pageReference: 'Trang 12 - 20',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết đặc điểm thể loại truyện đồng thoại: nhân vật loài vật được nhân hóa, sinh động và giàu tính giáo dục.',
      'Phân tích diễn biến tâm lý và hành động của nhân vật Dế Mèn từ kiêu căng xốc nổi đến ăn năn hối hận.',
      'Rút ra bài học nhân văn sâu sắc về lối ứng xử khiêm tốn, biết thương yêu và sẻ chia với mọi người.'
    ],
    summary: 'Tìm hiểu đoạn trích Bài học đường đời đầu tiên của nhà văn Tô Hoài, nghệ thuật miêu tả tâm lý và bài học về thói hung hăng, kiêu ngạo.',
    keyPoints: [
      'Tác giả: Tô Hoài (1920 - 2014), cây đại thụ của nền văn học thiếu nhi Việt Nam.',
      'Hình ảnh Dế Mèn: Chàng dế thanh niên cường tráng, đôi càng mẫm bóng, vuốt cứng quắt nhưng lại kiêu ngạo, coi thường người khác.',
      'Cái chết thương tâm của Dế Choắt: Hậu quả đau đớn từ trò đùa xốc nổi trêu chị Cốc của Dế Mèn.',
      'Bài học đường đời: Ở đời mà có thói hung hăng bậy bạ, có óc mà không biết nghĩ, sớm muộn rồi cũng mang vạ vào mình.'
    ],
    contentMarkdown: `### 1. Đọc - hiểu thể loại truyện đồng thoại
* **Truyện đồng thoại** là thể loại truyện viết cho thiếu nhi, trong đó loài vật được nhân cách hóa mang những đặc tính, cảm xúc, lời nói như con người, nhưng vẫn giữ được tập tính sinh học tự nhiên của loài vật đó.

### 2. Nhân vật Dế Mèn
* **Vẻ đẹp ngoại hình**: Đôi càng mẫm bóng, những cái vuốt ở chân ở khoeo cứ cứng dần và nhọn hoắt. Dế Mèn tự hào về vẻ cường tráng của mình.
* **Tâm lý - Tính cách**: Vì tự phụ nên sinh ra thói huênh hoang, khinh thường Dế Choắt ốm yếu, trêu chị Cốc dẫn đến cái chết oan uổng của Dế Choắt.
* **Sự thức tỉnh**: Đứng trước mộ Dế Choắt, Dế Mèn nhỏ giọt nước mắt ân hận muộn màng và khắc cốt ghi tâm bài học đường đời đầu tiên.`,
    sampleExercises: [
      {
        question: 'Qua đoạn trích, em hãy viết đoạn văn (5 - 7 câu) nêu cảm nhận về sự ân hận của Dế Mèn trước cái chết của Dế Choắt?',
        solution: 'Học sinh phân tích giọt nước mắt sám hối của Dế Mèn, thái độ đứng lặng trước nấm mồ Dế Choắt và sự trưởng thành trong nhận thức của Dế Mèn về lòng nhân ái.'
      }
    ]
  },
  // --- VĂN 7 ---
  {
    id: 'van7-b1',
    title: 'Bài 1: Bầu trời tuổi thơ - Trải nghiệm cùng thiên nhiên và con người Nam Bộ qua Đi lấy mật',
    subjectId: 'van',
    grade: 7,
    semester: 1,
    chapter: 'Bài 1: Bầu trời tuổi thơ',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Ngữ văn 7 Tập 1',
    pageReference: 'Trang 18 - 25',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Cảm nhận vẻ đẹp hoang sơ, trù phú của rừng tràm U Minh và nét tính cách hào sảng, phóng khoáng của con người phương Nam.',
      'Nhận biết ngôi kể thứ nhất và nghệ thuật miêu tả cảnh sắc thiên nhiên sống động của nhà văn Đoàn Giỏi.',
      'Mở rộng vốn từ ngữ địa phương Nam Bộ (tía, má, xuồng, tràm, ong mật).'
    ],
    summary: 'Đoạn trích Đi lấy mật (tiểu thuyết Đất rừng phương Nam) đưa học sinh theo chân chú bé An, tía nuôi và thằng Cò vào rừng U Minh khám phá nghề gác kèo ong độc đáo.',
    keyPoints: [
      'Tác giả Đoàn Giỏi: Cây bút xuất sắc viết về thiên nhiên và con người vùng đồng bằng sông Cửu Long.',
      'Cảnh rừng U Minh: Ánh nắng ban mai xuyên qua tán lá, bầy chim ríu rít, đàn ong mật vo ve như tiếng sáo diều.',
      'Con người Nam Bộ: Tía nuôi dũng cảm, từng trải; thằng Cò nhanh nhẹn, hoạt bát; bé An nhạy cảm, ham học hỏi.'
    ],
    contentMarkdown: `### 1. Bức tranh thiên nhiên rừng tràm U Minh
* Nhà văn Đoàn Giỏi đã sử dụng mọi giác quan để tái hiện cánh rừng tràm U Minh trong trẻo buổi sáng sớm:
  * **Thị giác**: Cây tràm ngát hương, tàng cây xanh biếc, muôn cánh ong bay rợp ánh nắng.
  * **Thính giác**: Tiếng chim líu lo, tiếng đàn ong rì rầm êm ái.
  * **Khứu giác**: Mùi hương hoa tràm ngai ngái, ngọt ngào lan tỏa khắp không gian.

### 2. Nét độc đáo của nghề gác kèo ong
* Kèo ong được làm từ thân cây tràm thẳng, đặt nghiêng theo hướng gió và ánh sáng mặt trời để dụ đàn ong rừng về làm tổ. Đây là tri thức dân gian truyền đời quý báu của người dân đất phương Nam.`,
    sampleExercises: [
      {
        question: 'Hãy chỉ ra 3 từ ngữ địa phương Nam Bộ xuất hiện trong văn bản và giải thích nghĩa chuẩn mực tương ứng?',
        solution: 'Tía (cha/bố), Má (mẹ), Xuồng (thuyền nhỏ chèo bằng dầm chèo).'
      }
    ]
  },
  // --- VĂN 8 ---
  {
    id: 'van8-b1',
    title: 'Bài 1: Câu chuyện của lịch sử - Tinh thần yêu nước qua Hịch tướng sĩ (Trần Quốc Tuấn)',
    subjectId: 'van',
    grade: 8,
    semester: 1,
    chapter: 'Bài 1: Câu chuyện của lịch sử',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Ngữ văn 8 Tập 1',
    pageReference: 'Trang 15 - 24',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nắm được đặc trưng thể hịch: văn nghị luận cổ, kết cấu chặt chẽ, giọng văn hào hùng mang tính kêu gọi, khích lệ.',
      'Cảm nhận lòng căm thù giặc sâu sắc và tấm lòng vì nước vì dân của vị tiết chế Trần Quốc Tuấn.',
      'Phân tích nghệ thuật đối lập, liệt kê và sử dụng từ ngữ biểu cảm mạnh mẽ.'
    ],
    summary: 'Áng thiên cổ hùng văn khích lệ tinh thần chiến đấu, lòng trung quân ái quốc của tướng sĩ nhà Trần trước cuộc kháng chiến chống quân Nguyên - Mông lần thứ hai.',
    keyPoints: [
      'Hoàn cảnh ra đời: Viết vào khoảng trước cuộc kháng chiến chống Mông - Nguyên lần thứ hai (năm 1285).',
      'Tấm lòng Trần Quốc Tuấn: "Ta thường tới bữa quên ăn, nửa đêm vỗ gối; ruột đau như cắt, nước mắt đầm đìa; chỉ căm tức chưa xả thịt lột da, nuốt gan uống máu quân thù...".',
      'Phê phán thói bàng quan: Chỉ trích các tướng sĩ ham mê cờ bạc, săn bắn, chăm lo vợ con mà lơ là việc quân.'
    ],
    contentMarkdown: `### 1. Lòng căm thù giặc và ý chí xả thân cứu nước
* Tác giả Trần Quốc Tuấn bộc lộ tâm can cháy bỏng của một vị thống soái:
  * Nỗi đau xót trước tội ác ngông cuồng của sứ giặc.
  * Ý chí sẵn sàng hy sinh thân mình: "Dẫu cho trăm thân này phơi ngoài nội cỏ, nghìn xác này gói trong da ngựa, ta cũng vui lòng".

### 2. Lời hiệu triệu tướng sĩ học tập Binh thư yếu lược
* Bằng lập luận đanh thép và tình cảm chân thành, bài Hịch đã thức tỉnh danh dự, tinh thần trách nhiệm của các tướng sĩ, tạo nên sức mạnh đại đoàn kết làm nên hào khí Đông A bất diệt.`,
    sampleExercises: [
      {
        question: 'Phân tích nghệ thuật sử dụng câu văn biền ngẫu trong đoạn văn tả nỗi lòng của Trần Quốc Tuấn?',
        solution: 'Các vế câu đối nhau nhịp nhàng: tới bữa quên ăn / nửa đêm vỗ gối; ruột đau như cắt / nước mắt đầm đìa; tạo nên nhịp điệu dồn dập, khắc họa sinh động tâm trạng bi tráng của vị chủ tướng.'
      }
    ]
  },
  // --- VĂN 9 ---
  {
    id: 'van9-b1',
    title: 'Bài 1: Trái tim người lính - Vẻ đẹp người lính thời chống Pháp qua bài thơ Đồng chí (Chính Hữu)',
    subjectId: 'van',
    grade: 9,
    semester: 1,
    chapter: 'Bài 1: Trái tim người lính',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Ngữ văn 9 Tập 1',
    pageReference: 'Trang 10 - 18',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Cảm nhận cơ sở hình thành và vẻ đẹp bình dị, cao cả của tình đồng chí giữa những người lính nông dân trong kháng chiến chống Pháp.',
      'Phân tích hình ảnh thơ mộc mạc, cô đọng mang đậm chất hiện thực và lãng mạn cách mạng (Đầu súng trăng treo).',
      'Nắm vững mạch cảm xúc và cấu tứ độc đáo của bài thơ.'
    ],
    summary: 'Khám phá bài thơ Đồng chí của Chính Hữu, tác phẩm tiêu biểu của thơ ca kháng chiến chống Pháp viết về tình bạn chiến đấu thiêng liêng.',
    keyPoints: [
      'Cơ sở của tình đồng chí: Chung hoàn cảnh xuất thân nghèo khó ("quê hương anh nước mặn đồng chua / làng tôi nghèo đất cày lên sỏi đá"), chung lý tưởng cứu nước, chung gian lao chiến hào.',
      'Câu thơ bản lề: "Đồng chí!" - câu thơ chỉ có hai tiếng, như một nốt nhấn rung động toàn bài.',
      'Biểu tượng lãng mạn cuối bài: "Đêm nay rừng hoang sương muối / Đứng cạnh bên nhau chờ giặc tới / Đầu súng trăng treo".'
    ],
    contentMarkdown: `### 1. Cơ sở hình thành tình đồng chí
* **Sự tương đồng về cảnh ngộ**: Những người lính từ các miền quê nghèo khó hội tụ về chiến khu Việt Bắc.
* **Sự gắn kết trong gian lao**: "Súng bên súng, đầu sát bên đầu / Đêm rét chung chăn thành đôi tri kỉ".

### 2. Hình tượng Đầu súng trăng treo
* Câu thơ khép lại bài thơ là một phát hiện nghệ thuật độc đáo:
  * **Súng**: Biểu tượng cho hiện thực khốc liệt, ý chí chiến đấu bảo vệ nền độc lập.
  * **Trăng**: Biểu tượng cho hòa bình, vẻ đẹp thiên nhiên thanh bình và chất thơ lãng mạn.
  * Sự kết hợp hài hòa giữa chiến sĩ và thi sĩ trong tâm hồn người lính Cụ Hồ.`,
    sampleExercises: [
      {
        question: 'Tại sao câu thơ "Đồng chí!" lại được đặt riêng thành một dòng thơ độc lập giữa bài?',
        solution: 'Câu thơ như một bản lề khép lại đoạn thơ nói về cội nguồn của tình đồng chí và mở ra những biểu hiện cao đẹp, gắn bó keo sơn của tình cảm thiêng liêng ấy.'
      }
    ]
  },

  // ==========================================================================
  // 3. MÔN TIẾNG ANH (LỚP 6, 7, 8, 9 - GLOBAL SUCCESS)
  // ==========================================================================
  // --- TIẾNG ANH 6 ---
  {
    id: 'tienganh6-u1',
    title: 'Unit 1: My New School - Getting Started & A Closer Look 1',
    subjectId: 'tieng-anh',
    grade: 6,
    semester: 1,
    chapter: 'Unit 1: My New School',
    bookSeries: 'Global Success',
    bookTitle: 'SGK Tiếng Anh 6 Tập 1',
    pageReference: 'Page 6 - 11',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Identify school items and school activities: school bag, compass, calculator, uniform, do homework, play football.',
      'Pronounce the sounds /ɑː/ (as in smart, star) and /ʌ/ (as in sun, lunch) correctly.',
      'Use the Present Simple tense with regular verbs and adverbs of frequency (always, usually, sometimes, never).'
    ],
    summary: 'Introduce new vocabulary about school subjects, facilities and equipment, present simple tense rules and pronunciation practice.',
    keyPoints: [
      'Vocabulary: pencil sharpener, textbook, rubber, uniform, classmate, smart boarding school.',
      'Grammar: Present simple tense: S + V(s/es) + O. Wh-questions: What subjects do you like? Where is your classroom?',
      'Pronunciation: Distinguish long vowel /ɑː/ (large, smart) from short vowel /ʌ/ (study, subject).'
    ],
    contentMarkdown: `### 1. Vocabulary: School Things & Subjects
* **calculator** (n): máy tính cầm tay
* **compass** (n): com-pa
* **pencil sharpener** (n): gọt bút chì
* **uniform** (n): đồng phục học sinh
* **do homework** (v phr): làm bài tập về nhà
* **have lunch** (v phr): ăn trưa tại trường

### 2. Grammar: Present Simple Tense
* **Affirmative**:
  * I / You / We / They + V (bare)
  * He / She / It + V-s / V-es
* **Example**:
  * *Phong wears his new uniform on Mondays.*
  * *We do our homework every afternoon.*

### 3. Pronunciation: /ɑː/ and /ʌ/
* **/ɑː/**: smart, star, art, sharpener
* **/ʌ/**: lunch, subject, study, Sunday`,
    sampleExercises: [
      {
        question: 'Choose the correct form: Minh (play / plays) badminton with his classmates every weekend?',
        solution: 'plays (Because the subject "Minh" is 3rd person singular).'
      }
    ]
  },
  // --- TIẾNG ANH 7 ---
  {
    id: 'tienganh7-u1',
    title: 'Unit 1: Hobbies - Expressing Likes and Dislikes & Present Simple',
    subjectId: 'tieng-anh',
    grade: 7,
    semester: 1,
    chapter: 'Unit 1: Hobbies',
    bookSeries: 'Global Success',
    bookTitle: 'SGK Tiếng Anh 7 Tập 1',
    pageReference: 'Page 8 - 14',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Talk about personal hobbies: gardening, making models, collecting coins, horse riding.',
      'Use verbs of liking and disliking followed by Gerunds: like, love, enjoy, hate, prefer + V-ing.',
      'Pronounce sounds /ə/ and /ɜː/ correctly in sentences.'
    ],
    summary: 'Vocabulary related to hobbies, verbs of preference followed by V-ing and pronunciation of /ə/ and /ɜː/.',
    keyPoints: [
      'Vocabulary: coin, teddy bear, gardening, origami, outdoor activities.',
      'Verbs of liking: like / love / enjoy / adore + V-ing.',
      'Pronunciation: /ə/ (about, dancer) vs /ɜː/ (bird, girl, nurse).'
    ],
    contentMarkdown: `### 1. Vocabulary: Hobbies
* **collecting stamps / coins**: sưu tầm tem / đồng xu
* **making origami**: gấp giấy nghệ thuật Nhật Bản
* **horse-riding**: cưỡi ngựa
* **gardening**: làm vườn trồng rau, hoa

### 2. Grammar: Verbs of liking + V-ing
* Structure: $S + \\text{like / love / enjoy / hate} + V\\text{-ing}$
* *My brother loves building miniature dollhouses.*
* *I hate doing chores on Sunday mornings.*`,
    sampleExercises: [
      {
        question: 'Complete the sentence: Nam enjoys (read) _______ comic books in his free time.',
        solution: 'reading (Enjoy is followed by a gerund V-ing).'
      }
    ]
  },
  // --- TIẾNG ANH 8 ---
  {
    id: 'tienganh8-u1',
    title: 'Unit 1: Leisure Time - Free Time Activities & Comparatives of Adverbs',
    subjectId: 'tieng-anh',
    grade: 8,
    semester: 1,
    chapter: 'Unit 1: Leisure Time',
    bookSeries: 'Global Success',
    bookTitle: 'SGK Tiếng Anh 8 Tập 1',
    pageReference: 'Page 8 - 15',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Use vocabulary about leisure activities: DIY, hanging out, doing puzzles, messaging friends.',
      'Understand and form comparative of adverbs (more quickly, harder, better, faster than).',
      'Distinguish diphthongs /ʊə/ and /ɔɪ/.'
    ],
    summary: 'Explore leisure activities of teenagers, DIY projects, comparative forms of adverbs and communicative speaking skills.',
    keyPoints: [
      'Vocabulary: DIY (Do It Yourself), surfing the net, origami, puzzle, craze.',
      'Comparative of short adverbs: adv + -er + than (faster than, earlier than).',
      'Comparative of long adverbs: more + adv + than (more gracefully than, more carefully than).'
    ],
    contentMarkdown: `### 1. Vocabulary: Leisure Time
* **do DIY projects**: tự tay làm các món đồ handmade
* **surf the internet**: lướt mạng internet
* **hang out with friends**: đi chơi la cà với bạn bè
* **be hooked on sth**: say mê, ghiền một thú vui nào đó

### 2. Grammar: Comparative of Adverbs
* Short adverbs: *He runs faster than me.*
* Long adverbs: *Mai dances more gracefully than Lan.*
* Irregular forms: *well -> better; badly -> worse; fast -> faster; hard -> harder.*`,
    sampleExercises: [
      {
        question: 'Supply the correct form: She speaks English (fluent) _______ than her brother.',
        solution: 'more fluently (Fluently is a 3-syllable adverb).'
      }
    ]
  },
  // --- TIẾNG ANH 9 ---
  {
    id: 'tienganh9-u1',
    title: 'Unit 1: Local Community - Community Helpers & Phrasal Verbs',
    subjectId: 'tieng-anh',
    grade: 9,
    semester: 1,
    chapter: 'Unit 1: Local Community',
    bookSeries: 'Global Success',
    bookTitle: 'SGK Tiếng Anh 9 Tập 1',
    pageReference: 'Page 8 - 16',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Describe local community helpers: garbage collector, artisan, electrician, police officer.',
      'Master common phrasal verbs: pass down, get on with, look around, close down, come back.',
      'Discuss traditional handicrafts and local specialties in Vietnamese villages.'
    ],
    summary: 'Focus on community life, artisanal craft villages, and essential phrasal verbs for the High School Entrance Examination.',
    keyPoints: [
      'Vocabulary: pottery village, artisan, handicraft, communal house, specialty.',
      'Phrasal verbs: pass down (truyền lại), look forward to (mong chờ), deal with (giải quyết), cut down on (cắt giảm).',
      'Complex sentences: Dependent clauses of purpose (in order that, so that) and concession (although, even though).'
    ],
    contentMarkdown: `### 1. Vocabulary: Community & Handicrafts
* **artisan** (n): nghệ nhân thủ công
* **handicraft** (n): sản phẩm thủ công mỹ nghệ
* **pass down** (phr v): lưu truyền từ thế hệ này sang thế hệ khác
* **live on** (phr v): sống dựa vào nghề gì

### 2. Essential Phrasal Verbs for Grade 9
* *get on with someone*: hòa thuận với ai
* *set up a workshop*: thành lập một xưởng sản xuất
* *face up to the problem*: đối mặt với vấn đề nan giải`,
    sampleExercises: [
      {
        question: 'Fill in the blank with a phrasal verb: Traditional knitting skills have been (passed / look) _______ down through five generations in this village.',
        solution: 'passed down (Lưu truyền từ đời này sang đời khác).'
      }
    ]
  },

  // ==========================================================================
  // 4. MÔN KHOA HỌC TỰ NHIÊN (LỚP 6, 7, 8, 9)
  // ==========================================================================
  // --- KHTN 6 ---
  {
    id: 'khtn6-b1',
    title: 'Bài 1: Giới thiệu về Khoa học tự nhiên và An toàn phòng thực hành',
    subjectId: 'khtn',
    grade: 6,
    semester: 1,
    chapter: 'Mở đầu KHTN',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK KHTN 6',
    pageReference: 'Trang 6 - 14',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nêu được khái niệm khoa học tự nhiên và vai trò của KHTN trong đời sống và sản xuất.',
      'Phân biệt được các lĩnh vực chủ yếu của KHTN: Vật lí, Hóa học, Sinh học, Thiên văn học, Khoa học Trái Đất.',
      'Thực hiện đúng các quy định an toàn và nhận biết các biển cảnh báo trong phòng thực hành.'
    ],
    summary: 'Giới thiệu môn học KHTN, các đối tượng nghiên cứu của tự nhiên và quy tắc an toàn thí nghiệm bắt buộc.',
    keyPoints: [
      'KHTN nghiên cứu các hiện tượng tự nhiên, tìm ra các quy luật chi phối sự vận động và phát triển của thế giới tự nhiên.',
      'Các biển báo an toàn: Chất độc hại, chất ăn mòn, chất dễ cháy nổ, điện áp cao nguy hiểm.',
      'Sử dụng an toàn đèn cồn, ống nghiệm, nhiệt kế thủy ngân và bình tam giác.'
    ],
    contentMarkdown: `### 1. Khái niệm và vai trò của Khoa học tự nhiên
* Khoa học tự nhiên là ngành khoa học nghiên cứu về các hiện tượng, quy luật tự nhiên, các biến đổi của các chất trong tự nhiên và ứng dụng vào đời sống.
* **Vai trò**:
  1. Cung cấp tri thức khoa học giúp con người mở rộng tầm nhìn về vũ trụ và sinh quyển.
  2. Ứng dụng công nghệ nâng cao năng suất trồng trọt, chăn nuôi và bảo vệ sức khỏe con người.

### 2. Quy tắc an toàn phòng thực hành
1. Không ăn uống hoặc nô đùa trong phòng thí nghiệm.
2. Đeo kính bảo hộ, găng tay khi tiếp xúc với hóa chất axit, bazo đặc.
3. Tắt đèn cồn bằng cách chụp nắp đậy, tuyệt đối không dùng miệng thổi.`,
    sampleExercises: [
      {
        question: 'Tại sao khi tắt đèn cồn ta không được dùng miệng để thổi?',
        solution: 'Vì khi thổi miệng, luồng gió có thể đưa ngọn lửa lọt vào bên trong bầu cồn gây cháy nổ nguy hiểm. Phải dùng nắp chụp kín để dập tắt lửa do thiếu oxy.'
      }
    ]
  },
  // --- KHTN 7 ---
  {
    id: 'khtn7-b1',
    title: 'Bài 1: Nguyên tử - Nguyên tố hóa học và Bảng tuần hoàn',
    subjectId: 'khtn',
    grade: 7,
    semester: 1,
    chapter: 'Chất và sự biến đổi của chất',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK KHTN 7',
    pageReference: 'Trang 10 - 22',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Trình bày mô hình nguyên tử Rutherford - Bohr: Hạt nhân mang điện tích dương và lớp vỏ electron mang điện tích âm.',
      'Nêu khái niệm nguyên tố hóa học, ký hiệu hóa học và nguyên tử khối.',
      'Hiểu cấu trúc cơ bản của Bảng tuần hoàn các nguyên tố hóa học (ô nguyên tố, chu kì, nhóm).'
    ],
    summary: 'Cấu tạo hạt nhân nguyên tử (proton, neutron) và vỏ electron, nguyên tố hóa học và cấu trúc bảng tuần hoàn Менделеев.',
    keyPoints: [
      'Nguyên tử gồm hạt nhân (proton mang điện +, neutron không mang điện) và vỏ nguyên tử chứa electron mang điện -.',
      'Trong nguyên tử trung hòa về điện: Số proton = Số electron.',
      'Bảng tuần hoàn gồm 118 nguyên tố, sắp xếp theo chiều tăng dần của điện tích hạt nhân, gồm 7 chu kì và 8 nhóm A.'
    ],
    contentMarkdown: `### 1. Cấu tạo nguyên tử
* **Hạt nhân**: Nằm ở trung tâm nguyên tử, gồm các hạt:
  * **Proton ($p$)**: Mang điện tích dương ($+1$).
  * **Neutron ($n$)**: Không mang điện tích.
* **Vỏ nguyên tử**: Gồm các **electron ($e$)** mang điện tích âm ($-1$) chuyển động rất nhanh xung quanh hạt nhân.
* Nguyên tử luôn **trung hòa về điện**: $\\text{Số } p = \\text{Số } e$.

### 2. Bảng tuần hoàn các nguyên tố hoá học
* Nguyên tắc sắp xếp: Theo chiều tăng dần của điện tích hạt nhân nguyên tử.
* **Ô nguyên tố**: Cho biết số hiệu nguyên tử, kí hiệu hoá học, tên nguyên tố và nguyên tử khối.
* **Chu kì**: Dãy các nguyên tố có cùng số lớp electron trong nguyên tử.
* **Nhóm**: Tập hợp các nguyên tố có tính chất hoá học tương tự nhau.`,
    sampleExercises: [
      {
        question: 'Một nguyên tử có 11 proton. Hãy cho biết số electron của nguyên tử đó và tra cứu tên nguyên tố?',
        solution: 'Vì nguyên tử trung hòa về điện nên số electron = số proton = 11. Tra bảng tuần hoàn, nguyên tố số 11 là Natri (Sodium), ký hiệu Na.'
      }
    ]
  },
  // --- KHTN 8 ---
  {
    id: 'khtn8-b1',
    title: 'Bài 1: Phản ứng hoá học và Định luật bảo toàn khối lượng',
    subjectId: 'khtn',
    grade: 8,
    semester: 1,
    chapter: 'Chương 1: Phản ứng hoá học',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK KHTN 8',
    pageReference: 'Trang 8 - 18',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Phát biểu nội dung định luật bảo toàn khối lượng Lômônôxốp - Lavoadie.',
      'Lập phương trình hóa học bằng cách cân bằng số nguyên tử của mỗi nguyên tố ở hai vế.',
      'Tính khối lượng một chất khi biết khối lượng các chất còn lại tham gia và tạo thành.'
    ],
    summary: 'Bản chất của phản ứng hóa học (sự bẻ gãy liên kết cũ và hình thành liên kết mới), định luật bảo toàn khối lượng và phương pháp cân bằng phản ứng hóa học.',
    keyPoints: [
      'Trong một phản ứng hóa học: Tổng khối lượng các chất tham gia bằng tổng khối lượng các chất sản phẩm tạo thành.',
      'Công thức khối lượng: mA + mB = mC + mD.',
      'Các bước lập PTHH: Viết sơ đồ phản ứng -> Cân bằng số nguyên tử mỗi nguyên tố -> Viết phương trình hóa học hoàn chỉnh.'
    ],
    contentMarkdown: `### 1. Định luật bảo toàn khối lượng
* "Trong một phản ứng hoá học, tổng khối lượng của các chất sản phẩm bằng tổng khối lượng của các chất phản ứng."
* Cho phản ứng: $A + B \\rightarrow C + D$
  $$m_A + m_B = m_C + m_D$$

### 2. Lập phương trình hoá học
* Ví dụ đốt cháy khí hiđro trong oxi tạo thành nước:
  $$2\\mathrm{H_2} + \\mathrm{O_2} \\xrightarrow{t^o} 2\\mathrm{H_2O}$$
* Tỉ lệ số phân tử: 2 phân tử $\\mathrm{H_2}$ tác dụng với 1 phân tử $\\mathrm{O_2}$ tạo ra 2 phân tử $\\mathrm{H_2O}$.`,
    sampleExercises: [
      {
        question: 'Đốt cháy hoàn toàn 6g carbon (C) trong khí oxygen thu được 22g khí carbon dioxide (CO2). Tính khối lượng oxygen đã tham gia phản ứng?',
        solution: 'Áp dụng ĐLBTKL: m_C + m_O2 = m_CO2 => m_O2 = 22 - 6 = 16g.'
      }
    ]
  },
  // --- KHTN 9 ---
  {
    id: 'khtn9-b1',
    title: 'Bài 1: Động năng và Thế năng - Cơ năng và Bảo toàn cơ năng',
    subjectId: 'khtn',
    grade: 9,
    semester: 1,
    chapter: 'Chương 1: Năng lượng cơ học',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK KHTN 9',
    pageReference: 'Trang 6 - 15',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nắm vững khái niệm động năng: Năng lượng do vật chuyển động mà có (Wđ = 1/2 m.v^2).',
      'Nắm khái niệm thế năng trọng trường: Năng lượng của vật phụ thuộc vào độ cao so với mặt đất (Wt = m.g.h).',
      'Phát biểu định luật bảo toàn cơ năng trong trường hợp chỉ chịu tác dụng của trọng lực.'
    ],
    summary: 'Động năng, thế năng hấp dẫn, sự chuyển hóa qua lại giữa động năng và thế năng và định luật bảo toàn cơ năng trong cơ học.',
    keyPoints: [
      'Động năng Wđ phụ thuộc vào khối lượng m và vận tốc v của vật: Wđ = 1/2 . m . v^2.',
      'Thế năng trọng trường Wt phụ thuộc vào khối lượng và độ cao h so với mốc thế năng: Wt = P . h = m . g . h.',
      'Cơ năng W = Wđ + Wt. Khi bỏ qua sức cản của không khí, cơ năng của một vật được bảo toàn.'
    ],
    contentMarkdown: `### 1. Động năng và Thế năng
* **Động năng ($W_đ$)**: Dạng năng lượng mà một vật có được do nó đang chuyển động:
  $$W_đ = \\frac{1}{2} m v^2$$
* **Thế năng trọng trường ($W_t$)**: Dạng năng lượng dự trữ khi một vật được đưa lên độ cao $h$ so với mặt đất:
  $$W_t = m \\cdot g \\cdot h$$

### 2. Định luật bảo toàn cơ năng
* Tổng động năng và thế năng của vật gọi là **cơ năng**:
  $$W = W_đ + W_t = \\text{hằng số}$$
* Khi một vật rơi tự do: Thế năng giảm dần và chuyển hóa hoàn toàn thành động năng khi chạm đất.`,
    sampleExercises: [
      {
        question: 'Một quả bóng khối lượng 0.5kg rơi từ độ cao 10m xuống đất (lấy g = 10m/s^2). Tính thế năng ban đầu của quả bóng?',
        solution: 'Wt = m . g . h = 0.5 . 10 . 10 = 50 Jun (J).'
      }
    ]
  },

  // ==========================================================================
  // 5. MÔN LỊCH SỬ VÀ ĐỊA LÍ (LỚP 6, 7, 8, 9)
  // ==========================================================================
  {
    id: 'lsdl6-b1',
    title: 'Bài 1: Nguồn gốc loài người và Xã hội nguyên thủy',
    subjectId: 'lich-su-dia-ly',
    grade: 6,
    semester: 1,
    chapter: 'Lịch sử thế giới cổ đại',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Lịch sử và Địa lí 6',
    pageReference: 'Trang 10 - 18',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Mô tả quá trình tiến hóa từ Vượn người thành Người tối cổ và Người tinh khôn.',
      'Xác định những dấu tích của người tối cổ trên lãnh thổ Việt Nam (hang Thẩm Khuyên, Thẩm Hai, Núi Đọ, An Khê).',
      'Hiểu đời sống vật chất và tổ chức xã hội thời nguyên thủy: bầy người nguyên thủy sang thị tộc, bộ lạc.'
    ],
    summary: 'Nghiên cứu quá trình tiến hóa của loài người qua hàng triệu năm, lao động chế tác công cụ đá và sự tan rã của xã hội nguyên thủy.',
    keyPoints: [
      'Vượn cổ (khoảng 5 - 6 triệu năm trước) -> Người tối cổ (khoảng 4 triệu năm trước) -> Người tinh khôn (khoảng 15 vạn năm trước).',
      'Phát minh ra lửa là bước nhảy vọt quan trọng giúp con người sưởi ấm, nấu chín thức ăn và xua đuổi thú dữ.',
      'Dấu tích Người tối cổ ở Việt Nam: Răng người vượn tại Lạng Sơn, công cụ đá ghè đẽo thô sơ tại Thanh Hóa, Gia Lai.'
    ],
    contentMarkdown: `### 1. Quá trình tiến hóa của loài người
* Quá trình tiến hóa trải qua 3 giai đoạn chính:
  1. **Vượn người**: Xuất hiện khoảng 5 - 6 triệu năm trước ở Đông Phi.
  2. **Người tối cổ**: Đã hoàn toàn đi bằng hai chân, đôi tay được giải phóng để cầm nắm công cụ ghè đẽo.
  3. **Người tinh khôn**: Hình dáng cấu tạo cơ thể cơ bản giống như người ngày nay, thể tích não lớn (1400 cm³).

### 2. Tổ chức xã hội bầy người nguyên thủy
* Sống thành từng bầy vài chục người, nương tựa vào nhau để săn bắt thú rừng và hái lượm hoa quả.`,
    sampleExercises: [
      {
        question: 'Lao động có vai trò quan trọng như thế nào trong quá trình chuyển biến từ vượn thành người?',
        solution: 'Lao động giúp giải phóng hai tay, hoàn thiện các khớp ngón tay linh hoạt, kích thích não bộ phát triển và tạo ra ngôn ngữ giao tiếp xã hội.'
      }
    ]
  },
  {
    id: 'lsdl7-b1',
    title: 'Bài 1: Sự hình thành chế độ phong kiến ở Tây Âu và Các cuộc phát kiến địa lí',
    subjectId: 'lich-su-dia-ly',
    grade: 7,
    semester: 1,
    chapter: 'Tây Âu thời Trung đại',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Lịch sử và Địa lí 7',
    pageReference: 'Trang 8 - 17',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nắm được quá trình hình thành xã hội phong kiến Tây Âu với hai giai cấp cơ bản: Lãnh chúa phong kiến và Nông nô.',
      'Mô tả đặc điểm kinh tế lãnh địa phong kiến khép kín tự cấp tự túc.',
      'Trình bày nguyên nhân và các cuộc phát kiến địa lí lớn thế giới của Colombo, Magienlan.'
    ],
    summary: 'Sự sụp đổ của đế chế La Mã cổ đại, sự ra đời của các vương quốc phong kiến Tây Âu và hải trình phát kiến địa lí vĩ đại thế kỷ XV - XVI.',
    keyPoints: [
      'Xã hội phong kiến Tây Âu hình thành từ thế kỷ V sau khi người Giéc-man tràn vào xâm chiếm đế quốc La Mã.',
      'Kinh tế lãnh địa: Pháo đài kiên cố bao quanh bởi hào sâu, kinh tế tự cung tự cấp độc lập.',
      'Phát kiến địa lí: Colombo tìm ra châu Mỹ (1492), Magienlan chỉ huy đoàn tàu đi vòng quanh thế giới (1519 - 1522).'
    ],
    contentMarkdown: `### 1. Sự hình thành chế độ phong kiến Tây Âu
* Người Giéc-man chiếm đất của quý tộc La Mã chia cho các tướng lĩnh, phong tước vị, từ đó hình thành hai giai cấp mới:
  * **Lãnh chúa phong kiến**: Giàu có, nắm giữ ruộng đất và binh lính.
  * **Nông nô**: Phải phụ thuộc và nộp tô thuế nặng nề cho lãnh chúa.

### 2. Ý nghĩa các cuộc phát kiến địa lí
* Mở ra những con đường hàng hải thương mại mới kết nối châu Âu với châu Á, châu Mỹ, thúc đẩy sự ra đời của chủ nghĩa tư bản.`,
    sampleExercises: [
      {
        question: 'Ai là nhà thám hiểm đầu tiên đã chỉ huy hạm đội thực hiện chuyến hành trình đi vòng quanh Trái Đất bằng đường biển?',
        solution: 'Ferdinand Magellan (Phéc-năng Ma-gien-lan).'
      }
    ]
  },
  {
    id: 'lsdl8-b1',
    title: 'Bài 1: Cách mạng tư sản Anh và Chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mỹ',
    subjectId: 'lich-su-dia-ly',
    grade: 8,
    semester: 1,
    chapter: 'Lịch sử thế giới cận đại',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Lịch sử và Địa lí 8',
    pageReference: 'Trang 10 - 20',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nêu nguyên nhân, diễn biến chính và ý nghĩa lịch sử của Cách mạng tư sản Anh thế kỷ XVII.',
      'Phân tích bản Tuyên ngôn Độc lập năm 1776 của Hợp chúng quốc Hoa Kỳ.',
      'Nhận thức tính chất tiến bộ của các cuộc cách mạng tư sản thời cận đại.'
    ],
    summary: 'Thời kỳ bùng nổ các cuộc cách mạng tư sản mở đường cho chủ nghĩa tư bản phát triển tại Tây Âu và Bắc Mỹ.',
    keyPoints: [
      'CMTS Anh (1642 - 1689): Lật đổ chế độ phong kiến chuyên chế chuyên quyền, thiết lập nền quân chủ lập hiến.',
      'Chiến tranh giành độc lập Bắc Mỹ: 13 thuộc địa dưới sự lãnh đạo của George Washington đánh bại quân đội thực dân Anh.',
      'Tuyên ngôn Độc lập 1776 khẳng định mọi người sinh ra đều có quyền bình đẳng, quyền sống, quyền tự do và quyền mưu cầu hạnh phúc.'
    ],
    contentMarkdown: `### 1. Ý nghĩa lịch sử Cách mạng tư sản Anh
* Đánh đổ chế độ phong kiến chuyên chế, xác lập quyền lực của giai cấp tư sản và tầng lớp quý tộc mới qua chế độ Quân chủ lập hiến.

### 2. Sự ra đời của Hợp chúng quốc Hoa Kỳ
* Đại hội đại biểu 13 bang thuộc địa thông qua bản Tuyên ngôn Độc lập do Thomas Jefferson soạn thảo, mở ra kỷ nguyên độc lập tự do cho Hợp chúng quốc Hoa Kỳ.`,
    sampleExercises: [
      {
        question: 'Bản Tuyên ngôn Độc lập của nước Mỹ được công bố vào ngày tháng năm nào?',
        solution: 'Ngày 4 tháng 7 năm 1776 (Ngày Quốc khánh của nước Mỹ).'
      }
    ]
  },
  {
    id: 'lsdl9-b1',
    title: 'Bài 1: Trật tự thế giới hai cực Ianta và Phong trào giải phóng dân tộc Á - Phi - Mỹ Latinh',
    subjectId: 'lich-su-dia-ly',
    grade: 9,
    semester: 1,
    chapter: 'Lịch sử thế giới hiện đại sau 1945',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Lịch sử và Địa lí 9',
    pageReference: 'Trang 6 - 16',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Trình bày hoàn cảnh triệu tập, các quyết định quan trọng của Hội nghị Ianta (2/1945).',
      'Hiểu rõ sự hình thành trật tự hai cực Ianta do Liên Xô và Mỹ đứng đầu và Chiến tranh Lạnh.',
      'Khái quát làn sóng đấu tranh giải phóng dân tộc ở châu Á, châu Phi và khu vực Mỹ Latinh.'
    ],
    summary: 'Cục diện thế giới sau Chiến tranh thế giới thứ hai, sự phân chia khu vực ảnh hưởng và sự sụp đổ của hệ thống thuộc địa chủ nghĩa thực dân.',
    keyPoints: [
      'Hội nghị Ianta (2/1945): Ba cường quốc Liên Xô (Xtalin), Mỹ (Ru-dơ-ven), Anh (Sớc-sin) thỏa thuận việc phân chia khu vực chiếm đóng và thành lập Liên Hợp Quốc.',
      'Năm 1960: "Năm châu Phi" với 17 quốc gia ở lục địa đen tuyên bố giành được độc lập.',
      'Thắng lợi của Cách mạng Cuba (1/1/1959) do Fidel Castro lãnh đạo giương cao ngọn cờ tự do ở Tây bán cầu.'
    ],
    contentMarkdown: `### 1. Hội nghị Ianta và trật tự thế giới hai cực
* Tháng 2/1945, nguyên thủ ba cường quốc họp tại thành phố Ianta (Liên Xô):
  * Tiêu diệt tận gốc chủ nghĩa phát xít Đức và chủ nghĩa quân phiệt Nhật.
  * Thỏa thuận việc đóng quân nhằm giải giáp quân đội phát xít và phân chia khu vực ảnh hưởng tại châu Âu và châu Á.
  * Thành lập tổ chức **Liên Hợp Quốc** nhằm duy trì hòa bình và an ninh quốc tế.

### 2. Sự tan rã của hệ thống thuộc địa thực dân
* Phong trào đấu tranh giành độc lập bùng nổ mạnh mẽ đưa các dân tộc Á, Phi, Mỹ Latinh bước vào kỷ nguyên độc lập tự chủ.`,
    sampleExercises: [
      {
        question: 'Tại sao năm 1960 lại được lịch sử gọi là "Năm châu Phi"?',
        solution: 'Vì trong năm 1960 đã có tới 17 quốc gia ở châu Phi giành được độc lập từ tay các đế quốc thực dân.'
      }
    ]
  },

  // ==========================================================================
  // 6. MÔN GIÁO DỤC CÔNG DÂN (LỚP 6, 7, 8, 9)
  // ==========================================================================
  {
    id: 'gdcd6-b1',
    title: 'Bài 1: Tự hào về truyền thống gia đình, dòng họ',
    subjectId: 'gdcd',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề: Tự hào truyền thống',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Giáo dục công dân 6',
    pageReference: 'Trang 5 - 10',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nêu được một số truyền thống tốt đẹp của gia đình, dòng họ (hiếu học, cần cù, yêu nước, nhân ái, làng nghề truyền thống).',
      'Hiểu được ý nghĩa của truyền thống đối với sự trưởng thành của mỗi cá nhân.',
      'Biết giữ gìn và phát huy truyền thống bằng những việc làm thiết thực trong học tập và rèn luyện.'
    ],
    summary: 'Giáo dục lòng biết ơn cội nguồn tổ tiên, tự hào và có trách nhiệm phát huy truyền thống hiếu học, làng nghề của gia đình, quê hương Mỹ Hòa.',
    keyPoints: [
      'Truyền thống là những giá trị tốt đẹp được hình thành qua thời gian dài và truyền từ thế hệ này sang thế hệ khác.',
      'Tự hào về truyền thống giúp chúng ta có thêm sự tự tin, động lực vượt qua khó khăn vươn lên thành đạt.',
      'Học sinh cần chăm ngoan học giỏi, kính trọng ông bà cha mẹ để làm rạng danh dòng họ.'
    ],
    contentMarkdown: `### 1. Thế nào là truyền thống tốt đẹp của gia đình, dòng họ?
* Là những giá trị văn hóa, đạo đức, nghề nghiệp quý báu được gia đình, dòng họ sáng tạo và lưu giữ qua nhiều thế hệ:
  * Truyền thống yêu nước, chống ngoại xâm.
  * Truyền thống hiếu học, tôn sư trọng đạo.
  * Truyền thống đạo đức nhân nghĩa, lá lành đùm lá rách.
  * Truyền thống làng nghề thủ công mỹ nghệ tinh xảo.

### 2. Trách nhiệm của học sinh THCS Mỹ Hòa
* Luôn trân trọng, ghi nhớ công ơn tổ tiên; ra sức học tập chăm ngoan, không làm những việc sai trái làm tổn hại đến danh dự gia đình.`,
    sampleExercises: [
      {
        question: 'Hãy kể tên 2 truyền thống tốt đẹp của gia đình em hoặc quê hương em?',
        solution: 'Học sinh nêu ví dụ như truyền thống hiếu học nhiều đời đỗ đạt, hoặc truyền thống làm nghề thủ công đan đát, làm bánh tráng, làm gốm.'
      }
    ]
  },
  {
    id: 'gdcd7-b1',
    title: 'Bài 1: Tự hào về truyền thống quê hương và Di sản văn hóa',
    subjectId: 'gdcd',
    grade: 7,
    semester: 1,
    chapter: 'Chủ đề: Di sản văn hóa',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Giáo dục công dân 7',
    pageReference: 'Trang 6 - 13',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Phân biệt được di sản văn hóa vật thể và di sản văn hóa phi vật thể.',
      'Hiểu được giá trị lịch sử, văn hóa, khoa học của các di sản trên đất nước Việt Nam.',
      'Có ý thức và hành động cụ thể tham gia giữ gìn, bảo vệ di tích lịch sử và danh lam thắng cảnh.'
    ],
    summary: 'Tìm hiểu Luật Di sản văn hóa, bảo vệ các di sản vật thể và phi vật thể của dân tộc Việt Nam và tỉnh Vĩnh Long.',
    keyPoints: [
      'Di sản văn hóa vật thể: Các di tích lịch sử, danh lam thắng cảnh, cổ vật, bảo vật quốc gia.',
      'Di sản văn hóa phi vật thể: Tiếng nói, chữ viết, lễ hội truyền thống, đờn ca tài tử Nam Bộ, ca trù, nhã nhạc cung đình Huế.',
      'Hành vi bị nghiêm cấm: Chiếm đoạt, làm sai lệch hoặc hủy hoại di sản văn hóa.'
    ],
    contentMarkdown: `### 1. Khái niệm Di sản văn hóa
* **Di sản văn hóa vật thể**: Sản phẩm vật chất có giá trị lịch sử, văn hóa, khoa học (Văn Miếu - Quốc Tử Giám, Phố cổ Hội An, Văn Thánh Miếu Vĩnh Long).
* **Di sản văn hóa phi vật thể**: Sản phẩm tinh thần gắn với cộng đồng (Đờn ca tài tử Nam Bộ, Hát Xoan Phú Thọ, Dân ca Quan họ Bắc Ninh).

### 2. Bảo vệ di sản văn hóa
* Mỗi công dân có nghĩa vụ tôn trọng, bảo vệ và quảng bá vẻ đẹp của di sản đến bạn bè trong nước và quốc tế.`,
    sampleExercises: [
      {
        question: 'Nghệ thuật Đờn ca tài tử Nam Bộ thuộc loại hình di sản văn hóa nào?',
        solution: 'Đờn ca tài tử Nam Bộ là Di sản văn hóa phi vật thể của nhân loại được UNESCO công nhận.'
      }
    ]
  },
  {
    id: 'gdcd8-b1',
    title: 'Bài 1: Tự hào về truyền thống dân tộc Việt Nam',
    subjectId: 'gdcd',
    grade: 8,
    semester: 1,
    chapter: 'Chủ đề: Truyền thống dân tộc',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Giáo dục công dân 8',
    pageReference: 'Trang 5 - 12',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nêu được những nét đẹp truyền thống của dân tộc Việt Nam: Yêu nước nồng nàn, đoàn kết, nhân ái, khoan dung, hiếu học.',
      'Phê phán những biểu hiện tự ti hoặc coi thường văn hóa dân tộc.',
      'Chủ động học tập và lan tỏa những giá trị đạo đức tốt đẹp đến mọi người xung quanh.'
    ],
    summary: 'Tôn vinh bản sắc văn hóa Việt Nam, tinh thần đoàn kết toàn dân tộc và trách nhiệm bảo tồn văn hóa trong thời kỳ hội nhập quốc tế.',
    keyPoints: [
      'Dân tộc Việt Nam có bề dày hơn 4000 năm lịch sử dựng nước và giữ nước.',
      'Lòng yêu nước nồng nàn là sợi chỉ đỏ xuyên suốt chiều dài lịch sử dân tộc.',
      'Hòa nhập nhưng không hòa tan: Tiếp thu tinh hoa văn hóa nhân loại đồng thời giữ gìn cốt cách dân tộc.'
    ],
    contentMarkdown: `### 1. Truyền thống quý báu của dân tộc Việt Nam
* Tinh thần quật cường chống giặc ngoại xâm: "Giặc đến nhà đàn bà cũng đánh".
* Tinh thần tương thân tương ái: "Nhiễu điều phủ lấy giá gương / Người trong một nước phải thương nhau cùng".

### 2. Hành động của thế hệ trẻ
* Tích cực học tập, rèn luyện kỹ năng số, bảo tồn tiếng Việt trong sáng và giới thiệu nét đẹp văn hóa Việt Nam ra thế giới.`,
    sampleExercises: [
      {
        question: 'Em hãy nêu một câu ca dao hoặc tục ngữ thể hiện truyền thống hiếu học của dân tộc ta?',
        solution: '"Không thầy đố mày làm nên", "Muốn sang thì bắc cầu kiều / Muốn con hay chữ thì yêu lấy thầy".'
      }
    ]
  },
  {
    id: 'gdcd9-b1',
    title: 'Bài 1: Sống có lý tưởng - Trách nhiệm của thanh niên thời đại mới',
    subjectId: 'gdcd',
    grade: 9,
    semester: 1,
    chapter: 'Chủ đề: Lý tưởng sống',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Giáo dục công dân 9',
    pageReference: 'Trang 5 - 13',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Hiểu khái niệm lý tưởng sống và lý tưởng sống cao đẹp của thanh niên Việt Nam hiện nay.',
      'Giải thích vì sao thanh niên cần phải có lý tưởng sống đúng đắn.',
      'Xây dựng kế hoạch học tập, rèn luyện bản thân hướng tới mục tiêu tương lai rõ ràng.'
    ],
    summary: 'Xác định mục đích sống cống hiến cho quê hương đất nước, lý tưởng phấn đấu vì dân giàu, nước mạnh, dân chủ, công bằng, văn minh.',
    keyPoints: [
      'Lý tưởng sống là cái đích tốt đẹp nhất mà con người hướng tới trong cuộc đời.',
      'Người sống có lý tưởng luôn nỗ lực vượt qua khó khăn, không ngại thử thách để đạt được ước mơ chính đáng.',
      'Lý tưởng của thanh niên ngày nay: Học tập làm chủ khoa học công nghệ, khởi nghiệp đổi mới sáng tạo, bảo vệ chủ quyền thiêng liêng của Tổ quốc.'
    ],
    contentMarkdown: `### 1. Thế nào là sống có lý tưởng?
* Sống có lý tưởng là luôn suy nghĩ và hành động để hướng tới mục tiêu cao đẹp, không chỉ vì lợi ích cá nhân mà còn vì cộng đồng và sự phát triển của đất nước.

### 2. Lý tưởng của thanh niên thời đại chuyển đổi số
* Nắm vững tri thức công nghệ hiện đại, ngoại ngữ, có bản lĩnh chính trị vững vàng, sẵn sàng đóng góp trí tuệ vào công cuộc công nghiệp hóa - hiện đại hóa quốc gia.`,
    sampleExercises: [
      {
        question: 'Hãy viết đoạn văn ngắn (khoảng 100 từ) chia sẻ ước mơ nghề nghiệp và lý tưởng sống của em trong tương lai?',
        solution: 'Học sinh trình bày mục tiêu thi đỗ lớp 10, chọn ngành nghề yêu thích (kỹ sư, giáo viên, bác sĩ) để cống hiến cho xã hội.'
      }
    ]
  },

  // ==========================================================================
  // 7. MÔN TIN HỌC (LỚP 7, 8, 9) - Lớp 6 đã có 17 bài chuẩn GDPT 2018
  // ==========================================================================
  // --- TIN HỌC 7 ---
  {
    id: 'tin7-b1',
    title: 'Bài 1: Thiết bị vào - ra và Các cổng kết nối của máy tính',
    subjectId: 'tin-hoc',
    grade: 7,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Tin học 7',
    pageReference: 'Trang 5 - 11',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Phân biệt được thiết bị vào (bàn phím, chuột, micro, máy quét) và thiết bị ra (màn hình, loa, máy in, máy chiếu).',
      'Nhận biết các cổng kết nối phổ biến: USB, HDMI, Jack Audio 3.5mm, cổng mạng LAN RJ45, Type-C.',
      'Biết thao tác kết nối thiết bị an toàn, tránh chập cháy linh kiện máy tính.'
    ],
    summary: 'Tìm hiểu phần cứng máy tính: vai trò các thiết bị ngoại vi vào - ra và cách nhận diện các chuẩn cắm kết nối dữ liệu hiện đại.',
    keyPoints: [
      'Thiết bị vào (Input): Thu nhận thông tin từ thế giới thực chuyển vào máy tính thành dữ liệu số nhị phân.',
      'Thiết bị ra (Output): Chuyển đổi dữ liệu đã xử lý từ máy tính thành dạng con người có thể nghe, nhìn, cầm nắm được.',
      'Cổng HDMI truyền tải đồng thời cả hình ảnh độ nét cao và âm thanh đa kênh.',
      'Thao tác cắm rút cáp USB đúng chiều, nhẹ nhàng, không bẻ cong chân tiếp xúc.'
    ],
    contentMarkdown: `### 1. Phân loại Thiết bị Vào và Thiết bị Ra
* **Thiết bị Vào (Input Devices)**:
  * *Bàn phím, chuột máy tính*: Nhập văn bản và thao tác điều khiển con trỏ.
  * *Microphone, webcam*: Thu nhận âm thanh và hình ảnh trực tiếp.
  * *Máy quét (Scanner)*: Quét ảnh và tài liệu giấy thành tệp tin kỹ thuật số.
* **Thiết bị Ra (Output Devices)**:
  * *Màn hình (Monitor)*: Hiển thị giao diện đồ họa và kết quả làm việc.
  * *Máy in, máy chiếu*: Trình chiếu hình ảnh lên màn ảnh lớn hoặc in ra giấy.
  * *Loa và tai nghe (Headphone)*: Phát âm thanh đa phương tiện.

### 2. Các chuẩn cổng kết nối phổ thông
* **USB-A & USB-C**: Kết nối chuột, bàn phím, USB nhớ, sạc thiết bị di động.
* **HDMI**: Cổng xuất hình ảnh và âm thanh chất lượng cao đến màn hình TV/máy chiếu.
* **RJ45**: Cổng cắm dây cáp mạng Internet có dây tốc độ cao.`,
    sampleExercises: [
      {
        question: 'Hãy chỉ ra thiết bị nào sau đây vừa là thiết bị vào vừa là thiết bị ra: A. Bàn phím; B. Màn hình cảm ứng; C. Máy in; D. Chuột quang?',
        solution: 'Đáp án: B. Màn hình cảm ứng (Touch screen) vừa nhận tương tác chạm của người dùng (vào), vừa hiển thị hình ảnh (ra).'
      }
    ]
  },
  {
    id: 'tin7-b2',
    title: 'Bài 2: Phần mềm Bảng tính điện tử và Các hàm tính toán cơ bản (SUM, AVERAGE, MIN, MAX)',
    subjectId: 'tin-hoc',
    grade: 7,
    semester: 2,
    chapter: 'Chủ đề 4: Ứng dụng tin học',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Tin học 7',
    pageReference: 'Trang 25 - 35',
    orderIndex: 2,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết giao diện bảng tính Excel: thanh công thức, ô tính, hàng, cột, địa chỉ ô tính.',
      'Nhập và định dạng dữ liệu kiểu văn bản, kiểu số, kiểu ngày tháng.',
      'Sử dụng thành thạo các hàm tính toán cơ bản: =SUM(), =AVERAGE(), =MIN(), =MAX(), =COUNT().'
    ],
    summary: 'Khai thác sức mạnh của bảng tính điện tử để quản lý dữ liệu, tính điểm trung bình học kỳ và tổng kết số liệu khoa học.',
    keyPoints: [
      'Địa chỉ ô tính là sự kết hợp giữa tên cột và số hàng (ví dụ: A1, B5, C10).',
      'Công thức luôn bắt đầu bằng dấu "=" (bằng).',
      'Hàm SUM tính tổng; AVERAGE tính trung bình cộng; MIN tìm giá trị nhỏ nhất; MAX tìm giá trị lớn nhất trong khối ô tính.'
    ],
    contentMarkdown: `### 1. Khái niệm Ô tính và Vùng dữ liệu
* **Ô tính (Cell)**: Giao điểm của một cột và một hàng. Địa chỉ ô có dạng \`<Tên cột><Chỉ số hàng>\` (VD: \`D4\`).
* **Khối ô (Range)**: Một vùng hình chữ nhật gồm nhiều ô liền kề, ký hiệu \`<Ô đầu>:<Ô cuối>\` (VD: \`A1:C10\`).

### 2. Các hàm tính toán thông dụng
* **Hàm SUM**: Tính tổng các số trong vùng: \`=SUM(C2:C10)\`
* **Hàm AVERAGE**: Tính giá trị trung bình cộng: \`=AVERAGE(D2:D10)\`
* **Hàm MAX / MIN**: Tìm điểm số cao nhất / thấp nhất trong bảng: \`=MAX(E2:E30)\``,
    sampleExercises: [
      {
        question: 'Tại ô D5 có công thức "=SUM(A1:A3)". Khi các ô A1=4, A2=6, A3=10 thì kết quả tại D5 là bao nhiêu?',
        solution: 'Kết quả = 4 + 6 + 10 = 20.'
      }
    ]
  },

  // --- TIN HỌC 8 ---
  {
    id: 'tin8-b1',
    title: 'Bài 1: Lịch sử phát triển của máy tính qua 5 thế hệ',
    subjectId: 'tin-hoc',
    grade: 8,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và cộng đồng',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Tin học 8',
    pageReference: 'Trang 5 - 12',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Trình bày được 5 thế hệ máy tính điện tử gắn với sự tiến bộ của công nghệ linh kiện điện tử.',
      'Hiểu sự thu nhỏ kích thước nhưng tăng vọt về tốc độ xử lý và dung lượng bộ nhớ của máy tính.',
      'Nhận biết xu hướng phát triển của trí tuệ nhân tạo (AI) và siêu máy tính trong thời đại 4.0.'
    ],
    summary: 'Hành trình từ chiếc máy tính ENIAC nặng 30 tấn dùng đèn điện tử chân không đến điện thoại thông minh bỏ túi và máy tính lượng tử.',
    keyPoints: [
      'Thế hệ 1 (1945 - 1955): Đèn điện tử chân không, kích thước khổng lồ chiếm cả căn phòng lớn, tiêu thụ điện năng lớn.',
      'Thế hệ 2 (1955 - 1965): Bóng bán dẫn (Transistor), kích thước giảm, tốc độ tăng gấp hàng trăm lần.',
      'Thế hệ 3 (1965 - 1974): Mạch tích hợp (IC), xuất hiện màn hình và bàn phím tương tác.',
      'Thế hệ 4 (1974 - nay): Bộ vi xử lý siêu tích hợp (VLSI, Microprocessor), máy tính cá nhân (PC) bùng nổ.',
      'Thế hệ 5: Máy tính thông minh với mạng nơ-ron nhân tạo và tính toán đám mây.'
    ],
    contentMarkdown: `### Năm thế hệ máy tính điện tử
1. **Thế hệ 1**: Đèn điện tử chân không (ENIAC).
2. **Thế hệ 2**: Transistor bán dẫn silicon.
3. **Thế hệ 3**: Mạch vi mạch tích hợp (Integrated Circuit - IC).
4. **Thế hệ 4**: Vi xử lý (Microprocessor - Intel 4004, Core i, AMD Ryzen).
5. **Thế hệ 5**: Trí tuệ nhân tạo, tính toán lượng tử và kết nối vạn vật (IoT).`,
    sampleExercises: [
      {
        question: 'Linh kiện điện tử đặc trưng của máy tính thế hệ thứ nhất là gì?',
        solution: 'Đèn điện tử chân không (Vacuum tubes).'
      }
    ]
  },
  {
    id: 'tin8-b2',
    title: 'Bài 2: Cấu trúc Rẽ nhánh và Vòng lặp trong Lập trình thuật toán',
    subjectId: 'tin-hoc',
    grade: 8,
    semester: 2,
    chapter: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Tin học 8',
    pageReference: 'Trang 45 - 55',
    orderIndex: 2,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Hiểu rõ ba cấu trúc điều khiển cơ bản của thuật toán: Tuần tự, Rẽ nhánh (if...then...else) và Lặp (for, while).',
      'Vẽ sơ đồ khối thuật toán chính xác với các hình khối tiêu chuẩn: Elip, Hình chữ nhật, Hình thoi.',
      'Chuyển đổi thuật toán thành các khối lệnh trong môi trường lập trình trực quan Scratch hoặc ngôn ngữ Python.'
    ],
    summary: 'Tư duy logic thuật toán: biểu diễn điều kiện logic đúng/sai và vòng lặp có số lần biết trước hoặc lặp với điều kiện.',
    keyPoints: [
      'Cấu trúc rẽ nhánh dạng thiếu: Nếu <Điều kiện> đúng thì thực hiện <Công việc>.',
      'Cấu trúc rẽ nhánh dạng đủ: Nếu <Điều kiện> đúng thì làm <Việc 1>, ngược lại làm <Việc 2>.',
      'Vòng lặp giúp lặp đi lặp lại một khối lệnh nhiều lần mà không phải viết lặp mã nguồn.'
    ],
    contentMarkdown: `### 1. Cấu trúc Rẽ nhánh
* Biểu diễn bằng hình thoi trong sơ đồ khối. Có hai nhánh rẽ: **Đúng (True)** và **Sai (False)**.
* Ví dụ kiểm tra số chẵn/lẻ:
  * Nếu \`n % 2 == 0\` => Thông báo "Số chẵn".
  * Ngược lại => Thông báo "Số lẻ".

### 2. Cấu trúc Vòng lặp
* Lặp với số lần định trước: Lặp $N$ lần (VD: vẽ hình vuông lặp 4 lần bước vẽ cạnh và quay 90 độ).
* Lặp với điều kiện dừng: Lặp lại công việc chừng nào điều kiện vẫn còn đúng.`,
    sampleExercises: [
      {
        question: 'Hãy nêu hình khối quy ước dùng để kiểm tra điều kiện trong sơ đồ khối thuật toán?',
        solution: 'Hình thoi (Rhombus) được dùng để chứa biểu thức điều kiện kiểm tra.'
      }
    ]
  },

  // --- TIN HỌC 9 ---
  {
    id: 'tin9-b1',
    title: 'Bài 1: Điện toán đám mây và Các dịch vụ lưu trữ trực tuyến',
    subjectId: 'tin-hoc',
    grade: 9,
    semester: 1,
    chapter: 'Chủ đề 1: Máy tính và xã hội tri thức',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Tin học 9',
    pageReference: 'Trang 6 - 15',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Hiểu khái niệm Điện toán đám mây (Cloud Computing) và ưu thế so với lưu trữ máy tính cục bộ.',
      'Sử dụng thành thạo các dịch vụ lưu trữ đám mây: Google Drive, OneDrive, Dropbox.',
      'Biết cách phân quyền chia sẻ tệp tin: Chỉ xem (Viewer), Nhận xét (Commenter), Chỉnh sửa (Editor).'
    ],
    summary: 'Công nghệ đám mây thay đổi phương thức làm việc nhóm, bảo vệ dữ liệu trước rủi ro hỏng ổ cứng và cho phép truy cập mọi lúc mọi nơi.',
    keyPoints: [
      'Điện toán đám mây là mô hình cung cấp tài nguyên điện toán (máy chủ, dung lượng lưu trữ, phần mềm) qua Internet theo nhu cầu.',
      'Lợi ích: Tiết kiệm chi phí đầu tư phần cứng, đồng bộ hóa tức thì giữa điện thoại và máy tính, dễ dàng làm việc nhóm từ xa.',
      'Nguyên tắc bảo mật: Kích hoạt xác thực 2 bước (2FA), chỉ chia sẻ quyền chỉnh sửa cho thành viên đáng tin cậy.'
    ],
    contentMarkdown: `### 1. Điện toán đám mây là gì?
* Là việc cung cấp các dịch vụ điện toán bao gồm máy chủ, bộ nhớ, cơ sở dữ liệu, mạng, phần mềm thông qua mạng Internet ("đám mây").
* Người dùng không cần sở hữu cơ sở hạ tầng vật lý mà chỉ cần thuê tài nguyên theo nhu cầu.

### 2. Dịch vụ lưu trữ và làm việc cộng tác trực tuyến
* Lưu trữ tài liệu học tập trên Google Drive giúp học sinh THCS Mỹ Hòa không bao giờ lo mất bài học khi máy tính cá nhân gặp sự cố.
* Đồng chỉnh sửa tài liệu trực tuyến (Google Docs, Google Sheets) cùng lúc với bạn bè trong lớp.`,
    sampleExercises: [
      {
        question: 'Khi chia sẻ một file tài liệu bài tập cho các bạn cùng lớp để lấy ý kiến nhưng không muốn các bạn xóa nhầm nội dung bài, em nên chọn quyền chia sẻ nào?',
        solution: 'Chọn quyền "Người nhận xét" (Commenter) hoặc "Người xem" (Viewer).'
      }
    ]
  },
  {
    id: 'tin9-b2',
    title: 'Bài 2: An toàn thông tin và Bảo vệ bản quyền số trên Internet',
    subjectId: 'tin-hoc',
    grade: 9,
    semester: 2,
    chapter: 'Chủ đề 2: Đạo đức, pháp luật và văn hóa trong môi trường số',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Tin học 9',
    pageReference: 'Trang 20 - 30',
    orderIndex: 2,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết các mối đe dọa an toàn thông tin: Phần mềm độc hại (virus, trojan, spyware), lừa đảo mạo danh (Phishing).',
      'Áp dụng quy tắc đặt mật khẩu mạnh và thói quen duyệt web an toàn.',
      'Tôn trọng bản quyền tác giả và quyền sở hữu trí tuệ của các sản phẩm số (phần mềm, hình ảnh, bài hát).'
    ],
    summary: 'Trang bị kỹ năng phòng thủ không gian mạng, phòng chống lừa đảo trực tuyến và tuân thủ Luật An ninh mạng Việt Nam.',
    keyPoints: [
      'Mật khẩu mạnh: Ít nhất 8 ký tự, gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt (!@#$%), không dùng thông tin cá nhân dễ đoán.',
      'Phishing: Kẻ xấu giả mạo ngân hàng, trường học gửi link độc hại để đánh cắp tài khoản cá nhân.',
      'Bản quyền phần mềm: Sử dụng phần mềm có bản quyền hoặc mã nguồn mở miễn phí, ghi rõ nguồn trích dẫn khi sử dụng tài liệu trên mạng.'
    ],
    contentMarkdown: `### 1. Các hiểm họa trên không gian mạng
* **Mã độc (Malware)**: Xâm nhập vào máy tính phá hủy hệ điều hành hoặc đánh cắp thông tin đăng nhập.
* **Tấn công lừa đảo (Phishing)**: Các email, tin nhắn mạo danh chứa liên kết độc hại nhằm chiếm đoạt tài khoản mạng xã hội.

### 2. Các biện pháp bảo vệ bản thân
1. Không bấm vào các đường link lạ trên mạng xã hội.
2. Đổi mật khẩu định kỳ và không dùng chung một mật khẩu cho nhiều tài khoản.
3. Luôn tôn trọng bản quyền tác giả khi sao chép tài liệu học tập trực tuyến.`,
    sampleExercises: [
      {
        question: 'Trong các mật khẩu sau, mật khẩu nào có độ an toàn cao nhất: A. 12345678; B. myhoa2026; C. MyHoa@Edu#2026; D. abcxyz?',
        solution: 'Đáp án: C. MyHoa@Edu#2026 (Có chữ hoa, chữ thường, số và ký tự đặc biệt).'
      }
    ]
  },

  // ==========================================================================
  // 8. MÔN CÔNG NGHỆ (LỚP 6, 7, 8, 9)
  // ==========================================================================
  {
    id: 'congnghe6-b1',
    title: 'Bài 1: Khái quát về Nhà ở và Ngôi nhà thông minh',
    subjectId: 'cong-nghe',
    grade: 6,
    semester: 1,
    chapter: 'Chương 1: Nhà ở',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Công nghệ 6',
    pageReference: 'Trang 7 - 13',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nêu vai trò của nhà ở đối với đời sống con người.',
      'Nhận biết các khu vực chức năng trong nhà ở và cấu trúc xây dựng cơ bản.',
      'Trình bày đặc điểm của ngôi nhà thông minh: tiện nghi, an toàn và tiết kiệm năng lượng.'
    ],
    summary: 'Tìm hiểu vai trò của nhà ở, kiến trúc nhà đặc trưng ở Việt Nam và xu hướng ngôi nhà thông minh ứng dụng công nghệ số hiện đại.',
    keyPoints: [
      'Vai trò nhà ở: Nơi trú ngụ, bảo vệ con người trước các tác động thời tiết, thiên tai; nơi sinh hoạt ấm cúng của gia đình.',
      'Kiến trúc nhà ở Việt Nam: Nhà nông thôn truyền thống, nhà phố, nhà chung cư cao tầng, nhà sàn vùng cao.',
      'Ngôi nhà thông minh (Smart Home): Được trang bị hệ thống tự động hóa điều khiển đèn, nhiệt độ, khóa cửa bằng điện thoại hoặc giọng nói.'
    ],
    contentMarkdown: `### 1. Vai trò của nhà ở
* Nhà ở là công trình xây dựng phục vụ nhu cầu sinh hoạt của con người, đem lại cảm giác bình yên, thư giãn sau giờ học tập và làm việc.
* Các khu vực chính trong nhà: Phòng khách, phòng ngủ, phòng bếp - ăn, khu vệ sinh, ban công...

### 2. Đặc điểm của Ngôi nhà thông minh (Smart Home)
* **Tiện nghi vượt trội**: Tự động bật đèn khi có người bước vào phòng, rèm cửa mở khi trời sáng.
* **Tiết kiệm năng lượng**: Tự động tắt máy lạnh khi không có người trong phòng, dùng pin năng lượng mặt trời.
* **An ninh an toàn**: Hệ thống camera báo động gửi cảnh báo khẩn cấp về điện thoại khi có người lạ đột nhập.`,
    sampleExercises: [
      {
        question: 'Hãy kể tên 3 thiết bị tự động trong ngôi nhà thông minh mà em biết?',
        solution: 'Đèn cảm ứng chuyển động, khóa cửa nhận diện vân tay/khuôn mặt, robot hút bụi tự động.'
      }
    ]
  },
  {
    id: 'congnghe7-b1',
    title: 'Bài 1: Giới thiệu về Trồng trọt và Nông nghiệp công nghệ cao',
    subjectId: 'cong-nghe',
    grade: 7,
    semester: 1,
    chapter: 'Chương 1: Trồng trọt',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Công nghệ 7',
    pageReference: 'Trang 6 - 14',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Trình bày vai trò và triển vọng phát triển của ngành trồng trọt ở nước ta.',
      'Nêu các biện pháp kỹ thuật trồng trọt ứng dụng công nghệ cao: nhà kính, thủy canh, tưới nhỏ giọt tự động.',
      'Ý thức sử dụng phân bón hữu cơ và thuốc bảo vệ thực vật sinh học an toàn cho môi trường.'
    ],
    summary: 'Nâng cao giá trị nông sản bằng công nghệ trồng trọt tiên tiến, bảo vệ đất và sức khỏe người tiêu dùng.',
    keyPoints: [
      'Trồng trọt cung cấp lương thực, thực phẩm cho con người và thức ăn cho ngành chăn nuôi.',
      'Nông nghiệp công nghệ cao giúp kiểm soát nhiệt độ, độ ẩm, ánh sáng và dinh dưỡng tự động.',
      'Mô hình tưới nhỏ giọt tiết kiệm 50% lượng nước tưới so với phương pháp tưới ngập truyền thống.'
    ],
    contentMarkdown: `### 1. Vai trò của ngành trồng trọt
* Cung cấp lương thực thiết yếu (lúa gạo, ngô, khoai), rau củ quả cho tiêu dùng nội địa và xuất khẩu hàng tỷ USD mỗi năm.

### 2. Nông nghiệp công nghệ cao
* **Trồng cây trong nhà màng, nhà kính**: Ngăn chặn sâu bọ xâm nhập, hạn chế tối đa sử dụng thuốc trừ sâu hóa học.
* **Hệ thống tưới tự động**: Cảm biến đo độ ẩm đất để tự động tưới nước đúng lúc và đúng lượng cây cần.`,
    sampleExercises: [
      {
        question: 'Ưu điểm lớn nhất của mô hình trồng rau thủy canh là gì?',
        solution: 'Không cần sử dụng đất, kiểm soát chính xác hàm lượng dinh dưỡng, cây sinh trưởng nhanh và đảm bảo độ sạch an toàn vệ sinh.'
      }
    ]
  },
  {
    id: 'congnghe8-b1',
    title: 'Bài 1: Tiêu chuẩn Bản vẽ kĩ thuật và Hình chiếu vuông góc',
    subjectId: 'cong-nghe',
    grade: 8,
    semester: 1,
    chapter: 'Chương 1: Vẽ kĩ thuật',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Công nghệ 8',
    pageReference: 'Trang 5 - 15',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết các tiêu chuẩn cơ bản của bản vẽ kỹ thuật: Khổ giấy (A0, A1, A2, A3, A4), tỉ lệ, nét vẽ.',
      'Hiểu nguyên lý các phép chiếu vuông góc: Hình chiếu đứng, hình chiếu bằng, hình chiếu cạnh.',
      'Đọc và phác thảo được hình chiếu của các khối hình học đơn giản (khối hộp chữ nhật, khối chóp, khối lăng trụ).'
    ],
    summary: 'Bản vẽ kỹ thuật là ngôn ngữ chung của ngành kỹ thuật cơ khí và xây dựng. Phương pháp biểu diễn vật thể không gian 3 chiều lên mặt phẳng 2 chiều.',
    keyPoints: [
      'Hình chiếu đứng nhìn từ trước tới (chiếu lên mặt phẳng đứng).',
      'Hình chiếu bằng nhìn từ trên xuống (chiếu lên mặt phẳng bằng).',
      'Hình chiếu cạnh nhìn từ trái sang (chiếu lên mặt phẳng cạnh).',
      'Nét liền đậm dùng vẽ đường bao thấy; nét đứt mảnh dùng vẽ đường bao khuất.'
    ],
    contentMarkdown: `### 1. Khái niệm Bản vẽ kĩ thuật
* Bản vẽ kĩ thuật là tác phẩm trình bày các thông tin kĩ thuật của sản phẩm dưới dạng hình vẽ và các kí hiệu theo các quy tắc thống nhất quốc tế (ISO và TCVN).

### 2. Ba hình chiếu vuông góc cơ bản
1. **Hình chiếu đứng**: Hướng chiếu từ trước tới, thể hiện chiều cao và chiều dài.
2. **Hình chiếu bằng**: Hướng chiếu từ trên xuống, thể hiện chiều dài và chiều rộng.
3. **Hình chiếu cạnh**: Hướng chiếu từ trái sang, thể hiện chiều rộng và chiều cao.`,
    sampleExercises: [
      {
        question: 'Trên bản vẽ kỹ thuật, đường bao khuất không nhìn thấy của vật thể được biểu diễn bằng nét vẽ nào?',
        solution: 'Nét đứt mảnh.'
      }
    ]
  },
  {
    id: 'congnghe9-b1',
    title: 'Bài 1: Cấu tạo và An toàn sử dụng mạng điện sinh hoạt trong gia đình',
    subjectId: 'cong-nghe',
    grade: 9,
    semester: 1,
    chapter: 'Mô-đun: Mạng điện trong nhà',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Công nghệ 9',
    pageReference: 'Trang 6 - 16',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Hiểu cấu trúc chung của mạng điện hạ áp gia đình Việt Nam (điện áp 220V, tần số 50Hz).',
      'Nắm vững chức năng của các thiết bị bảo vệ và đóng cắt: Aptomat (MCB), cầu chì, công tắc điện, ổ cắm.',
      'Thực hiện nghiêm túc các quy tắc an toàn phòng chống tai nạn điện giật và chập cháy nổ điện.'
    ],
    summary: 'Hiểu rõ nguyên lý cấp điện, phân phối điện an toàn trong gia đình và kỹ năng xử lý tình huống khẩn cấp khi gặp sự cố điện giật.',
    keyPoints: [
      'Điện áp mạng điện sinh hoạt Việt Nam là 220V xoay chiều cực kỳ nguy hiểm, có thể gây tử vong.',
      'Cầu chì và Aptomat có nhiệm vụ tự động ngắt mạch khi xảy ra quá tải hoặc ngắn mạch (chập điện).',
      'Quy tắc an toàn: Không chạm tay ướt vào ổ điện, ngắt aptomat tổng trước khi sửa chữa điện.'
    ],
    contentMarkdown: `### 1. Cấu trúc mạng điện gia đình
* Mạng điện gồm có: Công tơ điện -> Aptomat tổng -> Các lộ dây nhánh -> Công tắc -> Thiết bị tiêu thụ điện (đèn, quạt, máy giặt...).

### 2. Các thiết bị bảo vệ cốt lõi
* **Aptomat (Cầu dao tự động)**: Tự động ngắt điện tức thì khi phát hiện quá tải hoặc chập mạch, bảo vệ an toàn cho cả căn nhà.
* **Dây nối đất (Earthing)**: Triệt tiêu dòng điện rò rỉ ra vỏ kim loại của tủ lạnh, bình nóng lạnh, máy giặt.`,
    sampleExercises: [
      {
        question: 'Khi phát hiện người bị điện giật, việc đầu tiên cần làm ngay lập tức là gì?',
        solution: 'Ngắt ngay cầu dao hoặc aptomat điện gần nhất, hoặc dùng vật liệu cách điện (gậy gỗ khô, que tre) gạt dây điện ra khỏi người nạn nhân.'
      }
    ]
  },

  // ==========================================================================
  // 9. MÔN ÂM NHẠC (LỚP 6, 7, 8, 9)
  // ==========================================================================
  {
    id: 'amnhac6-b1',
    title: 'Bài 1: Khám phá các nốt nhạc trên khuông và Bài hát Tuổi học trò',
    subjectId: 'am-nhac',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề: Tuổi học trò',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Âm nhạc 6',
    pageReference: 'Trang 6 - 12',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết 7 tên nốt nhạc cơ bản: Đồ, Rê, Mi, Pha, Son, La, Si trên khóa Son.',
      'Hát đúng cao độ, trường độ và giai điệu trong sáng của bài hát thiếu nhi.',
      'Gõ đệm thanh phách nhịp nhàng theo phách và theo tiết tấu lời ca.'
    ],
    summary: 'Làm quen với ký hiệu âm nhạc chuẩn, cao độ 7 nốt nhạc cơ bản và thưởng thức giai điệu học đường rộn rã.',
    keyPoints: [
      'Khuông nhạc gồm 5 dòng kẻ song song cách đều nhau và 4 khe tính từ dưới lên trên.',
      'Khóa Son bắt đầu từ dòng kẻ thứ 2 của khuông nhạc.',
      'Hình nốt quy định trường độ ngân dài ngắn của âm thanh: Nốt tròn, nốt trắng, nốt đen, nốt móc đơn.'
    ],
    contentMarkdown: `### 1. Lý thuyết âm nhạc cơ bản
* **Khuông nhạc**: 5 dòng kẻ và 4 khe song song.
* **7 bậc âm cơ bản**: Đô (C) - Rê (D) - Mi (E) - Fa (F) - Sol (G) - La (A) - Si (B).
* **Khóa Son**: Xác định vị trí nốt Sol nằm ở dòng kẻ thứ hai của khuông nhạc.

### 2. Thực hành gõ thanh phách
* Luyện tập gõ đệm theo hình tiết tấu đen - đen - trắng nhịp 2/4.`,
    sampleExercises: [
      {
        question: 'Trên khuông nhạc có khóa Son, nốt Sol nằm ở dòng kẻ thứ mấy?',
        solution: 'Dòng kẻ thứ 2 (tính từ dưới lên).'
      }
    ]
  },
  {
    id: 'amnhac7-b1',
    title: 'Bài 1: Giai điệu mùa thu và Nhạc cụ Sáo Recorder',
    subjectId: 'am-nhac',
    grade: 7,
    semester: 1,
    chapter: 'Chủ đề: Giai điệu mùa thu',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Âm nhạc 7',
    pageReference: 'Trang 8 - 14',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Hát đúng sắc thái du dương, truyền cảm của các ca khúc về mùa thu và tình bạn.',
      'Biết thế bấm ngón các nốt Si, La, Son trên sáo Recorder và thổi âm thanh tròn vành, rõ nét.',
      'Cảm thụ nét đẹp trong sáng của âm nhạc giao hưởng thiếu nhi.'
    ],
    summary: 'Rèn luyện kỹ năng xướng âm, bấm ngón nhạc cụ sáo recorder và hát hòa bè đôi đơn giản.',
    keyPoints: [
      'Tư thế thổi sáo recorder: Đứng hoặc ngồi thẳng lưng, thả lỏng hai vai, thổi luồng hơi nhẹ nhàng đều đặn.',
      'Tay trái đặt ở phía trên, tay phải đặt ở phía dưới thân sáo.',
      'Kỹ thuật ngắt tiếng bằng đầu lưỡi (Tonguing).'
    ],
    contentMarkdown: `### 1. Kỹ thuật chơi sáo Recorder
* Sáo Recorder là nhạc cụ hơi phổ biến giúp học sinh rèn luyện khả năng cảm thụ cao độ chuẩn xác.
* **Thế bấm nốt Si (B)**: Bịt ngón cái tay trái ở lỗ số 0 phía sau và ngón trỏ tay trái ở lỗ số 1 phía trước.
* **Thế bấm nốt La (A)**: Thêm ngón giữa tay trái bịt lỗ số 2.
* **Thế bấm nốt Sol (G)**: Thêm ngón áp út tay trái bịt lỗ số 3.`,
    sampleExercises: [
      {
        question: 'Khi bấm nốt Sol trên sáo Recorder, tay trái cần dùng những ngón tay nào để bịt lỗ?',
        solution: 'Ngón cái (lỗ 0 phía sau), ngón trỏ (lỗ 1), ngón giữa (lỗ 2) và ngón áp út (lỗ 3).'
      }
    ]
  },
  {
    id: 'amnhac8-b1',
    title: 'Bài 1: Vẻ đẹp Dân ca ba miền Việt Nam và Danh nhân âm nhạc W.A. Mozart',
    subjectId: 'am-nhac',
    grade: 8,
    semester: 1,
    chapter: 'Chủ đề: Âm vang dân ca & Nhạc cổ điển',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Âm nhạc 8',
    pageReference: 'Trang 8 - 16',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết nét đặc trưng của dân ca ba miền: Dân ca Bắc Bộ (duyên dáng, trữ tình), Dân ca Trung Bộ (da diết, sâu lắng), Dân ca Nam Bộ (phóng khoáng, mộc mạc).',
      'Nắm được thân thế và sự nghiệp sáng tác thiên tài của nhạc sĩ người Áo Wolfgang Amadeus Mozart.',
      'Luyện tập đọc nhạc giọng Đô trưởng theo điệu thức 3/4.'
    ],
    summary: 'Gìn giữ tinh hoa âm nhạc cổ truyền dân tộc và mở rộng tầm mắt thưởng thức âm nhạc bác học kinh điển châu Âu.',
    keyPoints: [
      'Dân ca Nam Bộ: Nổi bật với các điệu Lý (Lý kéo chài, Lý cây bông, Lý con sáo) và hò đối đáp trên sông nước.',
      'Mozart (1756 - 1791): Thần đồng âm nhạc nước Áo, tác giả của các bản giao hưởng và nhạc kịch bất hủ.',
      'Nhịp 3/4: Mỗi ô nhịp có 3 phách, mỗi phách bằng một nốt đen, phách 1 mạnh, phách 2 và 3 nhẹ.'
    ],
    contentMarkdown: `### 1. Dân ca Việt Nam - Cội nguồn tâm hồn dân tộc
* Dân ca là những sáng tác âm nhạc dân gian truyền khẩu do nhân dân lao động sáng tạo nên trong quá trình lao động sản xuất và sinh hoạt cộng đồng.

### 2. Nhạc sĩ thiên tài W.A. Mozart
* Ngay từ năm 4 tuổi Mozart đã biết sáng tác tiểu phẩm âm nhạc và biểu diễn điêu luyện trước các hoàng gia châu Âu. Ông để lại di sản hơn 600 tác phẩm âm nhạc đỉnh cao cho nhân loại.`,
    sampleExercises: [
      {
        question: 'Nhạc sĩ Mozart là người mang quốc tịch nước nào?',
        solution: 'Nước Áo (Austria).'
      }
    ]
  },
  {
    id: 'amnhac9-b1',
    title: 'Bài 1: Âm nhạc Kịch trường và Hợp xướng học đường',
    subjectId: 'am-nhac',
    grade: 9,
    semester: 1,
    chapter: 'Chủ đề: Nghệ thuật kịch hát',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Âm nhạc 9',
    pageReference: 'Trang 6 - 15',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Tìm hiểu các thể loại sân khấu âm nhạc: Ca kịch, Nhạc kịch (Musical), Hát bội, Chèo, Cải lương Nam Bộ.',
      'Hát bè phối hòa âm hai bè (bè cao Soprano và bè trầm Alto) nhịp nhàng.',
      'Biết cách biểu cảm gương mặt và cử chỉ khi trình bày tác phẩm nghệ thuật trước đám đông.'
    ],
    summary: 'Nâng cao năng lực thẩm mỹ âm nhạc qua nghệ thuật nhạc kịch tổng hợp và kỹ năng biểu diễn tốp ca chuyên nghiệp.',
    keyPoints: [
      'Nhạc kịch là loại hình nghệ thuật kết hợp nhuần nhuyễn giữa âm nhạc, ca hát, vũ đạo và diễn xuất kịch nghệ.',
      'Cải lương là nét văn hóa sân khấu đặc sắc hình thành tại Nam Bộ đầu thế kỷ XX.',
      'Hát bè tạo nên chiều sâu âm thanh phong phú và sức cuốn hút mạnh mẽ cho ca khúc.'
    ],
    contentMarkdown: `### 1. Khám phá Nghệ thuật Nhạc kịch (Musical)
* Xuất phát từ phương Tây, nhạc kịch ngày nay là một trong những thể loại nghệ thuật giải trí hấp dẫn nhất thế giới (Broadway, West End).
* Diễn viên nhạc kịch vừa phải có giọng hát xuất sắc vừa phải có thể lực dẻo dai để thực hiện các vũ điệu phức tạp.

### 2. Kỹ thuật hát bè hai giọng
* Bè 1 giữ giai điệu chính, Bè 2 hát giai điệu hòa âm (quãng 3 hoặc quãng 6) bổ trợ, tạo nên sự dày dặn và ngân vang cho bài hát.`,
    sampleExercises: [
      {
        question: 'Loại hình sân khấu ca kịch truyền thống nào có nguồn gốc phát triển rực rỡ tại vùng đồng bằng sông Cửu Long?',
        solution: 'Nghệ thuật Sân khấu Cải lương.'
      }
    ]
  },

  // ==========================================================================
  // 10. MÔN MĨ THUẬT (LỚP 6, 7, 8, 9)
  // ==========================================================================
  {
    id: 'mithuat6-b1',
    title: 'Bài 1: Ngôn ngữ thị giác - Các yếu tố tạo hình trong Mĩ thuật (Chấm, nét, hình, mảng, màu sắc)',
    subjectId: 'mi-thuat',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề: Yếu tố tạo hình',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Mĩ thuật 6',
    pageReference: 'Trang 6 - 13',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết các yếu tố tạo hình cơ bản trong mĩ thuật: chấm, nét, hình, mảng, màu sắc, không gian.',
      'Biết cách phối hợp các nét vẽ thẳng, cong, gấp khúc để thể hiện cảm xúc trong tranh.',
      'Sáng tạo bức tranh sinh động về trường lớp THCS Mỹ Hòa bằng màu sắc tương phản hài hòa.'
    ],
    summary: 'Tìm hiểu ngôn ngữ thị giác cơ bản của hội họa: chấm, nét, hình, mảng, hòa sắc màu nóng - màu lạnh và thực hành sáng tạo nghệ thuật.',
    keyPoints: [
      'Chấm: Yếu tố tạo hình cơ bản nhất, tập hợp nhiều chấm tạo nên sắc độ và khối.',
      'Nét: Chuyển động của chấm, có nét thẳng, nét lượn sóng, nét đứt, biểu thị cảm xúc mạnh mẽ hoặc êm dịu.',
      'Màu sắc: Màu cơ bản (Đỏ, Vàng, Lam), màu nhị hợp (Cam, Lục, Tím), gam màu nóng gợi ấm áp, gam màu lạnh gợi mát mẻ.'
    ],
    contentMarkdown: `### 1. Ngôn ngữ tạo hình trong Mĩ thuật
* Bất kỳ một bức tranh nghệ thuật nào cũng được tạo nên từ sự kết hợp hài hòa của các yếu tố cơ bản:
  * **Chấm**: Điểm xuất phát của mọi hình ảnh thị giác.
  * **Nét vẽ**: Định hình ranh giới, biểu đạt cảm xúc và nhịp điệu của tác phẩm.
  * **Hình và Mảng**: Không gian hai chiều được bao bọc bởi các đường nét khép kín.
  * **Màu sắc**: Đem lại sức sống và truyền tải rung cảm tâm hồn của người họa sĩ.

### 2. Hòa sắc và ứng dụng
* Phối màu tương phản (Đỏ - Lục, Vàng - Tím) tạo ấn tượng nổi bật.
* Phối màu tương đồng mang lại cảm giác êm dịu, hài hòa.`,
    sampleExercises: [
      {
        question: 'Ba màu cơ bản (màu gốc) trong hội họa là những màu nào?',
        solution: 'Ba màu cơ bản là: Đỏ (Red), Vàng (Yellow) và Lam (Blue).'
      }
    ]
  },
  {
    id: 'mithuat7-b1',
    title: 'Bài 1: Di sản Mĩ thuật thời Lý - Trần và Họa tiết hoa văn truyền thống',
    subjectId: 'mi-thuat',
    grade: 7,
    semester: 1,
    chapter: 'Chủ đề: Mĩ thuật truyền thống Việt Nam',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Mĩ thuật 7',
    pageReference: 'Trang 8 - 15',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nhận biết nét đặc trưng mĩ thuật thời Lý - Trần qua kiến trúc chùa Một Cột, tháp Phổ Minh và tượng rồng.',
      'Phân tích vẻ đẹp uyển chuyển, mềm mại của hình tượng Rồng thời Lý hình chữ S.',
      'Mô phỏng và vẽ trang trí đĩa gốm hoa nâu bằng họa tiết cánh sen thời Trần.'
    ],
    summary: 'Tìm hiểu thời kỳ đỉnh cao của nghệ thuật điêu khắc và gốm cổ truyền Việt Nam thế kỷ XI - XIV.',
    keyPoints: [
      'Rồng thời Lý: Thân tròn trịa, uốn lượn nhịp nhàng hình sóng nước hình chữ S thu nhỏ dần về đuôi, không có sừng, hiền hòa, thanh thoát.',
      'Kiến trúc thời Lý gắn liền với Phật giáo hưng thịnh: Chùa Một Cột, tháp Phật Tích.',
      'Gốm hoa nâu thời Trần: Nét vẽ phóng khoáng, mộc mạc, đậm chất khỏe khoắn của hào khí Đông A.'
    ],
    contentMarkdown: `### 1. Hình tượng Rồng thời Lý
* Là biểu tượng văn hóa thiêng liêng và đỉnh cao của nghệ thuật tạo hình Đại Việt.
* Thân rồng khúc khuỷu mềm mại, đầu ngẩng cao, ngậm ngọc minh châu, chân có 3 - 5 móng vuốt nhỏ nhắn.

### 2. Gốm hoa nâu thời Trần
* Sử dụng men màu nâu sắt trên nền men trắng ngà, họa tiết hoa sen, sóng nước, chiến binh cưỡi ngựa thể hiện tinh thần thượng võ và yêu chuộng hòa bình.`,
    sampleExercises: [
      {
        question: 'Đặc điểm nhận dạng nổi bật nhất của hình tượng Rồng thời Lý so với các thời kỳ khác là gì?',
        solution: 'Thân rồng uốn lượn mềm mại hình lượn sóng chữ S khúc khuỷu thu nhỏ dần về phía đuôi, đầu không có sừng, mang vẻ đẹp hiền hòa, thanh thoát.'
      }
    ]
  },
  {
    id: 'mithuat8-b1',
    title: 'Bài 1: Nghệ thuật Điêu khắc Phù điêu và Tạo hình không gian 3D',
    subjectId: 'mi-thuat',
    grade: 8,
    semester: 1,
    chapter: 'Chủ đề: Điêu khắc',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Mĩ thuật 8',
    pageReference: 'Trang 8 - 17',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Hiểu khái niệm phù điêu (chạm nổi, chạm chìm) trong nghệ thuật điêu khắc trang trí công trình kiến trúc.',
      'Biết cách nặn, đắp nổi hình ảnh hoa lá, con vật hoặc chân dung bằng đất sét / đất nặn.',
      'Cảm nhận được mối quan hệ giữa ánh sáng, bóng đổ và độ lồi lõm của hình khối 3 chiều.'
    ],
    summary: 'Kỹ thuật tạo hình điêu khắc phù điêu đắp nổi, chuyển hóa tranh vẽ phẳng 2D thành tác phẩm không gian nổi khối sinh động.',
    keyPoints: [
      'Phù điêu (Relief) là hình thức tạo hình đắp nổi hoặc khoét lõm trên một mặt phẳng nền.',
      'Các loại phù điêu: Phù điêu thấp (Bas-relief) và phù điêu cao (High-relief).',
      'Chất liệu thông dụng: Đất sét, thạch cao, xi măng, gỗ, đồng.'
    ],
    contentMarkdown: `### 1. Phù điêu là gì?
* Phù điêu là một thể loại điêu khắc gắn liền với mặt phẳng nền. Các khối hình nổi lên hoặc chìm xuống so với bề mặt nền phẳng tạo ra hiệu ứng thị giác ba chiều dưới ánh sáng chiếu rọi.

### 2. Các bước thực hiện đắp phù điêu
1. Lên phác thảo bố cục trên giấy.
2. Dàn phẳng một lớp đất sét làm mặt bảng nền.
3. Chuyển hình vẽ lên bảng đất và đắp thêm đất từng lớp để tạo khối nổi từ thấp đến cao.
4. Dùng dao tỉa gọt chi tiết và hoàn thiện bề mặt.`,
    sampleExercises: [
      {
        question: 'Phù điêu khác với tượng tròn (tượng toàn khối) ở điểm cốt lõi nào?',
        solution: 'Phù điêu luôn gắn liền với một mặt phẳng nền phía sau, trong khi tượng tròn có thể nhìn ngắm được trọn vẹn từ mọi hướng 360 độ xung quanh.'
      }
    ]
  },
  {
    id: 'mithuat9-b1',
    title: 'Bài 1: Mĩ thuật Hiện đại thế giới - Trường phái Ấn tượng và Lập thể',
    subjectId: 'mi-thuat',
    grade: 9,
    semester: 1,
    chapter: 'Chủ đề: Lịch sử Mĩ thuật hiện đại',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Mĩ thuật 9',
    pageReference: 'Trang 8 - 18',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nắm được bối cảnh ra đời và đặc điểm của trường phái Ấn tượng (Impressionism) và trường phái Lập thể (Cubism).',
      'Phân tích các tác phẩm danh họa kinh điển: "Ấn tượng mặt trời mọc" (Claude Monet), "Đêm đầy sao" (Vincent van Gogh), "Những cô nàng ở Avignon" (Pablo Picasso).',
      'Thực hành vẽ tranh ứng dụng kỹ thuật mảng hình lập thể độc đáo.'
    ],
    summary: 'Cuộc cách mạng thị giác cuối thế kỷ XIX đầu thế kỷ XX: Từ bỏ lối vẽ tả thực cổ điển để tôn vinh ánh sáng, màu sắc và cấu trúc hình học trừu tượng.',
    keyPoints: [
      'Trường phái Ấn tượng: Vẽ trực tiếp ngoài trời để bắt trọn khoảnh khắc biến ảo của ánh sáng mặt trời theo thời gian.',
      'Van Gogh (Hậu Ấn tượng): Nét cọ cuồn cuộn mãnh liệt, màu vàng rực rỡ bộc lộ thế giới nội tâm xáo động.',
      'Trường phái Lập thể: Chia nhỏ vật thể thành các khối hình học (hình lập phương, hình nón) và quan sát vật thể từ nhiều góc nhìn cùng một lúc.'
    ],
    contentMarkdown: `### 1. Trường phái Ấn tượng (Impressionism)
* Bắt đầu từ bức tranh "Ấn tượng mặt trời mọc" (1872) của họa sĩ Claude Monet.
* Các họa sĩ không pha trộn màu trên bảng màu mà đặt các vệt màu nguyên chất cạnh nhau ngay trên mặt toan để mắt người xem tự tổng hợp màu dưới ánh sáng tự nhiên.

### 2. Trường phái Lập thể (Cubism)
* Do Pablo Picasso và Georges Braque khởi xướng năm 1907.
* Phá vỡ quy tắc phối cảnh xa gần truyền thống để tái hiện không gian đa chiều trên cùng một mặt phẳng tranh.`,
    sampleExercises: [
      {
        question: 'Ai là tác giả của kiệt tác hội họa "Đêm đầy sao" (The Starry Night) với những vòng xoáy ánh trăng và bầu trời cuồn cuộn?',
        solution: 'Danh họa người Hà Lan Vincent van Gogh.'
      }
    ]
  },

  // ==========================================================================
  // 11. MÔN GIÁO DỤC THỂ CHẤT (LỚP 6, 7, 8, 9)
  // ==========================================================================
  {
    id: 'thechat6-b1',
    title: 'Bài 1: Kỹ thuật Đội hình đội ngũ và Bài tập thể dục phát triển chung',
    subjectId: 'giao-duc-the-chat',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề: Đội hình đội ngũ & Thể dục rèn luyện',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Giáo dục thể chất 6',
    pageReference: 'Trang 6 - 12',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Thực hiện chuẩn xác khẩu lệnh và động tác: Đứng nghiêm, đứng nghỉ, quay phải, quay trái, quay đằng sau.',
      'Biết cách dóng hàng dọc, dóng hàng ngang, điểm số báo cáo.',
      'Thuộc và tập đều các động tác vươn thở, tay, chân, lườn trong bài thể dục buổi sáng.'
    ],
    summary: 'Rèn luyện tác phong nhanh nhẹn, kỷ luật tập thể qua các bài tập đội hình đội ngũ và bài thể dục phát triển thể lực toàn diện.',
    keyPoints: [
      'Đứng nghiêm: Gót chân chạm nhau, hai bàn chân mở hình chữ V góc khoảng 60 độ, ngực ưỡn, mắt nhìn thẳng.',
      'Quay phải: Lấy gót chân phải và mũi chân trái làm trụ, quay một góc 90 độ sang phải.',
      'Khởi động kỹ các khớp cổ tay, cổ chân, khớp gối trước khi vận động mạnh để tránh chấn thương.'
    ],
    contentMarkdown: `### 1. Ý nghĩa của rèn luyện thể chất
* Thể dục thể thao giúp tăng cường sức đề kháng, phát triển chiều cao, giữ cho tinh thần luôn tỉnh táo và sảng khoái trong học tập.

### 2. Kỹ thuật Đội hình đội ngũ căn bản
1. **Khẩu lệnh "Nghiêm!"**: Thân người đứng thẳng, hai tay buông thẳng tự nhiên, các ngón tay khép hờ.
2. **Khẩu lệnh "Nghỉ!"**: Dồn trọng tâm sang một chân, chân kia hơi chùng xuống tự nhiên.
3. **Kỹ thuật quay đằng sau**: Quay một góc 180 độ từ bên phải ra sau, lấy gót chân phải và mũi chân trái làm trụ.`,
    sampleExercises: [
      {
        question: 'Tại sao trước khi chạy bền hoặc đá bóng, chúng ta bắt buộc phải khởi động kỹ các khớp?',
        solution: 'Khởi động giúp làm nóng cơ bắp, tăng lượng máu lưu thông đến các chi và tiết chất nhờn ở ổ khớp, giúp tránh trật khớp, chuột rút và căng cơ.'
      }
    ]
  },
  {
    id: 'thechat7-b1',
    title: 'Bài 1: Kỹ thuật Chạy cự ly ngắn 60m (Xuất phát thấp và Chạy lao)',
    subjectId: 'giao-duc-the-chat',
    grade: 7,
    semester: 1,
    chapter: 'Chủ đề: Chạy cự ly ngắn',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Giáo dục thể chất 7',
    pageReference: 'Trang 8 - 15',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Thực hiện đúng 3 hiệu lệnh xuất phát thấp: "Vào chỗ!", "Sẵn sàng!", "Chạy!".',
      'Thành thạo kỹ thuật chạy lao sau xuất phát và chuyển sang chạy giữa quãng nhịp nhàng.',
      'Biết cách đánh tay phối hợp với bước chân để đạt vận tốc tối đa.'
    ],
    summary: 'Rèn luyện tốc độ phản xạ và sức bật bứt tốc cự ly 60m trong điền kinh học đường.',
    keyPoints: [
      'Hiệu lệnh "Vào chỗ": Tiến lại bàn đạp xuất phát, đặt chân thuận phía trước, hai tay chống sau vạch xuất phát.',
      'Hiệu lệnh "Sẵn sàng": Từ từ nâng mông cao hơn vai, dồn trọng tâm về hai tay, nín thở tập trung cao độ.',
      'Hiệu lệnh "Chạy": Đạp mạnh hai chân vào bàn đạp, lao người về phía trước với góc nghiêng khoảng 45 độ.'
    ],
    contentMarkdown: `### 1. Bốn giai đoạn của chạy cự ly ngắn
1. **Xuất phát**: Tận dụng bàn đạp xuất phát thấp để tạo lực đẩy ban đầu tối đa.
2. **Chạy lao**: Thân người ngả về trước, bước chân dài dần và tần số bước tăng nhanh.
3. **Chạy giữa quãng**: Duy trì tốc độ tối đa, đánh tay nhịp nhàng so le với chân.
4. **Về đích**: Chủ động gập ngực chạm dây đích, không nhảy vọt hoặc dừng lại đột ngột.`,
    sampleExercises: [
      {
        question: 'Khi về đích cự ly 60m, tại sao vận động viên không được phanh dừng lại đột ngột ngay sau vạch đích?',
        solution: 'Vì dừng lại đột ngột theo quán tính có thể gây ngã chúi về trước, đứt dây chằng hoặc choáng váng do tụt huyết áp. Cần chạy giảm tốc độ dần dần qua vạch đích.'
      }
    ]
  },
  {
    id: 'thechat8-b1',
    title: 'Bài 1: Kỹ thuật Nhảy xa kiểu ngồi (Chạy đà, Giậm nhảy và Tiếp đất)',
    subjectId: 'giao-duc-the-chat',
    grade: 8,
    semester: 1,
    chapter: 'Chủ đề: Nhảy xa',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Giáo dục thể chất 8',
    pageReference: 'Trang 8 - 16',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Xác định cự ly chạy đà và đo đà chính xác (khoảng 14 - 18 bước chạy đà).',
      'Thực hiện mạnh mẽ động tác giậm nhảy trên ván giậm nhảy bằng chân thuận.',
      'Tiếp đất an toàn vào hố cát: Co gập gối để hoãn xung, người đổ về phía trước tránh ngã ngửa ra sau.'
    ],
    summary: 'Kỹ thuật nhảy xa kiểu ngồi giúp học sinh phát triển sức bật của đôi chân và phối hợp nhịp nhàng các giai đoạn chuyển động.',
    keyPoints: [
      'Bốn giai đoạn nhảy xa: Chạy đà -> Giậm nhảy -> Bay trên không -> Tiếp đất.',
      'Giai đoạn giậm nhảy là quan trọng nhất, quyết định góc bay (khoảng 20 - 24 độ) và vận tốc ban đầu.',
      'Khi tiếp đất hai chân chạm cát cùng lúc, nhanh chóng gập khớp gối để giảm chấn động lên cột sống.'
    ],
    contentMarkdown: `### 1. Kỹ thuật Giậm nhảy
* Đặt chân giậm nhảy chạm vào ván bằng cả bàn chân, lập tức đạp duỗi hết các khớp hông, gối, cổ chân để đẩy toàn bộ thân người bay lên cao về phía trước.

### 2. Kỹ thuật Bay trên không và Tiếp đất kiểu ngồi
* Khi bay trên không: Đưa chân giậm nhảy về phía trước song song với chân lăng, hai tay vung ra trước giống tư thế ngồi xổm trên không.
* Tiếp đất bằng hai gót chân, lập tức khuỵu gối để triệt tiêu phản lực từ hố cát.`,
    sampleExercises: [
      {
        question: 'Trong nhảy xa, giai đoạn nào đóng vai trò quan trọng nhất quyết định trực tiếp đến thành tích cự ly?',
        solution: 'Giai đoạn Giậm nhảy (quyết định vận tốc ban đầu và góc bay của cơ thể).'
      }
    ]
  },
  {
    id: 'thechat9-b1',
    title: 'Bài 1: Kỹ thuật Dẫn bóng và Ném rổ một tay trên vai môn Bóng rổ',
    subjectId: 'giao-duc-the-chat',
    grade: 9,
    semester: 1,
    chapter: 'Chủ đề: Môn thể thao tự chọn - Bóng rổ',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Giáo dục thể chất 9',
    pageReference: 'Trang 8 - 17',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Thực hiện kỹ thuật dẫn bóng tại chỗ và dẫn bóng di chuyển luồn cọc bằng các ngón tay (không dùng lòng bàn tay đập bóng).',
      'Thành thục tư thế ném rổ một tay trên vai: Chân - gối - hông - tay - cổ tay tạo lực đẩy liên hoàn.',
      'Nắm vững luật bóng rổ cơ bản: Lỗi chạy bước, lỗi hai lần dẫn bóng (Double dribble).'
    ],
    summary: 'Rèn luyện kỹ năng khéo léo, sức mạnh cơ bắp và tư duy chiến thuật thi đấu phối hợp đồng đội môn bóng rổ.',
    keyPoints: [
      'Dẫn bóng: Dùng các đầu ngón tay xòe rộng ấn bóng xuống mặt sàn nhịp nhàng, mắt ngước nhìn bao quát sân, không nhìn chằm chằm vào quả bóng.',
      'Ném rổ một tay trên vai: Khuỷu tay hướng về phía rổ, ngón tay miết bóng xoáy ngược để bóng bay theo hình cầu vồng vòng cung đẹp mắt.',
      'Bóng rổ giúp thanh thiếu niên phát triển chiều cao vượt bậc và tinh thần đồng đội keo sơn.'
    ],
    contentMarkdown: `### 1. Kỹ thuật Dẫn bóng cơ bản
* Giữ trọng tâm cơ thể hơi thấp, đầu gối chùng, lưng thẳng.
* Dùng các đầu ngón tay đẩy bóng xuống sân sao cho bóng nảy ngang thắt lưng.

### 2. Kỹ thuật Ném rổ một tay trên vai
1. Chân bên tay ném đặt hơi chếch lên phía trước.
2. Nâng bóng lên phía trước trán, góc giữa cánh tay và cẳng tay khoảng 90 độ.
3. Đạp chân duỗi thẳng gối, vươn cao cánh tay và gập nhẹ cổ tay đẩy bóng bay theo quỹ đạo vòng cung vào vành rổ.`,
    sampleExercises: [
      {
        question: 'Trong môn bóng rổ, khi một cầu thủ đang dẫn bóng sau đó cầm giữ bóng bằng cả hai tay rồi lại tiếp tục dẫn bóng tiếp thì bị phạm lỗi gì?',
        solution: 'Lỗi hai lần dẫn bóng (Double dribble), trọng tài sẽ phạt mất quyền kiểm soát bóng và trao bóng biên cho đội đối phương.'
      }
    ]
  },

  // ==========================================================================
  // 12. MÔN HOẠT ĐỘNG TRẢI NGHIỆM, HƯỚNG NGHIỆP (LỚP 6, 7, 8, 9)
  // ==========================================================================
  {
    id: 'hdtn6-b1',
    title: 'Chủ đề 1: Khám phá trường THCS Mỹ Hòa và Xây dựng nếp sống học tập tự giác',
    subjectId: 'hoat-dong-trai-nghiem',
    grade: 6,
    semester: 1,
    chapter: 'Chủ đề 1: Em với nhà trường',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Hoạt động trải nghiệm 6',
    pageReference: 'Trang 5 - 11',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Tìm hiểu truyền thống và các phòng ban, thư viện, phòng máy tính của Trường THCS Mỹ Hòa.',
      'Lập thời gian biểu khoa học cân đối giữa học tập, thể thao và giúp đỡ gia đình.',
      'Rèn luyện kỹ năng tự phục vụ và xây dựng tình bạn đoàn kết, gắn bó trong lớp.'
    ],
    summary: 'Hướng dẫn học sinh lớp 6 nhanh chóng thích nghi với môi trường trung học cơ sở, xây dựng phương pháp học tập chủ động và văn hóa ứng xử học đường.',
    keyPoints: [
      'Khác biệt giữa Tiểu học và THCS: Nhiều môn học hơn, nhiều thầy cô bộ môn phụ trách, cần tính tự học cao.',
      'Nguyên tắc quản lý thời gian hiệu quả: Lập danh sách việc cần làm (To-do list), ưu tiên việc quan trọng trước.',
      'Văn hóa học đường Mỹ Hòa: Kính thầy, mến bạn, giữ gìn vệ sinh khuôn viên trường lớp xanh - sạch - đẹp.'
    ],
    contentMarkdown: `### 1. Thích ứng với môi trường học tập mới tại THCS Mỹ Hòa
* Bước vào lớp 6 là một bước ngoặt lớn. Các em được học tập với nhiều thầy cô giáo viên bộ môn tâm huyết, tham gia các phòng thực hành thí nghiệm và câu lạc bộ Tin học sáng tạo.
* **Bí quyết hòa nhập**: Hãy cởi mở mỉm cười chào hỏi thầy cô, chủ động giúp đỡ bạn bè cùng bàn và tích cực giơ tay phát biểu xây dựng bài.

### 2. Thiết lập Thời gian biểu cá nhân
* **Buổi sáng**: Thức dậy lúc 6h00, tập thể dục, ăn sáng đầy đủ dinh dưỡng và có mặt tại trường trước 6h45.
* **Buổi chiều**: Tham gia các hoạt động thể thao (cầu lông, bóng rổ), phụ giúp cha mẹ việc nhà.
* **Buổi tối**: Dành 2 tiếng ôn bài và chuẩn bị sách vở cho ngày hôm sau theo đúng thời khóa biểu.`,
    sampleExercises: [
      {
        question: 'Hãy nêu 3 thói quen học tập tốt mà một học sinh lớp 6 cần rèn luyện ngay từ đầu năm học?',
        solution: '1. Ghi chép bài đầy đủ và ôn lại bài ngay trong ngày; 2. Tự giác làm bài tập về nhà trước khi chơi game; 3. Chủ động hỏi thầy cô những phần kiến thức chưa hiểu rõ.'
      }
    ]
  },
  {
    id: 'hdtn7-b1',
    title: 'Chủ đề 1: Phát triển kỹ năng hợp tác nhóm và Quản lý tài chính cá nhân',
    subjectId: 'hoat-dong-trai-nghiem',
    grade: 7,
    semester: 1,
    chapter: 'Chủ đề: Rèn luyện bản thân',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Hoạt động trải nghiệm 7',
    pageReference: 'Trang 6 - 14',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Nắm được các bước làm việc nhóm hiệu quả: Phân công nhiệm vụ, lắng nghe ý kiến, giải quyết bất đồng hòa giải.',
      'Phân biệt giữa nhu cầu thiết yếu (Needs) và mong muốn sở thích cá nhân (Wants).',
      'Biết cách lập hũ tiết kiệm và chi tiêu thông minh bằng tiền tiêu vặt hoặc tiền thưởng.'
    ],
    summary: 'Rèn luyện kỹ năng mềm làm việc nhóm và thiết lập tư duy tài chính thông minh ngay từ lứa tuổi trung học cơ sở.',
    keyPoints: [
      'Làm việc nhóm: "Muốn đi nhanh hãy đi một mình, muốn đi xa hãy đi cùng nhau".',
      'Quy tắc chi tiêu 50/30/20: Dành ưu tiên cho đồ dùng học tập thiết yếu, dành một phần tiết kiệm cho các tình huống khẩn cấp.',
      'Ứng xử văn hóa khi nhóm có tranh cãi: Bình tĩnh lắng nghe, tập trung vào giải quyết vấn đề chứ không công kích cá nhân.'
    ],
    contentMarkdown: `### 1. Bí quyết Hợp tác nhóm thành công
* Phân công công việc rõ ràng theo đúng sở trường của từng bạn trong nhóm.
* Luôn tôn trọng sự khác biệt và lắng nghe phản biện với tinh thần cầu thị.

### 2. Quản lý tiền tiêu vặt hợp lý
* Trước khi mua một món đồ, hãy tự hỏi: "Mình có thực sự cần món này không, hay chỉ mua theo trào lưu nhất thời?".`,
    sampleExercises: [
      {
        question: 'Khi làm việc nhóm, nếu hai thành viên bất đồng quan điểm gay gắt, người nhóm trưởng nên xử lý như thế nào?',
        solution: 'Tạm dừng cuộc tranh luận, đề nghị hai bạn lần lượt trình bày lý lẽ một cách bình tĩnh, sau đó cả nhóm cùng phân tích điểm tích cực của từng ý kiến để chọn ra giải pháp tối ưu nhất.'
      }
    ]
  },
  {
    id: 'hdtn8-b1',
    title: 'Chủ đề 1: Khám phá các nghề truyền thống ở địa phương và Lập dự án tình nguyện',
    subjectId: 'hoat-dong-trai-nghiem',
    grade: 8,
    semester: 1,
    chapter: 'Chủ đề: Hướng nghiệp và Cộng đồng',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Hoạt động trải nghiệm 8',
    pageReference: 'Trang 8 - 18',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Khảo sát các nghề thủ công truyền thống tại Vĩnh Long (làm gốm đỏ, đan lát lục bình, sản xuất bánh tráng cù lao).',
      'Hiểu được yêu cầu về phẩm chất và kỹ năng cần có của người lao động trong từng ngành nghề.',
      'Thiết kế và triển khai một dự án tình nguyện vì môi trường hoặc quyên góp sách vở cho học sinh khó khăn.'
    ],
    summary: 'Gắn kết học sinh với cộng đồng địa phương, trân trọng giọt mồ hôi của người lao động và lan tỏa tinh thần sẻ chia nhân ái.',
    keyPoints: [
      'Nghề truyền thống là di sản văn hóa sống lưu giữ nét tài hoa của cha ông qua hàng thế kỷ.',
      'Quy trình xây dựng dự án thiện nguyện: Xác định mục tiêu -> Lập kế hoạch tài chính -> Phân công nhân sự -> Triển khai và Tổng kết đánh giá.',
      'Nuôi dưỡng lòng trắc ẩn và tinh thần trách nhiệm xã hội ở học sinh THCS.'
    ],
    contentMarkdown: `### 1. Khám phá làng nghề truyền thống
* Trải nghiệm thực tế tại các cơ sở thủ công giúp học sinh thấu hiểu giá trị của lao động chân chính và sự kiên trì nhẫn nại.

### 2. Dự án "Tủ sách yêu thương" tại THCS Mỹ Hòa
* Phát động phong trào quyên góp sách giáo khoa cũ, sách kỹ năng sống cho các em học sinh lớp dưới có hoàn cảnh khó khăn.`,
    sampleExercises: [
      {
        question: 'Hãy nêu 3 bước cần chuẩn bị trước khi đi phỏng vấn một nghệ nhân làng nghề truyền thống?',
        solution: '1. Tìm hiểu trước thông tin về làng nghề; 2. Soạn sẵn danh sách các câu hỏi phỏng vấn ngắn gọn, lịch sự; 3. Chuẩn bị sổ tay, bút hoặc máy ghi âm điện thoại.'
      }
    ]
  },
  {
    id: 'hdtn9-b1',
    title: 'Chủ đề 1: Nhận thức bản thân và Định hướng con đường sau THCS',
    subjectId: 'hoat-dong-trai-nghiem',
    grade: 9,
    semester: 1,
    chapter: 'Chủ đề: Định hướng nghề nghiệp',
    bookSeries: 'Sách giáo khoa hiện hành',
    bookTitle: 'SGK Hoạt động trải nghiệm 9',
    pageReference: 'Trang 6 - 16',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Tự đánh giá năng lực học tập, sở thích, tính cách và điều kiện kinh tế gia đình để định hướng ngã rẽ sau tốt nghiệp lớp 9.',
      'Hiểu rõ các con đường học tập: Vào trường THPT công lập, THPT tư thục, Trung tâm GDTX, hoặc trường Trung cấp nghề (học nghề kết hợp văn hóa).',
      'Xây dựng kế hoạch ôn thi tuyển sinh vào lớp 10 khoa học, giảm thiểu áp lực căng thẳng tâm lý thi cử.'
    ],
    summary: 'Bước đệm vững chắc giúp học sinh lớp 9 THCS Mỹ Hòa tự tin vượt qua kỳ thi chuyển cấp quan trọng và định hình tương lai xán lạn.',
    keyPoints: [
      'Thuyết đa trí thông minh của Howard Gardner: Mỗi con người đều có những thế mạnh trí tuệ riêng biệt (ngôn ngữ, logic toán, âm nhạc, không gian, vận động...).',
      'Các hướng đi sau lớp 9 đều có cơ hội thành công nếu có sự đam mê và quyết tâm học tập suốt đời.',
      'Phương pháp giữ gìn sức khỏe mùa thi: Ngủ đủ 7 - 8 tiếng, ăn uống đầy đủ dinh dưỡng, luyện tập thể dục nhẹ nhàng.'
    ],
    contentMarkdown: `### 1. Tự đánh giá năng lực bản thân
* Hãy lập ma trận phân tích SWOT bản thân:
  * **S (Strengths)**: Điểm mạnh của em là gì? (Toán, Văn, Tiếng Anh, giao tiếp khéo léo...).
  * **W (Weaknesses)**: Điểm yếu cần khắc phục (dễ mất tập trung, ngại hỏi...).
  * **O (Opportunities)**: Cơ hội hỗ trợ từ gia đình, thầy cô trường THCS Mỹ Hòa.
  * **T (Threats)**: Thách thức về tỉ lệ chọi điểm thi vào các trường THPT.

### 2. Các ngã rẽ sau tốt nghiệp THCS
1. **Thi vào các trường THPT công lập**: Dành cho học sinh có học lực khá - giỏi và yêu thích con đường học thuật.
2. **Học Trung cấp nghề đào tạo 9+**: Vừa học văn hóa vừa học nghề kỹ thuật (cơ khí, công nghệ thông tin, đồ họa), sớm có việc làm ổn định phụ giúp gia đình.`,
    sampleExercises: [
      {
        question: 'Hãy kể tên 2 trường THPT trên địa bàn thị xã Bình Minh hoặc huyện lân cận mà học sinh THCS Mỹ Hòa thường đăng ký nguyện vọng thi tuyển vào lớp 10?',
        solution: 'Trường THPT Bình Minh, Trường THPT Hoàng Thái Hiếu.'
      }
    ]
  },

  // ==========================================================================
  // 13. TÀI LIỆU GIÁO DỤC ĐỊA PHƯƠNG TỈNH VĨNH LONG (LỚP 6, 7, 8, 9)
  // ==========================================================================
  {
    id: 'gddp6-b1',
    title: 'Chủ đề 1: Vị trí địa lí, Địa hình và Sông ngòi tỉnh Vĩnh Long',
    subjectId: 'giao-duc-dia-phuong',
    grade: 6,
    semester: 1,
    chapter: 'Địa lí địa phương tỉnh Vĩnh Long',
    bookSeries: 'Tài liệu GDĐP tỉnh Vĩnh Long',
    bookTitle: 'Tài liệu Giáo dục địa phương Vĩnh Long Lớp 6',
    pageReference: 'Trang 5 - 12',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Xác định được vị trí địa lí của tỉnh Vĩnh Long nằm ở trung tâm vùng đồng bằng sông Cửu Long, kẹp giữa hai nhánh sông Tiền và sông Hậu.',
      'Nêu được đặc điểm địa hình đồng bằng bằng phẳng, đất phù sa màu mỡ và hệ thống kênh rạch chằng chịt.',
      'Hiểu được ảnh hưởng của điều kiện tự nhiên đối với đời sống sản xuất cây ăn trái và giao thông đường thủy của nhân dân Vĩnh Long.'
    ],
    summary: 'Tìm hiểu về mảnh đất quê hương Vĩnh Long hiền hòa, vị trí đắc địa giữa đôi dòng sông Tiền - sông Hậu và mạng lưới kênh rạch trù phú.',
    keyPoints: [
      'Vĩnh Long tiếp giáp các tỉnh: Tiền Giang, Bến Tre, Trà Vinh, Sóc Trăng, Đồng Tháp, Hậu Giang và thành phố Cần Thơ.',
      'Khí hậu nhiệt đới gió mùa cận xích đạo, lượng mưa dồi dào, thuận lợi phát triển vựa trái cây nhiệt đới quanh năm.',
      'Sông Cổ Chiên và sông Mang Thít là những tuyến giao thông thủy huyết mạch chuyên chở hàng hóa nông sản.'
    ],
    contentMarkdown: `### 1. Vị trí địa lí đắc địa của tỉnh Vĩnh Long
* Vĩnh Long nằm ở trung tâm của đồng bằng sông Cửu Long, được bao bọc bởi dòng sông Tiền ở phía bắc và sông Hậu ở phía nam.
* Nhờ vị trí trung tâm, Vĩnh Long là đầu mối giao thương đường bộ và đường thủy kết nối các tỉnh Tây Nam Bộ với Thành phố Hồ Chí Minh qua các cây cầu thế kỷ: Cầu Mỹ Thuận, cầu Cần Thơ, cầu Cổ Chiên.

### 2. Mạng lưới sông ngòi và đất phù sa màu mỡ
* Lượng phù sa bồi đắp hàng năm của sông Tiền và sông Hậu tạo nên những cù lao trù phú (cù lao An Bình, cù lao Lục Sĩ Thành), là thiên đường của các vườn cây ăn trái đặc sản sầu riêng, chôm chôm, bưởi, nhãn.`,
    sampleExercises: [
      {
        question: 'Tỉnh Vĩnh Long nằm kẹp giữa hai con sông lớn nào của đồng bằng sông Cửu Long?',
        solution: 'Sông Tiền và Sông Hậu.'
      }
    ]
  },
  {
    id: 'gddp7-b1',
    title: 'Chủ đề 1: Danh nhân văn hóa Vĩnh Long và Vương quốc gốm đỏ Mang Thít',
    subjectId: 'giao-duc-dia-phuong',
    grade: 7,
    semester: 1,
    chapter: 'Văn hóa - Lịch sử Vĩnh Long',
    bookSeries: 'Tài liệu GDĐP tỉnh Vĩnh Long',
    bookTitle: 'Tài liệu Giáo dục địa phương Vĩnh Long Lớp 7',
    pageReference: 'Trang 8 - 18',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Tìm hiểu cuộc đời và sự nghiệp của các danh nhân đất Vĩnh Long: Nhà thơ chí sĩ Nguyễn Thông, Tiến sĩ Phan Thanh Giản.',
      'Khám phá di sản kiến trúc lò gạch gốm đỏ Mang Thít bên bờ sông Thầy Cai - dòng sông gốm đỏ độc nhất vô nhị ở Đông Nam Á.',
      'Tự hào và có ý thức giữ gìn các giá trị di sản văn hóa truyền thống của quê hương.'
    ],
    summary: 'Tôn vinh mảnh đất địa linh nhân kiệt Vĩnh Long với các bậc sĩ phu yêu nước và làng nghề lò gạch gốm đỏ nung truyền thống nức tiếng gần xa.',
    keyPoints: [
      'Văn Thánh Miếu Vĩnh Long được xây dựng từ năm 1864, là một trong những trung tâm Nho học và biểu tượng hiếu học của Nam Bộ.',
      'Làng nghề gốm đỏ Mang Thít: Hàng ngàn lò gạch hình chóp nón mọc san sát bên bờ sông Thầy Cai tạo nên khung cảnh ngoạn mục được mệnh danh là "Vương quốc gốm đỏ".',
      'Đất sét đỏ Vĩnh Long có hàm lượng khoáng chất đặc biệt tạo nên sản phẩm gốm nung có màu đỏ hồng tự nhiên pha đốm trắng bạc tuyệt đẹp.'
    ],
    contentMarkdown: `### 1. Văn Thánh Miếu Vĩnh Long - Biểu tượng hiếu học phương Nam
* Được xây dựng dưới sự khởi xướng của Kinh lược sứ Phan Thanh Giản và Đốc học Nguyễn Thông nhằm cổ vũ tinh thần học tập, lưu giữ sĩ khí của người dân Nam Kỳ.

### 2. Di sản đương đại "Vương quốc gốm đỏ" Mang Thít
* Nghề nung gạch gốm ở Mang Thít có lịch sử hơn 100 năm. Các lò gạch hình vòm cung cao vút như những tòa tháp cổ kính soi bóng xuống dòng kênh rạch.
* Tỉnh Vĩnh Long hiện đang triển khai đề án di sản đương đại Mang Thít biến nơi đây thành điểm du lịch sinh thái và văn hóa hấp dẫn du khách quốc tế.`,
    sampleExercises: [
      {
        question: 'Tại sao huyện Mang Thít (tỉnh Vĩnh Long) lại được mệnh danh là "Vương quốc gốm đỏ"?',
        solution: 'Vì nơi đây tập trung mật độ dày đặc hàng ngàn lò gạch gốm nung hình vòm cổ kính trải dài ven sông rạch, sản xuất ra dòng sản phẩm gốm đất sét nung màu đỏ hồng đặc trưng không nơi nào có được.'
      }
    ]
  },
  {
    id: 'gddp8-b1',
    title: 'Chủ đề 1: Lịch sử đấu tranh cách mạng Vĩnh Long và Căn cứ kháng chiến Cái Ngang',
    subjectId: 'giao-duc-dia-phuong',
    grade: 8,
    semester: 1,
    chapter: 'Lịch sử truyền thống cách mạng',
    bookSeries: 'Tài liệu GDĐP tỉnh Vĩnh Long',
    bookTitle: 'Tài liệu Giáo dục địa phương Vĩnh Long Lớp 8',
    pageReference: 'Trang 10 - 20',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Trình bày diễn biến và ý nghĩa của cuộc Khởi nghĩa Nam Kỳ (11/1940) tại tỉnh Vĩnh Long.',
      'Tìm hiểu di tích lịch sử Căn cứ Tỉnh ủy Vĩnh Long tại Cái Ngang (xã Phú Lộc, huyện Tam Bình).',
      'Cảm nhận lòng dũng cảm, kiên trung của quân và dân Vĩnh Long trong hai cuộc kháng chiến chống thực dân Pháp và đế quốc Mỹ.'
    ],
    summary: 'Giáo dục truyền thống yêu nước cách mạng qua di tích lịch sử Căn cứ Cái Ngang và những mốc son chói lọi của quân dân Vĩnh Long anh hùng.',
    keyPoints: [
      'Khởi nghĩa Nam Kỳ đêm 22 rạng sáng 23/11/1940: Tiếng súng khởi nghĩa vang dậy khắp quận Tam Bình, Vũng Liêm, Chợ Lách.',
      'Căn cứ Cái Ngang nằm giữa vùng đầm lầy, rặng dừa nước che chắn kiên cố, là cơ quan đầu não chỉ đạo cách mạng Vĩnh Long suốt thời kỳ kháng chiến chống Mỹ.',
      'Nhân dân Tam Bình kiên cường đào hầm bí mật nuôi giấu cán bộ, bám đất giữ làng.'
    ],
    contentMarkdown: `### 1. Khởi nghĩa Nam Kỳ năm 1940 tại Vĩnh Long
* Lá cờ đỏ sao vàng lần đầu tiên phấp phới tung bay trong cuộc khởi nghĩa Nam Kỳ, thổi bùng ngọn lửa đấu tranh giải phóng dân tộc khắp miền Tây Nam Bộ.

### 2. Khu di tích lịch sử cách mạng Căn cứ Cái Ngang
* Được xây dựng từ năm 1966 tại xã Phú Lộc, huyện Tam Bình. Căn cứ có hệ thống công sự, hầm chông, bãi mìn, hội trường ngầm dưới lòng đất che chở cán bộ Tỉnh ủy Vĩnh Long kiên cường bám trụ lãnh đạo cách mạng đến ngày toàn thắng 30/4/1975.`,
    sampleExercises: [
      {
        question: 'Khu di tích lịch sử Căn cứ Tỉnh ủy Vĩnh Long thời kỳ kháng chiến chống Mỹ tọa lạc tại địa phương nào?',
        solution: 'Căn cứ Cái Ngang (xã Phú Lộc, huyện Tam Bình, tỉnh Vĩnh Long).'
      }
    ]
  },
  {
    id: 'gddp9-b1',
    title: 'Chủ đề 1: Tấm gương sáng cố Thủ tướng Võ Văn Kiệt và Giáo sư Viện sĩ Trần Đại Nghĩa',
    subjectId: 'giao-duc-dia-phuong',
    grade: 9,
    semester: 1,
    chapter: 'Những người con ưu tú của quê hương Vĩnh Long',
    bookSeries: 'Tài liệu GDĐP tỉnh Vĩnh Long',
    bookTitle: 'Tài liệu Giáo dục địa phương Vĩnh Long Lớp 9',
    pageReference: 'Trang 8 - 20',
    orderIndex: 1,
    isPublished: true,
    reviewStatus: 'da_xac_nhan',
    learningObjectives: [
      'Tìm hiểu cuộc đời, sự nghiệp cách mạng và những cống hiến to lớn của cố Thủ tướng Võ Văn Kiệt (bác Sáu Dân) - nhà lãnh đạo kiệt xuất của công cuộc Đổi mới đất nước.',
      'Tìm hiểu tấm gương Giáo sư Viện sĩ Thiếu tướng Trần Đại Nghĩa - nhà khoa học quân sự lỗi lạc, "cha đẻ súng Bazooka và đạn SKZ" của Quân đội nhân dân Việt Nam.',
      'Noi gương các bậc tiền bối, nỗ lực học tập, rèn đức luyện tài để xây dựng quê hương Vĩnh Long ngày càng văn minh, giàu đẹp.'
    ],
    summary: 'Tự hào về hai người con kiệt xuất của quê hương Vĩnh Long: Bác Sáu Dân - kiến trúc sư của đường dây 500kV Bắc - Nam và Giáo sư Trần Đại Nghĩa - nhà bác học tận tụy vì nước vì dân.',
    keyPoints: [
      'Cố Thủ tướng Võ Văn Kiệt (1922 - 2008), sinh tại xã Trung Hiệp, huyện Vũng Liêm, tỉnh Vĩnh Long. Nhà lãnh đạo có tư duy đổi mới táo bạo, tác giả công trình Đường dây tải điện 500kV Bắc - Nam và công trình thoát lũ Tứ giác Long Xuyên.',
      'Giáo sư Trần Đại Nghĩa (1913 - 1997), tên thật là Phạm Quang Lễ, quê ở huyện Tam Bình, tỉnh Vĩnh Long. Từ bỏ cuộc sống giàu sang ở Pháp theo Bác Hồ về nước chế tạo vũ khí cho quân đội kháng chiến.',
      'Khu lưu niệm Thủ tướng Võ Văn Kiệt tại Vũng Liêm và Khu tưởng niệm GS Trần Đại Nghĩa tại Tam Bình là địa chỉ đỏ giáo dục truyền thống cho tuổi trẻ.'
    ],
    contentMarkdown: `### 1. Bác Sáu Dân (Võ Văn Kiệt) - Người truyền cảm hứng đổi mới
* Cố Thủ tướng Võ Văn Kiệt là tấm gương mẫu mực về phong cách lãnh đạo gần dân, lắng nghe nhân dân, dám nghĩ, dám làm, dám chịu trách nhiệm vì lợi ích của dân tộc.
* Những công trình thế kỷ in đậm dấu ấn của ông:
  * Đường dây truyền tải điện siêu cao áp 500kV Bắc - Nam (mạch 1).
  * Công trình thoát lũ ra biển Tây, ngọt hóa bán đảo Cà Mau đưa đồng bằng sông Cửu Long thành vựa lúa lớn nhất cả nước.
  * Đường Hồ Chí Minh huyền thoại.

### 2. Giáo sư Viện sĩ Trần Đại Nghĩa - Tấm lòng vì nước
* Vượt qua muôn vàn gian khó giữa núi rừng Việt Bắc, ông đã nghiên cứu và chế tạo thành công súng Bazooka, đạn không giật SKZ, góp phần quan trọng vào thắng lợi vĩ đại của hai cuộc kháng chiến vệ quốc.
* Cuộc đời thanh bạch, giản dị, một lòng phụng sự Tổ quốc của ông là tấm gương sáng ngời cho học sinh THCS Mỹ Hòa học tập và noi theo.`,
    sampleExercises: [
      {
        question: 'Giáo sư Viện sĩ Trần Đại Nghĩa có tên khai sinh thật là gì và quê quán ở huyện nào của tỉnh Vĩnh Long?',
        solution: 'Tên khai sinh thật là Phạm Quang Lễ, quê quán ở xã Tường Lộc, huyện Tam Bình, tỉnh Vĩnh Long.'
      }
    ]
  }
];

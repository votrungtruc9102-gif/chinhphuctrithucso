export interface ImagePuzzle {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  grade: number;
  targetClass?: '6A5' | '7A5' | '8A5' | '9A5' | 'all';
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hints: [string, string, string]; // Exactly 3 tiers of progressive hints
  synonyms: string[]; // Diacritic-insensitive keywords for short-answer typing
  points: number;
  explanation: string;
}

export const INITIAL_IMAGE_PUZZLES: ImagePuzzle[] = [
  // 1. LỚP 6A5 - LỊCH SỬ & ĐỊA LÍ: Trống đồng Đông Sơn
  {
    id: 'puz_1',
    title: 'Bảo vật thời đại kim khí Văn Lang',
    imageUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Trống đồng Đông Sơn với hoa văn ngôi sao nhiều cánh và đàn chim Lạc tung cánh',
    grade: 6,
    targetClass: '6A5',
    subject: 'Lịch sử & Địa lí',
    question: 'Hãy quan sát hình ảnh hoa văn hình sao trung tâm và đàn chim Lạc bay quanh. Đây là bảo vật khảo cổ học nổi tiếng nào của thời đại các vua Hùng?',
    options: ['Trống đồng Đông Sơn', 'Thạp đồng Đào Thịnh', 'Chuông đồng Cổ Loa', 'Bia đá Văn Miếu'],
    correctAnswer: 0,
    hints: [
      'Gợi ý 1 (Tổng quan): Di vật tiêu biểu nhất của nền văn hóa Đông Sơn thời đại đồ đồng thau Việt Nam.',
      'Gợi ý 2 (Đặc điểm): Thân và mặt trống đúc bằng đồng thiếc, chạm khắc hoa văn người chèo thuyền, giã gạo và chim Lạc.',
      'Gợi ý 3 (Quyết định): Tên gọi bắt đầu bằng hai chữ "Trống đồng..." tìm thấy lần đầu ở Thanh Hóa.'
    ],
    synonyms: [
      'trong dong dong son',
      'trống đồng đông sơn',
      'trong dong',
      'trống đồng',
      'dong son',
      'đông sơn'
    ],
    points: 30,
    explanation: 'Trống đồng Đông Sơn là đỉnh cao của nghệ thuật đúc đồng cổ xưa của người Việt, là biểu tượng thiêng liêng cho văn minh sông Hồng thời đại Hùng Vương dựng nước.'
  },

  // 2. LỚP 7A5 - NGỮ VĂN & LỊCH SỬ: Tháp Rùa Hồ Hoàn Kiếm
  {
    id: 'puz_2',
    title: 'Danh thắng Tháp Rùa nghìn năm rêu phong',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Tháp Rùa rêu phong cổ kính giữa làn nước xanh biếc của hồ Gươm Hà Nội',
    grade: 7,
    targetClass: '7A5',
    subject: 'Ngữ văn',
    question: 'Công trình kiến trúc cổ kính soi bóng giữa lòng hồ nước ngọt tại thủ đô Hà Nội, gắn liền với truyền thuyết hoàn trả gươm báu của vua Lê Thái Tổ là gì?',
    options: ['Tháp Rùa - Hồ Hoàn Kiếm (Hồ Gươm)', 'Chùa Một Cột', 'Tháp Bút - Đền Ngọc Sơn', 'Khuê Văn Các'],
    correctAnswer: 0,
    hints: [
      'Gợi ý 1 (Tổng quan): Tọa lạc giữa lòng hồ nước trung tâm thủ đô Hà Nội, từng có tên gọi là hồ Lục Thủy.',
      'Gợi ý 2 (Đặc điểm): Kiến trúc 3 tầng xây trên một gò đảo nhỏ, rêu phong cổ kính soi bóng nước biếc.',
      'Gợi ý 3 (Quyết định): Gắn với tích Rùa Vàng nổi lên nhận lại thanh kiếm thần Thuận Thiên từ tay vua Lê Lợi.'
    ],
    synonyms: [
      'thap rua',
      'tháp rùa',
      'ho hoan kiem',
      'hồ hoàn kiếm',
      'ho guom',
      'hồ gươm',
      'tháp rùa hồ gươm'
    ],
    points: 30,
    explanation: 'Tháp Rùa nằm giữa Hồ Hoàn Kiếm là biểu tượng trường tồn của thủ đô Hà Nội ngàn năm văn hiến, nhắc nhở tinh thần chuộng hòa bình của dân tộc Việt Nam.'
  },

  // 3. LỚP 8A5 - TIN HỌC: Bo mạch chủ Mainboard
  {
    id: 'puz_3',
    title: 'Trái tim phần cứng kết nối máy tính',
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Bo mạch chủ máy tính với các đường mạch điện tử, socket CPU và khe RAM',
    grade: 8,
    targetClass: '8A5',
    subject: 'Tin học',
    question: 'Quan sát tấm bản mạch in điện tử lớn nhất bên trong thùng máy vi tính. Linh kiện phần cứng cốt lõi giữ vai trò liên kết mọi linh kiện này có tên là gì?',
    options: ['Bo mạch chủ (Mainboard / Motherboard)', 'Bộ nguồn máy tính (PSU)', 'Ổ cứng lưu trữ SSD', 'Card đồ họa màn hình (GPU)'],
    correctAnswer: 0,
    hints: [
      'Gợi ý 1 (Tổng quan): Là bản mạch in chính (PCB) của hệ thống máy tính cá nhân.',
      'Gợi ý 2 (Đặc điểm): Chứa khe cắm bộ vi xử lý CPU, khe RAM, khe cắm mở rộng PCIe và chipset điều khiển bus dữ liệu.',
      'Gợi ý 3 (Quyết định): Tên tiếng Anh thường gọi là "Mainboard" hoặc "Motherboard".'
    ],
    synonyms: [
      'bo mach chu',
      'bo mạch chủ',
      'mainboard',
      'motherboard',
      'main board',
      'bo mach'
    ],
    points: 25,
    explanation: 'Bo mạch chủ (Mainboard/Motherboard) đóng vai trò nền tảng trung tâm kết nối và điều phối đường truyền tín hiệu giữa CPU, RAM và các linh kiện ngoại vi.'
  },

  // 4. LỚP 9A5 - ĐỊA LÍ: Vịnh Hạ Long
  {
    id: 'puz_4',
    title: 'Kỳ quan thiên nhiên thế giới Vịnh Hạ Long',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Hàng ngàn đảo đá vôi xanh kỳ vĩ nhô lên giữa vịnh biển ngọc bích Hạ Long Quảng Ninh',
    grade: 9,
    targetClass: '9A5',
    subject: 'Lịch sử & Địa lí',
    question: 'Quan sát cảnh quan hàng ngàn đảo đá vôi karst muôn hình vạn trạng nhô lên giữa mặt biển xanh ngọc bích. Đây là di sản thiên nhiên thế giới nào ở tỉnh Quảng Ninh?',
    options: ['Vịnh Hạ Long', 'Vịnh Nha Trang', 'Vịnh Lăng Cô', 'Vịnh Xuân Đài'],
    correctAnswer: 0,
    hints: [
      'Gợi ý 1 (Tổng quan): Nằm ở vùng biển Đông Bắc nước ta, thuộc địa phận tỉnh Quảng Ninh.',
      'Gợi ý 2 (Đặc điểm): Địa hình karst ngập mặn độc đáo với các hang động nổi tiếng như hang Sửng Sốt, động Thiên Cung.',
      'Gợi ý 3 (Quyết định): Tên gọi có nghĩa là "Nơi Rồng mẹ hạ cánh xuống biển".'
    ],
    synonyms: [
      'vinh ha long',
      'vịnh hạ long',
      'ha long',
      'hạ long',
      'quang ninh',
      'vịnh hạ long quảng ninh'
    ],
    points: 30,
    explanation: 'Vịnh Hạ Long với gần 2.000 hòn đảo đá vôi kỳ vĩ được UNESCO hai lần vinh danh là Di sản Thiên nhiên Thế giới về giá trị cảnh quan thẩm mỹ và địa chất địa mạo.'
  },

  // 5. LỚP 8A5 - VĂN HÓA & LỊCH SỬ: Khuê Văn Các
  {
    id: 'puz_5',
    title: 'Biểu tượng tinh hoa hiếu học Thăng Long',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Khuê Văn Các bằng gỗ sơn đỏ với ô cửa sổ tròn như vầng sao Khuê tại Văn Miếu',
    grade: 8,
    targetClass: '8A5',
    subject: 'Lịch sử & Địa lí',
    question: 'Công trình kiến trúc bằng gỗ với 4 ô cửa sổ tròn tỏa tia sáng tượng trưng cho sao Khuê chủ về văn học nghệ thuật nằm trong Văn Miếu - Quốc Tử Giám tên là gì?',
    options: ['Khuê Văn Các', 'Cột cờ Hà Nội', 'Cầu Thê Húc', 'Chùa Diên Hựu'],
    correctAnswer: 0,
    hints: [
      'Gợi ý 1 (Tổng quan): Nằm trong khuôn viên trường đại học quốc gia đầu tiên của Việt Nam.',
      'Gợi ý 2 (Đặc điểm): Tầng trên bằng gỗ có 4 cửa sổ tròn tròn như mặt trời tỏa sáng, tượng trưng sao Khuê.',
      'Gợi ý 3 (Quyết định): Hình ảnh chính thức được khắc họa trên biểu trưng (logo) của Thủ đô Hà Nội.'
    ],
    synonyms: [
      'khue van cac',
      'khuê văn các',
      'khue van',
      'gac khue van'
    ],
    points: 30,
    explanation: 'Khuê Văn Các dựng năm 1805 dưới triều vua Gia Long, là biểu tượng ngời sáng của tinh thần tôn sư trọng đạo và truyền thống hiếu học của dân tộc ta.'
  },

  // 6. LỚP 6A5 - KHOA HỌC TỰ NHIÊN: Kính hiển vi quang học
  {
    id: 'puz_6',
    title: 'Cửa sổ khám phá thế giới vi mô',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Kính hiển vi quang học phòng thí nghiệm sinh học với thị kính và đĩa quay vật kính',
    grade: 6,
    targetClass: '6A5',
    subject: 'Khoa học tự nhiên',
    question: 'Thiết bị quang học quan trọng trong phòng thực hành KHTN dùng để quan sát tế bào thực vật, động vật và vi sinh vật siêu nhỏ mà mắt thường không thấy được là gì?',
    options: ['Kính hiển vi quang học', 'Kính lúp cầm tay', 'Kính thiên văn khúc xạ', 'Ống nhòm đo khoảng cách'],
    correctAnswer: 0,
    hints: [
      'Gợi ý 1 (Tổng quan): Dụng cụ quen thuộc trong phòng thực hành Sinh học & Khoa học tự nhiên.',
      'Gợi ý 2 (Đặc điểm): Gồm thị kính, vật kính xoay đổi độ phóng đại từ 40x đến 1000x và gương hoặc đèn chiếu sáng mẫu vật.',
      'Gợi ý 3 (Quyết định): Tên gọi có chữ "hiển vi" nghĩa là làm hiện rõ những vật cực kỳ vi mô.'
    ],
    synonyms: [
      'kinh hien vi',
      'kính hiển vi',
      'kinh hien vi quang hoc',
      'kính hiển vi quang học',
      'microscope'
    ],
    points: 25,
    explanation: 'Kính hiển vi quang học sử dụng hệ thống thấu kính hội tụ phóng đại hình ảnh mẫu vật lên hàng trăm đến hàng ngàn lần, giúp học sinh quan sát cấu trúc tế bào sống.'
  }
];

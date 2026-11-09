export type BossPhase = 'phase1_full' | 'phase2_enrage' | 'phase3_apocalypse';

export interface BossSkill {
  name: string;
  description: string;
  damage: number;
  phase: 1 | 2 | 3;
}

export interface BossQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  damage: number;
  subject: string;
}

export interface BossDefinition {
  id: string;
  order: number;
  grade: 6 | 7 | 8 | 9;
  name: string;
  title: string;
  arena: string;
  level: number;
  maxHp: number; // Max 100.000 HP
  armor: number; // 10% - 65%
  lore: string;
  appearance: {
    avatar: string;
    themeColor: string;
    bgGradient: string;
    badge: string;
  };
  skills: BossSkill[];
  weakness: string;
  quest: string;
  rewards: {
    exp: number;
    rp: number;
    gold: number;
    badge: string;
    title: string;
    item: string;
  };
  questions: BossQuestion[];
}

export const BOSS_DEFINITIONS: BossDefinition[] = [
  // =========================================================================
  // KHU VỰC 1: KHỐI 6 (12 BOSS) — "KHỞI ĐẦU HUYỀN THOẠI"
  // =========================================================================
  {
    id: 'boss_6_1',
    order: 1,
    grade: 6,
    name: 'Thủ Vệ Rừng Số',
    title: 'Người Canh Giữ Rừng Silicon Cổ Đại',
    arena: 'Rừng Nguyên Sinh Silicon',
    level: 1,
    maxHp: 15000,
    armor: 12,
    lore: 'Thủ vệ cổ xưa sinh ra từ hàng triệu dòng mã nhị phân đầu tiên của cư dân Văn Lang số.',
    appearance: { avatar: '🌲', themeColor: '#10B981', bgGradient: 'from-emerald-950 via-slate-900 to-teal-950', badge: 'Thủ Vệ Rừng Số' },
    skills: [
      { name: 'Gai Nhị Phân', description: 'Bắn ra những sợi gai số nhị phân 0-1', damage: 450, phase: 1 },
      { name: 'Cuồng Nộ Tán Lá', description: 'Tăng 30% tốc độ tung đòn khi còn 50% HP', damage: 700, phase: 2 },
      { name: 'Quét Sạch Bộ Nhớ', description: 'Đòn quét toàn diện diện rộng', damage: 1200, phase: 3 }
    ],
    weakness: 'Thuật toán tìm kiếm tuần tự và câu hỏi phần cứng cơ bản',
    quest: 'Tiêu diệt Thủ Vệ Rừng Số để mở cổng vào Vùng Đất Thuật Toán',
    rewards: { exp: 600, rp: 25, gold: 150, badge: 'Huy hiệu Mầm Xanh Tri Thức', title: 'Tân Binh Rừng Số', item: 'Thẻ Nhớ Cổ Đại' },
    questions: [
      { id: 'bq6_1_1', question: 'Thiết bị nào sau đây là thiết bị vào (Input device) của máy tính?', options: ['Bàn phím (Keyboard)', 'Màn hình (Monitor)', 'Máy in (Printer)', 'Loa (Speaker)'], correctIndex: 0, explanation: 'Bàn phím nhận thông tin nhập từ người dùng truyền vào máy tính.', damage: 5000, subject: 'Tin học 6' },
      { id: 'bq6_1_2', question: 'Một byte bao gồm bao nhiêu bit nhị phân?', options: ['8 bit', '4 bit', '16 bit', '32 bit'], correctIndex: 0, explanation: '1 Byte = 8 bits theo quy chuẩn quốc tế.', damage: 5000, subject: 'Tin học 6' },
      { id: 'bq6_1_3', question: 'Số tự nhiên nhỏ nhất là số nào?', options: ['0', '1', 'Không có', '-1'], correctIndex: 0, explanation: 'Số 0 là số tự nhiên nhỏ nhất trong tập hợp N.', damage: 5000, subject: 'Toán 6' }
    ]
  },
  {
    id: 'boss_6_2',
    order: 2,
    grade: 6,
    name: 'Bạch Xà Đầm Dạ Trạch',
    title: 'Yêu Xà Ngàn Năm Đầm Lầy',
    arena: 'Đầm Lầy Dạ Trạch',
    level: 2,
    maxHp: 18000,
    armor: 15,
    lore: 'Ẩn mình dưới đầm lau sậy ngút ngàn, thử thách lòng dũng cảm của các tân sĩ tử .',
    appearance: { avatar: '🐍', themeColor: '#06B6D4', bgGradient: 'from-cyan-950 via-slate-900 to-blue-950', badge: 'Trảm Bạch Xà' },
    skills: [
      { name: 'Màn Sương Bùn Lầy', description: 'Làm mờ tầm nhìn', damage: 500, phase: 1 },
      { name: 'Đuôi Rắn Quét Ngang', description: 'Tấn công dồn dập', damage: 850, phase: 2 },
      { name: 'Hàn Băng Thủy Ba', description: 'Đóng băng chiến trường', damage: 1350, phase: 3 }
    ],
    weakness: 'Kiến thức về danh tướng Chử Đồng Tử và Triệu Quang Phục',
    quest: 'Vượt qua Dạ Trạch tìm kiếm bí kíp Gậy Thần Nón Diệu',
    rewards: { exp: 750, rp: 30, gold: 200, badge: 'Huy hiệu Dạ Trạch', title: 'Dũng Sĩ Đầm Lau', item: 'Vảy Bạch Xà Băng Giá' },
    questions: [
      { id: 'bq6_2_1', question: 'Ai là danh tướng lập căn cứ Dạ Trạch đánh tan quân Lương xâm lược thế kỷ VI?', options: ['Triệu Quang Phục (Dạ Trạch Vương)', 'Lý Bí (Lý Nam Đế)', 'Phùng Hưng', 'Ngô Quyền'], correctIndex: 0, explanation: 'Triệu Quang Phục dùng chiến thuật du kích đầm lầy Dạ Trạch đánh tan giặc Lương.', damage: 6000, subject: 'Lịch sử 6' },
      { id: 'bq6_2_2', question: 'Ước chung lớn nhất của 12 và 18 là số nào?', options: ['6', '3', '2', '36'], correctIndex: 0, explanation: 'ƯCLN(12, 18) = 6.', damage: 6000, subject: 'Toán 6' },
      { id: 'bq6_2_3', question: 'Từ nào sau đây là từ láy trong tiếng Việt?', options: ['Rì rào', 'Cây cối', 'Nhà cửa', 'Xe cộ'], correctIndex: 0, explanation: '"Rì rào" là từ láy tượng thanh mô tả tiếng gió hoặc sóng vỗ.', damage: 6000, subject: 'Ngữ văn 6' }
    ]
  },
  {
    id: 'boss_6_3',
    order: 3,
    grade: 6,
    name: 'Thần Thú Nham Thạch',
    title: 'Hộ Vệ Lòng Đất Ba Vì',
    arena: 'Miệng Núi Lửa Cổ Ba Vì',
    level: 3,
    maxHp: 20000,
    armor: 18,
    lore: 'Khối nham thạch ngàn năm được Tản Viên Sơn Thánh thuần hóa canh giữ long mạch.',
    appearance: { avatar: '🪨', themeColor: '#F59E0B', bgGradient: 'from-amber-950 via-slate-900 to-orange-950', badge: 'Thần Nham Hộ Mệnh' },
    skills: [
      { name: 'Địa Chấn Nham Thạch', description: 'Rung chuyển mặt đất', damage: 600, phase: 1 },
      { name: 'Nham Tinh Bộc Phá', description: 'Phun trào nham thạch nóng chảy', damage: 950, phase: 2 },
      { name: 'Địa Liệt Cuồng Nộ', description: 'Nứt toác càn khôn', damage: 1500, phase: 3 }
    ],
    weakness: 'Kiến thức cấu tạo Trái Đất và chu trình thạch quyển',
    quest: 'Thu thập Lõi Nham Thạch rèn bảo kiếm tri thức',
    rewards: { exp: 900, rp: 35, gold: 250, badge: 'Đá Cương Quyết', title: 'Kình Lực Ba Vì', item: 'Hòn Đá Thái Cực' },
    questions: [
      { id: 'bq6_3_1', question: 'Lớp nào của Trái Đất ở trạng thái quánh dẻo đến lỏng và sinh ra mắc ma?', options: ['Lớp Manti (Mantle)', 'Vỏ Trái Đất', 'Nhân Trái Đất', 'Khí quyển'], correctIndex: 0, explanation: 'Lớp Manti quánh dẻo sinh ra các dòng đối lưu vật chất và hiện tượng núi lửa.', damage: 7000, subject: 'Địa lí 6' },
      { id: 'bq6_3_2', question: 'Trong truyện cổ tích "Thạch Sanh", chàng dũng sĩ đã bắn hạ con quái vật nào để cứu công chúa?', options: ['Đại bàng tinh', 'Chằn tinh', 'Hồ ly chín đuôi', 'Bạch xà tinh'], correctIndex: 0, explanation: 'Thạch Sanh bắn bị thương đại bàng tinh và lần theo vết máu cứu công chúa.', damage: 7000, subject: 'Ngữ văn 6' },
      { id: 'bq6_3_3', question: 'Trong hệ Mặt Trời, hành tinh nào nằm gần Mặt Trời nhất?', options: ['Sao Thủy (Mercury)', 'Sao Kim (Venus)', 'Trái Đất', 'Sao Hỏa'], correctIndex: 0, explanation: 'Sao Thủy là hành tinh nằm gần Mặt Trời nhất.', damage: 6000, subject: 'KHTN 6' }
    ]
  },
  {
    id: 'boss_6_4',
    order: 4,
    grade: 6,
    name: 'Đại Hạc Đồng Đông Sơn',
    title: 'Lạc Điểu Thần Cung',
    arena: 'Đền Thờ Trống Đồng Cổ Loa',
    level: 4,
    maxHp: 22000,
    armor: 20,
    lore: 'Hình tượng chim Lạc sải cánh trên mặt trống đồng Đông Sơn hóa thân bảo vệ di sản dân tộc.',
    appearance: { avatar: '🦅', themeColor: '#EAB308', bgGradient: 'from-yellow-950 via-slate-900 to-amber-950', badge: 'Lạc Điểu Đông Sơn' },
    skills: [
      { name: 'Lạc Vũ Thiên Thu', description: 'Lông vũ bằng đồng phóng như tên bắn', damage: 650, phase: 1 },
      { name: 'Trống Đồng Vang Rền', description: 'Sóng âm làm suy giảm tinh thần', damage: 1050, phase: 2 },
      { name: 'Hào Quang Lạc Việt', description: 'Phóng luồng thần quang', damage: 1650, phase: 3 }
    ],
    weakness: 'Kiến thức về văn hóa Đông Sơn và thời đại các vua Hùng',
    quest: 'Thấu hiểu ý nghĩa hoa văn trống đồng Đông Sơn',
    rewards: { exp: 1100, rp: 40, gold: 300, badge: 'Trống Đồng Vàng', title: 'Sứ Giả Đông Sơn', item: 'Lông Vũ Chim Lạc' },
    questions: [
      { id: 'bq6_4_1', question: 'Nền văn hóa Đông Sơn gắn liền với công cụ bằng kim loại nào đạt đến đỉnh cao nghệ thuật?', options: ['Đồng thau', 'Sắt', 'Vàng khối', 'Nhôm'], correctIndex: 0, explanation: 'Nghệ thuật đúc đồng thau thời Đông Sơn là đỉnh cao văn minh Đại Việt cổ.', damage: 7500, subject: 'Lịch sử 6' },
      { id: 'bq6_4_2', question: 'Hình ảnh ngôi sao nhiều cánh ở chính giữa mặt trống đồng Đông Sơn tượng trưng cho điều gì?', options: ['Mặt Trời - nguồn sáng và sự sống', 'Mặt Trăng', 'Ngôi sao dẫn đường', 'Ngọn đuốc thần'], correctIndex: 0, explanation: 'Mặt Trời tượng trưng cho sự sống và tín ngưỡng thờ thần Mặt Trời của cư dân nông nghiệp.', damage: 7500, subject: 'Lịch sử 6' },
      { id: 'bq6_4_3', question: 'Tế bào nhân thực khác tế bào nhân sơ ở điểm mấu chốt nào?', options: ['Có màng nhân bao bọc vật chất di truyền', 'Có màng tế bào', 'Có tế bào chất', 'Có ribosome'], correctIndex: 0, explanation: 'Tế bào nhân thực có nhân hoàn chỉnh được bao bọc bởi màng nhân.', damage: 7000, subject: 'KHTN 6' }
    ]
  },
  {
    id: 'boss_6_5',
    order: 5,
    grade: 6,
    name: 'Thần Mộc Thung Lũng Xanh',
    title: 'Cổ Thụ Trăm Tầng Tế Bào',
    arena: 'Vườn Thực Nghiệm Sinh Học',
    level: 5,
    maxHp: 24000,
    armor: 22,
    lore: 'Biểu tượng của thế giới thực vật kỳ diệu, lưu giữ bí mật quang hợp nuôi dưỡng sự sống.',
    appearance: { avatar: '🌿', themeColor: '#22C55E', bgGradient: 'from-green-950 via-slate-900 to-emerald-950', badge: 'Thần Mộc Bất Tử' },
    skills: [
      { name: 'Dây Leo Trói Buộc', description: 'Giam giữ hành động đối phương', damage: 700, phase: 1 },
      { name: 'Quang Hợp Tái Sinh', description: 'Hồi phục một lượng sinh lực', damage: 1100, phase: 2 },
      { name: 'Bão Lộc Rền Rĩ', description: 'Cơn bão lá sắc bén', damage: 1750, phase: 3 }
    ],
    weakness: 'Phương trình quang hợp và cấu tạo cơ quan thực vật',
    quest: 'Giải mã bí mật diệp lục tố của tế bào thực vật',
    rewards: { exp: 1300, rp: 45, gold: 350, badge: 'Lá Bồ Đề Xanh', title: 'Nhà Thực Vật Trẻ', item: 'Hạt Giống Sinh Khí' },
    questions: [
      { id: 'bq6_5_1', question: 'Cơ quan nào của cây xanh thực hiện chức năng quang hợp chủ yếu?', options: ['Lá cây', 'Thân cây', 'Rễ cây', 'Hoa quả'], correctIndex: 0, explanation: 'Lá cây chứa nhiều lục lạp với chất diệp lục hấp thụ ánh sáng mặt trời.', damage: 8000, subject: 'KHTN 6' },
      { id: 'bq6_5_2', question: 'Khí nào được cây xanh thải ra môi trường trong quá trình quang hợp?', options: ['Khí Oxygen (Oxi)', 'Khí Carbon dioxide (Cacbonic)', 'Khí Nitrogen', 'Khí Hydrogen'], correctIndex: 0, explanation: 'Quang hợp hấp thụ CO2 và giải phóng O2 nuôi dưỡng sinh quyển.', damage: 8000, subject: 'KHTN 6' },
      { id: 'bq6_5_3', question: 'Trong Tiếng Anh: "What is the opposite of the adjective \'happy\'?"', options: ['Sad / Unhappy', 'Excited', 'Glad', 'Funny'], correctIndex: 0, explanation: 'Trái nghĩa với "happy" (vui vẻ) là "sad" (buồn rầu).', damage: 8000, subject: 'Tiếng Anh 6' }
    ]
  },
  {
    id: 'boss_6_6',
    order: 6,
    grade: 6,
    name: 'Băng Giác Bão Tuyết',
    title: 'Chúa Tể Đỉnh Mây Mù Fanxipan',
    arena: 'Đỉnh Băng Sơn Mây Phủ',
    level: 6,
    maxHp: 26000,
    armor: 24,
    lore: 'Ngự trị trên đỉnh núi cao nhất Đông Dương, mang theo hơi lạnh buốt giá thử thách độ bền bỉ.',
    appearance: { avatar: '❄️', themeColor: '#38BDF8', bgGradient: 'from-sky-950 via-slate-900 to-indigo-950', badge: 'Băng Thần Fanxipan' },
    skills: [
      { name: 'Gió Rít Đóng Băng', description: 'Làm chậm tốc độ suy nghĩ', damage: 750, phase: 1 },
      { name: 'Mưa Đá Rơi Rụng', description: 'Đá tảng băng rơi từ trên cao', damage: 1200, phase: 2 },
      { name: 'Hàn Băng Thần Chưởng', description: 'Đòn đánh đóng băng toàn diện', damage: 1850, phase: 3 }
    ],
    weakness: 'Tính chất các thể của nước và nhiệt độ sôi/nóng chảy',
    quest: 'Thắp lên ngọn lửa tri thức sưởi ấm đỉnh băng tuyết',
    rewards: { exp: 1500, rp: 50, gold: 400, badge: 'Bông Tuyết Bạc', title: 'Chinh Phục Nóc Nhà Đông Dương', item: 'Mảnh Băng Vĩnh Cửu' },
    questions: [
      { id: 'bq6_6_1', question: 'Ở áp suất khí quyển tiêu chuẩn, nước đá bắt đầu nóng chảy ở nhiệt độ nào?', options: ['0°C', '100°C', '-10°C', '4°C'], correctIndex: 0, explanation: 'Nhiệt độ nóng chảy của nước đá nguyên chất là 0°C.', damage: 9000, subject: 'KHTN 6' },
      { id: 'bq6_6_2', question: 'Đỉnh núi Fansipan (nóc nhà Đông Dương) có độ cao chính xác là bao nhiêu mét?', options: ['3.143 m', '3.045 m', '2.850 m', '4.100 m'], correctIndex: 0, explanation: 'Đỉnh Fansipan cao 3.143 mét so với mực nước biển.', damage: 9000, subject: 'Địa lí 6' },
      { id: 'bq6_6_3', question: 'Số đối của số nguyên -15 là số nào?', options: ['15', '-15', '0', '1/15'], correctIndex: 0, explanation: 'Số đối của -15 là 15 vì (-15) + 15 = 0.', damage: 8000, subject: 'Toán 6' }
    ]
  },
  {
    id: 'boss_6_7',
    order: 7,
    grade: 6,
    name: 'Hỏa Xà Miệng Hỏa Diệm',
    title: 'Xà Thần Lửa Nung Đồ Gốm',
    arena: 'Làng Gốm Bát Tràng Huyền Thoại',
    level: 7,
    maxHp: 28000,
    armor: 25,
    lore: 'Ngọn lửa rực cháy ngàn đời trong lò gốm tạo nên những men gốm tinh xảo nức tiếng gần xa.',
    appearance: { avatar: '🔥', themeColor: '#EA580C', bgGradient: 'from-orange-950 via-slate-900 to-red-950', badge: 'Lửa Thiêng Bát Tràng' },
    skills: [
      { name: 'Hỏa Cầu Nung Đỏ', description: 'Bắn cầu lửa gây bỏng rát', damage: 800, phase: 1 },
      { name: 'Hỏa Xà Quấn Thân', description: 'Vòng lửa vây quanh ngột ngạt', damage: 1300, phase: 2 },
      { name: 'Lò Nung Tam Muội', description: 'Đốt cháy mọi vật cản', damage: 2000, phase: 3 }
    ],
    weakness: 'Phản ứng đốt cháy và truyền thống nghề gốm Việt Nam',
    quest: 'Luyện thành công bình gốm ngọc men rạn độc bản',
    rewards: { exp: 1700, rp: 55, gold: 450, badge: 'Ngọn Lửa Sáng Tạo', title: 'Nghệ Nhân Gốm Trẻ', item: 'Bình Gốm Men Rạn' },
    questions: [
      { id: 'bq6_7_1', question: 'Làng gốm Bát Tràng nổi tiếng của thủ đô Hà Nội nằm bên bờ con sông nào?', options: ['Sông Hồng', 'Sông Đuống', 'Sông Cầu', 'Sông Đáy'], correctIndex: 0, explanation: 'Làng gốm Bát Tràng nằm ven tả ngạn sông Hồng thuộc huyện Gia Lâm, Hà Nội.', damage: 9500, subject: 'Lịch sử - Địa lí 6' },
      { id: 'bq6_7_2', question: 'Để dập tắt đám cháy nhỏ do xăng dầu gây ra, tuyệt đối KHÔNG dùng cách nào?', options: ['Dội nước vào đám cháy', 'Dùng cát phủ lên', 'Dùng bình cứu hỏa CO2', 'Dùng chăn bông ướt trùm lên'], correctIndex: 0, explanation: 'Xăng dầu nhẹ hơn nước và không tan trong nước, dội nước sẽ làm xăng dầu loang rộng hơn.', damage: 9500, subject: 'KHTN 6' },
      { id: 'bq6_7_3', question: 'Giá trị tuyệt đối của số nguyên -2026 là bao nhiêu?', options: ['2026', '-2026', '0', '1'], correctIndex: 0, explanation: '|-2026| = 2026.', damage: 9000, subject: 'Toán 6' }
    ]
  },
  {
    id: 'boss_6_8',
    order: 8,
    grade: 6,
    name: 'Vua Thủy Tộc Sông Lô',
    title: 'Hộ Thần Ngã Ba Hạc Trì',
    arena: 'Bến Sông Bạch Hạc',
    level: 8,
    maxHp: 30000,
    armor: 27,
    lore: 'Ngự trị nơi ngã ba sông nơi sông Lô, sông Thao và sông Đà hòa vào dòng sông Hồng đỏ nặng phù sa.',
    appearance: { avatar: '🌊', themeColor: '#0284C7', bgGradient: 'from-blue-950 via-slate-900 to-indigo-950', badge: 'Ngã Ba Hạc Trì' },
    skills: [
      { name: 'Sóng Cuộn Phù Sa', description: 'Dòng nước đục ngầu ập tới', damage: 850, phase: 1 },
      { name: 'Xoáy Nước Bạch Hạc', description: 'Hút chặt mục tiêu', damage: 1400, phase: 2 },
      { name: 'Thủy Thần Chấn Nộ', description: 'Dâng nước nhấn chìm bờ bãi', damage: 2150, phase: 3 }
    ],
    weakness: 'Hệ thống sông ngòi Bắc Bộ và bài học phòng chống bão lũ',
    quest: 'Bảo vệ đê điều và mùa màng bội thu của cư dân đôi bờ',
    rewards: { exp: 1900, rp: 60, gold: 500, badge: 'Giọt Nước Phù Sa', title: 'Hoa Tiêu Sông Lô', item: 'Ngọc Trai Bạch Hạc' },
    questions: [
      { id: 'bq6_8_1', question: 'Con sông nào dài nhất chảy hoàn toàn trên lãnh thổ Việt Nam?', options: ['Sông Đồng Nai', 'Sông Hồng', 'Sông Mê Kông', 'Sông Đà'], correctIndex: 0, explanation: 'Sông Đồng Nai là con sông nội địa dài nhất Việt Nam (khoảng 586 km).', damage: 10000, subject: 'Địa lí 6' },
      { id: 'bq6_8_2', question: 'Thành ngữ nào sau đây thể hiện tinh thần đoàn kết chống giặc hoặc thiên tai?', options: ['Đồng cam cộng khổ / Muôn người như một', 'Được đằng chân lân đằng đầu', 'Nước chảy bèo trôi', 'Cháy nhà hàng xóm bình chân như vại'], correctIndex: 0, explanation: 'Muôn người như một thể hiện sức mạnh đoàn kết gắn bó keo sơn.', damage: 10000, subject: 'Ngữ văn 6' },
      { id: 'bq6_8_3', question: 'Đoạn mã Scratch nào dùng để lặp lại một hành động đúng 10 lần?', options: ['Khối lệnh "Lặp lại 10 lần" (repeat 10)', 'Khối lệnh "Mãi mãi" (forever)', 'Khối lệnh "Nếu... thì"', 'Khối lệnh "Đợi 10 giây"'], correctIndex: 0, explanation: 'Khối lệnh "repeat 10" cho phép thực thi nhóm lệnh bên trong đúng 10 lần.', damage: 10000, subject: 'Tin học 6' }
    ]
  },
  {
    id: 'boss_6_9',
    order: 9,
    grade: 6,
    name: 'Kim Quy Thần Cơ',
    title: 'Sứ Giả Nỏ Thần Cổ Loa',
    arena: 'Thành Ốc Cổ Loa Xoáy 9 Vòng',
    level: 9,
    maxHp: 31000,
    armor: 30,
    lore: 'Thần rùa vàng trao móng rùa làm lẫy nỏ thần An Dương Vương bắn một phát chết hàng vạn quân thù.',
    appearance: { avatar: '🐢', themeColor: '#CA8A04', bgGradient: 'from-amber-950 via-slate-900 to-yellow-950', badge: 'Lẫy Nỏ Kim Quy' },
    skills: [
      { name: 'Vạn Tiễn Quy Tông', description: 'Mũi tên đồng bay rợp trời', damage: 900, phase: 1 },
      { name: 'Kim Giáp Hộ Thể', description: 'Tăng cực đại phòng thủ', damage: 1450, phase: 2 },
      { name: 'Thần Uy Kim Quy', description: 'Sóng chấn động rùa thiêng', damage: 2250, phase: 3 }
    ],
    weakness: 'Bài học cảnh giác giữ nước qua bi kịch Mỵ Châu - Trọng Thủy',
    quest: 'Bảo vệ bí mật quân sự quốc gia thời An Dương Vương',
    rewards: { exp: 2100, rp: 65, gold: 550, badge: 'Mũi Tên Đồng Cổ Loa', title: 'Hộ Vệ Cổ Loa', item: 'Móng Rùa Hoàng Kim' },
    questions: [
      { id: 'bq6_9_1', question: 'Thành Cổ Loa của vua An Dương Vương được xây dựng với hình dáng đặc trưng gì?', options: ['Xoáy trôn ốc 9 vòng', 'Hình vuông bàn cờ', 'Hình tròn đồng tâm', 'Hình lục giác'], correctIndex: 0, explanation: 'Thành Cổ Loa gồm 9 vòng xoáy trôn ốc độc đáo phòng thủ thủy bộ lợi hại.', damage: 10500, subject: 'Lịch sử 6' },
      { id: 'bq6_9_2', question: 'Bài học đắt giá nhất mà nhân dân ta rút ra từ bi kịch mất nước thời An Dương Vương là gì?', options: ['Luôn luôn nêu cao tinh thần cảnh giác với kẻ thù xâm lược', 'Không nên xây dựng thành quách lớn', 'Không nên chế tạo vũ khí', 'Không nên gả con gái'], correctIndex: 0, explanation: 'Mất cảnh giác trước mưu kế nội gián của Triệu Đà khiến vua An Dương Vương mất nước.', damage: 10500, subject: 'Ngữ văn 6' },
      { id: 'bq6_9_3', question: 'Số tự nhiên x thỏa mãn: 2x + 10 = 30 là:', options: ['x = 10', 'x = 20', 'x = 5', 'x = 15'], correctIndex: 0, explanation: '2x = 30 - 10 = 20 -> x = 10.', damage: 10000, subject: 'Toán 6' }
    ]
  },
  {
    id: 'boss_6_10',
    order: 10,
    grade: 6,
    name: 'Cổ Mã Thiết Kỵ Phù Đổng',
    title: 'Hộ Linh Ngựa Sắt Thánh Gióng',
    arena: 'Rặng Tre Ngà Gia Bình',
    level: 10,
    maxHp: 32500,
    armor: 32,
    lore: 'Ngựa sắt phun lửa cùng trượng tre ngà quét sạch giặc Ân bảo vệ giang sơn Lạc Hồng thái bình.',
    appearance: { avatar: '🐎', themeColor: '#DC2626', bgGradient: 'from-red-950 via-slate-900 to-amber-950', badge: 'Thiết Kỵ Thánh Gióng' },
    skills: [
      { name: 'Móng Sắt Khạc Lửa', description: 'Ngựa sắt dậm chân phun lửa', damage: 950, phase: 1 },
      { name: 'Càn Khôn Tre Ngà', description: 'Nhổ tre ngà quật ngã quân thù', damage: 1550, phase: 2 },
      { name: 'Phù Đổng Lôi Đình', description: 'Sức mạnh trỗi dậy vô song', damage: 2350, phase: 3 }
    ],
    weakness: 'Hình tượng người anh hùng Thánh Gióng trong văn học dân gian',
    quest: 'Vươn vai thành tráng sĩ sẵn sàng phụng sự Tổ quốc',
    rewards: { exp: 2300, rp: 70, gold: 600, badge: 'Chiếc Móng Sắt Thiêng', title: 'Dũng Tướng Phù Đổng', item: 'Thanh Tre Ngà Hoàng Kim' },
    questions: [
      { id: 'bq6_10_1', question: 'Trước khi cưỡi ngựa bay về trời, Thánh Gióng đã bay lên từ đỉnh ngọn núi nào?', options: ['Núi Sóc (Sóc Sơn, Hà Nội)', 'Núi Ba Vì', 'Núi Yên Tử', 'Núi Tam Đảo'], correctIndex: 0, explanation: 'Sau khi dẹp xong giặc Ân, Thánh Gióng lên đỉnh núi Sóc cởi bỏ áo giáp bay về trời.', damage: 11000, subject: 'Ngữ văn 6' },
      { id: 'bq6_10_2', question: 'Chi tiết "bụi tre ngà bị lửa thiêu ngả màu vàng óng" thể hiện đặc điểm gì của truyện truyền thuyết?', options: ['Yếu tố tưởng tượng kỳ ảo giải thích nguồn gốc hiện tượng tự nhiên', 'Lời kể lịch sử có tài liệu đối chiếu', 'Câu chuyện đời thường của cư dân', 'Thơ ca trữ tình dân gian'], correctIndex: 0, explanation: 'Truyền thuyết thường kết hợp yếu tố lịch sử với tưởng tượng kỳ ảo giải thích nguồn gốc địa danh, sự vật.', damage: 11000, subject: 'Ngữ văn 6' },
      { id: 'bq6_10_3', question: 'Hợp số là số tự nhiên như thế nào?', options: ['Lớn hơn 1 và có nhiều hơn 2 ước số', 'Chỉ có 1 ước số', 'Chỉ chia hết cho 1 và chính nó', 'Số lẻ bất kỳ'], correctIndex: 0, explanation: 'Hợp số là số tự nhiên lớn hơn 1 có từ 3 ước số trở lên.', damage: 10500, subject: 'Toán 6' }
    ]
  },
  {
    id: 'boss_6_11',
    order: 11,
    grade: 6,
    name: 'Bạch Long Phong Châu',
    title: 'Hộ Linh Rồng Trắng Núi Nghĩa Lĩnh',
    arena: 'Đền Thượng Đền Hùng Phú Thọ',
    level: 11,
    maxHp: 34000,
    armor: 33,
    lore: 'Linh khí rồng trắng ngự trị non thiêng Phú Thọ, nhắc nhở muôn đời con cháu về đạo lý Uống nước nhớ nguồn.',
    appearance: { avatar: '🐉', themeColor: '#3B82F6', bgGradient: 'from-blue-950 via-slate-900 to-cyan-950', badge: 'Bạch Long Nghĩa Lĩnh' },
    skills: [
      { name: 'Bạch Long Thần Uy', description: 'Hào quang rồng trắng rạng rỡ', damage: 1000, phase: 1 },
      { name: 'Phong Châu Vũ Hóa', description: 'Gió mây cuộn trào non thiêng', damage: 1600, phase: 2 },
      { name: 'Ngàn Năm Hùng Khí', description: 'Sức mạnh cội nguồn Lạc Hồng', damage: 2450, phase: 3 }
    ],
    weakness: 'Ngày Giỗ Tổ Hùng Vương và truyền thống dựng nước Văn Lang',
    quest: 'Báo công học tập trước anh linh các Vua Hùng',
    rewards: { exp: 2500, rp: 75, gold: 650, badge: 'Long Phách Phong Châu', title: 'Con Cháu Tiên Rồng', item: 'Viên Ngọc Rồng Trắng' },
    questions: [
      { id: 'bq6_11_1', question: 'Ngày Giỗ Tổ Hùng Vương hằng năm của dân tộc Việt Nam được tổ chức vào ngày nào?', options: ['Mùng 10 tháng 3 Âm lịch', 'Mùng 1 tháng 1 Âm lịch', 'Ngày 2 tháng 9', 'Ngày 15 tháng 8 Âm lịch'], correctIndex: 0, explanation: '"Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng ba".', damage: 11500, subject: 'Lịch sử 6' },
      { id: 'bq6_11_2', question: 'Câu nói bất hủ: "Các Vua Hùng đã có công dựng nước, Bác cháu ta phải cùng nhau giữ lấy nước" của Bác Hồ được nói tại đâu?', options: ['Tại Đền Hùng (Phú Thọ)', 'Tại Quảng trường Ba Đình', 'Tại Bến Nhà Rồng', 'Tại Pác Bó (Cao Bằng)'], correctIndex: 0, explanation: 'Bác Hồ căn dặn cán bộ, chiến sĩ Đại đoàn Quân Tiên phong tại Đền Giếng (Đền Hùng) ngày 19/9/1954.', damage: 11500, subject: 'Lịch sử 6' },
      { id: 'bq6_11_3', question: 'Hình bình hành có hai đường chéo như thế nào với nhau?', options: ['Cắt nhau tại trung điểm của mỗi đường', 'Vuông góc với nhau', 'Bằng nhau', 'Song song với nhau'], correctIndex: 0, explanation: 'Tính chất hình bình hành: Hai đường chéo cắt nhau tại trung điểm của mỗi đường.', damage: 11000, subject: 'Toán 6' }
    ]
  },
  {
    id: 'boss_6_12',
    order: 12,
    grade: 6,
    name: 'Đại Hùng Vương Chí Tôn',
    title: 'Khởi Nguyên Dựng Nước Văn Lang (Trùm Cuối Khối 6)',
    arena: 'Điện Kính Thiên Đền Hùng',
    level: 12,
    maxHp: 35000,
    armor: 35,
    lore: 'Đại Chúa Tể tối cao của kỷ nguyên khởi thủy, thử thách bài thi tốt nghiệp toàn diện kiến thức lớp 6.',
    appearance: { avatar: '👑', themeColor: '#F59E0B', bgGradient: 'from-amber-950 via-slate-900 to-red-950', badge: 'VƯƠNG MIỆN KHỐI 6' },
    skills: [
      { name: 'Khai Thiên Dựng Nước', description: 'Chiếu chỉ dựng non sông bờ cõi', damage: 1100, phase: 1 },
      { name: 'Bách Việt Hợp Lực', description: 'Trăm người con cùng hiệp lực', damage: 1700, phase: 2 },
      { name: 'Thái Bình Thịnh Trị', description: 'Đòn uy quyền tối thượng Khối 6', damage: 2600, phase: 3 }
    ],
    weakness: 'Tổng hợp tri thức Toán, Văn, KHTN, Sử - Địa, Tin học lớp 6',
    quest: 'Vượt qua 12 Boss Khối 6 để tiến vào Kỷ Nguyên Khối 7',
    rewards: { exp: 3000, rp: 100, gold: 1000, badge: 'Đại Trạng Nguyên Khối 6', title: 'Huyền Thoại Khối 6', item: 'Thánh Kiếm Dựng Nước' },
    questions: [
      { id: 'bq6_12_1', question: 'Tên nước đầu tiên của dân tộc Việt Nam ta là gì và do ai sáng lập?', options: ['Văn Lang - Vua Hùng sáng lập', 'Âu Lạc - An Dương Vương', 'Đại Cồ Việt - Đinh Tiên Hoàng', 'Đại Việt - Lý Thánh Tông'], correctIndex: 0, explanation: 'Nhà nước Văn Lang do Hùng Vương sáng lập là nhà nước đầu tiên trong lịch sử dân tộc.', damage: 12000, subject: 'Lịch sử 6' },
      { id: 'bq6_12_2', question: 'Một tam giác đều có ba cạnh bằng nhau thì số đo mỗi góc trong của nó là bao nhiêu?', options: ['60°', '90°', '45°', '180°'], correctIndex: 0, explanation: 'Tổng 3 góc tam giác là 180°, tam giác đều có 3 góc bằng nhau: 180° : 3 = 60°.', damage: 12000, subject: 'Toán 6' },
      { id: 'bq6_12_3', question: 'Mạng Internet có vai trò nổi bật nhất nào đối với học sinh thời đại số?', options: ['Tra cứu học liệu, kết nối học tập trực tuyến và mở rộng chân trời tri thức', 'Chỉ dùng để chơi game giải trí', 'Chỉ dùng để gửi thư rác', 'Không có tác dụng giáo dục'], correctIndex: 0, explanation: 'Internet là chìa khóa vàng giúp học sinh tự học chủ động và chinh phục tri thức số.', damage: 11000, subject: 'Tin học 6' }
    ]
  },

  // =========================================================================
  // KHU VỰC 2: KHỐI 7 (12 BOSS) — "THỬ THÁCH NÂNG CAO"
  // =========================================================================
  {
    id: 'boss_7_1',
    order: 13,
    grade: 7,
    name: 'Hắc Thổ Cổ Sa',
    title: 'Thần Đất Trầm Tích Sông Cửu Long',
    arena: 'Đồng Bằng Phù Sa Mới',
    level: 13,
    maxHp: 38000,
    armor: 36,
    lore: 'Lớp trầm tích màu mỡ của chín nhánh sông rồng nuôi dưỡng những cánh đồng lúa bạt ngàn.',
    appearance: { avatar: '🌾', themeColor: '#14B8A6', bgGradient: 'from-teal-950 via-slate-900 to-emerald-950', badge: 'Phù Sa Cửu Long' },
    skills: [
      { name: 'Bùn Lầy Sụt Lún', description: 'Gây choáng đối thủ', damage: 1150, phase: 1 },
      { name: 'Triều Cường Dâng Cao', description: 'Đợt nước mặn lấn sâu', damage: 1750, phase: 2 },
      { name: 'Gió Chướng Cuồng Phong', description: 'Gió mùa đông bắc khô hạn', damage: 2700, phase: 3 }
    ],
    weakness: 'Đặc điểm tự nhiên Châu thổ sông Cửu Long và biến đổi khí hậu',
    quest: 'Thích ứng thông minh với biến đổi khí hậu và xâm nhập mặn',
    rewards: { exp: 3200, rp: 105, gold: 1050, badge: 'Hạt Vàng Đồng Bằng', title: 'Nông Học Trẻ', item: 'Bông Lúa Thần Nông' },
    questions: [
      { id: 'bq7_1_1', question: 'Sông Mê Kông chảy vào Việt Nam chia thành hai nhánh chính đổ ra Biển Đông là:', options: ['Sông Tiền và Sông Hậu', 'Sông Đồng Nai và Sông Sài Gòn', 'Sông Hồng và Sông Đáy', 'Sông Gianh và Sông Bến Hải'], correctIndex: 0, explanation: 'Sông Mê Kông chảy qua biên giới vào nước ta tách ra thành sông Tiền và sông Hậu.', damage: 13000, subject: 'Địa lí 7' },
      { id: 'bq7_1_2', question: 'Tập hợp các số hữu tỉ được ký hiệu theo chuẩn quốc tế là chữ cái nào?', options: ['Q', 'Z', 'N', 'R'], correctIndex: 0, explanation: 'Q (Quotient) là ký hiệu của tập hợp các số hữu tỉ.', damage: 13000, subject: 'Toán 7' },
      { id: 'bq7_1_3', question: 'Nguyên tử gồm các loại hạt cơ bản nào sau đây?', options: ['Proton, neutron và electron', 'Chỉ có proton và electron', 'Chỉ có neutron', 'Phân tử và ion'], correctIndex: 0, explanation: 'Hạt nhân chứa proton (điện tích +) và neutron (không mang điện), vỏ chứa electron (-).', damage: 12000, subject: 'KHTN 7' }
    ]
  },
  {
    id: 'boss_7_2',
    order: 14,
    grade: 7,
    name: 'Thần Cơ Lôi Điện',
    title: 'Thủ Vệ Bảng Tính Excel',
    arena: 'Trường Dữ Liệu Ma Trận',
    level: 14,
    maxHp: 40000,
    armor: 38,
    lore: 'Hộ vệ của các thuật toán phân tích bảng tính, kiểm tra kỹ năng hàm và xử lý số liệu.',
    appearance: { avatar: '📊', themeColor: '#16A34A', bgGradient: 'from-green-950 via-slate-900 to-teal-950', badge: 'Thần Cơ Bảng Tính' },
    skills: [
      { name: 'Hàm SUM Quét Toàn Diện', description: 'Cộng dồn sát thương', damage: 1200, phase: 1 },
      { name: 'Phép Lọc FILTER Rối Loạn', description: 'Tách lẻ đội hình', damage: 1800, phase: 2 },
      { name: 'Lỗi #VALUE! Nổ Tung', description: 'Gây sát thương sốc cực mạnh', damage: 2800, phase: 3 }
    ],
    weakness: 'Cú pháp các hàm SUM, AVERAGE, MAX, MIN trong phần mềm bảng tính',
    quest: 'Làm chủ phần mềm bảng tính để quản lý số liệu học tập',
    rewards: { exp: 3400, rp: 110, gold: 1100, badge: 'Phù Thủy Bảng Tính', title: 'Chuyên Gia Số Liệu', item: 'Bảng Tính Hoàng Kim' },
    questions: [
      { id: 'bq7_2_1', question: 'Trong phần mềm bảng tính, công thức bắt buộc phải bắt đầu bằng ký tự nào?', options: ['Dấu bằng (=)', 'Dấu cộng (+)', 'Dấu chấm phẩy (;)', 'Dấu hai chấm (:)'], correctIndex: 0, explanation: 'Mọi công thức hoặc hàm tính trong bảng tính đều phải bắt đầu bằng dấu =.', damage: 13500, subject: 'Tin học 7' },
      { id: 'bq7_2_2', question: 'Hàm nào sau đây được dùng để tính trung bình cộng của một dãy số?', options: ['AVERAGE', 'SUM', 'COUNT', 'MAX'], correctIndex: 0, explanation: 'Hàm AVERAGE tính trung bình cộng của các đối số truyền vào.', damage: 13500, subject: 'Tin học 7' },
      { id: 'bq7_2_3', question: 'Hai góc đối đỉnh thì có tính chất nào?', options: ['Bằng nhau', 'Bù nhau', 'Phụ nhau', 'Tổng bằng 180°'], correctIndex: 0, explanation: 'Định lý hình học 7: Hai góc đối đỉnh thì bằng nhau.', damage: 13000, subject: 'Toán 7' }
    ]
  },
  {
    id: 'boss_7_3',
    order: 15,
    grade: 7,
    name: 'Sứ Giả Như Nguyệt',
    title: 'Chiến Tướng Phòng Tuyến Sông Cầu',
    arena: 'Phòng Tuyến Sông Như Nguyệt 1077',
    level: 15,
    maxHp: 42000,
    armor: 40,
    lore: 'Âm vang bài thơ thần bất hủ đập tan 10 vạn quân xâm lược Tống bên dòng sông Cầu lịch sử.',
    appearance: { avatar: '🛡️', themeColor: '#6366F1', bgGradient: 'from-indigo-950 via-slate-900 to-purple-950', badge: 'Nam Quốc Sơn Hà' },
    skills: [
      { name: 'Tiếng Thơ Sông Thần', description: 'Làm lung lay sĩ khí quân thù', damage: 1250, phase: 1 },
      { name: 'Cọc Tre Lũy Đất', description: 'Bức tường phòng ngự kiên cố', damage: 1850, phase: 2 },
      { name: 'Tập Kích Đêm Như Nguyệt', description: 'Đòn đánh úp tiêu diệt tướng giặc', damage: 2900, phase: 3 }
    ],
    weakness: 'Chiến thuật quân sự chủ động và tư tưởng nhân đạo của Lý Thường Kiệt',
    quest: 'Bảo vệ toàn vẹn chủ quyền lãnh thổ theo lời bài thơ thần',
    rewards: { exp: 3600, rp: 115, gold: 1150, badge: 'Chiến Công Như Nguyệt', title: 'Hộ Quốc Tướng Quân', item: 'Thơ Thần Khắc Gỗ' },
    questions: [
      { id: 'bq7_3_1', question: 'Vị thái úy kiệt xuất nào đã chỉ huy trận đại thắng quân Tống trên sông Như Nguyệt năm 1077?', options: ['Lý Thường Kiệt', 'Lý Công Uẩn', 'Lý Đạo Thành', 'Tô Hiến Thành'], correctIndex: 0, explanation: 'Lý Thường Kiệt lãnh đạo quân dân nhà Lý đánh bại quân Tống năm 1077.', damage: 14000, subject: 'Lịch sử 7' },
      { id: 'bq7_3_2', question: 'Bài thơ "Nam quốc sơn hà" được khẳng định mang ý nghĩa lịch sử gì?', options: ['Bản Tuyên ngôn Độc lập đầu tiên của dân tộc Việt Nam', 'Bài ca dao châm biếm', 'Lời hịch xuất quân bình thường', 'Bản báo cáo quân sự'], correctIndex: 0, explanation: '"Nam quốc sơn hà" khẳng định chủ quyền thiêng liêng bất khả xâm phạm của non sông đất Việt.', damage: 14000, subject: 'Ngữ văn 7' },
      { id: 'bq7_3_3', question: 'Tốc độ chuyển động của một vật cho biết điều gì?', options: ['Mức độ nhanh hay chậm của chuyển động', 'Quãng đường vật đã đi', 'Thời gian vật chuyển động', 'Khối lượng của vật'], correctIndex: 0, explanation: 'Tốc độ v = s/t cho biết mức độ nhanh hay chậm của chuyển động.', damage: 14000, subject: 'KHTN 7' }
    ]
  },
  {
    id: 'boss_7_4',
    order: 16,
    grade: 7,
    name: 'Quang Âm Thần Kiếm',
    title: 'Bậc Thầy Tốc Độ Ánh Sáng & Âm Thanh',
    arena: 'Thung Lũng Phản Xạ Âm',
    level: 16,
    maxHp: 44000,
    armor: 42,
    lore: 'Kiểm tra quy luật truyền âm, tiếng vang và phản xạ ánh sáng của học sinh KHTN 7.',
    appearance: { avatar: '💡', themeColor: '#F59E0B', bgGradient: 'from-amber-950 via-slate-900 to-yellow-950', badge: 'Quang Phổ Thần Cơ' },
    skills: [
      { name: 'Sóng Âm Chói Tai', description: 'Tần số cao gây choáng', damage: 1300, phase: 1 },
      { name: 'Tia Sáng Phản Xạ', description: 'Đổi hướng luồng tấn công', damage: 1950, phase: 2 },
      { name: 'Siêu Âm Bộc Phá', description: 'Công phá mọi vật cản', damage: 3000, phase: 3 }
    ],
    weakness: 'Định luật phản xạ ánh sáng và điều kiện nghe được tiếng vang',
    quest: 'Ứng dụng hiện tượng phản xạ âm thanh giảm tiếng ồn học đường',
    rewards: { exp: 3800, rp: 120, gold: 1200, badge: 'Gương Phẳng Thần Kỳ', title: 'Nhà Vật Lý Trẻ', item: 'Lăng Kính Khúc Xạ' },
    questions: [
      { id: 'bq7_4_1', question: 'Theo định luật phản xạ ánh sáng, góc phản xạ (r) có quan hệ thế nào với góc tới (i)?', options: ['Góc phản xạ bằng góc tới (i = r)', 'Góc phản xạ lớn hơn góc tới', 'Góc phản xạ nhỏ hơn góc tới', 'Tổng hai góc luôn bằng 90°'], correctIndex: 0, explanation: 'Định luật phản xạ ánh sáng: Góc phản xạ luôn luôn bằng góc tới (i = r).', damage: 15000, subject: 'KHTN 7' },
      { id: 'bq7_4_2', question: 'Âm thanh không thể truyền qua được môi trường nào sau đây?', options: ['Chân không', 'Chất rắn', 'Chất lỏng', 'Chất khí'], correctIndex: 0, explanation: 'Âm cần môi trường vật chất đàn hồi (chất rắn, lỏng, khí) để lan truyền, không truyền được trong chân không.', damage: 15000, subject: 'KHTN 7' },
      { id: 'bq7_4_3', question: 'Trong tam giác, giao điểm của ba đường trung trực là:', options: ['Tâm đường tròn ngoại tiếp tam giác', 'Tâm đường tròn nội tiếp tam giác', 'Trọng tâm tam giác', 'Trực tâm tam giác'], correctIndex: 0, explanation: 'Giao điểm của 3 đường trung trực cách đều 3 đỉnh và là tâm đường tròn ngoại tiếp tam giác.', damage: 14000, subject: 'Toán 7' }
    ]
  },
  {
    id: 'boss_7_5',
    order: 17,
    grade: 7,
    name: 'Bạch Đằng Đệ Nhất Tướng',
    title: 'Hồn Thiêng Cọc Gỗ Năm 938',
    arena: 'Cửa Biển Bạch Đằng Giang',
    level: 17,
    maxHp: 46000,
    armor: 43,
    lore: 'Ngô Quyền cắm cọc nhọn bịt sắt đón ngọn thủy triều tiêu diệt đoàn thuyền quân Nam Hán.',
    appearance: { avatar: '⚓', themeColor: '#0369A1', bgGradient: 'from-sky-950 via-slate-900 to-blue-950', badge: 'Bạch Đằng 938' },
    skills: [
      { name: 'Triều Dâng Nước Lớn', description: 'Dìm thuyền chiến vào trận địa', damage: 1350, phase: 1 },
      { name: 'Cọc Nhọn Xuyên Thuyền', description: 'Gãy đôi thân thuyền giặc', damage: 2050, phase: 2 },
      { name: 'Bão Thần Tiêu Diệt Hoằng Thao', description: 'Trảm tướng giặc trên sông', damage: 3100, phase: 3 }
    ],
    weakness: 'Quy luật thủy triều Biển Đông và mưu trí dụ địch của Ngô Quyền',
    quest: 'Khắc ghi mốc son chấm dứt hơn 1000 năm Bắc thuộc',
    rewards: { exp: 4000, rp: 125, gold: 1250, badge: 'Cọc Thép Bạch Đằng', title: 'Hải Thần Bạch Đằng', item: 'Thủy Triều Phù' },
    questions: [
      { id: 'bq7_7_1', question: 'Chiến thắng Bạch Đằng năm 938 do Ngô Quyền lãnh đạo đánh tan đạo quân xâm lược nào?', options: ['Quân Nam Hán', 'Quân Tống', 'Quân Nguyên Mông', 'Quân Minh'], correctIndex: 0, explanation: 'Ngô Quyền đánh tan quân Nam Hán năm 938, chém chết tướng Hoằng Thao.', damage: 15500, subject: 'Lịch sử 7' },
      { id: 'bq7_7_2', question: 'Ý nghĩa to lớn nhất của chiến thắng Bạch Đằng năm 938 là gì?', options: ['Chấm dứt hơn một nghìn năm Bắc thuộc, mở ra kỷ nguyên độc lập lâu dài', 'Chỉ là một trận thủy chiến bình thường', 'Thống nhất đất nước', 'Chuyển dời kinh đô'], correctIndex: 0, explanation: 'Mở ra kỷ nguyên độc lập, tự chủ tự cường lâu dài của dân tộc ta.', damage: 15500, subject: 'Lịch sử 7' },
      { id: 'bq7_7_3', question: 'Trong tam giác vuông, cạnh đối diện với góc vuông được gọi là gì?', options: ['Cạnh huyền', 'Cạnh góc vuông', 'Đường cao', 'Trung tuyến'], correctIndex: 0, explanation: 'Cạnh đối diện góc vuông là cạnh dài nhất trong tam giác vuông, gọi là cạnh huyền.', damage: 15000, subject: 'Toán 7' }
    ]
  },
  {
    id: 'boss_7_6',
    order: 18,
    grade: 7,
    name: 'Thần Gió Tây Nguyên',
    title: 'Chúa Sơn Lâm Đất Đỏ Bazan',
    arena: 'Cao Nguyên Đắk Lắk Hùng Vĩ',
    level: 18,
    maxHp: 48000,
    armor: 45,
    lore: 'Âm vang cồng chiêng đại ngàn Tây Nguyên giữa rừng cà phê và đất đỏ bazan màu mỡ.',
    appearance: { avatar: '🐘', themeColor: '#B45309', bgGradient: 'from-amber-950 via-slate-900 to-orange-950', badge: 'Cồng Chiêng Đại Ngàn' },
    skills: [
      { name: 'Tiếng Cồng Chiêng Động Địa', description: 'Rung chuyển cao nguyên', damage: 1400, phase: 1 },
      { name: 'Gió Nắng Đất Đỏ', description: 'Gây kiệt sức mục tiêu', damage: 2150, phase: 2 },
      { name: 'Bão Cát Bazan', description: 'Cơn lốc đỏ quét sạch chiến trường', damage: 3250, phase: 3 }
    ],
    weakness: 'Không gian văn hóa Cồng chiêng Tây Nguyên và đặc điểm đất bazan',
    quest: 'Bảo tồn kiệt tác văn hóa phi vật thể của nhân loại',
    rewards: { exp: 4200, rp: 130, gold: 1300, badge: 'Chiêng Đồng Tây Nguyên', title: 'Dũng Sĩ Rừng Già', item: 'Ngà Voi Hoàng Gia' },
    questions: [
      { id: 'bq7_6_1', question: 'Không gian văn hóa Cồng chiêng Tây Nguyên được UNESCO công nhận là di sản văn hóa vào năm nào?', options: ['Năm 2005 (Kiệt tác truyền khẩu và phi vật thể nhân loại)', 'Năm 1993', 'Năm 2015', 'Năm 1986'], correctIndex: 0, explanation: 'UNESCO công nhận Không gian văn hóa Cồng chiêng Tây Nguyên là kiệt tác di sản năm 2005.', damage: 16000, subject: 'Lịch sử - Địa lí 7' },
      { id: 'bq7_6_2', question: 'Loại đất màu mỡ đặc trưng nhất hình thành trên đá núi lửa ở Tây Nguyên là:', options: ['Đất đỏ bazan', 'Đất phù sa cổ', 'Đất cát pha', 'Đất phèn'], correctIndex: 0, explanation: 'Đất đỏ bazan tầng phong hóa dày rất thích hợp trồng cà phê, cao su, hồ tiêu.', damage: 16000, subject: 'Địa lí 7' },
      { id: 'bq7_6_3', question: 'Biểu thức đại số biểu thị tổng của hai số a và b là:', options: ['a + b', 'a - b', 'a . b', 'a / b'], correctIndex: 0, explanation: 'Tổng của a và b là a + b.', damage: 16000, subject: 'Toán 7' }
    ]
  },
  {
    id: 'boss_7_7',
    order: 19,
    grade: 7,
    name: 'Vệ Tinh Mạng Lưới Số',
    title: 'Hộ Thần Không Gian Mạng & Bản Quyền',
    arena: 'Quỹ Đạo Không Gian Số',
    level: 19,
    maxHp: 49000,
    armor: 46,
    lore: 'Canh giữ đạo đức số, bản quyền tác giả và an toàn truyền thông trên mạng xã hội.',
    appearance: { avatar: '🛰️', themeColor: '#7C3AED', bgGradient: 'from-violet-950 via-slate-900 to-indigo-950', badge: 'An Toàn Số THCS' },
    skills: [
      { name: 'Khóa Tường Lửa Firewall', description: 'Chặn đứng mọi đòn đánh thường', damage: 1450, phase: 1 },
      { name: 'Quét Virus Mã Độc', description: 'Tiêu hủy tài nguyên đối phương', damage: 2200, phase: 2 },
      { name: 'Xung Điện Từ EMP', description: 'Ngắt kết nối diện rộng', damage: 3350, phase: 3 }
    ],
    weakness: 'Luật An ninh mạng và các nguyên tắc ứng xử văn minh trên Internet',
    quest: 'Thực hành văn hóa số văn minh và bảo vệ thông tin cá nhân',
    rewards: { exp: 4400, rp: 135, gold: 1350, badge: 'Hiệp Sĩ Mạng', title: 'Công Dân Số Thông Minh', item: 'Khóa Bảo Mật Lượng Tử' },
    questions: [
      { id: 'bq7_7_1', question: 'Hành động nào sau đây là vi phạm bản quyền tác giả trong môi trường số?', options: ['Tự ý sao chép bài viết của người khác rồi ghi tên mình để nộp', 'Ghi rõ nguồn tác giả và liên kết khi trích dẫn', 'Mua bản quyền phần mềm chính hãng', 'Sử dụng ảnh miễn phí bản quyền'], correctIndex: 0, explanation: 'Chiếm đoạt tác phẩm, mạo danh tác giả là hành vi vi phạm nghiêm trọng bản quyền.', damage: 16500, subject: 'Tin học 7' },
      { id: 'bq7_7_2', question: 'Mật khẩu nào sau đây được coi là an toàn và có độ bảo mật cao nhất?', options: ['MyHoa@2026#Secured!', '12345678', 'matkhau123', 'admin'], correctIndex: 0, explanation: 'Mật khẩu mạnh dài trên 8 ký tự, gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt.', damage: 16500, subject: 'Tin học 7' },
      { id: 'bq7_7_3', question: 'Hiện tượng cảm ứng ở sinh vật là gì?', options: ['Khả năng cơ thể tiếp nhận và phản ứng lại các kích thích từ môi trường', 'Quá trình hô hấp', 'Quá trình tiêu hóa', 'Sự sinh trưởng kích thước'], correctIndex: 0, explanation: 'Cảm ứng giúp sinh vật thích nghi với những biến đổi của môi trường sống.', damage: 16000, subject: 'KHTN 7' }
    ]
  },
  {
    id: 'boss_7_8',
    order: 20,
    grade: 7,
    name: 'Sứ Giả Chiêu Dời Đô',
    title: 'Linh Khí Rồng Vàng Thăng Long',
    arena: 'Kinh Đô Thăng Long Ngàn Năm',
    level: 20,
    maxHp: 50500,
    armor: 48,
    lore: 'Mùa thu năm Canh Tuất 1010, vua Lý Thái Tổ thấy rồng vàng bay lên quyết định dời đô từ Hoa Lư về Đại La.',
    appearance: { avatar: '🐉', themeColor: '#EAB308', bgGradient: 'from-amber-950 via-slate-900 to-yellow-950', badge: 'Rồng Bay Thăng Long' },
    skills: [
      { name: 'Hào Khí Thăng Long', description: 'Tăng sức mạnh toàn diện', damage: 1500, phase: 1 },
      { name: 'Rồng Vàng Cuộn Khói', description: 'Che lấp toàn bộ chiến trường', damage: 2300, phase: 2 },
      { name: 'Ngàn Năm Định Đô', description: 'Uy lực của kinh đô muôn đời', damage: 3450, phase: 3 }
    ],
    weakness: 'Văn bản "Chiếu dời đô" và tầm nhìn chiến lược của Lý Thái Tổ',
    quest: 'Tìm hiểu vị thế địa lý và lịch sử Thăng Long - Hà Nội',
    rewards: { exp: 4600, rp: 140, gold: 1400, badge: 'Rồng Bay 1010', title: 'Người Con Thăng Long', item: 'Chiếu Dời Đô Bằng Vàng' },
    questions: [
      { id: 'bq7_8_1', question: 'Vua Lý Thái Tổ quyết định dời đô từ Hoa Lư về Đại La và đổi tên là Thăng Long vào năm nào?', options: ['Năm 1010', 'Năm 938', 'Năm 1077', 'Năm 1288'], correctIndex: 0, explanation: 'Mùa thu năm 1010, vua Lý Công Uẩn dời đô về thành Đại La và đổi tên thành Thăng Long.', damage: 17000, subject: 'Lịch sử 7' },
      { id: 'bq7_8_2', question: 'Trong "Chiếu dời đô", vua Lý Thái Tổ đánh giá đất Đại La có vị thế đắc địa thế nào?', options: ['Nơi trung tâm trời đất, thế rồng cuộn hổ ngồi, muôn vật tốt tươi phồn thịnh', 'Nơi hiểm trở tiện ẩn nấp', 'Nơi giáp biên giới phía bắc', 'Nơi đầm lầy hoang vu'], correctIndex: 0, explanation: 'Đại La là chốn tụ hội trọng yếu của bốn phương, là nơi thắng địa muôn đời.', damage: 17000, subject: 'Ngữ văn 7' },
      { id: 'bq7_8_3', question: 'Bậc của đa thức P(x) = 4x^3 - 2x^2 + 7x - 9 là:', options: ['Bậc 3', 'Bậc 4', 'Bậc 2', 'Bậc 1'], correctIndex: 0, explanation: 'Số mũ cao nhất của biến x là 3, nên đa thức có bậc 3.', damage: 16500, subject: 'Toán 7' }
    ]
  },
  {
    id: 'boss_7_9',
    order: 21,
    grade: 7,
    name: 'Băng Thần Bắc Cực',
    title: 'Hộ Vệ Châu Lục Băng Giá',
    arena: 'Bắc Băng Dương & Châu Nam Cực',
    level: 21,
    maxHp: 51500,
    armor: 49,
    lore: 'Vị thần gác cổng những vùng băng giá địa cầu, cảnh báo về hiệu ứng nhà kính và biến đổi khí hậu.',
    appearance: { avatar: '🧊', themeColor: '#0EA5E9', bgGradient: 'from-sky-950 via-slate-900 to-indigo-950', badge: 'Băng Hà Địa Cầu' },
    skills: [
      { name: 'Tảng Băng Trôi Di Động', description: 'Lao thẳng vào mục tiêu', damage: 1550, phase: 1 },
      { name: 'Bão Tuyết Nam Cực', description: 'Nhiệt độ âm 60 độ C', damage: 2350, phase: 2 },
      { name: 'Băng Tan Khẩn Cấp', description: 'Sóng dâng ngập tràn', damage: 3550, phase: 3 }
    ],
    weakness: 'Đặc điểm tự nhiên Châu Nam Cực và hiện tượng nóng lên toàn cầu',
    quest: 'Bảo vệ tầng ôzôn và giảm thiểu khí thải nhà kính',
    rewards: { exp: 4800, rp: 145, gold: 1450, badge: 'Ngôi Sao Bắc Cực', title: 'Hiệp Sĩ Môi Trường', item: 'Lõi Băng Cổ Đại' },
    questions: [
      { id: 'bq7_9_1', question: 'Châu lục nào lạnh nhất và có lượng băng tuyết bao phủ dày nhất trên thế giới?', options: ['Châu Nam Cực', 'Châu Âu', 'Châu Á', 'Châu Mỹ'], correctIndex: 0, explanation: 'Châu Nam Cực quanh năm băng giá với tầng băng dày hàng ngàn mét.', damage: 17500, subject: 'Địa lí 7' },
      { id: 'bq7_9_2', question: 'Khí nào là nguyên nhân chính gây ra hiệu ứng nhà kính làm Trái Đất nóng lên?', options: ['Carbon dioxide (CO2)', 'Oxygen (O2)', 'Nitrogen (N2)', 'Argon (Ar)'], correctIndex: 0, explanation: 'CO2 tích tụ từ đốt nhiên liệu hóa thạch giữ nhiệt làm tăng nhiệt độ khí quyển.', damage: 17500, subject: 'KHTN 7' },
      { id: 'bq7_9_3', question: 'Choose the correct preposition: "Students are very interested ______ digital learning."', options: ['in', 'on', 'at', 'with'], correctIndex: 0, explanation: 'Cụm từ cố định: "to be interested in something" (hứng thú với cái gì).', damage: 16500, subject: 'Tiếng Anh 7' }
    ]
  },
  {
    id: 'boss_7_10',
    order: 22,
    grade: 7,
    name: 'Quang Trung Thần Tốc',
    title: 'Hộ Linh Áo Vải Cờ Đào',
    arena: 'Gò Đống Đa Lịch Sử',
    level: 22,
    maxHp: 52500,
    armor: 50,
    lore: 'Hành quân thần tốc mùa xuân Kỷ Dậu 1789 quét sạch 29 vạn quân Thanh bảo vệ non sông.',
    appearance: { avatar: '⚔️', themeColor: '#DC2626', bgGradient: 'from-red-950 via-slate-900 to-amber-950', badge: 'Kỷ Dậu 1789' },
    skills: [
      { name: 'Hành Quân Thần Tốc', description: 'Đánh úp bất ngờ không kịp trở tay', damage: 1600, phase: 1 },
      { name: 'Đội Tượng Binh Xung Kích', description: 'Voi chiến phá nát đồn trại', damage: 2450, phase: 2 },
      { name: 'Sấm Sét Ngọc Hồi - Đống Đa', description: 'Tiêu diệt Sầm Nghi Đống', damage: 3650, phase: 3 }
    ],
    weakness: 'Nghệ thuật quân sự thần tốc táo bạo của Hoàng đế Quang Trung',
    quest: 'Học tập tinh thần thần tốc quyết đoán của phong trào Tây Sơn',
    rewards: { exp: 5000, rp: 150, gold: 1500, badge: 'Áo Vải Cờ Đào', title: 'Tướng Soái Tây Sơn', item: 'Thanh Bảo Kiếm Quang Trung' },
    questions: [
      { id: 'bq7_10_1', question: 'Trận đại thắng Ngọc Hồi - Đống Đa quét sạch 29 vạn quân Thanh diễn ra vào mùa xuân năm nào?', options: ['Năm 1789 (Kỷ Dậu)', 'Năm 1785', 'Năm 1788', 'Năm 1802'], correctIndex: 0, explanation: 'Mùa xuân Kỷ Dậu 1789, vua Quang Trung tiến quân ra Bắc đại phá quân Thanh.', damage: 18000, subject: 'Lịch sử 7' },
      { id: 'bq7_10_2', question: 'Tướng giặc nào đã phải thắt cổ tự tử tại Loa Sơn (Gò Đống Đa) khi bị quân Tây Sơn tiêu diệt?', options: ['Sầm Nghi Đống', 'Tôn Sĩ Nghị', 'Liễu Thăng', 'Ô Mã Nhi'], correctIndex: 0, explanation: 'Thái thú Điền Châu Sầm Nghi Đống khiếp sợ treo cổ tự tử tại đồn Đống Đa.', damage: 18000, subject: 'Lịch sử 7' },
      { id: 'bq7_10_3', question: 'Nghiệm của đa thức P(x) = 2x - 8 là:', options: ['x = 4', 'x = -4', 'x = 8', 'x = 2'], correctIndex: 0, explanation: '2x - 8 = 0 -> 2x = 8 -> x = 4.', damage: 17000, subject: 'Toán 7' }
    ]
  },
  {
    id: 'boss_7_11',
    order: 23,
    grade: 7,
    name: 'Thần Trụ Nam Cực',
    title: 'Hộ Tinh Châu Đại Dương & San Hô',
    arena: 'Rạn San Hô Great Barrier Reef',
    level: 23,
    maxHp: 53500,
    armor: 52,
    lore: 'Rạn san hô lớn nhất thế giới chứa đựng hệ sinh thái biển phong phú bậc nhất hành tinh.',
    appearance: { avatar: '🪸', themeColor: '#EC4899', bgGradient: 'from-pink-950 via-slate-900 to-rose-950', badge: 'Kỳ Quan San Hô' },
    skills: [
      { name: 'Xâm Thực San Hô', description: 'Gai san hô gây trúng độc', damage: 1650, phase: 1 },
      { name: 'Sóng Biển Thái Bình Dương', description: 'Sóng thần đánh dạt thuyền chiến', damage: 2500, phase: 2 },
      { name: 'Tẩy Trắng San Hô Cảnh Báo', description: 'Bùng nổ năng lượng biển cả', damage: 3750, phase: 3 }
    ],
    weakness: 'Đặc điểm tự nhiên Châu Đại Dương và sinh học biển',
    quest: 'Bảo vệ môi trường biển chống axit hóa đại dương',
    rewards: { exp: 5200, rp: 155, gold: 1550, badge: 'San Hô Hoàng Gia', title: 'Hải Dương Học Giả', item: 'Viên Ngọc San Hô Hồng' },
    questions: [
      { id: 'bq7_11_1', question: 'Châu Đại Dương bao gồm lục địa Ô-xtrây-li-a và bao nhiêu nhóm đảo chính ở Thái Bình Dương?', options: ['4 nhóm đảo (Mê-la-nê-di, Mi-crô-nê-di, Pô-li-nê-di và Niu Di-len)', '2 nhóm đảo', '3 nhóm đảo', '6 nhóm đảo'], correctIndex: 0, explanation: 'Châu Đại Dương gồm lục địa Australia và 4 nhóm đảo lớn ở Thái Bình Dương.', damage: 18500, subject: 'Địa lí 7' },
      { id: 'bq7_11_2', question: 'Loài động vật có túi biểu tượng đặc trưng nhất của đất nước Ô-xtrây-li-a là:', options: ['Chuột túi (Kangaroo)', 'Gấu Bắc cực', 'Sư tử', 'Chim cánh cụt'], correctIndex: 0, explanation: 'Kangaroo và Koala là các loài thú có túi đặc hữu nổi tiếng của Australia.', damage: 18500, subject: 'Địa lí 7' },
      { id: 'bq7_11_3', question: 'Biến cố ngẫu nhiên trong môn Toán học có xác suất nằm trong khoảng nào?', options: ['Từ 0 đến 1 (0 <= P <= 1)', 'Từ -1 đến 1', 'Lớn hơn 1', 'Nhỏ hơn 0'], correctIndex: 0, explanation: 'Xác suất của một biến cố luôn là một số thực nằm giữa 0 (không thể) và 1 (chắc chắn).', damage: 17500, subject: 'Toán 7' }
    ]
  },
  {
    id: 'boss_7_12',
    order: 24,
    grade: 7,
    name: 'Đại Hưng Đạo Chí Tôn',
    title: 'Vạn Kiếp Hùng Khí (Trùm Cuối Khối 7)',
    arena: 'Khu Di Tích Kiếp Bạc',
    level: 24,
    maxHp: 55000,
    armor: 55,
    lore: 'Tiết chế Hưng Đạo Đại Vương Trần Quốc Tuấn - Trùm cuối Khối 7 thử thách toàn bộ kiến thức lớp 7.',
    appearance: { avatar: '👑', themeColor: '#7C3AED', bgGradient: 'from-purple-950 via-slate-900 to-indigo-950', badge: 'VƯƠNG MIỆN KHỐI 7' },
    skills: [
      { name: 'Hịch Tướng Sĩ Rực Lửa', description: 'Ý chí quyết chiến xông pha', damage: 1750, phase: 1 },
      { name: 'Binh Thư Yếu Lược', description: 'Trận pháp biến ảo khôn lường', damage: 2650, phase: 2 },
      { name: 'Vạn Kiếp Thần Uy', description: 'Đòn quyết định tối thượng Khối 7', damage: 3950, phase: 3 }
    ],
    weakness: 'Tổng hợp tri thức Toán, Văn, KHTN, Sử - Địa, Tin học lớp 7',
    quest: 'Vượt qua 12 Boss Khối 7 để mở cổng vào Kỷ Nguyên Khối 8',
    rewards: { exp: 6000, rp: 200, gold: 2000, badge: 'Đại Trạng Nguyên Khối 7', title: 'Huyền Thoại Khối 7', item: 'Lệnh Tiết Chế Triều Trần' },
    questions: [
      { id: 'bq7_12_1', question: 'Trần Hưng Đạo đã lãnh đạo quân dân nhà Trần đánh tan đạo quân xâm lược Nguyên Mông bao nhiêu lần?', options: ['2 lần (Lần thứ hai năm 1285 và lần thứ ba năm 1288)', '1 lần', '3 lần', '4 lần'], correctIndex: 0, explanation: 'Trần Hưng Đạo chỉ huy kháng chiến lần 2 (1285) và lần 3 (1288) đại thắng vẻ vang.', damage: 19000, subject: 'Lịch sử 7' },
      { id: 'bq7_12_2', question: 'Câu nói bất hủ của Trần Hưng Đạo khi vua Trần hỏi kế đánh giặc: "Nếu bệ hạ muốn hàng, trước hết hãy..."', options: ['"chém đầu thần rồi hãy hàng"', '"chạy vào phía Nam lánh nạn"', '"gửi thư hòa hiếu"', '"xin cầu viện nước ngoài"'], correctIndex: 0, explanation: 'Khí phách ngút trời thể hiện tinh thần quyết tử vì độc lập dân tộc.', damage: 19000, subject: 'Ngữ văn 7' },
      { id: 'bq7_12_3', question: 'Tổng ba góc của một tam giác bất kỳ luôn bằng bao nhiêu độ?', options: ['180°', '360°', '90°', '270°'], correctIndex: 0, explanation: 'Định lý cơ bản hình học: Tổng 3 góc trong một tam giác bằng 180°.', damage: 18000, subject: 'Toán 7' }
    ]
  },

  // =========================================================================
  // KHU VỰC 3: KHỐI 8 (13 BOSS) — "ĐẠI CHIẾN HUYỀN THOẠI"
  // =========================================================================
  {
    id: 'boss_8_1',
    order: 25,
    grade: 8,
    name: 'Hằng Đẳng Thức Thần Nhân',
    title: 'Hộ Pháp 7 Hằng Đẳng Thức Đáng Nhớ',
    arena: 'Điện Thờ Đại Số Cổ',
    level: 25,
    maxHp: 58000,
    armor: 54,
    lore: 'Nắm giữ 7 hằng đẳng thức đáng nhớ căn bản, nền tảng phân tích đa thức thành nhân tử.',
    appearance: { avatar: '📐', themeColor: '#3B82F6', bgGradient: 'from-blue-950 via-slate-900 to-indigo-950', badge: 'Thần Toán Hằng Đẳng Thức' },
    skills: [
      { name: 'Bình Phương Một Tổng (A+B)^2', description: 'Phân giải sát thương', damage: 1800, phase: 1 },
      { name: 'Hiệu Hai Bình Phương A^2 - B^2', description: 'Đánh thẳng vào điểm yếu', damage: 2700, phase: 2 },
      { name: 'Lập Phương Một Hiệu (A-B)^3', description: 'Đòn xoay 3 chiều cực hiểm', damage: 4000, phase: 3 }
    ],
    weakness: 'Vận dụng thuần thục 7 hằng đẳng thức đáng nhớ lớp 8',
    quest: 'Giải mã hoàn chỉnh ma trận đa thức bậc 3',
    rewards: { exp: 6200, rp: 205, gold: 2100, badge: 'Thước Kẻ Vàng', title: 'Bậc Thầy Đại Số', item: 'Cuộn Sách 7 Hằng Đẳng Thức' },
    questions: [
      { id: 'bq8_1_1', question: 'Khai triển hằng đẳng thức (a + b)^2 là:', options: ['a^2 + 2ab + b^2', 'a^2 + b^2', 'a^2 - 2ab + b^2', 'a^2 + ab + b^2'], correctIndex: 0, explanation: '(a + b)^2 = a^2 + 2ab + b^2.', damage: 20000, subject: 'Toán 8' },
      { id: 'bq8_1_2', question: 'Biểu thức (x - y)(x + y) rút gọn thành:', options: ['x^2 - y^2', 'x^2 + y^2', '(x - y)^2', 'x^2 - 2xy + y^2'], correctIndex: 0, explanation: 'Hiệu hai bình phương: (x - y)(x + y) = x^2 - y^2.', damage: 20000, subject: 'Toán 8' },
      { id: 'bq8_1_3', question: 'Khối lượng mol của khí Oxi (O2) là bao nhiêu g/mol?', options: ['32 g/mol', '16 g/mol', '8 g/mol', '64 g/mol'], correctIndex: 0, explanation: 'M(O2) = 16 x 2 = 32 g/mol.', damage: 19000, subject: 'KHTN 8' }
    ]
  },
  {
    id: 'boss_8_2',
    order: 26,
    grade: 8,
    name: 'Đại Hóa Sư Nguyên Tử',
    title: 'Bậc Thầy Phương Trình Hóa Học & Mol',
    arena: 'Phòng Thí Nghiệm Giả Kim Thuật',
    level: 26,
    maxHp: 60000,
    armor: 55,
    lore: 'Định luật bảo toàn khối lượng và bí ẩn 6,022 x 10^23 hạt nguyên tử trong một mol chất.',
    appearance: { avatar: '🧪', themeColor: '#10B981', bgGradient: 'from-emerald-950 via-slate-900 to-teal-950', badge: 'Nhà Hóa Học Trẻ' },
    skills: [
      { name: 'Phản Ứng Tỏa Nhiệt', description: 'Gây bỏng lửa hóa chất', damage: 1850, phase: 1 },
      { name: 'Kết Tủa Trắng Chắn Tầm Nhìn', description: 'Tạo lớp phòng thủ dày đặc', damage: 2800, phase: 2 },
      { name: 'Bộc Phá Số Avogadro', description: 'Nổ tung với hàng triệu hạt ion', damage: 4150, phase: 3 }
    ],
    weakness: 'Định luật bảo toàn khối lượng và cân bằng phương trình hóa học',
    quest: 'Điều chế thành công dung dịch trung hòa axit - bazơ',
    rewards: { exp: 6500, rp: 210, gold: 2200, badge: 'Ống Nghiệm Pha Lê', title: 'Hóa Sư Lỗi Lạc', item: 'Tinh Thể Muối Tinh Khiết' },
    questions: [
      { id: 'bq8_2_1', question: 'Định luật bảo toàn khối lượng khẳng định điều gì trong một phản ứng hóa học?', options: ['Tổng khối lượng các chất sản phẩm bằng tổng khối lượng các chất tham gia', 'Khối lượng sản phẩm luôn lớn hơn chất tham gia', 'Khối lượng sản phẩm luôn nhỏ hơn chất tham gia', 'Khối lượng thay đổi tùy theo nhiệt độ'], correctIndex: 0, explanation: 'Định luật Lomonosov - Lavoisier: Tổng khối lượng các chất tham gia bằng tổng khối lượng các chất tạo thành.', damage: 20500, subject: 'KHTN 8' },
      { id: 'bq8_2_2', question: 'Dung dịch làm quỳ tím chuyển sang màu đỏ là dung dịch nào?', options: ['Dung dịch Axit (Acid)', 'Dung dịch Bazơ (Base)', 'Nước cất tinh khiết', 'Dung dịch muối ăn trung tính'], correctIndex: 0, explanation: 'Dung dịch acid làm quỳ tím hóa đỏ, dung dịch base làm quỳ tím hóa xanh.', damage: 20500, subject: 'KHTN 8' },
      { id: 'bq8_2_3', question: 'Tứ giác có 4 cạnh bằng nhau và 4 góc vuông là hình gì?', options: ['Hình vuông', 'Hình chữ nhật', 'Hình thoi', 'Hình thang cân'], correctIndex: 0, explanation: 'Hình vuông vừa là hình thoi (4 cạnh bằng nhau) vừa là hình chữ nhật (4 góc vuông).', damage: 20000, subject: 'Toán 8' }
    ]
  },
  {
    id: 'boss_8_3',
    order: 27,
    grade: 8,
    name: 'Cơ Năng Áp Suất Thần',
    title: 'Chúa Tể Lực Đẩy Ác-si-mét & Áp Suất',
    arena: 'Đáy Biển Sâu Rãnh Mariana',
    level: 27,
    maxHp: 62000,
    armor: 56,
    lore: 'Thử thách quy luật áp suất chất lỏng và lực đẩy Ác-si-mét nâng đỡ tàu ngầm dưới đáy biển.',
    appearance: { avatar: '⚓', themeColor: '#0284C7', bgGradient: 'from-blue-950 via-slate-900 to-cyan-950', badge: 'Lực Đẩy Ác-si-mét' },
    skills: [
      { name: 'Áp Suất Tầng Nước Sâu', description: 'Nghiền nát giáp đối thủ', damage: 1900, phase: 1 },
      { name: 'Xoáy Lực Nổi Archimedes', description: 'Hất tung đối phương lên mặt nước', damage: 2900, phase: 2 },
      { name: 'Thủy Áp Cực Đại', description: 'Đòn nén chất lỏng cực mạnh', damage: 4300, phase: 3 }
    ],
    weakness: 'Công thức lực đẩy Archimedes: FA = d . V',
    quest: 'Thiết kế mô hình tàu ngầm lặn nổi an toàn',
    rewards: { exp: 6800, rp: 215, gold: 2300, badge: 'Thước Đo Áp Suất', title: 'Kỹ Sư Cơ Học', item: 'Vương Miện Vàng Archimedes' },
    questions: [
      { id: 'bq8_3_1', question: 'Công thức tính lực đẩy Ác-si-mét (Archimedes) tác dụng lên vật nhúng trong chất lỏng là:', options: ['FA = d . V', 'FA = m . g', 'FA = p / S', 'FA = d / V'], correctIndex: 0, explanation: 'FA = d . V, trong đó d là trọng lượng riêng chất lỏng, V là thể tích phần vật chìm.', damage: 21000, subject: 'KHTN 8' },
      { id: 'bq8_3_2', question: 'Điều kiện để một vật chìm xuống khi nhúng trong chất lỏng là:', options: ['Trọng lực P lớn hơn lực đẩy Ác-si-mét FA (P > FA)', 'P < FA', 'P = FA', 'Không phụ thuộc vào P'], correctIndex: 0, explanation: 'Khi trọng lực lớn hơn lực đẩy nổi (P > FA), vật sẽ chìm xuống đáy.', damage: 21000, subject: 'KHTN 8' },
      { id: 'bq8_3_3', question: 'Định lý Ta-lét (Thales) trong tam giác khẳng định điều gì?', options: ['Đường thẳng song song với một cạnh cắt hai cạnh còn lại định ra các đoạn thẳng tỉ lệ', 'Tổng hai cạnh luôn lớn hơn cạnh thứ ba', 'Bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông', 'Ba đường trung tuyến đồng quy'], correctIndex: 0, explanation: 'Định lý Thales là nền tảng hình học về các đoạn thẳng tỉ lệ trong tam giác.', damage: 21000, subject: 'Toán 8' }
    ]
  },
  {
    id: 'boss_8_4',
    order: 28,
    grade: 8,
    name: 'Sứ Giả Cần Vương',
    title: 'Hồn Khí Kháng Pháp Phong Trào Cần Vương',
    arena: 'Chiến Khu Ba Đình - Hương Khê',
    level: 28,
    maxHp: 64000,
    armor: 57,
    lore: 'Chiếu Cần Vương năm 1885 của vua Hàm Nghi thổi bùng ngọn lửa yêu nước chống thực dân Pháp.',
    appearance: { avatar: '🚩', themeColor: '#DC2626', bgGradient: 'from-red-950 via-slate-900 to-amber-950', badge: 'Chiếu Cần Vương 1885' },
    skills: [
      { name: 'Lời Hiệu Triệu Sơn Hà', description: 'Đánh thức hào khí muôn dân', damage: 1950, phase: 1 },
      { name: 'Súng Kíp Vụ Quang', description: 'Phan Đình Phùng tự chế tạo vũ khí', damage: 2950, phase: 2 },
      { name: 'Bão Lửa Cần Vương', description: 'Đòn tập kích du kích kiên cường', damage: 4400, phase: 3 }
    ],
    weakness: 'Khởi nghĩa Hương Khê và tinh thần trung quân ái quốc',
    quest: 'Tìm hiểu phong trào Cần Vương cuối thế kỷ XIX',
    rewards: { exp: 7100, rp: 220, gold: 2400, badge: 'Cờ Lệnh Cần Vương', title: 'Nghĩa Sĩ Cần Vương', item: 'Súng Kíp Khắc Hoa Sen' },
    questions: [
      { id: 'bq8_4_1', question: 'Ai là người thay mặt vua Hàm Nghi ban Chiếu Cần Vương kêu gọi văn thân, sĩ phu và nhân dân phò vua cứu nước năm 1885?', options: ['Tôn Thất Thuyết', 'Phan Đình Phùng', 'Nguyễn Tri Phương', 'Hoàng Diệu'], correctIndex: 0, explanation: 'Tôn Thất Thuyết đưa vua Hàm Nghi ra sơn phòng Tân Sở (Quảng Trị) và ban Chiếu Cần Vương.', damage: 21500, subject: 'Lịch sử 8' },
      { id: 'bq8_4_2', question: 'Khởi nghĩa nào được coi là đỉnh cao và tiêu biểu nhất trong phong trào Cần Vương?', options: ['Khởi nghĩa Hương Khê (do Phan Đình Phùng lãnh đạo)', 'Khởi nghĩa Bãi Sậy', 'Khởi nghĩa Ba Đình', 'Khởi nghĩa Yên Thế'], correctIndex: 0, explanation: 'Khởi nghĩa Hương Khê (1885-1896) có quy mô lớn nhất, tổ chức chặt chẽ và tồn tại bền bỉ nhất.', damage: 21500, subject: 'Lịch sử 8' },
      { id: 'bq8_4_3', question: 'Hình thang có hai góc kề một đáy bằng nhau là hình gì?', options: ['Hình thang cân', 'Hình bình hành', 'Hình chữ nhật', 'Hình thoi'], correctIndex: 0, explanation: 'Định nghĩa: Hình thang cân là hình thang có 2 góc kề một đáy bằng nhau.', damage: 21000, subject: 'Toán 8' }
    ]
  },
  {
    id: 'boss_8_5',
    order: 29,
    grade: 8,
    name: 'Hoàng Đế Lam Sơn',
    title: 'Hộ Linh Khởi Nghĩa Lam Sơn & Thuận Thiên Kiếm',
    arena: 'Núi Rừng Lam Sơn - Hồ Hoàn Kiếm',
    level: 29,
    maxHp: 66000,
    armor: 58,
    lore: 'Mười năm nếm mật nằm gai giành lại giang sơn từ tay giặc Minh xâm lược.',
    appearance: { avatar: '🗡️', themeColor: '#CA8A04', bgGradient: 'from-amber-950 via-slate-900 to-yellow-950', badge: 'Thuận Thiên Kiếm' },
    skills: [
      { name: 'Thuận Thiên Trảm', description: 'Nhát chém rực sáng hồ Tả Vọng', damage: 2000, phase: 1 },
      { name: 'Nếm Mật Nằm Gai', description: 'Gia tăng sức chịu đựng cực đại', damage: 3050, phase: 2 },
      { name: 'Đại Phá Liễu Thăng', description: 'Chém đầu tướng giặc Chi Lăng', damage: 4550, phase: 3 }
    ],
    weakness: 'Tác phẩm "Bình Ngô đại cáo" và trận đại thắng Chi Lăng - Xương Giang',
    quest: 'Thấu hiểu tư tưởng nhân nghĩa: "Đem đại nghĩa để thắng hung tàn"',
    rewards: { exp: 7400, rp: 225, gold: 2500, badge: 'Thần Kiếm Hoàn Kiếm', title: 'Tướng Quân Lam Sơn', item: 'Chuôi Kiếm Thuận Thiên' },
    questions: [
      { id: 'bq8_5_1', question: 'Trận phục kích chém chết tướng giặc Liễu Thăng vang dội của nghĩa quân Lam Sơn diễn ra ở đâu?', options: ['Ải Chi Lăng (Lạng Sơn)', 'Bến Chương Dương', 'Cửa biển Hàm Tử', 'Sông Bạch Đằng'], correctIndex: 0, explanation: 'Tại ải Chi Lăng năm 1427, nghĩa quân Lam Sơn chém chết Liễu Thăng làm tan vỡ đạo quân viện binh giặc Minh.', damage: 22000, subject: 'Lịch sử 8' },
      { id: 'bq8_5_2', question: 'Tác phẩm "Bình Ngô đại cáo" của Nguyễn Trãi được xem là:', options: ['Bản Tuyên ngôn Độc lập thứ hai của dân tộc Việt Nam', 'Bản cáo trạng bình thường', 'Thơ tình cảm lãng mạn', 'Bản hiệp ước đầu hàng'], correctIndex: 0, explanation: '"Bình Ngô đại cáo" khẳng định nền độc lập và văn hiến ngàn đời của Đại Việt.', damage: 22000, subject: 'Ngữ văn 8' },
      { id: 'bq8_5_3', question: 'Một tam giác có độ dài ba cạnh lần lượt là 6cm, 8cm, 10cm có phải là tam giác vuông không?', options: ['Có, là tam giác vuông (theo định lý Pytago đảo)', 'Không phải tam giác vuông', 'Là tam giác đều', 'Là tam giác nhọn'], correctIndex: 0, explanation: '6^2 + 8^2 = 36 + 64 = 100 = 10^2, thỏa mãn định lý Pytago đảo.', damage: 22000, subject: 'Toán 8' }
    ]
  },
  {
    id: 'boss_8_6',
    order: 30,
    grade: 8,
    name: 'Khổng Tước Sinh Học',
    title: 'Hộ Thần Hệ Tuần Hoàn & Hô Hấp Người',
    arena: 'Trái Tim Sinh Mệnh Nhân Loại',
    level: 30,
    maxHp: 68000,
    armor: 59,
    lore: 'Vòng tuần hoàn máu kỳ diệu và sự vận chuyển oxy nuôi sống từng tế bào cơ thể người.',
    appearance: { avatar: '🫀', themeColor: '#E11D48', bgGradient: 'from-rose-950 via-slate-900 to-red-950', badge: 'Nhịp Đập Sự Sống' },
    skills: [
      { name: 'Nhịp Co Tâm Thất', description: 'Tống máu áp lực cao', damage: 2050, phase: 1 },
      { name: 'Hồng Cầu Tải Oxi', description: 'Gia tăng sinh lực', damage: 3100, phase: 2 },
      { name: 'Cơn Nhồi Máu Bão Táp', description: 'Đòn đánh suy tim đối thủ', damage: 4650, phase: 3 }
    ],
    weakness: 'Cấu tạo hệ tuần hoàn người và sơ đồ nhóm máu ABO',
    quest: 'Rèn luyện lối sống lành mạnh bảo vệ trái tim khỏe mạnh',
    rewards: { exp: 7700, rp: 230, gold: 2600, badge: 'Trái Tim Hồng Ngọc', title: 'Y Học Trẻ', item: 'Viên Pha Lê Huyết Cầu' },
    questions: [
      { id: 'bq8_6_1', question: 'Trái tim của con người có cấu tạo gồm bao nhiêu ngăn?', options: ['4 ngăn (2 tâm nhĩ và 2 tâm thất)', '2 ngăn', '3 ngăn', '6 ngăn'], correctIndex: 0, explanation: 'Tim người gồm 4 ngăn: tâm nhĩ phải, tâm thất phải, tâm nhĩ trái và tâm thất trái.', damage: 23000, subject: 'KHTN 8' },
      { id: 'bq8_6_2', question: 'Nhóm máu nào trong hệ nhóm máu ABO được coi là nhóm máu chuyên cho hồng cầu?', options: ['Nhóm máu O', 'Nhóm máu AB', 'Nhóm máu A', 'Nhóm máu B'], correctIndex: 0, explanation: 'Hồng cầu nhóm máu O không chứa kháng nguyên A và B nên có thể truyền cho các nhóm máu khác.', damage: 23000, subject: 'KHTN 8' },
      { id: 'bq8_6_3', question: 'Trong phân thức đại số A/B, điều kiện để phân thức có nghĩa là:', options: ['Mẫu thức B khác 0 (B ≠ 0)', 'Tử thức A khác 0', 'Cả A và B đều bằng 0', 'B = 0'], correctIndex: 0, explanation: 'Phân thức có nghĩa khi và chỉ khi mẫu thức khác 0.', damage: 22000, subject: 'Toán 8' }
    ]
  },
  {
    id: 'boss_8_7',
    order: 31,
    grade: 8,
    name: 'Thuật Toán Đệ Quy Thần',
    title: 'Hộ Pháp Ngôn Ngữ Python & Thuật Toán Sắp Xếp',
    arena: 'Trường Ma Trận Code Python',
    level: 31,
    maxHp: 70000,
    armor: 60,
    lore: 'Ngôn ngữ lập trình hiện đại Python với các hàm sắp xếp nổi bọt (Bubble Sort) và chọn (Selection Sort).',
    appearance: { avatar: '🐍', themeColor: '#38BDF8', bgGradient: 'from-sky-950 via-slate-900 to-indigo-950', badge: 'Lập Trình Viên Python' },
    skills: [
      { name: 'Vòng Lặp For Trong Range', description: 'Đánh liên hoàn lặp lại', damage: 2100, phase: 1 },
      { name: 'Lệnh Rẽ Nhánh If - Else', description: 'Phân luồng chiêu thức', damage: 3200, phase: 2 },
      { name: 'Đệ Quy Vô Hạn Stack Overflow', description: 'Đánh sập hệ thống', damage: 4800, phase: 3 }
    ],
    weakness: 'Cú pháp hàm def, danh sách List và thuật toán sắp xếp nổi bọt',
    quest: 'Viết chương trình Python giải quyết bài toán thực tế',
    rewards: { exp: 8000, rp: 235, gold: 2700, badge: 'Huy Chương Python', title: 'Bậc Thầy Python', item: 'Thư Viện Mã Nguồn Mở' },
    questions: [
      { id: 'bq8_7_1', question: 'Trong ngôn ngữ lập trình Python, hàm nào dùng để xuất dữ liệu ra màn hình?', options: ['print()', 'input()', 'echo()', 'write()'], correctIndex: 0, explanation: 'Hàm print() trong Python dùng để in dữ liệu ra màn hình console.', damage: 23500, subject: 'Tin học 8' },
      { id: 'bq8_7_2', question: 'Trong Python, kết quả của phép toán: 17 // 5 là bao nhiêu?', options: ['3', '3.4', '2', '3.0'], correctIndex: 0, explanation: 'Toán tử // là phép chia lấy phần nguyên trong Python: 17 // 5 = 3.', damage: 23500, subject: 'Tin học 8' },
      { id: 'bq8_7_3', question: 'Hai tam giác đồng dạng với nhau theo tỉ số k thì tỉ số diện tích của chúng bằng:', options: ['k^2 (bình phương tỉ số đồng dạng)', 'k', '2k', 'k^3'], correctIndex: 0, explanation: 'Tỉ số diện tích của hai tam giác đồng dạng bằng bình phương tỉ số đồng dạng.', damage: 23000, subject: 'Toán 8' }
    ]
  },
  {
    id: 'boss_8_8',
    order: 32,
    grade: 8,
    name: 'Khí Tượng Địa Cầu',
    title: 'Hộ Thần Gió Mùa & Hải Lưu Biển Đông',
    arena: 'Quần Đảo Hoàng Sa & Trường Sa',
    level: 32,
    maxHp: 71500,
    armor: 61,
    lore: 'Khẳng định chủ quyền biển đảo thiêng liêng Hoàng Sa và Trường Sa của Tổ quốc Việt Nam.',
    appearance: { avatar: '🏝️', themeColor: '#0D9488', bgGradient: 'from-teal-950 via-slate-900 to-blue-950', badge: 'Hoàng Sa - Trường Sa' },
    skills: [
      { name: 'Gió Mùa Đông Bắc', description: 'Gió lạnh khô hanh', damage: 2150, phase: 1 },
      { name: 'Gió Mùa Tây Nam', description: 'Mưa rào dồn dập', damage: 3250, phase: 2 },
      { name: 'Cơn Bão Biển Đông Cấp 15', description: 'Sóng cuộn thét gào', damage: 4900, phase: 3 }
    ],
    weakness: 'Vị trí địa lý và các bằng chứng lịch sử pháp lý chủ quyền biển đảo',
    quest: 'Bảo vệ vững chắc chủ quyền biển đảo thiêng liêng của Tổ quốc',
    rewards: { exp: 8300, rp: 240, gold: 2800, badge: 'Cột Mốc Chủ Quyền', title: 'Chiến Sĩ Trường Sa', item: 'Cây Bàng Vuông Biển Đảo' },
    questions: [
      { id: 'bq8_8_1', question: 'Hai quần đảo Hoàng Sa và Trường Sa thuộc chủ quyền thiêng liêng của Việt Nam lần lượt thuộc sự quản lý của đơn vị hành chính cấp tỉnh/thành phố nào?', options: ['Hoàng Sa thuộc TP. Đà Nẵng, Trường Sa thuộc tỉnh Khánh Hòa', 'Hoàng Sa thuộc Quảng Nam, Trường Sa thuộc Ninh Thuận', 'Hoàng Sa thuộc Thừa Thiên Huế, Trường Sa thuộc Bình Thuận', 'Cả hai thuộc tỉnh Bà Rịa - Vũng Tàu'], correctIndex: 0, explanation: 'Quần đảo Hoàng Sa trực thuộc TP Đà Nẵng, quần đảo Trường Sa trực thuộc tỉnh Khánh Hòa.', damage: 24000, subject: 'Địa lí 8' },
      { id: 'bq8_8_2', question: 'Vùng biển Việt Nam có diện tích khoảng bao nhiêu triệu km2 trên Biển Đông?', options: ['Khoảng 1 triệu km2', 'Khoảng 500 nghìn km2', 'Khoảng 2 triệu km2', 'Khoảng 330 nghìn km2'], correctIndex: 0, explanation: 'Vùng biển thuộc chủ quyền, quyền chủ quyền và quyền tài phán của Việt Nam rộng khoảng 1 triệu km2.', damage: 24000, subject: 'Địa lí 8' },
      { id: 'bq8_8_3', question: 'Phương trình bậc nhất một ẩn ax + b = 0 (với a ≠ 0) có nghiệm duy nhất là:', options: ['x = -b / a', 'x = b / a', 'x = -a / b', 'x = a / b'], correctIndex: 0, explanation: 'ax + b = 0 -> ax = -b -> x = -b/a.', damage: 23500, subject: 'Toán 8' }
    ]
  },
  {
    id: 'boss_8_9',
    order: 33,
    grade: 8,
    name: 'Điện Từ Thần Tướng',
    title: 'Hộ Pháp Định Luật Ohm & Mạch Điện Song Song',
    arena: 'Trạm Biến Áp Lượng Tử',
    level: 33,
    maxHp: 73000,
    armor: 61,
    lore: 'Định luật Ohm I = U / R điều khiển sự phân bố dòng điện trong các mạng lưới công nghệ.',
    appearance: { avatar: '⚡', themeColor: '#EAB308', bgGradient: 'from-yellow-950 via-slate-900 to-amber-950', badge: 'Định Luật Ohm' },
    skills: [
      { name: 'Xung Điện Cường Độ Cao', description: 'Phóng luồng điện 220V', damage: 2200, phase: 1 },
      { name: 'Đoản Mạch Bốc Khói', description: 'Quá tải điện năng', damage: 3350, phase: 2 },
      { name: 'Sấm Sét Tesla', description: 'Cột sét công phá cực đại', damage: 5050, phase: 3 }
    ],
    weakness: 'Định luật Ohm: I = U/R và công thức đoạn mạch nối tiếp/song song',
    quest: 'Lắp ráp mạch điện an toàn tiết kiệm điện năng gia đình',
    rewards: { exp: 8600, rp: 245, gold: 2900, badge: 'Đồng Hồ Vạn Năng', title: 'Kỹ Sư Điện Thông Minh', item: 'Cuộn Dây Đồng Siêu Dẫn' },
    questions: [
      { id: 'bq8_9_1', question: 'Theo định luật Ôm (Ohm), cường độ dòng điện (I) chạy qua dây dẫn tỉ lệ thuận và tỉ lệ nghịch với đại lượng nào?', options: ['Tỉ lệ thuận với hiệu điện thế (U), tỉ lệ nghịch với điện trở (R)', 'Tỉ lệ nghịch với U, tỉ lệ thuận với R', 'Tỉ lệ thuận với cả U và R', 'Tỉ lệ nghịch với cả U và R'], correctIndex: 0, explanation: 'Định luật Ohm: I = U/R.', damage: 24500, subject: 'KHTN 8' },
      { id: 'bq8_9_2', question: 'Đơn vị đo điện trở trong hệ đo lường quốc tế (SI) là gì?', options: ['Ôm (Ω)', 'Ampe (A)', 'Vôn (V)', 'Oát (W)'], correctIndex: 0, explanation: 'Điện trở đo bằng Ohm (kí hiệu Ω).', damage: 24500, subject: 'KHTN 8' },
      { id: 'bq8_9_3', question: 'Hình chóp tam giác đều có mặt đáy là hình gì?', options: ['Tam giác đều', 'Tam giác vuông', 'Hình vuông', 'Hình chữ nhật'], correctIndex: 0, explanation: 'Hình chóp tam giác đều có mặt đáy là một tam giác đều và các mặt bên là các tam giác cân bằng nhau.', damage: 24000, subject: 'Toán 8' }
    ]
  },
  {
    id: 'boss_8_10',
    order: 34,
    grade: 8,
    name: 'Thi Bá Tố Như',
    title: 'Hộ Linh Kiệt Tác Truyện Kiều',
    arena: 'Đài Thơ Đoạn Trường Tân Thanh',
    level: 34,
    maxHp: 74500,
    armor: 62,
    lore: 'Nguyễn Du - Đại thi hào dân tộc với 3.254 câu thơ lục bát tuyệt mỹ lay động hàng triệu trái tim nhân loại.',
    appearance: { avatar: '📜', themeColor: '#8B5CF6', bgGradient: 'from-purple-950 via-slate-900 to-indigo-950', badge: 'Đoạn Trường Tân Thanh' },
    skills: [
      { name: 'Cung Đàn Bạc Mệnh', description: 'Khúc đàn lay động càn khôn', damage: 2250, phase: 1 },
      { name: 'Thơ Lục Bát Tuyệt Tác', description: 'Ngòi bút sắc như dao mác', damage: 3450, phase: 2 },
      { name: 'Nỗi Đau Nhân Loại', description: 'Sức mạnh đồng cảm vĩ đại', damage: 5200, phase: 3 }
    ],
    weakness: 'Nghệ thuật miêu tả tâm lý và ngôn ngữ thơ Nôm bậc thầy',
    quest: 'Thấu hiểu giá trị hiện thực và nhân đạo sâu sắc của Truyện Kiều',
    rewards: { exp: 8900, rp: 250, gold: 3000, badge: 'Ngòi Bút Vàng Tố Như', title: 'Học Giả Văn Học', item: 'Bản Thảo Kiều Khắc Gỗ' },
    questions: [
      { id: 'bq8_8_2', question: 'Đại thi hào Nguyễn Du được tổ chức UNESCO vinh danh là Danh nhân văn hóa thế giới vào năm nào?', options: ['Năm 2015 (kỷ niệm 250 năm năm sinh của ông)', 'Năm 1980', 'Năm 2000', 'Năm 1990'], correctIndex: 0, explanation: 'UNESCO biểu quyết vinh danh Đại thi hào Nguyễn Du năm 2013 và tổ chức kỷ niệm toàn cầu năm 2015.', damage: 25000, subject: 'Ngữ văn 8' },
      { id: 'bq8_8_3', question: 'Hai câu thơ nổi tiếng: "Thiện căn ở tại lòng ta / Chữ tâm kia mới bằng ba chữ tài" nằm ở phần nào của Truyện Kiều?', options: ['Phần kết thúc tác phẩm Truyện Kiều', 'Phần mở đầu tác phẩm', 'Đoạn Kiều gặp Kim Trọng', 'Đoạn Kiều báo ân báo oán'], correctIndex: 0, explanation: 'Hai câu thơ đúc kết triết lý sống nhân văn ở cuối kiệt tác Truyện Kiều.', damage: 25000, subject: 'Ngữ văn 8' },
      { id: 'bq8_8_4', question: 'Hình chóp tứ giác đều có bao nhiêu mặt, bao nhiêu cạnh và bao nhiêu đỉnh?', options: ['5 mặt, 8 cạnh và 5 đỉnh', '4 mặt, 6 cạnh và 4 đỉnh', '6 mặt, 12 cạnh và 8 đỉnh', '5 mặt, 6 cạnh và 5 đỉnh'], correctIndex: 0, explanation: 'Hình chóp tứ giác đều gồm 1 đáy hình vuông + 4 mặt bên tam giác = 5 mặt, 8 cạnh và 5 đỉnh.', damage: 24500, subject: 'Toán 8' }
    ]
  },
  {
    id: 'boss_8_11',
    order: 35,
    grade: 8,
    name: 'Mật Mã An Ninh Mạng',
    title: 'Vệ Binh Tường Lửa & Mã Hóa Dữ Liệu',
    arena: 'Trung Tâm Dữ Liệu Quốc Gia',
    level: 35,
    maxHp: 76000,
    armor: 63,
    lore: 'Phòng chống các cuộc tấn công mạng DDoS và phần mềm tống tiền Ransomware.',
    appearance: { avatar: '🔐', themeColor: '#059669', bgGradient: 'from-emerald-950 via-slate-900 to-cyan-950', badge: 'Hiệp Sĩ An Ninh Mạng' },
    skills: [
      { name: 'Mã Hóa Bất Đối Xứng RSA', description: 'Khóa chặt dữ liệu', damage: 2300, phase: 1 },
      { name: 'Bẫy Honeypot Tác Chiến', description: 'Đánh lạc hướng đòn đánh', damage: 3550, phase: 2 },
      { name: 'Thanh Trừng Mã Độc Phản Đòn', description: 'Phản đòn sát thương kép', damage: 5350, phase: 3 }
    ],
    weakness: 'Các hình thức lừa đảo qua mạng (Phishing) và cách phòng vệ',
    quest: 'Bảo vệ tài khoản và không nhấp vào đường link giả mạo',
    rewards: { exp: 9200, rp: 255, gold: 3100, badge: 'Khiên An Ninh Số', title: 'Chuyên Gia Bảo Mật', item: 'Khóa Mã Hóa 256-Bit' },
    questions: [
      { id: 'bq8_11_1', question: 'Hình thức lừa đảo người dùng cung cấp thông tin tài khoản qua tin nhắn, email giả mạo được gọi là gì?', options: ['Phishing (Tấn công giả mạo)', 'DDoS (Tấn công từ chối dịch vụ)', 'Spam (Thư rác)', 'Adware (Phần mềm quảng cáo)'], correctIndex: 0, explanation: 'Phishing là hình thức lừa đảo giả mạo tổ chức uy tín để chiếm đoạt tài khoản, mật khẩu.', damage: 25500, subject: 'Tin học 8' },
      { id: 'bq8_11_2', question: 'Nguyên tắc vàng nào sau đây giúp học sinh an toàn khi sử dụng mạng xã hội?', options: ['Không chia sẻ mật khẩu, mã OTP và thông tin nhạy cảm cho bất kỳ ai', 'Chia sẻ công khai số điện thoại và địa chỉ nhà', 'Bấm vào mọi đường link nhận quà trúng thưởng', 'Kết bạn với tất cả người lạ'], correctIndex: 0, explanation: 'Bảo vệ thông tin cá nhân và tuyệt đối không chia sẻ mã OTP cho người khác.', damage: 25500, subject: 'Tin học 8' },
      { id: 'bq8_11_3', question: 'Đồ thị của hàm số y = ax (với a ≠ 0) là một đường thẳng:', options: ['Luôn đi qua gốc tọa độ O(0; 0)', 'Song song với trục hoành Ox', 'Song song với trục tung Oy', 'Không đi qua gốc tọa độ'], correctIndex: 0, explanation: 'Đồ thị hàm số y = ax luôn đi qua gốc tọa độ O(0; 0).', damage: 25000, subject: 'Toán 8' }
    ]
  },
  {
    id: 'boss_8_12',
    order: 36,
    grade: 8,
    name: 'Bất Đẳng Thức Thần Vương',
    title: 'Hộ Pháp Bất Đẳng Thức Cauchy & Cực Trị',
    arena: 'Đỉnh Cực Trị Toán Học',
    level: 36,
    maxHp: 77000,
    armor: 64,
    lore: 'Thử thách độ nhạy bén với bất đẳng thức Cauchy (AM-GM) tìm giá trị lớn nhất và nhỏ nhất.',
    appearance: { avatar: '📈', themeColor: '#4F46E5', bgGradient: 'from-indigo-950 via-slate-900 to-blue-950', badge: 'Bậc Thầy Bất Đẳng Thức' },
    skills: [
      { name: 'Kẹp Giữa Hai Giới Hạn', description: 'Bóp nghẹt phạm vi di chuyển', damage: 2350, phase: 1 },
      { name: 'Cauchy Bất Biến (a+b)/2 >= √(ab)', description: 'Tối ưu hóa sát thương', damage: 3650, phase: 2 },
      { name: 'Điểm Rơi Cực Trị', description: 'Cú giáng búa tạ ngay điểm rơi', damage: 5500, phase: 3 }
    ],
    weakness: 'Kỹ thuật chọn điểm rơi trong bất đẳng thức Cauchy',
    quest: 'Chinh phục bài toán cực trị đại số nâng cao',
    rewards: { exp: 9500, rp: 260, gold: 3200, badge: 'Đỉnh Cực Trị', title: 'Kỳ Tài Toán Học', item: 'Thấu Kính Cực Trị' },
    questions: [
      { id: 'bq8_12_1', question: 'Với hai số không âm a và b, bất đẳng thức Cô-si (Cauchy) khẳng định điều nào sau đây?', options: ['(a + b) / 2 >= √(a . b)', '(a + b) / 2 <= √(a . b)', 'a + b = √(a . b)', 'a^2 + b^2 <= 2ab'], correctIndex: 0, explanation: 'Bất đẳng thức AM-GM: Trung bình cộng luôn lớn hơn hoặc bằng trung bình nhân với các số không âm.', damage: 26000, subject: 'Toán 8' },
      { id: 'bq8_12_2', question: 'Dấu "=" trong bất đẳng thức Cauchy (a + b) / 2 >= √(a . b) xảy ra khi nào?', options: ['Khi a = b', 'Khi a = 0', 'Khi b = 0', 'Khi a > b'], correctIndex: 0, explanation: 'Dấu đẳng thức xảy ra khi và chỉ khi hai số bằng nhau (a = b).', damage: 26000, subject: 'Toán 8' },
      { id: 'bq8_12_3', question: 'Acid clohiđric (Hydrochloric acid) có công thức hóa học là:', options: ['HCl', 'H2SO4', 'HNO3', 'CH3COOH'], correctIndex: 0, explanation: 'Công thức hóa học của axit clohidric là HCl.', damage: 25000, subject: 'KHTN 8' }
    ]
  },
  {
    id: 'boss_8_13',
    order: 37,
    grade: 8,
    name: 'Đại Chu Văn An Chí Tôn',
    title: 'Vạn Thế Sư Biểu (Trùm Cuối Khối 8)',
    arena: 'Quốc Tử Giám - Trường Đại Học Đầu Tiên',
    level: 37,
    maxHp: 78000,
    armor: 65,
    lore: 'Người thầy của muôn đời với Thất trảm sớ cương trực - Trùm cuối Khối 8 thử thách toàn bộ kiến thức lớp 8.',
    appearance: { avatar: '🎓', themeColor: '#E11D48', bgGradient: 'from-rose-950 via-slate-900 to-indigo-950', badge: 'VƯƠNG MIỆN KHỐI 8' },
    skills: [
      { name: 'Thất Trảm Sớ Cương Trực', description: 'Trảm tan tà khí bất chính', damage: 2450, phase: 1 },
      { name: 'Văn Miếu Hào Quang', description: 'Trí tuệ nghìn năm soi chiếu', damage: 3800, phase: 2 },
      { name: 'Đạo Học Ngàn Đời', description: 'Đòn uy đức tối thượng Khối 8', damage: 5700, phase: 3 }
    ],
    weakness: 'Tổng hợp tri thức Toán, Văn, KHTN, Sử - Địa, Tin học lớp 8',
    quest: 'Vượt qua 13 Boss Khối 8 để bước lên đỉnh cao Khối 9',
    rewards: { exp: 10000, rp: 300, gold: 3500, badge: 'Đại Trạng Nguyên Khối 8', title: 'Huyền Thoại Khối 8', item: 'Thẻ Bài Quốc Tử Giám' },
    questions: [
      { id: 'bq8_13_1', question: 'Thầy Chu Văn An từng dâng sớ gì lên vua Trần Dụ Tông đòi chém 7 tên nịnh thần lộng quyền?', options: ['Thất trảm sớ', 'Trảm gian sớ', 'Trị quốc sớ', 'Can gián thư'], correctIndex: 0, explanation: 'Thất trảm sớ thể hiện tấm lòng cương trực vì nước vì dân sáng ngời của thầy Chu Văn An.', damage: 26000, subject: 'Lịch sử 8' },
      { id: 'bq8_13_2', question: 'Quốc Tử Giám được thành lập vào năm 1076 dưới thời vị vua nào của triều Lý?', options: ['Vua Lý Nhân Tông', 'Vua Lý Thái Tổ', 'Vua Lý Thái Tông', 'Vua Lý Thánh Tông'], correctIndex: 0, explanation: 'Năm 1076, vua Lý Nhân Tông cho lập Quốc Tử Giám - trường đại học đầu tiên của Việt Nam.', damage: 26000, subject: 'Lịch sử 8' },
      { id: 'bq8_13_3', question: 'Hệ số góc của đường thẳng y = 3x - 5 là:', options: ['3', '-5', '-3', '5'], correctIndex: 0, explanation: 'Đường thẳng y = ax + b có hệ số góc là a (ở đây a = 3).', damage: 26000, subject: 'Toán 8' }
    ]
  },

  // =========================================================================
  // KHU VỰC 4: KHỐI 9 (13 BOSS) — "THẦN CHIẾN TỐI THƯỢNG"
  // =========================================================================
  {
    id: 'boss_9_1',
    order: 38,
    grade: 9,
    name: 'Căn Thức Vô Tận',
    title: 'Hộ Pháp Căn Bậc Hai & Căn Bậc Ba',
    arena: 'Thung Lũng Căn Số Vô Tỉ',
    level: 38,
    maxHp: 80000,
    armor: 56,
    lore: 'Nắm giữ bí mật phép biến đổi căn thức và trục căn thức ở mẫu thức trong kỳ thi tuyển sinh vào 10.',
    appearance: { avatar: '√', themeColor: '#3B82F6', bgGradient: 'from-blue-950 via-slate-900 to-indigo-950', badge: 'Bậc Thầy Căn Thức' },
    skills: [
      { name: 'Trục Căn Ở Mẫu', description: 'Đánh bật phòng ngự', damage: 2500, phase: 1 },
      { name: 'Căn Bậc Hai Lồng Nhau', description: 'Bẫy rối loạn phép tính', damage: 3900, phase: 2 },
      { name: 'Vô Tỉ Bộc Phá', description: 'Sức mạnh căn số vô cực', damage: 5900, phase: 3 }
    ],
    weakness: 'Điều kiện xác định căn thức: √(A) có nghĩa khi A >= 0',
    quest: 'Rút gọn hoàn chỉnh biểu thức chứa căn thức thi vào 10',
    rewards: { exp: 10500, rp: 310, gold: 3600, badge: 'Thần Toán Tuyển Sinh', title: 'Chiến Tướng Tuyển Sinh', item: 'Thước Kẻ Tuyển Sinh Vàng' },
    questions: [
      { id: 'bq9_1_1', question: 'Biểu thức √(2x - 6) có nghĩa khi và chỉ khi:', options: ['x >= 3', 'x > 3', 'x <= 3', 'x ≠ 3'], correctIndex: 0, explanation: '2x - 6 >= 0 -> 2x >= 6 -> x >= 3.', damage: 27000, subject: 'Toán 9' },
      { id: 'bq9_1_2', question: 'Căn bậc hai số học của 81 là:', options: ['9', '-9', '±9', '81'], correctIndex: 0, explanation: 'Căn bậc hai số học của một số không âm là số không âm bình phương bằng số đó: √81 = 9.', damage: 27000, subject: 'Toán 9' },
      { id: 'bq9_1_3', question: 'Gen là một đoạn của phân tử nào mang thông tin mã hóa cho một sản phẩm xác định?', options: ['Phân tử ADN', 'Phân tử ARN', 'Phân tử Protein', 'Phân tử Lipid'], correctIndex: 0, explanation: 'Gen là một đoạn của phân tử ADN mang thông tin di truyền.', damage: 26000, subject: 'KHTN 9 (Sinh học)' }
    ]
  },
  {
    id: 'boss_9_2',
    order: 39,
    grade: 9,
    name: 'Di Truyền Mendel Thần',
    title: 'Bậc Thầy Quy Luật Di Truyền & NST',
    arena: 'Khu Vườn Đậu Hà Lan Cổ',
    level: 39,
    maxHp: 82000,
    armor: 57,
    lore: 'Các quy luật di truyền phân ly độc lập của Mendel và chu kỳ nguyên phân, giảm phân tế bào.',
    appearance: { avatar: '🧬', themeColor: '#10B981', bgGradient: 'from-emerald-950 via-slate-900 to-teal-950', badge: 'Học Thuyết Mendel' },
    skills: [
      { name: 'Phân Ly Độc Lập 9:3:3:1', description: 'Tách lẻ đòn đánh', damage: 2600, phase: 1 },
      { name: 'Đột Biến Nhiễm Sắc Thể', description: 'Biến đổi cấu trúc chiến đấu', damage: 4050, phase: 2 },
      { name: 'Di Truyền Liên Kết Hoàn Hảo', description: 'Khóa chặt đồng đội', damage: 6100, phase: 3 }
    ],
    weakness: 'Tỉ lệ kiểu gen, kiểu hình và phương pháp lai phân tích',
    quest: 'Giải mã bài tập di truyền lai hai cặp tính trạng',
    rewards: { exp: 11000, rp: 320, gold: 3800, badge: 'Chuỗi Xoắn Kép ADN', title: 'Nhà Di Truyền Trẻ', item: 'Kính Hiển Vi Điện Tử' },
    questions: [
      { id: 'bq9_2_1', question: 'Theo Men-đen, khi lai hai cơ thể bố mẹ thuần chủng khác nhau về một cặp tính trạng tương phản thì F2 có tỉ lệ kiểu hình phân ly là:', options: ['3 trội : 1 lặn', '1 trội : 1 lặn', '100% đồng tính', '9 : 3 : 3 : 1'], correctIndex: 0, explanation: 'Quy luật phân ly của Mendel: F2 phân ly theo tỉ lệ xấp xỉ 3 trội : 1 lặn.', damage: 27500, subject: 'KHTN 9' },
      { id: 'bq9_2_2', question: 'Ở người, bộ nhiễm sắc thể lưỡng bội (2n) bình thường có số lượng là bao nhiêu?', options: ['2n = 46 chiếc (23 cặp)', '2n = 48 chiếc', '2n = 23 chiếc', '2n = 78 chiếc'], correctIndex: 0, explanation: 'Bộ NST của người gồm 23 cặp tương đồng = 46 chiếc NST.', damage: 27500, subject: 'KHTN 9' },
      { id: 'bq9_2_3', question: 'Hệ phương trình bậc nhất hai ẩn { x + y = 5; x - y = 1 } có nghiệm (x; y) là:', options: ['(3; 2)', '(2; 3)', '(4; 1)', '(5; 0)'], correctIndex: 0, explanation: 'Cộng 2 vế: 2x = 6 -> x = 3 -> y = 2.', damage: 27000, subject: 'Toán 9' }
    ]
  },
  {
    id: 'boss_9_3',
    order: 40,
    grade: 9,
    name: 'Kim Loại Kiềm Thần',
    title: 'Hộ Pháp Dãy Hoạt Động Hóa Học',
    arena: 'Lò Điện Phân Nhôm Nóng Chảy',
    level: 40,
    maxHp: 84000,
    armor: 58,
    lore: 'Dãy hoạt động hóa học của kim loại: K, Na, Ba, Ca, Mg, Al, Zn, Fe, Ni, Sn, Pb, (H), Cu, Hg, Ag, Pt, Au.',
    appearance: { avatar: '🔩', themeColor: '#64748B', bgGradient: 'from-slate-950 via-zinc-900 to-slate-950', badge: 'Dãy Hoạt Động Kim Loại' },
    skills: [
      { name: 'Natri Nổ Trong Nước', description: 'Bộc phát khí hydro cháy sáng', damage: 2700, phase: 1 },
      { name: 'Ăn Mòn Điện Hóa', description: 'Phá hủy giáp kim loại', damage: 4200, phase: 2 },
      { name: 'Nhiệt Nhôm Nóng Chảy', description: 'Hàn gắn thanh ray hỏa tiễn', damage: 6300, phase: 3 }
    ],
    weakness: 'Thứ tự đẩy kim loại yếu hơn ra khỏi dung dịch muối',
    quest: 'Luyện kim hợp kim nhôm siêu nhẹ bền bỉ',
    rewards: { exp: 11500, rp: 330, gold: 4000, badge: 'Thỏi Vàng 9999', title: 'Đại Sư Luyện Kim', item: 'Thanh Nhôm Hàng Không' },
    questions: [
      { id: 'bq9_3_1', question: 'Kim loại nào sau đây phản ứng mãnh liệt với nước ở nhiệt độ thường giải phóng khí Hydro?', options: ['Natri (Na)', 'Đồng (Cu)', 'Sắt (Fe)', 'Bạc (Ag)'], correctIndex: 0, explanation: 'Natri là kim loại kiềm phản ứng rất mạnh với nước: 2Na + 2H2O -> 2NaOH + H2.', damage: 28000, subject: 'KHTN 9 (Hóa học)' },
      { id: 'bq9_9_2', question: 'Kim loại nào có tính dẫn điện và dẫn nhiệt tốt nhất trong tất cả các kim loại?', options: ['Bạc (Ag)', 'Đồng (Cu)', 'Vàng (Au)', 'Nhôm (Al)'], correctIndex: 0, explanation: 'Thứ tự dẫn điện: Ag > Cu > Au > Al > Fe.', damage: 28000, subject: 'KHTN 9 (Hóa học)' },
      { id: 'bq9_3_3', question: 'Đồ thị hàm số bậc nhất y = ax + b song song với đường thẳng y = 2x + 1 khi:', options: ['a = 2 và b ≠ 1', 'a = 2 và b = 1', 'a = -2', 'a ≠ 2'], correctIndex: 0, explanation: 'Hai đường thẳng song song khi a = a\' và b ≠ b\'.', damage: 28000, subject: 'Toán 9' }
    ]
  },
  {
    id: 'boss_9_4',
    order: 41,
    grade: 9,
    name: 'Quang Học Thấu Kính Thần',
    title: 'Chúa Tể Thấu Kính Hội Tụ & Phân Kỳ',
    arena: 'Kính Viễn Vọng Vũ Trụ James Webb',
    level: 41,
    maxHp: 86000,
    armor: 59,
    lore: 'Đường truyền 3 tia sáng đặc biệt qua thấu kính hội tụ và ứng dụng trong mắt cận, máy ảnh kỹ thuật số.',
    appearance: { avatar: '🔭', themeColor: '#F59E0B', bgGradient: 'from-amber-950 via-slate-900 to-orange-950', badge: 'Thấu Kính Hội Tụ' },
    skills: [
      { name: 'Tia Sáng Qua Quang Tâm O', description: 'Tiếp tục truyền thẳng không đổi hướng', damage: 2800, phase: 1 },
      { name: 'Tia Sáng Song Song Trục Chính', description: 'Hội tụ tại tiêu điểm F', damage: 4350, phase: 2 },
      { name: 'Chùm Laser Tiêu Điểm', description: 'Đốt cháy mục tiêu ở tiêu cự', damage: 6500, phase: 3 }
    ],
    weakness: 'Công thức thấu kính 1/f = 1/d + 1/d\' và tật cận thị của mắt',
    quest: 'Khắc phục tật cận thị học đường cho học sinh THCS',
    rewards: { exp: 12000, rp: 340, gold: 4200, badge: 'Thấu Kính Vàng', title: 'Quang Học Gia', item: 'Thấu Kính Thiên Văn Siêu Nét' },
    questions: [
      { id: 'bq9_4_1', question: 'Người bị tật cận thị phải đeo loại kính nào có tiêu cự phù hợp để nhìn rõ các vật ở xa?', options: ['Kính phân kỳ', 'Kính hội tụ', 'Kính hai tròng', 'Kính râm'], correctIndex: 0, explanation: 'Kính cận là thấu kính phân kỳ giúp tạo ảnh lùi về màng lưới của mắt.', damage: 29000, subject: 'KHTN 9 (Vật lý)' },
      { id: 'bq9_4_2', question: 'Vật đặt ngoài khoảng tiêu cự (d > f) của thấu kính hội tụ luôn cho ảnh có đặc điểm gì?', options: ['Ảnh thật, ngược chiều với vật', 'Ảnh ảo, cùng chiều với vật', 'Ảnh ảo, nhỏ hơn vật', 'Không tạo thành ảnh'], correctIndex: 0, explanation: 'Vật đặt ngoài tiêu cự của thấu kính hội tụ cho ảnh thật, ngược chiều.', damage: 29000, subject: 'KHTN 9 (Vật lý)' },
      { id: 'bq9_4_3', question: 'Góc nội tiếp chắn nửa đường tròn luôn có số đo bằng bao nhiêu độ?', options: ['90° (góc vuông)', '180°', '60°', '45°'], correctIndex: 0, explanation: 'Định lý hình học 9: Góc nội tiếp chắn nửa đường tròn là góc vuông (90°).', damage: 28000, subject: 'Toán 9' }
    ]
  },
  {
    id: 'boss_9_5',
    order: 42,
    grade: 9,
    name: 'Đại Tướng Điện Biên Phủ',
    title: 'Lừng Lẫy Năm Châu Chấn Động Địa Cầu',
    arena: 'Thung Lũng Điện Biên Lửa Đạn 1954',
    level: 42,
    maxHp: 88000,
    armor: 60,
    lore: '56 ngày đêm khoét núi ngủ hầm mưa dầm cơm vắt làm nên đại thắng Điện Biên Phủ lịch sử.',
    appearance: { avatar: '🎖️', themeColor: '#B91C1C', bgGradient: 'from-red-950 via-slate-900 to-stone-950', badge: 'Điện Biên Phủ 1954' },
    skills: [
      { name: 'Kéo Pháo Lên Dốc Him Lam', description: 'Ý chí kiên cường thép', damage: 2900, phase: 1 },
      { name: 'Chiến Hào Siết Chặt Tập Đoàn Cứ Điểm', description: 'Cắt đứt tiếp tế hàng không', damage: 4500, phase: 2 },
      { name: 'Cờ Quyết Chiến Quyết Thắng Đờ Cát', description: 'Đại thắng 7/5/1954 vang dội', damage: 6700, phase: 3 }
    ],
    weakness: 'Phương châm chuyển từ "Đánh nhanh thắng nhanh" sang "Đánh chắc tiến chắc"',
    quest: 'Tôn vinh chiến công chấn động địa cầu của Đại tướng Võ Nguyên Giáp',
    rewards: { exp: 12500, rp: 350, gold: 4400, badge: 'Huân Chương Điện Biên', title: 'Chiến Sĩ Điện Biên', item: 'Lá Cờ Quyết Chiến Quyết Thắng' },
    questions: [
      { id: 'bq9_5_1', question: 'Chiến dịch Điện Biên Phủ toàn thắng vào ngày, tháng, năm nào?', options: ['Ngày 7 tháng 5 năm 1954', 'Ngày 13 tháng 3 năm 1954', 'Ngày 2 tháng 9 năm 1945', 'Ngày 30 tháng 4 năm 1975'], correctIndex: 0, explanation: '17h30 ngày 7/5/1954, lá cờ Quyết chiến Quyết thắng tung bay trên nóc hầm Đờ Cát, chiến dịch toàn thắng.', damage: 30000, subject: 'Lịch sử 9' },
      { id: 'bq9_5_2', question: 'Quyết định lịch sử sáng suốt nhất của Đại tướng Võ Nguyên Giáp trong chiến dịch Điện Biên Phủ là gì?', options: ['Chuyển từ phương châm "Đánh nhanh thắng nhanh" sang "Đánh chắc tiến chắc"', 'Rút lui toàn bộ quân đội', 'Đánh phủ đầu trong 2 ngày', 'Xin viện trợ vũ khí nước ngoài'], correctIndex: 0, explanation: 'Quyết định lịch sử thay đổi phương châm đảm bảo chắc thắng tuyệt đối cho chiến dịch.', damage: 30000, subject: 'Lịch sử 9' },
      { id: 'bq9_5_3', question: 'Định lý Vi-ét (Viète) cho phương trình bậc hai ax^2 + bx + c = 0 (a ≠ 0) khẳng định tổng hai nghiệm x1 + x2 bằng:', options: ['-b / a', 'b / a', 'c / a', '-c / a'], correctIndex: 0, explanation: 'Định lý Viète: x1 + x2 = -b/a và x1 . x2 = c/a.', damage: 29000, subject: 'Toán 9' }
    ]
  },
  {
    id: 'boss_9_6',
    order: 43,
    grade: 9,
    name: 'Đại Thắng Mùa Xuân 1975',
    title: 'Hộ Linh Chiến Dịch Hồ Chí Minh Lịch Sử',
    arena: 'Dinh Độc Lập - Đại Thắng 30/4',
    level: 43,
    maxHp: 90000,
    armor: 61,
    lore: 'Chiến dịch Hồ Chí Minh lịch sử giải phóng hoàn toàn miền Nam, non sông thu về một mối.',
    appearance: { avatar: '🕊️', themeColor: '#DC2626', bgGradient: 'from-red-950 via-slate-900 to-amber-950', badge: '30 Tháng 4 Năm 1975' },
    skills: [
      { name: 'Thần Tốc Táo Bạo Bất Ngờ', description: 'Hành quân ngày đêm giải phóng duyên hải', damage: 3000, phase: 1 },
      { name: 'Năm Cánh Quân Tiến Về Sài Gòn', description: 'Hội quân bao vây đầu não', damage: 4650, phase: 2 },
      { name: 'Xe Tăng Húc Đổ Cổng Dinh Độc Lập', description: 'Khoảnh khắc khải hoàn vĩ đại 11h30', damage: 6900, phase: 3 }
    ],
    weakness: 'Nghệ thuật chớp thời cơ chiến lược và sức mạnh toàn dân tộc',
    quest: 'Gìn giữ nền hòa bình độc lập và toàn vẹn lãnh thổ Tổ quốc',
    rewards: { exp: 13000, rp: 360, gold: 4600, badge: 'Huy Hiệu Giải Phóng', title: 'Khải Hoàn Đại Thắng', item: 'Bản Đồ Chiến Dịch Hồ Chí Minh' },
    questions: [
      { id: 'bq9_6_1', question: 'Xe tăng số hiệu 390 và 843 húc đổ cổng Dinh Độc Lập vào trưa ngày lịch sử nào?', options: ['Trưa ngày 30 tháng 4 năm 1975 (11h30)', 'Ngày 26 tháng 3 năm 1975', 'Ngày 1 tháng 5 năm 1975', 'Ngày 2 tháng 9 năm 1975'], correctIndex: 0, explanation: 'Đúng 11h30 ngày 30/4/1975, lá cờ cách mạng tung bay trên nóc Dinh Độc Lập, miền Nam hoàn toàn giải phóng.', damage: 31000, subject: 'Lịch sử 9' },
      { id: 'bq9_6_2', question: 'Chiến dịch giải phóng Sài Gòn - Gia Định được Bộ Chính trị quyết định đổi tên thành chiến dịch gì?', options: ['Chiến dịch Hồ Chí Minh', 'Chiến dịch Tây Nguyên', 'Chiến dịch Huế - Đà Nẵng', 'Chiến dịch Đường 9 - Khe Sanh'], correctIndex: 0, explanation: 'Ngày 14/4/1975, Bộ Chính trị phê chuẩn đổi tên chiến dịch giải phóng Sài Gòn thành Chiến dịch Hồ Chí Minh.', damage: 31000, subject: 'Lịch sử 9' },
      { id: 'bq9_6_3', question: 'Biệt thức Delta (Δ) của phương trình bậc hai ax^2 + bx + c = 0 được tính theo công thức:', options: ['Δ = b^2 - 4ac', 'Δ = b^2 + 4ac', 'Δ = 4ac - b^2', 'Δ = b - 4ac'], correctIndex: 0, explanation: 'Delta = b^2 - 4ac quyết định số nghiệm của phương trình bậc hai.', damage: 30000, subject: 'Toán 9' }
    ]
  },
  {
    id: 'boss_9_7',
    order: 44,
    grade: 9,
    name: 'Hydrocarbon Bùng Cháy',
    title: 'Chúa Tể Dầu Mỏ & Hợp Chất Hữu Cơ',
    arena: 'Giàn Khoan Dầu Khí Bạch Hổ',
    level: 44,
    maxHp: 91500,
    armor: 62,
    lore: 'Mêtan (CH4), Etilen (C2H4) và Axetilen (C2H2) - các hydrocarbon nền tảng của ngành công nghiệp hóa dầu hiện đại.',
    appearance: { avatar: '🛢️', themeColor: '#CA8A04', bgGradient: 'from-yellow-950 via-slate-900 to-amber-950', badge: 'Dầu Khí Bạch Hổ' },
    skills: [
      { name: 'Ngọn Lửa Mêtan Xanh Biếc', description: 'Đốt cháy không tạo khói', damage: 3100, phase: 1 },
      { name: 'Phép Cộng Mất Màu Nước Brom', description: 'Liên kết đôi C=C bẻ gãy', damage: 4800, phase: 2 },
      { name: 'Nổ Khí Mỏ Than Hầm Lò', description: 'Sức ép khí cực mạnh', damage: 7100, phase: 3 }
    ],
    weakness: 'Phản ứng đặc trưng của liên kết đôi (Etilen) và liên kết ba (Axetilen)',
    quest: 'Khai thác an toàn tài nguyên dầu khí biển Đông',
    rewards: { exp: 13500, rp: 370, gold: 4800, badge: 'Giọt Dầu Vàng', title: 'Kỹ Sư Dầu Khí', item: 'Mẫu Dầu Thô Bạch Hổ' },
    questions: [
      { id: 'bq9_7_1', question: 'Khí nào sau đây làm mất màu da cam của dung dịch nước Brom (Bromine) ở điều kiện thường?', options: ['Etilen (C2H4)', 'Metan (CH4)', 'Cacbonic (CO2)', 'Oxi (O2)'], correctIndex: 0, explanation: 'Etilen có liên kết đôi C=C kém bền nên dễ tham gia phản ứng cộng làm mất màu dung dịch Brom.', damage: 31500, subject: 'KHTN 9 (Hóa học)' },
      { id: 'bq9_7_2', question: 'Khí gas đun nấu sinh hoạt hàng ngày thành phần chính gồm hỗn hợp hai khí hydrocarbon nào?', options: ['Propan (C3H8) và Butan (C4H10)', 'Metan và Oxi', 'Hidro và Cacbonic', 'Etilen và Axetilen'], correctIndex: 0, explanation: 'Khí dầu mỏ hóa lỏng (LPG) chủ yếu chứa propan và butan nén ở áp suất cao.', damage: 31500, subject: 'KHTN 9 (Hóa học)' },
      { id: 'bq9_7_3', question: 'Công thức tính độ dài đường tròn (chu vi hình tròn) bán kính R là:', options: ['C = 2πR', 'C = πR^2', 'C = πR', 'C = 4πR'], correctIndex: 0, explanation: 'Chu vi đường tròn: C = 2πR = πd.', damage: 30000, subject: 'Toán 9' }
    ]
  },
  {
    id: 'boss_9_8',
    order: 45,
    grade: 9,
    name: 'Vũ Trụ Không Gian Số',
    title: 'Hộ Pháp Dữ Liệu Lớn & Đám Mây Cloud',
    arena: 'Trạm Vũ Trụ Số Quốc Tế',
    level: 45,
    maxHp: 93000,
    armor: 62,
    lore: 'Điện toán đám mây và kết nối vạn vật (IoT) dẫn dắt cuộc cách mạng công nghiệp lần thứ tư (4.0).',
    appearance: { avatar: '☁️', themeColor: '#06B6D4', bgGradient: 'from-cyan-950 via-slate-900 to-blue-950', badge: 'Điện Toán Đám Mây' },
    skills: [
      { name: 'Đồng Bộ Hóa Đám Mây Sync', description: 'Tải dữ liệu tức thì', damage: 3200, phase: 1 },
      { name: 'Xử Lý Song Song Big Data', description: 'Phân tích đa luồng sát thương', damage: 4950, phase: 2 },
      { name: 'Tắt Mạng Toàn Cầu Offline', description: 'Đóng băng hành động đối phương', damage: 7300, phase: 3 }
    ],
    weakness: 'Hiểu biết về dịch vụ lưu trữ đám mây và bảo vệ tài khoản số',
    quest: 'Làm chủ công nghệ điện toán đám mây phục vụ học tập',
    rewards: { exp: 14000, rp: 380, gold: 5000, badge: 'Đám Mây Bạc', title: 'Chuyên Gia Điện Toán', item: 'Ổ Cứng Lượng Tử TB' },
    questions: [
      { id: 'bq9_8_1', question: 'Ưu điểm nổi bật nhất của dịch vụ lưu trữ đám mây (Google Drive, OneDrive...) là gì?', options: ['Truy cập và đồng bộ dữ liệu mọi lúc mọi nơi từ bất kỳ thiết bị nào có Internet', 'Chỉ lưu trữ được file văn bản', 'Không cần kết nối mạng', 'Tự động xóa file sau 24h'], correctIndex: 0, explanation: 'Lưu trữ đám mây giúp truy cập dữ liệu linh hoạt, an toàn và dễ dàng chia sẻ.', damage: 32000, subject: 'Tin học 9' },
      { id: 'bq9_8_2', question: 'Hệ điều hành phổ biến nhất hiện nay trên máy tính xách tay cá nhân (PC/Laptop) là:', options: ['Microsoft Windows', 'Android', 'iOS', 'MS-DOS'], correctIndex: 0, explanation: 'Windows là hệ điều hành máy tính có thị phần lớn nhất trên toàn cầu.', damage: 32000, subject: 'Tin học 9' },
      { id: 'bq9_8_3', question: 'Diện tích hình quạt tròn bán kính R, cung n° được tính theo công thức:', options: ['S = (π . R^2 . n) / 360', 'S = (π . R . n) / 180', 'S = 2πR', 'S = πR^2'], correctIndex: 0, explanation: 'Diện tích quạt tròn: S = (πR^2 . n) / 360.', damage: 31000, subject: 'Toán 9' }
    ]
  },
  {
    id: 'boss_9_9',
    order: 46,
    grade: 9,
    name: 'Tứ Giác Nội Tiếp Thần Vương',
    title: 'Hộ Pháp Hình Học Tuyển Sinh Vào 10',
    arena: 'Vòng Tròn Ngoại Tiếp Càn Khôn',
    level: 46,
    maxHp: 94500,
    armor: 63,
    lore: 'Bài toán tứ giác nội tiếp đường tròn - câu chốt then chốt quyết định điểm 9, 10 trong kỳ thi vào lớp 10.',
    appearance: { avatar: '⭕', themeColor: '#8B5CF6', bgGradient: 'from-purple-950 via-slate-900 to-indigo-950', badge: 'Tứ Giác Nội Tiếp' },
    skills: [
      { name: 'Tổng Hai Góc Đối 180°', description: 'Khóa góc tấn công', damage: 3300, phase: 1 },
      { name: 'Cùng Nhìn Một Cạnh Dưới Góc Bằng Nhau', description: 'Phản chiếu sát thương chính xác', damage: 5100, phase: 2 },
      { name: 'Tiếp Tuyến Vuông Góc Bán Kính', description: 'Đòn bổ dọc từ tiếp điểm', damage: 7500, phase: 3 }
    ],
    weakness: '4 dấu hiệu nhận biết tứ giác nội tiếp kinh điển',
    quest: 'Giải quyết trọn vẹn câu hình học thi vào lớp 10 THPT công lập',
    rewards: { exp: 14500, rp: 390, gold: 5200, badge: 'Vòng Tròn Euclid', title: 'Nhà Hình Học Đỉnh Cao', item: 'Com-pa Thần Kỳ' },
    questions: [
      { id: 'bq9_9_1', question: 'Dấu hiệu nào sau đây chứng minh một tứ giác nội tiếp được trong một đường tròn?', options: ['Tứ giác có tổng hai góc đối diện bằng 180°', 'Tứ giác có hai đường chéo bằng nhau', 'Tứ giác có hai cạnh đối song song', 'Tứ giác có 4 góc vuông'], correctIndex: 0, explanation: 'Dấu hiệu cơ bản: Tứ giác có tổng hai góc đối bằng 180° là tứ giác nội tiếp.', damage: 33000, subject: 'Toán 9' },
      { id: 'bq9_9_2', question: 'Góc tạo bởi tiếp tuyến và dây cung có số đo bằng:', options: ['Nửa số đo của cung bị chắn', 'Số đo của cung bị chắn', 'Gấp đôi số đo cung bị chắn', 'Luôn bằng 90°'], correctIndex: 0, explanation: 'Định lý hình học 9: Số đo góc tạo bởi tiếp tuyến và dây cung bằng nửa số đo cung bị chắn.', damage: 33000, subject: 'Toán 9' },
      { id: 'bq9_9_3', question: 'Trong Tiếng Anh: "If I ______ study hard, I will pass the entrance examination."', options: ['study', 'studied', 'will study', 'am studying'], correctIndex: 0, explanation: 'Câu điều kiện loại 1 (First Conditional): Mệnh đề If chia ở thì hiện tại đơn (study).', damage: 32000, subject: 'Tiếng Anh 9' }
    ]
  },
  {
    id: 'boss_9_10',
    order: 47,
    grade: 9,
    name: 'Bác Hồ Kính Yêu - Bản Tuyên Ngôn Độc Lập',
    title: 'Khai Sinh Nước Việt Nam Dân Chủ Cộng Hòa',
    arena: 'Quảng Trường Ba Đình Lịch Sử 2/9/1945',
    level: 47,
    maxHp: 96000,
    armor: 63,
    lore: 'Ngày 2/9/1945 tại Ba Đình, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập khai sinh nước Việt Nam mới.',
    appearance: { avatar: '⭐', themeColor: '#DC2626', bgGradient: 'from-red-950 via-slate-900 to-yellow-950', badge: 'Tuyên Ngôn Độc Lập 2/9' },
    skills: [
      { name: 'Lời Tuyên Ngôn Bất Hủ', description: 'Trích dẫn chân lý nhân loại', damage: 3400, phase: 1 },
      { name: 'Hào Khí Mùa Thu Cách Mạng', description: 'Sức mạnh quật khởi giành chính quyền', damage: 5250, phase: 2 },
      { name: 'Quyền Độc Lập Tự Do Bất Diệt', description: 'Ý chí kiên quyết giữ vững nền tự do', damage: 7700, phase: 3 }
    ],
    weakness: 'Chân lý bất hủ: "Không có gì quý hơn độc lập, tự do"',
    quest: 'Khắc sâu công lao vĩ đại của Chủ tịch Hồ Chí Minh đối với non sông đất nước',
    rewards: { exp: 15000, rp: 400, gold: 5500, badge: 'Sao Vàng Ba Đình', title: 'Thế Hệ Hồ Chí Minh', item: 'Bản Tuyên Ngôn Độc Lập Mạ Vàng' },
    questions: [
      { id: 'bq9_10_1', question: 'Bản Tuyên ngôn Độc lập bất hủ ngày 2/9/1945 được Chủ tịch Hồ Chí Minh soạn thảo tại ngôi nhà nào ở Hà Nội?', options: ['Số 48 phố Hàng Ngang (Hà Nội)', 'Số 5D Hàm Long', 'Nhà sàn Phủ Chủ tịch', 'Số 90 Thợ Nhuộm'], correctIndex: 0, explanation: 'Bác Hồ soạn thảo bản Tuyên ngôn Độc lập tại căn gác 2, nhà số 48 phố Hàng Ngang.', damage: 34000, subject: 'Lịch sử 9' },
      { id: 'bq9_10_2', question: 'Câu nói xúc động của Bác Hồ giữa bài đọc Tuyên ngôn Độc lập được nhân dân đồng thanh hô vang: "Có!" là câu nào?', options: ['"Tôi nói đồng bào nghe rõ không?"', '"Nước Việt Nam có quyền hưởng tự do"', '"Tất cả mọi người sinh ra đều có quyền bình đẳng"', '"Độc lập muôn năm!"'], correctIndex: 0, explanation: 'Câu hỏi giản dị, ấm áp chan chứa tình thương dân tộc của vị Cha già muôn vàn kính yêu.', damage: 34000, subject: 'Ngữ văn 9' },
      { id: 'bq9_10_3', question: 'Công thức tính thể tích hình trụ có bán kính đáy R và chiều cao h là:', options: ['V = π . R^2 . h', 'V = 2πRh', 'V = (1/3)πR^2h', 'V = (4/3)πR^3'], correctIndex: 0, explanation: 'Thể tích hình trụ bằng diện tích đáy nhân chiều cao: V = S . h = πR^2h.', damage: 33000, subject: 'Toán 9' }
    ]
  },
  {
    id: 'boss_9_11',
    order: 48,
    grade: 9,
    name: 'Thần Trụ Đổi Mới Toàn Diện',
    title: 'Kỷ Nguyên Công Nghiệp Hóa & Hội Nhập Quốc Tế',
    arena: 'Khu Công Nghệ Cao Quốc Gia',
    level: 48,
    maxHp: 97500,
    armor: 64,
    lore: 'Đại hội Đảng VI năm 1986 mở ra công cuộc Đổi mới đưa đất nước vươn mình trở thành con rồng kinh tế châu Á.',
    appearance: { avatar: '🏙️', themeColor: '#2563EB', bgGradient: 'from-blue-950 via-slate-900 to-indigo-950', badge: 'Việt Nam Đổi Mới 1986' },
    skills: [
      { name: 'Luồng Gió Đổi Mới 1986', description: 'Xóa bỏ bao cấp phát triển kinh tế thị trường', damage: 3500, phase: 1 },
      { name: 'Khu Công Nghiệp Hiện Đại', description: 'Sản xuất công nghệ quy mô lớn', damage: 5400, phase: 2 },
      { name: 'Khát Vọng Hùng Cường 2045', description: 'Sức mạnh vươn tầm cường quốc', damage: 7900, phase: 3 }
    ],
    weakness: 'Đường lối Đổi mới toàn diện và hội nhập kinh tế quốc tế sâu rộng',
    quest: 'Trang bị kỹ năng công dân số sẵn sàng hội nhập toàn cầu',
    rewards: { exp: 15500, rp: 410, gold: 5800, badge: 'Ngọn Đuốc Đổi Mới', title: 'Công Dân Toàn Cầu', item: 'Bản Thiết Kế Thành Phố Thông Minh' },
    questions: [
      { id: 'bq9_11_1', question: 'Đại hội đại biểu toàn quốc lần thứ VI của Đảng khởi xướng đường lối Đổi mới đất nước diễn ra vào năm nào?', options: ['Tháng 12 năm 1986', 'Năm 1975', 'Năm 1991', 'Năm 1980'], correctIndex: 0, explanation: 'Đại hội VI (12/1986) là mốc lịch sử trọng đại mở ra công cuộc Đổi mới đất nước.', damage: 35000, subject: 'Lịch sử 9' },
      { id: 'bq9_11_2', question: 'Việt Nam chính thức gia nhập Tổ chức Thương mại Thế giới (WTO) vào năm nào?', options: ['Năm 2007 (thành viên thứ 150)', 'Năm 1995', 'Năm 2000', 'Năm 2015'], correctIndex: 0, explanation: 'Ngày 11/1/2007, Việt Nam chính thức trở thành thành viên thứ 150 của tổ chức WTO.', damage: 35000, subject: 'Địa lí 9' },
      { id: 'bq9_11_3', question: 'Thể tích của hình cầu có bán kính R được tính theo công thức:', options: ['V = (4/3) . π . R^3', 'V = 4πR^2', 'V = πR^3', 'V = (1/3)πR^3'], correctIndex: 0, explanation: 'Thể tích hình cầu: V = (4/3)πR^3 và diện tích mặt cầu: S = 4πR^2.', damage: 34000, subject: 'Toán 9' }
    ]
  },
  {
    id: 'boss_9_12',
    order: 49,
    grade: 9,
    name: 'Trí Tuệ Nhân Tạo Siêu Cấp AI',
    title: 'Hộ Pháp Kỷ Nguyên Trí Tuệ Nhân Tạo & Bán Dẫn',
    arena: 'Siêu Máy Tính Lượng Tử Quốc Gia',
    level: 49,
    maxHp: 99000,
    armor: 64,
    lore: 'Trí tuệ nhân tạo (AI), mạng nơ-ron học sâu (Deep Learning) và chip bán dẫn định hình tương lai nhân loại.',
    appearance: { avatar: '🤖', themeColor: '#6366F1', bgGradient: 'from-indigo-950 via-slate-900 to-purple-950', badge: 'Kỷ Nguyên AI Bán Dẫn' },
    skills: [
      { name: 'Mạng Nơ-ron Xử Lý Ngôn Ngữ Tự Nhiên', description: 'Phân tích tâm lý đối thủ', damage: 3600, phase: 1 },
      { name: 'Thị Giác Máy Tính Computer Vision', description: 'Nhắm bắn không bao giờ trượt', damage: 5600, phase: 2 },
      { name: 'Trí Tuệ Nhân Tạo Tổng Thể AGI', description: 'Năng lượng siêu máy tính toàn năng', damage: 8200, phase: 3 }
    ],
    weakness: 'Đạo đức trí tuệ nhân tạo và vai trò trung tâm làm chủ của con người',
    quest: 'Làm chủ công nghệ AI phục vụ nhân loại và xã hội',
    rewards: { exp: 16000, rp: 450, gold: 6000, badge: 'Chip Bán Dẫn 2nm', title: 'Kỹ Sư Trí Tuệ Nhân Tạo', item: 'Bộ Não Lượng Tử AI' },
    questions: [
      { id: 'bq9_12_1', question: 'Mục tiêu cốt lõi của công nghệ Trí tuệ nhân tạo (AI) trong giáo dục là gì?', options: ['Cá nhân hóa lộ trình học tập, hỗ trợ giáo viên và nâng cao hiệu quả tiếp thu tri thức cho học sinh', 'Thay thế hoàn toàn con người trong xã hội', 'Chỉ dùng để chơi trò chơi', 'Xóa bỏ trường học truyền thống'], correctIndex: 0, explanation: 'AI là công cụ đắc lực hỗ trợ con người nâng cao năng suất và chất lượng giáo dục.', damage: 36000, subject: 'Tin học 9' },
      { id: 'bq9_12_2', question: 'Nguyên liệu nền tảng bán dẫn tinh khiết nhất dùng để sản xuất các vi mạch chip máy tính là:', options: ['Nguyên tố Silicon (Si)', 'Đồng (Cu)', 'Vàng (Au)', 'Sắt (Fe)'], correctIndex: 0, explanation: 'Silicon là nguyên liệu bán dẫn phổ biến và quan trọng nhất ngành công nghiệp chip thế giới.', damage: 36000, subject: 'KHTN 9' },
      { id: 'bq9_12_3', question: 'Phương trình x^2 - 5x + 6 = 0 có hai nghiệm phân biệt là:', options: ['x1 = 2; x2 = 3', 'x1 = -2; x2 = -3', 'x1 = 1; x2 = 6', 'x1 = -1; x2 = -6'], correctIndex: 0, explanation: '(x - 2)(x - 3) = 0 -> x = 2 hoặc x = 3.', damage: 35000, subject: 'Toán 9' }
    ]
  },
  {
    id: 'boss_9_13',
    order: 50,
    grade: 9,
    name: 'Đại Thần Chủ Bách Việt Tối Cao',
    title: 'Chí Tôn Chinh Phục Tri Thức Số (ĐẠI TRÙM CUỐI 150.000 HP)',
    arena: 'Đỉnh Thái Cực Tri Thức Số Vĩnh Hằng',
    level: 50,
    maxHp: 150000, // ĐÚNG CHÍNH XÁC GIỚI HẠN TỐI ĐA 150.000 HP THEO YÊU CẦU
    armor: 68,
    lore: 'Vị Thần Chủ chí tôn tối thượng hội tụ toàn bộ linh khí ngàn năm Lạc Hồng, trống đồng Đông Sơn và đỉnh cao tri thức số của học sinh. Đánh bại Đại Trùm Cuối để ghi danh muôn đời trên Bảng Vàng Danh Dự nhà trường!',
    appearance: { avatar: '👑', themeColor: '#F43F5E', bgGradient: 'from-rose-950 via-slate-900 to-amber-950', badge: 'ĐẠI THẦN CHỦ 150.000 HP' },
    skills: [
      { name: 'Vạn Niên Hào Khí Đông Sơn', description: 'Hào quang rực lửa triệu hồi linh khí tiền nhân', damage: 4500, phase: 1 },
      { name: 'Bách Việt Chí Tôn - Cuồng Nộ', description: 'Giai đoạn cuồng nộ sấm sét rung chuyển càn khôn', damage: 7500, phase: 2 },
      { name: 'Khải Hoàn Tri Thức Số Tuyệt Diệt', description: 'Đòn quyết định tối thượng 150.000 HP', damage: 12000, phase: 3 }
    ],
    weakness: 'Sự đoàn kết hiệp lực của tổ đội học sinh (tối thiểu 3 người) và vốn tri thức toàn diện',
    quest: 'Chinh phục Đỉnh Cao Cuối Cùng 150.000 HP để hoàn thành toàn bộ 50 thử thách nâng cao!',
    rewards: { exp: 35000, rp: 1500, gold: 15000, badge: 'Vương Miện Trí Tuệ Vĩnh Cửu 150K HP', title: 'Đại Anh Hùng Tri Thức Số', item: 'Thánh Trượng Thái Cực Tri Thức' },
    questions: [
      { id: 'bq9_13_1', question: 'Mục tiêu thiêng liêng cao cả nhất của thế hệ học sinh nhà trường hôm nay khi nỗ lực học tập và "Chinh phục tri thức số" là gì?', options: ['Rèn đức luyện tài, làm chủ công nghệ, xây dựng đất nước Việt Nam hùng cường và sánh vai cùng các cường quốc năm châu', 'Chỉ để qua các kỳ thi', 'Chỉ để giải trí', 'Không có mục tiêu'], correctIndex: 0, explanation: 'Thực hiện lời dạy của Bác: "Non sông Việt Nam có trở nên tươi đẹp hay không, dân tộc Việt Nam có bước tới đài vinh quang để sánh vai cùng các cường quốc năm châu được hay không, chính là nhờ một phần lớn ở công học tập của các em".', damage: 50000, subject: 'Đạo đức - GDCD' },
      { id: 'bq9_13_2', question: 'Đại hội thi Olympic Trí tuệ quốc tế đòi hỏi người học sinh thời đại số cần hội tụ đầy đủ những phẩm chất cốt lõi nào?', options: ['Nền tảng kiến thức vững vàng, tư duy phản biện, kỹ năng làm việc nhóm và đạo đức trong sáng', 'Chỉ cần học vẹt lý thuyết', 'Chỉ cần làm một mình', 'Không cần rèn luyện phẩm chất'], correctIndex: 0, explanation: 'Phẩm chất toàn diện cả về tài và đức là kim chỉ nam cho sự phát triển bền vững.', damage: 50000, subject: 'Kỹ năng sống' },
      { id: 'bq9_13_3', question: 'Khẩu hiệu truyền cảm hứng của Hệ sinh thái học tập số là gì?', options: ['Kiến thức hôm nay, tương lai ngày mai.', 'Học để lấy điểm', 'Vui chơi là chính', 'Không cần cố gắng'], correctIndex: 0, explanation: 'Khẩu hiệu chính thức: "Kiến thức hôm nay, tương lai ngày mai."', damage: 50000, subject: '' }
    ]
  }
];

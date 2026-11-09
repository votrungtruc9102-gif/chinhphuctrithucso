export interface ArenaQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  damage: number; // Sát thương gây ra cho Boss khi trả lời đúng
}

export type ArenaDifficulty = 'Dễ' | 'Trung bình' | 'Khó' | 'Rất khó' | 'Huyền thoại';

export interface ArenaTheme {
  primary: string;
  secondary: string;
  border: string;
  glow: string;
  text: string;
  bgGradient: string;
  iconBg: string;
}

export interface ArenaStage {
  id: number;
  order: number;
  arenaName: string;
  bossName: string;
  title: string;
  regionId: 1 | 2 | 3 | 4 | 5;
  regionName: string;
  maxHp: number;
  level: number;
  difficulty: ArenaDifficulty;
  origin: string;
  biography: string;
  context: string;
  personality: string;
  skills: string[];
  avatarStyle: {
    symbol: string;
    badge: string;
    accentColor: string;
  };
  theme: ArenaTheme;
  rewardExp: number;
  rewardBadge: string;
  rewardTitle: string;
  questions: ArenaQuestion[];
}

export interface WorldRegion {
  id: 1 | 2 | 3 | 4 | 5;
  name: string;
  code: string;
  subtitle: string;
  description: string;
  bgGradient: string;
  cardBorder: string;
  accentColor: string;
  stageRange: [number, number];
  icon: string;
}

export const WORLD_REGIONS: WorldRegion[] = [
  {
    id: 1,
    name: 'Cội Nguồn Huyền Thoại',
    code: 'REGION_1',
    subtitle: 'Kỷ nguyên dựng nước Văn Lang – Âu Lạc',
    description: 'Nơi khởi thủy của những huyền thoại thiêng liêng về nòi giống Rồng Tiên, dũng tướng chống giặc và đức vua dựng nước.',
    bgGradient: 'from-amber-950/80 via-slate-900 to-amber-900/60',
    cardBorder: 'border-amber-500/40',
    accentColor: '#F59E0B',
    stageRange: [1, 10],
    icon: '👑'
  },
  {
    id: 2,
    name: 'Thế Giới Truyền Thuyết',
    code: 'REGION_2',
    subtitle: 'Kỳ ảo truyện dân gian & cổ tích Việt Nam',
    description: 'Thế giới của những phép màu công lý, các bậc thánh nhân bất tử và những bảo vật huyền tích nuôi dưỡng tâm hồn Việt.',
    bgGradient: 'from-emerald-950/80 via-slate-900 to-teal-900/60',
    cardBorder: 'border-emerald-500/40',
    accentColor: '#10B981',
    stageRange: [11, 20],
    icon: '🌿'
  },
  {
    id: 3,
    name: 'Cõi Kỳ Ảo Văn Học',
    code: 'REGION_3',
    subtitle: 'Truyền kỳ mạn lục & Văn học Trung đại',
    description: 'Chốn giao thoa giữa cõi trần và thủy phủ, nơi các bậc trí thức trọng đạo lý giáng ma trừ quỷ và bảo vệ lẽ phải.',
    bgGradient: 'from-indigo-950/80 via-slate-900 to-purple-900/60',
    cardBorder: 'border-indigo-500/40',
    accentColor: '#6366F1',
    stageRange: [21, 30],
    icon: '📜'
  },
  {
    id: 4,
    name: 'Linh Giới Việt Nam',
    code: 'REGION_4',
    subtitle: 'Linh thú & Tinh linh hộ quốc đất trời',
    description: 'Thế giới các linh thú biểu trưng non nước phương Nam, bảo hộ bốn mùa mưa thuận gió hòa, sông núi thanh bình.',
    bgGradient: 'from-cyan-950/80 via-slate-900 to-blue-900/60',
    cardBorder: 'border-cyan-500/40',
    accentColor: '#06B6D4',
    stageRange: [31, 40],
    icon: '🐉'
  },
  {
    id: 5,
    name: 'Thiên Giới Huyền Bí',
    code: 'REGION_5',
    subtitle: 'Đỉnh cao Thần thoại & Hộ quốc chí tôn',
    description: 'Vùng trời tối cao ngập tràn hào quang Đông Sơn, nơi các bậc đại thần và linh đế ngự trị thử thách trí tuệ tối thượng.',
    bgGradient: 'from-rose-950/80 via-slate-900 to-amber-900/80',
    cardBorder: 'border-rose-500/50',
    accentColor: '#F43F5E',
    stageRange: [41, 50],
    icon: '⚡'
  }
];

export const ARENA_STAGES: ArenaStage[] = [
  // ==========================================
  // VÙNG 1: CỘI NGUỒN HUYỀN THOẠI (1 - 10)
  // ==========================================
  {
    id: 1,
    order: 1,
    arenaName: 'Đấu trường 1: Đỉnh Ngàn Ba Vì',
    bossName: 'Sơn Tinh',
    title: 'Chúa Non Cao Tản Viên',
    regionId: 1,
    regionName: 'Cội Nguồn Huyền Thoại',
    maxHp: 15000,
    level: 1,
    difficulty: 'Dễ',
    origin: 'Truyền thuyết Sơn Tinh - Thủy Tinh (Văn học dân gian Việt Nam)',
    biography: 'Vị thần cai quản ngàn non cao hùng vĩ, vung tay dời từng dãy núi, đắp từng dải đồi ngăn dòng nước lũ, tượng trưng cho sức mạnh chinh phục thiên tai của nhân dân.',
    context: 'Đỉnh núi Ba Vì mây phủ sừng sững, tiếng chim reo đại ngàn ngút ngàn nắng vàng.',
    personality: 'Vững chãi, bao dung, cương trực và kiên cường.',
    skills: ['Sơn Băng Chấn Địa', 'Thiên Đỉnh Hộ Thể', 'Cung Tiễn Phong Thần'],
    avatarStyle: { symbol: '⛰️', badge: 'Chúa Non Cao', accentColor: '#10B981' },
    theme: {
      primary: '#059669',
      secondary: '#047857',
      border: 'border-emerald-500',
      glow: 'shadow-emerald-500/30',
      text: 'text-emerald-400',
      bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
      iconBg: 'bg-emerald-600'
    },
    rewardExp: 100,
    rewardBadge: 'Phù Hiệu Sơn Thần',
    rewardTitle: 'Dũng Sĩ Non Cao',
    questions: [
      {
        id: 'q1_1',
        question: 'Trong truyền thuyết "Sơn Tinh - Thủy Tinh", sính lễ thách cưới của Vua Hùng gồm những gì quý hiếm?',
        options: ['Voi chín ngà, gà chín cựa, ngựa chín hồng mao', 'Ngọc trai biển đông, ngọc bích non cao, vàng mười lá', 'Lúa ngô chín bông, trâu chín sừng, chim chín cánh', 'Rồng vàng nhả ngọc, kỳ lân chín sắc, chim phượng'],
        correctIndex: 0,
        explanation: 'Vua Hùng thách cưới: "Voi chín ngà, gà chín cựa, ngựa chín hồng mao, mỗi thứ một đôi".',
        damage: 5000
      },
      {
        id: 'q1_2',
        question: 'Hình tượng nhân vật Sơn Tinh trong văn học dân gian phản ánh ước mơ gì của người Việt cổ?',
        options: ['Ước mơ chinh phục và chế ngự thiên tai bão lũ', 'Ước mơ làm giàu nhanh chóng qua giao thương', 'Ước mơ phiêu lưu vượt đại dương', 'Ước mơ trở thành chúa tể muôn loài'],
        correctIndex: 0,
        explanation: 'Sơn Tinh tượng trưng cho sức mạnh quật cường và khát vọng chiến thắng thiên tai lũ lụt của cư dân nông nghiệp lúa nước.',
        damage: 5000
      },
      {
        id: 'q1_3',
        question: 'Ngọn núi nào gắn liền với danh xưng và nơi ngự trị của Sơn Tinh?',
        options: ['Dãy núi Ba Vì (núi Tản Viên)', 'Núi Yên Tử', 'Núi Ngũ Hành Sơn', 'Núi Bà Đen'],
        correctIndex: 0,
        explanation: 'Sơn Tinh còn được gọi là Tản Viên Sơn Thánh, ngự trên đỉnh núi Tản Viên (Ba Vì).',
        damage: 5000
      }
    ]
  },
  {
    id: 2,
    order: 2,
    arenaName: 'Đấu trường 2: Vực Sâu Thủy Quái',
    bossName: 'Thủy Tinh',
    title: 'Chúa Tể Sóng Dữ & Bão Tố',
    regionId: 1,
    regionName: 'Cội Nguồn Huyền Thoại',
    maxHp: 20000,
    level: 2,
    difficulty: 'Dễ',
    origin: 'Truyền thuyết Sơn Tinh - Thủy Tinh (Văn học dân gian Việt Nam)',
    biography: 'Chúa tể biển khơi mênh mông, vẫy tay nổi gió, gọi mưa rung chuyển đất trời, dâng ngập tràn sông rạch cuồn cuộn sóng thần.',
    context: 'Vực sâu sóng bạc ngập tràn sấm chớp gầm vang, bão tố phong ba cuộn dâng.',
    personality: 'Mãnh liệt, cuồng nộ nhưng bất khuất trước số phận.',
    skills: ['Hô Phong Hoán Vũ', 'Thủy Quái Cuồng Phong', 'Ba Đào Nộ Đao'],
    avatarStyle: { symbol: '🌊', badge: 'Chúa Sóng Dữ', accentColor: '#0284C7' },
    theme: {
      primary: '#0284C7',
      secondary: '#0369A1',
      border: 'border-sky-500',
      glow: 'shadow-sky-500/30',
      text: 'text-sky-400',
      bgGradient: 'from-blue-950 via-slate-900 to-cyan-950',
      iconBg: 'bg-sky-600'
    },
    rewardExp: 150,
    rewardBadge: 'Phù Hiệu Triều Dâng',
    rewardTitle: 'Chế Ngự Bão Tố',
    questions: [
      {
        id: 'q2_1',
        question: 'Trong cuộc giao tranh với Sơn Tinh, Thủy Tinh đã sử dụng phép thuật gì?',
        options: ['Hô mưa gọi gió, dâng nước sông cuồn cuộn đánh lên núi', 'Tạo ra lửa thiêu rụi rừng cây non cao', 'Độn thổ tạo động đất sụp đổ vách đá', 'Dùng bùa chú làm mê muội quân lính'],
        correctIndex: 0,
        explanation: 'Thủy Tinh hô mưa gọi gió làm giông bão, dâng nước sông lên cuồn cuộn đánh Sơn Tinh.',
        damage: 7000
      },
      {
        id: 'q2_2',
        question: 'Chi tiết "Hàng năm Thủy Tinh dâng nước đánh Sơn Tinh" giải thích cho hiện tượng tự nhiên nào?',
        options: ['Hiện tượng lũ lụt hàng năm ở đồng bằng Bắc Bộ', 'Hiện tượng triều cường ven biển miền Trung', 'Hiện tượng hạn hán kéo dài ở cao nguyên', 'Hiện tượng nhật thực toàn phần'],
        correctIndex: 0,
        explanation: 'Chi tiết thần thoại này lý giải hiện tượng mưa lũ định kỳ hàng năm vào tháng bảy, tháng tám âm lịch.',
        damage: 7000
      },
      {
        id: 'q2_3',
        question: 'Ai là người đến trước dâng đủ sính lễ và rước Mỵ Nương về núi?',
        options: ['Sơn Tinh', 'Thủy Tinh', 'Trọng Thủy', 'Lạc Long Quân'],
        correctIndex: 0,
        explanation: 'Sơn Tinh mang sính lễ đến trước từ tinh mơ sáng, được đón Mỵ Nương về núi non cao.',
        damage: 6000
      }
    ]
  },
  {
    id: 3,
    order: 3,
    arenaName: 'Đấu trường 3: Lửa Thiêng Phù Đổng',
    bossName: 'Thánh Gióng',
    title: 'Phù Đổng Thiên Vương',
    regionId: 1,
    regionName: 'Cội Nguồn Huyền Thoại',
    maxHp: 28000,
    level: 3,
    difficulty: 'Trung bình',
    origin: 'Truyền thuyết Thánh Gióng (Văn học dân gian Việt Nam)',
    biography: 'Cậu bé làng Gióng lên ba chưa biết nói cười, khi nghe tiếng sứ giả tìm người tài cứu nước liền vươn vai thành tráng sĩ oai phong lẫm liệt, cưỡi ngựa sắt cầm roi sắt quét sạch giặc Ân.',
    context: 'Cánh đồng làng Phù Đổng bừng cháy hào khí, vó ngựa sắt tung trời lửa rực sáng non sông.',
    personality: 'Yêu nước nồng nàn, hào kiệt vô tư, xả thân vì nghĩa lớn.',
    skills: ['Thiên Thiết Thiết Tiên', 'Hỏa Mã Xuất Kích', 'Phi Thăng Sóc Sơn'],
    avatarStyle: { symbol: '⚔️', badge: 'Thiên Vương Phù Đổng', accentColor: '#EF4444' },
    theme: {
      primary: '#DC2626',
      secondary: '#B91C1C',
      border: 'border-red-500',
      glow: 'shadow-red-500/30',
      text: 'text-red-400',
      bgGradient: 'from-red-950 via-slate-900 to-amber-950',
      iconBg: 'bg-red-600'
    },
    rewardExp: 220,
    rewardBadge: 'Huân Chương Thiết Mã',
    rewardTitle: 'Hào Khí Phù Đổng',
    questions: [
      {
        id: 'q3_1',
        question: 'Khi roi sắt bị gãy trong lúc đuổi giặc đến chân núi Sóc Sơn, Gióng đã dùng thứ gì làm vũ khí?',
        options: ['Nhổ từng bụi tre đằng ngà quật túi bụi vào giặc', 'Dùng khiên đá ném vào tướng giặc', 'Dùng kiếm gỗ của binh lính', 'Dùng tay không bắt trọn tướng giặc'],
        correctIndex: 0,
        explanation: 'Khi roi sắt gãy, Gióng đã nhanh trí nhổ từng bụi tre bên đường quật túi bụi đuổi giặc Ân.',
        damage: 10000
      },
      {
        id: 'q3_2',
        question: 'Hình tượng Thánh Gióng vươn vai lớn nhanh như thổi thể hiện ý nghĩa gì?',
        options: ['Sức mạnh quật khởi phi thường của dân tộc khi đất nước lâm nguy', 'Sự phát triển thể chất của tuổi vị thành niên', 'Phép thuật kỳ bí của các đạo sĩ phương Bắc', 'Tài năng nông nghiệp dồi dào lúa gạo'],
        correctIndex: 0,
        explanation: 'Tiếng gọi non sông đánh giặc đã đánh thức sức mạnh tiềm tàng vĩ đại của toàn dân tộc.',
        damage: 9000
      },
      {
        id: 'q3_3',
        question: 'Sau khi dẹp xong giặc Ân, Thánh Gióng đã làm gì?',
        options: ['Cùng ngựa sắt bay thẳng lên trời tại đỉnh núi Sóc Sơn', 'Về triều đình nhận phong vương làm quan lớn', 'Trở về quê hương sống cùng mẹ già', 'Đi vi hành khắp đất nước'],
        correctIndex: 0,
        explanation: 'Gióng cởi bỏ áo giáp sắt, một người một ngựa bay thẳng lên trời, biểu tượng cho người anh hùng vị quốc vô tư.',
        damage: 9000
      }
    ]
  },
  {
    id: 4,
    order: 4,
    arenaName: 'Đấu trường 4: Điện Kính Thiên Nghĩa Lĩnh',
    bossName: 'Vua Hùng',
    title: 'Vua Dựng Nước Văn Lang',
    regionId: 1,
    regionName: 'Cội Nguồn Huyền Thoại',
    maxHp: 35000,
    level: 4,
    difficulty: 'Trung bình',
    origin: 'Truyền thuyết thời đại Hùng Vương dựng nước',
    biography: 'Mười tám đời vua Hùng nối tiếp khai cơ lập nghiệp, dạy dân cấy lúa dệt vải, đắp đê ngăn sóng, đặt quốc hiệu Văn Lang, mở đầu trang sử hào hùng của dân tộc Việt.',
    context: 'Đỉnh núi Nghĩa Lĩnh linh thiêng, tiếng trống đồng Đông Sơn rền vang bốn cõi trời Nam.',
    personality: 'Minh triết, nhân hậu, yêu thương bách tính và gìn giữ cội nguồn.',
    skills: ['Đông Sơn Lôi Cổ', 'Bách Việt Hồng Uy', 'Văn Lang Trị Thế'],
    avatarStyle: { symbol: '👑', badge: 'Thủy Tổ Dựng Nước', accentColor: '#F59E0B' },
    theme: {
      primary: '#D97706',
      secondary: '#B45309',
      border: 'border-amber-500',
      glow: 'shadow-amber-500/30',
      text: 'text-amber-400',
      bgGradient: 'from-amber-950 via-slate-900 to-yellow-950',
      iconBg: 'bg-amber-600'
    },
    rewardExp: 300,
    rewardBadge: 'Trống Đồng Đông Sơn',
    rewardTitle: 'Người Con Đất Tổ',
    questions: [
      {
        id: 'q4_1',
        question: 'Tên quốc hiệu đầu tiên của nước ta dưới thời các Vua Hùng là gì?',
        options: ['Văn Lang', 'Âu Lạc', 'Đại Cồ Việt', 'Vạn Xuân'],
        correctIndex: 0,
        explanation: 'Nhà nước Văn Lang do Hùng Vương sáng lập là nhà nước đầu tiên trong lịch sử Việt Nam.',
        damage: 12000
      },
      {
        id: 'q4_2',
        question: 'Câu nói bất hủ "Các Vua Hùng đã có công dựng nước, Bác cháu ta phải cùng nhau giữ lấy nước" của Bác Hồ được nói ở đâu?',
        options: ['Tại Đền Hùng (Phú Thọ) năm 1954', 'Tại Quảng trường Ba Đình năm 1945', 'Tại chiến khu Việt Bắc năm 1950', 'Tại Cố đô Huế năm 1946'],
        correctIndex: 0,
        explanation: 'Bác Hồ căn dặn cán bộ Đại đoàn Quân Tiên Phong tại Đền Giếng thuộc Khu di tích Đền Hùng (Phú Thọ) ngày 19/9/1954.',
        damage: 12000
      },
      {
        id: 'q4_3',
        question: 'Trang phục và văn hóa đặc trưng thời các Vua Hùng được ghi dấu rõ nét nhất trên hiện vật khảo cổ nào?',
        options: ['Trống đồng Đông Sơn và Thạp đồng Đào Thịnh', 'Cột kinh đá Hoa Lư', 'Bia đá chùa Dâu', 'Chuông đồng Cổ Loa'],
        correctIndex: 0,
        explanation: 'Trống đồng Đông Sơn với hoa văn chim hạc, nhà sàn, người giã gạo phản ánh rực rỡ nền văn minh lúa nước Văn Lang.',
        damage: 11000
      }
    ]
  },
  {
    id: 5,
    order: 5,
    arenaName: 'Đấu trường 5: Lầu Gác Nỏ Thần',
    bossName: 'Mỵ Châu',
    title: 'Công Chúa Áo Lông Ngỗng',
    regionId: 1,
    regionName: 'Cội Nguồn Huyền Thoại',
    maxHp: 42000,
    level: 5,
    difficulty: 'Trung bình',
    origin: 'Truyền thuyết An Dương Vương và Mỵ Châu - Trọng Thủy',
    biography: 'Nàng công chúa ngây thơ một lòng vì tình yêu, vô tình để lộ bí mật nỏ thần Kim Quy, để lại bi kịch sâu sắc và bài học muôn đời về cảnh giác giữ gìn độc lập non sông.',
    context: 'Thành Cổ Loa chín vòng xoáy trôn ốc, rải rác từng sợi lông ngỗng trắng theo dấu gió bay.',
    personality: 'Trong sáng, thuần khiết nhưng thiếu cảnh giác trước mưu đồ chính trị.',
    skills: ['Vũ Lông Dẫn Lối', 'Châu Ngọc Hải Tâm', 'Huyết Lệ Hóa Châu'],
    avatarStyle: { symbol: '🪶', badge: 'Ngọc Trai Giếng Ngọc', accentColor: '#EC4899' },
    theme: {
      primary: '#DB2777',
      secondary: '#BE185D',
      border: 'border-pink-500',
      glow: 'shadow-pink-500/30',
      text: 'text-pink-400',
      bgGradient: 'from-pink-950 via-slate-900 to-rose-950',
      iconBg: 'bg-pink-600'
    },
    rewardExp: 380,
    rewardBadge: 'Minh Châu Bạch Vũ',
    rewardTitle: 'Thấu Tỏ Lòng Người',
    questions: [
      {
        id: 'q5_1',
        question: 'Mỵ Châu đã dùng vật gì rải dọc đường để làm dấu cho Trọng Thủy tìm theo?',
        options: ['Lông ngỗng rứt ra từ chiếc áo lông ngỗng mặc trên mình', 'Khăn lụa đỏ thêu hoa sen', 'Những hạt ngọc trai sáng lấp lánh', 'Hạt đậu rải trên lối mòn'],
        correctIndex: 0,
        explanation: 'Mỵ Châu ngồi sau lưng cha, rứt lông ngỗng từ chiếc áo lông ngỗng rải khắp nẻo đường.',
        damage: 14000
      },
      {
        id: 'q5_2',
        question: 'Hình ảnh ngọc trai rửa trong nước giếng Loa Thành sáng thêm trong truyền thuyết mang ý nghĩa gì?',
        options: ['Minh oan cho tấm lòng trong trắng, không cố ý phản bội của Mỵ Châu', 'Khẳng định giá trị thương mại của ngọc trai Cổ Loa', 'Ca ngợi sự tài hoa của người thợ chế tác ngọc', 'Chứng minh tài tiên tri của Rùa Vàng'],
        correctIndex: 0,
        explanation: 'Nhân dân đã dùng hình ảnh nghệ thuật "ngọc trai - giếng nước" để bao dung, minh oan cho trái tim trong sáng của nàng.',
        damage: 14000
      },
      {
        id: 'q5_3',
        question: 'Bài học đắt giá nhất rút ra từ bi kịch của nàng Mỵ Châu là gì?',
        options: ['Bài học về tinh thần cảnh giác, không được đặt tình riêng lên trên vận mệnh quốc gia', 'Bài học về cách chọn lựa người bạn đời', 'Bài học về việc bảo vệ bí mật công nghệ đúc đồng', 'Bài học về tốc độ hành quân khi rút lui'],
        correctIndex: 0,
        explanation: 'Truyền thuyết răn dạy bài học muôn đời: Không bao giờ được mất cảnh giác trước kẻ thù, không để tình riêng lấn át đại nghĩa dân tộc.',
        damage: 14000
      }
    ]
  },
  {
    id: 6,
    order: 6,
    arenaName: 'Đấu trường 6: Thành Cổ Chiến Lũy',
    bossName: 'Trọng Thủy',
    title: 'Tướng Soái Triệu Đà',
    regionId: 1,
    regionName: 'Cội Nguồn Huyền Thoại',
    maxHp: 48000,
    level: 6,
    difficulty: 'Khó',
    origin: 'Truyền thuyết An Dương Vương và Mỵ Châu - Trọng Thủy',
    biography: 'Con trai Triệu Đà mang dã tâm thôn tính phương Nam, dùng hôn nhân để đánh cắp nỏ thần, nhưng cuối cùng tự vẫn bên giếng ngọc trong nỗi ân hận tột cùng.',
    context: 'Chiến trường Cổ Loa vương mùi thuốc súng, ánh trăng mờ soi bóng giếng ngọc u tịch.',
    personality: 'Mưu mô, tuân lệnh cha nhưng giằng xé ân hận về tình yêu.',
    skills: ['Ám Đao Hoán Tráo', 'Cung Tiễn Mê Hồn', 'Tạ Tội Trầm Uyên'],
    avatarStyle: { symbol: '🏹', badge: 'Tráo Nỏ Đoạt Thành', accentColor: '#8B5CF6' },
    theme: {
      primary: '#7C3AED',
      secondary: '#6D28D9',
      border: 'border-purple-500',
      glow: 'shadow-purple-500/30',
      text: 'text-purple-400',
      bgGradient: 'from-purple-950 via-slate-900 to-indigo-950',
      iconBg: 'bg-purple-600'
    },
    rewardExp: 450,
    rewardBadge: 'Kính Soi Tâm Giác',
    rewardTitle: 'Kiên Định Lập Trường',
    questions: [
      {
        id: 'q6_1',
        question: 'Hành động nào của Trọng Thủy đã trực tiếp dẫn đến sự sụp đổ của nhà nước Âu Lạc?',
        options: ['Lén xem nỏ thần rồi chế lẫy nỏ giả đem đánh tráo', 'Đầu độc nguồn nước quanh thành Cổ Loa', 'Kêu gọi quan lại Âu Lạc làm phản', 'Dẫn đường cho giặc vượt biển ban đêm'],
        correctIndex: 0,
        explanation: 'Trọng Thủy dụ Mỵ Châu cho xem nỏ thần rồi lén làm giả lẫy nỏ bằng đồng, đánh tráo móng rùa vàng.',
        damage: 16000
      },
      {
        id: 'q6_2',
        question: 'Kết cục cuối cùng của nhân vật Trọng Thủy trong truyền thuyết là gì?',
        options: ['Ôm xác Mỵ Châu khóc lóc rồi đâm đầu xuống giếng tự vẫn', 'Lên ngôi vua thay thế Triệu Đà', 'Bị Rùa Vàng dùng sấm sét trừng phạt', 'Bỏ trốn về phương Bắc sống ẩn dật'],
        correctIndex: 0,
        explanation: 'Trọng Thủy mang xác Mỵ Châu về chôn ở Loa Thành, ngày đêm thương nhớ rồi nhảy xuống giếng tự vẫn.',
        damage: 16000
      },
      {
        id: 'q6_3',
        question: 'Hai câu thơ "Nỏ thần vô ý trao tay giặc / Nên nỗi cơ đồ đắm biển sâu" là của nhà thơ nào?',
        options: ['Tố Hữu', 'Xuân Diệu', 'Huy Cận', 'Chế Lan Viên'],
        correctIndex: 0,
        explanation: 'Trích trong bài thơ nổi tiếng "Tâm sự" của nhà thơ Tố Hữu.',
        damage: 16000
      }
    ]
  },
  {
    id: 7,
    order: 7,
    arenaName: 'Đấu trường 7: Cửu Trùng Cổ Loa',
    bossName: 'An Dương Vương',
    title: 'Vua Thục Xây Loa Thành',
    regionId: 1,
    regionName: 'Cội Nguồn Huyền Thoại',
    maxHp: 55000,
    level: 7,
    difficulty: 'Khó',
    origin: 'Truyền thuyết thời kỳ Âu Lạc và An Dương Vương',
    biography: 'Vị vua anh minh lập nên nước Âu Lạc, đắp thành Cổ Loa chín vòng kiên cố, nhờ sự giúp sức của Thần Kim Quy chế nỏ thần bắn một phát giết hàng vạn quân giặc.',
    context: 'Tường thành Cổ Loa cao vút quanh co, cờ ngũ sắc bay phần phật trong gió sông Hồng.',
    personality: 'Uy nghiêm, quyết đoán, nghiêm minh nhưng chủ quan ỷ lại vào vũ khí.',
    skills: ['Kim Quy Linh Tiễn', 'Cửu Trùng Thành Lũy', 'Trảm Quyết Uy Phong'],
    avatarStyle: { symbol: '🛡️', badge: 'Vua Thục Âu Lạc', accentColor: '#EAB308' },
    theme: {
      primary: '#CA8A04',
      secondary: '#A16207',
      border: 'border-yellow-500',
      glow: 'shadow-yellow-500/30',
      text: 'text-yellow-400',
      bgGradient: 'from-amber-950 via-slate-900 to-stone-900',
      iconBg: 'bg-yellow-600'
    },
    rewardExp: 520,
    rewardBadge: 'Kim Quy Thần Lẫy',
    rewardTitle: 'Hộ Thành Vệ Quốc',
    questions: [
      {
        id: 'q7_1',
        question: 'Ai đã giúp An Dương Vương xây dựng thành công thành Cổ Loa sau nhiều lần bị đổ?',
        options: ['Thần Kim Quy (Rùa Vàng)', 'Thần Sơn Tinh', 'Phật Thích Ca', 'Đạo sĩ phương Nam'],
        correctIndex: 0,
        explanation: 'Thần Kim Quy hiện lên trừ yêu ma quấy phá và hướng dẫn xây thành Cổ Loa chín vòng xoáy ốc.',
        damage: 18500
      },
      {
        id: 'q7_2',
        question: 'Trước khi từ biệt An Dương Vương, Rùa Vàng đã trao lại vật gì để làm lẫy nỏ thần?',
        options: ['Một chiếc móng vuốt rùa vàng thần kỳ', 'Một giọt máu rùa hóa thành bảo ngọc', 'Một mảnh mai rùa khắc chữ vàng', 'Một chiếc lông vũ ngũ sắc'],
        correctIndex: 0,
        explanation: 'Rùa Vàng tháo chiếc móng của mình trao cho nhà vua để làm lẫy nỏ bảo vệ bờ cõi.',
        damage: 18500
      },
      {
        id: 'q7_3',
        question: 'Ai là người đã trực tiếp chế tạo ra chiếc "Nỏ thần Kim Quang Linh Trảo" theo lệnh An Dương Vương?',
        options: ['Tướng quân Cao Lỗ', 'Tướng quân Lại Thúc', 'Lạc tướng Vũ Ninh', 'Mỵ Châu'],
        correctIndex: 0,
        explanation: 'Tướng quân Cao Lỗ tài ba đã ngày đêm đúc đồng rèn sắt chế tác thành công nỏ thần linh nghiệm.',
        damage: 18000
      }
    ]
  },
  {
    id: 8,
    order: 8,
    arenaName: 'Đấu trường 8: Bãi Cát Dạ Trạch',
    bossName: 'Chử Đồng Tử',
    title: 'Đệ Nhất Chí Hiếu Tứ Bất Tử',
    regionId: 1,
    regionName: 'Cội Nguồn Huyền Thoại',
    maxHp: 62000,
    level: 8,
    difficulty: 'Khó',
    origin: 'Truyền thuyết Chử Đồng Tử - Tiên Dung (Văn hóa tâm linh Việt Nam)',
    biography: 'Chàng trai nghèo bên bãi cát sông Hồng giàu lòng hiếu thảo, cùng công chúa Tiên Dung kết duyên kỳ ngộ, học đạo cứu nhân độ thế và bay về trời cùng lâu đài thành quách.',
    context: 'Đầm Dạ Trạch mây phủ sương giăng, lau sậy rì rào bên bãi cát vàng lấp lánh.',
    personality: 'Hiếu nghĩa chí thành, thuần hậu, bao dung và từ bi.',
    skills: ['Nón Gậy Hóa Lâu Đài', 'Dạ Trạch Thần Sương', 'Kim Thân Bất Diệt'],
    avatarStyle: { symbol: '🌾', badge: 'Tứ Bất Tử Chí Hiếu', accentColor: '#14B8A6' },
    theme: {
      primary: '#0D9488',
      secondary: '#0F766E',
      border: 'border-teal-500',
      glow: 'shadow-teal-500/30',
      text: 'text-teal-400',
      bgGradient: 'from-teal-950 via-slate-900 to-slate-900',
      iconBg: 'bg-teal-600'
    },
    rewardExp: 600,
    rewardBadge: 'Chiếc Gậy Thần Kỳ',
    rewardTitle: 'Đức Hiếu Thuần Thiện',
    questions: [
      {
        id: 'q8_1',
        question: 'Hai bảo vật thần kỳ mà Chử Đồng Tử được nhà sư Phật Quang trao cho để cứu độ nhân dân là gì?',
        options: ['Cây gậy trúc và chiếc nón lá', 'Thanh kiếm thần và tấm gương soi', 'Hạt ngọc trai và đóa sen vàng', 'Chiếc áo tơi và bầu nước cam lộ'],
        correctIndex: 0,
        explanation: 'Nhà sư Phật Quang trao cho chàng chiếc gậy và nón lá, cắm gậy úp nón xuống hóa thành thành quách lâu đài.',
        damage: 21000
      },
      {
        id: 'q8_2',
        question: 'Chử Đồng Tử là một trong bốn vị thần bất tử trong tín ngưỡng dân gian Việt Nam. Bốn vị đó được gọi là gì?',
        options: ['Tứ Bất Tử (Tản Viên, Phù Đổng, Chử Đồng Tử, Liễu Hạnh)', 'Tứ Đại Thiên Vương', 'Tứ Trụ Triều Đình', 'Tứ Linh Văn Hóa'],
        correctIndex: 0,
        explanation: 'Hệ thống Tứ Bất Tử gồm: Tản Viên Sơn Thánh, Phù Đổng Thiên Vương, Chử Đồng Tử và Thánh Mẫu Liễu Hạnh.',
        damage: 21000
      },
      {
        id: 'q8_3',
        question: 'Cuộc gặp gỡ kỳ lạ giữa Chử Đồng Tử và Tiên Dung diễn ra tại đâu?',
        options: ['Trên bãi cát ven bờ sông Hồng khi Tiên Dung quây màn tắm', 'Tại lễ hội đền Hùng ngày xuân', 'Trên một chuyến đò ngang sang sông Đuống', 'Tại kinh đô Phong Châu'],
        correctIndex: 0,
        explanation: 'Tiên Dung du ngoạn trên sông Hồng, cho quây màn tắm trên bãi cát, nước dội trôi cát làm lộ ra chàng trai Chử Đồng Tử.',
        damage: 20000
      }
    ]
  },
  {
    id: 9,
    order: 9,
    arenaName: 'Đấu trường 9: Vườn Hoa Tiên Giới',
    bossName: 'Tiên Dung',
    title: 'Công Chúa Khát Vọng Tự Do',
    regionId: 1,
    regionName: 'Cội Nguồn Huyền Thoại',
    maxHp: 70000,
    level: 9,
    difficulty: 'Rất khó',
    origin: 'Truyền thuyết Chử Đồng Tử - Tiên Dung',
    biography: 'Nàng công chúa con vua Hùng khát khao tự do vượt ngoài cung cấm, dám vượt qua mọi định kiến xã hội để kết duyên cùng chàng trai nghèo, mở mang phố xá giao thương sầm uất.',
    context: 'Thuyền rồng lướt êm trên sóng nước mùa xuân, tiếng sáo diều thanh bình ngân vang.',
    personality: 'Phóng khoáng, tự tin, quyết đoán và nhân ái.',
    skills: ['Tiên Hoa Lạc Vũ', 'Giao Thương Hưng Thịnh', 'Vũ Hóa Đăng Tiên'],
    avatarStyle: { symbol: '🌸', badge: 'Tiên Nữ Tự Do', accentColor: '#F43F5E' },
    theme: {
      primary: '#E11D48',
      secondary: '#BE123C',
      border: 'border-rose-500',
      glow: 'shadow-rose-500/30',
      text: 'text-rose-400',
      bgGradient: 'from-rose-950 via-slate-900 to-pink-950',
      iconBg: 'bg-rose-600'
    },
    rewardExp: 700,
    rewardBadge: 'Phù Dung Tiên Ấn',
    rewardTitle: 'Ý Chí Khai Phóng',
    questions: [
      {
        id: 'q9_1',
        question: 'Thái độ của Tiên Dung khi gặp Chử Đồng Tử trên bãi cát thể hiện nét đẹp tính cách gì?',
        options: ['Tôn trọng nhân duyên trời định, không phân biệt giàu nghèo sang hèn', 'Hoảng sợ kêu lính thị vệ bắt trói', 'Chê cười hoàn cảnh bần hàn của chàng', 'Yêu cầu chàng phải dâng lễ vật quý giá'],
        correctIndex: 0,
        explanation: 'Tiên Dung coi cuộc hội ngộ là duyên trời định, chủ động cùng Chử Đồng Tử kết làm vợ chồng son sắt.',
        damage: 23500
      },
      {
        id: 'q9_2',
        question: 'Tiên Dung và Chử Đồng Tử sau khi kết hôn đã cùng nhân dân làm việc gì ích nước lợi dân?',
        options: ['Khai khẩn đất hoang, mở chợ buôn bán và truyền dạy nghề cho dân', 'Xây dựng cung điện nguy nga để hưởng thụ', 'Tuyển mộ binh sĩ đánh chiếm lân bang', 'Rút lui vào rừng sâu không giao tiếp với đời'],
        correctIndex: 0,
        explanation: 'Hai vợ chồng mở chợ, khuyến khích buôn bán giao thương và dạy dân làm ăn hưng thịnh khắp vùng Dạ Trạch.',
        damage: 23500
      },
      {
        id: 'q9_3',
        question: 'Đền thờ Chử Đồng Tử và Tiên Dung hiện nay nổi tiếng nhất ở tỉnh nào?',
        options: ['Tỉnh Hưng Yên (Đền Đa Hòa và Đền Dạ Trạch)', 'Tỉnh Phú Thọ', 'Tỉnh Quảng Ninh', 'Tỉnh Ninh Bình'],
        correctIndex: 0,
        explanation: 'Nằm bên bờ tả ngạn sông Hồng thuộc huyện Khoái Châu, tỉnh Hưng Yên.',
        damage: 23000
      }
    ]
  },
  {
    id: 10,
    order: 10,
    arenaName: 'Đấu trường 10: Thủy Cung Khởi Nguyên',
    bossName: 'Lạc Long Quân',
    title: 'Bách Việt Thủy Tổ - Rồng Ngàn Năm',
    regionId: 1,
    regionName: 'Cội Nguồn Huyền Thoại',
    maxHp: 80000,
    level: 10,
    difficulty: 'Rất khó',
    origin: 'Truyền thuyết Con Rồng Cháu Tiên (Bách Việt Thủy Tổ)',
    biography: 'Vị thần nòi giống Rồng uy dũng, mình rồng sức mạnh vô biên, trừ diệt Ngư Tinh, Hồ Tinh, Mộc Tinh bảo vệ dân lành, cùng mẹ Âu Cơ sinh bọc trăm trứng nở trăm người con lập nên cơ đồ non nước.',
    context: 'Thủy phủ Biển Đông cuộn sóng linh quang, chín rồng vàng vờn mây hộ giá uy phong lẫm liệt.',
    personality: 'Hùng vĩ, nhân từ, trừ gian diệt ác, kiến tạo non sông.',
    skills: ['Cửu Long Phục Ba', 'Diệt Trừ Tam Quái', 'Bách Noãn Khai Cơ'],
    avatarStyle: { symbol: '🐲', badge: 'Thủy Tổ Nòi Rồng', accentColor: '#3B82F6' },
    theme: {
      primary: '#2563EB',
      secondary: '#1D4ED8',
      border: 'border-blue-500',
      glow: 'shadow-blue-500/40',
      text: 'text-blue-400',
      bgGradient: 'from-blue-950 via-slate-900 to-indigo-950',
      iconBg: 'bg-blue-600'
    },
    rewardExp: 900,
    rewardBadge: 'Thánh Long Tinh Thạch',
    rewardTitle: 'Cháu Con Nòi Rồng',
    questions: [
      {
        id: 'q10_1',
        question: 'Lạc Long Quân đã diệt trừ ba loài thủy quái - yêu quái nào để mang lại bình yên cho nhân dân?',
        options: ['Ngư Tinh (Cá quỷ biển Đông), Hồ Tinh (Cáo chín đuôi), Mộc Tinh (Cây cổ thụ thành tinh)', 'Bạch Hổ, Hắc Báo, Hoàng Xà', 'Thủy Quái Sông Mã, Rắn Khổng Lồ, Đại Bàng Tinh', 'Chằn Tinh, Sói Tinh, Quỷ Dạ Xoa'],
        correctIndex: 0,
        explanation: 'Lạc Long Quân đã lập chiến công lẫy lừng diệt trừ Ngư Tinh ở biển, Hồ Tinh ở Tây Hồ và Mộc Tinh ở Phong Châu.',
        damage: 27000
      },
      {
        id: 'q10_2',
        question: 'Lời dặn chia con "Năm mươi con theo cha xuống biển, năm mươi con theo mẹ lên núi" phản ánh cơ cấu gì?',
        options: ['Sự phân bố địa bàn sinh sống của cộng đồng dân cư Việt cổ khắp non sông rừng biển', 'Sự chia rẽ nội bộ gia tộc', 'Một cuộc di dân sang vùng đất mới ở nước ngoài', 'Quy tắc quân sự thời cổ đại'],
        correctIndex: 0,
        explanation: 'Khẳng định tình đoàn kết keo sơn của nhân dân các vùng miền: Rừng núi, đồng bằng và duyên hải hải đảo chung một cội nguồn.',
        damage: 27000
      },
      {
        id: 'q10_3',
        question: 'Cụm từ "Đồng bào" trong tiếng Việt có nguồn gốc thiêng liêng từ chi tiết nào trong truyền thuyết?',
        options: ['Chi tiết bọc trăm trứng (đồng bào = cùng sinh ra từ một bọc) của mẹ Âu Cơ', 'Chi tiết chia lúa gạo khi cấy mùa', 'Chi tiết cùng chèo thuyền vượt bão sông Hồng', 'Chi tiết cùng hát khúc ca khải hoàn'],
        correctIndex: 0,
        explanation: '"Đồng bào" nghĩa là cùng một bọc, xuất phát từ bọc trăm trứng của mẹ Âu Cơ và cha Lạc Long Quân.',
        damage: 26000
      }
    ]
  },

  // ==========================================
  // VÙNG 2: THẾ GIỚI TRUYỀN THUYẾT (11 - 20)
  // ==========================================
  {
    id: 11,
    order: 11,
    arenaName: 'Đấu trường 11: Đỉnh Non Tiên Âu Cơ',
    bossName: 'Âu Cơ',
    title: 'Mẹ Tiên Non Cao Bách Việt',
    regionId: 2,
    regionName: 'Thế Giới Truyền Thuyết',
    maxHp: 85000,
    level: 11,
    difficulty: 'Trung bình',
    origin: 'Truyền thuyết Con Rồng Cháu Tiên (Mẫu Nghi Thần Nữ)',
    biography: 'Nàng tiên nữ dòng dõi thần nông xinh đẹp tuyệt trần, mang trái tim yêu thương bao la, dạy dân trồng trọt chăn tằm, người mẹ vĩ đại sinh ra bọc trăm trứng nòi giống Lạc Hồng.',
    context: 'Rừng xanh thẳm tràn ngập hoa đỗ quyên rực rỡ, mây lành bồng bềnh phủ đỉnh non cao.',
    personality: 'Từ ái, thông tuệ, cần lao và gắn bó máu thịt với non sông.',
    skills: ['Bách Điểu Triều Phụng', 'Lạc Hồng Tinh Hoa', 'Mẫu Nghi Hộ Trụ'],
    avatarStyle: { symbol: '🦚', badge: 'Mẹ Tiên Bách Việt', accentColor: '#10B981' },
    theme: {
      primary: '#059669',
      secondary: '#047857',
      border: 'border-emerald-500',
      glow: 'shadow-emerald-500/30',
      text: 'text-emerald-400',
      bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
      iconBg: 'bg-emerald-600'
    },
    rewardExp: 950,
    rewardBadge: 'Phù Hiệu Tiên Nữ',
    rewardTitle: 'Người Con Mẹ Âu Cơ',
    questions: [
      {
        id: 'q11_1',
        question: 'Mẹ Âu Cơ thuộc dòng dõi thần tiên nào theo truyền thuyết?',
        options: ['Dòng dõi Đế Lai (thần Nông phương Bắc)', 'Dòng dõi Đế Thích', 'Dòng dõi Nữ Oa', 'Dòng dõi Thần Mặt Trời'],
        correctIndex: 0,
        explanation: 'Âu Cơ là con gái Đế Lai thuộc dòng giống Thần Nông xinh đẹp giáng trần du ngoạn phương Nam.',
        damage: 29000
      },
      {
        id: 'q11_2',
        question: 'Người con trưởng theo mẹ Âu Cơ lên núi được tôn làm vua và đặt danh hiệu là gì?',
        options: ['Vua Hùng (Hùng Vương)', 'Vua Thục', 'Triệu Việt Vương', 'Bố Cái Đại Vương'],
        correctIndex: 0,
        explanation: 'Người con cả được tôn làm vua, lấy hiệu Hùng Vương, đóng đô ở Phong Châu (Phú Thọ).',
        damage: 28000
      },
      {
        id: 'q11_3',
        question: 'Khu di tích Đền Mẫu Âu Cơ nổi tiếng hiện nay nằm ở huyện nào của tỉnh Phú Thọ?',
        options: ['Huyện Hạ Hòa', 'Huyện Lâm Thao', 'Huyện Thanh Ba', 'Huyện Phù Ninh'],
        correctIndex: 0,
        explanation: 'Đền Mẫu Âu Cơ ngự tại xã Hiền Lương, huyện Hạ Hòa, tỉnh Phú Thọ.',
        damage: 28000
      }
    ]
  },
  {
    id: 12,
    order: 12,
    arenaName: 'Đấu trường 12: Đỉnh Cung Tản Viên',
    bossName: 'Tản Viên Sơn Thánh',
    title: 'Đệ Nhất Tứ Bất Tử Đại Vương',
    regionId: 2,
    regionName: 'Thế Giới Truyền Thuyết',
    maxHp: 90000,
    level: 12,
    difficulty: 'Khó',
    origin: 'Tín ngưỡng dân gian và truyền thuyết Tản Viên Sơn Thánh',
    biography: 'Đứng đầu hàng Tứ Bất Tử trong tín ngưỡng dân gian Việt Nam, được phong là Nam Thiên Thần Tổ, có gậy thần và sách ước độ thế cứu dân khỏi bão lũ lầm than.',
    context: 'Cung điện mây ngàn Tản Viên sừng sững uy nghiêm, hào quang ngọc bích tỏa sáng rực rỡ.',
    personality: 'Đại trí đại dũng, vị quốc an dân, uy nghiêm tột bực.',
    skills: ['Ước Thư Biến Hóa', 'Thần Trượng Hồi Sinh', 'Tản Viên Trấn Sơn'],
    avatarStyle: { symbol: '⚡', badge: 'Đệ Nhất Bất Tử', accentColor: '#EAB308' },
    theme: {
      primary: '#CA8A04',
      secondary: '#A16207',
      border: 'border-yellow-500',
      glow: 'shadow-yellow-500/30',
      text: 'text-yellow-400',
      bgGradient: 'from-amber-950 via-slate-900 to-yellow-950',
      iconBg: 'bg-yellow-600'
    },
    rewardExp: 1000,
    rewardBadge: 'Gậy Thần Sách Ước',
    rewardTitle: 'Hộ Thần Đại Việt',
    questions: [
      {
        id: 'q12_1',
        question: 'Ai đã ban tặng cho Tản Viên chiếc gậy đầu sinh đầu tử thần kỳ?',
        options: ['Thái Bạch Kim Tinh', 'Long Vương Biển Đông', 'Bà Chúa Liễu Hạnh', 'Thần Nông'],
        correctIndex: 0,
        explanation: 'Thần Thái Bạch Kim Tinh cảm kích lòng từ bi cứu rắn con Long Vương của Tản Viên nên đã ban gậy thần.',
        damage: 30000
      },
      {
        id: 'q12_2',
        question: 'Trong tác phẩm "Chuyện chức phán sự đền Tản Viên" của Nguyễn Dữ, vị thần cai quản ngôi đền này đã giúp ai giành lại công lý?',
        options: ['Ngô Tử Văn', 'Trương Sinh', 'Phan Lang', 'Từ Thức'],
        correctIndex: 0,
        explanation: 'Thổ thần đền Tản Viên đã chỉ dẫn Ngô Tử Văn vạch trần tội ác của hồn ma tên tướng giặc họ Thôi dưới Minh ty.',
        damage: 30000
      },
      {
        id: 'q12_3',
        question: 'Đền thờ Tản Viên Sơn Thánh trên núi Ba Vì thường được chia làm ba cụm đền nào?',
        options: ['Đền Hạ, Đền Trung và Đền Thượng', 'Đền Đông, Đền Tây, Đền Nam', 'Đền Tiên, Đền Phật, Đền Thánh', 'Đền Mây, Đền Gió, Đền Nước'],
        correctIndex: 0,
        explanation: 'Hệ thống đền thờ Tản Viên gồm Đền Hạ ở chân núi, Đền Trung ở lưng chừng và Đền Thượng ở đỉnh núi.',
        damage: 30000
      }
    ]
  },
  {
    id: 13,
    order: 13,
    arenaName: 'Đấu trường 13: Phủ Giày Trăng Sáng',
    bossName: 'Bà Chúa Liễu Hạnh',
    title: 'Mẫu Nghi Thiên Hạ - Thánh Mẫu',
    regionId: 2,
    regionName: 'Thế Giới Truyền Thuyết',
    maxHp: 95000,
    level: 13,
    difficulty: 'Khó',
    origin: 'Tín ngưỡng thờ Mẫu Tam phủ - Tứ phủ của người Việt',
    biography: 'Đệ nhị Tiên nữ Quỳnh Hoa giáng trần ba lần làm rạng danh đạo hiếu và trừ gian diệt bạo, trừng phạt kẻ gian tà cậy quyền, được bách tính tôn kính là Mẫu Liễu Hạnh.',
    context: 'Phủ Giày lung linh ánh hoa đăng, tiếng đàn ca trù thánh thót huyền diệu vang vọng cõi thiêng.',
    personality: 'Thông minh, sắc sảo, nghiêm khắc với kẻ ác và chở che kẻ yếu.',
    skills: ['Thiên Nữ Hóa Thần', 'Lôi Giảo Tà Gian', 'Mẫu Nghi Tam Phủ'],
    avatarStyle: { symbol: '🪷', badge: 'Mẫu Nghi Thiên Hạ', accentColor: '#D946EF' },
    theme: {
      primary: '#C026D3',
      secondary: '#A21CAF',
      border: 'border-fuchsia-500',
      glow: 'shadow-fuchsia-500/30',
      text: 'text-fuchsia-400',
      bgGradient: 'from-fuchsia-950 via-slate-900 to-purple-950',
      iconBg: 'bg-fuchsia-600'
    },
    rewardExp: 1100,
    rewardBadge: 'Phù Hiệu Thánh Mẫu',
    rewardTitle: 'Chân Tâm Hướng Đạo',
    questions: [
      {
        id: 'q13_1',
        question: 'Bà Chúa Liễu Hạnh nguyên là đệ nhị tiên nữ của ai trước khi giáng trần?',
        options: ['Ngọc Hoàng Thượng Đế', 'Tây Vương Mẫu', 'Phật Bà Quan Âm', 'Long Nữ Thủy Tộc'],
        correctIndex: 0,
        explanation: 'Nàng là đệ nhị tiên nữ con gái Ngọc Hoàng vì lỡ tay đánh rơi chén ngọc mà phải giáng trần.',
        damage: 32000
      },
      {
        id: 'q13_2',
        question: 'Quần thể di tích Phủ Giầy thờ Thánh Mẫu Liễu Hạnh nằm tại tỉnh nào nước ta?',
        options: ['Tỉnh Nam Định', 'Tỉnh Hà Nam', 'Tỉnh Hưng Yên', 'Tỉnh Thái Bình'],
        correctIndex: 0,
        explanation: 'Phủ Giầy tọa lạc tại xã Kim Thái, huyện Vụ Bản, tỉnh Nam Định.',
        damage: 32000
      },
      {
        id: 'q13_3',
        question: 'Tín ngưỡng thờ Mẫu Tam phủ của người Việt đã được UNESCO công nhận là gì?',
        options: ['Di sản văn hóa phi vật thể đại diện của nhân loại (năm 2016)', 'Kỳ quan thiên nhiên thế giới', 'Di sản tư liệu ký ức thế giới', 'Di sản địa chất toàn cầu'],
        correctIndex: 0,
        explanation: 'UNESCO đã chính thức vinh danh "Thực hành Tín ngưỡng thờ Mẫu Tam phủ của người Việt" năm 2016.',
        damage: 31000
      }
    ]
  },
  {
    id: 14,
    order: 14,
    arenaName: 'Đấu trường 14: Cõi Thiện Thần Tiên',
    bossName: 'Ông Bụt',
    title: 'Hiện Thân Lòng Nhân Ái',
    regionId: 2,
    regionName: 'Thế Giới Truyền Thuyết',
    maxHp: 98000,
    level: 14,
    difficulty: 'Khó',
    origin: 'Hình tượng nhân vật trợ giúp kỳ ảo trong truyện cổ tích Việt Nam',
    biography: 'Hình tượng người già râu tóc bạc phơ, tay cầm gậy trúc luôn xuất hiện bên tiếng khóc của những số phận nghèo khổ, bất hạnh với câu hỏi thân thương: "Vì sao con khóc?".',
    context: 'Cây đa bến nước đầu làng, mây ngũ sắc rạng ngời hào quang từ bi.',
    personality: 'Hiền từ, bao dung, thấu hiểu lẽ đời và đem lại hy vọng.',
    skills: ['Bụt Hiện Phù Nguy', 'Tâm Thiện Hóa Châu', 'Khắc Xuất Khắc Nhập'],
    avatarStyle: { symbol: '✨', badge: 'Hiền Thánh Nhân Từ', accentColor: '#38BDF8' },
    theme: {
      primary: '#0284C7',
      secondary: '#0369A1',
      border: 'border-sky-400',
      glow: 'shadow-sky-400/30',
      text: 'text-sky-300',
      bgGradient: 'from-sky-950 via-slate-900 to-indigo-950',
      iconBg: 'bg-sky-600'
    },
    rewardExp: 1150,
    rewardBadge: 'Viên Ngọc Thiện Tâm',
    rewardTitle: 'Người Lương Thiện',
    questions: [
      {
        id: 'q14_1',
        question: 'Trong truyện cổ tích Tấm Cám, mỗi khi nàng Tấm tủi thân khóc một mình, ai đã hiện lên an ủi và chỉ đường giúp đỡ?',
        options: ['Ông Bụt', 'Bà Tiên cánh bướm', 'Thần Núi Ba Vì', 'Con rùa vàng nhỏ'],
        correctIndex: 0,
        explanation: 'Ông Bụt hiện lên với câu hỏi quen thuộc "Vì sao con khóc?" và hướng dẫn nuôi cá bống, nhặt xương bống làm quần áo dự hội.',
        damage: 33000
      },
      {
        id: 'q14_2',
        question: 'Hình tượng Ông Bụt trong văn học dân gian phản ánh niềm tin gì của nhân dân lao động?',
        options: ['Niềm tin vào "Ở hiền gặp lành", cái thiện luôn chiến thắng cái ác', 'Niềm tin vào sức mạnh của bói toán mê tín', 'Khát vọng chinh phục thế giới ngầm', 'Sự phụ thuộc hoàn toàn vào thần linh'],
        correctIndex: 0,
        explanation: 'Ông Bụt là hóa thân của ước mơ công lý, cứu giúp những con người lương thiện yếu thế trong xã hội cũ.',
        damage: 33000
      },
      {
        id: 'q14_3',
        question: 'Trong truyện "Cây tre trăm đốt", câu thần chú Ông Bụt dạy cho anh Khoai dùng để gắn các đốt tre lại là gì?',
        options: ['Khắc nhập, khắc nhập', 'Vừng ơi mở ra', 'Khắc xuất, khắc xuất', 'Hô phong hoán vũ'],
        correctIndex: 0,
        explanation: '"Khắc nhập, khắc nhập" để trăm đốt tre dính liền thành một cây; "Khắc xuất, khắc xuất" để rời ra.',
        damage: 32000
      }
    ]
  },
  {
    id: 15,
    order: 15,
    arenaName: 'Đấu trường 15: Rừng Trúc Bách Đốt',
    bossName: 'Cây Tre Trăm Đốt',
    title: 'Bảo Vật Trí Tuệ Dân Gian',
    regionId: 2,
    regionName: 'Thế Giới Truyền Thuyết',
    maxHp: 102000,
    level: 15,
    difficulty: 'Khó',
    origin: 'Truyện cổ tích Cây tre trăm đốt (Văn học dân gian Việt Nam)',
    biography: 'Biểu tượng của lòng trung thực, chăm chỉ và đức tin công lý. Phép màu từ trăm đốt tre trừng trị kẻ phú ông bội ước, tham lam và bảo vệ hạnh phúc chân chính cho người lao động.',
    context: 'Rừng tre xanh mướt ngút ngàn, thân tre vàng óng lấp lánh linh khí đất trời.',
    personality: 'Bất khuất, dẻo dai, kiên cường như tinh thần dân tộc.',
    skills: ['Bách Trúc Liên Hoàn', 'Khắc Nhập Thần Lực', 'Khắc Xuất Tỏa Trận'],
    avatarStyle: { symbol: '🎋', badge: 'Tre Xanh Bách Đốt', accentColor: '#22C55E' },
    theme: {
      primary: '#16A34A',
      secondary: '#15803D',
      border: 'border-green-500',
      glow: 'shadow-green-500/30',
      text: 'text-green-400',
      bgGradient: 'from-green-950 via-slate-900 to-emerald-950',
      iconBg: 'bg-green-600'
    },
    rewardExp: 1200,
    rewardBadge: 'Đốt Tre Phép Thuật',
    rewardTitle: 'Kiên Cường Như Tre',
    questions: [
      {
        id: 'q15_1',
        question: 'Trong truyện "Cây tre trăm đốt", anh Khoai đã phải vượt qua thử thách vô lý nào của lão phú ông?',
        options: ['Đi tìm cho bằng được một cây tre đủ một trăm đốt nguyên vẹn', 'Đào một giếng sâu mười trượng trong một đêm', 'Gieo lúa gặt ngay trong một buổi sáng', 'Bắt một trăm con cá chép vàng từ biển'],
        correctIndex: 0,
        explanation: 'Phú ông gian xảo bắt anh Khoai vào rừng tìm cây tre trăm đốt để gả con gái, nhưng thực tế cây tre không bao giờ có 100 đốt tự nhiên.',
        damage: 34000
      },
      {
        id: 'q15_2',
        question: 'Bài thơ "Tre Việt Nam" của nhà thơ Nguyễn Duy có câu thơ mở đầu nổi tiếng nào?',
        options: ['Tre xanh, xanh tự bao giờ? Chuyện ngày xưa đã có bờ tre xanh', 'Thân gầy guộc, lá mong manh', 'Đất cày lên sỏi đá, tre bọc lấy bờ', 'Tre già măng mọc muôn đời sau'],
        correctIndex: 0,
        explanation: '"Tre xanh, xanh tự bao giờ? Chuyện ngày xưa đã có bờ tre xanh" - hình tượng bất hủ ca ngợi phẩm chất con người Việt Nam.',
        damage: 34000
      },
      {
        id: 'q15_3',
        question: 'Hình tượng cây tre gắn bó mật thiết với cuộc sống người Việt như thế nào?',
        options: ['Làm vũ khí chống giặc, làm nhà cửa, công cụ sản xuất và gắn với văn hóa tinh thần', 'Chỉ dùng để làm củi đốt', 'Chỉ dùng trong các nghi lễ cúng tế', 'Chỉ trồng để làm cảnh'],
        correctIndex: 0,
        explanation: 'Tre là người bạn đồng hành thủy chung của dân tộc: Làm chông gậy giữ làng, làm nôi em bé, đan lát vật dụng sinh hoạt muôn đời.',
        damage: 34000
      }
    ]
  },
  {
    id: 16,
    order: 16,
    arenaName: 'Đấu trường 16: Hang Sâu Chằn Tinh',
    bossName: 'Thạch Sanh',
    title: 'Dũng Sĩ Chém Chằn Tinh',
    regionId: 2,
    regionName: 'Thế Giới Truyền Thuyết',
    maxHp: 108000,
    level: 16,
    difficulty: 'Khó',
    origin: 'Truyện thơ và truyện cổ tích Thạch Sanh',
    biography: 'Chàng dũng sĩ mồ côi dưới gốc đa có sức khỏe phi thường và võ nghệ cao cường. Giết Chằn tinh, bắn Đại bàng cứu công chúa, dùng tiếng đàn giải oan và niêu cơm thần thu phục mười tám nước chư hầu.',
    context: 'Gốc đa già cổ thụ bóng râm che mát, rìa vách đá hang sâu lấp lánh cung tên vàng.',
    personality: 'Thật thà, dũng cảm, độ lượng và chuộng hòa bình.',
    skills: ['Trảm Diệt Chằn Tinh', 'Thần Đàn Phán Xử', 'Vạn Nhân Cơm Niêu'],
    avatarStyle: { symbol: '🪓', badge: 'Dũng Sĩ Trượng Nghĩa', accentColor: '#F97316' },
    theme: {
      primary: '#EA580C',
      secondary: '#C2410C',
      border: 'border-orange-500',
      glow: 'shadow-orange-500/30',
      text: 'text-orange-400',
      bgGradient: 'from-orange-950 via-slate-900 to-amber-950',
      iconBg: 'bg-orange-600'
    },
    rewardExp: 1300,
    rewardBadge: 'Cung Vàng Thần Cầm',
    rewardTitle: 'Dũng Sĩ Hòa Bình',
    questions: [
      {
        id: 'q16_1',
        question: 'Hai bảo vật thần kỳ giúp Thạch Sanh dẹp tan quân mười tám nước chư hầu mà không cần đổ máu là gì?',
        options: ['Cây đàn thần và niêu cơm thần ăn mãi không hết', 'Cung tên vàng và kiếm thần', 'Áo tàng hình và gương thần', 'Gậy thần và nón lá'],
        correctIndex: 0,
        explanation: 'Tiếng đàn thần đánh tan ý chí xâm lăng, niêu cơm thần thết đãi quân giặc thể hiện truyền thống nhân văn yêu chuộng hòa bình của dân tộc.',
        damage: 36000
      },
      {
        id: 'q16_2',
        question: 'Ai là người nhiều lần cướp công của Thạch Sanh để cầu bổng lộc triều đình?',
        options: ['Lý Thông', 'Tướng giặc', 'Phú ông', 'Chằn tinh'],
        correctIndex: 0,
        explanation: 'Mẹ con Lý Thông gian ác xảo quyệt đã liên tiếp lừa Thạch Sanh đi nộp mạng rồi cướp công chém Chằn tinh và cứu công chúa.',
        damage: 36000
      },
      {
        id: 'q16_3',
        question: 'Sau khi chém chết Chằn tinh, Thạch Sanh đã thu được chiến lợi phẩm quý giá nào?',
        options: ['Bộ cung tên bằng vàng ròng', 'Tấm áo tàng hình', 'Thanh kiếm khổng lồ', 'Viên ngọc ước'],
        correctIndex: 0,
        explanation: 'Chằn tinh hiện nguyên hình là con trăn tinh khổng lồ, để lại bên xác một bộ cung tên bằng vàng sáng chói.',
        damage: 36000
      }
    ]
  },
  {
    id: 17,
    order: 17,
    arenaName: 'Đấu trường 17: Mê Hồn Gian Xảo',
    bossName: 'Lý Thông',
    title: 'Kẻ Tráo Trở Mưu Gian',
    regionId: 2,
    regionName: 'Thế Giới Truyền Thuyết',
    maxHp: 112000,
    level: 17,
    difficulty: 'Khó',
    origin: 'Truyện cổ tích Thạch Sanh (Hình tượng nhân vật phản diện)',
    biography: 'Kẻ xảo trá mang danh kết nghĩa anh em nhưng trong lòng đầy mưu mô hiểm độc, đẩy người khác vào chỗ chết để trục lợi, cuối cùng phải nhận bản án trừng phạt nghiêm khắc của tự nhiên.',
    context: 'Khu rừng rậm rạp đầy bóng tối quỷ quyệt, tiếng sấm sét rạch ngang bầu trời đêm.',
    personality: 'Ganh ghét, phản trắc, tham lam danh vọng và bội nghĩa.',
    skills: ['Gian Giảo Đoạt Công', 'Ám Xà Độc Châm', 'Thiên Lôi Phạt Tội'],
    avatarStyle: { symbol: '🎭', badge: 'Tráo Trở Tâm Gian', accentColor: '#6B7280' },
    theme: {
      primary: '#4B5563',
      secondary: '#374151',
      border: 'border-slate-500',
      glow: 'shadow-slate-500/30',
      text: 'text-slate-300',
      bgGradient: 'from-slate-950 via-zinc-900 to-neutral-950',
      iconBg: 'bg-slate-700'
    },
    rewardExp: 1350,
    rewardBadge: 'Kính Chiếu Chân Tướng',
    rewardTitle: 'Chí Công Vô Tư',
    questions: [
      {
        id: 'q17_1',
        question: 'Kết cục của mẹ con Lý Thông trong truyện cổ tích Thạch Sanh là gì?',
        options: ['Bị sét đánh chết giữa đường rồi biến thành con bọ hung', 'Được tha bổng về quê làm ăn', 'Bị triều đình tống giam vào ngục tối suốt đời', 'Bỏ trốn sang nước lân bang'],
        correctIndex: 0,
        explanation: 'Thạch Sanh bao dung tha tội cho về quê, nhưng trời không dung tha: Sét đánh chết mẹ con hắn và hóa thành bọ hung bẩn thỉu.',
        damage: 38000
      },
      {
        id: 'q17_2',
        question: 'Hình tượng Lý Thông biến thành bọ hung thể hiện quan niệm gì của nhân dân?',
        options: ['Sự khinh bỉ tột cùng đối với những kẻ vong ân bội nghĩa, ăn bẩn sống hèn', 'Tình yêu đối với các loài côn trùng', 'Giải thích nguồn gốc sinh học của loài bọ hung', 'Sự đồng cảm đối với số phận người thất bại'],
        correctIndex: 0,
        explanation: 'Nhân dân dùng hình tượng bọ hung để lên án nghiêm khắc lối sống dơ bẩn, phản trắc, cướp đoạt mồ hôi nước mắt của người khác.',
        damage: 37000
      },
      {
        id: 'q17_3',
        question: 'Thạch Sanh đã xử sự như thế nào khi Lý Thông bị vạch trần tội ác trước vua?',
        options: ['Xin tha tội chết cho mẹ con Lý Thông về quê', 'Đích thân chém đầu Lý Thông để trả thù', 'Đòi lại toàn bộ số vàng bạc bị cướp', 'Bắt Lý Thông phải làm nô bộc trọn đời'],
        correctIndex: 0,
        explanation: 'Thạch Sanh rộng lượng tha mạng cho mẹ con Lý Thông, khẳng định tấm lòng cao thượng của người trượng phu.',
        damage: 37000
      }
    ]
  },
  {
    id: 18,
    order: 18,
    arenaName: 'Đấu trường 18: Hang Núi Đại Bàng',
    bossName: 'Công Chúa Quỳnh Hoa',
    title: 'Giai Nhân Thủy Chung Trầm Lặng',
    regionId: 2,
    regionName: 'Thế Giới Truyền Thuyết',
    maxHp: 115000,
    level: 18,
    difficulty: 'Khó',
    origin: 'Truyện cổ tích Thạch Sanh',
    biography: 'Nàng công chúa kiều diễm bị đại bàng tinh quắp đi giam cầm trong hang sâu, được Thạch Sanh dũng cảm giải cứu. Nàng bị câm vì uất ức nhưng tiếng đàn thần của chàng đã làm nàng bật tiếng nói minh oan.',
    context: 'Cung đình cẩm tú rèm châu rủ bóng, tiếng đàn huyền diệu xua tan nỗi u buồn ngàn thu.',
    personality: 'Thủy chung, thuần khiết, biết ơn sâu sắc người nghĩa hiệp.',
    skills: ['Ngọc Nữ Phục Ngôn', 'Cầm Âm Cố Tri', 'Kim Chi Ngọc Diệp'],
    avatarStyle: { symbol: '👑', badge: 'Ngọc Nữ Hoàng Cung', accentColor: '#A855F7' },
    theme: {
      primary: '#9333EA',
      secondary: '#7E22CE',
      border: 'border-purple-500',
      glow: 'shadow-purple-500/30',
      text: 'text-purple-400',
      bgGradient: 'from-purple-950 via-slate-900 to-pink-950',
      iconBg: 'bg-purple-600'
    },
    rewardExp: 1400,
    rewardBadge: 'Phù Hiệu Quỳnh Hoa',
    rewardTitle: 'Tri Âm Tương Phùng',
    questions: [
      {
        id: 'q18_1',
        question: 'Điều kỳ diệu gì đã khiến công chúa Quỳnh Hoa cười nói trở lại sau chuỗi ngày câm lặng u sầu?',
        options: ['Nghe thấy tiếng đàn thần than thở nỗi oan khiên của Thạch Sanh từ ngục tối', 'Uống chén thuốc quý của ngự y trong cung đình', 'Nhìn thấy Lý Thông mang lễ vật cầu hôn', 'Được vua cha ban tặng ngọc tỷ'],
        correctIndex: 0,
        explanation: 'Tiếng đàn của Thạch Sanh: "Đàn kêu tích tịch tình tang / Ai mang công chúa dưới hang trở về" đã làm công chúa xúc động bật ra tiếng nói.',
        damage: 38500
      },
      {
        id: 'q18_2',
        question: 'Ai đã dùng cung tên vàng bắn thương đại bàng tinh khi nó đang cắp công chúa bay qua gốc đa?',
        options: ['Thạch Sanh', 'Lý Thông', 'Đội thị vệ cung đình', 'Thợ săn trong rừng'],
        correctIndex: 0,
        explanation: 'Thạch Sanh đang ngồi dưới gốc đa thấy đại bàng cắp thiếu nữ, liền giương cung vàng bắn trúng cánh nó rồi lần theo vết máu đến hang sâu.',
        damage: 38500
      },
      {
        id: 'q18_3',
        question: 'Vua cha đã gả công chúa cho ai sau khi sự thật sáng tỏ?',
        options: ['Thạch Sanh', 'Lý Thông', 'Hoàng tử nước láng giềng', 'Tướng quân triều đình'],
        correctIndex: 0,
        explanation: 'Vua cha mừng rỡ gả công chúa cho Thạch Sanh và sau đó truyền ngôi báu cho chàng.',
        damage: 38000
      }
    ]
  },
  {
    id: 19,
    order: 19,
    arenaName: 'Đấu trường 19: Đồi Cỏ Sọ Dừa',
    bossName: 'Người Em Sọ Dừa',
    title: 'Chân Nhân Tài Ba Cốt Kỳ',
    regionId: 2,
    regionName: 'Thế Giới Truyền Thuyết',
    maxHp: 118000,
    level: 19,
    difficulty: 'Khó',
    origin: 'Truyện cổ tích Sọ Dừa (Mô-típ nhân vật đội lốt mang vẻ ngoài xấu xí)',
    biography: 'Chàng trai sinh ra mang hình hài dị thường như chiếc sọ dừa nhưng có tài chăn bò siêu phàm, thổi sáo ru hồn muôn loài, đỗ trạng nguyên rạng danh non sông và vượt qua muôn vàn gian nan bảo vệ người vợ hiền.',
    context: 'Đồi cỏ thảo nguyên mênh mông lộng gió, tiếng sáo trúc réo rắt thanh thoát bên đàn bò béo tốt.',
    personality: 'Nhẫn nại, lạc quan, thông minh tột bậc và giàu nghị lực.',
    skills: ['Trúc Địch Du Dương', 'Kỳ Hình Thần Biến', 'Trạng Nguyên Trấn Hải'],
    avatarStyle: { symbol: '🥥', badge: 'Trạng Nguyên Sọ Dừa', accentColor: '#84CC16' },
    theme: {
      primary: '#65A30D',
      secondary: '#4D7C0F',
      border: 'border-lime-500',
      glow: 'shadow-lime-500/30',
      text: 'text-lime-400',
      bgGradient: 'from-lime-950 via-slate-900 to-emerald-950',
      iconBg: 'bg-lime-600'
    },
    rewardExp: 1450,
    rewardBadge: 'Sáo Trúc Kỳ Mộng',
    rewardTitle: 'Tài Hoa Ẩn Tướng',
    questions: [
      {
        id: 'q19_1',
        question: 'Ai trong số ba người con gái của phú ông đã nhận ra phẩm chất tốt đẹp và đem lòng yêu Sọ Dừa?',
        options: ['Cô con gái út nhân hậu', 'Cô con gái cả kênh kiệu', 'Cô con gái thứ hai đố kỵ', 'Cả ba chị em'],
        correctIndex: 0,
        explanation: 'Cô út hiền lành mang cơm cho Sọ Dừa, phát hiện chàng thổi sáo chàng trai tuấn tú phi phàm nên đem lòng thương quý.',
        damage: 39500
      },
      {
        id: 'q19_2',
        question: 'Trước khi lên đường đi sứ, Sọ Dừa đã đưa cho vợ những vật gì dặn giắt vào người phòng thân?',
        options: ['Một hòn đá lửa, một con dao nhỏ và hai quả trứng gà', 'Một cây gậy thần và bao gạo nhỏ', 'Một chiếc trâm vàng và túi gấm', 'Một chiếc la bàn và thanh kiếm sắt'],
        correctIndex: 0,
        explanation: 'Chính những vật này đã cứu sống cô út khi bị hai người chị độc ác đẩy xuống biển sâu: mổ bụng cá, đánh lửa sưởi ấm, gà nở gáy gọi đò.',
        damage: 39500
      },
      {
        id: 'q19_3',
        question: 'Ý nghĩa nhân văn cốt lõi của truyện cổ tích "Sọ Dừa" là gì?',
        options: ['Đánh giá con người qua vẻ đẹp tâm hồn và tài năng thực chất, chứ không nhìn nhận qua vẻ bề ngoài', 'Khuyên người đời nên học nghề chăn nuôi gia súc', 'Ca ngợi sự giàu có của gia đình phú ông', 'Giải thích hiện tượng chim gà biết gáy trên đảo hoang'],
        correctIndex: 0,
        explanation: 'Đừng trông mặt mà bắt hình dong: Giá trị cao quý nhất của một con người nằm ở nhân cách, tài năng và sự kiên trì vượt khó.',
        damage: 39000
      }
    ]
  },
  {
    id: 20,
    order: 20,
    arenaName: 'Đấu trường 20: Vườn Thị Nghĩa Tình',
    bossName: 'Nhân Vật Tấm',
    title: 'Hóa Thân Bất Diệt Của Công Lý',
    regionId: 2,
    regionName: 'Thế Giới Truyền Thuyết',
    maxHp: 120000,
    level: 20,
    difficulty: 'Rất khó',
    origin: 'Truyện cổ tích Tấm Cám (Hình tượng bất khuất đấu tranh vì hạnh phúc)',
    biography: 'Từ cô gái mồ côi cam chịu bị mẹ con Cám chèn ép, Tấm đã trải qua nhiều kiếp hóa thân: Chim vàng anh, cây xoan đào, khung cửi và quả thị thơm ngát, kiên cường đứng lên giành lại quyền sống và hạnh phúc chính đáng.',
    context: 'Cây thị xum xuê bóng mát bên túp lều bà lão bán nước hiền từ, quả thị vàng thơm phức đượm tình quê.',
    personality: 'Chăm chỉ, nhẫn nại, kiên cường đấu tranh bất khuất trước cái ác.',
    skills: ['Kim Hoàng Anh Điểu', 'Xoan Đào Thần Mộc', 'Thị Thơm Hoàn Hồn'],
    avatarStyle: { symbol: '🐤', badge: 'Hoàn Sinh Bất Diệt', accentColor: '#F59E0B' },
    theme: {
      primary: '#D97706',
      secondary: '#B45309',
      border: 'border-amber-400',
      glow: 'shadow-amber-400/30',
      text: 'text-amber-300',
      bgGradient: 'from-amber-950 via-slate-900 to-yellow-950',
      iconBg: 'bg-amber-600'
    },
    rewardExp: 1600,
    rewardBadge: 'Quả Thị Hoàng Kim',
    rewardTitle: 'Kiên Cường Bất Khuất',
    questions: [
      {
        id: 'q20_1',
        question: 'Bốn lần hóa thân liên tiếp của nàng Tấm sau khi bị mẹ con Cám hãm hại là gì?',
        options: ['Chim vàng anh -> Hai cây xoan đào -> Khung cửi dệt vải -> Quả thị', 'Cá bống -> Đôi chim bồ câu -> Bông sen trắng -> Nàng tiên', 'Cây đa -> Suối nước -> Bông hoa cúc -> Hoàng hậu', 'Ngựa bạch -> Chiếc khăn tay -> Ngôi sao -> Quả bưởi'],
        correctIndex: 0,
        explanation: 'Sự hóa thân liên tục khẳng định sức sống mãnh liệt, không thể bị tiêu diệt của cái thiện và công lý.',
        damage: 40000
      },
      {
        id: 'q20_2',
        question: 'Câu nói của nàng Tấm cất lên từ khung cửi cảnh cáo mẹ con Cám là gì?',
        options: ['Cót ca cót két / Lấy tranh chồng chị / Chị khoét mắt ra', 'Cót ca cót két / Trả lại áo chị / Chị về hoàng cung', 'Cót ca cót két / Cơm nguội canh thừa / Đem lại cho ta', 'Cót ca cót két / Bống bống bang bang / Lên ăn cơm vàng'],
        correctIndex: 0,
        explanation: 'Lời cảnh cáo đanh thép cho thấy sự chuyển biến từ thế cam chịu sang chủ động đấu tranh quyết liệt của Tấm.',
        damage: 40000
      },
      {
        id: 'q20_3',
        question: 'Ai đã phát hiện ra nàng Tấm bước ra từ quả thị để dọn dẹp nhà cửa và nấu cơm nước?',
        options: ['Bà lão nghèo bán nước dưới gốc thị', 'Nhà vua khi đi săn bắn ngang qua', 'Mẹ con Cám khi đi chợ', 'Chú bé chăn trâu đầu làng'],
        correctIndex: 0,
        explanation: 'Bà lão rình nấp sau cánh cửa, thấy cô gái xinh đẹp bước ra từ quả thị liền chạy lại ôm chầm và xé vỏ thị đón nàng làm con.',
        damage: 40000
      }
    ]
  },

  // ==========================================
  // VÙNG 3: CÕI KỲ ẢO VĂN HỌC (21 - 30)
  // ==========================================
  {
    id: 21,
    order: 21,
    arenaName: 'Đấu trường 21: Bến Nước Hoàng Giang',
    bossName: 'Vũ Nương',
    title: 'Người Con Gái Nam Xương - Tiên Cung',
    regionId: 3,
    regionName: 'Cõi Kỳ Ảo Văn Học',
    maxHp: 122000,
    level: 21,
    difficulty: 'Khó',
    origin: 'Truyện người con gái Nam Xương (Trích "Truyền kỳ mạn lục" của Nguyễn Dữ)',
    biography: 'Vũ Thị Thiết - người phụ nữ đức hạnh, nết na, chung thủy hết mực nhưng chịu oan khuất bởi lời nói ngây thơ của con trẻ và thói đa nghi mù quáng của chồng. Nàng gieo mình xuống sông Hoàng Giang, được tiên nữ cứu vớt ngự thủy cung.',
    context: 'Bến sông Hoàng Giang mây sương giăng phủ mờ ảo, bóng hình nàng thoắt ẩn thoắt hiện trên kiệu hoa giữa dòng.',
    personality: 'Đoan trang, hiếu nghĩa, bao dung nhưng coi trọng phẩm giá hơn sinh mạng.',
    skills: ['Hoàng Giang Tẩy Oan', 'Bích Ba Tiên Trọng', 'Trâm Ngọc Minh Tâm'],
    avatarStyle: { symbol: '🌊', badge: 'Trinh Nữ Thủy Cung', accentColor: '#06B6D4' },
    theme: {
      primary: '#0891B2',
      secondary: '#0E7490',
      border: 'border-cyan-500',
      glow: 'shadow-cyan-500/30',
      text: 'text-cyan-400',
      bgGradient: 'from-cyan-950 via-slate-900 to-blue-950',
      iconBg: 'bg-cyan-600'
    },
    rewardExp: 1700,
    rewardBadge: 'Hoa Đăng Thủy Tinh',
    rewardTitle: 'Ngọc Khiết Băng Thanh',
    questions: [
      {
        id: 'q21_1',
        question: 'Tác phẩm "Chuyện người con gái Nam Xương" của tác giả Nguyễn Dữ được viết vào thời kỳ nào trong lịch sử văn học?',
        options: ['Văn học trung đại Việt Nam (thế kỷ XVI)', 'Văn học dân gian truyền khẩu', 'Văn học cận đại thế kỷ XIX', 'Văn học hiện đại sau 1945'],
        correctIndex: 0,
        explanation: 'Nguyễn Dữ sống ở thế kỷ XVI thời Lê - Mạc, sáng tác kiệt tác chữ Hán "Truyền kỳ mạn lục".',
        damage: 41000
      },
      {
        id: 'q21_2',
        question: 'Chi tiết "cái bóng trên vách" trong tác phẩm mang ý nghĩa nghệ thuật đặc sắc gì?',
        options: ['Vừa là đầu mối thắt nút gây nên bi kịch, vừa là chìa khóa mở nút hóa giải nỗi oan khiên', 'Chỉ là chi tiết ngẫu nhiên không có ý nghĩa', 'Thể hiện tài năng hội họa của bé Đản', 'Minh chứng cho hiện tượng tâm linh'],
        correctIndex: 0,
        explanation: 'Cái bóng trên vách do tình yêu thương con của Vũ Nương vô tình khiến Trương Sinh nghi kỵ, nhưng cũng chính cái bóng giúp chàng nhận ra sự thật đau đớn.',
        damage: 41000
      },
      {
        id: 'q21_3',
        question: 'Vì sao sau khi được giải oan, Vũ Nương chỉ hiện về giữa dòng Hoàng Giang tạ từ rồi biến mất chứ không về lại trần gian?',
        options: ['Vì nàng đã thuộc về cõi tiên thủy phủ, phẩm giá đã được phục hồi và xã hội phong kiến không còn chỗ dung nạp hạnh phúc trọn vẹn', 'Vì nàng còn giận Trương Sinh', 'Vì bé Đản không chịu nhận mẹ', 'Vì nàng bị giam giữ không được phép lên bờ'],
        correctIndex: 0,
        explanation: 'Chi tiết kỳ ảo vừa xót xa vừa khẳng định: Bi kịch xã hội phong kiến đã cướp đi hạnh phúc gia đình thực tế, nàng chỉ có thể bất tử trong thế giới thanh sạch.',
        damage: 40000
      }
    ]
  },
  {
    id: 22,
    order: 22,
    arenaName: 'Đấu trường 22: Thủy Phủ Nam Hải',
    bossName: 'Phan Lang',
    title: 'Sứ Giả Nghĩa Tình Cõi Trần - Thủy Cung',
    regionId: 3,
    regionName: 'Cõi Kỳ Ảo Văn Học',
    maxHp: 125000,
    level: 22,
    difficulty: 'Khó',
    origin: 'Truyện người con gái Nam Xương (Truyền kỳ mạn lục)',
    biography: 'Người cùng làng với Vũ Nương, từng cứu rùa thần Linh Phi. Khi bị đắm thuyền rơi xuống thủy cung được cứu sống, chàng đã chuyển lời trần gian và nhận chiếc hoa vàng cùng trâm ngọc từ Vũ Nương đưa về cho Trương Sinh.',
    context: 'Thủy cung tráng lệ mái ngọc tường san hô, tiếng nhạc lưu ly êm đềm lay động lòng người.',
    personality: 'Trọng ân nghĩa, mẫn tiệp, khéo léo kết nối tình người hai cõi.',
    skills: ['Linh Quy Báo Ân', 'Kim Hoa Tín Vật', 'Lưỡng Giới Thông Hành'],
    avatarStyle: { symbol: '🐢', badge: 'Tri Ân Nghĩa Hiệp', accentColor: '#10B981' },
    theme: {
      primary: '#059669',
      secondary: '#047857',
      border: 'border-emerald-500',
      glow: 'shadow-emerald-500/30',
      text: 'text-emerald-400',
      bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
      iconBg: 'bg-emerald-600'
    },
    rewardExp: 1800,
    rewardBadge: 'Kim Hoa Tín Vật',
    rewardTitle: 'Sứ Giả Nghĩa Tình',
    questions: [
      {
        id: 'q22_1',
        question: 'Trước khi gặp nạn đắm thuyền, Phan Lang đã làm việc thiện gì đối với Linh Phi?',
        options: ['Thả một con rùa mai xanh vướng lưới của phường chài', 'Dâng cúng lễ vật lên đền thờ Nam Hải', 'Cứu một chú chim bồ câu gãy cánh', 'Giúp người dân đắp đê ngăn lũ'],
        correctIndex: 0,
        explanation: 'Phan Lang mua lại con rùa vướng lưới (vốn là Linh Phi biến hình) rồi thả về biển, sau này được đền đáp ân huệ.',
        damage: 42000
      },
      {
        id: 'q22_2',
        question: 'Tín vật mà Vũ Nương gửi Phan Lang đem về trần gian trao cho Trương Sinh là gì?',
        options: ['Một chiếc hoa vàng cùng lời dặn lập đàn giải oan ở bến sông', 'Một bức thư viết bằng mực son', 'Một chiếc trâm cài tóc bằng ngọc bích', 'Chiếc hài thêu hoa sen'],
        correctIndex: 0,
        explanation: 'Vũ Nương gửi chiếc hoa vàng bảo Trương Sinh lập đàn tràng giải oan bên bến sông Hoàng Giang thì nàng sẽ hiện về.',
        damage: 42000
      },
      {
        id: 'q22_3',
        question: 'Nhân vật Phan Lang đóng vai trò gì trong kết cấu truyện "Chuyện người con gái Nam Xương"?',
        options: ['Là mắt xích kết nối giữa cõi trần và cõi kỳ ảo, giúp mở nút hóa giải nỗi oan của Vũ Nương', 'Là nhân vật phản diện xúi giục Trương Sinh', 'Là người thay thế Trương Sinh nuôi dạy bé Đản', 'Là quan tòa xử án'],
        correctIndex: 0,
        explanation: 'Phan Lang là nhân vật chứng kiến cuộc sống thần tiên của Vũ Nương và đưa thông điệp về trần thế, tạo nên kết thúc kỳ ảo giàu tính nhân văn.',
        damage: 41000
      }
    ]
  },
  {
    id: 23,
    order: 23,
    arenaName: 'Đấu trường 23: Điện Lưu Ly Nam Hải',
    bossName: 'Linh Phi',
    title: 'Phu Nhân Nam Hải Quyền Năng',
    regionId: 3,
    regionName: 'Cõi Kỳ Ảo Văn Học',
    maxHp: 128000,
    level: 23,
    difficulty: 'Khó',
    origin: 'Truyện người con gái Nam Xương (Truyền kỳ mạn lục)',
    biography: 'Vợ của chúa tể biển Nam Hải, người có tấm lòng bao la thấu tỏ mọi nỗi oan khiên cõi trần. Bà đã cứu vớt Vũ Nương, che chở và phong cho nàng làm tiên nữ quản coi hoa cỏ cõi thủy cung.',
    context: 'Thủy điện lấp lánh ánh trân châu, muôn loài thủy tộc uy nghiêm chầu phục trong hào quang xanh ngọc.',
    personality: 'Cao quý, ân uy phân minh, thấu tình đạt lý và trọng nghĩa trả ơn.',
    skills: ['Nam Hải Triều Âm', 'Hải Tộc Linh Uy', 'Xoa Dịu Oan Hồn'],
    avatarStyle: { symbol: '💎', badge: 'Linh Phi Nam Hải', accentColor: '#2563EB' },
    theme: {
      primary: '#1D4ED8',
      secondary: '#1E40AF',
      border: 'border-blue-500',
      glow: 'shadow-blue-500/30',
      text: 'text-blue-400',
      bgGradient: 'from-blue-950 via-slate-900 to-cyan-950',
      iconBg: 'bg-blue-600'
    },
    rewardExp: 1900,
    rewardBadge: 'Hải Châu Chi Bảo',
    rewardTitle: 'Bảo Hộ Oan Khiên',
    questions: [
      {
        id: 'q23_1',
        question: 'Linh Phi đã mở yến tiệc dưới thủy cung để thiết đãi ai?',
        options: ['Thiết đãi Phan Lang vì nhớ ơn cứu mạng năm xưa', 'Thiết đãi sứ giả Ngọc Hoàng giáng trần', 'Thiết đãi Trương Sinh đến tạ lỗi', 'Thiết đãi các loài thủy tộc'],
        correctIndex: 0,
        explanation: 'Linh Phi nhớ ơn Phan Lang phóng sinh rùa mai xanh năm xưa nên tổ chức yến tiệc linh đình tiếp đón chàng.',
        damage: 43000
      },
      {
        id: 'q23_2',
        question: 'Yếu tố kỳ ảo thủy cung trong tác phẩm của Nguyễn Dữ phản ánh ảnh hưởng của tôn giáo/tư tưởng nào?',
        options: ['Đạo giáo (Đạo thần tiên) kết hợp với Phật giáo từ bi cứu khổ', 'Nho giáo độc tôn', 'Văn hóa phương Tây', 'Tín ngưỡng nguyên thủy'],
        correctIndex: 0,
        explanation: 'Cảnh giới thủy cung thần tiên, thoát tục cứu độ con người là nét đặc trưng ảnh hưởng sâu sắc của Đạo giáo thời trung đại.',
        damage: 43000
      },
      {
        id: 'q23_3',
        question: 'Bộ sách "Truyền kỳ mạn lục" của Nguyễn Dữ gồm có tất cả bao nhiêu thiên truyện kỳ ảo?',
        options: ['20 thiên truyện', '10 thiên truyện', '50 thiên truyện', '100 thiên truyện'],
        correctIndex: 0,
        explanation: 'Bộ kiệt tác "Truyền kỳ mạn lục" (Ghi chép tản mạn những điều kỳ lạ lưu truyền) gồm chính xác 20 thiên truyện.',
        damage: 42000
      }
    ]
  },
  {
    id: 24,
    order: 24,
    arenaName: 'Đấu trường 24: Gian Nhà Tối Trương Sinh',
    bossName: 'Trương Sinh',
    title: 'Thư Sinh Đa Nghi Tỉnh Ngộ',
    regionId: 3,
    regionName: 'Cõi Kỳ Ảo Văn Học',
    maxHp: 130000,
    level: 24,
    difficulty: 'Khó',
    origin: 'Truyện người con gái Nam Xương (Truyền kỳ mạn lục)',
    biography: 'Chàng thư sinh con nhà hào phú ít học, tính tình đa nghi, vì lời nói ngây thơ của con mà mù quáng ghen tuông đẩy vợ vào bước đường cùng. Nỗi ân hận muộn màng bên đàn tràng giải oan là bài học đắt giá muôn thuở.',
    context: 'Gian nhà tranh quạnh quẽ ánh đèn leo lét, tiếng than khóc nghẹn ngào bên bờ sông sương giăng.',
    personality: 'Gia trưởng, nóng nảy, đa nghi nhưng biết ăn năn hối lỗi muộn màng.',
    skills: ['Nghi Tâm Trận Pháp', 'Đàn Tràng Hối Lỗi', 'Hư Không Ảnh Tiễn'],
    avatarStyle: { symbol: '🕯️', badge: 'Hối Tội Khắc Tâm', accentColor: '#EAB308' },
    theme: {
      primary: '#CA8A04',
      secondary: '#A16207',
      border: 'border-yellow-500',
      glow: 'shadow-yellow-500/30',
      text: 'text-yellow-400',
      bgGradient: 'from-amber-950 via-slate-900 to-zinc-950',
      iconBg: 'bg-yellow-600'
    },
    rewardExp: 2000,
    rewardBadge: 'Tấm Gương Tỉnh Thức',
    rewardTitle: 'Phá Vỡ Nghi Tâm',
    questions: [
      {
        id: 'q24_1',
        question: 'Bé Đản đã nói câu gì ngây thơ khiến Trương Sinh nổi cơn ghen tuông lôi đình đuổi vợ đi?',
        options: ['"Ô hay, thế ra ông cũng là cha tôi ư? Cha tôi tối nào cũng đến, mẹ Đản đi cũng đi, mẹ Đản ngồi cũng ngồi"', '"Mẹ con bảo mẹ sắp lấy chồng mới"', '"Con có hai người cha"', '"Cha không thương mẹ con con"'],
        correctIndex: 0,
        explanation: 'Lời ngây thơ của con trẻ khiến Trương Sinh đinh ninh vợ thất tiết mà không suy xét ngọn ngành.',
        damage: 44000
      },
      {
        id: 'q24_2',
        question: 'Ai là người chịu thiệt thòi lớn nhất trong bi kịch hôn nhân giữa Trương Sinh và Vũ Nương?',
        options: ['Nàng Vũ Nương và đứa con thơ bé Đản', 'Chỉ riêng Trương Sinh', 'Bà mẹ Trương Sinh', 'Hàng xóm láng giềng'],
        correctIndex: 0,
        explanation: 'Vũ Nương phải lấy cái chết minh oan, bé Đản mất mẹ từ thơ ấu; đó là bản cáo trạng tố cáo sự bất công của chế độ phụ quyền phong kiến.',
        damage: 43000
      },
      {
        id: 'q24_3',
        question: 'Tập quán "lập đàn tràng giải oan" bên bờ sông Hoàng Giang diễn ra trong thời gian bao lâu?',
        options: ['Ba ngày ba đêm', 'Một ngày một đêm', 'Bảy ngày bảy đêm', 'Một tháng'],
        correctIndex: 0,
        explanation: 'Trương Sinh theo lời dặn lập đàn tràng giải oan suốt ba ngày ba đêm bên bến sông.',
        damage: 43000
      }
    ]
  },
  {
    id: 25,
    order: 25,
    arenaName: 'Đấu trường 25: Lửa Thiêu Đền Tà Tản Viên',
    bossName: 'Ngô Tử Văn',
    title: 'Kẻ Sĩ Cương Trực Đền Tản Viên',
    regionId: 3,
    regionName: 'Cõi Kỳ Ảo Văn Học',
    maxHp: 132000,
    level: 25,
    difficulty: 'Khó',
    origin: 'Chuyện chức phán sự đền Tản Viên (Trích "Truyền kỳ mạn lục" của Nguyễn Dữ)',
    biography: 'Chàng nho sĩ tên Soạn khảng khái, chính trực, thấy ngôi đền tà ma của tên tướng giặc họ Thôi quấy nhiễu dân gian liền tắm gội sạch sẽ rồi châm lửa đốt đền. Chàng dũng cảm xuống Minh ty đối chất giành lại công lý và được phong làm Phán sự đền Tản Viên.',
    context: 'Trước điện Diêm Vương âm u ghê rợn, Ngô Tử Văn ngẩng cao đầu dõng dạc tranh biện với lời lẽ đanh thép.',
    personality: 'Khẳng khái, cương trực, dũng cảm, ghét gian tà và vì dân vì nước.',
    skills: ['Hỏa Thiêu Tà Miếu', 'Minh Ty Luận Tội', 'Phán Sự Chính Khí'],
    avatarStyle: { symbol: '🔥', badge: 'Kẻ Sĩ Chính Khí', accentColor: '#EF4444' },
    theme: {
      primary: '#DC2626',
      secondary: '#B91C1C',
      border: 'border-red-500',
      glow: 'shadow-red-500/30',
      text: 'text-red-400',
      bgGradient: 'from-red-950 via-slate-900 to-indigo-950',
      iconBg: 'bg-red-600'
    },
    rewardExp: 2100,
    rewardBadge: 'Phù Hiệu Phán Sự',
    rewardTitle: 'Chính Khí Ngút Trời',
    questions: [
      {
        id: 'q25_1',
        question: 'Hành động mở đầu của Ngô Tử Văn thể hiện tính cách khảng khái, cương trực của chàng là gì?',
        options: ['Tắm gội sạch sẽ, khấn trời rồi châm lửa đốt ngôi đền tà ma của tướng giặc họ Thôi', 'Viết đơn kiện lên triều đình', 'Bỏ trốn khỏi vùng đất tà ma', 'Đến lạy van xin tha thứ'],
        correctIndex: 0,
        explanation: 'Ngô Tử Văn tức giận trước sự hoành hành của tên giặc quấy dân hại vật nên đã quả cảm đốt trụi đền tà.',
        damage: 45000
      },
      {
        id: 'q25_2',
        question: 'Chức vị cao quý mà Thổ thần tiến cử Tử Văn đảm nhận sau khi chiến thắng dưới cõi âm là gì?',
        options: ['Chức Phán sự đền Tản Viên', 'Chức Tri phủ thành Đông Triều', 'Chức Diêm La Vương cõi âm', 'Chức Tướng quân biên ải'],
        correctIndex: 0,
        explanation: 'Chức Phán sự giữ cán cân công lý, thưởng phạt nghiêm minh tại đền Tản Viên linh thiêng.',
        damage: 44000
      },
      {
        id: 'q25_3',
        question: 'Ý nghĩa tư tưởng sâu sắc của tác phẩm "Chuyện chức phán sự đền Tản Viên" là gì?',
        options: ['Ca ngợi tinh thần khẳng khái, dũng cảm chống gian tà và khẳng định công lý, chính nghĩa tất thắng', 'Khuyên người dân không nên tin vào thần linh', 'Miêu tả thế giới địa ngục đáng sợ', 'Ca ngợi cuộc sống ẩn dật xa lánh trần đời'],
        correctIndex: 0,
        explanation: 'Tác phẩm ngợi ca khí tiết kẻ sĩ chân chính, khẳng định chân lý: Cái thiện, cái chính nghĩa luôn chiến thắng gian tà, hung tàn.',
        damage: 43000
      }
    ]
  },
  {
    id: 26,
    order: 26,
    arenaName: 'Đấu trường 26: U Hồn Tướng Bắc',
    bossName: 'Hồn Ma Tướng Giặc',
    title: 'Hồn Ma Bách Hộ Họ Thôi Chiếm Đền',
    regionId: 3,
    regionName: 'Cõi Kỳ Ảo Văn Học',
    maxHp: 134000,
    level: 26,
    difficulty: 'Rất khó',
    origin: 'Chuyện chức phán sự đền Tản Viên (Truyền kỳ mạn lục)',
    biography: 'Tên tướng giặc phương Bắc bại trận chết ở chân núi Ba Vì hóa làm yêu ma quấy nhiễu bách tính, chiếm giữ đền miếu của Thổ công chân chính. Hắn dùng lời giảo quyệt vu cáo Tử Văn dưới cõi âm nhưng bị vạch trần tội ác.',
    context: 'Âm ti địa phủ quỷ sứ vây quanh rùng rợn, làn khói xám mờ ảo bao phủ linh hồn tà ác.',
    personality: 'Gian giảo, tham lam, cậy thế lừa gạt thần linh và quấy nhiễu dân gian.',
    skills: ['Oan Hồn Thao Túng', 'Khống Chế Tà Miếu', 'Quỷ Khốc Minh Ty'],
    avatarStyle: { symbol: '👻', badge: 'U Hồn Bại Tướng', accentColor: '#6B7280' },
    theme: {
      primary: '#4B5563',
      secondary: '#374151',
      border: 'border-slate-500',
      glow: 'shadow-slate-500/30',
      text: 'text-slate-400',
      bgGradient: 'from-slate-950 via-zinc-900 to-indigo-950',
      iconBg: 'bg-slate-700'
    },
    rewardExp: 2200,
    rewardBadge: 'Trảm Tà Linh Phù',
    rewardTitle: 'Trừ Gian Diệt Ác',
    questions: [
      {
        id: 'q26_1',
        question: 'Tên tướng giặc bại trận họ Thôi vốn là viên quan tướng thuộc triều đại phương Bắc nào?',
        options: ['Viên bách hộ họ Thôi thời nhà Minh xâm lược nước ta', 'Thời nhà Tống', 'Thời nhà Hán', 'Thời nhà Đường'],
        correctIndex: 0,
        explanation: 'Hắn là viên tướng giặc thời Minh bị tướng Mộc Thạnh bỏ rơi, chết đói ở gần núi Ba Vì hóa thành yêu quái.',
        damage: 46000
      },
      {
        id: 'q26_2',
        question: 'Hình phạt thích đáng mà Diêm Vương đã giáng xuống đầu tên tướng giặc họ Thôi là gì?',
        options: ['Bị lồng sắt chụp vào đầu, cùm khóa vào ngục Cửu U không bao giờ thoát', 'Được phóng sinh làm kiếp trâu ngựa', 'Bị lưu đày biên ải xa xôi', 'Bị đày xuống biển Đông làm mồi cho cá'],
        correctIndex: 0,
        explanation: 'Diêm Vương nghiêm trị: Cho quỷ lồng sắt chụp vào đầu, khóa chân nhốt vào ngục Cửu U trừng trị muôn đời.',
        damage: 45000
      },
      {
        id: 'q26_3',
        question: 'Chi tiết tên tướng giặc phương Bắc chiếm đền của thần bản thổ Việt Nam phản ánh hiện thực lịch sử nào?',
        options: ['Âm mưu đồng hóa văn hóa và tội ác xâm lăng tàn bạo của giặc ngoại xâm đối với nhân dân ta', 'Sự phát triển của đạo giáo Trung Hoa', 'Chiến tranh thương mại giữa các vùng miền', 'Mâu thuẫn tôn giáo thuần túy'],
        correctIndex: 0,
        explanation: 'Tác giả Nguyễn Dữ kín đáo vạch trần dã tâm xâm lược, cướp đất, cướp đền miếu và hủy hoại văn hóa bản địa của giặc phong kiến phương Bắc.',
        damage: 43000
      }
    ]
  },
  {
    id: 27,
    order: 27,
    arenaName: 'Đấu trường 27: Cửa Đền Thổ Thần',
    bossName: 'Thổ Công Minh Triết',
    title: 'Thần Linh Bản Địa Trượng Nghĩa',
    regionId: 3,
    regionName: 'Cõi Kỳ Ảo Văn Học',
    maxHp: 136000,
    level: 27,
    difficulty: 'Rất khó',
    origin: 'Chuyện chức phán sự đền Tản Viên (Truyền kỳ mạn lục)',
    biography: 'Vị thần thổ địa hiền lành đức độ, từng làm quan phụ tá thời An Dương Vương hy sinh vì nước, bị hồn ma tướng giặc ức hiếp đuổi đi. Nhờ lòng dũng cảm của Tử Văn, vị thần đã bày mưu chỉ cách vạch trần gian tà.',
    context: 'Cây đa cổ thụ bên ngôi đền nhỏ nghi ngút khói trầm, ánh mắt thần hiền từ mà kiên nghị.',
    personality: 'Nhẫn nhịn, khiêm nhường, yêu chuộng sự thật và biết ơn sâu sắc.',
    skills: ['Thổ Địa Linh Trượng', 'Tản Viên Mật Báo', 'Công Lý Khôi Phục'],
    avatarStyle: { symbol: '🌿', badge: 'Thổ Thần Bản Địa', accentColor: '#10B981' },
    theme: {
      primary: '#059669',
      secondary: '#047857',
      border: 'border-emerald-500',
      glow: 'shadow-emerald-500/30',
      text: 'text-emerald-400',
      bgGradient: 'from-emerald-950 via-slate-900 to-green-950',
      iconBg: 'bg-emerald-600'
    },
    rewardExp: 2300,
    rewardBadge: 'Ấn Tín Thổ Thần',
    rewardTitle: 'Bảo Vệ Đất Quê',
    questions: [
      {
        id: 'q27_1',
        question: 'Thổ công đã hiện lên gặp Ngô Tử Văn trong hoàn cảnh nào?',
        options: ['Khi Tử Văn bị sốt rét sau khi đốt đền, thần hóa làm ông lão áo vải đến cảm ơn và chỉ đường', 'Khi Tử Văn đang chém cây trong rừng', 'Khi Tử Văn đang nằm ngủ trên võng', 'Khi Tử Văn đi thuyền trên sông'],
        correctIndex: 0,
        explanation: 'Thổ công hiện lên trong hình dáng một cụ già khoan thai, râu tóc bạc phơ để báo cho Tử Văn biết mưu đồ kiện cáo của tên tướng giặc.',
        damage: 46000
      },
      {
        id: 'q27_2',
        question: 'Lời khuyên quan trọng nhất mà Thổ thần dặn Tử Văn khi xuống Minh ty đối chất là gì?',
        options: ['Cứ y như lời thần dặn mà tâu bày dứt khoát, nếu Diêm Vương nghi ngờ thì xin lấy cây hòm thư tại đền Tản Viên làm chứng cớ', 'Nên im lặng chờ đợi', 'Xin Diêm Vương tha thứ tội đốt đền', 'Cung cấp vàng bạc cõi âm'],
        correctIndex: 0,
        explanation: 'Thổ thần dặn Tử Văn xin Diêm Vương cho sai người đến đền Tản Viên lấy hòm thư làm bằng chứng xác thực.',
        damage: 45000
      },
      {
        id: 'q27_3',
        question: 'Tại sao Thổ thần một vị thần linh lại phải nhẫn nhịn chịu đựng sự lấn lướt của tên tướng giặc?',
        options: ['Vì các đền miếu lân cận ăn đút lót bao che cho tên tướng giặc hung hãn', 'Vì thần sợ chết', 'Vì thần không có phép thuật', 'Vì luật cõi âm quy định như vậy'],
        correctIndex: 0,
        explanation: 'Tác giả mượn lời Thổ thần phê phán thói tệ quan lại cõi trần: Tham nhũng, ăn của đút lót khiến kẻ yếu thế bị ức hiếp oan uổng.',
        damage: 45000
      }
    ]
  },
  {
    id: 28,
    order: 28,
    arenaName: 'Đấu trường 28: Điện Cửu U Minh Ty',
    bossName: 'Diêm Vương Phán Xét',
    title: 'Minh Quan Cõi Âm Thanh Minh Lẽ Phải',
    regionId: 3,
    regionName: 'Cõi Kỳ Ảo Văn Học',
    maxHp: 138000,
    level: 28,
    difficulty: 'Rất khó',
    origin: 'Chuyện chức phán sự đền Tản Viên (Truyền kỳ mạn lục)',
    biography: 'Chúa tể cõi âm cai quản sổ sinh tử mười hai điện. Ban đầu bị lời giảo quyệt của tên tướng giặc che mắt, nhưng trước lập luận sắc bén và chứng cớ đanh thép của Tử Văn, ngài đã tỉnh ngộ xử đúng người đúng tội.',
    context: 'Điện Cửu U mây đen vần vũ sấm chớp rền vang, bàn án thư soi rọi chiếc gương nghiệp đài chiếu rọi muôn tội ác.',
    personality: 'Uy nghiêm, nghiêm khắc, trọng chứng cứ và kiên quyết trừng trị gian trá.',
    skills: ['Nghiệp Kính Chiếu Minh', 'Sinh Tử Phán Quyết', 'U Minh Lôi Đình'],
    avatarStyle: { symbol: '⚖️', badge: 'Minh Ty Trọng Phán', accentColor: '#8B5CF6' },
    theme: {
      primary: '#7C3AED',
      secondary: '#6D28D9',
      border: 'border-purple-500',
      glow: 'shadow-purple-500/30',
      text: 'text-purple-400',
      bgGradient: 'from-purple-950 via-slate-900 to-slate-950',
      iconBg: 'bg-purple-600'
    },
    rewardExp: 2400,
    rewardBadge: 'Cân Công Lý Minh Ty',
    rewardTitle: 'Chân Lý Rạng Ngời',
    questions: [
      {
        id: 'q28_1',
        question: 'Thái độ của Ngô Tử Văn trước mặt Diêm Vương cõi âm được miêu tả như thế nào?',
        options: ['Cứng cỏi, không chịu nhún nhường, lời lẽ đanh thép biện bạch rõ ràng', 'Run rẩy van xin tha mạng', 'Im lặng cúi đầu nhận tội', 'Nổi giận đập phá công đường cõi âm'],
        correctIndex: 0,
        explanation: 'Trước uy quyền tối thượng ghê rợn cõi âm, Tử Văn vẫn hiên ngang đứng thẳng, dõng dạc bảo vệ chân lý đến cùng.',
        damage: 47000
      },
      {
        id: 'q28_2',
        question: 'Sau khi xác minh rõ chứng cứ từ hòm thư đền Tản Viên, Diêm Vương đã quát mắng tên tướng giặc điều gì?',
        options: ['"Mày là kẻ giặc bại trận, lừa dối thần linh, cướp miếu đền bách tính, tội ác tày trời!"', '"Ngươi hãy mau về quê cũ"', '"Ngươi hãy chia đền miếu cho Thổ công"', '"Ngươi hãy dâng vàng bạc chuộc tội"'],
        correctIndex: 0,
        explanation: 'Diêm Vương nhận ra sự thật, tức giận trừng phạt kẻ dối trá lộng hành.',
        damage: 46000
      },
      {
        id: 'q28_3',
        question: 'Chi tiết "Diêm Vương trách mắng các quan cai ngục ăn hối lộ" nhằm châm biếm điều gì trong xã hội thực tế?',
        options: ['Phê phán hiện thực thối nát, tham nhũng của quan lại triều đình thời bấy giờ', 'Phê phán các vị thần linh', 'Chỉ trích hệ thống nhà tù phong kiến', 'Khuyên dân chúng không nên đút lót'],
        correctIndex: 0,
        explanation: 'Nhà văn Nguyễn Dữ mượn chuyện cõi âm để phê phán thói đục khoét, quan liêu, ăn của đút của tầng lớp quan lại thối nát thời Lê - Mạc.',
        damage: 45000
      }
    ]
  },
  {
    id: 29,
    order: 29,
    arenaName: 'Đấu trường 29: Thư Phòng Trúc Lâm',
    bossName: 'Kẻ Sĩ Truyền Kỳ',
    title: 'Hình Tượng Trí Thức Trung Đại Khí Phách',
    regionId: 3,
    regionName: 'Cõi Kỳ Ảo Văn Học',
    maxHp: 140000,
    level: 29,
    difficulty: 'Rất khó',
    origin: 'Cảm hứng từ hình tượng các nhân vật nhà nho trung nghĩa trong tác phẩm Nguyễn Dữ',
    biography: 'Đại diện cho tầng lớp trí thức thanh cao, giữ gìn đạo đức truyền thống và khí phách dân tộc trước những nhiễu nhương của thời cuộc, dùng ngòi bút và lòng quả cảm bảo vệ phẩm giá con người.',
    context: 'Thư phòng bên đồi trúc gió reo xào xạc, nghiên mực thơm nồng bừng cháy ngọn bút sắt sắc bén.',
    personality: 'Khẳng khái, thanh bạch, trí dũng song toàn và tận tâm vì đạo nghĩa.',
    skills: ['Bút Thiềm Khí Phách', 'Hạo Nhiên Chính Khí', 'Mạn Lục Thần Bút'],
    avatarStyle: { symbol: '🖋️', badge: 'Bút Thép Kẻ Sĩ', accentColor: '#EC4899' },
    theme: {
      primary: '#DB2777',
      secondary: '#BE185D',
      border: 'border-pink-500',
      glow: 'shadow-pink-500/30',
      text: 'text-pink-400',
      bgGradient: 'from-pink-950 via-slate-900 to-rose-950',
      iconBg: 'bg-pink-600'
    },
    rewardExp: 2500,
    rewardBadge: 'Ngòi Bút Mạn Lục',
    rewardTitle: 'Kẻ Sĩ Đại Nghĩa',
    questions: [
      {
        id: 'q29_1',
        question: 'Đặc trưng thể loại nổi bật nhất của "Truyền kỳ" trong văn học trung đại Việt Nam là gì?',
        options: ['Dùng yếu tố kỳ ảo, hoang đường làm phương thức nghệ thuật để phản ánh hiện thực đời sống và thể hiện quan niệm nhân sinh', 'Chỉ kể về các câu chuyện tình yêu lãng mạn', 'Chỉ ghi chép lịch sử chân thực từng ngày', 'Chuyên về thơ ca trữ tình có nhạc đệm'],
        correctIndex: 0,
        explanation: 'Cốt lõi của truyền kỳ là mượn cái kỳ để nói cái thực, dùng thế giới thần tiên ma quái để phản ánh số phận con người và khát vọng công lý.',
        damage: 47000
      },
      {
        id: 'q29_2',
        question: 'Tác giả Nguyễn Dữ sau khi đỗ đạt và làm quan một thời gian ngắn đã có quyết định nổi tiếng nào?',
        options: ['Từ quan về quê ẩn dật nuôi mẹ già, dành trọn tâm huyết viết sách', 'Xin đi sứ sang phương Bắc', 'Tham gia khởi nghĩa nông dân', 'Mở trường đào tạo võ tướng'],
        correctIndex: 0,
        explanation: 'Nguyễn Dữ noi gương người thầy Chu Văn An, bất mãn trước thời cuộc loạn lạc nên đã sớm treo ấn từ quan về phụng dưỡng mẹ già và viết tác phẩm.',
        damage: 47000
      },
      {
        id: 'q29_3',
        question: 'Nhận định "Một thiên cổ kỳ bút" trong lịch sử văn học Việt Nam được danh sĩ Vũ Khâm Lân dùng để ca ngợi tác phẩm nào?',
        options: ['Truyền kỳ mạn lục của Nguyễn Dữ', 'Truyện Kiều của Nguyễn Du', 'Lục Vân Tiên của Nguyễn Đình Chiểu', 'Chinh phụ ngâm khúc'],
        correctIndex: 0,
        explanation: '"Truyền kỳ mạn lục" được tiền nhân ca tụng là áng văn kỳ lạ nghìn đời ("thiên cổ kỳ bút").',
        damage: 46000
      }
    ]
  },
  {
    id: 30,
    order: 30,
    arenaName: 'Đấu trường 30: Động Tiên Huyền Ảo',
    bossName: 'Đạo Sĩ Thần Thông',
    title: 'Nhân Vật Kỳ Ảo Truyền Kỳ',
    regionId: 3,
    regionName: 'Cõi Kỳ Ảo Văn Học',
    maxHp: 142000,
    level: 30,
    difficulty: 'Huyền thoại',
    origin: 'Nhân vật đạo sĩ có phép thần thông trong truyện "Từ Thức lấy vợ tiên" (Truyền kỳ mạn lục)',
    biography: 'Vị đạo sĩ ngự chốn động tiên bồng bềnh mây trắng, thấu suốt lẽ sinh tử trần gian, mở ra cánh cửa giao hòa giữa cõi mộng thần tiên và thực tại trần thế, gửi gắm triết lý sâu xa về hạnh phúc và thời gian.',
    context: 'Cửa động tiên lấp lánh thạch nhũ ngọc bích, hoa đào nở bốn mùa bên làn suối ngọc reo ca.',
    personality: 'Thoát tục, trầm tĩnh, minh triết và thấu thị vũ trụ.',
    skills: ['Bồng Lai Ảo Cảnh', 'Phù Chú Càn Khôn', 'Thời Gian Lưỡng Giới'],
    avatarStyle: { symbol: '🔮', badge: 'Đạo Sĩ Huyền Không', accentColor: '#A855F7' },
    theme: {
      primary: '#9333EA',
      secondary: '#7E22CE',
      border: 'border-purple-500',
      glow: 'shadow-purple-500/40',
      text: 'text-purple-300',
      bgGradient: 'from-purple-950 via-slate-900 to-indigo-950',
      iconBg: 'bg-purple-600'
    },
    rewardExp: 2700,
    rewardBadge: 'Phù Đào Tiên Động',
    rewardTitle: 'Thấu Suốt Càn Khôn',
    questions: [
      {
        id: 'q30_1',
        question: 'Trong truyện "Từ Thức lấy vợ tiên", khi chàng Từ Thức trở về trần gian thăm quê sau một năm ở cõi tiên thì điều kỳ lạ gì đã xảy ra?',
        options: ['Ở trần gian đã trôi qua gần ba trăm năm, cảnh vật và người quen cũ đã hoàn toàn đổi thay', 'Trần gian vẫn như cũ mới qua ba ngày', 'Quê hương chàng chìm dưới đáy biển', 'Mọi người quên hết tên chàng'],
        correctIndex: 0,
        explanation: '"Một ngày cõi tiên bằng cả trăm năm cõi trần" - bài học nhân sinh sâu sắc: Quê hương, người thân nơi trần thế là bến đỗ đích thực của đời người.',
        damage: 48000
      },
      {
        id: 'q30_2',
        question: 'Hành động cởi áo bọc hoa cứu người thiếu nữ trong hội hoa của Từ Thức thể hiện nét đẹp gì?',
        options: ['Lòng nghĩa hiệp, bao dung, sẵn sàng hy sinh lợi ích bản thân để cứu người khác', 'Sự phô trương của công tử giàu sang', 'Muốn lấy lòng quan lại địa phương', 'Sự ham thích hoa cỏ kỳ lạ'],
        correctIndex: 0,
        explanation: 'Từ Thức không ngần ngại cởi chiếc áo cẩm bào quý giá đền cho chùa để chuộc lỗi cho nàng Giáng Hương.',
        damage: 47000
      },
      {
        id: 'q30_3',
        question: 'Địa danh "Động Từ Thức" gắn liền với truyền thuyết nổi tiếng này hiện nay nằm ở huyện nào của tỉnh Thanh Hóa?',
        options: ['Huyện Nga Sơn', 'Huyện Tĩnh Gia', 'Huyện Hà Trung', 'Huyện Hậu Lộc'],
        correctIndex: 0,
        explanation: 'Động Từ Thức (còn gọi là động Bích Đào) nằm tại xã Nga Thiện, huyện Nga Sơn, tỉnh Thanh Hóa.',
        damage: 47000
      }
    ]
  },

  // ==========================================
  // VÙNG 4: LINH GIỚI VIỆT NAM (31 - 40)
  // (Sáng tạo dựa trên tín ngưỡng & văn hóa dân gian)
  // ==========================================
  {
    id: 31,
    order: 31,
    arenaName: 'Đấu trường 31: Sông Hồng Cuộn Sóng',
    bossName: 'Linh Long',
    title: 'Thần Rồng Phù Sa Bảo Hộ Đất Việt',
    regionId: 4,
    regionName: 'Linh Giới Việt Nam',
    maxHp: 143000,
    level: 31,
    difficulty: 'Rất khó',
    origin: 'Hình tượng Rồng thời Lý - Trần và tín ngưỡng thủy thần sông Hồng (Sáng tạo văn hóa)',
    biography: 'Thần rồng thân uốn khúc mềm mại như dải mây lụa, vẫy đuôi đắp bồi từng bãi phù sa màu mỡ cho đồng bằng sông Hồng, đem lại mùa màng bội thu cho xóm làng trù phú.',
    context: 'Dòng sông Hồng cuồn cuộn đỏ rực phù sa lúc hoàng hôn buông xuống, vầng sáng rồng vàng uốn lượn uy dũng.',
    personality: 'Hùng vĩ, hiền hòa, bảo hộ người nông dân và dồi dào sức sống.',
    skills: ['Hồng Hà Phù Sa', 'Thanh Long Phục Thủy', 'Lạc Hồng Ba Đào'],
    avatarStyle: { symbol: '🐲', badge: 'Linh Long Sông Hồng', accentColor: '#EF4444' },
    theme: {
      primary: '#DC2626',
      secondary: '#B91C1C',
      border: 'border-red-500',
      glow: 'shadow-red-500/30',
      text: 'text-red-400',
      bgGradient: 'from-red-950 via-slate-900 to-amber-950',
      iconBg: 'bg-red-600'
    },
    rewardExp: 2800,
    rewardBadge: 'Long Lân Ngọc Phù',
    rewardTitle: 'Bảo Vệ Sông Mẹ',
    questions: [
      {
        id: 'q31_1',
        question: 'Hình tượng con rồng thời Lý trong mỹ thuật cổ Việt Nam có đặc điểm nổi bật nào phân biệt với rồng phương Bắc?',
        options: ['Thân dài uyển chuyển hình sin như dải lụa mềm, không vảy hoặc vảy chìm, đầu ngậm ngọc không có sừng dữ tợn', 'To bè dữ tợn, móng vuốt nhọn hoắt hung hãn', 'Có đôi cánh rộng giống rồng phương Tây', 'Đầu rắn đuôi bò'],
        correctIndex: 0,
        explanation: 'Rồng thời Lý mang vẻ đẹp thanh thoát, uốn lượn hiền hòa, thể hiện tinh thần nhân văn và độc lập dân tộc.',
        damage: 48000
      },
      {
        id: 'q31_2',
        question: 'Sông Hồng còn có những tên gọi cổ kính nào trong lịch sử văn hóa dân tộc?',
        options: ['Sông Nhị (Nhị Hà), sông Cái, Xích Đằng', 'Sông Tiền, sông Hậu', 'Sông Thu Bồn, sông Gianh', 'Sông Bến Hải, sông Thạch Hãn'],
        correctIndex: 0,
        explanation: 'Dân gian gọi sông Hồng là Sông Cái (sông mẹ lớn) hay Nhị Hà do hình dáng uốn quanh co.',
        damage: 48000
      },
      {
        id: 'q31_3',
        question: 'Nền văn minh đầu tiên của người Việt gắn liền với lưu vực châu thổ sông Hồng được gọi là nền văn minh gì?',
        options: ['Văn minh sông Hồng (Văn minh Đông Sơn)', 'Văn minh sông Nile', 'Văn minh Lưỡng Hà', 'Văn minh Maya'],
        correctIndex: 0,
        explanation: 'Văn minh sông Hồng với đỉnh cao là văn hóa Đông Sơn rực rỡ nghề đúc đồng và trồng trọt lúa nước.',
        damage: 47000
      }
    ]
  },
  {
    id: 32,
    order: 32,
    arenaName: 'Đấu trường 32: Đỉnh Lửa Hùng Vương',
    bossName: 'Hỏa Điểu',
    title: 'Chim Lửa Phương Nam Ánh Rạng',
    regionId: 4,
    regionName: 'Linh Giới Việt Nam',
    maxHp: 144000,
    level: 32,
    difficulty: 'Rất khó',
    origin: 'Cảm hứng từ hình tượng chim Lạc trên Trống đồng Đông Sơn (Sáng tạo văn hóa)',
    biography: 'Linh điểu mang đôi cánh lửa rực rỡ sải rộng trên bầu trời phương Nam nắng ấm, mang lại ánh sáng xua tan bóng đêm tà mị và truyền ngọn lửa nhiệt huyết cho thế hệ trẻ.',
    context: 'Đỉnh núi cao ngập tràn ánh nắng chói lọi, đôi cánh phượng lửa xòe rộng rực rỡ giữa tầng mây.',
    personality: 'Nhiệt huyết, kiêu hãnh, hướng tới ánh sáng và tự do.',
    skills: ['Hỏa Vũ Đông Sơn', 'Thiên Lạc Chi Dực', 'Liệt Hỏa Bất Diệt'],
    avatarStyle: { symbol: '🦅', badge: 'Chim Lạc Lửa', accentColor: '#F97316' },
    theme: {
      primary: '#EA580C',
      secondary: '#C2410C',
      border: 'border-orange-500',
      glow: 'shadow-orange-500/30',
      text: 'text-orange-400',
      bgGradient: 'from-orange-950 via-slate-900 to-red-950',
      iconBg: 'bg-orange-600'
    },
    rewardExp: 2900,
    rewardBadge: 'Lông Vũ Lửa Đỏ',
    rewardTitle: 'Ngọn Lửa Tri Thức',
    questions: [
      {
        id: 'q32_1',
        question: 'Hình tượng chim Lạc tung cánh trên mặt trống đồng Đông Sơn bay theo hướng nào?',
        options: ['Bay ngược chiều kim đồng hồ quanh vầng mặt trời trung tâm', 'Bay theo chiều kim đồng hồ', 'Bay thẳng lên phía trên', 'Bay lộn xộn không theo quy luật'],
        correctIndex: 0,
        explanation: 'Đoàn chim Lạc sải cánh bay ngược chiều kim đồng hồ quanh mặt trời 12 hoặc 14 tia, thể hiện quan niệm vũ trụ tuần hoàn của người Việt cổ.',
        damage: 48500
      },
      {
        id: 'q32_2',
        question: 'Ngôi trường trung học cơ sở thân yêu của chúng ta tọa lạc tại địa phương nào?',
        options: ['Trường THCS', 'Trường THCS Thăng Long', 'Trường THCS Chu Văn An', 'Trường THCS Lê Quý Đôn'],
        correctIndex: 0,
        explanation: 'Trường THCS – Mái trường thân yêu ươm mầm tài năng và tri thức số.',
        damage: 48000
      },
      {
        id: 'q32_3',
        question: 'Mặt trời ở tâm trống đồng Đông Sơn tượng trưng cho điều gì trong đời sống cư dân nông nghiệp lúa nước?',
        options: ['Nguồn năng lượng, ánh sáng mang lại mùa màng sinh sôi nảy nở', 'Sức mạnh hủy diệt của thiên nhiên', 'Vũ khí chiến đấu chống kẻ thù', 'Vị vua tối cao phương Bắc'],
        correctIndex: 0,
        explanation: 'Mặt trời là cội nguồn của ánh sáng và sự sống, gắn bó máu thịt với nông vụ cấy lúa nước.',
        damage: 47500
      }
    ]
  },
  {
    id: 33,
    order: 33,
    arenaName: 'Đấu trường 33: Rừng Tràm Đại Ngàn',
    bossName: 'Bạch Hổ Sơn Lâm',
    title: 'Chúa Tể Sơn Lâm Hộ Quốc',
    regionId: 4,
    regionName: 'Linh Giới Việt Nam',
    maxHp: 145000,
    level: 33,
    difficulty: 'Rất khó',
    origin: 'Tín ngưỡng thờ Hổ trong văn hóa dân gian Việt Nam (Ngũ Hổ tướng quân)',
    biography: 'Vị mãnh thú chốn rừng thiêng với bộ lông trắng ánh bạc uy nghiêm, gầm vang chấn động non ngàn, trấn giữ phương Tây xua đuổi tà khí và bảo vệ sự tôn nghiêm của cõi rừng già.',
    context: 'Rừng già đại ngàn sương mù giăng kín, tiếng gầm vang dội rền vang vách đá uy linh.',
    personality: 'Oai phong, quyết liệt, chính trực và dũng mãnh.',
    skills: ['Bạch Hổ Hống Thiên', 'Kim Trảo Toái Thạch', 'Sơn Lâm Trấn Uy'],
    avatarStyle: { symbol: '🐅', badge: 'Bạch Hổ Sơn Lâm', accentColor: '#E2E8F0' },
    theme: {
      primary: '#94A3B8',
      secondary: '#64748B',
      border: 'border-slate-400',
      glow: 'shadow-slate-400/30',
      text: 'text-slate-200',
      bgGradient: 'from-slate-950 via-zinc-900 to-stone-950',
      iconBg: 'bg-slate-600'
    },
    rewardExp: 3000,
    rewardBadge: 'Bạch Hổ Chiến Trảo',
    rewardTitle: 'Dũng Mãnh Trấn Sơn',
    questions: [
      {
        id: 'q33_1',
        question: 'Bức tranh dân gian Hàng Trống nổi tiếng nào miêu tả năm vị hổ thần với năm màu sắc trấn giữ năm phương?',
        options: ['Tranh "Ngũ Hổ" (Bạch, Hắc, Hoàng, Thanh, Xích)', 'Tranh "Đám cưới chuột"', 'Tranh "Gà đại cát"', 'Tranh "Lý ngư vọng nguyệt"'],
        correctIndex: 0,
        explanation: 'Tranh Ngũ Hổ Hàng Trống thể hiện triết lý Ngũ hành: Hoàng Hổ ở giữa, Bạch Hổ phương Tây, Thanh Hổ phương Đông, Xích Hổ phương Nam, Hắc Hổ phương Bắc.',
        damage: 49000
      },
      {
        id: 'q33_2',
        question: 'Trong tín ngưỡng dân gian, người Việt thờ Thần Hổ (ông Ba Mươi) nhằm mục đích gì?',
        options: ['Cầu mong sức mạnh trấn trạch, xua đuổi tà ma và thú dữ quấy phá bản làng', 'Mong muốn học cách săn bắn giỏi', 'Cầu tài lộc buôn bán động vật', 'Ghi nhớ công ơn nuôi dưỡng'],
        correctIndex: 0,
        explanation: 'Tục thờ Thần Hổ thể hiện sự kính sợ thiên nhiên và ước vọng được linh thú bảo vệ bình an cho gia đình, làng bản.',
        damage: 48500
      },
      {
        id: 'q33_3',
        question: 'Dãy núi đá vôi hùng vĩ nào được mệnh danh là "nóc nhà Đông Dương" nằm ở vùng Tây Bắc nước ta?',
        options: ['Dãy Hoàng Liên Sơn (đỉnh Fansipan)', 'Dãy Trường Sơn Bắc', 'Dãy Bạch Mã', 'Dãy Hoành Sơn'],
        correctIndex: 0,
        explanation: 'Đỉnh Fansipan cao 3.143m thuộc dãy Hoàng Liên Sơn là đỉnh núi cao nhất Việt Nam và Đông Dương.',
        damage: 47500
      }
    ]
  },
  {
    id: 34,
    order: 34,
    arenaName: 'Đấu trường 34: Hang Đá Thạch Nhũ',
    bossName: 'Thanh Xà',
    title: 'Linh Xà Ngàn Năm Thần Bí',
    regionId: 4,
    regionName: 'Linh Giới Việt Nam',
    maxHp: 145500,
    level: 34,
    difficulty: 'Rất khó',
    origin: 'Tín ngưỡng thần rắn sông nước trong văn hóa người Việt cổ',
    biography: 'Linh xà màu xanh ngọc bích ẩn thân dưới hang sâu núi đá vôi ngàn năm, hấp thu tinh hoa trời đất, thấu hiểu quy luật nước ngầm và bảo vệ mạch nước nguồn trong mát cho trần gian.',
    context: 'Hang đá sâu thăm thẳm thạch nhũ rủ bóng ngọc bích, tiếng giọt nước thánh thót ngân vang giữa tĩnh mịch.',
    personality: 'Khôn ngoan, thầm lặng, linh hoạt và thấu suốt phong thủy mạch ngầm.',
    skills: ['Bích Xà Triều Thủy', 'Linh Nhãn Minh Kính', 'Thạch Thất Mê Tung'],
    avatarStyle: { symbol: '🐍', badge: 'Thanh Xà Ngọc Mạch', accentColor: '#10B981' },
    theme: {
      primary: '#059669',
      secondary: '#047857',
      border: 'border-emerald-500',
      glow: 'shadow-emerald-500/30',
      text: 'text-emerald-400',
      bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
      iconBg: 'bg-emerald-600'
    },
    rewardExp: 3100,
    rewardBadge: 'Ngọc Xà Minh Châu',
    rewardTitle: 'Linh Hoạt Nhu Nhuận',
    questions: [
      {
        id: 'q34_1',
        question: 'Trong truyện cổ dân gian Việt Nam, hình tượng rắn thần thường gắn với vị trí cai quản yếu tố thiên nhiên nào?',
        options: ['Cai quản các nguồn nước ngầm, giếng sâu và sông hồ', 'Cai quản sấm sét', 'Cai quản ngọn lửa trên núi', 'Cai quản đồng ruộng lúa chín'],
        correctIndex: 0,
        explanation: 'Rắn trong tâm thức cư dân lúa nước gắn liền với thủy thần, đại diện cho dòng nước uốn lượn hiền hòa mang lại sự trù phú.',
        damage: 49000
      },
      {
        id: 'q34_2',
        question: 'Tỉnh Ninh Bình nổi tiếng với danh thắng di sản hỗn hợp thế giới nào có nhiều hang động nước kỳ ảo?',
        options: ['Quần thể danh thắng Tràng An - Tam Cốc', 'Vịnh Hạ Long', 'Vườn quốc gia Phong Nha - Kẻ Bàng', 'Cao nguyên đá Đồng Văn'],
        correctIndex: 0,
        explanation: 'Tràng An (Ninh Bình) là di sản thế giới kép đầu tiên ở Đông Nam Á với hệ thống hang động nước tuyệt mỹ.',
        damage: 48500
      },
      {
        id: 'q34_3',
        question: 'Nước Việt Nam ta có đường bờ biển dài bao nhiêu ki-lô-mét trải dài từ Bắc chí Nam?',
        options: ['Khoảng 3.260 km', 'Khoảng 1.500 km', 'Khoảng 5.000 km', 'Khoảng 2.000 km'],
        correctIndex: 0,
        explanation: 'Bờ biển Việt Nam hình chữ S uốn lượn dài trên 3.260 km ôm trọn biển Đông giàu tiềm năng.',
        damage: 48000
      }
    ]
  },
  {
    id: 35,
    order: 35,
    arenaName: 'Đấu trường 35: Hồ Gươm Soi Bóng',
    bossName: 'Huyền Quy',
    title: 'Rùa Thần Giữ Bảo Kiếm Thuận Thiên',
    regionId: 4,
    regionName: 'Linh Giới Việt Nam',
    maxHp: 146000,
    level: 35,
    difficulty: 'Rất khó',
    origin: 'Truyền thuyết Hồ Hoàn Kiếm và Rùa Thần Kim Quy (Lịch sử khởi nghĩa Lam Sơn)',
    biography: 'Rùa thần ngàn năm nổi lên giữa mặt hồ Tả Vọng đón nhận lại thanh gươm Thuận Thiên từ tay vua Lê Lợi sau khi đất nước sạch bóng giặc Minh, gửi gắm khát vọng muôn đời về thái bình thịnh trị.',
    context: 'Tháp Rùa rêu phong cổ kính giữa hồ nước trong xanh, tiếng chuông chùa Trấn Quốc ngân vang trong sương mai Hà Nội.',
    personality: 'Trầm mặc, thâm sâu, chứng nhân lịch sử và bảo hộ hòa bình.',
    skills: ['Thuận Thiên Kiếm Hồi', 'Huyền Quy Hộ Thuẫn', 'Hồ Gươm Linh Ba'],
    avatarStyle: { symbol: '🐢', badge: 'Rùa Thần Hồ Gươm', accentColor: '#14B8A6' },
    theme: {
      primary: '#0D9488',
      secondary: '#0F766E',
      border: 'border-teal-500',
      glow: 'shadow-teal-500/30',
      text: 'text-teal-400',
      bgGradient: 'from-teal-950 via-slate-900 to-cyan-950',
      iconBg: 'bg-teal-600'
    },
    rewardExp: 3200,
    rewardBadge: 'Thuận Thiên Kiếm Phù',
    rewardTitle: 'Hộ Vệ Hòa Bình',
    questions: [
      {
        id: 'q35_1',
        question: 'Tên gọi "Hồ Hoàn Kiếm" (Hồ Gươm) gắn liền với sự kiện lịch sử nào của dân tộc?',
        options: ['Vua Lê Thái Tổ (Lê Lợi) trả gươm báu Thuận Thiên cho Rùa Vàng sau thắng lợi chống giặc Minh', 'Lý Thường Kiệt đọc bản Tuyên ngôn Độc lập', 'Trần Hưng Đạo chiến thắng quân Nguyên Mông', 'Quang Trung đại phá quân Thanh'],
        correctIndex: 0,
        explanation: 'Sau khi dẹp yên giặc Minh, vua Lê Thái Tổ du thuyền trên hồ Tả Vọng, Rùa Vàng nổi lên đòi gươm và nhà vua trao trả lại.',
        damage: 49500
      },
      {
        id: 'q35_2',
        question: 'Thanh gươm thần mà Lê Lợi nhận được mang hai chữ thiêng liêng nào khắc trên lưỡi gươm?',
        options: ['Thuận Thiên (Thuận theo ý trời)', 'Nam Quốc', 'Bình Ngô', 'Đại Việt'],
        correctIndex: 0,
        explanation: 'Thanh gươm thần khắc hai chữ "Thuận Thiên" khẳng định cuộc khởi nghĩa Lam Sơn là chính nghĩa, hợp lòng trời thuận lòng dân.',
        damage: 48500
      },
      {
        id: 'q35_3',
        question: 'Ai là tác giả của áng thiên cổ hùng văn "Bình Ngô đại cáo" tổng kết mười năm kháng chiến chống quân Minh?',
        options: ['Nguyễn Trãi', 'Lê Lợi', 'Trần Hưng Đạo', 'Lý Thường Kiệt'],
        correctIndex: 0,
        explanation: 'Đại thi hào, danh nhân văn hóa thế giới Nguyễn Trãi thừa lệnh Lê Lợi viết "Bình Ngô đại cáo" năm 1428.',
        damage: 48000
      }
    ]
  },
  {
    id: 36,
    order: 36,
    arenaName: 'Đấu trường 36: Hào Khí Đông Sơn',
    bossName: 'Phượng Hoàng Lửa',
    title: 'Linh Điểu Tái Sinh Ánh Rạng',
    regionId: 4,
    regionName: 'Linh Giới Việt Nam',
    maxHp: 146500,
    level: 36,
    difficulty: 'Rất khó',
    origin: 'Hình tượng chim Phượng trong Tứ Linh (Long - Lân - Quy - Phụng) văn hóa Việt',
    biography: 'Loài chim cao quý trong Tứ Linh tượng trưng cho sự đức hạnh, duyên dáng và thịnh vượng. Mỗi khi tiếng hót vang lên là điềm lành báo hiệu đất nước thanh bình, nhân tài xuất hiện.',
    context: 'Cung đình tráng lệ hoa cúc nở rộ, bầu trời bừng sắc ráng hồng rực rỡ.',
    personality: 'Thanh cao, đoan trang, đem lại điềm lành và hy vọng sinh sôi.',
    skills: ['Phượng Minh Cửu Tiêu', 'Niết Bàn Tái Sinh', 'Tứ Linh Tụ Khí'],
    avatarStyle: { symbol: '🦚', badge: 'Phượng Hoàng Tứ Linh', accentColor: '#F59E0B' },
    theme: {
      primary: '#D97706',
      secondary: '#B45309',
      border: 'border-amber-500',
      glow: 'shadow-amber-500/30',
      text: 'text-amber-400',
      bgGradient: 'from-amber-950 via-slate-900 to-rose-950',
      iconBg: 'bg-amber-600'
    },
    rewardExp: 3300,
    rewardBadge: 'Phượng Vũ Hoàng Kim',
    rewardTitle: 'Đức Hạnh Tỏa Sáng',
    questions: [
      {
        id: 'q36_1',
        question: 'Trong bốn linh vật "Tứ Linh" của văn hóa truyền thống Việt Nam, con vật nào đứng thứ tư?',
        options: ['Phụng (Phượng Hoàng)', 'Long (Rồng)', 'Lân (Kỳ Lân)', 'Quy (Rùa)'],
        correctIndex: 0,
        explanation: 'Bộ Tứ Linh gồm bốn con vật linh thiêng: Long (Rồng), Lân (Kỳ Lân), Quy (Rùa) và Phụng (Phượng Hoàng).',
        damage: 49500
      },
      {
        id: 'q36_2',
        question: 'Trong kiến trúc cung đình triều Nguyễn ở Cố đô Huế, hình tượng Phượng hoàng thường được chạm khắc ở đâu?',
        options: ['Trên các cung điện của Hoàng Thái Hậu và Hoàng Hậu, trang phục phụ nữ hoàng gia', 'Trên ngai vàng của Hoàng đế', 'Dưới đáy hào thành', 'Tại các trại lính'],
        correctIndex: 0,
        explanation: 'Rồng tượng trưng cho đấng quân vương, còn Phượng hoàng tượng trưng cho sự đức hạnh, cao quý của bậc Mẫu nghi thiên hạ.',
        damage: 48500
      },
      {
        id: 'q36_3',
        question: 'Quần thể di tích Cố đô Huế được UNESCO công nhận là Di sản Văn hóa Thế giới vào năm nào?',
        options: ['Năm 1993', 'Năm 2000', 'Năm 1986', 'Năm 2010'],
        correctIndex: 0,
        explanation: 'Cố đô Huế là di sản văn hóa đầu tiên của Việt Nam được UNESCO vinh danh năm 1993.',
        damage: 48500
      }
    ]
  },
  {
    id: 37,
    order: 37,
    arenaName: 'Đấu trường 37: Rừng Nguyên Sinh Cúc Phương',
    bossName: 'Thần Rừng',
    title: 'Vị Chúa Bách Thảo Đại Ngàn',
    regionId: 4,
    regionName: 'Linh Giới Việt Nam',
    maxHp: 147000,
    level: 37,
    difficulty: 'Rất khó',
    origin: 'Tín ngưỡng Mẫu Thượng Ngàn (Nhạc phủ) trong văn hóa Việt Nam (Sáng tạo)',
    biography: 'Vị thần gìn giữ muôn loài thảo mộc, cây cổ thụ nghìn năm và muông thú chốn rừng già. Thần ban phát thảo dược cứu người và dạy dân gìn giữ màu xanh bền vững cho non sông.',
    context: 'Cây chò nghìn tuổi vươn tán rợp trời Cúc Phương, bướm trắng bay dập dờn trong nắng sớm lung linh.',
    personality: 'Bao dung, đôn hậu, nghiêm khắc bảo vệ môi trường sinh thái.',
    skills: ['Bách Thảo Sinh Sôi', 'Mộc Diệp Khiên Chắn', 'Đại Ngàn Thần Nhạc'],
    avatarStyle: { symbol: '🌲', badge: 'Thần Rừng Đại Ngàn', accentColor: '#16A34A' },
    theme: {
      primary: '#16A34A',
      secondary: '#15803D',
      border: 'border-green-500',
      glow: 'shadow-green-500/30',
      text: 'text-green-400',
      bgGradient: 'from-green-950 via-slate-900 to-emerald-950',
      iconBg: 'bg-green-600'
    },
    rewardExp: 3400,
    rewardBadge: 'Lá Chò Ngàn Năm',
    rewardTitle: 'Bảo Vệ Môi Trường',
    questions: [
      {
        id: 'q37_1',
        question: 'Vườn quốc gia đầu tiên được thành lập tại Việt Nam vào năm 1962 là vườn quốc gia nào?',
        options: ['Vườn quốc gia Cúc Phương (thuộc Ninh Bình, Thanh Hóa, Hòa Bình)', 'Vườn quốc gia Ba Vì', 'Vườn quốc gia Cát Tiên', 'Vườn quốc gia Tràm Chim'],
        correctIndex: 0,
        explanation: 'Cúc Phương là vườn quốc gia đầu tiên của Việt Nam với hệ sinh thái rừng nhiệt đới mưa ẩm phong phú.',
        damage: 49500
      },
      {
        id: 'q37_2',
        question: 'Màu sắc biểu trưng cho Mẫu Thượng Ngàn (Nhạc Phủ) trong tín ngưỡng Tam Phủ là màu gì?',
        options: ['Màu xanh lá cây', 'Màu đỏ rực', 'Màu trắng tinh khiết', 'Màu vàng kim'],
        correctIndex: 0,
        explanation: 'Trong Tam phủ: Đệ nhất Thượng Thiên màu đỏ, Đệ nhị Thượng Ngàn màu xanh, Đệ tam Thoải phủ màu trắng.',
        damage: 49000
      },
      {
        id: 'q37_3',
        question: 'Hành động thiết thực nhất của mỗi học sinh để bảo vệ rừng và thiên nhiên là gì?',
        options: ['Trồng và chăm sóc cây xanh, tiết kiệm giấy và không xả rác bừa bãi', 'Chặt cây làm củi đốt', 'Mua bán các loài động vật hoang dã', 'Đốt rừng làm nương rẫy'],
        correctIndex: 0,
        explanation: 'Mỗi mầm xanh được chăm sóc là một đóng góp thiết thực xây dựng hành tinh xanh tươi.',
        damage: 48500
      }
    ]
  },
  {
    id: 38,
    order: 38,
    arenaName: 'Đấu trường 38: Chín Nhánh Cửu Long',
    bossName: 'Thần Sông',
    title: 'Hộ Thần Cửu Long Giang Sóng Cuộn',
    regionId: 4,
    regionName: 'Linh Giới Việt Nam',
    maxHp: 147500,
    level: 38,
    difficulty: 'Rất khó',
    origin: 'Cảm hứng từ vùng đất Nam Bộ trù phú và chín nhánh sông Cửu Long (Sáng tạo)',
    biography: 'Vị thần cai quản chín cửa sông rồng đổ ra biển lớn phương Nam, bồi đắp vựa lúa vựa trái cây màu mỡ nhất nước, che chở người dân xuồng ghe tấp nập sớm chiều.',
    context: 'Dòng sông Tiền sông Hậu mênh mông sóng biếc, chợ nổi Cái Răng rộn rã câu hò đờn ca tài tử.',
    personality: 'Hào sảng, chất phác, phóng khoáng và đậm đà nghĩa tình.',
    skills: ['Cửu Long Rẽ Sóng', 'Phù Sa Vạn Mẫu', 'Chợ Nổi Thanh Âm'],
    avatarStyle: { symbol: '🛶', badge: 'Hộ Thần Cửu Long', accentColor: '#0284C7' },
    theme: {
      primary: '#0284C7',
      secondary: '#0369A1',
      border: 'border-sky-500',
      glow: 'shadow-sky-500/30',
      text: 'text-sky-400',
      bgGradient: 'from-blue-950 via-slate-900 to-cyan-950',
      iconBg: 'bg-sky-600'
    },
    rewardExp: 3500,
    rewardBadge: 'Phù Sa Cửu Long',
    rewardTitle: 'Tâm Hồn Phóng Khoáng',
    questions: [
      {
        id: 'q38_1',
        question: 'Sông Mê Kông khi chảy vào lãnh thổ miền Nam Việt Nam chia thành hai dòng chính là sông nào?',
        options: ['Sông Tiền và sông Hậu', 'Sông Đồng Nai và sông Sài Gòn', 'Sông Vàm Cỏ Đông và Vàm Cỏ Tây', 'Sông Bé và sông La Ngà'],
        correctIndex: 0,
        explanation: 'Sông Mê Kông vào nước ta tách thành dòng sông Tiền và sông Hậu rồi đổ ra biển Đông qua chín cửa rồng.',
        damage: 49500
      },
      {
        id: 'q38_2',
        question: 'Loại hình nghệ thuật âm nhạc dân gian đặc sắc của vùng đất Nam Bộ được UNESCO công nhận là di sản văn hóa là gì?',
        options: ['Đờn ca tài tử Nam Bộ', 'Hát quan họ', 'Hát xoan', 'Ca trù'],
        correctIndex: 0,
        explanation: 'Nghệ thuật Đờn ca tài tử Nam Bộ được UNESCO vinh danh năm 2013.',
        damage: 49000
      },
      {
        id: 'q38_3',
        question: 'Vựa lúa lớn nhất cả nước, đảm bảo an ninh lương thực và xuất khẩu gạo của Việt Nam là vùng nào?',
        options: ['Đồng bằng sông Cửu Long', 'Đồng bằng sông Hồng', 'Đồng bằng duyên hải miền Trung', 'Tây Nguyên'],
        correctIndex: 0,
        explanation: 'Đồng bằng sông Cửu Long là vựa lúa trù phú, đóng góp phần lớn sản lượng lúa gạo xuất khẩu hàng đầu thế giới.',
        damage: 49000
      }
    ]
  },
  {
    id: 39,
    order: 39,
    arenaName: 'Đấu trường 39: Đỉnh Fansipan Ngút Mây',
    bossName: 'Thần Núi',
    title: 'Hộ Thần Fansipan Đỉnh Trời Mây Ngút',
    regionId: 4,
    regionName: 'Linh Giới Việt Nam',
    maxHp: 148000,
    level: 39,
    difficulty: 'Rất khó',
    origin: 'Cảm hứng từ đỉnh núi Fansipan hùng vĩ - nóc nhà Đông Dương (Sáng tạo)',
    biography: 'Vị thần ngự trị trên cột mốc cao nhất ba nước Đông Dương, nơi đất trời giao thoa mây ngàn bồng bềnh. Thần rèn luyện ý chí kiên định và tinh thần chinh phục đỉnh cao tri thức cho thế hệ trẻ.',
    context: 'Cột mốc inox 3.143m ngời sáng trên đỉnh Fansipan, biển mây cuồn cuộn dưới chân như chốn bồng lai.',
    personality: 'Kiên định, trầm tĩnh, thách thức giới hạn và cổ vũ vươn xa.',
    skills: ['Nóc Nhà Đông Dương', 'Thiên Phong Tuyết Vũ', 'Đá Núi Kiên Tâm'],
    avatarStyle: { symbol: '🏔️', badge: 'Chúa Đỉnh Fansipan', accentColor: '#6366F1' },
    theme: {
      primary: '#4F46E5',
      secondary: '#4338CA',
      border: 'border-indigo-500',
      glow: 'shadow-indigo-500/30',
      text: 'text-indigo-400',
      bgGradient: 'from-indigo-950 via-slate-900 to-slate-950',
      iconBg: 'bg-indigo-600'
    },
    rewardExp: 3600,
    rewardBadge: 'Cột Mốc 3143m',
    rewardTitle: 'Chinh Phục Đỉnh Cao',
    questions: [
      {
        id: 'q39_1',
        question: 'Độ cao chính xác đo đạc chính thức của đỉnh núi Fansipan là bao nhiêu mét?',
        options: ['3.143 mét', '2.500 mét', '4.000 mét', '3.500 mét'],
        correctIndex: 0,
        explanation: 'Đỉnh Fansipan cao chính xác 3.143m (đo lại năm 2019 là 3.147,3m), được mệnh danh là nóc nhà Đông Dương.',
        damage: 50000
      },
      {
        id: 'q39_2',
        question: 'Thị xã du lịch nổi tiếng nằm ở chân núi Fansipan thuộc tỉnh Lào Cai là gì?',
        options: ['Thị xã Sa Pa', 'Thị xã Mộc Châu', 'Thành phố Đà Lạt', 'Thị trấn Tam Đảo'],
        correctIndex: 0,
        explanation: 'Sa Pa là điểm đến du lịch nổi tiếng với khí hậu mát mẻ quanh năm và ruộng bậc thang kỳ vĩ.',
        damage: 49000
      },
      {
        id: 'q39_3',
        question: 'Văn hóa độc đáo của đồng bào các dân tộc vùng cao Tây Bắc thể hiện rõ nét qua kiệt tác cảnh quan nào?',
        options: ['Ruộng bậc thang (như Mù Cang Chải, Sa Pa, Hoàng Su Phì)', 'Vườn cà phê bạt ngàn', 'Các đồi chè công nghiệp', 'Hồ nước nhân tạo'],
        correctIndex: 0,
        explanation: 'Ruộng bậc thang là kỳ tích lao động sáng tạo của đồng bào H\'Mông, Dao, Tày... hòa quyện tuyệt vời với thiên nhiên.',
        damage: 49000
      }
    ]
  },
  {
    id: 40,
    order: 40,
    arenaName: 'Đấu trường 40: Đèo Hải Vân Mây Phủ',
    bossName: 'Thần Gió',
    title: 'Linh Thần Vũ Bão Phiêu Lãng Bốn Phương',
    regionId: 4,
    regionName: 'Linh Giới Việt Nam',
    maxHp: 148500,
    level: 40,
    difficulty: 'Huyền thoại',
    origin: 'Cảm hứng từ danh xưng "Thiên hạ đệ nhất hùng quan" đèo Hải Vân và gió bão phương Nam',
    biography: 'Vị thần cưỡi luồng gió bấc gió nồm vượt qua ngàn đèo cao dốc thẳm, thổi bùng cánh buồm vượt khơi xa và bảo hộ những chuyến hải trình an toàn cập bến bờ bình yên.',
    context: 'Đỉnh đèo Hải Vân mây trắng vắt ngang lưng trời, một bên là vách núi đá dựng đứng, một bên là biển xanh sâu thẳm.',
    personality: 'Tự do, biến ảo khôn lường, hào sảng và phóng khoáng.',
    skills: ['Hải Vân Phong Trận', 'Cuồng Phong Tốc Độ', 'Bát Diện Nghênh Phong'],
    avatarStyle: { symbol: '💨', badge: 'Thiên Hạ Đệ Nhất Quan', accentColor: '#06B6D4' },
    theme: {
      primary: '#0891B2',
      secondary: '#0E7490',
      border: 'border-cyan-500',
      glow: 'shadow-cyan-500/40',
      text: 'text-cyan-400',
      bgGradient: 'from-cyan-950 via-slate-900 to-indigo-950',
      iconBg: 'bg-cyan-600'
    },
    rewardExp: 3800,
    rewardBadge: 'Thiên Hạ Hùng Quan',
    rewardTitle: 'Làm Chủ Ngọn Gió',
    questions: [
      {
        id: 'q40_1',
        question: 'Vua Lê Thánh Tông khi dừng chân ngắm cảnh đèo Hải Vân đã phong tặng danh hiệu nổi tiếng nào cho nơi đây?',
        options: ['Thiên hạ đệ nhất hùng quan', 'Nam thiên đệ nhất động', 'Bắc thiên đệ nhất đỉnh', 'Kỳ quan muôn thuở'],
        correctIndex: 0,
        explanation: 'Đèo Hải Vân hùng vĩ nối liền Thừa Thiên Huế và Đà Nẵng được vua Lê Thánh Tông ca ngợi là "Thiên hạ đệ nhất hùng quan".',
        damage: 50000
      },
      {
        id: 'q40_2',
        question: 'Loại gió mùa mang lại mùa đông lạnh giá cho miền Bắc nước ta là gió mùa nào?',
        options: ['Gió mùa Đông Bắc', 'Gió mùa Tây Nam', 'Gió Tín phong bán cầu Bắc', 'Gió Tây khô nóng (gió Lào)'],
        correctIndex: 0,
        explanation: 'Gió mùa Đông Bắc thổi từ áp cao Siberia mang lại thời tiết lạnh đặc trưng cho mùa đông Bắc Bộ.',
        damage: 49500
      },
      {
        id: 'q40_3',
        question: 'Cây cầu quay đầu tiên tại Việt Nam được xây dựng trên dòng sông Hàn của thành phố nào?',
        options: ['Thành phố Đà Nẵng', 'Thành phố Huế', 'Thành phố Hải Phòng', 'Thành phố Cần Thơ'],
        correctIndex: 0,
        explanation: 'Cầu quay sông Hàn tại Đà Nẵng là biểu tượng của tinh thần đổi mới và khát vọng vươn lên.',
        damage: 49000
      }
    ]
  },

  // ==========================================
  // VÙNG 5: THIÊN GIỚI HUYỀN BÍ (41 - 50)
  // (Trùm cuối thần thoại, HP không vượt quá 150.000)
  // ==========================================
  {
    id: 41,
    order: 41,
    arenaName: 'Đấu trường 41: Thiên Cung Kim Sắc',
    bossName: 'Thiên Long',
    title: 'Cự Long Tầng Cao Trời Việt',
    regionId: 5,
    regionName: 'Thiên Giới Huyền Bí',
    maxHp: 149000,
    level: 41,
    difficulty: 'Huyền thoại',
    origin: 'Thần thoại và mỹ thuật rồng phương Đông (Sáng tạo thần thoại)',
    biography: 'Vị thần rồng tối cao ngự trên tầng mây vàng của thiên giới, thân khoác hào quang vàng óng, móng vuốt nắm giữ ngọc thần, hộ trì vận mệnh non sông ngàn năm văn hiến.',
    context: 'Tầng mây vàng rực rỡ lấp lánh ánh kim, cột đình thiên giới chạm khắc rồng phượng uy nghiêm.',
    personality: 'Chí tôn, uy nghiêm, công chính và bao quát cõi bờ.',
    skills: ['Kim Long Hống Thiên', 'Hoàng Kim Hộ Thể', 'Càn Khôn Nhất Khí'],
    avatarStyle: { symbol: '🐉', badge: 'Thiên Long Chí Tôn', accentColor: '#EAB308' },
    theme: {
      primary: '#CA8A04',
      secondary: '#A16207',
      border: 'border-yellow-500',
      glow: 'shadow-yellow-500/40',
      text: 'text-yellow-400',
      bgGradient: 'from-amber-950 via-slate-900 to-yellow-950',
      iconBg: 'bg-yellow-600'
    },
    rewardExp: 4000,
    rewardBadge: 'Ấn Rồng Vàng Thiên Giới',
    rewardTitle: 'Ý Chí Thiên Long',
    questions: [
      {
        id: 'q41_1',
        question: 'Kinh đô Thăng Long (Hà Nội ngày nay) được vua Lý Thái Tổ đặt tên xuất phát từ điềm lành gì năm 1010?',
        options: ['Nhìn thấy hình tượng Rồng vàng bay lên từ sông Hồng ("Thăng Long" = Rồng bay lên)', 'Bắt được bảo kiếm dưới sông', 'Gặp được một vị cao tăng chỉ đường', 'Được nhân dân tặng một con rồng vàng đúc bằng đồng'],
        correctIndex: 0,
        explanation: 'Mùa thu năm 1010, khi dời đô từ Hoa Lư về thành Đại La, vua thấy rồng vàng bay lên nên đổi tên thành Thăng Long.',
        damage: 50000
      },
      {
        id: 'q41_2',
        question: 'Tác phẩm "Chiếu dời đô" do vị vua nào viết bằng chữ Hán năm 1010?',
        options: ['Vua Lý Thái Tổ (Lý Công Uẩn)', 'Vua Lý Thánh Tông', 'Vua Trần Nhân Tông', 'Vua Lê Lợi'],
        correctIndex: 0,
        explanation: 'Lý Công Uẩn viết "Chiếu dời đô" khẳng định tầm nhìn chiến lược chọn đất rồng cuộn hổ ngồi xây dựng cơ đồ muôn thuở.',
        damage: 49500
      },
      {
        id: 'q41_3',
        question: 'Năm 2010, thủ đô Hà Nội đã tổ chức đại lễ kỷ niệm bao nhiêu năm Thăng Long - Hà Nội?',
        options: ['Đại lễ kỷ niệm 1000 năm Thăng Long - Hà Nội', 'Kỷ niệm 500 năm', 'Kỷ niệm 100 năm', 'Kỷ niệm 2000 năm'],
        correctIndex: 0,
        explanation: 'Năm 2010 đánh dấu tròn một thiên niên kỷ (1000 năm) kinh đô Thăng Long lịch sử.',
        damage: 49500
      }
    ]
  },
  {
    id: 42,
    order: 42,
    arenaName: 'Đấu trường 42: Lôi Đình Hỏa Điện',
    bossName: 'Hỏa Thần',
    title: 'Chúa Tể Ngọn Lửa Hồng Hoang',
    regionId: 5,
    regionName: 'Thiên Giới Huyền Bí',
    maxHp: 149200,
    level: 42,
    difficulty: 'Huyền thoại',
    origin: 'Cảm hứng từ thần thoại lửa và sự khởi đầu của nền văn minh cổ nhân (Sáng tạo)',
    biography: 'Vị thần gìn giữ ngọn lửa thiêng soi rọi tri thức nhân loại, xua tan bóng tối mông muội, giúp con người rèn luyện sắt đồng và nấu chín thức ăn để bước vào kỷ nguyên văn minh rực rỡ.',
    context: 'Lò lửa hồng rực rỡ đốm than vàng, sấm sét lôi đình hội tụ ngút ngàn hào khí.',
    personality: 'Rực cháy, quyết liệt, soi sáng và nhiệt tâm kiến tạo.',
    skills: ['Hồng Hoang Liệt Diễm', 'Lôi Hỏa Thần Quyền', 'Bất Diệt Hỏa Tâm'],
    avatarStyle: { symbol: '🔥', badge: 'Hỏa Thần Hồng Hoang', accentColor: '#EF4444' },
    theme: {
      primary: '#DC2626',
      secondary: '#B91C1C',
      border: 'border-red-500',
      glow: 'shadow-red-500/40',
      text: 'text-red-400',
      bgGradient: 'from-red-950 via-slate-900 to-amber-950',
      iconBg: 'bg-red-600'
    },
    rewardExp: 4200,
    rewardBadge: 'Ngọn Lửa Hồng Hoang',
    rewardTitle: 'Ngọn Lửa Khai Sáng',
    questions: [
      {
        id: 'q42_1',
        question: 'Việc con người thời tiền sử phát minh ra và biết cách giữ ngọn lửa có ý nghĩa như thế nào đối với tiến trình tiến hóa?',
        options: ['Bước ngoặt vĩ đại giúp sưởi ấm, nấu chín thức ăn, xua đuổi thú dữ và chế tác công cụ kim khí', 'Chỉ giúp nhìn đường ban đêm', 'Chỉ dùng để săn bắt thú rừng', 'Không có tác động đáng kể'],
        correctIndex: 0,
        explanation: 'Lửa là phát minh vĩ đại đầu tiên đưa loài người tách khỏi thế giới động vật hoang dã tiến vào văn minh.',
        damage: 50000
      },
      {
        id: 'q42_2',
        question: 'Nghề luyện kim đúc đồng phát triển đến đỉnh cao rực rỡ nhất trong nền văn hóa nào của nước ta?',
        options: ['Văn hóa Đông Sơn (Trống đồng, vũ khí đồng)', 'Văn hóa Sa Huỳnh', 'Văn hóa Óc Eo', 'Văn hóa Hòa Bình'],
        correctIndex: 0,
        explanation: 'Kỹ nghệ đúc đồng Đông Sơn đạt trình độ bậc thầy thế giới thời đại kim khí với các trống đồng tinh xảo.',
        damage: 49600
      },
      {
        id: 'q42_3',
        question: 'Vị vua anh hùng áo vải nào đã hành quân thần tốc đánh tan 29 vạn quân Thanh vào dịp Tết Kỷ Dậu 1789?',
        options: ['Vua Quang Trung (Nguyễn Huệ)', 'Vua Lê Lợi', 'Vua Đinh Tiên Hoàng', 'Vua Ngô Quyền'],
        correctIndex: 0,
        explanation: 'Quang Trung - Nguyễn Huệ với chiến thắng Ngọc Hồi - Đống Đa oanh liệt mùa xuân 1789.',
        damage: 49600
      }
    ]
  },
  {
    id: 43,
    order: 43,
    arenaName: 'Đấu trường 43: Vực Thẳm Đại Dương',
    bossName: 'Thủy Thần',
    title: 'Chúa Tể Đại Dương Vô Tận',
    regionId: 5,
    regionName: 'Thiên Giới Huyền Bí',
    maxHp: 149400,
    level: 43,
    difficulty: 'Huyền thoại',
    origin: 'Tín ngưỡng thần biển và hải phận thiêng liêng Tổ quốc (Sáng tạo thần thoại)',
    biography: 'Vị thần ngự trị nơi biển sâu mênh mông, tay cầm cây đinh ba điều khiển triều dâng bão nổi, bảo vệ ngư dân vững vàng bám biển và khẳng định chủ quyền biển đảo thiêng liêng của non sông.',
    context: 'Biển khơi sóng bạc ngút ngàn tận chân trời, dưới làn nước trong xanh là rạn san hô Trường Sa lấp lánh.',
    personality: 'Bao la, sâu thẳm, kiên định và bất khuất trước bão tố.',
    skills: ['Hải Triều Thần Ba', 'Hộ Vệ Hoàng Sa', 'Đại Dương Vô Cực'],
    avatarStyle: { symbol: '🌊', badge: 'Thần Biển Đảo', accentColor: '#0284C7' },
    theme: {
      primary: '#0284C7',
      secondary: '#0369A1',
      border: 'border-sky-500',
      glow: 'shadow-sky-500/40',
      text: 'text-sky-400',
      bgGradient: 'from-blue-950 via-slate-900 to-indigo-950',
      iconBg: 'bg-sky-600'
    },
    rewardExp: 4400,
    rewardBadge: 'Ngọc Trai Biển Đảo',
    rewardTitle: 'Chủ Quyền Biển Xanh',
    questions: [
      {
        id: 'q43_1',
        question: 'Hai quần đảo thiêng liêng không thể tách rời thuộc chủ quyền lãnh thổ của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam là gì?',
        options: ['Quần đảo Hoàng Sa và Quần đảo Trường Sa', 'Quần đảo Côn Đảo và Phú Quốc', 'Quần đảo Cát Bà và Cô Tô', 'Quần đảo Thổ Chu và Nam Du'],
        correctIndex: 0,
        explanation: 'Hoàng Sa và Trường Sa là một phần máu thịt thiêng liêng không thể tách rời của Tổ quốc Việt Nam.',
        damage: 50000
      },
      {
        id: 'q43_2',
        question: 'Đội hùng binh nào trong lịch sử từ thế kỷ XVII dưới triều Nguyễn đã dong buồm ra Hoàng Sa cắm mốc chủ quyền?',
        options: ['Hải đội Hoàng Sa (từ đảo Lý Sơn, Quảng Ngãi)', 'Thủy quân Tây Sơn', 'Nghĩa quân Lam Sơn', 'Phường chài Cửa Lò'],
        correctIndex: 0,
        explanation: 'Hải đội Hoàng Sa kiên cường cưỡng bão đo đạc hải trình, dựng mốc khẳng định chủ quyền quốc gia từ bao đời.',
        damage: 49700
      },
      {
        id: 'q43_3',
        question: 'Trận chiến lẫy lừng trên sông Bạch Đằng năm 938 đánh tan quân Nam Hán gắn liền với vị anh hùng dân tộc nào?',
        options: ['Ngô Quyền (chấm dứt hơn 1000 năm Bắc thuộc)', 'Trần Hưng Đạo', 'Lê Hoàn', 'Lý Thường Kiệt'],
        correctIndex: 0,
        explanation: 'Ngô Quyền với trận địa cọc ngầm Bạch Đằng lịch sử năm 938 mở ra kỷ nguyên độc lập tự chủ lâu dài cho dân tộc.',
        damage: 49700
      }
    ]
  },
  {
    id: 44,
    order: 44,
    arenaName: 'Đấu trường 44: Thạch Động Thần Phong',
    bossName: 'Sơn Thần',
    title: 'Đại Thần Ngự Đỉnh Núi Thiêng',
    regionId: 5,
    regionName: 'Thiên Giới Huyền Bí',
    maxHp: 149600,
    level: 44,
    difficulty: 'Huyền thoại',
    origin: 'Thần thoại núi non thiêng liêng đất Việt (Sáng tạo)',
    biography: 'Vị đại thần ngự đỉnh núi thiêng sừng sững, thân là vách đá nghìn thu vững chãi như bàn thạch, chở che xóm làng trước giông bão, tượng trưng cho bản lĩnh kiên cường bất khuất của dân tộc Việt Nam.',
    context: 'Dãy núi đá hoa cương cao vút chọc thủng tầng mây, tuyết phủ trắng xóa rạng ngời hào quang thiên giới.',
    personality: 'Vững như bàn thạch, trầm ổn, cương liệt và chở che muôn loài.',
    skills: ['Bàn Thạch Hộ Thân', 'Vạn Sơn Triều Bái', 'Kình Thiên Nhất Kích'],
    avatarStyle: { symbol: '⛰️', badge: 'Sơn Thần Bàn Thạch', accentColor: '#10B981' },
    theme: {
      primary: '#059669',
      secondary: '#047857',
      border: 'border-emerald-500',
      glow: 'shadow-emerald-500/40',
      text: 'text-emerald-400',
      bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
      iconBg: 'bg-emerald-600'
    },
    rewardExp: 4600,
    rewardBadge: 'Phiến Đá Trường Tồn',
    rewardTitle: 'Kiên Cường Bất Khuất',
    questions: [
      {
        id: 'q44_1',
        question: 'Dãy núi nào uốn lượn hình cánh cung hùng vĩ được mệnh danh là "xương sống" của bán đảo Đông Dương chạy dọc miền Trung nước ta?',
        options: ['Dãy Trường Sơn (Trường Sơn Bắc và Trường Sơn Nam)', 'Dãy Ngân Sơn', 'Dãy Bắc Sơn', 'Dãy Sông Gâm'],
        correctIndex: 0,
        explanation: 'Dãy Trường Sơn hùng vĩ dài trên 1.100 km gắn liền với những trang sử vàng kháng chiến oanh liệt của dân tộc.',
        damage: 50000
      },
      {
        id: 'q44_2',
        question: 'Tuyến đường huyền thoại mang tên Bác Hồ trong kháng chiến chống Mỹ cứu nước vượt qua dãy núi nào?',
        options: ['Đường mòn Hồ Chí Minh (xuyên dọc dãy Trường Sơn)', 'Đường số 4 biên giới', 'Đường quốc lộ 1A', 'Đường Trường Sơn Đông'],
        correctIndex: 0,
        explanation: 'Đường Trường Sơn – Đường Hồ Chí Minh huyền thoại là biểu tượng sáng ngời của ý chí sắt đá "Xẻ dọc Trường Sơn đi cứu nước".',
        damage: 49800
      },
      {
        id: 'q44_3',
        question: 'Ai là tác giả của bài thơ nổi tiếng "Đồng chí" viết về tình đồng đội gắn bó keo sơn trong kháng chiến chống Pháp?',
        options: ['Chính Hữu', 'Phạm Tiến Duật', 'Quang Dũng', 'Hồng Nguyên'],
        correctIndex: 0,
        explanation: 'Nhà thơ Chính Hữu sáng tác bài thơ "Đồng chí" đầu năm 1948 sau chiến dịch Việt Bắc thu đông.',
        damage: 49800
      }
    ]
  },
  {
    id: 45,
    order: 45,
    arenaName: 'Đấu trường 45: Cung Quảng Rằm Trung Thu',
    bossName: 'Nguyệt Thần',
    title: 'Nữ Thần Ánh Trăng Huyền Ảo',
    regionId: 5,
    regionName: 'Thiên Giới Huyền Bí',
    maxHp: 149700,
    level: 45,
    difficulty: 'Huyền thoại',
    origin: 'Cảm hứng từ hình tượng Chị Hằng, Chú Cuội và Tết Trung Thu Việt Nam (Sáng tạo)',
    biography: 'Nữ thần ánh trăng ngự nơi cung Quảng Hàn dịu mát, ban phát ánh sáng thanh bạch dịu dàng, chở che giấc ngủ an lành cho trẻ thơ và nuôi dưỡng những ước mơ bay bổng diệu kỳ.',
    context: 'Vầng trăng rằm tròn vành vạnh tỏa ánh sáng bạc lung linh, hoa quỳnh nở hương thơm ngát trong gió thu.',
    personality: 'Dịu dàng, thanh khiết, êm ả và thấu hiểu lòng người.',
    skills: ['Bạch Nguyệt Quang Huy', 'Quảng Hàn Dạ Khúc', 'Nguyệt Lượng Vô Cực'],
    avatarStyle: { symbol: '🌙', badge: 'Nguyệt Thần Cung Quảng', accentColor: '#C084FC' },
    theme: {
      primary: '#9333EA',
      secondary: '#7E22CE',
      border: 'border-purple-400',
      glow: 'shadow-purple-400/40',
      text: 'text-purple-300',
      bgGradient: 'from-purple-950 via-slate-900 to-indigo-950',
      iconBg: 'bg-purple-600'
    },
    rewardExp: 4800,
    rewardBadge: 'Nguyệt Quang Thần Châu',
    rewardTitle: 'Tâm Hồn Trong Sáng',
    questions: [
      {
        id: 'q45_1',
        question: 'Trong truyện cổ tích dân gian Việt Nam, chú Cuội ngồi dưới gốc cây gì trên cung trăng?',
        options: ['Cây đa cổ thụ', 'Cây tre trăm đốt', 'Cây xoan đào', 'Cây bồ đề'],
        correctIndex: 0,
        explanation: 'Chú Cuội nắm vào rễ cây thuốc quý cây đa cứu người, cây bay vút lên cung trăng nghìn đời soi bóng.',
        damage: 50000
      },
      {
        id: 'q45_2',
        question: 'Tết Trung thu ở Việt Nam diễn ra vào ngày tháng nào theo lịch âm?',
        options: ['Ngày rằm tháng Tám (15/8 âm lịch)', 'Ngày rằm tháng Bảy (15/7 âm lịch)', 'Ngày Tết Nguyên Tiêu (15/1 âm lịch)', 'Ngày mồng Một tháng Giêng'],
        correctIndex: 0,
        explanation: 'Rằm tháng Tám là tết đoàn viên, tết trông trăng rước đèn ông sao rộn ràng của thiếu nhi.',
        damage: 49850
      },
      {
        id: 'q45_3',
        question: 'Chiếc đèn trung thu truyền thống làm bằng nan tre và giấy bóng kính màu đỏ hình ngôi sao được gọi là gì?',
        options: ['Đèn ông sao năm cánh', 'Đèn kéo quân', 'Đèn hoa đăng', 'Đèn lồng tròn'],
        correctIndex: 0,
        explanation: 'Đèn ông sao năm cánh là món đồ chơi dân gian truyền thống gắn liền với tuổi thơ bao thế hệ học sinh.',
        damage: 49850
      }
    ]
  },
  {
    id: 46,
    order: 46,
    arenaName: 'Đấu trường 46: Thái Dương Hỏa Diệm',
    bossName: 'Nhật Thần',
    title: 'Vị Thần Vầng Dương Chiếu Rọi Muôn Loài',
    regionId: 5,
    regionName: 'Thiên Giới Huyền Bí',
    maxHp: 149800,
    level: 46,
    difficulty: 'Huyền thoại',
    origin: 'Tín ngưỡng sùng bái thần Mặt Trời của người Việt cổ trên hoa văn Đông Sơn',
    biography: 'Vị thần mang sức mạnh ánh sáng vô tận, xua tan bóng tối giá buốt, khởi tạo sự quang hợp cho cây cối đâm chồi nảy lộc và biểu trưng cho trí tuệ minh triết tỏa sáng của nhân loại.',
    context: 'Vầng dương chói lọi giữa đỉnh trời cao, ngàn tia sáng vàng xuyên qua mây phủ sáng rực trần gian.',
    personality: 'Rực rỡ, chính trực, nhiệt huyết và công bằng với muôn loài.',
    skills: ['Thái Dương Thiền Quang', 'Bát Hoang Chiếu Triệu', 'Kim Dương Trấn Tà'],
    avatarStyle: { symbol: '☀️', badge: 'Nhật Thần Thái Dương', accentColor: '#F59E0B' },
    theme: {
      primary: '#D97706',
      secondary: '#B45309',
      border: 'border-amber-400',
      glow: 'shadow-amber-400/40',
      text: 'text-amber-300',
      bgGradient: 'from-amber-950 via-slate-900 to-yellow-950',
      iconBg: 'bg-amber-600'
    },
    rewardExp: 5000,
    rewardBadge: 'Thái Dương Kim Quang',
    rewardTitle: 'Ánh Sáng Khai Trí',
    questions: [
      {
        id: 'q46_1',
        question: 'Ngôi sao nào là trung tâm của Hệ Mặt Trời, cung cấp nhiệt và ánh sáng cho Trái Đất của chúng ta?',
        options: ['Mặt Trời (một ngôi sao lùn vàng)', 'Mặt Trăng', 'Sao Kim (Kim tinh)', 'Sao Hỏa'],
        correctIndex: 0,
        explanation: 'Mặt Trời là ngôi sao ở trung tâm Hệ Mặt Trời, chiếm hơn 99,8% khối lượng của toàn hệ.',
        damage: 50000
      },
      {
        id: 'q46_2',
        question: 'Bài thơ "Bài thơ về tiểu đội xe không kính" của nhà thơ Phạm Tiến Duật ca ngợi vẻ đẹp gì của người lính lái xe Trường Sơn?',
        options: ['Tư thế hiên ngang, tinh thần lạc quan, dũng cảm bất chấp bom đạn kẻ thù', 'Khả năng sửa chữa ô tô tài tình', 'Kỹ năng lái xe tốc độ cao', 'Tình yêu quê hương qua cảnh đẹp hai bên đường'],
        correctIndex: 0,
        explanation: '"Không có kính, ừ thì có bụi / Không có kính, rồi xe không có đèn... / Bếp Hoàng Cầm ta dựng giữa trời / Nhìn nhau mặt lấm cười ha ha".',
        damage: 49900
      },
      {
        id: 'q46_3',
        question: 'Văn Miếu - Quốc Tử Giám ở Hà Nội được coi là gì trong lịch sử giáo dục Việt Nam?',
        options: ['Trường đại học đầu tiên của Việt Nam (thành lập năm 1076 thời vua Lý Nhân Tông)', 'Trường trung học đầu tiên', 'Bảo tàng lịch sử quốc gia', 'Nơi ở của các hoàng tử'],
        correctIndex: 0,
        explanation: 'Quốc Tử Giám ra đời năm 1076 là cái nôi đào tạo hàng ngàn bậc hiền tài cho đất nước.',
        damage: 49900
      }
    ]
  },
  {
    id: 47,
    order: 47,
    arenaName: 'Đấu trường 47: Cung Điện Phượng Hoàng',
    bossName: 'Phượng Hoàng Thiên Giới',
    title: 'Linh Điểu Chín Đuôi Chí Tôn',
    regionId: 5,
    regionName: 'Thiên Giới Huyền Bí',
    maxHp: 149900,
    level: 47,
    difficulty: 'Huyền thoại',
    origin: 'Cảm hứng từ hình tượng Phượng Hoàng chín đuôi trong mỹ thuật hoàng gia Việt Nam',
    biography: 'Chúa tể muôn loài chim trên thiên giới, chín chiếc đuôi óng ánh chín màu ngũ sắc huyền ảo, mang sức mạnh tái sinh bất diệt và tiếng hót thanh cao có thể cảm hóa mọi tâm hồn tăm tối.',
    context: 'Cung điện mây hồng chín tầng rực rỡ, hoa đăng sen vàng bay lượn trong gió thiêng ngào ngạt.',
    personality: 'Thánh thiện, kiêu sa, uy nghiêm và trường tồn bất diệt.',
    skills: ['Cửu Vĩ Phượng Vũ', 'Ngũ Sắc Hào Quang', 'Tái Sinh Thiên Đạo'],
    avatarStyle: { symbol: '🦚', badge: 'Phượng Hoàng Cửu Vĩ', accentColor: '#EC4899' },
    theme: {
      primary: '#DB2777',
      secondary: '#BE185D',
      border: 'border-pink-500',
      glow: 'shadow-pink-500/40',
      text: 'text-pink-400',
      bgGradient: 'from-pink-950 via-slate-900 to-purple-950',
      iconBg: 'bg-pink-600'
    },
    rewardExp: 5200,
    rewardBadge: 'Cửu Vĩ Phượng Ấn',
    rewardTitle: 'Tái Sinh Kiêu Hãnh',
    questions: [
      {
        id: 'q47_1',
        question: 'Tác phẩm văn học trung đại nào của Nguyễn Trãi được tôn vinh là bản Tuyên ngôn Độc lập thứ hai của dân tộc?',
        options: ['Bình Ngô đại cáo (năm 1428)', 'Nam quốc sơn hà (năm 1077)', 'Tuyên ngôn Độc lập (năm 1945)', 'Bạch Đằng giang phú'],
        correctIndex: 0,
        explanation: '"Như nước Đại Việt ta từ trước / Vốn xưng nền văn hiến đã lâu / Núi sông bờ cõi đã chia / Phong tục Bắc Nam cũng khác".',
        damage: 50000
      },
      {
        id: 'q47_2',
        question: 'Ai là nữ sĩ tài hoa được mệnh danh là "Bà Chúa Thơ Nôm" trong lịch sử văn học Việt Nam?',
        options: ['Hồ Xuân Hương', 'Đoàn Thị Điểm', 'Bà Huyện Thanh Quan', 'Sương Nguyệt Anh'],
        correctIndex: 0,
        explanation: 'Hồ Xuân Hương với phong cách thơ Nôm độc đáo, sắc sảo, đấu tranh mạnh mẽ đòi quyền bình đẳng cho phụ nữ.',
        damage: 49950
      },
      {
        id: 'q47_3',
        question: 'Nhà thơ Bà Huyện Thanh Quan nổi tiếng với bài thơ hoài cổ nào viết khi dừng chân trên đỉnh đèo miền Trung?',
        options: ['Qua Đèo Ngang', 'Chiều hôm nhớ nhà', 'Thăng Long thành hoài cổ', 'Chùa Trấn Bắc'],
        correctIndex: 0,
        explanation: '"Bước tới Đèo Ngang bóng xế tà / Cỏ cây chen đá lá chen hoa / Lom khom dưới núi tiều vài chú / Lác đác bên sông chợ mấy nhà".',
        damage: 49950
      }
    ]
  },
  {
    id: 48,
    order: 48,
    arenaName: 'Đấu trường 48: Thủy Tinh Cung Biển Đông',
    bossName: 'Long Vương',
    title: 'Đại Đế Thủy Tộc Uy Nghiêm Biển Đông',
    regionId: 5,
    regionName: 'Thiên Giới Huyền Bí',
    maxHp: 149950,
    level: 48,
    difficulty: 'Huyền thoại',
    origin: 'Tín ngưỡng thần biển và truyền thuyết vua rồng bảo vệ bờ cõi biển Đông (Sáng tạo)',
    biography: 'Đại đế tối cao của muôn loài thủy tộc cõi biển Đông, ngự trên ngai vàng san hô ngàn năm, nắm giữ hải bảo ngọc ấn và duy trì sự cân bằng của dòng hải lưu bảo vệ bờ cõi đất thiêng.',
    context: 'Thủy cung pha lê ngàn trượng sâu dưới đáy biển Đông, rồng thần lượn quanh ngai vàng ngọc bích uy nghiêm.',
    personality: 'Uy nghiêm tột bực, đại lượng, nghiêm khắc với kẻ xâm lăng biển đảo.',
    skills: ['Biển Đông Lôi Kích', 'Vạn Lý Triều Dâng', 'Hải Long Thánh Ấn'],
    avatarStyle: { symbol: '👑', badge: 'Long Vương Biển Đông', accentColor: '#2563EB' },
    theme: {
      primary: '#1D4ED8',
      secondary: '#1E40AF',
      border: 'border-blue-500',
      glow: 'shadow-blue-500/40',
      text: 'text-blue-400',
      bgGradient: 'from-blue-950 via-slate-900 to-indigo-950',
      iconBg: 'bg-blue-600'
    },
    rewardExp: 5500,
    rewardBadge: 'Thánh Long Hải Bảo',
    rewardTitle: 'Chúa Tể Thủy Cung',
    questions: [
      {
        id: 'q48_1',
        question: 'Trận đại thắng Bạch Đằng năm 1288 đánh tan đoàn thuyền chiến quân xâm lược Nguyên Mông do vị tướng kiệt xuất nào chỉ huy?',
        options: ['Hưng Đạo Đại Vương Trần Quốc Tuấn (Trần Hưng Đạo)', 'Trần Quang Khải', 'Trần Nhật Duật', 'Trần Khánh Dư'],
        correctIndex: 0,
        explanation: 'Trần Hưng Đạo tài ba dùng mưu cắm cọc Bạch Đằng bắt sống Ô Mã Nhi, đập tan mộng xâm lăng của đế chế Mông - Nguyên.',
        damage: 50000
      },
      {
        id: 'q48_2',
        question: 'Tác phẩm văn học quân sự bất hủ của Trần Quốc Tuấn viết để khích lệ tướng sĩ trước trận chiến là tác phẩm nào?',
        options: ['Hịch tướng sĩ (Dụ chư tỳ tướng hịch văn)', 'Vạn Kiếp tông bí truyền thư', 'Binh thư yếu lược', 'Đại Việt sử ký'],
        correctIndex: 0,
        explanation: '"Ta thường tới bữa quên ăn, nửa đêm vỗ gối; ruột đau như cắt, nước mắt đầm đìa; chỉ căm tức chưa xả thịt lột da, nuốt gan uống máu quân thù...".',
        damage: 49980
      },
      {
        id: 'q48_3',
        question: 'Tấm lòng yêu nước bất khuất của thiếu niên Trần Quốc Toản được lịch sử ghi dấu qua hành động biểu tượng nào?',
        options: ['Bóp nát quả cam trong tay vì không được vào dự bàn việc nước dưới bến Bình Than', 'Xé rách áo giáp', 'Chém đầu tướng giặc tại trận', 'Lập đàn thề quyết tử'],
        correctIndex: 0,
        explanation: 'Lá cờ thêu sáu chữ vàng "Phá cường địch, báo hoàng ân" của người anh hùng nhỏ tuổi Trần Quốc Toản mãi là tấm gương ngời sáng.',
        damage: 49970
      }
    ]
  },
  {
    id: 49,
    order: 49,
    arenaName: 'Đấu trường 49: Vực Hư Không Nguyên Sơ',
    bossName: 'Cổ Thần Huyền Bí',
    title: 'Thần Linh Nguyên Sơ Khởi Nguồn Trời Đất',
    regionId: 5,
    regionName: 'Thiên Giới Huyền Bí',
    maxHp: 149990,
    level: 49,
    difficulty: 'Huyền thoại',
    origin: 'Thần thoại khởi nguyên tạo thiên lập địa trong kho tàng văn hóa dân gian Việt Nam',
    biography: 'Vị thần nguyên sơ xuất hiện từ thuở hồng hoang mịt mùng, đắp cột chống trời tách biệt trời và đất, khai sinh nhật nguyệt tinh tú và đặt nền móng cho vạn vật sinh sôi trên mặt đất.',
    context: 'Hư không ngút ngàn sao băng rực rỡ, cột trời khổng lồ chống đỡ vòm trời xanh ngắt giữa biển mây nguyên thủy.',
    personality: 'Hùng vĩ vô biên, trầm tĩnh ngàn năm, khởi tạo và gìn giữ càn khôn.',
    skills: ['Khai Thiên Lập Địa', 'Thần Trụ Kình Thiên', 'Nguyên Sơ Vũ Trụ'],
    avatarStyle: { symbol: '🌌', badge: 'Cổ Thần Khởi Nguyên', accentColor: '#8B5CF6' },
    theme: {
      primary: '#7C3AED',
      secondary: '#6D28D9',
      border: 'border-purple-500',
      glow: 'shadow-purple-500/50',
      text: 'text-purple-300',
      bgGradient: 'from-purple-950 via-slate-900 to-indigo-950',
      iconBg: 'bg-purple-600'
    },
    rewardExp: 5800,
    rewardBadge: 'Càn Khôn Thần Thạch',
    rewardTitle: 'Chạm Vào Khởi Nguyên',
    questions: [
      {
        id: 'q49_1',
        question: 'Trong truyện thần thoại Việt Nam "Thần Trụ Trời", vị thần đã làm việc gì để chia tách trời và đất?',
        options: ['Tự mình đào đất, đập đá đắp thành một chiếc cột khổng lồ chống đỡ vòm trời cao vút', 'Thổi một hơi dài tách đôi mây đen', 'Dùng rìu chém đôi quả trứng khổng lồ', 'Dùng kiếm rạch một đường phân chia'],
        correctIndex: 0,
        explanation: 'Thần Trụ Trời đắp cột chống trời, sau khi trời đất phân minh thần phá cột ném đá tạo thành núi đồi sông biển.',
        damage: 50000
      },
      {
        id: 'q49_2',
        question: 'Bài ca dao nổi tiếng nào của dân tộc ta đúc kết thứ tự các vị thần khởi nguyên trong thần thoại?',
        options: ['"Nhất ông Đếm cát / Nhì ông Tát bể / Ba ông Kể sao / Bốn ông Đào sông / Năm ông Trồng cây / Sáu ông Xây rú / Bảy ông Trụ trời"', '"Công cha như núi Thái Sơn"', '"Bầu ơi thương lấy bí cùng"', '"Rủ nhau xem cảnh Kiếm Hồ"'],
        correctIndex: 0,
        explanation: 'Bài ca dao đố thần độc đáo thể hiện trí tưởng tượng phong phú và niềm tự hào lao động chinh phục thiên nhiên của cha ông.',
        damage: 49990
      },
      {
        id: 'q49_3',
        question: 'Kiệt tác văn học "Truyện Kiều" (Đoạn trường tân thanh) của Đại thi hào Nguyễn Du gồm có tất cả bao nhiêu câu thơ lục bát?',
        options: ['3.254 câu thơ lục bát', '1.000 câu thơ', '2.500 câu thơ', '5.000 câu thơ'],
        correctIndex: 0,
        explanation: '3.254 câu thơ lục bát tuyệt mỹ của "Truyện Kiều" là đỉnh cao chói lọi của ngôn ngữ văn học dân tộc.',
        damage: 50000
      }
    ]
  },
  {
    id: 50,
    order: 50,
    arenaName: 'Đấu trường 50: Đỉnh Thái Cực Hộ Quốc',
    bossName: 'Thần Chủ Thiên Giới',
    title: 'Tối Cao Hộ Quốc Văn Lang - Hào Quang Vĩnh Hằng',
    regionId: 5,
    regionName: 'Thiên Giới Huyền Bí',
    maxHp: 150000, // ĐÚNG CHÍNH XÁC GIỚI HẠN TỐI ĐA 150.000 HP PER SECTION IV
    level: 50,
    difficulty: 'Huyền thoại',
    origin: 'Biểu tượng kết tinh hào khí ngàn năm dựng nước và giữ nước của dân tộc Việt Nam (Đại trùm cuối 150.000 HP)',
    biography: 'Vị Thần Chủ chí tôn hội tụ linh khí của ngàn non cao, biển rộng, trống đồng Đông Sơn và trí tuệ bất diệt của năm mươi thế hệ Lạc Hồng. Ngài ngự tại đỉnh Thái Cực thử thách bài học cuối cùng về đạo đức, trí tuệ và khát vọng chinh phục tri thức số.',
    context: 'Đỉnh Thái Cực ngập tràn hào quang ngũ sắc, âm vang tiếng trống đồng Đông Sơn rền rĩ, hoa văn chim Lạc tung cánh rực rỡ khắp càn khôn.',
    personality: 'Chí cao vô thượng, đại trí đại từ, hun đúc hào khí và soi sáng tương lai đất Việt.',
    skills: ['Vạn Niên Hào Khí', 'Đông Sơn Thần Phách', 'Bách Việt Chí Tôn - 150.000 HP', 'Khải Hoàn Tri Thức Số'],
    avatarStyle: { symbol: '👑', badge: 'THẦN CHỦ TỐI CAO', accentColor: '#F43F5E' },
    theme: {
      primary: '#E11D48',
      secondary: '#BE123C',
      border: 'border-rose-500',
      glow: 'shadow-rose-500/50',
      text: 'text-rose-400',
      bgGradient: 'from-rose-950 via-slate-900 to-amber-950',
      iconBg: 'bg-rose-600'
    },
    rewardExp: 10000,
    rewardBadge: 'Vương Miện Trí Tuệ Vĩnh Cửu',
    rewardTitle: 'Đại Anh Hùng Tri Thức Số',
    questions: [
      {
        id: 'q50_1',
        question: 'Tác phẩm được xem là bản "Tuyên ngôn Độc lập đầu tiên" của dân tộc Việt Nam vang lên trên phòng tuyến sông Như Nguyệt năm 1077 là gì?',
        options: ['Bài thơ thần "Nam quốc sơn hà" (tương truyền của Lý Thường Kiệt)', 'Bình Ngô đại cáo của Nguyễn Trãi', 'Chiếu dời đô của Lý Công Uẩn', 'Tuyên ngôn Độc lập của Chủ tịch Hồ Chí Minh'],
        correctIndex: 0,
        explanation: '"Nam quốc sơn hà Nam đế cư / Tiệt nhiên định phận tại thiên thư / Như hà nghịch lỗ lai xâm phạm / Nhữ đẳng hành khan thủ bại hư".',
        damage: 50000
      },
      {
        id: 'q50_2',
        question: 'Ngày 2 tháng 9 năm 1945, tại Quảng trường Ba Đình lịch sử, Chủ tịch Hồ Chí Minh đã đọc bản văn kiện lịch sử vĩ đại nào?',
        options: ['Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa', 'Lời kêu gọi toàn quốc kháng chiến', 'Di chúc thiêng liêng', 'Báo cáo chính trị'],
        correctIndex: 0,
        explanation: 'Bản Tuyên ngôn Độc lập bất hủ ngày 2/9/1945 mở ra kỷ nguyên mới: Kỷ nguyên độc lập, tự do và chủ nghĩa xã hội.',
        damage: 50000
      },
      {
        id: 'q50_3',
        question: 'Mục tiêu thiêng liêng của thế hệ học sinh nhà trường hôm nay khi nỗ lực học tập và "Chinh phục tri thức số" là gì?',
        options: ['Rèn đức luyện tài, làm chủ công nghệ, xây dựng đất nước Việt Nam hùng cường và sánh vai cùng các cường quốc năm châu', 'Chỉ để thi đỗ điểm cao qua môn', 'Chỉ để chơi trò chơi giải trí', 'Chỉ phục vụ mục đích cá nhân'],
        correctIndex: 0,
        explanation: 'Thực hiện lời căn dặn của Bác Hồ kính yêu: "Non sông Việt Nam có trở nên tươi đẹp hay không, dân tộc Việt Nam có bước tới đài vinh quang để sánh vai với các cường quốc năm châu được hay không, chính là nhờ một phần lớn ở công học tập của các em".',
        damage: 50000
      }
    ]
  }
];

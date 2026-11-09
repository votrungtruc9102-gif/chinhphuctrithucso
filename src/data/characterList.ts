export interface PlayableCharacter {
  id: string;
  name: string;
  title: string;
  classType: 'Chiến Binh' | 'Pháp Sư' | 'Thủ Vệ' | 'Hiền Triết' | 'Sứ Giả' | 'Thiên Tài';
  avatar: string;
  iconBg: string;
  accentColor: string;
  specialSkill: string;
  lore: string;
}

export const PLAYABLE_CHARACTERS: PlayableCharacter[] = [
  {
    id: 'char_1',
    name: 'Lạc Long Quân',
    title: 'Thủy Thần Bách Việt',
    classType: 'Chiến Binh',
    avatar: '🐉',
    iconBg: 'bg-blue-600',
    accentColor: '#2563EB',
    specialSkill: 'Long Uy Trảm Hạn',
    lore: 'Ngự trị muôn loài thủy tộc, mang dòng máu rồng thiêng khai mở nền văn minh.'
  },
  {
    id: 'char_2',
    name: 'Âu Cơ',
    title: 'Địa Tiên Côn Lôn',
    classType: 'Hiền Triết',
    avatar: '🪶',
    iconBg: 'bg-emerald-600',
    accentColor: '#059669',
    specialSkill: 'Bách Việt Khai Sinh',
    lore: 'Mẫu nghi ngàn đời gieo mầm sự sống và đạo nghĩa cho trăm người con đất Việt.'
  },
  {
    id: 'char_3',
    name: 'Thánh Gióng',
    title: 'Phù Đổng Thiên Vương',
    classType: 'Chiến Binh',
    avatar: '⚡',
    iconBg: 'bg-amber-600',
    accentColor: '#D97706',
    specialSkill: 'Thiết Bổng Lôi Đình',
    lore: 'Vươn vai thành tráng sĩ, cưỡi ngựa sắt quét sạch quân thù bảo vệ giang sơn.'
  },
  {
    id: 'char_4',
    name: 'Sơn Tinh',
    title: 'Tản Viên Sơn Thánh',
    classType: 'Thủ Vệ',
    avatar: '⛰️',
    iconBg: 'bg-teal-700',
    accentColor: '#0F766E',
    specialSkill: 'Kê Thao Bạt Trĩ',
    lore: 'Đệ nhất phúc thần điều khiển núi đồi kiên cường chế ngự sóng thần cuồng nộ.'
  },
  {
    id: 'char_5',
    name: 'Chử Đồng Tử',
    title: 'Dạ Trạch Chân Nhân',
    classType: 'Pháp Sư',
    avatar: '🪷',
    iconBg: 'bg-rose-600',
    accentColor: '#E11D48',
    specialSkill: 'Gậy Thần Nón Diệu',
    lore: 'Chân nhân đại hiếu đắc đạo thần thông, tế độ muôn dân thoát cảnh đói nghèo.'
  },
  {
    id: 'char_6',
    name: 'Liễu Hạnh',
    title: 'Mẫu Nghi Thiên Hạ',
    classType: 'Pháp Sư',
    avatar: '🌸',
    iconBg: 'bg-pink-600',
    accentColor: '#DB2777',
    specialSkill: 'Ngũ Hành Linh Ứng',
    lore: 'Tiên thánh giáng trần phổ độ quần sinh, biểu tượng của sự tự do và trí tuệ.'
  },
  {
    id: 'char_7',
    name: 'Trần Hưng Đạo',
    title: 'Hưng Đạo Đại Vương',
    classType: 'Chiến Binh',
    avatar: '⚔️',
    iconBg: 'bg-indigo-700',
    accentColor: '#4338CA',
    specialSkill: 'Hịch Tướng Sĩ Trảm',
    lore: 'Vị tướng ba lần đánh bại giặc Nguyên Mông, tấm gương trung quân ái quốc ngời sáng.'
  },
  {
    id: 'char_8',
    name: 'Trần Quốc Toản',
    title: 'Hoài Văn Hầu',
    classType: 'Chiến Binh',
    avatar: '🍊',
    iconBg: 'bg-orange-600',
    accentColor: '#EA580C',
    specialSkill: 'Phá Cường Địch',
    lore: 'Thiếu niên anh dũng bóp nát quả cam, thêu cờ sáu chữ vàng xông pha trận mạc.'
  },
  {
    id: 'char_9',
    name: 'Quang Trung',
    title: 'Anh Hùng Áo Vải',
    classType: 'Chiến Binh',
    avatar: '🦅',
    iconBg: 'bg-red-700',
    accentColor: '#B91C1C',
    specialSkill: 'Thần Tốc Hành Quân',
    lore: 'Hoàng đế bách chiến bách thắng, đại phá quân Thanh trong mùa xuân Kỷ Dậu vang dội.'
  },
  {
    id: 'char_10',
    name: 'Lê Lợi',
    title: 'Bình Định Vương',
    classType: 'Chiến Binh',
    avatar: '🗡️',
    iconBg: 'bg-yellow-700',
    accentColor: '#A16207',
    specialSkill: 'Thuận Thiên Kiếm Pháp',
    lore: 'Khởi nghĩa Lam Sơn kiên trì mười năm nếm mật nằm gai giành lại độc lập non sông.'
  },
  {
    id: 'char_11',
    name: 'Nguyễn Trãi',
    title: 'Ức Trai Đại Nho',
    classType: 'Hiền Triết',
    avatar: '📜',
    iconBg: 'bg-cyan-700',
    accentColor: '#0E7490',
    specialSkill: 'Bình Ngô Đại Cáo',
    lore: 'Danh nhân văn hóa thế giới, ngòi bút sắc bén cứu nước hơn mười vạn tinh binh.'
  },
  {
    id: 'char_12',
    name: 'Chu Văn An',
    title: 'Vạn Thế Sư Biểu',
    classType: 'Hiền Triết',
    avatar: '🎓',
    iconBg: 'bg-slate-700',
    accentColor: '#334155',
    specialSkill: 'Thất Trảm Thư Quyết',
    lore: 'Người thầy của muôn đời, cương trực thanh cao, đặt trọn tâm huyết vì sự nghiệp giáo dục.'
  },
  {
    id: 'char_13',
    name: 'Lê Quý Đôn',
    title: 'Bác Học Thông Tuệ',
    classType: 'Thiên Tài',
    avatar: '📚',
    iconBg: 'bg-purple-700',
    accentColor: '#7E22CE',
    specialSkill: 'Vân Đài Loại Ngữ',
    lore: 'Nhà bác học uyên thâm hàng đầu của dân tộc, tinh thông thiên văn, địa lý, sử sách.'
  },
  {
    id: 'char_14',
    name: 'Lương Thế Vinh',
    title: 'Trạng Lường Đo Đạt',
    classType: 'Thiên Tài',
    avatar: '📐',
    iconBg: 'bg-blue-700',
    accentColor: '#1D4ED8',
    specialSkill: 'Đại Thành Toán Pháp',
    lore: 'Trạng nguyên tài hoa phát minh bàn tính, cân voi đong thuyền xuất quỷ nhập thần.'
  },
  {
    id: 'char_15',
    name: 'Hai Bà Trưng',
    title: 'Nữ Vương Mê Linh',
    classType: 'Chiến Binh',
    avatar: '🐘',
    iconBg: 'bg-rose-700',
    accentColor: '#BE123C',
    specialSkill: 'Hát Giang Khởi Binh',
    lore: 'Hai nữ tướng cưỡi voi phất cờ khởi nghĩa, rửa thù nợ nước dấy nghiệp độc lập.'
  },
  {
    id: 'char_16',
    name: 'Bà Triệu',
    title: 'Nhụy Kiều Tướng Quân',
    classType: 'Chiến Binh',
    avatar: '🌊',
    iconBg: 'bg-fuchsia-700',
    accentColor: '#A21CAF',
    specialSkill: 'Cưỡi Cơn Gió Mạnh',
    lore: '"Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông".'
  },
  {
    id: 'char_17',
    name: 'Ngô Quyền',
    title: 'Tiền Ngô Vương',
    classType: 'Chiến Binh',
    avatar: '⚓',
    iconBg: 'bg-sky-700',
    accentColor: '#0369A1',
    specialSkill: 'Cọc Nhọn Bạch Đằng',
    lore: 'Đại thắng sông Bạch Đằng năm 938 chấm dứt hơn 1000 năm Bắc thuộc mở ra kỷ nguyên độc lập.'
  },
  {
    id: 'char_18',
    name: 'Đinh Bộ Lĩnh',
    title: 'Vạn Thắng Vương',
    classType: 'Chiến Binh',
    avatar: '🚩',
    iconBg: 'bg-red-800',
    accentColor: '#991B1B',
    specialSkill: 'Cờ Lau Tập Trận',
    lore: 'Dẹp loạn 12 sứ quân, thống nhất non sông, lập nên nhà nước Đại Cồ Việt.'
  },
  {
    id: 'char_19',
    name: 'Lý Thường Kiệt',
    title: 'Thái Úy Phá Tống',
    classType: 'Chiến Binh',
    avatar: '🛡️',
    iconBg: 'bg-amber-700',
    accentColor: '#B45309',
    specialSkill: 'Nam Quốc Sơn Hà',
    lore: 'Nhà quân sự thiên tài, bản tuyên ngôn bên bờ sông Như Nguyệt lưu danh muôn thuở.'
  },
  {
    id: 'char_20',
    name: 'Yết Kiêu',
    title: 'Thủy Thần Kình Ngư',
    classType: 'Thủ Vệ',
    avatar: '🐟',
    iconBg: 'bg-teal-600',
    accentColor: '#0D9488',
    specialSkill: 'Thần Tốc Lặn Biển',
    lore: 'Đục thủng hàng chục chiến thuyền giặc, bơi lặn như rái cá dưới đáy nước sâu.'
  },
  {
    id: 'char_21',
    name: 'Dã Tượng',
    title: 'Dũng Sĩ Quản Tượng',
    classType: 'Thủ Vệ',
    avatar: '🦣',
    iconBg: 'bg-stone-700',
    accentColor: '#44403C',
    specialSkill: 'Thiết Thiết Đột Kích',
    lore: 'Vị gia tướng trung thành như núi Thái Sơn, điều khiển đội tượng binh bách chiến.'
  },
  {
    id: 'char_22',
    name: 'Trần Bình Trọng',
    title: 'Bảo Nghĩa Vương',
    classType: 'Chiến Binh',
    avatar: '🔥',
    iconBg: 'bg-red-600',
    accentColor: '#DC2626',
    specialSkill: 'Thà Làm Quỷ Nước Nam',
    lore: '"Ta thà làm quỷ nước Nam chứ không thèm làm vương đất Bắc" - Khí tiết bất diệt.'
  },
  {
    id: 'char_23',
    name: 'Nguyễn Bỉnh Khiêm',
    title: 'Trạng Trình Tiên Tri',
    classType: 'Hiền Triết',
    avatar: '🔮',
    iconBg: 'bg-violet-800',
    accentColor: '#5B21B6',
    specialSkill: 'Bạch Vân Thi Tập',
    lore: 'Bậc đại triết gia thấu suốt lẽ trời đất, khuyên dời cõi nam tạo thế vững muôn đời.'
  },
  {
    id: 'char_24',
    name: 'Hải Thượng Lãn Ông',
    title: 'Đại Y Sư Lê Hữu Trác',
    classType: 'Hiền Triết',
    avatar: '🌿',
    iconBg: 'bg-green-700',
    accentColor: '#15803D',
    specialSkill: 'Y Tông Tâm Lĩnh',
    lore: 'Cứu nhân độ thế, tấm lòng y đức sáng rực, đúc kết kho tàng nam dược quý giá.'
  },
  {
    id: 'char_25',
    name: 'Nguyễn Du',
    title: 'Đại Thi Hào Tố Như',
    classType: 'Hiền Triết',
    avatar: '✍️',
    iconBg: 'bg-indigo-800',
    accentColor: '#3730A3',
    specialSkill: 'Đoạn Trường Kiều Ca',
    lore: 'Tiếng thơ chan chứa tình thương nhân loại, kiệt tác Truyện Kiều ngàn đời ngân vang.'
  },
  {
    id: 'char_26',
    name: 'Hồ Xuân Hương',
    title: 'Bà Chúa Thơ Nôm',
    classType: 'Hiền Triết',
    avatar: '🪞',
    iconBg: 'bg-pink-700',
    accentColor: '#BE185D',
    specialSkill: 'Thi Bá Tự Do',
    lore: 'Cá tính độc đáo phi thường, ngòi bút châm biếm sâu cay đòi quyền sống bình đẳng cho phụ nữ.'
  },
  {
    id: 'char_27',
    name: 'Cao Bá Quát',
    title: 'Thần Siêu Thánh Quát',
    classType: 'Hiền Triết',
    avatar: '🖋️',
    iconBg: 'bg-cyan-800',
    accentColor: '#155E75',
    specialSkill: 'Khí Phách Hoa Mai',
    lore: '"Cả đời chỉ cúi đầu trước hoa mai", khí phách hiên ngang rạng rỡ thi đàn.'
  },
  {
    id: 'char_28',
    name: 'Mạc Đĩnh Chi',
    title: 'Lưỡng Quốc Trạng Nguyên',
    classType: 'Thiên Tài',
    avatar: '🪷',
    iconBg: 'bg-emerald-700',
    accentColor: '#047857',
    specialSkill: 'Ngọc Tỉnh Liên',
    lore: 'Tài năng ứng đối xuất chúng làm kinh ngạc sứ quán phương Bắc, hoa sen giếng ngọc thơm ngát.'
  },
  {
    id: 'char_29',
    name: 'Nguyễn Tri Phương',
    title: 'Tiết Chế Quân Vụ',
    classType: 'Chiến Binh',
    avatar: '🛡️',
    iconBg: 'bg-amber-800',
    accentColor: '#92400E',
    specialSkill: 'Quyết Tử Thành Hà Nội',
    lore: 'Trung kiên thà nhịn đói chết vì nước chứ quyết không khuất phục trước giặc ngoại xâm.'
  },
  {
    id: 'char_30',
    name: 'Hoàng Diệu',
    title: 'Tổng Đốc Tuẫn Tiết',
    classType: 'Chiến Binh',
    avatar: '🏯',
    iconBg: 'bg-slate-800',
    accentColor: '#1E293B',
    specialSkill: 'Khí Tiết Bắc Thành',
    lore: 'Một lòng vì dân vì nước, tuẫn tiết tại đền Võ Miếu giữ trọn danh dự của bậc sĩ phu.'
  },
  {
    id: 'char_31',
    name: 'Phan Bội Châu',
    title: 'Sào Nam Chí Sĩ',
    classType: 'Sứ Giả',
    avatar: '🌅',
    iconBg: 'bg-orange-700',
    accentColor: '#C2410C',
    specialSkill: 'Phong Trào Đông Du',
    lore: 'Thổi bùng ngọn lửa yêu nước, kêu gọi thanh niên du học tự cường canh tân đất nước.'
  },
  {
    id: 'char_32',
    name: 'Phan Châu Trinh',
    title: 'Tây Hồ Bất Hủ',
    classType: 'Sứ Giả',
    avatar: '🏮',
    iconBg: 'bg-yellow-800',
    accentColor: '#854D0E',
    specialSkill: 'Khai Dân Trí',
    lore: '"Khai dân trí, chấn dân khí, hậu dân sinh" - Ngọn cờ canh tân giáo dục bất diệt.'
  },
  {
    id: 'char_33',
    name: 'Kim Đồng',
    title: 'Thiếu Niên Anh Dũng',
    classType: 'Sứ Giả',
    avatar: '🎺',
    iconBg: 'bg-red-500',
    accentColor: '#EF4444',
    specialSkill: 'Tiếng Còi Báo Động',
    lore: 'Đội trưởng Đội Thiếu niên Tiền phong, thông minh dũng cảm hy sinh anh dũng tuổi 14.'
  },
  {
    id: 'char_34',
    name: 'Võ Thị Sáu',
    title: 'Bông Sen Đất Đỏ',
    classType: 'Chiến Binh',
    avatar: '🌺',
    iconBg: 'bg-rose-500',
    accentColor: '#F43F5E',
    specialSkill: 'Khí Phách Côn Đảo',
    lore: 'Nụ cười ngẩng cao đầu trước họng súng quân thù, bông hoa bất tử của tuổi trẻ Việt Nam.'
  },
  {
    id: 'char_35',
    name: 'Lý Tự Trọng',
    title: 'Người Đoàn Viên Đầu Tiên',
    classType: 'Sứ Giả',
    avatar: '⭐',
    iconBg: 'bg-blue-500',
    accentColor: '#3B82F6',
    specialSkill: 'Con Đường Thanh Niên',
    lore: '"Con đường của thanh niên chỉ là con đường cách mạng chứ không thể có con đường nào khác".'
  },
  {
    id: 'char_36',
    name: 'Tô Vĩnh Diện',
    title: 'Thân Chèn Pháo',
    classType: 'Thủ Vệ',
    avatar: '🧱',
    iconBg: 'bg-zinc-700',
    accentColor: '#3F3F46',
    specialSkill: 'Thân Mình Giữ Pháo',
    lore: 'Lấy thân mình chèn pháo trên dốc Điện Biên Phủ lửa đạn, bảo toàn khẩu trọng pháo thiêng liêng.'
  },
  {
    id: 'char_37',
    name: 'Bế Văn Đàn',
    title: 'Giá Súng Thép',
    classType: 'Thủ Vệ',
    avatar: '🎯',
    iconBg: 'bg-stone-600',
    accentColor: '#57534E',
    specialSkill: 'Thân Làm Giá Súng',
    lore: 'Lấy đôi vai làm giá súng cho đồng đội tiêu diệt giặc, biểu tượng bất khuất của người chiến sĩ.'
  },
  {
    id: 'char_38',
    name: 'Phan Đình Giót',
    title: 'Lấp Lỗ Châu Mai',
    classType: 'Thủ Vệ',
    avatar: '🎖️',
    iconBg: 'bg-amber-900',
    accentColor: '#78350F',
    specialSkill: 'Chắn Lửa Đồn Him Lam',
    lore: 'Lấy thân mình lấp lỗ châu mai mở đường cho quân ta xung phong tiêu diệt cứ điểm Him Lam.'
  },
  {
    id: 'char_39',
    name: 'Nguyễn Văn Trỗi',
    title: 'Tiếng Hát Trên Cầu',
    classType: 'Chiến Binh',
    avatar: '🕊️',
    iconBg: 'bg-sky-600',
    accentColor: '#0284C7',
    specialSkill: 'Lời Hiệu Triệu Bất Diệt',
    lore: 'Giây phút hiên ngang trên pháp trường, dâng hiến trọn vẹn tuổi thanh xuân cho non sông.'
  },
  {
    id: 'char_40',
    name: 'Nguyễn Viết Xuân',
    title: 'Nhằm Thẳng Quân Thù',
    classType: 'Chiến Binh',
    avatar: '🚀',
    iconBg: 'bg-emerald-800',
    accentColor: '#065F46',
    specialSkill: 'Nhằm Thẳng Bắn!',
    lore: '"Nhằm thẳng quân thù mà bắn!" - Câu khẩu lệnh rực lửa tiếp thêm sức mạnh cho các chiến sĩ phòng không.'
  },
  {
    id: 'char_41',
    name: 'Khai Sáng Số (Code Knight)',
    title: 'Hiệp Sĩ Thuật Toán',
    classType: 'Thiên Tài',
    avatar: '💻',
    iconBg: 'bg-cyan-600',
    accentColor: '#0891B2',
    specialSkill: 'Phân Tích Nhị Phân',
    lore: 'Làm chủ ngôn ngữ lập trình Scratch & Python, gỡ lỗi và giải quyết mọi thuật toán phức tạp.'
  },
  {
    id: 'char_42',
    name: 'Mật Mã Trí Tuệ (Cyber Sentinel)',
    title: 'Vệ Binh An Toàn Thông Tin',
    classType: 'Thủ Vệ',
    avatar: '🔐',
    iconBg: 'bg-indigo-600',
    accentColor: '#4F46E5',
    specialSkill: 'Tường Lửa Mã Hóa',
    lore: 'Bảo vệ dữ liệu số, phòng chống gian lận và giữ gìn môi trường Internet an toàn lành mạnh.'
  },
  {
    id: 'char_43',
    name: 'Nhà Du Hành Dữ Liệu (Data Voyager)',
    title: 'Thám Tử Khoa Học Số',
    classType: 'Thiên Tài',
    avatar: '🛰️',
    iconBg: 'bg-violet-600',
    accentColor: '#7C3AED',
    specialSkill: 'Thống Kê Dự Đoán',
    lore: 'Khai phá dữ liệu lớn, chuyển đổi thông tin thành tri thức hữu ích cho cuộc sống.'
  },
  {
    id: 'char_44',
    name: 'Nhà Sinh Học Xanh (Bio Pioneer)',
    title: 'Kỹ Sư Hệ Sinh Thái',
    classType: 'Hiền Triết',
    avatar: '🧬',
    iconBg: 'bg-green-600',
    accentColor: '#16A34A',
    specialSkill: 'Quang Hợp Sinh Lực',
    lore: 'Khám phá bí ẩn chuỗi ADN, tế bào và quy luật phát triển bền vững của tự nhiên.'
  },
  {
    id: 'char_45',
    name: 'Nhà Vật Lý Lượng Tử (Quantum Ace)',
    title: 'Bậc Thầy Năng Lượng',
    classType: 'Thiên Tài',
    avatar: '⚛️',
    iconBg: 'bg-purple-600',
    accentColor: '#9333EA',
    specialSkill: 'Từ Trường Siêu Dẫn',
    lore: 'Thấu hiểu cấu trúc hạt, nguyên tử và các định luật vận động của vũ trụ vô tận.'
  },
  {
    id: 'char_46',
    name: 'Nhà Giả Kim Hóa Học (Chemical Alchemist)',
    title: 'Nhà Phát Minh Phản Ứng',
    classType: 'Thiên Tài',
    avatar: '🧪',
    iconBg: 'bg-yellow-600',
    accentColor: '#CA8A04',
    specialSkill: 'Dung Dịch Kết Tủa',
    lore: 'Điều chế những hợp chất kỳ diệu, biến đổi vật chất phục vụ lợi ích nhân loại.'
  },
  {
    id: 'char_47',
    name: 'Nhà Khảo Cổ Lịch Sử (Time Chrono)',
    title: 'Người Gác Đền Quá Khứ',
    classType: 'Hiền Triết',
    avatar: '🧭',
    iconBg: 'bg-stone-800',
    accentColor: '#292524',
    specialSkill: 'Ký Ức Thời Gian',
    lore: 'Kết nối những trang sử vàng, gìn giữ di sản và truyền thống yêu nước của cha ông.'
  },
  {
    id: 'char_48',
    name: 'Sứ Giả Địa Cầu (Earth Guardian)',
    title: 'Hoa Tiêu Địa Lý',
    classType: 'Sứ Giả',
    avatar: '🌍',
    iconBg: 'bg-teal-800',
    accentColor: '#115E59',
    specialSkill: 'Bản Đồ Ngũ Hành',
    lore: 'Khám phá địa hình, khí hậu, tài nguyên và bản đồ các châu lục trên hành tinh xanh.'
  },
  {
    id: 'char_49',
    name: 'Hùng Biện Song Ngữ (Polyglot Herald)',
    title: 'Sứ Giả Văn Hóa Quốc Tế',
    classType: 'Sứ Giả',
    avatar: '🗣️',
    iconBg: 'bg-blue-800',
    accentColor: '#1E40AF',
    specialSkill: 'Hùng Biện Toàn Cầu',
    lore: 'Làm chủ ngoại ngữ tiếng Anh, tự tin giao lưu kết nối bạn bè năm châu bốn biển.'
  },
  {
    id: 'char_50',
    name: 'Trí Tuệ Nhân Tạo (AI Assistant)',
    title: 'Hộ Thần Kỷ Nguyên Số',
    classType: 'Thiên Tài',
    avatar: '🤖',
    iconBg: 'bg-gradient-to-tr from-cyan-600 via-indigo-600 to-fuchsia-600',
    accentColor: '#6366F1',
    specialSkill: 'Hội Tụ Tri Thức Số',
    lore: 'Kết tinh tinh hoa học vấn của ngôi nhà trường, dẫn dắt học sinh vươn tới tương lai.'
  }
];

export const STUDENT_TITLES = [
  'Tân Thủ Khám Phá',
  'Học Tinh Cần Mẫn',
  'Chiến Binh Tri Thức',
  'Ngôi Sao Trắc Nghiệm',
  'Bậc Thầy Toán Học',
  'Nhà Ngôn Ngữ Trẻ',
  'Nhà Khoa Học Tương Lai',
  'Vệ Binh Công Nghệ',
  'Kỵ Sĩ Tri Thức',
  'Huyền Thoại Trí Tuệ',
  'Quán Quân Đấu Trường',
  'Đại Trạng Nguyên Mỹ Hòa'
];

export const AVATAR_SEEDS = [
  { id: 'av_1', emoji: '🧑‍🎓', name: 'Học sinh Ưu tú', bg: 'bg-blue-500' },
  { id: 'av_2', emoji: '👩‍🎓', name: 'Nữ sinh Tinh anh', bg: 'bg-pink-500' },
  { id: 'av_3', emoji: '🧑‍💻', name: 'Lập trình viên Nhí', bg: 'bg-indigo-500' },
  { id: 'av_4', emoji: '👩‍🔬', name: 'Nhà Khoa học Trẻ', bg: 'bg-emerald-500' },
  { id: 'av_5', emoji: '🧑‍🚀', name: 'Phi hành gia Tương lai', bg: 'bg-purple-500' },
  { id: 'av_6', emoji: '🦁', name: 'Sư tử Quả cảm', bg: 'bg-amber-500' },
  { id: 'av_7', emoji: '🦅', name: 'Đại bàng Trí tuệ', bg: 'bg-orange-500' },
  { id: 'av_8', emoji: '🐉', name: 'Rồng thiêng Lạc Việt', bg: 'bg-red-500' },
  { id: 'av_9', emoji: '🦊', name: 'Hồ ly Nhanh nhẹn', bg: 'bg-orange-600' },
  { id: 'av_10', emoji: '🦄', name: 'Kỳ lân Tinh khôi', bg: 'bg-violet-500' },
  { id: 'av_11', emoji: '⚡', name: 'Tia chớp Tốc độ', bg: 'bg-yellow-500' },
  { id: 'av_12', emoji: '🌟', name: 'Ngôi sao Sáng rực', bg: 'bg-amber-400' }
];

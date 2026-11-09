export type AnatomicalGroup =
  | 'neck'        // 1. Cổ
  | 'shoulder'    // 2. Vai
  | 'elbow_arm'   // 3. Khuỷu tay & Cánh tay
  | 'wrist_hand'  // 4. Cổ tay & Ngón tay
  | 'torso_waist' // 5. Thân & Eo
  | 'hip'         // 6. Hông
  | 'knee_leg'    // 7. Đầu gối & Chân
  | 'ankle_foot'; // 8. Cổ chân & Bàn chân

export interface ExerciseMovement {
  id: string;
  group: AnatomicalGroup;
  groupNumber: number; // 1 to 8
  groupName: string;
  name: string;
  vietnameseName: string;
  icon: string;
  description: string;
  benefit: string;
  defaultReps: number;
  guideSteps: string[];
  animationType:
    | 'neck_tilt'
    | 'shoulder_roll'
    | 'arm_curl'
    | 'wrist_roll'
    | 'torso_twist'
    | 'hip_rotation'
    | 'knee_squat'
    | 'ankle_roll'
    | 'squat'
    | 'stretch'
    | 'jump'
    | 'arm_circle'
    | 'breathe';
}

export interface ExerciseQuestion {
  id: string;
  question: string;
  grade: number; // 6, 7, 8, 9
  targetClass?: '6A5' | '7A5' | '8A5' | '9A5' | 'all';
  subject: string;
  questionType?: 'multiple_choice' | 'short_answer';
  options: string[];
  correctAnswer: number;
  acceptableAnswers?: string[]; // Cho dạng điền từ ngắn
  explanation: string;
  movementId: string;
  reps: number;
  timeLimitSec: number;
}

export const EXERCISE_MOVEMENTS: ExerciseMovement[] = [
  // 1. CỔ (NECK)
  {
    id: 'neck_flexion',
    group: 'neck',
    groupNumber: 1,
    groupName: '1. Vùng Cổ (Neck)',
    name: 'Gập ngửa xoay cổ giải mỏi',
    vietnameseName: 'Thư giãn đốt sống cổ C1-C7',
    icon: '🦒',
    description: 'Ngồi hoặc đứng thẳng lưng, từ từ cúi đầu gập cằm về ngực, ngửa nhẹ ra sau rồi nghiêng tai sang hai vai.',
    benefit: 'Giải tỏa tức thì co thắt cơ nâng vai và đốt sống cổ do cúi nhìn màn hình máy tính lâu.',
    defaultReps: 6,
    guideSteps: [
      'Bước 1: Giữ lưng thẳng, mắt nhìn thẳng phía trước.',
      'Bước 2: Từ từ cúi cằm chạm ngực, thở ra chậm rãi.',
      'Bước 3: Ngửa đầu ra sau nhẹ nhàng góc 45 độ, hít sâu.',
      'Bước 4: Nghiêng tai phải về vai phải, đổi bên sang tai trái.'
    ],
    animationType: 'neck_tilt'
  },

  // 2. VAI (SHOULDERS)
  {
    id: 'shoulder_roll',
    group: 'shoulder',
    groupNumber: 2,
    groupName: '2. Khớp Vai (Shoulders)',
    name: 'Xoay cuộn khớp vai mở ngực',
    vietnameseName: 'Mở rộng lồng ngực & cơ thang',
    icon: '💪',
    description: 'Đặt nhẹ các đầu ngón tay lên chóp vai, xoay tròn hai cùi chỏ từ trước lên trên ra sau hết biên độ.',
    benefit: 'Kích thích tuần hoàn máu lên não, mở rộng dung tích hô hấp và chống gù lưng học đường.',
    defaultReps: 8,
    guideSteps: [
      'Bước 1: Chạm 5 đầu ngón tay lên khớp vai cùng bên.',
      'Bước 2: Ép hai cùi chỏ chạm nhau trước ngực.',
      'Bước 3: Nâng cùi chỏ lên cao qua tai, mở rộng ra sau.',
      'Bước 4: Hít sâu khi mở ngực và thở đều khi hạ xuống.'
    ],
    animationType: 'shoulder_roll'
  },

  // 3. KHUỶU TAY & CÁNH TAY (ELBOWS & ARMS)
  {
    id: 'arm_elbow_extension',
    group: 'elbow_arm',
    groupNumber: 3,
    groupName: '3. Khuỷu tay & Cánh tay (Elbows/Arms)',
    name: 'Gập duỗi cánh tay tiếp năng lượng',
    vietnameseName: 'Kéo giãn cơ nhị đầu & tam đầu cánh tay',
    icon: '⚡',
    description: 'Dang hai tay sang ngang hoặc đưa thẳng về phía trước, gập cẳng tay chạm vai rồi duỗi thẳng dứt khoát.',
    benefit: 'Xua tan tê bì bắp tay và mỏi khuỷu tay do tư thế tì đè lên bàn học khi ghi chép bài.',
    defaultReps: 10,
    guideSteps: [
      'Bước 1: Đưa hai tay thẳng về phía trước ngang tầm vai.',
      'Bước 2: Nắm nhẹ tay và gập gập khuỷu tay đưa nắm tay về sát vai.',
      'Bước 3: Duỗi thẳng hai tay ra phía trước, xòe căng các ngón tay.',
      'Bước 4: Lặp lại nhịp nhàng theo nhịp thở đều đặn.'
    ],
    animationType: 'arm_curl'
  },

  // 4. CỔ TAY & NGÓN TAY (WRISTS & FINGERS)
  {
    id: 'wrist_roll',
    group: 'wrist_hand',
    groupNumber: 4,
    groupName: '4. Cổ tay & Ngón tay (Wrists/Fingers)',
    name: 'Xoay cổ tay và sóng ngón tay dẻo dai',
    vietnameseName: 'Phục hồi linh hoạt khớp bàn ngón tay',
    icon: '🖐️',
    description: 'Đan hai bàn tay vào nhau xoay hình số 8, sau đó xòe và nắm chặt các ngón tay 10 lần liên tục.',
    benefit: 'Chống hội chứng ống cổ tay, tăng tốc độ gõ phím máy vi tính và nét chữ mềm mại.',
    defaultReps: 10,
    guideSteps: [
      'Bước 1: Đan các ngón tay của hai bàn tay lại với nhau.',
      'Bước 2: Xoay tròn cổ tay nhẹ nhàng theo chuyển động hình số 8.',
      'Bước 3: Tách hai tay ra, xòe căng hết cỡ các ngón tay.',
      'Bước 4: Nắm chặt bàn tay rồi bung ra thật nhanh 5 lần.'
    ],
    animationType: 'wrist_roll'
  },

  // 5. THÂN & EO (TORSO & WAIST)
  {
    id: 'torso_waist_twist',
    group: 'torso_waist',
    groupNumber: 5,
    groupName: '5. Thân & Eo (Torso/Waist)',
    name: 'Vặn mình xoay lườn kéo giãn cột sống',
    vietnameseName: 'Giải tỏa chèn ép đĩa đệm thắt lưng',
    icon: '🌪️',
    description: 'Hai chân đứng rộng bằng vai, hai tay chống hông hoặc co trước ngực, xoay vặn thân trên sang trái rồi sang phải.',
    benefit: 'Tăng cường độ đàn hồi của cơ liên sườn và cột sống, giúp dáng ngồi học luôn thẳng đẹp.',
    defaultReps: 8,
    guideSteps: [
      'Bước 1: Đứng thẳng, chân mở rộng bằng vai, hai tay gập ngang ngực.',
      'Bước 2: Xoay chậm thân người sang bên trái góc 90 độ, giữ hông cố định.',
      'Bước 3: Quay trở về giữa rồi tiếp tục xoay sang bên phải.',
      'Bước 4: Kết hợp thở ra khi vặn mình và hít vào khi về vị trí giữa.'
    ],
    animationType: 'torso_twist'
  },

  // 6. KHỚP HÔNG (HIPS)
  {
    id: 'hip_rotation',
    group: 'hip',
    groupNumber: 6,
    groupName: '6. Khớp Hông (Hips)',
    name: 'Xoay tròn khớp hông linh hoạt',
    vietnameseName: 'Khai thông khớp háng và thắt lưng',
    icon: '🔄',
    description: 'Đứng hai chân rộng hơn vai, hai tay chống hông, nhẹ nhàng xoay hông thành vòng tròn lớn theo chiều kim đồng hồ rồi ngược lại.',
    benefit: 'Giải tỏa sự ứ trệ tuần hoàn máu ở vùng chậu do ngồi học liên tục trên ghế.',
    defaultReps: 8,
    guideSteps: [
      'Bước 1: Đứng vững hai chân rộng bằng vai, hai tay chống hông.',
      'Bước 2: Đẩy hông sang trái, ra trước, sang phải rồi ra sau thành vòng tròn.',
      'Bước 3: Thực hiện 4 vòng theo chiều kim đồng hồ.',
      'Bước 4: Đổi chiều xoay ngược lại 4 vòng nhịp nhàng.'
    ],
    animationType: 'hip_rotation'
  },

  // 7. ĐẦU GỐI & CHÂN (KNEES & LEGS)
  {
    id: 'squat_power',
    group: 'knee_leg',
    groupNumber: 7,
    groupName: '7. Đầu gối & Chân (Knees/Legs)',
    name: 'Squat gập gối tiếp lửa sức bền',
    vietnameseName: 'Vận động khớp gối và cơ đùi trước',
    icon: '🦵',
    description: 'Hạ hông xuống như đang ngồi vào ghế vững chãi, giữ đầu gối không vượt mũi chân rồi dùng lực đùi đẩy đứng thẳng dậy.',
    benefit: 'Bơm máu giàu oxy từ chi dưới trở về tim và não bộ, kích thích sự tỉnh táo tức thì.',
    defaultReps: 6,
    guideSteps: [
      'Bước 1: Hai bàn chân hướng nhẹ ra ngoài, rộng bằng vai.',
      'Bước 2: Đẩy hông ra sau và từ từ hạ trọng tâm xuống.',
      'Bước 3: Giữ lưng thẳng, mắt nhìn về phía trước.',
      'Bước 4: Dồn lực vào gót chân và đứng thẳng dậy.'
    ],
    animationType: 'knee_squat'
  },

  // 8. CỔ CHÂN & BÀN CHÂN (ANKLES & FEET)
  {
    id: 'ankle_foot_roll',
    group: 'ankle_foot',
    groupNumber: 8,
    groupName: '8. Cổ chân & Bàn chân (Ankles/Feet)',
    name: 'Xoay cổ chân & nhón gót kích hoạt bắp chân',
    vietnameseName: 'Kích hoạt tim ngoại vi ở bắp chân',
    icon: '👟',
    description: 'Chống mũi chân xuống sàn và xoay tròn cổ chân nhẹ nhàng, sau đó đứng thẳng kiễng nhón gót chân lên cao.',
    benefit: 'Thúc đẩy van tĩnh mạch chân đẩy máu về tim, chống mỏi và tê cứng bàn chân.',
    defaultReps: 8,
    guideSteps: [
      'Bước 1: Đứng thẳng, chuyển trọng lượng sang chân trái.',
      'Bước 2: Mũi chân phải chạm sàn, xoay tròn cổ chân theo vòng cung 5 lần.',
      'Bước 3: Đổi bên xoay cổ chân trái tương tự.',
      'Bước 4: Cả hai chân cùng kiễng gót chân lên giữ 2 giây rồi hạ xuống.'
    ],
    animationType: 'ankle_roll'
  },

  // Giữ lại các ID cũ để tương thích bài tập cũ
  {
    id: 'stretch_reach',
    group: 'shoulder',
    groupNumber: 2,
    groupName: '2. Khớp Vai (Shoulders)',
    name: 'Vươn vai đón bình minh',
    vietnameseName: 'Vươn cao tay hít sâu',
    icon: '🧘',
    description: 'Đứng thẳng, hai tay đan chéo vươn cao qua đầu, ngửa nhẹ cổ và hít sâu kéo giãn cơ lưng.',
    benefit: 'Giải tỏa mỏi mắt và đau mỏi vai gáy sau giờ ngồi học máy tính.',
    defaultReps: 5,
    guideSteps: [
      'Bước 1: Hai chân rộng bằng vai, giữ lưng thẳng tự nhiên.',
      'Bước 2: Hai tay đan vào nhau, từ từ đẩy lòng bàn tay hướng lên trời.',
      'Bước 3: Hít sâu bằng mũi, kiễng gót chân lên giữ trong 3 giây.',
      'Bước 4: Thở ra nhẹ nhàng bằng miệng và hạ tay xuống.'
    ],
    animationType: 'stretch'
  },
  {
    id: 'deep_breath',
    group: 'neck',
    groupNumber: 1,
    groupName: '1. Vùng Cổ (Neck)',
    name: 'Hít thở 4 thì thanh lọc tâm trí',
    vietnameseName: 'Hít thở sâu kiểu hộp (Box Breathing)',
    icon: '🍃',
    description: 'Hít vào 4 giây, nín thở 4 giây, thở ra 4 giây và giữ 4 giây giúp não bộ bình tĩnh tập trung.',
    benefit: 'Kích hoạt hệ thần kinh phó giao cảm, giảm căng thẳng thi cử hiệu quả.',
    defaultReps: 4,
    guideSteps: [
      'Bước 1: Nhắm mắt lại thư giãn, hít sâu bằng mũi đếm từ 1 đến 4.',
      'Bước 2: Nín thở giữ hơi trong lồng ngực đếm từ 1 đến 4.',
      'Bước 3: Thở ra từ từ chậm rãi bằng miệng đếm từ 1 đến 4.',
      'Bước 4: Nín thở nghỉ ngơi trong 4 giây rồi lặp lại chu kỳ mới.'
    ],
    animationType: 'breathe'
  }
];

export const INITIAL_EXERCISE_QUESTIONS: ExerciseQuestion[] = [
  // LỚP 6A5
  {
    id: 'ex_6a5_1',
    question: 'Trong môn Tin học 6, thiết bị nào giữ vai trò "bộ não" thực hiện tính toán và điều khiển toàn hệ thống máy tính?',
    grade: 6,
    targetClass: '6A5',
    subject: 'Tin học',
    questionType: 'multiple_choice',
    options: ['CPU (Bộ vi xử lý trung tâm)', 'RAM (Bộ nhớ trong)', 'Ổ đĩa cứng SSD', 'Màn hình hiển thị'],
    correctAnswer: 0,
    acceptableAnswers: ['CPU', 'Bo vi xu ly', 'Bo vi xu ly trung tam'],
    explanation: 'CPU (Central Processing Unit) là bộ não của máy vi tính, thực hiện các lệnh chương trình và xử lý dữ liệu số.',
    movementId: 'neck_flexion',
    reps: 6,
    timeLimitSec: 45
  },
  {
    id: 'ex_6a5_2',
    question: 'Ngôi trường thân yêu của chúng ta có tên gọi chính thức là gì?',
    grade: 6,
    targetClass: '6A5',
    subject: 'Giáo dục công dân',
    questionType: 'multiple_choice',
    options: ['Trường THCS Mỹ Hòa', 'Trường THCS Chu Văn An', 'Trường THCS Thăng Long', 'Trường THCS Trần Phú'],
    correctAnswer: 0,
    acceptableAnswers: ['THCS My Hoa', 'Truong THCS My Hoa', 'My Hoa'],
    explanation: 'Trường THCS Mỹ Hòa – Môi trường học tập đổi mới sáng tạo và chinh phục tri thức số.',
    movementId: 'shoulder_roll',
    reps: 8,
    timeLimitSec: 40
  },
  {
    id: 'ex_6a5_3',
    question: 'Trong truyền thuyết Thánh Gióng, sau khi đánh tan giặc Ân cứu non sông, người anh hùng làng Gióng đã bay về trời từ ngọn núi nào?',
    grade: 6,
    targetClass: '6A5',
    subject: 'Ngữ văn',
    questionType: 'multiple_choice',
    options: ['Núi Sóc (Sóc Sơn - Hà Nội)', 'Núi Ba Vì', 'Núi Tản Viên', 'Núi Yên Tử'],
    correctAnswer: 0,
    acceptableAnswers: ['Nui Soc', 'Soc Son', 'Nui Soc Son'],
    explanation: 'Thánh Gióng cởi áo giáp sắt để lại rồi cùng ngựa sắt bay thẳng lên trời từ đỉnh núi Sóc Sơn.',
    movementId: 'arm_elbow_extension',
    reps: 10,
    timeLimitSec: 45
  },

  // LỚP 7A5
  {
    id: 'ex_7a5_1',
    question: 'Tác giả của bài thơ thần "Nam quốc sơn hà" khẳng định chủ quyền non sông nước Nam trên sông Như Nguyệt là ai?',
    grade: 7,
    targetClass: '7A5',
    subject: 'Ngữ văn',
    questionType: 'multiple_choice',
    options: ['Tương truyền Thái úy Lý Thường Kiệt', 'Nguyễn Trãi', 'Trần Hưng Đạo', 'Lê Lợi'],
    correctAnswer: 0,
    acceptableAnswers: ['Ly Thuong Kiet', 'Thai uy Ly Thuong Kiet'],
    explanation: 'Bài thơ thần vang lên trên phòng tuyến sông Như Nguyệt năm 1077 tương truyền do danh tướng Lý Thường Kiệt ngâm vang.',
    movementId: 'wrist_roll',
    reps: 10,
    timeLimitSec: 50
  },
  {
    id: 'ex_7a5_2',
    question: 'Trong môn Tin học 7, thuật toán tìm kiếm nhị phân (Binary Search) chỉ có thể áp dụng trên dãy dữ liệu có đặc điểm gì?',
    grade: 7,
    targetClass: '7A5',
    subject: 'Tin học',
    questionType: 'multiple_choice',
    options: ['Dãy đã được sắp xếp theo thứ tự', 'Dãy gồm toàn số chẵn', 'Dãy không chứa phần tử âm', 'Bất kỳ dãy số lộn xộn nào'],
    correctAnswer: 0,
    acceptableAnswers: ['Sap xep', 'Da sap xep', 'Thu tu'],
    explanation: 'Tìm kiếm nhị phân chia đôi phạm vi tìm kiếm ở mỗi bước nên dãy dữ liệu đầu vào bắt buộc phải được sắp xếp trước.',
    movementId: 'torso_waist_twist',
    reps: 8,
    timeLimitSec: 45
  },
  {
    id: 'ex_7a5_3',
    question: 'Tam giác đều là tam giác có 3 cạnh bằng nhau và số đo mỗi góc trong bằng bao nhiêu độ?',
    grade: 7,
    targetClass: '7A5',
    subject: 'Toán học',
    questionType: 'multiple_choice',
    options: ['60 độ', '45 độ', '90 độ', '30 độ'],
    correctAnswer: 0,
    acceptableAnswers: ['60', '60 do', '60°'],
    explanation: 'Tổng 3 góc trong một tam giác bằng 180 độ. Do 3 góc bằng nhau nên mỗi góc là 180° / 3 = 60°.',
    movementId: 'hip_rotation',
    reps: 8,
    timeLimitSec: 40
  },

  // LỚP 8A5
  {
    id: 'ex_8a5_1',
    question: 'Phương trình hóa học của phản ứng quang hợp ở lá cây xanh hấp thụ CO2 và H2O dưới ánh sáng để tạo ra khí gì?',
    grade: 8,
    targetClass: '8A5',
    subject: 'Khoa học tự nhiên',
    questionType: 'multiple_choice',
    options: ['Khí Oxy (O2)', 'Khí Cacbonic (CO2)', 'Khí Nitơ (N2)', 'Khí Metan (CH4)'],
    correctAnswer: 0,
    acceptableAnswers: ['Oxy', 'O2', 'Khi oxy'],
    explanation: 'Phản ứng quang hợp của diệp lục biến nước và khí carbonic thành glucose và giải phóng khí oxy duy trì sự sống.',
    movementId: 'squat_power',
    reps: 6,
    timeLimitSec: 45
  },
  {
    id: 'ex_8a5_2',
    question: 'Văn bản "Hịch tướng sĩ" được vị anh hùng dân tộc nào viết để khích lệ lòng yêu nước của tướng sĩ trước cuộc kháng chiến chống quân Nguyên Mông?',
    grade: 8,
    targetClass: '8A5',
    subject: 'Ngữ văn',
    questionType: 'multiple_choice',
    options: ['Hưng Đạo Đại Vương Trần Quốc Tuấn', 'Trần Quang Khải', 'Trần Nhật Duật', 'Quang Trung Nguyễn Huệ'],
    correctAnswer: 0,
    acceptableAnswers: ['Tran Quoc Tuan', 'Tran Hung Dao', 'Hung Dao Vuong'],
    explanation: 'Trần Quốc Tuấn viết Hịch tướng sĩ thể hiện tinh thần yêu nước quật cường, căm thù giặc sâu sắc và tinh thần đoàn kết toàn quân.',
    movementId: 'ankle_foot_roll',
    reps: 8,
    timeLimitSec: 50
  },

  // LỚP 9A5
  {
    id: 'ex_9a5_1',
    question: 'Định luật Ôm (Ohm) đối với đoạn mạch xác định cường độ dòng điện I tỉ lệ thuận với hiệu điện thế U và tỉ lệ nghịch với đại lượng nào?',
    grade: 9,
    targetClass: '9A5',
    subject: 'Khoa học tự nhiên (Vật lí)',
    questionType: 'multiple_choice',
    options: ['Điện trở của dây dẫn (R)', 'Chiều dài dây dẫn (l)', 'Tiết diện dây dẫn (S)', 'Khối lượng riêng (D)'],
    correctAnswer: 0,
    acceptableAnswers: ['Dien tro', 'R', 'Dien tro R'],
    explanation: 'Hệ thức định luật Ôm: I = U / R, cường độ dòng điện tỉ lệ thuận với U và tỉ lệ nghịch với điện trở R của dây dẫn.',
    movementId: 'neck_flexion',
    reps: 6,
    timeLimitSec: 45
  },
  {
    id: 'ex_9a5_2',
    question: 'Chiến thắng lịch sử Điện Biên Phủ "lừng lẫy năm châu, chấn động địa cầu" diễn ra vào ngày tháng năm nào?',
    grade: 9,
    targetClass: '9A5',
    subject: 'Lịch sử & Địa lí',
    questionType: 'multiple_choice',
    options: ['07/05/1954', '30/04/1975', '02/09/1945', '19/12/1946'],
    correctAnswer: 0,
    acceptableAnswers: ['7/5/1954', '07/05/1954', '7-5-1954'],
    explanation: 'Chiều ngày 7/5/1954, lá cờ Quyết chiến Quyết thắng của quân đội nhân dân Việt Nam tung bay trên nóc hầm tướng De Castries.',
    movementId: 'shoulder_roll',
    reps: 8,
    timeLimitSec: 45
  }
];

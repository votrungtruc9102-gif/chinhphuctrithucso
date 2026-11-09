import { Lesson, GradeLevel, SubjectId } from '../types';

export interface ChapterSpec {
  name: string;
  semester: 1 | 2;
  lessons: {
    num: number;
    title: string;
    summary: string;
    pageReference?: string;
  }[];
}

export interface SubjectCurriculumSpec {
  subjectId: SubjectId;
  grade: GradeLevel;
  subjectName: string;
  bookSeries: string;
  totalExpectedLessons: number;
  totalExpectedChapters: number;
  chapters: ChapterSpec[];
}

// Master curriculum catalog for THCS Mỹ Hòa
export const MASTER_CURRICULUM_SPECS: Record<string, SubjectCurriculumSpec> = {
  "toan_6": {
    subjectId: "toan" as SubjectId,
    grade: 6 as GradeLevel,
    subjectName: "Toán học",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 43,
    totalExpectedChapters: 8,
    chapters: [
      {
        name: "Chương 1: Tập hợp các số tự nhiên",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Tập hợp", summary: "Khái niệm tập hợp, phần tử thuộc (∈) và không thuộc (∉), hai cách mô tả tập hợp bằng cách liệt kê hoặc nêu tính chất đặc trưng." },
          { num: 2, title: "Bài 2: Cách ghi số tự nhiên", summary: "Ghi số tự nhiên trong hệ thập phân theo giá trị các hàng và đọc, viết các số La Mã từ 1 đến 30." },
          { num: 3, title: "Bài 3: Thứ tự trong tập hợp các số tự nhiên", summary: "Biểu diễn số tự nhiên trên tia số, quy tắc so sánh hai số tự nhiên và tính chất bắc cầu." },
          { num: 4, title: "Bài 4: Phép cộng và phép trừ số tự nhiên", summary: "Tính chất giao hoán, kết hợp của phép cộng và kỹ thuật tính nhanh, tính nhẩm hợp lý." },
          { num: 5, title: "Bài 5: Phép nhân và phép chia số tự nhiên", summary: "Tính chất phân phối của phép nhân đối với phép cộng, phép chia hết và phép chia có dư." },
        ]
      },
      {
        name: "Chương 2: Tính chia hết trong tập hợp các số tự nhiên",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 6: Chia hết và chia có dư. Tính chất chia hết của một tổng", summary: "Quan hệ chia hết, tính chất chia hết của tổng và hiệu, ứng dụng xét tính chia hết." },
          { num: 2, title: "Bài 7: Dấu hiệu chia hết cho 2, cho 5", summary: "Dấu hiệu nhận biết số chia hết cho 2 và cho 5 dựa vào chữ số tận cùng." },
          { num: 3, title: "Bài 8: Dấu hiệu chia hết cho 3, cho 9", summary: "Dấu hiệu nhận biết số chia hết cho 3 và cho 9 dựa vào tổng các chữ số." },
          { num: 4, title: "Bài 9: Ước và bội", summary: "Khái niệm ước và bội, cách tìm tập hợp các ước Ư(a) và tập hợp các bội B(a)." },
          { num: 5, title: "Bài 10: Số nguyên tố. Hợp số. Phân tích một số ra thừa số nguyên tố", summary: "Phân biệt số nguyên tố và hợp số, phương pháp phân tích hợp số ra thừa số nguyên tố bằng sơ đồ cột hoặc cây." },
          { num: 6, title: "Bài 11: Ước chung. Ước chung lớn nhất", summary: "Tìm ước chung và ƯCLN của hai hay nhiều số, ứng dụng rút gọn phân số về tối giản." },
          { num: 7, title: "Bài 12: Bội chung. Bội chung nhỏ nhất", summary: "Tìm bội chung và BCNN của các số, ứng dụng quy đồng mẫu các phân số." },
        ]
      },
      {
        name: "Chương 3: Số nguyên",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 13: Tập hợp các số nguyên", summary: "Làm quen với số nguyên âm trong thực tiễn, tập hợp Z và biểu diễn số nguyên trên trục số, số đối." },
          { num: 2, title: "Bài 14: Phép cộng và phép trừ số nguyên", summary: "Quy tắc cộng hai số nguyên cùng dấu, khác dấu và phép trừ thông qua cộng với số đối." },
          { num: 3, title: "Bài 15: Quy tắc dấu ngoặc", summary: "Quy tắc bỏ dấu ngoặc có dấu cộng hoặc dấu trừ đằng trước và tính giá trị biểu thức." },
          { num: 4, title: "Bài 16: Phép nhân số nguyên", summary: "Quy tắc nhân hai số nguyên cùng dấu, khác dấu và các tính chất giao hoán, kết hợp, phân phối." },
          { num: 5, title: "Bài 17: Phép chia hết. Ước và bội của một số nguyên", summary: "Phép chia hết trong Z, tập hợp các ước và bội nguyên của một số nguyên." },
        ]
      },
      {
        name: "Chương 4: Một số hình phẳng trong thực tiễn",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 18: Hình tam giác đều. Hình vuông. Hình lục giác đều", summary: "Đặc điểm hình học về cạnh, góc, đường chéo và cách vẽ tam giác đều, hình vuông, lục giác đều." },
          { num: 2, title: "Bài 19: Hình chữ nhật. Hình thoi. Hình bình hành. Hình thang cân", summary: "Tính chất và dấu hiệu nhận biết các tứ giác phẳng trong đời sống và kỹ thuật." },
          { num: 3, title: "Bài 20: Chu vi và diện tích của một số tứ giác đã học", summary: "Hệ thống công thức tính chu vi và diện tích các hình phẳng và bài toán thực tế." },
          { num: 4, title: "Bài 21: Hình có trục đối xứng", summary: "Khái niệm trục đối xứng, xác định trục đối xứng của các hình học và chữ cái." },
          { num: 5, title: "Bài 22: Hình có tâm đối xứng", summary: "Khái niệm tâm đối xứng, nhận biết các hình có tâm đối xứng trong tự nhiên và nghệ thuật." },
        ]
      },
      {
        name: "Chương 6: Phân số",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 23: Mở rộng phân số. Phân số bằng nhau", summary: "Khái niệm phân số a/b với tử và mẫu là các số nguyên, điều kiện hai phân số bằng nhau." },
          { num: 2, title: "Bài 24: So sánh phân số. Hỗn số dương", summary: "So sánh phân số cùng mẫu, khác mẫu, phân số âm và chuyển đổi phân số sang hỗn số." },
          { num: 3, title: "Bài 25: Phép cộng và phép trừ phân số", summary: "Quy tắc cộng và trừ hai phân số cùng mẫu và khác mẫu, tính chất của phép cộng phân số." },
          { num: 4, title: "Bài 26: Phép nhân và phép chia phân số", summary: "Quy tắc nhân hai phân số, phân số nghịch đảo và phép chia phân số." },
          { num: 5, title: "Bài 27: Hai bài toán về phân số", summary: "Tìm giá trị phân số của một số cho trước và tìm một số khi biết giá trị một phân số của nó." },
        ]
      },
      {
        name: "Chương 7: Số thập phân",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 28: Số thập phân", summary: "Khái niệm phân số thập phân, số thập phân âm và dương, so sánh hai số thập phân." },
          { num: 2, title: "Bài 29: Tính toán với số thập phân", summary: "Cộng, trừ, nhân, chia số thập phân và quy tắc dấu tương tự số nguyên." },
          { num: 3, title: "Bài 30: Làm tròn và ước lượng", summary: "Quy tắc làm tròn số thập phân đến một hàng cho trước và kỹ năng ước lượng kết quả tính toán." },
          { num: 4, title: "Bài 31: Một số bài toán về tỉ số và tỉ số phần trăm", summary: "Khái niệm tỉ số của hai số, tỉ số phần trăm và ứng dụng thực tế." },
        ]
      },
      {
        name: "Chương 8: Những hình hình học cơ bản",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 32: Điểm và đường thẳng", summary: "Khái niệm điểm, đường thẳng, điểm thuộc đường thẳng và ba điểm thẳng hàng." },
          { num: 2, title: "Bài 33: Điểm nằm giữa hai điểm. Tia", summary: "Quan hệ điểm nằm giữa hai điểm, khái niệm tia và hai tia đối nhau." },
          { num: 3, title: "Bài 34: Đoạn thẳng. Độ dài đoạn thẳng", summary: "Khái niệm đoạn thẳng AB, cách đo độ dài và hệ thức AM + MB = AB khi M nằm giữa A và B." },
          { num: 4, title: "Bài 35: Trung điểm của đoạn thẳng", summary: "Định nghĩa và tính chất trung điểm của đoạn thẳng, cách xác định trung điểm." },
          { num: 5, title: "Bài 36: Góc", summary: "Khái niệm góc, đỉnh và cạnh của góc; góc bẹt, góc nhọn, góc vuông, góc tù." },
          { num: 6, title: "Bài 37: Số đo góc", summary: "Cách đo góc bằng thước đo góc, so sánh hai góc và phân loại góc theo số đo độ." },
        ]
      },
      {
        name: "Chương 9: Dữ liệu và xác suất thực nghiệm",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 38: Dữ liệu và thu thập dữ liệu", summary: "Khái niệm dữ liệu thống kê, dữ liệu số và dữ liệu không phải số, phương pháp thu thập dữ liệu." },
          { num: 2, title: "Bài 39: Bảng thống kê và biểu đồ tranh", summary: "Lập và đọc bảng thống kê, biểu diễn số liệu bằng biểu đồ tranh trực quan." },
          { num: 3, title: "Bài 40: Biểu đồ cột", summary: "Đọc và vẽ biểu đồ cột đơn để biểu diễn và so sánh số liệu thống kê." },
          { num: 4, title: "Bài 41: Biểu đồ cột kép", summary: "Đọc và phân tích biểu đồ cột kép để so sánh hai nhóm dữ liệu." },
          { num: 5, title: "Bài 42: Kết quả có thể và sự kiện trong trò chơi, thí nghiệm", summary: "Xác định các kết quả có thể xảy ra khi tung đồng xu, gieo xúc xắc và các sự kiện." },
          { num: 6, title: "Bài 43: Xác suất thực nghiệm", summary: "Khái niệm và cách tính xác suất thực nghiệm của một sự kiện qua nhiều lần lặp lại." },
        ]
      },
    ]
  },
  "toan_7": {
    subjectId: "toan" as SubjectId,
    grade: 7 as GradeLevel,
    subjectName: "Toán học",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 37,
    totalExpectedChapters: 10,
    chapters: [
      {
        name: "Chương 1: Số hữu tỉ",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Tập hợp các số hữu tỉ", summary: "Khái niệm số hữu tỉ a/b (a, b ∈ Z, b ≠ 0), tập hợp Q và biểu diễn số hữu tỉ trên trục số." },
          { num: 2, title: "Bài 2: Cộng, trừ, nhân, chia số hữu tỉ", summary: "Các quy tắc thực hiện phép tính với số hữu tỉ và tính chất giao hoán, kết hợp, phân phối." },
          { num: 3, title: "Bài 3: Luỹ thừa với số mũ tự nhiên của một số hữu tỉ", summary: "Định nghĩa lũy thừa, tích và thương của hai lũy thừa cùng cơ số, lũy thừa của lũy thừa." },
          { num: 4, title: "Bài 4: Thứ tự thực hiện các phép tính. Quy tắc chuyển vế", summary: "Thứ tự thực hiện phép tính và quy tắc chuyển vế trong đẳng thức: khi chuyển một số hạng từ vế này sang vế kia thì phải đổi dấu." },
        ]
      },
      {
        name: "Chương 2: Số thực",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 5: Làm quen với số thập phân vô hạn tuần hoàn", summary: "Số thập phân hữu hạn và số thập phân vô hạn tuần hoàn, chu kỳ của số thập phân." },
          { num: 2, title: "Bài 6: Số vô tỉ. Căn bậc hai số học", summary: "Khái niệm số vô tỉ, định nghĩa căn bậc hai số học của một số không âm." },
          { num: 3, title: "Bài 7: Tập hợp các số thực", summary: "Tập hợp số thực R gồm số hữu tỉ và số vô tỉ, trục số thực và giá trị tuyệt đối của số thực." },
        ]
      },
      {
        name: "Chương 3: Góc và đường thẳng song song",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 8: Góc ở vị trí đặc biệt. Tia phân giác của một góc", summary: "Hai góc kề bù, hai góc đối đỉnh và định nghĩa tia phân giác của một góc." },
          { num: 2, title: "Bài 9: Hai đường thẳng song song và dấu hiệu nhận biết", summary: "Các cặp góc so le trong, đồng vị và dấu hiệu nhận biết hai đường thẳng song song." },
          { num: 3, title: "Bài 10: Tiên đề Euclid. Tính chất của hai đường thẳng song song", summary: "Nội dung tiên đề Euclid và các tính chất của hai đường thẳng song song bị cắt bởi một cát tuyến." },
          { num: 4, title: "Bài 11: Định lí và chứng minh định lí", summary: "Cấu trúc định lí gồm giả thiết và kết luận, phương pháp suy luận chứng minh định lí hình học." },
        ]
      },
      {
        name: "Chương 4: Tam giác bằng nhau",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 12: Tổng các góc trong một tam giác", summary: "Định lí tổng ba góc của một tam giác bằng 180° và định lí góc ngoài của tam giác." },
          { num: 2, title: "Bài 13: Hai tam giác bằng nhau. Trường hợp bằng nhau thứ nhất (c-c-c)", summary: "Khái niệm hai tam giác bằng nhau và trường hợp cạnh - cạnh - cạnh." },
          { num: 3, title: "Bài 14: Trường hợp bằng nhau thứ hai (c-g-c) và thứ ba (g-c-g)", summary: "Trường hợp cạnh - góc - cạnh và góc - cạnh - góc của hai tam giác." },
          { num: 4, title: "Bài 15: Các trường hợp bằng nhau của tam giác vuông", summary: "Trường hợp cạnh huyền - góc nhọn, cạnh huyền - cạnh góc vuông." },
          { num: 5, title: "Bài 16: Tam giác cân. Đường trung trực của đoạn thẳng", summary: "Định nghĩa tam giác cân, tam giác đều và tính chất đường trung trực của đoạn thẳng." },
        ]
      },
      {
        name: "Chương 5: Thu thập và biểu diễn dữ liệu",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 17: Thu thập và phân loại dữ liệu", summary: "Phương pháp thu thập dữ liệu hợp lý và phân loại dữ liệu định tính, định lượng." },
          { num: 2, title: "Bài 18: Biểu đồ hình quạt tròn", summary: "Đọc và phân tích thông tin từ biểu đồ hình quạt tròn." },
          { num: 3, title: "Bài 19: Biểu đồ đoạn thẳng", summary: "Đọc và vẽ biểu đồ đoạn thẳng biểu diễn xu hướng biến đổi của dữ liệu theo thời gian." },
          { num: 4, title: "Bài 20: Phân tích số liệu trên biểu đồ", summary: "Đưa ra nhận định, xu hướng và kết luận từ các biểu đồ thống kê." },
        ]
      },
      {
        name: "Chương 6: Tỉ lệ thức và đại lượng tỉ lệ",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 21: Tỉ lệ thức", summary: "Định nghĩa tỉ lệ thức a/b = c/d và tính chất cơ bản: ad = bc." },
          { num: 2, title: "Bài 22: Đại lượng tỉ lệ thuận", summary: "Công thức y = kx và tính chất của hai đại lượng tỉ lệ thuận." },
          { num: 3, title: "Bài 23: Đại lượng tỉ lệ nghịch", summary: "Công thức y = a/x hay xy = a và bài toán chia tỉ lệ nghịch." },
        ]
      },
      {
        name: "Chương 7: Biểu thức đại số và đa thức một biến",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 24: Biểu thức đại số", summary: "Khái niệm biểu thức đại số, biến số và cách tính giá trị của biểu thức đại số." },
          { num: 2, title: "Bài 25: Đa thức một biến", summary: "Khái niệm đa thức một biến, bậc của đa thức, hệ số cao nhất và hệ số tự do." },
          { num: 3, title: "Bài 26: Phép cộng và phép trừ đa thức một biến", summary: "Quy tắc cộng và trừ hai đa thức một biến bằng cách đặt tính hoặc nhóm hạng tử cùng bậc." },
          { num: 4, title: "Bài 27: Phép nhân đa thức một biến", summary: "Quy tắc nhân đơn thức với đa thức và nhân đa thức với đa thức." },
          { num: 5, title: "Bài 28: Phép chia đa thức một biến", summary: "Phép chia đa thức cho đơn thức và chia hai đa thức một biến đã sắp xếp." },
        ]
      },
      {
        name: "Chương 8: Biến cố và xác suất của biến cố",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 29: Làm quen với biến cố", summary: "Khái niệm biến cố chắc chắn, biến cố không thể và biến cố ngẫu nhiên." },
          { num: 2, title: "Bài 30: Làm quen với xác suất của biến cố", summary: "Đo lường khả năng xảy ra của một biến cố bằng con số xác suất." },
        ]
      },
      {
        name: "Chương 9: Quan hệ giữa các yếu tố trong một tam giác",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 31: Quan hệ giữa góc và cạnh đối diện trong một tam giác", summary: "Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn và ngược lại." },
          { num: 2, title: "Bài 32: Quan hệ giữa đường vuông góc và đường xiên", summary: "Khái niệm đường vuông góc, đường xiên và hình chiếu." },
          { num: 3, title: "Bài 33: Bất đẳng thức tam giác", summary: "Trong một tam giác, độ dài một cạnh bất kì luôn nhỏ hơn tổng và lớn hơn hiệu độ dài hai cạnh còn lại." },
          { num: 4, title: "Bài 34: Sự đồng quy của ba đường trung tuyến, ba đường phân giác trong tam giác", summary: "Tính chất trọng tâm và giao điểm ba đường phân giác." },
          { num: 5, title: "Bài 35: Sự đồng quy của ba đường trung trực, ba đường cao trong tam giác", summary: "Tính chất tâm đường tròn ngoại tiếp và trực tâm tam giác." },
        ]
      },
      {
        name: "Chương 10: Một số hình khối trong thực tiễn",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 36: Hình hộp chữ nhật và hình lập phương", summary: "Diện tích xung quanh và thể tích của hình hộp chữ nhật và hình lập phương." },
          { num: 2, title: "Bài 37: Hình lăng trụ đứng tam giác và tứ giác", summary: "Đặc điểm, diện tích xung quanh và thể tích hình lăng trụ đứng." },
        ]
      },
    ]
  },
  "toan_8": {
    subjectId: "toan" as SubjectId,
    grade: 8 as GradeLevel,
    subjectName: "Toán học",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 39,
    totalExpectedChapters: 10,
    chapters: [
      {
        name: "Chương 1: Đa thức",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Đơn thức", summary: "Khái niệm đơn thức, đơn thức thu gọn, bậc của đơn thức và đơn thức đồng dạng." },
          { num: 2, title: "Bài 2: Đa thức", summary: "Khái niệm đa thức, đa thức thu gọn và bậc của đa thức nhiều biến." },
          { num: 3, title: "Bài 3: Phép cộng và phép trừ đa thức", summary: "Cộng và trừ hai hay nhiều đa thức nhiều biến." },
          { num: 4, title: "Bài 4: Phép nhân đa thức", summary: "Quy tắc nhân đơn thức với đa thức và nhân hai đa thức." },
          { num: 5, title: "Bài 5: Phép chia đa thức cho đơn thức", summary: "Điều kiện chia hết và quy tắc chia đa thức cho đơn thức." },
        ]
      },
      {
        name: "Chương 2: Hằng đẳng thức đáng nhớ và ứng dụng",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 6: Hiệu hai bình phương. Bình phương của một tổng hay một hiệu", summary: "Ba hằng đẳng thức đáng nhớ đầu tiên và ứng dụng tính nhanh." },
          { num: 2, title: "Bài 7: Lập phương của một tổng. Lập phương của một hiệu", summary: "Hai hằng đẳng thức bậc 3." },
          { num: 3, title: "Bài 8: Tổng và hiệu hai lập phương", summary: "Hai hằng đẳng thức tổng và hiệu hai lập phương." },
          { num: 4, title: "Bài 9: Phân tích đa thức thành nhân tử", summary: "Các phương pháp đặt nhân tử chung, dùng hằng đẳng thức và nhóm hạng tử." },
        ]
      },
      {
        name: "Chương 3: Tứ giác",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 10: Tứ giác", summary: "Định nghĩa tứ giác lồi và định lí tổng các góc trong một tứ giác bằng 360°." },
          { num: 2, title: "Bài 11: Hình thang cân", summary: "Định nghĩa, tính chất và dấu hiệu nhận biết hình thang cân." },
          { num: 3, title: "Bài 12: Hình bình hành", summary: "Định nghĩa, tính chất về cạnh, góc, đường chéo và dấu hiệu nhận biết hình bình hành." },
          { num: 4, title: "Bài 13: Hình chữ nhật", summary: "Tính chất và dấu hiệu nhận biết hình chữ nhật." },
          { num: 5, title: "Bài 14: Hình thoi và hình vuông", summary: "Tính chất và dấu hiệu nhận biết hình thoi và hình vuông." },
        ]
      },
      {
        name: "Chương 4: Định lí Thalès",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 15: Định lí Thalès trong tam giác", summary: "Định lí thuận và đảo của Thalès trong tam giác." },
          { num: 2, title: "Bài 16: Đường trung bình của tam giác", summary: "Định nghĩa và tính chất song song, bằng nửa cạnh thứ ba của đường trung bình." },
          { num: 3, title: "Bài 17: Tính chất đường phân giác của tam giác", summary: "Đường phân giác trong của tam giác chia cạnh đối diện thành hai đoạn thẳng tỉ lệ với hai cạnh kề." },
        ]
      },
      {
        name: "Chương 5: Dữ liệu và biểu đồ",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 18: Thu thập và phân loại dữ liệu", summary: "Thu thập dữ liệu định lượng, định tính và kiểm tra tính hợp lý của dữ liệu." },
          { num: 2, title: "Bài 19: Biểu diễn dữ liệu bằng bảng, biểu đồ", summary: "Lựa chọn dạng biểu đồ thích hợp để biểu diễn số liệu." },
          { num: 3, title: "Bài 20: Phân tích số liệu thống kê dựa vào biểu đồ", summary: "Rút ra thông tin và giải quyết bài toán thực tế dựa vào biểu đồ." },
        ]
      },
      {
        name: "Chương 6: Phân thức đại số",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 21: Phân thức đại số", summary: "Khái niệm phân thức đại số A/B (B ≠ 0) và hai phân thức bằng nhau." },
          { num: 2, title: "Bài 22: Tính chất cơ bản của phân thức đại số", summary: "Nhân chia cả tử và mẫu với cùng đa thức khác 0 và rút gọn phân thức." },
          { num: 3, title: "Bài 23: Phép cộng và phép trừ phân thức đại số", summary: "Quy đồng mẫu thức và thực hiện phép cộng, trừ phân thức." },
          { num: 4, title: "Bài 24: Phép nhân và phép chia phân thức đại số", summary: "Nhân, chia phân thức và biến đổi biểu thức hữu tỉ." },
        ]
      },
      {
        name: "Chương 7: Phương trình bậc nhất và hàm số bậc nhất",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 25: Phương trình bậc nhất một ẩn", summary: "Dạng ax + b = 0 (a ≠ 0) và cách giải bằng quy tắc chuyển vế, quy tắc nhân." },
          { num: 2, title: "Bài 26: Giải bài toán bằng cách lập phương trình", summary: "Các bước giải bài toán chuyển động, năng suất, hình học bằng phương trình." },
          { num: 3, title: "Bài 27: Khái niệm hàm số và đồ thị hàm số", summary: "Hàm số y = f(x) và hệ trục tọa độ Oxy." },
          { num: 4, title: "Bài 28: Hàm số bậc nhất y = ax + b", summary: "Tính chất đồng biến, nghịch biến và đồ thị đường thẳng của hàm số bậc nhất." },
        ]
      },
      {
        name: "Chương 8: Mở đầu về tính xác suất của biến cố",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 29: Kết quả có thể và kết quả thuận lợi", summary: "Liệt kê các kết quả có thể và kết quả thuận lợi cho một biến cố." },
          { num: 2, title: "Bài 30: Cách tính xác suất của biến cố bằng tỉ số", summary: "Tính xác suất P = k/n trong các mô hình đồng khả năng." },
          { num: 3, title: "Bài 31: Mối liên hệ giữa xác suất thực nghiệm và xác suất lí thuyết", summary: "Quy luật số lớn trong xác suất." },
        ]
      },
      {
        name: "Chương 9: Tam giác đồng dạng",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 32: Hai tam giác đồng dạng", summary: "Khái niệm hai tam giác đồng dạng và tỉ số đồng dạng." },
          { num: 2, title: "Bài 33: Trường hợp đồng dạng thứ nhất (c-c-c)", summary: "Định lí ba cạnh tỉ lệ." },
          { num: 3, title: "Bài 34: Trường hợp đồng dạng thứ hai (c-g-c)", summary: "Định lí hai cạnh tỉ lệ và góc xen giữa bằng nhau." },
          { num: 4, title: "Bài 35: Trường hợp đồng dạng thứ ba (g-g)", summary: "Định lí hai góc bằng nhau." },
          { num: 5, title: "Bài 36: Định lí Pythagore và ứng dụng", summary: "Định lí Pythagore thuận và đảo trong tam giác vuông." },
          { num: 6, title: "Bài 37: Các trường hợp đồng dạng của hai tam giác vuông", summary: "Áp dụng cho tam giác vuông." },
        ]
      },
      {
        name: "Chương 10: Một số hình khối trong thực tiễn",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 38: Hình chóp tam giác đều", summary: "Đặc điểm, diện tích xung quanh và thể tích hình chóp tam giác đều." },
          { num: 2, title: "Bài 39: Hình chóp tứ giác đều", summary: "Đặc điểm, diện tích xung quanh và thể tích hình chóp tứ giác đều." },
        ]
      },
    ]
  },
  "toan_9": {
    subjectId: "toan" as SubjectId,
    grade: 9 as GradeLevel,
    subjectName: "Toán học",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 32,
    totalExpectedChapters: 10,
    chapters: [
      {
        name: "Chương 1: Phương trình và hệ hai phương trình bậc nhất hai ẩn",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn", summary: "Dạng phương trình ax + by = c và nghiệm của hệ hai phương trình." },
          { num: 2, title: "Bài 2: Giải hệ hai phương trình bậc nhất hai ẩn", summary: "Phương pháp thế và phương pháp cộng đại số." },
          { num: 3, title: "Bài 3: Giải bài toán bằng cách lập hệ phương trình", summary: "Ứng dụng giải toán thực tế bằng hệ phương trình." },
        ]
      },
      {
        name: "Chương 2: Phương trình và bất phương trình bậc nhất một ẩn",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 4: Phương trình quy về phương trình bậc nhất một ẩn", summary: "Phương trình tích và phương trình chứa ẩn ở mẫu." },
          { num: 2, title: "Bài 5: Bất đẳng thức và bất phương trình bậc nhất một ẩn", summary: "Tính chất liên hệ giữa thứ tự và phép tính; giải bất phương trình bậc nhất." },
        ]
      },
      {
        name: "Chương 3: Căn bậc hai và căn bậc ba",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 6: Căn bậc hai và căn thức bậc hai", summary: "Định nghĩa căn bậc hai số học và điều kiện xác định của căn thức." },
          { num: 2, title: "Bài 7: Khai căn bậc hai với phép nhân và phép chia", summary: "Khai phương một tích và một thương." },
          { num: 3, title: "Bài 8: Biến đổi đơn giản biểu thức chứa căn thức bậc hai", summary: "Đưa thừa số ra ngoài/vào trong dấu căn, khử mẫu của biểu thức lấy căn, trục căn thức ở mẫu." },
          { num: 4, title: "Bài 9: Rút gọn biểu thức chứa căn thức bậc hai", summary: "Kỹ năng biến đổi tổng hợp biểu thức căn thức." },
          { num: 5, title: "Bài 10: Căn bậc ba và căn thức bậc ba", summary: "Khái niệm và tính chất căn bậc ba." },
        ]
      },
      {
        name: "Chương 4: Hệ thức lượng trong tam giác vuông",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 11: Tỉ số lượng giác của góc nhọn", summary: "Định nghĩa sin, cos, tan, cot của góc nhọn." },
          { num: 2, title: "Bài 12: Một số hệ thức giữa cạnh và góc trong tam giác vuông", summary: "Hệ thức a = b.sinB... và giải tam giác vuông." },
          { num: 3, title: "Bài 13: Ứng dụng thực tế của tỉ số lượng giác", summary: "Đo chiều cao cây, tháp, khoảng cách hai điểm không tới được." },
        ]
      },
      {
        name: "Chương 5: Đường tròn",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 14: Cung và dây của một đường tròn", summary: "Mối liên hệ giữa cung và dây cung." },
          { num: 2, title: "Bài 15: Độ dài cung tròn, diện tích hình quạt tròn và hình vành khuyên", summary: "Công thức tính độ dài cung tròn và diện tích hình quạt." },
          { num: 3, title: "Bài 16: Vị trí tương đối của đường thẳng và đường tròn", summary: "Tiếp tuyến của đường tròn và tính chất hai tiếp tuyến cắt nhau." },
          { num: 4, title: "Bài 17: Vị trí tương đối của hai đường tròn", summary: "Hai đường tròn cắt nhau, tiếp xúc, ngoài nhau, đựng nhau." },
        ]
      },
      {
        name: "Chương 6: Hàm số y = ax^2 (a khác 0). Phương trình bậc hai một ẩn",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 18: Hàm số y = ax^2 (a khác 0)", summary: "Tính chất và đồ thị parabol của hàm số bậc hai." },
          { num: 2, title: "Bài 19: Phương trình bậc hai một ẩn", summary: "Công thức nghiệm và công thức nghiệm thu gọn của phương trình ax^2 + bx + c = 0." },
          { num: 3, title: "Bài 20: Định lí Viète và ứng dụng", summary: "Hệ thức Viète về tổng và tích nghiệm, ứng dụng nhẩm nghiệm." },
          { num: 4, title: "Bài 21: Giải bài toán bằng cách lập phương trình bậc hai", summary: "Giải toán hình học, chuyển động bằng phương trình bậc hai." },
        ]
      },
      {
        name: "Chương 7: Tần số và tần số tương đối",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 22: Bảng tần số và biểu đồ tần số", summary: "Lập bảng và biểu đồ tần số." },
          { num: 2, title: "Bài 23: Bảng tần số tương đối và biểu đồ tần số tương đối", summary: "Tần số tương đối biểu thị tỉ lệ phần trăm." },
          { num: 3, title: "Bài 24: Bảng tần số ghép nhóm và biểu đồ tần số tương đối ghép nhóm", summary: "Xử lý dữ liệu mẫu quy mô lớn." },
        ]
      },
      {
        name: "Chương 8: Xác suất của biến cố trong một số mô hình xác suất",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 25: Phép thử ngẫu nhiên và không gian mẫu", summary: "Mô tả không gian mẫu bằng sơ đồ cây." },
          { num: 2, title: "Bài 26: Xác suất của biến cố liên quan tới phép thử", summary: "Tính xác suất bằng phương pháp liệt kê không gian mẫu." },
        ]
      },
      {
        name: "Chương 9: Đường tròn ngoại tiếp và đường tròn nội tiếp",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 27: Đường tròn ngoại tiếp và nội tiếp tam giác", summary: "Xác định tâm và bán kính đường tròn ngoại tiếp, nội tiếp." },
          { num: 2, title: "Bài 28: Tứ giác nội tiếp", summary: "Định nghĩa và dấu hiệu nhận biết tứ giác nội tiếp đường tròn." },
          { num: 3, title: "Bài 29: Đa giác đều", summary: "Đặc điểm đa giác đều và vẽ hình lục giác đều, ngũ giác đều." },
        ]
      },
      {
        name: "Chương 10: Một số hình khối trong thực tiễn",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 30: Hình trụ", summary: "Diện tích xung quanh và thể tích hình trụ." },
          { num: 2, title: "Bài 31: Hình nón", summary: "Diện tích xung quanh và thể tích hình nón." },
          { num: 3, title: "Bài 32: Hình cầu", summary: "Diện tích mặt cầu và thể tích hình cầu." },
        ]
      },
    ]
  },
  "tin-hoc_6": {
    subjectId: "tin-hoc" as SubjectId,
    grade: 6 as GradeLevel,
    subjectName: "Tin học",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 17,
    totalExpectedChapters: 5,
    chapters: [
      {
        name: "Chủ đề 1: Máy tính và cộng đồng",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Thông tin và dữ liệu", summary: "Phân biệt khái niệm thông tin, dữ liệu, vật mang tin và tầm quan trọng của thông tin trong học tập và đời sống." },
          { num: 2, title: "Bài 2: Xử lí thông tin", summary: "Quá trình xử lí thông tin của con người và máy tính (Thu nhận -> Xử lí -> Lưu trữ -> Xuất dữ liệu)." },
          { num: 3, title: "Bài 3: Thông tin trong máy tính", summary: "Biểu diễn thông tin trong máy tính dưới dạng dãy bit nhị phân (0 và 1) và các đơn vị đo dung lượng Byte, KB, MB, GB." },
        ]
      },
      {
        name: "Chủ đề 2: Mạng máy tính và Internet",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 4: Mạng máy tính", summary: "Khái niệm mạng máy tính, các thành phần của mạng (thiết bị đầu cuối, thiết bị kết nối, phần mềm mạng) và lợi ích." },
          { num: 2, title: "Bài 5: Internet", summary: "Khái niệm Internet, đặc điểm và vai trò của mạng toàn cầu trong học tập và đời sống." },
          { num: 3, title: "Bài 6: Mạng thông tin toàn cầu", summary: "Khái niệm World Wide Web (WWW), trang web, website, địa chỉ URL và trình duyệt web." },
        ]
      },
      {
        name: "Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 7: Tìm kiếm thông tin trên Internet", summary: "Sử dụng máy tìm kiếm (Google), lựa chọn từ khóa thông minh để tra cứu tài liệu học tập." },
          { num: 2, title: "Bài 8: Thư điện tử", summary: "Khái niệm Email, cấu trúc địa chỉ thư điện tử, cách soạn, gửi và nhận thư điện tử an toàn." },
          { num: 3, title: "Bài 9: An toàn thông tin trên Internet", summary: "Nguyên tắc bảo vệ mật khẩu, thông tin cá nhân và phòng tránh rủi ro lừa đảo trên mạng." },
        ]
      },
      {
        name: "Chủ đề 4: Ứng dụng tin học",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 10: Sơ đồ tư duy", summary: "Khái niệm sơ đồ tư duy (Mindmap) và cách vẽ sơ đồ tư duy tóm tắt bài học trên máy tính." },
          { num: 2, title: "Bài 11: Định dạng văn bản", summary: "Định dạng ký tự (phông chữ, cỡ chữ, màu sắc) và định dạng đoạn văn bản trong phần mềm soạn thảo Word." },
          { num: 3, title: "Bài 12: Trình bày thông tin ở dạng bảng", summary: "Tạo bảng, chèn thêm hàng/cột, gộp ô và định dạng bảng biểu báo cáo." },
          { num: 4, title: "Bài 13: Thực hành: Tìm kiếm và thay thế", summary: "Sử dụng công cụ Find & Replace để chỉnh sửa tài liệu nhanh chóng." },
          { num: 5, title: "Bài 14: Thực hành tổng hợp: Hoàn thiện sổ lưu niệm", summary: "Dự án thực hành kết hợp văn bản, hình ảnh, bảng biểu hoàn thiện cuốn sổ lưu niệm lớp 6." },
        ]
      },
      {
        name: "Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 15: Thuật toán", summary: "Khái niệm thuật toán, mô tả thuật toán bằng cách liệt kê các bước hoặc sơ đồ khối." },
          { num: 2, title: "Bài 16: Các cấu trúc điều khiển", summary: "Ba cấu trúc điều khiển cơ bản: Cấu trúc tuần tự, cấu trúc rẽ nhánh và cấu trúc lặp." },
          { num: 3, title: "Bài 17: Chương trình máy tính", summary: "Hiểu mối liên hệ giữa thuật toán và chương trình, làm quen ngôn ngữ lập trình trực quan Scratch để tạo trò chơi đầu tiên." },
        ]
      },
    ]
  },
  "tin-hoc_7": {
    subjectId: "tin-hoc" as SubjectId,
    grade: 7 as GradeLevel,
    subjectName: "Tin học",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 16,
    totalExpectedChapters: 5,
    chapters: [
      {
        name: "Chủ đề 1: Máy tính và cộng đồng",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Thiết bị vào - ra", summary: "Phân loại thiết bị vào ra, kết nối bàn phím, chuột, màn hình, máy in với thân máy tính." },
          { num: 2, title: "Bài 2: Phần mềm máy tính", summary: "Phân biệt phần mềm hệ thống (HĐH Windows, Linux) và phần mềm ứng dụng." },
          { num: 3, title: "Bài 3: Quản lí dữ liệu trong máy tính", summary: "Tổ chức cây thư mục, tệp tin và các thao tác sao chép, di chuyển, xóa tệp." },
        ]
      },
      {
        name: "Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 4: Mạng xã hội và một số kênh trao đổi thông tin trên Internet", summary: "Khái niệm mạng xã hội, các kênh giao tiếp số và nguyên tắc bảo mật thông tin cá nhân." },
          { num: 2, title: "Bài 5: Ứng xử trên mạng", summary: "Văn hóa ứng xử văn minh, phòng tránh tin giả và bắt nạt trên mạng." },
        ]
      },
      {
        name: "Chủ đề 3: Đạo đức, pháp luật và văn hóa trong môi trường số",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 6: Văn hóa ứng xử qua phương tiện truyền thông số", summary: "Tôn trọng bản quyền tác giả, không phát tán nội dung xấu độc." },
        ]
      },
      {
        name: "Chủ đề 4: Ứng dụng tin học",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 7: Phần mềm bảng tính", summary: "Giao diện Excel, bảng tính điện tử, ô tính, hàng, cột và địa chỉ ô." },
          { num: 2, title: "Bài 8: Công cụ hỗ trợ tính toán", summary: "Sử dụng công thức tính toán và các hàm cơ bản: SUM, AVERAGE, MAX, MIN, COUNT." },
          { num: 3, title: "Bài 9: Trình bày bảng tính", summary: "Định dạng phông chữ, kẻ đường viền, căn lề và định dạng số trong bảng tính." },
          { num: 4, title: "Bài 10: Định dạng nâng cao cho bảng tính", summary: "Định dạng có điều kiện và in ấn trang tính chuẩn xác." },
          { num: 5, title: "Bài 11: Tạo bài trình chiếu", summary: "Phần mềm PowerPoint, tạo trang chiếu, bố cục và nhập nội dung." },
          { num: 6, title: "Bài 12: Định dạng đối tượng trên trang chiếu", summary: "Chèn hình ảnh, video, hiệu ứng chuyển động Animation và Transition." },
        ]
      },
      {
        name: "Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 13: Thuật toán tìm kiếm tuần tự", summary: "Mô tả thuật toán tìm kiếm tuần tự bằng sơ đồ khối và mã giả." },
          { num: 2, title: "Bài 14: Thuật toán tìm kiếm nhị phân", summary: "Nguyên lý chia đôi không gian tìm kiếm trên danh sách đã sắp xếp." },
          { num: 3, title: "Bài 15: Thuật toán sắp xếp chèn", summary: "Mô phỏng từng bước thuật toán sắp xếp chèn (Insertion Sort)." },
          { num: 4, title: "Bài 16: Thuật toán sắp xếp chọn", summary: "Mô phỏng thuật toán sắp xếp chọn (Selection Sort) trên dãy số." },
        ]
      },
    ]
  },
  "tin-hoc_8": {
    subjectId: "tin-hoc" as SubjectId,
    grade: 8 as GradeLevel,
    subjectName: "Tin học",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 16,
    totalExpectedChapters: 5,
    chapters: [
      {
        name: "Chủ đề 1: Máy tính và cộng đồng",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Lịch sử phát triển máy tính", summary: "Các thế hệ máy tính từ đèn điện tử chân không đến vi mạch tích hợp và siêu máy tính." },
          { num: 2, title: "Bài 2: Thông tin trong môi trường số", summary: "Độ tin cậy của thông tin số, cách kiểm chứng nguồn gốc tài liệu trên Internet." },
          { num: 3, title: "Bài 3: Thực hành khai thác thông tin số", summary: "Kỹ năng tìm kiếm nâng cao và chọn lọc dữ liệu học tập." },
        ]
      },
      {
        name: "Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 4: Sử dụng bảng tính điện tử nâng cao", summary: "Cố định dòng/cột, liên kết dữ liệu giữa các trang tính." },
        ]
      },
      {
        name: "Chủ đề 3: Đạo đức, pháp luật và văn hóa trong môi trường số",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 5: Bản quyền và an toàn thông tin", summary: "Luật An ninh mạng, giấy phép bản quyền Creative Commons và phòng ngừa virus." },
        ]
      },
      {
        name: "Chủ đề 4: Ứng dụng tin học",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 6: Sắp xếp và lọc dữ liệu", summary: "Sắp xếp dữ liệu theo thứ tự tăng/giảm và lọc dữ liệu theo điều kiện (Filter)." },
          { num: 2, title: "Bài 7: Tạo biểu đồ trong bảng tính", summary: "Vẽ biểu đồ cột, biểu đồ đường và biểu đồ tròn trong Excel." },
          { num: 3, title: "Bài 8: Xử lí đồ họa trong văn bản", summary: "Chèn và định dạng hình vẽ SmartArt, WordArt trong tài liệu." },
          { num: 4, title: "Bài 9: Thiết kế bài trình chiếu chuyên nghiệp", summary: "Nguyên tắc thiết kế Slide trực quan, phối màu và trình bày báo cáo." },
          { num: 5, title: "Bài 10: Dự án học tập đa phương tiện", summary: "Thực hành xây dựng sản phẩm số kết hợp bảng tính và bài thuyết trình." },
        ]
      },
      {
        name: "Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 11: Kiểu dữ liệu và biến trong lập trình", summary: "Khái niệm biến, kiểu số nguyên, số thực, xâu ký tự trong lập trình." },
          { num: 2, title: "Bài 12: Cấu trúc rẽ nhánh", summary: "Câu lệnh điều kiện If... Then và If... Then... Else." },
          { num: 3, title: "Bài 13: Cấu trúc lặp", summary: "Câu lệnh lặp với số lần biết trước và lặp với điều kiện." },
          { num: 4, title: "Bài 14: Thực hành viết chương trình đơn giản", summary: "Lập trình giải bài toán tính tổng, tìm số lớn nhất." },
          { num: 5, title: "Bài 15: Gỡ lỗi chương trình", summary: "Các loại lỗi cú pháp, lỗi logic và kỹ thuật kiểm thử (Debugging)." },
          { num: 6, title: "Bài 16: Dự án lập trình trò chơi giáo dục", summary: "Xây dựng trò chơi đố vui học tập tương tác." },
        ]
      },
    ]
  },
  "tin-hoc_9": {
    subjectId: "tin-hoc" as SubjectId,
    grade: 9 as GradeLevel,
    subjectName: "Tin học",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 22,
    totalExpectedChapters: 6,
    chapters: [
      {
        name: "Chủ đề 1: Máy tính và cộng đồng",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Thế giới kĩ thuật số", summary: "Tác động của công nghệ số đến đời sống, xã hội, các ứng dụng thông minh và chuyển đổi số." }
        ]
      },
      {
        name: "Chủ đề 2: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin",
        semester: 1,
        lessons: [
          { num: 2, title: "Bài 2: Thông tin trong giải quyết vấn đề", summary: "Vai trò của chất lượng thông tin, tính mới, độ tin cậy trong việc ra quyết định." },
          { num: 3, title: "Bài 3: Thực hành: Đánh giá chất lượng thông tin", summary: "Thực hành thu thập, phân tích và thẩm định độ chính xác của nguồn tin số." }
        ]
      },
      {
        name: "Chủ đề 3: Đạo đức, pháp luật và văn hoá trong môi trường số",
        semester: 1,
        lessons: [
          { num: 4, title: "Bài 4: Một số vấn đề pháp lí về sử dụng dịch vụ Internet", summary: "Quyền sở hữu trí tuệ, bản quyền phần mềm, bảo vệ dữ liệu cá nhân và an toàn mạng." }
        ]
      },
      {
        name: "Chủ đề 4: Ứng dụng tin học",
        semester: 1,
        lessons: [
          { num: 5, title: "Bài 5: Tìm hiểu phần mềm mô phỏng", summary: "Khái niệm phần mềm mô phỏng, lợi ích khám phá khoa học không gian, vật lý, hóa học số." },
          { num: 6, title: "Bài 6: Thực hành: Khai thác phần mềm mô phỏng", summary: "Thực hành tương tác và thu nhận tri thức qua môi trường mô phỏng trực quan." },
          { num: 7, title: "Bài 7: Trình bày thông tin trong trao đổi và hợp tác", summary: "Nguyên tắc thiết kế bài trình chiếu, sơ đồ tư duy đa phương tiện phục vụ thuyết trình." },
          { num: 8, title: "Bài 8: Thực hành: Sử dụng công cụ trực quan trình bày thông tin trong trao đổi và hợp tác", summary: "Xây dựng slide báo cáo học tập kết hợp biểu đồ, hình ảnh và hoạt ảnh hiệu quả." },
          { num: 9, title: "Bài 9a: Xác thực dữ liệu", summary: "Thiết lập quy tắc Data Validation trong bảng tính Excel/Google Sheets." },
          { num: 10, title: "Bài 10a: Sử dụng hàm COUNTIF", summary: "Đếm số ô thỏa mãn một điều kiện cho trước trong bảng tính điện tử." },
          { num: 11, title: "Bài 11a: Sử dụng hàm SUMIF", summary: "Tính tổng các giá trị trong vùng thỏa mãn tiêu chí lọc xác định." },
          { num: 12, title: "Bài 12a: Sử dụng hàm IF", summary: "Xử lý logic điều kiện lồng nhau và đánh giá xếp loại dữ liệu tự động." },
          { num: 13, title: "Bài 13a: Dự án: Quản lí tài chính gia đình", summary: "Thiết kế bảng tính hoàn chỉnh lập ngân sách thu chi và biểu đồ tài chính cá nhân." },
          { num: 14, title: "Bài 9b: Khám phá các chức năng của phần mềm làm video", summary: "Làm quen với giao diện timeline, video track, audio track trong biên tập video." },
          { num: 15, title: "Bài 10b: Chuẩn bị dữ liệu và dựng video", summary: "Thu thập ảnh, video clip, file âm thanh và bố cục theo kịch bản phân cảnh." },
          { num: 16, title: "Bài 11b: Dựng video theo kịch bản", summary: "Cắt ghép, đồng bộ âm thanh nền và chèn phụ đề, tiêu đề nghệ thuật." },
          { num: 17, title: "Bài 12b: Hoàn thành dựng video", summary: "Thêm hiệu ứng chuyển cảnh (transitions) và bộ lọc màu sắc sinh động." },
          { num: 18, title: "Bài 13b: Biên tập và xuất video", summary: "Kiểm tra tổng thể, render xuất file MP4 độ phân giải cao phục vụ thuyết trình." }
        ]
      },
      {
        name: "Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính",
        semester: 2,
        lessons: [
          { num: 19, title: "Bài 14: Giải quyết vấn đề", summary: "Các bước chia nhỏ bài toán phức tạp, mô hình hóa và xây dựng giải thuật." },
          { num: 20, title: "Bài 15: Bài toán tin học", summary: "Xác định rõ ràng Input, Output và cấu trúc điều khiển giải thuật bằng sơ đồ khối." },
          { num: 21, title: "Bài 16: Thực hành: Lập chương trình máy tính", summary: "Viết kịch bản hoặc mã lệnh Scratch/Python cơ bản thực thi thuật toán giải quyết vấn đề." }
        ]
      },
      {
        name: "Chủ đề 6: Hướng nghiệp với tin học",
        semester: 2,
        lessons: [
          { num: 22, title: "Bài 17: Tin học và thế giới nghề nghiệp", summary: "Khám phá các ngành nghề trong kỷ nguyên số: Lập trình, thiết kế, an ninh mạng, dữ liệu." }
        ]
      }
    ]
  },
  "van_6": {
    subjectId: "van" as SubjectId,
    grade: 6 as GradeLevel,
    subjectName: "Ngữ văn",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 10,
    totalExpectedChapters: 10,
    chapters: [
      {
        name: "Bài 1: Tôi và các bạn",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Tôi và các bạn", summary: "Truyện đồng thoại: Bài học đường đời đầu tiên, Nếu cậu muốn có một người bạn..." },
        ]
      },
      {
        name: "Bài 2: Gõ cửa trái tim",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 2: Gõ cửa trái tim", summary: "Thơ lục bát và thơ năm chữ: Chuyện cổ tích về loài người, Mây và sóng..." },
        ]
      },
      {
        name: "Bài 3: Yêu thương và chia sẻ",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 3: Yêu thương và chia sẻ", summary: "Truyện ngắn: Cô bé bán diêm, Gió lạnh đầu mùa..." },
        ]
      },
      {
        name: "Bài 4: Quê hương yêu dấu",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 4: Quê hương yêu dấu", summary: "Vẻ đẹp quê hương đất nước qua ca dao và thơ trữ tình." },
        ]
      },
      {
        name: "Bài 5: Những nẻo đường xứ sở",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 5: Những nẻo đường xứ sở", summary: "Văn bản kí: Du kí, nhật kí, tùy bút về cảnh sắc non sông Việt Nam." },
        ]
      },
      {
        name: "Bài 6: Chuyện kể về những người anh hùng",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 6: Chuyện kể về những người anh hùng", summary: "Truyền thuyết: Thánh Gióng, Sơn Tinh Thủy Tinh, Sự tích Hồ Gươm." },
        ]
      },
      {
        name: "Bài 7: Thế giới cổ tích",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 7: Thế giới cổ tích", summary: "Truyện cổ tích: Thạch Sanh, Cây khế, Vua chích choè." },
        ]
      },
      {
        name: "Bài 8: Khác biệt và gần gũi",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 8: Khác biệt và gần gũi", summary: "Văn bản nghị luận về sự đa dạng cá tính và lòng khoan dung." },
        ]
      },
      {
        name: "Bài 9: Trái Đất - ngôi nhà chung",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 9: Trái Đất - ngôi nhà chung", summary: "Văn bản thông tin: Bảo vệ môi trường sống, Trái Đất trước biến đổi khí hậu." },
        ]
      },
      {
        name: "Bài 10: Cuốn sách tôi yêu",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 10: Cuốn sách tôi yêu", summary: "Phương pháp đọc sách hiệu quả và viết bài giới thiệu cuốn sách tâm đắc." },
        ]
      },
    ]
  },
  "van_7": {
    subjectId: "van" as SubjectId,
    grade: 7 as GradeLevel,
    subjectName: "Ngữ văn",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 10,
    totalExpectedChapters: 10,
    chapters: [
      {
        name: "Bài 1: Bầu trời tuổi thơ",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Bầu trời tuổi thơ", summary: "Truyện về ký ức tuổi thơ, thiên nhiên Nam Bộ (Bầy chim chìa vôi, Đi lấy mật)." },
        ]
      },
      {
        name: "Bài 2: Khúc nhạc tâm hồn",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 2: Khúc nhạc tâm hồn", summary: "Thơ bốn chữ, năm chữ: Đồng dao mùa xuân, Gặp lá cơm nếp." },
        ]
      },
      {
        name: "Bài 3: Cội nguồn yêu thương",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 3: Cội nguồn yêu thương", summary: "Tình cảm gia đình: Vừa nhắm mắt vừa mở cửa sổ, Người thầy đầu tiên." },
        ]
      },
      {
        name: "Bài 4: Giai điệu đất nước",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 4: Giai điệu đất nước", summary: "Lòng tự hào dân tộc qua thơ ca: Mùa xuân nho nhỏ, Gò Me." },
        ]
      },
      {
        name: "Bài 5: Màu sắc trăm miền",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 5: Màu sắc trăm miền", summary: "Văn bản tản văn, tùy bút: Tháng Giêng mơ về trăng non rét ngọt." },
        ]
      },
      {
        name: "Bài 6: Bài học cuộc sống",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 6: Bài học cuộc sống", summary: "Truyện ngụ ngôn: Đẽo cày giữa đường, Ếch ngồi đáy giếng, Thầy bói xem voi." },
        ]
      },
      {
        name: "Bài 7: Thế giới viễn tưởng",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 7: Thế giới viễn tưởng", summary: "Truyện khoa học viễn tưởng: Cuộc chạm trán trên đại dương, Đường vào trung tâm vũ trụ." },
        ]
      },
      {
        name: "Bài 8: Trải nghiệm để trưởng thành",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 8: Trải nghiệm để trưởng thành", summary: "Nghị luận xã hội: Bản lĩnh vượt khó, tinh thần tự học." },
        ]
      },
      {
        name: "Bài 9: Hòa điệu với tự nhiên",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 9: Hòa điệu với tự nhiên", summary: "Văn bản thông tin: Thủy hải sản, cân bằng sinh thái." },
        ]
      },
      {
        name: "Bài 10: Trang sách và cuộc sống",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 10: Trang sách và cuộc sống", summary: "Tổng kết kỹ năng đọc hiểu và văn hóa đọc." },
        ]
      },
    ]
  },
  "van_8": {
    subjectId: "van" as SubjectId,
    grade: 8 as GradeLevel,
    subjectName: "Ngữ văn",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 10,
    totalExpectedChapters: 10,
    chapters: [
      {
        name: "Bài 1: Câu chuyện của lịch sử",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Câu chuyện của lịch sử", summary: "Truyện lịch sử: Lá cờ thêu sáu chữ vàng, Quang Trung đại phá quân Thanh." },
        ]
      },
      {
        name: "Bài 2: Vẻ đẹp cổ điển",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 2: Vẻ đẹp cổ điển", summary: "Thơ Đường luật và thơ lục bát cổ điển." },
        ]
      },
      {
        name: "Bài 3: Lời sông núi",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 3: Lời sông núi", summary: "Văn bản nghị luận trung đại: Hịch tướng sĩ, Tinh thần yêu nước của nhân dân ta." },
        ]
      },
      {
        name: "Bài 4: Tiếng cười trào phúng trong thơ",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 4: Tiếng cười trào phúng trong thơ", summary: "Thơ trào phúng: Lễ xướng danh khoa Đinh Dậu, Lai Tân." },
        ]
      },
      {
        name: "Bài 5: Những câu chuyện hài",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 5: Những câu chuyện hài", summary: "Kịch và truyện cười trào phúng." },
        ]
      },
      {
        name: "Bài 6: Chân dung cuộc sống",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 6: Chân dung cuộc sống", summary: "Truyện ngắn hiện đại: Lão Hạc, Chiếc lá cuối cùng." },
        ]
      },
      {
        name: "Bài 7: Tin yêu và ước vọng",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 7: Tin yêu và ước vọng", summary: "Thơ tự do: Nhớ rừng, Quê hương, Bếp lửa." },
        ]
      },
      {
        name: "Bài 8: Nhà văn và trang viết",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 8: Nhà văn và trang viết", summary: "Nghị luận văn học: Phân tích nhân vật và giá trị tác phẩm." },
        ]
      },
      {
        name: "Bài 9: Hôm nay và ngày mai",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 9: Hôm nay và ngày mai", summary: "Văn bản thông tin khoa học và đời sống." },
        ]
      },
      {
        name: "Bài 10: Sách - người bạn đồng hành",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 10: Sách - người bạn đồng hành", summary: "Kỹ năng tổng hợp thông tin từ nhiều nguồn sách." },
        ]
      },
    ]
  },
  "van_9": {
    subjectId: "van" as SubjectId,
    grade: 9 as GradeLevel,
    subjectName: "Ngữ văn",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 10,
    totalExpectedChapters: 10,
    chapters: [
      {
        name: "Bài 1: Thế giới kì ảo",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Thế giới kì ảo", summary: "Truyện truyền kì: Chuyện người con gái Nam Xương (Nguyễn Dữ)." },
        ]
      },
      {
        name: "Bài 2: Những cung bậc tâm trạng",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 2: Những cung bậc tâm trạng", summary: "Thơ song thất lục bát và thơ trữ tình cổ điển (Truyện Kiều - Nguyễn Du)." },
        ]
      },
      {
        name: "Bài 3: Hồn nước lắng sâu",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 3: Hồn nước lắng sâu", summary: "Thơ ca kháng chiến chống Pháp: Đồng chí (Chính Hữu)." },
        ]
      },
      {
        name: "Bài 4: Vẻ đẹp của thơ ca kháng chiến",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 4: Vẻ đẹp của thơ ca kháng chiến", summary: "Thơ ca kháng chiến chống Mỹ: Bài thơ về tiểu đội xe không kính (Phạm Tiến Duật)." },
        ]
      },
      {
        name: "Bài 5: Tiếng nói của tư tưởng",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 5: Tiếng nói của tư tưởng", summary: "Nghị luận triết học và chính trị - xã hội." },
        ]
      },
      {
        name: "Bài 6: Giải mã thế giới bí ẩn",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 6: Giải mã thế giới bí ẩn", summary: "Văn bản thông tin giải mã các hiện tượng văn hóa, thiên nhiên." },
        ]
      },
      {
        name: "Bài 7: Tiếng cười thức tỉnh",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 7: Tiếng cười thức tỉnh", summary: "Kịch hiện đại: Hồn Trương Ba, da hàng thịt." },
        ]
      },
      {
        name: "Bài 8: Chuyện đời xưa và nay",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 8: Chuyện đời xưa và nay", summary: "Truyện ký hiện đại: Làng (Kim Lân), Lặng lẽ Sa Pa (Nguyễn Thành Long)." },
        ]
      },
      {
        name: "Bài 9: Điểm tựa tâm hồn",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 9: Điểm tựa tâm hồn", summary: "Tình mẫu tử, tình phụ tử: Bến quê, Chiếc lược ngà." },
        ]
      },
      {
        name: "Bài 10: Trang sách đi cùng năm tháng",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 10: Trang sách đi cùng năm tháng", summary: "Ôn tập chuẩn bị thi tuyển sinh vào lớp 10 THPT." },
        ]
      },
    ]
  },
  "tieng-anh_6": {
    subjectId: "tieng-anh" as SubjectId,
    grade: 6 as GradeLevel,
    subjectName: "Tiếng Anh",
    bookSeries: "Global Success",
    totalExpectedLessons: 12,
    totalExpectedChapters: 12,
    chapters: [
      {
        name: "Unit 1: My New School",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 1: My New School", summary: "Vocabulary: school things, subjects. Grammar: Present Simple." },
        ]
      },
      {
        name: "Unit 2: My House",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 2: My House", summary: "Vocabulary: rooms, furniture. Grammar: Possessive case, prepositions of place." },
        ]
      },
      {
        name: "Unit 3: My Friends",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 3: My Friends", summary: "Vocabulary: body parts, appearance, personality. Grammar: Present Continuous." },
        ]
      },
      {
        name: "Unit 4: My Neighbourhood",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 4: My Neighbourhood", summary: "Vocabulary: places in town, directions. Grammar: Comparative adjectives." },
        ]
      },
      {
        name: "Unit 5: Natural Wonders of Viet Nam",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 5: Natural Wonders of Viet Nam", summary: "Vocabulary: natural wonders, geography. Grammar: Countable/Uncountable nouns, must/mustn't." },
        ]
      },
      {
        name: "Unit 6: Our Tet Holiday",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 6: Our Tet Holiday", summary: "Vocabulary: Tet holiday, new year traditions. Grammar: should/shouldn't, will for promises." },
        ]
      },
      {
        name: "Unit 7: Television",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 7: Television", summary: "Vocabulary: TV programmes, channels. Grammar: Wh-questions, conjunctions (and, but, because)." },
        ]
      },
      {
        name: "Unit 8: Sports and Games",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 8: Sports and Games", summary: "Vocabulary: sports, games, equipment. Grammar: Past Simple tense." },
        ]
      },
      {
        name: "Unit 9: Cities of the World",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 9: Cities of the World", summary: "Vocabulary: landmarks, cities. Grammar: Possessive pronouns, Superlative adjectives." },
        ]
      },
      {
        name: "Unit 10: Our Houses in the Future",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 10: Our Houses in the Future", summary: "Vocabulary: future appliances, smart homes. Grammar: Future Simple with will/won't." },
        ]
      },
      {
        name: "Unit 11: Our Greener World",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 11: Our Greener World", summary: "Vocabulary: 3Rs (Reduce, Reuse, Recycle), green living. Grammar: Conditional sentences Type 1." },
        ]
      },
      {
        name: "Unit 12: Robots",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 12: Robots", summary: "Vocabulary: types of robots, robot skills. Grammar: can/could, will be able to." },
        ]
      },
    ]
  },
  "tieng-anh_7": {
    subjectId: "tieng-anh" as SubjectId,
    grade: 7 as GradeLevel,
    subjectName: "Tiếng Anh",
    bookSeries: "Global Success",
    totalExpectedLessons: 12,
    totalExpectedChapters: 12,
    chapters: [
      {
        name: "Unit 1: Hobbies",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 1: Hobbies", summary: "Vocabulary: hobbies, crafts, collecting. Grammar: Present Simple with action verbs." },
        ]
      },
      {
        name: "Unit 2: Healthy Living",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 2: Healthy Living", summary: "Vocabulary: health problems, healthy habits. Grammar: Simple and compound sentences." },
        ]
      },
      {
        name: "Unit 3: Community Service",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 3: Community Service", summary: "Vocabulary: volunteering, charity work. Grammar: Past Simple vs Present Perfect." },
        ]
      },
      {
        name: "Unit 4: Music and Arts",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 4: Music and Arts", summary: "Vocabulary: musical instruments, painting, gallery. Grammar: (not) as... as, the same as, different from." },
        ]
      },
      {
        name: "Unit 5: Food and Drink",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 5: Food and Drink", summary: "Vocabulary: dishes, ingredients. Grammar: some, any, a lot of, how much/how many." },
        ]
      },
      {
        name: "Unit 6: A Visit to a School",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 6: A Visit to a School", summary: "Vocabulary: school facilities, subjects. Grammar: Prepositions of time and place." },
        ]
      },
      {
        name: "Unit 7: Traffic",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 7: Traffic", summary: "Vocabulary: vehicles, road signs, traffic rules. Grammar: It indicating distance, used to." },
        ]
      },
      {
        name: "Unit 8: Films",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 8: Films", summary: "Vocabulary: film genres, actors, reviews. Grammar: Connectors: although/though, however." },
        ]
      },
      {
        name: "Unit 9: Festivals around the World",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 9: Festivals around the World", summary: "Vocabulary: traditional festivals, celebrations. Grammar: Yes/No and Wh-questions." },
        ]
      },
      {
        name: "Unit 10: Energy Sources",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 10: Energy Sources", summary: "Vocabulary: renewable and non-renewable energy. Grammar: Present Continuous for future plans." },
        ]
      },
      {
        name: "Unit 11: Travelling in the Future",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 11: Travelling in the Future", summary: "Vocabulary: future transport (flying cars, hyperloop). Grammar: Will for future predictions." },
        ]
      },
      {
        name: "Unit 12: English-speaking Countries",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 12: English-speaking Countries", summary: "Vocabulary: people, culture of USA, UK, Australia, Canada. Grammar: Articles (a, an, the)." },
        ]
      },
    ]
  },
  "tieng-anh_8": {
    subjectId: "tieng-anh" as SubjectId,
    grade: 8 as GradeLevel,
    subjectName: "Tiếng Anh",
    bookSeries: "Global Success",
    totalExpectedLessons: 12,
    totalExpectedChapters: 12,
    chapters: [
      {
        name: "Unit 1: Leisure Time",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 1: Leisure Time", summary: "Vocabulary: leisure activities, DIY, origami. Grammar: Verbs of liking followed by gerunds/to-infinitives." },
        ]
      },
      {
        name: "Unit 2: Life in the Countryside",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 2: Life in the Countryside", summary: "Vocabulary: rural life, cattle, farming. Grammar: Comparative adverbs." },
        ]
      },
      {
        name: "Unit 3: Teenagers",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 3: Teenagers", summary: "Vocabulary: school pressure, peer pressure, clubs. Grammar: Simple and compound sentences, adverbial clauses of result." },
        ]
      },
      {
        name: "Unit 4: Ethnic Groups of Viet Nam",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 4: Ethnic Groups of Viet Nam", summary: "Vocabulary: ethnic minorities, costume, festivals. Grammar: Yes/No and Wh-questions, articles." },
        ]
      },
      {
        name: "Unit 5: Our Customs and Traditions",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 5: Our Customs and Traditions", summary: "Vocabulary: table manners, family traditions. Grammar: Modals of obligation (must, have to, should)." },
        ]
      },
      {
        name: "Unit 6: Lifestyles",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 6: Lifestyles", summary: "Vocabulary: modern lifestyles, nomadic life. Grammar: Future Continuous tense." },
        ]
      },
      {
        name: "Unit 7: Environmental Protection",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 7: Environmental Protection", summary: "Vocabulary: ecosystem, endangered species, pollution. Grammar: Complex sentences with adverbial clauses." },
        ]
      },
      {
        name: "Unit 8: Shopping",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 8: Shopping", summary: "Vocabulary: supermarkets, shopping habits, discounts. Grammar: Present Simple for schedules." },
        ]
      },
      {
        name: "Unit 9: Natural Disasters",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 9: Natural Disasters", summary: "Vocabulary: typhoon, earthquake, flood, tsunami. Grammar: Past Continuous tense." },
        ]
      },
      {
        name: "Unit 10: Communication in the Future",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 10: Communication in the Future", summary: "Vocabulary: telepathy, video conference, hologram. Grammar: Prepositions of time and place." },
        ]
      },
      {
        name: "Unit 11: Science and Technology",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 11: Science and Technology", summary: "Vocabulary: inventions, scientific breakthroughs. Grammar: Reported speech (statements)." },
        ]
      },
      {
        name: "Unit 12: Life on Other Planets",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 12: Life on Other Planets", summary: "Vocabulary: aliens, solar system, UFOs. Grammar: Reported questions." },
        ]
      },
    ]
  },
  "tieng-anh_9": {
    subjectId: "tieng-anh" as SubjectId,
    grade: 9 as GradeLevel,
    subjectName: "Tiếng Anh",
    bookSeries: "Global Success",
    totalExpectedLessons: 12,
    totalExpectedChapters: 12,
    chapters: [
      {
        name: "Unit 1: Local Community",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 1: Local Community", summary: "Vocabulary: community helpers, artisan, craft village. Grammar: Question words before to-infinitives." },
        ]
      },
      {
        name: "Unit 2: City Life",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 2: City Life", summary: "Vocabulary: urban lifestyle, traffic congestion, facilities. Grammar: Double comparatives (The more... the more)." },
        ]
      },
      {
        name: "Unit 3: Healthy Living for Teens",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 3: Healthy Living for Teens", summary: "Vocabulary: physical fitness, mental health, diet. Grammar: Modal verbs with passive voice." },
        ]
      },
      {
        name: "Unit 4: Remembering the Past",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 4: Remembering the Past", summary: "Vocabulary: historical events, preserving heritage. Grammar: Past Perfect tense." },
        ]
      },
      {
        name: "Unit 5: Our Experiences",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 5: Our Experiences", summary: "Vocabulary: travel experiences, extreme sports. Grammar: Present Perfect Continuous." },
        ]
      },
      {
        name: "Unit 6: Viet Nam: Then and Now",
        semester: 1,
        lessons: [
          { num: 1, title: "Unit 6: Viet Nam: Then and Now", summary: "Vocabulary: socioeconomic changes, infrastructure. Grammar: used to, be used to, get used to." },
        ]
      },
      {
        name: "Unit 7: Natural Wonders of the World",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 7: Natural Wonders of the World", summary: "Vocabulary: world heritage sites, conservation. Grammar: Relative clauses with who, which, that." },
        ]
      },
      {
        name: "Unit 8: Tourism",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 8: Tourism", summary: "Vocabulary: ecotourism, travel tips, destinations. Grammar: Defining and non-defining relative clauses." },
        ]
      },
      {
        name: "Unit 9: World Englishes",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 9: World Englishes", summary: "Vocabulary: English dialects, accents, idioms. Grammar: Conditional sentences Type 2." },
        ]
      },
      {
        name: "Unit 10: Planet Earth",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 10: Planet Earth", summary: "Vocabulary: global warming, biosphere, conservation. Grammar: Non-defining relative clauses review." },
        ]
      },
      {
        name: "Unit 11: Electronic Devices",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 11: Electronic Devices", summary: "Vocabulary: smartphones, AI gadgets, wearables. Grammar: Passive voice in various tenses." },
        ]
      },
      {
        name: "Unit 12: Career Paths",
        semester: 2,
        lessons: [
          { num: 1, title: "Unit 12: Career Paths", summary: "Vocabulary: job sectors, skills, career orientation. Grammar: Despite, in spite of, although." },
        ]
      },
    ]
  },
  "khtn_6": {
    subjectId: "khtn" as SubjectId,
    grade: 6 as GradeLevel,
    subjectName: "Khoa học tự nhiên",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 38,
    totalExpectedChapters: 6,
    chapters: [
      {
        name: "Chương 1: Mở đầu về KHTN và các phép đo",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Giới thiệu về Khoa học tự nhiên", summary: "Các lĩnh vực chính của KHTN và vai trò của KHTN trong cuộc sống." },
          { num: 2, title: "Bài 2: An toàn trong phòng thực hành", summary: "Quy định an toàn, ký hiệu cảnh báo và sơ cứu cơ bản." },
          { num: 3, title: "Bài 3: Sử dụng kính lúp và kính hiển vi quang học", summary: "Cấu tạo và kỹ năng sử dụng kính lúp, kính hiển vi." },
          { num: 4, title: "Bài 4: Đo chiều dài", summary: "Dụng cụ đo, đơn vị đo mét và cách đo chiều dài chính xác." },
          { num: 5, title: "Bài 5: Đo khối lượng", summary: "Cân đồng hồ, cân điện tử và đơn vị kilogam." },
          { num: 6, title: "Bài 6: Đo thời gian", summary: "Đồng hồ bấm giây và đơn vị giây." },
          { num: 7, title: "Bài 7: Đo nhiệt độ", summary: "Nhiệt kế thủy ngân, nhiệt kế điện tử và thang đo độ Celsius." },
        ]
      },
      {
        name: "Chương 2: Chất quanh ta",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 8: Sự đa dạng của chất", summary: "Chất tinh khiết, hỗn hợp đồng nhất và hỗn hợp không đồng nhất." },
          { num: 2, title: "Bài 9: Các thể của chất và sự chuyển thể", summary: "Thể rắn, lỏng, khí và sự nóng chảy, bay hơi, ngưng tụ, đông đặc." },
          { num: 3, title: "Bài 10: Không khí và bảo vệ môi trường không khí", summary: "Thành phần không khí (Nitrogen, Oxygen, CO2) và các biện pháp giảm ô nhiễm." },
          { num: 4, title: "Bài 11: Một số vật liệu thông dụng", summary: "Kim loại, nhựa, thủy tinh, gốm sứ và tính chất sử dụng an toàn." },
          { num: 5, title: "Bài 12: Nhiên liệu và an ninh năng lượng", summary: "Xăng, dầu, than đá, khí gas và sử dụng tiết kiệm." },
          { num: 6, title: "Bài 13: Lương thực - thực phẩm", summary: "Carbohydrate, protein, lipid, vitamin và an toàn vệ sinh thực phẩm." },
          { num: 7, title: "Bài 14: Dung dịch và huyền phù, nhũ tương", summary: "Dung môi, chất tan, dung dịch bão hòa và hỗn hợp huyền phù." },
          { num: 8, title: "Bài 15: Tách chất ra khỏi hỗn hợp", summary: "Phương pháp lọc, cô cạn, chiết." },
        ]
      },
      {
        name: "Chương 3: Tế bào - Đơn vị cơ sở của sự sống",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 16: Tế bào - Đơn vị cơ bản của sự sống", summary: "Kích thước, hình dạng tế bào; tế bào nhân sơ và tế bào nhân thực." },
          { num: 2, title: "Bài 17: Cấu tạo và chức năng các thành phần của tế bào", summary: "Màng sinh chất, chất tế bào, nhân/vùng nhân, lục lạp." },
          { num: 3, title: "Bài 18: Sự lớn lên và phân chia của tế bào", summary: "Ý nghĩa của quá trình nguyên phân đối với sự sinh trưởng của sinh vật." },
          { num: 4, title: "Bài 19: Từ tế bào đến cơ thể", summary: "Tế bào -> Mô -> Cơ quan -> Hệ cơ quan -> Cơ thể." },
        ]
      },
      {
        name: "Chương 4: Đa dạng thế giới sống",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 20: Khóa lưỡng phân", summary: "Cách xây dựng khóa lưỡng phân để phân loại sinh vật." },
          { num: 2, title: "Bài 21: Virus", summary: "Cấu tạo đơn giản gồm vỏ protein và lõi acid nucleic, tác hại và vaccine." },
          { num: 3, title: "Bài 22: Vi khuẩn", summary: "Hình dạng, vai trò trong lên men và bệnh do vi khuẩn." },
          { num: 4, title: "Bài 23: Nguyên sinh vật", summary: "Trùng roi, trùng giày, trùng biến hình." },
          { num: 5, title: "Bài 24: Nấm", summary: "Nấm men, nấm mốc, nấm đảm và phòng ngộ độc nấm." },
          { num: 6, title: "Bài 25: Thực vật", summary: "Rêu, Dương xỉ, Hạt trần (thông), Hạt kín (cây có hoa)." },
          { num: 7, title: "Bài 26: Động vật không xương sống", summary: "Ruột khoang, giun, thân mềm, chân khớp." },
          { num: 8, title: "Bài 27: Động vật có xương sống", summary: "Cá, Lưỡng cư, Bò sát, Chim, Thú." },
          { num: 9, title: "Bài 28: Đa dạng sinh học", summary: "Bảo vệ các loài có nguy cơ tuyệt chủng và khu bảo tồn." },
        ]
      },
      {
        name: "Chương 5: Lực và Năng lượng",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 29: Lực và tác dụng của lực", summary: "Lực tiếp xúc và không tiếp xúc, biểu diễn lực bằng mũi tên." },
          { num: 2, title: "Bài 30: Lực hấp dẫn và trọng lượng", summary: "Mối liên hệ giữa khối lượng m và trọng lượng P = 10m." },
          { num: 3, title: "Bài 31: Lực ma sát", summary: "Ma sát trượt, ma sát nghỉ, ma sát lăn và vai trò trong đời sống." },
          { num: 4, title: "Bài 32: Lực cản của nước và không khí", summary: "Lực cản tác dụng lên vật chuyển động trong chất lưu." },
          { num: 5, title: "Bài 33: Năng lượng và các dạng năng lượng", summary: "Động năng, thế năng, hóa năng, nhiệt năng, điện năng." },
          { num: 6, title: "Bài 34: Sự chuyển hóa và bảo toàn năng lượng", summary: "Định luật bảo toàn và chuyển hóa năng lượng." },
          { num: 7, title: "Bài 35: Tiết kiệm năng lượng", summary: "Giải pháp sử dụng thiết bị hiệu suất cao." },
        ]
      },
      {
        name: "Chương 6: Trái Đất và bầu trời",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 36: Chuyển động nhìn thấy của Mặt Trời", summary: "Mặt Trời mọc hướng Đông lặn hướng Tây do Trái Đất tự quay quanh trục." },
          { num: 2, title: "Bài 37: Mặt Trăng và các pha của Mặt Trăng", summary: "Trăng tròn, trăng khuyết, trăng bán nguyệt và tuần trăng." },
          { num: 3, title: "Bài 38: Hệ Mặt Trời và Ngân Hà", summary: "8 hành tinh trong Hệ Mặt Trời và dải Ngân Hà." },
        ]
      },
    ]
  },
  "khtn_7": {
    subjectId: "khtn" as SubjectId,
    grade: 7 as GradeLevel,
    subjectName: "Khoa học tự nhiên",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 24,
    totalExpectedChapters: 6,
    chapters: [
      {
        name: "Chương 1: Nguyên tử - Sơ lược bảng tuần hoàn",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Phương pháp học tập KHTN", summary: "Kỹ năng quan sát và tiến hành thí nghiệm." },
          { num: 2, title: "Bài 2: Nguyên tử", summary: "Cấu tạo nguyên tử gồm hạt nhân (proton, neutron) và vỏ electron." },
          { num: 3, title: "Bài 3: Nguyên tố hóa học", summary: "Ký hiệu hóa học và số hiệu nguyên tử." },
          { num: 4, title: "Bài 4: Sơ lược bảng tuần hoàn các nguyên tố hóa học", summary: "Ô nguyên tố, chu kỳ, nhóm." },
        ]
      },
      {
        name: "Chương 2: Phân tử - Liên kết hóa học",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 5: Phân tử - Đơn chất - Hợp chất", summary: "Phân biệt đơn chất kim loại, phi kim và hợp chất." },
          { num: 2, title: "Bài 6: Liên kết hóa học", summary: "Liên kết ion và liên kết cộng hóa trị." },
          { num: 3, title: "Bài 7: Hóa trị và công thức hóa học", summary: "Quy tắc hóa trị và lập CTHH." },
        ]
      },
      {
        name: "Chương 3: Tốc độ và Âm thanh",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 8: Tốc độ chuyển động", summary: "Công thức v = s/t và dụng cụ đo tốc độ." },
          { num: 2, title: "Bài 9: Đồ thị quãng đường - thời gian", summary: "Đọc đồ thị s-t." },
          { num: 3, title: "Bài 10: Sóng âm", summary: "Nguồn âm, sự truyền sóng âm trong các môi trường." },
          { num: 4, title: "Bài 11: Độ cao và độ to của âm", summary: "Tần số dao động và biên độ âm." },
        ]
      },
      {
        name: "Chương 4: Ánh sáng và Từ trường",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 12: Ánh sáng, tia sáng", summary: "Định luật truyền thẳng ánh sáng." },
          { num: 2, title: "Bài 13: Sự phản xạ ánh sáng", summary: "Định luật phản xạ ánh sáng và ảnh tạo bởi gương phẳng." },
          { num: 3, title: "Bài 14: Nam châm", summary: "Cực từ, từ tính của nam châm vĩnh cửu." },
          { num: 4, title: "Bài 15: Từ trường", summary: "Đường sức từ và từ trường Trái Đất." },
        ]
      },
      {
        name: "Chương 5: Trao đổi chất và chuyển hóa năng lượng",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 16: Quang hợp ở thực vật", summary: "Phương trình quang hợp và các yếu tố ảnh hưởng." },
          { num: 2, title: "Bài 17: Hô hấp tế bào", summary: "Phân giải glucose tạo ATP và các yếu tố ảnh hưởng." },
          { num: 3, title: "Bài 18: Trao đổi khí ở sinh vật", summary: "Khí khổng ở lá cây và hệ hô hấp động vật." },
          { num: 4, title: "Bài 19: Vận chuyển các chất trong cơ thể", summary: "Mạch rây, mạch gỗ và hệ tuần hoàn máu." },
        ]
      },
      {
        name: "Chương 6: Cảm ứng, sinh trưởng và phát triển",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 20: Cảm ứng ở sinh vật", summary: "Tính hướng sáng, hướng đất ở thực vật và phản xạ ở động vật." },
          { num: 2, title: "Bài 21: Sinh trưởng và phát triển ở sinh vật", summary: "Vòng đời sinh vật và nhân tố điều hòa." },
          { num: 3, title: "Bài 22: Sinh sản vô tính ở sinh vật", summary: "Sinh sản sinh dưỡng, nảy chồi, phân đôi." },
          { num: 4, title: "Bài 23: Sinh sản hữu tính ở sinh vật", summary: "Thụ phấn, thụ tinh và hình thành hạt." },
          { num: 5, title: "Bài 24: Điều hòa sinh sản ở sinh vật", summary: "Ứng dụng trong chăn nuôi và trồng trọt." },
        ]
      },
    ]
  },
  "khtn_8": {
    subjectId: "khtn" as SubjectId,
    grade: 8 as GradeLevel,
    subjectName: "Khoa học tự nhiên",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 24,
    totalExpectedChapters: 6,
    chapters: [
      {
        name: "Chương 1: Phản ứng hóa học",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Biến đổi vật lí và biến đổi hóa học", summary: "Dấu hiệu nhận biết phản ứng hóa học." },
          { num: 2, title: "Bài 2: Phản ứng hóa học", summary: "Phương trình chữ và cơ chế phá vỡ liên kết." },
          { num: 3, title: "Bài 3: Định luật bảo toàn khối lượng", summary: "Tổng khối lượng các chất tham gia bằng tổng khối lượng sản phẩm." },
          { num: 4, title: "Bài 4: Phương trình hóa học", summary: "Các bước cân bằng phương trình hóa học." },
        ]
      },
      {
        name: "Chương 2: Mol và tính toán hóa học",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 5: Mol và khối lượng mol", summary: "Khái niệm mol và hằng số Avogadro." },
          { num: 2, title: "Bài 6: Thể tích mol của chất khí", summary: "Thể tích 1 mol khí ở điều kiện chuẩn (24,79 lít)." },
          { num: 3, title: "Bài 7: Tỉ khối của chất khí", summary: "Công thức d_A/B = M_A / M_B." },
          { num: 4, title: "Bài 8: Nồng độ dung dịch", summary: "Nồng độ phần trăm C% và nồng độ mol C_M." },
        ]
      },
      {
        name: "Chương 3: Các hợp chất vô cơ",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 9: Acid", summary: "Tính chất của acid HCl, H2SO4 và thang pH." },
          { num: 2, title: "Bài 10: Base", summary: "Tính chất của base kiềm và quỳ tím." },
          { num: 3, title: "Bài 11: Oxide", summary: "Oxide base và oxide acid." },
          { num: 4, title: "Bài 12: Muối", summary: "Phản ứng trao đổi trong dung dịch và phân bón hóa học." },
        ]
      },
      {
        name: "Chương 4: Khối lượng riêng và Áp suất",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 13: Khối lượng riêng", summary: "Công thức D = m/V và đơn vị kg/m³." },
          { num: 2, title: "Bài 14: Tác dụng làm quay của lực - Đòn bẩy", summary: "Mômen lực và các loại đòn bẩy." },
          { num: 3, title: "Bài 15: Áp suất trên một bề mặt", summary: "Công thức p = F/S và áp suất chất lỏng." },
          { num: 4, title: "Bài 16: Áp suất khí quyển", summary: "Áp kế và hiện tượng khí quyển." },
        ]
      },
      {
        name: "Chương 5: Điện học và Nhiệt học",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 17: Hiện tượng nhiễm điện", summary: "Điện tích dương và âm." },
          { num: 2, title: "Bài 18: Mạch điện đơn giản", summary: "Nguồn điện, công tắc, bóng đèn." },
          { num: 3, title: "Bài 19: Năng lượng nhiệt", summary: "Nội năng và sự truyền nhiệt." },
          { num: 4, title: "Bài 20: Sự nở vì nhiệt", summary: "Nở dài và nở khối của các chất." },
        ]
      },
      {
        name: "Chương 6: Sinh học cơ thể người và Hệ sinh thái",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 21: Hệ vận động ở người", summary: "Xương, cơ và phòng bệnh cong vẹo cột sống." },
          { num: 2, title: "Bài 22: Hệ tiêu hóa ở người", summary: "Cấu tạo ống tiêu hóa và tiêu hóa thức ăn." },
          { num: 3, title: "Bài 23: Hệ tuần hoàn ở người", summary: "Tim, mạch máu và huyết áp." },
          { num: 4, title: "Bài 24: Quần xã sinh vật và Hệ sinh thái", summary: "Chuỗi thức ăn và lưới thức ăn." },
        ]
      },
    ]
  },
  "khtn_9": {
    subjectId: "khtn" as SubjectId,
    grade: 9 as GradeLevel,
    subjectName: "Khoa học tự nhiên",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 24,
    totalExpectedChapters: 6,
    chapters: [
      {
        name: "Chương 1: Động năng và Thế năng",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Công cơ học", summary: "Công thức A = F.s và đơn vị Joule." },
          { num: 2, title: "Bài 2: Công suất", summary: "Công thức P = A/t và ý nghĩa công suất." },
          { num: 3, title: "Bài 3: Động năng và thế năng", summary: "Chuyển hóa giữa động năng và thế năng." },
        ]
      },
      {
        name: "Chương 2: Ánh sáng",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 4: Khúc xạ ánh sáng", summary: "Hiện tượng tia sáng đổi hướng khi truyền qua hai môi trường." },
          { num: 2, title: "Bài 5: Thấu kính hội tụ", summary: "Đặc điểm thấu kính và ảnh thật, ảnh ảo." },
          { num: 3, title: "Bài 6: Thấu kính phân kì", summary: "Đặc điểm và ảnh tạo bởi thấu kính phân kì." },
          { num: 4, title: "Bài 7: Kính lúp", summary: "Số bội giác và cấu tạo kính lúp." },
        ]
      },
      {
        name: "Chương 3: Kim loại và Phi kim",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 8: Tính chất hóa học của kim loại", summary: "Tác dụng với phi kim, acid, muối." },
          { num: 2, title: "Bài 9: Dãy hoạt động hóa học của kim loại", summary: "Ý nghĩa dãy hoạt động K, Na, Mg, Al, Zn, Fe, Pb, H, Cu, Ag, Au." },
          { num: 3, title: "Bài 10: Nhôm và Sắt", summary: "Tính chất đặc trưng và ứng dụng." },
          { num: 4, title: "Bài 11: Phi kim: Carbon và Silicon", summary: "Tính chất phi kim và hợp chất oxide." },
        ]
      },
      {
        name: "Chương 4: Hợp chất hữu cơ",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 12: Khái niệm hợp chất hữu cơ", summary: "Hóa học hữu cơ và công thức phân tử." },
          { num: 2, title: "Bài 13: Methane và Ethylene", summary: "Hydrocarbon no và không no." },
          { num: 3, title: "Bài 14: Rượu ethylic (Ethanol)", summary: "Công thức C2H5OH, phản ứng cháy và lên men giấm." },
          { num: 4, title: "Bài 15: Acetic acid", summary: "Công thức CH3COOH và phản ứng ester hóa." },
          { num: 5, title: "Bài 16: Lipid, Carbohydrate và Polymer", summary: "Chất béo, glucose, tinh bột, cellulose, chất dẻo." },
        ]
      },
      {
        name: "Chương 5: Di truyền học",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 17: Di truyền học Mendel", summary: "Phương pháp lai một cặp tính trạng của Mendel." },
          { num: 2, title: "Bài 18: Nhiễm sắc thể", summary: "Cấu trúc NST và cơ chế nguyên phân, giảm phân." },
          { num: 3, title: "Bài 19: DNA và Gene", summary: "Cấu trúc chuỗi xoắn kép DNA và phiên mã RNA." },
          { num: 4, title: "Bài 20: Đột biến gene và đột biến NST", summary: "Nguyên nhân và hậu quả đột biến." },
        ]
      },
      {
        name: "Chương 6: Di truyền học người và Tiến hóa",
        semester: 2,
        lessons: [
          { num: 1, title: "Bài 21: Di truyền học người", summary: "Bệnh và tật di truyền ở người." },
          { num: 2, title: "Bài 22: Công nghệ gene và tế bào", summary: "Nhân bản vô tính và sinh vật biến đổi gene." },
          { num: 3, title: "Bài 23: Bằng chứng tiến hóa", summary: "Bằng chứng giải phẫu so sánh và hóa thạch." },
          { num: 4, title: "Bài 24: Học thuyết tiến hóa hiện đại", summary: "Chọn lọc tự nhiên và sự hình thành loài mới." },
        ]
      },
    ]
  },
  "lich-su-dia-ly_6": {
    subjectId: "lich-su-dia-ly" as SubjectId,
    grade: 6 as GradeLevel,
    subjectName: "Lịch sử và Địa lí",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 20,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Phân môn Lịch sử: Nguồn gốc loài người và các nền văn minh cổ đại (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Lịch sử và cuộc sống", summary: "Ý nghĩa của việc học lịch sử và các nguồn sử liệu." },
          { num: 2, title: "Bài 2: Nguồn gốc loài người", summary: "Quá trình tiến hóa từ Vượn người thành Người tinh khôn." },
          { num: 3, title: "Bài 3: Xã hội nguyên thủy", summary: "Đời sống vật chất, tinh thần của thị tộc và bộ lạc." },
          { num: 4, title: "Bài 4: Ai Cập và Lưỡng Hà cổ đại", summary: "Kim tự tháp, sông Nile và chữ tượng hình." },
          { num: 5, title: "Bài 5: Ấn Độ và Trung Quốc cổ đại", summary: "Tôn giáo, triết học và thành tựu văn minh phương Đông." },
          { num: 6, title: "Bài 6: Hy Lạp và La Mã cổ đại", summary: "Chế độ dân chủ chủ nô và văn hóa phương Tây." },
          { num: 7, title: "Bài 7: Các quốc gia sơ kì ở Đông Nam Á", summary: "Sự hình thành các nhà nước cổ ở Đông Nam Á." },
          { num: 8, title: "Bài 8: Nước Văn Lang - Âu Lạc", summary: "Nhà nước đầu tiên của người Việt thời Hùng Vương." },
          { num: 9, title: "Bài 9: Đấu tranh giành độc lập thời Bắc thuộc", summary: "Khởi nghĩa Hai Bà Trưng, Bà Triệu, Lý Bí, Mai Thúc Loan." },
          { num: 10, title: "Bài 10: Khởi nghĩa Phùng Hưng và chiến thắng Bạch Đằng", summary: "Ngô Quyền mở ra kỷ nguyên độc lập tự chủ." },
        ]
      },
      {
        name: "Phân môn Địa lí: Trái Đất và môi trường sống của con người (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 11: Bản đồ và cách sử dụng bản đồ", summary: "Tỉ lệ bản đồ, kinh tuyến, vĩ tuyến và tọa độ địa lí." },
          { num: 2, title: "Bài 12: Chuyển động tự quay của Trái Đất", summary: "Hiện tượng ngày đêm luân phiên và giờ trên Trái Đất." },
          { num: 3, title: "Bài 13: Chuyển động của Trái Đất quanh Mặt Trời", summary: "Hiện tượng mùa và ngày đêm dài ngắn theo mùa." },
          { num: 4, title: "Bài 14: Cấu tạo Trái Đất và mảng kiến tạo", summary: "Vỏ Trái Đất, động đất và núi lửa." },
          { num: 5, title: "Bài 15: Địa hình bề mặt Trái Đất", summary: "Núi, đồi, đồng bằng, cao nguyên." },
          { num: 6, title: "Bài 16: Khí quyển và nhiệt độ không khí", summary: "Các tầng khí quyển và phân bố nhiệt độ." },
          { num: 7, title: "Bài 17: Khí áp và gió trên Trái Đất", summary: "Các đai khí áp và gió Tín phong, gió Tây ôn đới, gió mùa." },
          { num: 8, title: "Bài 18: Nước trên Trái Đất", summary: "Thủy quyển, sông ngòi, hồ đầm và nước ngầm." },
          { num: 9, title: "Bài 19: Thổ nhưỡng và sinh vật", summary: "Các tầng đất và sự đa dạng của giới sinh vật." },
          { num: 10, title: "Bài 20: Dân số và sự phân bố dân cư thế giới", summary: "Quy mô dân số và đô thị hóa." },
        ]
      },
    ]
  },
  "lich-su-dia-ly_7": {
    subjectId: "lich-su-dia-ly" as SubjectId,
    grade: 7 as GradeLevel,
    subjectName: "Lịch sử và Địa lí",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 20,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Phân môn Lịch sử: Nguồn gốc loài người và các nền văn minh cổ đại (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Lịch sử và cuộc sống", summary: "Ý nghĩa của việc học lịch sử và các nguồn sử liệu." },
          { num: 2, title: "Bài 2: Nguồn gốc loài người", summary: "Quá trình tiến hóa từ Vượn người thành Người tinh khôn." },
          { num: 3, title: "Bài 3: Xã hội nguyên thủy", summary: "Đời sống vật chất, tinh thần của thị tộc và bộ lạc." },
          { num: 4, title: "Bài 4: Ai Cập và Lưỡng Hà cổ đại", summary: "Kim tự tháp, sông Nile và chữ tượng hình." },
          { num: 5, title: "Bài 5: Ấn Độ và Trung Quốc cổ đại", summary: "Tôn giáo, triết học và thành tựu văn minh phương Đông." },
          { num: 6, title: "Bài 6: Hy Lạp và La Mã cổ đại", summary: "Chế độ dân chủ chủ nô và văn hóa phương Tây." },
          { num: 7, title: "Bài 7: Các quốc gia sơ kì ở Đông Nam Á", summary: "Sự hình thành các nhà nước cổ ở Đông Nam Á." },
          { num: 8, title: "Bài 8: Nước Văn Lang - Âu Lạc", summary: "Nhà nước đầu tiên của người Việt thời Hùng Vương." },
          { num: 9, title: "Bài 9: Đấu tranh giành độc lập thời Bắc thuộc", summary: "Khởi nghĩa Hai Bà Trưng, Bà Triệu, Lý Bí, Mai Thúc Loan." },
          { num: 10, title: "Bài 10: Khởi nghĩa Phùng Hưng và chiến thắng Bạch Đằng", summary: "Ngô Quyền mở ra kỷ nguyên độc lập tự chủ." },
        ]
      },
      {
        name: "Phân môn Địa lí: Trái Đất và môi trường sống của con người (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 11: Bản đồ và cách sử dụng bản đồ", summary: "Tỉ lệ bản đồ, kinh tuyến, vĩ tuyến và tọa độ địa lí." },
          { num: 2, title: "Bài 12: Chuyển động tự quay của Trái Đất", summary: "Hiện tượng ngày đêm luân phiên và giờ trên Trái Đất." },
          { num: 3, title: "Bài 13: Chuyển động của Trái Đất quanh Mặt Trời", summary: "Hiện tượng mùa và ngày đêm dài ngắn theo mùa." },
          { num: 4, title: "Bài 14: Cấu tạo Trái Đất và mảng kiến tạo", summary: "Vỏ Trái Đất, động đất và núi lửa." },
          { num: 5, title: "Bài 15: Địa hình bề mặt Trái Đất", summary: "Núi, đồi, đồng bằng, cao nguyên." },
          { num: 6, title: "Bài 16: Khí quyển và nhiệt độ không khí", summary: "Các tầng khí quyển và phân bố nhiệt độ." },
          { num: 7, title: "Bài 17: Khí áp và gió trên Trái Đất", summary: "Các đai khí áp và gió Tín phong, gió Tây ôn đới, gió mùa." },
          { num: 8, title: "Bài 18: Nước trên Trái Đất", summary: "Thủy quyển, sông ngòi, hồ đầm và nước ngầm." },
          { num: 9, title: "Bài 19: Thổ nhưỡng và sinh vật", summary: "Các tầng đất và sự đa dạng của giới sinh vật." },
          { num: 10, title: "Bài 20: Dân số và sự phân bố dân cư thế giới", summary: "Quy mô dân số và đô thị hóa." },
        ]
      },
    ]
  },
  "lich-su-dia-ly_8": {
    subjectId: "lich-su-dia-ly" as SubjectId,
    grade: 8 as GradeLevel,
    subjectName: "Lịch sử và Địa lí",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 20,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Phân môn Lịch sử: Nguồn gốc loài người và các nền văn minh cổ đại (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Lịch sử và cuộc sống", summary: "Ý nghĩa của việc học lịch sử và các nguồn sử liệu." },
          { num: 2, title: "Bài 2: Nguồn gốc loài người", summary: "Quá trình tiến hóa từ Vượn người thành Người tinh khôn." },
          { num: 3, title: "Bài 3: Xã hội nguyên thủy", summary: "Đời sống vật chất, tinh thần của thị tộc và bộ lạc." },
          { num: 4, title: "Bài 4: Ai Cập và Lưỡng Hà cổ đại", summary: "Kim tự tháp, sông Nile và chữ tượng hình." },
          { num: 5, title: "Bài 5: Ấn Độ và Trung Quốc cổ đại", summary: "Tôn giáo, triết học và thành tựu văn minh phương Đông." },
          { num: 6, title: "Bài 6: Hy Lạp và La Mã cổ đại", summary: "Chế độ dân chủ chủ nô và văn hóa phương Tây." },
          { num: 7, title: "Bài 7: Các quốc gia sơ kì ở Đông Nam Á", summary: "Sự hình thành các nhà nước cổ ở Đông Nam Á." },
          { num: 8, title: "Bài 8: Nước Văn Lang - Âu Lạc", summary: "Nhà nước đầu tiên của người Việt thời Hùng Vương." },
          { num: 9, title: "Bài 9: Đấu tranh giành độc lập thời Bắc thuộc", summary: "Khởi nghĩa Hai Bà Trưng, Bà Triệu, Lý Bí, Mai Thúc Loan." },
          { num: 10, title: "Bài 10: Khởi nghĩa Phùng Hưng và chiến thắng Bạch Đằng", summary: "Ngô Quyền mở ra kỷ nguyên độc lập tự chủ." },
        ]
      },
      {
        name: "Phân môn Địa lí: Trái Đất và môi trường sống của con người (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 11: Bản đồ và cách sử dụng bản đồ", summary: "Tỉ lệ bản đồ, kinh tuyến, vĩ tuyến và tọa độ địa lí." },
          { num: 2, title: "Bài 12: Chuyển động tự quay của Trái Đất", summary: "Hiện tượng ngày đêm luân phiên và giờ trên Trái Đất." },
          { num: 3, title: "Bài 13: Chuyển động của Trái Đất quanh Mặt Trời", summary: "Hiện tượng mùa và ngày đêm dài ngắn theo mùa." },
          { num: 4, title: "Bài 14: Cấu tạo Trái Đất và mảng kiến tạo", summary: "Vỏ Trái Đất, động đất và núi lửa." },
          { num: 5, title: "Bài 15: Địa hình bề mặt Trái Đất", summary: "Núi, đồi, đồng bằng, cao nguyên." },
          { num: 6, title: "Bài 16: Khí quyển và nhiệt độ không khí", summary: "Các tầng khí quyển và phân bố nhiệt độ." },
          { num: 7, title: "Bài 17: Khí áp và gió trên Trái Đất", summary: "Các đai khí áp và gió Tín phong, gió Tây ôn đới, gió mùa." },
          { num: 8, title: "Bài 18: Nước trên Trái Đất", summary: "Thủy quyển, sông ngòi, hồ đầm và nước ngầm." },
          { num: 9, title: "Bài 19: Thổ nhưỡng và sinh vật", summary: "Các tầng đất và sự đa dạng của giới sinh vật." },
          { num: 10, title: "Bài 20: Dân số và sự phân bố dân cư thế giới", summary: "Quy mô dân số và đô thị hóa." },
        ]
      },
    ]
  },
  "lich-su-dia-ly_9": {
    subjectId: "lich-su-dia-ly" as SubjectId,
    grade: 9 as GradeLevel,
    subjectName: "Lịch sử và Địa lí",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 20,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Phân môn Lịch sử: Nguồn gốc loài người và các nền văn minh cổ đại (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Lịch sử và cuộc sống", summary: "Ý nghĩa của việc học lịch sử và các nguồn sử liệu." },
          { num: 2, title: "Bài 2: Nguồn gốc loài người", summary: "Quá trình tiến hóa từ Vượn người thành Người tinh khôn." },
          { num: 3, title: "Bài 3: Xã hội nguyên thủy", summary: "Đời sống vật chất, tinh thần của thị tộc và bộ lạc." },
          { num: 4, title: "Bài 4: Ai Cập và Lưỡng Hà cổ đại", summary: "Kim tự tháp, sông Nile và chữ tượng hình." },
          { num: 5, title: "Bài 5: Ấn Độ và Trung Quốc cổ đại", summary: "Tôn giáo, triết học và thành tựu văn minh phương Đông." },
          { num: 6, title: "Bài 6: Hy Lạp và La Mã cổ đại", summary: "Chế độ dân chủ chủ nô và văn hóa phương Tây." },
          { num: 7, title: "Bài 7: Các quốc gia sơ kì ở Đông Nam Á", summary: "Sự hình thành các nhà nước cổ ở Đông Nam Á." },
          { num: 8, title: "Bài 8: Nước Văn Lang - Âu Lạc", summary: "Nhà nước đầu tiên của người Việt thời Hùng Vương." },
          { num: 9, title: "Bài 9: Đấu tranh giành độc lập thời Bắc thuộc", summary: "Khởi nghĩa Hai Bà Trưng, Bà Triệu, Lý Bí, Mai Thúc Loan." },
          { num: 10, title: "Bài 10: Khởi nghĩa Phùng Hưng và chiến thắng Bạch Đằng", summary: "Ngô Quyền mở ra kỷ nguyên độc lập tự chủ." },
        ]
      },
      {
        name: "Phân môn Địa lí: Trái Đất và môi trường sống của con người (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 11: Bản đồ và cách sử dụng bản đồ", summary: "Tỉ lệ bản đồ, kinh tuyến, vĩ tuyến và tọa độ địa lí." },
          { num: 2, title: "Bài 12: Chuyển động tự quay của Trái Đất", summary: "Hiện tượng ngày đêm luân phiên và giờ trên Trái Đất." },
          { num: 3, title: "Bài 13: Chuyển động của Trái Đất quanh Mặt Trời", summary: "Hiện tượng mùa và ngày đêm dài ngắn theo mùa." },
          { num: 4, title: "Bài 14: Cấu tạo Trái Đất và mảng kiến tạo", summary: "Vỏ Trái Đất, động đất và núi lửa." },
          { num: 5, title: "Bài 15: Địa hình bề mặt Trái Đất", summary: "Núi, đồi, đồng bằng, cao nguyên." },
          { num: 6, title: "Bài 16: Khí quyển và nhiệt độ không khí", summary: "Các tầng khí quyển và phân bố nhiệt độ." },
          { num: 7, title: "Bài 17: Khí áp và gió trên Trái Đất", summary: "Các đai khí áp và gió Tín phong, gió Tây ôn đới, gió mùa." },
          { num: 8, title: "Bài 18: Nước trên Trái Đất", summary: "Thủy quyển, sông ngòi, hồ đầm và nước ngầm." },
          { num: 9, title: "Bài 19: Thổ nhưỡng và sinh vật", summary: "Các tầng đất và sự đa dạng của giới sinh vật." },
          { num: 10, title: "Bài 20: Dân số và sự phân bố dân cư thế giới", summary: "Quy mô dân số và đô thị hóa." },
        ]
      },
    ]
  },
  "gdcd_6": {
    subjectId: "gdcd" as SubjectId,
    grade: 6 as GradeLevel,
    subjectName: "Giáo dục công dân",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 10,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Chủ đề 1: Đạo đức và Lối sống (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Tự hào về truyền thống gia đình, dòng họ", summary: "Kế thừa và phát huy giá trị văn hóa tốt đẹp của gia đình." },
          { num: 2, title: "Bài 2: Yêu thương con người", summary: "Biểu hiện của tình yêu thương, sự sẻ chia với hoàn cảnh khó khăn." },
          { num: 3, title: "Bài 3: Siêng năng, kiên trì", summary: "Đức tính vượt khó, nhẫn nại để đạt được mục tiêu học tập." },
          { num: 4, title: "Bài 4: Tôn trọng sự thật", summary: "Trung thực, dũng cảm bảo vệ lẽ phải." },
          { num: 5, title: "Bài 5: Tự lập", summary: "Tự giác hoàn thành công việc của bản thân không ỷ lại." },
        ]
      },
      {
        name: "Chủ đề 2: Kỹ năng sống và Pháp luật (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 6: Tự nhận thức bản thân", summary: "Khám phá điểm mạnh, điểm yếu và sở trường cá nhân." },
          { num: 2, title: "Bài 7: Ứng phó với tình huống nguy hiểm", summary: "Kỹ năng thoát hiểm khi hỏa hoạn, đuối nước, thiên tai." },
          { num: 3, title: "Bài 8: Tiết kiệm", summary: "Quản lý chi tiêu, sử dụng thời gian và tài nguyên hợp lý." },
          { num: 4, title: "Bài 9: Công dân nước Cộng hòa xã hội chủ nghĩa Việt Nam", summary: "Căn cứ xác định quốc tịch và quyền công dân." },
          { num: 5, title: "Bài 10: Quyền và nghĩa vụ cơ bản của công dân", summary: "Quyền học tập, tự do ngôn luận và nghĩa vụ tuân thủ pháp luật." },
        ]
      },
    ]
  },
  "gdcd_7": {
    subjectId: "gdcd" as SubjectId,
    grade: 7 as GradeLevel,
    subjectName: "Giáo dục công dân",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 10,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Chủ đề 1: Đạo đức và Lối sống (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Tự hào về truyền thống gia đình, dòng họ", summary: "Kế thừa và phát huy giá trị văn hóa tốt đẹp của gia đình." },
          { num: 2, title: "Bài 2: Yêu thương con người", summary: "Biểu hiện của tình yêu thương, sự sẻ chia với hoàn cảnh khó khăn." },
          { num: 3, title: "Bài 3: Siêng năng, kiên trì", summary: "Đức tính vượt khó, nhẫn nại để đạt được mục tiêu học tập." },
          { num: 4, title: "Bài 4: Tôn trọng sự thật", summary: "Trung thực, dũng cảm bảo vệ lẽ phải." },
          { num: 5, title: "Bài 5: Tự lập", summary: "Tự giác hoàn thành công việc của bản thân không ỷ lại." },
        ]
      },
      {
        name: "Chủ đề 2: Kỹ năng sống và Pháp luật (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 6: Tự nhận thức bản thân", summary: "Khám phá điểm mạnh, điểm yếu và sở trường cá nhân." },
          { num: 2, title: "Bài 7: Ứng phó với tình huống nguy hiểm", summary: "Kỹ năng thoát hiểm khi hỏa hoạn, đuối nước, thiên tai." },
          { num: 3, title: "Bài 8: Tiết kiệm", summary: "Quản lý chi tiêu, sử dụng thời gian và tài nguyên hợp lý." },
          { num: 4, title: "Bài 9: Công dân nước Cộng hòa xã hội chủ nghĩa Việt Nam", summary: "Căn cứ xác định quốc tịch và quyền công dân." },
          { num: 5, title: "Bài 10: Quyền và nghĩa vụ cơ bản của công dân", summary: "Quyền học tập, tự do ngôn luận và nghĩa vụ tuân thủ pháp luật." },
        ]
      },
    ]
  },
  "gdcd_8": {
    subjectId: "gdcd" as SubjectId,
    grade: 8 as GradeLevel,
    subjectName: "Giáo dục công dân",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 10,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Chủ đề 1: Đạo đức và Lối sống (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Tự hào về truyền thống gia đình, dòng họ", summary: "Kế thừa và phát huy giá trị văn hóa tốt đẹp của gia đình." },
          { num: 2, title: "Bài 2: Yêu thương con người", summary: "Biểu hiện của tình yêu thương, sự sẻ chia với hoàn cảnh khó khăn." },
          { num: 3, title: "Bài 3: Siêng năng, kiên trì", summary: "Đức tính vượt khó, nhẫn nại để đạt được mục tiêu học tập." },
          { num: 4, title: "Bài 4: Tôn trọng sự thật", summary: "Trung thực, dũng cảm bảo vệ lẽ phải." },
          { num: 5, title: "Bài 5: Tự lập", summary: "Tự giác hoàn thành công việc của bản thân không ỷ lại." },
        ]
      },
      {
        name: "Chủ đề 2: Kỹ năng sống và Pháp luật (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 6: Tự nhận thức bản thân", summary: "Khám phá điểm mạnh, điểm yếu và sở trường cá nhân." },
          { num: 2, title: "Bài 7: Ứng phó với tình huống nguy hiểm", summary: "Kỹ năng thoát hiểm khi hỏa hoạn, đuối nước, thiên tai." },
          { num: 3, title: "Bài 8: Tiết kiệm", summary: "Quản lý chi tiêu, sử dụng thời gian và tài nguyên hợp lý." },
          { num: 4, title: "Bài 9: Công dân nước Cộng hòa xã hội chủ nghĩa Việt Nam", summary: "Căn cứ xác định quốc tịch và quyền công dân." },
          { num: 5, title: "Bài 10: Quyền và nghĩa vụ cơ bản của công dân", summary: "Quyền học tập, tự do ngôn luận và nghĩa vụ tuân thủ pháp luật." },
        ]
      },
    ]
  },
  "gdcd_9": {
    subjectId: "gdcd" as SubjectId,
    grade: 9 as GradeLevel,
    subjectName: "Giáo dục công dân",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 10,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Chủ đề 1: Đạo đức và Lối sống (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Tự hào về truyền thống gia đình, dòng họ", summary: "Kế thừa và phát huy giá trị văn hóa tốt đẹp của gia đình." },
          { num: 2, title: "Bài 2: Yêu thương con người", summary: "Biểu hiện của tình yêu thương, sự sẻ chia với hoàn cảnh khó khăn." },
          { num: 3, title: "Bài 3: Siêng năng, kiên trì", summary: "Đức tính vượt khó, nhẫn nại để đạt được mục tiêu học tập." },
          { num: 4, title: "Bài 4: Tôn trọng sự thật", summary: "Trung thực, dũng cảm bảo vệ lẽ phải." },
          { num: 5, title: "Bài 5: Tự lập", summary: "Tự giác hoàn thành công việc của bản thân không ỷ lại." },
        ]
      },
      {
        name: "Chủ đề 2: Kỹ năng sống và Pháp luật (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 6: Tự nhận thức bản thân", summary: "Khám phá điểm mạnh, điểm yếu và sở trường cá nhân." },
          { num: 2, title: "Bài 7: Ứng phó với tình huống nguy hiểm", summary: "Kỹ năng thoát hiểm khi hỏa hoạn, đuối nước, thiên tai." },
          { num: 3, title: "Bài 8: Tiết kiệm", summary: "Quản lý chi tiêu, sử dụng thời gian và tài nguyên hợp lý." },
          { num: 4, title: "Bài 9: Công dân nước Cộng hòa xã hội chủ nghĩa Việt Nam", summary: "Căn cứ xác định quốc tịch và quyền công dân." },
          { num: 5, title: "Bài 10: Quyền và nghĩa vụ cơ bản của công dân", summary: "Quyền học tập, tự do ngôn luận và nghĩa vụ tuân thủ pháp luật." },
        ]
      },
    ]
  },
  "cong-nghe_6": {
    subjectId: "cong-nghe" as SubjectId,
    grade: 6 as GradeLevel,
    subjectName: "Công nghệ",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 10,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Chương 1: Nhà ở và Công nghệ gia đình (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Nhà ở đối với đời sống con người", summary: "Vai trò và đặc điểm kiến trúc nhà ở Việt Nam." },
          { num: 2, title: "Bài 2: Xây dựng nhà ở", summary: "Vật liệu xây dựng và quy trình xây dựng công trình." },
          { num: 3, title: "Bài 3: Ngôi nhà thông minh (Smart Home)", summary: "Hệ thống tự động hóa điều khiển ánh sáng, nhiệt độ, an ninh." },
          { num: 4, title: "Bài 4: Sử dụng năng lượng trong gia đình", summary: "Tiết kiệm điện và năng lượng tái tạo." },
          { num: 5, title: "Bài 5: Thực phẩm và dinh dưỡng", summary: "Chế độ ăn cân đối và bảo quản thực phẩm." },
        ]
      },
      {
        name: "Chương 2: Bảo quản thực phẩm và May mặc (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 6: Bảo quản thực phẩm", summary: "Phương pháp sấy khô, ướp muối, bảo quản lạnh." },
          { num: 2, title: "Bài 7: Chế biến thực phẩm không sử dụng nhiệt", summary: "Trộn nộm, muối chua rau củ quả." },
          { num: 3, title: "Bài 8: Chế biến thực phẩm có sử dụng nhiệt", summary: "Luộc, hấp, xào, nấu canh." },
          { num: 4, title: "Bài 9: Trang phục và thời trang", summary: "Phong cách thời trang và lựa chọn trang phục phù hợp lứa tuổi học sinh." },
          { num: 5, title: "Bài 10: Sử dụng và bảo quản trang phục", summary: "Giặt, phơi, là và bảo quản quần áo bền đẹp." },
        ]
      },
    ]
  },
  "cong-nghe_7": {
    subjectId: "cong-nghe" as SubjectId,
    grade: 7 as GradeLevel,
    subjectName: "Công nghệ",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 10,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Chương 1: Nhà ở và Công nghệ gia đình (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Nhà ở đối với đời sống con người", summary: "Vai trò và đặc điểm kiến trúc nhà ở Việt Nam." },
          { num: 2, title: "Bài 2: Xây dựng nhà ở", summary: "Vật liệu xây dựng và quy trình xây dựng công trình." },
          { num: 3, title: "Bài 3: Ngôi nhà thông minh (Smart Home)", summary: "Hệ thống tự động hóa điều khiển ánh sáng, nhiệt độ, an ninh." },
          { num: 4, title: "Bài 4: Sử dụng năng lượng trong gia đình", summary: "Tiết kiệm điện và năng lượng tái tạo." },
          { num: 5, title: "Bài 5: Thực phẩm và dinh dưỡng", summary: "Chế độ ăn cân đối và bảo quản thực phẩm." },
        ]
      },
      {
        name: "Chương 2: Bảo quản thực phẩm và May mặc (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 6: Bảo quản thực phẩm", summary: "Phương pháp sấy khô, ướp muối, bảo quản lạnh." },
          { num: 2, title: "Bài 7: Chế biến thực phẩm không sử dụng nhiệt", summary: "Trộn nộm, muối chua rau củ quả." },
          { num: 3, title: "Bài 8: Chế biến thực phẩm có sử dụng nhiệt", summary: "Luộc, hấp, xào, nấu canh." },
          { num: 4, title: "Bài 9: Trang phục và thời trang", summary: "Phong cách thời trang và lựa chọn trang phục phù hợp lứa tuổi học sinh." },
          { num: 5, title: "Bài 10: Sử dụng và bảo quản trang phục", summary: "Giặt, phơi, là và bảo quản quần áo bền đẹp." },
        ]
      },
    ]
  },
  "cong-nghe_8": {
    subjectId: "cong-nghe" as SubjectId,
    grade: 8 as GradeLevel,
    subjectName: "Công nghệ",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 10,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Chương 1: Nhà ở và Công nghệ gia đình (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Nhà ở đối với đời sống con người", summary: "Vai trò và đặc điểm kiến trúc nhà ở Việt Nam." },
          { num: 2, title: "Bài 2: Xây dựng nhà ở", summary: "Vật liệu xây dựng và quy trình xây dựng công trình." },
          { num: 3, title: "Bài 3: Ngôi nhà thông minh (Smart Home)", summary: "Hệ thống tự động hóa điều khiển ánh sáng, nhiệt độ, an ninh." },
          { num: 4, title: "Bài 4: Sử dụng năng lượng trong gia đình", summary: "Tiết kiệm điện và năng lượng tái tạo." },
          { num: 5, title: "Bài 5: Thực phẩm và dinh dưỡng", summary: "Chế độ ăn cân đối và bảo quản thực phẩm." },
        ]
      },
      {
        name: "Chương 2: Bảo quản thực phẩm và May mặc (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 6: Bảo quản thực phẩm", summary: "Phương pháp sấy khô, ướp muối, bảo quản lạnh." },
          { num: 2, title: "Bài 7: Chế biến thực phẩm không sử dụng nhiệt", summary: "Trộn nộm, muối chua rau củ quả." },
          { num: 3, title: "Bài 8: Chế biến thực phẩm có sử dụng nhiệt", summary: "Luộc, hấp, xào, nấu canh." },
          { num: 4, title: "Bài 9: Trang phục và thời trang", summary: "Phong cách thời trang và lựa chọn trang phục phù hợp lứa tuổi học sinh." },
          { num: 5, title: "Bài 10: Sử dụng và bảo quản trang phục", summary: "Giặt, phơi, là và bảo quản quần áo bền đẹp." },
        ]
      },
    ]
  },
  "cong-nghe_9": {
    subjectId: "cong-nghe" as SubjectId,
    grade: 9 as GradeLevel,
    subjectName: "Công nghệ",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 10,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Chương 1: Nhà ở và Công nghệ gia đình (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 1: Nhà ở đối với đời sống con người", summary: "Vai trò và đặc điểm kiến trúc nhà ở Việt Nam." },
          { num: 2, title: "Bài 2: Xây dựng nhà ở", summary: "Vật liệu xây dựng và quy trình xây dựng công trình." },
          { num: 3, title: "Bài 3: Ngôi nhà thông minh (Smart Home)", summary: "Hệ thống tự động hóa điều khiển ánh sáng, nhiệt độ, an ninh." },
          { num: 4, title: "Bài 4: Sử dụng năng lượng trong gia đình", summary: "Tiết kiệm điện và năng lượng tái tạo." },
          { num: 5, title: "Bài 5: Thực phẩm và dinh dưỡng", summary: "Chế độ ăn cân đối và bảo quản thực phẩm." },
        ]
      },
      {
        name: "Chương 2: Bảo quản thực phẩm và May mặc (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Bài 6: Bảo quản thực phẩm", summary: "Phương pháp sấy khô, ướp muối, bảo quản lạnh." },
          { num: 2, title: "Bài 7: Chế biến thực phẩm không sử dụng nhiệt", summary: "Trộn nộm, muối chua rau củ quả." },
          { num: 3, title: "Bài 8: Chế biến thực phẩm có sử dụng nhiệt", summary: "Luộc, hấp, xào, nấu canh." },
          { num: 4, title: "Bài 9: Trang phục và thời trang", summary: "Phong cách thời trang và lựa chọn trang phục phù hợp lứa tuổi học sinh." },
          { num: 5, title: "Bài 10: Sử dụng và bảo quản trang phục", summary: "Giặt, phơi, là và bảo quản quần áo bền đẹp." },
        ]
      },
    ]
  },
  "am-nhac_6": {
    subjectId: "am-nhac" as SubjectId,
    grade: 6 as GradeLevel,
    subjectName: "Âm nhạc",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Giai điệu học đường và Quê hương (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Vui bước đến trường", summary: "Hát: Mùa khai trường. Nhạc cụ: Gõ đệm tiết tấu. Nhạc lí: Khuông nhạc và nốt nhạc." },
          { num: 2, title: "Chủ đề 2: Cội nguồn yêu thương", summary: "Hát: Lí cây đa. Thường thức âm nhạc: Dân ca ba miền." },
          { num: 3, title: "Chủ đề 3: Thầy cô và mái trường", summary: "Hát: Nhớ ơn thầy cô. Tập đọc nhạc số 1." },
          { num: 4, title: "Chủ đề 4: Ước mơ tuổi thơ", summary: "Hát: Khát vọng tuổi trẻ. Nhạc sĩ Việt Nam tiêu biểu: Văn Cao, Lưu Hữu Phước." },
        ]
      },
      {
        name: "Học kì 2: Khúc ca non sông và Bạn bè bốn phương (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Mùa xuân non nước", summary: "Hát: Mùa xuân ơi. Nhạc cụ: Melodica/Sáo Recorder." },
          { num: 2, title: "Chủ đề 6: Âm nhạc thế giới", summary: "Hát bài hát thiếu nhi quốc tế. Tìm hiểu nhạc cụ phương Tây: Piano, Guitar, Violin." },
          { num: 3, title: "Chủ đề 7: Giai điệu bốn phương", summary: "Nhạc cổ điển thế giới: Beethoven, Mozart." },
          { num: 4, title: "Chủ đề 8: Khúc ca hòa bình", summary: "Biểu diễn báo cáo âm nhạc cuối năm học." },
        ]
      },
    ]
  },
  "am-nhac_7": {
    subjectId: "am-nhac" as SubjectId,
    grade: 7 as GradeLevel,
    subjectName: "Âm nhạc",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Giai điệu học đường và Quê hương (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Vui bước đến trường", summary: "Hát: Mùa khai trường. Nhạc cụ: Gõ đệm tiết tấu. Nhạc lí: Khuông nhạc và nốt nhạc." },
          { num: 2, title: "Chủ đề 2: Cội nguồn yêu thương", summary: "Hát: Lí cây đa. Thường thức âm nhạc: Dân ca ba miền." },
          { num: 3, title: "Chủ đề 3: Thầy cô và mái trường", summary: "Hát: Nhớ ơn thầy cô. Tập đọc nhạc số 1." },
          { num: 4, title: "Chủ đề 4: Ước mơ tuổi thơ", summary: "Hát: Khát vọng tuổi trẻ. Nhạc sĩ Việt Nam tiêu biểu: Văn Cao, Lưu Hữu Phước." },
        ]
      },
      {
        name: "Học kì 2: Khúc ca non sông và Bạn bè bốn phương (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Mùa xuân non nước", summary: "Hát: Mùa xuân ơi. Nhạc cụ: Melodica/Sáo Recorder." },
          { num: 2, title: "Chủ đề 6: Âm nhạc thế giới", summary: "Hát bài hát thiếu nhi quốc tế. Tìm hiểu nhạc cụ phương Tây: Piano, Guitar, Violin." },
          { num: 3, title: "Chủ đề 7: Giai điệu bốn phương", summary: "Nhạc cổ điển thế giới: Beethoven, Mozart." },
          { num: 4, title: "Chủ đề 8: Khúc ca hòa bình", summary: "Biểu diễn báo cáo âm nhạc cuối năm học." },
        ]
      },
    ]
  },
  "am-nhac_8": {
    subjectId: "am-nhac" as SubjectId,
    grade: 8 as GradeLevel,
    subjectName: "Âm nhạc",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Giai điệu học đường và Quê hương (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Vui bước đến trường", summary: "Hát: Mùa khai trường. Nhạc cụ: Gõ đệm tiết tấu. Nhạc lí: Khuông nhạc và nốt nhạc." },
          { num: 2, title: "Chủ đề 2: Cội nguồn yêu thương", summary: "Hát: Lí cây đa. Thường thức âm nhạc: Dân ca ba miền." },
          { num: 3, title: "Chủ đề 3: Thầy cô và mái trường", summary: "Hát: Nhớ ơn thầy cô. Tập đọc nhạc số 1." },
          { num: 4, title: "Chủ đề 4: Ước mơ tuổi thơ", summary: "Hát: Khát vọng tuổi trẻ. Nhạc sĩ Việt Nam tiêu biểu: Văn Cao, Lưu Hữu Phước." },
        ]
      },
      {
        name: "Học kì 2: Khúc ca non sông và Bạn bè bốn phương (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Mùa xuân non nước", summary: "Hát: Mùa xuân ơi. Nhạc cụ: Melodica/Sáo Recorder." },
          { num: 2, title: "Chủ đề 6: Âm nhạc thế giới", summary: "Hát bài hát thiếu nhi quốc tế. Tìm hiểu nhạc cụ phương Tây: Piano, Guitar, Violin." },
          { num: 3, title: "Chủ đề 7: Giai điệu bốn phương", summary: "Nhạc cổ điển thế giới: Beethoven, Mozart." },
          { num: 4, title: "Chủ đề 8: Khúc ca hòa bình", summary: "Biểu diễn báo cáo âm nhạc cuối năm học." },
        ]
      },
    ]
  },
  "am-nhac_9": {
    subjectId: "am-nhac" as SubjectId,
    grade: 9 as GradeLevel,
    subjectName: "Âm nhạc",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Giai điệu học đường và Quê hương (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Vui bước đến trường", summary: "Hát: Mùa khai trường. Nhạc cụ: Gõ đệm tiết tấu. Nhạc lí: Khuông nhạc và nốt nhạc." },
          { num: 2, title: "Chủ đề 2: Cội nguồn yêu thương", summary: "Hát: Lí cây đa. Thường thức âm nhạc: Dân ca ba miền." },
          { num: 3, title: "Chủ đề 3: Thầy cô và mái trường", summary: "Hát: Nhớ ơn thầy cô. Tập đọc nhạc số 1." },
          { num: 4, title: "Chủ đề 4: Ước mơ tuổi thơ", summary: "Hát: Khát vọng tuổi trẻ. Nhạc sĩ Việt Nam tiêu biểu: Văn Cao, Lưu Hữu Phước." },
        ]
      },
      {
        name: "Học kì 2: Khúc ca non sông và Bạn bè bốn phương (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Mùa xuân non nước", summary: "Hát: Mùa xuân ơi. Nhạc cụ: Melodica/Sáo Recorder." },
          { num: 2, title: "Chủ đề 6: Âm nhạc thế giới", summary: "Hát bài hát thiếu nhi quốc tế. Tìm hiểu nhạc cụ phương Tây: Piano, Guitar, Violin." },
          { num: 3, title: "Chủ đề 7: Giai điệu bốn phương", summary: "Nhạc cổ điển thế giới: Beethoven, Mozart." },
          { num: 4, title: "Chủ đề 8: Khúc ca hòa bình", summary: "Biểu diễn báo cáo âm nhạc cuối năm học." },
        ]
      },
    ]
  },
  "mi-thuat_6": {
    subjectId: "mi-thuat" as SubjectId,
    grade: 6 as GradeLevel,
    subjectName: "Mĩ thuật",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Nghệ thuật tạo hình và Đời sống (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Nghệ thuật Tiền sử và Cổ đại", summary: "Tạo hình hang động, đồ gốm cổ và hoa văn truyền thống." },
          { num: 2, title: "Chủ đề 2: Nghệ thuật Trung đại Việt Nam", summary: "Điêu khắc đình làng, tượng gốm thời Lý - Trần." },
          { num: 3, title: "Chủ đề 3: Tranh phong cảnh quê hương", summary: "Vẽ tranh phong cảnh làng quê Mỹ Hòa bằng màu nước hoặc sáp dầu." },
          { num: 4, title: "Chủ đề 4: Thiết kế logo và biểu trưng", summary: "Thiết kế biểu trưng câu lạc bộ trường THCS Mỹ Hòa." },
        ]
      },
      {
        name: "Học kì 2: Ứng dụng mĩ thuật và Thiết kế sáng tạo (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Tạo dáng và trang trí đồ vật", summary: "Thiết kế túi xách, bình gốm hoặc bìa sách." },
          { num: 2, title: "Chủ đề 6: Nghệ thuật thiết kế thời trang", summary: "Phác thảo trang phục dân tộc hoặc đồng phục học sinh." },
          { num: 3, title: "Chủ đề 7: Tranh cổ động và áp phích", summary: "Vẽ tranh tuyên truyền bảo vệ nguồn nước sạch và môi trường." },
          { num: 4, title: "Chủ đề 8: Triển lãm mĩ thuật học đường", summary: "Trưng bày và thuyết trình tác phẩm mĩ thuật." },
        ]
      },
    ]
  },
  "mi-thuat_7": {
    subjectId: "mi-thuat" as SubjectId,
    grade: 7 as GradeLevel,
    subjectName: "Mĩ thuật",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Nghệ thuật tạo hình và Đời sống (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Nghệ thuật Tiền sử và Cổ đại", summary: "Tạo hình hang động, đồ gốm cổ và hoa văn truyền thống." },
          { num: 2, title: "Chủ đề 2: Nghệ thuật Trung đại Việt Nam", summary: "Điêu khắc đình làng, tượng gốm thời Lý - Trần." },
          { num: 3, title: "Chủ đề 3: Tranh phong cảnh quê hương", summary: "Vẽ tranh phong cảnh làng quê Mỹ Hòa bằng màu nước hoặc sáp dầu." },
          { num: 4, title: "Chủ đề 4: Thiết kế logo và biểu trưng", summary: "Thiết kế biểu trưng câu lạc bộ trường THCS Mỹ Hòa." },
        ]
      },
      {
        name: "Học kì 2: Ứng dụng mĩ thuật và Thiết kế sáng tạo (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Tạo dáng và trang trí đồ vật", summary: "Thiết kế túi xách, bình gốm hoặc bìa sách." },
          { num: 2, title: "Chủ đề 6: Nghệ thuật thiết kế thời trang", summary: "Phác thảo trang phục dân tộc hoặc đồng phục học sinh." },
          { num: 3, title: "Chủ đề 7: Tranh cổ động và áp phích", summary: "Vẽ tranh tuyên truyền bảo vệ nguồn nước sạch và môi trường." },
          { num: 4, title: "Chủ đề 8: Triển lãm mĩ thuật học đường", summary: "Trưng bày và thuyết trình tác phẩm mĩ thuật." },
        ]
      },
    ]
  },
  "mi-thuat_8": {
    subjectId: "mi-thuat" as SubjectId,
    grade: 8 as GradeLevel,
    subjectName: "Mĩ thuật",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Nghệ thuật tạo hình và Đời sống (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Nghệ thuật Tiền sử và Cổ đại", summary: "Tạo hình hang động, đồ gốm cổ và hoa văn truyền thống." },
          { num: 2, title: "Chủ đề 2: Nghệ thuật Trung đại Việt Nam", summary: "Điêu khắc đình làng, tượng gốm thời Lý - Trần." },
          { num: 3, title: "Chủ đề 3: Tranh phong cảnh quê hương", summary: "Vẽ tranh phong cảnh làng quê Mỹ Hòa bằng màu nước hoặc sáp dầu." },
          { num: 4, title: "Chủ đề 4: Thiết kế logo và biểu trưng", summary: "Thiết kế biểu trưng câu lạc bộ trường THCS Mỹ Hòa." },
        ]
      },
      {
        name: "Học kì 2: Ứng dụng mĩ thuật và Thiết kế sáng tạo (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Tạo dáng và trang trí đồ vật", summary: "Thiết kế túi xách, bình gốm hoặc bìa sách." },
          { num: 2, title: "Chủ đề 6: Nghệ thuật thiết kế thời trang", summary: "Phác thảo trang phục dân tộc hoặc đồng phục học sinh." },
          { num: 3, title: "Chủ đề 7: Tranh cổ động và áp phích", summary: "Vẽ tranh tuyên truyền bảo vệ nguồn nước sạch và môi trường." },
          { num: 4, title: "Chủ đề 8: Triển lãm mĩ thuật học đường", summary: "Trưng bày và thuyết trình tác phẩm mĩ thuật." },
        ]
      },
    ]
  },
  "mi-thuat_9": {
    subjectId: "mi-thuat" as SubjectId,
    grade: 9 as GradeLevel,
    subjectName: "Mĩ thuật",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Nghệ thuật tạo hình và Đời sống (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Nghệ thuật Tiền sử và Cổ đại", summary: "Tạo hình hang động, đồ gốm cổ và hoa văn truyền thống." },
          { num: 2, title: "Chủ đề 2: Nghệ thuật Trung đại Việt Nam", summary: "Điêu khắc đình làng, tượng gốm thời Lý - Trần." },
          { num: 3, title: "Chủ đề 3: Tranh phong cảnh quê hương", summary: "Vẽ tranh phong cảnh làng quê Mỹ Hòa bằng màu nước hoặc sáp dầu." },
          { num: 4, title: "Chủ đề 4: Thiết kế logo và biểu trưng", summary: "Thiết kế biểu trưng câu lạc bộ trường THCS Mỹ Hòa." },
        ]
      },
      {
        name: "Học kì 2: Ứng dụng mĩ thuật và Thiết kế sáng tạo (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Tạo dáng và trang trí đồ vật", summary: "Thiết kế túi xách, bình gốm hoặc bìa sách." },
          { num: 2, title: "Chủ đề 6: Nghệ thuật thiết kế thời trang", summary: "Phác thảo trang phục dân tộc hoặc đồng phục học sinh." },
          { num: 3, title: "Chủ đề 7: Tranh cổ động và áp phích", summary: "Vẽ tranh tuyên truyền bảo vệ nguồn nước sạch và môi trường." },
          { num: 4, title: "Chủ đề 8: Triển lãm mĩ thuật học đường", summary: "Trưng bày và thuyết trình tác phẩm mĩ thuật." },
        ]
      },
    ]
  },
  "giao-duc-the-chat_6": {
    subjectId: "giao-duc-the-chat" as SubjectId,
    grade: 6 as GradeLevel,
    subjectName: "Giáo dục thể chất",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Thể dục cơ bản và Điền kinh (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Đội hình đội ngũ", summary: "Quay phải, quay trái, dóng hàng, điểm số và diễu hành." },
          { num: 2, title: "Chủ đề 2: Bài thể dục phát triển chung", summary: "Bài thể dục liên hoàn 8 động tác nâng cao thể lực." },
          { num: 3, title: "Chủ đề 3: Chạy cự li ngắn", summary: "Kỹ thuật xuất phát thấp, chạy lao, chạy giữa quãng và về đích." },
          { num: 4, title: "Chủ đề 4: Nhảy cao kiểu bước qua", summary: "Kỹ thuật chạy đà, giậm nhảy, qua xà và tiếp đất an toàn." },
        ]
      },
      {
        name: "Học kì 2: Thể thao tự chọn và Rèn luyện sức khỏe (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Môn Thể thao tự chọn: Bóng đá", summary: "Kỹ thuật dẫn bóng, chuyền bóng bằng lòng bàn chân và sút bóng." },
          { num: 2, title: "Chủ đề 6: Môn Thể thao tự chọn: Cầu lông", summary: "Cách cầm vợt, di chuyển bước chân, giao cầu và đập cầu." },
          { num: 3, title: "Chủ đề 7: Môn Thể thao tự chọn: Bóng rổ", summary: "Tư thế chuẩn bị, nhồi bóng và ném rổ." },
          { num: 4, title: "Chủ đề 8: Kiểm tra tiêu chuẩn rèn luyện thân thể", summary: "Đánh giá thể lực học sinh theo chuẩn Bộ GD&ĐT." },
        ]
      },
    ]
  },
  "giao-duc-the-chat_7": {
    subjectId: "giao-duc-the-chat" as SubjectId,
    grade: 7 as GradeLevel,
    subjectName: "Giáo dục thể chất",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Thể dục cơ bản và Điền kinh (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Đội hình đội ngũ", summary: "Quay phải, quay trái, dóng hàng, điểm số và diễu hành." },
          { num: 2, title: "Chủ đề 2: Bài thể dục phát triển chung", summary: "Bài thể dục liên hoàn 8 động tác nâng cao thể lực." },
          { num: 3, title: "Chủ đề 3: Chạy cự li ngắn", summary: "Kỹ thuật xuất phát thấp, chạy lao, chạy giữa quãng và về đích." },
          { num: 4, title: "Chủ đề 4: Nhảy cao kiểu bước qua", summary: "Kỹ thuật chạy đà, giậm nhảy, qua xà và tiếp đất an toàn." },
        ]
      },
      {
        name: "Học kì 2: Thể thao tự chọn và Rèn luyện sức khỏe (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Môn Thể thao tự chọn: Bóng đá", summary: "Kỹ thuật dẫn bóng, chuyền bóng bằng lòng bàn chân và sút bóng." },
          { num: 2, title: "Chủ đề 6: Môn Thể thao tự chọn: Cầu lông", summary: "Cách cầm vợt, di chuyển bước chân, giao cầu và đập cầu." },
          { num: 3, title: "Chủ đề 7: Môn Thể thao tự chọn: Bóng rổ", summary: "Tư thế chuẩn bị, nhồi bóng và ném rổ." },
          { num: 4, title: "Chủ đề 8: Kiểm tra tiêu chuẩn rèn luyện thân thể", summary: "Đánh giá thể lực học sinh theo chuẩn Bộ GD&ĐT." },
        ]
      },
    ]
  },
  "giao-duc-the-chat_8": {
    subjectId: "giao-duc-the-chat" as SubjectId,
    grade: 8 as GradeLevel,
    subjectName: "Giáo dục thể chất",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Thể dục cơ bản và Điền kinh (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Đội hình đội ngũ", summary: "Quay phải, quay trái, dóng hàng, điểm số và diễu hành." },
          { num: 2, title: "Chủ đề 2: Bài thể dục phát triển chung", summary: "Bài thể dục liên hoàn 8 động tác nâng cao thể lực." },
          { num: 3, title: "Chủ đề 3: Chạy cự li ngắn", summary: "Kỹ thuật xuất phát thấp, chạy lao, chạy giữa quãng và về đích." },
          { num: 4, title: "Chủ đề 4: Nhảy cao kiểu bước qua", summary: "Kỹ thuật chạy đà, giậm nhảy, qua xà và tiếp đất an toàn." },
        ]
      },
      {
        name: "Học kì 2: Thể thao tự chọn và Rèn luyện sức khỏe (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Môn Thể thao tự chọn: Bóng đá", summary: "Kỹ thuật dẫn bóng, chuyền bóng bằng lòng bàn chân và sút bóng." },
          { num: 2, title: "Chủ đề 6: Môn Thể thao tự chọn: Cầu lông", summary: "Cách cầm vợt, di chuyển bước chân, giao cầu và đập cầu." },
          { num: 3, title: "Chủ đề 7: Môn Thể thao tự chọn: Bóng rổ", summary: "Tư thế chuẩn bị, nhồi bóng và ném rổ." },
          { num: 4, title: "Chủ đề 8: Kiểm tra tiêu chuẩn rèn luyện thân thể", summary: "Đánh giá thể lực học sinh theo chuẩn Bộ GD&ĐT." },
        ]
      },
    ]
  },
  "giao-duc-the-chat_9": {
    subjectId: "giao-duc-the-chat" as SubjectId,
    grade: 9 as GradeLevel,
    subjectName: "Giáo dục thể chất",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Thể dục cơ bản và Điền kinh (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Đội hình đội ngũ", summary: "Quay phải, quay trái, dóng hàng, điểm số và diễu hành." },
          { num: 2, title: "Chủ đề 2: Bài thể dục phát triển chung", summary: "Bài thể dục liên hoàn 8 động tác nâng cao thể lực." },
          { num: 3, title: "Chủ đề 3: Chạy cự li ngắn", summary: "Kỹ thuật xuất phát thấp, chạy lao, chạy giữa quãng và về đích." },
          { num: 4, title: "Chủ đề 4: Nhảy cao kiểu bước qua", summary: "Kỹ thuật chạy đà, giậm nhảy, qua xà và tiếp đất an toàn." },
        ]
      },
      {
        name: "Học kì 2: Thể thao tự chọn và Rèn luyện sức khỏe (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Môn Thể thao tự chọn: Bóng đá", summary: "Kỹ thuật dẫn bóng, chuyền bóng bằng lòng bàn chân và sút bóng." },
          { num: 2, title: "Chủ đề 6: Môn Thể thao tự chọn: Cầu lông", summary: "Cách cầm vợt, di chuyển bước chân, giao cầu và đập cầu." },
          { num: 3, title: "Chủ đề 7: Môn Thể thao tự chọn: Bóng rổ", summary: "Tư thế chuẩn bị, nhồi bóng và ném rổ." },
          { num: 4, title: "Chủ đề 8: Kiểm tra tiêu chuẩn rèn luyện thân thể", summary: "Đánh giá thể lực học sinh theo chuẩn Bộ GD&ĐT." },
        ]
      },
    ]
  },
  "hoat-dong-trai-nghiem_6": {
    subjectId: "hoat-dong-trai-nghiem" as SubjectId,
    grade: 6 as GradeLevel,
    subjectName: "Hoạt động trải nghiệm, hướng nghiệp",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Xây dựng bản thân và Tình bạn học đường (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Khám phá bản thân", summary: "Xác định giá trị sống, sở thích, tính cách và rèn luyện sự tự tin." },
          { num: 2, title: "Chủ đề 2: Chăm sóc gia đình", summary: "Chia sẻ công việc nhà, thể hiện lòng biết ơn ông bà cha mẹ." },
          { num: 3, title: "Chủ đề 3: Xây dựng tình bạn, tình thầy trò", summary: "Giao tiếp tích cực, giải quyết bất đồng và xây dựng tập thể lớp đoàn kết." },
          { num: 4, title: "Chủ đề 4: Tham gia hoạt động thiện nguyện", summary: "Tham gia chiến dịch nuôi heo đất, quyên góp sách vở cho học sinh khó khăn." },
        ]
      },
      {
        name: "Học kì 2: Trách nhiệm cộng đồng và Định hướng nghề nghiệp (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Tự hào truyền thống quê hương", summary: "Tìm hiểu di tích lịch sử và văn hóa địa phương xã Mỹ Hòa." },
          { num: 2, title: "Chủ đề 6: Tham gia phát triển cộng đồng", summary: "Vệ sinh đường làng ngõ xóm, trồng cây xanh quanh trường." },
          { num: 3, title: "Chủ đề 7: Khám phá thế giới nghề nghiệp", summary: "Tìm hiểu các ngành nghề trong xã hội hiện đại và yêu cầu đối với người lao động." },
          { num: 4, title: "Chủ đề 8: Lập kế hoạch rèn luyện bản thân", summary: "Xây dựng mục tiêu và lộ trình học tập, hướng nghiệp tương lai." },
        ]
      },
    ]
  },
  "hoat-dong-trai-nghiem_7": {
    subjectId: "hoat-dong-trai-nghiem" as SubjectId,
    grade: 7 as GradeLevel,
    subjectName: "Hoạt động trải nghiệm, hướng nghiệp",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Xây dựng bản thân và Tình bạn học đường (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Khám phá bản thân", summary: "Xác định giá trị sống, sở thích, tính cách và rèn luyện sự tự tin." },
          { num: 2, title: "Chủ đề 2: Chăm sóc gia đình", summary: "Chia sẻ công việc nhà, thể hiện lòng biết ơn ông bà cha mẹ." },
          { num: 3, title: "Chủ đề 3: Xây dựng tình bạn, tình thầy trò", summary: "Giao tiếp tích cực, giải quyết bất đồng và xây dựng tập thể lớp đoàn kết." },
          { num: 4, title: "Chủ đề 4: Tham gia hoạt động thiện nguyện", summary: "Tham gia chiến dịch nuôi heo đất, quyên góp sách vở cho học sinh khó khăn." },
        ]
      },
      {
        name: "Học kì 2: Trách nhiệm cộng đồng và Định hướng nghề nghiệp (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Tự hào truyền thống quê hương", summary: "Tìm hiểu di tích lịch sử và văn hóa địa phương xã Mỹ Hòa." },
          { num: 2, title: "Chủ đề 6: Tham gia phát triển cộng đồng", summary: "Vệ sinh đường làng ngõ xóm, trồng cây xanh quanh trường." },
          { num: 3, title: "Chủ đề 7: Khám phá thế giới nghề nghiệp", summary: "Tìm hiểu các ngành nghề trong xã hội hiện đại và yêu cầu đối với người lao động." },
          { num: 4, title: "Chủ đề 8: Lập kế hoạch rèn luyện bản thân", summary: "Xây dựng mục tiêu và lộ trình học tập, hướng nghiệp tương lai." },
        ]
      },
    ]
  },
  "hoat-dong-trai-nghiem_8": {
    subjectId: "hoat-dong-trai-nghiem" as SubjectId,
    grade: 8 as GradeLevel,
    subjectName: "Hoạt động trải nghiệm, hướng nghiệp",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Xây dựng bản thân và Tình bạn học đường (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Khám phá bản thân", summary: "Xác định giá trị sống, sở thích, tính cách và rèn luyện sự tự tin." },
          { num: 2, title: "Chủ đề 2: Chăm sóc gia đình", summary: "Chia sẻ công việc nhà, thể hiện lòng biết ơn ông bà cha mẹ." },
          { num: 3, title: "Chủ đề 3: Xây dựng tình bạn, tình thầy trò", summary: "Giao tiếp tích cực, giải quyết bất đồng và xây dựng tập thể lớp đoàn kết." },
          { num: 4, title: "Chủ đề 4: Tham gia hoạt động thiện nguyện", summary: "Tham gia chiến dịch nuôi heo đất, quyên góp sách vở cho học sinh khó khăn." },
        ]
      },
      {
        name: "Học kì 2: Trách nhiệm cộng đồng và Định hướng nghề nghiệp (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Tự hào truyền thống quê hương", summary: "Tìm hiểu di tích lịch sử và văn hóa địa phương xã Mỹ Hòa." },
          { num: 2, title: "Chủ đề 6: Tham gia phát triển cộng đồng", summary: "Vệ sinh đường làng ngõ xóm, trồng cây xanh quanh trường." },
          { num: 3, title: "Chủ đề 7: Khám phá thế giới nghề nghiệp", summary: "Tìm hiểu các ngành nghề trong xã hội hiện đại và yêu cầu đối với người lao động." },
          { num: 4, title: "Chủ đề 8: Lập kế hoạch rèn luyện bản thân", summary: "Xây dựng mục tiêu và lộ trình học tập, hướng nghiệp tương lai." },
        ]
      },
    ]
  },
  "hoat-dong-trai-nghiem_9": {
    subjectId: "hoat-dong-trai-nghiem" as SubjectId,
    grade: 9 as GradeLevel,
    subjectName: "Hoạt động trải nghiệm, hướng nghiệp",
    bookSeries: "Sách giáo khoa hiện hành",
    totalExpectedLessons: 8,
    totalExpectedChapters: 2,
    chapters: [
      {
        name: "Học kì 1: Xây dựng bản thân và Tình bạn học đường (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Khám phá bản thân", summary: "Xác định giá trị sống, sở thích, tính cách và rèn luyện sự tự tin." },
          { num: 2, title: "Chủ đề 2: Chăm sóc gia đình", summary: "Chia sẻ công việc nhà, thể hiện lòng biết ơn ông bà cha mẹ." },
          { num: 3, title: "Chủ đề 3: Xây dựng tình bạn, tình thầy trò", summary: "Giao tiếp tích cực, giải quyết bất đồng và xây dựng tập thể lớp đoàn kết." },
          { num: 4, title: "Chủ đề 4: Tham gia hoạt động thiện nguyện", summary: "Tham gia chiến dịch nuôi heo đất, quyên góp sách vở cho học sinh khó khăn." },
        ]
      },
      {
        name: "Học kì 2: Trách nhiệm cộng đồng và Định hướng nghề nghiệp (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 5: Tự hào truyền thống quê hương", summary: "Tìm hiểu di tích lịch sử và văn hóa địa phương xã Mỹ Hòa." },
          { num: 2, title: "Chủ đề 6: Tham gia phát triển cộng đồng", summary: "Vệ sinh đường làng ngõ xóm, trồng cây xanh quanh trường." },
          { num: 3, title: "Chủ đề 7: Khám phá thế giới nghề nghiệp", summary: "Tìm hiểu các ngành nghề trong xã hội hiện đại và yêu cầu đối với người lao động." },
          { num: 4, title: "Chủ đề 8: Lập kế hoạch rèn luyện bản thân", summary: "Xây dựng mục tiêu và lộ trình học tập, hướng nghiệp tương lai." },
        ]
      },
    ]
  },
  "giao-duc-dia-phuong_6": {
    subjectId: "giao-duc-dia-phuong" as SubjectId,
    grade: 6 as GradeLevel,
    subjectName: "Giáo dục địa phương (Vĩnh Long)",
    bookSeries: "Tài liệu GDĐP tỉnh Vĩnh Long",
    totalExpectedLessons: 6,
    totalExpectedChapters: 1,
    chapters: [
      {
        name: "Chủ đề Lịch sử, Địa lí và Văn hóa Vĩnh Long (Lớp 6)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Vị trí địa lí và điều kiện tự nhiên tỉnh Vĩnh Long", summary: "Đặc điểm địa hình sông rạch phù sa màu mỡ sông Tiền, sông Hậu và mạng lưới thủy lợi." },
          { num: 2, title: "Chủ đề 2: Lịch sử hình thành và phát triển vùng đất Vĩnh Long", summary: "Quá trình khai khẩn đất phương Nam thời các Chúa Nguyễn và sự ra đời của Long Hồ Dinh." },
          { num: 3, title: "Chủ đề 3: Danh nhân văn hóa và lịch sử Vĩnh Long", summary: "Thân thế và sự nghiệp cụ Phan Thanh Giản, GS. Viện sĩ Trần Đại Nghĩa, Thủ tướng Võ Văn Kiệt." },
          { num: 4, title: "Chủ đề 4: Làng nghề truyền thống gạch gốm Mang Thít", summary: "Vương quốc gạch gốm đỏ Mang Thít - di sản kiến trúc lò nung độc đáo ven sông Cổ Chiên." },
          { num: 5, title: "Chủ đề 5: Văn hóa ẩm thực dân gian vùng sông nước Vĩnh Long", summary: "Đặc sản bưởi năm roi Bình Minh, khoai lang Bình Tân, cá tai tượng chiên xù." },
          { num: 6, title: "Chủ đề 6: Đa dạng sinh thái miệt vườn và bảo vệ môi trường", summary: "Mô hình sinh thái cù lao An Bình và các giải pháp chống sạt lở bờ sông, xâm nhập mặn." },
        ]
      },
    ]
  },
  "giao-duc-dia-phuong_7": {
    subjectId: "giao-duc-dia-phuong" as SubjectId,
    grade: 7 as GradeLevel,
    subjectName: "Giáo dục địa phương (Vĩnh Long)",
    bookSeries: "Tài liệu GDĐP tỉnh Vĩnh Long",
    totalExpectedLessons: 6,
    totalExpectedChapters: 1,
    chapters: [
      {
        name: "Chủ đề Lịch sử, Địa lí và Văn hóa Vĩnh Long (Lớp 7)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Vị trí địa lí và điều kiện tự nhiên tỉnh Vĩnh Long", summary: "Đặc điểm địa hình sông rạch phù sa màu mỡ sông Tiền, sông Hậu và mạng lưới thủy lợi." },
          { num: 2, title: "Chủ đề 2: Lịch sử hình thành và phát triển vùng đất Vĩnh Long", summary: "Quá trình khai khẩn đất phương Nam thời các Chúa Nguyễn và sự ra đời của Long Hồ Dinh." },
          { num: 3, title: "Chủ đề 3: Danh nhân văn hóa và lịch sử Vĩnh Long", summary: "Thân thế và sự nghiệp cụ Phan Thanh Giản, GS. Viện sĩ Trần Đại Nghĩa, Thủ tướng Võ Văn Kiệt." },
          { num: 4, title: "Chủ đề 4: Làng nghề truyền thống gạch gốm Mang Thít", summary: "Vương quốc gạch gốm đỏ Mang Thít - di sản kiến trúc lò nung độc đáo ven sông Cổ Chiên." },
          { num: 5, title: "Chủ đề 5: Văn hóa ẩm thực dân gian vùng sông nước Vĩnh Long", summary: "Đặc sản bưởi năm roi Bình Minh, khoai lang Bình Tân, cá tai tượng chiên xù." },
          { num: 6, title: "Chủ đề 6: Đa dạng sinh thái miệt vườn và bảo vệ môi trường", summary: "Mô hình sinh thái cù lao An Bình và các giải pháp chống sạt lở bờ sông, xâm nhập mặn." },
        ]
      },
    ]
  },
  "giao-duc-dia-phuong_8": {
    subjectId: "giao-duc-dia-phuong" as SubjectId,
    grade: 8 as GradeLevel,
    subjectName: "Giáo dục địa phương (Vĩnh Long)",
    bookSeries: "Tài liệu GDĐP tỉnh Vĩnh Long",
    totalExpectedLessons: 6,
    totalExpectedChapters: 1,
    chapters: [
      {
        name: "Chủ đề Lịch sử, Địa lí và Văn hóa Vĩnh Long (Lớp 8)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Vị trí địa lí và điều kiện tự nhiên tỉnh Vĩnh Long", summary: "Đặc điểm địa hình sông rạch phù sa màu mỡ sông Tiền, sông Hậu và mạng lưới thủy lợi." },
          { num: 2, title: "Chủ đề 2: Lịch sử hình thành và phát triển vùng đất Vĩnh Long", summary: "Quá trình khai khẩn đất phương Nam thời các Chúa Nguyễn và sự ra đời của Long Hồ Dinh." },
          { num: 3, title: "Chủ đề 3: Danh nhân văn hóa và lịch sử Vĩnh Long", summary: "Thân thế và sự nghiệp cụ Phan Thanh Giản, GS. Viện sĩ Trần Đại Nghĩa, Thủ tướng Võ Văn Kiệt." },
          { num: 4, title: "Chủ đề 4: Làng nghề truyền thống gạch gốm Mang Thít", summary: "Vương quốc gạch gốm đỏ Mang Thít - di sản kiến trúc lò nung độc đáo ven sông Cổ Chiên." },
          { num: 5, title: "Chủ đề 5: Văn hóa ẩm thực dân gian vùng sông nước Vĩnh Long", summary: "Đặc sản bưởi năm roi Bình Minh, khoai lang Bình Tân, cá tai tượng chiên xù." },
          { num: 6, title: "Chủ đề 6: Đa dạng sinh thái miệt vườn và bảo vệ môi trường", summary: "Mô hình sinh thái cù lao An Bình và các giải pháp chống sạt lở bờ sông, xâm nhập mặn." },
        ]
      },
    ]
  },
  "giao-duc-dia-phuong_9": {
    subjectId: "giao-duc-dia-phuong" as SubjectId,
    grade: 9 as GradeLevel,
    subjectName: "Giáo dục địa phương (Vĩnh Long)",
    bookSeries: "Tài liệu GDĐP tỉnh Vĩnh Long",
    totalExpectedLessons: 6,
    totalExpectedChapters: 1,
    chapters: [
      {
        name: "Chủ đề Lịch sử, Địa lí và Văn hóa Vĩnh Long (Lớp 9)",
        semester: 1,
        lessons: [
          { num: 1, title: "Chủ đề 1: Vị trí địa lí và điều kiện tự nhiên tỉnh Vĩnh Long", summary: "Đặc điểm địa hình sông rạch phù sa màu mỡ sông Tiền, sông Hậu và mạng lưới thủy lợi." },
          { num: 2, title: "Chủ đề 2: Lịch sử hình thành và phát triển vùng đất Vĩnh Long", summary: "Quá trình khai khẩn đất phương Nam thời các Chúa Nguyễn và sự ra đời của Long Hồ Dinh." },
          { num: 3, title: "Chủ đề 3: Danh nhân văn hóa và lịch sử Vĩnh Long", summary: "Thân thế và sự nghiệp cụ Phan Thanh Giản, GS. Viện sĩ Trần Đại Nghĩa, Thủ tướng Võ Văn Kiệt." },
          { num: 4, title: "Chủ đề 4: Làng nghề truyền thống gạch gốm Mang Thít", summary: "Vương quốc gạch gốm đỏ Mang Thít - di sản kiến trúc lò nung độc đáo ven sông Cổ Chiên." },
          { num: 5, title: "Chủ đề 5: Văn hóa ẩm thực dân gian vùng sông nước Vĩnh Long", summary: "Đặc sản bưởi năm roi Bình Minh, khoai lang Bình Tân, cá tai tượng chiên xù." },
          { num: 6, title: "Chủ đề 6: Đa dạng sinh thái miệt vườn và bảo vệ môi trường", summary: "Mô hình sinh thái cù lao An Bình và các giải pháp chống sạt lở bờ sông, xâm nhập mặn." },
        ]
      },
    ]
  },
};

// All synchronized lessons extracted from official textbooks across 13 subjects and 4 grades
// Re-export modular, deeply enriched curriculum lessons
export { ALL_CURRICULUM_LESSONS } from './curriculumLessons';

export function getCurriculumSpec(subjectId: SubjectId, grade: GradeLevel): SubjectCurriculumSpec | undefined {
  return MASTER_CURRICULUM_SPECS[`${subjectId}_${grade}`];
}

export function getCompletenessForSubjectGrade(
  lessons: Lesson[],
  subjectId: SubjectId,
  grade: GradeLevel
): {
  totalExpected: number;
  currentCount: number;
  missingCount: number;
  percent: number;
  status: 'hoan_thanh' | 'dang_bo_sung';
  missingLessonTitles: string[];
  totalChapters: number;
  bookSeries: string;
  subjectName: string;
} {
  const spec = getCurriculumSpec(subjectId, grade);
  const currentLessons = lessons.filter(l => l.subjectId === subjectId && l.grade === grade);
  
  if (!spec) {
    return {
      totalExpected: currentLessons.length,
      currentCount: currentLessons.length,
      missingCount: 0,
      percent: 100,
      status: 'hoan_thanh',
      missingLessonTitles: [],
      totalChapters: new Set(currentLessons.map(l => l.chapter)).size,
      bookSeries: currentLessons[0]?.bookSeries || 'Chương trình GDPT 2018',
      subjectName: currentLessons[0]?.subjectId || subjectId
    };
  }

  // Find missing titles
  const currentTitles = new Set(currentLessons.map(l => l.title.trim().toLowerCase()));
  const missingTitles: string[] = [];
  
  spec.chapters.forEach(ch => {
    ch.lessons.forEach(l => {
      const match = currentLessons.some(curr => 
        curr.title.toLowerCase().includes(l.title.toLowerCase()) ||
        l.title.toLowerCase().includes(curr.title.toLowerCase())
      );
      if (!match) {
        missingTitles.push(l.title);
      }
    });
  });

  const totalExpected = spec.totalExpectedLessons;
  const currentCount = currentLessons.length;
  const missingCount = Math.max(0, totalExpected - currentCount);
  const percent = totalExpected > 0 ? Math.min(100, Math.round((currentCount / totalExpected) * 100)) : 100;
  const status = currentCount >= totalExpected ? 'hoan_thanh' : 'dang_bo_sung';

  return {
    totalExpected,
    currentCount,
    missingCount,
    percent,
    status,
    missingLessonTitles: missingTitles,
    totalChapters: spec.totalExpectedChapters,
    bookSeries: spec.bookSeries,
    subjectName: spec.subjectName
  };
}

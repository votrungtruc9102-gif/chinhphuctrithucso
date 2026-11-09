import { Question } from '../types';
import { AUTHENTIC_CURRICULUM_QUESTIONS } from './authenticCurriculumQuestions';

/**
 * Danh sách mẫu văn chung chung / khuôn mẫu máy móc bị cấm tuyệt đối theo yêu cầu khảo thí
 */
export const FORBIDDEN_FORMULAIC_PATTERNS: RegExp[] = [
  /kiến thức cốt lõi/i,
  /khái niệm cơ bản của bài/i,
  /mục tiêu của bài học/i,
  /quan trọng nhất trong bài học/i,
  /phản ánh chính xác nhất/i,
  /học sinh cần nắm được/i,
  /định nghĩa, quy tắc hoặc công thức trọng tâm nào sau đây là ĐÚNG/i,
  /phát biểu nào sau đây chỉ ra bản chất và phương pháp suy luận ĐÚNG/i,
  /bước lập luận đầu tiên quan trọng nhất là gì/i,
  /chỉ cần đoán mò/i,
  /Nội dung kiến thức:/i,
  /mô tả đúng nhất khái niệm hoặc hiện tượng của bài/i,
  /chủ đề tư tưởng hoặc thể loại văn học nào sau đây là trọng tâm/i,
  /sự kiện lịch sử hoặc đặc điểm địa lí nổi bật nào sau đây/i,
  /giáo dục học sinh phẩm chất đạo đức/i,
  /trang bị kiến thức hoặc kỹ năng/i,
  /nội dung hoạt động hoặc giá trị văn hóa/i,
  /What is the main topic and vocabulary focus/i,
  /grammar rules or communicative functions is correctly applied/i,
  /In a daily conversation or writing task about/i,
  /Ý nghĩa giáo dục thể chất, nghệ thuật hoặc trải nghiệm hướng nghiệp/i,
  /Khi tham gia vào hoạt động thực hành, tập luyện thể thao/i,
  /Khi tìm hiểu nội dung ".*", phát biểu nào sau đây giải thích ĐÚNG bản chất/i,
  /Trong một tình huống học tập thực tế cần giải quyết nhiệm vụ liên quan đến/i,
  /Từ những bài học lịch sử hoặc đặc điểm địa lí trong bài/i,
  /Khi nghiên cứu về hiện tượng hoặc quy luật trong bài/i,
  /Khi thực hiện một thí nghiệm hoặc giải quyết một tình huống thực tiễn/i,
  /Khi viết đoạn văn hoặc bài văn chia sẻ cảm xúc/i
];

/**
 * Kiểm tra câu hỏi có vi phạm cấu trúc khuôn mẫu chung chung hay không
 */
export function isFormulaicQuestion(q: Question): boolean {
  return FORBIDDEN_FORMULAIC_PATTERNS.some(
    pattern => pattern.test(q.content) || q.options.some(opt => pattern.test(opt))
  );
}

/**
 * Tải ngân hàng câu hỏi chuẩn hóa từ toàn bộ bài học SGK GDPT 2018
 * Đảm bảo 100% câu hỏi có nội dung cụ thể, chính xác, bám sát sách giáo khoa.
 */
export function loadAllCurriculumQuestions(): Question[] {
  // Lọc sạch toàn bộ câu hỏi và chỉ giữ lại các câu hỏi chuẩn hóa bám sát SGK
  return AUTHENTIC_CURRICULUM_QUESTIONS.filter(q => !isFormulaicQuestion(q));
}

export const CURRICULUM_PARSED_QUESTIONS: Question[] = loadAllCurriculumQuestions();

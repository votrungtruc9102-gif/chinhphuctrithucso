/**
 * Game Question Helper Utility
 * Chuyên trách việc:
 * 1. Đảo ngẫu nhiên vị trí 4 phương án A, B, C, D và cập nhật chính xác đáp án đúng.
 * 2. Phân bố đồng đều đáp án đúng giữa A, B, C, D (hạn chế tối đa các câu liên tiếp trùng đáp án).
 * 3. Lựa chọn ngẫu nhiên bộ câu hỏi từ ngân hàng qua các lượt chơi (tránh lặp lại câu hỏi vừa xuất hiện).
 */

export interface GenericQuestion {
  question?: string;
  content?: string;
  options: string[];
  correct?: number;
  correctIndex?: number;
  correctAnswer?: number;
  correctAnswerIndex?: number;
  [key: string]: any;
}

/**
 * Xáo trộn ngẫu nhiên 4 phương án của một câu hỏi và cập nhật đúng chỉ số đáp án chính xác
 */
export function shuffleSingleQuestionOptions<T extends GenericQuestion>(q: T, forcedSlot?: number): T {
  // Xác định chỉ số đáp án đúng hiện tại
  let originalCorrectIdx = 0;
  if (typeof q.correct === 'number') originalCorrectIdx = q.correct;
  else if (typeof q.correctIndex === 'number') originalCorrectIdx = q.correctIndex;
  else if (typeof q.correctAnswer === 'number') originalCorrectIdx = q.correctAnswer;
  else if (typeof q.correctAnswerIndex === 'number') originalCorrectIdx = q.correctAnswerIndex;

  const originalOptions = [...q.options];
  const correctOptionText = originalOptions[originalCorrectIdx] ?? originalOptions[0];
  const distractors = originalOptions.filter((_, idx) => idx !== originalCorrectIdx);

  // Xáo trộn ngẫu nhiên các phương án nhiễu
  for (let i = distractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
  }

  // Xác định vị trí mục tiêu cho đáp án đúng (0: A, 1: B, 2: C, 3: D)
  const targetSlot = typeof forcedSlot === 'number' && forcedSlot >= 0 && forcedSlot < originalOptions.length
    ? forcedSlot
    : Math.floor(Math.random() * originalOptions.length);

  // Tạo mảng phương án mới
  const newOptions: string[] = [];
  let distractorIdx = 0;
  for (let i = 0; i < originalOptions.length; i++) {
    if (i === targetSlot) {
      newOptions.push(correctOptionText);
    } else {
      newOptions.push(distractors[distractorIdx++] ?? `Phương án ${i + 1}`);
    }
  }

  // Trả về câu hỏi mới với options đã xáo trộn và đáp án đúng được cập nhật chính xác
  const result: any = {
    ...q,
    options: newOptions
  };

  if ('correct' in q) result.correct = targetSlot;
  if ('correctIndex' in q) result.correctIndex = targetSlot;
  if ('correctAnswer' in q) result.correctAnswer = targetSlot;
  if ('correctAnswerIndex' in q) result.correctAnswerIndex = targetSlot;

  return result as T;
}

/**
 * Sinh danh sách các slot đáp án đúng cân bằng tuyệt đối giữa A, B, C, D
 * và không quá 2 câu liên tiếp có cùng một đáp án
 */
export function generateBalancedTargetSlots(count: number): number[] {
  const slots: number[] = [];
  const base = Math.floor(count / 4);
  const remainder = count % 4;

  for (let s = 0; s < 4; s++) {
    const c = base + (s < remainder ? 1 : 0);
    for (let i = 0; i < c; i++) {
      slots.push(s);
    }
  }

  // Xáo trộn ngẫu nhiên thứ tự các slot
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slots[i], slots[j]] = [slots[j], slots[i]];
  }

  // Khử hiện tượng lặp quá 2 câu liên tiếp cùng đáp án
  for (let i = 2; i < slots.length; i++) {
    if (slots[i] === slots[i - 1] && slots[i] === slots[i - 2]) {
      for (let j = 0; j < slots.length; j++) {
        if (slots[j] !== slots[i] && (j < i - 2 || j > i)) {
          [slots[i], slots[j]] = [slots[j], slots[i]];
          break;
        }
      }
    }
  }

  return slots;
}

/**
 * Chọn ngẫu nhiên N câu hỏi từ ngân hàng câu hỏi, ưu tiên các câu chưa xuất hiện gần đây,
 * sau đó xáo trộn phương án và cân bằng phân bố đáp án A, B, C, D
 */
export function selectAndShuffleGameQuestions<T extends GenericQuestion>(
  pool: T[],
  count: number,
  recentlyUsedIds: Set<string | number> = new Set()
): { questions: T[]; usedIds: Set<string | number> } {
  if (pool.length === 0) {
    return { questions: [], usedIds: new Set() };
  }

  // 1. Lọc các câu chưa xuất hiện trong lượt chơi gần nhất
  let candidatePool = pool.filter(q => {
    const id = q.id ?? q.question ?? q.content;
    return !recentlyUsedIds.has(id);
  });

  // Nếu số câu chưa dùng không đủ count, bổ sung từ pool gốc
  if (candidatePool.length < count) {
    candidatePool = [...pool];
  }

  // 2. Xáo trộn candidatePool
  const shuffledCandidates = [...candidatePool];
  for (let i = shuffledCandidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCandidates[i], shuffledCandidates[j]] = [shuffledCandidates[j], shuffledCandidates[i]];
  }

  // 3. Lấy đúng count câu hỏi
  const selected = shuffledCandidates.slice(0, Math.min(count, shuffledCandidates.length));
  const newUsedIds = new Set<string | number>();
  selected.forEach(q => {
    const id = q.id ?? q.question ?? q.content;
    newUsedIds.add(id);
  });

  // 4. Sinh target slots cân bằng A, B, C, D
  const targetSlots = generateBalancedTargetSlots(selected.length);

  // 5. Xáo trộn phương án cho từng câu
  const finalQuestions = selected.map((q, idx) => {
    return shuffleSingleQuestionOptions(q, targetSlots[idx]);
  });

  return { questions: finalQuestions, usedIds: newUsedIds };
}

import { ARENA_STAGES, ArenaStage } from '../data/arenaData';
import { INITIAL_EXERCISE_QUESTIONS, ExerciseQuestion } from '../data/exerciseGameData';
import { INITIAL_IMAGE_PUZZLES, ImagePuzzle } from '../data/imagePuzzleData';

const ARENA_PROGRESS_KEY = 'thcs_arena_progress_v1';
const ARENA_CUSTOM_STAGES_KEY = 'thcs_arena_custom_stages_v1';
const EXERCISE_QUESTIONS_KEY = 'thcs_exercise_questions_v1';
const IMAGE_PUZZLES_KEY = 'thcs_image_puzzles_v1';

export interface UserArenaProgress {
  userId: string;
  maxUnlockedStage: number; // 1 to 50
  completedStageIds: number[];
  totalExp: number;
  unlockedTitles: string[];
  unlockedBadges: string[];
  lastUpdated: string;
}

class ArenaStorageService {
  private getStorageKey(userId?: string): string {
    const safeUser = userId ? userId.replace(/[^a-zA-Z0-9_-]/g, '_') : 'guest';
    return `${ARENA_PROGRESS_KEY}_${safeUser}`;
  }

  // Lấy tiến trình người chơi (Đấu trường 1 luôn mở mặc định)
  public getUserProgress(userId?: string): UserArenaProgress {
    try {
      const key = this.getStorageKey(userId);
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.maxUnlockedStage === 'number') {
          return {
            userId: userId || 'guest',
            maxUnlockedStage: Math.max(1, parsed.maxUnlockedStage),
            completedStageIds: Array.isArray(parsed.completedStageIds) ? parsed.completedStageIds : [],
            totalExp: Number(parsed.totalExp) || 0,
            unlockedTitles: Array.isArray(parsed.unlockedTitles) ? parsed.unlockedTitles : [],
            unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [],
            lastUpdated: parsed.lastUpdated || new Date().toISOString()
          };
        }
      }
    } catch {}

    // Default: Đấu trường 1 mở mặc định
    return {
      userId: userId || 'guest',
      maxUnlockedStage: 1,
      completedStageIds: [],
      totalExp: 0,
      unlockedTitles: [],
      unlockedBadges: [],
      lastUpdated: new Date().toISOString()
    };
  }

  // Lưu tiến trình mở khóa
  public saveUserProgress(progress: UserArenaProgress): void {
    try {
      const key = this.getStorageKey(progress.userId);
      localStorage.setItem(key, JSON.stringify(progress));
    } catch {}
  }

  // Kiểm tra một đấu trường có được mở khóa hay không
  public isStageUnlocked(stageId: number, userId?: string): boolean {
    if (stageId === 1) return true; // Đấu trường 1 luôn mở mặc định
    const prog = this.getUserProgress(userId);
    return stageId <= prog.maxUnlockedStage;
  }

  // Ghi nhận chiến thắng đấu trường: Mở khóa đấu trường tiếp theo theo đúng thứ tự tuần tự
  public recordStageVictory(stage: ArenaStage, userId?: string): {
    nextUnlocked: number;
    isFirstClear: boolean;
    earnedExp: number;
  } {
    const prog = this.getUserProgress(userId);
    const isFirstClear = !prog.completedStageIds.includes(stage.id);

    const completed = new Set(prog.completedStageIds);
    completed.add(stage.id);

    // Mở khóa đấu trường tiếp theo nếu đánh bại đấu trường cao nhất hiện tại
    let newMaxUnlocked = prog.maxUnlockedStage;
    if (stage.id >= prog.maxUnlockedStage && stage.id < 50) {
      newMaxUnlocked = stage.id + 1;
    }

    const titles = new Set(prog.unlockedTitles);
    if (stage.rewardTitle) titles.add(stage.rewardTitle);

    const badges = new Set(prog.unlockedBadges);
    if (stage.rewardBadge) badges.add(stage.rewardBadge);

    const earnedExp = isFirstClear ? stage.rewardExp : Math.floor(stage.rewardExp * 0.3);

    const updated: UserArenaProgress = {
      userId: userId || 'guest',
      maxUnlockedStage: newMaxUnlocked,
      completedStageIds: Array.from(completed).sort((a, b) => a - b),
      totalExp: prog.totalExp + earnedExp,
      unlockedTitles: Array.from(titles),
      unlockedBadges: Array.from(badges),
      lastUpdated: new Date().toISOString()
    };

    this.saveUserProgress(updated);

    return {
      nextUnlocked: newMaxUnlocked,
      isFirstClear,
      earnedExp
    };
  }

  // Quản lý danh sách đấu trường (cho phép giáo viên chỉnh sửa HP <= 150.000, tên, câu hỏi)
  public getStages(): ArenaStage[] {
    try {
      const raw = localStorage.getItem(ARENA_CUSTOM_STAGES_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length >= 50) {
          return parsed;
        }
      }
    } catch {}
    return ARENA_STAGES;
  }

  public saveStages(stages: ArenaStage[]): void {
    // Đảm bảo tuân thủ giới hạn HP không quá 150.000
    const sanitized = stages.map(st => ({
      ...st,
      maxHp: Math.min(150000, Math.max(1000, st.maxHp))
    }));
    try {
      localStorage.setItem(ARENA_CUSTOM_STAGES_KEY, JSON.stringify(sanitized));
    } catch {}
  }

  // Quản lý câu hỏi trò chơi Thể Dục Trí Tuệ
  public getExerciseQuestions(): ExerciseQuestion[] {
    try {
      const raw = localStorage.getItem(EXERCISE_QUESTIONS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return INITIAL_EXERCISE_QUESTIONS;
  }

  public saveExerciseQuestions(questions: ExerciseQuestion[]): void {
    try {
      localStorage.setItem(EXERCISE_QUESTIONS_KEY, JSON.stringify(questions));
    } catch {}
  }

  // Quản lý câu đố Giải Đố Hình Ảnh
  public getImagePuzzles(): ImagePuzzle[] {
    try {
      const raw = localStorage.getItem(IMAGE_PUZZLES_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return INITIAL_IMAGE_PUZZLES;
  }

  public saveImagePuzzles(puzzles: ImagePuzzle[]): void {
    try {
      localStorage.setItem(IMAGE_PUZZLES_KEY, JSON.stringify(puzzles));
    } catch {}
  }
}

export const arenaStorageService = new ArenaStorageService();

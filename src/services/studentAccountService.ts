export interface RegisteredStudent {
  uid: string;
  accountCode: string;
  displayName: string;
  fullName?: string; // Alias for displayName
  className: string;
  grade: number;
  avatarEmoji: string;
  recoveryCode?: string;
  rp: number;
  totalPoints?: number;
  ratingPoints?: number; // Alias for rp
  exp: number;
  level?: number;
  wins: number;
  losses: number;
  winStreak: number;
  bossDefeatedCount: number;
  unlockedBossIds: string[];
  bossesDefeated?: string[]; // Alias for unlockedBossIds
  maxUnlockedArenaStage: number;
  unlockedTitles: string[];
  unlockedBadges: string[];
  ownedCharacterIds: string[];
  favoriteCharacterId: string;
  createdAt: string;
  registeredAt?: string; // Alias for createdAt
  lastActive: string;
  gameHistory: {
    gameType: string;
    result: string;
    scoreChange: number;
    timestamp: string;
    details?: string;
  }[];
  isArchived?: boolean;
  archivedAt?: string;
}

const LOCAL_STORAGE_STUDENT_KEY = 'thcs_registered_student_v1';
const LOCAL_STORAGE_CODE_KEY = 'thcs_registered_account_code';

type StudentChangeListener = (student: RegisteredStudent | null) => void;

class StudentAccountService {
  private activeStudent: RegisteredStudent | null = null;
  private listeners: Set<StudentChangeListener> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private normalizeStudent(s: RegisteredStudent): RegisteredStudent {
    let pts = s.totalPoints;
    if (pts === undefined && typeof window !== 'undefined') {
      const cached = localStorage.getItem('student_points_' + s.uid) || localStorage.getItem('student_points_code_' + s.accountCode);
      if (cached !== null) {
        pts = Number(cached);
      }
    }
    return {
      ...s,
      fullName: s.fullName || s.displayName,
      ratingPoints: s.ratingPoints ?? s.rp,
      totalPoints: pts !== undefined ? pts : 0,
      level: s.level ?? (Math.floor((s.exp || 0) / 300) + 1),
      registeredAt: s.registeredAt || s.createdAt,
      bossesDefeated: s.bossesDefeated || s.unlockedBossIds || []
    };
  }

  private loadFromStorage() {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_STUDENT_KEY);
      if (raw) {
        this.activeStudent = this.normalizeStudent(JSON.parse(raw));
      }
    } catch {}
  }

  private saveToStorage(student: RegisteredStudent | null) {
    this.activeStudent = student ? this.normalizeStudent(student) : null;
    try {
      if (this.activeStudent) {
        localStorage.setItem(LOCAL_STORAGE_STUDENT_KEY, JSON.stringify(this.activeStudent));
        localStorage.setItem(LOCAL_STORAGE_CODE_KEY, this.activeStudent.accountCode);
        const pts = this.activeStudent.totalPoints ?? 0;
        localStorage.setItem('student_points_' + this.activeStudent.uid, String(pts));
        localStorage.setItem('student_points_code_' + this.activeStudent.accountCode, String(pts));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_STUDENT_KEY);
      }
    } catch {}
    this.notifyListeners();
  }

  public subscribe(listener: StudentChangeListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(fn => fn(this.activeStudent));
  }

  public getActiveStudent(): RegisteredStudent | null {
    return this.activeStudent;
  }

  public getCurrentStudent(): RegisteredStudent | null {
    return this.getActiveStudent();
  }

  public clearActiveSession(): void {
    this.logout();
  }

  public getSavedAccountCode(): string | null {
    try {
      return localStorage.getItem(LOCAL_STORAGE_CODE_KEY);
    } catch {
      return null;
    }
  }

  // Auto-restore session from server on boot
  public async autoRestoreSession(): Promise<RegisteredStudent | null> {
    const savedCode = this.getSavedAccountCode();
    if (!savedCode) return this.activeStudent;

    try {
      const res = await fetch('/api/students/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountCode: savedCode })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.account) {
          this.saveToStorage(data.account);
          return data.account;
        }
      }
    } catch (err) {
      console.warn('[StudentService] Could not auto-restore session from server:', err);
    }

    return this.activeStudent;
  }

  // Register real student (No password required)
  public async registerStudent(
    fullName: string,
    className: string,
    grade?: number
  ): Promise<{ success: boolean; account?: RegisteredStudent; message?: string; error?: string }> {
    try {
      const res = await fetch('/api/students/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, className, grade })
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Đăng ký tài khoản thất bại.' };
      }

      this.saveToStorage(data.account);
      return { success: true, account: data.account, message: data.message };
    } catch (err: any) {
      return { success: false, error: err.message || 'Mất kết nối máy chủ.' };
    }
  }

  // Login with account code or selecting from list
  public async loginStudent(
    accountCodeOrUid: string
  ): Promise<{ success: boolean; account?: RegisteredStudent; message?: string; error?: string }> {
    try {
      const isUid = accountCodeOrUid.startsWith('stu_');
      const payload = isUid ? { uid: accountCodeOrUid } : { accountCode: accountCodeOrUid };

      const res = await fetch('/api/students/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Đăng nhập thất bại.' };
      }

      this.saveToStorage(data.account);
      return { success: true, account: data.account, message: data.message };
    } catch (err: any) {
      return { success: false, error: err.message || 'Mất kết nối máy chủ.' };
    }
  }

  // Recover student by code or 6-digit recovery code
  public async recoverStudent(
    accountCode?: string,
    recoveryCode?: string
  ): Promise<{ success: boolean; account?: RegisteredStudent; message?: string; error?: string }> {
    try {
      const res = await fetch('/api/students/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountCode, recoveryCode })
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Khôi phục tài khoản thất bại.' };
      }

      this.saveToStorage(data.account);
      return { success: true, account: data.account, message: data.message };
    } catch (err: any) {
      return { success: false, error: err.message || 'Mất kết nối máy chủ.' };
    }
  }

  // Get real registered students list
  public async getStudentList(
    search?: string,
    grade?: number,
    forTeacher?: boolean,
    showArchived?: boolean
  ): Promise<{ total: number; students: RegisteredStudent[] }> {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (grade) params.append('grade', String(grade));
      if (forTeacher) params.append('forTeacher', 'true');
      if (showArchived) params.append('showArchived', 'true');

      const res = await fetch(`/api/students/list?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        return { total: data.total || 0, students: data.students || [] };
      }
    } catch (err) {
      console.error('[StudentService] Error fetching student list:', err);
    }
    return { total: 0, students: [] };
  }

  // Get archived students
  public async getArchivedStudentList(): Promise<RegisteredStudent[]> {
    const res = await this.getStudentList(undefined, undefined, true, true);
    return res.students;
  }

  // Soft delete / archive student accounts (preserves all points, gold, EXP, bosses)
  public async archiveStudents(uids: string[]): Promise<{ success: boolean; count?: number; message?: string; error?: string }> {
    try {
      const res = await fetch('/api/students/archive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uids })
      });
      const data = await res.json();
      if (res.ok) {
        // If current active student was archived, clear session
        if (this.activeStudent && uids.includes(this.activeStudent.uid)) {
          this.logout();
        }
        return { success: true, count: data.count, message: data.message };
      }
      return { success: false, error: data.error || 'Lỗi khi lưu trữ tài khoản.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Mất kết nối máy chủ.' };
    }
  }

  // Restore archived student using original UID or Account Code
  public async restoreStudent(uidOrAccountCode: string): Promise<{ success: boolean; account?: RegisteredStudent; message?: string; error?: string }> {
    try {
      const isUid = uidOrAccountCode.startsWith('stu_');
      const payload = isUid ? { uid: uidOrAccountCode } : { accountCode: uidOrAccountCode };
      const res = await fetch('/api/students/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        return { success: true, account: data.account, message: data.message };
      }
      return { success: false, error: data.error || 'Lỗi khi khôi phục tài khoản.' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Mất kết nối máy chủ.' };
    }
  }

  // Add points to current student's isolated account
  public async addPoints(points: number): Promise<RegisteredStudent | null> {
    if (!this.activeStudent) return null;
    const newTotal = Math.max(0, (this.activeStudent.totalPoints || 0) + points);
    this.activeStudent.totalPoints = newTotal;
    this.saveToStorage(this.activeStudent);

    try {
      fetch('/api/students/update-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: this.activeStudent.uid,
          accountCode: this.activeStudent.accountCode,
          pointsChange: points,
          totalPoints: newTotal
        })
      }).catch(() => {});
    } catch {}

    return this.activeStudent;
  }

  // Set total points for current student's isolated account
  public async setTotalPoints(totalPoints: number): Promise<RegisteredStudent | null> {
    if (!this.activeStudent) return null;
    this.activeStudent.totalPoints = Math.max(0, totalPoints);
    this.saveToStorage(this.activeStudent);

    try {
      fetch('/api/students/update-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: this.activeStudent.uid,
          accountCode: this.activeStudent.accountCode,
          totalPoints: this.activeStudent.totalPoints
        })
      }).catch(() => {});
    } catch {}

    return this.activeStudent;
  }

  // Update progress across games (RP, EXP, Wins, Boss, Arena, Points, etc.)
  public async updateProgress(payload: {
    rpChange?: number;
    pointsChange?: number;
    totalPoints?: number;
    expChange?: number;
    isWin?: boolean;
    isLoss?: boolean;
    bossDefeated?: string;
    bossDefeatedId?: string;
    arenaStage?: number;
    newBadge?: string;
    newTitle?: string;
    characterId?: string;
    gameType?: string;
    details?: string;
  }): Promise<RegisteredStudent | null> {
    if (!this.activeStudent) return null;

    if (typeof payload.pointsChange === 'number') {
      this.activeStudent.totalPoints = Math.max(0, (this.activeStudent.totalPoints || 0) + payload.pointsChange);
    }
    if (typeof payload.totalPoints === 'number') {
      this.activeStudent.totalPoints = Math.max(0, payload.totalPoints);
    }
    this.saveToStorage(this.activeStudent);

    try {
      const boss = payload.bossDefeated || payload.bossDefeatedId;
      const res = await fetch('/api/students/update-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: this.activeStudent.uid,
          ...payload,
          bossDefeated: boss
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.account) {
          this.saveToStorage(data.account);
          return data.account;
        }
      }
    } catch (err) {
      console.error('[StudentService] Error updating progress:', err);
    }

    return this.activeStudent;
  }

  // Logout
  public logout(): void {
    this.saveToStorage(null);
  }

  // Teacher stats
  public async getTeacherStats(): Promise<{
    totalRegistered: number;
    byGrade: Record<string, number>;
    students: RegisteredStudent[];
  }> {
    try {
      const res = await fetch('/api/students/stats');
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.error('[StudentService] Error fetching teacher stats:', err);
    }
    return {
      totalRegistered: 0,
      byGrade: { '6': 0, '7': 0, '8': 0, '9': 0 },
      students: []
    };
  }
}

export const studentAccountService = new StudentAccountService();

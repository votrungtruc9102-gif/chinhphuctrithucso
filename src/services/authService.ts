import { UserAccount, AuthSession } from '../types';

const SESSION_KEY = 'myhoa_auth_session_v1';
const USERS_KEY = 'myhoa_users_db_v1';

/**
 * Computes SHA-256 hash of a string using Web Crypto API.
 */
export async function hashPassword(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Validated SHA-256 hash of "myhoa2026":
 * echo -n "myhoa2026" | sha256sum
 * -> 68e3be4b7e2f3199d00cac76e83600a5e6d9bd35374d3e661579d4d6f55ee874
 */
export const DEFAULT_PASSWORD_HASH = '68e3be4b7e2f3199d00cac76e83600a5e6d9bd35374d3e661579d4d6f55ee874';

export const INITIAL_ACCOUNTS: UserAccount[] = [
  // 1. Teachers
  {
    uid: 'u-teacher-demo',
    username: 'teacher',
    email: 'teacher@edu.vn',
    displayName: 'Giáo viên (Tài khoản mẫu)',
    role: 'teacher',
    isActive: true,
    passwordHash: DEFAULT_PASSWORD_HASH,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-10-25T00:00:00Z'
  },
  {
    uid: 'u-teacher-01',
    username: 'giaovien.tin',
    email: 'giaovien.tin@edu.vn',
    displayName: 'Cô Trần Thị Mai (Tổ trưởng Tin học)',
    role: 'teacher',
    isActive: true,
    passwordHash: DEFAULT_PASSWORD_HASH,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-10-25T00:00:00Z'
  },
  {
    uid: 'u-teacher-02',
    username: 'giaovien.toan',
    email: 'giaovien.toan@edu.vn',
    displayName: 'Thầy Nguyễn Văn An (Tổ Toán - Tin)',
    role: 'teacher',
    isActive: true,
    passwordHash: DEFAULT_PASSWORD_HASH,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-10-25T00:00:00Z'
  }
];

export const authService = {
  /**
   * Retrieves all users from storage.
   * Automatically migrates and synchronizes stale password hashes from localStorage.
   */
  getUsers(): UserAccount[] {
    try {
      const stored = localStorage.getItem(USERS_KEY);
      if (stored) {
        const parsed: UserAccount[] = JSON.parse(stored);
        let hasChanges = false;

        // Synchronize and fix any corrupted or outdated password hashes
        const synchronized = INITIAL_ACCOUNTS.map(initAcc => {
          const existing = parsed.find(
            u => u.uid === initAcc.uid || u.username.toLowerCase() === initAcc.username.toLowerCase()
          );
          if (!existing) {
            hasChanges = true;
            return initAcc;
          }
          if (existing.passwordHash !== initAcc.passwordHash || !existing.email || existing.displayName !== initAcc.displayName || existing.displayName.includes('Mỹ Hòa')) {
            hasChanges = true;
            return {
              ...existing,
              passwordHash: initAcc.passwordHash,
              email: initAcc.email,
              displayName: initAcc.displayName,
              role: initAcc.role,
              isActive: initAcc.isActive
            };
          }
          return existing;
        });

        // Retain any extra accounts that might have been registered
        parsed.forEach(p => {
          if (!synchronized.some(s => s.uid === p.uid)) {
            synchronized.push(p);
          }
        });

        if (hasChanges) {
          this.saveUsers(synchronized);
        }
        return synchronized;
      }
    } catch {
      // fallback
    }
    this.saveUsers(INITIAL_ACCOUNTS);
    return INITIAL_ACCOUNTS;
  },

  saveUsers(users: UserAccount[]): void {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users to storage:', e);
    }
  },

  /**
   * Safe lookup that maps an input (username or email) to a user account.
   */
  findUserByIdentifier(identifier: string): UserAccount | undefined {
    const normalized = identifier.trim().toLowerCase();
    const users = this.getUsers();
    return users.find(
      u => u.username.toLowerCase() === normalized || (u.email && u.email.toLowerCase() === normalized)
    );
  },

  /**
   * Authenticates user by username or email and password.
   * Computes SHA-256 hash of password and matches against trusted record.
   */
  async login(identifierInput: string, passwordInput: string): Promise<UserAccount> {
    const normalizedIdentifier = identifierInput.trim().toLowerCase();
    const trimmedPassword = passwordInput.trim();

    if (!normalizedIdentifier || !trimmedPassword) {
      throw new Error('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
    }

    // Hash the password input with SHA-256
    const inputHash = await hashPassword(trimmedPassword);

    // Look up user by username or mapped email
    const user = this.findUserByIdentifier(normalizedIdentifier);

    // Rejection for non-existent user or invalid password hash
    if (!user || user.passwordHash !== inputHash) {
      throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.');
    }

    // Check account active status
    if (!user.isActive) {
      throw new Error('Tài khoản của bạn hiện đang bị vô hiệu hóa. Vui lòng liên hệ nhà trường.');
    }

    // Create session (24h validity) without storing plain password or hash in session
    const session: AuthSession = {
      user: {
        uid: user.uid,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        grade: user.grade,
        className: user.className,
        avatarSeed: user.avatarSeed,
        isActive: user.isActive,
        passwordHash: '', // Never store password hash in active session memory
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token: 'jwt-auth-' + Math.random().toString(36).substring(2) + Date.now().toString(36),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    };

    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.error('Failed to save session:', e);
    }

    return session.user;
  },

  /**
   * Retrieves active session if valid and not expired.
   * Seamlessly bridges with persistent student account.
   */
  getCurrentUser(): UserAccount | null {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const session: AuthSession = JSON.parse(stored);
        if (session && session.user) {
          if (Date.now() > session.expiresAt) {
            this.logout();
            return null;
          }
          if (session.user.displayName && session.user.displayName.includes('Mỹ Hòa')) {
            session.user.displayName = session.user.displayName.replace(/THCS Mỹ Hòa\s*[-–•]?\s*/gi, '').trim();
          }
          return session.user;
        }
      }

      // Check persistent registered student account
      const rawStudent = localStorage.getItem('thcs_registered_student_v1');
      if (rawStudent) {
        const student = JSON.parse(rawStudent);
        if (student && student.uid && !student.isArchived) {
          return {
            uid: student.uid,
            username: (student.accountCode || student.uid).toLowerCase(),
            displayName: student.displayName || student.fullName || 'Học sinh',
            className: student.className,
            grade: student.grade,
            role: 'student',
            isActive: true,
            passwordHash: '',
            createdAt: student.createdAt,
            updatedAt: student.lastActive
          };
        }
      }

      return null;
    } catch {
      return null;
    }
  },

  setStudentSession(student: any): UserAccount {
    const user: UserAccount = {
      uid: student.uid,
      username: (student.accountCode || student.uid).toLowerCase(),
      displayName: student.displayName || student.fullName || 'Học sinh',
      className: student.className,
      grade: student.grade,
      role: 'student',
      isActive: true,
      passwordHash: '',
      createdAt: student.createdAt,
      updatedAt: student.lastActive
    };
    const session: AuthSession = {
      user,
      token: 'jwt-student-' + student.uid,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000
    };
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {}
    return user;
  },

  logout(): void {
    try {
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem('thcs_registered_student_v1');
      localStorage.removeItem('thcs_registered_account_code');
    } catch (e) {
      console.error('Failed to clear session:', e);
    }
  },

  isTeacher(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.role === 'teacher' && user.isActive === true;
  },

  isStudent(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.role === 'student' && user.isActive === true;
  }
};

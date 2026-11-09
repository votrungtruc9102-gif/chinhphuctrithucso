import { GradeLevel, SubjectId } from '../types';
import { NavTab } from '../components/navigation/Navbar';

export interface HistoryEntry {
  tab: NavTab;
  title?: string;
  grade?: GradeLevel;
  subjectId?: SubjectId;
  subView?: string;
  timestamp: number;
}

class NavigationHistoryService {
  private stack: HistoryEntry[] = [];
  private readonly MAX_ENTRIES = 30;

  /**
   * Pushes a new entry onto the navigation stack
   */
  push(tab: NavTab, grade?: GradeLevel, subjectId?: SubjectId, subView?: string, title?: string): void {
    const current = this.peek();
    
    // Avoid duplicate contiguous entries
    if (
      current &&
      current.tab === tab &&
      current.subView === subView &&
      current.grade === grade &&
      current.subjectId === subjectId
    ) {
      return;
    }

    this.stack.push({
      tab,
      title,
      grade,
      subjectId,
      subView,
      timestamp: Date.now()
    });

    if (this.stack.length > this.MAX_ENTRIES) {
      this.stack.shift();
    }
  }

  /**
   * Pops the current state and returns the previous state
   */
  pop(): HistoryEntry | null {
    if (this.stack.length <= 1) {
      // If only 1 entry or empty, pop it but return null so caller fallbacks to 'home'
      this.stack = [];
      return null;
    }
    // Remove current entry
    this.stack.pop();
    // Return the new top (which was previous)
    return this.stack[this.stack.length - 1] || null;
  }

  /**
   * Peeks the current top entry
   */
  peek(): HistoryEntry | null {
    if (this.stack.length === 0) return null;
    return this.stack[this.stack.length - 1];
  }

  /**
   * Gets the previous entry without mutating stack
   */
  getPrevious(): HistoryEntry | null {
    if (this.stack.length < 2) return null;
    return this.stack[this.stack.length - 2];
  }

  /**
   * Checks if backward navigation is possible
   */
  canGoBack(): boolean {
    return this.stack.length > 1;
  }

  /**
   * Clears the navigation history
   */
  clear(): void {
    this.stack = [];
  }

  getStackLength(): number {
    return this.stack.length;
  }
}

export const navigationHistory = new NavigationHistoryService();

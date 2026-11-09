import { UserAccount } from '../types';

export interface StudentPresenceData {
  uid: string;
  username: string;
  displayName: string;
  className: string;
  grade: number;
  avatarSeed?: string;
  avatarEmoji?: string;
  favoriteCharacterId?: string;
  title?: string;
  rp: number;
  exp: number;
  wins: number;
  losses: number;
  winStreak: number;
  lastActive: string;
}

export interface PvPInviteData {
  inviteId: string;
  challenger: {
    uid: string;
    displayName: string;
    className: string;
    grade: number;
    avatarSeed?: string;
    avatarEmoji?: string;
    characterId?: string;
  };
  targetUid: string;
  sentAt: number;
  expiresInSeconds: number;
}

export interface PvPRoomState {
  id: string;
  challenger: {
    uid: string;
    displayName: string;
    className: string;
    grade: number;
    avatarSeed?: string;
    avatarEmoji?: string;
    characterId: string;
    arenaId: number;
    isReady: boolean;
    score: number;
    roundScores: number[];
    confirmedIdentity: boolean;
  };
  opponent: {
    uid: string;
    displayName: string;
    className: string;
    grade: number;
    avatarSeed?: string;
    avatarEmoji?: string;
    characterId: string;
    arenaId: number;
    isReady: boolean;
    score: number;
    roundScores: number[];
    confirmedIdentity: boolean;
  };
  status: 'identity_check' | 'character_arena_select' | 'lobby' | 'countdown' | 'in_progress' | 'round_break' | 'finished';
  currentRound: number;
  totalRounds: number;
  currentQuestionIndex: number;
  questionsByRound: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[][];
  activeArenaId: number;
  arenaName: string;
  winnerUid?: string;
  isDraw?: boolean;
}

export interface BossRoomState {
  bossId: string;
  bossName: string;
  currentHp: number;
  maxHp: number;
  phase: 'phase1_full' | 'phase2_enrage' | 'phase3_apocalypse';
  members: {
    uid: string;
    displayName: string;
    className: string;
    grade: number;
    damageDealt: number;
    correctAnswers: number;
    avatarEmoji: string;
  }[];
  isDefeated: boolean;
  startedAt: string;
}

type EventCallback = (data: any) => void;

class RealtimeService {
  private ws: WebSocket | null = null;
  private listeners: Map<string, Set<EventCallback>> = new Map();
  private currentUser: UserAccount | null = null;
  private reconnectTimer: any = null;
  private isConnecting: boolean = false;

  constructor() {
    this.connect();
  }

  public connect() {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    try {
      this.isConnecting = true;
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.isConnecting = false;
        if (this.reconnectTimer) {
          clearTimeout(this.reconnectTimer);
          this.reconnectTimer = null;
        }

        // Auto identify if current user exists
        if (this.currentUser) {
          this.identify(this.currentUser);
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const { type, data } = JSON.parse(event.data);
          this.emit(type, data);
        } catch (e) {
          console.error('[Realtime] Failed to parse message', e);
        }
      };

      this.ws.onclose = () => {
        this.isConnecting = false;
        this.ws = null;
        // Auto-reconnect after 3s
        if (!this.reconnectTimer) {
          this.reconnectTimer = setTimeout(() => this.connect(), 3000);
        }
      };

      this.ws.onerror = () => {
        this.isConnecting = false;
      };
    } catch {
      this.isConnecting = false;
    }
  }

  public identify(user: UserAccount) {
    this.currentUser = user;
    // Exclude teachers from student PvP list
    if (user.role === 'teacher') return;

    this.send('auth:identify', {
      uid: user.uid,
      username: user.username,
      displayName: user.displayName,
      className: user.className || '6A1',
      grade: user.grade || 6,
      avatarSeed: user.avatarSeed,
      role: user.role
    });
  }

  public requestOnlineStudents() {
    this.send('presence:get', {});
  }

  public sendPvPInvite(targetUid: string, challenger: any) {
    this.send('pvp:invite', { targetUid, challenger });
  }

  public respondPvPInvite(challengerUid: string, accepted: boolean, inviteId: string) {
    this.send('pvp:respond_invite', { challengerUid, accepted, inviteId });
  }

  public confirmIdentity(roomId: string, uid: string) {
    this.send('pvp:identity_confirm', { roomId, uid });
  }

  public selectCharacter(roomId: string, uid: string, characterId: string) {
    this.send('pvp:select_character', { roomId, uid, characterId });
  }

  public selectArena(roomId: string, uid: string, arenaId: number) {
    this.send('pvp:select_arena', { roomId, uid, arenaId });
  }

  public setReady(roomId: string, uid: string, isReady: boolean) {
    this.send('pvp:ready', { roomId, uid, isReady });
  }

  public submitPvPAnswer(roomId: string, uid: string, roundIndex: number, questionIndex: number, answerIndex: number) {
    this.send('pvp:submit_answer', { roomId, uid, roundIndex, questionIndex, answerIndex });
  }

  public nextPvPStep(roomId: string) {
    this.send('pvp:next_step', { roomId });
  }

  public joinBossRoom(bossId: string, student: any) {
    this.send('boss:join_room', { bossId, student });
  }

  public attackBoss(bossId: string, uid: string, damage: number, isCorrect: boolean) {
    this.send('boss:attack', { bossId, uid, damage, isCorrect });
  }

  private send(type: string, data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, data }));
    } else {
      // If not yet connected, retry when open
      setTimeout(() => {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({ type, data }));
        }
      }, 500);
    }
  }

  public on(event: string, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
    return () => this.off(event, callback);
  }

  public off(event: string, callback: EventCallback) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  private emit(event: string, data: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`[Realtime] Listener error on "${event}":`, err);
        }
      });
    }
  }
}

export const realtimeService = new RealtimeService();

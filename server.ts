import express, { Request, Response } from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';
import { INITIAL_TEXTBOOKS } from './src/data/mockTextbooks.ts';
import { ARENA_STAGES } from './src/data/arenaData.ts';
import { BOSS_DEFINITIONS } from './src/data/bossData.ts';
import { shuffleSingleQuestionOptions, generateBalancedTargetSlots } from './src/utils/gameQuestionHelper.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const DATA_DIR = path.resolve(__dirname, 'data');
const TEXTBOOKS_FILE = path.join(DATA_DIR, 'textbooks.json');
const PRESENCE_FILE = path.join(DATA_DIR, 'presence.json');
const PVP_ROOMS_FILE = path.join(DATA_DIR, 'pvp_rooms.json');
const PVP_MATCHES_FILE = path.join(DATA_DIR, 'pvp_matches.json');
const BOSSES_FILE = path.join(DATA_DIR, 'bosses.json');
const LEADERBOARD_FILE = path.join(DATA_DIR, 'leaderboard.json');
const USER_PROFILES_FILE = path.join(DATA_DIR, 'user_profiles.json');
const REGISTERED_STUDENTS_FILE = path.join(DATA_DIR, 'registered_students.json');
const REGISTERED_STUDENTS_BACKUP_FILE = path.join(DATA_DIR, 'registered_students_backup.json');

export interface RegisteredStudent {
  uid: string;
  accountCode: string;
  displayName: string;
  className: string;
  grade: number;
  avatarEmoji: string;
  recoveryCode: string;
  rp: number;
  totalPoints?: number;
  exp: number;
  wins: number;
  losses: number;
  winStreak: number;
  bossDefeatedCount: number;
  unlockedBossIds: string[];
  maxUnlockedArenaStage: number;
  unlockedTitles: string[];
  unlockedBadges: string[];
  ownedCharacterIds: string[];
  favoriteCharacterId: string;
  createdAt: string;
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
interface StudentPresence {
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

interface PvPRoomPlayer {
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
  roundScores: number[]; // Scores for rounds 1 to 5
  confirmedIdentity: boolean;
}

interface PvPRoundQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface PvPRoom {
  id: string;
  challenger: PvPRoomPlayer;
  opponent: PvPRoomPlayer;
  status: 'identity_check' | 'character_arena_select' | 'lobby' | 'countdown' | 'in_progress' | 'round_break' | 'finished';
  currentRound: number; // 1 to 5
  totalRounds: number; // 5
  currentQuestionIndex: number; // 0 to 4 within current round
  questionsByRound: PvPRoundQuestion[][]; // 5 rounds x 5 questions
  activeArenaId: number;
  arenaName: string;
  winnerUid?: string;
  isDraw?: boolean;
  createdAt: string;
  expiresAt?: number;
}

interface BossPartyMember {
  uid: string;
  displayName: string;
  className: string;
  grade: number;
  damageDealt: number;
  correctAnswers: number;
  avatarEmoji: string;
}

interface BossRoom {
  bossId: string;
  bossName: string;
  currentHp: number;
  maxHp: number;
  phase: 'phase1_full' | 'phase2_enrage' | 'phase3_apocalypse';
  members: BossPartyMember[];
  isDefeated: boolean;
  startedAt: string;
}

// -----------------------------------------------------------------------------
// DATA STORAGE INITIALIZATION & HELPERS
// -----------------------------------------------------------------------------
function initDataStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // 1. Textbooks
  if (!fs.existsSync(TEXTBOOKS_FILE)) {
    fs.writeFileSync(TEXTBOOKS_FILE, JSON.stringify(INITIAL_TEXTBOOKS, null, 2), 'utf-8');
    console.log('[Storage] Initialized data/textbooks.json with official curriculum data.');
  }

  // 2. Presence
  if (!fs.existsSync(PRESENCE_FILE)) {
    fs.writeFileSync(PRESENCE_FILE, JSON.stringify([], null, 2), 'utf-8');
  }

  // 3. PvP Rooms
  if (!fs.existsSync(PVP_ROOMS_FILE)) {
    fs.writeFileSync(PVP_ROOMS_FILE, JSON.stringify({}, null, 2), 'utf-8');
  }

  // 4. PvP Matches
  if (!fs.existsSync(PVP_MATCHES_FILE)) {
    fs.writeFileSync(PVP_MATCHES_FILE, JSON.stringify([], null, 2), 'utf-8');
  }

  // 5. Bosses
  if (!fs.existsSync(BOSSES_FILE)) {
    const initialBossProgression: Record<string, { defeatedCount: number; lastDefeatedAt?: string }> = {};
    BOSS_DEFINITIONS.forEach(b => {
      initialBossProgression[b.id] = { defeatedCount: 0 };
    });
    fs.writeFileSync(BOSSES_FILE, JSON.stringify(initialBossProgression, null, 2), 'utf-8');
  }

  // 6. User Profiles (real student profiles)
  if (!fs.existsSync(USER_PROFILES_FILE)) {
    const initialProfiles: Record<string, any> = {
      'u-student-demo': {
        uid: 'u-student-demo',
        username: 'student',
        displayName: 'Học sinh (Tài khoản mẫu)',
        className: '6A1',
        grade: 6,
        avatarSeed: 'studentdemo',
        avatarEmoji: '🧑‍🎓',
        favoriteCharacterId: 'char_1',
        title: 'Tân Thủ Khám Phá',
        rp: 1200,
        exp: 2450,
        wins: 12,
        losses: 4,
        winStreak: 3,
        updatedAt: new Date().toISOString()
      },
      'u-student-01': {
        uid: 'u-student-01',
        username: 'hocsinh.minhquan',
        displayName: 'Nguyễn Minh Quân',
        className: '6A1',
        grade: 6,
        avatarSeed: 'minhquan',
        avatarEmoji: '⚡',
        favoriteCharacterId: 'char_3',
        title: 'Chiến Binh Tri Thức',
        rp: 1450,
        exp: 3800,
        wins: 18,
        losses: 5,
        winStreak: 5,
        updatedAt: new Date().toISOString()
      },
      'u-student-02': {
        uid: 'u-student-02',
        username: 'hocsinh.lan',
        displayName: 'Lê Thị Ngọc Lan',
        className: '7A3',
        grade: 7,
        avatarSeed: 'ngoclan',
        avatarEmoji: '🌸',
        favoriteCharacterId: 'char_6',
        title: 'Bậc Thầy Toán Học',
        rp: 1380,
        exp: 3100,
        wins: 15,
        losses: 6,
        winStreak: 2,
        updatedAt: new Date().toISOString()
      }
    };
    fs.writeFileSync(USER_PROFILES_FILE, JSON.stringify(initialProfiles, null, 2), 'utf-8');
  }

  // 7. Leaderboard
  if (!fs.existsSync(LEADERBOARD_FILE)) {
    fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify({ weekly: [], monthly: [], allTime: [] }, null, 2), 'utf-8');
  }

  // 8. Registered Students Database (Strictly real student registrations, no fake/demo accounts)
  if (!fs.existsSync(REGISTERED_STUDENTS_FILE)) {
    fs.writeFileSync(REGISTERED_STUDENTS_FILE, JSON.stringify([], null, 2), 'utf-8');
    fs.writeFileSync(REGISTERED_STUDENTS_BACKUP_FILE, JSON.stringify([], null, 2), 'utf-8');
    console.log('[Storage] Initialized registered_students.json for persistent student accounts.');
  }
}

function readJSON<T>(file: string, fallback: T): T {
  try {
    if (!fs.existsSync(file)) return fallback;
    const raw = fs.readFileSync(file, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`[Storage] Error reading ${file}:`, err);
    return fallback;
  }
}

function writeJSON<T>(file: string, data: T): boolean {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`[Storage] Error writing ${file}:`, err);
    return false;
  }
}

function isValidHttpUrl(str: string): boolean {
  try {
    const url = new URL(str.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// -----------------------------------------------------------------------------
// QUESTION POOL GENERATOR FOR PVP
// -----------------------------------------------------------------------------
function buildPvPQuestionsForArena(arenaId: number): PvPRoundQuestion[][] {
  const stage = ARENA_STAGES.find(s => s.id === arenaId) || ARENA_STAGES[0];
  const allQuestionsPool: PvPRoundQuestion[] = [];

  // Gather questions from stage + neighbouring stages
  const relevantStages = ARENA_STAGES.filter(
    s => Math.abs(s.id - arenaId) <= 4 || s.regionId === stage.regionId
  );

  relevantStages.forEach(st => {
    st.questions.forEach(q => {
      allQuestionsPool.push({
        id: q.id,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation
      });
    });
  });

  // Fallback if pool is too small: grab from other stages
  if (allQuestionsPool.length < 25) {
    ARENA_STAGES.forEach(st => {
      st.questions.forEach(q => {
        if (!allQuestionsPool.some(existing => existing.id === q.id)) {
          allQuestionsPool.push({
            id: q.id,
            question: q.question,
            options: q.options,
            correctIndex: q.correctIndex,
            explanation: q.explanation
          });
        }
      });
    });
  }

  // Shuffle pool
  const shuffled = [...allQuestionsPool].sort(() => Math.random() - 0.5);

  // Group into 5 rounds x 5 questions = 25 questions with balanced answer distribution
  const rounds: PvPRoundQuestion[][] = [];
  const balancedSlots = generateBalancedTargetSlots(25);
  let slotIndex = 0;

  for (let r = 0; r < 5; r++) {
    const roundQuestions: PvPRoundQuestion[] = [];
    for (let i = 0; i < 5; i++) {
      const idx = (r * 5 + i) % shuffled.length;
      const baseQ = shuffled[idx];
      const assignedSlot = balancedSlots[slotIndex++] ?? Math.floor(Math.random() * 4);
      const shuffledQ = shuffleSingleQuestionOptions(baseQ, assignedSlot);
      roundQuestions.push(shuffledQ);
    }
    rounds.push(roundQuestions);
  }

  return rounds;
}

// -----------------------------------------------------------------------------
// SERVER IMPLEMENTATION WITH WEBSOCKET & REST
// -----------------------------------------------------------------------------
async function startServer() {
  initDataStore();
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server, path: '/ws' });

  app.use(express.json({ limit: '10mb' }));

  // In-memory active presence set mapping uid -> { ws, presenceData }
  const activeSockets = new Map<string, { ws: WebSocket; presence: StudentPresence }>();
  // Active PvP rooms in-memory
  const activePvPRooms = new Map<string, PvPRoom>();
  // Active Boss Raid rooms in-memory mapping bossId -> BossRoom
  const activeBossRooms = new Map<string, BossRoom>();

  // Helper: broadcast presence list to all connected students
  function broadcastPresenceList() {
    const onlineStudents = Array.from(activeSockets.values()).map(item => item.presence);
    writeJSON(PRESENCE_FILE, onlineStudents);

    const payload = JSON.stringify({
      type: 'presence:list',
      data: onlineStudents
    });

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }

  // Helper: compute & refresh leaderboard cache
  function refreshLeaderboardCache() {
    const profiles = readJSON<Record<string, any>>(USER_PROFILES_FILE, {});
    const matches = readJSON<any[]>(PVP_MATCHES_FILE, []);

    const userList = Object.values(profiles).filter(
      p => p.role !== 'teacher' && p.username !== 'teacher'
    );

    // Map each user with win rate and RP
    const rankedUsers = userList.map(u => {
      const total = (u.wins || 0) + (u.losses || 0);
      const winRate = total > 0 ? Math.round(((u.wins || 0) / total) * 100) : 0;
      return {
        uid: u.uid,
        displayName: u.displayName,
        username: u.username,
        className: u.className || '6A1',
        grade: u.grade || 6,
        avatarEmoji: u.avatarEmoji || '🧑‍🎓',
        favoriteCharacterId: u.favoriteCharacterId || 'char_1',
        title: u.title || 'Tân Thủ Khám Phá',
        rp: u.rp || 1000,
        exp: u.exp || 0,
        wins: u.wins || 0,
        losses: u.losses || 0,
        winStreak: u.winStreak || 0,
        winRate
      };
    });

    // Sort by RP descending, then winRate descending
    rankedUsers.sort((a, b) => b.rp - a.rp || b.winRate - a.winRate);

    const leaderboardData = {
      allTime: rankedUsers,
      monthly: rankedUsers.slice(0, 50),
      weekly: rankedUsers.slice(0, 30)
    };

    writeJSON(LEADERBOARD_FILE, leaderboardData);
    return leaderboardData;
  }

  // ---------------------------------------------------------------------------
  // WEBSOCKET LOGIC
  // ---------------------------------------------------------------------------
  wss.on('connection', (ws: WebSocket, _req) => {
    let clientUid = '';

    ws.on('message', (message: string) => {
      try {
        const parsed = JSON.parse(message.toString());
        const { type, data } = parsed;

        switch (type) {
          // 1. Identify and register presence (only students; teachers are excluded)
          case 'auth:identify': {
            if (!data || !data.uid) return;
            // CRITICAL: Filter out teacher accounts completely from PvP presence
            if (data.role === 'teacher' || data.username?.startsWith('teacher') || data.username?.startsWith('giaovien')) {
              console.log(`[WS] Teacher connected (${data.displayName}); excluded from student PvP presence.`);
              return;
            }

            clientUid = data.uid;
            const profiles = readJSON<Record<string, any>>(USER_PROFILES_FILE, {});
            const profile = profiles[clientUid] || {
              uid: data.uid,
              username: data.username,
              displayName: data.displayName,
              className: data.className || '6A1',
              grade: data.grade || 6,
              avatarSeed: data.avatarSeed || 'studentdemo',
              avatarEmoji: data.avatarEmoji || '🧑‍🎓',
              favoriteCharacterId: data.favoriteCharacterId || 'char_1',
              title: data.title || 'Tân Thủ Khám Phá',
              rp: 1200,
              exp: 2000,
              wins: 0,
              losses: 0,
              winStreak: 0,
              updatedAt: new Date().toISOString()
            };

            const presenceItem: StudentPresence = {
              uid: profile.uid,
              username: profile.username,
              displayName: profile.displayName,
              className: profile.className,
              grade: profile.grade,
              avatarSeed: profile.avatarSeed,
              avatarEmoji: profile.avatarEmoji || '🧑‍🎓',
              favoriteCharacterId: profile.favoriteCharacterId || 'char_1',
              title: profile.title || 'Tân Thủ Khám Phá',
              rp: profile.rp || 1000,
              exp: profile.exp || 0,
              wins: profile.wins || 0,
              losses: profile.losses || 0,
              winStreak: profile.winStreak || 0,
              lastActive: new Date().toISOString()
            };

            activeSockets.set(clientUid, { ws, presence: presenceItem });
            broadcastPresenceList();
            break;
          }

          // 2. Client requested current presence list
          case 'presence:get': {
            const list = Array.from(activeSockets.values()).map(i => i.presence);
            ws.send(JSON.stringify({ type: 'presence:list', data: list }));
            break;
          }

          // 3. Send PvP Challenge
          case 'pvp:invite': {
            const { targetUid, challenger } = data;
            const targetSocket = activeSockets.get(targetUid);

            if (!targetSocket || targetSocket.ws.readyState !== WebSocket.OPEN) {
              ws.send(JSON.stringify({
                type: 'pvp:error',
                data: { message: 'Học sinh này hiện không còn online hoặc đang bận.' }
              }));
              return;
            }

            // Forward invitation to target student with 30s expiry timer
            const invitePayload = {
              inviteId: `inv-${Date.now().toString(36)}`,
              challenger,
              targetUid,
              sentAt: Date.now(),
              expiresInSeconds: 30
            };

            targetSocket.ws.send(JSON.stringify({
              type: 'pvp:invited',
              data: invitePayload
            }));

            // Notify sender that invite was transmitted
            ws.send(JSON.stringify({
              type: 'pvp:invite_sent',
              data: { targetUid, inviteId: invitePayload.inviteId }
            }));
            break;
          }

          // 4. Respond to PvP Challenge (Accept or Decline)
          case 'pvp:respond_invite': {
            const { challengerUid, accepted, inviteId } = data;
            const challengerSocket = activeSockets.get(challengerUid);

            if (!accepted) {
              if (challengerSocket && challengerSocket.ws.readyState === WebSocket.OPEN) {
                challengerSocket.ws.send(JSON.stringify({
                  type: 'pvp:declined',
                  data: { message: 'Đối thủ đã từ chối lời thách đấu này.' }
                }));
              }
              return;
            }

            // Accepted! Create PvP Match Room
            const roomId = `room-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
            const p1Presence = challengerSocket?.presence;
            const p2Presence = activeSockets.get(clientUid)?.presence;

            if (!p1Presence || !p2Presence) {
              ws.send(JSON.stringify({ type: 'pvp:error', data: { message: 'Không thể khởi tạo phòng đấu.' } }));
              return;
            }

            const initialArenaId = 1; // Default starting arena
            const defaultQuestions = buildPvPQuestionsForArena(initialArenaId);

            const newRoom: PvPRoom = {
              id: roomId,
              challenger: {
                uid: p1Presence.uid,
                displayName: p1Presence.displayName,
                className: p1Presence.className,
                grade: p1Presence.grade,
                avatarSeed: p1Presence.avatarSeed,
                avatarEmoji: p1Presence.avatarEmoji,
                characterId: p1Presence.favoriteCharacterId || 'char_1',
                arenaId: 1,
                isReady: false,
                score: 0,
                roundScores: [0, 0, 0, 0, 0],
                confirmedIdentity: false
              },
              opponent: {
                uid: p2Presence.uid,
                displayName: p2Presence.displayName,
                className: p2Presence.className,
                grade: p2Presence.grade,
                avatarSeed: p2Presence.avatarSeed,
                avatarEmoji: p2Presence.avatarEmoji,
                characterId: p2Presence.favoriteCharacterId || 'char_2',
                arenaId: 1,
                isReady: false,
                score: 0,
                roundScores: [0, 0, 0, 0, 0],
                confirmedIdentity: false
              },
              status: 'identity_check',
              currentRound: 1,
              totalRounds: 5,
              currentQuestionIndex: 0,
              questionsByRound: defaultQuestions,
              activeArenaId: initialArenaId,
              arenaName: ARENA_STAGES.find(s => s.id === initialArenaId)?.arenaName || 'Đấu trường 1: Đồi Núi Hồng Hoang',
              createdAt: new Date().toISOString()
            };

            activePvPRooms.set(roomId, newRoom);

            const matchStartPayload = JSON.stringify({
              type: 'pvp:match_started',
              data: { roomId, room: newRoom }
            });

            if (challengerSocket && challengerSocket.ws.readyState === WebSocket.OPEN) {
              challengerSocket.ws.send(matchStartPayload);
            }
            ws.send(matchStartPayload);
            break;
          }

          // 5. Identity Confirmation (real account check)
          case 'pvp:identity_confirm': {
            const { roomId, uid } = data;
            const room = activePvPRooms.get(roomId);
            if (!room) return;

            if (room.challenger.uid === uid) room.challenger.confirmedIdentity = true;
            if (room.opponent.uid === uid) room.opponent.confirmedIdentity = true;

            if (room.challenger.confirmedIdentity && room.opponent.confirmedIdentity) {
              room.status = 'character_arena_select';
            }

            const payload = JSON.stringify({ type: 'pvp:room_update', data: room });
            activeSockets.get(room.challenger.uid)?.ws.send(payload);
            activeSockets.get(room.opponent.uid)?.ws.send(payload);
            break;
          }

          // 6. Character Select (1 of 50 characters)
          case 'pvp:select_character': {
            const { roomId, uid, characterId } = data;
            const room = activePvPRooms.get(roomId);
            if (!room) return;

            if (room.challenger.uid === uid) room.challenger.characterId = characterId;
            if (room.opponent.uid === uid) room.opponent.characterId = characterId;

            const payload = JSON.stringify({ type: 'pvp:room_update', data: room });
            activeSockets.get(room.challenger.uid)?.ws.send(payload);
            activeSockets.get(room.opponent.uid)?.ws.send(payload);
            break;
          }

          // 7. Arena Select (1 of 50 arenas)
          case 'pvp:select_arena': {
            const { roomId, uid, arenaId } = data;
            const room = activePvPRooms.get(roomId);
            if (!room) return;

            if (room.challenger.uid === uid) room.challenger.arenaId = arenaId;
            if (room.opponent.uid === uid) room.opponent.arenaId = arenaId;

            // Resolve mutual arena or neutral
            if (room.challenger.arenaId && room.opponent.arenaId) {
              if (room.challenger.arenaId === room.opponent.arenaId) {
                room.activeArenaId = room.challenger.arenaId;
              } else {
                // Alternating or neutral (e.g. Stage 10, 20, 30, 40, 50 or average)
                const neutralIds = [1, 10, 20, 30, 40, 50];
                room.activeArenaId = neutralIds[Math.floor(Math.random() * neutralIds.length)];
              }
              const foundArena = ARENA_STAGES.find(s => s.id === room.activeArenaId);
              if (foundArena) {
                room.arenaName = foundArena.arenaName;
              }
              room.questionsByRound = buildPvPQuestionsForArena(room.activeArenaId);
              room.status = 'lobby';
            }

            const payload = JSON.stringify({ type: 'pvp:room_update', data: room });
            activeSockets.get(room.challenger.uid)?.ws.send(payload);
            activeSockets.get(room.opponent.uid)?.ws.send(payload);
            break;
          }

          // 8. Player Ready toggle
          case 'pvp:ready': {
            const { roomId, uid, isReady } = data;
            const room = activePvPRooms.get(roomId);
            if (!room) return;

            if (room.challenger.uid === uid) room.challenger.isReady = isReady;
            if (room.opponent.uid === uid) room.opponent.isReady = isReady;

            // Both players ready -> trigger 5-second countdown then start round 1
            if (room.challenger.isReady && room.opponent.isReady) {
              room.status = 'countdown';
              const payload = JSON.stringify({ type: 'pvp:countdown_started', data: { seconds: 5, room } });
              activeSockets.get(room.challenger.uid)?.ws.send(payload);
              activeSockets.get(room.opponent.uid)?.ws.send(payload);

              setTimeout(() => {
                if (room.status === 'countdown') {
                  room.status = 'in_progress';
                  room.currentRound = 1;
                  room.currentQuestionIndex = 0;
                  const startPayload = JSON.stringify({ type: 'pvp:round_started', data: room });
                  activeSockets.get(room.challenger.uid)?.ws.send(startPayload);
                  activeSockets.get(room.opponent.uid)?.ws.send(startPayload);
                }
              }, 5000);
            } else {
              const payload = JSON.stringify({ type: 'pvp:room_update', data: room });
              activeSockets.get(room.challenger.uid)?.ws.send(payload);
              activeSockets.get(room.opponent.uid)?.ws.send(payload);
            }
            break;
          }

          // 9. Submit question answer in live match (+10 correct, 0 wrong)
          case 'pvp:submit_answer': {
            const { roomId, uid, roundIndex, questionIndex, answerIndex } = data;
            const room = activePvPRooms.get(roomId);
            if (!room || room.status !== 'in_progress') return;

            const currentQ = room.questionsByRound[roundIndex]?.[questionIndex];
            if (!currentQ) return;

            const isCorrect = answerIndex === currentQ.correctIndex;
            const addedScore = isCorrect ? 10 : 0;

            if (room.challenger.uid === uid) {
              room.challenger.score += addedScore;
              room.challenger.roundScores[roundIndex] = (room.challenger.roundScores[roundIndex] || 0) + addedScore;
            } else if (room.opponent.uid === uid) {
              room.opponent.score += addedScore;
              room.opponent.roundScores[roundIndex] = (room.opponent.roundScores[roundIndex] || 0) + addedScore;
            }

            // Sync score immediately to both players
            const scorePayload = JSON.stringify({
              type: 'pvp:score_update',
              data: {
                roomId,
                answeredBy: uid,
                isCorrect,
                addedScore,
                challengerScore: room.challenger.score,
                opponentScore: room.opponent.score,
                roundScores: {
                  challenger: room.challenger.roundScores,
                  opponent: room.opponent.roundScores
                }
              }
            });

            activeSockets.get(room.challenger.uid)?.ws.send(scorePayload);
            activeSockets.get(room.opponent.uid)?.ws.send(scorePayload);
            break;
          }

          // 10. Advance to next question or next round
          case 'pvp:next_step': {
            const { roomId } = data;
            const room = activePvPRooms.get(roomId);
            if (!room) return;

            if (room.currentQuestionIndex < 4) {
              // Next question in current round
              room.currentQuestionIndex += 1;
            } else {
              // Round complete! Check if 5 rounds completed
              if (room.currentRound < 5) {
                room.currentRound += 1;
                room.currentQuestionIndex = 0;
              } else {
                // MATCH FINISHED! Determine Winner / Draw
                room.status = 'finished';
                const p1Score = room.challenger.score;
                const p2Score = room.opponent.score;

                let winnerUid: string | undefined;
                let isDraw = false;

                if (p1Score > p2Score) {
                  winnerUid = room.challenger.uid;
                } else if (p2Score > p1Score) {
                  winnerUid = room.opponent.uid;
                } else {
                  isDraw = true;
                }

                room.winnerUid = winnerUid;
                room.isDraw = isDraw;

                // Award RP and EXP in user_profiles.json
                const profiles = readJSON<Record<string, any>>(USER_PROFILES_FILE, {});
                const p1 = profiles[room.challenger.uid] || { uid: room.challenger.uid };
                const p2 = profiles[room.opponent.uid] || { uid: room.opponent.uid };

                if (isDraw) {
                  p1.rp = (p1.rp || 1200) + 10;
                  p1.exp = (p1.exp || 2000) + 60;
                  p2.rp = (p2.rp || 1200) + 10;
                  p2.exp = (p2.exp || 2000) + 60;
                } else if (winnerUid === room.challenger.uid) {
                  p1.rp = (p1.rp || 1200) + 25;
                  p1.exp = (p1.exp || 2000) + 120;
                  p1.wins = (p1.wins || 0) + 1;
                  p1.winStreak = (p1.winStreak || 0) + 1;

                  p2.rp = Math.max(0, (p2.rp || 1200) - 10);
                  p2.exp = (p2.exp || 2000) + 40;
                  p2.losses = (p2.losses || 0) + 1;
                  p2.winStreak = 0;
                } else {
                  p2.rp = (p2.rp || 1200) + 25;
                  p2.exp = (p2.exp || 2000) + 120;
                  p2.wins = (p2.wins || 0) + 1;
                  p2.winStreak = (p2.winStreak || 0) + 1;

                  p1.rp = Math.max(0, (p1.rp || 1200) - 10);
                  p1.exp = (p1.exp || 2000) + 40;
                  p1.losses = (p1.losses || 0) + 1;
                  p1.winStreak = 0;
                }

                profiles[room.challenger.uid] = p1;
                profiles[room.opponent.uid] = p2;
                writeJSON(USER_PROFILES_FILE, profiles);

                // Record into pvp_matches.json
                const matches = readJSON<any[]>(PVP_MATCHES_FILE, []);
                matches.unshift({
                  id: room.id,
                  arenaId: room.activeArenaId,
                  arenaName: room.arenaName,
                  challenger: {
                    uid: room.challenger.uid,
                    displayName: room.challenger.displayName,
                    score: room.challenger.score,
                    roundScores: room.challenger.roundScores
                  },
                  opponent: {
                    uid: room.opponent.uid,
                    displayName: room.opponent.displayName,
                    score: room.opponent.score,
                    roundScores: room.opponent.roundScores
                  },
                  winnerUid,
                  isDraw,
                  completedAt: new Date().toISOString()
                });
                writeJSON(PVP_MATCHES_FILE, matches);

                // Update leaderboard cache
                refreshLeaderboardCache();
              }
            }

            const stepPayload = JSON.stringify({ type: 'pvp:room_update', data: room });
            activeSockets.get(room.challenger.uid)?.ws.send(stepPayload);
            activeSockets.get(room.opponent.uid)?.ws.send(stepPayload);
            break;
          }

          // 11. Boss Raid: Join room (3-10 players)
          case 'boss:join_room': {
            const { bossId, student } = data;
            const bossDef = BOSS_DEFINITIONS.find(b => b.id === bossId) || BOSS_DEFINITIONS[0];

            let bRoom = activeBossRooms.get(bossId);
            if (!bRoom) {
              bRoom = {
                bossId,
                bossName: bossDef.name,
                currentHp: bossDef.maxHp,
                maxHp: bossDef.maxHp,
                phase: 'phase1_full',
                members: [],
                isDefeated: false,
                startedAt: new Date().toISOString()
              };
              activeBossRooms.set(bossId, bRoom);
            }

            if (!bRoom.members.some(m => m.uid === student.uid)) {
              bRoom.members.push({
                uid: student.uid,
                displayName: student.displayName,
                className: student.className || '6A1',
                grade: student.grade || 6,
                damageDealt: 0,
                correctAnswers: 0,
                avatarEmoji: student.avatarEmoji || '🧑‍🎓'
              });
            }

            const payload = JSON.stringify({ type: 'boss:room_update', data: bRoom });
            bRoom.members.forEach(m => {
              activeSockets.get(m.uid)?.ws.send(payload);
            });
            break;
          }

          // 12. Boss Raid: Member Attack (Deal real damage)
          case 'boss:attack': {
            const { bossId, uid, damage, isCorrect } = data;
            const bRoom = activeBossRooms.get(bossId);
            if (!bRoom || bRoom.isDefeated) return;

            const member = bRoom.members.find(m => m.uid === uid);
            if (member && isCorrect) {
              member.correctAnswers += 1;
              member.damageDealt += damage;
              bRoom.currentHp = Math.max(0, bRoom.currentHp - damage);

              // Phase transitions (Toàn sức mạnh > Cuồng nộ > Tuyệt diệt)
              const hpPct = (bRoom.currentHp / bRoom.maxHp) * 100;
              if (hpPct <= 25) {
                bRoom.phase = 'phase3_apocalypse';
              } else if (hpPct <= 60) {
                bRoom.phase = 'phase2_enrage';
              } else {
                bRoom.phase = 'phase1_full';
              }

              if (bRoom.currentHp === 0) {
                bRoom.isDefeated = true;
                // Record in bosses.json
                const bProg = readJSON<Record<string, any>>(BOSSES_FILE, {});
                if (!bProg[bossId]) bProg[bossId] = { defeatedCount: 0 };
                bProg[bossId].defeatedCount += 1;
                bProg[bossId].lastDefeatedAt = new Date().toISOString();
                writeJSON(BOSSES_FILE, bProg);
              }
            }

            const payload = JSON.stringify({ type: 'boss:room_update', data: bRoom });
            bRoom.members.forEach(m => {
              activeSockets.get(m.uid)?.ws.send(payload);
            });
            break;
          }

          default:
            break;
        }
      } catch (err) {
        console.error('[WS] Message handling error:', err);
      }
    });

    ws.on('close', () => {
      if (clientUid && activeSockets.has(clientUid)) {
        activeSockets.delete(clientUid);
        broadcastPresenceList();
      }
    });
  });

  // ---------------------------------------------------------------------------
  // REST APIS
  // ---------------------------------------------------------------------------

  // GET: Active Online Students
  app.get('/api/presence', (_req: Request, res: Response) => {
    const list = Array.from(activeSockets.values()).map(item => item.presence);
    res.json(list);
  });

  // GET: Leaderboard
  app.get('/api/leaderboard', (_req: Request, res: Response) => {
    const cache = readJSON<any>(LEADERBOARD_FILE, null);
    if (cache && cache.allTime && cache.allTime.length > 0) {
      return res.json(cache);
    }
    const fresh = refreshLeaderboardCache();
    res.json(fresh);
  });

  // GET: User Profile with real RP, stats, etc.
  app.get('/api/profile/:uid', (req: Request, res: Response) => {
    const { uid } = req.params;
    const profiles = readJSON<Record<string, any>>(USER_PROFILES_FILE, {});
    const p = profiles[uid];
    if (p) {
      return res.json(p);
    }
    return res.status(404).json({ error: 'Không tìm thấy hồ sơ học sinh.' });
  });

  // POST: Update student profile (avatar, displayName, username, favoriteCharacter, title)
  app.post('/api/profile/update', (req: Request, res: Response) => {
    const { uid, displayName, username, avatarSeed, avatarEmoji, favoriteCharacterId, title } = req.body;

    if (!uid) {
      return res.status(400).json({ error: 'Mã học sinh là bắt buộc.' });
    }

    const trimmedName = String(displayName || '').trim();
    if (!trimmedName) {
      return res.status(400).json({ error: 'Tên hiển thị không được để trống.' });
    }

    const profiles = readJSON<Record<string, any>>(USER_PROFILES_FILE, {});

    // Check username uniqueness if changed
    if (username) {
      const trimmedUser = String(username).trim().toLowerCase();
      const duplicate = Object.values(profiles).find(
        p => p.uid !== uid && p.username?.toLowerCase() === trimmedUser
      );
      if (duplicate) {
        return res.status(400).json({ error: 'Tên đăng nhập này đã được sử dụng bởi học sinh khác.' });
      }
    }

    const existing = profiles[uid] || {
      uid,
      rp: 1200,
      exp: 2000,
      wins: 0,
      losses: 0,
      winStreak: 0
    };

    const updated = {
      ...existing,
      uid,
      displayName: trimmedName,
      username: username ? String(username).trim() : existing.username,
      avatarSeed: avatarSeed || existing.avatarSeed,
      avatarEmoji: avatarEmoji || existing.avatarEmoji || '🧑‍🎓',
      favoriteCharacterId: favoriteCharacterId || existing.favoriteCharacterId || 'char_1',
      title: title || existing.title || 'Tân Thủ Khám Phá',
      updatedAt: new Date().toISOString()
    };

    profiles[uid] = updated;
    writeJSON(USER_PROFILES_FILE, profiles);

    // If student is currently online, update active socket presence data
    const activeItem = activeSockets.get(uid);
    if (activeItem) {
      activeItem.presence.displayName = updated.displayName;
      activeItem.presence.avatarEmoji = updated.avatarEmoji;
      activeItem.presence.favoriteCharacterId = updated.favoriteCharacterId;
      activeItem.presence.title = updated.title;
      broadcastPresenceList();
    }

    refreshLeaderboardCache();
    return res.json(updated);
  });

  // GET: Match history for a user
  app.get('/api/pvp/history/:uid', (req: Request, res: Response) => {
    const { uid } = req.params;
    const matches = readJSON<any[]>(PVP_MATCHES_FILE, []);
    const userMatches = matches.filter(
      m => m.challenger.uid === uid || m.opponent.uid === uid
    );
    res.json(userMatches);
  });

  // GET: 50 Bosses Raid Status
  app.get('/api/bosses/status', (_req: Request, res: Response) => {
    const progression = readJSON<Record<string, any>>(BOSSES_FILE, {});
    res.json(progression);
  });

  // ---------------------------------------------------------------------------
  // REST API: HỆ THỐNG TÀI KHOẢN HỌC SINH THẬT (KHÔNG CẦN MẬT KHẨU)
  // Lưu trữ bền vững trong data/registered_students.json & backup
  // ---------------------------------------------------------------------------

  // 1. POST /api/students/register - Đăng ký tài khoản học sinh thật
  app.post('/api/students/register', (req: Request, res: Response) => {
    try {
      const { fullName, className, grade } = req.body;

      const trimmedName = String(fullName || '').trim();
      const trimmedClass = String(className || '').trim().toUpperCase();

      if (!trimmedName || trimmedName.length < 2) {
        return res.status(400).json({ error: 'Vui lòng nhập đầy đủ họ và tên học sinh (tối thiểu 2 ký tự).' });
      }

      if (!trimmedClass) {
        return res.status(400).json({ error: 'Vui lòng chọn hoặc nhập lớp học (ví dụ: 6A5, 7A5, 8A5, 9A5).' });
      }

      // Determine grade from input or className (e.g. "6A5" -> 6)
      let parsedGrade = Number(grade);
      if (!parsedGrade || parsedGrade < 6 || parsedGrade > 9) {
        const match = trimmedClass.match(/^[6-9]/);
        parsedGrade = match ? parseInt(match[0], 10) : 6;
      }

      const students = readJSON<RegisteredStudent[]>(REGISTERED_STUDENTS_FILE, []);

      // Generate unique account code: e.g. "MH-6A5-9284"
      let accountCode = '';
      let isCodeUnique = false;
      let attempts = 0;
      const cleanClassTag = trimmedClass.replace(/[^A-Z0-9]/g, '');

      while (!isCodeUnique && attempts < 100) {
        attempts++;
        const rand4 = Math.floor(1000 + Math.random() * 9000);
        accountCode = `MH-${cleanClassTag || `${parsedGrade}A`}-${rand4}`;
        if (!students.some(s => s.accountCode === accountCode)) {
          isCodeUnique = true;
        }
      }

      // 6-digit recovery code
      const recoveryCode = String(Math.floor(100000 + Math.random() * 900000));
      const uid = `stu_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const now = new Date().toISOString();

      const newStudent: RegisteredStudent = {
        uid,
        accountCode,
        displayName: trimmedName,
        className: trimmedClass,
        grade: parsedGrade,
        avatarEmoji: '🧑‍🎓',
        recoveryCode,
        rp: 1200,
        totalPoints: 0,
        exp: 100,
        wins: 0,
        losses: 0,
        winStreak: 0,
        bossDefeatedCount: 0,
        unlockedBossIds: ['boss_1'],
        maxUnlockedArenaStage: 1,
        unlockedTitles: ['Tân Thủ Tri Thức'],
        unlockedBadges: ['badge_welcome'],
        ownedCharacterIds: ['char_1', 'char_2'],
        favoriteCharacterId: 'char_1',
        createdAt: now,
        lastActive: now,
        gameHistory: [
          {
            gameType: 'register',
            result: 'Tạo tài khoản thành công',
            scoreChange: 0,
            timestamp: now,
            details: `Gia nhập hệ sinh thái với mã ${accountCode}`
          }
        ]
      };

      students.unshift(newStudent);

      // Save to primary storage & persistent backup
      writeJSON(REGISTERED_STUDENTS_FILE, students);
      writeJSON(REGISTERED_STUDENTS_BACKUP_FILE, students);

      // Also register into USER_PROFILES_FILE for universal presence/PvP compatibility
      const profiles = readJSON<Record<string, any>>(USER_PROFILES_FILE, {});
      profiles[uid] = {
        uid,
        username: accountCode.toLowerCase(),
        displayName: trimmedName,
        className: trimmedClass,
        grade: parsedGrade,
        accountCode,
        avatarEmoji: '🧑‍🎓',
        favoriteCharacterId: 'char_1',
        title: 'Tân Thủ Tri Thức',
        rp: 1200,
        exp: 100,
        wins: 0,
        losses: 0,
        winStreak: 0,
        updatedAt: now
      };
      writeJSON(USER_PROFILES_FILE, profiles);

      console.log(`[Student Auth] Registered real student: ${trimmedName} (${trimmedClass}) - Code: ${accountCode}`);

      return res.status(201).json({
        success: true,
        account: newStudent,
        message: `Chào mừng ${trimmedName} – Lớp ${trimmedClass} đến với thế giới trò chơi tri thức!`
      });
    } catch (err: any) {
      console.error('[Student Auth] Register error:', err);
      return res.status(500).json({ error: 'Lỗi máy chủ khi đăng ký tài khoản học sinh.' });
    }
  });

  // 2. POST /api/students/login - Đăng nhập lại bằng mã tài khoản hoặc chọn từ danh sách
  app.post('/api/students/login', (req: Request, res: Response) => {
    try {
      const { accountCode, uid } = req.body;

      if (!accountCode && !uid) {
        return res.status(400).json({ error: 'Vui lòng cung cấp mã tài khoản hoặc ID học sinh.' });
      }

      const students = readJSON<RegisteredStudent[]>(REGISTERED_STUDENTS_FILE, []);
      const trimmedCode = accountCode ? String(accountCode).trim().toUpperCase() : null;

      const student = students.find(s =>
        (trimmedCode && s.accountCode?.toUpperCase() === trimmedCode) ||
        (uid && s.uid === uid)
      );

      if (!student) {
        return res.status(404).json({
          error: 'Không tìm thấy tài khoản học sinh tương ứng. Vui lòng kiểm tra lại mã tài khoản hoặc đăng ký mới.'
        });
      }

      // Update last active
      student.lastActive = new Date().toISOString();
      writeJSON(REGISTERED_STUDENTS_FILE, students);

      return res.json({
        success: true,
        account: student,
        message: `Chào mừng trở lại, ${student.displayName}!`
      });
    } catch (err: any) {
      console.error('[Student Auth] Login error:', err);
      return res.status(500).json({ error: 'Lỗi máy chủ khi đăng nhập.' });
    }
  });

  // 3. GET /api/students/list - Lấy danh sách học sinh thật đã đăng ký
  app.get('/api/students/list', (req: Request, res: Response) => {
    try {
      const search = req.query.search ? String(req.query.search).trim().toLowerCase() : '';
      const grade = req.query.grade ? Number(req.query.grade) : null;
      const forTeacher = req.query.forTeacher === 'true' || req.query.includeRecovery === 'true';
      const showArchived = req.query.showArchived === 'true';

      const students = readJSON<RegisteredStudent[]>(REGISTERED_STUDENTS_FILE, []);

      let filtered = students;

      if (showArchived) {
        filtered = filtered.filter(s => s.isArchived === true);
      } else {
        filtered = filtered.filter(s => !s.isArchived);
      }

      if (grade && grade >= 6 && grade <= 9) {
        filtered = filtered.filter(s => s.grade === grade);
      }

      if (search) {
        filtered = filtered.filter(s =>
          s.displayName.toLowerCase().includes(search) ||
          s.className.toLowerCase().includes(search) ||
          s.accountCode.toLowerCase().includes(search)
        );
      }

      // Hide recovery code unless explicitly accessed in teacher mode
      const result = filtered.map(s => {
        if (!forTeacher) {
          const { recoveryCode, ...safe } = s;
          return safe;
        }
        return s;
      });

      return res.json({
        total: students.length,
        filteredCount: result.length,
        students: result
      });
    } catch (err: any) {
      console.error('[Student Auth] List error:', err);
      return res.status(500).json({ error: 'Lỗi máy chủ khi lấy danh sách học sinh.' });
    }
  });

  // 3.1 POST /api/students/archive - Xóa mềm (Lưu trữ an toàn tài khoản học sinh, bảo lưu toàn bộ điểm số, vàng, EXP, tiến trình)
  app.post('/api/students/archive', (req: Request, res: Response) => {
    try {
      const { uids } = req.body;
      if (!Array.isArray(uids) || uids.length === 0) {
        return res.status(400).json({ error: 'Vui lòng chọn ít nhất một tài khoản để lưu trữ.' });
      }

      const students = readJSON<RegisteredStudent[]>(REGISTERED_STUDENTS_FILE, []);
      let modified = 0;
      students.forEach(s => {
        if (uids.includes(s.uid)) {
          s.isArchived = true;
          s.archivedAt = new Date().toISOString();
          modified++;
        }
      });

      writeJSON(REGISTERED_STUDENTS_FILE, students);
      writeJSON(REGISTERED_STUDENTS_BACKUP_FILE, students);

      return res.json({
        success: true,
        count: modified,
        message: `Đã lưu trữ an toàn ${modified} tài khoản học sinh. Toàn bộ tiến trình, EXP, RP và nhân vật đã được bảo lưu đầy đủ.`
      });
    } catch (err: any) {
      console.error('[Student Auth] Archive error:', err);
      return res.status(500).json({ error: 'Lỗi máy chủ khi lưu trữ tài khoản.' });
    }
  });

  // 3.2 POST /api/students/restore - Khôi phục tài khoản từ lưu trữ với mã tài khoản gốc
  app.post('/api/students/restore', (req: Request, res: Response) => {
    try {
      const { uid, accountCode } = req.body;
      if (!uid && !accountCode) {
        return res.status(400).json({ error: 'Cần mã UID hoặc mã tài khoản để khôi phục.' });
      }

      const students = readJSON<RegisteredStudent[]>(REGISTERED_STUDENTS_FILE, []);
      const student = students.find(s =>
        (uid && s.uid === uid) ||
        (accountCode && s.accountCode.toUpperCase() === String(accountCode).toUpperCase().trim())
      );

      if (!student) {
        return res.status(404).json({ error: 'Không tìm thấy tài khoản để khôi phục.' });
      }

      student.isArchived = false;
      delete student.archivedAt;
      student.lastActive = new Date().toISOString();

      writeJSON(REGISTERED_STUDENTS_FILE, students);
      writeJSON(REGISTERED_STUDENTS_BACKUP_FILE, students);

      return res.json({
        success: true,
        account: student,
        message: `Đã khôi phục thành công tài khoản ${student.displayName} (${student.accountCode}) với đầy đủ điểm số và tiến trình ban đầu!`
      });
    } catch (err: any) {
      console.error('[Student Auth] Restore error:', err);
      return res.status(500).json({ error: 'Lỗi máy chủ khi khôi phục tài khoản.' });
    }
  });

  // 4. POST /api/students/recover - Khôi phục tài khoản bằng mã tài khoản hoặc mã khôi phục
  app.post('/api/students/recover', (req: Request, res: Response) => {
    try {
      const { accountCode, recoveryCode } = req.body;

      if (!accountCode && !recoveryCode) {
        return res.status(400).json({ error: 'Vui lòng nhập mã tài khoản hoặc mã khôi phục.' });
      }

      const students = readJSON<RegisteredStudent[]>(REGISTERED_STUDENTS_FILE, []);
      const trimmedCode = accountCode ? String(accountCode).trim().toUpperCase() : null;
      const trimmedRec = recoveryCode ? String(recoveryCode).trim() : null;

      const student = students.find(s =>
        (trimmedCode && s.accountCode.toUpperCase() === trimmedCode) ||
        (trimmedRec && s.recoveryCode === trimmedRec)
      );

      if (!student) {
        return res.status(404).json({ error: 'Mã tài khoản hoặc mã khôi phục không chính xác.' });
      }

      // If previously archived, unarchive automatically upon valid recovery
      if (student.isArchived) {
        student.isArchived = false;
        delete student.archivedAt;
      }

      student.lastActive = new Date().toISOString();
      writeJSON(REGISTERED_STUDENTS_FILE, students);
      writeJSON(REGISTERED_STUDENTS_BACKUP_FILE, students);

      return res.json({
        success: true,
        account: student,
        message: `Đã khôi phục thành công tài khoản của ${student.displayName} (${student.className})!`
      });
    } catch (err: any) {
      console.error('[Student Auth] Recovery error:', err);
      return res.status(500).json({ error: 'Lỗi máy chủ khi khôi phục tài khoản.' });
    }
  });

  // 5. POST /api/students/update-progress - Đồng bộ điểm, thành tích, tiến trình Boss & Đấu trường
  app.post('/api/students/update-progress', (req: Request, res: Response) => {
    try {
      const {
        uid,
        rpChange,
        pointsChange,
        totalPoints,
        expChange,
        isWin,
        isLoss,
        bossDefeated,
        arenaStage,
        newBadge,
        newTitle,
        characterId,
        gameType,
        details
      } = req.body;

      if (!uid) {
        return res.status(400).json({ error: 'Mã học sinh là bắt buộc.' });
      }

      const students = readJSON<RegisteredStudent[]>(REGISTERED_STUDENTS_FILE, []);
      const student = students.find(s => s.uid === uid);

      if (!student) {
        return res.status(404).json({ error: 'Không tìm thấy tài khoản học sinh.' });
      }

      // Update points and stats
      if (typeof pointsChange === 'number') {
        student.totalPoints = Math.max(0, (student.totalPoints || 0) + pointsChange);
      }
      if (typeof totalPoints === 'number') {
        student.totalPoints = Math.max(0, totalPoints);
      }
      if (typeof rpChange === 'number') {
        student.rp = Math.max(0, student.rp + rpChange);
      }
      if (typeof expChange === 'number') {
        student.exp = Math.max(0, student.exp + expChange);
      }
      if (isWin) {
        student.wins += 1;
        student.winStreak += 1;
      }
      if (isLoss) {
        student.losses += 1;
        student.winStreak = 0;
      }

      // Update Boss Progression
      if (bossDefeated) {
        if (!student.unlockedBossIds.includes(bossDefeated)) {
          student.unlockedBossIds.push(bossDefeated);
          student.bossDefeatedCount += 1;
        }
      }

      // Update Arena Stage
      if (typeof arenaStage === 'number' && arenaStage > student.maxUnlockedArenaStage) {
        student.maxUnlockedArenaStage = Math.min(50, arenaStage);
      }

      // Add Badges & Titles
      if (newBadge && !student.unlockedBadges.includes(newBadge)) {
        student.unlockedBadges.push(newBadge);
      }
      if (newTitle && !student.unlockedTitles.includes(newTitle)) {
        student.unlockedTitles.push(newTitle);
      }
      if (characterId && !student.ownedCharacterIds.includes(characterId)) {
        student.ownedCharacterIds.push(characterId);
      }

      student.lastActive = new Date().toISOString();

      // Record game history
      if (gameType) {
        student.gameHistory.unshift({
          gameType,
          result: isWin ? 'Chiến thắng' : isLoss ? 'Thất bại' : 'Hoàn thành',
          scoreChange: rpChange || 0,
          timestamp: new Date().toISOString(),
          details: details || ''
        });
        if (student.gameHistory.length > 50) {
          student.gameHistory.pop();
        }
      }

      // Save to primary & backup
      writeJSON(REGISTERED_STUDENTS_FILE, students);
      writeJSON(REGISTERED_STUDENTS_BACKUP_FILE, students);

      // Sync with USER_PROFILES_FILE
      const profiles = readJSON<Record<string, any>>(USER_PROFILES_FILE, {});
      if (profiles[uid]) {
        profiles[uid].rp = student.rp;
        profiles[uid].exp = student.exp;
        profiles[uid].wins = student.wins;
        profiles[uid].losses = student.losses;
        profiles[uid].winStreak = student.winStreak;
        profiles[uid].updatedAt = new Date().toISOString();
        writeJSON(USER_PROFILES_FILE, profiles);
      }

      // Update live socket presence if active
      const activeItem = activeSockets.get(uid);
      if (activeItem) {
        activeItem.presence.rp = student.rp;
        activeItem.presence.exp = student.exp;
        activeItem.presence.wins = student.wins;
        activeItem.presence.losses = student.losses;
        activeItem.presence.winStreak = student.winStreak;
        broadcastPresenceList();
      }

      return res.json({ success: true, account: student });
    } catch (err: any) {
      console.error('[Student Auth] Update progress error:', err);
      return res.status(500).json({ error: 'Lỗi máy chủ khi cập nhật tiến trình.' });
    }
  });

  // 5.1 POST /api/students/update-points - Cập nhật điểm tích lũy theo Account ID
  app.post('/api/students/update-points', (req: Request, res: Response) => {
    try {
      const { uid, accountCode, pointsChange, totalPoints } = req.body;
      const id = uid || accountCode;
      if (!id) {
        return res.status(400).json({ error: 'Mã tài khoản học sinh là bắt buộc.' });
      }

      const students = readJSON<RegisteredStudent[]>(REGISTERED_STUDENTS_FILE, []);
      const student = students.find(s => s.uid === id || s.accountCode === id);

      if (!student) {
        return res.status(404).json({ error: 'Không tìm thấy tài khoản học sinh.' });
      }

      if (typeof totalPoints === 'number') {
        student.totalPoints = Math.max(0, totalPoints);
      } else if (typeof pointsChange === 'number') {
        student.totalPoints = Math.max(0, (student.totalPoints || 0) + pointsChange);
      }

      student.lastActive = new Date().toISOString();

      writeJSON(REGISTERED_STUDENTS_FILE, students);
      writeJSON(REGISTERED_STUDENTS_BACKUP_FILE, students);

      return res.json({ success: true, account: student, totalPoints: student.totalPoints });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Lỗi cập nhật điểm tích lũy.' });
    }
  });

  // 5.2 POST /api/students/reward-transaction - Ghi nhận giao dịch điểm thưởng từ trò chơi (Chống cộng trùng lặp)
  app.post('/api/students/reward-transaction', (req: Request, res: Response) => {
    try {
      const { id, gameName, activity, points, timestamp, accountId } = req.body;
      const targetId = accountId;
      if (!targetId || !id) {
        return res.status(400).json({ error: 'Mã tài khoản và mã giao dịch là bắt buộc.' });
      }

      const students = readJSON<RegisteredStudent[]>(REGISTERED_STUDENTS_FILE, []);
      const student = students.find(s => s.uid === targetId || s.accountCode === targetId);

      if (!student) {
        return res.status(404).json({ error: 'Không tìm thấy tài khoản học sinh.' });
      }

      // Check anti-duplication
      const alreadyLogged = student.gameHistory.some(h => (h as any).transactionId === id || (h.details && h.details.includes(id)));
      if (alreadyLogged) {
        return res.json({ success: true, message: 'Giao dịch đã được ghi nhận trước đó.', totalPoints: student.totalPoints });
      }

      const pts = Number(points) || 0;
      if (pts > 0) {
        student.totalPoints = Math.max(0, (student.totalPoints || 0) + pts);
        student.rp = Math.max(0, student.rp + pts);
        student.exp = Math.max(0, student.exp + pts * 2);
      }

      student.lastActive = new Date().toISOString();

      student.gameHistory.unshift({
        gameType: gameName || 'Trò chơi học tập',
        result: 'Hoàn thành thử thách',
        scoreChange: pts,
        timestamp: timestamp || new Date().toISOString(),
        details: `[${id}] ${activity || 'Nhận thưởng từ trò chơi'} (+${pts} điểm)`
      });

      if (student.gameHistory.length > 50) {
        student.gameHistory.pop();
      }

      writeJSON(REGISTERED_STUDENTS_FILE, students);
      writeJSON(REGISTERED_STUDENTS_BACKUP_FILE, students);

      return res.json({
        success: true,
        transactionId: id,
        totalPoints: student.totalPoints,
        account: student
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Lỗi ghi nhận điểm thưởng.' });
    }
  });

  // 6. GET /api/students/stats - Thống kê học sinh thực tế cho Giáo viên
  app.get('/api/students/stats', (_req: Request, res: Response) => {
    try {
      const students = readJSON<RegisteredStudent[]>(REGISTERED_STUDENTS_FILE, []);

      const byGrade: Record<string, number> = {
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0
      };

      students.forEach(s => {
        const gKey = String(s.grade);
        if (byGrade[gKey] !== undefined) {
          byGrade[gKey]++;
        }
      });

      return res.json({
        totalRegistered: students.length,
        byGrade,
        students
      });
    } catch (err: any) {
      console.error('[Student Auth] Stats error:', err);
      return res.status(500).json({ error: 'Lỗi máy chủ khi thống kê học sinh.' });
    }
  });

  // ---------------------------------------------------------------------------
  // REST API: SÁCH GIÁO KHOA (TEXTBOOKS)
  // ---------------------------------------------------------------------------
  app.get('/api/textbooks', (_req: Request, res: Response) => {
    const books = readJSON<any[]>(TEXTBOOKS_FILE, INITIAL_TEXTBOOKS);
    res.json(books);
  });

  app.get('/api/check-embed', async (req: Request, res: Response) => {
    const rawUrl = req.query.url ? String(req.query.url).trim() : '';
    if (!rawUrl || !isValidHttpUrl(rawUrl)) {
      return res.json({ canEmbed: false, reason: 'invalid_url' });
    }

    try {
      const parsed = new URL(rawUrl);
      const host = parsed.hostname.toLowerCase();
      const knownBlockedHosts = [
        'taphuan.nxbgd.vn',
        'hanhtrangso.nxbgd.vn',
        'hoc10.vn',
        'nxbgd.vn',
        'moet.gov.vn',
        'sachmem.vn',
        'olm.vn',
        'violet.vn'
      ];

      if (knownBlockedHosts.some(d => host === d || host.endsWith('.' + d))) {
        return res.json({
          canEmbed: false,
          reason: 'known_blocked_domain',
          domain: host
        });
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const headRes = await fetch(rawUrl, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        redirect: 'follow'
      }).catch(() => null);

      clearTimeout(timeoutId);

      if (!headRes) {
        return res.json({ canEmbed: false, reason: 'unreachable_or_timeout' });
      }

      const xFrame = headRes.headers.get('x-frame-options');
      if (xFrame) {
        const val = xFrame.toUpperCase();
        if (val.includes('DENY') || val.includes('SAMEORIGIN') || val.includes('ALLOW-FROM')) {
          return res.json({ canEmbed: false, reason: 'x_frame_options', value: xFrame });
        }
      }

      const csp = headRes.headers.get('content-security-policy');
      if (csp) {
        const cspVal = csp.toLowerCase();
        if (cspVal.includes('frame-ancestors') && !cspVal.includes('frame-ancestors *')) {
          return res.json({ canEmbed: false, reason: 'csp_frame_ancestors', value: csp });
        }
      }

      return res.json({ canEmbed: true });
    } catch {
      return res.json({ canEmbed: false, reason: 'error_evaluating' });
    }
  });

  app.post('/api/textbooks/sync', (req: Request, res: Response) => {
    const { textbooks } = req.body;
    if (Array.isArray(textbooks) && textbooks.length > 0) {
      writeJSON(TEXTBOOKS_FILE, textbooks);
      console.log(`[API] Synced ${textbooks.length} textbooks to server storage.`);
      return res.json({ success: true, count: textbooks.length });
    }
    return res.status(400).json({ error: 'Danh sách sách không hợp lệ.' });
  });

  app.post('/api/textbooks', (req: Request, res: Response) => {
    const body = req.body;
    if (!body || !body.title || !body.bookUrl) {
      return res.status(400).json({ error: 'Tên sách và Đường link SGK (URL) là bắt buộc.' });
    }

    const rawUrl = String(body.bookUrl).trim();
    if (!isValidHttpUrl(rawUrl)) {
      return res.status(400).json({ error: 'Đường link SGK không hợp lệ. URL phải bắt đầu bằng http:// hoặc https://.' });
    }

    const books = readJSON<any[]>(TEXTBOOKS_FILE, INITIAL_TEXTBOOKS);
    const targetId = body.id ? String(body.id) : '';
    const existingIndex = books.findIndex(
      (b: any) =>
        (targetId && b.id === targetId) ||
        (Number(b.grade) === Number(body.grade) &&
          b.subjectId === body.subjectId &&
          String(b.title).trim().toLowerCase() === String(body.title).trim().toLowerCase())
    );

    if (existingIndex !== -1) {
      const updatedBook = {
        ...books[existingIndex],
        ...body,
        id: books[existingIndex].id,
        grade: Number(body.grade) || books[existingIndex].grade,
        title: String(body.title).trim(),
        bookUrl: rawUrl,
        updatedAt: new Date().toISOString()
      };
      books[existingIndex] = updatedBook;
      writeJSON(TEXTBOOKS_FILE, books);
      return res.status(200).json(updatedBook);
    }

    const newBook = {
      id: body.id || `sgk-${body.subjectId || 'mon'}-${body.grade || 6}-${Date.now().toString(36)}`,
      grade: Number(body.grade) || 6,
      subjectId: body.subjectId || 'tin-hoc',
      subjectName: body.subjectName || '',
      bookSet: body.bookSet || 'Kết nối tri thức với cuộc sống',
      title: String(body.title).trim(),
      bookUrl: rawUrl,
      embedUrl: body.embedUrl ? String(body.embedUrl).trim() : undefined,
      coverUrl: body.coverUrl ? String(body.coverUrl).trim() : '',
      description: body.description ? String(body.description).trim() : '',
      status: body.status === 'hidden' ? 'hidden' : 'published',
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: body.createdBy || 'Giáo viên'
    };

    books.unshift(newBook);
    writeJSON(TEXTBOOKS_FILE, books);
    return res.status(201).json(newBook);
  });

  app.put('/api/textbooks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const books = readJSON<any[]>(TEXTBOOKS_FILE, INITIAL_TEXTBOOKS);
    const index = books.findIndex((b: any) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Không tìm thấy sách giáo khoa với mã yêu cầu.' });
    }

    const rawUrl = body.bookUrl ? String(body.bookUrl).trim() : books[index].bookUrl;
    if (!isValidHttpUrl(rawUrl)) {
      return res.status(400).json({ error: 'Đường link SGK không hợp lệ. URL phải bắt đầu bằng http:// hoặc https://.' });
    }

    const updatedBook = {
      ...books[index],
      ...body,
      id: books[index].id,
      bookUrl: rawUrl,
      updatedAt: new Date().toISOString()
    };

    books[index] = updatedBook;
    writeJSON(TEXTBOOKS_FILE, books);
    return res.json(updatedBook);
  });

  app.patch('/api/textbooks/:id/status', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const books = readJSON<any[]>(TEXTBOOKS_FILE, INITIAL_TEXTBOOKS);
    const index = books.findIndex((b: any) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Không tìm thấy sách giáo khoa.' });
    }

    const newStatus = status === 'published' ? 'published' : 'hidden';
    books[index].status = newStatus;
    books[index].updatedAt = new Date().toISOString();
    writeJSON(TEXTBOOKS_FILE, books);
    return res.json({ id, status: newStatus });
  });

  app.delete('/api/textbooks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const books = readJSON<any[]>(TEXTBOOKS_FILE, INITIAL_TEXTBOOKS);
    const filtered = books.filter((b: any) => b.id !== id);
    if (filtered.length === books.length) {
      return res.status(404).json({ error: 'Không tìm thấy sách giáo khoa cần xóa.' });
    }
    writeJSON(TEXTBOOKS_FILE, filtered);
    return res.json({ success: true, id });
  });

  // ---------------------------------------------------------------------------
  // VITE DEV SERVER / STATIC ASSETS
  // ---------------------------------------------------------------------------
  const isProd = process.env.NODE_ENV === 'production';
  const distPath = path.resolve(__dirname, 'dist');

  if (!isProd || !fs.existsSync(distPath)) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀  Realtime & HTTP Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});

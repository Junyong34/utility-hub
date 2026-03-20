export type LastDigitGameUserStatus = 'waiting' | 'playing' | 'done';

export type LastDigitGamePhase =
  | 'idle'
  | 'readyToFirstStop'
  | 'readyToSecondStart'
  | 'readyToNext'
  | 'finished'
  | 'result';

export interface LastDigitGameUser {
  id: number;
  name: string;
  color: string;
  label: string;
  times: string[];
  score: number;
  status: LastDigitGameUserStatus;
  finishedAt: number | null;
}

export interface LastDigitGameState {
  users: LastDigitGameUser[];
  currentUserIndex: number;
  isRunning: boolean;
  phase: LastDigitGamePhase;
}

export interface LastDigitGamePlayerProfile {
  name: string;
  color: string;
  label: string;
}

export interface RankedLastDigitGameUser extends LastDigitGameUser {
  rank: number;
}

export const MAX_LAST_DIGIT_GAME_PLAYERS = 15;
export const DEFAULT_LAST_DIGIT_GAME_PLAYERS = 5;

const KOREAN_NAME_POOL = [
  '가',
  '나',
  '다',
  '라',
  '마',
  '바',
  '사',
  '아',
  '자',
  '차',
  '카',
  '타',
  '파',
  '하',
  '가가',
  '나나',
];

const DEFAULT_LABELS = [
  '초록별',
  '별빛',
  '번개',
  '로켓',
  '드론',
  '바람',
  '오로라',
  '달빛',
  '은하',
  '유성',
  '스파크',
  '미니멀',
  '루미',
  '에코',
  '코어',
  '비전',
  '레드닷',
  '블루핀',
  '플레어',
  '제트',
  '썸머',
];

const DEFAULT_COLORS = [
  'from-fuchsia-500 to-violet-500',
  'from-emerald-500 to-teal-500',
  'from-cyan-500 to-blue-500',
  'from-rose-500 to-rose-600',
  'from-amber-500 to-orange-500',
  'from-indigo-500 to-sky-500',
  'from-lime-500 to-emerald-500',
  'from-purple-500 to-fuchsia-500',
  'from-blue-500 to-cyan-500',
  'from-orange-500 to-red-500',
  'from-teal-500 to-cyan-500',
  'from-sky-500 to-blue-500',
  'from-violet-500 to-indigo-500',
  'from-red-500 to-pink-500',
  'from-green-500 to-lime-500',
  'from-cyan-500 to-violet-500',
  'from-blue-500 to-indigo-500',
  'from-pink-500 to-rose-500',
  'from-emerald-500 to-cyan-500',
  'from-orange-400 to-amber-500',
];

function clampPlayerCount(count: number): number {
  const parsed = Number.isFinite(count) ? Math.floor(count) : DEFAULT_LAST_DIGIT_GAME_PLAYERS;
  return Math.min(MAX_LAST_DIGIT_GAME_PLAYERS, Math.max(1, parsed));
}

export function formatStopwatchTime(milliseconds: number): string {
  const ms = Math.max(0, Math.floor(milliseconds));
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((ms % 1000) / 10);

  const pad = (value: number): string => value.toString().padStart(2, '0');

  return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
}

export function parseSecondDigit(formattedTime: string): number {
  const parts = formattedTime.trim().split(':');
  if (parts.length < 2) return 0;
  const secondPart = parts[1]?.trim() ?? '';
  if (!secondPart || secondPart.length === 0) return 0;

  const secondValue = Number(secondPart);
  if (Number.isNaN(secondValue)) return 0;

  return secondValue % 10;
}

export function calculateScore(firstTime: string, secondTime: string): number {
  const firstDigit = parseSecondDigit(firstTime);
  const secondDigit = parseSecondDigit(secondTime);
  return firstDigit * secondDigit;
}

function getComputedScore(user: LastDigitGameUser): number {
  if (
    user.status === 'done' &&
    user.times.length >= 2 &&
    user.times[0] &&
    user.times[1]
  ) {
    return calculateScore(user.times[0], user.times[1]);
  }

  return user.score;
}

export function createPlayerProfiles(
  count: number
): LastDigitGamePlayerProfile[] {
  const playerCount = clampPlayerCount(count);
  const names = KOREAN_NAME_POOL.slice(0, playerCount);
  const labels = DEFAULT_LABELS;
  const colors = DEFAULT_COLORS;

  return Array.from({ length: playerCount }, (_, index) => ({
    name: names[index] ?? `플레이어 ${index + 1}`,
    color: colors[index % colors.length],
    label: labels[index % labels.length],
  }));
}

export function createGameUsers(
  count: number,
  profiles?: LastDigitGamePlayerProfile[]
): LastDigitGameUser[] {
  const normalizedCount = Math.floor(count);
  if (normalizedCount <= 0) {
    return [];
  }

  const playerCount = clampPlayerCount(normalizedCount);
  const preparedProfiles =
    profiles && profiles.length > 0
      ? [...profiles].slice(0, playerCount)
      : createPlayerProfiles(playerCount);

  return preparedProfiles.map((profile, index) => ({
    id: index + 1,
    name: profile.name,
    color: profile.color,
    label: profile.label,
    times: [],
    score: 0,
    status: 'waiting',
    finishedAt: null,
  }));
}

export function createInitialGameStateFromProfiles(
  profiles: LastDigitGamePlayerProfile[] | undefined
): LastDigitGameState {
  const users = createGameUsers(
    Math.max(0, profiles?.length ?? 0),
    profiles
  );

  return {
    users,
    currentUserIndex: 0,
    isRunning: false,
    phase: users.length > 0 ? 'idle' : 'finished',
  };
}

export function createInitialGameState(playerCount: number): LastDigitGameState {
  const users = createGameUsers(playerCount);
  return {
    users,
    currentUserIndex: 0,
    isRunning: false,
    phase: users.length > 0 ? 'idle' : 'finished',
  };
}

export function canStart(state: LastDigitGameState): boolean {
  if (state.isRunning) return false;
  if (state.phase === 'finished' || state.phase === 'result') return false;
  if (!state.users.length) return false;

  return [
    'idle',
    'readyToFirstStop',
    'readyToSecondStart',
    'readyToNext',
  ].includes(state.phase);
}

export function canStop(state: LastDigitGameState): boolean {
  return (
    state.isRunning &&
    ['readyToFirstStop', 'readyToSecondStart'].includes(state.phase) &&
    !!state.users[state.currentUserIndex]
  );
}

export function getTopDoneUserId(users: LastDigitGameUser[]): number | null {
  const ranked = calculateRankedUsers(users).find(
    (user) => user.status === 'done'
  );
  return ranked?.id ?? null;
}

export function calculateRankedUsers(
  users: LastDigitGameUser[]
): RankedLastDigitGameUser[] {
  const sorted = [...users].sort((left, right) => {
    const leftScore = getComputedScore(left);
    const rightScore = getComputedScore(right);

    if (left.status === 'done' && right.status !== 'done') return -1;
    if (left.status !== 'done' && right.status === 'done') return 1;

    if (left.status === 'done' && right.status === 'done') {
      if (leftScore !== rightScore) {
        return rightScore - leftScore;
      }
      if (left.finishedAt !== null && right.finishedAt !== null) {
        return left.finishedAt - right.finishedAt;
      }
    }

    return left.id - right.id;
  });

  return sorted.map((user, index) => ({
    ...user,
    score: getComputedScore(user),
    rank: index + 1,
  }));
}

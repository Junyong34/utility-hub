/**
 * 로또 추천 서비스 Phase 0(설계 고정) 스펙
 * - 1차 릴리즈 모드 범위
 * - URL 쿼리 규칙
 * - 모바일/데스크탑 레이아웃 기준
 */

export const LOTTO_PHASE1_MODES = ['random', 'stats', 'date', 'mbti'] as const;
export type LottoPhase1Mode = (typeof LOTTO_PHASE1_MODES)[number];

/** 현재 지원되는 추천 모드(쿼리 값 검증 + 모드 스위치에 공통 사용) */
export const LOTTO_RECOMMEND_MODES = [
  'random',
  'stats',
  'date',
  'mbti',
  'lucky',
  'slot',
] as const;
export type LottoRecommendMode = (typeof LOTTO_RECOMMEND_MODES)[number];

/** MBTI 추천 모드에서 프로필을 선택할 때 사용하는 타입 목록 */
export const LOTTO_MBTI_OPTIONS = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
] as const;
export type LottoMbtiType = (typeof LOTTO_MBTI_OPTIONS)[number];

/** URL/사용자 입력에서 허용하는 게임 생성 개수 */
export const LOTTO_RECOMMEND_COUNT_OPTIONS = [1, 2, 3, 4, 5] as const;
export type LottoRecommendCount =
  (typeof LOTTO_RECOMMEND_COUNT_OPTIONS)[number];

export const LOTTO_RECOMMEND_QUERY_KEYS = {
  mode: 'mode',
  count: 'count',
  numbers: 'numbers',
} as const;

/** URL 쿼리 기본값 (값이 비거나 유효하지 않을 때 fallback) */
export const LOTTO_RECOMMEND_DEFAULTS = {
  mode: 'random' as LottoRecommendMode,
  count: 5 as LottoRecommendCount,
} as const;

export const LOTTO_RECOMMEND_LAYOUT_SPEC = {
  desktop: {
    gridColumns: 12,
    mainColumnSpan: 8,
    sideColumnSpan: 4,
  },
  mobile: {
    gridColumns: 1,
    useBottomFixedAction: true,
  },
} as const;

const LOTTO_QUERY_GAME_SEPARATOR = '|';

interface RecommendQueryInput {
  mode?: string | null;
  count?: string | null;
  numbers?: string | null;
}

/** URL → 내부 상태 정규화의 결과 타입 */
export interface LottoRecommendQueryState {
  mode: LottoRecommendMode;
  count: LottoRecommendCount;
  numbers: number[][] | null;
}

const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;
const LOTTO_NUMBERS_PER_GAME = 6;
const LOTTO_MAX_GAMES_PER_SHARE = LOTTO_RECOMMEND_COUNT_OPTIONS.length;

export function isLottoPhase1Mode(value: string): value is LottoPhase1Mode {
  return LOTTO_RECOMMEND_MODES.includes(value as LottoPhase1Mode);
}

/** URL에 들어온 mode 문자열이 허용 목록인지 검사 */
export function isLottoRecommendMode(
  value: string
): value is LottoRecommendMode {
  return LOTTO_RECOMMEND_MODES.includes(value as LottoRecommendMode);
}

export function parseLottoRecommendMode(
  value?: string | null
): LottoRecommendMode {
  if (!value) return LOTTO_RECOMMEND_DEFAULTS.mode;
  return isLottoRecommendMode(value) ? value : LOTTO_RECOMMEND_DEFAULTS.mode;
}

/** count 문자열을 정수로 파싱 후 허용 범위 여부를 검증 */
export function isLottoRecommendCount(
  value: number
): value is LottoRecommendCount {
  return LOTTO_RECOMMEND_COUNT_OPTIONS.includes(value as LottoRecommendCount);
}

export function parseLottoRecommendCount(
  value?: string | null
): LottoRecommendCount {
  if (!value) return LOTTO_RECOMMEND_DEFAULTS.count;

  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed)) return LOTTO_RECOMMEND_DEFAULTS.count;

  return isLottoRecommendCount(parsed)
    ? parsed
    : LOTTO_RECOMMEND_DEFAULTS.count;
}

/** 개별 게임 문자열(CSV: 6개 숫자)을 정렬·중복제거·범위 체크 후 파싱 */
export function parseLottoRecommendNumbers(
  value?: string | null
): number[] | null {
  if (!value) return null;

  const parts = value
    .split(',')
    .map(part => Number.parseInt(part.trim(), 10))
    .filter(part => Number.isInteger(part));

  if (parts.length !== LOTTO_NUMBERS_PER_GAME) return null;

  const unique = Array.from(new Set(parts));
  if (unique.length !== LOTTO_NUMBERS_PER_GAME) return null;

  const inRange = unique.every(
    num => num >= LOTTO_MIN_NUMBER && num <= LOTTO_MAX_NUMBER
  );
  if (!inRange) return null;

  return unique.sort((a, b) => a - b);
}

/** 개별 게임 배열을 CSV 문자열로 직렬화 */
export function formatLottoRecommendNumbersForQuery(
  numbers: number[]
): string | null {
  if (numbers.length !== LOTTO_NUMBERS_PER_GAME) return null;

  const unique = Array.from(new Set(numbers));
  if (unique.length !== LOTTO_NUMBERS_PER_GAME) return null;

  const inRange = unique.every(
    num => num >= LOTTO_MIN_NUMBER && num <= LOTTO_MAX_NUMBER
  );
  if (!inRange) return null;

  return [...unique].sort((a, b) => a - b).join(',');
}

/** 여러 게임을 파이프(`|`) 구분 문자열에서 게임 배열로 파싱 */
export function parseLottoRecommendGames(
  value?: string | null
): number[][] | null {
  if (!value) return null;

  const rawGames = value
    .split(LOTTO_QUERY_GAME_SEPARATOR)
    .map(game => game.trim())
    .filter(game => game.length > 0);

  if (rawGames.length === 0 || rawGames.length > LOTTO_MAX_GAMES_PER_SHARE) {
    return null;
  }

  const parsedGames: number[][] = [];

  for (const rawGame of rawGames) {
    const parsed = parseLottoRecommendNumbers(rawGame);
    if (!parsed) return null;
    parsedGames.push(parsed);
  }

  return parsedGames;
}

/** 여러 게임 배열을 파이프(`|`) 구분 문자열로 직렬화 */
export function formatLottoRecommendGamesForQuery(
  games: number[][]
): string | null {
  if (games.length === 0 || games.length > LOTTO_MAX_GAMES_PER_SHARE) {
    return null;
  }

  const serializedGames: string[] = [];

  for (const game of games) {
    const serialized = formatLottoRecommendNumbersForQuery(game);
    if (!serialized) return null;
    serializedGames.push(serialized);
  }

  return serializedGames.join(LOTTO_QUERY_GAME_SEPARATOR);
}

/** URL 쿼리 객체 전체를 내부 상태형으로 한 번에 변환 */
export function parseLottoRecommendQuery(
  input: RecommendQueryInput
): LottoRecommendQueryState {
  return {
    mode: parseLottoRecommendMode(input.mode),
    count: parseLottoRecommendCount(input.count),
    numbers: parseLottoRecommendGames(input.numbers),
  };
}

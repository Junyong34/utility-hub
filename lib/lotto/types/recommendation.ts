export const LOTTO_PHASE1_MODES = ['random', 'stats', 'date', 'mbti'] as const;
export type LottoPhase1Mode = (typeof LOTTO_PHASE1_MODES)[number];

export const LOTTO_RECOMMEND_MODES = [
  'random',
  'stats',
  'date',
  'mbti',
  'lucky',
  'slot',
] as const;
export type LottoRecommendMode = (typeof LOTTO_RECOMMEND_MODES)[number];

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

export const LOTTO_RECOMMEND_COUNT_OPTIONS = [1, 2, 3, 4, 5] as const;
export type LottoRecommendCount =
  (typeof LOTTO_RECOMMEND_COUNT_OPTIONS)[number];

export const LOTTO_RECOMMEND_QUERY_KEYS = {
  mode: 'mode',
  count: 'count',
  numbers: 'numbers',
} as const;

export const LOTTO_RECOMMEND_DEFAULTS = {
  mode: 'stats' as LottoRecommendMode,
  count: 5 as LottoRecommendCount,
} as const;

export interface LottoRecommendQueryState {
  mode: LottoRecommendMode;
  count: LottoRecommendCount;
  numbers: number[][] | null;
}

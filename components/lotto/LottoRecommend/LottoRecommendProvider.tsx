'use client';

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createParser, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { LottoHistory } from '@/hooks/useLotto';
import { useLotto } from '@/hooks/useLotto';
import {
  formatLottoNumbers,
  generateLottoGames,
  generateLottoNumbers,
  generateLottoNumbersFromSeed,
  generateLottoNumbersWithLucky,
  generateStatsBasedLottoNumbers,
  LottoStatsStrategy,
  validateLottoNumbers,
} from '@/lib/lotto/generator';
import {
  LOTTO_MBTI_OPTIONS,
  LOTTO_RECOMMEND_DEFAULTS,
  LOTTO_RECOMMEND_MODES,
  LOTTO_RECOMMEND_QUERY_KEYS,
  LottoMbtiType,
  LottoRecommendCount,
  LottoRecommendMode,
  formatLottoRecommendGamesForQuery,
  parseLottoRecommendGames,
  isLottoRecommendMode,
  isLottoRecommendCount,
} from '@/lib/lotto/recommendation-spec';
import { copyTextToClipboard } from '@/lib/clipboard';

export const LOTTO_STATS_STRATEGIES: LottoStatsStrategy[] = [
  'mix',
  'hot',
  'cold',
];

interface LottoRecommendState {
  mode: LottoRecommendMode;
  count: LottoRecommendCount;
  statsStrategy: LottoStatsStrategy;
  recommendDate: string;
  mbti: LottoMbtiType;
  luckyNumber: number;
  currentGames: number[][];
  history: LottoHistory[];
  isGenerating: boolean;
}

interface LottoRecommendActions {
  setMode: (mode: LottoRecommendMode) => void;
  setCount: (count: LottoRecommendCount) => void;
  setStatsStrategy: (strategy: LottoStatsStrategy) => void;
  setRecommendDate: (value: string) => void;
  setMbti: (value: LottoMbtiType) => void;
  setLuckyNumber: (value: number) => void;
  generate: () => void;
  save: () => void;
  clearCurrent: () => void;
  clearHistory: () => void;
  removeHistory: (id: string) => void;
  copyNumbers: (numbers: number[]) => Promise<boolean>;
  copyShareUrl: (numbers?: number[]) => Promise<boolean>;
}

interface LottoRecommendMeta {
  shareUrl: string;
  weeklyNumbers: number[];
}

interface LottoRecommendContextValue {
  state: LottoRecommendState;
  actions: LottoRecommendActions;
  meta: LottoRecommendMeta;
}

interface WeeklyPickPayload {
  weekKey: string;
  numbers: number[];
}

type PendingGamesQuerySync =
  | { kind: 'idle' }
  | { kind: 'set'; games: number[][] };

const WEEKLY_PICK_STORAGE_KEY = 'lotto-weekly-pick';
const DEFAULT_SHARE_PATH = '/tools/lotto';
const SINGLE_GAME_COUNT: LottoRecommendCount = 1;

const LottoRecommendContext = createContext<LottoRecommendContextValue | null>(
  null
);

function formatDateKeyFromLocal(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getCurrentDateInputValue(): string {
  return formatDateKeyFromLocal(new Date());
}

function getWeekKey(date: Date): string {
  const weekStart = new Date(date);
  const day = weekStart.getDay();
  const diffToMonday = (day + 6) % 7;

  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(weekStart.getDate() - diffToMonday);

  const year = weekStart.getFullYear();
  const month = String(weekStart.getMonth() + 1).padStart(2, '0');
  const dayOfMonth = String(weekStart.getDate()).padStart(2, '0');
  return `${year}-${month}-${dayOfMonth}`;
}

function areLottoGamesEqual(a: number[][], b: number[][]): boolean {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    const left = a[i];
    const right = b[i];

    if (!right || left.length !== right.length) return false;

    for (let j = 0; j < left.length; j++) {
      if (left[j] !== right[j]) return false;
    }
  }

  return true;
}

function getShareUrl(
  mode: LottoRecommendMode,
  count: LottoRecommendCount,
  games?: number[][]
): string {
  const params = new URLSearchParams({
    [LOTTO_RECOMMEND_QUERY_KEYS.mode]: mode,
    [LOTTO_RECOMMEND_QUERY_KEYS.count]: String(count),
  });

  if (games && games.length > 0) {
    const formatted = formatLottoRecommendGamesForQuery(games);
    if (formatted) {
      params.set(LOTTO_RECOMMEND_QUERY_KEYS.numbers, formatted);
    }
  }

  const queryString = params.toString();
  const pathWithQuery = queryString
    ? `${DEFAULT_SHARE_PATH}?${queryString}`
    : DEFAULT_SHARE_PATH;

  if (typeof window === 'undefined') return pathWithQuery;
  return `${window.location.origin}${pathWithQuery}`;
}

function resolveWeeklyNumbers(): number[] {
  const generated = generateLottoNumbers();
  if (typeof window === 'undefined') {
    return generated;
  }

  const currentWeekKey = getWeekKey(new Date());

  try {
    const stored = window.localStorage.getItem(WEEKLY_PICK_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as WeeklyPickPayload;
      if (
        parsed.weekKey === currentWeekKey &&
        validateLottoNumbers(parsed.numbers)
      ) {
        return parsed.numbers;
      }
    }
  } catch {
    // ignore localStorage parse errors
  }

  const payload: WeeklyPickPayload = {
    weekKey: currentWeekKey,
    numbers: generated,
  };

  try {
    window.localStorage.setItem(
      WEEKLY_PICK_STORAGE_KEY,
      JSON.stringify(payload)
    );
  } catch {
    // ignore localStorage write errors
  }

  return generated;
}

function normalizeLottoNumber(value: number): number {
  if (!Number.isFinite(value)) return 1;
  const rounded = Math.round(value);
  if (rounded < 1) return 1;
  if (rounded > 45) return 45;
  return rounded;
}

function isLottoStatsStrategy(value: string): value is LottoStatsStrategy {
  return LOTTO_STATS_STRATEGIES.includes(value as LottoStatsStrategy);
}

function isLottoMbtiType(value: string): value is LottoMbtiType {
  return LOTTO_MBTI_OPTIONS.includes(value as LottoMbtiType);
}

const lottoCountQueryParser = createParser<LottoRecommendCount>({
  parse: (value) => {
    const parsed = Number.parseInt(value, 10);
    return isLottoRecommendCount(parsed) ? parsed : null;
  },
  serialize: (value) => String(value),
});

const lottoGamesQueryParser = createParser<number[][]>({
  parse: (value) => parseLottoRecommendGames(value),
  serialize: (value) => formatLottoRecommendGamesForQuery(value) ?? '',
  eq: (a, b) => areLottoGamesEqual(a, b),
});

const LOTTO_QUERY_PARSERS = {
  mode: parseAsStringLiteral(LOTTO_RECOMMEND_MODES).withDefault(
    LOTTO_RECOMMEND_DEFAULTS.mode
  ),
  count: lottoCountQueryParser.withDefault(LOTTO_RECOMMEND_DEFAULTS.count),
  numbers: lottoGamesQueryParser,
} as const;

export function LottoRecommendProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ mode, count, numbers: numbersInQuery }, setQueryState] =
    useQueryStates(LOTTO_QUERY_PARSERS);
  const [statsStrategy, setStatsStrategyState] =
    useState<LottoStatsStrategy>('mix');
  const [recommendDate, setRecommendDateState] = useState<string>(
    getCurrentDateInputValue
  );
  const [mbti, setMbtiState] = useState<LottoMbtiType>('INTJ');
  const [luckyNumber, setLuckyNumberState] = useState<number>(7);
  const [weeklyNumbers] = useState<number[]>(() => resolveWeeklyNumbers());
  const pendingGamesQuerySyncRef = useRef<PendingGamesQuerySync>({
    kind: 'idle',
  });

  const {
    currentGames,
    history,
    isGenerating,
    generateFromGames,
    saveToHistory,
    loadHistory,
    deleteFromHistory,
    clearCurrent: clearCurrentGames,
    clearHistory,
  } = useLotto();

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  useEffect(() => {
    if (!numbersInQuery || numbersInQuery.length === 0) return;

    const pending = pendingGamesQuerySyncRef.current;
    if (
      pending.kind === 'set' &&
      areLottoGamesEqual(pending.games, numbersInQuery)
    ) {
      pendingGamesQuerySyncRef.current = { kind: 'idle' };
      return;
    }

    pendingGamesQuerySyncRef.current = { kind: 'idle' };

    if (areLottoGamesEqual(currentGames, numbersInQuery)) return;
    generateFromGames(numbersInQuery, 0);
  }, [currentGames, generateFromGames, numbersInQuery]);

  const setMode = useCallback(
    (nextMode: LottoRecommendMode) => {
      if (!isLottoRecommendMode(nextMode)) return;
      void setQueryState({ mode: nextMode });
    },
    [setQueryState]
  );

  const setCount = useCallback(
    (nextCount: LottoRecommendCount) => {
      if (!isLottoRecommendCount(nextCount)) return;
      void setQueryState({ count: nextCount });
    },
    [setQueryState]
  );

  const setStatsStrategy = useCallback((strategy: LottoStatsStrategy) => {
    if (!isLottoStatsStrategy(strategy)) return;
    setStatsStrategyState(strategy);
  }, []);

  const setRecommendDate = useCallback((value: string) => {
    if (!value) return;
    setRecommendDateState(value);
  }, []);

  const setMbti = useCallback((value: LottoMbtiType) => {
    if (!isLottoMbtiType(value)) return;
    setMbtiState(value);
  }, []);

  const setLuckyNumber = useCallback((value: number) => {
    setLuckyNumberState(normalizeLottoNumber(value));
  }, []);

  const setNumbersInQuery = useCallback(
    (games: number[][] | null) => {
      if (games && games.length > 0) {
        pendingGamesQuerySyncRef.current = {
          kind: 'set',
          games: games.map((game) => [...game]),
        };
      } else {
        pendingGamesQuerySyncRef.current = { kind: 'idle' };
      }

      void setQueryState({ numbers: games });
    },
    [setQueryState]
  );

  const clearCurrent = useCallback(() => {
    clearCurrentGames();
    setNumbersInQuery(null);
  }, [clearCurrentGames, setNumbersInQuery]);

  const buildGamesByMode = useCallback((): number[][] => {
    const localDateKey = formatDateKeyFromLocal(new Date());

    switch (mode) {
      case 'stats':
        return generateLottoGames(count, () =>
          generateStatsBasedLottoNumbers(statsStrategy)
        );
      case 'date':
        return generateLottoGames(count, (index) =>
          generateLottoNumbersFromSeed(`${recommendDate}:${index + 1}`)
        );
      case 'mbti':
        return generateLottoGames(count, (index) =>
          generateLottoNumbersFromSeed(`${mbti}:${localDateKey}:${index + 1}`)
        );
      case 'lucky':
        return generateLottoGames(count, () =>
          generateLottoNumbersWithLucky(luckyNumber)
        );
      case 'slot':
        return generateLottoGames(count, () => generateLottoNumbers());
      case 'random':
      default:
        return generateLottoGames(count, () => generateLottoNumbers());
    }
  }, [count, luckyNumber, mbti, mode, recommendDate, statsStrategy]);

  const generate = useCallback(() => {
    if (!isLottoRecommendCount(count)) return;
    const games = buildGamesByMode();
    const delayMs = mode === 'slot' ? 1500 : 300;
    generateFromGames(games, delayMs);
    setNumbersInQuery(games);
  }, [buildGamesByMode, count, generateFromGames, mode, setNumbersInQuery]);

  const copyNumbers = useCallback(async (numbers: number[]) => {
    return copyTextToClipboard(formatLottoNumbers(numbers));
  }, []);

  const copyShareUrl = useCallback(
    async (numbers?: number[]) => {
      let shareCount = count;
      let targetGames: number[][] | undefined;

      if (numbers && validateLottoNumbers(numbers)) {
        shareCount = SINGLE_GAME_COUNT;
        targetGames = [numbers];
      } else if (currentGames.length > 0) {
        targetGames = currentGames;
      }

      const shareUrl = getShareUrl(mode, shareCount, targetGames);
      return copyTextToClipboard(shareUrl);
    },
    [count, currentGames, mode]
  );

  const shareUrl = useMemo(() => {
    return getShareUrl(mode, count, currentGames);
  }, [count, currentGames, mode]);

  const value = useMemo<LottoRecommendContextValue>(
    () => ({
      state: {
        mode,
        count,
        statsStrategy,
        recommendDate,
        mbti,
        luckyNumber,
        currentGames,
        history,
        isGenerating,
      },
      actions: {
        setMode,
        setCount,
        setStatsStrategy,
        setRecommendDate,
        setMbti,
        setLuckyNumber,
        generate,
        save: saveToHistory,
        clearCurrent,
        clearHistory,
        removeHistory: deleteFromHistory,
        copyNumbers,
        copyShareUrl,
      },
      meta: {
        shareUrl,
        weeklyNumbers,
      },
    }),
    [
      clearCurrent,
      clearHistory,
      copyNumbers,
      copyShareUrl,
      count,
      currentGames,
      deleteFromHistory,
      generate,
      history,
      isGenerating,
      luckyNumber,
      mbti,
      mode,
      recommendDate,
      saveToHistory,
      setCount,
      setLuckyNumber,
      setMode,
      setMbti,
      setRecommendDate,
      setStatsStrategy,
      shareUrl,
      statsStrategy,
      weeklyNumbers,
    ]
  );

  return (
    <LottoRecommendContext value={value}>{children}</LottoRecommendContext>
  );
}

export function useLottoRecommend() {
  const context = use(LottoRecommendContext);
  if (!context) {
    throw new Error(
      'useLottoRecommend must be used within LottoRecommendProvider'
    );
  }
  return context;
}

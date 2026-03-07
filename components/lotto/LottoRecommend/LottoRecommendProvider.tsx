/**
 * 로또 추천 상태 관리 Provider
 *
 * @description
 * 로또 번호 추천 기능의 전역 상태를 관리하는 Context Provider입니다.
 * 6가지 추천 모드, 번호 생성, 분석 애니메이션, 공유 URL 등을 통합 관리합니다.
 *
 * @remarks
 * - URL Query String과 동기화하여 상태 영속성 보장
 * - 주간 추천 번호를 LocalStorage에 저장
 * - 분석 진행 상황을 시각적으로 표시 (프로그레스 바 + 단계별 메시지)
 * - Compound Component Pattern으로 설계됨
 *
 * @module LottoRecommendProvider
 */
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
import { useLotto } from '@/hooks/useLotto';
import {
  formatLottoNumbers,
  generateLottoGames,
  generateLottoNumbers,
  generateLottoNumbersFromSeed,
  generateLottoNumbersWithLucky,
  generateStatsBasedLottoNumbers,
  getStatsStrategyDescription,
  validateLottoNumbers,
} from '@/lib/lotto/generator';
import {
  LOTTO_MBTI_OPTIONS,
  LOTTO_STATS_STRATEGIES,
  LOTTO_RECOMMEND_DEFAULTS,
  LOTTO_RECOMMEND_MODES,
  LOTTO_RECOMMEND_QUERY_KEYS,
  type LottoMbtiType,
  type LottoRecommendCount,
  type LottoRecommendMode,
  type LottoStatsStrategy,
} from '@/lib/lotto/types';
import {
  formatLottoRecommendGamesForQuery,
  parseLottoRecommendGames,
  isLottoRecommendMode,
  isLottoRecommendCount,
} from '@/lib/lotto/recommendation-spec';
import { copyTextToClipboard } from '@/lib/clipboard';

/**
 * 로또 추천 상태 인터페이스
 *
 * @interface
 * @description Provider가 관리하는 모든 상태값을 정의합니다.
 */
interface LottoRecommendState {
  /** 현재 선택된 추천 모드 (random, stats, date, mbti, lucky, slot) */
  mode: LottoRecommendMode;
  /** 생성할 게임 수 (1-5) */
  count: LottoRecommendCount;
  statsStrategy: LottoStatsStrategy;
  recommendDate: string;
  mbti: LottoMbtiType;
  luckyNumber: number;
  currentGames: number[][];
  isGenerating: boolean;
  analysisStages: string[];
  analysisStage: string;
  analysisStepIndex: number;
  analysisProgress: number;
  resultSheetOpen: boolean;
  selectedRecommendationLabel: string;
  selectedRecommendationDetail: string;
}

/**
 * 로또 추천 액션 인터페이스
 *
 * @interface
 * @description Provider가 제공하는 모든 액션 함수를 정의합니다.
 */
interface LottoRecommendActions {
  /** 추천 모드 변경 */
  setMode: (mode: LottoRecommendMode) => void;
  /** 생성 게임 수 변경 */
  setCount: (count: LottoRecommendCount) => void;
  setStatsStrategy: (strategy: LottoStatsStrategy) => void;
  setRecommendDate: (value: string) => void;
  setMbti: (value: LottoMbtiType) => void;
  setLuckyNumber: (value: number) => void;
  generate: () => void;
  clearCurrent: () => void;
  copyNumbers: (numbers: number[]) => Promise<boolean>;
  copyShareUrl: (numbers?: number[]) => Promise<boolean>;
  openResultSheet: () => void;
  closeResultSheet: () => void;
}

/**
 * 로또 추천 메타 정보
 *
 * @interface
 * @description 상태/액션 외 부가 정보를 정의합니다.
 */
interface LottoRecommendMeta {
  /** 현재 생성된 번호의 공유 URL */
  shareUrl: string;
  /** 이번 주 고정 추천 번호 (월요일 기준 갱신) */
  weeklyNumbers: number[];
}

/**
 * Context 값 타입
 *
 * @interface
 * @description useLottoRecommend 훅이 반환하는 값의 타입입니다.
 */
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
const ANALYSIS_DURATION_MS = 4500;
const ANALYSIS_PROGRESS_INTERVAL_MS = 100;
const MODE_LABELS: Record<LottoRecommendMode, string> = {
  random: '랜덤 추천',
  stats: '통계 추천',
  date: '날짜 추천',
  mbti: 'MBTI 추천',
  lucky: '행운 번호 추천',
  slot: '슬롯 머신 추천',
};
const STATS_STRATEGY_LABELS: Record<LottoStatsStrategy, string> = {
  ai: 'AI 가중',
  'high-frequency': '고빈도',
  'low-frequency': '저빈도',
  undrawn: '미출현',
  balanced: '균형',
  hot: '핫넘버',
  cold: '콜드넘버',
};

interface RecommendationSummary {
  label: string;
  detail: string;
}

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

/** 월 시작일(월요일 기준) 키를 만들기 위해 날짜를 정규화합니다. */
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

/** 공유용 URL을 만들 때 사용되는 쿼리값을 합성합니다. */
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

/** 주간 추천 번호를 로컬스토리지에서 불러오고, 없으면 생성해 저장합니다. */
function resolveWeeklyNumbers(): number[] {
  if (typeof window === 'undefined') {
    return [];
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

  const generated = generateLottoNumbers();
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

/** 사용자가 입력한 행운 번호를 1~45 범위 정수로 정규화합니다. */
function normalizeLottoNumber(value: number): number {
  if (!Number.isFinite(value)) return 1;
  const rounded = Math.round(value);
  if (rounded < 1) return 1;
  if (rounded > 45) return 45;
  return rounded;
}

/**
 * 현재 선택된 모드/옵션을 사람 읽기 쉬운 라벨로 변환해
 * 공유 카드/분석 메시지에서 재사용할 수 있게 요약합니다.
 */
function getRecommendationSummary(params: {
  mode: LottoRecommendMode;
  statsStrategy: LottoStatsStrategy;
  recommendDate: string;
  mbti: LottoMbtiType;
  luckyNumber: number;
}): RecommendationSummary {
  const { mode, statsStrategy, recommendDate, mbti, luckyNumber } = params;

  switch (mode) {
    case 'stats':
      return {
        label: MODE_LABELS.stats,
        detail: `${STATS_STRATEGY_LABELS[statsStrategy]} · ${getStatsStrategyDescription(statsStrategy)}`,
      };
    case 'date':
      return {
        label: MODE_LABELS.date,
        detail: `기준 날짜 ${recommendDate}`,
      };
    case 'mbti':
      return {
        label: MODE_LABELS.mbti,
        detail: `선택 유형 ${mbti}`,
      };
    case 'lucky':
      return {
        label: MODE_LABELS.lucky,
        detail: `행운 번호 ${luckyNumber}번`,
      };
    case 'slot':
      return {
        label: MODE_LABELS.slot,
        detail: '슬롯 릴 기반 확률 조합',
      };
    case 'random':
    default:
      return {
        label: MODE_LABELS.random,
        detail: '완전 랜덤 조합',
      };
  }
}

/** 분석 진행 단계 문구를 모드별로 동적으로 조합해 반환합니다. */
function buildAnalysisStages(
  summary: RecommendationSummary,
  params: {
    mode: LottoRecommendMode;
    statsStrategy: LottoStatsStrategy;
    recommendDate: string;
    mbti: LottoMbtiType;
    luckyNumber: number;
  }
): string[] {
  const { mode, statsStrategy, recommendDate, mbti, luckyNumber } = params;

  const modeSpecificStage =
    mode === 'stats'
      ? `${STATS_STRATEGY_LABELS[statsStrategy]} 통계 분포 적용중`
      : mode === 'date'
        ? `기준 날짜(${recommendDate}) 시드 확장중`
        : mode === 'mbti'
          ? `MBTI(${mbti}) 성향 패턴 반영중`
          : mode === 'lucky'
            ? `행운 번호(${luckyNumber}) 중심 조합 탐색중`
            : mode === 'slot'
              ? '슬롯 릴 패턴 샘플링중'
              : '무작위 시드 조합 탐색중';

  return [
    `선택 추천방식 확인중: ${summary.label}`,
    modeSpecificStage,
    'AI 활용 분석중',
    '수학적 알고리즘 적용중',
    '최종 번호 조합 검증중',
  ];
}

/** URL 쿼리 파서 타입 가드 */
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

/**
 * 로또 추천 Provider 컴포넌트
 *
 * @param props - children prop
 * @returns Context Provider
 *
 * @example
 * ```tsx
 * <LottoRecommendProvider>
 *   <LottoGenerator />
 * </LottoRecommendProvider>
 * ```
 */
export function LottoRecommendProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // URL 쿼리 동기화 상태 + 로컬 UI 상태를 분리해 관리
  const [{ mode, count, numbers: numbersInQuery }, setQueryState] =
    useQueryStates(LOTTO_QUERY_PARSERS);
  const [statsStrategy, setStatsStrategyState] =
    useState<LottoStatsStrategy>('ai');
  const [recommendDate, setRecommendDateState] = useState<string>(
    getCurrentDateInputValue
  );
  const [mbti, setMbtiState] = useState<LottoMbtiType>('INTJ');
  const [luckyNumber, setLuckyNumberState] = useState<number>(7);
  const [analysisStages, setAnalysisStages] = useState<string[]>([
    'AI 활용 분석중',
    '수학적 알고리즘 적용중',
    '최종 번호 조합 검증중',
  ]);
  const [analysisStage, setAnalysisStage] = useState<string>(analysisStages[0]);
  const [analysisStepIndex, setAnalysisStepIndex] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [resultSheetOpen, setResultSheetOpen] = useState(false);
  const initialRecommendation = getRecommendationSummary({
    mode,
    statsStrategy,
    recommendDate,
    mbti,
    luckyNumber,
  });
  const [selectedRecommendationLabel, setSelectedRecommendationLabel] =
    useState<string>(initialRecommendation.label);
  const [selectedRecommendationDetail, setSelectedRecommendationDetail] =
    useState<string>(initialRecommendation.detail);
  const [weeklyNumbers, setWeeklyNumbers] = useState<number[]>([]);
  const pendingGamesQuerySyncRef = useRef<PendingGamesQuerySync>({
    kind: 'idle',
  });
  const analysisProgressIntervalRef = useRef<number | null>(null);
  const analysisStepIntervalRef = useRef<number | null>(null);
  const analysisFinalizeTimeoutRef = useRef<number | null>(null);
  const analysisStartAtRef = useRef<number | null>(null);

  const {
    currentGames,
    isGenerating,
    generateFromGames,
    clearCurrent: clearCurrentGames,
  } = useLotto();

  // 진행 중인 타이머만 중앙 관리해 화면 전환/언마운트 시 정리합니다.
  const clearAnalysisTimers = useCallback(() => {
    if (analysisProgressIntervalRef.current !== null) {
      window.clearInterval(analysisProgressIntervalRef.current);
      analysisProgressIntervalRef.current = null;
    }
    if (analysisStepIntervalRef.current !== null) {
      window.clearInterval(analysisStepIntervalRef.current);
      analysisStepIntervalRef.current = null;
    }
    if (analysisFinalizeTimeoutRef.current !== null) {
      window.clearTimeout(analysisFinalizeTimeoutRef.current);
      analysisFinalizeTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearAnalysisTimers();
    };
  }, [clearAnalysisTimers]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setWeeklyNumbers(resolveWeeklyNumbers());
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

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
    setResultSheetOpen(false);
    const summary = getRecommendationSummary({
      mode,
      statsStrategy,
      recommendDate,
      mbti,
      luckyNumber,
    });
    setSelectedRecommendationLabel(summary.label);
    setSelectedRecommendationDetail(summary.detail);
  }, [
    clearCurrentGames,
    luckyNumber,
    mbti,
    mode,
    recommendDate,
    setNumbersInQuery,
    statsStrategy,
  ]);

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

  // 버튼 클릭 시 호출: 분석 단계 문자열/진행률/타이머를 먼저 세팅하고,
  // 마지막에 현재 모드로 게임을 생성해 상태로 반영합니다.
  const generate = useCallback(() => {
    if (!isLottoRecommendCount(count)) return;

    const summary = getRecommendationSummary({
      mode,
      statsStrategy,
      recommendDate,
      mbti,
      luckyNumber,
    });
    const analysisStepMessages = buildAnalysisStages(summary, {
      mode,
      statsStrategy,
      recommendDate,
      mbti,
      luckyNumber,
    });
    const stepIntervalMs = Math.max(
      600,
      Math.floor(ANALYSIS_DURATION_MS / analysisStepMessages.length)
    );

    clearAnalysisTimers();
    setAnalysisStages(analysisStepMessages);
    setSelectedRecommendationLabel(summary.label);
    setSelectedRecommendationDetail(summary.detail);
    setAnalysisStage(analysisStepMessages[0]);
    setAnalysisStepIndex(0);
    setAnalysisProgress(0);
    setResultSheetOpen(true);
    analysisStartAtRef.current = Date.now();

    analysisStepIntervalRef.current = window.setInterval(() => {
      setAnalysisStepIndex((prev) => {
        const next = Math.min(prev + 1, analysisStepMessages.length - 1);
        setAnalysisStage(analysisStepMessages[next]);
        return next;
      });
    }, stepIntervalMs);

    analysisProgressIntervalRef.current = window.setInterval(() => {
      const startedAt = analysisStartAtRef.current ?? Date.now();
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min(
        100,
        Math.round((elapsed / ANALYSIS_DURATION_MS) * 100)
      );
      setAnalysisProgress(nextProgress);
    }, ANALYSIS_PROGRESS_INTERVAL_MS);

    const games = buildGamesByMode();
    const delayMs = ANALYSIS_DURATION_MS;
    generateFromGames(games, delayMs);
    setNumbersInQuery(games);
    analysisFinalizeTimeoutRef.current = window.setTimeout(() => {
      clearAnalysisTimers();
      const lastStepIndex = analysisStepMessages.length - 1;
      setAnalysisProgress(100);
      setAnalysisStepIndex(lastStepIndex);
      setAnalysisStage(analysisStepMessages[lastStepIndex]);
      setResultSheetOpen(true);
    }, ANALYSIS_DURATION_MS);
  }, [
    buildGamesByMode,
    clearAnalysisTimers,
    count,
    generateFromGames,
    luckyNumber,
    mbti,
    mode,
    recommendDate,
    setNumbersInQuery,
    statsStrategy,
  ]);

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

  const openResultSheet = useCallback(() => {
    setResultSheetOpen(true);
  }, []);

  const closeResultSheet = useCallback(() => {
    setResultSheetOpen(false);
  }, []);

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
        isGenerating,
        analysisStages,
        analysisStage,
        analysisStepIndex,
        analysisProgress,
        resultSheetOpen,
        selectedRecommendationLabel,
        selectedRecommendationDetail,
      },
      actions: {
        setMode,
        setCount,
        setStatsStrategy,
        setRecommendDate,
        setMbti,
        setLuckyNumber,
        generate,
        clearCurrent,
        copyNumbers,
        copyShareUrl,
        openResultSheet,
        closeResultSheet,
      },
      meta: {
        shareUrl,
        weeklyNumbers,
      },
    }),
    [
      clearCurrent,
      copyNumbers,
      copyShareUrl,
      openResultSheet,
      closeResultSheet,
      count,
      currentGames,
      generate,
      isGenerating,
      analysisStages,
      analysisStage,
      analysisStepIndex,
      analysisProgress,
      resultSheetOpen,
      selectedRecommendationLabel,
      selectedRecommendationDetail,
      luckyNumber,
      mbti,
      mode,
      recommendDate,
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

/**
 * 로또 추천 Context Hook
 *
 * @returns 로또 추천 상태, 액션, 메타 정보
 * @throws LottoRecommendProvider 외부에서 사용 시 에러 발생
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { state, actions, meta } = useLottoRecommend();
 *   return <button onClick={actions.generate}>번호 생성</button>;
 * }
 * ```
 */
export function useLottoRecommend() {
  const context = use(LottoRecommendContext);
  if (!context) {
    throw new Error(
      'useLottoRecommend must be used within LottoRecommendProvider'
    );
  }
  return context;
}

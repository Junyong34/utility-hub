/**
 * 로또 번호 생성 유틸리티
 * - 공통 생성/검증 인터페이스
 * - 알고리즘 모듈 래퍼 (AI 통계, 확률통계 전략)
 */

import {
  generateAIStatisticalNumbers,
} from './algorithms/ai-statistical-recommendation';
import {
  generateNumbersByStrategy,
  getStrategyDescription,
} from './algorithms/probability-statistical-recommendation';
import { analyzeLottoStatistics, getRecentStatistics } from './algorithms/statistics-analyzer';
import {
  type AIRecommendationConfig,
  type LottoGameSet,
  type LottoNumbers,
  type LottoStatsStrategy,
  type LottoStatsSummary,
  type ProbabilityStrategy,
  type StrategyConfig,
} from './types';

export { LOTTO_STATS_STRATEGIES } from './types';
export type {
  AIRecommendationConfig,
  LottoGameSet,
  LottoNumbers,
  LottoStatsStrategy,
  LottoStatsSummary,
  ProbabilityStrategy,
  StrategyConfig,
} from './types';

interface StatsGenerateOptions {
  aiConfig?: AIRecommendationConfig;
  probabilityConfig?: StrategyConfig;
}

/**
 * 1~45 사이의 중복되지 않는 로또 번호 6개를 생성합니다.
 * @returns 오름차순으로 정렬된 로또 번호 배열
 */
export function generateLottoNumbers(): number[] {
  const numbers = new Set<number>();

  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }

  return Array.from(numbers).sort((a, b) => a - b);
}

/**
 * 여러 게임의 로또 번호를 한 번에 생성합니다.
 * @param count - 생성할 게임 수 (기본값: 5)
 * @returns 로또 게임 세트
 */
export function generateMultipleLottoNumbers(count: number = 5): LottoGameSet {
  const games: number[][] = [];

  for (let i = 0; i < count; i++) {
    games.push(generateLottoNumbers());
  }

  return {
    id: generateId(),
    games,
    timestamp: Date.now(),
  };
}

/**
 * 생성 함수를 기반으로 여러 게임 번호를 생성합니다.
 */
export function generateLottoGames(
  count: number,
  generator: (index: number) => number[]
): number[][] {
  const games: number[][] = [];

  for (let i = 0; i < count; i++) {
    games.push(generator(i));
  }

  return games;
}

/**
 * 문자열 시드를 기반으로 항상 동일한 번호를 생성합니다.
 */
export function generateLottoNumbersFromSeed(seed: string): number[] {
  const rng = createSeededRng(seed);
  return generateLottoNumbersByRng(rng);
}

function isProbabilityStrategy(
  strategy: LottoStatsStrategy
): strategy is ProbabilityStrategy {
  return strategy !== 'ai';
}

/**
 * 통계 전략 기반 번호를 생성합니다.
 * - ai: 가중치 기반 AI 통계 추천
 * - 나머지: 6가지 확률통계 전략
 */
export function generateStatsBasedLottoNumbers(
  strategy: LottoStatsStrategy,
  options: StatsGenerateOptions = {}
): number[] {
  try {
    if (strategy === 'ai') {
      return generateAIStatisticalNumbers(options.aiConfig);
    }

    if (isProbabilityStrategy(strategy)) {
      return generateNumbersByStrategy(strategy, options.probabilityConfig);
    }
  } catch {
    // 알고리즘 예외 발생 시 랜덤 폴백
  }

  return generateLottoNumbers();
}

/**
 * 통계 전략 설명을 반환합니다.
 */
export function getStatsStrategyDescription(strategy: LottoStatsStrategy): string {
  if (strategy === 'ai') {
    return '역대 출현 빈도, 최근 추세, 동반 출현을 가중 결합한 AI 추천';
  }

  return getStrategyDescription(strategy);
}

/**
 * 지정한 숫자를 반드시 포함하는 번호를 생성합니다.
 */
export function generateLottoNumbersWithLucky(
  luckyNumber: number | null | undefined
): number[] {
  const normalizedLucky = normalizeLottoNumber(luckyNumber ?? 1);
  const numbers = new Set<number>([normalizedLucky]);

  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  return Array.from(numbers).sort((a, b) => a - b);
}

/**
 * 보너스 번호를 포함한 로또 번호를 생성합니다
 * @returns 6개의 기본 번호와 1개의 보너스 번호
 */
export function generateLottoNumbersWithBonus(): LottoNumbers {
  const numbers = new Set<number>();

  while (numbers.size < 7) {
    const randomNum = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNum);
  }

  const allNumbers = Array.from(numbers).sort((a, b) => a - b);

  return {
    id: generateId(),
    numbers: allNumbers.slice(0, 6),
    bonus: allNumbers[6],
    timestamp: Date.now(),
  };
}

/**
 * 로또 번호의 합계를 계산합니다
 */
export function calculateSum(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0);
}

/**
 * 로또 번호를 분석합니다 (홀수/짝수, 고/저)
 */
export function analyzeLottoNumbers(numbers: number[]) {
  const oddCount = numbers.filter((num) => num % 2 !== 0).length;
  const evenCount = numbers.length - oddCount;

  const lowCount = numbers.filter((num) => num <= 22).length;
  const highCount = numbers.length - lowCount;

  const sum = calculateSum(numbers);

  return {
    odd: oddCount,
    even: evenCount,
    low: lowCount,
    high: highCount,
    sum,
    average: Math.round((sum / numbers.length) * 10) / 10,
  };
}

/**
 * 로또 번호가 유효한지 검증합니다
 */
export function validateLottoNumbers(numbers: number[]): boolean {
  if (numbers.length !== 6) return false;

  const allInRange = numbers.every((num) => num >= 1 && num <= 45);
  if (!allInRange) return false;

  const uniqueNumbers = new Set(numbers);
  if (uniqueNumbers.size !== 6) return false;

  return true;
}

/**
 * 두 로또 번호 세트가 일치하는 개수를 계산합니다
 */
export function countMatches(numbers1: number[], numbers2: number[]): number {
  const set1 = new Set(numbers1);
  return numbers2.filter((num) => set1.has(num)).length;
}

/**
 * 로또 등수를 계산합니다
 * @param myNumbers 내 번호
 * @param winningNumbers 당첨 번호
 * @param bonusNumber 보너스 번호
 */
export function calculateRank(
  myNumbers: number[],
  winningNumbers: number[],
  bonusNumber?: number
): string {
  const matches = countMatches(myNumbers, winningNumbers);
  const hasBonus = bonusNumber ? myNumbers.includes(bonusNumber) : false;

  if (matches === 6) return '1등';
  if (matches === 5 && hasBonus) return '2등';
  if (matches === 5) return '3등';
  if (matches === 4) return '4등';
  if (matches === 3) return '5등';

  return '낙첨';
}

/**
 * 고유 ID를 생성합니다.
 * @returns 타임스탬프 기반 고유 ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * 로또 번호를 문자열로 포맷합니다.
 * @param numbers - 로또 번호 배열
 * @returns 포맷된 문자열 (예: "01, 12, 23, 34, 35, 45")
 */
export function formatLottoNumbers(numbers: number[]): string {
  return numbers.map((num) => num.toString().padStart(2, '0')).join(', ');
}

/**
 * 최근 통계 요약 데이터를 반환합니다.
 */
export function getRecentStats(recentRoundWindow = 100): LottoStatsSummary {
  const allStats = analyzeLottoStatistics();
  const recentStats = getRecentStatistics(recentRoundWindow);

  return {
    mostFrequent: allStats.mostFrequent.slice(0, 5).map((item) => item.number),
    leastFrequent: allStats.leastFrequent.slice(0, 5).map((item) => item.number),
    hotNumbers: recentStats.hotColdNumbers.hot.slice(0, 5),
    coldNumbers: recentStats.hotColdNumbers.cold.slice(0, 5),
    totalRounds: allStats.totalRounds,
    recentRoundWindow,
  };
}

function normalizeLottoNumber(value: number): number {
  if (!Number.isFinite(value)) return 1;
  const rounded = Math.round(value);
  if (rounded < 1) return 1;
  if (rounded > 45) return 45;
  return rounded;
}

function hashStringToSeed(value: string): number {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createSeededRng(seed: string): () => number {
  let state = hashStringToSeed(seed);

  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateLottoNumbersByRng(rng: () => number): number[] {
  const numbers = new Set<number>();

  while (numbers.size < 6) {
    numbers.add(Math.floor(rng() * 45) + 1);
  }

  return Array.from(numbers).sort((a, b) => a - b);
}

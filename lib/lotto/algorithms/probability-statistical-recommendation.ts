/**
 * 확률통계 기반 추천 알고리즘
 * PRD 6.4 명세 - 6가지 전략 구현
 *
 * 전략 목록:
 * 1. 고빈도 전략 (High Frequency): 전체 출현 빈도 상위 번호
 * 2. 저빈도 전략 (Low Frequency): 전체 출현 빈도 하위 번호
 * 3. 미출현 전략 (Undrawn): 최근 N회차 내 미출현 번호
 * 4. 균형 전략 (Balanced): 홀짝 3:3, 각 구간 최소 1개
 * 5. 핫넘버 전략 (Hot Numbers): 최근 10회차 중 2회 이상 출현
 * 6. 콜드넘버 전략 (Cold Numbers): 30회차 이상 연속 미출현
 */

import {
  analyzeLottoStatistics,
} from './statistics-analyzer';
import { getLottoRoundResults } from '../round-data';
import type { ProbabilityStrategy, StrategyConfig } from '../types';

const DEFAULT_CONFIG: Required<StrategyConfig> = {
  poolSize: 15,
  recentWindow: 20,
  coldThreshold: 30,
  hotThreshold: 2,
};

/**
 * 1. 고빈도 전략: 전체 출현 빈도 상위 번호
 */
export function generateHighFrequencyNumbers(
  config: StrategyConfig = {}
): number[] {
  const { poolSize } = { ...DEFAULT_CONFIG, ...config };
  const stats = analyzeLottoStatistics();

  // 상위 빈도 번호 풀
  const pool = stats.mostFrequent.slice(0, poolSize).map((f) => f.number);

  return selectRandomFromPool(pool, 6);
}

/**
 * 2. 저빈도 전략: 전체 출현 빈도 하위 번호
 */
export function generateLowFrequencyNumbers(
  config: StrategyConfig = {}
): number[] {
  const { poolSize } = { ...DEFAULT_CONFIG, ...config };
  const stats = analyzeLottoStatistics();

  // 하위 빈도 번호 풀
  const pool = stats.leastFrequent.slice(0, poolSize).map((f) => f.number);

  return selectRandomFromPool(pool, 6);
}

/**
 * 3. 미출현 전략: 최근 N회차 내 미출현 번호
 */
export function generateUndrawnNumbers(config: StrategyConfig = {}): number[] {
  const { recentWindow } = { ...DEFAULT_CONFIG, ...config };
  const allRounds = getLottoRoundResults();
  const sortedRounds = [...allRounds].sort((a, b) => b.round - a.round);
  const recentRounds = sortedRounds.slice(0, recentWindow);

  // 최근 N회차에 출현한 번호 세트
  const recentNumbers = new Set<number>();
  recentRounds.forEach((round) => {
    round.numbers.forEach((num) => recentNumbers.add(num));
  });

  // 미출현 번호 풀
  const pool: number[] = [];
  for (let num = 1; num <= 45; num++) {
    if (!recentNumbers.has(num)) {
      pool.push(num);
    }
  }

  // 미출현 번호가 6개 미만이면 저빈도 번호로 보충
  if (pool.length < 6) {
    const stats = analyzeLottoStatistics();
    const additionalPool = stats.leastFrequent
      .map((f) => f.number)
      .filter((num) => !pool.includes(num));

    pool.push(...additionalPool.slice(0, 6 - pool.length));
  }

  return selectRandomFromPool(pool, 6);
}

/**
 * 4. 균형 전략: 홀짝 3:3, 각 구간 최소 1개 포함
 */
export function generateBalancedNumbers(
  config: StrategyConfig = {},
  maxRetries = 50
): number[] {
  const normalized = { ...DEFAULT_CONFIG, ...config };
  void normalized;
  const ranges = [
    { min: 1, max: 10 },
    { min: 11, max: 20 },
    { min: 21, max: 30 },
    { min: 31, max: 40 },
    { min: 41, max: 45 },
  ];

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const selected = new Set<number>();

    // 각 구간에서 최소 1개씩 선택
    ranges.forEach((range) => {
      const pool: number[] = [];
      for (let num = range.min; num <= range.max; num++) {
        if (!selected.has(num)) {
          pool.push(num);
        }
      }

      if (pool.length > 0) {
        const randomNum = pool[Math.floor(Math.random() * pool.length)]!;
        selected.add(randomNum);
      }
    });

    // 6개가 안 되면 추가 선택
    while (selected.size < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      selected.add(num);
    }

    // 홀짝 비율 확인
    const numbers = Array.from(selected).sort((a, b) => a - b);
    const oddCount = numbers.filter((n) => n % 2 !== 0).length;

    if (oddCount === 3) {
      return numbers;
    }
  }

  // 최대 재시도 후 실패하면 그냥 반환
  const fallback = new Set<number>();
  while (fallback.size < 6) {
    fallback.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(fallback).sort((a, b) => a - b);
}

/**
 * 5. 핫넘버 전략: 최근 10회차 중 2회 이상 출현한 번호
 */
export function generateHotNumbers(config: StrategyConfig = {}): number[] {
  const { hotThreshold } = { ...DEFAULT_CONFIG, ...config };
  const allRounds = getLottoRoundResults();
  const sortedRounds = [...allRounds].sort((a, b) => b.round - a.round);
  const recentRounds = sortedRounds.slice(0, 10);

  // 최근 10회차 빈도 계산
  const frequencyMap = new Map<number, number>();
  for (let num = 1; num <= 45; num++) {
    frequencyMap.set(num, 0);
  }

  recentRounds.forEach((round) => {
    round.numbers.forEach((num) => {
      frequencyMap.set(num, (frequencyMap.get(num) ?? 0) + 1);
    });
  });

  // Hot 번호 풀 (2회 이상 출현)
  const pool: number[] = [];
  frequencyMap.forEach((count, num) => {
    if (count >= hotThreshold) {
      pool.push(num);
    }
  });

  // Hot 번호가 6개 미만이면 고빈도 번호로 보충
  if (pool.length < 6) {
    const stats = analyzeLottoStatistics();
    const additionalPool = stats.mostFrequent
      .map((f) => f.number)
      .filter((num) => !pool.includes(num));

    pool.push(...additionalPool.slice(0, 6 - pool.length));
  }

  return selectRandomFromPool(pool, 6);
}

/**
 * 6. 콜드넘버 전략: 30회차 이상 연속 미출현 번호
 */
export function generateColdNumbers(config: StrategyConfig = {}): number[] {
  const { coldThreshold } = { ...DEFAULT_CONFIG, ...config };
  const allRounds = getLottoRoundResults();
  const sortedRounds = [...allRounds].sort((a, b) => b.round - a.round);
  const latestRound = sortedRounds[0]?.round ?? 0;

  // 각 번호의 마지막 출현 회차 계산
  const lastAppearance = new Map<number, number>();
  for (let num = 1; num <= 45; num++) {
    lastAppearance.set(num, 0);
  }

  sortedRounds.forEach((round) => {
    round.numbers.forEach((num) => {
      if (lastAppearance.get(num) === 0) {
        lastAppearance.set(num, round.round);
      }
    });
  });

  // Cold 번호 풀 (30회차 이상 미출현)
  const pool: number[] = [];
  lastAppearance.forEach((lastRound, num) => {
    const absence = lastRound > 0 ? latestRound - lastRound : latestRound;
    if (absence >= coldThreshold) {
      pool.push(num);
    }
  });

  // Cold 번호가 6개 미만이면 저빈도 번호로 보충
  if (pool.length < 6) {
    const stats = analyzeLottoStatistics();
    const additionalPool = stats.leastFrequent
      .map((f) => f.number)
      .filter((num) => !pool.includes(num));

    pool.push(...additionalPool.slice(0, 6 - pool.length));
  }

  return selectRandomFromPool(pool, 6);
}

/**
 * 전략에 따라 번호를 생성합니다.
 */
export function generateNumbersByStrategy(
  strategy: ProbabilityStrategy,
  config: StrategyConfig = {}
): number[] {
  switch (strategy) {
    case 'high-frequency':
      return generateHighFrequencyNumbers(config);
    case 'low-frequency':
      return generateLowFrequencyNumbers(config);
    case 'undrawn':
      return generateUndrawnNumbers(config);
    case 'balanced':
      return generateBalancedNumbers(config);
    case 'hot':
      return generateHotNumbers(config);
    case 'cold':
      return generateColdNumbers(config);
    default:
      throw new Error(`알 수 없는 전략: ${strategy}`);
  }
}

/**
 * 여러 게임을 한 번에 생성합니다.
 */
export function generateMultipleByStrategy(
  strategy: ProbabilityStrategy,
  count: number,
  config: StrategyConfig = {}
): number[][] {
  const games: number[][] = [];

  for (let i = 0; i < count; i++) {
    games.push(generateNumbersByStrategy(strategy, config));
  }

  return games;
}

/**
 * 풀에서 무작위로 N개를 선택합니다.
 */
function selectRandomFromPool(pool: number[], count: number): number[] {
  if (pool.length < count) {
    throw new Error(`풀 크기(${pool.length})가 필요한 개수(${count})보다 작습니다.`);
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).sort((a, b) => a - b);
}

/**
 * 전략 설명을 반환합니다.
 */
export function getStrategyDescription(strategy: ProbabilityStrategy): string {
  const descriptions: Record<ProbabilityStrategy, string> = {
    'high-frequency': '전체 회차에서 가장 자주 출현한 번호 위주로 추천',
    'low-frequency': '전체 회차에서 출현 빈도가 낮은 번호 위주로 추천',
    'undrawn': '최근 20회차 내에 나오지 않은 번호 위주로 추천',
    'balanced': '홀짝 3:3, 각 구간 균형을 맞춘 번호 추천',
    'hot': '최근 10회차에서 자주 출현한 핫한 번호 추천',
    'cold': '30회차 이상 나오지 않은 콜드 번호 추천',
  };

  return descriptions[strategy] ?? '알 수 없는 전략';
}

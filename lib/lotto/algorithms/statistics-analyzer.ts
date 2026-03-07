/**
 * 로또 번호 통계 분석 엔진
 * PRD 6.2 명세 기반 통계 분석 함수 모음
 */

import { getLottoRoundResults } from '../round-data';
import type {
  CoOccurrenceData,
  HotColdNumbers,
  LottoStatistics,
  LottoRoundResult,
  NumberFrequency,
  RangeDistribution,
} from '../types';

const NUMBER_RANGES = [
  { min: 1, max: 10, label: '1-10' },
  { min: 11, max: 20, label: '11-20' },
  { min: 21, max: 30, label: '21-30' },
  { min: 31, max: 40, label: '31-40' },
  { min: 41, max: 45, label: '41-45' },
] as const;

/**
 * 전체 회차 데이터에서 번호별 출현 빈도를 계산합니다.
 */
export function analyzeNumberFrequency(
  rounds: LottoRoundResult[]
): Map<number, NumberFrequency> {
  const frequencyMap = new Map<number, NumberFrequency>();
  const totalRounds = rounds.length;

  // 초기화 (1~45)
  for (let num = 1; num <= 45; num++) {
    frequencyMap.set(num, {
      number: num,
      count: 0,
      rate: 0,
      lastAppearance: 0,
      consecutiveAbsence: 0,
    });
  }

  // 빈도 계산 (최신 회차부터 역순으로)
  const sortedRounds = [...rounds].sort((a, b) => b.round - a.round);

  sortedRounds.forEach((round) => {
    round.numbers.forEach((num) => {
      const freq = frequencyMap.get(num);
      if (freq) {
        freq.count += 1;
        if (freq.lastAppearance === 0) {
          freq.lastAppearance = round.round;
        }
      }
    });
  });

  // 출현율 및 연속 미출현 계산
  const latestRound = sortedRounds[0]?.round ?? 0;

  frequencyMap.forEach((freq) => {
    freq.rate = totalRounds > 0 ? (freq.count / totalRounds) * 100 : 0;
    freq.consecutiveAbsence =
      freq.lastAppearance > 0 ? latestRound - freq.lastAppearance : latestRound;
  });

  return frequencyMap;
}

/**
 * 최근 N회차 기준 Hot/Cold 번호를 분류합니다.
 */
export function classifyHotColdNumbers(
  rounds: LottoRoundResult[],
  recentWindow = 10,
  coldThreshold = 30
): HotColdNumbers {
  const sortedRounds = [...rounds].sort((a, b) => b.round - a.round);
  const recentRounds = sortedRounds.slice(0, recentWindow);
  const latestRound = sortedRounds[0]?.round ?? 0;

  const recentFrequency = new Map<number, number>();
  const lastAppearance = new Map<number, number>();

  // 초기화
  for (let num = 1; num <= 45; num++) {
    recentFrequency.set(num, 0);
    lastAppearance.set(num, 0);
  }

  // 최근 N회차 빈도 계산
  recentRounds.forEach((round) => {
    round.numbers.forEach((num) => {
      recentFrequency.set(num, (recentFrequency.get(num) ?? 0) + 1);
      if ((lastAppearance.get(num) ?? 0) === 0) {
        lastAppearance.set(num, round.round);
      }
    });
  });

  const hot: number[] = [];
  const cold: number[] = [];
  const neutral: number[] = [];

  for (let num = 1; num <= 45; num++) {
    const recentCount = recentFrequency.get(num) ?? 0;
    const lastSeen = lastAppearance.get(num) ?? 0;
    const absence = lastSeen > 0 ? latestRound - lastSeen : latestRound;

    if (recentCount >= 2) {
      hot.push(num);
    } else if (absence >= coldThreshold) {
      cold.push(num);
    } else {
      neutral.push(num);
    }
  }

  return { hot, cold, neutral };
}

/**
 * 홀짝 비율 분포를 분석합니다.
 */
export function analyzeOddEvenDistribution(
  rounds: LottoRoundResult[]
): Map<string, number> {
  const distribution = new Map<string, number>();

  rounds.forEach((round) => {
    const oddCount = round.numbers.filter((num) => num % 2 !== 0).length;
    const evenCount = 6 - oddCount;
    const ratio = `${oddCount}:${evenCount}`;

    distribution.set(ratio, (distribution.get(ratio) ?? 0) + 1);
  });

  return distribution;
}

/**
 * 번호 구간 분포를 분석합니다.
 */
export function analyzeRangeDistribution(
  rounds: LottoRoundResult[]
): RangeDistribution[] {
  const distributions: RangeDistribution[] = NUMBER_RANGES.map((range) => ({
    range: range.label,
    count: 0,
    rate: 0,
    numbers: [],
  }));

  const totalNumbers = rounds.length * 6;

  rounds.forEach((round) => {
    round.numbers.forEach((num) => {
      const rangeIndex = NUMBER_RANGES.findIndex(
        (r) => num >= r.min && num <= r.max
      );
      if (rangeIndex !== -1) {
        distributions[rangeIndex]!.count += 1;
      }
    });
  });

  distributions.forEach((dist) => {
    dist.rate = totalNumbers > 0 ? (dist.count / totalNumbers) * 100 : 0;
  });

  return distributions;
}

/**
 * 동반 출현 빈도를 분석합니다 (상위 N개).
 */
export function analyzeCoOccurrence(
  rounds: LottoRoundResult[],
  topN = 20
): CoOccurrenceData[] {
  const coOccurrenceMap = new Map<string, number>();

  rounds.forEach((round) => {
    const numbers = [...round.numbers].sort((a, b) => a - b);

    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        const pair = `${numbers[i]!}-${numbers[j]!}`;
        coOccurrenceMap.set(pair, (coOccurrenceMap.get(pair) ?? 0) + 1);
      }
    }
  });

  const totalRounds = rounds.length;
  const results: CoOccurrenceData[] = [];

  coOccurrenceMap.forEach((count, pair) => {
    const [num1, num2] = pair.split('-').map(Number);
    if (num1 !== undefined && num2 !== undefined) {
      results.push({
        pair: [num1, num2],
        count,
        rate: (count / totalRounds) * 100,
      });
    }
  });

  return results.sort((a, b) => b.count - a.count).slice(0, topN);
}

/**
 * 번호 합계 평균을 계산합니다.
 */
export function calculateAverageSum(rounds: LottoRoundResult[]): number {
  if (rounds.length === 0) return 0;

  const totalSum = rounds.reduce((sum, round) => {
    return sum + round.numbers.reduce((s, num) => s + num, 0);
  }, 0);

  return Math.round((totalSum / rounds.length) * 10) / 10;
}

/**
 * 종합 통계 분석을 수행합니다.
 */
export function analyzeLottoStatistics(
  rounds: LottoRoundResult[] = getLottoRoundResults()
): LottoStatistics {
  const frequencyMap = analyzeNumberFrequency(rounds);
  const frequencies = Array.from(frequencyMap.values());

  const mostFrequent = [...frequencies]
    .sort((a, b) => {
      if (b.count === a.count) return a.number - b.number;
      return b.count - a.count;
    })
    .slice(0, 10);

  const leastFrequent = [...frequencies]
    .sort((a, b) => {
      if (a.count === b.count) return a.number - b.number;
      return a.count - b.count;
    })
    .slice(0, 10);

  return {
    totalRounds: rounds.length,
    frequencyMap,
    mostFrequent,
    leastFrequent,
    hotColdNumbers: classifyHotColdNumbers(rounds),
    averageSum: calculateAverageSum(rounds),
    oddEvenDistribution: analyzeOddEvenDistribution(rounds),
    rangeDistribution: analyzeRangeDistribution(rounds),
    topCoOccurrences: analyzeCoOccurrence(rounds),
  };
}

/**
 * 최근 N회차 통계를 가져옵니다.
 */
export function getRecentStatistics(recentCount = 100): LottoStatistics {
  const allRounds = getLottoRoundResults();
  const sortedRounds = [...allRounds].sort((a, b) => b.round - a.round);
  const recentRounds = sortedRounds.slice(0, recentCount);

  return analyzeLottoStatistics(recentRounds);
}

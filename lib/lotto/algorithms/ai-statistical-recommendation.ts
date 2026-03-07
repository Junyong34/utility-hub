/**
 * AI 기반 통계 추천 알고리즘
 * PRD 6.3 명세 - 가중치 기반 확률적 샘플링
 *
 * 알고리즘 흐름:
 * 1. 전처리: 번호별 가중치 계산
 *    - 전체 출현 빈도 (40%)
 *    - 최근 100회차 출현 빈도 (35%)
 *    - 동반 출현 패턴 보정 (15%)
 *    - 홀짝/구간 균형 보정 (10%)
 * 2. 가중치 기반 확률적 샘플링
 * 3. 후처리: 유효성 검증
 */

import {
  analyzeLottoStatistics,
  getRecentStatistics,
} from './statistics-analyzer';
import { validateLottoNumbers } from './validation';
import { getLottoRoundResults } from '../round-data';
import type { AIRecommendationConfig, NumberWeight } from '../types';

const DEFAULT_CONFIG: AIRecommendationConfig = {
  frequencyRatio: 0.4,
  recentRatio: 0.35,
  coOccurrenceRatio: 0.15,
  balanceRatio: 0.1,
  recentWindow: 100,
  strictValidation: false,
};

/**
 * 번호별 가중치를 계산합니다.
 */
export function calculateNumberWeights(
  config: AIRecommendationConfig = DEFAULT_CONFIG
): Map<number, NumberWeight> {
  const allRounds = getLottoRoundResults();
  const allStats = analyzeLottoStatistics(allRounds);
  const recentStats = getRecentStatistics(config.recentWindow);

  const weights = new Map<number, NumberWeight>();

  // 전체 빈도 정규화
  const maxFrequency = Math.max(
    ...Array.from(allStats.frequencyMap.values()).map((f) => f.count)
  );

  // 최근 빈도 정규화
  const maxRecentFrequency = Math.max(
    ...Array.from(recentStats.frequencyMap.values()).map((f) => f.count)
  );

  // 동반 출현 점수 계산
  const coOccurrenceScores = calculateCoOccurrenceScores(
    allStats.topCoOccurrences
  );

  for (let num = 1; num <= 45; num++) {
    const allFreq = allStats.frequencyMap.get(num);
    const recentFreq = recentStats.frequencyMap.get(num);

    if (!allFreq || !recentFreq) continue;

    // 1. 전체 출현 빈도 가중치
    const frequencyWeight =
      maxFrequency > 0 ? (allFreq.count / maxFrequency) * config.frequencyRatio : 0;

    // 2. 최근 100회차 출현 빈도 가중치
    const recentWeight =
      maxRecentFrequency > 0
        ? (recentFreq.count / maxRecentFrequency) * config.recentRatio
        : 0;

    // 3. 동반 출현 패턴 보정
    const coOccurrenceWeight =
      (coOccurrenceScores.get(num) ?? 0) * config.coOccurrenceRatio;

    // 4. 홀짝/구간 균형 보정 (중간값 근처에 더 높은 가중치)
    const balanceWeight = calculateBalanceWeight(num) * config.balanceRatio;

    const totalWeight =
      frequencyWeight + recentWeight + coOccurrenceWeight + balanceWeight;

    weights.set(num, {
      number: num,
      weight: totalWeight,
      breakdown: {
        frequencyWeight,
        recentWeight,
        coOccurrenceWeight,
        balanceWeight,
      },
    });
  }

  return weights;
}

/**
 * 동반 출현 점수를 계산합니다.
 */
function calculateCoOccurrenceScores(
  coOccurrences: Array<{ pair: [number, number]; count: number }>
): Map<number, number> {
  const scores = new Map<number, number>();

  // 초기화
  for (let num = 1; num <= 45; num++) {
    scores.set(num, 0);
  }

  const maxCount = Math.max(...coOccurrences.map((c) => c.count), 1);

  coOccurrences.forEach((co) => {
    const [num1, num2] = co.pair;
    const normalizedScore = co.count / maxCount;

    scores.set(num1, (scores.get(num1) ?? 0) + normalizedScore);
    scores.set(num2, (scores.get(num2) ?? 0) + normalizedScore);
  });

  // 정규화 (0~1 범위)
  const maxScore = Math.max(...Array.from(scores.values()), 1);
  scores.forEach((score, num) => {
    scores.set(num, score / maxScore);
  });

  return scores;
}

/**
 * 균형 보정 가중치를 계산합니다.
 * 홀짝 균형, 구간 균형을 고려하여 중간 범위에 더 높은 가중치를 부여합니다.
 */
function calculateBalanceWeight(num: number): number {
  // 홀짝 균형: 홀수/짝수 모두에게 동일한 기회
  const oddBonus = 0.5;

  // 구간 균형: 중간 구간(11~40)에 약간 더 높은 가중치
  let rangeBonus = 0.3;
  if (num >= 11 && num <= 40) {
    rangeBonus = 0.5;
  }

  return oddBonus + rangeBonus;
}

/**
 * 가중치 기반으로 번호를 샘플링합니다.
 */
function weightedRandomSample(
  weights: Map<number, NumberWeight>,
  excludeNumbers: Set<number> = new Set()
): number {
  const availableNumbers = Array.from(weights.values()).filter(
    (w) => !excludeNumbers.has(w.number)
  );

  if (availableNumbers.length === 0) {
    throw new Error('사용 가능한 번호가 없습니다.');
  }

  const totalWeight = availableNumbers.reduce((sum, w) => sum + w.weight, 0);
  let random = Math.random() * totalWeight;

  for (const { number, weight } of availableNumbers) {
    random -= weight;
    if (random <= 0) {
      return number;
    }
  }

  return availableNumbers[0]!.number;
}

/**
 * AI 기반 통계 추천 번호를 생성합니다.
 */
export function generateAIStatisticalNumbers(
  config: AIRecommendationConfig = DEFAULT_CONFIG,
  maxRetries = 50
): number[] {
  const weights = calculateNumberWeights(config);

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const selected = new Set<number>();

    // 가중치 기반 샘플링으로 6개 번호 선택
    while (selected.size < 6) {
      const number = weightedRandomSample(weights, selected);
      selected.add(number);
    }

    const numbers = Array.from(selected).sort((a, b) => a - b);

    // 유효성 검증
    const validation = validateLottoNumbers(numbers, {
      checkSum: false, // 합계 범위는 너무 제한적
      checkOddEven: true,
      checkRange: true,
      checkConsecutive: true,
    });

    if (validation.isValid || !config.strictValidation) {
      return numbers;
    }
  }

  // 최대 재시도 후에도 실패하면 순수 랜덤 생성
  console.warn('AI 추천 생성 실패, 랜덤 번호로 대체합니다.');
  const fallback = new Set<number>();
  while (fallback.size < 6) {
    fallback.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(fallback).sort((a, b) => a - b);
}

/**
 * 여러 게임의 AI 추천 번호를 생성합니다.
 */
export function generateMultipleAINumbers(
  count: number,
  config: AIRecommendationConfig = DEFAULT_CONFIG
): number[][] {
  const games: number[][] = [];

  for (let i = 0; i < count; i++) {
    games.push(generateAIStatisticalNumbers(config));
  }

  return games;
}

/**
 * 가중치 정보를 디버깅용으로 출력합니다.
 */
export function getWeightBreakdown(
  config: AIRecommendationConfig = DEFAULT_CONFIG
): NumberWeight[] {
  const weights = calculateNumberWeights(config);
  return Array.from(weights.values()).sort((a, b) => b.weight - a.weight);
}

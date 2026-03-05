import lottoDraws from './lotto_draws.json';

export interface LottoRoundResult {
  round: number;
  numbers: number[];
  bonus: number;
  drawDate: string;
  drawYear: string;
  source: '동행복권';
}

type LottoDrawRow = Omit<LottoRoundResult, 'drawDate'>;

// function toDrawDate(drawYear: string): string {
//   const year = Number.parseInt(drawYear, 10);
//   if (!Number.isInteger(year) || year < 1000 || year > 9999) {
//     return '2000-01-01';
//   }
//   return `${String(year).padStart(4, '0')}-01-01`;
// }

const LOTTO_ROUND_RESULTS: LottoRoundResult[] = (
  lottoDraws as LottoDrawRow[]
).map(item => ({
  ...item,
  drawDate: item.drawYear,
}));

const SORTED_LOTTO_ROUND_RESULTS = [...LOTTO_ROUND_RESULTS].sort(
  (a, b) => b.round - a.round
);

/** 전체 회차 데이터를 최신순으로 정렬해 반환합니다. */
export function getLottoRoundResults(): LottoRoundResult[] {
  return [...SORTED_LOTTO_ROUND_RESULTS];
}

/** 특정 회차 결과 조회(없으면 null) */
export function getLottoRoundResult(round: number): LottoRoundResult | null {
  return SORTED_LOTTO_ROUND_RESULTS.find(item => item.round === round) ?? null;
}

/** 최신 회차(최신 순 정렬에서 첫 번째) 조회 */
export function getLatestLottoRoundResult(): LottoRoundResult | null {
  return SORTED_LOTTO_ROUND_RESULTS[0] ?? null;
}

/** 1~45 번호 빈도를 회차 데이터에서 집계합니다. */
export function getLottoNumberFrequency(rounds = getLottoRoundResults()) {
  const frequency = new Map<number, number>();

  for (let i = 1; i <= 45; i++) {
    frequency.set(i, 0);
  }

  rounds.forEach(round => {
    round.numbers.forEach(number => {
      frequency.set(number, (frequency.get(number) ?? 0) + 1);
    });
  });

  return frequency;
}

export function getLottoHotColdNumbers(
  rounds = getLottoRoundResults(),
  size = 5
) {
  const frequency = getLottoNumberFrequency(rounds);
  const ordered = [...frequency.entries()].sort((a, b) => {
    if (b[1] === a[1]) return a[0] - b[0];
    return b[1] - a[1];
  });

  const hotNumbers = ordered.slice(0, size).map(([number]) => number);
  const coldNumbers = [...ordered]
    .reverse()
    .slice(0, size)
    .map(([number]) => number);

  return {
    hotNumbers,
    coldNumbers,
    frequency,
  };
}

/** 전달된 번호 배열의 기본 패턴(홀짝, 구간, 합계/평균) 계산 */
export function analyzeLottoRoundPattern(numbers: number[]) {
  const oddCount = numbers.filter(num => num % 2 !== 0).length;
  const evenCount = numbers.length - oddCount;
  const lowCount = numbers.filter(num => num <= 22).length;
  const highCount = numbers.length - lowCount;
  const sum = numbers.reduce((acc, num) => acc + num, 0);

  const base = {
    odd: oddCount,
    even: evenCount,
    low: lowCount,
    high: highCount,
    sum,
    average: Math.round((sum / numbers.length) * 10) / 10,
  };
  const sorted = [...numbers].sort((a, b) => a - b);
  const gaps = sorted.slice(1).map((num, index) => num - sorted[index]);

  return {
    ...base,
    gaps,
  };
}

import { analyzeLottoNumbers } from './generator';
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

export function getLottoRoundResults(): LottoRoundResult[] {
  return [...SORTED_LOTTO_ROUND_RESULTS];
}

export function getLottoRoundResult(round: number): LottoRoundResult | null {
  return SORTED_LOTTO_ROUND_RESULTS.find(item => item.round === round) ?? null;
}

export function getLatestLottoRoundResult(): LottoRoundResult | null {
  return SORTED_LOTTO_ROUND_RESULTS[0] ?? null;
}

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

export function analyzeLottoRoundPattern(numbers: number[]) {
  const base = analyzeLottoNumbers(numbers);
  const sorted = [...numbers].sort((a, b) => a - b);
  const gaps = sorted.slice(1).map((num, index) => num - sorted[index]);

  return {
    ...base,
    gaps,
  };
}

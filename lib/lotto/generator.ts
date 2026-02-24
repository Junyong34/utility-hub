/**
 * 로또 번호 생성 유틸리티
 */

export interface LottoNumbers {
  id: string;
  numbers: number[];
  bonus?: number;
  timestamp: number;
}

export interface LottoGameSet {
  id: string;
  games: number[][];
  timestamp: number;
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
 * 보너스 번호를 포함한 로또 번호를 생성합니다
 * @returns 6개의 기본 번호와 1개의 보너스 번호
 */
export function generateLottoNumbersWithBonus(): LottoNumbers {
  const numbers = new Set<number>();

  // 중복되지 않는 7개의 숫자 생성
  while (numbers.size < 7) {
    const randomNum = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNum);
  }

  const allNumbers = Array.from(numbers).sort((a, b) => a - b);

  return {
    id: generateId(),
    numbers: allNumbers.slice(0, 6), // 처음 6개
    bonus: allNumbers[6], // 마지막 1개는 보너스
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

  const lowCount = numbers.filter((num) => num <= 22).length; // 1~22
  const highCount = numbers.length - lowCount; // 23~45

  const sum = calculateSum(numbers);

  return {
    odd: oddCount,
    even: evenCount,
    low: lowCount,
    high: highCount,
    sum,
    average: Math.round(sum / numbers.length * 10) / 10,
  };
}

/**
 * 로또 번호가 유효한지 검증합니다
 */
export function validateLottoNumbers(numbers: number[]): boolean {
  // 정확히 6개의 번호인지 확인
  if (numbers.length !== 6) return false;

  // 모든 번호가 1~45 범위 내인지 확인
  const allInRange = numbers.every((num) => num >= 1 && num <= 45);
  if (!allInRange) return false;

  // 중복이 없는지 확인
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
 * 최근 당첨 통계 (더미 데이터)
 */
export function getRecentStats() {
  return {
    mostFrequent: [34, 27, 13, 45, 17],
    leastFrequent: [2, 41, 39, 6, 11],
    hotNumbers: [34, 27, 13], // 최근 10회 자주 나온 번호
    coldNumbers: [2, 41, 39], // 최근 10회 안 나온 번호
  };
}

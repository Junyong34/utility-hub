/**
 * 금액 포맷팅 유틸리티
 */

export { splitMonths } from '../../shared/domain/duration.ts';
export {
  formatCurrencyToKoreanUnits,
  formatNumberWithCommas,
  parseFormattedNumber,
} from '../../shared/domain/money-formatting.ts';

/**
 * 숫자를 한글 단위로 표시
 * 예: 1000 → "1천원", 10000 → "1만원", 100000000 → "1억원"
 */
export function formatKoreanUnit(amount: number): string {
  if (amount === 0) return '0';

  const units = [
    { value: 1000000000000, unit: '조' },
    { value: 100000000, unit: '억' },
    { value: 1000000, unit: '백만' },
    { value: 10000, unit: '만' },
    { value: 1000, unit: '천' },
  ];

  for (const { value, unit } of units) {
    if (Math.abs(amount) >= value) {
      const divided = amount / value;
      // 소수점 처리
      if (divided >= 10) {
        return `${Math.round(divided)}${unit}`;
      } else {
        return `${divided.toFixed(1)}${unit}`.replace(/\.0/, '');
      }
    }
  }

  return amount.toString();
}

/**
 * 금액을 통화와 한글 단위로 함께 표시
 * 예: 10000000 → "₩ 10,000,000 (1천만원)"
 */
export function formatCurrencyWithUnit(
  amount: number,
  locale: string = 'ko-KR'
): string {
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  });

  const formatted = currencyFormatter.format(amount);
  const unit = formatKoreanUnit(amount);

  return `${formatted} (${unit})`;
}

/**
 * 년/월 단위로 변환
 * yearMode가 true면 년 → 월로 변환, false면 월 → 년으로 변환
 * 월 → 년 변환 시 12개월 미만은 버림 (Math.floor)
 */
export function convertTermUnit(
  value: number,
  fromMode: 'year' | 'month',
  toMode: 'year' | 'month'
): number {
  if (fromMode === toMode) return value;

  if (fromMode === 'year' && toMode === 'month') {
    return value * 12;
  } else {
    // month to year - 버림 처리
    return Math.floor(value / 12);
  }
}

/**
 * 년/월을 총 개월로 합치기
 */
export function combineTerms(years: number, months: number): number {
  return years * 12 + months;
}

/**
 * 숫자를 한글로 변환
 * 예: 123456789 → "일억 이천삼백사십오만 육천칠백팔십구"
 */
export function formatNumberToKorean(num: number): string {
  if (num === 0) return '영';
  if (num < 0) return '음수' + formatNumberToKorean(-num);

  const digits = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const units = ['', '십', '백', '천'];
  const bigUnits = ['', '만', '억', '조', '경'];

  const splitByUnit = (n: number): number[] => {
    const result: number[] = [];
    while (n > 0) {
      result.push(n % 10000);
      n = Math.floor(n / 10000);
    }
    return result;
  };

  const convertUnder10000 = (n: number): string => {
    if (n === 0) return '';
    let result = '';
    let digitIndex = 0;

    while (n > 0) {
      const digit = n % 10;
      if (digit !== 0) {
        const digitStr = digit === 1 && digitIndex > 0 ? '' : digits[digit];
        result = digitStr + units[digitIndex] + result;
      }
      n = Math.floor(n / 10);
      digitIndex++;
    }
    return result;
  };

  const chunks = splitByUnit(Math.floor(num));
  let result = '';

  for (let i = 0; i < chunks.length; i++) {
    if (chunks[i] !== 0) {
      result = convertUnder10000(chunks[i]) + bigUnits[i] + ' ' + result;
    }
  }

  return result.trim();
}

/**
 * Date 객체를 한글 형식으로 변환
 * 예: 2027-04-09 → "2027년 4월 9일"
 */
export function formatDateToKorean(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

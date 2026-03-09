/**
 * 금액 포맷팅 유틸리티
 */

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
 * 개월 수를 년/월로 분리
 * 240 → { years: 20, months: 0 }
 * 241 → { years: 20, months: 1 }
 */
export function splitMonths(
  totalMonths: number
): { years: number; months: number } {
  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  };
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
 * 숫자를 한글 금액 표기로 변환 (아라비아 숫자 + 한글 단위)
 * 예: 123456789 → "1억 2,345만 6,789원"
 */
export function formatCurrencyToKoreanUnits(num: number): string {
  if (num === 0) return '0원';
  if (num < 0) return '-' + formatCurrencyToKoreanUnits(-num);

  const eok = Math.floor(num / 100000000);
  const man = Math.floor((num % 100000000) / 10000);
  const rest = num % 10000;

  const parts: string[] = [];

  if (eok > 0) {
    parts.push(`${eok.toLocaleString('ko-KR')}억`);
  }
  if (man > 0) {
    parts.push(`${man.toLocaleString('ko-KR')}만`);
  }
  if (rest > 0 || parts.length === 0) {
    parts.push(rest.toLocaleString('ko-KR'));
  }

  return parts.join(' ') + '원';
}

/**
 * 숫자에 콤마 추가
 * 예: 1000000 → "1,000,000"
 */
export function formatNumberWithCommas(value: string | number): string {
  const numStr = typeof value === 'number' ? value.toString() : value;
  const cleaned = numStr.replace(/[^0-9.-]/g, '');
  if (!cleaned) return '';

  const num = parseFloat(cleaned);
  if (isNaN(num)) return '';

  return num.toLocaleString('ko-KR');
}

/**
 * 콤마가 포함된 문자열에서 숫자만 추출
 * 예: "1,000,000" → 1000000
 */
export function parseFormattedNumber(value: string): number {
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
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

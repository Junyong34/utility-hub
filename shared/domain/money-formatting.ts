/**
 * 숫자를 한글 금액 표기로 변환합니다.
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

/** 숫자에 천 단위 구분 기호를 추가합니다. */
export function formatNumberWithCommas(value: string | number): string {
  const numStr = typeof value === 'number' ? value.toString() : value;
  const cleaned = numStr.replace(/[^0-9.-]/g, '');
  if (!cleaned) return '';

  const num = parseFloat(cleaned);
  if (isNaN(num)) return '';

  return num.toLocaleString('ko-KR');
}

/** 천 단위 구분 기호가 포함된 문자열을 숫자로 변환합니다. */
export function parseFormattedNumber(value: string): number {
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

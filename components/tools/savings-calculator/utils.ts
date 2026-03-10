/**
 * 문자열에서 숫자만 추출
 */
export function getNumberInput(value: string | number): number {
  if (typeof value === 'number') return value;
  const parsed = parseFloat(value.replace(/[^0-9.-]/g, ''));
  return isNaN(parsed) ? 0 : parsed;
}

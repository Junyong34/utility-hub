export function parseAmountInput(rawValue: string): number {
  const digits = rawValue.replace(/[^\d]/g, '');

  if (digits.length === 0) {
    return 0;
  }

  return Number(digits);
}

export function formatAmountInputValue(amount: number): string {
  if (!Number.isFinite(amount) || amount <= 0) {
    return '';
  }

  return Math.floor(amount).toLocaleString('ko-KR');
}

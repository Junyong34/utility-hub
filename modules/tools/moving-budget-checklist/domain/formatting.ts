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

export function formatCurrencyToKoreanUnits(amount: number): string {
  if (amount === 0) {
    return '0원';
  }

  if (amount < 0) {
    return `-${formatCurrencyToKoreanUnits(-amount)}`;
  }

  const eok = Math.floor(amount / 100_000_000);
  const man = Math.floor((amount % 100_000_000) / 10_000);
  const rest = amount % 10_000;
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

  return `${parts.join(' ')}원`;
}

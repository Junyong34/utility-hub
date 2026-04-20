export function formatWon(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return '-';
  }

  return `${value.toLocaleString('ko-KR')}원`;
}

export function formatSignedWon(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return '-';
  }

  const safeValue = Math.abs(value);
  return `${value >= 0 ? '+' : '-'}${formatWon(safeValue)}`;
}

export function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return '-';
  }

  return `${value}%`;
}

export function formatSignedPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return '-';
  }

  return `${value >= 0 ? '+' : '-'}${Math.abs(value)}%`;
}

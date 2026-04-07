export function pickLatestDate(
  dates: Array<string | undefined | null>,
  fallback?: string
): string | undefined {
  const validDates = dates
    .filter((value): value is string => Boolean(value))
    .filter(value => !Number.isNaN(new Date(value).getTime()));

  if (validDates.length === 0) {
    return fallback;
  }

  return validDates.sort(
    (left, right) =>
      new Date(right).getTime() - new Date(left).getTime()
  )[0];
}

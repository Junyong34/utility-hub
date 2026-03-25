export const MANUAL_COST_QUICK_ADD_AMOUNTS = [500_000, 1_000_000, 2_000_000] as const;

export function applyManualCostIncrement(
  currentAmount: number | null | undefined,
  incrementAmount: number,
): number {
  return (currentAmount ?? 0) + incrementAmount;
}

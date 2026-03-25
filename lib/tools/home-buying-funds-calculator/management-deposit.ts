export function resolveManagementDepositAmount(
  manualManagementDeposit: number | null | undefined,
): number {
  return manualManagementDeposit ?? 0;
}

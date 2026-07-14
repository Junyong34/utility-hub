import type { DsrLoanInput } from './types.ts';

export function createEmptyLoan(
  id: string,
  name: string,
  overrides: Partial<DsrLoanInput> = {}
): DsrLoanInput {
  return {
    id,
    name,
    loanType: 'mortgage',
    balance: 0,
    annualRate: 4.2,
    termMonths: 360,
    repaymentMethod: 'equal-payment',
    rateType: 'variable',
    regionType: 'capital',
    ...overrides,
  };
}

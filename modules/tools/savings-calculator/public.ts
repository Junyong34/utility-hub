export { SAVINGS_CALCULATOR_MANIFEST } from './domain/manifest.ts';
export {
  calculateDeposit,
  calculateInstallment,
  INTEREST_TYPE_LABELS,
  TAX_RATES,
  TAX_TYPE_LABELS,
} from './domain/savings-calculation.ts';
export type {
  DepositCalculationResult,
  InstallmentCalculationResult,
  InterestType,
  MonthlyInterestItem,
  TaxType,
} from './domain/savings-calculation.ts';
export {
  DEPOSIT_QUERY_PARSERS,
  INSTALLMENT_QUERY_PARSERS,
} from './domain/query-parsers.ts';
export type {
  DepositQueryState,
  InstallmentQueryState,
} from './domain/query-parsers.ts';

export { DSR_CALCULATOR_MANIFEST } from './domain/manifest.ts';
export {
  calculateAnnualDebtService,
  calculateDsrSummary,
  estimateMaxNewLoanAmount,
  resolveDsrPolicy,
} from './domain/calculation.ts';
export {
  DSR_POLICY_PRESETS,
  getDsrPolicyPreset,
  getDsrPolicyVersions,
} from './domain/policies.ts';
export type {
  AnnualDebtService,
  DsrCalculationInput,
  DsrCalculationResult,
  DsrLenderGroup,
  DsrLoanInput,
  DsrLoanType,
  DsrPolicyContext,
  DsrPolicyPreset,
  DsrPolicyVersion,
  DsrRateType,
  DsrRegionType,
  MaxLoanEstimate,
  ResolvedDsrPolicy,
} from './domain/types.ts';

import type { RepaymentMethod } from '../loan-calculator';

export type DsrPolicyVersion = '2025-h2' | '2026-h1';

export type DsrLenderGroup = 'bank';

export type DsrLoanType = 'mortgage' | 'credit';

export type DsrRateType = 'fixed' | 'variable' | 'mixed' | 'periodic';

export type DsrRegionType = 'capital' | 'local' | 'none';

export interface DsrLoanInput {
  id: string;
  name: string;
  loanType: DsrLoanType;
  balance: number;
  annualRate: number;
  termMonths: number;
  repaymentMethod: RepaymentMethod;
  rateType: DsrRateType;
  regionType: DsrRegionType;
  introductoryPeriodMonths?: number;
}

export interface DsrPolicyContext {
  policyVersion: DsrPolicyVersion;
  lenderGroup: DsrLenderGroup;
  existingLoans: DsrLoanInput[];
  newLoan: DsrLoanInput;
}

export interface DsrPolicyPreset {
  version: DsrPolicyVersion;
  label: string;
  regulatoryLimit: number;
  generalStressRateFloor: number;
  capitalMortgageStressRateFloor: number;
  creditThreshold: number;
  defaultStageFactor: number;
  localMortgageStageFactor: number;
}

export interface ResolvedDsrPolicy {
  version: DsrPolicyVersion;
  label: string;
  regulatoryLimit: number;
  baseStressRate: number;
  stageFactor: number;
  rateTypeFactor: number;
  appliedStressRate: number;
  stressRateReason: string;
  notes: string[];
}

export interface AnnualDebtService {
  annualPrincipal: number;
  annualInterest: number;
  totalAnnualDebtService: number;
  paymentMonths: number;
}

export interface DsrCalculationInput {
  annualIncome: number;
  policyContext: DsrPolicyContext;
  existingLoans: DsrLoanInput[];
  newLoan: DsrLoanInput;
}

export interface MaxLoanEstimate {
  maxLoanAmount: number;
  availableAnnualDebtService: number;
  stressedAnnualDebtService: number;
}

export interface DsrCalculationResult {
  currentDsr: number;
  stressedDsr: number;
  regulatoryLimit: number;
  remainingCapacity: number;
  existingAnnualDebtService: number;
  currentAnnualDebtService: number;
  stressedAnnualDebtService: number;
  currentNewLoanDebtService: AnnualDebtService;
  stressedNewLoanDebtService: AnnualDebtService;
  existingLoanDebtServices: Array<AnnualDebtService & { loanId: string; name: string }>;
  policy: ResolvedDsrPolicy;
  maxLoanEstimate: MaxLoanEstimate;
}

import { calculateLoan } from '../loan-calculator';
import { getDsrPolicyPreset } from './policies';
import type {
  AnnualDebtService,
  DsrCalculationInput,
  DsrCalculationResult,
  DsrLoanInput,
  DsrPolicyContext,
  MaxLoanEstimate,
  ResolvedDsrPolicy,
} from './types';

function roundCurrency(value: number): number {
  return Math.round(value);
}

function roundRatio(value: number): number {
  return Number(value.toFixed(2));
}

function getIntroductoryRatio(loan: DsrLoanInput): number {
  if (!loan.introductoryPeriodMonths || loan.termMonths <= 0) {
    return 0;
  }

  return loan.introductoryPeriodMonths / loan.termMonths;
}

function getMortgageRateTypeFactor(loan: DsrLoanInput): number {
  if (loan.rateType === 'fixed') {
    return 0;
  }

  if (loan.rateType === 'variable') {
    return 1;
  }

  const introductoryPeriodMonths = loan.introductoryPeriodMonths ?? 0;
  const introductoryRatio = getIntroductoryRatio(loan);

  if (loan.rateType === 'mixed') {
    if (introductoryPeriodMonths < 60) {
      return 1;
    }
    if (introductoryRatio < 0.3) {
      return 0.8;
    }
    if (introductoryRatio < 0.5) {
      return 0.6;
    }
    if (introductoryRatio < 0.7) {
      return 0.4;
    }
    return 0;
  }

  if (introductoryPeriodMonths < 60) {
    return 0.4;
  }
  if (introductoryRatio < 0.3) {
    return 0.3;
  }
  if (introductoryRatio < 0.5) {
    return 0.2;
  }
  if (introductoryRatio < 0.7) {
    return 0.1;
  }
  return 0;
}

function getCreditRateTypeFactor(loan: DsrLoanInput): number {
  if (loan.rateType !== 'fixed') {
    return 1;
  }

  if (loan.termMonths >= 60) {
    return 0;
  }
  if (loan.termMonths >= 36) {
    return 0.6;
  }
  return 1;
}

function getRateTypeFactor(loan: DsrLoanInput): number {
  if (loan.loanType === 'mortgage') {
    return getMortgageRateTypeFactor(loan);
  }

  return getCreditRateTypeFactor(loan);
}

function getTotalCreditBalance(context: DsrPolicyContext): number {
  return [...context.existingLoans, context.newLoan]
    .filter(loan => loan.loanType === 'credit')
    .reduce((sum, loan) => sum + loan.balance, 0);
}

export function resolveDsrPolicy(context: DsrPolicyContext): ResolvedDsrPolicy {
  const preset = getDsrPolicyPreset(context.policyVersion);
  const { newLoan } = context;

  if (newLoan.loanType === 'credit') {
    const totalCreditBalance = getTotalCreditBalance(context);

    if (totalCreditBalance <= preset.creditThreshold) {
      return {
        version: preset.version,
        label: preset.label,
        regulatoryLimit: preset.regulatoryLimit,
        baseStressRate: preset.generalStressRateFloor,
        stageFactor: preset.defaultStageFactor,
        rateTypeFactor: 0,
        appliedStressRate: 0,
        stressRateReason: '신용대출 합산 잔액 기준 미충족',
        notes: [
          '신용대출 잔액 합계가 1억원을 초과하는 경우에만 스트레스 DSR이 적용됩니다.',
        ],
      };
    }

    const rateTypeFactor = getRateTypeFactor(newLoan);
    const appliedStressRate = roundRatio(
      preset.generalStressRateFloor * preset.defaultStageFactor * rateTypeFactor
    );

    return {
      version: preset.version,
      label: preset.label,
      regulatoryLimit: preset.regulatoryLimit,
      baseStressRate: preset.generalStressRateFloor,
      stageFactor: preset.defaultStageFactor,
      rateTypeFactor,
      appliedStressRate,
      stressRateReason: '신용대출 합산 잔액 1억원 초과',
      notes: [
        '고정금리 만기에 따라 신용대출 스트레스 금리 반영 비율이 달라집니다.',
      ],
    };
  }

  const isCapitalMortgage = newLoan.regionType === 'capital';
  const baseStressRate = isCapitalMortgage
    ? preset.capitalMortgageStressRateFloor
    : preset.generalStressRateFloor;
  const stageFactor = isCapitalMortgage
    ? preset.defaultStageFactor
    : preset.localMortgageStageFactor;
  const rateTypeFactor = getRateTypeFactor(newLoan);
  const appliedStressRate = roundRatio(
    baseStressRate * stageFactor * rateTypeFactor
  );

  return {
    version: preset.version,
    label: preset.label,
    regulatoryLimit: preset.regulatoryLimit,
    baseStressRate,
    stageFactor,
    rateTypeFactor,
    appliedStressRate,
    stressRateReason: isCapitalMortgage
      ? '수도권·규제지역 주담대 3단계 하한'
      : '지방 주담대 2단계 수준 유지',
    notes: [
      isCapitalMortgage
        ? '수도권·규제지역 주담대는 3.0% 하한을 우선 적용합니다.'
        : '지방 주담대는 2026년 상반기에도 2단계 수준을 유지합니다.',
    ],
  };
}

export function calculateAnnualDebtService(
  loan: DsrLoanInput,
  extraStressRate: number = 0
): AnnualDebtService {
  if (loan.balance <= 0 || loan.termMonths <= 0) {
    return {
      annualPrincipal: 0,
      annualInterest: 0,
      totalAnnualDebtService: 0,
      paymentMonths: 0,
    };
  }

  const result = calculateLoan(
    loan.balance,
    loan.annualRate + extraStressRate,
    loan.termMonths,
    loan.repaymentMethod,
    true
  );
  const schedule = result.schedule ?? [];
  const firstYear = schedule.slice(0, 12);

  const annualPrincipal = roundCurrency(
    firstYear.reduce((sum, item) => sum + item.principal, 0)
  );
  const annualInterest = roundCurrency(
    firstYear.reduce((sum, item) => sum + item.interest, 0)
  );

  return {
    annualPrincipal,
    annualInterest,
    totalAnnualDebtService: annualPrincipal + annualInterest,
    paymentMonths: firstYear.length,
  };
}

function getExistingAnnualDebtService(loans: DsrLoanInput[]): {
  total: number;
  details: Array<AnnualDebtService & { loanId: string; name: string }>;
} {
  const details = loans.map(loan => {
    const annual = calculateAnnualDebtService(loan);

    return {
      loanId: loan.id,
      name: loan.name,
      ...annual,
    };
  });

  return {
    total: details.reduce(
      (sum, detail) => sum + detail.totalAnnualDebtService,
      0
    ),
    details,
  };
}

export function estimateMaxNewLoanAmount(
  input: DsrCalculationInput
): MaxLoanEstimate {
  const { total: existingAnnualDebtService } = getExistingAnnualDebtService(
    input.existingLoans
  );
  const preset = getDsrPolicyPreset(input.policyContext.policyVersion);
  const availableAnnualDebtService = roundCurrency(
    input.annualIncome * (preset.regulatoryLimit / 100) -
      existingAnnualDebtService
  );

  if (availableAnnualDebtService <= 0) {
    return {
      maxLoanAmount: 0,
      availableAnnualDebtService,
      stressedAnnualDebtService: 0,
    };
  }

  let low = 0;
  let high = 1_000_000_000_000;
  let bestAnnualDebtService = 0;

  for (let index = 0; index < 60; index += 1) {
    const middle = Math.floor((low + high) / 2);
    const candidateLoan = {
      ...input.newLoan,
      balance: middle,
    };
    const policy = resolveDsrPolicy({
      ...input.policyContext,
      existingLoans: input.existingLoans,
      newLoan: candidateLoan,
    });
    const annualDebtService = calculateAnnualDebtService(
      candidateLoan,
      policy.appliedStressRate
    ).totalAnnualDebtService;

    if (annualDebtService <= availableAnnualDebtService) {
      low = middle;
      bestAnnualDebtService = annualDebtService;
      continue;
    }

    high = middle;
  }

  return {
    maxLoanAmount: low,
    availableAnnualDebtService,
    stressedAnnualDebtService: bestAnnualDebtService,
  };
}

export function calculateDsrSummary(
  input: DsrCalculationInput
): DsrCalculationResult {
  const policy = resolveDsrPolicy({
    ...input.policyContext,
    existingLoans: input.existingLoans,
    newLoan: input.newLoan,
  });
  const existing = getExistingAnnualDebtService(input.existingLoans);
  const currentNewLoanDebtService = calculateAnnualDebtService(input.newLoan);
  const stressedNewLoanDebtService = calculateAnnualDebtService(
    input.newLoan,
    policy.appliedStressRate
  );
  const currentAnnualDebtService =
    existing.total + currentNewLoanDebtService.totalAnnualDebtService;
  const stressedAnnualDebtService =
    existing.total + stressedNewLoanDebtService.totalAnnualDebtService;
  const maxLoanEstimate = estimateMaxNewLoanAmount(input);
  const remainingCapacity =
    maxLoanEstimate.availableAnnualDebtService -
    stressedNewLoanDebtService.totalAnnualDebtService;

  return {
    currentDsr: roundRatio(
      (currentAnnualDebtService / input.annualIncome) * 100
    ),
    stressedDsr: roundRatio(
      (stressedAnnualDebtService / input.annualIncome) * 100
    ),
    regulatoryLimit: policy.regulatoryLimit,
    remainingCapacity: roundCurrency(remainingCapacity),
    existingAnnualDebtService: existing.total,
    currentAnnualDebtService,
    stressedAnnualDebtService,
    currentNewLoanDebtService,
    stressedNewLoanDebtService,
    existingLoanDebtServices: existing.details,
    policy,
    maxLoanEstimate,
  };
}

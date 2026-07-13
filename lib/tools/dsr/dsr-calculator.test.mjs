import assert from 'node:assert/strict';
import { register } from 'node:module';
import test from 'node:test';

const repositoryRoot = new URL('../../../', import.meta.url).href;
const resolverSource = `
const repositoryRoot = ${JSON.stringify(repositoryRoot)};

export async function resolve(specifier, context, nextResolve) {
  const candidates = [];

  if (specifier.startsWith('@/')) {
    const baseUrl = new URL(specifier.slice(2), repositoryRoot).href;
    candidates.push(baseUrl, baseUrl + '.ts', baseUrl + '.tsx', baseUrl + '/index.ts', baseUrl + '/index.tsx');
  } else if (specifier.startsWith('./') || specifier.startsWith('../')) {
    const baseUrl = new URL(specifier, context.parentURL).href;
    candidates.push(baseUrl, baseUrl + '.ts', baseUrl + '.tsx', baseUrl + '/index.ts', baseUrl + '/index.tsx');
  } else {
    return nextResolve(specifier, context);
  }

  let resolutionError;
  for (const candidate of candidates) {
    try {
      return await nextResolve(candidate, context);
    } catch (error) {
      resolutionError = error;
    }
  }

  throw resolutionError;
}
`;

register(
  `data:text/javascript,${encodeURIComponent(resolverSource)}`,
  import.meta.url
);

const { calculateAnnualDebtService, calculateDsrSummary, resolveDsrPolicy } =
  await import('./index.ts');

function createLoan(overrides = {}) {
  return {
    id: 'new-loan',
    name: '신규 대출',
    loanType: 'mortgage',
    balance: 300_000_000,
    annualRate: 4.2,
    termMonths: 360,
    repaymentMethod: 'equal-payment',
    rateType: 'variable',
    regionType: 'capital',
    ...overrides,
  };
}

function resolvePolicy(newLoan, existingLoans = []) {
  return resolveDsrPolicy({
    policyVersion: '2026-h1',
    lenderGroup: 'bank',
    existingLoans,
    newLoan,
  });
}

test('신용대출 합계가 1억원이면 스트레스 금리를 적용하지 않고 초과하면 적용한다', () => {
  const existingLoan = createLoan({
    id: 'existing-1',
    name: '보유 대출 1',
    loanType: 'credit',
    balance: 50_000_000,
    regionType: 'none',
  });

  assert.deepEqual(
    [50_000_000, 50_000_001].map(balance =>
      resolvePolicy(
        createLoan({ loanType: 'credit', balance, regionType: 'none' }),
        [existingLoan]
      )
    ),
    [
      {
        version: '2026-h1',
        label: '2026년 상반기 정책',
        regulatoryLimit: 40,
        baseStressRate: 1.5,
        stageFactor: 1,
        rateTypeFactor: 0,
        appliedStressRate: 0,
        stressRateReason: '신용대출 합산 잔액 기준 미충족',
        notes: [
          '신용대출 잔액 합계가 1억원을 초과하는 경우에만 스트레스 DSR이 적용됩니다.',
        ],
      },
      {
        version: '2026-h1',
        label: '2026년 상반기 정책',
        regulatoryLimit: 40,
        baseStressRate: 1.5,
        stageFactor: 1,
        rateTypeFactor: 1,
        appliedStressRate: 1.5,
        stressRateReason: '신용대출 합산 잔액 1억원 초과',
        notes: [
          '고정금리 만기에 따라 신용대출 스트레스 금리 반영 비율이 달라집니다.',
        ],
      },
    ]
  );
});

test('수도권과 지방 주담대는 현재 지역별 스트레스 금리 기준을 유지한다', () => {
  assert.deepEqual(
    ['capital', 'local'].map(regionType =>
      resolvePolicy(createLoan({ regionType }))
    ),
    [
      {
        version: '2026-h1',
        label: '2026년 상반기 정책',
        regulatoryLimit: 40,
        baseStressRate: 3,
        stageFactor: 1,
        rateTypeFactor: 1,
        appliedStressRate: 3,
        stressRateReason: '수도권·규제지역 주담대 3단계 하한',
        notes: ['수도권·규제지역 주담대는 3.0% 하한을 우선 적용합니다.'],
      },
      {
        version: '2026-h1',
        label: '2026년 상반기 정책',
        regulatoryLimit: 40,
        baseStressRate: 1.5,
        stageFactor: 0.5,
        rateTypeFactor: 1,
        appliedStressRate: 0.75,
        stressRateReason: '지방 주담대 2단계 수준 유지',
        notes: ['지방 주담대는 2026년 상반기에도 2단계 수준을 유지합니다.'],
      },
    ]
  );
});

test('혼합형과 주기형 주담대는 60개월과 30·50·70퍼센트 경계 계수를 유지한다', () => {
  const introductoryPeriods = [59, 60, 72, 120, 168];

  assert.deepEqual(
    ['mixed', 'periodic'].map(rateType => ({
      rateType,
      policies: introductoryPeriods.map(introductoryPeriodMonths => {
        const policy = resolvePolicy(
          createLoan({
            rateType,
            termMonths: 240,
            introductoryPeriodMonths,
          })
        );

        return {
          introductoryPeriodMonths,
          rateTypeFactor: policy.rateTypeFactor,
          appliedStressRate: policy.appliedStressRate,
        };
      }),
    })),
    [
      {
        rateType: 'mixed',
        policies: [
          {
            introductoryPeriodMonths: 59,
            rateTypeFactor: 1,
            appliedStressRate: 3,
          },
          {
            introductoryPeriodMonths: 60,
            rateTypeFactor: 0.8,
            appliedStressRate: 2.4,
          },
          {
            introductoryPeriodMonths: 72,
            rateTypeFactor: 0.6,
            appliedStressRate: 1.8,
          },
          {
            introductoryPeriodMonths: 120,
            rateTypeFactor: 0.4,
            appliedStressRate: 1.2,
          },
          {
            introductoryPeriodMonths: 168,
            rateTypeFactor: 0,
            appliedStressRate: 0,
          },
        ],
      },
      {
        rateType: 'periodic',
        policies: [
          {
            introductoryPeriodMonths: 59,
            rateTypeFactor: 0.4,
            appliedStressRate: 1.2,
          },
          {
            introductoryPeriodMonths: 60,
            rateTypeFactor: 0.3,
            appliedStressRate: 0.9,
          },
          {
            introductoryPeriodMonths: 72,
            rateTypeFactor: 0.2,
            appliedStressRate: 0.6,
          },
          {
            introductoryPeriodMonths: 120,
            rateTypeFactor: 0.1,
            appliedStressRate: 0.3,
          },
          {
            introductoryPeriodMonths: 168,
            rateTypeFactor: 0,
            appliedStressRate: 0,
          },
        ],
      },
    ]
  );
});

test('고정금리 신용대출은 36개월과 60개월 경계 계수를 유지한다', () => {
  assert.deepEqual(
    [35, 36, 60].map(termMonths => {
      const policy = resolvePolicy(
        createLoan({
          loanType: 'credit',
          balance: 100_000_001,
          rateType: 'fixed',
          regionType: 'none',
          termMonths,
        })
      );

      return {
        termMonths,
        rateTypeFactor: policy.rateTypeFactor,
        appliedStressRate: policy.appliedStressRate,
      };
    }),
    [
      { termMonths: 35, rateTypeFactor: 1, appliedStressRate: 1.5 },
      { termMonths: 36, rateTypeFactor: 0.6, appliedStressRate: 0.9 },
      { termMonths: 60, rateTypeFactor: 0, appliedStressRate: 0 },
    ]
  );
});

test('연간 원리금은 첫 12개월의 원금과 이자를 원 단위로 합산한다', () => {
  assert.deepEqual(
    calculateAnnualDebtService(
      createLoan({ balance: 100_000_000, annualRate: 5, termMonths: 24 })
    ),
    {
      annualPrincipal: 48_752_856,
      annualInterest: 3_892_812,
      totalAnnualDebtService: 52_645_668,
      paymentMonths: 12,
    }
  );
});

test('잔액이나 만기가 0 이하이면 연간 원리금은 0원이다', () => {
  assert.deepEqual(
    [
      createLoan({ balance: 0 }),
      createLoan({ balance: -1 }),
      createLoan({ termMonths: 0 }),
      createLoan({ termMonths: -1 }),
    ].map(calculateAnnualDebtService),
    Array.from({ length: 4 }, () => ({
      annualPrincipal: 0,
      annualInterest: 0,
      totalAnnualDebtService: 0,
      paymentMonths: 0,
    }))
  );
});

test('기본 주담대 시나리오는 현재 DSR과 최대 대출 한도 결과를 유지한다', () => {
  const newLoan = createLoan();

  assert.deepEqual(
    calculateDsrSummary({
      annualIncome: 60_000_000,
      policyContext: {
        policyVersion: '2026-h1',
        lenderGroup: 'bank',
        existingLoans: [],
        newLoan,
      },
      existingLoans: [],
      newLoan,
    }),
    {
      currentDsr: 29.34,
      stressedDsr: 40.73,
      regulatoryLimit: 40,
      remainingCapacity: -436_380,
      existingAnnualDebtService: 0,
      currentAnnualDebtService: 17_604_624,
      stressedAnnualDebtService: 24_436_380,
      currentNewLoanDebtService: {
        annualPrincipal: 5_102_096,
        annualInterest: 12_502_528,
        totalAnnualDebtService: 17_604_624,
        paymentMonths: 12,
      },
      stressedNewLoanDebtService: {
        annualPrincipal: 2_931_879,
        annualInterest: 21_504_501,
        totalAnnualDebtService: 24_436_380,
        paymentMonths: 12,
      },
      existingLoanDebtServices: [],
      policy: {
        version: '2026-h1',
        label: '2026년 상반기 정책',
        regulatoryLimit: 40,
        baseStressRate: 3,
        stageFactor: 1,
        rateTypeFactor: 1,
        appliedStressRate: 3,
        stressRateReason: '수도권·규제지역 주담대 3단계 하한',
        notes: ['수도권·규제지역 주담대는 3.0% 하한을 우선 적용합니다.'],
      },
      maxLoanEstimate: {
        maxLoanAmount: 294_642_787,
        availableAnnualDebtService: 24_000_000,
        stressedAnnualDebtService: 24_000_000,
      },
    }
  );
});

test('연소득과 상환액이 모두 0이면 현재 비율 결과는 NaN이다', () => {
  const newLoan = createLoan({ balance: 0 });
  const result = calculateDsrSummary({
    annualIncome: 0,
    policyContext: {
      policyVersion: '2026-h1',
      lenderGroup: 'bank',
      existingLoans: [],
      newLoan,
    },
    existingLoans: [],
    newLoan,
  });

  assert.deepEqual(
    {
      currentDsr: result.currentDsr,
      stressedDsr: result.stressedDsr,
      maxLoanEstimate: result.maxLoanEstimate,
    },
    {
      currentDsr: Number.NaN,
      stressedDsr: Number.NaN,
      maxLoanEstimate: {
        maxLoanAmount: 0,
        availableAnnualDebtService: 0,
        stressedAnnualDebtService: 0,
      },
    }
  );
});

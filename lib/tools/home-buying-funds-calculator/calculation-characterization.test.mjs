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

const {
  calculateAcquisitionTax,
  calculateCleaningFee,
  calculateDefenseFundAmount,
  calculateHomeBuyingFunds,
  calculateInteriorFee,
  calculateNationalHousingBond,
  calculateStampTax,
} = await import('./index.ts');
const { PRESET_LABELS } =
  await import('../../../components/tools/home-buying-funds-calculator/constants.ts');

function createInput(overrides = {}) {
  return {
    salePrice: 0,
    loanAmount: 0,
    currentCash: 0,
    downPaymentRatio: 10,
    hasDefenseFund: false,
    hasDownPaymentPaid: false,
    isAdjustedArea: false,
    houseCount: 0,
    isOver85m2: false,
    isFirstTime: false,
    isTempTwoHouse: false,
    standardPrice: 0,
    regionalType: 'seoul',
    brokerageFeePreset: 'auto',
    lawyerFeePreset: 'auto',
    cleaningFeePreset: 'none',
    movingFeePreset: 'small',
    interiorFeePreset: 'none',
    contingencyRatio: 5,
    ...overrides,
  };
}

test('공개 기본 입력은 현재 157만5천원의 필요자금을 계산한다', () => {
  const result = calculateHomeBuyingFunds(createInput());

  assert.deepEqual(
    {
      totalRequiredEquity: result.totalRequiredEquity,
      minRequiredCash: result.minRequiredCash,
      recommendedCash: result.recommendedCash,
      cashWithoutLoan: result.cashWithoutLoan,
      cashGap: result.cashGap,
      breakdown: result.breakdown.map(item => ({
        id: item.id,
        amount: item.amount,
        calculationMode: item.calculationMode,
      })),
    },
    {
      totalRequiredEquity: 1_575_000,
      minRequiredCash: 1_575_000,
      recommendedCash: 1_575_000,
      cashWithoutLoan: 1_575_000,
      cashGap: -1_575_000,
      breakdown: [
        { id: 'down-payment', amount: 0, calculationMode: 'auto' },
        { id: 'acquisition-tax', amount: 0, calculationMode: 'auto' },
        { id: 'local-education-tax', amount: 0, calculationMode: 'auto' },
        { id: 'rural-special-tax', amount: 0, calculationMode: 'auto' },
        { id: 'registration-tax', amount: 0, calculationMode: 'auto' },
        { id: 'stamp-tax', amount: 0, calculationMode: 'auto' },
        { id: 'national-housing-bond', amount: 0, calculationMode: 'auto' },
        { id: 'brokerage-fee', amount: 0, calculationMode: 'auto' },
        { id: 'lawyer-fee', amount: 500_000, calculationMode: 'auto' },
        { id: 'management-deposit', amount: 0, calculationMode: 'manual' },
        { id: 'moving-fee', amount: 1_000_000, calculationMode: 'auto' },
        { id: 'contingency', amount: 75_000, calculationMode: 'auto' },
        { id: 'balance', amount: 0, calculationMode: 'auto' },
      ],
    }
  );
});

test('계약금은 소수 원 단위를 버림한다', () => {
  const result = calculateHomeBuyingFunds(
    createInput({
      salePrice: 123_456_789,
      downPaymentRatio: 10.5,
      brokerageFeePreset: 'manual',
      lawyerFeePreset: 'manual',
      movingFeePreset: 'manual',
      manualAcquisitionTax: 0,
      manualLocalEducationTax: 0,
      manualRuralSpecialTax: 0,
      manualRegistrationTax: 0,
      manualNationalHousingBond: 0,
      manualBrokerageFee: 0,
      manualLawyerFee: 0,
      manualManagementDeposit: 0,
      manualMovingFee: 0,
      contingencyRatio: 0,
    })
  );

  assert.deepEqual(
    result.breakdown.find(item => item.id === 'down-payment'),
    {
      id: 'down-payment',
      stage: 'contract',
      category: 'other',
      label: '계약금',
      amount: 12_962_962,
      calculationMode: 'auto',
      confidence: 'high',
      formula: '매매가 × 10.5%',
    }
  );
});

test('취득세와 인지세는 현재 구간 경계 결과를 유지한다', () => {
  assert.deepEqual(
    {
      acquisitionTax: [
        60_000_000, 60_000_001, 600_000_000, 600_000_001, 900_000_000,
        900_000_001,
      ].map(salePrice => [
        salePrice,
        calculateAcquisitionTax(createInput({ salePrice })),
      ]),
      stampTax: [
        0, 10_000_000, 10_000_001, 50_000_000, 50_000_001, 100_000_000,
        100_000_001,
      ].map(loanAmount => [loanAmount, calculateStampTax(loanAmount)]),
    },
    {
      acquisitionTax: [
        [60_000_000, 600_000],
        [60_000_001, 600_000.013],
        [600_000_000, 7_620_000],
        [600_000_001, 7_620_000.028],
        [900_000_000, 16_020_000],
        [900_000_001, 16_020_000.04],
      ],
      stampTax: [
        [0, 0],
        [10_000_000, 0],
        [10_000_001, 50_000],
        [50_000_000, 50_000],
        [50_000_001, 100_000],
        [100_000_000, 100_000],
        [100_000_001, 150_000],
      ],
    }
  );
});

test('국민주택채권은 수도권 여부와 모든 가격 구간 경계를 유지한다', () => {
  const standardPrices = [
    19_999_999, 20_000_000, 49_999_999, 50_000_000, 99_999_999, 100_000_000,
    159_999_999, 160_000_000, 259_999_999, 260_000_000, 599_999_999,
    600_000_000,
  ];

  assert.deepEqual(
    {
      metro: standardPrices.map(standardPrice => [
        standardPrice,
        calculateNationalHousingBond(standardPrice, true),
      ]),
      other: standardPrices.map(standardPrice => [
        standardPrice,
        calculateNationalHousingBond(standardPrice, false),
      ]),
    },
    {
      metro: [
        [19_999_999, 0],
        [20_000_000, 31_200],
        [49_999_999, 77_999],
        [50_000_000, 114_000],
        [99_999_999, 227_999],
        [100_000_000, 252_000],
        [159_999_999, 403_199],
        [160_000_000, 441_600],
        [259_999_999, 717_599],
        [260_000_000, 811_200],
        [599_999_999, 1_871_999],
        [600_000_000, 2_232_000],
      ],
      other: [
        [19_999_999, 0],
        [20_000_000, 31_200],
        [49_999_999, 77_999],
        [50_000_000, 84_000],
        [99_999_999, 167_999],
        [100_000_000, 192_000],
        [159_999_999, 307_199],
        [160_000_000, 345_600],
        [259_999_999, 561_599],
        [260_000_000, 655_200],
        [599_999_999, 1_511_999],
        [600_000_000, 1_872_000],
      ],
    }
  );
});

test('방공제는 네 지역의 고정 금액을 반환한다', () => {
  assert.deepEqual(
    ['seoul', 'overconcentration', 'metro', 'other'].map(regionalType => [
      regionalType,
      calculateDefenseFundAmount(regionalType),
    ]),
    [
      ['seoul', 55_000_000],
      ['overconcentration', 50_000_000],
      ['metro', 28_000_000],
      ['other', 20_000_000],
    ]
  );
});

test('방공제가 대출금보다 크면 음수 실제 대출금을 그대로 잔금에 반영한다', () => {
  const result = calculateHomeBuyingFunds(
    createInput({
      salePrice: 100_000_000,
      loanAmount: 10_000_000,
      hasDefenseFund: true,
      regionalType: 'seoul',
      brokerageFeePreset: 'manual',
      lawyerFeePreset: 'manual',
      movingFeePreset: 'manual',
      manualAcquisitionTax: 0,
      manualLocalEducationTax: 0,
      manualRuralSpecialTax: 0,
      manualRegistrationTax: 0,
      manualNationalHousingBond: 0,
      manualBrokerageFee: 0,
      manualLawyerFee: 0,
      manualManagementDeposit: 0,
      manualMovingFee: 0,
      contingencyRatio: 0,
    })
  );

  assert.deepEqual(
    result.breakdown.find(item => item.id === 'balance'),
    {
      id: 'balance',
      stage: 'balance',
      category: 'other',
      label: '잔금',
      amount: 135_000_000,
      calculationMode: 'auto',
      confidence: 'high',
      formula: '매매가 - 계약금 - 실제받는대출금 (방공제 차감 후)',
    }
  );
});

test('수동 비용 0원은 금액에는 반영하지만 현재 계산 모드는 auto로 표시한다', () => {
  const result = calculateHomeBuyingFunds(
    createInput({
      salePrice: 500_000_000,
      standardPrice: 350_000_000,
      brokerageFeePreset: 'manual',
      lawyerFeePreset: 'manual',
      cleaningFeePreset: 'manual',
      movingFeePreset: 'manual',
      interiorFeePreset: 'manual',
      manualAcquisitionTax: 0,
      manualLocalEducationTax: 0,
      manualRuralSpecialTax: 0,
      manualRegistrationTax: 0,
      manualNationalHousingBond: 0,
      manualBrokerageFee: 0,
      manualLawyerFee: 0,
      manualManagementDeposit: 0,
      manualCleaningFee: 0,
      manualMovingFee: 0,
      manualInteriorFee: 0,
      contingencyRatio: 0,
    })
  );

  assert.deepEqual(
    result.breakdown
      .filter(item =>
        [
          'acquisition-tax',
          'local-education-tax',
          'rural-special-tax',
          'registration-tax',
          'national-housing-bond',
          'brokerage-fee',
          'lawyer-fee',
          'management-deposit',
        ].includes(item.id)
      )
      .map(item => ({
        id: item.id,
        amount: item.amount,
        calculationMode: item.calculationMode,
      })),
    [
      { id: 'acquisition-tax', amount: 0, calculationMode: 'auto' },
      { id: 'local-education-tax', amount: 0, calculationMode: 'auto' },
      { id: 'rural-special-tax', amount: 0, calculationMode: 'auto' },
      { id: 'registration-tax', amount: 0, calculationMode: 'auto' },
      { id: 'national-housing-bond', amount: 0, calculationMode: 'auto' },
      { id: 'brokerage-fee', amount: 0, calculationMode: 'auto' },
      { id: 'lawyer-fee', amount: 0, calculationMode: 'auto' },
      { id: 'management-deposit', amount: 0, calculationMode: 'manual' },
    ]
  );
});

test('청소·인테리어 프리셋 계산값과 현재 UI 표기값의 차이를 유지한다', () => {
  assert.deepEqual(
    {
      calculated: {
        cleaningBasic: calculateCleaningFee('basic'),
        interiorBasic: calculateInteriorFee(100_000_000, 'basic'),
        interiorStandard: calculateInteriorFee(100_000_000, 'standard'),
        interiorPremium: calculateInteriorFee(100_000_000, 'premium'),
      },
      displayed: {
        cleaningBasic: PRESET_LABELS.cleaningFee.basic,
        interiorBasic: PRESET_LABELS.interiorFee.basic,
        interiorStandard: PRESET_LABELS.interiorFee.standard,
        interiorPremium: PRESET_LABELS.interiorFee.premium,
      },
    },
    {
      calculated: {
        cleaningBasic: 200_000,
        interiorBasic: 5_000_000,
        interiorStandard: 10_000_000,
        interiorPremium: 15_000_000,
      },
      displayed: {
        cleaningBasic: '기본 (30만원)',
        interiorBasic: '기본 (매매가 3%)',
        interiorStandard: '표준 (매매가 5%)',
        interiorPremium: '프리미엄 (매매가 8%)',
      },
    }
  );
});

import assert from 'node:assert/strict';
import { register } from 'node:module';
import test from 'node:test';

const repositoryRoot = new URL('../../../../', import.meta.url).href;
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

const parsers = await import('./parsers.ts');

const QUERY_PARSERS = {
  salePrice: parsers.salePriceParser,
  loanAmount: parsers.loanAmountParser,
  currentCash: parsers.currentCashParser,
  downPaymentRatio: parsers.downPaymentRatioParser,
  hasDefenseFund: parsers.hasDefenseFundParser,
  hasDownPaymentPaid: parsers.hasDownPaymentPaidParser,
  isAdjustedArea: parsers.isAdjustedAreaParser,
  houseCount: parsers.houseCountParser,
  isOver85m2: parsers.isOver85m2Parser,
  isFirstTime: parsers.isFirstTimeParser,
  isTempTwoHouse: parsers.isTempTwoHouseParser,
  standardPrice: parsers.standardPriceParser,
  regionalType: parsers.regionalTypeParser,
  brokerageFeePreset: parsers.brokerageFeePresetParser,
  lawyerFeePreset: parsers.lawyerFeePresetParser,
  cleaningFeePreset: parsers.cleaningFeePresetParser,
  movingFeePreset: parsers.movingFeePresetParser,
  interiorFeePreset: parsers.interiorFeePresetParser,
  manualAcquisitionTax: parsers.manualAcquisitionTaxParser,
  manualLocalEducationTax: parsers.manualLocalEducationTaxParser,
  manualRuralSpecialTax: parsers.manualRuralSpecialTaxParser,
  manualRegistrationTax: parsers.manualRegistrationTaxParser,
  manualNationalHousingBond: parsers.manualNationalHousingBondParser,
  manualBrokerageFee: parsers.manualBrokerageFeeParser,
  manualLawyerFee: parsers.manualLawyerFeeParser,
  manualManagementDeposit: parsers.manualManagementDepositParser,
  manualCleaningFee: parsers.manualCleaningFeeParser,
  manualMovingFee: parsers.manualMovingFeeParser,
  manualInteriorFee: parsers.manualInteriorFeeParser,
  manualDefenseFundAmount: parsers.manualDefenseFundAmountParser,
  contingencyRatio: parsers.contingencyRatioParser,
};

function decodeAbsentQuery() {
  return Object.fromEntries(
    Object.entries(QUERY_PARSERS).map(([queryKey, parser]) => [
      queryKey,
      parser.parseServerSide(null),
    ])
  );
}

test('query가 없으면 31개 입력을 현재 초기화 상태로 복구한다', () => {
  assert.deepEqual(decodeAbsentQuery(), {
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
    manualAcquisitionTax: null,
    manualLocalEducationTax: null,
    manualRuralSpecialTax: null,
    manualRegistrationTax: null,
    manualNationalHousingBond: null,
    manualBrokerageFee: null,
    manualLawyerFee: null,
    manualManagementDeposit: null,
    manualCleaningFee: null,
    manualMovingFee: null,
    manualInteriorFee: null,
    manualDefenseFundAmount: null,
    contingencyRatio: 5,
  });
});

test('31개 공개 query key는 수동 0원 값을 포함해 URL 문자열로 왕복한다', () => {
  const state = {
    salePrice: 500_000_000,
    loanAmount: 350_000_000,
    currentCash: 150_000_000,
    downPaymentRatio: 10.5,
    hasDefenseFund: true,
    hasDownPaymentPaid: true,
    isAdjustedArea: true,
    houseCount: 2,
    isOver85m2: true,
    isFirstTime: true,
    isTempTwoHouse: true,
    standardPrice: 350_000_000,
    regionalType: 'overconcentration',
    brokerageFeePreset: 'manual',
    lawyerFeePreset: 'manual',
    cleaningFeePreset: 'premium',
    movingFeePreset: 'large',
    interiorFeePreset: 'standard',
    manualAcquisitionTax: 0,
    manualLocalEducationTax: 10_000,
    manualRuralSpecialTax: 20_000,
    manualRegistrationTax: 30_000,
    manualNationalHousingBond: 40_000,
    manualBrokerageFee: 50_000,
    manualLawyerFee: 60_000,
    manualManagementDeposit: 70_000,
    manualCleaningFee: 80_000,
    manualMovingFee: 90_000,
    manualInteriorFee: 100_000,
    manualDefenseFundAmount: 0,
    contingencyRatio: 7.5,
  };
  const serializedEntries = Object.entries(QUERY_PARSERS).map(
    ([queryKey, parser]) => [queryKey, parser.serialize(state[queryKey])]
  );
  const serialized = new URLSearchParams(serializedEntries).toString();
  const hydrated = Object.fromEntries(
    serializedEntries.map(([queryKey, value]) => [
      queryKey,
      QUERY_PARSERS[queryKey].parse(value),
    ])
  );

  assert.deepEqual(
    {
      serialized,
      hydrated,
    },
    {
      serialized:
        'salePrice=500000000&loanAmount=350000000&currentCash=150000000&downPaymentRatio=10.5&hasDefenseFund=true&hasDownPaymentPaid=true&isAdjustedArea=true&houseCount=2&isOver85m2=true&isFirstTime=true&isTempTwoHouse=true&standardPrice=350000000&regionalType=overconcentration&brokerageFeePreset=manual&lawyerFeePreset=manual&cleaningFeePreset=premium&movingFeePreset=large&interiorFeePreset=standard&manualAcquisitionTax=0&manualLocalEducationTax=10000&manualRuralSpecialTax=20000&manualRegistrationTax=30000&manualNationalHousingBond=40000&manualBrokerageFee=50000&manualLawyerFee=60000&manualManagementDeposit=70000&manualCleaningFee=80000&manualMovingFee=90000&manualInteriorFee=100000&manualDefenseFundAmount=0&contingencyRatio=7.5',
      hydrated: state,
    }
  );
});

test('잘못된 enum과 숫자는 현재 parser별 기본값 또는 null로 복구한다', () => {
  assert.deepEqual(
    {
      regionalType: parsers.regionalTypeParser.parseServerSide('invalid'),
      brokerageFeePreset:
        parsers.brokerageFeePresetParser.parseServerSide('invalid'),
      lawyerFeePreset: parsers.lawyerFeePresetParser.parseServerSide('invalid'),
      cleaningFeePreset:
        parsers.cleaningFeePresetParser.parseServerSide('invalid'),
      movingFeePreset: parsers.movingFeePresetParser.parseServerSide('invalid'),
      interiorFeePreset:
        parsers.interiorFeePresetParser.parseServerSide('invalid'),
      salePrice: parsers.salePriceParser.parseServerSide('invalid'),
      contingencyRatio:
        parsers.contingencyRatioParser.parseServerSide('invalid'),
      manualAcquisitionTax:
        parsers.manualAcquisitionTaxParser.parseServerSide('invalid'),
    },
    {
      regionalType: 'seoul',
      brokerageFeePreset: 'auto',
      lawyerFeePreset: 'auto',
      cleaningFeePreset: 'none',
      movingFeePreset: 'small',
      interiorFeePreset: 'none',
      salePrice: 0,
      contingencyRatio: 5,
      manualAcquisitionTax: null,
    }
  );
});

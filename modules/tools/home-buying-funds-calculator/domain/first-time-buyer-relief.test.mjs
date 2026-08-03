import assert from 'node:assert/strict';
import test from 'node:test';

import { calculateAcquisitionTax } from '../public.ts';

// 「지방세특례제한법」 제36조의3(생애최초 주택 구입에 대한 취득세 감면)
// [시행 2026. 6. 2.] [법률 제21738호] 기준 동작을 검증한다.

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

test('무주택 생애최초 매수자가 8억 주택을 사면 감면이 적용된다', () => {
  // 기존 6억 상한 로직에서는 8억이 감면 대상에서 거부됐으나, 제36조의3의 상한은 12억원이다.
  const withoutRelief = calculateAcquisitionTax(
    createInput({ salePrice: 800_000_000, isFirstTime: false })
  );
  const withRelief = calculateAcquisitionTax(
    createInput({ salePrice: 800_000_000, isFirstTime: true })
  );

  assert.ok(
    withRelief < withoutRelief,
    '생애최초 감면 적용 시 취득세가 더 낮아야 한다'
  );
});

test('무주택 생애최초 매수자의 산출세액이 200만원 이하이면 취득세가 0이 된다', () => {
  // 1억원 주택: 산출세액 = 1억 × 1% = 100만원 (200만원 이하 → 면제)
  const result = calculateAcquisitionTax(
    createInput({ salePrice: 100_000_000, isFirstTime: true })
  );

  assert.equal(result, 0);
});

test('무주택 생애최초 매수자의 산출세액이 200만원을 넘으면 정확히 200만원만 공제된다', () => {
  // 5억원 주택: 산출세액 = 5억 × 1% = 500만원 → 500만원 - 200만원 = 300만원
  const result = calculateAcquisitionTax(
    createInput({ salePrice: 500_000_000, isFirstTime: true })
  );

  assert.equal(result, 3_000_000);
});

test('12억을 초과하면 생애최초 감면이 적용되지 않는다', () => {
  const overCap = calculateAcquisitionTax(
    createInput({ salePrice: 1_200_000_001, isFirstTime: true })
  );
  const withoutRelief = calculateAcquisitionTax(
    createInput({ salePrice: 1_200_000_001, isFirstTime: false })
  );

  assert.equal(overCap, withoutRelief);
});

test('1주택 보유자는 생애최초 감면을 받지 못한다', () => {
  const oneHouse = calculateAcquisitionTax(
    createInput({ salePrice: 500_000_000, isFirstTime: true, houseCount: 1 })
  );
  const oneHouseWithoutFirstTime = calculateAcquisitionTax(
    createInput({ salePrice: 500_000_000, isFirstTime: false, houseCount: 1 })
  );

  assert.equal(oneHouse, oneHouseWithoutFirstTime);
});

test('85㎡ 초과여도 생애최초 감면은 적용된다', () => {
  // 제36조의3에는 전용면적 요건이 없으므로 85㎡ 초과 여부와 무관하게 감면이 적용돼야 한다.
  const over85 = calculateAcquisitionTax(
    createInput({
      salePrice: 500_000_000,
      isFirstTime: true,
      isOver85m2: true,
    })
  );
  const under85 = calculateAcquisitionTax(
    createInput({
      salePrice: 500_000_000,
      isFirstTime: true,
      isOver85m2: false,
    })
  );

  assert.equal(over85, under85);
  assert.equal(over85, 3_000_000);
});

import test from 'node:test';
import assert from 'node:assert/strict';

import { calculateHomeBuyingFunds } from '../public.ts';

function calculateManagementDeposit(manualManagementDeposit) {
  const result = calculateHomeBuyingFunds({
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
    manualManagementDeposit,
  });

  return result.breakdown.find(item => item.id === 'management-deposit')
    ?.amount;
}

test('관리비예치금을 입력하지 않으면 결과에 30만원을 자동 반영하지 않는다', () => {
  assert.equal(calculateManagementDeposit(undefined), 0);
});

test('관리비예치금을 직접 입력하면 입력한 값으로 반영한다', () => {
  assert.equal(calculateManagementDeposit(450_000), 450_000);
});

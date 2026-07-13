import assert from 'node:assert/strict';
import test from 'node:test';

import {
  calculateDeposit,
  calculateInstallment,
} from './savings-calculator.ts';

const EMPTY_DEPOSIT_RESULT = {
  principal: 0,
  grossInterest: 0,
  taxAmount: 0,
  netInterest: 0,
  totalAmount: 0,
  months: 0,
};

const EMPTY_INSTALLMENT_RESULT = {
  totalPrincipal: 0,
  grossInterest: 0,
  taxAmount: 0,
  netInterest: 0,
  totalAmount: 0,
  months: 0,
};

test('예금 계산은 단리와 복리의 세후 수령액을 원 단위로 반환한다', () => {
  assert.deepEqual(
    {
      simple: calculateDeposit(10_000_000, 3.5, 12, 'simple', 'general'),
      compound: calculateDeposit(10_000_000, 3.5, 12, 'compound', 'general'),
    },
    {
      simple: {
        principal: 10_000_000,
        grossInterest: 350_000,
        taxAmount: 53_900,
        netInterest: 296_100,
        totalAmount: 10_296_100,
        months: 12,
      },
      compound: {
        principal: 10_000_000,
        grossInterest: 355_670,
        taxAmount: 54_773,
        netInterest: 300_896,
        totalAmount: 10_300_896,
        months: 12,
      },
    }
  );
});

test('예금 계산은 일반·우대·비과세와 사용자 우대세율을 구분한다', () => {
  assert.deepEqual(
    {
      general: calculateDeposit(10_000_000, 3.5, 12, 'simple', 'general'),
      taxBenefit: calculateDeposit(
        10_000_000,
        3.5,
        12,
        'simple',
        'tax-benefit'
      ),
      taxFree: calculateDeposit(10_000_000, 3.5, 12, 'simple', 'tax-free'),
      customTax: calculateDeposit(
        10_000_000,
        3.5,
        12,
        'simple',
        'tax-benefit',
        false,
        7.25
      ),
    },
    {
      general: {
        principal: 10_000_000,
        grossInterest: 350_000,
        taxAmount: 53_900,
        netInterest: 296_100,
        totalAmount: 10_296_100,
        months: 12,
      },
      taxBenefit: {
        principal: 10_000_000,
        grossInterest: 350_000,
        taxAmount: 33_250,
        netInterest: 316_750,
        totalAmount: 10_316_750,
        months: 12,
      },
      taxFree: {
        principal: 10_000_000,
        grossInterest: 350_000,
        taxAmount: 0,
        netInterest: 350_000,
        totalAmount: 10_350_000,
        months: 12,
      },
      customTax: {
        principal: 10_000_000,
        grossInterest: 350_000,
        taxAmount: 25_375,
        netInterest: 324_625,
        totalAmount: 10_324_625,
        months: 12,
      },
    }
  );
});

test('적금 계산은 단리와 복리의 세후 수령액을 원 단위로 반환한다', () => {
  assert.deepEqual(
    {
      simple: calculateInstallment(500_000, 4, 24, 'simple', 'general'),
      compound: calculateInstallment(500_000, 4, 24, 'compound', 'general'),
    },
    {
      simple: {
        totalPrincipal: 12_000_000,
        grossInterest: 500_000,
        taxAmount: 77_000,
        netInterest: 423_000,
        totalAmount: 12_423_000,
        months: 24,
      },
      compound: {
        totalPrincipal: 12_000_000,
        grossInterest: 513_015,
        taxAmount: 79_004,
        netInterest: 434_011,
        totalAmount: 12_434_011,
        months: 24,
      },
    }
  );
});

test('적금 계산은 일반·우대·비과세와 사용자 우대세율을 구분한다', () => {
  assert.deepEqual(
    {
      general: calculateInstallment(500_000, 4, 24, 'simple', 'general'),
      taxBenefit: calculateInstallment(500_000, 4, 24, 'simple', 'tax-benefit'),
      taxFree: calculateInstallment(500_000, 4, 24, 'simple', 'tax-free'),
      customTax: calculateInstallment(
        500_000,
        4,
        24,
        'simple',
        'tax-benefit',
        false,
        7.25
      ),
    },
    {
      general: {
        totalPrincipal: 12_000_000,
        grossInterest: 500_000,
        taxAmount: 77_000,
        netInterest: 423_000,
        totalAmount: 12_423_000,
        months: 24,
      },
      taxBenefit: {
        totalPrincipal: 12_000_000,
        grossInterest: 500_000,
        taxAmount: 47_500,
        netInterest: 452_500,
        totalAmount: 12_452_500,
        months: 24,
      },
      taxFree: {
        totalPrincipal: 12_000_000,
        grossInterest: 500_000,
        taxAmount: 0,
        netInterest: 500_000,
        totalAmount: 12_500_000,
        months: 24,
      },
      customTax: {
        totalPrincipal: 12_000_000,
        grossInterest: 500_000,
        taxAmount: 36_250,
        netInterest: 463_750,
        totalAmount: 12_463_750,
        months: 24,
      },
    }
  );
});

test('원금·납입금·기간·금리가 유효하지 않으면 빈 결과를 반환한다', () => {
  assert.deepEqual(
    {
      depositPrincipal: calculateDeposit(0, 3.5, 12),
      depositMonths: calculateDeposit(10_000_000, 3.5, 0),
      depositRate: calculateDeposit(10_000_000, -0.1, 12),
      installmentPayment: calculateInstallment(0, 4, 24),
      installmentMonths: calculateInstallment(500_000, 4, 0),
      installmentRate: calculateInstallment(500_000, -0.1, 24),
    },
    {
      depositPrincipal: EMPTY_DEPOSIT_RESULT,
      depositMonths: EMPTY_DEPOSIT_RESULT,
      depositRate: EMPTY_DEPOSIT_RESULT,
      installmentPayment: EMPTY_INSTALLMENT_RESULT,
      installmentMonths: EMPTY_INSTALLMENT_RESULT,
      installmentRate: EMPTY_INSTALLMENT_RESULT,
    }
  );
});

test('적금 단리 스케줄은 요약 이자와 다른 기존 누적이자 값을 유지한다', () => {
  const result = calculateInstallment(
    500_000,
    4,
    24,
    'simple',
    'general',
    true
  );

  assert.ok(result.schedule);
  assert.deepEqual(
    {
      summaryGrossInterest: result.grossInterest,
      scheduleLength: result.schedule.length,
      first: {
        principal: result.schedule[0].principal,
        interest: result.schedule[0].interest,
        accumulatedInterest: result.schedule[0].accumulatedInterest,
        balance: result.schedule[0].balance,
      },
      last: {
        principal: result.schedule.at(-1).principal,
        interest: result.schedule.at(-1).interest,
        accumulatedInterest: result.schedule.at(-1).accumulatedInterest,
        balance: result.schedule.at(-1).balance,
      },
      scheduleInterestSum: result.schedule.reduce(
        (sum, item) => sum + item.interest,
        0
      ),
      advancesOneMonthAtATime: result.schedule.slice(1).every((item, index) => {
        const previous = result.schedule[index];
        const previousMonthIndex = previous.year * 12 + previous.month;
        const currentMonthIndex = item.year * 12 + item.month;

        return currentMonthIndex === previousMonthIndex + 1;
      }),
    },
    {
      summaryGrossInterest: 500_000,
      scheduleLength: 24,
      first: {
        principal: 500_000,
        interest: 0,
        accumulatedInterest: 0,
        balance: 500_000,
      },
      last: {
        principal: 12_000_000,
        interest: 38_333,
        accumulatedInterest: 460_000,
        balance: 12_460_000,
      },
      scheduleInterestSum: 460_000,
      advancesOneMonthAtATime: true,
    }
  );
});

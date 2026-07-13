import assert from 'node:assert/strict';
import test from 'node:test';

import {
  calculatePrepaymentFee,
  formatDate,
  parseDate,
} from './prepayment-fee-calculator.ts';

const LOAN_DATE = new Date('2024-01-01T00:00:00.000Z');
const REPAYMENT_DATE = new Date('2024-06-01T00:00:00.000Z');
const MATURITY_DATE = new Date('2034-01-01T00:00:00.000Z');

test('정상 중도상환은 잔존일 비율로 수수료를 반환한다', () => {
  assert.deepEqual(
    calculatePrepaymentFee(
      50_000_000,
      1.5,
      LOAN_DATE,
      REPAYMENT_DATE,
      MATURITY_DATE,
      3
    ),
    {
      prepaymentFee: 718_793,
      remainingDays: 3_501,
      totalDays: 3_653,
      appliedFeeRate: 1.5,
      isExempted: false,
    }
  );
});

test('대출·상환·만기 날짜 순서가 잘못되면 빈 결과를 반환한다', () => {
  const emptyResult = {
    prepaymentFee: 0,
    remainingDays: 0,
    totalDays: 0,
    appliedFeeRate: 0,
    isExempted: false,
  };

  assert.deepEqual(
    {
      loanAfterRepayment: calculatePrepaymentFee(
        50_000_000,
        1.5,
        new Date('2024-07-01T00:00:00.000Z'),
        REPAYMENT_DATE,
        MATURITY_DATE,
        3
      ),
      repaymentAfterMaturity: calculatePrepaymentFee(
        50_000_000,
        1.5,
        LOAN_DATE,
        new Date('2035-01-01T00:00:00.000Z'),
        MATURITY_DATE,
        3
      ),
    },
    {
      loanAfterRepayment: emptyResult,
      repaymentAfterMaturity: emptyResult,
    }
  );
});

test('면제기간 0년은 정상 상환을 즉시 면제로 판정한다', () => {
  assert.deepEqual(
    calculatePrepaymentFee(
      50_000_000,
      1.5,
      LOAN_DATE,
      REPAYMENT_DATE,
      MATURITY_DATE,
      0
    ),
    {
      prepaymentFee: 0,
      remainingDays: 3_501,
      totalDays: 3_653,
      appliedFeeRate: 0,
      isExempted: true,
    }
  );
});

test('면제 종료 시각 직전에는 수수료를 적용하고 종료 시각부터 면제한다', () => {
  const maturityDate = new Date('2030-01-01T00:00:00.000Z');

  assert.deepEqual(
    {
      beforeBoundary: calculatePrepaymentFee(
        50_000_000,
        1.5,
        LOAN_DATE,
        new Date('2026-12-31T17:59:59.999Z'),
        maturityDate,
        3
      ),
      atBoundary: calculatePrepaymentFee(
        50_000_000,
        1.5,
        LOAN_DATE,
        new Date('2026-12-31T18:00:00.000Z'),
        maturityDate,
        3
      ),
    },
    {
      beforeBoundary: {
        prepaymentFee: 375_000,
        remainingDays: 1_096,
        totalDays: 2_192,
        appliedFeeRate: 1.5,
        isExempted: false,
      },
      atBoundary: {
        prepaymentFee: 0,
        remainingDays: 1_096,
        totalDays: 2_192,
        appliedFeeRate: 0,
        isExempted: true,
      },
    }
  );
});

test('공개 날짜 함수는 유효한 날짜를 파싱·포맷하고 잘못된 입력은 거부한다', () => {
  assert.deepEqual(
    {
      parsedDate: parseDate('2024-01-31')?.toISOString(),
      emptyDate: parseDate(''),
      invalidDate: parseDate('not-a-date'),
      formattedDate: formatDate(new Date(2024, 0, 9, 12)),
    },
    {
      parsedDate: '2024-01-31T00:00:00.000Z',
      emptyDate: null,
      invalidDate: null,
      formattedDate: '2024-01-09',
    }
  );
});

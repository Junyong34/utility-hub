import assert from 'node:assert/strict';
import test from 'node:test';

import {
  calculateEqualPayment,
  calculateEqualPrincipal,
  calculateLoan,
  calculateLumpSum,
} from '../public.ts';

const REPRESENTATIVE_LOAN = {
  principal: 100_000_000,
  annualRate: 3.5,
  months: 360,
};

function summarizeScheduleItem(item) {
  return {
    monthlyPayment: item.monthlyPayment,
    principal: item.principal,
    interest: item.interest,
    remainingBalance: item.remainingBalance,
  };
}

function summarizeSchedule(result) {
  assert.ok(result.schedule);

  return {
    length: result.schedule.length,
    first: summarizeScheduleItem(result.schedule[0]),
    last: summarizeScheduleItem(result.schedule.at(-1)),
    sums: {
      payment: result.schedule.reduce(
        (sum, item) => sum + item.monthlyPayment,
        0
      ),
      principal: result.schedule.reduce((sum, item) => sum + item.principal, 0),
      interest: result.schedule.reduce((sum, item) => sum + item.interest, 0),
    },
    advancesOneMonthAtATime: result.schedule.slice(1).every((item, index) => {
      const previous = result.schedule[index];
      const previousMonthIndex = previous.year * 12 + previous.month;
      const currentMonthIndex = item.year * 12 + item.month;

      return currentMonthIndex === previousMonthIndex + 1;
    }),
  };
}

test('공개 상환 함수는 대표 대출 조건의 요약 금액을 원 단위로 반환한다', () => {
  const { principal, annualRate, months } = REPRESENTATIVE_LOAN;

  assert.deepEqual(
    {
      equalPayment: calculateEqualPayment(principal, annualRate, months),
      equalPrincipal: calculateEqualPrincipal(principal, annualRate, months),
      lumpSum: calculateLumpSum(principal, annualRate, months),
    },
    {
      equalPayment: {
        monthlyPayment: 449_045,
        totalPayment: 161_656_088,
        totalInterest: 61_656_088,
        months: 360,
      },
      equalPrincipal: {
        monthlyPayment: 569_444,
        totalPayment: 152_645_833,
        totalInterest: 52_645_833,
        months: 360,
      },
      lumpSum: {
        monthlyPayment: 291_667,
        totalPayment: 205_000_000,
        totalInterest: 105_000_000,
        months: 360,
      },
    }
  );
});

test('통합 계산 함수는 금리 0퍼센트에서도 상환 방식별 기존 결과를 유지한다', () => {
  const methods = ['equal-payment', 'equal-principal', 'lump-sum'];

  assert.deepEqual(
    Object.fromEntries(
      methods.map(method => [method, calculateLoan(100_000_000, 0, 60, method)])
    ),
    {
      'equal-payment': {
        monthlyPayment: 1_666_667,
        totalPayment: 100_000_000,
        totalInterest: 0,
        months: 60,
      },
      'equal-principal': {
        monthlyPayment: 1_666_667,
        totalPayment: 100_000_000,
        totalInterest: 0,
        months: 60,
      },
      'lump-sum': {
        monthlyPayment: 0,
        totalPayment: 100_000_000,
        totalInterest: 0,
        months: 60,
      },
    }
  );
});

test('통합 계산 함수는 상환 방식을 생략하면 원리금균등 결과를 반환한다', () => {
  assert.deepEqual(calculateLoan(100_000_000, 3.5, 360), {
    monthlyPayment: 449_045,
    totalPayment: 161_656_088,
    totalInterest: 61_656_088,
    months: 360,
  });
});

test('원금이나 기간이 유효하지 않으면 계산 결과를 0으로 반환한다', () => {
  const emptyResult = {
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    months: 0,
  };

  assert.deepEqual(
    {
      zeroPrincipal: calculateLoan(0, 3.5, 360),
      negativePrincipal: calculateLoan(-1, 3.5, 360),
      zeroMonths: calculateLoan(100_000_000, 3.5, 0),
      negativeMonths: calculateLoan(100_000_000, 3.5, -1),
    },
    {
      zeroPrincipal: emptyResult,
      negativePrincipal: emptyResult,
      zeroMonths: emptyResult,
      negativeMonths: emptyResult,
    }
  );
});

test('월별 스케줄은 기존 길이와 첫·마지막 금액 및 반올림 합계를 유지한다', () => {
  const { principal, annualRate, months } = REPRESENTATIVE_LOAN;
  const methods = ['equal-payment', 'equal-principal', 'lump-sum'];

  const schedules = Object.fromEntries(
    methods.map(method => [
      method,
      summarizeSchedule(
        calculateLoan(principal, annualRate, months, method, true)
      ),
    ])
  );

  assert.deepEqual(schedules, {
    'equal-payment': {
      length: 360,
      first: {
        monthlyPayment: 449_045,
        principal: 157_378,
        interest: 291_667,
        remainingBalance: 99_842_622,
      },
      last: {
        monthlyPayment: 449_045,
        principal: 447_740,
        interest: 1_305,
        remainingBalance: 0,
      },
      sums: {
        payment: 161_656_200,
        principal: 100_000_193,
        interest: 61_656_007,
      },
      advancesOneMonthAtATime: true,
    },
    'equal-principal': {
      length: 360,
      first: {
        monthlyPayment: 569_445,
        principal: 277_778,
        interest: 291_667,
        remainingBalance: 99_722_222,
      },
      last: {
        monthlyPayment: 278_588,
        principal: 277_778,
        interest: 810,
        remainingBalance: 0,
      },
      sums: {
        payment: 152_645_913,
        principal: 100_000_080,
        interest: 52_645_833,
      },
      advancesOneMonthAtATime: true,
    },
    'lump-sum': {
      length: 360,
      first: {
        monthlyPayment: 291_667,
        principal: 0,
        interest: 291_667,
        remainingBalance: 100_000_000,
      },
      last: {
        monthlyPayment: 100_291_667,
        principal: 100_000_000,
        interest: 291_667,
        remainingBalance: 0,
      },
      sums: {
        payment: 205_000_120,
        principal: 100_000_000,
        interest: 105_000_120,
      },
      advancesOneMonthAtATime: true,
    },
  });
});

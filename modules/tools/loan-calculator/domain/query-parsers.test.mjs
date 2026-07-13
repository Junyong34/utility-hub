import assert from 'node:assert/strict';
import test from 'node:test';

import {
  LOAN_QUERY_PARSERS,
  PREPAYMENT_QUERY_PARSERS,
  TAB_QUERY_PARSER,
} from '../public.ts';

function parserDefaults(parsers) {
  return Object.fromEntries(
    Object.entries(parsers).map(([key, parser]) => [key, parser.defaultValue])
  );
}

function hydrateQuery(parsers, url) {
  const searchParams = new URL(url).searchParams;

  return Object.fromEntries(
    Object.entries(parsers).map(([key, parser]) => [
      key,
      parser.parseServerSide(searchParams.get(key)),
    ])
  );
}

function serializeQuery(parsers, state) {
  return Object.fromEntries(
    Object.entries(parsers).map(([key, parser]) => [
      key,
      parser.serialize(state[key]),
    ])
  );
}

test('대출·중도상환·탭 parser는 공개 query key와 기본값을 유지한다', () => {
  assert.deepEqual(
    {
      loanKeys: Object.keys(LOAN_QUERY_PARSERS),
      loanDefaults: parserDefaults(LOAN_QUERY_PARSERS),
      prepaymentKeys: Object.keys(PREPAYMENT_QUERY_PARSERS),
      prepaymentDefaults: parserDefaults(PREPAYMENT_QUERY_PARSERS),
      tabKeys: Object.keys(TAB_QUERY_PARSER),
      tabDefaults: parserDefaults(TAB_QUERY_PARSER),
    },
    {
      loanKeys: ['principal', 'rate', 'term', 'termMode', 'method'],
      loanDefaults: {
        principal: 0,
        rate: 0,
        term: 0,
        termMode: undefined,
        method: 'equal-payment',
      },
      prepaymentKeys: [
        'amount',
        'feeRate',
        'loanDate',
        'repaymentDate',
        'maturityDate',
        'exemptionYears',
      ],
      prepaymentDefaults: {
        amount: 0,
        feeRate: 0,
        loanDate: undefined,
        repaymentDate: undefined,
        maturityDate: undefined,
        exemptionYears: 0,
      },
      tabKeys: ['tab'],
      tabDefaults: {
        tab: 'loan-calculator',
      },
    }
  );
});

test('대출 공유 URL은 숫자·기간 단위·상환 방식을 사용자 상태로 복원한다', () => {
  assert.deepEqual(
    hydrateQuery(
      LOAN_QUERY_PARSERS,
      'https://www.zento.kr/tools/loan-calculator?principal=100000000&rate=3.5&term=30&termMode=year&method=equal-principal'
    ),
    {
      principal: 100_000_000,
      rate: 3.5,
      term: 30,
      termMode: 'year',
      method: 'equal-principal',
    }
  );
});

test('중도상환 공유 URL은 날짜와 탭 상태를 사용자 상태로 복원한다', () => {
  const prepayment = hydrateQuery(
    PREPAYMENT_QUERY_PARSERS,
    'https://www.zento.kr/tools/loan-calculator?amount=50000000&feeRate=1.5&loanDate=2024-01-01&repaymentDate=2024-06-01&maturityDate=2034-01-01&exemptionYears=3'
  );

  assert.deepEqual(
    {
      ...prepayment,
      loanDate: prepayment.loanDate.toISOString(),
      repaymentDate: prepayment.repaymentDate.toISOString(),
      maturityDate: prepayment.maturityDate.toISOString(),
      tab: hydrateQuery(
        TAB_QUERY_PARSER,
        'https://www.zento.kr/tools/loan-calculator?tab=prepayment-fee'
      ).tab,
    },
    {
      amount: 50_000_000,
      feeRate: 1.5,
      loanDate: '2024-01-01T00:00:00.000Z',
      repaymentDate: '2024-06-01T00:00:00.000Z',
      maturityDate: '2034-01-01T00:00:00.000Z',
      exemptionYears: 3,
      tab: 'prepayment-fee',
    }
  );
});

test('대출과 중도상환 상태는 기존 query 문자열 값으로 직렬화된다', () => {
  assert.deepEqual(
    {
      loan: serializeQuery(LOAN_QUERY_PARSERS, {
        principal: 100_000_000,
        rate: 3.5,
        term: 30,
        termMode: 'year',
        method: 'equal-payment',
      }),
      prepayment: serializeQuery(PREPAYMENT_QUERY_PARSERS, {
        amount: 50_000_000,
        feeRate: 1.5,
        loanDate: new Date('2024-01-01T00:00:00.000Z'),
        repaymentDate: new Date('2024-06-01T00:00:00.000Z'),
        maturityDate: new Date('2034-01-01T00:00:00.000Z'),
        exemptionYears: 3,
      }),
      tab: serializeQuery(TAB_QUERY_PARSER, {
        tab: 'prepayment-fee',
      }),
    },
    {
      loan: {
        principal: '100000000',
        rate: '3.5',
        term: '30',
        termMode: 'year',
        method: 'equal-payment',
      },
      prepayment: {
        amount: '50000000',
        feeRate: '1.5',
        loanDate: '2024-01-01T00:00:00.000Z',
        repaymentDate: '2024-06-01T00:00:00.000Z',
        maturityDate: '2034-01-01T00:00:00.000Z',
        exemptionYears: '3',
      },
      tab: {
        tab: 'prepayment-fee',
      },
    }
  );
});

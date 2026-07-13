import assert from 'node:assert/strict';
import test from 'node:test';

import { DEPOSIT_QUERY_PARSERS, INSTALLMENT_QUERY_PARSERS } from './parsers.ts';

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

test('예금과 적금 parser는 공개 query key와 기본값을 유지한다', () => {
  assert.deepEqual(
    {
      depositKeys: Object.keys(DEPOSIT_QUERY_PARSERS),
      depositDefaults: parserDefaults(DEPOSIT_QUERY_PARSERS),
      installmentKeys: Object.keys(INSTALLMENT_QUERY_PARSERS),
      installmentDefaults: parserDefaults(INSTALLMENT_QUERY_PARSERS),
    },
    {
      depositKeys: [
        'amount',
        'period',
        'periodMode',
        'rate',
        'interestType',
        'taxType',
        'customTaxRate',
      ],
      depositDefaults: {
        amount: 0,
        period: 0,
        periodMode: undefined,
        rate: 0,
        interestType: 'simple',
        taxType: 'general',
        customTaxRate: 9.5,
      },
      installmentKeys: [
        'monthly',
        'period',
        'periodMode',
        'rate',
        'interestType',
        'taxType',
        'customTaxRate',
      ],
      installmentDefaults: {
        monthly: 0,
        period: 0,
        periodMode: undefined,
        rate: 0,
        interestType: 'simple',
        taxType: 'general',
        customTaxRate: 9.5,
      },
    }
  );
});

test('예금 공유 URL은 금액·기간·이자·과세 조건을 사용자 상태로 복원한다', () => {
  assert.deepEqual(
    hydrateQuery(
      DEPOSIT_QUERY_PARSERS,
      'https://www.zento.kr/tools/savings-calculator?amount=10000000&period=12&periodMode=month&rate=3.5&interestType=compound&taxType=tax-benefit&customTaxRate=7.25'
    ),
    {
      amount: 10_000_000,
      period: 12,
      periodMode: 'month',
      rate: 3.5,
      interestType: 'compound',
      taxType: 'tax-benefit',
      customTaxRate: 7.25,
    }
  );
});

test('적금 공유 URL은 월 납입액과 공통 계산 조건을 사용자 상태로 복원한다', () => {
  assert.deepEqual(
    hydrateQuery(
      INSTALLMENT_QUERY_PARSERS,
      'https://www.zento.kr/tools/savings-calculator?monthly=500000&period=24&periodMode=month&rate=4&interestType=simple&taxType=general&customTaxRate=9.5'
    ),
    {
      monthly: 500_000,
      period: 24,
      periodMode: 'month',
      rate: 4,
      interestType: 'simple',
      taxType: 'general',
      customTaxRate: 9.5,
    }
  );
});

test('예금과 적금 상태는 기존 query 문자열 값으로 직렬화된다', () => {
  assert.deepEqual(
    {
      deposit: serializeQuery(DEPOSIT_QUERY_PARSERS, {
        amount: 10_000_000,
        period: 12,
        periodMode: 'month',
        rate: 3.5,
        interestType: 'compound',
        taxType: 'tax-benefit',
        customTaxRate: 7.25,
      }),
      installment: serializeQuery(INSTALLMENT_QUERY_PARSERS, {
        monthly: 500_000,
        period: 24,
        periodMode: 'month',
        rate: 4,
        interestType: 'simple',
        taxType: 'general',
        customTaxRate: 9.5,
      }),
    },
    {
      deposit: {
        amount: '10000000',
        period: '12',
        periodMode: 'month',
        rate: '3.5',
        interestType: 'compound',
        taxType: 'tax-benefit',
        customTaxRate: '7.25',
      },
      installment: {
        monthly: '500000',
        period: '24',
        periodMode: 'month',
        rate: '4',
        interestType: 'simple',
        taxType: 'general',
        customTaxRate: '9.5',
      },
    }
  );
});

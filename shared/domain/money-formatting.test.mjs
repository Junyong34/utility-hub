import assert from 'node:assert/strict';
import test from 'node:test';

import {
  formatCurrencyToKoreanUnits,
  formatNumberWithCommas,
  parseFormattedNumber,
} from './money-formatting.ts';

test('한글 금액 표기는 0·음수·억·만·나머지 단위를 유지한다', () => {
  assert.deepEqual(
    {
      zero: formatCurrencyToKoreanUnits(0),
      negative: formatCurrencyToKoreanUnits(-350_000),
      eok: formatCurrencyToKoreanUnits(200_000_000),
      man: formatCurrencyToKoreanUnits(35_000),
      remainder: formatCurrencyToKoreanUnits(5_000),
      combined: formatCurrencyToKoreanUnits(123_456_789),
    },
    {
      zero: '0원',
      negative: '-35만원',
      eok: '2억원',
      man: '3만 5,000원',
      remainder: '5,000원',
      combined: '1억 2,345만 6,789원',
    }
  );
});

test('금액 입력 표시는 구분 기호를 적용하고 유효하지 않은 입력은 0으로 파싱한다', () => {
  assert.deepEqual(
    {
      integer: formatNumberWithCommas(1_234_567),
      decimal: formatNumberWithCommas('-1234.5'),
      parsed: parseFormattedNumber('1,234,567'),
      invalid: parseFormattedNumber('금액 없음'),
    },
    {
      integer: '1,234,567',
      decimal: '-1,234.5',
      parsed: 1_234_567,
      invalid: 0,
    }
  );
});

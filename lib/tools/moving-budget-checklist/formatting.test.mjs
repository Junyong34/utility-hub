import test from 'node:test';
import assert from 'node:assert/strict';

import {
  formatAmountInputValue,
  parseAmountInput,
} from './formatting.ts';

test('금액 입력값은 천 단위 콤마를 붙여 표시한다', () => {
  assert.equal(formatAmountInputValue(0), '');
  assert.equal(formatAmountInputValue(350000), '350,000');
  assert.equal(formatAmountInputValue(50000000), '50,000,000');
});

test('금액 입력 파서는 콤마가 섞여 있어도 숫자만 추출한다', () => {
  assert.equal(parseAmountInput('350,000'), 350000);
  assert.equal(parseAmountInput('50,000,000'), 50000000);
  assert.equal(parseAmountInput('abc'), 0);
});

import assert from 'node:assert/strict';
import test from 'node:test';

import { splitMonths } from './duration.ts';

test('총 개월 수는 기존 년·월 나머지 규칙으로 분리된다', () => {
  assert.deepEqual([0, 11, 12, 241].map(splitMonths), [
    { years: 0, months: 0 },
    { years: 0, months: 11 },
    { years: 1, months: 0 },
    { years: 20, months: 1 },
  ]);
});

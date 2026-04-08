import test from 'node:test';
import assert from 'node:assert/strict';

import { pickLatestDate } from './date-utils.ts';

test('pickLatestDate는 가장 최신 날짜를 반환한다', () => {
  assert.equal(
    pickLatestDate(['2026-03-01', '2026-04-07', '2026-04-01']),
    '2026-04-07'
  );
});

test('pickLatestDate는 유효한 날짜가 없으면 fallback을 반환한다', () => {
  assert.equal(pickLatestDate([], '2026-01-01'), '2026-01-01');
});

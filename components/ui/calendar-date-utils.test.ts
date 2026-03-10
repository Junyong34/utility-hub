import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildMonthYearDate,
  getMonthOptions,
  getQuickActionBaseDate,
  getQuickActionDate,
  getYearOptions,
  type CalendarQuickAction,
} from './calendar-date-utils';

function formatIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
}

test('quickActionBase가 today면 선택값이 있어도 오늘을 기준으로 계산한다', () => {
  const action: CalendarQuickAction = {
    label: '+1주일',
    amount: 1,
    unit: 'week',
  };

  const result = getQuickActionDate({
    action,
    quickActionBase: 'today',
    selected: new Date(2026, 0, 1),
    today: new Date(2026, 2, 10, 14, 30),
  });

  assert.equal(formatIsoDate(result), '2026-03-17');
});

test('quickActionBase가 selected면 단일 선택 날짜를 기준으로 계산한다', () => {
  const action: CalendarQuickAction = {
    label: '+1개월',
    amount: 1,
    unit: 'month',
  };

  const result = getQuickActionDate({
    action,
    quickActionBase: 'selected',
    selected: new Date(2026, 0, 15, 23, 59),
    today: new Date(2026, 2, 10),
  });

  assert.equal(formatIsoDate(result), '2026-02-15');
});

test('range 선택값은 from 날짜를 우선 기준으로 사용한다', () => {
  const result = getQuickActionBaseDate({
    quickActionBase: 'selected',
    selected: {
      from: new Date(2026, 2, 12, 18, 20),
      to: new Date(2026, 2, 20, 9, 0),
    },
    today: new Date(2026, 2, 10),
  });

  assert.equal(formatIsoDate(result), '2026-03-12');
});

test('selected 기준인데 선택값이 없으면 오늘로 fallback 한다', () => {
  const result = getQuickActionBaseDate({
    quickActionBase: 'selected',
    selected: undefined,
    today: new Date(2026, 2, 10, 8, 45),
  });

  assert.equal(formatIsoDate(result), '2026-03-10');
});

test('연도 옵션은 startMonth/endMonth 범위를 포함해 생성한다', () => {
  assert.deepEqual(
    getYearOptions(new Date(2024, 0, 1), new Date(2026, 11, 1)),
    [2024, 2025, 2026]
  );
});

test('월/연도 변경용 날짜는 해당 월의 1일로 고정한다', () => {
  const result = buildMonthYearDate({
    year: 2026,
    month: 10,
  });

  assert.equal(formatIsoDate(result), '2026-11-01');
});

test('월 옵션은 항상 12개월 라벨을 순서대로 반환한다', () => {
  assert.deepEqual(getMonthOptions().slice(0, 3), [
    { value: 0, label: '1월' },
    { value: 1, label: '2월' },
    { value: 2, label: '3월' },
  ]);
});

import test from 'node:test'
import assert from 'node:assert/strict'

import {
  buildFinanceHref,
  getNextFinanceMonth,
  getPreviousFinanceMonth,
  parseFinanceCompareParam,
  parseFinanceMonthParam,
  resolveFinanceMonth,
} from './url-state.ts'

test('month와 compare query를 기본 규칙에 맞게 파싱한다', () => {
  assert.equal(parseFinanceMonthParam('2026-05'), '2026-05')
  assert.equal(parseFinanceMonthParam('2026-13'), null)
  assert.equal(parseFinanceCompareParam('year'), 'year')
  assert.equal(parseFinanceCompareParam('all'), 'all')
  assert.equal(parseFinanceCompareParam('quarter'), 'half')
  assert.equal(parseFinanceCompareParam('unknown'), 'half')
})

test('없는 월은 가장 가까운 이전 월 또는 최신 월로 fallback 한다', () => {
  const months = ['2026-01', '2026-03', '2026-05']

  assert.equal(resolveFinanceMonth(months, null), '2026-05')
  assert.equal(resolveFinanceMonth(months, '2026-04'), '2026-03')
  assert.equal(resolveFinanceMonth(months, '2025-12'), '2026-05')
})

test('href 생성 시 month와 compare를 안정적으로 유지한다', () => {
  assert.equal(
    buildFinanceHref('/finance/assets', {
      month: '2026-05',
      compare: 'half',
    }),
    '/finance/assets?month=2026-05'
  )
  assert.equal(
    buildFinanceHref('/finance', {
      month: '2026-05',
      compare: 'year',
    }),
    '/finance?month=2026-05&compare=year'
  )
  assert.equal(
    buildFinanceHref('/finance', {
      month: '2026-05',
      compare: 'all',
    }),
    '/finance?month=2026-05&compare=all'
  )
})

test('다음 월 기본값을 계산한다', () => {
  assert.equal(getNextFinanceMonth('2026-04'), '2026-05')
  assert.equal(getNextFinanceMonth('2026-12'), '2027-01')
})

test('이전 월 기본값을 계산한다', () => {
  assert.equal(getPreviousFinanceMonth('2026-04'), '2026-03')
  assert.equal(getPreviousFinanceMonth('2026-01'), '2025-12')
})

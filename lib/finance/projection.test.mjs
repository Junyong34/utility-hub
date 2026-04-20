import test from 'node:test'
import assert from 'node:assert/strict'

import { buildFinanceProjectionSummary } from './projection.ts'

test('미래 자산 복리 시뮬레이션은 연도별 자산과 누적 증감률을 계산한다', () => {
  const summary = buildFinanceProjectionSummary({
    baseMonth: '2026-05',
    baseAssets: 25000000,
    annualGrowthRate: 10,
    targetYear: 2029,
  })

  assert.equal(summary.baseMonth, '2026-05')
  assert.equal(summary.targetMonth, '2029-05')
  assert.equal(summary.years, 3)
  assert.equal(summary.projectedAssets, 33275000)
  assert.equal(summary.cumulativeChange, 8275000)
  assert.equal(summary.cumulativeChangeRate, 33)
  assert.deepEqual(
    summary.points.map((point) => point.month),
    ['2027-05', '2028-05', '2029-05']
  )
  assert.equal(summary.points[0].projectedAssets, 27500000)
  assert.equal(summary.points[1].annualChange, 2750000)
  assert.equal(summary.points[2].cumulativeChangeRate, 33)
})

test('100년 이상 구간은 계산하지 않고 빈 결과를 반환한다', () => {
  const summary = buildFinanceProjectionSummary({
    baseMonth: '2026-05',
    baseAssets: 25000000,
    annualGrowthRate: 10,
    targetYear: 2126,
  })

  assert.equal(summary.years, 0)
  assert.equal(summary.targetMonth, '2026-05')
  assert.equal(summary.projectedAssets, 25000000)
  assert.equal(summary.cumulativeChange, 0)
  assert.equal(summary.points.length, 0)
})

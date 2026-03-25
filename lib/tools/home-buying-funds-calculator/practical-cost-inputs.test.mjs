import test from 'node:test'
import assert from 'node:assert/strict'

import { MOVING_FEE_PRESETS } from './presets.ts'
import {
  MANUAL_COST_QUICK_ADD_AMOUNTS,
  applyManualCostIncrement,
} from './practical-cost-inputs.ts'

test('수동 입력 빠른 버튼은 50만, 100만, 200만 누적 규칙을 제공한다', () => {
  assert.deepEqual(MANUAL_COST_QUICK_ADD_AMOUNTS, [500_000, 1_000_000, 2_000_000])
  assert.equal(applyManualCostIncrement(1_500_000, 500_000), 2_000_000)
  assert.equal(applyManualCostIncrement(undefined, 1_000_000), 1_000_000)
})

test('이사비용 프리셋은 100만, 150만, 200만원으로 제한한다', () => {
  assert.equal(MOVING_FEE_PRESETS.small, 1_000_000)
  assert.equal(MOVING_FEE_PRESETS.medium, 1_500_000)
  assert.equal(MOVING_FEE_PRESETS.large, 2_000_000)
})

import test from 'node:test'
import assert from 'node:assert/strict'

import { resolveManagementDepositAmount } from './management-deposit.ts'

test('관리비예치금을 입력하지 않으면 결과에 30만원을 자동 반영하지 않는다', () => {
  assert.equal(resolveManagementDepositAmount(undefined), 0)
})

test('관리비예치금을 직접 입력하면 입력한 값으로 반영한다', () => {
  assert.equal(resolveManagementDepositAmount(450_000), 450_000)
})

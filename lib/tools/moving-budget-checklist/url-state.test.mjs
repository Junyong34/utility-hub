import test from 'node:test'
import assert from 'node:assert/strict'

import {
  createDefaultMovingBudgetState,
  parseAssetsFromQuery,
  parseChecklistProgressFromQuery,
  parseCustomItemsFromQuery,
  parseTemplateItemsFromQuery,
  serializeAssetsForQuery,
  serializeChecklistProgressForQuery,
  serializeCustomItemsForQuery,
  serializeTemplateItemsForQuery,
} from './index.ts'

test('자산, 템플릿 항목, 체크 상태, 추가 항목은 query segment round-trip이 가능하다', () => {
  const state = createDefaultMovingBudgetState()

  state.assets.cash = 10_000_000
  state.assets.loan = 90_000_000
  state.templateItems.apartmentPrice.amount = 450_000_000
  state.templateItems.cleaning.amount = 350_000
  state.checklistProgress = [
    'apartmentPrice',
    'cleaning',
  ]
  state.customItems = [
    {
      id: 'custom-1',
      groupId: 'pre-move-costs',
      label: '줄눈 시공',
      amount: 900_000,
    },
    {
      id: 'custom-2',
      groupId: 'move-in-costs',
      label: '커튼',
      amount: 1_200_000,
    },
  ]

  assert.deepEqual(parseAssetsFromQuery(serializeAssetsForQuery(state.assets)), state.assets)
  assert.deepEqual(
    parseTemplateItemsFromQuery(serializeTemplateItemsForQuery(state.templateItems)),
    state.templateItems
  )
  assert.deepEqual(
    parseChecklistProgressFromQuery(
      serializeChecklistProgressForQuery(state.checklistProgress)
    ),
    state.checklistProgress
  )
  assert.deepEqual(
    parseCustomItemsFromQuery(serializeCustomItemsForQuery(state.customItems)),
    state.customItems
  )
})

test('부분 입력 상태도 유실 없이 템플릿 항목 세그먼트에 보존된다', () => {
  const state = createDefaultMovingBudgetState()

  state.templateItems.taxCost.amount = 18_000_000

  const restored = parseTemplateItemsFromQuery(
    serializeTemplateItemsForQuery(state.templateItems)
  )

  assert.equal(restored.taxCost.amount, 18_000_000)
  assert.equal(restored.tvBracket.amount, 0)
})

test('알 수 없는 itemId와 checkId는 무시하고 나머지 상태는 유지한다', () => {
  const restoredTemplateItems = parseTemplateItemsFromQuery(
    JSON.stringify([
      ['ap', 500_000_000],
      ['unknown', 9_999],
    ])
  )
  const restoredChecklist = parseChecklistProgressFromQuery(
    JSON.stringify(['ap', 'unknown', 'lf'])
  )

  assert.equal(restoredTemplateItems.apartmentPrice.amount, 500_000_000)
  assert.deepEqual(restoredChecklist, ['apartmentPrice', 'legalFee'])
})

test('깨진 JSON 세그먼트는 기본값으로 복구된다', () => {
  assert.deepEqual(parseAssetsFromQuery('{bad json'), {
    cash: 0,
    stocks: 0,
    deposit: 0,
    savings: 0,
    loan: 0,
  })
  assert.deepEqual(
    parseTemplateItemsFromQuery('{bad json'),
    createDefaultMovingBudgetState().templateItems
  )
  assert.deepEqual(parseChecklistProgressFromQuery('{bad json'), [])
  assert.deepEqual(parseCustomItemsFromQuery('{bad json'), [])
})

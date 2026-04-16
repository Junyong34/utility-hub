import test from 'node:test'
import assert from 'node:assert/strict'

import {
  calculateMovingBudgetSummary,
  createDefaultMovingBudgetState,
} from './index.ts'
import { MOVING_BUDGET_TEMPLATE_GROUPS } from './templates.ts'

test('기본 템플릿 카탈로그는 요청한 그룹과 항목만 정확히 포함한다', () => {
  assert.deepEqual(
    MOVING_BUDGET_TEMPLATE_GROUPS.map((group) => ({
      id: group.id,
      label: group.label,
      itemLabels: group.items.map((item) => item.label),
    })),
    [
      {
        id: 'purchase-costs',
        label: '아파트 매매 비용',
        itemLabels: ['아파트 가격', '법무사 비용', '취득세 등등 세금 처리 비용'],
      },
      {
        id: 'pre-move-costs',
        label: '아파트 입주 전 시공 및 부대비용',
        itemLabels: [
          '이사 업체 비용',
          '입주청소',
          '줄눈',
          '냉장고장',
          '붙박이장',
          '화장대',
          '드레스룸',
        ],
      },
      {
        id: 'move-in-costs',
        label: '아파트 입주 시 가전 가구',
        itemLabels: [
          '가구 (쇼파, LG 스타일러, 식탁 등등)',
          '침대 프레임',
          '스탠바이 TV 브라킷',
          '실링펜',
        ],
      },
    ]
  )
})

test('총현금자산, 대출 포함 가용자금, 총예상비용, 그룹 합계를 실시간 합산한다', () => {
  const state = createDefaultMovingBudgetState()

  state.assets.cash = 50_000_000
  state.assets.stocks = 10_000_000
  state.assets.deposit = 200_000_000
  state.assets.savings = 30_000_000
  state.assets.loan = 100_000_000

  state.templateItems.apartmentPrice.amount = 450_000_000
  state.templateItems.legalFee.amount = 2_000_000
  state.templateItems.taxCost.amount = 18_000_000
  state.templateItems.movingCompany.amount = 1_500_000
  state.templateItems.cleaning.amount = 350_000
  state.templateItems.grout.amount = 700_000
  state.templateItems.fridgeCabinet.amount = 2_300_000
  state.templateItems.furniture.amount = 8_000_000

  state.customItems.push({
    id: 'custom-1',
    groupId: 'pre-move-costs',
    label: '줄눈 시공',
    amount: 900_000,
  })

  const result = calculateMovingBudgetSummary(state)

  assert.equal(result.totalAssets, 290_000_000)
  assert.equal(result.totalAvailableFunds, 390_000_000)
  assert.equal(result.plannedLoanAmount, 100_000_000)
  assert.equal(result.totalEstimatedCost, 483_750_000)
  assert.equal(result.balanceAmount, -93_750_000)
  assert.equal(result.apartmentCashNeeded, 350_000_000)
  assert.equal(result.isShortage, true)
  assert.deepEqual(
    result.groupSummaries.map((group) => ({
      id: group.id,
      totalAmount: group.totalAmount,
      sharePercentage: group.sharePercentage,
      templateItemCount: group.templateItemCount,
      customItemCount: group.customItemCount,
    })),
    [
      {
        id: 'purchase-costs',
        totalAmount: 470_000_000,
        sharePercentage: 97,
        templateItemCount: 3,
        customItemCount: 0,
      },
      {
        id: 'pre-move-costs',
        totalAmount: 5_750_000,
        sharePercentage: 1,
        templateItemCount: 7,
        customItemCount: 1,
      },
      {
        id: 'move-in-costs',
        totalAmount: 8_000_000,
        sharePercentage: 2,
        templateItemCount: 4,
        customItemCount: 0,
      },
    ]
  )
  assert.equal(result.dominantGroupId, 'purchase-costs')
  assert.deepEqual(result.adjustableCostComparisonData, [
    { id: 'move-in-costs', label: '아파트 입주 시 가전 가구', value: 8_000_000, ratio: 58 },
    { id: 'pre-move-costs', label: '아파트 입주 전 시공 및 부대비용', value: 5_750_000, ratio: 42 },
  ])
})

test('진행률은 템플릿 체크 개수 기준으로 계산하고 사용자 추가 항목은 분모에 포함하지 않는다', () => {
  const state = createDefaultMovingBudgetState()

  state.checklistProgress = [
    'apartmentPrice',
    'legalFee',
    'movingCompany',
    'furniture',
    'cleaning',
  ]

  state.customItems.push({
    id: 'custom-1',
    groupId: 'move-in-costs',
    label: '커튼',
    amount: 1_200_000,
  })

  const result = calculateMovingBudgetSummary(state)
  const templateItemCount = MOVING_BUDGET_TEMPLATE_GROUPS.reduce(
    (sum, group) => sum + group.items.length,
    0
  )

  assert.equal(result.completedChecklistCount, 5)
  assert.equal(result.totalChecklistCount, templateItemCount)
  assert.equal(result.progressPercentage, Math.floor((5 / templateItemCount) * 100))
  assert.deepEqual(
    result.groupSummaries.map((group) => ({
      id: group.id,
      completedChecklistCount: group.completedChecklistCount,
      totalChecklistCount: group.totalChecklistCount,
      progressPercentage: group.progressPercentage,
    })),
    [
      {
        id: 'purchase-costs',
        completedChecklistCount: 2,
        totalChecklistCount: 3,
        progressPercentage: 66,
      },
      {
        id: 'pre-move-costs',
        completedChecklistCount: 2,
        totalChecklistCount: 7,
        progressPercentage: 28,
      },
      {
        id: 'move-in-costs',
        completedChecklistCount: 1,
        totalChecklistCount: 4,
        progressPercentage: 25,
      },
    ]
  )
  assert.deepEqual(result.progressChartData, [
    { id: 'completed', label: '완료', value: 5 },
    { id: 'remaining', label: '남은 체크', value: templateItemCount - 5 },
  ])
})

test('dominant group이 없으면 전체 그룹을 비교 데이터에 유지한다', () => {
  const state = createDefaultMovingBudgetState()

  state.templateItems.apartmentPrice.amount = 10_000_000
  state.templateItems.cleaning.amount = 8_000_000
  state.templateItems.furniture.amount = 5_000_000

  const result = calculateMovingBudgetSummary(state)

  assert.equal(result.dominantGroupId, null)
  assert.deepEqual(result.adjustableCostComparisonData, [
    { id: 'purchase-costs', label: '아파트 매매 비용', value: 10_000_000, ratio: 43 },
    { id: 'pre-move-costs', label: '아파트 입주 전 시공 및 부대비용', value: 8_000_000, ratio: 35 },
    { id: 'move-in-costs', label: '아파트 입주 시 가전 가구', value: 5_000_000, ratio: 22 },
  ])
})

test('아파트 실지급액은 아파트 가격에서 대출 예정금을 뺀 값으로 계산하고 0 미만이면 0으로 고정한다', () => {
  const state = createDefaultMovingBudgetState()

  state.assets.loan = 300_000_000
  state.templateItems.apartmentPrice.amount = 450_000_000

  const result = calculateMovingBudgetSummary(state)

  assert.equal(result.apartmentCashNeeded, 150_000_000)

  state.assets.loan = 500_000_000

  const nextResult = calculateMovingBudgetSummary(state)

  assert.equal(nextResult.apartmentCashNeeded, 0)
})

test('빈 값, 음수, 잘못된 숫자 입력은 0으로 정규화한다', () => {
  const state = createDefaultMovingBudgetState()

  state.assets.cash = Number.NaN
  state.assets.stocks = -100
  state.templateItems.cleaning.amount = Number.NaN
  state.templateItems.bedFrame.amount = -500_000
  state.customItems.push({
    id: 'custom-1',
    groupId: 'move-in-costs',
    label: '커튼',
    amount: Number.NaN,
  })

  const result = calculateMovingBudgetSummary(state)

  assert.equal(result.totalAssets, 0)
  assert.equal(result.totalAvailableFunds, 0)
  assert.equal(result.totalEstimatedCost, 0)
  assert.equal(result.balanceAmount, 0)
  assert.equal(result.isShortage, false)
})

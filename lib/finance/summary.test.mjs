import test from 'node:test'
import assert from 'node:assert/strict'

import { buildFinanceDashboardSummary, buildFinanceSnapshotSummary } from './summary.ts'
import { createDefaultExpenseRows } from './defaults.ts'

function createSnapshot(month, overrides = {}) {
  return {
    month,
    updatedAt: `${month}-28T12:00:00.000Z`,
    incomes: {
      husbandSalary: 5000000,
      wifeSalary: 4000000,
      memo: '',
      ...(overrides.incomes ?? {}),
    },
    assets: overrides.assets ?? [
      {
        id: `${month}-asset-1`,
        owner: 'joint',
        category: 'deposit',
        name: '생활비 통장',
        amount: 20000000,
        memo: '',
      },
    ],
    debts: overrides.debts ?? [
      {
        id: `${month}-debt-1`,
        owner: 'joint',
        category: 'mortgage',
        name: '주담대',
        balance: 5000000,
        interestRate: 3.5,
        monthlyPayment: 500000,
        monthlyInterest: 200000,
        memo: '',
      },
    ],
    investments: overrides.investments ?? [
      {
        id: `${month}-investment-1`,
        owner: 'wife',
        category: 'etf',
        name: 'ETF 계좌',
        principal: 8000000,
        valuation: 10000000,
        memo: '',
      },
    ],
    expenses:
      overrides.expenses ??
      createDefaultExpenseRows().map((row) => {
        switch (row.id) {
          case 'fixed-housing':
            return { ...row, amount: 800000 }
          case 'fixed-loan_interest':
            return { ...row, amount: 300000 }
          case 'fixed-child_education':
            return { ...row, amount: 350000 }
          case 'variable-food':
            return { ...row, amount: 600000 }
          case 'variable-transport':
            return { ...row, amount: 200000 }
          default:
            return row
        }
      }),
  }
}

test('특정 월 스냅샷에서 총자산, 순자산, 지출 비율, 투자 손익을 계산한다', () => {
  const summary = buildFinanceSnapshotSummary(createSnapshot('2026-05'))

  assert.equal(summary.totalIncome, 9000000)
  assert.equal(summary.totalLivingAssets, 20000000)
  assert.equal(summary.totalInvestmentValuation, 10000000)
  assert.equal(summary.totalAssets, 30000000)
  assert.equal(summary.totalDebt, 5000000)
  assert.equal(summary.netWorth, 25000000)
  assert.equal(summary.totalExpenses, 2250000)
  assert.equal(summary.fixedExpenses, 1450000)
  assert.equal(summary.variableExpenses, 800000)
  assert.equal(summary.childRelatedExpenses, 350000)
  assert.equal(summary.savingsEstimate, 6750000)
  assert.equal(summary.totalInvestmentProfitLoss, 2000000)
  assert.equal(summary.totalInvestmentReturnRate, 25)
  assert.equal(summary.fixedExpenseRatio, 64)
  assert.equal(summary.variableExpenseRatio, 36)
})

test('대시보드는 요청 월이 비어 있으면 가장 가까운 이전 월과 반기 비교를 만든다', () => {
  const dashboard = buildFinanceDashboardSummary(
    [
      createSnapshot('2025-05', {
        assets: [{ id: 'a1', owner: 'joint', category: 'deposit', name: '예금', amount: 12000000, memo: '' }],
        debts: [{ id: 'd1', owner: 'joint', category: 'mortgage', name: '주담대', balance: 4000000, memo: '', interestRate: null, monthlyPayment: null, monthlyInterest: null }],
        investments: [{ id: 'i1', owner: 'wife', category: 'etf', name: 'ETF', principal: 6000000, valuation: 7000000, memo: '' }],
      }),
      createSnapshot('2026-04', {
        assets: [{ id: 'a2', owner: 'joint', category: 'deposit', name: '예금', amount: 18000000, memo: '' }],
        debts: [{ id: 'd2', owner: 'joint', category: 'mortgage', name: '주담대', balance: 6000000, memo: '', interestRate: null, monthlyPayment: null, monthlyInterest: null }],
        investments: [{ id: 'i2', owner: 'wife', category: 'etf', name: 'ETF', principal: 7000000, valuation: 9000000, memo: '' }],
      }),
      createSnapshot('2026-05', {
        assets: [{ id: 'a3', owner: 'joint', category: 'deposit', name: '예금', amount: 20000000, memo: '' }],
        debts: [{ id: 'd3', owner: 'joint', category: 'mortgage', name: '주담대', balance: 5000000, memo: '', interestRate: null, monthlyPayment: null, monthlyInterest: null }],
        investments: [{ id: 'i3', owner: 'wife', category: 'etf', name: 'ETF', principal: 8000000, valuation: 10000000, memo: '' }],
      }),
    ],
    '2026-06',
    'half'
  )

  assert.equal(dashboard.effectiveMonth, '2026-05')
  assert.equal(dashboard.comparison?.referenceMonth, '2025-05')
  assert.equal(dashboard.current?.netWorth, 25000000)
  assert.equal(dashboard.comparison?.currentValue, 25000000)
  assert.equal(dashboard.comparison?.referenceValue, 15000000)
  assert.equal(dashboard.comparison?.absoluteChange, 10000000)
  assert.equal(dashboard.comparison?.percentChange, 67)
  assert.equal(dashboard.history.length, 2)
  assert.equal(dashboard.historyRangeLabel, '2026.04 ~ 2026.05')
  assert.equal(dashboard.history.at(-1)?.label, '2026.05')
})

test('반기 모드는 선택 월 기준 최근 6개월 구간만 차트 이력으로 만든다', () => {
  const snapshots = [
    '2025-12',
    '2026-01',
    '2026-02',
    '2026-03',
    '2026-04',
    '2026-05',
    '2026-06',
    '2026-07',
    '2026-08',
  ].map((month, index) =>
    createSnapshot(month, {
      assets: [
        {
          id: `asset-${month}`,
          owner: 'joint',
          category: 'deposit',
          name: '예금',
          amount: 10000000 + index * 1000000,
          memo: '',
        },
      ],
      debts: [],
      investments: [],
    })
  )

  const dashboard = buildFinanceDashboardSummary(snapshots, '2026-08', 'half')

  assert.deepEqual(
    dashboard.history.map((point) => point.month),
    ['2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08']
  )
  assert.equal(dashboard.historyRangeLabel, '2026.02 ~ 2026.08')
})

test('연도 모드는 선택 연도와 전년도 구간을 차트 이력으로 만든다', () => {
  const snapshots = ['2024-12', '2025-01', '2025-12', '2026-01', '2026-12'].map(
    (month, index) =>
      createSnapshot(month, {
        assets: [
          {
            id: `asset-${month}`,
            owner: 'joint',
            category: 'deposit',
            name: '예금',
            amount: 10000000 + index * 1000000,
            memo: '',
          },
        ],
        debts: [],
        investments: [],
      })
  )

  const dashboard = buildFinanceDashboardSummary(snapshots, '2026-12', 'year')

  assert.deepEqual(
    dashboard.history.map((point) => point.month),
    ['2025-01', '2025-12', '2026-01', '2026-12']
  )
  assert.equal(dashboard.historyRangeLabel, '2025.01 ~ 2026.12')
})

test('전체 통계 모드는 전체 등록 월을 차트 이력으로 만든다', () => {
  const snapshots = ['2024-12', '2025-01', '2026-12'].map((month, index) =>
    createSnapshot(month, {
      assets: [
        {
          id: `asset-${month}`,
          owner: 'joint',
          category: 'deposit',
          name: '예금',
          amount: 10000000 + index * 1000000,
          memo: '',
        },
      ],
      debts: [],
      investments: [],
    })
  )

  const dashboard = buildFinanceDashboardSummary(snapshots, '2026-12', 'all')

  assert.deepEqual(
    dashboard.history.map((point) => point.month),
    ['2024-12', '2025-01', '2026-12']
  )
  assert.equal(dashboard.historyRangeLabel, '2024.12 ~ 2026.12')
  assert.equal(dashboard.comparison?.referenceMonth, '2024-12')
})

test('자산 증감 이력은 월별 변화 원인을 항목별로 만든다', () => {
  const dashboard = buildFinanceDashboardSummary(
    [
      createSnapshot('2026-01', {
        assets: [{ id: 'saving', owner: 'joint', category: 'saving', name: '적금', amount: 3000000, memo: '' }],
        debts: [],
        investments: [],
      }),
      createSnapshot('2026-02', {
        assets: [{ id: 'saving', owner: 'joint', category: 'saving', name: '적금', amount: 3500000, memo: '' }],
        debts: [],
        investments: [],
      }),
    ],
    '2026-02',
    'half'
  )

  assert.equal(dashboard.assetFlowEvents.length, 1)
  assert.equal(dashboard.assetFlowEvents[0].livingAssetsChange, 500000)
  assert.deepEqual(dashboard.assetFlowEvents[0].reasons[0], {
    id: 'asset-saving',
    label: '적금',
    value: 500000,
    kind: 'asset',
  })
})

test('연도 비교는 12개월 전 가장 가까운 이전 월을 reference month로 사용한다', () => {
  const dashboard = buildFinanceDashboardSummary(
    [
      createSnapshot('2025-05', {
        assets: [{ id: 'a1', owner: 'joint', category: 'deposit', name: '예금', amount: 12000000, memo: '' }],
        debts: [{ id: 'd1', owner: 'joint', category: 'mortgage', name: '주담대', balance: 4000000, memo: '', interestRate: null, monthlyPayment: null, monthlyInterest: null }],
        investments: [{ id: 'i1', owner: 'wife', category: 'etf', name: 'ETF', principal: 6000000, valuation: 7000000, memo: '' }],
      }),
      createSnapshot('2026-05'),
    ],
    '2026-05',
    'year'
  )

  assert.equal(dashboard.comparison?.referenceMonth, '2025-05')
  assert.equal(dashboard.comparison?.absoluteChange, 10000000)
  assert.equal(dashboard.comparison?.percentChange, 67)
})

import test from 'node:test'
import assert from 'node:assert/strict'

import { buildFinanceReportsSummary } from './reports.ts'
import { createDefaultExpenseRows } from './defaults.ts'

function createSnapshot(month, amounts) {
  return {
    month,
    updatedAt: `${month}-28T12:00:00.000Z`,
    incomes: {
      husbandSalary: amounts.incomeHusband,
      wifeSalary: amounts.incomeWife,
      memo: '',
    },
    assets: [
      {
        id: `${month}-asset`,
        owner: 'joint',
        category: 'deposit',
        name: '예금',
        amount: amounts.assets,
        memo: '',
      },
    ],
    debts: [
      {
        id: `${month}-debt`,
        owner: 'joint',
        category: 'mortgage',
        name: '주담대',
        balance: amounts.debt,
        interestRate: null,
        monthlyPayment: null,
        monthlyInterest: null,
        memo: '',
      },
    ],
    investments: [
      {
        id: `${month}-investment`,
        owner: 'joint',
        category: 'etf',
        name: 'ETF',
        principal: amounts.investmentPrincipal,
        valuation: amounts.investmentValuation,
        memo: '',
      },
    ],
    expenses: createDefaultExpenseRows().map((row) => {
      switch (row.id) {
        case 'fixed-housing':
          return { ...row, amount: amounts.fixedHousing }
        case 'fixed-child_education':
          return { ...row, amount: amounts.childEducation }
        case 'variable-food':
          return { ...row, amount: amounts.food }
        default:
          return row
      }
    }),
  }
}

test('분기/반기/연도 리포트는 기간 말 스냅샷과 기간 합계 지표를 함께 만든다', () => {
  const reports = buildFinanceReportsSummary([
    createSnapshot('2025-12', {
      incomeHusband: 5000000,
      incomeWife: 4000000,
      assets: 10000000,
      debt: 5000000,
      investmentPrincipal: 5000000,
      investmentValuation: 5500000,
      fixedHousing: 800000,
      childEducation: 300000,
      food: 500000,
    }),
    createSnapshot('2026-01', {
      incomeHusband: 5000000,
      incomeWife: 4000000,
      assets: 12000000,
      debt: 4500000,
      investmentPrincipal: 5500000,
      investmentValuation: 6000000,
      fixedHousing: 800000,
      childEducation: 300000,
      food: 500000,
    }),
    createSnapshot('2026-03', {
      incomeHusband: 5100000,
      incomeWife: 4100000,
      assets: 16000000,
      debt: 4000000,
      investmentPrincipal: 7000000,
      investmentValuation: 9000000,
      fixedHousing: 820000,
      childEducation: 350000,
      food: 600000,
    }),
    createSnapshot('2026-07', {
      incomeHusband: 5200000,
      incomeWife: 4200000,
      assets: 20000000,
      debt: 3500000,
      investmentPrincipal: 8500000,
      investmentValuation: 11000000,
      fixedHousing: 850000,
      childEducation: 360000,
      food: 620000,
    }),
  ])

  assert.equal(reports.quarterly.length, 3)
  assert.equal(reports.quarterly[1].bucketId, '2026-Q1')
  assert.equal(reports.quarterly[1].endSnapshotMonth, '2026-03')
  assert.equal(reports.quarterly[1].totalIncome, 18200000)
  assert.equal(reports.quarterly[1].fixedExpenses, 2270000)
  assert.equal(reports.quarterly[1].childRelatedExpenses, 650000)
  assert.equal(reports.quarterly[1].netWorth, 21000000)

  assert.equal(reports.semiAnnual.length, 3)
  assert.equal(reports.semiAnnual[1].bucketId, '2026-H1')
  assert.equal(reports.semiAnnual[1].endSnapshotMonth, '2026-03')

  assert.equal(reports.yearly.length, 2)
  assert.equal(reports.yearly[1].bucketId, '2026')
  assert.equal(reports.yearly[1].endSnapshotMonth, '2026-07')
  assert.equal(reports.yearly[1].netWorthChangeAmount, 17000000)
  assert.equal(reports.yearly[1].investmentProfitLoss, 2500000)
})

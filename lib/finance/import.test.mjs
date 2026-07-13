import test from 'node:test'
import assert from 'node:assert/strict'

import {
  parseFinanceSnapshotImport,
  parseFinanceSnapshotImports,
} from './import.ts'

test('단일 월 스냅샷 JSON은 그대로 가져올 수 있다', () => {
  const snapshots = parseFinanceSnapshotImports(
    JSON.stringify({
      month: '2026-05',
      updatedAt: '2026-05-31T12:00:00.000Z',
      incomes: { husbandSalary: 5000000, wifeSalary: 4000000, memo: '' },
      assets: [],
      debts: [],
      investments: [],
      expenses: [],
    })
  )

  assert.equal(snapshots.length, 1)
  assert.equal(snapshots[0].month, '2026-05')
  assert.equal(snapshots[0].incomes.husbandSalary, 5000000)
})

test('데이터셋 JSON은 모든 월 스냅샷을 가져온다', () => {
  const snapshots = parseFinanceSnapshotImports(
    JSON.stringify({
      version: 1,
      snapshots: [
        {
          month: '2026-01',
          updatedAt: '2026-01-31T12:00:00.000Z',
          incomes: { husbandSalary: 1000000, wifeSalary: 2000000, memo: '' },
          assets: [],
          debts: [],
          investments: [],
          expenses: [],
        },
        {
          month: '2026-05',
          updatedAt: '2026-05-31T12:00:00.000Z',
          incomes: { husbandSalary: 5000000, wifeSalary: 4000000, memo: '' },
          assets: [
            {
              id: 'asset-1',
              owner: 'joint',
              category: 'deposit',
              name: '생활비 통장',
              amount: 12300000,
              memo: '',
            },
          ],
          debts: [],
          investments: [],
          expenses: [],
        },
        {
          month: '2026-03',
          updatedAt: '2026-03-31T12:00:00.000Z',
          incomes: { husbandSalary: 3000000, wifeSalary: 2000000, memo: '' },
          assets: [],
          debts: [],
          investments: [],
          expenses: [],
        },
      ],
    })
  )

  assert.deepEqual(
    snapshots.map((snapshot) => snapshot.month),
    ['2026-01', '2026-03', '2026-05']
  )
  assert.equal(snapshots[2].assets[0].name, '생활비 통장')
})

test('잘못된 JSON은 가져오기를 중단한다', () => {
  assert.throws(
    () => parseFinanceSnapshotImport('{bad json'),
    /유효하지 않은 JSON/
  )
})

test('month가 없는 스냅샷은 가져오기를 중단한다', () => {
  assert.throws(
    () =>
      parseFinanceSnapshotImport(
        JSON.stringify({
          updatedAt: '2026-05-31T12:00:00.000Z',
          incomes: { husbandSalary: 0, wifeSalary: 0, memo: '' },
          assets: [],
          debts: [],
          investments: [],
          expenses: [],
        })
      ),
    /가져올 수 있는 재무 스냅샷/
  )
})

import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

import {
  createDefaultExpenseRows,
  createFinanceRepository,
} from './index.ts'

async function createRepoFixture(initialPayload) {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'finance-repository-'))
  const filePath = path.join(tempDir, 'data/private/finance-snapshots.json')

  if (initialPayload !== undefined) {
    await mkdir(path.dirname(filePath), { recursive: true })
    await writeFile(filePath, `${JSON.stringify(initialPayload, null, 2)}\n`, 'utf8')
  }

  return {
    filePath,
    repository: createFinanceRepository({ filePath }),
  }
}

test('첫 스냅샷 생성 시 기본 수입 필드와 기본 지출 카테고리 행을 가진 월 스냅샷이 저장된다', async () => {
  const { repository, filePath } = await createRepoFixture()

  const result = await repository.createSnapshotFromPrevious('2026-01')
  const persisted = JSON.parse(await readFile(filePath, 'utf8'))

  assert.equal(result.created, true)
  assert.equal(result.sourceMonth, null)
  assert.equal(result.snapshot.month, '2026-01')
  assert.equal(result.snapshot.incomes.husbandSalary, 0)
  assert.equal(result.snapshot.incomes.wifeSalary, 0)
  assert.deepEqual(result.snapshot.expenses, createDefaultExpenseRows())
  assert.equal(persisted.version, 1)
  assert.equal(persisted.snapshots.length, 1)
})

test('새 월 생성 시 가장 가까운 이전 스냅샷을 복사하고 updatedAt만 갱신한다', async () => {
  const { repository } = await createRepoFixture({
    version: 1,
    snapshots: [
      {
        month: '2026-01',
        updatedAt: '2026-01-31T09:00:00.000Z',
        incomes: { husbandSalary: 5000000, wifeSalary: 4200000, memo: '' },
        assets: [
          {
            id: 'asset-1',
            owner: 'joint',
            category: 'deposit',
            name: '생활비 통장',
            amount: 12000000,
            memo: '',
          },
        ],
        debts: [],
        investments: [],
        expenses: createDefaultExpenseRows().map((row) =>
          row.id === 'fixed-housing'
            ? { ...row, amount: 800000 }
            : row
        ),
      },
      {
        month: '2026-03',
        updatedAt: '2026-03-31T09:00:00.000Z',
        incomes: { husbandSalary: 5100000, wifeSalary: 4300000, memo: '' },
        assets: [
          {
            id: 'asset-1',
            owner: 'joint',
            category: 'deposit',
            name: '생활비 통장',
            amount: 15000000,
            memo: '',
          },
        ],
        debts: [],
        investments: [],
        expenses: createDefaultExpenseRows().map((row) =>
          row.id === 'fixed-housing'
            ? { ...row, amount: 820000 }
            : row
        ),
      },
    ],
  })

  const result = await repository.createSnapshotFromPrevious('2026-05')

  assert.equal(result.created, true)
  assert.equal(result.sourceMonth, '2026-03')
  assert.equal(result.snapshot.month, '2026-05')
  assert.equal(result.snapshot.incomes.husbandSalary, 5100000)
  assert.equal(result.snapshot.assets[0].amount, 15000000)
  assert.equal(
    result.snapshot.expenses.find((row) => row.id === 'fixed-housing')?.amount,
    820000
  )
  assert.notEqual(result.snapshot.updatedAt, '2026-03-31T09:00:00.000Z')
})

test('자동 누적 자산은 월 차이만큼 월 납입액을 더해 복사한다', async () => {
  const { repository } = await createRepoFixture({
    version: 1,
    snapshots: [
      {
        month: '2026-01',
        updatedAt: '2026-01-31T09:00:00.000Z',
        incomes: { husbandSalary: 0, wifeSalary: 0, memo: '' },
        assets: [
          {
            id: 'saving-1',
            owner: 'joint',
            category: 'saving',
            name: '정기적금',
            amount: 3000000,
            autoAccumulate: true,
            monthlyContribution: 500000,
            memo: '',
          },
        ],
        debts: [],
        investments: [],
        expenses: createDefaultExpenseRows(),
      },
    ],
  })

  const result = await repository.createSnapshotFromPrevious('2026-04')

  assert.equal(result.snapshot.assets[0].amount, 4500000)
  assert.equal(result.snapshot.assets[0].monthlyContribution, 500000)
  assert.equal(result.snapshot.assets[0].autoAccumulate, true)
})

test('이전 월을 역방향으로 만들 때 자동 누적 자산은 월 납입액만큼 차감한다', async () => {
  const { repository } = await createRepoFixture({
    version: 1,
    snapshots: [
      {
        month: '2026-04',
        updatedAt: '2026-04-30T09:00:00.000Z',
        incomes: { husbandSalary: 0, wifeSalary: 0, memo: '' },
        assets: [
          {
            id: 'saving-1',
            owner: 'joint',
            category: 'saving',
            name: '정기적금',
            amount: 4500000,
            autoAccumulate: true,
            monthlyContribution: 500000,
            memo: '',
          },
        ],
        debts: [],
        investments: [],
        expenses: createDefaultExpenseRows(),
      },
    ],
  })

  const result = await repository.createSnapshotFromPrevious('2026-03', {
    sourceMonth: '2026-04',
  })

  assert.equal(result.snapshot.assets[0].amount, 4000000)
})

test('이미 존재하는 월을 생성하려고 하면 기존 월로 이동한다', async () => {
  const { repository } = await createRepoFixture({
    version: 1,
    snapshots: [
      {
        month: '2026-05',
        updatedAt: '2026-05-31T09:00:00.000Z',
        incomes: { husbandSalary: 5200000, wifeSalary: 4300000, memo: '' },
        assets: [],
        debts: [],
        investments: [],
        expenses: createDefaultExpenseRows(),
      },
    ],
  })

  const result = await repository.createSnapshotFromPrevious('2026-05')

  assert.equal(result.created, false)
  assert.equal(result.sourceMonth, '2026-05')
  assert.equal(result.snapshot.month, '2026-05')
})

test('명시한 기준월을 복사해 새 월을 만들 수 있다', async () => {
  const { repository } = await createRepoFixture({
    version: 1,
    snapshots: [
      {
        month: '2026-04',
        updatedAt: '2026-04-30T09:00:00.000Z',
        incomes: { husbandSalary: 5000000, wifeSalary: 4000000, memo: '' },
        assets: [
          {
            id: 'asset-4',
            owner: 'joint',
            category: 'deposit',
            name: '4월 통장',
            amount: 4000000,
            memo: '',
          },
        ],
        debts: [],
        investments: [],
        expenses: createDefaultExpenseRows(),
      },
      {
        month: '2026-05',
        updatedAt: '2026-05-31T09:00:00.000Z',
        incomes: { husbandSalary: 0, wifeSalary: 0, memo: '' },
        assets: [],
        debts: [],
        investments: [],
        expenses: createDefaultExpenseRows(),
      },
    ],
  })

  const result = await repository.createSnapshotFromPrevious('2026-06', {
    sourceMonth: '2026-04',
  })

  assert.equal(result.created, true)
  assert.equal(result.sourceMonth, '2026-04')
  assert.equal(result.snapshot.assets[0].name, '4월 통장')
})

test('기존 월은 명시적으로 요청할 때만 기준월 내용으로 덮어쓴다', async () => {
  const { repository } = await createRepoFixture({
    version: 1,
    snapshots: [
      {
        month: '2026-04',
        updatedAt: '2026-04-30T09:00:00.000Z',
        incomes: { husbandSalary: 5000000, wifeSalary: 4000000, memo: '' },
        assets: [
          {
            id: 'asset-4',
            owner: 'joint',
            category: 'deposit',
            name: '4월 통장',
            amount: 4000000,
            memo: '',
          },
        ],
        debts: [],
        investments: [],
        expenses: createDefaultExpenseRows(),
      },
      {
        month: '2026-06',
        updatedAt: '2026-06-30T09:00:00.000Z',
        incomes: { husbandSalary: 0, wifeSalary: 0, memo: '' },
        assets: [],
        debts: [],
        investments: [],
        expenses: createDefaultExpenseRows(),
      },
    ],
  })

  const unchanged = await repository.createSnapshotFromPrevious('2026-06', {
    sourceMonth: '2026-04',
  })

  assert.equal(unchanged.created, false)
  assert.equal(unchanged.snapshot.assets.length, 0)

  const overwritten = await repository.createSnapshotFromPrevious('2026-06', {
    sourceMonth: '2026-04',
    overwrite: true,
  })

  assert.equal(overwritten.created, true)
  assert.equal(overwritten.sourceMonth, '2026-04')
  assert.equal(overwritten.snapshot.assets[0].name, '4월 통장')
})

test('저장 후 다시 읽었을 때 월 정렬과 row id가 유지된다', async () => {
  const { repository } = await createRepoFixture({
    version: 1,
    snapshots: [],
  })

  await repository.saveSnapshot({
    month: '2026-02',
    updatedAt: '2026-02-28T00:00:00.000Z',
    incomes: { husbandSalary: 5000000, wifeSalary: 4000000, memo: '' },
    assets: [
      {
        id: 'asset-a',
        owner: 'husband',
        category: 'cash',
        name: '비상금',
        amount: 1000000,
        memo: '',
      },
    ],
    debts: [],
    investments: [],
    expenses: createDefaultExpenseRows(),
  })

  await repository.saveSnapshot({
    month: '2026-01',
    updatedAt: '2026-01-31T00:00:00.000Z',
    incomes: { husbandSalary: 4900000, wifeSalary: 3900000, memo: '' },
    assets: [],
    debts: [],
    investments: [],
    expenses: createDefaultExpenseRows(),
  })

  assert.deepEqual(await repository.listMonths(), ['2026-01', '2026-02'])

  const snapshot = await repository.getSnapshot('2026-02')
  assert.equal(snapshot?.assets[0].id, 'asset-a')
})

test('malformed JSON은 명시적 오류를 던진다', async () => {
  const { repository } = await createRepoFixture()
  await mkdir(path.dirname(repository.filePath), { recursive: true })
  await writeFile(repository.filePath, '{bad json', 'utf8')

  await assert.rejects(
    repository.listMonths(),
    /Invalid finance snapshots JSON/
  )
})

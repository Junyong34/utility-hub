import test from 'node:test'
import assert from 'node:assert/strict'

import {
  NATIONAL_HOUSING_BOND_GUIDE_ROWS,
  NATIONAL_HOUSING_BOND_GUIDE_TITLE,
} from './national-housing-bond-guide.ts'

test('국민주택채권 안내는 요청한 표 제목과 6개 구간을 포함한다', () => {
  assert.equal(NATIONAL_HOUSING_BOND_GUIDE_TITLE, '국민주택채권 의무매입률 안내')
  assert.equal(NATIONAL_HOUSING_BOND_GUIDE_ROWS.length, 6)
})

test('국민주택채권 안내는 6억원 이상 구간의 서울·광역시와 기타지역 요율을 포함한다', () => {
  const row = NATIONAL_HOUSING_BOND_GUIDE_ROWS.find(item => item.standardPrice === '6억원 이상')

  assert.ok(row)
  assert.equal(row.metroRate, '3.1%')
  assert.equal(row.otherRate, '2.6%')
})

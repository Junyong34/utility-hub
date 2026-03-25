import test from 'node:test'
import assert from 'node:assert/strict'

import { STANDARD_PRICE_GUIDE_SECTIONS } from './standard-price-guide.ts'

test('시가표준액 상세 안내는 조회 방법과 분양아파트 입력 안내를 모두 포함한다', () => {
  assert.deepEqual(
    STANDARD_PRICE_GUIDE_SECTIONS.map(section => section.title),
    ['시가표준액이란?', '조회 방법', '분양아파트는 어떻게 입력하나요?']
  )
})

test('분양아파트 안내는 매매가와 시가표준액을 구분해 설명한다', () => {
  const presaleSection = STANDARD_PRICE_GUIDE_SECTIONS.find(
    section => section.title === '분양아파트는 어떻게 입력하나요?'
  )

  assert.ok(presaleSection)
  assert.match(presaleSection.body, /매매가.*분양가/)
  assert.match(presaleSection.body, /시가표준액.*공시가격|시가표준액.*별도/)
})

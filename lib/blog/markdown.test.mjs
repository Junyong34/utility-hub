import test from 'node:test'
import assert from 'node:assert/strict'

import { extractFaqItems } from './markdown.ts'

test('extractFaqItems는 FAQ 섹션 아래의 질문과 답변을 추출한다', () => {
  const markdown = `
# 제목

## 개요
본문은 무시되어야 합니다.

## FAQ ❓

### 세정력은 전 제품이 동일한가요?
아닙니다. 피지 세정력은 전 제품이 우수했습니다.

미세먼지 세정력은 제품별 차이가 있었습니다.

### 제품 사진은 어디서 보나요?
본문 하단의 제품 사진 섹션을 확인하면 됩니다.

## 출처
마지막 섹션입니다.
`

  assert.deepEqual(extractFaqItems(markdown), [
    {
      question: '세정력은 전 제품이 동일한가요?',
      answer:
        '아닙니다. 피지 세정력은 전 제품이 우수했습니다.\n\n미세먼지 세정력은 제품별 차이가 있었습니다.',
    },
    {
      question: '제품 사진은 어디서 보나요?',
      answer: '본문 하단의 제품 사진 섹션을 확인하면 됩니다.',
    },
  ])
})

test('extractFaqItems는 FAQ가 없으면 빈 배열을 반환한다', () => {
  const markdown = `
## 개요
FAQ가 없는 문서입니다.
`

  assert.deepEqual(extractFaqItems(markdown), [])
})

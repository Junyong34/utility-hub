import test from 'node:test'
import assert from 'node:assert/strict'

import {
  resolveBlogPostOgImage,
  resolveToolMetadataOgImage,
} from './og-policy.ts'

test('blog OG 이미지는 정적 값이 있으면 그 값을 우선 사용한다', () => {
  assert.equal(
    resolveBlogPostOgImage({
      slug: 'sample-post',
      categorySlug: 'development',
      ogImage: '/og-images/post/post-1.webp',
    }),
    '/og-images/post/post-1.webp'
  )
})

test('blog OG 이미지는 정적 값이 없으면 자동생성 route를 사용한다', () => {
  assert.equal(
    resolveBlogPostOgImage({
      slug: 'sample-post',
      categorySlug: 'development',
    }),
    '/api/og/blog/development/sample-post'
  )
})

test('tool OG 이미지는 정적 값이 있으면 그 값을 우선 사용한다', () => {
  assert.equal(
    resolveToolMetadataOgImage(
      'loan-calculator',
      '/og-images/post/loan-calc.webp'
    ),
    '/og-images/post/loan-calc.webp'
  )
})

test('tool OG 이미지는 정적 값이 없으면 자동생성 route를 사용한다', () => {
  assert.equal(
    resolveToolMetadataOgImage('dsr-calculator'),
    '/api/og/tools/dsr-calculator'
  )
})

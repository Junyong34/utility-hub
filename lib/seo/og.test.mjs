import test from 'node:test'
import assert from 'node:assert/strict'

import {
  buildBlogOgImagePath,
  buildToolOgImagePath,
  buildCustomOgImagePath,
} from './og.ts'

test('blog OG 경로는 category와 slug를 기반으로 생성한다', () => {
  assert.equal(
    buildBlogOgImagePath({
      categorySlug: 'parking',
      slug: 'gimpo-airport-nearby-parking-guide',
    }),
    '/api/og/blog/parking/gimpo-airport-nearby-parking-guide'
  )
})

test('tool OG 경로는 tool id를 기반으로 생성한다', () => {
  assert.equal(
    buildToolOgImagePath('loan-calculator'),
    '/api/og/tools/loan-calculator'
  )
})

test('custom OG 경로는 빈 값 없이 쿼리 파라미터를 직렬화한다', () => {
  assert.equal(
    buildCustomOgImagePath({
      title: '주택 구입 비용 계산기',
      description: '',
      image: '/og-images/post/home-buying-funds.webp',
      bgColor: '#0f172a',
      accentColor: '#f59e0b',
      label: 'TOOL',
    }),
    '/api/og/custom?title=%EC%A3%BC%ED%83%9D+%EA%B5%AC%EC%9E%85+%EB%B9%84%EC%9A%A9+%EA%B3%84%EC%82%B0%EA%B8%B0&image=%2Fog-images%2Fpost%2Fhome-buying-funds.webp&bgColor=%230f172a&accentColor=%23f59e0b&label=TOOL'
  )
})

test('custom OG 경로는 imageEnabled가 false면 image를 직렬화하지 않는다', () => {
  assert.equal(
    buildCustomOgImagePath({
      title: '한글 OG 테스트',
      description: '이미지 없이 렌더링',
      image: '/og-images/main-og-image.png',
      imageEnabled: false,
      label: 'CUSTOM',
    }),
    '/api/og/custom?title=%ED%95%9C%EA%B8%80+OG+%ED%85%8C%EC%8A%A4%ED%8A%B8&description=%EC%9D%B4%EB%AF%B8%EC%A7%80+%EC%97%86%EC%9D%B4+%EB%A0%8C%EB%8D%94%EB%A7%81&label=CUSTOM'
  )
})

test('custom OG 경로는 imageEnabled가 true일 때만 image를 직렬화한다', () => {
  assert.equal(
    buildCustomOgImagePath({
      title: '한글 OG 테스트',
      image: '/og-images/main-og-image.png',
      imageEnabled: true,
    }),
    '/api/og/custom?title=%ED%95%9C%EA%B8%80+OG+%ED%85%8C%EC%8A%A4%ED%8A%B8&image=%2Fog-images%2Fmain-og-image.png'
  )
})

test('custom OG 다운로드 경로는 webp 포맷과 download 플래그를 직렬화한다', () => {
  assert.equal(
    buildCustomOgImagePath({
      title: '커스텀 다운로드',
      image: '/og-images/main-og-image.png',
      format: 'webp',
      download: true,
    }),
    '/api/og/custom?title=%EC%BB%A4%EC%8A%A4%ED%85%80+%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C&image=%2Fog-images%2Fmain-og-image.png&format=webp&download=1'
  )
})

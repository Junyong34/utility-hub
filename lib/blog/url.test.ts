import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildBlogPostPath,
  buildBlogPostUrl,
} from './url.ts';

test('buildBlogPostPath는 카테고리와 슬러그를 포함한 상세 경로를 반환한다', () => {
  assert.equal(
    buildBlogPostPath({
      categorySlug: 'consumer',
      slug: 'kca-budget-coffee-brand-satisfaction',
    }),
    '/blog/consumer/kca-budget-coffee-brand-satisfaction'
  );
});

test('buildBlogPostUrl은 baseUrl 기준 절대 URL을 반환한다', () => {
  assert.equal(
    buildBlogPostUrl('https://www.zento.kr', {
      categorySlug: 'lotto',
      slug: 'ai-lotto-number-guide',
    }),
    'https://www.zento.kr/blog/lotto/ai-lotto-number-guide'
  );
});

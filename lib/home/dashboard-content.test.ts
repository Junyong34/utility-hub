import test from 'node:test';
import assert from 'node:assert/strict';

import { buildDashboardContent } from './dashboard-content';

test('latestItems는 blog와 tool을 날짜 기준으로 합쳐 최신순 3개만 반환한다', () => {
  const result = buildDashboardContent(
    [
      {
        slug: 'parking-guide',
        title: '주차 가이드',
        date: '2026-03-04',
        categorySlug: 'parking',
      },
      {
        slug: 'older-post',
        title: '이전 글',
        date: '2026-03-01',
        categorySlug: 'development',
      },
    ],
    [
      {
        id: 'loan-calculator',
        name: '대출 이자 계산기',
        publishedAt: '2026-03-06',
      },
      {
        id: 'lotto',
        name: 'AI 추천 번호 생성',
        publishedAt: '2026-03-05',
      },
    ]
  );

  assert.deepEqual(
    result.latestItems.map(item => ({
      id: item.id,
      type: item.type,
      href: item.href,
      sourceLabel: item.sourceLabel,
      publishedAt: item.publishedAt,
    })),
    [
      {
        id: 'tool:loan-calculator',
        type: 'tool',
        href: '/tools/loan-calculator',
        sourceLabel: 'TOOL',
        publishedAt: '2026-03-06',
      },
      {
        id: 'tool:lotto',
        type: 'tool',
        href: '/tools/lotto',
        sourceLabel: 'TOOL',
        publishedAt: '2026-03-05',
      },
      {
        id: 'blog:parking/parking-guide',
        type: 'blog',
        href: '/blog/parking/parking-guide',
        sourceLabel: 'BLOG',
        publishedAt: '2026-03-04',
      },
    ]
  );
});

test('hotItems는 homeFeatured가 있는 항목만 hotRank 순서대로 반환한다', () => {
  const result = buildDashboardContent(
    [
      {
        slug: 'featured-post',
        title: '특집 글',
        date: '2026-03-03',
        categorySlug: 'ai-image-creator',
        homeFeatured: {
          hotRank: 2,
          badge: 'GUIDE',
        },
      },
    ],
    [
      {
        id: 'loan-calculator',
        name: '대출 이자 계산기',
        publishedAt: '2026-03-06',
        homeFeatured: {
          hotRank: 3,
        },
      },
      {
        id: 'lotto',
        name: 'AI 추천 번호 생성',
        publishedAt: '2026-03-05',
        homeFeatured: {
          hotRank: 1,
          badge: 'POPULAR',
        },
      },
      {
        id: 'hidden-tool',
        name: '숨김 도구',
        publishedAt: '2026-02-20',
      },
    ]
  );

  assert.deepEqual(
    result.hotItems.map(item => ({
      id: item.id,
      badge: item.homeFeatured?.badge,
      hotRank: item.homeFeatured?.hotRank,
    })),
    [
      {
        id: 'tool:lotto',
        badge: 'POPULAR',
        hotRank: 1,
      },
      {
        id: 'blog:ai-image-creator/featured-post',
        badge: 'GUIDE',
        hotRank: 2,
      },
      {
        id: 'tool:loan-calculator',
        badge: undefined,
        hotRank: 3,
      },
    ]
  );
});

test('latestItems는 동일한 날짜일 때 원래 입력 순서를 유지한다', () => {
  const result = buildDashboardContent(
    [
      {
        slug: 'first-post',
        title: '첫 번째 글',
        date: '2026-03-03',
        categorySlug: 'development',
      },
      {
        slug: 'second-post',
        title: '두 번째 글',
        date: '2026-03-03',
        categorySlug: 'parking',
      },
    ],
    [
      {
        id: 'loan-calculator',
        name: '대출 이자 계산기',
        publishedAt: '2026-03-03',
      },
    ]
  );

  assert.deepEqual(
    result.latestItems.map(item => item.id),
    [
      'blog:development/first-post',
      'blog:parking/second-post',
      'tool:loan-calculator',
    ]
  );
});

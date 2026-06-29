import test from 'node:test';
import assert from 'node:assert/strict';

function createPosts(count) {
  return Array.from({ length: count }, (_, index) => ({
    slug: `post-${index + 1}`,
    title: `Post ${index + 1}`,
    date: `2026-01-${String((index % 28) + 1).padStart(2, '0')}`,
    author: 'Zento',
    excerpt: `Excerpt ${index + 1}`,
    tags: [],
    category: '소비자 정보',
    categorySlug: 'consumer',
  }));
}

test('queryBlogPostsPage returns the requested slice and pagination metadata', async () => {
  const { queryBlogPostsPage } = await import('./pagination.ts');

  const result = queryBlogPostsPage(createPosts(45), { page: 2 });

  assert.equal(result.posts.length, 20);
  assert.equal(result.posts[0].slug, 'post-21');
  assert.equal(result.posts.at(-1).slug, 'post-40');
  assert.equal(result.currentPage, 2);
  assert.equal(result.totalPages, 3);
  assert.equal(result.hasMore, true);
});

test('queryBlogPostsPage normalizes invalid and out-of-range pages', async () => {
  const { queryBlogPostsPage } = await import('./pagination.ts');

  assert.equal(queryBlogPostsPage(createPosts(45), { page: 0 }).currentPage, 1);
  assert.equal(
    queryBlogPostsPage(createPosts(45), { page: 'wat' }).currentPage,
    1
  );
  assert.equal(
    queryBlogPostsPage(createPosts(45), { page: 99 }).currentPage,
    3
  );
});

test('buildBlogPaginationHref omits page 1 and supports category pages', async () => {
  const { buildBlogPaginationHref } = await import('./pagination.ts');

  assert.equal(buildBlogPaginationHref({ page: 1 }), '/blog');
  assert.equal(buildBlogPaginationHref({ page: 2 }), '/blog?page=2');
  assert.equal(
    buildBlogPaginationHref({ categorySlug: 'consumer', page: 1 }),
    '/blog/consumer'
  );
  assert.equal(
    buildBlogPaginationHref({ categorySlug: 'consumer', page: 2 }),
    '/blog/consumer?page=2'
  );
});

test('buildBlogPaginationPages returns a compact page window', async () => {
  const { buildBlogPaginationPages } = await import('./pagination.ts');

  assert.deepEqual(
    buildBlogPaginationPages({ currentPage: 1, totalPages: 3 }),
    [1, 2, 3]
  );
  assert.deepEqual(
    buildBlogPaginationPages({ currentPage: 6, totalPages: 13 }),
    [1, 4, 5, 6, 7, 8, 13]
  );
  assert.deepEqual(
    buildBlogPaginationPages({ currentPage: 13, totalPages: 13 }),
    [1, 9, 10, 11, 12, 13]
  );
});

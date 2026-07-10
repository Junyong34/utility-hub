import test from 'node:test';
import assert from 'node:assert/strict';

test('buildPlaceListPath returns global and region list paths', async () => {
  const { buildPlaceListPath } = await import('./place-pagination.ts');

  assert.equal(buildPlaceListPath(), '/places');
  assert.equal(buildPlaceListPath('seoul'), '/places/seoul');
});

test('buildPlacePaginationHref omits page 1 and adds later pages', async () => {
  const { buildPlacePaginationHref } = await import('./place-pagination.ts');

  assert.equal(buildPlacePaginationHref({ page: 1 }), '/places');
  assert.equal(buildPlacePaginationHref({ page: 2 }), '/places?page=2');
  assert.equal(
    buildPlacePaginationHref({ region: 'seoul', page: 1 }),
    '/places/seoul'
  );
  assert.equal(
    buildPlacePaginationHref({ region: 'seoul', page: 2 }),
    '/places/seoul?page=2'
  );
});

test('buildPlacePaginationHref normalizes invalid and out-of-range pages', async () => {
  const { buildPlacePaginationHref } = await import('./place-pagination.ts');

  assert.equal(buildPlacePaginationHref({ page: 0 }), '/places');
  assert.equal(buildPlacePaginationHref({ page: -1 }), '/places');
  assert.equal(buildPlacePaginationHref({ page: 'wat' }), '/places');
  assert.equal(
    buildPlacePaginationHref({ region: 'seoul', page: 99, totalPages: 6 }),
    '/places/seoul?page=6'
  );
});

test('buildPlacePaginationHref preserves filters for functional navigation only', async () => {
  const { buildPlacePaginationHref } = await import('./place-pagination.ts');

  const href = buildPlacePaginationHref({
    page: 2,
    filters: {
      search: '서울',
      age: null,
      category: null,
      season: null,
      indoor: false,
      outdoor: false,
      free: true,
      feeding: false,
      stroller: false,
      rain: false,
    },
    preserveFilters: true,
  });

  assert.equal(href, '/places?page=2&search=%EC%84%9C%EC%9A%B8&free=true');
  assert.equal(
    buildPlacePaginationHref({
      page: 2,
      filters: {
        search: '서울',
        age: null,
        category: null,
        season: null,
        indoor: false,
        outdoor: false,
        free: true,
        feeding: false,
        stroller: false,
        rain: false,
      },
    }),
    '/places?page=2'
  );
});

test('buildPlacePaginationHref preserves the animal theme in functional navigation', async () => {
  const { buildPlacePaginationHref } = await import('./place-pagination.ts');

  assert.equal(
    buildPlacePaginationHref({
      page: 2,
      filters: { theme: 'animal' },
      preserveFilters: true,
    }),
    '/places?page=2&theme=animal'
  );
});

test('buildPlaceCanonicalPath self-canonicalizes unfiltered pages', async () => {
  const { buildPlaceCanonicalPath } = await import('./place-pagination.ts');

  assert.equal(buildPlaceCanonicalPath({ page: 1 }), '/places');
  assert.equal(buildPlaceCanonicalPath({ page: 2 }), '/places?page=2');
  assert.equal(
    buildPlaceCanonicalPath({ region: 'seoul', page: 2 }),
    '/places/seoul?page=2'
  );
});

test('buildPlaceCanonicalPath canonicalizes filtered URLs to unfiltered base', async () => {
  const { buildPlaceCanonicalPath } = await import('./place-pagination.ts');

  assert.equal(
    buildPlaceCanonicalPath({
      page: 2,
      filters: { free: true },
    }),
    '/places'
  );
  assert.equal(
    buildPlaceCanonicalPath({
      region: 'seoul',
      page: 2,
      filters: { free: true },
    }),
    '/places/seoul'
  );
  assert.equal(
    buildPlaceCanonicalPath({
      region: 'incheon',
      filters: { theme: 'animal' },
    }),
    '/places/incheon'
  );
});

test('buildPlacePaginationPages returns a compact page window', async () => {
  const { buildPlacePaginationPages } = await import('./place-pagination.ts');

  assert.deepEqual(
    buildPlacePaginationPages({ currentPage: 1, totalPages: 2 }),
    [1, 2]
  );
  assert.deepEqual(
    buildPlacePaginationPages({ currentPage: 6, totalPages: 13 }),
    [1, 4, 5, 6, 7, 8, 13]
  );
  assert.deepEqual(
    buildPlacePaginationPages({ currentPage: 13, totalPages: 13 }),
    [1, 9, 10, 11, 12, 13]
  );
});

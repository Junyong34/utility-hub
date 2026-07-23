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

test('resolvePlaceListIndexingPolicy keeps a unique unfiltered page indexable', async () => {
  const { resolvePlaceListIndexingPolicy } =
    await import('./place-pagination.ts');

  const policy = resolvePlaceListIndexingPolicy({
    page: {
      currentPage: 2,
      totalPages: 3,
      places: [{ id: 'place-1' }],
    },
    rawSearchParams: { page: '2' },
  });

  assert.deepEqual(policy, {
    canonicalPath: '/places?page=2',
    index: true,
    follow: true,
    includeInSitemap: true,
  });
});

test('resolvePlaceListIndexingPolicy noindexes filtered variations', async () => {
  const { resolvePlaceListIndexingPolicy } =
    await import('./place-pagination.ts');

  const policy = resolvePlaceListIndexingPolicy({
    page: {
      currentPage: 2,
      totalPages: 3,
      places: [{ id: 'place-1' }],
    },
    rawSearchParams: { page: '2', free: 'true' },
  });

  assert.deepEqual(policy, {
    canonicalPath: '/places',
    index: false,
    follow: true,
    includeInSitemap: false,
  });
});

test('resolvePlaceListIndexingPolicy redirects page and transport variations', async () => {
  const { resolvePlaceListIndexingPolicy } =
    await import('./place-pagination.ts');

  const page = {
    currentPage: 3,
    totalPages: 3,
    places: [{ id: 'place-3' }],
  };

  assert.equal(
    resolvePlaceListIndexingPolicy({
      page,
      rawSearchParams: { page: '999' },
    }).redirectPath,
    '/places?page=3'
  );
  assert.equal(
    resolvePlaceListIndexingPolicy({
      page,
      rawSearchParams: { limit: '10', page: '2' },
    }).redirectPath,
    '/places?page=3'
  );
  assert.equal(
    resolvePlaceListIndexingPolicy({
      page,
      rawSearchParams: { limit: '18', page: '3' },
    }).redirectPath,
    '/places?page=3'
  );
  assert.equal(
    resolvePlaceListIndexingPolicy({
      page,
      rawSearchParams: { limit: 'invalid', page: '3' },
    }).redirectPath,
    '/places?page=3'
  );
  assert.equal(
    resolvePlaceListIndexingPolicy({
      page: { ...page, currentPage: 2 },
      rawSearchParams: { region: 'seoul', free: 'true', page: '2' },
    }).redirectPath,
    '/places/seoul?page=2&free=true'
  );
});

test('resolvePlaceListIndexingPolicy noindexes unknown query variations', async () => {
  const { resolvePlaceListIndexingPolicy } =
    await import('./place-pagination.ts');

  const policy = resolvePlaceListIndexingPolicy({
    page: {
      currentPage: 1,
      totalPages: 1,
      places: [{ id: 'place-1' }],
    },
    rawSearchParams: { utm_source: 'newsletter' },
  });

  assert.deepEqual(policy, {
    canonicalPath: '/places',
    index: false,
    follow: true,
    includeInSitemap: false,
  });
});

test('resolvePlaceListIndexingPolicy noindexes duplicate query values', async () => {
  const { resolvePlaceListIndexingPolicy } =
    await import('./place-pagination.ts');

  const policy = resolvePlaceListIndexingPolicy({
    page: {
      currentPage: 2,
      totalPages: 3,
      places: [{ id: 'place-2' }],
    },
    rawSearchParams: { page: ['2', '3'] },
  });

  assert.deepEqual(policy, {
    canonicalPath: '/places?page=2',
    index: false,
    follow: true,
    includeInSitemap: false,
  });
});

test('resolvePlaceListIndexingPolicy noindexes non-unique paginated cards', async () => {
  const { resolvePlaceListIndexingPolicy } =
    await import('./place-pagination.ts');

  for (const places of [[], [{ id: 'place-1' }, { id: 'place-1' }]]) {
    const policy = resolvePlaceListIndexingPolicy({
      page: { currentPage: 2, totalPages: 3, places },
      rawSearchParams: { page: '2' },
    });

    assert.deepEqual(policy, {
      canonicalPath: '/places?page=2',
      index: false,
      follow: true,
      includeInSitemap: false,
    });
  }
});

test('buildPlaceListRouteQueryOptions uses path scope and default page size', async () => {
  const { buildPlaceListRouteQueryOptions } =
    await import('./place-pagination.ts');

  assert.deepEqual(
    buildPlaceListRouteQueryOptions({
      rawSearchParams: { limit: '10', region: 'seoul', free: 'true' },
    }),
    { limit: undefined, region: 'seoul', free: 'true' }
  );
  assert.deepEqual(
    buildPlaceListRouteQueryOptions({
      region: 'incheon',
      rawSearchParams: { region: 'seoul', page: '2' },
    }),
    { region: 'incheon', page: '2', limit: undefined }
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

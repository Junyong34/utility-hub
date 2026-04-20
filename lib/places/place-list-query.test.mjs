import test from 'node:test';
import assert from 'node:assert/strict';

const PLACE_FIXTURES = [
  {
    id: 'seoul-indoor-free',
    name: '서울 실내 무료',
    region: 'seoul',
    subRegion: '종로구',
    category: 'museum',
    ageBands: ['1-3y'],
    indoorOutdoor: 'indoor',
    priceType: 'free',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://example.com/seoul-indoor-free',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'official_verified',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: true,
  },
  {
    id: 'seoul-both-paid-all-age',
    name: '서울 실내외 유료 전연령',
    region: 'seoul',
    subRegion: '성동구',
    category: 'experience',
    ageBands: ['all'],
    indoorOutdoor: 'both',
    priceType: 'paid',
    reservationRequired: true,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://example.com/seoul-both-paid-all-age',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'official_verified',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: true,
  },
  {
    id: 'south-outdoor-free',
    name: '경기남부 야외 무료',
    region: 'gyeonggi-south',
    subRegion: '수원시',
    category: 'park',
    ageBands: ['3-6y'],
    indoorOutdoor: 'outdoor',
    priceType: 'free',
    reservationRequired: false,
    parking: false,
    sourceType: 'semi-official',
    sourceUrl: 'https://example.com/south-outdoor-free',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'semi_verified',
    feedingRoom: false,
    strollerFriendly: true,
    rainFriendly: false,
  },
  {
    id: 'north-indoor-partial-free',
    name: '경기북부 실내 부분무료',
    region: 'gyeonggi-north',
    subRegion: '고양시',
    category: 'library',
    ageBands: ['0-12m'],
    indoorOutdoor: 'indoor',
    priceType: 'partial-free',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://example.com/north-indoor-partial-free',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'official_verified',
    feedingRoom: true,
    strollerFriendly: false,
    rainFriendly: true,
  },
  {
    id: 'stale-hidden-place',
    name: '재검수 필요 장소',
    region: 'seoul',
    subRegion: '마포구',
    category: 'kids-cafe',
    ageBands: ['1-3y'],
    indoorOutdoor: 'indoor',
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'discovery',
    sourceUrl: 'https://example.com/stale-hidden-place',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'needs_refresh',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: true,
  },
];

test('queryPlaceListFrom returns first page of publishable places by default', async () => {
  const { queryPlaceListFrom } = await import('./place-list-query.ts');

  const result = queryPlaceListFrom(PLACE_FIXTURES, { limit: 2 });

  assert.deepEqual(
    result.places.map(place => place.id),
    ['seoul-indoor-free', 'seoul-both-paid-all-age']
  );
  assert.equal(result.scopeTotal, 4);
  assert.equal(result.total, 4);
  assert.equal(result.hasMore, true);
  assert.equal(result.currentPage, 1);
  assert.equal(result.totalPages, 2);
});

test('queryPlaceListFrom applies region and category filters together', async () => {
  const { queryPlaceListFrom } = await import('./place-list-query.ts');

  const result = queryPlaceListFrom(PLACE_FIXTURES, {
    region: 'seoul',
    category: 'experience',
  });

  assert.equal(result.scopeTotal, 2);
  assert.equal(result.total, 1);
  assert.deepEqual(
    result.places.map(place => place.id),
    ['seoul-both-paid-all-age']
  );
});

test('queryPlaceListFrom keeps only both-type places when indoor and outdoor are both enabled', async () => {
  const { queryPlaceListFrom } = await import('./place-list-query.ts');

  const result = queryPlaceListFrom(PLACE_FIXTURES, {
    indoor: true,
    outdoor: true,
  });

  assert.deepEqual(
    result.places.map(place => place.id),
    ['seoul-both-paid-all-age']
  );
  assert.equal(result.total, 1);
});

test('queryPlaceListFrom treats all-age places as matches for age-specific filters', async () => {
  const { queryPlaceListFrom } = await import('./place-list-query.ts');

  const result = queryPlaceListFrom(PLACE_FIXTURES, {
    region: 'seoul',
    age: '1-3y',
  });

  assert.deepEqual(
    result.places.map(place => place.id),
    ['seoul-indoor-free', 'seoul-both-paid-all-age']
  );
  assert.equal(result.total, 2);
});

test('queryPlaceListFrom normalizes invalid page and limit inputs safely', async () => {
  const { queryPlaceListFrom } = await import('./place-list-query.ts');

  const result = queryPlaceListFrom(PLACE_FIXTURES, {
    page: 0,
    limit: -1,
  });

  assert.equal(result.currentPage, 1);
  assert.equal(result.pageSize, 18);
  assert.equal(result.totalPages, 1);
  assert.equal(result.hasMore, false);
  assert.equal(result.places.length, 4);
});

test('queryPlaceListFrom ignores unknown filter values instead of throwing', async () => {
  const { queryPlaceListFrom } = await import('./place-list-query.ts');

  const result = queryPlaceListFrom(PLACE_FIXTURES, {
    category: 'not-a-real-category',
    age: 'not-a-real-age',
    indoor: 'wat',
    region: 'not-a-region',
  });

  assert.equal(result.scopeTotal, 4);
  assert.equal(result.total, 4);
  assert.equal(result.places.length, 4);
});

test('queryPlaceListFrom keeps total and pagination metadata consistent for later pages', async () => {
  const { queryPlaceListFrom } = await import('./place-list-query.ts');

  const result = queryPlaceListFrom(PLACE_FIXTURES, {
    limit: 2,
    page: 2,
  });

  assert.deepEqual(
    result.places.map(place => place.id),
    ['south-outdoor-free', 'north-indoor-partial-free']
  );
  assert.equal(result.total, 4);
  assert.equal(result.scopeTotal, 4);
  assert.equal(result.currentPage, 2);
  assert.equal(result.totalPages, 2);
  assert.equal(result.hasMore, false);
});

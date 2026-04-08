import test from 'node:test';
import assert from 'node:assert/strict';

const PLACE_FIXTURES = [
  {
    id: 'seoul-museum',
    name: '서울 박물관',
    region: 'seoul',
    subRegion: '종로구',
    category: 'museum',
    ageBands: ['1-3y'],
    indoorOutdoor: 'indoor',
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://example.com/seoul-museum',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'official_verified',
  },
  {
    id: 'gyeonggi-library',
    name: '경기 도서관',
    region: 'gyeonggi-south',
    subRegion: '수원시',
    category: 'library',
    ageBands: ['all'],
    indoorOutdoor: 'indoor',
    priceType: 'free',
    reservationRequired: false,
    parking: false,
    sourceType: 'semi-official',
    sourceUrl: 'https://example.com/gyeonggi-library',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'semi_verified',
  },
  {
    id: 'stale-kids-cafe',
    name: '재검수 필요 키즈카페',
    region: 'seoul',
    subRegion: '마포구',
    category: 'kids-cafe',
    ageBands: ['1-3y'],
    indoorOutdoor: 'indoor',
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'discovery',
    sourceUrl: 'https://example.com/stale-kids-cafe',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'needs_refresh',
  },
];

test('getPublishablePlacesFrom keeps only official and semi verified places', async () => {
  const { getPublishablePlacesFrom } = await import('./place-queries.ts');

  const publishablePlaces = getPublishablePlacesFrom(PLACE_FIXTURES);

  assert.deepEqual(
    publishablePlaces.map(place => place.id),
    ['seoul-museum', 'gyeonggi-library']
  );
});

test('getPlaceCountByRegionFrom counts only publishable places by region', async () => {
  const { getPlaceCountByRegionFrom } = await import('./place-queries.ts');

  assert.deepEqual(getPlaceCountByRegionFrom(PLACE_FIXTURES), {
    seoul: 1,
    'gyeonggi-south': 1,
  });
});

test('getPlacesByAgeBandFrom returns all publishable places when query is all', async () => {
  const { getPlacesByAgeBandFrom } = await import('./place-queries.ts');

  assert.deepEqual(
    getPlacesByAgeBandFrom(PLACE_FIXTURES, 'all').map(place => place.id),
    ['seoul-museum', 'gyeonggi-library']
  );
});

test('getPlacesByAgeBandFrom includes matching age bands and all-age places only', async () => {
  const { getPlacesByAgeBandFrom } = await import('./place-queries.ts');

  assert.deepEqual(
    getPlacesByAgeBandFrom(PLACE_FIXTURES, '1-3y').map(place => place.id),
    ['seoul-museum', 'gyeonggi-library']
  );
});

test('getPlaceByIdFrom finds places from the full dataset regardless of publishability', async () => {
  const { getPlaceByIdFrom } = await import('./place-queries.ts');

  assert.equal(getPlaceByIdFrom(PLACE_FIXTURES, 'stale-kids-cafe')?.id, 'stale-kids-cafe');
  assert.equal(getPlaceByIdFrom(PLACE_FIXTURES, 'missing-place'), undefined);
});

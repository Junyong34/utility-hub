import test from 'node:test';
import assert from 'node:assert/strict';

test('places index exposes all expected region buckets', async () => {
  const { PLACES_BY_REGION } = await import('./index.ts');

  assert.deepEqual(Object.keys(PLACES_BY_REGION).sort(), [
    'gyeonggi-north',
    'gyeonggi-south',
    'incheon',
    'seoul',
  ]);
});

test('places index aggregates current seoul and gyeonggi south seeds', async () => {
  const {
    ALL_PLACES,
    GYEONGGI_SOUTH_PLACES,
    SEOUL_PLACES,
  } = await import('./index.ts');

  assert.equal(SEOUL_PLACES.length, 11);
  assert.equal(GYEONGGI_SOUTH_PLACES.length, 8);
  assert.equal(ALL_PLACES.length, 19);
});

test('places index preserves important ids and verification state', async () => {
  const { ALL_PLACES } = await import('./index.ts');

  const placeIds = new Set(ALL_PLACES.map(place => place.id));
  assert.equal(placeIds.has('national-children-museum'), true);
  assert.equal(placeIds.has('seoul-national-museum-of-korea'), true);
  assert.equal(placeIds.has('seoul-toy-library-mapo'), true);

  const siheungKidsCafe = ALL_PLACES.find(
    place => place.id === 'siheung-kids-cafe-sample'
  );

  assert.equal(siheungKidsCafe?.verificationStatus, 'needs_refresh');
});

test('places index rejects duplicate place ids', async () => {
  const { assertUniquePlaceIds } = await import('./index.ts');

  assert.throws(
    () =>
      assertUniquePlaceIds([
        {
          id: 'duplicate-id',
          name: 'A',
        },
        {
          id: 'duplicate-id',
          name: 'B',
        },
      ]),
    /Duplicate place id: duplicate-id/
  );
});

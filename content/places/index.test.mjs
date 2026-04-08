import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

test('places index exposes all expected region buckets', async () => {
  const { PLACES_BY_REGION } = await import('./index.ts');

  assert.deepEqual(Object.keys(PLACES_BY_REGION).sort(), [
    'gyeonggi-north',
    'gyeonggi-south',
    'incheon',
    'seoul',
  ]);
});

test('places index aggregates current region seeds', async () => {
  const {
    ALL_PLACES,
    GYEONGGI_NORTH_PLACES,
    GYEONGGI_SOUTH_PLACES,
    INCHEON_PLACES,
    SEOUL_PLACES,
  } = await import('./index.ts');

  assert.equal(SEOUL_PLACES.length, 11);
  assert.equal(GYEONGGI_SOUTH_PLACES.length, 13);
  assert.equal(GYEONGGI_NORTH_PLACES.length, 4);
  assert.equal(INCHEON_PLACES.length, 11);
  assert.equal(ALL_PLACES.length, 39);
});

test('places index preserves important ids and verification state', async () => {
  const { ALL_PLACES } = await import('./index.ts');

  const placeIds = new Set(ALL_PLACES.map(place => place.id));
  assert.equal(placeIds.has('national-children-museum'), true);
  assert.equal(placeIds.has('seoul-national-museum-of-korea'), true);
  assert.equal(placeIds.has('seoul-toy-library-mapo'), true);
  assert.equal(placeIds.has('jeongok-prehistory-museum'), true);
  assert.equal(placeIds.has('gwangmyeong-cave'), true);
  assert.equal(placeIds.has('champion-1250x-goyang'), true);
  assert.equal(placeIds.has('wonder-village-goyang'), true);
  assert.equal(placeIds.has('byeolmadang-kids-suwon'), true);
  assert.equal(placeIds.has('toy-kingdom-anseong'), true);
  assert.equal(placeIds.has('incheon-children-science-museum'), true);
  assert.equal(placeIds.has('incheon-student-science-museum'), true);
  assert.equal(placeIds.has('oktokki-space-center'), true);
  assert.equal(placeIds.has('incheon-aisarang-dream-center-jung-gu-1'), true);

  const siheungKidsCafe = ALL_PLACES.find(
    place => place.id === 'siheung-kids-cafe-sample'
  );

  assert.equal(siheungKidsCafe?.verificationStatus, 'needs_refresh');
});

test('merged parent museum entries keep child-focused reservation guidance', async () => {
  const { ALL_PLACES } = await import('./index.ts');

  const folkMuseum = ALL_PLACES.find(place => place.id === 'national-folk-museum');
  const centralMuseum = ALL_PLACES.find(
    place => place.id === 'seoul-national-museum-of-korea'
  );
  const gwacheonScienceMuseum = ALL_PLACES.find(
    place => place.id === 'national-science-museum-gwacheon'
  );

  assert.equal(folkMuseum?.reservationRequired, true);
  assert.match(folkMuseum?.editorNote ?? '', /어린이박물관/);

  assert.equal(centralMuseum?.reservationRequired, true);
  assert.match(centralMuseum?.editorNote ?? '', /어린이박물관/);

  assert.equal(gwacheonScienceMuseum?.reservationRequired, true);
  assert.match(gwacheonScienceMuseum?.editorNote ?? '', /유아체험관/);
});

test('thumbnailImage paths point to existing local assets', async () => {
  const { ALL_PLACES } = await import('./index.ts');

  for (const place of ALL_PLACES) {
    if (!place.thumbnailImage) continue;

    const thumbnailUrl = new URL(`../../public${place.thumbnailImage}`, import.meta.url);
    assert.equal(
      existsSync(thumbnailUrl),
      true,
      `${place.id} thumbnailImage is missing: ${place.thumbnailImage}`
    );
  }
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

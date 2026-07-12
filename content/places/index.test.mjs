import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

const NEW_ANIMAL_PLACE_IDS = [
  'gyeonggi-south-seoul-grand-park-zoo',
  'gyeonggi-south-anseong-farmland',
  'gyeonggi-south-siheung-bugsrium',
  'gyeonggi-south-osan-bird-park',
  'gyeonggi-south-yangpyeong-insect-museum',
  'gyeonggi-south-bucheon-nature-ecology-park',
  'gyeonggi-south-pangyo-eco-learning-center',
  'gyeonggi-south-banseoksan-eco-school',
  'gyeonggi-south-jonghyeon-fishing-village',
  'gyeonggi-north-zoozooland-goyang',
  'gyeonggi-north-guri-insect-ecology-center',
  'gyeonggi-north-gapyeong-sheep-ranch',
  'gyeonggi-north-sandulsori-namyangju',
  'gyeonggi-north-yangju-insect-museum',
  'incheon-grand-park-childrens-zoo',
  'incheon-neulsolgil-park-sheep-ranch',
  'incheon-wolmi-traditional-garden-animal-zone',
  'incheon-sorae-wetland-ecological-park',
  'incheon-spoonbill-ecology-learning-center',
  'incheon-daeijakdo-marine-ecology-center',
  'incheon-masian-tidal-flat-experience',
  'incheon-yeongam-fishing-village-experience',
  'incheon-zoobugs-indoor-zoo',
  'seoul-sea-life-coex-aquarium',
  'seoul-lotte-world-aquarium',
  'seoul-zoolung-zoolung-yeongdeungpo',
  'seoul-zoorarium-geumcheon',
  'seoul-ydp-insect-experience-center',
  'seoul-forest-insect-garden-deer',
  'seoul-gildong-ecological-park',
  'seoul-noeul-firefly-ecology-center',
  'seoul-jungnangcheon-environment-center',
  'seoul-gangseo-wetland-ecological-park',
];

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

  assert.equal(SEOUL_PLACES.length, 108);
  assert.equal(GYEONGGI_SOUTH_PLACES.length, 67);
  assert.equal(GYEONGGI_NORTH_PLACES.length, 40);
  assert.equal(INCHEON_PLACES.length, 42);
  assert.equal(ALL_PLACES.length, 257);
});

test('new animal experience places remain publishable and include a visit reference', async () => {
  const { ALL_PLACES } = await import('./index.ts');
  const placesById = new Map(ALL_PLACES.map(place => [place.id, place]));

  for (const id of NEW_ANIMAL_PLACE_IDS) {
    const place = placesById.get(id);

    assert.ok(place, `${id} should exist in the places dataset`);
    assert.equal(
      place.themes?.includes('animal'),
      true,
      `${id} should be discoverable with the animal theme filter`
    );
    assert.equal(
      ['official_verified', 'semi_verified'].includes(place.verificationStatus),
      true,
      `${id} should be publishable`
    );
    assert.match(place.sourceUrl, /^https:\/\//, `${id} should cite a source`);
    assert.equal(Boolean(place.description), true, `${id} needs a summary`);
    assert.equal(Boolean(place.address), true, `${id} needs an address`);
    assert.equal(
      place.externalBlogLinks?.length,
      1,
      `${id} should include one recent visit reference`
    );
    assert.match(
      place.externalBlogLinks[0].href,
      /^https:\/\//,
      `${id} visit reference should use a direct https URL`
    );
  }
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
  assert.equal(placeIds.has('seoul-sangsangnara'), true);
  assert.equal(placeIds.has('national-children-science-center'), true);
  assert.equal(placeIds.has('yongin-children-imagination-forest'), true);
  assert.equal(placeIds.has('aquaplanet-gwanggyo'), true);
  assert.equal(placeIds.has('gyeonggi-northern-childrens-museum'), true);
  assert.equal(placeIds.has('goyang-children-museum'), true);
  assert.equal(placeIds.has('goyang-ilovemom-cafe-hwajeong'), true);
  assert.equal(placeIds.has('guri-ilovemom-cafe-inchang'), true);
  assert.equal(placeIds.has('guri-isarang-playground-galmae'), true);
  assert.equal(placeIds.has('paju-ilovemom-cafe'), true);
  assert.equal(placeIds.has('seoul-public-kids-cafe-1'), true);
  assert.equal(placeIds.has('seoul-public-kids-cafe-ttukseom-jabeolle'), true);
  assert.equal(placeIds.has('seoul-public-kids-cafe-yangjae1'), true);
  assert.equal(placeIds.has('seoul-public-kids-cafe-sindorim'), true);
  assert.equal(placeIds.has('seongnam-isarang-playground-sunae'), true);
  assert.equal(placeIds.has('bucheon-ilovemom-cafe-bambak'), true);
  assert.equal(placeIds.has('bucheon-ilovemom-cafe-simgokbon'), true);
  assert.equal(placeIds.has('bucheon-ilovemom-cafe-gogangbon'), true);
  assert.equal(placeIds.has('uijeongbu-public-playground-2'), true);
  assert.equal(placeIds.has('okjeong-toy-library'), true);
  assert.equal(placeIds.has('first-garden'), true);
  assert.equal(placeIds.has('ganghwa-history-museum'), true);
  assert.equal(
    placeIds.has('national-institute-of-biological-resources'),
    true
  );
  assert.equal(placeIds.has('national-incheon-marine-museum'), true);
  assert.equal(placeIds.has('geomdan-prehistory-museum'), true);
  assert.equal(placeIds.has('national-aviation-museum'), true);
  assert.equal(placeIds.has('bucheon-robopark'), true);
  assert.equal(placeIds.has('namyangju-childrens-vision-center'), true);
  assert.equal(placeIds.has('incheon-butterfly-park'), true);

  const siheungKidsCafe = ALL_PLACES.find(
    place => place.id === 'siheung-kids-cafe-sample'
  );

  assert.equal(siheungKidsCafe?.verificationStatus, 'needs_refresh');
});

test('places index assigns at least one recommended season to every place', async () => {
  const { ALL_PLACES } = await import('./index.ts');

  for (const place of ALL_PLACES) {
    assert.equal(
      Array.isArray(place.seasons) && place.seasons.length > 0,
      true,
      `${place.id} should define one or more seasons`
    );
  }
});

test('merged parent museum entries keep child-focused reservation guidance', async () => {
  const { ALL_PLACES } = await import('./index.ts');

  const folkMuseum = ALL_PLACES.find(
    place => place.id === 'national-folk-museum'
  );
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

test('every museum links to its dedicated parking guide', async () => {
  const { ALL_PLACES } = await import('./index.ts');
  const museums = ALL_PLACES.filter(place => place.category === 'museum');

  assert.equal(museums.length, 40);

  for (const place of museums) {
    assert.deepEqual(
      place.linkedPostSlugs,
      [`${place.id}-parking`],
      `${place.id} should link its dedicated parking guide`
    );
  }
});

test('thumbnailImage paths point to existing local assets', async () => {
  const { ALL_PLACES } = await import('./index.ts');

  for (const place of ALL_PLACES) {
    if (!place.thumbnailImage) continue;

    const thumbnailUrl = new URL(
      `../../public${place.thumbnailImage}`,
      import.meta.url
    );
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

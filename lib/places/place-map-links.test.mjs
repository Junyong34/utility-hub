import test from 'node:test';
import assert from 'node:assert/strict';

test('getPlaceNaverMapUrl prefers explicit naver map url when provided', async () => {
  const { getPlaceNaverMapUrl } = await import('./place-map-links.ts');

  const place = {
    id: 'explicit-map-link',
    name: '명시 링크 장소',
    address: '서울 종로구 세종대로 1',
    naverMapUrl: 'https://map.naver.com/p/entry/place/123456789',
  };

  assert.equal(place.naverMapUrl, getPlaceNaverMapUrl(place));
});

test('getPlaceNaverMapUrl returns undefined when explicit place link is missing', async () => {
  const { getPlaceNaverMapUrl } = await import('./place-map-links.ts');

  const place = {
    id: 'derived-map-link',
    name: '국립어린이박물관',
    address: '서울 용산구 서빙고로 137',
  };

  assert.equal(getPlaceNaverMapUrl(place), undefined);
});

test('all publishable places with naver map links use explicit naver map place urls', async () => {
  const { getPublishablePlaces } = await import('./place-content.ts');

  const missingPlaceIds = getPublishablePlaces()
    .filter(place => place.naverMapUrl && !/^https:\/\/map\.naver\.com\/p\/entry\/place\/\d+$/.test(place.naverMapUrl))
    .map(place => place.id);

  assert.deepEqual(missingPlaceIds, []);
});

test('removed mismatched places are not publishable anymore', async () => {
  const { getPublishablePlaces } = await import('./place-content.ts');

  const publishablePlaceIds = new Set(getPublishablePlaces().map(place => place.id));

  assert.equal(publishablePlaceIds.has('icheon-ceramic-village'), false);
  assert.equal(publishablePlaceIds.has('lotte-world-suwon'), false);
});

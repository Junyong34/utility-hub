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

test('getPlaceNaverMapUrl returns undefined when explicit map link is missing', async () => {
  const { getPlaceNaverMapUrl } = await import('./place-map-links.ts');

  const place = {
    id: 'derived-map-link',
    name: '국립어린이박물관',
    address: '서울 용산구 서빙고로 137',
  };

  assert.equal(getPlaceNaverMapUrl(place), undefined);
});

test('getPlaceNaverMapUrl replaces search links that include the place name with address-only search', async () => {
  const { getPlaceNaverMapUrl } = await import('./place-map-links.ts');

  const place = {
    id: 'search-link-with-name',
    name: '슈퍼윙스 키즈카페 롯데마트 중계점',
    address: '서울특별시 노원구 노원로 330 롯데마트 중계점 지하1층',
    naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('슈퍼윙스 키즈카페 롯데마트 중계점 서울특별시 노원구 노원로 330 롯데마트 중계점 지하1층')}`,
  };

  assert.equal(
    getPlaceNaverMapUrl(place),
    `https://map.naver.com/p/search/${encodeURIComponent(place.address)}`
  );
});

test('publishable places with generated search map links search by address only', async () => {
  const { getPublishablePlaces } = await import('./place-content.ts');
  const { getPlaceNaverMapUrl } = await import('./place-map-links.ts');

  for (const place of getPublishablePlaces()) {
    const naverMapUrl = getPlaceNaverMapUrl(place);

    if (!naverMapUrl?.startsWith('https://map.naver.com/p/search/')) continue;
    if (!place.address) continue;

    assert.equal(
      decodeURIComponent(naverMapUrl.replace('https://map.naver.com/p/search/', '')),
      place.address,
      `${place.id} generated naver map search must use address only`
    );
  }
});

test('removed mismatched places are not publishable anymore', async () => {
  const { getPublishablePlaces } = await import('./place-content.ts');

  const publishablePlaceIds = new Set(getPublishablePlaces().map(place => place.id));

  assert.equal(publishablePlaceIds.has('icheon-ceramic-village'), false);
  assert.equal(publishablePlaceIds.has('lotte-world-suwon'), false);
});

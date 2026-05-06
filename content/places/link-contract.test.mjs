import test from 'node:test';
import assert from 'node:assert/strict';

import { ALL_PLACES, INCHEON_PLACES } from './index.ts';
import {
  getNaverMapTestPlaces,
  getSourceUrlTestPlaces,
} from './link-verification.ts';
import { getPlaceNaverMapUrl } from '../../lib/places/place-map-links.ts';
import { PUBLISHABLE_STATUSES } from '../../types/place-source.ts';

test('publishable places expose an https sourceUrl', () => {
  for (const place of getSourceUrlTestPlaces(ALL_PLACES)) {
    assert.match(
      place.sourceUrl,
      /^https:\/\//,
      `${place.id} sourceUrl must use https: ${place.sourceUrl}`
    );
  }
});

test('publishable places with naverMapUrl resolve to place entries or address-only search links', () => {
  for (const place of getNaverMapTestPlaces(ALL_PLACES)) {
    const naverMapUrl = getPlaceNaverMapUrl(place);

    assert.match(
      naverMapUrl,
      /^https:\/\/map\.naver\.com\/p\/(?:entry\/place\/\d+|search\/.+)/,
      `${place.id} naverMapUrl must resolve to a Naver place entry or search link: ${naverMapUrl}`
    );

    if (!naverMapUrl?.startsWith('https://map.naver.com/p/search/')) continue;
    if (!place.address) continue;

    assert.equal(
      decodeURIComponent(naverMapUrl.replace('https://map.naver.com/p/search/', '')),
      place.address,
      `${place.id} naverMapUrl search must use address only`
    );
  }
});

test('publishable incheon places expose a naverMapUrl', () => {
  for (const place of INCHEON_PLACES) {
    if (!PUBLISHABLE_STATUSES.includes(place.verificationStatus)) continue;

    assert.equal(
      Boolean(place.naverMapUrl),
      true,
      `${place.id} must include naverMapUrl`
    );
  }
});

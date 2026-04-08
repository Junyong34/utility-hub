import test from 'node:test';
import assert from 'node:assert/strict';

import { ALL_PLACES } from './index.ts';
import {
  getNaverMapTestPlaces,
  getSourceUrlTestPlaces,
} from './link-verification.ts';

test('publishable places expose an https sourceUrl', () => {
  for (const place of getSourceUrlTestPlaces(ALL_PLACES)) {
    assert.match(
      place.sourceUrl,
      /^https:\/\//,
      `${place.id} sourceUrl must use https: ${place.sourceUrl}`
    );
  }
});

test('publishable places with naverMapUrl use the Naver place entry format', () => {
  for (const place of getNaverMapTestPlaces(ALL_PLACES)) {
    assert.match(
      place.naverMapUrl,
      /^https:\/\/map\.naver\.com\/p\/entry\/place\/\d+/,
      `${place.id} naverMapUrl must use the /p/entry/place/{id} format: ${place.naverMapUrl}`
    );
  }
});

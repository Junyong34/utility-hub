import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createBenefitsMetadataInput,
  createPlaceRegionMetadataInput,
  createPlacesMetadataInput,
} from './site-section-seo.ts';

test('createPlacesMetadataInput은 places  canonical과 제목을 반환한다', () => {
  const result = createPlacesMetadataInput('https://www.zento.kr');

  assert.equal(result.title, '아이와 가볼 곳');
  assert.equal(result.canonical, 'https://www.zento.kr/places');
});

test('createBenefitsMetadataInput은 benefits  canonical과 제목을 반환한다', () => {
  const result = createBenefitsMetadataInput('https://www.zento.kr');

  assert.equal(result.title, '육아 혜택·지원금');
  assert.equal(result.canonical, 'https://www.zento.kr/benefits');
});

test('createPlaceRegionMetadataInput은 지역  canonical과 제목을 반환한다', () => {
  const result = createPlaceRegionMetadataInput('https://www.zento.kr', {
    slug: 'seoul',
    name: '서울',
    description: '공공 놀이시설과 박물관 중심의 서울 아이 가볼 곳',
  });

  assert.equal(result.title, '서울 아이와 가볼 곳');
  assert.equal(result.canonical, 'https://www.zento.kr/places/seoul');
});

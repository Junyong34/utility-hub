import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import { mkdtemp, readFile, rm, writeFile, mkdir } from 'node:fs/promises';

import { ALL_PLACES } from '../content/places/index.ts';
import {
  applyCapturedEntriesToContent,
  buildSeedManifestEntries,
  buildGoogleImageSearchUrl,
  collectVerificationIssues,
  getRegionSourceFilePath,
  getCaptureTargetUrl,
  pickBestLandmarkCandidate,
} from './places-thumbnails.mjs';

test('buildSeedManifestEntries seeds current place entries and preserves manual review fields', () => {
  const seeded = buildSeedManifestEntries(ALL_PLACES, [
    {
      placeId: 'national-children-museum',
      placeName: '국립어린이박물관',
      query: 'old query',
      officialUrl: 'https://old.example.com',
      manualCandidateUrls: ['https://images.example.com/hero'],
      selectedPageUrl: 'https://selected.example.com',
      selectedSelector: '.hero',
      captureMode: 'image',
      status: 'approved',
      capturedAt: null,
      outputPath: null,
    },
  ]);

  assert.equal(seeded.length, 19);

  const reviewed = seeded.find(place => place.placeId === 'national-children-museum');
  assert.deepEqual(reviewed?.manualCandidateUrls, ['https://images.example.com/hero']);
  assert.equal(reviewed?.selectedPageUrl, 'https://selected.example.com');
  assert.equal(reviewed?.status, 'approved');
  assert.equal(reviewed?.officialUrl, 'https://www.museum.go.kr/site/child/home');
  assert.match(reviewed?.googleImageSearchUrl ?? '', /google\.com\/search/);

  const freshEntry = seeded.find(place => place.placeId === 'everland');
  assert.equal(freshEntry?.officialUrl, 'https://www.everland.com/');
  assert.match(freshEntry?.query ?? '', /에버랜드/);
  assert.equal(freshEntry?.status, 'needs_review');
});

test('buildGoogleImageSearchUrl encodes the image search query', () => {
  assert.equal(
    buildGoogleImageSearchUrl('서울식물원 랜드마크 대표 사진'),
    'https://www.google.com/search?tbm=isch&q=%EC%84%9C%EC%9A%B8%EC%8B%9D%EB%AC%BC%EC%9B%90%20%EB%9E%9C%EB%93%9C%EB%A7%88%ED%81%AC%20%EB%8C%80%ED%91%9C%20%EC%82%AC%EC%A7%84'
  );
});

test('buildSeedManifestEntries only auto-approves official and semi-official sources', () => {
  const seeded = buildSeedManifestEntries(
    ALL_PLACES,
    [
      {
        placeId: 'national-children-museum',
        placeName: '국립어린이박물관',
        query: '국립어린이박물관 대표 사진',
        officialUrl: 'https://www.museum.go.kr/site/child/home',
        manualCandidateUrls: [],
        selectedPageUrl: 'https://www.museum.go.kr/site/child/home',
        selectedSelector: null,
        captureMode: 'image',
        status: 'failed',
        capturedAt: null,
        outputPath: '/images/places/national-children-museum.webp',
      },
    ],
    {
      approveOfficial: true,
    }
  );

  assert.equal(
    seeded.find(place => place.placeId === 'national-children-museum')?.status,
    'approved'
  );
  assert.equal(
    seeded.find(place => place.placeId === 'siheung-kids-cafe-sample')?.status,
    'needs_review'
  );
});

test('pickBestLandmarkCandidate prefers large hero visuals over logos', () => {
  const candidate = pickBestLandmarkCandidate([
    {
      type: 'img',
      sourceUrl: 'https://example.com/assets/logo.png',
      alt: '기관 로고',
      className: 'site-logo',
      id: 'logo',
      href: '',
      width: 220,
      height: 220,
      area: 48_400,
      top: 24,
    },
    {
      type: 'img',
      sourceUrl: 'https://example.com/storage/main/hero-museum.jpg',
      alt: '국립어린이박물관 전경',
      className: 'hero-visual',
      id: 'mainHero',
      href: '',
      width: 1440,
      height: 720,
      area: 900_000,
      top: 80,
    },
  ]);

  assert.equal(candidate?.sourceUrl, 'https://example.com/storage/main/hero-museum.jpg');
});

test('pickBestLandmarkCandidate rejects notice banners and text-heavy posters', () => {
  const candidate = pickBestLandmarkCandidate([
    {
      type: 'img',
      sourceUrl: 'https://example.com/upload/banner_20260401.jpg',
      alt: '2026.4.19 모집 안내 프로그램 신청 배너',
      className: 'banner-list',
      id: '',
      href: '/boards/news/articles/900',
      width: 1200,
      height: 600,
      area: 720_000,
      top: 100,
    },
  ]);

  assert.equal(candidate, undefined);
});

test('pickBestLandmarkCandidate accepts large background hero images', () => {
  const candidate = pickBestLandmarkCandidate([
    {
      type: 'background',
      sourceUrl: 'https://example.com/front/img/main/visual_spring1_w.jpg',
      alt: '',
      className: 'visual swiper-slide-active',
      id: 'mainVisual',
      href: '',
      width: 1380,
      height: 680,
      area: 930_000,
      top: 0,
    },
  ]);

  assert.equal(
    candidate?.sourceUrl,
    'https://example.com/front/img/main/visual_spring1_w.jpg'
  );
});

test('getCaptureTargetUrl prefers selected image urls and manual candidate urls before official pages', () => {
  assert.equal(
    getCaptureTargetUrl({
      selectedPageUrl: 'https://images.example.com/landmark.jpg',
      manualCandidateUrls: ['https://example.com/page'],
      officialUrl: 'https://official.example.com',
    }),
    'https://images.example.com/landmark.jpg'
  );

  assert.equal(
    getCaptureTargetUrl({
      selectedPageUrl: null,
      manualCandidateUrls: ['https://images.example.com/landmark.webp'],
      officialUrl: 'https://official.example.com',
    }),
    'https://images.example.com/landmark.webp'
  );

  assert.equal(
    getCaptureTargetUrl({
      selectedPageUrl: null,
      manualCandidateUrls: [],
      officialUrl: 'https://official.example.com',
    }),
    'https://official.example.com'
  );
});

test('getRegionSourceFilePath resolves existing region source files', () => {
  const repoRoot = '/repo/example';

  assert.equal(
    getRegionSourceFilePath(repoRoot, 'seoul'),
    path.join(repoRoot, 'content/places/seoul/index.ts')
  );
  assert.equal(
    getRegionSourceFilePath(repoRoot, 'gyeonggi-south'),
    path.join(repoRoot, 'content/places/gyeonggi-south/index.ts')
  );
});

test('applyCapturedEntriesToContent leaves failed entries untouched', async () => {
  const fixtureDir = await mkdtemp(path.join(os.tmpdir(), 'places-thumbnails-'));

  try {
    const sourcePath = path.join(fixtureDir, 'content/places/seoul/index.ts');
    await mkdir(path.dirname(sourcePath), { recursive: true });
    const original = `import type { PlaceSource } from '../../../types/place-source.ts';\n\nexport const SEOUL_PLACES = [\n  {\n    id: 'sample-place',\n    name: '샘플 장소',\n    region: 'seoul',\n    subRegion: '종로구',\n    category: 'museum',\n    ageBands: ['all'],\n    indoorOutdoor: 'indoor',\n    priceType: 'free',\n    reservationRequired: false,\n    parking: false,\n    sourceType: 'official',\n    sourceUrl: 'https://example.com',\n    verifiedAt: '2026-04-01',\n    lastObservedAt: '2026-04-01',\n    verificationStatus: 'official_verified',\n  },\n] satisfies PlaceSource[];\n`;
    await writeFile(sourcePath, original, 'utf8');

    await applyCapturedEntriesToContent(fixtureDir, [
      {
        placeId: 'sample-place',
        placeName: '샘플 장소',
        query: '샘플 장소 대표 사진',
        officialUrl: 'https://example.com',
        manualCandidateUrls: [],
        selectedPageUrl: 'https://example.com',
        selectedSelector: null,
        captureMode: 'image',
        status: 'failed',
        capturedAt: null,
        outputPath: '/images/places/sample-place.webp',
      },
    ]);

    const updated = await readFile(sourcePath, 'utf8');
    assert.equal(updated, original);
  } finally {
    await rm(fixtureDir, { recursive: true, force: true });
  }
});

test('applyCapturedEntriesToContent replaces existing jpg thumbnail references with webp output paths', async () => {
  const fixtureDir = await mkdtemp(path.join(os.tmpdir(), 'places-thumbnails-'));

  try {
    const sourcePath = path.join(fixtureDir, 'content/places/seoul/index.ts');
    await mkdir(path.dirname(sourcePath), { recursive: true });
    await writeFile(
      sourcePath,
      `import type { PlaceSource } from '../../../types/place-source.ts';\n\nexport const SEOUL_PLACES = [\n  {\n    id: 'sample-place',\n    name: '샘플 장소',\n    region: 'seoul',\n    subRegion: '종로구',\n    category: 'museum',\n    ageBands: ['all'],\n    indoorOutdoor: 'indoor',\n    priceType: 'free',\n    reservationRequired: false,\n    parking: false,\n    sourceType: 'official',\n    sourceUrl: 'https://example.com',\n    verifiedAt: '2026-04-01',\n    lastObservedAt: '2026-04-01',\n    verificationStatus: 'official_verified',\n    thumbnailImage: '/images/places/sample-place.jpg',\n  },\n] satisfies PlaceSource[];\n`,
      'utf8'
    );

    await applyCapturedEntriesToContent(fixtureDir, [
      {
        placeId: 'sample-place',
        placeName: '샘플 장소',
        query: '샘플 장소 대표 사진',
        officialUrl: 'https://example.com',
        manualCandidateUrls: [],
        selectedPageUrl: 'https://example.com',
        selectedSelector: null,
        captureMode: 'image',
        status: 'captured',
        capturedAt: '2026-04-07T11:00:00.000Z',
        outputPath: '/images/places/sample-place.webp',
      },
    ]);

    const updated = await readFile(sourcePath, 'utf8');
    assert.match(updated, /thumbnailImage: '\/images\/places\/sample-place\.webp'/);
    assert.doesNotMatch(updated, /sample-place\.jpg/);
  } finally {
    await rm(fixtureDir, { recursive: true, force: true });
  }
});

test('collectVerificationIssues reports captured entries without output files or content linkage', () => {
  const issues = collectVerificationIssues(
    [
      {
        id: 'sample-place',
        region: 'seoul',
        thumbnailImage: undefined,
      },
    ],
    [
      {
        placeId: 'sample-place',
        placeName: '샘플 장소',
        query: '샘플 장소 대표 사진',
        officialUrl: 'https://example.com',
        manualCandidateUrls: [],
        selectedPageUrl: 'https://example.com',
        selectedSelector: null,
        captureMode: 'image',
        status: 'captured',
        capturedAt: '2026-04-07T11:00:00.000Z',
        outputPath: '/images/places/sample-place.webp',
      },
    ],
    new Set()
  );

  assert.equal(issues.length, 2);
  assert.match(issues[0], /missing output file/i);
  assert.match(issues[1], /missing thumbnailImage/i);
});

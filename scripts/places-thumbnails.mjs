#!/usr/bin/env node

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import {
  access,
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const execFileAsync = promisify(execFile);

const MANIFEST_RELATIVE_PATH = 'content/places/thumbnail-manifest.json';
const DEFAULT_CAPTURE_MODE = 'image';
const DEFAULT_STATUS = 'needs_review';
const TARGET_WIDTH = 1600;
const TARGET_HEIGHT = 900;

const REGION_SOURCE_FILES = {
  seoul: 'content/places/seoul/index.ts',
  'gyeonggi-south': 'content/places/gyeonggi-south/index.ts',
  'gyeonggi-north': 'content/places/gyeonggi-north/index.ts',
  incheon: 'content/places/incheon/index.ts',
};

const HARD_REJECT_PATTERN =
  /(logo|icon|symbol|emblem|mask|favicon|sprite|qr|marker|map|chart|graph|btn|button)/i;
const PROMO_PATTERN =
  /(banner|popup|notice|event|program|guide|schedule|poster|ticket|promotion|공지|안내|이벤트|프로그램|모집|신청|배너|포스터)/i;
const HERO_PATTERN =
  /(hero|visual|keyvisual|kv|main|spot|slide|swiper|gallery|photo|image|landscape|view)/i;
const DATE_PATTERN = /(20\d{2}[.\-/]\d{1,2}|202\d)/;
const PROMO_LINK_PATTERN = /(boards\/news|articles\/|edus\/|event|notice|program|edu|news)/i;
const DIRECT_IMAGE_PATTERN = /\.(avif|gif|jpe?g|png|webp)(\?|$)/i;

function usage() {
  console.log(`Usage:
  node --experimental-strip-types scripts/places-thumbnails.mjs seed [--approve-official]
  node --experimental-strip-types scripts/places-thumbnails.mjs capture [--place <placeId>]
  node --experimental-strip-types scripts/places-thumbnails.mjs apply
  node --experimental-strip-types scripts/places-thumbnails.mjs verify`);
}

function manifestPathFor(repoRoot) {
  return path.join(repoRoot, MANIFEST_RELATIVE_PATH);
}

function outputAbsolutePathFor(repoRoot, outputPath) {
  return path.join(repoRoot, 'public', outputPath.replace(/^\//, ''));
}

function buildDefaultQuery(place) {
  return `${place.name} 랜드마크 대표 사진`;
}

export function buildGoogleImageSearchUrl(query) {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
}

function sortManifestEntries(entries) {
  return [...entries].sort((left, right) =>
    left.placeId.localeCompare(right.placeId, 'ko')
  );
}

function toManifestEntry(place, existingEntry, options = {}) {
  const approvedFromSeed =
    options.approveOfficial === true &&
    place.sourceUrl &&
    place.sourceUrl.startsWith('http') &&
    place.sourceType !== 'discovery';
  const seededStatus = approvedFromSeed ? 'approved' : DEFAULT_STATUS;
  const nextStatus =
    options.approveOfficial === true
      ? existingEntry?.status === 'captured'
        ? 'captured'
        : seededStatus
      : (existingEntry?.status ?? seededStatus);

  return {
    placeId: place.id,
    placeName: place.name,
    query: existingEntry?.query ?? buildDefaultQuery(place),
    googleImageSearchUrl:
      existingEntry?.googleImageSearchUrl ??
      buildGoogleImageSearchUrl(existingEntry?.query ?? buildDefaultQuery(place)),
    officialUrl: place.sourceUrl,
    manualCandidateUrls: existingEntry?.manualCandidateUrls ?? [],
    selectedPageUrl:
      existingEntry?.selectedPageUrl ?? (approvedFromSeed ? place.sourceUrl : null),
    selectedSelector: existingEntry?.selectedSelector ?? null,
    captureMode: existingEntry?.captureMode ?? DEFAULT_CAPTURE_MODE,
    status: nextStatus,
    capturedAt: existingEntry?.capturedAt ?? null,
    outputPath: existingEntry?.outputPath ?? `/images/places/${place.id}.webp`,
  };
}

export function buildSeedManifestEntries(places, existingEntries = [], options = {}) {
  const existingByPlaceId = new Map(existingEntries.map(entry => [entry.placeId, entry]));
  return sortManifestEntries(
    places.map(place => toManifestEntry(place, existingByPlaceId.get(place.id), options))
  );
}

export function getRegionSourceFilePath(repoRoot, regionSlug) {
  const relativePath = REGION_SOURCE_FILES[regionSlug];

  if (!relativePath) {
    throw new Error(`Unknown region slug: ${regionSlug}`);
  }

  return path.join(repoRoot, relativePath);
}

function escapeForRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function applyThumbnailToSourceText(sourceText, placeId, outputPath) {
  const idPattern = new RegExp(`^\\s*id:\\s*'${escapeForRegex(placeId)}',\\s*$`, 'm');
  const idMatch = idPattern.exec(sourceText);

  if (!idMatch) {
    return sourceText;
  }

  const objectStart = sourceText.lastIndexOf('  {', idMatch.index);
  const closingMarker = '\n  },';
  const objectEnd = sourceText.indexOf(closingMarker, idMatch.index);

  if (objectStart === -1 || objectEnd === -1) {
    return sourceText;
  }

  const block = sourceText.slice(objectStart, objectEnd + closingMarker.length);
  const thumbnailLine = `    thumbnailImage: '${outputPath}',`;
  const nextBlock = block.includes('thumbnailImage:')
    ? block.replace(/^\s*thumbnailImage:\s*'.*?',\s*$/m, thumbnailLine)
    : block.replace(/\n  },$/, `\n${thumbnailLine}\n  },`);

  return `${sourceText.slice(0, objectStart)}${nextBlock}${sourceText.slice(
    objectEnd + closingMarker.length
  )}`;
}

async function resolveSourceFilePathForEntry(repoRoot, placeId) {
  for (const regionSlug of Object.keys(REGION_SOURCE_FILES)) {
    const sourceFilePath = getRegionSourceFilePath(repoRoot, regionSlug);
    const sourceText = await readFile(sourceFilePath, 'utf8').catch(() => null);

    if (sourceText?.includes(`id: '${placeId}'`)) {
      return sourceFilePath;
    }
  }

  throw new Error(`Could not resolve source file for place: ${placeId}`);
}

export async function applyCapturedEntriesToContent(repoRoot, entries) {
  const capturedEntries = entries.filter(
    entry => entry.status === 'captured' && entry.outputPath?.endsWith('.webp')
  );
  const entriesByFile = new Map();

  for (const entry of capturedEntries) {
    const sourceFilePath = await resolveSourceFilePathForEntry(repoRoot, entry.placeId);
    const fileEntries = entriesByFile.get(sourceFilePath) ?? [];
    fileEntries.push(entry);
    entriesByFile.set(sourceFilePath, fileEntries);
  }

  const updatedFiles = [];

  for (const [sourceFilePath, fileEntries] of entriesByFile.entries()) {
    const original = await readFile(sourceFilePath, 'utf8');
    let nextContent = original;

    for (const entry of fileEntries) {
      nextContent = applyThumbnailToSourceText(nextContent, entry.placeId, entry.outputPath);
    }

    if (nextContent !== original) {
      await writeFile(sourceFilePath, nextContent, 'utf8');
      updatedFiles.push(sourceFilePath);
    }
  }

  return updatedFiles;
}

function buildCandidateText(candidate) {
  return [
    candidate.sourceUrl,
    candidate.alt,
    candidate.className,
    candidate.id,
    candidate.href,
  ]
    .filter(Boolean)
    .join(' ');
}

function isStrongReject(candidate) {
  const combined = buildCandidateText(candidate);

  if (HARD_REJECT_PATTERN.test(combined)) {
    return true;
  }

  if (PROMO_LINK_PATTERN.test(candidate.href ?? '')) {
    return true;
  }

  if (
    PROMO_PATTERN.test(combined) &&
    !HERO_PATTERN.test(combined) &&
    (DATE_PATTERN.test(candidate.alt ?? '') ||
      (candidate.alt ?? '').length > 40 ||
      !candidate.alt)
  ) {
    return true;
  }

  if ((candidate.alt ?? '').includes('\n') && DATE_PATTERN.test(candidate.alt ?? '')) {
    return true;
  }

  return false;
}

function scoreCandidate(candidate) {
  if (candidate.area < 160_000 || candidate.width < 420 || candidate.height < 220) {
    return Number.NEGATIVE_INFINITY;
  }

  if (isStrongReject(candidate)) {
    return Number.NEGATIVE_INFINITY;
  }

  let score = candidate.area;
  const ratio = candidate.width / candidate.height;

  if (ratio >= 1.2 && ratio <= 2.6) {
    score += 80_000;
  } else if (ratio < 0.9) {
    score -= 120_000;
  }

  if (candidate.top < 280) {
    score += 90_000;
  } else if (candidate.top < 700) {
    score += 35_000;
  }

  const combined = buildCandidateText(candidate);

  if (HERO_PATTERN.test(combined)) {
    score += 85_000;
  }

  if (candidate.type === 'background') {
    score += 25_000;
  }

  if (!candidate.alt || candidate.alt.length < 40) {
    score += 10_000;
  }

  if (PROMO_PATTERN.test(combined) && !HERO_PATTERN.test(combined)) {
    score -= 140_000;
  }

  if ((candidate.alt ?? '').includes('\n')) {
    score -= 80_000;
  }

  if (DATE_PATTERN.test(candidate.alt ?? '')) {
    score -= 80_000;
  }

  return score;
}

export function pickBestLandmarkCandidate(candidates) {
  const ranked = candidates
    .map(candidate => ({
      ...candidate,
      score: scoreCandidate(candidate),
    }))
    .filter(candidate => Number.isFinite(candidate.score))
    .sort((left, right) => right.score - left.score);

  return ranked[0];
}

export function getCaptureTargetUrl(entry) {
  return (
    entry.selectedPageUrl ??
    entry.manualCandidateUrls?.[0] ??
    entry.officialUrl ??
    null
  );
}

export function collectVerificationIssues(places, manifestEntries, existingOutputPaths) {
  const issues = [];
  const placeById = new Map(places.map(place => [place.id, place]));

  for (const entry of manifestEntries) {
    if (entry.status === 'captured' && entry.outputPath && !existingOutputPaths.has(entry.outputPath)) {
      issues.push(`[${entry.placeId}] missing output file: ${entry.outputPath}`);
    }

    if (entry.status === 'approved' && !entry.selectedPageUrl) {
      issues.push(`[${entry.placeId}] approved entry is missing selectedPageUrl`);
    }

    const place = placeById.get(entry.placeId);

    if (place?.thumbnailImage && !place.thumbnailImage.endsWith('.webp')) {
      issues.push(`[${entry.placeId}] thumbnailImage is not webp: ${place.thumbnailImage}`);
    }

    if (
      entry.status === 'captured' &&
      entry.outputPath &&
      place?.thumbnailImage !== entry.outputPath
    ) {
      issues.push(`[${entry.placeId}] missing thumbnailImage linkage in content source`);
    }
  }

  return issues;
}

async function loadPlaces(repoRoot) {
  const placesModuleUrl = `${pathToFileURL(path.join(repoRoot, 'content/places/index.ts')).href}?t=${Date.now()}`;
  const { ALL_PLACES } = await import(placesModuleUrl);
  return ALL_PLACES;
}

async function readManifest(repoRoot) {
  try {
    const raw = await readFile(manifestPathFor(repoRoot), 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}

async function writeManifest(repoRoot, entries) {
  const manifestPath = manifestPathFor(repoRoot);
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, `${JSON.stringify(sortManifestEntries(entries), null, 2)}\n`, 'utf8');
}

async function runSeed(repoRoot, args) {
  const approveOfficial = args.includes('--approve-official');
  const places = await loadPlaces(repoRoot);
  const existingEntries = await readManifest(repoRoot);
  const seededEntries = buildSeedManifestEntries(places, existingEntries, {
    approveOfficial,
  });

  await writeManifest(repoRoot, seededEntries);
  console.log(`Seeded ${seededEntries.length} thumbnail manifest entries at ${MANIFEST_RELATIVE_PATH}`);
}

function pickArg(args, flagName) {
  const index = args.indexOf(flagName);
  return index === -1 ? null : (args[index + 1] ?? null);
}

async function resolvePlaywright() {
  const { chromium } = await import('@playwright/test');
  return chromium;
}

async function fileExists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function downloadToTempFile(tempDir, fileNameBase, imageUrl) {
  const response = await fetch(imageUrl);

  if (!response.ok) {
    throw new Error(`Failed to download image: ${imageUrl} (${response.status})`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  const extensionFromType = contentType.includes('png')
    ? '.png'
    : contentType.includes('webp')
      ? '.webp'
      : contentType.includes('gif')
        ? '.gif'
        : '.jpg';
  const tempPath = path.join(tempDir, `${fileNameBase}${extensionFromType}`);
  const arrayBuffer = await response.arrayBuffer();
  await writeFile(tempPath, Buffer.from(arrayBuffer));
  return tempPath;
}

async function execSips(args) {
  await execFileAsync('sips', args);
}

async function getImageDimensions(filePath) {
  const { stdout } = await execFileAsync('sips', [
    '-g',
    'pixelWidth',
    '-g',
    'pixelHeight',
    filePath,
  ]);

  const widthMatch = stdout.match(/pixelWidth:\s+(\d+)/);
  const heightMatch = stdout.match(/pixelHeight:\s+(\d+)/);

  if (!widthMatch || !heightMatch) {
    throw new Error(`Could not read image dimensions for ${filePath}`);
  }

  return {
    width: Number(widthMatch[1]),
    height: Number(heightMatch[1]),
  };
}

function guessMimeTypeFromPath(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    default:
      return 'image/jpeg';
  }
}

async function normalizeToWebpWithBrowser(browser, inputPath, outputPath) {
  const page = await browser.newPage({
    viewport: { width: TARGET_WIDTH, height: TARGET_HEIGHT },
  });

  try {
    const buffer = await readFile(inputPath);
    const inputMimeType = guessMimeTypeFromPath(inputPath);
    const dataUrl = `data:${inputMimeType};base64,${buffer.toString('base64')}`;

    const outputDataUrl = await page.evaluate(
      async ({ imageDataUrl, targetWidth, targetHeight }) => {
        const image = new Image();
        image.src = imageDataUrl;
        await image.decode();

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const context = canvas.getContext('2d');

        if (!context) {
          throw new Error('Canvas 2D context is unavailable');
        }

        const imageRatio = image.naturalWidth / image.naturalHeight;
        const targetRatio = targetWidth / targetHeight;

        let sx = 0;
        let sy = 0;
        let sw = image.naturalWidth;
        let sh = image.naturalHeight;

        if (imageRatio > targetRatio) {
          sw = Math.round(image.naturalHeight * targetRatio);
          sx = Math.floor((image.naturalWidth - sw) / 2);
        } else {
          sh = Math.round(image.naturalWidth / targetRatio);
          sy = Math.floor((image.naturalHeight - sh) / 2);
        }

        context.drawImage(image, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);
        return canvas.toDataURL('image/webp', 0.92);
      },
      {
        imageDataUrl: dataUrl,
        targetWidth: TARGET_WIDTH,
        targetHeight: TARGET_HEIGHT,
      }
    );

    const webpBase64 = outputDataUrl.replace(/^data:image\/webp;base64,/, '');
    await writeFile(outputPath, Buffer.from(webpBase64, 'base64'));
  } finally {
    await page.close();
  }
}

async function normalizeToWebp(inputPath, outputPath, browser = null) {
  const workingDir = await mkdtemp(path.join(os.tmpdir(), 'places-thumbnail-normalize-'));
  const resizedPath = path.join(workingDir, 'resized.png');
  const croppedPath = path.join(workingDir, 'cropped.png');

  try {
    try {
      await execSips(['-Z', String(TARGET_WIDTH), inputPath, '--out', resizedPath]);
      const { width, height } = await getImageDimensions(resizedPath);
      const targetRatio = TARGET_WIDTH / TARGET_HEIGHT;

      let cropWidth = width;
      let cropHeight = height;

      if (width / height > targetRatio) {
        cropWidth = Math.max(TARGET_WIDTH, Math.round(height * targetRatio));
      } else {
        cropHeight = Math.max(TARGET_HEIGHT, Math.round(width / targetRatio));
      }

      if (cropWidth <= width && cropHeight <= height) {
        await execSips(
          ['-c', String(cropHeight), String(cropWidth), resizedPath, '--out', croppedPath]
        );
      } else {
        await copyFile(resizedPath, croppedPath);
      }

      await execSips([
        '-z',
        String(TARGET_HEIGHT),
        String(TARGET_WIDTH),
        croppedPath,
        '--setProperty',
        'format',
        'webp',
        '--out',
        outputPath,
      ]);
    } catch (error) {
      if (!browser) {
        throw error;
      }

      const fallbackInputPath = (await fileExists(croppedPath))
        ? croppedPath
        : (await fileExists(resizedPath))
          ? resizedPath
          : inputPath;
      await normalizeToWebpWithBrowser(browser, fallbackInputPath, outputPath);
    }
  } finally {
    await rm(workingDir, { recursive: true, force: true });
  }
}

async function collectVisualCandidates(page, selector = null) {
  return page.evaluate(selectedSelector => {
    const extractBgUrl = backgroundImage => {
      const match = backgroundImage.match(/url\((['"]?)(.*?)\1\)/i);
      return match?.[2] ?? null;
    };

    const root = selectedSelector ? document.querySelector(selectedSelector) : document.body;

    if (!root) {
      return [];
    }

    const roots = root === document.body ? [document.body] : [root];
    const imageElements = Array.from(
      new Set([...roots, ...root.querySelectorAll('img')])
    ).filter(element => element.tagName === 'IMG');
    const allElements = Array.from(new Set([...roots, ...root.querySelectorAll('*')]));

    const toAbsoluteUrl = raw => {
      if (!raw) return null;
      try {
        return new URL(raw, window.location.href).toString();
      } catch {
        return raw;
      }
    };

    const getVisibilityPayload = rect => {
      const visibleWidth = Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const area =
        visibleWidth > 0 && visibleHeight > 0
          ? Math.round(visibleWidth * visibleHeight)
          : 0;

      return {
        area,
        top: Math.max(0, Math.round(rect.top)),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    };

    const candidates = [];

    imageElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const visibility = getVisibilityPayload(rect);

      if (visibility.area < 40_000) {
        return;
      }

      const sourceUrl = toAbsoluteUrl(element.currentSrc || element.getAttribute('src'));

      if (!sourceUrl) {
        return;
      }

      candidates.push({
        type: 'img',
        sourceUrl,
        alt: element.getAttribute('alt') ?? '',
        className: element.className ?? '',
        id: element.id ?? '',
        href: element.closest('a')?.getAttribute('href') ?? '',
        ...visibility,
        imageIndex: index,
      });
    });

    allElements.forEach(element => {
      const style = window.getComputedStyle(element);
      const backgroundImage = style.backgroundImage;
      const backgroundUrl = extractBgUrl(backgroundImage);

      if (!backgroundUrl) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const visibility = getVisibilityPayload(rect);

      if (visibility.area < 80_000) {
        return;
      }

      candidates.push({
        type: 'background',
        sourceUrl: toAbsoluteUrl(backgroundUrl),
        alt: '',
        className: element.className ?? '',
        id: element.id ?? '',
        href: element.closest('a')?.getAttribute('href') ?? '',
        ...visibility,
      });
    });

    return candidates;
  }, selector);
}

async function captureSingleEntry(repoRoot, browser, entry) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  const tempDir = await mkdtemp(path.join(os.tmpdir(), `places-thumbnail-${entry.placeId}-`));

  try {
    const selectedPageUrl = getCaptureTargetUrl(entry);

    if (!selectedPageUrl) {
      throw new Error(`Missing selectedPageUrl for ${entry.placeId}`);
    }

    if (DIRECT_IMAGE_PATTERN.test(selectedPageUrl)) {
      const tempInputPath = await downloadToTempFile(tempDir, entry.placeId, selectedPageUrl);
      const absoluteOutputPath = outputAbsolutePathFor(repoRoot, entry.outputPath);
      await mkdir(path.dirname(absoluteOutputPath), { recursive: true });
      await normalizeToWebp(tempInputPath, absoluteOutputPath, browser);

      return {
        ...entry,
        captureMode: 'image',
        status: 'captured',
        capturedAt: new Date().toISOString(),
      };
    }

    await page.goto(selectedPageUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 45_000,
    });
    await page.waitForTimeout(2_500);

    const candidates = await collectVisualCandidates(page, entry.selectedSelector);
    const selectedCandidate = pickBestLandmarkCandidate(candidates);

    if (!selectedCandidate) {
      throw new Error('No landmark image candidate found');
    }

    const tempInputPath = await downloadToTempFile(
      tempDir,
      entry.placeId,
      selectedCandidate.sourceUrl
    );
    const absoluteOutputPath = outputAbsolutePathFor(repoRoot, entry.outputPath);
    await mkdir(path.dirname(absoluteOutputPath), { recursive: true });
    await normalizeToWebp(tempInputPath, absoluteOutputPath, browser);

    return {
      ...entry,
      captureMode: 'image',
      status: 'captured',
      capturedAt: new Date().toISOString(),
    };
  } finally {
    await page.close();
    await rm(tempDir, { recursive: true, force: true });
  }
}

async function runCapture(repoRoot, args) {
  const manifestEntries = await readManifest(repoRoot);
  const placeFilter = pickArg(args, '--place');
  const targetEntries = manifestEntries.filter(entry => {
    if (entry.status !== 'approved') {
      return false;
    }

    if (placeFilter && entry.placeId !== placeFilter) {
      return false;
    }

    return true;
  });

  if (targetEntries.length === 0) {
    console.log('No approved thumbnail entries to capture.');
    return;
  }

  const chromium = await resolvePlaywright();
  const browser = await chromium.launch({ headless: true });
  const nextEntries = [];

  try {
    for (const entry of manifestEntries) {
      const target = targetEntries.find(candidate => candidate.placeId === entry.placeId);
      if (!target) {
        nextEntries.push(entry);
        continue;
      }

      try {
        const capturedEntry = await captureSingleEntry(repoRoot, browser, target);
        nextEntries.push(capturedEntry);
        console.log(`Captured ${capturedEntry.placeId} -> ${capturedEntry.outputPath}`);
      } catch (error) {
        nextEntries.push({
          ...target,
          status: 'failed',
        });
        console.error(`Failed to capture ${target.placeId}: ${error.message}`);
      }
    }
  } finally {
    await browser.close();
  }

  await writeManifest(repoRoot, nextEntries);
}

async function runApply(repoRoot) {
  const manifestEntries = await readManifest(repoRoot);
  const updatedFiles = await applyCapturedEntriesToContent(repoRoot, manifestEntries);
  console.log(
    updatedFiles.length > 0
      ? `Applied captured thumbnails to ${updatedFiles.length} place source files.`
      : 'No captured thumbnail entries to apply.'
  );
}

async function runVerify(repoRoot) {
  const places = await loadPlaces(repoRoot);
  const manifestEntries = await readManifest(repoRoot);
  const existingOutputPaths = new Set();

  for (const entry of manifestEntries) {
    if (!entry.outputPath) {
      continue;
    }

    const absolutePath = outputAbsolutePathFor(repoRoot, entry.outputPath);

    if (await fileExists(absolutePath)) {
      existingOutputPaths.add(entry.outputPath);
    }
  }

  const issues = collectVerificationIssues(places, manifestEntries, existingOutputPaths);

  if (issues.length === 0) {
    console.log('Thumbnail manifest verification passed.');
    return;
  }

  for (const issue of issues) {
    console.error(`- ${issue}`);
  }

  process.exitCode = 1;
}

async function main(argv) {
  const [command, ...args] = argv;
  const repoRoot = process.cwd();

  switch (command) {
    case 'seed':
      await runSeed(repoRoot, args);
      return;
    case 'capture':
      await runCapture(repoRoot, args);
      return;
    case 'apply':
      await runApply(repoRoot);
      return;
    case 'verify':
      await runVerify(repoRoot);
      return;
    default:
      usage();
      process.exitCode = 1;
  }
}

const isMainModule =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);

if (isMainModule) {
  main(process.argv.slice(2)).catch(error => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}

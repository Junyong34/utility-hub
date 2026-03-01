#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

function fail(message) {
  console.error(`[saveParkingPostMarkdown] ${message}`);
  process.exit(1);
}

function readStdin() {
  try {
    return fs.readFileSync(0, 'utf8');
  } catch (error) {
    fail(`stdin 읽기 실패: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function parseJson(input) {
  if (!input || !input.trim()) {
    fail('stdin 입력이 비어 있습니다. extractor JSON을 전달해 주세요.');
  }

  try {
    return JSON.parse(input);
  } catch (error) {
    fail(`JSON 파싱 실패: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function sanitizeFileName(value) {
  return value
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractSlug(urlString) {
  try {
    const parsed = new URL(urlString);
    const segments = parsed.pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || 'post';
    const decoded = decodeURIComponent(lastSegment);
    const sanitized = sanitizeFileName(decoded);
    return sanitized || 'post';
  } catch {
    return 'post';
  }
}

function toTimestamp(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${y}${m}${d}-${hh}${mm}${ss}`;
}

function resolveTargetFilePath(outputDir, slug) {
  const defaultPath = path.join(outputDir, `${slug}.md`);
  if (!fs.existsSync(defaultPath)) {
    return defaultPath;
  }

  const timestamp = toTimestamp();
  const timestampPath = path.join(outputDir, `${slug}-${timestamp}.md`);
  if (!fs.existsSync(timestampPath)) {
    return timestampPath;
  }

  let sequence = 1;
  while (true) {
    const withSequence = path.join(
      outputDir,
      `${slug}-${timestamp}-${sequence}.md`
    );
    if (!fs.existsSync(withSequence)) {
      return withSequence;
    }
    sequence += 1;
  }
}

function main() {
  const rawInput = readStdin();
  const parsed = parseJson(rawInput);

  const url = typeof parsed?.url === 'string' ? parsed.url : '';
  const markdown = typeof parsed?.markdown === 'string' ? parsed.markdown : '';

  if (!url.trim()) {
    fail('필수 필드 url 이 없습니다.');
  }

  if (!markdown.trim()) {
    fail('필수 필드 markdown 이 없거나 비어 있습니다.');
  }

  const slug = extractSlug(url);
  const outputDir = path.resolve(process.cwd(), 'playwright-post');
  fs.mkdirSync(outputDir, { recursive: true });

  const targetFilePath = resolveTargetFilePath(outputDir, slug);
  fs.writeFileSync(targetFilePath, markdown, 'utf8');

  console.log(targetFilePath);
}

main();

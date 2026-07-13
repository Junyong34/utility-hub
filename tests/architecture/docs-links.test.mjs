import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const REPOSITORY_ROOT = path.resolve(import.meta.dirname, '../..');
const DOCUMENT_ROOTS = [
  'README.md',
  'AGENTS.md',
  'config',
  'docs',
  'modules',
  'shared',
];
const EXCLUDED_PATHS = new Set([
  'docs/superpowers/plans/2026-07-11-childcare-blog-research-plan.md',
]);

async function pathExists(candidatePath) {
  try {
    return await stat(candidatePath);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return null;
    }

    throw error;
  }
}

async function collectMarkdownFiles(relativePath) {
  if (EXCLUDED_PATHS.has(relativePath)) {
    return [];
  }

  const absolutePath = path.join(REPOSITORY_ROOT, relativePath);
  const entryStats = await pathExists(absolutePath);

  if (!entryStats) {
    return [];
  }

  if (entryStats.isFile()) {
    return relativePath.endsWith('.md') ? [relativePath] : [];
  }

  const entries = await readdir(absolutePath, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries
      .sort((left, right) => left.name.localeCompare(right.name))
      .map(entry =>
        collectMarkdownFiles(path.posix.join(relativePath, entry.name))
      )
  );

  return nestedFiles.flat();
}

function stripCode(markdown) {
  return markdown
    .replace(/^```[\s\S]*?^```/gm, '')
    .replace(/^~~~[\s\S]*?^~~~/gm, '')
    .replace(/`[^`\n]*`/g, '');
}

function extractLocalLinks(markdown) {
  const source = stripCode(markdown);
  const links = [];
  const inlineLinkPattern =
    /!?\[[^\]]*\]\((<[^>]+>|[^)\s]+)(?:\s+["'][^)]*["'])?\)/g;
  const referenceLinkPattern = /^\s*\[[^\]]+\]:\s*(<[^>]+>|\S+)/gm;

  for (const pattern of [inlineLinkPattern, referenceLinkPattern]) {
    for (const match of source.matchAll(pattern)) {
      const rawTarget = match[1].replace(/^<|>$/g, '');

      if (rawTarget.startsWith('/') || /^[a-z][a-z\d+.-]*:/i.test(rawTarget)) {
        continue;
      }

      const line = source.slice(0, match.index).split('\n').length;
      links.push({ rawTarget, line });
    }
  }

  return links;
}

function normalizeHeading(value) {
  return value
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[\\`*_{}\[\]()#+.!:;,?"'<>|~]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function collectAnchors(markdown) {
  const anchors = new Set();
  const headingCounts = new Map();

  for (const match of stripCode(markdown).matchAll(
    /^#{1,6}\s+(.+?)\s*#*\s*$/gm
  )) {
    const baseAnchor = normalizeHeading(match[1]);
    const duplicateCount = headingCounts.get(baseAnchor) ?? 0;
    const anchor =
      duplicateCount === 0 ? baseAnchor : `${baseAnchor}-${duplicateCount}`;

    headingCounts.set(baseAnchor, duplicateCount + 1);
    anchors.add(anchor);
  }

  for (const match of markdown.matchAll(
    /<(?:a\s+[^>]*?(?:id|name)|[^>]+\s+id)=["']([^"']+)["'][^>]*>/gi
  )) {
    anchors.add(match[1]);
  }

  return anchors;
}

function parseTarget(rawTarget) {
  const hashIndex = rawTarget.indexOf('#');
  const pathWithQuery =
    hashIndex === -1 ? rawTarget : rawTarget.slice(0, hashIndex);
  const fragment = hashIndex === -1 ? '' : rawTarget.slice(hashIndex + 1);
  const queryIndex = pathWithQuery.indexOf('?');
  const targetPath =
    queryIndex === -1 ? pathWithQuery : pathWithQuery.slice(0, queryIndex);

  try {
    return {
      targetPath: decodeURIComponent(targetPath),
      fragment: decodeURIComponent(fragment),
    };
  } catch {
    return { targetPath, fragment, invalidEncoding: true };
  }
}

async function findBrokenLinks(markdownFiles) {
  const failures = [];

  for (const sourcePath of markdownFiles) {
    const source = await readFile(
      path.join(REPOSITORY_ROOT, sourcePath),
      'utf8'
    );

    for (const { rawTarget, line } of extractLocalLinks(source)) {
      const { targetPath, fragment, invalidEncoding } = parseTarget(rawTarget);

      if (invalidEncoding) {
        failures.push(
          `${sourcePath}:${line} -> ${rawTarget} (invalid encoding)`
        );
        continue;
      }

      const resolvedTarget = targetPath
        ? path.resolve(REPOSITORY_ROOT, path.dirname(sourcePath), targetPath)
        : path.resolve(REPOSITORY_ROOT, sourcePath);
      const targetStats = await pathExists(resolvedTarget);

      if (!targetStats) {
        failures.push(`${sourcePath}:${line} -> ${rawTarget} (missing target)`);
        continue;
      }

      if (fragment && targetStats.isFile() && resolvedTarget.endsWith('.md')) {
        const targetMarkdown = await readFile(resolvedTarget, 'utf8');
        const anchors = collectAnchors(targetMarkdown);

        if (!anchors.has(normalizeHeading(fragment))) {
          failures.push(
            `${sourcePath}:${line} -> ${rawTarget} (missing anchor)`
          );
        }
      }
    }
  }

  return failures;
}

test('canonical Markdown documents resolve every local link and anchor', async () => {
  const markdownFiles = (
    await Promise.all(DOCUMENT_ROOTS.map(collectMarkdownFiles))
  ).flat();
  const failures = await findBrokenLinks(markdownFiles);

  assert.deepEqual(failures, []);
});

test('same-document anchor links remain part of the local-link contract', () => {
  assert.deepEqual(extractLocalLinks('# Details\n\n[상세](#details)'), [
    { rawTarget: '#details', line: 3 },
  ]);
  assert.equal(collectAnchors('# Details').has('details'), true);
});

test('route and legacy document trees do not regain planning documents', async () => {
  const routeDocuments = await collectMarkdownFiles('app');
  const routePlanningDocuments = routeDocuments.filter(documentPath =>
    /(?:prd|test-plan).*\.md$/i.test(path.basename(documentPath))
  );
  const legacyTaxonomyDocuments = (
    await Promise.all(
      ['docs/app-page', 'docs/superpowers'].map(collectMarkdownFiles)
    )
  ).flat();

  assert.deepEqual(
    {
      routePlanningDocuments,
      legacyTaxonomyDocuments,
    },
    {
      routePlanningDocuments: [],
      legacyTaxonomyDocuments: [],
    }
  );
});

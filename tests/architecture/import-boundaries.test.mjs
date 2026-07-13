import assert from 'node:assert/strict';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { isBuiltin } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import test from 'node:test';

const NEW_STRUCTURE_ROOTS = ['modules', 'shared', 'config'];
const PUBLIC_ENTRIES = new Set(['public', 'ui', 'client', 'server']);
const LEGACY_ROOTS = new Set(['components', 'lib', 'hooks', 'types']);
const MODULE_LAYER_NAMES = new Set([
  'public',
  'ui',
  'client',
  'server',
  'domain',
]);
const TEST_ONLY_BUILTINS = new Set(['test', 'assert', 'assert/strict']);
const CODE_FILE_PATTERN = /\.(?:[cm]?[jt]sx?)$/;
const TEST_FILE_PATTERN = /\.(?:test|spec)\.(?:[cm]?[jt]sx?)$/;
const BROWSER_API_PATTERN =
  /\b(?:window|document|navigator|localStorage|sessionStorage|indexedDB)\s*(?:\.|\[)|\btypeof\s+(?:window|document|navigator)\b|\bnew\s+(?:Audio|FileReader|BroadcastChannel|ResizeObserver|IntersectionObserver|MutationObserver)\s*\(|\b(?:matchMedia|requestAnimationFrame|cancelAnimationFrame)\s*\(/;

function toPosixPath(filePath) {
  return filePath.split(sep).join('/');
}

function stripCodeExtension(filePath) {
  return filePath.replace(/\.(?:[cm]?[jt]sx?)$/, '');
}

function listCodeFiles(directory) {
  if (!existsSync(directory)) {
    return [];
  }

  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules') {
      continue;
    }

    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...listCodeFiles(entryPath));
    } else if (entry.isFile() && CODE_FILE_PATTERN.test(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
}

function maskSource(source, { strings }) {
  const output = source.split('');
  let state = 'code';
  let quote = '';

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const nextCharacter = source[index + 1];

    if (state === 'line-comment') {
      if (character === '\n') {
        state = 'code';
      } else {
        output[index] = ' ';
      }
      continue;
    }

    if (state === 'block-comment') {
      if (character === '*' && nextCharacter === '/') {
        output[index] = ' ';
        output[index + 1] = ' ';
        index += 1;
        state = 'code';
      } else if (character !== '\n') {
        output[index] = ' ';
      }
      continue;
    }

    if (state === 'string') {
      if (character === '\\') {
        if (strings) {
          output[index] = ' ';
          if (nextCharacter !== undefined && nextCharacter !== '\n') {
            output[index + 1] = ' ';
          }
        }
        index += 1;
        continue;
      }

      if (strings && character !== '\n') {
        output[index] = ' ';
      }

      if (character === quote) {
        state = 'code';
      }
      continue;
    }

    if (character === '/' && nextCharacter === '/') {
      output[index] = ' ';
      output[index + 1] = ' ';
      index += 1;
      state = 'line-comment';
      continue;
    }

    if (character === '/' && nextCharacter === '*') {
      output[index] = ' ';
      output[index + 1] = ' ';
      index += 1;
      state = 'block-comment';
      continue;
    }

    if (character === "'" || character === '"' || character === '`') {
      quote = character;
      state = 'string';
      if (strings) {
        output[index] = ' ';
      }
    }
  }

  return output.join('');
}

function extractImports(sourceWithoutComments, codeOnly) {
  const imports = [];
  const seen = new Set();
  const patterns = [
    /\b(?:import|export)\s+(?:type\s+)?[\w$*\s{},]*?\s+from\s*(['"])([^'"]+)\1/g,
    /\bimport\s*(['"])([^'"]+)\1/g,
    /\b(?:import|require)\s*\(\s*(['"])([^'"]+)\1\s*\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of sourceWithoutComments.matchAll(pattern)) {
      if (/\s/.test(codeOnly[match.index] ?? ' ')) {
        continue;
      }

      const specifier = match[2];
      const key = `${match.index}:${specifier}`;

      if (!seen.has(key)) {
        seen.add(key);
        imports.push({ index: match.index, specifier });
      }
    }
  }

  return imports.sort((left, right) => left.index - right.index);
}

function lineNumberAt(source, index) {
  return source.slice(0, index).split('\n').length;
}

function resolveProjectImport(root, sourceFile, specifier) {
  const cleanSpecifier = specifier.split(/[?#]/, 1)[0];

  if (cleanSpecifier.startsWith('@/')) {
    return cleanSpecifier.slice(2).replaceAll('\\', '/');
  }

  if (!cleanSpecifier.startsWith('.')) {
    return null;
  }

  const targetPath = resolve(dirname(sourceFile), cleanSpecifier);
  const relativeTarget = relative(root, targetPath);

  if (
    relativeTarget === '..' ||
    relativeTarget.startsWith(`..${sep}`) ||
    isAbsolute(relativeTarget)
  ) {
    return null;
  }

  return toPosixPath(relativeTarget);
}

function moduleLeaf(relativePath) {
  const segments = relativePath.split('/');

  if (segments[0] !== 'modules' || !segments[1]) {
    return null;
  }

  if (segments[1] === 'tools' && segments[2]) {
    const thirdSegment = stripCodeExtension(segments[2]);

    if (!MODULE_LAYER_NAMES.has(thirdSegment)) {
      return `modules/tools/${segments[2]}`;
    }
  }

  return `modules/${segments[1]}`;
}

function isPublicEntryImport(targetPath, targetLeaf) {
  return moduleEntryName(targetPath, targetLeaf) !== null;
}

function moduleEntryName(targetPath, targetLeaf) {
  const targetSegments = targetPath.split('/');
  const leafSegments = targetLeaf.split('/');
  const remainder = targetSegments.slice(leafSegments.length);

  if (remainder.length !== 1) {
    return null;
  }

  const entryName = stripCodeExtension(remainder[0]);
  return PUBLIC_ENTRIES.has(entryName) ? entryName : null;
}

function pathUsesLayer(relativePath, layer) {
  return relativePath.split('/').some(segment => {
    const withoutExtension = stripCodeExtension(segment);
    return withoutExtension === layer || withoutExtension.endsWith(`.${layer}`);
  });
}

function isForbiddenNodeImport(specifier, isTestFile) {
  if (!isBuiltin(specifier)) {
    return false;
  }

  const normalizedSpecifier = specifier.replace(/^node:/, '');
  return !(isTestFile && TEST_ONLY_BUILTINS.has(normalizedSpecifier));
}

function isFrameworkImport(specifier) {
  return (
    specifier === 'react' ||
    specifier.startsWith('react/') ||
    specifier === 'react-dom' ||
    specifier.startsWith('react-dom/') ||
    specifier === 'next' ||
    specifier.startsWith('next/')
  );
}

function addViolation(violations, source, relativeFile, details) {
  violations.push({
    file: relativeFile,
    line: lineNumberAt(source, details.index),
    rule: details.rule,
    specifier: details.specifier ?? null,
    message: details.message,
  });
}

function inspectFile(root, sourceFile) {
  const violations = [];
  const source = readFileSync(sourceFile, 'utf8');
  const sourceWithoutComments = maskSource(source, { strings: false });
  const codeOnly = maskSource(source, { strings: true });
  const relativeFile = toPosixPath(relative(root, sourceFile));
  const isTestFile = TEST_FILE_PATTERN.test(relativeFile);
  const sourceLeaf = moduleLeaf(relativeFile);
  const sourceEntry = sourceLeaf
    ? moduleEntryName(relativeFile, sourceLeaf)
    : null;
  const clientDirectiveMatch = /^\s*['"]use client['"]\s*;?/.exec(
    sourceWithoutComments
  );
  const isClient =
    pathUsesLayer(relativeFile, 'client') || clientDirectiveMatch !== null;
  const isUi = pathUsesLayer(relativeFile, 'ui');
  const isModuleUi = sourceLeaf !== null && isUi;
  const isDomain = pathUsesLayer(relativeFile, 'domain');
  const isSharedContract = relativeFile.startsWith('shared/contracts/');
  const isPureContract = isDomain || isSharedContract;
  const isPublic = sourceEntry === 'public';
  const isServer = pathUsesLayer(relativeFile, 'server');
  const isRuntimeFile = !isTestFile && !relativeFile.endsWith('.d.ts');
  const isModuleOrSharedRuntime =
    isRuntimeFile &&
    (relativeFile.startsWith('modules/') || relativeFile.startsWith('shared/'));
  const isShared = relativeFile.startsWith('shared/');
  const isConfig = relativeFile.startsWith('config/');

  const broadExportPattern =
    /\bexport\s+\*(?:\s+as\s+[\w$]+)?\s+from\s*(['"])([^'"]+)\1/g;

  for (const match of sourceWithoutComments.matchAll(broadExportPattern)) {
    if (/\s/.test(codeOnly[match.index] ?? ' ')) {
      continue;
    }

    addViolation(violations, source, relativeFile, {
      index: match.index,
      rule: 'no-broad-export',
      specifier: match[2],
      message: 'Use explicit named exports instead of export *.',
    });
  }

  for (const imported of extractImports(sourceWithoutComments, codeOnly)) {
    const targetPath = resolveProjectImport(
      root,
      sourceFile,
      imported.specifier
    );
    const targetLeaf = targetPath ? moduleLeaf(targetPath) : null;
    const importsNode = isForbiddenNodeImport(imported.specifier, isTestFile);
    const importsServer =
      imported.specifier === 'server-only' ||
      (targetPath !== null && pathUsesLayer(targetPath, 'server'));
    const importsClient =
      targetPath !== null && pathUsesLayer(targetPath, 'client');
    const importsUi = targetPath !== null && pathUsesLayer(targetPath, 'ui');
    const targetEntry =
      targetPath !== null && targetLeaf !== null
        ? moduleEntryName(targetPath, targetLeaf)
        : null;

    if (
      sourceLeaf !== null &&
      sourceLeaf.startsWith('modules/tools/') &&
      sourceLeaf !== 'modules/tools/catalog' &&
      targetLeaf === 'modules/tools/catalog'
    ) {
      addViolation(violations, source, relativeFile, {
        index: imported.index,
        rule: 'tool-no-catalog-reverse-import',
        specifier: imported.specifier,
        message:
          'Tool modules cannot import the aggregate catalog; the catalog owns tool registration.',
      });
    }

    if (
      sourceLeaf !== null &&
      targetLeaf !== null &&
      sourceLeaf !== targetLeaf &&
      !isPublicEntryImport(targetPath, targetLeaf)
    ) {
      addViolation(violations, source, relativeFile, {
        index: imported.index,
        rule: 'no-cross-module-deep-import',
        specifier: imported.specifier,
        message:
          'Import another leaf module through public.ts, ui.ts, client.ts, or server.ts.',
      });
    }

    if (
      sourceLeaf !== null &&
      targetLeaf !== null &&
      sourceLeaf !== targetLeaf &&
      (isDomain || isPublic) &&
      targetEntry !== null &&
      targetEntry !== 'public'
    ) {
      addViolation(violations, source, relativeFile, {
        index: imported.index,
        rule: 'domain-public-only-public-entry',
        specifier: imported.specifier,
        message:
          'Domain and public entries can only import another module through public.ts.',
      });
    }

    if ((isClient || isUi) && importsServer) {
      addViolation(violations, source, relativeFile, {
        index: imported.index,
        rule: 'client-ui-no-server-import',
        specifier: imported.specifier,
        message: 'Client and UI code cannot import server code.',
      });
    }

    if ((isClient || isUi) && importsNode) {
      addViolation(violations, source, relativeFile, {
        index: imported.index,
        rule: 'client-ui-no-node-import',
        specifier: imported.specifier,
        message: 'Client and UI code cannot import Node builtins.',
      });
    }

    if (isUi && importsClient) {
      addViolation(violations, source, relativeFile, {
        index: imported.index,
        rule: 'ui-no-client-import',
        specifier: imported.specifier,
        message: 'UI code cannot import client orchestration.',
      });
    }

    if (isServer && (importsClient || importsUi)) {
      addViolation(violations, source, relativeFile, {
        index: imported.index,
        rule: 'server-no-client-ui-import',
        specifier: imported.specifier,
        message: 'Server code cannot import client or UI code.',
      });
    }

    if (
      isPureContract &&
      !isTestFile &&
      isFrameworkImport(imported.specifier)
    ) {
      addViolation(violations, source, relativeFile, {
        index: imported.index,
        rule: 'domain-no-framework-import',
        specifier: imported.specifier,
        message:
          'Domain and shared contract code cannot import React or Next.js.',
      });
    }

    if (isPureContract && importsNode) {
      addViolation(violations, source, relativeFile, {
        index: imported.index,
        rule: 'domain-no-node-import',
        specifier: imported.specifier,
        message: 'Domain and shared contract code cannot import Node builtins.',
      });
    }

    if (targetPath !== null && LEGACY_ROOTS.has(targetPath.split('/')[0])) {
      addViolation(violations, source, relativeFile, {
        index: imported.index,
        rule: 'no-new-legacy-import',
        specifier: imported.specifier,
        message:
          'New modules, shared, and config code cannot import legacy components/lib/hooks/types paths.',
      });
    }

    if (
      sourceLeaf !== null &&
      targetPath !== null &&
      (targetPath === 'app' || targetPath.startsWith('app/'))
    ) {
      addViolation(violations, source, relativeFile, {
        index: imported.index,
        rule: 'module-no-app-import',
        specifier: imported.specifier,
        message: 'Module layers cannot import Next.js app adapters.',
      });
    }

    if (
      targetPath !== null &&
      ((isShared &&
        (targetPath === 'app' ||
          targetPath.startsWith('app/') ||
          targetPath === 'modules' ||
          targetPath.startsWith('modules/'))) ||
        (isConfig &&
          (targetPath === 'app' ||
            targetPath.startsWith('app/') ||
            targetPath === 'modules' ||
            targetPath.startsWith('modules/') ||
            targetPath === 'shared' ||
            targetPath.startsWith('shared/'))))
    ) {
      addViolation(violations, source, relativeFile, {
        index: imported.index,
        rule: 'no-shared-config-reverse-import',
        specifier: imported.specifier,
        message:
          'Shared cannot import app/modules; config cannot import app/modules/shared.',
      });
    }
  }

  if (isModuleOrSharedRuntime) {
    const processEnvMatch = /\bprocess\s*\.\s*env\b/.exec(codeOnly);

    if (processEnvMatch) {
      addViolation(violations, source, relativeFile, {
        index: processEnvMatch.index,
        rule: 'no-process-env-outside-config',
        message:
          'New module and shared runtime code must read environment values through config.',
      });
    }
  }

  if (isModuleUi && clientDirectiveMatch !== null) {
    addViolation(violations, source, relativeFile, {
      index: clientDirectiveMatch.index,
      rule: 'ui-no-use-client-directive',
      message:
        'UI code must remain server-safe and cannot use client directives.',
    });
  }

  if ((isUi || isServer) && isRuntimeFile) {
    const browserApiMatch = BROWSER_API_PATTERN.exec(codeOnly);

    if (browserApiMatch) {
      addViolation(violations, source, relativeFile, {
        index: browserApiMatch.index,
        rule: isUi ? 'ui-no-browser-api' : 'server-no-browser-api',
        message: `${isUi ? 'UI' : 'Server'} code cannot access browser APIs.`,
      });
    }
  }

  if (isPureContract && isRuntimeFile) {
    const browserApiMatch = BROWSER_API_PATTERN.exec(codeOnly);

    if (browserApiMatch) {
      addViolation(violations, source, relativeFile, {
        index: browserApiMatch.index,
        rule: 'domain-no-browser-api',
        message: 'Domain and shared contract code cannot access browser APIs.',
      });
    }

    const networkApiPattern =
      /\b(?:globalThis\s*\.\s*)?fetch\s*\(|\bnew\s+(?:WebSocket|EventSource|XMLHttpRequest)\s*\(/g;

    for (const networkApiMatch of codeOnly.matchAll(networkApiPattern)) {
      addViolation(violations, source, relativeFile, {
        index: networkApiMatch.index,
        rule: 'domain-no-network-api',
        message: 'Domain and shared contract code cannot perform network I/O.',
      });
    }
  }

  return violations;
}

function inspectAppModuleConsumers(root, sourceFile) {
  const violations = [];
  const source = readFileSync(sourceFile, 'utf8');
  const sourceWithoutComments = maskSource(source, { strings: false });
  const codeOnly = maskSource(source, { strings: true });
  const relativeFile = toPosixPath(relative(root, sourceFile));

  for (const imported of extractImports(sourceWithoutComments, codeOnly)) {
    const targetPath = resolveProjectImport(
      root,
      sourceFile,
      imported.specifier
    );
    const targetLeaf = targetPath ? moduleLeaf(targetPath) : null;

    if (
      targetPath !== null &&
      targetLeaf !== null &&
      !isPublicEntryImport(targetPath, targetLeaf)
    ) {
      addViolation(violations, source, relativeFile, {
        index: imported.index,
        rule: 'app-no-module-deep-import',
        specifier: imported.specifier,
        message:
          'App code must import modules through public.ts, ui.ts, client.ts, or server.ts.',
      });
    }
  }

  return violations;
}

function inspectImportBoundaries(root) {
  const newStructureViolations = NEW_STRUCTURE_ROOTS.flatMap(directory =>
    listCodeFiles(join(root, directory)).flatMap(sourceFile =>
      inspectFile(root, sourceFile)
    )
  );
  const appConsumerViolations = listCodeFiles(join(root, 'app')).flatMap(
    sourceFile => inspectAppModuleConsumers(root, sourceFile)
  );

  return [...newStructureViolations, ...appConsumerViolations].sort(
    (left, right) =>
      left.file.localeCompare(right.file) ||
      left.line - right.line ||
      left.rule.localeCompare(right.rule)
  );
}

function withFixture(files, callback) {
  const root = mkdtempSync(join(tmpdir(), 'utility-hub-boundaries-'));

  try {
    for (const [relativeFile, source] of Object.entries(files)) {
      const targetFile = join(root, relativeFile);
      mkdirSync(dirname(targetFile), { recursive: true });
      writeFileSync(targetFile, source, 'utf8');
    }

    callback(root);
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
}

function rulesFrom(violations) {
  return violations.map(violation => violation.rule).sort();
}

function formatViolations(violations) {
  return violations
    .map(
      ({ file, line, rule, specifier, message }) =>
        `${file}:${line} [${rule}] ${message}${
          specifier === null ? '' : ` (${specifier})`
        }`
    )
    .join('\n');
}

test('accepts explicit module entries and ignores legacy trees', () => {
  withFixture(
    {
      'modules/places/domain/place.ts': 'export const placeId = "place-1";',
      'modules/places/public.ts': 'export { placeId } from "./domain/place";',
      'modules/places/server/load.ts': 'export const loadPlaces = () => [];',
      'modules/places/server.ts': 'export { loadPlaces } from "./server/load";',
      'modules/places/ui/PlaceCard.tsx':
        'export const PlaceCard = () => "place";',
      'modules/places/ui.ts': 'export { PlaceCard } from "./ui/PlaceCard";',
      'modules/places/client/PlaceList.tsx':
        '"use client";\nexport const PlaceList = () => "places";',
      'modules/places/client.ts':
        'export { PlaceList } from "./client/PlaceList";',
      'modules/blog/domain/post.ts':
        'import { placeId } from "@/modules/places/public";\nexport const post = { placeId };',
      'modules/blog/public.ts':
        'import { placeId } from "@/modules/places/public";\nexport const featuredPlaceId = placeId;',
      'modules/blog/server/load.ts':
        'import { loadPlaces } from "@/modules/places/server";\nexport const loadPosts = loadPlaces;',
      'modules/blog/ui/PostCard.tsx':
        'import { post } from "../domain/post";\nexport const PostCard = () => post.placeId;',
      'modules/blog/client/PostList.tsx':
        '\"use client\";\nimport { PostCard } from "../ui/PostCard";\nexport const PostList = PostCard;',
      'shared/domain/slug.ts': 'export const slug = "shared";',
      'shared/domain/site-name.ts':
        'import { site } from "@/config/site";\nexport const siteName = site.name;',
      'shared/ui/Dialog.tsx':
        '"use client";\nexport const Dialog = ({ open }) => open;',
      'config/env/public.ts':
        'export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;',
      'config/site.ts':
        'import { siteUrl } from "@/config/env/public";\nexport const site = { name: "Zento", url: siteUrl };',
      'app/page.tsx':
        'import { placeId } from "@/modules/places/public";\nimport { PlaceCard } from "@/modules/places/ui";\nimport { PlaceList } from "@/modules/places/client";\nimport { loadPlaces } from "@/modules/places/server";\nexport default function Page() { return [placeId, PlaceCard, PlaceList, loadPlaces]; }',
      'components/legacy.ts':
        'export * from "@/lib/legacy";\nwindow.location.href = process.env.URL;',
    },
    root => {
      assert.deepEqual(inspectImportBoundaries(root), []);
    }
  );
});

test('reports broad exports and cross-module deep imports', () => {
  withFixture(
    {
      'modules/places/domain/place.ts': 'export const placeId = "place-1";',
      'modules/places/public.ts': 'export * from "./domain/place";',
      'modules/blog/server/load.ts':
        'import { placeId } from "@/modules/places/domain/place";\nexport const postPlaceId = placeId;',
      'modules/tools/catalog/domain/manifest.ts':
        'export const toolId = "lotto";',
      'modules/tools/lotto/domain/recommend.ts':
        'import { toolId } from "@/modules/tools/catalog/domain/manifest";\nexport const recommendation = toolId;',
    },
    root => {
      assert.deepEqual(rulesFrom(inspectImportBoundaries(root)), [
        'no-broad-export',
        'no-cross-module-deep-import',
        'no-cross-module-deep-import',
        'tool-no-catalog-reverse-import',
      ]);
    }
  );
});

test('reports deep module imports from app consumers only', () => {
  withFixture(
    {
      'modules/places/ui/PlaceList.tsx':
        'export const PlaceList = () => "places";',
      'modules/tools/lotto/public.ts': 'export const toolId = "lotto";',
      'app/places/page.tsx':
        'import { PlaceList } from "@/modules/places/ui/PlaceList";\nexport default PlaceList;',
      'app/tools/lotto/page.tsx':
        'import { toolId } from "@/modules/tools/lotto";\nexport default function Page() { return toolId; }',
      'app/legacy/page.tsx':
        'import { legacy } from "@/lib/legacy";\nexport default function Page() { return legacy; }',
    },
    root => {
      assert.deepEqual(rulesFrom(inspectImportBoundaries(root)), [
        'app-no-module-deep-import',
        'app-no-module-deep-import',
      ]);
    }
  );
});

test('reports non-public cross-module entries from domain and public code', () => {
  withFixture(
    {
      'modules/places/ui.ts': 'export const PlaceList = () => "places";',
      'modules/places/client.ts': 'export const usePlaces = () => [];',
      'modules/places/server.ts': 'export const loadPlaces = () => [];',
      'modules/blog/domain/post.ts':
        'import { PlaceList } from "@/modules/places/ui";\nexport const post = PlaceList;',
      'modules/blog/public.ts':
        'import { loadPlaces } from "@/modules/places/server";\nexport const posts = loadPlaces;',
      'modules/tools/catalog/client.ts': 'export const useCatalog = () => [];',
      'modules/tools/lotto/domain/recommend.ts':
        'import { useCatalog } from "@/modules/tools/catalog/client";\nexport const recommendation = useCatalog;',
    },
    root => {
      assert.deepEqual(rulesFrom(inspectImportBoundaries(root)), [
        'domain-public-only-public-entry',
        'domain-public-only-public-entry',
        'domain-public-only-public-entry',
        'tool-no-catalog-reverse-import',
      ]);
    }
  );
});

test('reports reverse imports from a tool module to the catalog module', () => {
  withFixture(
    {
      'modules/tools/catalog/public.ts': 'export const tools = [];',
      'modules/tools/lotto/public.ts':
        'import { tools } from "@/modules/tools/catalog/public";\nexport const lottoTools = tools;',
    },
    root => {
      assert.deepEqual(rulesFrom(inspectImportBoundaries(root)), [
        'tool-no-catalog-reverse-import',
      ]);
    }
  );
});

test('reports server and Node dependencies from client or UI code', () => {
  withFixture(
    {
      'modules/places/server/load.ts': 'export const loadPlaces = () => [];',
      'modules/places/server.ts': 'export { loadPlaces } from "./server/load";',
      'modules/places/client/use-places.ts':
        'import fs from "node:fs";\nimport { loadPlaces } from "../server";\nimport { ga4 } from "@/config/env/ga4.server";\nexport const usePlaces = () => [fs, loadPlaces, ga4];',
      'modules/places/ui/PlaceCard.tsx':
        'import { usePlaces } from "../client/use-places";\nexport const PlaceCard = usePlaces;',
      'modules/blog/ui/BlogCard.tsx':
        'import { loadPlaces } from "@/modules/places/server";\nexport const BlogCard = loadPlaces;',
      'config/env/ga4.server.ts': 'export const ga4 = "server";',
    },
    root => {
      assert.deepEqual(rulesFrom(inspectImportBoundaries(root)), [
        'client-ui-no-node-import',
        'client-ui-no-server-import',
        'client-ui-no-server-import',
        'client-ui-no-server-import',
        'ui-no-client-import',
      ]);
    }
  );
});

test('reports client and UI dependencies from server code', () => {
  withFixture(
    {
      'modules/blog/client.ts': 'export const usePosts = () => [];',
      'modules/blog/ui.ts': 'export const PostList = () => "posts";',
      'modules/blog/server/load.ts':
        'import { usePosts } from "../client";\nimport { PostList } from "../ui";\nexport const loadPosts = () => [usePosts, PostList];',
      'shared/ui/Button.tsx': 'export const Button = () => "button";',
      'modules/places/server/render.ts':
        'import { Button } from "@/shared/ui/Button";\nexport const renderPlace = Button;',
    },
    root => {
      assert.deepEqual(rulesFrom(inspectImportBoundaries(root)), [
        'server-no-client-ui-import',
        'server-no-client-ui-import',
        'server-no-client-ui-import',
      ]);
    }
  );
});

test('reports client directives and browser APIs from server-safe UI layers', () => {
  withFixture(
    {
      'modules/places/ui/PlaceMap.tsx':
        '"use client";\nexport const PlaceMap = () => navigator.geolocation;',
      'modules/places/server/render.ts':
        'export const render = () => document.createElement("div");',
      'shared/ui/Dialog.tsx':
        '"use client";\nexport const Dialog = ({ open }) => open;',
    },
    root => {
      assert.deepEqual(rulesFrom(inspectImportBoundaries(root)), [
        'server-no-browser-api',
        'ui-no-browser-api',
        'ui-no-use-client-directive',
      ]);
    }
  );
});

test('reports app adapter imports from every module layer', () => {
  withFixture(
    {
      'app/layout.tsx': 'export const metadata = {};',
      'app/api/places/route.ts': 'export const GET = () => new Response();',
      'modules/places/domain/site.ts':
        'import { metadata } from "@/app/layout";\nexport const siteMetadata = metadata;',
      'modules/tools/lotto/server/load.ts':
        'import { GET } from "../../../../app/api/places/route";\nexport const load = GET;',
    },
    root => {
      assert.deepEqual(rulesFrom(inspectImportBoundaries(root)), [
        'module-no-app-import',
        'module-no-app-import',
      ]);
    }
  );
});

test('reports framework, runtime, and browser dependencies from domain code', () => {
  withFixture(
    {
      'modules/places/domain/place.ts': [
        'import React from "react";',
        'import { notFound } from "next/navigation";',
        'import fs from "node:fs";',
        'export const secret = process.env.PLACE_SECRET;',
        'export const currentUrl = window.location.href;',
        'export const value = [React, notFound, fs, secret, currentUrl];',
      ].join('\n'),
      'modules/places/domain/place.test.mjs':
        'import test from "node:test";\nimport assert from "node:assert/strict";\ntest("pure value", () => assert.equal(1, 1));',
    },
    root => {
      assert.deepEqual(rulesFrom(inspectImportBoundaries(root)), [
        'domain-no-browser-api',
        'domain-no-framework-import',
        'domain-no-framework-import',
        'domain-no-node-import',
        'no-process-env-outside-config',
      ]);
    }
  );
});

test('reports runtime dependencies from shared contracts', () => {
  withFixture(
    {
      'shared/contracts/navigation.ts': [
        'import type { ReactNode } from "react";',
        'import fs from "node:fs";',
        'export const currentUrl = window.location.href;',
        'export const loadNavigation = () => fetch("/api/navigation");',
        'export type NavigationLabel = ReactNode;',
        'export const runtimeValues = [fs, currentUrl, loadNavigation];',
      ].join('\n'),
    },
    root => {
      assert.deepEqual(rulesFrom(inspectImportBoundaries(root)), [
        'domain-no-browser-api',
        'domain-no-framework-import',
        'domain-no-network-api',
        'domain-no-node-import',
      ]);
    }
  );
});

test('reports network dependencies from domain code', () => {
  withFixture(
    {
      'modules/places/domain/fetch-place.ts':
        'export const fetchPlace = () => fetch("/api/places");',
      'modules/places/domain/socket.ts':
        'export const socket = new WebSocket("wss://example.test");',
      'modules/places/domain/events.ts':
        'export const events = new EventSource("/api/events");',
      'modules/places/domain/request.ts':
        'export const request = new XMLHttpRequest();',
    },
    root => {
      assert.deepEqual(rulesFrom(inspectImportBoundaries(root)), [
        'domain-no-network-api',
        'domain-no-network-api',
        'domain-no-network-api',
        'domain-no-network-api',
      ]);
    }
  );
});

test('reports direct environment access outside config runtime', () => {
  withFixture(
    {
      'modules/places/server/load.ts':
        'export const source = process.env.PLACES_SOURCE;',
      'shared/client/analytics.ts':
        'export const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;',
      'config/env/public.ts':
        'export const publicId = process.env.NEXT_PUBLIC_ANALYTICS_ID;',
      'app/page.tsx':
        'export default function Page() { return process.env.NODE_ENV; }',
    },
    root => {
      assert.deepEqual(rulesFrom(inspectImportBoundaries(root)), [
        'no-process-env-outside-config',
        'no-process-env-outside-config',
      ]);
    }
  );
});

test('ignores boundary keywords inside comments, strings, and regex literals', () => {
  withFixture(
    {
      'modules/places/domain/examples.ts': [
        '// import fs from "node:fs";',
        '/* export * from "@/modules/blog/server"; */',
        'export const korean = "한글과 😀 export * from \'@/modules/blog/server\'";',
        'export const importExample = "import { load } from \'@/modules/blog/server\'";',
        'export const runtimeExample = "fetch(url) process.env.API window.location";',
        'export const templateExample = `new WebSocket(url) localStorage.getItem(key)`;',
        'export const browserWord = /window/;',
      ].join('\n'),
      'shared/runtime.ts':
        'export const environmentExample = "process.env.NEXT_PUBLIC_SITE_URL";',
    },
    root => {
      assert.deepEqual(inspectImportBoundaries(root), []);
    }
  );
});

test('reports legacy imports introduced by new structure code', () => {
  withFixture(
    {
      'lib/legacy.ts': 'export const legacy = true;',
      'components/Button.tsx': 'export const Button = () => "button";',
      'types/legacy.ts': 'export type Legacy = string;',
      'hooks/use-legacy.ts': 'export const useLegacy = () => true;',
      'modules/places/server/load.ts':
        'import { legacy } from "@/lib/legacy";\nexport const load = legacy;',
      'shared/ui/SharedButton.tsx':
        'import { Button } from "../../components/Button";\nexport const SharedButton = Button;',
      'config/site.ts':
        'import type { Legacy } from "@/types/legacy";\nexport const site = {} as Legacy;',
      'app/page.tsx':
        'import { useLegacy } from "@/hooks/use-legacy";\nexport default function Page() { return useLegacy(); }',
    },
    root => {
      assert.deepEqual(rulesFrom(inspectImportBoundaries(root)), [
        'no-new-legacy-import',
        'no-new-legacy-import',
        'no-new-legacy-import',
      ]);
    }
  );
});

test('reports reverse dependencies from shared and config code', () => {
  withFixture(
    {
      'modules/places/public.ts': 'export const placeId = "place-1";',
      'app/layout.tsx': 'export const metadata = {};',
      'shared/domain/place-link.ts':
        'import { placeId } from "@/modules/places/public";\nexport const placeLink = placeId;',
      'config/site.ts':
        'import { metadata } from "../app/layout";\nexport const siteMetadata = metadata;',
      'config/navigation.ts':
        'import { slug } from "@/shared/domain/slug";\nexport const navigationSlug = slug;',
      'shared/domain/slug.ts': 'export const slug = "shared";',
    },
    root => {
      assert.deepEqual(rulesFrom(inspectImportBoundaries(root)), [
        'no-shared-config-reverse-import',
        'no-shared-config-reverse-import',
        'no-shared-config-reverse-import',
      ]);
    }
  );
});

test('repository new structure has no import-boundary violations', () => {
  const repositoryRoot = resolve(import.meta.dirname, '../..');
  const violations = inspectImportBoundaries(repositoryRoot);

  assert.deepEqual(
    violations,
    [],
    `New-structure import-boundary violations:\n${formatViolations(violations)}`
  );
});

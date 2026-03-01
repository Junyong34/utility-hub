/**
 * 주차정보 블로그 워드프레스 포스트 DOM에서 제목/본문/목차/이미지/마크다운을 추출합니다.
 * Playwright `page.evaluate()` 또는 브라우저 콘솔에서 직접 실행할 수 있는 구조를 제공합니다.
 */

export interface TocItem {
  text: string;
  href: string;
}

export interface ExtractedImage {
  alt: string;
  src: string;
}

export interface ExtractedPostDom {
  url: string;
  title: string;
  contentHtml: string;
  toc: TocItem[];
  images: ExtractedImage[];
  markdown: string;
}

export interface ExtractOptions {
  includeFullEntryContent: true;
  excludeAdSelectors?: string[];
}

export const PARKING_POST_ROOT_SELECTOR =
  'main.site-main article[id^="post-"].type-post, article[id^="post-"].type-post, article.type-post';

export const PARKING_POST_TITLE_SELECTOR = 'h1.entry-title';

export const PARKING_POST_CONTENT_SELECTOR = '.inside-article .entry-content, .entry-content';

export const PARKING_POST_TOC_SELECTOR = '.lwptoc';

export const PARKING_POST_TOC_LINK_SELECTOR = '.lwptoc_item a[href^="#"]';

export const DEFAULT_PARKING_POST_EXCLUDE_AD_SELECTORS = [
  '.google-auto-placed.ap_container',
  'ins.adsbygoogle',
  '[id*="google_ads"]',
  'iframe[src*="doubleclick"]',
  'iframe[src*="googlesyndication"]',
] as const;

interface ResolvedOptions {
  includeFullEntryContent: true;
  excludeAdSelectors: string[];
}

function resolveOptions(options?: Partial<ExtractOptions>): ResolvedOptions {
  return {
    includeFullEntryContent: true,
    excludeAdSelectors: [
      ...DEFAULT_PARKING_POST_EXCLUDE_AD_SELECTORS,
      ...(options?.excludeAdSelectors ?? []),
    ],
  };
}

function normalizeText(value: string | null | undefined): string {
  return (value ?? '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}

function removeExcludedNodes(root: Element, excludeSelectors: string[]): void {
  const mergedSelectors = excludeSelectors.join(', ');
  if (!mergedSelectors) return;

  root.querySelectorAll(mergedSelectors).forEach(node => node.remove());
}

function extractTocItems(contentRoot: Element): TocItem[] {
  const tocRoot = contentRoot.querySelector(PARKING_POST_TOC_SELECTOR);
  if (!tocRoot) return [];

  const seen = new Set<string>();
  const result: TocItem[] = [];

  tocRoot.querySelectorAll<HTMLAnchorElement>(PARKING_POST_TOC_LINK_SELECTOR).forEach(link => {
    const text = normalizeText(link.textContent);
    const href = normalizeText(link.getAttribute('href'));
    if (!text || !href || !href.startsWith('#')) return;

    const key = `${text}__${href}`;
    if (seen.has(key)) return;
    seen.add(key);

    result.push({ text, href });
  });

  return result;
}

function firstSrcFromSrcSet(srcset: string | null): string | null {
  if (!srcset) return null;
  const firstCandidate = srcset
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)[0];

  if (!firstCandidate) return null;

  return firstCandidate.split(/\s+/)[0] ?? null;
}

function isDataImageSrc(src: string): boolean {
  return src.startsWith('data:image/');
}

function toAbsoluteUrl(candidate: string, baseUrl: string): string | null {
  try {
    return new URL(candidate, baseUrl).toString();
  } catch {
    return null;
  }
}

function resolveImageSrc(img: HTMLImageElement, baseUrl: string): string | null {
  const candidateSrcList = [
    img.getAttribute('data-lazy-src'),
    img.getAttribute('data-src'),
    normalizeText(img.currentSrc),
    firstSrcFromSrcSet(img.getAttribute('srcset')),
    firstSrcFromSrcSet(img.getAttribute('data-srcset')),
    img.getAttribute('src'),
  ];

  for (const rawCandidate of candidateSrcList) {
    const candidate = normalizeText(rawCandidate);
    if (!candidate || isDataImageSrc(candidate)) continue;

    const absolute = toAbsoluteUrl(candidate, baseUrl);
    if (absolute && !isDataImageSrc(absolute)) {
      return absolute;
    }
  }

  return null;
}

function extractImages(contentRoot: Element, baseUrl: string): ExtractedImage[] {
  const images: ExtractedImage[] = [];
  const seen = new Set<string>();

  contentRoot.querySelectorAll<HTMLImageElement>('img').forEach(img => {
    const src = resolveImageSrc(img, baseUrl);
    if (!src || seen.has(src)) return;

    seen.add(src);

    images.push({
      alt: normalizeText(img.getAttribute('alt')),
      src,
    });
  });

  return images;
}

function appendListMarkdown(lines: string[], element: HTMLUListElement | HTMLOListElement): void {
  const isOrdered = element.tagName.toLowerCase() === 'ol';
  const items = Array.from(element.querySelectorAll(':scope > li'));

  items.forEach((item, index) => {
    const itemText = normalizeText(item.textContent);
    if (!itemText) return;

    const marker = isOrdered ? `${index + 1}.` : '-';
    lines.push(`${marker} ${itemText}`);
  });

  if (items.length > 0) {
    lines.push('');
  }
}

function appendFigureMarkdown(lines: string[], figure: HTMLElement, baseUrl: string): void {
  const figureImages = Array.from(figure.querySelectorAll('img'));
  const figureHasTable = Boolean(figure.querySelector('table'));

  if (figureHasTable) {
    lines.push(figure.outerHTML);
    lines.push('');
    return;
  }

  if (figureImages.length === 0) {
    const text = normalizeText(figure.textContent);
    if (text) {
      lines.push(text);
      lines.push('');
    }
    return;
  }

  figureImages.forEach(img => {
    const src = resolveImageSrc(img, baseUrl);
    if (!src) return;

    const alt = normalizeText(img.getAttribute('alt'));
    lines.push(`![${alt}](${src})`);
  });

  const caption = normalizeText(figure.querySelector('figcaption')?.textContent);
  if (caption) {
    lines.push(`*${caption}*`);
  }

  lines.push('');
}

function appendElementMarkdown(lines: string[], element: Element, baseUrl: string): void {
  const tagName = element.tagName.toLowerCase();

  if (tagName === 'div' && element.classList.contains('lwptoc')) {
    return;
  }

  if (/^h[1-6]$/.test(tagName)) {
    const level = Number(tagName[1]);
    const text = normalizeText(element.textContent);
    if (!text) return;

    lines.push(`${'#'.repeat(level)} ${text}`);
    lines.push('');
    return;
  }

  if (tagName === 'p') {
    const text = normalizeText(element.textContent);
    if (text) {
      lines.push(text);
      lines.push('');
    }
    return;
  }

  if (tagName === 'hr') {
    lines.push('---');
    lines.push('');
    return;
  }

  if (tagName === 'ul' || tagName === 'ol') {
    appendListMarkdown(lines, element as HTMLUListElement | HTMLOListElement);
    return;
  }

  if (tagName === 'figure') {
    appendFigureMarkdown(lines, element as HTMLElement, baseUrl);
    return;
  }

  if (tagName === 'table') {
    lines.push((element as HTMLElement).outerHTML);
    lines.push('');
    return;
  }

  const text = normalizeText(element.textContent);
  if (text) {
    lines.push(text);
    lines.push('');
  }
}

function compactEmptyLines(lines: string[]): string[] {
  const result: string[] = [];
  let previousWasEmpty = false;

  lines.forEach(line => {
    const isEmpty = line.trim().length === 0;
    if (isEmpty && previousWasEmpty) return;
    result.push(line);
    previousWasEmpty = isEmpty;
  });

  while (result.length > 0 && result[result.length - 1].trim().length === 0) {
    result.pop();
  }

  return result;
}

function buildMarkdown(
  title: string,
  contentRoot: HTMLElement,
  toc: TocItem[],
  baseUrl: string
): string {
  const lines: string[] = [];

  lines.push(`# ${title}`);
  lines.push('');

  if (toc.length > 0) {
    lines.push('## 목차');
    lines.push('');

    toc.forEach(item => {
      lines.push(`- [${item.text}](${item.href})`);
    });

    lines.push('');
  }

  lines.push('## 본문');
  lines.push('');

  Array.from(contentRoot.children).forEach(element => {
    appendElementMarkdown(lines, element, baseUrl);
  });

  const compacted = compactEmptyLines(lines);
  return compacted.join('\n');
}

/**
 * 현재 브라우저 문서(document)에서 parking-post 포스트 데이터를 추출합니다.
 * Playwright 사용 시 evaluate 컨텍스트 내부에서 이 로직을 실행하면 동일한 결과를 얻을 수 있습니다.
 */
export function extractParkingPostDom(
  options?: Partial<ExtractOptions>
): ExtractedPostDom {
  const resolved = resolveOptions(options);

  const article = document.querySelector<HTMLElement>(PARKING_POST_ROOT_SELECTOR);
  if (!article) {
    throw new Error(
      `[parkingPostDomExtractor] Post root not found: ${PARKING_POST_ROOT_SELECTOR}`
    );
  }

  const titleElement = article.querySelector<HTMLElement>(PARKING_POST_TITLE_SELECTOR);
  if (!titleElement) {
    throw new Error(
      `[parkingPostDomExtractor] Title not found: ${PARKING_POST_TITLE_SELECTOR}`
    );
  }

  const contentElement = article.querySelector<HTMLElement>(PARKING_POST_CONTENT_SELECTOR);
  if (!contentElement) {
    throw new Error(
      `[parkingPostDomExtractor] Content not found: ${PARKING_POST_CONTENT_SELECTOR}`
    );
  }

  const clonedContent = contentElement.cloneNode(true) as HTMLElement;
  removeExcludedNodes(clonedContent, resolved.excludeAdSelectors);

  const title = normalizeText(titleElement.textContent);
  const url = normalizeText(window.location.href);
  const baseUrl = normalizeText(document.baseURI || window.location.href);
  const toc = extractTocItems(clonedContent);
  const images = extractImages(clonedContent, baseUrl);
  const contentHtml = clonedContent.innerHTML.trim();
  const markdown = buildMarkdown(title, clonedContent, toc, baseUrl);

  return {
    url,
    title,
    contentHtml,
    toc,
    images,
    markdown,
  };
}

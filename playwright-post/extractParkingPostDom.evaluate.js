/* eslint-disable @typescript-eslint/no-unused-expressions */

() => {
  const postRootSelector =
    'main.site-main article[id^="post-"].type-post, article[id^="post-"].type-post, article.type-post';
  const titleSelector = 'h1.entry-title';
  const contentSelector = '.inside-article .entry-content, .entry-content';
  const tocSelector = '.lwptoc';
  const tocLinkSelector = '.lwptoc_item a[href^="#"]';

  const excludeAdSelectors = [
    '.google-auto-placed.ap_container',
    'ins.adsbygoogle',
    '[id*="google_ads"]',
    'iframe[src*="doubleclick"]',
    'iframe[src*="googlesyndication"]',
  ];

  const normalizeText = value =>
    (value ?? '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();

  const removeExcludedNodes = root => {
    root.querySelectorAll(excludeAdSelectors.join(', ')).forEach(node => node.remove());
  };

  const extractTocItems = contentRoot => {
    const tocRoot = contentRoot.querySelector(tocSelector);
    if (!tocRoot) return [];

    const seen = new Set();
    const items = [];

    tocRoot.querySelectorAll(tocLinkSelector).forEach(link => {
      const text = normalizeText(link.textContent);
      const href = normalizeText(link.getAttribute('href'));
      if (!text || !href || !href.startsWith('#')) return;

      const key = `${text}__${href}`;
      if (seen.has(key)) return;
      seen.add(key);

      items.push({ text, href });
    });

    return items;
  };

  const firstSrcFromSrcSet = srcset => {
    if (!srcset) return null;
    const firstCandidate = srcset
      .split(',')
      .map(part => part.trim())
      .filter(Boolean)[0];

    if (!firstCandidate) return null;
    return firstCandidate.split(/\s+/)[0] ?? null;
  };

  const isDataImageSrc = src => src.startsWith('data:image/');

  const toAbsoluteUrl = candidate => {
    try {
      return new URL(candidate, document.baseURI || window.location.href).toString();
    } catch {
      return null;
    }
  };

  const resolveImageSrc = img => {
    const candidates = [
      img.getAttribute('data-lazy-src'),
      img.getAttribute('data-src'),
      normalizeText(img.currentSrc),
      firstSrcFromSrcSet(img.getAttribute('srcset')),
      firstSrcFromSrcSet(img.getAttribute('data-srcset')),
      img.getAttribute('src'),
    ];

    for (const rawCandidate of candidates) {
      const candidate = normalizeText(rawCandidate);
      if (!candidate || isDataImageSrc(candidate)) continue;

      const absoluteUrl = toAbsoluteUrl(candidate);
      if (absoluteUrl && !isDataImageSrc(absoluteUrl)) {
        return absoluteUrl;
      }
    }

    return null;
  };

  const extractImages = contentRoot => {
    const result = [];
    const seen = new Set();

    contentRoot.querySelectorAll('img').forEach(img => {
      const src = resolveImageSrc(img);
      if (!src || seen.has(src)) return;

      seen.add(src);
      result.push({
        alt: normalizeText(img.getAttribute('alt')),
        src,
      });
    });

    return result;
  };

  const appendListMarkdown = (lines, listElement) => {
    const isOrdered = listElement.tagName.toLowerCase() === 'ol';
    const items = Array.from(listElement.querySelectorAll(':scope > li'));

    items.forEach((item, index) => {
      const text = normalizeText(item.textContent);
      if (!text) return;

      const marker = isOrdered ? `${index + 1}.` : '-';
      lines.push(`${marker} ${text}`);
    });

    if (items.length > 0) {
      lines.push('');
    }
  };

  const appendFigureMarkdown = (lines, figureElement) => {
    if (figureElement.querySelector('table')) {
      lines.push(figureElement.outerHTML);
      lines.push('');
      return;
    }

    const figureImages = Array.from(figureElement.querySelectorAll('img'));
    if (figureImages.length === 0) {
      const text = normalizeText(figureElement.textContent);
      if (text) {
        lines.push(text);
        lines.push('');
      }
      return;
    }

    figureImages.forEach(img => {
      const src = resolveImageSrc(img);
      if (!src) return;

      const alt = normalizeText(img.getAttribute('alt'));
      lines.push(`![${alt}](${src})`);
    });

    const caption = normalizeText(figureElement.querySelector('figcaption')?.textContent);
    if (caption) {
      lines.push(`*${caption}*`);
    }

    lines.push('');
  };

  const appendElementMarkdown = (lines, element) => {
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
      appendListMarkdown(lines, element);
      return;
    }

    if (tagName === 'figure') {
      appendFigureMarkdown(lines, element);
      return;
    }

    if (tagName === 'table') {
      lines.push(element.outerHTML);
      lines.push('');
      return;
    }

    const text = normalizeText(element.textContent);
    if (text) {
      lines.push(text);
      lines.push('');
    }
  };

  const compactEmptyLines = lines => {
    const result = [];
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
  };

  const buildMarkdown = (title, contentRoot, toc) => {
    const lines = [];

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
      appendElementMarkdown(lines, element);
    });

    return compactEmptyLines(lines).join('\n');
  };

  const article = document.querySelector(postRootSelector);
  if (!article) {
    throw new Error(`[parkingPostDomExtractor] Post root not found: ${postRootSelector}`);
  }

  const titleElement = article.querySelector(titleSelector);
  if (!titleElement) {
    throw new Error(`[parkingPostDomExtractor] Title not found: ${titleSelector}`);
  }

  const contentElement = article.querySelector(contentSelector);
  if (!contentElement) {
    throw new Error(`[parkingPostDomExtractor] Content not found: ${contentSelector}`);
  }

  const clonedContent = contentElement.cloneNode(true);
  removeExcludedNodes(clonedContent);

  const title = normalizeText(titleElement.textContent);
  const toc = extractTocItems(clonedContent);
  const images = extractImages(clonedContent);
  const contentHtml = clonedContent.innerHTML.trim();
  const markdown = buildMarkdown(title, clonedContent, toc);

  return {
    url: normalizeText(window.location.href),
    title,
    contentHtml,
    toc,
    images,
    markdown,
  };
}

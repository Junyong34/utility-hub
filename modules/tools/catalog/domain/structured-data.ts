import type { BreadcrumbLink } from '../../../../shared/contracts/navigation.ts';
import type { ToolManifest } from '../../../../shared/contracts/tool-manifest.ts';
import type { CatalogSiteContext } from './metadata.ts';

interface WebPageSchema {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  name: string;
  url: string;
  description?: string;
  inLanguage: 'ko-KR';
  isPartOf: {
    '@type': 'WebSite';
    name: string;
    url: string;
  };
}

interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string | undefined;
  }>;
}

interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

interface HowToSchema {
  '@context': 'https://schema.org';
  '@type': 'HowTo';
  name: string;
  description: string;
  image: undefined;
  totalTime: string | undefined;
  step: Array<{
    '@type': 'HowToStep';
    name: string;
    text: string;
    image: string | undefined;
    url: string | undefined;
  }>;
  tool: string[] | undefined;
  supply: undefined;
}

export interface ToolApplicationSchema {
  '@context': 'https://schema.org';
  '@type': 'WebApplication';
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: 'Web Browser';
  offers: {
    '@type': 'Offer';
    price: '0';
    priceCurrency: 'KRW';
  };
  featureList?: string[];
  url: string;
  browserRequirements: 'Requires JavaScript. Requires HTML5.';
}

export interface ToolStructuredDataValidationResult {
  toolId: string;
  requiredTypes: string[];
  presentTypes: string[];
  missingTypes: string[];
  isValid: boolean;
}

export interface ToolStructuredData {
  webPage: WebPageSchema;
  breadcrumb: BreadcrumbSchema;
  application: ToolApplicationSchema;
  faq: FAQSchema | null;
  howTo: HowToSchema | null;
}

export type ToolStructuredDataItem =
  | WebPageSchema
  | BreadcrumbSchema
  | ToolApplicationSchema
  | FAQSchema
  | HowToSchema;

function buildWebPageSchema(
  site: CatalogSiteContext,
  page: { name: string; path: string; description?: string }
): WebPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.name,
    url: `${site.url}${page.path}`,
    description: page.description,
    inLanguage: 'ko-KR',
    isPartOf: {
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
    },
  };
}

function buildBreadcrumbSchema(
  site: CatalogSiteContext,
  breadcrumbs: BreadcrumbLink[]
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url ? `${site.url}${breadcrumb.url}` : undefined,
    })),
  };
}

function buildFAQSchema(tool: ToolManifest): FAQSchema | null {
  if (!tool.faq) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

function buildHowToSchema(tool: ToolManifest): HowToSchema | null {
  if (!tool.howTo) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `${tool.name} 사용법`,
    description: tool.description,
    image: undefined,
    totalTime: tool.estimatedTime,
    step: tool.howTo.map(step => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
      image: step.image,
      url: step.url,
    })),
    tool: tool.tools,
    supply: undefined,
  };
}

export function buildToolApplicationSchema(
  site: CatalogSiteContext,
  tool: ToolManifest
): ToolApplicationSchema {
  const application: ToolApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.applicationCategory ?? 'UtilityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    url: `${site.url}/tools/${tool.id}`,
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  };

  if (tool.features && tool.features.length > 0) {
    application.featureList = tool.features;
  }

  return application;
}

export function buildToolStructuredData(
  site: CatalogSiteContext,
  tool: ToolManifest
): ToolStructuredData {
  return {
    webPage: buildWebPageSchema(site, {
      name: tool.name,
      path: `/tools/${tool.id}`,
      description: tool.description,
    }),
    breadcrumb: buildBreadcrumbSchema(site, [
      { name: '홈', url: '/' },
      { name: '도구', url: '/tools' },
      { name: tool.name },
    ]),
    application: buildToolApplicationSchema(site, tool),
    faq: buildFAQSchema(tool),
    howTo: buildHowToSchema(tool),
  };
}

export function buildToolSubPageStructuredData(
  site: CatalogSiteContext,
  tool: ToolManifest,
  options: {
    path: string;
    name: string;
    description: string;
    breadcrumbs: BreadcrumbLink[];
  }
): ToolStructuredData {
  return {
    webPage: buildWebPageSchema(site, {
      name: options.name,
      path: options.path,
      description: options.description,
    }),
    breadcrumb: buildBreadcrumbSchema(site, options.breadcrumbs),
    application: buildToolApplicationSchema(site, tool),
    faq: buildFAQSchema(tool),
    howTo: buildHowToSchema(tool),
  };
}

export function buildToolsMainStructuredData(site: CatalogSiteContext): {
  webPage: WebPageSchema;
  breadcrumb: BreadcrumbSchema;
} {
  return {
    webPage: buildWebPageSchema(site, {
      name: '도구 모음',
      path: '/tools',
      description:
        '비용 계산과 조건 비교를 빠르게 정리하는 실전 도구 모음입니다.',
    }),
    breadcrumb: buildBreadcrumbSchema(site, [
      { name: '홈', url: '/' },
      { name: '도구' },
    ]),
  };
}

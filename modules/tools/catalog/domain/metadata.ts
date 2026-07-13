import type { ToolManifest } from '../../../../shared/contracts/tool-manifest.ts';

export interface CatalogSiteContext {
  name: string;
  url: string;
  ogImage: string;
  locale: string;
  author: string;
}

interface CatalogMetadataInput {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  ogImage?: string;
}

export interface CatalogMetadata {
  title: {
    default: string;
    template: string;
  };
  description: string;
  keywords?: string;
  creator: string;
  publisher: string;
  alternates: {
    canonical: string;
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    locale: string;
    type: 'website';
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
    images: string[];
  };
  robots: {
    index: true;
    follow: true;
    googleBot: {
      index: true;
      follow: true;
      'max-video-preview': -1;
      'max-image-preview': 'large';
      'max-snippet': -1;
    };
  };
  verification: Record<string, never>;
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

function buildMetadata(
  site: CatalogSiteContext,
  input: CatalogMetadataInput
): CatalogMetadata {
  const ogImage = input.ogImage ?? site.ogImage;
  const fullOgImageUrl = ogImage.startsWith('http')
    ? ogImage
    : `${site.url}${ogImage}`;

  return {
    title: {
      default: input.title,
      template: `%s | ${site.name}`,
    },
    description: input.description,
    keywords: input.keywords?.join(', '),
    creator: site.author,
    publisher: site.author,
    alternates: {
      canonical: input.canonical,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url: input.canonical,
      siteName: site.name,
      locale: site.locale,
      type: 'website',
      images: [
        {
          url: fullOgImageUrl,
          width: 1200,
          height: 630,
          alt: input.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [fullOgImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {},
  };
}

export function buildToolMetadata(
  site: CatalogSiteContext,
  tool: ToolManifest
): CatalogMetadata {
  return buildMetadata(site, {
    title: tool.name,
    description: tool.description,
    canonical: `${normalizeBaseUrl(site.url)}/tools/${tool.id}`,
    keywords: tool.keywords,
    ogImage: tool.ogImage ?? `/api/og/tools/${encodeURIComponent(tool.id)}`,
  });
}

export function buildToolsMainMetadata(
  site: CatalogSiteContext
): CatalogMetadata {
  const baseUrl = normalizeBaseUrl(site.url);

  return buildMetadata(site, {
    title: '도구 모음',
    description:
      '아이와 나들이 계획, 생활비 판단, 금융 계산에 함께 쓰는 계산·비교 도구 모음입니다. 장소 탐색 다음 단계에서 바로 활용할 수 있게 정리했습니다.',
    canonical: `${baseUrl}/tools`,
    keywords: [
      '도구 모음',
      '육아 도구',
      '나들이 예산 계산',
      '생활비 계산기',
      '대출 계산기',
      'DSR 계산기',
    ],
    ogImage: '/og-images/tools-og-image.webp',
  });
}

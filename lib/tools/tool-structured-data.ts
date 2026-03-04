/**
 * Tool 구조화 데이터 생성 유틸리티
 * Schema.org의 SoftwareApplication, WebApplication 등 Tool 전용 스키마 생성
 * Blog SEO와 완전히 분리됨
 */

import type { ToolConfig } from '@/types/tools';
import { SITE_CONFIG } from '@/lib/seo/metadata';
import {
  createWebPageSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  createHowToSchema,
} from '@/lib/seo/structured-data';
import { getToolConfig } from './tool-config';

/**
 * SoftwareApplication 스키마 타입
 */
interface SoftwareApplicationSchema {
  '@context': string;
  '@type': 'SoftwareApplication' | 'WebApplication';
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
  featureList?: string[];
  url: string;
  browserRequirements?: string;
  softwareVersion?: string;
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    ratingCount: string;
  };
}

/**
 * Tool용 SoftwareApplication 구조화 데이터 생성
 * 검색엔진에 Tool을 웹 애플리케이션으로 인식시킴
 */
export function createToolApplicationSchema(
  tool: ToolConfig
): SoftwareApplicationSchema {
  const baseSchema: SoftwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.applicationCategory || 'UtilityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    url: `${SITE_CONFIG.url}/tools/${tool.id}`,
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  };

  // 기능 목록 추가
  if (tool.features && tool.features.length > 0) {
    baseSchema.featureList = tool.features;
  }

  return baseSchema;
}

/**
 * Tool 페이지용 통합 구조화 데이터 생성
 * WebPage, Breadcrumb, SoftwareApplication, FAQ, HowTo 등을 포함
 */
export function createToolStructuredData(toolId: string) {
  const tool = getToolConfig(toolId);

  if (!tool) {
    throw new Error(`Tool configuration not found: ${toolId}`);
  }

  // WebPage 스키마
  const webPage = createWebPageSchema({
    name: tool.name,
    path: `/tools/${tool.id}`,
    description: tool.description,
  });

  // Breadcrumb 스키마
  const breadcrumb = createBreadcrumbSchema([
    { name: '홈', url: '/' },
    { name: '도구', url: '/tools' },
    { name: tool.name },
  ]);

  // SoftwareApplication 스키마
  const application = createToolApplicationSchema(tool);

  // FAQ 스키마 (있는 경우)
  const faq = tool.faq
    ? createFAQSchema(
        tool.faq.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))
      )
    : null;

  // HowTo 스키마 (있는 경우)
  const howTo = tool.howTo
    ? createHowToSchema({
        name: `${tool.name} 사용법`,
        description: tool.description,
        steps: tool.howTo.map((step) => ({
          name: step.name,
          text: step.text,
          image: step.image,
          url: step.url,
        })),
        totalTime: tool.estimatedTime,
        tools: tool.tools,
      })
    : null;

  return {
    webPage,
    breadcrumb,
    application,
    faq,
    howTo,
  };
}

/**
 * Tools 메인 페이지용 구조화 데이터
 */
export function createToolsMainStructuredData() {
  const webPage = createWebPageSchema({
    name: '도구 모음',
    path: '/tools',
    description: '다양한 유용한 도구를 한곳에서 바로 사용할 수 있습니다.',
  });

  const breadcrumb = createBreadcrumbSchema([
    { name: '홈', url: '/' },
    { name: '도구' },
  ]);

  return {
    webPage,
    breadcrumb,
  };
}

/**
 * 구조화 데이터를 배열로 변환 (null 제거)
 * JsonLdMultiple 컴포넌트에 전달하기 위한 헬퍼
 */
export function getToolStructuredDataArray(toolId: string) {
  const { webPage, breadcrumb, application, faq, howTo } =
    createToolStructuredData(toolId);

  return [webPage, breadcrumb, application, faq, howTo].filter(
    (data) => data !== null
  );
}

/**
 * Tools 메인 페이지 구조화 데이터 배열
 */
export function getToolsMainStructuredDataArray() {
  const { webPage, breadcrumb } = createToolsMainStructuredData();
  return [webPage, breadcrumb];
}

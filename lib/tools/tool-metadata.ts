/**
 * Tool 메타데이터 생성 유틸리티
 * Blog SEO와 완전히 분리된 Tools 전용 메타데이터 생성기
 */

import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';
import { SITE_CONFIG } from '@/lib/seo/metadata';
import { resolveToolMetadataOgImage } from '@/lib/seo/og-policy';
import { createToolsMainMetadataInput } from '@/lib/seo/site-section-seo';
import { getToolConfig } from './tool-config';

/**
 * Tool 페이지 메타데이터 생성
 * @param toolId - Tool ID
 * @returns Next.js Metadata 객체
 */
export function generateToolMetadata(toolId: string): Metadata {
  const tool = getToolConfig(toolId);

  if (!tool) {
    throw new Error(`Tool configuration not found: ${toolId}`);
  }

  return generateMetadata({
    title: tool.name,
    description: tool.description,
    canonical: `https://www.zento.kr/tools/${tool.id}`,
    keywords: tool.keywords,
    ogImage: resolveToolMetadataOgImage(tool.id, tool.ogImage),
    ogType: 'website', // Blog는 'article', Tool은 'website'
  });
}

/**
 * Tools 메인 페이지 메타데이터 생성
 */
export function generateToolsMainMetadata(): Metadata {
  return generateMetadata({
    ...createToolsMainMetadataInput(SITE_CONFIG.url),
    ogType: 'website',
  });
}

/**
 * Tool 제목 생성 (UI용)
 * @param toolId - Tool ID
 * @returns Tool 이름 또는 짧은 이름
 */
export function getToolTitle(toolId: string): string {
  const tool = getToolConfig(toolId);
  return tool ? tool.shortName || tool.name : 'Tool';
}

/**
 * Tool URL 생성
 * @param toolId - Tool ID
 * @returns 전체 URL
 */
export function getToolUrl(toolId: string): string {
  return `https://www.zento.kr/tools/${toolId}`;
}

/**
 * Tool 공유 텍스트 생성
 * @param toolId - Tool ID
 * @returns 공유용 텍스트
 */
export function getToolShareText(toolId: string): string {
  const tool = getToolConfig(toolId);
  if (!tool) return '';

  return `${tool.name} - ${tool.description}`;
}

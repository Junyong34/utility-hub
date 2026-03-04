/**
 * Tool 메타데이터 생성 유틸리티
 * Blog SEO와 완전히 분리된 Tools 전용 메타데이터 생성기
 */

import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';
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
    ogImage: tool.ogImage || '/og-images/tools-default.png',
    ogType: 'website', // Blog는 'article', Tool은 'website'
  });
}

/**
 * Tools 메인 페이지 메타데이터 생성
 */
export function generateToolsMainMetadata(): Metadata {
  return generateMetadata({
    title: '도구 모음',
    description:
      '다양한 유용한 도구를 한곳에서 바로 사용할 수 있습니다. 로또 번호 생성기, 계산기, 변환기 등 실생활과 개발에 필요한 온라인 도구 모음.',
    canonical: 'https://www.zento.kr/tools',
    keywords: [
      '온라인 도구',
      '유틸리티',
      '로또 번호 생성기',
      '무료 도구',
      '웹 도구',
      '계산기',
      '변환기',
    ],
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

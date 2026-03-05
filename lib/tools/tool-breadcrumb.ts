/**
 * Tools Breadcrumb 헬퍼 함수
 * Breadcrumb 항목을 중앙에서 관리하여 일관성 유지
 */

import { getToolConfig } from './tool-config';

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

/**
 * Tools 메인 라벨 상수
 * 이 값을 변경하면 모든 Tools 페이지의 Breadcrumb이 자동으로 업데이트됩니다
 */
export const TOOLS_MAIN_LABEL = '도구';
export const TOOLS_MAIN_URL = '/tools';

/**
 * Tools 메인 페이지 Breadcrumb 항목 생성
 * @returns Breadcrumb 항목 배열
 *
 * @example
 * ```tsx
 * <Breadcrumb items={getToolsMainBreadcrumbItems()} />
 * // 결과: [{ name: '도구' }]
 * ```
 */
export function getToolsMainBreadcrumbItems(): BreadcrumbItem[] {
  return [{ name: TOOLS_MAIN_LABEL }];
}

/**
 * Tool 상세 페이지 Breadcrumb 항목 생성
 * @param toolId - Tool ID (예: 'lotto')
 * @param subItems - 추가 하위 항목 (예: stats, round 페이지용)
 * @returns Breadcrumb 항목 배열
 *
 * @example
 * ```tsx
 * // Tool 메인 페이지
 * <Breadcrumb items={getToolBreadcrumbItems('lotto')} />
 * // 결과: [{ name: '도구', url: '/tools' }, { name: 'AI 추천 번호 생성' }]
 *
 * // Tool 서브 페이지
 * <Breadcrumb items={getToolBreadcrumbItems('lotto', [{ name: '번호 통계' }])} />
 * // 결과: [
 * //   { name: '도구', url: '/tools' },
 * //   { name: '로또 번호 생성기', url: '/tools/lotto' },
 * //   { name: '번호 통계' }
 * // ]
 * ```
 */
export function getToolBreadcrumbItems(
  toolId: string,
  subItems?: Array<{ name: string; url?: string }>
): BreadcrumbItem[] {
  const tool = getToolConfig(toolId);

  if (!tool) {
    // fallback: tool 설정이 없으면 기본값 반환
    return [{ name: TOOLS_MAIN_LABEL, url: TOOLS_MAIN_URL }];
  }

  const toolLabel = tool.breadcrumbLabel || tool.shortName || tool.name;
  const items: BreadcrumbItem[] = [
    { name: TOOLS_MAIN_LABEL, url: TOOLS_MAIN_URL },
    {
      name: toolLabel,
      url: subItems && subItems.length > 0 ? `${TOOLS_MAIN_URL}/${toolId}` : undefined,
    },
  ];

  if (subItems && subItems.length > 0) {
    items.push(...subItems);
  }

  return items;
}

/**
 * JSON-LD용 Breadcrumb 항목 생성 (홈 포함)
 * @param toolId - Tool ID
 * @param subPath - 서브 페이지 경로 (예: 'stats', 'round/1234')
 * @param subName - 서브 페이지 이름 (예: '번호 통계', '1234회 분석')
 * @returns Breadcrumb 항목 배열
 *
 * @example
 * ```tsx
 * // Tool 메인 페이지
 * const breadcrumbs = getToolStructuredDataBreadcrumbs('lotto');
 * // 결과: [
 * //   { name: '홈', url: '/' },
 * //   { name: '도구', url: '/tools' },
 * //   { name: 'AI 추천 번호 생성' }
 * // ]
 *
 * // Tool 서브 페이지
 * const breadcrumbs = getToolStructuredDataBreadcrumbs('lotto', 'stats', '번호 통계');
 * // 결과: [
 * //   { name: '홈', url: '/' },
 * //   { name: '도구', url: '/tools' },
 * //   { name: '로또 번호 생성기', url: '/tools/lotto' },
 * //   { name: '번호 통계' }
 * // ]
 * ```
 */
export function getToolStructuredDataBreadcrumbs(
  toolId: string,
  subPath?: string,
  subName?: string
): BreadcrumbItem[] {
  const tool = getToolConfig(toolId);

  if (!tool) {
    return [
      { name: '홈', url: '/' },
      { name: TOOLS_MAIN_LABEL },
    ];
  }

  const toolLabel = tool.breadcrumbLabel || tool.shortName || tool.name;
  const items: BreadcrumbItem[] = [
    { name: '홈', url: '/' },
    { name: TOOLS_MAIN_LABEL, url: subPath ? TOOLS_MAIN_URL : undefined },
  ];

  if (subPath && subName) {
    items.push(
      { name: toolLabel, url: `${TOOLS_MAIN_URL}/${toolId}` },
      { name: subName }
    );
  } else {
    items.push({ name: toolLabel });
  }

  return items;
}

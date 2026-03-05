/**
 * Tool 전용 Breadcrumb 래퍼 컴포넌트
 * lib/tools/tool-breadcrumb.ts의 헬퍼 함수를 사용하여 일관성 유지
 */

import { Breadcrumb } from './Breadcrumb';
import { getToolBreadcrumbItems } from '@/lib/tools/tool-breadcrumb';

interface ToolBreadcrumbProps {
  toolId: string;
  subItems?: Array<{ name: string; url?: string }>;
  className?: string;
}

/**
 * Tool 페이지용 Breadcrumb 컴포넌트
 *
 * @example
 * ```tsx
 * // Tool 메인 페이지
 * <ToolBreadcrumb toolId="lotto" />
 *
 * // Tool 서브 페이지
 * <ToolBreadcrumb
 *   toolId="lotto"
 *   subItems={[{ name: '번호 통계' }]}
 * />
 * ```
 */
export function ToolBreadcrumb({ toolId, subItems, className }: ToolBreadcrumbProps) {
  const items = getToolBreadcrumbItems(toolId, subItems);

  return <Breadcrumb items={items} className={className} />;
}

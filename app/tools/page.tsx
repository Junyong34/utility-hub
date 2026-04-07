import { Metadata } from 'next';
import { JsonLdMultiple } from '@/components/seo';
import {
  generateToolsMainMetadata,
  getToolsMainStructuredDataArray,
  getAllToolConfigs,
} from '@/lib/tools';
import type { ToolListItem } from '@/lib/tools';
import { ToolsPageClient } from '@/components/tools/ToolsPageClient';

/**
 * Tools 메인 페이지 메타데이터
 */
export const metadata: Metadata = generateToolsMainMetadata();

/**
 * TOOL_CONFIGS → ToolListItem 변환 (서버 사이드)
 * icon 컴포넌트(함수)는 Client 경계를 넘길 수 없으므로 iconName(문자열)만 전달
 */
const toolConfigs = getAllToolConfigs();
const TOOLS: ToolListItem[] = toolConfigs.map(config => ({
  id: config.id,
  name: config.name,
  description: config.description,
  iconName: config.icon ?? '',
  href: `/tools/${config.id}`,
  badge: config.badge,
  color: config.color ?? 'from-blue-500 to-purple-500',
  category: config.category,
}));

/**
 * Tools 메인 페이지
 */
export default function ToolsPage() {
  const structuredData = getToolsMainStructuredDataArray();

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <div className="relative min-h-screen bg-background pt-10 md:pt-24 xl:pt-32">
        <ToolsPageClient tools={TOOLS} />
      </div>
    </>
  );
}

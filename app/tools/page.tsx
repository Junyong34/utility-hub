import type { Metadata } from 'next';
import { JsonLdMultiple } from '@/components/seo';
import { ToolsPageClient } from '@/modules/tools/catalog/client';
import { listToolItems } from '@/modules/tools/catalog/public';
import {
  generateToolsMainMetadata,
  getToolsMainStructuredDataArray,
} from '@/modules/tools/catalog/server';

/**
 * Tools 메인 페이지 메타데이터
 */
export const metadata: Metadata = generateToolsMainMetadata();

/**
 * TOOL_CONFIGS → ToolListItem 변환 (서버 사이드)
 * icon 컴포넌트(함수)는 Client 경계를 넘길 수 없으므로 iconName(문자열)만 전달
 */
const TOOLS = listToolItems();

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

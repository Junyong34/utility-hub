import { Metadata } from 'next';
import { JsonLdMultiple } from '@/components/seo';
import {
  generateToolsMainMetadata,
  getToolsMainStructuredDataArray,
  getAllToolConfigs,
} from '@/lib/tools';
import { ToolsPageClient, type SerializableTool } from '@/components/tools/ToolsPageClient';

/**
 * Tools 메인 페이지 메타데이터
 */
export const metadata: Metadata = generateToolsMainMetadata();

/**
 * TOOL_CONFIGS → SerializableTool 변환 (서버 사이드)
 * icon 컴포넌트(함수)는 Client 경계를 넘길 수 없으므로 iconName(문자열)만 전달
 */
const toolConfigs = getAllToolConfigs();
const TOOLS: SerializableTool[] = toolConfigs.map((config) => ({
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
      <div className="relative min-h-screen bg-background">
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl" />
        </div>
        <ToolsPageClient tools={TOOLS} />
      </div>
    </>
  );
}

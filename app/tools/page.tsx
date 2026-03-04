import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DicesIcon, ArrowRightIcon } from 'lucide-react';
import { Breadcrumb, JsonLdMultiple } from '@/components/seo';
import {
  generateToolsMainMetadata,
  getToolsMainStructuredDataArray,
  getAllToolConfigs,
} from '@/lib/tools';

/**
 * Tools 메인 페이지 메타데이터
 * lib/tools에서 자동 생성
 */
export const metadata: Metadata = generateToolsMainMetadata();

/**
 * Tool 데이터 타입 (UI 렌더링용)
 */
interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  color: string;
}

/**
 * 아이콘 매핑
 * tool-config.ts에서 문자열로 저장된 아이콘을 실제 컴포넌트로 변환
 */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  DicesIcon: DicesIcon,
  // 향후 추가될 아이콘들
};

/**
 * 사용 가능한 도구 목록
 * TOOL_CONFIGS에서 자동으로 생성
 */
const toolConfigs = getAllToolConfigs();
const TOOLS: Tool[] = toolConfigs.map((config) => ({
  id: config.id,
  name: config.name,
  description: config.description,
  icon: ICON_MAP[config.icon || 'DicesIcon'] || DicesIcon,
  href: `/tools/${config.id}`,
  badge: config.badge,
  color: config.color || 'from-blue-500 to-purple-500',
}));

/**
 * Tools 메인 페이지
 */
export default function ToolsPage() {
  // 구조화 데이터 (lib/tools에서 자동 생성)
  const structuredData = getToolsMainStructuredDataArray();

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <div className="min-h-screen bg-background">
        {/* 헤더 섹션 */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <Breadcrumb items={[{ name: '도구' }]} className="mb-5" />
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                <span className="text-primary">Tools</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                일상과 개발에 유용한 도구들을 모았습니다.
                <br />
                필요한 도구를 선택하여 바로 사용해보세요.
              </p>
            </div>
          </div>
        </section>

      {/* 도구 목록 섹션 */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.id} href={tool.href}>
                  <Card className="group relative overflow-hidden p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                    {/* 배경 그라데이션 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                    {/* 뱃지 */}
                    {tool.badge && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {tool.badge}
                        </span>
                      </div>
                    )}

                    {/* 아이콘 */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} text-white mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* 제목 및 설명 */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    {/* 화살표 아이콘 */}
                    <div className="mt-4 flex items-center text-primary text-sm font-medium">
                      <span>사용하기</span>
                      <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* 추가 도구 예정 안내 */}
          {TOOLS.length < 3 && (
            <div className="mt-12 text-center">
              <Card className="inline-block p-8 bg-muted/50">
                <p className="text-muted-foreground">
                  더 많은 유용한 도구들이 곧 추가될 예정입니다.
                </p>
              </Card>
            </div>
          )}
        </section>

        {/* CTA 섹션 */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Card className="relative overflow-hidden p-8 md:p-12 bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                원하는 도구가 없나요?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                필요하신 도구가 있다면 제안해주세요.
                <br />
                지속적으로 새로운 도구를 추가하고 있습니다.
              </p>
              <div className="pt-4">
                <Button size="lg" asChild>
                  <Link href="/faq">
                    자주 묻는 질문 보기
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
}

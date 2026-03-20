import { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumb, JsonLdMultiple } from '@/components/seo';
import { ToolSwitcher } from '@/components/tools/ToolSwitcher';
import { LastDigitGameTool } from '@/components/tools/last-digit-game';
import {
  assertToolStructuredData,
  generateToolMetadata,
  getToolBreadcrumbItems,
  getToolStructuredDataArray,
} from '@/lib/tools';

assertToolStructuredData('last-digit-game');

export const metadata: Metadata = generateToolMetadata('last-digit-game');

export default function LastDigitGamePage() {
  const structuredData = getToolStructuredDataArray('last-digit-game');

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumb
              items={getToolBreadcrumbItems('last-digit-game')}
              className="mb-4"
            />
            <ToolSwitcher currentToolId="last-digit-game" />
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              랜덤 스톱워치 게임 (Last Digit Game)
            </h1>
            <p className="mt-1 text-muted-foreground">
              참여자별 2회 스톱워치 기록에서 초(second)의 끝자리 곱으로 점수를 계산해
              실시간 랭킹 경쟁을 진행합니다.
            </p>
          </section>

          <Suspense fallback={<div className="text-muted-foreground">로딩 중...</div>}>
            <LastDigitGameTool />
          </Suspense>
        </main>
      </div>
    </>
  );
}


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
            <div className="mt-3 rounded-lg border border-foreground/15 bg-card/80 p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="font-bold text-foreground">요약</strong>:
                참여자별 <strong>2회</strong> 기록을 받아{' '}
                <strong>초(second) 끝자리</strong>를 추출해 점수를 계산하고
                실시간으로 순위를 비교하는 게임입니다.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  🟢 <strong className="text-foreground">점수 규칙</strong>:
                  기록1 × 기록2 (각각 초 끝자리 값)
                </li>
                <li>
                  🟢 <strong className="text-foreground">정렬 규칙</strong>:
                  점수 높은 순, 동점은 완료 순(시간) 우선
                </li>
                <li>
                  🟢 <strong className="text-foreground">완주 조건</strong>:
                  모든 참가자가 2회 측정을 완료
                </li>
              </ul>
            </div>
          </section>

          <Suspense
            fallback={<div className="text-muted-foreground">로딩 중...</div>}
          >
            <LastDigitGameTool />
          </Suspense>
        </main>
      </div>
    </>
  );
}

import { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumb, JsonLdMultiple } from '@/components/seo';
import { ToolSwitcher } from '@/components/tools/ToolSwitcher';
import { PomodoroTool } from '@/components/tools/pomodoro';
import {
  assertToolStructuredData,
  generateToolMetadata,
  getToolBreadcrumbItems,
  getToolStructuredDataArray,
} from '@/lib/tools';

assertToolStructuredData('pomodoro');

export const metadata: Metadata = generateToolMetadata('pomodoro');

export default function PomodoroPage() {
  const structuredData = getToolStructuredDataArray('pomodoro');

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            <Breadcrumb
              items={getToolBreadcrumbItems('pomodoro')}
              className="mb-4"
            />
            <ToolSwitcher currentToolId="pomodoro" />
          </div>
        </header>

        <main className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
          <section className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              뽀모도로 타이머
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
              설정 때문에 흐름이 끊기지 않도록 Quick Start와 Task Mode를 한
              화면에 담았습니다. 브라우저에서 바로 시작하고, 새로고침 후에도
              진행 중 타이머를 복구할 수 있습니다.
            </p>
          </section>

          <Suspense
            fallback={<div className="text-muted-foreground">로딩 중...</div>}
          >
            <PomodoroTool />
          </Suspense>
        </main>
      </div>
    </>
  );
}

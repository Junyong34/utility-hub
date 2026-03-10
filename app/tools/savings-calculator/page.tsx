import { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumb, JsonLdMultiple } from '@/components/seo';
import { SavingsCalculatorForm } from '@/components/tools/savings-calculator';
import { ToolSwitcher } from '@/components/tools/ToolSwitcher';
import {
  assertToolStructuredData,
  generateToolMetadata,
  getToolBreadcrumbItems,
  getToolStructuredDataArray,
} from '@/lib/tools';

assertToolStructuredData('savings-calculator');

export const metadata: Metadata = generateToolMetadata('savings-calculator');

export default function SavingsCalculatorPage() {
  const structuredData = getToolStructuredDataArray('savings-calculator');

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumb items={getToolBreadcrumbItems('savings-calculator')} className="mb-4" />
            <ToolSwitcher currentToolId="savings-calculator" />
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <section>
            <h1 className="text-3xl font-bold text-foreground">
              예금·적금 계산기
            </h1>
            <p className="mt-1 text-muted-foreground">
              예금과 적금의 세후 실수령액을 계산해드립니다. 단리/복리, 과세 방식을 선택하여 정확한 이자와 수령액을 확인하세요.
            </p>
          </section>

          <Suspense fallback={<div className="text-muted-foreground">로딩 중...</div>}>
            <SavingsCalculatorForm />
          </Suspense>
        </main>
      </div>
    </>
  );
}

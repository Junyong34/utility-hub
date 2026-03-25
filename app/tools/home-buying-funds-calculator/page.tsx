import { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumb, JsonLdMultiple } from '@/components/seo';
import { HomeBuyingFundsCalculatorForm } from '@/components/tools/home-buying-funds-calculator';
import { ToolSwitcher } from '@/components/tools/ToolSwitcher';
import {
  assertToolStructuredData,
  generateToolMetadata,
  getToolBreadcrumbItems,
  getToolStructuredDataArray,
} from '@/lib/tools';

assertToolStructuredData('home-buying-funds-calculator');

export const metadata: Metadata = generateToolMetadata(
  'home-buying-funds-calculator'
);

export default function HomeBuyingFundsCalculatorPage() {
  const structuredData = getToolStructuredDataArray(
    'home-buying-funds-calculator'
  );

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumb
              items={getToolBreadcrumbItems('home-buying-funds-calculator')}
              className="mb-4"
            />
            <ToolSwitcher currentToolId="home-buying-funds-calculator" />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <section>
            <h1 className="text-3xl font-bold text-foreground">
              주택 매수시 필요한 자금 계산기
            </h1>
            <p className="mt-1 text-muted-foreground">
              집값과 대출로 필요한 자기자본을 계산하고, 취득세·중개보수·등기비용
              등 부대비용을 자동으로 확인하세요.
            </p>
          </section>

          <Suspense
            fallback={<div className="text-muted-foreground">로딩 중...</div>}
          >
            <HomeBuyingFundsCalculatorForm />
          </Suspense>
        </main>
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumb, JsonLdMultiple } from '@/components/seo';
import { HomeBuyingFundsCalculatorForm } from '@/modules/tools/home-buying-funds-calculator/client';
import {
  ToolCatalogProvider,
  ToolSwitcher,
} from '@/modules/tools/catalog/client';
import {
  getToolBreadcrumbItems,
  listToolNavigationItems,
} from '@/modules/tools/catalog/public';
import {
  assertToolStructuredData,
  generateToolMetadata,
  getToolStructuredDataArray,
} from '@/modules/tools/catalog/server';

assertToolStructuredData('home-buying-funds-calculator');
const TOOL_NAVIGATION_ITEMS = listToolNavigationItems();

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
      <ToolCatalogProvider items={TOOL_NAVIGATION_ITEMS}>
        <div className="min-h-screen bg-background pt-10 md:pt-24 xl:pt-32">
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
                주택 구입 비용 계산기
              </h1>
              <p className="mt-1 text-muted-foreground">
                집 살 때 필요한 돈과 아파트 매매 부대비용을 한 번에 계산하고,
                취득세·중개보수·등기비용·국민주택채권까지 자동으로 확인하세요.
              </p>
            </section>

            <Suspense
              fallback={<div className="text-muted-foreground">로딩 중...</div>}
            >
              <HomeBuyingFundsCalculatorForm />
            </Suspense>
          </main>
        </div>
      </ToolCatalogProvider>
    </>
  );
}

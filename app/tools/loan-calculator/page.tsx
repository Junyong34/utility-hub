import { Metadata } from 'next';
import { Suspense } from 'react';
import { Breadcrumb, JsonLdMultiple } from '@/components/seo';
import { LoanCalculatorForm } from '@/components/tools/loan-calculator';
import { ToolSwitcher } from '@/components/tools/ToolSwitcher';
import {
  assertToolStructuredData,
  generateToolMetadata,
  getToolBreadcrumbItems,
  getToolStructuredDataArray,
} from '@/lib/tools';

assertToolStructuredData('loan-calculator');

export const metadata: Metadata = generateToolMetadata('loan-calculator');

export default function LoanCalculatorPage() {
  const structuredData = getToolStructuredDataArray('loan-calculator');

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <div className="min-h-screen bg-background pt-10 md:pt-24 xl:pt-32">
        <header className="bg-card border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumb items={getToolBreadcrumbItems('loan-calculator')} className="mb-4" />
            <ToolSwitcher currentToolId="loan-calculator" />
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <section>
            <h1 className="text-3xl font-bold text-foreground">
              대출 및 중도상환수수료 계산기
            </h1>
            <p className="mt-1 text-muted-foreground">
              대출 금액, 연 이자율, 상환 기간을 입력해 월 상환액과 총 비용을 확인하고, 중도상환 시 수수료를 계산하세요.
            </p>
          </section>

          <Suspense fallback={<div className="text-muted-foreground">로딩 중...</div>}>
            <LoanCalculatorForm />
          </Suspense>
        </main>
      </div>
    </>
  );
}

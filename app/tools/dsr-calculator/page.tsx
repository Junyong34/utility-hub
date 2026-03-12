import { Metadata } from 'next'
import { Suspense } from 'react'
import { Breadcrumb, JsonLdMultiple } from '@/components/seo'
import { DsrCalculatorForm } from '@/components/tools/dsr-calculator'
import { ToolSwitcher } from '@/components/tools/ToolSwitcher'
import {
  assertToolStructuredData,
  generateToolMetadata,
  getToolBreadcrumbItems,
  getToolStructuredDataArray,
} from '@/lib/tools'

assertToolStructuredData('dsr-calculator')

export const metadata: Metadata = generateToolMetadata('dsr-calculator')

export default function DsrCalculatorPage() {
  const structuredData = getToolStructuredDataArray('dsr-calculator')

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            <Breadcrumb items={getToolBreadcrumbItems('dsr-calculator')} className="mb-4" />
            <ToolSwitcher currentToolId="dsr-calculator" />
          </div>
        </header>

        <main className="mx-auto max-w-5xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
          <section>
            <h1 className="text-3xl font-bold text-foreground">DSR 계산기</h1>
            <p className="mt-1 text-muted-foreground">
              연소득, 보유 대출, 신규 대출 조건을 입력해 현재 DSR과 스트레스 DSR, 가능한 신규 대출 한도를 확인하세요.
            </p>
          </section>

          <Suspense fallback={<div className="text-muted-foreground">로딩 중...</div>}>
            <DsrCalculatorForm />
          </Suspense>
        </main>
      </div>
    </>
  )
}

import { Metadata } from 'next';
import { Breadcrumb, JsonLdMultiple } from '@/components/seo';
import { LoanCalculatorForm } from '@/components/tools/LoanCalculatorForm';
import { ToolSwitcher } from '@/components/tools/ToolSwitcher';
import {
  assertToolStructuredData,
  generateToolMetadata,
  getToolBreadcrumbItems,
  getToolConfig,
  getToolStructuredDataArray,
} from '@/lib/tools';

assertToolStructuredData('loan-calculator');

export const metadata: Metadata = generateToolMetadata('loan-calculator');

export default function LoanCalculatorPage() {
  const structuredData = getToolStructuredDataArray('loan-calculator');
  const toolConfig = getToolConfig('loan-calculator');
  const faqItems = toolConfig?.faq ?? [];
  const howToItems = toolConfig?.howTo ?? [];

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumb items={getToolBreadcrumbItems('loan-calculator')} className="mb-4" />
            <ToolSwitcher currentToolId="loan-calculator" />
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <section>
            <h1 className="text-3xl font-bold text-foreground">
              대출 계산기
            </h1>
            <p className="mt-1 text-muted-foreground">
              대출 금액, 연 이자율, 상환 기간을 입력해 월 상환액과 총 비용을 확인하세요.
            </p>
          </section>

          <LoanCalculatorForm />

          {howToItems.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">사용 방법</h2>
              <ol className="space-y-3">
                {howToItems.map((step, index) => (
                  <li key={step.name} className="rounded-lg border p-4 bg-card">
                    <p className="font-medium">
                      {index + 1}. {step.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{step.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {faqItems.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">자주 묻는 질문</h2>
              <div className="space-y-3">
                {faqItems.map((faq) => (
                  <div key={faq.question} className="rounded-lg border p-4">
                    <p className="font-medium">{faq.question}</p>
                    <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                  </div>
                  ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
}

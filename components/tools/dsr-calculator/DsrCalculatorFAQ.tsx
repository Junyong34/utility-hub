'use client'

import {
  Accordion,
  AccordionContent,
  AccordionIndicator,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getToolConfig } from '@/lib/tools/tool-config'

const FAQ_DATA = getToolConfig('dsr-calculator')?.faq ?? []

export function DsrCalculatorFAQ() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">자주 묻는 질문</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          DSR과 스트레스 DSR 계산 전 알아두면 좋은 내용을 정리했습니다.
        </p>
      </div>

      <Accordion type="single" className="w-full space-y-3">
        {FAQ_DATA.map((faq, index) => (
          <AccordionItem
            key={`${faq.question}-${index}`}
            value={`faq-${index + 1}`}
            className="rounded-lg border bg-card px-4 py-3 shadow-sm"
          >
            <AccordionTrigger className="py-2 text-left font-medium hover:no-underline">
              <span className="flex-1 pr-4">{faq.question}</span>
              <AccordionIndicator />
            </AccordionTrigger>
            <AccordionContent className="whitespace-pre-line pt-2 pb-1 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

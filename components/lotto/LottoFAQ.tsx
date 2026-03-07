'use client';

import {
  Accordion,
  AccordionContent,
  AccordionIndicator,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import type { ToolFAQItem } from '@/lib/tools/types';

/**
 * 로또 FAQ 섹션 컴포넌트
 *
 * @description
 * 로또 번호 추천 서비스에 대한 자주 묻는 질문과 답변을 아코디언 형태로 표시합니다.
 * SEO 최적화를 위한 구조화 데이터와 연동됩니다.
 *
 * @remarks
 * - tool-config.ts에서 FAQ 데이터를 받아 표시
 * - 첫 번째 항목이 기본으로 열림
 * - FAQ 항목이 없으면 렌더링하지 않음
 */
interface LottoFAQProps {
  /** FAQ 질문-답변 아이템 배열 */
  items: ToolFAQItem[];
}

/**
 * 로또 FAQ 섹션
 *
 * @param props - 컴포넌트 props
 * @returns FAQ 아코디언 UI
 *
 * @example
 * ```tsx
 * const faqItems = [
 *   { question: "AI 추천이 당첨 확률을 높여주나요?", answer: "..." },
 *   { question: "어떤 방식을 선택해야 하나요?", answer: "..." }
 * ];
 * <LottoFAQ items={faqItems} />
 * ```
 */
export function LottoFAQ({ items }: LottoFAQProps) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="lotto-faq-title" className="space-y-4">
      <h2 id="lotto-faq-title" className="text-2xl font-bold">
        AI 추천 번호 FAQ
      </h2>
      <Card className="p-4 md:p-6">
        <Accordion type="single" defaultValue="faq-0" className="space-y-2">
          {items.map((item, index) => (
            <AccordionItem
              key={`${item.question}-${index}`}
              value={`faq-${index}`}
              className="rounded-lg border px-4 py-3"
            >
              <AccordionTrigger className="text-sm md:text-base font-semibold">
                <span>{item.question}</span>
                <AccordionIndicator />
              </AccordionTrigger>
              <AccordionContent className="pt-3 text-sm text-muted-foreground leading-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </section>
  );
}

'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionIndicator,
} from '@/components/ui/accordion';

const FAQ_DATA = [
  {
    id: 'faq-1',
    question: '원리금균등과 원금균등의 차이는 무엇인가요?',
    answer: `원리금균등 상환은 매월 상환하는 금액(원금+이자)이 동일한 방식입니다. 초기에는 이자 비중이 높고 시간이 지날수록 원금 비중이 높아집니다. 매월 일정한 금액을 납부하므로 자금 계획이 편리합니다.

원금균등 상환은 매월 상환하는 원금은 동일하고, 이자는 점점 줄어드는 방식입니다. 초기 납부 부담이 크지만 시간이 지날수록 납부액이 줄어들며, 총 이자 부담이 원리금균등보다 적습니다.`,
  },
  {
    id: 'faq-2',
    question: '만기일시상환이란 무엇인가요?',
    answer: `만기일시상환은 대출 기간 동안 매월 이자만 납부하고, 만기일에 원금 전액을 일시 상환하는 방식입니다.

매월 납부 금액이 적어 현금 흐름이 편리하지만, 만기에 큰 금액을 상환해야 하므로 자금 계획이 중요합니다. 총 이자 부담은 세 가지 방식 중 가장 큽니다.`,
  },
  {
    id: 'faq-3',
    question: '중도상환수수료는 어떻게 계산되나요?',
    answer: `중도상환수수료는 일반적으로 다음 공식으로 계산됩니다:

수수료 = 상환금액 × 수수료율 × (잔존기간 / 전체기간)

예를 들어, 5년 대출 중 2년이 지난 시점에 3,000만원을 중도 상환하고 수수료율이 1.2%라면:
• 잔존기간: 3년
• 전체기간: 5년
• 수수료: 3,000만원 × 1.2% × (3/5) = 약 21.6만원

단, 면제기간이 설정되어 있다면 해당 기간 이후에는 수수료가 발생하지 않습니다.`,
  },
  {
    id: 'faq-4',
    question: '금리가 0%일 때는 어떻게 계산되나요?',
    answer: `금리가 0%인 경우, 이자가 발생하지 않으므로 계산이 단순해집니다:

월 상환액 = 대출금액 ÷ 총 상환개월
총 상환액 = 대출금액
총 이자 = 0원

예를 들어, 1억원을 5년(60개월) 동안 0% 금리로 대출받으면:
• 월 상환액: 1,666,667원
• 총 상환액: 1억원
• 총 이자: 0원`,
  },
  {
    id: 'faq-5',
    question: '계산 결과에 소수점 오차가 있을 수 있나요?',
    answer: `네, JavaScript는 부동소수점 연산 방식을 사용하기 때문에 미세한 계산 오차가 발생할 수 있습니다.

이 계산기는 금융 계산의 정확성을 위해 다음과 같이 처리합니다:
• 모든 금액은 원 단위로 반올림
• 금리 계산 시 정확한 소수점 변환
• 총액 계산 시 누적 오차 최소화

다만, 실제 금융기관의 계산 방식이나 약관에 따라 결과가 다를 수 있으므로, 본 계산기는 참고용으로 사용하시고 정확한 금액은 금융기관에 문의하시기 바랍니다.`,
  },
  {
    id: 'faq-6',
    question: '입력 가능한 최대 금액은 얼마인가요?',
    answer: `안전한 계산을 위해 다음 제한이 적용됩니다:

• 대출금액: 최대 1조원 (1,000,000,000,000원)
• 금리: 0% ~ 100%
• 대출기간: 최대 50년 (600개월)

이는 JavaScript 숫자 정밀도 한계와 현실적인 금융 상품 범위를 고려한 제한입니다. 일반적인 대출 계산에는 충분한 범위입니다.`,
  },
];

export function LoanCalculatorFAQ() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">자주 묻는 질문</h2>
        <p className="text-sm text-muted-foreground mt-1">
          대출 계산기 사용 시 궁금한 점을 확인해보세요
        </p>
      </div>

      <Accordion type="single" className="w-full space-y-3">
        {FAQ_DATA.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="rounded-lg border bg-card px-4 py-3 shadow-sm"
          >
            <AccordionTrigger className="text-left font-medium hover:no-underline py-2">
              <span className="flex-1 pr-4">{faq.question}</span>
              <AccordionIndicator />
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed pt-2 pb-1">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

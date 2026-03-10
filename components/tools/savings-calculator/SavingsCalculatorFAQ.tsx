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
    question: '예금과 적금의 차이는 무엇인가요?',
    answer: `예금은 한 번에 목돈을 예치하고 만기에 원금과 이자를 받는 상품이고, 적금은 매월 일정 금액을 납입하여 만기에 모은 원금과 이자를 받는 상품입니다.

예금은 여유 자금이 있을 때 적합하며, 적금은 계획적으로 목돈을 모을 때 적합합니다.`,
  },
  {
    id: 'faq-2',
    question: '단리와 복리의 차이는?',
    answer: `단리는 원금에만 이자가 붙는 방식이고, 복리는 원금과 이자에 다시 이자가 붙는 방식입니다.

복리가 장기간일수록 더 높은 수익을 제공합니다. 예를 들어 1,000만원을 연 5% 금리로 10년간 예치하면:
• 단리: 이자 500만원
• 복리: 이자 약 629만원

복리 효과는 기간이 길수록 커집니다.`,
  },
  {
    id: 'faq-3',
    question: '일반과세율은 얼마인가요?',
    answer: `일반과세는 이자소득세 15.4%가 적용됩니다.

세부 내역:
• 소득세: 14%
• 지방소득세: 1.4% (소득세의 10%)

예를 들어 이자가 100만원이면 15.4만원이 세금으로 공제되어 84.6만원을 실제로 수령합니다.`,
  },
  {
    id: 'faq-4',
    question: '세금우대란 무엇인가요?',
    answer: `세금우대는 만 65세 이상, 장애인 등 대상자에게 적용되는 우대 세율로 9.5%가 적용됩니다.

세부 내역:
• 소득세: 9%
• 지방소득세: 0.9% (소득세의 10%)

일반과세 대비 약 6%p의 세제 혜택을 받을 수 있습니다.`,
  },
  {
    id: 'faq-5',
    question: '비과세는 어떤 경우인가요?',
    answer: `비과세는 세금이 전혀 부과되지 않는 상품으로, 비과세 종합저축 등 특정 조건을 만족하는 금융상품에 적용됩니다.

주요 비과세 상품:
• 비과세 종합저축: 생계형 저축 (만 65세 이상 등)
• 세금우대 한도 초과 시에도 일부 비과세 적용 가능

가입 조건과 한도는 금융기관별로 다를 수 있으므로 확인이 필요합니다.`,
  },
  {
    id: 'faq-6',
    question: '이자율이 0%일 때도 계산되나요?',
    answer: `네, 연이자율이 0%인 경우 원금만 돌려받는 것으로 계산됩니다.

일부 무이자 상품 비교에 활용할 수 있습니다. 예를 들어:
• 예금: 원금만 수령
• 적금: 납입한 총 금액만 수령`,
  },
  {
    id: 'faq-7',
    question: '계산 결과를 공유할 수 있나요?',
    answer: `네, "링크 공유" 버튼을 클릭하면 현재 입력한 조건이 포함된 URL이 복사되어 다른 사람과 공유할 수 있습니다.

공유된 링크를 열면 동일한 조건으로 자동으로 계산 결과가 표시됩니다.`,
  },
  {
    id: 'faq-8',
    question: '예금 기간은 어떻게 입력하나요?',
    answer: `년 또는 월 단위를 선택한 후 숫자를 입력하면 됩니다.

년 단위로 입력 시 자동으로 월 단위로 환산됩니다. 예를 들어:
• 2년 = 24개월
• 3년 6개월 = 월 단위에서 42개월로 입력`,
  },
  {
    id: 'faq-9',
    question: '적금의 월 납입액은 어떻게 계산되나요?',
    answer: `매월 입력한 금액을 납입한다고 가정하고, 각 납입금에 대해 개별적으로 이자를 계산한 후 합산합니다.

단리의 경우:
• 첫 달 납입금은 n개월간 이자 발생
• 두 번째 달 납입금은 n-1개월간 이자 발생
• 마지막 달 납입금은 1개월간 이자 발생

복리의 경우 각 납입금에 복리 효과가 적용됩니다.`,
  },
  {
    id: 'faq-10',
    question: '이 계산기는 법적 효력이 있나요?',
    answer: `아니요. 참고용 계산기이며, 실제 금융상품 가입 시 금융기관의 정확한 약관과 조건을 확인해야 합니다.

실제 금융상품은:
• 금융기관별로 계산 방식이 다를 수 있습니다
• 중도 해지 시 별도의 이율이 적용될 수 있습니다
• 우대 금리 조건이 있을 수 있습니다

정확한 조건은 반드시 금융기관에 문의하시기 바랍니다.`,
  },
];

export function SavingsCalculatorFAQ() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">자주 묻는 질문</h2>
        <p className="text-sm text-muted-foreground mt-1">
          예금·적금 계산기 사용 시 궁금한 점을 확인해보세요
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

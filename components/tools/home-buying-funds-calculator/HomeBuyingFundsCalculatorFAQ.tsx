'use client';

import {
  Accordion,
  AccordionContent,
  AccordionIndicator,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

export function HomeBuyingFundsCalculatorFAQ() {
  return (
    <section aria-labelledby="home-buying-faq-title" className="space-y-4">
      <h2 id="home-buying-faq-title" className="text-2xl font-bold">
        자주 묻는 질문
      </h2>
      <Card className="p-4 md:p-6">
        <Accordion type="single" defaultValue="faq-0" className="space-y-2">
          <AccordionItem value="faq-0" className="rounded-lg border px-4 py-3">
            <AccordionTrigger className="text-sm md:text-base font-semibold">
              <span>주택 매수 시 실제로 얼마의 현금이 필요한가요?</span>
              <AccordionIndicator />
            </AccordionTrigger>
            <AccordionContent className="pt-3 text-sm text-muted-foreground leading-6 space-y-2">
              <p>
                주택 매수 시 필요한 현금은 크게 계약금, 잔금, 각종 세금 및 수수료로 구성됩니다.
                일반적으로 매매가의 40~50% 정도의 현금이 필요하며, 대출을 많이 받을수록 필요 현금은 줄어듭니다.
              </p>
              <p>
                본 계산기는 계약금, 취득세, 등록세, 중개보수, 법무사 비용 등 실제 발생하는 모든 비용을 포함하여 계산합니다.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-1" className="rounded-lg border px-4 py-3">
            <AccordionTrigger className="text-sm md:text-base font-semibold">
              <span>취득세는 어떻게 계산되나요?</span>
              <AccordionIndicator />
            </AccordionTrigger>
            <AccordionContent className="pt-3 text-sm text-muted-foreground leading-6 space-y-2">
              <p>
                취득세율은 주택 수, 주택 가격, 전용면적, 조정대상지역 여부 등에 따라 달라집니다.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>1주택자 (비조정지역): 1~3% (누진세율)</li>
                <li>2주택자: 8% (조정지역은 추가 중과)</li>
                <li>3주택 이상: 12% (조정지역은 추가 중과)</li>
                <li>생애최초 주택 구입: 감면 혜택 가능</li>
              </ul>
              <p className="mt-2">
                정확한 세율은 개인의 상황에 따라 다르므로, 실제 납부 전 세무사 상담을 권장합니다.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-2" className="rounded-lg border px-4 py-3">
            <AccordionTrigger className="text-sm md:text-base font-semibold">
              <span>시가표준액은 무엇인가요?</span>
              <AccordionIndicator />
            </AccordionTrigger>
            <AccordionContent className="pt-3 text-sm text-muted-foreground leading-6 space-y-2">
              <p>
                시가표준액은 지방자치단체가 정한 부동산의 기준 가격으로, 등록세와 국민주택채권 계산에 사용됩니다.
              </p>
              <p>
                일반적으로 실제 매매가의 70~90% 수준이며, 국토교통부 실거래가 공개시스템이나 해당 지역 구청에서 확인할 수 있습니다.
              </p>
              <p>
                시가표준액을 정확히 모르는 경우, 매매가의 80% 정도로 입력하시면 대략적인 금액을 확인할 수 있습니다.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-3" className="rounded-lg border px-4 py-3">
            <AccordionTrigger className="text-sm md:text-base font-semibold">
              <span>중개보수는 어떻게 계산되나요?</span>
              <AccordionIndicator />
            </AccordionTrigger>
            <AccordionContent className="pt-3 text-sm text-muted-foreground leading-6 space-y-2">
              <p>
                중개보수는 주택 거래가격에 따라 법정 상한 요율이 정해져 있습니다:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>5천만원 미만: 0.6% 이내</li>
                <li>5천만원 이상 ~ 2억원 미만: 0.5% 이내</li>
                <li>2억원 이상 ~ 6억원 미만: 0.4% 이내</li>
                <li>6억원 이상 ~ 9억원 미만: 0.5% 이내</li>
                <li>9억원 이상: 0.9% 이내</li>
              </ul>
              <p className="mt-2">
                본 계산기는 법정 상한 요율을 기준으로 자동 계산하며, 실제 거래 시 중개사와 협의하여 결정됩니다.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-4" className="rounded-lg border px-4 py-3">
            <AccordionTrigger className="text-sm md:text-base font-semibold">
              <span>예비비는 왜 필요한가요?</span>
              <AccordionIndicator />
            </AccordionTrigger>
            <AccordionContent className="pt-3 text-sm text-muted-foreground leading-6 space-y-2">
              <p>
                주택 매수 과정에서는 예상치 못한 비용이 발생할 수 있습니다:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>추가 세금 (계산 오차)</li>
                <li>긴급 수리 비용</li>
                <li>관리비 정산</li>
                <li>기타 부대 비용</li>
              </ul>
              <p className="mt-2">
                일반적으로 총 비용의 3~10% 정도를 예비비로 준비하는 것이 안전합니다.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-5" className="rounded-lg border px-4 py-3">
            <AccordionTrigger className="text-sm md:text-base font-semibold">
              <span>계산 결과가 정확한가요?</span>
              <AccordionIndicator />
            </AccordionTrigger>
            <AccordionContent className="pt-3 text-sm text-muted-foreground leading-6 space-y-2">
              <p>
                본 계산기는 일반적인 주택 매수 상황을 기준으로 계산하며, 실제 금액과 다를 수 있습니다.
              </p>
              <p>
                특히 취득세, 법무사 비용, 국민주택채권 등은 개인의 상황, 지역, 시기에 따라 달라질 수 있으므로,
                실제 거래 전에는 반드시 전문가(세무사, 법무사)와 상담하시기 바랍니다.
              </p>
              <p className="font-medium">
                본 계산기는 참고용이며, 실제 거래에 대한 법적 책임은 지지 않습니다.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-6" className="rounded-lg border px-4 py-3">
            <AccordionTrigger className="text-sm md:text-base font-semibold">
              <span>생애최초 주택 구입 혜택은 무엇인가요?</span>
              <AccordionIndicator />
            </AccordionTrigger>
            <AccordionContent className="pt-3 text-sm text-muted-foreground leading-6 space-y-2">
              <p>
                생애최초 주택 구입자는 다음과 같은 혜택을 받을 수 있습니다:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>취득세 감면: 최대 200만원 (주택 가격 12억원 이하, 전용면적 85㎡ 이하)</li>
                <li>주택담보대출 금리 우대</li>
                <li>생애최초 특별공급 자격</li>
              </ul>
              <p className="mt-2">
                생애최초 혜택은 소득, 무주택 기간 등 여러 조건을 충족해야 하므로, 자세한 내용은 국세청이나 세무사에게 문의하세요.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </section>
  );
}

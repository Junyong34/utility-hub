import Link from 'next/link';
import { Card } from '@/shared/ui/card';
import { HOME_BUYING_FUNDS_CALCULATOR_MANIFEST } from '../../domain/manifest';

const { faq, howTo } = HOME_BUYING_FUNDS_CALCULATOR_MANIFEST;

export function HomeBuyingFundsGuideSection() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="home-buying-howto-title" className="space-y-4">
        <h2 id="home-buying-howto-title" className="text-2xl font-bold">
          사용 방법
        </h2>
        <Card className="p-4 md:p-6">
          <ol className="list-decimal list-inside space-y-3">
            {howTo.map(step => (
              <li key={step.name} className="text-sm md:text-base">
                <span className="font-semibold">{step.name}</span>
                <p className="mt-1 ml-5 text-sm text-muted-foreground leading-6">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </Card>
      </section>

      <section aria-labelledby="home-buying-faq-title" className="space-y-4">
        <h2 id="home-buying-faq-title" className="text-2xl font-bold">
          자주 묻는 질문
        </h2>
        <Card className="p-4 md:p-6">
          <div className="space-y-2">
            {faq.map((item, index) => (
              <details
                key={item.question}
                open={index === 0}
                className="group rounded-lg border px-4 py-3"
              >
                <summary className="cursor-pointer text-sm md:text-base font-semibold list-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                </summary>
                <p className="pt-3 text-sm text-muted-foreground leading-6">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Card>
      </section>

      <section aria-labelledby="home-buying-guides-title" className="space-y-4">
        <h2 id="home-buying-guides-title" className="text-2xl font-bold">
          함께 보면 좋은 가이드
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
          <li>
            <Link
              href="/blog/investment/first-time-buyer-acquisition-tax-guide"
              className="underline underline-offset-4 hover:text-foreground"
            >
              생애최초 취득세 감면, 조건·한도·신청까지 한 번에 정리
            </Link>
          </li>
          <li>
            <Link
              href="/blog/investment/apartment-purchase-extra-costs-checklist"
              className="underline underline-offset-4 hover:text-foreground"
            >
              아파트 매매 부대비용 총정리: 취득세부터 복비·법무사 비용까지
            </Link>
          </li>
          <li>
            <Link
              href="/blog/investment/national-housing-bond-cost-guide"
              className="underline underline-offset-4 hover:text-foreground"
            >
              국민주택채권 실부담액, 왜 매입액보다 훨씬 적을까?
            </Link>
          </li>
        </ul>
      </section>

      <p className="text-xs text-muted-foreground">
        세법·요율 기준: 취득세·중개보수·국민주택채권 계산은{' '}
        {HOME_BUYING_FUNDS_CALCULATOR_MANIFEST.updatedAt} 확인 기준의 법정
        세율·상한 요율을 따릅니다. 정책 변경 시 실제 금액과 다를 수 있으며, 최종
        계약 전 세무사·법무사 확인이 필요합니다.
      </p>
    </div>
  );
}

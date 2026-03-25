'use client';

import type { HomeBuyingResult, HomeBuyingInput } from '@/lib/tools/home-buying-funds-calculator';
import { FinalCashHeroCard } from '../components/FinalCashHeroCard';
import { CostSummaryCards } from '../components/CostSummaryCards';
import { CostBreakdownTable } from '../components/CostBreakdownTable';
import { SpendingFlowChart } from '../components/SpendingFlowChart';
import { ShareButton } from '../components/ShareButton';
import { LoanBreakdownCard } from '../components/LoanBreakdownCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateDefenseFundAmount } from '@/lib/tools/home-buying-funds-calculator/taxes';

interface HomeBuyingResultSectionProps {
  result: HomeBuyingResult;
  currentCash: number;
  input: HomeBuyingInput;
}

export function HomeBuyingResultSection({ result, currentCash, input }: HomeBuyingResultSectionProps) {
  // 계산된 값들
  const downPayment = Math.floor(input.salePrice * (input.downPaymentRatio / 100));
  const balance = result.breakdown.find(item => item.id === 'balance')?.amount ?? 0;
  const defenseFundAmount = input.manualDefenseFundAmount ?? calculateDefenseFundAmount(input.regionalType);

  // 실제 보유 현금 (계약금 지불 완료 시 계약금 포함)
  const actualCash = input.hasDownPaymentPaid ? currentCash + downPayment : currentCash;

  // 세금, 실비용, 기타 합계
  const totalTaxes = result.breakdown
    .filter(item => item.category === 'public' || item.category === 'loan-registration')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalPracticalCosts = result.breakdown
    .filter(item => item.category === 'practical')
    .reduce((sum, item) => sum + item.amount, 0);

  // 기타 비용 (예비비, 방공제 등)
  const totalOtherCosts = result.breakdown
    .filter(item => item.category === 'other' && item.id !== 'down-payment' && item.id !== 'balance')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-5">
      {/* 공유 버튼 */}
      <div className="flex justify-end">
        <ShareButton />
      </div>

      {/* 최종 보유현금 히어로 카드 */}
      <FinalCashHeroCard result={result} currentCash={actualCash} />

      {/* 3-stat 요약 행 */}
      <CostSummaryCards result={result} />

      {/* 자금 구성 한눈에 보기 */}
      <LoanBreakdownCard
        salePrice={input.salePrice}
        loanAmount={input.loanAmount}
        hasDefenseFund={input.hasDefenseFund}
        defenseFundAmount={defenseFundAmount}
        downPayment={downPayment}
        balance={balance}
        totalTaxes={totalTaxes}
        totalPracticalCosts={totalPracticalCosts}
        totalOtherCosts={totalOtherCosts}
      />

      {/* 상세 탭: 필요한 지출 / 순서 흐름도 */}
      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="breakdown">필요한 지출</TabsTrigger>
          <TabsTrigger value="flow">순서 흐름도</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="mt-4">
          <CostBreakdownTable breakdown={result.breakdown} />
        </TabsContent>

        <TabsContent value="flow" className="mt-4">
          <SpendingFlowChart breakdown={result.breakdown} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

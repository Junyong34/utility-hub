'use client';

import type { HomeBuyingResult } from '@/lib/tools/home-buying-funds-calculator';
import { CostSummaryCards } from '../components/CostSummaryCards';
import { CashGapCard } from '../components/CashGapCard';
import { CostBreakdownTable } from '../components/CostBreakdownTable';
import { SpendingFlowChart } from '../components/SpendingFlowChart';
import { ShareButton } from '../components/ShareButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HomeBuyingResultSectionProps {
  result: HomeBuyingResult;
  currentCash: number;
}

export function HomeBuyingResultSection({ result, currentCash }: HomeBuyingResultSectionProps) {
  return (
    <div className="space-y-6">
      {/* 공유 버튼 */}
      <div className="flex justify-end">
        <ShareButton />
      </div>

      {/* 요약 카드들 */}
      <CostSummaryCards result={result} />

      {/* 현금 부족/여유 */}
      <CashGapCard result={result} currentCash={currentCash} />

      {/* 상세 탭 */}
      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="breakdown">비용 항목별</TabsTrigger>
          <TabsTrigger value="flow">지출 흐름</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="mt-6">
          <CostBreakdownTable breakdown={result.breakdown} />
        </TabsContent>

        <TabsContent value="flow" className="mt-6">
          <SpendingFlowChart breakdown={result.breakdown} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

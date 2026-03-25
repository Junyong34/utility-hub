'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { HomeBuyingResult } from '@/lib/tools/home-buying-funds-calculator';

interface CostSummaryCardsProps {
  result: HomeBuyingResult;
}

export function CostSummaryCards({ result }: CostSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* 총 필요 자기자본 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">총 필요 자기자본</p>
            <p className="text-2xl font-bold">
              {result.totalRequiredEquity.toLocaleString('ko-KR')}원
            </p>
            <p className="text-xs text-muted-foreground">
              대출금 포함 전체 필요 자금
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 최소 필요 현금 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">최소 필요 현금</p>
            <p className="text-2xl font-bold text-primary">
              {result.minRequiredCash.toLocaleString('ko-KR')}원
            </p>
            <p className="text-xs text-muted-foreground">
              대출 제외 실제 필요한 현금
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 권장 필요 현금 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">권장 필요 현금</p>
            <p className="text-2xl font-bold text-blue-600">
              {result.recommendedCash.toLocaleString('ko-KR')}원
            </p>
            <p className="text-xs text-muted-foreground">
              예비비 포함 권장 금액
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 대출 없을 경우 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">대출 없을 경우</p>
            <p className="text-2xl font-bold">
              {result.cashWithoutLoan.toLocaleString('ko-KR')}원
            </p>
            <p className="text-xs text-muted-foreground">
              현금 매수 시 필요 금액
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

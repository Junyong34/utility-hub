'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';
import type { HomeBuyingResult } from '@/lib/tools/home-buying-funds-calculator';

interface CashGapCardProps {
  result: HomeBuyingResult;
  currentCash: number;
}

export function CashGapCard({ result, currentCash }: CashGapCardProps) {
  const isShortage = result.cashGap < 0;
  const isSufficient = result.cashGap >= 0;

  return (
    <Card className={isShortage ? 'border-destructive' : 'border-green-500'}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isShortage ? (
            <>
              <AlertCircle className="h-5 w-5 text-destructive" />
              현금 부족
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5 text-green-600" />
              현금 여유 충분
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-muted-foreground">보유 현금</span>
            <span className="text-lg font-semibold">
              {currentCash.toLocaleString('ko-KR')}원
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-muted-foreground">필요 현금</span>
            <span className="text-lg font-semibold">
              {result.minRequiredCash.toLocaleString('ko-KR')}원
            </span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between items-baseline">
              <span className="text-base font-medium">
                {isShortage ? '부족액' : '여유자금'}
              </span>
              <span className={`text-2xl font-bold ${isShortage ? 'text-destructive' : 'text-green-600'}`}>
                {Math.abs(result.cashGap).toLocaleString('ko-KR')}원
              </span>
            </div>
          </div>
        </div>

        {isShortage && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm">
            <p className="font-medium text-destructive">현금이 부족합니다</p>
            <p className="mt-1 text-muted-foreground">
              추가 자금 마련이나 대출 금액 증액을 고려하세요.
            </p>
          </div>
        )}

        {isSufficient && (
          <div className="rounded-lg bg-green-50 p-3 text-sm">
            <p className="font-medium text-green-800">현금이 충분합니다</p>
            <p className="mt-1 text-green-700">
              여유자금은 예비비나 추가 비용에 사용할 수 있습니다.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

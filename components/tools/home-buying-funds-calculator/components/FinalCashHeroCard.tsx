'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import type { HomeBuyingResult } from '@/lib/tools/home-buying-funds-calculator';
import NumberTicker from '@/components/magicui/number-ticker';

interface FinalCashHeroCardProps {
  result: HomeBuyingResult;
  currentCash: number;
}

export function FinalCashHeroCard({ result, currentCash }: FinalCashHeroCardProps) {
  const isSufficient = result.cashGap >= 0;
  const progressPercent = result.minRequiredCash > 0
    ? Math.min((currentCash / result.minRequiredCash) * 100, 100)
    : 100;

  return (
    <Card
      className={
        isSufficient
          ? 'border-green-500 overflow-hidden'
          : 'border-destructive overflow-hidden'
      }
    >
      {/* 상단 상태 스트라이프 */}
      <div
        className={`h-1 w-full ${isSufficient ? 'bg-green-500' : 'bg-destructive'}`}
      />

      <CardContent className="pt-5 pb-6 px-5 space-y-5">
        {/* 헤더: 라벨 + 배지 */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            최종 보유현금
          </p>
          <Badge
            className={
              isSufficient
                ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30 gap-1'
                : 'bg-destructive/10 text-destructive border-destructive/30 gap-1'
            }
            variant="outline"
          >
            {isSufficient ? (
              <>
                <CheckCircle className="h-3 w-3" />
                충분
              </>
            ) : (
              <>
                <AlertCircle className="h-3 w-3" />
                부족
              </>
            )}
          </Badge>
        </div>

        {/* 금액 + 트렌드 아이콘 */}
        <div className="flex items-end gap-3">
          <p
            className={`text-4xl font-bold tracking-tight ${
              isSufficient ? 'text-green-600 dark:text-green-400' : 'text-destructive'
            }`}
          >
            {isSufficient ? '+' : '-'}
            <NumberTicker
              value={Math.abs(result.cashGap)}
              className={`text-4xl font-bold tracking-tight ${
                isSufficient ? 'text-green-600 dark:text-green-400' : 'text-destructive'
              }`}
            />
            <span className="ml-1 text-xl font-semibold">원</span>
          </p>
          {isSufficient ? (
            <TrendingUp className="h-6 w-6 text-green-500 mb-1 shrink-0" />
          ) : (
            <TrendingDown className="h-6 w-6 text-destructive mb-1 shrink-0" />
          )}
        </div>

        {/* 프로그레스 바 영역 */}
        <div className="space-y-2">
          {/* 라벨 행 */}
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              보유현금{' '}
              <span className="font-semibold text-foreground">
                <NumberTicker value={currentCash} className="font-semibold text-foreground" />원
              </span>
            </span>
            <span>
              필요현금{' '}
              <span className="font-semibold text-foreground">
                <NumberTicker value={result.minRequiredCash} className="font-semibold text-foreground" />원
              </span>
            </span>
          </div>

          {/* 프로그레스 바 */}
          <div className="relative h-2.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isSufficient ? 'bg-green-500' : 'bg-destructive'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 여유/부족 요약 */}
          <p
            className={`text-xs text-right font-medium ${
              isSufficient ? 'text-green-600 dark:text-green-400' : 'text-destructive'
            }`}
          >
            {isSufficient ? (
              <>
                여유자금 +
                <NumberTicker
                  value={result.cashGap}
                  className={`font-medium ${
                    isSufficient ? 'text-green-600 dark:text-green-400' : 'text-destructive'
                  }`}
                />
                원
              </>
            ) : (
              <>
                부족액 -
                <NumberTicker
                  value={Math.abs(result.cashGap)}
                  className={`font-medium ${
                    isSufficient ? 'text-green-600 dark:text-green-400' : 'text-destructive'
                  }`}
                />
                원 · 추가 자금 마련이나 대출 증액을 고려하세요
              </>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

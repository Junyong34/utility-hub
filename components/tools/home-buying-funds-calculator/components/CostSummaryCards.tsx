'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { HomeBuyingResult } from '@/lib/tools/home-buying-funds-calculator';
import NumberTicker from '@/components/magicui/number-ticker';

interface CostSummaryCardsProps {
  result: HomeBuyingResult;
}

interface StatItem {
  label: string;
  subLabel: string;
  value: number;
  accentClass: string;
  valueClass: string;
}

export function CostSummaryCards({ result }: CostSummaryCardsProps) {
  const stats: StatItem[] = [
    {
      label: '최소 필요현금',
      subLabel: '대출 제외 실제 필요한 현금',
      value: result.minRequiredCash,
      accentClass: 'bg-primary',
      valueClass: 'text-primary',
    },
    {
      label: '권장 필요현금',
      subLabel: '예비비 포함 권장 금액',
      value: result.recommendedCash,
      accentClass: 'bg-blue-400',
      valueClass: 'text-blue-500 dark:text-blue-400',
    },
    {
      label: '총 필요자기자본',
      subLabel: '대출금 포함 전체 필요 자금',
      value: result.totalRequiredEquity,
      accentClass: 'bg-muted-foreground/40',
      valueClass: 'text-foreground',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(stat => (
        <Card key={stat.label} className="overflow-hidden">
          {/* 상단 컬러 액센트 라인 */}
          <div className={`h-0.5 w-full ${stat.accentClass}`} />
          <CardContent className="pt-4 pb-4 px-3 space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground leading-tight">
              {stat.label}
            </p>
            <p className={`text-lg font-bold leading-tight ${stat.valueClass}`}>
              <NumberTicker
                value={stat.value}
                className={`text-lg font-bold ${stat.valueClass}`}
              />
              <span className="text-xs font-semibold ml-0.5">원</span>
            </p>
            <p className="text-[11px] text-muted-foreground leading-tight">
              {stat.subLabel}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

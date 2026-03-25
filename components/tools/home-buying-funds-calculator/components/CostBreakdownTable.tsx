'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CostBreakdownItem } from '@/lib/tools/home-buying-funds-calculator';
import { STAGE_LABELS, CATEGORY_LABELS } from '../constants';
import { NationalHousingBondInfoDialog } from './NationalHousingBondInfoDialog';

interface CostBreakdownTableProps {
  breakdown: CostBreakdownItem[];
}

export function CostBreakdownTable({ breakdown }: CostBreakdownTableProps) {
  // 단계별로 그룹화
  const groupedByStage = breakdown.reduce(
    (acc, item) => {
      if (!acc[item.stage]) {
        acc[item.stage] = [];
      }
      acc[item.stage].push(item);
      return acc;
    },
    {} as Record<string, CostBreakdownItem[]>
  );

  const getConfidenceBadge = (confidence: 'high' | 'medium' | 'low') => {
    const variants = {
      high: 'default',
      medium: 'secondary',
      low: 'outline',
    } as const;

    const labels = {
      high: '높음',
      medium: '중간',
      low: '낮음',
    };

    return (
      <Badge variant={variants[confidence]} className="text-xs">
        {labels[confidence]}
      </Badge>
    );
  };

  const shouldShowNationalHousingBondInfo = (item: CostBreakdownItem): boolean =>
    item.id === 'national-housing-bond';

  return (
    <Card>
      <CardHeader>
        <CardTitle>비용 항목별 상세</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedByStage).map(([stage, items]) => (
            <div key={stage} className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground">
                {STAGE_LABELS[stage as keyof typeof STAGE_LABELS]}
              </h3>
              <div className="space-y-2">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.label}</span>
                          {shouldShowNationalHousingBondInfo(item) && (
                            <NationalHousingBondInfoDialog />
                          )}
                          {item.calculationMode === 'manual' && (
                            <Badge variant="outline" className="text-xs">
                              직접입력
                            </Badge>
                          )}
                        </div>
                        {item.note && (
                          <p className="text-xs text-muted-foreground mt-1">{item.note}</p>
                        )}
                        {item.formula && (
                          <p className="text-xs text-muted-foreground mt-1">
                            계산식: {item.formula}
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-semibold">
                          {item.amount.toLocaleString('ko-KR')}원
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {CATEGORY_LABELS[item.category]}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      {getConfidenceBadge(item.confidence)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 총계 */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-baseline">
            <span className="text-lg font-bold">총 비용</span>
            <span className="text-2xl font-bold text-primary">
              {breakdown.reduce((sum, item) => sum + item.amount, 0).toLocaleString('ko-KR')}원
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

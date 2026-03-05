'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getToolConfig } from '@/lib/tools';

const lottoTool = getToolConfig('lotto');
const headerTitle = lottoTool?.name ?? 'AI 추천 번호 생성';
const headerDescription = lottoTool?.description ?? 'AI와 확률통계 알고리즘으로 최적의 번호를 추천받아보세요.';
const badgeText = lottoTool?.badge ?? '추천';

export function LottoRecommendHeader() {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">{headerTitle}</h2>
          <p className="text-sm text-muted-foreground">
            {headerDescription}
          </p>
        </div>
        <Badge variant="secondary">{badgeText}</Badge>
      </div>
    </Card>
  );
}

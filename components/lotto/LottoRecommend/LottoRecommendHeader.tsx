'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function LottoRecommendHeader() {
  // 모드/기능 진입부 제목 + 한 줄 소개를 출력하는 정적 헤더 영역입니다.
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">AI 추천 번호 생성</h2>
          <p className="text-sm text-muted-foreground">
            AI와 확률통계 알고리즘으로 최적의 번호를 추천받아보세요.
          </p>
        </div>
        <Badge variant="secondary">행운</Badge>
      </div>
    </Card>
  );
}

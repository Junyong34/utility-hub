'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function LottoRecommendHeader() {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">로또 번호 추천</h2>
          <p className="text-sm text-muted-foreground">
            추천 방식과 게임 수를 선택하면 즉시 번호를 생성할 수 있습니다.
          </p>
        </div>
        <Badge variant="secondary">행운</Badge>
      </div>
    </Card>
  );
}

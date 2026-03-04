'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLottoRecommend } from './LottoRecommendProvider';

export function LottoRecommendControls({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    state: { isGenerating },
    actions: { generate },
  } = useLottoRecommend();

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {children}
        <Button
          type="button"
          onClick={generate}
          disabled={isGenerating}
          aria-busy={isGenerating}
          aria-describedby="lotto-generate-status"
          className="w-full h-14 text-lg"
          size="lg"
        >
          {isGenerating ? '생성 중...' : '🎲 번호 생성하기'}
        </Button>
        <p
          id="lotto-generate-status"
          className="text-sm text-muted-foreground text-center"
          aria-live="polite"
        >
          1~45 사이의 중복되지 않는 6개 숫자가 생성됩니다
        </p>
      </div>
    </Card>
  );
}

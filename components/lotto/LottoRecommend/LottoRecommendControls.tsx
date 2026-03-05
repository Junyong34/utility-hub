'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useLottoRecommend } from './LottoRecommendProvider';
import { Sparkles, Loader2 } from 'lucide-react';

export function LottoRecommendControls({
  children,
}: {
  children: React.ReactNode;
}) {
  // generate 액션은 내부 provider에서 분석 단계/타이머/쿼리 동기화까지 한 번에 처리합니다.
  const {
    state: { isGenerating, analysisStage, analysisProgress },
    actions: { generate },
  } = useLottoRecommend();

  return (
    <Card className="p-6">
      <div className="space-y-5">
        {children}
        <div className="space-y-3 pt-2">
          <Button
            type="button"
            onClick={generate}
            disabled={isGenerating}
            aria-busy={isGenerating}
            aria-describedby="lotto-generate-status"
            className={cn(
              'w-full h-16 text-lg font-bold transition-all duration-300',
              'bg-gradient-to-r from-primary via-primary to-primary/80',
              'hover:from-primary/90 hover:via-primary hover:to-primary',
              'shadow-lg hover:shadow-xl',
              'hover:scale-[1.02] active:scale-[0.98]',
              isGenerating && 'animate-pulse cursor-not-allowed'
            )}
            size="lg"
          >
            {isGenerating ? (
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>분석 중... {Math.min(100, Math.max(0, Math.round(analysisProgress)))}%</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>번호 생성하기</span>
              </div>
            )}
          </Button>
        <p
          id="lotto-generate-status"
          className="text-sm text-muted-foreground text-center px-2"
          aria-live="polite"
        >
            {isGenerating
              ? analysisStage
              : '1~45 사이의 중복되지 않는 6개 숫자가 생성됩니다'}
          </p>
        </div>
      </div>
    </Card>
  );
}

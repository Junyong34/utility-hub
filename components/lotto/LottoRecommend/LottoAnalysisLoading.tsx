'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface LottoAnalysisLoadingProps {
  stages: readonly string[];
  currentStage: string;
  currentStepIndex: number;
  progress: number;
}

export function LottoAnalysisLoading({
  stages,
  currentStage,
  currentStepIndex,
  progress,
}: LottoAnalysisLoadingProps) {
  // 진행률을 0~100 범위로 강제하여 스타일/표시 계산을 안정화합니다.
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <Card className="p-5 space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-bold">번호 분석 중</h3>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {currentStage}
        </p>
      </div>

      <div className="space-y-2" aria-hidden>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-[width] duration-300"
            style={{ width: `${clampedProgress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-right">{clampedProgress}%</p>
      </div>

      <div className="space-y-2" aria-label="분석 단계 목록">
        {stages.map((stage, index) => {
          const isActive = index === currentStepIndex;
          const isDone = index < currentStepIndex;

          return (
            <div
              key={stage}
              className={cn(
                'rounded-md border px-3 py-2 text-sm transition-colors',
                isActive && 'border-primary/60 bg-primary/10 text-foreground',
                isDone && 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
                !isActive && !isDone && 'text-muted-foreground'
              )}
            >
              {stage}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

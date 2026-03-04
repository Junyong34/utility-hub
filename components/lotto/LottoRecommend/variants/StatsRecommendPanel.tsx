'use client';

import { Button } from '@/components/ui/button';
import { getRecentStats } from '@/lib/lotto/generator';
import { useLottoRecommend, LOTTO_STATS_STRATEGIES } from '../LottoRecommendProvider';

const STRATEGY_LABELS = {
  hot: 'Hot',
  cold: 'Cold',
  mix: 'Mix',
} as const;

export function StatsRecommendPanel() {
  const {
    state: { statsStrategy, isGenerating },
    actions: { setStatsStrategy },
  } = useLottoRecommend();
  const stats = getRecentStats();

  return (
    <div className="rounded-lg border bg-muted/20 p-4 space-y-3">
      <div>
        <p className="text-sm font-semibold">통계 기반 추천</p>
        <p className="text-xs text-muted-foreground mt-1">
          최근 통계 데이터를 기반으로 번호를 가중 추천합니다.
        </p>
      </div>

      <fieldset>
        <legend className="sr-only">통계 추천 전략</legend>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="통계 추천 전략">
          {LOTTO_STATS_STRATEGIES.map((strategy) => (
            <Button
              type="button"
              key={strategy}
              size="sm"
              variant={statsStrategy === strategy ? 'default' : 'outline'}
              disabled={isGenerating}
              aria-pressed={statsStrategy === strategy}
              aria-label={`${STRATEGY_LABELS[strategy]} 전략 선택`}
              onClick={() => setStatsStrategy(strategy)}
            >
              {STRATEGY_LABELS[strategy]}
            </Button>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
        <p>Hot: {stats.hotNumbers.join(', ')}</p>
        <p>Cold: {stats.coldNumbers.join(', ')}</p>
      </div>
    </div>
  );
}

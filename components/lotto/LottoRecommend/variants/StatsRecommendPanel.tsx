'use client';

import {
  getRecentStats,
  getStatsStrategyDescription,
  type LottoStatsStrategy,
} from '@/lib/lotto/generator';
import { Button } from '@/components/ui/button';
import {
  useLottoRecommend,
  LOTTO_STATS_STRATEGIES,
} from '../LottoRecommendProvider';

const STRATEGY_LABELS: Record<LottoStatsStrategy, string> = {
  ai: 'AI 추천',
  'high-frequency': '고빈도',
  'low-frequency': '저빈도',
  undrawn: '미출현',
  balanced: '균형',
  hot: '핫넘버',
  cold: '콜드넘버',
};

// AI + 5개 확률통계 전략을 나누어 렌더링하기 위해
// 전체 목록에서 AI를 제외한 전략 목록을 미리 계산해 둡니다.
const PROBABILITY_STRATEGIES: LottoStatsStrategy[] =
  LOTTO_STATS_STRATEGIES.filter(
    (strategy): strategy is Exclude<LottoStatsStrategy, 'ai'> =>
      strategy !== 'ai'
  );

export function StatsRecommendPanel() {
  // 선택한 전략의 레이블·설명을 즉시 표기하고, 최근 통계 지표를 참고 텍스트로 노출합니다.
  const {
    state: { statsStrategy, isGenerating },
    actions: { setStatsStrategy },
  } = useLottoRecommend();
  const stats = getRecentStats();

  return (
    <div className="rounded-lg border bg-muted/20 p-4 space-y-4">
      <div>
        <p className="text-sm font-semibold">통계 기반 추천</p>
        <p className="text-xs text-muted-foreground mt-1">
          AI가 추천 또는 확률통계 6전략 중 원하는 방식으로 번호를 생성합니다.
        </p>
      </div>

      <fieldset className="space-y-2">
        <legend className="sr-only">통계 추천 전략</legend>

        <Button
          type="button"
          size="sm"
          className="w-full"
          variant={statsStrategy === 'ai' ? 'default' : 'outline'}
          disabled={isGenerating}
          aria-pressed={statsStrategy === 'ai'}
          aria-label="AI가 추천 전략 선택"
          title={getStatsStrategyDescription('ai')}
          onClick={() => setStatsStrategy('ai')}
        >
          {STRATEGY_LABELS.ai}
        </Button>

        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-2"
          role="radiogroup"
          aria-label="확률통계 추천 전략"
        >
          {PROBABILITY_STRATEGIES.map(strategy => (
            <Button
              type="button"
              key={strategy}
              size="sm"
              variant={statsStrategy === strategy ? 'default' : 'outline'}
              disabled={isGenerating}
              aria-pressed={statsStrategy === strategy}
              aria-label={`${STRATEGY_LABELS[strategy]} 전략 선택`}
              title={getStatsStrategyDescription(strategy)}
              onClick={() => setStatsStrategy(strategy)}
            >
              {STRATEGY_LABELS[strategy]}
            </Button>
          ))}
        </div>
      </fieldset>

      <p className="text-xs text-muted-foreground">
        선택 전략: {STRATEGY_LABELS[statsStrategy]} -{' '}
        {getStatsStrategyDescription(statsStrategy)}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
        <p>최근 핫번호: {stats.hotNumbers.join(', ')}</p>
        <p>최근 콜드번호: {stats.coldNumbers.join(', ')}</p>
      </div>
    </div>
  );
}

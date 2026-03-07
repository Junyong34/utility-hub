'use client';

import { Button } from '@/components/ui/button';
import {
  LOTTO_RECOMMEND_COUNT_OPTIONS,
} from '@/lib/lotto/types';
import { useLottoRecommend } from './LottoRecommendProvider';
import { cn } from '@/lib/utils';

export function LottoCountSelector() {
  // 추천 개수는 쿼리 상태로 공유되므로, URL 초기값 유지/복원과 동일하게 동작합니다.
  const {
    state: { count, isGenerating },
    actions: { setCount },
  } = useLottoRecommend();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">추천 개수 선택</h2>
      <div className="flex gap-2" role="radiogroup" aria-label="추천 개수">
        {LOTTO_RECOMMEND_COUNT_OPTIONS.map((option) => (
          <Button
            type="button"
            key={option}
            variant={count === option ? 'default' : 'outline'}
            className={cn(
              'flex-1 h-12 text-base font-semibold transition-all duration-200',
              'hover:scale-105 hover:shadow-md',
              count === option &&
                'bg-gradient-to-r from-primary via-primary to-primary/80 shadow-lg scale-105'
            )}
            disabled={isGenerating}
            aria-pressed={count === option}
            aria-label={`${option}개 추천`}
            onClick={() => setCount(option)}
          >
            <span className="flex items-center gap-1.5">
              <span className="text-xl font-bold">{option}</span>
              <span className="text-sm">개</span>
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}

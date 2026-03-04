'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  LOTTO_RECOMMEND_COUNT_OPTIONS,
} from '@/lib/lotto/recommendation-spec';
import { useLottoRecommend } from './LottoRecommendProvider';

export function LottoCountSelector() {
  const {
    state: { count, isGenerating },
    actions: { setCount },
  } = useLottoRecommend();

  return (
    <Card className="p-4">
      <fieldset>
        <legend className="text-sm font-semibold mb-3">추천 개수 선택</legend>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="추천 개수">
          {LOTTO_RECOMMEND_COUNT_OPTIONS.map((option) => (
            <Button
              type="button"
              key={option}
              variant={count === option ? 'default' : 'outline'}
              size="sm"
              disabled={isGenerating}
              aria-pressed={count === option}
              aria-label={`${option}개 추천`}
              onClick={() => setCount(option)}
            >
              {option}개
            </Button>
          ))}
        </div>
      </fieldset>
    </Card>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  LOTTO_RECOMMEND_MODES,
  LottoRecommendMode,
} from '@/lib/lotto/recommendation-spec';
import { useLottoRecommend } from './LottoRecommendProvider';

const MODE_LABELS: Record<LottoRecommendMode, string> = {
  random: '랜덤 추천',
  stats: '통계 추천',
  date: '날짜 추천',
  mbti: 'MBTI 추천',
  lucky: '행운 번호',
  slot: '슬롯 머신',
};

export function LottoModeSwitcher() {
  const {
    state: { mode, isGenerating },
    actions: { setMode },
  } = useLottoRecommend();

  return (
    <Card className="p-4">
      <fieldset>
        <legend className="text-sm font-semibold mb-3">추천 방식 선택</legend>
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-2"
          role="radiogroup"
          aria-label="로또 추천 방식"
        >
          {LOTTO_RECOMMEND_MODES.map((option) => (
            <Button
              type="button"
              key={option}
              variant={mode === option ? 'default' : 'outline'}
              size="sm"
              disabled={isGenerating}
              aria-pressed={mode === option}
              aria-label={`${MODE_LABELS[option]} 선택`}
              onClick={() => setMode(option)}
            >
              {MODE_LABELS[option]}
            </Button>
          ))}
        </div>
      </fieldset>
    </Card>
  );
}

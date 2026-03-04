'use client';

import { useLottoRecommend } from './LottoRecommendProvider';
import { DateRecommendPanel } from './variants/DateRecommendPanel';
import { LuckyNumberRecommendPanel } from './variants/LuckyNumberRecommendPanel';
import { MbtiRecommendPanel } from './variants/MbtiRecommendPanel';
import { RandomRecommendPanel } from './variants/RandomRecommendPanel';
import { SlotRecommendPanel } from './variants/SlotRecommendPanel';
import { StatsRecommendPanel } from './variants/StatsRecommendPanel';

export function LottoRecommendVariantPanel() {
  const {
    state: { mode },
  } = useLottoRecommend();

  switch (mode) {
    case 'stats':
      return <StatsRecommendPanel />;
    case 'date':
      return <DateRecommendPanel />;
    case 'mbti':
      return <MbtiRecommendPanel />;
    case 'lucky':
      return <LuckyNumberRecommendPanel />;
    case 'slot':
      return <SlotRecommendPanel />;
    case 'random':
    default:
      return <RandomRecommendPanel />;
  }
}


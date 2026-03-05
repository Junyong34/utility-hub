'use client';

import { useLottoRecommend } from './LottoRecommendProvider';
import { DateRecommendPanel } from './variants/DateRecommendPanel';
import { LuckyNumberRecommendPanel } from './variants/LuckyNumberRecommendPanel';
import { MbtiRecommendPanel } from './variants/MbtiRecommendPanel';
import { RandomRecommendPanel } from './variants/RandomRecommendPanel';
import { SlotRecommendPanel } from './variants/SlotRecommendPanel';
import { StatsRecommendPanel } from './variants/StatsRecommendPanel';

export function LottoRecommendVariantPanel() {
  // 현재 선택한 추천 모드에 따라 입력 컴포넌트를 즉시 분기 렌더링합니다.
  // 공통 레이아웃은 변하지 않고, 패널만 교체되는 구조입니다.
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

'use client';

import { LottoRecommend } from './LottoRecommend';

/**
 * AI 로또 번호 추천 메인 컴포넌트 (클라이언트 컴포넌트)
 *
 * Provider와 Compound Component를 조합해
 * "UI 조합 -> 상태/액션 제공 -> 결과 표시" 흐름을 한 곳에서 구성합니다.
 */
export function LottoGenerator() {
  return (
    <LottoRecommend.Provider>
      <LottoRecommend.Root>
        <LottoRecommend.Header />
        <LottoRecommend.Controls>
          <LottoRecommend.CountSelector />
          <LottoRecommend.ModeSwitcher />
          <LottoRecommend.VariantPanel />
        </LottoRecommend.Controls>
        <LottoRecommend.ResultSheet />
        <LottoRecommend.WeeklyRecommendation />
      </LottoRecommend.Root>
    </LottoRecommend.Provider>
  );
}

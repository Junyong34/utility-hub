'use client';

import { LottoRecommend } from './LottoRecommend';

/**
 * 로또 번호 생성기 메인 컴포넌트 (클라이언트 컴포넌트)
 */
export function LottoGenerator() {
  return (
    <LottoRecommend.Provider>
      <LottoRecommend.Root>
        <LottoRecommend.Header />
        <LottoRecommend.Controls>
          <LottoRecommend.ModeSwitcher />
          <LottoRecommend.CountSelector />
          <LottoRecommend.VariantPanel />
        </LottoRecommend.Controls>
        <LottoRecommend.Actions />
        <LottoRecommend.Results />
        <LottoRecommend.WeeklyRecommendation />
        <LottoRecommend.History />
        <LottoRecommend.EmptyState />
      </LottoRecommend.Root>
    </LottoRecommend.Provider>
  );
}

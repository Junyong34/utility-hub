'use client';

import { useLottoRecommend } from './LottoRecommendProvider';
import { LottoResults } from '../LottoResults';

export function LottoRecommendResults() {
  const {
    state: { currentGames },
    actions: { copyNumbers, copyShareUrl },
  } = useLottoRecommend();

  if (currentGames.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">생성된 번호</h3>
      <LottoResults
        games={currentGames}
        onCopyNumbers={copyNumbers}
        onCopyShareLink={copyShareUrl}
      />
    </div>
  );
}


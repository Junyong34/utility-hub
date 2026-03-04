'use client';

import { Button } from '@/components/ui/button';
import { useLottoRecommend } from './LottoRecommendProvider';
import { LottoHistory } from '../LottoHistory';

export function LottoRecommendHistory() {
  const {
    state: { history },
    actions: { clearHistory, removeHistory },
  } = useLottoRecommend();

  if (history.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">저장된 기록</h3>
        <Button type="button" variant="outline" onClick={clearHistory} size="sm">
          전체 삭제
        </Button>
      </div>
      <LottoHistory history={history} onRemove={removeHistory} />
    </div>
  );
}

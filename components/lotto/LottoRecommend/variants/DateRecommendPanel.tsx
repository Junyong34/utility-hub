'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLottoRecommend } from '../LottoRecommendProvider';

export function DateRecommendPanel() {
  // 날짜 문자열은 mode가 date일 때 난수 seed로 사용되어 같은 날짜면 같은 결과를 보장합니다.
  const {
    state: { recommendDate, isGenerating },
    actions: { setRecommendDate },
  } = useLottoRecommend();

  return (
    <div className="rounded-lg border bg-muted/20 p-4 space-y-2">
      <p className="text-sm font-semibold">오늘 날짜 기반 추천</p>
      <p className="text-xs text-muted-foreground">
        선택한 날짜를 시드로 사용하여 항상 같은 번호를 생성합니다.
      </p>
      <Label htmlFor="lotto-recommend-date">추천 기준 날짜</Label>
      <Input
        id="lotto-recommend-date"
        type="date"
        value={recommendDate}
        disabled={isGenerating}
        onChange={(event) => setRecommendDate(event.target.value)}
      />
    </div>
  );
}

'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLottoRecommend } from '../LottoRecommendProvider';

export function LuckyNumberRecommendPanel() {
  // 행운 번호는 입력값이 1~45 범위로 정규화되어 생성 로직에 반영됩니다.
  const {
    state: { luckyNumber, isGenerating },
    actions: { setLuckyNumber },
  } = useLottoRecommend();

  return (
    <div className="rounded-lg border bg-muted/20 p-4 space-y-2">
      <p className="text-sm font-semibold">행운 번호 추천</p>
      <p className="text-xs text-muted-foreground">
        입력한 숫자(1~45)를 모든 게임에 포함합니다.
      </p>
      <Label htmlFor="lotto-lucky-number">행운 번호 입력 (1~45)</Label>
      <Input
        id="lotto-lucky-number"
        type="number"
        min={1}
        max={45}
        value={luckyNumber}
        disabled={isGenerating}
        onChange={(event) => setLuckyNumber(Number(event.target.value))}
      />
    </div>
  );
}

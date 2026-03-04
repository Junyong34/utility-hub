'use client';

import { LOTTO_MBTI_OPTIONS } from '@/lib/lotto/recommendation-spec';
import { Label } from '@/components/ui/label';
import { useLottoRecommend } from '../LottoRecommendProvider';

export function MbtiRecommendPanel() {
  const {
    state: { mbti, isGenerating },
    actions: { setMbti },
  } = useLottoRecommend();

  return (
    <div className="rounded-lg border bg-muted/20 p-4 space-y-2">
      <p className="text-sm font-semibold">MBTI 로또 추천</p>
      <p className="text-xs text-muted-foreground">
        선택한 MBTI와 오늘 날짜를 조합해 하루 단위로 번호를 생성합니다.
      </p>
      <Label htmlFor="lotto-recommend-mbti">MBTI 선택</Label>
      <select
        id="lotto-recommend-mbti"
        value={mbti}
        disabled={isGenerating}
        onChange={(event) =>
          setMbti(event.target.value as (typeof LOTTO_MBTI_OPTIONS)[number])
        }
        className="h-9 w-full rounded-lg border bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {LOTTO_MBTI_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

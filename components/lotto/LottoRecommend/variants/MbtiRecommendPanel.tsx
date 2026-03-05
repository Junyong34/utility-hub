'use client';

import { LOTTO_MBTI_OPTIONS } from '@/lib/lotto/recommendation-spec';
import { Label } from '@/components/ui/label';
import { MBTI_LOTTO_PROFILES } from '@/lib/lotto/mbti-profile';
import { useLottoRecommend } from '../LottoRecommendProvider';

export function MbtiRecommendPanel() {
  // MBTI 선택값은 매일 날짜 seed와 결합되어 날짜별 슬롯 추천처럼 재생성됩니다.
  const {
    state: { mbti, isGenerating },
    actions: { setMbti },
  } = useLottoRecommend();
  const profile = MBTI_LOTTO_PROFILES[mbti];

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

      <div className="rounded-lg border bg-background px-3 py-3 space-y-2">
        <p className="text-sm font-semibold">{mbti} · {profile.title}</p>
        <p className="text-xs text-muted-foreground leading-5">{profile.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          {profile.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              #{keyword}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">
          재미 요소를 위한 설명이며, 당첨 확률을 보장하지 않습니다.
        </p>
      </div>
    </div>
  );
}

'use client';

import { LottoNumberCloud } from '@/components/lotto/LottoRecommend/LottoNumberCloud';
import { Card } from '@/shared/ui/card';
import { LOTTO_MANIFEST } from '@/modules/tools/lotto/public';

const headerTitle = LOTTO_MANIFEST.name;
const headerDescription = LOTTO_MANIFEST.description;

export function LottoRecommendHeader() {
  return (
    <Card className="overflow-hidden border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6">
      <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="mb-2 text-2xl font-bold">{headerTitle}</h2>
              <p className="text-sm text-muted-foreground">
                {headerDescription}
              </p>
            </div>
            {/*<Badge variant="secondary" className="shrink-0">*/}
            {/*  {badgeText}*/}
            {/*</Badge>*/}
          </div>
          {/*<p className="max-w-xl text-sm leading-6 text-muted-foreground/90">*/}
          {/*  1번부터 45번까지 번호 볼을 한눈에 보면서, 랜덤·날짜·MBTI·슬롯·통계 전략을 같은 화면에서 비교해볼 수 있습니다.*/}
          {/*</p>*/}
        </div>
        <div className="mx-auto w-full md:mx-0 md:w-auto">
          <LottoNumberCloud />
        </div>
      </div>
    </Card>
  );
}

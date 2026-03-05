'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatLottoNumbers } from '@/lib/lotto/generator';
import { useLottoRecommend } from './LottoRecommendProvider';

export function LottoWeeklyRecommendation() {
  // provider에서 유지하는 weeklyNumbers를 그대로 읽어와 복사 가능한 카드로 노출합니다.
  const [copied, setCopied] = useState(false);
  const {
    meta: { weeklyNumbers },
    actions: { copyNumbers },
  } = useLottoRecommend();

  if (weeklyNumbers.length === 0) return null;

  const handleCopy = async () => {
    const success = await copyNumbers(weeklyNumbers);
    if (!success) return;

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="text-lg font-bold">이번주 추천 번호</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopy}
          aria-label="이번주 추천 번호 복사"
        >
          {copied ? '복사됨' : '번호 복사'}
        </Button>
      </div>
      <p className="font-mono text-sm text-muted-foreground" aria-live="polite">
        {formatLottoNumbers(weeklyNumbers)}
      </p>
    </Card>
  );
}

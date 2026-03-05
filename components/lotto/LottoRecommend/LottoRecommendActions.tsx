'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLottoRecommend } from './LottoRecommendProvider';

export function LottoRecommendActions() {
  // 공유 URL 복사 결과를 버튼 라벨 상태로 즉시 피드백합니다.
  const [shareCopied, setShareCopied] = useState(false);
  const {
    state: { currentGames },
    actions: { copyShareUrl },
  } = useLottoRecommend();

  if (currentGames.length === 0) return null;

  const handleCopyShareUrl = async () => {
    const success = await copyShareUrl();
    if (!success) return;

    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 1200);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-end" aria-live="polite">
      <Button
        type="button"
        variant="outline"
        onClick={handleCopyShareUrl}
        size="sm"
        aria-label="현재 생성 번호 공유 링크 복사"
      >
        {shareCopied ? '링크 복사됨' : '공유 링크 복사'}
      </Button>
    </div>
  );
}

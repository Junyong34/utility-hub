'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLottoRecommend } from './LottoRecommendProvider';

export function LottoRecommendActions() {
  const [shareCopied, setShareCopied] = useState(false);
  const {
    state: { currentGames },
    actions: { save, clearCurrent, copyShareUrl },
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
        onClick={save}
        size="sm"
        aria-label="현재 생성 번호 저장"
      >
        저장
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={clearCurrent}
        size="sm"
        aria-label="현재 생성 번호 초기화"
      >
        초기화
      </Button>
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

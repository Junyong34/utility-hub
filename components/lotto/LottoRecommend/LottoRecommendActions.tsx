'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLottoRecommend } from './LottoRecommendProvider';

export function LottoRecommendActions() {
  // 공유 URL/이미지 저장 결과를 버튼 라벨 상태로 즉시 피드백합니다.
  const [shareCopied, setShareCopied] = useState(false);
  const [imageSaved, setImageSaved] = useState(false);
  const [imageSaveFailed, setImageSaveFailed] = useState(false);
  const {
    state: { currentGames },
    actions: { copyShareUrl, downloadResultsImage },
  } = useLottoRecommend();

  if (currentGames.length === 0) return null;

  const handleCopyShareUrl = async () => {
    const success = await copyShareUrl();
    if (!success) return;

    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 1200);
  };

  // 현재 생성된 번호 기반으로 PNG 캡처 API를 호출하고,
  // 성공/실패마다 토스트 라벨만 1~1.5초 표시합니다.
  const handleDownloadImage = async () => {
    const success = await downloadResultsImage();
    if (!success) {
      setImageSaveFailed(true);
      window.setTimeout(() => setImageSaveFailed(false), 1500);
      return;
    }

    setImageSaveFailed(false);
    setImageSaved(true);
    window.setTimeout(() => setImageSaved(false), 1200);
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
      <Button
        type="button"
        variant="outline"
        onClick={() => void handleDownloadImage()}
        size="sm"
        aria-label="현재 생성 번호 이미지 저장"
      >
        {imageSaved
          ? '이미지 저장됨'
          : imageSaveFailed
            ? '이미지 저장 실패'
            : '이미지 저장'}
      </Button>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyTextToClipboard } from '@/lib/clipboard';

interface ShareButtonProps {
  /**
   * 공유 버튼 변형
   * - 'default': 일반 버튼 스타일
   * - 'outline': 아웃라인 버튼 스타일
   */
  variant?: 'default' | 'outline';
  /**
   * 공유 버튼 크기
   */
  size?: 'default' | 'sm' | 'lg';
  /**
   * 공유할 URL (선택적, 없으면 현재 URL 사용)
   */
  url?: string;
  /**
   * 버튼 라벨 표시 여부
   */
  showLabel?: boolean;
  /**
   * className 추가
   */
  className?: string;
}

export function ShareButton({
  variant = 'outline',
  size = 'default',
  url,
  showLabel = true,
  className,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;

    try {
      // 클립보드에 URL 복사
      await copyTextToClipboard(shareUrl);
      setCopied(true);

      // 2초 후 원래 상태로 복귀
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleShare}
      className={className}
      aria-label="계산 결과 링크 복사"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          {showLabel && <span className="ml-2">복사됨</span>}
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          {showLabel && <span className="ml-2">링크 공유</span>}
        </>
      )}
    </Button>
  );
}

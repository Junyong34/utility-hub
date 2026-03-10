'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyTextToClipboard } from '@/lib/clipboard';

interface ShareButtonProps {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  url?: string;
  showLabel?: boolean;
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
      await copyTextToClipboard(shareUrl);
      setCopied(true);
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

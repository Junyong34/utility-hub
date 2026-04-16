'use client';

import { useState } from 'react';
import { Check, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyTextToClipboard } from '@/lib/clipboard';
import { MOVING_BUDGET_ARIA_LABELS } from '../accessibility';

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      const success = await copyTextToClipboard(window.location.href);

      if (success) {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleShare}
      aria-label={MOVING_BUDGET_ARIA_LABELS.shareButton}
      className="gap-2"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          복사됨
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          링크 공유
        </>
      )}
    </Button>
  );
}

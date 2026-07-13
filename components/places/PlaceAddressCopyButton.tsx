'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { copyTextToClipboard } from '@/shared/client/clipboard';

interface PlaceAddressCopyButtonProps {
  address: string;
  placeName: string;
}

export function PlaceAddressCopyButton({
  address,
  placeName,
}: PlaceAddressCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const didCopy = await copyTextToClipboard(address);

    if (!didCopy) {
      return;
    }

    setCopied(true);
    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      onClick={handleCopy}
      aria-label={`${placeName} 주소 복사`}
      title={copied ? '복사됨' : '주소 복사'}
      className="h-6 w-6 rounded-[8px] border border-hairline-soft bg-canvas/80 text-slate shadow-subtle hover:border-primary/30 hover:bg-canvas"
    >
      {copied ? (
        <Check className="size-3.5 text-[oklch(48%_0.12_155)]" />
      ) : (
        <Copy className="size-3.5" />
      )}
      <span className="sr-only">{copied ? '복사됨' : '주소 복사'}</span>
    </Button>
  );
}

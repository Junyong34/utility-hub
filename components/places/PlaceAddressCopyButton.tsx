'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyTextToClipboard } from '@/lib/clipboard';

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
      className="h-6 w-6 rounded-[8px] border border-[#e7dccf] bg-white/80 text-[#6e604d] shadow-[0_4px_12px_rgba(59,46,31,0.05)] hover:border-[#d4c2aa] hover:bg-white"
    >
      {copied ? <Check className="size-3.5 text-[#03c75a]" /> : <Copy className="size-3.5" />}
      <span className="sr-only">{copied ? '복사됨' : '주소 복사'}</span>
    </Button>
  );
}

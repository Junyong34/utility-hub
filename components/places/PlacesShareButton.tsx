'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { CheckIcon, Link2Icon, Share2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyTextToClipboard } from '@/lib/clipboard';

function subscribeNativeShareSupport(): () => void {
  return () => {};
}

function getNativeShareSnapshot(): boolean {
  return (
    typeof navigator !== 'undefined' && typeof navigator.share === 'function'
  );
}

export function PlacesShareButton() {
  const [copied, setCopied] = useState(false);
  const canNativeShare = useSyncExternalStore(
    subscribeNativeShareSupport,
    getNativeShareSnapshot,
    () => false
  );

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCopied(false);
    }, 2200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [copied]);

  async function handleShare(): Promise<void> {
    const shareUrl = window.location.href;

    if (canNativeShare && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: document.title,
          text: '현재 보고 있는 조건 필터 링크입니다.',
          url: shareUrl,
        });
        return;
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }
      }
    }

    const didCopy = await copyTextToClipboard(shareUrl);

    if (didCopy) {
      setCopied(true);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleShare}
      aria-label="현재 필터 링크 공유"
      className="h-8 rounded-full border-[#e5d9c8] bg-white/80 px-3 text-[11px] font-medium text-[#6e604d] shadow-[0_8px_20px_rgba(59,46,31,0.06)] hover:border-[#d6c3aa] hover:bg-white sm:h-9 sm:px-3.5 sm:text-xs"
    >
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5 text-[#03c75a]" />
      ) : canNativeShare ? (
        <Share2Icon className="h-3.5 w-3.5" />
      ) : (
        <Link2Icon className="h-3.5 w-3.5" />
      )}
      <span>{copied ? '링크 복사됨' : '공유하기'}</span>
    </Button>
  );
}

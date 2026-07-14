'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Share2, Link2, Check } from 'lucide-react';
import { SHARE_COPY_CONFIG, SITE_CONFIG } from '@/config/site';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/ui/class-names';
import { copyTextToClipboard } from '@/shared/client/clipboard';

interface FloatingShareButtonProps {
  className?: string;
}

export function FloatingShareButton({ className }: FloatingShareButtonProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [canNativeShare, setCanNativeShare] = React.useState(false);
  const [feedback, setFeedback] = React.useState('');
  const containerRef = React.useRef<HTMLDivElement>(null);

  // 동적으로 현재 페이지 정보 가져오기
  const getShareData = React.useCallback(() => {
    const url =
      typeof window !== 'undefined' ? window.location.href : SITE_CONFIG.url;

    // 페이지별 제목 생성
    let title: string = SHARE_COPY_CONFIG.defaultTitle;
    let description: string = SHARE_COPY_CONFIG.defaultDescription;

    if (pathname?.startsWith('/blog/') && pathname !== '/blog') {
      title = `${document.title} - ${SITE_CONFIG.name}`;
      description =
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute('content') || description;
    } else if (pathname === '/blog') {
      title = `블로그 - ${SITE_CONFIG.name}`;
      description = SHARE_COPY_CONFIG.blogDescription;
    } else if (pathname === '/tools') {
      title = `도구 - ${SITE_CONFIG.name}`;
      description = SHARE_COPY_CONFIG.toolsDescription;
    } else if (pathname === '/') {
      title = SHARE_COPY_CONFIG.defaultTitle;
      description = SHARE_COPY_CONFIG.defaultDescription;
    }

    return { title, description, url };
  }, [pathname]);

  React.useEffect(() => {
    if (typeof navigator === 'undefined') return;
    setCanNativeShare(typeof navigator.share === 'function');
  }, []);

  React.useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  React.useEffect(() => {
    if (
      !isOpen ||
      typeof window === 'undefined' ||
      typeof document === 'undefined'
    )
      return;

    const closeMenu = () => {
      setIsOpen(false);
    };

    const onOutsidePointerDown = (event: MouseEvent | TouchEvent) => {
      const container = containerRef.current;

      if (!container) return;
      if (event.target instanceof Node && !container.contains(event.target)) {
        closeMenu();
      }
    };

    window.addEventListener('scroll', closeMenu);
    document.addEventListener('mousedown', onOutsidePointerDown);
    document.addEventListener('touchstart', onOutsidePointerDown);

    return () => {
      window.removeEventListener('scroll', closeMenu);
      document.removeEventListener('mousedown', onOutsidePointerDown);
      document.removeEventListener('touchstart', onOutsidePointerDown);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => {
      setFeedback('');
    }, 2200);

    return () => clearTimeout(timer);
  }, [feedback]);

  const handleNativeShare = async () => {
    if (!canNativeShare || typeof navigator === 'undefined') return;

    const { title, description, url } = getShareData();

    try {
      await navigator.share({
        title,
        text: description,
        url,
      });
      setIsOpen(false);
    } catch (error) {
      if (error && (error as Error).name !== 'AbortError') {
        setFeedback('공유 창을 열지 못했습니다.');
      }
    }
  };

  const handleCopy = async () => {
    const { url } = getShareData();
    const copied = await copyTextToClipboard(url);

    setFeedback(copied ? '링크를 복사했습니다.' : '링크 복사에 실패했습니다.');
    setIsOpen(false);
  };

  if (pathname === '/') {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40',
        className
      )}
    >
      {/* Feedback Toast */}
      {feedback && (
        <div
          role="status"
          aria-live="polite"
          className="absolute bottom-full mb-3 right-0 bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium shadow-lg animate-in fade-in slide-in-from-bottom-2 whitespace-nowrap"
        >
          {feedback}
        </div>
      )}

      {/* Action Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-label="공유 메뉴"
          className="absolute bottom-full mb-3 right-0 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {canNativeShare && (
            <Button
              type="button"
              role="menuitem"
              variant="ghost"
              size="default"
              onClick={handleNativeShare}
              className="min-w-[140px] justify-start border border-hairline-soft bg-canvas/92 shadow-card backdrop-blur-xl hover:bg-cream-soft dark:bg-card/92"
            >
              <Share2 className="h-5 w-5" aria-hidden="true" />
              공유하기
            </Button>
          )}

          <Button
            type="button"
            role="menuitem"
            variant="ghost"
            size="default"
            onClick={handleCopy}
            className="min-w-[140px] justify-start border border-hairline-soft bg-canvas/92 shadow-card backdrop-blur-xl hover:bg-cream-soft dark:bg-card/92"
          >
            {feedback === '링크를 복사했습니다.' ? (
              <Check className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Link2 className="h-5 w-5" aria-hidden="true" />
            )}
            링크 복사
          </Button>
        </div>
      )}

      {/* Main Share Button - bottom-nav 스타일 적용 */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? '공유 메뉴 닫기' : '공유 메뉴 열기'}
        onClick={() => setIsOpen(prev => !prev)}
        className="h-14 w-14 shrink-0 rounded-md border border-hairline-soft bg-canvas/92 shadow-card backdrop-blur-xl hover:bg-cream-soft dark:bg-card/92"
      >
        <Share2 className="h-5 w-5 text-foreground" aria-hidden="true" />
        <span className="sr-only">공유</span>
      </Button>
    </div>
  );
}

'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxHeight?: string;
  showCloseButton?: boolean;
}

/**
 * 재사용 가능한 바텀시트 컴포넌트
 * 모바일 환경에서 하단에서 올라오는 모달 형태의 UI
 */
export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  maxHeight = '70vh',
  showCloseButton = true,
}: BottomSheetProps) {
  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* 바텀시트 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'bottom-sheet-title' : undefined}
        className={cn(
          'fixed bottom-0 left-0 right-0 bg-card border-t rounded-t-2xl shadow-2xl z-50 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ maxHeight }}
      >
        <div className="p-6 overflow-y-auto" style={{ maxHeight: `calc(${maxHeight} - 4rem)` }}>
          {/* 헤더 */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between mb-4">
              {title && (
                <h2 id="bottom-sheet-title" className="font-semibold text-lg">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8"
                  aria-label="닫기"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {/* 콘텐츠 */}
          {children}
        </div>
      </div>
    </>
  );
}

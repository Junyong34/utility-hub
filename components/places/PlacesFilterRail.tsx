'use client';

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PlacesFilterRailProps {
  label: string;
  labelClassName: string;
  trackTestId?: string;
  children: ReactNode;
}

export function PlacesFilterRail({
  label,
  labelClassName,
  trackTestId,
  children,
}: PlacesFilterRailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const suppressClickRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  function resetDrag(): void {
    dragStateRef.current = {
      active: false,
      startX: 0,
      startScrollLeft: 0,
    };
    setIsDragging(false);
  }

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const previousUserSelect = document.body.style.userSelect;

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      if (!dragStateRef.current.active || !trackRef.current) {
        return;
      }

      const deltaX = event.clientX - dragStateRef.current.startX;

      if (Math.abs(deltaX) > 4) {
        suppressClickRef.current = true;
      }

      trackRef.current.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
    };

    const handleMouseUp = () => {
      resetDrag();
    };

    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.userSelect = previousUserSelect;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  function handleMouseDown(event: MouseEvent<HTMLDivElement>): void {
    if (event.button !== 0 || !trackRef.current) {
      return;
    }

    dragStateRef.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: trackRef.current.scrollLeft,
    };
    suppressClickRef.current = false;
    setIsDragging(true);
  }

  function handleClickCapture(event: MouseEvent<HTMLDivElement>): void {
    if (!suppressClickRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  }

  return (
    <div
      role="group"
      aria-label={`${label} 필터 그룹`}
      className="rounded-[22px] border border-[#eadfce] bg-white/48 p-3 shadow-[0_10px_24px_rgba(59,46,31,0.04)] sm:rounded-[24px] sm:p-3.5"
    >
      <div className="mb-2 flex items-center justify-between gap-2 sm:mb-2.5">
        <span
          className={cn(
            'inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold sm:px-3 sm:text-[11px]',
            labelClassName
          )}
        >
          {label}
        </span>
        <span className="text-[10px] font-medium text-[#8b7a66] sm:hidden">
          좌우로 밀어 보기
        </span>
      </div>

      <div
        ref={trackRef}
        data-testid={trackTestId}
        className={cn(
          'flex gap-2 overflow-x-auto pb-1 pr-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [touch-action:pan-x]',
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
        onMouseDown={handleMouseDown}
        onClickCapture={handleClickCapture}
      >
        {children}
      </div>
    </div>
  );
}

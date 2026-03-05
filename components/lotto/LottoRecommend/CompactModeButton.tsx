'use client';

import { cn } from '@/lib/utils';
import { LottoRecommendMode } from '@/lib/lotto/recommendation-spec';
import { Sparkles } from 'lucide-react';

interface CompactModeButtonProps {
  mode: LottoRecommendMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  isSelected: boolean;
  isDisabled: boolean;
  showBadge?: 'strong' | 'fun' | null;
  onClick: () => void;
}

/**
 * 모바일용 컴팩트 추천 방식 버튼
 * 2행 3열 그리드에 최적화
 */
export function CompactModeButton({
  mode,
  label,
  icon: Icon,
  iconBg,
  isSelected,
  isDisabled,
  showBadge,
  onClick,
}: CompactModeButtonProps) {
  // 모바일 compact 버튼은 aria-pressed로 선택 상태를 명시하고,
  // 선택/비선택 스타일을 CSS 클래스 전환으로 분기합니다.
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-pressed={isSelected}
      aria-label={`${label} 선택`}
      data-mode={mode}
      className={cn(
        'relative flex flex-col items-center justify-center gap-2',
        'p-3 rounded-xl border-2 transition-all duration-200',
        'hover:shadow-md active:scale-95',
        isSelected
          ? 'bg-primary/10 border-primary shadow-md scale-105'
          : 'bg-card border-border hover:border-primary/50',
        isDisabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {/* 배지 */}
      {showBadge && (
        <div className="absolute -top-1 -right-1 z-10">
          <div
            className={cn(
              'text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5',
              showBadge === 'strong'
                ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse'
                : 'bg-gradient-to-r from-pink-500 to-rose-500'
            )}
          >
            <Sparkles className="w-2 h-2" />
            <span>{showBadge === 'strong' ? '강력' : '재미'}</span>
          </div>
        </div>
      )}

      {/* 아이콘 */}
      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', iconBg)}>
        <Icon className="w-5 h-5 text-white" />
      </div>

      {/* 라벨 */}
      <span
        className={cn(
          'text-xs font-semibold text-center leading-tight',
          isSelected ? 'text-primary' : 'text-foreground'
        )}
      >
        {label}
      </span>
    </button>
  );
}

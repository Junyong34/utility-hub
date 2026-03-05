'use client';

import { Card } from '@/components/ui/card';
import { LottoRecommendMode } from '@/lib/lotto/recommendation-spec';
import { cn } from '@/lib/utils';

interface ModeDescriptionProps {
  mode: LottoRecommendMode;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  gradient: string;
}

/**
 * 모바일용 선택된 추천 방식 상세 설명 카드
 * 컴팩트하게 필수 정보만 표시
 */
export function ModeDescription({
  mode,
  label,
  description,
  icon: Icon,
  iconBg,
  gradient,
}: ModeDescriptionProps) {
  // 모바일에서 현재 모드의 핵심 메타만 짧게 보여주기 위한 요약 카드

  // 모드별 테두리 색상
  const borderColors: Record<LottoRecommendMode, string> = {
    random: 'border-violet-300 dark:border-violet-700',
    stats: 'border-blue-300 dark:border-blue-700',
    date: 'border-green-300 dark:border-green-700',
    mbti: 'border-pink-300 dark:border-pink-700',
    lucky: 'border-amber-300 dark:border-amber-700',
    slot: 'border-indigo-300 dark:border-indigo-700',
  };

  return (
    <Card
      className={cn(
        'p-4 border-2 bg-card/80 backdrop-blur-sm',
        borderColors[mode]
      )}
    >
      <div className="flex items-start gap-3">
        {/* 아이콘 */}
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center shrink-0 opacity-60',
            iconBg
          )}
        >
          <Icon className="w-5 h-5 text-white opacity-100" />
        </div>

        {/* 내용 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-foreground">{label}</h3>
            {mode === 'stats' && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white">
                강력추천
              </span>
            )}
            {mode === 'mbti' && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                재미추천
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}

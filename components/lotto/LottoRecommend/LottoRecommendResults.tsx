/**
 * 로또 추천 결과 표시 컴포넌트
 *
 * @description
 * 생성된 로또 번호와 선택한 추천 방식 정보를 표시하는 컴포넌트입니다.
 * 모드별로 다른 그라데이션 색상을 적용하여 시각적 차별화를 제공합니다.
 *
 * @remarks
 * - 6가지 추천 모드별 고유 색상 테마 적용
 * - 추천 방식 라벨과 상세 설명 표시
 * - 이미지 캡처를 위한 data 속성 포함 (data-lotto-results-capture)
 * - 번호가 없으면 렌더링하지 않음
 *
 * @module LottoRecommendResults
 */
'use client';

import { useLottoRecommend } from './LottoRecommendProvider';
import { LottoResults } from '../LottoResults';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 로또 추천 결과 표시
 *
 * @returns 추천 결과 UI (결과가 없으면 null)
 */
export function LottoRecommendResults() {
  const {
    state: {
      currentGames,
      selectedRecommendationLabel,
      selectedRecommendationDetail,
      mode,
    },
    actions: { copyNumbers },
  } = useLottoRecommend();

  if (currentGames.length === 0) return null;

  // Gradient colors matching mode switcher
  const modeGradients: Record<string, string> = {
    random: 'from-violet-500/10 to-purple-600/10',
    stats: 'from-blue-500/10 to-cyan-600/10',
    date: 'from-green-500/10 to-emerald-600/10',
    mbti: 'from-pink-500/10 to-rose-600/10',
    lucky: 'from-amber-500/10 to-orange-600/10',
    slot: 'from-indigo-500/10 to-purple-600/10',
  };

  const modeBorderColors: Record<string, string> = {
    random: 'border-violet-500/30',
    stats: 'border-blue-500/30',
    date: 'border-green-500/30',
    mbti: 'border-pink-500/30',
    lucky: 'border-amber-500/30',
    slot: 'border-indigo-500/30',
  };

  const modeTextColors: Record<string, string> = {
    random: 'text-violet-600 dark:text-violet-400',
    stats: 'text-blue-600 dark:text-blue-400',
    date: 'text-green-600 dark:text-green-400',
    mbti: 'text-pink-600 dark:text-pink-400',
    lucky: 'text-amber-600 dark:text-amber-400',
    slot: 'text-indigo-600 dark:text-indigo-400',
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Recommendation Info Card */}
      <div
        className={cn(
          'relative rounded-xl border-2 overflow-hidden',
          'bg-gradient-to-br',
          modeGradients[mode] || modeGradients.random,
          modeBorderColors[mode] || modeBorderColors.random
        )}
      >
        <div className="px-5 py-4 space-y-3">
          {/* Header with icon */}
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm',
                modeBorderColors[mode] || modeBorderColors.random
              )}
            >
              <CheckCircle2
                className={cn('w-5 h-5', modeTextColors[mode] || modeTextColors.random)}
              />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                선택한 추천방식
              </p>
            </div>
          </div>

          {/* Mode Label */}
          <div>
            <h3
              className={cn(
                'text-lg font-bold',
                modeTextColors[mode] || modeTextColors.random
              )}
            >
              {selectedRecommendationLabel}
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              {selectedRecommendationDetail}
            </p>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute top-0 right-0 opacity-10">
          <Sparkles className="w-24 h-24 text-current" />
        </div>
      </div>

      {/* Results Section Header */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-1 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
        <h3 className="text-xl font-bold">생성된 번호</h3>
      </div>

      {/* Results */}
      <div id="lotto-results-capture-root" data-lotto-results-capture="true">
        <LottoResults games={currentGames} onCopyNumbers={copyNumbers} />
      </div>
    </div>
  );
}

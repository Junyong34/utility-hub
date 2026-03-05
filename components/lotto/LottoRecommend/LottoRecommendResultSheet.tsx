'use client';

import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LottoAnalysisLoading } from './LottoAnalysisLoading';
import { LottoRecommendActions } from './LottoRecommendActions';
import { LottoRecommendResults } from './LottoRecommendResults';
import { useLottoRecommend } from './LottoRecommendProvider';

export function LottoRecommendResultSheet() {
  const {
    state: {
      isGenerating,
      currentGames,
      resultSheetOpen,
      analysisStages,
      analysisStage,
      analysisStepIndex,
      analysisProgress,
    },
    actions: { openResultSheet, closeResultSheet },
  } = useLottoRecommend();

  // 결과가 생성되었거나 분석 중일 때만 시트를 렌더링해 불필요한 DOM 생성 방지.
  const hasRenderableContent = isGenerating || currentGames.length > 0;
  if (!hasRenderableContent) return null;

  return (
    <div className="space-y-3">
      {!resultSheetOpen && (
        <div className="flex justify-end">
          <Button type="button" variant="outline" size="sm" onClick={openResultSheet}>
            {isGenerating ? '분석 창 다시 열기' : '결과 다시 보기'}
          </Button>
        </div>
      )}

      <BottomSheet
        isOpen={resultSheetOpen}
        onClose={closeResultSheet}
        title={isGenerating ? '번호 분석 중' : '생성 결과'}
        maxHeight="85vh"
      >
        <div
          className={cn(
            'space-y-4 transition-all duration-300',
            resultSheetOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          )}
        >
          {isGenerating ? (
            <LottoAnalysisLoading
              stages={analysisStages}
              currentStage={analysisStage}
              currentStepIndex={analysisStepIndex}
              progress={analysisProgress}
            />
          ) : (
            <>
              <LottoRecommendActions />
              <LottoRecommendResults />
            </>
          )}
        </div>
      </BottomSheet>
    </div>
  );
}

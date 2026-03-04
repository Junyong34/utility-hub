'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLottoRecommend } from '../LottoRecommendProvider';

function createSlotFrame(): number[] {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 45) + 1);
}

function createSlotFrames(count: number): number[][] {
  return Array.from({ length: count }, () => createSlotFrame());
}

export function SlotRecommendPanel() {
  const {
    state: { mode, isGenerating, count, currentGames },
  } = useLottoRecommend();
  const [slotFrames, setSlotFrames] = useState<number[][]>(() =>
    createSlotFrames(count)
  );

  useEffect(() => {
    if (!(mode === 'slot' && isGenerating)) return;

    const initialTimer = window.setTimeout(() => {
      setSlotFrames(createSlotFrames(count));
    }, 0);

    const timer = window.setInterval(() => {
      setSlotFrames(createSlotFrames(count));
    }, 90);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, [count, isGenerating, mode]);

  const idleFrames = useMemo(() => createSlotFrames(count), [count]);

  const displayFrames = useMemo(() => {
    if (mode !== 'slot') return [];
    if (isGenerating) return slotFrames;
    if (currentGames.length > 0) return currentGames;
    return idleFrames;
  }, [currentGames, idleFrames, isGenerating, mode, slotFrames]);

  return (
    <div className="rounded-lg border bg-muted/20 p-4 space-y-3">
      <p className="text-sm font-semibold">슬롯 머신 추천</p>
      <p className="text-xs text-muted-foreground">
        생성 중에는 슬롯처럼 숫자가 빠르게 변합니다.
      </p>
      <div className="space-y-2" aria-live="polite" aria-label="슬롯 프리뷰 번호">
        {displayFrames.map((frame, gameIndex) => (
          <div key={`slot-game-${gameIndex}`} className="space-y-1">
            <p className="text-[11px] text-muted-foreground">
              게임 {gameIndex + 1}
            </p>
            <div
              className="flex flex-wrap gap-2"
              aria-label={`슬롯 프리뷰 게임 ${gameIndex + 1}`}
            >
              {frame.map((num, numberIndex) => (
                <div
                  key={`slot-${gameIndex}-${numberIndex}-${num}`}
                  className="h-10 w-10 rounded-md border bg-background flex items-center justify-center font-bold"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

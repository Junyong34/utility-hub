'use client';

import { useEffect, useMemo, useState } from 'react';
import { SlotMachine } from '@/components/lotto/SlotMachine';
import { useLottoRecommend } from '../LottoRecommendProvider';

function createSlotFrame(): number[] {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 45) + 1);
}

function createSlotFrames(count: number): number[][] {
  return Array.from({ length: count }, () => createSlotFrame());
}

export function SlotRecommendPanel() {
  // 슬롯 모드에서 사용되는 프레임(릴 회전 화면)과 결과 화면을 분리해 관리합니다.
  const {
    state: { mode, isGenerating, count, currentGames },
  } = useLottoRecommend();
  const [slotFrames, setSlotFrames] = useState<number[][]>([]);
  const [idleFrames, setIdleFrames] = useState<number[][]>([]);

  // 클라이언트 사이드에서만 초기 idle frames 생성
  useEffect(() => {
    setIdleFrames(createSlotFrames(count));
  }, [count]);

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
        생성 버튼을 누르면 2~3초 동안 숫자 릴이 회전한 뒤 최종 번호가
        고정됩니다.
      </p>
      <div
        className="space-y-2"
        aria-live="polite"
        aria-label="슬롯 프리뷰 번호"
      >
        {displayFrames.map((frame, gameIndex) => (
          <div key={`slot-game-${gameIndex}`} className="space-y-1">
            <p className="text-[11px] text-muted-foreground">
              게임 {gameIndex + 1}
            </p>
            <SlotMachine numbers={frame} isSpinning={isGenerating} />
          </div>
        ))}
      </div>
    </div>
  );
}

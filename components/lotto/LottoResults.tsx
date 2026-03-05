'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatLottoNumbers } from '@/lib/lotto/generator';
import { LottoNumberAnimation } from './LottoNumberAnimation';

interface LottoResultsProps {
  games: number[][];
  onCopyNumbers?: (numbers: number[]) => Promise<boolean> | boolean;
  onCopyShareLink?: (numbers: number[]) => Promise<boolean> | boolean;
}

/**
 * 로또 번호 결과 표시 컴포넌트
 * 여러 게임의 로또 번호를 표시합니다
 */
export const LottoResults = memo(function LottoResults({
  games,
  onCopyNumbers,
  onCopyShareLink,
}: LottoResultsProps) {
  const [copyFeedback, setCopyFeedback] = useState<Record<string, boolean>>({});
  const copyFeedbackTimersRef = useRef<Record<string, number>>({});

  useEffect(() => {
    return () => {
      Object.values(copyFeedbackTimersRef.current).forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, []);

  const setFeedbackVisible = (key: string) => {
    setCopyFeedback((prev) => ({ ...prev, [key]: true }));

    if (copyFeedbackTimersRef.current[key]) {
      clearTimeout(copyFeedbackTimersRef.current[key]);
    }

    copyFeedbackTimersRef.current[key] = window.setTimeout(() => {
      setCopyFeedback((prev) => ({ ...prev, [key]: false }));
      delete copyFeedbackTimersRef.current[key];
    }, 1200);
  };

  const handleCopyNumbers = async (index: number, numbers: number[]) => {
    if (!onCopyNumbers) return;

    const success = await onCopyNumbers(numbers);
    if (!success) return;

    const key = `numbers-${index}`;
    setFeedbackVisible(key);
  };

  const handleCopyShareLink = async (index: number, numbers: number[]) => {
    if (!onCopyShareLink) return;

    const success = await onCopyShareLink(numbers);
    if (!success) return;

    const key = `share-${index}`;
    setFeedbackVisible(key);
  };

  // games 배열을 반복 렌더링해 카드 단위로 결과를 표시하며,
  // 복사 액션은 부모에서 optional callback으로 주입받아 재사용성을 확보합니다.
  return (
    <div className="space-y-2.5" role="list" aria-label="생성된 로또 번호 목록">
      {games.map((numbers, index) => (
        <Card
          key={index}
          className="p-3 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] bg-gradient-to-br from-card to-card/80"
          role="listitem"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-white">
                  {index + 1}
                </span>
                <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* 복사 버튼 우측 상단으로 이동 */}
            {(onCopyNumbers || onCopyShareLink) && (
              <div className="flex gap-1.5" aria-live="polite">
                {onCopyNumbers && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs border hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-colors"
                    aria-label={`게임 ${index + 1} 번호 복사`}
                    onClick={() => void handleCopyNumbers(index, numbers)}
                  >
                    {copyFeedback[`numbers-${index}`] ? '복사됨' : '번호 복사'}
                  </Button>
                )}
                {onCopyShareLink && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs border hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-colors"
                    aria-label={`게임 ${index + 1} 공유 링크 복사`}
                    onClick={() => void handleCopyShareLink(index, numbers)}
                  >
                    {copyFeedback[`share-${index}`] ? '공유됨' : '공유'}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* 번호 표시 */}
          <div className="flex gap-1.5 sm:gap-2 justify-center mb-2">
            {numbers.map((num, idx) => (
              <LottoNumberAnimation
                key={`${idx}-${num}`}
                number={num}
                delayMs={idx * 100}
              />
            ))}
          </div>

          {/* 번호 텍스트 */}
          <div className="text-center">
            <div className="inline-block px-2.5 py-1 rounded-lg bg-muted/50">
              <span className="text-xs font-mono font-semibold text-foreground">
                {formatLottoNumbers(numbers)}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
});

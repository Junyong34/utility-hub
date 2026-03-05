'use client';

import { memo } from 'react';
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
  // games 배열을 반복 렌더링해 카드 단위로 결과를 표시하며,
  // 복사 액션은 부모에서 optional callback으로 주입받아 재사용성을 확보합니다.
  return (
    <div className="space-y-4" role="list" aria-label="생성된 로또 번호 목록">
      {games.map((numbers, index) => (
        <Card
          key={index}
          className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] bg-gradient-to-br from-card to-card/80"
          role="listitem"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {index + 1}
                </span>
              </div>
            </div>
          </div>

          {/* 번호 표시 */}
          <div className="flex gap-2.5 sm:gap-3 justify-center mb-5">
            {numbers.map((num, idx) => (
              <LottoNumberAnimation
                key={`${idx}-${num}`}
                number={num}
                delayMs={idx * 100}
              />
            ))}
          </div>

          {/* 번호 텍스트 */}
          <div className="text-center mb-4">
            <div className="inline-block px-4 py-2 rounded-lg bg-muted/50">
              <span className="text-sm font-mono font-semibold text-foreground">
                {formatLottoNumbers(numbers)}
              </span>
            </div>
          </div>

          {(onCopyNumbers || onCopyShareLink) && (
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {onCopyNumbers && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label={`게임 ${index + 1} 번호 복사`}
                  onClick={() => void onCopyNumbers(numbers)}
                >
                  번호 복사
                </Button>
              )}
              {onCopyShareLink && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label={`게임 ${index + 1} 공유 링크 복사`}
                  onClick={() => void onCopyShareLink(numbers)}
                >
                  공유 링크 복사
                </Button>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
});

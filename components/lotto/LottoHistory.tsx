'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LottoHistory as LottoHistoryType } from '@/hooks/useLotto';

interface LottoHistoryProps {
  history: LottoHistoryType[];
  onRemove?: (id: string) => void;
}

/**
 * 로또 번호 히스토리 컴포넌트
 * 저장된 게임 세트들을 표시합니다
 */
export function LottoHistory({ history, onRemove }: LottoHistoryProps) {
  return (
    <div className="space-y-3">
      {history.map((item) => {
        const date = new Date(item.savedAt);

        return (
          <Card key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-3">
              {/* 날짜 */}
              <div className="text-sm text-gray-600">
                {date.toLocaleString('ko-KR', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              {/* 게임 수 */}
              <div className="text-sm font-medium text-gray-700">
                {item.games.length}게임
              </div>

              {/* 삭제 버튼 */}
              {onRemove && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(item.id)}
                  className="text-gray-400 hover:text-red-600 h-6 px-2"
                >
                  삭제
                </Button>
              )}
            </div>

            {/* 번호 목록 (축약된 버전) */}
            <div className="space-y-2">
              {item.games.slice(0, 3).map((numbers, idx) => (
                <div key={idx} className="flex gap-1.5 text-xs">
                  {numbers.map((num, numIdx) => (
                    <div
                      key={numIdx}
                      className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              ))}
              {item.games.length > 3 && (
                <div className="text-xs text-gray-500 text-center">
                  +{item.games.length - 3}개 게임 더보기
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

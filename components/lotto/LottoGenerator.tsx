'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useLotto } from '@/hooks/useLotto';
import { LottoResults } from './LottoResults';
import { LottoHistory } from './LottoHistory';

/**
 * 로또 번호 생성기 메인 컴포넌트 (클라이언트 컴포넌트)
 */
export function LottoGenerator() {
  const [count, setCount] = useState(5);
  const {
    currentGames,
    history,
    isGenerating,
    generateMultiple,
    saveToHistory,
    loadHistory,
    deleteFromHistory,
    clearCurrent,
    clearHistory,
  } = useLotto();

  // 컴포넌트 마운트 시 히스토리 로드
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleGenerate = () => {
    if (count >= 1 && count <= 10) {
      generateMultiple(count);
    }
  };

  return (
    <div className="space-y-8">
      {/* 생성기 */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">로또 번호 생성</h2>

        <div className="space-y-4">
          {/* 생성 개수 선택 */}
          <div>
            <Label htmlFor="count" className="mb-2 block">
              생성할 게임 수
            </Label>
            <div className="flex gap-2">
              {[1, 3, 5, 10].map((num) => (
                <Button
                  key={num}
                  variant={count === num ? 'default' : 'outline'}
                  onClick={() => setCount(num)}
                  disabled={isGenerating}
                >
                  {num}게임
                </Button>
              ))}
            </div>
          </div>

          {/* 생성 버튼 */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full h-14 text-lg"
            size="lg"
          >
            {isGenerating ? '생성 중...' : '🎲 번호 생성하기'}
          </Button>

          {/* 안내 문구 */}
          <p className="text-sm text-gray-600 text-center">
            1~45 사이의 중복되지 않는 6개의 숫자가 랜덤으로 생성됩니다
          </p>
        </div>
      </Card>

      {/* 현재 생성된 게임 결과 */}
      {currentGames.length > 0 && (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">생성된 번호</h3>
            <div className="flex gap-2">
              <Button variant="outline" onClick={saveToHistory} size="sm">
                저장
              </Button>
              <Button variant="outline" onClick={clearCurrent} size="sm">
                초기화
              </Button>
            </div>
          </div>

          <LottoResults games={currentGames} />
        </>
      )}

      {/* 저장된 히스토리 */}
      {history.length > 0 && (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">저장된 기록</h3>
            <Button variant="outline" onClick={clearHistory} size="sm">
              전체 삭제
            </Button>
          </div>

          <LottoHistory history={history} onRemove={deleteFromHistory} />
        </>
      )}

      {/* 빈 상태 */}
      {currentGames.length === 0 && history.length === 0 && !isGenerating && (
        <Card className="p-12 text-center">
          <p className="text-gray-500 text-lg">아직 생성된 번호가 없습니다</p>
          <p className="text-gray-400 text-sm mt-2">
            위의 버튼을 눌러 로또 번호를 생성해보세요!
          </p>
        </Card>
      )}
    </div>
  );
}

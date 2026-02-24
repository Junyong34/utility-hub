'use client';

import { Card } from '@/components/ui/card';
import { formatLottoNumbers } from '@/lib/lotto/generator';

interface LottoResultsProps {
  games: number[][];
}

/**
 * 로또 번호 결과 표시 컴포넌트
 * 여러 게임의 로또 번호를 표시합니다
 */
export function LottoResults({ games }: LottoResultsProps) {
  return (
    <div className="space-y-4">
      {games.map((numbers, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              게임 {index + 1}
            </span>
          </div>

          {/* 번호 표시 */}
          <div className="flex gap-3 justify-center">
            {numbers.map((num, idx) => (
              <LottoBall key={idx} number={num} />
            ))}
          </div>

          {/* 번호 텍스트 */}
          <div className="text-center mt-4 text-sm text-gray-500 font-mono">
            {formatLottoNumbers(numbers)}
          </div>
        </Card>
      ))}
    </div>
  );
}

/**
 * 로또 공 컴포넌트
 */
function LottoBall({ number }: { number: number }) {
  // 번호 범위에 따른 색상 결정
  const getColor = (num: number): string => {
    if (num <= 10) return 'bg-yellow-400 text-yellow-900';
    if (num <= 20) return 'bg-blue-500 text-white';
    if (num <= 30) return 'bg-red-500 text-white';
    if (num <= 40) return 'bg-gray-600 text-white';
    return 'bg-green-600 text-white';
  };

  return (
    <div
      className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-lg ${getColor(
        number
      )}`}
    >
      {number}
    </div>
  );
}

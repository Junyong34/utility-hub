'use client';

import { Card } from '@/components/ui/card';
import { useLottoRecommend } from './LottoRecommendProvider';

export function LottoRecommendEmptyState() {
  // currentGames가 비어있고 생성 중이 아닐 때만 진입 안내 메시지를 보여줍니다.
  const {
    state: { currentGames, isGenerating },
  } = useLottoRecommend();

  if (currentGames.length > 0 || isGenerating) return null;

  return (
    <Card className="p-12 text-center">
      <p className="text-muted-foreground text-lg">아직 생성된 번호가 없습니다</p>
      <p className="text-muted-foreground/70 text-sm mt-2">
        위의 버튼을 눌러 로또 번호를 생성해보세요!
      </p>
    </Card>
  );
}

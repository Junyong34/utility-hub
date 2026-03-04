'use client';

export function RandomRecommendPanel() {
  return (
    <div className="rounded-lg border bg-muted/20 p-4">
      <p className="text-sm font-semibold">랜덤 추천</p>
      <p className="text-xs text-muted-foreground mt-1">
        1~45 범위의 번호를 완전 랜덤으로 생성합니다.
      </p>
    </div>
  );
}


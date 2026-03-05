'use client';

export function LottoRecommendRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  // Provider 하위 컴포넌트를 수직 스택으로 묶는 단순 레이아웃 컨테이너입니다.
  return <div className="space-y-8">{children}</div>;
}

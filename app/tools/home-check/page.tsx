import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MovingBudgetChecklistPageClient } from '@/components/tools/moving-budget-checklist';

export const metadata: Metadata = {
  title: '이사 예산 체크리스트',
  description:
    '직접 URL로만 접근하는 개인용 이사 예산 체크리스트 페이지입니다.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function MovingBudgetChecklistPage() {
  return (
    <Suspense fallback={<div className="text-muted-foreground">로딩 중...</div>}>
      <MovingBudgetChecklistPageClient />
    </Suspense>
  );
}

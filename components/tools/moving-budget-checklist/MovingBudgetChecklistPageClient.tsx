'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMovingBudgetChecklist } from './hooks/useMovingBudgetChecklist';
import { MovingBudgetInputSection } from './sections/MovingBudgetInputSection';
import { MovingBudgetResultSection } from './sections/MovingBudgetResultSection';

export function MovingBudgetChecklistPageClient() {
  const checklist = useMovingBudgetChecklist();

  return (
    <div className="min-h-screen bg-background pt-10 md:pt-24 xl:pt-32">
      <main className="mx-auto max-w-7xl space-y-6 px-4 pb-16 sm:px-6 lg:px-8">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">이사 예산 체크리스트</h1>
          <p className="text-sm text-muted-foreground">
            자산, 매매 비용, 입주 전 부대비용, 입주 시 가전·가구 비용을 한 화면에서
            정리하고 체크리스트 진행 상황까지 같이 봅니다.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <MovingBudgetInputSection checklist={checklist} />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <MovingBudgetResultSection checklist={checklist} />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>사용 규칙</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>체크 상태는 진행률만 바꾸고 총예상비용 계산에는 영향을 주지 않습니다.</p>
            <p>이 페이지는 직접 URL로 접근하는 개인용 운영 화면이며 검색 노출 대상이 아닙니다.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

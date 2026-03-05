import { AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';

/**
 * 로또 서비스 면책 고지 컴포넌트
 *
 * @description
 * 로또 번호 추천 서비스의 면책 사항과 책임 있는 구매를 안내하는 컴포넌트입니다.
 * 배너 형태 또는 전체 카드 형태로 표시할 수 있습니다.
 *
 * @remarks
 * - 오락 목적 서비스임을 명확히 고지
 * - 중독 예방을 위한 안내 포함
 * - 연령 제한 고지 포함
 */
interface LottoDisclaimerProps {
  /** 표시 형태: 'banner' (간단한 경고) 또는 'full' (상세 내용) */
  variant?: 'banner' | 'full';
}

/**
 * 면책 고지 항목 목록
 *
 * @constant
 * @description 사용자에게 전달해야 할 6가지 주요 면책 사항
 */
const DISCLAIMER_ITEMS = [
  '본 서비스의 번호 추천은 오락 및 참고 목적입니다.',
  '로또(복권) 당첨번호는 무작위 추첨이며 모든 조합의 당첨 확률은 동일합니다.',
  'AI 분석, 통계 기반 추천, 날짜/MBTI 추천 모두 당첨 확률 향상을 보장하지 않습니다.',
  '본 서비스는 도박/투기를 권장하지 않으며 과도한 복권 구매를 권장하지 않습니다.',
  '복권 관련 중독 문제가 우려될 경우 한국도박문제예방치유원(1336)에 문의하세요.',
  '만 19세 미만은 복권 구매가 불가합니다.',
] as const;

/**
 * 로또 서비스 면책 고지
 *
 * @param props - 컴포넌트 props
 * @returns 면책 고지 UI 요소
 *
 * @example
 * ```tsx
 * // 배너 형태 (페이지 상단/하단)
 * <LottoDisclaimer variant="banner" />
 *
 * // 전체 카드 형태 (페이지 하단)
 * <LottoDisclaimer variant="full" />
 * ```
 */
export function LottoDisclaimer({ variant = 'full' }: LottoDisclaimerProps) {
  if (variant === 'banner') {
    return (
      <div
        className="border-y border-amber-300/50 bg-amber-100/70 dark:bg-amber-950/40"
        role="note"
        aria-label="로또 서비스 면책 고지"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-sm text-amber-900 dark:text-amber-100 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />본
            서비스는 오락 목적의 번호 추천 도구이며 당첨을 보장하지 않습니다.
            로또 1등 당첨 확률은 1/8,145,060입니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section aria-labelledby="lotto-disclaimer-title">
      <Card className="p-5 md:p-6 border-amber-300/60 bg-amber-50/70 dark:bg-amber-950/20">
        <h2
          id="lotto-disclaimer-title"
          className="text-lg md:text-xl font-bold flex items-center gap-2"
        >
          <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden />
          로또 서비스 면책 고지
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          아래 내용은 모든 사용자에게 공통 적용됩니다. 번호 추천 방식과 무관하게
          당첨 확률은 동일하며, 건전한 구매 원칙을 우선으로 이용해 주세요.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-foreground">
          {DISCLAIMER_ITEMS.map(item => (
            <li key={item} className="leading-6">
              • {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-semibold text-foreground">
          이 서비스는 당첨을 보장하지 않습니다. 재미로 즐겨 주세요.
        </p>
      </Card>
    </section>
  );
}

import Link from 'next/link';
import { Card } from '@/components/ui/card';

/**
 * 로또 페이지 SEO 콘텐츠 섹션 컴포넌트
 *
 * @description
 * 로또 추천 방식에 대한 상세 정보를 제공하는 SEO 최적화 콘텐츠 섹션입니다.
 * 6가지 추천 방식 비교표, AI/확률통계 접근 방식 설명, 과거 회차 데이터 추출 방식을 포함합니다.
 *
 * @remarks
 * - 검색 엔진 최적화를 위한 구조화된 콘텐츠 제공
 * - 사용자에게 각 추천 방식의 차이점을 명확히 설명
 * - 최신 회차 정보 링크를 동적으로 생성
 */
interface LottoContentSectionProps {
  /** 최신 로또 회차 번호 */
  latestRound?: number;
  /** 최신 로또 추첨 날짜 */
  latestDrawDate?: string;
}

/**
 * 6가지 로또 추천 방식 비교 테이블 데이터
 *
 * @constant
 * @description 각 추천 방식의 작동 원리, 기준, 추천 대상을 정의합니다.
 */
const RECOMMEND_METHOD_ROWS = [
  {
    method: '랜덤 추천',
    how: '완전 무작위로 6개 번호 조합',
    basis: '실시간 랜덤 샘플링',
    target: '빠르게 번호를 고르고 싶을 때',
  },
  {
    method: 'AI 통계 분석',
    how: '가중치 기반으로 번호 선택',
    basis: '과거 회차 통계 + 분포 패턴',
    target: '데이터 기반 선택을 선호할 때',
  },
  {
    method: '날짜 추천',
    how: '입력 날짜를 시드로 번호 생성',
    basis: '날짜 문자열 시드 규칙',
    target: '의미 있는 날짜를 반영하고 싶을 때',
  },
  {
    method: 'MBTI 추천',
    how: '성향 타입 기반 시드 조합',
    basis: 'MBTI 타입 + 기준일',
    target: '재미 요소를 원할 때',
  },
  {
    method: '행운 번호 추천',
    how: '선택한 번호를 포함해 조합',
    basis: '사용자 입력 행운 번호',
    target: '고정 선호 번호가 있을 때',
  },
  {
    method: '슬롯 머신 추천',
    how: '슬롯 인터랙션 기반 조합 생성',
    basis: '슬롯 결과 기반 랜덤',
    target: '게임처럼 즐기고 싶을 때',
  },
] as const;

/**
 * AI 통계 vs 확률통계 접근 방식 요약
 *
 * @constant
 * @description 두 가지 주요 추천 알고리즘 접근 방식의 차이점을 설명합니다.
 */
const APPROACH_SUMMARY = [
  {
    title: 'AI 수학 접근',
    description:
      '과거 회차 데이터에서 출현 빈도, 최근 추세, 번호 동반 출현, 분포 균형 지표를 함께 반영해 가중 샘플링 방식으로 번호를 추천합니다.',
  },
  {
    title: '확률통계 접근',
    description:
      '고빈도·저빈도·미출현·균형·핫·콜드 전략 중 하나를 선택해 기준에 맞는 번호 풀을 만들고, 그 안에서 조합을 생성합니다.',
  },
] as const;

/**
 * 로또 페이지 SEO 콘텐츠 섹션
 *
 * @param props - 컴포넌트 props
 * @returns SEO 최적화된 콘텐츠 섹션
 *
 * @example
 * ```tsx
 * <LottoContentSection
 *   latestRound={1150}
 *   latestDrawDate="2024-03-05"
 * />
 * ```
 */
export function LottoContentSection({
  latestRound,
  latestDrawDate,
}: LottoContentSectionProps) {
  return (
    <section aria-labelledby="lotto-seo-content-title" className="space-y-6">
      <Card className="p-6 md:p-8">
        <div className="prose prose-sm sm:prose-base max-w-none">
          <h2 id="lotto-seo-content-title">
            AI 로또 번호 추천 방식 한눈에 보기
          </h2>
          <p>
            이 페이지는 번호 선택에 드는 고민을 줄이기 위해 6가지 추천 방식을
            한곳에 정리했습니다. 복잡한 계산을 직접 하지 않아도 방식별 기준을
            비교하며 조합을 고를 수 있도록 구성했습니다. 모든 결과는 오락 및
            참고 목적의 추천 정보입니다.
          </p>

          <h3>6가지 추천 방식 비교</h3>
          <div className="not-prose overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">
                    추천 방식
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">
                    어떻게 추천하나
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">
                    어떤 기준을 쓰나
                  </th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">
                    이런 분께 추천
                  </th>
                </tr>
              </thead>
              <tbody>
                {RECOMMEND_METHOD_ROWS.map(row => (
                  <tr key={row.method} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{row.method}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.how}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.basis}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.target}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>AI 수학 접근 vs 확률통계 접근</h3>
        <div className="not-prose grid gap-4 md:grid-cols-2">
            {APPROACH_SUMMARY.map(item => (
              <div
                key={item.title}
                className="rounded-lg border border-border p-4"
              >
                <h4 className="text-base font-semibold text-foreground">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <h3>과거 회차 데이터 추출 방식</h3>
          <p>
            회차별 당첨 번호를 집계해 번호별 출현 빈도, 최근성, 동반 출현 패턴
            같은 핵심 지표를 추출합니다. 추출된 데이터는 각 추천 방식에서 번호
            조합 기준으로 사용되며, 분포 편중을 줄이는 참고값으로 반영됩니다.
          </p>

          <h3>추가 정보</h3>
          {latestDrawDate && (
            <p className="text-sm text-muted-foreground">최신 기준 데이터: {latestDrawDate}</p>
          )}
          <p>더 자세한 데이터는 아래 페이지에서 확인할 수 있습니다.</p>
          <ul>
            <li>
              <Link href="/tools/lotto/stats">로또 번호 통계 페이지</Link>
            </li>
            {latestRound ? (
              <li>
                <Link href={`/tools/lotto/round/${latestRound}`}>
                  로또 {latestRound}회차 분석 페이지
                </Link>
              </li>
            ) : null}
          </ul>
          <p>
            로또는 완전 무작위 추첨이며 추천 방식이 달라도 모든 번호 조합의 당첨
            확률은 동일합니다. 본 서비스의 결과는 오락 및 참고 목적으로만 활용해
            주세요.
          </p>
        </div>
      </Card>
    </section>
  );
}

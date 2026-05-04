import type { Metadata } from 'next'
import Link from 'next/link'
import type { ComponentType } from 'react'
import { ArrowRightIcon, BlocksIcon, CpuIcon, FileTextIcon, LightbulbIcon, ShieldCheckIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, JsonLdMultiple } from '@/components/seo'
import {
  SITE_CONFIG,
  generateMetadata as createMetadata,
  createPageStructuredData,
} from '@/lib/seo'
import { createAboutMetadataInput } from '@/lib/seo/site-section-seo'

interface AboutSection {
  title: string
  description: string
  details: string[]
}

interface FlowStep {
  number: number
  title: string
  description: string
}

interface Highlight {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}

const HIGH_LEVEL_SECTIONS: AboutSection[] = [
  {
    title: '무엇을 제공하나요?',
    description: 'Zento는 수도권 부모가 아이와 갈 곳을 먼저 찾고, 필요한 도구와 혜택 정보를 바로 이어서 확인할 수 있게 정리하는 실전형 사이트입니다.',
    details: [
      '장소 에서는 서울·경기·인천 기준으로 아이와 가볼 곳을 지역과 조건별로 빠르게 좁힐 수 있게 정리합니다.',
      '도구에서는 나들이 예산, 생활비, 금융 판단처럼 실제 돈이 걸린 계산을 빠르게 확인할 수 있습니다.',
      '혜택 와 블로그 가이드는 공식 출처와 체크리스트를 함께 보여줘 다음 행동으로 이어지게 설계합니다.',
    ],
  },
  {
    title: '어떤 상황에 유용한가요?',
    description: '검색 결과를 많이 읽어도 어디를 가야 할지, 얼마가 드는지, 어떤 지원을 받을 수 있는지 결론이 잘 안 나는 순간에 쓰기 좋습니다.',
    details: [
      '비 오는 날, 무료, 실내 같은 조건으로 아이와 갈 곳을 빨리 좁히고 싶을 때',
      '나들이 전후로 예산과 생활비 판단을 함께 정리하고 싶을 때',
      '정부 지원과 지역 혜택을 공식 출처 기준으로 다시 확인하고 싶을 때',
    ],
  },
  {
    title: '어떻게 신뢰를 쌓나요?',
    description: '단순 요약보다 출처, 적용 조건, 예외를 함께 보여줘서 오해를 줄이는 방식으로 운영합니다.',
    details: [
      '공식 기관·공개 자료를 우선 출처로 삼고, 변동 가능성이 있는 정보는 별도로 표시합니다.',
      '계산 결과는 참고용인지 실제 신청 전 검토용인지 성격을 분명히 나눠 설명합니다.',
      '공통 FAQ와 도구별 FAQ를 나눠 사용법과 주의사항을 빠르게 확인할 수 있게 구성합니다.',
    ],
  },
]

const GUIDE_STEPS: FlowStep[] = [
  {
    number: 1,
    title: '상황을 찾는다',
    description: '장소 와 가이드에서 지역, 연령, 날씨, 예산 같은 현실 조건을 먼저 좁힙니다.',
  },
  {
    number: 2,
    title: '계산하고 비교한다',
    description: '관련 도구를 열어 예산, 비용, 조건을 빠르게 계산하고 비교합니다.',
  },
  {
    number: 3,
    title: '결정 전에 다시 확인한다',
    description: '혜택 정보, 체크리스트, 공유 링크로 같은 조건을 다시 보며 실수를 줄입니다.',
  },
]

const STATS_HIGHLIGHTS: Highlight[] = [
  {
    icon: BlocksIcon,
    title: '장소·도구·혜택 연결',
    description: '장소를 찾고 끝나는 것이 아니라 예산 계산과 혜택 확인까지 한 흐름으로 이어집니다.',
  },
  {
    icon: CpuIcon,
    title: '현실 조건 중심 설계',
    description: '지역, 연령, 날씨, 예산처럼 부모가 실제로 먼저 보는 조건을 앞에 둡니다.',
  },
  {
    icon: LightbulbIcon,
    title: '비교표와 체크리스트',
    description: '숫자와 선택 기준을 함께 보여줘서 결론을 내리기 쉽게 돕습니다.',
  },
  {
    icon: ShieldCheckIcon,
    title: '출처와 한계 표시',
    description: '주의사항과 적용 조건을 함께 적어 오해가 생길 여지를 줄입니다.',
  },
]

export const metadata: Metadata = createMetadata(
  createAboutMetadataInput(SITE_CONFIG.url)
)

function AboutCard({ section }: { section: AboutSection }) {
  return (
    <Card className="space-y-3 p-6">
      <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
      <p className="text-muted-foreground leading-relaxed">{section.description}</p>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {section.details.map((detail) => (
          <li key={detail} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default function AboutPage() {
  const { webPage, breadcrumb } = createPageStructuredData({
    name: 'Zento 소개',
    path: '/about',
    description: 'Zento는 수도권 부모가 아이와 갈 곳, 필요한 도구, 혜택 정보를 빠르게 찾도록 돕는 사이트입니다.',
    breadcrumbs: [{ name: '홈', url: '/' }, { name: '소개' }],
  })

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb]} />

      <div className="min-h-screen bg-background pt-10 md:pt-24 xl:pt-32">
        <header className="border-b border-border bg-card/80">
          <div className="mx-auto max-w-5xl space-y-4 px-4 py-10 sm:px-6 lg:px-8">
            <Badge variant="secondary">Zento Overview</Badge>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Zento에 대해</h1>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
              Zento는 수도권 부모가 아이와 갈 곳을 먼저 찾고, 필요한 도구와 혜택 정보를 바로 이어서 확인할 수 있게 정리한 사이트입니다.
              장소 탐색이 메인 과업이고, 블로그와 도구, 혜택 정보는 그 다음 판단을 돕는 보조 축으로 설계했습니다.
            </p>
            <Breadcrumb items={[{ name: '소개' }]} />
          </div>
        </header>

        <main className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {STATS_HIGHLIGHTS.map((item) => {
              const Icon = item.icon

              return (
                <Card
                  key={item.title}
                  className="border border-border/70 p-5 transition-shadow hover:shadow-md"
                >
                  <div className="inline-flex items-center gap-2 text-primary">
                    <Icon className="h-4 w-4" />
                    <h2 className="font-semibold">{item.title}</h2>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              )
            })}
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Zento 핵심 소개</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {HIGH_LEVEL_SECTIONS.map((section) => (
                <AboutCard key={section.title} section={section} />
              ))}
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-[1fr_1fr]">
            <Card className="p-6">
              <h2 className="text-xl font-semibold">일반 이용 흐름</h2>
              <ol className="mt-4 space-y-3">
                {GUIDE_STEPS.map((step) => (
                  <li key={step.number} className="rounded-lg border border-border/70 p-3">
                    <p className="text-sm font-semibold text-foreground">{step.number}. {step.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                  </li>
                ))}
              </ol>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-6">
              <h2 className="text-xl font-semibold">한눈에 보는 안내</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                핵심 축은 아이와 갈 곳 탐색입니다. 도구와 혜택 정보는 그 다음 단계에서 바로 이어질 수 있게 배치합니다.
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-foreground">핵심 경로</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">장소 먼저 찾기</span>
                  <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">도구로 계산·비교</span>
                  <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">혜택 다시 확인</span>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/tools" className="inline-flex items-center">
                    툴 둘러보기
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/faq" className="inline-flex items-center">
                    FAQ 확인하기
                    <FileTextIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </section>

          <Card className="p-6">
            <h2 className="text-xl font-semibold">자주 가는 바로가기</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              원하는 기능으로 이동해 바로 시작하세요.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Link href="/tools" className="text-primary underline-offset-4 hover:underline">
                전체 도구 보기
              </Link>
              <Link href="/blog" className="text-primary underline-offset-4 hover:underline">
                블로그 보기
              </Link>
              <Link href="/tools/lotto" className="text-primary underline-offset-4 hover:underline">
                로또 번호 추천
              </Link>
              <Link href="/tools/loan-calculator" className="text-primary underline-offset-4 hover:underline">
                대출 계산기
              </Link>
              <Link href="/tools/dsr-calculator" className="text-primary underline-offset-4 hover:underline">
                DSR 계산기
              </Link>
              <Link href="/tools/savings-calculator" className="text-primary underline-offset-4 hover:underline">
                적금/저축 계산기
              </Link>
            </div>
          </Card>
        </main>
      </div>
    </>
  )
}

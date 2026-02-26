import type { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import {
  generateMetadata as createMetadata,
  createPageStructuredData,
  createFAQSchema,
} from '@/lib/seo'
import { Breadcrumb, JsonLdMultiple } from '@/components/seo'

interface FaqItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Zento는 어떤 사이트인가요?',
    answer:
      'Zento는 복잡한 정보를 단순하게 전달하는 정보/도구 플랫폼으로, 블로그 콘텐츠와 실용 도구를 함께 제공합니다.',
  },
  {
    question: '어떤 콘텐츠를 제공하나요?',
    answer:
      '웹 개발, 생산성, 실생활에 도움이 되는 주제를 중심으로 글을 발행하며, 바로 사용할 수 있는 도구도 함께 제공합니다.',
  },
  {
    question: '도구는 무료로 사용할 수 있나요?',
    answer:
      '현재 공개된 기본 도구는 별도 회원가입 없이 무료로 사용할 수 있습니다.',
  },
  {
    question: '로또 번호 생성기는 어떻게 동작하나요?',
    answer:
      '1부터 45 사이 숫자 중 중복되지 않는 6개 번호를 무작위로 생성하며, 생성 결과를 쉽게 확인하고 저장할 수 있습니다.',
  },
  {
    question: '새 콘텐츠는 얼마나 자주 업데이트되나요?',
    answer:
      '주요 주제의 최신성 유지를 목표로 정기적으로 콘텐츠를 업데이트하며, 기존 글도 필요한 경우 지속적으로 보완합니다.',
  },
  {
    question: '검색에서 사이트링크는 바로 노출되나요?',
    answer:
      '사이트링크는 검색엔진이 사이트 구조와 신뢰도를 바탕으로 자동 생성하므로 즉시 보장되지는 않으며, 내부 링크/구조화 데이터/색인 상태를 지속적으로 개선해야 합니다.',
  },
  {
    question: '문의나 제안은 어디에서 할 수 있나요?',
    answer:
      '현재는 사이트 내 공개된 페이지를 통해 정보를 제공하고 있으며, 추후 제안 접수 채널이 준비되면 안내할 예정입니다.',
  },
  {
    question: '모바일에서도 동일하게 사용할 수 있나요?',
    answer:
      '네. Zento는 반응형 UI를 적용해 모바일과 데스크톱에서 모두 사용할 수 있도록 구성되어 있습니다.',
  },
]

export const metadata: Metadata = createMetadata({
  title: '자주 묻는 질문',
  description:
    'Zento 이용 전 자주 묻는 질문을 확인하세요. 서비스 소개, 콘텐츠, 도구 사용 방법을 한눈에 볼 수 있습니다.',
  canonical: 'https://www.zento.kr/faq',
  keywords: ['FAQ', '자주 묻는 질문', 'Zento', '도구 사용 방법'],
})

export default function FaqPage() {
  const { webPage, breadcrumb } = createPageStructuredData({
    name: '자주 묻는 질문',
    path: '/faq',
    description:
      'Zento 이용 전 자주 묻는 질문을 확인하세요. 서비스 소개와 도구 사용 방법을 제공합니다.',
    breadcrumbs: [{ name: '홈', url: '/' }, { name: 'FAQ' }],
  })
  const faqSchema = createFAQSchema(FAQ_ITEMS)

  return (
    <>
      <JsonLdMultiple data={[webPage, breadcrumb, faqSchema]} />
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumb items={[{ name: 'FAQ' }]} className="mb-4" />
            <h1 className="text-3xl font-bold text-foreground">
              자주 묻는 질문 (FAQ)
            </h1>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Zento 이용 시 많이 묻는 질문을 모았습니다.
            </p>
          </div>
        </header>

        <main className="mx-auto grid max-w-5xl gap-4 px-4 py-10 sm:px-6 lg:px-8">
          {FAQ_ITEMS.map((item) => (
            <Card key={item.question} className="p-6">
              <h2 className="text-lg font-semibold">{item.question}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </Card>
          ))}

          <Card className="p-6">
            <h2 className="text-lg font-semibold">추가로 확인해보세요</h2>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link href="/about" className="text-primary hover:underline">
                About
              </Link>
              <Link href="/tools" className="text-primary hover:underline">
                도구 모음
              </Link>
              <Link href="/blog" className="text-primary hover:underline">
                블로그
              </Link>
            </div>
          </Card>
        </main>
      </div>
    </>
  )
}

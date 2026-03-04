import type { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, MailIcon } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionIndicator,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  generateMetadata as createMetadata,
  createPageStructuredData,
  createFAQSchema,
} from '@/lib/seo';
import { Breadcrumb, JsonLdMultiple } from '@/components/seo';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Zento는 어떤 사이트인가요?',
    answer:
      'Zento는 일상과 업무에 바로 도움이 되는 유용한 정보와 꿀팁을 정리해 제공하는 웹사이트입니다.',
  },
  {
    question: '현재 어떤 콘텐츠를 다루나요?',
    answer:
      'AI 프롬프트 사용법, 주차정보, 로또 추첨번호 관련 정보와 함께 각종 계산기 기능을 지속적으로 확대해 제공하고 있습니다.',
  },
  {
    question: 'AI 프롬프트 사용법은 어디서 볼 수 있나요?',
    answer:
      '블로그의 AI 이미지/프롬프트 카테고리에서 초보자도 바로 활용할 수 있는 예시와 작성 팁을 확인하실 수 있습니다.',
  },
  {
    question: '주차정보는 어떤 방식으로 제공되나요?',
    answer:
      '역/시설별 주차요금, 할인 조건, 실전 선택 팁을 비교형 가이드로 정리해 상황에 맞게 빠르게 확인할 수 있도록 제공합니다.',
  },
  {
    question: '로또 추첨번호 관련 기능은 어떻게 이용하나요?',
    answer:
      '도구 모음의 로또 번호 생성기에서 1부터 45 사이 숫자 중 중복되지 않는 번호를 생성해 참고용으로 활용하실 수 있습니다.',
  },
  {
    question: '각종 계산기 기능은 지금도 사용할 수 있나요?',
    answer:
      '현재 공개된 기능을 기반으로 운영 중이며, 실사용 빈도가 높은 계산기 기능을 중심으로 계속 확장하고 있습니다.',
  },
  {
    question: '도구는 무료로 사용할 수 있나요?',
    answer:
      '현재 공개된 기본 도구는 별도 회원가입 없이 무료로 사용할 수 있습니다.',
  },
  {
    question: '새 콘텐츠는 얼마나 자주 업데이트되나요?',
    answer:
      '새로운 정보와 기존 글 보완을 함께 진행하며, 유용한 정보와 꿀팁을 꾸준히 업데이트하고 있습니다.',
  },
  {
    question: '문의나 협력 제안은 어디로 보내면 되나요?',
    answer:
      '페이지 하단의 문의 및 협력 안내를 통해 이메일로 연락하실 수 있습니다.',
  },
  {
    question: '모바일에서도 동일하게 사용할 수 있나요?',
    answer:
      '네. Zento는 반응형 UI를 적용해 모바일과 데스크톱에서 모두 사용할 수 있도록 구성되어 있습니다.',
  },
];

export const metadata: Metadata = createMetadata({
  title: '자주 묻는 질문',
  description:
    'Zento FAQ에서 유용한 정보와 꿀팁, AI 프롬프트 사용법, 주차정보, 로또 추첨번호, 문의 및 협력 방법을 확인하세요.',
  canonical: 'https://www.zento.kr/faq',
  keywords: [
    'FAQ',
    '자주 묻는 질문',
    'Zento',
    'AI 프롬프트',
    '주차정보',
    '로또 추첨번호',
  ],
});

export default function FaqPage() {
  const { webPage, breadcrumb } = createPageStructuredData({
    name: '자주 묻는 질문',
    path: '/faq',
    description:
      'Zento 이용 전 자주 묻는 질문을 확인하세요. 유용한 정보와 꿀팁, 도구 사용, 문의 및 협력 방법을 제공합니다.',
    breadcrumbs: [{ name: '홈', url: '/' }, { name: 'FAQ' }],
  });
  const faqSchema = createFAQSchema(FAQ_ITEMS);

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
              Zento의 유용한 정보와 꿀팁 콘텐츠, 도구 이용 방법, 문의 및 협력
              안내를 한곳에 모았습니다.
            </p>
          </div>
        </header>

        <main className="mx-auto grid max-w-5xl gap-4 px-4 py-10 sm:px-6 lg:px-8">
          <Card className="p-6">
            <h2 className="text-lg font-semibold">Zento 한눈에 보기</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Zento는 유용한 정보와 꿀팁을 쉽게 찾아볼 수 있도록 구성한
              웹사이트입니다. AI 프롬프트 사용법, 주차정보, 로또 추첨번호 관련
              내용과 함께 각종 계산기 기능도 지속적으로 확장하고 있습니다.
            </p>
          </Card>

          <Accordion type="single">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className="border-border bg-card overflow-hidden rounded-xl border shadow-sm transition-all data-[state=open]:border-foreground/10 data-[state=open]:bg-muted/30 data-[state=open]:shadow-md"
              >
                <h2>
                  <AccordionTrigger className="px-5 py-4">
                    <span className="text-base font-semibold">{item.question}</span>
                    <AccordionIndicator />
                  </AccordionTrigger>
                </h2>

                <AccordionContent className="px-5 pb-5">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Card className="border-primary/30 from-primary/10 via-card to-card p-0 bg-gradient-to-br">
            <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-3">
                <span className="bg-primary/15 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                  <MailIcon className="h-3.5 w-3.5" />
                  문의 및 협력
                </span>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    제휴/협업 문의를 받고 있습니다
                  </h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    콘텐츠 제안, 협력, 비즈니스 문의는 메일로 보내주시면
                    확인 후 답변드리겠습니다.
                  </p>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  wnsdyd21@gmail.com
                </p>
              </div>

              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href="mailto:wnsdyd21@gmail.com">
                  메일 보내기
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold">추가로 확인해보세요</h2>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link
                href="/blog/ai-image-creator"
                className="text-primary hover:underline"
              >
                AI 프롬프트 사용법
              </Link>
              <Link href="/blog/parking" className="text-primary hover:underline">
                주차정보 모아보기
              </Link>
              <Link href="/tools/lotto" className="text-primary hover:underline">
                로또 추첨번호 도구
              </Link>
              <Link href="/tools" className="text-primary hover:underline">
                도구 모음
              </Link>
            </div>
          </Card>
        </main>
      </div>
    </>
  );
}

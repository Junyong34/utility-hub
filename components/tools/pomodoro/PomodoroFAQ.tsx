'use client';

import {
  Accordion,
  AccordionContent,
  AccordionIndicator,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ_DATA = [
  {
    id: 'pomodoro-faq-1',
    question: '새로고침해도 진행 중인 타이머가 유지되나요?',
    answer:
      '네. 진행 중이거나 일시정지된 타이머는 브라우저 로컬 저장소에 저장되어 새로고침 후 복구됩니다. 다만 브라우저 저장소를 비우거나 프라이빗 모드 제한이 있으면 복구되지 않을 수 있습니다.',
  },
  {
    id: 'pomodoro-faq-2',
    question: '탭을 다른 곳으로 옮겨도 시간이 정확한가요?',
    answer:
      '이 도구는 화면 갱신 간격이 아니라 실제 시각 기준으로 남은 시간을 계산합니다. 그래서 백그라운드 탭에서 돌아와도 남은 시간을 다시 계산합니다.',
  },
  {
    id: 'pomodoro-faq-3',
    question: '사운드가 재생되지 않을 때는 어떻게 되나요?',
    answer:
      '브라우저 정책상 자동 재생이 막히면 사운드는 생략되고, 완료 애니메이션과 상태 메시지로 타이머 종료를 알려줍니다.',
  },
  {
    id: 'pomodoro-faq-4',
    question: 'Task Mode에서는 무엇이 달라지나요?',
    answer:
      'Quick Start는 바로 시작하는 모드이고, Task Mode는 제목과 시간을 가진 작업을 여러 개 쌓아두고 선택해서 집중할 수 있는 모드입니다.',
  },
];

export function PomodoroFAQ() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">자주 묻는 질문</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          타이머 복구, 정확도, 사운드 정책처럼 실제 사용 중 자주 부딪히는 내용을
          먼저 정리했습니다.
        </p>
      </div>

      <Accordion type="single" className="w-full space-y-3">
        {FAQ_DATA.map(faq => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="rounded-lg border bg-card px-4 py-3 shadow-sm"
          >
            <AccordionTrigger className="py-2 text-left font-medium hover:no-underline">
              <span className="flex-1 pr-4">{faq.question}</span>
              <AccordionIndicator />
            </AccordionTrigger>
            <AccordionContent className="pb-1 pt-2 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

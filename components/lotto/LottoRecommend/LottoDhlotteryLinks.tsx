'use client';

import { ExternalLink } from 'lucide-react';

interface LottoDhlotteryLink {
  label: string;
  url: string;
}

interface LottoDhlotteryLinksProps {
  title?: string;
  compact?: boolean;
  className?: string;
}

const LOTTO_DHLOTTERY_LINKS: LottoDhlotteryLink[] = [
  {
    label: '동행복권 결과 조회',
    url: 'https://www.dhlottery.co.kr/lt645/result',
  },
  {
    label: '동행복권 로또 구매 (모바일)',
    url: 'https://ol.dhlottery.co.kr/olotto/game_mobile/game645.do',
  },
  {
    label: '동행복권 로또 구매 (PC)',
    url: 'https://el.dhlottery.co.kr/game/TotalGame.jsp?LottoId=LO40',
  },
  {
    label: '복권 당첨자 가이드',
    url: 'https://www.dhlottery.co.kr/guide/wnrGuide',
  },
];

export function LottoDhlotteryLinks({
  title = '추가 정보',
  compact = false,
  className,
}: LottoDhlotteryLinksProps) {
  const headingClass = compact ? 'text-xs font-semibold' : 'text-sm font-bold';
  const linkClass = compact
    ? 'text-xs px-2 py-1.5'
    : 'text-sm px-2.5 py-2';

  return (
    <section className={className} aria-label="동행복권 링크 모음">
      <h4 className={`${headingClass} text-foreground mb-2`}>{title}</h4>
      <div className="grid grid-cols-2 gap-2">
        {LOTTO_DHLOTTERY_LINKS.map((item) => (
          <a
            key={item.label}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-start justify-between gap-2 rounded-lg border border-border/70 bg-card text-foreground hover:bg-muted transition-colors ${linkClass}`}
            aria-label={`${item.label} (새 탭으로 열기)`}
          >
            <span>{item.label}</span>
            <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
          </a>
        ))}
      </div>
    </section>
  );
}

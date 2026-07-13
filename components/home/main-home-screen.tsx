import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRightIcon,
  BabyIcon,
  Building2Icon,
  CakeIcon,
  CloudSunIcon,
  MapPinIcon,
  MilkIcon,
  PartyPopperIcon,
  SchoolIcon,
  WalletCardsIcon,
} from 'lucide-react';
import { cn } from '@/shared/ui/class-names';
import type { HomeFeaturedPlaceCardItem } from '@/types/home';

type FeatureVisual = 'region' | 'indoor' | 'age' | 'tool' | 'guide';

interface PriorityLink {
  label: string;
  title: string;
  description: string;
  href: string;
  tone: ConditionLink['tone'];
}

interface FeatureCard {
  number: string;
  title: string;
  description: string;
  href: string;
  visual: FeatureVisual;
}

interface ConditionLink {
  title: string;
  value: string;
  href: string;
  icon: LucideIcon;
  tone: 'sun' | 'sky' | 'mint' | 'peach' | 'sand' | 'ink';
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    number: '01',
    title: '지역으로 찾기',
    description: '서울·경기·인천 원하는 지역을 선택해 주변 명소를 확인하세요.',
    href: '/places',
    visual: 'region',
  },
  {
    number: '02',
    title: '비 오는 날 실내',
    description: '날씨 걱정 없는 실내 장소만 모아 간편하게 찾아보세요.',
    href: '/places?rain=true',
    visual: 'indoor',
  },
  {
    number: '03',
    title: '연령별 추천',
    description: '연령에 맞는 테마와 코스로 더 알맞은 장소를 추천해요.',
    href: '/places?age=3-6y',
    visual: 'age',
  },
  {
    number: '04',
    title: '생활 계산 도구',
    description: '외출 전후 가계 흐름을 도구 페이지에서 함께 점검하세요.',
    href: '/tools',
    visual: 'tool',
  },
  {
    number: '05',
    title: '최신 육아 가이드',
    description:
      '계절별 추천, 준비물, 아이와 가는 팁까지 가이드에서 확인하세요.',
    href: '/blog',
    visual: 'guide',
  },
];

const CONDITION_LINKS: ConditionLink[] = [
  {
    title: '날씨',
    value: '비 오는 날 가능',
    href: '/places?rain=true',
    icon: CloudSunIcon,
    tone: 'sun',
  },
  {
    title: '실내',
    value: '실내 장소',
    href: '/places?indoor=true',
    icon: Building2Icon,
    tone: 'sky',
  },
  {
    title: '수유실',
    value: '수유실 있음',
    href: '/places?feeding=true',
    icon: MilkIcon,
    tone: 'peach',
  },
  {
    title: '유모차',
    value: '유모차 가능',
    href: '/places?stroller=true',
    icon: BabyIcon,
    tone: 'sand',
  },
  {
    title: '가격',
    value: '무료 장소',
    href: '/places?free=true',
    icon: WalletCardsIcon,
    tone: 'ink',
  },
  {
    title: '아이 연령',
    value: '3~6세',
    href: '/places?age=3-6y',
    icon: BabyIcon,
    tone: 'mint',
  },
];

const TONE_CLASS: Record<ConditionLink['tone'], string> = {
  sun: 'bg-[#fff2d8] text-[#b6490b]',
  sky: 'bg-[#edf5ff] text-[#345a7b]',
  mint: 'bg-[#e9f6ee] text-[#316244]',
  peach: 'bg-[#fff0e7] text-[#a84722]',
  sand: 'bg-[#f7edd9] text-[#725936]',
  ink: 'bg-[#f0ede8] text-[#211712]',
};

const PRIORITY_LINKS: PriorityLink[] = [
  {
    label: '혜택',
    title: '2026 육아 혜택·지원금',
    description: '부모급여, 아동수당, 보육 지원을 한 번에 확인합니다.',
    href: '/benefits',
    tone: 'sky',
  },
  {
    label: '도구',
    title: '주택 구입 비용 계산기',
    description: '취득세, 중개보수, 필요 자기자본을 같이 계산합니다.',
    href: '/tools/home-buying-funds-calculator',
    tone: 'sand',
  },
  {
    label: '도구',
    title: 'DSR 계산기',
    description: '연소득과 보유 대출 기준으로 대출 여력을 점검합니다.',
    href: '/tools/dsr-calculator',
    tone: 'mint',
  },
  {
    label: '집중',
    title: '뽀모도로 타이머',
    description: '짧은 집중 세션과 작업 단위 관리를 바로 시작합니다.',
    href: '/tools/pomodoro',
    tone: 'sun',
  },
  {
    label: '놀이',
    title: '랜덤 스톱워치 게임',
    description: '여러 명이 함께 쓰는 초 끝자리 점수 게임입니다.',
    href: '/tools/last-digit-game',
    tone: 'peach',
  },
  {
    label: '가이드',
    title: '부모급여·아동수당 가이드',
    description: '아이 나이와 양육 방식별 지원 조합을 비교합니다.',
    href: '/blog/benefits/2026-parenting-benefits-guide',
    tone: 'ink',
  },
];

interface MainHomeScreenProps {
  featuredPlaces: HomeFeaturedPlaceCardItem[];
}

const FEATURE_CARD_LAYOUT: Record<string, string> = {
  '01': 'lg:col-span-2 xl:col-span-4',
  '02': 'lg:col-span-2 xl:col-span-4',
  '03': 'lg:col-span-2 xl:col-span-4',
  '04': 'lg:col-span-3 xl:col-span-6',
  '05': 'lg:col-span-3 xl:col-span-6',
};

export function MainHomeScreen({ featuredPlaces }: MainHomeScreenProps) {
  return (
    <div className="bg-canvas text-foreground">
      <HeroSection />
      <main className="mx-auto max-w-screen-2xl space-y-4 px-4 pt-6 pb-10 sm:space-y-5 sm:pt-8 sm:pb-16 lg:space-y-6 lg:pt-10">
        <FeatureCardGrid />
        <ConditionPanel />
        <PopularPlacesSection places={featuredPlaces} />
        <PriorityLinksSection />
        <WeekendCta />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[39rem] overflow-hidden border-b border-beige-deep/60 bg-cream-soft sm:min-h-[38rem] lg:min-h-[35rem] xl:min-h-[36rem]">
      <Image
        src="/images/home/main-hero-family.webp"
        alt="실내 식물원에서 전시를 바라보는 엄마와 아이"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[74%_center] sm:object-[63%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,248,0.98)_0%,rgba(255,253,248,0.92)_48%,rgba(255,248,231,0.42)_100%)] sm:bg-[linear-gradient(90deg,rgba(255,253,248,0.96)_0%,rgba(255,253,248,0.9)_24%,rgba(255,248,231,0.52)_48%,rgba(255,248,231,0.12)_72%,rgba(255,248,231,0)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_30%,rgba(255,178,56,0.32),transparent_28%)]" />

      <div className="relative mx-auto flex max-w-screen-2xl items-center px-4 pt-32 pb-14 sm:pt-36 lg:min-h-[35rem] xl:min-h-[36rem]">
        <div className="max-w-[56rem]">
          <h1 className="max-w-[56rem] text-[clamp(2.55rem,4.2vw,4.7rem)] leading-[1.14] font-semibold tracking-normal text-foreground [word-break:keep-all]">
            <span className="block">아이와 갈 곳,</span>
            <span className="block">오늘 조건으로 빠르게 찾기</span>
          </h1>
          <p className="mt-6 max-w-[42rem] text-[15px] leading-7 text-slate sm:text-[17px] sm:leading-8">
            서울·경기·인천 아이와 가볼 곳을 빠르게 찾고, 도구와 가이드, 혜택까지
            한 번에 확인하세요.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/places"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_16px_34px_-24px_rgba(255,106,0,0.9)] transition hover:bg-primary-deep active:translate-y-px"
            >
              장소 찾아보기
              <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              href="/benefits"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-foreground px-7 text-sm font-semibold text-on-dark shadow-[0_16px_34px_-24px_rgba(33,23,18,0.9)] transition hover:bg-charcoal active:translate-y-px"
            >
              혜택 확인하기
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCardGrid() {
  return (
    <section
      aria-label="홈 주요 탐색 메뉴"
      className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6 xl:grid-cols-12"
    >
      {FEATURE_CARDS.map(card => (
        <FeatureCardItem key={card.number} card={card} />
      ))}
    </section>
  );
}

function FeatureCardItem({ card }: { card: FeatureCard }) {
  return (
    <Link
      href={card.href}
      rel={card.href.includes('?') ? 'nofollow' : undefined}
      className={cn(
        'group grid min-h-[13.5rem] overflow-hidden rounded-lg border border-beige-deep/55 bg-[linear-gradient(180deg,var(--canvas),var(--cream-soft))] p-4 shadow-[0_12px_34px_-28px_rgba(61,48,39,0.58)] transition hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-[0_18px_44px_-30px_rgba(61,48,39,0.68)] sm:p-5 xl:min-h-[14.5rem] xl:p-6',
        FEATURE_CARD_LAYOUT[card.number]
      )}
    >
      <div className="grid h-full grid-cols-[minmax(0,1fr)_8.5rem] gap-4 xl:grid-cols-[minmax(0,1fr)_10rem]">
        <div className="flex min-w-0 flex-col">
          <span className="text-xs font-semibold text-primary">
            {card.number}
          </span>
          <h2 className="mt-4 text-[1.15rem] leading-tight font-semibold text-foreground [word-break:keep-all] sm:text-[1.28rem]">
            {card.title}
          </h2>
          <p className="mt-4 text-[13px] leading-6 text-slate [word-break:keep-all] sm:text-sm">
            {card.description}
          </p>
        </div>
        <div className="min-w-0 self-stretch">
          <FeatureVisual type={card.visual} />
        </div>
      </div>
    </Link>
  );
}

function FeatureVisual({ type }: { type: FeatureVisual }) {
  if (type === 'region') {
    return <RegionVisual />;
  }

  if (type === 'indoor') {
    return <IndoorVisual />;
  }

  if (type === 'age') {
    return <AgeVisual />;
  }

  if (type === 'tool') {
    return <ToolVisual />;
  }

  return <GuideVisual />;
}

function RegionVisual() {
  return (
    <div className="relative h-full min-h-32 overflow-hidden rounded-md bg-[#f3eee3]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(61,48,39,0.08)_1px,transparent_1px),linear-gradient(rgba(61,48,39,0.08)_1px,transparent_1px)] bg-[length:18px_18px]" />
      <div className="absolute inset-x-5 top-4 bottom-3 rounded-[48%_42%_46%_38%] bg-[#ffd9a3]/80 ring-1 ring-primary/20" />
      <div className="absolute top-8 right-3 rounded-full bg-canvas px-3 py-2 text-[11px] font-semibold shadow-card">
        서울
      </div>
      <div className="absolute right-2 bottom-9 rounded-full bg-canvas px-3 py-2 text-[11px] font-semibold shadow-card">
        경기
      </div>
      <div className="absolute bottom-4 left-4 rounded-full bg-canvas px-3 py-2 text-[11px] font-semibold shadow-card">
        인천
      </div>
      <MapPinIcon className="absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-primary" />
    </div>
  );
}

function IndoorVisual() {
  return (
    <div className="relative h-full min-h-32 overflow-hidden rounded-md bg-cream-soft">
      <Image
        src="/images/places/showcase/indoor-playground.webp"
        alt="비 오는 날 가기 좋은 실내 놀이공간"
        fill
        sizes="9rem"
        className="object-cover object-[54%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,248,0.02),rgba(33,23,18,0.12))]" />
    </div>
  );
}

function AgeVisual() {
  const ages: Array<{
    label: string;
    className: string;
    iconClassName: string;
    icon: LucideIcon;
  }> = [
    {
      label: '0~2세',
      className: 'bg-[#edf5ff]',
      iconClassName: 'bg-[#dbeeff] text-[#345a7b]',
      icon: BabyIcon,
    },
    {
      label: '3~5세',
      className: 'bg-[#fff2d8]',
      iconClassName: 'bg-[#ffe4ad] text-[#b6490b]',
      icon: PartyPopperIcon,
    },
    {
      label: '6~9세',
      className: 'bg-[#fff0e7]',
      iconClassName: 'bg-[#ffdccc] text-[#a84722]',
      icon: CakeIcon,
    },
    {
      label: '10세~',
      className: 'bg-[#f3eee3]',
      iconClassName: 'bg-[#e7dcc8] text-[#725936]',
      icon: SchoolIcon,
    },
  ];

  return (
    <div className="flex h-full min-h-32 flex-col justify-center gap-2 rounded-md bg-canvas/72 px-2.5">
      {ages.map(({ label, className, iconClassName, icon: Icon }) => (
        <span
          key={label}
          className={cn(
            'inline-flex items-center justify-between gap-2 rounded-full border border-beige-deep/50 py-1.5 pr-3 pl-1.5 text-xs font-semibold text-slate shadow-subtle',
            className
          )}
        >
          <span
            className={cn(
              'inline-flex size-6 items-center justify-center rounded-full',
              iconClassName
            )}
          >
            <Icon className="size-3.5" />
          </span>
          {label}
        </span>
      ))}
    </div>
  );
}

function ToolVisual() {
  return (
    <div className="flex h-full min-h-32 items-center justify-center rounded-md bg-canvas/70 p-3">
      <div className="w-full rounded-md bg-canvas p-3 shadow-[0_10px_24px_-16px_rgba(61,48,39,0.5)] ring-1 ring-hairline-soft">
        <div className="mb-3 flex items-center justify-between text-[10px] font-semibold text-slate">
          <span>예상 합계</span>
          <span className="text-foreground">84,000원</span>
        </div>
        {['교통비', '입장료', '식비'].map((label, index) => (
          <div
            key={label}
            className="mb-1.5 flex items-center justify-between text-[10px] text-slate last:mb-0"
          >
            <span>{label}</span>
            <span>{[20000, 40000, 24000][index]?.toLocaleString()}원</span>
          </div>
        ))}
        <div className="mt-3 h-1.5 rounded-full bg-hairline-soft">
          <div className="h-full w-2/3 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}

function GuideVisual() {
  return (
    <div className="flex h-full min-h-32 items-center justify-center rounded-md bg-[linear-gradient(135deg,#f0dfc3,#fffaf0)] p-3">
      <div className="relative h-24 w-20 rotate-[-3deg] rounded-md bg-canvas p-3 shadow-[0_18px_32px_-18px_rgba(61,48,39,0.5)] ring-1 ring-beige-deep/50">
        <div className="h-1.5 w-12 rounded-full bg-primary/70" />
        <div className="mt-3 space-y-1.5">
          <div className="h-1 rounded-full bg-hairline-strong" />
          <div className="h-1 rounded-full bg-hairline-strong" />
          <div className="h-1 w-2/3 rounded-full bg-hairline-strong" />
        </div>
        <span className="absolute right-2 bottom-2 text-[10px] font-semibold text-primary">
          Zento
        </span>
      </div>
    </div>
  );
}

function ConditionPanel() {
  return (
    <section className="rounded-lg border border-beige-deep/60 bg-[linear-gradient(135deg,var(--cream-soft),var(--canvas))] px-4 py-5 shadow-[0_18px_54px_-40px_rgba(61,48,39,0.54)] sm:px-6 sm:py-7 lg:grid lg:grid-cols-[0.9fr_1.35fr] lg:gap-8 lg:px-14 lg:py-9">
      <div className="flex min-w-0 items-start gap-4">
        <span className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card">
          <MapPinIcon className="size-5" />
        </span>
        <div>
          <h2 className="text-[2rem] leading-tight font-semibold tracking-normal text-foreground [word-break:keep-all] sm:text-[2.6rem]">
            오늘의 현실 조건을
            <br />
            먼저 묻습니다
          </h2>
          <p className="mt-4 max-w-[28rem] text-[14px] leading-6 text-slate">
            날씨, 실내 여부, 수유실, 유모차, 가격, 아이 연령까지 현재 지원되는
            조건으로 장소를 바로 좁혀보세요.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:grid-cols-3">
        {CONDITION_LINKS.map(condition => (
          <ConditionCard key={condition.title} condition={condition} />
        ))}
      </div>
    </section>
  );
}

function PopularPlacesSection({
  places,
}: {
  places: HomeFeaturedPlaceCardItem[];
}) {
  if (places.length === 0) {
    return null;
  }

  const [primaryPlace, ...secondaryPlaces] = places.slice(0, 4);

  if (!primaryPlace) {
    return null;
  }

  return (
    <section className="rounded-lg border border-beige-deep/60 bg-[linear-gradient(180deg,var(--canvas),var(--cream-soft))] px-4 py-6 shadow-[0_18px_54px_-42px_rgba(61,48,39,0.56)] sm:px-6 sm:py-7 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-primary">인기 장소</p>
          <h2 className="mt-3 text-[2rem] leading-tight font-semibold tracking-normal text-foreground [word-break:keep-all] sm:text-[2.55rem]">
            이번 주 바로 보기 좋은 대표 장소
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-6 text-slate sm:text-[15px]">
            사진, 지역, 연령, 실내·우천 조건을 함께 보면서 오늘 후보를 빠르게
            비교해보세요.
          </p>
        </div>
        <Link
          href="/places"
          className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-lg border border-beige-deep/70 bg-canvas px-5 text-sm font-semibold text-foreground transition hover:border-primary/45 hover:text-primary"
        >
          전체 장소 보기
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] xl:gap-5">
        <PopularPlaceCard place={primaryPlace} featured />
        <div className="grid gap-4 sm:grid-cols-2">
          {secondaryPlaces.map(place => (
            <PopularPlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularPlaceCard({
  place,
  featured = false,
}: {
  place: HomeFeaturedPlaceCardItem;
  featured?: boolean;
}) {
  const imageSrc = place.thumbnailImage ?? '/images/home/main-hero-family.webp';

  return (
    <Link
      href={place.href}
      className={cn(
        'group overflow-hidden rounded-lg border border-hairline-soft bg-canvas shadow-[0_16px_42px_-34px_rgba(61,48,39,0.62)] transition hover:-translate-y-0.5 hover:border-primary/40',
        featured ? 'grid lg:grid-rows-[minmax(19rem,1fr)_auto]' : 'grid'
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden bg-cream-soft',
          featured ? 'min-h-[19rem] sm:min-h-[21rem]' : 'aspect-[16/10]'
        )}
      >
        <Image
          src={imageSrc}
          alt={`${place.title} 대표 이미지`}
          fill
          sizes={featured ? '(max-width: 1024px) 100vw, 48vw' : '26vw'}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(33,23,18,0.02),rgba(33,23,18,0.44))]" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="rounded-md bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground shadow-subtle">
            {place.regionLabel}
          </span>
          <span className="rounded-md border border-white/45 bg-canvas/82 px-2.5 py-1 text-[11px] font-bold text-foreground shadow-subtle backdrop-blur">
            {place.categoryLabel}
          </span>
        </div>
      </div>

      <div className={cn('p-4', featured && 'sm:p-5')}>
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-primary">
            {place.subRegion}
          </p>
          <p className="text-xs font-medium text-slate">{place.ageLabel}</p>
        </div>
        <h3
          className={cn(
            'mt-2 leading-tight font-semibold text-foreground [word-break:keep-all]',
            featured ? 'text-[1.55rem] sm:text-[1.85rem]' : 'text-lg'
          )}
        >
          {place.title}
        </h3>
        <p
          className={cn(
            'mt-3 text-[13px] leading-5 text-slate [word-break:keep-all]',
            featured && 'sm:text-sm sm:leading-6'
          )}
        >
          {place.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {place.conditions.map(condition => (
            <span
              key={condition}
              className="rounded-full border border-beige-deep/55 bg-cream-soft px-3 py-1 text-[11px] font-semibold text-slate"
            >
              {condition}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function ConditionCard({ condition }: { condition: ConditionLink }) {
  const Icon = condition.icon;

  return (
    <Link
      href={condition.href}
      rel={condition.href.includes('?') ? 'nofollow' : undefined}
      className="group flex min-h-[5.25rem] items-center justify-between gap-4 rounded-lg border border-hairline-soft bg-canvas/92 px-4 shadow-[0_14px_34px_-28px_rgba(61,48,39,0.62)] transition hover:-translate-y-0.5 hover:border-primary/35"
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'inline-flex size-11 shrink-0 items-center justify-center rounded-full',
            TONE_CLASS[condition.tone]
          )}
        >
          <Icon className="size-5" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-foreground">
            {condition.title}
          </span>
          <span className="mt-1 block text-sm font-semibold text-primary">
            {condition.value}
          </span>
        </span>
      </div>
      <ArrowRightIcon className="size-4 shrink-0 text-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function PriorityLinksSection() {
  return (
    <section className="rounded-lg border border-beige-deep/60 bg-canvas px-4 py-6 shadow-[0_18px_54px_-42px_rgba(61,48,39,0.5)] sm:px-6 sm:py-7 lg:px-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold text-primary">가이드와 도구</p>
          <h2 className="mt-3 text-[1.85rem] leading-tight font-semibold tracking-normal text-foreground [word-break:keep-all] sm:text-[2.35rem]">
            자주 쓰는 계산과 확인할 글
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-6 text-slate sm:text-[15px]">
            장소를 고른 뒤 비용, 대출, 지원금, 집중 시간을 바로 이어서
            점검하세요.
          </p>
        </div>
        <Link
          href="/tools"
          className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-lg border border-beige-deep/70 bg-cream-soft px-5 text-sm font-semibold text-foreground transition hover:border-primary/45 hover:text-primary"
        >
          도구 전체 보기
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PRIORITY_LINKS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex min-h-[8.75rem] flex-col justify-between rounded-lg border border-hairline-soft bg-[linear-gradient(180deg,var(--canvas),var(--cream-soft))] p-4 transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_18px_40px_-30px_rgba(61,48,39,0.62)]"
          >
            <div>
              <span
                className={cn(
                  'inline-flex rounded-full px-3 py-1 text-[11px] font-bold',
                  TONE_CLASS[item.tone]
                )}
              >
                {item.label}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-tight text-foreground [word-break:keep-all] transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate [word-break:keep-all]">
                {item.description}
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              바로가기
              <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function WeekendCta() {
  return (
    <section className="relative overflow-hidden rounded-lg border border-primary/50 bg-[linear-gradient(90deg,var(--cream-soft)_0%,var(--canvas)_62%,var(--sunshine-500)_100%)] px-4 py-5 sm:px-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
      <div className="pointer-events-none absolute -right-10 -bottom-16 size-52 rounded-full bg-primary/28" />
      <div className="pointer-events-none absolute -right-4 -bottom-20 size-40 rounded-full border border-white/70" />
      <p className="relative text-center text-[1.7rem] leading-tight font-semibold text-foreground sm:text-[2.15rem] lg:text-left">
        이번 주말 후보를 <span className="text-primary">3분 안에</span>{' '}
        좁혀보세요
      </p>
      <div className="relative mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center lg:mt-0">
        <Link
          href="/places"
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-primary px-12 text-sm font-semibold text-primary-foreground transition hover:bg-primary-deep active:translate-y-px"
        >
          장소 찾아보기
          <ArrowRightIcon className="size-4" />
        </Link>
        <Link
          href="/benefits"
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-foreground px-12 text-sm font-semibold text-on-dark transition hover:bg-charcoal active:translate-y-px"
        >
          혜택 확인하기
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </section>
  );
}

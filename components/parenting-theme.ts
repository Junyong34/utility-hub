import type { PlaceCategory, RegionSlug } from '@/types/place-source';

export type ParentingTone = 'sand' | 'mint' | 'sky' | 'peach' | 'butter';

export const PARENTING_PANEL_CLASS =
  'border border-hairline-soft bg-[linear-gradient(180deg,var(--cream-soft),var(--canvas))] shadow-card';

export const PARENTING_INSET_PANEL_CLASS =
  'border border-hairline-soft bg-canvas/72 shadow-subtle';

export const PARENTING_MUTED_SURFACE_CLASS =
  'border border-hairline-soft bg-[linear-gradient(180deg,var(--canvas),var(--surface))] shadow-card';

export const PARENTING_SOFT_GRID_STYLE =
  'linear-gradient(90deg, color-mix(in srgb, var(--primary) 5%, transparent) 1px, transparent 1px), linear-gradient(color-mix(in srgb, var(--primary) 5%, transparent) 1px, transparent 1px)';

export const PARENTING_TONE_STYLES: Record<
  ParentingTone,
  {
    frame: string;
    accent: string;
    iconWrap: string;
    icon: string;
    badge: string;
    eyebrow: string;
    softPanel: string;
    fallback: string;
  }
> = {
  sand: {
    frame:
      'border-beige-deep/70 bg-[linear-gradient(180deg,var(--canvas),var(--cream-soft))] hover:border-primary/35',
    accent: 'from-cream-soft to-cream',
    iconWrap: 'bg-cream',
    icon: 'text-sunshine-900',
    badge: 'border-beige-deep/55 bg-cream text-slate',
    eyebrow: 'text-sunshine-900',
    softPanel: 'bg-cream',
    fallback: 'from-cream-soft via-canvas to-cream',
  },
  mint: {
    frame:
      'border-[oklch(84%_0.04_155)] bg-[linear-gradient(180deg,var(--canvas),oklch(97%_0.025_155))] hover:border-[oklch(68%_0.07_155)]',
    accent: 'from-[oklch(96%_0.035_155)] to-[oklch(91%_0.055_155)]',
    iconWrap: 'bg-[oklch(94%_0.045_155)]',
    icon: 'text-[oklch(34%_0.07_155)]',
    badge:
      'border-[oklch(84%_0.04_155)] bg-[oklch(95%_0.04_155)] text-[oklch(34%_0.07_155)]',
    eyebrow: 'text-[oklch(36%_0.07_155)]',
    softPanel: 'bg-[oklch(96%_0.035_155)]',
    fallback: 'from-[oklch(94%_0.05_155)] via-canvas to-[oklch(91%_0.055_155)]',
  },
  sky: {
    frame:
      'border-[oklch(84%_0.035_235)] bg-[linear-gradient(180deg,var(--canvas),oklch(97%_0.02_235))] hover:border-[oklch(69%_0.065_235)]',
    accent: 'from-[oklch(96%_0.03_235)] to-[oklch(91%_0.05_235)]',
    iconWrap: 'bg-[oklch(94%_0.04_235)]',
    icon: 'text-[oklch(36%_0.07_235)]',
    badge:
      'border-[oklch(84%_0.035_235)] bg-[oklch(95%_0.035_235)] text-[oklch(36%_0.07_235)]',
    eyebrow: 'text-[oklch(38%_0.07_235)]',
    softPanel: 'bg-[oklch(96%_0.03_235)]',
    fallback: 'from-[oklch(94%_0.04_235)] via-canvas to-[oklch(91%_0.05_235)]',
  },
  peach: {
    frame:
      'border-[oklch(86%_0.045_48)] bg-[linear-gradient(180deg,var(--canvas),oklch(97%_0.026_48))] hover:border-primary/35',
    accent: 'from-[oklch(96%_0.035_48)] to-[oklch(91%_0.06_48)]',
    iconWrap: 'bg-[oklch(94%_0.048_48)]',
    icon: 'text-[oklch(39%_0.08_45)]',
    badge:
      'border-[oklch(86%_0.045_48)] bg-[oklch(95%_0.04_48)] text-[oklch(39%_0.08_45)]',
    eyebrow: 'text-[oklch(41%_0.08_45)]',
    softPanel: 'bg-[oklch(96%_0.035_48)]',
    fallback: 'from-[oklch(94%_0.048_48)] via-canvas to-[oklch(91%_0.06_48)]',
  },
  butter: {
    frame:
      'border-sunshine-500/45 bg-[linear-gradient(180deg,var(--canvas),var(--cream))] hover:border-sunshine-700',
    accent: 'from-sunshine-300/40 to-yellow-saturated/20',
    iconWrap: 'bg-sunshine-300/35',
    icon: 'text-sunshine-900',
    badge: 'border-sunshine-500/35 bg-yellow-saturated/20 text-sunshine-900',
    eyebrow: 'text-sunshine-900',
    softPanel: 'bg-sunshine-300/35',
    fallback: 'from-sunshine-300/35 via-canvas to-yellow-saturated/20',
  },
};

export const REGION_TONE_BY_SLUG: Record<RegionSlug, ParentingTone> = {
  seoul: 'mint',
  'gyeonggi-south': 'sand',
  'gyeonggi-north': 'sky',
  incheon: 'peach',
};

export const HOME_TONE_BY_ACCENT = {
  olive: 'mint',
  sand: 'sand',
  brick: 'peach',
  sky: 'sky',
} as const;

export const CATEGORY_TONE_BY_CATEGORY: Record<PlaceCategory, ParentingTone> = {
  'baby-kids-cafe': 'peach',
  'kids-cafe': 'peach',
  'public-play': 'sky',
  museum: 'sky',
  experience: 'butter',
  park: 'mint',
  library: 'mint',
  culture: 'sand',
  sports: 'sky',
};

export const CONDITION_BADGE_STYLES = {
  age: PARENTING_TONE_STYLES.butter.badge,
  indoor: PARENTING_TONE_STYLES.sky.badge,
  outdoor: PARENTING_TONE_STYLES.mint.badge,
  free: PARENTING_TONE_STYLES.mint.badge,
  rain: PARENTING_TONE_STYLES.sky.badge,
  paid: PARENTING_TONE_STYLES.sand.badge,
  feeding: PARENTING_TONE_STYLES.peach.badge,
  stroller: PARENTING_TONE_STYLES.sand.badge,
  season: PARENTING_TONE_STYLES.butter.badge,
} as const;

export const FILTER_CHIP_STYLES = {
  inactive:
    'border-hairline bg-canvas/82 text-slate hover:border-primary/30 hover:text-foreground',
  active: {
    age: PARENTING_TONE_STYLES.butter.badge,
    category: PARENTING_TONE_STYLES.sand.badge,
    theme: PARENTING_TONE_STYLES.mint.badge,
    indoor: PARENTING_TONE_STYLES.sky.badge,
    outdoor: PARENTING_TONE_STYLES.mint.badge,
    free: PARENTING_TONE_STYLES.mint.badge,
    feeding: PARENTING_TONE_STYLES.peach.badge,
    stroller: PARENTING_TONE_STYLES.sand.badge,
    rain: PARENTING_TONE_STYLES.sky.badge,
    season: PARENTING_TONE_STYLES.butter.badge,
  },
} as const;

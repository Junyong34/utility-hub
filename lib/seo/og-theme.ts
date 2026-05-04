/**
 * OG Image 육아형 브랜드 테마 토큰
 *
 * 색상, 프리셋, 카테고리-톤 매핑을 중앙에서 관리한다.
 */

/* ── Base Colors ── */
export const OG_COLORS = {
  'cream-50': '#FFFDF8',
  'cream-100': '#FFF8E7',
  'cream-200': '#FFF2CD',
  'cream-300': '#F3D997',
  'orange-500': '#FF6A00',
  'orange-700': '#F47B20',
  'orange-900': '#A83A08',
  'sun-300': '#FFD58A',
  'sun-500': '#FFB238',
  'yellow-500': '#FFD21F',
  'ink-900': '#211712',
  'ink-700': '#3D3027',
  'slate-600': '#695C4C',
  'line-200': '#EEE3CF',
} as const;

export type OgColorToken = keyof typeof OG_COLORS;

/* ── Theme Preset ── */
export interface OgThemePreset {
  name: string;
  bg: string;
  accent: string;
  labelBg: string;
  labelText: string;
  titleColor: string;
  descColor: string;
  footerColor: string;
  footerDotColor: string;
  barColor: string;
}

export const OG_THEME_PRESETS: Record<string, OgThemePreset> = {
  cream: {
    name: '크림',
    bg: OG_COLORS['cream-50'],
    accent: OG_COLORS['orange-500'],
    labelBg: OG_COLORS['orange-500'],
    labelText: '#FFFAF0',
    titleColor: OG_COLORS['ink-900'],
    descColor: OG_COLORS['slate-600'],
    footerColor: OG_COLORS['slate-600'],
    footerDotColor: OG_COLORS['orange-500'],
    barColor: OG_COLORS['orange-500'],
  },
  mint: {
    name: '크림 소프트',
    bg: OG_COLORS['cream-100'],
    accent: OG_COLORS['orange-700'],
    labelBg: OG_COLORS['orange-700'],
    labelText: '#FFFAF0',
    titleColor: OG_COLORS['ink-900'],
    descColor: OG_COLORS['slate-600'],
    footerColor: OG_COLORS['slate-600'],
    footerDotColor: OG_COLORS['orange-700'],
    barColor: OG_COLORS['orange-700'],
  },
  sky: {
    name: '선셋 라이트',
    bg: OG_COLORS['cream-200'],
    accent: OG_COLORS['sun-500'],
    labelBg: OG_COLORS['sun-500'],
    labelText: OG_COLORS['ink-900'],
    titleColor: OG_COLORS['ink-900'],
    descColor: OG_COLORS['slate-600'],
    footerColor: OG_COLORS['slate-600'],
    footerDotColor: OG_COLORS['sun-500'],
    barColor: OG_COLORS['sun-500'],
  },
  sun: {
    name: '선',
    bg: '#FFFBEC',
    accent: OG_COLORS['sun-500'],
    labelBg: OG_COLORS['sun-500'],
    labelText: OG_COLORS['ink-900'],
    titleColor: OG_COLORS['ink-900'],
    descColor: OG_COLORS['slate-600'],
    footerColor: OG_COLORS['slate-600'],
    footerDotColor: OG_COLORS['sun-500'],
    barColor: OG_COLORS['sun-500'],
  },
  peach: {
    name: '오렌지 크림',
    bg: OG_COLORS['cream-300'],
    accent: OG_COLORS['orange-900'],
    labelBg: OG_COLORS['orange-900'],
    labelText: '#FFFAF0',
    titleColor: OG_COLORS['ink-900'],
    descColor: OG_COLORS['ink-700'],
    footerColor: OG_COLORS['ink-700'],
    footerDotColor: OG_COLORS['orange-900'],
    barColor: OG_COLORS['orange-900'],
  },
  /** 기존 다크 테마 — 레거시 호환용 */
  dark: {
    name: '다크 (레거시)',
    bg: '#17120F',
    accent: OG_COLORS['orange-500'],
    labelBg: 'rgba(255,106,0,0.22)',
    labelText: '#FFF8E7',
    titleColor: '#FFF8E7',
    descColor: 'rgba(255,248,231,0.82)',
    footerColor: 'rgba(255,248,231,0.76)',
    footerDotColor: OG_COLORS['orange-500'],
    barColor: OG_COLORS['orange-500'],
  },
} as const;

export const DEFAULT_THEME_PRESET = 'cream';

/* ── Layout Variant ── */
export type OgLayoutVariant = 'play-card' | 'tool-card' | 'custom-studio';

/* ── Category → Theme 매핑 ── */
export const BLOG_CATEGORY_THEME_MAP: Record<string, string> = {
  // 장소/체험
  places: 'sky',
  experience: 'sky',
  // 혜택/지원금
  benefits: 'mint',
  support: 'mint',
  // 실전 가이드
  guide: 'cream',
  tips: 'cream',
  // 비교/리뷰
  comparison: 'peach',
  review: 'peach',
  // 금융/비용
  finance: 'sun',
  cost: 'sun',
};

export const TOOL_CATEGORY_THEME_MAP: Record<string, string> = {
  // 연령/성장
  growth: 'sky',
  age: 'sky',
  // 비용/예산
  budget: 'sun',
  cost: 'sun',
  // 세금/증여
  tax: 'peach',
  gift: 'peach',
};

/* ── Helpers ── */
export function resolveThemePreset(presetName?: string): OgThemePreset {
  if (!presetName) return OG_THEME_PRESETS[DEFAULT_THEME_PRESET];
  return OG_THEME_PRESETS[presetName] ?? OG_THEME_PRESETS[DEFAULT_THEME_PRESET];
}

export function resolveBlogCategoryPresetName(categorySlug: string): string {
  return BLOG_CATEGORY_THEME_MAP[categorySlug] ?? DEFAULT_THEME_PRESET;
}

export function resolveBlogCategoryTheme(categorySlug: string): OgThemePreset {
  return resolveThemePreset(resolveBlogCategoryPresetName(categorySlug));
}

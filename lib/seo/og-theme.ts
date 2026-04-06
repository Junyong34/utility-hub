/**
 * OG Image 육아형 브랜드 테마 토큰
 *
 * 색상, 프리셋, 카테고리-톤 매핑을 중앙에서 관리한다.
 */

/* ── Base Colors ── */
export const OG_COLORS = {
  'cream-50': '#FFF8EF',
  'peach-100': '#FFE3D2',
  'butter-200': '#FFE7A8',
  'mint-200': '#D9F5E6',
  'sky-200': '#D9EEFF',

  'coral-500': '#FF8D73',
  'sun-500': '#FFC94A',
  'mint-500': '#57C79A',
  'sky-500': '#6EB8FF',

  'ink-900': '#25303B',
  'ink-700': '#4D5A67',
  'line-200': '#E9E1D7',
} as const

export type OgColorToken = keyof typeof OG_COLORS

/* ── Theme Preset ── */
export interface OgThemePreset {
  name: string
  bg: string
  accent: string
  labelBg: string
  labelText: string
  titleColor: string
  descColor: string
  footerColor: string
  footerDotColor: string
  barColor: string
}

export const OG_THEME_PRESETS: Record<string, OgThemePreset> = {
  cream: {
    name: '크림',
    bg: OG_COLORS['cream-50'],
    accent: OG_COLORS['coral-500'],
    labelBg: OG_COLORS['coral-500'],
    labelText: '#FFFFFF',
    titleColor: OG_COLORS['ink-900'],
    descColor: OG_COLORS['ink-700'],
    footerColor: OG_COLORS['ink-700'],
    footerDotColor: OG_COLORS['coral-500'],
    barColor: OG_COLORS['coral-500'],
  },
  mint: {
    name: '민트',
    bg: OG_COLORS['mint-200'],
    accent: OG_COLORS['mint-500'],
    labelBg: OG_COLORS['mint-500'],
    labelText: '#FFFFFF',
    titleColor: OG_COLORS['ink-900'],
    descColor: OG_COLORS['ink-700'],
    footerColor: OG_COLORS['ink-700'],
    footerDotColor: OG_COLORS['mint-500'],
    barColor: OG_COLORS['mint-500'],
  },
  sky: {
    name: '스카이',
    bg: OG_COLORS['sky-200'],
    accent: OG_COLORS['sky-500'],
    labelBg: OG_COLORS['sky-500'],
    labelText: '#FFFFFF',
    titleColor: OG_COLORS['ink-900'],
    descColor: OG_COLORS['ink-700'],
    footerColor: OG_COLORS['ink-700'],
    footerDotColor: OG_COLORS['sky-500'],
    barColor: OG_COLORS['sky-500'],
  },
  sun: {
    name: '선',
    bg: '#FFFCF0',
    accent: OG_COLORS['sun-500'],
    labelBg: OG_COLORS['sun-500'],
    labelText: OG_COLORS['ink-900'],
    titleColor: OG_COLORS['ink-900'],
    descColor: OG_COLORS['ink-700'],
    footerColor: OG_COLORS['ink-700'],
    footerDotColor: OG_COLORS['sun-500'],
    barColor: OG_COLORS['sun-500'],
  },
  peach: {
    name: '피치',
    bg: OG_COLORS['peach-100'],
    accent: OG_COLORS['coral-500'],
    labelBg: OG_COLORS['coral-500'],
    labelText: '#FFFFFF',
    titleColor: OG_COLORS['ink-900'],
    descColor: OG_COLORS['ink-700'],
    footerColor: OG_COLORS['ink-700'],
    footerDotColor: OG_COLORS['coral-500'],
    barColor: OG_COLORS['coral-500'],
  },
  /** 기존 다크 테마 — 레거시 호환용 */
  dark: {
    name: '다크 (레거시)',
    bg: '#0f172a',
    accent: '#38bdf8',
    labelBg: 'rgba(255,255,255,0.14)',
    labelText: '#f8fafc',
    titleColor: '#f8fafc',
    descColor: 'rgba(248,250,252,0.82)',
    footerColor: 'rgba(248,250,252,0.78)',
    footerDotColor: '#38bdf8',
    barColor: '#38bdf8',
  },
} as const

export const DEFAULT_THEME_PRESET = 'cream'

/* ── Layout Variant ── */
export type OgLayoutVariant = 'play-card' | 'tool-card' | 'custom-studio'

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
}

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
}

/* ── Helpers ── */
export function resolveThemePreset(presetName?: string): OgThemePreset {
  if (!presetName) return OG_THEME_PRESETS[DEFAULT_THEME_PRESET]
  return OG_THEME_PRESETS[presetName] ?? OG_THEME_PRESETS[DEFAULT_THEME_PRESET]
}

export function resolveBlogCategoryPresetName(categorySlug: string): string {
  return BLOG_CATEGORY_THEME_MAP[categorySlug] ?? DEFAULT_THEME_PRESET
}

export function resolveBlogCategoryTheme(categorySlug: string): OgThemePreset {
  return resolveThemePreset(resolveBlogCategoryPresetName(categorySlug))
}

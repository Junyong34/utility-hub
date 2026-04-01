import type { PomodoroTheme } from './types';

export interface PomodoroThemeConfig {
  id: PomodoroTheme;
  label: string;
  badge: string;
  description: string;
  patternLabel: string;
  surfaceClassName: string;
  subCardClassName: string;
  softPanelClassName: string;
  selectorClassName: string;
  statusClassName: string;
  accentTextClassName: string;
  mutedTextClassName: string;
  badgeClassName: string;
  heroLayoutClassName: string;
  timerContainerClassName: string;
  controlRowClassName: string;
  tabsListClassName: string;
  tabsTriggerClassName: string;
  primaryButtonClassName: string;
  outlineButtonClassName: string;
  secondaryButtonClassName: string;
  timerTitleClassName: string;
  timerDurationClassName: string;
  ringBase: string;
  ringProgressStart: string;
  ringProgressEnd: string;
  centerFill: string;
  glow: string;
}

export const POMODORO_THEME_CONFIGS: Record<
  PomodoroTheme,
  PomodoroThemeConfig
> = {
  tomato: {
    id: 'tomato',
    label: 'Tomato Classic',
    badge: '토마토 키친',
    description:
      '주방 타이머처럼 또렷한 토마토 실루엣과 따뜻한 붉은 톤으로 집중감을 만드는 테마.',
    patternLabel: '키친 타이머 실루엣',
    surfaceClassName:
      'border-rose-500/20 bg-[radial-gradient(circle_at_top,_rgba(251,113,133,0.28),_transparent_44%),linear-gradient(135deg,rgba(255,250,245,0.98),rgba(255,243,244,0.95))]',
    subCardClassName:
      'border-rose-100/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,245,245,0.92))] shadow-[0_16px_36px_rgba(239,68,68,0.07)]',
    softPanelClassName:
      'border border-rose-100/90 bg-rose-50/80 text-rose-950',
    selectorClassName:
      'border-rose-500/40 bg-[linear-gradient(180deg,rgba(255,241,242,0.98),rgba(255,228,230,0.92))] text-rose-950 shadow-[0_18px_34px_rgba(244,63,94,0.14)]',
    statusClassName: 'border-rose-500/30 bg-rose-500/8 text-rose-700',
    accentTextClassName: 'text-rose-700',
    mutedTextClassName: 'text-rose-950/65',
    badgeClassName: 'border-rose-200 bg-rose-50 text-rose-700',
    heroLayoutClassName: 'gap-6',
    timerContainerClassName:
      'rounded-[2rem] border border-rose-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,247,247,0.95))] shadow-[0_24px_60px_rgba(190,24,93,0.10)]',
    controlRowClassName: 'sm:grid-cols-4',
    tabsListClassName: 'border border-rose-100/90 bg-white/80 p-1 shadow-sm',
    tabsTriggerClassName:
      'data-[state=active]:bg-rose-500 data-[state=active]:text-white data-[state=active]:shadow-[0_10px_22px_rgba(225,29,72,0.28)]',
    primaryButtonClassName:
      'border-rose-700/10 bg-[linear-gradient(135deg,#fb7185_0%,#ef4444_45%,#b91c1c_100%)] text-rose-50 shadow-[0_18px_32px_rgba(220,38,38,0.32)] hover:brightness-[1.03]',
    outlineButtonClassName:
      'border-rose-200/90 bg-white/90 text-rose-950 hover:border-rose-300 hover:bg-rose-50/80',
    secondaryButtonClassName:
      'bg-rose-50 text-rose-800 hover:bg-rose-100/90',
    timerTitleClassName:
      'border-rose-200/80 bg-white/94 text-rose-950 shadow-[0_12px_28px_rgba(239,68,68,0.10)]',
    timerDurationClassName:
      'border-rose-100 bg-rose-50/92 text-rose-700 shadow-[0_8px_20px_rgba(244,63,94,0.08)]',
    ringBase: 'rgba(127, 29, 29, 0.10)',
    ringProgressStart: '#fb7185',
    ringProgressEnd: '#b91c1c',
    centerFill: 'rgba(255, 241, 242, 0.95)',
    glow: 'rgba(251, 113, 133, 0.20)',
  },
  visual: {
    id: 'visual',
    label: 'Visual Timer',
    badge: '다이얼 타이머',
    description:
      '다이얼과 웨지 채움이 한눈에 들어와 남은 시간을 직관적으로 읽게 만드는 시각형 테마.',
    patternLabel: '다이얼 + 웨지',
    surfaceClassName:
      'border-indigo-500/18 bg-[radial-gradient(circle_at_top_left,_rgba(147,197,253,0.28),_transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.98),rgba(238,242,255,0.96))]',
    subCardClassName:
      'border-indigo-100/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(238,242,255,0.92))] shadow-[0_18px_40px_rgba(79,70,229,0.08)]',
    softPanelClassName:
      'border border-indigo-100/90 bg-indigo-50/80 text-indigo-950',
    selectorClassName:
      'border-indigo-400/40 bg-[linear-gradient(180deg,rgba(238,242,255,0.98),rgba(224,231,255,0.92))] text-indigo-950 shadow-[0_18px_36px_rgba(79,70,229,0.14)]',
    statusClassName: 'border-indigo-500/25 bg-indigo-500/8 text-indigo-700',
    accentTextClassName: 'text-indigo-700',
    mutedTextClassName: 'text-slate-700/72',
    badgeClassName: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    heroLayoutClassName: 'gap-6',
    timerContainerClassName:
      'rounded-[2rem] border border-indigo-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(238,242,255,0.98))] shadow-[0_24px_60px_rgba(79,70,229,0.10)]',
    controlRowClassName: 'sm:grid-cols-4',
    tabsListClassName:
      'border border-indigo-100/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(238,242,255,0.88))] p-1 shadow-sm',
    tabsTriggerClassName:
      'data-[state=active]:bg-[linear-gradient(135deg,#2563eb_0%,#4f46e5_100%)] data-[state=active]:text-white data-[state=active]:shadow-[0_10px_24px_rgba(79,70,229,0.24)]',
    primaryButtonClassName:
      'bg-[linear-gradient(135deg,#2563eb_0%,#0ea5e9_100%)] text-sky-50 shadow-[0_18px_34px_rgba(37,99,235,0.28)] hover:brightness-[1.03]',
    outlineButtonClassName:
      'border-indigo-200/90 bg-white/92 text-slate-950 hover:border-indigo-300 hover:bg-indigo-50/80',
    secondaryButtonClassName:
      'bg-indigo-50 text-indigo-800 hover:bg-indigo-100/90',
    timerTitleClassName:
      'border-indigo-200/80 bg-white/96 text-slate-900 shadow-[0_12px_28px_rgba(99,102,241,0.12)]',
    timerDurationClassName:
      'border-sky-100 bg-white/98 text-slate-700 shadow-[0_10px_24px_rgba(14,165,233,0.12)]',
    ringBase: 'rgba(99, 102, 241, 0.16)',
    ringProgressStart: '#fb923c',
    ringProgressEnd: '#ef4444',
    centerFill: 'rgba(255,255,255,0.98)',
    glow: 'rgba(99,102,241,0.16)',
  },
  minimal: {
    id: 'minimal',
    label: 'Focus Minimal',
    badge: '포커스 미니멀',
    description:
      '큰 숫자와 슬림 바만 남겨 생산성 도구처럼 또렷하게 읽히는 절제형 테마.',
    patternLabel: '숫자 + 슬림 바',
    surfaceClassName:
      'border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(241,245,249,0.97))]',
    subCardClassName:
      'border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.95))] shadow-[0_18px_40px_rgba(15,23,42,0.05)]',
    softPanelClassName:
      'border border-slate-200/90 bg-slate-100/80 text-slate-900',
    selectorClassName:
      'border-slate-400/40 bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(226,232,240,0.95))] text-slate-950 shadow-[0_18px_30px_rgba(30,41,59,0.10)]',
    statusClassName: 'border-slate-300 bg-slate-100/90 text-slate-700',
    accentTextClassName: 'text-sky-800',
    mutedTextClassName: 'text-slate-700/72',
    badgeClassName: 'border-sky-100 bg-sky-50 text-sky-800',
    heroLayoutClassName: 'gap-4',
    timerContainerClassName:
      'rounded-[1.75rem] border border-slate-200/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] shadow-[0_24px_60px_rgba(15,23,42,0.06)]',
    controlRowClassName: 'sm:grid-cols-4',
    tabsListClassName: 'border border-slate-200 bg-white p-1 shadow-sm',
    tabsTriggerClassName:
      'data-[state=active]:bg-slate-950 data-[state=active]:text-white data-[state=active]:shadow-[0_8px_18px_rgba(15,23,42,0.18)]',
    primaryButtonClassName:
      'bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_100%)] text-slate-50 shadow-[0_18px_30px_rgba(29,78,216,0.20)] hover:brightness-[1.03]',
    outlineButtonClassName:
      'border-slate-200 bg-white text-slate-950 hover:border-slate-300 hover:bg-slate-50',
    secondaryButtonClassName:
      'bg-slate-100 text-slate-800 hover:bg-slate-200/90',
    timerTitleClassName:
      'border-slate-200 bg-white/98 text-slate-600 shadow-[0_8px_20px_rgba(15,23,42,0.06)]',
    timerDurationClassName:
      'border-sky-100 bg-sky-50/90 text-sky-700 shadow-[0_8px_18px_rgba(14,165,233,0.10)]',
    ringBase: 'rgba(148, 163, 184, 0.26)',
    ringProgressStart: '#38bdf8',
    ringProgressEnd: '#2563eb',
    centerFill: 'rgba(255,255,255,0.98)',
    glow: 'rgba(59, 130, 246, 0.12)',
  },
  garden: {
    id: 'garden',
    label: 'Cozy Garden',
    badge: '코지 가든',
    description:
      '화분과 새싹이 시간과 함께 자라나는 메타포로, 정원처럼 차분한 집중 분위기를 만드는 테마.',
    patternLabel: '화분 + 성장 메타포',
    surfaceClassName:
      'border-emerald-500/20 bg-[radial-gradient(circle_at_top_left,_rgba(110,231,183,0.32),_transparent_42%),linear-gradient(135deg,rgba(240,253,244,0.98),rgba(236,253,245,0.95))]',
    subCardClassName:
      'border-emerald-100/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(236,253,245,0.92))] shadow-[0_18px_40px_rgba(16,185,129,0.08)]',
    softPanelClassName:
      'border border-emerald-100/90 bg-emerald-50/78 text-emerald-950',
    selectorClassName:
      'border-emerald-500/35 bg-[linear-gradient(180deg,rgba(236,253,245,0.98),rgba(209,250,229,0.92))] text-emerald-950 shadow-[0_18px_36px_rgba(16,185,129,0.14)]',
    statusClassName: 'border-emerald-500/25 bg-emerald-500/8 text-emerald-700',
    accentTextClassName: 'text-emerald-700',
    mutedTextClassName: 'text-emerald-950/68',
    badgeClassName: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    heroLayoutClassName: 'gap-8',
    timerContainerClassName:
      'rounded-[2rem] border border-emerald-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(236,253,245,0.94))] shadow-[0_24px_60px_rgba(16,185,129,0.10)]',
    controlRowClassName: 'sm:grid-cols-4',
    tabsListClassName:
      'border border-emerald-100/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(236,253,245,0.88))] p-1 shadow-sm',
    tabsTriggerClassName:
      'data-[state=active]:bg-[linear-gradient(135deg,#10b981_0%,#047857_100%)] data-[state=active]:text-white data-[state=active]:shadow-[0_10px_24px_rgba(16,185,129,0.22)]',
    primaryButtonClassName:
      'bg-[linear-gradient(135deg,#34d399_0%,#10b981_48%,#047857_100%)] text-emerald-50 shadow-[0_18px_34px_rgba(16,185,129,0.24)] hover:brightness-[1.03]',
    outlineButtonClassName:
      'border-emerald-200/90 bg-white/92 text-emerald-950 hover:border-emerald-300 hover:bg-emerald-50/80',
    secondaryButtonClassName:
      'bg-emerald-50 text-emerald-800 hover:bg-emerald-100/90',
    timerTitleClassName:
      'border-emerald-200/80 bg-white/96 text-emerald-950 shadow-[0_12px_28px_rgba(16,185,129,0.10)]',
    timerDurationClassName:
      'border-emerald-100 bg-emerald-50/94 text-emerald-700 shadow-[0_8px_20px_rgba(16,185,129,0.08)]',
    ringBase: 'rgba(110, 231, 183, 0.16)',
    ringProgressStart: '#34d399',
    ringProgressEnd: '#0f766e',
    centerFill: 'rgba(236, 253, 245, 0.96)',
    glow: 'rgba(16, 185, 129, 0.16)',
  },
};

export function getPomodoroThemeConfig(
  theme: PomodoroTheme
): PomodoroThemeConfig {
  return POMODORO_THEME_CONFIGS[theme] ?? POMODORO_THEME_CONFIGS.tomato;
}

export function getPomodoroThemeEntries(): PomodoroThemeConfig[] {
  return Object.values(POMODORO_THEME_CONFIGS);
}

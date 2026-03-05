'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  LOTTO_RECOMMEND_MODES,
  LottoRecommendMode,
} from '@/lib/lotto/recommendation-spec';
import { useLottoRecommend } from './LottoRecommendProvider';
import {
  Dices,
  TrendingUp,
  Calendar,
  Brain,
  Sparkles,
  CircleDashed,
} from 'lucide-react';
import { CompactModeButton } from './CompactModeButton';
import { ModeDescription } from './ModeDescription';

const MODE_CONFIG: Record<
  LottoRecommendMode,
  {
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    iconBg: string;
    borderColor: string;
    hoverBorderColor: string;
    bgGradient: string;
  }
> = {
  random: {
    label: '랜덤 추천',
    description: '완전한 무작위 조합으로 행운을 시험해보세요',
    icon: Dices,
    gradient: 'from-violet-500 to-purple-600',
    iconBg: 'bg-gradient-to-br from-violet-500 to-purple-600',
    borderColor: 'border-violet-200 dark:border-violet-800',
    hoverBorderColor: 'hover:border-violet-400 dark:hover:border-violet-600',
    bgGradient:
      'from-violet-50/50 to-purple-50/30 dark:from-violet-950/20 dark:to-purple-950/10',
  },
  stats: {
    label: 'AI 통계 분석',
    description:
      '과거 모든 회차의 로또 당첨번호를 AI가 분석하여 출현 빈도가 높은 번호와 패턴을 찾아 로또번호를 추천해드립니다.',
    icon: TrendingUp,
    gradient: 'from-blue-500 to-cyan-600',
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    borderColor: 'border-blue-200 dark:border-blue-800',
    hoverBorderColor: 'hover:border-blue-400 dark:hover:border-blue-600',
    bgGradient:
      'from-blue-50/50 to-cyan-50/30 dark:from-blue-950/20 dark:to-cyan-950/10',
  },
  date: {
    label: '날짜 추천',
    description: '특별한 날짜를 기반으로 의미있는 번호를 생성합니다',
    icon: Calendar,
    gradient: 'from-green-500 to-emerald-600',
    iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
    borderColor: 'border-green-200 dark:border-green-800',
    hoverBorderColor: 'hover:border-green-400 dark:hover:border-green-600',
    bgGradient:
      'from-green-50/50 to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10',
  },
  mbti: {
    label: 'MBTI 추천',
    description: 'MBTI 성향에 맞는 당신만의 번호를 추천합니다',
    icon: Brain,
    gradient: 'from-pink-500 to-rose-600',
    iconBg: 'bg-gradient-to-br from-pink-500 to-rose-600',
    borderColor: 'border-pink-200 dark:border-pink-800',
    hoverBorderColor: 'hover:border-pink-400 dark:hover:border-pink-600',
    bgGradient:
      'from-pink-50/50 to-rose-50/30 dark:from-pink-950/20 dark:to-rose-950/10',
  },
  lucky: {
    label: '행운 번호',
    description: '당신만의 행운 번호를 조합하여 생성합니다',
    icon: Sparkles,
    gradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    borderColor: 'border-amber-200 dark:border-amber-800',
    hoverBorderColor: 'hover:border-amber-400 dark:hover:border-amber-600',
    bgGradient:
      'from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10',
  },
  slot: {
    label: '슬롯 머신',
    description: '재미있는 슬롯머신 방식으로 번호를 뽑아보세요',
    icon: CircleDashed,
    gradient: 'from-indigo-500 to-purple-600',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    hoverBorderColor: 'hover:border-indigo-400 dark:hover:border-indigo-600',
    bgGradient:
      'from-indigo-50/50 to-purple-50/30 dark:from-indigo-950/20 dark:to-purple-950/10',
  },
};

export function LottoModeSwitcher() {
  // 현재 mode 값에 따라 카드/버튼 표시를 분기하며,
  // 각 버튼은 setMode 액션으로 전역 상태를 업데이트합니다.
  const {
    state: { mode, isGenerating },
    actions: { setMode },
  } = useLottoRecommend();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">추천 방식 선택</h2>

      {/* 모바일: 컴팩트 그리드 (2행 3열) */}
      <div
        className="grid grid-cols-3 gap-2 md:hidden"
        role="radiogroup"
        aria-label="로또 추천 방식"
      >
        {LOTTO_RECOMMEND_MODES.map((option) => {
          const config = MODE_CONFIG[option];
          // 모바일은 터치 밀도를 고려해 버튼 크기를 축소한 3x3격자 레이아웃으로 구성합니다.
          return (
            <CompactModeButton
              key={option}
              mode={option}
              label={config.label}
              icon={config.icon}
              iconBg={config.iconBg}
              isSelected={mode === option}
              isDisabled={isGenerating}
              showBadge={
                option === 'stats' ? 'strong' : option === 'mbti' ? 'fun' : null
              }
              onClick={() => setMode(option)}
            />
          );
        })}
      </div>

      {/* 모바일: 선택된 모드 설명 */}
      {mode && (
        <div className="md:hidden">
          <ModeDescription
            mode={mode}
            label={MODE_CONFIG[mode].label}
            description={MODE_CONFIG[mode].description}
            icon={MODE_CONFIG[mode].icon}
            iconBg={MODE_CONFIG[mode].iconBg}
            gradient={MODE_CONFIG[mode].gradient}
          />
        </div>
      )}

      {/* 데스크탑: 기존 풀 카드 레이아웃 */}
      <div
        className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-3"
        role="radiogroup"
        aria-label="로또 추천 방식"
      >
        {LOTTO_RECOMMEND_MODES.map(option => {
          const config = MODE_CONFIG[option];
          const Icon = config.icon;
          const isSelected = mode === option;
          // 데스크탑은 아이콘+요약설명+선택 버튼이 묶인 카드 형태로
          // 사용자가 모드 전환 의도를 빠르게 파악하도록 구성합니다.

          return (
            <Card
              key={option}
              className={cn(
                'relative overflow-hidden transition-all duration-300',
                'border-2',
                'hover:shadow-xl hover:-translate-y-1',
                'cursor-pointer',
                // Border colors - 선택 여부와 관계없이 고유 색상 유지
                config.borderColor,
                config.hoverBorderColor
                // Selected state - ring and scale
              )}
              style={{
                background: isSelected
                  ? `linear-gradient(to bottom right, ${
                      option === 'random'
                        ? 'rgb(245 243 255 / 0.5), rgb(243 232 255 / 0.3)'
                        : option === 'stats'
                          ? 'rgb(239 246 255 / 0.5), rgb(224 242 254 / 0.3)'
                          : option === 'date'
                            ? 'rgb(240 253 244 / 0.5), rgb(236 253 245 / 0.3)'
                            : option === 'mbti'
                              ? 'rgb(253 242 248 / 0.5), rgb(255 241 242 / 0.3)'
                              : option === 'lucky'
                                ? 'rgb(255 251 235 / 0.5), rgb(255 247 237 / 0.3)'
                                : 'rgb(238 242 255 / 0.5), rgb(243 232 255 / 0.3)'
                    })`
                  : undefined,
              }}
            >
              <div className="p-4 h-full flex flex-col">
                {/* Icon Badge와 배지 */}
                <div className="flex items-start gap-2 mb-3">
                  {/* Icon Badge */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      config.iconBg
                    )}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* 강력추천 배지 - AI 통계 분석 전용 */}
                  {option === 'stats' && (
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse mt-0.5">
                      <Sparkles className="w-3 h-3" />
                      <span>강력추천</span>
                    </div>
                  )}

                  {/* 재미추천 배지 - MBTI 추천 전용 */}
                  {option === 'mbti' && (
                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 mt-0.5">
                      <Sparkles className="w-3 h-3" />
                      <span>재미추천</span>
                    </div>
                  )}
                </div>

                {/* Content - flex-1로 남은 공간 차지 */}
                <div className="space-y-1.5 flex-1 mb-3">
                  <h3 className="text-base font-bold">{config.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {config.description}
                  </p>
                </div>

                {/* Action Button - 하단 고정 */}
                <Button
                  type="button"
                  variant={isSelected ? 'default' : 'outline'}
                  className={cn(
                    'w-full h-10 transition-all duration-200',
                    isSelected &&
                      `bg-gradient-to-r ${config.gradient} hover:opacity-90 border-0`
                  )}
                  disabled={isGenerating}
                  aria-pressed={isSelected}
                  aria-label={`${config.label} 선택`}
                  onClick={() => setMode(option)}
                >
                  {isSelected ? '선택됨' : `${config.label} 시작`}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

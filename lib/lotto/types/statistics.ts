export type ProbabilityStrategy =
  | 'high-frequency'
  | 'low-frequency'
  | 'undrawn'
  | 'balanced'
  | 'hot'
  | 'cold'

export interface StrategyConfig {
  poolSize?: number
  recentWindow?: number
  coldThreshold?: number
  hotThreshold?: number
}

export interface NumberFrequency {
  number: number
  count: number
  rate: number
  lastAppearance: number
  consecutiveAbsence: number
}

export interface OddEvenRatio {
  odd: number
  even: number
  ratio: string
}

export interface RangeDistribution {
  range: string
  count: number
  rate: number
  numbers: number[]
}

export interface CoOccurrenceData {
  pair: [number, number]
  count: number
  rate: number
}

export interface HotColdNumbers {
  hot: number[]
  cold: number[]
  neutral: number[]
}

export interface LottoStatistics {
  totalRounds: number
  frequencyMap: Map<number, NumberFrequency>
  mostFrequent: NumberFrequency[]
  leastFrequent: NumberFrequency[]
  hotColdNumbers: HotColdNumbers
  averageSum: number
  oddEvenDistribution: Map<string, number>
  rangeDistribution: RangeDistribution[]
  topCoOccurrences: CoOccurrenceData[]
}

export interface NumberWeight {
  number: number
  weight: number
  breakdown: {
    frequencyWeight: number
    recentWeight: number
    coOccurrenceWeight: number
    balanceWeight: number
  }
}

export interface AIRecommendationConfig {
  frequencyRatio: number
  recentRatio: number
  coOccurrenceRatio: number
  balanceRatio: number
  recentWindow: number
  strictValidation: boolean
}

export type LottoStatsStrategy = 'ai' | ProbabilityStrategy

export const LOTTO_STATS_STRATEGIES: LottoStatsStrategy[] = [
  'ai',
  'high-frequency',
  'low-frequency',
  'undrawn',
  'balanced',
  'hot',
  'cold',
]

export interface LottoStatsSummary {
  mostFrequent: number[]
  leastFrequent: number[]
  hotNumbers: number[]
  coldNumbers: number[]
  totalRounds: number
  recentRoundWindow: number
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

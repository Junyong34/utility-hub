export const VISITOR_METRIC = 'activeUsers' as const

export type VisitorMetric = typeof VISITOR_METRIC

export interface VisitorStatsData {
  todayVisitors: number
  totalVisitors: number
  metric: VisitorMetric
  timeZone: string
  lastUpdatedAt: string
}

export interface VisitorStatsSuccessResponse {
  ok: true
  data: VisitorStatsData
  stale: boolean
  cacheTtlSeconds: number
}

export interface VisitorStatsErrorResponse {
  ok: false
  stale: false
  cacheTtlSeconds: number
  errorCode: 'GA_UNAVAILABLE'
  message: string
}

export type VisitorStatsApiResponse =
  | VisitorStatsSuccessResponse
  | VisitorStatsErrorResponse

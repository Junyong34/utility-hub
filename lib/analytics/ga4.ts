import { google } from 'googleapis'
import { VISITOR_METRIC, type VisitorStatsData } from './types'

/**
 * 방문자 통계 조회 흐름(서버):
 * 1) fresh cache 확인
 * 2) GA4 설정 유효성 확인
 * 3) GA4 API로 today/total 병렬 조회
 * 4) 성공 시 cache 갱신 후 반환
 * 5) 실패 시 stale cache 반환, 없으면 에러 반환
 */
const CACHE_TTL_MS = 10 * 60 * 1000
const STALE_IF_ERROR_MS = 60 * 60 * 1000
const ANALYTICS_SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'
const DEFAULT_BASELINE_DATE = '2024-01-01'
const DEFAULT_TIME_ZONE = 'Asia/Seoul'

export const CACHE_TTL_SECONDS = CACHE_TTL_MS / 1000
export const VISITOR_CACHE_CONTROL_HEADER =
  'public, s-maxage=600, stale-while-revalidate=300'

interface AnalyticsConfig {
  propertyId: string
  clientEmail: string
  privateKey: string
  baselineDate: string
  timeZone: string
}

interface VisitorStatsCacheEntry {
  data: VisitorStatsData
  expiresAt: number
  staleUntil: number
}

interface VisitorStatsSuccessResult {
  ok: true
  data: VisitorStatsData
  stale: boolean
}

interface VisitorStatsErrorResult {
  ok: false
  error: Error
}

export type VisitorStatsResult =
  | VisitorStatsSuccessResult
  | VisitorStatsErrorResult

let visitorStatsCache: VisitorStatsCacheEntry | null = null

function toError(error: unknown): Error {
  if (error instanceof Error) {
    return error
  }
  return new Error('Unknown GA4 analytics error')
}

function normalizePrivateKey(key: string): string {
  return key.replace(/\\n/g, '\n')
}

function isValidDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function getAnalyticsConfig(): AnalyticsConfig | null {
  const propertyId = process.env.GA4_PROPERTY_ID?.trim()
  const clientEmail = process.env.GA4_CLIENT_EMAIL?.trim()
  const privateKeyRaw = process.env.GA4_PRIVATE_KEY?.trim()
  const baselineDate =
    process.env.GA4_BASELINE_DATE?.trim() || DEFAULT_BASELINE_DATE
  const timeZone = process.env.GA4_TIMEZONE?.trim() || DEFAULT_TIME_ZONE

  // 필수 인증값 누락 시 즉시 비활성 처리
  if (!propertyId || !clientEmail || !privateKeyRaw) {
    return null
  }

  // 누적 집계 시작일 형식 방어
  if (!isValidDateString(baselineDate)) {
    return null
  }

  return {
    propertyId,
    clientEmail,
    privateKey: normalizePrivateKey(privateKeyRaw),
    baselineDate,
    timeZone,
  }
}

async function runActiveUsersReport(
  config: AnalyticsConfig,
  startDate: string,
  endDate: string
): Promise<number> {
  // 서비스 계정 기반 서버-서버 인증
  const auth = new google.auth.JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: [ANALYTICS_SCOPE],
  })

  const analyticsData = google.analyticsdata({
    version: 'v1beta',
    auth,
  })

  const report = await analyticsData.properties.runReport({
    property: `properties/${config.propertyId}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      metrics: [{ name: VISITOR_METRIC }],
      keepEmptyRows: true,
    },
  })

  const rawValue = report.data.rows?.[0]?.metricValues?.[0]?.value
  const parsedValue = Number.parseInt(rawValue ?? '0', 10)

  // 예상 외 값이 오더라도 API 응답은 안정적으로 0 처리
  if (!Number.isFinite(parsedValue)) {
    return 0
  }

  return parsedValue
}

async function fetchVisitorStatsFromGa4(
  config: AnalyticsConfig
): Promise<VisitorStatsData> {
  // today/total을 병렬 호출해 응답 지연을 최소화
  const [todayVisitors, totalVisitors] = await Promise.all([
    runActiveUsersReport(config, 'today', 'today'),
    runActiveUsersReport(config, config.baselineDate, 'today'),
  ])

  return {
    todayVisitors,
    totalVisitors,
    metric: VISITOR_METRIC,
    timeZone: config.timeZone,
    lastUpdatedAt: new Date().toISOString(),
  }
}

export async function getVisitorStats(): Promise<VisitorStatsResult> {
  const now = Date.now()

  // 1) fresh cache hit
  if (visitorStatsCache && now < visitorStatsCache.expiresAt) {
    return {
      ok: true,
      data: visitorStatsCache.data,
      stale: false,
    }
  }

  const config = getAnalyticsConfig()

  // 2) 설정 누락 시 stale cache fallback 여부 판단
  if (!config) {
    if (visitorStatsCache && now < visitorStatsCache.staleUntil) {
      return {
        ok: true,
        data: visitorStatsCache.data,
        stale: true,
      }
    }

    return {
      ok: false,
      error: new Error('Missing GA4 configuration'),
    }
  }

  try {
    // 3) GA4 원본 조회
    const freshData = await fetchVisitorStatsFromGa4(config)

    // 4) 성공 시 fresh/stale 만료 시점을 함께 저장
    visitorStatsCache = {
      data: freshData,
      expiresAt: now + CACHE_TTL_MS,
      staleUntil: now + STALE_IF_ERROR_MS,
    }

    return {
      ok: true,
      data: freshData,
      stale: false,
    }
  } catch (error) {
    // 5) GA 실패 시 stale cache가 유효하면 서비스 연속성 우선
    if (visitorStatsCache && now < visitorStatsCache.staleUntil) {
      return {
        ok: true,
        data: visitorStatsCache.data,
        stale: true,
      }
    }

    return {
      ok: false,
      error: toError(error),
    }
  }
}

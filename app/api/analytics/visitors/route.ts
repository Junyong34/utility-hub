import { NextResponse } from 'next/server'
import {
  CACHE_TTL_SECONDS,
  VISITOR_CACHE_CONTROL_HEADER,
  getVisitorStats,
} from '@/lib/analytics/ga4'
import type { VisitorStatsApiResponse } from '@/lib/analytics/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * API 응답 흐름:
 * 1) 도메인 서비스(getVisitorStats) 호출
 * 2) 성공이면 200 + 데이터(JSON)
 * 3) 실패면 503 + 표준 에러 스키마(JSON)
 * 4) 두 경우 모두 동일 Cache-Control 헤더 제공
 */
export async function GET() {
  const result = await getVisitorStats()
  const headers = {
    'Cache-Control': VISITOR_CACHE_CONTROL_HEADER,
  }

  if (result.ok) {
    const payload: VisitorStatsApiResponse = {
      ok: true,
      data: result.data,
      stale: result.stale,
      cacheTtlSeconds: CACHE_TTL_SECONDS,
    }

    return NextResponse.json(payload, { status: 200, headers })
  }

  // 운영 로그에서 원인 추적이 가능하도록 서버 에러 출력
  console.error('Failed to fetch visitor stats from GA4:', result.error)

  const payload: VisitorStatsApiResponse = {
    ok: false,
    stale: false,
    cacheTtlSeconds: CACHE_TTL_SECONDS,
    errorCode: 'GA_UNAVAILABLE',
    message: 'Visitor analytics data is currently unavailable',
  }

  return NextResponse.json(payload, { status: 503, headers })
}

'use client'

import { useQuery } from '@tanstack/react-query'
import type {
  VisitorStatsApiResponse,
  VisitorStatsSuccessResponse,
} from '@/lib/analytics/types'

/**
 * 클라이언트 조회 흐름:
 * 1) API 호출
 * 2) ok/HTTP 상태 검증
 * 3) 성공 페이로드 반환
 * 4) 실패 시 React Query 재시도 경로로 throw
 */
async function fetchVisitorStats(): Promise<VisitorStatsSuccessResponse> {
  const response = await fetch('/api/analytics/visitors')
  const payload = (await response.json()) as VisitorStatsApiResponse

  if (!response.ok || !payload.ok) {
    throw new Error(
      payload.ok ? 'Failed to fetch visitor stats' : payload.errorCode
    )
  }

  return payload
}

export function useVisitorStats() {
  // 전역 QueryClient 기본값과 맞춰 1분 stale 정책 유지
  return useQuery({
    queryKey: ['analytics', 'visitors'],
    queryFn: fetchVisitorStats,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

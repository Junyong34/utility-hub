'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

/**
 * React Query Provider
 * 클라이언트 사이드 데이터 페칭과 캐싱을 한 곳에서 관리합니다.
 *
 * SSR에서 클라이언트로 넘어온 컴포넌트에서도
 * 동일한 캐시 정책을 재사용할 수 있도록 최상위 레벨에서 QueryClient를 제공합니다.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 최신성은 1분 단위로 제한하고, 화면 포커스 복원 시 자동 재요청은 끔
            staleTime: 60 * 1000, // 1분
            gcTime: 5 * 60 * 1000, // 5분 (구 cacheTime)
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

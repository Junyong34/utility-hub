# Modules

`modules`는 제품 기능을 사용자에게 보이는 소유권 기준으로 모은다. URL 이름이나 기술 종류만으로 묶지 않고, 호출자가 작은 인터페이스만 학습해도 기능을 사용할 수 있는 깊은 모듈을 만든다.

현재 구현은 아직 주로 `app`, `components`, `lib`, `hooks`, `types`에 있다. 이 디렉터리는 새 구조의 기준이며, 실제 이관 상태는 [`docs/architecture/migration-ledger.md`](../docs/architecture/migration-ledger.md)에서 확인한다.

## 코드를 찾는 순서

1. URL이 있으면 `app`의 얇은 Next.js 진입점을 찾는다.
2. 대응하는 `modules/<domain>`으로 이동한다.
3. 변경 성격에 따라 `public.ts`, `domain`, `server`, `client`, `ui`를 선택한다.

전체 route owner는 [`docs/architecture/project-map.md`](../docs/architecture/project-map.md), import 규칙은 [`docs/architecture/module-boundaries.md`](../docs/architecture/module-boundaries.md)를 따른다.

## 초기 module 소유권

- `home`: 홈 큐레이션과 promotion 조합
- `places`: 장소 원천 계약, 발행 정책, 필터/페이지네이션, 목록·상세 UI
- `benefits`: 혜택 원천 계약, 발행/검증 정책, 허브 UI
- `blog`: Markdown loader, category/post 계약, 목록·본문, RSS용 데이터
- `tools/catalog`: 공개 tool ID, 순서, metadata, FAQ, HowTo, tool promotion DTO
- `tools/<tool-id>`: 각 계산기·게임·Pomodoro·Lotto·내부 도구의 규칙과 UI
- `finance`: 월별 snapshot 규칙, repository, workspace UI
- `seo`: canonical, robots, JSON-LD, sitemap, OG renderer
- `analytics`: GA4 visitor 계약, fresh/stale cache, client reader
- `site-shell`: navigation, provider, 공통 layout/about/faq 표시

module 이름을 추가하기 전에 기존 owner가 인터페이스를 확장하는 편이 더 단순한지 확인한다.

## 필요한 레이어만 만든다

```text
modules/<domain>/
  public.ts      # 환경 중립 외부 인터페이스
  ui.ts          # server-safe UI 외부 인터페이스
  client.ts      # client 외부 인터페이스
  server.ts      # server 외부 인터페이스
  domain/        # 순수 규칙과 값 타입 구현
  ui/            # 표시 구현
  client/        # URL/React 상태와 browser adapter 구현
  server/        # filesystem/network/repository/cache 구현
```

이 트리는 선택지다. 순수 계산 모듈은 `public.ts`와 `domain/**`만 있어도 된다. server 기능이 없는 모듈에 빈 `server/`나 `server.ts`를 만들지 않는다.

## 외부 import

다른 module과 `app`은 명시적 entry만 사용한다.

```ts
import { queryPlaceList } from '@/modules/places/public';
import { PlacesHub } from '@/modules/places/ui';
import { PlacesFilters } from '@/modules/places/client';
import { loadPlace } from '@/modules/places/server';
```

다음은 금지한다.

```ts
import { loadPlace } from '@/modules/places/server/place-repository';
import { anything } from '@/modules/places';
```

- module root `index.ts`를 만들지 않는다.
- `export *`를 사용하지 않는다. 값과 타입을 named export한다.
- client/server를 하나의 barrel에 넣지 않는다.
- 같은 module 내부 구현은 상대 경로를 사용한다.
- 다른 module 내부 파일을 deep import하지 않는다.

## 레이어 선택

- `domain`: React, Next.js, env, 파일, 네트워크, 브라우저 전역 없이 테스트 가능한 규칙
- `server`: 파일, 비밀 환경 값, 외부 API, repository, cache, metadata loader
- `client`: `'use client'`, nuqs, LocalStorage, clipboard, audio, fullscreen, React 상태 orchestration
- `ui`: 브라우저 상태 없이 props를 렌더링하는 server-safe UI

client 조합 UI는 `ui` leaf에 값을 전달한다. `'use client'`가 필요하다는 이유만으로 모든 JSX를 `client`에 넣지 않는다.

## Tool module

`tools`는 하나의 거대한 module이 아니다.

```text
modules/tools/
  catalog/                    # tool 목록/메타데이터 계약
  loan-calculator/
  dsr-calculator/
  savings-calculator/
  home-buying-funds-calculator/
  moving-budget-checklist/
  last-digit-game/
  pomodoro/
  lotto/
  og-image-studio/
```

각 `<tool-id>`가 독립 module이다. catalog는 tool의 공개 요약 계약을 소유하지만 계산기 내부 규칙이나 client 상태를 소유하지 않는다.

## Next.js와 원천 데이터

- `page.tsx`, `route.ts`, metadata route의 framework export는 `app`에 둔다.
- module은 framework 독립 결과를 반환하고 `app`이 `notFound()`와 Response를 조합한다.
- `content/posts`, `content/places`, `content/benefits`, `data/private`, `public`의 원천 위치는 유지한다.
- server adapter가 원천 위치를 읽고, content는 필요할 때 `public.ts`의 타입만 `import type`한다.

## 새 module 추가 순서

1. module owner와 공개 계약을 한 문장으로 쓴다.
2. 관찰 가능한 동작을 기존 test 또는 characterization test로 고정한다.
3. 가장 작은 공개 entry를 먼저 설계한다.
4. 실제로 필요한 구현 레이어만 만든다.
5. `app` 또는 legacy consumer를 공개 entry로 연결한다.
6. compatibility facade가 필요하면 ledger에 생성/제거 조건을 기록한다.
7. type/lint/domain test/build와 공개 계약을 검증한다.

새 module 구현이 legacy `@/components`, `@/lib`, `@/hooks`, `@/types`를 import해서는 안 된다. 구현을 먼저 옮긴 뒤 legacy 파일이 새 entry를 가리키는 단방향 facade를 사용한다.

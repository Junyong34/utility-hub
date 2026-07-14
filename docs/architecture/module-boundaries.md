# 모듈 경계와 import 규칙

이 문서는 새 `modules`, `shared`, `config` 코드에 즉시 적용할 의존 방향을 정의한다. 기존 `app`, `components`, `lib`, `hooks`, `types`의 위반은 한 번에 허용 목록으로 만들지 않고 [마이그레이션 ledger](./migration-ledger.md)에서 줄여 나간다.

## 용어

- **모듈(Module)**: 호출자가 사용하는 작은 인터페이스와 그 뒤의 구현을 함께 소유하는 기능 단위
- **인터페이스(Interface)**: 타입뿐 아니라 기본값, 오류, 캐시, 설정, 직렬화와 같은 호출자가 알아야 할 계약 전체
- **Seam**: 모듈 인터페이스가 놓여 호출자가 구현을 직접 알지 않아도 되는 위치
- **Adapter**: Next.js, 파일시스템, 브라우저, 외부 API를 모듈 인터페이스에 연결하는 구현

각 모듈은 외부 seam을 `public.ts`, `ui.ts`, `client.ts`, `server.ts` 중 필요한 파일로만 제공한다. 인터페이스 수가 구현 파일 수를 따라 늘어나지 않게 하고, 호출자에게 필요한 행위만 명시적으로 export한다.

## 전체 의존 방향

```text
app ────────────────> modules/*/{public,ui,client,server}.ts
 │                                  │
 ├───────────────> shared/* <───────┤
 └───────────────> config/* <───────┘

content/data/public --(location adapter)--> modules/*/server

shared, config -X-> modules, app
modules/* -X-> app
```

`app`, `content`, `data`, `public`과 루트 framework config는 위치를 유지하는 adapter다. 업무 규칙과 I/O 구현은 owner module에 둔다.

## 레이어별 책임

| 위치                         | 소유 책임                                                                  | 허용 의존                                                                                                                                                                                                     | 금지 의존                                                                                             |
| ---------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `modules/<domain>/domain/**` | 순수 규칙, 계산, 값 타입, parser/serializer, 불변식                        | 같은 module의 `domain`, `shared/domain`, `shared/contracts`, 필요 시 다른 module의 `public.ts`에 선언된 순수 계약                                                                                             | React, Next.js, Node builtin, `process.env`, 파일·네트워크, DOM/window/storage, 다른 module deep path |
| `modules/<domain>/ui/**`     | 서버에서도 안전한 표시와 순수 렌더링                                       | 같은 module의 `domain`, `public.ts`, `shared/ui`, `shared/domain`, `shared/contracts`, 다른 module의 `public.ts` 또는 `ui.ts`                                                                                 | `'use client'`, browser API, LocalStorage, module `client.ts`/`server.ts`, Node builtin, server env   |
| `modules/<domain>/client/**` | `'use client'` root, React/URL state, browser side effect, browser adapter | 같은 module의 `domain`, `public.ts`, `ui.ts`, `shared/ui`, `shared/client`, `shared/domain`, `shared/contracts`, 다른 module의 명시적 `public.ts`/`ui.ts`/`client.ts`                                         | 모든 `server.ts`, `server/**`, Node builtin, 비밀 env, 다른 module deep path                          |
| `modules/<domain>/server/**` | 파일·외부 API·repository·서버 캐시·metadata loader                         | 같은 module의 `domain`, `public.ts`, `config/site`, `config/env/*.server`, `config/runtime/server`, `shared/server`, `shared/domain`, `shared/contracts`, 필요한 다른 module의 명시적 `public.ts`/`server.ts` | `app`, 다른 module deep path, browser API, client entry                                               |
| `app/**`                     | Next.js route/layout/metadata adapter                                      | module의 명시적 entry, `shared`, `config`                                                                                                                                                                     | module deep path, 장기 상태, 계산 규칙, repository 구현, 원천 데이터 직접 집계                        |
| `shared/**`                  | 두 개 이상의 module이 같은 의미로 소비하는 공통 기능                       | 같은 shared leaf, `config/site`처럼 환경 중립 설정                                                                                                                                                            | `modules`, `app`, legacy `components`/`lib`/`hooks`/`types`, 비밀 env를 client-safe leaf에 노출       |
| `config/**`                  | 환경 값 정규화와 서비스/런타임 설정                                        | 더 낮은 수준의 config leaf와 표준 라이브러리                                                                                                                                                                  | `modules`, `app`, `shared`, UI 코드                                                                   |
| `content/**`                 | 사람이 관리하는 원천 콘텐츠                                                | 대응 module의 환경 중립 계약을 `import type`으로만 참조 가능                                                                                                                                                  | module implementation, server/client/UI entry, I/O 실행                                               |

### 교차 모듈 호출

다른 모듈을 사용할 때는 해당 모듈의 공개 인터페이스를 호출한다.

```ts
// 허용: home의 server 구현이 places의 server 인터페이스를 소비
import { listFeaturedPlaces } from '@/modules/places/server';

// 금지: places 내부 repository를 직접 탐색
import { listFeaturedPlaces } from '@/modules/places/server/place-repository';
```

교차 호출이 순환을 만들면 한 모듈이 다른 모듈의 내부를 import해서 해결하지 않는다. 조합 책임을 `app` 또는 상위 owner module로 옮기거나, 실제 양쪽이 공유하는 직렬화 계약만 `shared/contracts`로 추출한다.

`modules/tools/catalog`는 각 도구의 `public.ts`에 공개된 manifest만 명시적 순서로 등록한다. 개별 `modules/tools/<tool-id>`는 aggregate catalog를 역으로 import하지 않는다. 양쪽이 공유하는 manifest shape는 `shared/contracts/tool-manifest.ts`가 소유하며, architecture test의 `tool-no-catalog-reverse-import` 규칙이 역참조를 차단한다.

## 공개 entry 규칙

모든 entry는 필요한 경우에만 만든다. 빈 레이어와 빈 entry를 형식적으로 만들지 않는다.

| Entry       | 실행 환경          | 허용하는 export                                                                  |
| ----------- | ------------------ | -------------------------------------------------------------------------------- |
| `public.ts` | server/client 공통 | 환경 중립 타입, 값, 순수 함수, 직렬화 계약                                       |
| `ui.ts`     | server-safe React  | 순수 표시 UI와 그 props 타입                                                     |
| `client.ts` | client             | browser 상태 조합 UI, hook, browser adapter. 파일 첫 줄에 `'use client'`를 둔다. |
| `server.ts` | Node/server        | loader, repository factory, metadata/외부 API adapter                            |

`modules/tools/<tool-id>`는 `<tool-id>` 자체를 모듈로 취급한다. 예를 들어 외부 소비자는 `@/modules/tools/lotto/client`를 사용하고 `@/modules/tools/lotto/client/LottoRecommendProvider`를 사용하지 않는다.

### 명시적 export

새 entry에서 broad barrel은 금지한다.

```ts
// 허용
export { queryPlaceList } from './domain/place-list-query';
export type { PlaceListPageResponse } from './domain/place-list-contract';

// 금지
export * from './domain/place-list-query';
export * from './domain';
```

- 새 module root에 통합 `index.ts`를 만들지 않는다.
- client와 server를 한 entry에서 함께 export하지 않는다.
- export 이름은 인터페이스의 일부다. 내부 파일을 옮겨도 호출자의 import와 의미가 유지돼야 한다.
- entry가 단순히 모든 내부 구현을 노출하면 모듈의 seam으로 인정하지 않는다.

## Next.js adapter 규칙

Next.js가 파일을 직접 분석하는 다음 선언과 호출은 `app`에 남긴다. module에서 재-export하지 않는다.

- `page.tsx`, `layout.tsx`, `not-found.tsx`의 default export
- Route Handler의 `GET`, `POST` 등 HTTP method export
- `metadata`, `viewport`
- `generateMetadata`, `generateStaticParams`
- `runtime`, `dynamic`, `revalidate`, 기타 segment config
- `notFound()` 호출과 최종 `Response`/`NextResponse` 조합

module은 Next.js adapter가 판단할 수 있는 결과를 반환한다. 예를 들어 detail loader는 `null`을 반환하고, `app` 진입점이 `notFound()`를 호출한다. API module은 DTO 또는 도메인 오류를 반환하고, `route.ts`가 status와 header를 결정한다.

현재 반드시 보존할 특수 선언은 다음과 같다.

- `app/api/analytics/visitors/route.ts`: `runtime = 'nodejs'`, `dynamic = 'force-dynamic'`
- 모든 OG Route Handler: `runtime = 'nodejs'`
- `app/tools/lotto/page.tsx`: `dynamic = 'force-dynamic'`
- `app/finance/input/page.tsx`: `dynamic = 'force-dynamic'`
- blog category/detail, places region/detail, lotto round: `generateStaticParams`
- 동적 blog/places/lotto detail: `generateMetadata`와 `notFound()`
- root layout: `metadata`, `viewport`, local font와 Provider 연결

## Server-safe UI와 client UI

`'use client'` 유무는 UI의 제품 소유권이 아니라 실행 환경을 뜻한다.

- `ui/**`는 props로 받은 값을 렌더링한다. `window`, URL state, storage, audio, clipboard, fullscreen을 읽지 않는다.
- `client/**`는 상태와 side effect를 소유하고 `ui/**`에 직렬화 가능한 값을 전달한다.
- client 조합 UI가 필요해도 표시 leaf까지 모두 client로 만들지 않는다.
- 서버 loader 결과는 명시적인 DTO로 client seam을 건넌다. class, 함수, secret, filesystem path를 직렬화하지 않는다.

### `shared/ui`의 제한적 client directive 예외

도메인 module의 `ui/**`는 server-safe를 유지하며 `'use client'`와 browser orchestration을 금지한다. 다만 shadcn/Radix처럼 event handler를 받는 공통 표시 primitive는 다음 조건을 모두 만족할 때 `shared/ui/<leaf>.tsx` 자체에 `'use client'`를 둘 수 있다.

1. Server→Client seam을 건너는 표시 props는 직렬화 가능해야 한다. React event callback은 이미 client graph 안에 있는 소비자가 전달할 때만 허용한다.
2. `window`, URL state, LocalStorage, clipboard, audio, fullscreen을 직접 읽거나 조율하지 않는다.
3. server entry, Node builtin, server env를 import하지 않는다.
4. 제품 도메인 상태나 업무 규칙을 소유하지 않는다.

직접 browser API를 호출하거나 상태 생명주기를 조율하는 구현은 `shared/client`가 소유한다. 이 예외는 module `ui/**`를 client 상태 소유자로 바꾸는 근거가 아니다.

## `shared` 승격 규칙

다음 조건을 모두 만족할 때만 `shared`로 이동한다.

1. 실제로 두 개 이상의 module이 소비한다.
2. 두 소비자가 같은 이름뿐 아니라 같은 의미와 불변식을 공유한다.
3. owner module 하나가 인터페이스를 제공하는 편보다 공통 소유가 명확하다.
4. `shared`가 module을 import하지 않아도 구현할 수 있다.

`utils`, `common`, `helpers`처럼 책임을 숨기는 폴더를 만들지 않는다. `shared/client/clipboard.ts`, `shared/contracts/navigation.ts`처럼 기능 이름을 사용한다.

## Legacy 이관 규칙

legacy root는 `components`, `lib`, `hooks`, `types`다.

- 새 `modules`, `shared`, `config` 파일에서 legacy root import를 추가하지 않는다.
- 먼저 구현을 새 module로 옮긴다.
- 기존 소비자가 필요하면 legacy 경로가 새 entry를 **명시적으로** re-export하는 단방향 facade가 된다.
- 새 코드가 legacy facade를 import하면 안 된다.
- facade 생성·소비자 전환·제거 예정은 `migration-ledger.md`에 기록한다.
- 제거 전 정적 import뿐 아니라 dynamic import, `process.cwd()`, file URL, 문자열 경로, package script, 운영 문서를 다시 조사한다.

## 경계 검증 원칙

새 코드에는 즉시 엄격한 규칙을 적용하고 기존 위반은 ledger로만 추적한다. architecture test와 ESLint는 최종적으로 다음을 차단해야 한다.

- module 간 deep import와 `export *`
- client/UI → server, Node builtin, server env
- domain → React/Next/I/O/env/browser
- shared/config → modules/app
- 런타임 코드의 config 밖 직접 `process.env`
- 신규 코드의 legacy root import
- secret이 client graph, 직렬화 결과, 로그 또는 오류 payload로 나가는 경로

## 리뷰 체크리스트

새 import를 추가하기 전에 다음을 확인한다.

1. 이 파일의 owner module은 하나로 설명되는가?
2. 외부 소비자가 공개 entry만 보는가?
3. Next.js 특수 export가 `app`에 남아 있는가?
4. UI와 browser 상태가 분리돼 있는가?
5. server secret이나 filesystem 경로가 client seam을 넘지 않는가?
6. 공통화라면 같은 의미의 두 번째 실제 소비자가 있는가?
7. 임시 facade라면 ledger에 제거 조건이 있는가?

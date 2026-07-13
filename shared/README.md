# Shared

`shared`는 두 개 이상의 module이 **같은 의미와 불변식**으로 사용하는 코드만 소유한다. 이름이 비슷하거나 재사용될 것 같다는 예상만으로 이동하지 않는다.

현재 공통 코드는 주로 `components/ui`, `components/magicui`, `lib/utils.ts`, `lib/clipboard.ts`, root types에 있다. 실제 이관 상태는 [`docs/architecture/migration-ledger.md`](../docs/architecture/migration-ledger.md)를 따른다.

## 탐색 순서

1. 먼저 기능을 소유한 `modules/<domain>`을 찾는다.
2. 같은 의미의 두 번째 실제 소비자가 있는지 확인한다.
3. 양쪽 module이 owner가 될 수 없을 때만 이름이 구체적인 shared leaf로 이동한다.

## 허용 영역

```text
shared/
  ui/           # shadcn primitive와 실제 공통 표시 UI
  contracts/    # navigation, promotion 등 교차 module 직렬화 계약
  domain/       # geography, verification status처럼 같은 의미의 순수 모델
  client/       # clipboard 같은 공통 browser adapter
  server/       # 두 module이 실제 공유하는 server adapter가 생긴 뒤에만
```

빈 영역을 형식적으로 만들지 않는다. 현재 `shared/server` 소비자가 없다면 디렉터리도 만들지 않는다.

## 승격 기준

다음 조건을 모두 만족해야 한다.

1. 두 개 이상의 module이 실제로 소비한다.
2. 각 소비자에서 이름뿐 아니라 의미, 기본값, 오류와 불변식이 같다.
3. 한 owner module의 공개 인터페이스로 제공하는 편보다 공통 소유가 명확하다.
4. `modules`나 `app`을 import하지 않고 구현할 수 있다.
5. 테스트가 shared leaf의 관찰 가능한 계약을 설명할 수 있다.

두 번째 소비자가 아직 없으면 원래 owner module에 둔다. 미래 재사용을 예상한 승격은 하지 않는다.

## 의존 규칙

`shared`는 의존 그래프의 아래쪽에 있다.

- `shared` → 다른 이름이 구체적인 shared leaf: 허용
- `shared` → 환경 중립 `config/site`: 필요한 경우 허용
- `shared` → `modules`, `app`: 금지
- `shared` → legacy `components`, `lib`, `hooks`, `types`: 신규 코드에서 금지
- `shared/ui`, `shared/client` → server env, Node builtin, filesystem: 금지
- `shared/domain`, `shared/contracts` → React, Next.js, browser API: 금지

module이 shared를 사용할 수는 있지만 shared가 module DTO를 import해서는 안 된다. 교차 계약이 필요하면 domain-specific 필드를 제거한 최소 직렬화 계약을 `shared/contracts/<name>.ts`가 소유한다.

## 이름과 import

책임을 숨기는 다음 이름은 만들지 않는다.

- `shared/utils`
- `shared/common`
- `shared/helpers`
- `shared/misc`

기능 이름을 드러낸다.

```ts
import { copyText } from '@/shared/client/clipboard';
import type { NavigationItem } from '@/shared/contracts/navigation';
import { Button } from '@/shared/ui/button';
```

`shared/index.ts`, 영역 전체 `index.ts`, `export *`는 사용하지 않는다. 호출자는 필요한 leaf를 직접 import한다. 이 규칙은 tree-shaking보다 소유권과 실행 환경을 import 경로에서 읽을 수 있게 하는 데 목적이 있다.

## UI와 client 구분

- `shared/ui`: props를 렌더링하는 server-safe primitive. `'use client'`가 필요한 Radix primitive는 해당 파일 자체의 실행 환경을 명시하되 server 기능을 import하지 않는다.
- `shared/client`: clipboard, viewport, browser capability 같은 side effect adapter와 hook.
- 제품 문구, 도메인 상태, tool 전용 variant는 shared UI에 넣지 않고 owner module이 조합한다.
- `shared/ui`가 module의 타입을 요구한다면 seam이 잘못된 것이다. primitive props 또는 shared contract로 축소한다.

shadcn component를 추가하거나 갱신할 때 generator alias가 `shared/ui`를 가리키는지 먼저 확인한다. legacy `components/ui` facade가 존재하는 기간에도 새 코드는 `@/shared/ui/<name>`만 사용한다.

## Contracts와 domain

`shared/contracts`는 route나 framework 객체가 아니라 직렬화 가능한 교차 module 언어를 담는다. 예시는 navigation item과 home promotion DTO다.

`shared/domain`은 geography나 verification status처럼 실제 여러 module에서 같은 의미로 사용되는 순수 값만 담는다. 장소와 혜택의 검증 정책이 이름만 같고 규칙이 다르면 각각의 module에 둔다.

## Server adapter

하나의 구현만 존재한다면 owner module의 `server`에 둔다. 두 module이 서로 다른 adapter를 교체해야 하는 실제 seam이 생기기 전에는 `shared/server`를 만들지 않는다.

비밀 값이나 filesystem path를 shared client/public 계약으로 export하지 않는다. server 결과를 client에 전달할 때는 owner module이 직렬화 가능한 DTO로 변환한다.

## 리뷰 질문

shared 파일을 추가하기 전에 답한다.

1. 실제 소비 module 두 곳은 어디인가?
2. 두 소비자가 공유하는 의미와 불변식은 무엇인가?
3. owner module의 작은 인터페이스로 제공하면 안 되는 이유는 무엇인가?
4. shared에서 module/app import 없이 구현 가능한가?
5. 파일 이름만 보고 기능과 실행 환경을 알 수 있는가?

하나라도 답할 수 없으면 shared로 승격하지 않는다.

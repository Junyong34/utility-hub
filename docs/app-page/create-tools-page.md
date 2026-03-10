# app/tools 신규 페이지 생성 작업 명세서

작성일: 2026-03-10

이 문서는 `app/tools` 아래에 새로운 Tool 페이지를 추가할 때 AI가 안전하게 작업하기 위한 구조화된 작업 명세서다.  
목적은 화면 설명이 아니라 다음을 빠르게 판단하게 하는 것이다.

- 새 Tool 생성 시 반드시 추가해야 하는 파일과 수정해야 하는 파일이 무엇인지
- 어떤 파일이 URL, SEO, 구조화 데이터, `/tools` 목록, sitemap을 각각 결정하는지
- 어디까지는 `TOOL_CONFIGS` 기반 자동 반영이고, 어디부터는 수동 반영인지
- 메인 Tool 페이지와 Tool 서브페이지 생성 방식이 어떻게 다른지

## 1. 목적과 범위

### 목적

- 신규 Tool 추가 시 필요한 파일 생성/수정 포인트를 고정한다.
- Tool 메타데이터, breadcrumb, 구조화 데이터, `/tools` 목록, sitemap 연동 규칙을 정리한다.
- 작업 순서를 명확히 해서 누락 없는 생성 플로우를 제공한다.

### 포함 범위

- 라우트
  - `app/tools/page.tsx`
  - `app/tools/<tool-id>/page.tsx`
  - `app/tools/<tool-id>/**/page.tsx`
- Tool 메타/SEO
  - `lib/tools/tool-config.ts`
  - `lib/tools/tool-metadata.ts`
  - `lib/tools/tool-breadcrumb.ts`
  - `lib/tools/tool-structured-data.ts`
  - `lib/seo/sitemap.ts`
- 공통 UI
  - `components/tools/ToolSwitcher.tsx`
  - `components/seo/*`
  - `components/ui/*`

### 비포함 범위

- 각 Tool의 개별 도메인 로직 구현 상세
- 외부 API/DB 연동 설계
- 홈 노출 우선순위 세부 운영 기준

## 2. 소스 오브 트루스

신규 Tool 생성 시 가장 먼저 봐야 하는 중심 파일은 아래다.

| 영역 | 소스 파일 | 역할 |
| --- | --- | --- |
| Tool 등록 레지스트리 | `lib/tools/tool-config.ts` | Tool ID, 이름, 설명, 키워드, FAQ, HowTo, 아이콘, 색상 등 중앙 관리 |
| Tool 메타데이터 | `lib/tools/tool-metadata.ts` | `generateToolMetadata(toolId)`로 canonical, title, description, og 설정 생성 |
| Tool breadcrumb | `lib/tools/tool-breadcrumb.ts` | UI breadcrumb와 JSON-LD breadcrumb용 라벨/경로 생성 |
| Tool 구조화 데이터 | `lib/tools/tool-structured-data.ts` | `WebPage`, `WebApplication`, `FAQPage`, `HowTo`, `BreadcrumbList` 생성 |
| Tool 목록 페이지 | `app/tools/page.tsx` | `getAllToolConfigs()` 기반 `/tools` 카드 목록 생성 |
| Tool 전환기 | `components/tools/ToolSwitcher.tsx` | `getAllToolConfigs()` 기반 Tool 이동 UI |
| sitemap | `lib/seo/sitemap.ts` | 메인 Tool 페이지 자동 등록, 일부 서브페이지 수동 등록 |

핵심 원칙:

- 새 Tool의 1차 소스 오브 트루스는 `app/tools/...`가 아니라 `lib/tools/tool-config.ts`다.
- `TOOL_CONFIGS`에 등록하지 않으면 `/tools` 목록, `ToolSwitcher`, 메타데이터 헬퍼, sitemap 자동 수집이 모두 끊긴다.
- 메인 Tool 페이지(`/tools/<tool-id>`)는 `TOOL_CONFIGS` 등록만으로 목록/sitemap에 자동 반영되지만, 서브페이지(`/tools/<tool-id>/stats`)는 자동 반영되지 않는다.

## 3. 메인 Tool 생성 시 반드시 건드려야 하는 파일

### 3.1 필수 수정 파일

| 파일 | 작업 | 이유 |
| --- | --- | --- |
| `lib/tools/tool-config.ts` | `TOOL_CONFIGS['<tool-id>']` 추가 | Tool 전체의 공개 계약과 SEO 원본 데이터 등록 |
| `app/tools/<tool-id>/page.tsx` | 신규 페이지 생성 | 실제 라우트 생성 |

### 3.2 조건부 생성 파일

| 파일/경로 | 생성 조건 | 이유 |
| --- | --- | --- |
| `components/tools/<tool-id>/*` | Tool UI가 1개 파일로 끝나지 않을 때 | 폼, 결과, 섹션, 훅 분리 |
| `lib/tools/<tool-domain>.ts` | 계산/변환/생성 로직이 있을 때 | UI와 도메인 로직 분리 |
| `hooks/*` 또는 `components/tools/<tool-id>/hooks/*` | URL 상태, 입력 상태, 계산 흐름이 복잡할 때 | 클라이언트 상태 분리 |
| `public/og-images/...` | Tool별 전용 OG 이미지가 필요할 때 | `tool-config.ts`의 `ogImage`와 연결 |

### 3.3 자동 반영되는 소비처

`tool-config.ts`에 새 Tool이 등록되면 현재 구현 기준으로 아래가 자동 반영된다.

- `/tools` 목록 카드
- `ToolSwitcher` 옵션 목록
- 메인 Tool 페이지 canonical/metadata 생성 헬퍼
- 메인 Tool 페이지용 구조화 데이터 생성 헬퍼
- sitemap의 `/tools/<tool-id>` 메인 엔트리

## 4. `TOOL_CONFIGS` 등록 규칙

### 4.1 필수 필드

`lib/tools/types.ts`의 `ToolConfig` 기준:

- `id`
- `name`
- `description`
- `publishedAt`
- `keywords`
- `category`

### 4.2 실질적으로 필수에 가까운 필드

현재 코드 패턴 기준으로 아래 필드는 강하게 권장된다.

- `shortName`
- `breadcrumbLabel`
- `ogImage`
- `icon`
- `color`
- `faq`
- `howTo`

중요한 제약:

- 현재 메인 Tool 페이지들은 `assertToolStructuredData('<tool-id>')`를 기본 옵션으로 호출한다.
- 이 기본 검증은 `WebApplication`, `FAQPage`, `HowTo` 3가지를 요구한다.
- 따라서 `faq` 또는 `howTo`를 비워 둔 상태에서 기존 패턴대로 페이지를 만들면 런타임 에러가 발생할 수 있다.

즉, 현재 관례를 그대로 따를 경우 새 Tool은 `faq`와 `howTo`까지 함께 준비하는 것이 안전하다.

### 4.3 `id` 계약

- `id`는 URL 경로와 1:1이다.
- `/tools/<tool-id>` 경로, canonical, sitemap, `ToolSwitcher`, `/tools` 카드 링크가 모두 이 값을 사용한다.
- 생성 후 `id`를 바꾸는 작업은 단순 rename이 아니라 SEO/링크 계약 변경이다.

## 5. 권장 디렉토리 구조

현재 저장소에는 두 패턴이 공존한다.

- 신규/정리된 패턴: `components/tools/<tool-id>/*`
- 기존 특화 패턴: `components/lotto/*`

신규 Tool은 특별한 이유가 없으면 아래 패턴을 우선 사용한다.

```text
app/
  tools/
    <tool-id>/
      page.tsx

components/
  tools/
    <tool-id>/
      index.ts
      <ToolRoot>.tsx
      hooks/
      sections/
      components/

lib/
  tools/
    <tool-domain>.ts
```

구성 원칙:

- 페이지 셸은 `app/tools/<tool-id>/page.tsx`
- 복잡한 클라이언트 UI는 `components/tools/<tool-id>/*`
- 순수 계산/변환 로직은 `lib/tools/*`
- 여러 Tool에서 재사용되는 UI는 `components/ui/*`

## 6. 메인 Tool 페이지 기본 템플릿

현재 `loan-calculator`, `lotto` 페이지 기준으로 메인 Tool 페이지는 아래 패턴을 따르는 것이 안전하다.

```tsx
import { Metadata } from 'next'
import { Suspense } from 'react'
import { Breadcrumb, JsonLdMultiple } from '@/components/seo'
import { ToolSwitcher } from '@/components/tools/ToolSwitcher'
import { MyToolRoot } from '@/components/tools/my-tool'
import {
  assertToolStructuredData,
  generateToolMetadata,
  getToolBreadcrumbItems,
  getToolStructuredDataArray,
} from '@/lib/tools'

assertToolStructuredData('my-tool')

export const metadata: Metadata = generateToolMetadata('my-tool')

export default function MyToolPage() {
  const structuredData = getToolStructuredDataArray('my-tool')

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumb items={getToolBreadcrumbItems('my-tool')} className="mb-4" />
            <ToolSwitcher currentToolId="my-tool" />
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          <section>
            <h1 className="text-3xl font-bold text-foreground">도구 이름</h1>
            <p className="mt-1 text-muted-foreground">도구 설명</p>
          </section>

          <Suspense fallback={<div className="text-muted-foreground">로딩 중...</div>}>
            <MyToolRoot />
          </Suspense>
        </main>
      </div>
    </>
  )
}
```

이 템플릿에서 빠뜨리면 안 되는 포인트:

- `metadata`
- `JsonLdMultiple`
- `Breadcrumb`
- `ToolSwitcher`
- `getToolStructuredDataArray('<tool-id>')`

## 7. SEO 추가 규칙

### 7.1 메인 페이지 SEO

메인 Tool 페이지는 원칙적으로 아래 흐름을 따른다.

1. `tool-config.ts`에 Tool 설명/키워드/OG/FAQ/HowTo 등록
2. `generateToolMetadata('<tool-id>')`로 `Metadata` 생성
3. `getToolStructuredDataArray('<tool-id>')`로 JSON-LD 배열 생성
4. `<JsonLdMultiple data={structuredData} />`로 렌더링
5. `getToolBreadcrumbItems('<tool-id>')`로 UI breadcrumb 구성

### 7.2 메인 Tool 페이지가 자동으로 갖게 되는 SEO 속성

현재 구현 기준:

- canonical: `https://www.zento.kr/tools/<tool-id>`
- ogType: `website`
- WebPage schema
- Breadcrumb schema
- WebApplication schema
- `faq`가 있으면 FAQPage schema
- `howTo`가 있으면 HowTo schema

### 7.3 아이콘과 카드 노출

- `/tools` 카드와 일부 UI는 `tool-config.ts`의 `icon`, `badge`, `color`를 사용한다.
- `icon`은 `lib/tools/tool-icons.ts`에서 `lucide-react` 문자열 이름으로 해석된다.
- 존재하지 않는 아이콘 이름은 기본 아이콘(Box)으로 폴백된다.

## 8. Tool 서브페이지 생성 규칙

`/tools/<tool-id>` 메인 페이지가 아니라 `/tools/<tool-id>/stats`, `/tools/<tool-id>/guide` 같은 하위 페이지를 만들 때는 별도 규칙이 필요하다.

### 8.1 필수 생성 파일

- `app/tools/<tool-id>/<sub-path>/page.tsx`

### 8.2 권장 구현 패턴

현재 `app/tools/lotto/stats/page.tsx` 기준으로 아래 패턴이 안전하다.

```tsx
import { Metadata } from 'next'
import { Breadcrumb, JsonLdMultiple } from '@/components/seo'
import { generateMetadata as createMetadata } from '@/lib/seo'
import {
  assertToolStructuredData,
  getToolBreadcrumbItems,
  getToolStructuredDataBreadcrumbs,
  getToolSubPageStructuredDataArray,
} from '@/lib/tools'

assertToolStructuredData('my-tool')

export const metadata: Metadata = createMetadata({
  title: '서브페이지 제목',
  description: '서브페이지 설명',
  canonical: 'https://www.zento.kr/tools/my-tool/sub-page',
  keywords: ['키워드'],
})

export default function MyToolSubPage() {
  const structuredData = getToolSubPageStructuredDataArray({
    toolId: 'my-tool',
    path: '/tools/my-tool/sub-page',
    name: '서브페이지 제목',
    description: '서브페이지 설명',
    breadcrumbs: getToolStructuredDataBreadcrumbs(
      'my-tool',
      'sub-page',
      '서브페이지 제목'
    ),
  })

  return (
    <>
      <JsonLdMultiple data={structuredData} />
      <Breadcrumb items={getToolBreadcrumbItems('my-tool', [{ name: '서브페이지 제목' }])} />
    </>
  )
}
```

### 8.3 서브페이지에서 반드시 같이 점검할 것

- UI breadcrumb: `getToolBreadcrumbItems()`
- JSON-LD breadcrumb: `getToolStructuredDataBreadcrumbs()`
- JSON-LD 묶음: `getToolSubPageStructuredDataArray()`
- canonical: 서브페이지 절대 경로로 직접 지정

### 8.4 sitemap 주의점

- 메인 Tool 페이지(`/tools/<tool-id>`)는 `collectToolEntries()`에서 자동 등록된다.
- Tool 서브페이지는 현재 자동 수집되지 않는다.
- 예외적으로 `lotto/stats`는 `lib/seo/sitemap.ts`에 수동 추가되어 있다.

즉, 서브페이지를 새로 만들면 sitemap 반영이 필요한지 반드시 `lib/seo/sitemap.ts`를 같이 확인해야 한다.

## 9. 작업 순서

신규 Tool 메인 페이지 생성은 아래 순서가 가장 안전하다.

1. `tool-id`를 먼저 확정한다.
2. `lib/tools/tool-config.ts`에 `TOOL_CONFIGS['<tool-id>']`를 추가한다.
3. `faq`, `howTo`, `icon`, `ogImage`, `breadcrumbLabel`까지 같이 채운다.
4. `app/tools/<tool-id>/page.tsx`를 생성한다.
5. UI가 복잡하면 `components/tools/<tool-id>/*`로 분리한다.
6. 계산/변환/생성 로직이 있으면 `lib/tools/*`로 이동한다.
7. 서브페이지가 있으면 `app/tools/<tool-id>/**/page.tsx`와 `lib/seo/sitemap.ts`까지 같이 본다.
8. `/tools`, `/tools/<tool-id>`, 필요한 서브페이지를 함께 검증한다.

## 10. 수정 영향 범위

신규 Tool 추가 또는 기존 Tool 변경 시 영향 범위는 아래처럼 본다.

| 변경 지점 | 함께 봐야 하는 곳 |
| --- | --- |
| `tool-config.ts`의 `id` 변경 | 라우트 경로, metadata canonical, `/tools` 목록, `ToolSwitcher`, sitemap |
| `tool-config.ts`의 `name`/`description` 변경 | 페이지 메타데이터, 구조화 데이터, `/tools` 카드 문구 |
| `faq`/`howTo` 변경 | JSON-LD, `assertToolStructuredData()` 검증 |
| `icon`/`color`/`badge` 변경 | `/tools` 카드, Tool 전환 UX 일부 |
| 서브페이지 추가 | breadcrumb, canonical, JSON-LD, sitemap 수동 등록 여부 |

## 11. 검증 체크리스트

### 필수 확인

- `git branch --show-current`가 `main`인지 확인
- `/tools/<tool-id>` 라우트 접근 가능
- `/tools` 목록에 새 Tool 카드 노출
- `ToolSwitcher`에 새 Tool 옵션 노출
- `generateToolMetadata('<tool-id>')`가 정상 동작
- 페이지에 `JsonLdMultiple`이 포함됨
- breadcrumb가 `홈 / 도구 / {툴명}`으로 노출됨
- sitemap에 `/tools/<tool-id>`가 포함됨

### 서브페이지가 있는 경우 추가 확인

- `/tools/<tool-id>/<sub-path>` 접근 가능
- breadcrumb가 `홈 / 도구 / {툴명} / {서브명}`으로 노출됨
- JSON-LD breadcrumb와 UI breadcrumb 라벨이 일치함
- `lib/seo/sitemap.ts` 수동 등록 필요 여부를 확인했음

## 12. 현재 구현 기준 Known issues / 주의점

- `TOOL_CONFIGS`는 단순 참고 데이터가 아니라 Tool 시스템의 중앙 레지스트리다. 빠뜨리면 여러 소비처가 동시에 깨진다.
- `assertToolStructuredData()` 기본 검증은 생각보다 엄격하다. FAQ/HowTo 없이 기존 패턴을 복사하면 실패할 수 있다.
- Tool 서브페이지 sitemap은 자동이 아니라 현재 일부만 수동 등록되어 있다.
- 컴포넌트 디렉토리 구조는 현재 `components/tools/<tool-id>`와 `components/lotto` 패턴이 혼재한다. 신규 Tool은 하나의 패턴으로 정리해서 시작하는 것이 안전하다.
- `rules/tools-seo-guidelines.md`는 현재 작업 중 직접 확인 가능한 경로로 존재하지 않았다. 이 문서는 실제 코드 기준(`lib/tools/*`, `app/tools/*`, `lib/seo/sitemap.ts`)으로 작성했다.

## 13. 결론

새 Tool 페이지 생성의 핵심은 `app/tools/<tool-id>/page.tsx`를 만드는 것보다 먼저 `lib/tools/tool-config.ts`에 공개 계약을 등록하는 것이다.  
그 다음 메인 페이지는 `generateToolMetadata`, `getToolStructuredDataArray`, `getToolBreadcrumbItems`, `ToolSwitcher` 패턴을 그대로 따르고, 서브페이지가 생기면 `lib/seo/sitemap.ts`까지 함께 점검하는 흐름이 현재 저장소 기준 가장 안전하다.

# Savings Calculator 도메인 구조 명세서

작성일: 2026-03-10

이 문서는 `app/tools/savings-calculator` 도메인을 AI가 안전하게 수정하기 위한 구조화된 작업 명세서다.  
목적은 화면 소개가 아니라 다음을 빠르게 판단하게 하는 것이다.

- 어디가 예금·적금 계산기 도메인의 소스 오브 트루스인지
- 어떤 파일이 URL 상태, 계산 로직, 결과 UI, Tool SEO를 각각 결정하는지
- 어떤 변경이 공유 링크, FAQ 구조화 데이터, sitemap, tool-config, 홈 대시보드까지 전파되는지
- 현재 구현에 남아 있는 리스크와 중복 소스가 무엇인지

## 1. 목적과 범위

### 목적

- `tools/savings-calculator` 도메인의 구조와 공개 계약을 고정한다.
- URL 상태 관리, 계산 로직, 탭 UI, Tool SEO 파이프라인의 연결 관계를 정리한다.
- 수정 시 반드시 함께 봐야 하는 파일과 현재 리스크를 분리한다.

### 포함 범위

- 라우트
  - `app/tools/savings-calculator/page.tsx`
- UI
  - `components/tools/savings-calculator/*`
  - `components/tools/ToolSwitcher.tsx`
  - `components/tools/CalculatorCategoryLinks.tsx`
  - `components/seo/*`
  - `components/ui/bottom-sheet.tsx`
- 상태/도메인 로직
  - `components/tools/savings-calculator/hooks/*`
  - `lib/tools/savings-calculator.ts`
  - `lib/tools/formatting.ts`
  - `lib/tools/tool-config.ts`
  - `lib/tools/tool-breadcrumb.ts`
  - `lib/tools/tool-metadata.ts`
  - `lib/tools/tool-structured-data.ts`
- 외부 소비처
  - `app/tools/page.tsx`
  - `lib/seo/sitemap.ts`
  - `lib/home/dashboard-content.ts`
  - `app/layout.tsx`

### 비포함 범위

- 실제 금융상품 약관 차이의 법률적 해석
- 은행별 우대금리 정책 비교
- 별도 서브페이지 설계

## 2. 소스 오브 트루스 맵

| 영역 | 실제 소스 오브 트루스 | 설명 |
| --- | --- | --- |
| Tool 메타/SEO | `lib/tools/tool-config.ts`의 `TOOL_CONFIGS['savings-calculator']` | 제목, 설명, 키워드, FAQ, HowTo, breadcrumb 라벨, badge, `homeFeatured`의 기준점이다. |
| 계산 로직 | `lib/tools/savings-calculator.ts` | 예금/적금 계산식, 과세 계산, 월별 스케줄 생성, 라벨 상수를 담당한다. |
| URL 상태 계약 | `components/tools/savings-calculator/hooks/parsers.ts` | 쿼리 키 이름과 타입, 기본값 규칙을 정의한다. |
| 예금 탭 상태 | `useDepositCalculator.ts` | 예금 입력값, 계산 가능 여부, 결과 표시 여부를 관리한다. |
| 적금 탭 상태 | `useInstallmentCalculator.ts` | 적금 입력값, 계산 가능 여부, 결과 표시 여부를 관리한다. |
| 페이지 조립 | `app/tools/savings-calculator/page.tsx` | metadata, JSON-LD, breadcrumb, ToolSwitcher, Suspense 경계를 조립한다. |
| 탭 셸 | `SavingsCalculatorForm.tsx` | 예금/적금 탭, 관련 계산기 링크, FAQ UI를 조립한다. |

### 핵심 판단

- 이 도메인은 서버 API나 DB를 사용하지 않는다.
- 계산 결과의 원본 데이터는 외부 저장소가 아니라 URL query string + 클라이언트 메모리 + 순수 함수 계산이다.
- SEO와 UI 설명 텍스트의 기준은 전부 `tool-config`가 아니라, 일부는 별도 UI 컴포넌트에도 중복 저장되어 있다.

## 3. 라우트 맵과 책임

| 경로 | 구현 파일 | 렌더링 성격 | 핵심 책임 |
| --- | --- | --- | --- |
| `/tools/savings-calculator` | `app/tools/savings-calculator/page.tsx` | 서버 페이지 + 클라이언트 폼 | Tool SEO, breadcrumb, 탭형 저축 계산기 진입점 |
| `/tools` | `app/tools/page.tsx` | 서버 페이지 | tool 목록에서 savings-calculator 진입점 제공 |

### 라우트별 핵심 판단

- savings-calculator 도메인은 현재 단일 페이지 안에 두 계산기 탭을 묶어 운영한다.
- 탭 전환, 입력값, 계산 결과, 상세 바텀시트는 모두 클라이언트 상태다.
- 서버에서 계산을 하지 않고, API 호출도 없다.

## 4. 디렉토리 및 컴포넌트 구조

### 런타임 기준 구조

```text
app/
  tools/
    savings-calculator/
      page.tsx

components/
  tools/
    ToolSwitcher.tsx
    CalculatorCategoryLinks.tsx
    savings-calculator/
      SavingsCalculatorForm.tsx
      SavingsCalculatorFAQ.tsx
      constants.ts
      utils.ts
      hooks/
        parsers.ts
        useDepositCalculator.ts
        useInstallmentCalculator.ts
      sections/
        DepositCalculatorSection.tsx
        InstallmentCalculatorSection.tsx
      components/
        DepositInputForm.tsx
        DepositResultCard.tsx
        InstallmentInputForm.tsx
        InstallmentResultCard.tsx
        ResultsView.tsx
        ResultSummaryLabel.tsx
        ShareButton.tsx

lib/
  tools/
    savings-calculator.ts
    formatting.ts
    tool-config.ts
    tool-breadcrumb.ts
    tool-metadata.ts
    tool-structured-data.ts
```

### 책임 분리

| 영역 | 파일 | 책임 |
| --- | --- | --- |
| 도메인 메타/SEO 소스 | `lib/tools/tool-config.ts` | savings-calculator 설명, FAQ, HowTo, 키워드, 기능, 관련 도구, 홈 노출 메타 |
| 페이지 셸 | `app/tools/savings-calculator/page.tsx` | Tool SEO 주입, 제목/설명, 폼 조립 |
| 탭 루트 | `components/tools/savings-calculator/SavingsCalculatorForm.tsx` | 예금/적금 탭과 FAQ, 관련 계산기 링크 렌더링 |
| 예금 상태 | `hooks/useDepositCalculator.ts` | 예금 URL 상태, 계산 실행, 결과 표시 여부 |
| 적금 상태 | `hooks/useInstallmentCalculator.ts` | 적금 URL 상태, 계산 실행, 결과 표시 여부 |
| URL 파서 | `hooks/parsers.ts` | query string 키와 타입 규칙 정의 |
| 계산 로직 | `lib/tools/savings-calculator.ts` | 예금/적금 계산 및 스케줄 생성 |
| 입력 UI | `DepositInputForm.tsx`, `InstallmentInputForm.tsx` | 금액/이율/기간/과세 방식 입력과 quick action |
| 결과 요약 UI | `DepositResultCard.tsx`, `InstallmentResultCard.tsx` | 세전/세후 요약 결과와 공유 버튼 |
| 상세 결과 UI | `ResultsView.tsx` | 월별/연도별 스케줄 상세, 바텀시트 본문 |
| 부가 네비게이션 | `ToolSwitcher.tsx`, `CalculatorCategoryLinks.tsx` | 전체 도구 전환, 같은 calculator 카테고리 링크 |

## 5. 데이터 모델과 저장 방식

### 저장소

- 데이터베이스 없음
- 서버 API 없음
- 정적 JSON 없음
- localStorage/sessionStorage 기반 영속 저장 없음
- 공유 가능한 상태는 URL query string에 저장된다.

### 핵심 타입 계약

`lib/tools/savings-calculator.ts` 기준 공개 계약:

| 타입 | 의미 |
| --- | --- |
| `InterestType` | `simple` 또는 `compound` |
| `TaxType` | `general`, `tax-benefit`, `tax-free` |
| `MonthlyInterestItem` | 월별 원금/이자/누적이자/잔액 |
| `DepositCalculationResult` | 예금 계산 결과 |
| `InstallmentCalculationResult` | 적금 계산 결과 |

### URL 상태 계약

`components/tools/savings-calculator/hooks/parsers.ts` 기준:

#### 예금 계산기

- `amount`
- `period`
- `periodMode`
- `rate`
- `interestType`
- `taxType`
- `customTaxRate`

예시:

```text
/tools/savings-calculator?amount=10000000&period=12&periodMode=month&rate=3.5&interestType=simple&taxType=general&customTaxRate=9.5
```

#### 적금 계산기

- `monthly`
- `period`
- `periodMode`
- `rate`
- `interestType`
- `taxType`
- `customTaxRate`

예시:

```text
/tools/savings-calculator?monthly=500000&period=24&periodMode=month&rate=4.0&interestType=compound&taxType=tax-benefit&customTaxRate=9.5
```

### 저장/조회 관련 핵심 사실

- 예금과 적금은 일부 query key를 공유한다.
  - `period`, `periodMode`, `rate`, `interestType`, `taxType`, `customTaxRate`
- 예금만 `amount`를 쓰고, 적금만 `monthly`를 쓴다.
- 결과 객체 자체를 영속 저장하지 않는다.
- 공유 버튼은 결과 JSON이 아니라 현재 URL 전체를 복사한다.

## 6. 상태 관리, 데이터 흐름, 사용 라이브러리

### 상태 관리 개요

| 상태 종류 | 위치 | 설명 |
| --- | --- | --- |
| Tool 메타 | `lib/tools/tool-config.ts` | 제목, 설명, FAQ, HowTo, 키워드, 홈 노출 메타 |
| URL 상태 | `useDepositCalculator`, `useInstallmentCalculator` | 입력값을 query string에 저장 |
| 로컬 UI 상태 | 각 훅 내부 | `showResults`, `hasCalculated`, `isInitialized` |
| 순수 계산 결과 | 각 훅의 `useMemo` | 입력이 유효할 때 즉시 계산 |
| 탭 상태 | `SavingsCalculatorForm.tsx`의 `Tabs defaultValue` | 현재는 URL에 저장되지 않는 로컬 탭 상태 |

### 페이지 데이터 흐름

1. `app/tools/savings-calculator/page.tsx`가 `generateToolMetadata('savings-calculator')`와 `getToolStructuredDataArray('savings-calculator')`를 사용한다.
2. 같은 페이지가 `Breadcrumb`, `ToolSwitcher`, 설명 텍스트, `SavingsCalculatorForm`을 조립한다.
3. `SavingsCalculatorForm`이 `Tabs`로 예금/적금 섹션을 분기한다.
4. 각 섹션은 자체 훅(`useDepositCalculator`, `useInstallmentCalculator`)을 사용한다.
5. 각 훅은 `useQueryStates()`로 URL 상태를 읽고 쓴다.
6. 입력값이 유효하면 `useMemo`로 계산 결과를 만든다.
7. 사용자가 `계산하기`를 누르면 `hasCalculated`와 `showResults`를 올려 결과 카드와 바텀시트를 노출한다.
8. `ShareButton`은 `window.location.href`를 복사한다.

### 예금 계산기 흐름

1. `amount`, `rate`, `period`, `periodMode`, `interestType`, `taxType`, `customTaxRate`를 URL에서 읽는다.
2. `canCalculate`는 `periodMode` 존재와 금액/기간/이율 범위를 기준으로 계산 가능 여부를 판단한다.
3. `periodMode`가 `year`면 개월 수로 환산해 `calculateDeposit(..., true)`를 호출한다.
4. 결과 카드(`DepositResultCard`)는 실수령액과 세전/세후 이자 요약을 보여준다.
5. 바텀시트 안 `ResultsView`는 연도별/월별 적립 내역을 표시한다.

### 적금 계산기 흐름

1. `monthly`, `rate`, `period`, `periodMode`, `interestType`, `taxType`, `customTaxRate`를 URL에서 읽는다.
2. `canCalculate`는 `periodMode` 존재와 월납입액/기간/이율 범위를 기준으로 판단한다.
3. `periodMode`가 `year`면 개월 수로 환산해 `calculateInstallment(..., true)`를 호출한다.
4. 결과 카드(`InstallmentResultCard`)는 총 납입액, 세전/세후 이자, 총 수령액을 보여준다.
5. 바텀시트 안 `ResultsView`는 연도별/월별 적립 계획을 표시한다.

### 사용 라이브러리

| 라이브러리 | 사용 위치 | 역할 |
| --- | --- | --- |
| `next` / App Router | `app/tools/savings-calculator/page.tsx` | 라우트, metadata |
| `react` | 전반 | 클라이언트 상태, `Suspense`, `useMemo`, `useState` |
| `nuqs` | 각 훅 + `app/layout.tsx` | URL query state 동기화 |
| `lucide-react` | 입력폼, 공유 버튼, 설명 아이콘 | 아이콘 |
| `tailwindcss` | 전역 및 컴포넌트 className | 스타일링 |
| shadcn/ui 계열 컴포넌트 | tabs, card, accordion, collapsible, input, button, toggle-group, tooltip | 폼/상호작용 UI |
| 내부 Tool SEO 유틸 | `lib/tools/*` | metadata, breadcrumb, JSON-LD |

## 7. 계산 로직 구조

### 세율 규칙

`TAX_RATES` 기준:

- `general`: `0.154`
- `tax-benefit`: `0.095`
- `tax-free`: `0`

`tax-benefit`일 때만 `customTaxRate`로 덮어쓸 수 있다.

### 예금 계산 규칙

`calculateDeposit()` 기준:

- 입력값이 0 이하이거나 기간이 없으면 0 결과를 반환한다.
- 단리:
  - `원금 × 연이율 × 기간(년)`
- 복리:
  - `원금 × ((1 + 월이율)^개월수 - 1)`
- 세금은 `grossInterest × taxRate`
- 실수령액은 `principal + netInterest`
- `includeSchedule`가 `true`면 `generateDepositSchedule()`을 붙인다.

### 적금 계산 규칙

`calculateInstallment()` 기준:

- 입력값이 0 이하이거나 기간이 없으면 0 결과를 반환한다.
- 총 납입액:
  - `monthlyPayment × months`
- 단리:
  - 각 납입금에 대해 남은 개월 수만큼 이자를 개별 합산
- 복리:
  - 각 납입금에 대해 남은 개월 수만큼 복리 적용 후 합산
- 세금과 세후 이자는 예금과 동일한 방식으로 계산한다.
- `includeSchedule`가 `true`면 `generateInstallmentSchedule()`을 붙인다.

### 스케줄 생성 규칙

- 예금/적금 모두 시작 시점은 사용자 입력이 아니라 `new Date()` 기준 현재 월이다.
- 예금 스케줄:
  - 단리면 매월 같은 이자
  - 복리면 직전 잔액 기준 이자
- 적금 스케줄:
  - 매월 원금이 누적된다.
  - 단리면 기존 원금 기준 이자
  - 복리면 기존 잔액 기준 이자

## 8. SEO 구조와 외부 소비처

### 메타데이터/구조화 데이터 소스

| 대상 | 함수/유틸 | 파일 |
| --- | --- | --- |
| 메인 페이지 metadata | `generateToolMetadata('savings-calculator')` | `lib/tools/tool-metadata.ts` |
| 메인 페이지 JSON-LD | `getToolStructuredDataArray('savings-calculator')` | `lib/tools/tool-structured-data.ts` |
| UI breadcrumb | `getToolBreadcrumbItems('savings-calculator')` | `lib/tools/tool-breadcrumb.ts` |

### 메인 페이지 JSON-LD 구성

`assertToolStructuredData('savings-calculator')` 기본 요구 타입:

- `WebApplication`
- `FAQPage`
- `HowTo`

실제 페이지에 주입되는 데이터:

- `WebPage`
- `BreadcrumbList`
- `WebApplication`
- `FAQPage`
- `HowTo`

### 외부 소비처

| 소비처 | 의존 데이터 | 영향 |
| --- | --- | --- |
| `/tools` 메인 목록 | `getAllToolConfigs()` | 도구 카드 노출 |
| sitemap | `getAllToolConfigs()` | `/tools/savings-calculator` 색인 |
| 홈 대시보드 | `tool-config.homeFeatured` | 최신/핫 도구 노출 가능성 |
| `ToolSwitcher` | `getAllToolConfigs()` | 다른 도구 전환 셀렉트 |
| `CalculatorCategoryLinks` | `tool.category === 'calculator'` | 계산기 카테고리 간 교차 링크 |

### SEO 수정 시 기본 원칙

- `tool-config`의 이름, 설명, FAQ, HowTo를 바꾸면 metadata/JSON-LD/목록/교차 링크가 함께 영향을 받는다.
- `id`를 바꾸면 URL, sitemap, ToolSwitcher, related links, 홈 대시보드 링크를 함께 수정해야 한다.
- FAQ를 바꾸면 `tool-config`와 `SavingsCalculatorFAQ.tsx`의 두 군데를 함께 검토해야 한다.

## 9. AI가 수정할 때 반드시 알아야 할 비가시적 제약

### 9.1 탭 상태는 URL에 저장되지 않는다

- `SavingsCalculatorForm.tsx`는 `Tabs defaultValue="deposit"`만 사용한다.
- 활성 탭을 query string이나 local state export로 관리하지 않는다.
- 따라서 공유 링크나 새로고침 후 탭 복원 로직은 없다.

### 9.2 query key 일부는 두 탭이 공유한다

- 예금과 적금은 `period`, `periodMode`, `rate`, `interestType`, `taxType`, `customTaxRate`를 동일한 키로 사용한다.
- 탭별 상태를 완전히 독립적으로 바꾸려면 파서, 공유 링크, 초기화 로직을 함께 수정해야 한다.

### 9.3 결과 카드와 바텀시트는 동일 결과 객체를 재사용한다

- `ResultsView` 내부에서 다시 `DepositResultCard` 또는 `InstallmentResultCard`를 렌더링한다.
- 결과 카드 UI를 바꾸면 요약 카드와 바텀시트 상단 카드가 동시에 영향을 받는다.

### 9.4 계산은 순수 함수지만 스케줄 날짜는 현재 날짜에 의존한다

- 핵심 금액 계산은 입력값만으로 결정된다.
- 그러나 스케줄의 `month`, `year`는 `new Date()` 기준이라 실행 시점에 따라 달라진다.

### 9.5 세금우대 세율만 커스텀 가능하다

- `customTaxRate`는 모든 쿼리에 존재하지만 실제 계산에서 의미가 있는 것은 `tax-benefit`뿐이다.
- `general`, `tax-free`에 대해 커스텀 세율 기능을 추가하려면 `getTaxRate()` 계약이 바뀐다.

## 10. 공개 계약과 안전한 수정 규칙

### 공개 계약

- 라우트 계약: `/tools/savings-calculator`
- 공유 상태 계약: URL query string
- 타입 계약: `InterestType`, `TaxType`, `DepositCalculationResult`, `InstallmentCalculationResult`
- SEO 계약: `WebApplication + FAQPage + HowTo`가 기본 필수 타입

### 변경 유형별 점검 파일

#### URL 상태를 바꿀 때

- `components/tools/savings-calculator/hooks/parsers.ts`
- `components/tools/savings-calculator/hooks/useDepositCalculator.ts`
- `components/tools/savings-calculator/hooks/useInstallmentCalculator.ts`
- `components/tools/savings-calculator/components/ShareButton.tsx`
- `components/tools/savings-calculator/SavingsCalculatorForm.tsx`

#### 계산 로직을 바꿀 때

- `lib/tools/savings-calculator.ts`
- `components/tools/savings-calculator/hooks/useDepositCalculator.ts`
- `components/tools/savings-calculator/hooks/useInstallmentCalculator.ts`
- `components/tools/savings-calculator/components/DepositResultCard.tsx`
- `components/tools/savings-calculator/components/InstallmentResultCard.tsx`
- `components/tools/savings-calculator/components/ResultsView.tsx`

#### SEO를 바꿀 때

- `app/tools/savings-calculator/page.tsx`
- `lib/tools/tool-config.ts`
- `lib/tools/tool-metadata.ts`
- `lib/tools/tool-structured-data.ts`
- `lib/tools/tool-breadcrumb.ts`
- `lib/seo/sitemap.ts`

#### FAQ나 안내 문구를 바꿀 때

- `lib/tools/tool-config.ts`
- `components/tools/savings-calculator/SavingsCalculatorFAQ.tsx`

#### 카테고리/도구 ID를 바꿀 때

- `lib/tools/tool-config.ts`
- `components/tools/ToolSwitcher.tsx`
- `components/tools/CalculatorCategoryLinks.tsx`
- `app/tools/page.tsx`
- `lib/seo/sitemap.ts`
- `lib/home/dashboard-content.ts`

## 11. Known Issues / 현재 리스크

### 11.1 적금 공유 링크는 현재 탭을 복원하지 못한다

- `SavingsCalculatorForm.tsx`는 기본 탭을 항상 `deposit`으로 둔다.
- `ShareButton.tsx`는 단순히 현재 URL을 복사한다.
- 적금 결과를 공유해도 링크를 열면 기본 탭은 예금으로 열리므로, 적금 계산 결과 맥락이 바로 복원되지 않는다.

### 11.2 FAQ 소스가 두 군데로 분리돼 있다

- SEO용 FAQ는 `lib/tools/tool-config.ts`
- 화면용 FAQ는 `components/tools/savings-calculator/SavingsCalculatorFAQ.tsx`
- 둘이 독립적으로 수정되면 JSON-LD와 실제 UI 답변이 쉽게 어긋난다.

### 11.3 기간 단위 전환 시 값 손실이 발생할 수 있다

- `useDepositCalculator.ts`, `useInstallmentCalculator.ts` 모두
  - 년 → 월: `Math.round(periodValue * 12)`
  - 월 → 년: `Math.floor(periodValue / 12)`
- 예를 들어 `18개월`을 `년`으로 바꾸면 `1년`이 되어 6개월 정보가 사라진다.

### 11.4 스케줄 날짜는 실제 상품 시작일이 아니라 현재 날짜 기준이다

- `generateDepositSchedule()`와 `generateInstallmentSchedule()`는 `new Date()`로 시작한다.
- 사용자가 “언제 시작하는 상품인지”를 입력하지 않으므로 월별 내역은 참고용 상대 스케줄에 가깝다.

### 11.5 자동 재계산과 명시적 결과 노출이 분리돼 있다

- 훅은 입력이 유효하면 `useMemo`로 이미 계산 결과를 만든다.
- 하지만 결과 카드는 `hasCalculated`가 `true`여야 보인다.
- 계산 UX를 바꾸려면 단순히 계산 함수만 수정해서는 안 되고 표시 게이트(`showResults`, `hasCalculated`)까지 함께 봐야 한다.

### 11.6 전용 테스트가 없다

- 검색 기준으로 `savings-calculator` 전용 테스트 파일은 현재 없다.
- 계산 로직 변경 시 회귀 검증은 수동 확인 의존도가 높다.

## 12. 수정 전후 검증 체크리스트

### 변경 전 확인

- 변경 대상이 URL 계약 변경인지, 계산식 변경인지, SEO 변경인지 먼저 분류한다.
- `tool-config` 변경인지 UI 전용 변경인지 먼저 구분한다.
- 예금/적금 두 탭이 모두 영향을 받는지 확인한다.

### 코드 변경 후 최소 검증

권장 명령:

```bash
pnpm type-check
pnpm lint:check
pnpm build
```

권장 수동 점검:

- `/tools/savings-calculator`
- 예금 탭 입력 → 계산 → 공유
- 적금 탭 입력 → 계산 → 공유
- `/tools`
- `/sitemap.xml`

확인 항목:

- metadata와 JSON-LD가 정상 주입되는지
- query string이 입력 상태를 반영하는지
- 새로고침 후 URL 상태가 유지되는지
- 공유 링크가 기대한 계산 맥락을 복원하는지
- 예금/적금 결과 카드와 바텀시트 결과가 일치하는지
- period 단위 전환 시 값 손실이 없는지 또는 의도된 동작인지

## 13. 근거 파일과 신뢰도

### 주요 근거 파일

- `app/tools/savings-calculator/page.tsx`
- `components/tools/savings-calculator/SavingsCalculatorForm.tsx`
- `components/tools/savings-calculator/SavingsCalculatorFAQ.tsx`
- `components/tools/savings-calculator/hooks/parsers.ts`
- `components/tools/savings-calculator/hooks/useDepositCalculator.ts`
- `components/tools/savings-calculator/hooks/useInstallmentCalculator.ts`
- `components/tools/savings-calculator/sections/DepositCalculatorSection.tsx`
- `components/tools/savings-calculator/sections/InstallmentCalculatorSection.tsx`
- `components/tools/savings-calculator/components/DepositInputForm.tsx`
- `components/tools/savings-calculator/components/InstallmentInputForm.tsx`
- `components/tools/savings-calculator/components/DepositResultCard.tsx`
- `components/tools/savings-calculator/components/InstallmentResultCard.tsx`
- `components/tools/savings-calculator/components/ResultsView.tsx`
- `components/tools/savings-calculator/components/ShareButton.tsx`
- `components/tools/ToolSwitcher.tsx`
- `components/tools/CalculatorCategoryLinks.tsx`
- `lib/tools/savings-calculator.ts`
- `lib/tools/tool-config.ts`
- `lib/tools/tool-breadcrumb.ts`
- `lib/tools/tool-metadata.ts`
- `lib/tools/tool-structured-data.ts`
- `lib/seo/sitemap.ts`
- `lib/home/dashboard-content.ts`
- `app/layout.tsx`

### 신뢰도 평가

- 높음
  - 라우트 구조, 상태 저장 방식, 계산 흐름, 쿼리 계약, 라이브러리 사용 여부, SEO 생성 경로는 실제 코드 기준이다.
- 중간
  - `현재 리스크`의 영향도 평가는 코드 동작 기반 추론이다.
  - 특히 공유 UX 의도나 FAQ 이중 관리가 의도된 설계인지 여부는 코드만으로는 확정할 수 없다.

## 결론

`tools/savings-calculator`의 핵심은 단일 페이지 UI가 아니라 `tool-config`와 `lib/tools/savings-calculator.ts`, 그리고 `nuqs` 기반 URL 상태 계약이다.  
이 도메인을 안전하게 수정하려면 화면 단위로 보지 말고, query string 계약, 계산 함수, Tool SEO, FAQ 중복 소스, 공유 링크 복원성까지 함께 봐야 한다.

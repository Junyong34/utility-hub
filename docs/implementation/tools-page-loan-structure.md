# Loan Calculator 도메인 구조 명세서

작성일: 2026-03-10

이 문서는 `tools/loan-calculator` 도메인을 AI가 안전하게 수정하기 위한 구조화된 작업 명세서다.  
목적은 UI 소개가 아니라 다음을 빠르게 판단하게 하는 것이다.

- 어디가 대출 계산기 도메인의 소스 오브 트루스인지
- 어떤 파일이 URL 상태, 계산 로직, 결과 UI, Tool SEO를 각각 결정하는지
- 어떤 변경이 두 탭(대출 계산기 / 중도상환수수료 계산기)과 공유 링크, sitemap, tool-config까지 전파되는지
- 현재 구현에 남아 있는 리스크와 중복 소스가 무엇인지

## 1. 목적과 범위

### 목적

- `tools/loan-calculator` 도메인의 구조와 공개 계약을 고정한다.
- URL 상태 관리, 계산 로직, 탭 UI, SEO 파이프라인의 연결 관계를 정리한다.
- 수정 시 반드시 함께 봐야 하는 파일과 현재 리스크를 분리한다.

### 포함 범위

- 라우트
  - `app/tools/loan-calculator/page.tsx`
- UI
  - `components/tools/loan-calculator/*`
  - `components/tools/LoanCalculatorFAQ.tsx`
  - `components/tools/ToolSwitcher.tsx`
  - `components/seo/*`
- 상태/도메인 로직
  - `components/tools/loan-calculator/hooks/*`
  - `lib/tools/loan-calculator.ts`
  - `lib/tools/prepayment-fee-calculator.ts`
  - `lib/tools/formatting.ts`
  - `lib/tools/tool-config.ts`
  - `lib/tools/tool-breadcrumb.ts`
  - `lib/tools/tool-metadata.ts`
  - `lib/tools/tool-structured-data.ts`
- 외부 소비처
  - `app/tools/page.tsx`
  - `lib/seo/sitemap.ts`

### 비포함 범위

- 실제 금융기관 약관 차이에 대한 법률/상품 해석
- 별도 서브페이지 설계
- 구형 `components/tools/LoanCalculatorForm.tsx` 내부 구현 상세

## 2. 라우트 맵과 책임

| 경로 | 구현 파일 | 렌더링 성격 | 핵심 책임 |
| --- | --- | --- | --- |
| `/tools/loan-calculator` | `app/tools/loan-calculator/page.tsx` | 서버 페이지 + 클라이언트 폼 | Tool SEO, breadcrumb, 탭형 계산기 진입점 |
| `/tools` | `app/tools/page.tsx` | 서버 페이지 | tool 목록에서 loan-calculator 진입점 제공 |

### 라우트별 핵심 판단

- loan-calculator 도메인은 현재 단일 페이지 안에 두 계산기를 탭으로 묶어 운영한다.
- 탭 전환, 입력값, 결과 표시 여부는 모두 클라이언트 상태이며, 서버 API 호출은 없다.
- 계산 결과는 브라우저 내 순수 함수 계산이며 외부 데이터 소스가 없다.

## 3. 디렉토리 및 컴포넌트 구조

### 런타임 기준 구조

```text
app/
  tools/
    loan-calculator/
      page.tsx

components/
  tools/
    loan-calculator/
      LoanCalculatorForm.tsx
      constants.ts
      utils.ts
      hooks/
        parsers.ts
        useLoanCalculator.ts
        usePrepaymentCalculator.ts
      sections/
        LoanCalculatorSection.tsx
        PrepaymentFeeSection.tsx
      components/
        LoanInputForm.tsx
        PrepaymentInputForm.tsx
        LoanResultCard.tsx
        PrepaymentFeeResultCard.tsx
        ResultsView.tsx
        ResultSummaryLabel.tsx
        ShareButton.tsx
    LoanCalculatorFAQ.tsx
    ToolSwitcher.tsx

lib/
  tools/
    loan-calculator.ts
    prepayment-fee-calculator.ts
    formatting.ts
    tool-config.ts
    tool-breadcrumb.ts
    tool-metadata.ts
    tool-structured-data.ts
```

### 책임 분리

| 영역 | 파일 | 책임 |
| --- | --- | --- |
| 도메인 메타/SEO 소스 | `lib/tools/tool-config.ts` | loan-calculator tool 설명, FAQ, HowTo, 키워드, badge 등 중앙 설정 |
| 페이지 셸 | `app/tools/loan-calculator/page.tsx` | Tool SEO 주입, 제목/설명, 계산기 폼 조립 |
| 탭 루트 | `components/tools/loan-calculator/LoanCalculatorForm.tsx` | 탭 구조와 FAQ 렌더링 |
| 대출 계산 상태 | `hooks/useLoanCalculator.ts` | 대출 탭 URL 상태, 결과 표시 상태, 계산 실행 |
| 중도상환 상태 | `hooks/usePrepaymentCalculator.ts` | 중도상환 탭 URL 상태, 결과 표시 상태, 계산 실행 |
| URL 파서 | `hooks/parsers.ts` | 쿼리 파라미터 타입/기본값 정의 |
| 계산 로직 | `lib/tools/loan-calculator.ts` | 원리금균등, 원금균등, 만기일시 계산 및 스케줄 생성 |
| 수수료 계산 로직 | `lib/tools/prepayment-fee-calculator.ts` | 잔존일수/전체일수 기반 중도상환수수료 계산 |
| 입력 UI | `LoanInputForm.tsx`, `PrepaymentInputForm.tsx` | 사용자 입력과 quick action 버튼 |
| 결과 UI | `LoanResultCard.tsx`, `PrepaymentFeeResultCard.tsx`, `ResultsView.tsx` | 요약 결과, 공유 버튼, 상세 스케줄 |
| 별도 FAQ 소스 | `components/tools/LoanCalculatorFAQ.tsx` | FAQ 아코디언 렌더링 |

### 현재 실제 사용 경로와 구형 파일

- 실제 라우트는 `components/tools/loan-calculator/*` 하위 새 구조를 사용한다.
- 루트 레벨 `components/tools/LoanCalculatorForm.tsx`는 현재 `app/tools/loan-calculator/page.tsx`에서 import되지 않는다.
- 수정 시 구형 파일을 메인 구현으로 오인하면 안 된다.

## 4. 데이터 모델과 저장 방식

### 저장소

- 이 도메인은 데이터베이스, API, 정적 JSON 데이터를 사용하지 않는다.
- 모든 결과는 사용자 입력값을 기반으로 클라이언트에서 즉시 계산된다.
- 공유 가능한 상태는 URL 쿼리 파라미터에 저장된다.

### 핵심 타입 계약

| 타입 | 위치 | 의미 |
| --- | --- | --- |
| `RepaymentMethod` | `lib/tools/loan-calculator.ts` | `equal-payment`, `equal-principal`, `lump-sum` |
| `MonthlyScheduleItem` | `lib/tools/loan-calculator.ts` | 월별 상환 계획 1행 |
| `LoanCalculationResult` | `lib/tools/loan-calculator.ts` | 월 상환액, 총 상환액, 총 이자, 개월 수, schedule |
| `PrepaymentFeeResult` | `lib/tools/prepayment-fee-calculator.ts` | 수수료, 잔존일수, 전체일수, 적용 수수료율, 면제 여부 |
| `LoanQueryState` | `hooks/parsers.ts` | 대출 계산기 URL 상태 |
| `PrepaymentQueryState` | `hooks/parsers.ts` | 중도상환 계산기 URL 상태 |
| `TabQueryState` | `hooks/parsers.ts` | 탭 URL 상태 타입 |

### URL 상태 계약

`hooks/parsers.ts` 기준:

#### 대출 계산기

- `principal`
- `rate`
- `term`
- `termMode`
- `method`

예시:

```text
/tools/loan-calculator?principal=100000000&rate=3.5&term=30&termMode=year&method=equal-payment
```

#### 중도상환수수료 계산기

- `amount`
- `feeRate`
- `loanDate`
- `repaymentDate`
- `maturityDate`
- `exemptionYears`

예시:

```text
/tools/loan-calculator?amount=50000000&feeRate=1.5&loanDate=2024-01-01&repaymentDate=2024-06-01&maturityDate=2034-01-01&exemptionYears=3
```

### 저장/조회 관련 핵심 사실

- 상태 공유는 `nuqs` 기반 URL query sync다.
- 결과 자체를 별도 영속 저장하는 로컬 스토리지 구현은 현재 없다.
- 공유 버튼은 현재 URL을 복사하는 방식이므로, URL에 반영되지 않은 상태는 공유되지 않는다.

## 5. 상태 관리, 데이터 흐름, 사용 라이브러리

### 상태 관리 개요

| 상태 종류 | 위치 | 설명 |
| --- | --- | --- |
| Tool 메타 | `lib/tools/tool-config.ts` | 제목, 설명, FAQ, HowTo, keywords |
| URL 상태 | `useLoanCalculator`, `usePrepaymentCalculator` | 입력값을 query string에 저장 |
| 로컬 UI 상태 | 각 훅 내부 | `showResults`, `hasCalculated`, `isInitialized` |
| 순수 계산 결과 | `useMemo` | 입력값이 유효할 때 즉시 계산 |

### 메인 페이지 데이터 흐름

1. `app/tools/loan-calculator/page.tsx`가 `generateToolMetadata('loan-calculator')`와 `getToolStructuredDataArray('loan-calculator')`를 사용한다.
2. 페이지는 `LoanCalculatorForm`을 렌더한다.
3. `LoanCalculatorForm`은 탭 UI로 `LoanCalculatorSection`과 `PrepaymentFeeSection`을 분기한다.
4. 각 섹션은 자체 훅(`useLoanCalculator`, `usePrepaymentCalculator`)을 사용한다.
5. 각 훅은 `useQueryStates()`로 URL 상태를 읽고 쓴다.
6. 입력이 유효하면 `useMemo`로 결과를 계산한다.
7. 사용자가 계산 버튼을 누르면 `hasCalculated`와 `showResults`를 올려 결과 카드와 바텀시트를 노출한다.

### 대출 계산기 흐름

1. `principal`, `rate`, `term`, `termMode`, `method`를 URL에서 읽는다.
2. `canCalculate`가 입력 유효성을 판단한다.
3. `termMode`가 `year`면 개월 수로 변환해 `calculateLoan(..., true)`를 호출한다.
4. 결과 카드(`LoanResultCard`)는 요약 정보를 보여준다.
5. 바텀시트 내부 `ResultsView`는 연도별/월별 상환 스케줄을 표시한다.

### 중도상환수수료 계산기 흐름

1. `amount`, `feeRate`, `loanDate`, `repaymentDate`, `maturityDate`, `exemptionYears`를 URL에서 읽는다.
2. `canCalculate`가 날짜 존재 여부와 숫자 범위를 검증한다.
3. `calculatePrepaymentFee(...)`를 호출해 수수료, 잔존일수, 면제 여부를 계산한다.
4. 결과 카드(`PrepaymentFeeResultCard`)는 요약 결과를 보여준다.
5. 바텀시트는 현재 카드와 동일한 결과를 한 번 더 노출한다.

### 공유 버튼 동작

- `ShareButton`은 전달받은 `url`이 없으면 `window.location.href`를 그대로 복사한다.
- 즉, 공유 가능한 상태는 URL에 있는 값만 포함된다.
- 현재 결과 객체를 별도로 직렬화하지 않는다.

### 현재 사용 라이브러리

| 라이브러리 | 사용 위치 | 역할 |
| --- | --- | --- |
| `next` / App Router | `app/tools/loan-calculator/page.tsx` | 라우트, metadata |
| `react` | 전반 | 클라이언트 상태와 메모이제이션 |
| `nuqs` | `hooks/parsers.ts`, 각 훅 | URL query state 동기화 |
| `lucide-react` | 입력 폼, 공유 버튼 등 | 아이콘 |
| `tailwindcss` | 전역 및 컴포넌트 className | 스타일링 |
| 내부 Tool SEO 유틸 | `lib/tools/*` | metadata, breadcrumb, JSON-LD |

## 6. SEO 구조와 외부 소비처

### 메타데이터/구조화 데이터 소스

| 대상 | 함수/유틸 | 파일 |
| --- | --- | --- |
| 메인 페이지 metadata | `generateToolMetadata('loan-calculator')` | `lib/tools/tool-metadata.ts` |
| 메인 페이지 JSON-LD | `getToolStructuredDataArray('loan-calculator')` | `lib/tools/tool-structured-data.ts` |
| UI breadcrumb | `getToolBreadcrumbItems('loan-calculator')` | `lib/tools/tool-breadcrumb.ts` |

### 메인 페이지 JSON-LD 구성

`assertToolStructuredData('loan-calculator')` 기본 요구 타입:

- `WebApplication`
- `FAQPage`
- `HowTo`

실제 메인 페이지는 다음 데이터를 함께 주입한다.

- `WebPage`
- `BreadcrumbList`
- `WebApplication`
- `FAQPage`
- `HowTo`

### 외부 소비처

| 소비처 | 의존 데이터 | 영향 |
| --- | --- | --- |
| `/tools` 목록 | `TOOL_CONFIGS['loan-calculator']` | 제목, 설명, 아이콘, 배지 |
| `ToolSwitcher` | `getAllToolConfigs()` | 도구 간 전환 |
| sitemap | `lib/seo/sitemap.ts` | `/tools/loan-calculator` 페이지 자동 포함 |
| FAQ/HowTo 스키마 | `TOOL_CONFIGS['loan-calculator']` | 검색 결과 구조화 데이터 |

## 7. 공개 계약과 안전한 수정 규칙

### 공개 계약

- 메인 경로: `/tools/loan-calculator`
- 대출 계산 query 계약: `principal`, `rate`, `term`, `termMode`, `method`
- 중도상환 query 계약: `amount`, `feeRate`, `loanDate`, `repaymentDate`, `maturityDate`, `exemptionYears`
- 계산 로직 계약: `calculateLoan`, `calculatePrepaymentFee`
- 도메인 메타 계약: `TOOL_CONFIGS['loan-calculator']`

### 안전한 수정 규칙

#### 대출 계산 로직을 바꿀 때

반드시 함께 확인할 파일:

- `lib/tools/loan-calculator.ts`
- `components/tools/loan-calculator/hooks/useLoanCalculator.ts`
- `components/tools/loan-calculator/hooks/parsers.ts`
- `components/tools/loan-calculator/components/LoanResultCard.tsx`
- `components/tools/loan-calculator/components/ResultsView.tsx`
- `components/tools/loan-calculator/constants.ts`

#### 중도상환수수료 로직을 바꿀 때

반드시 함께 확인할 파일:

- `lib/tools/prepayment-fee-calculator.ts`
- `components/tools/loan-calculator/hooks/usePrepaymentCalculator.ts`
- `components/tools/loan-calculator/hooks/parsers.ts`
- `components/tools/loan-calculator/components/PrepaymentFeeResultCard.tsx`
- `components/tools/loan-calculator/components/PrepaymentInputForm.tsx`

#### URL 상태 계약을 바꿀 때

반드시 함께 확인할 파일:

- `components/tools/loan-calculator/hooks/parsers.ts`
- `components/tools/loan-calculator/hooks/useLoanCalculator.ts`
- `components/tools/loan-calculator/hooks/usePrepaymentCalculator.ts`
- `components/tools/loan-calculator/components/ShareButton.tsx`

#### 탭 구조를 바꿀 때

반드시 함께 확인할 파일:

- `components/tools/loan-calculator/LoanCalculatorForm.tsx`
- `components/tools/loan-calculator/sections/LoanCalculatorSection.tsx`
- `components/tools/loan-calculator/sections/PrepaymentFeeSection.tsx`
- `components/tools/LoanCalculatorFAQ.tsx`

#### Tool 메타/SEO를 바꿀 때

반드시 함께 확인할 파일:

- `lib/tools/tool-config.ts`
- `lib/tools/tool-metadata.ts`
- `lib/tools/tool-breadcrumb.ts`
- `lib/tools/tool-structured-data.ts`
- `app/tools/loan-calculator/page.tsx`
- `lib/seo/sitemap.ts`

## 8. Known Issues / 현재 리스크

### 8.1 두 훅 모두 `useEffect` 안에서 동기 `setState`를 호출함

현재 코드상:

- `useLoanCalculator.ts`는 `useEffect` 내부에서 `setIsInitialized(true)`를 즉시 호출한다.
- `usePrepaymentCalculator.ts`도 동일 패턴을 사용한다.

영향:

- 현재 `pnpm lint:check`에서 `react-hooks/set-state-in-effect` 오류의 직접 원인이다.
- 훅 구조를 수정하지 않으면 프로젝트 린트가 계속 실패한다.

### 8.2 탭 상태 파서는 정의돼 있지만 실제 탭 UI와 연결되지 않음

- `hooks/parsers.ts`에 `TAB_QUERY_PARSER`가 정의돼 있다.
- 하지만 `LoanCalculatorForm.tsx`는 `Tabs defaultValue="loan-calculator"`만 사용하고 URL 탭 동기화를 하지 않는다.

영향:

- 공유 URL로 두 계산기 탭 상태를 완전히 복원할 수 없다.
- 문서/PRD 상 기대와 실제 UX가 다를 수 있다.

### 8.3 FAQ 소스가 중앙 tool-config와 컴포넌트 상수로 이중화되어 있음

- SEO용 FAQ/HowTo는 `TOOL_CONFIGS['loan-calculator']`에 있다.
- 화면 아코디언 FAQ는 `components/tools/LoanCalculatorFAQ.tsx` 내부 `FAQ_DATA` 상수를 사용한다.

영향:

- SEO FAQ와 화면 FAQ가 서로 다른 내용을 가질 수 있다.
- FAQ 수정 시 한 곳만 바꾸면 UI와 구조화 데이터가 어긋난다.

### 8.4 구형 `components/tools/LoanCalculatorForm.tsx`가 저장소에 남아 있음

- 현재 라우트는 `components/tools/loan-calculator/LoanCalculatorForm.tsx`를 사용한다.
- 구형 루트 파일은 검색 결과 기준 현재 라우트 경로에서 직접 사용되지 않는다.

영향:

- 수정 대상 파일을 잘못 선택할 위험이 있다.
- AI가 구형 파일을 수정하고도 실제 페이지는 변하지 않는 상황이 생길 수 있다.

### 8.5 `ShareButton`에 미사용 import가 남아 있음

- `components/tools/loan-calculator/components/ShareButton.tsx`는 `Copy` 아이콘을 import하지만 사용하지 않는다.
- 이 항목은 현재 `pnpm lint:check` 경고 목록에도 포함돼 있다.

## 9. 수정 전후 검증 체크리스트

### 구조 변경 전 확인

- 변경 대상이 계산 수식인지, URL 상태 계약인지, UI인지, SEO인지 먼저 분류한다.
- `lib/tools/loan-calculator.ts` 또는 `lib/tools/prepayment-fee-calculator.ts`가 진짜 계산 소스인지 먼저 확인한다.
- FAQ 수정이면 화면 FAQ와 tool-config FAQ를 모두 점검한다.

### 코드 변경 후 최소 검증

권장 명령:

```bash
pnpm type-check
pnpm lint:check
pnpm build
```

권장 수동 점검:

- `/tools/loan-calculator`
- 대출 계산기 탭에서 기본 계산
- 중도상환수수료 탭에서 날짜 포함 계산
- 링크 공유 후 새 탭 재진입
- `/tools`

확인 항목:

- URL 쿼리가 입력값과 일치하는지
- 공유 링크 복사 후 새 탭에서 값이 복원되는지
- 결과 카드와 바텀시트 수치가 일치하는지
- 대출 계산의 월별/연도별 스케줄이 표시되는지
- breadcrumb와 ToolSwitcher가 정상 동작하는지

## 10. 근거 파일과 신뢰도

### 주요 근거 파일

- `app/tools/loan-calculator/page.tsx`
- `components/tools/loan-calculator/LoanCalculatorForm.tsx`
- `components/tools/loan-calculator/sections/LoanCalculatorSection.tsx`
- `components/tools/loan-calculator/sections/PrepaymentFeeSection.tsx`
- `components/tools/loan-calculator/hooks/parsers.ts`
- `components/tools/loan-calculator/hooks/useLoanCalculator.ts`
- `components/tools/loan-calculator/hooks/usePrepaymentCalculator.ts`
- `lib/tools/loan-calculator.ts`
- `lib/tools/prepayment-fee-calculator.ts`
- `components/tools/LoanCalculatorFAQ.tsx`
- `lib/tools/tool-config.ts`
- `lib/tools/tool-metadata.ts`
- `lib/tools/tool-structured-data.ts`
- `lib/seo/sitemap.ts`

### 신뢰도 평가

- 높음
  - 라우트 구조, URL 상태 계약, 계산 함수, 결과 렌더링, Tool SEO 파이프라인은 실제 코드 기준이다.
- 중간
  - 탭 상태 URL 동기화와 FAQ 단일 소스 설계는 코드상 미완/중복 상태라, 의도된 임시 구조인지 여부는 확정할 수 없다.

## 결론

`tools/loan-calculator` 도메인의 진짜 중심은 페이지 UI가 아니라 `lib/tools/loan-calculator.ts`, `lib/tools/prepayment-fee-calculator.ts`, `components/tools/loan-calculator/hooks/*`, `TOOL_CONFIGS['loan-calculator']`다.  
이 페이지는 단순 입력 폼처럼 보이지만 실제로는 두 계산기, URL 공유 계약, Tool SEO, FAQ 중복 소스를 함께 관리하므로, 수정은 컴포넌트 단위가 아니라 계산 계약과 query 계약 단위로 접근해야 안전하다.

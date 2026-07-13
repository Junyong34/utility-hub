# Lotto 도메인 구조 명세서

작성일: 2026-03-10

이 문서는 `tools/lotto` 도메인을 AI가 안전하게 수정하기 위한 구조화된 작업 명세서다.  
목적은 화면 설명이 아니라 다음을 빠르게 판단하게 하는 것이다.

- 어디가 로또 도메인의 소스 오브 트루스인지
- 어떤 파일이 메인 페이지, 서브페이지, 추천 로직, SEO를 각각 결정하는지
- 어떤 변경이 tool-config, 공유 URL, 회차 데이터, sitemap, 통계 페이지까지 전파되는지
- 현재 구현에 남아 있는 리스크와 문서/카피 상의 불일치가 무엇인지

## 1. 목적과 범위

### 목적

- `tools/lotto` 도메인의 구조와 공개 계약을 고정한다.
- 추천 로직, 회차 데이터, UI 상태, URL 공유, SEO 파이프라인의 연결 관계를 정리한다.
- 수정 시 반드시 함께 봐야 하는 파일과 현재 리스크를 분리한다.

### 포함 범위

- 라우트
  - `app/tools/lotto/page.tsx`
  - `app/tools/lotto/stats/page.tsx`
  - `app/tools/lotto/round/[round]/page.tsx`
- UI
  - `components/lotto/*`
  - `components/lotto/LottoRecommend/*`
  - `components/tools/ToolSwitcher.tsx`
  - `components/seo/*`
- 상태/도메인 로직
  - `hooks/useLotto.ts`
  - `lib/lotto/*`
  - `lib/tools/tool-config.ts`
  - `lib/tools/tool-breadcrumb.ts`
  - `lib/tools/tool-metadata.ts`
  - `lib/tools/tool-structured-data.ts`
- 외부 소비처
  - `app/tools/page.tsx`
  - `lib/seo/sitemap.ts`

### 비포함 범위

- 로또 확률 자체에 대한 수학적 정당성 증명
- 동행복권 원본 데이터 수집 스크립트 상세
- Tools 전체 디자인 시스템 설명

## 2. 라우트 맵과 책임

| 경로 | 구현 파일 | 렌더링 성격 | 핵심 책임 |
| --- | --- | --- | --- |
| `/tools/lotto` | `app/tools/lotto/page.tsx` | 서버 페이지 + 클라이언트 생성기 | 메인 진입점, Tool SEO, 추천기 UI, FAQ/설명/면책 |
| `/tools/lotto/stats` | `app/tools/lotto/stats/page.tsx` | 서버 페이지 | hot/cold 번호, 빈도 통계, 최신 회차 이동 |
| `/tools/lotto/round/[round]` | `app/tools/lotto/round/[round]/page.tsx` | SSG | 회차 상세, 번호 패턴, 이전/다음 회차 이동, 연도 필터 |
| `/tools` | `app/tools/page.tsx` | 서버 페이지 | tool 목록에서 lotto 진입점 제공 |

### 라우트별 핵심 판단

- 메인 페이지의 진짜 인터랙션은 `LottoGenerator` 이하 클라이언트 계층에 집중되어 있다.
- 통계 페이지와 회차 상세 페이지는 추천기 상태를 공유하지 않고, `lib/lotto/round-data.ts`를 직접 읽는 읽기 전용 서버 페이지다.
- 메인 페이지는 `export const dynamic = 'force-dynamic'`으로 선언되어 있다. 현재 데이터 소스는 정적 파일 기반이지만, 런타임 선택은 동적으로 고정되어 있다.

## 3. 디렉토리 및 컴포넌트 구조

### 런타임 기준 구조

```text
app/
  tools/
    page.tsx
    lotto/
      page.tsx
      stats/
        page.tsx
      round/
        [round]/
          page.tsx

components/
  lotto/
    LottoGenerator.tsx
    LottoInfoPanel.tsx
    LottoContentSection.tsx
    LottoFAQ.tsx
    LottoDisclaimer.tsx
    LottoResults.tsx
    LottoNumberAnimation.tsx
    LottoRoundYearFilter.tsx
    SlotMachine.tsx
    LottoRecommend/
      LottoRecommend.tsx
      LottoRecommendProvider.tsx
      LottoRecommendRoot.tsx
      LottoRecommendHeader.tsx
      LottoRecommendControls.tsx
      LottoModeSwitcher.tsx
      LottoCountSelector.tsx
      LottoRecommendVariantPanel.tsx
      LottoRecommendResultSheet.tsx
      LottoRecommendActions.tsx
      LottoRecommendResults.tsx
      LottoWeeklyRecommendation.tsx
      LottoAnalysisLoading.tsx
      ModeDescription.tsx
      CompactModeButton.tsx
      variants/
        RandomRecommendPanel.tsx
        StatsRecommendPanel.tsx
        DateRecommendPanel.tsx
        MbtiRecommendPanel.tsx
        LuckyNumberRecommendPanel.tsx
        SlotRecommendPanel.tsx

hooks/
  useLotto.ts

lib/
  lotto/
    generator.ts
    recommendation-spec.ts
    round-data.ts
    mbti-profile.ts
    lotto_draws.json
    lotto-number-style.ts
    algorithms/
      ai-statistical-recommendation.ts
      probability-statistical-recommendation.ts
      statistics-analyzer.ts
      validation.ts
  tools/
    tool-config.ts
    tool-breadcrumb.ts
    tool-metadata.ts
    tool-structured-data.ts
```

### 책임 분리

| 영역 | 파일 | 책임 |
| --- | --- | --- |
| 도메인 메타/SEO 소스 | `lib/tools/tool-config.ts` | lotto tool 설명, FAQ, HowTo, 키워드, badge, 아이콘 등 중앙 설정 |
| 메인 페이지 셸 | `app/tools/lotto/page.tsx` | Tool SEO 주입, 생성기/사이드바/하단 설명 섹션 조립 |
| 생성기 엔트리 | `components/lotto/LottoGenerator.tsx` | Provider + compound component 조합 |
| 상태 오케스트레이션 | `components/lotto/LottoRecommend/LottoRecommendProvider.tsx` | mode/count/query sync, 분석 진행 상태, 공유 URL, 주간 추천 |
| 생성 타이밍 훅 | `hooks/useLotto.ts` | `currentGames`, `isGenerating`, 결과 반영 딜레이 |
| 번호 생성 로직 | `lib/lotto/generator.ts` | 랜덤/시드/행운번호/통계 추천 분기 및 공통 유틸 |
| 통계 엔진 | `lib/lotto/algorithms/*` | AI 가중치, 확률통계 전략, 빈도/분포 분석, 검증 |
| 회차 데이터 | `lib/lotto/round-data.ts` + `lotto_draws.json` | 회차 조회, hot/cold, 패턴 분석 |
| 서브페이지 | `app/tools/lotto/stats/page.tsx`, `app/tools/lotto/round/[round]/page.tsx` | 통계/회차 보기 전용 읽기 페이지 |

## 4. 데이터 모델과 저장 방식

### 저장소

- 추천기 원본 데이터 저장소는 데이터베이스가 아니다.
- 회차 데이터는 `lib/lotto/lotto_draws.json` 정적 JSON 파일이다.
- tool 메타 정보는 `lib/tools/tool-config.ts`의 `TOOL_CONFIGS.lotto`가 소스 오브 트루스다.

### 핵심 타입 계약

`lib/lotto/types/*` 기준 공개 계약:

| 타입 | 의미 |
| --- | --- |
| `LottoRoundResult` | 회차 번호, 6개 당첨번호, bonus, drawDate, drawYear, source |
| `LottoNumbers` | 보너스 포함 번호 세트 |
| `LottoGameSet` | 여러 게임 묶음 |
| `LottoRecommendMode` | `random`, `stats`, `date`, `mbti`, `lucky`, `slot` |
| `LottoRecommendCount` | `1 | 2 | 3 | 4 | 5` |
| `LottoRecommendQueryState` | `mode`, `count`, `numbers` |
| `LottoStatsStrategy` | AI 또는 확률통계 전략 식별자 |

### URL 공유 계약

`lib/lotto/recommendation-spec.ts` 기준:

- 쿼리 키
  - `mode`
  - `count`
  - `numbers`
- `numbers`는 `1,2,3,4,5,6|7,8,9,10,11,12` 형태의 문자열로 직렬화된다.
- 숫자 6개, 중복 없음, 범위 1~45를 만족해야 유효하다.

### 데이터 생성/조회 규칙

- `getLottoRoundResults()`는 JSON 데이터를 읽어 회차 내림차순으로 반환한다.
- `getLatestLottoRoundResult()`는 최신 회차 1건을 반환한다.
- `getLottoHotColdNumbers()`는 1~45 출현 빈도 집계 후 hot/cold를 만든다.
- `generateLottoGames()`는 count만큼 게임 배열을 생성하는 공통 wrapper다.
- `generateStatsBasedLottoNumbers()`는 `ai`와 확률통계 전략을 분기하고, 오류 시 랜덤으로 폴백한다.

## 5. 상태 관리, 데이터 흐름, 사용 라이브러리

### 상태 관리 개요

| 상태 종류 | 위치 | 설명 |
| --- | --- | --- |
| 전역 tool 메타 | `lib/tools/tool-config.ts` | 이름, 설명, FAQ, HowTo, 키워드, feature 목록 |
| 서버 읽기 데이터 | `lib/lotto/round-data.ts` | 최신 회차, 회차별 번호, 통계 집계 |
| 생성기 쿼리 상태 | `LottoRecommendProvider` + `nuqs` | `mode`, `count`, `numbers` |
| 생성기 로컬 UI 상태 | `LottoRecommendProvider` | `statsStrategy`, `recommendDate`, `mbti`, `luckyNumber`, 분석 진행 상태, 바텀시트 open |
| 결과 표시 상태 | `hooks/useLotto.ts` | `currentGames`, `isGenerating` |
| 주간 추천 캐시 | `localStorage` | `lotto-weekly-pick` 키에 주차별 추천 번호 저장 |

### 메인 페이지 데이터 흐름

1. `app/tools/lotto/page.tsx`가 `generateToolMetadata('lotto')`와 `getToolStructuredDataArray('lotto')`를 사용한다.
2. 같은 페이지에서 `getLatestLottoRoundResult()`와 `getToolConfig('lotto')`로 최신 회차와 FAQ를 준비한다.
3. `LottoGenerator`는 클라이언트에서 `LottoRecommend.Provider`를 시작한다.
4. Provider는 `useQueryStates()`로 `mode`, `count`, `numbers`를 URL과 동기화한다.
5. Provider는 `useLotto()`를 이용해 실제 게임 결과 반영과 `isGenerating` 상태를 분리 관리한다.
6. `generate()` 호출 시 분석 단계 메시지와 진행률을 먼저 올리고, 생성된 게임을 `useLotto.generateFromGames(games, 4500)`로 지연 반영한다.
7. 생성 완료 후 `LottoRecommendResultSheet`에서 결과 카드와 공유 액션을 노출한다.

### 추천 모드별 분기

`LottoRecommendProvider.buildGamesByMode()` 기준:

| mode | 생성 함수 |
| --- | --- |
| `random` | `generateLottoNumbers()` |
| `stats` | `generateStatsBasedLottoNumbers(statsStrategy)` |
| `date` | `generateLottoNumbersFromSeed(\`${recommendDate}:${index + 1}\`)` |
| `mbti` | `generateLottoNumbersFromSeed(\`${mbti}:${localDateKey}:${index + 1}\`)` |
| `lucky` | `generateLottoNumbersWithLucky(luckyNumber)` |
| `slot` | `generateLottoNumbers()` |

### 쿼리/공유 동기화 핵심 사실

- `nuqs`로 관리되는 것은 `mode`, `count`, `numbers`뿐이다.
- `statsStrategy`, `recommendDate`, `mbti`, `luckyNumber`는 URL에 저장되지 않는다.
- 공유 링크는 “생성 조건 전체”가 아니라 “현재 mode/count와 생성된 숫자 결과”를 보존하는 방식이다.
- `pendingGamesQuerySyncRef`가 query-state와 local-state 사이 무한 루프를 막는다.

### 로컬 저장 관련 실제 구현

- 현재 `localStorage`를 쓰는 항목은 주간 추천 번호(`lotto-weekly-pick`)뿐이다.
- 생성된 추천 결과 전체를 영속 저장하는 별도 구현은 검색 기준 존재하지 않는다.
- 따라서 “번호 저장”은 현재 기준으로 공유 URL 또는 메모리 상태에 가깝고, 영속 저장 기능으로 보면 과장된 설명이 포함돼 있을 수 있다.

### 현재 사용 라이브러리

| 라이브러리 | 사용 위치 | 역할 |
| --- | --- | --- |
| `next` / App Router | `app/tools/lotto/*` | 라우트, metadata, SSG |
| `react` | 전반 | 서버/클라이언트 컴포넌트 |
| `nuqs` | `LottoRecommendProvider` | URL query state 동기화 |
| `lucide-react` | 안내/면책/헤더 등 | 아이콘 |
| `tailwindcss` | 전역 및 컴포넌트 className | 스타일링 |
| 내부 Tool SEO 유틸 | `lib/tools/*` | Tool metadata, breadcrumb, JSON-LD |

## 6. SEO 구조와 외부 소비처

### 메타데이터/구조화 데이터 소스

| 대상 | 함수/유틸 | 파일 |
| --- | --- | --- |
| 메인 페이지 metadata | `generateToolMetadata('lotto')` | `lib/tools/tool-metadata.ts` |
| 메인 페이지 JSON-LD | `getToolStructuredDataArray('lotto')` | `lib/tools/tool-structured-data.ts` |
| 서브페이지 JSON-LD | `getToolSubPageStructuredDataArray(...)` | `lib/tools/tool-structured-data.ts` |
| UI breadcrumb | `getToolBreadcrumbItems(...)` | `lib/tools/tool-breadcrumb.ts` |
| JSON-LD breadcrumb | `getToolStructuredDataBreadcrumbs(...)` | `lib/tools/tool-breadcrumb.ts` |

### 메인 페이지 JSON-LD 구성

`assertToolStructuredData('lotto')` 기본 요구 타입:

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
| `/tools` 목록 | `TOOL_CONFIGS.lotto` | name, description, icon, badge, color |
| `ToolSwitcher` | `getAllToolConfigs()` | 도구 간 전환 |
| sitemap | `lib/seo/sitemap.ts` | `/tools/lotto`, `/tools/lotto/stats` 노출 |
| FAQ/HowTo 스키마 | `TOOL_CONFIGS.lotto` | 검색 결과 구조화 데이터 |

## 7. 공개 계약과 안전한 수정 규칙

### 공개 계약

- 메인 경로: `/tools/lotto`
- 서브 경로: `/tools/lotto/stats`, `/tools/lotto/round/{round}`
- URL 공유 계약: `mode`, `count`, `numbers`
- 도메인 메타 계약: `TOOL_CONFIGS.lotto`
- 회차 데이터 계약: `lotto_draws.json` -> `LottoRoundResult`

### 안전한 수정 규칙

#### 추천 모드를 추가/변경할 때

반드시 함께 확인할 파일:

- `lib/lotto/types/recommendation.ts`
- `lib/lotto/recommendation-spec.ts`
- `components/lotto/LottoRecommend/LottoRecommendProvider.tsx`
- `components/lotto/LottoRecommend/LottoModeSwitcher.tsx`
- `components/lotto/LottoRecommend/LottoRecommendVariantPanel.tsx`
- `components/lotto/LottoRecommend/variants/*`
- `lib/lotto/generator.ts`

#### 공유 URL 규칙을 바꿀 때

반드시 함께 확인할 파일:

- `components/lotto/LottoRecommend/LottoRecommendProvider.tsx`
- `lib/lotto/recommendation-spec.ts`
- `components/lotto/LottoRecommend/LottoRecommendActions.tsx`
- `components/lotto/LottoRecommend/LottoRecommendResults.tsx`

#### 회차 데이터 구조를 바꿀 때

반드시 함께 확인할 파일:

- `lib/lotto/lotto_draws.json`
- `lib/lotto/round-data.ts`
- `app/tools/lotto/page.tsx`
- `app/tools/lotto/stats/page.tsx`
- `app/tools/lotto/round/[round]/page.tsx`
- `components/lotto/LottoContentSection.tsx`
- `components/lotto/LottoInfoPanel.tsx`

#### Tool 메타/SEO를 바꿀 때

반드시 함께 확인할 파일:

- `lib/tools/tool-config.ts`
- `lib/tools/tool-metadata.ts`
- `lib/tools/tool-breadcrumb.ts`
- `lib/tools/tool-structured-data.ts`
- `app/tools/lotto/page.tsx`
- `app/tools/lotto/stats/page.tsx`
- `app/tools/lotto/round/[round]/page.tsx`
- `lib/seo/sitemap.ts`

#### 결과 표시 UI를 바꿀 때

반드시 함께 확인할 파일:

- `components/lotto/LottoResults.tsx`
- `components/lotto/LottoNumberAnimation.tsx`
- `components/lotto/LottoRecommend/LottoRecommendResults.tsx`
- `components/lotto/LottoRecommend/LottoRecommendResultSheet.tsx`
- `app/globals.css`

## 8. Known Issues / 현재 리스크

### 8.1 생성 결과 영속 저장에 대한 설명과 실제 구현이 다를 수 있음

현재 코드 검색 기준:

- `localStorage` 사용은 `lotto-weekly-pick` 주간 추천 캐시뿐이다.
- 생성된 `currentGames`를 영속 저장하는 구현은 없다.
- 하지만 `TOOL_CONFIGS.lotto.features`, `faq`, `LottoInfoPanel` 문구에는 “저장” 또는 “로컬 저장”처럼 읽히는 설명이 포함돼 있다.

영향:

- 문서/카피를 근거로 기능 수정 시 저장소가 존재한다고 오해할 수 있다.
- 실제 데이터 보존 방식은 URL 공유와 현재 세션 메모리 상태에 더 가깝다.

### 8.2 공유 URL은 전체 생성 조건을 복원하지 않음

- URL에 저장되는 것은 `mode`, `count`, `numbers`뿐이다.
- `statsStrategy`, `recommendDate`, `mbti`, `luckyNumber`는 쿼리에 없다.
- 따라서 같은 공유 링크를 받아도 “어떤 입력으로 이 번호가 생성됐는지”는 완전 복원되지 않는다.

### 8.3 `drawDate`가 실제 추첨일이 아니라 `drawYear` 값으로 채워짐

- `lib/lotto/round-data.ts`는 JSON row를 매핑할 때 `drawDate: item.drawYear`로 넣는다.
- 실제 샘플 데이터도 `"drawYear": "2002"`처럼 연도만 가진다.
- 결과적으로 UI의 `latestDrawDate`, 회차 상세 `추첨일`, SEO 설명 문구는 실제 날짜가 아니라 연도 문자열만 표시한다.

### 8.4 sitemap에 회차 상세 페이지가 포함되지 않음

- `lib/seo/sitemap.ts`는 lotto 관련 서브페이지로 `/tools/lotto/stats`만 추가한다.
- `/tools/lotto/round/[round]` 정적 페이지는 sitemap 자동 등록 대상이 아니다.
- 회차 페이지 인덱싱을 의도했다면 별도 반영이 필요하다.

### 8.5 `lib/lotto/image-generator.ts`는 현재 핵심 런타임 경로에서 사용되지 않음

- 현재 검색 기준으로 메인 페이지, stats, round, provider에서 직접 import되지 않는다.
- 과거 기능 잔재 또는 차후 확장 후보로 보이며, 핵심 수정 대상과 혼동하면 안 된다.

## 9. 수정 전후 검증 체크리스트

### 구조 변경 전 확인

- 변경 대상이 추천 로직인지, UI인지, query contract인지, SEO인지 먼저 분류한다.
- `TOOL_CONFIGS.lotto`와 `LottoRecommendProvider` 중 어디가 소스 오브 트루스인지 먼저 정한다.
- 서브페이지 영향 여부를 먼저 판단한다.

### 코드 변경 후 최소 검증

권장 명령:

```bash
pnpm type-check
pnpm lint:check
pnpm build
```

권장 수동 점검:

- `/tools/lotto`
- `/tools/lotto/stats`
- `/tools/lotto/round/<latestRound>`
- `/tools`
- `/sitemap.xml`

확인 항목:

- mode 전환과 count 전환이 URL에 반영되는지
- 공유 링크 복사가 현재 결과와 일치하는지
- 결과 바텀시트가 생성 중/생성 후에만 열리는지
- FAQ/HowTo/Tool breadcrumb가 정상 노출되는지
- 최신 회차 링크와 회차 이동 링크가 실제 라우트와 맞는지

## 10. 근거 파일과 신뢰도

### 주요 근거 파일

- `app/tools/lotto/page.tsx`
- `app/tools/lotto/stats/page.tsx`
- `app/tools/lotto/round/[round]/page.tsx`
- `components/lotto/LottoGenerator.tsx`
- `components/lotto/LottoRecommend/LottoRecommendProvider.tsx`
- `hooks/useLotto.ts`
- `lib/lotto/generator.ts`
- `lib/lotto/recommendation-spec.ts`
- `lib/lotto/round-data.ts`
- `lib/tools/tool-config.ts`
- `lib/tools/tool-breadcrumb.ts`
- `lib/tools/tool-metadata.ts`
- `lib/tools/tool-structured-data.ts`
- `lib/seo/sitemap.ts`

### 신뢰도 평가

- 높음
  - 라우트 구조, 상태 흐름, query contract, SEO 파이프라인, 회차 데이터 흐름은 실제 코드 기준이다.
- 중간
  - 일부 카피와 기능 의도는 코드만으로 확정할 수 없어 “현재 구현상 동작”으로 기록했다.
  - 저장 기능 설명, `drawDate` 해석, 회차 sitemap 제외가 의도인지 여부는 코드만으로 확정할 수 없다.

## 결론

`tools/lotto` 도메인의 진짜 중심은 페이지 UI가 아니라 `TOOL_CONFIGS.lotto`, `LottoRecommendProvider`, `lib/lotto/round-data.ts`다.  
메인 추천기, 통계 페이지, 회차 상세, Tool SEO, sitemap은 이 세 축에 연결되어 있으므로, 로또 페이지 수정은 UI 단위가 아니라 메타 계약, query 계약, 회차 데이터 계약 단위로 접근해야 안전하다.

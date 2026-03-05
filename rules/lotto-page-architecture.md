# 로또 페이지 아키텍처 문서

최종 업데이트: 2026-03-05

이 문서는 Zento의 로또 페이지(`/tools/lotto`)를 기준으로, 코드 이해를 위한 기준 문서입니다. 앱 구조, 상태 흐름, 데이터 유입, SEO 연동을 한 번에 정리합니다.

## 1) 페이지 목적과 기능

로또 페이지의 핵심 목적은 다음과 같습니다.

1. 1~45 번호 범위의 로또 조합 1개~5개를 실시간으로 생성해 사용자에게 즉시 제공
2. 6가지 추천 모드(랜덤, 통계, 날짜, MBTI, 행운번호, 슬롯)로 생성 방식을 전환할 수 있게 제공
3. URL 공유/복사로 생성 결과를 재사용 가능하게 제공
4. 주간 추천, 회차 통계, FAQ, 면책 고지와 같은 보조 정보를 함께 노출
5. SEO/구조화 데이터(FAQ, HowTo, WebPage, SoftwareApplication)를 함께 포함해 검색 노출 품질을 확보

동일 기능의 보조 페이지도 함께 운영됩니다.

1. `/tools/lotto/stats` : 회차 기반 통계(Hot/Cold/top frequency) 확인 페이지
2. `/tools/lotto/round/[round]` : 회차별 번호 분석 페이지

## 2) 디렉토리별 정리

### 2-1. app

| 경로 | 역할 |
| --- | --- |
| `app/tools/lotto/page.tsx` | 로또 메인 페이지 서버 컴포넌트, SEO 메타/구조화 데이터 등록, 생성기 슬롯 + 정보 섹션 렌더링 |
| `app/tools/lotto/stats/page.tsx` | 통계 페이지. hot/cold/빈도 Top 계산 및 노출 |
| `app/tools/lotto/round/[round]/page.tsx` | 회차 상세 페이지. 정적 파라미터와 메타데이터 동적 생성, 회차 이동 및 패턴 분석 |

### 2-2. components/lotto

| 경로 | 역할 |
| --- | --- |
| `components/lotto/LottoGenerator.tsx` | 로또 생성기 전체 조합 컴포넌트를 Provider로 감싸 렌더링 |
| `components/lotto/LottoInfoPanel.tsx` | 데스크탑용 사이드바 카드(사용법, 안내, 추가분석 링크) |
| `components/lotto/LottoContentSection.tsx` | SEO 설명용 섹션(추천 방식 비교, AI/통계 설명, 최신 회차 안내) |
| `components/lotto/LottoFAQ.tsx` | tool-config의 FAQ 데이터를 렌더링 |
| `components/lotto/LottoDisclaimer.tsx` | 면책 고지 배너/상세 카드 |
| `components/lotto/LottoResults.tsx` | 생성된 게임 목록 렌더링, 번호 애니메이션/복사 버튼 출력 |
| `components/lotto/LottoNumberAnimation.tsx` | 번호 개별 볼 색상·애니메이션 처리 |
| `components/lotto/LottoRoundYearFilter.tsx` | 회차 페이지에서 연도 필터링 UI |
| `components/lotto/SlotMachine.tsx` | 슬롯 모드의 릴 애니메이션 표시 |

### 2-3. components/lotto/LottoRecommend

| 경로 | 역할 |
| --- | --- |
| `components/lotto/LottoRecommend/index.ts` | Compound API 노출(Provider, Header, Controls 등) |
| `components/lotto/LottoRecommend/LottoRecommend.tsx` | 슬롯 객체 집계(`LottoRecommend` 바인딩 객체) |
| `components/lotto/LottoRecommend/LottoRecommendProvider.tsx` | 생성기 상태/액션/타이머/URL 동기화의 핵심 |
| `components/lotto/LottoRecommend/LottoRecommendRoot.tsx` | Provider 내부 레이아웃 래퍼 |
| `components/lotto/LottoRecommend/LottoRecommendHeader.tsx` | 상단 헤더 카드 |
| `components/lotto/LottoRecommend/LottoRecommendControls.tsx` | 생성 버튼 + 진행 상태 텍스트 |
| `components/lotto/LottoRecommend/LottoModeSwitcher.tsx` | mode 전환 카드/모바일 compact 버튼 |
| `components/lotto/LottoRecommend/LottoCountSelector.tsx` | 생성 게임 수 선택(1~5) |
| `components/lotto/LottoRecommend/LottoRecommendVariantPanel.tsx` | mode별 하위 설정 패널 스위치 |
| `components/lotto/LottoRecommend/LottoRecommendResultSheet.tsx` | 분석 중/결과 표시 BottomSheet 제어 |
| `components/lotto/LottoRecommend/LottoRecommendActions.tsx` | 링크 복사 버튼 처리 |
| `components/lotto/LottoRecommend/LottoRecommendResults.tsx` | 모드별 설명 헤더 + 결과 목록 렌더 |
| `components/lotto/LottoRecommend/LottoWeeklyRecommendation.tsx` | 주간 추천 번호 노출 및 복사 |
| `components/lotto/LottoRecommend/LottoAnalysisLoading.tsx` | 분석 진행률/단계 표시 |
| `components/lotto/LottoRecommend/ModeDescription.tsx` | 모바일 모드 선택 후 요약 설명 |
| `components/lotto/LottoRecommend/CompactModeButton.tsx` | 모바일 3x3 모드 버튼 |

### 2-4. components/lotto/LottoRecommend/variants

| 경로 | 역할 |
| --- | --- |
| `variants/RandomRecommendPanel.tsx` | 랜덤 모드 고정 정보 |
| `variants/StatsRecommendPanel.tsx` | 통계 전략 선택 버튼 + 최근 통계 요약 |
| `variants/DateRecommendPanel.tsx` | 날짜 입력(seed 기반 생성) |
| `variants/MbtiRecommendPanel.tsx` | MBTI 선택 및 프로필 설명 |
| `variants/LuckyNumberRecommendPanel.tsx` | 행운 번호 입력값 반영 |
| `variants/SlotRecommendPanel.tsx` | 슬롯 릴 프리뷰 및 스핀 제어 |

### 2-5. lib/lotto

| 경로 | 역할 |
| --- | --- |
| `lib/lotto/recommendation-spec.ts` | 모드/개수/쿼리 스펙 및 파싱·직렬화 |
| `lib/lotto/generator.ts` | 무작위·통계·시드·행운 번호 생성 루틴, 기본 통계 요약 제공 |
| `lib/lotto/round-data.ts` | `lotto_draws.json` 로딩 + 회차 조회/정렬 + 패턴 분석 유틸 |
| `lib/lotto/algorithms/ai-statistical-recommendation.ts` | AI 가중치 기반 생성 알고리즘 |
| `lib/lotto/algorithms/probability-statistical-recommendation.ts` | 6개 확률통계 전략 생성 알고리즘 |
| `lib/lotto/algorithms/statistics-analyzer.ts` | frequency/odd-even/range/co-occurrence 통계 엔진 |
| `lib/lotto/algorithms/validation.ts` | 번호 품질 규칙 검증(범위, 합계, 홀짝, 연속성 등) |
| `lib/lotto/image-generator.ts` | canvas 기반 번호 이미지 생성(현재는 호출 경로 없음, legacy 후보) |
| `lib/lotto/mbti-profile.ts` | MBTI 유형별 프로필 텍스트/키워드 |

### 2-6. tools 계층 연동

| 경로 | 역할 |
| --- | --- |
| `lib/tools/tool-config.ts` | lotto tool의 메타/FAQ/HowTo/키워드 중앙 관리 |
| `lib/tools/tool-metadata.ts` | 도구 페이지 Metadata 생성 |
| `lib/tools/tool-structured-data.ts` | WebPage/Breadcrumb/Application/FAQ/HowTo 구조화 데이터 생성 |
| `components/seo/JsonLdMultiple` (공통) | 페이지에 구조화 데이터 주입 |

### 2-7. 기타 핵심 파일

| 경로 | 역할 |
| --- | --- |
| `hooks/useLotto.ts` | `currentGames`와 `isGenerating` 타이밍 제어 |
| `app/tools/page.tsx` | Tool 목록 페이지에서 lotto 진입점 역할 |

## 3) 페이지 렌더링 흐름 (요약)

1. `app/tools/lotto/page.tsx`가 서버 컴포넌트로 동작하면서 메타(`generateToolMetadata`)와 FAQ를 구성
2. `assertToolStructuredData('lotto')`로 필수 구조화 데이터 타입 검증
3. `getToolStructuredDataArray('lotto')` 결과를 `JsonLdMultiple`에 전달
4. 최신 회차(`getLatestLottoRoundResult`)와 FAQ 데이터를 조회해 UI props 준비
5. 헤더/주요 그리드를 렌더링하고, 좌측 본문에 `LottoGenerator`를 `Suspense`로 감싸 렌더
6. 우측 사이드바는 `LottoInfoPanel`로 고정 안내 카드 출력
7. 하단에 `LottoContentSection`, `LottoFAQ`, `LottoDisclaimer`로 보조 콘텐츠 출력

## 4) 생성기 내부 흐름(핵심)

`LottoGenerator`는 Provider 패턴과 Compound Pattern으로 구성됩니다.

1. `LottoRecommend.Provider`가 전체 상태를 주입
2. `LottoRecommend.Root`에서 내부 섹션을 순차 배치
3. `Header` 출력
4. `Controls` 영역에서 `CountSelector`, `ModeSwitcher`, `VariantPanel` 렌더링
5. `generate` 클릭 시 `LottoRecommendProvider.generate` 실행
6. 생성 결과가 있으면 `ResultSheet`에서 loading/결과 표시 토글
7. `WeeklyRecommendation`으로 주간 고정 번호 노출

### 4-1. Provider 핵심 상태

`LottoRecommendProvider`의 상태/액션은 단일 컨텍스트로 관리합니다.

상태: `mode`, `count`, `statsStrategy`, `recommendDate`, `mbti`, `luckyNumber`, `currentGames`, `isGenerating`, `analysisStages`, `analysisStage`, `analysisStepIndex`, `analysisProgress`, `resultSheetOpen`, `selectedRecommendationLabel`, `selectedRecommendationDetail`

액션: `setMode`, `setCount`, `setStatsStrategy`, `setRecommendDate`, `setMbti`, `setLuckyNumber`, `generate`, `clearCurrent`, `copyNumbers`, `copyShareUrl`, `openResultSheet`, `closeResultSheet`

메타: `shareUrl`, `weeklyNumbers`

### 4-2. 추천 모드별 생성 로직 분기

`buildGamesByMode`에서 모드별로 생성 함수를 분기합니다.

1. 랜덤: `generateLottoNumbers`
2. 통계: `generateStatsBasedLottoNumbers(statsStrategy)`
3. 날짜: `generateLottoNumbersFromSeed(
`${recommendDate}:${index+1}`)`
4. MBTI: `generateLottoNumbersFromSeed(
`${mbti}:${localDateKey}:${index+1}`)`
5. 행운번호: `generateLottoNumbersWithLucky`
6. 슬롯: `generateLottoNumbers`

### 4-3. 생성 타이밍과 로딩 동기화

1. generate 버튼 클릭 시 분석 단계 문자열을 먼저 구성하고 UI 로딩 메시지를 시작
2. 진행률(`analysisProgress`)은 100ms 간격으로 갱신
3. 단계 텍스트는 `analysisStepMessages` 인덱스로 순차 변경
4. `useLotto.generateFromGames(games, 4500)`로 4.5초 뒤 실제 게임 결과 반영
5. `analysisFinalizeTimeout`에서 100% 표시와 최종 단계로 수렴
6. 결과 데이터가 없거나 분석이 없으면 ResultSheet는 렌더되지 않아 빈 상태 별도 안내 UI가 없음

이 흐름으로 사용자는 실제 계산이 없는 경우에도 분석 UX를 일관되게 체감합니다.

## 5) 상태 동기화·공유 URL 흐름

### 5-1. URL 쿼리 연동

`nuqs`로 아래 쿼리를 관리합니다.

`mode`, `count`, `numbers`

1. `mode`: `LOTTO_RECOMMEND_MODES` 값만 허용
2. `count`: 1,2,3,4,5만 허용
3. `numbers`: 파이프(`|`) + 콤마(`,`) 형식 문자열을 2D 배열로 변환

파싱 유틸은 `lib/lotto/recommendation-spec.ts`에 위치합니다. 숫자 세트가 6개 중복/범위를 충족해야 쿼리에 반영됩니다.

### 5-2. 숫자 결과와 URL 반영

1. 생성 직후 `setNumbersInQuery(games)`로 쿼리를 갱신
2. 쿼리 반영 시 provider는 `pendingGamesQuerySyncRef`로 무한 루프를 방지
3. `numbersInQuery` 변경 시 `generateFromGames`가 호출되어 `currentGames`와 동기화
4. 공유 링크는 `getShareUrl(mode, count, games)`로 구성되며, 현재 경로(`/tools/lotto`)와 파라미터를 결합해 복사

### 5-3. 주간 추천 캐시

1. `resolveWeeklyNumbers`는 `localStorage`의 주차 키(`YYYY-MM-DD`) 기준 캐시 확인
2. 주차가 바뀌면 새 번호를 생성해 덮어쓰기
3. `LOTTO_RECOMMEND_QUERY_KEYS`와 별도로 `weeklyNumbers`는 meta 값으로만 노출

## 6) UI 동작별 책임 정리

### 6-1. Controls 계열

- `LottoCountSelector`는 개수 변경 시 query count 업데이트
- `LottoModeSwitcher`는 `mode` 변경
- 모바일/데스크탑 분기 렌더
- `LottoRecommendControls`는 버튼 disabled 처리, 진행 메시지 바인딩

### 6-2. Variant 패널

- `LottoRecommendVariantPanel`은 현재 `mode`에 맞는 패널만 렌더
- stats/date/mbti/lucky/slot/random의 입력 UI는 각 패널 파일에서 분리

### 6-3. 결과 및 액션

- `LottoRecommendResultSheet`는 `isGenerating` 또는 결과가 있을 때만 렌더
- 생성 중에는 `LottoAnalysisLoading`
- 생성 후에는 `LottoRecommendActions` + `LottoRecommendResults`
- `LottoRecommendActions`는 링크 복사만 담당
- `LottoRecommendResults`는 추천 모드별 테마 헤더와 `LottoResults` 리스트 렌더

### 6-4. 복사 액션

- 번호 복사: `copyTextToClipboard(formatLottoNumbers(numbers))`
- 공유 링크 복사: `copyShareUrl`

## 7) 슬롯/애니메이션 처리

`SlotRecommendPanel`은 두 단계로 동작합니다.

1. 슬롯 모드가 아니면 일반 결과(혹은 대기 프레임)만 표시
2. `isGenerating`일 때 90ms마다 프레임을 갱신해 회전하는 듯한 UI 출력
3. SlotMachine의 릴은 중앙 번호 기준 상·중·하단 번호를 계산해 표시

`LottoResults` 내부 번호는 `LottoNumberAnimation`으로 순차 애니메이션이 적용됩니다.

## 8) 데이터와 알고리즘 흐름

### 8-1. 회차 데이터

1. `lib/lotto/round-data.ts`가 `lotto_draws.json`을 로드해 `LottoRoundResult[]` 생성
2. 최신 정렬: round desc
3. `getLatestLottoRoundResult`, `getLottoRoundResult`, `getLottoRoundResults`, `getLottoHotColdNumbers`를 제공

참고: 현재 구현에서 JSON 변환 시 `drawDate` 필드를 `drawYear`로 채우는 부분이 존재해 데이터 스키마 의존성 확인이 필요합니다.

### 8-2. 통계 분석/알고리즘

1. `statistics-analyzer`에서 frequency, odd-even, 구간 분포, 동반출현 분석 결과를 계산
2. AI 모드: 가중치 합성(전체 빈도, 최근 빈도, 동반 출현, 균형 보정) 후 가중 샘플링
3. 확률통계 모드: `high/low frequency`, `undrawn`, `balanced`, `hot`, `cold` 전략으로 번호군 선택
4. 검증은 `validation.ts` 규칙으로 보강(기본 규칙은 `generator.ts`의 `validateLottoNumbers`/AI 내부 검증)

### 8-3. Hook/상태 분리

`useLotto`는 현재 게임 리스트와 생성 타이밍만 관리합니다.

1. `generateFromGames(games, delayMs)`로 `isGenerating` 토글
2. 타이머 후 `currentGames` 교체
3. Provider는 이 값과 병행해 분석 단계/URL 상태를 조합

## 9) 보조 페이지 흐름 요약

### 9-1. `/tools/lotto/stats`

1. 회차 전체(`getLottoRoundResults`)를 받아 총 개수 기반 통계 렌더
2. hot/cold/top frequency를 가공해 카드/테이블에 노출
3. 최신 회차 링크로 상세 페이지 이동 경로 제공
4. SEO는 별도 메타 + `getToolSubPageStructuredDataArray`

### 9-2. `/tools/lotto/round/[round]`

1. `generateStaticParams`로 정적 경로 생성
2. params 기반 round 조회 실패 시 `notFound()` 처리
3. 회차 상세 번호, gap, odd/even, low/high 합계/평균 패턴 출력
4. 이전/다음 회차 이동 링크와 연도 필터 바인딩

## 10) SEO/구조화 데이터 통합

로또 메인 페이지는 Tool 전용 SEO 파이프라인을 사용합니다.

1. `TOOL_CONFIGS.lotto`에서 이름/설명/FAQ/HowTo/FaqStep 정의
2. `generateToolMetadata('lotto')`로 페이지 Metadata 생성
3. `getToolStructuredDataArray('lotto')`로 WebPage/Breadcrumb/SoftwareApplication/FAQ/HowTo 수집
4. `JsonLdMultiple`에 주입해 렌더링
5. 하위 페이지는 `getToolSubPageStructuredDataArray`를 사용해 경로별 breadcrumb 반영

## 11) 파일 간 의존 관계(요약)

1. `app/tools/lotto/page.tsx`는 `components/lotto/*`, `LottoGenerator`, `getToolConfig`, `round-data`, `tool` 공용 유틸에 종속
2. `LottoGenerator`는 `components/lotto/LottoRecommend/*`에만 의존
3. Provider는 `hooks/useLotto` + `lib/lotto/*` + `hooks`를 결합
4. variant 패널은 `lib/lotto/recommendation-spec` + `mbti-profile` + generator 일부만 사용
5. 통계/회차 페이지는 `round-data`, `generator`, `round-analysis` 계열만 직접 사용

## 12) 운영 포인트(검수 체크리스트)

1. 회차 데이터 스키마 변경 시 `lotto_draws.json`과 `round-data` 매핑 검증(특히 drawDate 매핑)
2. `nuqs` 쿼리 기본값 변경 시 공유 링크/재진입 동작이 뒤엉키지 않는지 점검
3. `image-generator.ts` 사용 여부를 정리하고 불필요 코드 유무 판단
4. 삭제된 `captureLottoResultsElement`/`html2canvas` 경로가 재도입되지 않았는지 정기 점검
5. 통계 알고리즘 추가 시 `LOTTO_STATS_STRATEGY`/`LOTTO_RECOMMEND_MODES` 동기화

## 13) 문서 보존 이유

이 문서는 시간 경과 시 컴포넌트 수명을 연장하기 위한 기준 문서입니다.

1. 페이지 동작을 한 번에 이해하려면 route → provider → state → hook → 알고리즘 순으로 추적
2. SEO/공유/URL 동기화가 한 번에 보이지 않으면 디버깅 비용이 높아지는 구조를 선제 정리
3. 보조 페이지(통계/회차)까지 포함해 기능 경계를 명확히 구분
4. 신규 모드 추가 시 변경 포인트(상수 파일, 패널, 선택 UI, 전략 로직, UI 라벨)를 빠르게 확장할 수 있도록 기준 제공

## 14) 최근 반영 사항

1. 로또 생성기에서 이미지 저장 경로를 삭제
   - `LottoRecommendActions`의 이미지 저장 버튼 제거
   - `LottoRecommendProvider`의 `downloadResultsImage` 액션 제거
   - 결과 캡처용 DOM 마커 및 유틸(`captureLottoResultsElement`) 제거
   - `html2canvas` 의존성 삭제(`package.json`, `pnpm-lock.yaml`)
2. 빈 상태 전용 컴포넌트 제거
   - `LottoRecommend.EmptyState` 노출 경로 삭제
   - `components/lotto/LottoRecommend/LottoRecommendEmptyState.tsx` 삭제

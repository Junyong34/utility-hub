# Lotto Query State Guidelines

로또 추천 페이지의 URL 상태 관리와 공유 링크 동작 규칙을 정리한 문서입니다.

## 1. 목적

- 로또 추천 페이지(`/tools/lotto`)의 상태를 URL과 일관되게 동기화한다.
- 공유 링크로 진입했을 때 동일한 추천 설정/결과가 복원되도록 한다.
- 추후 기능 확장 시 URL 스키마를 깨지 않고 유지보수할 수 있도록 기준을 제공한다.

## 2. 적용 범위

- 클라이언트 상태/URL 동기화: `components/lotto/LottoRecommend/LottoRecommendProvider.tsx`
- 쿼리 파싱/직렬화 유틸: `lib/lotto/recommendation-spec.ts`
- 복사 동작 안정화: `lib/clipboard.ts`

## 3. 핵심 결정사항

### 3.1 URL을 상태의 기준으로 사용

- `nuqs`의 `useQueryStates`를 사용해 `mode`, `count`, `numbers`를 관리한다.
- 직접 `window.location.search`를 파싱하는 방식은 사용하지 않는다.

### 3.2 `numbers`는 다중 게임(최대 5게임)까지 전달

- 기존 단일 게임 전달 방식에서 다중 게임 전달 방식으로 확장했다.
- 구분자 규칙:
  - 게임 내부 숫자 구분: `,`
  - 게임 간 구분: `|`

예시:

```text
numbers=2,3,5,9,18,41|4,8,11,22,35,44
```

URL 인코딩 예시:

```text
numbers=2%2C3%2C5%2C9%2C18%2C41%7C4%2C8%2C11%2C22%2C35%2C44
```

## 4. 쿼리 스키마

### 4.1 키 정의

- `mode`: `random | stats | date | mbti | lucky | slot`
- `count`: `1 | 2 | 3 | 4 | 5`
- `numbers`: `game(|game){0,4}` 형태의 문자열

### 4.2 파서/시리얼라이저 규칙

- `parseLottoRecommendGames(value)`:
  - `|`로 게임 분리 후 각 게임을 `parseLottoRecommendNumbers`로 검증
  - 게임 수가 `1~5` 범위를 벗어나면 무효 처리
- `formatLottoRecommendGamesForQuery(games)`:
  - 각 게임을 정규화 후 `|`로 결합
  - 게임 수가 `1~5` 범위를 벗어나면 `null` 반환

## 5. 공유 링크 동작 규칙

### 5.1 상단 액션의 "공유 링크 복사"

- 현재 생성된 게임(`currentGames`) 전체를 `numbers`에 넣는다.
- `count=5`라면 5게임 전체가 링크에 포함된다.

### 5.2 결과 카드의 개별 "공유 링크 복사"

- 클릭한 단일 게임만 공유한다.
- 이 경우 `count=1`로 강제하여 링크 의미를 명확히 유지한다.

## 6. URL ↔ 화면 동기화 원칙

- URL에 `numbers`가 있으면 화면 결과(`currentGames`)를 해당 값으로 복원한다.
- 생성/초기화 동작 시 URL `numbers`도 함께 갱신한다.
- 루프 방지를 위해 내부 동기화 상태(`pendingGamesQuerySyncRef`)를 사용한다.

## 7. Phase 4 QA 핫픽스 요약

- 복사 기능 안정화:
  - `navigator.clipboard.writeText` 실패 시 `document.execCommand('copy')` 폴백
- MBTI 추천 규칙:
  - `MBTI + 로컬 오늘 날짜(YYYY-MM-DD) + 게임 순번` 시드 적용
- 슬롯 모드 정합성:
  - 선택 게임 수 기준 슬롯 프리뷰 표시
  - 생성 종료 시 결과와 슬롯 표시값 일치
- 버튼 안정성:
  - 주요 액션 버튼에 `type="button"` 명시

## 8. 회귀 테스트 체크리스트

1. URL 복원
   - 다중 게임 `numbers` 링크 진입 시 mode/count/결과가 복원되는지 확인
2. 공유 링크
   - count=5 생성 후 공유 링크에 5게임이 모두 포함되는지 확인
3. 개별 공유
   - 결과 카드의 공유 링크가 단일 게임(`count=1`)으로 생성되는지 확인
4. 복사 기능
   - 번호 복사/링크 복사 동작 확인
5. 명령 검증
   - `pnpm type-check`
   - `pnpm lint -- components/lotto/LottoRecommend lib/lotto/recommendation-spec.ts`

## 9. 알려진 제한사항

- `statsStrategy`, `mbti`, `recommendDate`, `luckyNumber`는 아직 URL에 포함하지 않는다.
  - 현재 URL 상태는 `mode`, `count`, `numbers`만 보장한다.
- `pnpm build`는 개발 환경 네트워크 상태에 따라 Google Fonts fetch 이슈로 실패할 수 있다.


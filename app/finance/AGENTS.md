# AGENTS.md

## Scope

이 문서는 `app/finance/**` 라우트와 finance 화면 작업에 적용한다.

finance는 공개 서비스 섹션이 아니라 개인용 비공개 재무 워크스페이스다. 구현할 때는 공개 도구, 블로그, 육아형 리브랜딩 화면과 섞지 않는다.

## Product Intent

- 이 화면은 매일 거래를 기록하는 가계부가 아니다.
- 기본 단위는 `연도-월` 기준 월별 스냅샷이다.
- 사용자는 월별로 수입, 자산, 부채, 투자, 지출 상태를 저장하고 기간별 흐름을 본다.
- 입력 부담을 낮추기 위해 새 월은 기준월 스냅샷을 복사한 뒤 바뀐 값만 수정한다.
- 조회 화면은 입력 화면과 분리한다.

## Route Contract

- 기본 라우트는 `/finance`다.
- 입력 라우트는 `/finance/input`이다.
- 상세 라우트는 다음 경로를 유지한다:
  - `/finance/assets`
  - `/finance/debts`
  - `/finance/investments`
  - `/finance/expenses`
  - `/finance/reports`
  - `/finance/projection`
- 짧고 기억하기 쉬운 경로를 유지한다.
- `finance` 경로를 공개 네비게이션, `/tools`, sitemap, 공개 tool registry에 추가하지 않는다.
- finance 하위 page는 `FINANCE_PAGE_METADATA`를 통해 `noindex, nofollow`를 유지한다.

## Data Contract

- 원천 데이터는 `data/private/finance-snapshots.json`이다.
- 추적 가능한 예시는 `data/private/finance-snapshots.example.json`만 사용한다.
- 실제 개인 데이터 파일은 커밋 대상이 아니다.
- 저장소 코드는 `lib/finance/repository.ts`를 기준으로 한다.
- 계산/조회 파생값은 `lib/finance/summary.ts`와 `lib/finance/reports.ts`에서 만든다.
- 화면 컴포넌트에서 총자산, 순자산, 지출 합계, 비교 수치를 다시 계산하지 않는다.

## Snapshot Rules

- 스냅샷 생성은 값을 누적하는 동작이 아니라 기준월의 상태를 새 월로 복사하는 동작이다.
- `month`와 `updatedAt`만 새 월 기준으로 바뀐다.
- 기존 월이 있으면 기본적으로 덮어쓰지 않는다.
- 기존 월을 다시 만들려면 명시적 덮어쓰기 옵션이 필요하다.
- 자산 중 `autoAccumulate`가 켜진 항목만 월 차이만큼 `monthlyContribution`을 더하거나 뺀다.
- 자동 누적은 적금, 청약통장, 정기 납입성 자산에만 사용한다.
- 현금, 예금, CMA, 주식/ETF/펀드 평가금액, 부동산, 부채는 자동 누적 대상으로 취급하지 않는다.

## UI Rules

- 상단 컨트롤은 `화면` 영역과 `기준월` 영역을 분리해서 보여준다.
- 화면 이동은 탭형 네비게이션으로 인지되어야 하며, 단순 버튼 목록처럼 보이면 안 된다.
- 기준월은 `년도 select + 1~12월 버튼` 구조를 유지한다.
- 생성된 월이 많아져도 월 버튼이 무한히 늘어나는 구조로 되돌리지 않는다.
- 입력 화면의 필드는 조회성 텍스트와 시각적으로 구분해야 한다.
- 입력 가능한 필드는 공통 입력 primitive를 통해 `입력` 배지와 편집용 스타일을 유지한다.
- 금액 입력은 천 단위 콤마를 표시하지만 저장 값은 number로 유지한다.
- 월 이동 시 입력 draft는 반드시 해당 월 스냅샷으로 다시 초기화되어야 한다.

## Dashboard Rules

- 대시보드 비교 필터는 `반기`, `연도`, `전체 통계`를 사용한다.
- `반기`는 선택한 월 기준 최근 6개월 구간을 차트에 표시한다.
- `연도`는 선택한 연도와 전년도 구간을 차트에 표시한다.
- `전체 통계`는 등록된 전체 월 이력을 차트에 표시한다.
- 대시보드에는 실제 차트 적용 기간을 텍스트로 함께 보여준다.
- 자산 증감 이력은 변화가 있는 월만 보여준다.
- 변화가 없는 월은 자산 증감 이력에 노출하지 않는다.

## Testing

- 저장소/계산 변경 시 관련 `node --experimental-strip-types --test lib/finance/*.test.mjs`를 실행한다.
- 화면 흐름 변경 시 `pnpm exec playwright test tests/finance-input.spec.ts tests/finance-month-switch.spec.ts --workers=1`을 우선 실행한다.
- finance Playwright 테스트는 실제 `data/private/finance-snapshots.json`을 백업/복원해야 한다.
- 테스트가 개인 데이터 파일을 삭제하거나 테스트 데이터로 남겨두면 안 된다.

## Do Not

- `lib/tools/tool-config.ts`에 finance를 등록하지 않는다.
- `/tools` 목록, `ToolSwitcher`, sitemap에 finance를 추가하지 않는다.
- 입력 화면에서 월별 스냅샷 전체를 다른 월로 암묵적으로 덮어쓰지 않는다.
- 입력 폼 상태를 월 이동 후에도 이전 월 draft로 유지하지 않는다.
- 대시보드/상세 페이지에서 계산식을 중복 구현하지 않는다.

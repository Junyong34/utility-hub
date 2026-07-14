# Utility Hub 문서 인덱스

문서는 기술 종류가 아니라 사용 목적에 따라 찾고 저장합니다. 새 문서를 만들기 전에 아래 표에서 canonical 위치를 먼저 선택하고, 기존 문서를 인용할 때는 이 인덱스의 현재 경로를 사용합니다.

## 문서 분류 기준

| 위치                  | 목적                                     | 대표 진입점                                                                                   |
| --------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| `docs/architecture`   | 프로젝트 지도, 모듈 경계, 공개 계약, ADR | [프로젝트 맵](./architecture/project-map.md)                                                  |
| `docs/specs`          | 제품 요구사항과 설계 기준                | [육아형 리브랜딩 기준 스펙](./specs/2026-04-06-parenting-guide-rebrand-design.md)             |
| `docs/plans`          | 날짜 기반 실행 계획                      | [도메인 모듈 구조 개선 계획](./plans/2026-07-13-001-refactor-domain-module-structure-plan.md) |
| `docs/implementation` | 페이지·모듈 구현 방법                    | [신규 도구 페이지 가이드](./implementation/create-tools-page.md)                              |
| `docs/testing`        | 테스트 전략과 수동 테스트 계획           | [Pomodoro 테스트 계획](./testing/tools/pomodoro.md)                                           |
| `docs/operations`     | 환경 변수, 배포, 분석, 유지보수 runbook  | 현재 추적 문서 없음                                                                           |
| `docs/research`       | 사실 근거와 조사 결과                    | [리서치 인덱스](./research/README.md)                                                         |
| `docs/reference`      | 자주 바뀌지 않는 장기 참조 자료          | 현재 추적 문서 없음                                                                           |
| `docs/archive`        | 대체됐지만 이력상 보존할 문서            | [초기 MVP PRD](./archive/prd.md)                                                              |

빈 디렉터리는 형식적으로 만들지 않습니다. 운영 또는 참조 문서가 실제로 생길 때 canonical 디렉터리를 생성합니다.

## Architecture

- [프로젝트 맵](./architecture/project-map.md): URL과 현재·목표 코드 소유 위치
- [모듈 경계](./architecture/module-boundaries.md): 허용 import와 공개 entry 규칙
- [공개 계약 매트릭스](./architecture/public-contract-matrix.md): URL, API, SEO, 상태 계약
- [마이그레이션 원장](./architecture/migration-ledger.md): legacy 경로와 facade 제거 증거
- [문서 이동 맵](./architecture/document-migration-map.md): 이전 경로와 canonical 경로 대응표

## Specs

### 제품·콘텐츠

- [육아형 리브랜딩 기준 스펙](./specs/2026-04-06-parenting-guide-rebrand-design.md)
- [육아형 리브랜딩 세부 스펙 인덱스](./specs/parenting-guide-rebrand/README.md)
- [비 오는 날 실내 콘텐츠 클러스터](./specs/2026-06-12-rainy-day-indoor-content-cluster-design.md)
- [아기 발열·해열제 리서치 설계](./specs/2026-06-30-baby-fever-antipyretic-research-design.md)
- [아기 과일 섭취 리서치 설계](./specs/2026-06-30-baby-fruit-intake-research-design.md)

### 도구

- [대출 계산기 PRD](./specs/tools/loan-calculator.md)
- [Pomodoro PRD](./specs/tools/pomodoro.md)

## Plans

- [주택담보대출 계산기 PRD 계획](./plans/2026-03-09-mortgage-calculator-prd.md)
- [대출 계산기 URL 상태 공유](./plans/2026-03-10-loan-calculator-url-state-sharing.md)
- [주택 구매 자금 계산기 구현](./plans/2026-03-25-home-buying-funds-calculator-implementation-plan.md)
- [SEO 감사 개선 계획](./plans/2026-04-07-seo-audit-findings-and-remediation-plan.md)
- [장소 제목 검색 계획](./plans/2026-05-04-001-feat-place-title-search-plan.md)
- [육아 혜택 콘텐츠 확장](./plans/2026-05-26-parenting-benefits-content-expansion.md)
- [비 오는 날 실내 콘텐츠 클러스터 구현](./plans/2026-06-12-rainy-day-indoor-content-cluster.md)
- [장소 페이지네이션 계획](./plans/2026-06-12-001-feat-crawlable-places-pagination-plan.md)
- [아기 과일 섭취 리서치 실행](./plans/2026-06-30-baby-fruit-intake-research.md)
- [도메인 모듈 구조 개선](./plans/2026-07-13-001-refactor-domain-module-structure-plan.md)

## Implementation

- [블로그 페이지 구조](./implementation/blog-page-structure.md)
- [신규 도구 페이지 생성](./implementation/create-tools-page.md)
- [대출 계산기 구조](./implementation/tools-page-loan-structure.md)
- [로또 도구 구조](./implementation/tools-page-lotto-structure.md)
- [예금·적금 계산기 구조](./implementation/tools-page-saving-structure.md)

## Testing

- [Pomodoro 테스트 계획](./testing/tools/pomodoro.md)

테스트 코드 위치는 성격에 따라 나눕니다.

- 순수 unit/regression: 소스 옆 `*.test.mjs` 또는 `*.test.ts`
- 파일시스템·외부 경계: `tests/integration/<domain>`
- 핵심 사용자 여정: `tests/e2e/<domain>`
- 실제 네트워크·비용 의존: `tests/live/<domain>`
- 저장소 구조·공개 계약: `tests/architecture`, `tests/contracts`

## Research

- [리서치 운영 기준](./research/README.md)
- [장소 리서치 인덱스](./research/places/README.md)
- [공공데이터 리서치 인덱스](./research/public-data/README.md)
- [아기 발달 리서치 인덱스](./research/parenting/baby-development-milestones-0-24m/README.md)

## Archive

- [초기 수익형 블로그·유틸 MVP PRD](./archive/prd.md): 주제 확정 전 2주 MVP 구상으로, 현재 제품·리브랜딩 의사결정의 기준이 아니어서 보관 문서로 분류했습니다.

## 현재 유지 중인 기존 분류

이번 이동 범위에 포함되지 않은 `docs/content-drafts`, `docs/content-strategy`, `docs/manuals`, `docs/seo`, `docs/tools`는 기존 경로를 유지합니다. 새 문서는 위 canonical 분류를 사용하고, 기존 문서는 별도 이관 계획 없이 임의로 옮기지 않습니다.

- [Breadcrumb·콘텐츠 유지보수 가이드](./breadcrumb-and-content-maintenance-guide.md)
- [콘텐츠 편집 일정](./content-strategy/2026-04-03-editorial-calendar.md)
- [gstack 매뉴얼](./manuals/gstack/README.md)
- [Google 색인 조치 목록](./seo/google-indexing-action-list-2026-05-08.md)
- [Last Digit Game 문서](./tools/game/Last-Digit-Game.md)
- [로또 데이터 분석 스펙](./tools/lotto/algorithms/data-analysis-spec.md)

## 작성 규칙

1. 제품이 무엇을 해야 하는지는 `specs`, 언제·어떻게 실행할지는 `plans`에 둡니다.
2. 재사용 가능한 구현 방법은 `implementation`, 검증 전략과 수동 시나리오는 `testing`에 둡니다.
3. 조사 결과와 제품 결정을 섞지 않고 각각 `research`, `specs`에서 관리합니다.
4. 라우트 디렉터리에는 PRD나 테스트 계획을 두지 않습니다.
5. 문서를 이동하면 같은 변경에서 incoming/outgoing 상대 링크, `README.md`, `AGENTS.md`를 갱신합니다.
6. 이동 이력과 예외는 [문서 이동 맵](./architecture/document-migration-map.md)에 기록합니다.

## 결론

새 문서는 목적별 canonical 위치에 추가하고, 현재 경로를 확인할 때는 이 인덱스와 문서 이동 맵을 기준으로 사용합니다.

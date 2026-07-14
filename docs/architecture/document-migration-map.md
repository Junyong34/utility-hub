# 문서 이동 맵

이 문서는 2026-07-13 문서 taxonomy 정리에서 변경한 이전 경로와 canonical 경로를 연결합니다. 문서의 내용과 제품 계약은 유지하고, 스펙·계획·구현·테스트·보관 목적만 경로에 드러내는 것이 이동 원칙입니다.

## 분류 원칙

- 제품 요구사항과 설계 기준은 `docs/specs`가 소유합니다.
- 날짜 기반 실행 단위는 `docs/plans`가 소유합니다.
- 구현 방법과 페이지 구조는 `docs/implementation`이 소유합니다.
- 테스트 전략과 수동 시나리오는 `docs/testing`이 소유합니다.
- 대체됐지만 이력상 필요한 문서는 `docs/archive`가 소유합니다.
- Git이 추적한 파일만 이동하고, 사용자 미추적 파일은 이동하거나 덮어쓰지 않습니다.

## Old → New

### Specs

| 이전 경로                                                                                   | Canonical 경로                                                                                                                                               |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docs/superpowers/specs/2026-04-06-parenting-guide-rebrand-design.md`                       | [docs/specs/2026-04-06-parenting-guide-rebrand-design.md](../specs/2026-04-06-parenting-guide-rebrand-design.md)                                             |
| `docs/superpowers/specs/2026-06-12-rainy-day-indoor-content-cluster-design.md`              | [docs/specs/2026-06-12-rainy-day-indoor-content-cluster-design.md](../specs/2026-06-12-rainy-day-indoor-content-cluster-design.md)                           |
| `docs/superpowers/specs/2026-06-30-baby-fever-antipyretic-research-design.md`               | [docs/specs/2026-06-30-baby-fever-antipyretic-research-design.md](../specs/2026-06-30-baby-fever-antipyretic-research-design.md)                             |
| `docs/superpowers/specs/2026-06-30-baby-fruit-intake-research-design.md`                    | [docs/specs/2026-06-30-baby-fruit-intake-research-design.md](../specs/2026-06-30-baby-fruit-intake-research-design.md)                                       |
| `docs/superpowers/specs/parenting-guide-rebrand/README.md`                                  | [docs/specs/parenting-guide-rebrand/README.md](../specs/parenting-guide-rebrand/README.md)                                                                   |
| `docs/superpowers/specs/parenting-guide-rebrand/01-product-strategy-and-messaging.md`       | [docs/specs/parenting-guide-rebrand/01-product-strategy-and-messaging.md](../specs/parenting-guide-rebrand/01-product-strategy-and-messaging.md)             |
| `docs/superpowers/specs/parenting-guide-rebrand/02-information-architecture-and-routing.md` | [docs/specs/parenting-guide-rebrand/02-information-architecture-and-routing.md](../specs/parenting-guide-rebrand/02-information-architecture-and-routing.md) |
| `docs/superpowers/specs/parenting-guide-rebrand/03-content-model-and-taxonomy.md`           | [docs/specs/parenting-guide-rebrand/03-content-model-and-taxonomy.md](../specs/parenting-guide-rebrand/03-content-model-and-taxonomy.md)                     |
| `docs/superpowers/specs/parenting-guide-rebrand/04-tools-strategy-and-priority.md`          | [docs/specs/parenting-guide-rebrand/04-tools-strategy-and-priority.md](../specs/parenting-guide-rebrand/04-tools-strategy-and-priority.md)                   |
| `docs/superpowers/specs/parenting-guide-rebrand/05-benefits-content-strategy.md`            | [docs/specs/parenting-guide-rebrand/05-benefits-content-strategy.md](../specs/parenting-guide-rebrand/05-benefits-content-strategy.md)                       |
| `docs/superpowers/specs/parenting-guide-rebrand/06-roadmap-and-measurement.md`              | [docs/specs/parenting-guide-rebrand/06-roadmap-and-measurement.md](../specs/parenting-guide-rebrand/06-roadmap-and-measurement.md)                           |
| `docs/superpowers/specs/parenting-guide-rebrand/07-data-sourcing-and-trust-model.md`        | [docs/specs/parenting-guide-rebrand/07-data-sourcing-and-trust-model.md](../specs/parenting-guide-rebrand/07-data-sourcing-and-trust-model.md)               |
| `docs/superpowers/specs/parenting-guide-rebrand/08-calculator-design-and-visualization.md`  | [docs/specs/parenting-guide-rebrand/08-calculator-design-and-visualization.md](../specs/parenting-guide-rebrand/08-calculator-design-and-visualization.md)   |
| `docs/superpowers/specs/parenting-guide-rebrand/09-og-image-rebrand-system.md`              | [docs/specs/parenting-guide-rebrand/09-og-image-rebrand-system.md](../specs/parenting-guide-rebrand/09-og-image-rebrand-system.md)                           |
| `docs/superpowers/specs/parenting-guide-rebrand/10-ga-event-tracking-strategy.md`           | [docs/specs/parenting-guide-rebrand/10-ga-event-tracking-strategy.md](../specs/parenting-guide-rebrand/10-ga-event-tracking-strategy.md)                     |
| `app/tools/loan-calculator/loan-prd.md`                                                     | [docs/specs/tools/loan-calculator.md](../specs/tools/loan-calculator.md)                                                                                     |
| `app/tools/pomodoro/pomodoro-prd.md`                                                        | [docs/specs/tools/pomodoro.md](../specs/tools/pomodoro.md)                                                                                                   |

### Plans

`git ls-files docs/superpowers/plans` 결과에 포함된 다음 세 파일만 이동했습니다.

| 이전 경로                                                                   | Canonical 경로                                                                                                               |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `docs/superpowers/plans/2026-05-26-parenting-benefits-content-expansion.md` | [docs/plans/2026-05-26-parenting-benefits-content-expansion.md](../plans/2026-05-26-parenting-benefits-content-expansion.md) |
| `docs/superpowers/plans/2026-06-12-rainy-day-indoor-content-cluster.md`     | [docs/plans/2026-06-12-rainy-day-indoor-content-cluster.md](../plans/2026-06-12-rainy-day-indoor-content-cluster.md)         |
| `docs/superpowers/plans/2026-06-30-baby-fruit-intake-research.md`           | [docs/plans/2026-06-30-baby-fruit-intake-research.md](../plans/2026-06-30-baby-fruit-intake-research.md)                     |

### Implementation

| 이전 경로                                      | Canonical 경로                                                                                         |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `docs/app-page/blog-page-structure.md`         | [docs/implementation/blog-page-structure.md](../implementation/blog-page-structure.md)                 |
| `docs/app-page/create-tools-page.md`           | [docs/implementation/create-tools-page.md](../implementation/create-tools-page.md)                     |
| `docs/app-page/tools-page-loan-structure.md`   | [docs/implementation/tools-page-loan-structure.md](../implementation/tools-page-loan-structure.md)     |
| `docs/app-page/tools-page-lotto-structure.md`  | [docs/implementation/tools-page-lotto-structure.md](../implementation/tools-page-lotto-structure.md)   |
| `docs/app-page/tools-page-saving-structure.md` | [docs/implementation/tools-page-saving-structure.md](../implementation/tools-page-saving-structure.md) |

### Testing and Archive

| 이전 경로                                  | Canonical 경로                                                 | 판정                                                       |
| ------------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------- |
| `app/tools/pomodoro/pomodoro-test-plan.md` | [docs/testing/tools/pomodoro.md](../testing/tools/pomodoro.md) | 라우트 전용 수동 테스트 계획                               |
| `prd.md`                                   | [docs/archive/prd.md](../archive/prd.md)                       | 주제 확정 전 2주 MVP 구상으로 현재 제품 스펙에 의해 대체됨 |

## 참조 갱신 범위

다음 tracked Markdown 소비자의 이전 경로를 canonical 경로로 함께 갱신했습니다.

- root `README.md`, `docs/README.md`, `AGENTS.md`
- 리브랜딩 기준 스펙과 세부 스펙 인덱스
- 비 오는 날 콘텐츠 설계·실행 계획
- 아기 과일 섭취 리서치 실행 계획
- 주택 구매 자금 계산기와 Places 검색 실행 계획
- 장소 리서치 인덱스의 리브랜딩 기준 상대 링크

이동 전 대상 문서에는 로컬 Markdown 상대 링크나 문서 anchor 링크가 없었습니다. 코드 span과 명령 예시에 기록된 repository-relative 경로는 새 canonical 경로로 갱신했고, 세부 스펙 README는 새 상대 링크 인덱스로 정리했습니다.

## 보존 대상과 경계

- `docs/superpowers/plans/2026-07-11-childcare-blog-research-plan.md`는 Git 미추적 사용자 문서이므로 이동·수정하지 않았습니다.
- `docs/plans/2026-07-13-001-refactor-domain-module-structure-plan.md`는 실행 기준 계획이므로 본문에 기록된 과거 경로를 변경하지 않았습니다.
- `docs/content-drafts`, `docs/content-strategy`, `docs/manuals`, `docs/seo`, `docs/tools`는 이번 명시적 이동 범위가 아니므로 기존 위치를 유지합니다.
- source 주석의 `@see` 두 건(`lib/places/source-policy.ts`, `types/place-source.ts`)은 Markdown 소유 범위 밖이지만 병렬 통합 작업에서 `docs/specs/parenting-guide-rebrand/07-data-sourcing-and-trust-model.md`로 갱신됐습니다.
- 기준 스펙에 적힌 `docs/plans/parenting-guide-rebrand/**` 메뉴 계획은 추후 생성 후보이며 현재 tracked 파일은 없습니다.

## 검증 기준

- 이전 대상 27개가 새 경로에 존재하고 Git이 rename으로 인식할 수 있어야 합니다.
- `README.md`, `docs/README.md`, `AGENTS.md`의 모든 로컬 Markdown 링크가 존재해야 합니다.
- 문서 내부 상대 링크와 anchor가 유효해야 합니다.
- `app/**` 라우트 디렉터리에 `*prd*.md`, `*test-plan*.md`가 없어야 합니다.
- 보호 대상 미추적 파일의 경로와 checksum이 변경되지 않아야 합니다.

## 결론

문서의 최신 위치는 [문서 인덱스](../README.md)와 이 old→new 표를 기준으로 확인합니다. 이전 경로는 새 참조에 사용하지 않습니다.

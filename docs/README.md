# Utility Hub 문서 인덱스 (1차 골격)

이 디렉토리는 `prd.md`의 상위 계획을 단계형 실행 문서로 분해한 골격 문서 모음입니다.  
현재 상태는 모두 `Draft-Skeleton`이며, 상세 설계/실행 전 검토를 전제로 합니다.

## 문서 운영 원칙

- 문서 깊이: 골격 수준 유지(세부 구현 지시 최소화)
- 공통 섹션: `목적`, `범위(포함/제외)`, `선행조건`, `핵심 작업`, `산출물`, `의사결정 포인트`, `리스크`, `완료 기준`, `다음 단계 인계`
- 상세화 방식: 각 단계 문서 상단 체크포인트 확인 후 확장

## 단계 문서 맵

| 단계 | 문서 | 목적 | 상태 | 다음 리뷰 일자 |
| --- | --- | --- | --- | --- |
| 01 | [01-env-setup-and-ui-library.md](./01-env-setup-and-ui-library.md) | 개발 환경/패키지/UI 라이브러리 기준 고정 | Draft-Skeleton | 2026-03-02 |
| 02 | [02-site-structure-and-color-system.md](./02-site-structure-and-color-system.md) | IA 및 컬러/타이포 시스템 골격 수립 | Draft-Skeleton | 2026-03-02 |
| 03 | [03-ad-slot-definition-and-components.md](./03-ad-slot-definition-and-components.md) | 광고 위치 정의 및 광고 컴포넌트 분리 기준 수립 | Draft-Skeleton | 2026-03-02 |
| 04 | [04-routing-strategy-ssg-ssr.md](./04-routing-strategy-ssg-ssr.md) | SSG/SSR 라우팅 전략 및 분류 매트릭스 고정 | Draft-Skeleton | 2026-03-02 |
| 05 | [05-page-blueprints-and-content-assets.md](./05-page-blueprints-and-content-assets.md) | 페이지 상세 설계 템플릿/콘텐츠 자산 준비 기준 수립 | Draft-Skeleton | 2026-03-02 |
| 06 | [06-seo-optimization-and-search-submission.md](./06-seo-optimization-and-search-submission.md) | SEO 및 검색엔진 등록 작업 골격 정의 | Draft-Skeleton | 2026-03-02 |
| 07 | [07-ad-network-readiness.md](./07-ad-network-readiness.md) | 광고 네트워크 심사/계정/정책 준비 기준 정리 | Draft-Skeleton | 2026-03-02 |
| 08 | [08-ad-integration-rollout.md](./08-ad-integration-rollout.md) | 광고 삽입 롤아웃/롤백/가드레일 기준 수립 | Draft-Skeleton | 2026-03-02 |
| 09 | [09-follow-up-roadmap.md](./09-follow-up-roadmap.md) | 추가 작업 백로그 및 우선순위 프레임 정의 | Draft-Skeleton | 2026-03-02 |

## 템플릿

- 공통 작성 템플릿: [_phase-template.md](./_phase-template.md)


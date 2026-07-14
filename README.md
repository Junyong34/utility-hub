# utility-hub

`utility-hub`는 [Zento](https://www.zento.kr)의 Next.js App Router 저장소입니다. 한국어 블로그, 생활·금융 도구, SEO·OG·분석 인프라를 함께 운영하며 육아 중심 리브랜딩을 점진적으로 진행합니다.

## 시작하기

요구 사항:

- Node.js 22 이상
- pnpm

```bash
pnpm install
pnpm dev
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 주요 명령

```bash
pnpm format:check
pnpm type-check
pnpm lint:check
pnpm test:architecture
pnpm test:contracts
pnpm test:integration
pnpm test:e2e
pnpm build
```

실제 외부 사이트를 확인하는 테스트는 기본 E2E와 분리해 명시적으로 실행합니다.

```bash
RUN_LIVE_TESTS=1 pnpm test:places:links
```

## 코드 찾기

| 변경 대상             | 첫 진입점                                  | 구현 소유 위치                           |
| --------------------- | ------------------------------------------ | ---------------------------------------- |
| 공개 페이지와 API     | `app/**`                                   | `modules/<domain>/**`로 점진 이관        |
| 공통 UI·계약·adapter  | 해당 module entry                          | `shared/**`                              |
| 환경 변수·런타임 설정 | 루트 설정 adapter                          | `config/**`                              |
| 블로그 원문           | `content/posts/**`                         | `lib/blog/**`에서 module로 점진 이관     |
| 장소·혜택 원천 데이터 | `content/places/**`, `content/benefits/**` | 대응 domain module                       |
| 테스트                | source 인접 또는 `tests/**`                | unit, integration, E2E, live 목적별 위치 |
| 문서                  | [문서 인덱스](docs/README.md)              | `docs/<purpose>/**`                      |

현재 구조와 목표 모듈을 연결할 때는 [프로젝트 맵](docs/architecture/project-map.md)을 먼저 보고, import 가능 범위는 [모듈 경계](docs/architecture/module-boundaries.md)를 따릅니다.

## 핵심 기준 문서

- [문서 인덱스](docs/README.md)
- [프로젝트 맵](docs/architecture/project-map.md)
- [모듈 경계](docs/architecture/module-boundaries.md)
- [공개 계약 매트릭스](docs/architecture/public-contract-matrix.md)
- [마이그레이션 원장](docs/architecture/migration-ledger.md)
- [문서 이동 맵](docs/architecture/document-migration-map.md)
- [육아형 리브랜딩 기준 스펙](docs/specs/2026-04-06-parenting-guide-rebrand-design.md)
- [모듈 작성 규칙](modules/README.md)
- [공통 코드 승격 규칙](shared/README.md)

## 문서와 테스트 배치

문서는 목적에 따라 `docs/architecture`, `docs/specs`, `docs/plans`, `docs/implementation`, `docs/testing`, `docs/operations`, `docs/research`, `docs/reference`, `docs/archive`에 둡니다. 라우트 디렉터리에는 런타임 코드와 범위 지침인 `AGENTS.md`만 둡니다.

순수 단위 테스트는 소스 옆에 두고, 파일시스템·외부 경계는 `tests/integration`, 사용자 여정은 `tests/e2e`, 실제 네트워크 의존 검사는 `tests/live`에서 관리합니다.

## 변경 전 확인

- 공개 URL, 도구 ID, 콘텐츠 경로, SEO·OG·RSS·sitemap 계약을 유지합니다.
- 새 도메인 코드는 `modules/<domain>`의 명시적 `public.ts`, `ui.ts`, `client.ts`, `server.ts` 중 필요한 진입점만 노출합니다.
- 기존 `components/**`, `lib/**`, `hooks/**`, `types/**`는 관련 기능을 수정할 때 회귀 증거와 함께 점진적으로 이관합니다.
- 리브랜딩 작업 전에는 기준 스펙과 해당 `docs/plans/**` 실행 계획을 확인합니다.
- 세부 작업 규칙과 검증 순서는 [AGENTS.md](AGENTS.md)를 따릅니다.

## 결론

수정 위치를 찾을 때는 `app`의 공개 진입점에서 대응 도메인으로 이동하고, 설계·계획·구현·테스트 문서는 [문서 인덱스](docs/README.md)에서 목적별로 찾습니다.

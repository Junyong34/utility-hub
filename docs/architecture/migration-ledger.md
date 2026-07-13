# 모듈 이관 ledger

이 문서는 legacy 경로에서 도메인 모듈로 이동하는 compatibility seam과 정적 import 검색이 놓치는 소비자를 추적한다. 문서 자체의 진행 상태가 아니라 **각 migration row의 코드 상태**만 기록한다.

## 상태 정의

| 상태               | 의미                                                           |
| ------------------ | -------------------------------------------------------------- |
| `inventory`        | legacy 소유자와 소비자를 조사했으며 새 구현/facade는 아직 없음 |
| `facade-planned`   | 목표 인터페이스와 임시 legacy facade가 합의됐으나 아직 구현 전 |
| `migrating`        | 새 module 구현 또는 파일 이동이 진행 중                        |
| `consumer-cutover` | 구현은 새 module에 있고 기존 소비자를 공개 entry로 전환 중     |
| `ready-to-remove`  | 정적·동적·문자열 소비자가 0이고 관련 test/build가 통과함       |
| `closed`           | facade/legacy 경로를 제거하고 검증까지 완료함                  |
| `blocked`          | 계약 불일치나 외부 결정 때문에 제거할 수 없음. 근거 필수       |

상태를 바꿀 때는 근거가 되는 test, `rg`, build 또는 수동 script 결과를 같은 row의 근거 칸에 추가한다.

## 주요 legacy → module 이관

계획 단위(U2 등)는 `docs/plans/2026-07-13-001-refactor-domain-module-structure-plan.md`의 ID를 따른다.

| ID     | Legacy owner                                                                                                                                       | 목표 module / 외부 인터페이스                                                | 임시 facade 방향                                                       | 도입 / 제거 단위      | 상태        | 제거 조건과 근거                                                                                          |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| MIG-01 | `components/ui/**`, `components/magicui/**`, `lib/utils.ts`, `lib/clipboard.ts`                                                                    | `shared/ui/**`, `shared/client/clipboard.ts`                                 | 필요한 기존 파일만 old → shared named re-export                        | U2 / U10              | `inventory` | `@/components/ui`, magicui dynamic import, `@/lib/utils`, clipboard 소비자 0; shadcn alias·build 확인     |
| MIG-02 | `lib/seo/metadata.ts`의 site/env, analytics/finance의 직접 env                                                                                     | `config/site.ts`, `config/env/*.server.ts`, `config/runtime/server.ts`       | 없음. 호출자를 config interface로 직접 전환                            | U2 / U10              | `inventory` | runtime 코드의 config 밖 `process.env` 0; GA4 unavailable와 finance runtime fallback 동일                 |
| MIG-03 | `components/home/**`, `lib/home/**`, `types/home.ts`                                                                                               | `modules/home/{public,ui,server}.ts`                                         | `lib/home/**`·필요 UI entry old → module                               | U7 / U10              | `inventory` | `/` 렌더·metadata와 places promotion DTO 동일, legacy 소비자 0                                            |
| MIG-04 | `components/tools/moving-budget-checklist/**`, `lib/tools/moving-budget-checklist/**`                                                              | `modules/tools/moving-budget-checklist/{public,client,ui}.ts`                | 기존 두 경로 old → module                                              | U4 / U10              | `inventory` | `/tools/home-check` query key/default, noindex, 계산 결과 동일; legacy 소비자 0                           |
| MIG-05 | `lib/tools/tool-config.ts`, `tool-metadata.ts`, `tool-structured-data.ts`, `tool-breadcrumb.ts`, `tool-icons.ts`, `types.ts`, `lib/tools/index.ts` | `modules/tools/catalog/{public,ui,server}.ts`                                | `lib/tools/*` old → catalog의 명시적 entry                             | U5 / U10              | `inventory` | tool ID/순서/SEO/FAQ/HowTo/sitemap fixture 동일; `lib/tools/index.ts` broad barrel 제거                   |
| MIG-06 | loan/DSR/savings/home-buying의 `components/tools/**`, `lib/tools/**`                                                                               | 각각 `modules/tools/<tool-id>/{public,client,ui}.ts`                         | tool별 old → module                                                    | U5 / U10              | `inventory` | 계산·query/default·공유 URL·E2E 동일, 각 legacy import 0                                                  |
| MIG-07 | `components/tools/last-digit-game/**`, `lib/tools/last-digit-game.ts`                                                                              | `modules/tools/last-digit-game/{public,client,ui}.ts`                        | old → module                                                           | U6 / U10              | `inventory` | 게임 결과/상태 흐름과 tool SEO 동일, legacy import 0                                                      |
| MIG-08 | `components/tools/pomodoro/**`, `lib/tools/pomodoro/**`                                                                                            | `modules/tools/pomodoro/{public,client,ui}.ts`                               | old → module                                                           | U6 / U10              | `inventory` | timer engine, storage key/version, audio/fullscreen/theme 동작 동일; legacy import 0                      |
| MIG-09 | `components/lotto/**`, `lib/lotto/**`, `hooks/useLotto.ts`                                                                                         | `modules/tools/lotto/{public,client,ui,server}.ts`                           | old → module                                                           | U6 / U10              | `inventory` | query/storage/회차 JSON/추천 결과/round routes 동일; dynamic import와 update script 전환 완료             |
| MIG-10 | `components/tools/og-image-studio/**`와 route-local studio logic                                                                                   | `modules/tools/og-image-studio/{client,ui,server}.ts`                        | 필요한 old UI만 old → module                                           | U6 / U10              | `inventory` | studio mode/default/preview URL 동일, route는 query adapter만 소유                                        |
| MIG-11 | `components/places/**`, `lib/places/**`, `types/place-source.ts`                                                                                   | `modules/places/{public,client,ui,server}.ts`                                | `lib/places/*`, 필요한 UI old → module                                 | U7 / U10              | `inventory` | `/places` page/API DTO/query/canonical/sitemap와 257개 원천 ID·정렬·발행 상태 동일; thumbnail script 전환 |
| MIG-12 | `components/benefits/**`, `lib/benefits/**`, `types/benefit-source.ts`                                                                             | `modules/benefits/{public,ui,server}.ts`                                     | old → module                                                           | U7 / U10              | `inventory` | `/benefits`, 공식 source/검증 상태/카드 DTO 동일; legacy import 0                                         |
| MIG-13 | `components/blog/**`, `lib/blog/**`                                                                                                                | `modules/blog/{public,ui,server}.ts`                                         | `lib/blog/*`, 필요한 UI old → module                                   | U8 / U10              | `inventory` | category/post URL, markdown output, API DTO, RSS/sitemap 동일; cwd content loader와 tests 전환            |
| MIG-14 | `components/finance/**`, `lib/finance/**`                                                                                                          | `modules/finance/{public,client,ui,server}.ts`                               | 기존 `lib/finance/index.ts`, `server.ts` old → explicit module entries | U9 / U10              | `inventory` | noindex, query/default, dataset checksum, atomic write, backup/fallback, local draft key, E2E 동일        |
| MIG-15 | `components/seo/**`, `lib/seo/**`, `types/seo.ts`                                                                                                  | `modules/seo/{public,ui,server}.ts`                                          | `lib/seo/*`, 필요한 UI old → module                                    | U10 / U10             | `inventory` | canonical/robots/OG/JSON-LD/sitemap contract 동일; OG filesystem asset 확인 후 broad barrel 제거          |
| MIG-16 | `lib/analytics/**`, `hooks/useVisitorStats.ts`                                                                                                     | `modules/analytics/{public,client,server}.ts`                                | old → module                                                           | U10 / U10             | `inventory` | Node/force-dynamic, 200/503 shape, fresh/stale cache, header와 secret 격리 동일                           |
| MIG-17 | `components/layout/**`, `app/providers.tsx`, root layout 조합                                                                                      | `modules/site-shell/{public,client,ui}.ts`, `shared/contracts/navigation.ts` | 기존 layout UI old → module                                            | U10 / U10             | `inventory` | nav 링크/Provider/GA/AdSense/font/viewport/global JSON-LD 동일; Next export는 app에 유지                  |
| MIG-18 | root `types/navigation.ts` 및 도메인별 `types/*.ts`, root `hooks/*.ts`                                                                             | 대응 module `public.ts` 또는 `shared/contracts`                              | 도메인별 old → 새 named export                                         | 해당 owner 단위 / U10 | `inventory` | root type/hook 소비자 0; 의미가 다른 타입을 shared로 합치지 않음                                          |

Facade는 새 구현을 가리키는 단방향 compatibility adapter다. 새 module이 legacy 구현을 import하는 역방향 facade는 허용하지 않는다.

## 정적 분석 밖 소비자

| ID     | 소비자 / 실제 경로 계약                                                                                                                                                    | 이동 시 위험                                                        | 목표 확인 지점                                                                     | 상태        | 종료 증거                                                                                      |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------- |
| MAN-01 | `scripts/places-thumbnails.mjs`: `process.cwd()`, `content/places/index.ts`의 timestamp file URL dynamic import, region source 문자열, manifest, `public/images/places/**` | TypeScript import 변경만으로 script가 깨짐; source text를 직접 수정 | Places 이관 후 script의 source/data 경로와 `seed/capture/apply/verify`를 함께 갱신 | `inventory` | script test + fixture temp dir + 실제 `verify`; 기존 place ID/output path 동일                 |
| MAN-02 | `components/lotto/LottoRecommend/LottoNumberCloud.tsx`: `import('@/components/magicui/icon-cloud')`                                                                        | 일반 static import 검색에서 누락; chunk path가 런타임에 실패        | `@/shared/ui/icon-cloud` 또는 Lotto client entry로 dynamic import 변경             | `inventory` | old 문자열 0, production build, Lotto 화면 lazy chunk 확인                                     |
| MAN-03 | `scripts/update-lotto-draws.js`: script-relative `../lib/lotto/lotto_draws.json`; `lib/lotto/round-data.ts` JSON import                                                    | JSON만 옮기면 유지보수 script가 legacy 경로에 씀                    | Lotto module data 위치를 한 번에 갱신하거나 JSON 위치를 유지하는 명시적 결정       | `inventory` | `pnpm update-lotto` dry/safe 검증, JSON shape/checksum, old path 문자열 0                      |
| MAN-04 | `lib/blog/posts.ts`: `process.cwd()/content/posts`와 recursive filesystem read                                                                                             | loader 이동 시 cwd/data root가 바뀌었다고 가정하기 쉬움             | `content/posts` 위치는 유지하고 blog server adapter만 이동                         | `inventory` | build에서 모든 post/category 수와 URL fixture 동일; RSS/sitemap 동일                           |
| MAN-05 | `lib/finance/repository.ts`: cwd `data/private/finance-snapshots*.json`, Netlify `/tmp/finance-snapshots.json`, NETLIFY/AWS env                                            | private 원천 수정, runtime path나 fallback 상실 위험                | finance server adapter + config/runtime                                            | `inventory` | temp filesystem integration, production file checksum, Netlify path characterization           |
| MAN-06 | `lib/seo/og-renderer.tsx`: cwd의 Noto Sans KR font 2개, mascot PNG, 임의 `/public/...` image를 base64 read                                                                 | 빌드 성공해도 runtime OG에서 font/image만 실패할 수 있음            | SEO server adapter. `public` asset 위치/URL은 유지                                 | `inventory` | 세 OG endpoint 200/404/cache/size 확인, font/mascot 존재 검사, representative local image 렌더 |
| MAN-07 | `scripts/generate-section-og-images.mjs`: cwd `public/og-images`, `public/fonts/og`                                                                                        | 정적 section OG 생성 위치가 metadata 경로와 어긋날 수 있음          | script 위치는 유지하되 config/site와 asset contract를 참조                         | `inventory` | 생성 파일명 5종과 metadata의 `SECTION_OG_IMAGES` 일치, image dimension 확인                    |
| MAN-08 | content/tool config/UI의 `/images/**`, `/og-images/**`, `/asset/**` 문자열                                                                                                 | import graph에 나타나지 않는 공개 URL 회귀                          | `public` 위치는 유지, URL fixture로 추적                                           | `inventory` | public 파일 존재 검사 + build + 대표 page/OG smoke                                             |
| MAN-09 | `content/places/**`, `content/benefits/**`의 상대 `import type`                                                                                                            | root type 이동 시 콘텐츠 TS가 끊김                                  | 대응 module `public.ts`의 환경 중립 type-only import                               | `inventory` | content contract tests와 type-check, runtime import 생성 없음                                  |
| MAN-10 | source-adjacent `*.test.mjs`의 `await import('./*.ts')`, SEO test의 `../places/**` deep path                                                                               | 구현 이동 후 테스트가 facade만 검증하거나 private path에 고착       | 새 module 외부 인터페이스를 검증하도록 같은 이동 단위에서 교체                     | `inventory` | legacy dynamic path 문자열 0; 테스트가 공개 seam을 호출                                        |
| MAN-11 | `app/layout.tsx`의 `../public/fonts/**` localFont 문자열                                                                                                                   | site-shell UI 이동 시 상대 경로 기준이 달라질 수 있음               | font 선언은 `app/layout.tsx` adapter에 유지하거나 경로를 실제 파일 기준으로 재검증 | `inventory` | production build 및 font request 200                                                           |
| MAN-12 | package scripts와 Playwright config가 현재 test/script 경로를 문자열로 참조                                                                                                | 파일만 이동하면 CI/maintenance command가 조용히 누락                | 각 이관 unit에서 `package.json`, Playwright config, CI workflow를 재조사           | `inventory` | `pnpm` script 목록과 Playwright `--list`, CI command path 확인                                 |

## 상태 변경 절차

1. row owner가 공개 계약 baseline과 관련 기존 테스트를 확인한다.
2. 새 module 구현과 explicit entry를 만들고 상태를 `migrating`으로 바꾼다.
3. 필요한 legacy facade는 old → new named re-export로만 만들고 생성 단위를 기록한다.
4. 호출자를 새 entry로 전환하며 상태를 `consumer-cutover`으로 바꾼다.
5. 다음 검색을 모두 수행한다.
   - static import와 re-export
   - `import(...)`
   - `process.cwd()`, `fileURLToPath`, `pathToFileURL`, `new URL(import.meta.url)`
   - `content/`, `data/`, `public/`, legacy 경로 문자열
   - package scripts, Playwright/CI config, 문서 링크
6. 소비자 0건과 관련 test/build/manual script 성공을 근거에 남기고 `ready-to-remove`로 바꾼다.
7. facade와 확인된 고아 파일을 제거한 뒤 같은 검증을 다시 실행하고 `closed`로 바꾼다.

고아 후보는 import 0건만으로 삭제하지 않는다. dynamic/manual 소비자, runtime asset, framework file convention을 확인한 증거가 있어야 한다.

## 완료 조건

- 모든 MIG/MAN row가 `closed`이거나, 유지가 제품 계약인 항목은 새 canonical row로 대체되고 이유가 남아 있다.
- compatibility facade가 0개다.
- 새 코드의 legacy import, module deep import, broad `export *`가 0개다.
- [공개 계약 매트릭스](./public-contract-matrix.md)의 URL/API/SEO/storage/data 계약이 최종 gate에서 동일하다.

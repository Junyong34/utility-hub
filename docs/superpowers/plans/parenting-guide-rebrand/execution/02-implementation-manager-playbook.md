# Implementation Manager Playbook

## 목표

리브랜딩 구현을 한 번에 길게 밀지 않고, `작은 단위로 지시 -> 결과 확인 -> 다음 단위 승인` 방식으로 운영하기 위한 매니저 문서다.

이 문서는 구현자가 아니라 `진행을 관리하는 사람` 관점에서 쓴다.

## 이 문서가 해결하는 문제

당장 모든 구현을 한 번에 시키면 아래 문제가 생긴다.

1. 작업이 길어져 중간 맥락이 흐려진다.
2. 중간에 방향이 틀어져도 늦게 발견한다.
3. 리뷰 포인트가 커져서 확인이 어려워진다.
4. `어디까지 했는지`와 `다음에 뭘 시킬지`가 흐려진다.

그래서 이 리브랜딩은 반드시 `승인 게이트`를 둔다.

## 운영 원칙

1. 한 번에 한 Phase만 시킨다.
2. 한 번에 한 메뉴 또는 한 기반 작업만 시킨다.
3. 각 단계는 `완료 조건`이 있어야 다음 단계로 간다.
4. 당신이 확인하기 전에는 다음 Phase로 넘어가지 않는다.

## 문서 역할 구분

### 1. 기준 스펙

- `docs/superpowers/specs/2026-04-06-parenting-guide-rebrand-design.md`

무엇을 만들지 정한다.

### 2. 실행 마스터 플랜

- `docs/superpowers/plans/parenting-guide-rebrand/execution/00-phase-a-master-implementation-plan.md`

전체 구현 순서를 정한다.

### 3. 시작 체크리스트

- `docs/superpowers/plans/parenting-guide-rebrand/execution/01-start-here-checklist.md`

실제 첫 작업 순서를 잡는다.

### 4. 메뉴/기능별 실행 문서

- `11-places-implementation-plan.md`
- `12-tools-implementation-plan.md`
- `13-benefits-implementation-plan.md`
- `14-blog-implementation-plan.md`
- `22-og-image-rebrand-implementation-plan.md`
- `23-ga-event-implementation-plan.md`

실제 구현 지시 단위다.

## 추천 운영 방식

### Stage 0. 기반 잠그기

이 단계는 아직 화면보다 데이터와 규칙을 고정하는 단계다.

다룰 문서:

- `20-source-ingestion-and-verification-plan.md`
- `21-calculator-framework-implementation-plan.md`
- `01-start-here-checklist.md`

구현 지시 단위:

1. `place seed` 스키마 만들기
2. `types/place-source.ts` 만들기
3. `content/places/README.md` 만들기

승인 체크:

- place seed 구조가 이해되는가?
- 블로그와 places의 소스 오브 트루스가 분명한가?

완료 조건:

- `place seed` 구조가 문서와 코드에 반영됨
- 이후 `/places` 구현이 이 구조를 바로 참조 가능

### Stage 1. Places 허브 최소 버전

이 단계는 리브랜딩의 핵심 wedge를 여는 단계다.

다룰 문서:

- `11-places-implementation-plan.md`

구현 지시 단위:

1. `/places` 메인 허브
2. `/places/seoul`
3. `content/places/seoul/*.json` 시드 3~5건

승인 체크:

- `/places` 구조가 원하는 방향인가?
- 카드와 지역 흐름이 자연스러운가?

완료 조건:

- `/places` 허브 진입 가능
- 서울 공공형 카드 최소 3건 노출

### Stage 2. 홈 연결

이 단계는 홈이 진짜 리브랜딩된 제품처럼 보이게 만드는 단계다.

다룰 문서:

- `10-home-implementation-plan.md`

구현 지시 단위:

1. 홈 히어로 교체
2. `/places` 바로가기 연결
3. 도구/혜택 카드 연결

승인 체크:

- 홈이 `장소 -> 도구 -> 혜택` 순서를 잘 보여주는가?
- 기존 사이트보다 리브랜딩 방향이 더 분명해졌는가?

완료 조건:

- 홈에서 `/places` 진입이 명확함
- 리브랜딩 메시지가 첫 화면에 반영됨

### Stage 3. 첫 핵심 도구 2개

이 단계는 `읽고 끝나는 사이트`가 아니라는 걸 증명하는 단계다.

다룰 문서:

- `12-tools-implementation-plan.md`
- `21-calculator-framework-implementation-plan.md`

구현 지시 단위:

1. 연령/개월수 계산기
2. 가족 나들이 예산 계산기

승인 체크:

- 계산기가 장소 허브와 실제로 연결되는가?
- 결과 화면이 다음 행동을 잘 유도하는가?

완료 조건:

- 도구 2개 공개
- 장소 글/혜택 글과 CTA 연결 존재

### Stage 4. 혜택 허브 최소 버전

다룰 문서:

- `13-benefits-implementation-plan.md`

구현 지시 단위:

1. `/benefits` 허브
2. 대표 글 2~3개 연결

승인 체크:

- 혜택 허브가 공지 게시판처럼 안 보이는가?

완료 조건:

- `/benefits` 진입 가능
- 도구/장소와 연결됨

### Stage 5. 블로그 재정렬

다룰 문서:

- `14-blog-implementation-plan.md`

구현 지시 단위:

1. 블로그 히어로/카테고리 정리
2. 육아형 카테고리 반영

승인 체크:

- 기존 블로그에서 육아형 구조가 읽히는가?

완료 조건:

- `/blog`가 places 허브와 충돌하지 않음

### Stage 6. 부가 개선

다룰 문서:

- `22-og-image-rebrand-implementation-plan.md`
- `23-ga-event-implementation-plan.md`

구현 지시 단위:

1. OG 리브랜딩
2. GA 핵심 이벤트 추적

승인 체크:

- 썸네일이 육아형 브랜드처럼 보이는가?
- 분석 이벤트가 버튼 흐름을 설명할 수 있는가?

완료 조건:

- OG 썸네일 반영
- 핵심 버튼 이벤트 수집 가능

## 가장 추천하는 실제 지시 순서

가장 안전한 순서는 아래다.

1. Stage 0
2. Stage 1
3. Stage 2
4. Stage 3
5. Stage 4
6. Stage 5
7. Stage 6

## 당신이 작업을 시킬 때 쓰기 좋은 문장

### 예시 1, places부터

`Stage 1만 진행해줘. 11-places-implementation-plan.md 기준으로 /places 메인 허브와 /places/seoul, 서울 공공형 시드 3건까지만 구현해줘. 끝나면 다음 단계는 하지 말고 확인 요청해줘.`

### 예시 2, 홈 연결만

`Stage 2만 진행해줘. 10-home-implementation-plan.md 기준으로 홈 히어로와 /places 연결만 구현해줘. 다른 문서는 건드리지 말고 확인받아.`

### 예시 3, 도구 2개만

`Stage 3만 진행해줘. 연령/개월수 계산기와 가족 나들이 예산 계산기만 구현하고, 결과 CTA까지 붙여줘. 나머지 도구는 건드리지 말아줘.`

## 진행 관리 템플릿

아래 형식으로 진행 상태를 관리하면 된다.

```text
Current Stage:
- Stage 1 / Places 허브 최소 버전

In Scope This Round:
- /places 메인 허브
- /places/seoul
- 서울 공공형 시드 3건

Do Not Touch:
- tools 구현
- benefits 허브
- blog 재정렬

Approval Gate:
- /places 구조 확인
- 카드/카피 확인

Next Candidate Stage:
- Stage 2 / 홈 연결
```

## 매니저 관점 체크리스트

작업 지시 전:

- [ ] 이번 라운드의 Stage를 하나만 정했는가?
- [ ] 이번 라운드에서 건드릴 문서를 하나 또는 두 개로 제한했는가?
- [ ] 승인 게이트가 무엇인지 정했는가?

작업 완료 후:

- [ ] 결과가 문서 범위를 넘지 않았는가?
- [ ] 다음 Stage로 넘어가기 전 승인했는가?
- [ ] 필요한 경우 체크리스트/문서 완료 표시를 갱신했는가?

## 결론

완전한 `매니저 구현 문서`는 이전엔 없었고, 지금 이 문서가 그 역할을 한다.

리브랜딩 작업은 이 문서를 기준으로 `한 Stage씩` 시키는 게 가장 안전하다.

# Start Here Checklist

## 목표

리브랜딩 구현을 실제로 어디서 시작해야 하는지 한 번에 보이게 만든다.

## 시작 순서, 결론 먼저

가장 먼저 시작할 일은 `홈 디자인`이 아니다.

가장 먼저 해야 할 일은 아래 두 가지다.

1. 장소/시설 데이터 스키마와 검증 규칙 고정
2. 서울 공공형 + 경기 남부 상업형 시드 데이터 20~30건 확보

이 두 가지가 없으면 `/places`, 홈, 블로그 카테고리, 도구 연결이 전부 공중에 뜬다.

## 왜 여기서 시작해야 하나

1. 이 리브랜딩의 핵심 허브는 `아이와 가볼 곳`이다.
2. 허브의 가치는 결국 장소 데이터와 카드 품질에서 나온다.
3. 홈, 도구, 혜택 허브는 모두 이 데이터를 참조하게 된다.

## 추천 시작 순서

### Phase 0. 문서와 스키마 잠그기

- [ ] `07-data-sourcing-and-trust-model.md` 읽기
- [ ] `08-calculator-design-and-visualization.md` 읽기
- [ ] 장소 카드 최소 필드 정의
- [ ] 검증 상태 enum 정의
- [ ] 육아형 블로그 메타 필드 초안 정의

### Phase 1. 시드 데이터 만들기

- [ ] 서울 공공형 10~15건 시드 입력
- [ ] 경기 남부 상업형 10~15건 시드 입력
- [ ] 공급 유형별로 검증 전략 분리
- [ ] 각 항목에 공식 확인 링크와 검증일 입력

### Phase 2. 장소 허브 뼈대 만들기

- [ ] `/places` 페이지 추가
- [ ] `/places/seoul`
- [ ] `/places/gyeonggi-south`
- [ ] 지역 카드 UI 추가
- [ ] 대표 글/대표 카드 노출

### Phase 3. 홈을 새 구조로 바꾸기

- [ ] 홈 히어로 교체
- [ ] 지역/상황 바로가기 추가
- [ ] 도구/혜택 카드 추가
- [ ] 기존 블로그/도구 데이터와 연결

### Phase 4. 첫 계산기 2개 만들기

- [ ] 연령/개월수 계산기
- [ ] 가족 나들이 예산 계산기
- [ ] 결과 CTA로 장소/혜택 글 연결
- [ ] 차트는 예산 계산기에만 우선 적용

### Phase 4-bis. 핵심 wedge 도구 확장

- [ ] 키즈카페·체험 월예산 계산기
- [ ] 지역 혜택 자가진단 도구
- [ ] 장소 허브와 혜택 허브 양쪽에서 진입 연결

### Phase 5. 혜택 허브와 블로그 정리

- [ ] `/benefits` 허브 추가
- [ ] 블로그 카테고리 재정리
- [ ] 혜택 글 템플릿 적용

## 구현 시작 체크리스트

### 코드 작업 시작 전

- [ ] `docs/superpowers/specs/2026-04-06-parenting-guide-rebrand-design.md`
- [ ] `docs/superpowers/specs/parenting-guide-rebrand/07-data-sourcing-and-trust-model.md`
- [ ] `docs/superpowers/specs/parenting-guide-rebrand/08-calculator-design-and-visualization.md`
- [ ] `docs/superpowers/plans/parenting-guide-rebrand/execution/00-phase-a-master-implementation-plan.md`

### 첫 코드 작업으로 권장하는 파일

- [ ] `types/place-source.ts`
- [ ] `content/places/README.md`
- [ ] `content/places/seoul/*.json`
- [ ] `lib/places/region-config.ts`
- [ ] `lib/places/place-content.ts`
- [ ] `lib/blog/types.ts`
- [ ] `app/places/page.tsx`

이 파일/경로들이 초기 구조의 기준점이다.

## 첫 주 목표

- [ ] 장소 스키마 고정
- [ ] 수도권 시드 20건 입력
- [ ] `/places` 메인 허브 초안 렌더링
- [ ] 홈에서 `/places` 진입 링크 반영

## 첫 번째 릴리스 기준

다음이 되면 Phase A 첫 공개 최소 조건으로 본다.

- [ ] `/places` 허브 동작
- [ ] 홈 리브랜딩 1차 반영
- [ ] 첫 계산기 1개 공개
- [ ] 혜택 허브 기본 구조 공개
- [ ] 블로그 카테고리 육아형 전환 시작

## 하지 말아야 할 시작 방식

- [ ] 전국 지역 구조부터 열기
- [ ] 크롤러부터 만들기
- [ ] 차트 라이브러리부터 만지기
- [ ] 도구를 5개 이상 한 번에 만들기
- [ ] 기존 도구/글 삭제부터 하기

## 실무적으로 가장 좋은 시작점

가장 좋은 시작점은 `서울 공공형 + 경기 남부 상업형 시드 데이터 + /places 허브 초안`이다.

그 다음이 홈이다.

그 다음이 첫 계산기다.

간단한 결론:

이 리브랜딩은 `화면`보다 `데이터 구조`에서 시작해야 한다.

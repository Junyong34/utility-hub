# OG Asset Sourcing And Mascot Strategy

## 목표

OG 이미지에 들어갈 캐릭터/일러스트를 저작권 위험 없이 확보하는 전략을 정한다.

## 권장 방향, 결론 먼저

가장 추천하는 방식은 `브랜드 전용 오리지널 마스코트 1종을 새로 생성하고, 보조 일러스트는 필요할 때만 외부 무료 소스를 쓰는 것`이다.

이 방식이 좋은 이유:

1. 브랜드 일관성이 좋다.
2. 라이선스 해석 문제가 적다.
3. OG 썸네일에 반복 사용해도 정체성이 생긴다.

## 마스코트 전략

### 캐릭터 타입 추천

`인간 아이`보다 `동물형 마스코트`를 추천한다.

이유:

1. 성별/인종 해석 이슈가 적다.
2. 친근하고 반복 사용하기 쉽다.
3. 표정/포즈 변형이 쉽다.

추천 타입:

- 토끼
- 곰
- 병아리

가장 무난한 추천:

- `둥글고 밝은 토끼 마스코트`

## 마스코트 디자인 가이드

필수 조건:

- 원형/둥근 실루엣
- 단색 눈/단순 표정
- 3~4색 이내
- 선명한 외곽
- 작은 썸네일에서도 인식 가능

금지 조건:

- 특정 유명 캐릭터 연상
- 디즈니/산리오 계열 실루엣 모사
- 너무 세밀한 머리카락/의상 디테일
- 사람 얼굴 실사풍

## 마스코트 제작 방식

### Option A, AI 생성 후 수작업 정리

가장 추천한다.

워크플로우:

1. AI로 기본 콘셉트 생성
2. 가장 좋은 안 1개 선택
3. 벡터 또는 깨끗한 PNG로 정리
4. 포즈 3종 파생

권장 포즈:

- 기본 서기
- 손 흔들기
- 책/연필/별/구름 소품 들기

### Option B, 외부 무료 일러스트 사용

브랜드 메인 마스코트에는 비추천이다.

이유:

- 다른 서비스와 겹칠 가능성
- 라이선스/출처 표기 정책이 복잡할 수 있음

다만 초기 임시안으로는 가능하다.

## 외부 이미지 소스 전략

### 1. unDraw

공식 라이선스 기준, 개인/상업 프로젝트에 무료 사용 가능하고 출처 표기가 필수는 아니다. 다만 일러스트를 재배포하거나 서비스 중심 자산처럼 쓰는 건 피해야 한다.  
출처: [unDraw License](https://undraw.co/license)

추천 사용처:

- 초기 무드보드
- 임시 플레이스홀더
- 브랜드 메인 마스코트가 아닌 보조 일러스트

### 2. Openverse

오픈 라이선스 미디어 검색 엔진이다. 다만 Openverse 자체가 사용 권리를 대신 보증하지 않으므로, 개별 자산의 라이선스를 따로 검증해야 한다.  
출처: [Openverse Terms](https://docs.openverse.org/terms_of_service.html), [Made with Openverse](https://docs.openverse.org/api/reference/made_with_ov.html)

추천 사용처:

- 블로그용 보조 사진 탐색
- 공공 시설 관련 보조 이미지 탐색

비추천 사용처:

- 브랜드 핵심 마스코트

### 3. OpenMoji

자유 사용은 가능하지만 `CC BY-SA 4.0`이라 출처 표기와 동일 라이선스 고려가 필요하다.  
출처: [OpenMoji FAQ](https://openmoji.org/faq), [OpenMoji](https://openmoji.org/)

추천 사용처:

- 아이콘성 장식
- 내부 목업

비추천 사용처:

- 메인 브랜드 마스코트

### 4. Storyset

현재 확인한 약관 기준으로 무료 사용은 출처 표기 조건이 있고, 사용 조건이 더 복잡하다.  
출처: [Storyset Terms](https://storyset.com/terms)

추천 사용처:

- 빠른 시안 확인용

비추천 사용처:

- 장기 운영용 브랜드 기본 자산

## 저장 전략

권장 폴더 구조:

- `public/og-images/brand/backgrounds/`
- `public/og-images/brand/mascot/`
- `public/og-images/brand/patterns/`
- `public/og-images/brand/examples/`

권장 파일:

- `mascot-default.png`
- `mascot-wave.png`
- `mascot-study.png`
- `pattern-clouds.png`
- `pattern-blocks.png`

## 생성 자산 운영 규칙

1. 생성 프롬프트를 문서화한다.
2. 최종 채택된 원본과 리터치본을 같이 보관한다.
3. 브랜드 자산은 별도 changelog를 둔다.

## 이미지 생성 프롬프트 방향

프롬프트 핵심 키워드:

- warm
- playful
- clean vector-like
- rounded shapes
- pastel palette
- child-friendly
- mascot
- no copyrighted character resemblance

피해야 할 키워드:

- disney style
- pixar style
- sanrio style
- ghibli style
- specific franchise names

## 최종 추천 조합

1. 브랜드 메인 캐릭터는 AI로 새로 만든다.
2. 초기 임시 배경/보조 일러스트는 unDraw를 쓴다.
3. Openverse는 블로그/콘텐츠 보조 이미지 탐색용으로만 쓴다.
4. Storyset과 OpenMoji는 메인 브랜드 자산보다는 임시/보조용으로 제한한다.

## 신뢰도 메모

라이선스 정보는 각 서비스의 공식 페이지와 약관을 기준으로 정리했다.  
다만 서비스 약관은 바뀔 수 있으므로 실제 자산 채택 직전에 한 번 더 확인해야 한다. 이 부분은 정확하지 않을 수 있다.

## Brief Conclusion

가장 안전하고 브랜드에도 좋은 길은 `자체 마스코트 생성 + 외부 무료 자산은 보조용`이다.

# OG Asset Production Checklist

## 목표

브랜드 마스코트와 보조 OG 자산을 저작권 위험 없이 제작하고 저장하는 체크리스트다.

## 권장 제작 순서

### Phase 1. 콘셉트 고정

- [ ] 마스코트 타입 결정, 토끼/곰/병아리/공룡 중 하나
- [ ] 표정 톤 결정, 밝음/차분함/집중형
- [ ] 브랜드 색상 3~4개 확정
- [ ] 메인 포즈 1개, 보조 포즈 2개 정의

### Phase 2. 생성 가이드

- [ ] AI 생성 프롬프트 작성
- [ ] 금지 스타일 명시, 특정 IP/작가명 금지
- [ ] 벡터풍, 단순 실루엣, 둥근 형태 요구
- [ ] 투명 배경 버전 기준 정의

### Phase 3. 자산 정리

- [ ] `public/og-images/brand/mascot/mascot-default.png`
- [ ] `public/og-images/brand/mascot/mascot-wave.png`
- [ ] `public/og-images/brand/mascot/mascot-study.png`
- [ ] `public/og-images/brand/patterns/pattern-clouds.png`
- [ ] `public/og-images/brand/patterns/pattern-blocks.png`

### Phase 4. 라이선스 기록

- [ ] 생성형 자산이면 원본 프롬프트 저장
- [ ] 외부 자산이면 출처 URL 저장
- [ ] 라이선스 조건 메모 저장
- [ ] 최종 채택 이유 기록

### Phase 5. 적용 점검

- [ ] 1200x630에서 읽히는지
- [ ] 제목과 겹치지 않는지
- [ ] 너무 유아틱하거나 촌스럽지 않은지
- [ ] 도구 OG에서도 어색하지 않은지

## 외부 자산 사용 체크리스트

### unDraw 사용 시

- [ ] 메인 마스코트가 아닌 보조 일러스트인지 확인
- [ ] 스타일 충돌 없는지 확인
- [ ] 라이선스 페이지 저장

### Openverse 사용 시

- [ ] 개별 자산 라이선스 확인
- [ ] 상업 사용 가능 여부 확인
- [ ] 출처 표기 필요 여부 확인
- [ ] 원 라이선스 페이지 저장

### Storyset/OpenMoji 사용 시

- [ ] 출처 표기 조건 확인
- [ ] ShareAlike 등 2차 조건 확인
- [ ] 메인 브랜드 자산으로 쓰는지 다시 검토

## 추천 결정

가장 좋은 결정:

- 메인 캐릭터는 새로 생성
- 외부 자산은 보조용
- 외부 자산은 파일 옆에 출처 메모를 남김

## 바로 시작용 프롬프트 방향

예시 방향:

`rounded friendly rabbit mascot, pastel cream coral mint palette, clean vector-like illustration, child-friendly, warm, simple face, transparent background, no copyrighted character resemblance`

금지:

- 특정 브랜드나 작가 스타일 이름
- 실사풍
- 과한 디테일

## 실제 시작 순서

가장 먼저 할 것:

1. 마스코트 타입 하나 고르기
2. `12-gemini-image-prompt-pack.md`에서 기본 프롬프트 선택
3. 생성 시안 6~10개 만들기
3. 상위 2개만 남기기
4. OG 샘플 3장에 얹어보기
5. 채택 후 파일 구조에 저장

간단한 결론:

OG 리브랜딩 자산은 `한 캐릭터를 오래 쓰는 방식`으로 가야 브랜드가 쌓인다.

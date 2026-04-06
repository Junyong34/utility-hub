# OG Image Rebrand System

## 목표

현재의 짙은 네이비/사이버 계열 OG 이미지를 육아형 브랜드에 맞는 `산뜻하고 따뜻한 기본 레이아웃`으로 전환한다.

이 문서는 색상, 레이아웃, 타이포, 마스코트 자리, 라우트별 적용 원칙을 정의한다.

## 현재 상태 요약

현재 OG 시스템은 공용 렌더러를 중심으로 동작한다.

핵심 파일:

- `lib/seo/og-renderer.tsx`
- `lib/seo/og.ts`
- `app/api/og/custom/route.ts`
- `app/api/og/blog/[category]/[slug]/route.ts`
- `app/api/og/tools/[toolId]/route.ts`
- `app/tools/og-image-studio/page.tsx`
- `components/tools/og-image-studio/CustomOgForm.tsx`

현재 기본 색상:

- 배경: `#0f172a`
- 포인트: `#38bdf8`

이 조합은 금융/툴 사이트 느낌에는 맞지만, 육아형 브랜드의 첫인상으로는 너무 차갑고 무겁다.

## 리브랜딩 목표 톤

핵심 인상은 아래 네 가지다.

1. 따뜻함
2. 밝음
3. 정돈됨
4. 유아/어린이 친화적이지만 유치하지 않음

즉 `어린이집 공지장` 느낌이 아니라, `정리 잘 된 프리미엄 육아 가이드`에 가깝게 간다.

## 디자인 원칙

1. 검은색 계열 풀배경을 기본값에서 제거한다.
2. 배경은 밝고, 텍스트는 짙은 중성색으로 읽히게 만든다.
3. 둥근 카드, 부드러운 블롭, 작은 패턴은 허용하되 산만하면 안 된다.
4. 블로그/도구/커스텀 모드가 서로 다른 템플릿을 쓸 수 있어야 한다.
5. 마스코트는 `있을 때 더 좋아지는 요소`여야지, 없으면 무너지는 구조면 안 된다.

## 권장 컬러 시스템

### Base Colors

- `cream-50`: `#FFF8EF`
- `peach-100`: `#FFE3D2`
- `butter-200`: `#FFE7A8`
- `mint-200`: `#D9F5E6`
- `sky-200`: `#D9EEFF`

### Accent Colors

- `coral-500`: `#FF8D73`
- `sun-500`: `#FFC94A`
- `mint-500`: `#57C79A`
- `sky-500`: `#6EB8FF`

### Text Colors

- `ink-900`: `#25303B`
- `ink-700`: `#4D5A67`
- `line-200`: `#E9E1D7`

## 기본 OG 템플릿 제안

### Template A, `play-card`

기본 추천 템플릿이다.

구성:

- 밝은 크림 배경
- 좌측 상단 라벨
- 큰 제목
- 2줄 이하 설명
- 우측 하단 마스코트 또는 대표 이미지
- 하단 브랜드 바

사용처:

- 블로그 기본 OG
- 혜택/가이드 글

### Template B, `tool-card`

도구 전용 템플릿이다.

구성:

- 밝은 배경 + 포인트 컬러 카드
- 제목
- 간단한 설명
- 우측에 미니 도식/차트/숫자 카드
- 마스코트는 작게 보조로만 사용

사용처:

- `/api/og/tools/*`
- 계산기 상세 페이지

### Template C, `custom-studio`

스튜디오에서 자유 조합하는 템플릿이다.

구성:

- 배경 프리셋 선택
- 레이아웃 프리셋 선택
- 마스코트 on/off
- 대표 이미지 on/off
- 라벨/제목/설명 입력

사용처:

- `/tools/og-image-studio`
- 내부 실험

## 라우트별 적용 정책

### 블로그 OG

기본 템플릿은 `play-card`를 사용한다.

카테고리별로 미세한 포인트 색상만 바꾼다.

예시:

- 장소/체험: `sky-500`
- 혜택/지원금: `mint-500`
- 실전 가이드: `coral-500`

### 도구 OG

기본 템플릿은 `tool-card`를 사용한다.

기존 `tool.color`의 다크 그라디언트를 그대로 쓰지 않고, 육아형 팔레트로 재매핑한다.

예시:

- 연령/성장: `sky + mint`
- 비용/예산: `sun + coral`
- 세금/증여: `peach + coral`

### 커스텀 OG

스튜디오 기본값은 밝은 팔레트와 마스코트 포함 버전으로 바꾼다.

현재 기본값:

- 배경 `#0f172a`
- 포인트 `#38bdf8`

새 기본값 제안:

- 배경 `#FFF8EF`
- 포인트 `#FF8D73`
- 라벨 `GUIDE`

## 마스코트 자리 규칙

마스코트는 우측 하단 또는 우측 중앙 하단에 둔다.

금지 규칙:

- 제목 가독성 침범
- 본문 텍스트 뒤 배치
- 메인 이미지와 경쟁

권장 크기:

- 전체 폭의 18~24%

## 패턴/배경 요소 규칙

허용 요소:

- 둥근 구름형 블롭
- 작은 별/점 패턴
- 블록/퍼즐 느낌의 단순 모양
- 연한 체크/스트라이프

금지 요소:

- 과한 그림자
- 네온 글로우
- 복잡한 3D 장식
- 배경 노이즈 과다

## 타이포그래피 규칙

현재 폰트는 `Noto Sans KR`를 그대로 쓸 수 있다.

다만 스타일은 바꾼다.

- 제목: 아주 굵게
- 설명: 명도 낮춘 진한 회색
- 라벨: 작은 캡슐형 배지
- 흰 글자 중심 구조는 지양

## 스튜디오 개선 포인트

현재 `CustomOgForm`은 아래 입력만 가진다.

- 제목
- 설명
- 이미지 on/off
- 이미지 경로
- 배경색
- 포인트 색
- 라벨

추가해야 할 입력:

- `themePreset`
- `layoutVariant`
- `mascotEnabled`
- `mascotVariant`
- `patternStyle`
- `categoryTone`

## 구현 기준 파일

우선 수정 대상:

- `lib/seo/og-renderer.tsx`
- `lib/seo/og.ts`
- `app/api/og/custom/route.ts`
- `app/api/og/blog/[category]/[slug]/route.ts`
- `app/api/og/tools/[toolId]/route.ts`
- `app/tools/og-image-studio/page.tsx`
- `components/tools/og-image-studio/CustomOgForm.tsx`

추가 가능 파일:

- `lib/seo/og-theme.ts`
- `lib/seo/og-layouts.tsx`
- `public/og-images/brand/*`

## 성공 기준

1. 썸네일만 봐도 육아형 브랜드로 인식된다.
2. 블로그/도구/커스텀 모드가 한 브랜드 체계 안에서 보인다.
3. 밝아졌지만 텍스트 가독성은 더 좋아진다.

## Brief Conclusion

OG 리브랜딩의 핵심은 `다크한 툴 썸네일`을 `밝은 육아형 브랜드 카드`로 바꾸는 것이다.

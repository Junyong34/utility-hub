# Playwright MCP OG Capture Guide

## 목적
`source_url` 기반 대표 이미지를 만들 때 Playwright MCP를 사용해 안정적으로 캡처하고, 최종 결과를 WebP로 저장한다. 커스텀 OG가 필요하지 않으면 이 단계는 생략하고 블로그 기본 OG 경로를 사용한다.

## 권장 순서
1. 브라우저가 없으면 `browser_install`을 먼저 실행한다.
2. `browser_resize`로 창 크기를 `1200 x 630`에 맞춘다.
3. `browser_navigate`로 `source_url`에 이동한다.
4. `browser_wait_for`로 `2~5초` 또는 핵심 텍스트가 나타날 때까지 기다린다.
5. `browser_take_screenshot`로 PNG를 저장한다.
   - `fullPage`는 기본적으로 `false`
   - 파일명은 `/tmp/<target_slug>.png` 권장
6. PNG를 WebP로 변환한다.
   - 우선순위: `sharp` → `sips` → `convert`
7. 최종 파일을 `/Users/junyongpark/workspace/junD/utility-hub/public/og-images/post/<target_slug>.webp`에 둔다.

## 언제 이 단계를 생략하나
- `target_slug`가 자동 생성되고, 별도 커스텀 썸네일 요구가 없을 때
- 페이지 기본 OG(`/api/og/blog/<category>/<slug>`)만으로 충분할 때
- source page가 로그인, 접근권한, 렌더링 문제로 캡처 가치가 낮을 때

## 캡처 품질 규칙
- 광고 팝업, 쿠키 배너, 로그인 모달이 본문을 가리면 먼저 닫는다.
- full page 캡처보다 대표 영역 중심 viewport 캡처를 우선한다.
- 텍스트가 너무 작으면 viewport를 유지한 채 핵심 영역이 잘 보이도록 화면 위치를 조정한다.

## 실패 처리
- 페이지 접근이 막히거나 로그인 필요하면 `source_image`를 사용한다.
- `source_image`도 없으면 단색 배경 + 제목 텍스트 기반 플레이스홀더 이미지를 만든다.
- 최종 WebP가 없으면 포스트 저장을 중단한다.

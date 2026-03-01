# playwright-post

MCP Playwright로 블로그 포스트 DOM을 추출하고, 결과 마크다운을 로컬 파일로 저장하는 전용 디렉토리입니다.

## 구성 파일

- `extractParkingPostDom.evaluate.js`
  - `browser_evaluate`에 그대로 붙여넣어 실행하는 self-contained 함수
  - 반환값: `{ url, title, contentHtml, toc, images, markdown }`
- `saveParkingPostMarkdown.mjs`
  - extractor JSON을 `stdin`으로 받아 `playwright-post/*.md` 파일로 저장

## 저장 규칙

- 기본 파일명: `slug.md`
- slug: URL pathname 마지막 세그먼트 (decode + 파일명 안전 문자로 정리)
- 충돌 시: `slug-YYYYMMDD-HHmmss.md` 생성

## 실행 절차

1. MCP Playwright로 대상 URL 열기
2. `extractParkingPostDom.evaluate.js` 내용을 `browser_evaluate`의 `function`으로 실행
3. 결과 JSON을 임시 파일에 저장 (예: `/tmp/parking-post.json`)
4. 아래 명령 실행

```bash
node playwright-post/saveParkingPostMarkdown.mjs < /tmp/parking-post.json
```

5. 출력된 경로의 `.md` 파일 확인

## 에러 조건

- 입력 JSON 파싱 실패
- `url` 누락/빈 값
- `markdown` 누락/빈 값

위 경우 스크립트는 `exit code 1`로 종료합니다.

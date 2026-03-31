---
name: blog-post-from-source
description: Use this skill whenever the user wants a Korean blog post generated from a source URL or provided text for this project. It should remove or mask PII, make the structure readable, apply SEO-ready sections, use the `humanizer` and `blog-seo-writer` skills when they are available, infer category and slug when they are omitted, and rely on the blog's default OG generation unless a custom screenshot-based thumbnail is explicitly needed. Use Playwright MCP when generating a custom OG image.
---

# blog-post-from-source: 링크/텍스트 기반 블로그 포스트 생성 스킬

## 사용 목적
- 링크(`source_url`) 또는 원문 텍스트(`source_text`)를 바탕으로 Zento 블로그 포스트를 작성한다.
- 개인정보(PII) 유출을 방지하고, 가독성 있는 한국어 구성으로 정리한다.
- SEO 가독성 규칙을 반영해 FAQ/핵심 요약/메타데이터를 작성한다.
- 필요 시 Playwright MCP로 대표 이미지를 캡처하고, 기본적으로는 블로그의 자동 OG 생성 규칙을 따른다.

## 입력 형식
- `source_url` (선택): 출처 링크 URL
- `source_text` (권장): 링크 본문 요약 또는 제공된 텍스트
- `category_slug` (권장): `content/posts/<category_slug>`에 저장할 카테고리 폴더명. 비워두면 주제 기준으로 자동 추론한다.
- `target_slug` (선택): 파일명으로 사용할 slug. 비워두면 제목 또는 원문 주제를 기준으로 영문 kebab-case slug를 자동 생성한다.
- `title` (선택): 최종 제목
- `author` (선택, 기본값: `team`)
- `tags` (선택): 문자열 배열 또는 쉼표 구분 문자열
- `include_emoji` (선택, 기본값: `true`): 제목/핵심 구획에 이모지 사용 여부
- `privacy_mode` (선택, 기본값: `strict`): `strict | permissive`
- `source_image` (선택): 대체 이미지 URL 또는 로컬 이미지 경로
- `custom_og_image` (선택, 기본값: `false`): `true`면 Playwright MCP 또는 `source_image`로 커스텀 OG 이미지를 만든다.
- `publish_date` (선택): `YYYY-MM-DD`, 기본 현재일

## 출력 계약
- 마크다운 파일: `utility-hub/content/posts/<resolved_category_slug>/<resolved_target_slug>.md`
- OG 이미지:
  - 기본: `ogImage` frontmatter를 생략하고 `/api/og/blog/<resolved_category_slug>/<resolved_target_slug>` 자동 생성 사용
  - 선택: 커스텀 OG가 필요할 때만 `utility-hub/public/og-images/post/<resolved_target_slug>.webp`
- 실행 요약 텍스트: 작성 필드, 정합성 확인 결과, 개인정보 마스킹 리포트, 실패/대체 처리 내역

## 기본 동작 순서 (반드시 순서대로)
1. 입력 정규화
- `target_slug`가 없으면 `title` 또는 출처 제목을 바탕으로 짧은 영문 kebab-case slug를 생성한다.
- slug는 기존 포스트 패턴처럼 소문자 영문 키워드 중심으로 만들고, 숫자/하이픈만 허용한다.
- `category_slug`가 없으면 현재 블로그 패턴 기준으로 자동 분류한다.
  - `parking`, `development`, `consumer`, `investment`, `lotto`, `ai-image-creator` 우선 검토
  - 확신이 낮으면 `uncategorized`를 사용한다.
- frontmatter의 `category`와 `categorySlug`는 최종 저장 경로 기준으로 채운다.

2. 콘텐츠 수집
- `source_url`이 있으면 핵심 사실만 추출(제목/요약/핵심 주장/인용/숫자 기반 정보).
- `source_text`가 있으면 해당 텍스트를 1차 입력으로 사용.
- 출처가 불완전하면 임의 추측을 하지 말고 "이 정보는 확정하기 어렵습니다" 문구를 사용한다.

3. 개인정보/기밀 삭제
- `references/content-guard.md`의 규칙을 사용해 개인정보를 제거하거나 익명화.
- 개인식별정보가 다수 발견되면 제목/요약에서 제외하고
  `개인정보는 비공개 처리했습니다` 배지를 넣는다.

4. 가독성 초안 생성
- `references/post-template.md` 구조를 적용해 아래를 생성한다.
  - 첫 3줄 내 핵심 정의
  - 핵심 요약(TL;DR)
  - 섹션 제목 + 표/리스트
  - FAQ(최소 3개, 실사용 검색 쿼리 톤)
  - 출처 정리
  - 결론

5. `humanizer` 검수
- `.agents/skills/humanizer` 또는 동등한 `humanizer` 스킬이 사용 가능하면 반드시 사용한다.
- 초안에 AI 흔적이 보이면 `humanizer` 스킬로 문장 톤을 자연스럽게 조정한다.
- 스킬이 없으면 동일한 기준으로 수동 자연화하되, 의미/사실/수치/링크는 바꾸지 않는다.
- 변경 사항 2~4개와 근거를 변경 로그에 기록한다.

6. `blog-seo-writer` 보정
- `.agents/skills/blog-seo-writer` 또는 동등한 `blog-seo-writer` 스킬이 사용 가능하면 반드시 사용한다.
- SEO용 개선, FAQ, JSON-LD, 검색 의도 분해를 점검한다.
- 스킬이 없으면 같은 체크리스트를 수동 적용하되, FAQ, JSON-LD, 키워드 분산, 최신성 표기를 빠뜨리지 않는다.
- 태그/메타 설명/최신 업데이트 문구를 정합성 있게 정리한다.

7. OG 이미지 결정
- 기본값은 커스텀 OG를 만들지 않는 것이다.
- `custom_og_image=true` 또는 사용자가 별도 썸네일 캡처를 요청한 경우에만 Playwright MCP로 `source_url`을 캡처한다.
  - 권장 순서: `browser_install` 필요 시 실행 → `browser_resize` 1200x630 → `browser_navigate` → `browser_wait_for` → `browser_take_screenshot`
  - 스크린샷은 임시 PNG로 저장하고, 이후 WebP로 변환한다.
  - 우선순위: `source_url` 스크린샷 → `source_image` 다운로드/복사 → 기본 플레이스홀더.
- 커스텀 OG를 만들지 않으면 frontmatter의 `ogImage`를 생략하고, 시스템 기본 경로 `/api/og/blog/<category>/<slug>`를 그대로 사용한다.
- 자세한 순서는 `references/playwright-og-capture.md`를 따른다.

8. 최종 저장
- 파일 경로 정합성 검사: `content/posts/<category>/<slug>.md` 존재 및 slug 일치 확인.
- `ogImage`가 있으면 커스텀 경로를 확인하고, 없으면 자동 OG 경로가 적용되는 전제로 처리한다.

## frontmatter 기본 템플릿
```yaml
---
title: "<title>"
date: "YYYY-MM-DD"
author: "<author>"
excerpt: "<120자 이하 핵심 요약>"
tags:
  - "..."
category: "..."
categorySlug: "<category_slug>"
ogImage: "/og-images/post/<target_slug>.webp" # 커스텀 OG가 있을 때만 추가
---
```

## Playwright MCP 사용 가이드
- 캡처는 repo 로컬 스크립트가 아니라 Playwright MCP로 수행한다.
- 커스텀 OG가 필요하지 않으면 캡처 단계를 생략한다.
- 기본 캡처 흐름:
  - 브라우저 준비 후 viewport를 `1200x630`으로 맞춘다.
  - `source_url`로 이동하고, 페이지가 안정화될 때까지 기다린다.
  - viewport 기준 PNG 스크린샷을 만든다.
  - PNG를 `utility-hub/public/og-images/post/<resolved_target_slug>.webp`로 변환한다.
- 페이지가 로그인 필요 상태이거나 캡처 품질이 낮으면 `source_image`를 대체 입력으로 사용한다.

## 서브에이전트 분업(필수 패턴)
- 리서치 에이전트
  - 역할: 출처 핵심 주장 5개 요약, 수치/일정/근거 정리
  - 출력: `fact_pack`
- 글쓰기 에이전트
  - 역할: 읽기 쉬운 3단 구조 + 리스트/표 중심으로 재배치
  - 출력: 초안 본문
- SEO 에이전트
  - 역할: FAQ/JSON-LD/태그 정합성 점검
  - 출력: SEO 체크리스트

## 마감 기준
- 개인정보가 본문에 남아 있으면 실패로 간주.
- FAQ 누락은 즉시 보완.
- 커스텀 OG를 요청한 경우에만 `ogImage` 누락을 실패로 간주한다.

## 실패 처리 규칙
- source_url이 유효하지 않거나 캡처 실패 시: `source_image` 사용 또는 기본 OG 자동 생성으로 전환.
- source_text가 빈 경우: 출처 링크 기반으로 핵심 주장만 추론하고, 추론 불가 항목에는 "이 정보는 확정하기 어렵습니다"를 표기.
- `privacy_mode=strict`에서는 이름/연락처/기관코드/계좌/이메일/주민번호 형태를 반드시 마스킹.
- `custom_og_image=true` 상태에서 Playwright MCP 캡처가 실패하면 원인을 먼저 요약하고, 필요 시 자동 OG 생성으로 전환할지 판단한다.

## 금지 사항
- 실제 링크 텍스트의 민감 정보(연락처, 주민번호, 계좌, 신상 주소 디테일)를 그대로 노출하지 않는다.
- 임의 확정 수치 및 공식 미공개 데이터는 추가하지 않는다.
- 동일한 문장을 반복 복붙하지 않고, 실제 사용자에게 읽기 쉬운 흐름으로 리라이팅한다.

# gstack 사용 매뉴얼

이 문서는 Codex 워크스페이스에서 `gstack`를 repo-local로 설치하고 사용하는 기준을 정리합니다.

## 개요

`gstack`는 Garry Tan이 공개한 AI 작업용 skill pack입니다. 기획, 리뷰, QA, 배포, 브라우징, 안전 가드까지 여러 specialist skill을 한 번에 제공합니다.

이 프로젝트에서는 전역 설치 대신 워크스페이스 전용 설치를 기준으로 다룹니다.

## 설치 방식

Codex 기준 설치는 다음 흐름을 따릅니다.

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git .agents/skills/gstack
cd .agents/skills/gstack && ./setup --host codex
```

설치 시 핵심 기준은 다음과 같습니다.

- 스킬 소스는 이 워크스페이스의 [`.agents/skills/gstack`](/Users/junyongpark/workspace/junD/utility-hub/.agents/skills/gstack)에 둡니다.
- Codex용 생성 스킬도 같은 워크스페이스의 [`.agents/skills`](/Users/junyongpark/workspace/junD/utility-hub/.agents/skills) 아래에 `gstack-*` 이름으로 연결됩니다.
- 일반 Codex skill 전역 위치인 `~/.codex/skills`는 건드리지 않는 구성을 사용합니다.
- `setup` 과정에서 `~/.gstack/` 쪽 런타임 상태나 브라우저 관련 캐시는 생길 수 있습니다.

이 워크스페이스에서 실제로 생성된 대표 스킬 이름은 다음과 같습니다.

- `gstack-office-hours`
- `gstack-plan-ceo-review`
- `gstack-review`
- `gstack-qa`
- `gstack-ship`

## 추천 사용 흐름

gstack 문서와 사용 예시는 실무적으로 다음 순서를 권장합니다.

1. 아이디어나 요구사항을 먼저 정리합니다.
2. 필요한 경우 계획 계열 skill로 범위를 좁힙니다.
3. 변경 후 리뷰와 QA skill로 검증합니다.
4. 안전한 범위가 확인되면 배포 계열 skill로 마무리합니다.

이 워크스페이스에서는 접두사가 붙은 이름으로 호출하는 편이 안전합니다.

- `/gstack-office-hours`로 아이디어를 빠르게 정리합니다.
- `/gstack-plan-ceo-review` 또는 `/gstack-autoplan`으로 실행 가능한 단위로 쪼갭니다.
- `/gstack-review`로 변경 내용을 점검합니다.
- `/gstack-qa`로 브라우저나 스테이징 환경을 확인합니다.
- `/gstack-ship`으로 마무리합니다.

## 주요 skill 묶음

### 기획

- `/gstack-office-hours`
- `/gstack-plan-ceo-review`
- `/gstack-plan-eng-review`
- `/gstack-autoplan`

### 리뷰 및 검증

- `/gstack-review`
- 필요하면 `gstack` 외의 기본 Codex 리뷰 흐름과 병행

### QA 및 브라우징

- `/gstack-qa`
- `/gstack-browse`
- `/gstack-setup-browser-cookies`

### 배포 및 운영

- `/gstack-ship`
- `/gstack-land-and-deploy`
- `/gstack-canary`

### 안전장치

- `/gstack-careful`
- `/gstack-freeze`
- `/gstack-guard`
- `/gstack-unfreeze`

## 실전 예시

### 1. 아이디어 정제

새 기능 아이디어가 많고 범위가 넓을 때는 `/gstack-office-hours`로 시작한 뒤 `/gstack-plan-ceo-review`로 우선순위를 정리합니다.

### 2. 브랜치 코드 리뷰

브랜치 변경분이 생기면 `/gstack-review`로 먼저 구조를 점검하고, 필요하면 Codex 기본 리뷰 흐름을 별도로 병행합니다.

### 3. 스테이징 QA

스테이징 URL이 준비되면 `/gstack-qa`로 브라우저 기반 점검을 진행하고, 로그인 세션이 필요하면 `/gstack-setup-browser-cookies`를 함께 사용합니다.

### 4. 위험 작업 전 안전 가드

대량 수정이나 파괴적 작업 전에는 `/gstack-guard`로 수정 범위를 고정하고, 필요하면 `/gstack-freeze`로 추가 변경을 막은 뒤 진행합니다.

## 운영 메모

- 이 워크스페이스 기준으로는 스킬 파일만 로컬에 두는 구성을 사용합니다.
- `~/.gstack/`에 생성되는 런타임 상태는 별도 작업 공간으로 취급합니다.
- upstream 문서 예시는 `/office-hours`, `/review`처럼 접두사 없는 표기를 쓰기도 있지만, 현재 워크스페이스 설치 결과는 `gstack-*` 이름으로 노출됩니다.
- upstream 문서에 보이는 `/codex` 보조 스킬은 이번 Codex repo-local 생성 결과에는 별도 `gstack-codex`로 노출되지 않았습니다.
- Codex 세션이 새 스킬을 즉시 다시 읽는지는 환경에 따라 다를 수 있으므로, 설치 후 새 세션에서 확인하는 편이 안전합니다.

## 참고

- [`gstack` 저장소](https://github.com/garrytan/gstack)
- [`docs/skills.md`](https://github.com/garrytan/gstack/blob/main/docs/skills.md)

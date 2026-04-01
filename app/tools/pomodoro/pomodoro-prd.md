<!-- /autoplan restore point: /tmp/utility-hub-main-autoplan-restore-20260331-162006.md -->

# 📄 뽀모도로 웹서비스 PRD

## 1. 제품 개요

**제품명:** (가칭) Multi Pomodoro  
**제품 유형:** 웹 기반 뽀모도로 타이머 서비스  
**배포 위치:** `/tools/pomodoro`

### 목적

사용자가 브라우저에서 30초 안에 집중 세션을 시작하고, 세션 종료까지 흐름이 끊기지 않도록 돕는다.

### 제품 포지셔닝

- 이 제품은 팀 협업용 생산성 스위트가 아니다.
- 이 제품은 Zento의 `tools` 허브 안에서 바로 쓰는 집중 도구다.
- 차별점은 계정 시스템이 아니라 `즉시 시작`, `시각적으로 몰입되는 타이머`, `작업 모드 확장`에 둔다.

### 핵심 가치

- 빠른 시작: 첫 방문자는 입력 없이 기본 세션을 바로 시작할 수 있어야 한다.
- 확장 가능한 구조: A 타입과 B 타입은 같은 타이머 엔진을 재사용해야 한다.
- 방해 없는 경험: 시각 효과는 강하되 조작은 단순해야 한다.

## 2. 문제 정의

### 사용자 문제

- 기존 뽀모도로 도구는 너무 가볍거나, 반대로 작업 관리까지 한 번에 요구해서 진입이 느리다.
- 집중 도구를 쓰려는 사용자는 “일단 시작”이 먼저인데, 많은 제품이 첫 화면부터 설정과 폼 입력을 요구한다.
- 웹에서 바로 접근 가능한 타이머는 많지만, Zento의 현재 `tools` 문맥에 맞는 “빠른 시작 + 작업 확장” 구조는 없다.

### 우리가 푸는 핵심 Job

> 사용자가 생각을 끊지 않고 바로 집중 세션을 시작하고, 완료 시 자연스럽게 다음 행동으로 이어지게 한다.

### 전제

- `Zero friction`은 A/B 모드 자체보다 우선한다.
- B 타입은 중요하지만, A 타입의 빠른 시작을 늦추면 안 된다.
- 서버 없는 localStorage 기반도 v1에는 허용되지만, 저장 실패와 복구 경로는 반드시 정의해야 한다.
- 이 제품의 초기 승부처는 계정 기반 리텐션보다 `유입 후 즉시 사용률`과 `완료 경험`이다.

### 전제 신뢰도

- 사용자 요구와 저장소 구조 근거는 높음.
- 시장 포지셔닝과 KPI 수치는 아직 가설이다. 이 부분은 실제 런치 후 검증이 필요하다.

## 3. 목표와 성공 지표

### 출시 목표

- Zento `tools` 안에 독립 도구로 노출된다.
- 데스크탑과 모바일에서 모두 즉시 시작 가능하다.
- 새로고침, 탭 전환, 백그라운드 복귀 후에도 세션 상태가 복원된다.

### 운영 KPI

- 방문 후 30초 내 타이머 시작률 ≥ 70%
- 시작한 세션의 완료율 ≥ 60%
- 7일 내 재방문율 ≥ 30%

### 검증 메모

- 위 수치는 목표치이며, 현재 기준선 데이터가 없다.
- 출시 후 실제 측정 이벤트를 넣어 보정해야 한다.

## 4. 타깃 사용자

- 공부하는 학생
- 재택근무 직장인
- 개발자 / 디자이너 / 기획자
- 작업 단위로 집중 시간을 관리하고 싶은 사용자

## 5. 제품 구조

```text
Pomodoro Tool
├── Tool Shell
│   ├── Tool metadata + breadcrumb + switcher
│   └── Responsive page layout
├── Core Timer Engine
│   ├── Timestamp-based countdown
│   ├── Session state machine
│   ├── localStorage persistence
│   └── completion side effects
├── A Type: Quick Start Mode
│   ├── default focus preset
│   ├── optional title edit
│   └── immediate start flow
└── B Type: Task Mode
    ├── task CRUD
    ├── selected task session
    └── completion + record linkage
```

## 6. 현재 코드베이스에서 이미 있는 것

| 서브 문제                | 기존 코드                                                    | 재사용 방침                     |
| ------------------------ | ------------------------------------------------------------ | ------------------------------- |
| 도구 라우팅/SEO/메타     | `lib/tools/tool-config.ts`, `app/tools/*/page.tsx`           | 그대로 재사용                   |
| 도구 전환 UI             | `components/tools/ToolSwitcher.tsx`                          | 그대로 재사용                   |
| 입력 컴포넌트            | `components/ui/*`                                            | 그대로 재사용                   |
| 클라이언트 상호작용 패턴 | `components/tools/last-digit-game/LastDigitGameTool.tsx`     | 상태 많은 client tool 패턴 참고 |
| confetti 효과            | `components/magicui/confetti.tsx`                            | 세션 완료 효과에 재사용         |
| localStorage 접근 패턴   | `components/lotto/LottoRecommend/LottoRecommendProvider.tsx` | safe parse/fallback 패턴 참고   |

### 재구현 금지 원칙

- 새 tool shell을 따로 만들지 않는다.
- 폼 입력을 canvas 위에 직접 그리지 않는다.
- 전체 타이머 로직을 `setInterval` tick 누적으로 구현하지 않는다.

## 7. 구현 대안 비교

### APPROACH A: 최소형 Quick Start 먼저

- Summary: A 타입만 먼저 출시하고 B 타입은 후속으로 미룬다.
- Effort: S
- Risk: Low
- Pros:
  - 가장 빠르게 출시 가능
  - zero friction 목표에 가장 잘 맞음
  - 파일 수와 상태 수가 적다
- Cons:
  - 사용자가 요청한 B 타입이 빠진다
  - 제품 차별점이 약해질 수 있다
  - 추후 구조 변경이 다시 필요할 수 있다
- Reuses: tool shell, UI input, confetti, basic storage patterns

### APPROACH B: 공통 엔진 + A/B 듀얼 모드

- Summary: 공통 타이머 엔진을 만들고, A 타입을 기본 진입점으로 두되 B 타입을 같은 페이지의 보조 모드로 제공한다.
- Effort: M
- Risk: Med
- Pros:
  - 사용자 요구를 그대로 반영한다
  - 공통 엔진으로 중복을 줄인다
  - 이후 기록 분석, 반복 세션, 프리셋 확장 기반이 된다
- Cons:
  - 상태 설계가 허술하면 빠르게 꼬인다
  - A/B 전환 규칙을 명확히 정의해야 한다
  - 테스트 범위가 넓어진다
- Reuses: tool shell, switcher, ui inputs, confetti, localStorage patterns

### APPROACH C: 이상형 PWA 집중 도구

- Summary: 듀얼 모드에 더해 PWA 설치, 오프라인 캐시, 반복 세션 통계, 리마인더, 장기 기록까지 포함한다.
- Effort: XL
- Risk: High
- Pros:
  - 장기 리텐션 서사를 만들 수 있다
  - 브라우저 도구를 넘어 독립 제품에 가까워진다
  - 추후 습관 기능까지 이어지기 쉽다
- Cons:
  - 현재 저장소와 요구사항 대비 과하다
  - 검증 전 투자 비용이 너무 크다
  - local-only 정책과 충돌하는 기능이 생긴다
- Reuses: 일부 shell만 재사용, 나머지는 신규 설계 비중이 큼

### 추천

**APPROACH B**를 선택한다.  
이유: 사용자 요구를 훼손하지 않으면서도, 기존 `tools` 구조와 가장 자연스럽게 맞고, 추후 확장도 가능하다.

## 8. 모드 선택과 범위 결정

### 선택 모드

**SELECTIVE EXPANSION**

### 이유

- 현재 요구사항은 이미 MVP를 넘었지만, 그렇다고 PWA급 확장까지 가면 scope가 너무 커진다.
- 따라서 사용자 요청인 A/B 듀얼 모드는 수용하되, 리마인더/동기화/통계 대시보드 같은 확장은 이번 범위에서 제외한다.

### 이번 범위에 포함

- `/tools/pomodoro` 독립 페이지
- 공통 타이머 엔진
- A 타입 Quick Start
- B 타입 Task Mode
- canvas 기반 진행 시각화
- 종료 애니메이션/사운드/풀스크린
- localStorage 저장/복구
- 기록 편집
- 접근성/반응형
- 단위 테스트 + E2E 테스트 계획

### NOT in scope

- 사용자 계정, 클라우드 동기화
- 반복 알림, 푸시 알림
- 장기 통계 대시보드
- PWA 설치 배너/서비스워커 커스텀 최적화
- 캘린더, 외부 할 일 앱 연동
- 공유 링크를 통한 타이머 상태 동기화

## 9. Dream State Mapping

```text
CURRENT STATE                  THIS PLAN                         12-MONTH IDEAL
도구 허브에 뽀모도로 없음     ->  브라우저 즉시 실행형            ->  반복 사용과 SEO 유입이 쌓이는
기존 tool shell만 존재            듀얼 모드 뽀모도로 도구              집중 도구 플랫폼
```

### Dream state delta

- 이번 계획은 “즉시 실행형 집중 도구”까지는 닿는다.
- 아직 “장기 습관 제품”은 아니다.
- 따라서 이번 버전의 승부는 리텐션 인프라가 아니라 첫 사용 경험과 세션 완료 경험에 둔다.

## 10. 정보 구조와 사용자 흐름

### 첫 화면 정보 우선순위

1. **주 CTA**: 바로 시작 / 일시정지 / 재개
2. **타이머 시각화**: canvas 기반 진행 링 또는 시계판
3. **현재 모드 설명**: Quick Start / Task Mode
4. **보조 설정**: 시간, 타이틀, 사운드, 풀스크린
5. **기록/Task 패널**

### 사용자 흐름

#### A 타입

```text
접속
→ 기본 25분 타이머 노출
→ 바로 시작
→ 필요 시 제목/시간 수정
→ 세션 완료
→ 완료 애니메이션 + 사운드
→ 기록 저장
→ 바로 다시 시작 또는 Task Mode 전환
```

#### B 타입

```text
접속
→ Task Mode 전환
→ Task 추가 또는 기존 Task 선택
→ 타이머 시작
→ 완료 시 task completed 반영
→ 기록 저장
→ 다음 task 시작 또는 Quick Start 복귀
```

### 화면 구조

```text
DESKTOP
┌──────────────────────────────────────────────────────────┐
│ Breadcrumb / ToolSwitcher                               │
│ Title + Mode Toggle + Status Chip                       │
├───────────────────────────────┬──────────────────────────┤
│ Canvas Timer Stage            │ Right Panel             │
│ - Countdown                   │ - Quick settings        │
│ - Progress ring               │ - Task list / records   │
│ - Session feedback            │ - Empty / help states   │
├───────────────────────────────┴──────────────────────────┤
│ Primary controls: Start / Pause / Reset / Fullscreen    │
└──────────────────────────────────────────────────────────┘

MOBILE
┌──────────────────────────────┐
│ Header + Mode Toggle         │
│ Canvas Timer Stage           │
│ Primary controls             │
│ Collapsible settings/task    │
│ Records sheet                │
└──────────────────────────────┘
```

## 11. UI/UX 요구사항

### 메인 화면

- 첫 진입 기본 모드는 A 타입이다.
- A/B 전환은 segmented control 또는 tabs 형태로 제공하되, 첫 시작 전에는 A 타입 CTA가 더 강해야 한다.
- canvas는 타이머 원형 진행, 완료 burst, 상태 전환 연출에만 사용한다.
- 버튼, 입력, 목록, 설명 텍스트는 DOM 기반으로 렌더링한다.

### 상태 표현

- `idle`: 차분한 기본 컬러
- `running`: 진행 색상 + 약한 pulse
- `paused`: 대비 낮춘 정지 상태
- `completed`: 고채도 완료 컬러 + confetti/burst
- `error`: 경고색 + 복구 액션

### 종료 UX

- 종료 즉시 완료 애니메이션을 1회 재생한다.
- 사운드 허용 시 완료 사운드를 재생한다.
- 사운드 차단 시 시각적 피드백만으로도 완료를 인지할 수 있어야 한다.

## 12. Interaction State Coverage

| Feature            | Loading                           | Empty                                 | Error                                        | Success             | Partial                        |
| ------------------ | --------------------------------- | ------------------------------------- | -------------------------------------------- | ------------------- | ------------------------------ |
| 첫 방문 A 타입     | 스켈레톤 없이 기본 25분 즉시 노출 | 제목 없음 허용                        | storage load 실패 시 기본 상태로 시작 + 배너 | Start 가능          | 이전 세션 복구 제안            |
| B 타입 Task 리스트 | 짧은 fade-in                      | Task 없음 안내 + “첫 Task 만들기” CTA | parse 실패 시 Task 리스트 초기화 경고        | Task 선택 가능      | 일부 task만 복구됨             |
| 세션 완료          | 완료 오버레이 진입                | 기록 없음이면 첫 기록 생성            | save 실패 시 “기록 저장 실패” 배너           | 기록/완료 체크 반영 | 세션 완료했지만 기록 저장 실패 |
| 사운드             | 사용자 제스처 후 활성화           | 비활성 시 무음 안내                   | autoplay 차단 메시지                         | 정상 재생           | 사운드 실패, 애니메이션만 성공 |
| 풀스크린           | 진입/복귀 transition              | 지원 안 함 안내                       | 요청 거부 메시지                             | 전체 화면 유지      | 일부 브라우저에서 버튼 숨김    |

## 13. 사용자 여정과 감정선

| Step | 사용자가 하는 일 | 사용자가 느껴야 하는 것     | 이를 위한 설계                        |
| ---- | ---------------- | --------------------------- | ------------------------------------- |
| 1    | 페이지 진입      | “바로 쓸 수 있네”           | 기본 타이머 즉시 노출                 |
| 2    | Start 클릭       | “설정 없이 시작됐다”        | 즉시 카운트다운, 강한 시각 응답       |
| 3    | 집중 중          | “방해가 없다”               | 단순 컨트롤, 큰 진행 시각화           |
| 4    | 완료             | “한 사이클 끝냈다”          | 명확한 완료 애니메이션/사운드         |
| 5    | 다음 행동 선택   | “다음 세션도 이어가기 쉽다” | 다시 시작 / Task 선택 / 기록 확인 CTA |

## 14. 기능 요구사항

### 14.1 공통 타이머 엔진

| 기능             | 설명                                 |
| ---------------- | ------------------------------------ |
| startSession     | 설정된 duration 기준 세션 시작       |
| pauseSession     | 남은 시간을 유지하고 정지            |
| resumeSession    | pause 이후 재개                      |
| resetSession     | 현재 세션 취소 후 초기 상태 복귀     |
| completeSession  | 0초 도달 시 1회만 완료 처리          |
| recoverSession   | 새로고침/복귀 시 active session 복구 |
| saveRecord       | 완료 기록 저장                       |
| updateRecord     | 기록 제목/메모 수정                  |
| toggleFullscreen | 지원 브라우저에서 전체화면 전환      |
| notifyCompletion | 애니메이션 + 사운드 + 상태 변경      |

### 14.2 A 타입 Quick Start

- 첫 렌더에서 25분 기본 세션을 보여준다.
- 제목은 optional이다.
- 타이틀/시간 수정 없이 바로 시작할 수 있다.
- 시작 이후에도 제목과 시간을 수정할 수 있으나, 진행 중 time 수정은 reset 또는 next session에만 반영한다.

### 14.3 B 타입 Task Mode

- Task는 `title`, `duration`, `completed`, `order`, `updatedAt`를 가진다.
- 빈 리스트 상태에서 첫 Task 생성 CTA가 보여야 한다.
- 선택된 Task만 세션과 연결된다.
- 세션 완료 시 Task 완료를 자동 반영하되, 사용자가 되돌릴 수 있어야 한다.
- 활성 Task를 삭제하면 세션 연결을 즉시 해제하고 안전한 fallback 상태로 이동한다.

### 14.4 기록

- 기록은 세션 완료 시 생성된다.
- 진행 중 중단한 세션은 기본적으로 기록에 남기지 않는다.
- 사용자가 원하면 `abandoned` 상태로 남길 수 있으나 이번 범위에서는 제외한다.
- 기록 수정은 제목/메모 정도로 제한한다.

## 15. 상태 머신

```text
idle
 ├─ Start → running
 └─ Recover active session → running

running
 ├─ Pause → paused
 ├─ Reset → idle
 ├─ Time reaches 0 → completing
 └─ Tab hidden/visible → running (recomputed by timestamp)

paused
 ├─ Resume → running
 ├─ Reset → idle
 └─ Mode change → paused (session preserved, UI shell만 변경)

completing
 ├─ Save succeeds → completed
 └─ Save fails → completed_with_warning

completed / completed_with_warning
 ├─ Restart same duration → running
 ├─ Change mode → idle
 └─ Reset → idle
```

### 상태 규칙

- 완료 처리는 idempotent여야 한다.
- `running` 중 남은 시간 계산은 tick 누적이 아니라 `targetAt - Date.now()`로 계산한다.
- mode change는 기본적으로 세션을 끊지 않는다. 단, Quick Start → Task Mode 전환 시 활성 Task가 없으면 세션은 generic session으로 유지된다.

## 16. 데이터 설계

### localStorage 스키마

```json
{
  "version": 1,
  "settings": {
    "defaultFocusTime": 1500,
    "soundEnabled": true,
    "preferredMode": "simple"
  },
  "activeSession": {
    "id": "uuid",
    "mode": "simple",
    "title": "집중 세션",
    "taskId": null,
    "duration": 1500,
    "startedAt": "2026-03-31T07:00:00.000Z",
    "targetAt": "2026-03-31T07:25:00.000Z",
    "pausedAt": null,
    "remainingMs": null,
    "status": "running"
  },
  "records": [
    {
      "id": "uuid",
      "mode": "simple",
      "title": "공부",
      "taskId": null,
      "duration": 1500,
      "completedAt": "timestamp"
    }
  ],
  "tasks": [
    {
      "id": "uuid",
      "title": "React 공부",
      "duration": 1500,
      "completed": false,
      "order": 1,
      "updatedAt": "timestamp"
    }
  ]
}
```

### 저장 규칙

- `version` 필드는 필수다.
- parse 실패 시 전체 초기화 대신 안전한 기본값으로 fallback 한다.
- migration 실패 시 손상된 payload를 폐기하고 경고 배너를 띄운다.
- `setItem` 실패 시 사용자에게 “저장되지 않을 수 있음” 경고를 띄운다.

## 17. 엔지니어링 설계

### 예상 모듈 경계

```text
app/tools/pomodoro/page.tsx
components/tools/pomodoro/PomodoroTool.tsx
components/tools/pomodoro/PomodoroCanvas.tsx
components/tools/pomodoro/PomodoroControls.tsx
components/tools/pomodoro/PomodoroTaskPanel.tsx
components/tools/pomodoro/PomodoroRecordPanel.tsx
lib/tools/pomodoro/engine.ts
lib/tools/pomodoro/storage.ts
lib/tools/pomodoro/types.ts
lib/tools/tool-config.ts
```

### 아키텍처

```text
Tool page
  -> PomodoroTool client
    -> Timer engine
      -> storage adapter
      -> completion notifier
    -> Canvas renderer
    -> DOM controls
    -> Task/Record panels
```

### 구현 규칙

- 타이머 엔진은 React state와 분리된 순수 로직 계층을 가진다.
- Canvas는 렌더링 계층이다. 상태 소스가 되면 안 된다.
- 사운드, 풀스크린, storage는 모두 실패 가능한 side effect로 다룬다.

### Library decision

- **채택:** 기존 `canvas-confetti`, `framer-motion`
- **미채택:** 별도 canvas 프레임워크. 이유는 이번 범위가 2D 진행 링과 완료 연출 수준이라 native Canvas로 충분하기 때문이다.
- **미채택:** fullscreen wrapper. 이유는 native Fullscreen API만으로 처리 가능하고, 추가 wrapper의 이점이 작다.
- **미채택:** 별도 audio wrapper. 이유는 완료 사운드 1회 재생 수준이라 native audio로 충분하다.

## 18. Error & Rescue Registry

| Method / Codepath     | What can go wrong                     | Exception / Failure Class  | Rescued? | Rescue action                           | User sees                                     |
| --------------------- | ------------------------------------- | -------------------------- | -------- | --------------------------------------- | --------------------------------------------- |
| `storage.load()`      | malformed JSON                        | `StorageParseError`        | Y        | safe fallback + invalid payload discard | “저장 데이터가 손상되어 초기화됨” 배너        |
| `storage.save()`      | quota exceeded / private mode failure | `StorageWriteError`        | Y        | in-memory state 유지 + warning banner   | “변경사항이 저장되지 않을 수 있음”            |
| `engine.complete()`   | duplicate completion fired            | `DuplicateCompletionGuard` | Y        | idempotent guard                        | 중복 알림 없음                                |
| `notifyCompletion()`  | autoplay blocked                      | `AudioPermissionDenied`    | Y        | visual-only completion                  | 소리 없이 완료 애니메이션                     |
| `toggleFullscreen()`  | unsupported / rejected                | `FullscreenUnavailable`    | Y        | keep normal mode                        | “이 브라우저에서는 전체화면을 사용할 수 없음” |
| `task.delete(active)` | active task removed mid-session       | `ActiveTaskRemoved`        | Y        | detach task, keep session generic       | “활성 작업이 삭제되어 일반 세션으로 전환됨”   |

## 19. Failure Modes Registry

| Codepath               | Failure mode                 | Rescued? | Test? | User sees?               | Logged? |
| ---------------------- | ---------------------------- | -------- | ----- | ------------------------ | ------- |
| active session restore | hidden tab 복귀 후 시간 음수 | Y        | Y     | 정상 완료 또는 즉시 완료 | Y       |
| session completion     | 종료 이벤트 2회 발생         | Y        | Y     | 1회만 완료               | Y       |
| storage load           | JSON 손상                    | Y        | Y     | 초기화 배너              | Y       |
| storage save           | quota 초과                   | Y        | Y     | 저장 실패 배너           | Y       |
| task deletion          | 활성 task 삭제               | Y        | Y     | 일반 세션 fallback       | Y       |
| fullscreen request     | iOS/unsupported              | Y        | Y     | 안내 메시지              | N       |

## 20. 보안과 입력 검증

- 제목과 Task 이름은 trim 후 저장한다.
- 제목은 최대 60자, Task 이름은 최대 80자다.
- duration은 최소 1분, 최대 180분으로 제한한다.
- `NaN`, 음수, 빈 문자열은 허용하지 않는다.
- HTML은 그대로 렌더링하지 않고 plain text만 저장/표시한다.

## 21. 성능과 정확도

- countdown은 `Date.now()` 기준으로 계산한다.
- `requestAnimationFrame`은 화면 갱신용으로만 쓴다.
- `visibilitychange` 복귀 시 남은 시간을 재계산한다.
- storage save는 의미 있는 상태 전환 시점에만 수행한다. 매 프레임 저장하지 않는다.
- record/task list는 local-only라 데이터 크기가 작지만, 200개 이상 누적 시 최근순 렌더와 pagination 고려가 필요하다.

## 22. 테스트 전략

### 코드 경로 커버리지

```text
CODE PATH COVERAGE
===========================
[+] lib/tools/pomodoro/engine.ts
    ├── startSession()
    │   ├── valid duration -> running
    │   └── invalid duration -> input error
    ├── pauseSession()
    ├── resumeSession()
    ├── resetSession()
    └── completeSession()
        ├── save success
        └── save warning path

[+] lib/tools/pomodoro/storage.ts
    ├── load valid payload
    ├── load malformed payload
    ├── save success
    └── save failure

[+] components/tools/pomodoro/PomodoroTool.tsx
    ├── Quick Start default render
    ├── Task Mode empty state
    ├── mode switch with active session
    ├── task delete during active session
    └── completion overlay
```

### 사용자 흐름 커버리지

```text
USER FLOW COVERAGE
===========================
[+] Quick Start
    ├── first visit -> immediate start
    ├── pause -> resume
    ├── reset before completion
    └── completion -> restart

[+] Task Mode
    ├── empty state -> create first task
    ├── select task -> complete
    ├── edit task duration
    └── delete active task

[+] Recovery / permissions
    ├── hidden tab -> visible
    ├── refresh mid-session -> restore
    ├── sound denied
    └── fullscreen denied
```

### 권장 테스트 파일

| Test type | File                                           | What it proves                                |
| --------- | ---------------------------------------------- | --------------------------------------------- |
| Unit      | `lib/tools/pomodoro/engine.test.mjs`           | 상태 전이, 완료 idempotency, timestamp 계산   |
| Unit      | `lib/tools/pomodoro/storage.test.mjs`          | safe parse/fallback, migration, write failure |
| Unit      | `lib/tools/pomodoro/input-validation.test.mjs` | title/duration normalization                  |
| E2E       | `tests/pomodoro.quick-start.spec.ts`           | 첫 방문 즉시 시작, pause/resume/reset         |
| E2E       | `tests/pomodoro.task-mode.spec.ts`             | task 생성/선택/완료/삭제                      |
| E2E       | `tests/pomodoro.recovery.spec.ts`              | refresh 복구, hidden tab 복귀, 권한 거부      |

### 테스트 도구 결정

- 현재 저장소는 `node:test` 기반 `.test.mjs` 패턴이 이미 존재한다.
- 따라서 로직 테스트는 `node:test`로 맞춘다.
- 브라우저 사용자 흐름은 현재 전용 러너가 없으므로 `@playwright/test` 도입을 권장한다.

## 23. 배포와 롤아웃

### 롤아웃

1. `tool-config`에 뽀모도로 등록
2. `/tools/pomodoro` 페이지 배포
3. tools index 노출 확인
4. 모바일/데스크탑 smoke check

### 배포 직후 확인

- tools 목록 카드 노출
- breadcrumb / tool switcher 정상 동작
- 첫 진입 기본 타이머 노출
- start/pause/reset 정상
- refresh 복구 정상
- sound/fullscreen 거부 시 fallback 정상

### 롤백

- 긴급 시 `tool-config` 엔트리 제거로 목록 노출 차단
- route를 유지하더라도 내부 fallback 메시지로 전환 가능

## 24. Deferred to TODOS.md

- 장기 세션 통계와 streak UI
- 반복 프리셋과 템플릿 세션
- PWA 설치 최적화
- 외부 task/calendar 연동
- 다국어 및 공유 링크

## 25. CEO Dual Voices

### CODEX SAYS

- Codex outside voice는 현재 sandbox 제약으로 정상 응답을 얻지 못했다.
- 원인: 홈 디렉터리 state DB 쓰기 제한과 네트워크 초기화 실패.
- 상태: `[unavailable]`

### CLAUDE SUBAGENT

- 문제 정의가 해법 중심으로 써져 있어 핵심 Job이 흐려질 수 있다.
- KPI는 아직 가설이다.
- 6개월 뒤 “그냥 또 하나의 타이머”가 될 위험이 있다.
- 경쟁 우위는 기능 수보다 Zento 안에서의 즉시 사용 맥락으로 잡아야 한다.

### CEO CONSENSUS TABLE

```text
CEO DUAL VOICES — CONSENSUS TABLE
═══════════════════════════════════════════════════════════════
  Dimension                           Claude  Codex  Consensus
  ──────────────────────────────────── ─────── ─────── ─────────
  1. Premises valid?                   Issue   N/A    N/A
  2. Right problem to solve?           Issue   N/A    N/A
  3. Scope calibration correct?        Pass    N/A    N/A
  4. Alternatives sufficiently explored?Issue  N/A    N/A
  5. Competitive/product risks covered?Issue   N/A    N/A
  6. 6-month trajectory sound?         Issue   N/A    N/A
═══════════════════════════════════════════════════════════════
```

## 26. Design Review

### 초기 디자인 평점

**6/10**

이유: 화면 골격은 있었지만 첫 화면 우선순위, 상태별 UX, 완료 후 다음 행동이 빠져 있었다.

### DESIGN.md 상태

- 저장소에 `DESIGN.md`는 없다.
- 따라서 기존 tool shell과 universal UX 원칙에 맞춰 설계한다.

### Design findings applied

- 첫 화면 CTA 우선순위를 고정했다.
- loading / empty / error / success / partial 상태 표를 추가했다.
- Quick Start의 “입력 없이 시작” 흐름을 우선 경로로 바꿨다.
- canvas를 시각 효과로만 제한했다.

### Design litmus

| Pass                       | Before | After |
| -------------------------- | ------ | ----- |
| Information Architecture   | 5/10   | 8/10  |
| Interaction States         | 3/10   | 9/10  |
| User Journey               | 4/10   | 8/10  |
| AI Slop Risk               | 6/10   | 8/10  |
| Design System Alignment    | 5/10   | 7/10  |
| Responsive & Accessibility | 4/10   | 8/10  |
| Unresolved Decisions       | 3/10   | 7/10  |

### 남은 디자인 결정

- 완료 애니메이션 비주얼 스타일 구체화
- mobile에서 task panel을 drawer로 할지 inline collapse로 할지 결정

## 27. Eng Review

### Scope challenge

- 새 tool 1개와 공통 엔진 추가다.
- 예상 touch point는 8~10 파일 수준이다.
- 이 범위는 smell 경계에 걸치지만, A/B를 분리 구현하는 것보다 공통 엔진 1개가 더 낫다.

### Architecture ASCII

```text
app/tools/pomodoro/page.tsx
  -> metadata + tool shell
  -> PomodoroTool (client)
       -> timer engine
       -> storage adapter
       -> canvas renderer
       -> controls
       -> task panel
       -> record panel
```

### Eng findings applied

- `/tools/pomodoro`를 독립 페이지로 고정했다.
- 상태 머신을 명시했다.
- storage versioning/fallback을 추가했다.
- canvas를 DOM UI와 분리했다.
- 테스트 파일 계획을 추가했다.

### ENG CONSENSUS TABLE

```text
ENG DUAL VOICES — CONSENSUS TABLE
═══════════════════════════════════════════════════════════════
  Dimension                           Claude  Codex  Consensus
  ──────────────────────────────────── ─────── ─────── ─────────
  1. Architecture sound?               Issue   N/A    N/A
  2. Test coverage sufficient?         Issue   N/A    N/A
  3. Performance risks addressed?      Issue   N/A    N/A
  4. Security threats covered?         Issue   N/A    N/A
  5. Error paths handled?              Issue   N/A    N/A
  6. Deployment risk manageable?       Pass    N/A    N/A
═══════════════════════════════════════════════════════════════
```

## 28. Cross-Phase Themes

- **빠른 시작이 최우선이다.** CEO와 Design 모두 첫 사용자 행동이 폼 입력이 되면 안 된다고 봤다.
- **상태 머신과 복구가 핵심이다.** Design과 Eng 모두 구현자가 임의로 해석하면 깨질 부분이 많다고 봤다.
- **canvas는 주연이 아니라 연출이어야 한다.** Design과 Eng 모두 접근성과 상태 동기화 때문에 DOM 중심 설계를 권장했다.

## 29. Decision Audit Trail

| #   | Phase  | Decision                                    | Classification | Principle | Rationale                                                | Rejected              |
| --- | ------ | ------------------------------------------- | -------------- | --------- | -------------------------------------------------------- | --------------------- |
| 1   | CEO    | 듀얼 모드 유지, 기본 진입은 A 타입으로 고정 | Taste          | P1, P5    | 사용자 요구를 보존하면서 zero friction을 지킬 수 있다    | A/B 대등 노출         |
| 2   | CEO    | `/tools/pomodoro` 독립 페이지 채택          | Mechanical     | P4, P5    | 기존 tool registry와 SEO 구조 재사용이 가장 명확하다     | tools index 내부 탭   |
| 3   | CEO    | local-only 유지, 계정/동기화 제외           | Mechanical     | P3        | 현재 저장소와 출시 속도에 맞다                           | 서버 동기화           |
| 4   | Design | 첫 화면 CTA를 타이머보다 위계상 우선        | Mechanical     | P1        | 시작률 목표와 직접 연결된다                              | 모드 선택 우선 화면   |
| 5   | Design | 상태 표 추가                                | Mechanical     | P1        | 빈 상태/권한 거부/복구가 빠져 있으면 구현이 흔들린다     | happy path만 기술     |
| 6   | Design | canvas는 시각 효과 전용으로 제한            | Mechanical     | P5        | 접근성과 반응형, 조작성을 동시에 지킨다                  | canvas-only UI        |
| 7   | Eng    | timestamp 기반 엔진 채택                    | Mechanical     | P5        | 백그라운드 throttling에 더 강하다                        | tick 누적 방식        |
| 8   | Eng    | storage versioning + safe fallback 추가     | Mechanical     | P1        | localStorage 실패가 핵심 리스크다                        | 예시 수준 스키마 유지 |
| 9   | Eng    | `node:test` 유지, E2E만 Playwright 도입     | Mechanical     | P3, P4    | 기존 테스트 패턴을 재사용하면서 브라우저 흐름만 보강한다 | 전면 Vitest 전환      |
| 10  | CEO    | 리마인더/통계/PWA는 deferred                | Taste          | P2        | 지금 당장 제품 가치를 늘리지만 이번 blast radius 밖이다  | 이번 범위 포함        |

## 30. Completion Summary

```text
  +====================================================================+
  |            MEGA PLAN REVIEW — COMPLETION SUMMARY                   |
  +====================================================================+
  | Mode selected        | SELECTIVE EXPANSION                         |
  | System Audit         | Existing tool shell reusable, no DESIGN.md  |
  | Step 0               | Problem reframed around fast session start  |
  | Section 1  (Arch)    | 4 issues fixed                              |
  | Section 2  (Errors)  | 6 error paths mapped, 0 critical gaps       |
  | Section 3  (Security)| 2 issues fixed, 0 high severity open        |
  | Section 4  (Data/UX) | key edge cases mapped, 0 silent gaps open   |
  | Section 5  (Quality) | 3 issues fixed                              |
  | Section 6  (Tests)   | Diagram produced, test plan added           |
  | Section 7  (Perf)    | 2 risks fixed                               |
  | Section 8  (Observ)  | lightweight logging/warnings planned        |
  | Section 9  (Deploy)  | low rollout risk                            |
  | Section 10 (Future)  | Reversibility: 4/5                          |
  | Section 11 (Design)  | 5 issues fixed                              |
  +--------------------------------------------------------------------+
  | NOT in scope         | written (5 items)                           |
  | What already exists  | written                                     |
  | Dream state delta    | written                                     |
  | Error/rescue registry| written                                     |
  | Failure modes        | written                                     |
  | TODOS.md updates     | deferred list captured                      |
  | Outside voice        | subagent only / codex unavailable           |
  | Diagrams produced    | 5                                            |
  | Unresolved decisions | 2                                            |
  +====================================================================+
```

## 31. Final Approval Gate

### Plan summary

이 문서는 원래 PRD를 유지하되, 실제 구현 가능한 수준으로 다시 정리했다.  
핵심 변화는 `빠른 시작 우선`, `독립 route 고정`, `timestamp 기반 타이머`, `storage 복구`, `상태 표와 테스트 계획 추가`다.

### User challenges

- 없음. 사용자 요구의 핵심인 A/B 듀얼 모드는 유지했다.

### Taste decisions

1. **A/B 전환 UI**
   - 추천: 기본은 A 타입으로 진입하고, B 타입은 명시적 전환으로 제공
   - 대안: 첫 화면에서 A/B를 동일 비중으로 노출
   - 영향: 대안은 사용자 선택권은 넓지만 시작률이 떨어질 수 있다
2. **mobile task panel**
   - 추천: collapse/drawer 형태
   - 대안: inline full list
   - 영향: 대안은 구현은 단순하지만 timer stage 집중도가 떨어질 수 있다

### Review scores

- CEO: 문제 재정의와 범위 정리는 개선됨, 시장 가설은 검증 필요
- Design: 6/10 → 8/10
- Eng: 실행 가능 수준으로 상승, 상태/저장/테스트 공백 메움

### Deferred to backlog

- 장기 통계
- 리마인더
- PWA 최적화
- 외부 연동
- 다국어/공유

## 32. Approval Status

- 상태: APPROVED
- 승인 일시: 2026-03-31
- 승인 메모: 현재 PRD 기준으로 구현 단계 진입 가능
- 구현 시 후속 확인 필요:
  - KPI는 출시 후 실제 이벤트 데이터로 보정
  - 모바일 task panel 패턴 최종 확정
  - 완료 애니메이션 비주얼 상세 확정

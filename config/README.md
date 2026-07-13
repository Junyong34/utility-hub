# Configuration ownership

애플리케이션 설정과 실행 환경 해석은 이 디렉터리에서 관리합니다. 기능 코드는 `process.env`를 직접 읽지 않고 아래의 검증된 진입점을 사용합니다.

## Files

- `site.ts`: 브라우저에 공개해도 되는 서비스 이름, URL, 사이트 검증 ID, 웹 분석 ID
- `env/public.ts`: `NEXT_PUBLIC_*` 값의 기본값과 정규화
- `env/ga4.server.ts`: GA4 서버 자격 증명의 지연 검증과 private key 정규화
- `runtime/server.ts`: 개발, 번들 분석, Netlify/AWS 실행 환경과 private finance 저장 경로 해석

`.server.ts` 파일은 client 또는 UI 진입점에서 import하거나 다시 export하지 않습니다. 서버 자격 증명 오류에는 환경 변수 이름만 포함하며 실제 값은 포함하지 않습니다.

## Root adapters

프레임워크가 고정된 위치에서 읽는 설정 파일은 루트에 둡니다.

- `next.config.ts`: Next.js 이미지, 빌드, 보안 응답 헤더의 canonical owner
- `netlify.toml`: Netlify 빌드 환경과 `/og-images/*` 정적 자산 캐시 정책만 소유
- `playwright*.config.ts`: 테스트 서버와 테스트 종류별 실행 범위
- `tsconfig.json`, `eslint.config.mjs`, `components.json`: 컴파일, 경계 규칙, shadcn 생성 경로

같은 보안 헤더를 `next.config.ts`와 `netlify.toml`에 중복 선언하지 않습니다. Netlify Next.js adapter가 애플리케이션 응답 헤더를 전달하며, 배포 플랫폼에만 필요한 정적 파일 정책만 `netlify.toml`에 둡니다.

## Environment files

`.env`와 `.env.*`는 비공개 파일로 취급하며 Git에서 제외합니다. 커밋 가능한 예시는 `.env.example` 하나뿐입니다. 실제 `.env` 파일을 문서 생성이나 검증 과정에서 읽거나 수정하지 않습니다.

독립 유지보수 스크립트가 자체 프로세스로 실행되어야 하는 경우에는 직접 환경 접근을 허용할 수 있습니다. 이 예외는 해당 스크립트 문서에 입력값과 노출 위험을 명시해야 하며, 애플리케이션 런타임 코드로 재사용하지 않습니다.

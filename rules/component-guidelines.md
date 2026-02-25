# Component Guidelines

이 문서는 React 컴포넌트 작성 시의 가이드라인을 설명합니다.

## 컴포넌트 구조
기본적으로 아래와 같은 구조를 권장합니다.
1. `"use client"` 지시어 (필요 시)
2. Imports (React, external libs, internal components, hooks, utils, types 순)
3. Types/Interfaces 정의
4. Component 정의
5. (필요 시) 내부 Helper functions

## 스타일링
- Tailwind CSS v4를 사용합니다.
- 복잡한 클래스 조합에는 `clsx`와 `tailwind-merge`를 사용하여 가독성을 높입니다.
- 디자인 시스템의 일관성을 위해 `/components/ui` 하위의 공통 컴포넌트를 우선적으로 활용합니다.

## 컴포넌트 분리 기준
- 재사용성이 높은 작은 단위의 UI는 `/components/ui`에 위치시킵니다.
- 특정 페이지의 비즈니스 로직을 포함하는 복합 컴포넌트는 해당 페이지의 도메인 폴더(예: `/components/blog`, `/components/home`)에 위치시킵니다.
- 전역 레이아웃 컴포넌트(헤더, 네비게이션)는 `/components/layout`에 위치시킵니다.
- 상태 관리가 복잡하거나 인터랙션이 많은 부분은 Client Component로 분리하여 서버 컴포넌트의 부담을 줄입니다.

## 네비게이션 컴포넌트 규칙
- 네비게이션 메뉴 설정은 `nav-config.ts`로 분리하여 중복 방지
- 데스크톱과 모바일 네비게이션을 별도 컴포넌트로 관리
- 반응형 디자인: 데스크톱(Header), 모바일(BottomNav)로 분리

# PRD: 대출 계산기 URL 상태 관리 및 링크 공유 기능

- 문서 상태: Implementation Plan v1
- 작성일: 2026-03-10
- 대상 서비스: Zento Tools
- 대상 경로: `/tools/loan-calculator`
- 문서 목적: nuqs 라이브러리를 활용한 URL 상태 관리 및 계산 결과 공유 기능 구현

## 1. 배경

현재 대출 계산기와 중도상환수수료 계산기는 `useState`로 상태를 관리하고 있어, 사용자가 계산한 결과를 다른 사람과 공유하거나 나중에 다시 확인할 수 없습니다.

프로젝트에 이미 설치된 nuqs (v2.8.8) 라이브러리를 활용하여 URL 쿼리 파라미터로 상태를 관리하면:
- 브라우저 URL에 계산 조건이 자동으로 저장됨
- URL 복사만으로 계산 결과를 공유 가능
- 브라우저 뒤로가기/앞으로가기 지원
- 북마크 가능한 계산 결과

## 2. 구현 가능성

✅ **완전히 구현 가능합니다.**

- nuqs@2.8.8이 이미 설치됨
- `LottoRecommendProvider`에서 동일한 패턴 사용 중
- Date 타입 처리: `parseAsIsoDateTime` 활용
- URL 길이 제한: 대출(~150자), 중도상환(~250자)으로 안전

## 3. 목표

### 주요 목표
1. 모든 입력 상태를 URL에 동기화
2. URL만으로 계산 결과를 복원 가능
3. "링크 복사" 버튼으로 간편하게 공유
4. 브라우저 히스토리 네비게이션 지원

### 비목표
1. 단축 URL 서비스 (Phase 3)
2. 소셜 미디어 공유 버튼 (Phase 3)
3. 계산 히스토리 저장 (별도 기능)

## 4. URL 파라미터 설계

### 대출 계산기 (`/tools/loan-calculator`)

| 파라미터 | 타입 | 설명 | 예시 |
|---------|------|------|------|
| `principal` | number | 대출 원금 | `100000000` |
| `rate` | number | 연 이자율 (%) | `3.5` |
| `term` | number | 상환 기간 (숫자) | `30` |
| `termMode` | 'year' \| 'month' | 기간 단위 | `year` |
| `method` | 'equal-payment' \| 'equal-principal' \| 'lump-sum' | 상환 방법 | `equal-payment` |

**URL 예시:**
```
/tools/loan-calculator?principal=100000000&rate=3.5&term=30&termMode=year&method=equal-payment
```

### 중도상환수수료 계산기 (탭 전환 시)

| 파라미터 | 타입 | 설명 | 예시 |
|---------|------|------|------|
| `tab` | 'loan-calculator' \| 'prepayment-fee' | 활성 탭 | `prepayment-fee` |
| `amount` | number | 상환 금액 | `50000000` |
| `feeRate` | number | 수수료율 (%) | `1.5` |
| `loanDate` | ISO date | 대출일자 | `2024-01-01` |
| `repaymentDate` | ISO date | 상환일자 | `2024-06-01` |
| `maturityDate` | ISO date | 만기일자 | `2034-01-01` |
| `exemptionYears` | number | 면제기간 (년) | `3` |

**URL 예시:**
```
/tools/loan-calculator?tab=prepayment-fee&amount=50000000&feeRate=1.5&loanDate=2024-01-01&repaymentDate=2024-06-01&maturityDate=2034-01-01&exemptionYears=3
```

## 5. 기술 설계

### 5.1 URL 파서 정의 (`parsers.ts`)

```typescript
import { createParser, parseAsInteger, parseAsFloat, parseAsStringLiteral, parseAsIsoDateTime } from 'nuqs';
import type { RepaymentMethod } from '@/lib/tools/loan-calculator';

// 대출 계산기 파서
export const LOAN_QUERY_PARSERS = {
  principal: parseAsInteger.withDefault(0),
  rate: parseAsFloat.withDefault(0),
  term: parseAsInteger.withDefault(0),
  termMode: parseAsStringLiteral(['year', 'month'] as const),
  method: parseAsStringLiteral([
    'equal-payment',
    'equal-principal',
    'lump-sum'
  ] as const).withDefault('equal-payment'),
};

// 중도상환 계산기 파서
export const PREPAYMENT_QUERY_PARSERS = {
  tab: parseAsStringLiteral(['loan-calculator', 'prepayment-fee'] as const),
  amount: parseAsInteger.withDefault(0),
  feeRate: parseAsFloat.withDefault(0),
  loanDate: parseAsIsoDateTime,
  repaymentDate: parseAsIsoDateTime,
  maturityDate: parseAsIsoDateTime,
  exemptionYears: parseAsInteger.withDefault(0),
};
```

### 5.2 Hook 마이그레이션 전략

**기존 (useState):**
```typescript
const [principal, setPrincipal] = useState('0');
const [annualRate, setAnnualRate] = useState('');
```

**변경 후 (nuqs):**
```typescript
const [queryState, setQueryState] = useQueryStates(LOAN_QUERY_PARSERS);

// 읽기
const principal = queryState.principal?.toString() || '0';
const annualRate = queryState.rate?.toString() || '';

// 쓰기
const handlePrincipalChange = (value: string) => {
  const numValue = parseFormattedNumber(value);
  setQueryState({ principal: numValue });
};
```

### 5.3 로컬 상태 유지

URL에 저장하지 않을 상태 (UI 전용):
- `showResults`: 결과 Bottom Sheet 표시 여부
- `hasCalculated`: 계산 실행 여부
- `principalDisplay`: 포맷팅된 표시 값 (실제 값에서 파생)

이들은 계속 `useState`로 관리합니다.

### 5.4 공유 기능 UI

**ShareButton 컴포넌트:**
- 위치: 계산 결과 카드 하단
- 기능: 현재 URL 클립보드 복사
- 피드백: Toast 메시지 표시

**ShareDialog 컴포넌트 (Phase 2):**
- URL 복사
- QR 코드 생성
- 소셜 미디어 공유 (선택)

## 6. 구현 단계

### Phase 1: 핵심 기능 (필수)

1. **URL 파서 정의**
   - `components/tools/loan-calculator/hooks/parsers.ts` 생성
   - 대출 계산기, 중도상환 계산기 파서 정의

2. **useLoanCalculator 마이그레이션**
   - `useQueryStates` 도입
   - URL 상태와 로컬 상태 분리
   - 기존 API 유지 (하위 호환성)

3. **기본 공유 버튼**
   - `components/tools/loan-calculator/components/ShareButton.tsx` 생성
   - URL 복사 기능
   - 클립보드 API 활용

### Phase 2: 고급 기능 (선택)

4. **usePrepaymentCalculator 마이그레이션**
   - Date 타입 처리
   - ISO 8601 직렬화

5. **공유 다이얼로그**
   - `ShareDialog.tsx` 생성
   - QR 코드 생성

### Phase 3: 추가 기능 (선택)

6. **소셜 미디어 공유**
   - 카카오톡, 트위터, 페이스북 공유 버튼
   - OG 메타 태그 최적화

7. **공유 통계 추적**
   - Google Analytics 이벤트

## 7. 주요 기술 결정

### 7.1 Date 직렬화 형식

- **선택**: ISO 8601 날짜 형식 (`YYYY-MM-DD`)
- **이유**:
  - 표준 형식으로 파싱 간편
  - URL에서 가독성 좋음
  - 타임존 이슈 없음

### 7.2 히스토리 관리

- **선택**: `shallow: true` 옵션 사용
- **이유**:
  - 페이지 리로드 없이 URL 변경
  - 브라우저 뒤로가기 지원
  - SPA 경험 유지

### 7.3 기본값 처리

- **선택**: `.withDefault()` 메서드 사용
- **이유**:
  - URL 파라미터가 없을 때 자동으로 기본값 사용
  - 기존 사용자 경험 유지
  - 깔끔한 URL (불필요한 파라미터 제거)

## 8. 예상 효과

### 사용자 경험
- ✅ 계산 결과를 URL만으로 공유 가능
- ✅ 브라우저 뒤로가기/앞으로가기 동작
- ✅ 북마크로 자주 사용하는 계산 저장
- ✅ 모바일에서 링크 공유 용이

### 개발자 경험
- ✅ 상태 관리 로직 단순화
- ✅ 디버깅 용이 (URL에서 상태 확인)
- ✅ E2E 테스트 시나리오 작성 간편

### 비즈니스 가치
- ✅ 사용자 재방문율 증가
- ✅ 바이럴 효과 (공유를 통한 유입)
- ✅ 사용 패턴 분석 가능 (URL 파라미터 추적)

## 9. 위험 요소 및 대응

### 9.1 URL 길이 제한

- **위험**: 브라우저 URL 길이 제한 (2048자)
- **현황**: 대출(~150자), 중도상환(~250자)
- **대응**: 문제 없음. 필요시 Base64 압축 고려

### 9.2 개인정보 노출

- **위험**: URL에 민감한 정보 노출
- **현황**: 대출 금액, 이자율 등 일반적인 계산 조건만 포함
- **대응**: 실명, 주민번호 등 개인정보는 포함하지 않음

### 9.3 SEO 영향

- **위험**: 쿼리 파라미터가 SEO에 부정적 영향
- **현황**: canonical URL은 파라미터 없는 버전 유지
- **대응**: 공유된 URL은 noindex 처리 불필요 (동적 콘텐츠)

### 9.4 브라우저 호환성

- **위험**: 구형 브라우저에서 동작 불가
- **현황**: Next.js 16 + React 19 기준
- **대응**: nuqs가 폴리필 제공

## 10. 테스트 계획

### 단위 테스트
- [ ] URL 파서 정상 동작
- [ ] 잘못된 파라미터 처리
- [ ] 기본값 적용

### 통합 테스트
- [ ] URL → 상태 복원
- [ ] 상태 → URL 동기화
- [ ] 공유 버튼 클릭 → 클립보드 복사

### E2E 테스트
- [ ] 사용자가 값 입력 → URL 변경 확인
- [ ] 공유 URL 방문 → 폼 자동 채움 확인
- [ ] 브라우저 뒤로가기 → 이전 상태 복원 확인

## 11. 릴리스 계획

### Phase 1 출시 (MVP)
- 대출 계산기 URL 동기화
- 기본 공유 버튼 (URL 복사)
- 릴리스 예상: 1-2일

### Phase 2 출시 (Enhanced)
- 중도상환 계산기 URL 동기화
- 공유 다이얼로그 + QR 코드
- 릴리스 예상: +1일

### Phase 3 출시 (Premium)
- 소셜 미디어 공유
- 공유 통계 추적
- 릴리스 예상: 필요시

## 12. 참고 자료

- nuqs 공식 문서: https://nuqs.47ng.com/
- 프로젝트 내 참고 코드: `components/lotto/LottoRecommend/LottoRecommendProvider.tsx`
- URL 설계 패턴: [Web.dev - URL design](https://web.dev/url-design/)

---

## 변경 이력

- 2026-03-10: 초안 작성

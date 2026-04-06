# GA Event Tracking Strategy

## 목표

GA4에서 페이지뷰만 보는 수준을 넘어서, `어떤 버튼이 실제로 다음 행동을 만들었는지` 추적할 수 있게 이벤트 체계를 설계한다.

이 문서는 다음을 고정한다.

1. 어떤 버튼을 추적할지
2. 어떤 이벤트 이름을 쓸지
3. 어떤 파라미터를 보낼지
4. GA4 Admin에서 어떤 커스텀 dimension을 등록할지

## 현재 상태

현재 저장소는 `app/layout.tsx`에서 GA4 기본 `gtag('config', 'G-KG82C2B3TH')`만 설정한다.

즉 현재는 기본 page view는 잡히지만, `버튼 클릭`, `도구 계산`, `검색`, `공유` 같은 사용자 행동은 구조적으로 수집되지 않는다.

관련 파일:

- `app/layout.tsx`
- `components/layout/desktop-nav.tsx`
- `components/layout/bottom-nav.tsx`
- `components/ui/floating-share-button.tsx`
- `components/home/hero-split-section.tsx`
- `components/home/dashboard-section.tsx`
- `components/blog/BlogHeroSection.tsx`
- `components/blog/CategoryFilter.tsx`
- `components/blog/PostCard.tsx`
- `components/tools/ToolsPageClient.tsx`
- `components/tools/ToolSwitcher.tsx`

## 설계 원칙

1. 추천 이벤트가 있으면 GA4 추천 이벤트를 먼저 쓴다.
2. 제품 의미가 강한 버튼만 커스텀 이벤트를 쓴다.
3. free-text와 PII는 보내지 않는다.
4. 같은 의미의 버튼은 같은 이벤트 이름을 공유한다.
5. 이벤트는 `이 버튼이 다음 행동을 만들었는가`를 답할 수 있어야 한다.

## 이벤트 계층

### Level 1, GA4 추천 이벤트

가능하면 아래 추천 이벤트를 우선 사용한다.

- `search`
- `view_search_results`
- `select_content`
- `share`

### Level 2, 제품 전용 커스텀 이벤트

추천 이벤트로 의미가 부족한 경우만 추가한다.

- `nav_click`
- `filter_select`
- `calculator_submit`
- `calculator_reset`
- `tool_switch`
- `share_menu_open`

## 공통 파라미터 규칙

모든 클릭 이벤트에 공통으로 붙일 수 있는 최소 파라미터:

- `source_page`
- `source_section`
- `destination_path`
- `ui_surface`

콘텐츠 클릭 계열은 추가:

- `content_type`
- `content_id`
- `content_title`

도구 계열은 추가:

- `tool_id`
- `tool_category`

필터 계열은 추가:

- `filter_type`
- `filter_value`

검색 계열은 추가:

- `search_area`
- `query_length`
- `results_count`

공유 계열은 추가:

- `share_method`
- `share_target_type`

## 보내지 말아야 할 데이터

- 이메일
- 전화번호
- 사용자 입력 원문 전체
- 주민번호/주소 같은 민감정보
- 자유 텍스트 메모

검색어는 원문 대신 아래만 보낸다.

- `query_length`
- `results_count`
- 필요하면 `search_area`

## Phase A 핵심 버튼 매핑

### 1. 내비게이션

#### Desktop / Bottom nav 링크

대상 파일:

- `components/layout/desktop-nav.tsx`
- `components/layout/bottom-nav.tsx`

이벤트:

- `nav_click`

파라미터:

- `nav_type`: `desktop` | `bottom`
- `nav_label`
- `destination_path`
- `source_page`

### 2. 홈 CTA

#### 홈 히어로 CTA

대상 파일:

- `components/home/hero-split-section.tsx`

버튼:

- `블로그 읽기`
- `도구 사용하기`
- 서비스 카드 4종

이벤트:

- `select_content`

파라미터:

- `content_type`: `home_cta` | `service_card`
- `content_id`
- `content_title`
- `source_section`: `hero`
- `destination_path`

#### 최신 가이드 / 추천 콘텐츠 카드

대상 파일:

- `components/home/dashboard-section.tsx`

이벤트:

- `select_content`

파라미터:

- `content_type`: `dashboard_post` | `dashboard_tool`
- `content_id`
- `content_title`
- `source_section`: `latest_items` | `hot_items`
- `destination_path`

### 3. 블로그 탐색

#### 블로그 검색 버튼

대상 파일:

- `components/blog/BlogHeroSection.tsx`

이벤트:

- `search`
- `view_search_results`

파라미터:

- `search_area`: `blog`
- `query_length`
- `results_count`
- `source_page`: `blog`

#### 블로그 카테고리 탭

대상 파일:

- `components/blog/CategoryFilter.tsx`

이벤트:

- `filter_select`

파라미터:

- `filter_type`: `blog_category`
- `filter_value`
- `source_page`: `blog`

#### 블로그 포스트 카드

대상 파일:

- `components/blog/PostCard.tsx`

이벤트:

- `select_content`

파라미터:

- `content_type`: `blog_post`
- `content_id`
- `content_title`
- `category_slug`
- `destination_path`

### 4. 도구 허브 탐색

#### 도구 검색 버튼

대상 파일:

- `components/tools/ToolsPageClient.tsx`

이벤트:

- `search`
- `view_search_results`

파라미터:

- `search_area`: `tools`
- `query_length`
- `results_count`

#### 도구 카테고리 pill

이벤트:

- `filter_select`

파라미터:

- `filter_type`: `tool_category`
- `filter_value`
- `source_page`: `tools`

#### 주요 도구 / 전체 도구 카드

이벤트:

- `select_content`

파라미터:

- `content_type`: `tool_card`
- `content_id`: `tool_id`
- `content_title`
- `tool_category`
- `source_section`: `featured_tools` | `all_tools`
- `destination_path`

#### ToolSwitcher

대상 파일:

- `components/tools/ToolSwitcher.tsx`

이벤트:

- `tool_switch`

파라미터:

- `from_tool_id`
- `to_tool_id`
- `source_page`

### 5. 계산기 버튼

#### 계산하기 버튼

대상 예시:

- `components/tools/loan-calculator/components/LoanInputForm.tsx`
- `components/tools/dsr-calculator/DsrCalculatorForm.tsx`
- `components/tools/savings-calculator/components/*`
- `components/tools/home-buying-funds-calculator/*`

이벤트:

- `calculator_submit`

파라미터:

- `calculator_id`
- `tool_category`
- `source_page`
- `input_mode` if applicable
- `has_shareable_url`: `true` | `false`

중요:

이 이벤트는 버튼 클릭 시점이 아니라, 실제 계산이 수행된 시점에 보내는 편이 낫다.

#### 초기화 버튼

이벤트:

- `calculator_reset`

파라미터:

- `calculator_id`
- `source_page`

#### 계산 결과 공유 버튼

대상 예시:

- `components/tools/loan-calculator/components/ShareButton.tsx`
- `components/tools/home-buying-funds-calculator/components/ShareButton.tsx`

이벤트:

- `share`

파라미터:

- `share_method`: `copy_link`
- `share_target_type`: `calculator_result`
- `calculator_id`

### 6. 공용 공유 버튼

대상 파일:

- `components/ui/floating-share-button.tsx`

이벤트:

- `share_menu_open`
- `share`

파라미터:

- `source_page`
- `share_method`: `native_share` | `copy_link`
- `share_target_type`: `page`

### 7. 리브랜딩 후 추가 예정 버튼

#### Places 허브

예정 이벤트:

- `select_content` for region cards
- `filter_select` for region/age/weather filters
- `select_content` for place cards

추가 파라미터:

- `region_slug`
- `age_band`
- `place_id`
- `place_category`

#### Benefits 허브

예정 이벤트:

- `select_content` for benefit cards
- `filter_select` for benefit category tabs

## Phase A 최소 이벤트 세트

처음부터 전부 붙이지 않는다.

Phase A 최소 세트:

1. `nav_click`
2. 홈 CTA `select_content`
3. 블로그 검색 `search`
4. 도구 검색 `search`
5. 도구 카드 `select_content`
6. `calculator_submit`
7. `share`

이 7개면 최소한 아래 질문에 답할 수 있다.

- 사용자는 어디서 유입 후 어디로 이동하는가?
- 글에서 도구로 실제 넘어가는가?
- 어떤 도구가 진짜 쓰이는가?
- 공유는 어디서 일어나는가?

## 커스텀 dimension 후보

GA4 Admin에서 우선 등록할 이벤트 스코프 커스텀 dimension:

1. `source_page`
2. `source_section`
3. `destination_path`
4. `content_type`
5. `content_id`
6. `tool_id`
7. `tool_category`
8. `filter_type`
9. `filter_value`
10. `search_area`
11. `share_method`
12. `share_target_type`

`results_count`와 `query_length`는 우선 이벤트 파라미터로만 두고, 보고서 필요성이 생기면 추가 등록한다.

## 분석 질문과 대응 이벤트

### 질문 1

`홈에서 무엇을 가장 많이 누르는가?`

필요 이벤트:

- `select_content` on home CTAs

### 질문 2

`블로그에서 도구로 넘어가는가?`

필요 이벤트:

- `select_content` on blog cards
- `calculator_submit`
- `tool_switch`

### 질문 3

`어떤 도구가 실제 가치가 있는가?`

필요 이벤트:

- `select_content` on tool cards
- `calculator_submit`
- `share` on calculator results

### 질문 4

`검색이 탐색을 돕는가?`

필요 이벤트:

- `search`
- `view_search_results`

## 구현 원칙

1. `window.gtag` 직접 호출을 여기저기 흩뿌리지 않는다.
2. `lib/analytics/gtag.ts` 같은 클라이언트 헬퍼를 만들어 중앙화한다.
3. 이벤트 이름과 파라미터 key는 하드코딩하지 않고 상수로 관리한다.
4. 내부 페이지(`/tools/og-image-studio` 같은 운영 화면)는 기본 추적 대상에서 제외한다.

## 신뢰도 메모

이 전략은 현재 저장소의 버튼 구조와 GA4 추천 이벤트 관례를 바탕으로 정리했다.  
다만 최종 이벤트 이름과 커스텀 dimension 개수는 실제 보고서 사용 방식에 따라 더 줄이거나 나눌 수 있다. 이 부분은 정확하지 않을 수 있다.

## Brief Conclusion

Phase A에서는 `nav`, `home CTA`, `search`, `tool click`, `calculator submit`, `share`만 잘 잡아도 제품 판단에 충분한 분석 기반이 생긴다.

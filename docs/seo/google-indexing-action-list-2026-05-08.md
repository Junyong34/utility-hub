# Google 색인 조치 목록 - 2026-05-08

## 기준

- 주요 공개 URL은 `200 OK`, `index, follow`, 자기 canonical이어야 한다.
- `/blog?tag=*`, `/places?*` 같은 필터 URL은 대표 URL(`/blog`, `/places`)로 canonical 처리한다.
- `/places?page=*`, `/places/{region}?page=*` 같은 비필터 페이지네이션 URL은 장소 상세 URL 발견을 위한 색인 가능 경로로 유지한다.
- `favicon.ico?...`, `/finance/**`, `/tools/home-check`는 페이지 색인 목표에서 제외한다.

## Search Console 수동 색인 요청 우선순위

아래 URL은 배포 후 Search Console의 `URL 검사`에서 `실제 URL 테스트`를 실행한 뒤 `색인 생성 요청`을 보낸다.

1. `https://www.zento.kr/benefits`
2. `https://www.zento.kr/tools/home-buying-funds-calculator`
3. `https://www.zento.kr/tools/dsr-calculator`
4. `https://www.zento.kr/tools/pomodoro`
5. `https://www.zento.kr/tools/last-digit-game`
6. `https://www.zento.kr/blog/benefits/2026-parenting-benefits-guide`
7. `https://www.zento.kr/blog/consumer/kca-bodywash-quality-comparison`
8. `https://www.zento.kr/blog/consumer/kca-budget-coffee-brand-satisfaction`
9. `https://www.zento.kr/blog/investment/loan-calculator-total-interest-guide`
10. `https://www.zento.kr/blog/investment/savings-calculator-guide`
11. `https://www.zento.kr/blog/lotto/ai-lotto-number-guide`
12. `https://www.zento.kr/blog/parking/incheon-airport-parking-guide`
13. `https://www.zento.kr/blog/parking/parking-cost-saving-guide`

## 정상 제외로 볼 URL

아래 URL은 사용자를 위한 필터 상태 URL이다. 대표 URL이 따로 있으므로 색인 제외가 정상이다.

- `https://www.zento.kr/blog?tag=savings` -> `https://www.zento.kr/blog`
- `https://www.zento.kr/blog?tag=government` -> `https://www.zento.kr/blog`
- `https://www.zento.kr/blog?tag=regional` -> `https://www.zento.kr/blog`
- `https://www.zento.kr/places?indoor=true` -> `https://www.zento.kr/places`
- `https://www.zento.kr/places?rain=true` -> `https://www.zento.kr/places`
- `https://www.zento.kr/places?age=1-3y` -> `https://www.zento.kr/places`
- `https://www.zento.kr/places?free=true` -> `https://www.zento.kr/places`

## 장소 페이지네이션 색인 규칙

- 무한스크롤은 사용자 경험용으로 유지하되, 장소 목록 하단에는 사용자에게 보이는 페이지네이션 링크를 둔다.
- 페이지네이션 링크는 `<a href>`로 렌더링해야 하며, `display:none`, `hidden`, `opacity:0`, 화면 밖 배치처럼 사용자에게 숨기는 방식으로 만들지 않는다.
- 사이트맵에는 필터 없는 페이지네이션 URL만 포함한다.
  - 예: `https://www.zento.kr/places?page=2`
  - 예: `https://www.zento.kr/places/seoul?page=2`
- 필터 URL은 공유/탐색용으로만 두고 대표 URL로 canonical 처리한다.
  - 예: `https://www.zento.kr/places?free=true&page=2` -> `https://www.zento.kr/places`
  - 예: `https://www.zento.kr/places/seoul?free=true&page=2` -> `https://www.zento.kr/places/seoul`

## 배포 후 확인

1. `https://www.zento.kr/sitemap.xml`이 200으로 열리는지 확인한다.
2. `https://www.zento.kr/robots.txt`에 `Sitemap: https://www.zento.kr/sitemap.xml`이 있는지 확인한다.
3. 위 우선순위 URL에서 canonical이 자기 자신인지 확인한다.
4. Search Console에서 sitemap을 다시 제출한다.
5. 3-7일 뒤 `페이지 색인 생성` 보고서에서 제외 사유가 줄었는지 확인한다.

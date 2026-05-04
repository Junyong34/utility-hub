# 수도권 아동 동반 장소 리서치

기준일: `2026-04-07`

이 디렉터리는 `/places` 구현 전 단계에서 참고하는 `md 리서치 문서` 모음입니다. 이번 정리는 `서울`, `경기북부`, `경기남부`, `인천`을 기준으로 나눴고, 같은 장소가 여러 문서에 반복되지 않도록 `지역별 canonical 문서` 중심으로 다시 정리했습니다.

## 파일 구성

- [`seoul-outing-facilities.md`](./seoul-outing-facilities.md)
- [`seoul-family-friendly-cafes.md`](./seoul-family-friendly-cafes.md)
- [`seoul-private-kids-cafes.md`](./seoul-private-kids-cafes.md)
- [`seoul-local-kids-cafes-semi-verified.md`](./seoul-local-kids-cafes-semi-verified.md)
- [`seoul-baby-cafes.md`](./seoul-baby-cafes.md)
- [`large-kids-cafes-seoul-incheon-gyeonggi.md`](./large-kids-cafes-seoul-incheon-gyeonggi.md)
- [`gyeonggi-north-outing-facilities.md`](./gyeonggi-north-outing-facilities.md)
- [`gyeonggi-north-family-friendly-cafes.md`](./gyeonggi-north-family-friendly-cafes.md)
- [`gyeonggi-north-private-kids-cafes.md`](./gyeonggi-north-private-kids-cafes.md)
- [`gyeonggi-north-local-kids-cafes-semi-verified.md`](./gyeonggi-north-local-kids-cafes-semi-verified.md)
- [`gyeonggi-north-baby-cafes.md`](./gyeonggi-north-baby-cafes.md)
- [`gyeonggi-south-outing-facilities.md`](./gyeonggi-south-outing-facilities.md)
- [`gyeonggi-south-family-friendly-cafes.md`](./gyeonggi-south-family-friendly-cafes.md)
- [`gyeonggi-south-private-kids-cafes.md`](./gyeonggi-south-private-kids-cafes.md)
- [`gyeonggi-south-local-kids-cafes-semi-verified.md`](./gyeonggi-south-local-kids-cafes-semi-verified.md)
- [`gyeonggi-south-baby-cafes.md`](./gyeonggi-south-baby-cafes.md)
- [`incheon-outing-facilities.md`](./incheon-outing-facilities.md)
- [`incheon-baby-cafes.md`](./incheon-baby-cafes.md)

## 기준 문서

- [`07-data-sourcing-and-trust-model.md`](../../superpowers/specs/parenting-guide-rebrand/07-data-sourcing-and-trust-model.md)
- [`03-content-model-and-taxonomy.md`](../../superpowers/specs/parenting-guide-rebrand/03-content-model-and-taxonomy.md)
- [`20-source-ingestion-and-verification-plan.md`](../../superpowers/plans/parenting-guide-rebrand/execution/20-source-ingestion-and-verification-plan.md)

## 공통 규칙

- `공식 링크 필수`
- `폐업/휴업/이전 중 표시가 있으면 제외`
- `검증일 명시`
- `상업형은 최근 공식 신호 필수`
- `관광/지도/블로그는 발견용만 허용`
- `네이버지도는 위치 확인용 편의 링크이며 운영 사실의 근거로 쓰지 않음`
- `네이버지도 링크는 직접 장소 상세 URL 우선, 없으면 이름+주소 기반 검색 URL 허용`
- `영아 친화 베이비카페 문서는 12개월 미만 아이가 머물 수 있는 공식 근거가 있을 때만 확정 후보에 넣음`

## 검증 상태

- `official_verified`: 공식 홈페이지, 공식 예약 페이지, 공식 기관 페이지에서 운영 신호를 확인함
- `semi_verified`: 공식 SNS 또는 공식 공지로는 확인되지만 핵심 운영 정보 일부가 약함
- `discovery_only`: 발견은 되었으나 공식 검증이 약해서 발행용 목록에 넣지 않음
- `exclude`: 노키즈존, 성인 전용, 대관 전용, 특정 시간 미성년자 제한, 휴업/폐업/이전, 공식 링크 소실

이번 정리에서는 통합 문서(`seoul-gyeonggi-*`)를 삭제하고 지역별 문서로만 남겼습니다. 같은 장소는 한 문서에서만 관리하는 것을 원칙으로 합니다. 다만 `local-*-semi-verified` 문서는 예외적으로 준공식 후보군을 따로 보관하는 용도입니다.

`seoul-local-kids-cafes-semi-verified.md`, `gyeonggi-north-local-kids-cafes-semi-verified.md`, `gyeonggi-south-local-kids-cafes-semi-verified.md`는 예외적으로 `로컬 단독 키즈카페를 위한 준공식 검증 보조 문서`입니다. 이 문서들은 `official_verified`와 같은 신뢰도로 보지 않고, 발행 전 재검수 대상 후보군으로 읽어야 합니다.

## 지역 구분 메모

- 서울: 서울특별시 전체
- 경기북부: 고양, 의정부, 양주, 동두천, 연천, 남양주 등 북부권
- 경기남부: 과천, 성남, 수원, 용인, 화성, 안성, 군포, 안산, 부천, 광명, 여주, 양평 등 남부권
- 인천: 중구, 동구, 미추홀구, 연수구, 남동구, 계양구, 서구, 강화군, 옹진군 등 인천광역시 전체

이 구분은 이번 리서치 정리용 편집 기준입니다. 실제 `/places` 구현 시에는 슬러그 정책과 카드 데이터 구조에 맞춰 재정리할 수 있습니다.

## 수집 방식 메모

- 원래 우선 도구는 `firecrawl`이었지만, 이번 작업 시점의 로컬 셸에서는 `firecrawl`, `node`, `npx`, `pnpm`이 PATH에 없었습니다.
- 따라서 이번 차수 문서는 `웹 브라우징 + 공식 사이트 직접 확인 + 네이버지도 보완 링크` 방식으로 작성했습니다.
- 이 판단은 셸 확인 결과 기준이라 신뢰도는 높습니다.

## 읽는 법

- `운영중 근거`는 왜 현재 운영 중이라고 판단했는지 적은 한 줄 메모입니다.
- `네이버지도`는 사용자의 위치 탐색 편의를 위한 링크이며, 문서의 사실 검증은 `공식링크`와 `공식 예약·SNS`를 기준으로 읽어야 합니다.
- `semi_verified` 보조 문서는 당근 업체 프로필, 네이버 플레이스/예약, 공식 인스타 같은 `준공식 조합`으로 운영 신호를 잡은 문서입니다.
- `가격/예약`은 추후 seed 데이터로 옮기기 쉽게 간단한 텍스트로 맞췄습니다.
- `권장연령`이나 `강점`은 공식 안내 문구가 없을 경우 과장하지 않고 낮은 확신의 표현으로 적었습니다.
- `*-baby-cafes.md` 문서는 일반 키즈카페 전체가 아니라 `영아 특화+영아 친화` 필터를 다시 건 별도 목록입니다.
- `*-outing-facilities.md` 문서는 박물관, 체험관, 시립 키즈카페, 주요 나들이 시설처럼 `지역 대표 시설`을 모아 둔 canonical 문서입니다.

간단한 결론: 이제 `docs/research/places`는 지역별 canonical 문서를 중심으로 읽으면 되고, 로컬 준공식 문서는 발행 직전 재검증이 필요한 보조 후보군으로 보면 됩니다.

# 01. Markers API 분석

작성일: 2026-04-08  
실측 시각: 2026-04-08 13:35:59 KST

## 대상 URL

`GET /v5/travel/markers?hl=places&limit=10&page=1&q=과학관&sort=ACCURACY&types=place`

## 쿼리 파라미터 분석

| 파라미터 | 예시 | 관찰 내용 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `hl` | `places` | 동일 값으로 목록 조회 성공 | 장소 탐색 surface/context 구분값으로 보입니다. 정확한 약어 의미는 확인되지 않았습니다. | 중간 |
| `limit` | `10` | `items.length=10` | 페이지당 반환 개수 | 높음 |
| `page` | `1` | `hasPrev=false`, `hasNext=true` | 1-based 페이지 번호로 보입니다. | 높음 |
| `q` | `과학관` | 과학관/체험관/천문과학관 계열 결과가 다수 노출 | 자유검색 키워드 | 높음 |
| `sort` | `ACCURACY` | 동일 요청에서도 상위 결과가 달라졌습니다. | 정확도/관련도 정렬로 보이지만 결정적 정렬은 아닙니다. | 중간 |
| `types` | `place` | 응답의 `contentType` 이 모두 `place` | 장소 타입 필터 | 높음 |

## 최상위 응답 구조

| 필드 | 타입 | 예시 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `total` | number | `107` | 전체 검색 결과 수 | 높음 |
| `hasPrev` | boolean | `false` | 이전 페이지 존재 여부 | 높음 |
| `hasNext` | boolean | `true` | 다음 페이지 존재 여부 | 높음 |
| `items` | array | 길이 `10` | 현재 페이지 결과 목록 | 높음 |

## `items[]` 상위 필드

| 필드 | 타입 | 예시 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `id` | string | `6864f58914593d6acf3749b6` | 목록용 마커 레코드 ID로 보입니다. 상세 API 키로는 실패했습니다. | 높음 |
| `contentType` | string | `place` | 콘텐츠 도메인 타입 | 높음 |
| `contentId` | string | `64b9fb61c72cc5ffd76c2499` | 실제 장소 본문 ID입니다. 상세 API/상세 페이지 URL에 사용됩니다. | 높음 |
| `title` | string | `울산과학관` | 표시용 제목, `content.title` 과 중복 | 높음 |
| `sortNumber` | number | `115201001` | 내부 랭킹 점수 또는 정렬 보조값으로 추정됩니다. 순수 내림차순 정렬은 아니었습니다. | 중간 |
| `content` | object | 장소 본문 객체 | 상세 카드 데이터 본체 | 높음 |
| `coordinates` | object | `{ lat, lng }` | 지도 마커 전용 좌표 복사본으로 보입니다. `content.coordinate` 와 사실상 동일했습니다. | 높음 |

## `items[].coordinates`

| 필드 | 타입 | 예시 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `lat` | number | `35.5400481` | 위도 | 높음 |
| `lng` | number | `129.2685421` | 경도 | 높음 |

## `items[].content` 필드

| 필드 | 타입 | 예시 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `id` | string | `64b9fb61c72cc5ffd76c2499` | `contentId` 와 동일 | 높음 |
| `title` | string | `울산과학관` | 장소명 | 높음 |
| `categories` | string[] | `["박물관/체험관"]` | 1차 카테고리 배열 | 높음 |
| `province` | string | `울산` / `경기 북부` | 행정구역 또는 서비스 내부 광역 권역명 | 중간 |
| `city` | string | `울산 남구` | 노출용 시/군/구 레벨 지역명 | 높음 |
| `description` | string | `과학관에서 시간과 에너지 순삭!` | 짧은 소개 카피 | 높음 |
| `address` | string | `울산광역시 남구 ...` | 전체 주소 | 높음 |
| `coordinate` | object | `{ lat, lng }` | 장소 대표 좌표 | 높음 |
| `businessHours` | array | 요일별 운영 정보 | 구조화된 운영시간 | 높음 |
| `phone` | string | `0507-1487-1702` | 대표 연락처 | 높음 |
| `tip` | string | 체험/준비물 팁 | 에디토리얼 추천 문구 | 높음 |
| `media` | object | 이미지/영상 정보 | 대표 미디어 묶음 | 높음 |
| `template` | string | `VIDEO_1` | 카드 렌더 템플릿 키로 추정됩니다. | 중간 |
| `templateColor` | string/null | `null` | 카드 테마 색상 또는 UI 변형값으로 추정됩니다. | 낮음 |
| `mainKeyword` | string | `과학관` | 대표 키워드/태그 | 높음 |
| `isHot` | boolean | `false` | 인기 태그 노출 여부로 추정 | 중간 |
| `isNew` | boolean | `false` | 신규 태그 노출 여부로 추정 | 중간 |
| `valid` | boolean | `true` | 현재 노출 가능한 유효 데이터 여부 | 중간 |
| `isMembership` | boolean | `false` | 멤버십 연결 장소 여부 | 중간 |
| `membershipTitle` | string/null | `null` | 멤버십 안내 제목 | 중간 |
| `membershipDescription` | string/null | `null` | 멤버십 안내 설명 | 중간 |
| `membershipLink` | string/null | `null` | 멤버십 이동 링크 | 중간 |
| `clickCount` | number | `0` | 클릭 집계값 | 높음 |
| `usageStat` | object | 연령/성별 사용 통계 | 이용자 분포 요약 | 높음 |
| `createdAt` | string(datetime) | `2023-07-24T11:12:37+09:00` | 생성 시각 | 높음 |
| `updatedAt` | string/null | `null` | 수정 시각 | 높음 |
| `categoryRankings` | array | 카테고리별 순위 | 카테고리 내 랭킹 데이터 | 높음 |
| `isDeleted` | boolean | `false` | 소프트 삭제 여부 | 중간 |
| `isDraft` | boolean | `false` | 초안 상태 여부 | 중간 |
| `isScraped` | boolean | `false` | 자동 수집 출처 여부로 보입니다. | 중간 |

## `content.coordinate`

| 필드 | 타입 | 예시 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `lat` | number | `35.5400481` | 위도 | 높음 |
| `lng` | number | `129.2685421` | 경도 | 높음 |

## `content.businessHours[]`

| 필드 | 타입 | 예시 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `day` | string | `mon`, `tue` | 내부 요일 키 | 높음 |
| `dayOfWeek` | number | `1..7` | 월요일=1 형태로 보입니다. | 높음 |
| `hours` | object/null | `{ start, end }` / `null` | 휴무일에는 `null` | 높음 |
| `hours.start` | string | `10:00` | 시작 시각 | 높음 |
| `hours.end` | string | `17:00` | 종료 시각 | 높음 |
| `description` | string | `정기휴무`, `10:00~17:00` | 사용자 노출용 요약 문자열 | 높음 |

## `content.media`

| 필드 | 타입 | 예시 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `images` | array | 이미지 배열 | 대표/갤러리 이미지 목록 | 높음 |
| `imagesLen` | number | `7` | 전체 이미지 개수, 일부 응답에만 존재할 수 있습니다. | 중간 |
| `video` | object/null | `{ mimeType, key, link, ... }` | 대표 숏폼 영상 | 높음 |

### `content.media.images[]`

| 필드 | 타입 | 예시 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `mimeType` | string | `image/jpeg` | 파일 MIME 타입 | 높음 |
| `key` | string | `places/...` | 원본 스토리지 키 | 높음 |
| `link` | string(URL) | `https://<external-image-cdn>/...` | 본문 이미지 URL | 높음 |
| `thumb` | string(URL) | `https://<external-image-cdn>/...` | 썸네일 URL | 높음 |
| `blurHash` | string | `UKHVVP...` | 저해상도 프리뷰용 해시 | 높음 |
| `width` | number | `2000` | 이미지 너비 | 높음 |
| `height` | number | `1333` | 이미지 높이 | 높음 |
| `origin` | string | `leeharam0206` | 업로더/작성자 핸들로 추정 | 중간 |
| `duration` | null | `null` | 이미지라서 `null` | 높음 |

### `content.media.video`

| 필드 | 타입 | 예시 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `mimeType` | string | `video/mp4` | 영상 MIME 타입 | 높음 |
| `key` | string | `gcp/places/...` | 원본 스토리지 키 | 높음 |
| `link` | string(URL) | `https://<external-video-cdn>/...` | 스트리밍/원본 링크 | 높음 |
| `thumb` | string(URL) | `https://<external-image-cdn>/...` | 비디오 썸네일 | 높음 |
| `blurHash` | string | `UB7m]%...` | 프리뷰용 해시 | 높음 |
| `width` | number | `1080` | 너비 | 높음 |
| `height` | number | `1920` | 높이 | 높음 |
| `origin` | string | `leeharam0206` | 업로더 핸들 추정 | 중간 |
| `duration` | number | `15` | 초 단위로 보임 | 높음 |

## `content.usageStat`

| 필드 | 타입 | 예시 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `bestAge` | string | `AFTER_24M_48M` | 최다 이용 연령대 코드 | 높음 |
| `bestGender` | string | `M` | 최다 이용 성별 코드 | 높음 |
| `ageUsages` | array | `{ age, count }[]` | 연령대별 이용 집계 | 높음 |
| `genderUsages` | object | `{ male, female }` | 성별별 이용 집계 | 높음 |

### `content.usageStat.ageUsages[]`

| 필드 | 타입 | 예시 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `age` | string | `BEFORE_12M`, `AFTER_48M` | 연령 구간 코드 | 높음 |
| `count` | number | `70` | 집계 건수 | 높음 |

### `content.usageStat.genderUsages`

| 필드 | 타입 | 예시 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `male` | number | `101` | 남아/남성 이용 집계로 보임 | 중간 |
| `female` | number | `69` | 여아/여성 이용 집계로 보임 | 중간 |

## `content.categoryRankings[]`

| 필드 | 타입 | 예시 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `category` | string | `박물관/체험관` | 카테고리명 | 높음 |
| `rank` | number | `245` | 해당 카테고리 내 순위 | 중간 |

## 결과 변동성 관찰

동일 URL을 연속 호출했는데 다음 현상이 있었습니다.

- 호출 A 상위 10개
  - 울산과학관
  - 국립수산과학원수산과학관
  - 최무선과학관
  - 제천한방엑스포공원한방생명과학관
  - 천안홍대용과학관
  - 포천아트밸리 천문과학관
  - 국립해양문화재연구소&해양유물전시관
  - 서울로봇인공지능과학관
  - 어메이징파크
  - 인천학생과학관
- 호출 B 상위 10개
  - 김천시청소년테마파크
  - 울산과학관
  - 국립수산과학원수산과학관
  - 어메이징파크
  - 최무선과학관
  - 제천한방엑스포공원한방생명과학관
  - 구미어린이과학체험관
  - 조류생태과학관
  - 보현산천문과학관
  - 청주랜드 어린이회관 제2관(어린이체험관)

정량 관찰:

- `total`, `hasPrev`, `hasNext`, `items.length` 는 동일
- 상위 10개 `contentId` 중 교집합은 `5개`

해석:

- 이 API는 “동일 파라미터 = 동일 결과”를 보장하지 않을 가능성이 높습니다.
- 따라서 수집 파이프라인에서는 다음을 권장합니다.
  - 호출 시각 저장
  - 원본 응답 스냅샷 저장
  - 상위 N개만 신뢰하지 말고 `contentId` 단위로 중복 제거
  - 순위 변동을 허용하는 diff 로직 사용

## ID 매핑 규칙

### 확인된 규칙

- 상세 API 성공
  - `GET /v5/travel/places/{contentId}` -> `200`
- 상세 API 실패
  - `GET /v5/travel/places/{id}` -> `404`

### 실무 규칙

| 용도 | 사용해야 할 필드 |
| --- | --- |
| 상세 API 호출 | `contentId` |
| 상세 페이지 URL 생성 | `contentId` |
| 목록 레코드 자체 추적 | `id` |

## 호출 A 기준 매핑 샘플

| marker `id` | `contentId` | title | 상세 페이지 URL |
| --- | --- | --- | --- |
| `6864f58914593d6acf3749b6` | `64b9fb61c72cc5ffd76c2499` | 울산과학관 | `https://<external-travel-site>/travel/places/64b9fb61c72cc5ffd76c2499` |
| `6864f58714593d6acf374987` | `64b4a21043cc41558394eb24` | 국립수산과학원수산과학관 | `https://<external-travel-site>/travel/places/64b4a21043cc41558394eb24` |
| `6864f57714593d6acf37483d` | `6491753810bc420797febe83` | 최무선과학관 | `https://<external-travel-site>/travel/places/6491753810bc420797febe83` |
| `6864f67114593d6acf375c61` | `66e38ea273ec0792b9a8a410` | 제천한방엑스포공원한방생명과학관 | `https://<external-travel-site>/travel/places/66e38ea273ec0792b9a8a410` |
| `6864f66f14593d6acf375c3b` | `66ce95e1f35c8a23bad8f963` | 천안홍대용과학관 | `https://<external-travel-site>/travel/places/66ce95e1f35c8a23bad8f963` |
| `6864f56c14593d6acf374755` | `6482827ddccc2df49fa81893` | 포천아트밸리 천문과학관 | `https://<external-travel-site>/travel/places/6482827ddccc2df49fa81893` |
| `6864f55a14593d6acf3745cd` | `6448b2a96b75b6cef9886a3c` | 국립해양문화재연구소&해양유물전시관 | `https://<external-travel-site>/travel/places/6448b2a96b75b6cef9886a3c` |
| `6864f68b14593d6acf375e90` | `67231195b11dd75b82b97884` | 서울로봇인공지능과학관 | `https://<external-travel-site>/travel/places/67231195b11dd75b82b97884` |
| `6864f58114593d6acf374909` | `64a76dbcb244f80f315f7335` | 어메이징파크 | `https://<external-travel-site>/travel/places/64a76dbcb244f80f315f7335` |
| `6864f57414593d6acf3747f9` | `64952dd5caa623b82a642486` | 인천학생과학관 | `https://<external-travel-site>/travel/places/64952dd5caa623b82a642486` |

## 짧은 결론

목록 API는 카드형 장소 데이터를 충분히 제공하지만 결과 순서는 안정적이지 않습니다. 구현에서는 `contentId` 를 정규 식별자로 삼고, `id` 는 목록/마커 레벨 식별자로만 다루는 것이 안전합니다.

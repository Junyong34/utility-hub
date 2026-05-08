# 02. Place 상세 API 및 페이지 분석

작성일: 2026-04-08  
실측 시각: 2026-04-08 13:35:59 KST

## 분석 대상

- 상세 API 예시  
  `https://<external-travel-api>/v5/travel/places/64d2f0b4d6eb41bb4f202245`
- 상세 페이지 예시  
  `https://<external-travel-site>/travel/places/64d2f0b4d6eb41bb4f202245`

예시 장소: `황순원문학촌소나기마을`

## 가장 중요한 매핑

- 상세 페이지 URL 식별자 = `contentId`
- 상세 API 식별자 = `contentId`
- 목록의 바깥 `id` 는 상세 식별자가 아님

## 상세 API 상위 필드

목록 API의 `content` 대비 상세 API에서 추가 확인된 상위 필드는 아래와 같습니다.

| 필드 | 예시 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- |
| `amenities` | 편의시설 배열 | 시설 지원 여부 코드 목록 | 높음 |
| `commentCount` | `0` | 내부 댓글 수 | 중간 |
| `contents` | 요금/이용안내/프로그램 장문 텍스트 | 구조화되지 않은 본문형 정보 | 높음 |
| `contributors` | 리뷰어 배열 | 작성자/기여자 프로필 정보 | 높음 |
| `hiddenKeywords` | `["체험", "문학", ...]` | 검색/SEO용 숨김 키워드 | 중간 |
| `internalNote` | `null` | 내부 운영 메모로 추정 | 낮음 |
| `introductionHtml` | `null` | HTML 소개문 슬롯 | 중간 |
| `invisibleAt` | `null` | 비노출 예약 시각으로 추정 | 낮음 |
| `newAt` | `2023-08-22T16:28:01+09:00` | 신규 배지/노출 시작 시각으로 추정 | 중간 |
| `purchaseAction` | `null` | 구매 CTA 슬롯 | 낮음 |
| `relatedPlaceIds` | `[]` | 관련 장소 연결용 ID 배열 | 중간 |
| `reserveActions` | 홈페이지/인스타/블로그/페북 링크 | 예약/외부 이동 버튼 데이터 | 높음 |
| `reserveDescription` | `당일 방문 및 현장 접수 (예약 불가)` | 예약 정책 요약 | 높음 |
| `scrapCount` | `81` | 북마크/스크랩 수 | 중간 |
| `shareCount` | `0` | 공유 수 | 중간 |
| `visible` | `true` | 현재 공개 여부 | 중간 |
| `visibleAt` | `null` | 공개 예약 시각으로 추정 | 낮음 |

## 상세 API에서 실제로 바로 활용 가능한 필드

### 1. 기본 장소 카드

| 필드 | 예시 값 | 내 사이트 활용 방식 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `id` | `64d2f0b4d6eb41bb4f202245` | canonical ID | 상세 페이지 slug 대신 외부 원본 ID로 보관 가능 | 높음 |
| `title` | `황순원문학촌소나기마을` | 장소명 | 제목 | 높음 |
| `categories` | `["박물관/체험관"]` | 카테고리/필터 | 내부 카테고리 맵핑 필요 | 높음 |
| `province` | `경기 북부` | 권역 분류 | 행정도보다 서비스 권역에 가깝습니다. | 중간 |
| `city` | `경기 양평군` | 지역 라벨 | 리스트/카드 요약에 적합 | 높음 |
| `description` | `인공 소나기 체험하며 비 맞고 놀자` | 요약 문구 | 카드 서브카피 | 높음 |
| `address` | `경기도 양평군 서종면 소나기마을길 24 산 74` | 상세 주소 | 지도/길찾기 | 높음 |
| `coordinate.lat` | `37.5939128` | 지도 위도 | 정확 좌표 | 높음 |
| `coordinate.lng` | `127.3776844` | 지도 경도 | 정확 좌표 | 높음 |
| `phone` | `031-773-2299` | 연락처 CTA | 전화 링크 | 높음 |
| `mainKeyword` | `문학관` | 태그/검색 보조 | 대표 키워드 | 높음 |

### 2. 운영 정보

| 필드 | 예시 값 | 내 사이트 활용 방식 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `businessHours[]` | 화~일 `09:30~18:00`, 월 정기휴무 | 요일별 운영시간 UI | 정규 구조라 그대로 맵핑 가능 | 높음 |
| `reserveDescription` | `당일 방문 및 현장 접수 (예약 불가)` | 예약 여부/방문 방식 | 카드 배지 또는 상세 정책 섹션 | 높음 |
| `contents` | 요금, 이용안내, 프로그램 장문 | 상세 설명 파싱 소스 | 정규화 전 전처리 필요 | 높음 |
| `tip` | 준비물, 무지개, 꽃구경 등 팁 | 방문 팁 섹션 | 에디토리얼 문장 | 높음 |

### 3. 미디어

| 필드 | 예시 값 | 내 사이트 활용 방식 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `media.images[]` | 8장 | 갤러리 | 고해상도/썸네일/blurhash 모두 제공 | 높음 |
| `media.video` | 세로 영상 10초 | 숏폼 대표 영상 | 상세 상단 히어로 | 높음 |
| `template` | `VIDEO_1` | 카드/히어로 레이아웃 선택 | 외부 템플릿 키 재사용 여부는 검토 필요 | 중간 |

### 4. 편의시설

| 필드 | 예시 값 | 내 사이트 활용 방식 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `amenities[].code` | `BABY_CHAIR`, `PARKING` | 내부 아이콘 키 | enum 으로 관리 권장 | 높음 |
| `amenities[].name` | `아기의자`, `주차` | 라벨 | 한국어 표시명 | 높음 |
| `amenities[].isEnabled` | `true/false` | 배지/체크리스트 | 지원 여부 | 높음 |

실제 예시:

| code | name | isEnabled | 해석 |
| --- | --- | --- | --- |
| `BABY_CHAIR` | 아기의자 | `false` | 미지원 |
| `NURSING_ROOM` | 수유실 | `false` | 미지원 |
| `DIAPER_TABLE` | 기저귀교환대 | `false` | 미지원 |
| `STROLLER_RENT` | 유모차대여 | `false` | 미지원 |
| `PARKING` | 주차 | `true` | 지원 |
| `RESERVATION` | 예약 | `false` | 예약 불가 |

### 5. 외부 링크

| 필드 | 예시 | 내 사이트 활용 방식 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `reserveActions[].title` | `홈페이지`, `인스타그램` | CTA 버튼 텍스트 | 공식채널/예약채널 묶음 | 높음 |
| `reserveActions[].link` | URL | 외부 이동 버튼 | 예약 전용이라기보다 공식 채널 전반을 담습니다. | 높음 |

실제 예시:

- 홈페이지: `https://www.yp21.go.kr/museumhub/contents.do?key=1022`
- 인스타그램: `https://www.instagram.com/sonagivillage/`
- 블로그: `https://blog.naver.com/sonagivill`
- 페이스북: `https://www.facebook.com/SonagiVillage/`

### 6. 수요/인기 지표

| 필드 | 예시 값 | 내 사이트 활용 방식 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `usageStat.bestAge` | `AFTER_24M_48M` | 추천 연령 추론 | 코드 매핑 필요 | 높음 |
| `usageStat.bestGender` | `F` | 대표 성별 선호 추론 | 편향 해석 주의 | 중간 |
| `usageStat.ageUsages[]` | 12개월 미만~48개월 이후 카운트 | 연령 분포 시각화 | 실제 리뷰/이용자 기반 집계로 추정 | 중간 |
| `usageStat.genderUsages` | `{ male: 27, female: 28 }` | 분포 참고 | 직접 노출은 신중해야 합니다. | 중간 |
| `clickCount` | `570` | 외부 인기 지표 | 외부 서비스 기준이라 참고용 | 중간 |
| `commentCount` | `0` | 댓글 수 | 참고용 | 중간 |
| `scrapCount` | `81` | 스크랩 수 | 인기 지표 | 중간 |
| `shareCount` | `0` | 공유 수 | 참고용 | 중간 |

## 상세 페이지 HTML에서 추가로 추출된 값

상세 페이지 렌더 페이로드에서 API에 없는 필드를 확인했습니다.

| 필드 | 예시 | 활용 방식 | 추정/주석 | 신뢰도 |
| --- | --- | --- | --- | --- |
| `meta.title` | `황순원문학촌소나기마을 - 경기 양평군에서 아이와 갈 곳 추천` | SEO 제목 벤치마킹 | 페이지 전용 메타 | 높음 |
| `meta.description` | 주소 + 한줄 소개 + `30건(4.9/5.0)` 리뷰 | SEO 설명 벤치마킹 | 리뷰 수/평점까지 포함 | 높음 |
| `canonical` | `/travel/places/64d2f0b4...` | 원본 링크 저장 | 정규 URL | 높음 |
| `og:image` | 대표 이미지 URL | OG/썸네일 | 페이지용 대표 미디어 | 높음 |
| `aggregateRating.ratingValue` | `4.9` | 품질 점수 참고 | 구조화 데이터 기준 | 높음 |
| `aggregateRating.reviewCount` | `30` | 후기 수 참고 | 구조화 데이터 기준 | 높음 |
| `placeMeta.faqList` | 5개 문답 | FAQ 섹션 | 페이지 전용 에디토리얼 자산 | 높음 |
| `placeMeta.updatedAt` | `2025-04-18T11:26:31+09:00` | FAQ/소개문 갱신 시점 추적 | 페이지 메타 업데이트로 보임 | 중간 |
| 소개문 마크다운 | `## 아이와 함께 떠나는 첫사랑 추억여행...` | 상세 소개문 | 장문 에디토리얼 복사본 | 높음 |
| `blogReviews[]` | 30개 외부 블로그 카드 | 후기 큐레이션 섹션 | Naver 블로그 위주 외부 후기 | 높음 |

### 소개문 시작부

```md
## 아이와 함께 떠나는 첫사랑 추억여행, 황순원문학촌 소나기마을

### 황순원문학촌 소나기마을이란?
```

### FAQ 개수

- 확인된 개수: `5`

### 외부 블로그 후기 개수

- 확인된 개수: `30`
- 첫 번째 후기 제목:
  - `양평 가볼만한곳 양평 실내관광지 황순원문학촌소나기마을 입장요금`

## `contents` 필드에서 추가로 파싱 가능한 값

`contents` 는 현재 장문 문자열이지만, 정규화하면 아래 필드를 뽑아낼 수 있습니다.

| 추출 후보 필드 | 예시 값 | 출처 근거 | 비고 |
| --- | --- | --- | --- |
| `admission.adult` | `2000` | `[요금] 관람료 어른: 2,000원` | 숫자 파싱 필요 |
| `admission.teen` | `1500` | `청소년, 군경: 1,500원` | 묶음 정책 분리 가능 |
| `admission.child` | `1000` | `어린이: 1,000원` | 숫자 파싱 필요 |
| `admission.freePolicy` | `보호자 동반한 6세 이하 어린이 무료` | `[요금]` | 규칙 문장 저장 권장 |
| `seasonalHours.summer` | `09:30~18:00` | `[이용안내] 하절기` | 계절별 운영시간 |
| `seasonalHours.winter` | `09:30~17:00` | `[이용안내] 동절기` | 계절별 운영시간 |
| `lastEntryPolicy` | `종료 시간 30분 전` | `[이용안내]` | 운영 팁 |
| `specialExperience.name` | `인공소나기 체험` | `[이용안내]` | 별도 체험 섹션 가능 |
| `specialExperience.weekdayHours` | `11시~16시` | `평일` | 규칙 문자열 |
| `specialExperience.weekendHours` | `11시~17시` | `주말` | 규칙 문자열 |
| `specialExperience.note` | `우산, 우비 또는 여벌 옷 준비 필요` | `[이용안내]` | 준비물 정보 |
| `program.name` | `나만의 「소나기」 그림달력 만들기` | `[프로그램]` | 복수 프로그램 대응 필요 |
| `program.audience` | `전 연령, 초·중·고등학교 및 교육 단체` | `[프로그램]` | 참여 대상 |
| `program.delivery` | `비대면 온라인 / 오프라인` | `[프로그램]` | 진행 방식 |

## 내 사이트에서 바로 쓰기 좋은 권장 스키마

### 1. 자동 수집 필드

| 필드명 | 원본 소스 | 권장 여부 | 주석 |
| --- | --- | --- | --- |
| `sourceId` | 상세 API `id` | 권장 | 외부 원본 ID |
| `name` | 상세 API `title` | 권장 | 기본 이름 |
| `summary` | 상세 API `description` | 권장 | 카드 한줄 소개 |
| `categories` | 상세 API `categories` | 권장 | 내부 taxonomy 맵핑 필요 |
| `region.primary` | `province` | 권장 | 서비스 권역용 |
| `region.city` | `city` | 권장 | 사용자 노출용 |
| `address.full` | `address` | 권장 | 상세 주소 |
| `geo.lat` / `geo.lng` | `coordinate` | 권장 | 지도/거리 계산 |
| `contact.phone` | `phone` | 권장 | tel 링크 |
| `hours.weekly[]` | `businessHours[]` | 권장 | 요일별 운영 |
| `facilities[]` | `amenities[]` | 권장 | 체크리스트 |
| `media.gallery[]` | `media.images[]` | 권장 | 썸네일/원본 분리 저장 |
| `media.video` | `media.video` | 선택 | 있는 경우만 |
| `visitTips` | `tip` | 권장 | 방문 팁 |
| `booking.summary` | `reserveDescription` | 권장 | 예약 정책 |
| `booking.links[]` | `reserveActions[]` | 권장 | 공식 링크 |
| `audience.bestAgeCode` | `usageStat.bestAge` | 선택 | 직접 노출보다는 내부 추천용 |
| `popularity.external` | `clickCount`, `scrapCount`, `commentCount`, `shareCount` | 선택 | 참고 지표 |

### 2. 페이지 전용으로 추가 수집하면 좋은 필드

| 필드명 | 원본 소스 | 권장 여부 | 주석 |
| --- | --- | --- | --- |
| `seo.titleBenchmark` | 페이지 `meta.title` | 선택 | 내부 SEO 작성 참고 |
| `seo.descriptionBenchmark` | 페이지 `meta.description` | 선택 | 직접 복제보다는 참고용 |
| `editorial.introduction` | 페이지 소개문 마크다운 | 권장 | 장문 소개 섹션 |
| `editorial.faq[]` | `placeMeta.faqList` | 권장 | 상세 FAQ |
| `socialProof.ratingValue` | `aggregateRating.ratingValue` | 선택 | 원 출처 표기 필요 |
| `socialProof.reviewCount` | `aggregateRating.reviewCount` | 선택 | 원 출처 표기 필요 |
| `externalReviews[]` | `blogReviews[]` | 권장 | 외부 후기 큐레이션 |
| `editorialUpdatedAt` | `placeMeta.updatedAt` | 선택 | 동기화 판단용 |

### 3. 수동 입력을 추가하면 좋은 필드

아래 필드는 원본에서 일부만 보이거나 문자열 파싱이 필요하므로, 내 사이트에서 별도 입력/검수 필드로 두는 편이 좋습니다.

| 필드명 | 이유 | 비고 |
| --- | --- | --- |
| `admissionPolicy` | `contents` 안에 장문으로만 존재 | 금액 구조화 권장 |
| `parkingPolicy` | 단순 `주차=true` 만으로는 부족 | 무료/유료/대수/거리 필요 |
| `indoorOutdoor` | 원본에 명시 enum 없음 | 실내/실외/혼합 분류 |
| `rainyDayFit` | 직접 판단 가치 큼 | 비 오는 날 추천 여부 |
| `strollerFriendliness` | 대여와 접근성은 별개 | 진입 동선/엘리베이터 포함 |
| `feedingChangingNotes` | `amenities` 가 boolean 수준 | 실제 위치/상태/청결도는 수동 검수 권장 |
| `stayDuration` | 원본에 없음 | 1시간/반나절/종일 등 |
| `recommendedAgeLabel` | 코드형 `bestAge` 는 사용자 친화적이지 않음 | `24-48개월 추천` 같은 문장화 필요 |
| `reservationRequired` | 현재는 서술형 | boolean + 정책문장 이중 저장 권장 |
| `seasonalNotes` | 꽃구경, 축제, 계절 체험 등 | 방문 시즌 큐레이션용 |
| `nearbyBundle` | 주변 산/휴양림은 팁에만 있음 | 근처 코스 묶기용 |
| `verificationDate` | 외부 데이터 변동 가능 | 마지막 확인일 필수 |
| `sourceUrl` | 원본 링크 추적 | 운영 검수 필수 |

## 수집 시 주의해야 할 필드

| 필드 | 이유 | 권장 처리 |
| --- | --- | --- |
| `contributors[].babyInfos[].birthday` | 아동 생년월일로 민감도가 높음 | 수집 금지 |
| `contributors[].gender` / `babyInfos[].gender` | 개인/아동 속성 데이터 | 직접 노출 금지, 내부 처리도 비권장 |
| `contributors[].profileImage` | 외부 프로필 이미지 | 저작권/초상권 검토 필요 |
| `internalNote` | 내부 운영 메모 가능성 | 수집 금지 |
| `hiddenKeywords` | 내부 SEO 태그 성격 | 그대로 노출하지 말고 검색 보조용으로만 검토 |
| 외부 `aggregateRating` | 계산 기준 불명확 | 원출처 표기 없이 복제하지 않는 편이 안전 |

## 실무 권장 수집 순서

1. 목록 API 호출
2. `contentId` 추출
3. 상세 API 호출
4. 상세 페이지 HTML에서 FAQ/소개문/외부 후기 보강
5. `contents` 문자열 정규화
6. 민감/내부 필드 제거
7. 검수용 `lastVerifiedAt` 저장

## 짧은 결론

상세 API만으로도 장소 카드, 운영 정보, 편의시설, 외부 링크까지 충분히 가져올 수 있습니다. 여기에 상세 페이지의 소개문·FAQ·외부 후기 큐레이션을 더하면, 내 사이트용 장소 상세 데이터셋으로 거의 바로 전환 가능한 수준입니다. 다만 기여자와 아동 관련 필드는 민감하므로 수집 대상에서 제외하는 것이 안전합니다.

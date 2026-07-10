# 인천 동물·생태 체험 장소 리서치

- 기준일: `2026-07-10`
- 범위: 인천광역시 전역
- 목적: 1~7세 자녀와 방문할 수 있는 동물 관찰·교감·조류·해양생태·갯벌 체험 장소의 신규 seed 후보 수집
- PlaceSource 기준: `types/place-source.ts`
- 신규 확정 후보: `9곳` (`official_verified` 4곳, `semi_verified` 5곳)

## 수집 원칙

- 공식 홈페이지, 지방자치단체 페이지, 공식 시설 페이지에서 운영 신호가 확인된 장소를 우선한다.
- 공식 1차 사이트가 없는 민간·마을 시설은 인천관광공사, 한국어촌어항공단, 유효기간이 남은 주요 티켓 판매 페이지를 조합해 보수적으로 검증한다.
- 블로그는 2025~2026년 실제 방문 맥락을 확인하는 참고 링크일 뿐, 운영시간·요금·주차·예약의 근거로 사용하지 않는다.
- 블로그 본문 문장을 복사하지 않고 공개 메타데이터의 제목·게시일·출처만 기록한다.
- 외부 블로그 이미지는 `thumbnailImage`나 `blogReviewHighlights`에 사용하지 않는다. 로컬 이미지가 없으므로 `externalBlogLinks`만 제안한다.
- 가격, 프로그램, 물때, 휴무는 변동 가능성이 높다. 공식 페이지가 최신이어도 방문 직전 재확인을 전제로 적는다.
- `feedingRoom`, `strollerFriendly`, `parking`이 `false`인 경우 확인되지 않은 편의시설을 보수적으로 노출하지 않는다는 뜻이며, 시설이 없다는 단정은 아니다.
- 2026년 7월 1일 출범한 인천 행정체제 기준으로 월미공원은 `제물포구`, 마시안은 `영종구`로 적었다. 기존 seed가 구 행정구역명을 사용한다면 승격 시 일괄 정책을 먼저 정해야 한다.

## 중복 확인

아래 신규 후보명으로 `content/places`와 `docs/research/places`를 `rg` 검색했으며 직접 중복은 없었다.

- 인천대공원 어린이동물원
- 늘솔길공원 양떼목장
- 월미공원 한국전통정원 동물체험존
- 소래습지생태공원
- 인천광역시 저어새 생태학습관
- 대이작도 해양생태관
- 마시안 갯벌 체험장
- 영암어촌계 체험장
- 실내 동물원 쥬벅스

기존 seed에 이미 있어 이번 신규 후보에서 제외한 관련 장소는 다음과 같다.

| 기존 장소        | 기존 ID                                      | 처리                              |
| ---------------- | -------------------------------------------- | --------------------------------- |
| 쥬라리움 청라점  | `incheon-zoorarium-cheongna`                 | 기존 동물교감형 seed 유지         |
| 강화자연사박물관 | `ganghwa-natural-history-museum`             | 기존 자연사·생물 전시 seed 유지   |
| 국립생물자원관   | `national-institute-of-biological-resources` | 기존 생물표본·생태 전시 seed 유지 |
| 인천나비공원     | `incheon-butterfly-park`                     | 기존 곤충·생태 seed 유지          |

## 후보 요약

| 장소                             | 세부 지역 | 핵심 동물 경험         | 검증 상태           | 2025~2026 방문기 |
| -------------------------------- | --------- | ---------------------- | ------------------- | ---------------- |
| 인천대공원 어린이동물원          | 남동구    | 동물 관찰·현장 해설    | `official_verified` | 연결 가능        |
| 늘솔길공원 양떼목장              | 남동구    | 면양 관찰              | `official_verified` | 연결 가능        |
| 월미공원 한국전통정원 동물체험존 | 제물포구  | 사슴·토끼 관찰         | `semi_verified`     | 연결 가능        |
| 소래습지생태공원                 | 남동구    | 갯벌 생물·철새 관찰    | `official_verified` | 연결 가능        |
| 인천광역시 저어새 생태학습관     | 남동구    | 저어새·물새 탐조       | `official_verified` | 연결 가능        |
| 대이작도 해양생태관              | 옹진군    | 해양생물·섬 생태 전시  | `semi_verified`     | 연결 가능        |
| 마시안 갯벌 체험장               | 영종구    | 조개·갯벌 생물 채집    | `semi_verified`     | 연결 가능        |
| 영암어촌계 체험장                | 옹진군    | 조개·고둥·게 관찰·채집 | `semi_verified`     | 연결 가능        |
| 실내 동물원 쥬벅스               | 남동구    | 실내 동물 관찰·교감    | `semi_verified`     | 연결 가능        |

## PlaceSource 반영 후보

### incheon-grand-park-childrens-zoo

```ts
{
  id: 'incheon-grand-park-childrens-zoo',
  name: '인천대공원 어린이동물원',
  region: 'incheon',
  subRegion: '남동구',
  category: 'experience',
  themes: ['animal'],
  ageBands: ['1-3y', '3-6y', '6-10y'],
  indoorOutdoor: 'outdoor',
  seasons: ['spring', 'summer', 'fall'],
  priceType: 'free',
  reservationRequired: false,
  parking: true,

  sourceType: 'official',
  sourceUrl: 'https://www.incheon.go.kr/park/park010214',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '인천대공원 어린이동물원 인천광역시 남동구 무네미로 236',
  )}`,
  description:
    '인천대공원 안에서 사막여우·미어캣·원숭이·조류 등을 무료로 관찰하는 야외 어린이동물원. 2026년에는 현장 참여형 동물해설 프로그램도 운영한다.',
  address: '인천광역시 남동구 무네미로 236 인천대공원 내',
  operatingHours:
    '10:00-17:00(16:50 입장 마감) / 월요일·1월 1일·설·추석 당일 휴원',
  priceInfo: '무료',
  feedingRoom: false,
  strollerFriendly: false,
  rainFriendly: false,
  stayMinutes: 90,
  operatorType: 'public',
  editorNote:
    '공식 페이지가 2026-04-14 재개장과 2026년 5~12월 동물해설 프로그램을 명시한다. 해설은 화~토요일 우천 시 미운영이며 별도 예약 없이 현장 참여한다. 동물 먹이주기는 금지되어 있다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title: '인천 아이랑 가볼만한곳 인천대공원 동물원 주차장 운영 시간',
      href: 'https://blog.naver.com/j__trip__/224310964462',
      sourceLabel: 'Naver Blog',
      description:
        '아이 동반 관람 동선과 현장 분위기를 방문자 관점에서 가늠할 수 있는 후기입니다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 운영 신호: 인천광역시 공원사업소 페이지가 2026년 재개장일, 동물 현황, 이용시간, 휴원일, 무료입장, 2026년 동물교실을 함께 안내한다.
- 공식 페이지 최종 업데이트: `2026-04-06`
- 방문기 메타데이터: `2026-06-09` / Naver Blog / `인천 아이랑 가볼만한곳 인천대공원 동물원 주차장 운영 시간`
- 신뢰도: 높음. 시설과 2026 프로그램이 모두 공식 1차 출처로 확인된다.
- places 반영 파일: `content/places/incheon/index.ts`

### incheon-neulsolgil-park-sheep-ranch

```ts
{
  id: 'incheon-neulsolgil-park-sheep-ranch',
  name: '늘솔길공원 양떼목장',
  region: 'incheon',
  subRegion: '남동구',
  category: 'experience',
  themes: ['animal'],
  ageBands: ['1-3y', '3-6y', '6-10y'],
  indoorOutdoor: 'outdoor',
  seasons: ['spring', 'summer', 'fall'],
  priceType: 'free',
  reservationRequired: false,
  parking: true,

  sourceType: 'official',
  sourceUrl:
    'https://biz.namdong.go.kr/dong/locinfo/park/parkDetail.do?dong=nonhyeongojan&loc_seq=235327&order=view2',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '늘솔길공원 양떼목장 인천광역시 남동구 앵고개로 771',
  )}`,
  description:
    '늘솔길공원 안에서 면양을 가까이 관찰하고 편백숲·숲속놀이터까지 함께 이용하는 무료 야외 나들이 장소. 무장애 숲길이 있어 유아 동반 산책을 붙이기 좋다.',
  address: '인천광역시 남동구 앵고개로 771 늘솔길근린공원3호',
  operatingHours:
    '4-9월 09:30-17:30 / 10-3월 09:30-17:00 / 우천 시 양떼목장 관람 불가',
  priceInfo: '무료',
  feedingRoom: false,
  strollerFriendly: true,
  rainFriendly: false,
  stayMinutes: 120,
  operatorType: 'public',
  editorNote:
    '남동구 공식 시설 페이지와 늘솔길숲 공식 시설 페이지에서 양떼목장 운영을 확인했다. 공식 페이지마다 진입 주소와 시간이 조금 달라 승격 시 이름 기반 지도 검색을 유지하고 방문 전 당일 안내를 확인하는 편이 안전하다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title:
        '주말 아이랑 가기좋은 곳 인천 늘솔길공원 양떼목장 장미원 먹이 주차 꿀팁',
      href: 'https://blog.naver.com/blair_____/224295609803',
      sourceLabel: 'Naver Blog',
      description:
        '아이와 둘러본 양떼목장·장미원·주차 동선을 가볍게 참고할 수 있는 후기입니다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 시설 페이지: <https://biz.namdong.go.kr/neulsolgil/facility/major.jsp>
- 최신 보조 신호: 남동구 공식 프로그램 페이지에 2026년 7~8월 아동 자연놀이 프로그램 접수·운영 일정이 노출된다.
- 준공식 보조: 인천투어의 양떼목장 페이지 최종수정일은 `2026-07-03`이다.
- 방문기 메타데이터: `2026-05-25` / Naver Blog / `주말 아이랑 가기좋은 곳 인천 늘솔길공원 양떼목장 장미원 먹이 주차 꿀팁`
- 신뢰도: 높음. 시설 존재와 현재 공원 운영 신호가 남동구 공식 채널에서 확인된다.
- places 반영 파일: `content/places/incheon/index.ts`

### incheon-wolmi-traditional-garden-animal-zone

```ts
{
  id: 'incheon-wolmi-traditional-garden-animal-zone',
  name: '월미공원 한국전통정원 동물체험존',
  region: 'incheon',
  subRegion: '제물포구',
  category: 'experience',
  themes: ['animal'],
  ageBands: ['1-3y', '3-6y', '6-10y'],
  indoorOutdoor: 'outdoor',
  seasons: ['spring', 'summer', 'fall'],
  priceType: 'free',
  reservationRequired: false,
  parking: false,

  sourceType: 'semi-official',
  sourceUrl:
    'https://itour.incheon.go.kr/thmtour/rcmdtour/detail.do?cotId=ITA21121416220183689',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'semi_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '월미공원 한국전통정원 동물체험존 인천광역시 제물포구 북성동1가 75-1',
  )}`,
  description:
    '월미공원 한국전통정원을 산책하며 사슴과 토끼를 관찰할 수 있는 무료 야외 동물 구역. 물범카·전망대와 함께 월미도 가족 코스로 묶기 좋다.',
  address: '인천광역시 제물포구 북성동1가 75-1 월미공원 한국전통정원',
  operatingHours: '하절기 09:00-18:00 / 동절기 09:00-17:00',
  priceInfo: '무료',
  feedingRoom: false,
  strollerFriendly: false,
  rainFriendly: false,
  stayMinutes: 90,
  operatorType: 'public',
  editorNote:
    '인천관광공사 페이지가 2026-06-12 수정본에서 사슴·토끼 동물체험존과 운영시간을 명시한다. 인천시 월미공원 공식 한국전통정원 페이지는 정원 자체만 안내하므로 semi_verified로 두고, 동물 개체·먹이 체험 여부는 방문 전 확인한다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title:
        '인천 월미공원 나들이│아이들과 즐기는 물범카·토끼·사슴 체험 후기',
      href: 'https://blog.naver.com/sweetbandi/224009458384',
      sourceLabel: 'Naver Blog',
      description:
        '아이와 물범카·동물 구역을 함께 이용한 방문 흐름을 참고할 수 있는 후기입니다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 공원 페이지: <https://www.incheon.go.kr/park/park010704>
- 준공식 운영 신호: 인천투어가 `2026-06-12` 수정본에서 사슴·토끼 동물체험존, 무료입장, 계절별 시간을 직접 안내한다.
- 방문기 메타데이터: `2025-09-16` / Naver Blog / `인천 월미공원 나들이│아이들과 즐기는 물범카·토끼·사슴 체험 후기`
- 신뢰도: 중상. 공공 관광 페이지의 최신 신호는 강하지만 공원 1차 페이지에서 동물 구역 세부 운영을 독립적으로 확인하지 못했다.
- places 반영 파일: `content/places/incheon/index.ts`

### incheon-sorae-wetland-ecological-park

```ts
{
  id: 'incheon-sorae-wetland-ecological-park',
  name: '소래습지생태공원',
  region: 'incheon',
  subRegion: '남동구',
  category: 'park',
  themes: ['animal'],
  ageBands: ['1-3y', '3-6y', '6-10y'],
  indoorOutdoor: 'both',
  seasons: ['all-season', 'spring', 'fall'],
  priceType: 'free',
  reservationRequired: false,
  parking: true,

  sourceType: 'official',
  sourceUrl: 'https://www.incheon.go.kr/park/park010301',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '소래습지생태공원 인천광역시 남동구 소래로154번길 77',
  )}`,
  description:
    '실내 생태전시관에서 갯벌 생물을 배우고 야외 관찰대에서 철새와 습지 생물을 찾는 공공 생태공원. 유아에게는 짧은 전시관·관찰데크 코스로 압축하기 좋다.',
  address: '인천광역시 남동구 소래로154번길 77',
  operatingHours:
    '생태전시관 10:00-18:00(동절기 17:30까지) / 월요일·법정 공휴일 다음날 등 휴관',
  priceInfo: '무료 / 주차 유료',
  feedingRoom: false,
  strollerFriendly: true,
  rainFriendly: true,
  stayMinutes: 120,
  operatorType: 'public',
  editorNote:
    '개인은 현장 관람 가능하고 단체는 사전예약이 필요하다. 야외 철새·갯벌 관찰은 날씨와 계절 영향을 받으며, rainFriendly는 실내 전시관을 기준으로 한다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title: '소래습지생태공원 갯벌체험 인천 아이와 가볼만한곳',
      href: 'https://blog.naver.com/euna841006/223971182953',
      sourceLabel: 'Naver Blog',
      description:
        '아이와 갯벌·습지 동선을 둘러본 방문 흐름을 참고할 수 있는 후기입니다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 전시관 페이지: <https://www.incheon.go.kr/park/park010302>
- 최신 준공식 보조: 인천투어 소래습지생태공원 페이지 최종수정일은 `2026-04-16`이다.
- 공식 운영 내용: 전시관, 자연학습장, 조류관찰대, 생태관찰대, 갯벌체험장, 주차요금이 현재 공식 공원 페이지에 노출된다.
- 방문기 메타데이터: `2025-08-15` / Naver Blog / `소래습지생태공원 갯벌체험 인천 아이와 가볼만한곳`
- 신뢰도: 높음. 인천시 공원사업소 1차 출처와 2026년 인천관광공사 갱신본이 교차 확인된다.
- places 반영 파일: `content/places/incheon/index.ts`

### incheon-spoonbill-ecology-learning-center

```ts
{
  id: 'incheon-spoonbill-ecology-learning-center',
  name: '인천광역시 저어새 생태학습관',
  region: 'incheon',
  subRegion: '남동구',
  category: 'experience',
  themes: ['animal'],
  ageBands: ['3-6y', '6-10y'],
  indoorOutdoor: 'both',
  seasons: ['all-season'],
  priceType: 'free',
  reservationRequired: false,
  parking: false,

  sourceType: 'official',
  sourceUrl: 'https://bfs-ecocenter.kr/sub/sub_0501.php',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '인천광역시 저어새 생태학습관 인천광역시 남동구 능허대로 562',
  )}`,
  description:
    '저어새와 이동성 물새를 주제로 전시·환경교육·자유 탐조를 운영하는 생태학습관. 신분증을 지참하면 정해진 시간에 쌍안경을 빌려 승기천과 앞마당의 새를 관찰할 수 있다.',
  address: '인천광역시 남동구 능허대로 562',
  operatingHours:
    '월-토 09:00-18:00(점심시간 12:00-13:00) / 공휴일·대체공휴일 등 휴관',
  priceInfo: '자유 탐조 무료 / 프로그램별 신청 조건 확인 필요',
  feedingRoom: false,
  strollerFriendly: false,
  rainFriendly: true,
  stayMinutes: 90,
  operatorType: 'public',
  editorNote:
    '자유 탐조는 별도 예약 없이 가능하지만 쌍안경 대여에는 신분증이 필요하다. 가족 프로그램·학교 교육은 별도 신청제다. rainFriendly는 실내 학습관 이용 기준이며 실제 탐조는 날씨 영향을 받는다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title: '2026 저어새 생일잔치_저어새 캐릭터 공모전 수상',
      href: 'https://blog.naver.com/ttbcub/224288811261',
      sourceLabel: 'Naver Blog',
      description:
        '가족 행사 참여 맥락과 학습관 현장 분위기를 가볍게 확인할 수 있는 후기입니다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 최신 공식 운영 신호: 공식 공지에 `2026-07-07` 가족 프로그램 모집, `2026-06-29` 7월 휴무 안내가 노출된다.
- 공식 프로그램 목록: <https://bfs-ecocenter.kr/all_list.php>
- 방문기 메타데이터: `2026-05-18` / Naver Blog / `2026 저어새 생일잔치_저어새 캐릭터 공모전 수상`
- 신뢰도: 높음. 공식 시설 사이트가 운영시간과 2026년 월별 프로그램을 계속 갱신하고 있다.
- places 반영 파일: `content/places/incheon/index.ts`

### incheon-daeijakdo-marine-ecology-center

```ts
{
  id: 'incheon-daeijakdo-marine-ecology-center',
  name: '대이작도 해양생태관',
  region: 'incheon',
  subRegion: '옹진군',
  category: 'museum',
  themes: ['animal'],
  ageBands: ['3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  seasons: ['spring', 'summer', 'fall'],
  priceType: 'free',
  reservationRequired: false,
  parking: true,

  sourceType: 'semi-official',
  sourceUrl:
    'https://itour.incheon.go.kr/ssst/ssst/detail.do?cotId=ITD21121616000881406',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'semi_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '대이작도 해양생태관 인천광역시 옹진군 자월면 대이작로159번길 6',
  )}`,
  description:
    '대이작도 주변의 물고기·갯벌·해양생태와 섬 지형을 전시와 VR로 살펴보는 무료 생태관. 섬 체류 일정에서 날씨가 좋지 않을 때 넣기 좋은 짧은 실내 코스다.',
  address: '인천광역시 옹진군 자월면 대이작로159번길 6',
  operatingHours: '10:00-14:00 / 화요일·목요일 휴관',
  priceInfo: '무료',
  feedingRoom: false,
  strollerFriendly: false,
  rainFriendly: true,
  stayMinutes: 60,
  operatorType: 'public',
  editorNote:
    '인천투어 페이지가 2026-03-03 갱신본에서 시간·휴관일·무료입장·체험 프로그램을 안내한다. 도서 지역이므로 여객선 결항, 계절 운영, 현장 사정에 대비해 출항 전 전화 확인이 필요하다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title:
        "인천 섬여행! '옹진군 대이작도 해양생태관' 대이작도를 그대로 담은 풀스크린 디지털 영상 관람",
      href: 'https://blog.naver.com/kangkanghee00/224065169363',
      sourceLabel: 'Naver Blog',
      description:
        '해양생태관의 전시·영상 관람 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 준공식 운영 신호: 인천광역시·인천관광공사 인천투어 페이지 최종수정일 `2026-03-03`.
- 2026 보조 신호: 옹진군의 2026년 섬마을밴드 음악축제 용역 문서가 행사장으로 대이작도 해양생태관을 명시한다.
- 방문기 메타데이터: `2025-11-10` / Naver Blog / `인천 섬여행! '옹진군 대이작도 해양생태관' 대이작도를 그대로 담은 풀스크린 디지털 영상 관람`
- 신뢰도: 중상. 2026년 공공 관광 갱신과 행사장 사용 신호가 있으나 독립 공식 시설 사이트의 당일 공지는 확인하지 못했다.
- places 반영 파일: `content/places/incheon/index.ts`

### incheon-masian-tidal-flat-experience

```ts
{
  id: 'incheon-masian-tidal-flat-experience',
  name: '마시안 갯벌 체험장',
  region: 'incheon',
  subRegion: '영종구',
  category: 'experience',
  themes: ['animal'],
  ageBands: ['3-6y', '6-10y'],
  indoorOutdoor: 'outdoor',
  seasons: ['spring', 'summer', 'fall'],
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'semi-official',
  sourceUrl:
    'https://itour.incheon.go.kr/ssst/ssst/detail.do?cotId=ITD22012115265412706',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'semi_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '마시안 갯벌 체험장 인천광역시 영종구 마시란로 107-8',
  )}`,
  description:
    '영종도 마시안 갯벌에서 동죽·소라 등 갯벌 생물을 찾아보고 조개를 채집하는 어촌계 체험장. 현장에서 장화·호미 등을 빌릴 수 있지만 물때와 준비물을 먼저 확인해야 한다.',
  address: '인천광역시 영종구 마시란로 107-8',
  operatingHours:
    '물때에 따라 변동(고조 3시간 후부터 다음 고조 3시간 전) / 당일 체험시간 확인 필요',
  priceInfo: '유료 / 연령·장비 대여별 요금 변동, 공식 일정 확인 필요',
  feedingRoom: false,
  strollerFriendly: false,
  rainFriendly: false,
  stayMinutes: 150,
  operatorType: 'non-profit',
  editorNote:
    '마시안마을 어촌계 운영 시설로 인천투어와 한국어촌어항공단 바다여행에 현재 등재되어 있다. 체험은 현장 접수 안내가 있으나 성수기에는 사전 문의가 안전하다. 2026-07-01 행정구역 개편 후 주소는 영종구로 표기했다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title:
        '[인천] 서울에서 가까운 아이랑 갯벌체험 추천, 마시안 해변 갯벌체험',
      href: 'https://blog.naver.com/onaive/224333388981',
      sourceLabel: 'Naver Blog',
      description:
        '아이 동반 갯벌 체험의 준비물과 현장 흐름을 가늠하기 좋은 최근 후기입니다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 준공식 운영 출처: 인천투어 시설 페이지와 한국어촌어항공단 바다여행의 현재 마을 목록.
- 한국어촌어항공단 보조 출처: <https://www.seantour.kr/newseantour/recommend/exclncvilage/exclncVilage.do>
- 방문기 메타데이터: `2026-07-01` / Naver Blog / `[인천] 서울에서 가까운 아이랑 갯벌체험 추천, 마시안 해변 갯벌체험`
- 신뢰도: 중상. 공공 관광·어촌 플랫폼에 현재 등재되어 있으나 체험시간은 물때에 따라 매일 달라진다.
- places 반영 파일: `content/places/incheon/index.ts`

### incheon-yeongam-fishing-village-experience

```ts
{
  id: 'incheon-yeongam-fishing-village-experience',
  name: '영암어촌계 체험장',
  region: 'incheon',
  subRegion: '옹진군',
  category: 'experience',
  themes: ['animal'],
  ageBands: ['3-6y', '6-10y'],
  indoorOutdoor: 'outdoor',
  seasons: ['spring', 'summer', 'fall'],
  priceType: 'paid',
  reservationRequired: true,
  parking: true,

  sourceType: 'semi-official',
  sourceUrl:
    'https://itour.incheon.go.kr/ssst/ssst/detail.do?cotId=APD21120710052328606',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'semi_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '영암어촌계 체험장 인천광역시 옹진군 영흥면 영흥서로446번길 46',
  )}`,
  description:
    '영흥도 수해해변의 혼합갯벌에서 바지락·굴·박하지·고둥 등을 관찰하고 채집하는 어촌계 체험장. 물때에 따라 조개잡이와 낚시 경험이 달라져 사전 문의가 필수적이다.',
  address: '인천광역시 옹진군 영흥면 영흥서로446번길 46',
  operatingHours: '시기·물때별 상이 / 사전 문의 및 접수 필요',
  priceInfo: '유료 / 체험 종류·시기별 요금 확인 필요',
  feedingRoom: false,
  strollerFriendly: false,
  rainFriendly: false,
  stayMinutes: 150,
  operatorType: 'non-profit',
  editorNote:
    '인천투어가 2026-05-23 수정본에서 주소·주차·계절별 운영을 안내하고 한국어촌어항공단 바다여행 현재 목록에도 영암마을이 노출된다. 외부인은 영암어촌계 체험객으로 접수해야 하므로 예약 필요를 보수적으로 true로 둔다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title: '[인천 아이랑] 영암어촌계ㅣ 갯벌체험 조개캐기',
      href: 'https://blog.naver.com/jjj99s2/223916792563',
      sourceLabel: 'Naver Blog',
      description:
        '아이와 조개를 캐는 체험 동선과 현장 분위기를 확인할 수 있는 방문 후기입니다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 준공식 운영 신호: 인천투어 최종수정일 `2026-05-23`.
- 한국어촌어항공단 보조: <https://www.seantour.kr/newseantour/fhlg/vilage/vilageFixesSearchList.do?pageIndex=7>
- 방문기 메타데이터: `2025-07-01` / Naver Blog / `[인천 아이랑] 영암어촌계ㅣ 갯벌체험 조개캐기`
- 신뢰도: 중상. 공공 관광·어촌 플랫폼에서 시설이 확인되지만 당일 운영은 물때와 계절에 의존한다.
- places 반영 파일: `content/places/incheon/index.ts`

### incheon-zoobugs-indoor-zoo

```ts
{
  id: 'incheon-zoobugs-indoor-zoo',
  name: '실내 동물원 쥬벅스',
  region: 'incheon',
  subRegion: '남동구',
  category: 'experience',
  themes: ['animal'],
  ageBands: ['1-3y', '3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  seasons: ['all-season'],
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'semi-official',
  sourceUrl: 'https://leisure-web.yanolja.com/leisure/10317474',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'semi_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '실내 동물원 쥬벅스 인천광역시 남동구 서창남순환로216번길 20',
  )}`,
  description:
    '서창동에서 여러 종의 동물을 실내에서 관찰하고 일부 교감 활동을 경험하는 유료 생태 체험 공간. 날씨 영향을 덜 받아 유아·초등 저학년 실내 나들이 후보로 쓰기 좋다.',
  address:
    '인천광역시 남동구 서창남순환로216번길 20 승연프라자 2층 204·205호',
  operatingHours: '매일 10:00-19:00(매표 마감 18:00) / 연중무휴 안내',
  priceInfo:
    '2026 NOL 판매 기준 평일 대인 12,000원·소인 15,000원 / 주말·공휴일 대인 13,000원·소인 17,000원 / 18개월 미만 증빙 시 무료',
  feedingRoom: false,
  strollerFriendly: false,
  rainFriendly: true,
  stayMinutes: 120,
  operatorType: 'commercial',
  editorNote:
    'NOL 상품 유효기간과 판매기간이 2026-12-31까지이며 당일 구매·당일 사용, 운영시간, 주소, 주차, 유모차 탑승 관람 불가를 안내한다. 민간 시설이라 가격과 동물 체험 구성은 방문 전 재확인한다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title: '인천 서창 실내동물원 아이와함께 가볼만한 곳 요즘핫플 쥬벅스',
      href: 'https://blog.naver.com/nimost/224329258899',
      sourceLabel: 'Naver Blog',
      description:
        '아이와 실내 동물 공간을 둘러본 최근 방문 흐름을 참고할 수 있는 후기입니다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 준공식 운영 신호: NOL 판매 페이지의 상품 유효기간 `2026-03-16~2026-12-31`, 판매기간 `~2026-12-31`.
- 보조 신호: 같은 페이지에 2026년 1~4월 실제 사용 후기가 노출되고, 2026년 상반기 채용 공고에서도 같은 주소와 시설명이 확인된다.
- 방문기 메타데이터: `2026-06-28` / Naver Blog / `인천 서창 실내동물원 아이와함께 가볼만한 곳 요즘핫플 쥬벅스`
- 신뢰도: 중상. 유효한 주요 티켓 판매와 2026 방문·채용 신호가 있으나 독립 공식 홈페이지를 확인하지 못했다.
- places 반영 파일: `content/places/incheon/index.ts`

## 보류 후보

| 장소                     | 지역   | 이유                                                                                                                                     | 다음 확인                                         |
| ------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| 장봉어촌체험휴양마을     | 옹진군 | 한국어촌어항공단 현재 마을 상세에는 갯벌 체험과 요금이 있으나, 2026년 정확한 체험 접수 일정과 장소명까지 일치하는 방문기를 확인하지 못함 | 마을 전화로 2026 체험 운영·예약 방식 확인 후 승격 |
| 선재도 어촌체험 휴양마을 | 옹진군 | 한국어촌어항공단 현재 목록에는 체험 3건이 노출되지만 인천투어 상세 페이지 최종수정일이 2022년이고 당일 운영표를 확인하지 못함            | 공식 마을 채널의 2026 물때표·요금표 확인          |

## 제외 후보

| 장소         | 이유                                                                                               | 근거                                                             |
| ------------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 강화갯벌센터 | 강화군 공식 입장료 페이지가 현재 `운영 중단`을 명시하고 2026년 리모델링 공사 신호가 있어 발행 불가 | <https://www.ganghwa.go.kr/open_content/tour/guide/entrance.jsp> |

## 행정구역·승격 주의사항

- 인천광역시 공식 행정체제 안내에 따라 2026년 7월 1일부터 `중구 섬지역 → 영종구`, `중구 내륙+동구 → 제물포구`, `서구 남부 → 서해구`, `서구 북부 → 검단구` 체제가 출범했다.
- 이번 후보 중 월미공원은 `제물포구`, 마시안은 `영종구`를 사용했다.
- 기존 `content/places/incheon/index.ts`에는 구 행정구역명인 `중구`, `서구`가 남아 있으므로 신규 객체만 새 이름을 쓰면 필터 값이 혼재할 수 있다. 승격 전에 전체 데이터의 subRegion 정책을 결정해야 한다.
- 공식 행정체제 출처: <https://www.incheon.go.kr/IC01070101>

## 간단 결론

- 신규 places 반영 가능: `9곳`
  - `official_verified`: 4곳
  - `semi_verified`: 5곳
- 보류: `2곳`
- 제외: `1곳`
- 2025~2026 외부 방문기 직접 링크: 확정 후보 9곳 모두 1개씩 확보
- 외부 블로그 이미지는 사용하지 않았고, 모든 후기 링크는 운영 사실과 분리해 `externalBlogLinks`로만 제안했다.
- seed 승격 시 우선순위는 `인천대공원 어린이동물원 → 늘솔길공원 양떼목장 → 저어새 생태학습관 → 소래습지생태공원 → 쥬벅스` 순으로 권장한다.

# 서울 동물 관련 키즈 체험 장소 리서치

- 기준일: `2026-07-10`
- 범위: 서울특별시 전역
- 목적: 1~7세 자녀와 방문할 수 있는 수족관·실내동물원·곤충·반딧불이·조류·하천 생태 체험 장소의 신규 seed 후보 수집
- PlaceSource 기준: `types/place-source.ts`
- 신규 확정 후보: `10곳` (`official_verified` 10곳)
- 최근 방문기 연결: `10곳` 모두 직접 URL 확보

## 수집 원칙

- 시설 공식 홈페이지, 서울시·자치구·공공 운영기관 페이지에서 2026년 운영 신호가 확인된 장소만 확정 후보로 올렸다.
- 운영시간·요금·예약·주차·주소는 공식 소스만 근거로 사용했다. 블로그는 방문 동선과 현장 분위기를 보완하는 주관적 참고 링크로만 분리했다.
- 외부 블로그 본문 문장을 복사하지 않고 공개 메타데이터의 제목·게시일·출처만 기록했다.
- 외부 블로그 이미지는 `thumbnailImage`나 `blogReviewHighlights`에 사용하지 않는다. 로컬 대표 이미지가 없으므로 `externalBlogLinks`만 제안한다.
- 가격·프로그램·휴무·생물 전시는 변동 가능성이 높아 방문 직전 공식 페이지 재확인을 전제로 적었다.
- `feedingRoom`, `strollerFriendly`, `parking`이 `false`인 경우 공식 출처에서 확인되지 않은 편의시설을 보수적으로 노출하지 않는다는 뜻이며, 시설이 없다는 단정은 아니다.
- 모든 후보에 동물 테마 필터용 `themes: ['animal']`을 넣었다.

## 중복 확인

아래 10개 시설명과 ID를 `content/places/seoul/index.ts`에서 검색했으며 직접 중복은 없었다.

- 씨라이프 코엑스 아쿠아리움
- 롯데월드 아쿠아리움
- 주렁주렁 영등포점
- 쥬라리움 금천점
- YDP곤충체험학습관
- 서울숲 곤충식물원·사슴우리
- 길동생태공원
- 월드컵공원 반딧불이생태관
- 중랑천환경센터
- 강서습지생태공원

기존 seed의 `서울어린이대공원`은 이미 동물 관찰 경험을 포함하므로 신규 후보에서 제외했다.

## 후보 요약

| 장소                       | 세부 지역 | 핵심 동물 경험                   | 실내/외   | 검증 상태           | 방문기 날짜  |
| -------------------------- | --------- | -------------------------------- | --------- | ------------------- | ------------ |
| 씨라이프 코엑스 아쿠아리움 | 강남구    | 상어·바다거북·물범·해양생물 관찰 | 실내      | `official_verified` | `2026-07-09` |
| 롯데월드 아쿠아리움        | 송파구    | 수달·펭귄·해양생물 관찰          | 실내      | `official_verified` | `2026-02-16` |
| 주렁주렁 영등포점          | 영등포구  | 실내 동물 관찰·교감              | 실내      | `official_verified` | `2026-07-02` |
| 쥬라리움 금천점            | 금천구    | 실내 동물 관찰·교감·키즈 놀이    | 실내      | `official_verified` | `2026-07-06` |
| YDP곤충체험학습관          | 영등포구  | 살아있는 곤충·소동물 관찰        | 실내      | `official_verified` | `2026-07-09` |
| 서울숲 곤충식물원·사슴우리 | 성동구    | 곤충·나비·꽃사슴 관찰            | 실내+야외 | `official_verified` | `2026-02-26` |
| 길동생태공원               | 강동구    | 반딧불이·조류·습지 생물 관찰     | 실내+야외 | `official_verified` | `2026-06-06` |
| 월드컵공원 반딧불이생태관  | 마포구    | 반딧불이 유충·성충·표본 관찰     | 실내      | `official_verified` | `2026-01-11` |
| 중랑천환경센터             | 노원구    | 조류 탐조·어류·수서생물 조사     | 실내+야외 | `official_verified` | `2026-06-15` |
| 강서습지생태공원           | 강서구    | 야생조류·습지 생태 관찰          | 야외      | `official_verified` | `2026-04-13` |

## PlaceSource 반영 후보

### seoul-sea-life-coex-aquarium

```ts
{
  id: 'seoul-sea-life-coex-aquarium',
  name: '씨라이프 코엑스 아쿠아리움',
  region: 'seoul',
  subRegion: '강남구',
  category: 'experience',
  themes: ['animal'],
  ageBands: ['1-3y', '3-6y', '6-10y', 'all'],
  indoorOutdoor: 'indoor',
  seasons: ['all-season'],
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'official',
  sourceUrl:
    'https://www.visitsealife.com/coex-seoul/plan-your-visit/before-you-visit/opening-hours/',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '씨라이프 코엑스 아쿠아리움 서울특별시 강남구 영동대로 513',
  )}`,
  description:
    '상어·바다거북·물범 등 다양한 해양생물을 실내에서 관찰하고 수중 공연과 체험 콘텐츠를 함께 즐길 수 있는 도심형 아쿠아리움이다.',
  address: '서울특별시 강남구 영동대로 513 코엑스몰 내',
  operatingHours: '매일 10:00-20:00(마지막 입장 19:00), 연중무휴',
  priceInfo: '방문일별 일반권·온라인 할인 요금은 공식 예매 페이지 확인',
  feedingRoom: true,
  strollerFriendly: false,
  rainFriendly: true,
  stayMinutes: 120,
  operatorType: 'commercial',
  editorNote:
    '운영시간은 현장·기상 상황에 따라 바뀔 수 있다. 공식 도움말에서 수유실과 기저귀 교환 공간을 확인했다. 유모차 반입 가능 여부는 공식 운영 페이지에서 명확히 확인되지 않아 보수적으로 false로 두었다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title:
        '코엑스 아쿠아리움 할인부터 공연시간까지 총정리! 인어공연·물범 먹이주기 꿀팁 (+주차 할인)',
      href: 'https://blog.naver.com/khimp/224341675975',
      sourceLabel: 'Naver Blog',
      description:
        '2026-07-09 방문 후기. 공연과 관람 동선을 방문자 관점에서 참고하는 링크이며 요금·시간은 공식 페이지에서 재확인한다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 운영 페이지가 365일 운영, 10:00~20:00, 마지막 입장 19:00을 현재 날짜 기준으로 노출한다.
- 공식 편의시설: <https://www.visitsealife.com/coex-seoul/plan-your-visit/information/help-center/>
- 공식 위치·주차: <https://www.visitsealife.com/coex-seoul/plan-your-visit/before-you-visit/directions-parking/>
- 방문기 메타데이터: `2026-07-09` / Naver Blog / 직접 URL 확인
- 신뢰도: 높음. 공식 운영시간·주소·편의시설과 2026년 최근 방문기가 함께 확인된다.

### seoul-lotte-world-aquarium

```ts
{
  id: 'seoul-lotte-world-aquarium',
  name: '롯데월드 아쿠아리움',
  region: 'seoul',
  subRegion: '송파구',
  category: 'experience',
  themes: ['animal'],
  ageBands: ['1-3y', '3-6y', '6-10y', 'all'],
  indoorOutdoor: 'indoor',
  seasons: ['all-season'],
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'official',
  sourceUrl:
    'https://aquarium.lotteworld.com/usage-guide/service/operation-information/list',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '롯데월드 아쿠아리움 서울특별시 송파구 올림픽로 300',
  )}`,
  description:
    '롯데월드몰 지하에서 펭귄·수달·가오리 등 해양생물을 관찰하고 대형 수조와 해저 터널을 따라 걷는 실내 아쿠아리움이다.',
  address: '서울특별시 송파구 올림픽로 300 롯데월드몰 B1-B2',
  operatingHours:
    '방문일별 운영시간은 공식 일정표 확인(매표·입장 마감은 운영 종료 1시간 전)',
  priceInfo:
    '일반권 성인·청소년 35,000원, 어린이·경로 31,000원; 방문 전 공식 요금표 재확인',
  feedingRoom: true,
  strollerFriendly: false,
  rainFriendly: true,
  stayMinutes: 120,
  operatorType: 'commercial',
  editorNote:
    '공식 운영 일정표가 2026년 7월 일정을 제공한다. 베이비 라운지에서 기저귀 교환대·수유 소파·정수기·전자레인지 등을 제공한다. 유모차 반입 여부는 공식 페이지에서 명확히 확인되지 않아 보수적으로 false로 두었다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title:
        '🐠 서울 아이랑 가볼만한곳! 롯데월드 아쿠아리움 다녀온 리얼후기 🐟',
      href: 'https://blog.naver.com/husbandpark119/224184939933',
      sourceLabel: 'Naver Blog',
      description:
        '2026-02-16 아이 동반 방문 후기. 가족 관람 분위기와 동선을 참고하는 주관적 링크다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 요금표: <https://aquarium.lotteworld.com/price/ticket/price>
- 공식 베이비 라운지: <https://aquarium.lotteworld.com/usage-guide/service/convenient-facilities/information/detail?convnDtlOrd=1&convnSeq=2>
- 공식 시설 안내: <https://aquarium.lotteworld.com/facilities/floor-info/list>
- 방문기 메타데이터: `2026-02-16` / Naver Blog / 아이 동반 직접 방문 후기
- 신뢰도: 높음. 운영 일정·요금·편의시설이 모두 시설 공식 사이트에 있다.

### seoul-zoolung-zoolung-yeongdeungpo

```ts
{
  id: 'seoul-zoolung-zoolung-yeongdeungpo',
  name: '주렁주렁 영등포점',
  region: 'seoul',
  subRegion: '영등포구',
  category: 'experience',
  themes: ['animal'],
  ageBands: ['1-3y', '3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  seasons: ['all-season'],
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'official',
  sourceUrl:
    'https://zoolungzoolung.com/%EC%A7%80%EC%A0%90%EC%95%88%EB%82%B4/%EC%98%81%EB%93%B1%ED%8F%AC%EC%A0%90/',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '주렁주렁 영등포점 서울특별시 영등포구 영중로 15',
  )}`,
  description:
    '타임스퀘어 안에서 다양한 동물을 가까이 관찰하고 교감형 프로그램과 미디어아트를 함께 즐기는 실내 애니멀 테마파크다.',
  address: '서울특별시 영등포구 영중로 15 타임스퀘어 4-5층',
  operatingHours:
    '평일 12:00-20:00(입장 마감 18:30) / 주말·공휴일 10:30-20:30(입장 마감 19:00) / 월별 휴무일 공식 확인',
  priceInfo: '평일 종일 29,000원 / 주말·공휴일 4시간 29,000원',
  feedingRoom: false,
  strollerFriendly: false,
  rainFriendly: true,
  stayMinutes: 180,
  operatorType: 'commercial',
  editorNote:
    '공식 지점 페이지가 2026년 7월 휴무일과 정상 운영을 표시한다. 3시간 무료 주차가 가능하고 유모차는 파크 안에 반입할 수 없다. 할인권·월별 휴무일은 방문일에 재확인한다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title:
        '[영등포] 아기랑 실내 나들이 주렁주렁 영등포점 할인 주차 유모차 주말 꿀팁 모음',
      href: 'https://blog.naver.com/shoonya48/224330704844',
      sourceLabel: 'Naver Blog',
      description:
        '2026-07-02 아기 동반 방문 후기. 실내 관람 동선과 현장 분위기를 참고하는 링크다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 페이지가 운영시간, 29,000원 요금, 2026년 7월 휴무일, 3시간 무료 주차, 유모차 반입 금지를 한 번에 안내한다.
- 방문기 메타데이터: `2026-07-02` / Naver Blog / 아기 동반 직접 방문 후기
- 신뢰도: 높음. 지점 공식 페이지에 2026년 월별 운영 신호가 있다.

### seoul-zoorarium-geumcheon

```ts
{
  id: 'seoul-zoorarium-geumcheon',
  name: '쥬라리움 금천점',
  region: 'seoul',
  subRegion: '금천구',
  category: 'experience',
  themes: ['animal'],
  ageBands: ['1-3y', '3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  seasons: ['all-season'],
  priceType: 'paid',
  reservationRequired: false,
  parking: false,

  sourceType: 'official',
  sourceUrl: 'https://zoorarium.com/geumcheon',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '쥬라리움 금천점 서울특별시 금천구 두산로 71',
  )}`,
  description:
    '실내 동물원과 키즈 놀이공간을 결합해 동물 관찰·교감과 신체 놀이를 한 장소에서 이어갈 수 있는 체험형 시설이다.',
  address: '서울특별시 금천구 두산로 71 3층',
  operatingHours:
    '10:30-19:00(입장 마감 18:00) / 매월 둘째·넷째 일요일 휴무 / 공휴일 정상 운영',
  priceInfo:
    '현장권 평일 소인 16,900원부터·대인 13,900원부터, 주말 소인 19,900원부터·대인 14,900원부터; 온라인 가격 상이',
  feedingRoom: false,
  strollerFriendly: false,
  rainFriendly: true,
  stayMinutes: 180,
  operatorType: 'commercial',
  editorNote:
    '공식 페이지는 건물명을 롯데빅마켓금천점으로 표기하므로 최신 상업시설 명칭과 주차 조건은 방문 전에 지도·매장에 재확인해야 한다. 17개월까지 증빙서류 지참 시 무료이며 양말 착용이 필수다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title:
        '17개월 아이랑 갈만한 곳 | 쥬라리움 금천점 | 실내동물원 & 키즈카페 | 경기도 아이와 갈만한 곳',
      href: 'https://blog.naver.com/minah_ggam/224337402044',
      sourceLabel: 'Naver Blog',
      description:
        '2026-07-06 게시된 17개월 아이 동반 방문 후기. 제목의 경기도 표기와 달리 실제 시설은 서울 금천구에 있다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 페이지가 2026 저작권 표기와 함께 운영시간·정기휴무·현장요금·무료 연령·양말 규칙을 제공한다.
- 방문기 메타데이터: `2026-07-06` / Naver Blog / 방문일 `2026-06-21`이 소개문에 기재됨
- 신뢰도: 높음. 시설 운영 사실은 공식 사이트로 검증했고, 상업시설 명칭·주차만 재확인 항목으로 남겼다.

### seoul-ydp-insect-experience-center

```ts
{
  id: 'seoul-ydp-insect-experience-center',
  name: 'YDP곤충체험학습관',
  region: 'seoul',
  subRegion: '영등포구',
  category: 'experience',
  themes: ['animal'],
  ageBands: ['1-3y', '3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  seasons: ['all-season'],
  priceType: 'paid',
  reservationRequired: false,
  parking: false,

  sourceType: 'official',
  sourceUrl:
    'https://youth.seoul.go.kr/infoData/sprtInfo/view.do?key=2309130006&sprtInfoId=68711',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    'YDP곤충체험학습관 서울특별시 영등포구 선유동1로 80',
  )}`,
  description:
    '도심에서 살아있는 곤충과 소동물을 관찰하고 곤충 생태 전시와 교감형 체험을 즐길 수 있는 영등포구 공공 체험학습관이다.',
  address: '서울특별시 영등포구 선유동1로 80 영등포구청 별관 E동',
  operatingHours:
    '화-일요일 10:00-17:00(입장 마감 16:00) / 월요일·5월 1일·설·추석 일부 휴관',
  priceInfo: '관내·관외 요금과 감면 기준은 방문 전 공식 안내 확인',
  feedingRoom: false,
  strollerFriendly: false,
  rainFriendly: true,
  stayMinutes: 60,
  operatorType: 'public',
  editorNote:
    '서울시 공식 안내가 2026-04-01부터 입장료 일부 인하와 현재 운영시간을 명시한다. 요금표가 이미지로 제공되어 seed에는 변동 가능한 숫자를 옮기지 않고 공식 안내 확인 문구를 유지한다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title: '아이랑 가기 좋은 YDP곤충체험학습관 실내 곤충 체험관 후기',
      href: 'https://blog.naver.com/loxloxl/224341607238',
      sourceLabel: 'Naver Blog',
      description:
        '2026-07-09 아이 동반 방문 후기. 실내 전시 구성과 관람 동선을 참고하는 최신 링크다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 2026 서울시 공식 안내가 위치, 운영시간, 휴관일, 입장료 인하를 확인해 준다.
- 영등포구 공식 재개관 안내: <https://www.ydp.go.kr/www/selectBbsNttView.do?bbsNo=126&key=3187&nttNo=401001>
- 방문기 메타데이터: `2026-07-09` / Naver Blog / 아이 동반 직접 방문 후기
- 신뢰도: 높음. 2026년 운영 신호와 최신 방문기가 모두 확인된다.

### seoul-forest-insect-garden-deer

```ts
{
  id: 'seoul-forest-insect-garden-deer',
  name: '서울숲 곤충식물원·사슴우리',
  region: 'seoul',
  subRegion: '성동구',
  category: 'park',
  themes: ['animal'],
  ageBands: ['1-3y', '3-6y', '6-10y', 'all'],
  indoorOutdoor: 'both',
  seasons: ['all-season'],
  priceType: 'free',
  reservationRequired: false,
  parking: true,

  sourceType: 'official',
  sourceUrl: 'https://parks.seoul.go.kr/template/sub/seoulforest.do',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '서울숲 곤충식물원 서울특별시 성동구 뚝섬로 273',
  )}`,
  description:
    '곤충식물원에서 곤충과 열대식물을 관찰하고 생태숲 사슴우리에서 꽃사슴을 볼 수 있어 실내외 동물 관찰을 함께 묶기 좋은 무료 공원 코스다.',
  address: '서울특별시 성동구 뚝섬로 273 서울숲',
  operatingHours:
    '사슴우리 05:30-21:30 / 곤충식물원 3-10월 10:00-17:00, 11-2월 10:00-16:00(월요일 휴관)',
  priceInfo: '무료',
  feedingRoom: true,
  strollerFriendly: true,
  rainFriendly: false,
  stayMinutes: 120,
  operatorType: 'public',
  editorNote:
    '사슴 먹이 판매는 2020년부터 중단됐다. 방문자센터에서 수유실과 최대 2시간 무료 유모차 대여를 운영한다. 2026-04-23 곤충식물원 공사는 하루짜리 임시 운영 중지였고 현재 공식 이용시간 안내가 유지된다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title: '서울숲 곤충식물원/2026/2/26',
      href: 'https://song550105.tistory.com/18825',
      sourceLabel: 'Tistory',
      description:
        '2026-02-26 곤충식물원 방문 사진 후기. 아이 동반 전용 후기는 아니며 현장 분위기만 참고한다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 페이지가 사슴우리·곤충식물원 운영시간, 주소, 수유실, 유모차 대여, 주차장 211면을 안내한다.
- 2026년 4월 공사 안내: <https://parks.seoul.go.kr/story/news/detailView.do?bIdx=3706>
- 방문기 메타데이터: `2026-02-26` / Tistory / 곤충식물원 직접 방문 사진 후기
- 신뢰도: 높음. 일회성 공사 종료 여부까지 공식 페이지로 교차 확인했다.

### seoul-gildong-ecological-park

```ts
{
  id: 'seoul-gildong-ecological-park',
  name: '길동생태공원',
  region: 'seoul',
  subRegion: '강동구',
  category: 'park',
  themes: ['animal'],
  ageBands: ['3-6y', '6-10y', 'all'],
  indoorOutdoor: 'both',
  seasons: ['spring', 'summer', 'fall'],
  priceType: 'free',
  reservationRequired: true,
  parking: true,

  sourceType: 'official',
  sourceUrl: 'https://parks.seoul.go.kr/template/sub/gildong.do',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '길동생태공원 서울특별시 강동구 천호대로 1291',
  )}`,
  description:
    '반딧불이체험관·조류관찰대·습지 데크를 따라 반딧불이와 새, 개구리 등 도심 생물을 관찰하는 예약형 생태공원이다.',
  address: '서울특별시 강동구 천호대로 1291',
  operatingHours:
    '08:00-18:00(16:00 입장 마감) / 11월 15일-3월 15일 08:00-17:00 / 월요일 휴무',
  priceInfo: '무료',
  feedingRoom: false,
  strollerFriendly: false,
  rainFriendly: false,
  stayMinutes: 90,
  operatorType: 'public',
  editorNote:
    '서울시 공공서비스예약 사전 예약 또는 당일 현장등록이 필요하며 1일 최대 400명이다. 주차장은 프로그램 등 사전 예약자만 이용할 수 있어 주차가 필요하면 반드시 미리 예약한다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title:
        '[20260606] 서울둘레길 7코스 일자산 구간과 길동생태공원 이어 걷기 - 4부',
      href: 'https://macgyver-dct.tistory.com/16166151',
      sourceLabel: 'Tistory',
      description:
        '2026-06-06 반딧불이체험관·조류관찰대·습지 구간을 걸은 방문 기록. 아이 동반 전용 후기는 아니며 야외 동선 참고용이다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 페이지가 현재 운영시간, 월요일 휴무, 사전예약·당일등록, 주차 제한, 1일 400명 제한을 명시한다.
- 2026년 아동 프로그램 예시: <https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260219110726351315>
- 방문기 메타데이터: `2026-06-06` / Tistory / 공원 내부 구간 직접 방문 기록
- 신뢰도: 높음. 시설 운영과 입장 조건이 서울시 공식 공원 페이지에서 확인된다.

### seoul-noeul-firefly-ecology-center

```ts
{
  id: 'seoul-noeul-firefly-ecology-center',
  name: '월드컵공원 반딧불이생태관',
  region: 'seoul',
  subRegion: '마포구',
  category: 'experience',
  themes: ['animal'],
  ageBands: ['3-6y', '6-10y', 'all'],
  indoorOutdoor: 'indoor',
  seasons: ['summer'],
  priceType: 'free',
  reservationRequired: false,
  parking: true,

  sourceType: 'official',
  sourceUrl:
    'https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260520140513904308',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '월드컵공원 반딧불이생태관 서울특별시 마포구 하늘공원로 108',
  )}`,
  description:
    '반딧불이의 생태와 우리나라 종을 배우고 시기에 따라 유충·성충·표본을 관찰하는 월드컵공원 무료 생태관이다.',
  address: '서울특별시 마포구 하늘공원로 108 노을공원 주차장 입구',
  operatingHours:
    '프로그램 외 자유관람 가능 / 일요일·월요일·공휴일 휴관 / 당일 자유관람 시간은 공식 공고 확인',
  priceInfo: '무료',
  feedingRoom: false,
  strollerFriendly: false,
  rainFriendly: true,
  stayMinutes: 60,
  operatorType: 'public',
  editorNote:
    '2026년 6월 공식 해설 프로그램에서 유충·성충 관찰과 프로그램 외 자유관람을 확인했다. 해설 프로그램은 인터넷 예약이 필요하지만 일반 자유관람은 예약 필수가 아니다. 생물 상태에 따라 실제 관찰 대상이 달라질 수 있다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title:
        '[반딧불이 생태관]초등 과학 곤충 체험 프로그램, 예약방법, 주차_ 서울 마포 상암동 월드컵공원',
      href: 'https://blog.naver.com/expert4you/224142492265',
      sourceLabel: 'Naver Blog',
      description:
        '2026-01-11 게시된 가족 체험 참고 후기. 예약 프로그램의 주관적 경험을 확인하는 링크다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 2026년 서울시 공식 프로그램 페이지가 위치, 무료 이용, 휴관일, 관찰 내용, 자유관람 가능 여부를 안내한다.
- 월드컵공원 공식 시설 페이지: <https://parks.seoul.go.kr/parks/detailView.do?pIdx=6>
- 방문기 메타데이터: `2026-01-11` / Naver Blog / 반딧불이 프로그램 중심 후기
- 신뢰도: 높음. 2026년 공식 예약 공고가 현재 시설 운영을 확인해 준다.

### seoul-jungnangcheon-environment-center

```ts
{
  id: 'seoul-jungnangcheon-environment-center',
  name: '중랑천환경센터',
  region: 'seoul',
  subRegion: '노원구',
  category: 'experience',
  themes: ['animal'],
  ageBands: ['3-6y', '6-10y'],
  indoorOutdoor: 'both',
  seasons: ['spring', 'summer', 'fall'],
  priceType: 'partial-free',
  reservationRequired: true,
  parking: false,

  sourceType: 'official',
  sourceUrl: 'https://www.jrecocenter.or.kr/',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '중랑천환경센터 서울특별시 노원구 덕릉로 430',
  )}`,
  description:
    '중랑천을 걸으며 새를 탐조하고 어류·수서생물을 조사하는 예약형 생태교육을 운영하는 노원구 환경교육 시설이다.',
  address: '서울특별시 노원구 덕릉로 430',
  operatingHours: '화-토요일 10:00-17:00 / 일·월요일·법정공휴일 휴관',
  priceInfo: '프로그램별 무료 또는 1,000-2,000원 등 상이',
  feedingRoom: false,
  strollerFriendly: false,
  rainFriendly: false,
  stayMinutes: 90,
  operatorType: 'public',
  editorNote:
    '2026년 어린이도시어부·조조탐조·생물다양성 탐사대회 등 동물 관찰형 프로그램이 확인된다. 대상 연령, 보호자 동반, 장화·여벌옷, 참가비는 프로그램마다 달라 신청 상세를 반드시 확인한다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title:
        '아이와 생태체험 2026 중랑천 생물다양성 탐사대회, 무료 조류 탐조 후기 및 환경 이야기 🌾🐦',
      href: 'https://blog.naver.com/iyoanna/224316283561',
      sourceLabel: 'Naver Blog',
      description:
        '2026-06-15 아이 동반 조류 탐조 후기. 실제 프로그램 흐름과 야외 준비를 참고하는 주관적 링크다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 홈페이지가 2026년 7월 어린이도시어부·조조탐조와 2026 생물다양성 탐사대회를 현재 노출한다.
- 2026 생물다양성 탐사대회: <https://www.jrecocenter.or.kr/goods/view/BTLAI-5713>
- 공식 페이지의 2026 프로그램 후기에는 6~7세 중랑천 생물 관찰, 초등 수서생물 채집·현미경 관찰도 확인된다.
- 방문기 메타데이터: `2026-06-15` / Naver Blog / 아이 동반 조류 탐조 직접 후기
- 신뢰도: 높음. 시설 공식 사이트에서 2026년 최신 프로그램과 운영시간을 함께 확인했다.

### seoul-gangseo-wetland-ecological-park

```ts
{
  id: 'seoul-gangseo-wetland-ecological-park',
  name: '강서습지생태공원',
  region: 'seoul',
  subRegion: '강서구',
  category: 'park',
  themes: ['animal'],
  ageBands: ['6-10y', 'all'],
  indoorOutdoor: 'outdoor',
  seasons: ['spring', 'fall', 'winter'],
  priceType: 'free',
  reservationRequired: false,
  parking: true,

  sourceType: 'official',
  sourceUrl: 'https://hangang.seoul.go.kr/www/contents/819.do?mid=581',
  verifiedAt: '2026-07-10',
  lastObservedAt: '2026-07-10',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent(
    '강서습지생태공원 서울특별시 강서구 방화동 25',
  )}`,
  description:
    '한강 하류 습지의 탐방로와 조류 관찰 공간에서 철새와 야생조류, 습지 생물을 살펴보는 무료 야외 생태공원이다.',
  address: '서울특별시 강서구 방화동 25 일대',
  operatingHours: '연중 현장방문 가능 / 생태 프로그램은 별도 일정·예약 확인',
  priceInfo: '무료',
  feedingRoom: false,
  strollerFriendly: false,
  rainFriendly: false,
  stayMinutes: 120,
  operatorType: 'public',
  editorNote:
    '서울시 공식 시설 목록에서 운영 중·무료·연중 현장방문을 확인했다. 생태 프로그램은 별도 예약이 필요하고 계절·현장 상황에 따라 달라진다. 공식 페이지마다 방화동 일대와 안내센터 주소가 달라 지도는 시설명 검색 링크를 유지한다.',
  linkedPostSlugs: [],
  externalBlogLinks: [
    {
      title: '강서한강공원 강서습지생태공원, 산책하기 좋은 예쁜 길',
      href: 'https://invitetour.tistory.com/3272',
      sourceLabel: 'Tistory',
      description:
        '2026-04-13 습지생태공원 직접 방문 후기. 아이 동반 전용 후기는 아니며 탐방로 분위기 참고용이다.',
    },
  ],
  thumbnailImage: '',
}
```

#### 출처 메모

- 서울시 미래한강본부 공식 페이지가 `운영중`, 무료, 현장방문, 연중 이용, 방화동 25 일대를 명시한다.
- 공식 페이지는 야생조류 관찰과 가족 생태밧줄놀이 등을 강서습지생태공원 프로그램 예시로 제공한다.
- 2026년 가족 프로그램 예시: <https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260322133855090653>
- 방문기 메타데이터: `2026-04-13` / Tistory / 공원 직접 방문 후기
- 신뢰도: 높음. 일반 방문과 프로그램 예약을 구분해 공식 페이지에서 검증했다.

## 반영 시 주의사항

1. `themes: ['animal']`은 카테고리를 바꾸지 않고 동물 테마 필터에 노출하기 위한 보조 조건이다.
2. `서울숲 곤충식물원·사슴우리`, `길동생태공원`, `강서습지생태공원`은 넓은 공원 안의 동물 경험이므로 카드 설명과 지도 검색어가 실제 관찰 구역을 가리키도록 유지한다.
3. `길동생태공원`은 일반 입장도 예약 또는 현장등록 절차가 있고, 주차는 사전예약자만 가능하다.
4. `월드컵공원 반딧불이생태관`은 자유관람은 예약 불필요지만 해설 프로그램은 예약이 필요하다.
5. 상업시설 요금과 월별 휴무일은 변동성이 높으므로 정적 seed 숫자를 고정 사실처럼 노출하지 않는다.
6. 외부 블로그 링크는 운영 사실 검증에 사용하지 않으며, 썸네일은 향후 로컬 라이선스 확보 이미지로 별도 채운다.

## 보류·제외

| 장소                     | 처리 | 이유                                                                    |
| ------------------------ | ---- | ----------------------------------------------------------------------- |
| 서울어린이대공원         | 제외 | 기존 `content/places/seoul/index.ts` seed와 중복                        |
| 테이블에이 동물원 홍대점 | 보류 | 2026년 현재 운영·아동 입장 조건을 공식 소스로 충분히 교차 검증하지 못함 |

## 결론

서울 신규 후보 10곳은 모두 2026년 공식 운영 신호가 있고 `official_verified`로 승격 가능하다. 실내 상업시설 5곳과 공공 생태 체험 5곳이 섞여 있어 동물 테마 필터의 실내·야외·무료·유료 선택지를 균형 있게 확장할 수 있다.

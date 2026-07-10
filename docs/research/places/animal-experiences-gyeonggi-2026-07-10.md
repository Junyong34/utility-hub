# 경기권 동물 관련 키즈 체험 장소 리서치

기준일: `2026-07-10`

이 문서는 서울·경기·인천 동물 테마 장소 확장 작업 중 `경기남부`와 `경기북부` 후보만 정리한 반영 전 리서치 문서다. 운영 사실은 공식·준공식 소스로 확인하고, 외부 블로그는 최근 방문 동선과 아이 반응을 보완하는 참고 링크로만 분리했다.

## 조사 결과 요약

| 권역     | 확정 후보 | official_verified | semi_verified | 최근 방문기 후보 연결 |
| -------- | --------: | ----------------: | ------------: | --------------------: |
| 경기남부 |         9 |                 7 |             2 |                     9 |
| 경기북부 |         5 |                 3 |             2 |                     5 |
| 합계     |        14 |                10 |             4 |                    14 |

## 수집 원칙

- `sourceUrl`, 운영시간, 요금, 예약, 주차, 주소는 시설·지자체·공공 관광 플랫폼을 우선했다.
- 공식 사이트가 동적 렌더링 또는 접근 제한으로 세부값을 안정적으로 확인하기 어려운 경우 공식 SNS나 경기투어패스를 `semi-official`로 분류했다.
- 편의시설을 공식 근거에서 확인하지 못한 경우 추정하지 않고 `false`로 두고 `editorNote`에 재확인 항목을 남겼다.
- 외부 블로그 본문은 운영 사실의 근거로 사용하지 않았다. 아래 링크는 직접 URL과 공개된 제목·게시일만 보관했다.
- 외부 이미지는 저장하지 않았고, `externalBlogLinks`에도 썸네일 URL을 넣지 않았다.

## 중복 점검

`content/places/gyeonggi-south/index.ts`, `content/places/gyeonggi-north/index.ts`에서 시설명·주소 기준으로 확인했다. 아래 14곳과 동일한 기존 시드는 없었다. `그라운드플래닛 서울대공원점`은 이름에 서울대공원이 포함되지만 별도 키즈카페이므로 중복이 아니다.

기존 시드에 이미 있어 신규 후보에서 제외한 동물 관련 장소는 다음과 같다.

- 주렁주렁 하남점
- 에버랜드
- 아쿠아플라넷 광교
- 의왕조류생태과학관
- 시흥해양생태과학관
- 카페드아쿠아 안성
- 원더빌리지·카페드아쿠아
- 퍼스트가든

`벅스리움`, `양평곤충박물관`, `부천자연생태공원`, `판교환경생태학습원`, `반석산 에코스쿨`, `구리시곤충생태관`, `양주곤충박물관`은 기존 지역 리서치 문서의 원시/API 후보에도 등장하지만 실제 `content/places` 시드에는 아직 없어서 이번 후보에 유지했다.

## PlaceSource 반영 후보

아래 객체는 `types/place-source.ts`의 `PlaceSource` 필드에 맞춘 초안이다. 모든 후보에 동물 테마 필터용 `themes: ['animal']`을 넣었다.

```ts
const gyeonggiAnimalExperienceCandidates: PlaceSource[] = [
  {
    id: 'gyeonggi-south-seoul-grand-park-zoo',
    name: '서울대공원 동물원',
    region: 'gyeonggi-south',
    subRegion: '과천시',
    category: 'experience',
    themes: ['animal'],
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'both',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl:
      'https://grandpark.seoul.go.kr/conts/contsView/ko/S001001002005.do',
    verifiedAt: '2026-07-10',
    lastObservedAt: '2026-07-10',
    verificationStatus: 'official_verified',
    naverMapUrl:
      'https://map.naver.com/p/search/서울대공원%20동물원%20경기도%20과천시%20대공원광장로%20102',
    description:
      '대형 야외 방사장과 실내 동물사, 어린이동물원, 생태 설명 프로그램을 함께 운영하는 공립 동물원이다.',
    address: '경기도 과천시 대공원광장로 102',
    operatingHours:
      '3~4월·9~10월 09:00~18:00, 5~8월 09:00~19:00, 11~2월 09:00~17:00; 입장 마감 1시간 전',
    priceInfo:
      '동물원 개인 기준 어른 5,000원, 청소년 3,000원, 어린이 2,000원; 만 5세 이하 무료',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: false,
    stayMinutes: 300,
    operatorType: 'public',
    editorNote:
      '365일 운영하나 동물 상태·날씨·시설 공사에 따라 일부 동물사가 제한될 수 있다. 공식 관람안내를 당일 재확인한다.',
    linkedPostSlugs: [],
    externalBlogLinks: [
      {
        title: '서울대공원 동물원 오픈런 후기! 레서판다 보고 유모차 대여까지',
        href: 'https://growthmemo.tistory.com/577',
        sourceLabel: 'Tistory',
        description: '방문 동선과 유모차 이용 경험을 참고하는 개인 후기다.',
      },
    ],
  },
  {
    id: 'gyeonggi-south-anseong-farmland',
    name: '안성팜랜드',
    region: 'gyeonggi-south',
    subRegion: '안성시',
    category: 'experience',
    themes: ['animal'],
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'both',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://nhasfarmland.com/asfarm.php',
    verifiedAt: '2026-07-10',
    lastObservedAt: '2026-07-10',
    verificationStatus: 'official_verified',
    naverMapUrl:
      'https://map.naver.com/p/search/안성팜랜드%20경기도%20안성시%20공도읍%20대신두길%2028',
    description:
      '가축 교감, 승마, 공연과 넓은 초지 산책을 묶어 즐길 수 있는 농축산 테마 체험공간이다.',
    address: '경기도 안성시 공도읍 대신두길 28',
    operatingHours: '10:00~18:00, 매표 마감 17:00; 승마 체험은 별도 마감',
    priceInfo: '시즌·온라인 예매 여부에 따라 변동하므로 공식 요금표 확인 필요',
    feedingRoom: false,
    strollerFriendly: false,
    rainFriendly: false,
    stayMinutes: 240,
    operatorType: 'commercial',
    editorNote:
      '현장 구매가 가능해 일반 입장은 예약 필수가 아니다. 동물 공연·승마 회차와 유아 편의시설은 방문일에 재확인한다.',
    linkedPostSlugs: [],
    externalBlogLinks: [
      {
        title:
          '안성팜랜드 아이와 함께 승마부터 승마카트 여행 추천 후기 내돈내산',
        href: 'https://aerok9.tistory.com/718',
        sourceLabel: 'Tistory',
        description: '승마와 가족 동선을 참고하는 개인 방문 후기다.',
      },
    ],
  },
  {
    id: 'gyeonggi-south-siheung-bugsrium',
    name: '시흥시 곤충전시체험관 벅스리움',
    region: 'gyeonggi-south',
    subRegion: '시흥시',
    category: 'museum',
    themes: ['animal'],
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://bugsrium.siheung.go.kr/',
    verifiedAt: '2026-07-10',
    lastObservedAt: '2026-07-10',
    verificationStatus: 'official_verified',
    naverMapUrl:
      'https://map.naver.com/p/search/시흥시%20곤충전시체험관%20벅스리움%20경기도%20시흥시%20서해안로%20275',
    description:
      '살아있는 곤충과 표본 전시, 생태 해설을 실내에서 관람하는 시흥시 공공 곤충 체험관이다.',
    address: '경기도 시흥시 서해안로 275',
    operatingHours:
      '10:00~12:00(11:30 발권 마감), 13:30~17:00(16:30 발권 마감); 월요일·명절 당일 등 휴관',
    priceInfo:
      '성인 3,000원, 36개월~18세 아동·청소년 2,000원; 36개월 미만 무료',
    feedingRoom: false,
    strollerFriendly: false,
    rainFriendly: true,
    stayMinutes: 90,
    operatorType: 'public',
    editorNote:
      '일반 자유관람은 예약 불필요다. 12:00~13:30은 생물관리·점심시간이라 입장할 수 없다.',
    linkedPostSlugs: [],
    externalBlogLinks: [
      {
        title:
          '주말에 아이랑 갈 곳? 시흥 실내 놀거리 끝판왕? 벅스리움 직접 가봄',
        href: 'https://fence1004.tistory.com/entry/%EC%A3%BC%EB%A7%90%EC%97%90-%EC%95%84%EC%9D%B4%EB%9E%91-%EA%B0%88-%EA%B3%B3-%EC%8B%9C%ED%9D%A5-%EC%8B%A4%EB%82%B4-%EB%86%80%EA%B1%B0%EB%A6%AC-%EB%81%9D%ED%8C%90%EC%99%95-%EB%B2%85%EC%8A%A4%EB%A6%AC%EC%9B%80-%EC%A7%81%EC%A0%91-%EA%B0%80%EB%B4%84',
        sourceLabel: 'Tistory',
        description: '실내 관람 동선과 아이 반응을 참고하는 개인 후기다.',
      },
    ],
  },
  {
    id: 'gyeonggi-south-osan-bird-park',
    name: '오산버드파크',
    region: 'gyeonggi-south',
    subRegion: '오산시',
    category: 'experience',
    themes: ['animal'],
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'semi-official',
    sourceUrl: 'https://pf.kakao.com/_vRjUG',
    verifiedAt: '2026-07-10',
    lastObservedAt: '2026-07-10',
    verificationStatus: 'semi_verified',
    naverMapUrl:
      'https://map.naver.com/p/search/오산버드파크%20경기도%20오산시%20성호대로%20141',
    description:
      '조류를 중심으로 다양한 소동물을 가까이 관찰하고 일부 교감 체험을 할 수 있는 실내 동물 체험시설이다.',
    address: '경기도 오산시 성호대로 141 오산시청',
    operatingHours: '10:00~19:00; 입장 마감과 휴무는 공식 채널 재확인 필요',
    priceInfo: '연령·할인별 요금은 공식 예매 채널에서 방문 전 확인 필요',
    feedingRoom: false,
    strollerFriendly: false,
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
    editorNote:
      '공식 카카오 채널에서 2026년 후기·소식 노출을 확인했다. 상세 요금과 휴무일은 동적 예매 페이지를 재확인한다.',
    linkedPostSlugs: [],
    externalBlogLinks: [
      {
        title: '동물들과의 가까운 하루｜오산버드파크 후기',
        href: 'https://jungni.tistory.com/entry/%EB%8F%99%EB%AC%BC%EB%93%A4%EA%B3%BC%EC%9D%98-%EA%B0%80%EA%B9%8C%EC%9A%B4-%ED%95%98%EB%A3%A8-%EF%BD%9C%EC%98%A4%EC%82%B0%EB%B2%84%EB%93%9C%ED%8C%8C%ED%81%AC',
        sourceLabel: 'Tistory',
        description: '실내 동물 관람 경험을 참고하는 개인 후기다.',
      },
    ],
  },
  {
    id: 'gyeonggi-south-yangpyeong-insect-museum',
    name: '양평곤충박물관',
    region: 'gyeonggi-south',
    subRegion: '양평군',
    category: 'museum',
    themes: ['animal'],
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'semi-official',
    sourceUrl: 'https://www.ggtourpass.kr/32',
    verifiedAt: '2026-07-10',
    lastObservedAt: '2026-07-10',
    verificationStatus: 'semi_verified',
    naverMapUrl:
      'https://map.naver.com/p/search/양평곤충박물관%20경기도%20양평군%20옥천면%20경강로%201496',
    description:
      '곤충 표본과 생태 전시를 아이 눈높이에서 살펴보는 양평의 공공 곤충 박물관이다.',
    address: '경기도 양평군 옥천면 경강로 1496',
    operatingHours:
      '화~일 운영, 월요일 휴관; 계절별 관람 마감시간은 양평군 공식 안내 재확인 필요',
    priceInfo:
      '일반 입장 유료; 경기투어패스 포함 혜택과 일반 관람료를 구분해 공식 안내 확인 필요',
    feedingRoom: false,
    strollerFriendly: false,
    rainFriendly: true,
    stayMinutes: 90,
    operatorType: 'public',
    editorNote:
      '경기투어패스의 현재 제휴 목록과 주소로 운영 신호를 확인했다. 일반 요금·계절 운영시간은 양평군 1차 페이지 확보 후 갱신한다.',
    linkedPostSlugs: [],
    externalBlogLinks: [
      {
        title: '경기 양평 아이와 함께 가기 좋은 생태 교육 공간 양평곤충박물관',
        href: 'https://blackmari.tistory.com/entry/%EA%B2%BD%EA%B8%B0-%EC%96%91%ED%8F%89-%EC%95%84%EC%9D%B4%EC%99%80-%ED%95%A8%EA%BB%98-%EA%B0%80%EA%B8%B0-%EC%A2%8B%EC%9D%80-%EC%83%9D%ED%83%9C-%EA%B5%90%EC%9C%A1-%EA%B3%B5%EA%B0%84-%EC%96%91%ED%8F%89%EA%B3%A4%EC%B6%A9%EB%B0%95%EB%AC%BC%EA%B4%80',
        sourceLabel: 'Tistory',
        description: '전시 규모와 가족 관람 동선을 참고하는 개인 후기다.',
      },
    ],
  },
  {
    id: 'gyeonggi-south-bucheon-nature-ecology-park',
    name: '부천자연생태공원',
    region: 'gyeonggi-south',
    subRegion: '부천시',
    category: 'park',
    themes: ['animal'],
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'both',
    seasons: ['all-season'],
    priceType: 'partial-free',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://ecopark.bucheon.go.kr/site/main/index149',
    verifiedAt: '2026-07-10',
    lastObservedAt: '2026-07-10',
    verificationStatus: 'official_verified',
    naverMapUrl:
      'https://map.naver.com/p/search/부천자연생태공원%20경기도%20부천시%20원미구%20길주로%20660',
    description:
      '자연생태박물관의 작은 생물·민물고기·곤충 전시와 수목원, 유아숲을 한 동선에서 만나는 복합 생태공원이다.',
    address: '경기도 부천시 원미구 길주로 660',
    operatingHours:
      '화~일 09:30~18:00, 월요일 휴관; 시설별 입장 마감과 임시휴관 확인 필요',
    priceInfo: '공원 구역은 무료, 박물관·식물원 등 일부 시설 유료',
    feedingRoom: false,
    strollerFriendly: false,
    rainFriendly: true,
    stayMinutes: 180,
    operatorType: 'public',
    editorNote:
      '일반 관람은 현장 이용 가능하고 체험·교육은 별도 예약이다. 2026년 7월 프로그램과 연중 기획전 운영을 공식 사이트에서 확인했다.',
    linkedPostSlugs: [],
    externalBlogLinks: [
      {
        title: '부천생태공원 봄나들이 아이와 가볼만한 곳',
        href: 'https://on.sano.co.kr/%EB%B6%80%EC%B2%9C%EC%83%9D%ED%83%9C%EA%B3%B5%EC%9B%90-%EB%B4%84%EB%82%98%EB%93%A4%EC%9D%B4-%EC%95%84%EC%9D%B4%EC%99%80-%EA%B0%80%EB%B3%BC%EB%A7%8C%ED%95%9C-%EA%B3%B3',
        sourceLabel: 'sano.co.kr',
        description: '봄철 가족 나들이 동선을 참고하는 외부 후기다.',
      },
    ],
  },
  {
    id: 'gyeonggi-south-pangyo-eco-learning-center',
    name: '판교환경생태학습원',
    region: 'gyeonggi-south',
    subRegion: '성남시',
    category: 'experience',
    themes: ['animal'],
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'both',
    seasons: ['spring', 'summer', 'fall'],
    priceType: 'free',
    reservationRequired: true,
    parking: true,
    sourceType: 'official',
    sourceUrl:
      'https://gnews.gg.go.kr/news/news_detail.do?number=202607070648047512C076&s_code=C076',
    verifiedAt: '2026-07-10',
    lastObservedAt: '2026-07-10',
    verificationStatus: 'official_verified',
    naverMapUrl:
      'https://map.naver.com/p/search/판교환경생태학습원%20경기도%20성남시%20분당구%20대왕판교로645번길%2021',
    description:
      '곤충·토양 생태 전시와 가족 탐조 프로그램을 통해 도심 생물을 관찰하는 공공 환경학습 공간이다.',
    address: '경기도 성남시 분당구 대왕판교로645번길 21',
    operatingHours: '화~일 09:00~18:00; 월요일·1월 1일·명절 등 휴관',
    priceInfo: '관람 무료; 교육 프로그램별 예약 필요',
    feedingRoom: false,
    strollerFriendly: false,
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'public',
    editorNote:
      '일반 전시 관람과 달리 2026 가족 탐조 같은 동물 프로그램은 사전 예약 대상이다. 야외 탐조는 날씨 영향을 받는다.',
    linkedPostSlugs: [],
    externalBlogLinks: [
      {
        title:
          '판교 환경 생태학습원 판교 화랑공원 생태림 분당 아이와 함께 가볼만한 곳',
        href: 'https://blog.naver.com/ifnotnow_thenwhen/224276669944',
        sourceLabel: '네이버 블로그',
        description: '학습원과 화랑공원 연계 동선을 참고하는 개인 후기다.',
      },
    ],
  },
  {
    id: 'gyeonggi-south-banseoksan-eco-school',
    name: '시립 반석산 에코스쿨',
    region: 'gyeonggi-south',
    subRegion: '화성시',
    category: 'experience',
    themes: ['animal'],
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'both',
    seasons: ['spring', 'summer', 'fall'],
    priceType: 'free',
    reservationRequired: true,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://yeyak.hscity.go.kr/exprnDetail.do?exprnIdx=3314',
    verifiedAt: '2026-07-10',
    lastObservedAt: '2026-07-10',
    verificationStatus: 'official_verified',
    naverMapUrl:
      'https://map.naver.com/p/search/시립%20반석산%20에코스쿨%20경기도%20화성시%20노작로%20158',
    description:
      '화성 지역 생물 전시와 매미·곤충·숲 생태 교육을 무료로 운영하는 시립 환경 체험관이다.',
    address: '경기도 화성시 노작로 158',
    operatingHours: '화~일 10:00~18:00; 월요일·법정공휴일 휴관',
    priceInfo: '자유관람·해설 무료; 교육 프로그램 예약 필요',
    feedingRoom: false,
    strollerFriendly: true,
    rainFriendly: true,
    stayMinutes: 90,
    operatorType: 'public',
    editorNote:
      '일반 관람은 예약 제한이 없지만 2026 매미 프로그램 등 교육은 사전 신청 대상이다. 유모차 입장은 가능하나 2층 이동 시 장애인용 엘리베이터를 이용할 수 없다.',
    linkedPostSlugs: [],
    externalBlogLinks: [
      {
        title: '도심 속에서 만나는 환경 탐험 여행 | 반석산에코스쿨 후기',
        href: 'https://jungni.tistory.com/entry/%EB%8F%84%EC%8B%AC-%EC%86%8D%EC%97%90%EC%84%9C-%EB%A7%8C%EB%82%98%EB%8A%94-%ED%99%98%EA%B2%BD-%ED%83%90%ED%97%98-%EC%97%AC%ED%96%89-%EB%B0%98%EC%84%9D%EC%82%B0%EC%97%90%EC%BD%94%EC%8A%A4%EC%BF%A8',
        sourceLabel: 'Tistory',
        description: '전시 체험 동선과 아이 반응을 참고하는 개인 후기다.',
      },
    ],
  },
  {
    id: 'gyeonggi-south-jonghyeon-fishing-village',
    name: '종현어촌체험휴양마을',
    region: 'gyeonggi-south',
    subRegion: '안산시',
    category: 'experience',
    themes: ['animal'],
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'outdoor',
    seasons: ['spring', 'summer', 'fall'],
    priceType: 'paid',
    reservationRequired: true,
    parking: true,
    sourceType: 'official',
    sourceUrl:
      'https://www.badaon.or.kr/seantour_map/travel/destination/detail.do?destId=FCID111598',
    verifiedAt: '2026-07-10',
    lastObservedAt: '2026-07-10',
    verificationStatus: 'official_verified',
    naverMapUrl:
      'https://map.naver.com/p/search/종현어촌체험휴양마을%20경기도%20안산시%20단원구%20구봉길%20240',
    description:
      '대부도 갯벌에서 조개류와 해양 생물을 관찰하며 갯벌 체험을 할 수 있는 어촌체험휴양마을이다.',
    address: '경기도 안산시 단원구 구봉길 240',
    operatingHours: '물때·체험일정에 따라 변동; 공식 일정 확인 후 예약 필수',
    priceInfo: '갯벌·어촌 체험별 요금 변동; 공식 예약 채널 확인 필요',
    feedingRoom: false,
    strollerFriendly: false,
    rainFriendly: false,
    stayMinutes: 150,
    operatorType: 'non-profit',
    editorNote:
      '안산시는 2025년 체험마을 관광 기반시설 준공과 운영 지원을 공지했다. 갯벌 체험은 조수·기상에 따라 취소될 수 있다.',
    linkedPostSlugs: [],
    externalBlogLinks: [
      {
        title: '종현농어촌체험휴양마을 - 구봉도 낙조마을 안산 대부도 여행',
        href: 'https://gre2.tistory.com/entry/%EC%A2%85%ED%98%84%EB%86%8D%EC%96%B4%EC%B4%8C%EC%B2%B4%ED%97%98%ED%9C%B4%EC%96%91%EB%A7%88%EC%9D%84-%EA%B5%AC%EB%B4%89%EB%8F%84-%EB%82%99%EC%A1%B0%EB%A7%88%EC%9D%84-%EC%95%88%EC%82%B0-%EB%8C%80%EB%B6%80%EB%8F%84-%EC%97%AC%ED%96%89',
        sourceLabel: 'Tistory',
        description: '마을과 구봉도 연계 동선을 참고하는 개인 후기다.',
      },
    ],
  },
  {
    id: 'gyeonggi-north-zoozooland-goyang',
    name: '쥬쥬랜드',
    region: 'gyeonggi-north',
    subRegion: '고양시',
    category: 'experience',
    themes: ['animal'],
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'both',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://zoo.muv.kr/38',
    verifiedAt: '2026-07-10',
    lastObservedAt: '2026-07-10',
    verificationStatus: 'official_verified',
    naverMapUrl:
      'https://map.naver.com/p/search/쥬쥬랜드%20경기도%20고양시%20덕양구%20원당로458번길%207-42',
    description:
      '실내·야외 동물 관람과 먹이 체험, 고양로봇박물관을 한 번에 이용하는 가족형 동물 테마시설이다.',
    address: '경기도 고양시 덕양구 원당로458번길 7-42',
    operatingHours: '10:00~18:00; 월요일 휴무, 공휴일인 월요일은 정상 운영',
    priceInfo: '대인·소인 15,000원; 만 24개월 이하 증빙 시 무료',
    feedingRoom: false,
    strollerFriendly: true,
    rainFriendly: true,
    stayMinutes: 180,
    operatorType: 'commercial',
    editorNote:
      '유모차 반입은 가능하지만 실내동물원 앞에 보관 후 입장해야 하며 대여 서비스는 없다.',
    linkedPostSlugs: [],
    externalBlogLinks: [
      {
        title:
          '고양 쥬쥬랜드 후기｜아이와 가볼만한 곳, 겨울에도 좋은 실내·야외 동물원',
        href: 'https://blog.naver.com/tornado-616/224117701228',
        sourceLabel: '네이버 블로그',
        description: '겨울철 실내·야외 이용 동선을 참고하는 개인 후기다.',
      },
    ],
  },
  {
    id: 'gyeonggi-north-guri-insect-ecology-center',
    name: '구리시곤충생태관',
    region: 'gyeonggi-north',
    subRegion: '구리시',
    category: 'museum',
    themes: ['animal'],
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'both',
    seasons: ['all-season'],
    priceType: 'free',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://www.guri.go.kr/eco/contents.do?key=1700',
    verifiedAt: '2026-07-10',
    lastObservedAt: '2026-07-10',
    verificationStatus: 'official_verified',
    naverMapUrl:
      'https://map.naver.com/p/search/구리시곤충생태관%20경기도%20구리시%20검배로%20200',
    description:
      '연중 살아있는 나비와 곤충, 타란튤라·민물고기 등을 무료로 관람하는 구리시 직영 생태관이다.',
    address: '경기도 구리시 검배로 200',
    operatingHours:
      '3~10월 10:00~18:00(17:00 입장 마감), 11~2월 10:00~17:00(16:30 입장 마감); 월요일 등 휴관',
    priceInfo: '관람·주차 무료; 단체관람은 예약 필요',
    feedingRoom: false,
    strollerFriendly: false,
    rainFriendly: true,
    stayMinutes: 90,
    operatorType: 'public',
    editorNote:
      '개인 자율관람은 예약 불필요다. 공식 시설현황은 살아있는 나비 일평균 약 100마리와 36여 종의 살아있는 곤충을 안내한다.',
    linkedPostSlugs: [],
    externalBlogLinks: [
      {
        title: '구리 아이와 함께 가볼만한곳 구리시곤충생태관',
        href: 'https://blog.naver.com/lsh3172/224154352204',
        sourceLabel: '네이버 블로그',
        description: '아이 동반 관람 동선을 참고하는 개인 후기다.',
      },
    ],
  },
  {
    id: 'gyeonggi-north-gapyeong-sheep-ranch',
    name: '가평양떼목장',
    region: 'gyeonggi-north',
    subRegion: '가평군',
    category: 'experience',
    themes: ['animal'],
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'outdoor',
    seasons: ['spring', 'summer', 'fall'],
    priceType: 'paid',
    reservationRequired: false,
    parking: false,
    sourceType: 'semi-official',
    sourceUrl: 'https://www.ggtourpass.kr/32',
    verifiedAt: '2026-07-10',
    lastObservedAt: '2026-07-10',
    verificationStatus: 'semi_verified',
    naverMapUrl:
      'https://map.naver.com/p/search/가평양떼목장%20경기도%20가평군%20설악면%20유명로%201209',
    description:
      '양을 가까이 관찰하고 목장 산책과 카페를 함께 이용하는 가평의 야외 동물 교감형 목장이다.',
    address: '경기도 가평군 설악면 유명로 1209',
    operatingHours:
      '운영시간과 입장 마감은 공식 예매·SNS에서 방문 전 확인 필요',
    priceInfo: '입장권·음료 포함 여부와 연령별 요금은 공식 예매 채널 확인 필요',
    feedingRoom: false,
    strollerFriendly: false,
    rainFriendly: false,
    stayMinutes: 150,
    operatorType: 'commercial',
    editorNote:
      '경기투어패스 현재 제휴 목록에서 주소와 입장 혜택을 확인했다. 주차·운영시간을 1차 채널에서 확인하기 전에는 보수적으로 노출한다.',
    linkedPostSlugs: [],
    externalBlogLinks: [
      {
        title: '가평 아이랑 가볼만한곳 양떼목장 놀거리 두쫀쿠 카페',
        href: 'https://blog.naver.com/jangrose5932/224184041530',
        sourceLabel: '네이버 블로그',
        description: '목장과 카페 이용 동선을 참고하는 개인 후기다.',
      },
    ],
  },
  {
    id: 'gyeonggi-north-sandulsori-namyangju',
    name: '산들소리',
    region: 'gyeonggi-north',
    subRegion: '남양주시',
    category: 'park',
    themes: ['animal'],
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'outdoor',
    seasons: ['spring', 'summer', 'fall'],
    priceType: 'paid',
    reservationRequired: false,
    parking: false,
    sourceType: 'official',
    sourceUrl: 'https://sandulsori.co.kr/default/01/menu03.php',
    verifiedAt: '2026-07-10',
    lastObservedAt: '2026-07-10',
    verificationStatus: 'official_verified',
    naverMapUrl:
      'https://map.naver.com/p/search/산들소리%20경기도%20남양주시%20불암산로59번길%2048-31',
    description:
      '불암산 자락의 수목원 산책과 작은 동물 먹이 체험을 결합한 남양주의 가족 자연 체험공간이다.',
    address: '경기도 남양주시 불암산로59번길 48-31',
    operatingHours:
      '운영시간과 입장 마감은 공식 홈페이지에서 방문 전 확인 필요',
    priceInfo: '입장료 별도; 공식 안내상 동물 먹이용 당근은 별도 판매',
    feedingRoom: false,
    strollerFriendly: false,
    rainFriendly: false,
    stayMinutes: 150,
    operatorType: 'commercial',
    editorNote:
      '공식 체험 안내에서 어린이 동물 당근 먹이 체험을 확인했다. 경사·비포장 구간과 주차 정보는 현장 채널에서 재확인한다.',
    linkedPostSlugs: [],
    externalBlogLinks: [
      {
        title: '남양주 아이와 가기 좋은 수목원, 산들소리',
        href: 'https://juuwooo.com/13',
        sourceLabel: 'juuwooo.com',
        description: '아이 동반 수목원 동선을 참고하는 개인 후기다.',
      },
    ],
  },
  {
    id: 'gyeonggi-north-yangju-insect-museum',
    name: '양주곤충박물관',
    region: 'gyeonggi-north',
    subRegion: '양주시',
    category: 'museum',
    themes: ['animal'],
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: false,
    sourceType: 'semi-official',
    sourceUrl: 'https://pf.kakao.com/_exbxlHG',
    verifiedAt: '2026-07-10',
    lastObservedAt: '2026-07-10',
    verificationStatus: 'semi_verified',
    naverMapUrl:
      'https://map.naver.com/p/search/양주곤충박물관%20경기도%20양주시%20장흥면%20권율로%20124%20A동%202층',
    description:
      '살아있는 곤충과 소동물, 표본·공룡 전시를 실내에서 관람하는 장흥관광지 인근 사립 곤충 박물관이다.',
    address: '경기도 양주시 장흥면 권율로 124 A동 2층',
    operatingHours:
      '운영시간과 곤충·동물 해설 회차는 공식 채널에서 방문 전 확인 필요',
    priceInfo: '연령별 입장료와 체험 추가요금은 공식 예매 채널 확인 필요',
    feedingRoom: false,
    strollerFriendly: false,
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
    editorNote:
      '공식 카카오 채널의 2026년 게시·후기 노출로 운영을 확인했다. 주차와 상세 운영시간은 1차 예약 페이지를 추가 확인한다.',
    linkedPostSlugs: [],
    externalBlogLinks: [
      {
        title: '아이와 함께한 실내 나들이 – 양주곤충박물관 후기',
        href: 'https://endorphink.tistory.com/entry/%F0%9F%90%9B-%EC%95%84%EC%9D%B4%EC%99%80-%ED%95%A8%EA%BB%98%ED%95%9C-%EC%8B%A4%EB%82%B4-%EB%82%98%EB%93%A4%EC%9D%B4-%E2%80%93-%EC%96%91%EC%A3%BC%EA%B3%A4%EC%B6%A9%EB%B0%95%EB%AC%BC%EA%B4%80-%ED%9B%84%EA%B8%B0',
        sourceLabel: 'Tistory',
        description: '실내 전시 관람 동선을 참고하는 개인 후기다.',
      },
    ],
  },
];
```

## 운영 근거와 최신 블로그 메타

| 장소                 | 운영 근거                                                                                                                                                                      | 보조 근거                                                                                                                                                                                   | 연결할 최신 방문기 후보                                                                                                                                                                                                                                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 서울대공원 동물원    | [공식 관람안내](https://grandpark.seoul.go.kr/conts/contsView/ko/S001001002005.do)에 2026년 7월 동물사 제한 현황, 계절별 시간, 동물 목록이 노출됨                              | [공식 이용요금·시간](https://grandpark.seoul.go.kr/conts/contsView/ko/S001001001001.do), [공식 편의시설](https://grandpark.seoul.go.kr/conts/contsView.do?lang=ko&menu_id=S001001001005002) | `2026-03-31`, Tistory, [서울대공원 동물원 오픈런 후기! 레서판다 보고 유모차 대여까지](https://growthmemo.tistory.com/577)                                                                                                                                                                                                                                                           |
| 안성팜랜드           | [공식 홈페이지](https://nhasfarmland.com/asfarm.php)에 2026년 6~7월 공지와 운영시간, 동물·승마 프로그램이 노출됨                                                               | 별도 없음                                                                                                                                                                                   | `2026-06-16`, Tistory, [안성팜랜드 아이와 함께 승마부터 승마카트 여행 추천 후기 내돈내산](https://aerok9.tistory.com/718)                                                                                                                                                                                                                                                           |
| 벅스리움             | [공식 홈페이지](https://bugsrium.siheung.go.kr/)에 자유관람, 오전·오후 운영 구간, 요금과 휴관일이 노출됨                                                                       | 기존 `gyeonggi-south-outing-facilities.md` API 스냅샷은 주소·주차 교차확인에만 사용                                                                                                         | `2026-04-11`, Tistory, [주말에 아이랑 갈 곳? 시흥 실내 놀거리 끝판왕? 벅스리움 직접 가봄](https://fence1004.tistory.com/entry/%EC%A3%BC%EB%A7%90%EC%97%90-%EC%95%84%EC%9D%B4%EB%9E%91-%EA%B0%88-%EA%B3%B3-%EC%8B%9C%ED%9D%A5-%EC%8B%A4%EB%82%B4-%EB%86%80%EA%B1%B0%EB%A6%AC-%EB%81%9D%ED%8C%90%EC%99%95-%EB%B2%85%EC%8A%A4%EB%A6%AC%EC%9B%80-%EC%A7%81%EC%A0%91-%EA%B0%80%EB%B4%84) |
| 오산버드파크         | [공식 카카오 채널](https://pf.kakao.com/_vRjUG)에 주소와 2026년 게시·방문후기 링크가 노출됨                                                                                    | 상세 운영값은 예매 채널 재검증 필요                                                                                                                                                         | `2026-02-06`, Tistory, [동물들과의 가까운 하루｜오산버드파크 후기](https://jungni.tistory.com/entry/%EB%8F%99%EB%AC%BC%EB%93%A4%EA%B3%BC%EC%9D%98-%EA%B0%80%EA%B9%8C%EC%9A%B4-%ED%95%98%EB%A3%A8-%EF%BD%9C%EC%98%A4%EC%82%B0%EB%B2%84%EB%93%9C%ED%8C%8C%ED%81%AC)                                                                                                                   |
| 양평곤충박물관       | [경기투어패스](https://www.ggtourpass.kr/32)의 현재 제휴 시설 목록에서 주소와 입장 혜택 확인                                                                                   | 양평군 2026 예산의 박물관 입장 수입 편성으로 운영 교차확인; 일반 요금은 추가 확인 필요                                                                                                      | `2026-02-26`, Tistory, [경기 양평 아이와 함께 가기 좋은 생태 교육 공간 양평곤충박물관](https://blackmari.tistory.com/entry/%EA%B2%BD%EA%B8%B0-%EC%96%91%ED%8F%89-%EC%95%84%EC%9D%B4%EC%99%80-%ED%95%A8%EA%BB%98-%EA%B0%80%EA%B8%B0-%EC%A2%8B%EC%9D%80-%EC%83%9D%ED%83%9C-%EA%B5%90%EC%9C%A1-%EA%B3%B5%EA%B0%84-%EC%96%91%ED%8F%89%EA%B3%A4%EC%B6%A9%EB%B0%95%EB%AC%BC%EA%B4%80)     |
| 부천자연생태공원     | [공식 홈페이지](https://ecopark.bucheon.go.kr/site/main/index149)에 2026년 6~7월 체험·전시 공지와 살아있는 작은 생물·민물고기·곤충 전시가 노출됨                               | 공식 관람료·주차·예약 메뉴 존재                                                                                                                                                             | `2026-05-21`, sano.co.kr, [부천생태공원 봄나들이 아이와 가볼만한 곳](https://on.sano.co.kr/%EB%B6%80%EC%B2%9C%EC%83%9D%ED%83%9C%EA%B3%B5%EC%9B%90-%EB%B4%84%EB%82%98%EB%93%A4%EC%9D%B4-%EC%95%84%EC%9D%B4%EC%99%80-%EA%B0%80%EB%B3%BC%EB%A7%8C%ED%95%9C-%EA%B3%B3)                                                                                                                  |
| 판교환경생태학습원   | [경기도 공식 뉴스](https://gnews.gg.go.kr/news/news_detail.do?number=202607070648047512C076&s_code=C076)에 2026년 가족 탐조, 곤충·토양 전시, 주소·시간·무료 이용 안내가 노출됨 | 프로그램은 학습원 예약 페이지로 연결                                                                                                                                                        | `2026-05-07`, 네이버 블로그, [판교 환경 생태학습원 판교 화랑공원 생태림 분당 아이와 함께 가볼만한 곳](https://blog.naver.com/ifnotnow_thenwhen/224276669944)                                                                                                                                                                                                                        |
| 시립 반석산 에코스쿨 | [화성시 통합예약](https://yeyak.hscity.go.kr/exprnDetail.do?exprnIdx=3314)에 2026년 매미 프로그램, 무료 관람, 시간, 주차, 유모차 안내가 노출됨                                 | 화성시환경재단 2025 업무자료로 주소·전시 운영 교차확인                                                                                                                                      | `2026-01-30`, Tistory, [도심 속에서 만나는 환경 탐험 여행｜반석산에코스쿨 후기](https://jungni.tistory.com/entry/%EB%8F%84%EC%8B%AC-%EC%86%8D%EC%97%90%EC%84%9C-%EB%A7%8C%EB%82%98%EB%8A%94-%ED%99%98%EA%B2%BD-%ED%83%90%ED%97%98-%EC%97%AC%ED%96%89-%EB%B0%98%EC%84%9D%EC%82%B0%EC%97%90%EC%BD%94%EC%8A%A4%EC%BF%A8)                                                               |
| 종현어촌체험휴양마을 | [바다온 어촌관광 플랫폼](https://www.badaon.or.kr/seantour_map/travel/destination/detail.do?destId=FCID111598)에 어촌·갯벌 체험 시설로 등재                                    | [안산시 2025 운영 기반시설 보도](https://ansan.go.kr/www/common/bbs/selectBbsDetail.do?bbs_code=B0238&bbs_seq=1628489)                                                                      | `2025-05-01`, Tistory, [종현농어촌체험휴양마을 - 구봉도 낙조마을 안산 대부도 여행](https://gre2.tistory.com/entry/%EC%A2%85%ED%98%84%EB%86%8D%EC%96%B4%EC%B4%8C%EC%B2%B4%ED%97%98%ED%9C%B4%EC%96%91%EB%A7%88%EC%9D%84-%EA%B5%AC%EB%B4%89%EB%8F%84-%EB%82%99%EC%A1%B0%EB%A7%88%EC%9D%84-%EC%95%88%EC%82%B0-%EB%8C%80%EB%B6%80%EB%8F%84-%EC%97%AC%ED%96%89)                           |
| 쥬쥬랜드             | [공식 이용안내](https://zoo.muv.kr/38)에 시간, 휴무, 주소, 요금, 유모차 규칙이 노출됨                                                                                          | 공식 사이트에 먹이 체험·사계절 메뉴가 운영됨                                                                                                                                                | `2026-02-23`, 네이버 블로그, [고양 쥬쥬랜드 후기｜아이와 가볼만한 곳, 겨울에도 좋은 실내·야외 동물원](https://blog.naver.com/tornado-616/224117701228)                                                                                                                                                                                                                              |
| 구리시곤충생태관     | [구리시 공식 관람안내](https://www.guri.go.kr/eco/contents.do?key=1700)에 계절별 시간, 무료 관람·주차, 예약 규칙이 노출됨                                                      | [공식 시설현황](https://www.guri.go.kr/eco/contents.do?key=1723)은 2026-05-26 수정, 살아있는 곤충·특별 동물과 시 직영을 명시                                                                | `2026-02-25`, 네이버 블로그, [구리 아이와 함께 가볼만한곳 구리시곤충생태관](https://blog.naver.com/lsh3172/224154352204)                                                                                                                                                                                                                                                            |
| 가평양떼목장         | [경기투어패스](https://www.ggtourpass.kr/32)의 현재 제휴 시설 목록에서 주소와 입장 혜택 확인                                                                                   | 세부 시간·주차는 1차 채널 추가 확인 필요                                                                                                                                                    | `2026-03-06`, 네이버 블로그, [가평 아이랑 가볼만한곳 양떼목장 놀거리 두쫀쿠 카페](https://blog.naver.com/jangrose5932/224184041530)                                                                                                                                                                                                                                                 |
| 산들소리             | [공식 체험 안내](https://sandulsori.co.kr/default/01/menu03.php)에 어린이 동물 당근 먹이 체험이 노출됨                                                                         | [공식 이용안내](https://www.sandulsori.co.kr/default/01/menu02.php)에서 주소와 자연 체험 운영 확인                                                                                          | `2026-05-10`, juuwooo.com, [남양주 아이와 가기 좋은 수목원, 산들소리](https://juuwooo.com/13)                                                                                                                                                                                                                                                                                       |
| 양주곤충박물관       | [공식 카카오 채널](https://pf.kakao.com/_exbxlHG)에 살아있는 곤충·소동물·공룡 전시, 주소, 2026년 게시·후기 링크가 노출됨                                                       | 상세 시간·주차는 예매 채널 추가 확인 필요                                                                                                                                                   | `2025-04-15`, Tistory, [아이와 함께한 실내 나들이 – 양주곤충박물관 후기](https://endorphink.tistory.com/entry/%F0%9F%90%9B-%EC%95%84%EC%9D%B4%EC%99%80-%ED%95%A8%EA%BB%98%ED%95%9C-%EC%8B%A4%EB%82%B4-%EB%82%98%EB%93%A4%EC%9D%B4-%E2%80%93-%EC%96%91%EC%A3%BC%EA%B3%A4%EC%B6%A9%EB%B0%95%EB%AC%BC%EA%B4%80-%ED%9B%84%EA%B8%B0)                                                     |

## 반영 전 재확인 우선순위

1. `양평곤충박물관`, `가평양떼목장`은 경기투어패스로 현재 운영 신호를 확인했지만 시설 자체의 최신 요금·시간 페이지를 한 번 더 확보한다.
2. `오산버드파크`, `양주곤충박물관`은 공식 카카오 채널 외에 직접 예매 페이지에서 휴무·요금·주차를 확인한다.
3. `산들소리`는 공식 사이트에 동물 먹이 체험이 있으나 경사·유모차·주차 편의 정보는 별도 확인한다.
4. 외부 블로그 14건은 모두 운영 데이터와 분리하고, 카드 노출 전 삭제·비공개 여부 및 실제 방문 후기 성격을 마지막으로 확인한다.

## 보류·제외 후보

| 후보                              | 처리      | 이유                                                                                                 |
| --------------------------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| 은산어울림 생태박물관             | 보류      | 2026년 민간 지도 운영 신호는 있으나 공식 운영 페이지와 안정적인 직접 방문기 URL을 함께 확보하지 못함 |
| 양평양떼목장                      | 보류      | 경기투어패스 목록에는 있으나 가평양떼목장과 이름 혼동 위험이 있고 자체 공식 시간·요금 검증이 부족함  |
| 서울대공원 어린이동물원           | 신규 제외 | 서울대공원 동물원 내부 시설이므로 별도 장소로 만들면 중복 카드가 됨                                  |
| 렛츠런파크 서울 말박물관·포니체험 | 보류      | 말박물관과 시즌형 포니 프로그램의 운영 범위·예약 규칙을 하나의 장소 카드로 합치기 어려움             |
| 아침고요가족동물원                | 보류      | 현시점 공식 운영 근거를 안정적으로 확보하지 못해 폐업 여부를 추정하지 않고 보류함                    |

간단한 결론: 경기권에서는 남부 9곳·북부 5곳, 총 14곳을 발행 가능 상태로 선별했다. 공식 검증 10곳, 준공식 검증 4곳이며, 모두 `animal` 테마 필터 후보와 최근 외부 방문기 링크를 갖춘다.

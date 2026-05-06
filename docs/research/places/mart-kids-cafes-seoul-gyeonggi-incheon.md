# 수도권 대형마트 입점 키즈카페 리서치

- 기준일: 2026-05-06
- 범위: 서울, 경기북부, 경기남부, 인천 / 이마트, 롯데마트, 홈플러스, 트레이더스 입점 키즈카페
- 목적: `/places`에 등록 가능한 대형마트 입점형 키즈카페와 어린이 실내 놀이공간을 수집한다.
- PlaceSource 기준: types/place-source.ts

## 수집 원칙

- 공식/준공식 출처로 운영 여부를 확인한 장소만 places 반영 후보로 둔다.
- 대형마트 공식 점포 페이지, 브랜드 공식 지점 페이지, 플레이타임 직영점 매장 안내처럼 운영 주체와 가까운 출처를 우선한다.
- 블로그/지도/목록형 글은 후보 발굴용으로만 사용한다.
- 요금, 운영시간, 휴무, 주차 지원은 변동 가능성이 높으므로 상세 확정 표현을 피한다.
- 단순 장난감 매장, 게임기 매장, 수영장 단독 시설처럼 키즈카페성이 약한 곳은 보류 또는 제외한다.

## PlaceSource 반영 후보

### seoul-superwings-lotte-mart-junggye

```ts
{
  id: 'seoul-superwings-lotte-mart-junggye',
  name: '슈퍼윙스 키즈카페 롯데마트 중계점',
  region: 'seoul',
  subRegion: '노원구',
  category: 'kids-cafe',
  ageBands: ['1-3y', '3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'official',
  sourceUrl: 'https://www.superwingskidscafe.com/mall/m_mall_detail.php?ps_goid=29',
  verifiedAt: '2026-05-06',
  lastObservedAt: '2026-05-06',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('슈퍼윙스 키즈카페 롯데마트 중계점 서울특별시 노원구 노원로 330 롯데마트 중계점 지하1층')}`,
  description: '롯데마트 중계점 지하에 입점한 캐릭터 테마형 실내 키즈카페. 마트 장보기 동선과 비 오는 날 실내 놀이를 함께 묶기 좋다.',
  address: '서울특별시 노원구 노원로 330 롯데마트 중계점 지하1층',
  operatingHours: '운영시간 확인 필요',
  priceInfo: '유료 / 공식 지점 안내 기준 변동',
  rainFriendly: true,
  stayMinutes: 120,
  operatorType: 'commercial',
  editorNote: '슈퍼윙스 공식 지점 페이지에서 롯데마트 중계점 지점 운영 신호를 확인했다.',
  linkedPostSlugs: [],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 출처: 슈퍼윙스 키즈카페 공식 지점 페이지
- 준공식/보조 출처: 네이버 지도 검색
- 발견 경로: 롯데마트 키즈카페 검색
- places 반영 파일: `content/places/seoul/index.ts`

### seoul-superwings-lotte-mart-jamsil

```ts
{
  id: 'seoul-superwings-lotte-mart-jamsil',
  name: '슈퍼윙스 키즈카페 롯데잠실점',
  region: 'seoul',
  subRegion: '송파구',
  category: 'kids-cafe',
  ageBands: ['1-3y', '3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'official',
  sourceUrl: 'https://www.superwingskidscafe.com/mall/m_mall_detail.php?ps_goid=31',
  verifiedAt: '2026-05-06',
  lastObservedAt: '2026-05-06',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('슈퍼윙스 키즈카페 롯데잠실점 서울특별시 송파구 올림픽로 240 롯데마트 5층')}`,
  description: '롯데마트 잠실권 동선에 있는 캐릭터 테마형 실내 키즈카페. 미취학 아이와 쇼핑몰·마트 방문을 함께 구성하기 좋다.',
  address: '서울특별시 송파구 올림픽로 240 롯데마트 5층',
  operatingHours: '운영시간 확인 필요',
  priceInfo: '유료 / 공식 지점 안내 기준 변동',
  rainFriendly: true,
  stayMinutes: 120,
  operatorType: 'commercial',
  editorNote: '슈퍼윙스 공식 지점 페이지에서 롯데잠실점 운영 신호를 확인했다. 동일 주소권에 기존 키자니아 서울 seed가 있어 목적별 중복을 구분한다.',
  linkedPostSlugs: [],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 출처: 슈퍼윙스 키즈카페 공식 지점 페이지
- 준공식/보조 출처: 네이버 지도 검색
- 발견 경로: 롯데마트 키즈카페 검색
- places 반영 파일: `content/places/seoul/index.ts`

### seoul-champion-black-belt-emart-mokdong

```ts
{
  id: 'seoul-champion-black-belt-emart-mokdong',
  name: '챔피언더블랙벨트 이마트 목동점',
  region: 'seoul',
  subRegion: '양천구',
  category: 'kids-cafe',
  ageBands: ['3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'semi-official',
  sourceUrl: 'https://www.fntoday.co.kr/news/articleView.html?idxno=368876',
  verifiedAt: '2026-05-06',
  lastObservedAt: '2026-05-06',
  verificationStatus: 'semi_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('챔피언더블랙벨트 이마트 목동점 서울특별시 양천구 오목로 299 이마트 목동점 지하1층')}`,
  description: '이마트 목동점 지하에 입점한 플레이타임 계열 스포츠형 키즈카페. 클라이밍·어드벤처 중심의 활동형 실내 놀이 후보로 둔다.',
  address: '서울특별시 양천구 오목로 299 이마트 목동점 지하1층',
  operatingHours: '운영시간 확인 필요',
  priceInfo: '유료 / 지점 안내 기준 변동',
  rainFriendly: true,
  stayMinutes: 120,
  operatorType: 'commercial',
  editorNote: '오픈 보도자료와 전국 플레이타임 직영점 매장 위치 안내 PDF에서 지점명을 교차 확인했다. 마트 주차 지원은 방문 전 재확인 필요.',
  linkedPostSlugs: [],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 출처:
- 준공식/보조 출처: 플레이타임중앙 보도자료 기반 기사, 전국 플레이타임 직영점 매장 위치 안내 PDF
- 발견 경로: 이마트 키즈카페 검색
- places 반영 파일: `content/places/seoul/index.ts`

### seoul-champion-black-belt-homeplus-sangbong

```ts
{
  id: 'seoul-champion-black-belt-homeplus-sangbong',
  name: '챔피언더블랙벨트 홈플러스 상봉점',
  region: 'seoul',
  subRegion: '중랑구',
  category: 'kids-cafe',
  ageBands: ['3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'semi-official',
  sourceUrl: 'https://westart.or.kr/wp-content/uploads/2026/04/%EC%A0%84%EA%B5%AD%ED%94%8C%EB%A0%88%EC%9D%B4%ED%83%80%EC%9E%84%EC%A7%81%EC%98%81%EC%A0%90%EB%A7%A4%EC%9E%A5%EC%9C%84%EC%B9%98%EC%95%88%EB%82%B4.pdf',
  verifiedAt: '2026-05-06',
  lastObservedAt: '2026-05-06',
  verificationStatus: 'semi_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('챔피언더블랙벨트 홈플러스 상봉점 서울특별시 중랑구 망우로 353 홈플러스 상봉점 지하2층')}`,
  description: '홈플러스 상봉점 지하에 입점한 플레이타임 계열 스포츠형 키즈카페. 중랑구 생활권에서 마트 방문과 함께 들르기 좋은 실내 놀이 후보다.',
  address: '서울특별시 중랑구 망우로 353 홈플러스 상봉점 지하2층',
  operatingHours: '운영시간 확인 필요',
  priceInfo: '유료 / 지점 안내 기준 변동',
  rainFriendly: true,
  stayMinutes: 120,
  operatorType: 'commercial',
  editorNote: '전국 플레이타임 직영점 매장 위치 안내 PDF에서 지점명을 확인했다. 홈플러스 개별 임대매장 안내와 요금은 방문 전 재확인 필요.',
  linkedPostSlugs: [],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 출처:
- 준공식/보조 출처: 전국 플레이타임 직영점 매장 위치 안내 PDF
- 발견 경로: 홈플러스 키즈카페 검색
- places 반영 파일: `content/places/seoul/index.ts`

### seoul-nori-digital-kids-homeplus-junggye

```ts
{
  id: 'seoul-nori-digital-kids-homeplus-junggye',
  name: '노리디지털키즈카페 홈플러스 중계점',
  region: 'seoul',
  subRegion: '노원구',
  category: 'kids-cafe',
  ageBands: ['1-3y', '3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'semi-official',
  sourceUrl: 'https://my.homeplus.co.kr/store/store_detail?storId=616',
  verifiedAt: '2026-05-06',
  lastObservedAt: '2026-05-06',
  verificationStatus: 'semi_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('노리디지털키즈카페 홈플러스 중계점 서울특별시 노원구 동일로204가길 12 홈플러스 서울중계점 1층')}`,
  description: '홈플러스 서울중계점 1층 임대매장으로 확인되는 실내 키즈카페. 마트 방문 중 짧게 들르는 생활권 놀이 후보로 둔다.',
  address: '서울특별시 노원구 동일로204가길 12 홈플러스 서울중계점 1층',
  operatingHours: '운영시간 확인 필요',
  priceInfo: '요금 확인 필요',
  rainFriendly: true,
  stayMinutes: 90,
  operatorType: 'commercial',
  editorNote: '홈플러스 공식 점포 페이지에서 임대매장명을 확인했다. 별도 브랜드 공식 상세는 약해 이용 전 전화 확인이 필요하다.',
  linkedPostSlugs: [],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 출처:
- 준공식/보조 출처: 홈플러스 공식 점포 페이지
- 발견 경로: 홈플러스 키즈카페 검색
- places 반영 파일: `content/places/seoul/index.ts`

### gyeonggi-north-champion-black-belt-homeplus-uijeongbu

```ts
{
  id: 'gyeonggi-north-champion-black-belt-homeplus-uijeongbu',
  name: '챔피언더블랙벨트 홈플러스 의정부점',
  region: 'gyeonggi-north',
  subRegion: '의정부시',
  category: 'kids-cafe',
  ageBands: ['3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'semi-official',
  sourceUrl: 'https://westart.or.kr/wp-content/uploads/2026/04/%EC%A0%84%EA%B5%AD%ED%94%8C%EB%A0%88%EC%9D%B4%ED%83%80%EC%9E%84%EC%A7%81%EC%98%81%EC%A0%90%EB%A7%A4%EC%9E%A5%EC%9C%84%EC%B9%98%EC%95%88%EB%82%B4.pdf',
  verifiedAt: '2026-05-06',
  lastObservedAt: '2026-05-06',
  verificationStatus: 'semi_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('챔피언더블랙벨트 홈플러스 의정부점 경기도 의정부시 청사로 38 홈플러스 의정부점 4층')}`,
  description: '홈플러스 의정부점 4층에 입점한 플레이타임 계열 스포츠형 키즈카페. 경기북부 마트 연계 실내 놀이 후보로 관리한다.',
  address: '경기도 의정부시 청사로 38 홈플러스 의정부점 4층',
  operatingHours: '운영시간 확인 필요',
  priceInfo: '유료 / 지점 안내 기준 변동',
  rainFriendly: true,
  stayMinutes: 120,
  operatorType: 'commercial',
  editorNote: '전국 플레이타임 직영점 매장 위치 안내 PDF에서 지점명을 확인했다. 홈플러스 개별 임대매장 안내와 요금은 방문 전 재확인 필요.',
  linkedPostSlugs: [],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 출처:
- 준공식/보조 출처: 전국 플레이타임 직영점 매장 위치 안내 PDF
- 발견 경로: 홈플러스 키즈카페 검색
- places 반영 파일: `content/places/gyeonggi-north/index.ts`

### gyeonggi-north-champion-black-belt-traders-gimpo

```ts
{
  id: 'gyeonggi-north-champion-black-belt-traders-gimpo',
  name: '챔피언더블랙벨트 트레이더스 김포점',
  region: 'gyeonggi-north',
  subRegion: '김포시',
  category: 'kids-cafe',
  ageBands: ['3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'semi-official',
  sourceUrl: 'https://westart.or.kr/wp-content/uploads/2026/04/%EC%A0%84%EA%B5%AD%ED%94%8C%EB%A0%88%EC%9D%B4%ED%83%80%EC%9E%84%EC%A7%81%EC%98%81%EC%A0%90%EB%A7%A4%EC%9E%A5%EC%9C%84%EC%B9%98%EC%95%88%EB%82%B4.pdf',
  verifiedAt: '2026-05-06',
  lastObservedAt: '2026-05-06',
  verificationStatus: 'semi_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('챔피언더블랙벨트 트레이더스 김포점 경기도 김포시 김포대로 715 트레이더스 김포점 1층')}`,
  description: '트레이더스 김포점 1층에 입점한 플레이타임 계열 스포츠형 키즈카페. 김포권 마트 연계 실내 놀이 후보로 둔다.',
  address: '경기도 김포시 김포대로 715 트레이더스 김포점 1층',
  operatingHours: '운영시간 확인 필요',
  priceInfo: '유료 / 지점 안내 기준 변동',
  rainFriendly: true,
  stayMinutes: 120,
  operatorType: 'commercial',
  editorNote: '김포는 기존 README 예시에 명시되지 않았지만 경기 서북권 생활권으로 경기북부에 배치했다. 권역 정책이 바뀌면 이동 가능하다.',
  linkedPostSlugs: [],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 출처:
- 준공식/보조 출처: 전국 플레이타임 직영점 매장 위치 안내 PDF
- 발견 경로: 트레이더스 키즈카페 검색
- places 반영 파일: `content/places/gyeonggi-north/index.ts`

### gyeonggi-south-superwings-lotte-mart-suwon-yeongtong

```ts
{
  id: 'gyeonggi-south-superwings-lotte-mart-suwon-yeongtong',
  name: '슈퍼윙스 키즈카페 롯데마트 수원영통점',
  region: 'gyeonggi-south',
  subRegion: '수원시 영통구',
  category: 'kids-cafe',
  ageBands: ['1-3y', '3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'official',
  sourceUrl: 'https://www.superwingskidscafe.com/mall/m_mall_detail.php?ps_goid=35',
  verifiedAt: '2026-05-06',
  lastObservedAt: '2026-05-06',
  verificationStatus: 'official_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('슈퍼윙스 키즈카페 롯데마트 수원영통점 경기도 수원시 영통구 봉영로 1579 롯데마트 3층')}`,
  description: '롯데마트 수원영통점 3층에 입점한 캐릭터 테마형 실내 키즈카페. 경기남부 마트 연계 실내 놀이 후보로 안정적이다.',
  address: '경기도 수원시 영통구 봉영로 1579 롯데마트 3층',
  operatingHours: '운영시간 확인 필요',
  priceInfo: '유료 / 공식 지점 안내 기준 변동',
  rainFriendly: true,
  stayMinutes: 120,
  operatorType: 'commercial',
  editorNote: '슈퍼윙스 공식 지점 페이지에서 롯데마트 수원영통점 운영 신호를 확인했다.',
  linkedPostSlugs: [],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 출처: 슈퍼윙스 키즈카페 공식 지점 페이지
- 준공식/보조 출처: 네이버 지도 검색
- 발견 경로: 롯데마트 키즈카페 검색
- places 반영 파일: `content/places/gyeonggi-south/index.ts`

### gyeonggi-south-champion-homeplus-osan

```ts
{
  id: 'gyeonggi-south-champion-homeplus-osan',
  name: '챔피언 홈플러스 오산점',
  region: 'gyeonggi-south',
  subRegion: '오산시',
  category: 'kids-cafe',
  ageBands: ['3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'semi-official',
  sourceUrl: 'https://my.homeplus.co.kr/store/store_detail?storId=1632',
  verifiedAt: '2026-05-06',
  lastObservedAt: '2026-05-06',
  verificationStatus: 'semi_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('챔피언 홈플러스 오산점 경기도 오산시 수청로 188 홈플러스 오산점 2층')}`,
  description: '홈플러스 오산점 2층 임대매장으로 확인되는 챔피언 키즈카페. 오산권 마트 연계 실내 놀이 후보로 관리한다.',
  address: '경기도 오산시 수청로 188 홈플러스 오산점 2층',
  operatingHours: '운영시간 확인 필요',
  priceInfo: '요금 확인 필요',
  rainFriendly: true,
  stayMinutes: 120,
  operatorType: 'commercial',
  editorNote: '홈플러스 공식 점포 페이지에서 임대매장명을 확인했다. 챔피언 세부 브랜드명과 요금은 방문 전 재확인 필요.',
  linkedPostSlugs: [],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 출처:
- 준공식/보조 출처: 홈플러스 공식 점포 페이지
- 발견 경로: 홈플러스 키즈카페 검색
- places 반영 파일: `content/places/gyeonggi-south/index.ts`

### gyeonggi-south-little-chief-homeplus-sihwa

```ts
{
  id: 'gyeonggi-south-little-chief-homeplus-sihwa',
  name: '리틀치프 홈플러스 시화점',
  region: 'gyeonggi-south',
  subRegion: '시흥시',
  category: 'kids-cafe',
  ageBands: ['1-3y', '3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'semi-official',
  sourceUrl: 'https://my.homeplus.co.kr/store/store_detail?storId=656',
  verifiedAt: '2026-05-06',
  lastObservedAt: '2026-05-06',
  verificationStatus: 'semi_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('경기도 시흥시 희망공원로 269 홈플러스 시화점 2층')}`,
  description: '홈플러스 시화점 2층에 입점한 실내 키즈카페. 시흥 정왕동 생활권에서 마트 방문과 함께 묶기 좋은 실내 놀이 후보로 둔다.',
  address: '경기도 시흥시 희망공원로 269 홈플러스 시화점 2층',
  operatingHours: '운영시간 확인 필요',
  priceInfo: '요금 확인 필요',
  rainFriendly: true,
  stayMinutes: 120,
  operatorType: 'commercial',
  editorNote: '홈플러스 공식 시화점 층별 안내에서 2F 리틀치프_키즈카페를 확인했다. 세부 요금, 회차, 휴무는 방문 전 재확인 필요.',
  linkedPostSlugs: [],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 출처:
- 준공식/보조 출처: 홈플러스 공식 시화점 층별 안내, 방문 후기
- 발견 경로: 사용자 제보 후 `리틀치프 홈플러스 시화점` 검색
- places 반영 파일: `content/places/gyeonggi-south/index.ts`

### incheon-champion-black-belt-homeplus-songdo

```ts
{
  id: 'incheon-champion-black-belt-homeplus-songdo',
  name: '챔피언더블랙벨트 홈플러스 인천송도점',
  region: 'incheon',
  subRegion: '연수구',
  category: 'kids-cafe',
  ageBands: ['3-6y', '6-10y'],
  indoorOutdoor: 'indoor',
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'semi-official',
  sourceUrl: 'https://my.homeplus.co.kr/store/store_detail?storId=1196',
  verifiedAt: '2026-05-06',
  lastObservedAt: '2026-05-06',
  verificationStatus: 'semi_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('챔피언더블랙벨트 홈플러스 인천송도점 인천광역시 연수구 송도국제대로 165 홈플러스 인천송도점 1층')}`,
  description: '홈플러스 인천송도점 1층에 입점한 플레이타임 계열 스포츠형 키즈카페. 송도권 마트 연계 실내 놀이 후보로 적합하다.',
  address: '인천광역시 연수구 송도국제대로 165 홈플러스 인천송도점 1층',
  operatingHours: '운영시간 확인 필요',
  priceInfo: '유료 / 지점 안내 기준 변동',
  rainFriendly: true,
  stayMinutes: 120,
  operatorType: 'commercial',
  editorNote: '홈플러스 공식 점포 페이지와 전국 플레이타임 직영점 매장 위치 안내 PDF에서 지점 신호를 확인했다.',
  linkedPostSlugs: [],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 출처:
- 준공식/보조 출처: 홈플러스 공식 점포 페이지, 전국 플레이타임 직영점 매장 위치 안내 PDF
- 발견 경로: 홈플러스 키즈카페 검색
- places 반영 파일: `content/places/incheon/index.ts`

### incheon-baby-angels-homeplus-songdo

```ts
{
  id: 'incheon-baby-angels-homeplus-songdo',
  name: '베이비엔젤스 홈플러스 인천송도점',
  region: 'incheon',
  subRegion: '연수구',
  category: 'baby-kids-cafe',
  ageBands: ['0-12m', '1-3y', '3-6y'],
  indoorOutdoor: 'indoor',
  priceType: 'paid',
  reservationRequired: false,
  parking: true,

  sourceType: 'semi-official',
  sourceUrl: 'https://my.homeplus.co.kr/store/store_detail?storId=1196',
  verifiedAt: '2026-05-06',
  lastObservedAt: '2026-05-06',
  verificationStatus: 'semi_verified',

  naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('베이비엔젤스 홈플러스 인천송도점 인천광역시 연수구 송도국제대로 165 홈플러스 인천송도점 1층')}`,
  description: '홈플러스 인천송도점 임대매장으로 확인되는 영유아 친화 실내 놀이·물놀이형 공간. 송도권 영아 동반 후보로 별도 관리한다.',
  address: '인천광역시 연수구 송도국제대로 165 홈플러스 인천송도점 1층',
  operatingHours: '운영시간 확인 필요',
  priceInfo: '요금 확인 필요',
  rainFriendly: true,
  stayMinutes: 90,
  operatorType: 'commercial',
  editorNote: '홈플러스 공식 점포 페이지에서 임대매장명을 확인했다. 수영·놀이 세부 운영 방식은 방문 전 재확인 필요.',
  linkedPostSlugs: [],
  thumbnailImage: '',
}
```

#### 출처 메모

- 공식 출처:
- 준공식/보조 출처: 홈플러스 공식 점포 페이지
- 발견 경로: 홈플러스 송도점 키즈 관련 임대매장 검색
- places 반영 파일: `content/places/incheon/index.ts`

### seoul-monster-park-sindorim

기존 seed 보강 대상.

```ts
{
  id: 'seoul-monster-park-sindorim',
  name: '몬스터파크 신도림점',
  region: 'seoul',
  subRegion: '구로구',
  category: 'kids-cafe',
  sourceType: 'semi-official',
  sourceUrl: 'https://my.homeplus.co.kr/store/store_detail?storId=813',
  verifiedAt: '2026-05-06',
  verificationStatus: 'semi_verified',
}
```

#### 출처 메모

- 공식 출처:
- 준공식/보조 출처: 홈플러스 공식 점포 페이지, 몬스터파크 브랜드 지점 안내
- 발견 경로: 기존 `content/places/seoul/index.ts` seed
- places 반영 파일: `content/places/seoul/index.ts`

### incheon-monster-park-guwol

기존 seed 보강 대상.

```ts
{
  id: 'incheon-monster-park-guwol',
  name: '몬스터파크 구월점',
  region: 'incheon',
  subRegion: '남동구',
  category: 'kids-cafe',
  sourceType: 'semi-official',
  sourceUrl: 'https://my.homeplus.co.kr/store/store_detail?storId=1119',
  verifiedAt: '2026-05-06',
  verificationStatus: 'semi_verified',
}
```

#### 출처 메모

- 공식 출처:
- 준공식/보조 출처: 홈플러스 공식 점포 페이지, 몬스터파크 브랜드 지점 안내
- 발견 경로: 기존 `content/places/incheon/index.ts` seed
- places 반영 파일: `content/places/incheon/index.ts`

### incheon-champion-1250-guwol-traders

기존 seed 보강 대상.

```ts
{
  id: 'incheon-champion-1250-guwol-traders',
  name: '챔피언1250 트레이더스 구월점',
  region: 'incheon',
  subRegion: '남동구',
  category: 'kids-cafe',
  sourceType: 'semi-official',
  sourceUrl: 'https://westart.or.kr/wp-content/uploads/2026/04/%EC%A0%84%EA%B5%AD%ED%94%8C%EB%A0%88%EC%9D%B4%ED%83%80%EC%9E%84%EC%A7%81%EC%98%81%EC%A0%90%EB%A7%A4%EC%9E%A5%EC%9C%84%EC%B9%98%EC%95%88%EB%82%B4.pdf',
  verifiedAt: '2026-05-06',
  verificationStatus: 'semi_verified',
}
```

#### 출처 메모

- 공식 출처:
- 준공식/보조 출처: 전국 플레이타임 직영점 매장 위치 안내 PDF, 오픈 보도자료 기반 기사
- 발견 경로: 기존 `content/places/incheon/index.ts` seed
- places 반영 파일: `content/places/incheon/index.ts`

## 보류 후보

| 장소 | 지역 | 이유 | 다음 확인 |
|---|---|---|---|
| 챔피언더블랙벨트 이마트 남양주점 | 경기북부 | 블로그·지도·검색 결과 중심으로 발견했으나 공식 지점/마트 임대매장/직영점 문서 확인이 부족함 | 플레이타임 공식 지점 목록 또는 이마트 임대매장 안내 확인 |
| 리틀마운틴 이마트천호점 | 서울 | 브랜드 공식 사이트는 확인되지만 지점 상세가 이미지/약한 링크 중심이고 최신 운영 사실을 고정하기 어려움 | 브랜드 지점 상세 또는 이마트 임대매장 안내 확인 |
| 몬스터파크 가양점 | 서울 | 방문 후기와 지도 신호는 있으나 몬스터파크 공식 지점 목록에는 확인되지 않음 | 브랜드 공식 지점 목록 또는 홈플러스 공식 점포 페이지 확인 |
| 타요키즈카페 롯데마트 일산주엽점 | 경기북부 | 채용공고·지도 신호는 있으나 브랜드 공식 지점 페이지를 확인하지 못함 | 타요키즈카페 공식 지점 또는 롯데마트 임대매장 안내 확인 |
| 홈플러스 인천송도점 상상스케치·상상블럭 | 인천 | 홈플러스 공식 점포 페이지에서 임대매장명은 보이나 키즈카페보다는 체험/블럭방 성격이라 1차 seed에서는 제외 | 별도 체험형 공간 카테고리로 재검토 |
| 홈플러스 김포점 키즈카페 | 경기북부 | 홈플러스 공식 점포 페이지에 `키즈카페` 임대매장 신호는 보이나 상호가 불명확함 | 상호명과 운영자 확인 |

## 제외 후보

| 장소 | 이유 |
|---|---|
| SPHOKIDZ 제휴 매장 목록 내 이마트·홈플러스 지점 | 키즈카페 시설이 아니라 제휴/서비스 매장 목록 성격으로 보여 `/places` seed 기준에 부족함 |
| 홈플러스 인천논현점 엔젤크루키즈스위밍 | 키즈카페보다 수영장 단독 시설에 가까워 이번 대형마트 키즈카페 범위에서는 제외 |

## 간단 결론

- places에 반영할 장소: 슈퍼윙스 롯데마트 중계점, 슈퍼윙스 롯데잠실점, 챔피언더블랙벨트 이마트 목동점, 챔피언더블랙벨트 홈플러스 상봉점, 노리디지털키즈카페 홈플러스 중계점, 챔피언더블랙벨트 홈플러스 의정부점, 챔피언더블랙벨트 트레이더스 김포점, 슈퍼윙스 롯데마트 수원영통점, 챔피언 홈플러스 오산점, 리틀치프 홈플러스 시화점, 챔피언더블랙벨트 홈플러스 인천송도점, 베이비엔젤스 홈플러스 인천송도점
- 보류할 장소: 이마트 남양주점 챔피언더블랙벨트, 이마트천호점 리틀마운틴, 몬스터파크 가양점, 타요키즈카페 롯데마트 일산주엽점, 홈플러스 인천송도점 상상스케치·상상블럭, 상호 불명확한 홈플러스 김포점 키즈카페
- 추가 확인이 필요한 정보: 정확한 요금, 운영시간, 휴무일, 주차 지원 시간, 보호자 요금, 키 제한

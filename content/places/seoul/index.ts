import type { PlaceSource } from '../../../types/place-source.ts';

const createNaverMapSearchUrl = (name: string, address: string) =>
  `https://map.naver.com/p/search/${encodeURIComponent(`${name} ${address}`)}`;

export const SEOUL_PLACES = [
  {
    id: 'seoul-kids-craft-village',
    name: '서울형 키즈카페 시립 공예마을점',
    region: 'seoul',
    subRegion: '종로구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://umppa.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=JN251201&q_fcltyStle=',
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%98%95%20%ED%82%A4%EC%A6%88%EC%B9%B4%ED%8E%98%20%EC%8B%9C%EB%A6%BD%20%EA%B3%B5%EC%98%88%EB%A7%88%EC%9D%84%EC%A0%90%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%A2%85%EB%A1%9C%EA%B5%AC%20%EC%9C%A8%EA%B3%A1%EB%A1%9C3%EA%B8%B8%204%20%EC%84%9C%EC%9A%B8%EA%B3%B5%EC%98%88%EB%B0%95%EB%AC%BC%EA%B4%80%20%EC%96%B4%EB%A6%B0%EC%9D%B4%EB%B0%95%EB%AC%BC%EA%B4%80%20%EA%B5%90%EC%9C%A1%EB%8F%99%202~3%EC%B8%B5',
    verifiedAt: '2026-04-07',
    lastObservedAt: '2026-04-07',
    verificationStatus: 'official_verified',
    description:
      '서울공예박물관 어린이박물관 교육동에 있는 0~9세 대상 공공형 키즈카페. 영아 동반 실내 나들이 후보로 묶기 좋다.',
    address:
      '서울특별시 종로구 율곡로3길 4 서울공예박물관 어린이박물관 교육동 2~3층',
    priceInfo: '지점 안내 확인',
    rainFriendly: true,
    stayMinutes: 90,
    operatorType: 'public',
  },
  {
    id: 'seoul-sangsangnara-happy-plus-cafe',
    name: '행복플러스카페(서울상상나라 내)',
    region: 'seoul',
    subRegion: '광진구',
    category: 'culture',
    ageBands: ['0-12m', '1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl:
      'https://www.seoulchildrensmuseum.org/reservation/viewConvenience.do',
    naverMapUrl:
      'https://map.naver.com/p/search/%ED%96%89%EB%B3%B5%ED%94%8C%EB%9F%AC%EC%8A%A4%EC%B9%B4%ED%8E%98(%EC%84%9C%EC%9A%B8%EC%83%81%EC%83%81%EB%82%98%EB%9D%BC%20%EB%82%B4)%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B4%91%EC%A7%84%EA%B5%AC%20%EB%8A%A5%EB%8F%99%EB%A1%9C%20216%20%EC%96%B4%EB%A6%B0%EC%9D%B4%EB%8C%80%EA%B3%B5%EC%9B%90%20%EB%82%B4',
    verifiedAt: '2026-04-06',
    lastObservedAt: '2026-04-06',
    verificationStatus: 'official_verified',
    description:
      '서울상상나라 편의시설로 연결되는 시설 연계형 가족 카페. 어린이대공원·서울상상나라 방문 동선과 함께 쓰기 좋다.',
    address: '서울특별시 광진구 능동로 216 어린이대공원 내',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
  },
  {
    id: 'seoul-caliclub-cheongdam',
    name: '캘리클럽 청담점',
    region: 'seoul',
    subRegion: '강남구',
    category: 'kids-cafe',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: false,
    sourceType: 'official',
    sourceUrl: 'https://caliclub.kr/cheongdamclub',
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%BA%98%EB%A6%AC%ED%81%B4%EB%9F%BD%20%EC%B2%AD%EB%8B%B4%EC%A0%90%20%EC%84%9C%EC%9A%B8%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EC%84%A0%EB%A6%89%EB%A1%9C%20832%20%EC%86%8C%EB%82%98%EB%AC%B4%20%EB%B9%8C%EB%94%A9%20%EC%A7%80%ED%95%98%202%EC%B8%B5',
    verifiedAt: '2026-04-07',
    lastObservedAt: '2026-04-07',
    verificationStatus: 'official_verified',
    description:
      '24개월 이상부터 초등 저학년까지 이용하기 좋은 스포츠형 사설 실내놀이터. 활동량 많은 아이에게 맞는 키즈 스포츠 공간이다.',
    address: '서울 강남구 선릉로 832 소나무 빌딩 지하 2층',
    priceInfo: '2시간 기준 / 공식 페이지 확인',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
    externalBlogLinks: [
      {
        title: '강남키즈카페 비오는 날엔 캘리클럽 청담점 이용방법, 주차',
        href: 'https://blog.naver.com/sjyceslove/224116774879',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '강남키즈카페 비오는 날엔 캘리클럽 청담점 이용방법, 주차',
        ogDescription:
          '미니쭈입니다 :) 비오는 주말 오후 아이들 신나게 놀아주러 강남키즈카페 캘리클럽 청담점 다녀왔어요! 오...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMjBfMTg2%2FMDAxNzY2MjE5NzMxODI1.2dt8M4KjikdQxi_eTyrcNIwH35N4JYMLWWV2WtAaVSUg._xqT40VZkLSKC_foC0MVjdZXvnh0n4tlna2h85Lg1g0g.JPEG%2FIMG%25A3%25DF4799.jpg%23900x676&type=ff192_192',
      },
      {
        title:
          '캘리클럽 청담점 | 강남 스포츠 키즈카페 추천 꿀잠 예약 👍🏻 - 주말 6세 방문 후기',
        href: 'https://blog.naver.com/dndnworld/224218042576',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '캘리클럽 청담점 | 강남 스포츠 키즈카페 추천 꿀잠 예약 👍🏻 - 주말 6세 방문 후기',
        ogDescription:
          '캘리클럽 청담점 추운 날씨에 놀이터도 가지 못해 신체 활동이 아쉬운 요즘. 보다 액티브한 키즈카페를 찾...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTZfMjgx%2FMDAxNzczNjI1NzgxNjkx.7zzFH_jT8dsFfV16bcUChcI_LJMMVPU4arRmIRGj7WAg.89vnLtn8julRQupsRIEMy1gukQNmg5hs2QwTUTaz5fYg.JPEG%2F900%25A3%25DF20260222%25A3%25DF152149.jpg%23815x563&type=ff192_192',
      },
      {
        title:
          '아이와 가볼만한곳 강남키즈카페 캘리클럽 청담점 초등학생 다녀온 후기',
        href: 'https://blog.naver.com/juran0628/224231709385',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '아이와 가볼만한곳 강남키즈카페 캘리클럽 청담점 초등학생 다녀온 후기',
        ogDescription:
          '주말에 우리 둘째와 둘째 베프와 함께 강남키즈카페 캘리클럽에 다녀왔어요. 이제 키즈카페 다니기 애매한 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMjZfMTk2%2FMDAxNzc0NTEzMTg5NzA5.sm2aakMuSPaDNTrVsVECsPcR-f0wat6AMhpdvK2m2ewg.TsFLlm5Yly5_DxcJNHF82l05050IBiego9ywJgB7zusg.JPEG%2F900%25A3%25DF20260322%25A3%25DF160929.jpg%23900x1350&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-caliclub-gocheok',
    name: '캘리클럽 고척점',
    region: 'seoul',
    subRegion: '구로구',
    category: 'kids-cafe',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://caliclub.kr/55',
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%BA%98%EB%A6%AC%ED%81%B4%EB%9F%BD%20%EA%B3%A0%EC%B2%99%EC%A0%90%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B5%AC%EB%A1%9C%EA%B5%AC%20%EA%B2%BD%EC%9D%B8%EB%A1%9C43%EA%B8%B8%2049%20C%EB%8F%99%201%EC%B8%B5',
    verifiedAt: '2026-04-07',
    lastObservedAt: '2026-04-07',
    verificationStatus: 'official_verified',
    description:
      '아이파크몰 고척점에 있는 24개월 이상 대상 사설 실내놀이터. 쇼핑몰 동선과 함께 묶기 좋은 실내 활동 공간이다.',
    address: '서울특별시 구로구 경인로43길 49 C동 1층',
    priceInfo: '2시간 기준 / 공식 페이지 확인',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
    externalBlogLinks: [
      {
        title:
          '육아 꿀장소 추천! 아이들과 다녀온 캘리클럽 고척점(아이파크몰) 후기 + 이용권 할인 & 팁 총정리',
        href: 'https://blog.naver.com/kkk64007/224175964305',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '육아 꿀장소 추천! 아이들과 다녀온 캘리클럽 고척점(아이파크몰) 후기 + 이용권 할인 & 팁 총정리',
        ogDescription:
          '지난 주말, 아이 체력 소모도 시키고 실내 놀이 공간을 찾던 중 다녀온 캘리클럽x태그액션 아이파크몰 고척...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDhfMjgy%2FMDAxNzcwNTE1ODcwMTk2.d_zPX0_csXjm-874j-XZ6dnWKLX_aSJ4NCnUWTh3J6og.pMigCr1-Sk_SG7vb7MZ77j2PdF2G16LNA2pDcfrbYawg.GIF%2F1964403649.gif%23282x500&type=ff192_192',
      },
      {
        title: '아이와 가볼만한 곳, 캘리클럽 고척점에서 즐거운 하루 보내기',
        href: 'https://blog.naver.com/kk0ngkk0ng/223929429391',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '아이와 가볼만한 곳, 캘리클럽 고척점에서 즐거운 하루 보내기',
        ogDescription:
          '여름이 다가오니까 더운 날씨에 아이들과 뭘 할지 고민이 되잖아요? 야외에서 뛰어놀기엔 덥고, 어디 갈지 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA3MDZfMTA3%2FMDAxNzUxNzg4MTg3Nzcy._WmH2QCvwGY6WGkCLU2jtXtEYEUy9g2sgsJ9l6iCyA0g.oW_5-SZsNUIdcgZ2KLuEgWz3GGCnl3dN8BdUVYIMM8Ig.JPEG%2FIMG%25A3%25DF9918.jpg%23900x1200&type=ff192_192',
      },
      {
        title:
          '구로 키즈카페 캘리클럽 고척점 후기! 초등학생 미취학 유아 모두 즐거운 서울 아이와 가볼만한곳',
        href: 'https://blog.naver.com/kreamdoll/224226571284',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '구로 키즈카페 캘리클럽 고척점 후기! 초등학생 미취학 유아 모두 즐거운 서울 아이와 가볼만한곳',
        ogDescription:
          '오늘은 구로 키즈카페 중에서도 액티브한 활동의 끝판왕인 캘리클럽 고척점에 다녀온 이야기를 들려드릴게...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMjNfMTAy%2FMDAxNzc0MjQzMTMzNTcw.0iyV8-jijhh1z-Zpf0WtNLQp3unTJpWtKX34lRjimSkg.g5ryPO0akSylhStrHquG2zzlZZT6Cvb_wk7RXDSdXZkg.JPEG%2Fcalli.jpg%23450x450&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-sol-kids-land',
    name: '쏠키즈랜드',
    region: 'seoul',
    subRegion: '은평구',
    category: 'kids-cafe',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'semi-official',
    sourceUrl:
      'https://www.daangn.com/kr/local-profile/%EC%8F%A0%ED%82%A4%EC%A6%88%EB%9E%9C%EB%93%9C-nghd5ced64ar/',
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%8F%A0%ED%82%A4%EC%A6%88%EB%9E%9C%EB%93%9C%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%9D%80%ED%8F%89%EA%B5%AC%20%EC%97%B0%EC%84%9C%EB%A1%9C3%EA%B8%B8%2040',
    verifiedAt: '2026-04-07',
    lastObservedAt: '2026-04-07',
    verificationStatus: 'semi_verified',
    description:
      '60평대 공간과 놀이시설을 갖춘 프라이빗 대관형 키즈카페. 예약형 소규모 모임 후보로 관리한다.',
    address: '서울특별시 은평구 연서로3길 40',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
    externalBlogLinks: [
      {
        title: '은평구키즈카페 쏠키즈랜드 아기랑 다녀온 후기',
        href: 'https://blog.naver.com/sweetpears/224099848703',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '은평구키즈카페 쏠키즈랜드 아기랑 다녀온 후기',
        ogDescription:
          '은평구 키즈카페 쏠키즈랜드 16개월 아기랑 다녀온 후기 요새 부쩍 활동량이 많아진 아기를 데리고 은평구...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMDRfMTc2%2FMDAxNzY0NzgzODUzNDkz.sgbiTwyrLqcd2LOJq-n_3a8QPpKMZnZaxpr_NdD3heEg.OGmec_H7O8Qprjn-1dw6ftwimhANaIZbyLpEJNezCmIg.JPEG%2FIMG%25A3%25DF3231.jpg%234032x3024&type=f250_208',
      },
      {
        title: '쏠키즈랜드 은평구키즈카페, 응암역 근처 아기랑 놀기 딱 좋은 곳',
        href: 'https://blog.naver.com/yvonne92/224068559894',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '쏠키즈랜드 은평구키즈카페, 응암역 근처 아기랑 놀기 딱 좋은 곳',
        ogDescription:
          '아이는 뛰어놀고 싶은데 사람 많은 키즈카페는 부담스럽고, 그렇다고 집에만 있자니 지루하죠? 그런 고민을...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTExMDdfNDgg%2FMDAxNzYyNTI3MzcwNjIw.gKDl_HTXVZ4tnxWxYNgdfvsHVBEIhEcPHzmXANQfYWUg.gfRQTyRjzVvK86Dc3QZVnMv8w3q5hTOPjIlsZHYL0jcg.GIF%2FGIF_2025-11-07_%25BF%25C0%25C8%25C4_11-54-17.gif%23491x743&type=ff192_192',
      },
      {
        title:
          '쏠키즈랜드 은평구 무인대관 키즈까페에 놀러갔어요 넓고 크고 좋아서 재방문의사 100 #쏠키즈랜드#키즈무인카페추천',
        href: 'https://blog.naver.com/angelakim02/224135783254',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '쏠키즈랜드 은평구 무인대관 키즈까페에 놀러갔어요 넓고 크고 좋아서 재방문의사 100 #쏠키즈랜드#키즈무인카페추천',
        ogDescription:
          '내돈내산 후기 쏠키즈랜드 은평구 내 위치하며 오늘 까지다녀본 키즈까페 중 너무나 만족 스러운 무인키즈...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMDZfMjIy%2FMDAxNzY3NjM2Mjk5MzMw.d3ypY5GY6WYwOOlFZOnF3rG8WtYsoJUv8hggyRYpb5Ig.I4FtWNtHCwqSCjEQQ3HrFvK2hLu8ex6yFv2XzFABxAUg.JPEG%2F1767636298739.jpg%23520x1187&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-chouchou-poollace',
    name: '슈슈풀레이스',
    region: 'seoul',
    subRegion: '노원구',
    category: 'kids-cafe',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season', 'summer'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'semi-official',
    sourceUrl:
      'https://www.daangn.com/kr/local-profile/%EC%8A%88%EC%8A%88%ED%92%80%EB%A0%88%EC%9D%B4%EC%8A%A4-1983960/',
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%8A%88%EC%8A%88%ED%92%80%EB%A0%88%EC%9D%B4%EC%8A%A4%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%85%B8%EC%9B%90%EA%B5%AC%20%EB%88%84%EC%9B%90%EB%A1%9C%2020%203%EC%B8%B5',
    verifiedAt: '2026-04-07',
    lastObservedAt: '2026-04-07',
    verificationStatus: 'semi_verified',
    description:
      '워터룸과 파티룸 성격을 함께 가진 프라이빗 공간. 영유아 동반 예약형 물놀이 후보로 분류한다.',
    address: '서울특별시 노원구 누원로 20 3층',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
  },
  {
    id: 'seoul-dduddurang-nolja',
    name: '뚜뚜랑놀자',
    region: 'seoul',
    subRegion: '도봉구',
    category: 'kids-cafe',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'semi-official',
    sourceUrl:
      'https://www.daangn.com/kr/local-profile/%EB%9A%9C%EB%9A%9C%EB%9E%91%EB%86%80%EC%9E%90-jx9f3d97g216/',
    naverMapUrl:
      'https://map.naver.com/p/search/%EB%9A%9C%EB%9A%9C%EB%9E%91%EB%86%80%EC%9E%90%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%8F%84%EB%B4%89%EA%B5%AC%20%EB%8F%84%EB%B4%89%EB%A1%9C133%EA%B8%B8%2041',
    verifiedAt: '2026-04-07',
    lastObservedAt: '2026-04-07',
    verificationStatus: 'semi_verified',
    description:
      '무인 대관형 키즈카페. 네이버 예약 시스템과 공식 SNS 운영 신호가 있어 발행 가능한 준검증 후보로 둔다.',
    address: '서울특별시 도봉구 도봉로133길 41',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
  },
  {
    id: 'seoul-chakan-tokki-bugahyeon',
    name: '착한토끼 서대문북아현하우스',
    region: 'seoul',
    subRegion: '서대문구',
    category: 'kids-cafe',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'semi-official',
    sourceUrl:
      'https://www.daangn.com/kr/local-profile/%EC%B0%A9%ED%95%9C%ED%86%A0%EB%81%BC-%EC%84%9C%EB%8C%80%EB%AC%B8%EB%B6%81%EC%95%84%ED%98%84%ED%95%98%EC%9A%B0%EC%8A%A4-p7o7pgo4a94v/',
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%B0%A9%ED%95%9C%ED%86%A0%EB%81%BC%20%EC%84%9C%EB%8C%80%EB%AC%B8%EB%B6%81%EC%95%84%ED%98%84%ED%95%98%EC%9A%B0%EC%8A%A4%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%84%9C%EB%8C%80%EB%AC%B8%EA%B5%AC%20%EC%8B%A0%EC%B4%8C%EB%A1%9C%20231',
    verifiedAt: '2026-04-07',
    lastObservedAt: '2026-04-07',
    verificationStatus: 'semi_verified',
    description:
      '100% 예약제로 운영되는 무인 프라이빗 키즈카페. 소규모 가족 모임과 생일 모임 후보로 관리한다.',
    address: '서울특별시 서대문구 신촌로 231',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
  },
  {
    id: 'seoul-karaplay',
    name: '카라플레이',
    region: 'seoul',
    subRegion: '동대문구',
    category: 'experience',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'semi-official',
    sourceUrl:
      'https://www.daangn.com/kr/local-profile/%EC%B9%B4%EB%9D%BC%ED%94%8C%EB%A0%88%EC%9D%B4-1749023/',
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%B9%B4%EB%9D%BC%ED%94%8C%EB%A0%88%EC%9D%B4%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%8F%99%EB%8C%80%EB%AC%B8%EA%B5%AC%20%EB%8B%B5%EC%8B%AD%EB%A6%AC%EB%A1%9C30%EA%B8%B8%2044',
    verifiedAt: '2026-04-07',
    lastObservedAt: '2026-04-07',
    verificationStatus: 'semi_verified',
    description:
      '북플레이 라운지형 키즈 공간. 일반 키즈카페보다 프로그램형 성격이 있어 체험시설로 분류한다.',
    address: '서울특별시 동대문구 답십리로30길 44',
    rainFriendly: true,
    stayMinutes: 90,
    operatorType: 'commercial',
  },
  {
    id: 'seoul-woorikkiri-dapsimni-sports',
    name: '우리끼리 키즈카페 스포츠마을 답십리점',
    region: 'seoul',
    subRegion: '동대문구',
    category: 'kids-cafe',
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'semi-official',
    sourceUrl: 'https://www.daangn.com/kr/local-profile/5d8pyono2hbw/',
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%9A%B0%EB%A6%AC%EB%81%BC%EB%A6%AC%20%ED%82%A4%EC%A6%88%EC%B9%B4%ED%8E%98%20%EC%8A%A4%ED%8F%AC%EC%B8%A0%EB%A7%88%EC%9D%84%20%EB%8B%B5%EC%8B%AD%EB%A6%AC%EC%A0%90%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%8F%99%EB%8C%80%EB%AC%B8%EA%B5%AC%20%EC%A0%84%EB%86%8D%EB%A1%9C%2024%20%EA%B3%84%EB%A6%BC%EB%B9%8C%EB%94%A9%206%EC%B8%B5%20601%ED%98%B8',
    verifiedAt: '2026-04-07',
    lastObservedAt: '2026-04-07',
    verificationStatus: 'semi_verified',
    description:
      '무인 대관형 스포츠마을 콘셉트 키즈카페. 예약제 실내 놀이공간으로 짧은 모임에 적합하다.',
    address: '서울특별시 동대문구 전농로 24 계림빌딩 6층 601호',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
  },
  {
    id: 'seoul-kidsrun-sports-park-mokdong',
    name: '키즈런스포츠파크 목동점',
    region: 'seoul',
    subRegion: '양천구',
    category: 'kids-cafe',
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'semi-official',
    sourceUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=df032f21-89fd-4d3d-8013-1c5fcd5b19b8',
    naverMapUrl:
      'https://map.naver.com/p/search/%ED%82%A4%EC%A6%88%EB%9F%B0%EC%8A%A4%ED%8F%AC%EC%B8%A0%ED%8C%8C%ED%81%AC%20%EB%AA%A9%EB%8F%99%EC%A0%90%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%96%91%EC%B2%9C%EA%B5%AC%20%EB%AA%A9%EB%8F%99%EB%8F%99%EB%A1%9C%20401%20%EB%B6%80%EC%98%81%EA%B7%B8%EB%A6%B0%ED%83%80%EC%9A%B42%EC%B0%A8%20%EC%A7%80%ED%95%981%EC%B8%B5%20B101%ED%98%B8',
    verifiedAt: '2026-05-04',
    lastObservedAt: '2026-05-04',
    verificationStatus: 'semi_verified',
    description:
      '1000평 규모로 소개된 대형 스포츠형 키즈카페. 카트존, 슬라이드, 편백놀이, 에어바운스 등 활동형 콘텐츠가 많다.',
    address: '서울특별시 양천구 목동동로 401 부영그린타운2차 지하1층 B101호',
    rainFriendly: true,
    stayMinutes: 180,
    operatorType: 'commercial',
    externalBlogLinks: [
      {
        title:
          '[서울 양천] 키즈런 스포츠파크 목동점 (아이 반응폭발 찐후기/어린이날 가볼만한곳/서울대형키즈카페/아이랑 주말 나들이 추천)',
        href: 'https://blog.naver.com/157823/224277056499',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[서울 양천] 키즈런 스포츠파크 목동점 (아이 반응폭발 찐후기/어린이날 가볼만한곳/서울대형키즈카페/아이랑 주말 나들이 추천)',
        ogDescription:
          '안녕하세요 똑똑맘이예요! 요즘 날씨가 오락가락해서 아이랑 어디 갈지 고민 많으시죠. 저도 주말마다 실내...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA1MDZfMTcz%2FMDAxNzc4MDc2NDIzNjQz.Dd28Csw5YCT-7wShIGwKuWftGbaaCwP1AOyoNxlwZfMg.ZhPUo7lQA6uqZ2gVzo4t0j7VT9N2cZQ7WItWOcyN6tIg.JPEG%2F20260503_162621.jpg%232249x2249&type=ff192_192',
      },
      {
        title: '키즈런 스포츠파크 목동점 서울대형키즈카페 후기 종일권 추천',
        href: 'https://blog.naver.com/eatjoyview/224190994642',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '키즈런 스포츠파크 목동점 서울대형키즈카페 후기 종일권 추천',
        ogDescription:
          '친구들과 봄방학을 맞아 함께 키즈카페에 다녀왔어요. 좀 컸다고 만나면 두세 시간 노는 걸로는 성에 안 차...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMjFfMjM1%2FMDAxNzcxNjc2OTM5NzQ4.lToSjFCuqOwYcKGzWTpHKkeMCa05D-EJ410g2dygssUg.-cnYVkVRDqI3-8eemIOfbefdoyGX6HPJPAwzv4bfpG4g.JPEG%2Foutput%25A3%25DF3142276793.jpg%23889x762&type=ff192_192',
      },
      {
        title:
          '목동 대형 키즈카페 : 키즈런 스포츠파크 목동점 내돈내산 후기 | 주차, 입장권, 음식메뉴',
        href: 'https://blog.naver.com/rainbowsprinkles/224109278577',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '목동 대형 키즈카페 : 키즈런 스포츠파크 목동점 내돈내산 후기 | 주차, 입장권, 음식메뉴',
        ogDescription:
          '주말을 맞아 아이와 목동 키즈카페에 다녀왔어요. 키즈런 스포츠파크 목동점, 여기는 목동에서 가장 큰 대...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMTRfMTM5%2FMDAxNzY1NjkxODkzNTQ5.i-ABLdRSt0DayxUo0odZF3_uoh9u3efzjegJWgZFjdog.tUfknxwq9JNZOOOm7ZCDZPev1nV4fMSd6YLG1xQxNhcg.JPEG%2F900%25A3%25DF20251214%25A3%25DF145009.jpg%23900x675&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-superwings-lotte-mart-junggye',
    name: '슈퍼윙스 키즈카페 롯데마트 중계점',
    region: 'seoul',
    subRegion: '노원구',
    category: 'kids-cafe',
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl:
      'https://www.superwingskidscafe.com/mall/m_mall_detail.php?ps_goid=29',
    naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('슈퍼윙스 키즈카페 롯데마트 중계점 서울특별시 노원구 노원로 330 롯데마트 중계점 지하1층')}`,
    verifiedAt: '2026-05-06',
    lastObservedAt: '2026-05-06',
    verificationStatus: 'official_verified',
    description:
      '롯데마트 중계점 지하에 입점한 캐릭터 테마형 실내 키즈카페. 마트 장보기 동선과 비 오는 날 실내 놀이를 함께 묶기 좋다.',
    address: '서울특별시 노원구 노원로 330 롯데마트 중계점 지하1층',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '유료 / 공식 지점 안내 기준 변동',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
    editorNote:
      '슈퍼윙스 공식 지점 페이지에서 롯데마트 중계점 지점 운영 신호를 확인했다.',
    externalBlogLinks: [
      {
        title: '슈퍼윙스 키즈카페 롯데마트 중계점 방문 후기 / 노원키즈카페',
        href: 'https://blog.naver.com/miohng/223897154353',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '슈퍼윙스 키즈카페 롯데마트 중계점 방문 후기 / 노원키즈카페',
        ogDescription:
          '지난 연휴, 첫째가 슈퍼윙스 키즈카페에 가고 싶다고 해서 롯데마트 중계점에 있는 슈퍼윙스 키즈카페를 다...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA2MTJfMjEy%2FMDAxNzQ5NzE4OTA1NjQz.uWN-iKF4PSspV6BoGxkffCjOG3pjXgxba8L_OL-6blAg.5vlAGB3XVffPppkKY5Q-r8cyY_bXxw99-0S4Lt80m-og.JPEG%2F%25BA%25ED%25B7%25CE%25B1%25D7%25BD%25E6%25B3%25D7%25C0%25CF%25BB%25E7%25C1%25F8%25B5%25CE%25B0%25B3_%25BA%25B9%25BB%25E7%25BA%25BB-001.jpg%23960x960&type=f250_208',
      },
      {
        title:
          '[슈퍼윙스 키카 롯데마트 중계점] 18개월 아기와 다녀온 내돈내산 솔직 후기!',
        href: 'https://blog.naver.com/purunleaf/224150810643',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[슈퍼윙스 키카 롯데마트 중계점] 18개월 아기와 다녀온 내돈내산 솔직 후기!',
        ogDescription:
          '안녕하세요, 푸른잎사귀입니다!🌿 오늘은 중계동 롯데마트에 있는 슈퍼윙스 키즈카페에 18개월 새싹이와 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMThfMzYg%2FMDAxNzY4NzEzNzc0ODY3.4vOUW83r_cpjczP1vQCLTxVZu2rXEo-BlI3a0UjyHpUg.qm0v2AGV_5Mz7otVTW1l1V7hw8elrFg7CSQ7KcjlYC0g.JPEG%2F20251215_155353.jpg%232252x4000&type=ff192_192',
      },
      {
        title: '노원키즈카페 슈퍼윙스 롯데마트 중계점 5살 방문후기',
        href: 'https://blog.naver.com/hajung0716/224022240407',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '노원키즈카페 슈퍼윙스 롯데마트 중계점 5살 방문후기',
        ogDescription:
          '주소: 서울시 노원구 노원로 330 지하1층 전화번호: 02-930-4388 영업시간: 11:00~19:50 (2,4주 마트 휴무...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MjVfMTIx%2FMDAxNzU4Nzc2OTkzMDI5.SSCikb0mabVEjN4hXaWy4woHJLaNhlSB9MrfzjGUWc8g.OmncGU7GSap3t57IqR9zUnfpuGyrgWnk3WXYfuTJqXkg.JPEG%2F%25C1%25A6%25B8%25F1-%25BE%25F8%25C0%25BD-1.jpg%23500x500&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-superwings-lotte-mart-jamsil',
    name: '슈퍼윙스 키즈카페 롯데잠실점',
    region: 'seoul',
    subRegion: '송파구',
    category: 'kids-cafe',
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl:
      'https://www.superwingskidscafe.com/mall/m_mall_detail.php?ps_goid=31',
    naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('슈퍼윙스 키즈카페 롯데잠실점 서울특별시 송파구 올림픽로 240 롯데마트 5층')}`,
    verifiedAt: '2026-05-06',
    lastObservedAt: '2026-05-06',
    verificationStatus: 'official_verified',
    description:
      '롯데마트 잠실권 동선에 있는 캐릭터 테마형 실내 키즈카페. 미취학 아이와 쇼핑몰·마트 방문을 함께 구성하기 좋다.',
    address: '서울특별시 송파구 올림픽로 240 롯데마트 5층',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '유료 / 공식 지점 안내 기준 변동',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
    editorNote:
      '슈퍼윙스 공식 지점 페이지에서 롯데잠실점 운영 신호를 확인했다. 동일 주소권에 기존 키자니아 서울 seed가 있어 목적별 중복을 구분한다.',
  },
  {
    id: 'seoul-champion-black-belt-emart-mokdong',
    name: '챔피언더블랙벨트 이마트 목동점',
    region: 'seoul',
    subRegion: '양천구',
    category: 'kids-cafe',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'semi-official',
    sourceUrl: 'https://www.fntoday.co.kr/news/articleView.html?idxno=368876',
    naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('챔피언더블랙벨트 이마트 목동점 서울특별시 양천구 오목로 299 이마트 목동점 지하1층')}`,
    verifiedAt: '2026-05-06',
    lastObservedAt: '2026-05-06',
    verificationStatus: 'semi_verified',
    description:
      '이마트 목동점 지하에 입점한 플레이타임 계열 스포츠형 키즈카페. 클라이밍·어드벤처 중심의 활동형 실내 놀이 후보로 둔다.',
    address: '서울특별시 양천구 오목로 299 이마트 목동점 지하1층',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '유료 / 지점 안내 기준 변동',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
    editorNote:
      '오픈 보도자료와 전국 플레이타임 직영점 매장 위치 안내 PDF에서 지점명을 교차 확인했다. 마트 주차 지원은 방문 전 재확인 필요.',
    externalBlogLinks: [
      {
        title: '목동 키즈카페 챔피언더블랙벨트 이마트 목동점 후기(+주차)',
        href: 'https://blog.naver.com/heeseung823/224188768149',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '목동 키즈카페 챔피언더블랙벨트 이마트 목동점 후기(+주차)',
        ogDescription:
          '목동 키즈카페 챔피언더블랙벨트 "이마트 목동점 후기" 안녕하세요. 희야입니다. 오늘 폿팅은 챔...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMTVfMjg3%2FMDAxNzY4NDE5NTQ2Mzg0.w1DFOxuOY42mzeaHz7nSVPi31TJRr9v55ssX75Zu2UIg.CyqFu2C65b1Eb2HJ2VZyGbdhjGtdzIL-5r03nc5F9log.JPEG%2FIMG%25A3%25DF2852.JPG%236000x4000&type=ff192_192',
      },
      {
        title:
          '[목동]"챔피언더블랙벨트 이마트 목동점" 추천(메뉴+할인팁+파티룸)',
        href: 'https://blog.naver.com/durud0825/224015009347',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[목동]"챔피언더블랙벨트 이마트 목동점" 추천(메뉴+할인팁+파티룸)',
        ogDescription:
          '📝오늘의 리뷰 목동 아이와 가볼 만한 곳 추천 " 챔피언더블랙벨트 이마트 목동점 " 안녕하세요 햅삐슝...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MTlfMTc1%2FMDAxNzU4MjUxMzc5MzYy.xq7uol1aa5fdfHOsDCKLlHFq-4cKwMR0UJHX7wCAJcgg.PrpQzcG8jBUEObyxSnDOPW6c9P-MXx4l7pI1XOQIct8g.JPEG%2Foutput%25A3%25DF4136479881.jpg%23900x582&type=ff192_192',
      },
      {
        title:
          '목동 키즈카페 : 챔피언더블랙벨트 이마트 목동점 내돈내산 후기 | 주차, 입장료, 내부시설',
        href: 'https://blog.naver.com/rainbowsprinkles/224024523433',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '목동 키즈카페 : 챔피언더블랙벨트 이마트 목동점 내돈내산 후기 | 주차, 입장료, 내부시설',
        ogDescription:
          '주말을 맞아 아이와 챔피언더블랙벨트 이마트 목동점에 다녀왔어요. 여긴 집과 가까워서 자주 오는 곳인데 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MjhfMjc1%2FMDAxNzU5MDM1MzI4MTM5.iOJTLBi63CWnP1ToPiQes6g38KWry0PMApu8aH7PYkog.ERLYp-Tdgm34mK1paBog2jGcG9QydTtd7pxQyRQ5AYEg.JPEG%2F900%25A3%25DF20250927%25A3%25DF131246.jpg%23900x675&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-champion-black-belt-homeplus-sangbong',
    name: '챔피언더블랙벨트 홈플러스 상봉점',
    region: 'seoul',
    subRegion: '중랑구',
    category: 'kids-cafe',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'semi-official',
    sourceUrl:
      'https://westart.or.kr/wp-content/uploads/2026/04/%EC%A0%84%EA%B5%AD%ED%94%8C%EB%A0%88%EC%9D%B4%ED%83%80%EC%9E%84%EC%A7%81%EC%98%81%EC%A0%90%EB%A7%A4%EC%9E%A5%EC%9C%84%EC%B9%98%EC%95%88%EB%82%B4.pdf',
    naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('챔피언더블랙벨트 홈플러스 상봉점 서울특별시 중랑구 망우로 353 홈플러스 상봉점 지하2층')}`,
    verifiedAt: '2026-05-06',
    lastObservedAt: '2026-05-06',
    verificationStatus: 'semi_verified',
    description:
      '홈플러스 상봉점 지하에 입점한 플레이타임 계열 스포츠형 키즈카페. 중랑구 생활권에서 마트 방문과 함께 들르기 좋은 실내 놀이 후보다.',
    address: '서울특별시 중랑구 망우로 353 홈플러스 상봉점 지하2층',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '유료 / 지점 안내 기준 변동',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
    editorNote:
      '전국 플레이타임 직영점 매장 위치 안내 PDF에서 지점명을 확인했다. 홈플러스 개별 임대매장 안내와 요금은 방문 전 재확인 필요.',
    externalBlogLinks: [
      {
        title:
          '홈플러스상봉점 챔피언더블랙벨트(만3세이용후기ㅣ플레이타임예약ㅣ키즈카페ㅣ아기랑ㅣ리뉴얼오픈ㅣ실내놀이터ㅣ망우아기랑)',
        href: 'https://blog.naver.com/iamsari-/223875153144',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '홈플러스상봉점 챔피언더블랙벨트(만3세이용후기ㅣ플레이타임예약ㅣ키즈카페ㅣ아기랑ㅣ리뉴얼오픈ㅣ실내놀이터ㅣ망우아기랑)',
        ogDescription:
          '5월 19일 월요일 오후에 방문했던 챔피언더블랙벨트 홈플러스 상봉점 늘상 큰 초딩형아, 누나들이 점령했어...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA1MjNfMjU3%2FMDAxNzQ3OTY3ODg3NTk4.uXU2cBag2Q15Tyok12srKq22PvXuRgxktsfVqog0e98g.O8ImNnF3sZcZyqzKzZOBFjGU7QwUNzNSROMmC0RIGzcg.GIF%2F352044640.gif%23282x500&type=ff192_192',
      },
      {
        title:
          '중랑구 키즈카페/챔피언더블랙벨트 홈플러스 상봉점 애용 후기/멤버쉽 할인, 주차정보‼️',
        href: 'https://blog.naver.com/jyk9369/224210531832',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '중랑구 키즈카페/챔피언더블랙벨트 홈플러스 상봉점 애용 후기/멤버쉽 할인, 주차정보‼️',
        ogDescription:
          "안녕하세요! 오늘은 중랑구 키즈카페 후기를 가져왔습니당 바로 ' 챔피언더블랙벨트 상봉점 '‼...",
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMDlfMTk3%2FMDAxNzczMDU2OTI3NDYw.KGz1HFR0IJNqe8lZD1sY33XrX88CnyCuTCSSVGmWDDAg.ekPz3pjtqueAYOWKzbCar4ybqa5Ipgrzxz9A9R9sNAgg.JPEG%2F900%25A3%25DF20260306%25A3%25DF115242.jpg%23900x675&type=ff192_192',
      },
      {
        title: '챔피언더블랙벨트 홈플러스 상봉점 키즈카페 이용 후기',
        href: 'https://blog.naver.com/ukbyeol/224274782752',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '챔피언더블랙벨트 홈플러스 상봉점 키즈카페 이용 후기',
        ogDescription:
          '쿠팡 보상쿠폰으로 다녀온 상봉동 키즈카페 챔피언더블랙벨트 홈플러스 상봉점 이용 후기 망우역 홈플러스 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjFfMjk4%2FMDAxNzc2Nzc1MDk4NDM5.chf8qdFqPo4itd0Yv2Ip9UrvVj6UPWy8SoPumBEHV8Mg.v4xrBce5lWgws5bFig6Rp4bwFQCwtRvMpoq5vAYl43gg.JPEG%2FIMG%25A3%25DF5760.JPG%23900x676&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-nori-digital-kids-homeplus-junggye',
    name: '노리디지털키즈카페 홈플러스 중계점',
    region: 'seoul',
    subRegion: '노원구',
    category: 'kids-cafe',
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'semi-official',
    sourceUrl: 'https://my.homeplus.co.kr/store/store_detail?storId=616',
    naverMapUrl: `https://map.naver.com/p/search/${encodeURIComponent('노리디지털키즈카페 홈플러스 중계점 서울특별시 노원구 동일로204가길 12 홈플러스 서울중계점 1층')}`,
    verifiedAt: '2026-05-06',
    lastObservedAt: '2026-05-06',
    verificationStatus: 'semi_verified',
    description:
      '홈플러스 서울중계점 1층 임대매장으로 확인되는 실내 키즈카페. 마트 방문 중 짧게 들르는 생활권 놀이 후보로 둔다.',
    address: '서울특별시 노원구 동일로204가길 12 홈플러스 서울중계점 1층',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '요금 확인 필요',
    rainFriendly: true,
    stayMinutes: 90,
    operatorType: 'commercial',
    editorNote:
      '홈플러스 공식 점포 페이지에서 임대매장명을 확인했다. 별도 브랜드 공식 상세는 약해 이용 전 전화 확인이 필요하다.',
  },
  {
    id: 'seoul-champion-1250x-yongsan',
    name: '챔피언1250X 아이파크몰 용산점',
    region: 'seoul',
    subRegion: '용산구',
    category: 'kids-cafe',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'semi-official',
    sourceUrl:
      'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=a591d1ba-0412-46bf-bad0-d3707bdc7d16',
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%B1%94%ED%94%BC%EC%96%B81250X%20%EC%95%84%EC%9D%B4%ED%8C%8C%ED%81%AC%EB%AA%B0%20%EC%9A%A9%EC%82%B0%EC%A0%90%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%9A%A9%EC%82%B0%EA%B5%AC%20%ED%95%9C%EA%B0%95%EB%8C%80%EB%A1%9C23%EA%B8%B8%2055%20%EC%95%84%EC%9D%B4%ED%8C%8C%ED%81%AC%EB%AA%B0%20%EB%A6%AC%EB%B9%99%ED%8C%8C%ED%81%AC%206%EC%B8%B5',
    verifiedAt: '2026-05-04',
    lastObservedAt: '2026-05-04',
    verificationStatus: 'semi_verified',
    description:
      '오르기, 뛰기, 매달리기 중심의 익스트림 어린이 스포츠클럽. 활동량 많은 유아·초등 저학년에게 맞다.',
    address: '서울특별시 용산구 한강대로23길 55 아이파크몰 리빙파크 6층',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
    externalBlogLinks: [
      {
        title:
          '[용산] 챔피언 1250X 아이파크몰 용산점 _ 아이와 함께 가기 좋은 키즈카페',
        href: 'https://blog.naver.com/eyss59_/224274480222',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[용산] 챔피언 1250X 아이파크몰 용산점 _ 아이와 함께 가기 좋은 키즈카페',
        ogDescription:
          '(내돈내산) 챔피언 1250X 아이파크몰 용산점 * 위치 서울 용산구 한강대로 23길 55 아이파크몰 리빙파크 6...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA1MDFfOTkg%2FMDAxNzc3NjI0MTI1MTM4.uozq2kPGQJeQCs1EmZvbILkoWtiK3OGfrzPuI7wHjbkg.Y9PgyNkQELpS8xWVL-XP-4x_EQrQz3KdNtf4E7-ianQg.JPEG%2FKakaoTalk_20260110_201628547_19.jpg%233000x2250&type=ff192_192',
      },
      {
        title: '용산 키즈카페 챔피언1250X 아이파크몰 용산점 가격 주차 할인방법',
        href: 'https://blog.naver.com/kimx2772/224210241488',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '용산 키즈카페 챔피언1250X 아이파크몰 용산점 가격 주차 할인방법',
        ogDescription:
          '챔피언1250X 아이파크몰 용산점 용산 키즈카페 가볼만한 곳 추천 조카가 키즈카페를 정말 좋아해서 만날 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMDlfMjA1%2FMDAxNzczMDQ2MTcwNjQ0.oR2BFCuPuD40rmr8Ccu0ibq6HTepafmVbrOhpcEvyfMg.94nIAm8zNqQJVMFqSdEyPbSXdXUZQJSl82qwcGVWovcg.JPEG%2FIMG%25A3%25DF8005.JPG%23900x900&type=ff192_192',
      },
      {
        title: '용산 아이파크몰 키즈카페/용산 아이랑 챔피언1250X, 쇼핑은 덤!',
        href: 'https://blog.naver.com/bosughom88/223991512169',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '용산 아이파크몰 키즈카페/용산 아이랑 챔피언1250X, 쇼핑은 덤!',
        ogDescription:
          '용산 아이파크몰 키즈카페/용산 아이랑 챔피언1250X 익스트림한 놀이 콘텐츠로 가득한 신개념 어린이 복합...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MDFfMjMx%2FMDAxNzU2NzI3NTA5MDEy.WUSCyNQr7Si6EnaH-2O02UW2d-ciwpqGjXNYsQNgBykg.HBZn9q5XlYsoGT3Ec7Rg-y9ig0Ic_RYjEY57ydZENvYg.JPEG%2FDSC06696.jpg%232048x1365&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-champion-1250-gangdong',
    name: '챔피언1250 더리버몰 강동점',
    region: 'seoul',
    subRegion: '강동구',
    category: 'kids-cafe',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'semi-official',
    sourceUrl: 'https://www.etnews.com/20250410000061',
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%B1%94%ED%94%BC%EC%96%B81250%20%EB%8D%94%EB%A6%AC%EB%B2%84%EB%AA%B0%20%EA%B0%95%EB%8F%99%EC%A0%90%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%8F%99%EA%B5%AC%20%EA%B3%A0%EB%8D%95%EB%8F%99%20%EB%8D%94%EB%A6%AC%EB%B2%84%EB%AA%B0',
    verifiedAt: '2026-05-04',
    lastObservedAt: '2026-05-04',
    verificationStatus: 'semi_verified',
    description:
      '더리버몰에 입점한 프리미엄 키즈 테마파크 후보. 순환형 짚라인과 어린이 방탈출형 프로그램 운영 신호가 있다.',
    address: '서울특별시 강동구 고덕동 더리버몰',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
    editorNote:
      '보도자료 기반 후보라 발행 전 공식 예약 링크와 전화 확인이 필요하다.',
    externalBlogLinks: [
      {
        title: '아이와 가볼만한 곳 챔피언 1250 더리버몰 강동점 방문 후기',
        href: 'https://blog.naver.com/marinaview/224259179059',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '아이와 가볼만한 곳 챔피언 1250 더리버몰 강동점 방문 후기',
        ogDescription:
          '안녕하세요? 룰루정군입니다! 오늘은 지난 주말 아이들과 함께 다녀온 챔피언1250 더리버몰 강동점 후기를 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjBfMjI5%2FMDAxNzc2NjcxNzI1NDQw.A0iwV_YihH2MD2fL9RtRDgLtxyHDTEXBObD0QOdRMxwg.A_NW-TG-8f5WXn4vCM8fIWoZN_EW7etocH_6vn4IdHgg.JPEG%2FIMG%25A3%25DF9767.JPG%23550x733&type=f250_208',
      },
      {
        title: '아이랑 주말 키즈카페 추천 챔피언1250 더 리버몰 강동점',
        href: 'https://blog.naver.com/bobobob87/224048489715',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '아이랑 주말 키즈카페 추천 챔피언1250 더 리버몰 강동점',
        ogDescription:
          '아이랑 주말 키즈카페 추천 챔피언1250 더 리버몰 강동점 추석연휴에 다녀온 챔피언1250 후기 🎈위치: 서...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEwMjFfNCAg%2FMDAxNzYxMDEwNjgwNjk4.JoFwVAwhu_Ov2BvErMrxoz8vSeC8KFf1W-0ZLjBAw2Eg.liMvQIteUOY14PDaePRXXTqUM2FmBlDjpH40IVk_pXwg.JPEG%2F900%25A3%25DF1761010672646.jpg%23900x1200&type=ff192_192',
      },
      {
        title:
          '[챔피언1250 더 리버몰 강동점] 아이와 함께 대형 키즈카페 방문 | 할인 꿀팁!!!',
        href: 'https://blog.naver.com/mintds86/224269152032',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[챔피언1250 더 리버몰 강동점] 아이와 함께 대형 키즈카페 방문 | 할인 꿀팁!!!',
        ogDescription:
          '안녕하세요, N잡러를 꿈꾸는 최대리입니다 : ) 지난 주말, 집에서 심심해하는 아이를 데리고 대형 키즈카...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjlfODIg%2FMDAxNzc3NDM3MDg5OTE1.uttsH6F5xR4MAFXbMr2gET2cqOJxRMBHY7O26XbYFEwg.YSosL7A1zi-g6HYdIPjwizWICf2sAUtfwFd3_SnthGQg.JPEG%2FKakaoTalk_20260429_132519178_16.jpg%232250x1835&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-ballbearpark-eunpyeong',
    name: '볼베어파크 롯데몰 은평점',
    region: 'seoul',
    subRegion: '은평구',
    category: 'kids-cafe',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'semi-official',
    sourceUrl: 'https://www.ballbearpark.com/',
    naverMapUrl:
      'https://map.naver.com/p/search/%EB%B3%BC%EB%B2%A0%EC%96%B4%ED%8C%8C%ED%81%AC%20%EB%A1%AF%EB%8D%B0%EB%AA%B0%20%EC%9D%80%ED%8F%89%EC%A0%90%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%9D%80%ED%8F%89%EA%B5%AC%20%ED%86%B5%EC%9D%BC%EB%A1%9C%201050%20%EB%A1%AF%EB%8D%B0%EB%AA%B0%20%EC%9D%80%ED%8F%89%EC%A0%90%203%EC%B8%B5',
    verifiedAt: '2026-05-04',
    lastObservedAt: '2026-05-04',
    verificationStatus: 'semi_verified',
    description:
      '축구, 야구, 복싱, 볼챌린지 등 스포츠 체험을 결합한 어린이 스포츠 테마파크.',
    address: '서울특별시 은평구 통일로 1050 롯데몰 은평점 3층',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
    externalBlogLinks: [
      {
        title: '볼베어파크 롯데몰 은평점 주말 후기 및 근처식당',
        href: 'https://blog.naver.com/jeong189212/224083805686',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '볼베어파크 롯데몰 은평점 주말 후기 및 근처식당',
        ogDescription:
          '볼베어파크 롯데몰 은평점 주말 후기 및 근처식당 날씨는 점점 추워지고, 아이 체력은 감당이 안 되고... ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTExMjFfMjE5%2FMDAxNzYzNzI0Mzc5MDE5.2_HMz2K3CtqaLkgFwmRnA-R6pirpq-HhXzCLql-Dvjcg.-PcPvZnz_wflAMt8biVqYcalgbgzRoNmlg57QKQLmikg.JPEG%2FKakaoTalk_20251121_200702805_16.jpg%234000x3000&type=ff192_192',
      },
      {
        title:
          '[롯데몰 은평점] 아이와 가볼만한 곳, 볼베어파크 키즈카페 내돈내산 솔직 후기',
        href: 'https://blog.naver.com/bini_life_story/223985206456',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[롯데몰 은평점] 아이와 가볼만한 곳, 볼베어파크 키즈카페 내돈내산 솔직 후기',
        ogDescription:
          '볼베어파크 롯데몰 은평점 안녕하세요. 비니입니다. 요즘 아들이 점점 크면서 활동하는걸 좋아하다보니 자...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MjdfMTQ0%2FMDAxNzU2MjcwMzk1NDA3._CjKZ1Pcx6Hei3fOVZGLVkEINuAefN5vsGXmQpnvOxMg.Bb-PCP2MmZJ-PZ_Z6ig00bOSIWde02JKLy1JexcsvX4g.JPEG%2FKakaoTalk_20250826_211134385_01.jpg%233024x4032&type=ff192_192',
      },
      {
        title:
          '볼베어파크 롯데몰 은평점: 은평구 구파발 대형 스포츠 테마 키즈카페 / 주말에 아이랑 뭐하지? / 아이와 실내 갈만한곳!',
        href: 'https://blog.naver.com/bettermom_hani/223920378794',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '볼베어파크 롯데몰 은평점: 은평구 구파발 대형 스포츠 테마 키즈카페 / 주말에 아이랑 뭐하지? / 아이와 실내 갈만한곳!',
        ogDescription:
          '#주말에아이랑뭐하지 #은평구키즈카페 #볼베어파크 이번주 주말에 아이랑 뭐하지? 푹푹찌는 무더위 주말에 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA2MjlfMjAw%2FMDAxNzUxMTgwNzUwNjY4.TDcdkUu_a9vAbmGV5kc4RfA8BNTTSG1Q9w4gSiNRvUwg.yF_m_T1YcneUYC83JLpqk1TI9T6YB9q7_3dy1UiokZsg.JPEG%2FIMG%25A3%25DF8146.JPG%23900x900&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-kids-plaza-hwagok',
    name: '서울 키즈플라자 / 서울형 키즈카페 시립 화곡점',
    region: 'seoul',
    subRegion: '강서구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl: 'https://news.seoul.go.kr/welfare/archives/575930',
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%20%ED%82%A4%EC%A6%88%ED%94%8C%EB%9D%BC%EC%9E%90%20%2F%20%EC%84%9C%EC%9A%B8%ED%98%95%20%ED%82%A4%EC%A6%88%EC%B9%B4%ED%8E%98%20%EC%8B%9C%EB%A6%BD%20%ED%99%94%EA%B3%A1%EC%A0%90%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EC%84%9C%EA%B5%AC%20%ED%99%94%EA%B3%A1%EB%8F%99%201172',
    verifiedAt: '2026-05-04',
    lastObservedAt: '2026-05-04',
    verificationStatus: 'official_verified',
    description:
      '서울 키즈플라자 1층에 있는 공공형 대형 실내 놀이터. 대형 미끄럼틀, 집라인, 클라이밍, 영아·유아 구역이 함께 있다.',
    address: '서울특별시 강서구 화곡동 1172',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'public',
    externalBlogLinks: [
      {
        title:
          '[강서/화곡] "여기가 진짜 시립이라고?" 역대급 대형 미끄럼틀과 쾌적함! 서울형 키즈카페 시립 화곡점 완벽 후기',
        href: 'https://blog.naver.com/togetherwithyou-/224184113124',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[강서/화곡] "여기가 진짜 시립이라고?" 역대급 대형 미끄럼틀과 쾌적함! 서울형 키즈카페 시립 화곡점 완벽 후기',
        ogDescription:
          '시작은 편안하게: 스트레스 없는 넓은 주차장 "아이들과의 외출, 시작은 역시 주차죠? 시립 화곡점은 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMTRfMTIz%2FMDAxNzcxMDc2NjcyOTg3.iTt7txTo_lV0jR_UgX_9hQjZIFcSP8C2iCW6NhW6uo8g.Ry7jBxiOWeUGazBsAh36OOERTxp5Rghhzs9J6wsDR8og.JPEG%2FKakaoTalk_20260214_220835577.jpg%233000x2250&type=ff192_192',
      },
      {
        title: '서울형 키즈카페 시립 화곡점 다녀온 솔직 후기',
        href: 'https://blog.naver.com/yj_9214/224268969113',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 키즈카페 시립 화곡점 다녀온 솔직 후기',
        ogDescription:
          '아이랑 주말에 어디 갈까 고민하다가 다녀온 서울형 키즈카페 시립 화곡점! 결론부터 말하면, 지금까지 5~6...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjlfMTQy%2FMDAxNzc3NDM4MDAwOTAx.SQw9kI4lIqxS3ZGBkStncRBegw-l-Pf0Z1WQB5AwGAgg.SO_3W9oJiBfEqUY2xoq69w7nUD7N0X8rFSdyFN_kgJMg.JPEG%2F900_1777438000068.jpg%23900x1162&type=ff192_192',
      },
      {
        title: '서울형키즈카페 시립화곡점 6세이용후기 초등학생가능',
        href: 'https://blog.naver.com/yellow923/224260937118',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 시립화곡점 6세이용후기 초등학생가능',
        ogDescription:
          '서울형키즈카페 시립화곡점 6세 이용후기 초등학생 가능 서울형 키즈카페를 종종 이용하고 있는데, 이번에...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjJfMjcw%2FMDAxNzc2ODE5Mzc2NDg5.I02ShSYXKtIFyMnimKWNFnmI1wrPGeFRXovWz4l9UAcg.WyRKtiE2yOrOErTQOWfdhVMKAckY-l400WXQOHxriWMg.JPEG%2FIMG%25A3%25DF0141.JPG%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-monster-park-sindorim',
    name: '몬스터파크 신도림점',
    region: 'seoul',
    subRegion: '구로구',
    category: 'kids-cafe',
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'semi-official',
    sourceUrl: 'https://my.homeplus.co.kr/store/store_detail?storId=813',
    naverMapUrl:
      'https://map.naver.com/p/search/%EB%AA%AC%EC%8A%A4%ED%84%B0%ED%8C%8C%ED%81%AC%20%EC%8B%A0%EB%8F%84%EB%A6%BC%EC%A0%90%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B5%AC%EB%A1%9C%EA%B5%AC%20%EA%B2%BD%EC%9D%B8%EB%A1%9C%20661%20%ED%99%88%ED%94%8C%EB%9F%AC%EC%8A%A4%20%EC%8B%A0%EB%8F%84%EB%A6%BC%EC%A0%90%20%EC%A7%80%ED%95%981%EC%B8%B5',
    verifiedAt: '2026-05-06',
    lastObservedAt: '2026-05-06',
    verificationStatus: 'semi_verified',
    description:
      '시간 무제한형 실내 테마파크 콘셉트의 대형 키즈카페 후보. 브랜드 공식 페이지와 로컬 운영 신호를 함께 확인했다.',
    address: '서울특별시 구로구 경인로 661 홈플러스 신도림점 지하1층',
    rainFriendly: true,
    stayMinutes: 180,
    operatorType: 'commercial',
    editorNote:
      '홈플러스 공식 점포 페이지에서 임대매장명을 확인했다. 세부 요금과 휴무는 방문 전 재확인 필요.',
    externalBlogLinks: [
      {
        title:
          '오늘은, 신도림 키즈카페 추천 💥몬스터파크 신도림점 후기 (요금/주차/꿀팁 총정리)',
        href: 'https://blog.naver.com/mommood_/223949633057',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '오늘은, 신도림 키즈카페 추천 💥몬스터파크 신도림점 후기 (요금/주차/꿀팁 총정리)',
        ogDescription:
          '대부분 초등학교, 유치원 방학이 시작되었죠! 저희집 아이들도 이번주 풀방학이라.. 오늘은 하루종일 에너...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA3MjhfNjIg%2FMDAxNzUzNjY5ODk1MzU1.0eWgJALf11m6jCzM9peVr0_t0SGpCpbOzfIuXRL_qiIg.hOQr1y5UHcnimPXNWQK5xbzoQVgUflXqrxOIiBWoAScg.JPEG%2Foutput%25A3%25DF2707613624.jpg%23900x676&type=ff192_192',
      },
      {
        title: '땀 뻘뻘 흘리는💦 신도림 대형키즈카페 몬스터파크 신도림점',
        href: 'https://blog.naver.com/findsomething/224217871108',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '땀 뻘뻘 흘리는💦 신도림 대형키즈카페 몬스터파크 신도림점',
        ogDescription:
          '안녕하세요. 2월 중~말 정도에 방문했던 신도림 대형키즈카페 몬스터파크 신도림점에 대해 포스팅합니다. (...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTBfMjIx%2FMDAxNzczMTE4Mjc1MjA2.x6E9IfX0pIqmifjeOPumsAUvPoYQEDzhH7xYNqBosR8g.PGBRpPh73d-BjpsYsXIRRU6_n5B6Rq6YL3vFR24BFk8g.JPEG%2F900%25A3%25DF20260217%25A3%25DF144359.jpg%23900x675&type=ff192_192',
      },
      {
        title:
          '아이랑 갈만한곳 서울대형키즈카페 몬스터파크 신도림점 주차 내돈내놀 후기',
        href: 'https://blog.naver.com/vkfvkf2121/224248932481',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '아이랑 갈만한곳 서울대형키즈카페 몬스터파크 신도림점 주차 내돈내놀 후기',
        ogDescription:
          '서울특별시 구로구 몬스터파크 신도림점 찾아가는 길 🚘 서울특별시 구로구 경인로 661 홈플러스 신도림...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjFfMjYx%2FMDAxNzc2NzQxMzA1NjI4.IaffLuaLMe87XmO7MZqM0D79FwuQNwbU0c7RBp93eJEg.zObHmTFpSBrswPai-iuuk5h0I4CdzEkHdwkZn16FgWMg.PNG%2F900_%25B0%25A5%25BB%25F6_%25BA%25A3%25C0%25CC%25C1%25F6%25BB%25F6_%25BB%25A7%25C1%25FD_%25BA%25A3%25C0%25CC%25C4%25BF%25B8%25AE_%25B8%25C0%25C1%25FD_%25BF%25A9%25C7%25E0_%25C0%25CE%25BD%25BA%25C5%25B8%25B1%25D7%25B7%25A5_%25C6%25F7%25BD%25BA%25C6%25AE_20260421_121453_0000.png%23900x900&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-kidzania-seoul',
    name: '키자니아 서울',
    region: 'seoul',
    subRegion: '송파구',
    category: 'experience',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://www.kidzania.co.kr/',
    naverMapUrl:
      'https://map.naver.com/p/search/%ED%82%A4%EC%9E%90%EB%8B%88%EC%95%84%20%EC%84%9C%EC%9A%B8%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%86%A1%ED%8C%8C%EA%B5%AC%20%EC%98%AC%EB%A6%BC%ED%94%BD%EB%A1%9C%20240',
    verifiedAt: '2026-05-04',
    lastObservedAt: '2026-05-04',
    verificationStatus: 'official_verified',
    description:
      '아이들이 도시 속 직업을 체험하는 실내 직업체험 테마파크. 키즈카페보다는 체험형 테마시설에 가깝지만, 비 오는 날 장시간 머무르기 좋다.',
    address: '서울특별시 송파구 올림픽로 240',
    priceInfo: '유료 / 반일권·종일권 등 공식 예매 기준 변동',
    rainFriendly: true,
    stayMinutes: 240,
    operatorType: 'commercial',
    editorNote:
      '직업체험형 대체 후보. 이용권, 회차, 연령 기준은 공식 예매 화면에서 최종 확인해야 한다.',
    externalBlogLinks: [
      {
        title:
          '초등학생이 된 기념으로 다녀온 키자니아 서울 후기(첫 방문에 꼭 알아야할 팁)',
        href: 'https://blog.naver.com/jjiiaaee614425/224223979234',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '초등학생이 된 기념으로 다녀온 키자니아 서울 후기(첫 방문에 꼭 알아야할 팁)',
        ogDescription:
          '키자니아 서울 📍위치: 서울 송파구 올림픽로 240 키자니아 서울 ✅이용안내: 키자니아 홈페이지 참고 ?...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMjBfMTgx%2FMDAxNzc0MDExMjEzOTQw.HrjZKJlacar7aDoUJfaQvTAbeio5SCH-Ch52x5QjNbkg.5P2MZ9em8JAVoxzOx7cPOoK0x092o3P_sRpYa7WaMMcg.JPEG%2FIMG%25A3%25DF9228.JPG%23900x1020&type=ff192_192',
      },
      {
        title:
          '5살 키자니아 서울 아이랑 가볼만한곳 주말 반일권 7개 체험 후기 타임티켓 꿀팁 장단점',
        href: 'https://blog.naver.com/v0_0v-/224253258932',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle:
          '5살 키자니아 서울 아이랑 가볼만한곳 주말 반일권 7개 체험 후기 타임티켓 꿀팁 장단점',
        ogDescription:
          '서울 아이랑 가볼만한곳 키자니아 서울 📍주소 : 서울 송파구 올림픽로 240 키자니아 서울 📍전화번호 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MTVfMjAw%2FMDAxNzc2MjI1OTI3OTI2.Ry9StUWrOMYWzo-P6VEg6n9lEqVGpNoPtQdw2ipg_7kg.cBYxFsYmz0aWi_U_KVq8UmTUYuCpCBTC6Sp_jeLjVdUg.JPEG%2FIMG%25A3%25DF4375.jpg%23900x1200&type=ff192_192',
      },
      {
        title:
          '키자니아 서울 평일 오후권 타임티켓 할인 꿀팁 & 7세 아이 체험 후기',
        href: 'https://blog.naver.com/bluebjhj/224182583419',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle:
          '키자니아 서울 평일 오후권 타임티켓 할인 꿀팁 & 7세 아이 체험 후기',
        ogDescription:
          '키자니아 서울 평일 오후권 타임 티켓 할인 꿀팁 7세 아이 체험 후기 안녕하세요 😄 4살 터울 자매 육아 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMTNfMTky%2FMDAxNzcwOTQxNjMyNDA2.aqcRp0n0VW3k6Fv014YN2mkHWngYg76A450YRE_4zK4g.CCj1jcv9rPIukg6g6ghpvmBazwyeZ3CsAMh3P-zy0Fwg.PNG%2F900%25A3%25DF%25B1%25D7%25B7%25B9%25C0%25CC_%25BD%25C9%25C7%25C3%25C7%25D1_%25B1%25D7%25B8%25AE%25B5%25E5_%25B9%25E8%25B0%25E6_%25BA%25ED%25B7%25CE%25B1%25D7_%25BD%25E6%25B3%25D7%25C0%25CF_%25C0%25CE%25BD%25BA%25C5%25B8%25B1%25D7%25B7%25A5_%25C6%25F7%25BD%25BA%25C6%25AE%25A3%25DF20260213%25A3%25DF091043%25A3%25DF0000.png%23900x900&type=f250_208',
      },
    ],
  },
  {
    id: 'seoul-pororo-park-yeongdeungpo',
    name: '뽀로로파크 영등포점',
    region: 'seoul',
    subRegion: '영등포구',
    category: 'kids-cafe',
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://www.pororopark.com/information/serviceHours.php',
    naverMapUrl:
      'https://map.naver.com/p/search/%EB%BD%80%EB%A1%9C%EB%A1%9C%ED%8C%8C%ED%81%AC%20%EC%98%81%EB%93%B1%ED%8F%AC%EC%A0%90%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC%20%EC%98%81%EC%A4%91%EB%A1%9C%2015',
    verifiedAt: '2026-05-04',
    lastObservedAt: '2026-05-04',
    verificationStatus: 'official_verified',
    description:
      '뽀로로 캐릭터 세계관을 기반으로 한 캐릭터형 키즈파크. 미취학 아이와 실내에서 오래 머물기 좋은 테마형 키즈카페 후보다.',
    address: '서울특별시 영등포구 영중로 15',
    priceInfo: '유료 / 지점·시즌별 변동',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'commercial',
    editorNote:
      '공식 이용시간 페이지에서 지점 운영 여부를 확인했다. 요금과 주차 지원은 발행 전 최신 예매 화면으로 재확인 필요.',
    externalBlogLinks: [
      {
        title: '22개월아기랑주말 뽀로로파크 영등포점 후기(+할인꿀팁)',
        href: 'https://blog.naver.com/rommyu/224213395884',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '22개월아기랑주말 뽀로로파크 영등포점 후기(+할인꿀팁)',
        ogDescription:
          '📍뽀로로파크 롯데마트맥스 영등포점 ✔️운영시간 : 11-19시 (매달 2,4번째 일요일 정기휴무) ✔️전화...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMDlfMjE1%2FMDAxNzczMDEwODYxMTI2.M_TErT_5gJggCRtiHIobFkd1NOe47BZI7WElRizfb64g.KxtPuafa9J8Dyy1MKYvlGFG7I6jdzVsI_KC4uoqk2Gkg.JPEG%2FIMG%25A3%25DF2998.jpg%23900x1200&type=ff192_192',
      },
      {
        title: '아기랑 실내데이트 ,뽀로로파크 영등포점 다녀온 솔직후기',
        href: 'https://blog.naver.com/jyj899/224201699151',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '아기랑 실내데이트 ,뽀로로파크 영등포점 다녀온 솔직후기',
        ogDescription:
          '뽀로로파크 영등포점 📍 위치 & 주차 주차도 건물 주차장 이용하면 돼서 편하고 4시간 주차 가능 해...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMDJfMjQx%2FMDAxNzcyNDUzNDc2MjMz.VXON-u8b_tkg7_LGPs1EH6kAVICCZ2j_BgzVCCCXGGQg.OWaIZXVn74u-S_9I7s233y38_X-u6rgq674L3Sy-ETog.JPEG%2Foutput%25A3%25DF2400026235.jpg%23900x1200&type=f250_208',
      },
      {
        title:
          '[영등포] 뽀로로파크 영등포점 내돈내산 후기 (만원입장권 이벤트구매)',
        href: 'https://blog.naver.com/spring__p/224175504193',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[영등포] 뽀로로파크 영등포점 내돈내산 후기 (만원입장권 이벤트구매)',
        ogDescription:
          '인스타에서 아이들과 가볼곳을 자주 찾는데, 뽀로로파크 만원입장권 이벤트를 한다고 하기에 바로 구매해서...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDdfMTA5%2FMDAxNzcwNDcwNjI4Njg4.qkfIwFdpT6sfo82SXsjpToxSKo_IW9W9EUhHz5QLfyAg.DS_IpLYHMykVVV3YL7nkwddzRMBRfjf2unvFpMKdLc4g.JPEG%2Foutput%25A3%25DF483675421.jpg%23900x900&type=ff192_192',
      },
    ],
  },
  {
    id: 'national-children-museum',
    name: '국립어린이박물관',
    region: 'seoul',
    subRegion: '용산구',
    category: 'museum',
    ageBands: ['0-12m', '1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://www.museum.go.kr/site/child/home',
    naverMapUrl: 'https://map.naver.com/p/entry/place/12207484',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'official_verified',
    description:
      '아이들이 직접 만지고 체험하는 어린이 전용 박물관. 0~12세 대상 다양한 체험 공간.',
    address: '서울 용산구 서빙고로 137 (국립중앙박물관 내)',
    operatingHours: '10:00-18:00 (월요일 휴관)',
    priceInfo: '어린이 2,000원, 성인 1,000원',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: true,
    stayMinutes: 90,
    operatorType: 'public',
    editorNote: '사전 예약 필수. 주말은 특히 빠르게 마감됨',
    thumbnailImage: '/images/places/national-children-museum.webp',
  },
  {
    id: 'national-folk-museum',
    name: '국립민속박물관',
    region: 'seoul',
    subRegion: '종로구',
    category: 'museum',
    ageBands: ['1-3y', '3-6y', '6-10y', 'all'],
    indoorOutdoor: 'both',
    seasons: ['all-season'],
    priceType: 'free',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl: 'https://www.nfm.go.kr/kids/nfmkid/index.do',
    naverMapUrl: 'https://map.naver.com/p/entry/place/11620599',
    verifiedAt: '2026-04-06',
    lastObservedAt: '2026-04-06',
    verificationStatus: 'official_verified',
    description:
      '경복궁 내에 위치한 국립 민속박물관. 어린이박물관은 무료 예약제로 운영돼 저연령 아이와 함께 들르기 좋다.',
    address: '서울 종로구 삼청로 37',
    operatingHours: '09:00-18:00 / 어린이박물관 09:30-16:50',
    priceInfo: '본관 무료 / 어린이박물관 무료',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: true,
    stayMinutes: 90,
    operatorType: 'public',
    editorNote:
      '어린이박물관은 1일 1회 온라인 예약제로 운영된다. 경복궁 동선과 함께 묶기 좋다.',
    thumbnailImage: '/images/places/national-folk-museum.webp',
    externalBlogLinks: [
      {
        title:
          '서울 종로 놀거리 국립민속박물관 추천 입장료 0원 끝판왕 카페 굿즈 주차 찐후기',
        href: 'https://blog.naver.com/julie_kim_/224272328868',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울 종로 놀거리 국립민속박물관 추천 입장료 0원 끝판왕 카페 굿즈 주차 찐후기',
        ogDescription:
          '안녕하세요. 여행블로거 리아에요. 서울 실내 가볼만한곳 국립민속박물관은 서울 종로 경복궁 안에 위치해 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjlfMjU3%2FMDAxNzc3NDQ3NzYwOTYz.72hYPtMr7LNi-qh_gIoXvNWqnPXUk5xRkSzf6W-lmeQg.cPek8YiL1uMHrSpG4D_p142e9rLyXuI1wJbM_pKU60Yg.PNG%2F%25BC%25AD%25BF%25EF_%25B8%25C0%25C1%25FD_%25B9%25AE%25C8%25AD_%25BC%25EE%25C7%25CE_%25B5%25EE-003_%25282%2529.png%23800x800&type=ff192_192',
      },
      {
        title:
          '(서울 종로) 예약없이 누구나 무료로 즐기는 추억의 거리 국립민속박물관 관람정보와 주차',
        href: 'https://blog.naver.com/jangdy02/224235184829',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '(서울 종로) 예약없이 누구나 무료로 즐기는 추억의 거리 국립민속박물관 관람정보와 주차',
        ogDescription:
          '국립현대미술관 맞은편에 있어 내가 즐겨 가는 곳, 예약 없이 누구나 무료로 즐길 수 있는 특별한 공간, 국...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMzBfMTk0%2FMDAxNzc0ODQ2NzY0OTMz.mD6KLoQFes1izOPYCVr7lUzQ_vd354iNlaG58UifQ00g.RnV5Z1CaWC7Enn8f2g_0iYeGtgB4a1T05rr2QoMhdiwg.PNG%2F%25C1%25A6%25B8%25F1%25C0%25BB-%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4_-001_%25284%2529.png%23960x540&type=ff192_192',
      },
      {
        title:
          '서울 아기랑 가기 좋은 곳 국립민속박물관 어린이박물관 후기 예약방법 전시 총정리 25개월 아기랑 문화생활',
        href: 'https://blog.naver.com/chaessay/224256764859',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울 아기랑 가기 좋은 곳 국립민속박물관 어린이박물관 후기 예약방법 전시 총정리 25개월 아기랑 문화생활',
        ogDescription:
          '서울 무료 실내 나들이 국립민속박물관 어린이박물관 첫 방문 ⓒ 글 사진 / 에세희 요즘 25개월 아기랑 어...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MThfMTE0%2FMDAxNzc2NDg5NzI1NjM3.VziLt-r8ixu4nEuzje_NQ6Jb-dImzPjg2mbIUmMquoIg.efIYYsPTFxTyVvoCQtB5jUMDdPfLxrDTXwpA2Qj6ypog.JPEG%2FC55E028C%25A3%25ADB847%25A3%25AD48A2%25A3%25AD8B62%25A3%25ADABC435F60236.jpg%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'national-science-museum-gwacheon',
    name: '국립과천과학관',
    region: 'seoul',
    subRegion: '관악구',
    category: 'museum',
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'both',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: true,
    sourceType: 'official',
    sourceUrl:
      'https://www.sciencecenter.go.kr/scipia/display/mainBuilding/kidsPlayground',
    naverMapUrl: 'https://map.naver.com/p/entry/place/12965666',
    verifiedAt: '2026-04-06',
    lastObservedAt: '2026-04-06',
    verificationStatus: 'official_verified',
    description:
      '과학 체험과 천문 관측이 가능한 국립 과학관. 유아체험관은 사전 예약으로 운영돼 미취학 아이와 함께 가기 좋다.',
    address: '경기 과천시 상하벌로 110',
    operatingHours: '09:30-17:30 (월요일 휴관, 유아체험관 회차 운영)',
    priceInfo: '상설전시 유료 / 유아체험관 미취학아동 무료',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: true,
    stayMinutes: 150,
    operatorType: 'public',
    editorNote:
      '유아체험관은 사전 예약 후 이용하는 편이 안전하다. 과천 위치지만 서울 생활권 나들이로 묶기 쉽다.',
    thumbnailImage: '/images/places/national-science-museum-gwacheon.webp',
    externalBlogLinks: [
      {
        title:
          '겨울 3살 아기랑 국립과천과학관 유아체험관 예약 주차 점심 찐후기',
        href: 'https://blog.naver.com/glowflylight/224180559250',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '겨울 3살 아기랑 국립과천과학관 유아체험관 예약 주차 점심 찐후기',
        ogDescription:
          '와 과천에 3살 아이랑 이렇게 놀기 좋은 국립 시설이 있었다는거 아셨나요? 주차장 완비에 요금도 저렴한 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMzBfMjI2%2FMDAxNzY3MDc1NDQxNTU5.Gfq5n9vf7gA6ixER3OPQKjSTfP1wjWgb3ti3VVePf6Ug.9mWeoH7-Mqiyop4vOUxfnZrBXIsEU9zGUtIAWHGaZFsg.JPEG%2F900%25A3%25DF20251213%25A3%25DF133444.jpg%23900x507&type=ff192_192',
      },
      {
        title:
          '아이와 주말 나들이 끝판왕! 국립과천과학관 200% 즐기기 (예약 꿀팁 & 명당 추천)',
        href: 'https://blog.naver.com/sangmin0729/224267154144',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle:
          '아이와 주말 나들이 끝판왕! 국립과천과학관 200% 즐기기 (예약 꿀팁 & 명당 추천)',
        ogDescription:
          "안녕하세요! 오늘은 아들과 함께 다녀온 '국립과천과학관' 방문 후기를 들고 왔습니다. 워낙 규모가 커서...",
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjdfMjMz%2FMDAxNzc3MjgzMjg2Mzcw.8zs4B5HDA9gZYw0tCs-zT7AYZS7Dp21ZYyv16WkbK60g.zpMPIohxhQ5-TFLT0n34rdRXB82T58Z6572xKhwTmlgg.JPEG%2F20260419_101858.jpg%234000x2252&type=ff192_192',
      },
      {
        title: '국립과천과학관 2층리뉴얼 유아체험관 예약 야외전시 주차',
        href: 'https://blog.naver.com/jisoos8576/224163969225',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '국립과천과학관 2층리뉴얼 유아체험관 예약 야외전시 주차',
        ogDescription:
          '국립과천과학관 주말에 랑이와 국립과천과학관에 다녀왔어요! 원래 과천과학관은 주차입구에서 선불이었는...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMjlfMzAw%2FMDAxNzY5NjU4NjIxMzQ2.2qr8Kg5HTzu4042M6nowORf_RLB0Cpt__UEGEKsQx7cg.qQR5JS3JSw0nKeRa2cujSJw1qtSRevL5lmS5zZpeWbIg.PNG%2F1769658602.733883%25A3%25AD223688AC%25A3%25AD3BC0%25A3%25AD48AC%25A3%25ADB5B1%25A3%25ADF1614941ED48.png%23900x900&type=ff192_192',
      },
    ],
  },
  {
    id: 'seodaemun-nature-history-museum',
    name: '서대문자연사박물관',
    region: 'seoul',
    subRegion: '서대문구',
    category: 'museum',
    themes: ['animal'],
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: false,
    parking: false,
    sourceType: 'official',
    sourceUrl: 'https://namu.sdm.go.kr/',
    naverMapUrl: 'https://map.naver.com/p/entry/place/11620547',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'official_verified',
    description:
      '공룡 화석과 자연사 표본이 풍부한 구립 박물관. 아이들이 좋아하는 공룡 전시 상설 운영.',
    address: '서울 서대문구 연세로5나길 45',
    operatingHours: '09:00-18:00 (월요일 휴관)',
    priceInfo: '어린이 700원, 청소년 1,000원, 성인 3,000원',
    feedingRoom: false,
    strollerFriendly: true,
    rainFriendly: true,
    stayMinutes: 90,
    operatorType: 'public',
    editorNote: '공룡을 좋아하는 아이들에게 강력 추천',
    thumbnailImage: '/images/places/seodaemun-nature-history-museum.webp',
    externalBlogLinks: [
      {
        title:
          '[서울나들이] 서울공룡박물관 서대문자연사박물관 30개월 아이 후기 (공룡박물관 주차정보, 유모차 대여정보 포함)',
        href: 'https://blog.naver.com/dbwjddus1004/224276402662',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle:
          '[서울나들이] 서울공룡박물관 서대문자연사박물관 30개월 아이 후기 (공룡박물관 주차정보, 유모차 대여정보 포함)',
        ogDescription:
          "안녕하세요! 띵똥맘입니다! 아이와 함께하는 나들이 장소를 정할 때 가장 먼저 고려하는 것이 '아이의...",
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA1MDZfMTg3%2FMDAxNzc4MDQwMTgzOTU0.IHdu0oW54bN0pr3HkklLL6yeX25BfuNxKZdGjhENeA8g.O0610omls0yiotA1YW6hn6vrfpbV7qram-k9Z7qrRFUg.PNG%2Fimage.png%231400x1050&type=ff192_192',
      },
      {
        title: '서대문자연사박물관 예약없이 공룡 보러 아기랑 다녀온 주차 꿀팁',
        href: 'https://blog.naver.com/happyhj25/224212207974',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서대문자연사박물관 예약없이 공룡 보러 아기랑 다녀온 주차 꿀팁',
        ogDescription:
          '서대문자연사박물관 예약 없이 아기랑 공룡 보러 다녀온 주차 꿀팁과 생생한 후기예요. 웅장한 공룡 뼈부터...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMDlfNTIg%2FMDAxNzczMDI5MjI3MzEx.GWIVGEFC8Sz-PZYl7brr3LvKhcf_8o-l0_QNDR32BUsg.L5pwRcdQ2KA4TZVT2n_W7uSErCExPZzCagWkk7L7XiUg.JPEG%2FIMG%25A3%25DF4232.jpg%23900x676&type=ff192_192',
      },
      {
        title: '서울 서대문자연사박물관 주말 나들이 유모차 주차 팁',
        href: 'https://blog.naver.com/annyeong8877/224201469805',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle: '서울 서대문자연사박물관 주말 나들이 유모차 주차 팁',
        ogDescription:
          '서울 아이랑 가볼만한 곳 및 실내 전시 서대문자연사박물관 안녕하세요. 남매와 세상을 탐험하는 엄마 고흐...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMDJfMjQg%2FMDAxNzcyNDM4ODI1NDM5.BK2ZZ-SC7RvkMJMCX6el9PEBxDyVcabCWeISpD6cj1gg.lkmWZmElFPazjN63HsfP2sfWom0McWb4NX3z62Mshmcg.JPEG%2F%25BA%25ED%25B7%25CE%25B1%25D7_%25C0%25CC%25B9%25CC%25C1%25F6_2_%25BA%25B9%25BB%25E7.jpg%23900x540&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-botanic-park',
    name: '서울식물원',
    region: 'seoul',
    subRegion: '강서구',
    category: 'park',
    ageBands: ['1-3y', '3-6y', '6-10y', 'all'],
    indoorOutdoor: 'both',
    seasons: ['all-season', 'spring', 'fall'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://botanicpark.seoul.go.kr/',
    naverMapUrl: 'https://map.naver.com/p/entry/place/1932878505',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'official_verified',
    description:
      '온실과 야외 정원이 함께 있는 도시형 식물원. 아이들이 자연을 가까이 접할 수 있는 공간.',
    address: '서울 강서구 마곡동로 161',
    operatingHours: '09:30-18:00 (월요일 휴관, 계절별 연장)',
    priceInfo: '어린이 1,000원, 성인 5,000원',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'public',
    editorNote: '온실이 있어 우천에도 가능. 봄·가을 시즌 추천',
    thumbnailImage: '/images/places/seoul-botanic-park.webp',
    externalBlogLinks: [
      {
        title:
          '아기랑 가볼만한곳 마곡 서울식물원 ㅣ 튤립스팟 2곳, 주차 및 온실 구경 후기',
        href: 'https://blog.naver.com/hj_guriming/224257999783',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '아기랑 가볼만한곳 마곡 서울식물원 ㅣ 튤립스팟 2곳, 주차 및 온실 구경 후기',
        ogDescription:
          '튤립 만개해서 넘 이쁜 서울식물원 26년 4월 19일, 일요일에 다녀온 서울식물원! 벌써 튤립이 다 만개했다...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MTlfOTgg%2FMDAxNzc2NjA1MDkwOTY5.hGnLTDbLbTIXjI7n8lxPpkyjemrqj_6In49SOZpcaVog.WuOhXq_CfekxUTf1xL9jBfLhBYkfeRQDLVrTzj8NZdIg.PNG%2F%25C1%25A6%25B8%25F1%25C0%25BB_%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4..png%232160x2160&type=ff192_192',
      },
      {
        title:
          '아기랑 실내 갈만한곳 마곡 [서울식물원] 주말 방문 후기, 호수공원 산책 (4세)',
        href: 'https://blog.naver.com/jaayeoni/224230146949',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 머문 동선과 현장 분위기를 참고하기 좋은 후기입니다.',
        ogTitle:
          '아기랑 실내 갈만한곳 마곡 [서울식물원] 주말 방문 후기, 호수공원 산책 (4세)',
        ogDescription:
          '#서울식물원 #서울식물원호수공원 #서울나들이 미세먼지 많고 흐린 주말, 답답한 도심 속에서 초록빛 힐링...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMjZfMTgz%2FMDAxNzc0NDk1MTk2MTA5.dxH8-XIHyxRBxA-_EPbQbA-b9Mdm14XIlMhl5hx8fr4g.uo8W5DbmKlB7HKqIZfk1FCpwWRoWt8UVO4DQ99aU-kYg.JPEG%2FIMG%25A3%25DF0187.JPG%23900x1200&type=ff192_192',
      },
      {
        title:
          '서울식물원 주제원 모네 전시 후기ㅣ서울 데이트 아이와 가볼만한곳',
        href: 'https://blog.naver.com/h_h06/224272882620',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 머문 동선과 현장 분위기를 참고하기 좋은 후기입니다.',
        ogTitle:
          '서울식물원 주제원 모네 전시 후기ㅣ서울 데이트 아이와 가볼만한곳',
        ogDescription:
          "안녕하세요:) 최근 다녀온 서울식물원의 핫한 스팟 장소인 주제원 '모네가 사랑한 식물'에 다녀...",
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA1MDNfNTgg%2FMDAxNzc3NzM0OTc3NTUy.fzyJeO2f75-NEiuL6UnrC13ogQCYK_EZXY526X4Dsb0g.R077SIxDIdrsi3A13mQjUV-wz2K3_NrhrZWFIBKQxn8g.JPEG%2Foutput%25A3%25DF2767040328.jpg%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-children-grand-park',
    name: '서울어린이대공원',
    region: 'seoul',
    subRegion: '광진구',
    category: 'park',
    themes: ['animal'],
    ageBands: ['1-3y', '3-6y', '6-10y', 'all'],
    indoorOutdoor: 'both',
    seasons: ['all-season', 'spring', 'fall'],
    priceType: 'free',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://www.sisul.or.kr/open_content/childrenpark/',
    naverMapUrl: 'https://map.naver.com/p/entry/place/11796387',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'official_verified',
    description:
      '동물원, 식물원, 놀이공원이 함께 있는 서울 대표 어린이 공원. 무료 입장.',
    address: '서울 광진구 능동로 216',
    operatingHours: '05:00-22:00 (연중무휴, 일부 시설 별도 운영)',
    priceInfo: '공원 무료, 놀이 기구 유료',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: false,
    stayMinutes: 180,
    operatorType: 'public',
    editorNote: '무료 공연과 계절 행사가 자주 열림',
    thumbnailImage: '/images/places/seoul-children-grand-park.webp',
    externalBlogLinks: [
      {
        title:
          '서울 가볼만한 곳 서울어린이대공원 동물원 놀이공원 주차 꿀팁 입장료 할인 피크닉 놀거리',
        href: 'https://blog.naver.com/syeon_75/224254134212',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울 가볼만한 곳 서울어린이대공원 동물원 놀이공원 주차 꿀팁 입장료 할인 피크닉 놀거리',
        ogDescription:
          '오늘은 지난주 주말에 다녀온 서울 광진구에 위치한 서울어린이대공원의 동물원과 놀이공원을 다녀온 후기...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MTZfMjI2%2FMDAxNzc2MzAwNTA2MzU0.JRc_D4iI8BMu2vn8mxpq3sxBo3lI7FhWZQttJqcz1Hsg.oYALkm1By8PGTLrlz-WkKeEA1B02fV2WxUs6IbmBpqYg.JPEG%2FIMG%25A3%25DF7634.jpg%23900x900&type=ff192_192',
      },
      {
        title:
          '서울어린이대공원 동물원 후기 주차 꿀팁, 서울 아이랑 가볼만한곳 추천',
        href: 'https://blog.naver.com/sla_la/224260164963',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 머문 동선과 현장 분위기를 참고하기 좋은 후기입니다.',
        ogTitle:
          '서울어린이대공원 동물원 후기 주차 꿀팁, 서울 아이랑 가볼만한곳 추천',
        ogDescription:
          '서울어린이대공원 동물원 후기 주차 꿀팁 서울 아이랑 가볼만한곳 추천 안녕하세요, 데이스라에요:) 주말마...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjFfMTQ0%2FMDAxNzc2NzUyNDI0MjI3.CedvDt-NjD4uMIkBFVOFjEtBxEuUE-rGHrKqpAXxKzQg.x3wEfwxhvu22FgzdGX9sAd33gtKEGsaWFWmHIgQCLSEg.JPEG%2FIMG%25A3%25DF0769.jpg%23967x967&type=ff192_192',
      },
      {
        title: '아이랑 나들이 고민 끝, 서울어린이대공원 놀이공원 리얼 후기',
        href: 'https://blog.naver.com/ehreo55/224272008513',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 머문 동선과 현장 분위기를 참고하기 좋은 후기입니다.',
        ogTitle: '아이랑 나들이 고민 끝, 서울어린이대공원 놀이공원 리얼 후기',
        ogDescription:
          '안녕하세요😄 아이랑 어디 갈지 고민이라면? 솔직히 여기 한 번 가보면 또 가게 됩니다ㅎㅎ 오늘은 서울...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA1MDFfMjYg%2FMDAxNzc3NjQyMzc4NDA5.tt-DiJVgbWc_xNBUzKacIksLbghDrJ4je5h_M7stpLgg.KMo9d89fcgOR7SkhnLA8BaujGRYNwOPY0a3-VLOP4UYg.JPEG%2FIMG%25A3%25DF1522.jpg%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-kids-book-museum',
    name: '서울특별시교육청 어린이도서관',
    region: 'seoul',
    subRegion: '종로구',
    category: 'library',
    ageBands: ['0-12m', '1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'free',
    reservationRequired: false,
    parking: false,
    sourceType: 'official',
    sourceUrl: 'https://childlib.sen.go.kr/',
    naverMapUrl: 'https://map.naver.com/p/entry/place/11591190',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'official_verified',
    description:
      '어린이를 위한 전용 공공 도서관. 다양한 독서 프로그램과 공간 운영.',
    address: '서울 종로구 사직로9길 7 (사직동 1-28)',
    operatingHours: '09:00-18:00 (월요일 휴관)',
    priceInfo: '무료',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
  },
  {
    id: 'seoul-national-museum-of-korea',
    name: '국립중앙박물관',
    region: 'seoul',
    subRegion: '용산구',
    category: 'museum',
    ageBands: ['1-3y', '3-6y', '6-10y', 'all'],
    indoorOutdoor: 'both',
    seasons: ['all-season'],
    priceType: 'free',
    reservationRequired: true,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://www.museum.go.kr/CHILD/main/index.do',
    naverMapUrl: 'https://map.naver.com/p/entry/place/11620570',
    verifiedAt: '2026-04-06',
    lastObservedAt: '2026-04-06',
    verificationStatus: 'official_verified',
    description:
      '국내 최대 규모의 국립박물관. 어린이박물관은 무료 예약제로 운영돼 체험형 관람 동선을 짜기 좋다.',
    address: '서울 용산구 서빙고로 137',
    operatingHours:
      '10:00-18:00 (수·토 21:00까지, 월요일 휴관) / 어린이박물관 09:30-17:20',
    priceInfo: '상설전시 무료 / 어린이박물관 무료 / 특별전 유료',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'public',
    editorNote: '어린이박물관은 온라인 관람예약 후 이용하는 편이 안전하다.',
    thumbnailImage: '/images/places/seoul-national-museum-of-korea.webp',
    externalBlogLinks: [
      {
        title:
          '용산국립중앙박물관 국중박 평일 방문 관람 후기 (지도, 주차, 웨이팅)',
        href: 'https://blog.naver.com/toyouruniverse-/224263872482',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle:
          '용산국립중앙박물관 국중박 평일 방문 관람 후기 (지도, 주차, 웨이팅)',
        ogDescription:
          '용산 국립중앙박물관 평일 관람 후기: 주차 꿀팁부터 외규장각 의궤, 사유의 방까 완벽 코스! 평일 하루 연...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjRfNTAg%2FMDAxNzc3MDA0OTk2ODM2.muT_e2hME6N5qczy75Ki_YljK0gUWdf8k4YC5FjfBcgg.f7ppIa1gZT6b803UVBnAQmtn1WdQEXvmeWuOq0BUAnEg.JPEG%2FIMG%25A3%25DF0688.jpg%23900x900&type=ff192_192',
      },
      {
        title:
          '국립중앙박물관 어린이박물관 아기랑 방문 후기(예약, 주차 꿀팁), 어린이날 갈만한 곳 추천',
        href: 'https://blog.naver.com/erynn__/224266554440',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '국립중앙박물관 어린이박물관 아기랑 방문 후기(예약, 주차 꿀팁), 어린이날 갈만한 곳 추천',
        ogDescription:
          '안녕하세요:) 지난 주말 국립중앙박물관 어린이박물관을 다녀왔어요. 아기랑 매주 주말 어디갈까 고민중이...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjlfMjAw%2FMDAxNzc3NDQzNzkwNTQ5.mGlAOH5Jq0Lb_pRN3SoS4cvwe0-vipKI8pXL1k_60m8g.H5fRZBcIqB1E6s2p-yBp62x9diOhX3hppIAgxL1wRTsg.JPEG%2FIMG%25A3%25DF2455.jpg%23900x1200&type=ff192_192',
      },
      {
        title: '국립중앙박물관 토요일 오후 방문 후기',
        href: 'https://blog.naver.com/gde_11/224228721635',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle: '국립중앙박물관 토요일 오후 방문 후기',
        ogDescription:
          '국립중앙박물관을 토요일 오후에 다녀왔어요 입장 방법과 토요일 오후 웨이팅, 전시품에 대해 소개해 드릴...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMDFfNzYg%2FMDAxNzcyMzI3MzYxMzAx.8dniiS06jt0q9IDq3d7VbZNKrkkCClYFDfOayjda1lMg.91V5LWcfIUTDCz32EW0kDYVvj_6kdiS1T0ccIBqZ3DEg.JPEG%2F900%25A3%25DF20260228%25A3%25DF141942.jpg%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-nature-ecology-center',
    name: '서울시립과학관',
    region: 'seoul',
    subRegion: '노원구',
    category: 'museum',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'both',
    seasons: ['all-season', 'spring', 'fall'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://science.seoul.go.kr/',
    naverMapUrl: 'https://map.naver.com/p/entry/place/515824798',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'official_verified',
    description:
      '서울시립과학관은 체험과 교육 중심의 과학 박물관. 야외 공원도 함께 이용 가능.',
    address: '서울 노원구 한글비석로 160',
    operatingHours: '09:00-18:00 (월요일 휴관)',
    priceInfo: '어린이 1,000원, 청소년 2,000원, 성인 3,000원',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'public',
    thumbnailImage: '/images/places/seoul-nature-ecology-center.webp',
    externalBlogLinks: [
      {
        title: '노원 아이와 가볼만한 곳 무료 체험 서울시립과학관 주차 후기',
        href: 'https://blog.naver.com/ddangcong82/224222758338',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '노원 아이와 가볼만한 곳 무료 체험 서울시립과학관 주차 후기',
        ogDescription:
          '아이 겨울방학때 다녀온 서울시립과학관! 날씨 걱정없는 실내 체험에 관람료가 무료라서 강추~! 서울시립과...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTlfMTYg%2FMDAxNzczODg1MDI4MDI3.4j8Y1Ftwk2gDki4kRNaRwiq-6cBuCvCdJYHPbi9_wHQg.J0fLSv7Lgkns6R3tg0OLEnjrJ0rh6Xqn1uhUCjIBSxcg.JPEG%2FIMG%25A3%25DF1082.jpg%23900x676&type=ff192_192',
      },
      {
        title: '서울 놀거리 추천 무료 어린이 체험 가능한 노원 서울시립과학관',
        href: 'https://blog.naver.com/bonnyco/224236789922',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울 놀거리 추천 무료 어린이 체험 가능한 노원 서울시립과학관',
        ogDescription:
          '글, 사진 여행 인플루언서 @꼬마유니 아이랑 서울 놀거리 고민하다 노원 서울시립과학관 다녀왔어요. 무료...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MDFfNDIg%2FMDAxNzc1MDEwNjgxNTc1.SmuDGKoehAKl8SRHSUnrYvYmOb4okOoAa2wGPlir3Nog.d1h-IQ6MUwvctmViflPBC9VYSZRMlieCZ4i_3X2PS20g.JPEG%2F20260306_145852.jpg%231952x1952&type=f250_208',
      },
      {
        title:
          '[노원]서울시립과학관 방문후기 /서울 7살 아이랑 가볼만한 곳 (무료) 주중, 주말 프로그램',
        href: 'https://blog.naver.com/cja12345/224220638002',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle:
          '[노원]서울시립과학관 방문후기 /서울 7살 아이랑 가볼만한 곳 (무료) 주중, 주말 프로그램',
        ogDescription:
          '지나가다가 여러 번 "저게 뭐지"하고 보았던 서울시립과학관 꽤 건물이 크고 넓어서 가봐야지.. ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTdfODIg%2FMDAxNzczNzIzNjEwMzY2.AqM81twN93g9LlbFJeuLGsU9Xt-1YnPws6bMKuJlh04g.6ScfL0KPrZZyCkJQLQhHkpNNY7fNr6KhgkXJOja95icg.JPEG%2FIMG%25A3%25DF4548.jpg%23900x676&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-olympic-park-sports',
    name: '올림픽공원',
    region: 'seoul',
    subRegion: '송파구',
    category: 'park',
    ageBands: ['1-3y', '3-6y', '6-10y', 'all'],
    indoorOutdoor: 'outdoor',
    seasons: ['spring', 'fall'],
    priceType: 'free',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://www.kspo.or.kr/kspo/main/main.do',
    naverMapUrl: 'https://map.naver.com/p/entry/place/12268494',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'official_verified',
    description:
      '넓은 잔디밭과 산책로가 있는 서울 대표 공원. 계절별 꽃 축제와 야외 체험 프로그램 운영.',
    address: '서울 송파구 올림픽로 424',
    operatingHours: '05:00-22:00 (연중무휴)',
    priceInfo: '공원 입장 무료, 일부 시설 유료',
    feedingRoom: false,
    strollerFriendly: true,
    rainFriendly: false,
    stayMinutes: 120,
    operatorType: 'public',
    thumbnailImage: '/images/places/seoul-olympic-park-sports.webp',
    externalBlogLinks: [
      {
        title:
          '[송파 아이와 가볼 만한 곳] 올림픽공원 스마트 스포츠 체험관 방문 후기 (꿀잼 보장, 예약, 주차 팁!)',
        href: 'https://blog.naver.com/mint6262/224193849132',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[송파 아이와 가볼 만한 곳] 올림픽공원 스마트 스포츠 체험관 방문 후기 (꿀잼 보장, 예약, 주차 팁!)',
        ogDescription:
          "이웃님 블로그를 구경하다가 '스마트 스포츠 체험관'이라는 곳을 알게 되었어요. 평소에 뛰어놀...",
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMjNfMTQy%2FMDAxNzcxODE1MDYzMjcz.55q0hrFFA6iWsJ5SR8znIN_mXNpJ-D4fzJZQ_HDoYJMg.ryzLu4eqYpmMdtUoTgMHJdw9w0IDxKTDObg0S_xFR2wg.JPEG%2F900%25A3%25DF20260222%25A3%25DF145302.jpg%23900x1200&type=ff192_192',
      },
      {
        title:
          '35개월 아기랑 올림픽공원 자전거 대여 후기(+위치, 주차, 가격 정리)',
        href: 'https://blog.naver.com/suuun_a/224257200068',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '35개월 아기랑 올림픽공원 자전거 대여 후기(+위치, 주차, 가격 정리)',
        ogDescription:
          '날씨가 좋아지면 아이랑 올림픽공원 자전거를 타보고 싶었는데 이번 주말에 드디어 다녀오게 됐다 무려 최...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MThfMTcx%2FMDAxNzc2NTAwNDY5NjAz.88l2bJ1U7savxk_oTPV42VGQxZWORc0_hsg5GgJvfJEg.wA1DTgcPJHtJ1_1RyS7KBT0yogFNvOr2c42aIj7OCnwg.JPEG%2FIMG%25A3%25DF8757.jpg%23900x676&type=f250_208',
      },
      {
        title:
          '올림픽공원 근처 모임 장소 추천, 주차 편하고 구워주는 오발탄 송파점',
        href: 'https://blog.naver.com/inizoo_/224265903880',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '올림픽공원 근처 모임 장소 추천, 주차 편하고 구워주는 오발탄 송파점',
        ogDescription:
          '안녕하세요! 정작가입니다. 오늘은 제가 친구들 모임으로 다녀온 오발탄 송파점 후기를 들고 왔어요. 아니....',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjZfMTMg%2FMDAxNzc3MjA0MTg3Mzk4.BjvADVji8dGf54RZSXbbvcyx2lrYhwQsIbDYHNLqXjIg.rr26lIbEsmYcP3v-Yb3pIJO1J_ojHMzdCfFUpegcf34g.JPEG%2FIMG_9388.jpg%234032x3024&type=f250_208',
      },
    ],
  },
  {
    id: 'seoul-toy-library-mapo',
    name: '마포구 장난감도서관',
    region: 'seoul',
    subRegion: '마포구',
    category: 'library',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'free',
    reservationRequired: false,
    parking: false,
    sourceType: 'official',
    sourceUrl: 'https://www.mapo.go.kr/',
    naverMapUrl: 'https://map.naver.com/p/entry/place/13332819',
    verifiedAt: '2026-04-01',
    lastObservedAt: '2026-04-01',
    verificationStatus: 'semi_verified',
    description: '영유아 대상 장난감 대여 및 놀이 공간. 구민 무료 이용 가능.',
    address: '서울 마포구 마포대로 196',
    operatingHours: '09:00-18:00 (주말·공휴일 휴관)',
    priceInfo: '무료 (회원 등록 필요)',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: true,
    stayMinutes: 90,
    operatorType: 'public',
    editorNote: '각 구마다 장난감도서관이 다름. 거주지 확인 권장',
    externalBlogLinks: [
      {
        title: '[상암 아기랑 갈만한 곳] 서울형키즈카페 마포상암점 이용 후기',
        href: 'https://blog.naver.com/lifebcut/224271575958',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '[상암 아기랑 갈만한 곳] 서울형키즈카페 마포상암점 이용 후기',
        ogDescription:
          '날씨가 애매한 날이었다. 밖에서 오래 놀기엔 부담스럽고, 집에만 있기엔 아이 체력이 남아 있는 그런 날. ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA1MDFfMjc4%2FMDAxNzc3NjE1NDIwMjE2.tmBYz53Rpo8s96ioXmr0IIPVSYpsTqCdlQGflaFub2wg.YVNAqDjQgcQB-0enS535XFEbM5qs_7nEPslfCxgXvGsg.JPEG%2FIMG%25A3%25DF7385.JPG%23900x1200&type=ff192_192',
      },
      {
        title:
          '마포 아기랑 가볼 만한 곳 | 쁘띠몽드 마포중앙도서관점 30개월 키즈카페 후기 (주차·가격)',
        href: 'https://blog.naver.com/ke_aisuying/224196007336',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '마포 아기랑 가볼 만한 곳 | 쁘띠몽드 마포중앙도서관점 30개월 키즈카페 후기 (주차·가격)',
        ogDescription:
          '아이와 오랜만에 키즈카페에 다녀왔어요😊명절 지나고 집콕하며 푹 쉬었는데, 며칠 지나니 아이도 저도 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMjVfOTEg%2FMDAxNzcyMDI3NDkwODU3.gmOKoMWNsRGQ_JqSUCZd-1RL0reWegcbBpCXZVwmgQAg.VBGlnn8D3H55XoSeLBHMx19w9lniXp__h8tCOlO-780g.JPEG%2F900%25A3%25DF%25C1%25A6%25B8%25F1%25C0%25BB%25A3%25AD%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4%25A3%25DF%25A3%25AD001%25A3%25A848%25A3%25A9.jpg%23900x900&type=ff192_192',
      },
      {
        title: '서울 마포 상암 18개월 아기랑 무료실내놀이터 @어깨동무스토리움',
        href: 'https://blog.naver.com/sssongstar/224209682254',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울 마포 상암 18개월 아기랑 무료실내놀이터 @어깨동무스토리움',
        ogDescription:
          '@어깨동무스토리움 서울 마포구 상암 아기랑 갈만한 무료실내놀이터 18개월 아기랑 다녀온 어깨동무스토리...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMDlfMjg1%2FMDAxNzczMDIyMzY0OTAx.VYbwm90AAM6dk8VFxpea3DYUNCBvLN5N-K4bKipleKsg.5wgJPwxVqK6vz3v2K_jhfWlC1qWD5mr2YJx7GAZGnwwg.JPEG%2FIMG%25A3%25DF4026.jpg%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-sangsangnara',
    name: '서울상상나라',
    region: 'seoul',
    subRegion: '광진구',
    category: 'museum',
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://seoulchildrensmuseum.org/index.jsp',
    naverMapUrl: 'https://map.naver.com/p/entry/place/31949741',
    verifiedAt: '2026-04-06',
    lastObservedAt: '2026-04-06',
    verificationStatus: 'official_verified',
    description:
      '놀이와 전시를 함께 엮은 서울 대표 어린이 체험형 박물관. 어린이대공원 실내 동선과 묶어 하루 코스를 짜기 좋다.',
    address: '서울특별시 광진구 능동로 216',
    operatingHours: '10:00-18:00',
    priceInfo: '36개월 이상 4,000원 / 36개월 미만 무료',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'public',
    editorNote:
      '온라인 예약제로 운영된다. 어린이대공원 주차장과 함께 이용하는 흐름이 편하다.',
    externalBlogLinks: [
      {
        title:
          '서울 아이와 가볼만한곳 서울상상나라, 다양한 실내체험, 물놀이터, 예약, 주차, 서울 어린이 체험관',
        href: 'https://blog.naver.com/dossiyam/224206769211',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울 아이와 가볼만한곳 서울상상나라, 다양한 실내체험, 물놀이터, 예약, 주차, 서울 어린이 체험관',
        ogDescription:
          '서울 아이와 가볼만한곳 서울상상나라 ⏰️ 매일 10시 ~ 18시, 월요일 휴관 💰 36개월 이상 : 4천원 🚗...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMDFfMTYw%2FMDAxNzcyMzY3NTk1ODE1.INilF69t2TO29VMZReHNqvTRAA3pOY4hhCYWlZEXiUgg.zxON-uGJFoiQ6Eel_coI5po0uzKNLA2SQ-CRZFK9K78g.JPEG%2F900%25A3%25DF20260226%25A3%25DF130514.jpg%23900x1200&type=ff192_192',
      },
      {
        title:
          '서울상상나라 토요일 방문 후기: 16개월 아기랑, 서울형키즈카페, 점심은 카츠 헤세드 어린이대공원점',
        href: 'https://blog.naver.com/daystarsoo/224214440187',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울상상나라 토요일 방문 후기: 16개월 아기랑, 서울형키즈카페, 점심은 카츠 헤세드 어린이대공원점',
        ogDescription:
          '서울시 광진구에 위치한 서울상상나라! 16개월 아기와 토요일에 방문한 후기입니다 >.< (상상나라 체...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTFfMjEx%2FMDAxNzczMTU5NzE0MjIw.99EgQYbtnn-xxUl9w-6Iqdil_ghk3duMQIqcNq0Eh8sg.3fFzVpgFU2Jfa5XPR9lW03LH4BRBP9liHDL7y_KAlS0g.JPEG%2F900%25A3%25DF20260307%25A3%25DF111755.jpg%23900x1200&type=ff192_192',
      },
      {
        title:
          '서울 광진 어린이대공원 아이와 실내 가볼만한곳 "서울상상나라" 방문 후기',
        href: 'https://blog.naver.com/rara_fam/224053664195',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울 광진 어린이대공원 아이와 실내 가볼만한곳 "서울상상나라" 방문 후기',
        ogDescription:
          '안녕하세요, 라라맘이에요🩷 이번 주말에는 아이들과 나들이로 서울 광진구 어린이대공원 근처에 위치한 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEwMjVfMjUw%2FMDAxNzYxMzkxODAyNjAw.CvjlTxiW0eIIxZb_Ce17QGq2V0wwrxfmU732d3KC-hEg.eKctXq0YHatScjXGR2l820vjnaPkp_ML3z3whz6W0JAg.JPEG%2FIMG%25A3%25DF2013.JPG%23900x900&type=f250_208',
      },
    ],
  },
  {
    id: 'national-children-science-center',
    name: '국립어린이과학관',
    region: 'seoul',
    subRegion: '종로구',
    category: 'museum',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'partial-free',
    reservationRequired: false,
    parking: false,
    sourceType: 'official',
    sourceUrl: 'https://www.csc.go.kr/index.do',
    naverMapUrl: 'https://map.naver.com/p/entry/place/11796217',
    verifiedAt: '2026-04-07',
    lastObservedAt: '2026-04-07',
    verificationStatus: 'official_verified',
    description:
      '상설전시관을 무료로 이용할 수 있는 어린이 과학관. 창경궁 권역 실내 체험 코스로 묶기 좋다.',
    address: '서울 종로구 창경궁로 215',
    operatingHours: '09:30-17:30 (월요일 휴관)',
    priceInfo: '상설전시관 무료 / 일부 특별 프로그램 별도 운영',
    feedingRoom: true,
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'public',
    editorNote:
      '연나이 4세 이상 중심이다. 단체와 일부 프로그램은 사전 예약 여부를 먼저 확인하는 편이 안전하다.',
    externalBlogLinks: [
      {
        title:
          '서울 아이랑 가볼만한곳 추천 🎈 혜화 국립어린이과학관 다녀온 후기 (어린이날 행사 정보까지)',
        href: 'https://blog.naver.com/christ1002/224274761853',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle:
          '서울 아이랑 가볼만한곳 추천 🎈 혜화 국립어린이과학관 다녀온 후기 (어린이날 행사 정보까지)',
        ogDescription:
          '요즘 날씨가 애매해서 어디 갈까 고민하다가 서울 혜화에 있는 국립어린이과학관 다녀왔어요 😊 결론부터...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA1MDRfNjcg%2FMDAxNzc3ODk1MDg2MjQ0.8uhuHwoAmS7v0wz59KJH26NZ5VV0Go0FQZKLVS-6Lmwg.sc2WPFOIkUzFHr2sAiVuBafT6MUKoPQpPKfWkQfsC2gg.JPEG%2FIMG%25A3%25DF3006.jpg%23900x676&type=ff192_192',
      },
      {
        title:
          '서울 국립어린이과학관 예약방법, 주차, 5세 방문 대만족 후기 (주말 아이랑 갈만한 곳)',
        href: 'https://blog.naver.com/yeriirey/224219294183',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울 국립어린이과학관 예약방법, 주차, 5세 방문 대만족 후기 (주말 아이랑 갈만한 곳)',
        ogDescription:
          '현생이 너무 정신없어서 주말 계획도 못 세우고 있다가 금요일에 급하게 서칭하다가 발견한 국립어린이과학...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTdfMTcz%2FMDAxNzczNzA0MjYyMTk1.NHr9bgepgrYoiKYNFeGYKtcWFldCHJCyJJMAUyFkeUog.f4VP7PUkYUw6WbsiN5MCY2WnzerzYGuURuf_mhaX5W4g.JPEG%2FIMG%25A3%25DF2072.jpg%23900x1200&type=f250_208',
      },
      {
        title:
          '서울 종로구 아이와 갈만한 곳 국립어린이과학관 여행 가격 졸맛 꿀팁 국립어린이과학관',
        href: 'https://blog.naver.com/coffee-joa/223965659893',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울 종로구 아이와 갈만한 곳 국립어린이과학관 여행 가격 졸맛 꿀팁 국립어린이과학관',
        ogDescription:
          '#서울국립어린이과학관 #아이와갈만한곳 #종로구여행할곳 #아이와갈한만곳추천 #서울종로구 #과학관 #주차 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MTBfMjQ0%2FMDAxNzU0ODEyOTMzNjU5.1p7qLfBezbz76fQ4NAD1-m0RbN0R-VuaKG6u6EaTMrcg.ab4cLKCe2YS7-W_iIXCm71SBJc5b0tKFEFoCXUkmhOMg.JPEG%2F20250727_131846.jpg%234000x3000&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-baekje-childrens-museum',
    name: '서울백제어린이박물관',
    region: 'seoul',
    subRegion: '송파구',
    category: 'museum',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'free',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl:
      'https://baekjemuseum.seoul.go.kr/dreamvillage/board/notice/index.jsp?boardid=SDM0401000000&cpage=1&mmode=content&mpid=SDM0401000000&pg=1&pid=23111&skin=notice',
    naverMapUrl: 'https://map.naver.com/p/entry/place/11620616',
    verifiedAt: '2026-04-06',
    lastObservedAt: '2026-04-06',
    verificationStatus: 'official_verified',
    description:
      '올림픽공원 안에서 백제 역사를 어린이 눈높이 체험으로 풀어낸 박물관. 공원 산책과 실내 전시를 함께 묶기 좋다.',
    address: '서울특별시 송파구 올림픽로 424',
    operatingHours: '09:00-18:00 (월요일 휴관)',
    priceInfo: '상설 전시 무료 / 교육 프로그램 별도 예약 운영',
    feedingRoom: true,
    rainFriendly: true,
    stayMinutes: 90,
    operatorType: 'public',
    editorNote:
      '상설 관람은 현장 방문이 가능하고 일부 교육 프로그램은 서울시 공공서비스 예약으로 운영된다.',
    externalBlogLinks: [
      {
        title: '15개월 아기와 서울백제어린이박물관 후기',
        href: 'https://blog.naver.com/ssoy333/224227055376',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '15개월 아기와 서울백제어린이박물관 후기',
        ogDescription:
          '날씨는 춥고 비바람이 불던 어느 주말, 아침부터 일찍 일어난 아가와 어디서 시간을 보내나 ㄱ찾아보았다. ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTlfMjk4%2FMDAxNzczOTIwMDQ3Mjk2.szUj1Ic4XYXFvdmiE1Clc6MBjV5nlKCI4sgfW3ogz0gg.ikTjz4ZZfoMp49oDfuw_8VofEPxEBixZGIwArYF4qBwg.JPEG%2FIMG%25A3%25DF3658.jpg%23900x676&type=ff192_192',
      },
      {
        title: '서울백제어린이박물관 예약 서울 잠실 실내 아이와 가볼만한곳',
        href: 'https://blog.naver.com/angus0511/223953355437',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle: '서울백제어린이박물관 예약 서울 잠실 실내 아이와 가볼만한곳',
        ogDescription:
          '서울백제어린이박물관 @ 글, 사진 민이네 안녕하세요 여행 인플루언서 민이네에요! 서울백제어린이박물관을...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA3MjlfMjc1%2FMDAxNzUzNzYxODY3OTg1.FQKD7lzUBMQGaivWyIrxDoYjJIrV-oXvMgaelDgEDkwg.pcxbCLRF-e-YCUszrzv1Vhopys3kv4LPcDSPaBVsi0Ag.JPEG%2F900%25A3%25DF1753669811054.jpg%23700x696&type=ff192_192',
      },
      {
        title:
          '[송파 아이랑 가볼만한곳] 올림픽공원 나들이 & 서울백제어린이박물관 무료 체험 예약 꿀팁',
        href: 'https://blog.naver.com/piggomi/224256479430',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle:
          '[송파 아이랑 가볼만한곳] 올림픽공원 나들이 & 서울백제어린이박물관 무료 체험 예약 꿀팁',
        ogDescription:
          '안녕하세요! 맞벌이 부부의 분주한 일상을 기록하고, 7살 꼬마 공주님과의 소중한 추억을 차곡차곡 쌓아가...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MTlfNTIg%2FMDAxNzc2NTQ3ODI4MDQy.o4S3zzgxAahvYSGYIqatFNnFoHnqm-DHQ8X87EvKVkUg.xfEsgliahZtA9wrN0GXruNKK9IgW88365JbyT6F5P0sg.JPEG%2FKakaoTalk_20260418_071731081_05.jpg%233000x2250&type=ff192_192',
      },
    ],
  },
  {
    id: 'dooly-museum',
    name: '둘리뮤지엄',
    region: 'seoul',
    subRegion: '도봉구',
    category: 'museum',
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'both',
    seasons: ['all-season', 'spring', 'fall'],
    priceType: 'paid',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://www.doolymuseum.or.kr/html/sub04/sub04_0405.php',
    naverMapUrl: 'https://map.naver.com/p/entry/place/32333709',
    verifiedAt: '2026-04-08',
    lastObservedAt: '2026-04-08',
    verificationStatus: 'official_verified',
    description:
      '둘리 세계관을 따라 전시와 체험을 즐기는 캐릭터 박물관. 미로정원과 드림스테이지까지 함께 둘러보기 좋다.',
    address: '서울특별시 도봉구 시루봉로1길 6',
    operatingHours: '10:00-18:00 (월요일 휴관)',
    priceInfo: '평일 4,000원 / 주말·공휴일 5,000원 / 24개월 미만 무료',
    feedingRoom: true,
    strollerFriendly: true,
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'public',
    editorNote:
      '무료 주차가 가능하지만 주말과 공휴일에는 주차 공간이 매우 협소하다.',
    externalBlogLinks: [
      {
        title:
          '도봉구! 아이랑 갔다가 어른이 더 좋아한 "둘리뮤지엄"내돈내산 방문후기🩷(주차,할인,요금 등)',
        href: 'https://blog.naver.com/kay270/224253788854',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '도봉구! 아이랑 갔다가 어른이 더 좋아한 "둘리뮤지엄"내돈내산 방문후기🩷(주차,할인,요금 등)',
        ogDescription:
          '도봉구에 도로에 꾸며놓은게 중간중간 둘리컨셉으로 된 조형물들이 많았어서 검색해보니, 만화 둘리 배경이...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MTVfMTY1%2FMDAxNzc2MjQ1NTg4NDYw.FJW5oGUO-SSD5JffA3IX6nt68TRjGETDQz5I9ywG6-8g.WdvIvcq1ljJAp6yNA0R9XOFt9McHoxeVtA1VdVFe_v4g.JPEG%2F900_20260407_152332.jpg%23900x1200&type=ff192_192',
      },
      {
        title:
          "4개월, 36개월 아이와 함께하는 '쌍문동 둘리뮤지엄' 방문기 (연간회원 찐후기)",
        href: 'https://blog.naver.com/josuhui/224261989355',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          "4개월, 36개월 아이와 함께하는 '쌍문동 둘리뮤지엄' 방문기 (연간회원 찐후기)",
        ogDescription:
          '블로그에 열심히 기록을 남기려는 요즘! 우리딸의 쌍문동 최애장소이자, 쌍문동아이랑갈만한곳 기록을 남겨...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjNfMjI1%2FMDAxNzc2ODg5MDE0NzYw.ebjh8yhqjmZg0JuSILud18lhLzjy2Sb0f5XYoH_DzQgg.lUwWey_I4XSm54juQbhJgqQJJ8KcDEkkbDAj9z-qkkIg.JPEG%2FIMG%25A3%25DF5020.jpg%23900x1200&type=ff192_192',
      },
      {
        title:
          '[아이랑 가볼만한곳] 43개월 아이랑 도봉구 둘리뮤지엄 주말방문 후기:)',
        href: 'https://blog.naver.com/dbsk8242/224254821957',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[아이랑 가볼만한곳] 43개월 아이랑 도봉구 둘리뮤지엄 주말방문 후기:)',
        ogDescription:
          '안녕하세요 지호맘입니다😊 주말 지호랑 둘이 데이트하는날이 있어서 둘리뮤지엄에 다녀왔습니다! 도봉구...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MTFfMTk4%2FMDAxNzc1OTE4MjEyNzUy.-1CL_qyu1NovkLSi6LBg4-Vn6F1eUl5fZBdmH3mB3Xcg.jWp6GwzjqkncIUZ0VQN_frmD2AzD1QEHW_9NKFSjfGUg.JPEG%2F900%25A3%25DFAddText%25A3%25DF04%25A3%25AD11%25A3%25AD09.17.57.jpg%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-1',
    name: '서울형 키즈카페 시립 1호점',
    region: 'seoul',
    subRegion: '동작구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://umppa.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DJ230901&q_fcltyStle=',
    naverMapUrl: 'https://map.naver.com/p/entry/place/1983885754',
    verifiedAt: '2026-04-06',
    lastObservedAt: '2026-04-06',
    verificationStatus: 'official_verified',
    description:
      '서울가족플라자 안에서 회차제로 운영하는 공공 키즈카페. 동작권 실내 놀이 동선으로 묶기 좋다.',
    address: '서울특별시 동작구 노량진로 10 서울가족플라자 지하2층',
    priceInfo: '이용료·감면은 지점 안내 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote: '공식 상세에 4~10세 중심 이용 안내와 예약 버튼이 노출된다.',
    externalBlogLinks: [
      {
        title: '서울형 시립 키즈카페 1호점 이용안내 및 후기',
        href: 'https://blog.naver.com/hazelspace/224178351675',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 시립 키즈카페 1호점 이용안내 및 후기',
        ogDescription:
          '✿ܓ 내돈내산 후기입니다 안녕하세요. 하젤의 리뷰실입니다. 주말에 아이와 대방역에 있는 서울형 시립 키...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMTBfMTQ4%2FMDAxNzcwNjg0NjM1NjMz.rtg6lLJfs2ssJCgRZaxDAh-ZOVP7zo2RhRKdPUaUliUg.rW_8cjvgUht2qsppUwO0DFPxQF3K3h9J3bcMAk2_elYg.PNG%2FFrame_3.png%231128x1128&type=ff192_192',
      },
      {
        title: '서울 동작 서울형 키즈카페 시립 1호점',
        href: 'https://blog.naver.com/qksdi1218/224106437281',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울 동작 서울형 키즈카페 시립 1호점',
        ogDescription:
          '작성일 : 2025년 12월 10일 장소 : 서울특별시 동작구 노량진로 10 서울가족 프라자 지하 2층 주차+요금 : ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMTFfMjAg%2FMDAxNzY1NDIwNTIzNjM0.JyQPBud-SStLIpiVUXutxEjMQIpv7gFm34EFqLeczXog.pBACGPi6mAEjvx7b87oVxB8zFnbr88mZ2oM6SBK1aB8g.JPEG%2F%25C1%25A6%25B8%25F1%25C0%25BB_%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4._%25286%2529.jpg%231080x1080&type=ff192_192',
      },
      {
        title: '초등학생이용가능 서울형키즈카페 시립1호점(대방동)',
        href: 'https://blog.naver.com/sn335/224189997121',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '초등학생이용가능 서울형키즈카페 시립1호점(대방동)',
        ogDescription:
          "안녕하세요! 오늘은 예비 초등학교 2학년 딸아이와 함께 다녀온 '서울형 키즈카페 시립 1호점' 방문 후기...",
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMjBfMjY1%2FMDAxNzcxNTk4NDAwMjY4.kIoRXo8MlMIE_7I2XQEX2vQM2hnQcW2qHem1TfWesusg.bFscrcWY3nmemouopeN3vhWPgNurmGKg3W9WD02eGgEg.JPEG%2F%25B0%25A5%25BB%25F6_%25C8%25F2%25BB%25F6_%25BD%25C9%25C7%25C3%25C7%25D1_%25B5%25F0%25C0%25DA%25C0%25CC%25B3%25CA%25B0%25A1_%25B9%25DE%25B0%25ED%25BD%25CD%25C0%25BA_%25BC%25B1%25B9%25B0_%25C3%25DF%25C3%25B5_%25C0%25CE%25BD%25BA%25C5%25B8%25B1%25D7%25B7%25A5_%25C6%25F7%25BD%25BA%25C6%25AE_%25A3%25AD_1.jpg%23900x900&type=f250_208',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-ttukseom-jabeolle',
    name: '서울형 키즈카페 시립 뚝섬자벌레점',
    region: 'seoul',
    subRegion: '광진구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://umppa.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GJ240401&q_fcltyStle=',
    naverMapUrl: 'https://map.naver.com/p/entry/place/1163741876',
    verifiedAt: '2026-04-14',
    lastObservedAt: '2026-04-14',
    verificationStatus: 'official_verified',
    description:
      '한강 생활권에서 이용하기 좋은 공공 키즈카페. 영유아 중심 회차제로 운영돼 비 오는 날 실내 대안 동선으로 쓰기 좋다.',
    address: '서울특별시 광진구 강변북로 2202 2층 꿈틀나루',
    priceInfo: '회차형 예약 / 상세 요금은 지점 안내 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote: '네이버 지도에는 서울형키즈카페 시립뚝섬자벌레점으로 표기된다.',
    externalBlogLinks: [
      {
        title:
          "한강 뷰가 펼쳐지는 '서울형 키즈카페 뚝섬자벌레점' 아기랑 다녀온 후기 (예약/주차/꿀팁)",
        href: 'https://blog.naver.com/ddostarr/224274056662',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          "한강 뷰가 펼쳐지는 '서울형 키즈카페 뚝섬자벌레점' 아기랑 다녀온 후기 (예약/주차/꿀팁)",
        ogDescription:
          "안녕하세요! 오늘은 뚝섬한강공원의 랜드마크, 자벌레 건물 안에 위치한 '서울형 키즈카페 시립 뚝섬...",
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA1MDRfMTM2%2FMDAxNzc3ODU2OTU4ODA4.hdPUsXzrQwKdx8fAm9jChYonyP21VN0VEKzS6T-kDY0g.3YS18t-3X_GFNIZzswmnl-me2OLox2t-uo_cuSbKUqEg.JPEG%2FIMG%25A3%25DF2800.jpg%23900x1200&type=f250_208',
      },
      {
        title: '아이랑 가볼만한 곳, 서울형키즈카페 시립 뚝섬자벌레점',
        href: 'https://blog.naver.com/sportsman03/224257691116',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '아이랑 가볼만한 곳, 서울형키즈카페 시립 뚝섬자벌레점',
        ogDescription:
          '안녕하세요! 돈 공부하는 부자아빠 지망생 토끼네곰입니다. 날씨가 갑자기 확 더워지는 것이 봄이 살짝 스...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MTlfMTMw%2FMDAxNzc2NTgxOTgxNjIy.5zbDrUtNDzBhI78eqRFtkN9Wf1YCHwOdFf6os44skcIg.AK97NvSXI-T6CemByM_tGj4VMOfyli-u3OkCAkcn1Jcg.JPEG%2FKakaoTalk_20260414_170430893.jpg%231050x1400&type=ff192_192',
      },
      {
        title: '서울형키즈카페 시립 뚝섬자벌레점 주말방문후기 자양역이동방법',
        href: 'https://blog.naver.com/wlsfks_/223981867668',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 시립 뚝섬자벌레점 주말방문후기 자양역이동방법',
        ogDescription:
          '안녕하세요! 오늘은 리모델링이 완료된 서울형키즈카페 시립 뚝섬자벌레점 방문후기와 꿀팁 전달드릴게요! ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MjRfODEg%2FMDAxNzU2MDM3MTI2NDAz.7HRNGp0TDEMD6lvcs3RqsBWo_TU4njERRJgEOREA240g.f6Ga4rMdAyhDCvuwDI4qcHq9k-VhMvyq97eBWx8WoCgg.JPEG%2FIMG%25A3%25DF1834.jpg%23900x676&type=f250_208',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-yangjae1',
    name: '서울형 키즈카페 서초구 양재1동점(서리풀노리학교 양재1동점)',
    region: 'seoul',
    subRegion: '서초구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://umppa.seoul.go.kr/icare/user/bbs/BD_selectBbs.do?q_bbsCode=1028&q_bbscttSn=20251001180055700&q_fcltyId=SC231201',
    naverMapUrl: 'https://map.naver.com/p/entry/place/1994004504',
    verifiedAt: '2026-04-14',
    lastObservedAt: '2026-04-14',
    verificationStatus: 'official_verified',
    description:
      '양재 생활권에서 이용하기 좋은 공공 키즈카페. 영유아 중심 회차형 운영으로 가까운 실내 육아 동선에 넣기 쉽다.',
    address: '서울특별시 서초구 양재천로 125-10 양재공영주차빌딩 2층',
    priceInfo: '회차형 예약 / 프로그램 공지형 운영',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote: '네이버 지도에는 서리풀노리학교 양재1동점으로 노출된다.',
    externalBlogLinks: [
      {
        title:
          '서울형 키즈카페 서초구 양재1동점, 주말에 아이와 함께 가볼만한 곳(feat.예약 방법)',
        href: 'https://blog.naver.com/lgd0304/224194905172',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 서초구 양재1동점, 주말에 아이와 함께 가볼만한 곳(feat.예약 방법)',
        ogDescription:
          '#서울형키즈카페 #주말아이와가볼만한곳 #서울형키즈카페양재1동점 서울형 키즈카페 서초구 양재 1동점 서...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMjVfMTIx%2FMDAxNzcxOTY5NTQ4Mzk2.dagyALz63kcH2t9Ar0gKVntZJlqDfV5Fa-Gd388ugZAg.vnl5Fzk4mCtFh1oqvhov7tHGH2eEYgyFhFmEa9RD5Log.JPEG%2FKakaoTalk_Photo_2026-02-24-06-26-53_007.jpeg%233000x2250&type=ff192_192',
      },
      {
        title:
          '서울형 키즈카페 양재1동점 후기 (16개월 남매쌍둥이랑 다녀온 솔직 리뷰 + 예약방법/주차 팁)',
        href: 'https://blog.naver.com/witwins/224133930030',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 양재1동점 후기 (16개월 남매쌍둥이랑 다녀온 솔직 리뷰 + 예약방법/주차 팁)',
        ogDescription:
          '한줄 요약 서울형 키즈카페 양재1동점은 공공형이라 가격 부담이 적고 관리가 깔끔한 편이라 좋았어요. (저...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMDRfMTM2%2FMDAxNzY3NTE0OTM2NTM5.G8a1SHBLshC2VTvdardlYsrvDQDLVO-bzfG7M6X1UQkg.w4oxOlOqLEWybyyoW1y_K9K4km2LDK9e0XoYeP5ZVIog.JPEG%2Foutput%25A3%25DF2847314270.jpg%23900x676&type=ff192_192',
      },
      {
        title:
          '서울형키즈카페 서리풀노리학교 양재1동점 후기 | 0세 아이도 놀기 좋은 키즈카페',
        href: 'https://blog.naver.com/bbnation/224176538287',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형키즈카페 서리풀노리학교 양재1동점 후기 | 0세 아이도 놀기 좋은 키즈카페',
        ogDescription:
          '서울형키즈카페 서리풀노리학교 양재1동점 직접 다녀온 후기! 0세 전용 공간, 디지털 모래놀이·스포츠존, ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDhfNCAg%2FMDAxNzcwNTU2ODA4OTUw.U1pFibkg8H1ZkPLnZuK6J9YV_VGXeIQC1hhRuS6t9Igg.dCB9RkDEaErI087StfD6eFxVMughKZYOQrst8GbOfW0g.PNG%2F%25BA%25ED%25B7%25CE%25B1%25D7-%25BD%25E6%25B3%25D7%25C0%25CF-001_-_2026-02-08T221950.238.png%231080x1080&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-mokdong',
    name: '서울형 키즈카페 시립 목동점',
    region: 'seoul',
    subRegion: '양천구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://umppa.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=YC231201&q_fcltyStle=',
    naverMapUrl: 'https://map.naver.com/p/entry/place/1476657870',
    verifiedAt: '2026-04-06',
    lastObservedAt: '2026-04-06',
    verificationStatus: 'official_verified',
    description:
      '양천 거점형 키움센터 안에서 회차제로 운영하는 공공 키즈카페. 안양천 생활권 실내 놀이 후보로 쓰기 좋다.',
    address: '서울특별시 양천구 안양천로 1131 지식산업센터 2층',
    priceInfo: '회차제 운영 / 상세 요금은 지점 안내 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote: '공식 상세에 3~12세 이용 안내와 예약 버튼이 노출된다.',
    externalBlogLinks: [
      {
        title:
          '서울형 키즈카페 예약방법, 시립 목동점 솔직 이용후기, 다둥이 무료입장 가능한 키즈카페 추천',
        href: 'https://blog.naver.com/miiiiiiiiiijin/224276279698',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 예약방법, 시립 목동점 솔직 이용후기, 다둥이 무료입장 가능한 키즈카페 추천',
        ogDescription:
          '이웃님들 안녕하세요! 저희 집은 서울형 키즈카페를 아주아주 애용합니다. 애가 둘이라 일반 키즈카페에 부...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA1MDZfMTk3%2FMDAxNzc4MDMyMTIyMjI4.Lm2opV9vk9Uu1sOcBuxNqj36nB-0oWTTd69-jQeWpkYg.lgYx-MfAgdYzNC4CBZPMgWtjL6PCQlC7ocTuXF5xVacg.JPEG%2F20260504_151346_127.jpg%231689x2587&type=ff192_192',
      },
      {
        title:
          '시립양천거점형키움센터 서울형키즈카페 목동점 솔직 방문 후기 - 위치, 이용료, 주차까지',
        href: 'https://blog.naver.com/kingnation/224265146297',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '시립양천거점형키움센터 서울형키즈카페 목동점 솔직 방문 후기 - 위치, 이용료, 주차까지',
        ogDescription:
          '시립양천거점형키움센터 서울형키즈카페 목동점 솔직 방문 후기 - 위치, 이용료, 주차까지 서울시가 만든 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjVfMjA0%2FMDAxNzc3MTI3NTE1NTI4.sX_OmkW7e2a8HpyaAc546ppSv6zBRj2BNHdChmIrqosg.Tlb9m3mJBgzHVeSCmJ48ioeOnAYajuu_mAoXx45BuJgg.JPEG%2F20260425_093948.jpg%234000x3000&type=ff192_192',
      },
      {
        title:
          '[서울 양천구] 서울형키즈카페 시립목동점(예약 꿀팁 & 후기) 아이5천원 내돈내산',
        href: 'https://blog.naver.com/dmsrhd322/223975472331',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[서울 양천구] 서울형키즈카페 시립목동점(예약 꿀팁 & 후기) 아이5천원 내돈내산',
        ogDescription:
          '서울형 키즈카페 시립목동점 기본정보 서울형 키즈카페 시립목동점은 서울 양천구 안양천로 1131 지식산업...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MTlfMTEx%2FMDAxNzU1NTY4NTM3OTUw.-LRrQKaqYqwdXO-Kut-ZoLCfNl1DjEG2guoZJ5oKT0Mg.cTkPGrERm2JPnBJQriGB3x5L0M2UgPqj1DDznMgCJ2Yg.JPEG%2FKakaoTalk_Photo_2025-08-19-10-46-16.jpeg%231080x1440&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-boramae',
    name: '서울형 키즈카페 시립 보라매공원점',
    region: 'seoul',
    subRegion: '동작구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://umppa.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DJ250901&q_fcltyStle=',
    naverMapUrl: 'https://map.naver.com/p/entry/place/2093934615',
    verifiedAt: '2026-04-06',
    lastObservedAt: '2026-04-06',
    verificationStatus: 'official_verified',
    description:
      '보라매공원 인근에서 회차제로 운영하는 공공 키즈카페. 공원 산책과 실내 놀이를 묶기 좋은 도심형 거점이다.',
    address: '서울특별시 동작구 여의대방로20길 33 1층',
    priceInfo: '아동 1인 5,000원',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote: '공식 상세에 3~9세 이용 연령과 보호자 동반 규칙이 노출된다.',
    externalBlogLinks: [
      {
        title:
          '보라매공원 키즈카페 주차, 서울형 키즈카페 시립 보라매공원점, 동작구키즈카페',
        href: 'https://blog.naver.com/my_dear_yoon/224080776181',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '보라매공원 키즈카페 주차, 서울형 키즈카페 시립 보라매공원점, 동작구키즈카페',
        ogDescription:
          '안녕하세요. 요즘 독감이 유행이라더니 그 유행에 합류하여 야무지게 앓아 누웠다가 드디어 정신 차리게 됐...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTExMTVfMTMg%2FMDAxNzYzMTkwNDY3MzQ3.dLuiUB3o76Zn7vCn4-hvT9hKGAe7AwHb8N9DUu1hKaQg.IiHKnZhbZJOEecOHnuUt0fMAdjtflOYcXsEtILu2lvcg.JPEG%2F900%25A3%25DF1763190461558.jpg%23900x675&type=ff192_192',
      },
      {
        title: '서울형키즈카페 시립 보라매공원점 예약, 후기',
        href: 'https://blog.naver.com/miso_echoing/224181240046',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 시립 보라매공원점 예약, 후기',
        ogDescription:
          '서울형키즈카페 시립 보라매공원점 주말 뭐하고 시간 보내지~하다가 급하게 예약한 서울형키즈카페 시립 보...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMTJfMjY5%2FMDAxNzcwODY2Mjg1NzM1.9c-okaDihW2udAx4nfhLaU7tfGkHYo7jkqWn1NGRiq4g._xK8tgkEWi8MBL6FWRvubqzK8EIpeyARCKIyx605kDwg.PNG%2F%25BC%25AD%25BF%25EC%25C7%25FC%25C5%25B0%25C1%25EE%25C4%25AB%25C6%25E4_%25BA%25B8%25B6%25F3%25B8%25C5%25B0%25F8%25BF%25F8.png%231080x1080&type=f250_208',
      },
      {
        title: '서울형키즈카페 시립 보라매공원점 방문기 + 보라매공원 주차요금',
        href: 'https://blog.naver.com/inyoung1922/224188600172',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형키즈카페 시립 보라매공원점 방문기 + 보라매공원 주차요금',
        ogDescription:
          '2026.02.14 명절 시작..토요일 오전 뭐 할지 고민하다가 급 다녀온 서울형키즈카페 시립 보라매공원점! ?...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMThfMjE3%2FMDAxNzcxNDI1NjYzNTUw.ECnVb160ASBsUzkl3Sui2dj98DGtI5dmRP4Z327Lhpcg.q_57ZxCwnJSgA-N8pPpcb94RC663os9ma7Bb4zHMWfcg.JPEG%2F900%25A3%25DF20260215%25A3%25DF112522.jpg%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-jayang4',
    name: '서울형 키즈카페 자양4동 2호점(꾸미팡팡 놀이터)',
    region: 'seoul',
    subRegion: '광진구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://umppa.seoul.go.kr/icare/user/bbs/BD_selectBbs.do?q_bbsCode=1028&q_bbscttSn=20250923164636911&q_fcltyId=GJ240903',
    naverMapUrl: 'https://map.naver.com/p/entry/place/1410258166',
    verifiedAt: '2026-04-06',
    lastObservedAt: '2026-04-06',
    verificationStatus: 'official_verified',
    description:
      '건대입구역 생활권에서 이용하기 좋은 공공 키즈카페. 공지형 운영으로 회차와 휴관일을 보고 움직이는 편이 안전하다.',
    address: '서울특별시 광진구 능동로 87 3층',
    priceInfo: '지점 공지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote: '공식 공지 페이지에 운영일, 휴관일, 예약 신청 동선이 노출된다.',
    externalBlogLinks: [
      {
        title:
          "[서울/광진] '서울형키즈카페 자양4동점' 주말주차, 1호점 2호점 차이, 추천연령, 예약사이트 안내",
        href: 'https://blog.naver.com/bestsy90/224209327702',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          "[서울/광진] '서울형키즈카페 자양4동점' 주말주차, 1호점 2호점 차이, 추천연령, 예약사이트 안내",
        ogDescription:
          '서울형키즈카페 자양4동점 주말 아이랑 가볼만한곳 꼭 검색해보다 마음에 드는 곳 못 찾아 시무룩해지는 나...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMTNfOTIg%2FMDAxNzY4MzAyNTk2MTUw.Lng1RUFk1ncmMAWtn1ETYjj0vOzq9xUoBhQGQoEuTlog._FdrpYozSa_I-eHZZKe5NDPmeO3W62-hceHi8QhX7tgg.JPEG%2FIMG%25A3%25DF6494.jpg%235712x4284&type=f250_208',
      },
      {
        title: '서울형 키즈카페 자양4동 1,2호점 꾸미팡팡 광진구 실내 놀이터',
        href: 'https://blog.naver.com/angela0402/223949179760',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 키즈카페 자양4동 1,2호점 꾸미팡팡 광진구 실내 놀이터',
        ogDescription:
          '광진구 실내 놀이터 서울형 키즈카페 자양4동 1,2호점 꾸미팡팡 ⓒYOLO차차 24년 말에 광진구에 새로 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA3MjdfNjIg%2FMDAxNzUzNjI2MDEwNDEw.d3C7kkNGh0VFL7BqRVhZOuHw1m4wIYcNFSPFblG4KPIg.gTelyj6c88iNCbj1tGxo0bB-GlG1mIX9fyLYs_2OYocg.JPEG%2FKakaoTalk_20250726_222751363_13.jpg%233000x2250&type=ff192_192',
      },
      {
        title: '서울형 키즈카페 자양4동 1,2호점 꾸미팡팡 놀이터 후기',
        href: 'https://blog.naver.com/radiant2774/223968485982',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 키즈카페 자양4동 1,2호점 꾸미팡팡 놀이터 후기',
        ogDescription:
          '서울형 키즈카페 자양4동 1, 2호점 위치 건대입구역 자이엘라 건물 3층 시간 주중 1회차 9:30-11:30 / 2회...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MTRfNzYg%2FMDAxNzU1MTU4MzM5MTkx.7QeV-5b6OZMnkuUSdvaK2SCUyZKmZybF36l5L7zze9Yg.AAzWptKQAY71xSgSfcT9CQiBpmFjVqpInKSChsCZ4Fsg.PNG%2F%25BD%25BA%25C5%25A9%25B8%25B0%25BC%25A6_2025-08-14_165243.png%231074x1079&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-dapsimni1',
    name: '서울형 키즈카페 답십리1동점',
    region: 'seoul',
    subRegion: '동대문구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://umppa.seoul.go.kr/icare/user/bbs/BD_selectBbs.do?q_bbsCode=1028&q_bbscttSn=20251111105030310&q_fcltyId=DM250103',
    naverMapUrl: 'https://map.naver.com/p/entry/place/1250250207',
    verifiedAt: '2026-04-06',
    lastObservedAt: '2026-04-06',
    verificationStatus: 'official_verified',
    description:
      '아파트 커뮤니티센터 안에서 운영하는 생활권형 공공 키즈카페. 동대문구 동네 육아 동선에 넣기 쉽다.',
    address: '서울특별시 동대문구 답십리로 130 309동 커뮤니티센터 내',
    priceInfo: '지점 공지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote: '공식 공지 페이지에 운영일, 휴관일, 예약 신청이 노출된다.',
    externalBlogLinks: [
      {
        title:
          '[서울 동대문구]서울형 키즈카페 답십리1동점 5살 아이와 다녀온 후기',
        href: 'https://blog.naver.com/bjs0476/224142560204',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[서울 동대문구]서울형 키즈카페 답십리1동점 5살 아이와 다녀온 후기',
        ogDescription:
          '안녕하세요 축보기맘이에요🫡 오늘은 서울형 키즈카페 답십리1동점을 다녀왔어요😊 사실 그 옆에 있는 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMTFfMjA4%2FMDAxNzY4MTEyNjE5OTA3.77ONimnf6QR9v7BFwdkZU1xSrFYP5nuIS5vrgM5tV98g.zeDyjIaxa7XFLKJKyWSDm969fLErPJwrtchBQ74K4Xcg.JPEG%2FIMG%25A3%25DF8021.JPG%23900x676&type=ff192_192',
      },
      {
        title:
          '32개월 아기와 다녀온 서울형 키즈카페 답십리1동점 리뷰 입장료, 할인, 장단점',
        href: 'https://blog.naver.com/kiitoksia/224191887440',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '32개월 아기와 다녀온 서울형 키즈카페 답십리1동점 리뷰 입장료, 할인, 장단점',
        ogDescription:
          '안녕하세요, 토순파파입니다. 이번 주말 32개월 아이와 함께 서울형 키즈카페 답십리1동점을 다녀왔어요.10...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMjFfMjEw%2FMDAxNzcxNjg0MzIyMDA4.gSYzq3vVSc9ufBD1q-oHFCtI914Cnw8BH9ZFTOVkLZEg.F3m9DfXSAwBm1MUMSntI-Q5XhI0YYnDHeNyN7lTHmHQg.JPEG%2FIMG%25A3%25DF4130.JPG%23900x900&type=ff192_192',
      },
      {
        title: '서울형키즈카페 동대문구 답십리1동점 주말 후기',
        href: 'https://blog.naver.com/rancean/224187561020',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 동대문구 답십리1동점 주말 후기',
        ogDescription:
          '집 근처에 있는 키즈카페인데, 드디어 방문을 하게 되었네요. 일단 가까운게 굉장히 좋아서, 아이가 좋아한...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMTlfMTY1%2FMDAxNzcxNDMwNDUyODEy.WdwDRVoLd57VPAdnIXJi2hrs4QgFPK2du8LBNi-RcmIg.yR2Rr87jMV7RGlfhsbS0vhVHOapEGRhVDGcvZ2Kb_VUg.JPEG%2FKakaoTalk_20260219_004514011_25.jpg%234032x3024&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-sindorim',
    name: '서울형 키즈카페 신도림동점',
    region: 'seoul',
    subRegion: '구로구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://umppa.seoul.go.kr/icare/user/bbs/BD_selectBbsList.do?q_bbsCode=1028&q_fcltyId=GR250505&q_gubun=each',
    naverMapUrl: 'https://map.naver.com/p/entry/place/2144489674',
    verifiedAt: '2026-04-06',
    lastObservedAt: '2026-04-06',
    verificationStatus: 'official_verified',
    description:
      '신도림역 바로 옆에서 운영하는 역세권형 공공 키즈카페. 비 오는 날 짧게 들르기 좋은 실내 놀이 거점이다.',
    address: '서울특별시 구로구 경인로 688 신도림역 지상 2층',
    priceInfo: '프로그램·지점 공지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote: '공식 페이지에 최근 프로그램과 휴무 공지가 함께 노출된다.',
    externalBlogLinks: [
      {
        title: '서울형키즈카페 신도림동점 예약 방문 솔직 후기',
        href: 'https://blog.naver.com/cherishlol-/224177296389',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 신도림동점 예약 방문 솔직 후기',
        ogDescription:
          '안녕하세요, 튼튼로그에요! 영하 10도까지 떨어지는 주말, 실내에서 놀 곳 찾다가 예약하고 방문하게 된 서...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDlfNzIg%2FMDAxNzcwNjEzMjg2NDcy.VC34rPFPpJXuwoN8Iruvxnp7L4HxaemLvFmAnAXwegAg.si347It9mocrvKEEWkj1FljvOsHZumZhtsRHurb8XzIg.PNG%2F%25C1%25A4%25BA%25B8-%25C4%25BF%25B9%25F6_%25BA%25B9%25BB%25E7%25BA%25BB-_3_-001.png%231080x1080&type=ff192_192',
      },
      {
        title: '서울형키즈카페 신도림동점 주차, 예약, 이용방법, 후기',
        href: 'https://blog.naver.com/sjeixn/224242308703',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 신도림동점 주차, 예약, 이용방법, 후기',
        ogDescription:
          '신도림역을 지나가다가 우연히 발견한 공간 하나가 하루를 완전히 바꿔버렸어요. 바로 역 안에 위치한 서울...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MDZfMTMy%2FMDAxNzc1NDM5MDYwNDIw.oNwFGznId5oRQbnW6wxzLgWOC8JqlGNrwIYnDl_8qREg.obJ1r-oPV4C0bqAwgML5twQyfQ7dQpWdE48L1FOv658g.JPEG%2FKakaoTalk_20260406_091105187.jpg%234000x3000&type=ff192_192',
      },
      {
        title:
          '[구로/신도림] 서울형 키즈카페 신도림동점 리얼 후기 & 4월 봄 미술 놀이 추천 🌸',
        href: 'https://blog.naver.com/jini-hoya/224242343142',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[구로/신도림] 서울형 키즈카페 신도림동점 리얼 후기 & 4월 봄 미술 놀이 추천 🌸',
        ogDescription:
          '안녕하세요. 아이들의 웃음소리가 피어나는 공간을 찾아다니는 교육블로거 지니호야 친절지니 입니다. 따스...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MDZfODAg%2FMDAxNzc1NDM3MTAwODQ3.AJTTLCMIAiylB6UQdxx1NVu7iaHvppfB4ciV8V5lIzMg.ylbnohk5C4J7RCSEq6K_aDWD7xNe1NPGJ6p41352P90g.PNG%2F%25B3%25EB%25B6%25F5%25BB%25F6%25B0%25FA_%25BF%25AC%25B5%25CE%25BB%25F6_%25BD%25C9%25C7%25C3%25C7%25CF%25B0%25ED_%25B1%25F2%25B2%25FB%25C7%25D1_%25BA%25F1%25C1%25EE%25B4%25CF%25BD%25BA_%25C4%25AB%25B5%25E5%25B4%25BA%25BD%25BA_%25C0%25DB%25BC%25BA_%25BF%25E4%25B7%25C9_%25B7%25B9%25C0%25CC%25BE%25C6%25BF%25F4_%25B5%25F0%25C0%25DA%25C0%25CE_%25C5%25DB%25C7%25C3%25B8%25B4_%25C0%25CE%25BD%25BA%25C5%25B8%25B1%25D7%25B7%25A5_%25C4%25AB%25B5%25E5%25B4%25BA%25BD%25BA_%25A3%25AD_1.png%23900x900&type=ff192_192',
      },
    ],
  },
  {
    id: 'national-aviation-museum',
    name: '국립항공박물관',
    region: 'seoul',
    subRegion: '강서구',
    category: 'museum',
    ageBands: ['3-6y', '6-10y', 'all'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'partial-free',
    reservationRequired: false,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://www.aviation.or.kr/',
    verifiedAt: '2026-05-07',
    lastObservedAt: '2026-05-07',
    verificationStatus: 'official_verified',
    description:
      '항공 역사 전시와 어린이 항공 체험을 함께 볼 수 있는 국립 박물관. 김포공항권 실내 나들이로 묶기 좋다.',
    address: '서울특별시 강서구 하늘길 177',
    operatingHours: '관람시간 확인 필요',
    priceInfo: '상설 관람·체험별 요금 확인 필요',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'public',
    editorNote:
      '상설 관람은 실내형이고 일부 체험 프로그램은 예약·요금 조건이 달라 방문 전 공식 예약/안내 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '강서구 아기랑 갈만한 곳 실내 국립항공박물관 16개월 아기 방문후기',
        href: 'https://blog.naver.com/runhappiness/224107523910',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '강서구 아기랑 갈만한 곳 실내 국립항공박물관 16개월 아기 방문후기',
        ogDescription:
          '서울 강서구 아기랑 갈만한 곳 국립항공박물관 글,사진 ⓒ행복이 활동량이 아주 많아진 16개월! 요즘 정말 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMTJfMjcx%2FMDAxNzY1NTI5MzU3Mzc3.GytOicMUXgJrtDS7O2DylTrifMrxFjhJrBxbs1soHMYg.V8YJklsJAF4PpjDXoQ78-SvL5HKPLkzMPOqxlJjAuwMg.PNG%2F%25C1%25A6%25B8%25F1%25C0%25BB-%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4_-001_%252828%2529.png%23960x960&type=ff192_192',
      },
      {
        title: '국립항공박물관 21개월 아기랑 주차 체험예약 식당 꿀팁',
        href: 'https://blog.naver.com/annyeong8877/224136979733',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '국립항공박물관 21개월 아기랑 주차 체험예약 식당 꿀팁',
        ogDescription:
          '본 포스팅은 파트너스 활동을 통해 링크를 통한 구매시 일정액의 수수료를 제공받습니다. 주차부터 체험예...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMTdfODYg%2FMDAxNzY4NjU2OTM0Mjc2.CyVyMOpoMhpiO306Z36Ynbj0y0ETqfavhbRncolus1Mg.8xLmoRYfOEUOixehxQqvF5yiYTGNoW2S4NXND_5xdhQg.JPEG%2F%25C1%25A6%25B8%25F1_%25BE%25F8%25C0%25BD-3.jpg%23900x540&type=ff192_192',
      },
      {
        title: '국립항공박물관 후기｜김포공항 아이와 가볼만한 실내 체험 추천',
        href: 'https://blog.naver.com/bluehands_/224210793018',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle: '국립항공박물관 후기｜김포공항 아이와 가볼만한 실내 체험 추천',
        ogDescription:
          '안녕하세요~! 씹고~뜯고~맛보고~즐기고~! THE 파란손입니다~ 여러분 아이들이 비행기 좋아하시나요? ㅋ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMjBfMjAg%2FMDAxNzcxNTU1MTAxODIx.el9e3tMFOG1Lti63V8MxUiV7AYLPTJ71aQeYx_HzB98g.Pv74Q9ZyTKye_xGL7Wy5Gdk2aMhsOCsjRcVRekkFT9sg.PNG%2FWhite_Blur_Minimalist_New_Post_Instagram_Story__%252853%2529.png%231080x1920&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-life-museum-ompang',
    name: '서울생활사박물관 옴팡놀이터',
    region: 'seoul',
    subRegion: '노원구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'free',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl: 'https://museum.seoul.go.kr/sulm/',
    verifiedAt: '2026-05-07',
    lastObservedAt: '2026-05-07',
    verificationStatus: 'official_verified',
    description:
      '서울생활사박물관 안의 어린이 체험형 놀이공간. 무료 실내 놀이·전시 동선으로 쓰기 좋다.',
    address: '서울특별시 노원구 동일로174길 27 서울생활사박물관',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '무료',
    rainFriendly: true,
    stayMinutes: 90,
    operatorType: 'public',
    editorNote:
      '어린이 체험실은 회차·예약 방식이 바뀔 수 있어 서울시 공공서비스예약 또는 박물관 공지를 함께 확인해야 한다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '주말 나들이 필수 코스! 서울생활사박물관 & 옴팡놀이터 예약 없이 다녀온 리얼 후기',
        href: 'https://blog.naver.com/foodnyou/224172482456',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '주말 나들이 필수 코스! 서울생활사박물관 & 옴팡놀이터 예약 없이 다녀온 리얼 후기',
        ogDescription:
          '주말 나들이 고민 해결! 서울생활사박물관 & 옴팡놀이터 안녕하세요! 딸아이와 함께 매일매일 알찬 교...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDVfNjIg%2FMDAxNzcwMjU4MzI1OTEz.Ts5n5_2XvL68a53QcG-vDDqqe9vwXuksMbqVs8bp5PEg.ee8aYSgyc6bq3I2mTP90B5X3dlhfi0Wtk67iByqbn_Eg.PNG%2F900%25A3%25DF%25C5%25A9%25B8%25B2%25BB%25F6_%25B1%25F2%25B2%25FB%25C7%25D1_%25B5%25D5%25B1%25D9_%25B9%25DA%25BD%25BA_%25BA%25ED%25B7%25CE%25B1%25D7_%25C4%25AB%25B5%25E5%25B4%25BA%25BD%25BA_%25C0%25CE%25BD%25BA%25C5%25B8%25B1%25D7%25B7%25A5_%25C6%25F7%25BD%25BA%25C6%25AE%25A3%25DF20260205%25A3%25DF112211%25A3%25DF0000.png%23900x900&type=ff192_192',
      },
      {
        title: '서울생활사박물관 옴팡놀이터 현장예약 후 이용 후기',
        href: 'https://blog.naver.com/daisysbonvoyage/224258478934',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울생활사박물관 옴팡놀이터 현장예약 후 이용 후기',
        ogDescription:
          '📍영업시간 : 화~일 09:00 - 18:00 (월요일 휴무) 지하철로 방문시 태릉입구역 4번출구를 이용하시면 됩...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjBfMjc4%2FMDAxNzc2NjUxMzE5MTI1.Mzl_aSD77HtD5DoShGdWyY3kxrE7VVRlV2beHMgMUXAg.b2B0ImRM_-Ncy2ivvfLMfKvbWT_eAyfyQ2_kHO8kpVwg.JPEG%2F%25C1%25A6%25B8%25F1%25C0%25BB_%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4..jpg%23800x800&type=ff192_192',
      },
      {
        title:
          '노원 실내 아이랑 가볼만한 곳 서울생활사박물관 옴팡놀이터 주차 및 후기',
        href: 'https://blog.naver.com/cleanus9/224198621625',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '노원 실내 아이랑 가볼만한 곳 서울생활사박물관 옴팡놀이터 주차 및 후기',
        ogDescription:
          '서울생활사박물관에서 집까지 걸어서 5분거리!! 생활사박물관안에 있는 옴팡놀이터는 정말 말그대로 동네 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMjdfMjU1%2FMDAxNzcyMjAwMjk2Mjk0.tUGJXwxnXpBYXwLOmUFf87Nqxw3FZBqtKLGFV2fzfY4g.7lgOTQqwTjemwBeL5cMKeTmdCtoClaWho2TCYAN5qLAg.JPEG%2F900%25A3%25DF20260219%25A3%25DF173603.jpg%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'gwangnaru-safety-experience-center',
    name: '광나루안전체험관',
    region: 'seoul',
    subRegion: '광진구',
    category: 'experience',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'free',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl: 'https://fire.seoul.go.kr/gwangnaru/main/main.do',
    verifiedAt: '2026-05-07',
    lastObservedAt: '2026-05-07',
    verificationStatus: 'official_verified',
    description:
      '재난·생활안전을 체험형으로 배우는 서울시 안전 체험관. 초등 저학년과 교육형 실내 나들이로 맞다.',
    address: '서울특별시 광진구 능동로 238 서울시민안전체험관',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '무료',
    rainFriendly: true,
    stayMinutes: 120,
    operatorType: 'public',
    editorNote:
      '체험별 연령 제한과 예약 가능 회차가 달라 어린이 동반 시 프로그램 조건 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '서울 아이와 가볼만한곳 광나루안전체험관 예약 방문후기',
        href: 'https://blog.naver.com/chzh10000/224236818555',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle: '서울 아이와 가볼만한곳 광나루안전체험관 예약 방문후기',
        ogDescription:
          '서울 광진구 (어린이 대공원 근처) 아이와 가볼만한곳으로 추천하는 광나루 안전체험관 다녀왔어요 아이와 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMzBfMjI0%2FMDAxNzc0ODgxNjY2NDI2.Ubcx8zSGLmQUojlEQdd42UyYoWqkj-GZa10Uo88zIK0g.Mn95x6fPeXFxpbvbBcnb9mBEhqEOa-HIF8UAqJMQgH0g.JPEG%2F20260330234100.jpg%231080x1080&type=ff192_192',
      },
      {
        title:
          '광나루안전체험관 새싹어린이안전체험 + 사회재난 체험 7세 아이 후기',
        href: 'https://blog.naver.com/rudwn0209/224243707356',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle:
          '광나루안전체험관 새싹어린이안전체험 + 사회재난 체험 7세 아이 후기',
        ogDescription:
          '안녕하세요. 지난번 아이들과 함께 다녀온 광나루안전체험관 화재안전체험 이후 만족도가 정말 높아서 이번...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MDdfMTkw%2FMDAxNzc1NTMwMjU3MzE4.2kQdyODIO4NnfvSagwimzLS43ONJ355vx9-bD6dESxEg.ThzBv2V6kctpeDi4SgUS5aLbjCIONPmPl3VZwhHg9sUg.JPEG%2Foutput%25A3%25DF1025622162.jpg%23900x900&type=ff192_192',
      },
      {
        title:
          '아이들과 성인 모두 무료인 서울 광진구 광나루안전체험관 (자연재난,화재안전,사회재난 전체 후기)',
        href: 'https://blog.naver.com/kj930426/224262538044',
        sourceLabel: 'Naver Blog',
        description:
          '입장 흐름과 아이 동반 관람 분위기를 가늠하기 좋은 후기입니다.',
        ogTitle:
          '아이들과 성인 모두 무료인 서울 광진구 광나루안전체험관 (자연재난,화재안전,사회재난 전체 후기)',
        ogDescription:
          '안녕하세요 오늘은 아이들도 어른들도 남녀노소 모두 무료로 체험 가능한 "광나루안전체험관" 방문 후기...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjBfMzUg%2FMDAxNzc2Njg2NjEwODgz.FEYRkUx5-tULeQN3YHhWKtWMzq3FboSIpzG8TSS-84Ig.4ga5iyakjO5NgjXBunWNT3nu555XeGORzfB-3Gu_Fkcg.GIF%2F2299682138.gif%23282x500&type=ff192_192',
      },
    ],
  },
  {
    id: 'songpa-book-museum-bookium',
    name: '송파책박물관 북키움',
    region: 'seoul',
    subRegion: '송파구',
    category: 'library',
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'free',
    reservationRequired: true,
    parking: true,
    sourceType: 'official',
    sourceUrl: 'https://www.bookmuseum.go.kr/',
    verifiedAt: '2026-05-07',
    lastObservedAt: '2026-05-07',
    verificationStatus: 'official_verified',
    description:
      '책과 동화를 주제로 한 어린이 전시·체험 공간. 송파권 비 오는 날 독서형 실내 코스로 좋다.',
    address: '서울특별시 송파구 송파대로37길 77',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '무료',
    rainFriendly: true,
    stayMinutes: 90,
    operatorType: 'public',
    editorNote:
      '북키움 프로그램은 예약 회차가 별도로 운영될 수 있어 박물관 공지와 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '송파책박물관 북키움 아이랑(예약, 시간, 주차)',
        href: 'https://blog.naver.com/salanghe96/224066347031',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '송파책박물관 북키움 아이랑(예약, 시간, 주차)',
        ogDescription:
          '책 좋아하는 아이와 책육아 하면서 꼭 한번 가보고 싶었던 송파책박물관. 그 안에서도 아이랑 가기 좋은 북...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTExMDJfMTAg%2FMDAxNzYyMDYwMjE5NDYy.PviU_wV0mOM3qkNsfEJG5z_TCPk7Y5-dAz29EYzUctsg._8wDpqWJEe0bLrAoeJi-tllgTtDEDoaHU0RcrsTfejQg.JPEG%2F900%25A3%25DF20251102%25A3%25DF133406.jpg%23900x900&type=ff192_192',
      },
      {
        title:
          '송파책박물관 - 잠실 아이랑 가볼만한 곳, 안 가면 손해(전시, 도서관)',
        href: 'https://blog.naver.com/ettomon/224263263746',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '송파책박물관 - 잠실 아이랑 가볼만한 곳, 안 가면 손해(전시, 도서관)',
        ogDescription:
          '송파책박물관, 잠실 아이랑 가볼만한 곳 안 가면 손해(전시, 도서관) written by ettmon 안녕하세요. 몇 주...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjNfMTUg%2FMDAxNzc2OTIxNTg2NDM4.e5baT6gQUX2Q-aL7bfSkM6NCpTE1-ChZwqfNOb604_Yg.sSkvuqtQh9S7KivvOYuDrpv6utiL6iFaKHy3qCLnl-sg.JPEG%2FIMG%25A3%25DF0404.jpg%23900x1200&type=ff192_192',
      },
      {
        title: '서울 아이와 실내 가볼만한 곳, 송파책박물관 북키움 7세 후기',
        href: 'https://blog.naver.com/kindly2day/224151283253',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울 아이와 실내 가볼만한 곳, 송파책박물관 북키움 7세 후기',
        ogDescription:
          '서울 아이와 실내 가볼만한 곳 송파책박물관 (북키움) 겨울 방학, 추운 날씨가 계속되던 날이었다. 아이와 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDFfMTY3%2FMDAxNzY5OTU1NTgwNzg2.TNoPOAnXH9eaMRoQYdFLend9epe6mc0LNsVPRU1fR8cg.Wx2lBNQ4JntGP4A-cRqX8IdaYf0iK34dcc8m-c0rv4Ig.JPEG%2Foutput%25A3%25DF215164989.jpg%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-sangdo3',
    name: '서울형 키즈카페 동작구 상도3동점(동작키즈카페)',
    region: 'seoul',
    subRegion: '동작구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DJ221102',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 동작구 상도3동점(동작키즈카페)',
      '서울특별시 동작구 상도로15가길 16'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '상도3동 생활권에서 회차제로 이용하는 공공 실내놀이터. 동작구 영유아·미취학 아동의 비 오는 날 놀이 후보로 쓰기 좋다.',
    address: '서울특별시 동작구 상도로15가길 16',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '동작구 서울형키즈카페 상도3동점 후기 10개월아기랑',
        href: 'https://blog.naver.com/kimu7/224145932264',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '동작구 서울형키즈카페 상도3동점 후기 10개월아기랑',
        ogDescription:
          '서울형키즈카페 상도3동점 🧸운영시간 평일(화 ~ 금) 1회차 9:50 ~ 11:00 (개인,단체) 2회차 13:30 ~ 15:...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMTNfMjQ4%2FMDAxNzY4MzEyNDY4NjY4.KW1oTxPjZBe2xBZdzgcvrlYjElB3JSZzYvUSTFzhecUg.mftKt9TOH20puHem0PdJi3H85O_yXmIUSFtxxQF75Ekg.JPEG%2F900%25A3%25DF20260104%25A3%25DF141155.jpg%23635x635&type=ff192_192',
      },
      {
        title:
          "[서울 상도동] 높은 층고, 실내 짚라인 '서울형키즈카페 상도3동점' 후기",
        href: 'https://blog.naver.com/seohee125/223982159540',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          "[서울 상도동] 높은 층고, 실내 짚라인 '서울형키즈카페 상도3동점' 후기",
        ogDescription:
          '사설 키즈카페도 가기는 하지만 매번 가기엔 비용부담이 있어서 서울형키즈카페도 이용하고 있어요. 다둥이...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MjRfMjEw%2FMDAxNzU2MDQyMTQwNzI4.fi2F5WCkTFHBmhXo7df-tM0FqRR0ihkKz7JdZ1kVDvEg.tsoYJjXTdh1Yyx8xnyTllpVnEJQxSpOMRzGySEt3Hvgg.JPEG%2FIMG_2391.jpg%23900x1200&type=ff192_192',
      },
      {
        title: '동작구 키즈카페 주말에도 여유 있던 서울형키즈카페 상도3동점',
        href: 'https://blog.naver.com/ha_yoony/224225019461',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '동작구 키즈카페 주말에도 여유 있던 서울형키즈카페 상도3동점',
        ogDescription:
          '주말에 아기랑 어디가지.. 싶은데 북적이는 건 싫고 멀리 가기도 부담일 때 저는 서울형키즈카페에 갑니다....',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMjFfMjIz%2FMDAxNzc0MTAyMTc5Mjk1.UbWv7FP2m0ybqT26kjfSHKtDyobe9gkQnN63Y-AonN8g.PMGidPYWmwH6353s3FMFXZgGQZfHfvjluctFrtwi4c4g.JPEG%2F20260315%25A3%25DF092017.jpg%233000x4000&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-daebang',
    name: '서울형 키즈카페 동작구 대방동점(동작키즈카페)',
    region: 'seoul',
    subRegion: '동작구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DJ230701',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 동작구 대방동점(동작키즈카페)',
      '서울특별시 동작구 여의대방로36길 11'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '대방동 생활권에서 가까운 공공형 실내 놀이공간. 어린 영유아와 짧은 회차로 이용하기 좋은 동네형 키즈카페다.',
    address: '서울특별시 동작구 여의대방로36길 11',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '서울형 키즈카페 동작구 대방동점 동작키즈카페 후기 예약 꿀팁·가격·위치·시설 총정리',
        href: 'https://blog.naver.com/awisesoul/224258287361',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 동작구 대방동점 동작키즈카페 후기 예약 꿀팁·가격·위치·시설 총정리',
        ogDescription:
          '안녕하세요, 임신.출산.육아 꿀팁을 가득 안고 돌아온 와쏘맘 인사드려요🧡 요즘 독감도 유행이고 날씨도...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjBfNDQg%2FMDAxNzc2NjM4OTMwNjQy.SC-fJGn6sz8tzCEhH2_WKju6wf6ms0UUIt7AzgxffM4g.xhW70g8cCkAP4xG-bF58XyxmsqYNpvsQGutSi-tHLigg.JPEG%2F900_SNOW_20251024_135017_709.jpg%23924x1224&type=ff192_192',
      },
      {
        title:
          '서울형키즈카페 동작구 대방동점 후기 ㅣ 가정보육 두 아이와 다녀온 솔직 방문기, 보라매공원 근처 실내놀이터 추천',
        href: 'https://blog.naver.com/skyminjee620/224184139503',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형키즈카페 동작구 대방동점 후기 ㅣ 가정보육 두 아이와 다녀온 솔직 방문기, 보라매공원 근처 실내놀이터 추천',
        ogDescription:
          'ㅣ가정보육하며 우리 가족이 자주 찾는 필수 실내코스, 서울형키즈카페. 언제나 부담 없이 갈 수 있어 더 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMzBfNjcg%2FMDAxNzc0ODQ4MjMzMjQ4.Yalu8wDMgJyZVskj6W6IZPBEpDxA-Zr1HtWK4EMqoh8g.QnAkHCz9VIV5-aTasoKqDjCZhkeDiD4WCrGXoyZNmUwg.PNG%2F%25BC%25AD%25BF%25EF%25C7%25FC%25C5%25B0%25C1%25EE%25C4%25AB%25C6%25E4_%25B5%25BF%25C0%25DB%25B1%25B8_%25B4%25EB%25B9%25E6%25B5%25BF%25C1%25A1_%25C8%25C4%25B1%25E2.png%23960x960&type=ff192_192',
      },
      {
        title: '서울형 키즈카페 대방동점 방문 후기_시설 안내와 추천 포인트',
        href: 'https://blog.naver.com/ssososong/223993722881',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 키즈카페 대방동점 방문 후기_시설 안내와 추천 포인트',
        ogDescription:
          '안녕하세요!! 저번 글에 이어서 오늘은 서울형 키즈카페 대방동점을 다녀온 후기를 공유하려고 해요. 아이...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MDNfMjMy%2FMDAxNzU2ODc1MzA5NTc5.bJVG3o7sfUfKoKXeFOIabi1hJuUnVtZZ8Lz_-sXYcggg.maD6f-Nc0eNkEBBhVm0zbGnMY6ayepBvnPyUycwUbdEg.JPEG%2Foutput_3650981739.jpg%23895x545&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-sangdo4-1',
    name: '서울형 키즈카페 동작구 상도4동 1호점(동작키즈카페)',
    region: 'seoul',
    subRegion: '동작구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DJ240701',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 동작구 상도4동 1호점(동작키즈카페)',
      '서울특별시 동작구 성대로 180'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '상도4동에서 이용 가능한 공공 실내 놀이 거점. 미취학 아동 중심의 근거리 실내 나들이 후보로 적합하다.',
    address: '서울특별시 동작구 성대로 180',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-sangdo4-2',
    name: '서울형 키즈카페 동작구 상도4동 2호점(동작키즈카페)',
    region: 'seoul',
    subRegion: '동작구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DJ241004',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 동작구 상도4동 2호점(동작키즈카페)',
      '서울특별시 동작구 성대로16길 21'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '상도4동 두 번째 공공 키즈카페 지점. 영유아 동반 가정이 날씨와 상관없이 예약제로 이용하기 좋은 실내 공간이다.',
    address: '서울특별시 동작구 성대로16길 21',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-heukseok',
    name: '서울형 키즈카페 동작구 흑석동점(동작키즈카페)',
    region: 'seoul',
    subRegion: '동작구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DJ241006',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 동작구 흑석동점(동작키즈카페)',
      '서울특별시 동작구 서달로 129'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '흑석동 생활권에서 이용하는 예약형 공공 키즈카페. 짧은 체류의 실내 놀이 일정으로 넣기 좋다.',
    address: '서울특별시 동작구 서달로 129',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '서울형 키즈카페 흑석동점 후기 겨울에 아기랑 갈만한곳 10개월아기랑',
        href: 'https://blog.naver.com/kimu7/224162906019',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 흑석동점 후기 겨울에 아기랑 갈만한곳 10개월아기랑',
        ogDescription:
          '서울형 키즈카페 흑석동점 👶운영시간 화 ~ 금 9:30 - 17:30 월요일휴무 🚩주소 서울특별시 동작구 서...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMjhfMjE3%2FMDAxNzY5NTg1MDkwOTEy.9deMFtsStFUR-17Wwww7MAXD_sQpuPWtSXqUoPHGlNsg.J99ALQWqvG0sfZVQDxar058hFgwMMjkAAidTschnnhwg.JPEG%2F900%25A3%25DF20260109%25A3%25DF164401.jpg%23900x900&type=ff192_192',
      },
      {
        title: '서울형 키즈카페 동작구 흑석동점 예약 방문 주차 후기',
        href: 'https://blog.naver.com/yejiym9012/224160067551',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 키즈카페 동작구 흑석동점 예약 방문 주차 후기',
        ogDescription:
          '가격이 저렴한 서울형 키즈카페를 예약해서 자주 이용하고 있다. 이번에는 집 근처에 있는 서울형 키즈카페...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMjVfMTk0%2FMDAxNzY5MzExOTI0NDk0.zNrttVuUMA7Q9WgYR6Jyteo5zxHgT81qf33NXjPUg_0g.1r5QZEbRuxhUArtnQvPinhHF8CPrGbFV9vXi4e6l67sg.JPEG%2F900%25A3%25DF1769311906062.jpg%23900x1200&type=ff192_192',
      },
      {
        title:
          '서울형키즈카페 동작구 흑석동점 내부시설, 주차정보, 유아코딩, 원어민영어프로그램',
        href: 'https://blog.naver.com/nhj43226/224253233406',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형키즈카페 동작구 흑석동점 내부시설, 주차정보, 유아코딩, 원어민영어프로그램',
        ogDescription:
          '안녕하세요! 오늘은 동작구에 거주하는 육아 가정이라면 꼭 알아야 할 곳을 소개해드릴게요. 바로 서울형키...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MTBfMjY2%2FMDAxNzc1Nzk4Njg2MTYz.EQnhPEYnPBnbiRBtY1MsmRwnb-ondeS95RdoWnxvp5gg.XFLd1j3FbIYzdhrHUAjzGlNRhxS2GCkGlGegXZqwzpcg.JPEG%2F%25A4%25BB%25A4%25A7.jpg%23869x869&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-sindaebang1',
    name: '서울형 키즈카페 동작구 신대방1동점(동작키즈카페)',
    region: 'seoul',
    subRegion: '동작구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DJ241008',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 동작구 신대방1동점(동작키즈카페)',
      '서울특별시 동작구 신대방11길 24'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '신대방1동에서 이용 가능한 공공 실내놀이터. 동작 남부권 영유아 동반 가족의 비상 실내 코스로 적합하다.',
    address: '서울특별시 동작구 신대방11길 24',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '서울형 키즈카페 신대방1동점 :: 아이와 미술놀이 후기 (동작키즈카페)/ 예약',
        href: 'https://blog.naver.com/hanaaa_01/224215042098',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 신대방1동점 :: 아이와 미술놀이 후기 (동작키즈카페)/ 예약',
        ogDescription:
          '서울형 키즈카페 신대방1동점 (동작키즈카페) 아이와 실내에서 편하게 놀 수 있는 곳을 찾다가 서울형 키즈...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTNfMTcg%2FMDAxNzczMzczOTQ3MDYw.8lM2mPDNpPTtyLZ_9P4Z6vqSpuFMEINEiBYn9h0JWf8g.-bYe15RHnTq_3z6HXgy9wYqLAWmJiNaJfPZG5PmmVHwg.JPEG%2Foutput%25A3%25DF759661175.jpg%23900x900&type=ff192_192',
      },
      {
        title: '신대방아이랑 미술놀이 가능한 신대방1동점 서울형키즈카페',
        href: 'https://blog.naver.com/als_6015/224177060080',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '신대방아이랑 미술놀이 가능한 신대방1동점 서울형키즈카페',
        ogDescription:
          '원톨찌콩 :-) 신대방1동점 미술놀이 서울형키즈카페 * 영업 시간 * 인원제한이 적다보니 예약잡기는 조금 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDlfNzYg%2FMDAxNzcwNjAyNzA5NDYw.qzpwVXaRys-R8hKBvYf7fG0DT2MrHftyblPWVTv-3ZYg.WoC1uPZG2cs06G1HV1zRwP3rNzTncr5Qq0GU9NoO26Ag.PNG%2FIMG%25A3%25DF5834.PNG%23900x900&type=ff192_192',
      },
      {
        title: '서울형키즈카페 신대방1동점 후기',
        href: 'https://blog.naver.com/minnndong_/223887604604',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 신대방1동점 후기',
        ogDescription:
          '안녕하세요!민동이에요 토욜마다 키즈카페 투어하는 접니다 남편이 일하니..까ㅠㅠ 아기랑 놀아줄수밖에 없...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA2MDJfMjgy%2FMDAxNzQ4ODY2NTcwMDIx.J8K-wvLnPD-L-9BuMNq-_zKkUgJjibBG_JO3djjoAUMg.tXC6Oril9dGQCPAU9a2l-Hein9ErTlhyigJun7d-q2og.JPEG%2FIMG%25A3%25DF4594.jpg%23900x676&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-sangdo1-1',
    name: '서울형 키즈카페 동작구 상도1동 1호점(동작키즈카페)',
    region: 'seoul',
    subRegion: '동작구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DJ241201',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 동작구 상도1동 1호점(동작키즈카페)',
      '서울특별시 동작구 상도로47아길 44-1'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '상도1동에서 예약제로 운영되는 공공형 놀이공간. 미취학 아동의 동네 실내 놀이 장소로 활용하기 좋다.',
    address: '서울특별시 동작구 상도로47아길 44-1',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-sangdo2',
    name: '서울형 키즈카페 동작구 상도2동점(동작키즈카페)',
    region: 'seoul',
    subRegion: '동작구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DJ241202',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 동작구 상도2동점(동작키즈카페)',
      '서울특별시 동작구 양녕로 220'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '상도2동 생활권의 회차형 공공 실내놀이터. 날씨 영향을 적게 받는 짧은 놀이 일정으로 쓰기 좋다.',
    address: '서울특별시 동작구 양녕로 220',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '[서울형 키즈카페] 동작구 상도2동점 방문후기 (27개월 아기와)',
        href: 'https://blog.naver.com/busandaddybear/224146884540',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '[서울형 키즈카페] 동작구 상도2동점 방문후기 (27개월 아기와)',
        ogDescription:
          '네번째 방문 후기 서울형 키즈카페 동작구 상도2동점(동작키즈카페) 안녕하세요 육아하는 부산아빠곰입니다...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMTRfMTU4%2FMDAxNzY4Mzk4MjcxNDkx.DJn8PO9Om88A-9W3jSJDfc7lN8Wuujy1ouJ7ffn5OB4g.1U_SdUPYut9HXJi6Zw2ONYfx5oyD_imAek1pL2SO5kMg.JPEG%2F0.%25B8%25DE%25C0%25CE%25C0%25CC%25B9%25CC%25C1%25F6.jpeg%232123x2122&type=ff192_192',
      },
      {
        title: '동작구 서울형키즈카페 상도2동점 후기 주차 예약방법 추천',
        href: 'https://blog.naver.com/kimu7/224246109729',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '동작구 서울형키즈카페 상도2동점 후기 주차 예약방법 추천',
        ogDescription:
          '서울형키즈카페 동작구 상도2동 키즈카페 - 👶영업시간 평일 1회차 9:50 ~ 11:50 2회차 13:30 ~ 15:30 3...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMjZfMTQz%2FMDAxNzc0NDk1MTMwODY3.uPC-CsrzC4Xd2JKb-u1zzMFZ3dBplgSADU_SNPfsaTgg.EgpXB1Fx57hYf0iXS5pg4SOr5u-9TvDONvpQFMboUFIg.JPEG%2F900%25A3%25DF20251030%25A3%25DF145434.jpg%23675x675&type=ff192_192',
      },
      {
        title: '16개월 아기랑 역대급 서울형키즈카페 동작구 상도2동점 방문 후기',
        href: 'https://blog.naver.com/lrh111/224185857711',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '16개월 아기랑 역대급 서울형키즈카페 동작구 상도2동점 방문 후기',
        ogDescription:
          '얼마 전 아기와 서울형키즈카페 동작구 상도2동점을 다녀왔습니다! 지금까지 가본 서울형키즈카페 중 가장 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMTZfNDgg%2FMDAxNzcxMjQ5NzM2MjUz.n__Ocu9kyKNPnPqzEJ9N7UDt6jj2QMFpN6RlZtjM7QQg.dJIlernC-2HnUSm648VnAr1JcKT2O_ISyO5DV9t8yTEg.JPEG%2Foutput%25A3%25DF781346242.jpg%23900x676&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-sadang3',
    name: '서울형 키즈카페 동작구 사당3동점(동작키즈카페)',
    region: 'seoul',
    subRegion: '동작구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DJ241203',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 동작구 사당3동점(동작키즈카페)',
      '서울특별시 동작구 사당로23길 254'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '사당권에서 이용 가능한 동작구 공공 키즈카페. 영유아 동반 가족의 근거리 실내 대안으로 적합하다.',
    address: '서울특별시 동작구 사당로23길 254',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '서울형 키즈카페 동작구 사당3동점 예약 방문 주차 후기',
        href: 'https://blog.naver.com/yejiym9012/224189342305',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 키즈카페 동작구 사당3동점 예약 방문 주차 후기',
        ogDescription:
          '매주 복덩이와 오전 시간을 잘 보내기 위해 최근에는 서울형 키즈카페 동작구 사당 3동점을 방문했다. 이러...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMTJfMjcz%2FMDAxNzcwODg0MjkwMjQw.OUp4Y-JIK5nukryTTv9fwhYeunOBL2hu0YLvIGCgNEUg.sM6a1T17_RypOiFHhqeP3QUjvIhvMyLJubU_j3zk7ssg.JPEG%2F900%25A3%25DF1770884264821.jpg%23900x1200&type=f250_208',
      },
      {
        title:
          '서울형키즈카페 동작구 사당3동점 아이 키우는 집이라면 꼭 가봐야 하는 곳!',
        href: 'https://blog.naver.com/kimhansola/224083708501',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형키즈카페 동작구 사당3동점 아이 키우는 집이라면 꼭 가봐야 하는 곳!',
        ogDescription:
          '주말마다 아이랑 어디 갈지 고민하는 건 전국 육아하는 엄마아빠의 숙명 이번엔 사당역 근처에 새로 생긴 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MjBfMjgy%2FMDAxNzU4MzMyNDIyMzY5.hmuZ7_RD6LUPJHG3NQEvWYwBOPIVUUUILo46WgJEU3sg.1JAU05_dH8116bR4eReZz9hyQoRIpqF5bYO6kB4iaH0g.JPEG%2F900%25A3%25DF20250912%25A3%25DF152543.jpg%23900x675&type=ff192_192',
      },
      {
        title:
          '서울형키즈카페 동작구 사당3동점 :: 두돌 아이랑 주차 가능 서울형키카 방문',
        href: 'https://blog.naver.com/h-hwan/223981240372',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형키즈카페 동작구 사당3동점 :: 두돌 아이랑 주차 가능 서울형키카 방문',
        ogDescription:
          '지난번에는 상도2동점을 방문했고 어제는 사당3동점을 다녀왔어요!! 서울형키즈카페는 미리 예약 후 방문해...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MjRfMjMy%2FMDAxNzU1OTkxNDgyMDUx.DkWv2v_mEtKE6KJYFJq11PiZxeboghnuCZQ8xbRYdQog.90VfByzQNcDQl7BEr4XxcqTSXGfrEjNVc8mMJiIyyjIg.GIF%2FIMG%25A3%25DF0182.gif%23500x889&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-sangdo1-2',
    name: '서울형 키즈카페 동작구 상도1동 2호점(동작키즈카페)',
    region: 'seoul',
    subRegion: '동작구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DJ241204',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 동작구 상도1동 2호점(동작키즈카페)',
      '서울특별시 동작구 매봉로 1'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '상도1동의 추가 공공 키즈카페 지점. 동작구 내 여러 회차형 공공 놀이공간 중 하나로 선택지를 넓혀준다.',
    address: '서울특별시 동작구 매봉로 1',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-balsan1',
    name: '서울형 키즈카페 강서구 발산1동점',
    region: 'seoul',
    subRegion: '강서구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GS230801',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 강서구 발산1동점',
      '서울특별시 강서구 수명로2길 50'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '발산1동 생활권의 예약형 공공 실내놀이터. 강서구 서부권 가족이 가까운 놀이 회차를 찾을 때 활용하기 좋다.',
    address: '서울특별시 강서구 수명로2길 50',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '[서울강서] 서울형키즈카페 강서구 발산1동점 후기! (놀이공간/주차/위치)',
        href: 'https://blog.naver.com/syeon_nolja/224167980005',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[서울강서] 서울형키즈카페 강서구 발산1동점 후기! (놀이공간/주차/위치)',
        ogDescription:
          '안녕하세요~ 러블리다누맘이에요! 오늘은 서울형키즈카페 강서구 발산1동점을 소개해보려고해요~ㅎㅎ 다누...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDFfMTI5%2FMDAxNzY5OTUwODU0NTM1.-0Nl3n2ybk1_rE56cdyJzDuSF9uZgRd8-NvYhWu2Ijkg.UkNZ6Jk4lsy3lW-2bVQ7loLz4p6lB5gaKXgaWy-0fbAg.JPEG%2F%25C1%25A6%25B8%25F1%25C0%25BB_%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4._%252824%2529.jpg%231080x1080&type=f250_208',
      },
      {
        title:
          '서울형 키즈카페 강서구 발산1동점, 놀이로 배우는 수학 체험 전시 및 예약방법,주차 등 솔직이용후기',
        href: 'https://blog.naver.com/happy_sy1107/224229604071',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 강서구 발산1동점, 놀이로 배우는 수학 체험 전시 및 예약방법,주차 등 솔직이용후기',
        ogDescription:
          '안녕하세요 이웃여러분~:) 오늘은 예전에 방문했는데 어흥이가 좋아했던 서울형 키즈카페에 대해 설명해 드...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMjVfMjIg%2FMDAxNzc0NDQ1NDEyNjUz.mt9secrK7dKY9cHG9X1dIuFgFjeRFaxm4QdHi98qjNIg.2oO5qbnegvMBLi8m8pP9YAr4dQ489uPVsACWpGFfNCog.JPEG%2F900%25A3%25DF20260322%25A3%25DF155519.jpg%23600x450&type=ff192_192',
      },
      {
        title: '"아이가 안 나오려 한다" 서울형키즈카페 발산1동점 예약 후기',
        href: 'https://blog.naver.com/ubue/224228418771',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '"아이가 안 나오려 한다" 서울형키즈카페 발산1동점 예약 후기',
        ogDescription:
          '안녕하세요, 여행지에 맞춘 스탬프투어를 직접 만들며 아이와 여행하는 한량워킹맘입니다. 스탬프 여행하는...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMjRfMjg4%2FMDAxNzc0MzYzMDk0NjQy.dCndorpO7Jp1rpDdc3uKGLLinpo_JHVXXIdkWjRw2Q0g.J5cl5-uQL_R6PpPrAyIkL5uvPcCKLpeuu6QMLu5dZX8g.PNG%2F%25BD%25E6%25B3%25D7%25C0%25CF_%25281%2529.png%23800x800&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-hwagok3',
    name: '서울형 키즈카페 강서구 화곡3동점',
    region: 'seoul',
    subRegion: '강서구',
    category: 'public-play',
    ageBands: ['3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GS240802',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 강서구 화곡3동점',
      '서울특별시 강서구 강서로 231'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '화곡3동에서 예약제로 이용하는 공공형 실내 놀이공간. 미취학 아동과 비 오는 날 방문 후보로 묶기 좋다.',
    address: '서울특별시 강서구 강서로 231',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '강서구 아이랑 갈만한 곳 | 서울형키즈카페 화곡3동점 방문 후기',
        href: 'https://blog.naver.com/unspecialhome/224218145341',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '강서구 아이랑 갈만한 곳 | 서울형키즈카페 화곡3동점 방문 후기',
        ogDescription:
          '남편이 마곡에 볼일이 있어서 근처에서 아기랑 놀 곳을 찾다가 서울형키즈카페 강서구 화곡3동점을 방문하...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTVfMjg0%2FMDAxNzczNTg1ODcyMzQ5.gkIlxWL7yZRdT_xrnWZTXLeIhPSuOUc6OWqkD2rVF5kg.-Ecyg_qQeU5s3qGJM9aEzOKNqGRp06HOO3pNabuqPssg.JPEG%2FIMG%25A3%25DF2707.JPG%23900x1200&type=ff192_192',
      },
      {
        title:
          '서울형 키즈카페 강서구 우장산 화곡3동점 이용 후기 (예약 방법부터 시설까지)',
        href: 'https://blog.naver.com/heeduck_/224019577356',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 강서구 우장산 화곡3동점 이용 후기 (예약 방법부터 시설까지)',
        ogDescription:
          '서울시가 운영하는 공공형 키즈카페, 서울형 키즈카페 강서구 화곡3동점은 합리적인 가격과 안전한 환경 덕...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MjNfMTcw%2FMDAxNzU4NjI3NDkyMDY0.nrQzTgSSbBls4nBH64hHBYUXS_jhPwwe7Dk-WgYyb3sg.ZbKwo65s1whsg5r_PegClhaj34bljrqd1p_9UF5Iu4Eg.JPEG%2FIMG%25A3%25DF8416.jpg%23900x1200&type=ff192_192',
      },
      {
        title: '서울형 키즈카페 강서구 화곡3동점 33개월 아기 후기',
        href: 'https://blog.naver.com/wjstmdal_/224176038279',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 키즈카페 강서구 화곡3동점 33개월 아기 후기',
        ogDescription:
          '발산에서 저녁에 결혼식이 있어 아기 낮잠 재울 겸 미리 강서구로 넘어가기로 했다 시간이 떠서 서울형 키...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDhfMjg1%2FMDAxNzcwNTI0NzA2Mjk0.tzmAB38MI-GOhFTGRimVWXXKSdZUW4fr9UWC3vqa_mcg.5nWUkuLYShFOdM7ojAD2CLmgP4rrDo10ja2tfW7Hi3Ig.JPEG%2FIMG%25A3%25DF2087.jpg%23900x676&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-hwagok4',
    name: '서울형 키즈카페 강서구 화곡4동점',
    region: 'seoul',
    subRegion: '강서구',
    category: 'public-play',
    ageBands: ['3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GS241201',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 강서구 화곡4동점',
      '서울특별시 강서구 곰달래로53길 80'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '화곡4동 생활권의 공공 실내놀이터. 강서구 미취학 아동 동반 가족의 근거리 놀이 선택지로 적합하다.',
    address: '서울특별시 강서구 곰달래로53길 80',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-bukgajwa1',
    name: '서울형 키즈카페 서대문구 북가좌1동점',
    region: 'seoul',
    subRegion: '서대문구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=SM240501',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 서대문구 북가좌1동점',
      '서울특별시 서대문구 수색로8길 48-4'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '북가좌1동에서 운영되는 공공형 실내 놀이공간. 서대문 서북권 아이 동반 실내 코스로 검토하기 좋다.',
    address: '서울특별시 서대문구 수색로8길 48-4',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '서대문구 서울형키즈카페 북가좌1동점 다정다감 놀이터(주차, 후기)/아이랑 갈만한곳',
        href: 'https://blog.naver.com/ettomon/224174843841',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서대문구 서울형키즈카페 북가좌1동점 다정다감 놀이터(주차, 후기)/아이랑 갈만한곳',
        ogDescription:
          '서대문구 서울형키즈카페 북가좌1동점 다정다감 놀이터/아이랑 갈만한곳 written by ettomon 안녕하세요. ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDdfMjc1%2FMDAxNzcwNDE2ODMzODY2.hfMtYkcMDEyTGCyIS2r6zkUy28Vp32NFQ0hhP_WWE_og.8jVXrdar_J3pMHjXZBkaDsfN7maWHAiUUaiERqeUMw8g.JPEG%2FIMG%25A3%25DF5074.jpg%233024x4032&type=ff192_192',
      },
      {
        title:
          '[서울형 키즈카페 서대문구 북가좌1동점 후기] 2천원으로 2시간을 알차게 보낸 다정다감 키즈카페!',
        href: 'https://blog.naver.com/click0303/224074131980',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[서울형 키즈카페 서대문구 북가좌1동점 후기] 2천원으로 2시간을 알차게 보낸 다정다감 키즈카페!',
        ogDescription:
          '서울형 키즈카페를 항상애용하는 우리가족이 자주방문하는 지점을 리뷰하려고합니다! 서울형키즈카페의 장...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTExMTNfNjQg%2FMDAxNzYyOTYyNTIyNjcx.brSU_Mxe9tkOIImYuYtX7hSu8Po-vxfnAJrHpuCOLX8g.64cf28eC3ftWg8jiX00G6fLPaui9JNIuzdrpBFpvMQEg.JPEG%2Foutput%25A3%25DF311387755.jpg%23748x841&type=ff192_192',
      },
      {
        title:
          '아이와 함께 갈만한 놀이공간들, 1-2.서울형키즈카페 서대문구 북가좌1동점(다정다감 키즈카페)방문',
        href: 'https://blog.naver.com/thdgml216/224158446051',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '아이와 함께 갈만한 놀이공간들, 1-2.서울형키즈카페 서대문구 북가좌1동점(다정다감 키즈카페)방문',
        ogDescription:
          '이제 서울형키즈카페를 한번도 안가본 사람은 거의 없을 것 같아요. 그래서 예약방법은 따로 올리지 않을게...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMjRfMTEx%2FMDAxNzY5MjUzMjAxOTU3.Sw0Arq3uUM3WUnoO7JjLuRA36pGkKg0w3lZyfZPXzjEg.4KAY2jNaK43kKcsgG48i0FYeL4xF513sIFREunptL7Ug.JPEG%2FIMG%25A3%25DF3976.jpg%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-hongje3',
    name: '서울형 키즈카페 서대문구 홍제3동점',
    region: 'seoul',
    subRegion: '서대문구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=SM250101',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 서대문구 홍제3동점',
      '서울특별시 서대문구 세검정로 104'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '홍제3동 생활권에 있는 예약형 공공 키즈카페. 비 오는 날 실내 놀이와 동네 돌봄 동선에 넣기 좋다.',
    address: '서울특별시 서대문구 세검정로 104',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '[서울형 키즈카페] 서대문구 홍제3동점 키즈땅 놀이터 방문',
        href: 'https://blog.naver.com/allecia0610/223934637381',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '[서울형 키즈카페] 서대문구 홍제3동점 키즈땅 놀이터 방문',
        ogDescription:
          "2018년생부터 2022년생까지 이용 가능한 홍제3동의 서울형 키즈카페 '키즈땅' 방문 후기를 공유해요 😊...",
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA3MTVfNjgg%2FMDAxNzUyNTQwMDEwMjc4.QNWT8Wgy35w2Fnsvlq-lvjZNREk6E9nVi2H1CmOL0Sog.y1hrM6-Zoyb9iT1hXaRZNcHcXYqTcQQUZ68wQvHucd4g.JPEG%2FIMG%25A3%25DF7778.JPG%23900x676&type=ff192_192',
      },
      {
        title: '서울형 키즈카페 홍제3동점 주차 예약 정보 서대문구 실내놀이터',
        href: 'https://blog.naver.com/heartqq3393/223959736104',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 키즈카페 홍제3동점 주차 예약 정보 서대문구 실내놀이터',
        ogDescription:
          '안녕하세요. 소노엄마에요 ^^ 오늘은 25년 7월 평일 오후, 하원 후 아이와 함께 다녀온 서울형 키즈카페 서...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA3MThfMTQx%2FMDAxNzUyODE5MDk4NzQ1.dgBGDJKqJ4ifQKyV72oz2qOxmaGnTlmgthvEoN8cVOUg.mbL2QarzjQomwEE_Mub7Oa3jNI7__I46S_hrhgW1mmQg.JPEG%2FIMG_5506.JPEG%232048x1536&type=ff192_192',
      },
      {
        title: '서울형 키즈카페 서대문구 홍제3동점(키즈땅놀이터)',
        href: 'https://blog.naver.com/kongzipick/224205184941',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 키즈카페 서대문구 홍제3동점(키즈땅놀이터)',
        ogDescription:
          '서울형 키즈카페란? 서울형 키즈카페는 서울시와 자치구가 함께 운영하는 공공형 실내 놀이터입니다. 일반 ...',
        ogImage:
          'https://phinf.pstatic.net/image.nmv/blog_2026_03_05_551/WvpOkrr6Js_01.jpg?type=w2',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-cheonyeon',
    name: '서울형 키즈카페 서대문구 천연동점',
    region: 'seoul',
    subRegion: '서대문구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=SM250102',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 서대문구 천연동점',
      '서울특별시 서대문구 독립문로8길 107'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '천연동에서 회차제로 이용하는 공공 실내놀이터. 서대문 도심권 가족의 짧은 실내 나들이 후보로 좋다.',
    address: '서울특별시 서대문구 독립문로8길 107',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '서대문 천연동 노리몽땅 | 서울형 키즈카페 예약 필수 주말 이용 후기 (일요일 휴무 · 주차 · 이용팁)',
        href: 'https://blog.naver.com/dltlsgo0870/224211162616',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서대문 천연동 노리몽땅 | 서울형 키즈카페 예약 필수 주말 이용 후기 (일요일 휴무 · 주차 · 이용팁)',
        ogDescription:
          '아이 키즈카페는 역시... 친구랑 가야 더 신난다는 걸 또 한 번 느낀 하루였습니다. 😊 아이 친구랑 약속 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMjBfMjk3%2FMDAxNzc0MDA1MjEwNTQ2.a9lPn_zvHD1KfG23dPr5e9RAVkxmQR89dWZIZx0X3UIg.WayTquJYugZf8NZfcTDdsnHx1VwI-EV6VeHU4wSDX0Ug.JPEG%2F900%25A3%25DFScreenshot%25A3%25DF20260320%25A3%25DF201210%25A3%25DFNaver_Blog.jpg%23900x1007&type=ff192_192',
      },
      {
        title:
          '[서울형 키즈카페 후기] 서대문구 천연동점｜프로그램은 만족, 주차는 어려운 편',
        href: 'https://blog.naver.com/reviewhada/224175652970',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[서울형 키즈카페 후기] 서대문구 천연동점｜프로그램은 만족, 주차는 어려운 편',
        ogDescription:
          '서울형 키즈카페를 직접 다녀보고, 엄마 혼자 기준 체감으로 기록합니다. 제 블로그에 처음 방문하신 분이...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMTZfMTEy%2FMDAxNzcxMjA3NDIyNzcw.IUEHE0B1-HpfulkU4yPl33etNDa0PpqYq8fXpgfMRosg.gr0xQiWj8aWsXLRSGw_l5nwa8yaTMIso_5CUqX09PHYg.PNG%2F%25BC%25AD%25B4%25EB%25B9%25AE%25B1%25B8_%25C3%25B5%25BF%25AC%25B5%25BF%25C1%25A11.png%231200x1200&type=ff192_192',
      },
      {
        title:
          '[서울형키즈카페 천연동점] 4살 아이와 방문 시설체험 솔직후기 (운영시간·주차·시설 총정리!)',
        href: 'https://blog.naver.com/banet1202/223928592922',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[서울형키즈카페 천연동점] 4살 아이와 방문 시설체험 솔직후기 (운영시간·주차·시설 총정리!)',
        ogDescription:
          '안녕하세요! Betti입니다 😊 4살 아이랑 어디 갈지 고민이라면? 부담 없는 가격에, 알찬 활동까지 가능...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA3MTBfMTkz%2FMDAxNzUyMTIyNzA2NzEz.KzzrWLHdVl-PbKms57Jsn-y_uOF2NOnNIc7Cf0yUhkYg.f3UMkuxR7qdsmvoXlLZj33V4s09OAbbaBeA43ADiOeQg.PNG%2FIMG%25A3%25DF4111.PNG%23900x1125&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-hoegi',
    name: '서울형 키즈카페 동대문구 회기동점',
    region: 'seoul',
    subRegion: '동대문구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DM250102',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 동대문구 회기동점',
      '서울특별시 동대문구 회기로18길 8'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '회기동 생활권의 공공 실내 놀이공간. 동대문구 영유아 동반 가족이 날씨와 상관없이 이용하기 좋다.',
    address: '서울특별시 동대문구 회기로18길 8',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '답십리1동점은 기존 데이터에 있어 제외했고, 공식 시설 상세가 확인된 회기동 지점만 새로 반영했다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '서울형 키즈카페 동대문구 회기동점 22개월 아기랑 방문 예약 정보 솔직후기',
        href: 'https://blog.naver.com/chaessay/224124630387',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 동대문구 회기동점 22개월 아기랑 방문 예약 정보 솔직후기',
        ogDescription:
          '서울형 키즈카페 동대문구 회기동점 후기 @chaessay 이번에 다녀온 곳은 서울형 키즈카페 동대문구 회기동...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMjdfNzYg%2FMDAxNzY2ODI5OTE4NzM2.vT5t6dbbuwBhWSazEQU4FkxxQEwc0oLAjqiseRRPf2Yg.swnIE7WgAt7K9VpbwEpvzctdBGtL6T0jX6-coKo5DGIg.JPEG%2Foutput%25A3%25DF1697478360.jpg%23900x900&type=ff192_192',
      },
      {
        title: '서울형키즈카페 동대문구 회기동점 주차 및 이용후기',
        href: 'https://blog.naver.com/todaysgoodnews/224161837373',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 동대문구 회기동점 주차 및 이용후기',
        ogDescription:
          '안녕하세요~~ 오늘 포스팅할 곳은 서울형 키즈카페 동대문구 회기동점입니다! 추운 겨울이라 외출이 어렵지...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMjdfMjI4%2FMDAxNzY5NTA5Mjc4NzY4.yCOSAK96OJ-NumZwkzAV3o4VM3R9AwAzAaPlWnFnuIgg.w8yoVaXhpjXg8-fEKZ5IGodjhgaTRujrjAdEsHJQGeAg.JPEG%2FIMG%25A3%25DF2680.jpg%23900x676&type=ff192_192',
      },
      {
        title:
          "서울형 키즈카페 동대문구 '회기동점' 룻교회 주차 가능! 어린 아가들 비 추천해요",
        href: 'https://blog.naver.com/cc_camping/224211013543',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          "서울형 키즈카페 동대문구 '회기동점' 룻교회 주차 가능! 어린 아가들 비 추천해요",
        ogDescription:
          '서울형 키즈카페 회기동점 문센 안가는 날이면 출근하는 서울형 키즈카페! 오늘 가본곳은 동대문구 회기동...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTBfMjQ4%2FMDAxNzczMTA2NTIzMjU2.VlITs_3_4LkxYT20RkqvfKoeYkTybuopgoZecFA-JTAg.t6gpv4_mHMZS_At9vv8ZDGCKJHQm7LSRhZLl2Tm_Bckg.JPEG%2FIMG%25A3%25DF6631.jpg%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-jegi',
    name: '서울형 키즈카페 동대문구 제기동점',
    region: 'seoul',
    subRegion: '동대문구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DM250301',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 동대문구 제기동점',
      '서울특별시 동대문구 약령시로7길 19'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '제기동에서 운영되는 공공형 실내놀이터. 0세부터 미취학 전후 아이까지 이용 후보로 살필 수 있다.',
    address: '서울특별시 동대문구 약령시로7길 19',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '[제기동 아이랑갈만한곳] 서울형키즈카페 제기동점 작지만 알찬 곳 내돈내산 솔직후기',
        href: 'https://blog.naver.com/hellodotom/224143430879',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[제기동 아이랑갈만한곳] 서울형키즈카페 제기동점 작지만 알찬 곳 내돈내산 솔직후기',
        ogDescription:
          '안녕하세요~ 안녕도톰입니다❤️ 아이랑 매일 서울형키즈카페 신당점만 방문했다가 생각보다 거리도 멀고 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMTJfMTM5%2FMDAxNzY4MTg2NzYxNDQ2.sMgmxHMGNE8C_z7IK9Ayz47hbyLDfelIkVs0DSu4f1Eg.JzsJuhcoWUFchnzdfUlDFC0xhOg5Q9cIpsnuvDkbi7Ug.JPEG%2FIMG%25A3%25DF1437.JPG%23480x640&type=ff192_192',
      },
      {
        title: '서울형 키즈카페 제기동점에서 26개월 아이와 놀기',
        href: 'https://blog.naver.com/notenakseo/224117898649',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 키즈카페 제기동점에서 26개월 아이와 놀기',
        ogDescription:
          '주소 서울 동대문구 약령시로7길 19, 2층 영업시간 평일 9:40-11:40, 13:10~15:10, 16:~18:00 토요일 9:10~...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMThfMjUx%2FMDAxNzY2MDU5NjU3ODUy.UVPsLK0Tag-s_nLPhBuJfSbKcs64C0eObR_rsKuSq3Qg.EiKTpoIJQgDqpDFyaQ39w-b8eoFhNYX26LSdCQvqH9kg.JPEG%2F%25BC%25AD%25BF%25EF%25C7%25FC%25C5%25B0%25C1%25EE%25C4%25AB%25C6%25E4_%25C1%25A6%25B1%25E2%25B5%25BF%25C1%25A1%25BF%25A1%25BC%25AD_26%25B0%25B3%25BF%25F9_%25BE%25C6%25C0%25CC%25BF%25CD_%25B3%25EE%25B1%25E2_%252820%2529.jpg%234080x3060&type=ff192_192',
      },
      {
        title: '최근 다녀온 서울형 키즈카페 동대문구 제기동점 후기',
        href: 'https://blog.naver.com/miyeon216/223899724058',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '최근 다녀온 서울형 키즈카페 동대문구 제기동점 후기',
        ogDescription:
          '처음 가보는 곳으로 가고 싶어 찾아본 서울형 키즈카페 제기동점! 주차가 워낙 협소하다 해서 대중교통으로...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA2MTVfMjA4%2FMDAxNzQ5OTUwMDcxMTIw.kAs_MKGLl9kJsJQpR3uXxwCc_eWDT_SyxYwrix7wCe4g.vHbeTw13uosZJCLn_No0xHfArpXd8jEeercop6XPpEsg.JPEG%2FP20250607_143028086_22F8687D-5515-4543-B503-00A2DD4DA5EF.jpg%233024x4032&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-jangan1',
    name: '서울형 키즈카페 동대문구 장안1동점',
    region: 'seoul',
    subRegion: '동대문구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DM250304',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 동대문구 장안1동점',
      '서울특별시 동대문구 답십리로66길 3'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '장안1동 생활권의 공공 실내 놀이터. 동대문구 동부권에서 아이와 짧게 들를 실내 장소로 적합하다.',
    address: '서울특별시 동대문구 답십리로66길 3',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-gaebong1',
    name: '서울형 키즈카페 구로구 개봉1동점',
    region: 'seoul',
    subRegion: '구로구',
    category: 'public-play',
    ageBands: ['3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GR241001',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 구로구 개봉1동점',
      '서울특별시 구로구 경인로 318-15'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '개봉1동 생활권의 공공 키즈카페. 구로 서부권에서 미취학 아동과 이용할 실내 놀이 후보로 좋다.',
    address: '서울특별시 구로구 경인로 318-15',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '신도림동점은 기존 데이터에 있어 제외했고, 공식 시설 상세가 확인된 개봉1동 지점을 새로 반영했다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '구로 아이랑 가볼만한곳 서울형 키즈카페 개봉1동점 예약방법',
        href: 'https://blog.naver.com/kje2134/224246480457',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '구로 아이랑 가볼만한곳 서울형 키즈카페 개봉1동점 예약방법',
        ogDescription:
          '서울시에서 운영하는 공공형 실내 키즈카페 개봉1동점 다녀온 후기 시작할게요 오랜만에 친정집 방문했다가...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MDdfMTUw%2FMDAxNzc1NTQzNDMwMzM3.pSA_0qls_4E428g96Zohv1aUBBuFBGYJJ5c23WGAmH0g.F9JS-IAWpFxhit-zw8dDvcHBvK2wk0uwL87V7RBp5X8g.JPEG%2FIMG%25A3%25DF7998.jpg%23900x1200&type=ff192_192',
      },
      {
        title: '서울형 키즈카페 구로구 개봉1동점 주차 수유실 3살 5살 주말 후기',
        href: 'https://blog.naver.com/90okkyung/224112856559',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 구로구 개봉1동점 주차 수유실 3살 5살 주말 후기',
        ogDescription:
          '안녕하세요. 호호엄마에요💗💗 오늘은 지난주에 다녀온 서울형키즈카페 개봉1동점 후기에요 :) 요즘 서...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMTdfMjkw%2FMDAxNzY1OTQzMjgyNzcy.8YlYZZjmb_KjWy2q9Chfvhri3i7CXip5jcvwmUof5zAg.yvrNxcMyqry2edo53I5WcdRv6gtwO-jfjBnos0AR-ngg.JPEG%2FIMG%25A3%25DF3083.JPG%232205x2205&type=f250_208',
      },
      {
        title: '구로 서울형키즈카페 개봉1동점 이용후기 실내 아이와갈만한곳',
        href: 'https://blog.naver.com/rajunchul/224160177818',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '구로 서울형키즈카페 개봉1동점 이용후기 실내 아이와갈만한곳',
        ogDescription:
          '안녕하세요 유누아빠입니다 오늘은 구로구 서울형키즈카페 개봉1동점 후기에요 구로구 모자건강센터 건물 2...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMjZfMjE2%2FMDAxNzY5NDA2MzA1MDcz.rLGYaGzPfUsWPICq1aqFnzhxy-7BjPX1qHrIN6jR4Bkg.pQmkDOzvlDdZNW2_vtMu_7BGvma6vj5C_TLINwwa_kYg.JPEG%2F20260117_114340.jpg%233000x1689&type=f250_208',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-guro4',
    name: '서울형 키즈카페 구로구 구로4동점',
    region: 'seoul',
    subRegion: '구로구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GR250201',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 구로구 구로4동점',
      '서울특별시 구로구 구로동로26길 54'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '구로4동에서 영아·영유아 중심으로 이용하기 좋은 공공 실내놀이 공간. 짧은 예약 회차형 방문에 맞다.',
    address: '서울특별시 구로구 구로동로26길 54',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '신도림 아기랑 갈만한 곳 서울형 키즈카페 구로4동점 후기 | 놀이시설·주차·이용방법',
        href: 'https://blog.naver.com/liveyourlife_now/224155609571',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '신도림 아기랑 갈만한 곳 서울형 키즈카페 구로4동점 후기 | 놀이시설·주차·이용방법',
        ogDescription:
          '서울형 키즈카페 들어보셨나요? 서울형 키즈카페는 서울시에서 운영하는 키즈카페로 저렴한 비용으로 아이...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMTNfMjYz%2FMDAxNzY4Mjc0NTkxMzA5.GUTT0-ce_dl-hGTPUGwEvVvtpvrvnLnWip3M9tuN4BQg.5QsEi2R4SqiBTa7hjGxvrh19SJems27yucKhztHdVRYg.JPEG%2FIMG%25A3%25DF5196.JPG%23900x1200&type=ff192_192',
      },
      {
        title:
          '서울형 키즈카페 구로구 구로4동점 후기 (주차/이용료/운영시간 등)',
        href: 'https://blog.naver.com/grounded_life_notes/224218773311',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 구로구 구로4동점 후기 (주차/이용료/운영시간 등)',
        ogDescription:
          '주변에 아이와 함께 갈 만한 곳을 찾고 있나요? 혹시 서울 거주자이시거나 서울에 직장이 있는 서울 생활권...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTZfMjE3%2FMDAxNzczNjYxMjgyMzk0.KhlLi-JrGNscLwuzmppqX8_X__A9eTDro6z5BEDPYzsg.-HOC_SEI_vXwH0eHVT9C78jX_ctfKgrzpsH_W5FO6cAg.JPEG%2FKakaoTalk_20260316_120538795.jpg%234000x3000&type=ff192_192',
      },
      {
        title: '서울형키즈카페 구로4동점 주차 꿀팁 유모차보관 수유실',
        href: 'https://blog.naver.com/nilriri83/224127165020',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 구로4동점 주차 꿀팁 유모차보관 수유실',
        ogDescription:
          '서울형키즈카페 구로4동점 주차 꿀팁 유모차보관 수유실 안녕하세요 육아블로거 세쌍둥이 아빠 호박고구마...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMjlfMTAg%2FMDAxNzY2OTY1NDcyNzky.J-W35b4GF-J6K2zteSATinfEKRYfFHO3i2gRjEr986kg.8hEPhuelXSN3h9ySMQFRdv6v4KNAh8ERYHcUrmgOwlwg.JPEG%2F900%25A3%25DF1766920359258.jpg%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-godeok2',
    name: '서울형 키즈카페 강동구 고덕2동점',
    region: 'seoul',
    subRegion: '강동구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GD230201',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 강동구 고덕2동점',
      '서울특별시 강동구 고덕로 353'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '고덕2동 생활권에서 이용하는 공공형 실내놀이터. 강동구 동부권 영유아 가족의 실내 놀이 후보로 적합하다.',
    address: '서울특별시 강동구 고덕로 353',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '서울형 키즈카페 강동구 고덕2동점 (아이·맘 강동) _ 서울 강동구',
        href: 'https://blog.naver.com/jtjk417/224199327105',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 강동구 고덕2동점 (아이·맘 강동) _ 서울 강동구',
        ogDescription:
          '✅️ 위치 서울특별시 강동구 고덕로 353 일반상가 2층 5호선 상일동역 1번 출구 (일반상가 2층) * 일반상...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMjhfMTU0%2FMDAxNzcyMjY1ODk0ODU5.Q6iGdc2NucgvmYZ9GewMqXLbtb7X5RXy65syMukLKasg.kPxqOKRSh8R3_GqHNCLzwC2hNUeRhkYciUrgP2oIb3cg.JPEG%2F900%25A3%25DF20260228%25A3%25DF170426.jpg%23900x900&type=ff192_192',
      },
      {
        title: '서울 강동 아기랑 가기 좋은 ｜서울형키즈카페 고덕2동점 주차',
        href: 'https://blog.naver.com/honeylight_/224161316081',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울 강동 아기랑 가기 좋은 ｜서울형키즈카페 고덕2동점 주차',
        ogDescription:
          '지난 포스팅에 이어 오늘은 서울형키즈카페 아이맘강동 고덕2동점 포스팅을 해볼게요~~ 고덕2동점은 사각지...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMjZfMTYg%2FMDAxNzY5NDM5NTgzMjA3.qLvjs54Or2Lj8BbkUOHfbgcnnvZ0WDUXkUuBQfdewzgg.-AfZ_CX6mDTcWX4DKVbV8qBsg1HmueINwKGer7a-z88g.GIF%2F%25C7%25C1%25B7%25CE%25C1%25A7%25C6%25AE%25A3%25DF11%25A3%25AD08%25A3%25A81%25A3%25A9%25A3%25DFFull_HD_1080p%25A3%25DFHIGH%25A3%25DFFR30%25A3%25DF%25A3%25A812%25A3%25A9%25A3%25A81%25A3%25A9.gif%23368x654&type=ff192_192',
      },
      {
        title:
          '아기자기한 영아들의 천국! 서울형 키즈카페 고덕2동점 방문 후기 (주차·시설 정보)',
        href: 'https://blog.naver.com/bongbongs_life/224261028516',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '아기자기한 영아들의 천국! 서울형 키즈카페 고덕2동점 방문 후기 (주차·시설 정보)',
        ogDescription:
          "안녕하세요! 오늘은 강동구 서울형 키즈카페 투어의 연장선으로, '서울형 키즈카페 고덕2동점' ...",
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjJfMTY1%2FMDAxNzc2ODI1MTkzNzU4.IFG3NpGLtZ55P0kwJrE4KUA7xw_h-I-q0l99JqTB8Iwg.i4DuVUeODkMEhZ-gZJFwgRHyEPBP6R6kGPtwj1GGntAg.JPEG%2FKakaoTalk_20260422_112707500_08.jpg%23400x533&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-amsa1',
    name: '서울형 키즈카페 강동구 암사1동점',
    region: 'seoul',
    subRegion: '강동구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GD230202',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 강동구 암사1동점',
      '서울특별시 강동구 올림픽로98길 15'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '암사1동에서 예약제로 운영되는 공공 키즈카페. 영유아와 비 오는 날 실내 놀이를 계획할 때 살피기 좋다.',
    address: '서울특별시 강동구 올림픽로98길 15',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '서울형 강동구 키즈카페 암사1동점 주차, 사용 솔직후기',
        href: 'https://blog.naver.com/cutekej1004/224258506103',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 강동구 키즈카페 암사1동점 주차, 사용 솔직후기',
        ogDescription:
          '서울형 키즈카페 강동구 암사 1동점 안녕하세여!!따끈따끈한 후기✨ 주말에 아이데리고 서울형 키즈카페 강...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjBfMTE3%2FMDAxNzc2NjQ5OTEyMDc4.jm9gVGbG7Hhn_L_-VGjcnPyYjhuxdugl9gQdcR5gs1Mg.surRcaMY6tC305cepxHzGAOutCgOBuyI3ai_np0v4d0g.JPEG%2FIMG%25A3%25DF5746.jpg%23900x1361&type=ff192_192',
      },
      {
        title:
          '서울형 키즈카페 암사1동점 추천 주차 이용시간 예약방법 가격 18개월 돌아기 후기 (송파구 강동구 아기랑 실내 가볼만한 곳 )',
        href: 'https://blog.naver.com/ccff1212/224185215080',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 암사1동점 추천 주차 이용시간 예약방법 가격 18개월 돌아기 후기 (송파구 강동구 아기랑 실내 가볼만한 곳 )',
        ogDescription:
          '어린이집 안가는 주말에, 아기 어디데려가서 놀게하지? 고민하시는 분 추운 날 실내 <서울형 키즈카페&g...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMTZfMzQg%2FMDAxNzcxMTk0MjQyODA3.1QGQoD9ckLNb9iZssdtDg8UrESOlR_5oi_OgBz8aSgEg.-7s_r_RH2fmkHbtBcfP3UI_NThs3UR_m-VoyNIHXZr0g.JPEG%2F900%25A3%25DF20260214%25A3%25DF164310.jpg%23900x675&type=ff192_192',
      },
      {
        title: '서울형 키즈카페 강동구 암사1동점 방문 후기',
        href: 'https://blog.naver.com/springday_bom/224217108654',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 키즈카페 강동구 암사1동점 방문 후기',
        ogDescription:
          '서울형 키즈카페 강동구 암사1동점 방문 후기 서울형 키즈카페 강동구 암사1동점 방문 후기 👶 아이와 가...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTVfNTAg%2FMDAxNzczNTUyMDc0MTQ0.CpKyOMIkm_6pZDFiZ_My3pxgEh-5MAp6kor0xMxW1G4g.efRjCaRH8IOFXDbnWIWblDqoR1Oayo4GzTnRLKDKv1gg.JPEG%2F900%25A3%25DF20260314%25A3%25DF152656.jpg%23900x675&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-sangil2-1',
    name: '서울형 키즈카페 강동구 상일2동점',
    region: 'seoul',
    subRegion: '강동구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GD231201',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 강동구 상일2동점',
      '서울특별시 강동구 상일로12길 95'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '상일2동 생활권의 회차형 공공 실내놀이터. 고덕·상일권 영유아 가족의 근거리 장소로 쓰기 좋다.',
    address: '서울특별시 강동구 상일로12길 95',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '서울 강동 아기랑 가기 좋은 ｜서울형키즈카페 상일2동점 주차',
        href: 'https://blog.naver.com/honeylight_/224165374352',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울 강동 아기랑 가기 좋은 ｜서울형키즈카페 상일2동점 주차',
        ogDescription:
          '서울형키즈카페 아이맘강동 시리즈 3번째는 바로 상일2동점입니다!! 상일2동에는 서울형키즈카페가 2군데 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMzBfMTU1%2FMDAxNzY5NzUwMTkzMTAy.r5ZrAibj7Lf-WVbdNlRwC-XP05Yi7F-ZFr7-7SiJlZcg.mJo4yHz4eWRHU0jPOi4RdcO1VWRUA4-1PaLF11isiJQg.GIF%2F%25C7%25C1%25B7%25CE%25C1%25A7%25C6%25AE%25A3%25DF11%25A3%25AD08%25A3%25A81%25A3%25A9%25A3%25DFFull_HD_1080p%25A3%25DFHIGH%25A3%25DFFR30%25A3%25DF%25A3%25A815%25A3%25A9%25A3%25A81%25A3%25A9.gif%23368x654&type=ff192_192',
      },
      {
        title:
          '서울형 키즈카페 강동구 상일2동점 (아이·맘 강동) 후기 _ 서울 강동구',
        href: 'https://blog.naver.com/jtjk417/224199164776',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 강동구 상일2동점 (아이·맘 강동) 후기 _ 서울 강동구',
        ogDescription:
          '✅️ 위치 서울특별시 강동구 상일로12길 95 푸르내상가 102-303 (상일동, 푸르내) 5호선 강일역 하차, 4번...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMjhfMiAg%2FMDAxNzcyMjU0MjIxOTA3.vqNf-aYQ5hssgHm8qRyIuAWt9oPY_tY_lBE__IrqXm8g.PPyL3Li9v2b_hyXeo94DASYf8txv2KOfyNFNzfbZFVcg.JPEG%2F900%25A3%25DF20260228%25A3%25DF134923.jpg%23900x900&type=ff192_192',
      },
      {
        title:
          '강동구 육아 꿀팁! 서울형 키즈카페 상일2동점 & 장난감 도서관 동시 정복기 (주차·시설 후기)',
        href: 'https://blog.naver.com/bongbongs_life/224260908798',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '강동구 육아 꿀팁! 서울형 키즈카페 상일2동점 & 장난감 도서관 동시 정복기 (주차·시설 후기)',
        ogDescription:
          "안녕하세요! 오늘은 강동구 엄마들의 구세주, '서울형 키즈카페 상일2동점' 방문 후기를 들고 왔...",
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjJfMjAw%2FMDAxNzc2ODE5MjU5NTg0.QxLh0Vnd5C9wYPbf0m5qrx5rqMW92T0Uj65r_JHf8DMg.kXbGruL6cepM6MvomErLRF5q1hAJcFu5L5HfEPX4Nj8g.JPEG%2FKakaoTalk_20260422_093625533.jpg%23400x533&type=f250_208',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-seongnae1',
    name: '서울형 키즈카페 강동구 성내1동점',
    region: 'seoul',
    subRegion: '강동구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GD240101',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 강동구 성내1동점',
      '서울특별시 강동구 성내로6길 16'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '성내1동에서 운영되는 공공 실내 놀이공간. 강동 서부권에서 아이와 짧게 들를 실내 후보로 적합하다.',
    address: '서울특별시 강동구 성내로6길 16',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '[키즈카페] 서울형 키즈카페 성내1동점 방문 후기!',
        href: 'https://blog.naver.com/song-0814/224211768412',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '[키즈카페] 서울형 키즈카페 성내1동점 방문 후기!',
        ogDescription:
          '안녕하세요! 오늘은 강동구 육아맘들의 아지트, 서울형 키즈카페 성내1동점에 다녀왔습니다. 이곳은 시설도...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTBfOTYg%2FMDAxNzczMTQ0NjgxMTg3.6-pLwa379KDPSAYMpr1syRPWMUF_AhmBLIdbFxhnlMMg.164GvfGFcrtOVD7L89p7JZP1urJJ5JhX0ixs6VLiecMg.JPEG%2FIMG%25A3%25DF4870.jpg%23900x1200&type=ff192_192',
      },
      {
        title:
          '강동 어린이 회관 2층, 놀이시설 많고 깨끗한 서울형 키즈카페 성내1동점',
        href: 'https://blog.naver.com/replain/224133199779',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '강동 어린이 회관 2층, 놀이시설 많고 깨끗한 서울형 키즈카페 성내1동점',
        ogDescription:
          '딸아이와 다녀온 솔직 후기 아이랑 어디 갈지 고민될 때 가장 먼저 떠오르는 곳이 바로 서울형 키즈카페였...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMDNfMjYz%2FMDAxNzY3NDQ3NjAwMjA4.4ujRKFtzHpLQEgoAOQjDACAa_jy8kd8Um6Z1gV8Nv2Ag.ijokxEud_Dql3U99hFojyX6Bgq7bcmyNCEvUarxJxHAg.GIF%2FKakaoTalk_20260103_221354247_08.gif%23360x640&type=ff192_192',
      },
      {
        title: '강동구 서울형 키즈카페 성내1동점 후기 영유아 모두 추천',
        href: 'https://blog.naver.com/rikuming/224192754017',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '강동구 서울형 키즈카페 성내1동점 후기 영유아 모두 추천',
        ogDescription:
          '개인적으로는 영유아 모두 추천하는 서울형 키즈카페 강동구 성내1동점 사실 영아에 특화되거나 유아에 특...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMjNfNTYg%2FMDAxNzcxODEwMjQwNzA4.ak2T3-lVRhLzir9AK7MA6sDY-Pl3z2_FgUyxyBzfr3Mg.BkzeSaZfEVctmIHY7UT7eqS6xItf_SjF20Dy-WttYAwg.PNG%2F900%25A3%25DFrikuming%25BA%25ED%25B7%25CE%25B1%25D7%25A3%25AD001%25A3%25A8358%25A3%25A9.png%23900x900&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-sangil2-2',
    name: '서울형 키즈카페 강동구 상일2동 2호점',
    region: 'seoul',
    subRegion: '강동구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GD250101',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 강동구 상일2동 2호점',
      '서울특별시 강동구 고덕로98길 71'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '상일2동 추가 지점으로 확인되는 공공 실내놀이터. 강동 동부권 아이 동반 실내 장소 선택지를 넓혀준다.',
    address: '서울특별시 강동구 고덕로98길 71',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 같은 동의 기존 지점과 주소가 달라 별도 장소로 반영했다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-yeoksam1',
    name: '서울형 키즈카페 강남구 역삼1동점',
    region: 'seoul',
    subRegion: '강남구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GN240902',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 강남구 역삼1동점',
      '서울특별시 강남구 언주로107길 4'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '역삼1동 생활권에서 이용하는 공공형 실내 놀이공간. 강남권 영유아 동반 가족의 예약형 실내 후보로 좋다.',
    address: '서울특별시 강남구 언주로107길 4',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '서울형키즈카페 역삼1동점 강남구 키즈카페 주차 예약 운영시간',
        href: 'https://blog.naver.com/im__present/224240982182',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 역삼1동점 강남구 키즈카페 주차 예약 운영시간',
        ogDescription:
          '안녕하세요. 횬꼬입니다.😉 요즘 에너지 넘치는 9개월 아기와 함께 서울형 키즈카페를 도장깨기🔨중인...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MDRfMTA5%2FMDAxNzc1MzA4MjE2OTU5.j_6yDNNds8NdJsD3KQ_rWx7eehlIVnSSJEcR2fH57Zkg.pLp6y6yJHhiquF7Btr5gWrg-5pydFu5zW0TUMtXGAbMg.PNG%2FBlog_2026.1-2_%25283%2529.png%23800x800&type=f250_208',
      },
      {
        title:
          '강남어린이회관 서울형 키즈카페 역삼1동점 방문 후기(feat.예약 방법)',
        href: 'https://blog.naver.com/lgd0304/224172220596',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '강남어린이회관 서울형 키즈카페 역삼1동점 방문 후기(feat.예약 방법)',
        ogDescription:
          '#서울형키즈카페 #강남어린이회관 #서울형키즈카페역삼1동점 강남어린이회관에 위치한 서울형 키즈카페 역...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDVfMjM3%2FMDAxNzcwMjQxMTcyMzk3.oqTMKft6IoG7GwV_roZr2Z6bZXjREejpd65Di7pbNxQg.vhkA3R9-FBgRQI-cjD-7szZnEHBb1Vv8lD3O7e6fiuog.JPEG%2FKakaoTalk_Photo_2026-02-03-06-55-13_007.jpeg%233000x2250&type=ff192_192',
      },
      {
        title: '강남 어린이회관 서울형 키즈카페 역삼1동점 이용 후기',
        href: 'https://blog.naver.com/sh2474620/224259988386',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '강남 어린이회관 서울형 키즈카페 역삼1동점 이용 후기',
        ogDescription:
          '정보 위치: 서울 강남구 언주로 107길 4 강남 어린이 회관 2층 연락처: 070-4111-6052 운영시간: 화-일(09:...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MjFfMTgy%2FMDAxNzc2NzQzNjIyMzQ4.uq0Tpfv6ZUcdrm-cjuZZISqneMjxrRKOCCssBZAsc3og.oH--Dwsfi_jfonhjzXioziJLJEARcUsuI_qC-STo8Kwg.JPEG%2F900%25A3%25DF20260404%25A3%25DF110347.jpg%23900x675&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-geumho',
    name: '서울형 키즈카페 성동구 금호점',
    region: 'seoul',
    subRegion: '성동구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=SD221201',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 성동구 금호점',
      '서울특별시 성동구 무수막18길 1'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '금호 생활권의 공공 키즈카페. 성동구 영유아 가족이 날씨와 상관없이 예약제로 이용하기 좋은 실내 공간이다.',
    address: '서울특별시 성동구 무수막18길 1',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-seongsu',
    name: '서울형 키즈카페 성동구 성수점',
    region: 'seoul',
    subRegion: '성동구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=SD240701',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 성동구 성수점',
      '서울특별시 성동구 뚝섬로3길 18'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '성수동에서 이용 가능한 공공 실내놀이터. 서울숲·성수 생활권 실내 놀이 후보로 묶기 좋다.',
    address: '서울특별시 성동구 뚝섬로3길 18',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-sinjeong7',
    name: '서울형 키즈카페 양천구 신정7동점',
    region: 'seoul',
    subRegion: '양천구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=YC221101',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 양천구 신정7동점',
      '서울특별시 양천구 목동남로 106-23'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '신정7동에서 예약제로 운영되는 공공 실내 놀이공간. 목동권과 신정권 사이의 실내 장소 후보로 적합하다.',
    address: '서울특별시 양천구 목동남로 106-23',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '목동점은 기존 데이터에 있어 제외했고, 주소가 다른 신정7동 지점을 새로 반영했다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '단돈 3천원의 행복! 서울형 키즈카페 양천구 신정7동점 예약 및 주차 꿀팁 (5색깔깔)',
        href: 'https://blog.naver.com/bbockss/224166518134',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '단돈 3천원의 행복! 서울형 키즈카페 양천구 신정7동점 예약 및 주차 꿀팁 (5색깔깔)',
        ogDescription:
          '안녕하세요! 권대리의 성장일기입니다. 😊 올겨울은 유난히 매서운 추위가 기승을 부리네요. 오늘은 주말...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMzFfMTU5%2FMDAxNzY5ODQxNTA5OTI0.H9NH2lFpb4EY1WEV5m-7GWavhzQ-pc3z78kQ2YG7NM8g.gtXOhzhCn0caeh396EBLRrrgY-uAIM4POXYQJv4-oUUg.GIF%2Fse%25A3%25DFone%25A3%25DFani%25A3%25DF20260131%25A3%25DF151120%25A3%25DFa.gif%23281x500&type=ff192_192',
      },
      {
        title: '서울형 키즈카페 양천구 신정7동점 오색깔깔 후기(+주차)',
        href: 'https://blog.naver.com/heeseung823/224249341794',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 키즈카페 양천구 신정7동점 오색깔깔 후기(+주차)',
        ogDescription:
          '서울형키즈카페 양천구 신정7동점 "오색깔깔 후기" 안녕하세요. 희야입니다. 오랜만에 방문한 서...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMDdfMjUx%2FMDAxNzcyODI5OTQzMDc1.zp-WG3qbOZ3U5p_5KuBQbWx1Tsy4FwQRaD6nk25_uN4g.pK4H6A8hi9ZnWSKxNF0nmij7nRxBEPxTuw615ubsoUQg.JPEG%2FIMG%25A3%25DF5603.JPG%236000x4000&type=f250_208',
      },
      {
        title:
          '육아일기 #184 - 서울형 키즈카페 양천구 신정7동점 5색깔깔KIDS (주차, 꿀팁, 예약, 주의사항)',
        href: 'https://blog.naver.com/tofollowmymind/224159733812',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '육아일기 #184 - 서울형 키즈카페 양천구 신정7동점 5색깔깔KIDS (주차, 꿀팁, 예약, 주의사항)',
        ogDescription:
          '안녕하세요! 스타대디입니다!! 오늘은 또 다른 서울형키즈카페를 다녀왔습니다! 바로 양천구 공공형 실내놀...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMjZfMjgg%2FMDAxNzY5Mzc3NTU2MDA4.v3UrAmKK2hua_IPsqmh0DIkmFUmMMOzvkZulYHzv-04g.IH0H4kvl7ud4z7-G7XzfnjbjXdgW5hMQAtVvQhmUiyog.JPEG%2F900%25A3%25DF1769214170196.jpg%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-omok',
    name: '서울형 키즈카페 양천구 오목점',
    region: 'seoul',
    subRegion: '양천구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=YC231206',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 양천구 오목점',
      '서울특별시 양천구 목동서로 159-4'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '오목교 생활권의 영유아 대상 공공 키즈카페. 양천구에서 어린 연령대와 실내 회차를 찾을 때 살피기 좋다.',
    address: '서울특별시 양천구 목동서로 159-4',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-sinwol3',
    name: '서울형 키즈카페 양천구 신월3동점',
    region: 'seoul',
    subRegion: '양천구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=YC250202',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 양천구 신월3동점',
      '서울특별시 양천구 남부순환로 374'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '신월3동 생활권의 예약형 공공 실내놀이터. 양천 서부권 미취학·초등 저학년 아이와 이용 후보로 좋다.',
    address: '서울특별시 양천구 남부순환로 374',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '서울형키즈카페 신월3동점 후기｜시설·요금·주차까지 한눈에 정리',
        href: 'https://blog.naver.com/leekyunghwa302/224100288540',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형키즈카페 신월3동점 후기｜시설·요금·주차까지 한눈에 정리',
        ogDescription:
          '안녕하세요. 오늘도 놀고싶은 발산동배짱이입니다. 동네에 새로운 서울형키카가 생겼다는 소식을 접하고 바...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMDZfMjY2%2FMDAxNzY0OTk5MzMzMzYy.-BRalL6PfkgZ0YVLPPaMtZG66HPjrFre48XlvQKeTikg.d7475Agul6ooUUzucIk65RSjJAO6t8ZWlkcc-ghkyGEg.JPEG%2F%25BC%25AD%25C5%25B0%25C4%25AB%25BD%25C5%25BF%25F93%25B5%25BF%25C1%25A1.jpg%23800x800&type=ff192_192',
      },
      {
        title: '서울형키즈카페 양천구 신월3동점 예약 및 주차 후기',
        href: 'https://blog.naver.com/bbalgani81/224210548942',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 양천구 신월3동점 예약 및 주차 후기',
        ogDescription:
          '안녕하세요~ 육아하는 승현맘이에요^^ 서울형키즈카페 도장깨기 중인 애미와 아들 이제 이것도 한살 더 먹...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMDlfMjI4%2FMDAxNzczMDU5NzExMzg4.04GJgWolJ7dMSUTZ8u6K5gsslJwJXq2i5NgOPr-B-iYg.Hu62yO7EhD2ELVraxC3mXWd8AKhwFHNryMUsWdgwBAYg.JPEG%2FKakaoTalk_20260309_210304397.jpg%233000x3000&type=ff192_192',
      },
      {
        title:
          '서울형 키즈카페 신월3동점 탐방 후기 | 가성비 좋은 공공 키즈카페 추천',
        href: 'https://blog.naver.com/huanghl0615/224210394873',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 신월3동점 탐방 후기 | 가성비 좋은 공공 키즈카페 추천',
        ogDescription:
          '안녕하세요. 쭈니 & 찌니 워킹맘이에요~! 요즘 아이와 함께 서울형 키즈카페 다니는 재미에 푹 빠졌어...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMDlfMjE2%2FMDAxNzczMDU1MDU4NjA5.EYI4mKXEJDGeq8g1aligT4tUG4BLZ0NM_eBx1pcqaGAg.bZPfUbE6rIiFNYR7Q_TZhbcGz041AYsX24G9KNFvI8Qg.JPEG%2F900%25A3%25DF1773054467856.jpg%23900x675&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-myeonmok4',
    name: '서울형 키즈카페 중랑구 면목4동점',
    region: 'seoul',
    subRegion: '중랑구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=JR220801',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 중랑구 면목4동점',
      '서울특별시 중랑구 용마산로 209'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '면목4동에서 이용 가능한 공공 실내놀이터. 중랑구 영유아 동반 가족의 근거리 실내 놀이 후보로 좋다.',
    address: '서울특별시 중랑구 용마산로 209',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '[서울/중랑구] 아이랑 가볼만한곳 서울형키즈카페 중랑구 면목4동점, 중랑실내놀이터 예약 및 후기.',
        href: 'https://blog.naver.com/lasting_memory/223992939375',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '[서울/중랑구] 아이랑 가볼만한곳 서울형키즈카페 중랑구 면목4동점, 중랑실내놀이터 예약 및 후기.',
        ogDescription:
          '안녕하세요 러블리밍이에요:) 아이들이랑 주말에 서울형키즈카페 면목4동점에 다녀온 후기를 남겨 보려고 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTExMzBfMjQz%2FMDAxNzY0NTExMTgxNTcw.w8np0EtcWyiADZvaTb3eEMj4EsdgpQXcQU7QehSM_ZIg.4nQ77hAvkhgtpCLzM54f51p0SXa-x3jf3GRtNKqo5v8g.PNG%2F%25BA%25A3%25C0%25CC%25C1%25F6_%25B1%25F2%25B2%25FB%25C7%25D1_%25BA%25ED%25B7%25CE%25B1%25D7_%25BD%25E6%25B3%25D7%25C0%25CF_%25C4%25AB%25B5%25E5%25B4%25BA%25BD%25BA_%25C0%25CE%25BD%25BA%25C5%25B8%25B1%25D7%25B7%25A5_%25C6%25F7%25BD%25BA%25C6%25AE%25A3%25AD1.png%231080x1080&type=ff192_192',
      },
      {
        title: '중랑실내놀이터, 서울형 키즈카페 면목4동점 주말 방문',
        href: 'https://blog.naver.com/cnsdus63/224169261124',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '중랑실내놀이터, 서울형 키즈카페 면목4동점 주말 방문',
        ogDescription:
          '한파가 도저히 풀릴 기미가 보이지 않는 1월의 말❄️❄️❄️ 혹여라도 감기가 걸릴까 두려워 아기랑 밖에...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDJfMjU5%2FMDAxNzcwMDM1NDgzMzAw.NZmQ9fH2yJ83qBLbxZoKJA186WJZfdtnjZ9SRrEz2Vog.3M4Y2PiGHLW8oTmGqclbkMv_kVViQnKUF6izVClp2LUg.JPEG%2FIMG%25A3%25DF6675.jpg%23900x900&type=ff192_192',
      },
      {
        title: "2,000원으로 키즈카페 가능한 '서울형 키즈카페 면목4동점 후기'",
        href: 'https://blog.naver.com/alsrhd_/224102207666',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: "2,000원으로 키즈카페 가능한 '서울형 키즈카페 면목4동점 후기'",
        ogDescription:
          '안녕하세요:-D 민공이예요 주말에 키즈카페를 가지 않으면 주말 보내기 어려운 거.. 저만 그런 거 아니져?...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEyMDhfMTQx%2FMDAxNzY1MTU2NzgyMjU0.HVYmcwTferEv0jwpj34J8AWwFfumHRKrMEGP8OvClOcg.LaiWvwq1Mm6qFk7s8HeC8HyImd8AkpZeGzGwfEGYfDMg.JPEG%2FIMG%25A3%25DF0187.JPG%23900x1200&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-mangubon',
    name: '서울형 키즈카페 중랑구 망우본동점',
    region: 'seoul',
    subRegion: '중랑구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=JR240501',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 중랑구 망우본동점',
      '서울특별시 중랑구 용마산로 670'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '망우본동 생활권의 공공형 키즈카페. 중랑 동부권 아이와 비 오는 날 들를 실내 장소로 적합하다.',
    address: '서울특별시 중랑구 용마산로 670',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '서울형 키즈카페 중랑구 망우본동점(중랑실내놀이터 양원) 방문후기',
        href: 'https://blog.naver.com/aura_0831/224250345043',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형 키즈카페 중랑구 망우본동점(중랑실내놀이터 양원) 방문후기',
        ogDescription:
          '오늘은 두돌 아이부터 세돌, 네돌, 아이들이 놀기 좋은 서울형 키즈카페 중랑구 망우본동점 (중랑실내놀이...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MTNfMjEg%2FMDAxNzc2MDY0NDM5MjAx.le6giOwpF3AkHst_EEe4KIk9od43sGUXc9aSzP_v3LEg.bGKwfeD15W5lwgidCfTq0umf8IotF1J2yKTjPWrrQUQg.PNG%2F4.png%23600x600&type=ff192_192',
      },
      {
        title:
          '아이와가볼만한곳 서울형 키즈카페 중랑구 망우본동점 중랑실내놀이터 양원 방문기',
        href: 'https://blog.naver.com/marchtenth/224155179315',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '아이와가볼만한곳 서울형 키즈카페 중랑구 망우본동점 중랑실내놀이터 양원 방문기',
        ogDescription:
          '📌 기본 정보 🏢 장소명 서울형 키즈카페 중랑구 망우본동점 (중랑실내놀이터 양원) 📍 위치 서울 중...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMjFfMjQ4%2FMDAxNzY5MDA3MTMwODg5.hx4yhC_WoSpmslq6MvRXQJDSpRvTbLrXAykBqPLqHfIg.VieQd6uiP7R6gP0UDvdD5Ry0UhBkVY3TRg15BGBWZdEg.JPEG%2F%25BA%25ED%25B7%25CE%25B1%25D7%25BD%25E6%25B3%25D7%25C0%25CF_%25284%2529.jpg%231080x1080&type=ff192_192',
      },
      {
        title: '18개월 아기와 서울형 키즈카페 중랑구 망우본동점 후기',
        href: 'https://blog.naver.com/babojuice33/224136458212',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '18개월 아기와 서울형 키즈카페 중랑구 망우본동점 후기',
        ogDescription:
          '안녕하세요☺️ 육아에 진심이라 비교 분석 철저히 하는 18개월 아기 엄마 춘식맘이에요🍼 새해가 되니 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMDZfMTM3%2FMDAxNzY3NjgxMDQ0NTI0.7lkA9M8azPelE21ZKrtUN8Mi3GbH9KOdBzHdreuAhIIg.lWsldXm99MvdX19Qg20am9BMmD1N9UGAUz5srd-gcykg.PNG%2Fimage.png%231866x1386&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-muk2',
    name: '서울형 키즈카페 중랑구 묵2동점',
    region: 'seoul',
    subRegion: '중랑구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=JR250504',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 중랑구 묵2동점',
      '서울특별시 중랑구 중랑천로 258'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '묵2동에서 운영되는 공공 실내 놀이공간. 중랑 북부권 영유아 가족의 동네형 실내 코스로 좋다.',
    address: '서울특별시 중랑구 중랑천로 258',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-nangok',
    name: '서울형 키즈카페 관악구 난곡동점',
    region: 'seoul',
    subRegion: '관악구',
    category: 'public-play',
    ageBands: ['3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GA240101',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 관악구 난곡동점',
      '서울특별시 관악구 난곡로24가길 53'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '난곡동 생활권의 공공 키즈카페. 관악 남부권에서 미취학 아동과 이용할 실내 놀이 후보로 적합하다.',
    address: '서울특별시 관악구 난곡로24가길 53',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '신림동키즈카페 서울형키즈카페관악구난곡동점 (물감키즈카페) 30개월아기랑방문 +주차',
        href: 'https://blog.naver.com/iamhanju/224236130510',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '신림동키즈카페 서울형키즈카페관악구난곡동점 (물감키즈카페) 30개월아기랑방문 +주차',
        ogDescription:
          '260328 아동 2,000 보호자 1,000*2 화-일 09:00-18:00 / 휴게시간 12:00-13:00 정기휴무 매주 월요일 서울 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMzFfMTE5%2FMDAxNzc0OTU2MjQxNzU0.4NYFwNcBFzottGI6iXgshfwVody-QbdiiyQfmAnP3WYg.Wg6sJWV7gyA6bjmqnn1C079PSaX_RqqIvRO2JAALe8sg.JPEG%2Foutput%25A3%25DF2700907130.jpg%23900x676&type=ff192_192',
      },
      {
        title:
          '주말 아이랑 갈만한 곳 물감놀이 드로잉 서울형키즈카페 관악구 난곡동점',
        href: 'https://blog.naver.com/blackcoffee19/224212729354',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '주말 아이랑 갈만한 곳 물감놀이 드로잉 서울형키즈카페 관악구 난곡동점',
        ogDescription:
          '#주말아이랑가볼만한곳 #주말아이랑갈만한곳 #아이랑갈만한곳 #주말갈만한곳 #서울형키즈카페 한동안 너무 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTFfMTM2%2FMDAxNzczMjAwNjIwNTEx.xUE8-UgXBgioM_tfV8TyY_rbOzedCTCNVzL8B2keBc8g.w4n4nQbH1p1536FUPrHrKT8rOcYHJQ1yTwBz3-o0n30g.JPEG%2FIMG%25A3%25DF9375.jpg%23900x1200&type=ff192_192',
      },
      {
        title:
          '​[관악구 아이와 가볼만한 곳] 서울형 키즈카페 난곡동점 가성비와 퀄리티를 다 잡은 미술 놀이 명소!',
        href: 'https://blog.naver.com/thezzirit/224229636707',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '​[관악구 아이와 가볼만한 곳] 서울형 키즈카페 난곡동점 가성비와 퀄리티를 다 잡은 미술 놀이 명소!',
        ogDescription:
          "안녕하세요! 오늘은 관악구 엄마들 사이에서 예약 전쟁으로 유명한 '서울형 키즈카페 난곡동점'...",
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMjlfMTg4%2FMDAxNzc0NzU5MjgxODM5.CQpXoNM8eN30knl3m5VeOXNIFgZgpH6x47PMHkVlxEMg.8DKABfLutrfHW-FY5VOObKItUNnlHgdrtTfSRA0TnNYg.JPEG%2F900%25A3%25DF20250401%25A3%25DF110416.jpg%23900x506&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-haengun',
    name: '서울형 키즈카페 관악구 행운동점',
    region: 'seoul',
    subRegion: '관악구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GA250301',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 관악구 행운동점',
      '서울특별시 관악구 행운1마길 29'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '행운동에서 회차제로 이용하는 공공형 실내 놀이공간. 관악구 중심 생활권의 아이 동반 실내 후보로 좋다.',
    address: '서울특별시 관악구 행운1마길 29',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '관악구 서울형키즈카페 행운동점 후기 아이랑갈만한곳 주차',
        href: 'https://blog.naver.com/casadanita/223990939040',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '관악구 서울형키즈카페 행운동점 후기 아이랑갈만한곳 주차',
        ogDescription:
          '관악구 서울형키즈카페 행운동점 후기 아이랑갈만한곳 주차 6세 정도되면 태권도다 피아노다 뭔가 방과후활...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MDFfMTQx%2FMDAxNzU2NzAwNjQyMzE5.Gc-_5xX4ZATMhcT6Ja2u-zh9FxyxQ4m4KQqQz7ZkAMkg.ldIgEnNUxU9hVMu0WePRlVafJWCi_iMItUVSOl7HuSwg.JPEG%2F900%25A3%25DF20250524%25A3%25DF142033.jpg%23900x900&type=ff192_192',
      },
      {
        title:
          '서울 주말 아이와 가볼만한 곳 서울형키즈카페 관악구행운동점 후기',
        href: 'https://blog.naver.com/blackcoffee19/224221767202',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울 주말 아이와 가볼만한 곳 서울형키즈카페 관악구행운동점 후기',
        ogDescription:
          '#서울키카 #행운동키카 #무료키카 #가성비키카 #서울형키즈카페 #행운동키즈카페 #관악구키즈카페 #주말가...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMThfMjUw%2FMDAxNzczODA0NjYwMDM1.vE3ebhEEYI2toPTqnzfnQqE0lFmKRR8ApwNK2PjSP6kg.vPKYNYXB771c0ZfofyjKCfn0pJcTCAsDmJzX53YWaSQg.JPEG%2FIMG%25A3%25DF9249.jpg%23900x676&type=ff192_192',
      },
      {
        title: '서울형키즈카페 관악구행운동점 예약 주차 이용 후기',
        href: 'https://blog.naver.com/cherishlol-/224198888747',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 관악구행운동점 예약 주차 이용 후기',
        ogDescription:
          '안녕하세요, 튼튼로그에요! 오늘도 서울형키즈카페 이용 후기를 남겨보려고 해요! 이번엔 관악구행운동점을...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMjdfMTcy%2FMDAxNzcyMTkyMTk2MTYz.vmuQieaOUZd1Iu9ggUpULe-e_fo56JWoyTG44BiS4Lkg.bcl6PAI_20xflC18uwuv0HflIXdB7s75vXsFucGi1oQg.PNG%2F%25C1%25A4%25BA%25B8-%25C4%25BF%25B9%25F6_%25BA%25B9%25BB%25E7%25BA%25BB-_7_-001.png%231080x1080&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-beon3',
    name: '서울형 키즈카페 강북구 번3동점',
    region: 'seoul',
    subRegion: '강북구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=GB230601',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 강북구 번3동점',
      '서울특별시 강북구 오현로 208'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '번3동 생활권의 공공 실내놀이터. 강북구 영유아 가족의 비 오는 날 근거리 놀이 후보로 적합하다.',
    address: '서울특별시 강북구 오현로 208',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '서울형키즈카페 강북구 번3동점 예약 보호자 입장료 무료',
        href: 'https://blog.naver.com/notthatbad_/224057739897',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 강북구 번3동점 예약 보호자 입장료 무료',
        ogDescription:
          '서울형키즈카페 탐방기 3탄, 이번에 들른 곳은 강북구 번3동점 PLAY ON입니다. 첫 예약방문이었는데 ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEwMjhfMjQx%2FMDAxNzYxNjI2ODY1NTE2.nYTlX0d4Ek6GOH7tqZBXWiQ8U5QRLTUAYv7VVioti5gg.ApXK3CM8DY6urGW1oRRZwdEzgYMLZCSw-q6c5YSASHEg.JPEG%2FIMG%25A3%25DF9891.jpg%23900x506&type=ff192_192',
      },
      {
        title:
          '강북구 아이와가볼만한곳 추천｜서울형 키즈카페 번3동점 플레이온 후기',
        href: 'https://blog.naver.com/marchtenth/224175242751',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '강북구 아이와가볼만한곳 추천｜서울형 키즈카페 번3동점 플레이온 후기',
        ogDescription:
          '📌 기본 정보 🏢 장소명 서울형 키즈카페 강북구 번3동점 PLAY ON 📍 위치 서울 강북구 오현로...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDdfMTIz%2FMDAxNzcwNDUwNTYwNzk3.lLbk3Ysr21vuH_-2S2oCSspIjsCKicxvOPrVYw8Qbrcg.NgIhVYQylt3hiBje-8IFO-BGFE7YyHixk5moQSEhO70g.PNG%2F%25BA%25ED%25B7%25CE%25B1%25D7%25BD%25E6%25B3%25D7%25C0%25CF_%25285%2529.png%231080x1080&type=f250_208',
      },
      {
        title: '서울형키즈카페 강북구 번3동점 Play on 방문 후기',
        href: 'https://blog.naver.com/tempersm/223917719464',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 강북구 번3동점 Play on 방문 후기',
        ogDescription:
          '이번 주말도 역시 서울형키즈카페 방문하였습니다. 이번에는 강북구 번 3동 Play on에 가서 놀이해 보았습...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA3MDFfMTM3%2FMDAxNzUxMzM2ODY0OTk1.lOJ0qwiBUBVJV5G1Wt2WH_57pSQllesG1VZI536MrCsg.V7DBYDxyEZXXh9bzmhtKJrnBJ5b5f_gFsgb-OwwB7Z8g.JPEG%2FIMG%25A3%25DF9753.jpg%23900x676&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-eunpyeong-gu-office',
    name: '서울형 키즈카페 은평구청점',
    region: 'seoul',
    subRegion: '은평구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=EP250301',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 은평구청점',
      '서울특별시 은평구 은평터널로 27'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '은평구청권에서 확인되는 공공 실내놀이터. 은평구 영유아 동반 가족의 예약형 실내 놀이 후보로 좋다.',
    address: '서울특별시 은평구 은평터널로 27',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-mapodaeum-sangam',
    name: '서울형 키즈카페 마포구 마포대음 상암점',
    region: 'seoul',
    subRegion: '마포구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=MP230802',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 마포구 마포대음 상암점',
      '서울특별시 마포구 상암산로1길 71'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '상암 생활권에서 운영되는 마포구 공공 키즈카페. 영유아 가족의 실내 회차형 방문 후보로 적합하다.',
    address: '서울특별시 마포구 상암산로1길 71',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '[마포] 서울형키즈카페 마포구상암점 후기(6,5살 아이들과)',
        href: 'https://blog.naver.com/spring__p/224176313385',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '[마포] 서울형키즈카페 마포구상암점 후기(6,5살 아이들과)',
        ogDescription:
          '마포가 저희집에서 차로 10분정도밖에 안걸리는 거리라, 오늘은 마포에 있는 서울형키카를 다녀와봤어요~ ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAyMDhfMyAg%2FMDAxNzcwNTQ0MDc0NTIy.vbkAfRIjAk3trTPj8Jtk6VaQBqel-aFX00wW3j-S92gg.iik8FpyaFtzn0pX2qzKb3pplFyX9dZskyfZ4FCXAT-og.JPEG%2Foutput%25A3%25DF3172776603.jpg%23900x900&type=ff192_192',
      },
      {
        title: '[상암 아기랑 갈만한 곳] 서울형키즈카페 마포상암점 이용 후기',
        href: 'https://blog.naver.com/lifebcut/224271575958',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '[상암 아기랑 갈만한 곳] 서울형키즈카페 마포상암점 이용 후기',
        ogDescription:
          '날씨가 애매한 날이었다. 밖에서 오래 놀기엔 부담스럽고, 집에만 있기엔 아이 체력이 남아 있는 그런 날. ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA1MDFfMjc4%2FMDAxNzc3NjE1NDIwMjE2.tmBYz53Rpo8s96ioXmr0IIPVSYpsTqCdlQGflaFub2wg.YVNAqDjQgcQB-0enS535XFEbM5qs_7nEPslfCxgXvGsg.JPEG%2FIMG%25A3%25DF7385.JPG%23900x1200&type=ff192_192',
      },
      {
        title:
          '무더운 여름 서울 아기랑 갈만한 곳 / 상암 육아종합지원센터 서울형 키즈카페 상암점 방문후기',
        href: 'https://blog.naver.com/myncmr/223925968654',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '무더운 여름 서울 아기랑 갈만한 곳 / 상암 육아종합지원센터 서울형 키즈카페 상암점 방문후기',
        ogDescription:
          '👶🏻 서울 아기랑 갈만한곳 상암 육아종합센터 서울형 키즈카페 마포구상암점 내돈내산 방문후기 서울...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA3MDZfMjc4%2FMDAxNzUxODA5NjM5NTM4.0GILSkS68vD5npDeEURDvRRpLf1VKa4Jy_NukZnqCIog.5YcIoc8R6GyUIAPNxI_ZnVZaAvHK3X0UARnbtBTkFzMg.JPEG%2FIMG%25A3%25DF7386.JPG%23900x1200&type=f250_208',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-dobong2-1',
    name: '서울형 키즈카페 도봉구 도봉2동 1호점',
    region: 'seoul',
    subRegion: '도봉구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DB231001',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 도봉구 도봉2동 1호점',
      '서울특별시 도봉구 마들로 668'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '도봉2동 생활권의 공공 실내놀이터. 도봉 북부권에서 영유아와 이용할 실내 장소로 좋다.',
    address: '서울특별시 도봉구 마들로 668',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-banghak1',
    name: '서울형 키즈카페 도봉구 방학1동점',
    region: 'seoul',
    subRegion: '도봉구',
    category: 'public-play',
    ageBands: ['1-3y', '3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DB231201',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 도봉구 방학1동점',
      '서울특별시 도봉구 마들로 656'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '방학1동에서 운영되는 공공형 실내 놀이공간. 도봉구 아이와 짧은 회차로 이용하기 좋은 생활권 장소다.',
    address: '서울특별시 도봉구 마들로 656',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '서울형 키즈카페 - 도봉구 방학1동점 1호점(오르봉내리봉)',
        href: 'https://blog.naver.com/eeuuu_/224257644242',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 키즈카페 - 도봉구 방학1동점 1호점(오르봉내리봉)',
        ogDescription:
          '서울형 키즈카페 도장깨기 해야겠어요!!!! 서울형 키즈카페인 오르봉내리봉 처음 가봤는데 너무 만족스럽네...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjA0MTlfMjgw%2FMDAxNzc2NTc4NjAyMTg5.iIKJ3dSEJT82kHOARyQHbG6fTj9jbBactyBBwznaLMEg.derli9VLfYSSwly6VWd9Jc4rEPk_HeHsQBlggXP5dOIg.JPEG%2F900_20260419_090755.jpg%23900x1200&type=ff192_192',
      },
      {
        title:
          '서울형키즈카페 도봉구 방학1동점 오르봉내리봉 방문 후기(주차, 놀이시설)',
        href: 'https://blog.naver.com/tempersm/223927156199',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울형키즈카페 도봉구 방학1동점 오르봉내리봉 방문 후기(주차, 놀이시설)',
        ogDescription:
          '일요일 아침 서울형키즈카페 도봉구 방학1동점 오르봉내리봉 방문하였습니다. 도봉구청에 위치해 있었고 주...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA3MDdfMjQ1%2FMDAxNzUxODc1OTQ1Nzgz.26BTJcg1J95NuCGq23aAojuF8bpBbO7MeuJ6yLqyyNgg.epWliCYipd5_UtCVnSgphIIXMFMXl1CSSEAhB81C7Xcg.JPEG%2FIMG%25A3%25DF9867.jpg%23900x676&type=f250_208',
      },
      {
        title: '서울형키즈카페(도봉구방학1동점)후기',
        href: 'https://blog.naver.com/tnwjddjssl12/224057416936',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페(도봉구방학1동점)후기',
        ogDescription:
          '🎵여러분🎵 이번엔 도봉구 방학1동점 서울형키즈카페에 가족과 가봤어요 ~~ 아이는 2천원 어른은 1천원...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEwMjFfMTE1%2FMDAxNzYxMDE4MjQyODgw.c4vGKbWrL7VmATXUP0NrXZZSAUJeGxBnOCOEpEeIQCgg.mJR3dQFcruZkXWN_6zDT_Akxwwiqix5O_x0JTWSv03kg.JPEG%2F900%25A3%25DF20251012%25A3%25DF090703.jpg%23900x675&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-chang1',
    name: '서울형 키즈카페 도봉구 창1동점',
    region: 'seoul',
    subRegion: '도봉구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DB231202',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 도봉구 창1동점',
      '서울특별시 도봉구 해등로4길 38'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '창1동 생활권에서 이용하는 공공 키즈카페. 영유아 동반 가족의 날씨 독립적인 실내 놀이 후보로 적합하다.',
    address: '서울특별시 도봉구 해등로4길 38',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-chang3',
    name: '서울형 키즈카페 도봉구 창3동점',
    region: 'seoul',
    subRegion: '도봉구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DB241101',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 도봉구 창3동점',
      '서울특별시 도봉구 우이천로4길 24-5'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '창3동에서 확인되는 공공 실내놀이터. 도봉구 창동권 영유아 가족의 근거리 실내 장소로 좋다.',
    address: '서울특별시 도봉구 우이천로4길 24-5',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title:
          '아기랑 갈만한곳 서울형키즈카페 도봉구 창3동점 예약 할인 주차 솔직후기',
        href: 'https://blog.naver.com/yoon615_/224163374799',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '아기랑 갈만한곳 서울형키즈카페 도봉구 창3동점 예약 할인 주차 솔직후기',
        ogDescription:
          '어린이집 교사 시절부터 잘 이용했던 서울형키즈카페 요즘은 저희 아기와 함께 잘 이용하고 있는데요! 도봉...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAxMjlfMiAg%2FMDAxNzY5NjEyNjg5MTMx.MBZ5o6cidKwzE2JLLljRM1V9aX9MjwKECO9ZK-d-usgg.kjPk2Z9c1f7L95Ncs6a12MY_Ew7c7R18wZp70fRx3TIg.JPEG%2FIMG%25A3%25DF6436.jpg%23900x900&type=ff192_192',
      },
      {
        title: '<서울형 키즈카페> 도봉구 창3동점 (우당탕탕 숲속대탐험)',
        href: 'https://blog.naver.com/eunkaren/224208105976',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '<서울형 키즈카페> 도봉구 창3동점 (우당탕탕 숲속대탐험)',
        ogDescription:
          '서울형키즈카페 / 쌍문키즈카페 도봉구 창3동점 우당탕탕 숲속대탐험 📍 서울시 도봉구 우이천로4길 24-5...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTEwMTJfMTcy%2FMDAxNzYwMjQ1MDgzOTYw.8QveZn06Kk-_3nOunoVLAkjlqYO4bwgp-O4S25oR97og.BgZWdpldAlu6eCo1vZVyQEbI7-8m6rnzEgfrYB9MmIQg.JPEG%2FIMG%25A3%25DF6687.JPG%23900x900&type=ff192_192',
      },
      {
        title:
          '도봉구 서울형키즈카페 창3동점 가격 예약 주차 시설 실제 이용 후기',
        href: 'https://blog.naver.com/durod1234/224212543433',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '도봉구 서울형키즈카페 창3동점 가격 예약 주차 시설 실제 이용 후기',
        ogDescription:
          '첫째와 둘째를 모두 만족시키는 서울형키즈카페에 다녀왔다. 보통 서울형 키즈카페는 연령 제한이 있는데, ...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNjAzMTFfMTk3%2FMDAxNzczMjA0Mzg5NDky.0m3junJBUEtRKDOrO-YhZd9IaVITu9CUsfIQJdcr69Qg.wzpdSAyUl19Yt2yjNqzmtRWHzvrtvzxcu8PtrNwdvLsg.JPEG%2FKakaoTalk_20260311_134530073_01.jpg%23676x676&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-dobong2-2',
    name: '서울형 키즈카페 도봉구 도봉2동 2호점',
    region: 'seoul',
    subRegion: '도봉구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DB241102',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 도봉구 도봉2동 2호점',
      '서울특별시 도봉구 도봉로180나길 19'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '도봉2동의 추가 공공 키즈카페 지점. 초등 저학년까지 고려할 수 있는 실내 놀이 선택지다.',
    address: '서울특별시 도봉구 도봉로180나길 19',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 같은 동의 기존 지점과 주소가 달라 별도 장소로 반영했다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
    externalBlogLinks: [
      {
        title: '서울형 키즈카페 | 도봉구 도봉2동 2호점',
        href: 'https://blog.naver.com/hyuckhae/223995031873',
        sourceLabel: 'Naver Blog',
        description:
          '아이와 함께 이용한 현장 분위기를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형 키즈카페 | 도봉구 도봉2동 2호점',
        ogDescription:
          '안녕하세요 쩡이네 든찬맘이예요:) 힘이 넘치는 형제들을 키우기있기때문에 거의 매주 키즈카페를 다니고있...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA5MDRfNzgg%2FMDAxNzU2OTU5ODM4ODgz.qyyEOusKk8cUREzizQwqei534ivcdX9P0QxbYRxldYwg.Qpfg2Ni86bjtkZAKbQtHyyJvhnhvj6A6eH1UJ-eK88Ig.JPEG%2F%25C1%25A6%25B8%25F1%25C0%25BB%25A3%25AD%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4%25A3%25DF%25A3%25AD001%25A3%25A88%25A3%25A9.jpg%23900x900&type=f250_208',
      },
      {
        title: '서울형키즈카페 도봉구 도봉2동 2호점(올라 플레이 그라운드)',
        href: 'https://blog.naver.com/tempersm/223942454484',
        sourceLabel: 'Naver Blog',
        description:
          '이용 요금과 주차 정보를 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle: '서울형키즈카페 도봉구 도봉2동 2호점(올라 플레이 그라운드)',
        ogDescription:
          '비오는 주말, 서울형키즈카페 도봉구 도봉2동 2호점 올라 플레이그라운드에 방문 하였습니다. 후기 전해 드...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA3MjFfMTc1%2FMDAxNzUzMDU3NTMxNzQz.Y4xJKxGkbTCf_y4dBq09-qVZLiBj0A2EXcSt-iCU7FYg.og7MZPWqWDRzyNF91EM_x26X82EuNwhrUQ1_VO1EcPQg.JPEG%2FIMG%25A3%25DF0016.jpg%23900x1200&type=ff192_192',
      },
      {
        title:
          '서울 도봉구 아이와 가 볼 만한 곳 서울형 키즈카페 도봉2동 2호점 예약 이용료 주차',
        href: 'https://blog.naver.com/jennaworld427/223908571356',
        sourceLabel: 'Naver Blog',
        description:
          '주차와 예약 흐름을 방문자 관점에서 확인할 수 있는 후기입니다.',
        ogTitle:
          '서울 도봉구 아이와 가 볼 만한 곳 서울형 키즈카페 도봉2동 2호점 예약 이용료 주차',
        ogDescription:
          '서울형 키즈카페는 주말에 제나와 가끔씩 놀러 가는 곳 중에 하나인데요 요즘은 동네마다 많이 생겨서 도장...',
        ogImage:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA2MjNfMTAg%2FMDAxNzUwNjQ2MjEyNDQx.Y04laD9-rX1Xri-SPrZmXGmPdvD00HPt43nCmPJWGGEg.g0qP6r5pcjTQqfgCtLl5oa2-XZjaMmYWEBBpqRH2S9Ig.GIF%2Fse%25A3%25DFone%25A3%25DFani%25A3%25DF20250623%25A3%25DF113646%25A3%25DFa.gif%23281x500&type=ff192_192',
      },
    ],
  },
  {
    id: 'seoul-public-kids-cafe-ssangmun3',
    name: '서울형 키즈카페 도봉구 쌍문3동점',
    region: 'seoul',
    subRegion: '도봉구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DB241103',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 도봉구 쌍문3동점',
      '서울특별시 도봉구 노해로44길 9'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '쌍문3동에서 예약제로 이용하는 공공형 실내 놀이공간. 도봉구 서부 생활권의 미취학·초등 저학년 실내 후보로 적합하다.',
    address: '서울특별시 도봉구 노해로44길 9',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-chang2',
    name: '서울형 키즈카페 도봉구 창2동점',
    region: 'seoul',
    subRegion: '도봉구',
    category: 'public-play',
    ageBands: ['0-12m', '1-3y', '3-6y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DB241104',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 도봉구 창2동점',
      '서울특별시 도봉구 덕릉로59길 73-3'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '창2동 생활권의 공공 실내놀이터. 영유아와 비 오는 날 짧게 이용할 도봉구 실내 장소로 좋다.',
    address: '서울특별시 도봉구 덕릉로59길 73-3',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
  {
    id: 'seoul-public-kids-cafe-ssangmun1',
    name: '서울형 키즈카페 도봉구 쌍문1동점',
    region: 'seoul',
    subRegion: '도봉구',
    category: 'public-play',
    ageBands: ['3-6y', '6-10y'],
    indoorOutdoor: 'indoor',
    seasons: ['all-season'],
    priceType: 'paid',
    reservationRequired: true,
    parking: false,
    sourceType: 'official',
    sourceUrl:
      'https://icare.seoul.go.kr/icare/user/kidsCafe/BD_selectKidsCafeView.do?q_fcltyId=DB250102',
    naverMapUrl: createNaverMapSearchUrl(
      '서울형 키즈카페 도봉구 쌍문1동점',
      '서울특별시 도봉구 노해로 147'
    ),
    verifiedAt: '2026-05-08',
    lastObservedAt: '2026-05-08',
    verificationStatus: 'official_verified',
    description:
      '쌍문1동에서 확인되는 공공 실내 놀이공간. 도봉구 아이 동반 가족의 예약형 실내 놀이 선택지로 적합하다.',
    address: '서울특별시 도봉구 노해로 147',
    operatingHours: '운영시간 확인 필요',
    priceInfo: '공식 예약 페이지 확인',
    rainFriendly: true,
    stayMinutes: 60,
    operatorType: 'public',
    editorNote:
      '서울시 아이돌봄 공식 시설 상세를 기준으로 반영했으며, 회차·휴관일은 예약 페이지 확인이 필요하다.',
    linkedPostSlugs: [],
    thumbnailImage: '',
  },
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
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EC%98%81%EB%8F%99%EB%8C%80%EB%A1%9C%20513%20%EC%BD%94%EC%97%91%EC%8A%A4%EB%AA%B0%20%EB%82%B4',
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
  },
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
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%86%A1%ED%8C%8C%EA%B5%AC%20%EC%98%AC%EB%A6%BC%ED%94%BD%EB%A1%9C%20300%20%EB%A1%AF%EB%8D%B0%EC%9B%94%EB%93%9C%EB%AA%B0%20B1-B2',
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
  },
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
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC%20%EC%98%81%EC%A4%91%EB%A1%9C%2015%20%ED%83%80%EC%9E%84%EC%8A%A4%ED%80%98%EC%96%B4%204-5%EC%B8%B5',
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
  },
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
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B8%88%EC%B2%9C%EA%B5%AC%20%EB%91%90%EC%82%B0%EB%A1%9C%2071%203%EC%B8%B5',
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
  },
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
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC%20%EC%84%A0%EC%9C%A0%EB%8F%991%EB%A1%9C%2080%20%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC%EC%B2%AD%20%EB%B3%84%EA%B4%80%20E%EB%8F%99',
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
  },
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
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%84%B1%EB%8F%99%EA%B5%AC%20%EB%9A%9D%EC%84%AC%EB%A1%9C%20273%20%EC%84%9C%EC%9A%B8%EC%88%B2',
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
  },
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
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%8F%99%EA%B5%AC%20%EC%B2%9C%ED%98%B8%EB%8C%80%EB%A1%9C%201291',
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
  },
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
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%A7%88%ED%8F%AC%EA%B5%AC%20%ED%95%98%EB%8A%98%EA%B3%B5%EC%9B%90%EB%A1%9C%20108%20%EB%85%B8%EC%9D%84%EA%B3%B5%EC%9B%90%20%EC%A3%BC%EC%B0%A8%EC%9E%A5%20%EC%9E%85%EA%B5%AC',
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
  },
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
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%85%B8%EC%9B%90%EA%B5%AC%20%EB%8D%95%EB%A6%89%EB%A1%9C%20430',
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
  },
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
    naverMapUrl:
      'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EC%84%9C%EA%B5%AC%20%EB%B0%A9%ED%99%94%EB%8F%99%2025%20%EC%9D%BC%EB%8C%80',
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
      '서울시 공식 시설 목록에서 운영 중·무료·연중 현장방문을 확인했다. 생태 프로그램은 별도 예약이 필요하고 계절·현장 상황에 따라 달라진다. 공식 페이지마다 방화동 일대와 안내센터 주소가 달라 현재 공식 시설 주소 기반 검색 링크를 유지한다.',
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
  },
] satisfies PlaceSource[];

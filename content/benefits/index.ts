import type { BenefitSource } from '../../types/benefit-source.ts';

export function assertUniqueBenefitIds<T extends { id: string }>(
  benefits: T[]
): void {
  const seenIds = new Set<string>();

  for (const benefit of benefits) {
    if (seenIds.has(benefit.id)) {
      throw new Error(`Duplicate benefit id: ${benefit.id}`);
    }

    seenIds.add(benefit.id);
  }
}

export const ALL_BENEFITS: BenefitSource[] = [
  {
    id: 'seoul-public-kids-cafe',
    title: '서울형 키즈카페',
    summary:
      '서울 공공 키즈카페 예약과 민간 키즈카페 할인 정보를 함께 확인하는 장소형 혜택입니다.',
    categoryId: 'regional',
    regions: ['seoul'],
    ageBands: ['0-23m', '24-36m', '3-5y', '6-7y'],
    benefitForms: ['facility', 'discount'],
    applicationMethod: 'reservation',
    primaryActionLabel: '서울형 키즈카페 보기',
    primaryActionHref: '/blog/benefits/seoul-public-kids-cafe-guide',
    officialSourceName: '서울시 몽땅정보 만능키',
    officialSourceUrl:
      'https://umppa.seoul.go.kr/hmpg/sprt/bzin/bzmgComtDetail.do?biz_mng_no=6DD24707FB4941C09D10B50AF4917997',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 10,
    relatedPostSlug: 'seoul-public-kids-cafe-guide',
    editorNote:
      '장소 탐색과 직접 연결되는 혜택이므로 /places 서울 공공 놀이시설과 함께 연결한다.',
  },
  {
    id: 'seoul-kids-cafe-money',
    title: '서울형키즈카페머니',
    summary:
      '서울형키즈카페머니 사용처와 민간 키즈카페 할인 여부를 확인하는 절약형 혜택입니다.',
    categoryId: 'savings',
    regions: ['seoul'],
    ageBands: ['0-23m', '24-36m', '3-5y', '6-7y'],
    benefitForms: ['discount', 'voucher'],
    applicationMethod: 'card',
    primaryActionLabel: '사용처 확인하기',
    primaryActionHref:
      'https://umppa.seoul.go.kr/icare/dolbomMENU5/dolbomMENU5_3.jsp',
    officialSourceName: '서울시 몽땅정보 만능키',
    officialSourceUrl:
      'https://umppa.seoul.go.kr/icare/dolbomMENU5/dolbomMENU5_3.jsp',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 9,
  },
  {
    id: 'gyeonggi-family-care-allowance',
    title: '경기도 가족돌봄수당',
    summary:
      '조부모·친인척·이웃 돌봄을 이용하는 가정이 확인할 수 있는 경기 지역 돌봄 혜택입니다.',
    categoryId: 'regional',
    regions: ['gyeonggi-south', 'gyeonggi-north'],
    ageBands: ['24-36m', '3-5y'],
    benefitForms: ['cash', 'care'],
    applicationMethod: 'online',
    primaryActionLabel: '신청 조건 보기',
    primaryActionHref: '/blog/benefits/gyeonggi-family-care-allowance-guide',
    officialSourceName: '경기도',
    officialSourceUrl:
      'https://gnews.gg.go.kr/briefing/brief_gongbo_view.do?BS_CODE=S017&number=68925',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 8,
    relatedPostSlug: 'gyeonggi-family-care-allowance-guide',
  },
  {
    id: 'gyeonggi-child-teen-transport',
    title: '경기도 어린이·청소년 교통비 지원',
    summary:
      '아이와 대중교통 나들이를 자주 하는 경기 가정이 확인할 수 있는 교통비 지원입니다.',
    categoryId: 'savings',
    regions: ['gyeonggi-south', 'gyeonggi-north'],
    ageBands: ['6-7y'],
    benefitForms: ['transport'],
    applicationMethod: 'online',
    primaryActionLabel: '교통비 지원 보기',
    primaryActionHref:
      'https://www.gg.go.kr/contents/contents.do?ciIdx=987119&menuId=266082',
    officialSourceName: '경기도',
    officialSourceUrl:
      'https://www.gg.go.kr/contents/contents.do?ciIdx=987119&menuId=266082',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 7,
  },
  {
    id: 'incheon-cheonsa-support',
    title: '인천 천사지원금',
    summary:
      '인천 1~7세 아동 가정이 확인해야 할 아이드림 계열 현금성 지원입니다.',
    categoryId: 'regional',
    regions: ['incheon'],
    ageBands: ['0-23m', '24-36m', '3-5y', '6-7y'],
    benefitForms: ['cash'],
    applicationMethod: 'online',
    primaryActionLabel: '인천 지원금 보기',
    primaryActionHref: '/blog/benefits/incheon-cheonsa-support-guide',
    officialSourceName: '인천광역시',
    officialSourceUrl:
      'https://www.incheon.go.kr/IC010205/view?curPage=1&repSeq=DOM_0000000014462863',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 10,
    relatedPostSlug: 'incheon-cheonsa-support-guide',
  },
  {
    id: 'incheon-new-imoa-card',
    title: '인천 New 아이모아카드',
    summary:
      '인천 다자녀 가정이 공공시설, 문화시설, 생활 할인 혜택을 확인할 때 쓰는 카드 혜택입니다.',
    categoryId: 'savings',
    regions: ['incheon'],
    ageBands: ['all'],
    benefitForms: ['discount'],
    applicationMethod: 'card',
    primaryActionLabel: '카드 혜택 보기',
    primaryActionHref: 'https://www.incheon.go.kr/earlychild/EC040302',
    officialSourceName: '인천광역시 영유아정책과',
    officialSourceUrl: 'https://www.incheon.go.kr/earlychild/EC040302',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 6,
  },
  {
    id: 'national-first-encounter-voucher',
    title: '첫만남이용권',
    summary:
      '출생 초기 바우처로 조리원, 육아용품, 병원비 지출 계획을 세울 때 함께 확인합니다.',
    categoryId: 'government',
    regions: ['national'],
    ageBands: ['pregnancy-birth', '0-23m'],
    benefitForms: ['voucher'],
    applicationMethod: 'mixed',
    primaryActionLabel: '첫만남이용권 보기',
    primaryActionHref: 'https://www.voucher.go.kr/voucher/firstEncounter.do',
    officialSourceName: '국민행복카드',
    officialSourceUrl: 'https://www.voucher.go.kr/voucher/firstEncounter.do',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 8,
  },
  {
    id: 'national-diaper-formula-voucher',
    title: '기저귀·조제분유 지원',
    summary:
      '0~24개월 영아 가정 중 지원 대상에 해당하는지 확인해야 하는 바우처형 혜택입니다.',
    categoryId: 'government',
    regions: ['national'],
    ageBands: ['0-23m'],
    benefitForms: ['voucher'],
    applicationMethod: 'mixed',
    primaryActionLabel: '복지로에서 보기',
    primaryActionHref:
      'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000092',
    officialSourceName: '복지로',
    officialSourceUrl:
      'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000092',
    verifiedAt: '2026-05-26',
    lastObservedAt: '2026-05-26',
    verificationStatus: 'official_verified',
    priority: 5,
  },
];

assertUniqueBenefitIds(ALL_BENEFITS);

export interface NationalHousingBondGuideRow {
  standardPrice: string;
  metroRate: string;
  otherRate: string;
}

export const NATIONAL_HOUSING_BOND_GUIDE_TITLE = '국민주택채권 의무매입률 안내';

export const NATIONAL_HOUSING_BOND_GUIDE_ROWS: NationalHousingBondGuideRow[] = [
  {
    standardPrice: '2천만원 이상 ~ 5천만원 미만',
    metroRate: '1.3%',
    otherRate: '1.3%',
  },
  {
    standardPrice: '5천만원 이상 ~ 1억원 미만',
    metroRate: '1.9%',
    otherRate: '1.4%',
  },
  {
    standardPrice: '1억원 이상 ~ 1.6억원 미만',
    metroRate: '2.1%',
    otherRate: '1.6%',
  },
  {
    standardPrice: '1.6억원 이상 ~ 2.6억원 미만',
    metroRate: '2.3%',
    otherRate: '1.8%',
  },
  {
    standardPrice: '2.6억원 이상 ~ 6억원 미만',
    metroRate: '2.6%',
    otherRate: '2.1%',
  },
  {
    standardPrice: '6억원 이상',
    metroRate: '3.1%',
    otherRate: '2.6%',
  },
];

# Places Seed Data

장소/시설 시드 데이터 디렉토리입니다.

## 구조

```
content/places/
├── README.md                    # 이 파일
├── index.ts                     # 전체 지역 집계 엔트리
├── seoul/
│   └── index.ts                 # 서울 place seed
├── gyeonggi-south/
│   └── index.ts                 # 경기 남부 place seed
├── gyeonggi-north/
│   └── index.ts                 # 경기 북부 place seed
└── incheon/
    └── index.ts                 # 인천 place seed
```

## 스키마

각 지역 `index.ts`의 place seed 배열은 `PlaceSource[]` 타입을 따릅니다.
`types/place-source.ts` 참고.

### 테마 분류

- `themes`는 시설 카테고리와 별도로 조건 검색에 사용하는 보조 분류입니다.
- `animal`은 동물 관찰·교감, 수족관, 곤충·조류·해양 생태, 자연사처럼 동물이 핵심 방문 이유인 장소에만 붙입니다.
- 일반 공원에서 우연히 동물을 볼 수 있거나 동물 요소가 부수적인 장소에는 붙이지 않습니다.
- `/places?theme=animal`과 지역별 장소 화면의 `동물 체험` 필터가 이 값을 사용합니다.

## 발행 기준

- `verificationStatus`가 `official_verified` 또는 `semi_verified`인 항목만 발행됩니다.
- `discovery_only`는 발행 불가. 검증 완료 후 상태 변경 필요.
- `needs_refresh`는 재검수 완료 후 발행 재개.

## 소스 신뢰도

- `official`: 공식 1차 소스 (공식 웹사이트, 공공데이터포털)
- `semi-official`: 공식/준공식 2차 소스 (한국관광공사, 육아지원기관 포털)
- `discovery`: 민간 발견 소스 (네이버 플레이스, 카카오맵) - 공식 검증 필수

## 운영 원칙

- 후기 텍스트를 사실 정보처럼 단정하지 않는다.
- 가격, 운영시간, 연령 제한을 민간 후기만으로 작성하지 않는다.
- 공식 출처가 없는 정보는 발행하지 않는다.
- 상업형 가격/운영시간은 30일 주기로 확인한다.
- 공공 시설은 분기별(90일) 점검한다.

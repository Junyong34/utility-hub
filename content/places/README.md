# Places Seed Data

장소/시설 시드 데이터 디렉토리입니다.

## 구조

```
content/places/
├── README.md                    # 이 파일
├── seoul/                       # 서울 공공형 시설
│   ├── *.json                   # 개별 장소 파일
└── gyeonggi-south/              # 경기 남부 상업형 시설
    └── *.json                   # 개별 장소 파일
```

## 스키마

각 JSON 파일은 `PlaceSource` 타입을 따릅니다.
`types/place-source.ts` 참고.

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

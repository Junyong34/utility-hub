# 블로그 헤더 카드 이미지 생성 프롬프트

## ✅ 재사용 가능한 블로그 헤더 이미지 프롬프트

```
Create a blog header card image.

Aspect Ratio:
Use this aspect ratio: [ASPECT_RATIO]
If no aspect ratio is provided, default to 1:1.

Text Rule (Very Important):
Do NOT generate any text, letters, numbers, typography, UI labels, logos, or watermarks.

If the provided title or description is NOT in English,
you must strictly avoid generating any characters or symbols in the image.
No embedded words inside icons.
No alphabet elements.
No typographic shapes.
No symbolic text blocks.

Card Design:
Soft rounded modern UI card with large corner radius.
Clean layout with generous internal padding.
Keep the left area visually empty for future text placement.
Place a single 3D symbolic object in the bottom-right area.

Background Rules:
If background color codes are provided:
Use these colors to create a smooth soft gradient:
[BACKGROUND_COLORS]
(Optional additional colors)

If no color codes are provided:
Generate a random soft pastel gradient.
Low saturation.
Modern, calm, friendly tone.
No dark or high-contrast theme.

Icon Generation:
Interpret the meaning of:
Title: [TITLE]
Description: [DESCRIPTION]

Extract the core concept and generate ONE symbolic object.

Important:
The icon must communicate meaning through shape and symbolism only.
Never rely on letters or words inside the icon.

Icon Style:
Soft 3D clay style
Rounded edges
Matte plastic + clay texture
Toy-like appearance
Minimal details
Pastel color palette
Subtle soft shadow
Gentle highlight
No realism
No sharp edges
No complex textures
Clean simplified shapes

Lighting:
Soft studio lighting
Very soft ambient shadow
No dramatic contrast

Composition:
Modern minimal UI card
Balanced negative space
Friendly
Clean
Professional

Final Restriction:
Absolutely no text.
No letters.
No numbers.
No alphanumeric characters.
No embedded wording in objects.
Image only.
High resolution.
Sharp but soft visual finish.
```

---

## 🔄 교체해서 쓰는 부분

* `[ASPECT_RATIO]` - 이미지 비율 (예: 4:3, 16:9, 1:1)
* `[BACKGROUND_COLORS]` - 배경 그라데이션 색상 코드 (예: #CDEBFF,#E8D9FF)
* `[TITLE]` - 블로그 포스트 제목
* `[DESCRIPTION]` - 블로그 포스트 설명/부제

---

## 📝 사용 예시

### 예시 1: 웹사이트 방문 유도 포스트
```
[ASPECT_RATIO]: 4:3
[BACKGROUND_COLORS]: #CDEBFF,#E8D9FF
[TITLE]: 웹 사이트 방문
[DESCRIPTION]: 더 많은 사람들이 클릭 유도하는 방법
```

### 예시 2: 개발 팁 포스트
```
[ASPECT_RATIO]: 16:9
[BACKGROUND_COLORS]: #FFE5E5,#FFF0E5
[TITLE]: React 성능 최적화
[DESCRIPTION]: 렌더링 속도를 2배 빠르게 만드는 방법
```

### 예시 3: 디자인 가이드
```
[ASPECT_RATIO]: 1:1
[BACKGROUND_COLORS]: #E5F5E5,#E5F0FF
[TITLE]: UI/UX 디자인 원칙
[DESCRIPTION]: 사용자 경험을 개선하는 핵심 전략
```

---

## 🎨 디자인 가이드라인

- **비율**: 기본 1:1, 설정에 따라 4:3, 16:9 등 가변
- **스타일**: 3D 클레이 스타일, 부드러운 매트 플라스틱 질감
- **컬러**: 파스텔 톤, 낮은 채도, 모던하고 차분한 느낌
- **레이아웃**: 왼쪽 여백 (텍스트 공간), 오른쪽 하단 심볼릭 오브젝트
- **텍스트 규칙**: 절대 텍스트 생성 금지 (특히 한글/비영어권)
- **조명**: 부드러운 스튜디오 조명, 미묘한 그림자
- **배경**: 소프트 그라데이션, 다크 테마 불가

---

## ⚠️ 주의사항

1. **텍스트 생성 절대 금지**: 이미지 내에 어떠한 문자, 숫자, 타이포그래피도 포함하지 않음
2. **비영어권 콘텐츠**: 한글 등 비영어 제목일 경우 더욱 엄격하게 텍스트 생성 금지
3. **아이콘 내 텍스트**: 심볼릭 오브젝트 안에 글자 형태 포함 금지
4. **색상 톤**: 항상 밝고 친근한 파스텔 톤 유지, 다크/하이 콘트라스트 금지
5. **오브젝트 개수**: 단 하나의 심볼릭 오브젝트만 생성

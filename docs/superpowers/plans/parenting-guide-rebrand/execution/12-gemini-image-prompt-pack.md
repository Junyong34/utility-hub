# Gemini Image Prompt Pack

## 목표

Gemini로 OG 리브랜딩용 마스코트와 보조 이미지를 만들 때 바로 붙여넣어 쓸 수 있는 프롬프트를 제공한다.

## 사용 원칙

1. 메인 마스코트는 `브랜드 전용 오리지널 캐릭터`로 만든다.
2. 특정 IP, 작가명, 스튜디오명을 프롬프트에 넣지 않는다.
3. 최종 용도는 `OG 이미지 삽입용 자산`이므로, 투명 배경과 단순 실루엣을 우선한다.
4. 글자가 들어간 이미지는 만들지 않는다.

## 권장 생성 순서

1. 기본 마스코트 6~10안 생성
2. 가장 좋은 2안 선택
3. 선택안으로 포즈 변형 3종 생성
4. OG 샘플에 얹어본 뒤 최종 채택

## Gemini 사용 팁

- 프롬프트는 영어가 더 안정적일 가능성이 높다.
- 배경 없는 PNG 스타일을 명시하되, 실제 alpha가 안 나오면 후처리를 염두에 둔다.
- `vector-like`, `clean`, `simple shapes`, `no text`, `transparent background`는 반복해서 넣는 편이 좋다.
- 한 번에 너무 많은 요구를 넣지 말고, `기본형 -> 리파인 -> 포즈 변형` 순서로 간다.

## 1. 기본 마스코트 생성 프롬프트

### Prompt A, 토끼 마스코트 기본형

```text
Create an original mascot character for a Korean parenting guide brand.

Character type: a small friendly rabbit
Style: clean vector-like illustration, soft rounded shapes, simple face, child-friendly but premium, not childish
Mood: warm, bright, trustworthy, playful, gentle
Colors: cream, coral, mint, sky blue pastel palette
Pose: standing, facing slightly left, one hand raised in a friendly greeting
Details: short ears, round cheeks, tiny smile, compact body, simple limbs
Background: transparent background
Composition: centered full body character
Output: mascot design only, no text, no frame, no shadow-heavy effects

Important constraints:
- completely original character
- no resemblance to any copyrighted mascot or famous animation character
- no Disney, Pixar, Sanrio, Ghibli, or franchise style
- simple silhouette readable at thumbnail size
```

### Prompt B, 곰 마스코트 기본형

```text
Create an original mascot character for a Korean parenting guide brand.

Character type: a small friendly bear
Style: clean vector-like illustration, soft rounded shapes, minimal facial features, polished and modern
Mood: warm, safe, practical, approachable
Colors: cream, peach, butter yellow, mint pastel palette
Pose: standing upright, slightly turned, one paw waving
Details: rounded ears, simple dot eyes, small smile, very clean silhouette
Background: transparent background
Composition: centered full body character
Output: mascot only, no text, no props unless very subtle

Important constraints:
- completely original character
- no resemblance to any copyrighted mascot or famous animation character
- avoid detailed fur, avoid realism
- designed for reuse in OG images and brand cards
```

### Prompt C, 병아리 마스코트 기본형

```text
Create an original mascot character for a Korean parenting guide brand.

Character type: a tiny cheerful chick
Style: clean vector-like illustration, minimal shapes, premium flat illustration
Mood: bright, cheerful, safe, friendly
Colors: warm cream, soft yellow, coral, sky blue
Pose: standing with one wing slightly lifted as if saying hello
Details: round body, tiny beak, dot eyes, very simple limbs, soft outline
Background: transparent background
Composition: centered full body
Output: no text, no background scene, mascot only

Important constraints:
- completely original
- not too babyish
- no resemblance to any famous cartoon bird
- readable even when scaled down in a 1200x630 OG card
```

### Prompt M, 공룡 마스코트 기본형

```text
Create an original mascot character for a Korean parenting guide brand.

Character type: a cute baby dinosaur, friendly and gentle, slightly chubby proportions
Style: clean vector-like illustration, rounded shapes, simple face, premium flat illustration, child-friendly but not overly childish
Mood: warm, cheerful, safe, playful, trustworthy
Colors: cream, mint, coral, soft sky blue pastel palette
Pose: standing upright, facing slightly left, one tiny arm raised in a friendly hello
Details: small rounded head, short tail, tiny spikes or back plates simplified into soft rounded shapes, dot eyes, tiny smile, compact body
Background: transparent background
Composition: centered full body character
Output: mascot only, no text, no frame, no heavy shadows

Important constraints:
- completely original character
- no resemblance to any copyrighted dinosaur or famous animation character
- no Disney, Pixar, Sanrio, Ghibli, franchise, or toy-brand style
- silhouette must stay simple and readable at thumbnail size
- keep the dinosaur cute and friendly, not aggressive
```

## 2. 리파인 프롬프트

아래 프롬프트는 기본형 1개를 고른 뒤 넣는다.

### Prompt D, 더 정제된 브랜드형으로 다듬기

```text
Refine this mascot into a cleaner and more brand-ready version.

Goals:
- keep the same character identity
- make the silhouette simpler
- make the face more readable at small thumbnail size
- reduce unnecessary detail
- keep the style warm and premium
- keep pastel cream, coral, mint, and sky blue palette
- transparent background

Do not change the character into a different animal.
Do not add text.
Do not add a background scene.
Do not make it look like a famous character.
```

### Prompt E, 더 유아 브랜드처럼 보이지 않게 다듬기

```text
Refine this mascot so it feels suitable for a practical parenting information brand.

Make it:
- warmer
- more polished
- slightly more editorial and premium
- less toy-like
- less childish
- still friendly and welcoming

Keep:
- soft rounded shapes
- simple face
- transparent background
- original character identity

No text, no decorative frame, no copyright resemblance.
```

## 3. 포즈 변형 프롬프트

기본형이 정해진 뒤 아래 3종을 만든다.

### Prompt F, 손 흔들기 포즈

```text
Create a variation of the same mascot character.

Keep the same design identity, proportions, colors, and face.
New pose: waving hello with a friendly smile.
Background: transparent.
Output: mascot only, no text.
```

### Prompt G, 공부/정보 포즈

```text
Create a variation of the same mascot character.

Keep the same character identity, proportions, and colors.
New pose: holding a small notebook or clipboard, as if helping organize information.
Mood: smart, kind, practical.
Background: transparent.
No text.
```

### Prompt H, 별/반짝 포즈

```text
Create a variation of the same mascot character.

Keep the same character identity, proportions, and colors.
New pose: pointing at a small sparkling star icon or playful shape.
Mood: cheerful and helpful.
Background: transparent.
No text.
```

## 4. 배경 패턴 프롬프트

OG 전체 배경은 코드로 만들 수 있지만, 보조 패턴 자산이 필요하면 아래처럼 만든다.

### Prompt I, 구름형 패턴

```text
Create a seamless decorative background pattern for a parenting brand OG image system.

Style: soft flat vector-like pattern
Elements: rounded clouds, tiny dots, soft abstract blobs
Colors: cream background with very light coral, mint, and sky blue accents
Mood: warm, airy, playful, calm
Density: low to medium, not busy
Output: pattern only, no character, no text
```

### Prompt J, 블록/퍼즐형 패턴

```text
Create a seamless decorative background pattern for a parenting guide brand.

Style: simple flat vector-like pattern
Elements: rounded blocks, puzzle-like geometric shapes, tiny stars
Colors: cream, butter yellow, coral, mint, sky blue
Mood: organized, playful, modern
Density: low, clean, editorial
Output: pattern only, no text, no mascot
```

## 5. OG 삽입용 보조 일러스트 프롬프트

마스코트 외에 가벼운 소품이 필요할 때 쓴다.

### Prompt K, 장난감 블록

```text
Create a simple set of parenting-friendly toy block illustrations for use in OG images.

Style: clean vector-like, rounded, premium flat illustration
Colors: coral, mint, butter yellow, sky blue
Background: transparent
Output: toy blocks only, no text, minimal shading
```

### Prompt L, 별/구름/하트 소품 세트

```text
Create a set of tiny decorative icon-like illustrations for a parenting brand OG system.

Objects: star, cloud, heart, sparkle, rounded dot shape
Style: clean vector-like, soft and minimal
Colors: coral, mint, soft yellow, sky blue
Background: transparent
Output: decorative assets only, no text
```

## 6. Gemini에 같이 붙이면 좋은 제한 문구

아래 문구는 거의 공통으로 붙여도 된다.

```text
No text.
No logo.
Transparent background.
Simple silhouette.
Readable at thumbnail size.
Original character only.
No resemblance to any copyrighted character or franchise.
```

## 7. 추천 실제 실행 플로우

### 첫 실행

1. Prompt A, B, C, M 중 하나 선택
2. 6~10개 시안 생성
3. 가장 좋은 2개만 남김

### 두 번째 실행

1. Prompt D 또는 E로 정제
2. 더 단순하고 작은 썸네일에서도 보이게 리파인

### 세 번째 실행

1. Prompt F, G, H로 포즈 3종 생성
2. `default`, `wave`, `study` 3개 파일로 채택

## 8. 가장 추천하는 조합

지금 프로젝트엔 아래 조합이 가장 잘 맞는다.

1. `Prompt A`로 토끼 기본형 생성
2. `Prompt E`로 실용형 브랜드 톤 리파인
3. `Prompt F/G/H`로 3포즈 생성

이유:

- 육아 서비스와 잘 맞고
- 과하게 유아틱하지 않고
- OG 카드 우측 하단에 넣기 좋다

공룡이 더 마음에 들면 아래 조합으로 가면 된다.

1. `Prompt M`으로 공룡 기본형 생성
2. `Prompt E`로 덜 장난감 같고 더 브랜드형으로 리파인
3. `Prompt F/G/H`로 `wave`, `study`, `sparkle` 3포즈 생성

이 조합은 `재미`가 더 크고, 키즈카페/놀이시설 콘텐츠와 특히 잘 맞는다.

## 신뢰도 메모

이 프롬프트는 현재 확정된 브랜드 톤, OG 리브랜딩 문서, 마스코트 전략 문서를 바탕으로 작성했다.  
다만 Gemini 이미지 생성 결과는 모델 업데이트와 입력 해석에 따라 달라질 수 있으므로, 한 번에 정답이 나오지 않을 수 있다. 이 부분은 정확하지 않을 수 있다.

## Brief Conclusion

가장 먼저는 `토끼 기본형 -> 리파인 -> 포즈 3종` 순서로 가는 게 좋다.

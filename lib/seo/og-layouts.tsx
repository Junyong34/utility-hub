/**
 * OG Image 레이아웃 변형
 *
 * Takumi(@takumi-rs/image-response) 렌더러에서 사용하는 JSX 컴포넌트.
 * 각 레이아웃은 OgThemePreset 토큰을 받아 일관된 브랜드 톤을 유지한다.
 */
import type { OgThemePreset } from './og-theme'

/* ── 공통 props ── */
export interface OgLayoutProps {
  title: string
  description?: string
  label: string
  footerText: string
  theme: OgThemePreset
  imageUrl?: string
  mascotUrl?: string
}

/* ── 유틸 ── */
function clampText(value: string, maxLength: number): string {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value
}

/* ── 공통 데코 요소: 둥근 블롭 ── */
function DecoBlobs({ accent }: { accent: string }) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex' }}>
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-30px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: accent,
          opacity: 0.08,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20px',
          left: '30%',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          backgroundColor: accent,
          opacity: 0.06,
        }}
      />
    </div>
  )
}

/* ────────────────────────────────────
   Template A: play-card
   블로그 기본 OG / 혜택·가이드 글
   ──────────────────────────────────── */
export function PlayCardLayout({
  title,
  description,
  label,
  footerText,
  theme,
  imageUrl,
  mascotUrl,
}: OgLayoutProps) {
  const hasSideVisual = !!(imageUrl || mascotUrl)
  const clampedTitle = clampText(title.trim(), hasSideVisual ? 68 : 96)
  const clampedDesc = description?.trim()
    ? clampText(description.trim(), hasSideVisual ? 120 : 180)
    : undefined

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: theme.bg,
        fontFamily: 'Noto Sans KR',
        padding: '36px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <DecoBlobs accent={theme.accent} />

      {/* 좌측 하단 라인 장식 */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '36px',
          right: '36px',
          height: '4px',
          borderRadius: '999px',
          backgroundColor: theme.barColor,
          opacity: 0.18,
        }}
      />

      <div
        style={{
          display: 'flex',
          flex: 1,
          gap: '28px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* 텍스트 영역 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: hasSideVisual ? '60%' : '100%',
            padding: '18px 20px 18px 20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
            }}
          >
            {/* 라벨 배지 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                padding: '8px 16px',
                borderRadius: '999px',
                backgroundColor: theme.labelBg,
                color: theme.labelText,
                fontSize: '20px',
                fontWeight: 700,
                letterSpacing: '0.06em',
              }}
            >
              {label}
            </div>

            {/* 제목 + 설명 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: hasSideVisual ? '52px' : '60px',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  color: theme.titleColor,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {clampedTitle}
              </div>

              {clampedDesc ? (
                <div
                  style={{
                    display: 'flex',
                    fontSize: '26px',
                    lineHeight: 1.45,
                    color: theme.descColor,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {clampedDesc}
                </div>
              ) : null}
            </div>
          </div>

          {/* 하단 푸터 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '20px',
                color: theme.footerColor,
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '999px',
                  backgroundColor: theme.footerDotColor,
                }}
              />
              {footerText}
            </div>

            <div
              style={{
                width: '100px',
                height: '10px',
                borderRadius: '999px',
                backgroundColor: theme.barColor,
                opacity: 0.5,
              }}
            />
          </div>
        </div>

        {/* 우측 시각 요소 (이미지 또는 마스코트) */}
        {hasSideVisual ? (
          <div
            style={{
              width: '40%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: '0 16px 0 0',
              position: 'relative',
            }}
          >
            {imageUrl ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '2px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                  margin: '16px 0',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ) : null}

            {/* 마스코트: 이미지 없으면 우측 크게, 있으면 우하단 겹침 */}
            {mascotUrl ? (
              <div
                style={{
                  position: imageUrl ? 'absolute' : 'relative',
                  bottom: imageUrl ? '-4px' : '0',
                  right: imageUrl ? '0' : undefined,
                  width: imageUrl ? '180px' : '320px',
                  height: imageUrl ? '180px' : '420px',
                  display: 'flex',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mascotUrl}
                  alt="mascot"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

/* ────────────────────────────────────
   Template B: tool-card
   도구 전용
   ──────────────────────────────────── */
export function ToolCardLayout({
  title,
  description,
  label,
  footerText,
  theme,
  mascotUrl,
}: OgLayoutProps) {
  const clampedTitle = clampText(title.trim(), 68)
  const clampedDesc = description?.trim()
    ? clampText(description.trim(), 140)
    : undefined

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: theme.bg,
        fontFamily: 'Noto Sans KR',
        padding: '36px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <DecoBlobs accent={theme.accent} />

      {/* 중앙 포인트 카드 */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          borderRadius: '24px',
          backgroundColor: '#FFFFFF',
          border: '2px solid rgba(0,0,0,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
          padding: '40px 44px',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {/* 카드 내부 상단 포인트 바 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '44px',
            right: '44px',
            height: '4px',
            backgroundColor: theme.accent,
            borderRadius: '0 0 4px 4px',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* 라벨 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                padding: '6px 14px',
                borderRadius: '999px',
                backgroundColor: theme.labelBg,
                color: theme.labelText,
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '0.06em',
              }}
            >
              {label}
            </div>

            {/* 제목 */}
            <div
              style={{
                display: 'flex',
                fontSize: '48px',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: theme.titleColor,
                whiteSpace: 'pre-wrap',
              }}
            >
              {clampedTitle}
            </div>

            {/* 설명 */}
            {clampedDesc ? (
              <div
                style={{
                  display: 'flex',
                  fontSize: '24px',
                  lineHeight: 1.5,
                  color: theme.descColor,
                  whiteSpace: 'pre-wrap',
                  maxWidth: '80%',
                }}
              >
                {clampedDesc}
              </div>
            ) : null}
          </div>

          {/* 푸터 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '18px',
              color: theme.footerColor,
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '999px',
                backgroundColor: theme.footerDotColor,
              }}
            />
            {footerText}
          </div>
        </div>

        {/* 마스코트 — 카드 우측에 크게 배치 */}
        {mascotUrl ? (
          <div
            style={{
              position: 'absolute',
              bottom: '-8px',
              right: '24px',
              width: '240px',
              height: '300px',
              display: 'flex',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mascotUrl}
              alt="mascot"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

import ImageResponse from '@takumi-rs/image-response'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { SITE_CONFIG } from './metadata'

const DEFAULT_BG_COLOR = '#0f172a'
const DEFAULT_ACCENT_COLOR = '#38bdf8'
const NOTO_SANS_KR_REGULAR_URL =
  join(
    process.cwd(),
    'public',
    'fonts',
    'og',
    'noto-sans-kr-korean-400-normal.woff2'
  )
const NOTO_SANS_KR_BOLD_URL =
  join(
    process.cwd(),
    'public',
    'fonts',
    'og',
    'noto-sans-kr-korean-700-normal.woff2'
  )

const TAILWIND_COLOR_MAP: Record<string, string> = {
  'amber-500': '#f59e0b',
  'blue-500': '#3b82f6',
  'emerald-500': '#10b981',
  'fuchsia-500': '#d946ef',
  'green-500': '#22c55e',
  'indigo-500': '#6366f1',
  'orange-500': '#f97316',
  'purple-500': '#a855f7',
  'teal-500': '#14b8a6',
}

export interface OgImageTheme {
  bgColor: string
  accentColor: string
}

export interface OgImageModel {
  title: string
  description?: string
  image?: string
  label?: string
  footerText?: string
  bgColor?: string
  accentColor?: string
}

interface OgResponseOptions {
  format?: 'png' | 'webp'
  filename?: string
}

interface OgFontDefinition {
  name: string
  data: ArrayBuffer
  weight: number
  style: 'normal'
}

let ogFontsPromise: Promise<OgFontDefinition[]> | undefined

async function fetchOgFont(url: string): Promise<ArrayBuffer> {
  const fontBuffer = await readFile(url)
  return fontBuffer.buffer.slice(
    fontBuffer.byteOffset,
    fontBuffer.byteOffset + fontBuffer.byteLength
  )
}

async function loadOgFonts(): Promise<OgFontDefinition[]> {
  if (!ogFontsPromise) {
    ogFontsPromise = Promise.all([
      fetchOgFont(NOTO_SANS_KR_REGULAR_URL),
      fetchOgFont(NOTO_SANS_KR_BOLD_URL),
    ])
      .then(([regular, bold]) => [
        {
          name: 'Noto Sans KR',
          data: regular,
          weight: 400,
          style: 'normal' as const,
        },
        {
          name: 'Noto Sans KR',
          data: bold,
          weight: 700,
          style: 'normal' as const,
        },
      ])
      .catch((error) => {
        console.warn(
          'Failed to load OG fonts, falling back to Takumi defaults.',
          error
        )
        return []
      })
  }

  return ogFontsPromise ?? []
}

function clampText(value: string, maxLength: number): string {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value
}

function normalizeHexColor(value: string | undefined, fallback: string): string {
  if (!value) {
    return fallback
  }

  const sanitized = value.trim()

  if (/^#[0-9a-fA-F]{6}$/.test(sanitized)) {
    return sanitized
  }

  if (/^[0-9a-fA-F]{6}$/.test(sanitized)) {
    return `#${sanitized}`
  }

  return fallback
}

function extractGradientToken(
  color: string | undefined,
  prefix: 'from' | 'to'
): string | undefined {
  if (!color) {
    return undefined
  }

  const match = color.match(new RegExp(`${prefix}-([a-z]+-\\d{3})`))
  return match?.[1]
}

function resolveImageUrl(
  request: Request,
  image: string | undefined
): string | undefined {
  if (!image) {
    return undefined
  }

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }

  if (image.startsWith('/')) {
    return new URL(image, request.url).toString()
  }

  return undefined
}

export function resolveToolOgTheme(color: string | undefined): OgImageTheme {
  const fromColor = extractGradientToken(color, 'from')
  const toColor = extractGradientToken(color, 'to')

  return {
    bgColor: TAILWIND_COLOR_MAP[fromColor ?? ''] ?? DEFAULT_BG_COLOR,
    accentColor: TAILWIND_COLOR_MAP[toColor ?? ''] ?? DEFAULT_ACCENT_COLOR,
  }
}

export async function createOgImageResponse(
  request: Request,
  model: OgImageModel,
  responseOptions: OgResponseOptions = {}
): Promise<Response> {
  const bgColor = normalizeHexColor(model.bgColor, DEFAULT_BG_COLOR)
  const accentColor = normalizeHexColor(
    model.accentColor,
    DEFAULT_ACCENT_COLOR
  )
  const fonts = await loadOgFonts()
  const imageUrl = resolveImageUrl(request, model.image)
  const title = clampText(model.title.trim(), imageUrl ? 68 : 96)
  const description = model.description?.trim()
    ? clampText(model.description.trim(), imageUrl ? 120 : 180)
    : undefined
  const footerText =
    model.footerText ?? SITE_CONFIG.url.replace(/^https?:\/\//, '')
  const label = model.label ?? SITE_CONFIG.name.toUpperCase()
  const format = responseOptions.format ?? 'png'
  const headers: Record<string, string> = {
    'Cache-Control':
      'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
  }

  if (responseOptions.filename) {
    headers['Content-Disposition'] =
      `attachment; filename="${responseOptions.filename}"`
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: `linear-gradient(135deg, ${bgColor} 0%, #020617 58%, ${accentColor} 100%)`,
          color: '#f8fafc',
          fontFamily: 'Noto Sans KR',
          padding: '36px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            borderRadius: '28px',
            border: '1px solid rgba(255,255,255,0.12)',
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: imageUrl ? '58%' : '100%',
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  padding: '10px 16px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255,255,255,0.14)',
                  color: '#f8fafc',
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                }}
              >
                {label}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    fontSize: imageUrl ? '58px' : '66px',
                    fontWeight: 700,
                    lineHeight: 1.12,
                    letterSpacing: '-0.03em',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {title}
                </div>

                {description ? (
                  <div
                    style={{
                      display: 'flex',
                      fontSize: '28px',
                      lineHeight: 1.45,
                      color: 'rgba(248,250,252,0.82)',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {description}
                  </div>
                ) : null}
              </div>
            </div>

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
                  gap: '12px',
                  fontSize: '22px',
                  color: 'rgba(248,250,252,0.78)',
                }}
              >
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '999px',
                    backgroundColor: accentColor,
                  }}
                />
                {footerText}
              </div>

              <div
                style={{
                  width: '132px',
                  height: '12px',
                  borderRadius: '999px',
                  backgroundColor: accentColor,
                }}
              />
            </div>
          </div>

          {imageUrl ? (
            <div
              style={{
                width: '42%',
                display: 'flex',
                alignItems: 'stretch',
                padding: '8px 8px 8px 0',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.16)',
                  boxShadow: '0 18px 60px rgba(2,6,23,0.32)',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                }}
              >
                {/* Takumi renderer는 next/image 대신 표준 img src를 사용해야 한다. */}
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
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      format,
      ...(fonts.length > 0 ? { fonts } : {}),
      headers,
    }
  )
}

import ImageResponse from '@takumi-rs/image-response'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { SITE_CONFIG } from './metadata'
import { PlayCardLayout, ToolCardLayout } from './og-layouts'
import type { OgLayoutProps } from './og-layouts'
import { resolveThemePreset } from './og-theme'
import type { OgLayoutVariant } from './og-theme'

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

const MASCOT_FS_PATH = join(
  process.cwd(),
  'public',
  'images',
  'mascot',
  'mascot_dinosaur.png'
)

let mascotDataUriPromise: Promise<string | undefined> | undefined

async function loadMascotDataUri(): Promise<string | undefined> {
  if (!mascotDataUriPromise) {
    mascotDataUriPromise = readFile(MASCOT_FS_PATH)
      .then((buf) => `data:image/png;base64,${buf.toString('base64')}`)
      .catch((err) => {
        console.warn('Failed to load mascot image:', err)
        return undefined
      })
  }
  return mascotDataUriPromise
}

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
  /** 새 레이아웃 시스템 옵션 */
  themePreset?: string
  layoutVariant?: OgLayoutVariant
  mascotEnabled?: boolean
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

const imageDataUriCache = new Map<string, Promise<string | undefined>>()

function mimeFromExt(path: string): string {
  if (path.endsWith('.png')) return 'image/png'
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg'
  if (path.endsWith('.webp')) return 'image/webp'
  if (path.endsWith('.svg')) return 'image/svg+xml'
  return 'image/png'
}

/**
 * 로컬 public/ 경로의 이미지를 base64 data URI로 읽어온다.
 * HTTP self-request 데드락을 방지한다.
 */
async function resolveLocalImageAsDataUri(
  localPath: string
): Promise<string | undefined> {
  if (!localPath.startsWith('/')) return undefined

  let cached = imageDataUriCache.get(localPath)
  if (!cached) {
    const fsPath = join(process.cwd(), 'public', localPath)
    cached = readFile(fsPath)
      .then((buf) => `data:${mimeFromExt(localPath)};base64,${buf.toString('base64')}`)
      .catch(() => undefined)
    imageDataUriCache.set(localPath, cached)
  }
  return cached
}

export function resolveToolOgTheme(color: string | undefined): OgImageTheme {
  const fromColor = extractGradientToken(color, 'from')
  const toColor = extractGradientToken(color, 'to')

  return {
    bgColor: TAILWIND_COLOR_MAP[fromColor ?? ''] ?? DEFAULT_BG_COLOR,
    accentColor: TAILWIND_COLOR_MAP[toColor ?? ''] ?? DEFAULT_ACCENT_COLOR,
  }
}

function buildResponseHeaders(
  format: string,
  filename?: string
): Record<string, string> {
  const headers: Record<string, string> = {
    'Cache-Control':
      'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
  }

  if (filename) {
    headers['Content-Disposition'] =
      `attachment; filename="${filename}"`
  }

  return headers
}

/**
 * 새 레이아웃 기반 OG 이미지 생성.
 * play-card / tool-card 레이아웃을 테마 프리셋과 조합한다.
 */
export async function createOgImageResponse(
  request: Request,
  model: OgImageModel,
  responseOptions: OgResponseOptions = {}
): Promise<Response> {
  const layout = model.layoutVariant
  const hasNewLayout = layout === 'play-card' || layout === 'tool-card'

  if (hasNewLayout) {
    return createBrandedOgResponse(request, model, responseOptions)
  }

  // 레거시 다크 레이아웃 (layoutVariant 미지정 또는 custom-studio)
  return createLegacyOgResponse(request, model, responseOptions)
}

/**
 * 새 브랜딩 레이아웃 렌더링
 */
async function createBrandedOgResponse(
  request: Request,
  model: OgImageModel,
  responseOptions: OgResponseOptions
): Promise<Response> {
  const theme = resolveThemePreset(model.themePreset)
  const fonts = await loadOgFonts()

  // 로컬 이미지는 base64 data URI로 변환 (HTTP self-request 방지)
  let imageUrl: string | undefined
  if (model.image?.startsWith('/')) {
    imageUrl = await resolveLocalImageAsDataUri(model.image)
  } else {
    imageUrl = resolveImageUrl(request, model.image)
  }

  const mascotUrl =
    model.mascotEnabled !== false
      ? await loadMascotDataUri()
      : undefined
  const footerText =
    model.footerText ?? SITE_CONFIG.url.replace(/^https?:\/\//, '')
  const label = model.label ?? SITE_CONFIG.name.toUpperCase()
  const format = responseOptions.format ?? 'png'
  const headers = buildResponseHeaders(format, responseOptions.filename)

  const layoutProps: OgLayoutProps = {
    title: model.title,
    description: model.description,
    label,
    footerText,
    theme,
    imageUrl,
    mascotUrl,
  }

  const element =
    model.layoutVariant === 'tool-card' ? (
      <ToolCardLayout {...layoutProps} />
    ) : (
      <PlayCardLayout {...layoutProps} />
    )

  return new ImageResponse(element, {
    width: 1200,
    height: 630,
    format,
    ...(fonts.length > 0 ? { fonts } : {}),
    headers,
  })
}

/**
 * 레거시 다크 그라디언트 레이아웃 (기존 호환)
 */
async function createLegacyOgResponse(
  request: Request,
  model: OgImageModel,
  responseOptions: OgResponseOptions
): Promise<Response> {
  // themePreset이 지정되면 해당 프리셋의 색상 사용, 아니면 직접 hex 사용
  let bgColor: string
  let accentColor: string

  if (model.themePreset && model.themePreset !== 'dark') {
    const theme = resolveThemePreset(model.themePreset)
    bgColor = theme.bg
    accentColor = theme.accent
  } else {
    bgColor = normalizeHexColor(model.bgColor, DEFAULT_BG_COLOR)
    accentColor = normalizeHexColor(model.accentColor, DEFAULT_ACCENT_COLOR)
  }

  const fonts = await loadOgFonts()
  const imageUrl = resolveImageUrl(request, model.image)
  const isDark =
    bgColor === DEFAULT_BG_COLOR || bgColor.startsWith('#0')

  // 다크 테마일 때는 기존 그라디언트, 밝은 테마일 때는 단색 배경
  const background = isDark
    ? `linear-gradient(135deg, ${bgColor} 0%, #020617 58%, ${accentColor} 100%)`
    : bgColor

  const textColor = isDark ? '#f8fafc' : '#25303B'
  const descColor = isDark ? 'rgba(248,250,252,0.82)' : '#4D5A67'
  const footerColor = isDark ? 'rgba(248,250,252,0.78)' : '#4D5A67'
  const labelBg = isDark ? 'rgba(255,255,255,0.14)' : accentColor
  const labelTextColor = isDark ? '#f8fafc' : '#FFFFFF'
  const borderColor = isDark
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(0,0,0,0.08)'

  const clampText = (v: string, max: number) =>
    v.length > max ? `${v.slice(0, max - 1)}…` : v
  const title = clampText(model.title.trim(), imageUrl ? 68 : 96)
  const description = model.description?.trim()
    ? clampText(model.description.trim(), imageUrl ? 120 : 180)
    : undefined
  const footerText =
    model.footerText ?? SITE_CONFIG.url.replace(/^https?:\/\//, '')
  const label = model.label ?? SITE_CONFIG.name.toUpperCase()
  const format = responseOptions.format ?? 'png'
  const headers = buildResponseHeaders(format, responseOptions.filename)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background,
          color: textColor,
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
            border: `1px solid ${borderColor}`,
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
                  backgroundColor: labelBg,
                  color: labelTextColor,
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
                      color: descColor,
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
                  color: footerColor,
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
                  border: isDark
                    ? '1px solid rgba(255,255,255,0.16)'
                    : '2px solid rgba(0,0,0,0.06)',
                  boxShadow: isDark
                    ? '0 18px 60px rgba(2,6,23,0.32)'
                    : '0 12px 40px rgba(0,0,0,0.08)',
                  backgroundColor: isDark
                    ? 'rgba(255,255,255,0.08)'
                    : '#FFFFFF',
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

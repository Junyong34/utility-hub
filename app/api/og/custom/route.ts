import { createOgImageResponse } from '@/lib/seo/og-renderer'

export const runtime = 'nodejs'

function pickFormat(
  searchParams: URLSearchParams
): 'png' | 'webp' | undefined {
  const value = searchParams.get('format')?.trim()

  if (value === 'png' || value === 'webp') {
    return value
  }

  return undefined
}

function pickValue(
  searchParams: URLSearchParams,
  key: string
): string | undefined {
  const value = searchParams.get(key)?.trim()
  return value ? value : undefined
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const format = pickFormat(searchParams)
  const shouldDownload = searchParams.get('download') === '1'

  return await createOgImageResponse(request, {
    title: pickValue(searchParams, 'title') || 'Zento OG Image',
    description: pickValue(searchParams, 'description'),
    image: pickValue(searchParams, 'image'),
    label: pickValue(searchParams, 'label') || 'CUSTOM',
    bgColor: pickValue(searchParams, 'bgColor'),
    accentColor: pickValue(searchParams, 'accentColor'),
    footerText: 'zento.kr/custom-og',
  }, {
    format,
    filename: shouldDownload
      ? `custom-og-image.${format ?? 'png'}`
      : undefined,
  })
}

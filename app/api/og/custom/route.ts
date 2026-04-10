import { createOgImageResponse } from '@/lib/seo/og-renderer';

export const runtime = 'nodejs';

function pickFormat(searchParams: URLSearchParams): 'png' | 'webp' | undefined {
  const value = searchParams.get('format')?.trim();

  if (value === 'png' || value === 'webp') {
    return value;
  }

  return undefined;
}

function pickValue(
  searchParams: URLSearchParams,
  key: string
): string | undefined {
  const value = searchParams.get(key)?.trim();
  return value ? value : undefined;
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const format = pickFormat(searchParams);
  const shouldDownload = searchParams.get('download') === '1';
  const mascotEnabled = searchParams.get('mascotEnabled') !== '0';
  const layoutVariant = pickValue(searchParams, 'layoutVariant') as
    | 'play-card'
    | 'tool-card'
    | 'custom-studio'
    | undefined;
  const themePreset = pickValue(searchParams, 'themePreset');

  return await createOgImageResponse(
    request,
    {
      title: pickValue(searchParams, 'title') || 'Zento OG Image',
      description: pickValue(searchParams, 'description'),
      image: pickValue(searchParams, 'image'),
      label: pickValue(searchParams, 'label') || 'GUIDE',
      bgColor: pickValue(searchParams, 'bgColor'),
      accentColor: pickValue(searchParams, 'accentColor'),
      footerText: 'zento.kr',
      themePreset: themePreset ?? 'cream',
      layoutVariant: layoutVariant ?? 'play-card',
      mascotEnabled,
    },
    {
      format,
      filename: shouldDownload
        ? `custom-og-image.${format ?? 'png'}`
        : undefined,
    }
  );
}

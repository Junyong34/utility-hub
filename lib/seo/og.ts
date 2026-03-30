export interface BlogOgImagePathInput {
  categorySlug: string
  slug: string
}

export interface CustomOgImagePathInput {
  title: string
  description?: string
  image?: string
  imageEnabled?: boolean
  format?: 'png' | 'webp'
  download?: boolean
  bgColor?: string
  accentColor?: string
  label?: string
}

export function buildBlogOgImagePath({
  categorySlug,
  slug,
}: BlogOgImagePathInput): string {
  return `/api/og/blog/${encodeURIComponent(categorySlug)}/${encodeURIComponent(slug)}`
}

export function buildToolOgImagePath(toolId: string): string {
  return `/api/og/tools/${encodeURIComponent(toolId)}`
}

export function buildCustomOgImagePath(
  input: CustomOgImagePathInput
): string {
  const params = new URLSearchParams()

  params.set('title', input.title)

  if (input.description) {
    params.set('description', input.description)
  }

  if (input.imageEnabled !== false && input.image) {
    params.set('image', input.image)
  }

  if (input.bgColor) {
    params.set('bgColor', input.bgColor)
  }

  if (input.accentColor) {
    params.set('accentColor', input.accentColor)
  }

  if (input.label) {
    params.set('label', input.label)
  }

  if (input.format) {
    params.set('format', input.format)
  }

  if (input.download) {
    params.set('download', '1')
  }

  return `/api/og/custom?${params.toString()}`
}

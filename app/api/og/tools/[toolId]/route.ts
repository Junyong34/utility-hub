import { getToolConfig } from '@/lib/tools/tool-config'
import { createOgImageResponse } from '@/lib/seo/og-renderer'
import { TOOL_CATEGORY_THEME_MAP, DEFAULT_THEME_PRESET } from '@/lib/seo/og-theme'

export const runtime = 'nodejs'

interface RouteContext {
  params: Promise<{
    toolId: string
  }>
}

function resolveToolPresetName(category: string | undefined): string {
  if (!category) return DEFAULT_THEME_PRESET
  return TOOL_CATEGORY_THEME_MAP[category] ?? DEFAULT_THEME_PRESET
}

export async function GET(
  request: Request,
  { params }: RouteContext
): Promise<Response> {
  const { toolId } = await params
  const tool = getToolConfig(toolId)

  if (!tool) {
    return new Response('Tool not found', {
      status: 404,
    })
  }

  return await createOgImageResponse(request, {
    title: tool.name,
    description: tool.description,
    label: tool.badge || 'TOOL',
    footerText: `zento.kr/tools/${tool.id}`,
    layoutVariant: 'tool-card',
    themePreset: resolveToolPresetName(tool.category),
    mascotEnabled: true,
  })
}

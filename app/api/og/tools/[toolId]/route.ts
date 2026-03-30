import { getToolConfig } from '@/lib/tools/tool-config'
import {
  createOgImageResponse,
  resolveToolOgTheme,
} from '@/lib/seo/og-renderer'

export const runtime = 'nodejs'

interface RouteContext {
  params: Promise<{
    toolId: string
  }>
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

  const theme = resolveToolOgTheme(tool.color)

  return await createOgImageResponse(request, {
    title: tool.name,
    description: tool.description,
    label: tool.badge || 'TOOL',
    bgColor: theme.bgColor,
    accentColor: theme.accentColor,
    footerText: `zento.kr/tools/${tool.id}`,
  })
}

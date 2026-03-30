import { getPostBySlug } from '@/lib/blog/posts'
import { createOgImageResponse } from '@/lib/seo/og-renderer'

export const runtime = 'nodejs'

interface RouteContext {
  params: Promise<{
    category: string
    slug: string
  }>
}

export async function GET(
  request: Request,
  { params }: RouteContext
): Promise<Response> {
  const { category, slug } = await params
  const post = getPostBySlug(slug, category)

  if (!post) {
    return new Response('Post not found', {
      status: 404,
    })
  }

  return await createOgImageResponse(request, {
    title: post.title,
    description: post.excerpt,
    label: post.category,
    accentColor: '#38bdf8',
    footerText: `zento.kr/blog/${post.categorySlug}`,
  })
}

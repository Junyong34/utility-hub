// @ts-expect-error Node strip-types tests require the explicit `.ts` extension.
import { buildBlogOgImagePath, buildToolOgImagePath } from './og.ts'

interface BlogOgPolicyInput {
  slug: string
  categorySlug: string
  ogImage?: string
}

export function resolveBlogPostOgImage(input: BlogOgPolicyInput): string {
  return (
    input.ogImage ??
    buildBlogOgImagePath({
      categorySlug: input.categorySlug,
      slug: input.slug,
    })
  )
}

export function resolveToolMetadataOgImage(
  toolId: string,
  ogImage?: string
): string {
  return ogImage ?? buildToolOgImagePath(toolId)
}

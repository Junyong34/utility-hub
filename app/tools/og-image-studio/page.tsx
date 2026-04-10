import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Breadcrumb } from '@/components/seo';
import { CustomOgForm } from '@/components/tools/og-image-studio/CustomOgForm';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getAllPosts } from '@/lib/blog/posts';
import { generateMetadata as createMetadata } from '@/lib/seo';
import {
  buildBlogOgImagePath,
  buildCustomOgImagePath,
  buildToolOgImagePath,
} from '@/lib/seo/og';
import { getAllToolConfigs } from '@/lib/tools';

type StudioMode = 'blog' | 'tool' | 'custom';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

interface StudioCustomValues {
  title: string;
  description: string;
  image: string;
  imageEnabled: boolean;
  bgColor: string;
  accentColor: string;
  label: string;
  themePreset: string;
  layoutVariant: string;
  mascotEnabled: boolean;
}

const BLOG_OPTIONS = getAllPosts().map(post => ({
  value: `${post.categorySlug}/${post.slug}`,
  label: `${post.category} · ${post.title}`,
}));

const TOOL_OPTIONS = getAllToolConfigs().map(tool => ({
  value: tool.id,
  label: tool.name,
}));

const DEFAULT_CUSTOM_VALUES: StudioCustomValues = {
  title: 'Zento OG Image',
  description: 'Takumi 기반으로 배경, 텍스트, 이미지를 조합한 미리보기입니다.',
  image: '/og-images/',
  imageEnabled: true,
  bgColor: '#FFF8EF',
  accentColor: '#FF8D73',
  label: 'GUIDE',
  themePreset: 'cream',
  layoutVariant: 'play-card',
  mascotEnabled: true,
};

export const metadata: Metadata = createMetadata({
  title: 'OG Image Studio',
  description:
    'Takumi 기반 OG 이미지를 blog, tool, custom 모드로 미리보고 다운로드할 수 있는 내부 스튜디오 페이지입니다.',
  canonical: 'https://www.zento.kr/tools/og-image-studio',
  keywords: ['OG 이미지 생성기', 'Takumi', '동적 OG 이미지', 'OG 미리보기'],
  ogImage: buildCustomOgImagePath({
    title: 'OG Image Studio',
    description: 'Takumi 기반 OG 이미지 미리보기와 다운로드',
    label: 'STUDIO',
    themePreset: 'cream',
    layoutVariant: 'play-card',
  }),
});

function readValue(
  searchParams: Record<string, string | string[] | undefined>,
  key: string
): string | undefined {
  const rawValue = searchParams[key];

  if (Array.isArray(rawValue)) {
    return rawValue[0];
  }

  return rawValue;
}

function hasSearchParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string
): boolean {
  return Object.prototype.hasOwnProperty.call(searchParams, key);
}

function resolveTextInputValue(
  searchParams: Record<string, string | string[] | undefined>,
  key: keyof Omit<StudioCustomValues, 'imageEnabled' | 'mascotEnabled'>,
  fallback: string
): string {
  if (!hasSearchParam(searchParams, key)) {
    return fallback;
  }

  return readValue(searchParams, key) ?? '';
}

function resolveImageEnabled(
  searchParams: Record<string, string | string[] | undefined>
): boolean {
  if (!hasSearchParam(searchParams, 'imageEnabled')) {
    return DEFAULT_CUSTOM_VALUES.imageEnabled;
  }

  const value = readValue(searchParams, 'imageEnabled');
  return value !== '0' && value !== 'false';
}

function resolveMode(
  searchParams: Record<string, string | string[] | undefined>
): StudioMode {
  const mode = readValue(searchParams, 'mode');

  if (mode === 'tool' || mode === 'custom') {
    return mode;
  }

  return 'blog';
}

function resolveBlogSelection(
  searchParams: Record<string, string | string[] | undefined>
): string {
  const selected = readValue(searchParams, 'postKey');

  if (selected && BLOG_OPTIONS.some(option => option.value === selected)) {
    return selected;
  }

  return BLOG_OPTIONS[0]?.value ?? '';
}

function resolveToolSelection(
  searchParams: Record<string, string | string[] | undefined>
): string {
  const selected = readValue(searchParams, 'toolId');

  if (selected && TOOL_OPTIONS.some(option => option.value === selected)) {
    return selected;
  }

  return TOOL_OPTIONS[0]?.value ?? '';
}

function resolveMascotEnabled(
  searchParams: Record<string, string | string[] | undefined>
): boolean {
  if (!hasSearchParam(searchParams, 'mascotEnabled')) {
    return DEFAULT_CUSTOM_VALUES.mascotEnabled;
  }

  const value = readValue(searchParams, 'mascotEnabled');
  return value !== '0' && value !== 'false';
}

function resolveCustomValues(
  searchParams: Record<string, string | string[] | undefined>
): StudioCustomValues {
  return {
    title: resolveTextInputValue(
      searchParams,
      'title',
      DEFAULT_CUSTOM_VALUES.title
    ),
    description: resolveTextInputValue(
      searchParams,
      'description',
      DEFAULT_CUSTOM_VALUES.description
    ),
    image: resolveTextInputValue(
      searchParams,
      'image',
      DEFAULT_CUSTOM_VALUES.image
    ),
    imageEnabled: resolveImageEnabled(searchParams),
    bgColor: resolveTextInputValue(
      searchParams,
      'bgColor',
      DEFAULT_CUSTOM_VALUES.bgColor
    ),
    accentColor: resolveTextInputValue(
      searchParams,
      'accentColor',
      DEFAULT_CUSTOM_VALUES.accentColor
    ),
    label: resolveTextInputValue(
      searchParams,
      'label',
      DEFAULT_CUSTOM_VALUES.label
    ),
    themePreset:
      readValue(searchParams, 'themePreset') ??
      DEFAULT_CUSTOM_VALUES.themePreset,
    layoutVariant:
      readValue(searchParams, 'layoutVariant') ??
      DEFAULT_CUSTOM_VALUES.layoutVariant,
    mascotEnabled: resolveMascotEnabled(searchParams),
  };
}

function buildPreviewPath(options: {
  mode: StudioMode;
  blogSelection: string;
  toolSelection: string;
  customValues: StudioCustomValues;
}): string {
  const { mode, blogSelection, toolSelection, customValues } = options;

  if (mode === 'tool') {
    return buildToolOgImagePath(toolSelection);
  }

  if (mode === 'custom') {
    return buildCustomOgImagePath(customValues);
  }

  const [categorySlug, slug] = blogSelection.split('/');

  return buildBlogOgImagePath({
    categorySlug,
    slug,
  });
}

function buildModeHref(mode: StudioMode): string {
  return `/tools/og-image-studio?mode=${mode}`;
}

export default async function OgImageStudioPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const mode = resolveMode(resolvedSearchParams);
  const blogSelection = resolveBlogSelection(resolvedSearchParams);
  const toolSelection = resolveToolSelection(resolvedSearchParams);
  const customValues = resolveCustomValues(resolvedSearchParams);
  const previewPath = buildPreviewPath({
    mode,
    blogSelection,
    toolSelection,
    customValues,
  });
  const downloadPath =
    mode === 'custom'
      ? buildCustomOgImagePath({
          ...customValues,
          format: 'webp',
          download: true,
        })
      : previewPath;

  return (
    <div className="min-h-screen bg-background pt-10 md:pt-24 xl:pt-32">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { name: '홈', url: '/' },
              { name: '도구', url: '/tools' },
              { name: 'OG Image Studio' },
            ]}
          />
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                OG Image Studio
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
                blog, tool, custom 모드로 Takumi OG 이미지를 미리보고 새 탭 열기
                또는 브라우저 다운로드를 할 수 있습니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant={mode === 'blog' ? 'default' : 'outline'} asChild>
                <Link href={buildModeHref('blog')}>Blog</Link>
              </Button>
              <Button variant={mode === 'tool' ? 'default' : 'outline'} asChild>
                <Link href={buildModeHref('tool')}>Tool</Link>
              </Button>
              <Button
                variant={mode === 'custom' ? 'default' : 'outline'}
                asChild
              >
                <Link href={buildModeHref('custom')}>Custom</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>생성 옵션</CardTitle>
            <CardDescription>
              모드에 맞는 입력값을 선택하고 미리보기를 갱신합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mode === 'custom' ? (
              <CustomOgForm defaultValues={customValues} />
            ) : (
              <form className="space-y-5">
                <input type="hidden" name="mode" value={mode} />

                {mode === 'blog' ? (
                  <label className="grid gap-2.5">
                    <span className="text-sm font-medium text-foreground">
                      블로그 포스트
                    </span>
                    <select
                      name="postKey"
                      defaultValue={blogSelection}
                      className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-10 w-full rounded-lg border bg-transparent px-3 text-sm outline-none focus-visible:ring-3"
                    >
                      {BLOG_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}

                {mode === 'tool' ? (
                  <label className="grid gap-2.5">
                    <span className="text-sm font-medium text-foreground">
                      Tool
                    </span>
                    <select
                      name="toolId"
                      defaultValue={toolSelection}
                      className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-10 w-full rounded-lg border bg-transparent px-3 text-sm outline-none focus-visible:ring-3"
                    >
                      {TOOL_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}

                <Button type="submit" className="w-full">
                  미리보기 갱신
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>미리보기</CardTitle>
              <CardDescription>
                실제 OG route 결과를 그대로 보여줍니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <Image
                src={previewPath}
                alt="OG preview"
                width={1200}
                height={630}
                unoptimized
                className="w-full rounded-2xl border bg-muted/30 object-cover shadow-sm"
              />

              <div className="space-y-4 rounded-xl border border-border/60 bg-muted/20 p-4">
                <label className="grid gap-2.5">
                  <span className="text-sm font-medium text-foreground">
                    원본 이미지 URL
                  </span>
                  <Input value={previewPath} readOnly />
                </label>

                <div className="flex flex-wrap gap-3 pt-1">
                  <Button asChild>
                    <a href={previewPath} target="_blank" rel="noreferrer">
                      새 탭에서 열기
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href={downloadPath}
                      download={
                        mode === 'custom' ? 'custom-og-image.webp' : true
                      }
                    >
                      다운로드
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

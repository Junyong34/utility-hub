import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * 경로에서 카테고리 추출
 */
function extractCategoryFromPath(filePath: string): { category: string; categorySlug: string } {
  const relativePath = path.relative(postsDirectory, filePath);
  const parts = relativePath.split(path.sep);

  // 하위 디렉토리가 있으면 첫 번째 디렉토리를 카테고리로 사용
  if (parts.length > 1) {
    const categorySlug = parts[0];
    return {
      category: categorySlug,
      categorySlug,
    };
  }

  // 하위 디렉토리가 없으면 기본 카테고리
  return {
    category: '미분류',
    categorySlug: 'uncategorized',
  };
}

/**
 * 디렉토리를 재귀적으로 탐색하여 모든 .md 파일 경로를 반환
 */
function getAllMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // 디렉토리면 재귀 탐색
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // .md 파일이면 추가
      files.push(fullPath);
    }
  }

  return files;
}

export interface PostMetadata {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  category: string;
  categorySlug: string;
  ogImage?: string;
}

export interface Post extends PostMetadata {
  slug: string;
  content: string;
}

/**
 * 모든 블로그 포스트의 메타데이터를 가져옵니다 (날짜 내림차순 정렬)
 */
export function getAllPosts(): Omit<Post, 'content'>[] {
  const markdownFiles = getAllMarkdownFiles(postsDirectory);

  const posts = markdownFiles.map((fullPath) => {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    // 경로에서 카테고리 추출
    const pathCategory = extractCategoryFromPath(fullPath);

    // Frontmatter 우선, 없으면 경로에서 추출한 값 사용
    const category = data.category || pathCategory.category;
    const categorySlug = data.categorySlug || pathCategory.categorySlug;

    // 파일명에서 slug 추출
    const fileName = path.basename(fullPath, '.md');

    return {
      slug: fileName,
      title: data.title,
      date: data.date,
      author: data.author,
      excerpt: data.excerpt,
      tags: data.tags || [],
      category,
      categorySlug,
      ogImage: data.ogImage,
    };
  });

  // 날짜 내림차순 정렬
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * 특정 slug의 블로그 포스트를 가져옵니다 (콘텐츠 포함)
 */
export function getPostBySlug(slug: string, categorySlug?: string): Post | null {
  try {
    const markdownFiles = getAllMarkdownFiles(postsDirectory);

    // slug와 일치하는 파일 찾기
    const targetFile = markdownFiles.find((filePath) => {
      const fileName = path.basename(filePath, '.md');
      if (categorySlug) {
        // 카테고리가 지정된 경우 카테고리도 확인
        const pathCategory = extractCategoryFromPath(filePath);
        return fileName === slug && pathCategory.categorySlug === categorySlug;
      }
      return fileName === slug;
    });

    if (!targetFile) {
      return null;
    }

    const fileContents = fs.readFileSync(targetFile, 'utf8');
    const { data, content } = matter(fileContents);

    // 경로에서 카테고리 추출
    const pathCategory = extractCategoryFromPath(targetFile);
    const category = data.category || pathCategory.category;
    const finalCategorySlug = data.categorySlug || pathCategory.categorySlug;

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      excerpt: data.excerpt,
      tags: data.tags || [],
      category,
      categorySlug: finalCategorySlug,
      ogImage: data.ogImage,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * 모든 포스트의 slug 목록을 가져옵니다 (SSG용)
 */
export function getAllPostSlugs(): Array<{ slug: string; categorySlug: string }> {
  const markdownFiles = getAllMarkdownFiles(postsDirectory);

  return markdownFiles.map((fullPath) => {
    const slug = path.basename(fullPath, '.md');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    // 경로에서 카테고리 추출
    const pathCategory = extractCategoryFromPath(fullPath);
    const categorySlug = data.categorySlug || pathCategory.categorySlug;

    return { slug, categorySlug };
  });
}

/**
 * 특정 태그를 가진 포스트들을 가져옵니다
 */
export function getPostsByTag(tag: string): Omit<Post, 'content'>[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * 모든 태그 목록을 가져옵니다 (중복 제거)
 */
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tagsSet = new Set<string>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * 모든 카테고리 목록을 가져옵니다 (중복 제거)
 */
export function getAllCategories(): Array<{ name: string; slug: string; count: number }> {
  const allPosts = getAllPosts();
  const categoryMap = new Map<string, { name: string; count: number }>();

  allPosts.forEach((post) => {
    const existing = categoryMap.get(post.categorySlug);
    if (existing) {
      existing.count++;
    } else {
      categoryMap.set(post.categorySlug, {
        name: post.category,
        count: 1,
      });
    }
  });

  return Array.from(categoryMap.entries())
    .map(([slug, data]) => ({
      slug,
      name: data.name,
      count: data.count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * 특정 카테고리의 포스트들을 가져옵니다
 */
export function getPostsByCategory(categorySlug: string): Omit<Post, 'content'>[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.categorySlug === categorySlug);
}

/**
 * 이전/다음 포스트를 가져옵니다
 */
export function getAdjacentPosts(currentSlug: string, categorySlug?: string): {
  prevPost: Omit<Post, 'content'> | null;
  nextPost: Omit<Post, 'content'> | null;
} {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(
    (post) => post.slug === currentSlug && (!categorySlug || post.categorySlug === categorySlug)
  );

  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }

  return {
    prevPost: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    nextPost: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
}

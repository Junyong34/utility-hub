'use client';

import { useRouter } from 'next/navigation';
import { SharedSelectSwitcher } from '@/components/ui/shared-select-switcher';

interface PostOption {
  slug: string;
  title: string;
}

interface BlogSwitcherProps {
  categorySlug: string;
  currentSlug: string;
  posts: PostOption[];
  placeholder?: string;
}

export function BlogSwitcher({
  categorySlug,
  currentSlug,
  posts,
  placeholder = '포스트 선택',
}: BlogSwitcherProps) {
  const router = useRouter();

  const handlePostChange = (newSlug: string) => {
    router.push(`/blog/${categorySlug}/${newSlug}`);
  };

  return (
    <SharedSelectSwitcher
      value={currentSlug}
      onValueChange={handlePostChange}
      placeholder={placeholder}
      emptyLabel="해당 카테고리에 포스트가 없습니다."
      options={posts.map((post) => ({
        value: post.slug,
        label: post.title,
      }))}
    />
  );
}

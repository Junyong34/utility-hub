'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';

// highlight.js 테마 import
import 'highlight.js/styles/github-dark.css';

interface PostContentProps {
  title: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
}

/**
 * 블로그 포스트 상세 콘텐츠 컴포넌트
 * 개별 포스트의 전체 내용을 표시합니다
 * react-markdown을 사용하여 마크다운을 렌더링합니다
 */
export function PostContent({ title, date, author, tags, content }: PostContentProps) {
  // 날짜 포맷팅
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 코드 블록에 언어 라벨 추가
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((block) => {
      const pre = block.parentElement;
      if (pre && !pre.querySelector('.code-lang-label')) {
        const className = block.className;
        const match = className.match(/language-(\w+)/);
        if (match) {
          const lang = match[1];
          const label = document.createElement('div');
          label.className = 'code-lang-label';
          label.textContent = lang;
          label.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            font-size: 0.75rem;
            color: #94a3b8;
            background: rgba(15, 23, 42, 0.8);
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-family: monospace;
          `;
          pre.style.position = 'relative';
          pre.appendChild(label);
        }
      }
    });
  }, [content]);

  return (
    <article className="max-w-4xl mx-auto">
      {/* 헤더 */}
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{title}</h1>

        {/* 메타 정보 */}
        <div className="flex items-center gap-3 text-muted-foreground mb-6">
          <time dateTime={date} className="text-sm">
            {formattedDate}
          </time>
          <span>•</span>
          <span className="text-sm">{author}</span>
        </div>

        {/* 태그 */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Separator className="mt-6" />
      </header>

      {/* 마크다운 콘텐츠 */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            // 커스텀 컴포넌트 매핑
            h1: ({ children }) => (
              <h1 className="scroll-mt-20" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="scroll-mt-20" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="scroll-mt-20" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
                {children}
              </h3>
            ),
            // 링크는 새 탭에서 열기
            a: ({ href, children }) => (
              <a
                href={href}
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

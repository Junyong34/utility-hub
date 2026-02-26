import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeReact from 'rehype-react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { CopyButton } from '@/components/blog/CopyButton';

/**
 * 마크다운을 React 컴포넌트로 변환하는 프로세서
 * rehype-pretty-code를 사용하여 코드 하이라이팅 제공
 */

// 코드 블록 커스텀 컴포넌트
function Pre({ children, ...props }: any) {
  // children에서 텍스트 추출
  const extractText = (node: any): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (node?.props?.children) return extractText(node.props.children);
    return '';
  };

  const textContent = extractText(children);

  return (
    <div className="relative group">
      <pre {...props}>{children}</pre>
      {textContent && <CopyButton text={textContent} />}
    </div>
  );
}

// 링크 컴포넌트
function Link({ href, children, ...props }: any) {
  return (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

// 헤딩 컴포넌트들
function H1({ children, ...props }: any) {
  return (
    <h1
      className="scroll-mt-20"
      id={String(children).toLowerCase().replace(/\s+/g, '-')}
      {...props}
    >
      {children}
    </h1>
  );
}

function H2({ children, ...props }: any) {
  return (
    <h2
      className="scroll-mt-20"
      id={String(children).toLowerCase().replace(/\s+/g, '-')}
      {...props}
    >
      {children}
    </h2>
  );
}

function H3({ children, ...props }: any) {
  return (
    <h3
      className="scroll-mt-20"
      id={String(children).toLowerCase().replace(/\s+/g, '-')}
      {...props}
    >
      {children}
    </h3>
  );
}

/**
 * 마크다운을 React 요소로 변환
 */
export async function processMarkdown(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        dark: 'github-dark',
        light: 'github-light',
      },
      defaultColor: false, // CSS Variables 모드 활성화 (--shiki-light, --shiki-dark 생성)
    })
    .use(rehypeReact, {
      Fragment,
      jsx,
      jsxs,
      components: {
        pre: Pre,
        a: Link,
        h1: H1,
        h2: H2,
        h3: H3,
      },
    })
    .process(markdown);

  return file.result;
}

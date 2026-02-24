import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog/posts';
import { SITE_CONFIG } from '@/lib/seo';

/**
 * RSS 피드 생성
 * /rss.xml 경로로 접근 가능
 */
export async function GET() {
  const posts = getAllPosts();

  const rssItems = posts
    .map((post) => {
      const postUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${post.author}</author>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
    </item>`;
    })
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_CONFIG.name}</title>
    <description>${SITE_CONFIG.description}</description>
    <link>${SITE_CONFIG.url}</link>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}

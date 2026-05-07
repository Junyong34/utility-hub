import ImageResponse from '@takumi-rs/image-response';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import React from 'react';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'og-images');
const FONT_DIR = path.join(process.cwd(), 'public', 'fonts', 'og');
const WIDTH = 1200;
const HEIGHT = 630;

const regularFontPath = path.join(
  FONT_DIR,
  'noto-sans-kr-korean-400-normal.woff2'
);
const boldFontPath = path.join(
  FONT_DIR,
  'noto-sans-kr-korean-700-normal.woff2'
);

const pages = [
  {
    filename: 'home-og-image.webp',
    label: 'ZENTO HOME',
    title: '아이와 갈 곳,\n조건별로 빠르게 찾으세요',
    description:
      '지역, 연령, 날씨, 예산 기준으로 오늘 갈 만한 장소를 빠르게 좁혀보세요.',
    background: '#fffdf8',
    panel: '#fff8e7',
    accent: '#ff6a00',
    accentSoft: '#ffd58a',
    secondary: '#2f7d62',
    visual: 'map',
  },
  {
    filename: 'places-og-image.webp',
    label: 'PLACES',
    title: '아이와 가볼 곳',
    description:
      '서울·경기·인천 장소를 지역, 연령, 날씨, 예산 기준으로 비교하세요.',
    background: '#fff8e7',
    panel: '#fffdf8',
    accent: '#ffb238',
    accentSoft: '#ffe1a8',
    secondary: '#1d6f8f',
    visual: 'pin',
  },
  {
    filename: 'tools-og-image.webp',
    label: 'TOOLS',
    title: '육아·생활 도구 모음',
    description:
      '나들이 예산부터 생활비·금융 계산까지 바로 쓰는 도구를 모았습니다.',
    background: '#fffbec',
    panel: '#fff7d7',
    accent: '#f47b20',
    accentSoft: '#ffd21f',
    secondary: '#3c6e71',
    visual: 'tool',
  },
  {
    filename: 'benefits-og-image.webp',
    label: 'BENEFITS',
    title: '육아 혜택·지원금',
    description:
      '부모급여, 아동수당, 지역 혜택을 공식 출처 기준으로 확인하세요.',
    background: '#fff8e7',
    panel: '#fffdf8',
    accent: '#2f9e7e',
    accentSoft: '#b8efd9',
    secondary: '#ff6a00',
    visual: 'gift',
  },
  {
    filename: 'blog-og-image.webp',
    label: 'BLOG',
    title: '생활가이드 및 팁 정보',
    description:
      '생활 속 선택과 비용 판단에 필요한 정보를 비교표와 체크리스트로 정리합니다.',
    background: '#f3d997',
    panel: '#fff8e7',
    accent: '#a83a08',
    accentSoft: '#ffd58a',
    secondary: '#3d3027',
    visual: 'book',
  },
];

function createElement(type, props, ...children) {
  return React.createElement(type, props, ...children);
}

function shapeStyle(base) {
  return {
    position: 'absolute',
    display: 'flex',
    ...base,
  };
}

function Visual({ page }) {
  const common = {
    position: 'absolute',
    display: 'flex',
    border: `4px solid ${page.secondary}`,
  };

  if (page.visual === 'map') {
    return createElement(
      'div',
      null,
      createElement('div', {
        style: {
          ...common,
          width: 250,
          height: 250,
          left: 70,
          top: 70,
          borderRadius: 36,
          backgroundColor: page.panel,
          transform: 'rotate(-8deg)',
        },
      }),
      createElement('div', {
        style: {
          ...common,
          width: 116,
          height: 116,
          left: 150,
          top: 135,
          borderRadius: '999px 999px 999px 18px',
          backgroundColor: page.accent,
          transform: 'rotate(-45deg)',
        },
      }),
      createElement('div', {
        style: {
          position: 'absolute',
          display: 'flex',
          width: 44,
          height: 44,
          left: 186,
          top: 171,
          borderRadius: '999px',
          backgroundColor: page.background,
        },
      })
    );
  }

  if (page.visual === 'pin') {
    return createElement(
      'div',
      null,
      createElement('div', {
        style: {
          ...common,
          width: 190,
          height: 190,
          left: 105,
          top: 70,
          borderRadius: '999px 999px 999px 34px',
          backgroundColor: page.accent,
          transform: 'rotate(-45deg)',
        },
      }),
      createElement('div', {
        style: {
          position: 'absolute',
          display: 'flex',
          width: 72,
          height: 72,
          left: 164,
          top: 129,
          borderRadius: '999px',
          backgroundColor: page.background,
        },
      }),
      createElement('div', {
        style: {
          position: 'absolute',
          display: 'flex',
          left: 76,
          top: 312,
          width: 260,
          height: 44,
          borderRadius: '999px',
          backgroundColor: page.accentSoft,
        },
      })
    );
  }

  if (page.visual === 'tool') {
    return createElement(
      'div',
      null,
      [82, 180, 278].map((top, index) =>
        createElement(
          'div',
          {
            key: top,
            style: {
              position: 'absolute',
              display: 'flex',
              left: 70,
              top,
              width: 270,
              height: 24,
              borderRadius: '999px',
              backgroundColor: index === 1 ? page.secondary : page.accent,
            },
          },
          createElement('div', {
            style: {
              position: 'absolute',
              display: 'flex',
              left: index === 0 ? 160 : index === 1 ? 60 : 205,
              top: -26,
              width: 72,
              height: 72,
              borderRadius: '999px',
              backgroundColor: page.panel,
              border: `4px solid ${page.secondary}`,
            },
          })
        )
      )
    );
  }

  if (page.visual === 'gift') {
    return createElement(
      'div',
      null,
      createElement('div', {
        style: {
          ...common,
          width: 240,
          height: 190,
          left: 82,
          top: 145,
          borderRadius: 28,
          backgroundColor: page.panel,
        },
      }),
      createElement('div', {
        style: {
          position: 'absolute',
          display: 'flex',
          left: 190,
          top: 145,
          width: 34,
          height: 190,
          backgroundColor: page.accent,
        },
      }),
      createElement('div', {
        style: {
          position: 'absolute',
          display: 'flex',
          left: 70,
          top: 112,
          width: 264,
          height: 58,
          borderRadius: 24,
          backgroundColor: page.accent,
          border: `4px solid ${page.secondary}`,
        },
      }),
      createElement('div', {
        style: {
          position: 'absolute',
          display: 'flex',
          left: 132,
          top: 58,
          width: 78,
          height: 78,
          borderRadius: '999px 999px 999px 16px',
          border: `14px solid ${page.secondary}`,
          transform: 'rotate(24deg)',
        },
      }),
      createElement('div', {
        style: {
          position: 'absolute',
          display: 'flex',
          left: 196,
          top: 58,
          width: 78,
          height: 78,
          borderRadius: '999px 999px 16px 999px',
          border: `14px solid ${page.secondary}`,
          transform: 'rotate(-24deg)',
        },
      })
    );
  }

  return createElement(
    'div',
    null,
    createElement('div', {
      style: {
        ...common,
        width: 210,
        height: 270,
        left: 92,
        top: 70,
        borderRadius: '24px 46px 46px 24px',
        backgroundColor: page.panel,
      },
    }),
    createElement('div', {
      style: {
        position: 'absolute',
        display: 'flex',
        width: 22,
        height: 270,
        left: 134,
        top: 70,
        backgroundColor: page.accent,
      },
    }),
    [128, 178, 228].map(top =>
      createElement('div', {
        key: top,
        style: {
          position: 'absolute',
          display: 'flex',
          width: 92,
          height: 14,
          left: 184,
          top,
          borderRadius: '999px',
          backgroundColor: page.secondary,
          opacity: 0.55,
        },
      })
    )
  );
}

function PageOgImage({ page }) {
  return createElement(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: page.background,
        color: '#211712',
        fontFamily: 'Noto Sans KR',
        padding: 44,
      },
    },
    createElement('div', {
      style: shapeStyle({
        width: 420,
        height: 420,
        right: -130,
        top: -160,
        borderRadius: '999px',
        backgroundColor: page.accentSoft,
        opacity: 0.85,
      }),
    }),
    createElement('div', {
      style: shapeStyle({
        width: 300,
        height: 300,
        right: 270,
        bottom: -148,
        borderRadius: '999px',
        backgroundColor: page.secondary,
        opacity: 0.12,
      }),
    }),
    createElement(
      'div',
      {
        style: {
          display: 'flex',
          width: '100%',
          height: '100%',
          borderRadius: 42,
          border: '2px solid rgba(61,48,39,0.12)',
          backgroundColor: 'rgba(255,255,255,0.54)',
          boxShadow: '0 28px 80px rgba(61,48,39,0.10)',
          overflow: 'hidden',
          position: 'relative',
        },
      },
      createElement(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: 720,
            padding: '54px 34px 48px 56px',
          },
        },
        createElement(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
            },
          },
          createElement(
            'div',
            {
              style: {
                display: 'flex',
                alignSelf: 'flex-start',
                padding: '10px 18px',
                borderRadius: '999px',
                backgroundColor: page.accent,
                color: '#fffdf8',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 0,
              },
            },
            page.label
          ),
          createElement(
            'div',
            {
              style: {
                display: 'flex',
                fontSize: page.title.includes('\n') ? 58 : 66,
                lineHeight: 1.14,
                fontWeight: 700,
                letterSpacing: 0,
                whiteSpace: 'pre-wrap',
              },
            },
            page.title
          ),
          createElement(
            'div',
            {
              style: {
                display: 'flex',
                width: 590,
                fontSize: 28,
                lineHeight: 1.45,
                color: '#695c4c',
                letterSpacing: 0,
                whiteSpace: 'pre-wrap',
              },
            },
            page.description
          )
        ),
        createElement(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              color: '#695c4c',
              fontSize: 21,
            },
          },
          createElement('div', {
            style: {
              display: 'flex',
              width: 12,
              height: 12,
              borderRadius: '999px',
              backgroundColor: page.accent,
            },
          }),
          'zento.kr'
        )
      ),
      createElement(
        'div',
        {
          style: {
            display: 'flex',
            flex: 1,
            position: 'relative',
            backgroundColor: page.panel,
            borderLeft: '2px solid rgba(61,48,39,0.10)',
          },
        },
        createElement('div', {
          style: shapeStyle({
            width: 380,
            height: 380,
            left: 56,
            top: 74,
            borderRadius: 46,
            backgroundColor: page.accentSoft,
            opacity: 0.72,
            transform: 'rotate(7deg)',
          }),
        }),
        createElement(Visual, { page })
      ),
      createElement('div', {
        style: shapeStyle({
          left: 56,
          right: 56,
          bottom: 34,
          height: 5,
          borderRadius: '999px',
          backgroundColor: page.accent,
          opacity: 0.18,
        }),
      })
    )
  );
}

async function loadFonts() {
  const [regular, bold] = await Promise.all([
    readFile(regularFontPath),
    readFile(boldFontPath),
  ]);

  return [
    {
      name: 'Noto Sans KR',
      data: regular.buffer.slice(
        regular.byteOffset,
        regular.byteOffset + regular.byteLength
      ),
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Noto Sans KR',
      data: bold.buffer.slice(bold.byteOffset, bold.byteOffset + bold.byteLength),
      weight: 700,
      style: 'normal',
    },
  ];
}

async function renderPage(page, fonts) {
  const response = new ImageResponse(createElement(PageOgImage, { page }), {
    width: WIDTH,
    height: HEIGHT,
    format: 'webp',
    fonts,
  });
  const buffer = Buffer.from(await response.arrayBuffer());
  const outputPath = path.join(OUTPUT_DIR, page.filename);

  await writeFile(outputPath, buffer);
  return outputPath;
}

await mkdir(OUTPUT_DIR, { recursive: true });

const fonts = await loadFonts();
const outputPaths = [];

for (const page of pages) {
  outputPaths.push(await renderPage(page, fonts));
}

console.log(outputPaths.join('\n'));

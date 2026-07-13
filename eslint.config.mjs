import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const noDirectEnvironmentAccess = [
  'error',
  {
    selector: "MemberExpression[object.name='process'][property.name='env']",
    message: '환경 변수는 config/env의 검증된 공개 진입점을 통해 접근하세요.',
  },
];

const noDirectEnvironmentAccessOrWildcardExport = [
  noDirectEnvironmentAccess[0],
  noDirectEnvironmentAccess[1],
  {
    selector: 'ExportAllDeclaration',
    message:
      '모듈 공개 진입점은 export * 대신 명시적 named export를 사용하세요.',
  },
];

const serverLayerImportPatterns = [
  '@/modules/*/server',
  '@/modules/*/server/**',
  '@/shared/server',
  '@/shared/server/**',
  '**/server',
  '**/server/**',
  '**/server.ts',
  '**/*.server',
  '**/*.server.*',
];

const serverImportPatterns = [...serverLayerImportPatterns, 'node:*'];

const clientImportPatterns = [
  '@/modules/*/client',
  '@/modules/*/client/**',
  '@/shared/client',
  '@/shared/client/**',
  '**/client',
  '**/client/**',
  '**/client.ts',
  '**/*.client',
  '**/*.client.*',
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['modules/**/*.{ts,tsx}', 'shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': noDirectEnvironmentAccess,
    },
  },
  {
    files: [
      'modules/**/public.ts',
      'modules/**/server.ts',
      'modules/**/client.ts',
      'modules/**/ui.ts',
    ],
    rules: {
      'no-restricted-syntax': noDirectEnvironmentAccessOrWildcardExport,
    },
  },
  {
    files: ['shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app', '@/app/**', '@/modules', '@/modules/**'],
              message: 'shared는 app 또는 modules에 역방향 의존할 수 없습니다.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['config/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/app',
                '@/app/**',
                '@/modules',
                '@/modules/**',
                '@/shared',
                '@/shared/**',
              ],
              message:
                'config는 app, modules 또는 shared에 역방향 의존할 수 없습니다.',
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      'modules/**/domain/**/*.{ts,tsx}',
      'modules/**/domain.{ts,tsx}',
      'modules/**/public.ts',
      'shared/domain/**/*.{ts,tsx}',
      'shared/contracts/**/*.{ts,tsx}',
    ],
    rules: {
      'no-restricted-globals': [
        'error',
        'window',
        'document',
        'navigator',
        'localStorage',
        'sessionStorage',
        'fetch',
        'WebSocket',
        'EventSource',
        'XMLHttpRequest',
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['react', 'react/*', 'next', 'next/*', 'node:*'],
              message:
                'domain/public 계약은 React, Next.js, Node.js 런타임에 의존할 수 없습니다.',
            },
            {
              group: [
                '@/modules/*/ui',
                '@/modules/*/ui/**',
                '**/ui',
                '**/ui/**',
                '**/ui.ts',
                ...clientImportPatterns,
                ...serverLayerImportPatterns,
              ],
              message:
                'domain/public 계약은 다른 런타임 레이어가 아니라 public 계약에만 의존할 수 있습니다.',
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      'modules/**/client/**/*.{ts,tsx}',
      'modules/**/client.{ts,tsx}',
      'shared/client/**/*.{ts,tsx}',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: serverImportPatterns,
              message:
                'client 레이어는 server 진입점이나 Node.js 모듈을 import할 수 없습니다.',
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      'modules/**/ui/**/*.{ts,tsx}',
      'modules/**/ui.{ts,tsx}',
      'shared/ui/**/*.{ts,tsx}',
    ],
    rules: {
      'no-restricted-globals': [
        'error',
        'window',
        'document',
        'navigator',
        'localStorage',
        'sessionStorage',
        'fetch',
        'WebSocket',
        'EventSource',
        'XMLHttpRequest',
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [...serverImportPatterns, ...clientImportPatterns],
              message:
                'ui 레이어는 server 또는 client orchestration 진입점을 import할 수 없습니다.',
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      'modules/**/ui/**/*.test.{ts,tsx}',
      'modules/**/ui/*.test.{ts,tsx}',
      'shared/ui/**/*.test.{ts,tsx}',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [...serverLayerImportPatterns, ...clientImportPatterns],
              message:
                'ui 단위 테스트도 server 또는 client orchestration 진입점을 import할 수 없습니다.',
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      'modules/**/server/**/*.{ts,tsx}',
      'modules/**/server.{ts,tsx}',
      'shared/server/**/*.{ts,tsx}',
    ],
    rules: {
      'no-restricted-globals': [
        'error',
        'window',
        'document',
        'navigator',
        'localStorage',
        'sessionStorage',
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                ...clientImportPatterns,
                '@/modules/*/ui',
                '@/modules/*/ui/**',
                '**/ui',
                '**/ui/**',
                '**/ui.ts',
              ],
              message:
                'server 레이어는 client 또는 ui 진입점을 import할 수 없습니다.',
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Additional ignores:
    'content/**',
    'rules/**',
    '.agents/**',
    '.claude/**',
    '.codex/**',
    'dist/**',
    'coverage/**',
    'node_modules/**',
    'pnpm-lock.yaml',
    'package-lock.json',
    'yarn.lock',
  ]),
]);

export default eslintConfig;

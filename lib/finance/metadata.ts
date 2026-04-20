import type { Metadata } from 'next';

export const FINANCE_PAGE_METADATA: Metadata = {
  title: 'Finance Workspace',
  description: '개인용 재무 워크스페이스',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

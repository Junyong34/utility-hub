export const DEFAULT_SITE_URL = 'https://www.zento.kr';

interface PublicEnvironment {
  NEXT_PUBLIC_SITE_URL?: string;
}

export interface PublicEnv {
  siteUrl: string;
}

function normalizeSiteUrl(value: string | undefined): string {
  const candidate = value?.trim();

  if (!candidate) {
    return DEFAULT_SITE_URL;
  }

  try {
    const url = new URL(candidate);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return DEFAULT_SITE_URL;
    }

    return candidate.replace(/\/+$/, '');
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function readPublicEnv(
  environment: PublicEnvironment = {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  }
): PublicEnv {
  return {
    siteUrl: normalizeSiteUrl(environment.NEXT_PUBLIC_SITE_URL),
  };
}

export const PUBLIC_ENV = readPublicEnv();

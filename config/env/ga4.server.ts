export const DEFAULT_GA4_BASELINE_DATE = '2024-01-01';
export const DEFAULT_GA4_TIME_ZONE = 'Asia/Seoul';

interface Ga4ServerEnvironment {
  GA4_PROPERTY_ID?: string;
  GA4_CLIENT_EMAIL?: string;
  GA4_PRIVATE_KEY?: string;
  GA4_BASELINE_DATE?: string;
  GA4_TIMEZONE?: string;
}

function readProcessEnvironment(): Ga4ServerEnvironment {
  return {
    GA4_PROPERTY_ID: process.env.GA4_PROPERTY_ID,
    GA4_CLIENT_EMAIL: process.env.GA4_CLIENT_EMAIL,
    GA4_PRIVATE_KEY: process.env.GA4_PRIVATE_KEY,
    GA4_BASELINE_DATE: process.env.GA4_BASELINE_DATE,
    GA4_TIMEZONE: process.env.GA4_TIMEZONE,
  };
}

export interface Ga4ServerConfig {
  propertyId: string;
  clientEmail: string;
  privateKey: string;
  baselineDate: string;
  timeZone: string;
}

export type Ga4ServerConfigResult =
  | { ok: true; config: Ga4ServerConfig }
  | { ok: false; error: Error };

const REQUIRED_ENV_FIELDS = [
  'GA4_PROPERTY_ID',
  'GA4_CLIENT_EMAIL',
  'GA4_PRIVATE_KEY',
] as const;

function createConfigurationError(
  fields: readonly string[],
  reason: 'missing' | 'invalid'
): Error {
  return new Error(
    `GA4 server-only configuration has ${reason} fields: ${fields.join(', ')}`
  );
}

function isValidDateString(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth[month - 1];
}

export function readGa4ServerConfig(
  environment: Ga4ServerEnvironment = readProcessEnvironment()
): Ga4ServerConfigResult {
  const propertyId = environment.GA4_PROPERTY_ID?.trim();
  const clientEmail = environment.GA4_CLIENT_EMAIL?.trim();
  const privateKey = environment.GA4_PRIVATE_KEY?.trim();
  const requiredValues = {
    GA4_PROPERTY_ID: propertyId,
    GA4_CLIENT_EMAIL: clientEmail,
    GA4_PRIVATE_KEY: privateKey,
  };
  const missingFields = REQUIRED_ENV_FIELDS.filter(
    field => !requiredValues[field]
  );

  if (!propertyId || !clientEmail || !privateKey) {
    return {
      ok: false,
      error: createConfigurationError(missingFields, 'missing'),
    };
  }

  const baselineDate =
    environment.GA4_BASELINE_DATE?.trim() || DEFAULT_GA4_BASELINE_DATE;

  if (!isValidDateString(baselineDate)) {
    return {
      ok: false,
      error: createConfigurationError(['GA4_BASELINE_DATE'], 'invalid'),
    };
  }

  return {
    ok: true,
    config: {
      propertyId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, '\n'),
      baselineDate,
      timeZone: environment.GA4_TIMEZONE?.trim() || DEFAULT_GA4_TIME_ZONE,
    },
  };
}

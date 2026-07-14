import path from 'node:path';

interface ServerRuntimeEnvironment {
  NODE_ENV?: string;
  ANALYZE?: string;
  NETLIFY?: string;
  AWS_LAMBDA_FUNCTION_NAME?: string;
  FINANCE_SNAPSHOTS_PATH?: string;
}

export const NETLIFY_FINANCE_SNAPSHOTS_PATH = '/tmp/finance-snapshots.json';

export function isDevelopmentRuntime(
  environment: ServerRuntimeEnvironment = process.env
): boolean {
  return environment.NODE_ENV === 'development';
}

export function isBundleAnalysisEnabled(
  environment: ServerRuntimeEnvironment = process.env
): boolean {
  return environment.ANALYZE === 'true';
}

export function isNetlifyRuntime(
  environment: ServerRuntimeEnvironment = process.env
): boolean {
  return (
    environment.NETLIFY === 'true' ||
    environment.NETLIFY === '1' ||
    Boolean(environment.AWS_LAMBDA_FUNCTION_NAME)
  );
}

export function resolveFinanceSnapshotsPath(
  environment: ServerRuntimeEnvironment = process.env,
  cwd = process.cwd()
): string {
  const configuredPath = environment.FINANCE_SNAPSHOTS_PATH?.trim();

  if (configuredPath) {
    if (!path.isAbsolute(configuredPath)) {
      throw new Error(
        'FINANCE_SNAPSHOTS_PATH must be an absolute server-only path'
      );
    }

    return configuredPath;
  }

  return isNetlifyRuntime(environment)
    ? NETLIFY_FINANCE_SNAPSHOTS_PATH
    : path.join(cwd, 'data/private/finance-snapshots.json');
}

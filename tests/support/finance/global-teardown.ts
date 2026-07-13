import { verifyProductionDataGuard } from './production-data-guard.ts';

export default async function globalTeardown(): Promise<void> {
  await verifyProductionDataGuard();
}

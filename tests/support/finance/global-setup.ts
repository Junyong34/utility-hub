import { initializeProductionDataGuard } from './production-data-guard.ts';

export default async function globalSetup(): Promise<void> {
  await initializeProductionDataGuard();
}

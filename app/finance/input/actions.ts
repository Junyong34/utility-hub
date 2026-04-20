'use server';

import { redirect } from 'next/navigation';
import {
  parseFinanceMonthParam,
  type FinanceMonthlySnapshot,
} from '@/lib/finance';
import { createFinanceRepository } from '@/lib/finance/server';

export async function createFinanceMonthAction(formData: FormData) {
  const rawMonth = formData.get('month');
  const rawSourceMonth = formData.get('sourceMonth');
  const overwrite = formData.get('overwriteExisting') === 'on';
  const month = parseFinanceMonthParam(
    typeof rawMonth === 'string' ? rawMonth : undefined
  );
  const sourceMonth = parseFinanceMonthParam(
    typeof rawSourceMonth === 'string' ? rawSourceMonth : undefined
  );

  if (!month) {
    throw new Error('유효한 기준 월이 필요합니다.');
  }

  const repository = createFinanceRepository();
  const result = await repository.createSnapshotFromPrevious(month, {
    sourceMonth,
    overwrite,
  });

  if (!result.created) {
    redirect(`/finance/input?month=${month}&duplicate=1`);
  }

  redirect(`/finance/input?month=${month}`);
}

export async function saveFinanceSnapshotAction(formData: FormData) {
  const rawSnapshot = formData.get('snapshot');

  if (typeof rawSnapshot !== 'string') {
    throw new Error('저장할 스냅샷 데이터가 필요합니다.');
  }

  const parsed = JSON.parse(rawSnapshot) as FinanceMonthlySnapshot;
  const month = parseFinanceMonthParam(parsed.month);

  if (!month) {
    throw new Error('유효한 기준 월이 필요합니다.');
  }

  const repository = createFinanceRepository();
  await repository.saveSnapshot(parsed);

  redirect(`/finance/input?month=${month}&saved=1`);
}

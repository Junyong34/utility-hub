import { NextResponse } from 'next/server';
import {
  parseFinanceMonthParam,
  type FinanceMonthlySnapshot,
} from '@/lib/finance';
import { createFinanceRepository } from '@/lib/finance/server';

export const dynamic = 'force-dynamic';

interface CreateSnapshotRequest {
  intent: 'create';
  month: string;
  sourceMonth?: string | null;
  overwriteExisting?: boolean;
}

interface SaveSnapshotRequest {
  intent: 'save';
  snapshot: FinanceMonthlySnapshot;
}

type FinanceSnapshotRequest = CreateSnapshotRequest | SaveSnapshotRequest;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseRequestBody(value: unknown): FinanceSnapshotRequest {
  if (!isRecord(value) || typeof value.intent !== 'string') {
    throw new Error('요청 형식이 올바르지 않습니다.');
  }

  if (value.intent === 'create') {
    if (typeof value.month !== 'string') {
      throw new Error('유효한 기준 월이 필요합니다.');
    }

    return {
      intent: 'create',
      month: value.month,
      sourceMonth:
        typeof value.sourceMonth === 'string' ? value.sourceMonth : null,
      overwriteExisting: value.overwriteExisting === true,
    };
  }

  if (value.intent === 'save') {
    if (!isRecord(value.snapshot)) {
      throw new Error('저장할 스냅샷 데이터가 필요합니다.');
    }

    return {
      intent: 'save',
      snapshot: value.snapshot as unknown as FinanceMonthlySnapshot,
    };
  }

  throw new Error('지원하지 않는 재무 스냅샷 요청입니다.');
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  let payload: FinanceSnapshotRequest;

  try {
    payload = parseRequestBody((await request.json()) as unknown);
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : '요청을 처리하지 못했습니다.'
    );
  }

  try {
    const repository = createFinanceRepository();

    if (payload.intent === 'create') {
      const month = parseFinanceMonthParam(payload.month);
      const sourceMonth = parseFinanceMonthParam(
        payload.sourceMonth ?? undefined
      );

      if (!month) {
        return jsonError('유효한 기준 월이 필요합니다.');
      }

      const result = await repository.createSnapshotFromPrevious(month, {
        sourceMonth,
        overwrite: payload.overwriteExisting === true,
      });

      return NextResponse.json({
        redirectTo: result.created
          ? `/finance/input?month=${month}`
          : `/finance/input?month=${month}&duplicate=1`,
      });
    }

    const month = parseFinanceMonthParam(payload.snapshot.month);

    if (!month) {
      return jsonError('유효한 기준 월이 필요합니다.');
    }

    await repository.saveSnapshot(payload.snapshot);

    return NextResponse.json({
      redirectTo: `/finance/input?month=${month}&saved=1`,
    });
  } catch (error) {
    return jsonError(
      error instanceof Error
        ? error.message
        : '재무 스냅샷 요청에 실패했습니다.',
      500
    );
  }
}

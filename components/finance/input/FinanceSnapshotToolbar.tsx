'use client';

import { Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatFinanceMonthLabel } from '@/lib/finance/formatting';
import type { FinanceMonthlySnapshot } from '@/lib/finance/types';
import { FinanceImportDialog } from './FinanceImportDialog';

interface FinanceSnapshotToolbarProps {
  month: string;
  updatedAt: string;
  onImport: (snapshots: FinanceMonthlySnapshot[]) => void;
  onDownload: () => void;
  onClearLocalDraft: () => void;
}

export function FinanceSnapshotToolbar({
  month,
  updatedAt,
  onImport,
  onDownload,
  onClearLocalDraft,
}: FinanceSnapshotToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b px-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <p className="text-base font-medium text-foreground">
          {formatFinanceMonthLabel(month)} 스냅샷
        </p>
        <p className="text-sm text-muted-foreground">
          마지막 변경: {new Date(updatedAt).toLocaleString('ko-KR')}
        </p>
        <p className="text-sm text-muted-foreground">
          현재 입력 내용은 이 브라우저 로컬스토리지에만 보관됩니다.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <FinanceImportDialog onImport={onImport} />
        <Button type="button" variant="outline" onClick={onDownload}>
          <Download className="h-4 w-4" />
          JSON 다운로드
        </Button>
        <Button type="button" variant="outline" onClick={onClearLocalDraft}>
          <Trash2 className="h-4 w-4" />
          입력 데이터 초기화
        </Button>
      </div>
    </div>
  );
}

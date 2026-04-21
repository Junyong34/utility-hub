'use client';

import { Download, RotateCcw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatFinanceMonthLabel } from '@/lib/finance/formatting';
import type { FinanceMonthlySnapshot } from '@/lib/finance/types';
import { FinanceImportDialog } from './FinanceImportDialog';

interface FinanceSnapshotToolbarProps {
  month: string;
  updatedAt: string;
  dirty: boolean;
  saved: boolean;
  localDraft: boolean;
  savePending: boolean;
  onSave: () => void;
  onImport: (snapshots: FinanceMonthlySnapshot[]) => void;
  onDownload: () => void;
  onClearLocalDraft: () => void;
  onReset: () => void;
}

function SaveButton({
  dirty,
  pending,
  onSave,
}: {
  dirty: boolean;
  pending: boolean;
  onSave: () => void;
}) {
  return (
    <Button type="button" onClick={onSave} disabled={pending || !dirty}>
      {pending ? '저장 중...' : dirty ? '스냅샷 저장' : '저장됨'}
    </Button>
  );
}

export function FinanceSnapshotToolbar({
  month,
  updatedAt,
  dirty,
  saved,
  localDraft,
  savePending,
  onSave,
  onImport,
  onDownload,
  onClearLocalDraft,
  onReset,
}: FinanceSnapshotToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b px-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <p className="text-base font-medium text-foreground">
          {formatFinanceMonthLabel(month)} 스냅샷
        </p>
        <p className="text-sm text-muted-foreground">
          마지막 저장: {new Date(updatedAt).toLocaleString('ko-KR')}
        </p>
        <p className="text-sm text-muted-foreground">
          {localDraft
            ? '수정 내용은 이 브라우저에만 보관됩니다. 서버에는 저장하지 않습니다.'
            : dirty
              ? '아직 저장하지 않은 변경사항이 있습니다.'
              : saved
                ? '저장이 완료되었습니다.'
                : '현재 스냅샷이 저장되어 있습니다.'}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <FinanceImportDialog onImport={onImport} dirty={dirty || localDraft} />
        <Button type="button" variant="outline" onClick={onDownload}>
          <Download className="h-4 w-4" />
          JSON 다운로드
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={localDraft || !dirty}
        >
          <RotateCcw className="h-4 w-4" />
          입력 초기화
        </Button>
        {localDraft ? (
          <Button type="button" variant="outline" onClick={onClearLocalDraft}>
            <Trash2 className="h-4 w-4" />
            가져온 데이터 초기화
          </Button>
        ) : (
          <SaveButton dirty={dirty} pending={savePending} onSave={onSave} />
        )}
      </div>
    </div>
  );
}

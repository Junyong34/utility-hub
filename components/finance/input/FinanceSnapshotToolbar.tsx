'use client';

import { useFormStatus } from 'react-dom';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatFinanceMonthLabel } from '@/lib/finance/formatting';
import { FinanceImportDialog } from './FinanceImportDialog';

interface FinanceSnapshotToolbarProps {
  month: string;
  updatedAt: string;
  dirty: boolean;
  saved: boolean;
  importAction: (formData: FormData) => Promise<string>;
  onReset: () => void;
}

function SaveButton({ dirty }: { dirty: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || !dirty}>
      {pending ? '저장 중...' : dirty ? '스냅샷 저장' : '저장됨'}
    </Button>
  );
}

export function FinanceSnapshotToolbar({
  month,
  updatedAt,
  dirty,
  saved,
  importAction,
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
          {dirty
            ? '아직 저장하지 않은 변경사항이 있습니다.'
          : saved
            ? '저장이 완료되었습니다.'
            : '현재 스냅샷이 저장되어 있습니다.'}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <FinanceImportDialog action={importAction} dirty={dirty} />
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={!dirty}
        >
          <RotateCcw className="h-4 w-4" />
          입력 초기화
        </Button>
        <SaveButton dirty={dirty} />
      </div>
    </div>
  );
}

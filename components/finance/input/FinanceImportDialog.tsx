'use client';

import {
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { parseFinanceSnapshotImports } from '@/lib/finance';
import { formatFinanceMonthLabel } from '@/lib/finance/formatting';
import type { FinanceMonthlySnapshot } from '@/lib/finance/types';
import { cn } from '@/lib/utils';

interface FinanceImportDialogProps {
  onImport: (snapshots: FinanceMonthlySnapshot[]) => void;
  dirty?: boolean;
  buttonClassName?: string;
}

interface ImportPreview {
  snapshots: string[];
  error: string | null;
}

function buildImportPreview(rawJson: string): ImportPreview {
  if (rawJson.trim().length === 0) {
    return { snapshots: [], error: null };
  }

  try {
    const snapshots = parseFinanceSnapshotImports(rawJson);

    return {
      snapshots: snapshots.map(snapshot => snapshot.month),
      error: null,
    };
  } catch (error) {
    return {
      snapshots: [],
      error:
        error instanceof Error ? error.message : '가져올 JSON을 확인해 주세요.',
    };
  }
}

function resetFileInput(input: HTMLInputElement | null) {
  if (input) {
    input.value = '';
  }
}

export function FinanceImportDialog({
  onImport,
  dirty = false,
  buttonClassName,
}: FinanceImportDialogProps) {
  const [open, setOpen] = useState(false);
  const [rawJson, setRawJson] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const fileInputId = `${titleId}-file`;
  const textareaId = `${titleId}-textarea`;

  const preview = useMemo(() => buildImportPreview(rawJson), [rawJson]);
  const validationError = preview.error;
  const activeError = submitError ?? validationError;
  const latestMonth = preview.snapshots.at(-1) ?? null;
  const resolvedMonthLabel = latestMonth
    ? formatFinanceMonthLabel(latestMonth)
    : null;
  const snapshotCount = preview.snapshots.length;

  const resetDialog = () => {
    setRawJson('');
    setFileName(null);
    setSubmitError(null);
    resetFileInput(fileInputRef.current);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen && !isSubmitting) {
      resetDialog();
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSubmitError(null);

    try {
      const text = await file.text();
      setRawJson(text);
      setFileName(file.name);
    } catch {
      setSubmitError('선택한 파일을 읽지 못했습니다.');
    }
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setRawJson(event.target.value);
    setFileName(null);
    setSubmitError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    if (!latestMonth || validationError) {
      setSubmitError(validationError ?? '가져올 JSON을 확인해 주세요.');
      textareaRef.current?.focus();
      return;
    }

    if (
      dirty &&
      !window.confirm(
        '현재 저장되지 않은 변경사항이 있습니다. 가져오기를 진행할까요?'
      )
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const snapshots = parseFinanceSnapshotImports(rawJson);
      onImport(snapshots);
      resetDialog();
      setOpen(false);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : '가져오기에 실패했습니다.'
      );
      textareaRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => handleOpenChange(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn('h-9 gap-1.5', buttonClassName)}
      >
        <Upload className="h-4 w-4" />
        가져오기
      </Button>
      <DialogContent className="h-[min(90vh,48rem)] overflow-hidden sm:max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="flex h-full min-h-0 flex-col gap-5"
        >
          <DialogHeader>
            <DialogTitle id={titleId}>JSON 가져오기</DialogTitle>
            <DialogDescription id={descriptionId}>
              JSON 파일을 올리거나 문자열을 붙여넣으면 월별 재무 스냅샷을 이
              브라우저에 보관합니다. 데이터셋 JSON은 포함된 월 중 마지막 월을
              입력 화면에 불러옵니다.
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
            <div className="grid gap-2">
              <Label htmlFor={fileInputId}>JSON 파일</Label>
              <Input
                ref={fileInputRef}
                id={fileInputId}
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
              />
              <p className="text-xs text-muted-foreground">
                {fileName
                  ? `선택된 파일: ${fileName}`
                  : '파일을 선택하거나 아래에 JSON을 붙여넣으세요.'}
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor={textareaId}>JSON 문자열</Label>
              <Textarea
                ref={textareaRef}
                id={textareaId}
                value={rawJson}
                onChange={handleTextareaChange}
                placeholder='{"month":"2026-05","updatedAt":"..."}'
                className="min-h-72 max-h-[24rem] resize-y overflow-y-auto field-sizing-fixed"
                aria-describedby={descriptionId}
              />
              <p className="text-xs text-muted-foreground">
                긴 JSON은 이 영역 안에서 스크롤됩니다.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-muted/30 px-3 py-2">
              <span className="text-sm font-medium text-foreground">
                가져올 대상
              </span>
              {resolvedMonthLabel ? (
                <Badge variant="secondary">{resolvedMonthLabel}</Badge>
              ) : (
                <Badge variant="outline">대기 중</Badge>
              )}
              {snapshotCount > 1 ? (
                <Badge variant="outline">총 {snapshotCount}개월</Badge>
              ) : null}
              {dirty ? (
                <span className="text-xs text-muted-foreground">
                  현재 편집 내용은 가져오기 후 유지되지 않습니다.
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  가져오면 서버에 저장하지 않고 브라우저에만 보관합니다.
                </span>
              )}
            </div>

            {activeError ? (
              <p className="text-sm text-destructive">{activeError}</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                가져올 월이 확인되면 가져오기 버튼이 활성화됩니다.
              </p>
            )}
          </div>

          <DialogFooter className="shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              닫기
            </Button>
            <Button
              type="submit"
              disabled={Boolean(validationError) || isSubmitting}
            >
              {isSubmitting ? '가져오는 중...' : '가져오기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import type { ChangeEvent, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { FinanceOwner } from '@/lib/finance/types';

export const OWNER_OPTIONS: Array<{ value: FinanceOwner; label: string }> = [
  { value: 'joint', label: '공동' },
  { value: 'husband', label: '남편' },
  { value: 'wife', label: '아내' },
];

export function parseAmountInput(value: string): number {
  const normalized = Number(value.replace(/[^\d]/g, ''));

  if (!Number.isFinite(normalized) || normalized < 0) {
    return 0;
  }

  return Math.floor(normalized);
}

function formatAmountInputValue(value: number | null | undefined): string {
  if (!value) {
    return '';
  }

  return Math.floor(value).toLocaleString('ko-KR');
}

export function nextRowId(prefix: string): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}`;
}

const EDITABLE_INPUT_CLASS_NAME =
  'border-emerald-200 bg-emerald-50/60 text-foreground focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 dark:border-emerald-900/60 dark:bg-emerald-950/20';

const EDITABLE_SELECT_CLASS_NAME =
  'h-8 w-full rounded-lg border border-emerald-200 bg-emerald-50/60 px-2.5 text-sm text-foreground focus-visible:border-emerald-500 focus-visible:ring-3 focus-visible:ring-emerald-500/20 dark:border-emerald-900/60 dark:bg-emerald-950/20';

function EditableLabel({ id, label }: { id: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor={id}>{label}</Label>
      <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[0.68rem] font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
        입력
      </span>
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  type = 'text',
}: FieldProps) {
  return (
    <div className="space-y-1.5">
      <EditableLabel id={id} label={label} />
      <Input
        id={id}
        type={type}
        value={value}
        className={EDITABLE_INPUT_CLASS_NAME}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
      />
    </div>
  );
}

interface AmountFieldProps {
  id: string;
  label: string;
  value: number | null | undefined;
  onChange: (value: number | null) => void;
  allowEmpty?: boolean;
}

export function AmountField({
  id,
  label,
  value,
  onChange,
  allowEmpty = false,
}: AmountFieldProps) {
  return (
    <div className="space-y-1.5">
      <EditableLabel id={id} label={label} />
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        value={formatAmountInputValue(value)}
        className={EDITABLE_INPUT_CLASS_NAME}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (allowEmpty && event.target.value.trim() === '') {
            onChange(null);
            return;
          }

          onChange(parseAmountInput(event.target.value));
        }}
      />
    </div>
  );
}

interface SelectFieldProps<TValue extends string> {
  id: string;
  label: string;
  value: TValue;
  options: Array<{ value: TValue; label: string }>;
  onChange: (value: TValue) => void;
}

export function SelectField<TValue extends string>({
  id,
  label,
  value,
  options,
  onChange,
}: SelectFieldProps<TValue>) {
  return (
    <div className="space-y-1.5">
      <EditableLabel id={id} label={label} />
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as TValue)}
        className={cn(EDITABLE_SELECT_CLASS_NAME)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface RowShellProps {
  title: string;
  children: ReactNode;
  onRemove?: () => void;
}

export function RowShell({ title, children, onRemove }: RowShellProps) {
  return (
    <div className="space-y-3 rounded-lg border p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {onRemove ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-destructive"
          >
            삭제
          </Button>
        ) : null}
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{children}</div>
    </div>
  );
}

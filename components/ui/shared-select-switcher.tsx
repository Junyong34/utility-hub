'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Option {
  value: string;
  label: string;
}

interface SharedSelectSwitcherProps {
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
  placeholder: string;
  emptyLabel?: string;
  className?: string;
}

export function SharedSelectSwitcher({
  value,
  onValueChange,
  options,
  placeholder,
  emptyLabel = '선택할 항목이 없습니다.',
  className = 'w-full sm:w-80',
}: SharedSelectSwitcherProps) {
  if (options.length <= 1) {
    return (
      <p className="text-sm text-muted-foreground">
        {options.length === 0 ? emptyLabel : '현재 선택 가능한 항목이 하나입니다.'}
      </p>
    );
  }

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <span className="truncate">{option.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

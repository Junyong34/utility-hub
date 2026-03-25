import * as React from 'react';
import { Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface AmountInputQuickAction {
  amount: number;
  label: string;
  onSelect: () => void;
}

interface AmountInputFieldProps {
  className?: string;
  id: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  quickActions: AmountInputQuickAction[];
  summaryText?: string;
  tooltipContent?: string;
  unitText?: string;
  value: string;
}

function AmountInputField({
  className,
  id,
  inputMode = 'numeric',
  label,
  onChange,
  placeholder,
  quickActions,
  summaryText,
  tooltipContent,
  unitText,
  value,
}: AmountInputFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Label htmlFor={id} className="text-base font-bold">
            {label}
          </Label>
          {tooltipContent ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`${label} 도움말`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="max-w-xs">{tooltipContent}</p>
              </TooltipContent>
            </Tooltip>
          ) : null}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[auto_auto] md:items-center">
        <div className="flex gap-2 items-center">
          <Input
            id={id}
            type="text"
            inputMode={inputMode}
            value={value}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            className="text-lg max-w-full md:max-w-md"
          />
          {unitText ? (
            <span className="text-base font-semibold text-foreground min-w-fit">
              {unitText}
            </span>
          ) : null}
        </div>
        {summaryText ? (
          <div>
            <span className="inline-flex min-h-8 items-center rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-sm font-medium text-primary whitespace-nowrap">
              {summaryText}
            </span>
          </div>
        ) : null}
      </div>

      {quickActions.length > 0 ? (
        <div className="-mx-1 overflow-x-auto px-1">
          <div className="flex min-w-max items-center gap-2 whitespace-nowrap pb-1">
            {quickActions.map(action => (
              <Button
                key={`${action.label}-${action.amount}`}
                type="button"
                variant="outline"
                size="xs"
                onClick={action.onSelect}
                className="shrink-0 rounded-full px-3"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export { AmountInputField };

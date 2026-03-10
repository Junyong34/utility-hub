'use client';

import * as React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  DayPicker,
  getDefaultClassNames,
  type ChevronProps,
  type DayPickerProps,
  type MonthCaptionProps,
  useDayPicker,
} from 'react-day-picker';
import { ko } from 'date-fns/locale';

import { buttonVariants } from '@/components/ui/button';
import {
  buildMonthYearDate,
  type CalendarQuickAction,
  getQuickActionDate,
  getMonthOptions,
  getYearOptions,
} from '@/components/ui/calendar-date-utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type CalendarProps = DayPickerProps & {
  quickActions?: CalendarQuickAction[];
  quickActionBase?: 'today' | 'selected';
  onQuickActionSelect?: (date: Date) => void;
};

function CalendarChevron({
  orientation = 'right',
  className,
}: ChevronProps): React.JSX.Element {
  const iconClassName = cn('size-4', className);

  if (orientation === 'left') {
    return <ChevronLeft className={iconClassName} />;
  }

  if (orientation === 'down') {
    return <ChevronDown className={iconClassName} />;
  }

  if (orientation === 'up') {
    return <ChevronDown className={cn(iconClassName, 'rotate-180')} />;
  }

  return <ChevronRight className={iconClassName} />;
}

function CalendarMonthCaption({
  calendarMonth,
  className,
}: MonthCaptionProps): React.JSX.Element {
  const { goToMonth, nextMonth, previousMonth, dayPickerProps } =
    useDayPicker();
  const displayDate = calendarMonth.date;
  const displayYear = displayDate.getFullYear();
  const displayMonth = displayDate.getMonth();
  const startMonth = dayPickerProps.startMonth ?? new Date(1900, 0);
  const endMonth = dayPickerProps.endMonth ?? new Date(2100, 11);
  const yearOptions = getYearOptions(startMonth, endMonth);
  const monthOptions = getMonthOptions();

  const handleYearChange = (value: string) => {
    goToMonth(
      buildMonthYearDate({
        year: Number(value),
        month: displayMonth,
      })
    );
  };

  const handleMonthChange = (value: string) => {
    goToMonth(
      buildMonthYearDate({
        year: displayYear,
        month: Number(value),
      })
    );
  };

  const handlePreviousClick = () => {
    if (previousMonth) {
      goToMonth(previousMonth);
    }
  };

  const handleNextClick = () => {
    if (nextMonth) {
      goToMonth(nextMonth);
    }
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <button
        type="button"
        onClick={handlePreviousClick}
        disabled={!previousMonth}
        className={cn(
          buttonVariants({ variant: 'default', size: 'icon-sm' }),
          'size-8 bg-background p-0 text-muted-foreground hover:text-foreground disabled:opacity-50'
        )}
        aria-label="이전 달로 이동"
      >
        <ChevronLeft className="size-4" />
      </button>

      <Select value={String(displayYear)} onValueChange={handleYearChange}>
        <SelectTrigger
          size="sm"
          className="h-8 min-w-[96px] rounded-md bg-background px-3"
          aria-label="연도 선택"
        >
          <SelectValue placeholder="연도" />
        </SelectTrigger>
        <SelectContent
          className="!max-h-[240px] min-w-[96px]"
          position="popper"
        >
          {yearOptions.map(year => (
            <SelectItem key={year} value={String(year)}>
              {year}년
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={String(displayMonth)} onValueChange={handleMonthChange}>
        <SelectTrigger
          size="sm"
          className="h-8 min-w-[84px] rounded-md bg-background px-3"
          aria-label="월 선택"
        >
          <SelectValue placeholder="월" />
        </SelectTrigger>
        <SelectContent
          className="!max-h-[240px] min-w-[84px]"
          position="popper"
        >
          {monthOptions.map(month => (
            <SelectItem key={month.value} value={String(month.value)}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <button
        type="button"
        onClick={handleNextClick}
        disabled={!nextMonth}
        className={cn(
          buttonVariants({ variant: 'default', size: 'icon-sm' }),
          'size-8 bg-background p-0 text-muted-foreground hover:text-foreground disabled:opacity-50'
        )}
        aria-label="다음 달로 이동"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  components,
  showOutsideDays = true,
  startMonth = new Date(1900, 0),
  endMonth = new Date(2100, 11),
  quickActions,
  quickActionBase = 'today',
  onQuickActionSelect,
  ...dayPickerProps
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();
  const selected =
    'selected' in dayPickerProps ? dayPickerProps.selected : undefined;
  const isRangeMode = dayPickerProps.mode === 'range';

  const handleQuickActionSelect = React.useCallback(
    (action: CalendarQuickAction) => {
      if (!onQuickActionSelect) {
        return;
      }

      onQuickActionSelect(
        getQuickActionDate({
          action,
          quickActionBase,
          selected,
          today: new Date(),
        })
      );
    },
    [onQuickActionSelect, quickActionBase, selected]
  );

  return (
    <div className={cn('flex flex-col gap-3 p-3', className)}>
      <DayPicker
        locale={ko}
        showOutsideDays={showOutsideDays}
        startMonth={startMonth}
        endMonth={endMonth}
        className="w-fit"
        classNames={{
          root: cn(defaultClassNames.root, 'w-fit'),
          months: cn(
            defaultClassNames.months,
            'flex flex-col gap-4 sm:flex-row'
          ),
          month: cn(defaultClassNames.month, 'flex w-full flex-col gap-4'),
          month_caption: cn(
            defaultClassNames.month_caption,
            'flex h-9 items-center justify-center w-full'
          ),
          nav: cn(defaultClassNames.nav, 'hidden'),
          button_previous: cn(defaultClassNames.button_previous, 'hidden'),
          button_next: cn(defaultClassNames.button_next, 'hidden'),
          chevron: cn(defaultClassNames.chevron, 'size-4'),
          month_grid: cn(
            defaultClassNames.month_grid,
            'w-full border-collapse'
          ),
          weekdays: cn(defaultClassNames.weekdays, 'flex'),
          weekday: cn(
            defaultClassNames.weekday,
            'w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground'
          ),
          week: cn(defaultClassNames.week, 'mt-2 flex w-full'),
          day: cn(
            defaultClassNames.day,
            'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50',
            isRangeMode
              ? '[&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
              : '[&:has([aria-selected])]:rounded-md'
          ),
          day_button: cn(
            buttonVariants({ variant: 'ghost' }),
            defaultClassNames.day_button,
            'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
          ),
          range_start: cn(defaultClassNames.range_start, 'day-range-start'),
          range_end: cn(defaultClassNames.range_end, 'day-range-end'),
          selected: cn(
            defaultClassNames.selected,
            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground'
          ),
          today: cn(
            defaultClassNames.today,
            'bg-accent text-accent-foreground'
          ),
          outside: cn(
            defaultClassNames.outside,
            'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30'
          ),
          disabled: cn(defaultClassNames.disabled, 'opacity-50'),
          range_middle: cn(
            defaultClassNames.range_middle,
            'aria-selected:bg-accent aria-selected:text-accent-foreground'
          ),
          hidden: cn(defaultClassNames.hidden, 'invisible'),
          ...classNames,
        }}
        components={{
          Chevron: CalendarChevron,
          MonthCaption: CalendarMonthCaption,
          ...components,
        }}
        {...dayPickerProps}
      />

      {quickActions?.length ? (
        <div className="flex flex-wrap gap-2 border-t pt-3">
          {quickActions.map(action => (
            <button
              key={`${action.label}-${action.unit}-${action.amount}`}
              type="button"
              onClick={() => handleQuickActionSelect(action)}
              disabled={!onQuickActionSelect}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'h-8 rounded-full px-3 text-xs font-medium'
              )}
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };

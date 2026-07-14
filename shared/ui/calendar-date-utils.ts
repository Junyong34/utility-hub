import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  startOfDay,
} from 'date-fns';
import type { DateRange } from 'react-day-picker';

export type CalendarQuickActionUnit = 'day' | 'week' | 'month' | 'year';

export interface CalendarQuickAction {
  label: string;
  amount: number;
  unit: CalendarQuickActionUnit;
}

export interface CalendarMonthOption {
  value: number;
  label: string;
}

type CalendarSelectedValue = Date | Date[] | DateRange | undefined;

interface QuickActionBaseDateOptions {
  quickActionBase?: 'today' | 'selected';
  selected?: CalendarSelectedValue;
  today?: Date;
}

interface QuickActionDateOptions extends QuickActionBaseDateOptions {
  action: CalendarQuickAction;
}

interface MonthYearDateOptions {
  year: number;
  month: number;
}

function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

function getSelectedBaseDate(selected: CalendarSelectedValue): Date | undefined {
  if (isValidDate(selected)) {
    return selected;
  }

  if (Array.isArray(selected)) {
    return selected.find(isValidDate);
  }

  if (selected && typeof selected === 'object') {
    if (isValidDate(selected.from)) {
      return selected.from;
    }

    if (isValidDate(selected.to)) {
      return selected.to;
    }
  }

  return undefined;
}

export function getQuickActionBaseDate({
  quickActionBase = 'today',
  selected,
  today = new Date(),
}: QuickActionBaseDateOptions): Date {
  if (quickActionBase === 'selected') {
    const selectedBaseDate = getSelectedBaseDate(selected);

    if (selectedBaseDate) {
      return startOfDay(selectedBaseDate);
    }
  }

  return startOfDay(today);
}

export function getQuickActionDate({
  action,
  quickActionBase = 'today',
  selected,
  today = new Date(),
}: QuickActionDateOptions): Date {
  const baseDate = getQuickActionBaseDate({
    quickActionBase,
    selected,
    today,
  });

  switch (action.unit) {
    case 'day':
      return addDays(baseDate, action.amount);
    case 'week':
      return addWeeks(baseDate, action.amount);
    case 'month':
      return addMonths(baseDate, action.amount);
    case 'year':
      return addYears(baseDate, action.amount);
    default: {
      const exhaustiveCheck: never = action.unit;

      return exhaustiveCheck;
    }
  }
}

export function getYearOptions(startMonth: Date, endMonth: Date): number[] {
  const startYear = startMonth.getFullYear();
  const endYear = endMonth.getFullYear();

  return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
    return startYear + index;
  });
}

export function getMonthOptions(): CalendarMonthOption[] {
  return Array.from({ length: 12 }, (_, month) => ({
    value: month,
    label: `${month + 1}월`,
  }));
}

export function buildMonthYearDate({
  year,
  month,
}: MonthYearDateOptions): Date {
  return new Date(year, month, 1);
}

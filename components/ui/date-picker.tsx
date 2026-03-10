"use client"

import * as React from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  type CalendarProps,
} from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TimeInput } from "@/components/ui/time-input"

interface DatePickerProps {
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  closeOnSelect?: boolean
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect">
}

interface DateTimePickerProps extends DatePickerProps {
  withTime?: true
  timeDisabled?: boolean
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "날짜 선택",
  disabled = false,
  className,
  closeOnSelect = false,
  calendarProps,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const { onQuickActionSelect, ...resolvedCalendarProps } = calendarProps ?? {}

  const handleSelect = React.useCallback(
    (nextDate: Date | undefined) => {
      onDateChange(nextDate)

      if (closeOnSelect && nextDate) {
        setOpen(false)
      }
    },
    [closeOnSelect, onDateChange]
  )

  const handleQuickActionSelect = React.useCallback(
    (nextDate: Date) => {
      onDateChange(nextDate)
      onQuickActionSelect?.(nextDate)

      if (closeOnSelect) {
        setOpen(false)
      }
    },
    [closeOnSelect, onDateChange, onQuickActionSelect]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ko }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          onQuickActionSelect={handleQuickActionSelect}
          initialFocus
          {...resolvedCalendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}

export function DateTimePicker({
  date,
  onDateChange,
  placeholder = "날짜 및 시간 선택",
  disabled = false,
  className,
  closeOnSelect = false,
  calendarProps,
  timeDisabled = false,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false)

  const { onQuickActionSelect, ...resolvedCalendarProps } = calendarProps ?? {}

  const handleSelect = React.useCallback(
    (nextDate: Date | undefined) => {
      if (nextDate && date) {
        // Preserve time when selecting a new date
        nextDate.setHours(date.getHours(), date.getMinutes(), 0, 0)
      }
      onDateChange(nextDate)

      // Don't auto-close when time picker is present
      if (closeOnSelect && nextDate && timeDisabled) {
        setOpen(false)
      }
    },
    [closeOnSelect, onDateChange, date, timeDisabled]
  )

  const handleQuickActionSelect = React.useCallback(
    (nextDate: Date) => {
      if (date) {
        // Preserve time when using quick actions
        nextDate.setHours(date.getHours(), date.getMinutes(), 0, 0)
      }
      onDateChange(nextDate)
      onQuickActionSelect?.(nextDate)

      if (closeOnSelect && timeDisabled) {
        setOpen(false)
      }
    },
    [closeOnSelect, onDateChange, onQuickActionSelect, date, timeDisabled]
  )

  const handleTimeChange = React.useCallback(
    (newDate: Date) => {
      onDateChange(newDate)
    },
    [onDateChange]
  )

  const formatDateTime = (dateToFormat: Date) => {
    return `${format(dateToFormat, "PPP", { locale: ko })} ${format(dateToFormat, "HH:mm")}`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDateTime(date) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          onQuickActionSelect={handleQuickActionSelect}
          initialFocus
          {...resolvedCalendarProps}
        />
        <div className="border-t px-3 pb-3">
          <TimeInput
            date={date}
            onChange={handleTimeChange}
            disabled={timeDisabled || disabled}
            className="mt-3"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

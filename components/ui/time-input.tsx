"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface TimeInputProps {
  date: Date | undefined
  onChange: (date: Date) => void
  disabled?: boolean
  className?: string
}

export function TimeInput({
  date,
  onChange,
  disabled = false,
  className,
}: TimeInputProps) {
  const [hours, setHours] = React.useState(
    date ? String(date.getHours()).padStart(2, "0") : "00"
  )
  const [minutes, setMinutes] = React.useState(
    date ? String(date.getMinutes()).padStart(2, "0") : "00"
  )

  React.useEffect(() => {
    if (date) {
      setHours(String(date.getHours()).padStart(2, "0"))
      setMinutes(String(date.getMinutes()).padStart(2, "0"))
    }
  }, [date])

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 2) {
      const num = parseInt(value, 10)
      if (isNaN(num) || (num >= 0 && num <= 23)) {
        setHours(value)
        updateDateTime(value, minutes)
      }
    }
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 2) {
      const num = parseInt(value, 10)
      if (isNaN(num) || (num >= 0 && num <= 59)) {
        setMinutes(value)
        updateDateTime(hours, value)
      }
    }
  }

  const handleHoursBlur = () => {
    const paddedHours = hours.padStart(2, "0")
    setHours(paddedHours)
    updateDateTime(paddedHours, minutes)
  }

  const handleMinutesBlur = () => {
    const paddedMinutes = minutes.padStart(2, "0")
    setMinutes(paddedMinutes)
    updateDateTime(hours, paddedMinutes)
  }

  const updateDateTime = (h: string, m: string) => {
    const baseDate = date || new Date()
    const newDate = new Date(baseDate)

    const hoursNum = parseInt(h, 10) || 0
    const minutesNum = parseInt(m, 10) || 0

    newDate.setHours(hoursNum, minutesNum, 0, 0)
    onChange(newDate)
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Clock className="h-4 w-4 text-muted-foreground" />
      <div className="flex items-center gap-1">
        <Input
          type="text"
          inputMode="numeric"
          value={hours}
          onChange={handleHoursChange}
          onBlur={handleHoursBlur}
          disabled={disabled}
          className="h-9 w-12 text-center p-1"
          placeholder="00"
          maxLength={2}
        />
        <span className="text-muted-foreground">:</span>
        <Input
          type="text"
          inputMode="numeric"
          value={minutes}
          onChange={handleMinutesChange}
          onBlur={handleMinutesBlur}
          disabled={disabled}
          className="h-9 w-12 text-center p-1"
          placeholder="00"
          maxLength={2}
        />
      </div>
    </div>
  )
}

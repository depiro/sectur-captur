"use client"

import { useState } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isToday,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns"
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const WEEKDAYS = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
]

interface CapturDatePickerProps {
  value?: Date
  onChange: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  label?: string
  error?: string
  required?: boolean
}

export function CapturDatePicker({
  value,
  onChange,
  placeholder = "DD/MM/AAAA",
  disabled = false,
  label,
  error,
  required,
}: CapturDatePickerProps) {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(value ?? new Date())

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const firstDay = startOfMonth(viewDate)
  const lastDay = endOfMonth(viewDate)
  const days = eachDayOfInterval({ start: firstDay, end: lastDay })
  const leadingBlanks = getDay(firstDay)
  const cells: (Date | null)[] = [
    ...Array<null>(leadingBlanks).fill(null),
    ...days,
  ]

  const yearRange = Array.from({ length: 20 }, (_, i) => year - 5 + i)

  function handleSelect(day: Date) {
    onChange(day)
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          className="text-body-md font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          {label}
          {required && (
            <span className="ml-0.5" style={{ color: "var(--color-error)" }}>
              *
            </span>
          )}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center gap-2 border px-3 text-button outline-none transition-colors",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-[color:var(--color-error)]"
              : open
              ? "border-[color:var(--color-brand-teal)]"
              : "border-[color:var(--color-border)]"
          )}
          style={{
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--color-surface)",
            boxShadow: open ? "var(--shadow-focus)" : undefined,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <CalendarDays
            size={16}
            style={{ color: "var(--color-text-secondary)", flexShrink: 0 }}
          />
          <span
            style={{
              color: value
                ? "var(--color-text-primary)"
                : "var(--color-text-disabled)",
            }}
          >
            {value ? format(value, "dd/MM/yyyy") : placeholder}
          </span>
        </PopoverTrigger>

        <PopoverContent
          className="flex w-[280px] flex-col gap-3 p-4"
          align="start"
          style={{ boxShadow: "var(--shadow-lg)" }}
        >
          {/* Month / Year controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewDate(subMonths(viewDate, 1))}
              className="rounded p-1 transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex flex-1 gap-1">
              <select
                value={month}
                onChange={(e) =>
                  setViewDate(new Date(year, +e.target.value, 1))
                }
                className="flex-1 rounded border px-1 py-0.5 text-body-sm outline-none"
                style={{
                  borderColor: "var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text-primary)",
                }}
              >
                {MONTHS.map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) =>
                  setViewDate(new Date(+e.target.value, month, 1))
                }
                className="w-16 rounded border px-1 py-0.5 text-body-sm outline-none"
                style={{
                  borderColor: "var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--color-background)",
                  color: "var(--color-text-primary)",
                }}
              >
                {yearRange.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setViewDate(addMonths(viewDate, 1))}
              className="rounded p-1 transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="text-center text-label"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((day, i) => {
              if (!day) return <div key={`blank-${i}`} />
              const isSelected = value ? isSameDay(day, value) : false
              const isCurrentDay = isToday(day)
              const isOtherMonth = !isSameMonth(day, viewDate)
              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={isOtherMonth}
                  onClick={() => handleSelect(day)}
                  className="flex h-8 w-full items-center justify-center text-body-sm transition-colors"
                  style={{
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: isSelected
                      ? "var(--color-brand-teal)"
                      : undefined,
                    color: isSelected
                      ? "#fff"
                      : isOtherMonth
                      ? "var(--color-text-disabled)"
                      : "var(--color-text-primary)",
                    border:
                      isCurrentDay && !isSelected
                        ? "1px solid var(--color-brand-teal)"
                        : "1px solid transparent",
                    opacity: isOtherMonth ? 0.35 : 1,
                    cursor: isOtherMonth ? "default" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected && !isOtherMonth)
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "var(--color-surface)"
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected)
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "transparent"
                  }}
                >
                  {format(day, "d")}
                </button>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-body-sm" style={{ color: "var(--color-error)" }}>
          {error}
        </p>
      )}
    </div>
  )
}

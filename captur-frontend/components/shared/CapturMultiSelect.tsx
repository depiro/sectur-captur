"use client"

import { useState } from "react"
import { ChevronDown, X, Check } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface MultiSelectOption {
  value: string
  label: string
}

interface CapturMultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  disabled?: boolean
  label?: string
  error?: string
}

export function CapturMultiSelect({
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  disabled = false,
  label,
  error,
}: CapturMultiSelectProps) {
  const [open, setOpen] = useState(false)

  function toggle(optionValue: string) {
    onChange(
      value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue]
    )
  }

  function removeChip(optionValue: string, e: React.MouseEvent) {
    e.stopPropagation()
    onChange(value.filter((v) => v !== optionValue))
  }

  const selected = options.filter((o) => value.includes(o.value))

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          className="text-body-md font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          disabled={disabled}
          className={cn(
            "flex min-h-10 w-full items-center gap-2 border px-3 py-2 outline-none transition-colors",
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
          <div className="flex flex-1 flex-wrap gap-1 text-left">
            {selected.length > 0 ? (
              selected.map((opt) => (
                <span
                  key={opt.value}
                  className="inline-flex items-center gap-1 text-label"
                  style={{
                    height: 20,
                    paddingInline: 8,
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--color-brand-teal-bg)",
                    color: "var(--color-brand-teal)",
                  }}
                >
                  {opt.label}
                  <button
                    type="button"
                    onClick={(e) => removeChip(opt.value, e)}
                    aria-label={`Quitar ${opt.label}`}
                  >
                    <X size={10} />
                  </button>
                </span>
              ))
            ) : (
              <span style={{ color: "var(--color-text-disabled)" }}>
                {placeholder}
              </span>
            )}
          </div>
          <ChevronDown
            size={16}
            className={cn(
              "shrink-0 transition-transform duration-150",
              open && "rotate-180"
            )}
            style={{ color: "var(--color-text-secondary)" }}
          />
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="flex flex-col gap-0.5 p-1.5"
          style={{
            width: "var(--anchor-width)",
            maxHeight: 220,
            overflowY: "auto",
          }}
        >
          {options.map((opt) => {
            const checked = value.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggle(opt.value)}
                className="flex w-full items-center gap-2 rounded px-2 py-1.5 transition-colors text-left"
                style={{ borderRadius: "var(--radius-sm)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--color-surface)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "transparent")
                }
              >
                <span
                  className="inline-flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "var(--radius-sm)",
                    border: checked
                      ? "2px solid var(--color-brand-teal)"
                      : "2px solid var(--color-border)",
                    backgroundColor: checked
                      ? "var(--color-brand-teal)"
                      : "transparent",
                    color: "#fff",
                  }}
                >
                  {checked && <Check size={11} strokeWidth={3} />}
                </span>
                <span
                  className="text-body-md"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {opt.label}
                </span>
              </button>
            )
          })}
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

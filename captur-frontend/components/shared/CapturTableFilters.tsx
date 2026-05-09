"use client"

import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TableFilter {
  key: string
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
}

interface CapturTableFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  placeholder?: string
  filters?: TableFilter[]
  onClear?: () => void
  className?: string
}

export function CapturTableFilters({
  search,
  onSearchChange,
  placeholder = "Buscar...",
  filters = [],
  onClear,
  className,
}: CapturTableFiltersProps) {
  const hasActiveFilters = search !== "" || filters.some((f) => f.value !== "")

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {/* Search input */}
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search
          size={15}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--color-text-secondary)" }}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="h-9 w-full rounded-md border pl-8 pr-3 text-body-md outline-none transition-colors"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-background)",
            color: "var(--color-text-primary)",
          }}
          onFocus={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor =
              "var(--color-brand-teal)")
          }
          onBlur={(e) =>
            ((e.currentTarget as HTMLElement).style.borderColor =
              "var(--color-border)")
          }
        />
      </div>

      {/* Select filters */}
      {filters.map((filter) => (
        <div key={filter.key} className="relative">
          <select
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="h-9 appearance-none rounded-md border pl-3 pr-8 text-body-md outline-none transition-colors"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-background)",
              color: filter.value
                ? "var(--color-text-primary)"
                : "var(--color-text-disabled)",
            }}
            onFocus={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor =
                "var(--color-brand-teal)")
            }
            onBlur={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor =
                "var(--color-border)")
            }
          >
            <option value="">{filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Chevron icon */}
          <svg
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      ))}

      {/* Clear */}
      {hasActiveFilters && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border text-body-sm transition-colors"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-secondary)",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--color-surface)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.backgroundColor =
              "transparent")
          }
        >
          <X size={13} />
          Limpiar filtros
        </button>
      )}
    </div>
  )
}

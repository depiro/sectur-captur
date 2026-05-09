"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CapturPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems?: number
  pageSize?: number
  className?: string
}

function getPageRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | "...")[] = [1]

  if (current <= 4) {
    pages.push(2, 3, 4, 5, "...", total)
  } else if (current >= total - 3) {
    pages.push("...", total - 4, total - 3, total - 2, total - 1, total)
  } else {
    pages.push("...", current - 1, current, current + 1, "...", total)
  }

  return pages
}

export function CapturPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 10,
  className,
}: CapturPaginationProps) {
  const pages = getPageRange(currentPage, totalPages)
  const from = totalItems !== undefined ? (currentPage - 1) * pageSize + 1 : undefined
  const to = totalItems !== undefined ? Math.min(currentPage * pageSize, totalItems) : undefined

  return (
    <div className={cn("flex items-center justify-between gap-4 flex-wrap", className)}>
      {totalItems !== undefined ? (
        <p className="text-body-sm" style={{ color: "var(--color-text-secondary)" }}>
          Mostrando{" "}
          <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
            {from}–{to}
          </span>{" "}
          de{" "}
          <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
            {totalItems}
          </span>{" "}
          resultados
        </p>
      ) : (
        <div />
      )}

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Página anterior"
          className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-secondary)",
            backgroundColor: "transparent",
          }}
        >
          <ChevronLeft size={15} />
        </button>

        {pages.map((page, i) =>
          page === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="flex h-8 w-8 items-center justify-center text-body-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page as number)}
              aria-current={page === currentPage ? "page" : undefined}
              className="flex h-8 w-8 items-center justify-center rounded-md border text-body-sm transition-colors"
              style={{
                borderColor:
                  page === currentPage ? "var(--color-brand-teal)" : "var(--color-border)",
                backgroundColor:
                  page === currentPage ? "var(--color-brand-teal)" : "transparent",
                color: page === currentPage ? "#fff" : "var(--color-text-primary)",
                fontWeight: page === currentPage ? 500 : 400,
              }}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Página siguiente"
          className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-secondary)",
            backgroundColor: "transparent",
          }}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}

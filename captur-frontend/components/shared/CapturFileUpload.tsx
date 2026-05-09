"use client"

import { useRef, useState } from "react"
import { Upload, X, FileText, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

interface CapturFileUploadProps {
  accept?: string
  multiple?: boolean
  maxSizeMB?: number
  onChange?: (files: File[]) => void
  label?: string
  error?: string
  disabled?: boolean
  hint?: string
}

export function CapturFileUpload({
  accept,
  multiple = false,
  maxSizeMB,
  onChange,
  label,
  error,
  disabled = false,
  hint,
}: CapturFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [sizeError, setSizeError] = useState<string>()

  function addFiles(incoming: FileList | null) {
    if (!incoming || disabled) return
    const list = Array.from(incoming)

    if (maxSizeMB) {
      const oversized = list.find(
        (f) => f.size > maxSizeMB * 1024 * 1024
      )
      if (oversized) {
        setSizeError(
          `"${oversized.name}" supera el límite de ${maxSizeMB} MB`
        )
        return
      }
    }

    setSizeError(undefined)
    const next = multiple ? [...files, ...list] : list
    setFiles(next)
    onChange?.(next)
  }

  function remove(index: number) {
    const next = files.filter((_, i) => i !== index)
    setFiles(next)
    onChange?.(next)
  }

  const hasError = !!(error || sizeError)

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className="text-body-md font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          {label}
        </label>
      )}

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) =>
          e.key === "Enter" && !disabled && inputRef.current?.click()
        }
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          addFiles(e.dataTransfer.files)
        }}
        className={cn(
          "flex flex-col items-center justify-center gap-3 border-2 border-dashed px-6 py-10 text-center transition-colors outline-none",
          "focus-visible:ring-[length:3px] focus-visible:ring-[color:var(--color-brand-teal)]/30",
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer",
          dragOver
            ? "border-[color:var(--color-brand-teal)] bg-[color:var(--color-brand-teal-bg)]"
            : hasError
            ? "border-[color:var(--color-error)]"
            : "border-[color:var(--color-border)] hover:border-[color:var(--color-brand-teal)]"
        )}
        style={{ borderRadius: "var(--radius-md)" }}
      >
        <Upload
          size={32}
          style={{
            color: dragOver
              ? "var(--color-brand-teal)"
              : "var(--color-text-secondary)",
          }}
        />
        <div>
          <p
            className="text-body-md"
            style={{ color: "var(--color-text-primary)" }}
          >
            Arrastrá un archivo o{" "}
            <span
              className="font-medium"
              style={{ color: "var(--color-brand-teal)" }}
            >
              hacé clic para seleccionar
            </span>
          </p>
          {hint && (
            <p
              className="mt-1 text-body-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {hint}
            </p>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => addFiles(e.target.files)}
      />

      {/* Error */}
      {(error || sizeError) && (
        <p
          className="flex items-center gap-1 text-body-sm"
          style={{ color: "var(--color-error)" }}
        >
          <AlertCircle size={13} />
          {error ?? sizeError}
        </p>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul className="flex flex-col gap-1">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center gap-2 px-3 py-2 text-body-sm"
              style={{
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <FileText
                size={15}
                style={{
                  color: "var(--color-brand-teal)",
                  flexShrink: 0,
                }}
              />
              <span
                className="flex-1 truncate"
                style={{ color: "var(--color-text-primary)" }}
              >
                {f.name}
              </span>
              <span style={{ color: "var(--color-text-secondary)" }}>
                {formatSize(f.size)}
              </span>
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label={`Quitar ${f.name}`}
                className="ml-1 rounded p-0.5 transition-colors"
                style={{ color: "var(--color-text-secondary)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--color-error)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "var(--color-text-secondary)")
                }
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

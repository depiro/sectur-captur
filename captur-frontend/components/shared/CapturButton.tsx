"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef } from "react"

type Variant = "primary" | "secondary" | "ghost" | "destructive"
type Size = "sm" | "md" | "lg"

interface CapturButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  loadingText?: string
}

const variantStyles: Record<Variant, string> = {
  primary:
    "text-white border-transparent disabled:opacity-40",
  secondary:
    "bg-transparent border border-[color:var(--color-brand-teal)] text-[color:var(--color-brand-teal)] hover:bg-[color:var(--color-brand-teal-bg)] disabled:opacity-40",
  ghost:
    "bg-transparent border-transparent text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-surface)] disabled:opacity-40",
  destructive:
    "text-white border-transparent disabled:opacity-40",
}

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-3 text-label gap-1.5",
  md: "h-10 px-4 text-button gap-2",
  lg: "h-12 px-5 text-button text-base gap-2",
}

export function CapturButton({
  variant = "primary",
  size = "md",
  isLoading = false,
  loadingText,
  disabled,
  children,
  className,
  style,
  ...props
}: CapturButtonProps) {
  const isPrimary = variant === "primary"
  const isDestructive = variant === "destructive"

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all cursor-pointer border",
        "focus-visible:outline-none focus-visible:ring-[length:3px] focus-visible:ring-[color:var(--color-brand-teal)]/30",
        "disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      style={{
        borderRadius: "var(--radius-md)",
        ...(isPrimary && {
          backgroundColor: isLoading
            ? "var(--color-brand-teal)"
            : "var(--color-brand-teal)",
        }),
        ...(isDestructive && {
          backgroundColor: "var(--color-error)",
        }),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (isPrimary && !disabled && !isLoading) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "var(--color-brand-teal-dark)"
        }
      }}
      onMouseLeave={(e) => {
        if (isPrimary && !disabled && !isLoading) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "var(--color-brand-teal)"
        }
      }}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" style={{ width: 14, height: 14 }} />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </button>
  )
}

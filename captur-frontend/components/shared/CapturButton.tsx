"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef, CSSProperties } from "react"

type Variant = "primary" | "secondary" | "ghost" | "destructive"
type Size = "sm" | "md" | "lg"

interface CapturButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  loadingText?: string
}

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-3 text-label gap-1.5",
  md: "h-10 px-4 text-button gap-2",
  lg: "h-12 px-5 text-button text-base gap-2",
}

type VariantTokens = {
  default: CSSProperties
  hover: CSSProperties
}

const variantTokens: Record<Variant, VariantTokens> = {
  primary: {
    default: {
      backgroundColor: "var(--color-brand-teal)",
      color: "#fff",
      borderColor: "transparent",
    },
    hover: { backgroundColor: "var(--color-brand-teal-dark)" },
  },
  secondary: {
    default: {
      backgroundColor: "transparent",
      color: "var(--color-brand-teal)",
      borderColor: "var(--color-brand-teal)",
    },
    hover: { backgroundColor: "var(--color-brand-teal-bg)" },
  },
  ghost: {
    default: {
      backgroundColor: "transparent",
      color: "var(--color-text-primary)",
      borderColor: "transparent",
    },
    hover: { backgroundColor: "var(--color-surface)" },
  },
  destructive: {
    default: {
      backgroundColor: "var(--color-error)",
      color: "#fff",
      borderColor: "transparent",
    },
    hover: { backgroundColor: "var(--color-error-bg)" },
  },
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
  const tokens = variantTokens[variant]
  const isInteractive = !disabled && !isLoading

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center transition-all cursor-pointer border",
        "focus-visible:outline-none focus-visible:ring-[length:3px] focus-visible:ring-[color:var(--color-brand-teal)]/30",
        "disabled:cursor-not-allowed disabled:opacity-40",
        sizeStyles[size],
        className,
      )}
      style={{
        borderRadius: "var(--radius-md)",
        fontWeight: 500,
        ...tokens.default,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (isInteractive)
          Object.assign((e.currentTarget as HTMLElement).style, tokens.hover)
      }}
      onMouseLeave={(e) => {
        if (isInteractive)
          Object.assign(
            (e.currentTarget as HTMLElement).style,
            tokens.default,
            style ?? {},
          )
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

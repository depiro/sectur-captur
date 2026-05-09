type LogoSize = "sm" | "md" | "lg" | "xl"

const heightMap: Record<LogoSize, number> = {
  sm: 28,
  md: 36,
  lg: 48,
  xl: 64,
}

interface CapturLogoProps {
  size?: LogoSize
  className?: string
}

export function CapturLogo({ size = "md", className }: CapturLogoProps) {
  const height = heightMap[size]
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-captur.png"
      alt="Captur"
      style={{ height, width: "auto", display: "block" }}
      className={className}
    />
  )
}

export function CapturLogoInitials({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center text-label font-semibold ${className ?? ""}`}
      style={{
        width: 36,
        height: 36,
        borderRadius: "var(--radius-full)",
        backgroundColor: "var(--color-brand-teal-bg)",
        color: "var(--color-brand-teal)",
      }}
    >
      CT
    </span>
  )
}

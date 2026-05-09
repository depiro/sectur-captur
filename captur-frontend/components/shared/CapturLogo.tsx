import Image from "next/image"

type LogoSize = "sm" | "md" | "lg" | "xl"
type LogoContext = "light" | "dark"

const heightMap: Record<LogoSize, number> = {
  sm: 28,
  md: 36,
  lg: 48,
  xl: 64,
}

interface CapturLogoProps {
  size?: LogoSize
  context?: LogoContext
  className?: string
}

export function CapturLogo({
  size = "md",
  context = "light",
  className,
}: CapturLogoProps) {
  const height = heightMap[size]
  return (
    <Image
      src="/images/logo-captur.png"
      alt="Captur"
      height={height}
      width={0}
      style={{
        height,
        width: "auto",
        mixBlendMode: context === "light" ? "multiply" : undefined,
      }}
      className={className}
      priority
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

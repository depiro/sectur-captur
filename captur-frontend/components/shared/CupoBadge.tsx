type CupoEstado = "limitado" | "agotado" | "disponible"

const estadoMap: Partial<
  Record<CupoEstado, { label: string; bg: string; color: string }>
> = {
  limitado: {
    label: "Cupo limitado",
    bg: "var(--color-warning-bg)",
    color: "var(--color-warning)",
  },
  agotado: {
    label: "Cupo agotado",
    bg: "var(--color-error-bg)",
    color: "var(--color-error)",
  },
}

export function CupoBadge({ estado }: { estado: CupoEstado }) {
  const config = estadoMap[estado]
  if (!config) return null
  return (
    <span
      className="inline-flex items-center px-2 text-label"
      style={{
        height: 20,
        borderRadius: "var(--radius-sm)",
        backgroundColor: config.bg,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  )
}

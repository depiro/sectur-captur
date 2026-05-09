type CertificateEstado = "disponible" | "encuesta-pendiente" | "no-disponible"

const estadoMap: Partial<
  Record<CertificateEstado, { label: string; bg: string; color: string }>
> = {
  disponible: {
    label: "Certificado disponible",
    bg: "var(--color-brand-lime-bg)",
    color: "var(--color-brand-lime)",
  },
  "encuesta-pendiente": {
    label: "Encuesta pendiente",
    bg: "var(--color-warning-bg)",
    color: "var(--color-warning)",
  },
}

export function CertificateBadge({ estado }: { estado: CertificateEstado }) {
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

import type { EnrollmentState } from "@/types/enrollment"

const stateMap: Record<
  EnrollmentState,
  { label: string; bg: string; color: string }
> = {
  pendiente: {
    label: "Pendiente",
    bg: "var(--color-warning-bg)",
    color: "var(--color-warning)",
  },
  aprobada: {
    label: "Aprobada",
    bg: "var(--color-success-bg)",
    color: "var(--color-success)",
  },
  rechazada: {
    label: "Rechazada",
    bg: "var(--color-error-bg)",
    color: "var(--color-error)",
  },
}

export function EnrollmentStatusBadge({ state }: { state: EnrollmentState }) {
  const config = stateMap[state]
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

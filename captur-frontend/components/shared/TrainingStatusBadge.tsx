import type { TrainingStatus } from "@/types/training"

const statusMap: Record<
  TrainingStatus,
  { label: string; bg: string; color: string }
> = {
  draft: {
    label: "Borrador",
    bg: "var(--color-border)",
    color: "var(--color-text-secondary)",
  },
  published: {
    label: "Publicada",
    bg: "var(--color-success-bg)",
    color: "var(--color-success)",
  },
  in_progress: {
    label: "En curso",
    bg: "var(--color-brand-teal-bg)",
    color: "var(--color-brand-teal)",
  },
  completed: {
    label: "Finalizada",
    bg: "var(--color-info-bg)",
    color: "var(--color-info)",
  },
  cancelled: {
    label: "Cancelada",
    bg: "var(--color-error-bg)",
    color: "var(--color-error)",
  },
}

export function TrainingStatusBadge({ status }: { status: TrainingStatus }) {
  const config = statusMap[status]
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

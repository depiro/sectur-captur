import type { TrainingModalitySlug } from "@/types/training"

const slugMap: Partial<
  Record<TrainingModalitySlug, { label: string; bg: string; color: string }>
> = {
  presencial: {
    label: "Presencial",
    bg: "var(--color-info-bg)",
    color: "var(--color-info)",
  },
  "virtual-sincronica": {
    label: "Virtual Sincrónica",
    bg: "var(--color-brand-teal-bg)",
    color: "var(--color-brand-teal)",
  },
  "virtual-asincronica": {
    label: "Virtual Asincrónica",
    bg: "var(--color-brand-purple-bg)",
    color: "var(--color-brand-purple)",
  },
  virtual: {
    label: "Virtual",
    bg: "var(--color-brand-teal-bg)",
    color: "var(--color-brand-teal)",
  },
  hibrida: {
    label: "Híbrida",
    bg: "var(--color-brand-orange-bg)",
    color: "var(--color-brand-orange)",
  },
  mixta: {
    label: "Mixta",
    bg: "var(--color-brand-orange-bg)",
    color: "var(--color-brand-orange)",
  },
}

interface Props {
  slug: string
  name: string
}

export function TrainingModalityBadge({ slug, name }: Props) {
  const config = slugMap[slug as TrainingModalitySlug]
  return (
    <span
      className="inline-flex items-center px-2 text-label"
      style={{
        height: 20,
        borderRadius: "var(--radius-sm)",
        backgroundColor: config?.bg ?? "var(--color-border)",
        color: config?.color ?? "var(--color-text-secondary)",
      }}
    >
      {config?.label ?? name}
    </span>
  )
}

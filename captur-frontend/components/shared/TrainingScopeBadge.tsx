import type { TrainingScopeSlug } from "@/types/training"

const scopeMap: Record<
  TrainingScopeSlug,
  { label: string; bg: string; color: string }
> = {
  interno: {
    label: "Interno",
    bg: "var(--color-info-bg)",
    color: "var(--color-info)",
  },
  externo: {
    label: "Externo",
    bg: "var(--color-brand-purple-bg)",
    color: "var(--color-brand-purple)",
  },
  articulacion: {
    label: "Articulación Institucional",
    bg: "var(--color-brand-lime-bg)",
    color: "var(--color-brand-lime)",
  },
}

export function TrainingScopeBadge({ slug }: { slug: TrainingScopeSlug }) {
  const config = scopeMap[slug]
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

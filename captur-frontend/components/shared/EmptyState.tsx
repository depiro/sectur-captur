import type { LucideIcon } from "lucide-react"
import { CapturButton } from "./CapturButton"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon
        style={{ width: 48, height: 48, color: "var(--color-text-secondary)" }}
        className="mb-4"
      />
      <h3 className="text-heading-4 mb-1" style={{ color: "var(--color-text-primary)" }}>
        {title}
      </h3>
      {description && (
        <p className="text-body-md mb-6 max-w-sm" style={{ color: "var(--color-text-secondary)" }}>
          {description}
        </p>
      )}
      {action && (
        <CapturButton variant="primary" size="md" onClick={action.onClick}>
          {action.label}
        </CapturButton>
      )}
    </div>
  )
}

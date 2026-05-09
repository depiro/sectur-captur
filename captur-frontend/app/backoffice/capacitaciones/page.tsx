"use client"

import { useRouter } from "next/navigation"
import { BookOpen, Plus } from "lucide-react"
import { CapturButton } from "@/components/shared/CapturButton"
import { EmptyState } from "@/components/shared/EmptyState"

export default function CapacitacionesPage() {
  const router = useRouter()

  return (
    <div style={{ padding: "28px 32px" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-heading-2" style={{ color: "var(--color-text-primary)" }}>
          Capacitaciones
        </h1>
        <CapturButton
          variant="primary"
          size="sm"
          onClick={() => router.push("/backoffice/capacitaciones/nueva")}
        >
          <Plus size={14} />
          Nueva capacitación
        </CapturButton>
      </div>
      <EmptyState
        icon={BookOpen}
        title="No hay capacitaciones"
        description="Creá la primera capacitación para comenzar."
        action={{
          label: "Nueva capacitación",
          onClick: () => router.push("/backoffice/capacitaciones/nueva"),
        }}
      />
    </div>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { ClipboardList, Plus } from "lucide-react"
import { CapturButton } from "@/components/shared/CapturButton"
import { EmptyState } from "@/components/shared/EmptyState"

export default function InscripcionesCapacitacionPage() {
  const router = useRouter()

  return (
    <div style={{ padding: "28px 32px" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-heading-2" style={{ color: "var(--color-text-primary)" }}>
          Inscripciones
        </h1>
        <CapturButton
          variant="primary"
          size="sm"
          onClick={() => router.push("/backoffice/capacitaciones")}
        >
          <Plus size={14} />
          Nueva inscripción
        </CapturButton>
      </div>
      <EmptyState
        icon={ClipboardList}
        title="Sin inscripciones"
        description="Todavía no hay inscripciones para esta capacitación."
        action={{
          label: "Nueva inscripción",
          onClick: () => router.push("/backoffice/capacitaciones"),
        }}
      />
    </div>
  )
}

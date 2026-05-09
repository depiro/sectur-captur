"use client"

import { useRouter } from "next/navigation"
import { GraduationCap, Plus } from "lucide-react"
import { CapturButton } from "@/components/shared/CapturButton"
import { EmptyState } from "@/components/shared/EmptyState"

export default function CapacitadoresPage() {
  const router = useRouter()

  return (
    <div style={{ padding: "28px 32px" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-heading-2" style={{ color: "var(--color-text-primary)" }}>
          Capacitadores
        </h1>
        <CapturButton
          variant="primary"
          size="sm"
          onClick={() => router.push("/backoffice/capacitadores/nuevo")}
        >
          <Plus size={14} />
          Nuevo capacitador
        </CapturButton>
      </div>
      <EmptyState
        icon={GraduationCap}
        title="No hay capacitadores registrados"
      />
    </div>
  )
}

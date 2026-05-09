"use client"

import { useRouter } from "next/navigation"
import { Building2, Plus } from "lucide-react"
import { CapturButton } from "@/components/shared/CapturButton"
import { EmptyState } from "@/components/shared/EmptyState"

export default function OrganizadoresPage() {
  const router = useRouter()

  return (
    <div style={{ padding: "28px 32px" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-heading-2" style={{ color: "var(--color-text-primary)" }}>
          Organizadores
        </h1>
        <CapturButton
          variant="primary"
          size="sm"
          onClick={() => router.push("/backoffice/configuracion/organizadores/nuevo")}
        >
          <Plus size={14} />
          Nuevo organizador
        </CapturButton>
      </div>
      <EmptyState
        icon={Building2}
        title="No hay organizadores"
      />
    </div>
  )
}

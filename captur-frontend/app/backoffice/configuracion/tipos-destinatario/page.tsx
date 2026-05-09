"use client"

import { useRouter } from "next/navigation"
import { Users, Plus } from "lucide-react"
import { CapturButton } from "@/components/shared/CapturButton"
import { EmptyState } from "@/components/shared/EmptyState"

export default function TiposDestinatarioPage() {
  const router = useRouter()

  return (
    <div style={{ padding: "28px 32px" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-heading-2" style={{ color: "var(--color-text-primary)" }}>
          Tipos de destinatario
        </h1>
        <CapturButton
          variant="primary"
          size="sm"
          onClick={() => router.push("/backoffice/configuracion/tipos-destinatario/nuevo")}
        >
          <Plus size={14} />
          Nuevo tipo
        </CapturButton>
      </div>
      <EmptyState
        icon={Users}
        title="No hay tipos de destinatario"
      />
    </div>
  )
}

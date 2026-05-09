"use client"

import { useRouter } from "next/navigation"
import { Landmark, Plus } from "lucide-react"
import { CapturButton } from "@/components/shared/CapturButton"
import { EmptyState } from "@/components/shared/EmptyState"

export default function AmbitosPage() {
  const router = useRouter()

  return (
    <div style={{ padding: "28px 32px" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-heading-2" style={{ color: "var(--color-text-primary)" }}>
          Ámbitos
        </h1>
        <CapturButton
          variant="primary"
          size="sm"
          onClick={() => router.push("/backoffice/configuracion/ambitos/nuevo")}
        >
          <Plus size={14} />
          Nuevo ámbito
        </CapturButton>
      </div>
      <EmptyState
        icon={Landmark}
        title="No hay ámbitos configurados"
      />
    </div>
  )
}

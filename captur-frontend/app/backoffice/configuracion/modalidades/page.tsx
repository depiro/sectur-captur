"use client"

import { useRouter } from "next/navigation"
import { Sliders, Plus } from "lucide-react"
import { CapturButton } from "@/components/shared/CapturButton"
import { EmptyState } from "@/components/shared/EmptyState"

export default function ModalidadesPage() {
  const router = useRouter()

  return (
    <div style={{ padding: "28px 32px" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-heading-2" style={{ color: "var(--color-text-primary)" }}>
          Modalidades
        </h1>
        <CapturButton
          variant="primary"
          size="sm"
          onClick={() => router.push("/backoffice/configuracion/modalidades/nueva")}
        >
          <Plus size={14} />
          Nueva modalidad
        </CapturButton>
      </div>
      <EmptyState
        icon={Sliders}
        title="No hay modalidades configuradas"
      />
    </div>
  )
}

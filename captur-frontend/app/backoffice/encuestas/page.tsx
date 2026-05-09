"use client"

import { useRouter } from "next/navigation"
import { ClipboardList, Plus } from "lucide-react"
import { CapturButton } from "@/components/shared/CapturButton"
import { EmptyState } from "@/components/shared/EmptyState"

export default function EncuestasPage() {
  const router = useRouter()

  return (
    <div style={{ padding: "28px 32px" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-heading-2" style={{ color: "var(--color-text-primary)" }}>
          Encuestas
        </h1>
        <CapturButton
          variant="primary"
          size="sm"
          onClick={() => router.push("/backoffice/encuestas/nueva")}
        >
          <Plus size={14} />
          Nueva encuesta
        </CapturButton>
      </div>
      <EmptyState
        icon={ClipboardList}
        title="No hay encuestas"
      />
    </div>
  )
}

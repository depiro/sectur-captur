"use client"

import { useRouter } from "next/navigation"
import { HelpCircle, Plus } from "lucide-react"
import { CapturButton } from "@/components/shared/CapturButton"
import { EmptyState } from "@/components/shared/EmptyState"

export default function PreguntasFrecuentesPage() {
  const router = useRouter()

  return (
    <div style={{ padding: "28px 32px" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-heading-2" style={{ color: "var(--color-text-primary)" }}>
          Preguntas frecuentes
        </h1>
        <CapturButton
          variant="primary"
          size="sm"
          onClick={() => router.push("/backoffice/preguntas-frecuentes/nueva")}
        >
          <Plus size={14} />
          Nueva pregunta
        </CapturButton>
      </div>
      <EmptyState
        icon={HelpCircle}
        title="No hay preguntas frecuentes"
      />
    </div>
  )
}

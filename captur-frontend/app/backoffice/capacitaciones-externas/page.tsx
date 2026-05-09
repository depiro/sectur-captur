"use client"

import { useRouter } from "next/navigation"
import { Globe, Plus } from "lucide-react"
import { CapturButton } from "@/components/shared/CapturButton"
import { EmptyState } from "@/components/shared/EmptyState"

export default function CapacitacionesExternasPage() {
  const router = useRouter()

  return (
    <div style={{ padding: "28px 32px" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-heading-2" style={{ color: "var(--color-text-primary)" }}>
          Capacitaciones externas
        </h1>
        <CapturButton
          variant="primary"
          size="sm"
          onClick={() => router.push("/backoffice/capacitaciones-externas/nueva")}
        >
          <Plus size={14} />
          Nueva capacitación externa
        </CapturButton>
      </div>
      <EmptyState
        icon={Globe}
        title="No hay capacitaciones externas"
      />
    </div>
  )
}

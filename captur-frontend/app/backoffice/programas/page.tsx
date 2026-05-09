"use client"

import { useRouter } from "next/navigation"
import { Tag, Plus } from "lucide-react"
import { CapturButton } from "@/components/shared/CapturButton"
import { EmptyState } from "@/components/shared/EmptyState"

export default function ProgramasPage() {
  const router = useRouter()

  return (
    <div style={{ padding: "28px 32px" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-heading-2" style={{ color: "var(--color-text-primary)" }}>
          Programas
        </h1>
        <CapturButton
          variant="primary"
          size="sm"
          onClick={() => router.push("/backoffice/programas/nuevo")}
        >
          <Plus size={14} />
          Nuevo programa
        </CapturButton>
      </div>
      <EmptyState
        icon={Tag}
        title="No hay programas"
      />
    </div>
  )
}

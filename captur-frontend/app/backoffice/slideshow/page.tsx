"use client"

import { useRouter } from "next/navigation"
import { Images, Plus } from "lucide-react"
import { CapturButton } from "@/components/shared/CapturButton"
import { EmptyState } from "@/components/shared/EmptyState"

export default function SlideshowPage() {
  const router = useRouter()

  return (
    <div style={{ padding: "28px 32px" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-heading-2" style={{ color: "var(--color-text-primary)" }}>
          Slideshow
        </h1>
        <CapturButton
          variant="primary"
          size="sm"
          onClick={() => router.push("/backoffice/slideshow/nueva")}
        >
          <Plus size={14} />
          Agregar imagen
        </CapturButton>
      </div>
      <EmptyState
        icon={Images}
        title="No hay imágenes en el slideshow"
      />
    </div>
  )
}

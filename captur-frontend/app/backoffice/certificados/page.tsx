import { FileCheck2 } from "lucide-react"
import { EmptyState } from "@/components/shared/EmptyState"

export default function CertificadosPage() {
  return (
    <div style={{ padding: "28px 32px" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-heading-2" style={{ color: "var(--color-text-primary)" }}>
          Certificados
        </h1>
      </div>
      <EmptyState
        icon={FileCheck2}
        title="No hay certificados generados"
      />
    </div>
  )
}

import { BarChart2 } from "lucide-react"
import { EmptyState } from "@/components/shared/EmptyState"

export default function ReportesPage() {
  return (
    <div style={{ padding: "28px 32px" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-heading-2" style={{ color: "var(--color-text-primary)" }}>
          Reportes
        </h1>
      </div>
      <EmptyState
        icon={BarChart2}
        title="No hay reportes disponibles"
        description="Los reportes se generarán a medida que haya actividad en el sistema."
      />
    </div>
  )
}

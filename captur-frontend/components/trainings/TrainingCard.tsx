import Image from "next/image"
import { MapPin, CalendarDays, Clock, Users, GraduationCap } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { TrainingModalityBadge } from "@/components/shared/TrainingModalityBadge"
import { CupoBadge } from "@/components/shared/CupoBadge"
import { CapturButton } from "@/components/shared/CapturButton"

interface TrainingCardProps {
  id: number
  title: string
  programs: Array<{ name: string }>
  trainers: Array<{ firstName: string; lastName: string }>
  trainingModalities: Array<{ name: string; slug: string }>
  hs: number | null
  startDate: Date | null
  locality: { name: string } | null
  capacity: number | null
  enrollmentsCount: number
  isRegistrationEnabled: boolean
  image: string | null
  onVerDetalle: (id: number) => void
  onInscribirse: (id: number) => void
}

function getCupoEstado(capacity: number | null, enrollmentsCount: number) {
  if (capacity === null) return null
  if (enrollmentsCount >= capacity) return "agotado" as const
  if (enrollmentsCount / capacity >= 0.8) return "limitado" as const
  return "disponible" as const
}

function formatStartDate(date: Date | null): string {
  if (!date) return "Fecha a confirmar"
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: es })
}

export function TrainingCard({
  id,
  title,
  programs,
  trainingModalities,
  hs,
  startDate,
  locality,
  capacity,
  enrollmentsCount,
  isRegistrationEnabled,
  image,
  onVerDetalle,
  onInscribirse,
}: TrainingCardProps) {
  const modality = trainingModalities[0]
  const programName = programs[0]?.name
  const cupoEstado = getCupoEstado(capacity, enrollmentsCount)

  return (
    <article
      className="flex flex-col overflow-hidden border transition-all duration-150 ease-out"
      style={{
        borderRadius: "var(--radius-lg)",
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-background)",
        boxShadow: "var(--shadow-sm)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = "var(--shadow-md)"
        el.style.transform = "translateY(-2px)"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = "var(--shadow-sm)"
        el.style.transform = "translateY(0)"
      }}
    >
      {/* Thumb */}
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ height: 160 }}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2"
            style={{ backgroundColor: "var(--color-brand-teal-bg)" }}
          >
            <GraduationCap
              style={{ color: "var(--color-brand-teal)", opacity: 0.5 }}
              size={32}
            />
            {programName && (
              <span
                className="text-body-sm px-4 text-center line-clamp-2"
                style={{ color: "var(--color-brand-teal)", opacity: 0.7 }}
              >
                {programName}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* 1. Title */}
        <h3
          className="text-heading-4 line-clamp-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h3>

        {/* 2. Program */}
        {programName && (
          <p
            className="text-body-sm -mt-1"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {programName}
          </p>
        )}

        {/* 3. Modality badge */}
        {modality && (
          <div>
            <TrainingModalityBadge slug={modality.slug} name={modality.name} />
          </div>
        )}

        {/* 4. Metadata */}
        <div className="flex flex-col gap-1.5">
          {locality && (
            <MetaRow icon={MapPin} text={locality.name} />
          )}
          <MetaRow
            icon={CalendarDays}
            text={formatStartDate(startDate)}
          />
          {hs !== null && (
            <MetaRow icon={Clock} text={`${hs} hs`} />
          )}
          {cupoEstado === "agotado" || cupoEstado === "limitado" ? (
            <div className="flex items-center gap-1.5">
              <CupoBadge estado={cupoEstado} />
            </div>
          ) : cupoEstado === "disponible" && capacity !== null ? (
            <MetaRow
              icon={Users}
              text={`${capacity - enrollmentsCount} de ${capacity} cupos disponibles`}
            />
          ) : null}
        </div>

        {/* Divider */}
        <div
          className="mt-auto border-t pt-3"
          style={{ borderColor: "var(--color-border)" }}
        >
          {/* 5. Actions */}
          <div className="flex items-center gap-3">
            {isRegistrationEnabled && cupoEstado !== "agotado" ? (
              <CapturButton
                variant="primary"
                size="sm"
                onClick={() => onInscribirse(id)}
              >
                Inscribirse
              </CapturButton>
            ) : (
              <span
                className="text-body-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Inscripción cerrada
              </span>
            )}
            <button
              onClick={() => onVerDetalle(id)}
              className="text-body-sm ml-auto transition-colors"
              style={{ color: "var(--color-brand-teal)" }}
            >
              Ver detalle →
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function MetaRow({
  icon: Icon,
  text,
}: {
  icon: React.ElementType
  text: string
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon
        size={14}
        style={{ color: "var(--color-text-secondary)", flexShrink: 0 }}
      />
      <span className="text-body-sm" style={{ color: "var(--color-text-secondary)" }}>
        {text}
      </span>
    </div>
  )
}

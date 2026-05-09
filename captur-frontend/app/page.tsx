"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { BookOpen, Trash2, Eye } from "lucide-react"
import { toast } from "sonner"

// Layout
import { UIKitSidebar } from "@/components/layout/UIKitSidebar"
import { PublicHeader } from "@/components/layout/PublicHeader"
import { BackofficeSidebar } from "@/components/layout/BackofficeSidebar"

// Shared
import { CapturLogo, CapturLogoInitials } from "@/components/shared/CapturLogo"
import { CapturButton } from "@/components/shared/CapturButton"
import { CapturDatePicker } from "@/components/shared/CapturDatePicker"
import { CapturFileUpload } from "@/components/shared/CapturFileUpload"
import { CapturMultiSelect } from "@/components/shared/CapturMultiSelect"
import { CapturStepper } from "@/components/shared/CapturStepper"
import { CapturTabs, CapturTabPanel } from "@/components/shared/CapturTabs"
import { CapturTableFilters } from "@/components/shared/CapturTableFilters"
import { CapturPagination } from "@/components/shared/CapturPagination"
import { EmptyState } from "@/components/shared/EmptyState"

// Badges
import { TrainingStatusBadge } from "@/components/shared/TrainingStatusBadge"
import { TrainingModalityBadge } from "@/components/shared/TrainingModalityBadge"
import { TrainingScopeBadge } from "@/components/shared/TrainingScopeBadge"
import { EnrollmentStatusBadge } from "@/components/shared/EnrollmentStatusBadge"
import { CertificateBadge } from "@/components/shared/CertificateBadge"
import { CupoBadge } from "@/components/shared/CupoBadge"
import { NuevoBadge } from "@/components/shared/NuevoBadge"

// Trainings
import { TrainingCard } from "@/components/trainings/TrainingCard"
import { TrainingCardSkeleton } from "@/components/trainings/TrainingCardSkeleton"

// shadcn UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ─── Constants ────────────────────────────────────────────────────────────────

const REGION_OPTIONS = [
  { value: "jujuy", label: "Jujuy" },
  { value: "salta", label: "Salta" },
  { value: "tucuman", label: "Tucumán" },
  { value: "catamarca", label: "Catamarca" },
  { value: "la-rioja", label: "La Rioja" },
]

const STEPPER_STEPS = [
  { label: "Datos personales", description: "Paso 1" },
  { label: "Capacitación", description: "Paso 2" },
  { label: "Confirmación", description: "Paso 3" },
]

const SAMPLE_BENEFICIARIOS = [
  { id: 1, nombre: "Ana Torres", email: "ana.torres@email.com", modalidad: "Presencial", estado: "aprobada" as const },
  { id: 2, nombre: "Carlos Ramírez", email: "c.ramirez@email.com", modalidad: "Virtual sincrónica", estado: "pendiente" as const },
  { id: 3, nombre: "María González", email: "maria.g@email.com", modalidad: "Virtual asincrónica", estado: "aprobada" as const },
  { id: 4, nombre: "Diego López", email: "d.lopez@email.com", modalidad: "Presencial", estado: "rechazada" as const },
  { id: 5, nombre: "Lucía Paz", email: "lucia.paz@email.com", modalidad: "Híbrida", estado: "aprobada" as const },
]

const FORM_SCHEMA = z.object({
  nombre: z.string().min(2, "Ingresá al menos 2 caracteres"),
  email: z.string().email("Ingresá un email válido"),
  modalidad: z.string().min(1, "Seleccioná una modalidad"),
  descripcion: z.string().optional(),
  terminos: z.boolean().refine((v) => v === true, "Debés aceptar los términos"),
})
type FormValues = z.infer<typeof FORM_SCHEMA>

// ─── Main page ────────────────────────────────────────────────────────────────

export default function UIKitPage() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--color-surface)" }}>
      <UIKitSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[960px] px-6 py-12 space-y-16">

          {/* ── Logo ──────────────────────────────────────────── */}
          <Section id="logo" title="Logo">
            <div className="flex flex-wrap items-end gap-8">
              {(["sm", "md", "lg", "xl"] as const).map((size) => (
                <div key={size} className="flex flex-col items-start gap-2">
                  <CapturLogo size={size} />
                  <span className="text-label" style={{ color: "var(--color-text-secondary)" }}>
                    size="{size}"
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-4">
              <CapturLogoInitials />
              <span className="text-body-sm" style={{ color: "var(--color-text-secondary)" }}>
                CapturLogoInitials — avatar 36×36 px
              </span>
            </div>
          </Section>

          {/* ── Colores ───────────────────────────────────────── */}
          <Section id="colores" title="Paleta de colores">
            <div className="flex flex-wrap gap-3">
              {[
                ["var(--color-brand-teal)", "Teal"],
                ["var(--color-brand-orange)", "Orange"],
                ["var(--color-brand-purple)", "Purple"],
                ["var(--color-brand-lime)", "Lime"],
                ["var(--color-success)", "Success"],
                ["var(--color-error)", "Error"],
                ["var(--color-warning)", "Warning"],
                ["var(--color-info)", "Info"],
              ].map(([color, label]) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div
                    className="rounded-md border"
                    style={{
                      width: 56,
                      height: 56,
                      backgroundColor: color,
                      borderColor: "var(--color-border)",
                    }}
                  />
                  <span className="text-label" style={{ color: "var(--color-text-secondary)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Tipografía ────────────────────────────────────── */}
          <Section id="tipografia" title="Escala tipográfica">
            <div className="space-y-3">
              {(
                [
                  ["text-display", "Display — 3rem 700"],
                  ["text-heading-1", "Heading 1 — 2.25rem 700"],
                  ["text-heading-2", "Heading 2 — 1.75rem 600"],
                  ["text-heading-3", "Heading 3 — 1.375rem 600"],
                  ["text-heading-4", "Heading 4 — 1.125rem 600"],
                  ["text-body-lg", "Body Large — 1rem 400"],
                  ["text-body-md", "Body Medium — 0.875rem 400"],
                  ["text-body-sm", "Body Small — 0.75rem 400"],
                  ["text-label", "Label — 0.75rem 500"],
                  ["text-button", "Button — 0.875rem 500"],
                ] as [string, string][]
              ).map(([cls, label]) => (
                <p key={cls} className={cls} style={{ color: "var(--color-text-primary)" }}>
                  {label}
                </p>
              ))}
            </div>
          </Section>

          {/* ── Botones ───────────────────────────────────────── */}
          <Section id="botones" title="Botones">
            <div className="space-y-6">
              <div>
                <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
                  Variantes
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <CapturButton variant="primary">Primario</CapturButton>
                  <CapturButton variant="secondary">Secundario</CapturButton>
                  <CapturButton variant="ghost">Ghost</CapturButton>
                  <CapturButton variant="destructive">Destructivo</CapturButton>
                  <CapturButton variant="primary" isLoading loadingText="Guardando...">
                    Guardar
                  </CapturButton>
                  <CapturButton variant="primary" disabled>
                    Deshabilitado
                  </CapturButton>
                </div>
              </div>
              <div>
                <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
                  Tamaños
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <CapturButton variant="primary" size="sm">Small</CapturButton>
                  <CapturButton variant="primary" size="md">Medium</CapturButton>
                  <CapturButton variant="primary" size="lg">Large</CapturButton>
                </div>
              </div>
            </div>
          </Section>

          {/* ── Formularios ──────────────────────────────────── */}
          <FormShowcase />

          {/* ── MultiSelect y controles avanzados ────────────── */}
          <MultiSelectShowcase />

          {/* ── Badges y etiquetas ───────────────────────────── */}
          <Section id="badges" title="Badges y etiquetas">
            <div className="space-y-6">
              <div>
                <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
                  Estado de capacitación
                </p>
                <div className="flex flex-wrap gap-3">
                  <TrainingStatusBadge status="draft" />
                  <TrainingStatusBadge status="published" />
                  <TrainingStatusBadge status="in_progress" />
                  <TrainingStatusBadge status="completed" />
                  <TrainingStatusBadge status="cancelled" />
                </div>
              </div>
              <div>
                <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
                  Modalidad
                </p>
                <div className="flex flex-wrap gap-3">
                  <TrainingModalityBadge slug="presencial" name="Presencial" />
                  <TrainingModalityBadge slug="virtual-sincronica" name="Virtual Sincrónica" />
                  <TrainingModalityBadge slug="virtual-asincronica" name="Virtual Asincrónica" />
                  <TrainingModalityBadge slug="virtual" name="Virtual" />
                  <TrainingModalityBadge slug="hibrida" name="Híbrida" />
                  <TrainingModalityBadge slug="mixta" name="Mixta" />
                </div>
              </div>
              <div>
                <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
                  Scope · Inscripción · Certificado · Cupo · Nuevo
                </p>
                <div className="flex flex-wrap gap-3">
                  <TrainingScopeBadge slug="interno" />
                  <TrainingScopeBadge slug="externo" />
                  <TrainingScopeBadge slug="articulacion" />
                  <EnrollmentStatusBadge state="pendiente" />
                  <EnrollmentStatusBadge state="aprobada" />
                  <EnrollmentStatusBadge state="rechazada" />
                  <CertificateBadge estado="disponible" />
                  <CertificateBadge estado="encuesta-pendiente" />
                  <CupoBadge estado="limitado" />
                  <CupoBadge estado="agotado" />
                  <NuevoBadge />
                </div>
              </div>
            </div>
          </Section>

          {/* ── Toasts y feedback ────────────────────────────── */}
          <Section id="toasts" title="Toasts y feedback">
            <div className="flex flex-wrap gap-3">
              <CapturButton
                variant="primary"
                size="sm"
                onClick={() => toast.success("Cambios guardados correctamente.")}
              >
                Toast éxito
              </CapturButton>
              <CapturButton
                variant="destructive"
                size="sm"
                onClick={() => toast.error("No se pudo procesar la solicitud. Intentá de nuevo.")}
              >
                Toast error
              </CapturButton>
              <CapturButton
                variant="secondary"
                size="sm"
                onClick={() => toast.warning("Los cambios no se han guardado todavía.")}
              >
                Toast advertencia
              </CapturButton>
              <CapturButton
                variant="ghost"
                size="sm"
                onClick={() => toast.info("Tu sesión expirará en 5 minutos.")}
              >
                Toast info
              </CapturButton>
            </div>
          </Section>

          {/* ── Estados de carga ─────────────────────────────── */}
          <Section id="estados-carga" title="Estados de carga">
            <div className="space-y-6">
              <div>
                <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
                  Skeleton de tarjeta
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <TrainingCardSkeleton />
                  <TrainingCardSkeleton />
                  <TrainingCardSkeleton />
                </div>
              </div>
              <div>
                <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
                  Botones con estado de carga
                </p>
                <div className="flex flex-wrap gap-3">
                  <CapturButton variant="primary" isLoading loadingText="Guardando...">
                    Guardar
                  </CapturButton>
                  <CapturButton variant="secondary" isLoading loadingText="Enviando...">
                    Enviar
                  </CapturButton>
                  <CapturButton variant="destructive" isLoading loadingText="Eliminando...">
                    Eliminar
                  </CapturButton>
                </div>
              </div>
            </div>
          </Section>

          {/* ── Estados vacíos ───────────────────────────────── */}
          <Section id="estados-vacios" title="Estados vacíos">
            <div
              className="border rounded-lg overflow-hidden"
              style={{ borderColor: "var(--color-border)" }}
            >
              <EmptyState
                icon={BookOpen}
                title="Sin capacitaciones disponibles"
                description="Actualmente no hay capacitaciones publicadas. Revisá más tarde."
                action={{ label: "Volver al inicio", onClick: () => {} }}
              />
            </div>
          </Section>

          {/* ── Dialogs ──────────────────────────────────────── */}
          <DialogsShowcase />

          {/* ── Card de capacitación ─────────────────────────── */}
          <Section id="card-capacitacion" title="Card de capacitación">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <TrainingCard
                id={1}
                title="Gestión de Destinos Turísticos Sustentables"
                programs={[{ name: "Programa de Formación Turística" }]}
                trainers={[{ firstName: "María", lastName: "González" }]}
                trainingModalities={[{ name: "Presencial", slug: "presencial" }]}
                hs={16}
                startDate={new Date("2026-06-15")}
                locality={{ name: "San Salvador de Jujuy" }}
                capacity={30}
                enrollmentsCount={8}
                isRegistrationEnabled={true}
                image={null}
                onVerDetalle={() => {}}
                onInscribirse={() => {}}
              />
              <TrainingCard
                id={2}
                title="Atención al Turista Internacional"
                programs={[{ name: "Inglés para el Turismo" }]}
                trainers={[{ firstName: "Carlos", lastName: "Ramos" }]}
                trainingModalities={[{ name: "Virtual Sincrónica", slug: "virtual-sincronica" }]}
                hs={8}
                startDate={new Date("2026-07-01")}
                locality={{ name: "Purmamarca" }}
                capacity={20}
                enrollmentsCount={17}
                isRegistrationEnabled={true}
                image={null}
                onVerDetalle={() => {}}
                onInscribirse={() => {}}
              />
              <TrainingCard
                id={3}
                title="Circuitos Ecoturísticos en la Puna Jujeña"
                programs={[{ name: "Ecoturismo" }]}
                trainers={[{ firstName: "Ana", lastName: "Torres" }]}
                trainingModalities={[{ name: "Híbrida", slug: "hibrida" }]}
                hs={24}
                startDate={null}
                locality={null}
                capacity={15}
                enrollmentsCount={15}
                isRegistrationEnabled={false}
                image={null}
                onVerDetalle={() => {}}
                onInscribirse={() => {}}
              />
            </div>
          </Section>

          {/* ── Header público ───────────────────────────────── */}
          <Section id="header-publico" title="Header público">
            <div
              className="overflow-hidden rounded-lg border"
              style={{ borderColor: "var(--color-border)" }}
            >
              <PublicHeader />
            </div>
          </Section>

          {/* ── Sidebar backoffice ───────────────────────────── */}
          <SidebarShowcase />

          {/* ── Tablas ───────────────────────────────────────── */}
          <TableShowcase />

        </div>
      </main>
    </div>
  )
}

// ─── Showcase components ──────────────────────────────────────────────────────

function MultiSelectShowcase() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [regions, setRegions] = useState<string[]>([])
  const [stepperStep, setStepperStep] = useState(0)

  return (
    <Section id="multiselect" title="MultiSelect y controles avanzados">
      <div className="space-y-8">
        <div>
          <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
            CapturStepper
          </p>
          <div className="space-y-4">
            <CapturStepper steps={STEPPER_STEPS} currentStep={stepperStep} />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStepperStep((s) => Math.max(0, s - 1))}
                disabled={stepperStep === 0}
                className="text-body-sm px-3 py-1.5 rounded border transition-colors disabled:opacity-40"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-primary)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={() => setStepperStep((s) => Math.min(STEPPER_STEPS.length - 1, s + 1))}
                disabled={stepperStep === STEPPER_STEPS.length - 1}
                className="text-body-sm px-3 py-1.5 rounded border transition-colors disabled:opacity-40"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-primary)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                Siguiente →
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
          <div>
            <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
              CapturDatePicker
            </p>
            <CapturDatePicker
              label="Fecha de inicio"
              value={date}
              onChange={setDate}
              required
            />
            {date && (
              <p className="mt-2 text-body-sm" style={{ color: "var(--color-text-secondary)" }}>
                {date.toLocaleDateString("es-AR")}
              </p>
            )}
          </div>
          <div>
            <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
              Con error
            </p>
            <CapturDatePicker
              label="Fecha requerida"
              value={undefined}
              onChange={() => {}}
              error="La fecha es obligatoria"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
          <div>
            <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
              CapturMultiSelect
            </p>
            <CapturMultiSelect
              label="Provincias"
              options={REGION_OPTIONS}
              value={regions}
              onChange={setRegions}
              placeholder="Seleccionar provincias..."
            />
            {regions.length > 0 && (
              <p className="mt-2 text-body-sm" style={{ color: "var(--color-text-secondary)" }}>
                {regions.join(", ")}
              </p>
            )}
          </div>
          <div>
            <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
              Con error
            </p>
            <CapturMultiSelect
              label="Con error"
              options={REGION_OPTIONS}
              value={[]}
              onChange={() => {}}
              error="Seleccioná al menos una opción"
            />
          </div>
        </div>

        <div>
          <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
            CapturFileUpload
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CapturFileUpload
              label="Documentación"
              hint="PDF · máx. 5 MB"
              accept=".pdf"
              maxSizeMB={5}
              onChange={() => {}}
            />
            <CapturFileUpload
              label="Múltiples archivos"
              hint="PDF, JPG, PNG"
              accept=".pdf,.jpg,.png"
              multiple
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </Section>
  )
}

function SidebarShowcase() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Section id="sidebar-backoffice" title="Sidebar backoffice">
      <div
        className="flex overflow-hidden rounded-lg border"
        style={{ height: 360, borderColor: "var(--color-border)" }}
      >
        <BackofficeSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          activeItem="/backoffice"
        />
        <div
          className="flex flex-1 items-center justify-center"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <p className="text-body-sm" style={{ color: "var(--color-text-secondary)" }}>
            Área de contenido del backoffice
          </p>
        </div>
      </div>
      <p className="mt-2 text-body-sm" style={{ color: "var(--color-text-secondary)" }}>
        Hacé clic en la flecha para colapsar / expandir el sidebar.
      </p>
    </Section>
  )
}

function DialogsShowcase() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  return (
    <Section id="dialogs" title="Dialogs">
      <div className="flex flex-wrap gap-3">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger
            className="inline-flex h-9 items-center justify-center rounded-md px-4 text-button font-medium transition-colors"
            style={{ backgroundColor: "var(--color-brand-teal)", color: "#fff" }}
          >
            Abrir dialog
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Editar capacitación</DialogTitle>
              <DialogDescription>
                Modificá los datos de la capacitación. Los cambios se guardarán de inmediato.
              </DialogDescription>
            </DialogHeader>
            <div
              className="rounded-md px-4 py-3 text-body-sm"
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text-secondary)",
              }}
            >
              Contenido del dialog — formulario, información, etc.
            </div>
            <DialogFooter>
              <CapturButton variant="secondary" onClick={() => setDialogOpen(false)}>
                Cancelar
              </CapturButton>
              <CapturButton variant="primary" onClick={() => setDialogOpen(false)}>
                Guardar cambios
              </CapturButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialogTrigger
            className="inline-flex h-9 items-center justify-center rounded-md border px-4 text-button font-medium transition-colors"
            style={{
              borderColor: "var(--color-error)",
              color: "var(--color-error)",
              backgroundColor: "transparent",
            }}
          >
            Eliminar registro
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Eliminar capacitación</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción es permanente. La capacitación y todas sus inscripciones serán
                eliminadas sin posibilidad de recuperación.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={() => setAlertOpen(false)}>
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Section>
  )
}

function TableShowcase() {
  const [search, setSearch] = useState("")
  const [estadoFilter, setEstadoFilter] = useState("")
  const [page, setPage] = useState(1)

  const filtered = SAMPLE_BENEFICIARIOS.filter((b) => {
    const matchesSearch =
      search === "" ||
      b.nombre.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase())
    const matchesEstado = estadoFilter === "" || b.estado === estadoFilter
    return matchesSearch && matchesEstado
  })

  function clearFilters() {
    setSearch("")
    setEstadoFilter("")
  }

  return (
    <Section id="tablas" title="Tablas">
      <div className="space-y-8">
        <div>
          <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
            CapturTabs
          </p>
          <div
            className="rounded-lg border p-6"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-background)",
            }}
          >
            <CapturTabs
              tabs={[
                { value: "info", label: "Información general" },
                { value: "inscriptos", label: "Inscriptos" },
                { value: "recursos", label: "Recursos" },
              ]}
            >
              <CapturTabPanel value="info">
                <p className="text-body-md" style={{ color: "var(--color-text-secondary)" }}>
                  Contenido del panel{" "}
                  <strong style={{ color: "var(--color-text-primary)" }}>
                    Información general
                  </strong>
                  : descripción, fechas, modalidad, cupo.
                </p>
              </CapturTabPanel>
              <CapturTabPanel value="inscriptos">
                <p className="text-body-md" style={{ color: "var(--color-text-secondary)" }}>
                  Listado de{" "}
                  <strong style={{ color: "var(--color-text-primary)" }}>Inscriptos</strong> con
                  estado y acciones de aprobación.
                </p>
              </CapturTabPanel>
              <CapturTabPanel value="recursos">
                <p className="text-body-md" style={{ color: "var(--color-text-secondary)" }}>
                  Archivos y{" "}
                  <strong style={{ color: "var(--color-text-primary)" }}>Recursos</strong> adjuntos
                  a la capacitación.
                </p>
              </CapturTabPanel>
            </CapturTabs>
          </div>
        </div>

        <div>
          <p className="text-label mb-3" style={{ color: "var(--color-text-secondary)" }}>
            Tabla con filtros y paginación
          </p>
          <div
            className="flex flex-col gap-4 rounded-lg border p-4"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-background)",
            }}
          >
            <CapturTableFilters
              search={search}
              onSearchChange={setSearch}
              placeholder="Buscar beneficiario..."
              filters={[
                {
                  key: "estado",
                  label: "Estado",
                  value: estadoFilter,
                  onChange: setEstadoFilter,
                  options: [
                    { value: "pendiente", label: "Pendiente" },
                    { value: "aprobada", label: "Aprobada" },
                    { value: "rechazada", label: "Rechazada" },
                  ],
                },
              ]}
              onClear={clearFilters}
            />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Modalidad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-10 text-center text-body-sm"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Sin resultados para los filtros aplicados.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">{b.nombre}</TableCell>
                      <TableCell style={{ color: "var(--color-text-secondary)" }}>
                        {b.email}
                      </TableCell>
                      <TableCell style={{ color: "var(--color-text-secondary)" }}>
                        {b.modalidad}
                      </TableCell>
                      <TableCell>
                        <EnrollmentStatusBadge state={b.estado} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex gap-1">
                          <button
                            type="button"
                            aria-label="Ver detalle"
                            className="flex h-7 w-7 items-center justify-center rounded transition-colors"
                            style={{ color: "var(--color-text-secondary)" }}
                            onMouseEnter={(e) =>
                              ((e.currentTarget as HTMLElement).style.color =
                                "var(--color-brand-teal)")
                            }
                            onMouseLeave={(e) =>
                              ((e.currentTarget as HTMLElement).style.color =
                                "var(--color-text-secondary)")
                            }
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            type="button"
                            aria-label="Eliminar"
                            className="flex h-7 w-7 items-center justify-center rounded transition-colors"
                            style={{ color: "var(--color-text-secondary)" }}
                            onMouseEnter={(e) =>
                              ((e.currentTarget as HTMLElement).style.color =
                                "var(--color-error)")
                            }
                            onMouseLeave={(e) =>
                              ((e.currentTarget as HTMLElement).style.color =
                                "var(--color-text-secondary)")
                            }
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <CapturPagination
              currentPage={page}
              totalPages={5}
              totalItems={47}
              pageSize={10}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </Section>
  )
}

function FormShowcase() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(FORM_SCHEMA),
    defaultValues: {
      nombre: "",
      email: "",
      modalidad: "",
      descripcion: "",
      terminos: false,
    },
  })

  async function onSubmit(data: FormValues) {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Form submitted:", data)
    setTimeout(() => reset(), 3000)
  }

  return (
    <Section id="formularios" title="Formularios">
      <div
        className="rounded-lg border p-6 max-w-xl"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-background)",
        }}
      >
        <h3 className="text-heading-4 mb-6" style={{ color: "var(--color-text-primary)" }}>
          Inscripción a capacitación
        </h3>

        {isSubmitSuccessful && (
          <div
            className="mb-6 rounded-md px-4 py-3 text-body-sm font-medium"
            style={{
              backgroundColor: "var(--color-success-bg)",
              color: "var(--color-success)",
            }}
          >
            Inscripción enviada correctamente.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nombre">
              Nombre completo <span style={{ color: "var(--color-error)" }}>*</span>
            </Label>
            <Input
              id="nombre"
              placeholder="Ej. Ana Torres"
              aria-invalid={!!errors.nombre}
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-body-sm" style={{ color: "var(--color-error)" }}>
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">
              Email <span style={{ color: "var(--color-error)" }}>*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-body-sm" style={{ color: "var(--color-error)" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>
              Modalidad <span style={{ color: "var(--color-error)" }}>*</span>
            </Label>
            <Controller
              control={control}
              name="modalidad"
              render={({ field }) => (
                <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                  <SelectTrigger className="w-full" aria-invalid={!!errors.modalidad}>
                    <SelectValue placeholder="Seleccionar modalidad..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presencial">Presencial</SelectItem>
                    <SelectItem value="virtual-sincronica">Virtual sincrónica</SelectItem>
                    <SelectItem value="virtual-asincronica">Virtual asincrónica</SelectItem>
                    <SelectItem value="hibrida">Híbrida</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.modalidad && (
              <p className="text-body-sm" style={{ color: "var(--color-error)" }}>
                {errors.modalidad.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="descripcion">Motivación (opcional)</Label>
            <Textarea
              id="descripcion"
              placeholder="Contanos por qué te interesa esta capacitación..."
              rows={3}
              {...register("descripcion")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-2.5">
              <Controller
                control={control}
                name="terminos"
                render={({ field }) => (
                  <Checkbox
                    id="terminos"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                    aria-invalid={!!errors.terminos}
                  />
                )}
              />
              <Label htmlFor="terminos" className="text-body-sm leading-relaxed cursor-pointer">
                Acepto los términos y condiciones del programa de capacitación
              </Label>
            </div>
            {errors.terminos && (
              <p className="text-body-sm" style={{ color: "var(--color-error)" }}>
                {errors.terminos.message}
              </p>
            )}
          </div>

          <CapturButton
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            loadingText="Enviando inscripción..."
          >
            Confirmar inscripción
          </CapturButton>
        </form>
      </div>
    </Section>
  )
}

// ─── Section helper ───────────────────────────────────────────────────────────

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2
        className="text-heading-3 mb-6 pb-3 border-b"
        style={{
          color: "var(--color-text-primary)",
          borderColor: "var(--color-border)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

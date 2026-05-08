# Captur — Scaffold del proyecto
## Frontend (Next.js App Router)

Este documento define la estructura de carpetas y archivos del frontend de Captur. Es la referencia para que cualquier miembro del equipo o herramienta de AI sepa exactamente dónde vive cada cosa.

La estructura sigue las naming conventions del proyecto: nombres de archivo en PascalCase para componentes, kebab-case para rutas de Next.js App Router.

---

## Estado de los archivos

- ✅ Existe — generado en Fase 0
- ⏳ Pendiente — a generar en Fase 1 o posterior
- 🔧 Parcial — estructura definida, contenido a completar

---

```
captur-frontend/
│
├── public/
│   └── images/
│       └── logo-captur.png              ✅ Logo oficial de Captur
│
├── app/                                 Next.js App Router
│   │
│   ├── layout.tsx                       ✅ Layout raíz — Inter font, Toaster
│   ├── globals.css                      ✅ Variables CSS del design system
│   ├── page.tsx                         ✅ UI Kit (Fase 0) — página de exhibición
│   │
│   ├── (public)/                        Rutas del portal público
│   │   ├── layout.tsx                   ⏳ Layout con PublicHeader y Footer
│   │   ├── capacitaciones/
│   │   │   ├── page.tsx                 ⏳ Listado de capacitaciones (portal)
│   │   │   └── [id]/
│   │   │       └── page.tsx             ⏳ Detalle de capacitación
│   │   ├── capacitaciones-externas/
│   │   │   └── page.tsx                 ⏳ Listado de capacitaciones externas
│   │   └── preguntas-frecuentes/
│   │       └── page.tsx                 ⏳ Preguntas frecuentes
│   │
│   ├── (auth)/                          Rutas de autenticación
│   │   ├── layout.tsx                   ⏳ Layout de auth (sin header/sidebar)
│   │   ├── login/
│   │   │   └── page.tsx                 ⏳ Login
│   │   ├── registro/
│   │   │   └── page.tsx                 ⏳ Registro de Beneficiario
│   │   └── recuperar-password/
│   │       └── page.tsx                 ⏳ Recuperación de contraseña
│   │
│   ├── (beneficiario)/                  Rutas del área del Beneficiario logueado
│   │   ├── layout.tsx                   ⏳ Layout con navegación de beneficiario
│   │   ├── mis-inscripciones/
│   │   │   └── page.tsx                 ⏳ Listado de inscripciones del beneficiario
│   │   ├── mis-certificados/
│   │   │   └── page.tsx                 ⏳ Certificados disponibles
│   │   └── mi-perfil/
│   │       └── page.tsx                 ⏳ Perfil del beneficiario
│   │
│   └── backoffice/                      Rutas del backoffice (admin)
│       ├── layout.tsx                   ⏳ Layout con BackofficeSidebar y header
│       ├── page.tsx                     ⏳ Dashboard
│       │
│       ├── capacitaciones/
│       │   ├── page.tsx                 ⏳ Listado de capacitaciones (backoffice)
│       │   ├── nueva/
│       │   │   └── page.tsx             ⏳ Crear capacitación
│       │   └── [id]/
│       │       ├── page.tsx             ⏳ Detalle de capacitación (backoffice)
│       │       ├── editar/
│       │       │   └── page.tsx         ⏳ Editar capacitación
│       │       └── inscripciones/
│       │           └── page.tsx         ⏳ Inscripciones de la capacitación
│       │
│       ├── capacitaciones-externas/
│       │   ├── page.tsx                 ⏳ Listado
│       │   └── [id]/
│       │       └── page.tsx             ⏳ Detalle / edición
│       │
│       ├── beneficiarios/
│       │   ├── page.tsx                 ⏳ Listado de beneficiarios
│       │   └── [id]/
│       │       └── page.tsx             ⏳ Perfil del beneficiario
│       │
│       ├── capacitadores/
│       │   ├── page.tsx                 ⏳ Listado de capacitadores
│       │   └── [id]/
│       │       └── page.tsx             ⏳ Perfil del capacitador
│       │
│       ├── administradores/
│       │   └── page.tsx                 ⏳ Gestión de administradores
│       │
│       ├── certificados/
│       │   └── page.tsx                 ⏳ Gestión de certificados
│       │
│       ├── encuestas/
│       │   ├── page.tsx                 ⏳ Listado de encuestas
│       │   └── [id]/
│       │       └── page.tsx             ⏳ Detalle / resultados de encuesta
│       │
│       ├── slideshow/
│       │   └── page.tsx                 ⏳ Gestión del slideshow
│       │
│       ├── preguntas-frecuentes/
│       │   └── page.tsx                 ⏳ Gestión de FAQs
│       │
│       └── configuracion/
│           ├── modalidades/
│           │   └── page.tsx             ⏳ Gestión de modalidades
│           ├── organizadores/
│           │   └── page.tsx             ⏳ Gestión de organizadores
│           ├── tipos-destinatario/
│           │   └── page.tsx             ⏳ Gestión de perfiles de destinatario
│           └── ambitos/
│               └── page.tsx             ⏳ Gestión de ámbitos
│
├── components/
│   │
│   ├── ui/                              Componentes shadcn/ui — NO modificar
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── select.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── table.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── tooltip.tsx
│   │
│   ├── shared/                          Componentes reutilizables del dominio
│   │   ├── CapturButton.tsx             ✅ Botón con variantes del design system
│   │   ├── CapturDatePicker.tsx         ⏳ DatePicker custom con selector mes/año
│   │   ├── CapturLogo.tsx               ✅ Logo responsive con contextos light/dark
│   │   ├── EmptyState.tsx               ✅ Estado vacío de listas y tablas
│   │   ├── CertificateBadge.tsx         ✅ Badge estado del certificado
│   │   ├── CupoBadge.tsx                ✅ Badge estado del cupo
│   │   ├── EnrollmentStatusBadge.tsx    ✅ Badge estado de inscripción
│   │   ├── NuevoBadge.tsx               ✅ Badge "Nuevo" para capacitaciones recientes
│   │   ├── TrainingModalityBadge.tsx    ✅ Badge modalidad por slug
│   │   ├── TrainingScopeBadge.tsx       ✅ Badge ámbito (interno/externo/articulación)
│   │   └── TrainingStatusBadge.tsx      ✅ Badge estado del ciclo de vida
│   │
│   ├── trainings/                       Componentes de capacitaciones
│   │   ├── TrainingCard.tsx             ✅ Card de capacitación (portal público)
│   │   ├── TrainingCardSkeleton.tsx     ✅ Skeleton de la card
│   │   ├── TrainingGrid.tsx             ⏳ Grilla de cards con estados vacío y carga
│   │   ├── TrainingFilters.tsx          ⏳ Filtros del listado (modalidad, ámbito, etc.)
│   │   └── TrainingForm.tsx             ⏳ Formulario crear/editar capacitación (backoffice)
│   │
│   ├── enrollments/                     Componentes de inscripciones
│   │   ├── EnrollmentForm.tsx           ⏳ Formulario de inscripción
│   │   └── EnrollmentTable.tsx          ⏳ Tabla de inscripciones (backoffice)
│   │
│   ├── certificates/                    Componentes de certificados
│   │   ├── CertificateCard.tsx          ⏳ Card de certificado (área del beneficiario)
│   │   └── CertificateTable.tsx         ⏳ Tabla de certificados (backoffice)
│   │
│   ├── users/                           Componentes de usuarios
│   │   ├── UserCard.tsx                 ⏳ Card de usuario
│   │   └── UserTable.tsx                ⏳ Tabla de usuarios (backoffice)
│   │
│   ├── trainers/                        Componentes de capacitadores
│   │   ├── TrainerCard.tsx              ⏳ Card de capacitador
│   │   └── TrainerTable.tsx             ⏳ Tabla de capacitadores (backoffice)
│   │
│   ├── surveys/                         Componentes de encuestas
│   │   ├── SurveyForm.tsx               ⏳ Formulario de encuesta (beneficiario)
│   │   └── SurveyResults.tsx            ⏳ Resultados de encuesta (backoffice)
│   │
│   └── layout/                          Componentes de navegación y estructura
│       ├── PublicHeader.tsx             ✅ Header del portal público
│       ├── PublicFooter.tsx             ⏳ Footer del portal público
│       ├── BackofficeSidebar.tsx        ✅ Sidebar del backoffice
│       └── BackofficeHeader.tsx         ✅ Header del backoffice
│
├── hooks/                               Hooks custom
│   ├── useTrainings.ts                  ⏳ TanStack Query — listado de capacitaciones
│   ├── useTraining.ts                   ⏳ TanStack Query — detalle de capacitación
│   ├── useEnrollments.ts                ⏳ TanStack Query — inscripciones
│   ├── useCertificates.ts               ⏳ TanStack Query — certificados
│   ├── useCurrentUser.ts                ⏳ Usuario autenticado actual
│   └── useGeography.ts                  ⏳ Provincias, departamentos, municipios, localidades
│
├── lib/                                 Utilidades y configuración
│   ├── api.ts                           ⏳ Cliente HTTP base (fetch wrapper)
│   ├── auth.ts                          ⏳ Helpers de autenticación JWT
│   ├── utils.ts                         ✅ cn() y utilidades generales (shadcn)
│   └── formatters.ts                    ⏳ Formateo de fechas, números, texto
│
├── types/                               Tipos TypeScript del dominio
│   ├── training.ts                      ⏳ Training, TrainingModality, TrainingScope…
│   ├── enrollment.ts                    ⏳ TrainingEnrollment
│   ├── user.ts                          ⏳ User, roles
│   ├── trainer.ts                       ⏳ Trainer
│   ├── certificate.ts                   ⏳ Certificate, CertificateTemplate
│   ├── survey.ts                        ⏳ Survey, SurveyQuestion, SurveyAnswer…
│   ├── geography.ts                     ⏳ Province, Department, Municipality, Locality
│   └── common.ts                        ⏳ PaginatedResponse, ApiError, etc.
│
├── tailwind.config.ts                   ✅ Escala tipográfica custom del design system
├── components.json                      ✅ Configuración shadcn/ui
├── next.config.ts                       ✅ Configuración Next.js
├── tsconfig.json                        ✅ TypeScript estricto
└── package.json                         ✅ Dependencias del proyecto
```

---

## Reglas de naming

| Elemento | Convención | Ejemplo |
|---|---|---|
| Archivos de componente | PascalCase.tsx | `TrainingCard.tsx` |
| Archivos de página (App Router) | kebab-case/page.tsx | `capacitaciones/page.tsx` |
| Archivos de hook | camelCase.ts con prefijo `use` | `useTrainings.ts` |
| Archivos de tipo | camelCase.ts | `training.ts` |
| Archivos de utilidad | camelCase.ts | `formatters.ts` |

## Reglas de ubicación

- Todo componente que usa datos de una sola entidad va en la carpeta de esa entidad (`components/trainings/`, `components/enrollments/`, etc.)
- Todo componente reutilizable entre entidades va en `components/shared/`
- Los componentes de shadcn van en `components/ui/` y **nunca se modifican directamente**
- Los componentes de estructura de página van en `components/layout/`
- No crear componentes en `app/` — las páginas solo importan componentes de `components/`

## Notas sobre Fase 0 vs Fase 1

Los archivos marcados ✅ fueron generados durante la Fase 0 (UI Kit). Su código vive en la página raíz `/` como página de exhibición.

A partir de Fase 1, estos componentes se reutilizan en las páginas reales. La página de UI Kit (`app/page.tsx`) se mantiene durante el desarrollo como referencia visual — se elimina o protege antes del deploy a producción.

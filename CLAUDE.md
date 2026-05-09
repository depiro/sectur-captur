# CLAUDE.md — Captur Frontend

Este archivo es leído por Claude Code al iniciar en este repositorio.
Contiene todo el contexto necesario para generar código correcto sin instrucciones adicionales.

---

## Qué es este proyecto

**Captur** es el sistema de capacitación turística de la Secretaría de Turismo de Jujuy, Argentina.
Plataforma web con portal público para beneficiarios y backoffice para administradores.

---

## Stack tecnológico — obligatorio, sin excepciones

```
Framework:     Next.js 15 (App Router)
Lenguaje:      TypeScript estricto — sin any, sin @ts-ignore
Estilos:       Tailwind CSS + variables CSS custom (ver Design System)
Componentes:   shadcn/ui — NO modificar archivos en components/ui/
Forms:         React Hook Form + Zod
Data fetching: TanStack Query (React Query v5)
Iconos:        lucide-react — sin otras librerías de iconos
Fechas:        date-fns
```

No instalar librerías adicionales sin consultar. El stack está cerrado.

---

## Terminología del dominio — siempre usar estos términos en la UI

| ✅ Correcto | ❌ Incorrecto |
|---|---|
| Capacitación | Curso |
| Beneficiario | Alumno, Usuario |
| Inscripción | Matrícula, Registro |
| Capacitador | Instructor, Docente |

---

## Naming conventions — el nombre nace en la DB y sube a todas las capas

### Regla general
Si la tabla es `trainings` → endpoint `/trainings` → tipo `Training` → componente `TrainingCard` → página `TrainingsPage`.
Nunca inventar sinónimos entre capas.

### Por capa

| Capa | Convención | Ejemplo |
|---|---|---|
| Archivos de componente | PascalCase.tsx | `TrainingCard.tsx` |
| Páginas App Router | kebab-case/page.tsx | `capacitaciones/page.tsx` |
| Hooks | camelCase con prefijo `use` | `useTrainings.ts` |
| Tipos | camelCase.ts | `training.ts` |
| Componentes shadcn | nombre original sin modificar | `Button`, `Dialog` |
| Componentes de negocio | PascalCase descriptivo | `TrainingStatusBadge` |

---

## Design System

### Fuente
**Inter** — única familia tipográfica. Importada en `app/layout.tsx`.

### Variables CSS — definidas en `app/globals.css`

```css
:root {
  /* Marca */
  --color-brand-teal: #2A9D9D;
  --color-brand-teal-dark: #1F7A7A;
  --color-brand-teal-bg: rgba(42, 157, 157, 0.1);
  --color-brand-orange: #E8762C;
  --color-brand-orange-bg: rgba(232, 118, 44, 0.1);
  --color-brand-purple: #7B5EA7;
  --color-brand-purple-bg: rgba(123, 94, 167, 0.1);
  --color-brand-lime: #8DC63F;
  --color-brand-lime-bg: rgba(141, 198, 63, 0.1);

  /* Semánticos */
  --color-success: #16A34A;
  --color-success-bg: rgba(22, 163, 74, 0.1);
  --color-error: #DC2626;
  --color-error-bg: rgba(220, 38, 38, 0.1);
  --color-warning: #D97706;
  --color-warning-bg: rgba(217, 119, 6, 0.1);
  --color-info: #2563EB;
  --color-info-bg: rgba(37, 99, 235, 0.1);

  /* Neutros */
  --color-background: #FFFFFF;
  --color-surface: #F9FAFB;
  --color-border: #E5E7EB;
  --color-border-strong: #D1D5DB;
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-disabled: #9CA3AF;
  --color-overlay: rgba(0, 0, 0, 0.5);

  /* Sidebar */
  --color-sidebar-bg: #FFFFFF;
  --color-sidebar-border: #E5E7EB;
  --color-sidebar-text: #374151;
  --color-sidebar-text-muted: #9CA3AF;
  --color-sidebar-icon: #6B7280;
  --color-sidebar-hover-bg: #F3F4F6;
  --color-sidebar-active-bg: rgba(42, 157, 157, 0.08);
  --color-sidebar-active-text: #2A9D9D;
  --color-sidebar-active-icon: #2A9D9D;
  --color-sidebar-active-border: #2A9D9D;
  --color-sidebar-group-label: #9CA3AF;

  /* Espaciado */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 20px;  --space-6: 24px;
  --space-8: 32px;  --space-10: 40px; --space-12: 48px;
  --space-16: 64px; --space-24: 96px;

  /* Border radius */
  --radius-sm: 4px;  --radius-md: 8px;
  --radius-lg: 12px; --radius-full: 9999px;

  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --shadow-focus: 0 0 0 3px rgba(42,157,157,0.3);
}
```

### Reglas críticas de color
- **NUNCA hardcodear colores** — siempre `var(--color-*)`. Si Tailwind no puede usarlas: `style={{ color: 'var(--color-brand-teal)' }}`.
- **Badges:** fondo = variable `*-bg` (semitransparente) + texto = variable plena. Nunca la misma variable para ambos.

### Escala tipográfica — en `tailwind.config.ts`

```ts
fontSize: {
  'display':   ['3rem',     { lineHeight: '1.15', fontWeight: '700' }],
  'heading-1': ['2.25rem',  { lineHeight: '1.2',  fontWeight: '700' }],
  'heading-2': ['1.75rem',  { lineHeight: '1.25', fontWeight: '600' }],
  'heading-3': ['1.375rem', { lineHeight: '1.3',  fontWeight: '600' }],
  'heading-4': ['1.125rem', { lineHeight: '1.4',  fontWeight: '600' }],
  'body-lg':   ['1rem',     { lineHeight: '1.6',  fontWeight: '400' }],
  'body-md':   ['0.875rem', { lineHeight: '1.5',  fontWeight: '400' }],
  'body-sm':   ['0.75rem',  { lineHeight: '1.4',  fontWeight: '400' }],
  'label':     ['0.75rem',  { lineHeight: '1.3',  fontWeight: '500' }],
  'button':    ['0.875rem', { lineHeight: '1',    fontWeight: '500' }],
}
```

---

## Estructura de carpetas

```
captur-frontend/
├── app/
│   ├── layout.tsx                 ← Inter font, Toaster, QueryClientProvider
│   ├── globals.css                ← variables CSS del design system
│   ├── page.tsx                   ← UI Kit (Fase 0)
│   ├── (public)/                  ← portal público
│   ├── (auth)/                    ← login, registro
│   ├── (beneficiario)/            ← área del beneficiario logueado
│   └── backoffice/                ← admin
├── components/
│   ├── ui/                        ← shadcn — NO MODIFICAR
│   ├── shared/                    ← componentes reutilizables del dominio
│   ├── trainings/
│   ├── enrollments/
│   ├── certificates/
│   ├── users/
│   ├── trainers/
│   ├── surveys/
│   └── layout/
├── hooks/
├── types/
└── lib/
```

**Regla:** los componentes nunca viven en `app/`. Las páginas solo importan de `components/`.

---

## Entidades del dominio

| Tabla DB | Tipo TypeScript | Componente | Notas |
|---|---|---|---|
| `trainings` | `Training` | `TrainingCard` | Entidad central |
| `training_enrollments` | `TrainingEnrollment` | `EnrollmentStatusBadge` | |
| `external_trainings` | `ExternalTraining` | — | |
| `trainers` | `Trainer` | `TrainerCard` | |
| `users` | `User` | `UserCard` | Rol por campo `role` |
| `programs` | `Program` | `ProgramBadge` | |
| `organizers` | `Organizer` | — | |
| `sponsors` | `Sponsor` | — | |
| `certificates` | `Certificate` | `CertificateCard` | |
| `certificate_templates` | `CertificateTemplate` | — | |
| `surveys` | `Survey` | — | |
| `training_resources` | `TrainingResource` | — | |

### Roles de usuario
`ADMIN` · `USER` (Beneficiario) · `TRAINER` (Capacitador) · `EDITOR`

### Estados de Training.status
`draft` · `published` · `in_progress` · `completed` · `cancelled`

### Estados de TrainingEnrollment.state
`pendiente` · `aprobada` · `rechazada`

### Modalidades (training_modalities — por slug)
`presencial` · `virtual-sincronica` · `virtual-asincronica` · `virtual` · `hibrida` · `mixta`

---

## Componentes shared — ya definidos (Fase 0)

Estos componentes tienen especificación cerrada. Al generarlos o modificarlos, respetar exactamente:

- `CapturButton` — variantes: primary, secondary, ghost, destructive. Tamaños: sm, md, lg.
- `TrainingModalityBadge` — estilo por slug, nunca por name.
- `TrainingStatusBadge` — un color por estado.
- `TrainingScopeBadge` — interno / externo / articulacion.
- `EnrollmentStatusBadge` — pendiente / aprobada / rechazada.
- `CertificateBadge` — disponible / encuesta-pendiente / no-disponible (no renderiza).
- `CupoBadge` — limitado / agotado / disponible (no renderiza).
- `NuevoBadge` — capacitaciones publicadas hace menos de 7 días.
- `EmptyState` — icon + title + description? + action?.
- `TrainingCard` — estructura fija, lógica de cupo, dos estados de acciones.
- `TrainingCardSkeleton` — reproduce estructura exacta de TrainingCard.
- `PublicHeader` — navegación pública con mobile sheet.
- `BackofficeSidebar` — expandido/colapsado, grupos, tooltips en modo colapsado.

---

## UI Standards — patrones de comportamiento

### Feedback al usuario

| Situación | Mecanismo |
|---|---|
| Acción exitosa sin cambio de pantalla | Toast (shadcn useToast) |
| Acción exitosa con redirección | Redirección, sin toast |
| Error de validación de formulario | FormMessage inline bajo el campo |
| Error de servidor | Toast destructivo |
| Confirmación antes de acción destructiva | AlertDialog — nunca window.confirm |

### Estados de carga

| Operación | Mecanismo |
|---|---|
| Carga inicial de página | Skeleton que reproduce la estructura |
| Envío de formulario | Botón con Loader2 + texto gerundio + disabled |
| Acción en un item | Spinner inline |

Textos de carga: Guardar→Guardando, Enviar→Enviando, Inscribirse→Procesando inscripción, Descargar→Generando certificado, Eliminar→Eliminando, Publicar→Publicando.

### Acciones destructivas
Siempre `AlertDialog`. Título: qué va a pasar (no "¿Estás seguro?"). Botón confirmar: verbo de la acción, variante destructive.

### Validación de formularios
React Hook Form + Zod. Mensajes en español, segunda persona, sin signos de exclamación.
```
✅ "Ingresá un email válido"
✅ "Este campo es obligatorio"
❌ "Email inválido!"  ❌ "Required"
```

### Estados vacíos
Toda lista o tabla tiene estado vacío explícito: ícono + título + descripción + acción opcional.

---

## Tono de la interfaz

Plataforma gubernamental, usuarios de distintos niveles tecnológicos.
- Claro: una palabra simple antes que una técnica
- Directo: decir qué hacer
- Segunda persona sin extremos: "Ingresá" no "Por favor proceda a ingresar"
- Sin jerga técnica: nunca mostrar códigos de error al usuario final

---

## Qué NO hacer

- No instalar librerías fuera del stack definido
- No modificar archivos en `components/ui/`
- No hardcodear colores hex — siempre variables CSS
- No usar `any` ni `@ts-ignore`
- No crear componentes directamente en `app/`
- No usar `window.confirm` para confirmaciones destructivas
- No mostrar errores técnicos (Error 500, token expirado) al usuario
- No crear sistemas de notificación paralelos a shadcn Toaster
- No inventar nombres de entidades — respetar la tabla de naming

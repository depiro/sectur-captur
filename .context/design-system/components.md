# Captur — Component Inventory

## Purpose

This file is the single source of truth for all existing UI components in the project. Before creating any new component, any developer or AI tool must check this file first.

**Rules:**
- If the component you need exists here → use it as-is or extend it via props
- If you need a variant that doesn't exist → add a prop to the existing component, document the change here
- If the component genuinely doesn't exist → create it, add it to this file before committing
- Never create a component that duplicates functionality already covered here
- Never modify shadcn/ui components in `components/ui/` — wrap them instead

---

## shadcn/ui Base Components

Located in `components/ui/`. Do not modify these files directly. Wrap them in domain components when customization is needed.

| Component | File | Notes |
|---|---|---|
| `AlertDialog` | `alert-dialog.tsx` | Used for all destructive action confirmations |
| `Button` | `button.tsx` | Base for `CapturButton` — do not use directly |
| `Calendar` | `calendar.tsx` | Base for `CapturDatePicker` — do not use directly |
| `Checkbox` | `checkbox.tsx` | Used in forms via React Hook Form |
| `Dialog` | `dialog.tsx` | Used for neutral info dialogs |
| `DropdownMenu` | `dropdown-menu.tsx` | Used in backoffice header user menu |
| `Form` | `form.tsx` | Wrapper for React Hook Form + Zod fields |
| `Input` | `input.tsx` | Base input — always use inside `FormField` |
| `Label` | `label.tsx` | Always use above inputs, never as placeholder |
| `Popover` | `popover.tsx` | Used inside `CapturDatePicker` |
| `Select` | `select.tsx` | Used in forms and inside `CapturDatePicker` |
| `Sheet` | `sheet.tsx` | Used in `PublicHeader` mobile menu |
| `Skeleton` | `skeleton.tsx` | Used in `TrainingCardSkeleton` and `TableSkeleton` |
| `Table` | `table.tsx` | Base for all backoffice tables — do not use directly |
| `Textarea` | `textarea.tsx` | Used in forms via React Hook Form |
| `Toast` | `toast.tsx` | Used via `useToast` hook only |
| `Toaster` | `toaster.tsx` | Mounted once in root layout |
| `Tooltip` | `tooltip.tsx` | Used in `BackofficeSidebar` collapsed state |

---

## Shared Components

Located in `components/shared/`. Reusable across all domains and pages.

---

### `CapturButton`

**File:** `components/shared/CapturButton.tsx`
**Extends:** shadcn `Button`
**Purpose:** Project-wide button with brand variants and loading state.

**Props:**
```ts
variant: 'primary' | 'secondary' | 'ghost' | 'destructive'
size: 'sm' | 'md' | 'lg'
isLoading?: boolean
loadingText?: string
```

**Variants:**
| Variant | Background | Text | Use when |
|---|---|---|---|
| `primary` | `--color-brand-teal` | white | Main action per section. Max one visible at a time. |
| `secondary` | transparent | `--color-brand-teal` | Alternative action of lower visual weight |
| `ghost` | none | `--color-text-primary` | Tertiary actions, table actions, card links |
| `destructive` | `--color-error` | white | Irreversible actions only. Always preceded by AlertDialog. |

**Sizes:** `sm` 32px · `md` 40px (default) · `lg` 48px

**Loading state:** `Loader2` spinner + loading text + fixed width + `disabled`. Always use gerund form: "Guardando...", "Enviando...", etc.

**Do not use** the base shadcn `Button` directly anywhere in the project. Always use `CapturButton`.

---

### `CapturDatePicker`

**File:** `components/shared/CapturDatePicker.tsx`
**Extends:** shadcn `Popover` + `Calendar` + `Select`
**Purpose:** Custom date picker replacing all native `<input type="date">` elements.

**Props:**
```ts
value: Date | undefined
onChange: (date: Date | undefined) => void
placeholder?: string        // default: 'DD/MM/AAAA'
disabled?: boolean
label?: string
error?: string
required?: boolean
```

**Structure:** Trigger input (same style as project inputs) → Popover → month/year selects + day grid.

**Date format displayed:** `DD/MM/YYYY`

**Do not use** `<input type="date">` anywhere in the project. Always use `CapturDatePicker`.

---

### `CapturLogo`

**File:** `components/shared/CapturLogo.tsx`
**Purpose:** Responsive brand logo with light/dark context support.

**Props:**
```ts
size?: 'sm' | 'md' | 'lg' | 'xl'   // default: 'md'
context?: 'light' | 'dark'           // default: 'light'
className?: string
```

**Sizes:** `sm` 28px · `md` 36px · `lg` 48px · `xl` 64px. Width always `auto`.

**Context:** `light` applies `mix-blend-mode: multiply` for white backgrounds. `dark` shows logo as-is.

**Collapsed sidebar:** When sidebar is collapsed (64px), replace logo with "CT" initials circle (36px, `--color-brand-teal-bg` background, `--color-brand-teal` text).

---

### `EmptyState`

**File:** `components/shared/EmptyState.tsx`
**Purpose:** Empty state for all lists and tables. Every list must have one — never show an empty list without context.

**Props:**
```ts
icon: LucideIcon
title: string
description?: string
action?: { label: string; onClick: () => void }
```

**Structure:** centered column, py-12. Icon 48px `--color-text-secondary` → title `heading-4` → description `body-md` `--color-text-secondary` → Primary `md` button if action provided.

---

### `CertificateBadge`

**File:** `components/shared/CertificateBadge.tsx`
**Purpose:** Shows certificate availability state for a beneficiary's enrollment.

**Props:**
```ts
estado: 'disponible' | 'encuesta-pendiente' | 'no-disponible'
```

| `estado` | Background | Text | Label |
|---|---|---|---|
| `disponible` | `--color-brand-lime-bg` | `--color-brand-lime` | "Certificado disponible" |
| `encuesta-pendiente` | `--color-warning-bg` | `--color-warning` | "Encuesta pendiente" |
| `no-disponible` | not rendered | | |

---

### `CupoBadge`

**File:** `components/shared/CupoBadge.tsx`
**Purpose:** Shows enrollment capacity state. Only renders when capacity is limited or exhausted.

**Props:**
```ts
estado: 'limitado' | 'agotado' | 'disponible'
```

| `estado` | Background | Text | Label |
|---|---|---|---|
| `limitado` | `--color-warning-bg` | `--color-warning` | "Cupo limitado" |
| `agotado` | `--color-error-bg` | `--color-error` | "Cupo agotado" |
| `disponible` | not rendered | | |

**Capacity logic** (implement at call site):
- `capacity === null` → do not render
- `enrollmentsCount >= capacity` → `estado="agotado"`
- `enrollmentsCount / capacity >= 0.8` → `estado="limitado"`
- Otherwise → show text "N de M cupos disponibles" with `Users` icon, not this badge

---

### `EnrollmentStatusBadge`

**File:** `components/shared/EnrollmentStatusBadge.tsx`
**Purpose:** Shows the approval state of a training enrollment (`TrainingEnrollment.state`).

**Props:**
```ts
state: 'pendiente' | 'aprobada' | 'rechazada'
```

| `state` | Background | Text | Label |
|---|---|---|---|
| `pendiente` | `--color-warning-bg` | `--color-warning` | "Pendiente" |
| `aprobada` | `--color-success-bg` | `--color-success` | "Aprobada" |
| `rechazada` | `--color-error-bg` | `--color-error` | "Rechazada" |

---

### `NuevoBadge`

**File:** `components/shared/NuevoBadge.tsx`
**Purpose:** Highlights recently published trainings. Renders automatically for trainings published less than 7 days ago.

**No props** — renders a static "Nuevo" badge.

**Style:** solid `--color-brand-orange` background, white text. Only badge with solid (non-transparent) background — intentional for maximum attention.

---

### `TrainingModalityBadge`

**File:** `components/shared/TrainingModalityBadge.tsx`
**Purpose:** Shows the modality of a training. Style is determined exclusively by `slug`, never by `name`.

**Props:**
```ts
slug: 'presencial' | 'virtual-sincronica' | 'virtual-asincronica' | 'virtual' | 'hibrida' | 'mixta'
name: string   // fallback label if slug is not in the map
```

| `slug` | Background | Text | Label |
|---|---|---|---|
| `presencial` | `--color-info-bg` | `--color-info` | "Presencial" |
| `virtual-sincronica` | `--color-brand-teal-bg` | `--color-brand-teal` | "Virtual Sincrónica" |
| `virtual-asincronica` | `--color-brand-purple-bg` | `--color-brand-purple` | "Virtual Asincrónica" |
| `virtual` | `--color-brand-teal-bg` | `--color-brand-teal` | "Virtual" |
| `hibrida` | `--color-brand-orange-bg` | `--color-brand-orange` | "Híbrida" |
| `mixta` | `--color-brand-orange-bg` | `--color-brand-orange` | "Mixta" |

Unknown slug → `--color-border` background, `--color-text-secondary` text, `name` as label.

---

### `TrainingScopeBadge`

**File:** `components/shared/TrainingScopeBadge.tsx`
**Purpose:** Shows the scope (`TrainingScope`) of a training.

**Props:**
```ts
slug: 'interno' | 'externo' | 'articulacion'
```

| `slug` | Background | Text | Label |
|---|---|---|---|
| `interno` | `--color-info-bg` | `--color-info` | "Interno" |
| `externo` | `--color-brand-purple-bg` | `--color-brand-purple` | "Externo" |
| `articulacion` | `--color-brand-lime-bg` | `--color-brand-lime` | "Articulación Institucional" |

---

### `TrainingStatusBadge`

**File:** `components/shared/TrainingStatusBadge.tsx`
**Purpose:** Shows the lifecycle status of a training (`Training.status`).

**Props:**
```ts
status: 'draft' | 'published' | 'in_progress' | 'completed' | 'cancelled'
```

| `status` | Background | Text | Label |
|---|---|---|---|
| `draft` | `--color-border` | `--color-text-secondary` | "Borrador" |
| `published` | `--color-success-bg` | `--color-success` | "Publicada" |
| `in_progress` | `--color-brand-teal-bg` | `--color-brand-teal` | "En curso" |
| `completed` | `--color-info-bg` | `--color-info` | "Finalizada" |
| `cancelled` | `--color-error-bg` | `--color-error` | "Cancelada" |

---

## Training Components

Located in `components/trainings/`.

---

### `TrainingCard`

**File:** `components/trainings/TrainingCard.tsx`
**Purpose:** Training card for the public portal listing. The most important component in the platform.

**Props:**
```ts
interface TrainingCardProps {
  id: number
  title: string
  programs: Array<{ name: string }>
  trainers: Array<{ firstName: string; lastName: string }>
  trainingModalities: Array<{ name: string; slug: string }>
  hs: number | null
  startDate: Date | null
  locality: { name: string }
  capacity: number | null
  enrollmentsCount: number
  isRegistrationEnabled: boolean
  image: string | null
  onVerDetalle: (id: number) => void
  onInscribirse: (id: number) => void
}
```

**Content order (strict):**
1. Thumb (160px fixed height)
2. Title — `heading-4`, `--color-text-primary`, `line-clamp-2`. First element, nothing before it.
3. Program name — `body-sm`, `--color-text-secondary`, always visible regardless of image
4. `TrainingModalityBadge` — determined by first modality slug
5. Metadata — location (`MapPin`), start date (`CalendarDays`), duration (`Clock`), capacity (`Users` or `CupoBadge`)
6. Divider — `--color-border`
7. Actions — "Inscribirse" (Primary sm) + "Ver detalle →" (ghost link)

**Thumb:** 16:9 crop if image present. Placeholder: `--color-brand-teal-bg` background + `GraduationCap` icon + program name. No text or badges overlaid on the thumb.

**Actions — closed state:** "Inscripción cerrada" as `<span>` (never a button), "Ver detalle →" always active.

**Hover:** `--shadow-md`, `translateY(-2px)`, 150ms ease.

**Does NOT include:** description, time details, trainer name, `NuevoBadge`, `TrainingScopeBadge`. Those belong in the detail page.

---

### `TrainingCardSkeleton`

**File:** `components/trainings/TrainingCardSkeleton.tsx`
**Purpose:** Loading skeleton that mirrors the exact structure of `TrainingCard`.

**No props.**

**Structure:** 160px skeleton block (thumb) → badge line → long line (title) → medium line (program) → short line (badge) → four metadata lines → divider → two button blocks.

---

## Layout Components

Located in `components/layout/`.

---

### `PublicHeader`

**File:** `components/layout/PublicHeader.tsx`
**Purpose:** Sticky header for the public portal.

**Structure:** `CapturLogo` (md, light) · nav links (Inicio, Capacitaciones, Preguntas frecuentes) · Ghost "Ingresar" + Primary "Registrarse".

**Mobile:** hamburger `Menu` icon → `Sheet` from left with stacked links and buttons.

**Active link:** `--color-brand-teal`, weight 500. Hover: `--color-brand-teal`.

---

### `BackofficeSidebar`

**File:** `components/layout/BackofficeSidebar.tsx`
**Purpose:** Left sidebar for the backoffice. WordPress-style structure with brand accent scheme.

**Props:**
```ts
collapsed: boolean
onToggle: () => void
activeItem: string
```

**Expanded:** 240px, white background, `--color-sidebar-border` right border. Groups with labels + separators. Active item: `--color-sidebar-active-bg` background + `--color-sidebar-active-text` text + 3px left border.

**Collapsed:** 64px, icons only, `Tooltip` on hover. "CT" initials circle replaces logo.

**Groups:** Dashboard · Capacitaciones (Todas, Externas, Programas) · Usuarios (Beneficiarios, Capacitadores, Administradores) · Certificados · Encuestas · Contenido (Slideshow, FAQs) · Configuración (Modalidades, Organizadores, Tipos de destinatario, Ámbitos).

---

### `BackofficeHeader`

**File:** `components/layout/BackofficeHeader.tsx`
**Purpose:** Top header for the backoffice, paired with `BackofficeSidebar`.

**Structure:** Toggle button (PanelLeftClose/PanelLeftOpen) · active section name (`heading-4`) · user avatar with initials + name + dropdown (Mi perfil, Cerrar sesión).

---

## How to update this file

When a new component is created during development:

1. Add it to the correct section before committing the component file
2. Document: file path, purpose, all props with types, key behavior rules
3. If the new component replaces or extends an existing one, note it explicitly
4. If a prop is added to an existing component, update that component's entry here

This file is read by AI tools at the start of every implementation session. Keeping it accurate directly reduces duplicate components and inconsistent implementations.

# Captur — Foundations

## Overview

This document contains the foundational design decisions, layout systems, component behaviors, interaction patterns, terminology, and structural rules that complement the token files:

- `colors.md`
- `typography.md`
- `spacing.md`
- `radius.md`
- `shadows.md`
- `variables.md`

This file defines how the system behaves, not only how it looks.

---

# Grid and Breakpoints

## Layout Rules

Container:
- `max-width: 1200px`
- `margin: 0 auto`

The training grid never exceeds 3 columns, prioritizing readability over density.

---

## Breakpoints

| Name | Width | Behavior |
|---|---|---|
| `mobile` | `< 640px` | 1 column · 16px padding |
| `tablet` | `640px – 1024px` | 2 columns · 24px padding |
| `desktop` | `1024px – 1280px` | 3 columns · 32px padding |
| `wide` | `> 1280px` | centered · max-width 1200px |

---

# Buttons — `CapturButton`

Stripe-inspired interaction model.

---

## Variants

### Primary
- `--color-brand-teal` background
- white text
- main action only
- maximum one primary action per section

### Secondary
- transparent background
- `1px solid --color-brand-teal`
- teal text

### Ghost
- no border
- no background
- hover uses `--color-surface`

### Destructive
- `--color-error`
- irreversible actions only
- always paired with confirmation dialog

---

## Sizes

| Size | Height | Horizontal Padding | Typography |
|---|---|---|---|
| `sm` | 32px | 12px | `label` |
| `md` | 40px | 16px | `button` |
| `lg` | 48px | 20px | `button` 16px |

---

## States

### Default
Base color.

### Hover
- primary → `--color-brand-teal-dark`
- others → 8% darker

### Focus
Uses `--shadow-focus`.

### Disabled
- 40% opacity
- `cursor: not-allowed`

### Loading
- fixed width
- spinner visible
- disabled interaction

---

## Loading Texts

| Action | Text |
|---|---|
| Save | Guardando... |
| Send | Enviando... |
| Enroll | Procesando inscripción... |
| Download | Generando certificado... |
| Delete | Eliminando... |
| Publish | Publicando... |

---

# Forms

## Stack

- React Hook Form
- Zod
- shadcn/ui

---

## Input

### Base Style
- height: 40px
- `1px solid --color-border`
- `--radius-sm`
- `--color-surface`
- horizontal padding: `--space-3`

### States

#### Focus
- teal border
- `--shadow-focus`

#### Error
- `--color-error`
- inline FormMessage

#### Disabled
- disabled text color
- disabled background
- `cursor: not-allowed`

---

## Label

- `body-md`
- weight 500
- above input always
- required fields use red asterisk

---

## FormMessage

- shown on blur or submit
- `body-sm`
- `--color-error`

---

## Select

- same style as input
- chevron uses secondary text color
- dropdown:
  - `--shadow-md`
  - `--radius-md`

---

## Textarea

- minimum height: 96px
- vertical resize only

---

## Checkbox and Radio

- 16×16px
- checkbox → `--radius-sm`
- radio → `--radius-full`
- always accompanied by visible label

---

# DatePicker — `CapturDatePicker`

Custom component replacing native date input.

---

## Why

Native date inputs:
- vary between operating systems
- ignore design system styling
- reduce UI consistency

---

## Trigger

- same appearance as input
- left `CalendarDays` icon
- format: `DD/MM/YYYY`

---

## Popover

- background: `--color-background`
- border: `--color-border`
- shadow: `--shadow-lg`
- radius: `--radius-md`
- width: 280px
- padding: 16px

---

## Calendar Structure

- month select
- year select
- weekday headers
- 7-column day grid

---

## Cell States

| State | Behavior |
|---|---|
| Normal | hover surface |
| Selected | teal background + white text |
| Today | teal border |
| Other month | disabled |
| Disabled | not clickable |

---

# Badges and Labels

## Base Style

- height: 20px
- horizontal padding: 8px
- typography: `label`
- no border
- `--radius-sm`

---

# Badge Rules

## Critical Rule

Badge text color must NEVER equal background color.

Correct:
- background = `*-bg`
- text = full saturated color

---

## `TrainingModalityBadge`

Uses slug-based mapping only.

Never rely on display name.

---

## `TrainingScopeBadge`

Defines internal/external/institutional articulation scope.

---

## `TrainingStatusBadge`

Defines lifecycle state of trainings.

---

## `EnrollmentStatusBadge`

Defines enrollment approval state.

---

## `CertificateBadge`

Indicates certificate availability or pending survey.

---

## `CupoBadge`

Capacity-related warnings.

---

## `NuevoBadge`

Special rule:
- solid orange background
- white text
- only exception to semi-transparent badge system

Visible for trainings published less than 7 days ago.

---

# Training Card — `TrainingCard`

Most important component in the platform.

---

# Card Structure

## Thumb
- fixed height: 160px
- `object-fit: cover`

### Placeholder
Uses:
- subtle teal background
- centered icon
- low visual prominence

No overlay text.
No floating badges.

---

## Content Hierarchy

1. Training title
2. Program name
3. Modality badge
4. Metadata
5. Actions

The title is always the first visible content element.

---

## Capacity Logic

### Hidden
If `capacity === null`

### Full
If enrollments >= capacity

### Limited
If occupancy >= 80%

### Available
Show:
`N de M cupos disponibles`

---

## Actions Area

### Enrollment Open
- primary button
- detail link

### Enrollment Closed
- text span only
- detail link remains active

Never use disabled button here.

---

## Date Format

Example:
`15 de junio de 2026`

If null:
`Fecha a confirmar`

---

## Hover Behavior

- `--shadow-md`
- `translateY(-2px)`
- transition: 150ms ease

---

## What Never Appears Inside The Card

- long descriptions
- trainers
- detailed schedules
- scope badges
- `NuevoBadge`

Those belong to detail pages.

---

# Logo — `CapturLogo`

Path:
`components/shared/CapturLogo.tsx`

---

## Sizes

| Prop | Height |
|---|---|
| `sm` | 28px |
| `md` | 36px |
| `lg` | 48px |
| `xl` | 64px |

Width always auto.

---

## Contexts

### Light
Uses:
`mix-blend-mode: multiply`

### Dark
No blend mode.

---

## Collapsed Sidebar

Replaced by:
- circular "CT"
- teal background
- centered initials

---

# Public Navigation — `PublicHeader`

Sticky header.

---

## Structure

### Left
`CapturLogo`

### Center
Navigation links.

### Right
Authentication actions.

---

## Mobile

Uses:
- hamburger menu
- Sheet component
- stacked actions

---

# Backoffice Sidebar — `BackofficeSidebar`

WordPress-inspired navigation structure.

---

## Sidebar

### Expanded
240px

### Collapsed
64px

### Transition
200ms ease

---

## Item States

### Default
Transparent background.

### Hover
Surface background.

### Active
- teal accent
- left border
- emphasized typography

---

## Collapsed State

- icons only
- tooltip visible on hover

---

# Tables

Uses shadcn/ui `Table`.

---

## TableHeader

- surface background
- uppercase labels
- strong border

---

## TableRow

- hover surface
- smooth transition
- subtle separators

---

## Action Icons

### Edit
hover teal

### Delete
hover red

---

## Empty Cell

Always:
`—`

Never leave cells visually empty.

---

## Pagination

- left → count
- right → page buttons

---

# Loading and Empty States

## Skeletons

Must mimic real layout proportions.

Examples:
- `TrainingCardSkeleton`
- `TableSkeleton`

---

## EmptyState

### Structure

- centered
- icon
- title
- description
- optional action button

Never display empty lists without context.

---

# Terminology

## Preferred Terms

| Correct | Avoid |
|---|---|
| Capacitación | Curso |
| Beneficiario | Alumno |
| Inscripción | Matrícula |
| Capacitador | Instructor |

---

## Language Rules

### Code
Always English.

### UI
Always Spanish.

---

# Decision Log

| Decision | Reason |
|---|---|
| Inter as single font | readability and consistency |
| Institutional palette | brand continuity |
| Stripe spacing model | predictable system |
| Light sidebar | accessibility |
| Fixed card thumb | stable layout |
| Title first | stronger hierarchy |
| Slug-driven badges | consistency |
| Span for closed enrollment | avoids layout problems |
| Max 3 columns | readability |
| Custom DatePicker | cross-platform consistency |
| Semantic colors separated from brand colors | prevents ambiguity |
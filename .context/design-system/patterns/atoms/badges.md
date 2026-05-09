# Pattern: Badges

Components in `components/shared/` — see individual entries below.

---

## What it is

Badges are compact, non-interactive labels that communicate the state or classification of an entity at a glance. They appear inside cards, table rows, and detail views — always as a secondary element alongside a title or name, never as the primary piece of content on a screen.

Every badge in Captur shares the same base anatomy: fixed height, horizontal padding, `label` typography, and `--radius-sm` corners. Color is the only variable between variants, and it always follows the contrast rule.

---

## Base anatomy

| Property | Value |
|---|---|
| Height | 20px |
| Padding horizontal | 8px |
| Font | `text-label` (12px, weight 500, uppercase where applicable) |
| Border radius | `--radius-sm` (4px) |
| Border | none |

---

## Contrast rule — mandatory for all badges

Badge background and badge text must **never** use the same CSS variable. The pattern is always:

- Background → `*-bg` version (semitransparent, 10% opacity)
- Text → full version (saturated)

```
✅  background: var(--color-success-bg)   text: var(--color-success)
❌  background: var(--color-success)       text: var(--color-success)
```

The only exception is `NuevoBadge`, which uses a solid background with white text.

---

## Components

### `TrainingModalityBadge`

`components/shared/TrainingModalityBadge.tsx`

Displays the delivery modality of a training. Style is determined **exclusively by slug** — never by the `name` field. A mismatch between slug and name should resolve in favor of the slug.

| Slug | Background | Text | Label |
|---|---|---|---|
| `presencial` | `--color-info-bg` | `--color-info` | "Presencial" |
| `virtual-sincronica` | `--color-brand-teal-bg` | `--color-brand-teal` | "Virtual Sincrónica" |
| `virtual-asincronica` | `--color-brand-purple-bg` | `--color-brand-purple` | "Virtual Asincrónica" |
| `virtual` | `--color-brand-teal-bg` | `--color-brand-teal` | "Virtual" |
| `hibrida` | `--color-brand-orange-bg` | `--color-brand-orange` | "Híbrida" |
| `mixta` | `--color-brand-orange-bg` | `--color-brand-orange` | "Mixta" |

**Fallback** (unknown slug): background `--color-border`, text `--color-text-secondary`, label from the `name` field.

Where it appears: `TrainingCard`, training detail page, trainings table.

---

### `TrainingStatusBadge`

`components/shared/TrainingStatusBadge.tsx`

Displays the lifecycle status of a training. Used in the backoffice — not shown on the public portal.

| Status | Background | Text | Label |
|---|---|---|---|
| `draft` | `--color-border` | `--color-text-secondary` | "Borrador" |
| `published` | `--color-success-bg` | `--color-success` | "Publicada" |
| `in_progress` | `--color-brand-teal-bg` | `--color-brand-teal` | "En curso" |
| `completed` | `--color-info-bg` | `--color-info` | "Finalizada" |
| `cancelled` | `--color-error-bg` | `--color-error` | "Cancelada" |

Where it appears: trainings table (backoffice), training detail page (backoffice).

---

### `TrainingScopeBadge`

`components/shared/TrainingScopeBadge.tsx`

Displays whether the training is internal, external, or a joint institutional initiative.

| Slug | Background | Text | Label |
|---|---|---|---|
| `interno` | `--color-info-bg` | `--color-info` | "Interno" |
| `externo` | `--color-brand-purple-bg` | `--color-brand-purple` | "Externo" |
| `articulacion` | `--color-brand-lime-bg` | `--color-brand-lime` | "Articulación Institucional" |

Where it appears: training detail page, backoffice filters.

---

### `EnrollmentStatusBadge`

`components/shared/EnrollmentStatusBadge.tsx`

Displays the current state of a beneficiary's enrollment in a training.

| State | Background | Text | Label |
|---|---|---|---|
| `pendiente` | `--color-warning-bg` | `--color-warning` | "Pendiente" |
| `aprobada` | `--color-success-bg` | `--color-success` | "Aprobada" |
| `rechazada` | `--color-error-bg` | `--color-error` | "Rechazada" |

Where it appears: enrollments table (backoffice), beneficiary's "Mis inscripciones" page.

---

### `CertificateBadge`

`components/shared/CertificateBadge.tsx`

Displays the availability status of a certificate for a given enrollment. Renders nothing when the certificate is not available — do not show a placeholder or empty space.

| State | Background | Text | Label |
|---|---|---|---|
| `disponible` | `--color-brand-lime-bg` | `--color-brand-lime` | "Certificado disponible" |
| `encuesta-pendiente` | `--color-warning-bg` | `--color-warning` | "Encuesta pendiente" |
| `no-disponible` | — | — | Does not render |

Where it appears: enrollments table (backoffice), beneficiary's "Mis certificados" page.

---

### `CupoBadge`

`components/shared/CupoBadge.tsx`

Displays a capacity warning on a training when spots are running low or fully taken. Renders nothing when capacity is available — the default state shows plain text ("N de M cupos disponibles") in the `TrainingCard`, not this badge.

| State | Background | Text | Label |
|---|---|---|---|
| `limitado` | `--color-warning-bg` | `--color-warning` | "Cupo limitado" |
| `agotado` | `--color-error-bg` | `--color-error` | "Cupo agotado" |
| `disponible` | — | — | Does not render |

Threshold for `limitado`: enrollment count ≥ 80% of capacity.
Threshold for `agotado`: enrollment count ≥ capacity.

Where it appears: `TrainingCard`, trainings table (backoffice).

---

### `NuevoBadge`

`components/shared/NuevoBadge.tsx`

Flags a training as recently published. This is the only badge that uses a solid background — it is intentionally more prominent than the others.

| Property | Value |
|---|---|
| Background | `--color-brand-orange` (solid) |
| Text | white |
| Label | "Nuevo" |

Visibility rule: render only when the training's `publishedAt` date is less than 7 days ago. Do not render if `publishedAt` is null.

Where it appears: `TrainingCard` (overlaid or alongside the title — position defined per screen).

---

## Composition rules

A single entity can display multiple badges simultaneously — for example, a training card may show a modality badge and a cupo badge at the same time. When stacking badges, use a flex row with `gap-1` (4px).

Badges never replace titles or primary content. They are always secondary to the name or heading of the entity they describe.

Do not use badges to communicate actions — badges are informational only. If something needs to be clicked, it's a button.

---

## What not to do

Do not determine badge style from the `name` field. Slugs are the source of truth for `TrainingModalityBadge` and `TrainingScopeBadge`. Names can change; slugs are stable.

Do not render `CupoBadge` or `CertificateBadge` for their `disponible` / `no-disponible` states — those states mean the badge should not appear at all.

Do not add borders to badges. The semitransparent background provides sufficient differentiation.

Do not create one-off badge styles inline. All badge variants are defined in their respective components.

---

## References

- Contrast rule: `design/patterns/design-tokens.md` → "Critical rule: badge contrast"
- Typography: `design/patterns/typography.md` → `label`
- Capacity logic in context: `design/patterns/training-card.md`

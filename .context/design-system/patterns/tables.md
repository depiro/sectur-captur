# Pattern: Tables

Built on shadcn/ui `Table` component — `components/ui/table.tsx`.
Do not implement custom table markup.

---

## What it is

Tables are the primary data display pattern in the backoffice. They show lists of records with their key attributes, status, and available actions. Every table in Captur shares the same visual structure, header style, row behavior, and action pattern.

---

## Global styles

### Table header (`TableHeader`)

| Property | Value |
|---|---|
| Background | `--color-surface` |
| Font | `text-body-sm`, weight 500, uppercase |
| Color | `--color-text-secondary` |
| Border bottom | `1px solid var(--color-border-strong)` |
| Cell padding | `12px 16px` |

### Table row (`TableRow`)

| Property | Value |
|---|---|
| Background | `--color-background` |
| Hover background | `--color-surface` |
| Border bottom | `1px solid var(--color-border)` |
| Cell padding | `14px 16px` |
| Transition | `150ms ease` |

### Empty cell

When a field has no value, render a dash — not an empty string, not a zero, not "N/A".

```tsx
<TableCell style={{ color: 'var(--color-text-disabled)' }}>—</TableCell>
```

---

## Section header

Every table is preceded by a section header with the table title and a primary action button.

```
[Table title]                    [+ New record]
heading-4, --color-text-primary  Primary sm + Plus icon
```

Layout: `flex justify-between items-center`, `mb-4`.

The action button label always uses the domain term:

```
✅ "Nueva capacitación"
✅ "Nueva inscripción"
❌ "Agregar"
❌ "Crear nuevo"
```

---

## Action icons

Inline actions on each row use icon buttons — not text buttons — to preserve horizontal space.

| Action | Icon | Default color | Hover color |
|---|---|---|---|
| Edit | `Edit2` (16px) | `--color-text-secondary` | `--color-brand-teal` |
| Delete | `Trash2` (16px) | `--color-text-secondary` | `--color-error` |

Gap between action icons: `12px`. Transition: `150ms ease`.

Action icons trigger their respective flows — Edit navigates to the edit page, Delete opens an `AlertDialog`. See `design/patterns/dialogs.md` for the destructive confirmation flow.

---

## Avatar with initials

Used in tables that list people (beneficiaries, trainers, administrators).

| Property | Value |
|---|---|
| Shape | Circle, 32×32px |
| Background | `--color-brand-teal-bg` |
| Text color | `--color-brand-teal` |
| Font | `text-label`, weight 600, uppercase |
| Initials | First letter of first name + first letter of last name |

```tsx
// Example: "María González" → "MG"
const initials = `${firstName[0]}${lastName[0]}`.toUpperCase()
```

The avatar sits to the left of the name and email in a flex row with `gap-3`.

---

## Pagination

Displayed below every table. Layout: `flex justify-between items-center`, `mt-4`.

**Left side:** result count in `text-body-sm`, `--color-text-secondary`.

```
"Mostrando 1–5 de 24 resultados"
```

**Right side:** page navigation buttons.

| Element | Variant |
|---|---|
| Inactive page number | Ghost sm |
| Active page number | Secondary sm |
| "← Anterior" / "Siguiente →" | Ghost sm |

Disable "← Anterior" on the first page. Disable "Siguiente →" on the last page.

---

## Column patterns

### Primary column (title / name)

Always flexible width (`flex` / no fixed width). Contains the main identifier of the record. Uses `text-body-md` weight 500.

Can include a secondary element below the primary text — badge, email, or subtitle — using `flex-col gap-1`.

```tsx
<TableCell>
  <div className="flex flex-col gap-1">
    <span style={{ fontWeight: 500 }}>Gestión hotelera sustentable</span>
    <TrainingStatusBadge status="published" />
  </div>
</TableCell>
```

### Badge column

Fixed width sized to the badge content. Badge renders inline — no wrapping container needed.

### Date column

Fixed width `140px`. Date formatted in short Spanish format: "15 jun 2026". No time unless the context requires it.

### Capacity column

Fixed width `130px`. Two possible states:

- Available spots: `"N / M lugares"` in `text-body-md`
- Limited or sold out: `CupoBadge` component
- No limit: `"Sin límite"` in `text-body-md`, `--color-text-secondary`

### Actions column

Fixed width `80px`. Contains icon buttons right-aligned. No column header text — leave the header cell empty.

---

## Defined tables

### Trainings table (backoffice)

Header: "Capacitaciones" + "Nueva capacitación" (Primary sm + `Plus`)

| Column | Content | Width |
|---|---|---|
| Title | `body-md` weight 500 + `TrainingStatusBadge` below | flex |
| Modality | `TrainingModalityBadge` | 160px |
| Start date | Date `body-md` | 140px |
| Capacity | Count text or `CupoBadge` | 130px |
| Actions | `Edit2` + `Trash2` | 80px |

### Enrollments table (backoffice — per training)

Header: "Inscripciones — [Training name]" + "Nueva inscripción" (Primary sm + `Plus`)

| Column | Content | Width |
|---|---|---|
| Beneficiary | Avatar + name `body-md` weight 500 + email `body-sm` secondary, flex-col | flex |
| Profile | Target audience name `body-md` | 200px |
| Enrollment date | Date `body-md` | 140px |
| Status | `EnrollmentStatusBadge` | 120px |
| Certificate | `CertificateBadge` or "—" | 160px |

New tables should be added here as they are designed in Fase 1.

---

## What not to do

Do not implement a custom table with raw `<div>` or `<ul>` markup. Always use shadcn's `Table` components.

Do not put more than two icon actions per row. If more actions are needed, use a dropdown menu (`DropdownMenu` from shadcn).

Do not show an empty table body without an `EmptyState`. See `design/patterns/empty-states.md`.

Do not show a table while data is loading — use `TableSkeleton` instead. See `design/patterns/loading-states.md`.

Do not hardcode column widths for the primary column — it must be flexible to accommodate varying content lengths.

---

## References

- Component: `components/ui/table.tsx`
- Action confirmation: `design/patterns/dialogs.md`
- Empty state: `design/patterns/empty-states.md`
- Loading state: `design/patterns/loading-states.md`
- Badge components: `design/patterns/badges.md`

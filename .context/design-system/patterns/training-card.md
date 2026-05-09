# Pattern: Training Card

Component `TrainingCard` — `components/trainings/TrainingCard.tsx`
Skeleton `TrainingCardSkeleton` — `components/trainings/TrainingCardSkeleton.tsx`

---

## What it is

`TrainingCard` is the primary unit of content on the public portal. It presents a single training with enough information for a beneficiary to decide whether to enroll or view the detail — without navigating away from the list.

It is a display component with two interactive elements: "Inscribirse" and "Ver detalle →". Everything else is informational.

---

## Component interface

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

---

## Visual structure

```
┌────────────────────────────────────┐
│                                    │
│   THUMB — fixed height 160px       │
│                                    │
├────────────────────────────────────┤
│  padding: 16px                     │
│                                    │
│  Training title          heading-4 │  ← first element, nothing above it
│  line-clamp-2                      │
│                                    │
│  Program name             body-sm  │  ← mt-0.5, --color-text-secondary
│                                    │
│  [TrainingModalityBadge]           │  ← mt-2.5
│                                    │
│  📍 Locality              body-sm  │  ← mt-2, --color-text-secondary
│  📅 Start date            body-sm  │  ← gap-y-1
│  🕒 Duration in hours     body-sm  │  ← gap-y-1
│  👥 Capacity line         body-sm  │  ← gap-y-1 (or CupoBadge)
│                                    │
│  ──────────────────────────────    │  ← --color-border, mt-3
│                                    │
│  [Inscribirse] [Ver detalle →]     │  ← mt-3, justify-between
└────────────────────────────────────┘
```

---

## Card container

| Property | Value |
|---|---|
| Border | `1px solid var(--color-border)` |
| Border radius | `--radius-md` |
| Background | `--color-background` |
| Hover shadow | `--shadow-md` |
| Hover transform | `translateY(-2px)` |
| Transition | `150ms ease` |

The hover effect applies to the entire card. It communicates interactivity without making the whole card a single clickable area — the content area has its own interactive elements.

---

## Thumb

Fixed height 160px, full width. Two mutually exclusive states.

### With image (`image !== null`)

```tsx
<img
  src={image}
  alt={title}
  style={{ width: '100%', height: '160px', objectFit: 'cover', objectPosition: 'center' }}
/>
```

### Without image (`image === null`)

```tsx
<div style={{
  height: '160px',
  backgroundColor: 'var(--color-brand-teal-bg)',
  display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center', gap: '6px'
}}>
  <GraduationCap size={28} style={{ color: 'var(--color-brand-teal)', opacity: 0.6 }} />
  <span style={{
    color: 'var(--color-brand-teal)', opacity: 0.6,
    fontSize: '10px', fontWeight: 500,
    textTransform: 'uppercase', letterSpacing: '0.05em'
  }}>
    {programs[0]?.name ?? ''}
  </span>
</div>
```

**Rules for the thumb — no exceptions:**
- Never overlay text on top of a photo thumb.
- Never float a badge over the thumb.
- The placeholder only renders when `image` is `null` — it never coexists with a photo.

---

## Content area

### Title

`text-heading-4`, `--color-text-primary`, `line-clamp-2`. The first and topmost element in the content area — nothing appears above it inside the padding area.

### Program name

`text-body-sm`, `--color-text-secondary`, `mt-0.5`. Always visible regardless of whether the card has an image or not. Renders only if `programs[0]` exists.

### Modality badge

Third element in the content area, after the program name. `mt-2.5`. Style determined exclusively by slug using `MODALITY_STYLES` — never by the `name` field. See `design/patterns/badges.md` → `TrainingModalityBadge`.

### Metadata

Four lines of supporting information, `text-body-sm`, `--color-text-secondary`, `gap-y-1` between lines. Each line has a Lucide icon (14px) to the left.

| Icon | Content | Null behavior |
|---|---|---|
| `MapPin` | `locality.name` | Always present |
| `Calendar` | "Inicio: [formatted date]" | Omit line if `startDate` is null |
| `Clock` | "[hs] horas" | Omit line if `hs` is null |
| `Users` | Capacity line (see below) | Omit line if `capacity` is null |

### Capacity line logic

The fourth metadata line has three possible states based on `capacity` and `enrollmentsCount`:

```
capacity === null
  → Do not render the capacity line at all

enrollmentsCount >= capacity
  → <CupoBadge estado="agotado" />

enrollmentsCount / capacity >= 0.8
  → <CupoBadge estado="limitado" />

otherwise
  → "[capacity - enrollmentsCount] de [capacity] cupos disponibles"
     with Users icon (14px), body-sm, --color-text-secondary
```

---

## Action area

Separated from the metadata by a full-width divider (`--color-border`, `mt-3`). Two states — **never a disabled button**.

### Enrollment open

Condition: `isRegistrationEnabled === true` AND `enrollmentsCount < capacity` (or `capacity === null`).

```
[Inscribirse]           [Ver detalle →]
Primary sm              Text link, --color-brand-teal, body-md weight 500
```

### Enrollment closed

Condition: `isRegistrationEnabled === false` OR `enrollmentsCount >= capacity`.

```
Inscripción cerrada     [Ver detalle →]
<span> body-sm          Text link, always active
--color-text-secondary
```

"Inscripción cerrada" is a `<span>` — never a button, never `disabled`, never `opacity` reduced. "Ver detalle →" is always active in both states. No `cursor-not-allowed` anywhere in the action area.

---

## Grid layout

`TrainingCard` is displayed in a 3-column responsive grid on the public portal. The grid also includes `TrainingCardSkeleton` during loading.

Minimum cases the grid must cover:
- Card without image, capacity available, enrollment open
- Card without image, capacity limited (≥80%)
- Card without image, no capacity limit
- Card with image, enrollment open
- Card with image, enrollment closed, capacity sold out
- Card with image, async modality

---

## TrainingCardSkeleton

Mirrors the exact structure of `TrainingCard` using shadcn `Skeleton` blocks. See `design/patterns/loading-states.md` → `TrainingCardSkeleton` for the full spec.

The skeleton is shown while the training list is loading. Once data resolves, it is replaced by real cards or by `EmptyState` — never by a blank area.

---

## What not to do

Do not make the entire card a single clickable element. The content area has two distinct interactions ("Inscribirse" and "Ver detalle →") that must remain independently clickable.

Do not render both thumb states simultaneously. Photo and placeholder are mutually exclusive.

Do not overlay any element — text, badge, or icon — on top of the photo thumb.

Do not use a `disabled` button for the closed enrollment state. Replace the button with the "Inscripción cerrada" span.

Do not determine modality badge style from the `name` field. Always use the slug.

---

## References

- Component: `components/trainings/TrainingCard.tsx`
- Skeleton: `components/trainings/TrainingCardSkeleton.tsx`
- Modality badge: `design/patterns/badges.md` → `TrainingModalityBadge`
- Capacity badge: `design/patterns/badges.md` → `CupoBadge`
- Loading state: `design/patterns/loading-states.md`
- Empty state: `design/patterns/empty-states.md`
- Button behavior: `design/patterns/buttons.md`

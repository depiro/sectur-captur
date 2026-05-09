# Pattern: Multiselect

Component: to be defined in `components/shared/` — name TBD during Fase 1 implementation.
Built on: `Command` + `Popover` from shadcn/ui.

---

## What it is

The multiselect allows the user to choose multiple values from a predefined list. It appears in Captur wherever a training can have more than one value for an attribute — modalities, programs, trainers, organizers, sponsors, target audiences.

It is a composed component, not a native HTML element. The visual result is a trigger field that looks like a standard input at rest, opens a searchable dropdown on click, and displays selected values as removable chips inside the field.

---

## When to use which component

| Use case | Component |
|---|---|
| One value from a fixed list | `Select` (shadcn) |
| Multiple values, short list (≤6), always visible | `ChipSelector` — see `design/patterns/chip-selector.md` |
| Multiple values, longer list (7+), hidden behind trigger | `Multiselect` with search |
| Multiple values, medium list (≤6), hidden behind trigger | `Multiselect` without search |
| Multiple values the user can also create | `Multiselect` with creatable option (define per field) |

---

## Variants

### With search

For lists with 7 or more options. Includes a search input at the top of the dropdown that filters options as the user types. Use when scanning the full list would be slow or impractical.

### Without search

For lists with 6 or fewer options. The dropdown opens directly to the full list — no search input. The user can see all options at a glance without typing.

The dropdown anatomy is identical between both variants. The only difference is the presence or absence of the search input.

---

## Anatomy

### Trigger field (both variants)

At rest, looks identical to a standard `Input` — same height (40px), border (`1px solid var(--color-border)`), background (`--color-surface`), border radius (`--radius-sm`), horizontal padding (12px).

When it has selected values, chips appear inside the field left-to-right. When the chips overflow the field width, they wrap to a second line and the field grows in height.

When focused or open: border changes to `--color-brand-teal`, focus ring `--shadow-focus`.

When in error state: border `--color-error`. `FormMessage` appears below.

### Chips

Selected values display as removable chips inside the trigger field.

| Property | Value |
|---|---|
| Height | 20px |
| Padding horizontal | 8px |
| Font | `text-label` |
| Background | `--color-brand-teal-bg` |
| Text color | `--color-brand-teal` |
| Border radius | `--radius-sm` |
| Remove icon | `X` (12px), same color as text, on the right |

Clicking the `×` removes that value immediately — no confirmation needed.

### Dropdown — with search

```
┌─────────────────────────────────────────────┐
│  [Chip ×]  [Chip ×]  placeholder           │ ← Trigger field
└─────────────────────────────────────────────┘
                    ↓ open
┌─────────────────────────────────────────────┐
│  🔍 Buscar...                               │ ← Search input
│  ─────────────────────────────────────────  │
│  ✓  Alojamiento                             │ ← Selected (checkmark)
│     Mercados internacionales                │
│     Turismo receptivo                       │
│  ✓  Cultura y patrimonio                   │ ← Selected (checkmark)
│     Gastronomía y servicios                 │
│     ...                                     │
└─────────────────────────────────────────────┘
```

### Dropdown — without search

```
┌─────────────────────────────────────────────┐
│  [Chip ×]  placeholder                      │ ← Trigger field
└─────────────────────────────────────────────┘
                    ↓ open
┌─────────────────────────────────────────────┐
│  ✓  Presencial                              │ ← Selected (checkmark)
│     Virtual Sincrónica                      │
│     Virtual Asincrónica                     │
│  ✓  Híbrida                                │ ← Selected (checkmark)
│     Mixta                                   │
│     Virtual                                 │
└─────────────────────────────────────────────┘
```

### Dropdown shared styles

| Property | Value |
|---|---|
| Background | `--color-background` |
| Border | `1px solid var(--color-border)` |
| Border radius | `--radius-md` |
| Shadow | `--shadow-md` |
| Max height | 240px with internal scroll |

**List items:** `text-body-md`, `--color-text-primary`. Padding `8px 12px`. Hover background `--color-surface`.

**Selected items:** checkmark icon (`Check`, 16px, `--color-brand-teal`) to the left of the label. No background difference — the checkmark is the only selected indicator.

**Empty search state (with search variant only):** if no options match the query, show "Sin resultados" in `text-body-sm`, `--color-text-secondary`, centered.

---

## States

| State | Behavior |
|---|---|
| Empty, unfocused | Trigger shows placeholder text in `--color-text-secondary` |
| Empty, focused | Dropdown opens, border turns teal, focus ring appears |
| With selections | Chips visible inside trigger; dropdown shows checkmarks on selected items |
| Disabled | Same as input disabled — reduced opacity, `cursor-not-allowed`, chips not removable |
| Error | Border `--color-error`, `FormMessage` below, chips remain visible |

---

## Instances in Captur

| Field | Entity | List source | Variant | Creatable |
|---|---|---|---|---|
| Programas | `Training` | `programs` | With search (~60 items) | No |
| Capacitadores | `Training` | `trainers` | With search | TBD |
| Organizadores | `Training` | `organizers` | With search | TBD |
| Auspiciantes | `Training` | `sponsors` | With search | TBD |
| Perfiles de destinatario | `Training` | `target_audiences` | With search (21 items) | No |

Modalidad uses `ChipSelector` instead — see `design/patterns/chip-selector.md`.

"Creatable" means the user can type a value that doesn't exist in the list and add it on the fly. This decision is made per field during Fase 1 — mark as TBD until confirmed.

---

## Composition in forms

The multiselect integrates with React Hook Form the same way as any other field — wrapped in `FormField` → `FormItem` → `FormLabel` + `FormControl` + `FormMessage`.

The value stored in the form state is an array of IDs (or slugs, depending on the field). The component receives the full option list as a prop and resolves display labels internally.

```ts
// Form value shape
trainers: number[]       // array of trainer IDs
trainingModalities: string[]  // array of slugs
```

---

## Composition rules

The multiselect label follows the same rules as all other form labels — above the field, `text-body-md` weight 500, asterisk for required fields.

When the selected list is long and chips overflow to multiple lines, the field grows vertically. The form layout below the field shifts down accordingly — no fixed-height containers around multiselects.

Do not use multiselect for binary choices or very short lists (2–3 items). Use checkboxes or a regular `Select` instead.

---

## What not to do

Do not use a native `<select multiple>` element. The native multi-select has poor usability on all platforms and does not match the Captur design system.

Do not use the chip style from `TrainingModalityBadge` for multiselect chips — the chips inside a multiselect field use teal consistently regardless of which entity they represent. Badge color-coding is a display pattern, not an input pattern.

Do not close the dropdown on every selection — it should stay open so the user can select multiple values in one interaction. Close on click outside or on explicit dismiss.

Do not show selected chips only in the dropdown (checked items) without also showing them in the trigger field. The trigger field must always reflect the current selection.

---

## References

- Base components: `components/ui/command.tsx`, `components/ui/popover.tsx`
- Input states: `design/patterns/inputs.md`
- Badge chips display (not the same as input chips): `design/patterns/badges.md`
- Form integration: `design/patterns/forms.md`

# Pattern: Chip Selector

Component: to be defined in `components/shared/` — name TBD during Fase 1 implementation.
Built on: `ToggleGroup` from shadcn/ui, or custom with `Toggle`.

---

## What it is

The chip selector displays all available options inline as tappable chips. The user selects or deselects by clicking directly — no dropdown, no trigger field. All options are always visible.

It is used when the list is short enough to show entirely without scrolling (up to ~8 options) and when seeing all choices at once helps the user decide.

---

## When to use chip selector vs multiselect

| Situation | Component |
|---|---|
| Short list (≤8 options), always visible, single or multiple selection | `ChipSelector` |
| Longer list (7+) or needs search | `Multiselect` with search |
| Medium list (≤6), hidden behind trigger | `Multiselect` without search |
| One value from a fixed list | `Select` (shadcn) |

The key difference from `Multiselect`: there is no trigger field and no dropdown. Everything is visible upfront.

---

## Modes

The component supports two selection modes controlled by a `mode` prop.

### `mode="multiple"` — Multi-selection

Any number of chips can be selected simultaneously. Selecting one chip does not deselect others. Example: Modalidad on the training form — a training can be Presencial and Virtual Sincrónica at the same time.

### `mode="single"` — Single selection

Only one chip can be selected at a time. Selecting a new chip deselects the previous one. Example: filtering a list by a single category.

---

## Anatomy

```
[Presencial ×]   [Virtual Sincrónica]   [Virtual Asincrónica]   [Híbrida]   [Mixta]   [Virtual]
   selected            unselected               unselected        unselected  unselected unselected
```

Chips flow horizontally, wrapping to new lines if they exceed the container width.

---

## Chip styles

### Unselected chip

| Property | Value |
|---|---|
| Height | 32px |
| Padding horizontal | 12px |
| Font | `text-body-md` |
| Background | `--color-background` |
| Text color | `--color-text-primary` |
| Border | `1px solid var(--color-border)` |
| Border radius | `--radius-full` |
| Cursor | `pointer` |

### Selected chip

| Property | Value |
|---|---|
| Background | `--color-brand-teal-bg` |
| Text color | `--color-brand-teal` |
| Border | `1px solid var(--color-brand-teal)` |
| Remove icon | `×` (12px) on the right, `mode="multiple"` only |

### Hover (unselected)

Border color transitions to `--color-brand-teal`. Background stays `--color-background`. Transition `150ms ease`.

### Disabled

Reduced opacity, `cursor-not-allowed`. Cannot be toggled.

---

## Remove icon behavior

In `mode="multiple"`, selected chips show a `×` icon on the right. Clicking it deselects that chip — same result as clicking the chip body.

In `mode="single"`, no `×` icon. The selected chip can be deselected by clicking it again, or is replaced when another chip is selected.

---

## States

| State | Behavior |
|---|---|
| No selection | All chips render in unselected style |
| With selection | Selected chips use teal bg + teal border |
| Disabled | All chips reduced opacity, not interactive |
| Error | `FormMessage` appears below the chip group |

---

## Integration with React Hook Form

Wrapped in `FormField` → `FormItem` → `FormLabel` + `FormControl` + `FormMessage`, same as all other form fields.

The form value is:
- `mode="multiple"` → `string[]` or `number[]` array of selected values
- `mode="single"` → `string` or `number` single selected value

```ts
// Multiple — training modalities
trainingModalities: string[]   // array of slugs

// Single — example filter
selectedScope: string          // single slug
```

---

## Instances in Captur

| Field | Entity | List source | Mode |
|---|---|---|---|
| Modalidad | `Training` | `training_modalities` | `multiple` |

New instances should be added here as they are identified during Fase 1.

---

## Composition rules

The label follows the same rules as all other form labels — above the chip group, `text-body-md` weight 500, asterisk for required fields.

The chip group sits where a standard input would sit in the form layout — full width, with `FormMessage` below when in error state.

Gap between chips: `8px` horizontal, `8px` vertical when wrapping.

---

## What not to do

Do not use chip selector for lists longer than ~8 options — the wrapped layout becomes unwieldy. Use `Multiselect` instead.

Do not use chip selector when the options need description or context beyond their label — a dropdown allows for richer option content.

Do not mix selected and unselected chip styles arbitrarily. The only visual difference between chips is selection state — no color-coding per option value (that is a badge display pattern, not an input pattern).

Do not hide the chip group behind a trigger or popover — if it needs a trigger, use `Multiselect`.

---

## References

- Base component: shadcn `ToggleGroup` or `Toggle`
- Multiselect (dropdown variant): `design/patterns/multiselect.md`
- Input states and form integration: `design/patterns/inputs.md`
- Modality badge display (different from chip selector): `design/patterns/badges.md` → `TrainingModalityBadge`

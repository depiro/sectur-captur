# Pattern: Loading States

Skeleton component: `Skeleton` from shadcn/ui.
Spinner: `Loader2` from Lucide React.
Specific skeletons: `TrainingCardSkeleton` — `components/trainings/TrainingCardSkeleton.tsx`.

---

## What it is

A loading state is the UI shown while an async operation is in progress. Every async operation in Captur must have a visible loading state — the user should never be left looking at a static screen without knowing something is happening.

There are three mechanisms: skeletons, button spinners, and inline spinners. Which one to use depends on the type of operation.

---

## Mechanism by operation type

| Operation | Mechanism |
|---|---|
| Initial page load | Skeleton — full page structure |
| List or table loading | Skeleton — row structure |
| Form submission | Button spinner + `disabled` |
| Inline item action (approve, delete, toggle) | Inline spinner on the element |
| Page navigation | Loading bar (top of page, if applicable) |

---

## Skeletons

Skeletons reproduce the approximate shape of the content that will appear. They are not generic gray bars — they mirror the actual layout of the component they represent, so the transition from loading to loaded feels seamless.

Use shadcn's `Skeleton` component. Do not use custom animated divs.

### Rules

- Match the structure of the real component as closely as possible — same number of lines, same relative widths, same spacing.
- Use variable widths for text lines (e.g. 60%, 80%, 45%) to look natural rather than uniform.
- Do not animate anything other than the built-in shimmer — no pulse, no fade.
- Render the same number of skeleton items as the expected content count when known (e.g. 5 skeleton rows for a paginated table showing 5 per page). When unknown, default to 6 for grids and 5 for tables.

### `TrainingCardSkeleton`

`components/trainings/TrainingCardSkeleton.tsx`

Mirrors the exact structure of `TrainingCard`:

| Element | Skeleton spec |
|---|---|
| Image area | Full width, fixed height 160px |
| Badge line | Short width ~40%, height 20px |
| Title line | Full width, height 18px |
| Program line | 60% width, height 14px |
| Modality badge | 35% width, height 20px |
| Metadata lines (×4) | Variable widths (50%, 70%, 45%, 55%), height 14px, gap between lines |
| Separator | Full width, height 1px |
| Action area | Two blocks side by side, 30% and 20% width, height 32px |

All elements use `padding: 16px` in the content area, matching `TrainingCard`.

### `TableSkeleton`

Generic table skeleton. 5 rows × 4 columns. Each cell is a `Skeleton` block with variable width to simulate text content.

| Column | Skeleton width |
|---|---|
| Column 1 (primary, e.g. title) | 70–80% |
| Column 2 (badge or secondary) | 40–50% |
| Column 3 (date or metadata) | 55–65% |
| Column 4 (actions) | 30% |

Row height matches the real table row height (padding 14px 16px).

---

## Button spinner

Used during form submission and any action triggered by a button that takes time to complete.

### Required behavior

- Button becomes `disabled` immediately on click — prevents double submission.
- Label is replaced by `Loader2` (animated, 16×16px) + present-participle text.
- Button width stays fixed — set an explicit width or `min-width` to prevent layout shift.

```tsx
<CapturButton variant="primary" size="md" disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Guardando...
    </>
  ) : (
    "Guardar"
  )}
</CapturButton>
```

### Loading text by action

| Action label | Loading text |
|---|---|
| Guardar | "Guardando..." |
| Enviar | "Enviando..." |
| Inscribirse | "Procesando inscripción..." |
| Descargar / Generar | "Generando certificado..." |
| Eliminar | "Eliminando..." |
| Publicar | "Publicando..." |

For actions not listed here, use the gerund of the verb: "Actualizando...", "Procesando...", "Cargando...".

---

## Inline spinner

Used for actions on individual items within a list or table — approve, reject, delete — where replacing the entire table with a skeleton would be disruptive.

The spinner replaces the action icon or button for that specific row while the operation is in progress. Other rows remain interactive.

Use `Loader2` at 16×16px, same color as the icon it replaces, `animate-spin`.

---

## Transition to empty state

Skeletons are shown while data is loading. Once the data resolves:

- If records exist → render the real content.
- If no records exist → render `EmptyState`. Never show a skeleton and then a blank area.

Do not show `EmptyState` while loading — the user doesn't know yet whether there's content or not.

---

## What not to do

Do not use a generic full-page spinner as the loading state for a list or table — skeletons preserve layout and prevent jarring shifts.

Do not skip the loading state for operations that feel fast locally. On slow connections or under load, even quick operations need feedback.

Do not leave a button enabled while its action is in progress. Always `disabled` during loading.

Do not create custom skeleton animations. The shadcn `Skeleton` shimmer is the only animation used.

---

## References

- Skeleton component: `components/ui/skeleton.tsx`
- TrainingCard skeleton: `components/trainings/TrainingCardSkeleton.tsx`
- Button loading behavior: `design/patterns/buttons.md` → "Loading state"
- Empty state after load: `design/patterns/empty-states.md`
- UI standards: `ui-standards.md` → "Loading states"

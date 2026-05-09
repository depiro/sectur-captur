# Pattern: Empty States

Component `EmptyState` — `components/shared/EmptyState.tsx`

---

## What it is

An empty state is the UI shown when a list or table has no content to display. Every list and table in Captur must have an explicit empty state — a blank area with no context is never acceptable.

The empty state tells the user what happened, and when there's something they can do about it, gives them a direct path forward.

---

## Component interface

```ts
interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}
```

---

## Structure and visual specs

```
         [Icon]
      Title text
   Description text
    [Action button]    ← only when action is provided
```

| Element | Spec |
|---|---|
| Layout | `flex flex-col items-center justify-center text-center` |
| Vertical padding | `py-12` (48px top and bottom) |
| Icon | 48×48px, `--color-text-secondary`, `mb-4` |
| Title | `text-heading-4`, `--color-text-primary` |
| Description | `text-body-md`, `--color-text-secondary`, `mt-1` |
| Action button | `CapturButton` Primary md, `mt-4` |

---

## Icon selection

The icon must be **representative, not decorative** — it should reinforce what the empty state is about, not just fill space. Use Lucide icons.

| Context | Icon |
|---|---|
| No trainings available | `BookOpen` |
| No enrollments for the user | `ClipboardList` |
| No search results | `SearchX` |
| No certificates | `Award` |
| No users | `Users` |
| No results after filtering | `SearchX` |

Do not reuse the same icon for different contexts. If a new empty state doesn't fit any of these, choose the closest semantic match from Lucide and document it here.

---

## Writing the content

### Title

States what is empty, not what went wrong. Short — one line maximum.

```
✅ "No hay capacitaciones disponibles"
✅ "Todavía no te inscribiste a ninguna capacitación"
✅ "No encontramos capacitaciones con ese criterio"
❌ "Error al cargar"
❌ "Sin resultados"
❌ "La lista está vacía"
```

### Description

Optional. Adds context or instructions when the title alone isn't enough. One or two sentences maximum.

```
✅ "Todavía no se publicaron capacitaciones. Volvé a revisar pronto."
✅ "Explorá la oferta formativa y encontrá la capacitación que se adapta a tu perfil."
✅ "Probá con otras palabras o remové los filtros aplicados."
```

Omit the description if the title is self-explanatory and there's nothing useful to add.

### Action

Include an action only when the user can do something meaningful from this state. The label uses the verb of the action — not "OK" or "Continuar".

```
✅ "Ver capacitaciones disponibles"
✅ "Limpiar filtros"
✅ "Nueva capacitación"
❌ "Volver"
❌ "Continuar"
```

Do not include an action if the user has no agency over the empty state (e.g. a list that only admins can populate — the beneficiary gets no action button).

---

## Instances defined in the project

| Context | Icon | Title | Description | Action |
|---|---|---|---|---|
| Public portal — no trainings published | `BookOpen` | "No hay capacitaciones disponibles" | "Todavía no se publicaron capacitaciones. Volvé a revisar pronto." | None |
| Beneficiary — no enrollments | `ClipboardList` | "Todavía no te inscribiste a ninguna capacitación" | "Explorá la oferta formativa y encontrá la capacitación que se adapta a tu perfil." | "Ver capacitaciones disponibles" |
| Search / filter — no results | `SearchX` | "No encontramos capacitaciones con ese criterio" | "Probá con otras palabras o remové los filtros aplicados." | "Limpiar filtros" |

New instances should be added to this table as they are defined during Fase 1.

---

## When to use it

Use `EmptyState` whenever a list, table, or grid renders with zero items. This includes:

- Initial state before any data has been created (backoffice lists with no records yet)
- Filtered state where active filters return no matches
- User-specific state where the authenticated user has no associated records

Do not use `EmptyState` for error states — a failed data fetch is not an empty state, it is an error. Error states have their own `ErrorState` component and different copy.

Do not use `EmptyState` inside a skeleton — skeletons are shown while data is loading, before it is known whether the result will be empty or not.

---

## What not to do

Do not show a blank area, a dash, or a zero-count label as a substitute for `EmptyState`. Every empty list needs the full component.

Do not use a generic icon like `AlertCircle` or `Info` — these communicate system state, not content absence.

Do not add multiple action buttons. One Primary action maximum. If there are two things the user could do, pick the most useful one.

---

## References

- Component: `components/shared/EmptyState.tsx`
- Icon library: Lucide React
- Button behavior: `design/patterns/buttons.md`
- UI standards: `ui-standards.md` → "Empty states"

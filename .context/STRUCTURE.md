# Captur — Context repository structure

This file answers one question: **where does this go?**

Each section describes what type of content belongs in each folder, what doesn't belong there, and a decision criterion for edge cases.

---

## `.context/design-system/`

Everything that defines **how the project looks**. This is the visual source of truth — any aesthetic decision that has already been made lives here.

### `foundations/`

The base tokens of the system: the primitive values everything else derives from. A token is a named value with semantics — not a loose hex color, but a color with a name that says when to use it.

| File | Contents |
|---|---|
| `colors.md` | Full palette with semantics: what each color means and when to use it |
| `typography.md` | Type family, size scale, weights, and when to use each level |
| `spacing.md` | Spacing system, the 4px grid, and how to apply it |
| `shadows.md` | Shadows by elevation level and focus state |
| `radius.md` | Border radius by level and when to use each |
| `variables.md` | The full `globals.css` with all CSS variables for the project |

**Does not belong here:** components, interaction patterns, user flow decisions.

### `components.md`

All UI Kit components: what variants exist, when to use each one, and what data they expect. A component is a reusable piece — `TrainingCard`, `EnrollmentStatusBadge`, `CapturButton`.

**Does not belong here:** how components combine to build a screen — that goes in `patterns/`.

### `patterns/`

How components combine to solve recurring situations. A pattern is not a component — it's a solution to a UX problem that appears across multiple screens.

Examples of what goes here: how to build a form with validation, how to structure a table with pagination and actions, how to present an empty state with a primary action.

**Does not belong here:** tokens (go in `foundations/`), individual components (go in `components.md`), interaction behaviors (go in `standards/ui-standards.md`).

### `scaffold.md`

The folder and file structure of the frontend. Where each component, page, hook, and TypeScript type lives. It's the project map so no one has to guess where to create a new file.

**Does not belong here:** the contents of the files — only their location and purpose.

---

## `.context/standards/`

Everything that defines **how we work** on the project. It doesn't describe what things look like — it describes how decisions are made, how things are named, and how the interface behaves.

### `naming-conventions.md`

The shared names across database, backend, frontend, and UI. The name originates in the database table and propagates upward without inventing synonyms at each layer.

**Goes here:** the entity table with names at each layer, derivation rules, cross-layer translation.

**Does not belong here:** design tokens, file structure, component behavior.

### `ui-standards.md`

How the interface behaves: when to use a toast vs inline error, how to show a loading state, what an empty state includes, how to confirm a destructive action. These are behavior decisions that apply across the entire platform.

**Goes here:** any UI behavior decision that was made and shouldn't be revisited for the next component.

**Does not belong here:** how something looks (that goes in `design-system/`), specific user flows (that goes in `specs/`).

### `design-workflow.md`

How the designer and developer work together. The Phase 0 and Phase 1 process, what each person documents and when, how they stay in sync.

**Goes here:** the work process, roles, sync moments.

**Does not belong here:** technical decisions, design decisions — those go in their respective files.

---

## `.context/specs/`

The project's user flows. Filled in during Phase 1, flow by flow, before anyone starts implementing.

Each file describes a flow: what the user wants to accomplish, the steps, the screens involved, the backend requirements, UX constraints, and design references.

The internal structure is one folder per module and one file per flow:

```
specs/
├── trainings/
│   ├── KER-01-portal-listing.md
│   ├── KER-02-training-detail.md
│   └── KER-03-enrollment.md
├── enrollments/
│   └── KER-XX-enrollment-management.md
└── backoffice/
    └── KER-XX-create-training.md
```

**Goes here:** user flows using the template defined in `design-workflow.md`.

**Does not belong here:** general design decisions (go in `design-system/`), UI behaviors that apply platform-wide (go in `ui-standards.md`).

---

## Decision criterion for edge cases

When it's unclear where something goes, apply these questions in order:

1. **Is it a primitive visual value?** → `design-system/foundations/`
2. **Is it a reusable component?** → `design-system/components.md`
3. **Is it a combination of components that solves a recurring problem?** → `design-system/patterns/`
4. **Is it a decision about how the UI behaves on any screen?** → `standards/ui-standards.md`
5. **Is it a naming convention across layers?** → `standards/naming-conventions.md`
6. **Is it specific to a user flow?** → `specs/[module]/[flow].md`

If still unclear after these questions, the tiebreaker is: **does it change when the design changes, or when the flow changes?** The former goes in `design-system/`, the latter in `specs/`.

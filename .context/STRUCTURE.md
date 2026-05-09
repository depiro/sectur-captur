# Captur — Context repository structure

This file answers one question: **where does this go?**

Each section describes what type of content belongs in each folder and file, what doesn't belong there, and a decision criterion for edge cases.

---

## Full structure

```
.context/
│
├── design-system/
│   ├── ui/
│   │   ├── colors.md
│   │   ├── radius.md
│   │   ├── shadows.md
│   │   ├── spacing.md
│   │   ├── typography.md
│   │   └── variables.md
│   │
│   ├── patterns/
│   │
│   ├── components.md
│   ├── foundations.md
│   └── scaffold.md
│
├── specs/
│
├── standards/
│   ├── captur-architecture-v1.md
│   ├── design-workflow.md
│   ├── naming-conventions.md
│   └── ui-standards.md
│
├── README.md
└── STRUCTURE.md
```

---

## `.context/design-system/`

Everything that defines **how the project looks**. This is the visual source of truth — any aesthetic decision that has already been made lives here.

---

### `design-system/ui/`

The primitive token files. Each file covers one dimension of the visual system. These are the lowest-level values — everything else in the design system references them.

| File | Contents |
|---|---|
| `colors.md` | Full palette with semantics: brand, semantic, and neutral colors. What each color means and when to use it. |
| `typography.md` | Type family (Inter), size scale, weights, line heights, and when to use each level. |
| `spacing.md` | The 4px spacing grid and all spacing tokens from `--space-1` to `--space-24`. |
| `shadows.md` | Shadow tokens by elevation level (`--shadow-sm`, `--shadow-md`, `--shadow-lg`) and the focus ring (`--shadow-focus`). |
| `radius.md` | Border radius tokens (`--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`) and when to use each. |
| `variables.md` | The complete `globals.css` with every CSS variable defined for the project. The single source of truth for all tokens. |

**Does not belong here:** components, layout rules, interaction patterns, user flow decisions.

---

### `design-system/foundations.md`

Behavioral and structural rules that sit above the tokens but below the components. This file defines how the system works — not just how it looks.

Covers: grid and breakpoints, component behavior rules, interaction models, date formats, terminology, and the decision log explaining why key choices were made.

Think of it as the bridge between raw tokens (`ui/`) and built components (`components.md`).

**Does not belong here:** the token values themselves (those go in `ui/`), individual component specifications (those go in `components.md`).

---

### `design-system/components.md`

All UI Kit components: what variants exist, when to use each one, what data they expect, and their visual and behavioral rules.

A component is a reusable piece — `TrainingCard`, `EnrollmentStatusBadge`, `CapturButton`, `BackofficeSidebar`.

**Does not belong here:** how components combine to build a screen — that goes in `patterns/`.

---

### `design-system/patterns/`

How components combine to solve recurring UX situations. A pattern is not a component — it's a solution to a problem that appears across multiple screens.

Examples of what goes here: how to build a validated form, how to structure a table with pagination and row actions, how to present an empty state with a primary action.

**Does not belong here:** tokens (go in `ui/`), individual components (go in `components.md`), platform-wide interaction behaviors (go in `standards/ui-standards.md`).

---

### `design-system/scaffold.md`

The folder and file structure of the frontend. Where each component, page, hook, and TypeScript type lives. It's the project map so no one has to guess where to create a new file.

**Does not belong here:** the contents of the files — only their location and purpose.

---

## `.context/standards/`

Everything that defines **how we work** on the project. Not what things look like — how decisions are made, how things are named, and how the interface behaves.

| File | Contents |
|---|---|
| `naming-conventions.md` | Shared names across DB, backend, frontend, and UI. The name originates in the DB table and propagates upward. |
| `ui-standards.md` | How the interface behaves: when to use toast vs inline error, loading states, empty states, destructive actions. |
| `design-workflow.md` | How the designer and developer work together. Phase 0 / Phase 1 process, sync moments, documentation responsibilities. |
| `captur-architecture-v1.md` | System architecture decisions and technical constraints. |

**Does not belong here:** visual tokens (go in `design-system/ui/`), specific user flows (go in `specs/`).

---

## `.context/specs/`

User flows for the project. Filled in during Phase 1, one file per flow, before anyone starts implementing.

Each file describes: what the user wants to accomplish, the steps, the screens involved, backend requirements, UX constraints, and design references.

Structure: one subfolder per module, one file per flow.

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

**Goes here:** user flows using the template defined in `standards/design-workflow.md`.

**Does not belong here:** general design decisions (go in `design-system/`), platform-wide UI behaviors (go in `standards/ui-standards.md`).

---

## Decision criterion for edge cases

When it's unclear where something goes, apply these questions in order:

1. **Is it a primitive visual value (color, size, spacing)?** → `design-system/ui/`
2. **Is it a behavioral or structural rule that applies across the system?** → `design-system/foundations.md`
3. **Is it a reusable component specification?** → `design-system/components.md`
4. **Is it a combination of components solving a recurring UX problem?** → `design-system/patterns/`
5. **Is it a decision about how the UI behaves on any screen?** → `standards/ui-standards.md`
6. **Is it a naming convention across layers?** → `standards/naming-conventions.md`
7. **Is it specific to a user flow?** → `specs/[module]/[flow].md`

If still unclear after these questions, the tiebreaker: **does it change when the design changes, or when the flow changes?** The former goes in `design-system/`, the latter in `specs/`.
# Captur — Context Repository

This repository contains the reference documentation for the **Captur** project, a tourism training system for the Secretaría de Turismo de Jujuy, Argentina.

Its purpose is to serve as the shared source of truth between team members and AI tools (Claude Code, Claude, Cursor). Everything here has been read, discussed, and agreed upon before anyone implemented it. It is not modified during execution — it is modified between the designer and the developer before execution begins.

---

## Structure

```
.context/
├── design-system/
│   ├── foundations.md          Design decisions: layout, interactions, component behavior
│   ├── components.md           UI Kit components: variants, states, when to use each
│   └── scaffold.md             Frontend folder and file structure
│
├── standards/
│   ├── naming-conventions.md   Shared names across DB, backend, frontend, and UI
│   ├── ui-standards.md         Interface behavior: toasts, errors, loading, empty states
│   └── design-workflow.md      How the designer and developer work together
│
├── specs/                      User flows — filled in during Phase 1, flow by flow
│   ├── trainings/
│   ├── enrollments/
│   └── backoffice/
│
└── README.md                   This file
```

---

## How to read this repo

### If you are an AI tool generating UI

Read in this order:

1. `design-system/foundations.md` — CSS variables, palette, typography. All colors and spacing come from here.
2. `design-system/components.md` — existing components. Before creating a new one, check if it already exists.
3. `standards/naming-conventions.md` — how things are named at each layer. The table name determines the component name.
4. `standards/ui-standards.md` — when to use toast vs inline, how a button behaves in loading state, what an empty state includes.
5. `specs/[module]/[flow].md` — the specific user flow you are about to implement.

### If you are an AI tool generating backend code or logic

1. `standards/naming-conventions.md` — TypeScript types, service names, API routes.
2. `design-system/scaffold.md` — where each file lives in the frontend.
3. `specs/[module]/[flow].md` — the flow you need to implement, with endpoints and business logic.

### If you are the designer

1. `design-system/foundations.md` — base tokens for configuring Lovable.
2. `design-system/components.md` — what already exists and does not need to be recreated.
3. `standards/design-workflow.md` — the working process, what to document after each session.

### If you are the developer

1. `standards/design-workflow.md` — how to document a user flow before the designer meeting.
2. `design-system/scaffold.md` — project file structure.
3. `specs/[module]/` — flows for the module you are implementing.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js + TypeScript |
| UI | Tailwind CSS + shadcn/ui |
| Forms | React Hook Form + Zod |
| Data fetching | TanStack Query |

---

## Terminology

Throughout the UI and all documentation:

| Use | Do not use |
|---|---|
| Capacitación | Curso |
| Beneficiario | Alumno / Usuario |
| Inscripción | Matrícula |
| Capacitador | Instructor / Docente |

---

## Project status

| Phase | Status | Includes |
|---|---|---|
| Phase 0 — UI Kit | ✅ Complete | Design system, base components, scaffold |
| Phase 1 — Flows | ⏳ In progress | Real screens connected to the backend |

The files in `design-system/` and `standards/` belong to Phase 0 and are complete. The files in `specs/` are added at the start of each Phase 1 flow.

---

## How to update this repo

- **`design-system/`** — the designer updates after each Lovable session. If a new component is created or an existing one is modified, it must be documented before closing the session.
- **`standards/`** — any change requires agreement between the designer and the developer. It is not modified unilaterally during implementation.
- **`specs/`** — the developer creates the flow file before the kick-off meeting. The designer adds the patterns they will apply during that meeting.
- **`README.md`** — updated when the repo structure or phase status changes.

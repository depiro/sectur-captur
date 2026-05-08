# Captur — Repositorio de contexto

Este repositorio contiene la documentación de referencia del proyecto **Captur**, sistema de capacitación turística de la Secretaría de Turismo de Jujuy, Argentina.

Su propósito es ser la fuente de verdad compartida entre los miembros del equipo y las herramientas de AI (Claude Code, Claude, Cursor). Todo lo que está acá se leyó, se discutió y se acordó antes de que alguien lo implementara. No se modifica durante la ejecución — se modifica entre el diseñador y el developer antes de ejecutar.

---

## Estructura

```
.context/
├── design-system/
│   ├── foundations.md          Tokens de diseño: colores, tipografía, spacing, variables CSS
│   ├── components.md           Componentes del UI Kit: variantes, estados, cuándo usar cada uno
│   └── scaffold.md             Estructura de carpetas y archivos del frontend
│
├── standards/
│   ├── naming-conventions.md   Nombres compartidos entre DB, backend, frontend y UI
│   ├── ui-standards.md         Comportamiento de la interfaz: toasts, errores, loading, estados vacíos
│   └── design-workflow.md      Cómo trabajan juntos el diseñador y el developer
│
├── specs/                      Flujos de usuario — se completa en Fase 1, flujo por flujo
│   ├── trainings/
│   ├── enrollments/
│   └── backoffice/
│
└── README.md                   Este archivo
```

---

## Cómo leer este repo

### Si sos una herramienta de AI generando UI

Leé en este orden:

1. `design-system/foundations.md` — variables CSS, paleta, tipografía. Todo color y espaciado sale de acá.
2. `design-system/components.md` — componentes existentes. Antes de crear uno nuevo, verificá si ya existe.
3. `standards/naming-conventions.md` — cómo se llaman las cosas en cada capa. El nombre de la tabla determina el nombre del componente.
4. `standards/ui-standards.md` — cuándo usar toast vs inline, cómo se comporta un botón en loading, qué incluye un estado vacío.
5. `specs/[módulo]/[flujo].md` — el flujo de usuario específico que vas a implementar.

### Si sos una herramienta de AI generando código de backend o lógica

1. `standards/naming-conventions.md` — tipos TypeScript, nombres de servicios, rutas de API.
2. `design-system/scaffold.md` — dónde vive cada archivo en el frontend.
3. `specs/[módulo]/[flujo].md` — el flujo que tenés que implementar, con endpoints y lógica de negocio.

### Si sos el diseñador

1. `design-system/foundations.md` — tokens base para configurar Lovable.
2. `design-system/components.md` — lo que ya existe y no hay que volver a crear.
3. `standards/design-workflow.md` — el proceso de trabajo, qué documentar después de cada sesión.

### Si sos el developer

1. `standards/design-workflow.md` — cómo documentar un flujo de usuario antes de la reunión con el diseñador.
2. `design-system/scaffold.md` — estructura de archivos del proyecto.
3. `specs/[módulo]/` — flujos del módulo que estás implementando.

---

## Stack del proyecto

| Capa | Tecnología |
|---|---|
| Frontend | Next.js + TypeScript |
| UI | Tailwind CSS + shadcn/ui |
| Forms | React Hook Form + Zod |
| Data fetching | TanStack Query |

---

## Terminología

En toda la UI y en toda la documentación:

| Usar | No usar |
|---|---|
| Capacitación | Curso |
| Beneficiario | Alumno / Usuario |
| Inscripción | Matrícula |
| Capacitador | Instructor / Docente |

---

## Estado del proyecto

| Fase | Estado | Qué incluye |
|---|---|---|
| Fase 0 — UI Kit | ✅ Completa | Design system, componentes base, scaffold |
| Fase 1 — Flujos | ⏳ En curso | Pantallas reales conectadas al backend |

Los archivos de `design-system/` y `standards/` corresponden a Fase 0 y están completos. Los archivos de `specs/` se van agregando al inicio de cada flujo de Fase 1.

---

## Cómo actualizar este repo

- **`design-system/`** — el diseñador actualiza después de cada sesión en Lovable. Si se crea un componente nuevo o se modifica uno existente, se documenta antes de cerrar la sesión.
- **`standards/`** — cualquier cambio requiere acuerdo entre diseñador y developer. No se modifica unilateralmente durante la implementación.
- **`specs/`** — el developer crea el archivo del flujo antes de la reunión de kick-off. El diseñador agrega los patrones que va a aplicar durante esa reunión.
- **`README.md`** — se actualiza cuando cambia la estructura del repo o el estado de las fases.

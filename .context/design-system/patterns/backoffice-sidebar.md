# Pattern: Backoffice Sidebar

Components: `BackofficeSidebar` — `components/layout/BackofficeSidebar.tsx`
           `BackofficeHeader` — `components/layout/BackofficeHeader.tsx`
Layout: `app/backoffice/layout.tsx`

---

## What it is

The backoffice sidebar is the primary navigation structure for the admin area. It is a fixed vertical panel on the left side of the screen, visible on every backoffice route. It works in tandem with `BackofficeHeader`, which sits at the top and shares the toggle control.

Both components are only used inside `app/backoffice/layout.tsx` — never in public or auth routes.

---

## Component interfaces

```ts
interface BackofficeSidebarProps {
  collapsed: boolean
  onToggle: () => void
  activeItem: string  // current pathname, e.g. '/backoffice/capacitaciones'
}

interface BackofficeHeaderProps {
  onToggleSidebar: () => void
  sidebarCollapsed: boolean
  pageTitle: string  // derived from pathname in the layout, passed as prop
}
```

`collapsed` state is owned by `app/backoffice/layout.tsx`. Both `BackofficeSidebar` and `BackofficeHeader` receive it as props — neither component manages it internally.
---

## Sidebar visual specs

### Container

| Property | Value |
|---|---|
| Width expanded | 240px |
| Width collapsed | 64px |
| Transition | `200ms ease` |
| Background | `--color-sidebar-bg` |
| Border right | `1px solid var(--color-sidebar-border)` |
| Position | Fixed, full height |

### Header

Logo text "CAPTUR" in `text-heading-3`, `--color-brand-teal`. Border bottom `1px solid var(--color-sidebar-border)`, padding `16px`.

When collapsed, the logo text is hidden — only the icon remains (or a compact logo mark if defined).

### Nav item states

**Default:**

| Property | Value |
|---|---|
| Background | Transparent |
| Text | `--color-sidebar-text`, `text-body-md`, weight 400 |
| Icon | `--color-sidebar-icon` |
| Padding | `8px 12px` |
| Border radius | `--radius-md` |

**Hover:**

| Property | Value |
|---|---|
| Background | `--color-sidebar-hover-bg` |
| Transition | `150ms ease` |

**Active:**

| Property | Value |
|---|---|
| Background | `--color-sidebar-active-bg` |
| Text | `--color-sidebar-active-text`, weight 500 |
| Icon | `--color-sidebar-active-icon` |
| Border left | `3px solid var(--color-sidebar-active-border)` |
| Border radius | `0 8px 8px 0` (right side rounded, left side flush) |

---

## Collapsed state

When `collapsed === true`:

- Sidebar width is 64px.
- Only icons are visible — labels are hidden.
- Each icon shows a `Tooltip` (shadcn) on hover with the item label. Tooltip background `--color-text-primary`, text white.
- The header shows only the icon mark — "CAPTUR" text is hidden.

Icons are centered horizontally in the 64px width.

---

## Navigation structure

Flat list — no groups, no separators between items. Exactly 5 items in this order:

```
Icon              Label              Route
LayoutDashboard   Dashboard          /backoffice
BookOpen          Capacitaciones     /backoffice/capacitaciones
User              Beneficiarios      /backoffice/beneficiarios
ChartBar          Reportes           /backoffice/reportes
Settings          Configuración      /backoffice/configuracion
```

All icons are from Lucide React.

Active item is determined by comparing `activeItem` (the current pathname) to each item's `href`. For Configuración, use `activeItem.startsWith('/backoffice/configuracion')` to match all sub-routes. For all other items, use exact match.

The `pageTitle` passed to `BackofficeHeader` is derived in the layout using this map:

```ts
const PAGE_TITLES: Record<string, string> = {
  '/backoffice': 'Dashboard',
  '/backoffice/capacitaciones': 'Capacitaciones',
  '/backoffice/capacitaciones/nueva': 'Nueva capacitación',
  '/backoffice/capacitaciones-externas': 'Capacitaciones externas',
  '/backoffice/programas': 'Programas',
  '/backoffice/beneficiarios': 'Beneficiarios',
  '/backoffice/capacitadores': 'Capacitadores',
  '/backoffice/administradores': 'Administradores',
  '/backoffice/certificados': 'Certificados',
  '/backoffice/encuestas': 'Encuestas',
  '/backoffice/slideshow': 'Slideshow',
  '/backoffice/preguntas-frecuentes': 'Preguntas frecuentes',
  '/backoffice/configuracion/modalidades': 'Modalidades',
  '/backoffice/configuracion/organizadores': 'Organizadores',
  '/backoffice/configuracion/tipos-destinatario': 'Tipos de destinatario',
  '/backoffice/configuracion/ambitos': 'Ámbitos',
}
// For dynamic routes not in the map (e.g. /backoffice/capacitaciones/[id]),
// fall back to deriving the title from the previous path segment.
```

---

## BackofficeHeader

The top bar of the backoffice layout. Sits above the main content area, spanning the full width to the right of the sidebar.

### Structure

```
[Toggle icon]      Page title                      [Avatar  Name  ▾]
←── left ───       ←── center ──────────────────   ←── right ──────→
```

### Specs

| Property | Value |
|---|---|
| Background | `--color-background` |
| Border bottom | `1px solid var(--color-border)` |
| Height | 56px |

**Left — toggle:**
`PanelLeftClose` when sidebar is expanded, `PanelLeftOpen` when collapsed. Icon color `--color-text-secondary`. Clicking calls `onToggleSidebar`.

**Center — page title:**
`pageTitle` prop received from the layout. `text-heading-4`, `--color-text-primary`. The layout derives the title from the pathname using `PAGE_TITLES` and passes it down — the header does not read the pathname itself.

**Right — user menu:**
Avatar (32px circle, `--color-brand-teal-bg`, initials `"MR"` in `--color-brand-teal`, `text-label` weight 600) + name `"María Rodríguez"` in `text-body-md` + `ChevronDown` icon.

The avatar and name are hardcoded placeholders in Fase 0. They will be replaced with real user data from the auth context in Fase 1.

Clicking opens a `DropdownMenu` (shadcn) with:

| Item | Action |
|---|---|
| Mi perfil | TBD — Fase 1 |
| Cerrar sesión | Redirect to `/login` |

---

## Role-based visibility

Not all nav items are visible to all roles. Visibility rules are enforced at the layout level — items the user cannot access are hidden entirely, not disabled.

| Role | Access |
|---|---|
| `ADMIN` | All items |
| `EDITOR` | Capacitaciones, Capacitaciones externas — TBD during Fase 1 |
| `TRAINER` | TBD |
| `USER` | No backoffice access |

Exact visibility rules per role are defined during Fase 1. Mark as TBD until confirmed.

Do not show a nav item and then redirect with an access denied error. If the user can't access a section, the item should not appear in the sidebar.

---

## Layout composition

The backoffice layout (`app/backoffice/layout.tsx`) composes the sidebar and header together:

```
┌──────────────────────────────────────────────┐
│  BackofficeHeader (full width, top)          │
├──────────────┬───────────────────────────────┤
│              │                               │
│  Backoffice  │   Page content                │
│  Sidebar     │   (children)                  │
│  (fixed)     │                               │
│              │                               │
└──────────────┴───────────────────────────────┘
```

The main content area has `margin-left` equal to the sidebar width (240px expanded, 64px collapsed), transitioning with the sidebar. It also has `padding-top` equal to the header height (56px). Background `--color-surface`, `overflow-y: auto`. Each page manages its own internal padding (`28px 32px`).

---

## What not to do

Do not use `BackofficeSidebar` or `BackofficeHeader` outside of `app/backoffice/layout.tsx`.

Do not manage `collapsed` state inside the sidebar component — it is owned by the layout.

Do not show disabled nav items for routes the user cannot access — hide them entirely.

Do not hardcode the active item — always derive it from `usePathname()`.

Do not add nav items without updating the navigation structure table in this document.

---

## References

- Components: `components/layout/BackofficeSidebar.tsx`, `components/layout/BackofficeHeader.tsx`
- Layout: `app/backoffice/layout.tsx`
- Routes: `captur-scaffold.md` → `backoffice/`
- Tooltip (collapsed state): `components/ui/tooltip.tsx`
- Dropdown (user menu): `components/ui/dropdown-menu.tsx`
- Design tokens (sidebar-specific): `design/patterns/design-tokens.md` → "Colors — Sidebar"

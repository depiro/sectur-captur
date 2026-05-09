# Pattern: Public Header

Component `PublicHeader` — `components/layout/PublicHeader.tsx`
Layout: `app/(public)/layout.tsx`

---

## What it is

`PublicHeader` is the top navigation bar of the public portal. It is visible to all users — authenticated and unauthenticated — on every public-facing page. It is not used in the backoffice, auth pages, or the beneficiary area.

---

## Structure

```
[Logo CAPTUR]   Inicio   Capacitaciones   Preguntas frecuentes      [Ingresar]  [Registrarse]
←── brand ───   ←────────── nav links ──────────────────────────    ←── auth actions ────────→
```

Content is centered with `max-width: 1200px`. Layout: `flex justify-between items-center`.

---

## Visual specs

### Container

| Property | Value |
|---|---|
| Background | `--color-background` |
| Border bottom | `1px solid var(--color-border)` |
| Position | `sticky top-0` |
| Z-index | High enough to sit above all page content |
| Height | 64px |

### Logo

Text "CAPTUR" — `text-heading-3`, `--color-brand-teal`. Links to `/`.

No image logo in the header — text only. If an image logo is added in the future, update this document before implementing.

### Nav links

| Property | Value |
|---|---|
| Font | `text-body-md` |
| Color default | `--color-text-primary` |
| Color hover | `--color-brand-teal` |
| Color active | `--color-brand-teal`, weight 500 |
| Transition | `150ms ease` |

Active state is determined by the current route. Use Next.js `usePathname()` to compare.

Links:

| Label | Route |
|---|---|
| Inicio | `/` |
| Capacitaciones | `/(public)/capacitaciones` |
| Preguntas frecuentes | `/(public)/preguntas-frecuentes` |

### Auth actions

Two buttons, always visible regardless of auth state during Fase 0. In Fase 1, these are replaced by the user avatar and dropdown when authenticated.

| Button | Variant | Size | Route |
|---|---|---|---|
| Ingresar | Ghost | md | `/(auth)/login` |
| Registrarse | Primary | md | `/(auth)/registro` |

---

## Mobile (< 640px)

The nav links and auth buttons collapse. A `Menu` icon (Lucide, 24px, `--color-text-primary`) appears on the right.

Clicking the icon opens a `Sheet` (shadcn) from the left side with:
- Logo at the top of the sheet
- Nav links stacked vertically, same style as desktop
- "Ingresar" and "Registrarse" buttons at the bottom, full width, stacked vertically

The `Sheet` closes on link click or on clicking outside.

---

## Authenticated state (Fase 1)

When a beneficiary is logged in, the auth buttons are replaced by:
- Avatar with initials (32px circle, `--color-brand-teal-bg`, `--color-brand-teal`)
- User name in `text-body-md`
- `ChevronDown` icon
- Dropdown with: "Mi perfil" → `/(beneficiario)/mi-perfil`, "Mis inscripciones" → `/(beneficiario)/mis-inscripciones`, "Cerrar sesión"

This state is not implemented in Fase 0 — document the spec here for reference during Fase 1.

---

## Navigation behavior

After login: redirect to `/(beneficiario)/mis-inscripciones`. The header updates to the authenticated state.

After logout: redirect to `/`. The header returns to the unauthenticated state.

After registering: redirect to `/(beneficiario)/mis-inscripciones` with a success toast ("Cuenta creada. ¡Bienvenido a Captur!").

---

## What not to do

Do not use `PublicHeader` in backoffice routes — those use `BackofficeHeader` and `BackofficeSidebar`.

Do not use `PublicHeader` in auth routes (`/login`, `/registro`, `/recuperar-password`) — those pages have no header.

Do not modify the sticky positioning or z-index — the header must always sit above page content including modals and dropdowns.

Do not add nav links without updating this document first.

---

## References

- Component: `components/layout/PublicHeader.tsx`
- Layout: `app/(public)/layout.tsx`
- Auth routes: `captur-scaffold.md` → `(auth)/`
- Beneficiary routes: `captur-scaffold.md` → `(beneficiario)/`
- Sheet component: `components/ui/sheet.tsx`

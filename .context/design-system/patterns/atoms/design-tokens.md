# Pattern: Design Tokens

Source file: `app/globals.css` → `:root`
Typography config: `tailwind.config.ts` → `fontSize`

---

## What it is

Design tokens are the named variables that store every visual decision in Captur — colors, spacing, border radius, shadows. They live in CSS custom properties defined in `:root` and are consumed by all components through `var(--token-name)`.

No component hardcodes a hex value, a pixel size, or a shadow definition. If a value isn't in this list, it doesn't exist in the system.

---

## Colors — Brand

The four brand colors of Captur. Each has a full version (used for text and icons) and a `*-bg` version (used for backgrounds — semitransparent, for use on white surfaces).

| Token | Value | Use |
|---|---|---|
| `--color-brand-teal` | `#2A9D9D` | Primary brand color. Buttons, active states, links, focus rings. |
| `--color-brand-teal-dark` | `#1F7A7A` | Hover state for teal interactive elements. |
| `--color-brand-teal-bg` | `rgba(42, 157, 157, 0.1)` | Badge backgrounds, sidebar active bg, placeholder thumbs. |
| `--color-brand-orange` | `#E8762C` | Accent. "Nuevo" badge solid background, highlights. |
| `--color-brand-orange-bg` | `rgba(232, 118, 44, 0.1)` | Badge background for Híbrida / Mixta modalities. |
| `--color-brand-purple` | `#7B5EA7` | Accent. Badge text for Virtual Asincrónica and Externo scope. |
| `--color-brand-purple-bg` | `rgba(123, 94, 167, 0.1)` | Badge background for Virtual Asincrónica and Externo scope. |
| `--color-brand-lime` | `#8DC63F` | Accent. Badge text for Articulación Institucional and certificate available. |
| `--color-brand-lime-bg` | `rgba(141, 198, 63, 0.1)` | Badge background for Articulación Institucional and certificate available. |

---

## Colors — Semantic

Semantic colors communicate system states — success, error, warning, info. They follow the same full + `*-bg` pattern as brand colors.

| Token | Value | Use |
|---|---|---|
| `--color-success` | `#16A34A` | Success text/icon. Published status badge, approved enrollment badge. |
| `--color-success-bg` | `rgba(22, 163, 74, 0.1)` | Success badge background. |
| `--color-error` | `#DC2626` | Error text/icon. Destructive button bg, form error messages, cancelled status badge. |
| `--color-error-bg` | `rgba(220, 38, 38, 0.1)` | Error badge background. Rejected enrollment, cancelled training, sold-out capacity. |
| `--color-warning` | `#D97706` | Warning text/icon. Pending enrollment badge, limited capacity badge, warning toasts. |
| `--color-warning-bg` | `rgba(217, 119, 6, 0.1)` | Warning badge background. |
| `--color-info` | `#2563EB` | Info text/icon. In-person modality badge, completed status badge. |
| `--color-info-bg` | `rgba(37, 99, 235, 0.1)` | Info badge background. |

---

## Colors — Neutral

Neutrals define surfaces, borders, and text. They do not carry semantic meaning on their own.

| Token | Value | Use |
|---|---|---|
| `--color-background` | `#FFFFFF` | Page and card backgrounds. |
| `--color-surface` | `#F9FAFB` | Secondary surfaces — table header bg, input bg, sidebar hover bg. |
| `--color-border` | `#E5E7EB` | Default borders — cards, table rows, dividers. |
| `--color-border-strong` | `#D1D5DB` | Emphasized borders — table header bottom border. |
| `--color-text-primary` | `#111827` | Primary text — titles, body content, input values. |
| `--color-text-secondary` | `#6B7280` | Secondary text — metadata, helper text, placeholders, empty state descriptions. |
| `--color-text-disabled` | `#9CA3AF` | Disabled text and empty cell placeholders ("—"). |
| `--color-overlay` | `rgba(0, 0, 0, 0.5)` | Dialog and modal backdrop. |

---

## Colors — Sidebar

Sidebar has its own token set to allow independent theming without affecting global neutrals.

| Token | Value | Use |
|---|---|---|
| `--color-sidebar-bg` | `#FFFFFF` | Sidebar background. |
| `--color-sidebar-border` | `#E5E7EB` | Sidebar right border and header bottom border. |
| `--color-sidebar-text` | `#374151` | Default nav item text. |
| `--color-sidebar-text-muted` | `#9CA3AF` | Muted sidebar text. |
| `--color-sidebar-icon` | `#6B7280` | Default nav item icon. |
| `--color-sidebar-hover-bg` | `#F3F4F6` | Nav item hover background. |
| `--color-sidebar-active-bg` | `rgba(42, 157, 157, 0.08)` | Active nav item background. |
| `--color-sidebar-active-text` | `#2A9D9D` | Active nav item text. |
| `--color-sidebar-active-icon` | `#2A9D9D` | Active nav item icon. |
| `--color-sidebar-active-border` | `#2A9D9D` | Active nav item left border accent. |
| `--color-sidebar-group-label` | `#9CA3AF` | Group label text (CAPACITACIONES, USUARIOS, etc.). |

---

## Spacing

Spacing tokens follow a 4px base unit. Use these for padding, margin, and gap — do not use arbitrary Tailwind spacing values.

| Token | Value | Tailwind equivalent |
|---|---|---|
| `--space-1` | 4px | `p-1`, `gap-1` |
| `--space-2` | 8px | `p-2`, `gap-2` |
| `--space-3` | 12px | `p-3`, `gap-3` |
| `--space-4` | 16px | `p-4`, `gap-4` |
| `--space-5` | 20px | `p-5`, `gap-5` |
| `--space-6` | 24px | `p-6`, `gap-6` |
| `--space-8` | 32px | `p-8`, `gap-8` |
| `--space-10` | 40px | `p-10`, `gap-10` |
| `--space-12` | 48px | `p-12`, `gap-12` |
| `--space-16` | 64px | `p-16`, `gap-16` |
| `--space-24` | 96px | `p-24`, `gap-24` |

Standard Tailwind spacing utilities map directly to these values — use Tailwind classes in JSX. Use `var(--space-*)` only in `style` props when Tailwind can't reach the property.

---

## Border radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | Badges, inputs, checkboxes, small UI elements. |
| `--radius-md` | 8px | Cards, dialogs, dropdowns, nav items. |
| `--radius-lg` | 12px | Large surface containers, modals. |
| `--radius-full` | 9999px | Pill shapes — avatars, fully rounded buttons if ever needed. |

---

## Shadows

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation — dropdowns, tooltips at rest. |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Card hover state. Applied on `TrainingCard` hover with `translateY(-2px)`. |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Dialogs and modals. |
| `--shadow-focus` | `0 0 0 3px rgba(42,157,157,0.3)` | Focus ring for interactive elements — inputs, buttons. |

---

## Critical rule: badge contrast

Badge text and badge background must **never** use the same token. The pattern is always:

- Background → `*-bg` version (semitransparent)
- Text → full version (saturated)

```
✅  background: var(--color-brand-teal-bg)   text: var(--color-brand-teal)
❌  background: var(--color-brand-teal)       text: var(--color-brand-teal)
```

This applies to every badge in the system: `TrainingModalityBadge`, `TrainingStatusBadge`, `TrainingScopeBadge`, `EnrollmentStatusBadge`, `CertificateBadge`, `CupoBadge`. The only exception is `NuevoBadge`, which uses a solid `--color-brand-orange` background with white text.

---

## What not to do

Do not use hex values, `rgb()`, or hardcoded colors anywhere in component code. Every color reference must be `var(--color-*)`.

Do not create new tokens without adding them to `globals.css` and documenting them here. One-off colors don't exist in this system.

Do not use the `*-bg` semitransparent tokens on non-white surfaces — they are calibrated for `#FFFFFF` backgrounds. On colored or dark surfaces they will not render correctly.

---

## References

- Token definitions: `app/globals.css`
- Typography scale: `tailwind.config.ts` → `fontSize` (Minor Third, ratio 1.200)
- Typography usage: `design/patterns/typography.md`
- Badge contrast rule applied: `design/patterns/badges.md`

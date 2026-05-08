# Captur — Colors

## Usage Philosophy

The palette is derived from Captur's institutional identity. Color has a structural function: it sections, categorizes, and guides. It is not decorative.

The platform is predominantly white. Color appears intentionally in:
- Primary actions
- Category labels
- Highlighted section backgrounds

### Critical Badge Contrast Rule

Text never uses the same variable as the background.

Correct:
- Background → `*-bg`
- Text → saturated base color

Incorrect:
- Same variable for both text and background

---

# Brand Colors

## `--color-brand-teal`
`#2A9D9D`

### Meaning
Captur institutional identity color.

### Usage
- Main navigation
- Active sidebar item
- Primary buttons
- Hover links
- Institutional branding

### Avoid
- Long background sections
- Body text
- Status badges

---

## `--color-brand-orange`
`#E8762C`

### Meaning
Energy and novelty accent.

### Usage
- "Nuevo" badge
- Secondary CTA on dark backgrounds

### Avoid
- Error states
- Navigation
- Body text
- Capacity indicators

---

## `--color-brand-purple`
`#7B5EA7`

### Meaning
Categorization and asynchronous modalities.

### Usage
- Virtual asynchronous badge
- External scope badge
- Advanced settings accents

### Avoid
- Primary actions
- Success/error states

---

## `--color-brand-lime`
`#8DC63F`

### Meaning
Achievement and confirmation.

### Usage
- Certificate badge
- Institutional articulation badge

### Avoid
- Primary actions
- Body text
- Large background areas

---

# Semantic Colors

## `--color-success`
`#16A34A`

Used for:
- Success toast
- Approved enrollment
- Published state

---

## `--color-error`
`#DC2626`

Used for:
- Errors
- Destructive actions
- Rejected/cancelled states
- Full capacity

---

## `--color-warning`
`#D97706`

Used for:
- Pending states
- Limited capacity
- Incomplete information

---

## `--color-info`
`#2563EB`

Used for:
- Informational context
- Internal scope
- In-person modality
- Completed states

---

# Neutral Colors

| Token | Value | Usage |
|---|---|---|
| `--color-background` | `#FFFFFF` | Main backgrounds |
| `--color-surface` | `#F9FAFB` | Inputs, hover states |
| `--color-border` | `#E5E7EB` | Borders and separators |
| `--color-border-strong` | `#D1D5DB` | Strong borders |
| `--color-text-primary` | `#111827` | Headings |
| `--color-text-secondary` | `#6B7280` | Supporting text |
| `--color-text-disabled` | `#9CA3AF` | Disabled elements |
| `--color-overlay` | `rgba(0,0,0,0.5)` | Modal overlay |

---

# Sidebar Colors

| Token | Value |
|---|---|
| `--color-sidebar-bg` | `#FFFFFF` |
| `--color-sidebar-border` | `#E5E7EB` |
| `--color-sidebar-text` | `#374151` |
| `--color-sidebar-icon` | `#6B7280` |
| `--color-sidebar-hover-bg` | `#F3F4F6` |
| `--color-sidebar-active-bg` | `rgba(42,157,157,0.08)` |
| `--color-sidebar-active-text` | `#2A9D9D` |
| `--color-sidebar-active-icon` | `#2A9D9D` |
| `--color-sidebar-active-border` | `#2A9D9D` |
| `--color-sidebar-group-label` | `#9CA3AF` |

---

# Section Background Rules

- Maximum two colored sections per page
- Only:
  - `--color-brand-teal`
  - `--color-surface`
- Never stack colored sections consecutively
- Footer uses darkened teal + white text
# Pattern: Inputs

Built on shadcn/ui primitives — `Input`, `Textarea`, `Select`, `Checkbox`, `Label`, `FormMessage`.
Form state managed with **React Hook Form** + **Zod**.

---

## What it is

Input components are the building blocks of every form in Captur. They share a consistent visual language — same height, border, background, and focus style — so the user's eye never has to relearn where to look or what to do.

This document covers the atoms: the individual field components and their states. Full form composition (validation behavior, server errors, submit flow) is covered in `design/patterns/forms.md`.

---

## Base input

The foundation for `Input`, `Select`, and `Textarea`.

| Property | Value |
|---|---|
| Height | 40px (Input, Select) |
| Border | `1px solid var(--color-border)` |
| Border radius | `--radius-sm` (4px) |
| Background | `--color-surface` |
| Padding horizontal | 12px |
| Font | `text-body-md` |
| Placeholder color | `--color-text-secondary` |

---

## States

Every input has five states. All must be accounted for in implementation.

### Default

Border `--color-border`, background `--color-surface`. No shadow.

### With value

Same as default. The value text uses `--color-text-primary`.

### Focus

Border changes to `--color-brand-teal`. Focus ring added: `--shadow-focus` (`0 0 0 3px rgba(42,157,157,0.3)`). No background change.

```css
border-color: var(--color-brand-teal);
box-shadow: var(--shadow-focus);
```

### Error

Border changes to `--color-error`. `FormMessage` appears below the field. Focus ring on a field in error state uses the error color — do not show the teal focus ring on an errored field.

```css
border-color: var(--color-error);
```

### Disabled

Opacity reduced, `cursor-not-allowed`. The field is not interactive and communicates it visually. Do not use disabled to hide fields that don't apply — hide them entirely instead.

---

## Label

Always placed above the field — never inside, never to the side.

| Property | Value |
|---|---|
| Font | `text-body-md`, weight 500 |
| Color | `--color-text-primary` |
| Required indicator | Red asterisk `*` in `--color-error`, after the label text |

```tsx
<FormLabel>Email <span style={{ color: 'var(--color-error)' }}>*</span></FormLabel>
```

Optional fields have no indicator — the absence of an asterisk means optional.

---

## FormMessage

The inline error message that appears below a field when validation fails.

| Property | Value |
|---|---|
| Font | `text-body-sm` |
| Color | `--color-error` |
| Position | Immediately below the input, no gap |

Always use shadcn's `FormMessage` component — do not create custom error message elements. `FormMessage` is always present in the JSX even when empty, so it doesn't cause layout shift when it appears.

```tsx
<FormField
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage /> {/* always present */}
    </FormItem>
  )}
/>
```

---

## Input

Standard single-line text field. Used for names, DNI, email, phone, sede, and any short free-text value.

Nothing special beyond the base states above.

---

## Textarea

Multi-line text field. Used for descriptions, notes, and longer free-text content.

| Property | Value |
|---|---|
| Minimum height | 96px |
| Resize | Vertical only (`resize-y`) |
| All other styles | Same as base input |

---

## Select

Dropdown for choosing from a fixed set of options. Visually identical to `Input` at rest — same height, border, background, padding, and font.

### Chained selects (geographic cascade)

Province → Department → Municipality → Locality form a dependent chain. Each level is disabled until the level above it has a value selected.

Rules:
- **Province** is always enabled.
- **Department** enables only after a province is selected. Its options are filtered to that province.
- **Municipality** enables only after a department is selected.
- **Locality** enables only after a municipality is selected.

When a higher-level select changes, all downstream selects reset to their empty state and disable again.

Do not allow the user to select a department without a province — the disabled state makes this impossible without a tooltip.

---

## Checkbox

Used for boolean fields and multi-select option lists.

| Property | Value |
|---|---|
| Size | 16×16px |
| Border radius | `--radius-sm` (4px) |
| Checked color | `--color-brand-teal` |
| Label | Always to the right, `text-body-md` |

The clickable area includes both the checkbox and its label — wrap both in the `FormLabel` or use the shadcn `Checkbox` pattern which handles this.

---

## Composition rules

Fields are always wrapped in `FormField` → `FormItem` → `FormLabel` + `FormControl` + `FormMessage`. This structure is non-negotiable — it keeps validation, accessibility, and error display consistent across all forms.

Field width follows the form grid — full width by default. Two fields can share a row (e.g. first name + last name, start date + start time) using a two-column grid. Never use three fields in a row.

Group related fields visually with a section heading (`text-heading-4`) and a separator when the form is long. Do not let a long form run as a single undifferentiated list of fields.

---

## Validation behavior

Validation triggers on submit, not on blur. The exception: if a field has already shown an error (post-submit), it re-validates on change so the user gets immediate feedback as they correct it.

Validation messages are written in Spanish, second person, without exclamation marks:

```
✅ "Ingresá un email válido"
✅ "Este campo es obligatorio"
✅ "La contraseña debe tener al menos 8 caracteres"
❌ "Email inválido!"
❌ "Required"
```

---

## What not to do

Do not use `placeholder` as a substitute for `Label`. The placeholder disappears on focus and cannot communicate required state or field purpose reliably.

Do not style inputs directly with Tailwind border or background utilities. All input states are defined through the shadcn component and CSS variables — overriding them inline breaks consistency.

Do not show a toast for client-side validation errors. Inline `FormMessage` is the correct mechanism. Toasts are for server errors only — see `ui-standards.md`.

Do not enable downstream selects in the geographic cascade before their parent has a value.

---

## References

- Components: `components/ui/input.tsx`, `components/ui/select.tsx`, `components/ui/textarea.tsx`, `components/ui/checkbox.tsx`
- Form composition: `design/patterns/forms.md`
- Validation and error behavior: `ui-standards.md` → "Form errors"
- Focus and shadow tokens: `design/patterns/design-tokens.md` → `--shadow-focus`

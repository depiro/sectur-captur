# Pattern: Forms

Stack: **React Hook Form** + **Zod** for all forms.
Components: shadcn/ui `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`.

---

## What it is

This document covers full form composition — how fields are assembled into a complete form, how validation behaves, how errors surface, and how submission is handled. Individual field components (Input, Select, Textarea, Checkbox, Multiselect, ChipSelector) are documented in their own files.

---

## Stack rules

Every form in Captur uses React Hook Form with a Zod schema. No form manages its own state with `useState`. No form uses uncontrolled inputs outside of React Hook Form.

```tsx
const form = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: { ... },
})
```

---

## Field wrapper structure

Every field — without exception — uses this structure:

```tsx
<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Field label</FormLabel>
      <FormControl>
        {/* Input, Select, Textarea, Checkbox, etc. */}
      </FormControl>
      <FormMessage /> {/* always present */}
    </FormItem>
  )}
/>
```

Do not skip `FormMessage`. Do not skip `FormLabel`. Do not manage field state outside of `field` from `render`.

---

## Validation behavior

### Trigger

Validation triggers **on submit**. Fields do not validate on blur or on change for a first-time interaction.

Exception: once a field has shown an error (after a failed submit), it re-validates **on change** — so the user gets immediate feedback as they correct it. This is React Hook Form's default `mode: 'onSubmit'` + `reValidateMode: 'onChange'` behavior.

### Schema

Each form has a dedicated Zod schema. The schema lives in the same file as the form component or in a colocated `schema.ts` file for complex forms.

Validation messages are written in Spanish, second person, no exclamation marks:

```ts
const schema = z.object({
  email: z.string().email('Ingresá un email válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  province: z.string().min(1, 'Seleccioná una provincia'),
  trainingModalities: z.array(z.string()).min(1, 'Seleccioná al menos una modalidad'),
  aceptaTerminos: z.literal(true, {
    errorMap: () => ({ message: 'Debés aceptar los términos para continuar' }),
  }),
})
```

---

## Submission flow

### Happy path

1. User clicks submit button.
2. Button enters loading state — `disabled`, spinner, present-participle label.
3. React Hook Form validates. If valid, calls `onSubmit`.
4. API call executes.
5. On success:
   - If the action navigates away → redirect. No toast.
   - If the action stays on the same screen → show success toast, reset form if appropriate.

### Validation error path

1. User clicks submit.
2. React Hook Form validates. Errors found.
3. `FormMessage` appears below each invalid field.
4. Button returns to default state — no loading, no disabled.
5. Focus moves to the first invalid field.
6. No toast is shown.

### Server error path

1. User clicks submit.
2. Validation passes. API call executes.
3. Server returns an error.
4. Show a destructive toast with a clear message.
5. Button returns to default state — the user can correct and resubmit.
6. The form fields remain editable. Do not lock or reset the form on server error.

---

## Layout

### Single-column

Default for most forms. Fields stack vertically, full width. Used for registration, login, and simple backoffice forms.

### Two-column grid

Used for paired fields that are semantically related and visually balanced. Examples:

```
[Nombre]          [Apellido]
[Fecha de inicio] [Hora de inicio]
[Fecha de fin]    [Hora de fin]
```

Never use three columns. Never put unrelated fields side by side just to save space.

### Section groups

Long forms are divided into named sections with a `text-heading-4` label and a `Separator` between groups. Sections group fields by topic — do not let a long form run as a single undifferentiated list.

Example grouping for the training form:

```
Información general
  Title, short description, full description

Clasificación
  Scope, programs, target audiences, modalities

Fechas y duración
  Start date, start time, end date, end time, duration days, hours

Ubicación
  Province, department, municipality, locality, sede

Recursos
  File uploads, links, YouTube URLs

Inscripción y publicación
  Capacity, registration open/close dates, is_registration_enabled, status
```

---

## Required vs optional fields

Required fields show a red asterisk after the label:

```tsx
<FormLabel>
  Email <span style={{ color: 'var(--color-error)' }}>*</span>
</FormLabel>
```

Optional fields have no indicator. The absence of an asterisk means optional. Do not write "(opcional)" next to the label — it adds noise without adding clarity.

---

## Submit button placement

The submit button is always at the bottom of the form, Primary variant, sized to the form context:

- Full-page form: `lg`
- Dialog form: `md`
- Inline or compact form: `sm`

If the form has a cancel action (navigating back or closing a dialog), the cancel button sits to the left of the submit button, Ghost variant, same size.

```
[Cancelar]        [Guardar capacitación]
[Ghost lg]        [Primary lg]
```

---

## Defined forms in Captur

| Form | Route | Key fields |
|---|---|---|
| Registro de Beneficiario | `/registro` | nombre, apellido, DNI, email, password, sector, ocupación, geografía, términos |
| Login | `/login` | email, password |
| Crear / Editar capacitación | `/backoffice/capacitaciones/nueva` | See training form spec — multi-step or sectioned |
| Nueva inscripción | Dialog or `/backoffice/capacitaciones/[id]/inscripciones` | beneficiario, estado |

New forms should be added here as they are designed in Fase 1.

---

## What not to do

Do not manage form state with `useState`. All state goes through React Hook Form.

Do not validate on blur for first-time interactions — only on submit, then on change after the first error.

Do not show a toast for client-side validation errors. `FormMessage` is the correct mechanism.

Do not lock the form after a server error. The user must be able to correct and resubmit.

Do not place more than two fields in a row.

Do not skip `FormMessage` in the field wrapper — its absence causes layout shift when errors appear.

---

## References

- Field atoms: `design/patterns/inputs.md`
- Multiselect fields: `design/patterns/multiselect.md`
- Chip selector fields: `design/patterns/chip-selector.md`
- Error and success feedback: `design/patterns/feedback.md`
- Submit button states: `design/patterns/buttons.md` → "Loading state"
- UI standards: `ui-standards.md` → "Errores de formulario"

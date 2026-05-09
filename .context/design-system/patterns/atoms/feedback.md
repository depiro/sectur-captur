# Pattern: Feedback

Components: `Toaster` + `useToast` from shadcn/ui, `FormMessage` from shadcn/ui.

---

## What it is

Feedback components communicate the result of a user action. There are two mechanisms in Captur — toasts and inline messages — and they are not interchangeable. Choosing the wrong one creates confusion: showing a toast for a form error means the user has to find the problem on their own; showing an inline message for a successful save means the user doesn't know the action completed.

---

## Decision rule

| Situation | Mechanism | Component |
|---|---|---|
| Successful action that stays on the same screen | Toast | `Toaster` + `useToast` |
| Successful action that navigates to another screen | Redirect — no toast | — |
| Form validation error | Inline below the field | `FormMessage` |
| Server error on a form submission | Destructive toast | `Toaster` variant `destructive` |
| Server error on a non-form action | Destructive toast | `Toaster` variant `destructive` |
| Critical error that blocks the page | Inline on the page | `ErrorState` component |
| Confirmation before a destructive action | Confirmation dialog | `AlertDialog` |
| Contextual secondary information | Tooltip | `Tooltip` |

**The rule in one sentence:** toasts are for completed actions the user doesn't need to act on. Inline messages are for errors the user needs to correct.

Do not mix: if a form has validation errors, do not show a toast. If an action was successful, do not show an inline message.

---

## Toasts

### Setup

`Toaster` is placed once in the root layout (`app/layout.tsx`). Do not add it to individual pages or components. Do not create parallel notification systems.

```tsx
// app/layout.tsx
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

### Usage

```tsx
const { toast } = useToast()

// Success
toast({
  title: "Inscripción confirmada",
  description: "Recibirás un email con los detalles de la capacitación.",
})

// Error
toast({
  title: "No se pudo completar la inscripción",
  description: "Intentá de nuevo en unos minutos o contactá al administrador.",
  variant: "destructive",
})

// Warning
toast({
  title: "Cupo por agotarse",
  description: "Quedan menos del 20% de los lugares disponibles.",
})

// Info
toast({
  title: "Encuesta pendiente",
  description: "Completá la encuesta de satisfacción para descargar tu certificado.",
})
```

### Position and duration

Position: always bottom-right. Do not modify the `Toaster` position.

| Type | Duration |
|---|---|
| Success | 4 seconds (default) |
| Error | 6 seconds (extended — gives the user time to read) |
| Warning / Info | 4 seconds (default) |

### Message tone

**Success:** affirmative and specific. State what happened — not just "Success".

```
✅ "Inscripción confirmada"
✅ "Certificado enviado a tu email"
✅ "Capacitación publicada"
❌ "Operación exitosa"
❌ "OK"
❌ "Listo"
```

**Error:** clear and without blaming the user. State what failed and what they can do.

```
✅ "No se pudo enviar el certificado. Intentá de nuevo o contactá al administrador."
✅ "No se pudo guardar la capacitación. Intentá de nuevo en unos minutos."
❌ "Error 500"
❌ "Algo salió mal"
❌ "Error: invalid_response"
```

**Warning:** specific about what the user should check or be aware of.

```
✅ "Cupo por agotarse — quedan menos del 20% de los lugares"
❌ "Advertencia"
❌ "Atención"
```

**Info:** actionable context. Tells the user something they need to know to proceed.

```
✅ "Encuesta pendiente — completala para descargar tu certificado"
❌ "Información"
```

---

## FormMessage

Inline validation error displayed directly below a form field. Used exclusively for errors the user needs to correct before submitting.

### Setup

`FormMessage` is always present in the JSX for every field — even when there is no error. This prevents layout shift when the error appears.

```tsx
<FormField
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage /> {/* always present, renders nothing when no error */}
    </FormItem>
  )}
/>
```

Do not create custom error message elements. Always use `FormMessage` from shadcn.

### Message tone

Written in Spanish, second person, no exclamation marks. Short and actionable.

```
✅ "Ingresá un email válido"
✅ "Este campo es obligatorio"
✅ "La contraseña debe tener al menos 8 caracteres"
✅ "Seleccioná al menos una modalidad"
❌ "Email inválido!"
❌ "Required"
❌ "El campo email no puede estar vacío en este momento"
```

### Server errors on form submission

If the server rejects a form submission, show a destructive toast — do not block the form or show a page-level error. The user must be able to correct the data and resubmit.

The form fields remain editable after a server error. The submit button returns to its default state (not loading, not disabled) so the user can try again.

---

## What not to do

Do not show a toast for form validation errors. The user needs to see exactly which field failed — a toast can't tell them that.

Do not show a `FormMessage` for a successful action. Inline messages signal something that needs correction.

Do not show a success toast when the action navigates the user to a new page — the navigation itself is the confirmation.

Do not use `window.alert` or `window.confirm` anywhere — use toasts for notifications and `AlertDialog` for confirmations.

Do not create custom toast or notification components. All toasts go through `useToast`.

---

## References

- Components: `components/ui/toaster.tsx`, `components/ui/toast.tsx`, `components/ui/form.tsx`
- Destructive confirmation (not the same as error toast): `design/patterns/dialogs.md`
- Form field integration: `design/patterns/inputs.md`
- UI standards: `ui-standards.md` → "Feedback al usuario" and "Errores de formulario"

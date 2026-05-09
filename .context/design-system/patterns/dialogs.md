# Pattern: Dialogs

Components: `AlertDialog` and `Dialog` from shadcn/ui.

---

## What it is

Dialogs are modal overlays that interrupt the current flow to request confirmation or display contextual information. There are two types in Captur, and they are not interchangeable:

- **`AlertDialog`** — for destructive or irreversible actions that require explicit confirmation.
- **`Dialog`** — for neutral interactions: previewing content, filling a secondary form, or displaying detail information without leaving the page.

The distinction matters. Using a standard `Dialog` for a destructive action removes the semantic weight that signals danger to the user.

---

## `AlertDialog` — Destructive confirmation

Use `AlertDialog` for any action that cannot be undone: deleting a record, canceling an enrollment, revoking access.

Never use `window.confirm`. Never use a standard `Dialog` for destructive actions.

### Structure

```
┌─────────────────────────────────────┐
│  Title                              │
│  Description                        │
│                                     │
│           [Go back]  [Confirm]      │
└─────────────────────────────────────┘
```

### Content rules

**Title:** states what is about to happen, in affirmative form. Never a question like "¿Estás seguro?" or "Are you sure?".

```
✅ "Cancelar inscripción"
✅ "Eliminar capacitación"
✅ "Revocar acceso"
❌ "¿Estás seguro?"
❌ "Confirmar acción"
❌ "Advertencia"
```

**Description:** the concrete consequence of the action. Must mention the name of the entity being affected and state explicitly that the action cannot be undone.

```
✅ "Vas a cancelar tu inscripción a Gestión hotelera sustentable.
    Esta acción no se puede deshacer."
❌ "Esta acción es permanente."
❌ "¿Querés continuar?"
```

**Cancel button:** always present, always on the left. Label: "Volver" — not "Cancelar", not "No".

**Confirm button:** Destructive variant, on the right. Label uses the verb of the action — the same verb as the title.

```
✅ "Cancelar inscripción"
✅ "Eliminar"
✅ "Revocar acceso"
❌ "Sí"
❌ "Confirmar"
❌ "OK"
```

### Trigger button

The button that opens the `AlertDialog` is **not** Destructive — it can be Secondary sm or Ghost sm depending on context. The destructive styling appears only inside the dialog on the confirm button, where the user has already read the consequences.

### Example

```
Trigger:     [Cancelar inscripción]  ← Secondary sm or Ghost sm
─────────────────────────────────────────────────────────
Dialog title:       Cancelar inscripción
Dialog description: Vas a cancelar tu inscripción a Gestión hotelera
                    sustentable. Esta acción no se puede deshacer.
Left button:        Volver             ← Ghost
Right button:       Cancelar inscripción  ← Destructive
```

---

## `Dialog` — Neutral

Use `Dialog` for interactions that do not modify or delete data irreversibly: viewing a certificate detail, previewing content, filling a lightweight form that can be cancelled without consequence.

### Structure

```
┌─────────────────────────────────────┐
│  Title                        [✕]   │
│  ─────────────────────────────────  │
│                                     │
│  Content area                       │
│                                     │
│  ─────────────────────────────────  │
│  [Secondary action]  [Primary]      │
└─────────────────────────────────────┘
```

### Content rules

**Title:** describes what the dialog contains — not a question, not an instruction.

```
✅ "Detalle del certificado"
✅ "Nueva inscripción"
❌ "Ver información"
❌ "¿Querés descargar?"
```

**Close button (✕):** always present in the top right corner. Clicking outside the dialog also closes it, unless there's a form with unsaved state.

**Footer buttons:** follow the same composition rules as buttons on a page — one Primary action on the right, one Ghost or Secondary on the left if a secondary action is needed. Label "Cerrar" for the dismiss action.

```
[Cerrar]      [Descargar PDF]
[Ghost]       [Primary]
```

### When to use `Dialog` vs inline

If the content fits naturally in a detail page or a dedicated route, use that instead of a dialog. Dialogs are for lightweight interactions where navigating away would be disruptive.

```
✅ Dialog: previewing a certificate before downloading
✅ Dialog: quick enrollment action from a list
❌ Dialog: full training creation form — use a dedicated page
❌ Dialog: multi-step flows — use a page or a wizard
```

---

## Shared rules for both types

Both `AlertDialog` and `Dialog` use the `--color-overlay` backdrop (`rgba(0,0,0,0.5)`) and `--shadow-lg` on the panel.

Do not stack dialogs. One dialog at a time.

Do not open a dialog from inside another dialog.

After a confirmed action in `AlertDialog`, close the dialog before showing the result toast. The sequence is: confirm → close dialog → execute action → show toast.

---

## What not to do

Do not use `window.confirm` or `window.alert` anywhere in the codebase.

Do not use a standard `Dialog` for destructive confirmations — the visual and semantic difference between the two components is intentional.

Do not use "Sí / No" as button labels in any dialog. Labels must describe the action.

Do not put more than two buttons in a dialog footer.

---

## References

- Components: `components/ui/alert-dialog.tsx`, `components/ui/dialog.tsx`
- Button composition: `design/patterns/buttons.md` → "Composition rules"
- Post-action feedback: `design/patterns/feedback.md`
- UI standards: `ui-standards.md` → "Destructive actions"

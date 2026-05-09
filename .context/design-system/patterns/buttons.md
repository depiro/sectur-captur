# Pattern: Buttons

Component `CapturButton` — `components/shared/CapturButton.tsx`

---

## What it is

The button is the primary action element of the interface. Every action the user can perform — save, submit, enroll, delete — is communicated through a button. The variant and size communicate hierarchy: which action is primary, which is secondary, which is dangerous.

---

## Variants

### Primary

The main action of a screen or section. Only one Primary button can be visible per action area — if there are two, one of them is in the wrong place.

When to use:
- The action the user came to perform ("Enroll", "Save", "Publish")
- The forward step in a multi-step flow
- The confirmation action in a neutral dialog

When NOT to use:
- Secondary or cancel actions
- Destructive actions (use Destructive instead)
- When a Primary already exists in the same area

### Secondary

An important action, but not the primary one. Sits alongside a Primary when two relevant actions coexist in the same context.

When to use:
- An alternative action next to a Primary ("View detail →" next to "Enroll")
- Export or download actions when they are not the central goal of the screen
- Confirmation in secondary dialogs

### Ghost

A lower-hierarchy action — present but without visual weight.

When to use:
- "Cancel" or "Go back" in dialogs and forms — always to the left of the Primary
- Navigation actions with no direct consequence
- Sidebar or collapsible panel toggles

### Destructive

An action that deletes something or cannot be undone. The red color is the warning signal — do not use it for anything that is not destructive or irreversible.

When to use:
- The confirmation button inside an `AlertDialog` ("Cancel enrollment", "Delete", "Revoke access")
- Never as the trigger button for the AlertDialog itself — that one should be Secondary or Ghost

---

## Sizes

| Size | When to use |
|---|---|
| `sm` (32px) | Actions inside tables, cards, or dialogs with limited space |
| `md` (40px) | Standard actions in forms and pages — the default |
| `lg` (48px) | Primary action on a full-form page or public portal CTA |

Do not mix sizes within the same action group. If the Primary is `md`, the Ghost accompanying it must also be `md`.

---

## Loading state

Every async action (save, submit, enroll) must show a loading state for the duration of the operation.

Required behavior during loading:
- The button becomes `disabled` to prevent double submission
- The label is replaced by a spinner (`Loader2` animated) + present-participle text
- The button width does not change (avoid layout shift)

Loading text by action:

| Action | While loading |
|---|---|
| Save | "Saving..." |
| Submit | "Submitting..." |
| Enroll | "Processing enrollment..." |
| Download / Generate | "Generating certificate..." |
| Delete | "Deleting..." |
| Publish | "Publishing..." |

---

## Disabled state

A `disabled` button indicates the action is not available at this moment. Use it only when the user can unlock it by doing something on the same screen (e.g. incomplete form).

Do not use `disabled` for actions the user can never perform in that context — in that case, hide the button or use an explanatory tooltip.

Do not use `disabled` in the `TrainingCard` action area when enrollment is closed — instead, replace the button with the text "Enrollment closed".

---

## Composition rules

One Primary per action area. If two actions are important, one is Primary and the other is Secondary.

The cancel or go-back button always goes to the left of the confirm button. The confirm button always goes to the right.

```
[Go back]         [Save changes]
[Ghost]           [Primary]
```

In destructive dialogs:

```
[Go back]         [Cancel enrollment]
[Ghost]           [Destructive]
```

Icons inside a button go to the left of the label, never to the right — except the navigation arrow "→" which is part of the label as plain text.

---

## What not to do

Do not create ad hoc variants with Tailwind classes directly on the page. If a variant is missing, add it to the `CapturButton` component and document it here.

Do not use shadcn's `Button` directly in business components — always use `CapturButton` to maintain design system variants.

Do not hardcode colors. Hover, focus, and disabled states are defined in `CapturButton` using CSS variables.

---

## References

- Component: `components/shared/CapturButton.tsx`
- Feedback and loading standards: `ui-standards.md` → "Toasts" and "Loading states" sections
- Destructive dialogs: `ui-standards.md` → "Destructive actions" section

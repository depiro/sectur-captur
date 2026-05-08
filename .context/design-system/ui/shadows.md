# Captur — Shadows

## Elevation System

Shadows communicate elevation and interaction state.

---

# Shadow Tokens

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Default cards |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Hover cards |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals/popovers |
| `--shadow-focus` | `0 0 0 3px rgba(42,157,157,0.3)` | Focus ring |

---

# Usage Rules

## `--shadow-sm`
Used for:
- Cards at rest
- Header elevation

## `--shadow-md`
Used for:
- Hover state
- Dropdown menus

## `--shadow-lg`
Used for:
- Dialogs
- Popovers
- Modals

## `--shadow-focus`
Used for:
- Inputs
- Buttons
- DatePicker
- Interactive focus states
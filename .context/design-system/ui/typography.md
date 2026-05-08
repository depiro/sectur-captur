# Captur — Typography

## Font Family

### Inter

Single font family for the entire platform.

### Principles

- No additional fonts
- No serif fonts
- No decorative italics
- Hierarchy built using:
  - Size
  - Weight
  - Spacing

---

# Type Scale

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `display` | 48px | 700 | 1.15 | Hero |
| `heading-1` | 36px | 700 | 1.2 | Main titles |
| `heading-2` | 28px | 600 | 1.25 | Sections |
| `heading-3` | 22px | 600 | 1.3 | Subsections |
| `heading-4` | 18px | 600 | 1.4 | Cards |
| `body-lg` | 16px | 400 | 1.6 | Body |
| `body-md` | 14px | 400 | 1.5 | Forms/tables |
| `body-sm` | 12px | 400 | 1.4 | Metadata |
| `label` | 12px | 500 | 1.3 | Badges |
| `button` | 14px | 500 | 1 | Buttons |

---

# Typography Rules

- Maximum 3 hierarchy levels per screen
- Paragraphs never exceed weight 400
- Metadata always uses:
  - `body-sm`
  - `--color-text-secondary`
- Form errors:
  - `body-sm`
  - `--color-error`
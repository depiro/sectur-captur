# Pattern: Typography

Font family: **Inter** (Google Fonts) — defined in the root layout.
Scale: **Minor Third** (ratio 1.200) — custom Tailwind `fontSize` config in `tailwind.config.ts`.

---

## What it is

Typography in Captur uses a single font family — Inter — with hierarchy built exclusively through size and weight. There are no decorative fonts, no italic styles for UI text, and no custom letter-spacing outside of the `label` level.

The scale follows the **Minor Third** modular ratio (1.200), which produces a clear but measured progression between levels — assertive enough for hierarchy, restrained enough for a professional government platform. The scale has 10 named levels. Each level has a fixed size, line height, and weight — these are not overridden per component. If a level doesn't fit, the correct response is to reconsider the layout, not adjust the type.

---

## Scale reference

| Token | Size | Line height | Weight | Tailwind class |
|---|---|---|---|---|
| `display` | 48px / 3rem | 1.15 | 700 | `text-display` |
| `heading-1` | 36px / 2.25rem | 1.2 | 700 | `text-heading-1` |
| `heading-2` | 28px / 1.75rem | 1.25 | 600 | `text-heading-2` |
| `heading-3` | 22px / 1.375rem | 1.3 | 600 | `text-heading-3` |
| `heading-4` | 18px / 1.125rem | 1.4 | 600 | `text-heading-4` |
| `body-lg` | 16px / 1rem | 1.6 | 400 | `text-body-lg` |
| `body-md` | 14px / 0.875rem | 1.5 | 400 | `text-body-md` |
| `body-sm` | 12px / 0.75rem | 1.4 | 400 | `text-body-sm` |
| `label` | 12px / 0.75rem | 1.3 | 500 | `text-label` |
| `button` | 14px / 0.875rem | 1 | 500 | `text-button` |

Note: `label` and `body-sm` share the same size but differ in weight and line height. `label` is for compact UI elements (badges, table headers, sidebar group labels). `body-sm` is for secondary text in flowing content.

---

## When to use each level

### `display`
Large-scale headings only. Reserved for marketing or landing hero sections on the public portal. Not used inside the backoffice.

### `heading-1`
Page-level title on full-page views — one per page maximum. Example: the main title of a training detail page on the public portal.

### `heading-2`
Section titles within a page. Used to divide clearly distinct content areas. Example: section headers in the UI Kit, major form sections.

### `heading-3`
Subsection titles or prominent component headers. Example: card titles in a feature section, dialog titles.

### `heading-4`
Component-level titles. The most frequently used heading in the backoffice. Example: `TrainingCard` title, backoffice page header, table section header.

### `body-lg`
Primary body text for longer reading content. Example: full description of a training on the public portal detail page.

### `body-md`
Default body text for all standard UI — form labels, table cell content, descriptions in cards, input values. This is the baseline for most interface text.

### `body-sm`
Secondary and supporting text. Always paired with a primary element at `body-md` or above. Example: metadata below a card title (date, location, duration), email under a name in a table row, helper text under a form field.

### `label`
Compact UI labels with no flowing text. Always uppercase in badges and table headers; mixed case in sidebar group labels and similar structural elements. Example: badge text, `TableHeader` cells, sidebar group labels.

### `button`
Used exclusively inside `CapturButton`. Not applied to other elements.

---

## Color pairing

Typography levels do not carry color — color is applied separately based on context:

| Use | Color variable |
|---|---|
| Primary content (titles, body, input values) | `--color-text-primary` |
| Secondary content (metadata, helper text, placeholders) | `--color-text-secondary` |
| Disabled text | `--color-text-disabled` |
| Error messages (`FormMessage`) | `--color-error` |
| Brand accent (links, active states) | `--color-brand-teal` |

Do not use `--color-text-secondary` for content the user needs to act on. If it needs attention, it uses `--color-text-primary`.

---

## Composition rules

Do not mix more than two type levels within a single compact component (e.g. a card). The typical pattern is one heading level + one body level:

```
heading-4   → Training title
body-sm     → Program name, metadata (date, location, duration)
label       → Badge text
```

Do not use weight or size adjustments to create ad hoc levels. If the scale doesn't cover a case, document it and add a level — don't patch it inline.

Text in the UI is always in Spanish for user-facing content. Code, types, and component names are always in English. See `naming-conventions.md`.

---

## What not to do

Do not use `font-bold`, `font-semibold`, or `text-[size]` Tailwind utilities directly on text elements. Always use the named scale tokens (`text-heading-4`, `text-body-md`, etc.) so weight and line height stay coupled to the level.

Do not italicize UI text. Italic is not part of the Captur type system.

Do not adjust `letter-spacing` except on `label` elements displayed in uppercase, where a subtle `tracking-wide` is acceptable for legibility.

Do not hardcode font sizes in `style` props. If a CSS variable is needed for color, fine — but size always comes from the Tailwind class.

---

## References

- Scale config: `tailwind.config.ts` → `fontSize`
- Scale name: Minor Third (ratio 1.200)
- Font import: `app/layout.tsx`
- Color variables: `globals.css` → `--color-text-*`
- Design tokens: `design/patterns/design-tokens.md`

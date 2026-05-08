# Captur — CSS Variables

## Colors

```css
:root {
  /* Brand Colors */
  --color-brand-teal: #2A9D9D;
  --color-brand-teal-bg: rgba(42, 157, 157, 0.12);
  --color-brand-teal-dark: #238585;

  --color-brand-orange: #E8762C;
  --color-brand-orange-bg: rgba(232, 118, 44, 0.12);

  --color-brand-purple: #7B5EA7;
  --color-brand-purple-bg: rgba(123, 94, 167, 0.12);

  --color-brand-lime: #8DC63F;
  --color-brand-lime-bg: rgba(141, 198, 63, 0.12);

  /* Semantic Colors */
  --color-success: #16A34A;
  --color-success-bg: rgba(22, 163, 74, 0.12);

  --color-error: #DC2626;
  --color-error-bg: rgba(220, 38, 38, 0.12);

  --color-warning: #D97706;
  --color-warning-bg: rgba(217, 119, 6, 0.12);

  --color-info: #2563EB;
  --color-info-bg: rgba(37, 99, 235, 0.12);

  /* Neutral Colors */
  --color-background: #FFFFFF;
  --color-surface: #F9FAFB;

  --color-border: #E5E7EB;
  --color-border-strong: #D1D5DB;

  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-disabled: #9CA3AF;

  --color-overlay: rgba(0, 0, 0, 0.5);

  /* Sidebar */
  --color-sidebar-bg: #FFFFFF;
  --color-sidebar-border: #E5E7EB;

  --color-sidebar-text: #374151;
  --color-sidebar-icon: #6B7280;

  --color-sidebar-hover-bg: #F3F4F6;

  --color-sidebar-active-bg: rgba(42, 157, 157, 0.08);
  --color-sidebar-active-text: #2A9D9D;
  --color-sidebar-active-icon: #2A9D9D;
  --color-sidebar-active-border: #2A9D9D;

  --color-sidebar-group-label: #9CA3AF;
}
```

---

## Spacing

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
}
```

---

## Radius

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}
```

---

## Shadows

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);

  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);

  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  --shadow-focus: 0 0 0 3px rgba(42, 157, 157, 0.3);
}
```

---

## Recommended Production Structure

```css
:root {
  /* COLORS */
  /* SPACING */
  /* RADIUS */
  /* SHADOWS */
}
```
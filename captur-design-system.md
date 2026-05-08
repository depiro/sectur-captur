# Captur — Design System
## Fase 0: Foundations

Este documento define los tokens visuales, componentes base y decisiones de diseño que aplican a todas las pantallas de la plataforma Captur. Es la fuente de verdad compartida entre diseño y desarrollo. Ningún componente se genera antes de que este documento esté cerrado y commitado.

---

## 1. Paleta de colores

### Filosofía de uso

La paleta deriva de la identidad institucional existente de Captur (logo, certificados, materiales de capacitación). El uso del color sigue el modelo de GLF Academy: el color tiene función estructural — secciona, categoriza y orienta — no es decorativo.

La plataforma es predominantemente blanca. El color aparece con propósito y en puntos específicos: acciones primarias, etiquetas de categoría, fondos de sección destacada. Nunca se acumula color innecesariamente.

**Regla crítica de contraste en badges:** el texto nunca usa la misma variable que el fondo. Siempre: fondo = versión `*-bg` (semitransparente) + texto = versión plena saturada. Si coinciden, es un error.

---

### Colores de marca

#### `--color-brand-teal` · `#2A9D9D`
**Qué significa:** Es el color institucional de Captur. Representa a la plataforma como entidad.
**Cuándo usarlo:**
- Navegación principal (header, ítem activo del sidebar)
- Botones de acción primaria
- Links de navegación en hover
- Elementos que identifican a Captur como institución (logo, favicon)
**Cuándo NO usarlo:** Como fondo de secciones largas de contenido, en texto de cuerpo, en badges de estado.

#### `--color-brand-orange` · `#E8762C`
**Qué significa:** Acento de energía y atención. Señala novedad.
**Cuándo usarlo:**
- Badge "Nuevo" en capacitaciones recién publicadas (fondo sólido, texto blanco — única excepción a la regla de fondo semitransparente)
- Calls to action secundarios en secciones de color oscuro
**Cuándo NO usarlo:** Como color de error, en elementos de navegación, en texto corrido, para indicar cupo limitado (ese rol lo tiene `--color-warning`).

#### `--color-brand-purple` · `#7B5EA7`
**Qué significa:** Categorización. Identifica ámbito externo y modalidades asincrónicas.
**Cuándo usarlo:**
- Badge de modalidad Virtual Asincrónica
- Badge de ámbito Externo
- Acentos en secciones de configuración avanzada del backoffice
**Cuándo NO usarlo:** En acciones primarias, en estados de error o éxito.

#### `--color-brand-lime` · `#8DC63F`
**Qué significa:** Confirmación y logro. Refuerza estados positivos de avance del usuario.
**Cuándo usarlo:**
- Badge "Certificado disponible"
- Badge de ámbito Articulación Institucional
**Cuándo NO usarlo:** Como color de acción primaria, en texto corrido, en secciones de fondo grandes.

---

### Colores semánticos

Tienen significado funcional fijo. Se usan exclusivamente para el propósito que se describe. No se intercambian con los colores de marca.

#### `--color-success` · `#16A34A`
**Qué significa:** Una acción se completó correctamente.
**Cuándo usarlo:** Toast de éxito, badge "Inscripción aprobada", badge "Publicada".

#### `--color-error` · `#DC2626`
**Qué significa:** Algo falló o requiere corrección inmediata.
**Cuándo usarlo:** Toast destructivo, error inline en formularios, badge "Cupo agotado", badge "Rechazada", badge "Cancelada".

#### `--color-warning` · `#D97706`
**Qué significa:** Atención requerida, sin bloqueo de flujo.
**Cuándo usarlo:** Badge "Cupo limitado" (≥80% ocupado), badge "Encuesta pendiente", badge "Pendiente", datos de perfil incompletos.

#### `--color-info` · `#2563EB`
**Qué significa:** Información contextual útil, sin urgencia.
**Cuándo usarlo:** Badge modalidad Presencial, badge ámbito Interno, badge "Finalizada", tooltips informativos.

---

### Colores neutros

| Token | Hex | Uso |
|---|---|---|
| `--color-background` | `#FFFFFF` | Fondo de página y cards |
| `--color-surface` | `#F9FAFB` | Fondo de inputs, hover de filas de tabla, secciones alternas |
| `--color-border` | `#E5E7EB` | Bordes de cards, inputs, separadores, filas de tabla |
| `--color-border-strong` | `#D1D5DB` | Header de tabla |
| `--color-text-primary` | `#111827` | Títulos, labels, texto de alto peso |
| `--color-text-secondary` | `#6B7280` | Metadatos, texto de apoyo, placeholders, íconos del sidebar |
| `--color-text-disabled` | `#9CA3AF` | Elementos deshabilitados, celdas sin dato ("—") |
| `--color-overlay` | `rgba(0,0,0,0.5)` | Fondo de modales y dialogs |

---

### Variables del sidebar

| Token | Valor | Uso |
|---|---|---|
| `--color-sidebar-bg` | `#FFFFFF` | Fondo del sidebar |
| `--color-sidebar-border` | `#E5E7EB` | Borde derecho del sidebar |
| `--color-sidebar-text` | `#374151` | Texto de ítems default |
| `--color-sidebar-icon` | `#6B7280` | Íconos de ítems default |
| `--color-sidebar-hover-bg` | `#F3F4F6` | Fondo de ítem en hover |
| `--color-sidebar-active-bg` | `rgba(42,157,157,0.08)` | Fondo de ítem activo |
| `--color-sidebar-active-text` | `#2A9D9D` | Texto de ítem activo |
| `--color-sidebar-active-icon` | `#2A9D9D` | Ícono de ítem activo |
| `--color-sidebar-active-border` | `#2A9D9D` | Borde izquierdo de ítem activo |
| `--color-sidebar-group-label` | `#9CA3AF` | Labels de grupo |

---

### Color en fondos de sección

- Máximo dos secciones con fondo de color por página
- Usar exclusivamente `--color-brand-teal` con texto blanco, o `--color-surface` con texto `--color-text-primary`
- Nunca superponer dos secciones de color consecutivas sin una sección blanca entre ellas
- El footer siempre va en `--color-brand-teal` oscurecido al 15% con texto blanco

---

## 2. Tipografía

**Inter** — familia única. Optimizada para pantallas. No se carga ninguna fuente adicional. La jerarquía se construye exclusivamente con variación de tamaño y peso. Sin itálicas decorativas, sin fuentes serif.

### Escala tipográfica

| Nombre | Tamaño | Peso | Line-height | Uso |
|---|---|---|---|---|
| `display` | 48px / 3rem | 700 | 1.15 | Hero de la web pública |
| `heading-1` | 36px / 2.25rem | 700 | 1.2 | Título principal de página |
| `heading-2` | 28px / 1.75rem | 600 | 1.25 | Título de sección |
| `heading-3` | 22px / 1.375rem | 600 | 1.3 | Título de subsección |
| `heading-4` | 18px / 1.125rem | 600 | 1.4 | Título de card, label de sección en backoffice |
| `body-lg` | 16px / 1rem | 400 | 1.6 | Cuerpo de texto principal |
| `body-md` | 14px / 0.875rem | 400 | 1.5 | Metadatos, labels de formulario, texto de tabla |
| `body-sm` | 12px / 0.75rem | 400 | 1.4 | Timestamps, texto de apoyo, metadatos de card |
| `label` | 12px / 0.75rem | 500 | 1.3 | Texto de badges, labels de grupo del sidebar |
| `button` | 14px / 0.875rem | 500 | 1 | Texto de botones y links de acción |

### Reglas

- Nunca más de tres niveles de jerarquía tipográfica en una misma pantalla
- Texto de cuerpo nunca en peso mayor a 400 en párrafos
- Metadatos de card siempre en `body-sm` `--color-text-secondary`
- Errores de formulario siempre en `body-sm` `--color-error`

---

## 3. Espaciado

Múltiplos de 4px, modelo Stripe.

| Token | Valor | Uso típico |
|---|---|---|
| `--space-1` | 4px | Gap entre líneas de metadata en card |
| `--space-2` | 8px | Gap interno de badges |
| `--space-3` | 12px | Padding de inputs, separador de card |
| `--space-4` | 16px | Padding de cards, sidebar, gap entre campos |
| `--space-5` | 20px | Gap entre campos de formulario |
| `--space-6` | 24px | Padding de secciones compactas |
| `--space-8` | 32px | Separación entre componentes |
| `--space-10` | 40px | Padding de sección en mobile |
| `--space-12` | 48px | Separación entre secciones en desktop |
| `--space-16` | 64px | Padding vertical de secciones hero |
| `--space-24` | 96px | Separación máxima entre bloques |

---

## 4. Grilla y breakpoints

| Nombre | Ancho | Comportamiento |
|---|---|---|
| `mobile` | < 640px | 1 columna, padding lateral 16px |
| `tablet` | 640px – 1024px | 2 columnas, padding lateral 24px |
| `desktop` | 1024px – 1280px | 3 columnas, padding lateral 32px |
| `wide` | > 1280px | 3 columnas, max-width 1200px centrado |

Contenedor: `max-width: 1200px`, `margin: 0 auto`. La grilla de capacitaciones se mantiene en 3 columnas máximo en todos los breakpoints anchos.

---

## 5. Border radius y elevación

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 4px | Badges, inputs, checkboxes |
| `--radius-md` | 8px | Cards, botones, dropdowns, ítems del sidebar |
| `--radius-lg` | 12px | Modales, panels, popovers |
| `--radius-full` | 9999px | Avatares, toggles |

| Token | Valor | Uso |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Cards en reposo, header |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards en hover, dropdowns |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modales, dialogs, popovers |
| `--shadow-focus` | `0 0 0 3px rgba(42,157,157,0.3)` | Focus ring de inputs, botones, DatePicker |

---

## 6. Botones (`CapturButton`)

Modelo Stripe. Cuatro variantes, tres tamaños, estados completos.

### Variantes

**Primary** — fondo `--color-brand-teal`, texto blanco. Acción principal. Máximo uno por sección.
**Secondary** — fondo transparente, borde 1px `--color-brand-teal`, texto `--color-brand-teal`.
**Ghost** — sin borde ni fondo, texto `--color-text-primary`, hover fondo `--color-surface`.
**Destructive** — fondo `--color-error`, texto blanco. Solo para acciones irreversibles. Siempre con `AlertDialog`.

### Tamaños

| Nombre | Height | Padding H | Font |
|---|---|---|---|
| `sm` | 32px | 12px | `label` 12px |
| `md` | 40px | 16px | `button` 14px (default) |
| `lg` | 48px | 20px | `button` 16px |

### Estados

- **Default:** color base
- **Hover:** `--color-brand-teal-dark` para primary, 8% más oscuro para las demás
- **Focus:** color base + `--shadow-focus`
- **Disabled:** opacidad 40%, cursor `not-allowed`
- **Loading:** spinner `Loader2` + texto en gerundio, ancho fijo, `disabled` activado

### Textos de loading

| Acción | Loading |
|---|---|
| Guardar | "Guardando..." |
| Enviar | "Enviando..." |
| Inscribirse | "Procesando inscripción..." |
| Descargar | "Generando certificado..." |
| Eliminar | "Eliminando..." |
| Publicar | "Publicando..." |

---

## 7. Formularios

Modelo Stripe. Todos los componentes usan `React Hook Form` + `Zod` + shadcn/ui.

### Input
Height 40px · border 1px `--color-border` · border-radius `--radius-sm` · fondo `--color-surface` · padding `--space-3` horizontal · font `body-md` · placeholder `--color-text-secondary`.

Estados: default · focus (borde `--color-brand-teal` + `--shadow-focus`) · error (borde `--color-error` + FormMessage) · disabled (fondo `--color-border`, texto `--color-text-disabled`, cursor `not-allowed`).

### Label
Font `body-md` peso 500, color `--color-text-primary`. Siempre encima del input. Asterisco `--color-error` para obligatorios.

### FormMessage
Debajo del input en error. Font `body-sm`, color `--color-error`. Aparece `onBlur` o al submit.

### Select
Mismo estilo que input. Chevron derecho `--color-text-secondary`. Dropdown con `--shadow-md` y `--radius-md`.

### Textarea
Mismo estilo que input. Height mínimo 96px. Resize solo vertical.

### Checkbox y Radio
16×16px. Checkbox: `--radius-sm`. Radio: `--radius-full`. Color: `--color-brand-teal`. Siempre con label a la derecha.

### DatePicker (`CapturDatePicker`)

Reemplaza `<input type="date">` en toda la plataforma. El nativo no es consistente entre sistemas operativos y no aplica los estilos del design system.

**Trigger:** mismo estilo que input. Ícono `CalendarDays` a la izquierda. Formato: `DD/MM/YYYY`.

**Popover:** fondo `--color-background`, borde `--color-border`, `--shadow-lg`, `--radius-md`, padding 16px, width 280px.

**Estructura del popover:**
- Select de mes (flex-1) + Select de año (90px), height 32px
- Encabezados de días en `label` 10px uppercase `--color-text-secondary`
- Grilla 7 columnas, celdas 36×36px, `--radius-sm`

**Estados de celda:**

| Estado | Estilo |
|---|---|
| Normal | hover fondo `--color-surface` |
| Seleccionado | fondo `--color-brand-teal`, texto blanco, peso 600 |
| Hoy (sin seleccionar) | borde `--color-brand-teal`, texto `--color-brand-teal`, peso 500 |
| Días de otro mes | `--color-text-disabled`, no clickeable |
| Disabled | `--color-text-disabled`, cursor `not-allowed` |

---

## 8. Badges y etiquetas

Tamaño base: height 20px, padding H 8px, font `label`, border-radius `--radius-sm`, sin borde.

### `TrainingModalityBadge`

Estilo determinado **exclusivamente por slug**, nunca por el campo `name`.

| Slug | Fondo | Texto | Label |
|---|---|---|---|
| `presencial` | `--color-info-bg` | `--color-info` | "Presencial" |
| `virtual-sincronica` | `--color-brand-teal-bg` | `--color-brand-teal` | "Virtual Sincrónica" |
| `virtual-asincronica` | `--color-brand-purple-bg` | `--color-brand-purple` | "Virtual Asincrónica" |
| `virtual` | `--color-brand-teal-bg` | `--color-brand-teal` | "Virtual" |
| `hibrida` | `--color-brand-orange-bg` | `--color-brand-orange` | "Híbrida" |
| `mixta` | `--color-brand-orange-bg` | `--color-brand-orange` | "Mixta" |

Slug no reconocido: fondo `--color-border`, texto `--color-text-secondary`, label del campo `name`.

### `TrainingScopeBadge`

| Slug | Fondo | Texto | Label |
|---|---|---|---|
| `interno` | `--color-info-bg` | `--color-info` | "Interno" |
| `externo` | `--color-brand-purple-bg` | `--color-brand-purple` | "Externo" |
| `articulacion` | `--color-brand-lime-bg` | `--color-brand-lime` | "Articulación Institucional" |

### `TrainingStatusBadge`

| Status | Fondo | Texto | Label |
|---|---|---|---|
| `draft` | `--color-border` | `--color-text-secondary` | "Borrador" |
| `published` | `--color-success-bg` | `--color-success` | "Publicada" |
| `in_progress` | `--color-brand-teal-bg` | `--color-brand-teal` | "En curso" |
| `completed` | `--color-info-bg` | `--color-info` | "Finalizada" |
| `cancelled` | `--color-error-bg` | `--color-error` | "Cancelada" |

### `EnrollmentStatusBadge`

| State | Fondo | Texto | Label |
|---|---|---|---|
| `pendiente` | `--color-warning-bg` | `--color-warning` | "Pendiente" |
| `aprobada` | `--color-success-bg` | `--color-success` | "Aprobada" |
| `rechazada` | `--color-error-bg` | `--color-error` | "Rechazada" |

### `CertificateBadge`

| Estado | Fondo | Texto | Label |
|---|---|---|---|
| `disponible` | `--color-brand-lime-bg` | `--color-brand-lime` | "Certificado disponible" |
| `encuesta-pendiente` | `--color-warning-bg` | `--color-warning` | "Encuesta pendiente" |
| `no-disponible` | No se renderiza | | |

### `CupoBadge`

| Estado | Fondo | Texto | Label |
|---|---|---|---|
| `limitado` | `--color-warning-bg` | `--color-warning` | "Cupo limitado" |
| `agotado` | `--color-error-bg` | `--color-error` | "Cupo agotado" |
| `disponible` | No se renderiza | | |

### `NuevoBadge`

Fondo `--color-brand-orange` sólido, texto blanco. Label: "Nuevo". Aparece en capacitaciones publicadas hace menos de 7 días. Única excepción a la regla de fondo semitransparente — usa fondo sólido para máxima llamada de atención.

---

## 9. Card de capacitación (`TrainingCard`)

El componente más importante de la plataforma.

### Estructura visual

```
┌────────────────────────────────────┐
│  THUMB — altura fija 160px         │
│  (foto con object-fit cover        │
│   o placeholder sutil)             │
├────────────────────────────────────┤
│  padding: 16px                     │
│                                    │
│  Título de la capacitación         │  ← heading-4, --color-text-primary
│  line-clamp-2                      │     PRIMER elemento, nada antes
│                                    │
│  Nombre del programa               │  ← body-sm, --color-text-secondary, mt 2px
│                                    │
│  [TrainingModalityBadge]           │  ← mt 10px
│                                    │
│  📍 Localidad                      │  ← body-sm, --color-text-secondary, mt 8px
│  📅 Inicio: fecha                  │  ← body-sm, --color-text-secondary, gap 4px
│  🕒 N horas                        │  ← body-sm, --color-text-secondary, gap 4px
│  👥 N de M cupos disponibles       │  ← body-sm, --color-text-secondary, gap 4px
│     o [CupoBadge]                  │
│                                    │
│  ────────────────────────────────  │  ← --color-border, mt 12px
│                                    │
│  [Inscribirse]    [Ver detalle →]  │  ← mt 12px, justify-between
└────────────────────────────────────┘
```

### Thumb

**Con imagen:** `object-fit: cover`, `object-position: center`, width 100%, height 160px fijo.

**Sin imagen (placeholder):** fondo `--color-brand-teal-bg`, ícono `GraduationCap` 28px centrado en `--color-brand-teal` opacidad 60%, nombre del programa en `label` 10px uppercase debajo. El placeholder es sutil, no protagonista.

El nombre del programa aparece **siempre en el área de contenido** debajo del título, independientemente de si hay foto. El thumb nunca muestra texto superpuesto ni badges flotantes.

### Lógica de cupo

- `capacity === null` → no mostrar línea de cupo
- `enrollmentsCount >= capacity` → `CupoBadge` estado `agotado`
- `enrollmentsCount / capacity >= 0.8` → `CupoBadge` estado `limitado`
- Normal → texto "N de M cupos disponibles" con ícono `Users` 14px

### Área de acciones

**Inscripción disponible** (`isRegistrationEnabled === true` y cupo no agotado):
- Botón Primary `sm` "Inscribirse" a la izquierda
- Link ghost "Ver detalle →" en `--color-brand-teal` a la derecha

**Inscripción cerrada** (`isRegistrationEnabled === false` o cupo agotado):
- `<span>` "Inscripción cerrada" en `body-sm` `--color-text-secondary` a la izquierda
- Link ghost "Ver detalle →" siempre activo a la derecha

"Inscripción cerrada" es siempre un `<span>`, nunca un botón. Sin `disabled`, sin `opacity`, sin `cursor-not-allowed` en esta área.

### Formato de fecha

"15 de junio de 2026". Si `startDate` es null: "Fecha a confirmar" en `--color-text-secondary`.

### Comportamiento

Border 1px `--color-border`, border-radius `--radius-md`. Hover: `--shadow-md`, `translateY(-2px)`, transición 150ms ease.

### Lo que NO va en la card

Descripción larga, horario detallado, información de inscripción, nombre del capacitador, `NuevoBadge`, `TrainingScopeBadge`. Todo eso vive en la pantalla de detalle.

---

## 10. Logo (`CapturLogo`)

Componente `components/shared/CapturLogo.tsx`.

### Tamaños

| Prop `size` | Height | Uso |
|---|---|---|
| `sm` | 28px | Contextos compactos |
| `md` | 36px | Header público, header backoffice (default) |
| `lg` | 48px | Footer, páginas de auth |
| `xl` | 64px | Hero, splash |

Ancho siempre `auto` — mantiene aspect ratio.

### Contexto

- `context="light"`: sobre fondo blanco. `mix-blend-mode: multiply`.
- `context="dark"`: sobre fondo de color. Sin `mix-blend-mode`.

### Sidebar colapsado

En 64px de ancho el logo horizontal no tiene espacio. Se reemplaza por círculo de iniciales "CT": 36×36px, fondo `--color-brand-teal-bg`, texto `--color-brand-teal`, font `label` peso 600.

**Deuda técnica:** la solución definitiva es el logo en SVG o PNG con fondo transparente, eliminando la necesidad de `mix-blend-mode`.

---

## 11. Navegación — Portal público (`PublicHeader`)

Header sticky, fondo `--color-background`, borde inferior `1px solid var(--color-border)`. Max-width 1200px centrado.

- **Izquierda:** `CapturLogo` size `md` (size `sm` en mobile < 640px)
- **Centro:** Inicio · Capacitaciones · Preguntas frecuentes — `body-md`, hover `--color-brand-teal`, activo peso 500
- **Derecha:** Ghost "Ingresar" + Primary "Registrarse"

Mobile: ícono `Menu`, `Sheet` desde izquierda con links apilados y botones al fondo.

---

## 12. Navegación — Backoffice (`BackofficeSidebar`)

Estructura WordPress. Esquema claro con acento de marca.

### Sidebar

Ancho expandido 240px · colapsado 64px · transición 200ms ease · fondo `--color-sidebar-bg` · borde derecho `1px solid var(--color-sidebar-border)`.

**Ítem default:** fondo transparente, texto `--color-sidebar-text`, ícono `--color-sidebar-icon`, padding 8px 12px, `--radius-md`.

**Ítem hover:** fondo `--color-sidebar-hover-bg`, transición 150ms.

**Ítem activo:** fondo `--color-sidebar-active-bg`, texto `--color-sidebar-active-text` peso 500, ícono `--color-sidebar-active-icon`, borde izquierdo `3px solid var(--color-sidebar-active-border)`, border-radius 0 8px 8px 0.

**Labels de grupo:** `label` 10px uppercase, `--color-sidebar-group-label`, padding 16px 12px 4px.

**Colapsado:** solo íconos centrados, tooltip de shadcn al hover.

### Estructura de grupos

```
LayoutDashboard   Dashboard
──────────────────────────────
CAPACITACIONES
BookOpen          Todas las capacitaciones
Globe             Capacitaciones externas
Tag               Programas
──────────────────────────────
USUARIOS
User              Beneficiarios
GraduationCap     Capacitadores
ShieldCheck       Administradores
──────────────────────────────
FileCheck2        Certificados
ClipboardList     Encuestas
──────────────────────────────
CONTENIDO
Images            Slideshow
HelpCircle        Preguntas frecuentes
──────────────────────────────
CONFIGURACIÓN
Sliders           Modalidades
Building2         Organizadores
Users             Tipos de destinatario
Landmark          Ámbitos
```

### Header del backoffice

Fondo `--color-background`, borde inferior `1px solid var(--color-border)`. Toggle `PanelLeftClose`/`PanelLeftOpen` izquierda · nombre de sección `heading-4` centro · avatar con iniciales (36px, `--color-brand-teal-bg`, `--color-brand-teal`) + dropdown derecha.

---

## 13. Tablas

Base: componente `Table` de shadcn/ui.

**TableHeader:** fondo `--color-surface`, texto `body-sm` peso 500 `--color-text-secondary` uppercase, borde inferior `1px solid var(--color-border-strong)`, padding 12px 16px.

**TableRow:** fondo `--color-background`, hover `--color-surface`, borde inferior `1px solid var(--color-border)`, padding 14px 16px, transición 150ms.

**Íconos de acción:** `Edit2` y `Trash2`, 16px, default `--color-text-secondary`. Hover: `Edit2` → `--color-brand-teal`, `Trash2` → `--color-error`. Gap 12px.

**Avatar con iniciales:** círculo 32px, fondo `--color-brand-teal-bg`, texto `--color-brand-teal`, font `label` peso 600.

**Celda sin dato:** texto "—", `--color-text-disabled`.

**Header de sección:** `flex justify-between` · título `heading-4` izquierda · botón Primary sm + ícono `Plus` derecha.

**Paginación:** `flex justify-between` · texto conteo `body-sm` `--color-text-secondary` izquierda · Ghost sm para páginas no activas, Secondary sm para activa.

---

## 14. Estados de carga y vacíos

### Skeletons

Componente `Skeleton` de shadcn. Reproducir la forma del contenido real.

- `TrainingCardSkeleton`: bloque 160px (thumb) + área de contenido con líneas variables + dos bloques de botón
- `TableSkeleton`: 5 filas × 4 columnas, anchos variables

### `EmptyState`

Toda lista o tabla tiene un estado vacío explícito.

Estructura: flex column, items-center, py-12, text-center. Ícono Lucide 48px `--color-text-secondary` · título `heading-4` · descripción `body-md` `--color-text-secondary` mt-1 · botón Primary md mt-4 si hay acción posible.

---

## 15. Terminología

| ✅ Correcto | ❌ Incorrecto |
|---|---|
| Capacitación | Curso |
| Beneficiario | Alumno / Usuario |
| Inscripción | Matrícula / Registro |
| Capacitador | Instructor / Docente |

El código va en inglés. Los mensajes al usuario, labels, placeholders y textos de interfaz van en español con estos términos.

---

## 16. Decisiones tomadas — registro

| Decisión | Razón |
|---|---|
| Inter como fuente única | Fuente base de shadcn/ui, optimizada para pantallas, alta legibilidad para usuarios con baja experiencia tecnológica |
| Paleta derivada de materiales institucionales | Continuidad con identidad oficial de Captur sin requerir aprobación de nueva marca |
| Modelo espacial y componentes base de Stripe | Estándar probado, evita decisiones ad hoc en cada componente |
| Sidebar claro con acento de marca | Mayor contraste y accesibilidad que fondo oscuro. Crítico para plataforma gubernamental con usuarios de habilidades variadas |
| Thumb 160px fijo (no proporcional) | Evita que el placeholder ocupe toda la card. El contenido textual toma el protagonismo correcto |
| Título como primer elemento de la card | Sin ningún elemento antes del título — máxima jerarquía visual inmediata |
| Programa como texto de apoyo debajo del título | Siempre visible con o sin foto. No compite visualmente con el título |
| Badge de modalidad determinado por slug | Elimina inconsistencias de color cuando el nombre del campo varía tipográficamente |
| "Inscripción cerrada" como span, no botón | Evita layout shift en cards angostas y el bajo contraste del estado disabled |
| Cupo en formato "N de M cupos disponibles" | El usuario ve directamente cuántos quedan disponibles, no cuántos hay en total |
| DatePicker custom en lugar de input nativo | El nativo no es consistente entre sistemas operativos y no aplica los estilos del design system |
| Iniciales "CT" en sidebar colapsado | El logo horizontal no puede escalar a 64px sin deformarse. Solución estándar de la industria |
| 3 columnas máximo en grilla de capacitaciones | Prioriza legibilidad de la card sobre densidad de información |
| Color semántico independiente de color de marca | Evita ambigüedad: el naranja de marca nunca se confunde con error, el verde lima nunca con success genérico |

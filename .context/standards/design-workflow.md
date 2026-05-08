# Design Workflow

Este documento describe cómo trabajamos juntos el diseñador (UI) y el desarrollador en cada proyecto. El objetivo es que el conocimiento de diseño quede en el repositorio — no en la cabeza de nadie — y que tanto el código como la UI partan siempre del mismo punto de verdad.

---

## El rol del diseñador en un equipo con AI

Con herramientas como Lovable y Claude Code, la ejecución — generar componentes, armar pantallas, escribir código — se aceleró enormemente. Cualquiera con el contexto correcto puede generar una pantalla funcional en minutos. Eso cambia el valor que aporta un diseñador, pero no lo elimina — lo reenfoca.

**Lo que AI puede hacer bien:**
- Generar componentes y pantallas a partir de un brief claro
- Mantener consistencia visual si tiene el design system como contexto
- Iterar rápidamente sobre variantes de un diseño existente

**Lo que AI no puede hacer:**
- Decidir si un flujo tiene fricción innecesaria para el usuario real
- Reconocer que un problema ya fue resuelto por otra plataforma y traer esa solución
- Pensar en el usuario mientras el developer está pensando en la arquitectura

Ese segundo grupo es exactamente donde está el valor de un diseñador con experiencia. No en generar pantallas — en tomar las decisiones correctas antes de que alguien genere algo.

### Dónde se concentra el valor del diseñador

**Criterio antes de la ejecución.** El momento más valioso del diseñador no es cuando abre Lovable — es cuando lee un flujo de usuario y dice "este paso sobra" o "acá conviene usar el patrón de onboarding de Stripe porque el usuario ya lo conoce". Esa decisión, tomada antes de ejecutar, evita trabajo que después hay que deshacer.

**La mirada del usuario.** El developer piensa en cómo construir el sistema. El diseñador piensa en cómo lo va a entender alguien que nunca lo vio. Las dos miradas son necesarias y no se reemplazan entre sí — se complementan.

**El sistema visual como activo del proyecto.** El diseñador no genera pantallas sueltas — construye un sistema coherente donde cada componente dialoga con los demás. Eso requiere criterio y visión de conjunto que va más allá de prompt a prompt.

### Cómo evoluciona el rol con este flujo de trabajo

En este flujo, el diseñador deja de ser principalmente un ejecutor para ser principalmente un definidor. Lovable ejecuta — el diseñador decide qué ejecutar y por qué. Eso no es menos trabajo, es trabajo diferente y más estratégico.

La documentación que el diseñador genera en cada flujo — patrones aplicados, decisiones tomadas, referencias usadas — es la forma concreta en que ese criterio queda en el proyecto. Esto tiene un efecto importante: cuando el developer necesita generar o ajustar algo de UI de forma autónoma, puede hacerlo sin desviarse de las decisiones de diseño que ya fueron tomadas. No se trata de trabajar sin el diseñador — se trata de que el criterio del diseñador esté presente incluso cuando no está en la misma sesión de trabajo.

Este cambio es una oportunidad para que el trabajo del diseñador tenga más impacto y más alcance, no menos.

---

## El hilo conductor: el flujo de usuario

Todo parte del relevamiento con el cliente. El developer, que también actúa como PO, documenta los flujos de usuario antes de que cualquiera empiece a ejecutar. El flujo de usuario es la unidad central de trabajo — de él se derivan los issues de desarrollo y las pantallas de diseño.

```
Relevamiento con cliente
         ↓
Flujos de usuario documentados en el repo
         ↓              ↓
Issues en Linear    Pantallas en Lovable
(Developer)         (Diseñador)
         ↓              ↓
Claude Code         Design System en repo
```

Nadie ejecuta antes de que el flujo de usuario esté cerrado y acordado entre los dos.

---

## Stack

El diseñador configura Lovable con el stack del proyecto desde el inicio. No se genera nada con un stack diferente al definido.

Stack actual:

- **Frontend:** Next.js + TypeScript
- **UI:** Tailwind CSS + shadcn/ui
- **Forms:** React Hook Form + Zod
- **Data fetching:** TanStack Query

---

## Fase 0 — Antes de la primera pantalla (una vez por proyecto)

Antes de generar cualquier pantalla, el diseñador define y commitea en el repo los foundations del proyecto. Este paso es obligatorio.

### Qué se define en Fase 0

**Design Tokens**
- Paleta de colores con semántica (no solo el hex — qué significa cada color y cuándo usarlo)
- Tipografía: familia, escala, pesos
- Espaciado y sistema de grillas
- Border radius, sombras, elevación

**Átomos**
- Botones (variantes y estados)
- Inputs, labels, mensajes de error
- Badges, avatares, iconos base

**UI Kit base**
- Componentes base listos para reutilizar en cualquier pantalla
- Generados en Lovable y exportados al repo

### Dónde vive esto en el repo

```
design/
  design-system.md       ← tokens, decisiones de foundations
  patterns.md            ← patrones reutilizables y referencias
  components/
    [componente].md      ← por cada componente: variantes, estados, cuándo usarlo
```

---

## Fase 1 — Por flujo de usuario

Una vez que Fase 0 está completa, se trabaja flujo por flujo.

### El flujo de trabajo

**Paso 1 — El developer documenta el flujo**

Antes de la reunión, el developer escribe el flujo de usuario en el repo con este formato:

```markdown
## Flujo: [Nombre del flujo]

### Objetivo
Qué quiere lograr el usuario al completar este flujo.

### Pasos
1. ...
2. ...
3. ...

### Pantallas (Diseñador)
- NombreDePantalla
- NombreDePantalla

### Funcionalidades (Developer)
- Descripción de endpoint o lógica de negocio
- ...

### Restricciones de UX
- Qué no puede saltear el usuario
- Casos de error que hay que cubrir
- Perfil de usuario al que apunta (si aplica)

### Referencias de diseño
- Referencia: [plataforma o patrón a seguir] porque [razón]
```

**Paso 2 — Reunión corta**

Los dos revisan el flujo. El diseñador agrega qué patrones va a aplicar y confirma las pantallas. Cinco minutos. Si hay dudas, se resuelven acá — no durante la ejecución.

**Paso 3 — Ejecución en paralelo**

```
Diseñador                          Developer
─────────────────────              ─────────────────────
Lee el flujo                       Crea issues en Linear
Genera pantallas en Lovable        Implementa con Claude Code
Reutiliza UI Kit de Fase 0         Implementa lógica de negocio
Exporta componentes al repo        Tests incluidos
Actualiza design/                  Spec en el issue
```

**Paso 4 — El diseñador documenta lo que generó**

Después de cada flujo, el diseñador commitea en el repo:

```markdown
<!-- design/sessions/KER-XX.md -->

## Sesión: [Nombre del flujo] — KER-XX

### Pantallas generadas
- NombreDePantalla → descripción breve

### Componentes nuevos creados
- NombreDeComponente → cuándo usarlo

### Decisiones tomadas
- Decisión: [qué se decidió] — Razón: [por qué]

### Patrones aplicados
- [Patrón] tomado de [referencia] porque [razón]
```

Esto no es documentación extra — es el registro de las decisiones que de otra forma quedan solo en la cabeza del diseñador.

---

## Principios de diseño para este proyecto

Estos principios aplican a todas las pantallas y componentes. Son restricciones funcionales, no solo estéticas.

### Accesibilidad y claridad ante todo

Los usuarios de esta plataforma tienen diferentes niveles de habilidad tecnológica. Una pantalla que requiere un instructivo para usarse es una pantalla que falló.

- Jerarquía visual clara — el usuario sabe qué hacer sin leer
- Estados de error, éxito y carga siempre presentes y legibles
- Sin ambigüedad en los flujos — cada paso tiene un solo camino obvio
- Contraste alto, tipografía legible, botones con labels descriptivos

### Reutilización por encima de la originalidad

Antes de crear un componente nuevo, verificar si ya existe en el UI Kit. Si existe, reutilizar. Si hay que modificarlo, actualizar el componente base y documentar el cambio — no crear una variante ad hoc.

### El código que sale de Lovable vive en el repo

El repo es la fuente de verdad, no Lovable. Todo lo que se genera en Lovable se exporta, se commitea y se documenta. Si no está en el repo, no existe.

---

## Cómo se sincroniza el trabajo

| Momento | Qué pasa |
|---|---|
| Inicio de proyecto | Fase 0: foundations antes de cualquier pantalla |
| Inicio de flujo | Developer documenta, reunión corta para cerrar |
| Durante ejecución | Trabajo en paralelo, cada uno en su herramienta |
| Fin de flujo | Diseñador commitea sesión, developer cierra issue |
| Fin de proyecto | Design system actualizado y completo en el repo |

---

## Por qué trabajamos así

El conocimiento de diseño tiene que pertenecer al proyecto, no a una persona. El Design System que el diseñador construye y documenta es la fuente de verdad compartida — no una reunión de memoria cada vez que arranca algo nuevo.

Cuando el developer necesita generar o ajustar UI de forma autónoma, el repo le da el contexto suficiente para hacerlo sin desviarse de las decisiones que el diseñador ya tomó. No se trata de reemplazar el criterio del diseñador — se trata de que ese criterio tenga alcance más allá de cada sesión de trabajo puntual.

El objetivo no es burocracia — es que las decisiones que ya se tomaron bien no se tomen de nuevo, y que cuando alguien las ejecute, las ejecute correctamente.

# UI Standards

Este documento define los patrones de comportamiento de la interfaz. No describe cómo se ve algo — eso está en el Design System. Describe cómo se comporta: cuándo mostrar un toast, qué tono usar en un error, cómo se representa un estado de carga.

Toda decisión de comportamiento de UI que se tome durante el desarrollo se documenta acá para no tomarla de nuevo en el próximo componente.

---

## Feedback al usuario

### Cuándo usar cada mecanismo

| Situación | Mecanismo | Componente |
|---|---|---|
| Acción exitosa que no cambia la pantalla (guardar, enviar) | Toast | `Toaster` + `useToast` (shadcn) |
| Acción exitosa que lleva a otra pantalla | Redirección sin toast | — |
| Error de validación de formulario | Inline bajo el campo | `FormMessage` (shadcn) |
| Error de servidor en un formulario | Toast destructivo | `Toaster` + variante `destructive` |
| Error de servidor en una acción sin formulario | Toast destructivo | `Toaster` + variante `destructive` |
| Error crítico que bloquea la página | Inline en la página | Componente `ErrorState` |
| Confirmación antes de una acción destructiva | Dialog de confirmación | `AlertDialog` (shadcn) |
| Información contextual secundaria | Tooltip | `Tooltip` (shadcn) |

### Regla general

- **Toast:** para resultados de acciones que el usuario ya completó. El usuario no tiene que hacer nada con el toast — es informativo.
- **Inline:** para errores que el usuario tiene que corregir. El mensaje vive junto al elemento que necesita corrección.
- **Dialog:** para acciones que no se pueden deshacer. Eliminar, cancelar una inscripción, revocar acceso.

No mezclar: si un formulario tiene errores de validación, no mostrar toast. Si una acción fue exitosa, no mostrar inline.

---

## Toasts

### Componente

Usar exclusivamente `Toaster` y `useToast` de shadcn/ui. No crear sistemas de notificación paralelos.

```tsx
const { toast } = useToast()

// Éxito
toast({
  title: "Inscripción confirmada",
  description: "Recibirás un email con los detalles del curso.",
})

// Error
toast({
  title: "No se pudo completar la acción",
  description: "Intentá de nuevo en unos minutos.",
  variant: "destructive",
})
```

### Posición

Siempre en la esquina inferior derecha. No modificar la posición del `Toaster`.

### Duración

- Toasts de éxito: duración default (4 segundos)
- Toasts de error: duración extendida (6 segundos) para que el usuario pueda leer

### Tono de los mensajes

**Éxito:** afirmativo y específico. Decir qué pasó, no solo "Éxito".
```
✅ "Inscripción confirmada"
✅ "Certificado enviado a tu email"
❌ "Operación exitosa"
❌ "OK"
```

**Error:** claro y sin culpar al usuario. Decir qué falló y qué puede hacer.
```
✅ "No se pudo enviar el certificado. Intentá de nuevo o contactá al administrador."
❌ "Error 500"
❌ "Algo salió mal"
❌ "Error: invalid_response"
```

**Advertencia:** específica sobre qué tiene que revisar el usuario.
```
✅ "El cupo del curso está por agotarse"
❌ "Advertencia"
```

---

## Errores de formulario

### Validación del lado del cliente

Usar `React Hook Form` + `Zod`. El error aparece debajo del campo al salir del mismo (`onBlur`) o al intentar enviar.

Usar el componente `FormMessage` de shadcn — no crear mensajes de error custom.

```tsx
<FormField
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage /> {/* ← siempre presente */}
    </FormItem>
  )}
/>
```

### Mensajes de validación

Escribir en español, en segunda persona, sin signos de exclamación.

```
✅ "Ingresá un email válido"
✅ "Este campo es obligatorio"
✅ "La contraseña debe tener al menos 8 caracteres"
❌ "Email inválido!"
❌ "Required"
❌ "El campo email no puede estar vacío en este momento"
```

### Error de servidor en formulario

Si el servidor rechaza el envío, mostrar un toast destructivo. No bloquear el formulario — el usuario tiene que poder corregir y reintentar.

---

## Estados de carga

### Regla general

Toda operación asíncrona tiene que tener un estado de carga visible. El usuario nunca debería quedar mirando una pantalla estática sin saber si algo está pasando.

### Por tipo de operación

| Operación | Mecanismo |
|---|---|
| Carga inicial de página | Skeleton (estructura de la página) |
| Carga de lista o tabla | Skeleton de filas |
| Envío de formulario | Botón con spinner + disabled |
| Acción en un item (eliminar, aprobar) | Spinner inline en el elemento |
| Navegación entre páginas | Loading bar superior (si aplica) |

### Componentes

- **Skeleton:** `Skeleton` de shadcn. Reproducir la forma aproximada del contenido que va a aparecer.
- **Spinner en botón:** reemplazar el label del botón con un spinner + texto en gerundio mientras dura la operación.
- **Botón durante carga:** siempre `disabled` para evitar doble envío.

```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Guardando...
    </>
  ) : (
    "Guardar"
  )}
</Button>
```

### Textos de carga en botones

Usar gerundio del verbo de la acción:

```
Guardar → Guardando...
Enviar → Enviando...
Inscribirse → Procesando inscripción...
Descargar → Generando certificado...
Eliminar → Eliminando...
```

---

## Estados vacíos

Toda lista o tabla tiene que tener un estado vacío explícito. Nunca mostrar una lista vacía sin contexto.

El estado vacío incluye:
- Un ícono representativo (no decorativo)
- Un título que describe la situación
- Una descripción opcional con instrucciones o contexto
- Una acción primaria cuando corresponde

```tsx
// Estructura de un estado vacío
<div className="flex flex-col items-center justify-center py-12 text-center">
  <IconoRepresentativo className="h-12 w-12 text-muted-foreground mb-4" />
  <h3 className="text-lg font-medium">No hay cursos disponibles</h3>
  <p className="text-muted-foreground mt-1">
    Todavía no se publicaron cursos. Volvé a revisar pronto.
  </p>
  {/* Acción solo si el usuario puede hacer algo al respecto */}
  <Button className="mt-4">Explorar oferta formativa</Button>
</div>
```

---

## Acciones destructivas

Toda acción que no se puede deshacer requiere confirmación explícita del usuario.

Usar `AlertDialog` de shadcn. No usar `window.confirm`.

### Contenido del dialog

- **Título:** qué va a pasar, en afirmativo. No "¿Estás seguro?"
- **Descripción:** consecuencia concreta de la acción
- **Botón de cancelar:** siempre presente, siempre a la izquierda
- **Botón de confirmar:** variante destructiva, a la derecha, con el verbo de la acción

```
Título:      "Cancelar inscripción"
Descripción: "Vas a cancelar tu inscripción al curso Atención al Cliente.
              Esta acción no se puede deshacer."
Cancelar:    "Volver"
Confirmar:   "Cancelar inscripción"  ← no "Sí" ni "Confirmar"
```

---

## Navegación y redirecciones

- Después de crear un registro: redirigir al detalle del registro creado
- Después de editar: redirigir al detalle o a la lista, según el contexto
- Después de eliminar: redirigir a la lista
- Después de una acción sin pantalla de destino obvia: quedarse en la misma pantalla con un toast de confirmación

---

## Permisos y acceso restringido

Si un usuario accede a una ruta sin los permisos necesarios:
- No mostrar un error genérico
- Mostrar una página de acceso denegado con contexto claro y un link de vuelta

Si un elemento de la UI no está disponible para el rol actual:
- Ocultarlo si el usuario no necesita saber que existe
- Deshabilitarlo con tooltip explicativo si el usuario necesita saber que existe pero no puede usarlo

---

## Tono general de la interfaz

La plataforma es de uso gubernamental con usuarios de diferentes niveles de habilidad tecnológica. El tono tiene que ser:

- **Claro:** una palabra simple antes que una técnica
- **Directo:** decir qué hacer, no describir el sistema
- **Respetuoso:** segunda persona sin tuteo excesivo ni formalidad extrema
- **Sin jerga técnica** en mensajes al usuario final

```
✅ "Completá tu perfil para acceder a los cursos"
✅ "Ingresá tu email y contraseña"
❌ "Autenticación requerida"
❌ "Token de sesión expirado"
❌ "Error 403: Forbidden"
```

---

## Cómo actualizar este documento

Cuando durante el desarrollo se toma una decisión de comportamiento de UI que no está cubierta acá, se agrega antes de implementarla. Si la decisión contradice algo que ya está documentado, se discute entre developer y diseñador antes de modificar el documento — no se cambia unilateralmente.

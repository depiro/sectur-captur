# Naming Conventions

Este documento define los nombres compartidos entre base de datos, backend, frontend y UI. El objetivo es que todos los miembros del equipo y las herramientas de AI hablen el mismo idioma — sin que nadie tenga que adivinar si una tabla `users` corresponde al componente `UserCard` o `BeneficiaryCard`.

## Principio general

El nombre nace en la base de datos y se propaga hacia arriba. Si la tabla se llama `courses`, el endpoint es `/courses`, el tipo TypeScript es `Course`, el componente es `CourseCard` y la página es `CoursesPage`. No se inventan sinónimos en cada capa.

---

## Reglas por capa

### Base de datos

- Nombres en **inglés**
- **snake_case**
- Tablas en **plural** (`courses`, `users`, `enrollments`)
- Columnas en **singular descriptivo** (`created_at`, `enrollment_date`, `is_active`)
- Claves foráneas: `[tabla_singular]_id` (`course_id`, `user_id`)
- Tablas de relación many-to-many: `[tabla_a]_[tabla_b]` en orden alfabético (`course_trainers`)

```
✅ courses, course_editions, course_trainers, enrollment_id
❌ curso, courseList, tbl_courses, CourseEdition
```

### Backend (NestJS)

- Módulos: **camelCase singular** (`courseModule`, `userModule`)
- Servicios: **PascalCase** (`CoursesService`, `EnrollmentsService`)
- Controladores: **PascalCase** (`CoursesController`)
- DTOs: **PascalCase + sufijo** (`CreateCourseDto`, `UpdateEnrollmentDto`)
- Tipos/interfaces: **PascalCase** (`Course`, `Enrollment`, `User`)
- Rutas de API: **kebab-case plural** (`/courses`, `/course-editions`, `/course-trainers`)

```
✅ CoursesService, CreateCourseDto, /course-editions
❌ courseService, CourseDTO, /CourseEditions
```

### Frontend (Next.js)

- Páginas: **PascalCase + sufijo Page** (`CoursesPage`, `CourseDetailPage`, `EnrollmentPage`)
- Componentes: **PascalCase** (`CourseCard`, `EnrollmentForm`, `UserAvatar`)
- Hooks: **camelCase + prefijo use** (`useCourses`, `useEnrollment`, `useCurrentUser`)
- Stores / queries: **camelCase** (`coursesQuery`, `enrollmentMutation`)
- Archivos de componente: **PascalCase.tsx** (`CourseCard.tsx`, `EnrollmentForm.tsx`)
- Archivos de página: **kebab-case** en Next.js App Router (`courses/page.tsx`, `courses/[id]/page.tsx`)

```
✅ CourseCard.tsx, useEnrollments, CoursesPage
❌ coursecard.tsx, UseEnrollments, courses-page
```

### UI (Lovable / shadcn)

- Componentes de sistema (shadcn): usar el nombre original sin modificar (`Button`, `Dialog`, `Toast`)
- Componentes de negocio: **PascalCase descriptivo** que refleje la entidad (`CourseCard`, `EnrollmentStatusBadge`, `TrainerProfileCard`)
- Evitar nombres genéricos que no digan qué contienen (`Card`, `ListItem`, `Row`)

```
✅ CourseCard, EnrollmentStatusBadge, CertificateDownloadButton
❌ Card, Item, CustomButton, MyComponent
```

---

## Tabla de entidades del proyecto

Esta tabla se completa a medida que se analiza la base de datos actual y se definen las entidades del nuevo sistema. Es la referencia compartida entre todos.

| DB (tabla) | Backend (tipo) | Frontend (componente) | Página principal | Notas |
|---|---|---|---|---|
| `users` | `User` | `UserCard` | `UsersPage` | Incluye todos los roles |
| `courses` | `Course` | `CourseCard` | `CoursesPage` | |
| `course_editions` | `CourseEdition` | `CourseEditionCard` | — | Se muestra dentro de CourseDetailPage |
| `enrollments` | `Enrollment` | `EnrollmentStatusBadge` | `EnrollmentsPage` | |
| `certificates` | `Certificate` | `CertificateCard` | `CertificatesPage` | |
| `trainers` | `Trainer` | `TrainerCard` | `TrainersPage` | |
| `programs` | `Program` | `ProgramBadge` | `ProgramsPage` | |
| *(agregar a medida que se define el modelo)* | | | | |

---

## Traducción entre capas — referencia rápida

Dado un nombre de tabla, así se deriva el nombre en cada capa:

| DB | Backend tipo | Backend servicio | API route | Componente | Página |
|---|---|---|---|---|---|
| `courses` | `Course` | `CoursesService` | `/courses` | `CourseCard` | `CoursesPage` |
| `course_editions` | `CourseEdition` | `CourseEditionsService` | `/course-editions` | `CourseEditionCard` | — |
| `enrollments` | `Enrollment` | `EnrollmentsService` | `/enrollments` | `EnrollmentForm` | `EnrollmentsPage` |
| `certificates` | `Certificate` | `CertificatesService` | `/certificates` | `CertificateCard` | `CertificatesPage` |

---

## Reglas de nombrado de archivos

```
frontend/
  app/
    courses/
      page.tsx                  ← CoursesPage
      [id]/
        page.tsx                ← CourseDetailPage
  components/
    courses/
      CourseCard.tsx
      CourseEditionCard.tsx
    enrollments/
      EnrollmentForm.tsx
      EnrollmentStatusBadge.tsx
    ui/                         ← componentes shadcn (no modificar nombres)
      button.tsx
      dialog.tsx
```

---

## Idioma

- **Código, base de datos, componentes, tipos:** inglés siempre
- **Comentarios en código:** inglés preferentemente, español aceptable si el concepto es muy específico del dominio local
- **Documentación (este archivo y similares):** español
- **Mensajes al usuario en la UI:** español

---

## Cómo actualizar este documento

Cuando se define una entidad nueva durante el análisis de base de datos o el diseño de un flujo de usuario, se agrega a la tabla de entidades antes de que alguien empiece a implementar. El developer propone el nombre de DB, el diseñador adopta la convención para los componentes. No se discute el nombre durante la implementación — se discute acá.

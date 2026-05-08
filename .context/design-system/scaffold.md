# Captur — Scaffold
## Frontend (Next.js App Router)

This document defines the folder and file structure for the Captur frontend. It serves as the reference so that any team member or AI tool knows exactly where everything lives.

The structure follows the project naming conventions: PascalCase filenames for components, kebab-case for Next.js App Router routes.

---

## File Status

- ✅ Exists — generated in Phase 0
- ⏳ Pending — to be generated in Phase 1 or later
- 🔧 Partial — structure defined, content still to be completed

---

```txt
captur-frontend/
│
├── public/
│   └── images/
│       └── logo-captur.png              ✅ Official Captur logo
│
├── app/                                 Next.js App Router
│   │
│   ├── layout.tsx                       ✅ Root layout — Inter font, Toaster
│   ├── globals.css                      ✅ Design system CSS variables
│   ├── page.tsx                         ✅ UI Kit (Phase 0) — showcase page
│   │
│   ├── (public)/                        Public portal routes
│   │   ├── layout.tsx                   ⏳ Layout with PublicHeader and Footer
│   │   ├── capacitaciones/
│   │   │   ├── page.tsx                 ⏳ Training list (portal)
│   │   │   └── [id]/
│   │   │       └── page.tsx             ⏳ Training detail
│   │   ├── capacitaciones-externas/
│   │   │   └── page.tsx                 ⏳ External training list
│   │   └── preguntas-frecuentes/
│   │       └── page.tsx                 ⏳ Frequently asked questions
│   │
│   ├── (auth)/                          Authentication routes
│   │   ├── layout.tsx                   ⏳ Auth layout (without header/sidebar)
│   │   ├── login/
│   │   │   └── page.tsx                 ⏳ Login
│   │   ├── registro/
│   │   │   └── page.tsx                 ⏳ Beneficiary registration
│   │   └── recuperar-password/
│   │       └── page.tsx                 ⏳ Password recovery
│   │
│   ├── (beneficiario)/                  Logged-in beneficiary area routes
│   │   ├── layout.tsx                   ⏳ Layout with beneficiary navigation
│   │   ├── mis-inscripciones/
│   │   │   └── page.tsx                 ⏳ Beneficiary enrollment list
│   │   ├── mis-certificados/
│   │   │   └── page.tsx                 ⏳ Available certificates
│   │   └── mi-perfil/
│   │       └── page.tsx                 ⏳ Beneficiary profile
│   │
│   └── backoffice/                      Backoffice routes (admin)
│       ├── layout.tsx                   ⏳ Layout with BackofficeSidebar and header
│       ├── page.tsx                     ⏳ Dashboard
│       │
│       ├── capacitaciones/
│       │   ├── page.tsx                 ⏳ Training list (backoffice)
│       │   ├── nueva/
│       │   │   └── page.tsx             ⏳ Create training
│       │   └── [id]/
│       │       ├── page.tsx             ⏳ Training detail (backoffice)
│       │       ├── editar/
│       │       │   └── page.tsx         ⏳ Edit training
│       │       └── inscripciones/
│       │           └── page.tsx         ⏳ Training enrollments
│       │
│       ├── capacitaciones-externas/
│       │   ├── page.tsx                 ⏳ List
│       │   └── [id]/
│       │       └── page.tsx             ⏳ Detail / edit
│       │
│       ├── beneficiarios/
│       │   ├── page.tsx                 ⏳ Beneficiary list
│       │   └── [id]/
│       │       └── page.tsx             ⏳ Beneficiary profile
│       │
│       ├── capacitadores/
│       │   ├── page.tsx                 ⏳ Trainer list
│       │   └── [id]/
│       │       └── page.tsx             ⏳ Trainer profile
│       │
│       ├── administradores/
│       │   └── page.tsx                 ⏳ Administrator management
│       │
│       ├── certificados/
│       │   └── page.tsx                 ⏳ Certificate management
│       │
│       ├── encuestas/
│       │   ├── page.tsx                 ⏳ Survey list
│       │   └── [id]/
│       │       └── page.tsx             ⏳ Survey detail / results
│       │
│       ├── slideshow/
│       │   └── page.tsx                 ⏳ Slideshow management
│       │
│       ├── preguntas-frecuentes/
│       │   └── page.tsx                 ⏳ FAQ management
│       │
│       └── configuracion/
│           ├── modalidades/
│           │   └── page.tsx             ⏳ Modality management
│           ├── organizadores/
│           │   └── page.tsx             ⏳ Organizer management
│           ├── tipos-destinatario/
│           │   └── page.tsx             ⏳ Recipient profile management
│           └── ambitos/
│               └── page.tsx             ⏳ Scope management
│
├── components/
│   │
│   ├── ui/                              shadcn/ui components — DO NOT modify
│   │   ├── alert-dialog.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── select.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── table.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── tooltip.tsx
│
│   ├── shared/                          Reusable domain components
│   │   ├── CapturButton.tsx             ✅ Button with design system variants
│   │   ├── CapturDatePicker.tsx         ⏳ Custom DatePicker with month/year selector
│   │   ├── CapturLogo.tsx               ✅ Responsive logo with light/dark contexts
│   │   ├── EmptyState.tsx               ✅ Empty state for lists and tables
│   │   ├── CertificateBadge.tsx         ✅ Certificate status badge
│   │   ├── CupoBadge.tsx                ✅ Capacity status badge
│   │   ├── EnrollmentStatusBadge.tsx    ✅ Enrollment status badge
│   │   ├── NuevoBadge.tsx               ✅ "New" badge for recent trainings
│   │   ├── TrainingModalityBadge.tsx    ✅ Modality badge by slug
│   │   ├── TrainingScopeBadge.tsx       ✅ Scope badge (internal/external/partnership)
│   │   └── TrainingStatusBadge.tsx      ✅ Lifecycle status badge
│
│   ├── trainings/                       Training components
│   │   ├── TrainingCard.tsx             ✅ Training card (public portal)
│   │   ├── TrainingCardSkeleton.tsx     ✅ Card skeleton
│   │   ├── TrainingGrid.tsx             ⏳ Card grid with empty/loading states
│   │   ├── TrainingFilters.tsx          ⏳ Listing filters (modality, scope, etc.)
│   │   └── TrainingForm.tsx             ⏳ Create/edit training form (backoffice)
│
│   ├── enrollments/                     Enrollment components
│   │   ├── EnrollmentForm.tsx           ⏳ Enrollment form
│   │   └── EnrollmentTable.tsx          ⏳ Enrollment table (backoffice)
│
│   ├── certificates/                    Certificate components
│   │   ├── CertificateCard.tsx          ⏳ Certificate card (beneficiary area)
│   │   └── CertificateTable.tsx         ⏳ Certificate table (backoffice)
│
│   ├── users/                           User components
│   │   ├── UserCard.tsx                 ⏳ User card
│   │   └── UserTable.tsx                ⏳ User table (backoffice)
│
│   ├── trainers/                        Trainer components
│   │   ├── TrainerCard.tsx              ⏳ Trainer card
│   │   └── TrainerTable.tsx             ⏳ Trainer table (backoffice)
│
│   ├── surveys/                         Survey components
│   │   ├── SurveyForm.tsx               ⏳ Survey form (beneficiary)
│   │   └── SurveyResults.tsx            ⏳ Survey results (backoffice)
│
│   └── layout/                          Navigation and layout components
│       ├── PublicHeader.tsx             ✅ Public portal header
│       ├── PublicFooter.tsx             ⏳ Public portal footer
│       ├── BackofficeSidebar.tsx        ✅ Backoffice sidebar
│       └── BackofficeHeader.tsx         ✅ Backoffice header
│
├── hooks/                               Custom hooks
│   ├── useTrainings.ts                  ⏳ TanStack Query — training list
│   ├── useTraining.ts                   ⏳ TanStack Query — training detail
│   ├── useEnrollments.ts                ⏳ TanStack Query — enrollments
│   ├── useCertificates.ts               ⏳ TanStack Query — certificates
│   ├── useCurrentUser.ts                ⏳ Current authenticated user
│   └── useGeography.ts                  ⏳ Provinces, departments, municipalities, localities
│
├── lib/                                 Utilities and configuration
│   ├── api.ts                           ⏳ Base HTTP client (fetch wrapper)
│   ├── auth.ts                          ⏳ JWT authentication helpers
│   ├── utils.ts                         ✅ cn() and general utilities (shadcn)
│   └── formatters.ts                    ⏳ Date, number, and text formatting
│
├── types/                               Domain TypeScript types
│   ├── training.ts                      ⏳ Training, TrainingModality, TrainingScope…
│   ├── enrollment.ts                    ⏳ TrainingEnrollment
│   ├── user.ts                          ⏳ User, roles
│   ├── trainer.ts                       ⏳ Trainer
│   ├── certificate.ts                   ⏳ Certificate, CertificateTemplate
│   ├── survey.ts                        ⏳ Survey, SurveyQuestion, SurveyAnswer…
│   ├── geography.ts                     ⏳ Province, Department, Municipality, Locality
│   └── common.ts                        ⏳ PaginatedResponse, ApiError, etc.
│
├── tailwind.config.ts                   ✅ Custom typography scale from the design system
├── components.json                      ✅ shadcn/ui configuration
├── next.config.ts                       ✅ Next.js configuration
├── tsconfig.json                        ✅ Strict TypeScript
└── package.json                         ✅ Project dependencies
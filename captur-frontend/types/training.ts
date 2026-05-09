export type TrainingStatus =
  | "draft"
  | "published"
  | "in_progress"
  | "completed"
  | "cancelled"

export type TrainingModalitySlug =
  | "presencial"
  | "virtual-sincronica"
  | "virtual-asincronica"
  | "virtual"
  | "hibrida"
  | "mixta"

export type TrainingScopeSlug = "interno" | "externo" | "articulacion"

export interface TrainingModality {
  id: number
  name: string
  slug: TrainingModalitySlug
}

export interface TrainingScope {
  id: number
  name: string
  slug: TrainingScopeSlug
}

export interface Program {
  id: number
  name: string
}

export interface Organizer {
  id: number
  name: string
}

export interface Sponsor {
  id: number
  name: string
}

export interface Training {
  id: number
  title: string
  description?: string
  status: TrainingStatus
  hs: number | null
  startDate: string | null
  endDate: string | null
  capacity: number | null
  enrollmentsCount: number
  isRegistrationEnabled: boolean
  image: string | null
  programs: Program[]
  trainers: Array<{ id: number; firstName: string; lastName: string }>
  trainingModalities: TrainingModality[]
  scope?: TrainingScope
  locality?: { id: number; name: string }
  organizers?: Organizer[]
  sponsors?: Sponsor[]
  publishedAt?: string | null
  createdAt: string
  updatedAt: string
}

export interface ExternalTraining {
  id: number
  title: string
  institution: string
  description?: string
  startDate: string | null
  endDate: string | null
  url?: string
  createdAt: string
  updatedAt: string
}

export interface TrainingResource {
  id: number
  trainingId: number
  name: string
  url: string
  type: string
  createdAt: string
}

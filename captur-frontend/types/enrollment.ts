export type EnrollmentState = "pendiente" | "aprobada" | "rechazada"

export interface TrainingEnrollment {
  id: number
  trainingId: number
  userId: number
  state: EnrollmentState
  notes?: string
  training?: {
    id: number
    title: string
    startDate: string | null
    trainingModalities: Array<{ name: string; slug: string }>
  }
  user?: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

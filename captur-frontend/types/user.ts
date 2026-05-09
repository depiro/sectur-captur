export type UserRole = "ADMIN" | "USER" | "TRAINER" | "EDITOR"

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: UserRole
  dni?: string
  phone?: string
  locality?: { id: number; name: string }
  createdAt: string
  updatedAt: string
}

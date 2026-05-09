export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  perPage: number
  lastPage: number
}

export interface ApiError {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}

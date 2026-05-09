import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { TrainingEnrollment } from "@/types/enrollment"
import type { PaginatedResponse } from "@/types/common"

interface EnrollmentsParams {
  page?: number
  perPage?: number
  trainingId?: number
  userId?: number
  state?: string
}

export function useEnrollments(params: EnrollmentsParams = {}) {
  return useQuery({
    queryKey: ["enrollments", params],
    queryFn: () =>
      api.get<PaginatedResponse<TrainingEnrollment>>("/training-enrollments", {
        params: params as Record<string, string | number | boolean | undefined>,
      }),
  })
}

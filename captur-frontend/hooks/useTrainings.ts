import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Training } from "@/types/training"
import type { PaginatedResponse } from "@/types/common"

interface TrainingsParams {
  page?: number
  perPage?: number
  status?: string
  modalitySlug?: string
  scopeSlug?: string
  search?: string
}

export function useTrainings(params: TrainingsParams = {}) {
  return useQuery({
    queryKey: ["trainings", params],
    queryFn: () =>
      api.get<PaginatedResponse<Training>>("/trainings", { params: params as Record<string, string | number | boolean | undefined> }),
  })
}

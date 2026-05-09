import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Training } from "@/types/training"

export function useTraining(id: number) {
  return useQuery({
    queryKey: ["trainings", id],
    queryFn: () => api.get<Training>(`/trainings/${id}`),
    enabled: !!id,
  })
}

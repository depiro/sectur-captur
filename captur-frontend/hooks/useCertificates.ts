import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Certificate } from "@/types/certificate"
import type { PaginatedResponse } from "@/types/common"

export function useCertificates(userId?: number) {
  return useQuery({
    queryKey: ["certificates", { userId }],
    queryFn: () =>
      api.get<PaginatedResponse<Certificate>>("/certificates", {
        params: { userId },
      }),
    enabled: userId !== undefined,
  })
}

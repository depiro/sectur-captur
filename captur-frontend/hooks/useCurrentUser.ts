import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { getAuthHeaders, isAuthenticated } from "@/lib/auth"
import type { User } from "@/types/user"

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () =>
      api.get<User>("/auth/me", { headers: getAuthHeaders() }),
    enabled: isAuthenticated(),
    staleTime: Infinity,
  })
}

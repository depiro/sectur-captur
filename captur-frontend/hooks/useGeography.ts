import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Province, Department, Municipality, Locality } from "@/types/geography"

export function useProvinces() {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: () => api.get<Province[]>("/geography/provinces"),
    staleTime: Infinity,
  })
}

export function useDepartments(provinceId?: number) {
  return useQuery({
    queryKey: ["departments", provinceId],
    queryFn: () =>
      api.get<Department[]>("/geography/departments", {
        params: { provinceId },
      }),
    enabled: provinceId !== undefined,
    staleTime: Infinity,
  })
}

export function useMunicipalities(departmentId?: number) {
  return useQuery({
    queryKey: ["municipalities", departmentId],
    queryFn: () =>
      api.get<Municipality[]>("/geography/municipalities", {
        params: { departmentId },
      }),
    enabled: departmentId !== undefined,
    staleTime: Infinity,
  })
}

export function useLocalities(municipalityId?: number) {
  return useQuery({
    queryKey: ["localities", municipalityId],
    queryFn: () =>
      api.get<Locality[]>("/geography/localities", {
        params: { municipalityId },
      }),
    enabled: municipalityId !== undefined,
    staleTime: Infinity,
  })
}

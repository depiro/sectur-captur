export interface Province {
  id: number
  name: string
}

export interface Department {
  id: number
  name: string
  provinceId: number
}

export interface Municipality {
  id: number
  name: string
  departmentId: number
}

export interface Locality {
  id: number
  name: string
  municipalityId: number
}

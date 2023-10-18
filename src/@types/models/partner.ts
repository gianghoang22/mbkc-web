export interface Partner {
  partnerId: number
  name: string
  logo: string
  webUrl: string
  status: string
}

export interface PartnerToCreate {
  name: string
  webUrl: string
  logo?: File | string
}

export interface PartnerToUpdate {
  name: string
  logo?: File | string
  webUrl: string
  status: string
}

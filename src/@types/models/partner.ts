export interface Partner {
  partnerId: number;
  name: string;
  logo: string;
}

export interface PartnerToCreate {
  name: string;
  logo?: File | string;
}

export interface PartnerToUpdate {
  name: string;
  status: string;
  logo?: File | string;
}

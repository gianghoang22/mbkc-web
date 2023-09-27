export interface BrandData {
  no: number;
  brand: string;
  address: string;
  status: string;
}

export interface Brand {
  brandId: number;
  name: string;
  address: string;
  logo: string;
  status: string;
  brandManagerEmail: string;
}

export interface BrandToCreate {
  name: string;
  address: string;
  email: string;
  logoUrl?: string;
}

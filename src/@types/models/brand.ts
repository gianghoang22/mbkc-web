export interface BrandData {
  no: number;
  brand: string;
  address: string;
  status: string;
}

export interface Brand {
  brandId: number;
  brandImgUrl: string;
  brandName: string;
  address: string;
  brandManager: string;
  brandManagerEmail: string;
  status: string;
}

export interface BrandToAdd {
  name: string;
  address: string;
  email: string;
  logoUrl: string;
}

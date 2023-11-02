export interface KitchenCenterProfile {
  kitchenCenterId: number;
  name: string;
  address: string;
  logo: string;
  status: string;
  kitchenCenterManagerEmail: string;
}

export interface BrandProfile {
  brandId: number;
  name: string;
  address: string;
  logo: string;
  status: string;
  brandManagerEmail: string;
}

export interface UpdateBrandProfile {
  name: string;
  address: string;
  logo?: string;
}

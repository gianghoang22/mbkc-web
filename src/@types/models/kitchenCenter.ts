export interface KitchenCentersData {
  no: number;
  kitchenCenter: string;
  manager: string;
  status: string;
  numOfKitchen: number;
}

export interface KitchenCenter {
  kitchenCenterId: number;
  title: string;
  imageUrl: string;
  numberOfKitchens: number;
  address: string;
  status: string;
  kitchenCenterManager?: string;
}

export interface KitchenCenterToAdd {
  name: string;
  numberOfKitchens: number;
  cityProvince: string;
  district: string;
  address: string;
  logoUrl: string;
}

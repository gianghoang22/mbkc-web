export interface KitchenCentersData {
  no: number;
  kitchenCenter: string;
  status: string;
}

export interface KitchenCenter {
  kitchenCenterId: number;
  title: string;
  imageUrl: string;
  address: string;
  status: string;
}

export interface KitchenCenterToAdd {
  name: string;
  address: string;
  logoUrl: string;
}

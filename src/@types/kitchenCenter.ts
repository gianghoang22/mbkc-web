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
}

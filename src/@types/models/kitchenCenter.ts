export interface KitchenCentersData {
  no: number;
  kitchenCenter: string;
  status: string;
}

export interface KitchenCenter {
  kitchenCenterId: number;
  name: string;
  logo: string;
  address: string;
  status: string;
}

export interface KitchenCenterToAdd {
  name: string;
  address: string;
  logo: string;
}

export interface KitchenCenterOptions {
  itemsPerPage: number;
  currentPage: number;
  searchValue?: string;
}

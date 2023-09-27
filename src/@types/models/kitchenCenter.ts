import { NavigateFunction } from 'react-router-dom';

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
  managerEmail: string;
  status: string;
}

export interface KitchenCenterToAdd {
  Name: string;
  Address: string;
  Logo: string;
  ManagerEmail: string;
}

export interface KitchenCenterOptions {
  itemsPerPage: number;
  currentPage: number;
  searchValue?: string;
}

export interface newKitchenCenter {
  Name: string;
  Address: string;
  Logo: any;
  ManagerEmail: string;
}

export interface CreateKitchenCenterParams {
  newKitchenCenter: newKitchenCenter;
  navigate: NavigateFunction;
}

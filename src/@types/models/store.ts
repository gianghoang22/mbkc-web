import { Brand } from './brand';
import { KitchenCenter } from './kitchenCenter';

export interface Store {
  storeId: number;
  name: string;
  status: string;
  logo: string;
  storeManagerEmail: string;
  kitchenCenter: KitchenCenter;
  brand: Brand;
}

export interface StoreToCreate {
  name: string;
  logo?: File | string;
  storeManagerEmail: string;
  kitchenCenterId: number;
  brandId: number;
}

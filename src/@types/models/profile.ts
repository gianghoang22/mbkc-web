import { Brand } from './brand';
import { KitchenCenter } from './kitchenCenter';

export interface Profile {
  kitchenCenterId?: number;
  name: string;
  address: string;
  status: string;
  logo: string;
  brandId?: number;
  rejectedReason?: string;
  kitchenCenterManagerEmail?: string;
  brandManagerEmail?: string;
  storeManagerEmail?: string;
  kitchenCenter?: KitchenCenter;
  brand?: Brand;
}

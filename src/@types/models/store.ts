import { Status } from 'common/enum';
import { Brand } from './brand';
import { KitchenCenter } from './kitchenCenter';

export interface Store {
  storeId: number;
  name: string;
  status: string;
  logo: string;
  storeManagerEmail: string;
  rejectedReason?: string | null;
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

export interface StoreToUpdate {
  name: string;
  status: string;
  logo?: File | string;
  storeManagerEmail: string;
}

export interface ToUpdateStatus {
  status: string;
}

export interface StoreToConfirm {
  status: string;
  rejectedReason: string;
}

export const STORE_STATUS_TABS = [
  {
    value: Status.ALL,
    label: 'All',
    id: 'all',
  },
  {
    value: Status.ACTIVE,
    label: 'Active',
    id: 'Act',
  },
  {
    value: Status.INACTIVE,
    label: 'Inactive',
    id: 'Ina',
  },
  {
    value: Status.BE_CONFIRMING,
    label: 'Be Confirming',
    id: 'Con',
  },
  {
    value: Status.REJECTED,
    label: 'Rejected',
    id: 'Rej',
  },
];

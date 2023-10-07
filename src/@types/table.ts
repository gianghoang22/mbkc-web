import { Brand } from './models/brand';
import { KitchenCenter } from './models/kitchenCenter';

export type OrderSort = 'asc' | 'desc';

export interface HeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
  hideSortIcon: boolean;
  disablePadding: boolean;
}

export interface KitchenCenterTable {
  logo: string;
  name: string;
  address: string;
  status: string;
}

export interface OrderTable {
  customerName: string;
  customerPhone: string;
  finalTotalPrice: number;
  orderCode: string;
  status: string;
}

export interface BrandTable {
  brandId: number;
  name: string;
  address: string;
  logo: string;
  status: string;
  brandManagerEmail: string;
}
export interface StoreTable {
  name: string;
  status: string;
  logo: string;
  storeManagerEmail: string;
  kitchenCenter: KitchenCenter;
  brand: Brand;
}

export interface CategoryTable {
  imageUrl: string;
  name: string;
  code: string;
  displayOrder: string;
  status: string;
}

export interface ProductTable {
  image: string;
  name: string;
  code: string;
  displayOrder: number;
  sellingPrice: number;
  type: string;
  category: string;
  status: string;
}

export interface CashierTable {
  avatar: string;
  fullName: string;
  email: string;
  gender: string;
  status: string;
  dateOfBirth: string;
}

export interface BankingAccountTable {
  logoUrl: string;
  name: string;
  numberAccount: string;
  status: string;
}

export interface PartnerTable {
  logo: string;
  name: string;
  status: string;
}

export interface MoneyExchangeTable {
  amount: number;
  exchangeType: string;
  sender: string;
  receiver: string;
  status: string;
}

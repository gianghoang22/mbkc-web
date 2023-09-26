export type OrderSort = 'asc' | 'desc';

export interface HeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
  hideSortIcon: boolean;
  disablePadding: boolean;
}

export interface CategoryTable {
  imageUrl: string;
  name: string;
  code: string;
  status: string;
}

export interface ProductTable {
  image: string;
  name: string;
  code: string;
  historicalPrice: number;
  type: string;
  categoryId: string;
  status: string;
}

export interface StoreTable {
  name: string;
  logoUrl: string;
  kitchenCenter?: string;
  brand: string;
  partner: number;
  status: string;
}

export interface KitchenCenterTable {
  imageUrl: string;
  title: string;
  address: string;
  status: string;
}

export interface CashierTable {
  avatar: string;
  fullName: string;
  email: string;
  gender: string;
  status: string;
}

export interface BankingAccountTable {
  logoUrl: string;
  name: string;
  numberAccount: string;
  status: string;
}

export interface BrandTable {
  brandId: number;
  brandImgUrl: string;
  brandName: string;
  address: string;
  brandManager: string;
  brandManagerEmail: string;
  status: string;
}

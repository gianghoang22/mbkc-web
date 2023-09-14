export type OrderSort = 'asc' | 'desc';

export interface StoreHeadCell {
  disablePadding: boolean;
  id: keyof StoreTable;
  label: string;
  numeric: boolean;
}

export interface StoreTable {
  name: string;
  logo: string;
  kitchenCenter: string;
  partner: number;
  status: string;
}

export interface ProductCateHeadCell {
  disablePadding: boolean;
  id: keyof ProductCategoryTable;
  label: string;
  numeric: boolean;
}

export interface ProductCategoryTable {
  imageUrl: string;
  name: string;
  code: string;
  status: string;
}

export interface ProductHeadCell {
  disablePadding: boolean;
  id: keyof ProductTable;
  label: string;
  numeric: boolean;
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

export interface KitchenCenterHeadCell {
  disablePadding: boolean;
  id: keyof KitchenCentersTable;
  label: string;
  numeric: boolean;
}

export interface KitchenCentersTable {
  imageUrl: string;
  title: string;
  address: string;
  numberOfKitchens: number;
  status: string;
}

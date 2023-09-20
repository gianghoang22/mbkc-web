export type OrderSort = 'asc' | 'desc';

// Store
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

// Product categories
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

// Product
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

// Kitchen Centers
export interface KitchenCentersTable {
  imageUrl: string;
  title: string;
  address: string;
  numberOfKitchens: number;
  status: string;
}

export interface KitchenCenterHeadCell {
  disablePadding: boolean;
  id: keyof KitchenCentersTable;
  label: string;
  numeric: boolean;
}

// Kitchen
export interface KitchenTable {
  kitchenId: number;
  kitchenImgUrl: string;
  kitchenName: string;
  brandImgUrl: string;
  brandName: string;
  status: string;
}

export interface KitchenHeadCell {
  disablePadding: boolean;
  id: keyof KitchenTable;
  label: string;
  numeric: boolean;
}

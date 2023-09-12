export type OrderSort = 'asc' | 'desc';

export interface StoreHeadCell {
  disablePadding: boolean;
  id: keyof StoreTable;
  label: string;
  numeric: boolean;
}

export interface StoreTable {
  title: string;
  imageUrl: string;
  kitchenCenter: string;
  startDay: Date;
  endDay: Date;
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
  imageUrl: string;
  name: string;
  code: string;
  price: number;
  category: string;
  status: string;
}

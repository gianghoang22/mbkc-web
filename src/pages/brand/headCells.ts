import { ProductCateHeadCell, ProductHeadCell, StoreHeadCell } from '@types';

export const productHeadCells: ProductHeadCell[] = [
  {
    id: 'image',
    numeric: false,
    disablePadding: true,
    label: 'Image',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Category name',
  },
  {
    id: 'code',
    numeric: false,
    disablePadding: false,
    label: 'Category code',
  },
  {
    id: 'historicalPrice',
    numeric: false,
    disablePadding: false,
    label: 'Historical Price',
  },
  {
    id: 'categoryId',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

export const productCateHeadCells: ProductCateHeadCell[] = [
  {
    id: 'imageUrl',
    numeric: false,
    disablePadding: true,
    label: 'Image',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Category name',
  },
  {
    id: 'code',
    numeric: false,
    disablePadding: false,
    label: 'Category code',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

export const storeHeadCells: StoreHeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'kitchenCenter',
    numeric: false,
    disablePadding: false,
    label: 'Kitchen center',
  },
  {
    id: 'partner',
    numeric: false,
    disablePadding: false,
    label: 'Partner',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

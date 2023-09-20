import { CategoryTable, HeadCell, KitchenCentersTable, ProductTable, StoreTable } from '@types';

export const productHeadCells: HeadCell<ProductTable>[] = [
  {
    id: 'image',
    label: 'Image',
    numeric: false,
    hideSortIcon: true,
    disablePadding: true,
  },
  {
    id: 'name',
    label: 'Category name',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
  },
  {
    id: 'code',
    label: 'Category code',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
  },
  {
    id: 'historicalPrice',
    label: 'Historical Price',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
  },
  {
    id: 'categoryId',
    label: 'Category',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
  },
  {
    id: 'type',
    label: 'Type',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
  },
  {
    id: 'status',
    label: 'Status',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
  },
];

export const categoryHeadCells: HeadCell<CategoryTable>[] = [
  {
    id: 'imageUrl',
    numeric: false,
    hideSortIcon: false,
    disablePadding: true,
    label: 'Image',
  },
  {
    id: 'name',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
    label: 'Category name',
  },
  {
    id: 'code',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
    label: 'Category code',
  },
  {
    id: 'status',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
    label: 'Status',
  },
];

export const storeHeadCells: HeadCell<StoreTable>[] = [
  {
    id: 'name',
    numeric: false,
    hideSortIcon: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'kitchenCenter',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
    label: 'Kitchen center',
  },
  {
    id: 'partner',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
    label: 'Partner',
  },
  {
    id: 'status',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
    label: 'Status',
  },
];

export const kitchenCenterHeadCells: HeadCell<KitchenCentersTable>[] = [
  {
    id: 'title',
    label: 'Kitchen Center',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
  },
  {
    id: 'address',
    label: 'Address',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
  },
  {
    id: 'numberOfKitchens',
    label: 'Number of Kitchen',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
  },
  {
    id: 'status',
    label: 'Status',
    numeric: false,
    hideSortIcon: false,
    disablePadding: false,
  },
];

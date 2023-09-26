import {
  BankingAccountTable,
  BrandTable,
  CashierTable,
  CategoryTable,
  HeadCell,
  KitchenCenterTable,
  ProductTable,
  StoreTable,
} from '@types';

function useConfigHeadTable() {
  const productHeadCells: HeadCell<ProductTable>[] = [
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
      disablePadding: true,
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
      label: 'Historical price',
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

  const categoryHeadCells: HeadCell<CategoryTable>[] = [
    {
      id: 'imageUrl',
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
      id: 'status',
      label: 'Status',
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const storeHeadCells: HeadCell<StoreTable>[] = [
    {
      id: 'logoUrl',
      label: 'Logo',
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'name',
      label: 'Name',
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'kitchenCenter',
      label: 'Kitchen center',
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'brand',
      label: 'Brand',
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'partner',
      label: 'Partner',
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

  const cashierHeadCells: HeadCell<CashierTable>[] = [
    {
      id: 'avatar',
      label: 'Avatar',
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'fullName',
      label: 'Name',
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'email',
      label: 'Email',
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'gender',
      label: 'Gender',
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

  const bankingAccountHeadCells: HeadCell<BankingAccountTable>[] = [
    {
      id: 'logoUrl',
      label: 'Logo',
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'name',
      label: 'Name',
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'numberAccount',
      label: 'Number Account',
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

  const kitchenCenterHeadCells: HeadCell<KitchenCenterTable>[] = [
    {
      id: 'imageUrl',
      label: 'Logo',
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'title',
      label: 'Name',
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
      id: 'status',
      label: 'Status',
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const brandHeadCells: HeadCell<BrandTable>[] = [
    {
      id: 'brandImgUrl',
      label: 'Logo',
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'brandName',
      label: 'Name',
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
      id: 'status',
      label: 'Status',
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  return {
    brandHeadCells,
    kitchenCenterHeadCells,
    storeHeadCells,
    cashierHeadCells,
    bankingAccountHeadCells,
    categoryHeadCells,
    productHeadCells,
  };
}

export default useConfigHeadTable;

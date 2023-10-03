import {
  BankingAccountTable,
  BrandTable,
  CashierTable,
  CategoryTable,
  HeadCell,
  KitchenCenterTable,
  PartnerTable,
  ProductTable,
  StoreTable,
} from '@types';
import useLocales from './useLocales';
import { Language } from 'common/enum';

function useConfigHeadTable() {
  const { translate, currentLang } = useLocales();

  const kitchenCenterHeadCells: HeadCell<KitchenCenterTable>[] = [
    {
      id: 'logo',
      label: translate('table.logo'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'name',
      label: translate('table.name'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'address',
      label: translate('table.address'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const brandHeadCells: HeadCell<BrandTable>[] = [
    {
      id: 'logo',
      label: translate('table.logo'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'name',
      label: translate('table.name'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'address',
      label: translate('table.address'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const storeHeadCells: HeadCell<StoreTable>[] = [
    {
      id: 'logo',
      label: translate('table.logo'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'name',
      label: translate('table.name'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'storeManagerEmail',
      label: translate('table.manageEmail'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'kitchenCenter',
      label: translate('table.kitchenCenter'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'brand',
      label: translate('table.brand'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const categoryHeadCells: HeadCell<CategoryTable>[] = [
    {
      id: 'imageUrl',
      label: translate('table.image'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'name',
      label: translate(
        'page.form.nameExchange',
        currentLang.value === Language.ENGLISH
          ? {
              model: translate('model.capitalizeOne.category'),
              name: translate('page.form.nameLower'),
            }
          : {
              model: translate('page.form.name'),
              name: translate('model.lowercase.category'),
            }
      ),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'code',
      label: translate(
        'page.form.nameExchange',
        currentLang.value === Language.ENGLISH
          ? {
              model: translate('model.capitalizeOne.category'),
              name: translate('page.form.codeLower'),
            }
          : {
              model: translate('page.form.code'),
              name: translate('model.lowercase.category'),
            }
      ),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const productHeadCells: HeadCell<ProductTable>[] = [
    {
      id: 'image',
      label: translate('table.image'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'name',
      label: translate(
        'page.form.nameExchange',
        currentLang.value === Language.ENGLISH
          ? {
              model: translate('model.capitalizeOne.product'),
              name: translate('page.form.codeLower'),
            }
          : {
              model: translate('page.form.code'),
              name: translate('model.lowercase.product'),
            }
      ),
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'code',
      label: translate(
        'page.form.nameExchange',
        currentLang.value === Language.ENGLISH
          ? {
              model: translate('model.capitalizeOne.product'),
              name: translate('page.form.codeLower'),
            }
          : {
              model: translate('page.form.code'),
              name: translate('model.lowercase.product'),
            }
      ),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'historicalPrice',
      label: translate('table.historicalPrice'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'category',
      label: translate('model.capitalizeOne.category'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'type',
      label: translate('table.type'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const cashierHeadCells: HeadCell<CashierTable>[] = [
    {
      id: 'avatar',
      label: translate('table.avatar'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'fullName',
      label: translate('table.fullName'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'email',
      label: translate('table.email'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'gender',
      label: translate('table.gender'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const bankingAccountHeadCells: HeadCell<BankingAccountTable>[] = [
    {
      id: 'logoUrl',
      label: translate('table.logo'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: false,
    },
    {
      id: 'name',
      label: translate('table.name'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
    // {
    //   id: 'numberAccount',
    //   label: translate('table.numberAccount'),
    //   numeric: false,
    //   hideSortIcon: false,
    //   disablePadding: true,
    // },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  const partnerHeadCells: HeadCell<PartnerTable>[] = [
    {
      id: 'logo',
      label: translate('table.logo'),
      numeric: false,
      hideSortIcon: true,
      disablePadding: true,
    },
    {
      id: 'name',
      label: translate('table.name'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: true,
    },
    {
      id: 'status',
      label: translate('table.status'),
      numeric: false,
      hideSortIcon: false,
      disablePadding: false,
    },
  ];

  return {
    kitchenCenterHeadCells,
    brandHeadCells,
    storeHeadCells,
    categoryHeadCells,
    productHeadCells,
    cashierHeadCells,
    bankingAccountHeadCells,
    partnerHeadCells,
  };
}

export default useConfigHeadTable;

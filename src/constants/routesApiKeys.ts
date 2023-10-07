import { OptionParams } from '@types';
import { path, pathRoot } from 'utils';

const ROOTS_AUTH = '/authentications';
const ROOTS_ACCOUNT = '/accounts';
const ROOTS_VERIFY = '/verifications';
const ROOTS_KITCHEN_CENTERS = '/kitchen-centers';
const ROOTS_BRANDS = '/brands';
const ROOTS_STORES = '/stores';
const ROOTS_PARTNERS = '/partners';
const ROOTS_STORE_PARTNERS = '/store-partners';
const ROOTS_CATEGORY = '/categories';
const ROOTS_PRODUCTS = '/products';
const ROOTS_MAPPING_PRODUCTS = '/mapping-products';
const ROOTS_ORDERS = '/orders';
const ROOTS_CASHIERS = '/cashiers';
const ROOTS_BANKING_ACCOUNTS = '/banking-accounts';
const ROOTS_TRANSACTION = '/transactions';

export const ROUTES_API_AUTH = {
  LOGIN: path(ROOTS_AUTH, `/login`),
  REFRESH_TOKEN: path(ROOTS_AUTH, `/regeneration-tokens`),
  RESET_PASSWORD: path(ROOTS_AUTH, `/password-resetation`),
  FORGOT_PASSWORD: path(ROOTS_VERIFY, `/email-verification`),
  VERIFY_OTP: path(ROOTS_VERIFY, `/otp-verification`),
};

export const ROUTES_API_ACCOUNT = {
  ACCOUNT_INFORMATION: (accountId: number) => path(ROOTS_ACCOUNT, `/${accountId}`),
  UPDATE_PASSWORD: (accountId: number) => path(ROOTS_ACCOUNT, `/${accountId}`),
};

export const ROUTES_API_KITCHEN_CENTER = {
  GET_ALL_KITCHEN_CENTER: ({
    itemsPerPage = '',
    currentPage = '',
    keySearchName = '',
    isGetAll = '',
  }: OptionParams) => {
    return path(
      ROOTS_KITCHEN_CENTERS,
      `?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&keySearchName=${keySearchName}&isGetAll=${isGetAll}`
    );
  },
  GET_KITCHEN_CENTER_DETAIL: (kitchenCenterId: number) => path(ROOTS_KITCHEN_CENTERS, `/${kitchenCenterId}`),
  CREATE_KITCHEN_CENTER: pathRoot(ROOTS_KITCHEN_CENTERS),
  UPDATE_KITCHEN_CENTER: (kitchenCenterId: number) => path(ROOTS_KITCHEN_CENTERS, `/${kitchenCenterId}`),
  UPDATE_STATUS_KITCHEN_CENTER: (kitchenCenterId: number) =>
    path(ROOTS_KITCHEN_CENTERS, `/${kitchenCenterId}/updating-status`),
  DELETE_KITCHEN_CENTER: (kitchenCenterId: number) => path(ROOTS_KITCHEN_CENTERS, `/${kitchenCenterId}`),
  GET_PROFILE_KITCHEN_CENTER: path(ROOTS_KITCHEN_CENTERS, `/profile`),
};

export const ROUTES_API_BRANDS = {
  GET_ALL_BRAND: ({
    keySearchName = '',
    keyStatusFilter = '',
    currentPage = '',
    itemsPerPage = '',
    isGetAll = '',
  }: OptionParams) => {
    return path(
      ROOTS_BRANDS,
      `?keySearchName=${keySearchName}&keyStatusFilter=${keyStatusFilter}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&isGetAll=${isGetAll}`
    );
  },
  CREATE_BRAND: pathRoot(ROOTS_BRANDS),
  GET_BRAND_DETAIL: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}`),
  UPDATE_BRAND: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}`),
  UPDATE_STATUS_BRAND: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}/updating-status`),
  DELETE_BRAND: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}`),
  GET_PROFILE_BRAND: path(ROOTS_BRANDS, `/profile`),
  UPDATE_PROFILE_BRAND: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}/profile`),
};

export const ROUTES_API_STORES = {
  CREATE_STORE: pathRoot(ROOTS_STORES),
  GET_ALL_STORE: ({
    itemsPerPage = '',
    currentPage = '',
    searchValue = '',
    idBrand = '',
    idKitchenCenter = '',
  }: OptionParams) => {
    return path(
      ROOTS_STORES,
      `?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&searchValue=${searchValue}&idBrand=${idBrand}&idKitchenCenter=${idKitchenCenter}`
    );
  },
  GET_STORE_DETAIL: (storeId: number) => path(ROOTS_STORES, `/${storeId}`),
  UPDATE_STORE_INFORMATION: (storeId: number) => path(ROOTS_STORES, `/${storeId}`),
  UPDATE_STORE_STATUS: (storeId: number) => path(ROOTS_STORES, `/${storeId}/updating-status`),
  CONFIRM_STORE_REGISTRATION: (storeId: number) => path(ROOTS_STORES, `/${storeId}/confirming-registration`),
  DELETE_STORE: (storeId: number) => path(ROOTS_STORES, `/${storeId}`),
  GET_PROFILE_STORE: path(ROOTS_STORES, `/profile`),
};

export const ROUTES_API_PARTNERS = {
  CREATE_PARTNER: pathRoot(ROOTS_PARTNERS),
  GET_ALL_PARTNER: ({ keySearchName = '', currentPage = '', itemsPerPage = '', isGetAll = '' }: OptionParams) =>
    path(
      ROOTS_PARTNERS,
      `?keySearchName=${keySearchName}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&isGetAll=${isGetAll}`
    ),
  GET_PARTNER_DETAIL: (partnerId: number) => path(ROOTS_PARTNERS, `/${partnerId}`),
  UPDATE_PARTNER: (partnerId: number) => path(ROOTS_PARTNERS, `/${partnerId}`),
  DELETE_PARTNER: (partnerId: number) => path(ROOTS_PARTNERS, `/${partnerId}`),
};

export const ROUTES_API_STORE_PARTNERS = {
  CREATE_STORE_PARTNER: pathRoot(ROOTS_STORE_PARTNERS),
  GET_ALL_STORE_PARTNER: ({ searchName = '', currentPage = '', itemsPerPage = '' }: OptionParams) =>
    path(ROOTS_STORE_PARTNERS, `?searchName=${searchName}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`),
  GET_STORE_PARTNER_DETAIL: (storeId: number, partnerId: number) =>
    path(ROOTS_STORE_PARTNERS, `/${storeId}/${partnerId}`),
  UPDATE_STORE_PARTNER: (storeId: number, partnerId: number) => path(ROOTS_STORE_PARTNERS, `/${storeId}/${partnerId}`),
  UPDATE_STORE_PARTNER_STATUS: (storeId: number, partnerId: number) =>
    path(ROOTS_STORE_PARTNERS, `/${storeId}/${partnerId}/updating-status`),
  DELETE_STORE_PARTNER: (storeId: number, partnerId: number) => path(ROOTS_STORE_PARTNERS, `/${storeId}/${partnerId}`),
};

export const ROUTES_API_CATEGORIES = {
  CREATE_CATEGORY: pathRoot(ROOTS_CATEGORY),
  GET_ALL_CATEGORY: ({ type = '', keySearchName = '', currentPage = '', itemsPerPage = '' }: OptionParams) =>
    path(
      ROOTS_CATEGORY,
      `?type=${type}&keySearchName=${keySearchName}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    ),
  GET_EXTRA_CATEGORY_OF_CATEGORY: ({
    keySearchName = '',
    currentPage = '',
    itemsPerPage = '',
    idCategory = '',
  }: OptionParams) =>
    path(
      ROOTS_CATEGORY,
      `/${idCategory}/extra-categories?keySearchName=${keySearchName}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    ),
  ADD_EXTRA_CATEGORY: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}/extra-categories`),
  GET_CATEGORY_DETAIL: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),
  UPDATE_CATEGORY: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),
  DELETE_CATEGORY: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),
};

export const ROUTES_API_PRODUCTS = {
  CREATE_PRODUCT: pathRoot(ROOTS_PRODUCTS),
  GET_ALL_PRODUCT: ({
    type = '',
    searchName = '',
    currentPage = '',
    itemsPerPage = '',
    isGetAll = '',
    idStore = '',
    idCategory = '',
  }: OptionParams) =>
    path(
      ROOTS_PRODUCTS,
      `?searchName=${searchName}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&productType=${type}&isGetAll=${isGetAll}&idCategory=${idCategory}&idStore=${idStore}`
    ),
  GET_PRODUCT_DETAIL: (productId: number) => path(ROOTS_PRODUCTS, `/${productId}`),
  UPDATE_PRODUCT: (productId: number) => path(ROOTS_PRODUCTS, `/${productId}`),
  UPDATE_PRODUCT_STATUS: (productId: number) => path(ROOTS_PRODUCTS, `/${productId}/updating-status`),
  DELETE_PRODUCT: (productId: number) => path(ROOTS_PRODUCTS, `/${productId}`),
};

export const ROUTES_API_MAPPING_PRODUCTS = {
  CREATE_MAPPING_PRODUCT: pathRoot(ROOTS_MAPPING_PRODUCTS),
  GET_ALL_MAPPING_PRODUCT: ({ searchName = '', currentPage = '', itemsPerPage = '' }: OptionParams) =>
    path(ROOTS_MAPPING_PRODUCTS, `?searchName=${searchName}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`),
  GET_MAPPING_PRODUCT_DETAIL: (productId: number, partnerId: number, storeId: number) =>
    path(ROOTS_MAPPING_PRODUCTS, `/${productId}/${partnerId}/${storeId}`),
  UPDATE_MAPPING_PRODUCT: (productId: number, partnerId: number, storeId: number) =>
    path(ROOTS_MAPPING_PRODUCTS, `/${productId}/${partnerId}/${storeId}`),
};

export const ROUTES_API_CASHIERS = {
  GET_ALL_CASHIERS: ({ searchValue = '', currentPage = '', itemsPerPage = '', sortBy = '' }: OptionParams) => {
    return path(
      ROOTS_CASHIERS,
      `?SearchValue=${searchValue}&ItemsPerPage=${itemsPerPage}&CurrentPage=${currentPage}&SortBy=${sortBy}`
    );
  },
  CREATE_CASHIER: pathRoot(ROOTS_CASHIERS),
  GET_CASHIER_DETAIL: (cashierId: number) => path(ROOTS_CASHIERS, `/${cashierId}`),
  UPDATE_CASHIER: (cashierId: number) => path(ROOTS_CASHIERS, `/${cashierId}`),
  UPDATE_CASHIER_STATUS: (cashierId: number) => path(ROOTS_CASHIERS, `/${cashierId}/updating-status`),
  DELETE_CASHIER: (cashierId: number) => path(ROOTS_CASHIERS, `/${cashierId}`),
};

export const ROUTES_API_BANKING_ACCOUNTS = {
  GET_ALL_BANKING_ACCOUNTS: ({ itemsPerPage = '', currentPage = '', searchValue = '' }: OptionParams) => {
    return path(
      ROOTS_BANKING_ACCOUNTS,
      `?searchValue=${searchValue}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&`
    );
  },
  GET_BANKING_ACCOUNT_DETAIL: (bankingAccountId: number) => path(ROOTS_BANKING_ACCOUNTS, `/${bankingAccountId}`),
  CREATE_BANKING_ACCOUNT: pathRoot(ROOTS_BANKING_ACCOUNTS),
  UPDATE_BANKING_ACCOUNT: (bankingAccountId: number) => path(ROOTS_BANKING_ACCOUNTS, `/${bankingAccountId}`),
  UPDATE_STATUS_BANKING_ACCOUNT: (bankingAccountId: number) =>
    path(ROOTS_BANKING_ACCOUNTS, `/${bankingAccountId}/updating-status`),
  DELETE_BANKING_ACCOUNT: (bankingAccountId: number) => path(ROOTS_BANKING_ACCOUNTS, `/${bankingAccountId}`),
};

export const ROUTES_API_ORDERS = {
  GET_ALL_ORDERS: pathRoot(ROOTS_PRODUCTS),
  GET_ORDER_DETAIL: (orderId: number) => path(ROOTS_ORDERS, `/${orderId}`),
};

export const ROUTES_API_TRANSACTIONS = {
  CREATE_TRANSACTION: pathRoot(ROOTS_TRANSACTION),
  GET_ALL_TRANSACTION: pathRoot(ROOTS_TRANSACTION),
  GET_TRANSACTION_DETAIL: (transactionId: number) => path(ROOTS_TRANSACTION, `/${transactionId}`),
  UPDATE_TRANSACTION: (transactionId: number) => path(ROOTS_TRANSACTION, `/${transactionId}`),
  DELETE_TRANSACTION: (transactionId: number) => path(ROOTS_TRANSACTION, `/${transactionId}`),
};

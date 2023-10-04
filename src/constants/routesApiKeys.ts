import { OptionParams } from '@types';
import { path, pathRoot } from 'utils';

const ROOTS_AUTH = '/authentications';
const ROOTS_VERIFY = '/verifications';
const ROOTS_KITCHEN_CENTERS = '/kitchen-centers';
const ROOTS_BRANDS = '/brands';
const ROOTS_STORES = '/stores';
const ROOTS_CATEGORY = '/categories';
const ROOTS_PRODUCT = '/products';
const ROOTS_ORDERS = '/orders';
const ROOTS_CASHIER = '/cashiers';
const ROOTS_PARTNER = '/partners';
const ROOTS_BANKING_ACCOUNTS = '/banking-accounts';
const ROOTS_TRANSACTION = '/transactions';

export const ROUTES_API_AUTH = {
  LOGIN: path(ROOTS_AUTH, `/login`),
  REFRESH_TOKEN: path(ROOTS_AUTH, `/regeneration-tokens`),
  RESET_PASSWORD: path(ROOTS_AUTH, `/password-resetation`),
  FORGOT_PASSWORD: path(ROOTS_VERIFY, `/email-verification`),
  VERIFY_OTP: path(ROOTS_VERIFY, `/otp-verification`),
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
};

export const ROUTES_API_CATEGORIES = {
  CREATE_CATEGORY: pathRoot(ROOTS_CATEGORY),
  GET_ALL_CATEGORY: ({ type = '', keySearchName = '', currentPage = '', itemsPerPage = '' }: OptionParams) =>
    path(
      ROOTS_CATEGORY,
      `?type=${type}&keySearchName=${keySearchName}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    ),
  GET_EXTRA_CATEGORY_OF_CATEGORY: ({
    categoryId,
    keySearchName = '',
    currentPage = '',
    itemsPerPage = '',
    idCategory = '',
  }: any) =>
    path(
      ROOTS_CATEGORY,
      `/${idCategory}/extra-categories?keySearchName=${keySearchName}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    ),
  ADD_EXTRA_CATEGORY: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}/extra-categories`),
  GET_CATEGORY_DETAIL: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),
  UPDATE_CATEGORY: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),
  DELETE_CATEGORY: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),
};

export const RoutesApiKeys = {
  // kitchen center
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

  // category
  CREATE_BRAND: pathRoot(ROOTS_BRANDS),
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

  GET_BRAND_DETAIL: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}`),
  UPDATE_BRAND: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}`),
  UPDATE_STATUS_BRAND: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}/updating-status`),
  DELETE_BRAND: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}`),

  // product
  CREATE_PRODUCT: pathRoot(ROOTS_PRODUCT),
  GET_ALL_PRODUCT: pathRoot(ROOTS_PRODUCT),
  GET_PRODUCT_DETAIL: (productId: number) => path(ROOTS_PRODUCT, `/${productId}`),
  UPDATE_PRODUCT: (productId: number) => path(ROOTS_PRODUCT, `/${productId}`),
  DELETE_PRODUCT: (productId: number) => path(ROOTS_PRODUCT, `/${productId}`),

  // order
  GET_ALL_ORDERS: pathRoot(ROOTS_PRODUCT),
  GET_ORDER_DETAIL: (orderId: number) => path(ROOTS_ORDERS, `/${orderId}`),

  // cashier
  CREATE_CASHIER: pathRoot(ROOTS_CASHIER),
  GET_ALL_CASHIER: pathRoot(ROOTS_CASHIER),
  GET_CASHIER_DETAIL: (cashierId: number) => path(ROOTS_CASHIER, `/${cashierId}`),
  UPDATE_CASHIER: (cashierId: number) => path(ROOTS_CASHIER, `/${cashierId}`),
  DELETE_CASHIER: (cashierId: number) => path(ROOTS_CASHIER, `/${cashierId}`),

  // banking account
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

  // partner
  CREATE_PARTNER: pathRoot(ROOTS_PARTNER),
  GET_ALL_PARTNER: pathRoot(ROOTS_PARTNER),
  GET_PARTNER_DETAIL: (partnerId: number) => path(ROOTS_PARTNER, `/${partnerId}`),
  UPDATE_PARTNER: (partnerId: number) => path(ROOTS_PARTNER, `/${partnerId}`),
  DELETE_PARTNER: (partnerId: number) => path(ROOTS_PARTNER, `/${partnerId}`),

  // transaction
  CREATE_TRANSACTION: pathRoot(ROOTS_TRANSACTION),
  GET_ALL_TRANSACTION: pathRoot(ROOTS_TRANSACTION),
  GET_TRANSACTION_DETAIL: (transactionId: number) => path(ROOTS_TRANSACTION, `/${transactionId}`),
  UPDATE_TRANSACTION: (transactionId: number) => path(ROOTS_TRANSACTION, `/${transactionId}`),
  DELETE_TRANSACTION: (transactionId: number) => path(ROOTS_TRANSACTION, `/${transactionId}`),
};

import { OptionParams } from '@types';
import { path, pathRoot } from 'utils';

const ROOTS_AUTH = '/authentications';
const ROOTS_VERIFY = '/verifications';
const ROOTS_KITCHEN_CENTERS = '/kitchen-centers';
const ROOTS_KITCHEN_CENTER = '/kitchen-center';
const ROOTS_BRANDS = '/brands';
const ROOTS_BRAND = '/brand';
const ROOTS_STORE = '/stores';
const ROOTS_CATEGORY = '/categories';
const ROOTS_PRODUCT = '/products';
const ROOTS_CASHIER = '/cashiers';
const ROOTS_PARTNER = '/partners';
const ROOTS_BANKING_ACCOUNT = '/bankingAccounts';
const ROOTS_TRANSACTION = '/transactions';

export const ROUTES_API_AUTH = {
  LOGIN: path(ROOTS_AUTH, `/login`),
  REFRESH_TOKEN: path(ROOTS_AUTH, `/regeneration-tokens`),
  RESET_PASSWORD: path(ROOTS_AUTH, `/password-resetation`),
  FORGOT_PASSWORD: path(ROOTS_VERIFY, `/email-verification`),
  VERIFY_OTP: path(ROOTS_VERIFY, `/otp-verification`),
};

export const RoutesApiKeys = {
  // auth
  LOGIN: path(ROOTS_AUTH, `/login`),
  REFRESH_TOKEN: path(ROOTS_AUTH, `/regeneration-tokens`),
  RESET_PASSWORD: path(ROOTS_AUTH, `/password-resetation`),

  FORGOT_PASSWORD: path(ROOTS_VERIFY, `/email-verification`),
  VERIFY_OTP: path(ROOTS_VERIFY, `/otp-verification`),

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
  DELETE_BRAND: (brandId: number) => path(ROOTS_BRANDS, `/${brandId}`),

  // store
  CREATE_STORE: pathRoot(ROOTS_STORE),
  GET_ALL_STORE: ({ itemsPerPage = '', currentPage = '', searchValue = '' }: OptionParams) => {
    return path(ROOTS_STORE, `?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&searchValue=${searchValue}`);
  },
  GET_STORE_OF_KITCHEN_CENTER: (kitchenCenterId: number) => path(ROOTS_KITCHEN_CENTER, `/${kitchenCenterId}/stores`),
  GET_STORE_OF_BRAND: (brandId: number) => path(ROOTS_BRAND, `/${brandId}/stores`),
  GET_STORE_DETAIL: (storeId: number) => path(ROOTS_STORE, `/${storeId}`),
  UPDATE_STORE: (brandId: number, storeId: number) => path(ROOTS_BRAND, `/${brandId}/stores/${storeId}`),
  DELETE_STORE: (brandId: number, storeId: number) => path(ROOTS_BRAND, `/${brandId}/stores/${storeId}`),

  // category
  CREATE_CATEGORY: pathRoot(ROOTS_CATEGORY),
  GET_ALL_CATEGORY: ({ type = '', keySearchName = '', pageNumber = '', pageSize = '' }: OptionParams) =>
    path(ROOTS_CATEGORY, `?type=${type}&keySearchName=${keySearchName}&pageNumber=${pageNumber}&pageSize=${pageSize}`),
  GET_EXTRA_CATEGORY_OF_CATEGORY: ({ categoryId, keySearchName = '', pageNumber = '', pageSize = '' }: any) =>
    path(
      ROOTS_CATEGORY,
      `/${categoryId}/extra-categories?keySearchName=${keySearchName}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    ),
  ADD_EXTRA_CATEGORY: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}/add-extra-category`),
  GET_CATEGORY_DETAIL: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),
  UPDATE_CATEGORY: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),
  DELETE_CATEGORY: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),

  // product
  CREATE_PRODUCT: pathRoot(ROOTS_PRODUCT),
  GET_ALL_PRODUCT: pathRoot(ROOTS_PRODUCT),
  GET_PRODUCT_DETAIL: (productId: number) => path(ROOTS_PRODUCT, `/${productId}`),
  UPDATE_PRODUCT: (productId: number) => path(ROOTS_PRODUCT, `/${productId}`),
  DELETE_PRODUCT: (productId: number) => path(ROOTS_PRODUCT, `/${productId}`),

  // cashier
  CREATE_CASHIER: pathRoot(ROOTS_CASHIER),
  GET_ALL_CASHIER: pathRoot(ROOTS_CASHIER),
  GET_CASHIER_DETAIL: (cashierId: number) => path(ROOTS_CASHIER, `/${cashierId}`),
  UPDATE_CASHIER: (cashierId: number) => path(ROOTS_CASHIER, `/${cashierId}`),
  DELETE_CASHIER: (cashierId: number) => path(ROOTS_CASHIER, `/${cashierId}`),

  // partner
  CREATE_PARTNER: pathRoot(ROOTS_PARTNER),
  GET_ALL_PARTNER: pathRoot(ROOTS_PARTNER),
  GET_PARTNER_DETAIL: (partnerId: number) => path(ROOTS_PARTNER, `/${partnerId}`),
  UPDATE_PARTNER: (partnerId: number) => path(ROOTS_PARTNER, `/${partnerId}`),
  DELETE_PARTNER: (partnerId: number) => path(ROOTS_PARTNER, `/${partnerId}`),

  // banking account
  CREATE_BANKING_ACCOUNT: pathRoot(ROOTS_BANKING_ACCOUNT),
  GET_ALL_BANKING_ACCOUNT: pathRoot(ROOTS_BANKING_ACCOUNT),
  GET_BANKING_ACCOUNT_DETAIL: (bankingAccountId: number) => path(ROOTS_BANKING_ACCOUNT, `/${bankingAccountId}`),
  UPDATE_BANKING_ACCOUNT: (bankingAccountId: number) => path(ROOTS_BANKING_ACCOUNT, `/${bankingAccountId}`),
  DELETE_BANKING_ACCOUNT: (bankingAccountId: number) => path(ROOTS_BANKING_ACCOUNT, `/${bankingAccountId}`),

  // transaction
  CREATE_TRANSACTION: pathRoot(ROOTS_TRANSACTION),
  GET_ALL_TRANSACTION: pathRoot(ROOTS_TRANSACTION),
  GET_TRANSACTION_DETAIL: (transactionId: number) => path(ROOTS_TRANSACTION, `/${transactionId}`),
  UPDATE_TRANSACTION: (transactionId: number) => path(ROOTS_TRANSACTION, `/${transactionId}`),
  DELETE_TRANSACTION: (transactionId: number) => path(ROOTS_TRANSACTION, `/${transactionId}`),
};

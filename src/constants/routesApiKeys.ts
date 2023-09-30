import { OptionParams } from '@types';
import { path, pathRoot } from 'utils';

const ROOTS_KITCHEN_CENTER = '/kitchencenters';
const ROOTS_BRAND = '/brands';
const ROOTS_STORE = '/stores';
const ROOTS_CATEGORY = '/categories';
const ROOTS_PRODUCT = '/products';
const ROOTS_CASHIER = '/cashiers';
const ROOTS_PARTNER = '/partners';
const ROOTS_BANKING_ACCOUNT = '/bankingAccounts';
const ROOTS_TRANSACTION = '/transactions';

export const RoutesApiKeys = {
  // auth
  LOGIN: '/authentications/login',
  RESET_PASSWORD: '/authentications/reset-password',
  FORGOT_PASSWORD: '/verifications/email-verification',
  VERIFY_OTP: '/verifications/otp-verification',

  // category
  CREATE_BRAND: pathRoot(ROOTS_BRAND),
  GET_ALL_BRAND: ({
    keySearchName = '',
    keyStatusFilter = '',
    currentPage = '',
    itemsPerPage = '',
    isGetAll = '',
  }: OptionParams) => {
    return path(
      ROOTS_BRAND,
      `?keySearchName=${keySearchName}&keyStatusFilter=${keyStatusFilter}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&isGetAll=${isGetAll}`
    );
  },

  GET_BRAND_DETAIL: (brandId: number) => path(ROOTS_BRAND, `/${brandId}`),
  UPDATE_BRAND: (brandId: number) => path(ROOTS_BRAND, `/${brandId}`),
  DELETE_BRAND: (brandId: number) => path(ROOTS_BRAND, `/${brandId}`),

  // category
  CREATE_CATEGORY: pathRoot(ROOTS_CATEGORY),
  GET_ALL_CATEGORY: pathRoot(ROOTS_CATEGORY),
  GET_CATEGORY_DETAIL: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),
  UPDATE_CATEGORY: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),
  DELETE_CATEGORY: (categoryId: number) => path(ROOTS_CATEGORY, `/${categoryId}`),

  // product
  CREATE_PRODUCT: pathRoot(ROOTS_PRODUCT),
  GET_ALL_PRODUCT: pathRoot(ROOTS_PRODUCT),
  GET_PRODUCT_DETAIL: (productId: number) => path(ROOTS_PRODUCT, `/${productId}`),
  UPDATE_PRODUCT: (productId: number) => path(ROOTS_PRODUCT, `/${productId}`),
  DELETE_PRODUCT: (productId: number) => path(ROOTS_PRODUCT, `/${productId}`),

  // kitchen center
  GET_ALL_KITCHEN_CENTER: ({
    itemsPerPage = '',
    currentPage = '',
    keySearchName = '',
    isGetAll = '',
  }: OptionParams) => {
    return path(
      ROOTS_KITCHEN_CENTER,
      `?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&keySearchName=${keySearchName}&isGetAll=${isGetAll}`
    );
  },

  // store
  CREATE_STORE: pathRoot(ROOTS_STORE),
  GET_ALL_STORE: pathRoot(ROOTS_STORE),
  GET_ALL_STORE_PARAMS: ({ itemsPerPage = '', currentPage = '', searchValue = '' }: OptionParams) => {
    return path(ROOTS_STORE, `?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&searchValue=${searchValue}`);
  },
  GET_STORE_DETAIL: (storeId: number) => path(ROOTS_STORE, `/${storeId}`),
  UPDATE_STORE: (storeId: number) => path(ROOTS_STORE, `/${storeId}`),
  DELETE_STORE: (storeId: number) => path(ROOTS_STORE, `/${storeId}`),

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

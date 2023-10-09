import { path } from 'utils';

const ROOTS_ERROR = '/error';
const ROOTS_AUTH = '/auth';
const ROOTS_BRAND_DASHBOARD = '/brand';
const ROOTS_KITCHEN_CENTER_DASHBOARD = '/kitchen-center';
const ROOTS_CASHIER_DASHBOARD = '/cashier';
export const ROOTS_ADMIN_DASHBOARD = '/mbkc-admin';

export const PATH_ERROR = {
  noPermission: path(ROOTS_ERROR, '/403'),
  notFound: path(ROOTS_ERROR, '/404'),
  serverError: path(ROOTS_ERROR, '/500'),
};

export const PATH_AUTH = {
  login: path(ROOTS_AUTH, '/login'),
  forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
  verificationOTP: path(ROOTS_AUTH, '/verification-otp'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_ADMIN_APP = {
  root: path(ROOTS_ADMIN_DASHBOARD, '/dashboard'),

  kitchenCenter: {
    root: path(ROOTS_ADMIN_DASHBOARD, '/kitchen-center'),
    list: path(ROOTS_ADMIN_DASHBOARD, '/kitchen-center/list'),
    detailById: path(ROOTS_ADMIN_DASHBOARD, '/kitchen-center/detail/:id'),
    editById: path(ROOTS_ADMIN_DASHBOARD, '/kitchen-center/update/:id'),
    newKitchenCenter: path(ROOTS_ADMIN_DASHBOARD, '/kitchen-center/create-new'),
  },
  brand: {
    root: path(ROOTS_ADMIN_DASHBOARD, '/brand'),
    list: path(ROOTS_ADMIN_DASHBOARD, '/brand/list'),
    detailById: path(ROOTS_ADMIN_DASHBOARD, '/brand/detail/:id'),
    editById: path(ROOTS_ADMIN_DASHBOARD, '/brand/update/:id'),
    newBrand: path(ROOTS_ADMIN_DASHBOARD, '/brand/create-new'),
  },
  partner: {
    root: path(ROOTS_ADMIN_DASHBOARD, '/partner'),
    list: path(ROOTS_ADMIN_DASHBOARD, '/partner/list'),
    detailById: path(ROOTS_ADMIN_DASHBOARD, '/partner/detail/:id'),
    editById: path(ROOTS_ADMIN_DASHBOARD, '/partner/update/:id'),
    newPartner: path(ROOTS_ADMIN_DASHBOARD, '/partner/create-new'),
  },
  store: {
    root: path(ROOTS_ADMIN_DASHBOARD, '/store'),
    list: path(ROOTS_ADMIN_DASHBOARD, '/store/list'),
    detailById: path(ROOTS_ADMIN_DASHBOARD, '/store/detail/:id'),
  },
};

export const PATH_BRAND_APP = {
  root: path(ROOTS_BRAND_DASHBOARD, '/dashboard'),
  profile: path(ROOTS_BRAND_DASHBOARD, '/profile'),
  information: path(ROOTS_BRAND_DASHBOARD, '/information'),
  store: {
    root: path(ROOTS_BRAND_DASHBOARD, '/store'),
    list: path(ROOTS_BRAND_DASHBOARD, '/store/list'),
    detailById: path(ROOTS_BRAND_DASHBOARD, '/store/detail/:id'),
    editById: path(ROOTS_ADMIN_DASHBOARD, '/store/update/:id'),
    newStore: path(ROOTS_ADMIN_DASHBOARD, '/store/create-new'),
  },
  storePartner: {
    root: path(ROOTS_BRAND_DASHBOARD, '/store-partner'),
    list: path(ROOTS_BRAND_DASHBOARD, '/store-partner/list'),
  },
  product: {
    root: path(ROOTS_BRAND_DASHBOARD, '/product'),
    list: path(ROOTS_BRAND_DASHBOARD, '/product/list'),
    detailById: path(ROOTS_BRAND_DASHBOARD, '/product/detail/:id'),
    editById: path(ROOTS_BRAND_DASHBOARD, '/product/update/:id'),
    newProduct: path(ROOTS_BRAND_DASHBOARD, '/product/create-new'),
  },
  category: {
    root: path(ROOTS_BRAND_DASHBOARD, '/category'),
    rootExtra: path(ROOTS_BRAND_DASHBOARD, '/extra-category'),
    list: path(ROOTS_BRAND_DASHBOARD, '/category/list'),
    extraList: path(ROOTS_BRAND_DASHBOARD, '/extra-category/list'),
    detailById: path(ROOTS_BRAND_DASHBOARD, '/category/detail/:id'),
    editById: path(ROOTS_BRAND_DASHBOARD, '/category/update/:id'),
    newCategory: path(ROOTS_BRAND_DASHBOARD, '/category/create-new'),
  },
  mappingProduct: {
    root: path(ROOTS_BRAND_DASHBOARD, '/mapping-product'),
    list: path(ROOTS_BRAND_DASHBOARD, '/mapping-product/list'),
  },
};

export const PATH_KITCHEN_CENTER_APP = {
  root: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/dashboard'),
  profile: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/profile'),
  information: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/information'),
  store: {
    root: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/store'),
    list: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/store/list'),
    detailById: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/store/detail/:id'),
  },
  cashier: {
    root: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/cashier'),
    list: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/cashier/list'),
    editById: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/cashier/update/:id'),
    newCashier: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/cashier/create-new'),
  },
  order: {
    root: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/order'),
    list: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/order/list'),
    detailById: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/order/detail/:id'),
  },
  bankingAccount: {
    root: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/banking-account'),
    list: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/banking-account/list'),
    detailById: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/banking-account/detail/:id'),
    editById: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/banking-account/update/:id'),
    newBankingAccount: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/banking-account/create-new'),
  },
  wallet: {
    root: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/wallet'),
    shipperPayments: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/wallet/list-shipper-payment'),
    moneyExchanges: path(ROOTS_KITCHEN_CENTER_DASHBOARD, '/wallet/list-money-exchange'),
  },
};

export const PATH_CASHIER_APP = {
  root: path(ROOTS_CASHIER_DASHBOARD, '/dashboard'),
  profile: path(ROOTS_CASHIER_DASHBOARD, '/profile'),
  information: path(ROOTS_CASHIER_DASHBOARD, '/information'),
  order: {
    root: path(ROOTS_CASHIER_DASHBOARD, '/order'),
    list: path(ROOTS_CASHIER_DASHBOARD, '/order/list'),
    detailById: path(ROOTS_CASHIER_DASHBOARD, '/order/detail/:id'),
  },
  transaction: {
    root: path(ROOTS_CASHIER_DASHBOARD, '/transaction'),
    list: path(ROOTS_CASHIER_DASHBOARD, '/transaction/list'),
  },
};

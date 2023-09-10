export enum RoutesPageKey {
  //auth
  LOGIN = '/login',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',

  //brand
  BRAND_DASHBOARD = '/brand/dashboard',

  LIST_KITCHENS = '/brand/list-kitchen',
  KITCHEN_DETAIL = '/brand/kitchen-detail/:id',
  UPDATE_KITCHEN = '/brand/update-kitchen/:id',

  LIST_PRODUCT_CATEGORIES = '/brand/list-product-categories',

  LIST_PRODUCTS = '/brand/list-product',
  CREATE_NEW_PRODUCT = '/brand/create-product',
  UPDATE_PRODUCT = '/brand/update-product/:id',

  //kitchen center
  KITCHEN_CENTER_DASHBOARD = '/kitchen-center/dashboard',

  LIST_STORES_OF_CENTER = '/kitchen-center/list-stores',
  STORE_OF_CENTER_DETAIL = '/kitchen-center/stores-detail/:id',

  LIST_CASHIERS = '/kitchen-center/list-cashiers',
  CREATE_NEW_CASHIER = '/kitchen-center/create-cashier',
  UPDATE_CASHIER = '/kitchen-center/update-cashier/:id',

  LIST_ORDERS = '/kitchen-center/list-orders',
  ORDER_DETAIL = '/kitchen-center/order-detail/:id',

  WALLET = '/kitchen-center/wallet',
  LIST_WALLET_TRANSACTIONS = '/kitchen-center/list-wallet-transactions',
  LIST_TRANSFER_TRANSACTIONS = '/kitchen-center/list-transfer-transactions',

  //kitchen cashier
  KITCHEN_CASHIER_DASHBOARD = '/kitchen-cashier/dashboard',

  LIST_ORDERS_OF_CASHIER = '/kitchen-cashier/list-orders',
  ORDER_DETAIL_OF_CASHIER = '/kitchen-cashier/order-detail/:id',

  LIST_TRANSACTIONS = '/kitchen-cashier/list-transactions',
}

export enum RoutesPageKey {
  //auth
  LOGIN = '/login',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',

  //brand
  BRAND_DASHBOARD = '/brand/dashboard',

  LIST_KITCHEN_STAFFS = '/brand/list-kitchen-staff',
  CREATE_NEW_KITCHEN_STAFF = '/brand/create-new-kitchen-staff',
  UPDATE_KITCHEN_STAFF = '/brand/update-kitchen-staff/:id',

  LIST_KITCHENS = '/brand/list-kitchen',
  KITCHEN_DETAIL = '/brand/kitchen-detail/:id',
  UPDATE_KITCHEN = '/brand/update-kitchen/:id',

  LIST_PRODUCTS = '/brand/list-product',
  CREATE_NEW_PRODUCT = '/brand/create-new-product',
  UPDATE_PRODUCT = '/brand/update-product/:id',

  LIST_MENUS = '/brand/list-menu',
  MENU_DETAIL = '/brand/menu-detail/:id',
  CREATE_NEW_MENU = '/brand/create-new-menu',
  UPDATE_MENU = '/brand/update-menu/:id',

  LIST_VOUCHERS = '/brand/list-voucher',
  CREATE_NEW_VOUCHER = '/brand/create-new-voucher',
  UPDATE_VOUCHER = '/brand/update-voucher/:id',

  //kitchen center
  KITCHEN_CENTER_DASHBOARD = '/kitchen-center/dashboard',

  LIST_KITCHENS_OF_CENTER = '/kitchen-center/list-kitchens',
  KITCHENS_OF_CENTER_DETAIL = '/kitchen-center/kitchen-detail/:id',

  LIST_CASHIERS = '/kitchen-center/list-cashiers',
  CREATE_NEW_CASHIER = '/kitchen-center/create-new-cashier',
  UPDATE_CASHIER = '/kitchen-center/update-cashier/:id',

  LIST_MENUS_OF_CENTER = '/kitchen-center/list-menus',
  LIST_PRODUCTS_OF_MENU = '/kitchen-center/list-products-of-menu',

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

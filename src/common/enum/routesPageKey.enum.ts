export enum RoutesPageKey {
  //auth
  LOGIN = 'login',
  FORGOT_PASSWORD = 'forgot-password',
  RESET_PASSWORD = 'reset-password',
  // dashboard
  DASHBOARD = 'dashboard',
  //brand
  LIST_KITCHEN_STAFFS = 'bm-list-kitchen-staffs',
  CREATE_NEW_KITCHEN_STAFF = 'bm-create-new-kitchen-staff',
  UPDATE_KITCHEN_STAFF = 'bm-update-kitchen-staff/:id',

  LIST_KITCHENS = 'bm-list-kitchens',
  KITCHEN_DETAIL = 'bm-kitchen-detail',
  UPDATE_KITCHEN = 'bm-update-kitchen/:id',

  LIST_PRODUCTS = 'bm-list-products',
  CREATE_NEW_PRODUCT = 'bm-create-new-product',
  UPDATE_PRODUCT = 'bm-update-product/:id',

  LIST_MENUS = 'bm-list-menus',
  MENU_DETAIL = 'bm-menu-detail',
  CREATE_NEW_MENU = 'bm-create-new-menu',
  UPDATE_MENU = 'bm-update-menu/:id',

  LIST_VOUCHERS = 'bm-list-voucher',
  CREATE_NEW_VOUCHER = 'bm-create-new-voucher',
  UPDATE_VOUCHER = 'bm-update-voucher/:id',
}

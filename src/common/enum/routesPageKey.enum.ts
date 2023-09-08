export enum RoutesPageKey {
  //auth
  LOGIN = 'login',
  FORGOT_PASSWORD = 'forgot-password',
  RESET_PASSWORD = 'reset-password',
  // dashboard
  DASHBOARD = '/brand/dashboard',
  //brand
  LIST_KITCHEN_STAFFS = '/brand/list-kitchen-staffs',
  CREATE_NEW_KITCHEN_STAFF = '/brand/create-new-kitchen-staff',
  UPDATE_KITCHEN_STAFF = '/brand/update-kitchen-staff/:id',

  LIST_KITCHENS = '/brand/list-kitchens',
  KITCHEN_DETAIL = '/brand/kitchen-detail',
  UPDATE_KITCHEN = '/brand/update-kitchen/:id',

  LIST_PRODUCTS = '/brand/list-products',
  CREATE_NEW_PRODUCT = '/brand/create-new-product',
  UPDATE_PRODUCT = '/brand/update-product/:id',

  LIST_MENUS = '/brand/list-menus',
  MENU_DETAIL = '/brand/menu-detail',
  CREATE_NEW_MENU = '/brand/create-new-menu',
  UPDATE_MENU = '/brand/update-menu/:id',

  LIST_VOUCHERS = '/brand/list-voucher',
  CREATE_NEW_VOUCHER = '/brand/create-new-voucher',
  UPDATE_VOUCHER = '/brand/update-voucher/:id',
}

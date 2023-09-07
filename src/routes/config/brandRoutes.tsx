import { RoutesPageKey } from 'common/enum';
import {
  BrandDashboard,
  CreateNewMenuPage,
  CreateNewProductPage,
  CreateNewStaffPage,
  CreateNewVoucherPage,
  EditKitchenPage,
  KitchenDetailPage,
  ListKitchenPage,
  ListKitchenStaffPage,
  ListMenuPage,
  ListProductPage,
  ListVoucherPage,
  MenuDetailPage,
} from 'pages/brandManager';

export const brandRoutes = [
  {
    key: RoutesPageKey.DASHBOARD,
    path: RoutesPageKey.DASHBOARD,
    component: <BrandDashboard />,
    index: true,
  },
  {
    key: RoutesPageKey.LIST_KITCHEN_STAFFS,
    path: RoutesPageKey.LIST_KITCHEN_STAFFS,
    component: <ListKitchenStaffPage />,
    index: false,
  },
  {
    key: RoutesPageKey.CREATE_NEW_KITCHEN_STAFF,
    path: RoutesPageKey.CREATE_NEW_KITCHEN_STAFF,
    component: <CreateNewStaffPage />,
    index: false,
  },
  {
    key: RoutesPageKey.LIST_KITCHENS,
    path: RoutesPageKey.LIST_KITCHENS,
    component: <ListKitchenPage />,
    index: false,
  },
  {
    key: RoutesPageKey.KITCHEN_DETAIL,
    path: RoutesPageKey.KITCHEN_DETAIL,
    component: <KitchenDetailPage />,
    index: false,
  },
  {
    key: RoutesPageKey.UPDATE_KITCHEN,
    path: RoutesPageKey.UPDATE_KITCHEN,
    component: <EditKitchenPage />,
    index: false,
  },
  {
    key: RoutesPageKey.LIST_PRODUCTS,
    path: RoutesPageKey.LIST_PRODUCTS,
    component: <ListProductPage />,
    index: false,
  },
  {
    key: RoutesPageKey.CREATE_NEW_PRODUCT,
    path: RoutesPageKey.CREATE_NEW_PRODUCT,
    component: <CreateNewProductPage />,
    index: false,
  },
  {
    key: RoutesPageKey.LIST_MENUS,
    path: RoutesPageKey.LIST_MENUS,
    component: <ListMenuPage />,
    index: false,
  },
  {
    key: RoutesPageKey.MENU_DETAIL,
    path: RoutesPageKey.MENU_DETAIL,
    component: <MenuDetailPage />,
    index: false,
  },
  {
    key: RoutesPageKey.CREATE_NEW_MENU,
    path: RoutesPageKey.RESET_PASSWORD,
    component: <CreateNewMenuPage />,
    index: false,
  },
  {
    key: RoutesPageKey.LIST_VOUCHERS,
    path: RoutesPageKey.LIST_VOUCHERS,
    component: <ListVoucherPage />,
    index: false,
  },
  {
    key: RoutesPageKey.CREATE_NEW_VOUCHER,
    path: RoutesPageKey.CREATE_NEW_VOUCHER,
    component: <CreateNewVoucherPage />,
    index: false,
  },
];

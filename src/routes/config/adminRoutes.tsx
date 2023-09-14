import { RoutesPageKey } from 'common/enum';
import CreateBrandPage from 'pages/MBKCAdmin/brand/CreateBrandPage';
import ListBrandPage from 'pages/MBKCAdmin/brand/ListBrandPage';
import MBKCAdminDashboardPage from 'pages/MBKCAdmin/dashboard/MBKCAdminDashboardPage';
import CreateKitchenCenterPage from 'pages/MBKCAdmin/kitchenCenter/CreateKitchenCenterPage';
import KitchenCenterDetailPage from 'pages/MBKCAdmin/kitchenCenter/KitchenCenterDetailPage';
import ListKitchenCenterPage from 'pages/MBKCAdmin/kitchenCenter/ListKitchenCenterPage';

export const adminRoutes = [
  {
    key: RoutesPageKey.ADMIN_DASHBOARD,
    path: RoutesPageKey.ADMIN_DASHBOARD,
    component: <MBKCAdminDashboardPage />,
    index: true,
  },
  {
    key: RoutesPageKey.LIST_KITCHEN_CENTERS,
    path: RoutesPageKey.LIST_KITCHEN_CENTERS,
    component: <ListKitchenCenterPage />,
    index: true,
  },
  {
    key: RoutesPageKey.KITCHEN_CENTER_DETAIL,
    path: RoutesPageKey.KITCHEN_CENTER_DETAIL,
    component: <KitchenCenterDetailPage />,
    index: true,
  },
  {
    key: RoutesPageKey.CREATE_KITCHEN_CENTERS,
    path: RoutesPageKey.CREATE_KITCHEN_CENTERS,
    component: <CreateKitchenCenterPage />,
    index: true,
  },
  {
    key: RoutesPageKey.LIST_BRAND,
    path: RoutesPageKey.LIST_BRAND,
    component: <ListBrandPage />,
    index: true,
  },
  {
    key: RoutesPageKey.CREATE_BRAND,
    path: RoutesPageKey.CREATE_BRAND,
    component: <CreateBrandPage />,
    index: true,
  },
  {
    key: RoutesPageKey.CREATE_BRAND,
    path: RoutesPageKey.CREATE_BRAND,
    component: <CreateBrandPage />,
    index: true,
  },
];

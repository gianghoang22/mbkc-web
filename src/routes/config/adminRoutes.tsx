import { RoutesPageKey } from 'common/enum';
import ListBrandPage from 'pages/MBKCAdmin/brand/ListBrandPage';
import MBKCAdminDashboardPage from 'pages/MBKCAdmin/dashboard/MBKCAdminDashboardPage';
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
    key: RoutesPageKey.LIST_BRAND,
    path: RoutesPageKey.LIST_BRAND,
    component: <ListBrandPage />,
    index: true,
  },
];

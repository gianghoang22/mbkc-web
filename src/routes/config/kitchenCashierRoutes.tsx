import { RoutesPageKey } from 'common/enum';
import {
  KitchenCashierDashboard,
  ListOrdersPage,
  ListTransactionPage,
  OrderDetailPage,
} from 'pages/kitchenCenterCashier';

export const kitchenCashierRoutes = [
  {
    key: RoutesPageKey.KITCHEN_CASHIER_DASHBOARD,
    path: RoutesPageKey.KITCHEN_CASHIER_DASHBOARD,
    component: <KitchenCashierDashboard />,
    index: true,
  },
  {
    key: RoutesPageKey.LIST_ORDERS_OF_CASHIER,
    path: RoutesPageKey.LIST_ORDERS_OF_CASHIER,
    component: <ListOrdersPage />,
    index: false,
  },
  {
    key: RoutesPageKey.ORDER_DETAIL_OF_CASHIER,
    path: RoutesPageKey.ORDER_DETAIL_OF_CASHIER,
    component: <OrderDetailPage />,
    index: false,
  },
  {
    key: RoutesPageKey.LIST_TRANSACTIONS,
    path: RoutesPageKey.LIST_TRANSACTIONS,
    component: <ListTransactionPage />,
    index: false,
  },
];

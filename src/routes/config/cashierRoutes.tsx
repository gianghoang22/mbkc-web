import { CashierDashboard, ListTransactionPage } from 'pages/cashier';
import { ListOrdersPage, OrderDetailPage } from 'pages/common';
import { ProfilePage } from 'pages/profile';
import { PATH_CASHIER_APP } from 'routes/paths';

export const cashierRoutes = [
  {
    path: PATH_CASHIER_APP.root,
    component: <CashierDashboard />,
    index: true,
  },
  {
    path: PATH_CASHIER_APP.profile,
    component: <ProfilePage />,
    index: true,
  },
  {
    path: PATH_CASHIER_APP.order.list,
    component: <ListOrdersPage />,
    index: false,
  },
  {
    path: PATH_CASHIER_APP.order.detailById,
    component: <OrderDetailPage />,
    index: false,
  },
  {
    path: PATH_CASHIER_APP.transaction.list,
    component: <ListTransactionPage />,
    index: false,
  },
];

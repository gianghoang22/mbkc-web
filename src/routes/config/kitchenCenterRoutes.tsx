import { ListOrdersPage, ListStorePage, OrderDetailPage, StoreDetailPage } from 'pages/common';
import {
  CreateNewCashierPage,
  KitchenCenterDashboard,
  ListCashierPage,
  ListMoneyExchangePage,
  ListShipperPaymentPage,
  WalletPage,
} from 'pages/kitchenCenter';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';

export const kitchenCenterRoutes = [
  {
    path: PATH_KITCHEN_CENTER_APP.root,
    component: <KitchenCenterDashboard />,
    index: true,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.store.list,
    component: <ListStorePage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.store.detailById,
    component: <StoreDetailPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.cashier.list,
    component: <ListCashierPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.cashier.newCashier,
    component: <CreateNewCashierPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.cashier.editById,
    component: <CreateNewCashierPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.order.list,
    component: <ListOrdersPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.order.detailById,
    component: <OrderDetailPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.wallet.root,
    component: <WalletPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.wallet.shipperPayments,
    component: <ListShipperPaymentPage />,
    index: false,
  },
  {
    path: PATH_KITCHEN_CENTER_APP.wallet.moneyExchanges,
    component: <ListMoneyExchangePage />,
    index: false,
  },
];

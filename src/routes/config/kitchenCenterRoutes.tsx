import { RoutesPageKey } from 'common/enum';
import {
  CreateNewCashierPage,
  KitchenCenterDashboard,
  KitchenDetailPage,
  ListCashierPage,
  ListKitchenPage,
  ListMenuPage,
  ListOrdersPage,
  ListProductOfMenuPage,
  ListTransferTransactionsPage,
  ListWalletTransactionsPage,
  OrderDetailPage,
  WalletPage,
} from 'pages/kitchenCenterManager';

export const kitchenCenterRoutes = [
  {
    key: RoutesPageKey.KITCHEN_CENTER_DASHBOARD,
    path: RoutesPageKey.KITCHEN_CENTER_DASHBOARD,
    component: <KitchenCenterDashboard />,
    index: true,
  },
  {
    key: RoutesPageKey.LIST_KITCHENS_OF_CENTER,
    path: RoutesPageKey.LIST_KITCHENS_OF_CENTER,
    component: <ListKitchenPage />,
    index: false,
  },
  {
    key: RoutesPageKey.KITCHENS_OF_CENTER_DETAIL,
    path: RoutesPageKey.KITCHENS_OF_CENTER_DETAIL,
    component: <KitchenDetailPage />,
    index: false,
  },
  {
    key: RoutesPageKey.LIST_CASHIERS,
    path: RoutesPageKey.LIST_CASHIERS,
    component: <ListCashierPage />,
    index: false,
  },
  {
    key: RoutesPageKey.CREATE_NEW_CASHIER,
    path: RoutesPageKey.CREATE_NEW_CASHIER,
    component: <CreateNewCashierPage />,
    index: false,
  },
  {
    key: RoutesPageKey.UPDATE_CASHIER,
    path: RoutesPageKey.UPDATE_CASHIER,
    component: <CreateNewCashierPage />,
    index: false,
  },
  {
    key: RoutesPageKey.LIST_MENUS_OF_CENTER,
    path: RoutesPageKey.LIST_MENUS_OF_CENTER,
    component: <ListMenuPage />,
    index: false,
  },
  {
    key: RoutesPageKey.LIST_PRODUCTS_OF_MENU,
    path: RoutesPageKey.LIST_PRODUCTS_OF_MENU,
    component: <ListProductOfMenuPage />,
    index: false,
  },
  {
    key: RoutesPageKey.LIST_ORDERS,
    path: RoutesPageKey.LIST_ORDERS,
    component: <ListOrdersPage />,
    index: false,
  },
  {
    key: RoutesPageKey.ORDER_DETAIL,
    path: RoutesPageKey.ORDER_DETAIL,
    component: <OrderDetailPage />,
    index: false,
  },
  {
    key: RoutesPageKey.WALLET,
    path: RoutesPageKey.WALLET,
    component: <WalletPage />,
    index: false,
  },
  {
    key: RoutesPageKey.LIST_WALLET_TRANSACTIONS,
    path: RoutesPageKey.LIST_WALLET_TRANSACTIONS,
    component: <ListWalletTransactionsPage />,
    index: false,
  },
  {
    key: RoutesPageKey.LIST_TRANSFER_TRANSACTIONS,
    path: RoutesPageKey.LIST_TRANSFER_TRANSACTIONS,
    component: <ListTransferTransactionsPage />,
    index: false,
  },
];

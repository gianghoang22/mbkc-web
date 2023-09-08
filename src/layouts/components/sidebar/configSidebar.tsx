// MUI icons
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import DiscountIcon from '@mui/icons-material/Discount';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SummarizeIcon from '@mui/icons-material/Summarize';
import WalletIcon from '@mui/icons-material/Wallet';
//
import { RoutesPageKey } from 'common/enum';
import { NavSection } from 'common/@types/NavItem';

const navConfigBrandManager: NavSection[] = [
  {
    missions: 'overview',
    listNav: [
      {
        title: 'dashboard',
        path: RoutesPageKey.BRAND_DASHBOARD,
        icon: <AssessmentIcon fontSize="medium" />,
      },
    ],
  },
  {
    missions: 'manager',
    listNav: [
      {
        title: 'kitchen staff',
        path: RoutesPageKey.LIST_KITCHEN_STAFFS,
        icon: <ManageAccountsIcon fontSize="medium" />,
      },
      {
        title: 'kitchen',
        path: RoutesPageKey.LIST_KITCHENS,
        icon: <RestaurantMenuIcon fontSize="medium" />,
      },
      {
        title: 'product',
        path: RoutesPageKey.LIST_PRODUCTS,
        icon: <DinnerDiningIcon fontSize="medium" />,
      },
      {
        title: 'brand menu',
        path: RoutesPageKey.LIST_MENUS,
        icon: <SummarizeIcon fontSize="medium" />,
      },
      {
        title: 'voucher',
        path: RoutesPageKey.LIST_VOUCHERS,
        icon: <DiscountIcon fontSize="medium" />,
      },
    ],
  },
];

const navConfigKitchenCenter: NavSection[] = [
  {
    missions: 'overview',
    listNav: [
      {
        title: 'dashboard',
        path: RoutesPageKey.KITCHEN_CENTER_DASHBOARD,
        icon: <AssessmentIcon fontSize="medium" />,
      },
    ],
  },
  {
    missions: 'manager',
    listNav: [
      {
        title: 'kitchen',
        path: RoutesPageKey.LIST_KITCHENS_OF_CENTER,
        icon: <RestaurantMenuIcon fontSize="medium" />,
      },
      {
        title: 'cashier',
        path: RoutesPageKey.LIST_CASHIERS,
        icon: <AssignmentIndIcon fontSize="medium" />,
      },
      {
        title: 'menu',
        path: RoutesPageKey.LIST_MENUS_OF_CENTER,
        icon: <SummarizeIcon fontSize="medium" />,
      },
      {
        title: 'order',
        path: RoutesPageKey.LIST_ORDERS,
        icon: <ListAltIcon fontSize="medium" />,
      },
      {
        title: 'wallet',
        path: RoutesPageKey.WALLET,
        icon: <WalletIcon fontSize="medium" />,
      },
    ],
  },
];

const navConfigKitchenCashier: NavSection[] = [
  {
    missions: 'overview',
    listNav: [
      {
        title: 'dashboard',
        path: RoutesPageKey.KITCHEN_CASHIER_DASHBOARD,
        icon: <AssessmentIcon fontSize="medium" />,
      },
    ],
  },
  {
    missions: 'manager',
    listNav: [
      {
        title: 'order',
        path: RoutesPageKey.LIST_ORDERS_OF_CASHIER,
        icon: <ListAltIcon fontSize="medium" />,
      },
      {
        title: 'transaction',
        path: RoutesPageKey.LIST_TRANSACTIONS,
        icon: <PointOfSaleIcon fontSize="medium" />,
      },
    ],
  },
];

export { navConfigBrandManager, navConfigKitchenCashier, navConfigKitchenCenter };

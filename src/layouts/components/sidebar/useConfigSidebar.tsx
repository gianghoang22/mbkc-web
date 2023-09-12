// MUI icons
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SummarizeIcon from '@mui/icons-material/Summarize';
import WalletIcon from '@mui/icons-material/Wallet';
import BrandingWatermarkOutlinedIcon from '@mui/icons-material/BrandingWatermarkOutlined';
import BusinessIcon from '@mui/icons-material/Business';
//
import { RoutesPageKey } from 'common/enum';
import { useTranslation } from 'react-i18next';
import { NavSection } from '@types';

function useConfigSidebar() {
  const { t } = useTranslation('home');

  const navBrand: NavSection[] = [
    {
      missions: t('sidebar.overview'),
      listNav: [
        {
          title: 'dashboard',
          path: RoutesPageKey.BRAND_DASHBOARD,
          icon: <AssessmentIcon fontSize="medium" />,
        },
      ],
    },
    {
      missions: t('sidebar.manage'),
      listNav: [
        {
          title: 'kitchen',
          path: RoutesPageKey.LIST_KITCHENS,
          icon: <RestaurantMenuIcon fontSize="medium" />,
        },
        {
          title: 'product category',
          path: RoutesPageKey.LIST_PRODUCT_CATEGORIES,
          icon: <SummarizeIcon fontSize="medium" />,
        },
        {
          title: 'product',
          path: RoutesPageKey.LIST_PRODUCTS,
          icon: <DinnerDiningIcon fontSize="medium" />,
        },
      ],
    },
  ];

  const navKitchenCenter: NavSection[] = [
    {
      missions: t('sidebar.overview'),
      listNav: [
        {
          title: 'dashboard',
          path: RoutesPageKey.KITCHEN_CENTER_DASHBOARD,
          icon: <AssessmentIcon fontSize="medium" />,
        },
      ],
    },
    {
      missions: t('sidebar.manage'),
      listNav: [
        {
          title: 'kitchen',
          path: RoutesPageKey.LIST_STORES_OF_CENTER,
          icon: <RestaurantMenuIcon fontSize="medium" />,
        },
        {
          title: 'cashier',
          path: RoutesPageKey.LIST_CASHIERS,
          icon: <AssignmentIndIcon fontSize="medium" />,
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

  const navCashier: NavSection[] = [
    {
      missions: t('sidebar.overview'),
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

  const navAdmin: NavSection[] = [
    {
      missions: t('sidebar.overview'),
      listNav: [
        {
          title: 'dashboard',
          path: RoutesPageKey.ADMIN_DASHBOARD,
          icon: <AssessmentIcon fontSize="medium" />,
        },
      ],
    },
    {
      missions: t('sidebar.manage'),
      listNav: [
        {
          title: 'kitchen centers',
          path: RoutesPageKey.LIST_KITCHEN_CENTERS,
          icon: <BusinessIcon fontSize="medium" />,
        },
        {
          title: 'brand',
          path: RoutesPageKey.LIST_BRAND,
          icon: <BrandingWatermarkOutlinedIcon fontSize="medium" />,
        },
      ],
    },
  ];

  return { navBrand, navKitchenCenter, navCashier, navAdmin };
}

export { useConfigSidebar };

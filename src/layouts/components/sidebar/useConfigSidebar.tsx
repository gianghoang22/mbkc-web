// @mui icons
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BrandingWatermarkOutlinedIcon from '@mui/icons-material/BrandingWatermarkOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SummarizeIcon from '@mui/icons-material/Summarize';
import WalletIcon from '@mui/icons-material/Wallet';
import StoreIcon from '@mui/icons-material/Store';
import ContactsIcon from '@mui/icons-material/Contacts';
//
import { NavSection } from '@types';
import useLocales from 'hooks/useLocales';
import { PATH_ADMIN_APP, PATH_BRAND_APP, PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';

function useConfigSidebar() {
  const { translate } = useLocales();

  const navBrand: NavSection[] = [
    {
      missions: translate('sidebar.overview'),
      listNav: [
        {
          title: translate('sidebar.dashboard'),
          path: PATH_BRAND_APP.root,
          icon: <AssessmentIcon fontSize="medium" />,
        },
        {
          title: translate('sidebar.information'),
          path: PATH_BRAND_APP.information,
          icon: <ContactsIcon fontSize="medium" />,
        },
      ],
    },
    {
      missions: translate('sidebar.manage'),
      listNav: [
        {
          title: translate('sidebar.store'),
          path: PATH_BRAND_APP.store.list,
          icon: <RestaurantMenuIcon fontSize="medium" />,
        },
        {
          title: translate('sidebar.category'),
          path: PATH_BRAND_APP.category.list,
          icon: <SummarizeIcon fontSize="medium" />,
        },
        {
          title: translate('sidebar.extraCategory'),
          path: PATH_BRAND_APP.category.extraList,
          icon: <LanOutlinedIcon fontSize="medium" />,
        },
        {
          title: translate('sidebar.product'),
          path: PATH_BRAND_APP.product.list,
          icon: <DinnerDiningIcon fontSize="medium" />,
        },
      ],
    },
  ];

  const navKitchenCenter: NavSection[] = [
    {
      missions: translate('sidebar.overview'),
      listNav: [
        {
          title: translate('sidebar.dashboard'),
          path: PATH_KITCHEN_CENTER_APP.root,
          icon: <AssessmentIcon fontSize="medium" />,
        },
      ],
    },
    {
      missions: translate('sidebar.manage'),
      listNav: [
        {
          title: translate('sidebar.store'),
          path: PATH_KITCHEN_CENTER_APP.store.list,
          icon: <RestaurantMenuIcon fontSize="medium" />,
        },
        {
          title: translate('sidebar.store'),
          path: PATH_KITCHEN_CENTER_APP.cashier.list,
          icon: <AssignmentIndIcon fontSize="medium" />,
        },
        {
          title: translate('sidebar.order'),
          path: PATH_KITCHEN_CENTER_APP.order.list,
          icon: <ListAltIcon fontSize="medium" />,
        },
        {
          title: translate('sidebar.wallet'),
          path: PATH_KITCHEN_CENTER_APP.wallet.root,
          icon: <WalletIcon fontSize="medium" />,
        },
      ],
    },
  ];

  const navCashier: NavSection[] = [
    {
      missions: translate('sidebar.overview'),
      listNav: [
        {
          title: translate('sidebar.dashboard'),
          path: PATH_CASHIER_APP.root,
          icon: <AssessmentIcon fontSize="medium" />,
        },
      ],
    },
    {
      missions: translate('sidebar.manage'),
      listNav: [
        {
          title: translate('sidebar.order'),
          path: PATH_CASHIER_APP.order.list,
          icon: <ListAltIcon fontSize="medium" />,
        },
        {
          title: translate('sidebar.transaction'),
          path: PATH_CASHIER_APP.transaction.list,
          icon: <PointOfSaleIcon fontSize="medium" />,
        },
      ],
    },
  ];

  const navAdmin: NavSection[] = [
    {
      missions: translate('sidebar.overview'),
      listNav: [
        {
          title: translate('sidebar.dashboard'),
          path: PATH_ADMIN_APP.root,
          icon: <AssessmentIcon fontSize="medium" />,
        },
      ],
    },
    {
      missions: translate('sidebar.manage'),
      listNav: [
        {
          title: translate('sidebar.kitchenCenter'),
          path: PATH_ADMIN_APP.kitchenCenter.list,
          icon: <BusinessIcon fontSize="medium" />,
        },
        {
          title: translate('sidebar.brand'),
          path: PATH_ADMIN_APP.brand.list,
          icon: <BrandingWatermarkOutlinedIcon fontSize="medium" />,
        },
        {
          title: translate('sidebar.store'),
          path: PATH_ADMIN_APP.store.list,
          icon: <StoreIcon fontSize="medium" />,
        },
      ],
    },
  ];

  return { navBrand, navKitchenCenter, navCashier, navAdmin };
}

export { useConfigSidebar };

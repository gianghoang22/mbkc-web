// MUI icons
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import GroupIcon from '@mui/icons-material/Group';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import { RoutesPageKey } from 'common/enum';
import { NavSection } from 'common/interface/NavItem';

const navConfigBrandManager: NavSection[] = [
  {
    missions: 'overview',
    listNav: [
      {
        title: 'dashboard',
        path: RoutesPageKey.DASHBOARD,
        icon: <LeaderboardRoundedIcon fontSize="small" />,
      },
    ],
  },
  {
    missions: 'manager',
    listNav: [
      {
        title: 'kitchen staff',
        path: RoutesPageKey.LIST_KITCHEN_STAFFS,
        icon: <GroupIcon fontSize="small" />,
      },
      {
        title: 'kitchen',
        path: RoutesPageKey.LIST_KITCHENS,
        icon: <ManageAccountsIcon fontSize="small" />,
      },
      {
        title: 'product',
        path: RoutesPageKey.LIST_PRODUCTS,
        icon: <BookOnlineIcon fontSize="small" />,
      },
      {
        title: 'brand menu',
        path: RoutesPageKey.LIST_MENUS,
        icon: <SportsSoccerRoundedIcon fontSize="small" />,
      },
      {
        title: 'voucher',
        path: RoutesPageKey.LIST_VOUCHERS,
        icon: <SportsSoccerRoundedIcon fontSize="small" />,
      },
    ],
  },
];

const navConfigKitchenCenter = [
  {
    title: 'tổng quan',
    path: '/dashboard/app',
    icon: <LeaderboardRoundedIcon fontSize="small" />,
  },
  {
    title: 'tài khoản người dùng',
    path: '/dashboard/list-account',
    icon: <GroupIcon fontSize="small" />,
  },
  {
    title: 'tài khoản chủ sân',
    path: '/dashboard/list-owner',
    icon: <ManageAccountsIcon fontSize="small" />,
  },
  {
    title: 'Booking',
    path: '/dashboard/list-booking',
    icon: <BookOnlineIcon fontSize="small" />,
  },
  {
    title: 'môn thể thao',
    path: '/dashboard/sport',
    icon: <SportsSoccerRoundedIcon fontSize="small" />,
  },
];

const navConfigKitchenCashier = [
  {
    title: 'tổng quan',
    path: '/dashboard/app',
    icon: <LeaderboardRoundedIcon fontSize="small" />,
  },
  {
    title: 'tài khoản người dùng',
    path: '/dashboard/list-account',
    icon: <GroupIcon fontSize="small" />,
  },
  {
    title: 'tài khoản chủ sân',
    path: '/dashboard/list-owner',
    icon: <ManageAccountsIcon fontSize="small" />,
  },
  {
    title: 'Booking',
    path: '/dashboard/list-booking',
    icon: <BookOnlineIcon fontSize="small" />,
  },
  {
    title: 'môn thể thao',
    path: '/dashboard/sport',
    icon: <SportsSoccerRoundedIcon fontSize="small" />,
  },
];

export { navConfigBrandManager, navConfigKitchenCashier, navConfigKitchenCenter };

// MUI icons
import GroupIcon from '@mui/icons-material/Group';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

const navConfigBrandManager = [
  {
    title: 'dashboard',
    path: '/dashboard/brand-app',
    icon: <LeaderboardRoundedIcon fontSize="small" />,
    missions: 'overview',
  },
  {
    title: 'kitchen staff',
    path: '/dashboard/bm-kitchen-staff',
    icon: <GroupIcon fontSize="small" />,
    missions: 'manager',
  },
  {
    title: 'kitchen',
    path: '/dashboard/bm-kitchen',
    icon: <ManageAccountsIcon fontSize="small" />,
    missions: 'manager',
  },
  {
    title: 'product',
    path: '/dashboard/bm-product',
    icon: <BookOnlineIcon fontSize="small" />,
    missions: 'manager',
  },
  {
    title: 'brand menu',
    path: '/dashboard/bm-brand-menu',
    icon: <SportsSoccerRoundedIcon fontSize="small" />,
    missions: 'manager',
  },
  {
    title: 'voucher',
    path: '/dashboard/bm-voucher',
    icon: <SportsSoccerRoundedIcon fontSize="small" />,
    missions: 'manager',
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

export { navConfigBrandManager, navConfigKitchenCenter, navConfigKitchenCashier };

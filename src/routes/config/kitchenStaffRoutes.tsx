import { RoutesPageKey } from 'common/enum';
import { ForgotPasswordPage, LoginPage, ResetPasswordPage } from 'pages';

export const kitchenStaffRoutes = [
  {
    key: RoutesPageKey.LOGIN,
    path: RoutesPageKey.LOGIN,
    component: <LoginPage />,
    index: true,
  },
  {
    key: RoutesPageKey.LOGIN,
    path: RoutesPageKey.LOGIN,
    component: <ForgotPasswordPage />,
    index: false,
  },
  {
    key: RoutesPageKey.RESET_PASSWORD,
    path: RoutesPageKey.RESET_PASSWORD,
    component: <ResetPasswordPage />,
    index: false,
  },
];

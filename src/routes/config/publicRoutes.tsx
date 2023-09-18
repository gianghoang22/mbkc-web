import { RoutesPageKey } from 'common/enum';
import { ForgotPasswordPage, LoginPage, ResetPasswordPage } from 'pages/auth';

export const publicRoutes = [
  {
    key: RoutesPageKey.LOGIN,
    path: RoutesPageKey.LOGIN,
    component: <LoginPage />,
    index: true,
  },
  {
    key: RoutesPageKey.FORGOT_PASSWORD,
    path: RoutesPageKey.FORGOT_PASSWORD,
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

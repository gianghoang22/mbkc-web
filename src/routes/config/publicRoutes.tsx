import { ForgotPasswordPage, LoginPage, ResetPasswordPage } from 'pages/auth';
import { PATH_AUTH } from 'routes/paths';

export const publicRoutes = [
  {
    path: PATH_AUTH.login,
    component: <LoginPage />,
    index: true,
  },
  {
    path: PATH_AUTH.forgotPassword,
    component: <ForgotPasswordPage />,
    index: false,
  },
  {
    path: PATH_AUTH.resetPassword,
    component: <ResetPasswordPage />,
    index: false,
  },
];

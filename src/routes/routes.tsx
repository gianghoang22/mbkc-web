import DashboardLayout from 'layouts/dashboard/DashboardLayout';
import SimpleLayout from 'layouts/simple/SimpleLayout';
import { ForgotPasswordPage, ListProductPage, LoginPage, Page404, ResetPasswordPage } from 'pages';
import { Navigate, Route, Routes } from 'react-router-dom';

export const publicRoute = [
  {
    key: 'login',
    path: 'login',
    component: <LoginPage />,
    index: true,
  },
  {
    key: 'forgot-password',
    path: 'forgot-password',
    component: <ForgotPasswordPage />,
    index: false,
  },
  {
    key: 'reset-password',
    path: 'reset-password/:token',
    component: <ResetPasswordPage />,
    index: false,
  },
];

export const privateRoute = [
  {
    key: 'list-kitchen',
    path: 'list-kitchen',
    component: <ListProductPage />,
    index: false,
  },
];

function AppRouter() {
  return (
    <Routes>
      <Route element={<Navigate to="/login" />} index={true} />
      {publicRoute.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}

      <Route element={<SimpleLayout />}>
        <Route element={<Navigate to="/dashboard/app" />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<Page404 />} />
      </Route>

      <Route path="*" element={<Navigate to="/404" replace />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route element={<Navigate to="/dashboard/app" />} index={true} />
        {privateRoute.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Route>
    </Routes>
  );
}

export default AppRouter;

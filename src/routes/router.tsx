import { RoutesPageKey } from 'common/enum';
import DashboardLayout from 'layouts/dashboard/DashboardLayout';
import SimpleLayout from 'layouts/simple/SimpleLayout';
import { Page404 } from 'pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './config';
import { ListProductPage } from 'pages/brandManager';

export const privateRoute = [
  {
    key: RoutesPageKey.LIST_PRODUCTS,
    path: RoutesPageKey.LIST_PRODUCTS,
    component: <ListProductPage />,
    index: false,
  },
];

function AppRouter() {
  return (
    <Routes>
      <Route element={<Navigate to="/login" />} index={true} />
      {publicRoutes.map((route) => (
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

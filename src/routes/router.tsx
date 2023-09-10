import { Navigate, Route, Routes } from 'react-router-dom';
//layout
import DashboardLayout from 'layouts/dashboard/DashboardLayout';
import SimpleLayout from 'layouts/simple/SimpleLayout';
//pages
import { Page404 } from 'pages';
//router
import BrandRouter from './brandRouter';
import CashierRouter from './cashierRouter';
import KitchenCenterRouter from './kitchenCenterRouter';
//routes
import { brandRoutes, cashierRoutes, kitchenCenterRoutes, publicRoutes } from './config';
import { RoutesPageKey } from 'common/enum';

function AppRouter() {
  return (
    <Routes>
      <Route element={<Navigate to={RoutesPageKey.LOGIN} />} index={true} />
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}

      <Route element={<SimpleLayout />}>
        <Route element={<Navigate to="/dashboard/app" />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<Page404 />} />
      </Route>

      <Route path="*" element={<Navigate to="/404" replace />} />

      <Route element={<DashboardLayout />}>
        {/* brand routes */}
        <Route element={<BrandRouter />}>
          <Route element={<Navigate to={RoutesPageKey.BRAND_DASHBOARD} />} index={true} />
          {brandRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>

        {/* kitchen center routes */}
        <Route element={<KitchenCenterRouter />}>
          <Route element={<Navigate to={RoutesPageKey.KITCHEN_CENTER_DASHBOARD} />} index={true} />
          {kitchenCenterRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>

        {/* kitchen center routes */}
        <Route element={<CashierRouter />}>
          <Route element={<Navigate to={RoutesPageKey.KITCHEN_CASHIER_DASHBOARD} />} index={true} />
          {cashierRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;

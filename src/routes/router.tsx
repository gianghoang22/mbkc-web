import { Navigate, Route, Routes } from 'react-router-dom';
//layout
import DashboardLayout from 'layouts/dashboard/DashboardLayout';
import SimpleLayout from 'layouts/simple/SimpleLayout';
//pages
import { Page404 } from 'pages/error';
//router
import AdminRouter from './adminRouter';
import BrandRouter from './brandRouter';
import CashierRouter from './cashierRouter';
import KitchenCenterRouter from './kitchenCenterRouter';
//routes
import { adminRoutes, brandRoutes, cashierRoutes, kitchenCenterRoutes, publicRoutes } from './config';
import { PATH_ADMIN_APP, PATH_AUTH, PATH_BRAND_APP, PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from './paths';

function AppRouter() {
  return (
    <Routes>
      <Route element={<Navigate to={PATH_AUTH.login} />} index={true} />
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
          <Route element={<Navigate to={PATH_BRAND_APP.root} />} index={true} />
          {brandRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>

        {/* kitchen center routes */}
        <Route element={<KitchenCenterRouter />}>
          <Route element={<Navigate to={PATH_KITCHEN_CENTER_APP.root} />} index={true} />
          {kitchenCenterRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>

        {/* kitchen center routes */}
        <Route element={<CashierRouter />}>
          <Route element={<Navigate to={PATH_CASHIER_APP.root} />} index={true} />
          {cashierRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>

        {/* MBKC admin routes */}
        <Route element={<AdminRouter />}>
          <Route element={<Navigate to={PATH_ADMIN_APP.root} />} index={true} />
          {adminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;

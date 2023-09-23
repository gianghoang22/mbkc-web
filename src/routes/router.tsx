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
import { useAppSelector } from 'redux/configStore';
import { Role } from 'common/enum';

function AppRouter() {
  const { userAuth } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route element={<Navigate to={PATH_AUTH.login} />} index={true} />
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}

      <Route element={<SimpleLayout />}>
        {userAuth?.roleName === Role.MBKC_ADMIN ? (
          <Route element={<Navigate to={PATH_ADMIN_APP.root} />} />
        ) : userAuth?.roleName === Role.BRAND_MANAGER ? (
          <Route element={<Navigate to={PATH_BRAND_APP.root} />} />
        ) : userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER ? (
          <Route element={<Navigate to={PATH_KITCHEN_CENTER_APP.root} />} />
        ) : userAuth?.roleName === Role.CASHIER ? (
          <Route element={<Navigate to={PATH_CASHIER_APP.root} />} />
        ) : (
          <></>
        )}
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<Page404 />} />
      </Route>

      <Route path="*" element={<Navigate to="/404" replace />} />

      {/* brand routes */}
      <Route element={<BrandRouter />}>
        <Route element={<DashboardLayout />}>
          <Route element={<Navigate to={PATH_BRAND_APP.root} />} index={true} />
          {brandRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
      </Route>

      {/* kitchen center routes */}
      <Route element={<KitchenCenterRouter />}>
        <Route element={<DashboardLayout />}>
          <Route element={<Navigate to={PATH_KITCHEN_CENTER_APP.root} />} index={true} />
          {kitchenCenterRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
      </Route>

      {/* kitchen center routes */}
      <Route element={<CashierRouter />}>
        <Route element={<DashboardLayout />}>
          <Route element={<Navigate to={PATH_CASHIER_APP.root} />} index={true} />
          {cashierRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
      </Route>

      {/* MBKC admin routes */}
      <Route element={<AdminRouter />}>
        <Route element={<DashboardLayout />}>
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

import { Navigate, Route, Routes } from 'react-router-dom';
//layout
import DashboardLayout from 'layouts/dashboard/DashboardLayout';
import SimpleLayout from 'layouts/simple/SimpleLayout';
//pages
import { Page404 } from 'pages';
//routes
import { brandRoutes, publicRoutes } from './config';
import BrandRouter from './brandRouter';

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

      <Route element={<DashboardLayout />}>
        <Route path="/brand" element={<BrandRouter />}>
          <Route element={<Navigate to="/brand/dashboard" />} index={true} />
          {brandRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;

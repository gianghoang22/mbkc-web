import { Role } from 'common/enum';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'redux/configStore';
import { getAccessToken } from 'utils';
import { PATH_ADMIN_APP, PATH_AUTH, PATH_BRAND_APP, PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from './paths';

export default function PublicRouter() {
  const accessToken = getAccessToken();

  const { isAuthenticated, userAuth } = useAppSelector((state) => state.auth);

  const navigateRouter =
    userAuth?.roleName === Role.MBKC_ADMIN
      ? PATH_ADMIN_APP.root
      : userAuth?.roleName === Role.BRAND_MANAGER
      ? PATH_BRAND_APP.root
      : userAuth?.roleName === Role.KITCHEN_CENTER_MANAGER
      ? PATH_KITCHEN_CENTER_APP.root
      : userAuth?.roleName === Role.CASHIER
      ? PATH_CASHIER_APP.root
      : PATH_AUTH.login;

  return isAuthenticated && accessToken ? <Navigate to={navigateRouter} /> : <Outlet />;
}

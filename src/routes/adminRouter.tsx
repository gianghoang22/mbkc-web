import { Role } from 'common/enum';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from 'redux/configStore';
import { getAccessToken } from 'utils';
import { PATH_AUTH } from './paths';

function AdminRouter() {
  const location = useLocation();
  const accessToken = getAccessToken();

  const { isAuthenticated, userAuth } = useAppSelector((state) => state.auth);

  return isAuthenticated && accessToken && userAuth?.roleName === Role.MBKC_ADMIN ? (
    <Outlet />
  ) : (
    <Navigate to={PATH_AUTH.login} state={{ from: location }} />
  );
}

export default AdminRouter;

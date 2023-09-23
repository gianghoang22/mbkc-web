import { LoginResponse, ParamsLogin } from '@types';
import { axiosClient } from 'api/axiosClient';
import { Role } from 'common/enum';
import { RoutesApiKeys } from 'constants/routesApiKeys';
import { PATH_ADMIN_APP, PATH_AUTH, PATH_BRAND_APP, PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import {
  getErrorMessage,
  removeAccessToken,
  removeRefreshToken,
  removeUserAuth,
  setAccessToken,
  setRefreshToken,
  setUserAuth,
} from 'utils';
import { setMessageError, setMessageSuccess } from './authSlice';

export const loginThunk = async (params: ParamsLogin, thunkAPI: any) => {
  const { user, navigate } = params;
  try {
    const response: LoginResponse = await axiosClient.post(RoutesApiKeys.LOGIN, user);
    const userStorage = {
      accountId: response?.accountId,
      email: response?.email,
      roleName: response?.roleName,
    };
    setAccessToken(response.tokens.accessToken);
    setRefreshToken(response.tokens.refreshToken);
    setUserAuth(userStorage);

    if (response.roleName === Role.MBKC_ADMIN) {
      navigate(PATH_ADMIN_APP.root);
    } else if (response.roleName === Role.BRAND_MANAGER) {
      navigate(PATH_BRAND_APP.root);
    } else if (response.roleName === Role.KITCHEN_CENTER_MANAGER) {
      navigate(PATH_KITCHEN_CENTER_APP.root);
    } else if (response.roleName === Role.CASHIER) {
      navigate(PATH_CASHIER_APP.root);
    }
    thunkAPI.dispatch(setMessageSuccess('Login successfully'));
    return userStorage;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error);
    console.log(errorMessage);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const logoutThunk = async (navigate: any, thunkAPI: any) => {
  try {
    removeAccessToken();
    removeRefreshToken();
    removeUserAuth();

    navigate(PATH_AUTH.login);
  } catch (error) {
    console.log('logout error thunk: ', error);
    return thunkAPI.rejectWithValue(error);
  }
};

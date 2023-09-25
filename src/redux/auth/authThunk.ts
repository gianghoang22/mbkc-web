import { EmailForm, LoginForm, LoginResponse, Params, ResetFormApi, VerificationForm } from '@types';
import { axiosClient } from 'api/axiosClient';
import { Role } from 'common/enum';
import { RoutesApiKeys } from 'constants/routesApiKeys';
import { PATH_ADMIN_APP, PATH_AUTH, PATH_BRAND_APP, PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import {
  getErrorMessage,
  removeAuthenticated,
  removeSession,
  removeUserAuth,
  setAuthenticated,
  setSession,
  setUserAuth,
} from 'utils';
import { setMessageError, setMessageSuccess } from './authSlice';

export const loginThunk = async (params: Params<LoginForm>, thunkAPI: any) => {
  const { data, navigate } = params;
  try {
    const response: LoginResponse = await axiosClient.post(RoutesApiKeys.LOGIN, data);
    const userStorage = {
      accountId: response?.accountId,
      email: response?.email,
      roleName: response?.roleName,
    };
    setSession(response.tokens.accessToken, response.tokens.refreshToken);
    setUserAuth(userStorage);
    setAuthenticated();

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
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const forgotPasswordThunk = async (params: Params<EmailForm>, thunkAPI: any) => {
  const { data, navigate } = params;
  try {
    const response = await axiosClient.post(RoutesApiKeys.FORGOT_PASSWORD, data);
    if (response) {
      navigate(PATH_AUTH.verificationOTP);
      thunkAPI.dispatch(setMessageSuccess('Sent email confirmation successfully'));
    }
    return response;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const verifyOtpThunk = async (params: Params<VerificationForm>, thunkAPI: any) => {
  const { data, navigate } = params;
  console.log(data);
  try {
    const response = await axiosClient.post(RoutesApiKeys.VERIFY_OTP, data);
    if (response) {
      navigate(PATH_AUTH.resetPassword);
      thunkAPI.dispatch(setMessageSuccess('Confirmed OTP Code Successfully.'));
    }
    return response;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const resetPasswordThunk = async (params: Params<ResetFormApi>, thunkAPI: any) => {
  const { data, navigate } = params;
  try {
    const response = await axiosClient.put(RoutesApiKeys.RESET_PASSWORD, data);
    if (response) {
      if (response) {
        navigate(PATH_AUTH.login);
        thunkAPI.dispatch(setMessageSuccess('Reset Password Successfully.'));
      }
    }
    return response;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const logoutThunk = async (navigate: any, thunkAPI: any) => {
  try {
    removeSession();
    removeUserAuth();
    removeAuthenticated();

    navigate(PATH_AUTH.login);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

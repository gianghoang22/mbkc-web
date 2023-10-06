import {
  EmailForm,
  LoginForm,
  LoginResponse,
  MessageResponse,
  Params,
  ResetFormApi,
  UpdatePasswordFormApi,
  UserInfo,
  VerificationForm,
} from '@types';
import { axiosClient, setHeaderAuth } from 'api/axiosClient';
import { ROUTES_API_ACCOUNT, ROUTES_API_AUTH } from 'constants/routesApiKeys';
import { PATH_AUTH } from 'routes/paths';
import {
  getAccessToken,
  getErrorMessage,
  removeAuthenticated,
  removeSession,
  removeUserAuth,
  setAuthenticated,
  setSession,
  setUserAuth,
  setUserInfo,
} from 'utils';
import { getUserInformation, setMessageError, setMessageSuccess } from './authSlice';

export const loginThunk = async (params: Params<LoginForm>, thunkAPI: any) => {
  const { data, navigate } = params;
  try {
    const response: LoginResponse = await axiosClient.post(ROUTES_API_AUTH.LOGIN, data);
    const userStorage = {
      accountId: response?.accountId,
      email: response?.email,
      roleName: response?.roleName,
      isConfirmed: response?.isConfirmed,
    };
    setSession(response.tokens.accessToken, response.tokens.refreshToken);
    setUserAuth(userStorage);
    setAuthenticated();
    thunkAPI.dispatch(setMessageSuccess('Login successfully'));
    return userStorage;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const updatePasswordThunk = async (params: Params<UpdatePasswordFormApi>, thunkAPI: any) => {
  const { data, idParams, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosClient.put(
        ROUTES_API_ACCOUNT.UPDATE_PASSWORD(idParams?.accountId ? idParams?.accountId : 0),
        data
      );
      if (response) {
        thunkAPI.dispatch(setMessageSuccess('Update Password Successfully.'));
        thunkAPI.dispatch(getUserInformation({ accountId: idParams?.accountId, navigate }));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getUserInfoThunk = async (params: any, thunkAPI: any) => {
  const { accountId, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: UserInfo = await axiosClient.get(ROUTES_API_ACCOUNT.ACCOUNT_INFORMATION(accountId));
      if (response) {
        const userStorage = {
          accountId: response?.accountId,
          email: response?.email,
          roleName: response?.roleName,
          isConfirmed: response?.isConfirmed,
        };
        setUserAuth(userStorage);
        setUserInfo(response);
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const forgotPasswordThunk = async (params: Params<EmailForm>, thunkAPI: any) => {
  const { data, navigate } = params;
  try {
    const response: MessageResponse = await axiosClient.post(ROUTES_API_AUTH.FORGOT_PASSWORD, data);
    if (response) {
      navigate(PATH_AUTH.verificationOTP);
      thunkAPI.dispatch(setMessageSuccess('Sent email confirmation successfully'));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const verifyOtpThunk = async (params: Params<VerificationForm>, thunkAPI: any) => {
  const { data, navigate } = params;
  try {
    const response: MessageResponse = await axiosClient.post(ROUTES_API_AUTH.VERIFY_OTP, data);
    if (response) {
      navigate(PATH_AUTH.resetPassword);
      thunkAPI.dispatch(setMessageSuccess('Confirmed OTP Code Successfully.'));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const resetPasswordThunk = async (params: Params<ResetFormApi>, thunkAPI: any) => {
  const { data, navigate } = params;
  try {
    const response: MessageResponse = await axiosClient.put(ROUTES_API_AUTH.RESET_PASSWORD, data);
    if (response) {
      navigate(PATH_AUTH.login);
      thunkAPI.dispatch(setMessageSuccess('Reset Password Successfully.'));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
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
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
};

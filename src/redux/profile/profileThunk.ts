import { axiosClient } from 'api/axiosClient';
import { ROUTES_API_BRANDS, ROUTES_API_KITCHEN_CENTER, ROUTES_API_STORES } from 'constants/routesApiKeys';
import { NavigateFunction } from 'react-router-dom';
import { setMessageError } from 'redux/auth/authSlice';
import { getAccessToken, getErrorMessage, setAccessToken } from 'utils';

export const getKitchenCenterProfileThunk = async (navigate: NavigateFunction, thunkAPI: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    setAccessToken(accessToken);
    try {
      const response = await axiosClient.get(ROUTES_API_KITCHEN_CENTER.GET_PROFILE_KITCHEN_CENTER);
      console.log(response);
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getBrandProfileThunk = async (navigate: NavigateFunction, thunkAPI: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    setAccessToken(accessToken);
    try {
      const response = await axiosClient.get(ROUTES_API_BRANDS.GET_PROFILE_BRAND);
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getStoreProfileThunk = async (navigate: NavigateFunction, thunkAPI: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    setAccessToken(accessToken);
    try {
      const response = await axiosClient.get(ROUTES_API_STORES.GET_PROFILE_STORE);
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

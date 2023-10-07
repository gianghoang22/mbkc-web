import { NavigateFunction } from 'react-router-dom';
//
import { BrandProfile, KitchenCenterProfile } from '@types';
import { axiosClient } from 'api/axiosClient';
import { ROUTES_API_BRANDS, ROUTES_API_KITCHEN_CENTER } from 'constants/routesApiKeys';
import { setMessageError } from 'redux/auth/authSlice';
import { getAccessToken, getErrorMessage, setAccessToken, setBrandInfo, setKitchenCenterInfo } from 'utils';

export const getKitchenCenterProfileThunk = async (navigate: NavigateFunction, thunkAPI: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    setAccessToken(accessToken);
    try {
      const response: KitchenCenterProfile = await axiosClient.get(
        ROUTES_API_KITCHEN_CENTER.GET_PROFILE_KITCHEN_CENTER
      );
      if (response) {
        setKitchenCenterInfo(response);
      }
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
      const response: BrandProfile = await axiosClient.get(ROUTES_API_BRANDS.GET_PROFILE_BRAND);
      if (response) {
        setBrandInfo(response);
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

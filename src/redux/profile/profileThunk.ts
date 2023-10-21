import { NavigateFunction } from 'react-router-dom';
//
import { BrandProfile, KitchenCenterProfile, Params, UpdateBrandProfile } from '@types';
import { axiosClient, axiosFormData } from 'api/axiosClient';
import { ROUTES_API_BRANDS, ROUTES_API_KITCHEN_CENTER } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { appendData, getErrorMessage, setBrandInfo, setKitchenCenterInfo } from 'utils';
import { getBrandProfile } from './profileSlice';

export const getKitchenCenterProfileThunk = async (navigate: NavigateFunction, thunkAPI: any) => {
  try {
    const response: KitchenCenterProfile = await axiosClient.get(ROUTES_API_KITCHEN_CENTER.GET_PROFILE_KITCHEN_CENTER);
    if (response) {
      setKitchenCenterInfo(response);
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getBrandProfileThunk = async (navigate: NavigateFunction, thunkAPI: any) => {
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
};

export const updateBrandProfileThunk = async (params: Params<UpdateBrandProfile>, thunkAPI: any) => {
  const { data, idParams, navigate } = params;
  const formData = appendData(data);

  try {
    const response = await axiosFormData.put(
      ROUTES_API_BRANDS.UPDATE_PROFILE_BRAND(idParams?.brandId ? idParams?.brandId : 0),
      formData
    );
    if (response) {
      await thunkAPI.dispatch(getBrandProfile(navigate));
      thunkAPI.dispatch(setMessageSuccess('Update brand information successfully'));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

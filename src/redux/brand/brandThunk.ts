import { axiosClient, axiosFormData, setHeaderAuth } from 'api/axiosClient';
import { RoutesApiKeys } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { getAccessToken, getErrorMessage } from 'utils';
import { getAllBrands } from './brandSlice';
import { ListParams } from '@types';
import { PATH_ADMIN_APP } from 'routes/paths';

export const getAllBrandsThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.get(RoutesApiKeys.GET_ALL_BRAND(optionParams));
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getBrandDetailThunk = async (params: any, thunkAPI: any) => {
  const { brandId, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      const response = await axiosClient.get(`/brands/${brandId}`);
      console.log(response);
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewBrandThunk = async (params: any, thunkAPI: any) => {
  const { navigate, newBrand } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosFormData.post('/brands', newBrand);
      if (response) {
        params.navigate(PATH_ADMIN_APP.brand.list);
        thunkAPI.dispatch(setMessageSuccess('Created new brand successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateBrandThunk = async (params: any, thunkAPI: any) => {
  const { navigate, brandId, updateBrandOptions } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosFormData.put(`/brands/${brandId}`, updateBrandOptions);
      if (response) {
        thunkAPI.dispatch(setMessageSuccess('Update brand successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deleteBrandThunk = async (params: any, thunkAPI: any) => {
  const { navigate, brandId, page, rowsPerPage } = params;
  const options = {
    keySearchName: '',
    keyStatusFilter: 'Active',
    currentPage: page,
    itemsPerPage: rowsPerPage,
  };
  const params_callback: ListParams = {
    optionParams: options,
    navigate,
  };
  const accessToken = getAccessToken();
  if (accessToken) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    try {
      const response = await axiosClient.delete(`/brands/${brandId}`);
      if (response) {
        thunkAPI.dispatch(setMessageSuccess('Deleted Brand Successfully'));
        thunkAPI.dispatch(getAllBrands(params_callback));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

import { Brand, ListParams, ListResponse, MessageResponse } from '@types';
import { axiosClient, axiosFormData } from 'api/axiosClient';
import { ROUTES_API_BRANDS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_ADMIN_APP } from 'routes/paths';
import { getErrorMessage, handleResponseMessage } from 'utils';
import { getAllBrands } from './brandSlice';

export const getAllBrandsThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response: ListResponse<Brand> = await axiosClient.get(ROUTES_API_BRANDS.GET_ALL_BRAND(optionParams));
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getBrandDetailThunk = async (params: any, thunkAPI: any) => {
  const { brandId, navigate } = params;

  try {
    const response: Brand = await axiosClient.get(`/brands/${brandId}`);
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewBrandThunk = async (params: any, thunkAPI: any) => {
  const { navigate, newBrand } = params;

  try {
    const response: MessageResponse = await axiosFormData.post('/brands', newBrand);
    if (response) {
      navigate(PATH_ADMIN_APP.brand.list);
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateBrandThunk = async (params: any, thunkAPI: any) => {
  const { navigate, brandId, updateBrandOptions } = params;

  try {
    const response: MessageResponse = await axiosFormData.put(`/brands/${brandId}`, updateBrandOptions);
    if (response) {
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
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

  try {
    const response: MessageResponse = await axiosClient.delete(`/brands/${brandId}`);
    if (response) {
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
      thunkAPI.dispatch(getAllBrands(params_callback));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateStatusBrandThunk = async (params: any, thunkAPI: any) => {
  const { brandId, navigate, status, page, rowsPerPage } = params;
  const options = {
    keySearchName: '',
    currentPage: page,
    itemsPerPage: rowsPerPage,
  };

  const paramsCallback: ListParams = {
    optionParams: options,
    navigate,
  };

  try {
    const response: MessageResponse = await axiosClient.put(ROUTES_API_BRANDS.UPDATE_STATUS_BRAND(brandId), {
      status: status,
    });
    if (response) {
      await thunkAPI.dispatch(getAllBrands(paramsCallback));
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

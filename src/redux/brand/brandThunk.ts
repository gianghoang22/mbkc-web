import { ListParams } from '@types';
import { axiosClient, axiosFormData } from 'api/axiosClient';
import { ROUTES_API_BRANDS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_ADMIN_APP } from 'routes/paths';
import { getErrorMessage } from 'utils';
import { getAllBrands } from './brandSlice';

export const getAllBrandsThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_BRANDS.GET_ALL_BRAND(optionParams));
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
    const response = await axiosClient.get(`/brands/${brandId}`);
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
};

export const updateBrandThunk = async (params: any, thunkAPI: any) => {
  const { navigate, brandId, updateBrandOptions } = params;

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
    const response = await axiosClient.put(ROUTES_API_BRANDS.UPDATE_STATUS_BRAND(brandId), {
      status: status,
    });
    if (response) {
      await thunkAPI.dispatch(getAllBrands(paramsCallback));
      thunkAPI.dispatch(setMessageSuccess('Update status brand successfully'));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

import { axiosClient, setHeaderAuth } from 'api/axiosClient';
import { RoutesApiKeys } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { getAccessToken, getErrorMessage } from 'utils';
import { getAllBrands } from './brandSlice';
import { ListParams } from '@types';

export const getAllBrandsThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.get(RoutesApiKeys.GET_ALL_BRAND(optionParams));
      return response;
    } catch (error) {
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
    } catch (error) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewBrandThunk = async (params: any, thunkAPI: any) => {
  const { navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    try {
      const response = await axiosClient.post('/sport-center/', params.newSportCenter);
      if (response) {
        params.navigate('/dashboard/sport-center');
        // thunkAPI.dispatch(getSportCentersOfOwner());
        thunkAPI.dispatch(setMessageSuccess('Created new sport center successfully'));
      }
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateBrandThunk = async (params: any, thunkAPI: any) => {
  const { navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      const response = await axiosClient.post(`/sport-center/${params.brandId}`, params.upadateSportCenter);
      if (response) {
        params.navigate('/dashboard/sport-center');
        thunkAPI.dispatch(setMessageSuccess('Update sport center successfully'));
      }
      return response;
    } catch (error) {
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
  const params_callback = {
    optionsParams: options,
    navigate,
  };
  const accessToken = getAccessToken();
  if (accessToken) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    try {
      const response = await axiosClient.delete(`/brands/${brandId}`);
      if (response) {
        // thunkAPI.dispatch(getAllBrands(params_callback));
        thunkAPI.dispatch(setMessageSuccess('Deleted Brand Successfully'));
      }
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

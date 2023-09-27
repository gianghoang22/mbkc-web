import { CreateKitchenCenterParams, KitchenCenterOptions } from '@types';
import { axiosClient } from 'api/axiosClient';
import { setMessageError } from 'redux/auth/authSlice';
import { PATH_ADMIN_APP } from 'routes/paths';
import { getAccessToken, getErrorMessage } from 'utils';
import { setMessageSuccess } from './kitchenCenterSlice';

export const getAllKitchenCentersThunk = async (options: KitchenCenterOptions, thunkAPI: any) => {
  const accessToken = getAccessToken();
  const { itemsPerPage, currentPage, searchValue } = options;
  if (accessToken) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    try {
      const response = await axiosClient.get(
        `/kitchencenters?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&searchValue=${searchValue}`
      );
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getKitchenCenterDetailThunk = async (kitchenCenterId: number, thunkAPI: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    try {
      const response = await axiosClient.get(`/kitchencenters/${kitchenCenterId}`);
      console.log(response);
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewKitchenCenterThunk = async (params: CreateKitchenCenterParams, thunkAPI: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    try {
      const response = await axiosClient.post('/kitchencenters', params.newKitchenCenter);
      if (response) {
        console.log(response);
        thunkAPI.dispatch(setMessageSuccess(response));
        params.navigate(PATH_ADMIN_APP.kitchenCenter.list);
      }
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateKitchenCenterThunk = async (params: any, thunkAPI: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      const response = await axiosClient.post(`/sport-center/${params.kitchenCenterId}`, params.upadateSportCenter);
      if (response) {
        params.navigate('/dashboard/sport-center');
        thunkAPI.dispatch(setMessageSuccess('Update sport center successfully'));
      }
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deleteKitchenCenterThunk = async (params: any, thunkAPI: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      const response = await axiosClient.delete(`/sport-center/${params.kitchenCenterId}/${params.sportId}`);
      if (response) {
        // thunkAPI.dispatch(getSportCentersOfOwner());
        thunkAPI.dispatch(setMessageSuccess('Deleted sport center successfully'));
      }
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

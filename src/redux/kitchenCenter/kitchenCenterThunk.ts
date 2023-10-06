import { CreateKitchenCenterParams, ListParams } from '@types';
import { axiosClient, axiosFormData, setHeaderAuth } from 'api/axiosClient';
import { ROUTES_API_KITCHEN_CENTERS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_ADMIN_APP } from 'routes/paths';
import { getAccessToken, getErrorMessage } from 'utils';
import { getAllKitchenCenters } from './kitchenCenterSlice';

export const getAllKitchenCentersThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.get(ROUTES_API_KITCHEN_CENTERS.GET_ALL_KITCHEN_CENTER(optionParams));
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getKitchenCenterDetailThunk = async (params: any, thunkAPI: any) => {
  const { kitchenCenterId, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    try {
      const response = await axiosClient.get(ROUTES_API_KITCHEN_CENTERS.GET_KITCHEN_CENTER_DETAIL(kitchenCenterId));
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewKitchenCenterThunk = async (params: CreateKitchenCenterParams, thunkAPI: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosFormData.post(
        ROUTES_API_KITCHEN_CENTERS.CREATE_KITCHEN_CENTER,
        params.newKitchenCenter
      );
      if (response) {
        thunkAPI.dispatch(setMessageSuccess('Create kitchen center successfully'));
        params.navigate(PATH_ADMIN_APP.kitchenCenter.list);
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, params.navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateKitchenCenterThunk = async (params: any, thunkAPI: any) => {
  const { navigate, updateKitchenCenterOptions, kitchenCenterId } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      const response = await axiosFormData.put(
        ROUTES_API_KITCHEN_CENTERS.UPDATE_KITCHEN_CENTER(kitchenCenterId),
        updateKitchenCenterOptions
      );
      if (response) {
        thunkAPI.dispatch(setMessageSuccess('Update kitchen center successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deleteKitchenCenterThunk = async (params: any, thunkAPI: any) => {
  const { navigate, kitchenCenterId } = params;
  const options = {
    itemsPerPage: 5,
    currentPage: 1,
    keySearchName: '',
  };
  const params_callback = {
    optionParams: options,
    navigate,
  };
  const accessToken = getAccessToken();
  if (accessToken) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    try {
      const response = await axiosClient.delete(ROUTES_API_KITCHEN_CENTERS.DELETE_KITCHEN_CENTER(kitchenCenterId));
      if (response) {
        thunkAPI.dispatch(getAllKitchenCenters(params_callback));
        thunkAPI.dispatch(setMessageSuccess('Deleted kitchen center successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateStatusKitchenCenterThunk = async (params: any, thunkAPI: any) => {
  const { kitchenCenterId, navigate, status, page, rowsPerPage } = params;
  const options = {
    keySearchName: '',
    currentPage: page,
    itemsPerPage: rowsPerPage,
  };

  const paramsCallback: ListParams = {
    optionParams: options,
    navigate,
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.put(ROUTES_API_KITCHEN_CENTERS.UPDATE_STATUS_KITCHEN_CENTER(kitchenCenterId), {
        status: status,
      });
      if (response) {
        await thunkAPI.dispatch(getAllKitchenCenters(paramsCallback));
        thunkAPI.dispatch(setMessageSuccess('Update status kitchen center successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

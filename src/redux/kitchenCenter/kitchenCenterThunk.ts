import { CreateKitchenCenterParams, KitchenCenter, ListParams, ListResponse, MessageResponse } from '@types';
import { axiosClient, axiosFormData } from 'api/axiosClient';
import { ROUTES_API_KITCHEN_CENTER } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_ADMIN_APP } from 'routes/paths';
import { getErrorMessage, handleResponseMessage } from 'utils';
import { getAllKitchenCenters } from './kitchenCenterSlice';

export const getAllKitchenCentersThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<KitchenCenter> = await axiosClient.get(
      ROUTES_API_KITCHEN_CENTER.GET_ALL_KITCHEN_CENTER(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getKitchenCenterDetailThunk = async (params: any, thunkAPI: any) => {
  const { kitchenCenterId, navigate } = params;

  try {
    const response: KitchenCenter = await axiosClient.get(
      ROUTES_API_KITCHEN_CENTER.GET_KITCHEN_CENTER_DETAIL(kitchenCenterId)
    );
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewKitchenCenterThunk = async (params: CreateKitchenCenterParams, thunkAPI: any) => {
  const { navigate } = params;

  try {
    const response: MessageResponse = await axiosFormData.post(
      ROUTES_API_KITCHEN_CENTER.CREATE_KITCHEN_CENTER,
      params.newKitchenCenter
    );
    if (response) {
      navigate(PATH_ADMIN_APP.kitchenCenter.list);
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, params.navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateKitchenCenterThunk = async (params: any, thunkAPI: any) => {
  const { navigate, updateKitchenCenterOptions, kitchenCenterId } = params;

  try {
    const response: MessageResponse = await axiosFormData.put(
      ROUTES_API_KITCHEN_CENTER.UPDATE_KITCHEN_CENTER(kitchenCenterId),
      updateKitchenCenterOptions
    );
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

  try {
    const response: MessageResponse = await axiosClient.delete(
      ROUTES_API_KITCHEN_CENTER.DELETE_KITCHEN_CENTER(kitchenCenterId)
    );
    if (response) {
      thunkAPI.dispatch(getAllKitchenCenters(params_callback));
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

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_KITCHEN_CENTER.UPDATE_STATUS_KITCHEN_CENTER(kitchenCenterId),
      {
        status: status,
      }
    );
    if (response) {
      await thunkAPI.dispatch(getAllKitchenCenters(paramsCallback));
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

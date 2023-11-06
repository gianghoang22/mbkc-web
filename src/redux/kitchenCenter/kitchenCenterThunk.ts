import {
  KitchenCenter,
  KitchenCenterToAdd,
  KitchenCenterToUpdate,
  ListParams,
  ListResponse,
  MessageResponse,
  Params,
  ToUpdateStatus,
} from '@types';
import { axiosClient, axiosFormData } from 'api/axiosClient';
import { ROUTES_API_KITCHEN_CENTER } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_ADMIN_APP } from 'routes/paths';
import { appendData, getErrorMessage, handleResponseMessage } from 'utils';
import { getAllKitchenCenters, getKitchenCenterDetail } from './kitchenCenterSlice';

export const getAllKitchenCentersThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<KitchenCenter> = await axiosClient.get(
      ROUTES_API_KITCHEN_CENTER.GET_ALL_KITCHEN_CENTER(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
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
    const errorResponse = getErrorMessage(error, navigate);
    if (errorResponse?.statusCode === 404) {
      navigate(PATH_ADMIN_APP.kitchenCenter.list);
    }
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewKitchenCenterThunk = async (params: Params<KitchenCenterToAdd>, thunkAPI: any) => {
  const { data, optionParams, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.post(
      ROUTES_API_KITCHEN_CENTER.CREATE_KITCHEN_CENTER,
      formData
    );
    if (response) {
      const paramsCallback: ListParams = {
        optionParams: {
          itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
          currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
        },
        navigate,
      };
      await thunkAPI.dispatch(getAllKitchenCenters(paramsCallback));
      navigate(PATH_ADMIN_APP.kitchenCenter.list);
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateKitchenCenterThunk = async (params: Params<KitchenCenterToUpdate>, thunkAPI: any) => {
  const { data, idParams, pathname, optionParams, navigate } = params;
  const formData = appendData(data);
  try {
    const response: MessageResponse = await axiosFormData.put(
      ROUTES_API_KITCHEN_CENTER.UPDATE_KITCHEN_CENTER(idParams?.kitchenCenterId ? idParams?.kitchenCenterId : 0),
      formData
    );
    if (response) {
      const pathToBack = pathname
        ?.split('/')
        .slice(2)
        .filter((x) => x)[1];
      if (!isNaN(parseInt(pathToBack ? pathToBack : ''))) {
        await thunkAPI.dispatch(getKitchenCenterDetail({ kitchenCenterId: idParams?.kitchenCenterId, navigate }));
      } else {
        const paramsCallback: ListParams = {
          optionParams: {
            itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
            currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
          },
          navigate,
        };
        await thunkAPI.dispatch(getAllKitchenCenters(paramsCallback));
      }
      navigate(pathname !== undefined ? pathname : PATH_ADMIN_APP.kitchenCenter.list);
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateStatusKitchenCenterThunk = async (params: Params<ToUpdateStatus>, thunkAPI: any) => {
  const { data, idParams, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_KITCHEN_CENTER.UPDATE_STATUS_KITCHEN_CENTER(idParams?.kitchenCenterId ? idParams?.kitchenCenterId : 0),
      data
    );
    if (response) {
      const paramsCallback: ListParams = {
        optionParams: {
          searchValue: optionParams?.searchValue ? optionParams.searchValue : '',
          itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
          currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
        },
        navigate,
      };
      await thunkAPI.dispatch(getAllKitchenCenters(paramsCallback));
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteKitchenCenterThunk = async (params: Params<KitchenCenter>, thunkAPI: any) => {
  const { idParams, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.delete(
      ROUTES_API_KITCHEN_CENTER.DELETE_KITCHEN_CENTER(idParams?.kitchenCenterId ? idParams?.kitchenCenterId : 0)
    );
    if (response) {
      const paramsCallback: ListParams = {
        optionParams: {
          searchValue: optionParams?.searchValue ? optionParams.searchValue : '',
          itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
          currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
        },
        navigate,
      };
      navigate(PATH_ADMIN_APP.kitchenCenter.list);
      await thunkAPI.dispatch(getAllKitchenCenters(paramsCallback));
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

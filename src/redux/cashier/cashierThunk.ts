import { Cashier, CashierToUpdate, ListParams, ListResponse, MessageResponse, Params } from '@types';
import { axiosClient, axiosFormData } from 'api/axiosClient';

import { ROUTES_API_CASHIERS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { appendData, getErrorMessage, handleResponseMessage } from 'utils';
import { getAllCashiers } from './cashierSlice';

export const getAllCashiersThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response: ListResponse<Cashier> = await axiosClient.get(ROUTES_API_CASHIERS.GET_ALL_CASHIERS(optionParams));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getCashierDetailThunk = async (params: any, thunkAPI: any) => {
  const { cashierId, navigate } = params;

  try {
    const response: Cashier = await axiosClient.get(ROUTES_API_CASHIERS.GET_CASHIER_DETAIL(cashierId));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    if (errorResponse?.statusCode === 404) {
      navigate(PATH_KITCHEN_CENTER_APP.cashier.list);
    }
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewCashierThunk = async (params: any, thunkAPI: any) => {
  const { navigate, data } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.post(ROUTES_API_CASHIERS.CREATE_CASHIER, formData);
    if (response) {
      navigate(PATH_KITCHEN_CENTER_APP.cashier.list);
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

export const updateCashierThunk = async (params: Params<CashierToUpdate>, thunkAPI: any) => {
  const { data, idParams, pathname, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.put(
      ROUTES_API_CASHIERS.UPDATE_CASHIER(idParams?.cashierId as number),
      formData
    );
    if (response) {
      navigate(pathname !== undefined ? pathname : PATH_KITCHEN_CENTER_APP.cashier.list);
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

export const deleteCashierThunk = async (params: any, thunkAPI: any) => {
  const { cashierId, navigate, page, rowsPerPage } = params;

  const options = {
    itemsPerPage: rowsPerPage,
    currentPage: page,
  };

  const paramsCallback: ListParams = {
    optionParams: options,
    navigate,
  };

  try {
    const response: MessageResponse = await axiosClient.delete(ROUTES_API_CASHIERS.DELETE_CASHIER(cashierId));
    if (response) {
      await thunkAPI.dispatch(getAllCashiers(paramsCallback));
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

export const updateCashierStatusThunk = async (params: any, thunkAPI: any) => {
  const { cashierId, navigate, status, page, rowsPerPage } = params;

  const options = {
    itemsPerPage: rowsPerPage,
    currentPage: page,
  };

  const paramsCallback: ListParams = {
    optionParams: options,
    navigate,
  };

  try {
    const response: MessageResponse = await axiosClient.put(ROUTES_API_CASHIERS.UPDATE_CASHIER_STATUS(cashierId), {
      status: status,
    });
    if (response) {
      await thunkAPI.dispatch(getAllCashiers(paramsCallback));
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

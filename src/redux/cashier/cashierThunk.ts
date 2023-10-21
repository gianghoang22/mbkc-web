import { ListParams } from '@types';
import { axiosClient, axiosFormData } from 'api/axiosClient';

import { ROUTES_API_CASHIERS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { getErrorMessage } from 'utils';
import { getAllCashiers } from './cashierSlice';

export const getAllCashiersThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_CASHIERS.GET_ALL_CASHIERS(optionParams));
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getCashierDetailThunk = async (params: any, thunkAPI: any) => {
  const { cashierId, navigate } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_CASHIERS.GET_CASHIER_DETAIL(cashierId));
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewCashierThunk = async (params: any, thunkAPI: any) => {
  const { navigate, newCashierOptions } = params;

  try {
    const response = await axiosFormData.post(ROUTES_API_CASHIERS.CREATE_CASHIER, newCashierOptions);
    if (response) {
      params.navigate(PATH_KITCHEN_CENTER_APP.cashier.list);
      thunkAPI.dispatch(setMessageSuccess('Created new cashier successfully'));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateCashierThunk = async (params: any, thunkAPI: any) => {
  const { cashierId, navigate, updateCashierOptions } = params;

  try {
    const response = await axiosFormData.put(ROUTES_API_CASHIERS.UPDATE_CASHIER(cashierId), updateCashierOptions);
    if (response) {
      thunkAPI.dispatch(setMessageSuccess('Update cashier successfully'));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
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
    const response = await axiosClient.delete(ROUTES_API_CASHIERS.DELETE_CASHIER(cashierId));
    if (response) {
      await thunkAPI.dispatch(getAllCashiers(paramsCallback));
      thunkAPI.dispatch(setMessageSuccess('Deleted cashier successfully'));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
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
    const response = await axiosClient.put(ROUTES_API_CASHIERS.UPDATE_CASHIER_STATUS(cashierId), {
      status: status,
    });
    if (response) {
      await thunkAPI.dispatch(getAllCashiers(paramsCallback));
      thunkAPI.dispatch(setMessageSuccess('Update status cashier successfully'));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

import { ListParams } from '@types';
import { axiosClient, axiosFormData, setHeaderAuth } from 'api/axiosClient';
import { RoutesApiKeys } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { getAccessToken, getErrorMessage } from 'utils';
import { getAllCashiers } from './cashierSlice';

export const getAllCashiersThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.get(RoutesApiKeys.GET_ALL_CASHIERS(optionParams));
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getCashierDetailThunk = async (params: any, thunkAPI: any) => {
  const { cashierId, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.get(RoutesApiKeys.GET_CASHIER_DETAIL(cashierId));
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewCashierThunk = async (params: any, thunkAPI: any) => {
  const { navigate, newCashierOptions } = params;
  console.log(newCashierOptions);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosFormData.post(RoutesApiKeys.CREATE_CASHIER, newCashierOptions);
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
  }
};

export const updateCashierThunk = async (params: any, thunkAPI: any) => {
  const { cashierId, navigate, updateCashierOptions } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosFormData.put(RoutesApiKeys.UPDATE_CASHIER(cashierId), updateCashierOptions);
      if (response) {
        thunkAPI.dispatch(setMessageSuccess('Update cashier successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deleteCashierThunk = async (params: any, thunkAPI: any) => {
  const { cashierId, navigate, page, rowsPerPage } = params;

  const options = {
    itemsPerPage: rowsPerPage,
    currentPage: page,
  };

  console.log(options);

  const paramsCallback: ListParams = {
    optionParams: options,
    navigate,
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.delete(RoutesApiKeys.DELETE_CASHIER(cashierId));
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

  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.put(RoutesApiKeys.UPDATE_CASHIER_STATUS(cashierId), {
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
  }
};

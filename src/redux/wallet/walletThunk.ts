import { ListParams } from '@types';
import { axiosClient } from 'api/axiosClient';
import { ROUTES_API_BANKING_ACCOUNTS } from 'constants/routesApiKeys';

import { setMessageError } from 'redux/auth/authSlice';
import { getErrorMessage } from 'utils';

export const getAllMoneyExchangeThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_BANKING_ACCOUNTS.GET_ALL_BANKING_ACCOUNTS(optionParams));
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllShipperPaymentThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_BANKING_ACCOUNTS.GET_ALL_BANKING_ACCOUNTS(optionParams));
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    thunkAPI.dispatch(setMessageError(errorMessage));
    return thunkAPI.rejectWithValue(error);
  }
};

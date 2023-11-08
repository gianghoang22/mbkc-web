import { ListParams } from '@types';
import { axiosClient } from 'axiosClient/axiosClient';
import { ROUTES_API_BANKING_ACCOUNTS } from 'constants/routesApiKeys';
import { setMessageError } from 'redux/auth/authSlice';
import { getErrorMessage, handleResponseMessage } from 'utils';

export const getAllShiftsThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_BANKING_ACCOUNTS.GET_ALL_BANKING_ACCOUNTS(optionParams));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

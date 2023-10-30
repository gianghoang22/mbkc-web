import { Configuration, MessageResponse, Params, StoreToCreate } from '@types';
import { axiosClient } from 'api/axiosClient';
import { ROUTES_API_CONFIGURATION } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { getErrorMessage, handleResponseMessage } from 'utils';

export const getSystemConfigurationThunk = async (params: any, thunkAPI: any) => {
  const { navigate } = params;

  try {
    const response: Configuration = await axiosClient.get(ROUTES_API_CONFIGURATION.GET_CONFIGURATION);
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateSystemConfigurationThunk = async (params: Params<StoreToCreate>, thunkAPI: any) => {
  const { navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(ROUTES_API_CONFIGURATION.UPDATE_CONFIGURATION);
    if (response) {
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

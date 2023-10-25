import { axiosClient } from 'api/axiosClient';
import { ROUTES_API_ORDERS } from 'constants/routesApiKeys';
import { setMessageError } from 'redux/auth/authSlice';
import { getErrorMessage, handleResponseMessage } from 'utils';

export const getAllOrdersThunk = async (params: any, thunkAPI: any) => {
  const { navigate } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_ORDERS.GET_ALL_ORDERS);
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getOrderDetailThunk = async (params: any, thunkAPI: any) => {
  const { orderId, navigate } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_ORDERS.GET_ORDER_DETAIL(orderId));
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

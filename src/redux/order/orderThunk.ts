import { ListParams, ListResponse, Order, UserAuth } from '@types';
import { axiosClient } from 'api/axiosClient';
import { Role } from 'common/enum';
import { ROUTES_API_ORDERS } from 'constants/routesApiKeys';
import { setMessageError } from 'redux/auth/authSlice';
import { PATH_CASHIER_APP, PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { getErrorMessage, getUserAuth, handleResponseMessage } from 'utils';

export const getAllOrdersThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response: ListResponse<Order> = await axiosClient.get(ROUTES_API_ORDERS.GET_ALL_ORDERS(optionParams));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getOrderDetailThunk = async (params: any, thunkAPI: any) => {
  const { orderId, navigate } = params;

  try {
    const response: Order = await axiosClient.get(ROUTES_API_ORDERS.GET_ORDER_DETAIL(orderId));
    return response;
  } catch (error: any) {
    const getUserInStorage: UserAuth = getUserAuth();
    const errorResponse = getErrorMessage(error, navigate);
    if (errorResponse?.statusCode === 404) {
      navigate(
        getUserInStorage.roleName === Role.KITCHEN_CENTER_MANAGER
          ? PATH_KITCHEN_CENTER_APP.order.list
          : PATH_CASHIER_APP.order.list
      );
    }
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

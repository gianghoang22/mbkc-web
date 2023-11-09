import { axiosClient, axiosFormData } from 'axiosClient/axiosClient';
import { ListParams, ListResponse, MessageResponse, Params } from 'common/@types';
import { MoneyExchange, PaymentForStoresToCreate, ShipperPayment } from 'common/models';
import { ROUTES_API_MONEY_EXCHANGES, ROUTES_API_SHIPPER_PAYMENTS } from 'constants/routesApiKeys';

import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { appendData, getErrorMessage, handleResponseMessage } from 'utils';
import { getAllMoneyExchange } from './walletSlice';

export const getAllMoneyExchangeThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response: ListResponse<MoneyExchange> = await axiosClient.get(
      ROUTES_API_MONEY_EXCHANGES.GET_ALL_MONEY_EXCHANGES(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllShipperPaymentThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response: ListResponse<ShipperPayment> = await axiosClient.get(
      ROUTES_API_SHIPPER_PAYMENTS.GET_ALL_SHIPPER_PAYMENTS(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createPaymentForStoreThunk = async (params: Params<PaymentForStoresToCreate>, thunkAPI: any) => {
  const { data, optionParams, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.post(
      ROUTES_API_MONEY_EXCHANGES.CREATE_PAYMENT_FOR_STORES,
      formData
    );
    console.log(response);
    if (response) {
      const paramsCallback = {
        optionParams: {
          itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
          currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
        },
        navigate,
      };
      await thunkAPI.dispatch(getAllMoneyExchange(paramsCallback));
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

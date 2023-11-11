import { axiosClient, axiosFormData } from 'axiosClient/axiosClient';
import { ListParams, ListResponse, MessageResponse, Params } from 'common/@types';
import { MoneyExchange, PaymentForStoresToCreate, ShipperPayment, Wallet } from 'common/models';
import { ROUTES_API_MONEY_EXCHANGES, ROUTES_API_SHIPPER_PAYMENTS, ROUTES_API_WALLET } from 'constants/routesApiKeys';

import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { appendData, getErrorMessage, handleResponseMessage } from 'utils';
import { getAllMoneyExchange } from './walletSlice';
import { NavigateFunction } from 'react-router-dom';

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

export const sendMoneyToKitchenCenterThunk = async (navigate: NavigateFunction, thunkAPI: any) => {
  try {
    const response: MessageResponse = await axiosClient.put(ROUTES_API_MONEY_EXCHANGES.SEND_MONEY_TO_KITCHEN_CENTER);
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getWalletInformationThunk = async (navigate: NavigateFunction, thunkAPI: any) => {
  try {
    const response: Wallet = await axiosClient.get(ROUTES_API_WALLET.GET_WALLET_INFORMATION);
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage ? errorMessage?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

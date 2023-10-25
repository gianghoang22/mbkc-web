import { BankingAccount, ListParams, ListResponse, MessageResponse } from '@types';
import { axiosClient, axiosFormData } from 'api/axiosClient';
import { ROUTES_API_BANKING_ACCOUNTS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { getErrorMessage, handleResponseMessage } from 'utils';
import { getAllBankingAccounts } from './bankingAccountSlice';

export const getAllBankingAccountsThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;

  try {
    const response: ListResponse<BankingAccount> = await axiosClient.get(
      ROUTES_API_BANKING_ACCOUNTS.GET_ALL_BANKING_ACCOUNTS(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getBankingAccountDetailThunk = async (params: any, thunkAPI: any) => {
  const { bankingAccountId, navigate } = params;

  try {
    const response: BankingAccount = await axiosClient.get(
      ROUTES_API_BANKING_ACCOUNTS.GET_BANKING_ACCOUNT_DETAIL(bankingAccountId)
    );
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewBankingAccountThunk = async (params: any, thunkAPI: any) => {
  const { navigate, newBankingAccountOptions } = params;

  try {
    const response: MessageResponse = await axiosFormData.post(
      ROUTES_API_BANKING_ACCOUNTS.CREATE_BANKING_ACCOUNT,
      newBankingAccountOptions
    );
    if (response) {
      navigate(PATH_KITCHEN_CENTER_APP.bankingAccount.list);
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateBankingAccountThunk = async (params: any, thunkAPI: any) => {
  const { bankingAccountId, navigate, updateBankingAccountOptions } = params;

  try {
    const response: MessageResponse = await axiosFormData.put(
      ROUTES_API_BANKING_ACCOUNTS.UPDATE_BANKING_ACCOUNT(bankingAccountId),
      updateBankingAccountOptions
    );
    if (response) {
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteBankingAccountThunk = async (params: any, thunkAPI: any) => {
  const { bankingAccountId, navigate, page, rowsPerPage } = params;
  const options = {
    keySearchName: '',
    currentPage: page,
    itemsPerPage: rowsPerPage,
  };

  const paramsCallback: ListParams = {
    optionParams: options,
    navigate,
  };

  try {
    const response: MessageResponse = await axiosClient.delete(
      ROUTES_API_BANKING_ACCOUNTS.DELETE_BANKING_ACCOUNT(bankingAccountId)
    );
    if (response) {
      thunkAPI.dispatch(getAllBankingAccounts(paramsCallback));
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateStatusBankingAccountThunk = async (params: any, thunkAPI: any) => {
  const { bankingAccountId, navigate, status, page, rowsPerPage } = params;
  const options = {
    keySearchName: '',
    currentPage: page,
    itemsPerPage: rowsPerPage,
  };

  const paramsCallback: ListParams = {
    optionParams: options,
    navigate,
  };

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_BANKING_ACCOUNTS.UPDATE_STATUS_BANKING_ACCOUNT(bankingAccountId),
      {
        status: status,
      }
    );
    if (response) {
      await thunkAPI.dispatch(getAllBankingAccounts(paramsCallback));
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

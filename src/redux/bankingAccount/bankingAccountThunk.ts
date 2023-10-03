import { ListParams } from '@types';
import { axiosClient, axiosFormData, setHeaderAuth } from 'api/axiosClient';
import { RoutesApiKeys } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_KITCHEN_CENTER_APP } from 'routes/paths';
import { getAccessToken, getErrorMessage } from 'utils';
import { getAllBankingAccounts } from './bankingAccountSlice';

export const getAllBankingAccountsThunk = async (params: ListParams, thunkAPI: any) => {
  const { navigate, optionParams } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.get(RoutesApiKeys.GET_ALL_BANKING_ACCOUNTS(optionParams));
      console.log(response);
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getBankingAccountDetailThunk = async (params: any, thunkAPI: any) => {
  const { bankingAccountId, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.get(RoutesApiKeys.GET_BANKING_ACCOUNT_DETAIL(bankingAccountId));
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewBankingAccountThunk = async (params: any, thunkAPI: any) => {
  const { navigate, newBankingAccountOptions } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosFormData.post(RoutesApiKeys.CREATE_BANKING_ACCOUNT, newBankingAccountOptions);
      if (response) {
        params.navigate(PATH_KITCHEN_CENTER_APP.bankingAccount.list);
        thunkAPI.dispatch(setMessageSuccess('Created new banking account successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateBankingAccountThunk = async (params: any, thunkAPI: any) => {
  const { bankingAccountId, navigate, updateBankingAccountOptions } = params;
  console.log(updateBankingAccountOptions);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosFormData.put(
        RoutesApiKeys.UPDATE_BANKING_ACCOUNT(bankingAccountId),
        updateBankingAccountOptions
      );
      if (response) {
        thunkAPI.dispatch(setMessageSuccess('Update banking account successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
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

  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.delete(RoutesApiKeys.DELETE_BANKING_ACCOUNT(bankingAccountId));
      if (response) {
        thunkAPI.dispatch(getAllBankingAccounts(paramsCallback));
        thunkAPI.dispatch(setMessageSuccess('Deleted banking account successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
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

  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.put(RoutesApiKeys.UPDATE_STATUS_BANKING_ACCOUNT(bankingAccountId), {
        status: status,
      });
      if (response) {
        await thunkAPI.dispatch(getAllBankingAccounts(paramsCallback));
        thunkAPI.dispatch(setMessageSuccess('Update status banking account successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

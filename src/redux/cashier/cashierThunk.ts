import { axiosClient, setHeaderAuth } from 'api/axiosClient';
import { RoutesApiKeys } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { getAccessToken, getErrorMessage } from 'utils';

export const getAllCashiersThunk = async (params: any, thunkAPI: any) => {
  const { navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.get(RoutesApiKeys.GET_ALL_STORE);
      console.log(response);
      return response;
    } catch (error) {
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
      console.log(response);
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewCashierThunk = async (params: any, thunkAPI: any) => {
  const { navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.post(RoutesApiKeys.CREATE_CASHIER);
      if (response) {
        params.navigate('/dashboard/sport-center');
        // thunkAPI.dispatch(getSportCentersOfOwner());
        thunkAPI.dispatch(setMessageSuccess('Created new sport center successfully'));
      }
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateCashierThunk = async (params: any, thunkAPI: any) => {
  const { cashierId, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.post(RoutesApiKeys.UPDATE_CASHIER(cashierId), params.upadateSportCenter);
      if (response) {
        params.navigate('/dashboard/sport-center');
        thunkAPI.dispatch(setMessageSuccess('Update sport center successfully'));
      }
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deleteCashierThunk = async (params: any, thunkAPI: any) => {
  const { cashierId, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.delete(RoutesApiKeys.DELETE_CASHIER(cashierId));
      if (response) {
        // thunkAPI.dispatch(getSportCentersOfOwner());
        thunkAPI.dispatch(setMessageSuccess('Deleted sport center successfully'));
      }
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

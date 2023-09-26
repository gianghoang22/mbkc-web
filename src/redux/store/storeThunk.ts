import { axiosClient } from 'api/axiosClient';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { getAccessToken, getErrorMessage } from 'utils';

export const getAllStoresThunk = async (_: any, thunkAPI: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      const response = await axiosClient.get('/user/sport-center-of-owner');
      console.log(response);
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getStoreDetailThunk = async (storeId: number, thunkAPI: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      const response = await axiosClient.get(`/sport-center/${storeId}`);
      console.log(response);
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewStoreThunk = async (params: any, thunkAPI: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      const response = await axiosClient.post('/sport-center/', params.newSportCenter);
      if (response) {
        params.navigate('/dashboard/sport-center');
        // thunkAPI.dispatch(getSportCentersOfOwner());
        thunkAPI.dispatch(setMessageSuccess('Created new sport center successfully'));
      }
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateStoreThunk = async (params: any, thunkAPI: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      const response = await axiosClient.post(`/sport-center/${params.storeId}`, params.upadateSportCenter);
      if (response) {
        params.navigate('/dashboard/sport-center');
        thunkAPI.dispatch(setMessageSuccess('Update sport center successfully'));
      }
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deleteStoreThunk = async (params: any, thunkAPI: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    try {
      const response = await axiosClient.delete(`/sport-center/${params.storeId}/${params.sportId}`);
      if (response) {
        // thunkAPI.dispatch(getSportCentersOfOwner());
        thunkAPI.dispatch(setMessageSuccess('Deleted sport center successfully'));
      }
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

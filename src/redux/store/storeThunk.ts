import { DeleteParams, ListParams, ListResponse, Params, Store, StoreToCreate } from '@types';
import { axiosClient, axiosFormData, setHeaderAuth } from 'api/axiosClient';
import { RoutesApiKeys } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_ADMIN_APP } from 'routes/paths';
import { appendData, getAccessToken, getErrorMessage } from 'utils';
import { getAllStores } from './storeSlice';

export const getAllStoresThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;
  console.log(optionParams);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: ListResponse<Store> = await axiosClient.get(RoutesApiKeys.GET_ALL_STORE_PARAMS(optionParams));
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getStoresByKitchenCenterThunk = async (params: any, thunkAPI: any) => {
  const { navigate, kitchenCenterId } = params;
  console.log('kitchenCenterId', kitchenCenterId);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.get(`/kitchencenter/${kitchenCenterId}/stores`);
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getStoresByBrandThunk = async (params: any, thunkAPI: any) => {
  const { navigate, brandId } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.get(`/brand/${brandId}/stores`);
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getStoreDetailThunk = async (params: any, thunkAPI: any) => {
  const { storeId, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.get(RoutesApiKeys.GET_STORE_DETAIL(storeId));
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewStoreThunk = async (params: Params<StoreToCreate>, thunkAPI: any) => {
  console.log('create');
  const { data, navigate } = params;
  const formData = appendData(data);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosFormData.post(RoutesApiKeys.CREATE_STORE, formData);
      if (response) {
        const params = {
          optionParams: {
            itemsPerPage: 5,
            currentPage: 1,
          },
          navigate,
        };
        thunkAPI.dispatch(getAllStores(params));
        navigate(PATH_ADMIN_APP.store.list);
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

export const updateStoreThunk = async (params: any, thunkAPI: any) => {
  console.log(params);
  // const { storeId, navigate } = params;
  const accessToken = getAccessToken();
  // if (accessToken) {
  //   setHeaderAuth(accessToken);
  //   try {
  //     const response = await axiosClient.post(RoutesApiKeys.GET_STORE_DETAIL(storeId));
  //     if (response) {
  //       navigate('/dashboard/sport-center');
  //       thunkAPI.dispatch(setMessageSuccess('Update sport center successfully'));
  //     }
  //     return response;
  //   } catch (error) {
  //     const errorMessage = getErrorMessage(error, navigate);
  //     thunkAPI.dispatch(setMessageError(errorMessage));
  //     return thunkAPI.rejectWithValue(error);
  //   }
  // }
};

export const deleteStoreThunk = async (params: DeleteParams, thunkAPI: any) => {
  const { brandId, storeId, navigate } = params;
  console.log(params);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.delete(`/brand/${brandId}/stores/${storeId}`);
      if (response) {
        const params = {
          optionParams: {
            itemsPerPage: 5,
            currentPage: 1,
          },
          navigate,
        };
        navigate(PATH_ADMIN_APP.store.list);
        thunkAPI.dispatch(getAllStores(params));
        thunkAPI.dispatch(setMessageSuccess('Deleted store successfully'));
      }
      return response;
    } catch (error) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

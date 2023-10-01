import { ListParams, ListResponse, MessageResponse, Params, Store, StoreToCreate, StoreToUpdate } from '@types';
import { axiosClient, axiosFormData, setHeaderAuth } from 'api/axiosClient';
import { RoutesApiKeys } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_ADMIN_APP } from 'routes/paths';
import { appendData, getAccessToken, getErrorMessage } from 'utils';
import { getAllStores, getStoreDetail } from './storeSlice';

export const getAllStoresThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: ListResponse<Store> = await axiosClient.get(RoutesApiKeys.GET_ALL_STORE(optionParams));
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getStoresByKitchenCenterThunk = async (params: any, thunkAPI: any) => {
  const { navigate, kitchenCenterId } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: ListResponse<Store> = await axiosClient.get(
        RoutesApiKeys.GET_STORE_OF_KITCHEN_CENTER(kitchenCenterId)
      );
      return response;
    } catch (error: any) {
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
      const response: ListResponse<Store> = await axiosClient.get(RoutesApiKeys.GET_STORE_OF_BRAND(brandId));
      return response;
    } catch (error: any) {
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
      const response: Store = await axiosClient.get(RoutesApiKeys.GET_STORE_DETAIL(storeId));
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewStoreThunk = async (params: Params<StoreToCreate>, thunkAPI: any) => {
  const { data, navigate } = params;
  const formData = appendData(data);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosFormData.post(RoutesApiKeys.CREATE_STORE, formData);
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
        thunkAPI.dispatch(setMessageSuccess('Created new store successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateStoreThunk = async (params: Params<StoreToUpdate>, thunkAPI: any) => {
  const { data, idParams, pathname, optionParams, navigate } = params;
  const formData = appendData(data);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosFormData.put(
        `/brand/${idParams?.brandId}/stores/${idParams?.storeId}`,
        formData
      );
      if (response) {
        const paramsCallback = {
          optionParams: {
            itemsPerPage: optionParams?.itemsPerPage,
            currentPage: optionParams?.currentPage,
          },
          navigate,
        };
        if (
          pathname
            ?.split('/')
            .slice(2)
            .filter((x) => x)[1] === 'detail'
        ) {
          await thunkAPI.dispatch(getStoreDetail({ storeId: idParams?.storeId, navigate }));
        } else {
          await thunkAPI.dispatch(getAllStores(paramsCallback));
        }
        navigate(pathname !== undefined ? pathname : PATH_ADMIN_APP.store.list);
        thunkAPI.dispatch(setMessageSuccess('Update store successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deleteStoreThunk = async (params: Params<Store>, thunkAPI: any) => {
  const { idParams, optionParams, pathname, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosClient.delete(
        `/brand/${idParams?.brandId}/stores/${idParams?.storeId}`
      );
      if (response) {
        const paramsCallback = {
          optionParams: {
            itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
            currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
          },
          navigate,
        };
        if (
          pathname
            ?.split('/')
            .slice(2)
            .filter((x) => x)[1] === 'detail'
        ) {
          await thunkAPI.dispatch(getStoreDetail({ storeId: idParams?.storeId, navigate }));
        } else {
          await thunkAPI.dispatch(getAllStores(paramsCallback));
        }
        navigate(pathname !== undefined ? pathname : PATH_ADMIN_APP.store.list);
        thunkAPI.dispatch(setMessageSuccess('Deleted store successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

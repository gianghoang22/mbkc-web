import {
  ListParams,
  ListResponse,
  MessageResponse,
  Params,
  Store,
  StoreToConfirm,
  StoreToCreate,
  StoreToUpdate,
  StoreToUpdateStatus,
} from '@types';
import { axiosClient, axiosFormData, setHeaderAuth } from 'api/axiosClient';
import { ROUTES_API_STORES } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';
import { appendData, getAccessToken, getErrorMessage } from 'utils';
import { getAllStores, getStoreDetail } from './storeSlice';

export const getAllStoresThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: ListResponse<Store> = await axiosClient.get(ROUTES_API_STORES.GET_ALL_STORE(optionParams));
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
      const response: Store = await axiosClient.get(ROUTES_API_STORES.GET_STORE_DETAIL(storeId));
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
      const response: MessageResponse = await axiosFormData.post(ROUTES_API_STORES.CREATE_STORE, formData);
      if (response) {
        const params = {
          optionParams: {
            itemsPerPage: 5,
            currentPage: 1,
          },
          navigate,
        };
        thunkAPI.dispatch(getAllStores(params));
        navigate(PATH_BRAND_APP.store.list);
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
  console.log(params);
  // const formData = appendData(data);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosFormData.put(
        ROUTES_API_STORES.UPDATE_STORE_INFORMATION(idParams?.storeId ? idParams?.storeId : 0),
        data
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

export const updateStatusStoreThunk = async (params: Params<StoreToUpdateStatus>, thunkAPI: any) => {
  const { data, idParams, pathname, optionParams, navigate } = params;
  console.log(params);
  // const formData = appendData(data);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosClient.put(
        ROUTES_API_STORES.UPDATE_STORE_STATUS(idParams?.storeId ? idParams?.storeId : 0),
        data
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

export const confirmRegistrationStoreThunk = async (params: Params<StoreToConfirm>, thunkAPI: any) => {
  const { data, idParams, optionParams, pathname, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosClient.put(
        ROUTES_API_STORES.CONFIRM_STORE_REGISTRATION(idParams?.storeId ? idParams?.storeId : 0),
        data
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
        thunkAPI.dispatch(setMessageSuccess('Confirm store successfully'));
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

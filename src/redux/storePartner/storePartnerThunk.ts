import {
  ListParams,
  ListResponse,
  MessageResponse,
  Params,
  StorePartner,
  StorePartnerToCreate,
  StorePartnerToUpdate,
  ToUpdateStatus,
} from '@types';
import { axiosClient, axiosFormData, setHeaderAuth } from 'api/axiosClient';
import { ROUTES_API_STORE_PARTNERS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_ADMIN_APP, PATH_BRAND_APP } from 'routes/paths';
import { appendData, getAccessToken, getErrorMessage } from 'utils';
import { getAllStorePartners, getStorePartnerDetail } from './storePartnerSlice';

export const getAllStorePartnersThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: ListResponse<StorePartner> = await axiosClient.get(
        ROUTES_API_STORE_PARTNERS.GET_ALL_STORE_PARTNER(optionParams)
      );
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getStorePartnerDetailThunk = async (params: any, thunkAPI: any) => {
  const { storeId, partnerId, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: StorePartner = await axiosClient.get(
        ROUTES_API_STORE_PARTNERS.GET_STORE_PARTNER_DETAIL(storeId, partnerId)
      );
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewStorePartnerThunk = async (params: Params<StorePartnerToCreate>, thunkAPI: any) => {
  const { data, navigate } = params;
  const formData = appendData(data);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosFormData.post(
        ROUTES_API_STORE_PARTNERS.CREATE_STORE_PARTNER,
        formData
      );
      if (response) {
        const params = {
          optionParams: {
            itemsPerPage: 5,
            currentPage: 1,
          },
          navigate,
        };
        thunkAPI.dispatch(getAllStorePartners(params));
        navigate(PATH_BRAND_APP.store.list);
        thunkAPI.dispatch(setMessageSuccess('Created new store partner successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateStorePartnerThunk = async (params: Params<StorePartnerToUpdate>, thunkAPI: any) => {
  const { data, idParams, pathname, optionParams, navigate } = params;
  console.log(params);
  const formData = appendData(data);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosFormData.put(
        ROUTES_API_STORE_PARTNERS.UPDATE_STORE_PARTNER(
          idParams?.storeId ? idParams?.storeId : 0,
          idParams?.partnerId ? idParams.partnerId : 0
        ),
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
          await thunkAPI.dispatch(getStorePartnerDetail({ storeId: idParams?.storeId, navigate }));
        } else {
          await thunkAPI.dispatch(getAllStorePartners(paramsCallback));
        }
        navigate(pathname !== undefined ? pathname : PATH_ADMIN_APP.store.list);
        thunkAPI.dispatch(setMessageSuccess('Update store partner successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateStatusStorePartnerThunk = async (params: Params<ToUpdateStatus>, thunkAPI: any) => {
  const { data, idParams, pathname, optionParams, navigate } = params;
  console.log(params);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosClient.put(
        ROUTES_API_STORE_PARTNERS.UPDATE_STORE_PARTNER_STATUS(
          idParams?.storeId ? idParams?.storeId : 0,
          idParams?.partnerId ? idParams.partnerId : 0
        ),
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
        await thunkAPI.dispatch(getAllStorePartners(paramsCallback));
        navigate(pathname !== undefined ? pathname : PATH_ADMIN_APP.store.list);
        thunkAPI.dispatch(setMessageSuccess('Update store partner status successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deleteStorePartnerThunk = async (params: Params<StorePartner>, thunkAPI: any) => {
  const { idParams, optionParams, pathname, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosClient.delete(
        ROUTES_API_STORE_PARTNERS.DELETE_STORE_PARTNER(
          idParams?.storeId ? idParams?.storeId : 0,
          idParams?.partnerId ? idParams.partnerId : 0
        )
      );
      if (response) {
        const paramsCallback = {
          optionParams: {
            itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
            currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
          },
          navigate,
        };
        await thunkAPI.dispatch(getAllStorePartners(paramsCallback));
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

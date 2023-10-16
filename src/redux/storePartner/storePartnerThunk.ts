import {
  ListParams,
  ListResponse,
  MessageResponse,
  Params,
  StorePartner,
  StorePartnerDetail,
  StorePartnerToCreate,
  StorePartnerToUpdate,
  ToUpdateStatus,
} from '@types';
import { axiosClient, setHeaderAuth } from 'api/axiosClient';
import { ROUTES_API_STORE_PARTNERS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_BRAND_APP } from 'routes/paths';
import { getAccessToken, getErrorMessage } from 'utils';
import { getAllStorePartners, getAllStorePartnersByStoreId } from './storePartnerSlice';

export const getAllStorePartnersThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: ListResponse<StorePartnerDetail> = await axiosClient.get(
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
export const getAllStorePartnersByStoreIdThunk = async (params: any, thunkAPI: any) => {
  const { storeId, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: ListResponse<StorePartner> = await axiosClient.get(
        ROUTES_API_STORE_PARTNERS.GET_ALL_STORE_PARTNER_BY_STORE_ID(storeId)
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
      const response: StorePartnerDetail = await axiosClient.get(
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
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosClient.post(ROUTES_API_STORE_PARTNERS.CREATE_STORE_PARTNER, data);
      if (response) {
        const params = {
          optionParams: {
            itemsPerPage: 5,
            currentPage: 1,
          },
          navigate,
        };
        thunkAPI.dispatch(getAllStorePartners(params));
        navigate(PATH_BRAND_APP.storePartner.list);
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
  const { data, idParams, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosClient.put(
        ROUTES_API_STORE_PARTNERS.UPDATE_STORE_PARTNER(
          idParams?.storeId ? idParams?.storeId : 0,
          idParams?.partnerId ? idParams.partnerId : 0
        ),
        data
      );
      if (response) {
        const paramsCallback = {
          storeId: idParams?.storeId ? idParams?.storeId : 0,
          navigate,
        };
        await thunkAPI.dispatch(getAllStorePartnersByStoreId(paramsCallback));
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
  const { data, idParams, navigate } = params;
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
          storeId: idParams?.storeId ? idParams?.storeId : 0,
          navigate,
        };
        await thunkAPI.dispatch(getAllStorePartnersByStoreId(paramsCallback));
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
  const { idParams, navigate } = params;
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
          storeId: idParams?.storeId ? idParams?.storeId : 0,
          navigate,
        };
        await thunkAPI.dispatch(getAllStorePartnersByStoreId(paramsCallback));
        thunkAPI.dispatch(setMessageSuccess('Deleted store partner successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

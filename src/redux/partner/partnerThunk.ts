import { ListParams, Params, Partner, PartnerToCreate, PartnerToUpdate } from '@types';
import { axiosClient, axiosFormData, setHeaderAuth } from 'api/axiosClient';
import { ROUTES_API_PARTNERS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { appendData, getAccessToken, getErrorMessage } from 'utils';
import { getAllPartners } from './partnerSlice';

export const getAllPartnersThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.get(ROUTES_API_PARTNERS.GET_ALL_PARTNER(optionParams));
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getPartnerDetailThunk = async (params: any, thunkAPI: any) => {
  const { partnerId, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.get(ROUTES_API_PARTNERS.GET_PARTNER_DETAIL(partnerId));
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewPartnerThunk = async (params: Params<PartnerToCreate>, thunkAPI: any) => {
  const { data, optionParams, navigate } = params;
  const formData = appendData(data);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosFormData.post(ROUTES_API_PARTNERS.CREATE_PARTNER, formData);
      if (response) {
        const paramsCallback = {
          optionParams: {
            itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
            currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
          },
          navigate,
        };
        await thunkAPI.dispatch(getAllPartners(paramsCallback));
        thunkAPI.dispatch(setMessageSuccess('Created new partner successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updatePartnerThunk = async (params: Params<PartnerToUpdate>, thunkAPI: any) => {
  const { data, idParams, optionParams, navigate } = params;
  console.log(optionParams);
  const formData = appendData(data);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosFormData.put(
        ROUTES_API_PARTNERS.UPDATE_PARTNER(idParams?.partnerId ? idParams.partnerId : 0),
        formData
      );
      if (response) {
        const paramsCallback = {
          optionParams: {
            itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
            currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
          },
          navigate,
        };
        await thunkAPI.dispatch(getAllPartners(paramsCallback));
        thunkAPI.dispatch(setMessageSuccess('Update partner successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deletePartnerThunk = async (params: Params<Partner>, thunkAPI: any) => {
  const { idParams, optionParams, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.delete(
        ROUTES_API_PARTNERS.DELETE_PARTNER(idParams?.partnerId ? idParams.partnerId : 0)
      );
      if (response) {
        const paramsCallback = {
          optionParams: {
            itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
            currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
          },
          navigate,
        };
        await thunkAPI.dispatch(getAllPartners(paramsCallback));
        thunkAPI.dispatch(setMessageSuccess('Deleted partner successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

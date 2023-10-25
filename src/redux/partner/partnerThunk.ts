import { ListParams, MessageResponse, Params, Partner, PartnerToCreate, PartnerToUpdate, ToUpdateStatus } from '@types';
import { axiosClient, axiosFormData } from 'api/axiosClient';
import { ROUTES_API_PARTNERS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { appendData, getErrorMessage, handleResponseMessage } from 'utils';
import { getAllPartners } from './partnerSlice';

export const getAllPartnersThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_PARTNERS.GET_ALL_PARTNER(optionParams));
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getPartnerDetailThunk = async (params: any, thunkAPI: any) => {
  const { partnerId, navigate } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_PARTNERS.GET_PARTNER_DETAIL(partnerId));
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewPartnerThunk = async (params: Params<PartnerToCreate>, thunkAPI: any) => {
  const { data, optionParams, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.post(ROUTES_API_PARTNERS.CREATE_PARTNER, formData);
    if (response) {
      const paramsCallback = {
        optionParams: {
          itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
          currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
        },
        navigate,
      };
      await thunkAPI.dispatch(getAllPartners(paramsCallback));
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

export const updatePartnerThunk = async (params: Params<PartnerToUpdate>, thunkAPI: any) => {
  const { data, idParams, optionParams, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.put(
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

export const updateStatusPartnerThunk = async (params: Params<ToUpdateStatus>, thunkAPI: any) => {
  console.log(params);
  const { data, idParams, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_PARTNERS.UPDATE_STATUS_PARTNER(idParams?.partnerId ? idParams?.partnerId : 0),
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
      await thunkAPI.dispatch(getAllPartners(paramsCallback));
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

export const deletePartnerThunk = async (params: Params<Partner>, thunkAPI: any) => {
  const { idParams, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.delete(
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

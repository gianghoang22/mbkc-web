import {
  MessageResponse,
  Params,
  PartnerProduct,
  PartnerProductToCreate,
  PartnerProductToUpdate,
  ToUpdateStatus,
} from '@types';
import { axiosClient } from 'api/axiosClient';
import { ROUTES_API_PARTNER_PRODUCTS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_BRAND_APP } from 'routes/paths';
import { getErrorMessage, handleResponseMessage } from 'utils';
import { getAllPartnerProducts, getPartnerProductDetail } from './partnerProductSlice';

export const getAllPartnerProductsThunk = async (params: any, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_PARTNER_PRODUCTS.GET_ALL_PARTNER_PRODUCT(optionParams));
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getPartnerProductDetailThunk = async (params: any, thunkAPI: any) => {
  const { productId, partnerId, storeId, navigate } = params;

  try {
    const response = await axiosClient.get(
      ROUTES_API_PARTNER_PRODUCTS.GET_PARTNER_PRODUCT_DETAIL(productId, partnerId, storeId)
    );
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewPartnerProductThunk = async (params: Params<PartnerProductToCreate>, thunkAPI: any) => {
  const { data, optionParams, navigate } = params;
  try {
    const response: MessageResponse = await axiosClient.post(ROUTES_API_PARTNER_PRODUCTS.CREATE_PARTNER_PRODUCT, data);
    if (response) {
      const paramsCallback = {
        optionParams: {
          itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
          currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
        },
        navigate,
      };
      thunkAPI.dispatch(getAllPartnerProducts(paramsCallback));
      navigate(PATH_BRAND_APP.partnerProduct.list);
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

export const updatePartnerProductThunk = async (params: Params<PartnerProductToUpdate>, thunkAPI: any) => {
  const { data, idParams, pathname, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_PARTNER_PRODUCTS.UPDATE_PARTNER_PRODUCT(
        idParams?.productId ? idParams?.productId : 0,
        idParams?.partnerId ? idParams?.partnerId : 0,
        idParams?.storeId ? idParams?.storeId : 0
      ),
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
      const pathToBack = pathname
        ?.split('/')
        .slice(2)
        .filter((x) => x)[1];
      if (!isNaN(parseInt(pathToBack ? pathToBack : ''))) {
        await thunkAPI.dispatch(getPartnerProductDetail({ productId: idParams?.productId, navigate }));
      } else {
        await thunkAPI.dispatch(getAllPartnerProducts(paramsCallback));
      }
      navigate(pathname !== undefined ? pathname : PATH_BRAND_APP.product.list);
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

export const updateStatusPartnerProductThunk = async (params: Params<ToUpdateStatus>, thunkAPI: any) => {
  const { data, idParams, pathname, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_PARTNER_PRODUCTS.UPDATE_PARTNER_PRODUCT_STATUS(
        idParams?.productId ? idParams?.productId : 0,
        idParams?.partnerId ? idParams?.partnerId : 0,
        idParams?.storeId ? idParams?.storeId : 0
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
      await thunkAPI.dispatch(getAllPartnerProducts(paramsCallback));
      navigate(pathname !== undefined ? pathname : PATH_BRAND_APP.partnerProduct.list);
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

export const deletePartnerProductThunk = async (params: Params<PartnerProduct>, thunkAPI: any) => {
  const { idParams, optionParams, pathname, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.delete(
      ROUTES_API_PARTNER_PRODUCTS.DELETE_PARTNER_PRODUCT(
        idParams?.productId ? idParams?.productId : 0,
        idParams?.partnerId ? idParams?.partnerId : 0,
        idParams?.storeId ? idParams?.storeId : 0
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
      const pathToBack = pathname
        ?.split('/')
        .slice(2)
        .filter((x) => x)[1];
      if (!isNaN(parseInt(pathToBack ? pathToBack : ''))) {
        await thunkAPI.dispatch(getAllPartnerProducts(paramsCallback));
      } else {
        await thunkAPI.dispatch(getAllPartnerProducts(paramsCallback));
      }
      await thunkAPI.dispatch(getAllPartnerProducts(paramsCallback));
      navigate(PATH_BRAND_APP.product.list);
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

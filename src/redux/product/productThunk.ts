import { MessageResponse, Params, Product, ProductToCreateParams, ProductToUpdate, ToUpdateStatus } from '@types';
import { axiosClient, axiosFormData } from 'api/axiosClient';
import { ROUTES_API_PRODUCTS } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_BRAND_APP } from 'routes/paths';
import { appendData, getErrorMessage, handleResponseMessage } from 'utils';
import { getAllProducts, getProductDetail } from './productSlice';

export const getAllProductsThunk = async (params: any, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_PRODUCTS.GET_ALL_PRODUCT(optionParams));
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllProductsParentThunk = async (params: any, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_PRODUCTS.GET_ALL_PRODUCT(optionParams));
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getProductDetailThunk = async (params: any, thunkAPI: any) => {
  const { productId, navigate } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_PRODUCTS.GET_PRODUCT_DETAIL(productId));
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getProductParentDetailThunk = async (params: any, thunkAPI: any) => {
  const { productId, navigate } = params;

  try {
    const response = await axiosClient.get(ROUTES_API_PRODUCTS.GET_PRODUCT_DETAIL(productId));
    return response;
  } catch (error: any) {
    const errorMessage = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorMessage);
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewProductThunk = async (params: Params<ProductToCreateParams>, thunkAPI: any) => {
  const { data, optionParams, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.post(ROUTES_API_PRODUCTS.CREATE_PRODUCT, formData);
    if (response) {
      const paramsCallback = {
        optionParams: {
          itemsPerPage: optionParams?.itemsPerPage,
          currentPage: optionParams?.currentPage,
        },
        navigate,
      };
      thunkAPI.dispatch(getAllProducts(paramsCallback));
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

export const updateProductThunk = async (params: Params<ProductToUpdate>, thunkAPI: any) => {
  const { data, idParams, pathname, optionParams, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.put(
      ROUTES_API_PRODUCTS.UPDATE_PRODUCT(idParams?.productId ? idParams?.productId : 0),
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
      const pathToBack = pathname
        ?.split('/')
        .slice(2)
        .filter((x) => x)[1];
      if (!isNaN(parseInt(pathToBack ? pathToBack : ''))) {
        await thunkAPI.dispatch(getProductDetail({ productId: idParams?.productId, navigate }));
      } else {
        await thunkAPI.dispatch(getAllProducts(paramsCallback));
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

export const updateStatusProductThunk = async (params: Params<ToUpdateStatus>, thunkAPI: any) => {
  const { data, idParams, pathname, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.put(
      ROUTES_API_PRODUCTS.UPDATE_PRODUCT_STATUS(idParams?.productId ? idParams?.productId : 0),
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

      await thunkAPI.dispatch(getAllProducts(paramsCallback));
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

export const deleteProductThunk = async (params: Params<Product>, thunkAPI: any) => {
  const { idParams, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.delete(
      ROUTES_API_PRODUCTS.DELETE_PRODUCT(idParams?.productId ? idParams?.productId : 0)
    );
    if (response) {
      const paramsCallback = {
        optionParams: {
          itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
          currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
        },
        navigate,
      };
      await thunkAPI.dispatch(getAllProducts(paramsCallback));
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

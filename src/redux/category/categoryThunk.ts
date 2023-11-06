import {
  AddExtraCategory,
  Category,
  CategoryToCreate,
  CategoryToUpdate,
  CategoryType,
  ListParams,
  ListResponse,
  MessageResponse,
  Params,
} from '@types';
import { axiosClient, axiosFormData } from 'api/axiosClient';
import { ROUTES_API_CATEGORIES } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_BRAND_APP } from 'routes/paths';
import { appendData, getErrorMessage, handleResponseMessage } from 'utils';
import { getAllCategories, getAllExtraCategoriesInCategory, getCategoryDetail } from './categorySlice';

export const getAllCategoriesThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<Category> = await axiosClient.get(
      ROUTES_API_CATEGORIES.GET_ALL_CATEGORY(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllExtraCategoriesInCategoryThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;

  try {
    const response: ListResponse<Category> = await axiosClient.get(
      ROUTES_API_CATEGORIES.GET_EXTRA_CATEGORY_OF_CATEGORY(optionParams)
    );
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    if (errorResponse?.statusCode === 404) {
      navigate(PATH_BRAND_APP.store.list);
    }
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const getCategoryDetailThunk = async (params: any, thunkAPI: any) => {
  const { categoryId, navigate } = params;

  try {
    const response: Category = await axiosClient.get(ROUTES_API_CATEGORIES.GET_CATEGORY_DETAIL(categoryId));
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const createNewCategoryThunk = async (params: Params<CategoryToCreate>, thunkAPI: any) => {
  const { data, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.post(ROUTES_API_CATEGORIES.CREATE_CATEGORY, formData);
    if (response) {
      navigate(data?.type === CategoryType.NORMAL ? PATH_BRAND_APP.category.list : PATH_BRAND_APP.category.extraList);
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const addExtraCategoryThunk = async (params: Params<AddExtraCategory>, thunkAPI: any) => {
  const { data, idParams, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.post(
      ROUTES_API_CATEGORIES.ADD_EXTRA_CATEGORY(idParams?.categoryId ? idParams?.categoryId : 0),
      data
    );
    if (response) {
      const paramsCallback: ListParams = {
        optionParams: {
          idCategory: idParams?.categoryId,
          itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
          currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
        },
        navigate,
      };
      await thunkAPI.dispatch(getAllExtraCategoriesInCategory(paramsCallback));
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const updateCategoryThunk = async (params: Params<CategoryToUpdate>, thunkAPI: any) => {
  const { data, idParams, optionParams, pathname, navigate } = params;
  const formData = appendData(data);

  try {
    const response: MessageResponse = await axiosFormData.put(
      ROUTES_API_CATEGORIES.UPDATE_CATEGORY(idParams?.categoryId ? idParams?.categoryId : 0),
      formData
    );
    if (response) {
      const pathToBack = pathname
        ?.split('/')
        .slice(2)
        .filter((x) => x)[1];
      if (!isNaN(parseInt(pathToBack ? pathToBack : ''))) {
        await thunkAPI.dispatch(getCategoryDetail({ categoryId: idParams?.categoryId, navigate }));
      } else {
        const paramsCallback: ListParams = {
          optionParams: {
            type: optionParams?.type,
            searchValue: optionParams?.searchValue ? optionParams?.searchValue : '',
            itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
            currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
          },
          navigate,
        };
        await thunkAPI.dispatch(getAllCategories(paramsCallback));
      }
      navigate(pathname !== undefined ? pathname : PATH_BRAND_APP.category.list);
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

export const deleteCategoryThunk = async (params: Params<Category>, thunkAPI: any) => {
  const { idParams, optionParams, navigate } = params;

  try {
    const response: MessageResponse = await axiosClient.delete(
      ROUTES_API_CATEGORIES.DELETE_CATEGORY(idParams?.categoryId ? idParams?.categoryId : 0)
    );
    if (response) {
      const paramsCallback: ListParams = {
        optionParams: {
          type: optionParams?.type,
          searchValue: optionParams?.searchValue ? optionParams?.searchValue : '',
          itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
          currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
        },
        navigate,
      };
      await thunkAPI.dispatch(getAllCategories(paramsCallback));
      navigate(
        optionParams?.type === CategoryType.NORMAL ? PATH_BRAND_APP.category.list : PATH_BRAND_APP.category.extraList
      );
      const message = handleResponseMessage(response.message);
      thunkAPI.dispatch(setMessageSuccess(message));
    }
    return response;
  } catch (error: any) {
    const errorResponse = getErrorMessage(error, navigate);
    const messageMultiLang = handleResponseMessage(errorResponse ? errorResponse?.errorMessage : '');
    thunkAPI.dispatch(setMessageError(messageMultiLang));
    return thunkAPI.rejectWithValue(error);
  }
};

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
import { axiosClient, axiosFormData, setHeaderAuth } from 'api/axiosClient';
import { ROUTES_API_CATEGORIES } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_BRAND_APP } from 'routes/paths';
import { appendData, getAccessToken, getErrorMessage } from 'utils';
import { getAllCategories, getAllExtraCategoriesInCategory, getCategoryDetail } from './categorySlice';

export const getAllCategoriesThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: ListResponse<Category> = await axiosClient.get(
        ROUTES_API_CATEGORIES.GET_ALL_CATEGORY(optionParams)
      );
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getAllExtraCategoriesInCategoryThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: ListResponse<Category> = await axiosClient.get(
        ROUTES_API_CATEGORIES.GET_EXTRA_CATEGORY_OF_CATEGORY(optionParams)
      );
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getCategoryDetailThunk = async (params: any, thunkAPI: any) => {
  const { categoryId, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: Category = await axiosClient.get(ROUTES_API_CATEGORIES.GET_CATEGORY_DETAIL(categoryId));
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const createNewCategoryThunk = async (params: Params<CategoryToCreate>, thunkAPI: any) => {
  const { data, navigate } = params;
  const formData = appendData(data);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosFormData.post(ROUTES_API_CATEGORIES.CREATE_CATEGORY, formData);
      if (response) {
        navigate(data?.type === CategoryType.NORMAL ? PATH_BRAND_APP.category.list : PATH_BRAND_APP.category.extraList);
        thunkAPI.dispatch(setMessageSuccess('Created new category successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const addExtraCategoryThunk = async (params: Params<AddExtraCategory>, thunkAPI: any) => {
  const { data, idParams, optionParams, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosClient.post(
        ROUTES_API_CATEGORIES.ADD_EXTRA_CATEGORY(idParams?.categoryId ? idParams?.categoryId : 0),
        data
      );
      if (response) {
        const paramsCallback = {
          optionParams: {
            idCategory: idParams?.categoryId,
            itemsPerPage: optionParams?.itemsPerPage ? optionParams?.itemsPerPage : 5,
            currentPage: optionParams?.currentPage ? optionParams?.currentPage : 1,
          },
          navigate,
        };
        await thunkAPI.dispatch(getAllExtraCategoriesInCategory(paramsCallback));
        thunkAPI.dispatch(setMessageSuccess('Add extra category successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateCategoryThunk = async (params: Params<CategoryToUpdate>, thunkAPI: any) => {
  const { data, idParams, optionParams, pathname, navigate } = params;
  const formData = appendData(data);
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosFormData.put(
        ROUTES_API_CATEGORIES.UPDATE_CATEGORY(idParams?.categoryId ? idParams?.categoryId : 0),
        formData
      );
      if (response) {
        const paramsCallback = {
          optionParams: {
            type: optionParams?.type,
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
          await thunkAPI.dispatch(getCategoryDetail({ categoryId: idParams?.categoryId, navigate }));
        } else {
          await thunkAPI.dispatch(getAllCategories(paramsCallback));
        }
        navigate(pathname !== undefined ? pathname : PATH_BRAND_APP.category.list);
        thunkAPI.dispatch(setMessageSuccess('Update category successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deleteCategoryThunk = async (params: Params<Category>, thunkAPI: any) => {
  const { idParams, optionParams, pathname, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: MessageResponse = await axiosClient.delete(
        ROUTES_API_CATEGORIES.DELETE_CATEGORY(idParams?.categoryId ? idParams?.categoryId : 0)
      );
      if (response) {
        const paramsCallback = {
          optionParams: {
            type: optionParams?.type,
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
          await thunkAPI.dispatch(getCategoryDetail({ categoryId: idParams?.categoryId, navigate }));
        } else {
          await thunkAPI.dispatch(getAllCategories(paramsCallback));
        }
        navigate(pathname !== undefined ? pathname : PATH_BRAND_APP.category.list);
        thunkAPI.dispatch(setMessageSuccess('Deleted category successfully'));
      }
      return response;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

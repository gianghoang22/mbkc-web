import { Category, CategoryToCreate, CategoryType, ListParams, ListResponse, MessageResponse, Params } from '@types';
import { axiosClient, axiosFormData, setHeaderAuth } from 'api/axiosClient';
import { RoutesApiKeys } from 'constants/routesApiKeys';
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice';
import { PATH_BRAND_APP } from 'routes/paths';
import { appendData, getAccessToken, getErrorMessage } from 'utils';

export const getAllCategoriesThunk = async (params: ListParams, thunkAPI: any) => {
  const { optionParams, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response: ListResponse<Category> = await axiosClient.get(RoutesApiKeys.GET_ALL_CATEGORY(optionParams));
      console.log(response);
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
      const response: Category = await axiosClient.get(RoutesApiKeys.GET_CATEGORY_DETAIL(categoryId));
      console.log(response);
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
      const response: MessageResponse = await axiosFormData.post(RoutesApiKeys.CREATE_CATEGORY, formData);
      if (response) {
        navigate(data?.type === CategoryType.NORMAL ? PATH_BRAND_APP.category.list : PATH_BRAND_APP.category.extraList);
        thunkAPI.dispatch(setMessageSuccess('Created new category successfully'));
      }
      return response;
    } catch (error: any) {
      console.log(error);
      const errorMessage = getErrorMessage(error, navigate);
      thunkAPI.dispatch(setMessageError(errorMessage));
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateCategoryThunk = async (params: any, thunkAPI: any) => {
  const { categoryId, navigate } = params;
  const accessToken = getAccessToken();
  if (accessToken) {
    setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.post(RoutesApiKeys.UPDATE_CATEGORY(categoryId), params.upadateSportCenter);
      if (response) {
        params.navigate('/dashboard/sport-center');
        thunkAPI.dispatch(setMessageSuccess('Update sport center successfully'));
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
      const response = await axiosClient.delete(RoutesApiKeys.DELETE_CATEGORY(1));
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
          // await thunkAPI.dispatch(getStoreDetail({ storeId: idParams?.storeId, navigate }));
        } else {
          // await thunkAPI.dispatch(getAllCa(paramsCallback));
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

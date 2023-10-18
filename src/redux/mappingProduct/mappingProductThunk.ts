import { MessageResponse, Params, ProductToCreateParams, ProductToUpdate } from '@types'
import { axiosClient, setHeaderAuth } from 'api/axiosClient'
import { ROUTES_API_MAPPING_PRODUCTS } from 'constants/routesApiKeys'
import { setMessageError, setMessageSuccess } from 'redux/auth/authSlice'
import { PATH_BRAND_APP } from 'routes/paths'
import { getAccessToken, getErrorMessage } from 'utils'
import { getAllMappingProducts, getMappingProductDetail } from './mappingProductSlice'

export const getAllMappingProductsThunk = async (params: any, thunkAPI: any) => {
  const { optionParams, navigate } = params
  const accessToken = getAccessToken()
  if (accessToken) {
    setHeaderAuth(accessToken)
    try {
      const response = await axiosClient.get(ROUTES_API_MAPPING_PRODUCTS.GET_ALL_MAPPING_PRODUCT(optionParams))
      return response
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate)
      thunkAPI.dispatch(setMessageError(errorMessage))
      return thunkAPI.rejectWithValue(error)
    }
  }
}

export const getMappingProductDetailThunk = async (params: any, thunkAPI: any) => {
  const { productId, partnerId, storeId, navigate } = params
  const accessToken = getAccessToken()
  if (accessToken) {
    setHeaderAuth(accessToken)
    try {
      const response = await axiosClient.get(
        ROUTES_API_MAPPING_PRODUCTS.GET_MAPPING_PRODUCT_DETAIL(productId, partnerId, storeId)
      )
      return response
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate)
      thunkAPI.dispatch(setMessageError(errorMessage))
      return thunkAPI.rejectWithValue(error)
    }
  }
}

export const createNewMappingProductThunk = async (params: Params<ProductToCreateParams>, thunkAPI: any) => {
  const { data, optionParams, navigate } = params
  const accessToken = getAccessToken()
  if (accessToken) {
    setHeaderAuth(accessToken)
    try {
      const response: MessageResponse = await axiosClient.post(ROUTES_API_MAPPING_PRODUCTS.CREATE_MAPPING_PRODUCT, data)
      if (response) {
        const paramsCallback = {
          optionParams: {
            itemsPerPage: optionParams?.itemsPerPage,
            currentPage: optionParams?.currentPage,
          },
          navigate,
        }
        thunkAPI.dispatch(getAllMappingProducts(paramsCallback))
        navigate(PATH_BRAND_APP.product.list)
        thunkAPI.dispatch(setMessageSuccess('Created new product successfully'))
      }
      return response
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate)
      thunkAPI.dispatch(setMessageError(errorMessage))
      return thunkAPI.rejectWithValue(error)
    }
  }
}

export const updateMappingProductThunk = async (params: Params<ProductToUpdate>, thunkAPI: any) => {
  const { data, idParams, pathname, optionParams, navigate } = params
  const accessToken = getAccessToken()
  if (accessToken) {
    setHeaderAuth(accessToken)
    try {
      const response: MessageResponse = await axiosClient.put(
        ROUTES_API_MAPPING_PRODUCTS.UPDATE_MAPPING_PRODUCT(
          idParams?.productId ? idParams?.productId : 0,
          idParams?.partnerId ? idParams?.partnerId : 0,
          idParams?.storeId ? idParams?.storeId : 0
        ),
        data
      )
      if (response) {
        const paramsCallback = {
          optionParams: {
            itemsPerPage: optionParams?.itemsPerPage,
            currentPage: optionParams?.currentPage,
          },
          navigate,
        }
        if (
          pathname
            ?.split('/')
            .slice(2)
            .filter((x) => x)[1] === 'detail'
        ) {
          await thunkAPI.dispatch(getMappingProductDetail({ productId: idParams?.productId, navigate }))
        } else {
          await thunkAPI.dispatch(getAllMappingProducts(paramsCallback))
        }
        navigate(pathname !== undefined ? pathname : PATH_BRAND_APP.product.list)
        thunkAPI.dispatch(setMessageSuccess('Update mapping product successfully'))
      }
      return response
    } catch (error: any) {
      const errorMessage = getErrorMessage(error, navigate)
      thunkAPI.dispatch(setMessageError(errorMessage))
      return thunkAPI.rejectWithValue(error)
    }
  }
}

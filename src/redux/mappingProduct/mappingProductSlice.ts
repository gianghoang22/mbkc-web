import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MappingProduct } from '@types'
import { StorageKeys } from 'constants/storageKeys'
import { getIsEditing, setLocalStorage } from 'utils'
import {
  createNewMappingProductThunk,
  getAllMappingProductsThunk,
  getMappingProductDetailThunk,
  updateMappingProductThunk,
} from './mappingProductThunk'

interface MappingProductState {
  isEditing: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  mappingProducts: MappingProduct[]
  mappingProduct: MappingProduct | null
  totalPage: number
  numberItems: number
}

const getIsEditingInStorage = getIsEditing(StorageKeys.IS_EDIT_MAPPING_PRODUCT)
  ? getIsEditing(StorageKeys.IS_EDIT_MAPPING_PRODUCT)
  : false

const initialState: MappingProductState = {
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  mappingProducts: [],
  mappingProduct: null,
  totalPage: 0,
  numberItems: 5,
}

export const createNewMappingProduct = createAsyncThunk(
  'mapping-product/create-mapping-product',
  createNewMappingProductThunk
)
export const getAllMappingProducts = createAsyncThunk(
  'mapping-product/get-all-mapping-products',
  getAllMappingProductsThunk
)
export const getMappingProductDetail = createAsyncThunk(
  'mapping-product/get-mapping-product-detail',
  getMappingProductDetailThunk
)
export const updateMappingProduct = createAsyncThunk(
  'mapping-product/update-mapping-product',
  updateMappingProductThunk
)

const mappingProductSlice = createSlice({
  name: 'mappingProduct',
  initialState,
  reducers: {
    setAddMappingProduct: (state) => {
      state.isEditing = false
      setLocalStorage(StorageKeys.IS_EDIT_MAPPING_PRODUCT, false)
    },
    setEditMappingProduct: (state, action) => {
      state.isEditing = true
      state.mappingProduct = action.payload
      setLocalStorage(StorageKeys.IS_EDIT_MAPPING_PRODUCT, true)
    },
    getMappingProductDetail_local: (state, action) => {
      state.mappingProduct = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewMappingProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNewMappingProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(createNewMappingProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(getAllMappingProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllMappingProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.mappingProducts = [...action.payload?.mappingProducts]
        state.totalPage = action.payload?.totalPage
        state.numberItems = action.payload?.numberItems
      })
      .addCase(getAllMappingProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(getMappingProductDetail.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMappingProductDetail.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
        state.mappingProduct = { ...action.payload }
      })
      .addCase(getMappingProductDetail.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(updateMappingProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMappingProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(updateMappingProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
  },
})

export const { setAddMappingProduct, setEditMappingProduct, getMappingProductDetail_local } =
  mappingProductSlice.actions
const mappingProductReducer = mappingProductSlice.reducer

export default mappingProductReducer

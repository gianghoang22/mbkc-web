import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Order } from '@types'
import orders from 'mock/orders'
import { getAllOrdersThunk, getOrderDetailThunk } from './orderThunk'

interface OrderState {
  isEditing: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  orders: Order[]
  order: Order | null
}

const initialState: OrderState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  orders: orders,
  order: null,
}

export const getAllOrders = createAsyncThunk('product/get-all-products', getAllOrdersThunk)
export const getProductDetail = createAsyncThunk('product/get-product-detail', getOrderDetailThunk)

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductDetail_local: (state, action) => {
      state.order = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
      .addCase(getProductDetail.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
      })
  },
})

export const { getProductDetail_local } = productSlice.actions
const productReducer = productSlice.reducer

export default productReducer

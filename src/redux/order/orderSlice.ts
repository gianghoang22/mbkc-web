import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Order } from '@types';
import { getAllOrdersThunk, getOrderDetailThunk } from './orderThunk';

interface OrderState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  orders: Order[];
  order: Order | null;
  numberItems: number;
  totalPages: number;
}

const initialState: OrderState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  orders: [],
  order: null,
  numberItems: 0,
  totalPages: 0,
};

export const getAllOrders = createAsyncThunk('product/get-all-orders', getAllOrdersThunk);
export const getOrderDetail = createAsyncThunk('product/get-order-detail', getOrderDetailThunk);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductDetail_local: (state, action) => {
      state.order = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = [...action.payload?.orders];
        state.totalPages = action.payload?.totalPages;
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getOrderDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { getProductDetail_local } = productSlice.actions;
const productReducer = productSlice.reducer;

export default productReducer;

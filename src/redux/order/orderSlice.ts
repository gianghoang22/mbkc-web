import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Order } from 'common/models';
import {
  cancelOrderThunk,
  changeOrderToReadyDeliveryThunk,
  changeOrderToReadyThunk,
  confirmOrderToCompletedThunk,
  getAllOrdersThunk,
  getOrderDetailThunk,
} from './orderThunk';

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

export const getAllOrders = createAsyncThunk('order/get-all-orders', getAllOrdersThunk);
export const getOrderDetail = createAsyncThunk('order/get-order-detail', getOrderDetailThunk);
export const confirmOrderToCompleted = createAsyncThunk(
  'order/confirm-order-to-completed',
  confirmOrderToCompletedThunk
);
export const changeOrderToReady = createAsyncThunk('order/change-order-to-ready', changeOrderToReadyThunk);
export const changeOrderToReadyDelivery = createAsyncThunk(
  'order/change-order-to-ready-delivery',
  changeOrderToReadyDeliveryThunk
);
export const cancelOrder = createAsyncThunk('order/cancel-order', cancelOrderThunk);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
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
      .addCase(getAllOrders.rejected, (state) => {
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
      })
      .addCase(changeOrderToReady.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeOrderToReady.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(changeOrderToReady.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(changeOrderToReadyDelivery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeOrderToReadyDelivery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(changeOrderToReadyDelivery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(confirmOrderToCompleted.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmOrderToCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(confirmOrderToCompleted.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

// export const { } = orderSlice.actions;
const productReducer = orderSlice.reducer;

export default productReducer;

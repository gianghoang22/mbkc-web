import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MoneyExchange, ShipperPayment } from 'common/models';
import {
  createPaymentForStoreThunk,
  getAllMoneyExchangeThunk,
  getAllShipperPaymentThunk,
  sendMoneyToKitchenCenterThunk,
} from './walletThunk';

interface BankingAccountState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  moneyExchanges: MoneyExchange[];
  moneyExchange: MoneyExchange | null;
  shipperPayments: ShipperPayment[];
  shipperPayment: ShipperPayment | null;
  numberItems: number;
}

const initialState: BankingAccountState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  moneyExchanges: [],
  moneyExchange: null,
  shipperPayments: [],
  shipperPayment: null,
  numberItems: 0,
};

export const getAllMoneyExchange = createAsyncThunk('money-exchange/get-all-money-exchanges', getAllMoneyExchangeThunk);
export const getAllShipperPayment = createAsyncThunk(
  'shipper-payment/get-all-shipper-payment',
  getAllShipperPaymentThunk
);
export const createPaymentForStore = createAsyncThunk(
  'money-exchange/create-payment-for-store',
  createPaymentForStoreThunk
);
export const sendMoneyToKitchenCenter = createAsyncThunk(
  'money-exchange/send-money-to-kitchen-center',
  sendMoneyToKitchenCenterThunk
);

const WalletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllMoneyExchange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMoneyExchange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.moneyExchanges = [...action.payload?.moneyExchanges];
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllMoneyExchange.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllShipperPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllShipperPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.shipperPayments = [...action.payload?.shipperPayments];
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllShipperPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(createPaymentForStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPaymentForStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createPaymentForStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(sendMoneyToKitchenCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMoneyToKitchenCenter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(sendMoneyToKitchenCenter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

const WalletReducer = WalletSlice.reducer;

export default WalletReducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MoneyExchange, ShipperPayment } from 'common/models';
import { createPaymentForStoreThunk, getAllMoneyExchangeThunk, getAllShipperPaymentThunk } from './walletThunk';
import shipperPayment from 'mock/shipperPayment';

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
  shipperPayments: shipperPayment,
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

const BankingAccountSlice = createSlice({
  name: 'money-exchange',
  initialState,
  reducers: {
    getBankingAccountDetail_local: (state, action) => {
      state.moneyExchange = action.payload;
    },
  },
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
        state.moneyExchanges = [...action.payload?.moneyExchanges];
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
      });
  },
});

export const { getBankingAccountDetail_local } = BankingAccountSlice.actions;
const BankingAccountReducer = BankingAccountSlice.reducer;

export default BankingAccountReducer;

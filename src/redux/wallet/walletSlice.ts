import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MoneyExchange } from '@types';
import { getAllMoneyExchangeThunk } from './walletThunk';
import moneyExchange from 'mock/moneyExchange';

interface BankingAccountState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  moneyExchanges: MoneyExchange[];
  moneyExchange: MoneyExchange | null;
}

const initialState: BankingAccountState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  moneyExchanges: moneyExchange,
  moneyExchange: null,
};

export const getAllMoneyExchange = createAsyncThunk('money-exchange/get-all-money-exchanges', getAllMoneyExchangeThunk);

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
      })
      .addCase(getAllMoneyExchange.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { getBankingAccountDetail_local } = BankingAccountSlice.actions;
const BankingAccountReducer = BankingAccountSlice.reducer;

export default BankingAccountReducer;

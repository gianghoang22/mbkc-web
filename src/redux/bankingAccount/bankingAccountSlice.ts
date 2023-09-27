import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BankingAccount } from '@types';
import { bankingAccounts } from 'mock/bankingAccount';
import {
  createNewBankingAccountThunk,
  deleteBankingAccountThunk,
  getAllBankingAccountsThunk,
  getBankingAccountDetailThunk,
  updateBankingAccountThunk,
} from './bankingAccountThunk';

interface BankingAccountState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  bankingAccounts: BankingAccount[];
  bankingAccount: BankingAccount | null;
}

const initialState: BankingAccountState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  bankingAccounts: bankingAccounts,
  bankingAccount: null,
};

export const createNewBankingAccount = createAsyncThunk(
  'BankingAccount/create-BankingAccount',
  createNewBankingAccountThunk
);
export const getAllBankingAccounts = createAsyncThunk(
  'BankingAccount/get-all-BankingAccounts',
  getAllBankingAccountsThunk
);
export const getBankingAccountDetail = createAsyncThunk(
  'BankingAccount/get-BankingAccount-detail',
  getBankingAccountDetailThunk
);
export const updateBankingAccount = createAsyncThunk('BankingAccount/update-BankingAccount', updateBankingAccountThunk);
export const deleteBankingAccount = createAsyncThunk('BankingAccount/delete-BankingAccount', deleteBankingAccountThunk);

const BankingAccountSlice = createSlice({
  name: 'BankingAccount',
  initialState,
  reducers: {
    setAddBankingAccount: (state) => {
      state.isEditing = false;
    },
    setEditBankingAccount: (state, action) => {
      state.isEditing = true;
      state.bankingAccount = action.payload;
    },
    getBankingAccountDetail_local: (state, action) => {
      state.bankingAccount = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewBankingAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewBankingAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewBankingAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllBankingAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBankingAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getAllBankingAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getBankingAccountDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBankingAccountDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getBankingAccountDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateBankingAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBankingAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateBankingAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteBankingAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBankingAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteBankingAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setAddBankingAccount, setEditBankingAccount, getBankingAccountDetail_local } =
  BankingAccountSlice.actions;
const BankingAccountReducer = BankingAccountSlice.reducer;

export default BankingAccountReducer;
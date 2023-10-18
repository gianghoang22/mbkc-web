import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Cashier } from '@types';
import {
  createNewCashierThunk,
  deleteCashierThunk,
  getAllCashiersThunk,
  getCashierDetailThunk,
  updateCashierStatusThunk,
  updateCashierThunk,
} from './cashierThunk';

interface CashierState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  cashiers: Cashier[];
  cashier: Cashier | null;
}

const initialState: CashierState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  cashiers: [],
  cashier: null,
};

export const createNewCashier = createAsyncThunk('cashier/create-cashier', createNewCashierThunk);
export const getAllCashiers = createAsyncThunk('cashier/get-all-cashiers', getAllCashiersThunk);
export const getCashierDetail = createAsyncThunk('cashier/get-cashier-detail', getCashierDetailThunk);
export const updateCashier = createAsyncThunk('cashier/update-cashier', updateCashierThunk);
export const updateCashierStatus = createAsyncThunk('cashier/update-cashier-status', updateCashierStatusThunk);
export const deleteCashier = createAsyncThunk('cashier/delete-cashier', deleteCashierThunk);

const CashierSlice = createSlice({
  name: 'Cashier',
  initialState,
  reducers: {
    setAddCashier: (state) => {
      state.isEditing = false;
    },
    setEditCashier: (state, action) => {
      state.isEditing = true;
      state.cashier = action.payload;
    },
    getCashierDetail_local: (state, action) => {
      state.cashier = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewCashier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewCashier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewCashier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllCashiers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCashiers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cashiers = [...action.payload?.cashiers];
      })
      .addCase(getAllCashiers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getCashierDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCashierDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cashier = action.payload;
      })
      .addCase(getCashierDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateCashier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCashier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateCashier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateCashierStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCashierStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateCashierStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteCashier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCashier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteCashier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setAddCashier, setEditCashier, getCashierDetail_local } = CashierSlice.actions;
const cashierReducer = CashierSlice.reducer;

export default cashierReducer;

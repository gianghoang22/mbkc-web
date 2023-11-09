import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Cashier } from 'common/models';
import { StorageKeys } from 'constants/storageKeys';
import { getIsEditing, setLocalStorage } from 'utils';
import {
  confirmEndOfShiftThunk,
  createNewCashierThunk,
  deleteCashierThunk,
  getAllCashiersThunk,
  getCashierDetailThunk,
  updateCashierStatusThunk,
  updateCashierThunk,
} from './cashierThunk';

const getIsEditingInStorage = getIsEditing(StorageKeys.IS_EDIT_CASHIER)
  ? getIsEditing(StorageKeys.IS_EDIT_CASHIER)
  : false;

interface CashierState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  cashiers: Cashier[];
  cashier: Cashier | null;
  numberItems: number;
}

const initialState: CashierState = {
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  cashiers: [],
  cashier: null,
  numberItems: 0,
};

export const createNewCashier = createAsyncThunk('cashier/create-cashier', createNewCashierThunk);
export const getAllCashiers = createAsyncThunk('cashier/get-all-cashiers', getAllCashiersThunk);
export const getCashierDetail = createAsyncThunk('cashier/get-cashier-detail', getCashierDetailThunk);
export const updateCashier = createAsyncThunk('cashier/update-cashier', updateCashierThunk);
export const updateCashierStatus = createAsyncThunk('cashier/update-cashier-status', updateCashierStatusThunk);
export const deleteCashier = createAsyncThunk('cashier/delete-cashier', deleteCashierThunk);
export const confirmEndOfShift = createAsyncThunk('cashier/confirm-end-of-shift', confirmEndOfShiftThunk);

const cashierSlice = createSlice({
  name: 'cashier',
  initialState,
  reducers: {
    setAddCashier: (state) => {
      state.isEditing = false;
      setLocalStorage(StorageKeys.IS_EDIT_CASHIER, false);
    },
    setEditCashier: (state, action) => {
      state.isEditing = true;
      state.cashier = action.payload;
      setLocalStorage(StorageKeys.IS_EDIT_CASHIER, true);
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
        state.numberItems = action.payload?.numberItems;
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
      })
      .addCase(confirmEndOfShift.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmEndOfShift.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(confirmEndOfShift.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setAddCashier, setEditCashier, getCashierDetail_local } = cashierSlice.actions;
const cashierReducer = cashierSlice.reducer;

export default cashierReducer;

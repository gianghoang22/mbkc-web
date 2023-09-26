import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Store } from '@types';
import { store, stores } from 'mock/store';
import {
  createNewStoreThunk,
  deleteStoreThunk,
  getAllStoresThunk,
  getStoreDetailThunk,
  updateStoreThunk,
} from './storeThunk';

interface StoreState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  stores: Store[];
  store: Store | null;
}

const initialState: StoreState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  stores: stores,
  store: store,
};

export const createNewStore = createAsyncThunk('Store/create-Store', createNewStoreThunk);
export const getAllStores = createAsyncThunk('Store/get-all-Stores', getAllStoresThunk);
export const getStoreDetail = createAsyncThunk('Store/get-Store-detail', getStoreDetailThunk);
export const updateStore = createAsyncThunk('Store/update-Store', updateStoreThunk);
export const deleteStore = createAsyncThunk('Store/delete-Store', deleteStoreThunk);

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    getStoreDetail_local: (state, action) => {
      state.store = action.payload;
    },
    setAddStore: (state) => {
      state.isEditing = false;
    },
    setEditStore: (state, action) => {
      state.isEditing = true;
      state.store = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllStores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getAllStores.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getStoreDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoreDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getStoreDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { getStoreDetail_local, setAddStore, setEditStore } = storeSlice.actions;
const storeReducer = storeSlice.reducer;

export default storeReducer;

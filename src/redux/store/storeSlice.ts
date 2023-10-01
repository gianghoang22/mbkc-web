import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Store } from '@types';
import { StorageKeys } from 'constants/storageKeys';
import { getIsEditing, setLocalStorage } from 'utils';
import {
  createNewStoreThunk,
  deleteStoreThunk,
  getAllStoresThunk,
  getStoreDetailThunk,
  getStoresByBrandThunk,
  getStoresByKitchenCenterThunk,
  updateStoreThunk,
} from './storeThunk';

interface StoreState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  stores: Store[];
  store: Store | null;
  totalPage: number;
  numberItems: number;
}

const getIsEditingInStorage =
  getIsEditing(StorageKeys.IS_EDIT_STORE) === true ? getIsEditing(StorageKeys.IS_EDIT_STORE) : false;

const initialState: StoreState = {
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  stores: [],
  store: null,
  totalPage: 0,
  numberItems: 5,
};

export const createNewStore = createAsyncThunk('store/create-Store', createNewStoreThunk);
export const getAllStores = createAsyncThunk('store/get-all-Stores', getAllStoresThunk);
export const getStoresByKitchenCenter = createAsyncThunk(
  'store/get-stores-by-kitchen-center',
  getStoresByKitchenCenterThunk
);
export const getStoresByBrand = createAsyncThunk('store/get-stores-by-brands', getStoresByBrandThunk);
export const getStoreDetail = createAsyncThunk('store/get-Store-detail', getStoreDetailThunk);
export const updateStore = createAsyncThunk('store/update-Store', updateStoreThunk);
export const deleteStore = createAsyncThunk('store/delete-Store', deleteStoreThunk);

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    getStoreDetail_local: (state, action) => {
      state.store = action.payload;
    },
    setAddStore: (state) => {
      state.isEditing = false;
      setLocalStorage(StorageKeys.IS_EDIT_STORE, false);
    },
    setEditStore: (state, action) => {
      state.isEditing = true;
      state.store = action.payload;
      setLocalStorage(StorageKeys.IS_EDIT_STORE, true);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewStore.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewStore.rejected, (state) => {
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
        state.stores = [...action.payload?.stores];
        state.totalPage = action.payload?.totalPage;
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllStores.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getStoresByKitchenCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoresByKitchenCenter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.stores = [...action.payload?.stores];
      })
      .addCase(getStoresByKitchenCenter.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getStoresByBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoresByBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.stores = [...action.payload?.stores];
      })
      .addCase(getStoresByBrand.rejected, (state) => {
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
        state.store = { ...action.payload };
      })
      .addCase(getStoreDetail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStore.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateStore.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStore.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteStore.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { getStoreDetail_local, setAddStore, setEditStore } = storeSlice.actions;
const storeReducer = storeSlice.reducer;

export default storeReducer;

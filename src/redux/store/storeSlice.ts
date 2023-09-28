import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Store } from '@types';
import { StorageKeys } from 'constants/storageKeys';
import { store, stores } from 'mock/store';
import { getPathname, setLocalStorage } from 'utils';
import {
  createNewStoreThunk,
  deleteStoreThunk,
  getAllStoresThunk,
  getStoreDetailThunk,
  getStoresByKitchenCenterThunk,
  getStoresByBrandThunk,
  updateStoreThunk,
} from './storeThunk';

interface StoreState {
  pathnameBack: string;
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  stores: Store[];
  store: Store | null;
  totalPage: number;
  numberItems: number;
}

const getPathnameInStorage = getPathname(StorageKeys.PATH_STORE_TO_BACK)
  ? getPathname(StorageKeys.PATH_STORE_TO_BACK)
  : '';

const initialState: StoreState = {
  pathnameBack: getPathnameInStorage,
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  stores: [],
  store: store,
  totalPage: 0,
  numberItems: 5,
};

export const createNewStore = createAsyncThunk('Store/create-Store', createNewStoreThunk);
export const getAllStores = createAsyncThunk('Store/get-all-Stores', getAllStoresThunk);
export const getStoresByKitchenCenter = createAsyncThunk(
  'Store/get-stores-by-kitchen-center',
  getStoresByKitchenCenterThunk
);
export const getStoresByBrand = createAsyncThunk('brand/get-stores-by-brands', getStoresByBrandThunk);
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
    setPathToBackStore: (state, action) => {
      state.pathnameBack = action.payload;
      setLocalStorage(StorageKeys.PATH_STORE_TO_BACK, action.payload);
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
      .addCase(getStoresByKitchenCenter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoresByKitchenCenter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.stores = [...action.payload?.stores];
      })
      .addCase(getStoresByKitchenCenter.rejected, (state, action) => {
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
      .addCase(getStoresByBrand.rejected, (state, action) => {
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

export const { getStoreDetail_local, setAddStore, setEditStore, setPathToBackStore } = storeSlice.actions;
const storeReducer = storeSlice.reducer;

export default storeReducer;

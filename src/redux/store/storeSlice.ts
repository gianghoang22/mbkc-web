import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Store } from '@types';
import { StorageKeys } from 'constants/storageKeys';
import { getIdInStorage, getIsEditing, setLocalStorage } from 'utils';
import {
  confirmRegistrationStoreThunk,
  createNewStoreThunk,
  deleteStoreThunk,
  getAllStoresThunk,
  getStoreDetailThunk,
  updateStatusStoreThunk,
  updateStoreThunk,
} from './storeThunk';

interface StoreState {
  isAddFormDetail: boolean;
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  stores: Store[];
  store: Store | null;
  storeId: number;
  totalPage: number;
  numberItems: number;
}

const getIsEditingInStorage =
  getIsEditing(StorageKeys.IS_EDIT_STORE) === true ? getIsEditing(StorageKeys.IS_EDIT_STORE) : false;
const getIsAddFormDetailInStorage =
  getIsEditing(StorageKeys.IS_ADD_FORM_DETAIL) === true ? getIsEditing(StorageKeys.IS_ADD_FORM_DETAIL) : false;
const getStoreIdlInStorage = getIdInStorage(StorageKeys.STORE_ID);

const initialState: StoreState = {
  isAddFormDetail: getIsAddFormDetailInStorage,
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  stores: [],
  store: null,
  storeId: getStoreIdlInStorage,
  totalPage: 0,
  numberItems: 5,
};

export const createNewStore = createAsyncThunk('store/create-store', createNewStoreThunk);
export const getAllStores = createAsyncThunk('store/get-allsStores', getAllStoresThunk);
export const getStoreDetail = createAsyncThunk('store/get-store-detail', getStoreDetailThunk);
export const updateStore = createAsyncThunk('store/update-store', updateStoreThunk);
export const updateStatusStore = createAsyncThunk('store/update-status-store', updateStatusStoreThunk);
export const confirmRegistrationStore = createAsyncThunk(
  'store/confirm-registration-store',
  confirmRegistrationStoreThunk
);
export const deleteStore = createAsyncThunk('store/delete-store', deleteStoreThunk);

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
    setAddFormDetail: (state, action) => {
      console.log(action.payload);
      state.isAddFormDetail = true;
      state.store = action.payload;
      setLocalStorage(StorageKeys.IS_ADD_FORM_DETAIL, true);
      setLocalStorage(StorageKeys.STORE_ID, action.payload?.store?.storeId);
    },
    setAddFormList: (state) => {
      state.isAddFormDetail = false;
      setLocalStorage(StorageKeys.IS_ADD_FORM_DETAIL, false);
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
      .addCase(updateStatusStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatusStore.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateStatusStore.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(confirmRegistrationStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmRegistrationStore.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(confirmRegistrationStore.rejected, (state) => {
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

export const { getStoreDetail_local, setAddStore, setEditStore, setAddFormDetail, setAddFormList } = storeSlice.actions;
const storeReducer = storeSlice.reducer;

export default storeReducer;

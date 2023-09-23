import { createSlice } from '@reduxjs/toolkit';
import { Store } from '@types';
import { store, stores } from 'mock/store';

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

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    getStoreDetail: (state, action) => {
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
  extraReducers(builder) {},
});

export const { getStoreDetail, setAddStore, setEditStore } = storeSlice.actions;
const storeReducer = storeSlice.reducer;

export default storeReducer;

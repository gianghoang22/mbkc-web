import { createSlice } from '@reduxjs/toolkit';
import { Store } from '@types';
import { store, stores } from 'mock/store';

interface StoreState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  stores: Store[];
  store: Store | null;
}

const initialState: StoreState = {
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
  },
  extraReducers(builder) {},
});

export const { getStoreDetail } = storeSlice.actions;
const storeReducer = storeSlice.reducer;

export default storeReducer;

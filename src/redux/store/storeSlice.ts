import { createSlice } from '@reduxjs/toolkit';
import { Store } from '@types';
import stores from 'mock/store';

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
  store: null,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

// export const {} = storeSlice.actions;
const storeReducer = storeSlice.reducer;

export default storeReducer;

import { createSlice } from '@reduxjs/toolkit';
import { Store } from '@types';
import stores from 'mock/store';

interface KitchenState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  kitchenList: Store[];
  kitchen: Store | null;
}

const initialState: KitchenState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  kitchenList: stores,
  kitchen: null,
};

const kitchenSlice = createSlice({
  name: 'kitchen',
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

// export const {} = kitchenSlice.actions;
const kitchenReducer = kitchenSlice.reducer;

export default kitchenReducer;

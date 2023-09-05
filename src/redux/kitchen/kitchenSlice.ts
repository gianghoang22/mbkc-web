import { createSlice } from '@reduxjs/toolkit';
import { initialKitchenList } from 'mock/kitchen';
import { Kitchen } from 'models';

interface KitchenState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  kitchenList: Kitchen[];
  kitchen: Kitchen | null;
}

const initialState: KitchenState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  kitchenList: initialKitchenList,
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

import { createSlice } from '@reduxjs/toolkit';
import { Kitchen } from '@types';
import kitchens from 'mock/kitchen';

interface KitchenState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  kitchens: Kitchen[];
  kitchen: Kitchen | null;
}

const initialState: KitchenState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  kitchens: kitchens,
  kitchen: null,
};

const kitchenSlice = createSlice({
  name: 'kitchen',
  initialState,
  reducers: {
    getKitchenDetail: (state, action) => {
      console.log(action);
      state.kitchen = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { getKitchenDetail } = kitchenSlice.actions;
const kitchenReducer = kitchenSlice.reducer;

export default kitchenReducer;

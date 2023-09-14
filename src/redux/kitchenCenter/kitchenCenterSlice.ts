import { createSlice } from '@reduxjs/toolkit';
import { KitchenCenter } from '@types';
import kitchenCenters from 'mock/kitchenCenter';

interface KitchenCenterState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  kitchenCenters: KitchenCenter[];
  kitchenCenter: KitchenCenter | null;
}

const initialState: KitchenCenterState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  kitchenCenters: kitchenCenters,
  kitchenCenter: null,
};

const kitchenCenterSlice = createSlice({
  name: 'kitchenCenter',
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

// export const {} = storeSlice.actions;
const kitchenCenterReducer = kitchenCenterSlice.reducer;

export default kitchenCenterReducer;

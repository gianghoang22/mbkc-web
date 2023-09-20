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
  reducers: {
    getKitchenCenterDetail: (state, action) => {
      console.log(action);
      state.kitchenCenter = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { getKitchenCenterDetail } = kitchenCenterSlice.actions;
const kitchenCenterReducer = kitchenCenterSlice.reducer;

export default kitchenCenterReducer;

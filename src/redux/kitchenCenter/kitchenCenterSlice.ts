import { createSlice } from '@reduxjs/toolkit';
import { KitchenCenter } from '@types';
import kitchenCenters from 'mock/kitchenCenter';

interface KitchenCenterState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  kitchenCenters: KitchenCenter[];
  kitchenCenter: KitchenCenter | null;
}

const initialState: KitchenCenterState = {
  isEditing: false,
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
    setAddKitchenCenter: (state) => {
      state.isEditing = false;
    },
    setEditKitchenCenter: (state, action) => {
      state.isEditing = true;
      state.kitchenCenter = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { getKitchenCenterDetail, setAddKitchenCenter, setEditKitchenCenter } = kitchenCenterSlice.actions;
const kitchenCenterReducer = kitchenCenterSlice.reducer;

export default kitchenCenterReducer;

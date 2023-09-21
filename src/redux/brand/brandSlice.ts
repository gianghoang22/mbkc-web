import { createSlice } from '@reduxjs/toolkit';
import { Brand } from '@types';
import brands from 'mock/brand';

interface BrandState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  brands: Brand[];
  brand: Brand | null;
}

const initialState: BrandState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  brands: brands,
  brand: null,
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    getBrandDetail: (state, action) => {
      console.log(action);
      state.brand = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { getBrandDetail } = brandSlice.actions;
const brandReducer = brandSlice.reducer;

export default brandReducer;

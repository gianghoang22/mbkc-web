import { createSlice } from '@reduxjs/toolkit';
import { Brand } from '@types';
import brands from 'mock/brand';

interface BrandState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  brands: Brand[];
  brand: Brand | null;
}

const initialState: BrandState = {
  isEditing: false,
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
    setAddBrand: (state) => {
      state.isEditing = false;
    },
    setEditBrand: (state, action) => {
      state.isEditing = true;
      state.brand = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { getBrandDetail, setAddBrand, setEditBrand } = brandSlice.actions;
const brandReducer = brandSlice.reducer;

export default brandReducer;

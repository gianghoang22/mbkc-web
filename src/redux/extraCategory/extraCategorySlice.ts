import { createSlice } from '@reduxjs/toolkit';
import { ProductCategory } from '@types';
import productCategories from 'mock/productCategory';

interface ExtraCategoryState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  extraCategories: ProductCategory[];
  extraCategory: ProductCategory | null;
}

const initialState: ExtraCategoryState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  extraCategories: productCategories,
  extraCategory: null,
};

const extraCategorySlice = createSlice({
  name: 'extraCategory',
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

// export const {} = extraCategorySlice.actions;
const extraCategoryReducer = extraCategorySlice.reducer;

export default extraCategoryReducer;

import { createSlice } from '@reduxjs/toolkit';
import { ProductCategory } from '@types';
import productCategories from 'mock/productCategory';

interface ProductCategoryState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  productCategories: ProductCategory[];
  productCategory: ProductCategory | null;
}

const initialState: ProductCategoryState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  productCategories: productCategories,
  productCategory: null,
};

const productCategorySlice = createSlice({
  name: 'productCategory',
  initialState,
  reducers: {
    getCategoryDetail: (state, action) => {
      console.log(action);
      state.productCategory = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { getCategoryDetail } = productCategorySlice.actions;
const productCategoryReducer = productCategorySlice.reducer;

export default productCategoryReducer;

import { createSlice } from '@reduxjs/toolkit';
import { Category } from '@types';
import productCategories from 'mock/productCategory';

interface ProductCategoryState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  categories: Category[];
  category: Category | null;
}

const initialState: ProductCategoryState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  categories: productCategories,
  category: null,
};

const productCategorySlice = createSlice({
  name: 'productCategory',
  initialState,
  reducers: {
    getCategoryDetail: (state, action) => {
      console.log(action);
      state.category = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { getCategoryDetail } = productCategorySlice.actions;
const productCategoryReducer = productCategorySlice.reducer;

export default productCategoryReducer;

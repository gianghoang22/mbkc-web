import { createSlice } from '@reduxjs/toolkit';
import { Product } from '@types';
import products from 'mock/product';

interface ProductState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  products: Product[];
  product: Product | null;
}

const initialState: ProductState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  products: products,
  product: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductDetail: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { getProductDetail } = productSlice.actions;
const productReducer = productSlice.reducer;

export default productReducer;

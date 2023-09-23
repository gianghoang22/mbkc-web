import { createSlice } from '@reduxjs/toolkit';
import { Product, ProductTypeEnum } from '@types';
import products from 'mock/product';

interface ProductState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  productType: ProductTypeEnum;
  products: Product[];
  product: Product | null;
}

const initialState: ProductState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  productType: ProductTypeEnum.SINGLE,
  products: products,
  product: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setAddProduct: (state) => {
      state.isEditing = false;
    },
    setEditProduct: (state, action) => {
      state.isEditing = true;
      state.product = action.payload;
    },
    getProductDetail: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { setAddProduct, setEditProduct, getProductDetail } = productSlice.actions;
const productReducer = productSlice.reducer;

export default productReducer;

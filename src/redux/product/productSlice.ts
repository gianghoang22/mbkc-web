import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product, ProductTypeEnum } from '@types';
import {
  createNewProductThunk,
  deleteProductThunk,
  getAllProductsParentThunk,
  getAllProductsThunk,
  getProductDetailThunk,
  updateProductThunk,
  updateStatusProductThunk,
} from './productThunk';
import { StorageKeys } from 'constants/storageKeys';
import { getIsEditing, setLocalStorage } from 'utils';

interface ProductState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  productType: ProductTypeEnum;
  products: Product[];
  productParent: Product[];
  product: Product | null;
  totalPage: number;
  numberItems: number;
}

const getIsEditingInStorage = getIsEditing(StorageKeys.IS_EDIT_PRODUCT)
  ? getIsEditing(StorageKeys.IS_EDIT_PRODUCT)
  : false;

const initialState: ProductState = {
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  productType: ProductTypeEnum.SINGLE,
  products: [],
  productParent: [],
  product: null,
  totalPage: 0,
  numberItems: 5,
};

export const createNewProduct = createAsyncThunk('product/create-product', createNewProductThunk);
export const getAllProducts = createAsyncThunk('product/get-all-products', getAllProductsThunk);
export const getAllProductsParent = createAsyncThunk('product/get-all-products-parent', getAllProductsParentThunk);
export const getProductDetail = createAsyncThunk('product/get-product-detail', getProductDetailThunk);
export const updateProduct = createAsyncThunk('product/update-product', updateProductThunk);
export const updateStatusProduct = createAsyncThunk('product/update-product-status', updateStatusProductThunk);
export const deleteProduct = createAsyncThunk('product/delete-product', deleteProductThunk);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setAddProduct: (state) => {
      state.isEditing = false;
      setLocalStorage(StorageKeys.IS_EDIT_PRODUCT, false);
    },
    setEditProduct: (state, action) => {
      state.isEditing = true;
      // state.product = action.payload;
      setLocalStorage(StorageKeys.IS_EDIT_PRODUCT, true);
    },
    getProductDetail_local: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = [...action.payload?.products];
        state.totalPage = action.payload?.totalPage;
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllProductsParent.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(getAllProductsParent.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productParent = [...action.payload?.products];
        state.totalPage = action.payload?.totalPage;
        state.numberItems = action.payload?.numberItems;
      })
      .addCase(getAllProductsParent.rejected, (state, action) => {
        // state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getProductDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = { ...action.payload };
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateStatusProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatusProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateStatusProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setAddProduct, setEditProduct, getProductDetail_local } = productSlice.actions;
const productReducer = productSlice.reducer;

export default productReducer;

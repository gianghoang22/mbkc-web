import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Brand } from '@types';
import brands from 'mock/brand';
import {
  createNewBrandThunk,
  deleteBrandThunk,
  getAllBrandsThunk,
  getBrandDetailThunk,
  updateBrandThunk,
} from './brandThunk';
import { StorageKeys } from 'constants/storageKeys';
import { getPathname, setLocalStorage } from 'utils';

interface BrandState {
  pathnameBack: string;
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  brands: Brand[];
  brand: Brand | null;
}

const getPathnameInStorage = getPathname(StorageKeys.PATH_BRAND_TO_BACK)
  ? getPathname(StorageKeys.PATH_BRAND_TO_BACK)
  : '';

const initialState: BrandState = {
  pathnameBack: getPathnameInStorage,
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  brands: brands,
  brand: null,
};

export const createNewBrand = createAsyncThunk('Brand/create-brand', createNewBrandThunk);
export const getAllBrands = createAsyncThunk('Brand/get-all-brands', getAllBrandsThunk);
export const getBrandDetail = createAsyncThunk('Brand/get-brand-detail', getBrandDetailThunk);
export const updateBrand = createAsyncThunk('Brand/update-brand', updateBrandThunk);
export const deleteBrand = createAsyncThunk('Brand/delete-brand', deleteBrandThunk);

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    getBrandDetail_local: (state, action) => {
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
    setPathToBackBrand: (state, action) => {
      state.pathnameBack = action.payload;
      setLocalStorage(StorageKeys.PATH_BRAND_TO_BACK, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getBrandDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrandDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getBrandDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { getBrandDetail_local, setAddBrand, setEditBrand, setPathToBackBrand } = brandSlice.actions;
const brandReducer = brandSlice.reducer;

export default brandReducer;

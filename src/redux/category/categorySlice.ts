import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category, CategoryType } from '@types';
import productCategories from 'mock/productCategory';
import {
  createNewCategoryThunk,
  deleteCategoryThunk,
  getAllCategoriesThunk,
  getCategoryDetailThunk,
  updateCategoryThunk,
} from './categoryThunk';

interface CategoryState {
  isEditing: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  categoryType: CategoryType;
  categories: Category[];
  category: Category | null;
}

const initialState: CategoryState = {
  isEditing: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  categoryType: CategoryType.NORMAL,
  categories: productCategories,
  category: null,
};

export const createNewCategory = createAsyncThunk('category/create-category', createNewCategoryThunk);
export const getAllCategories = createAsyncThunk('category/get-all-categories', getAllCategoriesThunk);
export const getCategoryDetail = createAsyncThunk('category/get-category-detail', getCategoryDetailThunk);
export const updateCategory = createAsyncThunk('category/update-category', updateCategoryThunk);
export const deleteCategory = createAsyncThunk('category/delete-category', deleteCategoryThunk);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setAddCategory: (state) => {
      state.isEditing = false;
    },
    setEditCategory: (state, action) => {
      state.isEditing = true;
      state.category = action.payload;
    },
    setCategoryType: (state, action) => {
      state.categoryType = action.payload;
    },
    getCategoryDetail_local: (state, action) => {
      console.log(action);
      state.category = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createNewCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getCategoryDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoryDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getCategoryDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { setAddCategory, setEditCategory, setCategoryType, getCategoryDetail_local } = categorySlice.actions;
const categoryReducer = categorySlice.reducer;

export default categoryReducer;

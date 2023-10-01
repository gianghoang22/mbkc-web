import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category, CategoryType } from '@types';
import { StorageKeys } from 'constants/storageKeys';
import productCategories from 'mock/productCategory';
import { getCategoryType, getIsEditing, setLocalStorage } from 'utils';
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

const getIsEditingInStorage = getIsEditing(StorageKeys.IS_EDIT_CATEGORY)
  ? getIsEditing(StorageKeys.IS_EDIT_CATEGORY)
  : false;
const getCategoryTypeInStorage = getCategoryType() ? getCategoryType() : CategoryType.NORMAL;

const initialState: CategoryState = {
  isEditing: getIsEditingInStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  categoryType: getCategoryTypeInStorage,
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
      console.log('add category');
      console.log(getCategoryTypeInStorage);
      state.isEditing = false;
      setLocalStorage(StorageKeys.IS_EDIT_CATEGORY, false);
    },
    setEditCategory: (state, action) => {
      console.log('edit category');
      state.isEditing = true;
      state.category = action.payload;
      setLocalStorage(StorageKeys.IS_EDIT_CATEGORY, true);
    },
    setCategoryType: (state, action) => {
      state.categoryType = action.payload;
      setLocalStorage(StorageKeys.CATEGORY_TYPE, action.payload);
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
